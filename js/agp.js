//Site bootstrapper.
//Handle the loading of libraries, fallbacks and core site interation.
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
        load:['//cdnjs.cloudflare.com/ajax/libs/gsap/1.11.6/TweenMax.min.js',
             '/js/lib/handlebars-v1.3.0.js']
    },
    {
        load: [
          'js/siteInterations.js',
          'js/header.js'
        ],
        complete: function()
        {
            $(document).ready(function()
            {
                startHeader();
            });
        }
    }
]);


//Helpers
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}