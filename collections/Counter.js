// counterTaps = {
//   counter: 0,
//   dep: new Deps.Dependency(),
//   get: function(){
//     this.dep.depend();
//     return this.counter
//   },
//   set:function(newValue){
//    if(newValue === 1){
//       this.counter += newValue;
//     }
//      else{
//       this.counter = newValue;
//     }
//     this.dep.changed();
//     return this.counter; 
//   }
// }

pointerStream = new Meteor.Stream('pointer');