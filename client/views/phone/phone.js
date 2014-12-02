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
  
  // Meteor.call('clearPointer')
  Session.set('pointerId', new Mongo.ObjectID)

  var pointerId = function(){ return Session.get('pointerId')}

  var pointerElement = this.find('kbd')
  var pointerControl = new Hammer(pointerElement)

  pointerControl.on('tap', function(e){
    e.preventDefault()
    // if(e.pointerType === "touch"){
    console.log("tapped")
    var newPointerState = pointerState(Session.get('pointerState'));
    Session.set('pointerState', newPointerState);
    // }
  });

}

Tracker.autorun(function(){
  console.log("*****")
  console.log(Session.get('pointer'))
  if(Session.get('pointerState') === 'initialized'){
    console.log('initialized')
    if(pointer === null){
      pointer = new Pointer();
      Session.set('pointer', pointer)
      startMovementCapture();
    }
    pointer = Session.get('pointer')
    pointerStream.emit('createPointer', pointer);
  }
  else if(Session.get('pointerState') === 'moving'){
    console.log('moving')
    pointer = Session.get('pointer')
    pointer.visible = 'none'
    Session.set('pointer', pointer)
    pointerStream.emit('movePostit', pointer);
  }
  else if( Session.get('pointerState') === 'placed'){
    pointer = Session.get('pointer')
    stopMovementCapture();
    pointerStream.emit('resetPostit', pointer);
    Session.set('pointerState', undefined);
  }
});

function writeCoordinates(m){
  pointer = Session.get('pointer')
  pointer.x = (m.gamma*15).toPrecision(3)
  pointer.y = (m.beta*15).toPrecision(3)
  Session.set('pointer', pointer)
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

