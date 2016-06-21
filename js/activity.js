$(function() {

  $(window).scroll(function(e){
      parallax();
  });

  function parallax(){
      var scrolled = $(window).scrollTop();
      $('.banner-map').css('top', (20 + (-scrolled * 0.05) + 'px'));
      $('header .wn').css('top', (scrolled * 0.1) + 'px');
  }


  var symbols, userPosition, map;
  var circleRadius = 3;
  var highlightColor = '#EC971F';


  function drawMap(cont, position) {

    map = kartograph.map(cont);
    map.loadMap('/GBR.svg', function() {
        map.addLayer('context', {
            styles: {
                stroke: '#fff',
                fill: '#fff',
                opacity: 0.9
            }
        });

        map.addLayer('regions', {
            title: function(d) { return d.name },
            styles: {
                stroke: '#fff',
                fill: '#fff',
                opacity: 0.6
            }
        });

        resizeMap();

        var scale = kartograph.scale.sqrt(locations.concat([{ nb_visits: 0 }]), 'nb_visits').range([2, 30]);






        function pulseActivity(activityGroup) {
          // $('.text-label').fadeOut();
          // $('.'+activityGroup.data.item.slug).fadeIn();
          $('.map-activities li').removeClass('highlighted');
          $('.map-activities .'+activityGroup.data.item.slug).addClass('highlighted')

          var animationLength = 600;
          activityGroup.update({
            attrs: {
              r: 10
            }
          }, animationLength);
          setTimeout(function() {
            activityGroup.update({
              attrs: {
                r: 3
              }
            }, animationLength);
          }, animationLength)
        }

        function createActivity(item, style, radius) {
          var activity = map.addSymbols({
            type: kartograph.Bubble,
            data: { item },
            location: function(city) {
                return [city.long, city.lat];
            },
            radius: radius,
            click: function(d) {
            },
            sortBy: 'radius desc',
            style: style
          });
          return activity;
        }



        var allLocations = {}
        for (var i=0; i<allLocationsObj.length; i++) {
          // style should match object called resetStyles
          var style = 'fill:#ccc; fill-opacity: 0.5; stroke-width: 0';
          var radius = 3;
          allLocations[allLocationsObj[i].slug] = createActivity(allLocationsObj[i], style, radius);
        }

        var activitiesList = {}
        for (var i=0; i<locations.length; i++) {
          var style = 'fill: '+ highlightColor+'; fill-opacity: 1; stroke-width: 0;'
          var radius = 3;
          activitiesList[locations[i].slug] = createActivity(locations[i], style, radius);
        }

        map.addSymbols({
          type: kartograph.Label,
          data: allLocationsLabels,
          class: function(d) { return 'text-label '+ d[1].slug },
          location: function(d) { return d[0]; },
          style: function(d) { return 'font-family: Oswald; fill:#000; fill-opacity: .75; font-size: 11px;' },
          text: function(d) { return '0' }
        });

        function loopThroughActivities(morseIndex, activityIndex) {
          var wnMorse = [0,1,1,"/",0,0,"/",0,1,0,0,"/",1,0,0,"/",0,"/",0,1,0,"/",1,0,"/",0,"/",0,0,0,"/",0,0,0,"/",1,0,"/",1,1,1,"/",0,1,1];
          if (morseIndex > wnMorse.length - 1 ) {
            morseIndex = 0;
          }
          if (activityIndex > locations.length - 1) {
            activityIndex = 0;
          }
          var pulse, runAnimation;

          var timer = [1200, 3600, 3600];

          switch(wnMorse[morseIndex]) {
            case 0:
              pulse = timer[0];
              runAnimation = true;
              // console.log('DOT');
              break;
            case 1:
              pulse = timer[1];
              runAnimation = true;
              // console.log('DASH');
              break;
            default:
              pulse = timer[2];
              // console.log('PAUSE');
          }

          setTimeout(function() {
            if (runAnimation === true) {
              if(userPosition != undefined) {
                pulseUserLocation(userPosition);
              }
              pulseActivity(activitiesList["activity"+activityIndex])
              activityIndex++;
            }
            morseIndex++;
            loopThroughActivities(morseIndex, activityIndex)
          }, pulse)


        }

       // loopThroughActivities( 0, 0 );
        $('.map-activities a').hover(function() {
          var aLength = 500;
          var slug = $(this).attr('data-slug');


          var distance = $(this).attr('data-dist');

          $('.text-label.'+ slug + ' tspan').html(distance + ' miles');

          if (distance != undefined) {
            $('.text-label.'+ slug).fadeIn('fast');
          }


          activitiesList[slug].update({
            attrs: {
              r: 20,
              'fill-opacity': 1,
              stroke: '#fff',
              'stroke-width': 0
           }
          }, aLength);
          fadeOutActivitiesAnimation();
        }, function() {
          $('.text-label').hide();
          var slug = $(this).attr('data-slug');
          activitiesList[slug].update({
            attrs: {
              r: 3,
              'fill-opacity': 1,
              stroke: 'none',
              'stroke-width': 0
           }
          }, 500);
        })

        function fadeOutActivitiesAnimation() {
          // $.each(activitiesList, function(i, item) {

          //   item.update({
          //     attrs: {
          //       'fill-opacity': 0
          //     }
          //   }, 500)
          //   console.log(item)
          // })
          // $('circle.bubble').hide()
        }


      }, { padding: -75 } );
  }

  function pulseUserLocation(activityGroup) {
    var animationLength = 750;
    activityGroup.update({
      attrs: {
        r: 10
      }
    }, animationLength);
    setTimeout(function() {
      activityGroup.update({
        attrs: {
          r: 5
        }
      }, animationLength);
      setTimeout(function() {
        pulseUserLocation(activityGroup);
      }, animationLength);
    }, animationLength)
  }

  navigator.geolocation.getCurrentPosition(success, error);
  drawMap('#map0');
  function success(position) {
    userPosition = map.addSymbols({
      type: kartograph.Bubble,
      data: [{
        'name': 'Your location',
        'lat': position.coords.latitude,
        'long': position.coords.longitude,
        'slug': 'your-position'
      }],
      location: function(you) {
          return [you.long, you.lat];
      },
      sortBy: 'radius desc',
      id: 'your-position',
      radius: 5,
      style: 'fill:'+highlightColor+'; stroke: #000; stroke-width: 0; fill-opacity: 1'
    })

    $.each(locations, function(k,location) {
      var userLat = position.coords.latitude;
      var userLon = position.coords.longitude;
      location.distance = getDistanceFromLatLonInMiles(userLat, userLon, location.lat, location.long)
      location.distance = location.distance.toFixed(0);
      $('.map-activities .'+location.slug +' a').attr('data-dist', location.distance );

    })

    pulseUserLocation(userPosition);

  }

  function error(error) {
    console.log(error);
  }

  function getDistanceFromLatLonInMiles(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d * 0.621371;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }



  var resizeMap = function() {
    var c = $('#map');
    var ratio = map.viewAB.width / map.viewAB.height;
    c.height( c.width() / ratio );
    map.resize();
  };
  $(window).resize(resizeMap);

});
