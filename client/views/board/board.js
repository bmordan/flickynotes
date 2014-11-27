BoardView = function(){
  this.zones = []
}
BoardView.prototype.getDemo = function() {
  return this.find({name: "Demo"})
}