// 墨笔 · 交互脚本
(function () {
  'use strict';

  // ---- 打字机效果：Hero 微型文本 ----
  var typeEl = document.getElementById('hero-type');
  if (typeEl) {
    var text = typeEl.getAttribute('data-text') || '';
    typeEl.textContent = '';
    var i = 0;
    setTimeout(function tick() {
      if (i <= text.length) {
        typeEl.textContent = text.slice(0, i++);
        setTimeout(tick, 110);
      }
    }, 1400);
  }

  // ---- 滚动渐入 ----
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, idx) {
        if (entry.isIntersecting) {
          // 依次错落浮现，如墨迹渐次晕开
          setTimeout(function () { entry.target.classList.add('visible'); }, idx * 120);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ---- 导航滚动投影 ----
  var nav = document.getElementById('site-nav');
  var backTop = document.getElementById('back-top');
  var lastY = 0;

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('scrolled', y > 10);
    if (backTop) backTop.classList.toggle('visible', y > 480);
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backTop) {
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
