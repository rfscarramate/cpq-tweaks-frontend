(async function(){
  // Embedded loader (app asset) - loads remote modular loader.js from GitHub Pages with cache+fallback
  const BASE = 'https://rfscarramate.github.io/cpq-tweaks/';
  const REMOTE_LOADER = BASE + 'loader.js';
  const CACHE_KEY = 'cpq_tweaks_mod_cache_v1';
  const CACHE_TIME = 1000 * 60 * 60 * 24; // 24h

  function log(...args){ try{ console.log('[CPQ-Asset-Loader]', ...args); }catch(e){} }

  async function fetchText(url) {
    const resp = await fetch(url, {cache: 'no-store'});
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    return await resp.text();
  }

  try {
    const now = Date.now();
    let cache = null;
    try { cache = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); } catch(e){ cache = null; }

    let loaderCode = null;
    try {
      loaderCode = await fetchText(REMOTE_LOADER + '?t=' + now);
      cache = cache || {};
      cache.loader = { code: loaderCode, time: now };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      log('Fetched remote loader.js');
    } catch (err) {
      log('Failed to fetch remote loader.js:', err);
      if (cache && cache.loader && cache.loader.code) {
        loaderCode = cache.loader.code;
        log('Using cached loader.js');
      } else {
        log('No loader available; skipping tweaks.');
        return;
      }
    }

    // Execute loader in page context
    try {
      (0,eval)(loaderCode);
      log('Executed remote loader.');
    } catch(e) {
      log('Execution of remote loader failed:', e);
    }
  } catch (e) {
    log('Asset loader fatal error:', e);
  }
})();
