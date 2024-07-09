
var parser ={

	printkeys: function() {
		var urlArray = [];
		
		//var testUrl = new URL("file:///android_asset/www/index.html#uid=5b50255d281f2?language=Kannada?grade=1?url=./?avatarName=Tree?deviceId=db98cc6d_a60627c5be3e057e?userProgress=false");
		//var urlkeys = testUrl.hash.split('#')[1];
		
		var urlkeys = window.location.hash.split('#')[1];
		//console.log(urlkeys);
		
		urlkeys.match(/[#=][^#=?&]*/g).map(function(m) {
			//console.log( m.substr(1));
			urlArray.push(m.substr(1));
		});
		
		return urlArray;
	}
}

//parser.printkeys();

