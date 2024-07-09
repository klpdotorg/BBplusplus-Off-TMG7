Game.score = function (game) {

};

Game.score.prototype = {

	init: function (gameID, microConcepts)//game_id,userHasPlayed,timeInMinutes,timeInSeconds,score,gradeTopics,grade,microConcepts
	{
		_this = this;
		//console.log("sync telemetry"+navigator.connection.type);
		if (navigator.connection.type != "none" && navigator.connection.type != "unknown" && navigator.connection.type != null && navigator.connection.type != "undefined") {
			console.log("sync telemetry" + navigator.connection.type);
			//absdsjsapi.syncTelemetryData();
		}

		document.addEventListener("online", _this.syncTelFunc, false);

		// //Variables used for user progress
		// _this.userHasPlayed = userHasPlayed;
		// _this.timeInMinutes = timeInMinutes;
		// _this.timeInSeconds = timeInSeconds;
		// _this.score = score;
		_this.game_id = gameID;
		// _this.gradeTopics = gradeTopics;
		// _this.grade = grade;
		_this.microConcepts = microConcepts;

		// console.log("inside numbersystems menu",_this.userHasPlayed,_this.timeInMinutes,_this.timeInSeconds,_this.game_id,_this.score);

		// if(_this.userHasPlayed !=0 && _this.timeInMinutes != undefined && _this.timeInSeconds != undefined && _this.game_id != undefined && _this.score != 0 && _this.gradeTopics != undefined && _this.grade != undefined && _this.microConcepts != undefined)
		// {
		// 	var objData = {
		// 		game_id:_this.game_id,
		// 	}
		// 	BBplusplusdbDetails.bbplusplusdbhandler.executeSql('SELECT totalLearingTimeinHrs AS Hrs, totalLearingTimeinMins As Mins, totalLearingTimeinSecs As Secs FROM UserProgress WHERE gameId ="'+objData.game_id+'"', [], this.localdatasuccess, this.localdatafailed);
		// }
	},

	syncTelFunc: function () {
		if (navigator.connection.type != "none" && navigator.connection.type != "unknown" && navigator.connection.type != null && navigator.connection.type != "undefined") {
			console.log("sync telemetry" + navigator.connection.type);
			//absdsjsapi.syncTelemetryData();
		}
	},

	preload: function (game) {
		//this.load.atlas('backbtn','assets/commonAssets/backbtn.png' ,null,score_JSON.backbtnJson);
		this.load.image('CommonHomeBtn', 'assets/homeIconScore.png');
		this.load.image('CommonNextBtn', 'assets/nextIconScore.png');
		this.load.image('CommonReplayBtn', 'assets/replayIconScore.png');
		this.load.image('CommonBackground', 'assets/commonAssets/bg.png');
	},

	create: function (game) {
		_this = this;
		console.log("here");
		//* pass the game id's inside this array.
		_this.nsGamesArray = [];
		_this.algGamesArray = [];
		_this.geometryGamesArray = [];

		_this.background = _this.add.tileSprite(0, -80, _this.world.width, _this.world.height, 'CommonBackground');
		_this.background.scale.setTo(1, 1.5);


		_this.homeBtn = _this.add.sprite(_this.world.centerX - 170, _this.world.centerY, 'CommonHomeBtn');
		//_this.homeBtn.scale.setTo(1);
		_this.homeBtn.anchor.setTo(0.5);
		_this.homeBtn.inputEnabled = true;
		_this.homeBtn.events.onInputDown.add(function () {
			_this.homeBtn.events.onInputDown.removeAll();
			_this.clickSound = _this.add.audio('ClickSound');
			_this.clickSound.play();
			_this.getEachMCconcept();
		}, _this);

		_this.shareBtn = _this.add.sprite(_this.world.centerX - 56, _this.world.centerY, 'shareIconScore');
		//_this.shareBtn.scale.setTo(1);
		_this.shareBtn.anchor.setTo(0.5);
		_this.shareBtn.inputEnabled = true;
		_this.shareBtn.events.onInputDown.add(function () {
			//_this.shareBtn.events.onInputDown.removeAll();
			_this.clickSound = _this.add.audio('ClickSound');
			_this.clickSound.play();
			nativeApp.ShareApp();

		}, _this);


		_this.nextBtn = _this.add.sprite(_this.world.centerX + 170, _this.world.centerY, 'CommonNextBtn');
		//_this.nextBtn.scale.setTo(1);
		_this.nextBtn.anchor.setTo(0.5);
		_this.nextBtn.inputEnabled = true;
		_this.nextBtn.events.onInputDown.add(function () {
			_this.nextBtn.events.onInputDown.removeAll();
			_this.clickSound = _this.add.audio('ClickSound');
			_this.clickSound.play();
			_this.getNextGame();

		}, _this);

		_this.replay = _this.add.button(_this.world.centerX + 56, _this.world.centerY, 'CommonReplayBtn', null, _this, 0, 1, 2);
		//	_this.replay.scale.setTo(1);
		_this.replay.anchor.setTo(0.5);
		_this.replay.inputEnabled = true;
		_this.replay.input.useHandCursor = true;
		_this.replay.events.onInputDown.add(function () {
			_this.replay.events.onInputDown.removeAll();
			_this.clickSound = _this.add.audio('ClickSound');
			_this.clickSound.play();
			_this.getCurrentGame();
		}, _this);

	},

	getEachMCconcept: function () {
		//* when the home btn is clicked check the microconcepts and return back to the menu accordingly
		switch (_this.microConcepts) {
			case 'Number Systems': this.state.start('grade6NumberSystems', true, false);
				break;
			case 'Algebra': this.state.start('grade6Algebra', true, false);
				break;

			case 'Geometry': this.state.start('grade6Geometry', true, false);
				break;
			case 'Number SystemsG7': this.state.start('grade7NumberSystems', true, false);
				break;
			case 'AlgebraG7': this.state.start('grade7Algebra', true, false);
				break;
			case 'GeometryG7': this.state.start('grade7Geometry', true, false);
				break;
		}
	},

	getNextGame: function () {
		//* if there more than 1 sub menu then the last game of that menu will go to the next sub menu first game.
		if (_this.microConcepts == 'Number Systems') {
			switch (_this.game_id) {
				case 'NSN_OE_1_G6': _this.state.start('preloader_fm_1', true, false);
					break;
				case 'NSN_FM_1_G6': _this.state.start('preloader_hcf_1', true, false);
					break;
				case 'NSN_HCF_1_G6': _this.state.start('preloader_prm_1', true, false);
					break;
				case 'NSN_PRM_1_G6': _this.state.start('preloader_fm_3', true, false);
					break;
				case 'NSN_FM_3_G6': _this.state.start('preloader_fm_4a', true, false);
					break;
				case 'NSN_FM_4A_G6': _this.state.start('preloader_lcm_1', true, false);
					break;
				case 'NSN_LCM_1_G6': _this.state.start('preloader_int_1', true, false);
					break;
				case 'NS_INT_1_G6': _this.state.start('preloader_int_3', true, false);
					break;
				case 'NS_INT_3_G6': _this.state.start('preloader_int_5', true, false);
					break;
				case 'NS_INT_5_G6': _this.state.start('preloader_int_6', true, false);
					break;
				case 'NS_INT_6_G6': _this.state.start('preloader_int_5h', true, false);
					break;
				case 'NS_INT_5H_G6': _this.state.start('preloader_int_6h', true, false);
					break;
				case 'NS_INT_6H_G6': _this.state.start('preloader_int_13h', true, false);
					break;
				case 'NS_INT_13H_G6': _this.state.start('preloader_int_7', true, false);
					break;
				case 'NS_INT_7_G6': _this.state.start('preloader_int_8', true, false);
					break;
				case 'NS_INT_8_G6': _this.state.start('preloader_int_9', true, false);
					break;
				case 'NS_INT_9_G6': _this.state.start('preloader_int_10', true, false);
					break;
				case 'NS_INT_10_G6': _this.state.start('preloader_int_11', true, false);
					break;
				case 'NS_INT_11_G6': _this.state.start('preloader_int_12', true, false);
					break;
				case 'NS_INT_12_G6': _this.state.start('preloader_int_14h', true, false);
					break;
				case 'NS_INT_14H_G6': _this.state.start('NSF_1A_G6level1', true, false);
					break;
				case 'NSF_1A_G6': _this.state.start('preloader_nsf_2', true, false);
					break;
				case 'NSF_2_G6': _this.state.start('NSF_3_G6level1', true, false);
					break;
				case 'NSF_3_G6': _this.state.start('preloader_nsf_4', true, false);
					break;
				case 'NSF_4_G6': _this.state.start('preloader_nsf_5', true, false);
					break;
				case 'NSF_5_G6': _this.state.start('NSF_6_G6level1', true, false);
					break;
				case 'NSF_6_G6': _this.state.start('preloader_nsf_7', true, false);
					break;
				case 'NSF_7_G6': _this.state.start('preloader_nsf_8', true, false);
					break;
				case 'NSF_8_G6': _this.state.start('preloader_nsf_9a', true, false);
					break;
				case 'NSF_9A_G6': _this.state.start('preloader_nsf_10', true, false);
					break;
				case 'NSF_10_G6': _this.state.start('preloader_nsf_11', true, false);
					break;
				case 'NSF_11_G6': _this.state.start('preloader_nsf_12', true, false);
					break;
				case 'NSF_12_G6': _this.state.start('preloader_nsf_13', true, false);
					break;
				case 'NSF_13_G6': _this.state.start('preloader_nsf_14', true, false);
					break;
				case 'NSF_14_G6': _this.state.start('preloader_nsf_15', true, false);
					break;
				case 'NSF_15_G6': _this.state.start('preloader_NSD_3A_G6', true, false);
					break;
				case 'NSD_3A_G6': _this.state.start('preloader_NSD_3B_G6', true, false);
					break;
				case 'NSD_3B_G6': _this.state.start('preloader_NSD_2A_G6', true, false);
					break;
				case 'NSD_2A_G6': _this.state.start('preloader_NSD_2B_G6', true, false);
					break;
				case 'NSD_2B_G6': _this.state.start('preloader_NSD_01_G6', true, false);
					break;
				case 'NSD_01_G6': _this.state.start('preloader_NSD_6A_G6', true, false);
					break;
				case 'NSD_6A_G6': _this.state.start('preloader_NSD_6B_G6', true, false);
					break;
				case 'NSD_6B_G6': _this.state.start('preloader_NSD_4A_G6', true, false);
					break;
				case 'NSD_4A_G6': _this.state.start('preloader_NSD_4B_G6', true, false);
					break;
				case 'NSD_4B_G6': _this.state.start('preloader_NSD_4E_G6', true, false);
					break;
				case 'NSD_4E_G6': _this.state.start('preloader_NSD_4C_G6', true, false);
					break;
				case 'NSD_4C_G6': _this.state.start('preloader_NSD_4D_G6', true, false);
					break;
				case 'NSD_4D_G6': _this.state.start('preloader_NSD_5A_G6', true, false);
					break;
				case 'NSD_5A_G6': _this.state.start('preloader_NSD_5B_G6', true, false);
					break;
				case 'NSD_5B_G6': _this.state.start('preloader_NSRP_01_G6', true, false);
					break;
				case 'NSRP_1_G6': _this.state.start('preloader_NSRP_02_G6', true, false);
					break;
				case 'NSRP_2_G6': _this.state.start('preloader_NSRP_03_G6', true, false);
					break;
				case 'NSRP_3_G6': _this.state.start('preloader_oe_1a', true, false);
					break;

			}
		}
		else if (_this.microConcepts == 'Algebra') {
			switch (_this.game_id) {
				case 'ALAS_01_G6': _this.state.start('preloader_ALA_01_G6', true, false);
					break;
				case 'ALA_01_G6': _this.state.start('preloader_ALS_01_MCQ_G6', true, false);
					break;
				case 'ALS_01_G6': _this.state.start('preloader_ALS_02_FIB_G6', true, false);
					break;
				case 'ALS_02_G6': _this.state.start('preloader_ALM_01_MCQ_G6', true, false);
					break;
				case 'ALM_01_G6': _this.state.start('preloader_ALM_02_FIB_G6', true, false);
					break;
				case 'ALM_02_G6': _this.state.start('preloader_ALD_01_G6', true, false);
					break;
				case 'ALD_01_G6': _this.state.start('preloader_ALP_01_G6', true, false);
					break;
				case 'ALP_01_G6': _this.state.start('preloader_ALP_02_G6', true, false);
					break;
				case 'ALP_02_G6': _this.state.start('preloader_AL_MAZE_G6', true, false);
					break;
				case 'AL_MAZE_G6': _this.state.start('preloader_AL_MEM_G6', true, false);
					break;
				case 'AL_MEM_G6': _this.state.start('preloader_ALAS_01_G6', true, false);
					break;
			}
		}
		else if (_this.microConcepts == 'Geometry') {
			switch (_this.game_id) {
				case 'GMS_01_G6': _this.state.start('preloader_GMS_02_G6', true, false);
					break;
				case 'GMS_02_G6': _this.state.start('preloader_GMS_03_G6', true, false);
					break;
				case 'GMS_03_G6': _this.state.start('preloader_GMR_01_G6', true, false);
					break;
				case 'GMR_01_G6': _this.state.start('preloader_gmcr_01', true, false);
					break;
				case 'GMCR_01_G6': _this.state.start('GMAN_01_G6level1', true, false);
					break;
				case 'GMAN_01_G6': _this.state.start('preloader_GMPAR_01_G6', true, false);
					break;
				case 'GMPAR_01_G6': _this.state.start('preloader_GMS_01_G6', true, false);
					break;
			}
		} else if (_this.microConcepts == 'Number SystemsG7') {
			switch (_this.game_id) {
				// case 'GMS_01_G6': _this.state.start('preloader_GMS_02_G6', true, false);
				// 	break;
				// case 'GMS_02_G6': _this.state.start('preloader_GMS_03_G6', true, false);
				// 	break;
				case 'NS_INT_DI_1_G7': _this.state.start('preloader_INT_DI2_G7', true, false);
					break;
				case 'NS_INT_DI_2_G7': _this.state.start('preloader_INT_DI3_G7', true, false);
					break;
				case 'NS_INT_DI_3_G7': _this.state.start('preloader_INT_DI4_G7', true, false);
					break;
				case 'NS_INT_DI_4_G7': _this.state.start('preloader_INT_ML1_G7', true, false);
					break;
				case 'NS_INT_ML_1_G7': _this.state.start('preloader_INT_ML2_G7', true, false);
					break;
				case 'NS_INT_ML_2_G7': _this.state.start('preloader_INT_ML3_G7', true, false);
					break;
				case 'NS_INT_ML_3_G7': _this.state.start('preloader_INT_ML4_G7', true, false);
					break;
				case 'NS_INT_ML_4_G7': _this.state.start('preloader_NSF_CUIS_G7', true, false);
					break;
				case 'NSF_CUIS_G7': _this.state.start('preloader_NSF_ADSB_G7', true, false);
					break;
				case 'NSF_ADSB_G7': _this.state.start('preloader_NSF_UNLAD_G7', true, false);
					break;
				case 'NSF_UNLAD_G7': _this.state.start('preloader_NSF_UNLSB_G7', true, false);
					break;
				case 'NSF_UNLSB_G7': _this.state.start('preloader_NSF_MLP_01_G7', true, false);
					break;
				case 'NSF_MLP_01_G7': _this.state.start('preloader_NSF_MLP_02_G7', true, false);
					break;
				case 'NSF_MLP_02_G7': _this.state.start('preloader_NSF_MLP_03_G7', true, false);
					break;
				case 'NSF_MLP_03_G7': _this.state.start('preloader_NSF_DWF_G7', true, false);
					break;
				case 'NSF_DWF_G7': _this.state.start('preloader_NSF_DFW_G7', true, false);
					break;
				case 'NSF_DFW_G7': _this.state.start('preloader_NSF_DFF_G7', true, false);
					break;
				case 'NSF_DFF_G7': _this.state.start('preloader_NSD_1_G7', true, false);
					break;
				case 'NSD_1_G7': _this.state.start('preloader_NSD_2_G7', true, false);
					break;
				case 'NSD_2_G7': _this.state.start('preloader_NSD_3_G7', true, false);
					break;
				case 'NSD_3_G7': _this.state.start('preloader_NSD_4_G7', true, false);
					break;
				case 'NSD_4_G7': _this.state.start('preloader_NSD_5_G7', true, false);
					break;
				case 'NSD_5_G7': _this.state.start('preloader_NSD_6_G7', true, false);
					break;
				case 'NSD_6_G7': _this.state.start('preloader_INT_DI1_G7', true, false);
					break;
			}

		} else if (_this.microConcepts == 'AlgebraG7') {
			switch (_this.game_id) {
				case 'AL_ES_G7': _this.state.start('preloader_AL_ADD_G7', true, false);
					break;
				case 'AL_ADD_G7': _this.state.start('preloader_AL_SUB_G7', true, false);
					break;
				case 'AL_SUB_G7': _this.state.start('preloader_AL_SIM_G7', true, false);
					break;
				case 'AL_SIM_G7': _this.state.start('preloader_AL_SORT1_G7', true, false);
					break;
				case 'AL_SORT1_G7': _this.state.start('preloader_AL_SORT2_G7', true, false);
					break;
				case 'AL_SORT2_G7': _this.state.start('preloader_AL_TAR_G7', true, false);
					break;
				case 'AL_TAR_G7': _this.state.start('preloader_AL_ES_G7', true, false);
					break;
			}
		}
		else if (_this.microConcepts == 'GeometryG7') {
			switch (_this.game_id) {
				case 'GM_PYTH_G7': _this.state.start('preloader_GMSS_01_G7', true, false);
					break;
				case 'GMSS_01_G7': _this.state.start('preloader_GMSS_02_G7', true, false);
					break;
				case 'GMSS_02_G7': _this.state.start('preloader_GMSS_03_G7', true, false);
					break;
				case 'GMSS_03_G7': _this.state.start('preloader_GMSS_04_G7', true, false);
					break;
				case 'GMSS_04_G7': _this.state.start('preloader_GMLA_01_G7', true, false);//preloader_GMLA_07_G7,GMLA_07_G7
					break;
				case 'GMLA_01_G7': _this.state.start('preloader_GMLA_02_G7', true, false);
					break;
				case 'GMLA_02_G7': _this.state.start('preloader_GMLA_03_G7', true, false);
					break;
				case 'GMLA_03_G7': _this.state.start('preloader_GMLA_04_G7', true, false);
					break;
				case 'GMLA_04_G7': _this.state.start('preloader_GMLA_05_G7', true, false);
					break;
				case 'GMLA_05_G7': _this.state.start('preloader_GMLA_06_G7', true, false);
					break;
				case 'GMLA_06_G7': _this.state.start('preloader_GMLA_07_G7', true, false);
					break;
				case 'GMLA_07_G7': _this.state.start('preloader_GMPYTH_G7', true, false);
					break;
			}
		}
	},//GeometryG7

	getCurrentGame: function () {
		//* when the replay button is clicked the same game is played again. 
		switch (_this.game_id) {
			case 'NSN_OE_1_G6': _this.state.start('preloader_oe_1a', true, false);
				break;
			case 'NSN_FM_1_G6': _this.state.start('preloader_fm_1', true, false);
				break;
			case 'NSN_HCF_1_G6': _this.state.start('preloader_hcf_1', true, false);
				break;
			case 'NSN_PRM_1_G6': _this.state.start('preloader_prm_1', true, false);
				break;
			case 'NSN_FM_3_G6': _this.state.start('preloader_fm_3', true, false);
				break;
			case 'NSN_FM_4A_G6': _this.state.start('preloader_fm_4a', true, false);
				break;
			case 'NSN_LCM_1_G6': _this.state.start('preloader_lcm_1', true, false);
				break;
			case 'NS_INT_1_G6': _this.state.start('preloader_int_1', true, false);
				break;
			case 'NS_INT_3_G6': _this.state.start('preloader_int_3', true, false);
				break;
			case 'NS_INT_5_G6': _this.state.start('preloader_int_5', true, false);
				break;
			case 'NS_INT_6_G6': _this.state.start('preloader_int_6', true, false);
				break;
			case 'NS_INT_5H_G6': _this.state.start('preloader_int_5h', true, false);
				break;
			case 'NS_INT_6H_G6': _this.state.start('preloader_int_6h', true, false);
				break;
			case 'NS_INT_13H_G6': _this.state.start('preloader_int_13h', true, false);
				break;
			case 'NS_INT_7_G6': _this.state.start('preloader_int_7', true, false);
				break;
			case 'NS_INT_8_G6': _this.state.start('preloader_int_8', true, false);
				break;
			case 'NS_INT_9_G6': _this.state.start('preloader_int_9', true, false);
				break;
			case 'NS_INT_10_G6': _this.state.start('preloader_int_10', true, false);
				break;
			case 'NS_INT_11_G6': _this.state.start('preloader_int_11', true, false);
				break;
			case 'NS_INT_12_G6': _this.state.start('preloader_int_12', true, false);
				break;
			case 'NS_INT_14H_G6': _this.state.start('preloader_int_14h', true, false);
				break;
			case 'NSF_1A_G6': _this.state.start('NSF_1A_G6level1', true, false);
				break;
			case 'NSF_2_G6': _this.state.start('preloader_nsf_2', true, false);
				break;
			case 'NSF_3_G6': _this.state.start('NSF_3_G6level1', true, false);
				break;
			case 'NSF_4_G6': _this.state.start('preloader_nsf_4', true, false);
				break;
			case 'NSF_5_G6': _this.state.start('preloader_nsf_5', true, false);
				break;
			case 'NSF_6_G6': _this.state.start('NSF_6_G6level1', true, false);
				break;
			case 'NSF_7_G6': _this.state.start('preloader_nsf_7', true, false);
				break;
			case 'NSF_8_G6': _this.state.start('preloader_nsf_8', true, false);
				break;
			case 'NSF_9A_G6': _this.state.start('preloader_nsf_9a', true, false);
				break;
			case 'NSF_10_G6': _this.state.start('preloader_nsf_10', true, false);
				break;
			case 'NSF_11_G6': _this.state.start('preloader_nsf_11', true, false);
				break;
			case 'NSF_12_G6': _this.state.start('preloader_nsf_12', true, false);
				break;
			case 'NSF_13_G6': _this.state.start('preloader_nsf_13', true, false);
				break;
			case 'NSF_14_G6': _this.state.start('preloader_nsf_14', true, false);
				break;
			case 'NSF_15_G6': _this.state.start('preloader_nsf_15', true, false);
				break;
			case 'NSD_3A_G6': _this.state.start('preloader_NSD_3A_G6', true, false);
				break;
			case 'NSD_3B_G6': _this.state.start('preloader_NSD_3B_G6', true, false);
				break;
			case 'NSD_2A_G6': _this.state.start('preloader_NSD_2A_G6', true, false);
				break;
			case 'NSD_2B_G6': _this.state.start('preloader_NSD_2B_G6', true, false);
				break;
			case 'NSD_01_G6': _this.state.start('preloader_NSD_01_G6', true, false);
				break;
			case 'NSD_6A_G6': _this.state.start('preloader_NSD_6A_G6', true, false);
				break;
			case 'NSD_6B_G6': _this.state.start('preloader_NSD_6B_G6', true, false);
				break;
			case 'NSD_4A_G6': _this.state.start('preloader_NSD_4A_G6', true, false);
				break;
			case 'NSD_4B_G6': _this.state.start('preloader_NSD_4B_G6', true, false);
				break;
			case 'NSD_4E_G6': _this.state.start('preloader_NSD_4E_G6', true, false);
				break;
			case 'NSD_4C_G6': _this.state.start('preloader_NSD_4C_G6', true, false);
				break;
			case 'NSD_4D_G6': _this.state.start('preloader_NSD_4D_G6', true, false);
				break;
			case 'NSD_5A_G6': _this.state.start('preloader_NSD_5A_G6', true, false);
				break;
			case 'NSD_5B_G6': _this.state.start('preloader_NSD_5B_G6', true, false);
				break;
			case 'NSRP_1_G6': _this.state.start('preloader_NSRP_01_G6', true, false);
				break;
			case 'NSRP_2_G6': _this.state.start('preloader_NSRP_02_G6', true, false);
				break;
			case 'NSRP_3_G6': _this.state.start('preloader_NSRP_03_G6', true, false);
				break;
			case 'ALAS_01_G6': _this.state.start('preloader_ALAS_01_G6', true, false);
				break;
			case 'ALA_01_G6': _this.state.start('preloader_ALA_01_G6', true, false);
				break;
			case 'ALS_01_G6': _this.state.start('preloader_ALS_01_MCQ_G6', true, false);
				break;
			case 'ALS_02_G6': _this.state.start('preloader_ALS_02_FIB_G6', true, false);
				break;
			case 'ALM_01_G6': _this.state.start('preloader_ALM_01_MCQ_G6', true, false);
				break;
			case 'ALM_02_G6': _this.state.start('preloader_ALM_02_FIB_G6', true, false);
				break;
			case 'ALD_01_G6': _this.state.start('preloader_ALD_01_G6', true, false);
				break;
			case 'ALP_01_G6': _this.state.start('preloader_ALP_01_G6', true, false);
				break;
			case 'ALP_02_G6': _this.state.start('preloader_ALP_02_G6', true, false);
				break;
			case 'AL_MAZE_G6': _this.state.start('preloader_AL_MAZE_G6', true, false);
				break;
			case 'AL_MEM_G6': _this.state.start('preloader_AL_MEM_G6', true, false);
				break;
			case 'GMS_01_G6': _this.state.start('preloader_GMS_01_G6', true, false);
				break;
			case 'GMS_02_G6': _this.state.start('preloader_GMS_02_G6', true, false);
				break;
			case 'GMS_03_G6': _this.state.start('preloader_GMS_03_G6', true, false);
				break;
			case 'GMR_01_G6': _this.state.start('preloader_GMR_01_G6', true, false);
				break;
			case 'GMCR_01_G6': _this.state.start('preloader_gmcr_01', true, false);
				break;
			case 'GMAN_01_G6': _this.state.start('GMAN_01_G6level1', true, false);
				break;
			case 'GMPAR_01_G6': _this.state.start('preloader_GMPAR_01_G6', true, false);
				break;
			case 'NS_INT_DI_1_G7': _this.state.start('preloader_INT_DI1_G7', true, false);
				break;
			case 'NS_INT_DI_2_G7': _this.state.start('preloader_INT_DI2_G7', true, false);
				break;
			case 'NS_INT_DI_3_G7': _this.state.start('preloader_INT_DI3_G7', true, false);
				break;
			case 'NS_INT_DI_4_G7': _this.state.start('preloader_INT_DI4_G7', true, false);
				break;
			case 'NS_INT_ML_1_G7': _this.state.start('preloader_INT_ML1_G7', true, false);
				break;
			case 'NS_INT_ML_2_G7': _this.state.start('preloader_INT_ML2_G7', true, false);
				break;
			case 'NS_INT_ML_3_G7': _this.state.start('preloader_INT_ML3_G7', true, false);
				break;
			case 'NS_INT_ML_4_G7': _this.state.start('preloader_INT_ML4_G7', true, false);
				break;
			case 'NSF_CUIS_G7': _this.state.start('preloader_NSF_CUIS_G7', true, false);
				break;
			case 'NSF_ADSB_G7': _this.state.start('preloader_NSF_ADSB_G7', true, false);
				break;
			case 'NSF_UNLAD_G7': _this.state.start('preloader_NSF_UNLAD_G7', true, false);
				break;
			case 'NSF_UNLSB_G7': _this.state.start('preloader_NSF_UNLSB_G7', true, false);
				break;
			case 'NSF_MLP_01_G7': _this.state.start('preloader_NSF_MLP_01_G7', true, false);
				break;
			case 'NSF_MLP_02_G7': _this.state.start('preloader_NSF_MLP_02_G7', true, false);
				break;
			case 'NSF_MLP_03_G7': _this.state.start('preloader_NSF_MLP_03_G7', true, false);
				break;
			case 'NSF_DWF_G7': _this.state.start('preloader_NSF_DWF_G7', true, false);
				break;
			case 'NSF_DFW_G7': _this.state.start('preloader_NSF_DFW_G7', true, false);
				break;
			case 'NSF_DFF_G7': _this.state.start('preloader_NSF_DFF_G7', true, false);
				break;
			case 'NSD_1_G7': _this.state.start('preloader_NSD_1_G7', true, false);
				break;
			case 'NSD_2_G7': _this.state.start('preloader_NSD_2_G7', true, false);
				break;
			case 'NSD_3_G7': _this.state.start('preloader_NSD_3_G7', true, false);
				break;
			case 'NSD_4_G7': _this.state.start('preloader_NSD_4_G7', true, false);
				break;
			case 'NSD_5_G7': _this.state.start('preloader_NSD_5_G7', true, false);
				break;
			case 'AL_ES_G7': _this.state.start('preloader_AL_ES_G7', true, false);
				break;
			case 'AL_ADD_G7': _this.state.start('preloader_AL_ADD_G7', true, false);
				break;
			case 'AL_SUB_G7': _this.state.start('preloader_AL_SUB_G7', true, false);
				break;
			case 'AL_SIM_G7': _this.state.start('preloader_AL_SIM_G7', true, false);
				break;
			case 'AL_SORT1_G7': _this.state.start('preloader_AL_SORT1_G7', true, false);
				break;
			case 'AL_SORT2_G7': _this.state.start('preloader_AL_SORT2_G7', true, false);
				break;
			case 'AL_TAR_G7': _this.state.start('preloader_AL_TAR_G7', true, false);
				break;
			case 'GM_PYTH_G7': _this.state.start('preloader_GMPYTH_G7', true, false);
				break;
			case 'GMLA_01_G7': _this.state.start('preloader_GMLA_01_G7', true, false);
				break;
			case 'GMLA_02_G7': _this.state.start('preloader_GMLA_02_G7', true, false);
				break;
			case 'GMLA_03_G7': _this.state.start('preloader_GMLA_03_G7', true, false);
				break;
			case 'GMLA_04_G7': _this.state.start('preloader_GMLA_04_G7', true, false);
				break;
			case 'GMLA_05_G7': _this.state.start('preloader_GMLA_05_G7', true, false);
				break;
			case 'GMLA_06_G7': _this.state.start('preloader_GMLA_06_G7', true, false);
				break;
			case 'GMLA_07_G7': _this.state.start('preloader_GMLA_07_G7', true, false);
				break;
			case 'GMSS_01_G7': _this.state.start('preloader_GMSS_01_G7', true, false);
				break;
			case 'NSD_6_G7': _this.state.start('preloader_NSD_6_G7', true, false);
				break;
			case 'GMSS_02_G7': _this.state.start('preloader_GMSS_02_G7', true, false);
				break;
			case 'GMSS_03_G7': _this.state.start('preloader_GMSS_03_G7', true, false);
				break;
			case 'GMSS_04_G7': _this.state.start('preloader_GMSS_04_G7', true, false);
				break;
		}
	},

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
	// 	console.log("save assessment",save_assessment);
	// 	if(_this.userHasPlayed == 1)
	// 	{
	// 		BBplusplusdbDetails.userProgressSaving(save_assessment);
	// 	}
	// },

	// convertTimeinMinandSectoHrsMinsSecs :function(Hours1,Minutes1,Seconds1)
	// {
	// 	console.log("inside convert time",Hours1,Minutes1,Seconds1);

	// 	const totalMinutes = Math.floor((parseInt(Seconds1)+parseInt(_this.timeInSeconds)) / 60) + (parseInt(Minutes1)+parseInt(_this.timeInMinutes));
	// 	const Seconds2 = (parseInt(Seconds1)+parseInt(_this.timeInSeconds)) % 60;

	// 	const Hours2 = Math.floor(totalMinutes / 60) + parseInt(Hours1);
	// 	const Minutes2 = totalMinutes % 60;

	// 	console.log("before adding");
	// 	console.log("totalMinutes",totalMinutes);
	// 	console.log("after adding");
	// 	console.log("Seconds2",Seconds2);
	// 	console.log("Hours2",Hours2);
	// 	console.log("Minutes2",Minutes2)

	// 	var save_assessment ={
	// 		game_id:_this.game_id,
	// 		totalLearningTimeinHrs:Hours2.toString(),
	// 		totalLearningTimeinMins:Minutes2.toString(),
	// 		totalLearningTimeinSecs:Seconds2.toString(),
	// 	}
	// 	console.log("save assessment",save_assessment);
	// 	if(_this.userHasPlayed == 1)
	// 	{
	// 		BBplusplusdbDetails.updateRecordsUsingGameID(save_assessment);
	// 	}

	// },

	shutdown: function () {
		_this.background = null;
		_this.homeBtn.events.onInputDown.removeAll();
		_this.homeBtn = null;
		_this.nextBtn.events.onInputDown.removeAll();
		_this.nextBtn = null;
		_this.replay.events.onInputDown.removeAll();
		_this.replay = null;

		_this = null;
	}

};