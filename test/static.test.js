import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const publicRoot = resolve('public');
const austinRoot = join(publicRoot, 'geography/united-states/texas/austin');

function filesBelow(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesBelow(path) : [path];
  });
}

const htmlFiles = filesBelow(publicRoot).filter((path) => path.endsWith('.html'));

test('every HTML page loads the shared or legacy analytics module', () => {
  for (const path of htmlFiles) {
    const html = readFileSync(path, 'utf8');
    assert.match(html, /(?:shared\/)?analytics\.js/, `${path} has no analytics module`);
  }
});

test('local HTML asset and page references resolve', () => {
  for (const path of htmlFiles) {
    const html = readFileSync(path, 'utf8');
    for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
      const raw = match[1];
      if (/^(?:https?:|mailto:|tel:|data:|javascript:|#)/.test(raw)) continue;
      const clean = decodeURIComponent(raw.split(/[?#]/)[0]);
      if (!clean || clean === '/') continue;
      let siteRoot = publicRoot;
      if (path.includes('/austin/archive/') && !clean.startsWith('/shared/')) siteRoot = join(austinRoot, 'archive');
      if (path.includes('/austin/council/') && !clean.startsWith('/shared/')) siteRoot = join(austinRoot, 'council');
      if (path.includes('/austin/tax-increase/') && !clean.startsWith('/shared/')) siteRoot = join(austinRoot, 'tax-increase');
      let target = clean.startsWith('/') ? join(siteRoot, clean) : resolve(dirname(path), clean);
      if (target.endsWith('/')) target = join(target, 'index.html');
      assert.ok(existsSync(target), `${path}: missing ${raw}`);
    }
  }
});

test('each independent host has a sitemap, robots policy, and cross-site links', () => {
  const sites = [
    { root: join(austinRoot, 'archive'), peers: ['https://atxcitycouncil.com/', 'https://austincitycounciltaxincrease.com/'] },
    { root: join(austinRoot, 'council'), peers: ['https://austintaxrateelection.com/', 'https://austincitycounciltaxincrease.com/'] },
    { root: join(austinRoot, 'tax-increase'), peers: ['https://austintaxrateelection.com/', 'https://atxcitycouncil.com/'] }
  ];
  for (const site of sites) {
    const home = readFileSync(join(site.root, 'index.html'), 'utf8');
    const robots = readFileSync(join(site.root, 'robots.txt'), 'utf8');
    const sitemap = readFileSync(join(site.root, 'sitemap.xml'), 'utf8');
    assert.match(robots, /Sitemap: https:\/\//);
    assert.match(sitemap, /<urlset/);
    for (const peer of site.peers) assert.ok(home.includes(peer), `${site.root} does not link to ${peer}`);
  }
});
