Template.pointercontrol.rendered = function(){
  
  Session.set('taps', 0)
  Session.set('pointerId', new Mongo.ObjectID)

  var pointerElement = this.find('kbd')
  var pointerControl = new Hammer(pointerElement)

  pointerControl.on('tap', function(e){
    Session.set('taps', Session.get('taps')+1)
  })
}

Tracker.autorun(function(){
  if(Session.get('taps') === 1){
    Pointer.insert({_id: Session.get('pointerId'), x: 100, y: 100})
    startMovementCapture()
  }
  if(Session.get('taps') === 3){
    Pointer.remove(Session.get('pointerId'))
    stopMovementCapture()
  }

})

function writeCoordinates(m){
  var x = (m.gamma*15).toPrecision(3) 
  var y = (m.beta*15).toPrecision(3)
  Pointer.update(Session.get('pointerId'),{$set:{x: x, y: y}})
}

function startMovementCapture() {
  window.addEventListener('deviceorientation', writeCoordinates, false)
}

function stopMovementCapture() {
  window.removeEventListener('deviceorientation', writeCoordinates, false)
}
