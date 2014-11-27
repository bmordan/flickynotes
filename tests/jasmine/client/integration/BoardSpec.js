describe('the board page', function() {

  beforeEach(waitForRouter)

	it('should have a title that reads Demo', function(){

    visitTheBoard(function(){
      expect($('h1').text()).toEqual('Demo') 
    })

	});

});
