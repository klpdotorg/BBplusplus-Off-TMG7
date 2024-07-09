var telInitializer2 = {

	saveGameplayReturnedValue : null,
	gameID : null,
	saveGamePlayObj:null,
	saveAsmentObj:null,
	saveWallet:null,
	assessmentArray:[],
	questionId : null,
	hintCount : 0,
	screenCount : 0,
	seconds : 1,
	numberOfAttempts : 0,

	storeGameID :null,

	gameIdInit2:function(setGameID,gameMode)
	{
		window.prevScreen = "gameScreen";
		
		this.screenCount = 0;
		this.seconds = 1;
		this.numberOfAttempts = 0;
		this.assessmentArray = [];

		this.gameID = setGameID;

		this.storeGameID = this.gameID;
		nativeApp.startChallengeActivity(this.gameID);

		this.tele_saveGamePlay2();
	},

	gameQuestionStart:function(game,qid)
	{

		this.questionId = qid;
		
		if(this.questionId == "undefined"||this.questionId == undefined||this.questionId == null||this.questionId == "")
			this.questionId = 1;

		this.questionTimer = game.time.create(false);
		this.questionTimer.loop(1000, function(){
            this.seconds++;
        }, this);
  		this.questionTimer.start();

  		
	},

	gameCorrectAns:function(game,object)
	{
		this.numberOfAttempts++;
		this.screenCount++;
		telInitializer2.tele_saveAssessment2(this.questionId,"yes",this.seconds,this.numberOfAttempts,this.screenCount);

		if(this.questionTimer)
		{
			this.questionTimer.stop();
			this.questionTimer = null;

			this.seconds = 1;
			this.numberOfAttempts = 0;
		}
	},

	gameWrongAns:function(game,object)
	{
		this.numberOfAttempts++;
		this.screenCount++;
		telInitializer2.tele_saveAssessment2(this.questionId,"no",this.seconds,this.numberOfAttempts,this.screenCount);

		if(this.questionTimer)
		{
			this.questionTimer.stop();
			this.questionTimer = null;

			this.seconds = 1;
			this.numberOfAttempts = 0;
		}

	},

	tele_saveGamePlay2:function()
	{
	    this.saveGamePlayObj = {
	    	id_game:this.gameID, 
	    	avatarname:window.avatarName, 
	    	deviceid: window.deviceId, 
	    	start_time: this.timeSaveFunc(),
	    	hints: "0"
	    };

	    

	},


	tele_saveAssessment2:function(question_id, pass_type, time_to_answer, attempts, screenCount)
	{
		nativeApp.screenViewStringPass("Challenge_screen","Challenge_screen");

		this.qID = this.gameID+"-Q"+question_id+"#SCR-"+screenCount;
	    this.saveAsmentObj = 
	    { 
			id_game_play: this.saveGameplayReturnedValue,
			id_question: this.qID,  
			pass: pass_type,
			time2answer: time_to_answer,
			attempts: attempts,
			date_time_submission: this.timeSaveFunc(), 
			avatarname: window.avatarName, 
	    	deviceid: window.deviceId 
	    };
			
	    //abbchmprmdsjsapi.chm_saveAssessment(this.saveAsmentObj);
	    this.assessmentArray.push(this.saveAsmentObj);
	},

	tele_saveWallet:function(score)
	{

		this.saveWallet = 
	    { 
			avatarname: this.avatarName, 
	    	deviceid: this.deviceId,
	    	score:window.score,
	    	datetime_lastupdated:this.timeSaveFunc()
	    };
			
	    abbchmprmdsjsapi.chm_saveWalletscore(saveWallet);

	},

	syncToServer:function()
	{
		//abbchmprmdsjsapi.syncTelemetryData()

		if(this.hintCount == 0)
			this.hintCount = 1;

		this.saveGamePlayObj.hints = this.hintCount;

		this.hintCount = 0;

		//console.log(this.saveGamePlayObj);

		this.saveGameplayReturnedValue = abbchmprmdsjsapi.chm_saveGameplay(this.saveGamePlayObj);

		for(var i=0;i<this.assessmentArray.length;i++)
		{
			this.assessmentArray[i].id_game_play = this.saveGameplayReturnedValue;
			abbchmprmdsjsapi.chm_saveAssessment(this.assessmentArray[i]);
			
		}
		
		this.saveWallet = 
	    { 
			avatarname: window.avatarName, 
	    	deviceid: window.deviceId,
	    	score:window.score,
	    	datetime_lastupdated:this.timeSaveFunc()
	    };

		abbchmprmdsjsapi.chm_saveWalletscore(this.saveWallet);
	},



	timeSaveFunc : function()
		{
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1;//January is 0, so always add + 1

			var yyyy = today.getFullYear();
			if(dd<10){dd='0'+dd}
			if(mm<10){mm='0'+mm}
			
			var hr = today.getHours();
			var min = today.getMinutes();
			var sec = today.getSeconds();
			
			//today = mm+'/'+dd+'/'+yyyy+' '+hr+':'+min+':'+sec;
			today = yyyy+':'+mm+':'+dd+':'+hr+':'+min+':'+sec;
			return today;
		},

		finishChallengeActivityToFirebase:function()
		{
		     console.log("finishChallengeActivityToFirebase"+this.storeGameID);
		     nativeApp.finishChallengeActivity(this.storeGameID);

            window.rateCount++;
		     setTimeout(function(){
                             if(localStorage.getItem("FirstTimeRate")=="false")
                              {
                                 window.rateCount = 0;
                                 nativeApp.RateApp();
                                 localStorage.setItem("FirstTimeRate", "true");
                             }

                             if(window.rateCount == 5){
                                 window.rateCount = 0;
                                 nativeApp.RateApp();
                             }
                         }, 500);
		}




};

