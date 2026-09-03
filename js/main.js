/* ============================================================
 * AIPro 新手训练营宣传页 · 行为层
 * 覆盖：FR-01 倒计时与按钮状态 / FR-02 配置填充
 *       FR-04 埋点 / FR-06 语言切换与应用
 * 无第三方依赖，兼容钉钉 / 微信内置浏览器（老内核，仅用 ES5+ 常规特性）
 * ============================================================ */
(function () {
  'use strict';

  var CFG = window.PAGE_CONFIG || {};
  var I18N = window.I18N || {};
  var CAL = window.I18N_CAL || {};
  var LANG_KEY = 'aipro_page_lang';
  var lang = detectLang();
  var expired = false;

  /* ---------------- 工具 ---------------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /* FR-06 文案取值：当前语言 → 缺失回退中文 → 兜底返回键名 */
  function t(key, vars) {
    var val = (I18N[lang] && I18N[lang][key] != null) ? I18N[lang][key]
            : (I18N['zh-CN'] && I18N['zh-CN'][key] != null) ? I18N['zh-CN'][key]
            : key;
    if (vars) {
      for (var k in vars) { val = String(val).split('{' + k + '}').join(vars[k]); }
    }
    return val;
  }

  /* FR-06 语言检测：URL 参数（?lang=en）→ localStorage → 默认中文 */
  function detectLang() {
    var m = /[?&]lang=([^&]+)/.exec(location.search);
    if (m) {
      var v = decodeURIComponent(m[1]);
      if (/^en/i.test(v)) return 'en-US';
      if (/^zh/i.test(v)) return 'zh-CN';
    }
    try {
      var saved = localStorage.getItem(LANG_KEY);
      if (saved === 'en-US' || saved === 'zh-CN') return saved;
    } catch (e) { /* 隐私模式下 localStorage 不可用，忽略 */ }
    return 'zh-CN'; /* PRD：中文为默认语言 */
  }

  /* ---------------- FR-06 应用语言 ---------------- */
  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n')); });
    document.title = t('meta.title');
    var md = $('meta[name="description"]');
    if (md) md.setAttribute('content', t('meta.desc'));
    $$('.lang-btn').forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-lang') === lang);
    });
    renderDates();
    renderS8Sub();
    renderTrialLinks();
    renderContact();
    renderFooter();
    renderExpiredState(); /* 切语言后保持"已截止"文案正确 */
    refreshFaqHeights();
  }

  /* ---------------- 日期格式化（配置驱动 + 本地化模板） ---------------- */
  function fmtDate(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    if (lang === 'en-US') {
      var M = (CAL.months && CAL.months['en-US']) || [];
      return (M[d.getMonth()] || (d.getMonth() + 1)) + ' ' + d.getDate();
    }
    return (d.getMonth() + 1) + ' 月 ' + d.getDate() + ' 日';
  }
  function fmtWeek(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    var w = CAL.week && (CAL.week[lang] || CAL.week['zh-CN']);
    return w ? w[d.getDay()] : '';
  }
  function fmtRange(startISO, endISO) {
    function md(iso) { var d = new Date(iso); return (d.getMonth() + 1) + '/' + d.getDate(); }
    return md(startISO) + '–' + md(endISO);
  }

  function renderDates() {
    var c = CFG.camp || {};
    var el = $('#info-start');
    if (el) el.textContent = t('hero.info.start', { date: fmtDate(c.startISO), week: fmtWeek(c.startISO) });
    el = $('#info-duration');
    if (el) el.textContent = t('hero.info.duration', { days: c.days, range: fmtRange(c.startISO, c.endISO) });
    el = $('#info-daily');
    if (el) el.textContent = t('hero.info.daily', { min: c.dailyMinutes });
  }

  function renderS8Sub() {
    var el = $('#s8Sub');
    if (el) el.textContent = t('s8.sub', { date: fmtDate((CFG.camp || {}).startISO) });
  }

  /* 免费试用链接（config.links.trial）：注入 S6 账号准备与 FAQ Q4 文案 */
  function renderTrialLinks() {
    var url = (CFG.links && CFG.links.trial) || '';
    function linkHtml(key) {
      return '<a class="inline-link js-trial-link" href="' + (url || '#') + '" target="_blank" rel="noopener">' + t(key) + '</a>';
    }
    var el = $('#prep1Desc');
    if (el) el.innerHTML = t('s6.prep1.desc', { link: linkHtml('s6.trial') });
    el = $('#faqA4');
    if (el) el.innerHTML = t('s7.a4', { link: linkHtml('s7.trial') });
    if (!url) {
      $$('.js-trial-link').forEach(function (a) {
        a.addEventListener('click', function (e) { e.preventDefault(); });
      });
    }
  }

  function renderContact() {
    var el = $('.js-contact-name');
    if (el) el.textContent = (CFG.contact && CFG.contact.name) || t('s8.contact.default');
  }

  function renderFooter() {
    var f = CFG.footer || {};
    var el = $('.js-organizer');
    if (el && f.organizer) el.textContent = f.organizer;
    el = $('#footerCopyright');
    if (el) el.textContent = t('footer.copyright', { year: f.year || 2026, org: f.organizer || '' });
  }

  /* ---------------- FR-02 链接配置填充 ---------------- */
  function fillLinks() {
    var url = (CFG.signup && CFG.signup.url) || '';
    $$('.js-signup').forEach(function (a) {
      if (expired) return; /* 截止态由 renderExpiredState 接管 */
      if (url) {
        a.setAttribute('href', url);
        a.classList.remove('is-pending');
      } else {
        a.setAttribute('href', '#');
        a.classList.add('is-pending');
        a.setAttribute('title', t('cta.pending'));
      }
    });
    var help = (CFG.links && CFG.links.helpDoc) || '#';
    $$('.js-help-link').forEach(function (a) { a.setAttribute('href', help); });
  }

  /* ---------------- FR-01 倒计时 ---------------- */
  function tick() {
    var ddl = CFG.signup && CFG.signup.deadlineISO ? new Date(CFG.signup.deadlineISO).getTime() : NaN;
    if (isNaN(ddl)) {
      $$('.js-countdown').forEach(function (c) { c.style.display = 'none'; });
      return;
    }
    var diff = ddl - Date.now();
    if (diff <= 0) { setExpired(true); return; }
    var d = Math.floor(diff / 864e5);
    var h = Math.floor((diff % 864e5) / 36e5);
    var m = Math.floor((diff % 36e5) / 6e4);
    $$('.js-cd-d').forEach(function (e) { e.textContent = d; });
    $$('.js-cd-h').forEach(function (e) { e.textContent = pad(h); });
    $$('.js-cd-m').forEach(function (e) { e.textContent = pad(m); });
  }

  function setExpired(on) {
    if (expired === on) return;
    expired = on;
    renderExpiredState();
  }

  function renderExpiredState() {
    $$('.js-countdown').forEach(function (c) { c.classList.toggle('is-expired', expired); });
    $$('.js-signup').forEach(function (a) {
      var label = a.querySelector('span');
      if (expired) {
        a.classList.remove('is-pending');
        a.classList.add('is-expired');
        a.setAttribute('aria-disabled', 'true');
        if (label) label.textContent = t('cta.expired');
        var exp = (CFG.signup && CFG.signup.expiredUrl) || '';
        if (exp) { a.setAttribute('href', exp); a.classList.remove('is-expired'); a.removeAttribute('aria-disabled'); }
      } else {
        a.classList.remove('is-expired');
        a.removeAttribute('aria-disabled');
        if (label && !a.classList.contains('is-pending')) label.textContent = t('cta.signup');
      }
    });
    if (!expired) fillLinks(); /* 恢复正常链接 */
  }

  /* ---------------- S7 FAQ 手风琴 ---------------- */
  function setOpen(item, on) {
    var btn = $('.faq-q', item);
    var panel = $('.faq-a', item);
    if (!btn || !panel) return;
    item.classList.toggle('is-open', on);
    btn.setAttribute('aria-expanded', on ? 'true' : 'false');
    panel.style.maxHeight = on ? panel.scrollHeight + 'px' : '';
  }

  function initFaq() {
    $$('.faq-item').forEach(function (item, idx) {
      var btn = $('.faq-q', item);
      if (!btn) return;
      if (idx === 0) setOpen(item, true); /* 首条默认展开（PRD S7） */
      btn.addEventListener('click', function () {
        var willOpen = !item.classList.contains('is-open');
        /* 手风琴互斥，保持版面整洁 */
        $$('.faq-item.is-open').forEach(function (o) { if (o !== item) setOpen(o, false); });
        setOpen(item, willOpen);
        if (willOpen) track('faq_expand', { idx: idx + 1 });
      });
    });
    window.addEventListener('resize', debounce(refreshFaqHeights, 200));
  }

  function refreshFaqHeights() {
    $$('.faq-item.is-open .faq-a').forEach(function (p) {
      p.style.maxHeight = p.scrollHeight + 'px';
    });
  }

  function debounce(fn, wait) {
    var timer = null;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, wait);
    };
  }

  /* ---------------- S2 数据条（FR-02：可隐藏；数字滚动动画） ---------------- */
  function fmtNum(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

  function initStats() {
    var s = CFG.stats || {};
    var strip = $('#statsStrip');
    if (strip && s.show === false) { strip.style.display = 'none'; return; } /* 上线红线：取不到数据直接隐藏 */
    if (!strip || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateStats(s); io.disconnect(); }
      });
    }, { threshold: 0.4 });
    io.observe(strip);
  }

  function animateStats(stats) {
    $$('.js-stat').forEach(function (el) {
      var target = Number(stats[el.getAttribute('data-stat')]);
      if (isNaN(target)) return;
      var start = null;
      var dur = 1200;
      function stepFn(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3); /* easeOutCubic */
        el.textContent = fmtNum(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(stepFn);
      }
      requestAnimationFrame(stepFn);
    });
  }

  /* ---------------- S1 五维能力轮播（全宽大图 + 横排选项卡） ----------------
   * 自动轮播 SC_DUR 毫秒/张；悬停 / 键盘聚焦 / 全屏查看大图 / 离开视口时暂停；移动端支持左右滑动切换；
   * 点击舞台大图可全屏查看原图（点遮罩任意处或按 Esc 关闭）；
   * 系统偏好「减少动态效果」时不自动轮播，仅保留手动点选。 */
  var SC_DUR = 3500; /* 2026-09-03 提速：原 5s/张偏慢，改为 3.5s/张 */
  var sc = { slides: [], tabs: [], bars: [], idx: 0, elapsed: 0, last: 0, running: false, visible: true, hover: false, focus: false, zoomed: false };

  function selectShowcase(i, manual) {
    var n = sc.slides.length;
    if (!n) return;
    sc.idx = ((i % n) + n) % n;
    sc.slides.forEach(function (s, k) {
      var on = k === sc.idx;
      s.classList.toggle('is-active', on);
      s.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
    sc.tabs.forEach(function (tb, k) {
      var on = k === sc.idx;
      tb.classList.toggle('is-active', on);
      tb.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    sc.bars.forEach(function (b) { b.style.width = '0%'; });
    sc.elapsed = 0;
    if (manual) track('showcase_switch', { idx: sc.idx + 1 });
  }

  /* rAF 驱动：暂停时计时冻结，恢复后无缝续走（进度条与切换时机始终同步） */
  function showcaseFrame(ts) {
    if (sc.running) {
      if (!sc.last) sc.last = ts;
      sc.elapsed += ts - sc.last;
      sc.last = ts;
      var bar = sc.bars[sc.idx];
      if (bar) bar.style.width = Math.min(sc.elapsed / SC_DUR * 100, 100) + '%';
      if (sc.elapsed >= SC_DUR) selectShowcase(sc.idx + 1, false);
    } else {
      sc.last = 0;
    }
    requestAnimationFrame(showcaseFrame);
  }

  function initShowcase() {
    var root = $('#capShowcase');
    if (!root) return;
    sc.slides = $$('.sc-slide', root);
    sc.tabs = $$('.sc-tab', root);
    sc.bars = sc.tabs.map(function (tb) { return $('.sc-tab-bar', tb); });
    if (!sc.slides.length || sc.slides.length !== sc.tabs.length) return;

    var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (reduceMotion) root.classList.add('no-autoplay');

    sc.tabs.forEach(function (tb, i) {
      tb.addEventListener('click', function () { selectShowcase(i, true); });
    });

    /* 触摸左右滑动切换（竖向滚动不拦截） */
    var sx = 0, sy = 0;
    root.addEventListener('touchstart', function (e) {
      sx = e.touches[0].clientX; sy = e.touches[0].clientY;
    }, { passive: true });
    root.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      var dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        selectShowcase(sc.idx + (dx < 0 ? 1 : -1), true);
      }
    }, { passive: true });

    /* 暂停原因统一管理：悬停 / 键盘聚焦 / 全屏查看大图 / 离开视口 / 系统减少动态效果，任一存在即暂停 */
    function updateRun() {
      sc.running = !reduceMotion && sc.visible && !sc.hover && !sc.focus && !sc.zoomed;
    }

    if (!reduceMotion) {
      /* 进入视口才自动播放，滚走即停（省电） */
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            sc.visible = en.isIntersecting;
            updateRun();
          });
        }, { threshold: 0.25 });
        io.observe(root);
      } else {
        sc.visible = true;
      }
      root.addEventListener('mouseenter', function () { sc.hover = true; updateRun(); });
      root.addEventListener('mouseleave', function () { sc.hover = false; updateRun(); });
      root.addEventListener('focusin', function () { sc.focus = true; updateRun(); });
      root.addEventListener('focusout', function () { sc.focus = false; updateRun(); });
      updateRun();
      requestAnimationFrame(showcaseFrame);
    }

    /* 点击舞台大图：全屏查看原图（图内细节较多，可放大细看；点遮罩任意处或按 Esc 关闭） */
    var stage = $('.sc-stage', root);
    if (stage) {
      stage.addEventListener('click', function () {
        var img = sc.slides[sc.idx] && $('img', sc.slides[sc.idx]);
        if (!img) return;
        sc.zoomed = true;
        updateRun();
        var ov = document.createElement('div');
        ov.className = 'sc-lightbox';
        ov.setAttribute('role', 'dialog');
        ov.innerHTML = '<img src="' + img.getAttribute('src') + '" alt="' + (img.getAttribute('alt') || '') + '">';
        document.body.appendChild(ov);
        document.body.style.overflow = 'hidden'; /* 遮罩期间锁定背景滚动 */
        function closeBox() {
          ov.removeEventListener('click', closeBox);
          document.removeEventListener('keydown', onKey);
          if (ov.parentNode) ov.parentNode.removeChild(ov);
          document.body.style.overflow = '';
          sc.zoomed = false;
          updateRun();
        }
        function onKey(e) {
          if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) closeBox();
        }
        ov.addEventListener('click', closeBox);
        document.addEventListener('keydown', onKey);
      });
    }
    selectShowcase(0, false); /* 同步初始 aria 状态（HTML 默认第一张激活） */
  }

  /* ---------------- FR-04 埋点 ----------------
   * TODO：接入现有埋点体系后，将 track() 替换为正式上报；
   * 当前行为：console.debug + window.__trackLogs（调试可查）+ dataLayer 透传（若存在）。
   * 无埋点体系时，至少保证外链可携带 utm 参数以追溯渠道（PRD FR-04）。 */
  function track(event, payload) {
    var record = { event: event, payload: payload || {}, ts: Date.now(), url: location.href };
    (window.__trackLogs = window.__trackLogs || []).push(record);
    if (window.console) console.debug('[track]', event, payload || {});
    if (window.dataLayer) window.dataLayer.push(Object.assign({ event: event }, payload || {}));
  }

  function initTracking() {
    /* CTA / 任意带 data-track 元素的点击 */
    document.addEventListener('click', function (e) {
      var el = e.target.closest ? e.target.closest('[data-track]') : null;
      if (el) {
        track(el.getAttribute('data-track'), {
          loc: el.getAttribute('data-track-loc') || undefined
        });
      }
      /* 截止 / 未配置链接的 CTA：阻止跳转 */
      var a = e.target.closest ? e.target.closest('a') : null;
      if (a && (a.classList.contains('is-expired') ||
               (a.classList.contains('is-pending') && a.getAttribute('href') === '#'))) {
        e.preventDefault();
      }
    });

    /* 模块曝光 */
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            track('module_exposure', { module: en.target.getAttribute('data-module') });
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.3 });
      $$('[data-module]').forEach(function (s) { io.observe(s); });
    }
  }

  /* ---------------- FR-06 语言切换 ---------------- */
  function initLangSwitch() {
    $$('.lang-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var next = b.getAttribute('data-lang');
        if (next === lang) return;
        lang = next;
        try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* 忽略 */ }
        applyLang();
      });
    });
  }

  /* ---------------- 启动 ---------------- */
  function init() {
    applyLang();
    fillLinks();
    initFaq();
    initStats();
    initShowcase();
    initTracking();
    initLangSwitch();
    tick();
    setInterval(tick, 1000); /* 每秒刷新倒计时（PRD：实时刷新） */
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
