Postits = new Mongo.Collection("postits");

Postits.add = function(content, zone_id){
	Postits.insert({
		content: content,
		zone: zone_id
	});
}