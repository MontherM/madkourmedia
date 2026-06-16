/**
 * JP DL AG — Main JavaScript
 * Mobile menu, scroll effects, fade-in animations
 */

(function () {
  'use strict';

  /* ============================================================
     NAVIGATION — scroll state + mobile menu
     ============================================================ */
  const header = document.getElementById('jp-header');
  const hamburger = document.getElementById('jp-hamburger');
  const mobileMenu = document.getElementById('jp-mobile-menu');

  // Scroll state
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 60) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  // Mobile menu toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('is-open');
      header.classList.toggle('jp-nav--open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    // Close mobile menu when any link inside it is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        header.classList.remove('jp-nav--open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* ============================================================
     FADE-IN — IntersectionObserver for scroll animations
     ============================================================ */
  var fadeEls = document.querySelectorAll(
    '.fade-in, .fade-in-up, .jp-fade-in'
  );

  if ('IntersectionObserver' in window && fadeEls.length > 0) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = parseFloat(el.dataset.delay || '0');
            setTimeout(function () {
              el.classList.add('is-visible');
            }, delay * 1000);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '-30px' }
    );

    fadeEls.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: show everything immediately
    fadeEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ============================================================
     BUILDING SVG — subtle parallax tilt on mouse move
     ============================================================ */
  var buildingSvg = document.querySelector('.jp-building-svg');

  if (buildingSvg) {
    document.addEventListener('mousemove', function (e) {
      var w = window.innerWidth;
      var h = window.innerHeight;
      var cx = e.clientX / w - 0.5; // -0.5 to 0.5
      var cy = e.clientY / h - 0.5;
      var rx = cy * -4;   // tilt X
      var ry = cx * 6;    // tilt Y
      buildingSvg.style.transform =
        'perspective(1100px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', function () {
      buildingSvg.style.transform = '';
    });
  }

  /* ============================================================
     SCROLL — building tilt on scroll (mirrors React spring logic)
     ============================================================ */
  if (buildingSvg) {
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      var progress = Math.min(scrollY / 700, 1); // 0 to 1 over first 700px
      var rotateY = -8 + progress * 30; // -8 to 22
      var rotateX = 3 + progress * -9;  //  3 to -6
      var scale   = 1 + progress * 0.06; // 1 to 1.06
      buildingSvg.style.transform =
        'perspective(1100px) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg) scale(' + scale + ')';
    }, { passive: true });
  }

  /* ============================================================
     CONTACT FORM — topic pill selection (vanilla fallback)
     ============================================================ */
  var topicLabels = document.querySelectorAll('.jp-topic');
  topicLabels.forEach(function (label) {
    label.addEventListener('click', function () {
      topicLabels.forEach(function (l) { l.classList.remove('is-selected'); });
      label.classList.add('is-selected');
    });
  });

  /* ============================================================
     SERVICE ROWS — hover subtle bg
     ============================================================ */
  // Already handled via CSS :hover

  /* ============================================================
     SMOOTH SCROLL — anchor links
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = anchor.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        var headerH = header ? header.offsetHeight : 80;
        var top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
