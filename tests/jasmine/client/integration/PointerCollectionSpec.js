describe ('Pointer', function(){
    var id;

    beforeEach(function() {
    	id = new Mongo.ObjectID()
		Pointer.add(id)
		pointers =  Pointer.find(id).fetch();
		pointer = _.last(pointers)
    });

	it('has a id', function() {
		expect(pointer._id).toEqual(id)
	});

	it ('has a x coordinate', function() {
		expect(pointer.x).toEqual(100)
	});

	it ('has a y coordinate', function() {
		expect(pointer.y).toEqual(200)
	});

	it ('will return the x coordinate', function() {
		expect(Pointer.returnx()).toEqual(100)
	});

    it ('will return the y coordinate', function() {
		expect(Pointer.returny()).toEqual(200)
	});

	afterEach(function(){
		Pointer.remove(id);
	})

});