describe('Postit',function() {

	beforeEach(function(){
		Postits.add("test content", "1");
		arr = Postits.find({}).fetch();
		hash = arr[arr.length -1];
	});

	it('should have content', function() {
		expect(hash.content).toEqual("test content");
	});

	it("should have a zone", function(){
		expect(hash.zone).toEqual("1")
	});

});
