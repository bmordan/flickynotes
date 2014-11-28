describe('Zone', function() {

	beforeEach(function(){
		Zones.add("ToDo", 1, "2");
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
		expect(hash.boardId).toEqual("2");
	});
});
