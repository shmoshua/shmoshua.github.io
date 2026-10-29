// Shrinks display equations that are wider than the text column (mostly on phones),
// so they fit on screen instead of needing a sideways scroll. Equations are never
// shrunk below MIN of their normal size; anything still too wide keeps scrolling.
(function () {
  var MIN = 0.62;

  function fitAll() {
    var boxes = document.querySelectorAll('mjx-container[display="true"]');
    Array.prototype.forEach.call(boxes, function (c) {
      // MathJax may set its own font-size on the container; remember it once
      if (c.dataset.baseSize === undefined) c.dataset.baseSize = c.style.fontSize || '';
      c.style.fontSize = c.dataset.baseSize;
      var avail = c.clientWidth, need = c.scrollWidth;
      if (!avail || need <= avail + 1) return;
      var base = parseFloat(c.dataset.baseSize) || 100;   // percent
      var ratio = Math.max(MIN, avail / need);
      c.style.fontSize = (base * ratio).toFixed(1) + '%';
    });
  }

  // MathJax loads asynchronously: wait for it to finish typesetting the page
  function whenReady() {
    var mj = window.MathJax;
    if (mj && mj.startup && mj.startup.promise) {
      mj.startup.promise.then(function () {
        fitAll();
        // Web fonts can arrive after typesetting and change widths
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
      });
    } else {
      setTimeout(whenReady, 100);
    }
  }
  whenReady();

  var t;
  window.addEventListener('resize', function () {
    clearTimeout(t);
    t = setTimeout(fitAll, 150);
  });
})();
