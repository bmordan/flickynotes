Meteor.publish('postits', function() {
  return Postits.find({});
});
