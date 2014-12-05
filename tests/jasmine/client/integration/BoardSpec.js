describe('the board page', function() {
	
  beforeEach(function(done){
    Router.go('/board')
    Tracker.afterFlush(done)
  }) 

  beforeEach(waitForRouter)

	it('should have the Flicky Notes logo', function(){
    expect($('img').attr('src')).toEqual("flickynotes_logo.png")
  });

  xit('should have three columns', function(){
    expect($('fieldset').size()).toEqual(3)
  });

  it('should set the board window width', function(){
    var boardArr = Boards.find().fetch()
    var boardObject = _.last(boardArr)
    expect(boardObject.windowWidth).toEqual($(window).width())
  });

  it('should set the board window height', function(){
    var boardArr = Boards.find().fetch()
    var boardObject = _.last(boardArr)
    expect(boardObject.windowHeight).toEqual($(window).height())
  });



});
