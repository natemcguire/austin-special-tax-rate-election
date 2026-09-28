import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const DOMAINS = Object.freeze([
  'austintaxrateelection.com',
  'atxcitycouncil.com',
  'austincitycounciltaxincrease.com',
  'austincitycounciltax.com',
  'austintre.com',
  'voteaustintaxrateelection.com',
  'defeataustintaxincrease.com',
  'votenoaustin.com',
  'loveaustincampaign.com',
  'loveaustinpropelection.com',
  'loveaustinpropq.com',
  'propqloveaustin.com',
  'voteloveaustin.com',
  'votenoloveaustin.com',
  'voteyesaustin.com',
  'voteyesaustintre.com',
  'voteyesloveaustin.com',
  'voteyespropq.com'
]);

const token = process.env.CLOUDFLARE_API_TOKEN;
if (!token) throw new Error('CLOUDFLARE_API_TOKEN is required');

const shouldDelete = process.argv.includes('--delete-conflicts');
const snapshotFile = resolve('research/geography/united-states/texas/austin/domains/snapshots/2026-08-01/dns-before-worker.json');

async function api(path, options = {}) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...options.headers }
  });
  const body = await response.json();
  if (!response.ok || !body.success) {
    throw new Error(`Cloudflare request failed (${response.status}): ${JSON.stringify(body.errors)}`);
  }
  return body.result;
}

const snapshot = [];
for (const domain of DOMAINS) {
  const zones = await api(`/zones?name=${encodeURIComponent(domain)}`);
  if (zones.length !== 1) throw new Error(`Expected one zone for ${domain}; found ${zones.length}`);
  const zone = zones[0];
  const records = await api(`/zones/${zone.id}/dns_records?per_page=100`);
  const conflicts = records.filter((record) =>
    (record.name === domain || record.name === `www.${domain}`) &&
    ['A', 'AAAA', 'CNAME'].includes(record.type)
  );
  snapshot.push({ domain, zone_id: zone.id, records: conflicts });
}

await mkdir(dirname(snapshotFile), { recursive: true });
await writeFile(snapshotFile, `${JSON.stringify({ captured_at: new Date().toISOString(), domains: snapshot }, null, 2)}\n`);
console.log(`Saved ${snapshot.reduce((sum, item) => sum + item.records.length, 0)} conflicting records to ${snapshotFile}`);

if (shouldDelete) {
  for (const item of snapshot) {
    for (const record of item.records) {
      await api(`/zones/${item.zone_id}/dns_records/${record.id}`, { method: 'DELETE' });
      console.log(`Deleted ${record.type} ${record.name}`);
    }
  }
}
