var meteorUrl = 'http://localhost:3000/';

// Start your testing
casper.start(meteorUrl, function() {

this.test.assertEquals(true, true)

casper.then(function() {
        // do something else
    });

});

// don't forget to run your tests
casper.run();