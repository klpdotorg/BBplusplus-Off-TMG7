Game.userprogress=function(game){
	
};

var pie;
var _this;

Game.userprogress.prototype={

	init:function(user)
	{
		//window.avatarName = user;
	},

	preload:function(game){

		if(window.avatarName.toLowerCase() == "fish")
			game.load.atlas('avatar','assets/fish.png','assets/fish.json');
		else if(window.avatarName.toLowerCase() == "butterfly")
			game.load.atlas('avatar','assets/butterfly.png','assets/butterfly.json');
		else if(window.avatarName.toLowerCase() == "flower")
			game.load.atlas('avatar','assets/flower.png','assets/flower.json');
		else if(window.avatarName.toLowerCase() == "parrot")
			game.load.atlas('avatar','assets/parrot.png','assets/parrot.json');
		else if(window.avatarName.toLowerCase() == "sun")
			game.load.atlas('avatar','assets/sun.png','assets/sun.json');
		else if(window.avatarName.toLowerCase() == "tree")
			game.load.atlas('avatar','assets/tree.png','assets/tree.json');

		game.load.image('scrollWhite','assets/scrollWhite.png');
		game.load.image('scrollBlack','assets/scrollBlack.png');

		game.time.advancedTiming = true;
	},

	create:function(game){

		this.numberSystemsTotal = 24;
		this.geometryTotal = 12;//19
		this.algebraTotal = 7;//18
	
		this.cnumberSystemsPlayedFromServer = 0;
		this.cgeometryPlayedFromServer = 0;
		this.calgebraPlayedFromServer = 0;

		
		this.numbersenseScore =0;
		this.measurementScore =0;
		this.numberoperationScore =0;

		
		this.gameModeBg = game.add.image(0,0,'gameModeBg');

		console.log(window.deviceId);

		var jsondata = {name:window.avatarName,deviceid:window.deviceId};

		_this = this;

		this.responseData = null;

		if(navigator.connection.type!="none" && navigator.connection.type!="unknown" && navigator.connection.type!=null && navigator.connection.type!="undefined")
		{
			console.log("sync telemetry"+navigator.connection.type);
			var apiurl = "https://abbmath.klp.org.in/abbppchmprm/assets/userprogress/userprogress";
			//"https://10.0.2.2/abbppchmprm/assets/userprogress/userprogress";
			
		        console.log("RESTAPImgr.invokeRESTAPI: apiname:" + apiurl + "jsondata" + JSON.stringify(jsondata));
		        nativeApp.CallUserProgressBeforeFEtchingData();

		        $.ajax({
		            url: apiurl,
		            type: "POST",
		            dataType: "json",
		            // async:false, // set to false to perform a synchronous request
		            data: JSON.stringify(jsondata),
		            contentType: 'application/json; charset=UTF-8',
		            accepts: 'application/json',
		            success: function (jsonresp) {
		            	

		            	if(jsonresp.status == "success")
		            	{
		            		_this.responseData = jsonresp;
		            		console.log(_this.responseData);
		            		_this.afterDataFetched(game);

		            	}
		            	else
		            	{
		            		nativeApp.CallUserProgressFetchError();
		            	}
		                 
		            },
		            error: function (error) {
		            	console.log(error);
		                nativeApp.CallUserProgressFetchError();
		            }
		            
		        });
		}
		else{
			nativeApp.CallUserProgress();
		}


		this.gameModeNavBar = game.add.image(0,0,'gameModeNavBar');

		this.gameModeBackBtn = game.add.image(30,21,'gameModeBackBtn');
		this.gameModeBackBtn.anchor.setTo(0.5);
		this.gameModeBackBtn.inputEnabled = true;
		this.gameModeBackBtn.input.useHandCursor = true;
		this.gameModeBackBtn.events.onInputDown.add(function()
		{
			this.clickSound = this.add.audio('ClickSound');
        	this.clickSound.play();

			this.state.start('practiceModegradeSelectionScreen',true,false);	
			
		},this);

		this.gameModeShareBtn = game.add.image(920,21,'shareIcon');
        		this.gameModeShareBtn.anchor.setTo(0.5);
        		this.gameModeShareBtn.scale.setTo(0.8);
        		this.gameModeShareBtn.inputEnabled = true;
        		this.gameModeShareBtn.input.useHandCursor = true;
        		this.gameModeShareBtn.events.onInputDown.add(function()
        		{
        			this.clickSound = this.add.audio('ClickSound');
                	this.clickSound.play();
        			//if(appConfig.cordova && !appConfig.browser)
        			//{
        				nativeApp.ShareApp();
        			//}

        		},this);

		this.avatar = this.add.sprite(100,21,'avatar');
		this.avatar.scale.setTo(0.21);
		this.avatar.anchor.setTo(0.5);

	},

	secondsToHms:function(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60); 
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "0 hr, ";
    var mDisplay = m > 0 ? m + (m == 1 ? " min " : " mins ") : "0 min ";
    //var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " sec") : "";
    //return hDisplay + mDisplay + sDisplay; 
    return hDisplay + mDisplay; 
},

	afterDataFetched:function(game){

		//alert(this.responseData.status)

		this.practiceModeTime = parseInt(this.responseData.PMST);
		//this.challengeModeTime = parseInt(this.responseData.CMST);

		if(isNaN(this.practiceModeTime))
			this.practiceModeTime = 0;
		if(isNaN(this.challengeModeTime))
			this.challengeModeTime = 0;


		this.practiceModeTime = this.secondsToHms(this.practiceModeTime);
		//this.challengeModeTime = this.secondsToHms(this.challengeModeTime);

		this.cnumbersensePlayedFromServer = parseInt(this.responseData.CNS);
		this.cmeasurementPlayedFromServer = parseInt(this.responseData.CM);
		this.cnumberoperationPlayedFromServer = parseInt(this.responseData.CNO);

		// this.cnumbersPlayedFromServer = parseInt(this.responseData.CNSN);
		// this.csequencePlayedFromServer = parseInt(this.responseData.CNSS);
		// this.ccomparisonPlayedFromServer = parseInt(this.responseData.CNSC);
		// this.cplacevaluePlayedFromServer = parseInt(this.responseData.CNSPV);
		// this.cfractionPlayedFromServer = parseInt(this.responseData.CNSF);

		this.cadditionPlayedFromServer = parseInt(this.responseData.CNOA);
		this.csubtractionPlayedFromServer = parseInt(this.responseData.CNOS);
		this.cmultiplicationPlayedFromServer = parseInt(this.responseData.CNOM);
		this.cdivisionPlayedFromServer = parseInt(this.responseData.CNOD);

		this.clengthPlayedFromServer = parseInt(this.responseData.CML);
		this.cweightPlayedFromServer = parseInt(this.responseData.CMW);
		this.ctimePlayedFromServer = parseInt(this.responseData.CMTi);
		this.cvolumePlayedFromServer = parseInt(this.responseData.CMV);


		this.numbersensePersent = Math.round((parseInt(this.responseData.PNS)/this.numberSystemsTotal)*100);
		this.algebraPersent = Math.round((parseInt(this.responseData.PALG)/this.algebraTotal)*100);//PALG
		this.geometryPersent = Math.round((parseInt(this.responseData.PGM)/this.geometryTotal)*100);

		// this.shapesPersent = Math.round((parseInt(this.responseData.PSG)/this.shapesTotal)*100);
		// this.datahandlingPersent = Math.round((parseInt(this.responseData.PDH)/this.datahandlingTotal)*100);


		// this.cnumbersensePersent = Math.round((parseInt(this.responseData.CNS)/this.cnumberSenseTotal)*100);
		// this.calgebraPersent = Math.round((parseInt(this.responseData.CM)/this.calgebraTotal)*100);
		// this.cnumberoperationPersent = Math.round((parseInt(this.responseData.CNO)/this.cnumberoperationTotal)*100);
		

		// this.passcount = parseInt(this.responseData.CNSP);
		// this.failcount = parseInt(this.responseData.CNSFF);
		// this.hintcount = parseInt(this.responseData.CNSH);
		// this.totalgameplayed = parseInt(this.responseData.CNST);

		// this.passcount1 = parseInt(this.responseData.CMP);
		// this.failcount1 = parseInt(this.responseData.CMF);
		// this.hintcount1 = parseInt(this.responseData.CMH);
		// this.totalgameplayed1 = parseInt(this.responseData.CMT);

		// this.passcount2 = parseInt(this.responseData.CNOP);
		// this.failcount2 = parseInt(this.responseData.CNOF);
		// this.hintcount2 = parseInt(this.responseData.CNOH);
		// this.totalgameplayed2 = parseInt(this.responseData.CNOT);


		// if(isNaN(this.hintcount))
		// 	this.hintcount = 0;
		// if(isNaN(this.hintcount1))
		// 	this.hintcount1 = 0;
		// if(isNaN(this.hintcount2))
		// 	this.hintcount2 = 0;

		

		// if(this.hintcount > this.passcount)
        //     this.passcount = this.hintcount+2;
        // if(this.hintcount1 > this.passcount1)
        //     this.passcount1 = this.hintcount1+2;
        // if(this.hintcount2 > this.passcount2)
        // //     this.passcount2 = this.hintcount2+2;


		// console.log("1 "+this.passcount);
		// console.log("2 "+this.hintcount);
		// console.log("3 "+this.numbersensescoreTotal);
		// console.log("4 "+this.totalgameplayed);

			
		// 	if(this.totalgameplayed>0)
		// 		this.numbersenseScore = Math.round((((this.passcount*5)-(this.hintcount*3))/((this.passcount*5)+this.failcount))*100);
		// 	if(this.totalgameplayed1>0)
		// 		this.measurementScore = Math.round((((this.passcount1*5)-(this.hintcount1*3))/((this.passcount1*5)+this.failcount1))*100);
		// 	if(this.totalgameplayed2>0)
		// 		this.numberoperationScore = Math.round((((this.passcount2*5)-(this.hintcount2*3))/((this.passcount2*5)+this.failcount2))*100);
			
			
		console.log(this.numbersenseScore, this.measurementScore, this.numberoperationScore);

		var practiceText = "Practice";
		var challengeText = "Challenge";
		var TotalLearningText = "Total learning time";
		var completedText = "Completed";
		var scoreText = "Score";

		if(window.languageSelected == "Kannada")
		{
			practiceText = "ಪ್ರಾಕ್ಟೀಸ್";
			challengeText = "ಚಾಲೆಂಜ್";
			TotalLearningText = "ಒಟ್ಟು ಕಲಿಕೆಯ ಸಮಯ :";
			completedText = "ಪೂರ್ಣ";
			scoreText = "ಅಂಕ";
		}
		else if(window.languageSelected == "Hindi")
		{
			practiceText = "प्रैक्टिस";
			challengeText = "चैलेंज";
			TotalLearningText = "कुल सीखने का समय :";
			completedText = "पूर्ण";
			scoreText = "स्कोर";
		}
		else if(window.languageSelected == "Odiya")
		{
			practiceText = "ପ୍ରାକ୍ଟିସ";
			challengeText = "ଚ୍ୟାଲେଞ୍ଜ";
			TotalLearningText = "ଟୋଟାଲ  ଲେଆର୍ନିଙ୍ଗ  ର୍ଟମେ :";
			completedText = "ସମ୍ପୂର୍ଣ୍ଣ";
			scoreText = "ପ୍ରାପ୍ତାଙ୍କ";
		}
		else if(window.languageSelected == "Gujarati")
		{
			practiceText = "અભ્યાસ";
			challengeText = "પડકાર";
			TotalLearningText = "કુલ ભણવાનો સમય :";
			completedText = "પૂર્ણ";
			scoreText = "આંક";
		}
		else
		{
			practiceText = "Practice";
			challengeText = "Challenge";
			TotalLearningText = "Total learning time :";
			completedText = "Completed";
			scoreText = "Score";
		}

		this.graphics = game.add.graphics(10, 50);
		this.graphics.lineStyle(2, 0x000000, 1);
		this.graphics.beginFill(0xFFFF0B,0.5);
    	this.graphics.drawRect(50, 10, 400, 40);

    	// this.graphics1 = game.add.graphics(450, 50);
		// this.graphics1.lineStyle(2, 0x000000, 1);
		// this.graphics1.beginFill(0xFFFF0B,0.5);
    	// this.graphics1.drawRect(50, 10, 400, 40);

    	this.graphics2 = game.add.graphics(10, 90);
		this.graphics2.lineStyle(2, 0x000000, 1);
		this.graphics2.beginFill(0xFFFFFF,1);
    	this.graphics2.drawRect(50, 10, 400, 430);

    	// this.graphics3 = game.add.graphics(450, 90);
		// this.graphics3.lineStyle(2, 0x000000, 1);
		// this.graphics3.beginFill(0xFFFFFF,1);
    	// this.graphics3.drawRect(50, 10, 400, 430);

    	// this.graphics4 = game.add.graphics(10, 120);
		// this.graphics4.lineStyle(2, 0x000000, 1);
		// //this.graphics2.beginFill(0xFFFF0B,0.5);
    	// this.graphics4.drawRect(70, 10, 360, 390);

    	// this.graphics5 = game.add.graphics(450, 120);
		// this.graphics5.lineStyle(2, 0x000000, 1);
		// //this.graphics2.beginFill(0xFFFF0B,0.5);
    	// this.graphics5.drawRect(70, 10, 360, 390);


		this.practicemodeTxt = this.add.text(140, 80,practiceText);
		this.practicemodeTxt.anchor.setTo(0.5);
		this.practicemodeTxt.align = 'center';
		this.practicemodeTxt.fontSize = 32;
		this.practicemodeTxt.fontWeight = 'normal';
		this.practicemodeTxt.fill = '#000000';
		this.practicemodeTxt.wordWrap = true;
		this.practicemodeTxt.wordWrapWidth = 500;

		this.practicemodeTotalLearningTimeTxt = this.add.text(180, 118,TotalLearningText);
		this.practicemodeTotalLearningTimeTxt.anchor.setTo(0.5);
		this.practicemodeTotalLearningTimeTxt.align = 'center';
		this.practicemodeTotalLearningTimeTxt.fontSize = 24;
		this.practicemodeTotalLearningTimeTxt.fontWeight = 'normal';
		this.practicemodeTotalLearningTimeTxt.fill = '#000000';
		this.practicemodeTotalLearningTimeTxt.wordWrap = true;
		this.practicemodeTotalLearningTimeTxt.wordWrapWidth = 500;

		this.timeIcon = game.add.sprite(320,116,'timeIcon');
    	this.timeIcon.frame = 0;
    	this.timeIcon.anchor.setTo(0.5);
    	this.timeIcon.scale.setTo(1.2);

    	//alert(this.practiceModeTime);

    	this.practicemodeTimeTxt = this.add.text(400, 118,this.practiceModeTime);
		this.practicemodeTimeTxt.anchor.setTo(0.5);
		this.practicemodeTimeTxt.align = 'center';
		this.practicemodeTimeTxt.fontSize = 18;
		this.practicemodeTimeTxt.fontWeight = 'normal';
		this.practicemodeTimeTxt.fill = '#000000';
		this.practicemodeTimeTxt.wordWrap = true;
		this.practicemodeTimeTxt.wordWrapWidth = 500;

    	this.addScrollingtouserprogress(game, completedText);

	},

	addScrollingtouserprogress:function(game, completedText)
	{

		_this.groupScroll = _this.add.group();

		this.numberSenseTree = game.add.sprite(160,190,'MicroConceptTree');
    	this.numberSenseTree.frame = 0;
    	this.numberSenseTree.anchor.setTo(0.5);
    	this.numberSenseTree.scale.setTo(0.85,0.42);
    	this.numberSenseTree.inputEnabled = true;
    	this.numberSenseTree.events.onInputDown.add(function(){
    		this.clickSound = this.add.audio('ClickSound');
        	this.clickSound.play();
    		this.state.start('userprogress2',true,false,"Number Systems",this.responseData,this.responseData);
    	},this);

    	this.numberSenseTreeTxt = this.add.text(160, 180, window.selctedLang.McTopicText1);
		this.numberSenseTreeTxt.anchor.setTo(0.5);
		this.numberSenseTreeTxt.align = 'center';
		this.numberSenseTreeTxt.fontSize = 12;
		this.numberSenseTreeTxt.fontWeight = 'normal';
		this.numberSenseTreeTxt.fill = '#FFFFFF';
		this.numberSenseTreeTxt.wordWrap = true;
		this.numberSenseTreeTxt.wordWrapWidth = 500;

    	this.algebraTree = game.add.sprite(160,285,'MicroConceptTree');//285
    	this.algebraTree.frame = 1;
    	this.algebraTree.anchor.setTo(0.5);
    	this.algebraTree.scale.setTo(0.7,0.38);
    	this.algebraTree.inputEnabled = true;
    	this.algebraTree.events.onInputDown.add(function(){
    		this.clickSound = this.add.audio('ClickSound');
        	this.clickSound.play();
    		this.state.start('userprogress2',true,false,"Algebra",this.responseData,this.responseData);
    	},this);

    	this.algebraTreeTxt = this.add.text(160, 275, window.selctedLang.McTopicText2);//275
		this.algebraTreeTxt.anchor.setTo(0.5);
		this.algebraTreeTxt.align = 'center';
		this.algebraTreeTxt.fontSize = 12;
		this.algebraTreeTxt.fontWeight = 'normal';
		this.algebraTreeTxt.fill = '#FFFFFF';
		this.algebraTreeTxt.wordWrap = true;
		this.algebraTreeTxt.wordWrapWidth = 500;

    	this.geometryTree = game.add.sprite(160,385,'MicroConceptTree');
    	this.geometryTree.frame = 2;
    	this.geometryTree.anchor.setTo(0.5);
    	this.geometryTree.scale.setTo(0.7,0.38);
    	this.geometryTree.inputEnabled = true;
    	this.geometryTree.events.onInputDown.add(function(){
    		this.clickSound = this.add.audio('ClickSound');
        	this.clickSound.play();
    		this.state.start('userprogress2',true,false,"Geometry",this.responseData,this.responseData);
    	},this);

    	this.geometryTreeTxt = this.add.text(160, 375, window.selctedLang.McTopicText4);
		this.geometryTreeTxt.anchor.setTo(0.5);
		this.geometryTreeTxt.align = 'center';
		this.geometryTreeTxt.fontSize = 12;
		this.geometryTreeTxt.fontWeight = 'normal';
		this.geometryTreeTxt.fill = '#FFFFFF';
		this.geometryTreeTxt.wordWrap = true;
		this.geometryTreeTxt.wordWrapWidth = 500;
		this.geometryTreeTxt.lineSpacing = -10;

    	// this.shapesTree = game.add.sprite(140,480,'MicroConceptTree');
    	// this.shapesTree.frame = 3;
    	// this.shapesTree.anchor.setTo(0.5);
    	// this.shapesTree.scale.setTo(0.6,0.38);

    	// this.shapesTreeTxt = this.add.text(140, 470, window.selctedLang.McTopicText3);
		// this.shapesTreeTxt.anchor.setTo(0.5);
		// this.shapesTreeTxt.align = 'center';
		// this.shapesTreeTxt.fontSize = 12;
		// this.shapesTreeTxt.fontWeight = 'normal';
		// this.shapesTreeTxt.fill = '#FFFFFF';
		// this.shapesTreeTxt.wordWrap = true;
		// this.shapesTreeTxt.wordWrapWidth = 500;

		// this.datahandlingTree = game.add.sprite(140,580,'MicroConceptTree');
    	// this.datahandlingTree.frame = 4;
    	// this.datahandlingTree.anchor.setTo(0.5);
    	// this.datahandlingTree.scale.setTo(0.6,0.38);

    	// this.datahandlingTreeTxt = this.add.text(140, 570, window.selctedLang.McTopicText4);
		// this.datahandlingTreeTxt.anchor.setTo(0.5);
		// this.datahandlingTreeTxt.align = 'center';
		// this.datahandlingTreeTxt.fontSize = 12;
		// this.datahandlingTreeTxt.fontWeight = 'normal';
		// this.datahandlingTreeTxt.fill = '#FFFFFF';
		// this.datahandlingTreeTxt.wordWrap = true;
		// this.datahandlingTreeTxt.wordWrapWidth = 500;

		this.completedTxt = this.add.text(320, 140,completedText);
		this.completedTxt.anchor.setTo(0.5);
		this.completedTxt.align = 'center';
		this.completedTxt.fontSize = 14;
		this.completedTxt.fontWeight = 'normal';
		this.completedTxt.fill = '#000000';
		this.completedTxt.wordWrap = true;
		this.completedTxt.wordWrapWidth = 500;

		this.numbersystemsPrgress = game.add.sprite(320,180,'progressCircle');
    	this.numbersystemsPrgress.frame = this.numbersensePersent-1;
    	this.numbersystemsPrgress.anchor.setTo(0.5);
    	this.numbersystemsPrgress.scale.setTo(1.5);


    	this.numbersystemsPrgress.inputEnabled = true;
    	this.numbersystemsPrgress.events.onInputDown.add(function(){
    		this.clickSound = this.add.audio('ClickSound');
        	this.clickSound.play();
    		this.state.start('userprogress2',true,false,"Number Systems",this.responseData,this.responseData);
    	},this);

    	this.numbersystemsPrgressTxt = this.add.text(320, 180, this.numbersensePersent+'%');
		this.numbersystemsPrgressTxt.anchor.setTo(0.5);
		this.numbersystemsPrgressTxt.align = 'center';
		this.numbersystemsPrgressTxt.fontSize = 20;
		this.numbersystemsPrgressTxt.fontWeight = 'normal';
		this.numbersystemsPrgressTxt.fill = '#000000';
		this.numbersystemsPrgressTxt.wordWrap = true;
		this.numbersystemsPrgressTxt.wordWrapWidth = 500;

		this.numbersystemsPrgressTotalTxt = this.add.text(390, 180, this.responseData.PNS+'/'+this.numberSystemsTotal);
		this.numbersystemsPrgressTotalTxt.anchor.setTo(0.5);
		this.numbersystemsPrgressTotalTxt.align = 'center';
		this.numbersystemsPrgressTotalTxt.fontSize = 20;
		this.numbersystemsPrgressTotalTxt.fontWeight = 'normal';
		this.numbersystemsPrgressTotalTxt.fill = '#000000';
		this.numbersystemsPrgressTotalTxt.wordWrap = true;
		this.numbersystemsPrgressTotalTxt.wordWrapWidth = 500;

    	this.algebraPrgress = game.add.sprite(320,280,'progressCircle');//280
    	this.algebraPrgress.frame = this.algebraPersent-1;
    	this.algebraPrgress.anchor.setTo(0.5);
    	this.algebraPrgress.scale.setTo(1.5);
    	this.algebraPrgress.inputEnabled = true;
    	this.algebraPrgress.events.onInputDown.add(function(){
    		this.clickSound = this.add.audio('ClickSound');
        	this.clickSound.play();
    		this.state.start('userprogress2',true,false,"Algebra",this.responseData,this.responseData);
    	},this);

    	this.algebraPrgressTxt = this.add.text(320, 280, this.algebraPersent+'%');//280
		this.algebraPrgressTxt.anchor.setTo(0.5);
		this.algebraPrgressTxt.align = 'center';
		this.algebraPrgressTxt.fontSize = 20;
		this.algebraPrgressTxt.fontWeight = 'normal';
		this.algebraPrgressTxt.fill = '#000000';
		this.algebraPrgressTxt.wordWrap = true;
		this.algebraPrgressTxt.wordWrapWidth = 500;

		this.algebraPrgressTotalTxt = this.add.text(390, 280, this.responseData.PALG+'/'+this.algebraTotal);
		this.algebraPrgressTotalTxt.anchor.setTo(0.5);
		this.algebraPrgressTotalTxt.align = 'center';
		this.algebraPrgressTotalTxt.fontSize = 20;
		this.algebraPrgressTotalTxt.fontWeight = 'normal';
		this.algebraPrgressTotalTxt.fill = '#000000';
		this.algebraPrgressTotalTxt.wordWrap = true;
		this.algebraPrgressTotalTxt.wordWrapWidth = 500;

    	this.geometryPrgress = game.add.sprite(320,380,'progressCircle');
    	this.geometryPrgress.frame = this.geometryPersent-1;
    	this.geometryPrgress.anchor.setTo(0.5);
    	this.geometryPrgress.scale.setTo(1.5);
    	this.geometryPrgress.inputEnabled = true;
    	this.geometryPrgress.events.onInputDown.add(function(){
    		this.clickSound = this.add.audio('ClickSound');
        	this.clickSound.play();
    		this.state.start('userprogress2',true,false,"Geometry",this.responseData,this.responseData);
    	},this);

    	this.geometryPrgressTxt = this.add.text(320, 380, this.geometryPersent+'%');
		this.geometryPrgressTxt.anchor.setTo(0.5);
		this.geometryPrgressTxt.align = 'center';
		this.geometryPrgressTxt.fontSize = 20;
		this.geometryPrgressTxt.fontWeight = 'normal';
		this.geometryPrgressTxt.fill = '#000000';
		this.geometryPrgressTxt.wordWrap = true;
		this.geometryPrgressTxt.wordWrapWidth = 500;

		this.geometryPrgressTotalTxt = this.add.text(390, 380, this.responseData.PGM+'/'+this.geometryTotal);
		this.geometryPrgressTotalTxt.anchor.setTo(0.5);
		this.geometryPrgressTotalTxt.align = 'center';
		this.geometryPrgressTotalTxt.fontSize = 20;
		this.geometryPrgressTotalTxt.fontWeight = 'normal';
		this.geometryPrgressTotalTxt.fill = '#000000';
		this.geometryPrgressTotalTxt.wordWrap = true;
		this.geometryPrgressTotalTxt.wordWrapWidth = 500;

    	// this.shapesPrgress = game.add.sprite(320,480,'progressCircle');
    	// this.shapesPrgress.frame = this.shapesPersent-1;
    	// this.shapesPrgress.anchor.setTo(0.5);
    	// this.shapesPrgress.scale.setTo(1.5);

    	// this.shapesPrgressTxt = this.add.text(320, 480, this.shapesPersent+'%');
		// this.shapesPrgressTxt.anchor.setTo(0.5);
		// this.shapesPrgressTxt.align = 'center';
		// this.shapesPrgressTxt.fontSize = 20;
		// this.shapesPrgressTxt.fontWeight = 'normal';
		// this.shapesPrgressTxt.fill = '#000000';
		// this.shapesPrgressTxt.wordWrap = true;
		// this.shapesPrgressTxt.wordWrapWidth = 500;

		// this.shapesPrgressTotalTxt = this.add.text(390, 480, this.responseData.PSG+'/'+this.shapesTotal);
		// this.shapesPrgressTotalTxt.anchor.setTo(0.5);
		// this.shapesPrgressTotalTxt.align = 'center';
		// this.shapesPrgressTotalTxt.fontSize = 20;
		// this.shapesPrgressTotalTxt.fontWeight = 'normal';
		// this.shapesPrgressTotalTxt.fill = '#000000';
		// this.shapesPrgressTotalTxt.wordWrap = true;
		// this.shapesPrgressTotalTxt.wordWrapWidth = 500;

		// this.datahandlingPrgress = game.add.sprite(320,580,'progressCircle');
    	// this.datahandlingPrgress.frame = this.datahandlingPersent-1;
    	// this.datahandlingPrgress.anchor.setTo(0.5);
    	// this.datahandlingPrgress.scale.setTo(1.5);

    	// this.datahandlingPrgressTxt = this.add.text(320, 580, this.datahandlingPersent+'%');
		// this.datahandlingPrgressTxt.anchor.setTo(0.5);
		// this.datahandlingPrgressTxt.align = 'center';
		// this.datahandlingPrgressTxt.fontSize = 20;
		// this.datahandlingPrgressTxt.fontWeight = 'normal';
		// this.datahandlingPrgressTxt.fill = '#000000';
		// this.datahandlingPrgressTxt.wordWrap = true;
		// this.datahandlingPrgressTxt.wordWrapWidth = 500;

		// this.datahandlingPrgressTotalTxt = this.add.text(390, 580, this.responseData.PDH+'/'+this.datahandlingTotal);
		// this.datahandlingPrgressTotalTxt.anchor.setTo(0.5);
		// this.datahandlingPrgressTotalTxt.align = 'center';
		// this.datahandlingPrgressTotalTxt.fontSize = 20;
		// this.datahandlingPrgressTotalTxt.fontWeight = 'normal';
		// this.datahandlingPrgressTotalTxt.fill = '#000000';
		// this.datahandlingPrgressTotalTxt.wordWrap = true;
		// this.datahandlingPrgressTotalTxt.wordWrapWidth = 500;


		_this.swipeUpFlag = true;
		_this.swipeDownFlag = false;

		_this.graphicsBg = _this.add.graphics(0, 0);
		_this.graphicsBg.lineStyle(0, 0xFFFFFF, 0.8);
		_this.graphicsBg.beginFill(0xA24098, 0);
		_this.graphicsBg.drawRect(70, 10, 350, 800);
		_this.graphicsBg.boundsPadding = 0;

		_this.mask = _this.add.graphics(10, 135);
		_this.mask.lineStyle(0, 0xFFFFFF, 0);
		_this.mask.beginFill(0xA24098, 1);
		_this.mask.drawRect(70, 10, 360, 375);
		_this.mask.boundsPadding = 0;

		_this.graphicsBg.mask = _this.mask;


		_this.graphicsBg.addChild(this.numberSenseTree);
		_this.graphicsBg.addChild(this.numberSenseTreeTxt);
		
		_this.graphicsBg.addChild(this.geometryTree);
		_this.graphicsBg.addChild(this.geometryTreeTxt);

		_this.graphicsBg.addChild(this.algebraTree);
		_this.graphicsBg.addChild(this.algebraTreeTxt);

		_this.graphicsBg.addChild(this.numbersystemsPrgress);
		_this.graphicsBg.addChild(this.numbersystemsPrgressTxt);
		_this.graphicsBg.addChild(this.numbersystemsPrgressTotalTxt);
	
		_this.graphicsBg.addChild(this.algebraPrgress);
		_this.graphicsBg.addChild(this.algebraPrgressTxt);
		_this.graphicsBg.addChild(this.algebraPrgressTotalTxt);
	
		_this.graphicsBg.addChild(this.geometryPrgress);
		_this.graphicsBg.addChild(this.geometryPrgressTxt);
		_this.graphicsBg.addChild(this.geometryPrgressTotalTxt);

		_this.scrollWhite = _this.add.sprite(425,130,'scrollWhite');
		_this.scrollBlack = _this.add.sprite(428,135,'scrollBlack');

		_this.graphicsBg.inputEnabled = true;
		_this.graphicsBg.input.enableDrag();
		_this.graphicsBg.input.allowHorizontalDrag = false;
		_this.graphicsBg.events.onDragUpdate.add(function(target){
			console.log(_this.graphicsBg.y);

			if(_this.graphicsBg.y>0)
				_this.graphicsBg.y = 0;
			if(_this.graphicsBg.y<-95)
				_this.graphicsBg.y = -95;

			/*if(_this.scrollBlack.y>-47){
				_this.scrollBlack.y = 210;
				_this.graphicsBg.y = -95;
			}
			else if(_this.scrollBlack.y<-47){
				_this.scrollBlack.y = 135;
				_this.graphicsBg.y = 0;
			}*/

		},true);

		_this.scrollBlack.inputEnabled = true;

    	_this.scrollBlack.input.enableDrag();
		_this.scrollBlack.input.allowHorizontalDrag = false;
		_this.scrollBlack.events.onDragUpdate.add(function(target){
			console.log(_this.scrollBlack.y);
			
			
			if(_this.scrollBlack.y<135)
				_this.scrollBlack.y = 135;

			if(_this.scrollBlack.y>210)
				_this.scrollBlack.y = 210;

			if(_this.scrollBlack.y>172){
				_this.scrollBlack.y = 210;
				_this.graphicsBg.y = -95;
			}
			else if(_this.scrollBlack.y<172){
				_this.scrollBlack.y = 135;
				_this.graphicsBg.y = 0;
			}


		},true);
		
	},

}
