

Template.document_ready.rendered = function(){
    

    $('.carousel').carousel({
      interval: false
    })
    $('.carousel').carousel('pause')

    var car = document.getElementById('carousel-example-generic');
    var hammerswipe = new Hammer(car); 
    hammerswipe.get('swipe').set({direction: Hammer.DIRECTION_ALL})

    hammerswipe.on('swipeleft', function(){
        $('.carousel').carousel('next'); 
    });

    hammerswipe.on('swiperight', function(){
        $('.carousel').carousel('prev'); 
    });
}

Template.zones.helpers({
    zonesCollection: function(){
        board = _.first(Boards.getDemo());
        arrZones = Zones.allZonesOfABoard(board._id);
        _.each(arrZones, function(item){
            console.log(item._id._str);
            if(item.order === 0){
                 Zones.update(item._id, {$set: {selected: "active"}});
            }
        });
        arrZones = Zones.allZonesOfABoard(board._id);
        _.sortBy(arrZones, 'order');
        console.log(_.sortBy(arrZones, 'order'));
        return _.sortBy(arrZones, 'order');
    }
});