Game.grade6Geometry=function(game){
	
};

Game.grade6Geometry.prototype={

	init:function()
	{
		_this = this;
		//console.log("sync telemetry"+navigator.connection.type);
		if(navigator.connection.type!="none" && navigator.connection.type!="unknown" && navigator.connection.type!=null && navigator.connection.type!="undefined")
		{
			console.log("sync telemetry"+navigator.connection.type);
			//absdsjsapi.syncTelemetryData();
		}
 
		document.addEventListener("online", _this.syncTelFunc, false);

		// //Variables used for user progress
		// _this.userHasPlayed = userHasPlayed;
		// _this.timeInMinutes = timeInMinutes;
		// _this.timeInSeconds = timeInSeconds;
		// _this.score = score;
		// _this.game_id = game_id;
		// _this.gradeTopics = gradeTopics;
		// _this.grade = grade;
		// _this.microConcepts = microConcepts;

		// console.log("inside geometry menu",_this.userHasPlayed,_this.timeInMinutes,_this.timeInSeconds,_this.game_id,_this.score);

		// if(_this.userHasPlayed !=0 && _this.timeInMinutes != undefined && _this.timeInSeconds != undefined && _this.game_id != undefined && _this.score != 0 && _this.gradeTopics != undefined && _this.grade != undefined && _this.microConcepts != undefined)
		// {
		// 	var objData = {
		// 		game_id:_this.game_id,
		// 	}
		// 	BBplusplusdbDetails.bbplusplusdbhandler.executeSql('SELECT totalLearingTimeinHrs AS Hrs, totalLearingTimeinMins As Mins, totalLearingTimeinSecs As Secs FROM UserProgress WHERE gameId ="'+objData.game_id+'"', [], this.localdatasuccess, this.localdatafailed);
		// }
	},
			
	syncTelFunc:function()
	{
		if(navigator.connection.type!="none" && navigator.connection.type!="unknown" && navigator.connection.type!=null && navigator.connection.type!="undefined")
		{
			console.log("sync telemetry"+navigator.connection.type);
			//absdsjsapi.syncTelemetryData();
		}
	},
	
	create:function(game){

		nativeApp.screenViewStringPass("Practice_activity_list","grade6Geometry");
		
		_this = this;

		this.game.input.enabled = false;

		grade6NumberSystemsSelected = false;
		grade6AlgebraSelected = false;
		grade6RatioandProportionSelected = false;
		grade6GeometrySelected  = false;
		grade6DecimalsSelected  = false;

		_this.tween = null;
		_this.tap = false;
		//adding bg, title to the scene.
		_this.background = _this.add.tileSprite(0,0,_this.world.width,_this.world.height, 'gameselectBg');
		
		_this.gradeBackBtn = _this.add.sprite(-5,3,'gradeSceneBackBtn');
		_this.gradeBackBtn.inputEnabled = true;
		_this.gradeBackBtn.input.useHandCursor = true;
		_this.gradeBackBtn.input.priorityID = 1;
		_this.gradeBackBtn.events.onInputDown.add(function(target){
			target.events.onInputDown.removeAll();
			//_this.cache.destroy();
			_this.clickSound = _this.add.audio('ClickSound');
            _this.clickSound.play();
			grade6NumberSystemsSelected = false;
			_this.state.start('selectgrade6MicroConceptScreen',true,false);
		},_this);


		this.gameModeShareBtn = game.add.image(920,18,'shareIcon');
		this.gameModeShareBtn.anchor.setTo(0.5);
		this.gameModeShareBtn.scale.setTo(0.75);
		this.gameModeShareBtn.inputEnabled = true;
		this.gameModeShareBtn.input.useHandCursor = true;
		this.gameModeShareBtn.input.priorityID = 1;
		this.gameModeShareBtn.events.onInputDown.add(function()
		{
			this.clickSound = this.add.audio('ClickSound');
			this.clickSound.play();
			nativeApp.ShareApp();
		},this);
		
		
		_this.grade6ShapesGroup = _this.add.group();
		_this.grade6MensurationGroup = _this.add.group();
	
		_this.addgrade6ShapesTopic();
		_this.addgrade6MensurationTopic();

		_this.grade6ShapesGroup.x = 0;
		_this.grade6ShapesGroup.y = 0;
		
		_this.grade6MensurationGroup.x = 0;
		_this.grade6MensurationGroup.y = 500;

		_this.graphicsBg = _this.add.graphics(0, 0);
		_this.graphicsBg.lineStyle(0, 0xFFFFFF, 0.8);
		_this.graphicsBg.beginFill(0x139487, 0);
		_this.graphicsBg.drawRect(0,0,960,4000);
		_this.graphicsBg.boundsPadding = 0;
		
		_this.mask = _this.add.graphics();
        _this.mask.position.x = 0;   
        _this.mask.position.y = 35;   
        _this.mask.beginFill(0, 1);   
        _this.mask.moveTo(0, 0);   
        _this.mask.lineTo(960, 0);   
        _this.mask.lineTo(960, 505);   
        _this.mask.lineTo(0, 505);   
        _this.mask.lineTo(0, 0);   
        _this.mask.endFill();   
        _this.graphicsBg.mask = _this.mask;
		
	
		_this.graphicsBg.addChild(_this.grade6ShapesGroup);
		_this.graphicsBg.addChild(_this.grade6MensurationGroup);
		
		
		_this.swipeUpFlag = true;
		_this.swipeDownFlag = false;
		_this.page = document.getElementById("body"); 
		_this.mc = new Hammer(_this.page);
			_this.mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL , enable:false });

			_this.mc.on("swipeleft", function () { 
				//console.log('swipeleft');
			}); 
          
           _this.mc.on("swiperight", function () { 
				//console.log('swiperight');
			});
			
			_this.mc.on("swipeup", function (v) { 
				//console.log(v);
				
				
			//	if(swipeUpFlag)
			//	{
					//game.input.enabled = false;

					_this.tween = game.add.tween(_this.graphicsBg);
					_this.tween.to({ y: _this.graphicsBg.y-(v.distance*(v.overallVelocity*2/-1))}, 0, 'Linear', true, 0);
					_this.tween.onComplete.add(function(){
					//	swipeDownFlag = true;
						_this.tween = null;
						if(_this.graphicsBg.y<=-1570)
						{
							//swipeUpFlag = false;
							_this.graphicsBg.y = -1570;
						}
						
						//game.input.enabled = true;
					}, _this);
					_this.tween.onUpdateCallback(function(){
						_this.tap = false;
						if(_this.graphicsBg.y<=-1570)
						{
							//swipeUpFlag = false;
							_this.graphicsBg.y = -1570;
							_this.tween.stop();
							//_this.tween = null;
							//game.input.enabled = true;
						}
					},_this);
					
			//	}
			}); 
			
			_this.mc.on("swipedown", function (v) { 
				
			//	if(swipeDownFlag)
			//	{
					//game.input.enabled = false;
					_this.tween = game.add.tween(_this.graphicsBg);
					_this.tween.to({ y: _this.graphicsBg.y+(v.distance*(v.overallVelocity*2)) }, 0, 'Linear', true, 0);
					_this.tween.onComplete.add(function(){
					//	swipeUpFlag = true;
						_this.tween = null;
						if(_this.graphicsBg.y>=0)
						{
						//	swipeDownFlag = false;
							_this.graphicsBg.y = 0;
						}
						//game.input.enabled = true;
					}, _this);
					
					_this.tween.onUpdateCallback(function(){
						tap = false;
						if(_this.graphicsBg.y>=0)
						{
							//swipeUpFlag = false;
							_this.graphicsBg.y = 0;
							_this.tween.stop();
							//_this.tween = null;
							//game.input.enabled = true;
						}
					},_this);
			//	}
			});

			_this.input.onDown.add(function(){
				if(_this.tween)
				{
					if(_this.tween.isRunning)
					{
						_this.tween.stop();
						//_this.tween = null;
					}
				}

				_this.graphicsBg.inputEnabled = true;
				_this.graphicsBg.input.enableDrag();
				_this.graphicsBg.input.allowHorizontalDrag = false;

				_this.graphicsBg.events.onDragUpdate.add(function(){
					_this.tap = false;
					if(_this.tween)
					{
						if(_this.tween.isRunning)
						{
							_this.tween.stop();
							//_this.tween = null;
						}
					}
					if(_this.graphicsBg.y>=10)
						{
							//swipeUpFlag = false;
							_this.graphicsBg.y = 0;
							//tween.stop();
							//game.input.enabled = true;
						}
					else if(_this.graphicsBg.y<=-2070)
						{
							//swipeUpFlag = false;
							_this.graphicsBg.y = -2070;
							//tween.stop();
							//game.input.enabled = true;
						}
				},_this);

				_this.graphicsBg.events.onDragStop.add(function(e){
					_this.tap = false;
					//console.log(e);
					if(_this.tween)
					{
						//if(tween.isRunning)
						_this.tween.stop();
						//_this.tween = null;
					}

						if(_this.graphicsBg.y>=0)
						{
						//	swipeDownFlag = false;
							_this.graphicsBg.y = 0;
						}
						else if(_this.graphicsBg.y<=-2070)
						{
							//swipeUpFlag = false;
							_this.graphicsBg.y = -2070;
						}
					
				},_this);
				
			},_this);
		
		_this.input.onTap.add(function(){
			//console.log("tap");
			_this.tap = true;
			_this.time.events.add(300, function(){
				_this.time.events.removeAll();
				_this.tap = false;
				//console.log("tapfalse");
			},_this);
		},_this);

		
		if(gradeScreen)
		{
			_this.graphicsBg.y = -2070;

			var gameScreenTween = game.add.tween(_this.graphicsBg);
			gameScreenTween.to({ y: 0}, 2000, 'Linear', true, 0);
			gameScreenTween.onComplete.add(function(){
					this.game.input.enabled = true;	

					if(_this.mc)
					{
						_this.mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL , enable:true });
					}


			}, _this);


			gradeScreen = false;

		}
		else
		{
			if(_this.mc)
			{
				_this.mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL , enable:true });
			}
			this.game.input.enabled = true;
		}

		//this.game.input.enabled = true;
	},
	
	addgrade6ShapesTopic:function()
	{
		_this.topicTxtBg = _this.add.graphics(100, 60);
		_this.topicTxtBg.lineStyle(0, 0xFFFFFF, 0.8);
		_this.topicTxtBg.beginFill(0x139487, 1);
		_this.topicTxtBg.drawRoundedRect(0,0,170,100,10);
		_this.topicTxtBg.boundsPadding = 0;
		
		
		//_this.topicTitleText = _this.add.sprite(215,83,'fractionsTitleTxt');
		//_this.topicTitleText.anchor.setTo(0.5);

		_this.topicTitleText = this.add.text(185, 85, ' \n '+window.selctedLang.shapesTitle+' \n ');
		_this.topicTitleText.anchor.setTo(0.5);
		_this.topicTitleText.align = 'center';
		
				
		_this.topicTitleText.font = 'gradefont';
		_this.topicTitleText.fontSize = 26;
		_this.topicTitleText.fontWeight = 'normal';
		_this.topicTitleText.fill = 'white';

		_this.topicTitleText.wordWrap = true;
		_this.topicTitleText.wordWrapWidth = 500;
		//_this.topicTitleText.setTextBounds(0,0,500,500);
		//_this.topicTitleText.padding.set(50, 50);
		
		
		//_this.topicTitleText.useAdvancedWrap  = true;
		

		//_this.topicTitleText.setShadow(0, 0, 'rgba(0, 0, 0, 0)', 0);
		
		
		_this.topicBg = _this.add.graphics(75, 100);
		_this.topicBg.lineStyle(0, 0xFFFFFF, 0.8);
		_this.topicBg.beginFill(0x139487, 1);
		_this.topicBg.drawRoundedRect(0,0,805,400,30);
		_this.topicBg.boundsPadding = 0;

		_this.GMS_1_Screen = _this.add.sprite(100,120,'GMS_1_Screen');
		_this.bgGraphicFr1 = this.add.graphics(210,175);
		_this.bgGraphicFr1.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicFr1.beginFill(0x493A19, 1);
		_this.bgGraphicFr1.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicFr1.boundsPadding = 0;
		_this.GMS_1_ScreenTxt = this.add.text(225, 192, ' \n '+window.selctedLang.GMS_1_Screen+' \n ');
		_this.GMS_1_ScreenTxt.anchor.setTo(0.5);
		_this.GMS_1_ScreenTxt.align = 'center';
		_this.GMS_1_ScreenTxt.font = 'gradefont';
		_this.GMS_1_ScreenTxt.fontSize = 20;
		_this.GMS_1_ScreenTxt.fontWeight = 'normal';
		_this.GMS_1_ScreenTxt.fill = 'white';
		_this.GMS_1_ScreenTxt.wordWrap = true;
		_this.GMS_1_ScreenTxt.wordWrapWidth = 500;
		_this.GMS_1_Screen.inputEnabled = true;
		_this.GMS_1_Screen.input.useHandCursor = true;
		_this.GMS_1_Screen.name = "GMS-1";
		_this.GMS_1_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_GMS_01_G6',true,false);
				}
			},_this);
		},_this);

		_this.GMS_2_Screen = _this.add.sprite(300,120,'GMS_2_Screen');
		_this.bgGraphicNum2 = this.add.graphics(410,175);
		_this.bgGraphicNum2.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicNum2.beginFill(0x493A19, 1);
		_this.bgGraphicNum2.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicNum2.boundsPadding = 0;
		_this.GMS_2_ScreenTxt = this.add.text(425, 192, ' \n '+window.selctedLang.GMS_2_Screen+' \n ');
		_this.GMS_2_ScreenTxt.anchor.setTo(0.5);
		_this.GMS_2_ScreenTxt.align = 'center';
		_this.GMS_2_ScreenTxt.font = 'gradefont';
		_this.GMS_2_ScreenTxt.fontSize = 20;
		_this.GMS_2_ScreenTxt.fontWeight = 'normal';
		_this.GMS_2_ScreenTxt.fill = 'white';
		_this.GMS_2_ScreenTxt.wordWrap = true;
		_this.GMS_2_ScreenTxt.wordWrapWidth = 500;
		_this.GMS_2_Screen.inputEnabled = true;
		_this.GMS_2_Screen.input.useHandCursor = true;
		_this.GMS_2_Screen.name = "GMS-2";
		_this.GMS_2_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_GMS_02_G6',true,false);
				}
			},_this);
		},_this);

		_this.GMS_3_Screen = _this.add.sprite(500,120,'GMS_3_Screen');
		_this.bgGraphicNum3 = this.add.graphics(610,175);
		_this.bgGraphicNum3.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicNum3.beginFill(0x493A19, 1);
		_this.bgGraphicNum3.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicNum3.boundsPadding = 0;
		_this.GMS_3_ScreenTxt = this.add.text(625, 192, ' \n '+window.selctedLang.GMS_3_Screen+' \n ');
		_this.GMS_3_ScreenTxt.anchor.setTo(0.5);
		_this.GMS_3_ScreenTxt.align = 'center';
		_this.GMS_3_ScreenTxt.font = 'gradefont';
		_this.GMS_3_ScreenTxt.fontSize = 20;
		_this.GMS_3_ScreenTxt.fontWeight = 'normal';
		_this.GMS_3_ScreenTxt.fill = 'white';
		_this.GMS_3_ScreenTxt.wordWrap = true;
		_this.GMS_3_ScreenTxt.wordWrapWidth = 500;
		_this.GMS_3_Screen.inputEnabled = true;
		_this.GMS_3_Screen.name = "GMS-3";
		_this.GMS_3_Screen.input.useHandCursor = true;
		_this.GMS_3_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{					
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_GMS_03_G6',true,false);
				}
			},_this);
		},_this);

		_this.GMS_4_Screen = _this.add.sprite(700,120,'GMR_1_Screen');
		_this.bgGraphicFr4 = this.add.graphics(810,175);
		_this.bgGraphicFr4.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicFr4.beginFill(0x493A19, 1);
		_this.bgGraphicFr4.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicFr4.boundsPadding = 0;
		_this.GMS_4_ScreenTxt = this.add.text(825, 192, ' \n '+window.selctedLang.GMR_1_Screen+' \n ');
		_this.GMS_4_ScreenTxt.anchor.setTo(0.5);
		_this.GMS_4_ScreenTxt.align = 'center';
		_this.GMS_4_ScreenTxt.font = 'gradefont';
		_this.GMS_4_ScreenTxt.fontSize = 20;
		_this.GMS_4_ScreenTxt.fontWeight = 'normal';
		_this.GMS_4_ScreenTxt.fill = 'white';
		_this.GMS_4_ScreenTxt.wordWrap = true;
		_this.GMS_4_ScreenTxt.wordWrapWidth = 500;
		_this.GMS_4_Screen.inputEnabled = true;
		_this.GMS_4_Screen.name = "GMR-4";
		_this.GMS_4_Screen.input.useHandCursor = true;
		_this.GMS_4_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_GMR_01_G6',true,false);
				}
			},_this);
		},_this);

		_this.GMCR_1_Screen = _this.add.sprite(100,320,'GMCR_1_Screen');
		_this.bgGraphicNum5 = this.add.graphics(210,375);
		_this.bgGraphicNum5.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicNum5.beginFill(0x493A19, 1);
		_this.bgGraphicNum5.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicNum5.boundsPadding = 0;
		_this.GMCR_1_ScreenTxt = this.add.text(225, 392, ' \n '+window.selctedLang.GMCR_1_Screen+' \n ');
		_this.GMCR_1_ScreenTxt.anchor.setTo(0.5);
		_this.GMCR_1_ScreenTxt.align = 'center';
		_this.GMCR_1_ScreenTxt.font = 'gradefont';
		_this.GMCR_1_ScreenTxt.fontSize = 20;
		_this.GMCR_1_ScreenTxt.fontWeight = 'normal';
		_this.GMCR_1_ScreenTxt.fill = 'white';
		_this.GMCR_1_ScreenTxt.wordWrap = true;
		_this.GMCR_1_ScreenTxt.wordWrapWidth = 500;
		_this.GMCR_1_Screen.inputEnabled = true;
		_this.GMCR_1_Screen.input.useHandCursor = true;
		_this.GMCR_1_Screen.name = "GMCR-1";
		_this.GMCR_1_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_gmcr_01',true,false);
				}
			},_this);
		},_this);

		_this.GMAN_1_Screen = _this.add.sprite(300,320,'GMAN_1_Screen');
		_this.bgGraphicNum6 = this.add.graphics(410,375);
		_this.bgGraphicNum6.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicNum6.beginFill(0x493A19, 1);
		_this.bgGraphicNum6.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicNum6.boundsPadding = 0;
		_this.GMAN_1_ScreenTxt = this.add.text(425, 392, ' \n '+window.selctedLang.GMAN_1_Screen +' \n ');
		_this.GMAN_1_ScreenTxt.anchor.setTo(0.5);
		_this.GMAN_1_ScreenTxt.align = 'center';
		_this.GMAN_1_ScreenTxt.font = 'gradefont';
		_this.GMAN_1_ScreenTxt.fontSize = 20;
		_this.GMAN_1_ScreenTxt.fontWeight = 'normal';
		_this.GMAN_1_ScreenTxt.fill = 'white';
		_this.GMAN_1_ScreenTxt.wordWrap = true;
		_this.GMAN_1_ScreenTxt.wordWrapWidth = 500;
		_this.GMAN_1_Screen .inputEnabled = true;
		_this.GMAN_1_Screen .name = "GMAN-1";
		_this.GMAN_1_Screen .input.useHandCursor = true;
		_this.GMAN_1_Screen .events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{					
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('GMAN_01_G6level1',true,false);
				}
			},_this);
		},_this);
		

		if(window.languageSelected=="Hindi")
		{
			//_this.topicTitleText.frame = 1;
			//_this.fractions1_1AScreenTxt.frame = 1;
		}
		else if(window.languageSelected=="Kannada")
		{
			//_this.topicTitleText.frame = 2;
			//_this.fractions1_1AScreenTxt.frame = 2;
		}
		else
		{
			//_this.topicTitleText.frame = 0;
			//_this.fractions1_1AScreenTxt.frame = 0;
		}
		
		_this.grade6ShapesGroup.add(_this.topicTxtBg);
		_this.grade6ShapesGroup.add(_this.topicTitleText);
		_this.grade6ShapesGroup.add(_this.topicBg);
		_this.grade6ShapesGroup.add(_this.GMS_1_Screen);
		_this.grade6ShapesGroup.add(_this.bgGraphicFr1);
		_this.grade6ShapesGroup.add(_this.GMS_1_ScreenTxt);
		_this.grade6ShapesGroup.add(_this.GMS_2_Screen);
		_this.grade6ShapesGroup.add(_this.bgGraphicNum2);
		_this.grade6ShapesGroup.add(_this.GMS_2_ScreenTxt);
		_this.grade6ShapesGroup.add(_this.GMS_3_Screen);
		_this.grade6ShapesGroup.add(_this.bgGraphicNum3);
		_this.grade6ShapesGroup.add(_this.GMS_3_ScreenTxt);
		_this.grade6ShapesGroup.add(_this.GMS_4_Screen);
		_this.grade6ShapesGroup.add(_this.bgGraphicFr4);
		_this.grade6ShapesGroup.add(_this.GMS_4_ScreenTxt);
		_this.grade6ShapesGroup.add(_this.GMCR_1_Screen);
		_this.grade6ShapesGroup.add(_this.bgGraphicNum5);
		_this.grade6ShapesGroup.add(_this.GMCR_1_ScreenTxt);
		_this.grade6ShapesGroup.add(_this.GMAN_1_Screen);
		_this.grade6ShapesGroup.add(_this.bgGraphicNum6);
		_this.grade6ShapesGroup.add(_this.GMAN_1_ScreenTxt);
			
	},
	
	addgrade6MensurationTopic:function()
	{
		_this.topicTxtBg = _this.add.graphics(100, 60);
		_this.topicTxtBg.lineStyle(0, 0xFFFFFF, 2);
		_this.topicTxtBg.beginFill(0x139487, 1);
		_this.topicTxtBg.drawRoundedRect(0,0,210,100,10);
		_this.topicTxtBg.boundsPadding = 0;
		
		//_this.topicTitleText = _this.add.sprite(215,83,'lengthTitleTxt');
		//_this.topicTitleText.anchor.setTo(0.5);

		_this.topicTitleText = this.add.text(205, 85, ' \n '+window.selctedLang.mensurationTitle+' \n ');
		_this.topicTitleText.anchor.setTo(0.5);
		_this.topicTitleText.align = 'center';
		
				
		_this.topicTitleText.font = 'gradefont';
		_this.topicTitleText.fontSize = 26;
		_this.topicTitleText.fontWeight = 'normal';
		_this.topicTitleText.fill = 'white';

		_this.topicTitleText.wordWrap = true;
		_this.topicTitleText.wordWrapWidth = 500;
		//_this.topicTitleText.setTextBounds(0,0,500,500);
		//_this.topicTitleText.padding.set(50, 50);
		
		
		//_this.topicTitleText.useAdvancedWrap  = true;
		

		//_this.topicTitleText.setShadow(0, 0, 'rgba(0, 0, 0, 0)', 0);
		
		
		_this.topicBg = _this.add.graphics(75, 100);
		_this.topicBg.lineStyle(0, 0xFFFFFF, 0.8);
		_this.topicBg.beginFill(0x139487, 1);
		_this.topicBg.drawRoundedRect(0,0,805,200,30);
		_this.topicBg.boundsPadding = 0;
		
		_this.GMPAR_1_Screen = _this.add.sprite(100,120,'GMPAR_1_Screen');
		_this.bgGraphicInt1 = this.add.graphics(210,175);
		_this.bgGraphicInt1.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicInt1.beginFill(0x493A19, 1);
		_this.bgGraphicInt1.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicInt1.boundsPadding = 0;
		_this.GMPAR_1_ScreenTxt = this.add.text(225, 192, ' \n '+window.selctedLang.GMPAR_1_Screen+' \n ');
		_this.GMPAR_1_ScreenTxt.anchor.setTo(0.5);
		_this.GMPAR_1_ScreenTxt.align = 'center';
		_this.GMPAR_1_ScreenTxt.font = 'gradefont';
		_this.GMPAR_1_ScreenTxt.fontSize = 20;
		_this.GMPAR_1_ScreenTxt.fontWeight = 'normal';
		_this.GMPAR_1_ScreenTxt.fill = 'white';
		_this.GMPAR_1_ScreenTxt.wordWrap = true;
		_this.GMPAR_1_ScreenTxt.wordWrapWidth = 500;
		_this.GMPAR_1_Screen.inputEnabled = true;
		_this.GMPAR_1_Screen.input.useHandCursor = true;
		_this.GMPAR_1_Screen.name = "INT-1";
		_this.GMPAR_1_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_GMPAR_01_G6',true,false);
				}
			},_this);
		},_this);
		
	
	
		if(window.languageSelected=="Hindi")
		{
			//_this.topicTitleText.frame = 1;
			//_this.length2_1AScreenTxt.frame = 1;
			//_this.length2_1BScreenTxt.frame = 1;
			//_this.length2_2ScreenTxt.frame = 1;
			//_this.length2_3ScreenTxt.frame = 1;
		}
		else if(window.languageSelected=="Kannada")
		{
			//_this.topicTitleText.frame = 2;
			//_this.length2_1AScreenTxt.frame = 2;
			//_this.length2_1BScreenTxt.frame = 2;
			//_this.length2_2ScreenTxt.frame = 2;
			//_this.length2_3ScreenTxt.frame = 2;
		}
		else
		{
			//_this.topicTitleText.frame = 0;
			//_this.length2_1AScreenTxt.frame = 0;
			//_this.length2_1BScreenTxt.frame = 0;
			//_this.length2_2ScreenTxt.frame = 0;
			//_this.length2_3ScreenTxt.frame = 0;
		}
		
		_this.grade6MensurationGroup.add(_this.topicTxtBg);
		_this.grade6MensurationGroup.add(_this.topicTitleText);
		_this.grade6MensurationGroup.add(_this.topicBg);

		_this.grade6MensurationGroup.add(_this.GMPAR_1_Screen);
		_this.grade6MensurationGroup.add(_this.bgGraphicInt1);
		_this.grade6MensurationGroup.add(_this.GMPAR_1_ScreenTxt);

	},	
	
	amplifyMedia:function(mediaElem, multiplier) {
		var context = new (window.AudioContext || window.webkitAudioContext),
			result = {
			context: context,
			source: context.createMediaElementSource(mediaElem),
			gain: context.createGain(),
			media: mediaElem,
			amplify: function(multiplier) { result.gain.gain.value = multiplier; },
			getAmpLevel: function() { return result.gain.gain.value; }
			};
		result.source.connect(result.gain);
		result.gain.connect(context.destination);
		result.amplify(multiplier);

		return result;
	},
	
	stopDemoVoice:function(){
            if(_this.playQuestionSound)
		   {
			if(_this.playQuestionSound.contains(_this.src))
			{
				_this.playQuestionSound.removeChild(_this.src);
				_this.src = null;
			}
			if(!_this.playQuestionSound.paused)
			{
				_this.playQuestionSound.pause();
				_this.playQuestionSound.currentTime = 0.0;
			}
			_this.playQuestionSound = null;
			_this.src = null;
		}
	},
	shutdown:function()
	{
		if(_this.mc)
		{
			_this.mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL , enable:false });
		}
		document.removeEventListener("online", _this.syncTelFunc, false);
		
		if(this.video)
		{
			this.video.destroy();
			this.video.removeVideoElement();
			this.video = null;
		}
		
		if(this.video1)
		{
			this.video1.destroy();
			this.video1.removeVideoElement();
			this.video1 = null;
		}
		if(this.video2)
		{
			this.video2.destroy();
			this.video2.removeVideoElement();
			this.video2 = null;
		}
		if(this.video3)
		{
			this.video3.destroy();
			this.video3.removeVideoElement();
			this.video3 = null;
		}
	},
	//userprogress

	// localdatasuccess:function(result) {
	// 	console.log("start localdatasuccess",result);
	// 	console.log("start localdatasuccess"+result.rows.length);
	// 	if(result.rows.length>0)
	// 	{
	// 		console.log("inside if statement",result.rows.item(0));
	// 		console.log("mins",result.rows.item(0).Mins);
	// 		console.log("Hrs",result.rows.item(0).Hrs);
	// 		console.log("secs",result.rows.item(0).Secs);
	// 		_this.convertTimeinMinandSectoHrsMinsSecs(result.rows.item(0).Hrs,result.rows.item(0).Mins,result.rows.item(0).Secs);
	// 	}
	// 	else {
	// 		_this.storingGameDetails();
	// 	}
	// },

	// localdatafailed : function(error){
	// 	console.log(error);
	// },

	
	// storingGameDetails :function()
	// {
	// 	console.log("inside storingGameDetails",_this.userHasPlayed,_this.timeInMinutes,_this.timeInSeconds,_this.game_id);
	// 	console.log(device.serial+"_"+device.uuid);
	// 	var save_assessment ={
	// 		device_id:device.serial+"_"+device.uuid,
	// 		grade: _this.grade,
	// 		microConcept: _this.microConcepts,
	// 		gradeTopics:_this.gradeTopics,
	// 		game_id:_this.game_id,
	// 		totalLearningTimeinHrs:'0',
	// 		totalLearningTimeinMins:_this.timeInMinutes.toString(),
	// 		totalLearningTimeinSecs:_this.timeInSeconds.toString(),
	// 		score:_this.score,
	// 	}
	// 	console.log("save assessment",save_assessment.microConcept);
	// 	if(_this.userHasPlayed == 1)
	// 	{
	// 		BBplusplusdbDetails.userProgressSaving(save_assessment);
	// 	}
	// },

	convertTimeinMinandSectoHrsMinsSecs :function(Hours1,Minutes1,Seconds1)
	{
		console.log("inside convert time",Hours1,Minutes1,Seconds1);

		const totalMinutes = Math.floor((parseInt(Seconds1)+parseInt(_this.timeInSeconds)) / 60) + (parseInt(Minutes1)+parseInt(_this.timeInMinutes));
		const Seconds2 = (parseInt(Seconds1)+parseInt(_this.timeInSeconds)) % 60;

		const Hours2 = Math.floor(totalMinutes / 60) + parseInt(Hours1);
		const Minutes2 = totalMinutes % 60;

		console.log("before adding");
		console.log("totalMinutes",totalMinutes);
		console.log("after adding");
		console.log("Seconds2",Seconds2);
		console.log("Hours2",Hours2);
		console.log("Minutes2",Minutes2)

		var save_assessment ={
			game_id:_this.game_id,
			totalLearningTimeinHrs:Hours2.toString(),
			totalLearningTimeinMins:Minutes2.toString(),
			totalLearningTimeinSecs:Seconds2.toString(),
		}
		console.log("save assessment",save_assessment);
		if(_this.userHasPlayed == 1)
		{
			BBplusplusdbDetails.updateRecordsUsingGameID(save_assessment);
		}

	}	
};