$(function() {
  $('.activities-dropdown').click(function() {
    event.preventDefault();
  })


  $(window).scroll(function(e){
      parallax();
  });

  function parallax(){
      var scrolled = $(window).scrollTop();

      //$('.banner-map').css('top', -((scrolled + 100) * 0.2) + 'px');
      //$('.banner-map').css('top', '100px');
      $('.banner-map').css('top', (-50 - (scrolled * 0.05) + 'px'));

  }

  $('.typeform-share').on('click', function() {
    //event.preventDefault()
  })

})

var symbols;
var circleRadius = 3;
$(function() {
  function map(cont, clustering) {
    var map = kartograph.map(cont);
    map.loadMap('/GBR.svg', function() {
        // map.addLayer('context', {
        //     styles: {
        //         stroke: '#aaa',
        //         fill: '#f6f4f2'
        //     }
        // });
        map.addLayer('regions', {
            id: 'bg',
            styles: {
                stroke: '#999',
                'stroke-width': 1.5,
                'stroke-linejoin': 'round'
            }
        });
        map.addLayer('regions', {
            title: function(d) { return d.name },
            styles: {
                stroke: '#fff',
                fill: '#fff'
            }
        });
        var scale = kartograph.scale.sqrt(locations.concat([{ nb_visits: 0 }]), 'nb_visits').range([2, 30]);
        symbols = map.addSymbols({
            type: kartograph.Bubble,
            data: locations,
            location: function(city) {
                return [city.long, city.lat];
            },
            radius: circleRadius,
            click: function(d) {
              moveChosenActivity(d.slug)
              selectActivity(d.slug);
            },
            sortBy: 'radius desc',
            style: 'fill:#000; stroke: #fff; fill-opacity: 1;',
        });
      }, { padding: -75 });
  }
  map('#map0');

  $('.activity-card').hover(function() {
    var card = $(this)
    selectActivity(card.attr('id'));
  })
});
var timeout;
function selectActivity(slug) {
  $.each(symbols.symbols, function(i,k) {
    k.radius = circleRadius;
    k.update();
    $('.card').removeClass('selected')
    $('#'+slug).addClass('selected');

    if (slug != undefined) {
      if (k.data.slug == slug) {

        k.radius = 6
        k.update()
        clearTimeout(timeout);
        timeout = setTimeout(selectActivity, 5000);

      }
    }
  })
}

function moveChosenActivity(slug) {
  var toEnd = $('.cd-1').children('.card').first();

  $(toEnd).insertAfter('#'+slug)
  $('#'+slug).prependTo('.cd-1')
}

