// Builds the "Contents" sidebar from the post's h2/h3 headings,
// so you never have to edit the table of contents by hand.
(function () {
  var nav = document.querySelector('nav.toc');
  if (!nav) return;

  // Headings inside a TL;DR box are left out of the contents
  var heads = Array.prototype.filter.call(
    document.querySelectorAll('article.article h2, article.article h3'),
    function (h) { return !h.closest('.tldr'); });
  if (!heads.length) { nav.remove(); return; }

  var title = document.createElement('div');
  title.className = 'toc-title';
  title.textContent = 'Contents';
  var list = document.createElement('ol');

  var sec = 0, sub = 0, used = {};
  var links = [];

  heads.forEach(function (h) {
    // Give every heading an id so it can be linked to
    if (!h.id) {
      var base = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
      var id = base, n = 2;
      while (used[id] || document.getElementById(id)) id = base + '-' + n++;
      h.id = id;
    }
    used[h.id] = true;

    // Mirror the CSS section numbering for headings with class="numbered"
    var num = '';
    if (h.classList.contains('numbered')) {
      if (h.tagName === 'H2') { sec++; sub = 0; num = sec + '.'; }
      else { sub++; num = sec + '.' + sub; }
    }

    var li = document.createElement('li');
    if (h.tagName === 'H3') li.className = 'subsec';
    var a = document.createElement('a');
    a.href = '#' + h.id;
    // Dated entries on attempt pages show their date first, e.g. "Oct 28 · First try"
    var date = '';
    var d = h.dataset.date && h.dataset.date.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (d) {
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      date = months[+d[2] - 1] + ' ' + (+d[3]) + ' · ';
    }
    a.textContent = date + (num ? num + ' ' : '') + h.textContent;
    li.appendChild(a);
    list.appendChild(li);
    links.push({ head: h, link: a });
  });

  nav.appendChild(title);
  nav.appendChild(list);

  // Highlight the section currently being read
  function update() {
    var current = links[0];
    links.forEach(function (x) {
      if (x.head.getBoundingClientRect().top < 120) current = x;
    });
    links.forEach(function (x) { x.link.classList.toggle('active', x === current); });
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();
