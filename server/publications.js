Meteor.publish('postits', function() {
  return Postits.find({});
});


Meteor.publish('zones', function() {
  return Zone.find({});
});
