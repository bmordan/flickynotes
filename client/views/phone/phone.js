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

Template.document_ready.rendered = function(){
    

    $('.carousel').carousel({
      interval: false
    })
    $('.carousel').carousel('pause')

    var textPostit = document.getElementById('submit-postit');
    var hammerPostit = new Hammer(textPostit);
    hammerPostit.get('swipe').set({direction: Hammer.DIRECTION_ALL});

    hammerPostit.on("swipeup", function(event) {
      var text = $('#text-postit');
      if(text.val()){
          var zoneId = $('.item.active h2').data();
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
