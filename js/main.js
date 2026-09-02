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
    renderPrep1();
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

  /* S6 账号准备：文案中嵌入免费试用链接（config.links.trial） */
  function renderPrep1() {
    var el = $('#prep1Desc');
    if (!el) return;
    var url = (CFG.links && CFG.links.trial) || '';
    var link = '<a class="inline-link js-trial-link" href="' + (url || '#') + '" target="_blank" rel="noopener">' + t('s6.trial') + '</a>';
    el.innerHTML = t('s6.prep1.desc', { link: link });
    if (!url) {
      var a = $('.js-trial-link', el);
      if (a) a.addEventListener('click', function (e) { e.preventDefault(); });
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
