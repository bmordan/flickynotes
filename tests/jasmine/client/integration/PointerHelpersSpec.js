describe ("The Pointer Template's helpers", function(){

	beforeEach(function() {
    	id = new Mongo.ObjectID()
		Pointer.add(id)

	});

	beforeEach(function(done){
    	Router.go('/board')
    	Tracker.afterFlush(done)
  	}) 

  	beforeEach(waitForRouter)


	// it('should return the current value of x', function() {
	// 	var x = Template.pointer.__helpers[' x']();
	// 	expect(x).toEqual(10);
	// })


	it('should assign the database x value to the element css', function() {
		expect($('nav').css('left')).toEqual('10px')
	});


	it('should assign the database y value to the element css', function() {
		expect($('nav').css('top')).toEqual('20px')
	});


	// it('the pointer object should have the x coordinate in its css', function() {
	// 	// Update pointer object's x coordinate to equal 50
	// 	expect($('li').css('left')).toEqual('50px')
	// });


	// Go to board route if xy is a specific coordinate and we call 
	// Pointer.elementon() 
	// expect(Pointer.elementon().id).toEqual("column1")

	// when you enter a page for the first time, no pointer exists.
	// Go to route
	// expect Pointer.find().fetch().length toEqual 0

	afterEach(function(){
		Pointer.remove(id);
	})


});