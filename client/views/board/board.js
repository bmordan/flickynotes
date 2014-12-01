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
  }
})

Template.board.rendered = function(){

  var move = false;

  pointerStream.on('movePostit', function(){
    move = true
    var x = Pointer.returnx()
    var y = Pointer.returny()
    var el = document.elementFromPoint(x-2,y-2)
    if($(el).prop('tagName') === "LI"){
      Session.set('elementId',document.elementFromPoint(x-2,y-2).id)
      moveRecursive(Session.get('elementId')) 
    }
  })

  pointerStream.on('resetPostit', function(){
    move = false
    var postitId = Session.get('elementId')
    var zoneId = document.elementFromPoint(Pointer.returnx()-5,Pointer.returny()-5).id
    Postits.update(postitId, {$set: {zoneId: new Mongo.ObjectID(zoneId)}})
    Meteor.call('clearPointer')
  })

  function moveRecursive(elementId){
    $('#'+elementId).css('position', 'absolute')
    $('#'+elementId).css('left',Pointer.returnx()+'px')
    $('#'+elementId).css('top',Pointer.returny()+'px')
    if(move)
      setTimeout(function(){moveRecursive(elementId)},100)
  }


}




Template.board.events = {
  "click #clearPostits": function(){
    Meteor.call("removePostits");
  }
}