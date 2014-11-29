Pointer = new Mongo.Collection("Pointer")

Pointer.add = function(id) {
	Pointer.insert({
		_id: id,
		x: 10,
		y: 20 
	})
}

Pointer.returnx = function() {
	return _.first(Pointer.find().fetch()).x
}
Pointer.returny = function() {
	return _.first(Pointer.find().fetch()).y
}