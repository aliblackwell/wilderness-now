
var symbols, userPosition, map,
  activitiesList, allLocations,
  labels;
var circleRadius = 3;
var highlightColor = '#EC971F';


var parallax = function() {
  var scrolled = $(window).scrollTop();
  $('header .wn').css('top', (scrolled * 0.1) + 'px');
  var percent = scrolled * 0.08;
  percent = 50 - percent;
  $('header.banner.logo-overlay').css('background-position', '50% '+ percent +'%');
}

var createActivity = function(item, style, radius) {
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

var drawAllLocations = function() {
  allLocations = {}
  for (var i=0; i<allLocationsObj.length; i++) {
    // style should match object called resetStyles
    var style = 'fill:#ccc; fill-opacity: 0.5; stroke-width: 0';
    allLocations[allLocationsObj[i].slug] = createActivity(allLocationsObj[i], style, circleRadius);
  }
}

var drawThisPageActivities = function() {
  activitiesList = {}
  for (var i=0; i<locations.length; i++) {
    var style = 'fill: '+ highlightColor+'; fill-opacity: 1; stroke-width: 0;'
    activitiesList[locations[i].slug] = createActivity(locations[i], style, circleRadius);
  }
}

var drawThisPageTextLabels = function() {
  labels = map.addSymbols({
    type: kartograph.Label,
    data: allLocationsLabels,
    class: function(d) { return 'text-label '+ d[1].slug },
    location: function(d) { return d[0]; },
    style: function(d) { return 'font-family: Oswald; fill:#000; fill-opacity: .75; font-size: 11px;' },
    text: function(d) { return '0' }
  });
  console.log(labels)
}

var initMapInteractions = function() {
  $('.map-activities a').hover(function() {
    var aLength = 250;
    var slug = $(this).attr('data-slug');


    var distance = $(this).attr('data-dist');

    activitiesList[slug]["hovered"] = true;

    $('.text-label.'+ slug + ' tspan').html(distance + ' miles');

    if (distance != undefined) {
      $('.text-label.'+ slug).fadeIn('fast');
    }


    activitiesList[slug].update({
      attrs: {
        r: 25,
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
        r: circleRadius,
        'fill-opacity': 1,
        stroke: 'none',
        'stroke-width': 0
     }
    }, 500, function() {
      activitiesList[slug]["hovered"] = false;
    });
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
}

var drawMap = function(cont, position) {
  map = kartograph.map(cont);

  map.loadMap('/GBR.svg', function() {

    map.addLayer('context', {
      styles: {
        stroke: '#fff',
        fill: '#fff',
        opacity: 1
      }
    });

    map.addLayer('regions', {
      title: function(d) { return d.name },
      styles: {
        stroke: '#fff',
        fill: '#fff',
        opacity: 1
      }
    });

    resizeMap();

    drawAllLocations();

    drawThisPageActivities();

    drawThisPageTextLabels();



    initMapInteractions();

  }, { padding: -75 } );
}

var pulseUserLocation = function(activityGroup) {
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

var pulseActivity = function(activityGroup) {

  var animationLength = 750;
  if (activityGroup.hovered !== true) {
    activityGroup.update({
      attrs: {
        r: 4
      }
    }, animationLength);
  }
  setTimeout(function() {
    if (activityGroup.hovered !== true) {
      activityGroup.update({
        attrs: {
          r: circleRadius
        }
      }, animationLength);
    }
    setTimeout(function() {
      pulseActivity(activityGroup);
    }, animationLength)
  }, animationLength)
}

var geolocationSuccess = function(position) {
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
  $.each(activitiesList, function(k,activity) {
    //pulseActivity(activity);
  })
}

var geolocationError = function(error) {
  // fail silently no biggie
}

var getDistanceFromLatLonInMiles = function(lat1,lon1,lat2,lon2) {
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

var deg2rad = function(deg) {
  return deg * (Math.PI/180)
}

var resizeMap = function() {
  var c = $('#map');
  var ratio = map.viewAB.width / map.viewAB.height;
  c.height( c.width() / ratio );
  map.resize();
};


$(function() {

  if ($(window).width() >= 768) {
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
    drawMap('#map0');
    $(window).resize(resizeMap);

  }

  if ($(window).width() > 1024) {
    $(window).scroll(parallax);
  }

});
