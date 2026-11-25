(function () {
  var btns = document.querySelectorAll('.lang button');
  function setLang(l) {
    document.documentElement.lang = l;
    document.querySelectorAll('[data-ko]').forEach(function (el) {
      el.innerHTML = el.getAttribute('data-' + l);
      if (el.hasAttribute('data-href-en')) {
        if (!el.dataset.hrefKo) el.dataset.hrefKo = el.getAttribute('href');
        el.setAttribute('href', l === 'en' ? el.getAttribute('data-href-en') : el.dataset.hrefKo);
      }
    });
    btns.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.l === l ? 'true' : 'false'); });
    try { localStorage.setItem('cw-lang', l); } catch (e) {}
  }
  btns.forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.l); }); });
  var q = new URLSearchParams(location.search).get('lang');
  var saved = (q === 'en' || q === 'ko') ? q : null;
  if (!saved) try { saved = localStorage.getItem('cw-lang'); } catch (e) {}
  var l = saved || ((navigator.language || 'ko').toLowerCase().indexOf('ko') === 0 ? 'ko' : 'en');
  if (l !== 'ko') setLang(l);
})();
