import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import http from 'node:http';

// Use the Chromium already cached by an earlier Playwright install instead of downloading a new one.
const CACHE = process.env.HOME + '/Library/Caches/ms-playwright/';
export const EXE = process.env.CHROMIUM_PATH || CACHE + 'chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell';

export const VIEW = { width: 1440, height: 900 };
export const launch = () => chromium.launch({ executablePath: EXE });
// A real context (not browser.newPage) so scenes can open sibling pages with page.context().newPage().
export const newPage = async (browser, extra = {}) => (await browser.newContext({ viewport: VIEW, deviceScaleFactor: 2, ...extra })).newPage();

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function ping(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => { res.resume(); resolve(true); }).on('error', () => resolve(false));
  });
}

export async function waitFor(url, tries = 60) {
  for (let i = 0; i < tries; i++) { if (await ping(url)) return; await sleep(500); }
  throw new Error('Timed out waiting for ' + url);
}

// Spawn a dev server, resolve once its URL answers. Returns a stop() function.
export async function serve({ cwd, cmd, args, env = {}, url }) {
  // Never reuse a port something else already answers on: it could be an unrelated app.
  if (await ping(url)) throw new Error('Port already in use, refusing to capture: ' + url);
  const child = spawn(cmd, args, { cwd, env: { ...process.env, ...env }, stdio: 'ignore', detached: true });
  const stop = () => { try { process.kill(-child.pid, 'SIGTERM'); } catch {} };
  process.on('exit', stop);
  await waitFor(url);
  return stop;
}
