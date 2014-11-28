describe('the phone page', function() {
  
  beforeEach(function(done){
    Router.go('/phone')
    Tracker.afterFlush(done)
  }) 

  beforeEach(waitForRouter)

  it ("should have 'Flicky Notes' in the header", function(){
    expect($('h1').html()).toEqual('Flicky Notes');
  });

  it ('should contain a form', function(){
    expect($('form').size()).toEqual(1);
  });

});
