describe('the board page', function() {
	
  beforeEach(function(done){
    Router.go('/board')
    window.waitForRouter(done)
  })

	it('should have a title that reads Demo', function(){
    expect($('h1').text()).toEqual('Demo')
	});

});
