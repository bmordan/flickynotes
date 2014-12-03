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
    Session.set('pointerState', undefined)
  })

  it('after 1 tap, pointer state should change to initialized', function(){
    pointerState(Session.get('pointerState'))    
    expect(Session.get('pointerState')).toEqual('initialized')
  })
  // it('starts capturing device data', function(){
  //   expect(Pointer.startMovementCapture).toHaveBeenCalled()
  // })

})