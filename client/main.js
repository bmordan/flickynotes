// Meteor.subscribe('Postits', 'Zones', 'Boards');

Router.route('/', function () {
  this.render('home')
})

Router.route('/board', function () {
	var board = _.first(Boards.find().fetch()) 
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
	board = _.first(Boards.getDemo());
  arrZones = Zones.allZonesOfABoard(board._id);
  _.each(arrZones, function(item){
      if(item.order === 0){
        Zones.update(item._id, {$set: {selected: "active"}});
      }
  });
  arrZones = Zones.allZonesOfABoard(board._id);
  sortedZones = _.sortBy(arrZones, 'order');
  this.render('phone', {data: {zones:sortedZones}})
})


