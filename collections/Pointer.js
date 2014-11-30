Pointer = new Mongo.Collection("Pointer")

Pointer.add = function(id) {
	Pointer.insert({
		_id: id,
		x: 100,
		y: 200,
    taps: 0,
    visible: "inline" 
	})
}

Pointer.returnx = function() {
	return _.first(Pointer.find().fetch()).x
}
Pointer.returny = function() {
	return _.first(Pointer.find().fetch()).y
}
Pointer.overElement = function(){
  return document.elementFromPoint(this.returnx-2, this.returny-2)
}

