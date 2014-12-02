describe ("The Pointer Template's helpers", function(){

  var pointer;

	beforeEach(function() {
    pointer = new Pointer
	});

	beforeEach(function(done){
    Router.go('/board')
    Tracker.afterFlush(done)
  }) 

  beforeEach(waitForRouter)

	it('should assign pointer object x value to the element css', function() {
		expect($('nav').css('left')).toEqual('100px')
	});


	it('should assign the pointer object y value to the element css', function() {
		expect($('nav').css('top')).toEqual('200px')
	});

	// afterEach(function(){
	// 	Pointer.remove(id);
	// })

});