Template.pointer.rendered = function(){
  Session.set('movePostit', "")
}

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
    if(Pointer.find({}).fetch().length === 0){
      return "none"
    }else{
      return "inline"
    }
  },
  taps: function(){
    if(Pointer.find({}).fetch()[0].taps === 2){
      Session.set('taps', Pointer.find({}).fetch()[0].taps)
    }
    if(Session.get('taps') === 2 && Session.get('movePostit') === ""){
      Session.set('movePostit', Pointer.overElement().id)
    }
    if(Session.get('taps') === 2 && Session.get('movePostit') !== ""){
      $('#'+Session.get('movePostit')).css('left', Pointer.returnx()+'px');
      Session.set('taps', 3)
    }
    if(Session.get('taps') ===3 && Session.get('movePostit') !== ""){
      Session.set('taps', 0);
      Session.set('movePostit', "")
    }

  }
})

// Tracker.autorun(function(){
//   if (Session.get('movePostit') !== "") {
//     // $('nav').hide();
//     $('#'+Session.get('movePostit')).css('left', Pointer.returnx()+'px');
//     console.log(Session.get('movePostit'))
//   }
// })


