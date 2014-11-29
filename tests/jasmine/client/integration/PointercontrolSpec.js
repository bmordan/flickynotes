describe('The Pointer Control', function(){
  
  beforeEach(function(done){
    Router.go('/phone')
    Tracker.afterFlush(done)
  })

  beforeEach(waitForRouter)

  it('has a button to press', function(){
    expect($('kbd').size()).toEqual(1)
  })

})