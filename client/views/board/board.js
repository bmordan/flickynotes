Template.boardZones.helpers({
  zones: function(){
    // var zones = []
    // if(this !== undefined){
    //   _.each(this.zones, function(zoneId){
    //     var zone = _.first(Zones.find(zoneId).fetch())
    //     var PostitsForZone = Postits.getByZone(zoneId);
    //     zonePostits = new Object({zone: zone, postits: PostitsForZone});
    //     zones.push(zonePostits);
    //   })
    // }
    return this.zones
  },
  zoneHeight: function(){
    return $(window).height()-75
  },
  zoneWidth: function(){
    var board = _.first(Boards.find().fetch())
    return board.zoneWidth
  },
  rotate: function(){
    var deg = Math.floor((Math.random()*10)+1) - 5
    return deg
  }
})

Template.pointerElement.helpers({
  pointerRender: function(){
    return Session.get('pointer')
  }
})

Template.board.rendered = function(){
  var element;
  var boardId = Boards.find().fetch()[0]._id
  var windowWidth = $(window).width()
  var windowHeight = $(window).height()
  Boards.update(boardId,{$set:{windowWidth: windowWidth, windowHeight: windowHeight}})

  $('nav#pointer').hide()

  pointerStream.on('createPointer', function(pointer){
    $(pointer.element).show()
    Session.set('pointer', pointer)
  })

  pointerStream.on('movePostit', function(pointer){
    
    $(pointer.element).hide()
    
    if(element === undefined){
      var DOMelement = document.elementFromPoint(pointer.x-5,pointer.y-5)
      if($(DOMelement).prop('tagName') !== "LI"){
        pointerStream.emit('resetPointer', pointer)
        return
      }else{
        element = DOMelement.id
      }
    }

    $('#'+element).css('box-shadow','-43px 44px 5px 0px rgba(144,144,144,0.8)')
    $('#'+element).css('position','absolute')
    $('#'+element).css('left',pointer.x+'px')
    $('#'+element).css('top',pointer.y+'px')

    Session.set('pointer', pointer)
  });

  pointerStream.on('resetPostit', function(pointer){
    var zoneId = document.elementFromPoint(pointer.x-5,pointer.y-5)
    try{
      var zoneInsertId = new Mongo.ObjectID(zoneId.id.toString())
      Postits.update(element,{$set:{zoneId: zoneInsertId}})
    }catch(err){
      $('#'+element).css('position','static')
      $('#'+element).css('box-shadow','0px 0px 0px 0px rgba(144,144,144)')
    }

    element = undefined
  })
}

Template.clearButton.events = {
  "click": function(){
    Meteor.call("removePostits");
  }
}