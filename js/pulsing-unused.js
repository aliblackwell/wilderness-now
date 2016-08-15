
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