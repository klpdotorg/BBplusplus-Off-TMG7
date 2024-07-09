Game.GMLA_01_G7level1 = function () { };


Game.GMLA_01_G7level1.prototype =
{
    init: function (param, score) {
        _this = this;

        this.Stararr = param;
        this.score = score;
        _this = this;
        _this.languageSelected = window.languageSelected;

        if (_this.languageSelected == null
            || _this.languageSelected == " "
            || _this.languageSelected == "") {
            _this.languageSelected = "ENG";
        }
        else console.log("Language selected: " + _this.languageSelected);
        _this.clickSound = document.createElement('audio');
        _this.clickSoundsrc = document.createElement('source');
        _this.clickSoundsrc.setAttribute("src", window.baseUrl + "sounds/ClickSound.mp3");
        _this.clickSound.appendChild(_this.clickSoundsrc);

        _this.successSound = document.createElement('audio');
        _this.successSoundsrc = document.createElement('source');
        _this.successSoundsrc.setAttribute("src", window.baseUrl + "sounds/Success.mp3");
        _this.successSound.appendChild(_this.successSoundsrc);

        _this.celebrationSound = document.createElement('audio');
        _this.celebrationSoundsrc = document.createElement('source');
        _this.celebrationSoundsrc.setAttribute("src", window.baseUrl + "sounds/celebration.mp3");
        _this.celebrationSound.appendChild(_this.celebrationSoundsrc);

        _this.counterCelebrationSound = document.createElement('audio');
        _this.counterCelebrationSoundsrc = document.createElement('source');
        _this.counterCelebrationSoundsrc.setAttribute("src", window.baseUrl + "sounds/counter_celebration.mp3");
        _this.counterCelebrationSound.appendChild(_this.counterCelebrationSoundsrc);

        _this.wrongans = document.createElement('audio');
        _this.wronganssrc = document.createElement('source');
        _this.wronganssrc.setAttribute("src", window.baseUrl + "sounds/WrongCelebrationSound.mp3");
        _this.wrongans.appendChild(_this.wronganssrc);

        _this.framechange = document.createElement('audio');
        _this.framechangesrc = document.createElement('source');
        _this.framechangesrc.setAttribute("src", window.baseUrl + "sounds/Frame_change_sound.mp3");
        _this.framechange.appendChild(_this.framechangesrc);

        _this.snapSound = document.createElement('audio');
        _this.snapSoundsrc = document.createElement('source');
        _this.snapSoundsrc.setAttribute("src", window.baseUrl + "sounds/snapSound.mp3");
        _this.snapSound.appendChild(_this.snapSoundsrc);

        _this.Ask_Question1 = _this.createAudio("GMLA_01_G7_a1");//Adjust the protractor to find the angle.
        _this.Ask_Question2 = _this.createAudio("GMLA_01_G7_a2");//What is the angle?
        _this.Ask_Question3a = _this.createAudio("GMLA_01_G7_a3");//Adjust the pointer to find the complementary angle.
        _this.Ask_Question3b = _this.createAudio("V3-b");//
        _this.Ask_Question4a = _this.createAudio("GMLA_01_G7_a4");//Now, calculate and type the complementary angle.
        _this.Ask_Question4b = _this.createAudio("GMLA_01_G7_a5");//Now, calculate and type the supplementary angle.

        telInitializer.gameIdInit("GMLA_01_G7", gradeSelected);
        console.log(gameID, "gameID...");
    },

    create: function (game) {
        _this.hintBtn = _this.add.sprite(670, 6, 'bulb');
        _this.hintBtn.scale.setTo(0.5, 0.6);
        _this.hintBtn.visible = false;

        //* show the demo video
        _this.time.events.add(1, function () {

            _this.ViewDemoVideo();
        });

        //* start the game with delay. Since the Demo video will pause the game, the timer will freeze
        //* and then start after the game is unpaused and continues to call the gameCreate function.
        _this.time.events.add(1500, function () {
            console.log("//////////////////")
            _this.gameCreate(game);
        });
    },

    ViewDemoVideo: function () {
        //* pause the game before going to the demovideo 
        _this.game.paused = true;
        _this.DemoVideo();  //* at the end of demo video/skip pressed, it will unpause the game.
    },

    gameCreate: function (game) {
        _this.hint_flag = 0;
        _this.count1 = 0;
        _this.speakerbtn;
        _this.background;
        _this.starsGroup;

        _this.microConcepts;

        _this.questionid = null;
        _this.noofAttempts = 0;
        _this.sceneCount = 0;
        _this.AnsTimerCount = 0;

        _this.seconds = 0;
        _this.minutes = 0;
        _this.selectedAns1 = '';
        _this.selectedAns2 = '';
        _this.selectedAns3 = '';

        _this.radius = 320;

        _this.counterForTimer = 0;
        _this.isDrag = false;

        _this.speakerbtnClicked = false;
        _this.rightbtn_Clicked = false;

        _this.Question_flag = -1;

        _this.background = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'bg');
        //** include the background file, navigation bar, stars, timer objects.

        _this.navBar = _this.add.sprite(0, 0, 'navBar');

        _this.backbtn = _this.add.sprite(5, 6, 'backbtn');
        _this.backbtn.inputEnabled = true;
        _this.backbtn.input.useHandCursor = true;
        _this.backbtn.events.onInputDown.add(function () {
            _this.state.start('grade7Geometry');
        });

        _this.speakerbtn = _this.add.sprite(600, 6, 'CommonSpeakerBtn');

        _this.speakerbtn.events.onInputDown.add(function () {
            telInitializer.tele_interactEvent("TOUCH", "speaker");
            if (_this.speakerbtnClicked == false && _this.rightbtn_Clicked == false) {
                _this.speakerbtn.inputEnabled = false;
                _this.speakerbtn.input.useHandCursor = false;
                _this.clickSound.play();

                if (_this.Question_flag == 1) {
                    _this.Ask_Question1.play();
                }
                if (_this.Question_flag == 2) {
                    _this.Ask_Question2.play();
                }
                if (_this.Question_flag == 3 && randarr[_this.count1] == 0) {
                    _this.Ask_Question3a.play();
                }
                else if (_this.Question_flag == 3 && randarr[_this.count1] == 1)
                    _this.Ask_Question3b.play();

                if (_this.Question_flag == 4 && randarr[_this.count1] == 0) {
                    _this.Ask_Question4a.play();
                }
                else if (_this.Question_flag == 4 && randarr[_this.count1] == 1)
                    _this.Ask_Question4b.play();

                _this.time.events.add(3000, function () {
                    _this.speakerbtnClicked = false;
                    _this.EnableVoice();
                });
            }

        }, _this);

        _this.timebg = _this.add.sprite(305, 6, 'timebg');
        _this.timeDisplay = _this.add.text(330, 22, _this.minutes + ' : ' + _this.seconds);
        _this.timeDisplay.anchor.setTo(0.5);
        _this.timeDisplay.align = 'center';
        _this.timeDisplay.font = 'Oh Whale';
        _this.timeDisplay.fontSize = 20;
        _this.timeDisplay.fill = '#ADFF2F';

        _this.numGroup;

        // BULB
        _this.hintBtn.bringToTop();
        _this.hintBtn.visible = true;
        _this.hintBtn.smoothed = false;
        _this.hintBtnAnim = _this.hintBtn.animations.add('hint');
        _this.hintBtnAnim.play(15);
        _this.hintBtnAnim.onComplete.add(function () {
            _this.hintBtnAnim.play(15);
        }, _this);
        _this.hintBtn.inputEnabled = true;
        _this.hintBtn.input.useHandCursor = true;

        _this.hintBtn.events.onInputDown.add(function () {
            console.log("inside hintbutton function");
            //* show the demo video
            _this.hintBtn.inputEnabled = false;
            _this.hintBtn.input.useHandCursor = false;
            _this.time.events.add(1, function () {
                //   console.log(_this.hintBtn.inputEnabled, "status of hintBtn");
                _this.ViewDemoVideo();
            });

        });

        _this.generateStarsForTheScene(6);

        //* start the game with first question
        _this.time.events.add(1000, _this.getQuestion);

        _this.questionid = 1;
    },


    createAudio: function (src) {
        audio = document.createElement('audio');
        audiosrc = document.createElement('source');
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-01-G7/" + _this.languageSelected + "/" + src + ".mp3");
        audio.appendChild(audiosrc);

        return audio;
    },

    //* function to enable the speaker button once pressed.
    EnableVoice: function () {
        if (_this.speakerbtnClicked == false && _this.rightbtn_Clicked == false) {
            _this.speakerbtn.inputEnabled = true;
            _this.speakerbtn.input.useHandCursor = true;
            _this.speakerbtnClicked = false;
        }
    },

    updateTimer: function () {
        _this.counterForTimer++;
        if (_this.counterForTimer > 59) {
            _this.counterForTimer = 0;

            if (_this.minutes < 10) {
                _this.minutes = _this.minutes + 1;
                _this.seconds = 00;
            }
            else {
                _this.minutes = _this.minutes + 1;
            }
        }
        else {
            if (_this.counterForTimer < 10)
                _this.seconds = '0' + _this.counterForTimer;
            else
                _this.seconds = _this.counterForTimer;
        }
        _this.timeDisplay.setText(_this.minutes + ':' + _this.seconds);
    },
    getQuestion: function (target) {
        if (_this.timer) {
            _this.timer.stop();
            _this.timer = null;
        }
        _this.timer = _this.time.create(false);

        //  Set a TimerEvent to occur after 2 seconds
        _this.timer.loop(1000, function () {
            _this.hintBtn.inputEnabled = true;
            _this.hintBtn.input.useHandCursor = true;
            _this.AnsTimerCount++;
        }, _this);



        //  Start the timer running - this is important!
        //  It won't start automatically, allowing you to hook it to button events and the like.
        _this.timer.start();

        /*******************For Navigation Bar*********************/
        _this.timer1 = _this.time.create(false);

        _this.timer1.loop(1000, function () {
            _this.updateTimer();
        }, _this);

        _this.timer1.start();

        /************************$$$$$$$$$$**********************/

        //  Start the timer running - this is important!
        //  It won't start automatically, allowing you to hook it to button events and the like.

        _this.speakerbtn.inputEnabled = true;
        _this.speakerbtn.input.useHandCursor = true;


        // Stores Random Question values in Array
        _this.Initial_randomizing();
        //starting the game with initial screen display
        _this.showInitialScreen();

        _this.hintBtn.inputEnabled = true;
        _this.hintBtn.input.useHandCursor = true;
        _this.hint_flag = 1;

    },
    stopVoice: function () {
        _this.Ask_Question1.pause();
        _this.Ask_Question1 = null;

        _this.Ask_Question2.pause();
        _this.Ask_Question2 = null;

        _this.Ask_Question3a.pause();
        _this.Ask_Question3a = null;

        _this.Ask_Question3b.pause();
        _this.Ask_Question3b = null;

        _this.Ask_Question4a.pause();
        _this.Ask_Question4a = null;

        _this.Ask_Question4b.pause();
        _this.Ask_Question4b = null;



        if (_this.celebrationSound) {
            if (_this.celebrationSound.isPlaying) {
                _this.celebrationSound.stop();
                _this.celebrationSound = null;
            }
        }
    },

    generateStarsForTheScene: function (count) {
        _this.starsGroup = _this.add.group();
        for (var i = 0; i < count; i++) {
            _this.starsGroup.create(_this.world.centerX - 15, 10, 'starAnim');
            for (var j = 0; j < i; j++) {
                if (_this.starsGroup.getChildAt(j)) {
                    _this.starsGroup.getChildAt(j).x -= 15;
                    _this.starsGroup.getChildAt(i).x += 15;
                }
            }
        }

    },
    shuffle: function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },


    Initial_randomizing: function () {
        //* store possible test cases to display the equation and shuffle it
        //* created array for storing the A value and B value.
        //* In our game we have 3 supplementary and 3 complementary. 
        //* we have 0 and 1. if 0 generates and stores complementary and if 1 supplementary

        //* Answer of complementary should not be more than 90 
        //* array value is in limit of 80 and denominator 80.
        //* _this.a =  //* max 80  min 10  
        //* _this.b =  //* max 80  min 10 
        //* _this.a +_this.b=90

        //* Answer of supplementary should not be more than 180 
        //* array value is in limit of 170 and denominator 170.
        //* _this.a =  //* max 170  min 10  
        //* _this.b =  //* max 170  min 10 
        //* _this.a +_this.b=180   


        randarr = [0, 0, 0, 1, 1, 1]; //for randomising between supplemntary or complementary
        randarr = _this.shuffle(randarr);
        randarr1 = [0, 0, 0, 1, 1, 1];  //for randomising in supplemetary combination
        randarr1 = _this.shuffle(randarr1);
        console.log(randarr);
        _this.aArr = [];
        _this.bArr = [];
        numeratorA = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]; //for complemenatry
        numeratorA = _this.shuffle(numeratorA);
        numeratorB = [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 165, 160, 170];  //for supplementary
        numeratorB = _this.shuffle(numeratorB);
        console.log(numeratorA);
        console.log(numeratorB);



        for (i = 0; i < 6; i++) {
            if (randarr[i] == 0) //complementary
            {
                for (j = 0; j <= i - 1; j++)  //for no repetition of angles
                {
                    if (numeratorA[i] == (90 - _this.aArr[j]) || numeratorA[i] == _this.aArr[j]) {
                        console.log("1....................");
                        a = Math.floor(Math.random() * (14 - 1) + 1);
                        console.log("a ", a);
                        numeratorA[i] = numeratorA[a];
                        console.log("j ", j);
                        j = -1;
                    }
                }
                _this.aArr.push(numeratorA[i]);
                _this.bArr.push(90 - numeratorA[i]);  //stores the difference angle
            }
            else //supplementary
            {
                for (j = 0; j <= i - 1; j++)   //for no repetition of angles
                {
                    if (numeratorB[i] == (180 - _this.aArr[j]) || numeratorB[i] == _this.aArr[j]) {
                        console.log("2....................");
                        a = Math.floor(Math.random() * (14 - 1) + 1);
                        console.log("a ", a);
                        numeratorB[i] = numeratorB[a];
                        console.log("j ", j);
                        j = -1;
                    }
                }
                _this.aArr.push(numeratorB[i]);
                _this.bArr.push(180 - numeratorB[i]);  //stores the difference angle
            }

        }
        console.log(_this.aArr);
        console.log(_this.bArr);

    },

    showInitialScreen: function () {
        _this.sceneCount++;
        _this.noofAttempts = 0;
        _this.AnsTimerCount = 0;
        _this.Question_flag = 1;
        if (_this.count1 == 0)
            _this.Ask_Question1.play();

        _this.panel2 = _this.add.sprite(30, 70, 'panel2');
        _this.panel2.scale.setTo(1, 1.1);

        _this.prot1 = _this.add.sprite(250, 81, 'inProtc');
        _this.prot1.scale.setTo(0.58, 0.6);

        _this.orangearr = _this.add.sprite(444, 280, 'orange arr');
        _this.orangearr.scale.setTo(0.51, 0.53);
        _this.orangearr.anchor.setTo(0, 0.5);
        _this.bluearr = _this.add.image(444, 280, 'blue arr');
        _this.bluearr.scale.setTo(0.51, 0.53);
        _this.bluearr.anchor.setTo(0, 0.5);

        console.log(randarr[_this.count1]);
        if (randarr[_this.count1] == 0)   //complementary
        {
            console.log(_this.aArr[_this.count1]);
            console.log("complementary");
            _this.orangearr.angle = _this.aArr[_this.count1];  //display orange arrow according to its angle
            _this.bluearr.angle = _this.orangearr.angle + _this.bArr[_this.count1];  //display blue arrow according to its angle
        }
        else //supplementary
        {
            console.log("rand12");
            console.log(randarr1[_this.count1]);
            console.log("supplementary");
            console.log(_this.aArr[_this.count1]);
            //to get questions starting at different place supplementary is randomised again
            if (randarr1[_this.count1] == 0) {
                _this.orangearr.angle = 160 + _this.aArr[_this.count1];
                _this.bluearr.angle = _this.orangearr.angle + _this.bArr[_this.count1];
            }
            else {
                _this.orangearr.angle = 180 + _this.aArr[_this.count1];
                _this.bluearr.angle = _this.orangearr.angle + _this.bArr[_this.count1];
            }

        }

        //for creating pink mask
        // Create a new circle sprite
        _this.circle = _this.game.add.graphics(444, 280);
        _this.circle.beginFill(0xE11584);
        _this.circle.drawCircle(0, 0, 84);
        _this.circle.endFill();

        // Create a new mask graphics object
        _this.mask = _this.game.add.graphics(444, 280);

        // Draw a sector shape on the mask graphics object
        _this.mask.beginFill(0xffffff);
        _this.mask.moveTo(0, 0);
        _this.mask.lineTo(50, 0);
        _this.mask.arc(0, 0, 50, _this.game.math.degToRad(_this.bluearr.angle), _this.game.math.degToRad(_this.orangearr.angle), true);
        _this.mask.lineTo(0, 0);
        _this.mask.endFill();

        // Apply the mask to the circle sprite
        _this.circle.mask = _this.mask;

        _this.prot2 = _this.add.sprite(444, 280, 'outProtc');
        _this.prot2.scale.setTo(0.6, 0.58);
        _this.prot2.angle = 90;
        _this.prot2.anchor.setTo(0.5, 0.5)


        _this.prot1.inputEnabled = true;
        _this.prot1.input.useHandCursor = true;
        _this.prot1.events.onInputDown.add(_this.secondScreen, _this);  //on click get the bigger version of protractor

    },

    secondScreen: function () {

        _this.circle.destroy();
        _this.mask.destroy();


        _this.panel2.scale.setTo(1, 1);
        _this.prot3 = _this.add.sprite(452, 450, 'inProtc');
        _this.prot3.anchor.setTo(0.5, 0.5);
        _this.prot3.visible = false;


        _this.tickbtn = _this.add.sprite(870, 400, 'TickBtn');
        _this.tickbtn.inputEnabled = true;
        _this.tickbtn.input.useHandCursor = true;
        _this.tickbtn.events.onInputDown.add(_this.evaluate, _this);


        if (randarr[_this.count1] == 0) //complmentary
        {
            _this.orangearr1 = _this.add.sprite(454, 450, 'orange arr');
            _this.orangearr1.scale.setTo(0.9, 0.8);
            _this.new = -(180 - _this.orangearr.angle);
            _this.orangearr1.angle = -180;
            _this.orangearr1.anchor.setTo(0, 0.5);

            _this.bluearr1 = _this.add.sprite(454, 450, 'blue arr');
            _this.bluearr1.scale.setTo(0.9, 0.8);
            _this.bluearr1.angle = -180 + _this.bArr[_this.count1];
            _this.bluearr1.anchor.setTo(0, 0.5);

            _this.prot4 = _this.add.sprite(448, 450, 'outProtc');
            _this.prot4.anchor.setTo(0.5, 0.5);
            _this.prot4.angle = -90 - _this.new - 180;
            _this.prot3.angle = -90 - _this.new - 180;
        }
        else {
            console.log("rand12");
            console.log(randarr1[_this.count1]);
            _this.orangearr1 = _this.add.sprite(454, 450, 'orange arr');
            _this.orangearr1.scale.setTo(0.9, 0.8);
            _this.orangearr1.anchor.setTo(0, 0.5);

            _this.bluearr1 = _this.add.sprite(454, 450, 'blue arr');
            _this.bluearr1.scale.setTo(0.9, 0.8);
            _this.bluearr1.anchor.setTo(0, 0.5);
            if (randarr1[_this.count1] == 0) {
                console.log("type1");
                _this.orangearr1.angle = -180;
                console.log("orange");
                console.log(_this.orangearr1.angle);
                console.log(_this.aArr[_this.count1]);
                _this.bluearr1.angle = _this.orangearr1.angle + _this.bArr[_this.count1];
                console.log("blue");
                console.log(_this.bluearr1.angle);
                _this.prot4 = _this.add.sprite(448, 450, 'outProtc');
                _this.prot4.anchor.setTo(0.5, 0.5);
                _this.prot3.angle = _this.prot4.angle = -_this.aArr[_this.count1] + 110;
            }
            else {
                console.log("type2");
                _this.orangearr1.angle = -180;
                console.log("orange");
                console.log(_this.orangearr1.angle);
                _this.bluearr1.angle = _this.orangearr1.angle + _this.bArr[_this.count1];
                console.log("blue");
                console.log(_this.bluearr1.angle);
                _this.prot4 = _this.add.sprite(448, 450, 'outProtc');
                _this.prot4.anchor.setTo(0.5, 0.5);
                _this.prot3.angle = _this.prot4.angle = -_this.aArr[_this.count1] + 90;
            }

        }
        _this.orangearr1.visible = false;
        _this.bluearr1.visible = false;
        _this.prot4.visible = false;

        _this.zoomTween1 = _this.add.tween(_this.prot1.scale).to({ x: 1, y: 1 }, 1400, Phaser.Easing.Linear.None, true);
        _this.tween = _this.add.tween(_this.prot1).to({ x: 120, y: 118 }, 1400, Phaser.Easing.Linear.None, true);

        _this.zoomTween2 = _this.add.tween(_this.prot2.scale).to({ x: 1, y: 1 }, 1400, Phaser.Easing.Linear.None, true);
        _this.tween3 = _this.add.tween(_this.prot2).to({ x: 446, y: 450, angle: _this.prot4.angle }, 1400, Phaser.Easing.Linear.None, true);

        _this.zoomTween3 = _this.add.tween(_this.orangearr.scale).to({ x: 0.9, y: 0.8 }, 1500, Phaser.Easing.Linear.None, true);
        _this.tween1 = _this.add.tween(_this.orangearr).to({ x: 450, y: 450, angle: -180 }, 1400, Phaser.Easing.Linear.None, true);

        // _this.zoomTween5 = _this.add.tween(_this.mask.scale).to({ x: 0.9, y: 0.8}, 1500, Phaser.Easing.Linear.None, true);
        // _this.tween5 = _this.add.tween(_this.mask).to({x: 446, y: 450,angle:-180}, 1500, Phaser.Easing.Linear.None, true);
        //_this.tween5 = _this.add.tween(_this.mask).to({radius: 100}, 1500, Phaser.Easing.Linear.None, true);

        // _this.zoomTween6 = _this.add.tween(_this.circle.scale).to({ x: 0.9, y: 0.8}, 1500, Phaser.Easing.Linear.None, true);
        // _this.tween6 = _this.add.tween(_this.circle).to({x: 446, y: 450,angle:-180}, 1500, Phaser.Easing.Linear.None, true);
        //_this.tween6 = _this.add.tween(_this.circle).to({radius: 100}, 1500, Phaser.Easing.Linear.None, true);

        _this.zoomTween4 = _this.add.tween(_this.bluearr.scale).to({ x: 0.9, y: 0.8 }, 1400, Phaser.Easing.Linear.None, true);
        _this.tween2 = _this.add.tween(_this.bluearr).to({ x: 450, y: 450, angle: _this.bluearr1.angle }, 1400, Phaser.Easing.Linear.None, true);


        //creating mask for protactor
        // Create a new mask graphics object
        _this.mask22 = _this.game.add.graphics(440, 462);

        // Draw a sector shape on the mask graphics object
        _this.mask22.beginFill(0xffffff);
        _this.mask22.moveTo(0, 0);
        _this.mask22.lineTo(50, 0);
        _this.mask22.arc(0, 0, 400, _this.game.math.degToRad(3), _this.game.math.degToRad(182), true);
        _this.mask22.lineTo(0, 0);
        _this.mask22.endFill();

        // Apply the mask to the circle sprite
        _this.prot1.mask = _this.mask22;
        _this.prot2.mask = _this.mask22;



        _this.tween.onComplete.add(function () {


            _this.prot1.destroy();
            _this.prot2.destroy();
            _this.orangearr.destroy();
            _this.bluearr.destroy();
            _this.mask22.destroy();
            //  _this.mask.destroy();
            //  _this.circle.destroy();

            _this.prot4.visible = true;
            _this.prot3.visible = true;

            _this.orangearr1.visible = true;
            _this.bluearr1.visible = true;


            //tween to increase scale size
            //  _this.zoomTween1 = _this.add.tween(_this.prot4.scale).to({ x: 1, y: 1 }, 1400, Phaser.Easing.Linear.None, true);
            //  _this.zoomTween2 = _this.add.tween(_this.prot3.scale).to({ x: 1, y: 1 }, 1400, Phaser.Easing.Linear.None, true);
            //  _this.zoomTween3 = _this.add.tween(_this.orangearr1.scale).to({ x: 0.9, y: 0.8}, 1400, Phaser.Easing.Linear.None, true);
            //  _this.zoomTween4 = _this.add.tween(_this.bluearr1.scale).to({ x: 0.9, y: 0.8 }, 1400, Phaser.Easing.Linear.None, true);


            _this.circle1 = _this.game.add.graphics(453, 450);
            _this.circle1.beginFill(0xE11584);
            _this.circle1.drawCircle(0, 0, 144);
            _this.circle1.endFill();

            //adding pink mask
            // Create a new mask graphics object
            _this.mask3 = _this.game.add.graphics(453, 450);

            // Draw a sector shape on the mask graphics object
            _this.mask3.beginFill(0xffffff);
            _this.mask3.moveTo(0, 0);
            _this.mask3.lineTo(50, 0);
            _this.mask3.arc(0, 0, 130, _this.game.math.degToRad(-180 + _this.bArr[_this.count1]), _this.game.math.degToRad(-180), true);
            _this.mask3.lineTo(0, 0);
            _this.mask3.lineTo(0, 0);
            _this.mask3.endFill();
            // Apply the mask to the circle sprite
            _this.circle1.mask = _this.mask3;
        });



        // _this.tween3 = _this.game.add.tween(_this.prot2).to({x:580, y:300}, 1500, Phaser.Easing.Linear.None, true);

        // _this.tween1 = _this.game.add.tween(_this.orangearr).to({x: 420, y: 450}, 1400, Phaser.Easing.Linear.None, true);

        // _this.tween2 = _this.game.add.tween(_this.bluearr).to({x: 420, y: 450}, 1400, Phaser.Easing.Linear.None, true);



        //creating mask for protactor
        // Create a new mask graphics object
        _this.mask2 = _this.game.add.graphics(440, 462);

        // Draw a sector shape on the mask graphics object
        _this.mask2.beginFill(0xffffff);
        _this.mask2.moveTo(0, 0);
        _this.mask2.lineTo(50, 0);
        _this.mask2.arc(0, 0, 400, _this.game.math.degToRad(3), _this.game.math.degToRad(182), true);
        _this.mask2.lineTo(0, 0);
        _this.mask2.endFill();

        // Apply the mask to the circle sprite
        _this.prot3.mask = _this.mask2;
        _this.prot4.mask = _this.mask2;


        _this.prot3.inputEnabled = true;
        _this.prot3.input.useHandCursor = true;

        _this.prot3.input.enableDrag(true);
        //for rotating clockwise/anticlockwise
        _this.prot3.events.onDragStart.add(_this.dragStart, _this);
        _this.prot3.events.onDragUpdate.add(_this.dragUpdate, _this);
        _this.prot3.events.onDragStop.add(_this.dragStop, _this);


    },
    dragStart: function () {
        if (!_this.isDrag) {
            console.log(_this.prot4.angle, "start");
            //get initial values of mouse
            _this.newmouseX = 0;
            _this.newmousey = 0;
            _this.prot3.x = 452;
            _this.prot3.y = 450;
            _this.mouseX1 = _this.input.x;
            // console.log("mousex1",_this.mouseX1);
            _this.mouseY1 = _this.input.y;
            // console.log("mousey1",_this.mouseY1);
            _this.isDrag = true;
        }

    },

    dragUpdate: function () {
        if (_this.isDrag) {
            console.log(_this.prot4.angle, "update");
            //for protactor to stay in fixed position
            _this.prot3.x = 452;
            _this.prot3.y = 450;

            var mouseX2 = _this.input.x;
            // console.log("mousex2", mouseX2);
            var mouseY2 = _this.input.y;
            // console.log("mousey2", mouseY2);
            if (_this.newmouseX == 0)
                var diff1 = Math.abs(_this.mouseX1 - mouseX2);
            else
                var diff1 = Math.abs(_this.newmouseX - mouseX2);
            var diff = diff1 / 10;
            // console.log("diff", diff);

            // _this.clickSound.play();

            //compare start and end mouse values to detect clockwise/anticlockwise
            if (mouseX2 >= _this.mouseX1 && mouseY2 <= _this.mouseY1 || mouseX2 >= _this.mouseX1 && mouseY2 >= _this.mouseY1) {
                //  console.log("clockwise");
                _this.prot3.angle = (_this.prot3.angle + diff);
                _this.prot4.angle = (_this.prot4.angle + diff);
            }
            else if (mouseX2 < _this.mouseX1 && mouseY2 > _this.mouseY1 || mouseX2 < _this.mouseX1 && mouseY2 < _this.mouseY1) {
                //  console.log("antiwise");
                _this.prot3.angle = (_this.prot3.angle - diff);
                _this.prot4.angle = (_this.prot4.angle - diff);
            }
            _this.newmouseX = mouseX2;
            _this.newmouseY = mouseY2;

        }

    },

    dragStop: function () {
        //final mouse values after stopping drag
        console.log(_this.prot4.angle, "end");
        _this.prot3.x = 452;
        _this.prot3.y = 450;
        _this.isDrag = false;


    },


    evaluate: function () {
        //to evaluate the protactor position after rotation, it should be at 0 degree on left
        if ((_this.prot4.angle >= -1 && _this.prot4.angle <= 1) || _this.prot4.angle == -2.842170943040401e-14 || _this.prot4.angle == -8.526512829121202e-14 || _this.prot4.angle == -5.684341886080802e-14) {
            _this.counterCelebrationSound.play();
            _this.addNumberPad();
            _this.Question_flag = 2;
            if (_this.count1 == 0)
                _this.Ask_Question2.play();
            _this.tickbtn.visible = false;
            _this.prot3.inputEnabled = false;

        }
        else
            _this.wrongans.play();

    },

    thirdScreen: function () {

        //displaying new pink arrow
        _this.prot3.inputEnabled = false;
        _this.prot4.visible = false;
        _this.tickbtn = _this.add.sprite(870, 400, 'TickBtn');
        _this.tickbtn.inputEnabled = true;
        _this.tickbtn.input.useHandCursor = true;
        _this.tickbtn.events.onInputDown.add(_this.evaluate1, _this);

        _this.Question_flag = 3;
        if (randarr[_this.count1] == 0)
            _this.Ask_Question3a.play();
        else
            _this.Ask_Question3b.play();

        if (randarr[_this.count1] == 0) //complmentary
        {
            _this.pinkarr = _this.add.sprite(455, 450, 'pink arr');
            _this.pinkarr.scale.setTo(0.93, 0.91);
            _this.pinkarr.anchor.setTo(0, 0.5);
            if (randarr1[_this.count1] == 0)
                _this.pinkarr.angle = _this.bluearr1.angle + 10;
            else
                _this.pinkarr.angle = _this.bluearr1.angle + 15;
            if (_this.pinkarr.angle <= -90)
                _this.pinkarr.angle = _this.pinkarr.angle - 5;
        }
        else {
            _this.pinkarr = _this.add.sprite(455, 450, 'pink arr');
            _this.pinkarr.scale.setTo(0.92, 0.91);
            _this.pinkarr.anchor.setTo(0, 0.5);
            if (randarr1[_this.count1] == 0)
                _this.pinkarr.angle = _this.bluearr1.angle + 10;
            else
                _this.pinkarr.angle = _this.bluearr1.angle + 15;
            if (_this.pinkarr.angle >= 0)
                _this.pinkarr.angle = _this.pinkarr.angle - 5;

        }
        _this.prot4 = _this.add.sprite(448, 450, 'outProtc');
        _this.prot4.anchor.setTo(0.5, 0.5);
        _this.prot4.mask = _this.mask2;
        _this.rotateArrow();

    },

    evaluate1: function () {
        if (randarr[_this.count1] == 0) //for complementary pink should be at 90 degree
        {
            if (_this.pinkarr.angle > -91.5 && _this.pinkarr.angle < -89.5)
                _this.changeobjects();
            else
                _this.wrongans.play();

        }
        else if (randarr[_this.count1] == 1)  //for supplementary pink should be at 0 degree
        {
            if (_this.pinkarr.angle <= 0.1 && _this.pinkarr.angle > -0.7)
                _this.changeobjects();
            else
                _this.wrongans.play();
        }
    },

    changeobjects: function () {

        //for text box to display and tick button to be gone and object properties to be lost and number pad to be displayed
        _this.counterCelebrationSound.play();
        _this.AnswerBox = _this.add.sprite(650, 80, 'Text-box2');
        _this.AnswerBox.scale.setTo(1.05, 1.2);
        _this.enterTxt1 = _this.add.text(672, 109, _this.bArr[_this.count1] + "  + ");
        _this.enterTxt1.fontSize = "25px";
        _this.enterTxt1.fill = '#65B4C3';
        if (randarr[_this.count1] == 0)
            _this.enterTxt2 = _this.add.text(830, 109, "= 90 ");
        else
            _this.enterTxt2 = _this.add.text(830, 109, "= 180 ");
        _this.enterTxt2.fontSize = "25px";
        _this.enterTxt2.fill = '#65B4C3';
        _this.tickbtn.destroy();
        _this.panel2.scale.setTo(1.1, 1);
        _this.pinkarr.inputEnabled = false;
        _this.image4.inputEnabled = false;
        _this.addNumberPad1();
        _this.Question_flag = 4;
        if (randarr[_this.count1] == 0 && _this.count1 == 0)
            _this.Ask_Question4a.play();
        else if (randarr[_this.count1] == 1 && _this.count1 == 0)
            _this.Ask_Question4b.play();


    },

    rotateArrow: function () {
        //rotate property for pink arrow
        _this.pinkarr.inputEnabled = true;
        _this.pinkarr.input.useHandCursor = true;

        _this.image4 = _this.add.sprite(454, 448, 'graphic');
        _this.image4.anchor.setTo(0, 0.5);
        _this.image4.scale.setTo(3.5, 2);
        _this.image4.angle = _this.pinkarr.angle;

        _this.image4.alpha = 0;
        _this.image4.inputEnabled = true;
        _this.image4.input.useHandCursor = true;
        _this.image4.input.enableDrag(true);
        _this.image4.bringToTop();

        _this.cX = 454;
        _this.cY = 452;

        _this.image4.events.onDragUpdate.add(_this.onDragUpdate, _this);

    },

    onDragUpdate: function () {
        console.log("hi");
        var mouseX = _this.input.x;
        var mouseY = _this.input.y;

        if (mouseY >= 446) {
            mouseY = 450;
            console.log("small if")
            _this.prot4.angle = 0;

        }


        _this.moveSpriteOnCircle(mouseX, mouseY);
        _this.pinkarr.rotation = _this.physics.arcade.angleBetween(_this.pinkarr, _this.image4);
        _this.image4.rotation = _this.physics.arcade.angleBetween(_this.image4, _this.pinkarr);
        _this.image4.events.onDragStop.removeAll();
        _this.image4.events.onDragStop.add(function () {
            console.log("dragstop");
        })


    },

    moveSpriteOnCircle: function (x, y) {
        _this.theta = Math.atan2(x - _this.cX, y - _this.cY);
        console.log("theta", _this.theta);

        var newX = Math.sin(_this.theta) * _this.radius;
        var newY = Math.cos(_this.theta) * _this.radius;
        console.log("new x y", newX, newY);


        _this.image4.x = newX + _this.cX;
        _this.image4.y = newY + _this.cY;
        console.log("image4 x y", _this.image4.x, _this.image4.y);

    },




    //* Change this function to show small number pad as given in GDD. (no signs)
    addNumberPad: function () {
        _this.Choice = 1;
        _this.objGroup = _this.add.group();
        _this.numGroup = _this.add.group();

        var bottomnumpadbg = _this.numGroup.create(0, 515, 'numpadbg');
        bottomnumpadbg.scale.setTo(1, 1);

        bottomnumpadbg.name = "numpadbg";

        _this.x = 40;
        // set the number pad invisible initially. only after tweening it is made visible
        _this.numGroup.visible = false;

        for (var i = 0; i < 10; i++) {
            _this.numbg = _this.numGroup.create(_this.x, 552, 'Numberpad');
            _this.numbg.anchor.setTo(0.5);
            _this.numbg.scale.setTo(0.8, 0.8);
            _this.numbg.name = i + 1;
            _this.numbg.frame = i;

            _this.numbg.inputEnabled = true;
            _this.numbg.input.useHandCursor = true;
            _this.numbg.events.onInputDown.add(_this.numClicked, _this);

            _this.x += 73;
        }

        _this.wrongbtn = _this.numGroup.create(_this.x + 75, 552, 'Numberpad');
        _this.wrongbtn.frame = 10;
        _this.wrongbtn.anchor.setTo(0.5);
        _this.wrongbtn.scale.setTo(0.8, 0.8);
        _this.wrongbtn.name = "wrongbtn";
        _this.wrongbtn.inputEnabled = true;
        _this.wrongbtn.input.useHandCursor = true;
        _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked, _this);


        _this.AnswerBox = _this.numGroup.create(_this.x - 30, 525, 'Text-box');
        _this.AnswerBox.scale.setTo(1.3, 1.2);


        _this.rightbtn = _this.numGroup.create(_this.x + 150, 552, 'Numberpad');
        _this.rightbtn.frame = 11;
        _this.rightbtn.anchor.setTo(0.5);
        _this.rightbtn.scale.setTo(0.8, 0.8);
        _this.rightbtn.name = "rightbtn";
        _this.rightbtn.inputEnabled = true;
        _this.rightbtn.input.useHandCursor = true;
        _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked, _this);

        _this.enterTxt = _this.add.text(-100, 8, "");

        _this.numpadTween = _this.add.tween(_this.numGroup);

        //tween in the number pad after a second.
        _this.tweenNumPad();
    },

    //* Change this function to show small number pad as given in GDD. (no signs)
    addNumberPad1: function () {
        _this.selectedAns1 = '';
        _this.selectedAns2 = '';
        _this.selectedAns3 = '';

        _this.objGroup = _this.add.group();
        _this.numGroup = _this.add.group();

        var bottomnumpadbg = _this.numGroup.create(0, 515, 'numpadbg');
        bottomnumpadbg.scale.setTo(1, 1);

        bottomnumpadbg.name = "numpadbg";

        _this.x = 70;
        // set the number pad invisible initially. only after tweening it is made visible
        _this.numGroup.visible = false;

        for (var i = 0; i < 10; i++) {
            _this.numbg = _this.numGroup.create(_this.x, 552, 'Numberpad1');
            _this.numbg.anchor.setTo(0.5);
            _this.numbg.scale.setTo(0.8, 0.8);
            _this.numbg.name = i + 1;
            _this.numbg.frame = i;

            _this.numbg.inputEnabled = true;
            _this.numbg.input.useHandCursor = true;
            _this.numbg.events.onInputDown.add(_this.numClicked1, _this);

            _this.x += 73;
        }

        _this.wrongbtn = _this.numGroup.create(_this.x + 10, 552, 'Numberpad1');
        _this.wrongbtn.frame = 10;
        _this.wrongbtn.anchor.setTo(0.5);
        _this.wrongbtn.scale.setTo(0.8, 0.8);
        _this.wrongbtn.name = "wrongbtn";
        _this.wrongbtn.inputEnabled = true;
        _this.wrongbtn.input.useHandCursor = true;
        _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked1, _this);

        _this.rightbtn = _this.numGroup.create(_this.x + 80, 552, 'Numberpad1');
        _this.rightbtn.frame = 11;
        _this.rightbtn.anchor.setTo(0.5);
        _this.rightbtn.scale.setTo(0.8, 0.8);
        _this.rightbtn.name = "rightbtn";
        _this.rightbtn.inputEnabled = true;
        _this.rightbtn.input.useHandCursor = true;
        _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked1, _this);

        _this.enterTxt = _this.add.text(-100, 8, "");

        _this.numpadTween = _this.add.tween(_this.numGroup);
        //_this.AnswerBox.visible=true;
        //tween in the number pad after a second.
        _this.tweenNumPad();
    },

    rightbtnClicked1: function (target) {
        _this.clickSound.play();

        if (_this.AnswerBox.name == _this.aArr[_this.count1]) //compares with answerbox and real answer
        {
            _this.noofAttempts++;
            _this.celebrationSound.play();
            // _this.Question_flag = 1;
            // _this.count1++;
            _this.eraseScreen();

            _this.clearScreen();

            if (_this.count1 < 5) {
                _this.starActions(_this.count1);
                _this.time.events.add(1000, function () {
                    _this.showInitialScreen();

                });
            }
            else {
                _this.starActions(_this.count1);
                _this.time.events.add(2500, () => {
                    _this.state.start('score', true, false, gameID, _this.microConcepts);

                })
            }


        }
        else {
            _this.noofAttempts++;
            _this.wrongans.play();
            _this.eraseScreen();
        }
    },

    wrongbtnClicked1: function (target) {
        _this.clickSound.play();
        _this.eraseScreen();
    },

    wrongbtnClicked: function (target) {
        _this.clickSound.play();
        _this.eraseScreen();
    },

    clearScreen: function () {
        _this.numGroup.destroy();
        _this.panel2.destroy();
        _this.pinkarr.destroy();
        _this.orangearr1.destroy();
        _this.bluearr1.destroy();
        _this.circle1.destroy();
        _this.mask3.destroy();
        _this.prot3.destroy();
        _this.prot4.destroy();
        _this.mask2.destroy();
        _this.AnswerBox.destroy();
        _this.enterTxt1.destroy();
        _this.enterTxt2.destroy();

    },

    eraseScreen: function (target) {
        _this.selectedAns1 = '';
        _this.selectedAns2 = '';
        _this.selectedAns3 = '';
        _this.AnswerBox.removeChild(_this.enterTxt);
        _this.AnswerBox.name = '';

    },

    tweenNumPad: function () {
        _this.numGroup.visible = true;
        _this.numpadTween.to({ x: 0, y: -43 }, 1000, 'Linear', true, 0);
    },


    numClicked: function (target) {
        console.log(target.name)
        _this.clickSound.play();
        var_selectedAns1 = " ";
        var_selectedAns2 = " ";
        var_selectedAns3 = " ";

        if (_this.selectedAns3 === '' && _this.selectedAns2 !== '' && _this.selectedAns1 !== '') {
            if (_this.selectedAns2 === 0 && target.name !== 0) {
                _this.selectedAns3 = target.name;
            }
            else if (_this.selectedAns2 !== '' && _this.selectedAns2 !== 0) {
                _this.selectedAns3 = target.name;
            }
            else if (_this.selectedAns2 !== 0 && target.name == 10) {
                _this.selectedAns2 = 0;
            }
            else {
                _this.selectedAns2 = target.name;
            }
        }

        if (_this.selectedAns2 === '') {
            if (_this.selectedAns1 === 0 && target.name !== 0) {
                _this.selectedAns2 = target.name;
            }
            else if (_this.selectedAns1 !== '' && _this.selectedAns1 !== 0) {
                _this.selectedAns2 = target.name;
            }
            else if (_this.selectedAns1 !== 0 && target.name == 10) {
                _this.selectedAns1 = 0;
            }
            else {
                _this.selectedAns1 = target.name;
            }
        }





        _this.AnswerBox.removeChild(_this.enterTxt);
        _this.enterTxt.visible = false;

        if (_this.selectedAns1 === 10) var_selectedAns1 = 0;
        else var_selectedAns1 = _this.selectedAns1;
        if (_this.selectedAns2 === 10) _this.selectedAns2 = 0;
        else var_selectedAns2 = _this.selectedAns2;
        if (_this.selectedAns3 === 10) _this.selectedAns3 = 0;
        else var_selectedAns3 = _this.selectedAns3;


        if (_this.selectedAns1 === "") var_selectedAns1 = " ";
        else var_selectedAns1 = _this.selectedAns1;

        if (_this.selectedAns2 === "") var_selectedAns2 = " ";
        else var_selectedAns2 = _this.selectedAns2;

        if (_this.selectedAns3 === "") var_selectedAns3 = " ";
        else var_selectedAns3 = _this.selectedAns3;

        //type0-scene1  type1-scene2  type2-scene3
        if (_this.selectedAns2 === "" && _this.selectedAns3 === "") {
            console.log("1");
            _this.enterTxt = _this.add.text(14, 6, "" + var_selectedAns1 + var_selectedAns2 + var_selectedAns3, { fontSize: '25px' });
        }
        else if (_this.selectedAns3 === "") {
            console.log("12");
            _this.enterTxt = _this.add.text(8, 6, "" + var_selectedAns1 + var_selectedAns2 + var_selectedAns3, { fontSize: '25px' });
        }
        else {
            console.log("13");
            _this.enterTxt = _this.add.text(5, 8, "" + var_selectedAns1 + var_selectedAns2 + var_selectedAns3, { fontSize: '20px' });
        }

        _this.enterTxt.align = 'right';
        // _this.enterTxt.font = "Akzidenz-Grotesk BQ";
        _this.enterTxt.fill = '#65B4C3';
        // _this.enterTxt.fontWeight = 'normal';
        _this.AnswerBox.addChild(_this.enterTxt);
        _this.enterTxt.visible = true;
        console.log(_this.selectedAns1, _this.selectedAns2, _this.selectedAns3);
        _this.AnswerBox.name = Number('' + var_selectedAns1 + var_selectedAns2 + var_selectedAns3);
        console.log(_this.AnswerBox.name);
    },

    numClicked1: function (target) {
        console.log(target.name)
        _this.clickSound.play();
        var_selectedAns1 = " ";
        var_selectedAns2 = " ";
        var_selectedAns3 = " ";

        if (_this.selectedAns3 === '' && _this.selectedAns2 !== '' && _this.selectedAns1 !== '') {
            if (_this.selectedAns2 === 0 && target.name !== 0) {
                _this.selectedAns3 = target.name;
            }
            else if (_this.selectedAns2 !== '' && _this.selectedAns2 !== 0) {
                _this.selectedAns3 = target.name;
            }
            else if (_this.selectedAns2 !== 0 && target.name == 10) {
                _this.selectedAns2 = 0;
            }
            else {
                _this.selectedAns2 = target.name;
            }
        }

        if (_this.selectedAns2 === '') {
            if (_this.selectedAns1 === 0 && target.name !== 0) {
                _this.selectedAns2 = target.name;
            }
            else if (_this.selectedAns1 !== '' && _this.selectedAns1 !== 0) {
                _this.selectedAns2 = target.name;
            }
            else if (_this.selectedAns1 !== 0 && target.name == 10) {
                _this.selectedAns1 = 0;
            }
            else {
                _this.selectedAns1 = target.name;
            }
        }

        _this.AnswerBox.removeChild(_this.enterTxt);
        _this.enterTxt.visible = false;

        if (_this.selectedAns1 === 10) var_selectedAns1 = 0;
        else var_selectedAns1 = _this.selectedAns1;
        if (_this.selectedAns2 === 10) _this.selectedAns2 = 0;
        else var_selectedAns2 = _this.selectedAns2;
        if (_this.selectedAns3 === 10) _this.selectedAns3 = 0;
        else var_selectedAns3 = _this.selectedAns3;


        if (_this.selectedAns1 === "") var_selectedAns1 = " ";
        else var_selectedAns1 = _this.selectedAns1;

        if (_this.selectedAns2 === "") var_selectedAns2 = " ";
        else var_selectedAns2 = _this.selectedAns2;

        if (_this.selectedAns3 === "") var_selectedAns3 = " ";
        else var_selectedAns3 = _this.selectedAns3;

        //type0-scene1  type1-scene2  type2-scene3
        if (_this.selectedAns2 === "" && _this.selectedAns3 === "") {
            console.log("1");
            _this.enterTxt = _this.add.text(112, 20, "" + var_selectedAns1 + var_selectedAns2 + var_selectedAns3, { fontSize: '25px' });
        }
        else if (_this.selectedAns3 === "") {
            console.log("12");
            _this.enterTxt = _this.add.text(108, 20, "" + var_selectedAns1 + var_selectedAns2 + var_selectedAns3, { fontSize: '25px' });
        }
        else {
            console.log("13");
            _this.enterTxt = _this.add.text(101, 22, "" + var_selectedAns1 + var_selectedAns2 + var_selectedAns3, { fontSize: '25px' });
        }

        _this.enterTxt.align = 'right';
        // _this.enterTxt.font = "Akzidenz-Grotesk BQ";
        _this.enterTxt.fill = '#65B4C3';
        // _this.enterTxt.fontWeight = 'normal';
        _this.AnswerBox.addChild(_this.enterTxt);
        _this.enterTxt.visible = true;
        console.log(_this.selectedAns1, _this.selectedAns2, _this.selectedAns3);
        _this.AnswerBox.name = Number('' + var_selectedAns1 + var_selectedAns2 + var_selectedAns3);
        console.log(_this.AnswerBox.name);
    },



    //after adding answer to numberpad and clicking on tick buttn for validation
    rightbtnClicked: function (target) {
        _this.clickSound.play();


        if (_this.AnswerBox.name == _this.bArr[_this.count1]) //compares with answerbox and real answer
        {
            _this.noofAttempts++;
            _this.counterCelebrationSound.play();

            //_this.Question_flag = 3;

            _this.numGroup.destroy();
            _this.eraseScreen();
            _this.thirdScreen();

        }
        else {
            _this.noofAttempts++;
            _this.wrongans.play();
            _this.eraseScreen();
        }



    },

    checkOverlap: function (spriteA, spriteB) {
        _this.boundsA = spriteA.getBounds();
        _this.boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(_this.boundsA, _this.boundsB);
    },
    applyingStyle: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.visible = true;
    },

    starActions: function (target) {
        telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);
        starAnim = _this.starsGroup.getChildAt(_this.count1);
        starAnim.smoothed = false;
        anim = starAnim.animations.add('star');
        _this.count1++;

        _this.microConcepts = "GeometryG7";
        anim.play();
    },


    shutdown: function () {
        _this.stopVoice();
        //RI.gotoEndPage();
        //telInitializer.tele_end();
    },

    DemoVideo: function () {

        // DEMO AUDIOS
        _this.demoAudio1 = document.createElement('audio');
        _this.demoAudio1src = document.createElement('source');
        _this.demoAudio1src.setAttribute("src", window.baseUrl + "questionSounds/GMLA-01-G7/" + _this.languageSelected + "/GMLA_01_G7_d1.mp3");
        _this.demoAudio1.appendChild(_this.demoAudio1src);

        // QUESTION AUDIOS
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-01-G7/" +
            _this.languageSelected + "/GMLA_01_G7_a1.mp3");//Adjust the protractor to find the angle.
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        _this.q2Sound = document.createElement('audio');
        _this.q2Soundsrc = document.createElement('source');
        _this.q2Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-01-G7/" +
            _this.languageSelected + "/GMLA_01_G7_a2.mp3");//What is the angle?
        _this.q2Sound.appendChild(_this.q2Soundsrc);

        _this.q3Sound = document.createElement('audio');
        _this.q3Soundsrc = document.createElement('source');
        _this.q3Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-01-G7/" +
            _this.languageSelected + "/GMLA_01_G7_a3.mp3");//Adjust the pointer to find the complementary angle.
        _this.q3Sound.appendChild(_this.q3Soundsrc);

        _this.q4Sound = document.createElement('audio');
        _this.q4Soundsrc = document.createElement('source');
        _this.q4Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-01-G7/" +
            _this.languageSelected + "/GMLA_01_G7_a4.mp3");//Now, calculate and type the complementary angle.
        _this.q4Sound.appendChild(_this.q4Soundsrc);

        _this.video_playing = 0;
        _this.showDemoVideo();  //* call the function to show the video


        _this.skip = _this.add.image(870, 270, 'skipArrow');       //* skip button shown at the bottom
        _this.skip.inputEnabled = true;
        _this.skip.input.useHandCursor = true;
        _this.skip.events.onInputDown.add(function () {
            _this.stopAudio();

            if (_this.demoVideo_1)
                _this.demoVideo_1.stop(false);
            if (_this.videoWorld_1)
                _this.videoWorld_1.destroy();

            if (_this.hintBtn) {
                _this.hintBtn.inputEnabled = true;
                _this.hintBtn.input.useHandCursor = true;
            }

            _this.game.paused = false;  //* restart the game
        });
    },
    stopAudio: function () {
        //* clear all the timers first

        if (_this.q1Timer) clearTimeout(_this.q1Timer);
        if (_this.q2Timer) clearTimeout(_this.q2Timer);
        if (_this.q3Timer) clearTimeout(_this.q3Timer);
        if (_this.q4Timer) clearTimeout(_this.q4Timer);

        if (_this.demoAudio1) {
            console.log("removing the demo audio1");
            _this.demoAudio1.pause();
            _this.demoAudio1 = null;
            _this.demoAudio1src = null;
        }

        if (_this.q1Sound) {
            console.log("removing the q1");
            _this.q1Sound.pause();
            _this.q1Sound = null;
            _this.q1Soundsrc = null;
        }

        if (_this.q2Sound) {
            console.log("removing the q2");
            _this.q2Sound.pause();
            _this.q2Sound = null;
            _this.q2Soundsrc = null;
        }

        if (_this.q3Sound) {
            console.log("removing the q3");
            _this.q3Sound.pause();
            _this.q3Sound = null;
            _this.q3Soundsrc = null;
        }

        if (_this.q4Sound) {
            console.log("removing the q3");
            _this.q4Sound.pause();
            _this.q4Sound = null;
            _this.q4Soundsrc = null;
        }

        _this.skip.events.onInputDown.removeAll();
        _this.skip.destroy();                //* skip button destroyed

    },

    showDemoVideo: function () {

        _this.demoVideo_1 = _this.add.video('GMLA1G7');
        _this.demoVideo_1.play(false);
        _this.demoVideo_1.changeSource(window.baseUrl + "assets/demoVideos/GMLA-01-G7.mp4");
        _this.video_playing = 1;
        _this.videoWorld_1 = _this.demoVideo_1.addToWorld();

        _this.demoAudio1.play();

        _this.q1Timer = setTimeout(function ()    //* q1 js timer to play q1 after 5 seconds.
        {
            console.log("inside q1sound.....")
            clearTimeout(_this.q1Timer);         //* clear the time once its used.
            _this.q1Sound.play();
        }, 6200);

        _this.q2Timer = setTimeout(function ()    //* q2 js timer to play q2 after 2 min.
        {
            console.log("inside q2sound.....")
            clearTimeout(_this.q2Timer);         //* clear the time once its used.
            _this.q2Sound.play();
        }, 20000);

        _this.q3Timer = setTimeout(function ()    //* q3 js timer to play q3 after 3 min.
        {
            console.log("inside q3sound.....")
            clearTimeout(_this.q3Timer);         //* clear the time once its used.
            _this.q3Sound.play();
        }, 31000);

        _this.q4Timer = setTimeout(function ()    //* q4 js timer to play q4 after 4 min.
        {
            console.log("inside q4sound.....")
            clearTimeout(_this.q4Timer);         //* clear the time once its used.
            _this.q4Sound.play();
        }, 39000);

        _this.demoVideo_1.onComplete.add(function () {

            _this.stopAudio();
            _this.demoVideo_1.stop(false);
            _this.videoWorld_1.destroy();
            if (_this.hintBtn) {
                _this.hintBtn.inputEnabled = true;
                _this.hintBtn.input.useHandCursor = true;
            }
            _this.game.paused = false;
        });


    },
}



