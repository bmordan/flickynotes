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
        var allPostits = Postits.find({}).fetch();
        var onlyForThisZonePostits= _.findWhere(allPostits, {zone:zoneId}); 

        console.log('just for this zone: ' + onlyForThisZonePostits);

        zonePostits = new Object({zone: zone, postits: allPostits});
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
  }
})
