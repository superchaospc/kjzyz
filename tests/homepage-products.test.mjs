import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const homeScript = readFileSync(new URL('../public/assets/js/home.js', import.meta.url), 'utf8');

test('Misaka.io is listed as a VPS provider with the official local logo', () => {
  const logo = readFileSync(new URL('../public/assets/logos/misaka.svg', import.meta.url), 'utf8');

  assert.match(homeScript, /id:\s*'misaka'/);
  assert.match(homeScript, /name:\s*'misaka'/);
  assert.match(homeScript, /description:\s*'云服务器与全球网络服务，适合自建海外网络节点'/);
  assert.match(homeScript, /scenes:\s*\['vps'\]/);
  assert.match(homeScript, /logoUrl:\s*'assets\/logos\/misaka\.svg'/);
  assert.match(homeScript, /logoWide:\s*true/);
  assert.match(homeScript, /affiliateUrl:\s*'https:\/\/www\.misaka\.io\/services\/mc2'/);
  assert.match(logo, /<svg[^>]+aria-label="Misaka\.io"/);
  assert.match(logo, /viewBox="0 0 640 190"/);
});

test('CloudSilk is listed as a VPS provider with a local official logo', () => {
  const logo = readFileSync(new URL('../public/assets/logos/cloudsilk.svg', import.meta.url), 'utf8');

  assert.match(homeScript, /id:\s*'cloudsilk'/);
  assert.match(homeScript, /name:\s*'CloudSilk'/);
  assert.match(homeScript, /description:\s*'大陆优化 BGP 云服务器，适合自建海外网络节点'/);
  assert.match(homeScript, /scenes:\s*\['vps'\]/);
  assert.match(homeScript, /logoUrl:\s*'assets\/logos\/cloudsilk\.svg'/);
  assert.match(homeScript, /logoWide:\s*true/);
  assert.match(homeScript, /affiliateUrl:\s*'https:\/\/cloudsilk\.io\/aff\.php\?aff=928'/);
  assert.match(logo, /<svg[^>]+aria-label="CloudSilk"/);
  assert.match(logo, />CloudSilk</);
});
