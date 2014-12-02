Template.board.helpers({
  board: function() {
    Session.set('moveMe', true)
    return _.first(Boards.getDemo())
  },
  zones: function(){
    var zones = []
    var board = Boards.findOne({title: "Demo"})
    if(board !== undefined){
      _.each(board.zones, function(zoneId){
        var zone = _.first(Zones.find(zoneId).fetch())
        var PostitsForZone = Postits.getByZone(zoneId);
        zonePostits = new Object({zone: zone, postits: PostitsForZone});
        zones.push(zonePostits);
      })
    }
    return zones
  },
  zoneHeight: function(){
    return $(window).height()-75
  },
  asideHeight:function(){
    return $(window).height()-102
  }
})

Template.pointerElement.helpers({
  pointerRender: function(){
    return Session.get('pointer')
  },
  display: function(){
    return this.visibility;
  }
})

Template.board.rendered = function(){
  var move = false;

  pointerStream.on('createPointer', function(pointer){
    console.log("*******pointer created*******")
    console.log(pointer)
    Session.set('pointer', pointer)
  })

  pointerStream.on('movePostit', function(pointer){
    move = true
    if (Session.get('elementMoving') === undefined) {
      el = document.elementFromPoint(pointer.x-2,pointer.y-2)
      Session.set('elementMoving', el)
      alert(el);
    }
    else {
      var elementId = Session.get('elementMoving').id
      $('#'+elementId).css('position', 'absolute')
      $('#'+elementId).css('left',pointer.x + 'px')
      $('#'+elementId).css('top',pointer.y + 'px')
    }
  });

  pointerStream.on('resetPostit', function(pointer){
    move = false
    var postitId = Session.get('elementId')
    var zoneId = document.elementFromPoint(pointer.x - 5, pointer.y - 5).id
    Session.set('pointer', pointer)
    Postits.update(postitId, {$set: {zoneId: new Mongo.ObjectID(zoneId)}})
    $('#'+postitId).css('position', 'static')
  })

  // function moveRecursive(elementId, pointer){
  //   $('#'+elementId).css('position', 'absolute')
  //   $('#'+elementId).css('left',pointer.x + 'px')
  //   $('#'+elementId).css('top',pointer.y + 'px')
  //   if(move)
  //     setTimeout(function(){moveRecursive(elementId)},100)
  // }
}

Template.board.events = {
  "click #clearPostits": function(){
    Meteor.call("removePostits");
  }
}