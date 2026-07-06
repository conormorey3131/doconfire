/* DOCON Fire Safety Engineering — shared scripts */
(function () {
  "use strict";

  /* ---------- sticky header ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- floating embers (hero) ---------- */
  var emberHost = document.querySelector(".embers");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (emberHost && !reduceMotion) {
    for (var i = 0; i < 22; i++) {
      var e = document.createElement("span");
      e.className = "ember";
      e.style.left = Math.random() * 100 + "%";
      e.style.animationDuration = 7 + Math.random() * 9 + "s";
      e.style.animationDelay = Math.random() * 12 + "s";
      e.style.setProperty("--drift", (Math.random() * 120 - 60) + "px");
      var s = 3 + Math.random() * 4;
      e.style.width = s + "px";
      e.style.height = s + "px";
      emberHost.appendChild(e);
    }
  }

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
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
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- animated counters ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1800;
    var start = null;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if ("IntersectionObserver" in window && counters.length && !reduceMotion) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent =
        parseInt(el.getAttribute("data-count"), 10).toLocaleString() +
        (el.getAttribute("data-suffix") || "");
    });
  }

  /* ---------- contact form (mailto handoff) ---------- */
  var form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var get = function (id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : "";
      };
      var subject = "Enquiry — " + (get("f-service") || "Fire Safety Services");
      var body =
        "Name: " + get("f-name") +
        "\nPhone: " + get("f-phone") +
        "\nEmail: " + get("f-email") +
        "\nService: " + get("f-service") +
        "\n\nProject details:\n" + get("f-message");
      window.location.href =
        "mailto:doconfire1@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
    });
  }

  /* ---------- footer year ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
