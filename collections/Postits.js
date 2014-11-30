Postits = new Mongo.Collection("Postits");

Postits.add = function(content, zone_id){

	Postits.insert({
		content: content,
		zoneId: new Mongo.ObjectID(zone_id)
	});
}

Postits.getByZone = function(zoneId){
	return Postits.find({zoneId: zoneId}).fetch();
}
