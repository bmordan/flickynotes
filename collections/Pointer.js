Pointer = new Mongo.Collection("Pointer")

pointerStream = new Meteor.Stream('pointer')

Pointer.add = function(id) {
	Pointer.insert({
		_id: id,
		x: 100,
		y: 200,
    taps: 1,
    visible: "inline",
    element: null
	})
}
Pointer.returnId = function(){
  return _.first(Pointer.find().fetch())._id
}
Pointer.returnx = function() {
	return _.first(Pointer.find().fetch()).x
}
Pointer.returny = function() {
	return _.first(Pointer.find().fetch()).y
}
Pointer.returnTaps = function(){
  return _.first(Pointer.find().fetch()).taps
}
Pointer.returnDisplay = function(){
  return _.first(Pointer.find().fetch()).visible
}
Pointer.returnElement = function(){
  return _.first(Pointer.find().fetch()).element
}
Pointer.overElement = function(){
  return document.elementFromPoint(this.returnx-2, this.returny-2)
}
Pointer.incrementTap = function(id){
  var taps = (Pointer.find({},{_id: id}).fetch()[0].taps)+=1
  if(taps > 2)
    taps = 0
  Pointer.update(id, {$set: {taps: taps}})
  return taps
}

