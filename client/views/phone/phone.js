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
        break;
      case 1:
        startMovementCapture()
        break;
      case 2:
        Pointer.update(Session.get('pointerId'),{$set:{visible: "none"}})
        pointerStream.emit('movePostit') 
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
  var x = (480 + (m.gamma*12)).toPrecision(3)
  var y = (m.beta*12).toPrecision(3)
  Pointer.update(Session.get('pointerId'),{$set:{x: x, y: y}})
}

function startMovementCapture() {
  window.addEventListener('deviceorientation', writeCoordinates, false)
}

function stopMovementCapture() {
  window.removeEventListener('deviceorientation', writeCoordinates, false)
}

Template.submitPostit.rendered = function(){
  
  var textarea = this.find('textarea')
  var postit = new Hammer(textarea)
  postit.get('swipe').set({direction: Hammer.DIRECTION_ALL})
  
  postit.on('swipeup', function(e){
    var content = $('textarea').val()
    var zoneId = $('.item.active label').data().id
    if(content !== ""){
      Postits.add(content,zoneId)
      playSound()
    }else{
      alert("Whoops! Your note was empty.");
    }
  })

}

Template.zoneSelector.rendered = function(){

  $('.carousel').carousel({interval: false})
  $('.carousel').carousel('pause')

  var zoneSelector = new Hammer(document.getElementById('carousel'))
  zoneSelector.get('swipe').set({direction: Hammer.DIRECTION_ALL})

  zoneSelector.on('swipeleft', function(){
    $('.carousel').carousel('next');
  })
  zoneSelector.on('swiperight', function(){
    $('.carousel').carousel('prev');
  })
}

function playSound(){
  $('#sendSound').get(0).play()
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

