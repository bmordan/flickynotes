Boards = new Mongo.Collection("boards");

Boards.add = function(name){
	Boards.insert({
		name: name
	});
};