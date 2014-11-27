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
  // if(Boards.getDemo().length === 0){
  if(true === true){
    var id = new Mongo.ObjectID()
    var defaultZones = ["Todo","Doing","Done"]

    Boards.insert({_id: id ,title: "Demo",zones: [],zoneWidth: 0})

    _.each(defaultZones, function(newZone){
      Boards.addZone(id, newZone)
    })

  }

});

Meteor.methods({
  clearAll: function(){
     Boards.remove({});
      Zones.remove({});
    Postits.remove({});
    return "All collections have been set to zero"
  }
})
