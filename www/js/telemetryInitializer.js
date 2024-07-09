var telInitializer = {

	saveGameplayReturnedValue: null,
	gameID: null,

	passStringToWebView: null,
	checkForSix: null,

	gameIdInit: function (gameName, grade) {
		window.prevScreen = "gameScreen";
		console.log(gameName, grade);
		saveGameplayReturnedValue = null;
		gameID = null;

		checkForSix = 0;

		if (gameName == null || gameName == "" || gameName == undefined || gameName == NaN) {
			//alert("game name is not proper");
		}
		else if (grade == null || grade == "" || grade == undefined || grade == NaN) {
			//alert("grade is not proper");
		}

		switch (gameName) {
			case "AL_MAZE_G6":
				gameID = "AL_MAZE_G6";
				break;
			case "AL_MEM_G6":
				gameID = "AL_MEM_G6";
				break;
			case "ALA_01_G6":
				gameID = "ALA_01_G6";
				break;
			case "ALAS_01_G6":
				gameID = "ALAS_01_G6";
				break;
			case "ALD_01_G6":
				gameID = "ALD_01_G6";
				break;
			case "ALM_01_G6":
				gameID = "ALM_01_G6";
				break;
			case "ALM_02_G6":
				gameID = "ALM_02_G6";
				break;
			case "ALP_01_G6":
				gameID = "ALP_01_G6";
				break;
			case "ALP_02_G6":
				gameID = "ALP_02_G6";
				break;
			case "ALS_01_G6":
				gameID = "ALS_01_G6";
				break;
			case "ALS_02_G6":
				gameID = "ALS_02_G6";
				break;
			case "GMPAR_01_G6":
				gameID = "GMPAR_01_G6";
				break;
			case "GMAN_01_G6":
				gameID = "GMAN_01_G6";
				break;
			case "GMCR_01_G6":
				gameID = "GMCR_01_G6";
				break;
			case "GMR_01_G6":
				gameID = "GMR_01_G6";
				break;
			case "GMS_01_G6":
				gameID = "GMS_01_G6";
				break;
			case "GMS_02_G6":
				gameID = "GMS_02_G6";
				break;
			case "GMS_03_G6":
				gameID = "GMS_03_G6";
				break;
			case "NSN_FM_1_G6":
				gameID = "NSN_FM_1_G6";
				break;
			case "NSN_FM_3_G6":
				gameID = "NSN_FM_3_G6";
				break;
			case "NSN_FM_4A_G6":
				gameID = "NSN_FM_4A_G6";
				break;
			case "NSN_HCF_1_G6":
				gameID = "NSN_HCF_1_G6";
				break;
			case "NS_INT_1_G6":
				gameID = "NS_INT_1_G6";
				break;

			case "NS_INT_5_G6":
				gameID = "NS_INT_5_G6";
				break;
			case "NS_INT_3_G6":
				gameID = "NS_INT_3_G6";
				break;
			case "NS_INT_5H_G6":
				gameID = "NS_INT_5H_G6";
				break;
			case "NS_INT_6_G6":
				gameID = "NS_INT_6_G6";
				break;
			case "NS_INT_6H_G6":
				gameID = "NS_INT_6H_G6";
				break;
			case "NS_INT_7_G6":
				gameID = "NS_INT_7_G6";
				break;
			case "NS_INT_8_G6":
				gameID = "NS_INT_8_G6";
				break;
			case "NS_INT_9_G6":
				gameID = "NS_INT_9_G6";
				break;
			case "NS_INT_10_G6":
				gameID = "NS_INT_10_G6";
				break;
			case "NS_INT_11_G6":
				gameID = "NS_INT_11_G6";
				break;
			case "NS_INT_12_G6":
				gameID = "NS_INT_12_G6";
				break;
			case "NS_INT_13H_G6":
				gameID = "NS_INT_13H_G6";
				break;
			case "NS_INT_14H_G6":
				gameID = "NS_INT_14H_G6";
				break;
			case "NSN_LCM_1_G6":
				gameID = "NSN_LCM_1_G6";
				break;
			case "NSN_OE_1_G6":
				gameID = "NSN_OE_1_G6";
				break;
			case "NSN_PRM_1_G6":
				gameID = "NSN_PRM_1_G6";
				break;
			case "NSD_01_G6":
				gameID = "NSD_01_G6";
				break;
			case "NSD_3A_G6":
				gameID = "NSD_3A_G6";
				break;
			case "NSD_3B_G6":
				gameID = "NSD_3B_G6";
				break;
			case "NSD_2A_G6":
				gameID = "NSD_2A_G6";
				break;
			case "NSD_2B_G6":
				gameID = "NSD_2B_G6";
				break;
			case "NSD_4B_G6":
				gameID = "NSD_4B_G6";
				break;
			case "NSD_4A_G6":
				gameID = "NSD_4A_G6";
				break;
			case "NSD_4C_G6":
				gameID = "NSD_4C_G6";
				break;
			case "NSD_4D_G6":
				gameID = "NSD_4D_G6";
				break;
			case "NSD_4E_G6":
				gameID = "NSD_4E_G6";
				break;
			case "NSD_5A_G6":
				gameID = "NSD_5A_G6";
				break;
			case "NSD_5B_G6":
				gameID = "NSD_5B_G6";
				break;
			case "NSD_6A_G6":
				gameID = "NSD_6A_G6";
				break;
			case "NSD_6B_G6":
				gameID = "NSD_6B_G6";
				break;
			case "NSF_1A_G6":
				gameID = "NSF_1A_G6";
				break;
			case "NSF_2_G6":
				gameID = "NSF_2_G6";
				break;
			case "NSF_3_G6":
				gameID = "NSF_3_G6";
				break;
			case "NSF_4_G6":
				gameID = "NSF_4_G6";
				break;
			case "NSF_5_G6":
				gameID = "NSF_5_G6";
				break;
			case "NSF_6_G6":
				gameID = "NSF_6_G6";
				break;
			case "NSF_7_G6":
				gameID = "NSF_7_G6";
				break;
			case "NSF_8_G6":
				gameID = "NSF_8_G6";
				break;
			case "NSF_9A_G6":
				gameID = "NSF_9A_G6";
				break;
			case "NSF_10_G6":
				gameID = "NSF_10_G6";
				break;
			case "NSF_11_G6":
				gameID = "NSF_11_G6";
				break;
			case "NSF_12_G6":
				gameID = "NSF_12_G6";
				break;
			case "NSF_13_G6":
				gameID = "NSF_13_G6";
				break;
			case "NSF_14_G6":
				gameID = "NSF_14_G6";
				break;
			case "NSF_15_G6":
				gameID = "NSF_15_G6";
				break;
			case "NSRP_1_G6":
				gameID = "NSRP_1_G6";
				break;
			case "NSRP_2_G6":
				gameID = "NSRP_2_G6";
				break;
			case "NSRP_3_G6":
				gameID = "NSRP_3_G6";
				break;
			case "AL_SUB_G7":
				gameID = "AL_SUB_G7";
				break;
			case "AL_ADD_G7":
				gameID = "AL_ADD_G7";
				break;
			case "AL_ES_G7":
				gameID = "AL_ES_G7";
				break;
			case "NS_INT_DI_1_G7":
				gameID = "NS_INT_DI_1_G7";
				break;
			case "AL_SIM_G7":
				gameID = "AL_SIM_G7";
				break;
			case "NS_INT_DI_2_G7":
				gameID = "NS_INT_DI_2_G7";
				break;
			case "NS_INT_DI_3_G7":
				gameID = "NS_INT_DI_3_G7";
				break;
			case "NS_INT_DI_4_G7":
				gameID = "NS_INT_DI_4_G7";
				break;
			case "NS_INT_ML_1_G7":
				gameID = "NS_INT_ML_1_G7";
				break;
			case "NS_INT_ML_2_G7":
				gameID = "NS_INT_ML_2_G7";
				break;
			case "NS_INT_ML_3_G7":
				gameID = "NS_INT_ML_3_G7";
				break;
			case "NS_INT_ML_4_G7":
				gameID = "NS_INT_ML_4_G7";
				break;
			case "NSD_1_G7":
				gameID = "NSD_1_G7";
				break;
			case "NSD_2_G7":
				gameID = "NSD_2_G7";
				break;
			case "NSD_3_G7":
				gameID = "NSD_3_G7";
				break;
			case "NSD_4_G7":
				gameID = "NSD_4_G7";
				break;
			case "NSD_5_G7":
				gameID = "NSD_5_G7";
				break;
			case "NSF_ADSB_G7":
				gameID = "NSF_ADSB_G7";
				break;
			case "NSF_CUIS_G7":
				gameID = "NSF_CUIS_G7";
				break;
			case "NSF_DFF_G7":
				gameID = "NSF_DFF_G7";
				break;
			case "NSF_DFW_G7":
				gameID = "NSF_DFW_G7";
				break;
			case "NSF_DWF_G7":
				gameID = "NSF_DWF_G7";
				break;
			case "NSF_MLP_01_G7":
				gameID = "NSF_MLP_01_G7";
				break;
			case "NSF_MLP_02_G7":
				gameID = "NSF_MLP_02_G7";
				break;
			case "NSF_MLP_03_G7":
				gameID = "NSF_MLP_03_G7";
				break;
			case "NSF_UNLAD_G7":
				gameID = "NSF_UNLAD_G7";
				break;
			case "NSF_UNLSB_G7":
				gameID = "NSF_UNLSB_G7";
				break;

			case "AL_SORT1_G7":
				gameID = "AL_SORT1_G7";
				break;
			case "AL_SORT2_G7":
				gameID = "AL_SORT2_G7";
				break;
			case "AL_TAR_G7":
				gameID = "AL_TAR_G7";
				break;
			case "GM_PYTH_G7":
				gameID = "GM_PYTH_G7";
				break;
			case "GMLA_01_G7":
				gameID = "GMLA_01_G7";
				break;
			case "GMLA_02_G7":
				gameID = "GMLA_02_G7";
				break;
			case "GMLA_03_G7":
				gameID = "GMLA_03_G7";
				break;
			case "GMLA_04_G7":
				gameID = "GMLA_04_G7";
				break;
			case "GMLA_05_G7":
				gameID = "GMLA_05_G7";
				break;
			case "GMLA_06_G7":
				gameID = "GMLA_06_G7";
				break;
			case "GMLA_07_G7":
				gameID = "GMLA_07_G7";
				break;
			case "GMSS_01_G7":
				gameID = "GMSS_01_G7";
				break;
			case "NSD_6_G7":
				gameID = "NSD_6_G7";
				break;
			case "GMSS_02_G7":
				gameID = "GMSS_02_G7";
				break;
			case "GMSS_03_G7":
				gameID = "GMSS_03_G7";
				break;
			case "GMSS_04_G7":
				gameID = "GMSS_04_G7";
				break;

		}

		////alert(gameID);

		if (gameID == null || gameID == "" || gameID == undefined) {
			//alert("game id is not proper");
		}

		// if(grade==1)
		// {
		// 	gameID = gameID + "-G1"; 
		// }
		// else if(grade==2)
		// {
		// 	gameID = gameID + "-G2"; 
		// }
		// else if(grade==3)
		// {
		// 	gameID = gameID + "-G3"; 
		// }
		// else if(grade==4)
		// {
		// 	gameID = gameID + "-G4"; 
		// }
		// else if(grade==5)
		// {
		// 	gameID = gameID + "-G5"; 
		// }

		passStringToWebView = gameID;

		telInitializer.tele_saveGamePlay(gameID);

	},

	tele_saveGamePlay: function (gameid) {
		//saveGamePlay; /*local variable */
		time = window.timeSaveFunc();
		acss_token = window.acctkn;
		var saveGameplay =
		{
			id_game: gameid,
			avatarname: window.avatarName,
			deviceid: window.deviceId,
			start_time: time
		}



		if (saveGameplay.id_game == null || saveGameplay.id_game == "" || saveGameplay.id_game == undefined) {
			//alert("game id is not proper");
		}
		//alert(saveGameplay.deviceid);
		saveGameplayReturnedValue = abbchmprmdsjsapi.prm_saveGameplay(saveGameplay);
		////alert(saveGameplayReturnedValue);

		nativeApp.startPracticeActivity(passStringToWebView);
	},

	tele_interactEvent: function (gamePlay, access_token, time, question_id, event_type, res_id) {
		var interactEvent =
		{
			id_game_play: gamePlay,
			id_question: question_id,
			date_time_event: time,
			event_type: event_type,
			res_id: res_id,
			access_token: access_token
		}
		//absdsjsapi.saveInteractEvent(interactEvent);
	},

	tele_saveAssessment: function (question_id, pass_type, time_to_answer, attempts, screenCount) {
		nativeApp.screenViewStringPass("Practice_screen", "Practice_screen");
		checkForSix++;
		if (checkForSix == 6) {
			nativeApp.screenViewStringPass("practice_completion_screen", "practice_completion_screen");
			checkForSix = 0;
			nativeApp.finishPracticeActivity(passStringToWebView);

			window.rateCount++;


			setTimeout(function () {
				if (localStorage.getItem("FirstTimeRate") == "false") {
					window.rateCount = 0;
					nativeApp.RateApp();
					localStorage.setItem("FirstTimeRate", "true");
				}

				if (window.rateCount == 5) {
					window.rateCount = 0;
					nativeApp.RateApp();
				}
			}, 500);


		}

		gamePlay = saveGameplayReturnedValue;
		pass_type = "yes";
		time = window.timeSaveFunc();
		acss_token = window.acctkn;

		if (question_id == null || question_id == "" || question_id == undefined) {
			//alert("question id is not proper");
		}
		else if (screenCount == null || screenCount == "" || screenCount == undefined) {
			//alert("screenCount is not proper");
		}

		question_id = gameID + "-Q" + question_id + "#SCR-" + screenCount;

		var saveAsment =
		{
			id_game_play: gamePlay,
			id_question: question_id,
			pass: pass_type,
			time2answer: time_to_answer,
			attempts: attempts,
			date_time_submission: time,
			avatarname: window.avatarName,
			deviceid: window.deviceId
		}



		if (saveAsment.id_question == null || saveAsment.id_question == "" || saveAsment.id_question == undefined) {
			//alert("question id is not proper");
		}
		else if (saveAsment.time2answer == null || saveAsment.time2answer == "" || saveAsment.time2answer == undefined) {
			//alert("time to answer is not proper");
		}
		else if (saveAsment.attempts == null || saveAsment.attempts == "" || saveAsment.attempts == undefined) {
			//alert("attempts to answer is not proper");
		}
		console.log(saveAsment);
		abbchmprmdsjsapi.prm_saveAssessment(saveAsment);

	},



};

