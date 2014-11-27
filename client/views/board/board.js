Template.board.helpers({
  board: function() {
    return _.first(Boards.getDemo())
  },
  zones: function(){
    var zones = []
    var board = _.first(Boards.getDemo())
    _.each(board.zones, function(zoneId){
      var zone = _.first(Zones.find(zoneId).fetch())
      zones.push(zone)
    })
    return zones
  },
  zoneHeight: function(){
    return $(window).height()-75
  }
})