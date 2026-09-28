const SITE_PREFIXES = Object.freeze({
  'austintaxrateelection.com': '/geography/united-states/texas/austin/archive',
  'atxcitycouncil.com': '/geography/united-states/texas/austin/council',
  'austincitycounciltaxincrease.com': '/geography/united-states/texas/austin/tax-increase'
});

const PREVIEW_PREFIXES = Object.freeze({
  archive: SITE_PREFIXES['austintaxrateelection.com'],
  council: SITE_PREFIXES['atxcitycouncil.com'],
  'tax-increase': SITE_PREFIXES['austincitycounciltaxincrease.com']
});

const REDIRECTS = Object.freeze({
  'austincitycounciltax.com': 'https://austintaxrateelection.com/years/2026-27/',
  'austintre.com': 'https://austintaxrateelection.com/guides/tax-rate-elections.html',
  'voteaustintaxrateelection.com': 'https://austintaxrateelection.com/years/2025/',
  'defeataustintaxincrease.com': 'https://austintaxrateelection.com/prop-q-defeated.html',
  'votenoaustin.com': 'https://austintaxrateelection.com/prop-q-defeated.html',
  'loveaustincampaign.com': 'https://austintaxrateelection.com/years/2025/#campaign-record',
  'loveaustinpropelection.com': 'https://austintaxrateelection.com/years/2025/#campaign-record',
  'loveaustinpropq.com': 'https://austintaxrateelection.com/years/2025/#campaign-record',
  'propqloveaustin.com': 'https://austintaxrateelection.com/years/2025/#campaign-record',
  'voteloveaustin.com': 'https://austintaxrateelection.com/years/2025/#campaign-record',
  'votenoloveaustin.com': 'https://austintaxrateelection.com/years/2025/#campaign-record',
  'voteyesaustin.com': 'https://austintaxrateelection.com/years/2025/#campaign-record',
  'voteyesaustintre.com': 'https://austintaxrateelection.com/years/2025/#campaign-record',
  'voteyesloveaustin.com': 'https://austintaxrateelection.com/years/2025/#campaign-record',
  'voteyespropq.com': 'https://austintaxrateelection.com/years/2025/#campaign-record'
});

export function routeRequestUrl(requestUrl, hostHeader) {
  const url = new URL(requestUrl);
  const requestedHostname = (hostHeader || url.hostname).toLowerCase().split(':')[0];
  const hostname = requestedHostname.replace(/^www\./, '');

  if (REDIRECTS[hostname]) {
    const destination = new URL(REDIRECTS[hostname]);
    destination.search = url.search;
    return { type: 'redirect', location: destination.toString() };
  }

  if (SITE_PREFIXES[hostname] !== undefined &&
      (requestedHostname.startsWith('www.') || (url.protocol === 'http:' && !requestedHostname.includes('localhost') && !requestedHostname.endsWith('.sslip.io')))) {
    const destination = new URL(url);
    destination.protocol = 'https:';
    destination.hostname = hostname;
    destination.port = '';
    return { type: 'redirect', location: destination.toString() };
  }

  let prefix = SITE_PREFIXES[hostname];
  let pathname = url.pathname;

  // Friendly multi-host preview through sslip.io without editing another Mac's hosts file.
  if (hostname.endsWith('.sslip.io')) {
    if (hostname.startsWith('council.')) prefix = PREVIEW_PREFIXES.council;
    if (hostname.startsWith('tax.')) prefix = PREVIEW_PREFIXES['tax-increase'];
    if (hostname.startsWith('archive.')) prefix = PREVIEW_PREFIXES.archive;
  }

  // Local review URLs: /__site/council/, /__site/tax-increase/, /__site/archive/
  const previewMatch = pathname.match(/^\/__site\/(archive|council|tax-increase)(\/.*)?$/);
  if (previewMatch) {
    prefix = PREVIEW_PREFIXES[previewMatch[1]];
    pathname = previewMatch[2] || '/';
  }

  if (prefix === undefined) prefix = PREVIEW_PREFIXES.archive;
  if (pathname.startsWith('/shared/')) prefix = '';
  const assetUrl = new URL(url);
  assetUrl.hostname = 'assets.local';
  assetUrl.pathname = `${prefix}${pathname}`.replace(/\/+/g, '/');
  if (assetUrl.pathname.endsWith('/')) assetUrl.pathname += 'index.html';
  return { type: 'asset', url: assetUrl.toString() };
}

export default {
  async fetch(request, env) {
    const route = routeRequestUrl(request.url, request.headers.get('host'));
    if (route.type === 'redirect') {
      return Response.redirect(route.location, 308);
    }
    return env.ASSETS.fetch(new Request(route.url, request));
  }
};
