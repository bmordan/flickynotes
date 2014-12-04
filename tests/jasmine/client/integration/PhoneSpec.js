describe('the phone page', function() {
  
  beforeEach(function(done){
    Router.go('/phone')
    Tracker.afterFlush(done)
  }) 

  beforeEach(waitForRouter)

  xit ('should contain a form', function(){
    expect($('form').size()).toEqual(1);
  });

  it('should have a textarea', function(){
    expect($('textarea').size()).toEqual(1);
  });

  it('should have a column selector', function(){
    expect($('.carousel').size()).toEqual(1);
  });

  xit('In order to render the phone template we need the board id', function(){
    expect($('.h2').html()).toEqual('Todo');
  });

});
