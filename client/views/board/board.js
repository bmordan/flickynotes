Template.board.helpers({
  board: function() {
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
    Session.set('element', element)
    return element
  }
})

Template.board.events = {
  "click #clearPostits": function(){
    Meteor.call("removePostits");
  }
}