// Botón «Abrir en la app» de /ruleta y /regalo. Mientras la app no esté en las tiendas (tiendas.js vacío),
// abrir luckymeiga:// da en Safari «la dirección no es válida»: entonces se esconde y se avisa de que llega pronto.
// Con la app publicada, el botón intenta abrirla (sin redirigir a la tienda: para eso está «Descargar la app»).
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
  // Solo se abre la app. Antes, si la página seguía visible 1,4 s después, se mandaba a la tienda; pero en iOS el aviso
  // «¿Abrir en Lucky Meiga?» deja la página visible mientras se decide, y quien la tenía instalada acababa en App Store.
  // La tienda queda en el botón «Descargar la app».
  b.addEventListener('click', function (e) {
    e.preventDefault();
    location.href = b.getAttribute('href');
  });
})();
