Game.registrationPicSelectionScreen = function () {

};

Game.registrationPicSelectionScreen.prototype = {

	init: function (lang, user, app_Mode) {
		_this = this;
		_this.language = lang;
		_this.user = user;
		_this.app_Mode = app_Mode;
		console.log(_this.user, "_this.user in picSelection.js");
		console.log(_this.app_Mode, "_this.app_Mode in picSelection.js");
	},

	preload: function (game) {

	},

	create: function (game) {
		console.log("I am in registrationPicSelectionScreen");
		var avatarSelected = null;
		//Fullscreen.on();
		var splash = game.add.sprite(game.world.centerX, game.world.centerY, 'registrationbg');
		splash.scale.setTo(1);
		splash.anchor.setTo(0.5);

		var titleBar = game.add.graphics(0, 0);
		titleBar.anchor.setTo(0.5);
		titleBar.lineStyle(2, 0x000000, 0.8);
		titleBar.beginFill(0x4E342E, 1);
		titleBar.drawRect(0, 0, 540, 80);


		var regBackArrow = game.add.sprite(40, 40, 'regBackArrow');
		regBackArrow.scale.setTo(0.35);
		regBackArrow.anchor.setTo(0.5);

		var regBackArrowGrph = game.add.graphics(0, 0);
		regBackArrowGrph.beginFill(0x4E342E, 0.05);
		regBackArrowGrph.drawRect(-60, -60, 200, 200);
		regBackArrow.addChild(regBackArrowGrph);

		regBackArrow.inputEnabled = true;
		regBackArrow.events.onInputDown.add(function () {

			if (_this.app_Mode == "online") {
				if (_this.user)
					game.state.start('registrationLangSelectionScreen', true, false, _this.user, _this.app_Mode);
				else
					game.state.start('registrationLangSelectionScreen', true, false, _this.app_Mode);
			} else {
				if (_this.user)
					game.state.start('appLoginScreen', true, false, _this.app_Mode, _this.language);
				else
					game.state.start('appLoginScreen', true, false, _this.app_Mode, _this.language);
			}

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

		var textLang = "";
		if (_this.language == "Hindi") {
			textLang = "अपनी प्रोफाइल पिक्चर सेट करो";
		} else if (_this.language == "Kannada") {
			textLang = "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಚಿತ್ರವನ್ನು ಆರಿಸಿ";
		} else if (_this.language == "Odiya") {
			textLang = "ପ୍ରୋଫାଇଲ ଫଟୋ ଲଗାନ୍ତୁ";
		} else if (_this.language == "Gujarati") {
			textLang = "તમારૂં પ્રોફાઈલ પિક્ચર મૂકો";
		} else if (_this.language == "Marathi") {
			textLang = "आपले प्रोफाइल चित्र सेट करा"
		}
		else if (_this.language == "Telugu") {
			textLang = "మీ ప్రొఫైల్ చిత్రాన్ని సెట్ చేయండి"
		}
		else if (_this.language == "Tamil") {
			textLang = "உங்கள் சுயவிவரப் படத்தை அமைக்கவும்"
		}
		else if (_this.language == "Urdu") {
			textLang = "اپنی پروفائل تصویر سیٹ کریں"
		}
		else {
			textLang = "Set Your Profile Picture";
		}

		var selectPicTxt = game.add.text(game.world.centerX, 122, textLang);
		selectPicTxt.x = Math.round(selectPicTxt.x);
		selectPicTxt.anchor.setTo(0.5);
		selectPicTxt.align = 'center';
		selectPicTxt.font = 'regfont3';
		selectPicTxt.fontSize = '26pt';
		selectPicTxt.fontWeight = 0;
		selectPicTxt.fill = '#494949';
		selectPicTxt.wordWrap = true;
		selectPicTxt.wordWrapWidth = 500;


		var fish = game.add.sprite(150, 245, 'fish');
		fish.scale.setTo(0.8);
		fish.anchor.setTo(0.5);

		var butterfly = game.add.sprite(390, 245, 'butterfly');
		butterfly.scale.setTo(0.8);
		butterfly.anchor.setTo(0.5);

		var flower = game.add.sprite(150, 445, 'flower');
		flower.scale.setTo(0.8);
		flower.anchor.setTo(0.5);

		var parrot = game.add.sprite(390, 445, 'parrot');
		parrot.scale.setTo(0.8);
		parrot.anchor.setTo(0.5);

		var sun = game.add.sprite(150, 645, 'sun');
		sun.scale.setTo(0.8);
		sun.anchor.setTo(0.5);

		var tree = game.add.sprite(390, 645, 'tree');
		tree.scale.setTo(0.8);
		tree.anchor.setTo(0.5);



		var regTickBtn = game.add.sprite(game.world.centerX, game.world.centerY + 345, 'regTickBtn');
		regTickBtn.scale.setTo(0.5);
		regTickBtn.anchor.setTo(0.5);


		fish.inputEnabled = true;
		fish.events.onInputDown.add(function () {
			this.deactivateAll(fish, butterfly, flower, parrot, sun, tree);
			fish.frame = 1;
			avatarSelected = "Fish";
			this.checkActive(fish, butterfly, flower, parrot, sun, tree, regTickBtn, avatarSelected);
		}, this);


		butterfly.inputEnabled = true;
		butterfly.events.onInputDown.add(function () {
			this.deactivateAll(fish, butterfly, flower, parrot, sun, tree);
			butterfly.frame = 1;
			avatarSelected = "Butterfly";
			this.checkActive(fish, butterfly, flower, parrot, sun, tree, regTickBtn, avatarSelected);
		}, this);

		flower.inputEnabled = true;
		flower.events.onInputDown.add(function () {
			this.deactivateAll(fish, butterfly, flower, parrot, sun, tree);
			flower.frame = 1;
			avatarSelected = "Flower";
			this.checkActive(fish, butterfly, flower, parrot, sun, tree, regTickBtn, avatarSelected);
		}, this);

		parrot.inputEnabled = true;
		parrot.events.onInputDown.add(function () {
			this.deactivateAll(fish, butterfly, flower, parrot, sun, tree);
			parrot.frame = 1;
			avatarSelected = "Parrot";
			this.checkActive(fish, butterfly, flower, parrot, sun, tree, regTickBtn, avatarSelected);
		}, this);

		sun.inputEnabled = true;
		sun.events.onInputDown.add(function () {
			this.deactivateAll(fish, butterfly, flower, parrot, sun, tree);
			sun.frame = 1;
			avatarSelected = "Sun";
			this.checkActive(fish, butterfly, flower, parrot, sun, tree, regTickBtn, avatarSelected);
		}, this);

		tree.inputEnabled = true;
		tree.events.onInputDown.add(function () {
			this.deactivateAll(fish, butterfly, flower, parrot, sun, tree);
			tree.frame = 1;
			avatarSelected = "Tree";
			this.checkActive(fish, butterfly, flower, parrot, sun, tree, regTickBtn, avatarSelected);
		}, this);


		if (_this.user) {
			for (var i = 0; i < _this.user.length; i++) {
				if (_this.user[i].name.toLowerCase() == "fish") {
					fish.inputEnabled = false;
					fish.alpha = 0.5;
				}
				else if (_this.user[i].name.toLowerCase() == "butterfly") {
					butterfly.inputEnabled = false;
					butterfly.alpha = 0.5;
				}
				else if (_this.user[i].name.toLowerCase() == "parrot") {
					parrot.inputEnabled = false;
					parrot.alpha = 0.5;
				}
				else if (_this.user[i].name.toLowerCase() == "flower") {
					flower.inputEnabled = false;
					flower.alpha = 0.5;
				}
				else if (_this.user[i].name.toLowerCase() == "sun") {
					sun.inputEnabled = false;
					sun.alpha = 0.5;
				}
				else if (_this.user[i].name.toLowerCase() == "tree") {
					tree.inputEnabled = false;
					tree.alpha = 0.5;
				}
			}
		}
	},

	goback: function (e) {
		document.removeEventListener('backbutton', _this.goback, false);
		// if (_this.user)
		// 	_this.state.start('registrationLangSelectionScreen', true, false, _this.user, _this.app_Mode);
		// else
		// 	_this.state.start('registrationLangSelectionScreen', true, false, _this.user, _this.app_Mode);
	},

	deactivateAll: function (fish, butterfly, flower, parrot, sun, tree) {
		fish.frame = 0;
		butterfly.frame = 0;
		flower.frame = 0;
		parrot.frame = 0;
		sun.frame = 0;
		tree.frame = 0;
	},

	checkActive: function (fish, butterfly, flower, parrot, sun, tree, regTickBtn, avatarSelected) {
		if (fish.frame == 1 || butterfly.frame == 1 || flower.frame == 1
			|| parrot.frame == 1 || sun.frame == 1 || tree.frame == 1) {
			regTickBtn.frame = 1;
			regTickBtn.inputEnabled = true;
		}
		else {
			regTickBtn.frame = 0;
			regTickBtn.inputEnabled = false;
			avatarSelected = null;
		}
		regTickBtn.events.onInputDown.removeAll();
		regTickBtn.events.onInputDown.add(function (target) {
			FirebasePlugin.logEvent("Selected_Avatar", { Selected_Avatar: avatarSelected, item_id: "" });
			FirebasePlugin.logEvent("Button_click_tick_register", { Button_click_tick_regst: "", item_id: "" });
			this.register(target, avatarSelected);
		}, this);
	},

	register: function (target, avatarSelected) {
		target.inputEnabled = false;
		// var id = 1234;
		FirebasePlugin.getInstallationId(function (id) {
			console.log("Got installation ID: " + id);
			console.log(jsondata);
			//var jsondata = { name: avatarSelected, gender: null, schooltype: "0", geo: "77.580643,12.972442", grade: "1st Grade", deviceid: device.serial + "_" + device.uuid, language: _this.language, organization: "Akshara", avatarpic: " " };
			var jsondata = { name: avatarSelected, gender: null, schooltype: "0", geo: "77.580643,12.972442", grade: "1st Grade", deviceid: id, language: _this.language, organization: "Akshara" };
			console.log(jsondata);
			if (navigator.connection.type != "none" && navigator.connection.type != "unknown" && navigator.connection.type != null && navigator.connection.type != "undefined") {
				console.log("Reading the register api");
				var apiurl = "https://abbmath.klp.org.in/abbppchmprm/register";
				//var apiurl = "https://10.0.2.2/abbchmprm/register";  

				console.log("REDDD");
				$.ajax({
					url: apiurl,
					type: "POST",
					dataType: "json",
					// async:false, // set to false to perform a synchronous request
					data: JSON.stringify(jsondata),
					contentType: 'application/json; charset=UTF-8',
					accepts: 'application/json',
					success: function (jsonresp) {
						console.log(jsonresp);
						if (jsonresp.status == "success") {
							//window.plugins.toast.show(jsonresp.status, 3000, "bottom");
							target.events.onInputDown.removeAll();
							_this.checkOnlineForData(avatarSelected);
						}
						else {
							window.plugins.toast.show(jsonresp.status + "\n" + jsonresp.description, 3000, "bottom");
						}
					},
					error: function (error) {
						console.log(error);
						window.plugins.toast.show(error, 3000, "bottom");
						target.inputEnabled = true;
					}
				});
			}
			else {
				window.plugins.toast.show("please check your internet connection and try again", 3000, "bottom");
			}
		}, function (error) {
			console.error("Failed to get installation ID", error);
		});

	},

	checkOnlineForData: function (avatarName) {
		FirebasePlugin.getInstallationId(function (id) {
			console.log("Got installation ID: " + id);
			//var jsondata = { name: avatarName, deviceid: device.serial + "_" + device.uuid };
			var jsondata = { name: avatarName, deviceid: id };
			console.log(jsondata);
			if (navigator.connection.type != "none" && navigator.connection.type != "unknown" && navigator.connection.type != null && navigator.connection.type != "undefined") {
				var apiurl = "https://abbmath.klp.org.in/abbppchmprm/login";
				//var apiurl = "https://10.0.2.2/abbchmprm/login"; 
				console.log(jsondata);
				$.ajax({
					url: apiurl,
					type: "POST",
					dataType: "json",
					// async:false, // set to false to perform a synchronous request
					data: JSON.stringify(jsondata),
					contentType: 'application/json; charset=UTF-8',
					accepts: 'application/json',
					success: function (jsonresp) {
						console.log(jsonresp);
						if (jsonresp.status == "success") {
							//window.plugins.toast.show(jsonresp.status, 3000, "bottom");
							_this.checkOnlineForData2(avatarName, jsonresp.description);

						}
						else {

						}

					},
					error: function (error) {
						console.log(error);
						window.plugins.toast.show(error, 1000, "bottom");
					}

				});
			}
			else {
				window.plugins.toast.show("please check your internet connection and try again", 3000, "bottom");
				document.addEventListener("online", _this.checkNetwork, false);
			}
		}, function (error) {
			console.error("Failed to get installation ID", error);
		});
	},

	checkOnlineForData2: function (avatarName, acc_token) {
		FirebasePlugin.getInstallationId(function (id) {
			console.log("Got installation ID: " + id);
			//var jsondata = { name: avatarName, deviceid: device.serial + "_" + device.uuid };
			var jsondata = { name: avatarName, deviceid: id };

			if (navigator.connection.type != "none" && navigator.connection.type != "unknown" && navigator.connection.type != null && navigator.connection.type != "undefined") {
				var apiurl = "https://abbmath.klp.org.in/abbppchmprm/getchild";
				//var apiurl = "https://10.0.2.2/abbchmprm/getchild";     		        
				$.ajax({
					url: apiurl,
					type: "POST",
					dataType: "json",
					// async:false, // set to false to perform a synchronous request
					data: JSON.stringify(jsondata),
					contentType: 'application/json; charset=UTF-8',
					accepts: 'application/json',
					success: function (jsonresp) {
						console.log(jsonresp);
						if (jsonresp.status == "success") {
							//window.plugins.toast.show(jsonresp.status, 3000, "bottom");
							bbreglogin.bbdbhandler.executeSql("insert into user(uid, name, language, deviceId) values (?,?,?,?)", [acc_token, jsonresp.name, jsonresp.language, jsonresp.deviceid], null, null);
							jsonresp.uid = acc_token;
							_this.state.start('appLoginEditScreen', true, false, jsonresp, _this.app_Mode);//
							//_this.state.start('index2',true,false,_this.user,false,_this.languageSelected);//**If ONLINE 
						}
						else {

						}
					},
					error: function (error) {
						window.plugins.toast.show(error, 3000, "bottom");
					}
				});
			}
			else {
				window.plugins.toast.show("please check your internet connection and try again", 3000, "bottom");
			}
		}, function (error) {
			console.error("Failed to get installation ID", error);
		});
	},

	shutdown: function () {
		document.removeEventListener('backbutton', _this.goback, false);
	}
};