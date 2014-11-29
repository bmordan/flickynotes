

Template.document_ready.rendered = function(){
    

    $('.carousel').carousel({
      interval: false
    })
    $('.carousel').carousel('pause')

    var textPostit = document.getElementById('submit-postit');
    var hammerPostit = new Hammer(textPostit);
    hammerPostit.get('swipe').set({direction: Hammer.DIRECTION_ALL});

    hammerPostit.on("swipeup", function(event) {
      var text = $('#text-postit');
      if(text.val()){
          var zoneId = $('.item.active h2').data();
          Postits.add(text.val(), zoneId);
          text.val("");
      }
      else {
        alert("You need to insert a text to post to the board");
      }
    });

    var carouselSwipe = document.getElementById('carousel-example-generic');
    var hammerSwipe = new Hammer(carouselSwipe); 
    hammerSwipe.get('swipe').set({direction: Hammer.DIRECTION_ALL})

    hammerSwipe.on('swipeleft', function(){
        $('.carousel').carousel('next'); 
    });

    hammerSwipe.on('swiperight', function(){
        $('.carousel').carousel('prev'); 
    });

}

Template.zones.helpers({
    zonesCollection: function(){
        board = _.first(Boards.getDemo());
        arrZones = Zones.allZonesOfABoard(board._id);
        _.each(arrZones, function(item){
            if(item.order === 0){
                 Zones.update(item._id, {$set: {selected: "active"}});
            }
        });
        arrZones = Zones.allZonesOfABoard(board._id);
        _.sortBy(arrZones, 'order');
        return _.sortBy(arrZones, 'order');
    }
});

Template.indicators.helpers({
    zonesCollection: function(){
        board = _.first(Boards.getDemo());
        arrZones = Zones.allZonesOfABoard(board._id);
        _.each(arrZones, function(item){
            if(item.order === 0){
                 Zones.update(item._id, {$set: {selected: "active"}});
            }
        });
        arrZones = Zones.allZonesOfABoard(board._id);
        _.sortBy(arrZones, 'order');
        return _.sortBy(arrZones, 'order');
    }
});
