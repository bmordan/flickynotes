describe('the board page', function() {
	
  beforeEach(function(done){
    Router.go('/board')
    Tracker.afterFlush(done)
  }) 

  beforeEach(waitForRouter)

	it('should have a title that reads Demo', function(){
    expect($('header').text()).toEqual('Demo')
	});

  it('should have three columns', function(){
    expect($('fieldset').size()).toEqual(3)
  });

});
