describe('Postit',function() {
	var board;
	var zoneId;

	beforeEach(function(){
		board = _.first(Boards.getDemo());
		zoneId = Zones.add("ToDo", 0, board._id);
		Postits.add("test content", zoneId);
		arr = Postits.find({}).fetch();
		hash = arr[arr.length -1];
	});

	it('should have content', function() {
		expect(hash.content).toEqual("test content");
	});

	it("should have a zone", function(){
		expect(hash.zoneId).toEqual(zoneId);
	});

	it('should be able to retreive all the postits of a zone', function(){
		zoneId2 = Zones.add("Zone 2", 1, board._id);
		Postits.add('Postit with zone 2', zoneId2);
		expect(Postits.getByZone(zoneId2).length).toEqual(1);
	});

});
