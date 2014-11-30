Pointer = new Mongo.Collection("Pointer")

Pointer.add = function(id) {
	Pointer.insert({
		_id: id,
		x: 100,
		y: 200 
	})
}

Pointer.returnx = function() {
	return _.first(Pointer.find().fetch()).x
}
Pointer.returny = function() {
	return _.first(Pointer.find().fetch()).y
}
Pointer.overElement = function(){
  // var x = Pointer.find().fetch()[0].x
  // var y = Pointer.find().fetch()[0].y
  return document.elementFromPoint(Pointer.find().fetch()[0].x-2, Pointer.find().fetch()[0].y)
}

