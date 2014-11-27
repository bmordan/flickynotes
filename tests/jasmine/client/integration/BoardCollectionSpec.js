describe ('Boards', function(){

	it("should have a title", function(){
		Boards.add("Demo");
		boards = Boards.find({}).fetch();
		board = _.last(boards);
		expect(board.title).toEqual("Demo")
	});

  it("should have at least one zone", function(){
    Boards.add("one zone")
    query = Boards.find({title: "one zone"}).fetch()
    oneZone = _.last(query)
    expect(oneZone.zones.length).toEqual(0)
  })

  it("you can add a zone to the board", function(){
    Boards.add("zone test")
    board = _.last(Boards.find({title: "zone test"}).fetch())
    Boards.addZone(board._id,"new Zone")
    expect(board.zones.length).toEqual(1)
  })

})