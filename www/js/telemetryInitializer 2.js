var telInitializer2 = {

	saveGameplayReturnedValue : null,
	gameID : null,
	avatarName : "Fish",
	deviceId : "db98cc6d_a60627c5be3e057e",
	qID : null,
	saveGamePlayObj:null,
	saveAsmentObj:null,
	saveWallet:null,

	gameIdInit2:function(setGameID,gameMode)
	{
		this.gameID = setGameID;
		this.tele_saveGamePlay2();
	},

	

	tele_saveGamePlay2:function()
	{
	    this.saveGamePlayObj = {
	    	id_game:this.gameID, 
	    	avatarname:this.avatarName, 
	    	deviceid: this.deviceId, 
	    	start_time: this.timeSaveFunc(),
	    	hints: "0"
	    };

	    //this.saveGameplayReturnedValue = abbchmprmdsjsapi.chm_saveGameplay(saveGamePlayObj);

	},


	tele_saveAssessment2:function(question_id, pass_type, time_to_answer, attempts, screenCount)
	{
		
		this.qID = this.gameID+"-Q"+question_id+"#SCR-"+screenCount;
	    this.saveAsmentObj = 
	    { 
			id_game_play: this.saveGameplayReturnedValue,
			id_question: this.qID,  
			pass: pass_type,
			time2answer: time_to_answer,
			attempts: attempts,
			date_time_submission: this.timeSaveFunc(), 
			avatarname: this.avatarName, 
	    	deviceid: this.deviceId 
	    };
			
	    //abbchmprmdsjsapi.chm_saveAssessment(saveAsmentObj);

	},

	tele_saveWallet:function(score)
	{

		/*this.saveWallet = 
	    { 
			avatarname: this.avatarName, 
	    	deviceid: this.deviceId,
	    	score:window.score,
	    	datetime_lastupdated:this.timeSaveFunc()
	    };*/
			
	    //abbchmprmdsjsapi.chm_saveWalletscore(saveWallet);

	},

	syncToServer:function(hint)
	{
		//abbchmprmdsjsapi.syncTelemetryData()
		this.saveGamePlayObj.hints = hint;
		this.saveGameplayReturnedValue = abbchmprmdsjsapi.chm_saveGameplay(this.saveGamePlayObj);
		this.saveAsmentObj.id_game_play = this.saveGameplayReturnedValue;
		abbchmprmdsjsapi.chm_saveAssessment(this.saveAsmentObj);

		this.saveWallet = 
	    { 
			avatarname: window.avatarName, 
	    	deviceid: window.DeviceID,
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
		}



};

