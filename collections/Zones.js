Zones = new Mongo.Collection("Zones");

Zones.add = function(name, order, boardId){

	var id = new Mongo.ObjectID()

  Zones.insert({
    _id: id,
		name: name,
		order: order, 
		boardId: boardId,
		selected:""
	})
  
  return id;
}

Zones.allZonesOfABoard = function(boardId){
	return Zones.find({boardId: boardId}).fetch();
};