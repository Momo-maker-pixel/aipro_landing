/* ============================================================
 * Quick BI 领航学堂 · 训练营汇总页交互
 * 1) 区块进场动效（.reveal → .is-visible，带错峰延迟）
 * 2) 页内锚点导航滚动高亮（scrollspy）
 * 3) 日程安排三营大纲页签切换（.sched-tab / .sched-pane）
 * 4) 常见问题折叠（.faq-q 点击切换 .faq-item.is-open）
 * 说明：页面无 JS 时内容照常展示（日程默认展示新手营大纲）
 * ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 通用观察器工厂：元素进入视口后执行一次 ---------- */
  function onceVisible(onEnter) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          onEnter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    return io;
  }

  /* ---------- 1) 进场动效 ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var revealIO = onceVisible(function (el) {
      var delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
      if (!reduceMotion && delay) el.style.transitionDelay = (delay * 90) + 'ms';
      el.classList.add('is-visible');
    });
    revealEls.forEach(function (el) { revealIO.observe(el); });
  }

  /* ---------- 2) 锚点导航 scrollspy ---------- */
  var tabs = document.querySelectorAll('.anchor-tabs a');
  if (tabs.length) {
    var ids = Array.prototype.map.call(tabs, function (a) {
      var href = a.getAttribute('href');
      return href && href.charAt(0) === '#' ? document.getElementById(href.slice(1)) : null;
    }).filter(Boolean);

    function setActive(id) {
      tabs.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
      });
    }

    if ('IntersectionObserver' in window && ids.length) {
      var spyIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });
      ids.forEach(function (sec) { spyIO.observe(sec); });
    }
  }

  /* ---------- 3) 日程页签切换（同步维护 is-active 与 hidden，保证无 JS / 无 CSS 均可退化） ---------- */
  var schedBtns = document.querySelectorAll('.sched-tab');
  var schedPanes = document.querySelectorAll('.sched-pane');
  if (schedBtns.length && schedPanes.length) {
    function selectSched(key) {
      schedBtns.forEach(function (btn) {
        var on = btn.getAttribute('data-sched') === key;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      schedPanes.forEach(function (pane) {
        var on = pane.id === 'sched-' + key;
        pane.classList.toggle('is-active', on);
        if (on) { pane.removeAttribute('hidden'); } else { pane.setAttribute('hidden', ''); }
      });
    }
    schedBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectSched(btn.getAttribute('data-sched'));
      });
    });
  }

  /* ---------- 4) 常见问题折叠（允许多条同时展开） ---------- */
  var faqBtns = document.querySelectorAll('.faq-q');
  if (faqBtns.length) {
    faqBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.faq-item');
        var open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  /* ---------- 页脚年份 ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
