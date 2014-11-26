describe ('Boards', function(){
	it("should have a name", function(){
		Boards.add("test");
		arr = Boards.find({}).fetch();
		hash = arr[arr.length -1];
		expect(hash.name).toEqual("test")
	});
})