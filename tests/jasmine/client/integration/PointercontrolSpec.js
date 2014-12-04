describe('The Pointer Control', function(){
  
  beforeEach(function(done){
    Router.go('/phone')
    Tracker.afterFlush(done)
  })

  beforeEach(waitForRouter)

  it('has a button to tap', function(){
    expect($('kbd').size()).toEqual(1)
  })

  it('records your pointer state in the session', function(){
    expect(Session.get('pointerState')).toEqual(undefined)
  })

})