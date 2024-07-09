Game.grade7NumberSystems=function(game){
	
};

Game.grade7NumberSystems.prototype={

	init:function(game_id,userHasPlayed,timeInMinutes,timeInSeconds,score,gradeTopics,grade,microConcepts)
	{
		_this = this;
		//console.log("sync telemetry"+navigator.connection.type);
		if(navigator.connection.type!="none" && navigator.connection.type!="unknown" && navigator.connection.type!=null && navigator.connection.type!="undefined")
		{
			console.log("sync telemetry"+navigator.connection.type);
			//absdsjsapi.syncTelemetryData();
		}

		document.addEventListener("online", _this.syncTelFunc, false);

		//Variables used for user progress
		_this.userHasPlayed = userHasPlayed;
		_this.timeInMinutes = timeInMinutes;
		_this.timeInSeconds = timeInSeconds;
		_this.score = score;
		_this.game_id = game_id;
		_this.gradeTopics = gradeTopics;
		_this.grade = grade;
		_this.microConcepts = microConcepts;

		//console.log("inside numbersystems menu",_this.userHasPlayed,_this.timeInMinutes,_this.timeInSeconds,_this.game_id,_this.score);

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

		
		nativeApp.screenViewStringPass("Practice_activity_list","grade7NumberSystems");
		
		_this = this;

		this.game.input.enabled = false;

		grade7NumberSystemsSelected = false;
		grade7AlgebraSelected = false;
		grade7RatioandProportionSelected = false;
		grade7GeometrySelected  = false;
		grade7DecimalsSelected  = false;

		this.video = null;
		this.video1 = null;
		this.video2 = null;
		this.video3 = null;

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
            grade7NumberSystemsSelected = false;
			_this.state.start('selectgrade7MicroConceptScreen',true,false);
		},_this);

		this.gameModeShareBtn = game.add.image(920,18,'shareIcon');
		this.gameModeShareBtn.anchor.setTo(0.5);
		this.gameModeShareBtn.scale.setTo(0.75);
		this.gameModeShareBtn.inputEnabled = true;
		this.gameModeShareBtn.input.priorityID = 1;
		this.gameModeShareBtn.input.useHandCursor = true;
		this.gameModeShareBtn.events.onInputDown.add(function()
		{
			this.clickSound = this.add.audio('ClickSound');
			this.clickSound.play();
			nativeApp.ShareApp();
		},this);
		
		
		_this.grade7NumbersGroup = _this.add.group();
		_this.grade7IntegersGroup = _this.add.group();
		_this.grade7FractionsGroup = _this.add.group();
		_this.grade7DecimalsGroup = _this.add.group();
		_this.grade7RatioandProportionGroup = _this.add.group();
		
		//_this.addgrade7NumbersTopic();
		_this.addgrade7IntegersTopic();
		_this.addgrade7FractionsTopic();
		_this.addgrade7DecimalsTopic();
		//_this.addgrade7RatioProportionTopic();

		// _this.grade7NumbersGroup.x = 0;
		// _this.grade7NumbersGroup.y = 0;

		_this.grade7IntegersGroup.x = 0;
		_this.grade7IntegersGroup.y = 0;
		//_this.grade7IntegersGroup.x = 0;
		//_this.grade7IntegersGroup.y = 500;

		_this.grade7FractionsGroup.x = 0;
		_this.grade7FractionsGroup.y = 500;
		//_this.grade7FractionsGroup.x = 0;
		//_this.grade7FractionsGroup.y = 1000;

		_this.grade7DecimalsGroup.x = 0;
		_this.grade7DecimalsGroup.y = 1200;
		// _this.grade7DecimalsGroup.x = 0;
		// _this.grade7DecimalsGroup.y = 1700;

		_this.grade7RatioandProportionGroup.x = 0;
		_this.grade7RatioandProportionGroup.y = 3230;
		
		_this.graphicsBg = _this.add.graphics(0, 0);
		_this.graphicsBg.lineStyle(0, 0xFFFFFF, 0.8);
		_this.graphicsBg.beginFill(0xD957A0, 0);
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
		
		_this.graphicsBg.addChild(_this.grade7RatioandProportionGroup);
		_this.graphicsBg.addChild(_this.grade7DecimalsGroup);
		_this.graphicsBg.addChild(_this.grade7FractionsGroup);
		_this.graphicsBg.addChild(_this.grade7NumbersGroup);
		_this.graphicsBg.addChild(_this.grade7IntegersGroup);
		
		
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
						if(_this.graphicsBg.y<=-3000)
						{
							//swipeUpFlag = false;
							_this.graphicsBg.y = -3000;
						}
						
						//game.input.enabled = true;
					}, _this);
					_this.tween.onUpdateCallback(function(){
						_this.tap = false;
						if(_this.graphicsBg.y<=-3000)
						{
							//swipeUpFlag = false;
							_this.graphicsBg.y = -3000;
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
					else if(_this.graphicsBg.y<=-3000)
						{
							//swipeUpFlag = false;
							_this.graphicsBg.y = -3000;
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
						else if(_this.graphicsBg.y<=-3000)
						{
							//swipeUpFlag = false;
							_this.graphicsBg.y = -3000;
						}
					
				},_this);

			},_this);
		
		_this.input.onTap.add(function(){
			//console.log("tap");
			_this.tap = true;
			_this.time.events.add(3000, function(){
				_this.time.events.removeAll();
				_this.tap = false;
				//console.log("tapfalse");
			},_this);
		},_this);

		
		if(gradeScreen)
		{
			_this.graphicsBg.y = -3000;

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

	},
	
	
	addgrade7FractionsTopic:function()
	{
		_this.topicTxtBg = _this.add.graphics(100, 60);
		_this.topicTxtBg.lineStyle(0, 0xFFFFFF, 0.8);
		_this.topicTxtBg.beginFill(0xD957A0, 1);
		_this.topicTxtBg.drawRoundedRect(0,0,170,100,10);
		_this.topicTxtBg.boundsPadding = 0;
	
		_this.topicTitleText = this.add.text(185, 85, ' \n '+window.selctedLang.fractionTitle+' \n ');
		_this.topicTitleText.anchor.setTo(0.5);
		_this.topicTitleText.align = 'center';
		_this.topicTitleText.font = 'gradefont';
		_this.topicTitleText.fontSize = 26;
		_this.topicTitleText.fontWeight = 'normal';
		_this.topicTitleText.fill = 'white';
		_this.topicTitleText.wordWrap = true;
		_this.topicTitleText.wordWrapWidth = 500;
		
		_this.topicBg = _this.add.graphics(75, 100);
		_this.topicBg.lineStyle(0, 0xFFFFFF, 0.8);
		_this.topicBg.beginFill(0xD957A0, 1);
		_this.topicBg.drawRoundedRect(0,0,805,600,30);
		_this.topicBg.boundsPadding = 0;
		//NSF-CUIS-G7//NSF-ADSB//NSF-UNLAD//NSF-UNLSB//NSF-MLP-01//NSF-MLP-02//NSF-MLP-03//NSF-DWF-G7//NSF-DFW//NSF-DFF
		_this.NSF_CUIS_Screen = _this.add.sprite(100,120,'NSF_CUIS_Screen');//NSF_CUIS_Screen
		_this.bgGraphicFr1 = this.add.graphics(210,175);
		_this.bgGraphicFr1.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicFr1.beginFill(0x493A19, 1);
		_this.bgGraphicFr1.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicFr1.boundsPadding = 0;
		_this.NSF_CUIS_ScreenTxt = this.add.text(225, 192, ' \n '+window.selctedLang.NSF_CUIS_Screen+' \n ');//window.selctedLang.NSF_CUIS_Screen
		_this.NSF_CUIS_ScreenTxt.anchor.setTo(0.5);
		_this.NSF_CUIS_ScreenTxt.align = 'center';
		_this.NSF_CUIS_ScreenTxt.font = 'gradefont';
		_this.NSF_CUIS_ScreenTxt.fontSize = 20;
		_this.NSF_CUIS_ScreenTxt.fontWeight = 'normal';
		_this.NSF_CUIS_ScreenTxt.fill = 'white';
		_this.NSF_CUIS_ScreenTxt.wordWrap = true;
		_this.NSF_CUIS_ScreenTxt.wordWrapWidth = 500;
		_this.NSF_CUIS_Screen.inputEnabled = true;
		_this.NSF_CUIS_Screen.input.useHandCursor = true;
		_this.NSF_CUIS_Screen.name = "NSF-1";
		_this.NSF_CUIS_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_NSF_CUIS_G7',true,false);
				}
			},_this);
		},_this);

		_this.NSF_ADSB_Screen = _this.add.sprite(300,120,'NSF_ADSB_Screen');//NSF_ADSB_Screen
		_this.bgGraphicFr2 = this.add.graphics(410,175);
		_this.bgGraphicFr2.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicFr2.beginFill(0x493A19, 1);
		_this.bgGraphicFr2.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicFr2.boundsPadding = 0;
		_this.NSF_ADSB_ScreenTxt = this.add.text(425, 192, ' \n '+window.selctedLang.NSF_ADSB_Screen+' \n ');//window.selctedLang.NSF_ADSB_Screen
		_this.NSF_ADSB_ScreenTxt.anchor.setTo(0.5);
		_this.NSF_ADSB_ScreenTxt.align = 'center';
		_this.NSF_ADSB_ScreenTxt.font = 'gradefont';
		_this.NSF_ADSB_ScreenTxt.fontSize = 20;
		_this.NSF_ADSB_ScreenTxt.fontWeight = 'normal';
		_this.NSF_ADSB_ScreenTxt.fill = 'white';
		_this.NSF_ADSB_ScreenTxt.wordWrap = true;
		_this.NSF_ADSB_ScreenTxt.wordWrapWidth = 500;
		_this.NSF_ADSB_Screen.inputEnabled = true;
		_this.NSF_ADSB_Screen.input.useHandCursor = true;
		_this.NSF_ADSB_Screen.name = "FSM-2";
		_this.NSF_ADSB_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_NSF_ADSB_G7',true,false);
				}
			},_this);	
		},_this);

		_this.NSF_UNLAD_Screen = _this.add.sprite(500,120,'NSF_UNLAD_Screen');//NSF_UNLAD_Screen
		_this.bgGraphicFr3 = this.add.graphics(610,175);
		_this.bgGraphicFr3.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicFr3.beginFill(0x493A19, 1);
		_this.bgGraphicFr3.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicFr3.boundsPadding = 0;
		_this.NSF_UNLAD_ScreenTxt = this.add.text(625, 192, ' \n '+window.selctedLang.NSF_UNLAD_Screen+' \n ');//window.selctedLang.NSF_UNLAD_Screen
		_this.NSF_UNLAD_ScreenTxt.anchor.setTo(0.5);
		_this.NSF_UNLAD_ScreenTxt.align = 'center';
		_this.NSF_UNLAD_ScreenTxt.font = 'gradefont';
		_this.NSF_UNLAD_ScreenTxt.fontSize = 20;
		_this.NSF_UNLAD_ScreenTxt.fontWeight = 'normal';
		_this.NSF_UNLAD_ScreenTxt.fill = 'white';
		_this.NSF_UNLAD_ScreenTxt.wordWrap = true;
		_this.NSF_UNLAD_ScreenTxt.wordWrapWidth = 500;
		_this.NSF_UNLAD_Screen.inputEnabled = true;
		_this.NSF_UNLAD_Screen.input.useHandCursor = true;
		_this.NSF_UNLAD_Screen.name = "NSF-3";
		_this.NSF_UNLAD_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_NSF_UNLAD_G7',true,false);
				}
			},_this);
		},_this);

		_this.NSF_UNLSB_Screen = _this.add.sprite(700,120,'NSF_UNLSB_Screen');//NSF_UNLSB_Screen
		_this.bgGraphicFr4 = this.add.graphics(810,175);
		_this.bgGraphicFr4.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicFr4.beginFill(0x493A19, 1);
		_this.bgGraphicFr4.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicFr4.boundsPadding = 0;
		_this.NSF_UNLSB_ScreenTxt = this.add.text(825, 192, ' \n '+window.selctedLang.NSF_UNLSB_Screen+' \n ');//window.selctedLang.NSF_UNLSB_Screen
		_this.NSF_UNLSB_ScreenTxt.anchor.setTo(0.5);
		_this.NSF_UNLSB_ScreenTxt.align = 'center';
		_this.NSF_UNLSB_ScreenTxt.font = 'gradefont';
		_this.NSF_UNLSB_ScreenTxt.fontSize = 20;
		_this.NSF_UNLSB_ScreenTxt.fontWeight = 'normal';
		_this.NSF_UNLSB_ScreenTxt.fill = 'white'; 
		_this.NSF_UNLSB_ScreenTxt.wordWrap = true;
		_this.NSF_UNLSB_ScreenTxt.wordWrapWidth = 500;
		_this.NSF_UNLSB_Screen.inputEnabled = true;
		_this.NSF_UNLSB_Screen.name = "NSF-4";
		_this.NSF_UNLSB_Screen.input.useHandCursor = true;
		_this.NSF_UNLSB_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_NSF_UNLSB_G7',true,false);
				}
			},_this);
		},_this);

		_this.NSF_MLP_1_Screen = _this.add.sprite(100,320,'NSF_MLP_1_Screen');//NSF_MLP_1_Screen
		_this.bgGraphicFr5 = this.add.graphics(210,375);
		_this.bgGraphicFr5.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicFr5.beginFill(0x493A19, 1);
		_this.bgGraphicFr5.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicFr5.boundsPadding = 0;
		_this.NSF_MLP_1_ScreenTxt = this.add.text(225, 392, ' \n '+window.selctedLang.NSF_MLP_1_Screen+' \n ');//window.selctedLang.NSF_MLP_1_Screen
		_this.NSF_MLP_1_ScreenTxt.anchor.setTo(0.5);
		_this.NSF_MLP_1_ScreenTxt.align = 'center';
		_this.NSF_MLP_1_ScreenTxt.font = 'gradefont';
		_this.NSF_MLP_1_ScreenTxt.fontSize = 20;
		_this.NSF_MLP_1_ScreenTxt.fontWeight = 'normal';
		_this.NSF_MLP_1_ScreenTxt.fill = 'white';
		_this.NSF_MLP_1_ScreenTxt.wordWrap = true;
		_this.NSF_MLP_1_ScreenTxt.wordWrapWidth = 500;
		_this.NSF_MLP_1_Screen.inputEnabled = true;
		_this.NSF_MLP_1_Screen.input.useHandCursor = true;
		_this.NSF_MLP_1_Screen.name = "FSM-5";
		_this.NSF_MLP_1_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_NSF_MLP_01_G7',true,false);
				}
			},_this);
		},_this);

		_this.NSF_MLP_2_Screen = _this.add.sprite(300,320,'NSF_MLP_2_Screen');//NSF_MLP_2_Screen
		_this.bgGraphicFr6 = this.add.graphics(410,375);
		_this.bgGraphicFr6.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicFr6.beginFill(0x493A19, 1);
		_this.bgGraphicFr6.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicFr6.boundsPadding = 0;
		_this.NSF_MLP_2_ScreenTxt = this.add.text(425, 392, ' \n '+window.selctedLang.NSF_MLP_2_Screen+' \n ');//window.selctedLang.NSF_MLP_2_Screen
		_this.NSF_MLP_2_ScreenTxt.anchor.setTo(0.5);
		_this.NSF_MLP_2_ScreenTxt.align = 'center';
		_this.NSF_MLP_2_ScreenTxt.font = 'gradefont';
		_this.NSF_MLP_2_ScreenTxt.fontSize = 20;
		_this.NSF_MLP_2_ScreenTxt.fontWeight = 'normal';
		_this.NSF_MLP_2_ScreenTxt.fill = 'white';
		_this.NSF_MLP_2_ScreenTxt.wordWrap = true;
		_this.NSF_MLP_2_ScreenTxt.wordWrapWidth = 500;
		_this.NSF_MLP_2_Screen.inputEnabled = true;
		_this.NSF_MLP_2_Screen.input.useHandCursor = true;
		_this.NSF_MLP_2_Screen.name = "NSF-6";
		_this.NSF_MLP_2_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_NSF_MLP_02_G7',true,false);
				}
			},_this);	
		},_this);

		_this.NSF_MLP_3_Screen = _this.add.sprite(500,320,'NSF_MLP_3_Screen');//NSF_MLP_3_Screen
		_this.bgGraphicFr7 = this.add.graphics(610,375);
		_this.bgGraphicFr7.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicFr7.beginFill(0x493A19, 1);
		_this.bgGraphicFr7.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicFr7.boundsPadding = 0;
		_this.NSF_MLP_3_ScreenTxt = this.add.text(625, 392, ' \n '+window.selctedLang.NSF_MLP_3_Screen+' \n ');//window.selctedLang.NSF_MLP_3_Screen
		_this.NSF_MLP_3_ScreenTxt.anchor.setTo(0.5);
		_this.NSF_MLP_3_ScreenTxt.align = 'center';
		_this.NSF_MLP_3_ScreenTxt.font = 'gradefont';
		_this.NSF_MLP_3_ScreenTxt.fontSize = 20;
		_this.NSF_MLP_3_ScreenTxt.fontWeight = 'normal';
		_this.NSF_MLP_3_ScreenTxt.fill = 'white';
		_this.NSF_MLP_3_ScreenTxt.wordWrap = true;
		_this.NSF_MLP_3_ScreenTxt.wordWrapWidth = 500;
		_this.NSF_MLP_3_Screen.inputEnabled = true;
		_this.NSF_MLP_3_Screen.input.useHandCursor = true;
		_this.NSF_MLP_3_Screen.name = "NSF-7";
		_this.NSF_MLP_3_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_NSF_MLP_03_G7',true,false);
				}
			},_this);
		},_this);

		_this.NSF_DWF_Screen = _this.add.sprite(700,320,'NSF_DWF_Screen');//NSF_DWF_Screen
		_this.bgGraphicFr8 = this.add.graphics(810,375);
		_this.bgGraphicFr8.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicFr8.beginFill(0x493A19, 1);
		_this.bgGraphicFr8.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicFr8.boundsPadding = 0;
		_this.NSF_DWF_ScreenTxt = this.add.text(825, 392, ' \n '+window.selctedLang.NSF_DWF_Screen+' \n ');//window.selctedLang.NSF_DWF_Screen
		_this.NSF_DWF_ScreenTxt.anchor.setTo(0.5);
		_this.NSF_DWF_ScreenTxt.align = 'center';
		_this.NSF_DWF_ScreenTxt.font = 'gradefont';
		_this.NSF_DWF_ScreenTxt.fontSize = 20;
		_this.NSF_DWF_ScreenTxt.fontWeight = 'normal';
		_this.NSF_DWF_ScreenTxt.fill = 'white';
		_this.NSF_DWF_ScreenTxt.wordWrap = true;
		_this.NSF_DWF_ScreenTxt.wordWrapWidth = 500;
		_this.NSF_DWF_Screen.inputEnabled = true;
		_this.NSF_DWF_Screen.name = "NSF-8";
		_this.NSF_DWF_Screen.input.useHandCursor = true;
		_this.NSF_DWF_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_NSF_DWF_G7',true,false);
				}
			},_this);
		},_this);

		_this.NSF_DFW_Screen = _this.add.sprite(100,520,'NSF_DFW_Screen');//NSF_DFW_Screen
		_this.bgGraphicFr9 = this.add.graphics(210,575);
		_this.bgGraphicFr9.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicFr9.beginFill(0x493A19, 1);
		_this.bgGraphicFr9.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicFr9.boundsPadding = 0;
		_this.NSF_DFW_ScreenTxt = this.add.text(225, 592, ' \n '+window.selctedLang.NSF_DFW_Screen+' \n ');//window.selctedLang.NSF_DFW_Screen
		_this.NSF_DFW_ScreenTxt.anchor.setTo(0.5);
		_this.NSF_DFW_ScreenTxt.align = 'center';
		_this.NSF_DFW_ScreenTxt.font = 'gradefont';
		_this.NSF_DFW_ScreenTxt.fontSize = 20;
		_this.NSF_DFW_ScreenTxt.fontWeight = 'normal';
		_this.NSF_DFW_ScreenTxt.fill = 'white';
		_this.NSF_DFW_ScreenTxt.wordWrap = true;
		_this.NSF_DFW_ScreenTxt.wordWrapWidth = 500;
		_this.NSF_DFW_Screen.inputEnabled = true;
		_this.NSF_DFW_Screen.input.useHandCursor = true;
		_this.NSF_DFW_Screen.name = "NSF-9";
		_this.NSF_DFW_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_NSF_DFW_G7',true,false);
				}
			},_this);
		},_this);

		_this.NSF_DFF_Screen = _this.add.sprite(300,520,'NSF_DFF_Screen');//NSF_DFF_Screen
		_this.bgGraphicFr10 = this.add.graphics(410,575);
		_this.bgGraphicFr10.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicFr10.beginFill(0x493A19, 1);
		_this.bgGraphicFr10.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicFr10.boundsPadding = 0;
		_this.NSF_DFF_ScreenTxt = this.add.text(425, 592, ' \n '+window.selctedLang.NSF_DFF_Screen+' \n ');//window.selctedLang.NSF_DFF_Screen
		_this.NSF_DFF_ScreenTxt.anchor.setTo(0.5);
		_this.NSF_DFF_ScreenTxt.align = 'center';
		_this.NSF_DFF_ScreenTxt.font = 'gradefont';
		_this.NSF_DFF_ScreenTxt.fontSize = 20;
		_this.NSF_DFF_ScreenTxt.fontWeight = 'normal';
		_this.NSF_DFF_ScreenTxt.fill = 'white';
		_this.NSF_DFF_ScreenTxt.wordWrap = true;
		_this.NSF_DFF_ScreenTxt.wordWrapWidth = 500;
		_this.NSF_DFF_Screen.inputEnabled = true;
		_this.NSF_DFF_Screen.input.useHandCursor = true;
		_this.NSF_DFF_Screen.name = "NSF-10";
		_this.NSF_DFF_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_NSF_DFF_G7',true,false);
				}
			},_this);	
		},_this);

		// _this.NSF_11_Screen = _this.add.sprite(500,520,'NSF_7_Screen');
		// _this.bgGraphicFr11 = this.add.graphics(610,575);
		// _this.bgGraphicFr11.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicFr11.beginFill(0x493A19, 1);
		// _this.bgGraphicFr11.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicFr11.boundsPadding = 0;
		// _this.NSF_11_ScreenTxt = this.add.text(625, 592, ' \n '+window.selctedLang.NSF_11_Screen+' \n ');
		// _this.NSF_11_ScreenTxt.anchor.setTo(0.5);
		// _this.NSF_11_ScreenTxt.align = 'center';
		// _this.NSF_11_ScreenTxt.font = 'gradefont';
		// _this.NSF_11_ScreenTxt.fontSize = 20;
		// _this.NSF_11_ScreenTxt.fontWeight = 'normal';
		// _this.NSF_11_ScreenTxt.fill = 'white';
		// _this.NSF_11_ScreenTxt.wordWrap = true;
		// _this.NSF_11_ScreenTxt.wordWrapWidth = 500;
		// _this.NSF_11_Screen.inputEnabled = true;
		// _this.NSF_11_Screen.input.useHandCursor = true;
		// _this.NSF_11_Screen.name = "NSF-11";
		// _this.NSF_11_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_nsf_11',true,false);
		// 		}
		// 	},_this);
		// },_this);

		// _this.NSF_12_Screen = _this.add.sprite(700,520,'NSF_12_Screen');
		// _this.bgGraphicFr12 = this.add.graphics(810,575);
		// _this.bgGraphicFr12.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicFr12.beginFill(0x493A19, 1);
		// _this.bgGraphicFr12.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicFr12.boundsPadding = 0;
		// _this.NSF_12_ScreenTxt = this.add.text(825, 592, ' \n '+window.selctedLang.NSF_12_Screen+' \n ');
		// _this.NSF_12_ScreenTxt.anchor.setTo(0.5);
		// _this.NSF_12_ScreenTxt.align = 'center';
		// _this.NSF_12_ScreenTxt.font = 'gradefont';
		// _this.NSF_12_ScreenTxt.fontSize = 20;
		// _this.NSF_12_ScreenTxt.fontWeight = 'normal';
		// _this.NSF_12_ScreenTxt.fill = 'white';
		// _this.NSF_12_ScreenTxt.wordWrap = true;
		// _this.NSF_12_ScreenTxt.wordWrapWidth = 500;
		// _this.NSF_12_Screen.inputEnabled = true;
		// _this.NSF_12_Screen.name = "NSF-12";
		// _this.NSF_12_Screen.input.useHandCursor = true;
		// _this.NSF_12_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			console.log("int 12....")
		// 			_this.state.start('preloader_nsf_12',true,false);
		// 		}
		// 	},_this);
		// },_this);

		// _this.NSF_13_Screen = _this.add.sprite(100,720,'NSF_13_Screen');
		// _this.bgGraphicFr13 = this.add.graphics(210,775);
		// _this.bgGraphicFr13.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicFr13.beginFill(0x493A19, 1);
		// _this.bgGraphicFr13.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicFr13.boundsPadding = 0;
		// _this.NSF_13_ScreenTxt = this.add.text(225, 792, ' \n '+window.selctedLang.NSF_13_Screen+' \n ');
		// _this.NSF_13_ScreenTxt.anchor.setTo(0.5);
		// _this.NSF_13_ScreenTxt.align = 'center';
		// _this.NSF_13_ScreenTxt.font = 'gradefont';
		// _this.NSF_13_ScreenTxt.fontSize = 20;
		// _this.NSF_13_ScreenTxt.fontWeight = 'normal';
		// _this.NSF_13_ScreenTxt.fill = 'white';
		// _this.NSF_13_ScreenTxt.wordWrap = true;
		// _this.NSF_13_ScreenTxt.wordWrapWidth = 500;
		// _this.NSF_13_Screen.inputEnabled = true;
		// _this.NSF_13_Screen.input.useHandCursor = true;
		// _this.NSF_13_Screen.name = "NSF-13";
		// _this.NSF_13_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_nsf_13',true,false);
		// 		}
		// 	},_this);
		// },_this);

		// _this.NSF_14_Screen = _this.add.sprite(300,720,'NSF_14_Screen');
		// _this.bgGraphicFr14 = this.add.graphics(410,775);
		// _this.bgGraphicFr14.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicFr14.beginFill(0x493A19, 1);
		// _this.bgGraphicFr14.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicFr14.boundsPadding = 0;
		// _this.NSF_14_ScreenTxt = this.add.text(425, 792, ' \n '+window.selctedLang.NSF_14_Screen+' \n ');
		// _this.NSF_14_ScreenTxt.anchor.setTo(0.5);
		// _this.NSF_14_ScreenTxt.align = 'center';
		// _this.NSF_14_ScreenTxt.font = 'gradefont';
		// _this.NSF_14_ScreenTxt.fontSize = 20;
		// _this.NSF_14_ScreenTxt.fontWeight = 'normal';
		// _this.NSF_14_ScreenTxt.fill = 'white';
		// _this.NSF_14_ScreenTxt.wordWrap = true;
		// _this.NSF_14_ScreenTxt.wordWrapWidth = 500;
		// _this.NSF_14_Screen.inputEnabled = true;
		// _this.NSF_14_Screen.input.useHandCursor = true;
		// _this.NSF_14_Screen.name = "NSF-14";
		// _this.NSF_14_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_nsf_14',true,false);
		// 		}
		// 	},_this);	
		// },_this);

		// _this.NSF_15_Screen = _this.add.sprite(500,720,'NSF_15_Screen');
		// _this.bgGraphicFr15 = this.add.graphics(610,775);
		// _this.bgGraphicFr15.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicFr15.beginFill(0x493A19, 1);
		// _this.bgGraphicFr15.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicFr15.boundsPadding = 0;
		// _this.NSF_15_ScreenTxt = this.add.text(625, 792, ' \n '+window.selctedLang.NSF_15_Screen+' \n ');
		// _this.NSF_15_ScreenTxt.anchor.setTo(0.5);
		// _this.NSF_15_ScreenTxt.align = 'center';
		// _this.NSF_15_ScreenTxt.font = 'gradefont';
		// _this.NSF_15_ScreenTxt.fontSize = 20;
		// _this.NSF_15_ScreenTxt.fontWeight = 'normal';
		// _this.NSF_15_ScreenTxt.fill = 'white';
		// _this.NSF_15_ScreenTxt.wordWrap = true;
		// _this.NSF_15_ScreenTxt.wordWrapWidth = 500;
		// _this.NSF_15_Screen.inputEnabled = true;
		// _this.NSF_15_Screen.input.useHandCursor = true;
		// _this.NSF_15_Screen.name = "NSF-15";
		// _this.NSF_15_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_nsf_15',true,false);
		// 		}
		// 	},_this);
		// },_this);

		_this.grade7FractionsGroup.add(_this.topicTxtBg);
		_this.grade7FractionsGroup.add(_this.topicTitleText);
		_this.grade7FractionsGroup.add(_this.topicBg);
		_this.grade7FractionsGroup.add(_this.NSF_CUIS_Screen);
		_this.grade7FractionsGroup.add(_this.bgGraphicFr1);
		_this.grade7FractionsGroup.add(_this.NSF_CUIS_ScreenTxt);
		_this.grade7FractionsGroup.add(_this.NSF_ADSB_Screen);
		_this.grade7FractionsGroup.add(_this.bgGraphicFr2);
		_this.grade7FractionsGroup.add(_this.NSF_ADSB_ScreenTxt);
		_this.grade7FractionsGroup.add(_this.NSF_UNLAD_Screen);
		_this.grade7FractionsGroup.add(_this.bgGraphicFr3);
		_this.grade7FractionsGroup.add(_this.NSF_UNLAD_ScreenTxt);
		_this.grade7FractionsGroup.add(_this.NSF_UNLSB_Screen);
		_this.grade7FractionsGroup.add(_this.bgGraphicFr4);
		_this.grade7FractionsGroup.add(_this.NSF_UNLSB_ScreenTxt);
		_this.grade7FractionsGroup.add(_this.NSF_MLP_1_Screen);
		_this.grade7FractionsGroup.add(_this.bgGraphicFr5);
		_this.grade7FractionsGroup.add(_this.NSF_MLP_1_ScreenTxt);
		_this.grade7FractionsGroup.add(_this.NSF_MLP_2_Screen);
		_this.grade7FractionsGroup.add(_this.bgGraphicFr6);
		_this.grade7FractionsGroup.add(_this.NSF_MLP_2_ScreenTxt);
		_this.grade7FractionsGroup.add(_this.NSF_MLP_3_Screen);
		_this.grade7FractionsGroup.add(_this.bgGraphicFr7);
		_this.grade7FractionsGroup.add(_this.NSF_MLP_3_ScreenTxt);
		_this.grade7FractionsGroup.add(_this.NSF_DWF_Screen);
		_this.grade7FractionsGroup.add(_this.bgGraphicFr8);
		_this.grade7FractionsGroup.add(_this.NSF_DWF_ScreenTxt);
		_this.grade7FractionsGroup.add(_this.NSF_DFW_Screen);
		_this.grade7FractionsGroup.add(_this.bgGraphicFr9);
		_this.grade7FractionsGroup.add(_this.NSF_DFW_ScreenTxt);
		_this.grade7FractionsGroup.add(_this.NSF_DFF_Screen);
		_this.grade7FractionsGroup.add(_this.bgGraphicFr10);
		_this.grade7FractionsGroup.add(_this.NSF_DFF_ScreenTxt);
		// _this.grade7FractionsGroup.add(_this.NSF_11_Screen);
		// _this.grade7FractionsGroup.add(_this.bgGraphicFr11);
		// _this.grade7FractionsGroup.add(_this.NSF_11_ScreenTxt);
		// _this.grade7FractionsGroup.add(_this.NSF_12_Screen);
		// _this.grade7FractionsGroup.add(_this.bgGraphicFr12);
		// _this.grade7FractionsGroup.add(_this.NSF_12_ScreenTxt);
		// _this.grade7FractionsGroup.add(_this.NSF_13_Screen);
		// _this.grade7FractionsGroup.add(_this.bgGraphicFr13);
		// _this.grade7FractionsGroup.add(_this.NSF_13_ScreenTxt);
		// _this.grade7FractionsGroup.add(_this.NSF_14_Screen);
		// _this.grade7FractionsGroup.add(_this.bgGraphicFr14);
		// _this.grade7FractionsGroup.add(_this.NSF_14_ScreenTxt);
		// _this.grade7FractionsGroup.add(_this.NSF_15_Screen);
		// _this.grade7FractionsGroup.add(_this.bgGraphicFr15);
		// _this.grade7FractionsGroup.add(_this.NSF_15_ScreenTxt);
	},

	addgrade7DecimalsTopic : function()
	{
		_this.topicTxtBg = _this.add.graphics(100, 60);
		_this.topicTxtBg.lineStyle(0, 0xFFFFFF, 0.8);
		_this.topicTxtBg.beginFill(0xD957A0, 1);
		_this.topicTxtBg.drawRoundedRect(0,0,170,100,10);
		_this.topicTxtBg.boundsPadding = 0;
	
		_this.topicTitleText = this.add.text(185, 85, ' \n '+window.selctedLang.decimalTitle+' \n ');
		_this.topicTitleText.anchor.setTo(0.5);
		_this.topicTitleText.align = 'center';
		_this.topicTitleText.font = 'gradefont';
		_this.topicTitleText.fontSize = 26;
		_this.topicTitleText.fontWeight = 'normal';
		_this.topicTitleText.fill = 'white';
		_this.topicTitleText.wordWrap = true;
		_this.topicTitleText.wordWrapWidth = 500;
		
		_this.topicBg = _this.add.graphics(75, 100);
		_this.topicBg.lineStyle(0, 0xFFFFFF, 0.8);
		_this.topicBg.beginFill(0xD957A0, 1);
		_this.topicBg.drawRoundedRect(0,0,805,400,30);
		_this.topicBg.boundsPadding = 0;

		_this.NSD_3A_Screen = _this.add.sprite(100,120,'NSD_1_G7Screen');
		_this.bgGraphicDec1 = this.add.graphics(210,175);
		_this.bgGraphicDec1.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicDec1.beginFill(0x493A19, 1);
		_this.bgGraphicDec1.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicDec1.boundsPadding = 0;
		_this.NSD_3A_ScreenTxt = this.add.text(225, 192, ' \n '+window.selctedLang.NSD_1_G7Screen+' \n ');
		_this.NSD_3A_ScreenTxt.anchor.setTo(0.5);
		_this.NSD_3A_ScreenTxt.align = 'center';
		_this.NSD_3A_ScreenTxt.font = 'gradefont';
		_this.NSD_3A_ScreenTxt.fontSize = 20;
		_this.NSD_3A_ScreenTxt.fontWeight = 'normal';
		_this.NSD_3A_ScreenTxt.fill = 'white';
		_this.NSD_3A_ScreenTxt.wordWrap = true;
		_this.NSD_3A_ScreenTxt.wordWrapWidth = 500;
		_this.NSD_3A_Screen.inputEnabled = true;
		_this.NSD_3A_Screen.input.useHandCursor = true;
		_this.NSD_3A_Screen.name = "NSD-3A";
		_this.NSD_3A_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_NSD_1_G7',true,false);
				}
			},_this);
		},_this);

		_this.NSD_3B_Screen = _this.add.sprite(300,120,'NSD_2_Screen');
		_this.bgGraphicDec2 = this.add.graphics(410,175);
		_this.bgGraphicDec2.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicDec2.beginFill(0x493A19, 1);
		_this.bgGraphicDec2.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicDec2.boundsPadding = 0;
		_this.NSD_3B_ScreenTxt = this.add.text(425, 192, ' \n '+window.selctedLang.NSD_2_G7Screen+' \n ');
		_this.NSD_3B_ScreenTxt.anchor.setTo(0.5);
		_this.NSD_3B_ScreenTxt.align = 'center';
		_this.NSD_3B_ScreenTxt.font = 'gradefont';
		_this.NSD_3B_ScreenTxt.fontSize = 20;
		_this.NSD_3B_ScreenTxt.fontWeight = 'normal';
		_this.NSD_3B_ScreenTxt.fill = 'white';
		_this.NSD_3B_ScreenTxt.wordWrap = true;
		_this.NSD_3B_ScreenTxt.wordWrapWidth = 500;
		_this.NSD_3B_Screen.inputEnabled = true;
		_this.NSD_3B_Screen.input.useHandCursor = true;
		_this.NSD_3B_Screen.name = "NSD-3B";
		_this.NSD_3B_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_NSD_2_G7',true,false);
				}
			},_this);
		},_this);

		_this.NSD_2A_Screen  = _this.add.sprite(500,120,'NSD_3_Screen');
		_this.bgGraphicDec3 = this.add.graphics(610,175);
		_this.bgGraphicDec3.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicDec3.beginFill(0x493A19, 1);
		_this.bgGraphicDec3.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicDec3.boundsPadding = 0;
		_this.NSD_2A_ScreenTxt = this.add.text(625, 192, ' \n '+window.selctedLang.NSD_3_G7Screen+' \n ');
		_this.NSD_2A_ScreenTxt.anchor.setTo(0.5);
		_this.NSD_2A_ScreenTxt.align = 'center';
		_this.NSD_2A_ScreenTxt.font = 'gradefont';
		_this.NSD_2A_ScreenTxt.fontSize = 20;
		_this.NSD_2A_ScreenTxt.fontWeight = 'normal';
		_this.NSD_2A_ScreenTxt.fill = 'white';
		_this.NSD_2A_ScreenTxt.wordWrap = true;
		_this.NSD_2A_ScreenTxt.wordWrapWidth = 500;
		_this.NSD_2A_Screen.inputEnabled = true;
		_this.NSD_2A_Screen.name = "NSF-2A";
		_this.NSD_2A_Screen.input.useHandCursor = true;
		_this.NSD_2A_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{					
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_NSD_3_G7',true,false);
				}
			},_this);
		},_this);

		_this.NSD_2B_Screen = _this.add.sprite(700,120,'NSD_4_Screen');
		_this.bgGraphicDec4 = this.add.graphics(810,175);
		_this.bgGraphicDec4.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicDec4.beginFill(0x493A19, 1);
		_this.bgGraphicDec4.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicDec4.boundsPadding = 0;
		_this.NSD_2B_ScreenTxt = this.add.text(825, 192, ' \n '+window.selctedLang.NSD_4_G7Screen+' \n ');
		_this.NSD_2B_ScreenTxt.anchor.setTo(0.5);
		_this.NSD_2B_ScreenTxt.align = 'center';
		_this.NSD_2B_ScreenTxt.font = 'gradefont';
		_this.NSD_2B_ScreenTxt.fontSize = 20;
		_this.NSD_2B_ScreenTxt.fontWeight = 'normal';
		_this.NSD_2B_ScreenTxt.fill = 'white';
		_this.NSD_2B_ScreenTxt.wordWrap = true;
		_this.NSD_2B_ScreenTxt.wordWrapWidth = 500;
		_this.NSD_2B_Screen.inputEnabled = true;
		_this.NSD_2B_Screen.name = "NSD-2B";
		_this.NSD_2B_Screen.input.useHandCursor = true;
		_this.NSD_2B_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_NSD_4_G7',true,false);
				}
			},_this);
		},_this);

		_this.NSD_1_Screen = _this.add.sprite(100,320,'NSD_5_Screen');
		_this.bgGraphicDec5 = this.add.graphics(210,375);
		_this.bgGraphicDec5.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicDec5.beginFill(0x493A19, 1);
		_this.bgGraphicDec5.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicDec5.boundsPadding = 0;
		_this.NSD_1_ScreenTxt = this.add.text(225, 392, ' \n '+window.selctedLang.NSD_5_G7Screen+' \n ');
		_this.NSD_1_ScreenTxt.anchor.setTo(0.5);
		_this.NSD_1_ScreenTxt.align = 'center';
		_this.NSD_1_ScreenTxt.font = 'gradefont';
		_this.NSD_1_ScreenTxt.fontSize = 20;
		_this.NSD_1_ScreenTxt.fontWeight = 'normal';
		_this.NSD_1_ScreenTxt.fill = 'white';
		_this.NSD_1_ScreenTxt.wordWrap = true;
		_this.NSD_1_ScreenTxt.wordWrapWidth = 500;
		_this.NSD_1_Screen.inputEnabled = true;
		_this.NSD_1_Screen.input.useHandCursor = true;
		_this.NSD_1_Screen.name = "NSD-1";
		_this.NSD_1_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_NSD_5_G7',true,false);
				}
			},_this);
		},_this);

		_this.NSD_6_Screen = _this.add.sprite(300,320,'NSD_6_Screen');
		_this.bgGraphicDec6 = this.add.graphics(410,375);
		_this.bgGraphicDec6.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicDec6.beginFill(0x493A19, 1);
		_this.bgGraphicDec6.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicDec6.boundsPadding = 0;
		_this.NSD_6_ScreenTxt = this.add.text(425, 392, ' \n '+window.selctedLang.NSD_6_G7Screen+' \n ');
		_this.NSD_6_ScreenTxt.anchor.setTo(0.5);
		_this.NSD_6_ScreenTxt.align = 'center';
		_this.NSD_6_ScreenTxt.font = 'gradefont';
		_this.NSD_6_ScreenTxt.fontSize = 20;
		_this.NSD_6_ScreenTxt.fontWeight = 'normal';
		_this.NSD_6_ScreenTxt.fill = 'white';
		_this.NSD_6_ScreenTxt.wordWrap = true;
		_this.NSD_6_ScreenTxt.wordWrapWidth = 500;
		_this.NSD_6_Screen.inputEnabled = true;
		_this.NSD_6_Screen.input.useHandCursor = true;
		_this.NSD_6_Screen.name = "NSD-6A";
		_this.NSD_6_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_NSD_6_G7',true,false);
				}
			},_this);	
		},_this);

		// _this.NSD_6B_Screen = _this.add.sprite(500,320,'NSD_6B_Screen');
		// _this.bgGraphicDec7 = this.add.graphics(610,375);
		// _this.bgGraphicDec7.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicDec7.beginFill(0x493A19, 1);
		// _this.bgGraphicDec7.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicDec7.boundsPadding = 0;
		// _this.NSD_6B_ScreenTxt = this.add.text(625, 392, ' \n '+window.selctedLang.NSD_6B_Screen+' \n ');
		// _this.NSD_6B_ScreenTxt.anchor.setTo(0.5);
		// _this.NSD_6B_ScreenTxt.align = 'center';
		// _this.NSD_6B_ScreenTxt.font = 'gradefont';
		// _this.NSD_6B_ScreenTxt.fontSize = 20;
		// _this.NSD_6B_ScreenTxt.fontWeight = 'normal';
		// _this.NSD_6B_ScreenTxt.fill = 'white';
		// _this.NSD_6B_ScreenTxt.wordWrap = true;
		// _this.NSD_6B_ScreenTxt.wordWrapWidth = 500;
		// _this.NSD_6B_Screen.inputEnabled = true;
		// _this.NSD_6B_Screen.input.useHandCursor = true;
		// _this.NSD_6B_Screen.name = "NSD-6B";
		// _this.NSD_6B_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_NSD_6B_G6',true,false);
		// 		}
		// 	},_this);
		// },_this);

		// _this.NSD_4A_Screen = _this.add.sprite(700,320,'NSD_4A_Screen');
		// _this.bgGraphicDec8 = this.add.graphics(810,375);
		// _this.bgGraphicDec8.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicDec8.beginFill(0x493A19, 1);
		// _this.bgGraphicDec8.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicDec8.boundsPadding = 0;
		// _this.NSD_4A_ScreenTxt = this.add.text(825, 392, ' \n '+window.selctedLang.NSD_4A_Screen+' \n ');
		// _this.NSD_4A_ScreenTxt.anchor.setTo(0.5);
		// _this.NSD_4A_ScreenTxt.align = 'center';
		// _this.NSD_4A_ScreenTxt.font = 'gradefont';
		// _this.NSD_4A_ScreenTxt.fontSize = 20;
		// _this.NSD_4A_ScreenTxt.fontWeight = 'normal';
		// _this.NSD_4A_ScreenTxt.fill = 'white';
		// _this.NSD_4A_ScreenTxt.wordWrap = true;
		// _this.NSD_4A_ScreenTxt.wordWrapWidth = 500;
		// _this.NSD_4A_Screen.inputEnabled = true;
		// _this.NSD_4A_Screen.name = "NSD-4A";
		// _this.NSD_4A_Screen.input.useHandCursor = true;
		// _this.NSD_4A_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_NSD_4A_G6',true,false);
		// 		}
		// 	},_this);
		// },_this);

		// _this.NSD_4B_Screen = _this.add.sprite(100,520,'NSD_4B_Screen');
		// _this.bgGraphicDec9 = this.add.graphics(210,575);
		// _this.bgGraphicDec9.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicDec9.beginFill(0x493A19, 1);
		// _this.bgGraphicDec9.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicDec9.boundsPadding = 0;
		// _this.NSD_4B_ScreenTxt = this.add.text(225, 592, ' \n '+window.selctedLang.NSD_4B_Screen+' \n ');
		// _this.NSD_4B_ScreenTxt.anchor.setTo(0.5);
		// _this.NSD_4B_ScreenTxt.align = 'center';
		// _this.NSD_4B_ScreenTxt.font = 'gradefont';
		// _this.NSD_4B_ScreenTxt.fontSize = 20;
		// _this.NSD_4B_ScreenTxt.fontWeight = 'normal';
		// _this.NSD_4B_ScreenTxt.fill = 'white';
		// _this.NSD_4B_ScreenTxt.wordWrap = true;
		// _this.NSD_4B_ScreenTxt.wordWrapWidth = 500;
		// _this.NSD_4B_Screen.inputEnabled = true;
		// _this.NSD_4B_Screen.input.useHandCursor = true;
		// _this.NSD_4B_Screen.name = "NSD-4B";
		// _this.NSD_4B_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_NSD_4B_G6',true,false);
		// 		}
		// 	},_this);
		// },_this);

		// _this.NSD_4E_Screen = _this.add.sprite(300,520,'NSD_4E_Screen');
		// _this.bgGraphicDec10 = this.add.graphics(410,575);
		// _this.bgGraphicDec10.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicDec10.beginFill(0x493A19, 1);
		// _this.bgGraphicDec10.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicDec10.boundsPadding = 0;
		// _this.NSD_4E_ScreenTxt = this.add.text(425, 592, ' \n '+window.selctedLang.NSD_4E_Screen+' \n ');
		// _this.NSD_4E_ScreenTxt.anchor.setTo(0.5);
		// _this.NSD_4E_ScreenTxt.align = 'center';
		// _this.NSD_4E_ScreenTxt.font = 'gradefont';
		// _this.NSD_4E_ScreenTxt.fontSize = 20;
		// _this.NSD_4E_ScreenTxt.fontWeight = 'normal';
		// _this.NSD_4E_ScreenTxt.fill = 'white';
		// _this.NSD_4E_ScreenTxt.wordWrap = true;
		// _this.NSD_4E_ScreenTxt.wordWrapWidth = 500;
		// _this.NSD_4E_Screen.inputEnabled = true;
		// _this.NSD_4E_Screen.input.useHandCursor = true;
		// _this.NSD_4E_Screen.name = "NSD-4E";
		// _this.NSD_4E_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_NSD_4E_G6',true,false);
		// 		}
		// 	},_this);	
		// },_this);

		// _this.NSD_4C_Screen = _this.add.sprite(500,520,'NSD_4C_Screen');
		// _this.bgGraphicDec11 = this.add.graphics(610,575);
		// _this.bgGraphicDec11.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicDec11.beginFill(0x493A19, 1);
		// _this.bgGraphicDec11.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicDec11.boundsPadding = 0;
		// _this.NSD_4C_ScreenTxt = this.add.text(625, 592, ' \n '+window.selctedLang.NSD_4C_Screen+' \n ');
		// _this.NSD_4C_ScreenTxt.anchor.setTo(0.5);
		// _this.NSD_4C_ScreenTxt.align = 'center';
		// _this.NSD_4C_ScreenTxt.font = 'gradefont';
		// _this.NSD_4C_ScreenTxt.fontSize = 20;
		// _this.NSD_4C_ScreenTxt.fontWeight = 'normal';
		// _this.NSD_4C_ScreenTxt.fill = 'white';
		// _this.NSD_4C_ScreenTxt.wordWrap = true;
		// _this.NSD_4C_ScreenTxt.wordWrapWidth = 500;
		// _this.NSD_4C_Screen.inputEnabled = true;
		// _this.NSD_4C_Screen.input.useHandCursor = true;
		// _this.NSD_4C_Screen.name = "NSD-4C";
		// _this.NSD_4C_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_NSD_4C_G6',true,false);
		// 		}
		// 	},_this);
		// },_this);

		// _this.NSD_4D_Screen = _this.add.sprite(700,520,'NSD_4D_Screen');
		// _this.bgGraphicDec12 = this.add.graphics(810,575);
		// _this.bgGraphicDec12.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicDec12.beginFill(0x493A19, 1);
		// _this.bgGraphicDec12.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicDec12.boundsPadding = 0;
		// _this.NSD_4D_ScreenTxt = this.add.text(825, 592, ' \n '+window.selctedLang.NSD_4D_Screen+' \n ');
		// _this.NSD_4D_ScreenTxt.anchor.setTo(0.5);
		// _this.NSD_4D_ScreenTxt.align = 'center';
		// _this.NSD_4D_ScreenTxt.font = 'gradefont';
		// _this.NSD_4D_ScreenTxt.fontSize = 20;
		// _this.NSD_4D_ScreenTxt.fontWeight = 'normal';
		// _this.NSD_4D_ScreenTxt.fill = 'white';
		// _this.NSD_4D_ScreenTxt.wordWrap = true;
		// _this.NSD_4D_ScreenTxt.wordWrapWidth = 500;
		// _this.NSD_4D_Screen.inputEnabled = true;
		// _this.NSD_4D_Screen.name = "NSD-4D";
		// _this.NSD_4D_Screen.input.useHandCursor = true;
		// _this.NSD_4D_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_NSD_4D_G6',true,false);
		// 		}
		// 	},_this);
		// },_this);

		// _this.NSD_5A_Screen = _this.add.sprite(100,720,'NSD_5A_Screen');
		// _this.bgGraphicDec13 = this.add.graphics(210,775);
		// _this.bgGraphicDec13.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicDec13.beginFill(0x493A19, 1);
		// _this.bgGraphicDec13.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicDec13.boundsPadding = 0;
		// _this.NSD_5A_ScreenTxt = this.add.text(225, 792, ' \n '+window.selctedLang.NSD_5A_Screen+' \n ');
		// _this.NSD_5A_ScreenTxt.anchor.setTo(0.5);
		// _this.NSD_5A_ScreenTxt.align = 'center';
		// _this.NSD_5A_ScreenTxt.font = 'gradefont';
		// _this.NSD_5A_ScreenTxt.fontSize = 20;
		// _this.NSD_5A_ScreenTxt.fontWeight = 'normal';
		// _this.NSD_5A_ScreenTxt.fill = 'white';
		// _this.NSD_5A_ScreenTxt.wordWrap = true;
		// _this.NSD_5A_ScreenTxt.wordWrapWidth = 500;
		// _this.NSD_5A_Screen.inputEnabled = true;
		// _this.NSD_5A_Screen.input.useHandCursor = true;
		// _this.NSD_5A_Screen.name = "NSD-5A";
		// _this.NSD_5A_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_NSD_5A_G6',true,false);
		// 		}
		// 	},_this);
		// },_this);

		// _this.NSD_5B_Screen = _this.add.sprite(300,720,'NSD_5B_Screen');
		// _this.bgGraphicDec14 = this.add.graphics(410,775);
		// _this.bgGraphicDec14.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicDec14.beginFill(0x493A19, 1);
		// _this.bgGraphicDec14.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicDec14.boundsPadding = 0;
		// _this.NSD_5B_ScreenTxt = this.add.text(425, 792, ' \n '+window.selctedLang.NSD_5B_Screen+' \n ');
		// _this.NSD_5B_ScreenTxt.anchor.setTo(0.5);
		// _this.NSD_5B_ScreenTxt.align = 'center';
		// _this.NSD_5B_ScreenTxt.font = 'gradefont';
		// _this.NSD_5B_ScreenTxt.fontSize = 20;
		// _this.NSD_5B_ScreenTxt.fontWeight = 'normal';
		// _this.NSD_5B_ScreenTxt.fill = 'white';
		// _this.NSD_5B_ScreenTxt.wordWrap = true;
		// _this.NSD_5B_ScreenTxt.wordWrapWidth = 500;
		// _this.NSD_5B_Screen.inputEnabled = true;
		// _this.NSD_5B_Screen.input.useHandCursor = true;
		// _this.NSD_5B_Screen.name = "NSD-5B";
		// _this.NSD_5B_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_NSD_5B_G6',true,false);
		// 		}
		// 	},_this);
		// },_this);

		_this.grade7DecimalsGroup.add(_this.topicTxtBg);
		_this.grade7DecimalsGroup.add(_this.topicTitleText);
		_this.grade7DecimalsGroup.add(_this.topicBg);
		_this.grade7DecimalsGroup.add(_this.NSD_2A_Screen);
		_this.grade7DecimalsGroup.add(_this.bgGraphicDec3);
		_this.grade7DecimalsGroup.add(_this.NSD_2A_ScreenTxt);
		_this.grade7DecimalsGroup.add(_this.NSD_2B_Screen);
		_this.grade7DecimalsGroup.add(_this.bgGraphicDec4);
		_this.grade7DecimalsGroup.add(_this.NSD_2B_ScreenTxt);
		_this.grade7DecimalsGroup.add(_this.NSD_3A_Screen);
		_this.grade7DecimalsGroup.add(_this.bgGraphicDec1);
		_this.grade7DecimalsGroup.add(_this.NSD_3A_ScreenTxt);

		_this.grade7DecimalsGroup.add(_this.NSD_3B_Screen);
		_this.grade7DecimalsGroup.add(_this.bgGraphicDec2);
		_this.grade7DecimalsGroup.add(_this.NSD_3B_ScreenTxt);

		_this.grade7DecimalsGroup.add(_this.NSD_1_Screen);
		_this.grade7DecimalsGroup.add(_this.bgGraphicDec5);
		_this.grade7DecimalsGroup.add(_this.NSD_1_ScreenTxt);

		_this.grade7DecimalsGroup.add(_this.NSD_6_Screen);
		_this.grade7DecimalsGroup.add(_this.bgGraphicDec6);
		_this.grade7DecimalsGroup.add(_this.NSD_6_ScreenTxt);
		// _this.grade7DecimalsGroup.add(_this.NSD_6B_Screen);
		// _this.grade7DecimalsGroup.add(_this.bgGraphicDec7);
		// _this.grade7DecimalsGroup.add(_this.NSD_6B_ScreenTxt);
		// _this.grade7DecimalsGroup.add(_this.NSD_4A_Screen);
		// _this.grade7DecimalsGroup.add(_this.bgGraphicDec8);
		// _this.grade7DecimalsGroup.add(_this.NSD_4A_ScreenTxt);

		// _this.grade7DecimalsGroup.add(_this.NSD_4B_Screen);
		// _this.grade7DecimalsGroup.add(_this.bgGraphicDec9);
		// _this.grade7DecimalsGroup.add(_this.NSD_4B_ScreenTxt);
		// _this.grade7DecimalsGroup.add(_this.NSD_4E_Screen);
		// _this.grade7DecimalsGroup.add(_this.bgGraphicDec10);
		// _this.grade7DecimalsGroup.add(_this.NSD_4E_ScreenTxt);
		// _this.grade7DecimalsGroup.add(_this.NSD_4C_Screen);
		// _this.grade7DecimalsGroup.add(_this.bgGraphicDec11);
		// _this.grade7DecimalsGroup.add(_this.NSD_4C_ScreenTxt);
		// _this.grade7DecimalsGroup.add(_this.NSD_4D_Screen);
		// _this.grade7DecimalsGroup.add(_this.bgGraphicDec12);
		// _this.grade7DecimalsGroup.add(_this.NSD_4D_ScreenTxt);
		
		// _this.grade7DecimalsGroup.add(_this.NSD_5A_Screen);
		// _this.grade7DecimalsGroup.add(_this.bgGraphicDec13);
		// _this.grade7DecimalsGroup.add(_this.NSD_5A_ScreenTxt);
		// _this.grade7DecimalsGroup.add(_this.NSD_5B_Screen);
		// _this.grade7DecimalsGroup.add(_this.bgGraphicDec14);
		// _this.grade7DecimalsGroup.add(_this.NSD_5B_ScreenTxt);
		
	},

	// addgrade6RatioProportionTopic : function(){

	// 	_this.topicTxtBg = _this.add.graphics(100, 60);
	// 	_this.topicTxtBg.lineStyle(0, 0xFFFFFF, 0.8);
	// 	_this.topicTxtBg.beginFill(0xD957A0, 1);
	// 	_this.topicTxtBg.drawRoundedRect(0,0,320,100,10);
	// 	_this.topicTxtBg.boundsPadding = 0;
	
	// 	_this.topicTitleText = this.add.text(260, 85, ' \n '+window.selctedLang.ratioandproportionTitle+' \n ');
	// 	_this.topicTitleText.anchor.setTo(0.5);
	// 	_this.topicTitleText.align = 'center';
	// 	_this.topicTitleText.font = 'gradefont';
	// 	_this.topicTitleText.fontSize = 26;
	// 	_this.topicTitleText.fontWeight = 'normal';
	// 	_this.topicTitleText.fill = 'white';
	// 	_this.topicTitleText.wordWrap = true;
	// 	_this.topicTitleText.wordWrapWidth = 500;
		
	// 	_this.topicBg = _this.add.graphics(75, 100);
	// 	_this.topicBg.lineStyle(0, 0xFFFFFF, 0.8);
	// 	_this.topicBg.beginFill(0xD957A0, 1);
	// 	_this.topicBg.drawRoundedRect(0,0,805,200,30);
	// 	_this.topicBg.boundsPadding = 0;

	// 	_this.NSRP_1_Screen = _this.add.sprite(100,120,'NSRP_1_Screen');
	// 	_this.bgGraphicRatio1 = this.add.graphics(210,175);
	// 	_this.bgGraphicRatio1.lineStyle(0, 0xFFFFFF, 0.8);
	// 	_this.bgGraphicRatio1.beginFill(0x493A19, 1);
	// 	_this.bgGraphicRatio1.drawRoundedRect(0,0,30,30,10);
	// 	_this.bgGraphicRatio1.boundsPadding = 0;
	// 	_this.NSRP_1_ScreenTxt = this.add.text(225, 192, ' \n '+window.selctedLang.NSRP_1_Screen+' \n ');
	// 	_this.NSRP_1_ScreenTxt.anchor.setTo(0.5);
	// 	_this.NSRP_1_ScreenTxt.align = 'center';
	// 	_this.NSRP_1_ScreenTxt.font = 'gradefont';
	// 	_this.NSRP_1_ScreenTxt.fontSize = 20;
	// 	_this.NSRP_1_ScreenTxt.fontWeight = 'normal';
	// 	_this.NSRP_1_ScreenTxt.fill = 'white';
	// 	_this.NSRP_1_ScreenTxt.wordWrap = true;
	// 	_this.NSRP_1_ScreenTxt.wordWrapWidth = 500;
	// 	_this.NSRP_1_Screen.inputEnabled = true;
	// 	_this.NSRP_1_Screen.name = "NSRP-1";
	// 	_this.NSRP_1_Screen.input.useHandCursor = true;
	// 	_this.NSRP_1_Screen.events.onInputDown.add(function(target){
	// 		_this.time.events.add(300, function(){
	// 			if(_this.tap)
	// 			{
	// 				_this.time.events.removeAll();
	// 				target.events.onInputDown.removeAll();
	// 				_this.clickSound = _this.add.audio('ClickSound');
	// 				_this.clickSound.play();
	// 				_this.state.start('preloader_NSRP_01_G6',true,false);
	// 			}
	// 		},_this);
	// 	},_this);

	// 	_this.NSRP_2_Screen = _this.add.sprite(300,120,'NSRP_2_Screen');
	// 	_this.bgGraphicRatio2 = this.add.graphics(410,175);
	// 	_this.bgGraphicRatio2.lineStyle(0, 0xFFFFFF, 0.8);
	// 	_this.bgGraphicRatio2.beginFill(0x493A19, 1);
	// 	_this.bgGraphicRatio2.drawRoundedRect(0,0,30,30,10);
	// 	_this.bgGraphicRatio2.boundsPadding = 0;
	// 	_this.NSRP_2_ScreenTxt = this.add.text(425, 192, ' \n '+window.selctedLang.NSRP_2_Screen+' \n ');
	// 	_this.NSRP_2_ScreenTxt.anchor.setTo(0.5);
	// 	_this.NSRP_2_ScreenTxt.align = 'center';
	// 	_this.NSRP_2_ScreenTxt.font = 'gradefont';
	// 	_this.NSRP_2_ScreenTxt.fontSize = 20;
	// 	_this.NSRP_2_ScreenTxt.fontWeight = 'normal';
	// 	_this.NSRP_2_ScreenTxt.fill = 'white';
	// 	_this.NSRP_2_ScreenTxt.wordWrap = true;
	// 	_this.NSRP_2_ScreenTxt.wordWrapWidth = 500;
	// 	_this.NSRP_2_Screen.inputEnabled = true;
	// 	_this.NSRP_2_Screen.input.useHandCursor = true;
	// 	_this.NSRP_2_Screen.name = "NSRP-2";
	// 	_this.NSRP_2_Screen.events.onInputDown.add(function(target){
	// 		_this.time.events.add(300, function(){
	// 			if(_this.tap)
	// 			{
	// 				_this.time.events.removeAll();
	// 				target.events.onInputDown.removeAll();
	// 				_this.clickSound = _this.add.audio('ClickSound');
	// 				_this.clickSound.play();
	// 				_this.state.start('preloader_NSRP_02_G6',true,false);
	// 			}
	// 		},_this);
	// 	},_this);

	// 	_this.NSRP_3_Screen = _this.add.sprite(500,120,'NSRP_3_Screen');
	// 	_this.bgGraphicRatio3 = this.add.graphics(610,175);
	// 	_this.bgGraphicRatio3.lineStyle(0, 0xFFFFFF, 0.8);
	// 	_this.bgGraphicRatio3.beginFill(0x493A19, 1);
	// 	_this.bgGraphicRatio3.drawRoundedRect(0,0,30,30,10);
	// 	_this.bgGraphicRatio3.boundsPadding = 0;
	// 	_this.NSRP_3_ScreenTxt = this.add.text(625, 192, ' \n '+window.selctedLang.NSRP_3_Screen+' \n ');
	// 	_this.NSRP_3_ScreenTxt.anchor.setTo(0.5);
	// 	_this.NSRP_3_ScreenTxt.align = 'center';
	// 	_this.NSRP_3_ScreenTxt.font = 'gradefont';
	// 	_this.NSRP_3_ScreenTxt.fontSize = 20;
	// 	_this.NSRP_3_ScreenTxt.fontWeight = 'normal';
	// 	_this.NSRP_3_ScreenTxt.fill = 'white';
	// 	_this.NSRP_3_ScreenTxt.wordWrap = true;
	// 	_this.NSRP_3_ScreenTxt.wordWrapWidth = 500;
	// 	_this.NSRP_3_Screen.inputEnabled = true;
	// 	_this.NSRP_3_Screen.name = "NSRP-3";
	// 	_this.NSRP_3_Screen.input.useHandCursor = true;
	// 	_this.NSRP_3_Screen.events.onInputDown.add(function(target){
	// 		_this.time.events.add(300, function(){
	// 			if(_this.tap)
	// 			{					
	// 				_this.time.events.removeAll();
	// 				target.events.onInputDown.removeAll();
	// 				_this.clickSound = _this.add.audio('ClickSound');
	// 				_this.clickSound.play();
	// 				_this.state.start('preloader_NSRP_03_G6',true,false);
	// 			}
	// 		},_this);
	// 	},_this);

	// 	_this.grade6RatioandProportionGroup.add(_this.topicTxtBg);
	// 	_this.grade6RatioandProportionGroup.add(_this.topicTitleText);
	// 	_this.grade6RatioandProportionGroup.add(_this.topicBg);
	// 	_this.grade6RatioandProportionGroup.add(_this.NSRP_1_Screen);
	// 	_this.grade6RatioandProportionGroup.add(_this.bgGraphicRatio1);
	// 	_this.grade6RatioandProportionGroup.add(_this.NSRP_1_ScreenTxt);
	// 	_this.grade6RatioandProportionGroup.add(_this.NSRP_2_Screen);
	// 	_this.grade6RatioandProportionGroup.add(_this.bgGraphicRatio2);
	// 	_this.grade6RatioandProportionGroup.add(_this.NSRP_2_ScreenTxt);
	// 	_this.grade6RatioandProportionGroup.add(_this.NSRP_3_Screen);
	// 	_this.grade6RatioandProportionGroup.add(_this.bgGraphicRatio3);
	// 	_this.grade6RatioandProportionGroup.add(_this.NSRP_3_ScreenTxt);
	// },
	
	addgrade7NumbersTopic:function()
	{
		_this.topicTxtBg = _this.add.graphics(100, 60);
		_this.topicTxtBg.lineStyle(0, 0xFFFFFF, 0.8);
		_this.topicTxtBg.beginFill(0xD957A0, 1);
		_this.topicTxtBg.drawRoundedRect(0,0,170,100,10);
		_this.topicTxtBg.boundsPadding = 0;
		
		_this.topicTitleText = this.add.text(185, 85, ' \n '+window.selctedLang.numbersTitle+' \n ');
		_this.topicTitleText.anchor.setTo(0.5);
		_this.topicTitleText.align = 'center';
		_this.topicTitleText.font = 'gradefont';
		_this.topicTitleText.fontSize = 26;
		_this.topicTitleText.fontWeight = 'normal';
		_this.topicTitleText.fill = 'white';
		_this.topicTitleText.wordWrap = true;
		_this.topicTitleText.wordWrapWidth = 500;
		
		_this.topicBg = _this.add.graphics(75, 100);
		_this.topicBg.lineStyle(0, 0xFFFFFF, 0.8);
		_this.topicBg.beginFill(0xD957A0, 1);
		_this.topicBg.drawRoundedRect(0,0,805,400,30);
		_this.topicBg.boundsPadding = 0;
		
		// _this.OE_1_Screen = _this.add.sprite(100,120,'OE_1_Screen');
		// _this.bgGraphicNum1 = this.add.graphics(210,175);
		// _this.bgGraphicNum1.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicNum1.beginFill(0x493A19, 1);
		// _this.bgGraphicNum1.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicNum1.boundsPadding = 0;
		// _this.OE_1_ScreenTxt = this.add.text(225, 192, ' \n '+window.selctedLang.OE_1_Screen+' \n ');
		// _this.OE_1_ScreenTxt.anchor.setTo(0.5);
		// _this.OE_1_ScreenTxt.align = 'center';
		// _this.OE_1_ScreenTxt.font = 'gradefont';
		// _this.OE_1_ScreenTxt.fontSize = 20;
		// _this.OE_1_ScreenTxt.fontWeight = 'normal';
		// _this.OE_1_ScreenTxt.fill = 'white';
		// _this.OE_1_ScreenTxt.wordWrap = true;
		// _this.OE_1_ScreenTxt.wordWrapWidth = 500;
		// //_this.OE_1_Screen.inputEnabled = true;
		// _this.OE_1_Screen.name = "Numbers OE-1";
		// //_this.OE_1_Screen.input.useHandCursor = true;
		// _this.OE_1_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_oe_1a',true,false);
		// 		}
		// 	},_this);
		// },_this);
		
		// _this.FM_1_Screen = _this.add.sprite(300,120,'FM_1_Screen');
		// _this.bgGraphicNum2 = this.add.graphics(410,175);
		// _this.bgGraphicNum2.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicNum2.beginFill(0x493A19, 1);
		// _this.bgGraphicNum2.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicNum2.boundsPadding = 0;
		// _this.FM_1_ScreenTxt = this.add.text(425, 192, ' \n '+window.selctedLang.FM_1_Screen+' \n ');
		// _this.FM_1_ScreenTxt.anchor.setTo(0.5);
		// _this.FM_1_ScreenTxt.align = 'center';
		// _this.FM_1_ScreenTxt.font = 'gradefont';
		// _this.FM_1_ScreenTxt.fontSize = 20;
		// _this.FM_1_ScreenTxt.fontWeight = 'normal';
		// _this.FM_1_ScreenTxt.fill = 'white';
		// _this.FM_1_ScreenTxt.wordWrap = true;
		// _this.FM_1_ScreenTxt.wordWrapWidth = 500;
		// //_this.FM_1_Screen.inputEnabled = true;
		// //_this.FM_1_Screen.input.useHandCursor = true;
		// _this.FM_1_Screen.name = "Numbers FM-1";
		// _this.FM_1_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_fm_1',true,false);
		// 		}
		// 	},_this);
		// },_this);

		// _this.HCF_1_Screen = _this.add.sprite(500,120,'HCF_1_Screen');
		// _this.bgGraphicNum3 = this.add.graphics(610,175);
		// _this.bgGraphicNum3.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicNum3.beginFill(0x493A19, 1);
		// _this.bgGraphicNum3.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicNum3.boundsPadding = 0;
		// _this.HCF_1_ScreenTxt = this.add.text(625, 192, ' \n '+window.selctedLang.HCF_1_Screen+' \n ');
		// _this.HCF_1_ScreenTxt.anchor.setTo(0.5);
		// _this.HCF_1_ScreenTxt.align = 'center';
		// _this.HCF_1_ScreenTxt.font = 'gradefont';
		// _this.HCF_1_ScreenTxt.fontSize = 20;
		// _this.HCF_1_ScreenTxt.fontWeight = 'normal';
		// _this.HCF_1_ScreenTxt.fill = 'white';
		// _this.HCF_1_ScreenTxt.wordWrap = true;
		// _this.HCF_1_ScreenTxt.wordWrapWidth = 500;
		// _this.HCF_1_Screen.inputEnabled = true;
		// _this.HCF_1_Screen.name = "Numbers HCF-1";
		// _this.HCF_1_Screen.input.useHandCursor = true;
		// _this.HCF_1_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{					
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_hcf_1',true,false);
		// 		}
		// 	},_this);
		// },_this);
		
		// _this.PRM_1_Screen = _this.add.sprite(700,120,'PRM_1_Screen');
		// _this.bgGraphicNum4 = this.add.graphics(810,175);
		// _this.bgGraphicNum4.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicNum4.beginFill(0x493A19, 1);
		// _this.bgGraphicNum4.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicNum4.boundsPadding = 0;
		// _this.PRM_1_ScreenTxt = this.add.text(825, 192, ' \n '+window.selctedLang.PRM_1_Screen+' \n ');
		// _this.PRM_1_ScreenTxt.anchor.setTo(0.5);
		// _this.PRM_1_ScreenTxt.align = 'center';
		// _this.PRM_1_ScreenTxt.font = 'gradefont';
		// _this.PRM_1_ScreenTxt.fontSize = 20;
		// _this.PRM_1_ScreenTxt.fontWeight = 'normal';
		// _this.PRM_1_ScreenTxt.fill = 'white';
		// _this.PRM_1_ScreenTxt.wordWrap = true;
		// _this.PRM_1_ScreenTxt.wordWrapWidth = 500;
		// _this.PRM_1_Screen.inputEnabled = true;
		// _this.PRM_1_Screen.name = "Numbers PRM-1";
		// _this.PRM_1_Screen.input.useHandCursor = true;
		// _this.PRM_1_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_prm_1',true,false);
		// 		}
		// 	},_this);
		// },_this);


		// _this.FM_3_Screen = _this.add.sprite(100,320,'FM_3_Screen');
		// _this.bgGraphicNum5 = this.add.graphics(210,375);
		// _this.bgGraphicNum5.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicNum5.beginFill(0x493A19, 1);
		// _this.bgGraphicNum5.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicNum5.boundsPadding = 0;
		// _this.FM_3_ScreenTxt = this.add.text(225, 392, ' \n '+window.selctedLang.FM_3_Screen+' \n ');
		// _this.FM_3_ScreenTxt.anchor.setTo(0.5);
		// _this.FM_3_ScreenTxt.align = 'center';
		// _this.FM_3_ScreenTxt.font = 'gradefont';
		// _this.FM_3_ScreenTxt.fontSize = 20;
		// _this.FM_3_ScreenTxt.fontWeight = 'normal';
		// _this.FM_3_ScreenTxt.fill = 'white';
		// _this.FM_3_ScreenTxt.wordWrap = true;
		// _this.FM_3_ScreenTxt.wordWrapWidth = 500;
		// _this.FM_3_Screen.inputEnabled = true;
		// _this.FM_3_Screen.input.useHandCursor = true;
		// _this.FM_3_Screen.name = "Numbers FM-3";
		// _this.FM_3_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_fm_3',true,false);
		// 		}
		// 	},_this);
		// },_this);

		// _this.FM_4_Screen = _this.add.sprite(300,320,'FM_4_Screen');
		// _this.bgGraphicNum6 = this.add.graphics(410,375);
		// _this.bgGraphicNum6.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicNum6.beginFill(0x493A19, 1);
		// _this.bgGraphicNum6.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicNum6.boundsPadding = 0;
		// _this.FM_4_ScreenTxt = this.add.text(425, 392, ' \n '+window.selctedLang.FM_4_Screen+' \n ');
		// _this.FM_4_ScreenTxt.anchor.setTo(0.5);
		// _this.FM_4_ScreenTxt.align = 'center';
		// _this.FM_4_ScreenTxt.font = 'gradefont';
		// _this.FM_4_ScreenTxt.fontSize = 20;
		// _this.FM_4_ScreenTxt.fontWeight = 'normal';
		// _this.FM_4_ScreenTxt.fill = 'white';
		// _this.FM_4_ScreenTxt.wordWrap = true;
		// _this.FM_4_ScreenTxt.wordWrapWidth = 500;
		// _this.FM_4_Screen.inputEnabled = true;
		// _this.FM_4_Screen.name = "Numbers FM-4";
		// _this.FM_4_Screen.input.useHandCursor = true;
		// _this.FM_4_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{					
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_fm_4a',true,false);
		// 		}
		// 	},_this);
		// },_this);
		
		// _this.LCM_1_Screen = _this.add.sprite(500,320,'LCM_1_Screen');
		// _this.bgGraphicNum7 = this.add.graphics(610,375);
		// _this.bgGraphicNum7.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicNum7.beginFill(0x493A19, 1);
		// _this.bgGraphicNum7.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicNum7.boundsPadding = 0;
		// _this.LCM_1_ScreenTxt = this.add.text(625, 392, ' \n '+window.selctedLang.LCM_1_Screen+' \n ');
		// _this.LCM_1_ScreenTxt.anchor.setTo(0.5);
		// _this.LCM_1_ScreenTxt.align = 'center';
		// _this.LCM_1_ScreenTxt.font = 'gradefont';
		// _this.LCM_1_ScreenTxt.fontSize = 20;
		// _this.LCM_1_ScreenTxt.fontWeight = 'normal';
		// _this.LCM_1_ScreenTxt.fill = 'white';
		// _this.LCM_1_ScreenTxt.wordWrap = true;
		// _this.LCM_1_ScreenTxt.wordWrapWidth = 500;
		// _this.LCM_1_Screen.inputEnabled = true;
		// _this.LCM_1_Screen.name = "Numbers LCM-1";
		// _this.LCM_1_Screen.input.useHandCursor = true;
		// _this.LCM_1_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_lcm_1',true,false);
		// 		}
		// 	},_this);
		// },_this);

		_this.grade7NumbersGroup.add(_this.topicTxtBg);
		_this.grade7NumbersGroup.add(_this.topicTitleText);
		_this.grade7NumbersGroup.add(_this.topicBg);
		// _this.grade7NumbersGroup.add(_this.OE_1_Screen);
		// _this.grade7NumbersGroup.add(_this.bgGraphicNum1);
		// _this.grade7NumbersGroup.add(_this.OE_1_ScreenTxt);
		// _this.grade7NumbersGroup.add(_this.FM_1_Screen);
		// _this.grade7NumbersGroup.add(_this.bgGraphicNum2);
		// _this.grade7NumbersGroup.add(_this.FM_1_ScreenTxt);

		// _this.grade6NumbersGroup.add(_this.HCF_1_Screen);
		// _this.grade6NumbersGroup.add(_this.bgGraphicNum3);
		// _this.grade6NumbersGroup.add(_this.HCF_1_ScreenTxt);
		// _this.grade6NumbersGroup.add(_this.PRM_1_Screen);
		// _this.grade6NumbersGroup.add(_this.bgGraphicNum4);
		// _this.grade6NumbersGroup.add(_this.PRM_1_ScreenTxt);
		// _this.grade6NumbersGroup.add(_this.FM_3_Screen);
		// _this.grade6NumbersGroup.add(_this.bgGraphicNum5);
		// _this.grade6NumbersGroup.add(_this.FM_3_ScreenTxt);
		// _this.grade6NumbersGroup.add(_this.FM_4_Screen);
		// _this.grade6NumbersGroup.add(_this.bgGraphicNum6);
		// _this.grade6NumbersGroup.add(_this.FM_4_ScreenTxt);
		// _this.grade6NumbersGroup.add(_this.LCM_1_Screen);
		// _this.grade6NumbersGroup.add(_this.bgGraphicNum7);
		// _this.grade6NumbersGroup.add(_this.LCM_1_ScreenTxt);	
	},
	
	addgrade7IntegersTopic:function()
	{
		_this.topicTxtBg = _this.add.graphics(100, 60);
		_this.topicTxtBg.lineStyle(0, 0xFFFFFF, 0.8);
		_this.topicTxtBg.beginFill(0xD957A0, 1);
		_this.topicTxtBg.drawRoundedRect(0,0,170,100,10);
		_this.topicTxtBg.boundsPadding = 0;

		_this.topicTitleText = this.add.text(185, 85, ' \n '+window.selctedLang.integersTitle+' \n ');
		_this.topicTitleText.anchor.setTo(0.5);
		_this.topicTitleText.align = 'center';
		_this.topicTitleText.font = 'gradefont';
		_this.topicTitleText.fontSize = 26;
		_this.topicTitleText.fontWeight = 'normal';
		_this.topicTitleText.fill = 'white';
		_this.topicTitleText.wordWrap = true;
		_this.topicTitleText.wordWrapWidth = 500;
		
		_this.topicBg = _this.add.graphics(75, 100);
		_this.topicBg.lineStyle(0, 0xFFFFFF, 0.8);
		_this.topicBg.beginFill(0xD957A0, 1);
		_this.topicBg.drawRoundedRect(0,0,805,400,30);
		_this.topicBg.boundsPadding = 0;
		
		_this.INT_1_Screen = _this.add.sprite(100,120,'INT_DI_1_Screen');
		_this.bgGraphicInt1 = this.add.graphics(210,175);
		_this.bgGraphicInt1.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicInt1.beginFill(0x493A19, 1);
		_this.bgGraphicInt1.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicInt1.boundsPadding = 0;
		_this.INT_1_ScreenTxt = this.add.text(225, 192, ' \n '+window.selctedLang.INT_DI1_Screen+' \n ');
		_this.INT_1_ScreenTxt.anchor.setTo(0.5);
		_this.INT_1_ScreenTxt.align = 'center';
		_this.INT_1_ScreenTxt.font = 'gradefont';
		_this.INT_1_ScreenTxt.fontSize = 20;
		_this.INT_1_ScreenTxt.fontWeight = 'normal';
		_this.INT_1_ScreenTxt.fill = 'white';
		_this.INT_1_ScreenTxt.wordWrap = true;
		_this.INT_1_ScreenTxt.wordWrapWidth = 500;
		_this.INT_1_Screen.inputEnabled = true;
		_this.INT_1_Screen.input.useHandCursor = true;
		_this.INT_1_Screen.name = "INT-1";
		_this.INT_1_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{ 
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_INT_DI1_G7',true,false);
				}
			},_this);
		},_this);

		_this.INT_3_Screen = _this.add.sprite(300,120,'INT_DI_2_Screen');
		_this.bgGraphicInt2 = this.add.graphics(410,175);
		_this.bgGraphicInt2.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicInt2.beginFill(0x493A19, 1);
		_this.bgGraphicInt2.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicInt2.boundsPadding = 0;
		_this.INT_3_ScreenTxt = this.add.text(425, 192, ' \n '+window.selctedLang.INT_DI2_Screen+' \n ');
		_this.INT_3_ScreenTxt.anchor.setTo(0.5);
		_this.INT_3_ScreenTxt.align = 'center';
		_this.INT_3_ScreenTxt.font = 'gradefont';
		_this.INT_3_ScreenTxt.fontSize = 20;
		_this.INT_3_ScreenTxt.fontWeight = 'normal';
		_this.INT_3_ScreenTxt.fill = 'white';
		_this.INT_3_ScreenTxt.wordWrap = true;
		_this.INT_3_ScreenTxt.wordWrapWidth = 500;
		_this.INT_3_Screen.inputEnabled = true;
		_this.INT_3_Screen.input.useHandCursor = true;
		_this.INT_3_Screen.name = "INT-3";
		_this.INT_3_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_INT_DI2_G7',true,false);
				}
			},_this);	
		},_this); 

		_this.INT_5_Screen = _this.add.sprite(500,120,'INT_DI_3_Screen');
		_this.bgGraphicInt3 = this.add.graphics(610,175);
		_this.bgGraphicInt3.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicInt3.beginFill(0x493A19, 1);
		_this.bgGraphicInt3.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicInt3.boundsPadding = 0;
		_this.INT_5_ScreenTxt = this.add.text(625, 192, ' \n '+window.selctedLang.INT_DI3_Screen+' \n ');
		_this.INT_5_ScreenTxt.anchor.setTo(0.5);
		_this.INT_5_ScreenTxt.align = 'center';
		_this.INT_5_ScreenTxt.font = 'gradefont';
		_this.INT_5_ScreenTxt.fontSize = 20;
		_this.INT_5_ScreenTxt.fontWeight = 'normal';
		_this.INT_5_ScreenTxt.fill = 'white';
		_this.INT_5_ScreenTxt.wordWrap = true;
		_this.INT_5_ScreenTxt.wordWrapWidth = 500;
		_this.INT_5_Screen.inputEnabled = true;
		_this.INT_5_Screen.input.useHandCursor = true;
		_this.INT_5_Screen.name = "INT-5";
		_this.INT_5_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_INT_DI3_G7',true,false);
				}
			},_this);
		},_this);

		_this.INT_6_Screen = _this.add.sprite(700,120,'INT_DI_4_Screen');
		_this.bgGraphicInt4 = this.add.graphics(810,175);
		_this.bgGraphicInt4.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicInt4.beginFill(0x493A19, 1);
		_this.bgGraphicInt4.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicInt4.boundsPadding = 0;
		_this.INT_6_ScreenTxt = this.add.text(825, 192, ' \n '+window.selctedLang.INT_DI4_Screen+' \n ');
		_this.INT_6_ScreenTxt.anchor.setTo(0.5);
		_this.INT_6_ScreenTxt.align = 'center';
		_this.INT_6_ScreenTxt.font = 'gradefont';
		_this.INT_6_ScreenTxt.fontSize = 20;
		_this.INT_6_ScreenTxt.fontWeight = 'normal';
		_this.INT_6_ScreenTxt.fill = 'white';
		_this.INT_6_ScreenTxt.wordWrap = true;
		_this.INT_6_ScreenTxt.wordWrapWidth = 500;
		_this.INT_6_Screen.inputEnabled = true;
		_this.INT_6_Screen.name = "INT-6";
		_this.INT_6_Screen.input.useHandCursor = true;
		_this.INT_6_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_INT_DI4_G7',true,false);
				}
			},_this);
		},_this);

		_this.HornINT_5_Screen = _this.add.sprite(100,320,'INT_ML_1_Screen');
		_this.bgGraphicInt5 = this.add.graphics(210,375);
		_this.bgGraphicInt5.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicInt5.beginFill(0x493A19, 1);
		_this.bgGraphicInt5.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicInt5.boundsPadding = 0;
		_this.HornINT_5_ScreenTxt = this.add.text(225, 392, ' \n '+window.selctedLang.INT_ML1_Screen+' \n ');
		_this.HornINT_5_ScreenTxt.anchor.setTo(0.5);
		_this.HornINT_5_ScreenTxt.align = 'center';
		_this.HornINT_5_ScreenTxt.font = 'gradefont';
		_this.HornINT_5_ScreenTxt.fontSize = 20;
		_this.HornINT_5_ScreenTxt.fontWeight = 'normal';
		_this.HornINT_5_ScreenTxt.fill = 'white';
		_this.HornINT_5_ScreenTxt.wordWrap = true;
		_this.HornINT_5_ScreenTxt.wordWrapWidth = 500;
		_this.HornINT_5_Screen.inputEnabled = true;
		_this.HornINT_5_Screen.input.useHandCursor = true;
		_this.HornINT_5_Screen.name = "HornINT-5";
		_this.HornINT_5_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_INT_ML1_G7',true,false);
				}
			},_this);
		},_this);

		_this.HornINT_6_Screen = _this.add.sprite(300,320,'INT_ML_2_Screen');
		_this.bgGraphicInt6 = this.add.graphics(410,375);
		_this.bgGraphicInt6.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicInt6.beginFill(0x493A19, 1);
		_this.bgGraphicInt6.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicInt6.boundsPadding = 0;
		_this.HornINT_6_ScreenTxt = this.add.text(425, 392, ' \n '+window.selctedLang.INT_ML2_Screen+' \n ');
		_this.HornINT_6_ScreenTxt.anchor.setTo(0.5);
		_this.HornINT_6_ScreenTxt.align = 'center';
		_this.HornINT_6_ScreenTxt.font = 'gradefont';
		_this.HornINT_6_ScreenTxt.fontSize = 20;
		_this.HornINT_6_ScreenTxt.fontWeight = 'normal';
		_this.HornINT_6_ScreenTxt.fill = 'white';
		_this.HornINT_6_ScreenTxt.wordWrap = true;
		_this.HornINT_6_ScreenTxt.wordWrapWidth = 500;
		_this.HornINT_6_Screen.inputEnabled = true;
		_this.HornINT_6_Screen.input.useHandCursor = true;
		_this.HornINT_6_Screen.name = "HornINT-6";
		_this.HornINT_6_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_INT_ML2_G7',true,false);
				}
			},_this);	
		},_this);

		_this.HornINT_13_Screen = _this.add.sprite(500,320,'INT_ML_3_Screen');
		_this.bgGraphicInt7 = this.add.graphics(610,375);
		_this.bgGraphicInt7.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicInt7.beginFill(0x493A19, 1);
		_this.bgGraphicInt7.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicInt7.boundsPadding = 0;
		_this.HornINT_13_ScreenTxt = this.add.text(625, 392, ' \n '+window.selctedLang.INT_ML3_Screen+' \n ');
		_this.HornINT_13_ScreenTxt.anchor.setTo(0.5);
		_this.HornINT_13_ScreenTxt.align = 'center';
		_this.HornINT_13_ScreenTxt.font = 'gradefont';
		_this.HornINT_13_ScreenTxt.fontSize = 20;
		_this.HornINT_13_ScreenTxt.fontWeight = 'normal';
		_this.HornINT_13_ScreenTxt.fill = 'white';
		_this.HornINT_13_ScreenTxt.wordWrap = true;
		_this.HornINT_13_ScreenTxt.wordWrapWidth = 500;
		_this.HornINT_13_Screen.inputEnabled = true; 
		_this.HornINT_13_Screen.input.useHandCursor = true;
		_this.HornINT_13_Screen.name = "HornINT-13";
		_this.HornINT_13_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_INT_ML3_G7',true,false);
				}
			},_this);
		},_this);

		_this.INT_7_Screen = _this.add.sprite(700,320,'INT_ML_4_Screen');
		_this.bgGraphicInt8 = this.add.graphics(810,375);
		_this.bgGraphicInt8.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicInt8.beginFill(0x493A19, 1);
		_this.bgGraphicInt8.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicInt8.boundsPadding = 0;
		_this.INT_7_ScreenTxt = this.add.text(825, 392, ' \n '+window.selctedLang.INT_ML4_Screen+' \n ');
		_this.INT_7_ScreenTxt.anchor.setTo(0.5);
		_this.INT_7_ScreenTxt.align = 'center';
		_this.INT_7_ScreenTxt.font = 'gradefont';
		_this.INT_7_ScreenTxt.fontSize = 20;
		_this.INT_7_ScreenTxt.fontWeight = 'normal';
		_this.INT_7_ScreenTxt.fill = 'white';
		_this.INT_7_ScreenTxt.wordWrap = true;
		_this.INT_7_ScreenTxt.wordWrapWidth = 500;
		_this.INT_7_Screen.inputEnabled = true;
		_this.INT_7_Screen.name = "INT-7";
		_this.INT_7_Screen.input.useHandCursor = true;
		_this.INT_7_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_INT_ML4_G7',true,false);
				}
			},_this);
		},_this);

		// _this.INT_8_Screen = _this.add.sprite(100,520,'INT_8_Screen');
		// _this.bgGraphicInt9 = this.add.graphics(210,575);
		// _this.bgGraphicInt9.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicInt9.beginFill(0x493A19, 1);
		// _this.bgGraphicInt9.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicInt9.boundsPadding = 0;
		// _this.INT_8_ScreenTxt = this.add.text(225, 592, ' \n '+window.selctedLang.INT_8_Screen+' \n ');
		// _this.INT_8_ScreenTxt.anchor.setTo(0.5);
		// _this.INT_8_ScreenTxt.align = 'center';
		// _this.INT_8_ScreenTxt.font = 'gradefont';
		// _this.INT_8_ScreenTxt.fontSize = 20;
		// _this.INT_8_ScreenTxt.fontWeight = 'normal';
		// _this.INT_8_ScreenTxt.fill = 'white';
		// _this.INT_8_ScreenTxt.wordWrap = true;
		// _this.INT_8_ScreenTxt.wordWrapWidth = 500;
		// _this.INT_8_Screen.inputEnabled = true;
		// _this.INT_8_Screen.input.useHandCursor = true;
		// _this.INT_8_Screen.name = "INT-8";
		// _this.INT_8_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_int_8',true,false);
		// 		}
		// 	},_this);
		// },_this);

		// _this.INT_9_Screen = _this.add.sprite(300,520,'INT_9_Screen');
		// _this.bgGraphicInt10 = this.add.graphics(410,575);
		// _this.bgGraphicInt10.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicInt10.beginFill(0x493A19, 1);
		// _this.bgGraphicInt10.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicInt10.boundsPadding = 0;
		// _this.INT_9_ScreenTxt = this.add.text(425, 592, ' \n '+window.selctedLang.INT_9_Screen+' \n ');
		// _this.INT_9_ScreenTxt.anchor.setTo(0.5);
		// _this.INT_9_ScreenTxt.align = 'center';
		// _this.INT_9_ScreenTxt.font = 'gradefont';
		// _this.INT_9_ScreenTxt.fontSize = 20;
		// _this.INT_9_ScreenTxt.fontWeight = 'normal';
		// _this.INT_9_ScreenTxt.fill = 'white';
		// _this.INT_9_ScreenTxt.wordWrap = true;
		// _this.INT_9_ScreenTxt.wordWrapWidth = 500;
		// _this.INT_9_Screen.inputEnabled = true;
		// _this.INT_9_Screen.input.useHandCursor = true;
		// _this.INT_9_Screen.name = "INT-9";
		// _this.INT_9_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_int_9',true,false);
		// 		}
		// 	},_this);	
		// },_this);

		// _this.INT_10_Screen = _this.add.sprite(500,520,'INT_10_Screen');
		// _this.bgGraphicInt11 = this.add.graphics(610,575);
		// _this.bgGraphicInt11.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicInt11.beginFill(0x493A19, 1);
		// _this.bgGraphicInt11.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicInt11.boundsPadding = 0;
		// _this.INT_10_ScreenTxt = this.add.text(625, 592, ' \n '+window.selctedLang.INT_10_Screen+' \n ');
		// _this.INT_10_ScreenTxt.anchor.setTo(0.5);
		// _this.INT_10_ScreenTxt.align = 'center';
		// _this.INT_10_ScreenTxt.font = 'gradefont';
		// _this.INT_10_ScreenTxt.fontSize = 20;
		// _this.INT_10_ScreenTxt.fontWeight = 'normal';
		// _this.INT_10_ScreenTxt.fill = 'white';
		// _this.INT_10_ScreenTxt.wordWrap = true;
		// _this.INT_10_ScreenTxt.wordWrapWidth = 500;
		// _this.INT_10_Screen.inputEnabled = true;
		// _this.INT_10_Screen.input.useHandCursor = true;
		// _this.INT_10_Screen.name = "INT-10";
		// _this.INT_10_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_int_10',true,false);
		// 		}
		// 	},_this);
		// },_this);

		// _this.INT_11_Screen = _this.add.sprite(700,520,'INT_11_Screen');
		// _this.bgGraphicInt12 = this.add.graphics(810,575);
		// _this.bgGraphicInt12.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicInt12.beginFill(0x493A19, 1);
		// _this.bgGraphicInt12.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicInt12.boundsPadding = 0;
		// _this.INT_11_ScreenTxt = this.add.text(825, 592, ' \n '+window.selctedLang.INT_11_Screen+' \n ');
		// _this.INT_11_ScreenTxt.anchor.setTo(0.5);
		// _this.INT_11_ScreenTxt.align = 'center';
		// _this.INT_11_ScreenTxt.font = 'gradefont';
		// _this.INT_11_ScreenTxt.fontSize = 20;
		// _this.INT_11_ScreenTxt.fontWeight = 'normal';
		// _this.INT_11_ScreenTxt.fill = 'white';
		// _this.INT_11_ScreenTxt.wordWrap = true;
		// _this.INT_11_ScreenTxt.wordWrapWidth = 500;
		// _this.INT_11_Screen.inputEnabled = true;
		// _this.INT_11_Screen.name = "INT-11";
		// _this.INT_11_Screen.input.useHandCursor = true;
		// _this.INT_11_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_int_11',true,false);
		// 		}
		// 	},_this);
		// },_this);

		// _this.INT_12_Screen = _this.add.sprite(100,720,'INT_12_Screen');
		// _this.bgGraphicInt13 = this.add.graphics(210,775);
		// _this.bgGraphicInt13.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicInt13.beginFill(0x493A19, 1);
		// _this.bgGraphicInt13.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicInt13.boundsPadding = 0;
		// _this.INT_12_ScreenTxt = this.add.text(225, 792, ' \n '+window.selctedLang.INT_12_Screen+' \n ');
		// _this.INT_12_ScreenTxt.anchor.setTo(0.5);
		// _this.INT_12_ScreenTxt.align = 'center';
		// _this.INT_12_ScreenTxt.font = 'gradefont';
		// _this.INT_12_ScreenTxt.fontSize = 20;
		// _this.INT_12_ScreenTxt.fontWeight = 'normal';
		// _this.INT_12_ScreenTxt.fill = 'white';
		// _this.INT_12_ScreenTxt.wordWrap = true;
		// _this.INT_12_ScreenTxt.wordWrapWidth = 500;
		// _this.INT_12_Screen.inputEnabled = true;
		// _this.INT_12_Screen.input.useHandCursor = true;
		// _this.INT_12_Screen.name = "INT-12";
		// _this.INT_12_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_int_12',true,false);
		// 		}
		// 	},_this);
		// },_this);

		// _this.HornINT_14_Screen = _this.add.sprite(300,720,'HornINT_14_Screen');
		// _this.bgGraphicInt14 = this.add.graphics(410,775);
		// _this.bgGraphicInt14.lineStyle(0, 0xFFFFFF, 0.8);
		// _this.bgGraphicInt14.beginFill(0x493A19, 1);
		// _this.bgGraphicInt14.drawRoundedRect(0,0,30,30,10);
		// _this.bgGraphicInt14.boundsPadding = 0;
		// _this.HornINT_14_ScreenTxt = this.add.text(425, 792, ' \n '+window.selctedLang.HornINT_14_Screen+' \n ');
		// _this.HornINT_14_ScreenTxt.anchor.setTo(0.5);
		// _this.HornINT_14_ScreenTxt.align = 'center';
		// _this.HornINT_14_ScreenTxt.font = 'gradefont';
		// _this.HornINT_14_ScreenTxt.fontSize = 20;
		// _this.HornINT_14_ScreenTxt.fontWeight = 'normal';
		// _this.HornINT_14_ScreenTxt.fill = 'white';
		// _this.HornINT_14_ScreenTxt.wordWrap = true;
		// _this.HornINT_14_ScreenTxt.wordWrapWidth = 500;
		// _this.HornINT_14_Screen.inputEnabled = true;
		// _this.HornINT_14_Screen.input.useHandCursor = true;
		// _this.HornINT_14_Screen.name = "HornINT-14";
		// _this.HornINT_14_Screen.events.onInputDown.add(function(target){
		// 	_this.time.events.add(300, function(){
		// 		if(_this.tap)
		// 		{
		// 			_this.time.events.removeAll();
		// 			target.events.onInputDown.removeAll();
		// 			_this.clickSound = _this.add.audio('ClickSound');
		// 			_this.clickSound.play();
		// 			_this.state.start('preloader_int_14h',true,false);
		// 		}
		// 	},_this);	
		// },_this);
		
		
		_this.grade7IntegersGroup.add(_this.topicTxtBg);
		_this.grade7IntegersGroup.add(_this.topicTitleText);
		_this.grade7IntegersGroup.add(_this.topicBg);
		_this.grade7IntegersGroup.add(_this.INT_1_Screen);
		_this.grade7IntegersGroup.add(_this.bgGraphicInt1);
		_this.grade7IntegersGroup.add(_this.INT_1_ScreenTxt);
		_this.grade7IntegersGroup.add(_this.INT_3_Screen);
		_this.grade7IntegersGroup.add(_this.bgGraphicInt2);
		_this.grade7IntegersGroup.add(_this.INT_3_ScreenTxt);
		_this.grade7IntegersGroup.add(_this.INT_5_Screen);
		_this.grade7IntegersGroup.add(_this.bgGraphicInt3);
		_this.grade7IntegersGroup.add(_this.INT_5_ScreenTxt);
		_this.grade7IntegersGroup.add(_this.INT_6_Screen);
		_this.grade7IntegersGroup.add(_this.bgGraphicInt4);
		_this.grade7IntegersGroup.add(_this.INT_6_ScreenTxt);
		_this.grade7IntegersGroup.add(_this.HornINT_5_Screen);
		_this.grade7IntegersGroup.add(_this.bgGraphicInt5);
		_this.grade7IntegersGroup.add(_this.HornINT_5_ScreenTxt);
		_this.grade7IntegersGroup.add(_this.HornINT_6_Screen);
		_this.grade7IntegersGroup.add(_this.bgGraphicInt6);
		_this.grade7IntegersGroup.add(_this.HornINT_6_ScreenTxt);
		_this.grade7IntegersGroup.add(_this.HornINT_13_Screen);
		_this.grade7IntegersGroup.add(_this.bgGraphicInt7);
		_this.grade7IntegersGroup.add(_this.HornINT_13_ScreenTxt);
		_this.grade7IntegersGroup.add(_this.INT_7_Screen);
		_this.grade7IntegersGroup.add(_this.bgGraphicInt8);
		_this.grade7IntegersGroup.add(_this.INT_7_ScreenTxt);
		// _this.grade7IntegersGroup.add(_this.INT_8_Screen);
		// _this.grade7IntegersGroup.add(_this.bgGraphicInt9);
		// _this.grade7IntegersGroup.add(_this.INT_8_ScreenTxt);
		// _this.grade7IntegersGroup.add(_this.INT_9_Screen);
		// _this.grade7IntegersGroup.add(_this.bgGraphicInt10);
		// _this.grade7IntegersGroup.add(_this.INT_9_ScreenTxt);
		// _this.grade7IntegersGroup.add(_this.INT_10_Screen);
		// _this.grade7IntegersGroup.add(_this.bgGraphicInt11);
		// _this.grade7IntegersGroup.add(_this.INT_10_ScreenTxt);
		// _this.grade7IntegersGroup.add(_this.INT_11_Screen);
		// _this.grade7IntegersGroup.add(_this.bgGraphicInt12);
		// _this.grade7IntegersGroup.add(_this.INT_11_ScreenTxt);
		// _this.grade7IntegersGroup.add(_this.INT_12_Screen);
		// _this.grade7IntegersGroup.add(_this.bgGraphicInt13);
		// _this.grade7IntegersGroup.add(_this.INT_12_ScreenTxt);
		// _this.grade7IntegersGroup.add(_this.HornINT_14_Screen);
		// _this.grade7IntegersGroup.add(_this.bgGraphicInt14);
		// _this.grade7IntegersGroup.add(_this.HornINT_14_ScreenTxt);
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

		
		/*_this.clickSound = null;
		_this.mc = null;
		//_this = null;
		_this.tween = null;
		_this.tap = null;
		_this.background = null;
		_this.gradeBackBtn = null;
		_this.grade1FractionGroup = null;
		_this.grade1LengthGroup = null;
		_this.grade1WeightGroup = null;
		_this.graphicsBg = null;
		_this.mask = null;
		_this.swipeUpFlag = null;
		_this.swipeDownFlag = null;
		_this.page = null; 
		_this.input.onDown.removeAll();
		_this.input.onTap.removeAll();
		_this.time.events.removeAll();
		
		_this.topicTxtBg = null;
		_this.topicTitleText = null;
		_this.topicBg = null;
		
		_this.fractions1_1AScreen.events.onInputDown.removeAll();
		_this.fractions1_1AScreen = null;
		_this.fractions1_1AScreenTxt = null;
		
		_this.length2_1AScreen.events.onInputDown.removeAll();
		_this.length2_1AScreen = null;
		_this.length2_1AScreenTxt = null;
		
		_this.length2_1BScreen.events.onInputDown.removeAll();
		_this.length2_1BScreen = null;
		_this.length2_1BScreenTxt = null;
		
		_this.length2_2Screen.events.onInputDown.removeAll();
		_this.length2_2Screen = null;
		_this.length2_2ScreenTxt = null;
		
		_this.length2_3Screen.events.onInputDown.removeAll();
		_this.length2_3Screen = null;
		_this.length2_3ScreenTxt = null;
		
		_this.weight3_1Screen.events.onInputDown.removeAll();
		_this.weight3_1Screen = null;
		_this.weight3_1ScreenTxt = null;
		
		_this.weight3_2AScreen.events.onInputDown.removeAll();
		_this.weight3_2AScreen = null;
		_this.weight3_2AScreenTxt = null;
		
		console.log(_this.world);

		_this = null;*/

		/*_this.world.onChildInputDown.removeAll();
        _this.world.removeChildren(0, _this.world.length);

		_this = null;*/
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