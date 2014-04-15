Modernizr.load([
  {
    load: '//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js',
    complete: function () {
      if ( !window.jQuery ) {
            Modernizr.load('js/lib/jquery-2.1.0.min.js');
      }
    }
  },
  {
    load:'//cdnjs.cloudflare.com/ajax/libs/gsap/1.11.6/TweenMax.min.js'
  },
  {
    load: 'js/siteInterations.js'
  }
]);