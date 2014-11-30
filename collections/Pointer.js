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
  var x = this.returnx-2
  var y = this.returny-2
  return document.elementFromPoint(x, y)
}

