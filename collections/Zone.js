Zone = new Mongo.Collection("zones");

Zone.add = function(name, order, boardId){
	Zone.insert({
		name: name,
		order: order, 
		boardId: boardId
	});
}