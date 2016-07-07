(function() {
  var triggerBttn = document.getElementById( 'trigger-contact-overlay' ),
    overlay = document.querySelector( 'div.overlay-contact' ),
    body = document.querySelector('body'),
    closeBttn = overlay.querySelector( 'button.overlay-close' );
    transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
    support = { transitions : Modernizr.csstransitions };

  function toggleOverlay() {
    if (classie.has( body, 'contact-overlay-closed')) {
      classie.remove( body, 'contact-overlay-closed');
      classie.add (body, 'contact-overlay-open');
      classie.add (body, 'an-overlay-open');
      classie.add( triggerBttn, 'open');
      classie.remove( triggerBttn, 'closed');
    } else {
      classie.add( body, 'contact-overlay-closed');
      classie.remove ( body, 'contact-overlay-open');
      classie.remove (body, 'an-overlay-open');
      classie.add( triggerBttn, 'closed');
      classie.remove( triggerBttn, 'open');
    }
    if( classie.has( overlay, 'open' ) ) {
      classie.remove( overlay, 'open' );
      classie.add( overlay, 'shut' );
      var onEndTransitionFn = function( ev ) {
        if( support.transitions ) {
          if( ev.propertyName !== 'visibility' ) return;
          this.removeEventListener( transEndEventName, onEndTransitionFn );
        }
        classie.remove( overlay, 'shut' );
      };
      if( support.transitions ) {
        overlay.addEventListener( transEndEventName, onEndTransitionFn );
      }
      else {
        onEndTransitionFn();
      }
    }
    else if( !classie.has( overlay, 'shut' ) ) {
      classie.add( overlay, 'open' );
    }
  }

  triggerBttn.addEventListener( 'click', toggleOverlay );
  //closeBttn.addEventListener( 'click', toggleOverlay );
})();
