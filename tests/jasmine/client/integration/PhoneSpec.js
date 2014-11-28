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

  it('should have a textarea', function(){
    expect($('textarea').size()).toEqual(1);
  });

  it('should have a column selector', function(){
    expect($('.carousel').size()).toEqual(1);
  });

  it('In order to render the phone template we need the board id', function(){
    expect($('h2').html()).toEqual('To do');
  });

});
