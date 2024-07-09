var exitOnce = false;
Game.index2 = function () {

};

Game.index2.prototype = {

	gamesVar: null,

	// Application Constructor
	init: function (user, flag,app_Mode) {

		//Fullscreen.on();
		_this = this; //* _this is a reference parameter
		window.user = user;
		window.acctkn = user.uid;
		window.avatarName = user.name;
		window.deviceId = user.deviceId;
		window.languageSelected = user.language;
		window.gradeSelected = user.grade;
		window.selctedLang = null;
		_this.app_Mode = app_Mode;
		window.app_Mode = _this.app_Mode;
		//window.baseUrl = cordova.file.externalRootDirectory+"Android/data/com.akshara.easymath/Files/Download/.gameFilesBBV5_0_5/www/";
		//window.baseUrl = "https://abbmath.klp.org.in/bbplusplus/assets1/";
		window.score = 50;
		window.mcIcon = null;
		window.userProgress = flag;

		window.rateCount = 0;

		document.addEventListener('resume', function () {
			AndroidFullScreen.setSystemUiVisibility(AndroidFullScreen.SYSTEM_UI_FLAG_FULLSCREEN, null, null);
		}, false);

	},


	preload: function (game) {
		//game.cache.destroy();	
		game.load.image('exitBg', 'assets/exitAssets/exitBg.png');
		game.load.image('confirmBg', 'assets/exitAssets/confirmBg.png');
	},



	create: function (game) {
		console.log("I am in index2");
		window.currScreen = "gameModeSelectionScreen";

		this.gamesVar = game;

		// if(localStorage.getItem("FirstTimeRate")==null)
		// 	localStorage.setItem("FirstTimeRate", "false");

		// if(localStorage.getItem(window.avatarName+"numbersensePlayed")==null)
		// 	localStorage.setItem(window.avatarName+"numbersensePlayed", "notplayed");

		// if(localStorage.getItem(window.avatarName+"measurementPlayed")==null)
		// 	localStorage.setItem(window.avatarName+"measurementPlayed", "notplayed");

		// if(localStorage.getItem(window.avatarName+"numberoperationPlayed")==null)
		// 	localStorage.setItem(window.avatarName+"numberoperationPlayed", "notplayed");

		// if(localStorage.getItem(window.avatarName+"length_MLG_1_1state")==null)
		// 	localStorage.setItem(window.avatarName+"length_MLG_1_1state", "canplay");

		// if(localStorage.getItem(window.avatarName+"length_MLG_2_1state")==null)
		// 	localStorage.setItem(window.avatarName+"length_MLG_2_1state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"length_MLG_3_2state")==null)
		// 	localStorage.setItem(window.avatarName+"length_MLG_3_2state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"volume_MVG_1_4state")==null)
		// 	localStorage.setItem(window.avatarName+"volume_MVG_1_4state", "canplay");

		// if(localStorage.getItem(window.avatarName+"volume_MVG_2_4state")==null)
		// 	localStorage.setItem(window.avatarName+"volume_MVG_2_4state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"volume_MVG_3_4state")==null)
		// 	localStorage.setItem(window.avatarName+"volume_MVG_3_4state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"weight_MWG_1_1state")==null)
		// 	localStorage.setItem(window.avatarName+"weight_MWG_1_1state", "canplay");

		// if(localStorage.getItem(window.avatarName+"weight_MWG_2_2state")==null)
		// 	localStorage.setItem(window.avatarName+"weight_MWG_2_2state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"weight_MWG_3_2state")==null)
		// 	localStorage.setItem(window.avatarName+"weight_MWG_3_2state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"time_MTG_1_1state")==null)
		// 	localStorage.setItem(window.avatarName+"time_MTG_1_1state", "canplay");

		// if(localStorage.getItem(window.avatarName+"time_MTG_2_3state")==null)
		// 	localStorage.setItem(window.avatarName+"time_MTG_2_3state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"time_MTG_3_3state")==null)
		// 	localStorage.setItem(window.avatarName+"time_MTG_3_3state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"number_NSNG_1_1state")==null)
		// 	localStorage.setItem(window.avatarName+"number_NSNG_1_1state", "canplay");

		// if(localStorage.getItem(window.avatarName+"number_NSNG_2_1state")==null)
		// 	localStorage.setItem(window.avatarName+"number_NSNG_2_1state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"sequence_NSSG_1_1state")==null)
		// 	localStorage.setItem(window.avatarName+"sequence_NSSG_1_1state", "canplay");

		// if(localStorage.getItem(window.avatarName+"sequence_NSSG_2_1state")==null)
		// 	localStorage.setItem(window.avatarName+"sequence_NSSG_2_1state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"sequence_NSSG_3_2state")==null)
		// 	localStorage.setItem(window.avatarName+"sequence_NSSG_3_2state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"sequence_NSSG_4_2state")==null)
		// 	localStorage.setItem(window.avatarName+"sequence_NSSG_4_2state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"sequence_NSSG_5_3state")==null)
		// 	localStorage.setItem(window.avatarName+"sequence_NSSG_5_3state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"sequence_NSSG_6_3state")==null)
		// 	localStorage.setItem(window.avatarName+"sequence_NSSG_6_3state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"comparison_NSCG_1_1state")==null)
		// 	localStorage.setItem(window.avatarName+"comparison_NSCG_1_1state", "canplay");

		// if(localStorage.getItem(window.avatarName+"comparison_NSCG_2_1state")==null)
		// 	localStorage.setItem(window.avatarName+"comparison_NSCG_2_1state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"comparison_NSCG_4_2state")==null)
		// 	localStorage.setItem(window.avatarName+"comparison_NSCG_4_2state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"comparison_NSCG_5_3state")==null)
		// 	localStorage.setItem(window.avatarName+"comparison_NSCG_5_3state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"fraction_NSFG_1_1state")==null)
		// 	localStorage.setItem(window.avatarName+"fraction_NSFG_1_1state", "canplay");

		// if(localStorage.getItem(window.avatarName+"fraction_NSFG_2_1state")==null)
		// 	localStorage.setItem(window.avatarName+"fraction_NSFG_2_1state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"fraction_NSFG_3_1state")==null)
		// 	localStorage.setItem(window.avatarName+"fraction_NSFG_3_1state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"fraction_NSFG_4_1state")==null)
		// 	localStorage.setItem(window.avatarName+"fraction_NSFG_4_1state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"placevalue_NSPVG_1_1state")==null)
		// 	localStorage.setItem(window.avatarName+"placevalue_NSPVG_1_1state", "canplay");

		// if(localStorage.getItem(window.avatarName+"placevalue_NSPVG_2_1state")==null)
		// 	localStorage.setItem(window.avatarName+"placevalue_NSPVG_2_1state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"placevalue_NSPVG_4_2state")==null)
		// 	localStorage.setItem(window.avatarName+"placevalue_NSPVG_4_2state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"placevalue_NSPVG_6_3state")==null)
		// 	localStorage.setItem(window.avatarName+"placevalue_NSPVG_6_3state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"placevalue_NSPVG_5_2state")==null)
		// 	localStorage.setItem(window.avatarName+"placevalue_NSPVG_5_2state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"placevalue_NSPVG_7_3state")==null)
		// 	localStorage.setItem(window.avatarName+"placevalue_NSPVG_7_3state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"addition_NOAG_1_1state")==null)
		// 	localStorage.setItem(window.avatarName+"addition_NOAG_1_1state", "canplay");

		// if(localStorage.getItem(window.avatarName+"addition_NOAG_2_1state")==null)
		// 	localStorage.setItem(window.avatarName+"addition_NOAG_2_1state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"addition_NOAG_3_2state")==null)
		// 	localStorage.setItem(window.avatarName+"addition_NOAG_3_2state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"addition_NOAG_4_3state")==null)
		// 	localStorage.setItem(window.avatarName+"addition_NOAG_4_3state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"subtraction_NOSG_1_1state")==null)
		// 	localStorage.setItem(window.avatarName+"subtraction_NOSG_1_1state", "canplay");

		// if(localStorage.getItem(window.avatarName+"subtraction_NOSG_2_1state")==null)
		// 	localStorage.setItem(window.avatarName+"subtraction_NOSG_2_1state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"subtraction_NOSG_3_2state")==null)
		// 	localStorage.setItem(window.avatarName+"subtraction_NOSG_3_2state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"subtraction_NOSG_4_3state")==null)
		// 	localStorage.setItem(window.avatarName+"subtraction_NOSG_4_3state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"division_NODG_1_2state")==null)
		// 	localStorage.setItem(window.avatarName+"division_NODG_1_2state", "canplay");  

		// if(localStorage.getItem(window.avatarName+"division_NODG_2_2state")==null)
		// 	localStorage.setItem(window.avatarName+"division_NODG_2_2state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"division_NODG_3_2state")==null)
		// 	localStorage.setItem(window.avatarName+"division_NODG_3_2state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"division_NODG_4_2state")==null)
		// 	localStorage.setItem(window.avatarName+"division_NODG_4_2state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"multiplication_NOMG_1_1state")==null)
		// 	localStorage.setItem(window.avatarName+"multiplication_NOMG_1_1state", "canplay");

		// if(localStorage.getItem(window.avatarName+"multiplication_NOMG_2_1state")==null)
		// 	localStorage.setItem(window.avatarName+"multiplication_NOMG_2_1state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"multiplication_NOMG_3_1state")==null)
		// 	localStorage.setItem(window.avatarName+"multiplication_NOMG_3_1state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"multiplication_NOMG_4_2state")==null)
		// 	localStorage.setItem(window.avatarName+"multiplication_NOMG_4_2state", "cannotplay");

		// if(localStorage.getItem(window.avatarName+"multiplication_NOMG_5_3state")==null)
		// 	localStorage.setItem(window.avatarName+"multiplication_NOMG_5_3state", "cannotplay");

		//window.score = parseInt(localStorage.getItem(window.avatarName+"Score"));
		// remove an item
		//alert(window.score);
		//if(window.score==null||window.score==undefined||window.score==""||window.score==NaN)
		//{
		//localStorage.setItem(window.avatarName+"Score", 50);
		//window.score = parseInt(localStorage.getItem(window.avatarName+"Score"));
		//}
		//alert(window.score);

		abbchmprmdsjsapi.initializeDS();

		window.timeSaveFunc = function () {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1;//January is 0, so always add + 1

			var yyyy = today.getFullYear();
			if (dd < 10) { dd = '0' + dd }
			if (mm < 10) { mm = '0' + mm }

			var hr = today.getHours();
			var min = today.getMinutes();
			var sec = today.getSeconds();

			//today = mm+'/'+dd+'/'+yyyy+' '+hr+':'+min+':'+sec;
			today = yyyy + ':' + mm + ':' + dd + ':' + hr + ':' + min + ':' + sec;
			return today;
		};

		game.stage.backgroundColor = '#71c5cf';


		document.addEventListener('backbutton', function (e) {

			//if((window.prevScreen == "gameScreen") || window.currScreen == "gameModeSelectionScreen")
			//{
			e.preventDefault();

			if (game && !exitOnce) {
				game.input.enabled = true;
				exitOnce = true;

				var exitGrp = game.add.group();

				var stageBg = game.add.graphics(0, 0);
				stageBg.lineStyle(0, 0xFFFFFF, 0.8);
				stageBg.beginFill(0xFFFFFF, 1);
				stageBg.drawRect(0, 0, 960, 540);
				stageBg.boundsPadding = 0;
				stageBg.alpha = 0.2;


				var exitBg = game.add.sprite(game.world.centerX, game.world.centerY, 'exitBg');
				exitBg.anchor.setTo(0.5);
				exitBg.inputEnabled = true;
				exitBg.input.priorityID = 2;


				var exitTxt = null;
				var okTxt = null;
				var cancelTxt = null;

				if (window.languageSelected == "Hindi") {
					exitTxt = "क्या गेम छोड़ना चाहते हो?";
					okTxt = "हाँ";
					cancelTxt = "नहीं";
				}
				else if (window.languageSelected == "Kannada") {
					exitTxt = "ನೀವು ಆಟದಿಂದ ನಿರ್ಗಮಿಸಲು \n ಬಯಸುತ್ತೀರಾ?";
					okTxt = "ಹೌದು";
					cancelTxt = "ಇಲ್ಲ";
				}
				else if (window.languageSelected == "Odiya") {
					exitTxt = "ଆପଣ ଖେଳ ଛାଡ଼ି ଯିବାକୁ ଚାହାନ୍ତି କି?";
					okTxt = "ହଁ";
					cancelTxt = "ନା";
				}
				else if (window.languageSelected == "Gujarati") {
					exitTxt = "તમે છોડવા માગો છો?";
					okTxt = "હા";
					cancelTxt = "ના";
				}
				else {
					exitTxt = "Do you want to quit?";
					okTxt = "Yes";
					cancelTxt = "No";
				}

				var exitText = game.add.text(game.world.centerX, game.world.centerY - 50, exitTxt);
				exitText.anchor.setTo(0.5);
				exitText.align = 'center';
				exitText.fontSize = 26;
				exitText.fontWeight = 'normal';
				exitText.fill = '#FFFFFF';

				var okBtn = game.add.sprite(game.world.centerX - 100, game.world.centerY + 50, 'confirmBg');
				okBtn.anchor.setTo(0.5);

				var okText = game.add.text(game.world.centerX - 100, game.world.centerY + 50, okTxt);
				okText.anchor.setTo(0.5);
				okText.align = 'center';
				okText.fontSize = 20;
				okText.fontWeight = 'normal';
				okText.fill = '#FFFFFF';


				var cancelBtn = game.add.sprite(game.world.centerX + 100, game.world.centerY + 50, 'confirmBg');
				cancelBtn.anchor.setTo(0.5);

				var cancelText = game.add.text(game.world.centerX + 100, game.world.centerY + 50, cancelTxt);
				cancelText.anchor.setTo(0.5);
				cancelText.align = 'center';
				cancelText.fontSize = 20;
				cancelText.fontWeight = 'normal';
				cancelText.fill = '#FFFFFF';

				exitGrp.add(stageBg);
				exitGrp.add(exitBg);
				exitGrp.add(exitText);
				exitGrp.add(okBtn);
				exitGrp.add(okText);
				exitGrp.add(cancelBtn);
				exitGrp.add(cancelText);

				stageBg.inputEnabled = true;
				stageBg.events.onInputDown.add(function () {

				}, game);

				okBtn.inputEnabled = true;
				okBtn.input.priorityID = 3;
				okBtn.events.onInputDown.add(function () {
					exitGrp.destroy();
					window.prevScreen = "";
					exitOnce = false;
					//navigator.app.exitApp();
					//nativeApp.CloseApp();
					commonNavBar.stopTimer();
					commonNavBar.stopVoice();
					commonNavBar.navBar = null;
					commonNavBar.backbtn = null;
					commonNavBar.mcIcon = null;
					commonNavBar.speakerbtn = null;

					//if(window.currScreen == "practiceModegradeSelectionScreen")
					//{
					navigator.app.exitApp();
					//}else{
					//game.state.start('practiceModegradeSelectionScreen',true,false);
					//}

				}, game);

				cancelBtn.inputEnabled = true;
				cancelBtn.input.priorityID = 4;
				cancelBtn.events.onInputDown.add(function () {

					exitGrp.destroy();
					exitOnce = false;
				}, game);

				//game.add.stage(exitGrp);

			}
			//}
			/*else if(window.prevScreen == "gameModeSelectionScreen"&& window.currScreen == "gameModeSelectionScreen")
			{
				nativeApp.onButtonShowPopupWindowClick();
			}*/

		}, false);
		console.log(window.languageSelected,"window.languageSelected");
		window.prevScreen = "";
		game.state.start('boot',_this.app_Mode);//window.languageSelected
	},
};
