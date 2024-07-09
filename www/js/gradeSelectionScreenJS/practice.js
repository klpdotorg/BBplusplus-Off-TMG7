Game.practiceModegradeSelectionScreen = function () {

};
grade2Selected = false;
var gradeSelected = null;
var gradeScreen = false;

var selectgrade6MicroConcept = false;
var selectgrade7MicroConcept = false;

// var grade6NumberSystemsSelected = false;
// var grade6AlgebraSelected = false;
// var grade6RatioandProportionSelected = false;
// var grade6GeometrySelected = false;
// var grade6DecimalsSelected = false;

var grade7NumberSystemsSelected = false;
var grade7AlgebraSelected = false;
var grade7RatioandProportionSelected = false;
var grade7GeometrySelected = false;
var grade7DecimalsSelected = false;


Game.practiceModegradeSelectionScreen.prototype = {

	init: function () {
		_this = this;

		exitOnce = false;

		// 12-01-2023
		screen.orientation.lock('landscape');
		AndroidFullScreen.setSystemUiVisibility(AndroidFullScreen.SYSTEM_UI_FLAG_FULLSCREEN, null, null);

		_this.game.scale.setGameSize(960, 540);

		_this.scale.forceOrientation(false, true);

		if (navigator.connection.type != "none" && navigator.connection.type != "unknown" && navigator.connection.type != null && navigator.connection.type != "undefined") {
			console.log("sync telemetry" + navigator.connection.type);
			abbchmprmdsjsapi.syncTelemetryData();
		}
		document.addEventListener("online", _this.syncTelFunc, false);

		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
	},

	onDeviceReady: function () {
		//this.receivedEvent('deviceready');
		AndroidFullScreen.immersiveMode(successFunction, errorFunction);
	},

	syncTelFunc: function () {
		if (navigator.connection.type != "none" && navigator.connection.type != "unknown" && navigator.connection.type != null && navigator.connection.type != "undefined") {
			console.log("sync telemetry" + navigator.connection.type);
			abbchmprmdsjsapi.syncTelemetryData();
		}
	},

	create: function (game) {

		window.prevScreen = "gameScreen";
		window.currScreen = "practiceModegradeSelectionScreen";

		nativeApp.screenViewStringPass("Practice_class_selection_screen", "Practice_class_selection_screen");

		if (selectgrade6MicroConcept == true) {
			_this.state.start('selectgrade6MicroConceptScreen', true, false);
		} else if (selectgrade7MicroConcept == true) {
			_this.state.start('selectgrade7MicroConceptScreen', true, false);
		}
		else {
			gradeSelected = null;
			gradeScreen = true;

			//adding bg, title to the scene.
			_this.game.stage.disableVisibilityChange = true;
			_this.input.enabled = true;
			_this.background = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'gameselectBg');
			_this.gradeBackBtn = _this.add.sprite(-5, 3, 'gradeSceneBackBtn');
			_this.gradeBackBtn.inputEnabled = true;
			_this.gradeBackBtn.input.useHandCursor = true;
			_this.gradeBackBtn.events.onInputDown.add(function () {

				game.state.start('appLoginEditScreen', true, false, window.user, window.app_Mode);
				// game.state.start('gameScreen',true,false);

				// if(game && !exitOnce)
				// {
				//game.input.enabled = true;
				//exitOnce = true;

				// var exitGrp = game.add.group();

				// var stageBg = game.add.graphics(0, 0);
				// stageBg.lineStyle(0, 0xFFFFFF, 0.8);
				// stageBg.beginFill(0xFFFFFF, 1);
				// stageBg.drawRect(0, 0, 960, 540);
				// stageBg.boundsPadding = 0;
				// stageBg.alpha = 0.2;


				// var exitBg = game.add.sprite(game.world.centerX, game.world.centerY, 'exitBg');
				// exitBg.anchor.setTo(0.5);
				// exitBg.inputEnabled = true;
				// exitBg.input.priorityID = 2;


				// var exitTxt = null;
				// var okTxt = null;
				// var cancelTxt = null;

				// if (window.languageSelected == "Hindi") {
				// 	exitTxt = "क्या गेम छोड़ना चाहते हो?";
				// 	okTxt = "हाँ";
				// 	cancelTxt = "नहीं";
				// }
				// else if (window.languageSelected == "Kannada") {
				// 	exitTxt = "ನೀವು ಆಟದಿಂದ ನಿರ್ಗಮಿಸಲು \n ಬಯಸುತ್ತೀರಾ?";
				// 	okTxt = "ಹೌದು";
				// 	cancelTxt = "ಇಲ್ಲ";
				// }
				// else if (window.languageSelected == "Odiya") {
				// 	exitTxt = "ଆପଣ ଖେଳ ଛାଡ଼ି ଯିବାକୁ ଚାହାନ୍ତି କି?";
				// 	okTxt = "ହଁ";
				// 	cancelTxt = "ନା";
				// }
				// else if (window.languageSelected == "Gujarati") {
				// 	exitTxt = "તમે છોડવા માગો છો?";
				// 	okTxt = "હા";
				// 	cancelTxt = "ના";
				// }
				// else {
				// 	exitTxt = "Do you want to quit?";
				// 	okTxt = "Yes";
				// 	cancelTxt = "No";
				// }

				// var exitText = game.add.text(game.world.centerX, game.world.centerY - 50, exitTxt);
				// exitText.anchor.setTo(0.5);
				// exitText.align = 'center';
				// exitText.fontSize = 26;
				// exitText.fontWeight = 'normal';
				// exitText.fill = '#FFFFFF';

				// var okBtn = game.add.sprite(game.world.centerX - 100, game.world.centerY + 50, 'confirmBg');
				// okBtn.anchor.setTo(0.5);

				// var okText = game.add.text(game.world.centerX - 100, game.world.centerY + 50, okTxt);
				// okText.anchor.setTo(0.5);
				// okText.align = 'center';
				// okText.fontSize = 20;
				// okText.fontWeight = 'normal';
				// okText.fill = '#FFFFFF';

				// var cancelBtn = game.add.sprite(game.world.centerX + 100, game.world.centerY + 50, 'confirmBg');
				// cancelBtn.anchor.setTo(0.5);

				// var cancelText = game.add.text(game.world.centerX + 100, game.world.centerY + 50, cancelTxt);
				// cancelText.anchor.setTo(0.5);
				// cancelText.align = 'center';
				// cancelText.fontSize = 20;
				// cancelText.fontWeight = 'normal';
				// cancelText.fill = '#FFFFFF';

				// exitGrp.add(stageBg);
				// exitGrp.add(exitBg);
				// exitGrp.add(exitText);
				// exitGrp.add(okBtn);
				// exitGrp.add(okText);
				// exitGrp.add(cancelBtn);
				// exitGrp.add(cancelText);

				// // stageBg.inputEnabled = true;
				// // stageBg.events.onInputDown.add(function(){

				// // },game);

				// okBtn.inputEnabled = true;
				// okBtn.input.priorityID = 3;
				// okBtn.events.onInputDown.add(function () {
				// 	exitGrp.destroy();
				// 	window.prevScreen = "";
				// 	// exitOnce = false;
				// 	//navigator.app.exitApp();
				// 	//nativeApp.CloseApp();

				// 	navigator.app.exitApp();
				// }, game);

				// cancelBtn.inputEnabled = true;
				// cancelBtn.input.priorityID = 4;
				// cancelBtn.events.onInputDown.add(function () {

				// 	exitGrp.destroy();
				// 	// exitOnce = false;
				// }, game);

				// //game.add.stage(exitGrp);

				// // }

			}, _this);

			this.gameProgressBtn = game.add.image(870, 18, 'userProgressIcon');
			this.gameProgressBtn.anchor.setTo(0.5);
			this.gameProgressBtn.scale.setTo(0.8);
			this.gameProgressBtn.inputEnabled = true;
			this.gameProgressBtn.input.useHandCursor = true;
			this.gameProgressBtn.events.onInputDown.add(function () {
				this.clickSound = this.add.audio('ClickSound');
				this.clickSound.play();
				if (navigator.connection.type != "none" && navigator.connection.type != "unknown" && navigator.connection.type != null && navigator.connection.type != "undefined") {
					this.state.start('userprogress', true, false);
				} else {
					nativeApp.CallUserProgress();
				}
			}, this);


			this.gameModeShareBtn = game.add.image(920, 18, 'shareIcon');
			this.gameModeShareBtn.anchor.setTo(0.5);
			this.gameModeShareBtn.scale.setTo(0.75);
			this.gameModeShareBtn.inputEnabled = true;
			this.gameModeShareBtn.input.useHandCursor = true;
			this.gameModeShareBtn.events.onInputDown.add(function () {
				this.clickSound = this.add.audio('ClickSound');
				this.clickSound.play();
				nativeApp.ShareApp();
			}, this);

			if (this.video == null) {
				this.video = this.add.video('demo');

			}

			this.helpIcon = game.add.image(820, 21, 'helpIcon');
			this.helpIcon.scale.setTo(0.8);
			this.helpIcon.anchor.setTo(0.5);
			this.helpIcon.inputEnabled = true;
			this.helpIcon.input.useHandCursor = true;
			// this.helpIcon.events.onInputDown.add(function()
			// {
			// 	this.clickSound = this.add.audio('ClickSound');
			// 	this.clickSound.play();
			// 	_this.scale.forceOrientation(false, true);
			// 	nativeApp.playHelp(this,"practiceModegradeSelectionScreen");
			// },this);

			//adding grade clouds
			_this.grade6Cloud = _this.add.sprite(220, 170, 'gradeCloud');
			_this.grade6Cloud.anchor.setTo(0.5);
			_this.grade6Cloud.name = "grade6";
			// _this.grade6Cloud.inputEnabled = true;
			// _this.grade6Cloud.input.useHandCursor = true;
			// _this.grade6Cloud.events.onInputDown.add(_this.gradeSelected, _this);
			// _this.grade6CloudTxt = this.add.text(210, 168, ' \n' + window.selctedLang.grade6 + '\n ');
			// _this.grade6CloudTxt.anchor.setTo(0.5);
			// _this.grade6CloudTxt.align = 'center';
			// _this.grade6CloudTxt.font = 'gradefont';
			// if (_this.languageSelected == "TM")
			// 	_this.grade6CloudTxt.fontSize = 30;
			// else
			// 	_this.grade6CloudTxt.fontSize = 34;
			// _this.grade6CloudTxt.fontWeight = 'normal';
			// _this.grade6CloudTxt.fill = '#563814';
			// _this.grade6CloudTxt.wordWrap = true;
			// _this.grade6CloudTxt.wordWrapWidth = 500;

			_this.grade7Cloud = _this.add.sprite(750, 190, 'gradeCloud');
			_this.grade7Cloud.anchor.setTo(0.5);
			_this.grade7Cloud.name = "grade7";
			_this.grade7Cloud.inputEnabled = true;
			_this.grade7Cloud.input.useHandCursor = true;
			_this.grade7Cloud.events.onInputDown.add(_this.gradeSelected, _this);
			_this.grade7CloudTxt = this.add.text(740, 188, ' \n' + window.selctedLang.grade7 + '\n ');
			_this.grade7CloudTxt.anchor.setTo(0.5);
			_this.grade7CloudTxt.align = 'center';
			_this.grade7CloudTxt.font = 'gradefont';
			if (_this.languageSelected == "TM")
				_this.grade7CloudTxt.fontSize = 30;
			else
				_this.grade7CloudTxt.fontSize = 34;
			_this.grade7CloudTxt.fontWeight = 'normal';
			_this.grade7CloudTxt.fill = '#563814';
			_this.grade7CloudTxt.wordWrap = true;
			_this.grade7CloudTxt.wordWrapWidth = 500;

			_this.grade3Cloud = _this.add.sprite(_this.world.centerX, _this.world.centerY, 'gradeCloud');
			_this.grade3Cloud.anchor.setTo(0.5);
			_this.grade3Cloud.name = "";
			_this.grade3Cloud.inputEnabled = true;
			_this.grade3Cloud.input.useHandCursor = true;
			//_this.grade3Cloud.events.onInputDown.add(_this.gradeSelected,_this);
			_this.grade3CloudTxt = this.add.text(_this.world.centerX, _this.world.centerY, ' \n ');
			_this.grade3CloudTxt.anchor.setTo(0.5);
			_this.grade3CloudTxt.align = 'center';
			_this.grade3CloudTxt.font = 'gradefont';
			if (_this.languageSelected == "TM")
				_this.grade3CloudTxt.fontSize = 30;
			else
				_this.grade3CloudTxt.fontSize = 34;
			_this.grade3CloudTxt.fontWeight = 'normal';
			_this.grade3CloudTxt.fill = '#563814';
			_this.grade3CloudTxt.wordWrap = true;
			_this.grade3CloudTxt.wordWrapWidth = 500;

			_this.grade4Cloud = _this.add.sprite(250, 400, 'gradeCloud');
			_this.grade4Cloud.anchor.setTo(0.5);
			_this.grade4Cloud.name = "";
			_this.grade4Cloud.inputEnabled = true;
			_this.grade4Cloud.input.useHandCursor = true;
			//_this.grade4Cloud.events.onInputDown.add(_this.gradeSelected,_this);
			_this.grade4CloudTxt = this.add.text(240, 398, ' \n \n ');
			_this.grade4CloudTxt.anchor.setTo(0.5);
			_this.grade4CloudTxt.align = 'center';
			_this.grade4CloudTxt.font = 'gradefont';
			if (_this.languageSelected == "TM")
				_this.grade4CloudTxt.fontSize = 30;
			else
				_this.grade4CloudTxt.fontSize = 34;
			_this.grade4CloudTxt.fontWeight = 'normal';
			_this.grade4CloudTxt.fill = '#563814';
			_this.grade4CloudTxt.wordWrap = true;
			_this.grade4CloudTxt.wordWrapWidth = 500;

			_this.grade5Cloud = _this.add.sprite(700, 420, 'gradeCloud');
			_this.grade5Cloud.anchor.setTo(0.5);
			_this.grade5Cloud.name = "";
			_this.grade5Cloud.inputEnabled = true;
			_this.grade5Cloud.input.useHandCursor = true;
			//_this.grade5Cloud.events.onInputDown.add(_this.gradeSelected,_this);
			_this.grade5CloudTxt = this.add.text(690, 418, ' \n\n ');
			_this.grade5CloudTxt.anchor.setTo(0.5);
			_this.grade5CloudTxt.align = 'center';
			_this.grade5CloudTxt.font = 'gradefont';
			if (_this.languageSelected == "TM")
				_this.grade5CloudTxt.fontSize = 32;
			else
				_this.grade5CloudTxt.fontSize = 34;
			_this.grade5CloudTxt.fontWeight = 'normal';
			_this.grade5CloudTxt.fill = '#563814';
			_this.grade5CloudTxt.wordWrap = true;
			_this.grade5CloudTxt.wordWrapWidth = 500;

			_this.graphicsBg = _this.add.graphics(0, 0);
			_this.graphicsBg.lineStyle(0, 0xFFFFFF, 0.8);
			_this.graphicsBg.beginFill(0xF7D519, 0);
			_this.graphicsBg.drawRect(0, 0, 1920, 540);
			_this.graphicsBg.boundsPadding = 0;


			//	_this.languageSelected = localStorage.getItem("language");

			if (_this.languageSelected == "Hindi") {
				_this.grade6Cloud.frame = 1;
				_this.grade2Cloud.frame = 1;
				_this.grade3Cloud.frame = 1;
				_this.grade4Cloud.frame = 1;
				_this.grade5Cloud.frame = 1;
			}
			else if (_this.languageSelected == "Kannada") {
				_this.grade6Cloud.frame = 2;
				_this.grade2Cloud.frame = 2;
				_this.grade3Cloud.frame = 2;
				_this.grade4Cloud.frame = 2;
				_this.grade5Cloud.frame = 2;
			}
			else {
				_this.grade6Cloud.frame = 0;
				_this.grade7Cloud.frame = 0;
				_this.grade3Cloud.frame = 0;
				_this.grade4Cloud.frame = 0;
				_this.grade5Cloud.frame = 0;
			}

			_this.graphicsBg.addChild(_this.grade6Cloud);
			_this.graphicsBg.addChild(_this.grade7Cloud);
			_this.graphicsBg.addChild(_this.grade3Cloud);
			_this.graphicsBg.addChild(_this.grade4Cloud);
			_this.graphicsBg.addChild(_this.grade5Cloud);

		//	_this.graphicsBg.addChild(_this.grade6CloudTxt);
			_this.graphicsBg.addChild(_this.grade7CloudTxt);
			_this.graphicsBg.addChild(_this.grade3CloudTxt);
			_this.graphicsBg.addChild(_this.grade4CloudTxt);
			_this.graphicsBg.addChild(_this.grade5CloudTxt);

		}

	},

	onMouseOver: function (target) {


	},

	gradeSelected: function (target) {

		_this.gradeBackBtn.events.onInputDown.removeAll();
		_this.grade6Cloud.events.onInputDown.removeAll();
		_this.grade7Cloud.events.onInputDown.removeAll();
		_this.grade3Cloud.events.onInputDown.removeAll();
		_this.grade4Cloud.events.onInputDown.removeAll();


		_this.clickSound = _this.add.audio('ClickSound');
		_this.clickSound.play();


		switch (target.name) {
			case "grade6":
				gradeSelected = 6;
				grade2Selected = false;
				_this.state.start('selectgrade6MicroConceptScreen', true, false);
				break;
			case "grade7":
				gradeSelected = 7;
				grade2Selected = true;
				_this.state.start('selectgrade7MicroConceptScreen', true, false);
				break;
			case "grade3":
				gradeSelected = 3;
				grade2Selected = false;
				_this.state.start('selectgrade3MicroConceptScreen', true, false);
				break;
			case "grade4":
				gradeSelected = 4;
				grade2Selected = false;
				_this.state.start('selectgrade4MicroConceptScreen', true, false);
				break;
			case "grade5":
				gradeSelected = 5;
				grade2Selected = false;
				_this.state.start('selectgrade5MicroConceptScreen', true, false);
				break;
		}
	},


	shutdown: function () {
		window.currScreen = "";
		document.removeEventListener("online", _this.syncTelFunc, false);
	}


};
function successFunction() {
	console.log('Immersive mode set successfully.');
}

function errorFunction(error) {
	console.error('Error setting immersive mode:', error);
}
