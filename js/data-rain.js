(function () {
  var root = document.getElementById("data-rain-root");
  if (!root) return;

  var canvas = root.querySelector(".dr-main");
  var bloom = root.querySelector(".dr-bloom");
  var ctx = canvas && canvas.getContext("2d");
  var bloomCtx = bloom && bloom.getContext("2d");
  if (!ctx || !bloomCtx) return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var palette = window.getComputedStyle(root);
  var colors = [
    "rgb(" + palette.getPropertyValue("--dr-calm").trim() + ")",
    "rgb(" + palette.getPropertyValue("--dr-mid").trim() + ")",
    "rgb(" + palette.getPropertyValue("--dr-hot").trim() + ")"
  ];
  var coreColor = "rgb(" + palette.getPropertyValue("--dr-core").trim() + ")";
  var trailSize = 16;
  var particles = [];
  var width = 1;
  var height = 1;
  var dpr = 1;
  var head = 0;
  var raf = 0;
  var lastTime = 0;
  var elapsed = 0;
  var idleTime = 0;
  var pointerActive = false;
  var pointerX = 0;
  var pointerY = 0;
  var cursorX = 0;
  var cursorY = 0;
  var disposed = false;
  var randomState = 7;

  function random() {
    randomState = (randomState + 0x6d2b79f5) | 0;
    var value = randomState;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  }

  function makeParticle(initial) {
    var x = random() * width;
    var y = initial ? random() * height : -random() * 90;
    var particle = {
      x: x,
      y: y,
      vx: 0,
      vy: 48 + random() * 78,
      phase: random() * Math.PI * 2,
      depth: random() > 0.58 ? 1 : 0,
      color: Math.floor(random() * colors.length),
      alpha: 0.22 + random() * 0.52,
      weight: 0.65 + random() * 0.7,
      historyX: new Float32Array(trailSize),
      historyY: new Float32Array(trailSize)
    };

    for (var i = 0; i < trailSize; i++) {
      particle.historyX[i] = x;
      particle.historyY[i] = y - ((trailSize - i) * particle.vy) / 60;
    }
    return particle;
  }

  function resize() {
    var bounds = root.getBoundingClientRect();
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (width * height * dpr * dpr > 4500000) {
      dpr = Math.sqrt(4500000 / (width * height));
    }

    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    bloom.width = Math.max(1, Math.ceil(canvas.width / 4));
    bloom.height = Math.max(1, Math.ceil(canvas.height / 4));
    bloomCtx.imageSmoothingEnabled = true;
    bloomCtx.imageSmoothingQuality = "medium";

    var target = Math.max(180, Math.min(1000, Math.round((width * height) / 950)));
    if (!particles.length) {
      for (var i = 0; i < target; i++) particles.push(makeParticle(true));
    } else if (particles.length > target) {
      particles.length = target;
    } else {
      while (particles.length < target) particles.push(makeParticle(true));
    }

    if (reducedMotion) draw();
  }

  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (var depth = 0; depth < 2; depth++) {
      for (var color = 0; color < colors.length; color++) {
        for (var age = 0; age < 6; age++) {
          var start = age * 2;
          var end = start + 2;
          var fade = 1 - age / 6;
          ctx.strokeStyle = colors[color];
          ctx.globalAlpha = fade * fade * (depth ? 0.52 : 0.3);
          ctx.lineWidth = (depth ? 1.05 : 0.7) * (1 - age * 0.055);
          ctx.beginPath();

          for (var i = 0; i < particles.length; i++) {
            var particle = particles[i];
            if (particle.depth !== depth || particle.color !== color) continue;
            var from = (head - start + trailSize) % trailSize;
            var to = (head - end + trailSize) % trailSize;
            ctx.moveTo(particle.historyX[from], particle.historyY[from]);
            ctx.lineTo(particle.historyX[to], particle.historyY[to]);
          }
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 0.72;
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = coreColor;
    ctx.beginPath();
    for (var j = 0; j < particles.length; j++) {
      var spark = particles[j];
      if (spark.color !== 2 || spark.alpha < 0.48) continue;
      var previous = (head - 1 + trailSize) % trailSize;
      ctx.moveTo(spark.historyX[head], spark.historyY[head]);
      ctx.lineTo(spark.historyX[previous], spark.historyY[previous]);
    }
    ctx.stroke();

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    bloomCtx.clearRect(0, 0, bloom.width, bloom.height);
    bloomCtx.drawImage(canvas, 0, 0, bloom.width, bloom.height);
  }

  function frame(now) {
    if (disposed) return;
    var rawDelta = lastTime ? Math.max(0, (now - lastTime) / 1000) : 0;
    var delta = Math.min(rawDelta, 0.04);
    lastTime = now;
    elapsed += delta;
    idleTime += delta;

    var ghostActive = !pointerActive && idleTime > 2.4;
    var targetX = pointerX;
    var targetY = pointerY;
    if (ghostActive) {
      targetX = width * (0.5 + 0.28 * Math.sin(elapsed * 0.37));
      targetY = height * (0.5 + 0.24 * Math.sin(elapsed * 0.51 + 1.2));
    }
    if (pointerActive || ghostActive) {
      cursorX += (targetX - cursorX) * Math.min(1, delta * 8);
      cursorY += (targetY - cursorY) * Math.min(1, delta * 8);
    }

    head = (head + 1) % trailSize;
    for (var i = 0; i < particles.length; i++) {
      var particle = particles[i];
      var wave = Math.sin(particle.y * 0.008 + elapsed * 0.5 + particle.phase);
      var targetVx = wave * (particle.depth ? 19 : 11);
      var targetVy = particle.vy + Math.cos(particle.x * 0.004 + elapsed * 0.4) * 8;
      var dx = particle.x - cursorX;
      var dy = particle.y - cursorY;
      var distanceSquared = dx * dx + dy * dy;
      var radius = 82 + particle.depth * 20;

      if ((pointerActive || ghostActive) && distanceSquared < radius * radius) {
        var distance = Math.max(1, Math.sqrt(distanceSquared));
        var strength = (1 - distance / radius) * 3.2;
        targetVx += (dx / distance) * strength * 75 - (dy / distance) * strength * 28;
        targetVy += (dy / distance) * strength * 75 + (dx / distance) * strength * 28;
      }

      particle.vx += (targetVx - particle.vx) * Math.min(1, delta * 2.8);
      particle.vy += (targetVy - particle.vy) * Math.min(1, delta * 1.6);
      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;

      if (particle.y > height + 35 || particle.x < -60 || particle.x > width + 60) {
        particle.x = random() * width;
        particle.y = -random() * 100;
        particle.vx = 0;
        for (var history = 0; history < trailSize; history++) {
          particle.historyX[history] = particle.x;
          particle.historyY[history] = particle.y;
        }
      } else {
        particle.historyX[head] = particle.x;
        particle.historyY[head] = particle.y;
      }
    }

    draw();
    raf = window.requestAnimationFrame(frame);
  }

  function onPointerMove(event) {
    var bounds = root.getBoundingClientRect();
    var x = event.clientX - bounds.left;
    var y = event.clientY - bounds.top;
    pointerActive = x >= 0 && x <= width && y >= 0 && y <= height;
    if (!pointerActive) return;
    pointerX = x;
    pointerY = y;
    if (!lastTime) {
      cursorX = x;
      cursorY = y;
    }
    idleTime = 0;
  }

  function onPointerLeave() {
    pointerActive = false;
  }

  function onVisibilityChange() {
    if (document.hidden) {
      window.cancelAnimationFrame(raf);
      raf = 0;
    } else if (!reducedMotion && !disposed && raf === 0) {
      lastTime = 0;
      raf = window.requestAnimationFrame(frame);
    }
  }

  resize();
  var observer = new ResizeObserver(resize);
  observer.observe(root);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("blur", onPointerLeave);
  document.addEventListener("visibilitychange", onVisibilityChange);

  if (!reducedMotion) raf = window.requestAnimationFrame(frame);

  window.addEventListener("pagehide", function cleanup() {
    disposed = true;
    window.cancelAnimationFrame(raf);
    observer.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("blur", onPointerLeave);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("pagehide", cleanup);
  }, { once: true });
})();
