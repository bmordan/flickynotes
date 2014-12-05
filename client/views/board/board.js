Template.boardZones.helpers({
  zones: function(){
    return this.zones
  },
  zoneHeight: function(){
    return $(window).height()-75
  },
<<<<<<< HEAD
  zoneWidth: function(){
    var board = _.first(Boards.find().fetch())
    return board.zoneWidth-1
=======
  zoneWidth: function(parentContext){
    return parentContext.board.zoneWidth;
>>>>>>> 58a51d0e37aa6b86edc7d150a9620231ca373106
  },
  rotate: function(){
    return Math.floor((Math.random()*10)+1) - 5
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

    $('#'+element).css('opacity', '0.6')
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
      $('#'+element).css('opacity', '1')
    }

    element = undefined
  })
}

Template.clearButton.events = {
  "click": function(){
    Meteor.call("removePostits");
  }
}