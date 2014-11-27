describe('the landing page', function() {
  
  beforeEach(waitForRouter)

  it('should have link to the board route', function(){
    expect($('#boardLink').html()).toEqual('Board') 
  })

  it('should have a link to the phone route', function(){
    expect($('#phoneLink').html()).toEqual('Phone')
  })  


});
