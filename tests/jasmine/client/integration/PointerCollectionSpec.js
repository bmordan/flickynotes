describe ('Pointer', function(){
    var id;

	it('has a id', function() {
		id = new Mongo.ObjectID()
		Pointer.add(id)
		var pointers =  Pointer.find(id).fetch();
		var pointer = _.last(pointers)
		console.log(pointer)
		expect(pointer._id).toEqual(id)
	});

	afterEach(function(){
		Pointer.remove(id);
	})

});