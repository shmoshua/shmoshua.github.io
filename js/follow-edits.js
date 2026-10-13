// Local preview only (loaded by `jekyll serve`, never on the live site).
// When the page reloads after you save, scroll to the part of the post you just
// edited instead of jumping back to the top.
(function () {
  var KEY = 'follow-edits:' + location.pathname;
  var article = document.querySelector('article.article');
  if (!article) return;

  // We restore the position ourselves, after the math has rendered.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  function blocks() {
    return Array.prototype.map.call(article.children, function (el) {
      return el.textContent.replace(/\s+/g, ' ').trim();
    });
  }

  // Remember what the page said, and where you were, right before it reloads.
  window.addEventListener('pagehide', function () {
    try {
      sessionStorage.setItem(KEY, JSON.stringify({ y: window.scrollY, blocks: blocks() }));
    } catch (e) {}
  });

  function restore() {
    var saved = null;
    try { saved = JSON.parse(sessionStorage.getItem(KEY)); } catch (e) {}
    if (!saved) return;

    // Start where you were...
    window.scrollTo(0, saved.y);

    // ...then find the first block whose text changed.
    var now = blocks(), changed = -1;
    for (var i = 0; i < Math.max(now.length, saved.blocks.length); i++) {
      if (now[i] !== saved.blocks[i]) { changed = i; break; }
    }
    if (changed < 0) return;
    var el = article.children[Math.min(changed, article.children.length - 1)];
    if (!el) return;

    // Only move if the edited part isn't already on screen.
    var r = el.getBoundingClientRect();
    if (r.top < 0 || r.bottom > window.innerHeight) {
      el.scrollIntoView({ block: 'center' });
    }
  }

  // Wait until MathJax has finished, since rendered math changes the page height.
  var waited = 0;
  (function whenMathReady() {
    var p = window.MathJax && MathJax.startup && MathJax.startup.promise;
    if (p) { p.then(restore); return; }
    if ((waited += 50) > 5000) { restore(); return; }   // no math on this page
    setTimeout(whenMathReady, 50);
  })();
})();
