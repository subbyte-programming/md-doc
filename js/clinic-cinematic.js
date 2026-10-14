(function () {
  var header = document.querySelector(".site-header");
  var menuToggle = document.querySelector(".menu-toggle");
  var navigation = document.querySelector(".primary-nav");
  var navLinks = document.querySelectorAll(".primary-nav .nav-link");
  var sections = document.querySelectorAll("main section[id]");
  var progressBar = document.querySelector(".scroll-progress");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var choreography = document.querySelector(".scroll-choreography");
  var showcaseCards = document.querySelectorAll(".showcase-card");

  showcaseCards.forEach(function (card) {
    function activateCard() {
      showcaseCards.forEach(function (item) {
        item.classList.toggle("is-active", item === card);
      });
    }

    card.addEventListener("pointerenter", activateCard);
    card.addEventListener("focus", activateCard);
  });

  function closeMenu() {
    navigation.classList.remove("is-open");
    header.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  menuToggle.addEventListener("click", function () {
    var isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    navigation.classList.toggle("is-open", isOpen);
    header.classList.toggle("menu-open", isOpen);
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", function (event) {
    if (window.innerWidth <= 780 && header.classList.contains("menu-open") &&
        !header.contains(event.target)) {
      closeMenu();
    }
  });

  function updateProgress() {
    var scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    progressBar.style.width = Math.min(progress, 100) + "%";
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  if (choreography) {
    var stage = choreography.querySelector(".choreography-stage");
    var topLeft = choreography.querySelector(".choreography-top-left");
    var bottomRight = choreography.querySelector(".choreography-bottom-right");
    var bottomLeft = choreography.querySelector(".choreography-bottom-left");
    var heroTile = choreography.querySelector(".choreography-hero");
    var choreographyFrame = 0;

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function interpolate(progress, start, end, from, to) {
      var amount = clamp((progress - start) / (end - start), 0, 1);
      return from + (to - from) * amount;
    }

    function setPosition(tile, x, y, opacity) {
      tile.style.setProperty("--tile-x", x + "vw");
      tile.style.setProperty("--tile-y", y + "vh");
      tile.style.opacity = String(opacity);
    }

    function updateChoreography() {
      if (reduceMotion) return;
      if (choreographyFrame) return;

      choreographyFrame = window.requestAnimationFrame(function () {
        choreographyFrame = 0;
        var distance = choreography.offsetHeight - stage.offsetHeight;
        var progress = distance > 0
          ? clamp(-choreography.getBoundingClientRect().top / distance, 0, 1)
          : 1;
        var underImagesOpacity = 1 - interpolate(progress, 0.75, 0.85, 0, 1);

        setPosition(
          topLeft,
          interpolate(progress, 0.35, 0.65, -20, 0),
          progress < 0.3
            ? interpolate(progress, 0, 0.3, -14, 14)
            : interpolate(progress, 0.35, 0.65, 14, 0),
          underImagesOpacity
        );
        setPosition(
          bottomRight,
          interpolate(progress, 0.35, 0.65, 20, 0),
          progress < 0.3
            ? interpolate(progress, 0, 0.3, 14, -14)
            : interpolate(progress, 0.35, 0.65, -14, 0),
          underImagesOpacity
        );
        setPosition(
          bottomLeft,
          interpolate(progress, 0.35, 0.65, -20, 0),
          interpolate(progress, 0.35, 0.65, 14, 0),
          underImagesOpacity
        );
        setPosition(
          heroTile,
          interpolate(progress, 0.35, 0.65, 20, 0),
          interpolate(progress, 0.35, 0.65, -14, 0),
          1
        );

        var expansion = interpolate(progress, 0.7, 0.9, 0, 1);
        var initialWidth = window.innerWidth * 0.36;
        var initialHeight = window.innerHeight * 0.24;
        heroTile.style.width = (initialWidth + (stage.clientWidth - initialWidth) * expansion) + "px";
        heroTile.style.height = (initialHeight + (stage.clientHeight - initialHeight) * expansion) + "px";
        heroTile.style.borderRadius = (24 * (1 - expansion)) + "px";
        choreography.style.setProperty("--copy-opacity", String(interpolate(progress, 0.84, 0.95, 0, 1)));
        choreography.style.setProperty("--cue-opacity", String(1 - interpolate(progress, 0.02, 0.18, 0, 1)));
      });
    }

    if (reduceMotion) {
      choreography.classList.add("is-static");
      choreography.style.height = stage.clientHeight + "px";
      topLeft.style.opacity = "0";
      bottomRight.style.opacity = "0";
      bottomLeft.style.opacity = "0";
      heroTile.style.setProperty("--tile-x", "0");
      heroTile.style.setProperty("--tile-y", "0");
      heroTile.style.width = stage.clientWidth + "px";
      heroTile.style.height = stage.clientHeight + "px";
      heroTile.style.borderRadius = "0";
      choreography.querySelector(".choreography-copy").style.opacity = "1";
      choreography.querySelector(".choreography-copy").style.pointerEvents = "auto";
      choreography.querySelector(".choreography-progress").style.display = "none";
      window.addEventListener("resize", function () {
        choreography.style.height = stage.clientHeight + "px";
        heroTile.style.width = stage.clientWidth + "px";
        heroTile.style.height = stage.clientHeight + "px";
      });
    } else {
      window.addEventListener("scroll", updateChoreography, { passive: true });
      window.addEventListener("resize", updateChoreography);
      updateChoreography();
    }
  }

  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });

    if (!reduceMotion) {
      var revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -12px 0px" });

      document.querySelectorAll(".reveal").forEach(function (element, index) {
        element.style.setProperty("--delay", Math.min(index % 4, 3) * 75 + "ms");
        revealObserver.observe(element);
      });
    } else {
      document.querySelectorAll(".reveal").forEach(function (element) {
        element.classList.add("is-visible");
      });
    }
  } else {
    document.querySelectorAll(".reveal").forEach(function (element) {
      element.classList.add("is-visible");
    });
  }
})();
