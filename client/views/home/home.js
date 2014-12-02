Template.scrollDown.rendered = function(){
  var el = this.find('nav')
  Hammer(el).on('tap', function(e){
    $('#landingZone').slideUp(1000)
  })
}

Template.scrollUp.rendered = function(){
  var el = this.find('nav')
  Hammer(el).on('tap', function(e){
    $('#landingZone').slideDown(500,'swing',function(){
      window.scrollTo(0,0)
    })
  })
}

Template.getstarted.helpers({
  smartLink: function(){
    var screenWidth = $(window).width()
    if(screenWidth > 384){
      return "/board"
    }else{
      return "/phone"
    }
  }
})

Template.home.helpers({
  height: function(){
    return $(window).height()
  } 
})