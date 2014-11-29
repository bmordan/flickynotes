Postits = new Mongo.Collection("Postits");

Postits.add = function(content, zoneId){
	Postits.insert({
		content: content,
		zoneId: zoneId
	});
}
Postits.forZone = function(zoneId){
  return Postits.find({},{zoneId: zondId}).fetch()
}