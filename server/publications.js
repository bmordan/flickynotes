Meteor.publish('postits', function() {
  return Postits.find({});
});


Meteor.publish('zones', function() {
  return Zone.find({});
});

Meteor.publish('boards', function() {
  return Boards.find({});
});