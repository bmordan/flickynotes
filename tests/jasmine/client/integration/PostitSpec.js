
describe('Postit', function(){

	it('example test', function(){
		expect($('body h1').html()).toEqual('Hello World');
	});
});


describe('Postit',function() {

	beforeEach(function(){
		Postits.add("test content", "1");
		arr = Postits.find({}).fetch();
		hash = arr[arr.length -1];		
	});

	it('should have content', function() {
		expect(hash.content).toContain("test content");
	});

	it("should have a zone", function(){
		expect(hash.zone).toContain("1")
	});

});