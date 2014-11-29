describe('Postit',function() {

	beforeEach(function(){
		Postits.add("test content", "1");
		Postits.add("more test content", "1");
    postit = _.first(Postits.find({content: "test content"}).fetch())
	});

	it('should have content', function() {
		expect(postit.content).toEqual("test content");
	});

	it("should have a zone", function(){
		expect(postit.zoneId).toEqual("1")
	});

	it("returns all the postits for a zone", function(){
    var postits = Postits.forZone("1")
    expect(postits.length).toEqual(2)
	})

});
