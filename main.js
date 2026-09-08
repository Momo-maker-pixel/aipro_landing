/* ============================================================
 * Quick BI 领航学堂 · 训练营汇总页交互
 * 1) 区块进场动效（.reveal → .is-visible，带错峰延迟）
 * 2) 页内锚点导航滚动高亮（scrollspy）
 * 3) 日程安排三营大纲页签切换（.sched-tab / .sched-pane）
 * 4) 常见问题折叠（.faq-q 点击切换 .faq-item.is-open）
 * 5) 奖品轮播（[data-carousel]：每日打卡抽奖 / 结营特别奖）
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

  /* ---------- 5) 奖品轮播（每日打卡抽奖 / 结营特别奖，各自独立分页；无 JS 时仅见第一页） ----------
   * 每页 1 项；首尾各克隆一页实现无缝循环——翻到最后一张后继续向左滑回第一张 */
  var carousels = document.querySelectorAll('[data-carousel]');
  Array.prototype.forEach.call(carousels, function (root) {
    var track = root.querySelector('.carousel-track');
    var slides = track ? Array.prototype.slice.call(track.children) : [];
    var dotsWrap = root.querySelector('.carousel-dots');
    var prevBtn = root.querySelector('.carousel-btn--prev');
    var nextBtn = root.querySelector('.carousel-btn--next');
    if (!track || !slides.length) return;

    var page = 0;
    var timer = null;
    var wrapTimer = null;
    var wrapFinish = null;
    var clones = [];

    function metrics() {
      var sw = slides[0].getBoundingClientRect().width || 1;
      var vw = track.clientWidth || 1;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return { per: Math.max(1, Math.round(vw / sw)), step: sw + gap };
    }
    function pageCount() { return Math.max(1, Math.ceil(slides.length / metrics().per)); }

    /* 无缝循环克隆：尾部追加第一页、头部插入最后一页（滑到克隆页后瞬移回真实页，视觉连续） */
    function buildClones() {
      clones.forEach(function (c) { track.removeChild(c); });
      clones = [];
      var m = metrics();
      if (pageCount() < 2) return;
      var i, el;
      for (i = 0; i < m.per; i++) {
        el = slides[i % slides.length].cloneNode(true);
        el.setAttribute('aria-hidden', 'true');
        track.appendChild(el);
        clones.push(el);
      }
      for (i = 0; i < m.per; i++) {
        el = slides[(slides.length - m.per + i + slides.length) % slides.length].cloneNode(true);
        el.setAttribute('aria-hidden', 'true');
        track.insertBefore(el, track.firstChild);
        clones.push(el);
      }
    }

    /* 页码 → 位移：头部克隆占 per 页宽，第 p 页起点为 (per + p*per)*step；p=-1 为头部克隆页；
       仅 1 页时不建克隆，位移从 0 起算 */
    function xFor(p) {
      var m = metrics();
      var base = clones.length ? m.per : 0;
      return (base + p * m.per) * m.step;
    }
    function setTransform(p, animate) {
      if (!animate) track.style.transition = 'none';
      track.style.transform = 'translateX(' + (-xFor(p)) + 'px)';
      if (!animate) {
        void track.offsetWidth; /* 强制回流后再恢复过渡，保证瞬移不产生动画 */
        track.style.transition = '';
      }
    }
    function refreshDots() {
      if (!dotsWrap) return;
      Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
        dot.classList.toggle('is-active', i === page);
      });
    }
    function update(animate) {
      setTransform(page, animate !== false);
      refreshDots();
    }

    /* 克隆页过渡结束回调：transitionend 为主、setTimeout 兜底（动画被禁用时不触发事件）；
       过滤子元素冒泡的 transitionend（如奖品图 hover 缩放） */
    function afterMove(fn) {
      cancelWrap();
      var done = false;
      function finish(ev) {
        if (ev && (ev.target !== track || ev.propertyName !== 'transform')) return;
        if (done) return;
        done = true;
        track.removeEventListener('transitionend', finish);
        window.clearTimeout(wrapTimer);
        wrapFinish = null;
        fn();
      }
      wrapFinish = finish;
      track.addEventListener('transitionend', finish);
      wrapTimer = window.setTimeout(finish, 520);
    }
    function cancelWrap() {
      if (wrapFinish) wrapFinish();
    }

    /* 向左翻页：末页先滑向尾部克隆页（与首页同内容），到位后瞬移回首页（page=0，无动画） */
    function advance() {
      cancelWrap();
      var n = pageCount();
      if (n < 2) return;
      if (page === n - 1) {
        page = 0;
        setTransform(n, true);
        afterMove(function () { setTransform(0, false); refreshDots(); });
      } else {
        page++;
        update();
      }
    }
    /* 向右翻页：首页先滑向头部克隆页（与末页同内容），到位后瞬移回末页 */
    function back() {
      cancelWrap();
      var n = pageCount();
      if (n < 2) return;
      if (page === 0) {
        page = n - 1;
        setTransform(-1, true);
        afterMove(function () { setTransform(n - 1, false); refreshDots(); });
      } else {
        page--;
        update();
      }
    }

    function renderDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      for (var i = 0; i < pageCount(); i++) {
        (function (idx) {
          var dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'carousel-dot';
          dot.setAttribute('aria-label', '查看第 ' + (idx + 1) + ' 页');
          dot.addEventListener('click', function () {
            cancelWrap();
            page = idx;
            update();
            stop();
          });
          dotsWrap.appendChild(dot);
        })(i);
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { back(); stop(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { advance(); stop(); });

    /* 触屏轻扫翻页（水平位移超过 40px 判定翻页，同时停止自动轮播） */
    var touchX = null;
    track.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; stop(); }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 40) {
        if (dx < 0) { advance(); } else { back(); }
      }
    }, { passive: true });

    /* 自动轮播：悬停 / 聚焦暂停，手动翻页后停止；尊重系统「减少动态」偏好 */
    function start() {
      if (reduceMotion || timer) return;
      timer = window.setInterval(advance, 4800);
    }
    function stop() {
      if (timer) { window.clearInterval(timer); timer = null; }
    }
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    /* 视口宽度变化后重算分页并重建克隆（slide 宽变化时克隆页尺寸同步） */
    var resizeTimer;
    window.addEventListener('resize', function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        cancelWrap();
        buildClones();
        page = Math.min(page, pageCount() - 1);
        renderDots();
        update(false);
      }, 150);
    });

    buildClones();
    renderDots();
    update(false);
    start();
  });

  /* ---------- 页脚年份 ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
