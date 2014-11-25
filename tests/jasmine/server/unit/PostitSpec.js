"use strict";

describe("post it model", function () {

  var Postit;

  beforeEach(function(){
    Postit = new Mongo.Collection('postits')
  })

  it("should add a post it", function (){
    Postit.add("test")
    expect(Postit.find({})).toContain("test")
  })

})
