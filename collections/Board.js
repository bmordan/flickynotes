Boards = new Mongo.Collection("Boards");

Boards.add = function(title){
	Boards.insert({
		title: title,
    zones: [],
    zoneWidth: 0
	})
}
Boards.getDemo = function(){
  return Boards.find({title: "Demo"}).fetch()
}
Boards.addZone = function(id, newZoneTitle){
  var zonesArray = _getZonesArray(id)
  var newZone = Zones.add(newZoneTitle, zonesArray.length, id)
  zonesArray.push(newZone)
  var zoneWidth = _zoneWidth(zonesArray)
  Boards.update(id,{$set: {zones: zonesArray, zoneWidth: zoneWidth }})
}

function _zoneWidth(zonesArray){
  var windowWidth = 100-zonesArray.length
  return Math.floor(windowWidth / zonesArray.length)
}

function _getZonesArray(id){
  var board = _.first(Boards.find(id).fetch())
  return board.zones
}