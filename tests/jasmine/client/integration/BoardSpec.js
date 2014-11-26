
describe('board', function() {
	beforeEach(waitForRouter)

	it('should have a board route', function(){
		if(location.pathname !=='/board')
			window.location='/board'
		expect($('h1').html()).toEqual('Board')
	});
});
