// Meteor.subscribe('Postits', 'Zones', 'Boards');

Router.route('/', function () {
  this.render('home')
})

Router.route('/board', function () {
	var board = Boards.findOne({title: "Demo"})  
	var zones = []
    if(board !== undefined){
      _.each(board.zones, function(zoneId){
        var zone = _.first(Zones.find(zoneId).fetch())
        var PostitsForZone = Postits.getByZone(zoneId);
        zonePostits = new Object({zone: zone, postits: PostitsForZone});
        zones.push(zonePostits);
      })
    }
	this.render('board', {data: {board: board, zones: zones}})
})

Router.route('/phone', function () {
  this.render('phone')
})


