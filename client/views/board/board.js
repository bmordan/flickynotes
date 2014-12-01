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
  }
})

Template.pointer.helpers({
  x: function() {
    return Pointer.returnx()
  },
  y: function() {
    return Pointer.returny()
  },
  display: function(){
    return Pointer.returnDisplay()
  },
  element: function(){
    var element = document.elementFromPoint(Pointer.returnx(),Pointer.returny()).id
    var pointerId = Pointer.returnId()
    Pointer.update(pointerId, {$set: {element: element}})
    moveElement(Pointer)
    return element
  },
  move: function(){
    if(Session.get('moveMe') === false && Pointer.returnElement() !== ""){  
      console.log("running move function in side while loop")
      var element = Pointer.returnElement()
      $('#'+element).css('position','absolute')
      $('#'+element).css('left',Pointer.returnx())
      $('#'+element).css('top',Pointer.returny())
    }
    return
  }
})

function moveElement(Pointer){
  if(Pointer.returnTaps() === 2){
    Session.set('moveMe', false)
  }else{
    Session.set('moveMe', true)
  }
}

Template.board.events = {
  "click #clearPostits": function(){
    Meteor.call("removePostits");
  }
}