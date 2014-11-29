Postits = new Mongo.Collection("Postits");

Postits.add = function(content, zone_id){
	Postits.insert({
		content: content,
		zoneId: zone_id
	});
}