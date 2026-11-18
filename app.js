/* مغسلة لمعة — تفاعلات الصفحة */
(function () {
  "use strict";

  /* ---- قائمة الجوال ---- */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  var scrim = document.createElement("div");
  scrim.className = "burger-open-scrim";
  document.body.appendChild(scrim);

  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    scrim.classList.remove("show");
  }

  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      scrim.classList.toggle("show", open);
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
    scrim.addEventListener("click", closeNav);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---- سنة الفوتر ---- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---- ظهور تدريجي للعناصر ---- */
  var revealables = document.querySelectorAll(
    ".sec-head, .card, .steps > li, .g-item, .feats > li, .extras, .why-card, .contact-info, .faq-list > details"
  );
  if ("IntersectionObserver" in window) {
    revealables.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 4) * 60 + "ms";
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---- عدّاد إحصائي بسيط في الهيرو ---- */
  var stats = document.querySelectorAll(".hero-stats strong");
  function animateCount(el) {
    var raw = el.textContent.trim();
    var num = parseFloat(raw.replace(/[^\d.]/g, ""));
    if (!num) return;
    var suffix = raw.replace(/[\d.,+\s]/g, "");
    var dur = 1200;
    var start = performance.now();
    function step(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = num % 1 === 0 ? Math.round(num * eased) : (num * eased).toFixed(1);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = raw;
    }
    requestAnimationFrame(step);
  }
  if (stats.length && "IntersectionObserver" in window) {
    var statObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    stats.forEach(function (s) { statObserver.observe(s); });
  }

  /* ---- تظليل الهيدر عند التمرير ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
