(function () {
  var sidebar = document.querySelector(".sidebar");
  var menuToggle = document.querySelector(".menu-toggle");
  var navLinks = document.querySelectorAll(".sidebar .nav-link");
  var sections = document.querySelectorAll("main section[id]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function closeMenu() {
    sidebar.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
  }

  menuToggle.addEventListener("click", function () {
    var isOpen = sidebar.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuToggle.innerHTML = isOpen
      ? '<i class="fas fa-times" aria-hidden="true"></i>'
      : '<i class="fas fa-bars" aria-hidden="true"></i>';
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", function (event) {
    if (window.innerWidth <= 767 && sidebar.classList.contains("is-open") &&
        !sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach(function (section) {
    observer.observe(section);
  });

  var revealGroups = [
    ".intro-band > *",
    ".story-section > .section-heading, .story-copy",
    ".values-row > *",
    ".care-section > *",
    ".section-heading-wide > *",
    ".service-card",
    ".approach-heading, .step",
    ".quote-section > *",
    ".faq-heading, .faq-list > *",
    ".contact-top > *, .contact-bottom > *, .page-footer > *"
  ];

  revealGroups.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (element, index) {
      element.classList.add("reveal");
      if (element.matches(".value-card, .service-card, .step, .faq-list details")) {
        element.style.setProperty("--reveal-delay", Math.min(index % 4, 3) * 90 + "ms");
      }
    });
  });

  var contactForm = document.querySelector("#contact-form");
  var formStatus = document.querySelector("#contact-form-status");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    formStatus.textContent = "Your details are filled in, but this website is not connected to receive enquiries yet. Your information has not been sent.";
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(function (element) {
      element.classList.add("is-visible");
    });
    return;
  }

  var revealObserver = new IntersectionObserver(function (entries, currentObserver) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -10px 0px" });

  document.querySelectorAll(".reveal").forEach(function (element) {
    revealObserver.observe(element);
  });
})();
