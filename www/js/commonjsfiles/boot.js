var Game = {};

Game.boot = function () {

};

Game.boot.prototype = {

	init: function (app_Mode) {
		_this = this;
		_this.app_Mode = app_Mode;
	},

	preload: function () {

		AndroidFullScreen.immersiveMode(successFunction, errorFunction);
		window.baseUrl = "./";
		//window.baseUrl = "https://abbmath.klp.org.in/bbplusplus/assets1/";

		//_this.cache.destroy();

		// _this.languageSelected = localStorage.setItem("language","HIN");//ENG
		// window.languageSelected = "Hindi";

		_this.load.json('translations', 'js/lang.json');

		_this.load.image('prgressbarOutLine', window.baseUrl + 'assets/commonAssets/prgressbarOutLine.png');
		_this.load.image('preloadBar', window.baseUrl + 'assets/commonAssets/prgressbar.png');
		_this.load.image('loadingBg1', window.baseUrl + 'assets/commonAssets/loadingBg1.png');
		_this.load.image('loadingBg2', window.baseUrl + 'assets/commonAssets/loadingBg2.png');
		_this.load.image('CommonBackground', window.baseUrl + 'assets/commonAssets/commonBg.png');

		//console.log(_this.languageSelected,"_this.languageSelected");
	},

	create: function (game) {
		console.log("I am in boot.js");
		_this.bg = _this.add.tileSprite(0, -80, _this.world.width, _this.world.height, 'CommonAssets', 'commonBg');
		_this.bg.scale.setTo(1, 1.5);

		game.input.maxPointers = 1;

		screen.orientation.lock('landscape');
		AndroidFullScreen.setSystemUiVisibility(AndroidFullScreen.SYSTEM_UI_FLAG_FULLSCREEN, null, null);

		AndroidFullScreen.immersiveMode(successFunction, errorFunction);

		_this.game.scale.setGameSize(960, 540);

		_this.scale.forceOrientation(false, true);

		_this.game.app_Mode = _this.app_Mode;

		var translations = _this.cache.getJSON('translations');

		if (window.languageSelected == "Hindi") {
			console.log("ITS hindi game...!");
			window.selctedLang = translations.hn;

		}
		else if (window.languageSelected == "Kannada") {
			window.selctedLang = translations.kan;

		}
		else if (window.languageSelected == "Odiya") {
			window.selctedLang = translations.od;

		}
		else if (window.languageSelected == "GUJ") {
			window.selctedLang = translations.gu;
		}
		else if (window.languageSelected == "Marathi") {
			window.selctedLang = translations.ma;

		}
		else if (window.languageSelected == "Telugu") {
			window.selctedLang = translations.te;

		}
		else if (window.languageSelected == "Tamil") {
			window.selctedLang = translations.tm;

		}
		else if (window.languageSelected == "Urdu") {
			window.selctedLang = translations.ur;

		}
		else {
			window.selctedLang = translations.en;

		}

		// window.app_Mode = _this.app_Mode;
		// console.log(_this.languageSelected,"_this.languageSelected");
		_this.state.start('preloader', true, false);
	},

	shutdown: function () {
		_this = null;
	}

}
