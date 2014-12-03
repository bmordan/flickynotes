describe("pointer object", function(){

	var pointer;

	beforeEach(function() {
    pointer = new Pointer
	});

	// it('should initialize with the default values', function(){
		it('default x should be 100', function(){
			expect(pointer.x).toEqual(100)
		});

		it('default y should be 200', function(){
			expect(pointer.y).toEqual(200)
		});

		it('default visibility should be set to inline', function(){
			expect(pointer.visible).toEqual('inline')
		});

		it('default element should be null', function(){
			expect(pointer.element).toEqual(null)
		});			
	// });
});