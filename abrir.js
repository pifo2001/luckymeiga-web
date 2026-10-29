// Botón «Abrir en la app» de /ruleta y /regalo. Mientras la app no esté en las tiendas (tiendas.js vacío),
// abrir luckymeiga:// da en Safari «la dirección no es válida»: entonces se esconde y se avisa de que llega pronto.
// Con la app publicada, se intenta abrirla y, si no responde en un instante, se lleva a la tienda.
(function () {
  var T = window.TIENDAS || {}, b = document.getElementById('abrir');
  if (!b) return;
  var publicada = !!(T.ios || T.android);
  if (!publicada) {
    var aviso = document.createElement('p');
    aviso.className = 'aviso';
    aviso.textContent = 'Lucky Meiga llega muy pronto a App Store y Google Play. Vuelve en unos días y podrás abrir esto en la app.';
    b.parentNode.insertBefore(aviso, b);
    b.style.display = 'none';
    return;
  }
  b.addEventListener('click', function (e) {
    e.preventDefault();
    var destino = b.getAttribute('href'), ua = navigator.userAgent || '';
    var tienda = /Android/.test(ua) ? T.android : T.ios;
    var t = setTimeout(function () { if (tienda) location.href = tienda; }, 1400);
    document.addEventListener('visibilitychange', function () { if (document.hidden) clearTimeout(t); });
    location.href = destino;
  });
})();
