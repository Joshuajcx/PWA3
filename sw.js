var nombreCache = 'cache1';

self.addEventListener(
  'install',
  function(evento) {
    evento.waitUntil(
      caches.open(nombreCache)
      .then(
        function(cache) {
          cache.addAll(
            [
              'index.html',
              'bootstrap-5.0.2-dist/css/bootstrap.min.css',
              'bootstrap-5.0.2-dist/js/bootstrap.bundle.min.js',
              'lib1.js',
              'lib2.js',
              'hola.jpg',
              'unicorn.jpg',
              'utp.png'
            ]
          );
        }
      )
    );
  }
);

self.addEventListener(
  'fetch',
  function(evento) {
    // Intercepta las peticiones de archivos .jpg y .png
    if (/\.jpg$/.test(evento.request.url)) {
      evento.respondWith(
        fetch('unicorn.jpg')
      );
    } else if (/\.png$/.test(evento.request.url)) {
      evento.respondWith(
        fetch('utp.png')
      );
    } else {
      // Para otros recursos, busca primero en la caché y luego en la red
      evento.respondWith(
        caches.match(evento.request)
        .then(
          function(respuesta) {
            if (respuesta) {
              return respuesta;
            }
            return fetch(evento.request);
          }
        )
      );
    }
  }
);