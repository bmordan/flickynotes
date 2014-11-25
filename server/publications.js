Meteor.publish('postits', function() {
  return Postit.find({});
});
