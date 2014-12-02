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