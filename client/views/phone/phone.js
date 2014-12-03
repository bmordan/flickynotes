var pointerStates = ['initialized', 'moving', 'placed'];

function pointerState(previousPointerState){
  if(previousPointerState){
    var previousIndex = _.indexOf(pointerStates, previousPointerState);
    return pointerStates[previousIndex + 1];
  }
  else{
    return _.first(pointerStates);
  }
}

Template.pointercontrol.rendered = function(){

  var pointerElement = this.find('kbd')
  var pointerControl = new Hammer(pointerElement)

  pointerControl.on('tap', function(e){
    e.preventDefault()
    console.log("tapped")
    var newPointerState = pointerState(Session.get('pointerState'));
    Session.set('pointerState', newPointerState);

  });


}

Tracker.autorun(function(){

  switch(Session.get('pointerState')){
    case 'initialized':
      if(pointer === null){
        pointer = new Pointer();
        Session.set('pointer', pointer)
        startMovementCapture();
      }
      pointerStream.emit('createPointer', Session.get('pointer'))    
      break;
    case 'moving':
      pointerStream.emit('movePostit', Session.get('pointer'))
      break;
    case 'placed':
      pointerStream.emit('resetPostit', Session.get('pointer'));
      stopMovementCapture();
      Session.set('pointerState', undefined);
      pointer = null;
      break; 
  }

});

function writeCoordinates(m){
  var board = _.first(Boards.getDemo())
  var halfWindowWidth = board.windowWidth/2.1
  var halfWindowHeight = board.windowHeight/2.1 
  pointer = Session.get('pointer')
  pointer.x = (halfWindowWidth + (m.gamma*15)).toPrecision(3)
  pointer.y = (((m.beta*-1)*15) + (halfWindowHeight)).toPrecision(3)
  Session.set('pointer', pointer)
  console.log(pointer.x,pointer.y)
}

function startMovementCapture() {
  window.addEventListener('deviceorientation', writeCoordinates, false)
}

function stopMovementCapture() {
  window.removeEventListener('deviceorientation', writeCoordinates, false)
}

Template.document_ready.rendered = function(){

    $('.carousel').carousel({
      interval: false
    })
    $('.carousel').carousel('pause')

    var textPostit = document.getElementById('submit-postit');
    var hammerPostit = new Hammer(textPostit);
    hammerPostit.get('swipe').set({direction: Hammer.DIRECTION_ALL});

    hammerPostit.on("swipeup", function(event) {
      var audio = new Howl({
        urls: ['sound.ogg', 'sound.mp3'],
        buffer: true
      })
      var text = $('#text-postit');
      if(text.val()){
        audio.play();
        var zoneId = $('.item.active h2').data().id;
        Postits.add(text.val(), zoneId);
        text.val("");
      }
      else {
        alert("You need to insert a text to post to the board");
      }
    });

    var carouselSwipe = document.getElementById('carousel-example-generic');
    var hammerSwipe = new Hammer(carouselSwipe); 
    hammerSwipe.get('swipe').set({direction: Hammer.DIRECTION_ALL})

    hammerSwipe.on('swipeleft', function(){
        $('.carousel').carousel('next'); 
    });

    hammerSwipe.on('swiperight', function(){
        $('.carousel').carousel('prev'); 
    });

}

Template.zones.helpers({
  zonesCollection: function(){
    board = _.first(Boards.getDemo());
    arrZones = Zones.allZonesOfABoard(board._id);
    _.each(arrZones, function(item){
        if(item.order === 0){
             Zones.update(item._id, {$set: {selected: "active"}});
        }
    });
    arrZones = Zones.allZonesOfABoard(board._id);
    _.sortBy(arrZones, 'order');
    return _.sortBy(arrZones, 'order');
  }
});

Template.indicators.helpers({
  zonesCollection: function(){
    board = _.first(Boards.getDemo());
    arrZones = Zones.allZonesOfABoard(board._id);
    _.each(arrZones, function(item){
        if(item.order === 0){
             Zones.update(item._id, {$set: {selected: "active"}});
        }
    });
    arrZones = Zones.allZonesOfABoard(board._id);
    _.sortBy(arrZones, 'order');
    return _.sortBy(arrZones, 'order');
  }
});

