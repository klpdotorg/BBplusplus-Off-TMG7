Game.registrationLangSelectionScreen = function () {

};

Game.registrationLangSelectionScreen.prototype = {

	init: function (user, app_Mode) {
		_this = this;
		_this.user = user;
		_this.app_Mode = app_Mode;
		console.log("user,_this.app_Mode", _this.user, _this.app_Mode);
	},

	preload: function (game) {

	},

	create: function (game) {
		//Fullscreen.off();
		console.log("I am in registrationLangSelectionScreen");
		var splash = game.add.sprite(game.world.centerX, game.world.centerY, 'registrationbg');
		splash.scale.setTo(1);
		splash.anchor.setTo(0.5);

		var titleBar = game.add.graphics(0, 0);
		titleBar.anchor.setTo(0.5);
		titleBar.lineStyle(2, 0x000000, 0.8);
		titleBar.beginFill(0x4E342E, 1);
		titleBar.drawRect(0, 0, 540, 80);


		if (_this.user) {
			var regBackArrow = game.add.sprite(40, 40, 'regBackArrow');
			regBackArrow.scale.setTo(0.35);
			regBackArrow.anchor.setTo(0.5);

			var regBackArrowGrph = game.add.graphics(0, 0);
			regBackArrowGrph.beginFill(0x4E342E, 0.05);
			regBackArrowGrph.drawRect(-60, -60, 200, 200);
			regBackArrow.addChild(regBackArrowGrph);

			regBackArrow.inputEnabled = true;
			regBackArrow.events.onInputDown.add(function () {
				game.state.start('appLoginScreen', true, false, _this.app_Mode);//,lang
			}, this);

			document.addEventListener('backbutton', _this.goback, false);


			var titleTxt = game.add.text(game.world.centerX - 80, 45, "Building Blocks++");
			titleTxt.x = Math.round(titleTxt.x);
			titleTxt.anchor.setTo(0.5);
			titleTxt.align = 'center';
			titleTxt.font = 'regfont4';
			titleTxt.fontSize = '22pt';
			titleTxt.fontWeight = 500;
			titleTxt.fill = '#FFFFFF';
			titleTxt.wordWrap = true;
			titleTxt.wordWrapWidth = 500;
		}
		else {
			var titleTxt = game.add.text(game.world.centerX - 140, 45, "Building Blocks++");
			titleTxt.x = Math.round(titleTxt.x);
			titleTxt.anchor.setTo(0.5);
			titleTxt.align = 'center';
			titleTxt.font = 'regfont4';
			titleTxt.fontSize = '22pt';
			titleTxt.fontWeight = 500;
			titleTxt.fill = '#FFFFFF';
			titleTxt.wordWrap = true;
			titleTxt.wordWrapWidth = 500;
		}


		var graphicBg = game.add.sprite(game.world.centerX, game.world.centerY - 60, 'graphicBg');
		graphicBg.scale.setTo(0.6, 0.5);
		graphicBg.anchor.setTo(0.5);

		var carrotIcon = game.add.sprite(game.world.centerX + 110, game.world.centerY - 60, 'carrotIcon');
		carrotIcon.scale.setTo(0.7);
		carrotIcon.anchor.setTo(0.5);


		var regTickBtn = game.add.sprite(game.world.centerX, game.world.centerY + 90, 'regTickBtn');
		regTickBtn.scale.setTo(0.5);
		regTickBtn.anchor.setTo(0.5);


		this.selectLanguageText = game.add.text(game.world.centerX - 10, game.world.centerY - 57, "Select Language");
		this.selectLanguageText.x = Math.round(this.selectLanguageText.x);
		this.selectLanguageText.anchor.setTo(0.5);
		this.selectLanguageText.align = 'center';
		this.selectLanguageText.font = 'regfont1';
		this.selectLanguageText.fontSize = '17pt';
		this.selectLanguageText.fontWeight = 'normal';
		this.selectLanguageText.fill = '#000000';
		this.selectLanguageText.wordWrap = true;
		this.selectLanguageText.wordWrapWidth = 500;



		graphicBg.inputEnabled = true;
		graphicBg.events.onInputDown.add(function (target) {
			target.inputEnabled = false;

			this.languageSelectedGrp = game.add.group();

			var languageList = ["Select Language", "English", "हिंदी", "ಕನ್ನಡ", "ଓଡ଼ିଆ", "मराठी", "தமிழ்"];
			//var languageList = ["Select Language"];//"తెలుగు", "اردو", "ગુજરાતી"

			var x = game.world.centerX - 140;
			var y = game.world.centerY - 80;

			for (var i = 0; i < languageList.length; i++) {
				if (i != 0)
					y = y + 55;
				this.createDropDownMenu(game, languageList[i], i, x, y, this.languageSelectedGrp, target, languageList, regTickBtn);
			}
		}, this);

	},

	goback: function (e) {
		document.removeEventListener('backbutton', _this.goback, false);
		_this.state.start('appLoginScreen', true, false, _this.app_Mode, lang);
	},


	createDropDownMenu: function (game, lang, i, x, y, grp, targetGpc, list, regTickBtn) {
		this["languagegraphicsBg" + i] = game.add.graphics(0, 0);
		this["languagegraphicsBg" + i].anchor.setTo(0.5);
		this["languagegraphicsBg" + i].name = lang;
		//this["languagegraphicsBg"+i].lineStyle(2, 0x000000, 0.8);
		this["languagegraphicsBg" + i].beginFill(0xFFFFFF, 1);
		//this["languagegraphicsBg"+i].drawRoundedRect(x, y, 280, 45, 10);
		this["languagegraphicsBg" + i].drawRect(x, y, 280, 55);

		if ((i + 1) < 10) {
			this["bdm" + i] = game.add.bitmapData(800, 600);
			this["bdm" + i].ctx.beginPath();
			this["bdm" + i].ctx.lineWidth = "5";
			this["bdm" + i].ctx.strokeStyle = '#000000';
			this["bdm" + i].ctx.setLineDash([2, 3]);
			this["bdm" + i].ctx.moveTo(0, 0);
			this["bdm" + i].ctx.lineTo(280, 0);
			//ctx.moveTo(100, 10);
			//ctx.quadraticCurveTo(230, 150, 250, 20);        
			this["bdm" + i].ctx.stroke();
			this["bdm" + i].ctx.closePath();
			this["sprite" + i] = game.add.sprite(x, y + 52, this["bdm" + i]);
		}


		this["languageTxt" + i] = game.add.text(game.world.centerX, y + 28, lang);
		this["languageTxt" + i].x = Math.round(this["languageTxt" + i].x);
		this["languageTxt" + i].anchor.setTo(0.5);
		this["languageTxt" + i].align = 'center';
		this["languageTxt" + i].font = 'regfont1';
		this["languageTxt" + i].fontSize = '17pt';
		this["languageTxt" + i].fontWeight = 'normal';
		this["languageTxt" + i].fill = '#000000';
		this["languageTxt" + i].wordWrap = true;
		this["languageTxt" + i].wordWrapWidth = 500;

		this["languagegraphicsBg" + i].inputEnabled = true;
		this["languagegraphicsBg" + i].events.onInputDown.add(function (target) {
			this.selectLanguageText.text = target.name;
			target.events.onInputDown.removeAll();
			grp.destroy();
			targetGpc.inputEnabled = true;
			regTickBtn.frame = 0;
			regTickBtn.inputEnabled = true;
			regTickBtn.events.onInputDown.removeAll();

			if (this.selectLanguageText.text !== list[0]) {
				regTickBtn.frame = 1;
				regTickBtn.inputEnabled = true;
				regTickBtn.events.onInputDown.add(function (targets) {
					var lang = null;

					if (target.name == "हिंदी") {
						lang = "Hindi"
					}
					else if (target.name == "ಕನ್ನಡ") {
						lang = "Kannada"
					}
					else if (target.name == "ଓଡ଼ିଆ") {
						lang = "Odiya"
					}

					else if (target.name == "ગુજરાતી") {
						lang = "Gujarati"
					}

					else if (target.name == "मराठी") {
						lang = "Marathi"
					}
					else if (target.name == "తెలుగు") {
						lang = "Telugu"
					}
					else if (target.name == "தமிழ்") {
						lang = "Tamil"
					}
					else if (target.name == "اردو") {
						lang = "Urdu"
					}
					else {
						lang = "English"
					}

					console.log(lang, "lang //////////");
					FirebasePlugin.logEvent("Select_language", { Select_language: lang, item_id: "" });

					game.state.start('registrationPicSelectionScreen', true, false, lang, _this.user, _this.app_Mode);
				}, this);
			}
		}, this);

		grp.add(this["languagegraphicsBg" + i]);
		if ((i + 1) < 10)
			grp.add(this["sprite" + i]);
		grp.add(this["languageTxt" + i]);

		// _this.languageSelected = localStorage.setItem("language","ENG");//ENG
		// window.languageSelected = "English";
	},

	shutdown: function () {
		document.removeEventListener('backbutton', _this.goback, false);
	}
};