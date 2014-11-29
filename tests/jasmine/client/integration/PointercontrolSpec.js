describe('The Pointer Control', function(){
  
  beforeEach(function(done){
    Router.go('/phone')
    Tracker.afterFlush(done)
  })

  beforeEach(waitForRouter)

  it('has a button to tap', function(){
    expect($('kbd').size()).toEqual(1)
  })

  it('records your taps in the session', function(){
    expect(Session.get('taps')).toEqual(0)
  })

})

describe('The Pointer Control', function(){
  
  beforeEach(function(done){
    Router.go('/phone')
    Tracker.afterFlush(done)
  })

  beforeEach(waitForRouter)

  // beforeEach(function(){
  //   spyOn(Pointer, 'startMovementCapture')
  // })

  beforeEach(function(){
    Session.set('taps', 1)
  })

  it('after 1 tap', function(){
    expect(Session.get('taps')).toEqual(1)
  })

  // it('starts capturing device data', function(){
  //   expect(Pointer.startMovementCapture).toHaveBeenCalled()
  // })

})