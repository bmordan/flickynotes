// Meteor.subscribe('Postits', 'Zones', 'Boards');

Router.route('/', function () {
  this.render('home')
})

Router.route('/board', function () {
  this.render('board')
})

Router.route('/phone', function () {
  this.render('phone')
})


