/* flipgazine flipbook overlay — shared by every flipbook (identical UI).
   Home button matches the book's own fullscreen button (size + row).
   Glass magnifier: bezel + glow + sweeping rimlight, book-accent colour,
   sits above the page but beneath the controls, animates in/out, taps outside
   the page to close, haptic on open, and defers its snapshot to avoid lag. */
(function () {
  if (window.__fgFlipUI) return;
  window.__fgFlipUI = 1;

  var ACCENT = window.__FG_ACCENT || '#00F0D1';
  document.documentElement.style.setProperty('--fg-accent', ACCENT);

  var css = document.createElement('style');
  css.textContent = [
    '.fg-btn{position:fixed;z-index:2147483000;display:flex;align-items:center;justify-content:center;',
    'width:34px;height:34px;border-radius:50%;cursor:pointer;box-sizing:border-box;',
    'border:1px solid color-mix(in srgb,var(--fg-accent) 55%,transparent);color:var(--fg-accent);',
    'background:rgba(255,255,255,0.10);-webkit-backdrop-filter:blur(14px) saturate(1.4);',
    'backdrop-filter:blur(14px) saturate(1.4);box-shadow:0 6px 18px rgba(0,0,0,.35);',
    'transition:transform .2s ease,background .2s ease,border-color .2s ease,color .2s ease;',
    '-webkit-tap-highlight-color:transparent;text-decoration:none;}',
    '.fg-btn:hover{transform:translateY(-1px);}',
    '.fg-btn:active{transform:scale(.94);}',
    '.fg-btn svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}',
    '.fg-home{top:16px;top:max(16px,env(safe-area-inset-top));left:16px;}',
    '.fg-mag{width:48px;height:48px;bottom:20px;bottom:max(20px,env(safe-area-inset-bottom));left:50%;margin-left:-24px;}',
    '.fg-mag svg{width:22px;height:22px;}',
    '.fg-mag.on{background:color-mix(in srgb,var(--fg-accent) 24%,transparent);border-color:var(--fg-accent);}',
    /* lens sits above the page (z6) but below the controls (z9) */
    '.fg-lens{position:fixed;z-index:8;border-radius:50%;pointer-events:none;display:none;opacity:0;',
    'transform:scale(.85);transform-origin:center;transition:transform .2s cubic-bezier(.22,1,.36,1),opacity .2s ease;',
    'box-shadow:0 0 0 2px var(--fg-accent),0 0 14px 1px color-mix(in srgb,var(--fg-accent) 55%,transparent),0 14px 38px rgba(0,0,0,.5);}',
    '.fg-lens-clip{position:absolute;inset:0;border-radius:50%;overflow:hidden;background:#0D1110;}',
    '.fg-lens-inner{position:absolute;top:0;left:0;transform-origin:0 0;}',
    '.fg-lens-glass{position:absolute;inset:0;border-radius:50%;pointer-events:none;z-index:2;',
    'box-shadow:inset 0 1px 3px rgba(255,255,255,.30),inset 0 -6px 14px rgba(0,0,0,.20);',
    'background:radial-gradient(120% 85% at 30% 20%,rgba(255,255,255,.22),rgba(255,255,255,0) 38%);}',
    '.fg-lens-rim{position:absolute;inset:-2px;border-radius:50%;pointer-events:none;z-index:3;',
    'background:conic-gradient(from 0deg,transparent 0deg,transparent 250deg,rgba(255,255,255,.95) 302deg,var(--fg-accent) 320deg,transparent 360deg);',
    '-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 3px),#000 calc(100% - 3px));',
    'mask:radial-gradient(farthest-side,transparent calc(100% - 3px),#000 calc(100% - 3px));',
    'animation:fgRim 2.6s linear infinite;}',
    '@keyframes fgRim{to{transform:rotate(360deg);}}'
  ].join('');
  (document.head || document.documentElement).appendChild(css);

  function svg(p) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + p + '</svg>'; }

  var home = document.createElement('a');
  home.href = '/'; home.className = 'fg-btn fg-home'; home.setAttribute('aria-label', 'Back to flipgazine home');
  home.innerHTML = svg('<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9h13v-9"/>');

  var mag = document.createElement('button');
  mag.type = 'button'; mag.className = 'fg-btn fg-mag'; mag.setAttribute('aria-label', 'Toggle magnifier'); mag.setAttribute('aria-pressed', 'false');
  mag.innerHTML = svg('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>');

  var lens = document.createElement('div'); lens.className = 'fg-lens';
  var clip = document.createElement('div'); clip.className = 'fg-lens-clip';
  var inner = document.createElement('div'); inner.className = 'fg-lens-inner';
  var glass = document.createElement('div'); glass.className = 'fg-lens-glass';
  var rim = document.createElement('div'); rim.className = 'fg-lens-rim';
  clip.appendChild(inner); lens.appendChild(clip); lens.appendChild(glass); lens.appendChild(rim);

  function mount() {
    document.body.appendChild(home); document.body.appendChild(mag); document.body.appendChild(lens);
    matchFsButton();
    try { if (localStorage.getItem('fg:dev')) { var dbg = document.getElementById('debugToggle'); if (dbg) dbg.style.display = 'flex'; } } catch (e) {}
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

  // match Home to the book's own fullscreen button: same size + same row, mirrored
  function matchFsButton() {
    var fs = document.getElementById('fsToggle') || document.querySelector('.pill-btn');
    if (!fs) return;
    var r = fs.getBoundingClientRect();
    if (!r.width) return;
    home.style.width = r.width + 'px';
    home.style.height = r.height + 'px';
    home.style.top = r.top + 'px';
    home.style.left = Math.max(8, Math.round(window.innerWidth - r.right)) + 'px';
  }
  window.addEventListener('load', matchFsButton);
  setTimeout(matchFsButton, 500);
  window.addEventListener('resize', function () { matchFsButton(); if (active) { snapshot(); place(innerWidth / 2, innerHeight / 2); } });

  var Z = 2.3, R = 92, active = false, downX = 0, downY = 0, moved = false;

  function snapshot() {
    inner.innerHTML = '';
    var clone = document.body.cloneNode(true);
    clone.querySelectorAll('.fg-btn,.fg-lens').forEach(function (n) { n.remove(); });
    clone.style.margin = '0';
    inner.style.width = innerWidth + 'px'; inner.style.height = innerHeight + 'px';
    inner.appendChild(clone);
    var oc = document.body.querySelectorAll('canvas'), cc = clone.querySelectorAll('canvas');
    for (var i = 0; i < cc.length && i < oc.length; i++) {
      try { cc[i].width = oc[i].width; cc[i].height = oc[i].height;
        var ctx = cc[i].getContext('2d'); if (ctx) ctx.drawImage(oc[i], 0, 0); } catch (e) {}
    }
  }
  function place(x, y) {
    lens.style.width = (R * 2) + 'px'; lens.style.height = (R * 2) + 'px';
    lens.style.left = (x - R) + 'px'; lens.style.top = (y - R) + 'px';
    inner.style.transform = 'scale(' + Z + ')';
    inner.style.left = (R - x * Z) + 'px'; inner.style.top = (R - y * Z) + 'px';
  }
  function insidePage(x, y) {
    var el = document.elementFromPoint(x, y);
    return !!(el && el.closest && el.closest('#stage'));
  }

  var EVTS = ['touchstart','touchmove','touchend','pointerdown','pointermove','pointerup','click','wheel','contextmenu'];
  function guard(e) {
    if (!active) return;
    var t = e.target;
    if (t && t.closest && t.closest('.fg-btn')) return;
    e.stopImmediatePropagation(); e.stopPropagation();
    if (e.cancelable) e.preventDefault();
    var p = e.touches ? e.touches[0] : e;
    if (e.type === 'pointerdown') { if (p) { downX = p.clientX; downY = p.clientY; moved = false; } }
    else if (e.type === 'pointermove') { if (p) { place(p.clientX, p.clientY); if (Math.abs(p.clientX - downX) > 8 || Math.abs(p.clientY - downY) > 8) moved = true; } }
    else if (e.type === 'pointerup') {
      if (!moved && p) {
        if (insidePage(p.clientX, p.clientY)) place(p.clientX, p.clientY); // tap on page -> move loupe
        else off();                                                        // tap outside page -> close
      }
    }
  }
  function keyGuard(e) { if (!active) return; if (e.key === 'Escape') { off(); return; } e.stopImmediatePropagation(); e.preventDefault(); }

  function on() {
    active = true; mag.classList.add('on'); mag.setAttribute('aria-pressed', 'true');
    try { navigator.vibrate && navigator.vibrate(8); } catch (e) {}
    place(innerWidth / 2, innerHeight / 2);
    lens.style.display = 'block';
    requestAnimationFrame(function () { lens.style.opacity = '1'; lens.style.transform = 'scale(1)'; });
    // defer the heavy snapshot two frames so the toggle feels instant
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      if (active) { snapshot(); place(innerWidth / 2, innerHeight / 2); }
    }); });
    EVTS.forEach(function (t) { window.addEventListener(t, guard, { capture: true, passive: false }); });
    window.addEventListener('keydown', keyGuard, true);
  }
  function off() {
    active = false; mag.classList.remove('on'); mag.setAttribute('aria-pressed', 'false');
    lens.style.opacity = '0'; lens.style.transform = 'scale(.85)';
    setTimeout(function () { if (!active) lens.style.display = 'none'; }, 200);
    EVTS.forEach(function (t) { window.removeEventListener(t, guard, { capture: true }); });
    window.removeEventListener('keydown', keyGuard, true);
  }
  mag.addEventListener('click', function () { active ? off() : on(); });
})();
