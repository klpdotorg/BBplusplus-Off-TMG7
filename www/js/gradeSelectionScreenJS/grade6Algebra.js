Game.grade6Algebra=function(game){
	
};

Game.grade6Algebra.prototype={

	init:function()//game_id,userHasPlayed,timeInMinutes,timeInSeconds,score,gradeTopics,grade,microConcepts
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

		// console.log("inside Decimals menu",_this.userHasPlayed,_this.timeInMinutes,_this.timeInSeconds,_this.game_id,_this.score);

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

		nativeApp.screenViewStringPass("Practice_activity_list","grade6Algebra");
		
		
		_this = this;

		this.game.input.enabled = false;

		grade6NumberSystemsSelected = false;
		grade6AlgebraSelected = false;
		grade6RatioandProportionSelected = false;
		grade6GeometrySelected  = false;
		grade6DecimalsSelected  = false;
 
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
			
			grade6NumberSystemsSelected = false;
			_this.state.start('selectgrade6MicroConceptScreen',true,false);
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

		_this.grade6OperationsGroup = _this.add.group();
		//_this.grade6PatternsGroup = _this.add.group();
		
		_this.addgrade6OperationsTopic();
		//_this.addgrade6PatternsTopic();
	
		_this.grade6OperationsGroup.x = 0;
		_this.grade6OperationsGroup.y = 0;
		
		// _this.grade6PatternsGroup.x = 0;
		// _this.grade6PatternsGroup.y = 500;
	
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
		
	
		_this.graphicsBg.addChild(_this.grade6OperationsGroup);
		//_this.graphicsBg.addChild(_this.grade6PatternsGroup);
		
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
						if(_this.graphicsBg.y<=-270)
						{
							//swipeUpFlag = false;
							_this.graphicsBg.y = -270;
						}
						
						//game.input.enabled = true;
					}, _this);
					_this.tween.onUpdateCallback(function(){
						_this.tap = false;
						if(_this.graphicsBg.y<=-270)
						{
							//swipeUpFlag = false;
							_this.graphicsBg.y = -270;
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
					else if(_this.graphicsBg.y<=-270)
						{
							//swipeUpFlag = false;
							_this.graphicsBg.y = -270;
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
						else if(_this.graphicsBg.y<=-270)
						{
							//swipeUpFlag = false;
							_this.graphicsBg.y = -270;
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
			_this.graphicsBg.y = -270;

			var gameScreenTween = game.add.tween(_this.graphicsBg);
			gameScreenTween.to({ y: 0}, 0, 'Linear', true, 0);
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
	
	
	addgrade6OperationsTopic:function()
	{
		_this.topicTxtBg = _this.add.graphics(100, 60);
		_this.topicTxtBg.lineStyle(0, 0xFFFFFF, 0.8);
		_this.topicTxtBg.beginFill(0x139487, 1);
		_this.topicTxtBg.drawRoundedRect(0,0,330,100,10);
		_this.topicTxtBg.boundsPadding = 0;
		
		
		//_this.topicTitleText = _this.add.sprite(215,83,'fractionsTitleTxt');
		//_this.topicTitleText.anchor.setTo(0.5);

		_this.topicTitleText = this.add.text(265, 85, ' \n '+window.selctedLang.algebraTitle+' \n ');
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
		_this.topicBg.drawRoundedRect(0,0,805,600,30);
		_this.topicBg.boundsPadding = 0;
		
		_this.ALAS_1_Screen = _this.add.sprite(100,120,'ALAS_1_Screen');
		_this.bgGraphicAlg1 = this.add.graphics(210,175);
		_this.bgGraphicAlg1.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicAlg1.beginFill(0x493A19, 1);
		_this.bgGraphicAlg1.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicAlg1.boundsPadding = 0;
		_this.ALAS_1_ScreenTxt = this.add.text(225, 192, ' \n '+window.selctedLang.ALAS_1_Screen+' \n ');
		_this.ALAS_1_ScreenTxt.anchor.setTo(0.5);
		_this.ALAS_1_ScreenTxt.align = 'center';
		_this.ALAS_1_ScreenTxt.font = 'gradefont';
		_this.ALAS_1_ScreenTxt.fontSize = 20;
		_this.ALAS_1_ScreenTxt.fontWeight = 'normal';
		_this.ALAS_1_ScreenTxt.fill = 'white';
		_this.ALAS_1_ScreenTxt.wordWrap = true;
		_this.ALAS_1_ScreenTxt.wordWrapWidth = 500;
		_this.ALAS_1_Screen.inputEnabled = true;
		_this.ALAS_1_Screen.name = "ALAS-1";
		_this.ALAS_1_Screen.input.useHandCursor = true;
		_this.ALAS_1_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					 
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_ALAS_01_G6',true,false);
				}
			},_this);
		},_this);
		
		_this.ALA_1_Screen = _this.add.sprite(300,120,'ALA_1_Screen');
		_this.bgGraphicAlg2 = this.add.graphics(410,175);
		_this.bgGraphicAlg2.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicAlg2.beginFill(0x493A19, 1);
		_this.bgGraphicAlg2.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicAlg2.boundsPadding = 0;
		_this.ALA_1_ScreenTxt = this.add.text(425, 192, ' \n '+window.selctedLang.ALA_1_Screen+' \n ');
		_this.ALA_1_ScreenTxt.anchor.setTo(0.5);
		_this.ALA_1_ScreenTxt.align = 'center';
		_this.ALA_1_ScreenTxt.font = 'gradefont';
		_this.ALA_1_ScreenTxt.fontSize = 20;
		_this.ALA_1_ScreenTxt.fontWeight = 'normal';
		_this.ALA_1_ScreenTxt.fill = 'white';
		_this.ALA_1_ScreenTxt.wordWrap = true;
		_this.ALA_1_ScreenTxt.wordWrapWidth = 500;
		_this.ALA_1_Screen.inputEnabled = true;
		_this.ALA_1_Screen.input.useHandCursor = true;
		_this.ALA_1_Screen.name = "ALA-1";
		_this.ALA_1_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_ALA_01_G6',true,false);
				}
			},_this);
		},_this);

		_this.ALS_1_Screen = _this.add.sprite(500,120,'ALS_1_Screen');
		_this.bgGraphicAlg3 = this.add.graphics(610,175);
		_this.bgGraphicAlg3.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicAlg3.beginFill(0x493A19, 1);
		_this.bgGraphicAlg3.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicAlg3.boundsPadding = 0;
		_this.ALS_1_ScreenTxt = this.add.text(625, 192, ' \n '+window.selctedLang.ALS_1_Screen+' \n ');
		_this.ALS_1_ScreenTxt.anchor.setTo(0.5);
		_this.ALS_1_ScreenTxt.align = 'center';
		_this.ALS_1_ScreenTxt.font = 'gradefont';
		_this.ALS_1_ScreenTxt.fontSize = 20;
		_this.ALS_1_ScreenTxt.fontWeight = 'normal';
		_this.ALS_1_ScreenTxt.fill = 'white';
		_this.ALS_1_ScreenTxt.wordWrap = true;
		_this.ALS_1_ScreenTxt.wordWrapWidth = 500;
		_this.ALS_1_Screen.inputEnabled = true;
		_this.ALS_1_Screen.name = "ALS-1";
		_this.ALS_1_Screen.input.useHandCursor = true;
		_this.ALS_1_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{					
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_ALS_01_MCQ_G6',true,false);
				}
			},_this);
		},_this);
		
		_this.ALS_2_Screen = _this.add.sprite(700,120,'ALS_2_Screen');
		_this.bgGraphicAlg4 = this.add.graphics(810,175);
		_this.bgGraphicAlg4.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicAlg4.beginFill(0x493A19, 1);
		_this.bgGraphicAlg4.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicAlg4.boundsPadding = 0;
		_this.ALS_2_ScreenTxt = this.add.text(825, 192, ' \n '+window.selctedLang.ALS_2_Screen+' \n ');
		_this.ALS_2_ScreenTxt.anchor.setTo(0.5);
		_this.ALS_2_ScreenTxt.align = 'center';
		_this.ALS_2_ScreenTxt.font = 'gradefont';
		_this.ALS_2_ScreenTxt.fontSize = 20;
		_this.ALS_2_ScreenTxt.fontWeight = 'normal';
		_this.ALS_2_ScreenTxt.fill = 'white';
		_this.ALS_2_ScreenTxt.wordWrap = true;
		_this.ALS_2_ScreenTxt.wordWrapWidth = 500;
		_this.ALS_2_Screen.inputEnabled = true;
		_this.ALS_2_Screen.name = "ALS_2";
		_this.ALS_2_Screen.input.useHandCursor = true;
		_this.ALS_2_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_ALS_02_FIB_G6',true,false);
				}
			},_this);
		},_this);


		_this.ALM_1_Screen = _this.add.sprite(100,320,'ALM_1_Screen');
		_this.bgGraphicAlg5 = this.add.graphics(210,375);
		_this.bgGraphicAlg5.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicAlg5.beginFill(0x493A19, 1);
		_this.bgGraphicAlg5.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicAlg5.boundsPadding = 0;
		_this.ALM_1_ScreenTxt = this.add.text(225, 392, ' \n '+window.selctedLang.ALM_1_Screen+' \n ');
		_this.ALM_1_ScreenTxt.anchor.setTo(0.5);
		_this.ALM_1_ScreenTxt.align = 'center';
		_this.ALM_1_ScreenTxt.font = 'gradefont';
		_this.ALM_1_ScreenTxt.fontSize = 20;
		_this.ALM_1_ScreenTxt.fontWeight = 'normal';
		_this.ALM_1_ScreenTxt.fill = 'white';
		_this.ALM_1_ScreenTxt.wordWrap = true;
		_this.ALM_1_ScreenTxt.wordWrapWidth = 500;
		_this.ALM_1_Screen.inputEnabled = true;
		_this.ALM_1_Screen.input.useHandCursor = true;
		_this.ALM_1_Screen.name = "ALM-1";
		_this.ALM_1_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_ALM_01_MCQ_G6',true,false);
				}
			},_this);
		},_this);

		_this.ALM_2_Screen = _this.add.sprite(300,320,'ALM_2_Screen');
		_this.bgGraphicAlg6 = this.add.graphics(410,375);
		_this.bgGraphicAlg6.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicAlg6.beginFill(0x493A19, 1);
		_this.bgGraphicAlg6.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicAlg6.boundsPadding = 0;
		_this.ALM_2_ScreenTxt = this.add.text(425, 392, ' \n '+window.selctedLang.ALM_2_Screen+' \n ');
		_this.ALM_2_ScreenTxt.anchor.setTo(0.5);
		_this.ALM_2_ScreenTxt.align = 'center';
		_this.ALM_2_ScreenTxt.font = 'gradefont';
		_this.ALM_2_ScreenTxt.fontSize = 20;
		_this.ALM_2_ScreenTxt.fontWeight = 'normal';
		_this.ALM_2_ScreenTxt.fill = 'white';
		_this.ALM_2_ScreenTxt.wordWrap = true;
		_this.ALM_2_ScreenTxt.wordWrapWidth = 500;
		_this.ALM_2_Screen.inputEnabled = true;
		_this.ALM_2_Screen.name = "ALM-2";
		_this.ALM_2_Screen.input.useHandCursor = true;
		_this.ALM_2_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{					
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_ALM_02_FIB_G6',true,false);
				}
			},_this);
		},_this);
		
		_this.ALD_1_Screen = _this.add.sprite(500,320,'ALD_1_Screen');
		_this.bgGraphicAlg7 = this.add.graphics(610,375);
		_this.bgGraphicAlg7.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicAlg7.beginFill(0x493A19, 1);
		_this.bgGraphicAlg7.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicAlg7.boundsPadding = 0;
		_this.ALD_1_ScreenTxt = this.add.text(625, 392, ' \n '+window.selctedLang.ALD_1_Screen+' \n ');
		_this.ALD_1_ScreenTxt.anchor.setTo(0.5);
		_this.ALD_1_ScreenTxt.align = 'center';
		_this.ALD_1_ScreenTxt.font = 'gradefont';
		_this.ALD_1_ScreenTxt.fontSize = 20;
		_this.ALD_1_ScreenTxt.fontWeight = 'normal';
		_this.ALD_1_ScreenTxt.fill = 'white';
		_this.ALD_1_ScreenTxt.wordWrap = true;
		_this.ALD_1_ScreenTxt.wordWrapWidth = 500;
		_this.ALD_1_Screen.inputEnabled = true;
		_this.ALD_1_Screen.name = "ALD-1";
		_this.ALD_1_Screen.input.useHandCursor = true;
		_this.ALD_1_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_ALD_01_G6',true,false);
				}
			},_this);
		},_this);

		_this.ALP_1_Screen = _this.add.sprite(700,320,'ALP_1_Screen');
		_this.bgGraphicAlg8 = this.add.graphics(810,375);
		_this.bgGraphicAlg8.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicAlg8.beginFill(0x493A19, 1);
		_this.bgGraphicAlg8.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicAlg8.boundsPadding = 0;
		_this.ALP_1_ScreenTxt = this.add.text(825, 392, ' \n '+window.selctedLang.ALP_1_Screen+' \n ');
		_this.ALP_1_ScreenTxt.anchor.setTo(0.5);
		_this.ALP_1_ScreenTxt.align = 'center';
		_this.ALP_1_ScreenTxt.font = 'gradefont';
		_this.ALP_1_ScreenTxt.fontSize = 20;
		_this.ALP_1_ScreenTxt.fontWeight = 'normal';
		_this.ALP_1_ScreenTxt.fill = 'white';
		_this.ALP_1_ScreenTxt.wordWrap = true;
		_this.ALP_1_ScreenTxt.wordWrapWidth = 500;
		_this.ALP_1_Screen.inputEnabled = true;
		_this.ALP_1_Screen.input.useHandCursor = true;
		_this.ALP_1_Screen.name = "NSD-1";
		_this.ALP_1_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_ALP_01_G6',true,false);
				}
			},_this);
		},_this);

		_this.ALP_2_Screen = _this.add.sprite(100,520,'ALP_2_Screen');
		_this.bgGraphicAlg9 = this.add.graphics(210,575);
		_this.bgGraphicAlg9.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicAlg9.beginFill(0x493A19, 1);
		_this.bgGraphicAlg9.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicAlg9.boundsPadding = 0;
		_this.ALP_2_ScreenTxt = this.add.text(225, 592, ' \n '+window.selctedLang.ALP_2_Screen+' \n ');
		_this.ALP_2_ScreenTxt.anchor.setTo(0.5);
		_this.ALP_2_ScreenTxt.align = 'center';
		_this.ALP_2_ScreenTxt.font = 'gradefont';
		_this.ALP_2_ScreenTxt.fontSize = 20;
		_this.ALP_2_ScreenTxt.fontWeight = 'normal';
		_this.ALP_2_ScreenTxt.fill = 'white';
		_this.ALP_2_ScreenTxt.wordWrap = true;
		_this.ALP_2_ScreenTxt.wordWrapWidth = 500;
		_this.ALP_2_Screen.inputEnabled = true;
		_this.ALP_2_Screen.input.useHandCursor = true;
		_this.ALP_2_Screen.name = "NSD-2A";
		_this.ALP_2_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_ALP_02_G6',true,false);
				}
			},_this);
		},_this);

		_this.ALMAZE_1_Screen  = _this.add.sprite(300,520,'ALMAZE_1_Screen');
		_this.bgGraphicAlg10 = this.add.graphics(410,575);
		_this.bgGraphicAlg10.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicAlg10.beginFill(0x493A19, 1);
		_this.bgGraphicAlg10.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicAlg10.boundsPadding = 0;
		_this.ALMAZE_1_ScreenTxt = this.add.text(425, 592, ' \n '+window.selctedLang.ALMAZE_1_Screen+' \n ');
		_this.ALMAZE_1_ScreenTxt.anchor.setTo(0.5);
		_this.ALMAZE_1_ScreenTxt.align = 'center';
		_this.ALMAZE_1_ScreenTxt.font = 'gradefont';
		_this.ALMAZE_1_ScreenTxt.fontSize = 20;
		_this.ALMAZE_1_ScreenTxt.fontWeight = 'normal';
		_this.ALMAZE_1_ScreenTxt.fill = 'white';
		_this.ALMAZE_1_ScreenTxt.wordWrap = true;
		_this.ALMAZE_1_ScreenTxt.wordWrapWidth = 500;
		_this.ALMAZE_1_Screen.inputEnabled = true;
		_this.ALMAZE_1_Screen.name = "NSF-2B";
		_this.ALMAZE_1_Screen.input.useHandCursor = true;
		_this.ALMAZE_1_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{					
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_AL_MAZE_G6',true,false);
				}
			},_this);
		},_this);

		_this.ALMEM_1_Screen = _this.add.sprite(500,520,'ALMEM_1_Screen');
		_this.bgGraphicAlg11 = this.add.graphics(610,575);
		_this.bgGraphicAlg11.lineStyle(0, 0xFFFFFF, 0.8);
		_this.bgGraphicAlg11.beginFill(0x493A19, 1);
		_this.bgGraphicAlg11.drawRoundedRect(0,0,30,30,10);
		_this.bgGraphicAlg11.boundsPadding = 0;
		_this.ALMEM_1_ScreenTxt = this.add.text(625, 592, ' \n '+window.selctedLang.ALMEM_1_Screen+' \n ');
		_this.ALMEM_1_ScreenTxt.anchor.setTo(0.5);
		_this.ALMEM_1_ScreenTxt.align = 'center';
		_this.ALMEM_1_ScreenTxt.font = 'gradefont';
		_this.ALMEM_1_ScreenTxt.fontSize = 20;
		_this.ALMEM_1_ScreenTxt.fontWeight = 'normal';
		_this.ALMEM_1_ScreenTxt.fill = 'white';
		_this.ALMEM_1_ScreenTxt.wordWrap = true;
		_this.ALMEM_1_ScreenTxt.wordWrapWidth = 500;
		_this.ALMEM_1_Screen.inputEnabled = true;
		_this.ALMEM_1_Screen.name = "NSD-3A";
		_this.ALMEM_1_Screen.input.useHandCursor = true;
		_this.ALMEM_1_Screen.events.onInputDown.add(function(target){
			_this.time.events.add(300, function(){
				if(_this.tap)
				{
					_this.time.events.removeAll();
					target.events.onInputDown.removeAll();
					_this.clickSound = _this.add.audio('ClickSound');
					_this.clickSound.play();
					_this.state.start('preloader_AL_MEM_G6',true,false);
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
		
		_this.grade6OperationsGroup.add(_this.topicTxtBg);
		_this.grade6OperationsGroup.add(_this.topicTitleText);
		_this.grade6OperationsGroup.add(_this.topicBg);
		_this.grade6OperationsGroup.add(_this.ALAS_1_Screen);
		_this.grade6OperationsGroup.add(_this.bgGraphicAlg1);
		_this.grade6OperationsGroup.add(_this.ALAS_1_ScreenTxt);
		_this.grade6OperationsGroup.add(_this.ALA_1_Screen);
		_this.grade6OperationsGroup.add(_this.bgGraphicAlg2);
		_this.grade6OperationsGroup.add(_this.ALA_1_ScreenTxt);
		_this.grade6OperationsGroup.add(_this.ALS_1_Screen);
		_this.grade6OperationsGroup.add(_this.bgGraphicAlg3);
		_this.grade6OperationsGroup.add(_this.ALS_1_ScreenTxt);
		_this.grade6OperationsGroup.add(_this.ALS_2_Screen);
		_this.grade6OperationsGroup.add(_this.bgGraphicAlg4);
		_this.grade6OperationsGroup.add(_this.ALS_2_ScreenTxt);
		_this.grade6OperationsGroup.add(_this.ALM_1_Screen);
		_this.grade6OperationsGroup.add(_this.bgGraphicAlg5);
		_this.grade6OperationsGroup.add(_this.ALM_1_ScreenTxt);
		_this.grade6OperationsGroup.add(_this.ALM_2_Screen);
		_this.grade6OperationsGroup.add(_this.bgGraphicAlg6);
		_this.grade6OperationsGroup.add(_this.ALM_2_ScreenTxt);
		_this.grade6OperationsGroup.add(_this.ALD_1_Screen);
		_this.grade6OperationsGroup.add(_this.bgGraphicAlg7);
		_this.grade6OperationsGroup.add(_this.ALD_1_ScreenTxt);

		_this.grade6OperationsGroup.add(_this.ALP_1_Screen);
		_this.grade6OperationsGroup.add(_this.bgGraphicAlg8);
		_this.grade6OperationsGroup.add(_this.ALP_1_ScreenTxt);

		_this.grade6OperationsGroup.add(_this.ALP_2_Screen);
		_this.grade6OperationsGroup.add(_this.bgGraphicAlg9);
		_this.grade6OperationsGroup.add(_this.ALP_2_ScreenTxt);

		_this.grade6OperationsGroup.add(_this.ALMAZE_1_Screen);
		_this.grade6OperationsGroup.add(_this.bgGraphicAlg10);
		_this.grade6OperationsGroup.add(_this.ALMAZE_1_ScreenTxt);

		_this.grade6OperationsGroup.add(_this.ALMEM_1_Screen);
		_this.grade6OperationsGroup.add(_this.bgGraphicAlg11);
		_this.grade6OperationsGroup.add(_this.ALMEM_1_ScreenTxt);
		
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