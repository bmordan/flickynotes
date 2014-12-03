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

function pointerReset(){
  stopMovementCapture();
  Session.set('pointerState', undefined);
  pointer = null;
}

Template.pointercontrol.rendered = function(){

  var pointerElement = this.find('kbd')
  var pointerControl = new Hammer(pointerElement)

  pointerControl.on('tap', function(e){
    e.preventDefault()
    var newPointerState = pointerState(Session.get('pointerState'));
    Session.set('pointerState', newPointerState);
  });

  pointerStream.on('resetPointer', function(){
    pointerReset()
  })
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
      pointerReset()
      break; 
  }

});

function writeCoordinates(m){
  // var board = _.first(Boards.getDemo())
  var halfWindowWidth = 680
  var halfWindowHeight = 400 
  pointer = Session.get('pointer')
  pointer.x = (halfWindowWidth + (m.gamma*15)).toPrecision(4)
  pointer.y = (((m.beta*-1)*15) + (halfWindowHeight)).toPrecision(4)
  Session.set('pointer', pointer)
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
      $('textarea').val("")
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

