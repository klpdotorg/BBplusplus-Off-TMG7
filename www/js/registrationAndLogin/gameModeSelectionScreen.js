Game.gameModeSelectionScreen=function(){

};

Game.gameModeSelectionScreen.prototype={
	
	init:function(lang)
	{		
		_this = this;
	},

	preload:function(game)
	{

	},

	create:function(game)
	{
		//AndroidFullScreen.setSystemUiVisibility(AndroidFullScreen.SYSTEM_UI_FLAG_LOW_PROFILE, null, null);
		//AndroidFullScreen.setSystemUiVisibility(AndroidFullScreen.SYSTEM_UI_FLAG_FULLSCREEN | AndroidFullScreen.SYSTEM_UI_FLAG_LOW_PROFILE, null, null);
		screen.orientation.lock('portrait');
		AndroidFullScreen.setSystemUiVisibility(AndroidFullScreen.SYSTEM_UI_FLAG_LOW_PROFILE, null, null);
		_this.game.scale.setGameSize(540, 960);
		_this.checkPermission();

	},

	startGame:function()
	{
		console.log("I am in gameModeSelectionScreen");
		_this.avatarName = ['Fish','ButterFly','Flower','Parrot','Sun','Tree'];
		_this.checkForLoginData();

		_this.userArray = [];
		
		
		//Fullscreen.on();
		var splash = _this.add.sprite(_this.world.centerX,_this.world.centerY,'registrationbg');
    	splash.scale.setTo(1);
    	splash.anchor.setTo(0.5);

    	

    	var titleBar = _this.add.graphics(0, 0);
    	titleBar.anchor.setTo(0.5);
    	titleBar.lineStyle(2, 0x000000, 0.8);
		titleBar.beginFill(0x4E342E, 1);
		titleBar.drawRect(0, 0, 540, 80);


		var titleTxt = _this.add.text(_this.world.centerX-140,45,"Building Blocks");
		titleTxt.x = Math.round(titleTxt.x);
		titleTxt.anchor.setTo(0.5);
		titleTxt.align = 'center';
		titleTxt.font = 'regfont4';
		titleTxt.fontSize = '22pt';
		titleTxt.fontWeight = 500;
		titleTxt.fill = '#FFFFFF';
		titleTxt.wordWrap = true;
		titleTxt.wordWrapWidth = 500;
		
		if(this.video==null)
						{	
							this.video = this.add.video('demo');
							
						}
						
				this.helpIcon = this.add.image(500,42,'helpIcon');
    	this.helpIcon.scale.setTo(1);
    	this.helpIcon.anchor.setTo(0.5);
		this.helpIcon.inputEnabled = true;
        		this.helpIcon.input.useHandCursor = true;
		this.helpIcon.events.onInputDown.add(function()
        		{
        			//this.clickSound = this.add.audio('ClickSound');
                	//this.clickSound.play();
        			//if(appConfig.cordova && !appConfig.browser)
        			//{
						screen.orientation.lock('landscape');
						AndroidFullScreen.setSystemUiVisibility(AndroidFullScreen.SYSTEM_UI_FLAG_FULLSCREEN, null, null);
						//AndroidFullScreen.setSystemUiVisibility(AndroidFullScreen.SYSTEM_UI_FLAG_FULLSCREEN | AndroidFullScreen.SYSTEM_UI_FLAG_LOW_PROFILE, null, null);

						
						_this.game.scale.setGameSize(960, 540);
						nativeApp.playHelp(_this,"appLoginScreen");
        			//}

        		},this);
	},

	checkPermission:function()
	{
		var permissions = cordova.plugins.permissions;
		permissions.checkPermission(permissions.READ_PHONE_STATE, function( status ){
		  if ( status.hasPermission ) {
		    console.log("Yes :D ");
		    _this.startGame();
		  }
		  else {
		    console.warn("No :( ");
		    permissions.requestPermission(permissions.READ_PHONE_STATE, function( status ){
			  if ( status.hasPermission ) {
			    console.log("Yes :D ");

			    _this.startGame();
			  }
			  else {
			    console.warn("No :( ");
			    _this.checkPermission();
			  }
			},function(error){
					console.log(error);
				});
		  }
		},function(error){
			console.log(error);
		});

		
	},

	loadEverything:function(game)
	{
		var selectPicTxt = game.add.text(game.world.centerX,150,"Sign in by Selecting \n your Avatar");
		//var selectPicTxt = game.add.bitmapText(200, 100, 'regFont',"Sign in by Selecting \n your Avatar",64);
		//alert(window.devicePixelRatio);

		selectPicTxt.x = Math.round(selectPicTxt.x);
		selectPicTxt.anchor.setTo(0.5);
		selectPicTxt.align = 'center';
		selectPicTxt.font = 'regfont3';

		/*if(window.devicePixelRatio >=2.5 && window.devicePixelRatio<3)
			selectPicTxt.fontSize = 31;
		else if(window.devicePixelRatio >=3 && window.devicePixelRatio<=3.5)
			selectPicTxt.fontSize = 36;
		else if(window.devicePixelRatio >=3 && window.devicePixelRatio<=4)
			selectPicTxt.fontSize = 36;
		else if(window.devicePixelRatio >=3 && window.devicePixelRatio<=4)
			selectPicTxt.fontSize = 36;*/

		selectPicTxt.fontSize = '26pt';

		selectPicTxt.fontWeight = 0;
		selectPicTxt.fill = '#494949';
		selectPicTxt.wordWrap = true;
		selectPicTxt.wordWrapWidth = 500;

		_this.pos = [[150,300],[390,300],[150,500],[390,500],[150,700],[390,700]];


		_this.fish = game.add.sprite(150,300,'fish');
    	_this.fish.scale.setTo(0.8);
    	_this.fish.anchor.setTo(0.5);


    	_this.butterfly = game.add.sprite(390,300,'butterfly');
    	_this.butterfly.scale.setTo(0.8);
    	_this.butterfly.anchor.setTo(0.5);

    	_this.flower = game.add.sprite(150,500,'flower');
    	_this.flower.scale.setTo(0.8);
    	_this.flower.anchor.setTo(0.5);

    	_this.parrot = game.add.sprite(390,500,'parrot');
    	_this.parrot.scale.setTo(0.8);
    	_this.parrot.anchor.setTo(0.5);

    	_this.sun = game.add.sprite(150,700,'sun');
    	_this.sun.scale.setTo(0.8);
    	_this.sun.anchor.setTo(0.5);

    	_this.tree = game.add.sprite(390,700,'tree');
    	_this.tree.scale.setTo(0.8);
    	_this.tree.anchor.setTo(0.5);
    	

    	_this.fish.visible = false;
    	_this.fish.inputEnabled = false;
    	_this.fish.events.onInputDown.add(function(){
    		for (var i = 0; i < _this.userArray.length; i++) {
    			if(_this.userArray[i].name.toLowerCase() == "fish")
    			{
    				FirebasePlugin.logEvent("Click_avatar", {Click_avatar_value: _this.userArray[i].name, item_id: ""});
    				_this.state.start('appLoginEditScreen',true,false,_this.userArray[i]);
    				return;
    			} 
    		}
    	},this);


    	_this.butterfly.visible = false;
    	_this.butterfly.inputEnabled = false;
    	_this.butterfly.events.onInputDown.add(function(){
    		for (var i = 0; i < _this.userArray.length; i++) {
    			if(_this.userArray[i].name.toLowerCase() == "butterfly")
    			{
    				FirebasePlugin.logEvent("Click_avatar", {Click_avatar_value: _this.userArray[i].name, item_id: ""});
    				
    				_this.state.start('appLoginEditScreen',true,false,_this.userArray[i]);
    				return;
    			} 
    		}
    	},this);

    	_this.flower.visible = false;
    	_this.flower.inputEnabled = false;
    	_this.flower.events.onInputDown.add(function(){
    		for (var i = 0; i < _this.userArray.length; i++) {
    			if(_this.userArray[i].name.toLowerCase() == "flower")
    			{
    				FirebasePlugin.logEvent("Click_avatar", {Click_avatar_value: _this.userArray[i].name, item_id: ""});
    				
    				_this.state.start('appLoginEditScreen',true,false,_this.userArray[i]);
    				return;
    			} 
    		}
    	},this);

    	_this.parrot.visible = false;
    	_this.parrot.inputEnabled = false;
    	_this.parrot.events.onInputDown.add(function(){
    		for (var i = 0; i < _this.userArray.length; i++) {
    			if(_this.userArray[i].name.toLowerCase() == "parrot")
    			{
    				FirebasePlugin.logEvent("Click_avatar", {Click_avatar_value: _this.userArray[i].name, item_id: ""});
    				
    				_this.state.start('appLoginEditScreen',true,false,_this.userArray[i]);
    				return;
    			} 
    		}
    	},this);

    	_this.sun.visible = false;
    	_this.sun.inputEnabled = false;
    	_this.sun.events.onInputDown.add(function(){
    		for (var i = 0; i < _this.userArray.length; i++) {
    			if(_this.userArray[i].name.toLowerCase() == "sun")
    			{
    				FirebasePlugin.logEvent("Click_avatar", {Click_avatar_value: _this.userArray[i].name, item_id: ""});
    				
    				_this.state.start('appLoginEditScreen',true,false,_this.userArray[i]);
    				return;
    			} 
    		}
    	},this);

    	_this.tree.visible = false;
    	_this.tree.inputEnabled = false;
    	_this.tree.events.onInputDown.add(function(){
    		for (var i = 0; i < _this.userArray.length; i++) {
    			if(_this.userArray[i].name.toLowerCase() == "tree")
    			{
    				FirebasePlugin.logEvent("Click_avatar", {Click_avatar_value: _this.userArray[i].name, item_id: ""});
    				
    				_this.state.start('appLoginEditScreen',true,false,_this.userArray[i]);
    				return;
    			} 
    		}
    	},this);
    	


    	/*var bmd = game.add.bitmapData(800,600);                
    	bmd.ctx.beginPath();        
    	bmd.ctx.lineWidth = "4";        
    	bmd.ctx.strokeStyle = '#000000';        
    	bmd.ctx.setLineDash([2,3]);        
    	bmd.ctx.moveTo(10, 10);        
    	bmd.ctx.lineTo(100 , 100);
    	ctx.moveTo(100, 10);
		ctx.quadraticCurveTo(230, 150, 250, 20);        
    	bmd.ctx.stroke();        
    	bmd.ctx.closePath();        
    	var sprite = game.add.sprite(200, 400, bmd);*/

    	var orline1=game.add.graphics(0,0);
		  //var graphics=game.add.graphics(line.start.x,line.start.y);//if you have a static line
		  orline1.lineStyle(2.5, 0x000000, 1);
		  orline1.moveTo(70,820);//moving position of graphic if you draw mulitple lines
		  orline1.lineTo(240,820);
		  orline1.endFill();

    	var orTxt = game.add.text(game.world.centerX,820,"or");
		orTxt.anchor.setTo(0.5);
		orTxt.align = 'center';
		orTxt.font = 'regfont3';
		orTxt.fontSize = '24pt';
		orTxt.fontWeight = 'normal';
		orTxt.fill = '#494949';
		orTxt.wordWrap = true;
		orTxt.wordWrapWidth = 500;

		var orline2=game.add.graphics(0,0);
		  //var graphics=game.add.graphics(line.start.x,line.start.y);//if you have a static line
		  orline2.lineStyle(2.5, 0x000000, 1);
		  orline2.moveTo(300,820);//moving position of graphic if you draw mulitple lines
		  orline2.lineTo(470,820);
		  orline2.endFill();

		_this.regandstsrtBtn = _this.add.sprite(game.world.centerX,880,'regandstsrtBtn');
    	_this.regandstsrtBtn.scale.setTo(0.9,1);
    	_this.regandstsrtBtn.anchor.setTo(0.5);

    	_this.regandstsrtBtnTxt = _this.add.text(game.world.centerX,882,"REGISTER");
    	_this.regandstsrtBtnTxt.x = Math.round(_this.regandstsrtBtnTxt.x);
		_this.regandstsrtBtnTxt.anchor.setTo(0.5);
		_this.regandstsrtBtnTxt.align = 'center';
		_this.regandstsrtBtnTxt.font = 'regfont1';
		_this.regandstsrtBtnTxt.letterSpacing = 15;
		_this.regandstsrtBtnTxt.fontSize = '16pt';
		_this.regandstsrtBtnTxt.fontWeight = 500;
		_this.regandstsrtBtnTxt.fill = '#FFFFFF';
		_this.regandstsrtBtnTxt.wordWrap = true;
		_this.regandstsrtBtnTxt.wordWrapWidth = 500;
		
		
	},

	checkForLoginData:function()
	{
		bbreglogin.bbdbhandler.executeSql('select * from user', [], this.localdatasuccess, this.localdatafailed);
	},

	localdatasuccess:function(result)
	{
		SpinnerDialog.hide();
		if(result.rows.length>0)
		{
			_this.loadEverything(_this);
			for (var i = 0; i < result.rows.length; i++) 
			{
				console.log(result.rows.item(i));
            	_this.userArray.push(result.rows.item(i));      	

            	_this[""+result.rows.item(i).name.toLowerCase()].visible = true;   
            	_this[""+result.rows.item(i).name.toLowerCase()].inputEnabled = true; 
            	_this[""+result.rows.item(i).name.toLowerCase()].x = _this.pos[i][0]; 
            	_this[""+result.rows.item(i).name.toLowerCase()].y = _this.pos[i][1]; 


        	}
        	if(_this.userArray.length<6)
			{
				_this.regandstsrtBtn.inputEnabled = true;
				_this.regandstsrtBtn.events.onInputDown.add(function(){
					FirebasePlugin.logEvent("Button_click_register", {Button_click: "", item_id: ""});
    				
					_this.state.start('registrationLangSelectionScreen',true,false,_this.userArray);
				},_this);
			}
			else
			{
				_this.regandstsrtBtn.frame = 1;
			}
        	
		}
		else
		{
			//window.plugins.toast.show("Building Blocks is loading \n please wait", 2000, "center");
			SpinnerDialog.show(null, "Building Blocks is loading..", true);
			_this.checkOnlineForData();
		}
		
	},

	localdatasuccess2:function(result)
	{
		SpinnerDialog.hide();
		if(result.rows.length>0)
		{
			_this.loadEverything(_this);
			for (var i = 0; i < result.rows.length; i++) 
			{
            	console.log(result.rows.item(i));
            	_this.userArray.push(result.rows.item(i));      	

            	_this[""+result.rows.item(i).name.toLowerCase()].visible = true;   
            	_this[""+result.rows.item(i).name.toLowerCase()].inputEnabled = true;
            	_this[""+result.rows.item(i).name.toLowerCase()].x = _this.pos[i][0]; 
            	_this[""+result.rows.item(i).name.toLowerCase()].y = _this.pos[i][1];   

        	}
        	if(_this.userArray.length<6)
			{
				_this.regandstsrtBtn.inputEnabled = true;
				_this.regandstsrtBtn.events.onInputDown.add(function(){
					_this.state.start('registrationLangSelectionScreen',true,false,_this.userArray);
				},_this);
			}
			else
			{
				_this.regandstsrtBtn.frame = 1;
			}
        	
		}
		else
		{
			_this.state.start('registrationLangSelectionScreen',true,false);
		}
		
	},


	localdatafailed:function(error)
	{
		window.plugins.toast.show("something went wrong Try Again", 3000, "bottom");
	},

	checkOnlineForData:function()
	{
		console.log(device.serial+"_"+device.uuid);
		var jsondata = {name:_this.avatarName[0],deviceid:device.serial+"_"+device.uuid};
		console.log(jsondata);
		//var jsondata = {name:this.avatarName[0],deviceid:1234};

		if(navigator.connection.type!="none" && navigator.connection.type!="unknown" && navigator.connection.type!=null && navigator.connection.type!="undefined")
		{
				var apiurl = "https://abbmath.klp.org.in/abbppchmprm/login";    
				//var apiurl = "https://10.0.2.2/abbchmprm/login";    		        
		        $.ajax({
		            url: apiurl,
		            type: "POST",
		            dataType: "json",
		            //async:false, // set to false to perform a synchronous request
		            data: JSON.stringify(jsondata),
		            contentType: 'application/json; charset=UTF-8',
		            accepts: 'application/json',
		            success: function (jsonresp) {
		            	console.log(jsonresp);
		            	if(jsonresp.status == "success")
		            	{
		            		window.plugins.toast.show(jsonresp.status, 3000, "bottom");	
		            	    _this.checkOnlineForData2(jsonresp.description);
		            	       		
		            	}
		            	else
		            	{
		            		//window.plugins.toast.show(jsonresp.status+"\n"+jsonresp.description, 3000, "bottom");
		            		_this.avatarName.shift();
		            	     if(_this.avatarName.length>0)
		            	     	  _this.checkOnlineForData();
		            	     else{
		            	     	console.log("finish");
		            	     	bbreglogin.bbdbhandler.executeSql('select * from user', [], _this.localdatasuccess2, _this.localdatafailed);
		            	     }
		            	}
		                 
		            },
		            error: function (error) {
						console.log(error);
		            	window.plugins.toast.show(error, 1000, "bottom");		            	
		             }
		            
		        });
		    }
		    else
		    {
		    	window.plugins.toast.show("please check your internet connection and try again", 3000, "bottom");
		    	document.addEventListener("online", _this.checkNetwork, false);
		    }
	},

	checkNetwork:function()
	{
		document.removeEventListener("online", _this.checkNetwork, false);
		_this.checkOnlineForData();
	},

	checkOnlineForData2:function(acc_token)
	{
		var jsondata = {name:_this.avatarName[0],deviceid:device.serial+"_"+device.uuid};
		//var jsondata = {name:this.avatarName[0],deviceid:123456};

		if(navigator.connection.type!="none" && navigator.connection.type!="unknown" && navigator.connection.type!=null && navigator.connection.type!="undefined")
		{
				var apiurl = "https://abbmath.klp.org.in/abbppchmprm/getchild";  
				//var apiurl = "https://10.0.2.2/abbchmprm/getchild";       		        
		        $.ajax({
		            url: apiurl,
		            type: "POST",
		            dataType: "json",
		            // async:false, // set to false to perform a synchronous request
		            data: JSON.stringify(jsondata),
		            contentType: 'application/json; charset=UTF-8',
		            accepts: 'application/json',
		            success: function (jsonresp) {
		            	console.log(jsonresp);
		            	if(jsonresp.status == "success")
		            	{
		            		window.plugins.toast.show(jsonresp.status, 3000, "bottom");	

		            		bbreglogin.bbdbhandler.executeSql("insert into user(uid, name, language, deviceId) values (?,?,?,?)", [acc_token,jsonresp.name,jsonresp.language,jsonresp.deviceid], null, null);

		            	     _this.avatarName.shift();
		            	     if(_this.avatarName.length>0)
		            	     	  _this.checkOnlineForData();
		            	     else{
		            	     	console.log("finish");
		            	     	bbreglogin.bbdbhandler.executeSql('select * from user', [], _this.localdatasuccess, _this.localdatafailed);
		            	     }
		            	     	    		
		            	}
		            	else
		            	{
		            		window.plugins.toast.show(jsonresp.status+"\n"+jsonresp.description, 3000, "bottom");
		            		_this.avatarName.shift();
		            	     if(_this.avatarName.length>0)
		            	     	  _this.checkOnlineForData();
		            	     else{
		            	     	console.log("finish");
		            	     	bbreglogin.bbdbhandler.executeSql('select * from user', [], _this.localdatasuccess, _this.localdatafailed);
		            	     }
		            	}
		                 
		            },
		            error: function (error) {
						console.log(error);
		            	window.plugins.toast.show(error, 3000, "bottom");
		            	
		             }
		            
		        });
		    }
		    else
		    {
		    	window.plugins.toast.show("please check your internet connection and try again", 3000, "bottom");
		    }
	},
};