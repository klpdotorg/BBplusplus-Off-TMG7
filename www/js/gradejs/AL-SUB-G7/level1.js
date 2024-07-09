Game.AL_SUB_G7level1 = function () { };


Game.AL_SUB_G7level1.prototype =
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
        _this.celebrationSoundsrc.setAttribute("src",  window.baseUrl +"sounds/celebration.mp3");
        _this.celebrationSound.appendChild(_this.celebrationSoundsrc);

        _this.counterCelebrationSound = document.createElement('audio');
        _this.counterCelebrationSoundsrc = document.createElement('source');
        _this.counterCelebrationSoundsrc.setAttribute("src", window.baseUrl + "sounds/counter_celebration.mp3");
        _this.counterCelebrationSound.appendChild(_this.counterCelebrationSoundsrc);

        _this.wrongans = document.createElement('audio');
        _this.wronganssrc = document.createElement('source');
        _this.wronganssrc.setAttribute("src", window.baseUrl + "sounds/WrongCelebrationSound.mp3");
        _this.wrongans.appendChild(_this.wronganssrc);

        _this.wrongSound = document.createElement('audio');
        _this.wrongSoundsrc = document.createElement('source');
        _this.wrongSoundsrc.setAttribute("src", window.baseUrl + "sounds/WrongCelebrationSound.mp3");
        _this.wrongSound.appendChild(_this.wrongSoundsrc);

        _this.framechange = document.createElement('audio');
        _this.framechangesrc = document.createElement('source');
        _this.framechangesrc.setAttribute("src", window.baseUrl + "sounds/Frame_change_sound.mp3");
        _this.framechange.appendChild(_this.framechangesrc);


        _this.Ask_Question1 = _this.createAudio("AL_SUB_G7_a1");
        _this.Ask_Question2 = _this.createAudio("AL_SUB_G7_a2");

        //edited for baseurl apk
        telInitializer.gameIdInit("AL_SUB_G7", gradeSelected);// first Tele call
        console.log(gameID, "gameID...");
    },
    create: function (game) {
        _this.hintBtn = _this.add.sprite(670, 6, 'bulb');
        _this.hintBtn.scale.setTo(0.5, 0.6);
        _this.hintBtn.visible = false;
        //* show the demo video
        _this.time.events.add(100, function () {
            _this.ViewDemoVideo();
        });

        //* start the game with delay. Since the Demo video will pause the game, the timer will freeze
        //* and then start after the game is unpaused and continues to call the gameCreate function.
        _this.time.events.add(1500, function () {
            _this.gameCreate(game);
        });
    },
    ViewDemoVideo: function () {
        //* pause the game before going to the demovideo 
        _this.game.paused = true;
        _this.DemoVideo();
        //* at the end of demo video/skip pressed, it will unpause the game.
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

        _this.numberOfQuestions = 0;
        _this.speakerbtn;
        _this.background;
        _this.count = 0;
        _this.starsGroup;
        _this.AnswerBox;
        _this.seconds = 0;
        _this.minutes = 0;
        _this.Question_flag = 0;

        _this.counterForTimer = 0;

        _this.namesArray = [];

        _this.speakerbtnClicked = false;
        _this.rightbtn_Clicked = false;

        _this.background = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'BG1');
        //** include the background file, navigation bar, stars, timer objects.
        _this.navBar = _this.add.sprite(0, 0, 'navBar');

        _this.backbtn = _this.add.sprite(5, 6, 'backbtn');
        _this.backbtn.inputEnabled = true;
        _this.backbtn.input.useHandCursor = true;
        _this.backbtn.events.onInputDown.add(function () {
            // _this.state.start('AL_SUB_G7Score');
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
                _this.time.events.add(4000, function () {
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
            //console.log("inside hintbutton function");
            //* show the demo video
            _this.hintBtn.inputEnabled = false;
            _this.hintBtn.input.useHandCursor = false;
            _this.time.events.add(1, function () {
                //console.log(_this.hintBtn.inputEnabled, "status of hintBtn");
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
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/AL-SUB-G7/" + _this.languageSelected + "/" + src + ".mp3");
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

        _this.QuestionFormation();
        _this.AskingQuestion();

        if (_this.numberOfQuestions == 0) {
            _this.Ask_Question1.play();
        }

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

        if (_this.celebrationSound) {
            if (_this.celebrationSound.isPlaying) {
                _this.celebrationSound.stop();
                _this.celebrationSound = null;
            }
        }

    },
    //Creating the question.
    QuestionFormation: function () {
        //Probability of finding whether the two expressions have two or three terms.
        _this.term1 = Math.floor(Math.random() * 2);
        _this.term2 = Math.floor(Math.random() * 2);
        _this.order1 = [1, 2, 3];
        _this.shuffleArray(_this.order1);

        _this.variable = ['x', 'x', 'x'];//'m', 'n', 'x'
        _this.choice = Math.floor(Math.random() * 3);

        //Deciding the first expression
        if (_this.term1 == 0) {
            if (_this.order1[0] == 1) {
                _this.mSquare1 = 0;
                _this.mLinear1 = Math.floor(Math.random() * 8) + 1;
                _this.mConstant1 = Math.floor(Math.random() * ((12 - _this.mLinear1) > 5 ? 5 : (12 - _this.mLinear1)) * 3) + 1;
            }
            else if (_this.order1[0] == 2) {
                _this.mSquare1 = Math.floor(Math.random() * 5) + 1;
                _this.mLinear1 = 0;
                _this.mConstant1 = Math.floor(Math.random() * ((12 - 2 * _this.mSquare1) > 5 ? 5 : (12 - 2 * _this.mSquare1)) * 3) + 1;
            }
            else {
                _this.mSquare1 = Math.floor(Math.random() * 5) + 1;
                _this.mLinear1 = Math.floor(Math.random() * (10 - 2 * _this.mSquare1)) + 1;
                _this.mConstant1 = 0;
            }
        }
        else {
            _this.mSquare1 = Math.floor(Math.random() * 5) + 1;
            _this.mLinear1 = Math.floor(Math.random() * (10 - 2 * _this.mSquare1)) + 1;
            _this.mConstant1 = Math.floor(Math.random() * ((12 - _this.mLinear1 - 2 * _this.mSquare1) > 5 ? 5 : (12 - _this.mLinear1 - 2 * _this.mSquare1)) * 3) + 1;
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
        _this.order2 = [1, 2, 3];
        _this.shuffleArray(_this.order2);

        //Deciding the second expression
        if (_this.term2 == 0) {
            console.log("_this.term2 == 0");
            if (_this.order2[0] == 1) {
                _this.mSquare2 = 0;
                _this.mLinear2 = Math.floor(Math.random() * 8) + 1;
                _this.mConstant2 = Math.floor(Math.random() * ((12 - _this.mLinear2) > 5 ? 5 : (12 - _this.mLinear2)) * 3) + 1;
            }
            else if (_this.order2[0] == 2) {
                _this.mSquare2 = Math.floor(Math.random() * 5) + 1;
                _this.mLinear2 = 0;
                _this.mConstant2 = Math.floor(Math.random() * ((12 - 2 * _this.mSquare2) > 5 ? 5 : (12 - 2 * _this.mSquare2)) * 3) + 1;
            }
            else {
                _this.mSquare2 = Math.floor(Math.random() * 5) + 1;
                _this.mLinear2 = Math.floor(Math.random() * (10 - 2 * _this.mSquare2)) + 1;
                _this.mConstant2 = 0;
            }
        }
        else {
            _this.mSquare2 = Math.floor(Math.random() * 5) + 1;
            _this.mLinear2 = Math.floor(Math.random() * (10 - 2 * _this.mSquare2)) + 1;
            _this.mConstant2 = Math.floor(Math.random() * ((12 - _this.mLinear2 - 2 * _this.mSquare2) > 5 ? 5 : (12 - _this.mLinear2 - 2 * _this.mSquare2)) * 3) + 1;
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

        console.log(_this.order2, " _this.order2");
        console.log(_this.mSquare1, "_this.mSquare1");
        console.log(_this.mLinear1, "_this.mLinear1");
        console.log(_this.mConstant1, "_this.mConstant1");
        console.log(_this.mSquare2, "_this.mSquare2");
        console.log(_this.mLinear2, "_this.mLinear2");
        console.log(_this.mConstant2, "_this.mConstant2");

    },
    //Shuffling the array
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
    //this function is used for showing the question.
    AskingQuestion: function () {
        //edited for baseurl apk
        _this.sceneCount++;
        // _this.AnsTimerCount = 0;
        _this.noofAttempts = 0;
        //....

        console.log("AskingQuestion")
        _this.textBox = _this.add.sprite(140, 80, 'Text box_1');
        let string = "( ";
        _this.questionWithAnswer = '';
        _this.power = "\u{00B2}";

        //Forming the question string and adding to the text box. 
        if (_this.order1[0] == 1) {
            if (_this.mSquare1 == 1)
                string = string + _this.variable[_this.choice] + _this.power
            else if (_this.mSquare1 == -1)
                string = string + '-' + _this.variable[_this.choice] + _this.power
            else if (_this.mSquare1 != 0)
                string = string + String(_this.mSquare1) + _this.variable[_this.choice] + _this.power
        }
        else if (_this.order1[0] == 2) {
            if (_this.mLinear1 == 1)
                string = string + _this.variable[_this.choice]
            else if (_this.mLinear1 == -1)
                string = string + '-' + _this.variable[_this.choice]
            else if (_this.mLinear1 != 0)
                string = string + String(_this.mLinear1) + _this.variable[_this.choice]
        }
        else {
            if (_this.mConstant1 != 0)
                string = string + String(_this.mConstant1)
        }
        if (_this.term1 == 1) {
            if (_this.order1[1] == 1) {
                if (_this.mSquare1 == 1)
                    string = string + " + " + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare1 == -1)
                    string = string + " - " + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare1 > 0)
                    string = string + " + " + String(_this.mSquare1) + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare1 < 0)
                    string = string + " - " + String(-_this.mSquare1) + _this.variable[_this.choice] + _this.power
            }
            else if (_this.order1[1] == 2) {
                if (_this.mLinear1 == 1)
                    string = string + " + " + _this.variable[_this.choice]
                else if (_this.mLinear1 == -1)
                    string = string + " - " + _this.variable[_this.choice]
                else if (_this.mLinear1 > 0)
                    string = string + " + " + String(_this.mLinear1) + _this.variable[_this.choice]
                else if (_this.mLinear1 < 0)
                    string = string + " - " + String(-_this.mLinear1) + _this.variable[_this.choice]
            }
            else {
                if (_this.mConstant1 > 0)
                    string = string + " + " + String(_this.mConstant1)
                else if (_this.mConstant1 < 0)
                    string = string + " - " + String(-_this.mConstant1)
            }
            if (_this.order1[2] == 1) {
                if (_this.mSquare1 == 1)
                    string = string + " + " + _this.variable[_this.choice] + _this.power + " )"
                else if (_this.mSquare1 == -1)
                    string = string + " - " + _this.variable[_this.choice] + _this.power + " )"
                else if (_this.mSquare1 > 0)
                    string = string + " + " + String(_this.mSquare1) + _this.variable[_this.choice] + _this.power + " )"
                else if (_this.mSquare1 < 0)
                    string = string + " - " + String(-_this.mSquare1) + _this.variable[_this.choice] + _this.power + " )"
            }
            else if (_this.order1[2] == 2) {
                if (_this.mLinear1 == 1)
                    string = string + " + " + _this.variable[_this.choice] + " )"
                else if (_this.mLinear1 == -1)
                    string = string + " - " + _this.variable[_this.choice] + " )"
                else if (_this.mLinear1 > 0)
                    string = string + " + " + String(_this.mLinear1) + _this.variable[_this.choice] + " )"
                else if (_this.mLinear1 < 0)
                    string = string + " - " + String(-_this.mLinear1) + _this.variable[_this.choice] + " )"
            }
            else {
                if (_this.mConstant1 > 0)
                    string = string + " + " + String(_this.mConstant1) + " )"
                else if (_this.mConstant1 < 0)
                    string = string + " - " + String(-_this.mConstant1) + " )"
            }
        }
        else {
            if (_this.order1[1] == 1) {
                if (_this.mSquare1 == 1)
                    string = string + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare1 == -1)
                    string = string + '-' + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare1 != 0)
                    string = string + String(_this.mSquare1) + _this.variable[_this.choice] + _this.power
            }
            else if (_this.order1[1] == 2) {
                if (_this.mLinear1 == 1)
                    string = string + _this.variable[_this.choice]
                else if (_this.mLinear1 == -1)
                    string = string + '-' + _this.variable[_this.choice]
                else if (_this.mLinear1 != 0)
                    string = string + String(_this.mLinear1) + _this.variable[_this.choice]
            }
            else {
                if (_this.mConstant1 != 0)
                    string = string + String(_this.mConstant1)
            }
            if (_this.order1[2] == 1) {
                if (_this.mSquare1 == 1)
                    string = string + " + " + _this.variable[_this.choice] + _this.power + " )"
                else if (_this.mSquare1 == -1)
                    string = string + " - " + _this.variable[_this.choice] + _this.power + " )"
                else if (_this.mSquare1 > 0)
                    string = string + " + " + String(_this.mSquare1) + _this.variable[_this.choice] + _this.power + " )"
                else if (_this.mSquare1 < 0)
                    string = string + " - " + String(-_this.mSquare1) + _this.variable[_this.choice] + _this.power + " )"
            }
            else if (_this.order1[2] == 2) {
                if (_this.mLinear1 == 1)
                    string = string + " + " + _this.variable[_this.choice] + " )"
                else if (_this.mLinear1 == -1)
                    string = string + " - " + _this.variable[_this.choice] + " )"
                else if (_this.mLinear1 > 0)
                    string = string + " + " + String(_this.mLinear1) + _this.variable[_this.choice] + " )"
                else if (_this.mLinear1 < 0)
                    string = string + " - " + String(-_this.mLinear1) + _this.variable[_this.choice] + " )"
            }
            else {
                if (_this.mConstant1 > 0)
                    string = string + " + " + String(_this.mConstant1) + " )"
                else if (_this.mConstant1 < 0)
                    string = string + " - " + String(-_this.mConstant1) + " )"
            }
        }
        //Highlighting the strings of the first expression.
        _this.yellowbox1 = _this.add.image(0, 14, 'yellow box');
        _this.tempText = _this.add.text(0, 0, string);
        _this.tempText.visible = false;
        _this.yellowbox1.scale.setTo((_this.tempText.getBounds().width + 10) / (_this.yellowbox1.getBounds().width), 1);
        //_this.plusSignBlue(string)
        let string7 = " – ";
        string += string7;
        string1 = '( ';
        if (_this.order2[0] == 1) {
            console.log("_this.order2[0] == 1")
            if (_this.mSquare2 == 1)
                string1 = string1 + _this.variable[_this.choice] + _this.power
            else if (_this.mSquare2 == -1)
                string1 = string1 + '-' + _this.variable[_this.choice] + _this.power
            else if (_this.mSquare2 != 0)
                string1 = string1 + String(_this.mSquare2) + _this.variable[_this.choice] + _this.power
        }
        else if (_this.order2[0] == 2) {
            console.log("_this.order2[0] == 2")
            if (_this.mLinear2 == 1)
                string1 = string1 + _this.variable[_this.choice]
            else if (_this.mLinear2 == -1)
                string1 = string1 + '-' + _this.variable[_this.choice]
            else if (_this.mLinear2 != 0)
                string1 = string1 + String(_this.mLinear2) + _this.variable[_this.choice]
        }
        else {
            console.log("else")
            if (_this.mConstant2 != 0)
                string1 = string1 + String(_this.mConstant2)
        }
        if (_this.term2) {
            if (_this.order2[1] == 1) {
                console.log("_this.order2[1] == 1")
                if (_this.mSquare2 == 1)
                    string1 = string1 + ' + ' + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 == -1)
                    string1 = string1 + ' - ' + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 > 0)
                    string1 = string1 + " + " + String(_this.mSquare2) + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 < 0)
                    string1 = string1 + " - " + String(-_this.mSquare2) + _this.variable[_this.choice] + _this.power
            }
            else if (_this.order2[1] == 2) {
                console.log("_this.order2[1] == 2")
                if (_this.mLinear2 == 1)
                    string1 = string1 + ' + ' + _this.variable[_this.choice]
                else if (_this.mLinear2 == -1)
                    string1 = string1 + ' - ' + _this.variable[_this.choice]
                else if (_this.mLinear2 > 0)
                    string1 = string1 + " + " + String(_this.mLinear2) + _this.variable[_this.choice]
                else if (_this.mLinear2 < 0)
                    string1 = string1 + " - " + String(-_this.mLinear2) + _this.variable[_this.choice]
            }
            else {
                console.log("_this.order2[2]else")
                if (_this.mConstant2 > 0)
                    string1 = string1 + " + " + String(_this.mConstant2)
                else if (_this.mConstant2 < 0)
                    string1 = string1 + " - " + String(-_this.mConstant2)
            }
            if (_this.order2[2] == 1) {
                console.log("_this.order2[2] == 1")
                if (_this.mSquare2 == 1)
                    string1 = string1 + ' + ' + _this.variable[_this.choice] + _this.power + " )"
                else if (_this.mSquare2 == -1)
                    string1 = string1 + ' - ' + _this.variable[_this.choice] + _this.power + " )"
                else if (_this.mSquare2 > 0)
                    string1 = string1 + " + " + String(_this.mSquare2) + _this.variable[_this.choice] + _this.power + " )"
                else if (_this.mSquare2 < 0)
                    string1 = string1 + " - " + String(-_this.mSquare2) + _this.variable[_this.choice] + _this.power + " )"
            }
            else if (_this.order2[2] == 2) {
                console.log("_this.order2[2] == 2")
                if (_this.mLinear2 == 1)
                    string1 = string1 + ' + ' + _this.variable[_this.choice] + " )"
                else if (_this.mLinear2 == -1)
                    string1 = string1 + ' - ' + _this.variable[_this.choice] + " )"
                else if (_this.mLinear2 > 0)
                    string1 = string1 + " + " + String(_this.mLinear2) + _this.variable[_this.choice] + " )"
                else if (_this.mLinear2 < 0)
                    string1 = string1 + " - " + String(-_this.mLinear2) + _this.variable[_this.choice] + " )"
            }
            else {
                console.log("_this.order2[2] == else")
                if (_this.mConstant2 > 0)
                    string1 = string1 + " + " + String(_this.mConstant2) + " )"
                else if (_this.mConstant2 < 0)
                    string1 = string1 + " - " + String(-_this.mConstant2) + " )"
            }
        }
        else {
            if (_this.order2[1] == 1) {
                console.log("_this.order2[1] == 1")
                if (_this.mSquare2 == 1)
                    string1 = string1 + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 == -1)
                    string1 = string1 + '-' + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 != 0)
                    string1 = string1 + String(_this.mSquare2) + _this.variable[_this.choice] + _this.power
            }
            else if (_this.order2[1] == 2) {
                console.log("_this.order2[1] == 2")
                if (_this.mLinear2 == 1)
                    string1 = string1 + _this.variable[_this.choice]
                else if (_this.mLinear2 == -1)
                    string1 = string1 + '-' + _this.variable[_this.choice]
                else if (_this.mLinear2 != 0)
                    string1 = string1 + String(_this.mLinear2) + _this.variable[_this.choice]
            }
            else {
                console.log("_this.order2[1] == else")
                if (_this.mConstant2 != 0)
                    string1 = string1 + String(_this.mConstant2)
            }
            if (_this.order2[2] == 1) {
                console.log("_this.order2[2] == 1")
                if (_this.mSquare2 == 1)
                    string1 = string1 + ' + ' + _this.variable[_this.choice] + _this.power + " )"
                else if (_this.mSquare2 == -1)
                    string1 = string1 + ' - ' + _this.variable[_this.choice] + _this.power + " )"
                else if (_this.mSquare2 > 0)
                    string1 = string1 + " + " + String(_this.mSquare2) + _this.variable[_this.choice] + _this.power + " )"
                else if (_this.mSquare2 < 0)
                    string1 = string1 + " - " + String(-_this.mSquare2) + _this.variable[_this.choice] + _this.power + " )"
            }
            else if (_this.order2[2] == 2) {
                console.log("_this.order2[2] == 2")
                if (_this.mLinear2 == 1)
                    string1 = string1 + ' + ' + _this.variable[_this.choice] + " )"
                else if (_this.mLinear2 == -1)
                    string1 = string1 + ' - ' + _this.variable[_this.choice] + " )"
                else if (_this.mLinear2 > 0)
                    string1 = string1 + " + " + String(_this.mLinear2) + _this.variable[_this.choice] + " )"
                else if (_this.mLinear2 < 0)
                    string1 = string1 + " - " + String(-_this.mLinear2) + _this.variable[_this.choice] + " )"
            }
            else {
                console.log("_this.order2[2] == else")
                if (_this.mConstant2 > 0)
                    string1 = string1 + " + " + String(_this.mConstant2) + " )"
                else if (_this.mConstant2 < 0)
                    string1 = string1 + " - " + String(-_this.mConstant2) + " )"
            }
        }
        string += string1;
        console.log(string1, "string1");
        _this.secondEq = string1;
        //Highlighting the strings of the second expression.
        _this.yellowbox2 = _this.add.image((_this.tempText.getBounds().width) + 35, 14, 'yellow box');//30
        _this.tempText.destroy();
        _this.tempText = _this.add.text(0, 0, string1);
        _this.tempText.visible = false;
        _this.yellowbox2.scale.setTo((_this.tempText.getBounds().width + 20) / (_this.yellowbox2.getBounds().width), 1);//1
        _this.yellowbox2.visible = false;

        _this.questionText = _this.add.text(0, 19, string);
        _this.applyingStyle1(_this.questionText);
        // _this.questionText.fill = '#65B4C3';
        _this.textBox.fontSize = '25px';
        _this.textBox.addChild(_this.yellowbox1);
        _this.textBox.addChild(_this.yellowbox2);
        _this.questionTextSecond = _this.questionText;
        _this.textBox.addChild(_this.questionText);
        _this.questionWithAnswer = string;
        _this.questionText.x = _this.textBox.getBounds().width / 2 - _this.questionText.getBounds().width / 2;
        _this.yellowbox2.x += _this.textBox.getBounds().width / 2 - _this.questionText.getBounds().width / 2;
        _this.yellowbox1.x += _this.textBox.getBounds().width / 2 - _this.questionText.getBounds().width / 2;

        _this.eraser = _this.add.sprite(800, 85, 'eraser');
        _this.tick = _this.add.sprite(865, 85, 'TickBtn');

        _this.eraser.inputEnabled = true;
        _this.eraser.input.enableDrag(true);
        _this.eraser.events.onDragUpdate.add(_this.eraserUpdate, _this);
        _this.eraser.events.onDragStop.add(_this.eraserDrop1, _this);

        _this.space1 = _this.add.sprite(260, 160, 'panale_1');
        _this.space2 = _this.add.sprite(260, 340, 'panale_1');

        _this.space2.visible = false;

        console.log(_this.order2, "order2...");

        if (_this.choice == 0) {
            _this.mm2 = _this.add.text(25, 10, "-" + _this.variable[_this.choice] + _this.power)
            _this.mm = _this.add.text(25, 120, "-" + _this.variable[_this.choice] + "")
            _this.mone = _this.add.text(30, 240, "-1")
        }
        else {
            _this.mm2 = _this.add.text(30, 10, "-" + _this.variable[_this.choice] + _this.power)
            _this.mm = _this.add.text(35, 120, "-" + _this.variable[_this.choice] + "")
            _this.mone = _this.add.text(35, 240, "-1")
        }

        if (_this.choice == 0) {
            _this.m2 = _this.add.text(34, 10, _this.variable[_this.choice] + _this.power)
            _this.m = _this.add.text(35, 120, _this.variable[_this.choice])
            _this.one = _this.add.text(40, 240, "1")
        }
        else {
            _this.m2 = _this.add.text(38, 10, _this.variable[_this.choice] + _this.power)
            _this.m = _this.add.text(38, 120, _this.variable[_this.choice])
            _this.one = _this.add.text(38, 240, "1")
        }
        _this.mm2.fill = '#FF0000'
        _this.mm.fill = '#FF0000'
        _this.mone.fill = '#FF0000'
        _this.m2.fill = '#FF0000'
        _this.m.fill = '#FF0000'
        _this.one.fill = '#FF0000'

        _this.sideGray1 = _this.add.sprite(30, 160, 'panale_3');
        _this.sideGray2 = _this.add.sprite(140, 160, 'panale_4');

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

        _this.green_1.events.onInputDown.add(_this.m2S1);
        _this.green_2.events.onInputDown.add(_this.mR1);
        _this.green_3.events.onInputDown.add(_this.mS1);

        _this.pink_1.events.onInputDown.add(_this.m2S2);
        _this.pink_2.events.onInputDown.add(_this.mR2);
        _this.pink_3.events.onInputDown.add(_this.mS2);

        _this.space1Boxes = _this.add.group();
        _this.space2Boxes = _this.add.group();

        _this.space3Boxes = _this.add.group();
        _this.space4Boxes = _this.add.group();

        _this.limit1 = 0;
        _this.limit2 = 0;

        //Asking second question.
        _this.time.events.add(5000, function () {
            _this.Question_flag = 1;
            if (_this.numberOfQuestions == 0) {
                _this.Ask_Question2.play();
            }
        });

        _this.tick.inputEnabled = true;
        _this.tick.input.useHandCursor = true;
        _this.tick.events.onInputDown.add(_this.tickEvaluation, _this);
    },
    //Tick button in the question screen and the evaluation of the top box or workspace.
    tickEvaluation: function (target) {
        console.log("tick first evaluation");
        _this.clickSound.play();
        let a = [];
        let b = [];
        a.push(0);
        a.push(0);
        a.push(0);
        b.push(0);
        b.push(0);
        b.push(0);
        //Evaluating the number of blocks in the top space.
        for (let i = 0; i < _this.space1Boxes.length; i++) {
            if (_this.space1Boxes.getChildAt(i).name == '11') {
                a[0] -= 1;
            }
            else if (_this.space1Boxes.getChildAt(i).name == '12') {
                b[0] += 1;
            }
            else if (_this.space1Boxes.getChildAt(i).name == '21') {
                a[1] -= 1;
            }
            else if (_this.space1Boxes.getChildAt(i).name == '22') {
                b[1] += 1;
            }
            else if (_this.space1Boxes.getChildAt(i).name == '31') {
                a[2] -= 1;
            }
            else if (_this.space1Boxes.getChildAt(i).name == '32') {
                b[2] += 1;
            }
        }
        console.log(a, "a");
        console.log(b, b.length, "_this.space3Boxes");

        // console.log(c, c.length, "_this.space4Boxes");
        if (((a[0] == _this.mSquare1 && b[0] == 0) || (b[0] == _this.mSquare1 && a[0] == 0)) && ((a[1] == _this.mLinear1 && b[1] == 0) || (b[1] == _this.mLinear1 && a[1] == 0)) && ((a[2] == _this.mConstant1 && b[2] == 0) || (b[2] == _this.mConstant1 && a[2] == 0))) {
            target.events.onInputDown.removeAll();
            _this.eraser.events.onDragStop.removeAll();
            _this.eraser.events.onDragStop.add(_this.eraserDrop2, _this);
            _this.space2.visible = true;
            _this.yellowbox1.visible = false;
            _this.yellowbox2.visible = true;
            _this.green_1.events.onInputDown.removeAll();
            _this.green_2.events.onInputDown.removeAll();
            _this.green_3.events.onInputDown.removeAll();

            _this.pink_1.events.onInputDown.removeAll();
            _this.pink_2.events.onInputDown.removeAll();
            _this.pink_3.events.onInputDown.removeAll();

            _this.green_1.events.onInputDown.add(_this.m2S3);
            _this.green_2.events.onInputDown.add(_this.mR3);
            _this.green_3.events.onInputDown.add(_this.mS3);

            _this.pink_1.events.onInputDown.add(_this.m2S4);
            _this.pink_2.events.onInputDown.add(_this.mR4);
            _this.pink_3.events.onInputDown.add(_this.mS4);

            target.events.onInputDown.add(_this.tickSecondEvaluation, _this);

            _this.space1Boxes.destroy();
            _this.space1Boxes = _this.add.group();
            _this.limit1 = 0;
            for (let i = 0; i < Math.abs(_this.mSquare1); i++) {
                _this.limit1 += 6;
                let square;
                if (_this.mSquare1 < 0)
                    square = _this.add.sprite(300, 200, 'green_1');
                else if (_this.mSquare1 > 0)
                    square = _this.add.sprite(300, 200, 'pink_1');
                square.name = '11';
                if (_this.space1Boxes.length == 0) {
                    _this.space1Boxes.addChild(square);
                }
                else {
                    if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).name[0] == '1') {
                        square.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 100;
                        _this.space1Boxes.addChild(square);
                    }
                    else if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).name[0] == '2') {
                        square.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 40;
                        _this.space1Boxes.addChild(square);
                    }
                    else {
                        square.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 40;
                        _this.space1Boxes.addChild(square);
                    }
                }
            }
            for (let i = 0; i < Math.abs(_this.mLinear1); i++) {
                _this.limit1 += 3;
                let rectangle;
                if (_this.mLinear1 < 0)
                    rectangle = _this.add.sprite(300, 200, 'green_2');
                else if (_this.mLinear1 > 0)
                    rectangle = _this.add.sprite(300, 200, 'pink_2');
                rectangle.name = '21';
                if (_this.space1Boxes.length == 0) {
                    _this.space1Boxes.addChild(rectangle);
                }
                else {
                    if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).name[0] == '1') {
                        rectangle.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 100;
                        _this.space1Boxes.addChild(rectangle);
                    }
                    else if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).name[0] == '2') {
                        rectangle.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 40;
                        _this.space1Boxes.addChild(rectangle);
                    }
                    else {
                        rectangle.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 40;
                        _this.space1Boxes.addChild(rectangle);
                    }
                }
            }
            for (let i = 0; i < Math.abs(_this.mConstant1); i++) {
                _this.limit1 += 1;
                let ssquare;
                if (_this.mConstant1 < 0)
                    ssquare = _this.add.sprite(300, 200, 'green_3');
                else if (_this.mConstant1 > 0)
                    ssquare = _this.add.sprite(300, 200, 'pink_3');
                ssquare.name = '31';
                if (_this.space1Boxes.length == 0) {
                    _this.space1Boxes.addChild(ssquare);
                }
                else {
                    let valid = 1;
                    for (let i = _this.space1Boxes.length - 1; i >= 0; i--) {
                        if (_this.space1Boxes.getChildAt(i).name[0] == '3') {
                            if (_this.space1Boxes.getChildAt(i).y == 260) {
                                break;
                            }
                            else {
                                ssquare.x = _this.space1Boxes.getChildAt(i).x;
                                ssquare.y = _this.space1Boxes.getChildAt(i).y + 30;
                            }
                            _this.space1Boxes.addChildAt(ssquare, i + 1);
                            valid = 0;
                            break;
                        }
                    }
                    if (valid == 0) {
                        continue;
                    }
                    if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).name[0] == '1') {
                        ssquare.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 100;
                        _this.space1Boxes.addChild(ssquare);
                    }
                    else if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).name[0] == '2') {
                        ssquare.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 40;
                        _this.space1Boxes.addChild(ssquare);
                    }
                    else {
                        ssquare.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 40;
                        _this.space1Boxes.addChild(ssquare);
                    }
                }
            }
            _this.framechange.play();
        }
        else {
            _this.space1Boxes.destroy();
            _this.space1Boxes = _this.add.group();
            _this.limit1 = 0;
            _this.wrongans.play();
        }
    },
    //Evaluation of the bottom box or the workspace.
    tickSecondEvaluation: function (target) {
        console.log("tick second evaluation");
        _this.clickSound.play();
        let a = [];
        let b = [];
        a.push(0);
        a.push(0);
        a.push(0);
        b.push(0);
        b.push(0);
        b.push(0);
        //Evaluating the number of blocks in the bottom space.
        for (let i = 0; i < _this.space2Boxes.length; i++) {
            if (_this.space2Boxes.getChildAt(i).name == '11') {
                a[0] -= 1;
            }
            else if (_this.space2Boxes.getChildAt(i).name == '12') {
                b[0] += 1;
            }
            else if (_this.space2Boxes.getChildAt(i).name == '21') {
                a[1] -= 1;
            }
            else if (_this.space2Boxes.getChildAt(i).name == '22') {
                b[1] += 1;
            }
            else if (_this.space2Boxes.getChildAt(i).name == '31') {
                a[2] -= 1;
            }
            else if (_this.space2Boxes.getChildAt(i).name == '32') {
                b[2] += 1;
            }
        }
        console.log(a, ".a...");
        console.log(b, "b....");
        _this.valueSecondSet = [];
        _this.valueSecondSet.push(a);
        if (((a[0] == _this.mSquare2 && b[0] == 0) || (b[0] == _this.mSquare2 && a[0] == 0)) && ((a[1] == _this.mLinear2 && b[1] == 0) || (b[1] == _this.mLinear2 && a[1] == 0)) && ((a[2] == _this.mConstant2 && b[2] == 0) || (b[2] == _this.mConstant2 && a[2] == 0))) {
            target.events.onInputDown.removeAll();
            // _this.yellowbox1.destroy();
            // _this.yellowbox2.destroy();
            _this.space2Boxes.destroy();
            _this.space2Boxes = _this.add.group();
            _this.limit1 = 0;

            for (let i = 0; i < Math.abs(_this.mSquare2); i++) {
                _this.limit1 += 6;
                let square;
                if (_this.mSquare2 < 0)
                    square = _this.add.sprite(300, 380, 'green_1');
                else if (_this.mSquare2 > 0)
                    square = _this.add.sprite(300, 380, 'pink_1');
                square.name = '11';
                if (_this.space2Boxes.length == 0) {
                    _this.space2Boxes.addChild(square);
                }
                else {
                    if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '1') {
                        square.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 100;
                        _this.space2Boxes.addChild(square);
                    }
                    else if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '2') {
                        square.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                        _this.space2Boxes.addChild(square);
                    }
                    else {
                        square.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                        _this.space2Boxes.addChild(square);
                    }
                }
            }
            for (let i = 0; i < Math.abs(_this.mLinear2); i++) {
                _this.limit1 += 3;
                let rectangle;
                if (_this.mLinear2 < 0)
                    rectangle = _this.add.sprite(300, 380, 'green_2');
                else if (_this.mLinear2 > 0)
                    rectangle = _this.add.sprite(300, 380, 'pink_2');
                rectangle.name = '21';
                if (_this.space2Boxes.length == 0) {
                    _this.space2Boxes.addChild(rectangle);
                }
                else {
                    if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '1') {
                        rectangle.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 100;
                        _this.space2Boxes.addChild(rectangle);
                    }
                    else if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '2') {
                        rectangle.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                        _this.space2Boxes.addChild(rectangle);
                    }
                    else {
                        rectangle.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                        _this.space2Boxes.addChild(rectangle);
                    }
                }
            }
            for (let i = 0; i < Math.abs(_this.mConstant2); i++) {
                _this.limit1 += 1;
                let ssquare;
                if (_this.mConstant2 < 0)
                    ssquare = _this.add.sprite(300, 380, 'green_3');
                else if (_this.mConstant2 > 0)
                    ssquare = _this.add.sprite(300, 380, 'pink_3');
                ssquare.name = '31';
                if (_this.space2Boxes.length == 0) {
                    _this.space2Boxes.addChild(ssquare);
                }
                else {
                    let valid = 1;
                    for (let i = _this.space2Boxes.length - 1; i >= 0; i--) {
                        if (_this.space2Boxes.getChildAt(i).name[0] == '3') {
                            if (_this.space2Boxes.getChildAt(i).y == 440) {
                                break;
                            }
                            else {
                                ssquare.x = _this.space2Boxes.getChildAt(i).x;
                                ssquare.y = _this.space2Boxes.getChildAt(i).y + 30;
                            }
                            _this.space2Boxes.addChildAt(ssquare, i + 1);
                            valid = 0;
                            break;
                        }
                    }
                    if (valid == 0) {
                        continue;
                    }
                    if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '1') {
                        ssquare.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 100;
                        _this.space2Boxes.addChild(ssquare);
                    }
                    else if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '2') {
                        ssquare.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                        _this.space2Boxes.addChild(ssquare);
                    }
                    else {
                        ssquare.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                        _this.space2Boxes.addChild(ssquare);
                    }
                }
            }
            _this.framechange.play();

            // _this.counterCelebrationSound.play();
            _this.green_1.destroy();
            _this.green_2.destroy();
            _this.green_3.destroy();

            _this.pink_1.destroy();
            _this.pink_2.destroy();
            _this.pink_3.destroy();
            _this.tick.destroy();

            _this.eraser.destroy();


            _this.sideGray1.destroy();
            _this.sideGray2.destroy();

            //Adding the objects of the second scene in the game.
            _this.sideGray = _this.add.sprite(30, 120, 'panale_3');

            _this.symbol_1 = _this.add.sprite(32, 130, 'symbol_1');
            _this.symbol_2 = _this.add.sprite(32, 250, 'symbol_2');
            _this.symbol_3 = _this.add.sprite(32, 370, 'symbol_3');

            _this.textBox.y -= 20;

            _this.symbol_1.frame = 0;
            _this.symbol_2.frame = 0;
            _this.symbol_3.frame = 1;

            if (_this.numberOfQuestions == 0) {
                console.log("tick second evaluation");
                let hand = _this.add.image(200, 400, 'hand');
                _this.handTween = _this.add.tween(hand);
                _this.handTween.to({ x: 57, y: 400 }, 2000, 'Linear', true, 0);
                _this.handTween.onComplete.add(function () {
                    _this.clickSound.play();
                    hand.destroy();
                });
            }

            _this.symbol_3.inputEnabled = true;
            _this.symbol_3.input.useHandCursor = true;
            _this.symbol_3.events.onInputDown.add(_this.flipSymbolClicked);
        }
        else {
            _this.space2Boxes.destroy();
            _this.space2Boxes = _this.add.group();
            _this.limit2 = 0;
            _this.wrongans.play();
        }

    },
    flipSymbolClicked: function () {
        console.log("flip symbol");
        _this.equationBoxChange();
        _this.space2Boxes.destroy();
        _this.space2Boxes = _this.add.group();
        _this.limit1 = 0;
        _this.symbol_3.frame = 0;

        _this.symbol_3.events.onInputDown.removeAll();

        for (let i = 0; i < Math.abs(_this.mSquare2); i++) {
            _this.limit1 += 6;
            let square;
            if (_this.mSquare2 < 0)
                square = _this.add.sprite(300, 380, 'pink_1');
            else if (_this.mSquare2 > 0)
                square = _this.add.sprite(300, 380, 'green_1');
            square.name = '11';
            if (_this.space2Boxes.length == 0) {
                _this.space2Boxes.addChild(square);
            }
            else {
                if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '1') {
                    square.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 100;
                    _this.space2Boxes.addChild(square);
                }
                else if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '2') {
                    square.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                    _this.space2Boxes.addChild(square);
                }
                else {
                    square.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                    _this.space2Boxes.addChild(square);
                }
            }

        }

        for (let i = 0; i < Math.abs(_this.mLinear2); i++) {
            _this.limit1 += 3;
            let rectangle;
            if (_this.mLinear2 < 0)
                rectangle = _this.add.sprite(300, 380, 'pink_2');
            else if (_this.mLinear2 > 0)
                rectangle = _this.add.sprite(300, 380, 'green_2');

            rectangle.name = '21';
            if (_this.space2Boxes.length == 0) {
                _this.space2Boxes.addChild(rectangle);
            }
            else {
                if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '1') {
                    rectangle.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 100;
                    _this.space2Boxes.addChild(rectangle);
                }
                else if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '2') {
                    rectangle.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                    _this.space2Boxes.addChild(rectangle);
                }
                else {
                    rectangle.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                    _this.space2Boxes.addChild(rectangle);
                }
            }
        }
        for (let i = 0; i < Math.abs(_this.mConstant2); i++) {
            _this.limit1 += 1;
            let ssquare;
            if (_this.mConstant2 < 0)
                ssquare = _this.add.sprite(300, 380, 'pink_3');
            else if (_this.mConstant2 > 0)
                ssquare = _this.add.sprite(300, 380, 'green_3');

            ssquare.name = '31';
            if (_this.space2Boxes.length == 0) {
                _this.space2Boxes.addChild(ssquare);
            }
            else {
                let valid = 1;
                for (let i = _this.space2Boxes.length - 1; i >= 0; i--) {
                    if (_this.space2Boxes.getChildAt(i).name[0] == '3') {
                        if (_this.space2Boxes.getChildAt(i).y == 440) {
                            break;
                        }
                        else {
                            ssquare.x = _this.space2Boxes.getChildAt(i).x;
                            ssquare.y = _this.space2Boxes.getChildAt(i).y + 30;
                        }
                        _this.space2Boxes.addChildAt(ssquare, i + 1);
                        valid = 0;
                        break;
                    }
                }
                if (valid == 0) {
                    continue;
                }
                if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '1') {
                    ssquare.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 100;
                    _this.space2Boxes.addChild(ssquare);
                }
                else if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '2') {
                    ssquare.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                    _this.space2Boxes.addChild(ssquare);
                }
                else {
                    ssquare.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                    _this.space2Boxes.addChild(ssquare);
                }
            }
        }




        // _this.tickThirdEvaluation();
        //});

    },
    equationBoxChange: function () {

        console.log("equationBoxChange");
        console.log(_this.valueSecondSet, "valueSecondSet");
        _this.textBox.visible = false;
        _this.textBox2 = _this.add.sprite(140, 80, 'Text box_1');
        // _this.textBox2.scale.setTo(1.2, 0.8);
        // _this.textBox2.addChild(_this.questionTextSecond);
        let string3 = " ( ";

        if (_this.order1[0] == 1) {
            if (_this.mSquare1 == 1)
                string3 = string3 + _this.variable[_this.choice] + _this.power;
            else if (_this.mSquare1 == -1)
                string3 = string3 + '-' + _this.variable[_this.choice] + _this.power;
            else if (_this.mSquare1 != 0)
                string3 = string3 + String(_this.mSquare1) + _this.variable[_this.choice] + _this.power;
        }
        else if (_this.order1[0] == 2) {
            if (_this.mLinear1 == 1)
                string3 = string3 + _this.variable[_this.choice]
            else if (_this.mLinear1 == -1)
                string3 = string3 + '-' + _this.variable[_this.choice]
            else if (_this.mLinear1 != 0)
                string3 = string3 + String(_this.mLinear1) + _this.variable[_this.choice]
        }
        else {
            if (_this.mConstant1 != 0)
                string3 = string3 + String(_this.mConstant1)
        }
        if (_this.term1 == 1) {
            if (_this.order1[1] == 1) {
                if (_this.mSquare1 == 1)
                    string3 = string3 + " + " + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare1 == -1)
                    string3 = string3 + " - " + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare1 > 0)
                    string3 = string3 + " + " + String(_this.mSquare1) + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare1 < 0)
                    string3 = string3 + " - " + String(-_this.mSquare1) + _this.variable[_this.choice] + _this.power
            }
            else if (_this.order1[1] == 2) {
                if (_this.mLinear1 == 1)
                    string3 = string3 + " + " + _this.variable[_this.choice]
                else if (_this.mLinear1 == -1)
                    string3 = string3 + " - " + _this.variable[_this.choice]
                else if (_this.mLinear1 > 0)
                    string3 = string3 + " + " + String(_this.mLinear1) + _this.variable[_this.choice]
                else if (_this.mLinear1 < 0)
                    string3 = string3 + " - " + String(-_this.mLinear1) + _this.variable[_this.choice]
            }
            else {
                if (_this.mConstant1 > 0)
                    string3 = string3 + " + " + String(_this.mConstant1)
                else if (_this.mConstant1 < 0)
                    string3 = string3 + " - " + String(-_this.mConstant1)
            }
            if (_this.order1[2] == 1) {
                if (_this.mSquare1 == 1)
                    string3 = string3 + " + " + _this.variable[_this.choice] + _this.power + ")"
                else if (_this.mSquare1 == -1)
                    string3 = string3 + " - " + _this.variable[_this.choice] + _this.power + ")"
                else if (_this.mSquare1 > 0)
                    string3 = string3 + " + " + String(_this.mSquare1) + _this.variable[_this.choice] + _this.power + ")"
                else if (_this.mSquare1 < 0)
                    string3 = string3 + " - " + String(-_this.mSquare1) + _this.variable[_this.choice] + _this.power + ")"
            }
            else if (_this.order1[2] == 2) {
                if (_this.mLinear1 == 1)
                    string3 = string3 + " + " + _this.variable[_this.choice] + ")"
                else if (_this.mLinear1 == -1)
                    string3 = string3 + " - " + _this.variable[_this.choice] + ")"
                else if (_this.mLinear1 > 0)
                    string3 = string3 + " + " + String(_this.mLinear1) + _this.variable[_this.choice] + ")"
                else if (_this.mLinear1 < 0)
                    string3 = string3 + " - " + String(-_this.mLinear1) + _this.variable[_this.choice] + ")"
            }
            else {
                if (_this.mConstant1 > 0)
                    string3 = string3 + " + " + String(_this.mConstant1) + ")"
                else if (_this.mConstant1 < 0)
                    string3 = string3 + " - " + String(-_this.mConstant1) + ")"
            }
        }
        else {
            if (_this.order1[1] == 1) {
                if (_this.mSquare1 == 1)
                    string3 = string3 + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare1 == -1)
                    string3 = string3 + '-' + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare1 != 0)
                    string3 = string3 + String(_this.mSquare1) + _this.variable[_this.choice] + _this.power
            }
            else if (_this.order1[1] == 2) {
                if (_this.mLinear1 == 1)
                    string3 = string3 + _this.variable[_this.choice]
                else if (_this.mLinear1 == -1)
                    string3 = string3 + '-' + _this.variable[_this.choice]
                else if (_this.mLinear1 != 0)
                    string3 = string3 + String(_this.mLinear1) + _this.variable[_this.choice]
            }
            else {
                if (_this.mConstant1 != 0)
                    string3 = string3 + String(_this.mConstant1);
            }
            if (_this.order1[2] == 1) {
                if (_this.mSquare1 == 1)
                    string3 = string3 + " + " + _this.variable[_this.choice] + _this.power + ")"
                else if (_this.mSquare1 == -1)
                    string3 = string3 + " - " + _this.variable[_this.choice] + _this.power + ")"
                else if (_this.mSquare1 > 0)
                    string3 = string3 + " + " + String(_this.mSquare1) + _this.variable[_this.choice] + _this.power + ")"
                else if (_this.mSquare1 < 0)
                    string3 = string3 + " - " + String(-_this.mSquare1) + _this.variable[_this.choice] + _this.power + ")"
            }
            else if (_this.order1[2] == 2) {
                if (_this.mLinear1 == 1)
                    string3 = string3 + " + " + _this.variable[_this.choice] + ")"
                else if (_this.mLinear1 == -1)
                    string3 = string3 + " - " + _this.variable[_this.choice] + ")"
                else if (_this.mLinear1 > 0)
                    string3 = string3 + " + " + String(_this.mLinear1) + _this.variable[_this.choice] + ")"
                else if (_this.mLinear1 < 0)
                    string3 = string3 + " - " + String(-_this.mLinear1) + _this.variable[_this.choice] + ")"
            }
            else {
                if (_this.mConstant1 > 0)
                    string3 = string3 + " + " + String(_this.mConstant1) + ")"
                else if (_this.mConstant1 < 0)
                    string3 = string3 + " - " + String(-_this.mConstant1) + ")"
            }
        }
        _this.tempText2 = _this.add.text(0, 0, string3);
        _this.tempText2.visible = false;
        let string3Copy = string3;
        string3 += ' - ';
        let string4 = '( ';
        if (_this.order2[0] == 1) {
            if (_this.mSquare2 == 1)
                string4 = string4 + _this.variable[_this.choice] + _this.power
            else if (_this.mSquare2 == -1)
                string4 = string4 + '-' + _this.variable[_this.choice] + _this.power
            else if (_this.mSquare2 != 0)
                string4 = string4 + String(_this.mSquare2) + _this.variable[_this.choice] + _this.power
        }
        else if (_this.order2[0] == 2) {
            if (_this.mLinear2 == 1)
                string4 = string4 + _this.variable[_this.choice]
            else if (_this.mLinear2 == -1)
                string4 = string4 + '-' + _this.variable[_this.choice]
            else if (_this.mLinear2 != 0)
                string4 = string4 + String(_this.mLinear2) + _this.variable[_this.choice]
        }
        else {
            if (_this.mConstant2 != 0)
                string4 = string4 + String(_this.mConstant2)
        }
        if (_this.term2) {
            if (_this.order2[1] == 1) {
                if (_this.mSquare2 == 1)
                    string4 = string4 + ' + ' + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 == -1)
                    string4 = string4 + ' - ' + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 > 0)
                    string4 = string4 + " + " + String(_this.mSquare2) + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 < 0)
                    string4 = string4 + " - " + String(-_this.mSquare2) + _this.variable[_this.choice] + _this.power
            }
            else if (_this.order2[1] == 2) {
                if (_this.mLinear2 == 1)
                    string4 = string4 + ' + ' + _this.variable[_this.choice]
                else if (_this.mLinear2 == -1)
                    string4 = string4 + ' - ' + _this.variable[_this.choice]
                else if (_this.mLinear2 > 0)
                    string4 = string4 + " + " + String(_this.mLinear2) + _this.variable[_this.choice]
                else if (_this.mLinear2 < 0)
                    string4 = string4 + " - " + String(-_this.mLinear2) + _this.variable[_this.choice]
            }
            else {
                if (_this.mConstant2 > 0)
                    string4 = string4 + " + " + String(_this.mConstant2)
                else if (_this.mConstant2 < 0)
                    string4 = string4 + " - " + String(-_this.mConstant2)
            }
            if (_this.order2[2] == 1) {
                if (_this.mSquare2 == 1)
                    string4 = string4 + ' + ' + _this.variable[_this.choice] + _this.power + ")"
                else if (_this.mSquare2 == -1)
                    string4 = string4 + ' - ' + _this.variable[_this.choice] + _this.power + ")"
                else if (_this.mSquare2 > 0)
                    string4 = string4 + " + " + String(_this.mSquare2) + _this.variable[_this.choice] + _this.power + ")"
                else if (_this.mSquare2 < 0)
                    string4 = string4 + " - " + String(-_this.mSquare2) + _this.variable[_this.choice] + _this.power + ")"
            }
            else if (_this.order2[2] == 2) {
                if (_this.mLinear2 == 1)
                    string4 = string4 + ' + ' + _this.variable[_this.choice] + ")"
                else if (_this.mLinear2 == -1)
                    string4 = string4 + ' - ' + _this.variable[_this.choice] + ")"
                else if (_this.mLinear2 > 0)
                    string4 = string4 + " + " + String(_this.mLinear2) + _this.variable[_this.choice] + ")"
                else if (_this.mLinear2 < 0)
                    string4 = string4 + " - " + String(-_this.mLinear2) + _this.variable[_this.choice] + ")"
            }
            else {
                if (_this.mConstant2 > 0)
                    string4 = string4 + " + " + String(_this.mConstant2) + ")"
                else if (_this.mConstant2 < 0)
                    string4 = string4 + " - " + String(-_this.mConstant2) + ")"
            }
        }
        else {
            if (_this.order2[1] == 1) {
                if (_this.mSquare2 == 1)
                    string4 = string4 + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 == -1)
                    string4 = string4 + '-' + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 != 0)
                    string4 = string4 + String(_this.mSquare2) + _this.variable[_this.choice] + _this.power
            }
            else if (_this.order2[1] == 2) {
                if (_this.mLinear2 == 1)
                    string4 = string4 + _this.variable[_this.choice]
                else if (_this.mLinear2 == -1)
                    string4 = string4 + '-' + _this.variable[_this.choice]
                else if (_this.mLinear2 != 0)
                    string4 = string4 + String(_this.mLinear2) + _this.variable[_this.choice]
            }
            else {
                if (_this.mConstant2 != 0)
                    string4 = string4 + String(_this.mConstant2)
            }
            if (_this.order2[2] == 1) {
                if (_this.mSquare2 == 1)
                    string4 = string4 + ' + ' + _this.variable[_this.choice] + _this.power + ")"
                else if (_this.mSquare2 == -1)
                    string4 = string4 + ' - ' + _this.variable[_this.choice] + _this.power + ")"
                else if (_this.mSquare2 > 0)
                    string4 = string4 + " + " + String(_this.mSquare2) + _this.variable[_this.choice] + _this.power + ")"
                else if (_this.mSquare2 < 0)
                    string4 = string4 + " - " + String(-_this.mSquare2) + _this.variable[_this.choice] + _this.power + ")"
            }
            else if (_this.order2[2] == 2) {
                if (_this.mLinear2 == 1)
                    string4 = string4 + ' + ' + _this.variable[_this.choice] + ")"
                else if (_this.mLinear2 == -1)
                    string4 = string4 + ' - ' + _this.variable[_this.choice] + ")"
                else if (_this.mLinear2 > 0)
                    string4 = string4 + " + " + String(_this.mLinear2) + _this.variable[_this.choice] + ")"
                else if (_this.mLinear2 < 0)
                    string4 = string4 + " - " + String(-_this.mLinear2) + _this.variable[_this.choice] + ")"
            }
            else {
                if (_this.mConstant2 > 0)
                    string4 = string4 + " + " + String(_this.mConstant2) + ")"
                else if (_this.mConstant2 < 0)
                    string4 = string4 + " - " + String(-_this.mConstant2) + ")"
            }
        }
        string3 += string4;
        _this.tempText2.destroy();
        _this.tempText2 = _this.add.text(0, 0, string4);
        _this.tempText2.visible = false;

        let string5 = string3Copy;

        //string3 += string5;
        let string6 = "";
        if (_this.order2[0] == 1) {
            if (_this.mSquare2 == 1)
                string6 = string6 + '-' + _this.variable[_this.choice] + _this.power
            else if (_this.mSquare2 == -1)
                string6 = string6 + '+' + _this.variable[_this.choice] + _this.power
            else if (_this.mSquare2 != 0) {
                if (_this.mSquare2 > 0) {
                    string6 = string6 + '-' + String(_this.mSquare2) + _this.variable[_this.choice] + _this.power;
                }
                else if (_this.mSquare2 < 0) {
                    string6 = string6 + '+' + String(-_this.mSquare2) + _this.variable[_this.choice] + _this.power;
                }
            }
            console.log("string 6 in order2[0] ", string6);
        }
        else if (_this.order2[0] == 2) {
            if (_this.mLinear2 == 1)
                string6 = string6 + '-' + _this.variable[_this.choice]
            else if (_this.mLinear2 == -1)
                string6 = string6 + '+' + _this.variable[_this.choice]
            else if (_this.mLinear2 != 0) {
                if (_this.mLinear2 > 0) {
                    string6 = string6 + '-' + String(_this.mLinear2) + _this.variable[_this.choice]
                }
                else if (_this.mLinear2 < 0) {
                    string6 = string6 + '+' + String(-_this.mLinear2) + _this.variable[_this.choice]
                }
            }
            console.log("string 6 in order2[0]2 ", string6);

        }
        else {
            if (_this.mConstant2 != 0) {
                if (_this.mConstant2 > 0) {
                    string6 = string6 + '-' + String(_this.mConstant2)
                }
                else {
                    string6 = string6 + '+' + String(-_this.mConstant2);
                }
            }
            console.log("string 6 in order2[0] ", string6);


        }
        if (_this.term2) {
            if (_this.order2[1] == 1) {
                if (_this.mSquare2 == 1)
                    string6 = string6 + '-' + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 == -1)
                    string6 = string6 + '+' + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 > 0)
                    string6 = string6 + "-" + String(_this.mSquare2) + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 < 0)
                    string6 = string6 + "+" + String(-_this.mSquare2) + _this.variable[_this.choice] + _this.power

                console.log("string 6 in order2[0] ", string6);

            }
            else if (_this.order2[1] == 2) {
                if (_this.mLinear2 == 1)
                    string6 = string6 + '-' + _this.variable[_this.choice]
                else if (_this.mLinear2 == -1)
                    string6 = string6 + '+' + _this.variable[_this.choice]
                else if (_this.mLinear2 > 0)
                    string6 = string6 + "-" + String(_this.mLinear2) + _this.variable[_this.choice]
                else if (_this.mLinear2 < 0)
                    string6 = string6 + "+" + String(-_this.mLinear2) + _this.variable[_this.choice]
                // _this.secondeqLin = string6;

            }
            else {
                if (_this.mConstant2 > 0)
                    string6 = string6 + "-" + String(_this.mConstant2)
                else if (_this.mConstant2 < 0)
                    string6 = string6 + "+" + String(-_this.mConstant2)
            }
            if (_this.order2[2] == 1) {
                if (_this.mSquare2 == 1)
                    string6 = string6 + '-' + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 == -1)
                    string6 = string6 + '+' + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 > 0)
                    string6 = string6 + "-" + String(_this.mSquare2) + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 < 0)
                    string6 = string6 + "+" + String(-_this.mSquare2) + _this.variable[_this.choice] + _this.power
                // _this.secondeqSq = string6;
                console.log("string 6 in order2[0] ", string6);


            }
            else if (_this.order2[2] == 2) {
                if (_this.mLinear2 == 1)
                    string6 = string6 + '-' + _this.variable[_this.choice]
                else if (_this.mLinear2 == -1)
                    string6 = string6 + '+' + _this.variable[_this.choice]
                else if (_this.mLinear2 > 0)
                    string6 = string6 + "-" + String(_this.mLinear2) + _this.variable[_this.choice]
                else if (_this.mLinear2 < 0)
                    string6 = string6 + "+" + String(-_this.mLinear2) + _this.variable[_this.choice]
            }
            else {
                if (_this.mConstant2 > 0)
                    string6 = string6 + "-" + String(_this.mConstant2)
                else if (_this.mConstant2 < 0)
                    string6 = string6 + "+" + String(-_this.mConstant2)
            }
        }
        else {
            if (_this.order2[1] == 1) {
                if (_this.mSquare2 == 1)
                    string6 = string6 + '-' + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 == -1)
                    string6 = string6 + "+" + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 != 0) {
                    if (_this.mSquare2 > 0) {
                        string6 = string6 + '-' + String(_this.mSquare2) + _this.variable[_this.choice] + _this.power;
                    }
                    else {
                        string6 = string6 + '+' + String(-_this.mSquare2) + _this.variable[_this.choice] + _this.power;
                    }
                }
                console.log("string 6 in order2[0] ", string6);

                // _this.secondeqSq = string6;

            }
            else if (_this.order2[1] == 2) {
                if (_this.mLinear2 == 1)
                    string6 = string6 + '-' + _this.variable[_this.choice]
                else if (_this.mLinear2 == -1)
                    string6 = string6 + '+' + _this.variable[_this.choice]
                else if (_this.mLinear2 != 0) {
                    if (_this.mLinear2 > 0) {
                        string6 = string6 + '-' + String(_this.mLinear2) + _this.variable[_this.choice]
                    }
                    else {
                        string6 = string6 + '+' + String(-_this.mLinear2) + _this.variable[_this.choice]
                    }
                }
            }
            else {
                if (_this.mConstant2 != 0) {
                    if (_this.mConstant2 > 0) {
                        string6 = string6 + '-' + String(_this.mConstant2)
                    }
                    else {
                        string6 = string6 + '+' + String(-_this.mConstant2)
                    }
                }
            }
            if (_this.order2[2] == 1) {
                if (_this.mSquare2 == 1)
                    string6 = string6 + '-' + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 == -1)
                    string6 = string6 + '+' + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 > 0)
                    string6 = string6 + "-" + String(_this.mSquare2) + _this.variable[_this.choice] + _this.power
                else if (_this.mSquare2 < 0)
                    string6 = string6 + "+" + String(-_this.mSquare2) + _this.variable[_this.choice] + _this.power
                // _this.secondeqSq = string6;
                console.log("string 6 in order2[0] ", string6);

            }
            else if (_this.order2[2] == 2) {
                if (_this.mLinear2 == 1)
                    string6 = string6 + '-' + _this.variable[_this.choice]
                else if (_this.mLinear2 == -1)
                    string6 = string6 + '+' + _this.variable[_this.choice]
                else if (_this.mLinear2 > 0)
                    string6 = string6 + "-" + String(_this.mLinear2) + _this.variable[_this.choice]
                else if (_this.mLinear2 < 0)
                    string6 = string6 + "+" + String(-_this.mLinear2) + _this.variable[_this.choice]
            }
            else {
                if (_this.mConstant2 > 0)
                    string6 = string6 + "-" + String(_this.mConstant2)
                else if (_this.mConstant2 < 0)
                    string6 = string6 + "+" + String(-_this.mConstant2)
            }
        }

        string5 += string6;
        console.log(string5, "string5..");

        _this.secondEq = "-" + _this.secondEq;
        console.log(_this.secondEq, "_this.secondEq");
        //_this.secondEq.visible = true;

        //console.log(string6.length, "string666")
        _this.questionText6 = _this.add.text(20, 19, string3Copy);
        _this.applyingStyle1(_this.questionText6);
        //_this.questionText6.fill = '#65B4C3';
        // _this.questionText6.visible = false;

        _this.questionText5 = _this.add.text(0, 19, string5);
        _this.questionText5.fill = '#65B4C3';
        _this.questionText5.visible = false;
        // _this.applyingStyle1(_this.questionText5);

        _this.questionText8 = _this.add.text(_this.questionText6.width + 20, 19, _this.secondEq);//string6
        _this.questionText8.fill = '#65B4C3';
        _this.questionText8.alpha = 1;
        _this.applyingStyle1(_this.questionText8);

        _this.questionText7 = _this.add.text(_this.questionText6.width + 20, 19, string6);//string6
        _this.questionText7.fill = '#65B4C3';
        console.log(_this.questionText7.text, "text q7");
        _this.questionText7.alpha = 0;
        _this.applyingStyle1(_this.questionText7);

        _this.textBox2.addChild(_this.questionText6);
        _this.textBox2.addChild(_this.questionText8);
        _this.textBox2.addChild(_this.questionText7);
        //_this.questionText7.visible = true;


        _this.firstequationTween = _this.add.tween(_this.questionText8).to({ alpha: 0 }, 1000, 'Linear', true, 0);
        _this.firstequationTween.onComplete.add(function () {



            _this.equationTween = _this.add.tween(_this.questionText7).to({ alpha: 1 }, 2000, 'Linear', true, 0);
            _this.framechange.play();

            _this.equationTween.onComplete.add(function () {
                if (_this.numberOfQuestions == 0) {
                    console.log("tick second evaluation");
                    let hand = _this.add.image(200, 300, 'hand');
                    _this.handTween = _this.add.tween(hand);
                    _this.handTween.to({ x: 57, y: 300 }, 2000, 'Linear', true, 0);
                    _this.handTween.onComplete.add(function () {
                        _this.clickSound.play();
                        hand.destroy();
                    });
                }

                _this.symbol_2.frame = 1;

                _this.symbol_2.inputEnabled = true;
                _this.symbol_2.input.useHandCursor = true;
                _this.symbol_2.events.onInputDown.add(_this.tickThirdEvaluation);
            });
        });


    },

    tickThirdEvaluation: function () {
        _this.counterCelebrationSound.play();
        _this.textBox2.destroy();
        // _this.secondEq2.destroy();
        // _this.secondEq0.destroy();
        // _this.secondEq1.destroy();
        _this.textBox.visible = true;
        _this.space1.destroy();
        _this.space2.destroy();
        _this.tick.destroy();

        _this.symbol_2.frame = 0;
        _this.symbol_2.events.onInputDown.removeAll();

        _this.yellowbox1.destroy();
        _this.yellowbox2.destroy();

        _this.space1Boxes.destroy();
        _this.space2Boxes.destroy();
        _this.m2 = _this.add.text(80, 10, _this.variable[_this.choice] + _this.power)
        _this.m = _this.add.text(80, 10, _this.variable[_this.choice])
        _this.one = _this.add.text(90, 10, "1")

        _this.m2.fill = '#FF0000'
        _this.m.fill = '#FF0000'
        _this.one.fill = '#FF0000'

        _this.workspace = _this.add.sprite(140, 190, 'panale_2');
        _this.boxes1 = _this.add.sprite(220, 130, 'Text box_4');
        _this.boxes2 = _this.add.sprite(495, 130, 'Text box_4');
        _this.boxes3 = _this.add.sprite(715, 130, 'Text box_4');

        _this.boxes1.addChild(_this.m2)
        _this.boxes2.addChild(_this.m)
        _this.boxes3.addChild(_this.one)

        _this.space1Boxes = _this.add.group();
        _this.space2Boxes = _this.add.group();
        _this.space3Boxes = _this.add.group();
        _this.mergeOperation();

    },
    //Addition of the blocks onto the space and then adding the merge symbol box.
    mergeOperation: function () {
        //Adds the big squares to the space, that is green and pink respectively - Only from the first expression.
        if (_this.mSquare1 < 0) {
            _this.green_1 = _this.add.sprite(150, 210, 'green_1');
            _this.green_1.name = '11';
            _this.space1Boxes.addChild(_this.green_1);
            for (let i = 1; i < -_this.mSquare1; i++) {
                _this.green_1 = _this.add.sprite(0, 0, 'green_1');
                _this.green_1.name = '11';
                _this.green_1.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x;
                _this.green_1.y = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).y;
                if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).y == 370) {
                    _this.green_1.x += 80;
                    _this.green_1.y = 210;
                }
                else {
                    _this.green_1.y += 80;
                }
                _this.space1Boxes.addChild(_this.green_1);
            }
        }

        else if (_this.mSquare1 > 0) {
            _this.green_1 = _this.add.sprite(150, 210, 'pink_1');
            _this.green_1.name = '12';
            _this.space1Boxes.addChild(_this.green_1);
            for (let i = 1; i < _this.mSquare1; i++) {
                _this.green_1 = _this.add.sprite(0, 0, 'pink_1');
                _this.green_1.name = '12';
                _this.green_1.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x;
                _this.green_1.y = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).y;
                if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).y == 370) {
                    _this.green_1.x += 80;
                    _this.green_1.y = 210;
                }
                else {
                    _this.green_1.y += 80;
                }
                _this.space1Boxes.addChild(_this.green_1);
            }
        }
        //Adds the big squares to the space, that is green and pink respectively - Only from the second expression.
        //pink to green
        if (_this.mSquare2 > 0) {
            if (_this.mSquare1 == 0) {
                _this.green_1 = _this.add.sprite(150, 210, 'green_1');
                _this.space1Boxes.addChild(_this.green_1);
            }
            else {
                _this.green_1 = _this.add.sprite(0, 0, 'green_1');
                _this.green_1.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x;
                _this.green_1.y = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).y;
                if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).y == 370) {
                    _this.green_1.x += 80;
                    _this.green_1.y = 210;
                }
                else {
                    _this.green_1.y += 80;
                }
                _this.space1Boxes.addChild(_this.green_1);
            }
            _this.green_1.name = '11';
            for (let i = 1; i < _this.mSquare2; i++) {
                _this.green_1 = _this.add.sprite(0, 0, 'green_1');
                _this.green_1.name = '11';
                _this.green_1.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x;
                _this.green_1.y = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).y;
                if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).y == 370) {
                    _this.green_1.x += 80;
                    _this.green_1.y = 210;
                }
                else {
                    _this.green_1.y += 80;
                }
                _this.space1Boxes.addChild(_this.green_1);
            }
        }
        //green to pink
        else if (_this.mSquare2 < 0) {
            if (_this.mSquare1 == 0) {
                _this.green_1 = _this.add.sprite(150, 210, 'pink_1');
                _this.space1Boxes.addChild(_this.green_1);
            }
            else {
                _this.green_1 = _this.add.sprite(0, 0, 'pink_1');
                _this.green_1.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x;
                _this.green_1.y = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).y;
                if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).y == 370) {
                    _this.green_1.x += 80;
                    _this.green_1.y = 210;
                }
                else {
                    _this.green_1.y += 80;
                }
                _this.space1Boxes.addChild(_this.green_1);
            }
            _this.green_1.name = '12';
            for (let i = 1; i < -_this.mSquare2; i++) {
                _this.green_1 = _this.add.sprite(0, 0, 'pink_1');
                _this.green_1.name = '12';
                _this.green_1.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x;
                _this.green_1.y = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).y;
                if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).y == 370) {
                    _this.green_1.x += 80;
                    _this.green_1.y = 210;
                }
                else {
                    _this.green_1.y += 80;
                }
                _this.space1Boxes.addChild(_this.green_1);
            }
        }
        //Adds the long strips to the space, that is green and pink respectively - Only from the first expression.
        if (_this.mLinear1 < 0) {
            _this.green_1 = _this.add.sprite(490, 210, 'green_2');
            _this.green_1.name = '21';
            _this.space2Boxes.addChild(_this.green_1);
            for (let i = 1; i < -_this.mLinear1; i++) {
                _this.green_1 = _this.add.sprite(0, 0, 'green_2');
                _this.green_1.name = '21';
                _this.green_1.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x;
                _this.green_1.y = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).y;
                if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).y == 370) {
                    _this.green_1.x += 40;
                    _this.green_1.y = 210;
                }
                else {
                    _this.green_1.y += 80;
                }
                _this.space2Boxes.addChild(_this.green_1);
            }
        }
        else if (_this.mLinear1 > 0) {
            _this.green_1 = _this.add.sprite(490, 210, 'pink_2');
            _this.green_1.name = '22';
            _this.space2Boxes.addChild(_this.green_1);
            for (let i = 1; i < _this.mLinear1; i++) {
                _this.green_1 = _this.add.sprite(0, 0, 'pink_2');
                _this.green_1.name = '22';
                _this.green_1.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x;
                _this.green_1.y = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).y;
                if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).y == 370) {
                    _this.green_1.x += 40;
                    _this.green_1.y = 210;
                }
                else {
                    _this.green_1.y += 80;
                }
                _this.space2Boxes.addChild(_this.green_1);
            }
        }
        //Adds the long strips to the space, that is green and pink respectively - Only from the second expression.
        if (_this.mLinear2 > 0) {
            if (_this.mLinear1 == 0) {
                _this.green_1 = _this.add.sprite(490, 210, 'green_2');
                _this.space2Boxes.addChild(_this.green_1);
            }
            else {
                _this.green_1 = _this.add.sprite(0, 0, 'green_2');
                _this.green_1.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x;
                _this.green_1.y = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).y;
                if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).y == 370) {
                    _this.green_1.x += 40;
                    _this.green_1.y = 210;
                }
                else {
                    _this.green_1.y += 80;
                }
                _this.space2Boxes.addChild(_this.green_1);
            }
            _this.green_1.name = '21';
            for (let i = 1; i < _this.mLinear2; i++) {
                _this.green_1 = _this.add.sprite(0, 0, 'green_2');
                _this.green_1.name = '21';
                _this.green_1.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x;
                _this.green_1.y = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).y;
                if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).y == 370) {
                    _this.green_1.x += 40;
                    _this.green_1.y = 210;
                }
                else {
                    _this.green_1.y += 80;
                }
                _this.space2Boxes.addChild(_this.green_1);
            }
        }
        else if (_this.mLinear2 < 0) {
            if (_this.mLinear1 == 0) {
                _this.green_1 = _this.add.sprite(490, 210, 'pink_2');
                _this.space2Boxes.addChild(_this.green_1);
            }
            else {
                _this.green_1 = _this.add.sprite(0, 0, 'pink_2');
                _this.green_1.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x;
                _this.green_1.y = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).y;
                if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).y == 370) {
                    _this.green_1.x += 40;
                    _this.green_1.y = 210;
                }
                else {
                    _this.green_1.y += 80;
                }
                _this.space2Boxes.addChild(_this.green_1);
            }
            _this.green_1.name = '22';
            for (let i = 1; i < -_this.mLinear2; i++) {
                _this.green_1 = _this.add.sprite(0, 0, 'pink_2');
                _this.green_1.name = '22';
                _this.green_1.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x;
                _this.green_1.y = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).y;
                if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).y == 370) {
                    _this.green_1.x += 40;
                    _this.green_1.y = 210;
                }
                else {
                    _this.green_1.y += 80;
                }
                _this.space2Boxes.addChild(_this.green_1);
            }
        }
        //Adds the small squares to the space, that is green and pink respectively - Only from the first expression.
        if (_this.mConstant1 < 0) {
            _this.green_1 = _this.add.sprite(725, 210, 'green_3');
            _this.green_1.name = '31';
            _this.space3Boxes.addChild(_this.green_1);
            for (let i = 1; i < -_this.mConstant1; i++) {
                _this.green_1 = _this.add.sprite(0, 0, 'green_3');
                _this.green_1.name = '31';
                _this.green_1.x = _this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).x;
                _this.green_1.y = _this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).y;
                if (_this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).y >= 400) {
                    _this.green_1.x += 40;
                    _this.green_1.y = 210;
                }
                else {
                    _this.green_1.y += 27;
                }
                _this.space3Boxes.addChild(_this.green_1);
            }
        }
        else if (_this.mConstant1 > 0) {
            _this.green_1 = _this.add.sprite(725, 210, 'pink_3');
            _this.green_1.name = '32';
            _this.space3Boxes.addChild(_this.green_1);
            for (let i = 1; i < _this.mConstant1; i++) {
                _this.green_1 = _this.add.sprite(0, 0, 'pink_3');
                _this.green_1.name = '32';
                _this.green_1.x = _this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).x;
                _this.green_1.y = _this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).y;
                if (_this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).y >= 400) {
                    _this.green_1.x += 40;
                    _this.green_1.y = 210;
                }
                else {
                    _this.green_1.y += 27;
                }
                _this.space3Boxes.addChild(_this.green_1);
            }
        }
        //Adds the small squares to the space, that is green and pink respectively - Only from the second expression.
        if (_this.mConstant2 > 0) {
            if (_this.mConstant1 == 0) {
                _this.green_1 = _this.add.sprite(725, 210, 'green_3');
                _this.space3Boxes.addChild(_this.green_1);
            }
            else {
                _this.green_1 = _this.add.sprite(0, 0, 'green_3');
                _this.green_1.x = _this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).x;
                _this.green_1.y = _this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).y;
                if (_this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).y >= 400) {
                    _this.green_1.x += 40;
                    _this.green_1.y = 210;
                }
                else {
                    _this.green_1.y += 27;
                }
                _this.space3Boxes.addChild(_this.green_1);
            }
            _this.green_1.name = '31'
            for (let i = 1; i < _this.mConstant2; i++) {
                _this.green_1 = _this.add.sprite(0, 0, 'green_3');
                _this.green_1.name = '31';
                _this.green_1.x = _this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).x;
                _this.green_1.y = _this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).y;
                if (_this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).y >= 400) {
                    _this.green_1.x += 40;
                    _this.green_1.y = 210;
                }
                else {
                    _this.green_1.y += 27;
                }
                _this.space3Boxes.addChild(_this.green_1);
            }
        }
        else if (_this.mConstant2 < 0) {
            if (_this.mConstant1 == 0) {
                _this.green_1 = _this.add.sprite(725, 210, 'pink_3');
                _this.space3Boxes.addChild(_this.green_1);
            }
            else {
                _this.green_1 = _this.add.sprite(0, 0, 'pink_3');
                _this.green_1.x = _this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).x;
                _this.green_1.y = _this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).y;
                if (_this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).y >= 400) {
                    _this.green_1.x += 40;
                    _this.green_1.y = 210;
                }
                else {
                    _this.green_1.y += 27;
                }
                _this.space3Boxes.addChild(_this.green_1);
            }
            _this.green_1.name = '32'
            for (let i = 1; i < -_this.mConstant2; i++) {
                _this.green_1 = _this.add.sprite(0, 0, 'pink_3');
                _this.green_1.name = '32'
                _this.green_1.x = _this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).x;
                _this.green_1.y = _this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).y;
                if (_this.space3Boxes.getChildAt(_this.space3Boxes.length - 1).y >= 400) {
                    _this.green_1.x += 40;
                    _this.green_1.y = 210;
                }
                else {
                    _this.green_1.y += 27;
                }
                _this.space3Boxes.addChild(_this.green_1);
            }
        }

        if (_this.numberOfQuestions == 0) {
            let hand = _this.add.image(200, 200, 'hand');
            _this.handTween = _this.add.tween(hand);
            _this.handTween.to({ x: 57, y: 170 }, 2000, 'Linear', true, 0);
            _this.handTween.onComplete.add(function () {
                _this.clickSound.play();
                hand.destroy();
            });
        }

        // _this.textBox.y -= 20;

        _this.symbol_1.frame = 1;
        _this.symbol_2.frame = 0;
        _this.symbol_3.frame = 0;

        _this.symbol_1.inputEnabled = true;
        _this.symbol_1.input.useHandCursor = true;
        _this.symbol_1.events.onInputDown.add(_this.mergeSymbolClicked);
    },
    //Merging operation done on the available boxes.
    mergeSymbolClicked: function () {
        _this.clickSound.play();
        _this.symbol_1.events.onInputDown.removeAll();
        _this.symbol_1.frame = 0;
        //Merging of the larger squares.
        for (let k = 0, i = _this.space1Boxes.length - 1; k < Math.abs(_this.mSquare2); k++, i--) {
            _this.time.events.add(1000 * (k), () => {
                if (_this.space1Boxes.getChildAt(i).name[1] == '1') {
                    if (i - Math.abs(_this.mSquare2) >= 0 && _this.space1Boxes.getChildAt(i - Math.abs(_this.mSquare2)).name[1] == '2') {
                        _this.mergeTween = _this.add.tween(_this.space1Boxes.getChildAt(i));
                        _this.mergeTween.to({ x: _this.space1Boxes.getChildAt(i - Math.abs(_this.mSquare2)).x, y: _this.space1Boxes.getChildAt(i - Math.abs(_this.mSquare2)).y }, 500, 'Linear', true, 0);
                        console.log('Value: ' + i - Math.abs(_this.mSquare2))
                        _this.mergeTween.onComplete.add(function () {
                            _this.space1Boxes.getChildAt(i).visible = false;
                            _this.space1Boxes.getChildAt(i - Math.abs(_this.mSquare2)).visible = false;
                        });
                    }
                }
                else {
                    if (i - Math.abs(_this.mSquare2) >= 0 && _this.space1Boxes.getChildAt(i - Math.abs(_this.mSquare2)).name[1] == '1') {
                        _this.mergeTween = _this.add.tween(_this.space1Boxes.getChildAt(i));
                        _this.mergeTween.to({ x: _this.space1Boxes.getChildAt(i - Math.abs(_this.mSquare2)).x, y: _this.space1Boxes.getChildAt(i - Math.abs(_this.mSquare2)).y }, 500, 'Linear', true, 0);
                        console.log('Value: ' + i - Math.abs(_this.mSquare2))
                        _this.mergeTween.onComplete.add(function () {
                            _this.space1Boxes.getChildAt(i).visible = false;
                            _this.space1Boxes.getChildAt(i - Math.abs(_this.mSquare2)).visible = false;
                        });
                        _this.time.events.add(500 * (k + 1), () => {

                        });
                    }
                }
            });
        }
        //Merging of the long strips.
        for (let k = 0, i = _this.space2Boxes.length - 1; k < Math.abs(_this.mLinear2); k++, i--) {
            _this.time.events.add(1000 * (k), () => {
                if (_this.space2Boxes.getChildAt(i).name[1] == '1') {
                    if (i - Math.abs(_this.mLinear2) >= 0 && _this.space2Boxes.getChildAt(i - Math.abs(_this.mLinear2)).name[1] == '2') {
                        _this.mergeTween = _this.add.tween(_this.space2Boxes.getChildAt(i));
                        _this.mergeTween.to({ x: _this.space2Boxes.getChildAt(i - Math.abs(_this.mLinear2)).x, y: _this.space2Boxes.getChildAt(i - Math.abs(_this.mLinear2)).y }, 500, 'Linear', true, 0);
                        console.log('Value: ' + i - Math.abs(_this.mLinear2))
                        _this.mergeTween.onComplete.add(function () {
                            _this.space2Boxes.getChildAt(i).visible = false;
                            _this.space2Boxes.getChildAt(i - Math.abs(_this.mLinear2)).visible = false;
                        });
                    }
                }
                else {
                    if (i - Math.abs(_this.mLinear2) >= 0 && _this.space2Boxes.getChildAt(i - Math.abs(_this.mLinear2)).name[1] == '1') {
                        _this.mergeTween = _this.add.tween(_this.space2Boxes.getChildAt(i));
                        _this.mergeTween.to({ x: _this.space2Boxes.getChildAt(i - Math.abs(_this.mLinear2)).x, y: _this.space2Boxes.getChildAt(i - Math.abs(_this.mLinear2)).y }, 500, 'Linear', true, 0);
                        console.log('Value: ' + i - Math.abs(_this.mLinear2))
                        _this.mergeTween.onComplete.add(function () {
                            _this.space2Boxes.getChildAt(i).visible = false;
                            _this.space2Boxes.getChildAt(i - Math.abs(_this.mLinear2)).visible = false;
                        });
                    }
                }
            });
        }
        //Merging of the smaller squares
        for (let k = 0, i = _this.space3Boxes.length - 1; k < Math.abs(_this.mConstant2); k++, i--) {
            _this.time.events.add(1000 * (k), () => {
                if (_this.space3Boxes.getChildAt(i).name[1] == '1') {
                    if (i - Math.abs(_this.mConstant2) >= 0 && _this.space3Boxes.getChildAt(i - Math.abs(_this.mConstant2)).name[1] == '2') {
                        _this.mergeTween = _this.add.tween(_this.space3Boxes.getChildAt(i));
                        _this.mergeTween.to({ x: _this.space3Boxes.getChildAt(i - Math.abs(_this.mConstant2)).x, y: _this.space3Boxes.getChildAt(i - Math.abs(_this.mConstant2)).y }, 500, 'Linear', true, 0);
                        console.log('Value: ' + i - Math.abs(_this.mConstant2))
                        _this.mergeTween.onComplete.add(function () {
                            _this.space3Boxes.getChildAt(i).visible = false;
                            _this.space3Boxes.getChildAt(i - Math.abs(_this.mConstant2)).visible = false;
                        });
                    }
                }
                else {
                    if (i - Math.abs(_this.mConstant2) >= 0 && _this.space3Boxes.getChildAt(i - Math.abs(_this.mConstant2)).name[1] == '1') {
                        _this.mergeTween = _this.add.tween(_this.space3Boxes.getChildAt(i));
                        _this.mergeTween.to({ x: _this.space3Boxes.getChildAt(i - Math.abs(_this.mConstant2)).x, y: _this.space3Boxes.getChildAt(i - Math.abs(_this.mConstant2)).y }, 500, 'Linear', true, 0);
                        console.log('Value: ' + i - Math.abs(_this.mConstant2))
                        _this.mergeTween.onComplete.add(function () {
                            _this.space3Boxes.getChildAt(i).visible = false;
                            _this.space3Boxes.getChildAt(i - Math.abs(_this.mConstant2)).visible = false;
                        });
                    }
                }
            });
        }

        let delay1 = 0;
        let delay2 = 0;
        let delay3 = 0;

        if (Math.abs(_this.mSquare1 + _this.mSquare2) < Math.abs(_this.mSquare1)) {
            delay1 = Math.abs(_this.mSquare1) > Math.abs(_this.mSquare2) ? Math.abs(_this.mSquare2) : Math.abs(_this.mSquare1);
        }
        if (Math.abs(_this.mLinear1 + _this.mLinear2) < Math.abs(_this.mLinear1)) {
            delay2 = Math.abs(_this.mLinear1) > Math.abs(_this.mLinear2) ? Math.abs(_this.mLinear2) : Math.abs(_this.mLinear1);
        }
        if (Math.abs(_this.mConstant1 + _this.mConstant2) < Math.abs(_this.mConstant1)) {
            delay3 = Math.abs(_this.mConstant1) > Math.abs(_this.mConstant2) ? Math.abs(_this.mConstant2) : Math.abs(_this.mConstant1);
        }

        let delay = delay1 > delay2 ? (delay1 > delay3 ? delay1 : delay3) : (delay2 > delay3 ? delay2 : delay3);

        console.log(delay, "delay.....");
        //Adding the numberpad and the answer box.
        if (((_this.mSquare1 > 0 && _this.mSquare2 < 0) || (_this.mSquare1 < 0 && _this.mSquare2 > 0) || (_this.mSquare1 == 0 && (_this.mSquare2 < 0 || _this.mSquare2 > 0)) ||
            (_this.mSquare2 == 0 && (_this.mSquare1 < 0 || _this.mSquare1 > 0)) || (_this.mSquare1 == 0 && _this.mSquare2 == 0))
            && ((_this.mLinear1 > 0 && _this.mLinear2 < 0) || (_this.mLinear1 < 0 && _this.mLinear2 > 0) || (_this.mLinear1 == 0 && (_this.mLinear2 < 0 || _this.mLinear2 > 0)) ||
                (_this.mLinear2 == 0 && (_this.mLinear1 < 0 || _this.mLinear1 > 0)) || (_this.mLinear1 == 0 && _this.mLinear2 == 0)) &&
            ((_this.mConstant1 > 0 && _this.mConstant2 < 0) || (_this.mConstant1 < 0 && _this.mConstant2 > 0) || (_this.mConstant1 == 0 && (_this.mConstant2 < 0 || _this.mConstant2 > 0)) ||
                (_this.mConstant2 == 0 && (_this.mConstant1 < 0 || _this.mConstant1 > 0)) || (_this.mConstant1 == 0 && _this.mConstant2 == 0))) {
            console.log("without delay");
            _this.time.events.add(100, () => {
                _this.tempText.destroy();
                _this.tempText = _this.add.text(0, 0, '=');
                _this.tempText.visible = false;
                _this.tempText.destroy();
                _this.textBox.destroy();
                _this.textBox = _this.add.sprite(140, 60, 'Text box_2');
                _this.textBox.scale.setTo(0.8);
                _this.questionText1 = _this.add.text(13, 19, _this.questionWithAnswer);
                _this.questionText2 = _this.add.text(438, 19, ' =');
                _this.questionText3 = _this.add.text(555, 19, _this.variable[_this.choice] + _this.power + ' + ');
                _this.questionText4 = _this.add.text(675, 19, _this.variable[_this.choice] + ' + ');
                _this.questionText1.fill = '#65B4C3';
                _this.questionText2.fill = '#65B4C3';
                _this.questionText3.fill = '#65B4C3';
                _this.questionText4.fill = '#65B4C3';
                _this.textBox.addChild(_this.questionText1);
                _this.textBox.addChild(_this.questionText2);
                _this.textBox.addChild(_this.questionText3);
                _this.textBox.addChild(_this.questionText4);
                _this.addAnswerBoxAndHighlight();
            });
        }
        else {
            console.log("delay");
            _this.time.events.add(1000 * (delay), () => {
                _this.tempText.destroy();
                _this.tempText = _this.add.text(0, 0, '=');
                _this.tempText.visible = false;
                _this.tempText.destroy();
                _this.textBox.destroy();
                _this.textBox = _this.add.sprite(140, 60, 'Text box_2');
                _this.textBox.scale.setTo(0.8);
                _this.questionText1 = _this.add.text(13, 19, _this.questionWithAnswer);
                _this.questionText2 = _this.add.text(438, 19, ' =');
                _this.questionText3 = _this.add.text(555, 19, _this.variable[_this.choice] + _this.power + ' + ');
                _this.questionText4 = _this.add.text(675, 19, _this.variable[_this.choice] + ' + ');
                _this.questionText1.fill = '#65B4C3';
                _this.questionText2.fill = '#65B4C3';
                _this.questionText3.fill = '#65B4C3';
                _this.questionText4.fill = '#65B4C3';
                _this.textBox.addChild(_this.questionText1);
                _this.textBox.addChild(_this.questionText2);
                _this.textBox.addChild(_this.questionText3);
                _this.textBox.addChild(_this.questionText4);
                _this.addAnswerBoxAndHighlight();
            });
        }

    },
    //Adds the three answer boxes and highlight them.
    addAnswerBoxAndHighlight: function () {
        console.log("answerbox....");

        _this.AnswerBox2 = _this.add.sprite(608, 17, 'Text box_5');
        _this.AnswerBox3 = _this.add.sprite(726, 17, 'Text box_5');
        _this.AnswerBox1 = _this.add.sprite(485, 17, 'Text box_5');

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

        _this.textBox.addChild(_this.AnswerBox1);
        _this.textBox.addChild(_this.AnswerBox2);
        _this.textBox.addChild(_this.AnswerBox3);

    },
    //Adding the green large square to the top space.
    m2S1: function () {
        _this.clickSound.play();
        if (_this.limit1 + 6 > 36) {
            return;
        }
        _this.limit1 += 6;
        let square;
        square = _this.add.sprite(300, 200, 'green_1');
        square.name = '11';
        if (_this.space1Boxes.length == 0) {
            _this.space1Boxes.addChild(square);
        }
        else {
            if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).name[0] == '1') {
                square.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 100;
                _this.space1Boxes.addChild(square);
            }
            else if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).name[0] == '2') {
                square.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 40;
                _this.space1Boxes.addChild(square);
            }
            else {
                square.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 40;
                _this.space1Boxes.addChild(square);
            }
        }
    },
    //Adding the pink large square to the top space.
    mR1: function () {
        _this.clickSound.play();
        if (_this.limit1 + 3 > 36) {
            return;
        }
        _this.limit1 += 3;
        let rectangle;
        rectangle = _this.add.sprite(300, 200, 'green_2');

        rectangle.name = '21';
        if (_this.space1Boxes.length == 0) {
            _this.space1Boxes.addChild(rectangle);
        }
        else {
            if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).name[0] == '1') {
                rectangle.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 100;
                _this.space1Boxes.addChild(rectangle);
            }
            else if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).name[0] == '2') {
                rectangle.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 40;
                _this.space1Boxes.addChild(rectangle);
            }
            else {
                rectangle.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 40;
                _this.space1Boxes.addChild(rectangle);
            }
        }
    },
    //Adding the green long strips to the top space.
    mS1: function () {
        _this.clickSound.play();
        if (_this.limit1 + 1 > 36) {
            return;
        }
        _this.limit1 += 1;
        let ssquare;
        ssquare = _this.add.sprite(300, 200, 'green_3');
        ssquare.name = '31';
        if (_this.space1Boxes.length == 0) {
            _this.space1Boxes.addChild(ssquare);
        }
        else {
            for (let i = _this.space1Boxes.length - 1; i >= 0; i--) {
                if (_this.space1Boxes.getChildAt(i).name[0] == '3') {
                    if (_this.space1Boxes.getChildAt(i).y == 260) {
                        break;
                    }
                    else {
                        ssquare.x = _this.space1Boxes.getChildAt(i).x;
                        ssquare.y = _this.space1Boxes.getChildAt(i).y + 30;
                    }
                    _this.space1Boxes.addChildAt(ssquare, i + 1);
                    return;
                }
            }

            if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).name[0] == '1') {
                ssquare.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 100;
                _this.space1Boxes.addChild(ssquare);
            }
            else if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).name[0] == '2') {
                ssquare.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 40;
                _this.space1Boxes.addChild(ssquare);
            }
            else {
                ssquare.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 40;
                _this.space1Boxes.addChild(ssquare);
            }
        }
    },
    //Adding the pink long strips to the top space.
    m2S2: function () {
        _this.clickSound.play();
        if (_this.limit1 + 6 > 36) {
            return;
        }
        _this.limit1 += 6;
        let square;
        square = _this.add.sprite(300, 200, 'pink_1');
        square.name = '12';
        if (_this.space1Boxes.length == 0) {
            _this.space1Boxes.addChild(square);
        }
        else {
            if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).name[0] == '1') {
                square.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 100;
                _this.space1Boxes.addChild(square);
            }
            else if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).name[0] == '2') {
                square.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 40;
                _this.space1Boxes.addChild(square);
            }
            else {
                square.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 40;
                _this.space1Boxes.addChild(square);
            }
        }
    },
    //Adding the green small strips to the top space.
    mR2: function () {
        _this.clickSound.play();
        if (_this.limit1 + 3 > 36) {
            return;
        }
        _this.limit1 += 3;
        let rectangle;
        rectangle = _this.add.sprite(300, 200, 'pink_2');
        rectangle.name = '22';
        if (_this.space1Boxes.length == 0) {
            _this.space1Boxes.addChild(rectangle);
        }
        else {
            if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).name[0] == '1') {
                rectangle.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 100;
                _this.space1Boxes.addChild(rectangle);
            }
            else if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).name[0] == '2') {
                rectangle.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 40;
                _this.space1Boxes.addChild(rectangle);
            }
            else {
                rectangle.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 40;
                _this.space1Boxes.addChild(rectangle);
            }
        }
    },
    //Adding the pink small strips to the top space.
    mS2: function () {
        _this.clickSound.play();
        if (_this.limit1 + 1 > 36) {
            return;
        }
        _this.limit1 += 1;
        let ssquare;
        ssquare = _this.add.sprite(300, 200, 'pink_3');
        ssquare.name = '32';
        if (_this.space1Boxes.length == 0) {
            _this.space1Boxes.addChild(ssquare);
        }
        else {
            for (let i = _this.space1Boxes.length - 1; i >= 0; i--) {
                if (_this.space1Boxes.getChildAt(i).name[0] == '3') {
                    if (_this.space1Boxes.getChildAt(i).y == 260) {
                        break;
                    }
                    else {
                        ssquare.x = _this.space1Boxes.getChildAt(i).x;
                        ssquare.y = _this.space1Boxes.getChildAt(i).y + 30;
                    }
                    _this.space1Boxes.addChildAt(ssquare, i + 1);
                    return;
                }
            }

            if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).name[0] == '1') {
                ssquare.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 100;
                _this.space1Boxes.addChild(ssquare);
            }
            else if (_this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).name[0] == '2') {
                ssquare.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 40;
                _this.space1Boxes.addChild(ssquare);
            }
            else {
                ssquare.x = _this.space1Boxes.getChildAt(_this.space1Boxes.length - 1).x + 40;
                _this.space1Boxes.addChild(ssquare);
            }
        }
    },
    //Adding the green large square to the bottom space.
    m2S3: function () {
        _this.clickSound.play();
        if (_this.limit2 + 6 > 36) {
            return;
        }
        _this.limit2 += 6;
        let square;
        square = _this.add.sprite(300, 380, 'green_1');
        square.name = '11';
        if (_this.space2Boxes.length == 0) {
            _this.space2Boxes.addChild(square);
        }
        else {
            if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '1') {
                square.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 100;
                _this.space2Boxes.addChild(square);
            }
            else if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '2') {
                square.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                _this.space2Boxes.addChild(square);
            }
            else {
                square.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                _this.space2Boxes.addChild(square);
            }
        }
    },
    //Adding the pink large square to the bottom space.
    mR3: function () {
        _this.clickSound.play();
        if (_this.limit2 + 3 > 36) {
            return;
        }
        _this.limit2 += 3;
        let rectangle;
        rectangle = _this.add.sprite(300, 380, 'green_2');

        rectangle.name = '21';
        if (_this.space2Boxes.length == 0) {
            _this.space2Boxes.addChild(rectangle);
        }
        else {
            if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '1') {
                rectangle.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 100;
                _this.space2Boxes.addChild(rectangle);
            }
            else if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '2') {
                rectangle.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                _this.space2Boxes.addChild(rectangle);
            }
            else {
                rectangle.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                _this.space2Boxes.addChild(rectangle);
            }
        }
    },
    //Adding the green long strips to the bottom space.
    mS3: function () {
        _this.clickSound.play();
        if (_this.limit2 + 1 > 36) {
            return;
        }
        _this.limit2 += 1;
        let ssquare;
        ssquare = _this.add.sprite(300, 380, 'green_3');
        ssquare.name = '31';
        if (_this.space2Boxes.length == 0) {
            _this.space2Boxes.addChild(ssquare);
        }
        else {
            for (let i = _this.space2Boxes.length - 1; i >= 0; i--) {
                if (_this.space2Boxes.getChildAt(i).name[0] == '3') {
                    if (_this.space2Boxes.getChildAt(i).y == 440) {
                        break;
                    }
                    else {
                        ssquare.x = _this.space2Boxes.getChildAt(i).x;
                        ssquare.y = _this.space2Boxes.getChildAt(i).y + 30;
                    }
                    _this.space2Boxes.addChildAt(ssquare, i + 1);
                    return;
                }
            }

            if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '1') {
                ssquare.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 100;
                _this.space2Boxes.addChild(ssquare);
            }
            else if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '2') {
                ssquare.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                _this.space2Boxes.addChild(ssquare);
            }
            else {
                ssquare.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                _this.space2Boxes.addChild(ssquare);
            }
        }
    },
    //Adding the pink long strips to the bottom space.
    m2S4: function () {
        _this.clickSound.play();
        if (_this.limit2 + 6 > 36) {
            return;
        }
        _this.limit2 += 6;
        let square;
        square = _this.add.sprite(300, 380, 'pink_1');
        square.name = '12';
        if (_this.space2Boxes.length == 0) {
            _this.space2Boxes.addChild(square);
        }
        else {
            if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '1') {
                square.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 100;
                _this.space2Boxes.addChild(square);
            }
            else if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '2') {
                square.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                _this.space2Boxes.addChild(square);
            }
            else {
                square.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                _this.space2Boxes.addChild(square);
            }
        }
    },
    //Adding the green small strips to the bottom space.
    mR4: function () {
        _this.clickSound.play();
        if (_this.limit2 + 3 > 36) {
            return;
        }
        _this.limit2 += 3;
        let rectangle;
        rectangle = _this.add.sprite(300, 380, 'pink_2');
        rectangle.name = '22';
        if (_this.space2Boxes.length == 0) {
            _this.space2Boxes.addChild(rectangle);
        }
        else {
            if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '1') {
                rectangle.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 100;
                _this.space2Boxes.addChild(rectangle);
            }
            else if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '2') {
                rectangle.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                _this.space2Boxes.addChild(rectangle);
            }
            else {
                rectangle.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                _this.space2Boxes.addChild(rectangle);
            }
        }
    },
    //Adding the pink small strips to the bottom space.
    mS4: function () {
        _this.clickSound.play();
        if (_this.limit2 + 1 > 36) {
            return;
        }
        _this.limit2 += 1;
        let ssquare;
        ssquare = _this.add.sprite(300, 380, 'pink_3');
        ssquare.name = '32';
        if (_this.space2Boxes.length == 0) {
            _this.space2Boxes.addChild(ssquare);
        }
        else {
            for (let i = _this.space2Boxes.length - 1; i >= 0; i--) {
                if (_this.space2Boxes.getChildAt(i).name[0] == '3') {
                    if (_this.space2Boxes.getChildAt(i).y == 440) {
                        break;
                    }
                    else {
                        ssquare.x = _this.space2Boxes.getChildAt(i).x;
                        ssquare.y = _this.space2Boxes.getChildAt(i).y + 30;
                    }
                    _this.space2Boxes.addChildAt(ssquare, i + 1);
                    return;
                }
            }

            if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '1') {
                ssquare.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 100;
                _this.space2Boxes.addChild(ssquare);
            }
            else if (_this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).name[0] == '2') {
                ssquare.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                _this.space2Boxes.addChild(ssquare);
            }
            else {
                ssquare.x = _this.space2Boxes.getChildAt(_this.space2Boxes.length - 1).x + 40;
                _this.space2Boxes.addChild(ssquare);
            }
        }
    },
    //Moving the eraser.
    eraserUpdate: function (target) {
        console.log("eraserUpdate")
        _this.world.bringToTop(_this.eraser)
        _this.eraser.scale.setTo(0.8)
    },
    //Erasing the top space objects.
    eraserDrop1: function (target) {
        console.log("eraserDrop")
        for (let i = 0; i < _this.space1Boxes.length; i++) {
            if (_this.checkOverlap(target, _this.space1Boxes.getChildAt(i))) {
                if (_this.space1Boxes.getChildAt(i).name == '11' || _this.space1Boxes.getChildAt(i).name == '12') {
                    _this.limit1 -= 6;
                }
                else if (_this.space1Boxes.getChildAt(i).name == '21' || _this.space1Boxes.getChildAt(i).name == '22') {
                    _this.limit1 -= 3;
                }
                else {
                    _this.limit1 -= 1;
                }
                _this.space1Boxes.removeChild(_this.space1Boxes.getChildAt(i));
                break;
            }
        }
        if (_this.space1Boxes.length == 0) {
            _this.eraser.destroy();
            _this.eraser = _this.add.sprite(800, 85, 'eraser');
            _this.eraser.inputEnabled = true;
            _this.eraser.input.enableDrag(true);
            _this.eraser.events.onDragUpdate.add(_this.eraserUpdate, _this);
            _this.eraser.events.onDragStop.add(_this.eraserDrop1, _this);
            return;
        }
        _this.space1Boxes.getChildAt(0).x = 300;
        _this.space1Boxes.getChildAt(0).y = 200;
        for (let i = 1; i < _this.space1Boxes.length; i++) {
            if (_this.space1Boxes.getChildAt(i - 1).name == '11' || _this.space1Boxes.getChildAt(i - 1).name == '12') {
                _this.space1Boxes.getChildAt(i).x = _this.space1Boxes.getChildAt(i - 1).x + 100;
                _this.space1Boxes.getChildAt(i).y = 200;
            }
            else if (_this.space1Boxes.getChildAt(i - 1).name == '21' || _this.space1Boxes.getChildAt(i - 1).name == '22') {
                _this.space1Boxes.getChildAt(i).x = _this.space1Boxes.getChildAt(i - 1).x + 40;
                _this.space1Boxes.getChildAt(i).y = 200;
            }
            else if (_this.space1Boxes.getChildAt(i - 1).y == 260) {
                _this.space1Boxes.getChildAt(i).x = _this.space1Boxes.getChildAt(i - 1).x + 40;
                _this.space1Boxes.getChildAt(i).y = 200;
            }
            else {
                if (_this.space1Boxes.getChildAt(i).name == '31' || _this.space1Boxes.getChildAt(i).name == '32') {
                    _this.space1Boxes.getChildAt(i).x = _this.space1Boxes.getChildAt(i - 1).x;
                    _this.space1Boxes.getChildAt(i).y = _this.space1Boxes.getChildAt(i - 1).y + 30;
                }
                else {
                    _this.space1Boxes.getChildAt(i).x = _this.space1Boxes.getChildAt(i - 1).x + 40;
                    _this.space1Boxes.getChildAt(i).y = 200;
                }
            }
        }
        _this.eraser.destroy();
        _this.eraser = _this.add.sprite(800, 85, 'eraser');
        _this.eraser.inputEnabled = true;
        _this.eraser.input.enableDrag(true);
        _this.eraser.events.onDragUpdate.add(_this.eraserUpdate, _this);
        _this.eraser.events.onDragStop.add(_this.eraserDrop1, _this);
    },
    //Erasing the bottom space objects.
    eraserDrop2: function (target) {
        console.log("eraserDrop")
        for (let i = 0; i < _this.space2Boxes.length; i++) {
            if (_this.checkOverlap(target, _this.space2Boxes.getChildAt(i))) {
                if (_this.space2Boxes.getChildAt(i).name == '11' || _this.space2Boxes.getChildAt(i).name == '12') {
                    _this.limit2 -= 6;
                }
                else if (_this.space2Boxes.getChildAt(i).name == '21' || _this.space2Boxes.getChildAt(i).name == '22') {
                    _this.limit2 -= 3;
                }
                else {
                    _this.limit2 -= 1;
                }
                _this.space2Boxes.removeChild(_this.space2Boxes.getChildAt(i));
                break;
            }
        }
        if (_this.space2Boxes.length == 0) {
            _this.eraser.destroy();
            _this.eraser = _this.add.sprite(800, 85, 'eraser');
            _this.eraser.inputEnabled = true;
            _this.eraser.input.enableDrag(true);
            _this.eraser.events.onDragUpdate.add(_this.eraserUpdate, _this);
            _this.eraser.events.onDragStop.add(_this.eraserDrop2, _this);
            return;
        }
        _this.space2Boxes.getChildAt(0).x = 300;
        _this.space2Boxes.getChildAt(0).y = 380;
        for (let i = 1; i < _this.space2Boxes.length; i++) {
            if (_this.space2Boxes.getChildAt(i - 1).name == '11' || _this.space2Boxes.getChildAt(i - 1).name == '12') {
                _this.space2Boxes.getChildAt(i).x = _this.space2Boxes.getChildAt(i - 1).x + 100;
                _this.space2Boxes.getChildAt(i).y = 380;
            }
            else if (_this.space2Boxes.getChildAt(i - 1).name == '21' || _this.space2Boxes.getChildAt(i - 1).name == '22') {
                _this.space2Boxes.getChildAt(i).x = _this.space2Boxes.getChildAt(i - 1).x + 40;
                _this.space2Boxes.getChildAt(i).y = 380;
            }
            else if (_this.space2Boxes.getChildAt(i - 1).y == 440) {
                _this.space2Boxes.getChildAt(i).x = _this.space2Boxes.getChildAt(i - 1).x + 40;
                _this.space2Boxes.getChildAt(i).y = 380;
            }
            else {
                if (_this.space2Boxes.getChildAt(i).name == '31' || _this.space2Boxes.getChildAt(i).name == '32') {
                    _this.space2Boxes.getChildAt(i).x = _this.space2Boxes.getChildAt(i - 1).x;
                    _this.space2Boxes.getChildAt(i).y = _this.space2Boxes.getChildAt(i - 1).y + 30;
                }
                else {
                    _this.space2Boxes.getChildAt(i).x = _this.space2Boxes.getChildAt(i - 1).x + 40;
                    _this.space2Boxes.getChildAt(i).y = 380;
                }
            }
        }
        _this.eraser.destroy();
        _this.eraser = _this.add.sprite(800, 85, 'eraser');
        _this.eraser.inputEnabled = true;
        _this.eraser.input.enableDrag(true);
        _this.eraser.events.onDragUpdate.add(_this.eraserUpdate, _this);
        _this.eraser.events.onDragStop.add(_this.eraserDrop2, _this);
    },
    //Clicking the right button from the number pad.
    rightbtnClicked: function () {
        console.log('right btn clicked')
        _this.clickSound.play();
        _this.rightbtn.inputEnabled = false;
        _this.rightbtn.input.useHandCursor = false;
        _this.rightbtn_is_Clicked = true;
        //Evaluating negative numbers.
        if (_this.finalval1.length == 0 && _this.mSquare1 - _this.mSquare2 != 1 && _this.mSquare1 - _this.mSquare2 != -1) {
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
        if (_this.finalval2.length == 0 && _this.mLinear1 - _this.mLinear2 != 1 && _this.mLinear1 - _this.mLinear2 != -1) {
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

        if (!(_this.signVal1 == '-' && _this.finalval1.length == 0 && _this.mSquare1 - _this.mSquare2 == -1 || _this.signVal1.length == 0 && _this.finalval1.length == 0 && _this.mSquare1 - _this.mSquare2 == 1 || Number(_this.signVal1 + _this.finalval1) == _this.mSquare1 - _this.mSquare2)) {
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

        if (!(_this.signVal2 == '-' && _this.finalval2.length == 0 && _this.mLinear1 - _this.mLinear2 == -1 || _this.signVal2.length == 0 && _this.finalval2.length == 0 && _this.mLinear1 - _this.mLinear2 == 1 || Number(_this.signVal2 + _this.finalval2) == _this.mLinear1 - _this.mLinear2)) {
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

        if (!(Number(_this.signVal3 + _this.finalval3) == _this.mConstant1 - _this.mConstant2)) {
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
        _this.celebrationSound.play();

        _this.AnswerBox1.frame = 0;
        _this.AnswerBox2.frame = 0;
        _this.AnswerBox3.frame = 0;

        //edited for baseurl apk
        _this.noofAttempts++;
        telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);
        //..............

        console.log(_this.noofAttempts, "_this.noofAttempts.................");
        console.log(_this.AnsTimerCount, "_this.AnsTimerCount.................");
        console.log(_this.sceneCount, "_this.sceneCount.................");
        console.log(_this.questionid, "_this.questionid.................");

        _this.starActions();
        _this.time.events.add(4000, () => {
            _this.clearAll();
            if (_this.numberOfQuestions == 6) {
                //_this.state.start('AL_SUB_G7Score');
                _this.state.start('score', true, false,gameID, _this.microConcepts);
            }
            else {
                _this.QuestionFormation();
                _this.AskingQuestion();
            }
        });
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
            _this.enterTxt1 = _this.add.text(10, 8, "" + _this.signVal1 + _this.finalval1, { fontSize: '20px' });

            if (_this.signVal1 == '+') {
                if (_this.finalval1.length == 2) {
                    _this.enterTxt1.x += 1;
                }
                else if (_this.finalval1.length == 1) {
                    _this.enterTxt1.x += 8;
                }
                else {
                    _this.enterTxt1.x += 13;
                }
            }
            else if (_this.signVal1 == '-') {
                if (_this.finalval1.length == 2) {
                    _this.enterTxt1.x += 5;
                }
                else if (_this.finalval1.length == 1) {
                    _this.enterTxt1.x += 8;
                }
                else {
                    _this.enterTxt1.x += 13;
                }
            }
            else {
                if (_this.finalval1.length == 2) {
                    _this.enterTxt1.x += 8;
                }
                else if (_this.finalval1.length == 1) {
                    _this.enterTxt1.x += 13;
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
            _this.enterTxt2 = _this.add.text(10, 8, "" + _this.signVal2 + _this.finalval2, { fontSize: '20px' });

            if (_this.signVal2 == '+') {
                if (_this.finalval2.length == 2) {
                    _this.enterTxt2.x += 1;
                }
                else if (_this.finalval2.length == 1) {
                    _this.enterTxt2.x += 8;
                }
                else {
                    _this.enterTxt2.x += 13;
                }
            }
            else if (_this.signVal2 == '-') {
                if (_this.finalval2.length == 2) {
                    _this.enterTxt2.x += 5;
                }
                else if (_this.finalval2.length == 1) {
                    _this.enterTxt2.x += 8;
                }
                else {
                    _this.enterTxt2.x += 13;
                }
            }
            else {
                if (_this.finalval2.length == 2) {
                    _this.enterTxt2.x += 8;
                }
                else if (_this.finalval2.length == 1) {
                    _this.enterTxt2.x += 13;
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
            _this.enterTxt3 = _this.add.text(10, 8, "" + _this.signVal3 + _this.finalval3, { fontSize: '20px' });

            if (_this.signVal3 == '+') {
                if (_this.finalval3.length == 2) {
                    _this.enterTxt3.x += 1;
                }
                else if (_this.finalval3.length == 1) {
                    _this.enterTxt3.x += 8;
                }
                else {
                    _this.enterTxt3.x += 13;
                }
            }
            else if (_this.signVal3 == '-') {
                if (_this.finalval3.length == 2) {
                    _this.enterTxt3.x += 5;
                }
                else if (_this.finalval3.length == 1) {
                    _this.enterTxt3.x += 8;
                }
                else {
                    _this.enterTxt3.x += 13;
                }
            }
            else {
                if (_this.finalval3.length == 2) {
                    _this.enterTxt3.x += 8;
                }
                else if (_this.finalval3.length == 1) {
                    _this.enterTxt3.x += 13;
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
    //Tween  the numberpad.
    tweenNumPad: function () {
        _this.numGroup.visible = true;
        _this.numpadTween.to({ x: 0, y: -43 }, 1000, 'Linear', true, 0);
    },
    //applying the style to the text in the answerbox.
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
        //target.fontSize = '25px';
    },
    plusSignBlue: function (x, y) {
        console.log("plusSignBlue");
        _this.pSign1 = _this.add.graphics();
        _this.pSign1.lineStyle(4, 0x65B4C3);
        _this.pSign1.moveTo(x, y);
        _this.pSign1.lineTo(x + 12, y);
    },
    //clearing the screen (seconf scene).
    clearAll: function () {
        _this.space1Boxes.destroy();
        _this.space2Boxes.destroy();
        _this.space3Boxes.destroy();

        _this.workspace.destroy();
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

        _this.Question_flag = 0;
    },
    //checking if two sprites overlap.
    checkOverlap: function (spriteA, spriteB) {
        console.log("checkOverlap")
        _this.boundsA = spriteA.getBounds();
        _this.boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(_this.boundsA, _this.boundsB);
    },
    //Adding a star to the above created six stars.
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
    },
    stopAudio: function () {
        //* clear all the timers first
        if (_this.demoAudio1Timer) clearTimeout(_this.demoAudio1Timer);
        if (_this.demoVideo1PauseTimer) clearTimeout(_this.demoVideo1PauseTimer);
        if (_this.q1Timer) clearTimeout(_this.q1Timer);
        if (_this.demoAudio2Timer) clearTimeout(_this.demoAudio2Timer);
        if (_this.q2Timer) clearTimeout(_this.q2Timer);

        if (_this.demoAudio1) {
            //console.log("removing the demo audio1");
            _this.demoAudio1.pause();
            _this.demoAudio1 = null;
            _this.demoAudio1src = null;
        }

        if (_this.demoAudio2) {
            //console.log("removing the demo audio2");
            _this.demoAudio2.pause();
            _this.demoAudio2 = null;
            _this.demoAudio2src = null;
        }

        if (_this.demoAudio3) {
            //console.log("removing the demo audio3");
            _this.demoAudio3.pause();
            _this.demoAudio3 = null;
            _this.demoAudio3src = null;
        }


        if (_this.q1Sound) {
            //console.log("removing the q1");
            _this.q1Sound.pause();
            _this.q1Sound = null;
            _this.q1Soundsrc = null;
        }

        if (_this.q2Sound) {
            //console.log("removing the q2");
            _this.q2Sound.pause();
            _this.q2Sound = null;
            _this.q2Soundsrc = null;
        }

        if (_this.q3Sound) {
            //console.log("removing the q3");
            _this.q3Sound.pause();
            _this.q3Sound = null;
            _this.q3Soundsrc = null;
        }

        _this.skip.events.onInputDown.removeAll();
        _this.skip.destroy();                //* skip button destroyed

    },
    DemoVideo: function () {


        // DEMO AUDIOS
        //* Flip button will flip the second equation means it will change the sign of all terms in second equation
        _this.demoAudio1 = document.createElement('audio');
        _this.demoAudio1src = document.createElement('source');
        _this.demoAudio1src.setAttribute("src", window.baseUrl + "questionSounds/AL-SUB-G7/" + _this.languageSelected + "/AL_SUB_G7_d1.mp3");
        _this.demoAudio1.appendChild(_this.demoAudio1src);

        //* Merge button will merge all like terms from both the equations and keep together
        _this.demoAudio2 = document.createElement('audio');
        _this.demoAudio2src = document.createElement('source');
        _this.demoAudio2src.setAttribute("src", window.baseUrl + "questionSounds/AL-SUB-G7/" + _this.languageSelected + "/AL_SUB_G7_d2.mp3");
        _this.demoAudio2.appendChild(_this.demoAudio2src);

        //* Zero pair button will zero pairing -ve and +ve in  like term
        _this.demoAudio3 = document.createElement('audio');
        _this.demoAudio3src = document.createElement('source');
        _this.demoAudio3src.setAttribute("src", window.baseUrl + "questionSounds/AL-SUB-G7/" + _this.languageSelected + "/AL_SUB_G7_d3.mp3");
        _this.demoAudio3.appendChild(_this.demoAudio3src);

        // QUESTION AUDIOS
        //*  Find the subtraction of the algebraic equations
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src",  window.baseUrl +"questionSounds/AL-SUB-G7/" +
            _this.languageSelected + "/AL_SUB_G7_a1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        //* Model the equation using algebraic tiles
        _this.q2Sound = document.createElement('audio');
        _this.q2Soundsrc = document.createElement('source');
        _this.q2Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/AL-SUB-G7/" +
            _this.languageSelected + "/AL_SUB_G7_a2.mp3");
        _this.q2Sound.appendChild(_this.q2Soundsrc);

        //* enter the answer
        _this.q3Sound = document.createElement('audio');
        _this.q3Soundsrc = document.createElement('source');
        _this.q3Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/AL-SUB-G7/" +
            _this.languageSelected + "/AL_SUB_G7_a3.mp3");
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

    q1S: function () {
        console.log("inside q1S.....")
        _this.q2Sound.play();
    },

    dA1: function () {
        _this.demoVideo_1.playbackRate = 1;
        _this.dA2();
    },

    dA2: function () {
        _this.demoAudio1Timer = setTimeout(function ()    //* demoAudio1 js timer to play demoAudio1Timer after 30 seconds.
        {
            console.log("inside demoAudio1sound.....")
            clearTimeout(_this.demoAudio1Timer);     //* clear the time once its used.
            _this.demoVideo_1.playbackRate = 0;
            _this.demoAudio2.play();
        }, 5100);
        _this.demoAudio2.addEventListener('ended', _this.dA3);

    },

    dA3: function () {
        _this.demoVideo_1.playbackRate = 1;
        _this.demoAudio3Timer = setTimeout(function ()    //* demo audio2 js timer to play demo audio2 after 37 seconds.
        {
            console.log("inside demoa3sound.....")
            clearTimeout(_this.demoAudio3Timer);         //* clear the time once its used.
            _this.demoAudio3.play();
        }, 3300);
        _this.demoAudio3.addEventListener('ended', _this.dA4);
    },

    dA4: function () {
        _this.q3Timer = setTimeout(function ()    //* q3 js timer to play 3 after 43 seconds.
        {
            console.log("inside q3sound.....")
            clearTimeout(_this.q3Timer);         //* clear the time once its used.
            _this.q3Sound.play();
        }, 3000);
    },

    showDemoVideo: function () {

        _this.demoVideo_1 = _this.add.video('ALSUBG7');
        _this.demoVideo_1.play(false);
        _this.demoVideo_1.changeSource(window.baseUrl + "assets/demoVideos/AL-SUB-G7.mp4");
        _this.video_playing = 1;
        _this.videoWorld_1 = _this.demoVideo_1.addToWorld();

        _this.q1Sound.play();
        //* Here the audios are added one after the other
        _this.q1Sound.addEventListener('ended', _this.q1S);

        _this.demoAudio1Timer = setTimeout(function ()    //* demoAudio1 js timer to play demoAudio1Timer after 30 seconds.
        {
            console.log("inside demoAudio1sound.....")
            clearTimeout(_this.demoAudio1Timer);     //* clear the time once its used.
            _this.demoVideo_1.playbackRate = 0;
            _this.demoAudio1.play();
        }, 31000);
        _this.demoAudio1.addEventListener('ended', _this.dA1);


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
