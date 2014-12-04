describe('Zone', function() {
var board;
var zoneId;

	beforeEach(function(){
		board = _.first(Boards.getDemo());
		zoneId = Zones.add("ToDo", 1, board._id);
		arr = Zones.find({}).fetch();
		hash = arr[arr.length -1];
	});

	it('should have a name', function() {	
		expect(hash.name).toEqual("ToDo");
	});

	it('should have a order', function() {	
		expect(hash.order).toEqual(1);
	});

	it('should have a board ID', function() {

		expect(hash.boardId).toEqual(board._id);
	});

	xit('should return all Zones for a board', function(){
		collection = Zones.allZonesOfABoard(board._id);
		expect(collection.length).toEqual(3);
	});

	afterEach(function(){
		Zones.remove(zoneId);
	});
});
