describe('phone view', function() {

	beforeEach(waitForRouter, function(){
		window.location='/phone'
	});
	beforeEach(function(){
		waitForRouter();
	})

	it('has a route', function(){
		if(location.pathname !=='/phone'){
			window.location='/phone'
		}
		expect($('h1').html()).toEqual('Phone')
	});

});