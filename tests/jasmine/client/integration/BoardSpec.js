describe('the board page', function() {

  beforeEach(waitForRouter)

	it('has a title that reads Demo', function(){
    $('#boardLink').click(function(){
      expect($('h1').text()).toEqual('Demo') 
    })

	});

  it('has three zones', function(){
    $('#boardLink').click(function(){
      expect($('fieldset').size()).toEqual(3)   
    })
  })

});
