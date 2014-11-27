// Meteor.publish('postits', function() {
//   return Postits.find({});
// });

// Meteor.publish('zones', function() {
//   return Zone.find({});
// });

// Meteor.publish('Boards', function() {
//   return Boards.find({});
// });

Meteor.startup(function () {
  Meteor.call('constructDemoBoard')
});

Meteor.methods({
  clearAll: function(){
     Boards.remove({});
      Zones.remove({});
    Postits.remove({});
    console.log("All collections have been set to zero")
  },
  constructDemoBoard: function(){
    if(Boards.getDemo().length === 0){
      var id = new Mongo.ObjectID()
      var defaultZones = ["Todo","Doing","Done"]

      Boards.insert({_id: id ,title: "Demo",zones: [],zoneWidth: 0}, function(){
        _.each(defaultZones, function(newZone){
          Boards.addZone(id, newZone)
        })   
      })

    }
    return true
  }
})
