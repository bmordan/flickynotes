describe("Postits", function() {
  var ;

  beforeEach(function() {
    player = new Player();
    song = new Song();
  });

  it("should be able to play a Song", function() {


    expect(player).toBePlaying(song);
  });


});
