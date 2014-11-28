Pointer = new Mongo.Collection("Pointer")

Pointer.add = function(id) {
	Pointer.insert({
		_id: id,
	})
}