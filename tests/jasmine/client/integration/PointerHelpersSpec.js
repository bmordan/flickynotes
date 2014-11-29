describe ("The Pointer Template's helpers", function(){

  var id;

	beforeEach(function() {
    id = new Mongo.ObjectID()
		Pointer.add(id)
	});

	beforeEach(function(done){
    Router.go('/board')
    Tracker.afterFlush(done)
  }) 

  beforeEach(waitForRouter)

	it('should assign the database x value to the element css', function() {
		expect($('nav').css('left')).toEqual('100px')
	});


	it('should assign the database y value to the element css', function() {
		expect($('nav').css('top')).toEqual('200px')
	});

	afterEach(function(){
		Pointer.remove(id);
	})

});

describe ("The Pointer Template's helpers", function(){

  var id;
  var elementId;

	beforeEach(function() {
    id = new Mongo.ObjectID()
		Pointer.add(id)
		Pointer.update(id,{x: 100, y:100})
	});

	beforeEach(function(done){
    Router.go('/board')
    Tracker.afterFlush(done)
  }) 

  beforeEach(waitForRouter)

	it('should react to the changing value and move position', function(){
		expect($('nav').css('left')).toEqual('100px')
	})

  // it('knows the element it is positioned over', function(){
  // 	expect(elementId).toEqual('123')
  // })

	afterEach(function(){
		Pointer.remove(id);
	})

});