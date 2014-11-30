// Meteor.publish('postits', function() {
//   return Postits.find({});
// });

// Meteor.publish('zones', function() {
//   return Zone.find({});
// });

// Meteor.publish('boards', function() {
//   return Boards.find({});
// });

Meteor.startup(function () {
  //Meteor.call('resetDemoBoard')
  Meteor.call('constructDemoBoard')
});

Meteor.methods({
  clearAll: function(){
     Boards.remove({});
      Zones.remove({});
    Postits.remove({});
    Pointer.remove({});
    console.log("All collections have been set to zero")
  },
  constructDemoBoard: function(){
    if(Boards.getDemo().length === 0){

      var id = new Mongo.ObjectID()
      var defaultZones = ["Todo","Doing","Done"]

      Boards.insert({_id: id ,title: "Demo",zones: [],zoneWidth: 0})

      _.each(defaultZones, function(newZone){
        Boards.addZone(id, newZone)
      })
    }
  },
  resetDemoBoard: function(){
    Boards.remove({title: "Demo"})
  },
  clearPointer: function(){
    Pointer.remove({})
    return true
    board = Boards.getDemo();
    Boards.remove({title: "Demo"});
  }
})
