Template.pointercontrol.rendered = function(){
  
  Meteor.call('clearPointer')
  Session.set('pointerId', new Mongo.ObjectID)

  var pointerId = function(){ return Session.get('pointerId')}
  var pointerElement = this.find('kbd')
  var pointerControl = new Hammer(pointerElement)

  pointerControl.on('tap click', function(e){
    
    switch(managePointerTaps(pointerId)){
      case 0:
        stopMovementCapture()
        pointerStream.emit('resetPostit')
        console.log("update postit | reset")
        break;
      case 1:
        startMovementCapture()
        console.log("move pointer")
        break;
      case 2:
        Pointer.update(Session.get('pointerId'),{$set:{visible: "none"}})
        pointerStream.emit('movePostit') 
        console.log("move postit")  
        break;
    }
  })
}

function managePointerTaps(pointerId){
  if(Pointer.find().fetch().length === 0){
    Pointer.add(pointerId())
    return 1
  }else{
    return Pointer.incrementTap(pointerId())
  }
}

function writeCoordinates(m){
  var board = _.first(Boards.getDemo())
  var halfWindowWidth = board.windowWidth/2.1
  var halfWindowHeight = board.windowHeight/2.1
  var x = (halfWindowWidth + (m.gamma*15)).toPrecision(3)
  var y = (((m.beta*-1)*15) + (halfWindowHeight)).toPrecision(3)
  Pointer.update(Session.get('pointerId'),{$set:{x: x, y: y}})
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

