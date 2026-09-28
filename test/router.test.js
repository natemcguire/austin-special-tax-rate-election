import test from 'node:test';
import assert from 'node:assert/strict';
import { routeRequestUrl } from '../src/router.js';

test('routes the archive at the canonical host', () => {
  const route = routeRequestUrl('https://austintaxrateelection.com/years/2025/');
  assert.equal(new URL(route.url).pathname, '/geography/united-states/texas/austin/archive/years/2025/index.html');
});

test('routes the council and calculator hosts into their site roots', () => {
  assert.equal(new URL(routeRequestUrl('https://atxcitycouncil.com/votes.html').url).pathname, '/geography/united-states/texas/austin/council/votes.html');
  assert.equal(new URL(routeRequestUrl('https://austincitycounciltaxincrease.com/').url).pathname, '/geography/united-states/texas/austin/tax-increase/index.html');
});

test('provides local preview paths', () => {
  const route = routeRequestUrl('http://127.0.0.1:8787/__site/council/sources.html');
  assert.equal(new URL(route.url).pathname, '/geography/united-states/texas/austin/council/sources.html');
});

test('provides local preview hostnames with production-like root links', () => {
  const council = routeRequestUrl('http://100.81.162.45:8787/votes.html', 'council.100.81.162.45.sslip.io:8787');
  const tax = routeRequestUrl('http://100.81.162.45:8787/methodology.html', 'tax.100.81.162.45.sslip.io:8787');
  assert.equal(new URL(council.url).pathname, '/geography/united-states/texas/austin/council/votes.html');
  assert.equal(new URL(tax.url).pathname, '/geography/united-states/texas/austin/tax-increase/methodology.html');
});

test('redirects aliases and preserves the query string', () => {
  const route = routeRequestUrl('https://austintre.com/?utm_source=yard');
  assert.equal(route.type, 'redirect');
  assert.equal(route.location, 'https://austintaxrateelection.com/guides/tax-rate-elections.html?utm_source=yard');
});

test('handles www hosts the same as their apex hosts', () => {
  const council = routeRequestUrl('https://www.atxcitycouncil.com/votes.html');
  const alias = routeRequestUrl('https://www.votenoaustin.com/?utm_source=legacy');
  assert.equal(council.location, 'https://atxcitycouncil.com/votes.html');
  assert.equal(alias.location, 'https://austintaxrateelection.com/prop-q-defeated.html?utm_source=legacy');
});

test('redirects production HTTP to the canonical HTTPS host', () => {
  const route = routeRequestUrl('http://austintaxrateelection.com/years/2025/?utm_source=http');
  assert.equal(route.location, 'https://austintaxrateelection.com/years/2025/?utm_source=http');
});
