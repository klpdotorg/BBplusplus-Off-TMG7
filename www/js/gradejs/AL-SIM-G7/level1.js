Game.AL_SIM_G7level1 = function () { };


Game.AL_SIM_G7level1.prototype =
{
    init: function (param, score) {
        _this = this;

        this.Stararr = param;
        this.score = score;
        _this = this;
        // _this.languageSelected = document.getElementById("LANGUAGE").innerHTML;
        _this.languageSelected = window.languageSelected;
        if (_this.languageSelected == null
            || _this.languageSelected == " "
            || _this.languageSelected == "") {
            _this.languageSelected = "English";
        }
        else console.log("Language selected: " + _this.languageSelected);
            _this.clickSound = document.createElement('audio');
        _this.clickSoundsrc = document.createElement('source');
        _this.clickSoundsrc.setAttribute("src",  window.baseUrl +"sounds/ClickSound.mp3");
        _this.clickSound.appendChild(_this.clickSoundsrc);

        _this.celebrationSound = document.createElement('audio');
        _this.celebrationSoundsrc = document.createElement('source');
        _this.celebrationSoundsrc.setAttribute("src", window.baseUrl + "sounds/celebration.mp3");
        _this.celebrationSound.appendChild(_this.celebrationSoundsrc);

        _this.counterCelebrationSound = document.createElement('audio');
        _this.counterCelebrationSoundsrc = document.createElement('source');
        _this.counterCelebrationSoundsrc.setAttribute("src",  window.baseUrl +"sounds/counter_celebration.mp3");
        _this.counterCelebrationSound.appendChild(_this.counterCelebrationSoundsrc);

        _this.wrongans = document.createElement('audio');
        _this.wronganssrc = document.createElement('source');
        _this.wronganssrc.setAttribute("src",  window.baseUrl +"sounds/WrongCelebrationSound.mp3");
        _this.wrongans.appendChild(_this.wronganssrc);

        _this.wrongSound = document.createElement('audio');
        _this.wrongSoundsrc = document.createElement('source');
        _this.wrongSoundsrc.setAttribute("src",  window.baseUrl +"sounds/WrongCelebrationSound.mp3");
        _this.wrongSound.appendChild(_this.wrongSoundsrc);

        _this.snapSound = document.createElement('audio');
        _this.snapSoundsrc = document.createElement('source');
        _this.snapSoundsrc.setAttribute("src", window.baseUrl + "sounds/snapSound.mp3");
        _this.snapSound.appendChild(_this.snapSoundsrc);

        _this.framechange = document.createElement('audio');
        _this.framechangesrc = document.createElement('source');
        _this.framechangesrc.setAttribute("src",  window.baseUrl +"sounds/Frame_change_sound.mp3");
        _this.framechange.appendChild(_this.framechangesrc);


        _this.Ask_Question1 = _this.createAudio("AL_SIM_G7_a1");
        _this.Ask_Question2 = _this.createAudio("AL_SIM_G7_a2");
        // _this.Ask_Question3 = _this.createAudio("V3");

        //edited for baseurl apk
        telInitializer.gameIdInit("AL_SIM_G7", gradeSelected);// first Tele call
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
        //edited for baseurl apk
        //*add these  variables
        _this.noofAttempts = 0;//total attempt to answer q question
        _this.AnsTimerCount = 0;//total time
        _this.sceneCount = 0;//no of screen
        _this.questionid = null;//always 1
        //............
        _this.hint_flag = 0;
        
        _this.count1 = 0;
        _this.trackCount = 0;
        _this.speakerbtn;
        _this.background;
        _this.count = 0;
        _this.starsGroup;
        _this.selectedAns1 = '';
        _this.selectedAns2 = '';
        _this.AnswerBox;
        _this.seconds = 0;
        _this.minutes = 0;
        _this.answer = 0;
        _this.stage = 0;
        _this.Question_flag = 0;
        _this.starting = 0;
        _this.objectCounter = 0;
        _this.i = 0;
        _this.j = 0;
        _this.limit = 0;
        _this.denom_flag = -1;

        _this.numberOfQuestions = 0;
        _this.rightbtnFlag = 0;

        valuesCombinationsNum = []
        valuesCombinationsDenom = []

        valuesCombinationsNum2 = []
        valuesCombinationsDenom2 = []

        _this.color_flag = 0;

        _this.counterForTimer = 0;

        _this.arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

       // _this.hint_flag = 0;
        _this.speakerbtnClicked = false;
        _this.rightbtn_Clicked = false;

        _this.ans4Grp2 = _this.add.group();

        _this.background = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'BG1');
        //** include the background file, navigation bar, stars, timer objects.

        _this.navBar = _this.add.sprite(0, 0, 'navBar');

        _this.backbtn = _this.add.sprite(5, 6, 'backbtn');
        _this.backbtn.inputEnabled = true;
        _this.backbtn.input.useHandCursor = true;
        _this.backbtn.events.onInputDown.add(function () {
            // _this.state.start('score');
            //_this.stopVoice();
            _this.time.events.removeAll();
            _this.backbtn.events.onInputDown.removeAll();
            _this.time.events.add(50, function () {
                _this.state.start('grade7Algebra', true, false);
            });
        });

        _this.speakerbtn = _this.add.sprite(600, 6, 'CommonSpeakerBtn');

        _this.speakerbtn.events.onInputDown.add(function () {
            telInitializer.tele_interactEvent("TOUCH", "speaker");
            if (_this.speakerbtnClicked == false && _this.rightbtn_Clicked == false) {
                _this.speakerbtn.inputEnabled = false;
                _this.speakerbtn.input.useHandCursor = false;
                _this.clickSound.play();

                if (_this.Question_flag == 0) {
                    _this.Ask_Question1.play();
                }
                if (_this.Question_flag == 1) {
                    _this.Ask_Question2.play();
                }
                // if (_this.Question_flag == 3) {
                //     _this.Ask_Question3.play();
                // }

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

        //bulb 
        // _this.hintBtn = _this.add.sprite(670, 6, 'bulb');
        // _this.hintBtn.scale.setTo(0.5, 0.6);
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
            //// console.log("inside hintbutton function");
            //* show the demo video
            _this.hintBtn.inputEnabled = false;
            _this.hintBtn.input.useHandCursor = false;
            _this.time.events.add(1, function () {
                //// console.log(_this.hintBtn.inputEnabled, "status of hintBtn");
                _this.ViewDemoVideo();
            });

        });

        _this.generateStarsForTheScene(6);

        //* include variables for use - objGroup (where egg objects can be added)
        _this.objGroup;
        _this.numGroup;

        _this.greenObjectArray = [];

        //* start the game with first question
        _this.time.events.add(1000, _this.getQuestion);
    },

    createAudio: function (src) {
        audio = document.createElement('audio');
        audiosrc = document.createElement('source');
        audiosrc.setAttribute("src",  window.baseUrl +"questionSounds/AL-SIM-G7/" + _this.languageSelected + "/" + src + ".mp3");
        audio.appendChild(audiosrc);
        // audio.play();

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
        //timer.setText(minutes + ':'+ seconds );
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

    getQuestion: function (target) {
        _this.completed = 0;
        _this.current = 0;
        _this.choice = _this.arr[_this.starting++];

        if (_this.timer) {
            _this.timer.stop();
            _this.timer = null;
        }
        _this.timer = _this.time.create(false);

        //  Set a TimerEvent to occur after 2 seconds
        _this.timer.loop(1000, function () {
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

        _this.Question_flag = 0;

        _this.Initial_randomizing();
        _this.EquationGenerating();
        // _this.addNextTextbox();

        if (_this.numberOfQuestions == 0) {
            _this.Ask_Question1.play();
        }

        console.log("inside get question.....");
        _this.hintBtn.inputEnabled = true;
        _this.hintBtn.input.useHandCursor = true;
        _this.hint_flag = 1;

        //edited for baseurl apk
        _this.questionid = 1;

    },

    stopVoice: function () {
        _this.Ask_Question1.pause();
        _this.Ask_Question1 = null;

        _this.Ask_Question2.pause();
        _this.Ask_Question2 = null;

        // _this.Ask_Question3.pause();
        // _this.Ask_Question3 = null;


        if (_this.celebrationSound) {
            if (_this.celebrationSound.isPlaying) {
                _this.celebrationSound.stop();
                _this.celebrationSound = null;
            }
        }

    },

    Initial_randomizing: function () {

        // ●	X2 term max till 12 
        // ●	X  term max till 18
        // ●	Constant term till 36
        // ●	Terms can be from 6 to 8 
        // ●	Terms can appear in any order among  X2   X and constant 

        _this.Square1Array = [];
        _this.Square2Array = [];
        _this.Linear1Array = [];
        _this.Linear2Array = [];
        _this.Linear3Array = [];
        _this.Const1Array = [];
        _this.Const2Array = [];
        _this.Const3Array = [];

        _this.order1 = [6, 7, 8];//6, 7, 8
        _this.shuffleArray(_this.order1);
        console.log(_this.order1, "_this.order1");

        _this.variable = ['m', 'n', 'x'];//, 'n', 'x'
        console.log(" _this.variable", _this.variable);
        _this.choice = Math.floor(Math.random() * 3);// generate 0,1,2
        console.log("_this.choice", _this.choice);

        _this.term1 = 0;
        console.log(_this.term1, "  _this.term1");

        if (_this.term1 == 0) {
            if (_this.order1[0] == 6) {
                console.log("order 6 ")
                _this.mSquare1 = Math.floor(Math.random() * 3) + 1;//1 to 3;               
                _this.mLinear1 = Math.floor(Math.random() * 4) + 1;//1 to 4
                _this.mConstant1 = Math.floor(Math.random() * 9) + 1;//1 to 9
                _this.mSquare2 = Math.floor(Math.random() * 3) + 1;//1 to 3;
                _this.mLinear2 = Math.floor(Math.random() * 4) + 1;//1 to 4
                _this.mConstant2 = Math.floor(Math.random() * 9) + 1;//1 to 9
                _this.mLinear3 = 0;
                _this.mConstant3 = 0;
                console.log("_this.mSquare1", _this.mSquare1)
                console.log("_this.mLinear1", _this.mLinear1)
                console.log("_this.mConstant1", _this.mConstant1)
                console.log("_this.mSquare2", _this.mSquare2)
                console.log("_this.mLinear2", _this.mLinear2)
                console.log("_this.mConstant2", _this.mConstant2)
            }
            else if (_this.order1[0] == 7) {
                console.log("order 7 ")
                _this.mSquare1 = Math.floor(Math.random() * 3) + 1;//1 to 3;               
                _this.mLinear1 = Math.floor(Math.random() * 3) + 1;//1 to 3
                _this.mConstant1 = Math.floor(Math.random() * 9) + 1;//1 to 9
                _this.mSquare2 = Math.floor(Math.random() * 3) + 1;//1 to 3;
                _this.mLinear2 = Math.floor(Math.random() * 3) + 1;//1 to 3
                _this.mConstant2 = Math.floor(Math.random() * 9) + 1;//1 to 9
                _this.mLinear3 = Math.floor(Math.random() * 3) + 1;//1 to 3
                _this.mConstant3 = 0;

            }
            else if (_this.order1[0] == 8) {
                console.log("order 8 ")
                _this.mSquare1 = Math.floor(Math.random() * 3) + 1;//1 to 3;               
                _this.mLinear1 = Math.floor(Math.random() * 3) + 1;//1 to 3
                _this.mConstant1 = Math.floor(Math.random() * 6) + 1;//1 to 6
                _this.mSquare2 = Math.floor(Math.random() * 3) + 1;//1 to 3;
                _this.mLinear2 = Math.floor(Math.random() * 3) + 1;//1 to 3
                _this.mConstant2 = Math.floor(Math.random() * 6) + 1;//1 to 6
                _this.mLinear3 = Math.floor(Math.random() * 3) + 1;//1 to 3
                _this.mConstant3 = Math.floor(Math.random() * 6) + 1;//1 to 6


            }
        }

        if (Math.floor(Math.random() * 2)) {
            _this.mSquare1 = -_this.mSquare1;
        }
        if (Math.floor(Math.random() * 2)) {
            _this.mLinear1 = -_this.mLinear1;
        }
        if (Math.floor(Math.random() * 2)) {
            _this.mConstant1 = -_this.mConstant1;
        }
        if (Math.floor(Math.random() * 2)) {
            _this.mSquare2 = -_this.mSquare2;
        }
        if (Math.floor(Math.random() * 2)) {
            _this.mLinear2 = -_this.mLinear2;
        }
        if (Math.floor(Math.random() * 2)) {
            _this.mConstant2 = -_this.mConstant2;
        }
        if (Math.floor(Math.random() * 2)) {
            _this.mLinear3 = -_this.mLinear3;
        }
        if (Math.floor(Math.random() * 2)) {
            _this.mConstant3 = -_this.mConstant3;
        }
        // _this.mSquare1 = 2;
        // _this.mSquare2 = -1;
        // _this.mLinear1 = -5;
        // _this.mLinear2 = 4;
        // _this.mLinear3 = 2;
        // _this.mConstant1 = 2;
        // _this.mConstant2 = -7;

        _this.Square1Array.push(_this.mSquare1);
        _this.Square2Array.push(_this.mSquare2);
        _this.Linear1Array.push(_this.mLinear1);
        _this.Linear2Array.push(_this.mLinear2);
        _this.Linear3Array.push(_this.mLinear3);
        _this.Const1Array.push(_this.mConstant1);
        _this.Const2Array.push(_this.mConstant2);
        _this.Const3Array.push(_this.mConstant3);


    },


    shuffleArray: function (array) {
        let len = array.length,
            currentIndex;
        for (currentIndex = len - 1; currentIndex > 0; currentIndex--) {
            let randIndex = Math.floor(Math.random() * (currentIndex + 1));
            var temp = array[currentIndex];
            array[currentIndex] = array[randIndex];
            array[randIndex] = temp;
        }
    },

    //this function is used for generating the equation.
    EquationGenerating: function () {
        //edited for baseurl apk
        _this.sceneCount++;
        // _this.AnsTimerCount = 0;
        _this.noofAttempts = 0;
        //....

        console.log("MakeSideBar");
        _this.questionWithAnswer = '';

        _this.power = "\u{00B2}";
        _this.textBox = _this.add.sprite(220, 60, 'Text box_1');//140, 80
        _this.textBox.scale.setTo(1.1, 1);
        _this.textBox.fontSize = '15px';
        let string;

        if (_this.order1[0] == 6) {

            _this.yellowBox = _this.add.sprite(26, 17, 'yellowTextbox');
            _this.yellowBox.scale.setTo(1.41, 1);
            _this.textBox.addChild(_this.yellowBox);
            _this.yellowBox.visible = true;

            if (_this.mSquare1 == 1) {
                _this.mSq1 = _this.add.text(26, 19, (_this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });

            }
            else if (_this.mSquare1 == -1) {
                _this.mSq1 = _this.add.text(26, 19, (' - ' + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });
            }
            else {
                if (_this.mSquare1 > 0)
                    _this.mSq1 = _this.add.text(26, 19, (_this.mSquare1 + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });
                else
                    _this.mSq1 = _this.add.text(26, 19, (_this.mSquare1 + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });
            }

            _this.applyingStyle1(_this.mSq1);
            _this.textBox.addChild(_this.mSq1);//,{ fontSize: '15px' }

            _this.yellowBox2 = _this.add.sprite(75, 17, 'yellowTextbox');
            _this.yellowBox2.scale.setTo(1.50, 1)
            _this.textBox.addChild(_this.yellowBox2)
            _this.yellowBox2.visible = false;

            if (_this.mLinear1 == 1) {
                _this.mLi1 = _this.add.text(70, 19, (" + " + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
            }
            else if (_this.mLinear1 == -1) {
                _this.mLi1 = _this.add.text(70, 19, (" - " + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });

            }
            else {
                if (_this.mLinear1 > 0)
                    _this.mLi1 = _this.add.text(70, 19, (" + " + _this.mLinear1 + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
                else {
                    _this.ml1 = (_this.mLinear1);
                    _this.mLi1 = _this.add.text(70, 19, (" - " + Math.abs(_this.ml1) + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });

                }
            }
            _this.applyingStyle1(_this.mLi1);
            _this.textBox.addChild(_this.mLi1);

            _this.yellowBox3 = _this.add.sprite(127, 17, 'yellowTextbox')
            _this.textBox.addChild(_this.yellowBox3)
            _this.yellowBox3.visible = false;

            if (_this.mConstant1 > 0)
                _this.Con1 = _this.add.text(123, 19, (" + " + _this.mConstant1), { fontSize: '22px', fill: '#65B4C3' });
            else {
                _this.mc1 = _this.mConstant1;
                _this.Con1 = _this.add.text(123, 19, ("  - " + Math.abs(_this.mc1)), { fontSize: '22px', fill: '#65B4C3' });
            }

            _this.applyingStyle1(_this.Con1);
            _this.textBox.addChild(_this.Con1);

            _this.yellowBox4 = _this.add.sprite(162, 17, 'yellowTextbox')
            _this.yellowBox4.scale.setTo(1.8, 1)
            _this.textBox.addChild(_this.yellowBox4)
            _this.yellowBox4.visible = true;

            if (_this.mSquare2 == 1) {
                _this.mSq2 = _this.add.text(158, 19, (" + " + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });

            }
            else if (_this.mSquare2 == -1) {
                _this.mSq2 = _this.add.text(158, 19, (' - ' + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });
            }
            else {
                if (_this.mSquare2 > 0)
                    _this.mSq2 = _this.add.text(158, 19, (" + " + _this.mSquare2 + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });
                else {
                    _this.msq_2 = _this.mSquare2;
                    _this.mSq2 = _this.add.text(158, 19, (" - " + Math.abs(_this.msq_2) + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });
                }
            }

            _this.applyingStyle1(_this.mSq2);
            _this.textBox.addChild(_this.mSq2);

            _this.yellowBox5 = _this.add.sprite(225, 17, 'yellowTextbox')
            _this.yellowBox5.scale.setTo(1.50, 1)
            _this.textBox.addChild(_this.yellowBox5)
            _this.yellowBox5.visible = false;

            if (_this.mLinear2 == 1) {
                _this.mLi2 = _this.add.text(212, 19, ("  + " + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
            }
            else if (_this.mLinear2 == -1) {
                _this.mLi2 = _this.add.text(212, 19, ("  - " + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });

            }
            else {
                if (_this.mLinear2 > 0)
                    _this.mLi2 = _this.add.text(212, 19, ("  + " + _this.mLinear2 + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
                else {
                    _this.ml2 = _this.mLinear2;
                    _this.mLi2 = _this.add.text(212, 19, ("  - " + Math.abs(_this.ml2) + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
                }
            }

            _this.applyingStyle1(_this.mLi2);
            _this.textBox.addChild(_this.mLi2);

            _this.yellowBox6 = _this.add.sprite(277, 17, 'yellowTextbox')
            _this.textBox.addChild(_this.yellowBox6)
            _this.yellowBox6.visible = false;

            if (_this.mConstant2 > 0)
                _this.Con2 = _this.add.text(272, 19, (" + " + _this.mConstant2), { fontSize: '22px', fill: '#65B4C3' });
            else {
                _this.mc2 = _this.mConstant2;
                _this.Con2 = _this.add.text(272, 19, ("  - " + Math.abs(_this.mc2)), { fontSize: '22px', fill: '#65B4C3' });
            }

            _this.applyingStyle1(_this.Con2);
            _this.textBox.addChild(_this.Con2);

        }

        if (_this.order1[0] == 7) {

            _this.yellowBox = _this.add.sprite(26, 17, 'yellowTextbox')
            _this.yellowBox.scale.setTo(1.41, 1)
            _this.textBox.addChild(_this.yellowBox)
            _this.yellowBox.visible = true;

            if (_this.mSquare1 == 1) {
                _this.mSq1 = _this.add.text(26, 19, (_this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });

            }
            else if (_this.mSquare1 == -1) {
                _this.mSq1 = _this.add.text(26, 19, (' - ' + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });
            }
            else {
                if (_this.mSquare1 > 0)
                    _this.mSq1 = _this.add.text(26, 19, (_this.mSquare1 + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });
                else
                    _this.mSq1 = _this.add.text(26, 19, (_this.mSquare1 + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });
            }

            _this.applyingStyle1(_this.mSq1);
            _this.textBox.addChild(_this.mSq1);//,{ fontSize: '15px' }

            _this.yellowBox2 = _this.add.sprite(75, 17, 'yellowTextbox');
            _this.yellowBox2.scale.setTo(1.50, 1)
            _this.textBox.addChild(_this.yellowBox2)
            _this.yellowBox2.visible = false;

            if (_this.mLinear1 == 1) {
                _this.mLi1 = _this.add.text(70, 19, (" + " + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
            }
            else if (_this.mLinear1 == -1) {
                _this.mLi1 = _this.add.text(70, 19, (" - " + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });

            }
            else {
                if (_this.mLinear1 > 0)
                    _this.mLi1 = _this.add.text(70, 19, (" + " + _this.mLinear1 + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
                else {
                    _this.ml1 = (_this.mLinear1);
                    _this.mLi1 = _this.add.text(70, 19, (" - " + Math.abs(_this.ml1) + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });

                }
            }
            _this.applyingStyle1(_this.mLi1);
            _this.textBox.addChild(_this.mLi1);

            _this.yellowBox3 = _this.add.sprite(127, 17, 'yellowTextbox')
            _this.textBox.addChild(_this.yellowBox3)
            _this.yellowBox3.visible = false;

            if (_this.mConstant1 > 0)
                _this.Con1 = _this.add.text(123, 19, (" + " + _this.mConstant1), { fontSize: '22px', fill: '#65B4C3' });
            else {
                _this.mc1 = _this.mConstant1;
                _this.Con1 = _this.add.text(123, 19, ("  - " + Math.abs(_this.mc1)), { fontSize: '22px', fill: '#65B4C3' });
            }

            _this.applyingStyle1(_this.Con1);
            _this.textBox.addChild(_this.Con1);

            _this.yellowBox4 = _this.add.sprite(162, 17, 'yellowTextbox')
            _this.yellowBox4.scale.setTo(1.8, 1)
            _this.textBox.addChild(_this.yellowBox4)
            _this.yellowBox4.visible = true;

            if (_this.mSquare2 == 1) {
                _this.mSq2 = _this.add.text(158, 19, (" + " + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });

            }
            else if (_this.mSquare2 == -1) {
                _this.mSq2 = _this.add.text(158, 19, (' - ' + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });
            }
            else {
                if (_this.mSquare2 > 0)
                    _this.mSq2 = _this.add.text(158, 19, (" + " + _this.mSquare2 + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });
                else {
                    _this.msq_2 = _this.mSquare2;
                    _this.mSq2 = _this.add.text(158, 19, (" - " + Math.abs(_this.msq_2) + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });
                }
            }

            _this.applyingStyle1(_this.mSq2);
            _this.textBox.addChild(_this.mSq2);

            _this.yellowBox5 = _this.add.sprite(225, 17, 'yellowTextbox')
            _this.yellowBox5.scale.setTo(1.50, 1)
            _this.textBox.addChild(_this.yellowBox5)
            _this.yellowBox5.visible = false;

            if (_this.mLinear2 == 1) {
                _this.mLi2 = _this.add.text(212, 19, ("  + " + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
            }
            else if (_this.mLinear2 == -1) {
                _this.mLi2 = _this.add.text(212, 19, ("  - " + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });

            }
            else {
                if (_this.mLinear2 > 0)
                    _this.mLi2 = _this.add.text(212, 19, ("  + " + _this.mLinear2 + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
                else {
                    _this.ml2 = _this.mLinear2;
                    _this.mLi2 = _this.add.text(212, 19, ("  - " + Math.abs(_this.ml2) + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
                }
            }

            _this.applyingStyle1(_this.mLi2);
            _this.textBox.addChild(_this.mLi2);

            _this.yellowBox6 = _this.add.sprite(277, 17, 'yellowTextbox')
            _this.textBox.addChild(_this.yellowBox6)
            _this.yellowBox6.visible = false;

            if (_this.mConstant2 > 0)
                _this.Con2 = _this.add.text(272, 19, (" + " + _this.mConstant2), { fontSize: '22px', fill: '#65B4C3' });
            else {
                _this.mc2 = _this.mConstant2;
                _this.Con2 = _this.add.text(272, 19, ("  - " + Math.abs(_this.mc2)), { fontSize: '22px', fill: '#65B4C3' });
            }

            _this.applyingStyle1(_this.Con2);
            _this.textBox.addChild(_this.Con2);

            _this.yellowBox7 = _this.add.sprite(313, 17, 'yellowTextbox')
            _this.yellowBox7.scale.setTo(1.50, 1)
            _this.textBox.addChild(_this.yellowBox7)
            _this.yellowBox7.visible = false;

            if (_this.mLinear3 == 1) {
                _this.mLi3 = _this.add.text(307, 19, (" + " + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
            }
            else if (_this.mLinear3 == -1) {
                _this.mLi3 = _this.add.text(307, 19, (" - " + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });

            }
            else {
                if (_this.mLinear3 > 0)
                    _this.mLi3 = _this.add.text(307, 19, (" + " + _this.mLinear3 + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
                else {
                    _this.ml3 = _this.mLinear3;
                    _this.mLi3 = _this.add.text(307, 19, (" - " + Math.abs(_this.ml3) + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
                }
            }

            _this.applyingStyle1(_this.mLi3);
            _this.textBox.addChild(_this.mLi3);
        }
        if (_this.order1[0] == 8) {

            _this.yellowBox = _this.add.sprite(26, 17, 'yellowTextbox')
            _this.yellowBox.scale.setTo(1.41, 1)
            _this.textBox.addChild(_this.yellowBox)
            _this.yellowBox.visible = true;

            if (_this.mSquare1 == 1) {
                _this.mSq1 = _this.add.text(26, 19, (_this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });

            }
            else if (_this.mSquare1 == -1) {
                _this.mSq1 = _this.add.text(26, 19, (' - ' + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });
            }
            else {
                if (_this.mSquare1 > 0)
                    _this.mSq1 = _this.add.text(26, 19, (_this.mSquare1 + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });
                else
                    _this.mSq1 = _this.add.text(26, 19, (_this.mSquare1 + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });
            }

            _this.applyingStyle1(_this.mSq1);
            _this.textBox.addChild(_this.mSq1);//,{ fontSize: '15px' }

            _this.yellowBox2 = _this.add.sprite(75, 17, 'yellowTextbox');
            _this.yellowBox2.scale.setTo(1.50, 1)
            _this.textBox.addChild(_this.yellowBox2)
            _this.yellowBox2.visible = false;

            if (_this.mLinear1 == 1) {
                _this.mLi1 = _this.add.text(70, 19, (" + " + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
            }
            else if (_this.mLinear1 == -1) {
                _this.mLi1 = _this.add.text(70, 19, (" - " + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });

            }
            else {
                if (_this.mLinear1 > 0)
                    _this.mLi1 = _this.add.text(70, 19, (" + " + _this.mLinear1 + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
                else {
                    _this.ml1 = (_this.mLinear1);
                    _this.mLi1 = _this.add.text(70, 19, (" - " + Math.abs(_this.ml1) + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });

                }
            }
            _this.applyingStyle1(_this.mLi1);
            _this.textBox.addChild(_this.mLi1);

            _this.yellowBox3 = _this.add.sprite(127, 17, 'yellowTextbox')
            _this.textBox.addChild(_this.yellowBox3)
            _this.yellowBox3.visible = false;

            if (_this.mConstant1 > 0)
                _this.Con1 = _this.add.text(123, 19, (" + " + _this.mConstant1), { fontSize: '22px', fill: '#65B4C3' });
            else {
                _this.mc1 = _this.mConstant1;
                _this.Con1 = _this.add.text(123, 19, ("  - " + Math.abs(_this.mc1)), { fontSize: '22px', fill: '#65B4C3' });
            }
            _this.applyingStyle1(_this.Con1);
            _this.textBox.addChild(_this.Con1);

            _this.yellowBox4 = _this.add.sprite(162, 17, 'yellowTextbox')
            _this.yellowBox4.scale.setTo(1.8, 1)
            _this.textBox.addChild(_this.yellowBox4)
            _this.yellowBox4.visible = true;

            if (_this.mSquare2 == 1) {
                _this.mSq2 = _this.add.text(158, 19, (" + " + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });

            }
            else if (_this.mSquare2 == -1) {
                _this.mSq2 = _this.add.text(158, 19, (' - ' + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });
            }
            else {
                if (_this.mSquare2 > 0)
                    _this.mSq2 = _this.add.text(158, 19, (" + " + _this.mSquare2 + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });
                else {
                    _this.msq_2 = _this.mSquare2;
                    _this.mSq2 = _this.add.text(158, 19, (" - " + Math.abs(_this.msq_2) + _this.variable[_this.choice] + _this.power), { fontSize: '22px', fill: '#65B4C3' });
                }
            }
            _this.applyingStyle1(_this.mSq2);
            _this.textBox.addChild(_this.mSq2);

            _this.yellowBox5 = _this.add.sprite(225, 17, 'yellowTextbox')
            _this.yellowBox5.scale.setTo(1.50, 1)
            _this.textBox.addChild(_this.yellowBox5)
            _this.yellowBox5.visible = false;

            if (_this.mLinear2 == 1) {
                _this.mLi2 = _this.add.text(212, 19, ("  + " + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
            }
            else if (_this.mLinear2 == -1) {
                _this.mLi2 = _this.add.text(212, 19, ("  - " + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });

            }
            else {
                if (_this.mLinear2 > 0)
                    _this.mLi2 = _this.add.text(212, 19, ("  + " + _this.mLinear2 + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
                else {
                    _this.ml2 = _this.mLinear2;
                    _this.mLi2 = _this.add.text(212, 19, ("  - " + Math.abs(_this.ml2) + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
                }
            }

            _this.applyingStyle1(_this.mLi2);
            _this.textBox.addChild(_this.mLi2);

            _this.yellowBox6 = _this.add.sprite(277, 17, 'yellowTextbox')
            _this.textBox.addChild(_this.yellowBox6)
            _this.yellowBox6.visible = false;

            if (_this.mConstant2 > 0)
                _this.Con2 = _this.add.text(272, 19, (" + " + _this.mConstant2), { fontSize: '22px', fill: '#65B4C3' });
            else {
                _this.mc2 = _this.mConstant2;
                _this.Con2 = _this.add.text(272, 19, ("  - " + Math.abs(_this.mc2)), { fontSize: '22px', fill: '#65B4C3' });
            }

            _this.applyingStyle1(_this.Con2);
            _this.textBox.addChild(_this.Con2);

            _this.yellowBox7 = _this.add.sprite(313, 17, 'yellowTextbox')
            _this.yellowBox7.scale.setTo(1.50, 1)
            _this.textBox.addChild(_this.yellowBox7)
            _this.yellowBox7.visible = false;

            if (_this.mLinear3 == 1) {
                _this.mLi3 = _this.add.text(307, 19, (" + " + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
            }
            else if (_this.mLinear3 == -1) {
                _this.mLi3 = _this.add.text(307, 19, (" - " + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });

            }
            else {
                if (_this.mLinear3 > 0)
                    _this.mLi3 = _this.add.text(307, 19, (" + " + _this.mLinear3 + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
                else {
                    _this.ml3 = _this.mLinear3;
                    _this.mLi3 = _this.add.text(307, 19, (" - " + Math.abs(_this.ml3) + _this.variable[_this.choice]), { fontSize: '22px', fill: '#65B4C3' });
                }
            }

            _this.applyingStyle1(_this.mLi3);
            _this.textBox.addChild(_this.mLi3);

            _this.yellowBox8 = _this.add.sprite(370, 17, 'yellowTextbox')
            _this.textBox.addChild(_this.yellowBox8)
            _this.yellowBox8.visible = false;

            if (_this.mConstant3 > 0)
                _this.Con3 = _this.add.text(359, 19, ("  + " + _this.mConstant3), { fontSize: '22px', fill: '#65B4C3' });
            else {
                _this.mc3 = _this.mConstant3;
                _this.Con3 = _this.add.text(359, 19, ("  - " + Math.abs(_this.mc3)), { fontSize: '22px', fill: '#65B4C3' });
            }
            _this.applyingStyle1(_this.Con3);
            _this.textBox.addChild(_this.Con3);

        }

        _this.eraser = _this.add.sprite(800, 70, 'eraser');
        _this.tick = _this.add.sprite(865, 70, 'TickBtn');

        _this.eraser.inputEnabled = true;
        _this.eraser.input.enableDrag(true);
        _this.eraser.events.onDragUpdate.add(_this.eraserUpdate, _this);
        _this.eraser.events.onDragStop.add(_this.eraserDrop1, _this);

        _this.space1 = _this.add.sprite(260, 210, 'panale_2');
        _this.space1.scale.setTo(0.86, 1);

        _this.mm2 = _this.add.text(25, 10, "-" + _this.variable[_this.choice] + _this.power)
        _this.mm = _this.add.text(25, 120, "-" + _this.variable[_this.choice] + "")
        _this.mone = _this.add.text(30, 240, "-1")

        _this.m2 = _this.add.text(30, 10, _this.variable[_this.choice] + _this.power)
        _this.m = _this.add.text(35, 120, _this.variable[_this.choice])
        _this.one = _this.add.text(40, 240, "1")

        _this.mm2.fill = '#FF0000'
        _this.mm.fill = '#FF0000'
        _this.mone.fill = '#FF0000'
        _this.m2.fill = '#FF0000'
        _this.m.fill = '#FF0000'
        _this.one.fill = '#FF0000'

        _this.sideGray1 = _this.add.sprite(30, 160, 'panale_3');
        _this.sideGray2 = _this.add.sprite(140, 160, 'panale_4');

        _this.m21 = _this.add.text(80, 10, _this.variable[_this.choice] + _this.power)
        _this.m1 = _this.add.text(80, 10, _this.variable[_this.choice])
        _this.one1 = _this.add.text(90, 10, "1")

        _this.m21.fill = '#FF0000'
        _this.m1.fill = '#FF0000'
        _this.one1.fill = '#FF0000'

        _this.boxes1 = _this.add.sprite(290, 155, 'Text box_4');
        _this.boxes1.scale.setTo(1, 0.8)
        _this.boxes2 = _this.add.sprite(550, 155, 'Text box_4');
        _this.boxes2.scale.setTo(0.8, 0.8)
        _this.boxes3 = _this.add.sprite(750, 155, 'Text box_4');
        _this.boxes3.scale.setTo(0.8, 0.8)

        _this.boxes1.addChild(_this.m21);
        _this.boxes2.addChild(_this.m1)
        _this.boxes3.addChild(_this.one1)

        _this.sideGray1.addChild(_this.mm2)
        _this.sideGray1.addChild(_this.mm)
        _this.sideGray1.addChild(_this.mone)

        _this.sideGray2.addChild(_this.m2)
        _this.sideGray2.addChild(_this.m)
        _this.sideGray2.addChild(_this.one)

        _this.green_1 = _this.add.sprite(38, 200, 'green_1');
        _this.green_2 = _this.add.sprite(65, 320, 'green_2');
        _this.green_3 = _this.add.sprite(65, 440, 'green_3');

        _this.pink_1 = _this.add.sprite(148, 200, 'pink_1');
        _this.pink_2 = _this.add.sprite(175, 320, 'pink_2');
        _this.pink_3 = _this.add.sprite(175, 440, 'pink_3');

        _this.green_1.inputEnabled = true;
        _this.green_2.inputEnabled = true;
        _this.green_3.inputEnabled = true;

        _this.pink_1.inputEnabled = true;
        _this.pink_2.inputEnabled = true;
        _this.pink_3.inputEnabled = true;

        _this.green_1.input.useHandCursor = true;
        _this.green_2.input.useHandCursor = true;
        _this.green_3.input.useHandCursor = true;

        _this.pink_1.input.useHandCursor = true;
        _this.pink_2.input.useHandCursor = true;
        _this.pink_3.input.useHandCursor = true;

        _this.ssquareGreenFlag = 0;

        _this.ssquareGreenXArray = [820, 850];
        _this.ssquareGreenYArray = [220, 248, 276, 304, 332, 360, 388, 416, 444];

        _this.ssquarePinkXArray = [760, 790];
        _this.ssquarePinkYArray = [220, 248, 276, 304, 332, 360, 388, 416, 444];

        _this.squareGreenX = 410;
        _this.squareGreenY = 220;

        _this.rectangleGreenX = 650;
        _this.rectangleGreenY = 220;

        _this.ssquareGreenX = 0;
        _this.ssquareGreenY = 0;

        _this.squarePinkX = 270;
        _this.squarePinkY = 220;

        _this.rectanglePinkX = 560;
        _this.rectanglePinkY = 220;

        _this.ssquarePinkX = 0;
        _this.ssquarePinkY = 0;

        _this.space1Boxes = _this.add.group();
        _this.space2Boxes = _this.add.group();
        _this.space3Boxes = _this.add.group();
        _this.space4Boxes = _this.add.group();
        _this.space5Boxes = _this.add.group();
        _this.space6Boxes = _this.add.group();

        _this.green_1.events.onInputDown.add(_this.m2S1);

        _this.pink_1.events.onInputDown.add(_this.m2S2);

        _this.tick.inputEnabled = true;
        _this.tick.input.useHandCursor = true;
        _this.tick.events.onInputDown.add(_this.tickEvaluation, _this);


    },

    //Tick button in the question screen and its evaluation.
    tickEvaluation: function (target) {
        console.log("tickevaluation");
        if ((_this.yellowBox.visible == true && _this.yellowBox4.visible == true)) {
            if (_this.mSquare1 > 0 && _this.mSquare2 > 0) {
                if ((_this.space4Boxes.length == _this.mSquare1 + _this.mSquare2) && _this.space1Boxes.length == 0) {
                    _this.eraser.events.onDragStop.removeAll();
                    _this.eraser.events.onDragStop.add(_this.eraserDrop2, _this);
                    _this.yellowBox.visible = false;
                    _this.yellowBox4.visible = false;
                    _this.yellowBox2.visible = true;
                    _this.yellowBox5.visible = true;
                    if (_this.order1[0] == 7 || _this.order1[0] == 8)
                        _this.yellowBox7.visible = true;

                    _this.green_1.events.onInputDown.removeAll();
                    _this.pink_1.events.onInputDown.removeAll();
                    _this.green_2.events.onInputDown.add(_this.mR1);
                    _this.pink_2.events.onInputDown.add(_this.mR2);


                    _this.framechange.play();
                }
                else {
                    _this.space1Boxes.destroy();
                    _this.space1Boxes = _this.add.group();
                    _this.squareGreenX = 410;
                    _this.squareGreenY = 220;

                    _this.space4Boxes.destroy();
                    _this.space4Boxes = _this.add.group();
                    _this.squarePinkX = 270;
                    _this.squarePinkY = 220;
                    _this.wrongans.play();
                }
            }
            else if (_this.mSquare1 < 0 && _this.mSquare2 < 0) {
                if ((_this.space1Boxes.length == Math.abs(_this.mSquare1 + _this.mSquare2)) && _this.space4Boxes.length == 0) {
                    _this.eraser.events.onDragStop.removeAll();
                    _this.eraser.events.onDragStop.add(_this.eraserDrop2, _this);
                    _this.yellowBox.visible = false;
                    _this.yellowBox4.visible = false;
                    _this.yellowBox2.visible = true;
                    _this.yellowBox5.visible = true;
                    if (_this.order1[0] == 7 || _this.order1[0] == 8)
                        _this.yellowBox7.visible = true;

                    _this.green_1.events.onInputDown.removeAll();
                    _this.pink_1.events.onInputDown.removeAll();
                    _this.green_2.events.onInputDown.add(_this.mR1);
                    _this.pink_2.events.onInputDown.add(_this.mR2);


                    _this.framechange.play();
                }
                else {
                    _this.space1Boxes.destroy();
                    _this.space1Boxes = _this.add.group();
                    _this.squareGreenX = 410;
                    _this.squareGreenY = 220;

                    _this.space4Boxes.destroy();
                    _this.space4Boxes = _this.add.group();
                    _this.squarePinkX = 270;
                    _this.squarePinkY = 220;
                    _this.wrongans.play();
                }
            }
            else {
                if (((_this.space1Boxes.length == Math.abs(_this.mSquare1)) && (_this.space4Boxes.length == _this.mSquare2)) || ((_this.space4Boxes.length == _this.mSquare1) && (_this.space1Boxes.length == Math.abs(_this.mSquare2)))) {
                    _this.eraser.events.onDragStop.removeAll();
                    _this.eraser.events.onDragStop.add(_this.eraserDrop2, _this);
                    _this.yellowBox.visible = false;
                    _this.yellowBox4.visible = false;
                    _this.yellowBox2.visible = true;
                    _this.yellowBox5.visible = true;
                    if (_this.order1[0] == 7 || _this.order1[0] == 8)
                        _this.yellowBox7.visible = true;

                    _this.green_1.events.onInputDown.removeAll();
                    _this.pink_1.events.onInputDown.removeAll();
                    _this.green_2.events.onInputDown.add(_this.mR1);
                    _this.pink_2.events.onInputDown.add(_this.mR2);


                    _this.framechange.play();
                }
                else {
                    _this.space1Boxes.destroy();
                    _this.space1Boxes = _this.add.group();
                    _this.squareGreenX = 410;
                    _this.squareGreenY = 220;

                    _this.space4Boxes.destroy();
                    _this.space4Boxes = _this.add.group();
                    _this.squarePinkX = 270;
                    _this.squarePinkY = 220;
                    _this.wrongans.play();
                }
            }
        }
        else if (_this.yellowBox2.visible == true && _this.yellowBox5.visible == true) {
            if (_this.order1[0] == 7 || _this.order1[0] == 8) {
                if (_this.mLinear1 > 0 && _this.mLinear2 > 0 && _this.mLinear3 > 0) {
                    if ((_this.space5Boxes.length == _this.mLinear1 + _this.mLinear2 + _this.mLinear3) && _this.space2Boxes.length == 0) {
                        _this.framechange.play();
                        _this.eraser.events.onDragStop.removeAll();
                        _this.eraser.events.onDragStop.add(_this.eraserDrop3, _this);
                        _this.green_2.events.onInputDown.removeAll();
                        _this.pink_2.events.onInputDown.removeAll();
                        _this.green_3.events.onInputDown.add(_this.mS1);
                        _this.pink_3.events.onInputDown.add(_this.mS2);
                        _this.yellowBox2.visible = false;
                        _this.yellowBox5.visible = false;
                        _this.yellowBox3.visible = true;
                        _this.yellowBox6.visible = true;
                        if (_this.order1[0] == 7) _this.yellowBox7.visible = false;

                        if (_this.order1[0] == 8) {
                            _this.yellowBox7.visible = false;
                            _this.yellowBox8.visible = true;
                        }
                    }
                    else {
                        _this.wrongans.play();
                        _this.space2Boxes.destroy();
                        _this.space2Boxes = _this.add.group();
                        _this.rectangleGreenX = 650;
                        _this.rectangleGreenY = 220;
                        _this.space5Boxes.destroy();
                        _this.space5Boxes = _this.add.group();
                        _this.rectanglePinkX = 560;
                        _this.rectanglePinkY = 220;
                    }
                }
                else if (_this.mLinear1 < 0 && _this.mLinear2 < 0 && _this.mLinear3 < 0) {
                    if ((_this.space2Boxes.length == Math.abs(_this.mLinear1 + _this.mLinear2 + _this.mLinear3)) && _this.space5Boxes.length == 0) {
                        _this.framechange.play();
                        _this.eraser.events.onDragStop.removeAll();
                        _this.eraser.events.onDragStop.add(_this.eraserDrop3, _this);
                        _this.green_2.events.onInputDown.removeAll();
                        _this.pink_2.events.onInputDown.removeAll();
                        _this.green_3.events.onInputDown.add(_this.mS1);
                        _this.pink_3.events.onInputDown.add(_this.mS2);
                        _this.yellowBox2.visible = false;
                        _this.yellowBox5.visible = false;
                        _this.yellowBox3.visible = true;
                        _this.yellowBox6.visible = true;
                        if (_this.order1[0] == 7) _this.yellowBox7.visible = false;

                        if (_this.order1[0] == 8) {
                            _this.yellowBox7.visible = false;
                            _this.yellowBox8.visible = true;
                        }
                    }
                    else {
                        _this.wrongans.play();
                        _this.space2Boxes.destroy();
                        _this.space2Boxes = _this.add.group();
                        _this.rectangleGreenX = 650;
                        _this.rectangleGreenY = 220;
                        _this.space5Boxes.destroy();
                        _this.space5Boxes = _this.add.group();
                        _this.rectanglePinkX = 560;
                        _this.rectanglePinkY = 220;
                    }
                }
                else {
                    if (((_this.space5Boxes.length == _this.mLinear1 + _this.mLinear2) || (_this.space5Boxes.length == _this.mLinear2 + _this.mLinear3)) && ((_this.space2Boxes.length == Math.abs(_this.mLinear1)) || (_this.space2Boxes.length == Math.abs(_this.mLinear3)))) {
                        _this.framechange.play();
                        _this.eraser.events.onDragStop.removeAll();
                        _this.eraser.events.onDragStop.add(_this.eraserDrop3, _this);
                        _this.green_2.events.onInputDown.removeAll();
                        _this.pink_2.events.onInputDown.removeAll();
                        _this.green_3.events.onInputDown.add(_this.mS1);
                        _this.pink_3.events.onInputDown.add(_this.mS2);
                        _this.yellowBox2.visible = false;
                        _this.yellowBox5.visible = false;
                        _this.yellowBox3.visible = true;
                        _this.yellowBox6.visible = true;
                        if (_this.order1[0] == 7) _this.yellowBox7.visible = false;

                        if (_this.order1[0] == 8) {
                            _this.yellowBox7.visible = false;
                            _this.yellowBox8.visible = true;
                        }
                    }
                    else if (((_this.space2Boxes.length == Math.abs(_this.mLinear1 + _this.mLinear2)) || (_this.space2Boxes.length == Math.abs(_this.mLinear2 + _this.mLinear3))) && ((_this.space5Boxes.length == _this.mLinear1) || (_this.space5Boxes.length == _this.mLinear3))) {
                        _this.framechange.play();
                        _this.eraser.events.onDragStop.removeAll();
                        _this.eraser.events.onDragStop.add(_this.eraserDrop3, _this);
                        _this.green_2.events.onInputDown.removeAll();
                        _this.pink_2.events.onInputDown.removeAll();
                        _this.green_3.events.onInputDown.add(_this.mS1);
                        _this.pink_3.events.onInputDown.add(_this.mS2);
                        _this.yellowBox2.visible = false;
                        _this.yellowBox5.visible = false;
                        _this.yellowBox3.visible = true;
                        _this.yellowBox6.visible = true;
                        if (_this.order1[0] == 7) _this.yellowBox7.visible = false;

                        if (_this.order1[0] == 8) {
                            _this.yellowBox7.visible = false;
                            _this.yellowBox8.visible = true;
                        }
                    }
                    else if (((_this.space5Boxes.length == _this.mLinear1 + _this.mLinear3) && (_this.space2Boxes.length == Math.abs(_this.mLinear2)))) {
                        _this.framechange.play();
                        _this.eraser.events.onDragStop.removeAll();
                        _this.eraser.events.onDragStop.add(_this.eraserDrop3, _this);
                        _this.green_2.events.onInputDown.removeAll();
                        _this.pink_2.events.onInputDown.removeAll();
                        _this.green_3.events.onInputDown.add(_this.mS1);
                        _this.pink_3.events.onInputDown.add(_this.mS2);
                        _this.yellowBox2.visible = false;
                        _this.yellowBox5.visible = false;
                        _this.yellowBox3.visible = true;
                        _this.yellowBox6.visible = true;
                        if (_this.order1[0] == 7) _this.yellowBox7.visible = false;

                        if (_this.order1[0] == 8) {
                            _this.yellowBox7.visible = false;
                            _this.yellowBox8.visible = true;
                        }
                    }
                    else if (((_this.space2Boxes.length == Math.abs(_this.mLinear1 + _this.mLinear3)) && (_this.space5Boxes.length == _this.mLinear2))) {
                        _this.framechange.play();
                        _this.eraser.events.onDragStop.removeAll();
                        _this.eraser.events.onDragStop.add(_this.eraserDrop3, _this);
                        _this.green_2.events.onInputDown.removeAll();
                        _this.pink_2.events.onInputDown.removeAll();
                        _this.green_3.events.onInputDown.add(_this.mS1);
                        _this.pink_3.events.onInputDown.add(_this.mS2);
                        _this.yellowBox2.visible = false;
                        _this.yellowBox5.visible = false;
                        _this.yellowBox3.visible = true;
                        _this.yellowBox6.visible = true;
                        if (_this.order1[0] == 7) _this.yellowBox7.visible = false;

                        if (_this.order1[0] == 8) {
                            _this.yellowBox7.visible = false;
                            _this.yellowBox8.visible = true;
                        }
                    }
                    else {
                        _this.wrongans.play();
                        _this.space2Boxes.destroy();
                        _this.space2Boxes = _this.add.group();
                        _this.rectangleGreenX = 650;
                        _this.rectangleGreenY = 220;
                        _this.space5Boxes.destroy();
                        _this.space5Boxes = _this.add.group();
                        _this.rectanglePinkX = 560;
                        _this.rectanglePinkY = 220;
                    }

                }
            }
            //if the order comes 6
            else {
                if (_this.mLinear1 > 0 && _this.mLinear2 > 0) {
                    if ((_this.space5Boxes.length == _this.mLinear1 + _this.mLinear2) && _this.space2Boxes.length == 0) {
                        _this.framechange.play();
                        _this.eraser.events.onDragStop.removeAll();
                        _this.eraser.events.onDragStop.add(_this.eraserDrop3, _this);
                        _this.green_2.events.onInputDown.removeAll();
                        _this.pink_2.events.onInputDown.removeAll();
                        _this.green_3.events.onInputDown.add(_this.mS1);
                        _this.pink_3.events.onInputDown.add(_this.mS2);
                        _this.yellowBox2.visible = false;
                        _this.yellowBox5.visible = false;
                        _this.yellowBox3.visible = true;
                        _this.yellowBox6.visible = true;
                        if (_this.order1[0] == 7) _this.yellowBox7.visible = false;

                        if (_this.order1[0] == 8) {
                            _this.yellowBox7.visible = false;
                            _this.yellowBox8.visible = true;
                        }
                    }
                    else {
                        _this.wrongans.play();
                        _this.space2Boxes.destroy();
                        _this.space2Boxes = _this.add.group();
                        _this.rectangleGreenX = 650;
                        _this.rectangleGreenY = 220;
                        _this.space5Boxes.destroy();
                        _this.space5Boxes = _this.add.group();
                        _this.rectanglePinkX = 560;
                        _this.rectanglePinkY = 220;
                    }
                }
                else if (_this.mLinear1 < 0 && _this.mLinear2 < 0) {
                    if ((_this.space2Boxes.length == Math.abs(_this.mLinear1 + _this.mLinear2)) && _this.space5Boxes.length == 0) {
                        _this.framechange.play();
                        _this.eraser.events.onDragStop.removeAll();
                        _this.eraser.events.onDragStop.add(_this.eraserDrop3, _this);
                        _this.green_2.events.onInputDown.removeAll();
                        _this.pink_2.events.onInputDown.removeAll();
                        _this.green_3.events.onInputDown.add(_this.mS1);
                        _this.pink_3.events.onInputDown.add(_this.mS2);
                        _this.yellowBox2.visible = false;
                        _this.yellowBox5.visible = false;
                        _this.yellowBox3.visible = true;
                        _this.yellowBox6.visible = true;
                        if (_this.order1[0] == 7) _this.yellowBox7.visible = false;

                        if (_this.order1[0] == 8) {
                            _this.yellowBox7.visible = false;
                            _this.yellowBox8.visible = true;
                        }
                    }
                    else {
                        _this.wrongans.play();
                        _this.space2Boxes.destroy();
                        _this.space2Boxes = _this.add.group();
                        _this.rectangleGreenX = 650;
                        _this.rectangleGreenY = 220;
                        _this.space5Boxes.destroy();
                        _this.space5Boxes = _this.add.group();
                        _this.rectanglePinkX = 560;
                        _this.rectanglePinkY = 220;
                    }
                }
                else {
                    if (((_this.space2Boxes.length == Math.abs(_this.mLinear1)) && (_this.space5Boxes.length == _this.mLinear2)) || ((_this.space5Boxes.length == _this.mLinear1) && (_this.space2Boxes.length == Math.abs(_this.mLinear2)))) {
                        _this.framechange.play();
                        _this.eraser.events.onDragStop.removeAll();
                        _this.eraser.events.onDragStop.add(_this.eraserDrop3, _this);
                        _this.green_2.events.onInputDown.removeAll();
                        _this.pink_2.events.onInputDown.removeAll();
                        _this.green_3.events.onInputDown.add(_this.mS1);
                        _this.pink_3.events.onInputDown.add(_this.mS2);
                        _this.yellowBox2.visible = false;
                        _this.yellowBox5.visible = false;
                        _this.yellowBox3.visible = true;
                        _this.yellowBox6.visible = true;
                        if (_this.order1[0] == 7) _this.yellowBox7.visible = false;

                        if (_this.order1[0] == 8) {
                            _this.yellowBox7.visible = false;
                            _this.yellowBox8.visible = true;
                        }
                    }
                    else {
                        _this.wrongans.play();
                        _this.space2Boxes.destroy();
                        _this.space2Boxes = _this.add.group();
                        _this.rectangleGreenX = 650;
                        _this.rectangleGreenY = 220;
                        _this.space5Boxes.destroy();
                        _this.space5Boxes = _this.add.group();
                        _this.rectanglePinkX = 560;
                        _this.rectanglePinkY = 220;
                    }
                }
            }

        }
        else if (_this.yellowBox3.visible == true && _this.yellowBox6.visible == true) {
            if (_this.order1[0] == 7 || _this.order1[0] == 8) {
                if (_this.mConstant1 > 0 && _this.mConstant2 > 0 && _this.mConstant3 > 0) {
                    if ((_this.space6Boxes.length == _this.mConstant1 + _this.mConstant2 + _this.mConstant3) && _this.space3Boxes.length == 0) {
                        _this.counterCelebrationSound.play();
                        if (_this.order1[0] == 8) {
                            _this.yellowBox8.visible = false;
                        }
                        _this.yellowBox3.visible = false;
                        _this.yellowBox6.visible = false;

                        _this.sideGray1.destroy();
                        _this.sideGray2.destroy();
                        _this.green_1.destroy();
                        _this.green_2.destroy();
                        _this.green_3.destroy();

                        _this.pink_1.destroy();
                        _this.pink_2.destroy();
                        _this.pink_3.destroy();

                        _this.boxes1.destroy();
                        _this.boxes2.destroy();
                        _this.boxes3.destroy();

                        _this.eraser.destroy();
                        _this.tick.destroy();
                        //Adding the objects of the second scene in the game.
                        _this.sideGray = _this.add.sprite(30, 120, 'panale_3');

                        _this.m2 = _this.add.text(80, 10, _this.variable[_this.choice] + _this.power)
                        _this.m = _this.add.text(80, 10, _this.variable[_this.choice])
                        _this.one = _this.add.text(90, 10, "1")

                        _this.m2.fill = '#FF0000'
                        _this.m.fill = '#FF0000'
                        _this.one.fill = '#FF0000'

                        _this.boxes1 = _this.add.sprite(290, 155, 'Text box_4');
                        _this.boxes1.scale.setTo(1, 0.8)
                        _this.boxes2 = _this.add.sprite(570, 155, 'Text box_4');
                        _this.boxes2.scale.setTo(0.8, 0.8)
                        _this.boxes3 = _this.add.sprite(760, 155, 'Text box_4');
                        _this.boxes3.scale.setTo(0.8, 0.8)


                        _this.boxes1.addChild(_this.m2);
                        _this.boxes2.addChild(_this.m);
                        _this.boxes3.addChild(_this.one);

                        // _this.textBox.scale.setTo(1.3, 1); 
                        _this.textBox.destroy();
                        _this.textBox2 = _this.add.sprite(220, 60, 'Text box_1');//140, 80
                        _this.textBox2.scale.setTo(1.4, 0.8);//1.5,
                        //_this.textBox2.fontSize = '5px';

                        _this.secondEquationChange();

                        _this.mergeOperation();

                    }
                    else {
                        _this.wrongans.play();
                        _this.space3Boxes.destroy();
                        _this.space3Boxes = _this.add.group();
                        _this.ssquareGreenX = 0;
                        _this.ssquareGreenY = 0;

                        _this.space6Boxes.destroy();
                        _this.space6Boxes = _this.add.group();
                        _this.ssquarePinkX = 0;
                        _this.ssquarePinkY = 0;
                    }
                }
                else if (_this.mConstant1 < 0 && _this.mConstant2 < 0 && _this.mConstant3 < 0) {
                    if ((_this.space3Boxes.length == Math.abs(_this.mConstant1 + _this.mConstant2 + _this.mConstant3)) && _this.space6Boxes.length == 0) {
                        _this.counterCelebrationSound.play();
                        if (_this.order1[0] == 8) {
                            _this.yellowBox8.visible = false;
                        }
                        _this.yellowBox3.visible = false;
                        _this.yellowBox6.visible = false;

                        _this.sideGray1.destroy();
                        _this.sideGray2.destroy();
                        _this.green_1.destroy();
                        _this.green_2.destroy();
                        _this.green_3.destroy();

                        _this.pink_1.destroy();
                        _this.pink_2.destroy();
                        _this.pink_3.destroy();

                        _this.boxes1.destroy();
                        _this.boxes2.destroy();
                        _this.boxes3.destroy();

                        _this.eraser.destroy();
                        _this.tick.destroy();
                        //Adding the objects of the second scene in the game.
                        _this.sideGray = _this.add.sprite(30, 120, 'panale_3');

                        _this.m2 = _this.add.text(80, 10, _this.variable[_this.choice] + _this.power)
                        _this.m = _this.add.text(80, 10, _this.variable[_this.choice])
                        _this.one = _this.add.text(90, 10, "1")

                        _this.m2.fill = '#FF0000'
                        _this.m.fill = '#FF0000'
                        _this.one.fill = '#FF0000'

                        _this.boxes1 = _this.add.sprite(290, 155, 'Text box_4');
                        _this.boxes1.scale.setTo(1, 0.8)
                        _this.boxes2 = _this.add.sprite(570, 155, 'Text box_4');
                        _this.boxes2.scale.setTo(0.8, 0.8)
                        _this.boxes3 = _this.add.sprite(760, 155, 'Text box_4');
                        _this.boxes3.scale.setTo(0.8, 0.8)


                        _this.boxes1.addChild(_this.m2);
                        _this.boxes2.addChild(_this.m);
                        _this.boxes3.addChild(_this.one);

                        // _this.textBox.scale.setTo(1.3, 1); 
                        _this.textBox.destroy();
                        _this.textBox2 = _this.add.sprite(220, 60, 'Text box_1');//140, 80
                        _this.textBox2.scale.setTo(1.4, 0.8);//1.5,
                        //_this.textBox2.fontSize = '5px';

                        _this.secondEquationChange();

                        _this.mergeOperation();
                    }
                    else {
                        _this.wrongans.play();
                        _this.space3Boxes.destroy();
                        _this.space3Boxes = _this.add.group();
                        _this.ssquareGreenX = 0;
                        _this.ssquareGreenY = 0;

                        _this.space6Boxes.destroy();
                        _this.space6Boxes = _this.add.group();
                        _this.ssquarePinkX = 0;
                        _this.ssquarePinkY = 0;
                    }
                }
                else {
                    if (((_this.space6Boxes.length == _this.mConstant1 + _this.mConstant2) || (_this.space6Boxes.length == _this.mConstant2 + _this.mConstant3)) && ((_this.space3Boxes.length == Math.abs(_this.mConstant1)) || (_this.space3Boxes.length == Math.abs(_this.mConstant3)))) {
                        _this.counterCelebrationSound.play();
                        if (_this.order1[0] == 8) {
                            _this.yellowBox8.visible = false;
                        }
                        _this.yellowBox3.visible = false;
                        _this.yellowBox6.visible = false;

                        _this.sideGray1.destroy();
                        _this.sideGray2.destroy();
                        _this.green_1.destroy();
                        _this.green_2.destroy();
                        _this.green_3.destroy();

                        _this.pink_1.destroy();
                        _this.pink_2.destroy();
                        _this.pink_3.destroy();

                        _this.boxes1.destroy();
                        _this.boxes2.destroy();
                        _this.boxes3.destroy();

                        _this.eraser.destroy();
                        _this.tick.destroy();
                        //Adding the objects of the second scene in the game.
                        _this.sideGray = _this.add.sprite(30, 120, 'panale_3');

                        _this.m2 = _this.add.text(80, 10, _this.variable[_this.choice] + _this.power)
                        _this.m = _this.add.text(80, 10, _this.variable[_this.choice])
                        _this.one = _this.add.text(90, 10, "1")

                        _this.m2.fill = '#FF0000'
                        _this.m.fill = '#FF0000'
                        _this.one.fill = '#FF0000'

                        _this.boxes1 = _this.add.sprite(290, 155, 'Text box_4');
                        _this.boxes1.scale.setTo(1, 0.8)
                        _this.boxes2 = _this.add.sprite(570, 155, 'Text box_4');
                        _this.boxes2.scale.setTo(0.8, 0.8)
                        _this.boxes3 = _this.add.sprite(760, 155, 'Text box_4');
                        _this.boxes3.scale.setTo(0.8, 0.8)


                        _this.boxes1.addChild(_this.m2);
                        _this.boxes2.addChild(_this.m);
                        _this.boxes3.addChild(_this.one);

                        // _this.textBox.scale.setTo(1.3, 1); 
                        _this.textBox.destroy();
                        _this.textBox2 = _this.add.sprite(220, 60, 'Text box_1');//140, 80
                        _this.textBox2.scale.setTo(1.4, 0.8);//1.5,
                        //_this.textBox2.fontSize = '5px';

                        _this.secondEquationChange();

                        _this.mergeOperation();
                    }
                    else if (((_this.space3Boxes.length == Math.abs(_this.mConstant1 + _this.mConstant2)) || (_this.space3Boxes.length == Math.abs(_this.mConstant2 + _this.mConstant3))) && ((_this.space6Boxes.length == _this.mConstant1) || (_this.space6Boxes.length == _this.mConstant3))) {
                        _this.counterCelebrationSound.play();
                        if (_this.order1[0] == 8) {
                            _this.yellowBox8.visible = false;
                        }
                        _this.yellowBox3.visible = false;
                        _this.yellowBox6.visible = false;

                        _this.sideGray1.destroy();
                        _this.sideGray2.destroy();
                        _this.green_1.destroy();
                        _this.green_2.destroy();
                        _this.green_3.destroy();

                        _this.pink_1.destroy();
                        _this.pink_2.destroy();
                        _this.pink_3.destroy();

                        _this.boxes1.destroy();
                        _this.boxes2.destroy();
                        _this.boxes3.destroy();

                        _this.eraser.destroy();
                        _this.tick.destroy();
                        //Adding the objects of the second scene in the game.
                        _this.sideGray = _this.add.sprite(30, 120, 'panale_3');

                        _this.m2 = _this.add.text(80, 10, _this.variable[_this.choice] + _this.power)
                        _this.m = _this.add.text(80, 10, _this.variable[_this.choice])
                        _this.one = _this.add.text(90, 10, "1")

                        _this.m2.fill = '#FF0000'
                        _this.m.fill = '#FF0000'
                        _this.one.fill = '#FF0000'

                        _this.boxes1 = _this.add.sprite(290, 155, 'Text box_4');
                        _this.boxes1.scale.setTo(1, 0.8)
                        _this.boxes2 = _this.add.sprite(570, 155, 'Text box_4');
                        _this.boxes2.scale.setTo(0.8, 0.8)
                        _this.boxes3 = _this.add.sprite(760, 155, 'Text box_4');
                        _this.boxes3.scale.setTo(0.8, 0.8)


                        _this.boxes1.addChild(_this.m2);
                        _this.boxes2.addChild(_this.m);
                        _this.boxes3.addChild(_this.one);

                        // _this.textBox.scale.setTo(1.3, 1); 
                        _this.textBox.destroy();
                        _this.textBox2 = _this.add.sprite(220, 60, 'Text box_1');//140, 80
                        _this.textBox2.scale.setTo(1.4, 0.8);//1.5,
                        //_this.textBox2.fontSize = '5px';

                        _this.secondEquationChange();

                        _this.mergeOperation();
                    }
                    else if (((_this.space6Boxes.length == _this.mConstant1 + _this.mConstant3) && (_this.space3Boxes.length == Math.abs(_this.mConstant2)))) {
                        _this.counterCelebrationSound.play();
                        if (_this.order1[0] == 8) {
                            _this.yellowBox8.visible = false;
                        }
                        _this.yellowBox3.visible = false;
                        _this.yellowBox6.visible = false;

                        _this.sideGray1.destroy();
                        _this.sideGray2.destroy();
                        _this.green_1.destroy();
                        _this.green_2.destroy();
                        _this.green_3.destroy();

                        _this.pink_1.destroy();
                        _this.pink_2.destroy();
                        _this.pink_3.destroy();

                        _this.boxes1.destroy();
                        _this.boxes2.destroy();
                        _this.boxes3.destroy();

                        _this.eraser.destroy();
                        _this.tick.destroy();
                        //Adding the objects of the second scene in the game.
                        _this.sideGray = _this.add.sprite(30, 120, 'panale_3');

                        _this.m2 = _this.add.text(80, 10, _this.variable[_this.choice] + _this.power)
                        _this.m = _this.add.text(80, 10, _this.variable[_this.choice])
                        _this.one = _this.add.text(90, 10, "1")

                        _this.m2.fill = '#FF0000'
                        _this.m.fill = '#FF0000'
                        _this.one.fill = '#FF0000'

                        _this.boxes1 = _this.add.sprite(290, 155, 'Text box_4');
                        _this.boxes1.scale.setTo(1, 0.8)
                        _this.boxes2 = _this.add.sprite(570, 155, 'Text box_4');
                        _this.boxes2.scale.setTo(0.8, 0.8)
                        _this.boxes3 = _this.add.sprite(760, 155, 'Text box_4');
                        _this.boxes3.scale.setTo(0.8, 0.8)


                        _this.boxes1.addChild(_this.m2);
                        _this.boxes2.addChild(_this.m);
                        _this.boxes3.addChild(_this.one);

                        // _this.textBox.scale.setTo(1.3, 1); 
                        _this.textBox.destroy();
                        _this.textBox2 = _this.add.sprite(220, 60, 'Text box_1');//140, 80
                        _this.textBox2.scale.setTo(1.4, 0.8);//1.5,
                        //_this.textBox2.fontSize = '5px';

                        _this.secondEquationChange();

                        _this.mergeOperation();
                    }
                    else if (((_this.space3Boxes.length == Math.abs(_this.mConstant1 + _this.mConstant3)) && (_this.space6Boxes.length == _this.mConstant2))) {
                        _this.counterCelebrationSound.play();
                        if (_this.order1[0] == 8) {
                            _this.yellowBox8.visible = false;
                        }
                        _this.yellowBox3.visible = false;
                        _this.yellowBox6.visible = false;

                        _this.sideGray1.destroy();
                        _this.sideGray2.destroy();
                        _this.green_1.destroy();
                        _this.green_2.destroy();
                        _this.green_3.destroy();

                        _this.pink_1.destroy();
                        _this.pink_2.destroy();
                        _this.pink_3.destroy();

                        _this.boxes1.destroy();
                        _this.boxes2.destroy();
                        _this.boxes3.destroy();

                        _this.eraser.destroy();
                        _this.tick.destroy();
                        //Adding the objects of the second scene in the game.
                        _this.sideGray = _this.add.sprite(30, 120, 'panale_3');

                        _this.m2 = _this.add.text(80, 10, _this.variable[_this.choice] + _this.power)
                        _this.m = _this.add.text(80, 10, _this.variable[_this.choice])
                        _this.one = _this.add.text(90, 10, "1")

                        _this.m2.fill = '#FF0000'
                        _this.m.fill = '#FF0000'
                        _this.one.fill = '#FF0000'

                        _this.boxes1 = _this.add.sprite(290, 155, 'Text box_4');
                        _this.boxes1.scale.setTo(1, 0.8)
                        _this.boxes2 = _this.add.sprite(570, 155, 'Text box_4');
                        _this.boxes2.scale.setTo(0.8, 0.8)
                        _this.boxes3 = _this.add.sprite(760, 155, 'Text box_4');
                        _this.boxes3.scale.setTo(0.8, 0.8)


                        _this.boxes1.addChild(_this.m2);
                        _this.boxes2.addChild(_this.m);
                        _this.boxes3.addChild(_this.one);

                        // _this.textBox.scale.setTo(1.3, 1); 
                        _this.textBox.destroy();
                        _this.textBox2 = _this.add.sprite(220, 60, 'Text box_1');//140, 80
                        _this.textBox2.scale.setTo(1.4, 0.8);//1.5,
                        //_this.textBox2.fontSize = '5px';

                        _this.secondEquationChange();

                        _this.mergeOperation();
                    }
                    else {
                        _this.wrongans.play();
                        _this.space3Boxes.destroy();
                        _this.space3Boxes = _this.add.group();
                        _this.ssquareGreenX = 0;
                        _this.ssquareGreenY = 0;

                        _this.space6Boxes.destroy();
                        _this.space6Boxes = _this.add.group();
                        _this.ssquarePinkX = 0;
                        _this.ssquarePinkY = 0;
                    }

                }
            }
            //if the order comes 6
            else {
                if (_this.mConstant1 > 0 && _this.mConstant2 > 0) {
                    if ((_this.space6Boxes.length == _this.mConstant1 + _this.mConstant2) && _this.space3Boxes.length == 0) {
                        _this.counterCelebrationSound.play();
                        if (_this.order1[0] == 8) {
                            _this.yellowBox8.visible = false;
                        }
                        _this.yellowBox3.visible = false;
                        _this.yellowBox6.visible = false;

                        _this.sideGray1.destroy();
                        _this.sideGray2.destroy();
                        _this.green_1.destroy();
                        _this.green_2.destroy();
                        _this.green_3.destroy();

                        _this.pink_1.destroy();
                        _this.pink_2.destroy();
                        _this.pink_3.destroy();

                        _this.boxes1.destroy();
                        _this.boxes2.destroy();
                        _this.boxes3.destroy();

                        _this.eraser.destroy();
                        _this.tick.destroy();
                        //Adding the objects of the second scene in the game.
                        _this.sideGray = _this.add.sprite(30, 120, 'panale_3');

                        _this.m2 = _this.add.text(80, 10, _this.variable[_this.choice] + _this.power)
                        _this.m = _this.add.text(80, 10, _this.variable[_this.choice])
                        _this.one = _this.add.text(90, 10, "1")

                        _this.m2.fill = '#FF0000'
                        _this.m.fill = '#FF0000'
                        _this.one.fill = '#FF0000'

                        _this.boxes1 = _this.add.sprite(290, 155, 'Text box_4');
                        _this.boxes1.scale.setTo(1, 0.8)
                        _this.boxes2 = _this.add.sprite(570, 155, 'Text box_4');
                        _this.boxes2.scale.setTo(0.8, 0.8)
                        _this.boxes3 = _this.add.sprite(760, 155, 'Text box_4');
                        _this.boxes3.scale.setTo(0.8, 0.8)


                        _this.boxes1.addChild(_this.m2);
                        _this.boxes2.addChild(_this.m);
                        _this.boxes3.addChild(_this.one);

                        // _this.textBox.scale.setTo(1.3, 1); 
                        _this.textBox.destroy();
                        _this.textBox2 = _this.add.sprite(220, 60, 'Text box_1');//140, 80
                        _this.textBox2.scale.setTo(1.4, 0.8);//1.5,
                        //_this.textBox2.fontSize = '5px';

                        _this.secondEquationChange();

                        _this.mergeOperation();
                    }
                    else {
                        _this.wrongans.play();
                        _this.space3Boxes.destroy();
                        _this.space3Boxes = _this.add.group();
                        _this.ssquareGreenX = 0;
                        _this.ssquareGreenY = 0;

                        _this.space6Boxes.destroy();
                        _this.space6Boxes = _this.add.group();
                        _this.ssquarePinkX = 0;
                        _this.ssquarePinkY = 0;
                    }
                }
                else if (_this.mConstant1 < 0 && _this.mConstant2 < 0) {
                    if ((_this.space3Boxes.length == Math.abs(_this.mConstant1 + _this.mConstant2)) && _this.space6Boxes.length == 0) {
                        _this.counterCelebrationSound.play();
                        if (_this.order1[0] == 8) {
                            _this.yellowBox8.visible = false;
                        }
                        _this.yellowBox3.visible = false;
                        _this.yellowBox6.visible = false;

                        _this.sideGray1.destroy();
                        _this.sideGray2.destroy();
                        _this.green_1.destroy();
                        _this.green_2.destroy();
                        _this.green_3.destroy();

                        _this.pink_1.destroy();
                        _this.pink_2.destroy();
                        _this.pink_3.destroy();

                        _this.boxes1.destroy();
                        _this.boxes2.destroy();
                        _this.boxes3.destroy();

                        _this.eraser.destroy();
                        _this.tick.destroy();
                        //Adding the objects of the second scene in the game.
                        _this.sideGray = _this.add.sprite(30, 120, 'panale_3');

                        _this.m2 = _this.add.text(80, 10, _this.variable[_this.choice] + _this.power)
                        _this.m = _this.add.text(80, 10, _this.variable[_this.choice])
                        _this.one = _this.add.text(90, 10, "1")

                        _this.m2.fill = '#FF0000'
                        _this.m.fill = '#FF0000'
                        _this.one.fill = '#FF0000'

                        _this.boxes1 = _this.add.sprite(290, 155, 'Text box_4');
                        _this.boxes1.scale.setTo(1, 0.8)
                        _this.boxes2 = _this.add.sprite(570, 155, 'Text box_4');
                        _this.boxes2.scale.setTo(0.8, 0.8)
                        _this.boxes3 = _this.add.sprite(760, 155, 'Text box_4');
                        _this.boxes3.scale.setTo(0.8, 0.8)


                        _this.boxes1.addChild(_this.m2);
                        _this.boxes2.addChild(_this.m);
                        _this.boxes3.addChild(_this.one);

                        // _this.textBox.scale.setTo(1.3, 1); 
                        _this.textBox.destroy();
                        _this.textBox2 = _this.add.sprite(220, 60, 'Text box_1');//140, 80
                        _this.textBox2.scale.setTo(1.4, 0.8);//1.5,
                        //_this.textBox2.fontSize = '5px';

                        _this.secondEquationChange();

                        _this.mergeOperation();

                    }
                    else {
                        _this.wrongans.play();
                        _this.space3Boxes.destroy();
                        _this.space3Boxes = _this.add.group();
                        _this.ssquareGreenX = 0;
                        _this.ssquareGreenY = 0;

                        _this.space6Boxes.destroy();
                        _this.space6Boxes = _this.add.group();
                        _this.ssquarePinkX = 0;
                        _this.ssquarePinkY = 0;
                    }
                }
                else {
                    if (((_this.space3Boxes.length == Math.abs(_this.mConstant1)) && (_this.space6Boxes.length == _this.mConstant2)) || ((_this.space6Boxes.length == _this.mConstant1) && (_this.space3Boxes.length == Math.abs(_this.mConstant2)))) {
                        _this.counterCelebrationSound.play();
                        if (_this.order1[0] == 8) {
                            _this.yellowBox8.visible = false;
                        }
                        _this.yellowBox3.visible = false;
                        _this.yellowBox6.visible = false;

                        _this.sideGray1.destroy();
                        _this.sideGray2.destroy();
                        _this.green_1.destroy();
                        _this.green_2.destroy();
                        _this.green_3.destroy();

                        _this.pink_1.destroy();
                        _this.pink_2.destroy();
                        _this.pink_3.destroy();

                        _this.boxes1.destroy();
                        _this.boxes2.destroy();
                        _this.boxes3.destroy();

                        _this.eraser.destroy();
                        _this.tick.destroy();
                        //Adding the objects of the second scene in the game.
                        _this.sideGray = _this.add.sprite(30, 120, 'panale_3');

                        _this.m2 = _this.add.text(80, 10, _this.variable[_this.choice] + _this.power)
                        _this.m = _this.add.text(80, 10, _this.variable[_this.choice])
                        _this.one = _this.add.text(90, 10, "1")

                        _this.m2.fill = '#FF0000'
                        _this.m.fill = '#FF0000'
                        _this.one.fill = '#FF0000'

                        _this.boxes1 = _this.add.sprite(290, 155, 'Text box_4');
                        _this.boxes1.scale.setTo(1, 0.8)
                        _this.boxes2 = _this.add.sprite(570, 155, 'Text box_4');
                        _this.boxes2.scale.setTo(0.8, 0.8)
                        _this.boxes3 = _this.add.sprite(760, 155, 'Text box_4');
                        _this.boxes3.scale.setTo(0.8, 0.8)


                        _this.boxes1.addChild(_this.m2);
                        _this.boxes2.addChild(_this.m);
                        _this.boxes3.addChild(_this.one);

                        // _this.textBox.scale.setTo(1.3, 1); 
                        _this.textBox.destroy();
                        _this.textBox2 = _this.add.sprite(220, 60, 'Text box_1');//140, 80
                        _this.textBox2.scale.setTo(1.4, 0.8);//1.5,
                        //_this.textBox2.fontSize = '5px';

                        _this.secondEquationChange();

                        _this.mergeOperation();
                    }
                    else {
                        _this.wrongans.play();
                        _this.space3Boxes.destroy();
                        _this.space3Boxes = _this.add.group();
                        _this.ssquareGreenX = 0;
                        _this.ssquareGreenY = 0;

                        _this.space6Boxes.destroy();
                        _this.space6Boxes = _this.add.group();
                        _this.ssquarePinkX = 0;
                        _this.ssquarePinkY = 0;
                    }
                }
            }
        }
    },
    // tickEvaluation: function (target) {
    //     _this.clickSound.play();

    //     let a = [];
    //     a.push(0);
    //     a.push(0);
    //     a.push(0);
    //     console.log("+++++");

    //     for (let i = 0; i < _this.space1Boxes.length; i++) {
    //         if (_this.space1Boxes.getChildAt(i).name == '11') {
    //             a[0] -= 1;
    //         }
    //     }
    //     for (let i = 0; i < _this.space4Boxes.length; i++) {
    //         if (_this.space4Boxes.getChildAt(i).name == '12') {
    //             a[0] += 1;
    //         }
    //     }
    //     for (let i = 0; i < _this.space2Boxes.length; i++) {
    //         if (_this.space2Boxes.getChildAt(i).name == '21') {
    //             a[1] -= 1;
    //         }
    //     }
    //     for (let i = 0; i < _this.space5Boxes.length; i++) {
    //         if (_this.space5Boxes.getChildAt(i).name == '22') {
    //             a[1] += 1;
    //         }
    //     }
    //     for (let i = 0; i < _this.space3Boxes.length; i++) {
    //         if (_this.space3Boxes.getChildAt(i).name == '31') {
    //             a[2] -= 1;
    //         }
    //     }
    //     for (let i = 0; i < _this.space6Boxes.length; i++) {
    //         if (_this.space6Boxes.getChildAt(i).name == '32') {
    //             a[2] += 1;
    //         }
    //     }
    //     console.log(a, "aaaaaaaaa");

    //     if ((_this.yellowBox.visible == true && _this.yellowBox4.visible == true)) {
    //         // _this.rightbtn.frame = 1;

    //         if (a[0] == _this.mSquare1 + _this.mSquare2) {
    //             console.log("+++++");

    //             _this.eraser.events.onDragStop.removeAll();
    //             _this.eraser.events.onDragStop.add(_this.eraserDrop2, _this);
    //             _this.yellowBox.visible = false;
    //             _this.yellowBox4.visible = false;
    //             _this.yellowBox2.visible = true;
    //             _this.yellowBox5.visible = true;
    //             if (_this.order1[0] == 7 || _this.order1[0] == 8)
    //                 _this.yellowBox7.visible = true;

    //             _this.green_1.events.onInputDown.removeAll();
    //             _this.pink_1.events.onInputDown.removeAll();
    //             _this.green_2.events.onInputDown.add(_this.mR1);
    //             _this.pink_2.events.onInputDown.add(_this.mR2);

    //             _this.space1Boxes.destroy();
    //             _this.space1Boxes = _this.add.group();
    //             _this.space4Boxes.destroy();
    //             _this.space4Boxes = _this.add.group();
    //             _this.squareGreenX = 410;
    //             _this.squareGreenY = 220;

    //             _this.squarePinkX = 270;
    //             _this.squarePinkY = 220;
    //             _this.SquareRecreate();

    //             _this.framechange.play();
    //         }

    //         else {
    //             // _this.space1Boxes.forEach(element => {
    //             //     element.destroy();
    //             // });
    //             _this.space1Boxes.destroy();
    //             _this.space1Boxes = _this.add.group();
    //             _this.squareGreenX = 410;
    //             _this.squareGreenY = 220;

    //             //     // _this.space1Boxes = 0;
    //             _this.space4Boxes.destroy();
    //             _this.space4Boxes = _this.add.group();
    //             _this.squarePinkX = 270;
    //             _this.squarePinkY = 220;

    //             _this.wrongans.play();
    //         }

    //     }
    //     else if (_this.yellowBox2.visible == true && _this.yellowBox5.visible == true) {
    //         if (a[1] == (_this.mLinear1 + _this.mLinear2 + _this.mLinear3)) {
    //             console.log("+++++");
    //             _this.framechange.play();
    //             _this.eraser.events.onDragStop.removeAll();
    //             _this.eraser.events.onDragStop.add(_this.eraserDrop3, _this);
    //             _this.green_2.events.onInputDown.removeAll();
    //             _this.pink_2.events.onInputDown.removeAll();
    //             _this.green_3.events.onInputDown.add(_this.mS1);
    //             _this.pink_3.events.onInputDown.add(_this.mS2);
    //             _this.yellowBox2.visible = false;
    //             _this.yellowBox5.visible = false;
    //             _this.yellowBox3.visible = true;
    //             _this.yellowBox6.visible = true;
    //             if (_this.order1[0] == 7) _this.yellowBox7.visible = false;

    //             if (_this.order1[0] == 8) {
    //                 _this.yellowBox7.visible = false;
    //                 _this.yellowBox8.visible = true;
    //             }

    //         }
    //         else {
    //             _this.wrongans.play();
    //             _this.space2Boxes.destroy();
    //             _this.space2Boxes = _this.add.group();
    //             _this.rectangleGreenX = 650;
    //             _this.rectangleGreenY = 220;
    //             _this.space5Boxes.destroy();
    //             _this.space5Boxes = _this.add.group();
    //             _this.rectanglePinkX = 560;
    //             _this.rectanglePinkY = 220;

    //         }
    //     }

    //     else if (_this.yellowBox3.visible == true && _this.yellowBox6.visible == true) {

    //         if (a[2] == (_this.mConstant1 + _this.mConstant2 + _this.mConstant3)) {
    //             console.log("+++++");
    //             _this.counterCelebrationSound.play();
    //             if (_this.order1[0] == 8) {
    //                 _this.yellowBox8.visible = false;
    //             }
    //             _this.yellowBox3.visible = false;
    //             _this.yellowBox6.visible = false;

    //             _this.sideGray1.destroy();
    //             _this.sideGray2.destroy();
    //             _this.green_1.destroy();
    //             _this.green_2.destroy();
    //             _this.green_3.destroy();

    //             _this.pink_1.destroy();
    //             _this.pink_2.destroy();
    //             _this.pink_3.destroy();

    //             _this.boxes1.destroy();
    //             _this.boxes2.destroy();
    //             _this.boxes3.destroy();
    //             // _this.space1.destroy();
    //             // _this.space2.destroy();

    //             _this.eraser.destroy();
    //             _this.tick.destroy();
    //             //Adding the objects of the second scene in the game.
    //             _this.sideGray = _this.add.sprite(30, 120, 'panale_3');

    //             _this.m2 = _this.add.text(80, 10, _this.variable[_this.choice] + _this.power)
    //             _this.m = _this.add.text(80, 10, _this.variable[_this.choice])
    //             _this.one = _this.add.text(90, 10, "1")

    //             _this.m2.fill = '#FF0000'
    //             _this.m.fill = '#FF0000'
    //             _this.one.fill = '#FF0000'

    //             _this.boxes1 = _this.add.sprite(290, 155, 'Text box_4');
    //             _this.boxes1.scale.setTo(1, 0.8)
    //             _this.boxes2 = _this.add.sprite(570, 155, 'Text box_4');
    //             _this.boxes2.scale.setTo(0.8, 0.8)
    //             _this.boxes3 = _this.add.sprite(760, 155, 'Text box_4');
    //             _this.boxes3.scale.setTo(0.8, 0.8)


    //             _this.boxes1.addChild(_this.m2);
    //             _this.boxes2.addChild(_this.m);
    //             _this.boxes3.addChild(_this.one);

    //             // _this.textBox.scale.setTo(1.3, 1); 
    //             _this.textBox.destroy();
    //             _this.textBox2 = _this.add.sprite(220, 60, 'Text box_1');//140, 80
    //             _this.textBox2.scale.setTo(1.4, 0.8);//1.5,
    //             //_this.textBox2.fontSize = '5px';

    //             _this.secondEquationChange();

    //             _this.mergeOperation();

    //         }
    //         else {
    //             _this.wrongans.play();
    //             _this.space3Boxes.destroy();
    //             _this.space3Boxes = _this.add.group();
    //             _this.ssquareGreenX = 0;
    //             _this.ssquareGreenY = 0;

    //             _this.space6Boxes.destroy();
    //             _this.space6Boxes = _this.add.group();
    //             _this.ssquarePinkX = 0;
    //             _this.ssquarePinkY = 0;
    //         }
    //     }

    // },

    // SquareRecreate: function () {
    //     for (let i = 0; i < Math.abs(_this.mSquare1); i++) {
    //         let square;
    //         if (_this.mSquare1 < 0)
    //             square = _this.add.sprite(_this.squareGreenX, _this.squareGreenY, 'green_1');
    //         else if (_this.mSquare1 > 0)
    //             square = _this.add.sprite(_this.squarePinkX, _this.squarePinkY, 'pink_1');

    //         if (_this.mSquare1 < 0) {
    //             square.name = '11';
    //             if (_this.space1Boxes.length == 3) {
    //                 _this.squareGreenX += 70;
    //                 _this.squareGreenY = 220;
    //             }
    //             square.scale.setTo(0.8, 0.8);
    //             _this.space1Boxes.addChild(square);
    //             console.log(_this.space1Boxes.length, "_this.space1Boxes group length");
    //             _this.squareGreenY += 80;
    //         }
    //         if (_this.mSquare1 > 0) {
    //             if (_this.space4Boxes.length == 3) {
    //                 _this.squarePinkX += 70;
    //                 _this.squarePinkY = 220;

    //             }
    //             // square = _this.add.sprite(_this.squarePinkX, _this.squarePinkY, 'pink_1');
    //             square.scale.setTo(0.8, 0.8);
    //             square.name = '12';
    //             _this.space4Boxes.addChild(square);
    //             console.log(_this.space4Boxes.length, "_this.space4Boxes group length");
    //             _this.squarePinkY += 80;
    //         }
    //     }
    //     // for (let i = 0; i < Math.abs(_this.mSquare2); i++) {
    //     //     _this.limit1 += 6;
    //     //     let square;
    //     //     if (_this.mSquare2 < 0)
    //     //         square = _this.add.sprite(300, 200, 'green_1');
    //     //     else if (_this.mSquare2 > 0)
    //     //         square = _this.add.sprite(300, 200, 'pink_1');
    //     //     square.name = '11';
    //     //     if (_this.space1Boxes.length == 0) {
    //     //         _this.space1Boxes.addChild(square);
    //     //     }
    //     //     else {
    //     //         if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).name[0] == '1') {
    //     //             square.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 100;
    //     //             _this.space1Boxes.addChild(square);
    //     //         }

    //     //     }
    //     // }
    // },

    //Addition of the blocks onto the space and then adding the merge box and the merge operation.
    mergeOperation: function () {
        console.log("merge op...");
        _this.symbol_1 = _this.add.sprite(32, 130, 'symbol_1');
        _this.symbol_2 = _this.add.sprite(32, 250, 'symbol_2');
        _this.symbol_2.alpha = 0.4;
        _this.symbol_3 = _this.add.sprite(32, 370, 'symbol_3');
        _this.symbol_3.alpha = 0.4;

        if (_this.numberOfQuestions == 0) {
            let hand = _this.add.image(200, 200, 'hand');
            _this.handTween = _this.add.tween(hand);
            _this.handTween.to({ x: 57, y: 170 }, 2000, 'Linear', true, 0);
            _this.handTween.onComplete.add(function () {
                _this.clickSound.play();
                hand.destroy();
            });
        }

        // _this.textBox.x += 40;

        _this.symbol_1.frame = 1;
        _this.symbol_2.frame = 0;
        _this.symbol_3.frame = 0;

        _this.symbol_1.inputEnabled = true;
        _this.symbol_1.input.useHandCursor = true;
        _this.symbol_1.events.onInputDown.add(function () {
            _this.clickSound.play();
            _this.symbol_1.events.onInputDown.removeAll();
            _this.symbol_1.frame = 0;

            _this.finalAnsB = _this.mSquare1 + _this.mSquare2;
            console.log(_this.finalAnsB, "finalAnsB")
            //Merging of the larger squares.

            //green>=1,pink==1=>1 loop
            // green>=1,pink>=1==>green<pink--green loop||pink

            if (_this.space1Boxes.length >= 1 && _this.space4Boxes.length == 1) {
                _this.firstBox_flag = 1;
                for (i = 1; i <= _this.space4Boxes.length; i++) {
                    _this.time.events.add(1000, () => {
                        console.log("///////////////++++++++++")
                        tempDragAction = _this.add.tween(_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1));
                        tempDragAction.to({ x: _this.squarePinkX, y: _this.squarePinkY - 80 }, 500, 'Linear', true, 0);
                        tempDragAction.start();
                        console.log("tween start")
                        tempDragAction.onComplete.add(function () {
                            console.log("tween stoppp")

                            _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).destroy();
                            _this.space4Boxes.getChildAt(_this.space4Boxes.length - 1).destroy();
                            _this.SecondBoxMerge();

                        });
                    });
                }
            }
            else if (_this.space1Boxes.length >= 1 && _this.space4Boxes.length >= 1) {

                if (_this.space1Boxes.length < _this.space4Boxes.length) {//|| _this.space1Boxes.length == _this.space4Boxes.length
                    // for (i = 0; i < _this.space1Boxes.length; i++) {
                    // _this.time.events.add(1000, () => {
                    console.log("///////////////++++++++++")
                    var groupLength = _this.space1Boxes.length;
                    let i = 0;
                    _this.loope = _this.time.create(false)
                    _this.loope.start();
                    _this.loope.loop(800, () => {
                        _this.firstBox_flag = 1;
                        console.log("///////////////++++++++++")
                        tempDragAction = _this.add.tween(_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1));
                        tempDragAction.to({ x: _this.squarePinkX, y: _this.squarePinkY - 80 }, 300, 'Linear', true, 0);
                        tempDragAction.start();
                        console.log("tween start")
                        i++;
                        console.log(i, "i")
                        tempDragAction.onComplete.add(function () {
                            console.log("tween stoppp")
                            _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).destroy();
                            _this.space4Boxes.getChildAt(_this.space4Boxes.length - 1).destroy();
                            _this.squarePinkY -= 80;

                        });
                        if (i == groupLength) {
                            console.log(i, "stop the looppppp...........")

                            _this.loope.stop();
                            _this.SecondBoxMerge();
                        }

                    })
                    // });
                    // }

                }
                else {
                    console.log("///////////////++++++++++")
                    // for (i = 0; i < _this.space4Boxes.length; i++) {
                    //     _this.time.events.add(1000, () => {
                    var groupLength = _this.space4Boxes.length;
                    let i = 0;
                    _this.loope = _this.time.create(false)
                    _this.loope.start();
                    _this.loope.loop(800, () => {
                        _this.firstBox_flag = 1;
                        tempDragAction = _this.add.tween(_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1));
                        tempDragAction.to({ x: _this.squarePinkX, y: _this.squarePinkY - 80 }, 500, 'Linear', true, 0);
                        tempDragAction.start();
                        console.log("tween start")
                        i++;
                        console.log(i, "i")
                        tempDragAction.onComplete.add(function () {
                            console.log("tween stoppp")
                            _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).destroy();
                            _this.space4Boxes.getChildAt(_this.space4Boxes.length - 1).destroy();
                            _this.squarePinkY -= 80;

                        });
                        if (i == groupLength) {
                            console.log(i, "stop the looppppp...........")

                            _this.loope.stop();
                            _this.SecondBoxMerge();
                        }

                    })
                    // }
                }

            }
            else {
                _this.SecondBoxMerge();
            }

        });

    },

    secondEquationChange: function () {
        _this.power = "\u{00B2}";

        let string2 = "";

        if (_this.order1[0] == 6) {

            if (_this.mSquare1 == 1) {
                string2 = string2 + _this.variable[_this.choice] + _this.power;
            }
            else if (_this.mSquare1 == -1) {
                string2 = string2 + "-" + _this.variable[_this.choice] + _this.power;
            }
            else {
                if (_this.mSquare1 > 0) {
                    string2 = string2 + _this.mSquare1 + _this.variable[_this.choice] + _this.power;
                }
                else
                    string2 = string2 + _this.mSquare1 + _this.variable[_this.choice] + _this.power;
            }

            if (_this.mLinear1 == 1) {
                string2 = string2 + " + " + _this.variable[_this.choice];
            }
            else if (_this.mLinear1 == -1) {
                string2 = string2 + " - " + _this.variable[_this.choice];
            }
            else {
                if (_this.mLinear1 > 0) {
                    string2 = string2 + " + " + _this.mLinear1 + _this.variable[_this.choice];
                }
                else
                    string2 = string2 + " - " + Math.abs(_this.mLinear1) + _this.variable[_this.choice];
            }

            if (_this.mConstant1 > 0)
                string2 = string2 + " + " + _this.mConstant1;
            else
                string2 = string2 + " " + _this.mConstant1;

            if (_this.mSquare2 == 1) {
                string2 = string2 + " + " + _this.variable[_this.choice] + _this.power;
            }
            else if (_this.mSquare2 == -1) {
                string2 = string2 + ' - ' + _this.variable[_this.choice] + _this.power;
            }
            else {
                if (_this.mSquare2 > 0)
                    string2 = string2 + " + " + _this.mSquare2 + _this.variable[_this.choice] + _this.power;
                else
                    string2 = string2 + " - " + Math.abs(_this.mSquare2) + _this.variable[_this.choice] + _this.power;
            }

            if (_this.mLinear2 == 1) {
                string2 = string2 + " + " + _this.variable[_this.choice];
            }
            else if (_this.mLinear2 == -1) {
                string2 = string2 + " - " + _this.variable[_this.choice];
            }
            else {
                if (_this.mLinear2 > 0) {
                    string2 = string2 + " + " + _this.mLinear2 + _this.variable[_this.choice];
                }
                else {
                    string2 = string2 + " - " + Math.abs(_this.mLinear2) + _this.variable[_this.choice];
                }
            }

            if (_this.mConstant2 > 0)
                string2 = string2 + " + " + _this.mConstant2;
            else
                string2 = string2 + " - " + Math.abs(_this.mConstant2);

            _this.questionText6 = _this.add.text(0, 18, string2);
            _this.applyingStyle1(_this.questionText6);
            _this.questionText6.fill = '#65B4C3';
            _this.textBox2.addChild(_this.questionText6);
            _this.questionText6.x = _this.textBox2.getBounds().width / 5 - _this.questionText6.getBounds().width / 5;
        }

        if (_this.order1[0] == 7) {

            if (_this.mSquare1 == 1) {
                string2 = string2 + _this.variable[_this.choice] + _this.power;
            }
            else if (_this.mSquare1 == -1) {
                string2 = string2 + "-" + _this.variable[_this.choice] + _this.power;
            }
            else {
                if (_this.mSquare1 > 0) {
                    string2 = string2 + _this.mSquare1 + _this.variable[_this.choice] + _this.power;
                }
                else
                    string2 = string2 + _this.mSquare1 + _this.variable[_this.choice] + _this.power;
            }

            if (_this.mLinear1 == 1) {
                string2 = string2 + " + " + _this.variable[_this.choice];
            }
            else if (_this.mLinear1 == -1) {
                string2 = string2 + " - " + _this.variable[_this.choice];
            }
            else {
                if (_this.mLinear1 > 0) {
                    string2 = string2 + " + " + _this.mLinear1 + _this.variable[_this.choice];
                }
                else
                    string2 = string2 + " - " + Math.abs(_this.mLinear1) + _this.variable[_this.choice];
            }

            if (_this.mConstant1 > 0)
                string2 = string2 + " + " + _this.mConstant1;
            else
                string2 = string2 + " " + _this.mConstant1;

            if (_this.mSquare2 == 1) {
                string2 = string2 + " + " + _this.variable[_this.choice] + _this.power;
            }
            else if (_this.mSquare2 == -1) {
                string2 = string2 + ' - ' + _this.variable[_this.choice] + _this.power;
            }
            else {
                if (_this.mSquare2 > 0)
                    string2 = string2 + " + " + _this.mSquare2 + _this.variable[_this.choice] + _this.power;
                else
                    string2 = string2 + " - " + Math.abs(_this.mSquare2) + _this.variable[_this.choice] + _this.power;
            }

            if (_this.mLinear2 == 1) {
                string2 = string2 + " + " + _this.variable[_this.choice];
            }
            else if (_this.mLinear2 == -1) {
                string2 = string2 + " - " + _this.variable[_this.choice];
            }
            else {
                if (_this.mLinear2 > 0) {
                    string2 = string2 + " + " + _this.mLinear2 + _this.variable[_this.choice];
                }
                else {
                    string2 = string2 + " - " + Math.abs(_this.mLinear2) + _this.variable[_this.choice];
                }
            }

            if (_this.mConstant2 > 0)
                string2 = string2 + " + " + _this.mConstant2;
            else
                string2 = string2 + " - " + Math.abs(_this.mConstant2);


            if (_this.mLinear3 == 1) {
                string2 = string2 + " + " + _this.variable[_this.choice];
            }
            else if (_this.mLinear3 == -1) {
                string2 = string2 + " - " + _this.variable[_this.choice];
            }
            else {
                if (_this.mLinear3 > 0)
                    string2 = string2 + " + " + _this.mLinear3 + _this.variable[_this.choice];
                else
                    string2 = string2 + " - " + Math.abs(_this.mLinear3) + _this.variable[_this.choice];
            }

            _this.questionText6 = _this.add.text(20, 18, string2);
            _this.applyingStyle1(_this.questionText6);
            _this.questionText6.fill = '#65B4C3';
            _this.textBox2.addChild(_this.questionText6);
            // _this.questionText6.x = _this.textBox.getBounds().width / 6 - _this.questionText6.getBounds().width / 6;
        }

        if (_this.order1[0] == 8) {

            if (_this.mSquare1 == 1) {
                string2 = string2 + _this.variable[_this.choice] + _this.power;
            }
            else if (_this.mSquare1 == -1) {
                string2 = string2 + "-" + _this.variable[_this.choice] + _this.power;
            }
            else {
                if (_this.mSquare1 > 0) {
                    string2 = string2 + _this.mSquare1 + _this.variable[_this.choice] + _this.power;
                }
                else
                    string2 = string2 + _this.mSquare1 + _this.variable[_this.choice] + _this.power;
            }

            if (_this.mLinear1 == 1) {
                string2 = string2 + " + " + _this.variable[_this.choice];
            }
            else if (_this.mLinear1 == -1) {
                string2 = string2 + " - " + _this.variable[_this.choice];
            }
            else {
                if (_this.mLinear1 > 0) {
                    string2 = string2 + " + " + _this.mLinear1 + _this.variable[_this.choice];
                }
                else
                    string2 = string2 + " - " + Math.abs(_this.mLinear1) + _this.variable[_this.choice];
            }

            if (_this.mConstant1 > 0)
                string2 = string2 + " + " + _this.mConstant1;
            else
                string2 = string2 + " " + _this.mConstant1;

            if (_this.mSquare2 == 1) {
                string2 = string2 + " + " + _this.variable[_this.choice] + _this.power;
            }
            else if (_this.mSquare2 == -1) {
                string2 = string2 + ' - ' + _this.variable[_this.choice] + _this.power;
            }
            else {
                if (_this.mSquare2 > 0)
                    string2 = string2 + " + " + _this.mSquare2 + _this.variable[_this.choice] + _this.power;
                else
                    string2 = string2 + " - " + Math.abs(_this.mSquare2) + _this.variable[_this.choice] + _this.power;
            }

            if (_this.mLinear2 == 1) {
                string2 = string2 + " + " + _this.variable[_this.choice];
            }
            else if (_this.mLinear2 == -1) {
                string2 = string2 + " - " + _this.variable[_this.choice];
            }
            else {
                if (_this.mLinear2 > 0) {
                    string2 = string2 + " + " + _this.mLinear2 + _this.variable[_this.choice];
                }
                else {
                    string2 = string2 + " - " + Math.abs(_this.mLinear2) + _this.variable[_this.choice];
                }
            }

            if (_this.mConstant2 > 0)
                string2 = string2 + " + " + _this.mConstant2;
            else
                string2 = string2 + " - " + Math.abs(_this.mConstant2);


            if (_this.mLinear3 == 1) {
                string2 = string2 + " + " + _this.variable[_this.choice];
            }
            else if (_this.mLinear3 == -1) {
                string2 = string2 + " - " + _this.variable[_this.choice];
            }
            else {
                if (_this.mLinear3 > 0)
                    string2 = string2 + " + " + _this.mLinear3 + _this.variable[_this.choice];
                else
                    string2 = string2 + " - " + Math.abs(_this.mLinear3) + _this.variable[_this.choice];
            }


            if (_this.mConstant3 > 0)
                string2 = string2 + " + " + _this.mConstant3;
            else
                string2 = string2 + " - " + Math.abs(_this.mConstant3);


            _this.questionText6 = _this.add.text(18, 18, string2);
            _this.questionText6.fill = '#65B4C3';
            _this.textBox2.addChild(_this.questionText6);
            // _this.questionText6.x = _this.textBox.getBounds().width / 15 - _this.questionText6.getBounds().width / 15;
        }
    },

    addNextTextbox: function () {
        //Adding the numberpad and the answer box.
        _this.time.events.add(1600, () => {//* (delay)

            _this.tempText = _this.add.text(0, 0, '=');
            _this.tempText.visible = false;
            // _this.yellowbox9.scale.setTo((_this.tempText.getBounds().width) / (_this.yellowbox9.getBounds().width), 1);
            _this.tempText.destroy();
            _this.textBox2.destroy();
            _this.textBox = _this.add.sprite(140, 60, 'Text box_2');
            _this.textBox.scale.setTo(0.8);//0.8
            // _this.textBox.addChild(_this.yellowbox9);
            _this.ChangeBoxEquation();
            _this.questionText2 = _this.add.text(450, 19, ' =');//438
            _this.questionText3 = _this.add.text(560, 19, _this.variable[_this.choice] + _this.power + ' + ');//555
            _this.questionText4 = _this.add.text(680, 19, _this.variable[_this.choice] + ' + ');//675
            // _this.questionText1.fill='#65B4C3';
            _this.questionText2.fill = '#65B4C3';
            _this.questionText3.fill = '#65B4C3';
            _this.questionText4.fill = '#65B4C3';
            // _this.textBox.addChild(_this.questionText1);
            _this.textBox.addChild(_this.questionText2);
            _this.textBox.addChild(_this.questionText3);
            _this.textBox.addChild(_this.questionText4);

            _this.addAnswerBoxAndHighlight();

        });
    },
    //Adds the three answer boxes and highlight them.
    addAnswerBoxAndHighlight: function () {
        _this.AnswerBox1 = _this.add.sprite(527, 68, 'Text box_5');//525
        _this.AnswerBox2 = _this.add.sprite(628, 68, 'Text box_5');//623
        _this.AnswerBox3 = _this.add.sprite(731, 68, 'Text box_5');//726        

        _this.AnswerBox1.inputEnabled = true;
        _this.AnswerBox2.inputEnabled = true;
        _this.AnswerBox3.inputEnabled = true;

        _this.AnswerBox1.frame = 1;
        _this.AnswerBox2.frame = 0;
        _this.AnswerBox3.frame = 0;

        _this.AnswerBox1.input.useHandCursor = true;
        _this.AnswerBox2.input.useHandCursor = true;
        _this.AnswerBox3.input.useHandCursor = true;
        _this.addNumberPad();

        _this.AnswerBox1.events.onInputDown.add(function () {
            _this.clickSound.play();
            _this.AnswerBox1.frame = 1;
            _this.AnswerBox2.frame = 0;
            _this.AnswerBox3.frame = 0;
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked1, _this);
            for (let i = 1; i <= 12; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked1, _this);
            }
        });
        _this.AnswerBox2.events.onInputDown.add(function () {
            _this.clickSound.play();
            _this.AnswerBox1.frame = 0;
            _this.AnswerBox2.frame = 1;
            _this.AnswerBox3.frame = 0;
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked2, _this);
            for (let i = 1; i <= 12; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked2, _this);
            }
        });
        _this.AnswerBox3.events.onInputDown.add(function () {
            _this.clickSound.play();
            _this.AnswerBox1.frame = 0;
            _this.AnswerBox2.frame = 0;
            _this.AnswerBox3.frame = 1;
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked3, _this);
            for (let i = 1; i <= 12; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked3, _this);
            }
        });
    },


    SecondBoxMerge: function () {
        // if (_this.firstBox_flag == 1) {
        //     _this.time.events.add(3000, () => {
        if (_this.space2Boxes.length >= 1 && _this.space5Boxes.length == 1) {
            for (i = 1; i <= _this.space5Boxes.length; i++) {
                _this.time.events.add(1000, () => {
                    console.log("///////////////++++++++++")
                    tempDragAction2 = _this.add.tween(_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1));
                    tempDragAction2.to({ x: _this.rectanglePinkX, y: _this.rectanglePinkY - 80 }, 500, 'Linear', true, 0);
                    tempDragAction2.start();
                    console.log("tween start")
                    tempDragAction2.onComplete.add(function () {
                        console.log("tween stoppp")
                        _this.secondBox_flag = 1;
                        _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).destroy();
                        _this.space5Boxes.getChildAt(_this.space5Boxes.length - 1).destroy();
                        _this.ThirdBoxMerge();

                    });
                });
            }
        }
        else if (_this.space2Boxes.length >= 1 && _this.space5Boxes.length >= 1) {
            if (_this.space2Boxes.length < _this.space5Boxes.length) {//|| _this.space2Boxes.length == _this.space5Boxes.length
                // for (i = 0; i < _this.space2Boxes.length; i++) {
                // _this.time.events.add(1000, () => {
                console.log("///////////////++++++++++")
                var groupLength = _this.space2Boxes.length;
                let i = 0;
                _this.loope = _this.time.create(false)
                _this.loope.start();
                // _this.rectanglePinkY-=80;
                _this.loope.loop(800, () => {
                    _this.secondBox_flag = 1;
                    console.log("///////////////++++++++++")
                    tempDragAction2 = _this.add.tween(_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1));
                    tempDragAction2.to({ x: _this.rectanglePinkX, y: _this.rectanglePinkY - 80 }, 500, 'Linear', true, 0);
                    tempDragAction2.start();
                    console.log("tween start")
                    i++;
                    console.log(i, "i")
                    tempDragAction2.onComplete.add(function () {
                        console.log("tween stoppp")
                        _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).destroy();
                        _this.space5Boxes.getChildAt(_this.space5Boxes.length - 1).destroy();
                        _this.rectanglePinkY -= 80;
                        if (_this.space5Boxes.length == 3) {
                            console.log("less than 3.....")
                            _this.rectanglePinkX = 560;//650
                            _this.rectanglePinkY = 460;//380
                        }
                        if (_this.space5Boxes.length == 2) {
                            _this.rectanglePinkX = 560;
                            _this.rectanglePinkY = 380;
                        }

                    });
                    if (i == groupLength) {
                        console.log(i, "stop the looppppp...........")

                        _this.loope.stop();
                        _this.ThirdBoxMerge();
                    }

                })
                // });
                // }

            }
            else {
                console.log("///////////////++++++++++")
                // for (i = 0; i < _this.space5Boxes.length; i++) {
                //     _this.time.events.add(1000, () => {
                var groupLength = _this.space5Boxes.length;
                let i = 0;
                _this.loope = _this.time.create(false)
                _this.loope.start();
                _this.rectanglePinkY -= 80;
                _this.loope.loop(800, () => {
                    _this.secondBox_flag = 1;
                    tempDragAction2 = _this.add.tween(_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1));
                    tempDragAction2.to({ x: _this.rectanglePinkX, y: _this.rectanglePinkY }, 500, 'Linear', true, 0);//- 80 
                    tempDragAction2.start();
                    console.log("tween start")
                    console.log("_this.rectanglePinkY", _this.rectanglePinkY)
                    i++;
                    console.log(i, "i")
                    tempDragAction2.onComplete.add(function () {
                        console.log("tween stoppp")
                        _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).destroy();
                        _this.space5Boxes.getChildAt(_this.space5Boxes.length - 1).destroy();
                        console.log(_this.space5Boxes.length, "_this.space5Boxes.length");
                        _this.rectanglePinkY -= 80;
                        if (_this.space5Boxes.length == 3) {
                            console.log("less than 3.....")
                            _this.rectanglePinkX = 560;//650
                            _this.rectanglePinkY = 380;//380//460
                        }
                    });
                    if (i == groupLength) {
                        console.log(i, "stop the looppppp...........")

                        _this.loope.stop();
                        _this.ThirdBoxMerge();
                    }

                })
                // }
            }

        }
        // });
        else {
            _this.ThirdBoxMerge();
        }



    },

    ThirdBoxMerge: function () {

        // if ((_this.firstBox_flag == 1 && _this.secondBox_flag == 1) || (_this.firstBox_flag == 1) || (_this.secondBox_flag == 1)) {

        // _this.time.events.add(5000, () => {
        if (_this.space3Boxes.length >= 1 && _this.space6Boxes.length == 1) {
            for (i = 1; i <= _this.space6Boxes.length; i++) {
                _this.time.events.add(1000, () => {
                    console.log("///////////////++++++++++")
                    _this.ssquarePinkY -= 1;
                    tempDragAction2 = _this.add.tween(_this.space3Boxes.getChildAt(_this.space3Boxes.length - 1));
                    tempDragAction2.to({ x: _this.ssquarePinkXArray[_this.ssquarePinkX], y: _this.ssquarePinkYArray[_this.ssquarePinkY] }, 700, 'Linear', true, 0);
                    tempDragAction2.start();
                    console.log("tween start")
                    tempDragAction2.onComplete.add(function () {
                        console.log("tween stoppp")
                        _this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).destroy();
                        _this.space6Boxes.getChildAt(_this.space6Boxes.length - 1).destroy();
                        console.log("next box3rd")
                        _this.addNextTextbox();
                    });
                });
            }
        }
        else if (_this.space3Boxes.length >= 1 && _this.space6Boxes.length >= 1) {
            if (_this.space3Boxes.length < _this.space6Boxes.length) {//|| _this.space3Boxes.length == _this.space6Boxes.length
                // for (i = 0; i < _this.space3Boxes.length; i++) {
                // _this.time.events.add(1000, () => {
                console.log("///////////////++++++++++")
                var groupLength = _this.space3Boxes.length;
                let i = 0;
                _this.loope = _this.time.create(false)
                _this.loope.start();
                _this.ssquarePinkY -= 1;
                _this.loope.loop(800, () => {
                    console.log("///////////////++++++++++")
                    tempDragAction2 = _this.add.tween(_this.space3Boxes.getChildAt(_this.space3Boxes.length - 1));
                    tempDragAction2.to({ x: _this.ssquarePinkXArray[_this.ssquarePinkX], y: _this.ssquarePinkYArray[_this.ssquarePinkY] }, 700, 'Linear', true, 0);
                    tempDragAction2.start();
                    console.log("tween start")
                    console.log("_this.ssquarePinkYArray[_this.ssquarePinkY]", _this.ssquarePinkYArray[_this.ssquarePinkY]);
                    i++;
                    console.log(i, "i")
                    tempDragAction2.onComplete.add(function () {
                        console.log("tween stoppp")
                        _this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).destroy();
                        _this.space6Boxes.getChildAt(_this.space6Boxes.length - 1).destroy();
                        _this.ssquarePinkY--;
                        // if (_this.space6Boxes.length <= 8) {
                        //    console.log("less than 8.....")
                        //     _this.ssquarePinkX = 0;
                        //     // _this.ssquarePinkY = _this.space6Boxes.length;
                        // }
                        if (_this.space6Boxes.length == 9) {
                            // _this.ssquarePinkX--;
                            _this.ssquarePinkX = 0;
                            _this.ssquarePinkY = _this.space6Boxes.length - 1;
                            console.log(_this.ssquarePinkY, "_this.ssquarePinkY")
                            console.log(_this.ssquarePinkX, "_this.ssquarePinkx")
                        }
                        if (_this.space6Boxes.length <= 8) {
                            _this.ssquarePinkX = 0;
                            _this.ssquarePinkY = _this.space6Boxes.length - 1;
                            console.log(_this.ssquarePinkY, "_this.ssquarePinkY")
                            console.log(_this.ssquarePinkX, "_this.ssquarePinkx")
                        }

                    });
                    if (i == groupLength) {
                        console.log(i, "stop the looppppp...........")
                        _this.loope.stop();
                        console.log("next box3rd")
                        _this.addNextTextbox();
                    }

                })
                // });
                // }

            }
            else {
                console.log("///////////////++++++++++")
                // for (i = 0; i < _this.space6Boxes.length; i++) {
                //     _this.time.events.add(1000, () => {
                var groupLength = _this.space6Boxes.length;
                let i = 0;
                _this.loope = _this.time.create(false)
                _this.loope.start();
                _this.ssquarePinkY -= 1;
                if (_this.space6Boxes.length == 1) {
                    _this.ssquarePinkX = 0;
                    _this.ssquarePinkY = 220;
                }
                _this.loope.loop(800, () => {

                    tempDragAction2 = _this.add.tween(_this.space3Boxes.getChildAt(_this.space3Boxes.length - 1));
                    tempDragAction2.to({ x: _this.ssquarePinkXArray[_this.ssquarePinkX], y: _this.ssquarePinkYArray[_this.ssquarePinkY] }, 700, 'Linear', true, 0);
                    tempDragAction2.start();
                    console.log("tween start")
                    console.log("_this.ssquarePinkYArray[_this.ssquarePinkY]", _this.ssquarePinkYArray[_this.ssquarePinkY]);
                    i++;
                    console.log(i, "i")
                    tempDragAction2.onComplete.add(function () {
                        console.log("tween stoppp")
                        _this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).destroy();
                        _this.space6Boxes.getChildAt(_this.space6Boxes.length - 1).destroy();
                        _this.ssquarePinkY--;
                        if (_this.space6Boxes.length < 8) {
                            console.log("less than 8.....")
                            _this.ssquarePinkX = 0;
                            _this.ssquarePinkY = _this.space6Boxes.length - 1;
                            console.log(_this.ssquarePinkY, "_this.ssquarePinkY")
                            console.log(_this.ssquarePinkX, "_this.ssquarePinkx")
                        }
                        if (_this.space6Boxes.length == 1) {

                        }

                    });
                    if (i == groupLength) {
                        console.log(i, "stop the looppppp...........")
                        _this.loope.stop();
                        console.log("next box3rd")
                        _this.addNextTextbox();
                    }

                })
                // }
            }

        }
        else {
            console.log("next box3rd")
            _this.addNextTextbox();
        }

        // }

    },

    ChangeBoxEquation: function () {
        console.log("MakeSideBar");
        _this.power = "\u{00B2}";

        let string = "";

        if (_this.order1[0] == 6) {

            if (_this.mSquare1 == 1) {
                string = string + _this.variable[_this.choice] + _this.power;
            }
            else if (_this.mSquare1 == -1) {
                string = string + "-" + _this.variable[_this.choice] + _this.power;
            }
            else {
                if (_this.mSquare1 > 0) {
                    string = string + _this.mSquare1 + _this.variable[_this.choice] + _this.power;
                }
                else
                    string = string + _this.mSquare1 + _this.variable[_this.choice] + _this.power;
            }
            if (_this.mLinear1 == 1) {
                string = string + " + " + _this.variable[_this.choice];
            }
            else if (_this.mLinear1 == -1) {
                string = string + " - " + _this.variable[_this.choice];
            }
            else {
                if (_this.mLinear1 > 0) {
                    string = string + " + " + _this.mLinear1 + _this.variable[_this.choice];
                }
                else
                    string = string + " - " + Math.abs(_this.mLinear1) + _this.variable[_this.choice];
            }

            if (_this.mConstant1 > 0)
                string = string + " + " + _this.mConstant1;
            else
                string = string + " - " + Math.abs(_this.mConstant1);

            if (_this.mSquare2 == 1) {
                string = string + " + " + _this.variable[_this.choice] + _this.power;
            }
            else if (_this.mSquare2 == -1) {
                string = string + ' - ' + _this.variable[_this.choice] + _this.power;
            }
            else {
                if (_this.mSquare2 > 0)
                    string = string + " + " + _this.mSquare2 + _this.variable[_this.choice] + _this.power;
                else
                    string = string + " - " + Math.abs(_this.mSquare2) + _this.variable[_this.choice] + _this.power;
            }

            if (_this.mLinear2 == 1) {
                string = string + " + " + _this.variable[_this.choice];
            }
            else if (_this.mLinear2 == -1) {
                string = string + " - " + _this.variable[_this.choice];
            }
            else {
                if (_this.mLinear2 > 0) {
                    string = string + " + " + _this.mLinear2 + _this.variable[_this.choice];
                }
                else {
                    string = string + " - " + Math.abs(_this.mLinear2) + _this.variable[_this.choice];
                }
            }

            if (_this.mConstant2 > 0)
                string = string + " + " + _this.mConstant2;
            else
                string = string + " - " + Math.abs(_this.mConstant2);

            _this.questionText5 = _this.add.text(0, 18, string);
            _this.questionText5.fill = '#65B4C3';
            _this.textBox.addChild(_this.questionText5);
            _this.questionText5.x = _this.textBox.getBounds().width / 7 - _this.questionText5.getBounds().width / 7;
        }

        if (_this.order1[0] == 7) {

            if (_this.mSquare1 == 1) {
                string = string + _this.variable[_this.choice] + _this.power;
            }
            else if (_this.mSquare1 == -1) {
                string = string + "-" + _this.variable[_this.choice] + _this.power;
            }
            else {
                if (_this.mSquare1 > 0) {
                    string = string + _this.mSquare1 + _this.variable[_this.choice] + _this.power;
                }
                else
                    string = string + _this.mSquare1 + _this.variable[_this.choice] + _this.power;
            }
            if (_this.mLinear1 == 1) {
                string = string + " + " + _this.variable[_this.choice];
            }
            else if (_this.mLinear1 == -1) {
                string = string + " - " + _this.variable[_this.choice];
            }
            else {
                if (_this.mLinear1 > 0) {
                    string = string + " + " + _this.mLinear1 + _this.variable[_this.choice];
                }
                else
                    string = string + " - " + Math.abs(_this.mLinear1) + _this.variable[_this.choice];
            }

            if (_this.mConstant1 > 0)
                string = string + " + " + _this.mConstant1;
            else
                string = string + " - " + Math.abs(_this.mConstant1);

            if (_this.mSquare2 == 1) {
                string = string + " + " + _this.variable[_this.choice] + _this.power;
            }
            else if (_this.mSquare2 == -1) {
                string = string + ' - ' + _this.variable[_this.choice] + _this.power;
            }
            else {
                if (_this.mSquare2 > 0)
                    string = string + " + " + _this.mSquare2 + _this.variable[_this.choice] + _this.power;
                else
                    string = string + " - " + Math.abs(_this.mSquare2) + _this.variable[_this.choice] + _this.power;
            }

            if (_this.mLinear2 == 1) {
                string = string + " + " + _this.variable[_this.choice];
            }
            else if (_this.mLinear2 == -1) {
                string = string + " - " + _this.variable[_this.choice];
            }
            else {
                if (_this.mLinear2 > 0) {
                    string = string + " + " + _this.mLinear2 + _this.variable[_this.choice];
                }
                else {
                    string = string + " - " + Math.abs(_this.mLinear2) + _this.variable[_this.choice];
                }
            }

            if (_this.mConstant2 > 0)
                string = string + " + " + _this.mConstant2;
            else
                string = string + " - " + Math.abs(_this.mConstant2);


            if (_this.mLinear3 == 1) {
                string = string + " + " + _this.variable[_this.choice];
            }
            else if (_this.mLinear3 == -1) {
                string = string + " - " + _this.variable[_this.choice];
            }
            else {
                if (_this.mLinear3 > 0)
                    string = string + " + " + _this.mLinear3 + _this.variable[_this.choice];
                else
                    string = string + " - " + Math.abs(_this.mLinear3) + _this.variable[_this.choice];
            }

            _this.questionText5 = _this.add.text(0, 18, string);
            _this.questionText5.fill = '#65B4C3';
            _this.textBox.addChild(_this.questionText5);
            _this.questionText5.x = _this.textBox.getBounds().width / 15 - _this.questionText5.getBounds().width / 15;
        }

        if (_this.order1[0] == 8) {

            if (_this.mSquare1 == 1) {
                string = string + _this.variable[_this.choice] + _this.power;
            }
            else if (_this.mSquare1 == -1) {
                string = string + "-" + _this.variable[_this.choice] + _this.power;
            }
            else {
                if (_this.mSquare1 > 0) {
                    string = string + _this.mSquare1 + _this.variable[_this.choice] + _this.power;
                }
                else
                    string = string + _this.mSquare1 + _this.variable[_this.choice] + _this.power;
            }
            if (_this.mLinear1 == 1) {
                string = string + " + " + _this.variable[_this.choice];
            }
            else if (_this.mLinear1 == -1) {
                string = string + " - " + _this.variable[_this.choice];
            }
            else {
                if (_this.mLinear1 > 0) {
                    string = string + " + " + _this.mLinear1 + _this.variable[_this.choice];
                }
                else
                    string = string + " - " + Math.abs(_this.mLinear1) + _this.variable[_this.choice];
            }

            if (_this.mConstant1 > 0)
                string = string + " + " + _this.mConstant1;
            else
                string = string + " - " + Math.abs(_this.mConstant1);

            if (_this.mSquare2 == 1) {
                string = string + " + " + _this.variable[_this.choice] + _this.power;
            }
            else if (_this.mSquare2 == -1) {
                string = string + ' - ' + _this.variable[_this.choice] + _this.power;
            }
            else {
                if (_this.mSquare2 > 0)
                    string = string + " + " + _this.mSquare2 + _this.variable[_this.choice] + _this.power;
                else
                    string = string + " - " + Math.abs(_this.mSquare2) + _this.variable[_this.choice] + _this.power;
            }

            if (_this.mLinear2 == 1) {
                string = string + " + " + _this.variable[_this.choice];
            }
            else if (_this.mLinear2 == -1) {
                string = string + " - " + _this.variable[_this.choice];
            }
            else {
                if (_this.mLinear2 > 0) {
                    string = string + " + " + _this.mLinear2 + _this.variable[_this.choice];
                }
                else {
                    string = string + " - " + Math.abs(_this.mLinear2) + _this.variable[_this.choice];
                }
            }

            if (_this.mConstant2 > 0)
                string = string + " + " + _this.mConstant2;
            else
                string = string + " - " + Math.abs(_this.mConstant2);


            if (_this.mLinear3 == 1) {
                string = string + " + " + _this.variable[_this.choice];
            }
            else if (_this.mLinear3 == -1) {
                string = string + " - " + _this.variable[_this.choice];
            }
            else {
                if (_this.mLinear3 > 0)
                    string = string + " + " + _this.mLinear3 + _this.variable[_this.choice];
                else
                    string = string + " - " + Math.abs(_this.mLinear3) + _this.variable[_this.choice];
            }


            if (_this.mConstant3 > 0)
                string = string + " + " + _this.mConstant3;
            else
                string = string + " - " + Math.abs(_this.mConstant3);


            _this.questionText5 = _this.add.text(15, 18, string);
            _this.questionText5.fill = '#65B4C3';
            _this.textBox.addChild(_this.questionText5);
            // _this.questionText5.x = _this.textBox.getBounds().width / 14 - _this.questionText5.getBounds().width / 14;
        }


    },

    m2S1: function () {
        _this.clickSound.play();
        if (_this.space1Boxes.length > 5) {
            return;
        }
        if (_this.space1Boxes.length == 3) {
            _this.squareGreenX += 70;
            _this.squareGreenY = 220;
        }
        _this.square = _this.add.sprite(_this.squareGreenX, _this.squareGreenY, 'green_1');
        _this.square.scale.setTo(0.8, 0.8);
        _this.square.name = '11';
        _this.space1Boxes.addChild(_this.square);
        console.log(_this.space1Boxes.length, "_this.space1Boxes group length");
        _this.squareGreenY += 80;
    },

    mR1: function () {
        _this.clickSound.play();
        if (_this.space2Boxes.length > 8) {
            return;
        }
        if (_this.space2Boxes.length == 3) {
            _this.rectangleGreenX += 30;
            _this.rectangleGreenY = 220;
        }

        if (_this.space2Boxes.length == 6) {
            _this.rectangleGreenX += 30;
            _this.rectangleGreenY = 220;
        }

        _this.rectangle = _this.add.sprite(_this.rectangleGreenX, _this.rectangleGreenY, 'green_2');
        _this.rectangle.scale.setTo(1, 0.8);
        _this.rectangle.name = '21';
        _this.space2Boxes.addChild(_this.rectangle);
        console.log(_this.space2Boxes.length, "_this.space2Boxes group length");
        _this.rectangleGreenY += 80;
    },

    mS1: function () {
        _this.clickSound.play();
        if (_this.space3Boxes.length > 17) {
            return;
        }
        if (_this.space3Boxes.length == 9) {
            _this.ssquareGreenX++;
            _this.ssquareGreenY = 0;
            // _this.ssquareGreenFlag = 0;
        }

        // _this.ssquareGreenFlag += 1;
        _this.ssquare = _this.add.sprite(_this.ssquareGreenXArray[_this.ssquareGreenX], _this.ssquareGreenYArray[_this.ssquareGreenY], 'green_3');
        _this.ssquare.name = '31';
        _this.space3Boxes.addChild(_this.ssquare);
        console.log(_this.space3Boxes.length, "_this.space3Boxes group length");
        _this.ssquareGreenY++;

    },

    m2S2: function () {
        _this.clickSound.play();
        if (_this.space4Boxes.length > 5) {
            return;
        }
        if (_this.space4Boxes.length == 3) {
            _this.squarePinkX += 70;
            _this.squarePinkY = 220;

        }
        _this.square2 = _this.add.sprite(_this.squarePinkX, _this.squarePinkY, 'pink_1');
        _this.square2.scale.setTo(0.8, 0.8);
        _this.square2.name = '12';
        _this.space4Boxes.addChild(_this.square2);
        console.log(_this.space4Boxes.length, "_this.space4Boxes group length");
        _this.squarePinkY += 80;
        // _this.space7Boxes.add(_this.space4Boxes);
    },

    mR2: function () {
        _this.clickSound.play();
        if (_this.space5Boxes.length > 8) {
            return;
        }
        if (_this.space5Boxes.length == 3) {
            _this.rectanglePinkX += 30;
            _this.rectanglePinkY = 220;
        }

        if (_this.space5Boxes.length == 6) {
            _this.rectanglePinkX += 30;
            _this.rectanglePinkY = 220;
        }

        _this.rectangle2 = _this.add.sprite(_this.rectanglePinkX, _this.rectanglePinkY, 'pink_2');
        _this.rectangle2.scale.setTo(1, 0.8);
        _this.rectangle2.name = '22';
        _this.space5Boxes.addChild(_this.rectangle2);
        console.log(_this.space5Boxes.length, "_this.space5Boxes group length");
        _this.rectanglePinkY += 80;
    },

    mS2: function () {
        _this.clickSound.play();
        if (_this.space6Boxes.length > 17) {
            return;
        }

        if (_this.space6Boxes.length == 9) {
            _this.ssquarePinkX++;
            _this.ssquarePinkY = 0;
            // _this.ssquareGreenFlag = 0;
        }

        // _this.ssquareGreenFlag += 1;
        _this.ssquare2 = _this.add.sprite(_this.ssquarePinkXArray[_this.ssquarePinkX], _this.ssquarePinkYArray[_this.ssquarePinkY], 'pink_3');
        _this.ssquare2.name = '32';
        _this.space6Boxes.addChild(_this.ssquare2);
        console.log(_this.space6Boxes.length, "_this.space6Boxes group length");
        _this.ssquarePinkY++;
    },

    eraserUpdate: function (target) {
        _this.world.bringToTop(_this.eraser)
        _this.eraser.scale.setTo(0.8)
    },

    eraserDrop1: function (target) {
        console.log("eraserDrop1")
        if (_this.checkOverlap(target, _this.space1Boxes)) {
            console.log("sayhiiii")
            _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).destroy();
            console.log(_this.space1Boxes.length, "_this.space1Boxes group length***************");
            _this.squareGreenY -= 80;
            if (_this.space1Boxes.length == 3) {
                _this.squareGreenX -= 70;
                _this.squareGreenY = 220;
            }
            if (_this.space1Boxes.length == 0) {
                _this.squareGreenX = 410;
                _this.squareGreenY = 220;
            }
            if (_this.space1Boxes.length == 2) {
                _this.squareGreenY = 380;
                _this.squareGreenX = 410;
            }
        }

        else if (_this.checkOverlap(target, _this.space4Boxes)) {
            console.log("sayhiiii")
            _this.space4Boxes.getChildAt(_this.space4Boxes.length - 1).destroy();
            console.log(_this.space4Boxes.length, "_this.space1Boxes group length***************");
            _this.squarePinkY -= 80;
            if (_this.space4Boxes.length == 3) {
                _this.squarePinkX -= 70;
                _this.squarePinkY = 220;
            }
            if (_this.space4Boxes.length == 0) {
                _this.squarePinkX = 270;
                _this.squarePinkY = 220;
            }
            if (_this.space4Boxes.length == 2) {
                _this.squarePinkY = 380;
                _this.squarePinkX = 270;
            }
        }



        if (_this.space1Boxes.length == 0 || _this.space4Boxes.length == 0) {
            _this.eraser.destroy();
            _this.eraser = _this.add.sprite(800, 70, 'eraser');
            _this.eraser.inputEnabled = true;
            _this.eraser.input.enableDrag(true);
            _this.eraser.events.onDragUpdate.add(_this.eraserUpdate, _this);
            _this.eraser.events.onDragStop.add(_this.eraserDrop1, _this);
            return;
        }
        _this.eraser.destroy();
        _this.eraser = _this.add.sprite(800, 70, 'eraser');
        _this.eraser.inputEnabled = true;
        _this.eraser.input.enableDrag(true);
        _this.eraser.events.onDragUpdate.add(_this.eraserUpdate, _this);
        _this.eraser.events.onDragStop.add(_this.eraserDrop1, _this);
    },
    eraserDrop2: function (target) {
        console.log("eraserDrop2")

        //green second
        if (_this.checkOverlap(target, _this.space2Boxes)) {
            console.log("sayhiiii")
            _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).destroy();
            console.log(_this.space2Boxes.length, "_this.space2Boxes group length***************");
            _this.rectangleGreenY -= 80;
            if (_this.space2Boxes.length == 3) {
                _this.rectangleGreenX -= 30;
                _this.rectangleGreenY = 220;
            }
            if (_this.space2Boxes.length == 6) {
                _this.rectangleGreenX -= 30;
                _this.rectangleGreenY = 220;
            }
            if (_this.space2Boxes.length == 0) {
                _this.rectangleGreenX = 650;
                _this.rectangleGreenY = 220;
            }
            if (_this.space2Boxes.length == 1) {
                _this.rectangleGreenX = 650;
                _this.rectangleGreenY = 300;
            }
            if (_this.space2Boxes.length == 2) {
                _this.rectangleGreenX = 650;
                _this.rectangleGreenY = 380;
            }
            if (_this.space2Boxes.length == 5) {
                _this.rectangleGreenX = 680;
                _this.rectangleGreenY = 380;
            }
        }
        //green second
        else if (_this.checkOverlap(target, _this.space5Boxes)) {
            console.log("sayhiiii")
            _this.space5Boxes.getChildAt(_this.space5Boxes.length - 1).destroy();
            console.log(_this.space5Boxes.length, "_this.space5Boxes group length***************");
            _this.rectanglePinkY -= 80;
            if (_this.space5Boxes.length == 3) {
                _this.rectanglePinkX -= 30;
                _this.rectanglePinkY = 220;
            }
            if (_this.space5Boxes.length == 6) {
                _this.rectanglePinkX -= 30;
                _this.rectanglePinkY = 220;
            }
            if (_this.space5Boxes.length == 0) {
                _this.rectanglePinkX = 560;
                _this.rectanglePinkY = 220;
            }
            if (_this.space5Boxes.length == 1) {
                _this.rectanglePinkX = 560;
                _this.rectanglePinkY = 300;
            }
            if (_this.space5Boxes.length == 2) {
                _this.rectanglePinkX = 560;
                _this.rectanglePinkY = 380;
            }
            if (_this.space5Boxes.length == 5) {
                _this.rectanglePinkX = 590;
                _this.rectanglePinkY = 380;
            }
        }

        if (_this.space2Boxes.length == 0 || _this.space5Boxes.length == 0) {
            _this.eraser.destroy();
            _this.eraser = _this.add.sprite(800, 70, 'eraser');
            _this.eraser.inputEnabled = true;
            _this.eraser.input.enableDrag(true);
            _this.eraser.events.onDragUpdate.add(_this.eraserUpdate, _this);
            _this.eraser.events.onDragStop.add(_this.eraserDrop2, _this);
            return;
        }

        _this.eraser.destroy();
        _this.eraser = _this.add.sprite(800, 70, 'eraser');
        _this.eraser.inputEnabled = true;
        _this.eraser.input.enableDrag(true);
        _this.eraser.events.onDragUpdate.add(_this.eraserUpdate, _this);
        _this.eraser.events.onDragStop.add(_this.eraserDrop2, _this);
    },

    eraserDrop3: function (target) {
        console.log("eraserDrop3")

        if (_this.checkOverlap(target, _this.space3Boxes)) {
            console.log("sayhiiii")
            _this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).destroy();
            console.log(_this.space3Boxes.length, "_this.space3Boxes group length***************");
            _this.ssquareGreenY--;
            // _this.ssquareGreenFlag--;

            if (_this.space3Boxes.length == 9) {
                _this.ssquareGreenX--;
                _this.ssquareGreenY = 0;
                // _this.ssquareGreenFlag = 9;
            }
            if (_this.space3Boxes.length <= 8) {
                _this.ssquareGreenX = 0;
                _this.ssquareGreenY = _this.space3Boxes.length;
            }

        }
        else if (_this.checkOverlap(target, _this.space6Boxes)) {
            console.log("sayhiiii")
            _this.space6Boxes.getChildAt(_this.space6Boxes.length - 1).destroy();
            console.log(_this.space6Boxes.length, "_this.space6Boxes group length***************");
            _this.ssquarePinkY--;
            // _this.ssquareGreenFlag--;

            if (_this.space6Boxes.length == 9) {
                _this.ssquarePinkX--;
                _this.ssquarePinkY = 0;
                // _this.ssquareGreenFlag = 9;
            }
            if (_this.space6Boxes.length <= 8) {
                _this.ssquarePinkX = 0;
                _this.ssquarePinkY = _this.space6Boxes.length;
            }

        }

        if (_this.space3Boxes.length == 0 || _this.space6Boxes.length == 0) {
            _this.eraser.destroy();
            _this.eraser = _this.add.sprite(800, 70, 'eraser');
            _this.eraser.inputEnabled = true;
            _this.eraser.input.enableDrag(true);
            _this.eraser.events.onDragUpdate.add(_this.eraserUpdate, _this);
            _this.eraser.events.onDragStop.add(_this.eraserDrop3, _this);
            return;
        }

        _this.eraser.destroy();
        _this.eraser = _this.add.sprite(800, 70, 'eraser');
        _this.eraser.inputEnabled = true;
        _this.eraser.input.enableDrag(true);
        _this.eraser.events.onDragUpdate.add(_this.eraserUpdate, _this);
        _this.eraser.events.onDragStop.add(_this.eraserDrop3, _this);
    },

    rightbtnClicked: function () {
        console.log("rightbtnClicked")
        _this.clickSound.play();
        _this.rightbtn.inputEnabled = false;
        _this.rightbtn.input.useHandCursor = false;
        _this.rightbtn_is_Clicked = true;
        //Evaluating negative numbers.
        if (_this.finalval1.length == 0 && _this.mSquare1 + _this.mSquare2 != 1 && _this.mSquare1 + _this.mSquare2 != -1) {
            //edited for baseurl apk
            _this.noofAttempts++;

            _this.wrongSound.play();
            _this.disableInputs1();
            _this.disableInputs2();
            _this.disableInputs3();
            _this.AnswerBox1.frame = 1;
            _this.AnswerBox2.frame = 0;
            _this.AnswerBox3.frame = 0;
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked1, _this);
            for (let i = 1; i <= 12; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked1, _this);
            }
            _this.rightbtn.inputEnabled = true;
            _this.rightbtn.input.useHandCursor = true;
            return;
        }
        if (_this.finalval2.length == 0 && _this.mLinear1 + _this.mLinear2 + _this.mLinear3 != 1 && _this.mLinear1 + _this.mLinear2 + _this.mLinear3 != -1) {
            //edited for baseurl apk
            _this.noofAttempts++;

            _this.wrongSound.play();
            _this.disableInputs1();
            _this.disableInputs2();
            _this.disableInputs3();
            _this.AnswerBox1.frame = 1;
            _this.AnswerBox2.frame = 0;
            _this.AnswerBox3.frame = 0;
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked1, _this);
            for (let i = 1; i <= 12; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked1, _this);
            }
            _this.rightbtn.inputEnabled = true;
            _this.rightbtn.input.useHandCursor = true;
            return;
        }
        if (_this.finalval3.length == 0) {
            //edited for baseurl apk
            _this.noofAttempts++;

            _this.wrongSound.play();
            _this.disableInputs1();
            _this.disableInputs2();
            _this.disableInputs3();
            _this.AnswerBox1.frame = 1;
            _this.AnswerBox2.frame = 0;
            _this.AnswerBox3.frame = 0;
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked1, _this);
            for (let i = 1; i <= 12; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked1, _this);
            }
            _this.rightbtn.inputEnabled = true;
            _this.rightbtn.input.useHandCursor = true;
            return;
        }
        if (Number(_this.signVal1 + _this.finalval1) == 0 && (_this.signVal1 == '-' || _this.signVal1 == '+')) {
            //edited for baseurl apk
            _this.noofAttempts++;

            _this.wrongSound.play();
            _this.disableInputs1();
            _this.disableInputs2();
            _this.disableInputs3();
            _this.AnswerBox1.frame = 1;
            _this.AnswerBox2.frame = 0;
            _this.AnswerBox3.frame = 0;
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked1, _this);
            for (let i = 1; i <= 12; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked1, _this);
            }
            _this.rightbtn.inputEnabled = true;
            _this.rightbtn.input.useHandCursor = true;
            return;
        }
        if (Number(_this.signVal2 + _this.finalval2) == 0 && (_this.signVal2 == '-' || _this.signVal2 == '+')) {
            //edited for baseurl apk
            _this.noofAttempts++;

            _this.wrongSound.play();
            _this.disableInputs1();
            _this.disableInputs2();
            _this.disableInputs3();
            _this.AnswerBox1.frame = 1;
            _this.AnswerBox2.frame = 0;
            _this.AnswerBox3.frame = 0;
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked1, _this);
            for (let i = 1; i <= 12; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked1, _this);
            }
            _this.rightbtn.inputEnabled = true;
            _this.rightbtn.input.useHandCursor = true;
            return;
        }
        if (Number(_this.signVal3 + _this.finalval3) == 0 && (_this.signVal3 == '-' || _this.signVal3 == '+')) {
            //edited for baseurl apk
            _this.noofAttempts++;

            _this.wrongSound.play();
            _this.disableInputs1();
            _this.disableInputs2();
            _this.disableInputs3();
            _this.AnswerBox1.frame = 1;
            _this.AnswerBox2.frame = 0;
            _this.AnswerBox3.frame = 0;
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked1, _this);
            for (let i = 1; i <= 12; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked1, _this);
            }
            _this.rightbtn.inputEnabled = true;
            _this.rightbtn.input.useHandCursor = true;
            return;
        }
        if (!(_this.signVal1 == '-' && _this.finalval1.length == 0 && _this.mSquare1 + _this.mSquare2 == -1 || _this.signVal1.length == 0 && _this.finalval1.length == 0 && _this.mSquare1 + _this.mSquare2 == 1 || Number(_this.signVal1 + _this.finalval1) == _this.mSquare1 + _this.mSquare2)) {
            //edited for baseurl apk
            _this.noofAttempts++;

            _this.wrongSound.play();
            _this.disableInputs1();
            _this.disableInputs2();
            _this.disableInputs3();
            _this.AnswerBox1.frame = 1;
            _this.AnswerBox2.frame = 0;
            _this.AnswerBox3.frame = 0;
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked1, _this);
            for (let i = 1; i <= 12; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked1, _this);
            }
            _this.rightbtn.inputEnabled = true;
            _this.rightbtn.input.useHandCursor = true;
            return;
        }
        if (!(_this.signVal2 == '-' && _this.finalval2.length == 0 && _this.mLinear1 + _this.mLinear2 + _this.mLinear3 == -1 || _this.signVal2.length == 0 && _this.finalval2.length == 0 && _this.mLinear1 + _this.mLinear2 + _this.mLinear3 == 1 || Number(_this.signVal2 + _this.finalval2) == _this.mLinear1 + _this.mLinear2 + _this.mLinear3)) {
            //edited for baseurl apk
            _this.noofAttempts++;

            _this.wrongSound.play();
            _this.disableInputs1();
            _this.disableInputs2();
            _this.disableInputs3();
            _this.AnswerBox1.frame = 1;
            _this.AnswerBox2.frame = 0;
            _this.AnswerBox3.frame = 0;
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked1, _this);
            for (let i = 1; i <= 12; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked1, _this);
            }
            _this.rightbtn.inputEnabled = true;
            _this.rightbtn.input.useHandCursor = true;
            return;
        }
        if (!(Number(_this.signVal3 + _this.finalval3) == _this.mConstant1 + _this.mConstant2 + _this.mConstant3)) {
            //edited for baseurl apk
            _this.noofAttempts++;

            _this.wrongSound.play();
            _this.disableInputs1();
            _this.disableInputs2();
            _this.disableInputs3();
            _this.AnswerBox1.frame = 1;
            _this.AnswerBox2.frame = 0;
            _this.AnswerBox3.frame = 0;
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked1, _this);
            for (let i = 1; i <= 12; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked1, _this);
            }
            _this.rightbtn.inputEnabled = true;
            _this.rightbtn.input.useHandCursor = true;
            return;
        }

        _this.rightbtn.inputEnabled = true;
        _this.rightbtn.input.useHandCursor = true;

        //edited for baseurl apk
        _this.noofAttempts++;
        telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);
        //..............

        console.log(_this.noofAttempts, "_this.noofAttempts.................");
        console.log(_this.AnsTimerCount, "_this.AnsTimerCount.................");
        console.log(_this.sceneCount, "_this.sceneCount.................");
        console.log(_this.questionid, "_this.questionid.................");

        _this.celebrationSound.play();
        _this.starActions();
        _this.time.events.add(4000, () => {
            _this.clearAll();
            if (_this.numberOfQuestions == 6) {
                //_this.state.start('AL_SIM_G7Score');
                console.log("score");
                // _this.time.events.add(2500, () => {
                    _this.state.start('score', true, false,gameID, _this.microConcepts);
                    //})
            }
            else {
                _this.Initial_randomizing();
                _this.EquationGenerating();
            }
        });

    },

    //Displaying the clicked number.
    numClicked1: function (target) {
        _this.clickSound.play();
        var_selectedAns11 = " "
        var_selectedAns21 = " "
        var_selectedAns31 = " "
        if (target.name == 10) {
            target.name = '-'
            _this.signNotselected1 = true;
        }
        if (target.name == 11) {
            target.name = '+';
            _this.signNotselected1 = true;
        }

        if (_this.selectedAns11 === '') {
            _this.selectedAns11 = target.name;
            var_selectedAns11 = _this.selectedAns11;
        }
        else if (_this.selectedAns21 === '') {
            _this.selectedAns21 = target.name;
            var_selectedAns11 = _this.selectedAns11;
            var_selectedAns21 = _this.selectedAns21;
        }
        else if (_this.selectedAns31 === '') {
            _this.selectedAns31 = target.name;
            var_selectedAns11 = _this.selectedAns11;
            var_selectedAns21 = _this.selectedAns21;
            var_selectedAns31 = _this.selectedAns31;
        }

        if (target.name == '+' || target.name == '-') {
            newstr = target.name + _this.finalval1;
            _this.signVal1 = target.name;
        }
        else if (_this.fourNotEntered1 == false) {
            _this.finalval1 += target.name;
        }

        if (target.name == '+')
            target.name = 11;
        if (target.name == '-')
            target.name = 10;

        if (_this.fourNotEntered1 == false || (target.name == 11 || target.name == 10)) {
            _this.AnswerBox1.removeChild(_this.enterTxt1);
            _this.enterTxt1.visible = false;
            _this.enterTxt1 = _this.add.text(15, 8, "" + _this.signVal1 + _this.finalval1, { fontSize: '20px' });

            if (_this.signVal1 == '+' || _this.signVal1 == '-') {
                if (_this.finalval1.length == 2) {
                    _this.enterTxt1.x -= 3;
                }
                else if (_this.finalval1.length == 1) {
                    _this.enterTxt1.x += 3;
                }
                else {
                    _this.enterTxt1.x += 8;
                }
            }
            else {
                if (_this.finalval1.length == 2) {
                    _this.enterTxt1.x += 3;
                }
                else if (_this.finalval1.length == 1) {
                    _this.enterTxt1.x += 10;
                }
            }
            if (_this.finalval1.length == 2 && (target.name != 11 || target.name != 10)) {
                _this.fourNotEntered1 = true;
            }
            else if (_this.finalval1.length == 3) {
                _this.fourNotEntered1 = true;
            }
            _this.enterTxt1.scale.setTo(1, 1.1)
            _this.applyingStyle(_this.enterTxt1);
            _this.AnswerBox1.addChild(_this.enterTxt1);
            _this.AnswerBox1.name = Number(_this.signVal1 + _this.finalval1);
            _this.enterTxt1.visible = true;
        }
    },
    numClicked2: function (target) {
        _this.clickSound.play();
        var_selectedAns12 = " "
        var_selectedAns22 = " "
        var_selectedAns32 = " "
        if (target.name == 10) {
            target.name = '-'
            _this.signNotselected2 = true;
        }
        if (target.name == 11) {
            target.name = '+';
            _this.signNotselected2 = true;
        }

        if (_this.selectedAns12 === '') {
            _this.selectedAns12 = target.name;
            var_selectedAns12 = _this.selectedAns12;
        }
        else if (_this.selectedAns22 === '') {
            _this.selectedAns22 = target.name;
            var_selectedAns12 = _this.selectedAns12;
            var_selectedAns22 = _this.selectedAns22;
        }
        else if (_this.selectedAns32 === '') {
            _this.selectedAns32 = target.name;
            var_selectedAns12 = _this.selectedAns12;
            var_selectedAns22 = _this.selectedAns22;
            var_selectedAns32 = _this.selectedAns32;
        }

        if (target.name == '+' || target.name == '-') {
            newstr = target.name + _this.finalval2;
            _this.signVal2 = target.name;
        }
        else if (_this.fourNotEntered2 == false) {
            _this.finalval2 += target.name;
        }

        if (target.name == '+')
            target.name = 11;
        if (target.name == '-')
            target.name = 10;

        if (_this.fourNotEntered2 == false || (target.name == 11 || target.name == 10)) {
            _this.AnswerBox2.removeChild(_this.enterTxt2);
            _this.enterTxt2.visible = false;
            _this.enterTxt2 = _this.add.text(15, 8, "" + _this.signVal2 + _this.finalval2, { fontSize: '20px' });

            if (_this.signVal2 == '+' || _this.signVal2 == '-') {
                if (_this.finalval2.length == 2) {
                    _this.enterTxt2.x -= 3;
                }
                else if (_this.finalval2.length == 1) {
                    _this.enterTxt2.x += 3;
                }
                else {
                    _this.enterTxt2.x += 8;
                }
            }
            else {
                if (_this.finalval2.length == 2) {
                    _this.enterTxt2.x += 3;
                }
                else if (_this.finalval2.length == 1) {
                    _this.enterTxt2.x += 10;
                }
            }
            if (_this.finalval2.length == 2 && (target.name != 11 || target.name != 10)) {
                _this.fourNotEntered2 = true;
            }
            else if (_this.finalval2.length == 3) {
                _this.fourNotEntered2 = true;
            }
            _this.enterTxt2.scale.setTo(1, 1.1)
            _this.applyingStyle(_this.enterTxt2);
            _this.AnswerBox2.addChild(_this.enterTxt2);
            _this.AnswerBox2.name = Number(_this.signVal2 + _this.finalval2);
            _this.enterTxt2.visible = true;
        }
    },
    numClicked3: function (target) {
        _this.clickSound.play();
        var_selectedAns13 = " "
        var_selectedAns23 = " "
        var_selectedAns33 = " "
        if (target.name == 10) {
            target.name = '-'
            _this.signNotselected3 = true;
        }
        if (target.name == 11) {
            target.name = '+';
            _this.signNotselected3 = true;
        }

        if (_this.selectedAns13 === '') {
            _this.selectedAns13 = target.name;
            var_selectedAns13 = _this.selectedAns13;
        }
        else if (_this.selectedAns23 === '') {
            _this.selectedAns23 = target.name;
            var_selectedAns13 = _this.selectedAns13;
            var_selectedAns23 = _this.selectedAns23;
        }
        else if (_this.selectedAns33 === '') {
            _this.selectedAns33 = target.name;
            var_selectedAns13 = _this.selectedAns13;
            var_selectedAns23 = _this.selectedAns23;
            var_selectedAns33 = _this.selectedAns33;
        }

        if (target.name == '+' || target.name == '-') {
            newstr = target.name + _this.finalval3;
            _this.signVal3 = target.name;
        }
        else if (_this.fourNotEntered3 == false) {
            _this.finalval3 += target.name;
        }

        if (target.name == '+')
            target.name = 11;
        if (target.name == '-')
            target.name = 10;

        if (_this.fourNotEntered3 == false || (target.name == 11 || target.name == 10)) {
            _this.AnswerBox3.removeChild(_this.enterTxt3);
            _this.enterTxt3.visible = false;
            _this.enterTxt3 = _this.add.text(15, 8, "" + _this.signVal3 + _this.finalval3, { fontSize: '20px' });

            if (_this.signVal3 == '+' || _this.signVal3 == '-') {
                if (_this.finalval3.length == 2) {
                    _this.enterTxt3.x -= 3;
                }
                else if (_this.finalval3.length == 1) {
                    _this.enterTxt3.x += 3;
                }
                else {
                    _this.enterTxt3.x += 8;
                }
            }
            else {
                if (_this.finalval3.length == 2) {
                    _this.enterTxt3.x += 3;
                }
                else if (_this.finalval3.length == 1) {
                    _this.enterTxt3.x += 10;
                }
            }
            if (_this.finalval3.length == 2 && (target.name != 11 || target.name != 10)) {
                _this.fourNotEntered3 = true;
            }
            else if (_this.finalval3.length == 3) {
                _this.fourNotEntered3 = true;
            }
            _this.enterTxt3.scale.setTo(1, 1.1)
            _this.applyingStyle(_this.enterTxt3);
            _this.AnswerBox3.addChild(_this.enterTxt3);
            _this.AnswerBox3.name = Number(_this.signVal3 + _this.finalval3);
            _this.enterTxt3.visible = true;
        }
    },
    //for clearing the answer box.
    wrongbtnClicked1: function (target) {
        _this.clickSound.play();
        _this.disableInputs1();
    },
    wrongbtnClicked2: function (target) {
        _this.clickSound.play();
        _this.disableInputs2();
    },
    wrongbtnClicked3: function (target) {
        _this.clickSound.play();
        _this.disableInputs3();
    },
    //for clearing the answer box.
    disableInputs1: function () {
        _this.AnswerBox1.removeChild(_this.enterTxt1);
        _this.selectedAns11 = '';
        _this.selectedAns21 = '';
        _this.selectedAns31 = '';
        _this.AnswerBox1.name = '';
        _this.fourNotEntered1 = false;
        _this.signNotselected1 = false
        _this.finalval1 = '';
        _this.signVal1 = '';
    },
    //for clearing the answer box.
    disableInputs2: function () {
        _this.AnswerBox2.removeChild(_this.enterTxt2);
        _this.selectedAns12 = '';
        _this.selectedAns22 = '';
        _this.selectedAns32 = '';
        _this.AnswerBox2.name = '';
        _this.fourNotEntered2 = false;
        _this.signNotselected2 = false
        _this.finalval2 = '';
        _this.signVal2 = '';
    },
    //for clearing the answer box.
    disableInputs3: function () {
        _this.AnswerBox3.removeChild(_this.enterTxt3);
        _this.selectedAns13 = '';
        _this.selectedAns23 = '';
        _this.selectedAns33 = '';
        _this.AnswerBox3.name = '';
        _this.fourNotEntered3 = false;
        _this.signNotselected3 = false
        _this.finalval3 = '';
        _this.signVal3 = '';
    },

    //Adding the numberpad.
    addNumberPad: function () {
        _this.objGroup = _this.add.group();
        _this.numGroup = _this.add.group();

        _this.AnswerBox1.removeChild(_this.enterTxt1);
        _this.AnswerBox2.removeChild(_this.enterTxt2);
        _this.AnswerBox3.removeChild(_this.enterTxt3);

        _this.selectedAns11 = '';
        _this.selectedAns21 = '';
        _this.selectedAns31 = '';

        _this.selectedAns12 = '';
        _this.selectedAns22 = '';
        _this.selectedAns32 = '';

        _this.selectedAns13 = '';
        _this.selectedAns23 = '';
        _this.selectedAns33 = '';

        _this.AnswerBox1.name = '';
        _this.AnswerBox2.name = '';
        _this.AnswerBox3.name = '';

        _this.fourNotEntered1 = false;
        _this.fourNotEntered2 = false;
        _this.fourNotEntered3 = false;

        _this.signNotselected1 = false;
        _this.signNotselected2 = false;
        _this.signNotselected3 = false;

        _this.finalval1 = '';
        _this.signVal1 = '';
        _this.finalval2 = '';
        _this.signVal2 = '';
        _this.finalval3 = '';
        _this.signVal3 = '';

        var bottomnumpadbg = _this.numGroup.create(0, 515, 'numpadbg');
        bottomnumpadbg.scale.setTo(1, 1);
        _this.x = 40;
        // set the number pad invisible initially. only after tweening it is made visible
        _this.numGroup.visible = false;
        for (var i = 0; i < 12; i++) {
            _this.numbg = _this.numGroup.create(_this.x, 552, 'Numberpad');
            _this.numbg.anchor.setTo(0.5);
            _this.numbg.scale.setTo(0.8);
            _this.numbg.name = i;
            _this.numbg.frame = i;

            _this.numbg.inputEnabled = true;
            _this.numbg.input.useHandCursor = true;
            _this.numbg.events.onInputDown.add(_this.numClicked1, _this);

            _this.x += 65;
        }

        _this.wrongbtn = _this.numGroup.create(_this.x + 10, 552, 'Numberpad');
        _this.wrongbtn.frame = 12;
        _this.wrongbtn.anchor.setTo(0.5);
        _this.wrongbtn.scale.setTo(0.8);
        _this.wrongbtn.name = "wrongbtn";
        _this.wrongbtn.inputEnabled = true;
        _this.wrongbtn.input.useHandCursor = true;
        _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked1, _this);

        _this.rightbtn = _this.numGroup.create(_this.x + 80, 552, 'Numberpad');
        _this.rightbtn.frame = 13;
        _this.rightbtn.anchor.setTo(0.5);
        _this.rightbtn.scale.setTo(0.8);
        _this.rightbtn.name = "rightbtn";
        _this.rightbtn.inputEnabled = true;
        _this.rightbtn.input.useHandCursor = true;
        _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked, _this);

        _this.enterTxt1 = '';
        _this.enterTxt2 = '';
        _this.enterTxt3 = '';

        _this.numpadTween = _this.add.tween(_this.numGroup);
        _this.tweenNumPad();
    },

    //Tween  the numberpad.
    tweenNumPad: function () {
        _this.numGroup.visible = true;
        _this.numpadTween.to({ x: 0, y: -43 }, 1000, 'Linear', true, 0);
    },


    clearAll: function () {
        console.log("ClearAll");

        _this.space1Boxes.destroy();
        _this.space2Boxes.destroy();
        _this.space3Boxes.destroy();
        _this.space4Boxes.destroy();
        _this.space5Boxes.destroy();
        _this.space6Boxes.destroy();

        _this.space1.destroy();
        // _this.workspace.destroy();
        _this.numGroup.destroy();

        _this.textBox.destroy();

        _this.AnswerBox1.destroy();
        _this.AnswerBox2.destroy();
        _this.AnswerBox3.destroy();

        _this.sideGray.destroy();

        _this.boxes1.destroy();
        _this.boxes2.destroy();
        _this.boxes3.destroy();

        _this.symbol_1.destroy();
        _this.symbol_2.destroy();
        _this.symbol_3.destroy();

        _this.yellowBox.destroy();
        _this.yellowBox2.destroy();
        _this.yellowBox3.destroy();
        _this.yellowBox4.destroy();
        _this.yellowBox5.destroy();
        _this.yellowBox6.destroy();
        if (_this.order1[0] == 8) {
            _this.yellowBox7.destroy();
            _this.yellowBox8.destroy();
        }
        if (_this.order1[0] == 7) {
            _this.yellowBox7.destroy();
        }

        _this.Question_flag = 0;
    },




    applyingStyle: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.visible = true;
    },
    applyingStyle1: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '20px';
    },
    checkOverlap: function (spriteA, spriteB) {
        _this.boundsA = spriteA.getBounds();
        _this.boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(_this.boundsA, _this.boundsB);
    },


    starActions: function (target) {
        //edited for baseurl apk
        _this.AnsTimerCount = 0;
        _this.microConcepts = "AlgebraG7";
        console.log("starActions")
        starAnim = _this.starsGroup.getChildAt(_this.numberOfQuestions);
        starAnim.smoothed = false;
        anim = starAnim.animations.add('star');
        _this.numberOfQuestions++;
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
        _this.demoAudio1src = document.createElement('source');//AL-SIM-G7 (5)\questionSounds\AL-SIM-G7
        _this.demoAudio1src.setAttribute("src", window.baseUrl + "questionSounds/AL-SIM-G7/" + _this.languageSelected + "/AL_SIM_G7_d1.mp3");
        _this.demoAudio1.appendChild(_this.demoAudio1src);

        // QUESTION AUDIOS
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/AL-SIM-G7/" +
            _this.languageSelected + "/AL_SIM_G7_a1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        _this.q2Sound = document.createElement('audio');
        _this.q2Soundsrc = document.createElement('source');
        _this.q2Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/AL-SIM-G7/" +
            _this.languageSelected + "/AL_SIM_G7_a2.mp3");
        _this.q2Sound.appendChild(_this.q2Soundsrc);

        _this.q3Sound = document.createElement('audio');
        _this.q3Soundsrc = document.createElement('source');
        _this.q3Soundsrc.setAttribute("src",  window.baseUrl +"questionSounds/AL-SIM-G7/" +
            _this.languageSelected + "/AL_SIM_G7_a3.mp3");
        _this.q3Sound.appendChild(_this.q3Soundsrc);


        _this.video_playing = 0;
        _this.showDemoVideo();  //* call the function to show the video


        _this.skip = _this.add.image(870, 390, 'skipArrow');       //* skip button shown at the bottom
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

        if (_this.demoAudio1Timer) clearTimeout(_this.demoAudio1Timer);
        if (_this.demoVideo1PauseTimer) clearTimeout(_this.demoVideo1PauseTimer);
        if (_this.q1Timer) clearTimeout(_this.q1Timer);
        if (_this.demoAudio2Timer) clearTimeout(_this.demoAudio2Timer);
        if (_this.q2Timer) clearTimeout(_this.q2Timer);

        if (_this.demoAudio1) {
            //// console.log("removing the demo audio1");
            _this.demoAudio1.pause();
            _this.demoAudio1 = null;
            _this.demoAudio1src = null;
        }

        if (_this.q1Sound) {
            //// console.log("removing the q1");
            _this.q1Sound.pause();
            _this.q1Sound = null;
            _this.q1Soundsrc = null;
        }

        if (_this.q2Sound) {
            //// console.log("removing the q2");
            _this.q2Sound.pause();
            _this.q2Sound = null;
            _this.q2Soundsrc = null;
        }

        if (_this.q3Sound) {
            //// console.log("removing the q3");
            _this.q3Sound.pause();
            _this.q3Sound = null;
            _this.q3Soundsrc = null;
        }

        _this.skip.events.onInputDown.removeAll();
        _this.skip.destroy();                //* skip button destroyed

    },

    q1S: function () {
        _this.q2Sound.play();
    },

    showDemoVideo: function () {

        _this.demoVideo_1 = _this.add.video('AL-SIM-G7');
        _this.demoVideo_1.play(false);
        _this.demoVideo_1.changeSource(window.baseUrl + "assets/demoVideos/AL-SIM-G7.mp4");
        _this.video_playing = 1;
        _this.videoWorld_1 = _this.demoVideo_1.addToWorld();

        _this.q1Sound.play();
        _this.q1Sound.addEventListener('ended', _this.q1S);
        // //* play the demo audio1 after 4 sec delay
        _this.demoAudio1Timer = setTimeout(function ()    //* demoAudio1 js timer to play demoAudio1Timer after 4 seconds.
        {
            console.log("inside demoAudio1sound.....")
            clearTimeout(_this.demoAudio1Timer);         //* clear the time once its used.
            _this.demoAudio1.play();
        }, 34000);

        _this.q3Timer = setTimeout(function ()    //* q2 js timer to play q2 after 15 seconds.
        {
            console.log("inside q2sound.....")
            clearTimeout(_this.q3Timer);         //* clear the time once its used.
            _this.q3Sound.play();
        }, 43500);

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
    }
}