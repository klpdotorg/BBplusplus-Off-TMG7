Game.GMSS_04_G7level1 = function () { };


Game.GMSS_04_G7level1.prototype =
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
        else //console.log("Language selected: " + _this.languageSelected);

            _this.clickSound = document.createElement('audio');
        _this.clickSoundsrc = document.createElement('source');
        _this.clickSoundsrc.setAttribute("src", window.baseUrl + "sounds/ClickSound.mp3");
        _this.clickSound.appendChild(_this.clickSoundsrc);

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

        _this.wrongSound = document.createElement('audio');
        _this.wrongSoundsrc = document.createElement('source');
        _this.wrongSoundsrc.setAttribute("src", window.baseUrl + "sounds/WrongCelebrationSound.mp3");
        _this.wrongSound.appendChild(_this.wrongSoundsrc);

        _this.framechange = document.createElement('audio');
        _this.framechangesrc = document.createElement('source');
        _this.framechangesrc.setAttribute("src", window.baseUrl + "sounds/Frame_change_sound.mp3");
        _this.framechange.appendChild(_this.framechangesrc);

        _this.Ask_Question1 = _this.createAudio("GMSS_04_G7_a1");
        _this.Ask_Question2 = _this.createAudio("GMSS_04_G7_a2");

        telInitializer.gameIdInit("GMSS_04_G7", gradeSelected);// first Tele call
        console.log(gameID, "gameID...");
    },

    create: function (game) {
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
        _this.noofAttempts = 0;//total attempt to answer q question
        _this.AnsTimerCount = 0;//total time
        _this.sceneCount = 0;//no of screen
        _this.questionid = null;//always 1

        _this.AnsTimerCount = 0;
        _this.numberOfQuestions = 0;
        _this.speakerbtn;
        _this.background;
        _this.count = 0;
        _this.starsGroup;
        _this.AnswerBox;
        _this.seconds = 0;
        _this.minutes = 0;
        _this.Question_flag = 0;

        _this.count1 = 0;

        _this.counterForTimer = 0;

        _this.partACount = 0;

        _this.shapesArray = [];
        _this.shapeCount = 0;
        _this.Shape1_Flag = 0;
        _this.Shape2_Flag = 0;
        _this.Shape3_Flag = 0;
        _this.Shape4_Flag = 0;
        _this.Shape5_Flag = 0;
        _this.Shape6_Flag = 0;
        _this.Shape7_Flag = 0;

        _this.selectedBox1 = false;
        _this.selectedBox2 = false;
        _this.selectedBox3 = false;
        _this.selectedBox4 = false;

        _this.right = false;
        _this.wrong = false;

        _this.speakerbtnClicked = false;
        _this.rightbtn_Clicked = false;

        _this.background = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'BG1');
        //** include the background file, navigation bar, stars, timer objects.
        _this.navBar = _this.add.sprite(0, 0, 'navBar');

        _this.backbtn = _this.add.sprite(5, 6, 'backbtn');
        _this.backbtn.inputEnabled = true;
        _this.backbtn.input.useHandCursor = true;
        _this.backbtn.events.onInputDown.add(function () {
            _this.state.start('grade7Geometry', true, false);
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
        // _this.hintBtn.smoothed = false;
        // _this.hintBtnAnim = _this.hintBtn.animations.add('hint');
        // _this.hintBtnAnim.play(15);
        // _this.hintBtnAnim.onComplete.add(function () {
        //     _this.hintBtnAnim.play(15);
        // }, _this);
        // // _this.hintBtn.inputEnabled = true;
        // // _this.hintBtn.input.useHandCursor = true;
        // _this.hintBtn.inputEnabled = false;
        // _this.hintBtn.events.onInputDown.add(function () {
        //     //console.log("inside hintbutton function");
        //     //* show the demo video
        //     _this.hintBtn.inputEnabled = false;
        //     _this.hintBtn.input.useHandCursor = false;
        //     _this.time.events.add(1, function () {
        //         //console.log(_this.hintBtn.inputEnabled, "status of hintBtn");
        //         _this.ViewDemoVideo();
        //     });
        // });

        _this.generateStarsForTheScene(6);

        //* include variables for use - objGroup (where egg objects can be added)
        _this.objGroup;
        _this.numGroup;

        //* start the game with first question
        _this.time.events.add(1000, _this.getQuestion);
    },
    createAudio: function (src) {
        audio = document.createElement('audio');
        audiosrc = document.createElement('source');
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/GMSS-04-G7/" + _this.languageSelected + "/" + src + ".mp3");
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
                _this.seconds = 0;
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

        _this.QuestionArray = [1, 1, 1, 2, 2, 2];

        _this.numbers = [1, 2, 3, 4, 5, 6, 7];//[1, 2, 3, 4, 5, 6, 7];
        Phaser.ArrayUtils.shuffle(_this.numbers);
        console.log(_this.numbers, "_this.numbers ");

        _this.numbers1 = [1, 2, 3, 4, 5];//[1, 2, 3, 4, 5];//shape list
        Phaser.ArrayUtils.shuffle(_this.numbers1);

        _this.correctOp_count = [1];//correct answer count
        Phaser.ArrayUtils.shuffle(_this.correctOp_count);

        _this.InitialScreen();
        // _this.InitialScreenPart2();
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

    NextQuestion: function () {
        console.log('next question.......')

        _this.count1++;
        if (_this.numberOfQuestions == 3) _this.count1 = 0;
        if (_this.numberOfQuestions < 3) {
            _this.InitialScreen();//PartA
        } else if (_this.numberOfQuestions < 6) {
            _this.InitialScreenPart2();//PartA
        } else {
            _this.timer1.stop();
            _this.timer1 = null;
            _this.time.events.add(1000, function () { _this.state.start('score', true, false, gameID, _this.microConcepts); });
        }
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
    //this function displays the Part A inital screen
    InitialScreen: function () {
        _this.sceneCount++;
        _this.AnsTimerCount = 0;
        _this.noofAttempts = 0;
        
        _this.clearArray = [];
        console.log("InitialScreen ...");

        _this.Question_flag = 1;
        if (_this.count1 === 0) {
            _this.Ask_Question1.play();
        }
        console.log("AskingQuestion")

        _this.tick = _this.add.sprite(880, 455, 'TickBtn');
        _this.clearArray.push(_this.tick);

        _this.Box1 = _this.add.sprite(20, 70, 'Box_1');
        _this.Box1.scale.setTo(1, 1.01);
        _this.clearArray.push(_this.Box1);

        // _this.box1 = _this.add.image(720, 70, 'Box_2');
        // //  _this.box1.frame = 1;
        // _this.box2 = _this.add.image(720, 220, 'Box_2');
        // _this.box3 = _this.add.image(720, 370, 'Box_2');

        _this.tick.inputEnabled = true;
        _this.tick.input.useHandCursor = true;
        _this.tick.events.onInputDown.add(_this.tickSecondEvaluation, _this);

        _this.box1 = _this.add.sprite(720, 70, 'Box_2');
        _this.box2 = _this.add.sprite(720, 220, 'Box_2');
        _this.box3 = _this.add.sprite(720, 370, 'Box_2');
        _this.clearArray.push(_this.box1);
        _this.clearArray.push(_this.box2);
        _this.clearArray.push(_this.box3);

        //second box
        _this.shapesGroup = _this.add.group();
        _this.QuestionGroup = _this.add.group();

        //  _this.option1 = _this.add.image(738, 110,'shape9');
        // _this.option1.scale.setTo(0.9,0.9); //for shape 3
        switch (_this.numbers[_this.count1]) {
            case 1: _this.gotoPurpleTriangle();
                break;
            case 2: _this.gotoGreenTriangle();
                break;
            case 3: _this.gotoRedCone();
                break;
            case 4: _this.gotoGreenSquare();
                break;
            case 5: _this.gotoBluetriangle();
                break;
            case 6: _this.gotoCylinder();
                break;
            case 7: _this.gotoRectAngleBox();
                break;
        }

        _this.box1.inputEnabled = true;
        _this.box1.input.useHandCursor = true;
        _this.box1.events.onInputDown.add(_this.changeFrame1, _this);

        _this.box2.inputEnabled = true;
        _this.box2.input.useHandCursor = true;
        _this.box2.events.onInputDown.add(_this.changeFrame2, _this);

        _this.box3.inputEnabled = true;
        _this.box3.input.useHandCursor = true;
        _this.box3.events.onInputDown.add(_this.changeFrame3, _this);
    },

    //* This decides the options to be displYED IN part A according to the shape
    decideOptions: function () {
        if (_this.numbers[_this.count1] == 1) {
            if (_this.objectArray[0] == 1) {
                _this.optionArray = ['shape1', 'shape2', 'shape3', 'shape4', 'shape5', 'shape6', 'shape8', 'shape9', 'shape10', 'shape11', 'shape12', 'shape13', 'shape14', 'shape15', 'shape16'];
            } else {
                _this.optionArray = ['shape1', 'shape2', 'shape3', 'shape4', 'shape5', 'shape6', 'shape7', 'shape8', 'shape9', 'shape10', 'shape11', 'shape12', 'shape13', 'shape15', 'shape16'];

            }
            _this.shuffleArray(_this.optionArray);
        } else if (_this.numbers[_this.count1] == 2) {
            if (_this.objectArray[0] == 1) {
                _this.optionArray = ['shape1', 'shape2', 'shape3', 'shape4', 'shape5', 'shape6', 'shape8', 'shape9', 'shape10', 'shape11', 'shape12', 'shape13', 'shape14', 'shape15', 'shape16'];
            } else {
                _this.optionArray = ['shape1', 'shape2', 'shape4', 'shape5', 'shape6', 'shape7', 'shape8', 'shape10', 'shape11', 'shape12', 'shape13', 'shape14', 'shape15', 'shape16'];

            }
            _this.shuffleArray(_this.optionArray);
        } else if (_this.numbers[_this.count1] == 3) {
            if (_this.objectArray[0] == 1) {
                _this.optionArray = ['shape1', 'shape3', 'shape4', 'shape5', 'shape6', 'shape7', 'shape9', 'shape10', 'shape11', 'shape12', 'shape14', 'shape15', 'shape16'];
            } else {
                _this.optionArray = ['shape1', 'shape2', 'shape3', 'shape4', 'shape5', 'shape6', 'shape8', 'shape9', 'shape10', 'shape11', 'shape12', 'shape13', 'shape14', 'shape15', 'shape16'];

            }
            _this.shuffleArray(_this.optionArray);
        } else if (_this.numbers[_this.count1] == 4) {

            _this.optionArray = ['shape1', 'shape2', 'shape3', 'shape4', 'shape5', 'shape6', 'shape8', 'shape9', 'shape10', 'shape11', 'shape12', 'shape13', 'shape7', 'shape15', 'shape16'];
            _this.shuffleArray(_this.optionArray);
        }
        else if (_this.numbers[_this.count1] == 5) {

            _this.optionArray = ['shape1', 'shape2', 'shape3', 'shape4', 'shape5', 'shape6', 'shape8', 'shape9', 'shape10', 'shape11', 'shape12', 'shape13', 'shape14', 'shape15', 'shape16'];
            _this.shuffleArray(_this.optionArray);
        } else if (_this.numbers[_this.count1] == 6) {

            _this.optionArray = ['shape1', 'shape3', 'shape4', 'shape5', 'shape6', 'shape7', 'shape9', 'shape10', 'shape11', 'shape12', 'shape14', 'shape15', 'shape16'];

            _this.shuffleArray(_this.optionArray);
        } else if (_this.numbers[_this.count1] == 7) {

            if (_this.torch_Array[0] == 1) {
                _this.optionArray = ['shape1', 'shape2', 'shape3', 'shape4', 'shape5', 'shape6', 'shape7', 'shape8', 'shape9', 'shape10', 'shape11', 'shape12', 'shape13', 'shape15', 'shape16'];
            } else {
                _this.optionArray = ['shape1', 'shape2', 'shape3', 'shape4', 'shape5', 'shape6', 'shape7', 'shape8', 'shape10', 'shape11', 'shape12', 'shape13', 'shape14', 'shape15', 'shape16'];

            }
            _this.shuffleArray(_this.optionArray);
        }
    },
    //* This function will give the right x,y position to the onject in the first box
    getPosVal1: function () {
        //755, 100, 'shape1',755, 100, 'shape2',735, 110, 'shape3'
        //770, 100, 'shape4',765, 100, 'shape5',750, 100, 'shape6'
        //760, 105, 'shape14',//755, 100, 'shape7',755, 100, 'shape8',747, 110, 'shape9'
        //760, 100, 'shape10',770, 90, 'shape11',755, 110, 'shape12',755, 100, 'shape13',765, 100, 'shape15',770, 90, 'shape16'

        switch (_this.theImages) {
            case 'shape1': _this.x1 = 745;
                _this.y1 = 100;
                break;
            case 'shape2': _this.x1 = 745;
                _this.y1 = 100;
                break;
            case 'shape3': _this.x1 = 735;
                _this.y1 = 110;
                break;
            case 'shape4': _this.x1 = 760;
                _this.y1 = 100;
                break;
            case 'shape5': _this.x1 = 760;
                _this.y1 = 100;
                break;
            case 'shape6': _this.x1 = 745;
                _this.y1 = 100;
                break;
            case 'shape7': _this.x1 = 745;
                _this.y1 = 100;
                break;
            case 'shape8': _this.x1 = 750;
                _this.y1 = 105;
                break;
            case 'shape9': _this.x1 = 738;
                _this.y1 = 110;
                break;
            case 'shape10': _this.x1 = 750;
                _this.y1 = 105;
                break;
            case 'shape11': _this.x1 = 760;
                _this.y1 = 90;
                break;
            case 'shape12': _this.x1 = 745;
                _this.y1 = 100;
                break;
            case 'shape13': _this.x1 = 745;
                _this.y1 = 100;
                break;
            case 'shape14': _this.x1 = 750;
                _this.y1 = 100;
                break;
            case 'shape15': _this.x1 = 755;
                _this.y1 = 90;
                break;
            case 'shape16': _this.x1 = 765;
                _this.y1 = 90;
                break;
        }
    },
    //* This function will give the right x,y position to the onject in the second box
    getPosVal2: function () {
        //755, 100, 'shape1',755, 100, 'shape2',735, 110, 'shape3'
        //770, 100, 'shape4',765, 100, 'shape5',750, 100, 'shape6'
        //760, 105, 'shape14',//755, 100, 'shape7',755, 100, 'shape8',747, 110, 'shape9'
        //760, 100, 'shape10',770, 90, 'shape11',755, 110, 'shape12',755, 100, 'shape13',765, 100, 'shape15',770, 90, 'shape16'

        switch (_this.theImages1) {
            case 'shape1': _this.xx1 = 745;
                _this.yy1 = 250;
                break;
            case 'shape2': _this.xx1 = 745;
                _this.yy1 = 250;
                break;
            case 'shape3': _this.xx1 = 735;
                _this.yy1 = 260;
                break;
            case 'shape4': _this.xx1 = 760;
                _this.yy1 = 250;
                break;
            case 'shape5': _this.xx1 = 760;
                _this.yy1 = 250;
                break;
            case 'shape6': _this.xx1 = 745;
                _this.yy1 = 250;
                break;
            case 'shape7': _this.xx1 = 745;
                _this.yy1 = 250;
                break;
            case 'shape8': _this.xx1 = 750;
                _this.yy1 = 255;
                break;
            case 'shape9': _this.xx1 = 738;
                _this.yy1 = 260;
                break;
            case 'shape10': _this.xx1 = 750;
                _this.yy1 = 255;
                break;
            case 'shape11': _this.xx1 = 760;
                _this.yy1 = 240;
                break;
            case 'shape12': _this.xx1 = 745;
                _this.yy1 = 250;
                break;
            case 'shape13': _this.xx1 = 745;
                _this.yy1 = 250;
                break;
            case 'shape14': _this.xx1 = 750;
                _this.yy1 = 250;
                break;
            case 'shape15': _this.xx1 = 755;
                _this.yy1 = 240;
                break;
            case 'shape16': _this.xx1 = 765;
                _this.yy1 = 240;
                break;
        }
    },
    //* This function will give the right x,y position to the onject in the third box
    getPosVal3: function () {
        //755, 100, 'shape1',755, 100, 'shape2',735, 110, 'shape3'
        //770, 100, 'shape4',765, 100, 'shape5',750, 100, 'shape6'
        //760, 105, 'shape14',//755, 100, 'shape7',755, 100, 'shape8',747, 110, 'shape9'
        //760, 100, 'shape10',770, 90, 'shape11',755, 110, 'shape12',755, 100, 'shape13',765, 100, 'shape15',770, 90, 'shape16'

        switch (_this.theImages2) {
            case 'shape1': _this.xx2 = 745;
                _this.yy2 = 400;
                break;
            case 'shape2': _this.xx2 = 745;
                _this.yy2 = 400;
                break;
            case 'shape3': _this.xx2 = 735;
                _this.yy2 = 410;
                break;
            case 'shape4': _this.xx2 = 760;
                _this.yy2 = 400;
                break;
            case 'shape5': _this.xx2 = 760;
                _this.yy2 = 400;
                break;
            case 'shape6': _this.xx2 = 745;
                _this.yy2 = 400;
                break;
            case 'shape7': _this.xx2 = 745;
                _this.yy2 = 400;
                break;
            case 'shape8': _this.xx2 = 750;
                _this.yy2 = 405;
                break;
            case 'shape9': _this.xx2 = 738;
                _this.yy2 = 410;
                break;
            case 'shape10': _this.xx2 = 750;
                _this.yy2 = 405;
                break;
            case 'shape11': _this.xx2 = 760;
                _this.yy2 = 390;
                break;
            case 'shape12': _this.xx2 = 745;
                _this.yy2 = 400;
                break;
            case 'shape13': _this.xx2 = 745;
                _this.yy2 = 400;
                break;
            case 'shape14': _this.xx2 = 750;
                _this.yy2 = 400;
                break;
            case 'shape15': _this.xx2 = 755;
                _this.yy2 = 390;
                break;
            case 'shape16': _this.xx2 = 765;
                _this.yy2 = 390;
                break;
        }
    },
    //* This displays the triangle shape and its options
    gotoPurpleTriangle: function () {
        _this.QNo = 1; //Question number
        _this.Shape1_Flag = 1;

        _this.objectArray = [1, 2]; // there are 4 different cuboid objects
        _this.shuffleArray(_this.objectArray);

        var torch_Array = [1];

        //Add Torch 
        _this.torch1 = _this.add.sprite(24, 73, 'torch1');

        _this.clearArray.push(_this.torch1);
        //Add 3D object
        if (_this.objectArray[0] == 1) {
            _this.purpleTri = _this.add.image(280, 210, 'Object1');
            _this.correctImage = 'shape7';
            // _this.optionArray = [1,2,3,4,5,6,8,9,10,11,12,13,14,15,16];
        } else {
            _this.purpleTri = _this.add.image(290, 190, 'Object2');
            //  _this.optionArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,15,16];
            _this.correctImage = 'shape14';
        }

        _this.clearArray.push(_this.purpleTri);
        _this.decideOptions();

        _this.yArray = [200, 260, 300];
        _this.yOpArray = [100, 250, 400];
        _this.shuffleArray(_this.yOpArray);

        //*onj = [0,1,2]; - shufle 0=_this.correctImage,1=_this.optionArray[0],2=_this.optionArray[1]
        //obj[0] == 0
        _this.obj = [0, 1, 2];
        _this.shuffleArray(_this.obj);
        if (_this.obj[0] == 0) _this.option1Val = _this.correctImage;
        if (_this.obj[0] == 1) _this.option1Val = _this.optionArray[0];
        if (_this.obj[0] == 2) _this.option1Val = _this.optionArray[1];

        if (_this.obj[1] == 0) _this.option2Val = _this.correctImage;
        if (_this.obj[1] == 1) _this.option2Val = _this.optionArray[0];
        if (_this.obj[1] == 2) _this.option2Val = _this.optionArray[1];

        if (_this.obj[2] == 0) _this.option3Val = _this.correctImage;
        if (_this.obj[2] == 1) _this.option3Val = _this.optionArray[0];
        if (_this.obj[2] == 2) _this.option3Val = _this.optionArray[1];
        //* display the option images
        _this.theImages = _this.option1Val;
        _this.getPosVal1();
        _this.option1 = _this.add.image(_this.x1, _this.y1, _this.option1Val);
        if (_this.option1Val == 'shape3') _this.option1.scale.setTo(0.9, 0.9);
        _this.option1.name = _this.option1Val;
        _this.theImages1 = _this.option2Val;
        _this.getPosVal2();
        _this.option2 = _this.add.image(_this.xx1, _this.yy1, _this.option2Val);
        if (_this.option2Val == 'shape3') _this.option2.scale.setTo(0.9, 0.9);
        _this.option2.name = _this.option2Val;
        _this.theImages2 = _this.option3Val;
        _this.getPosVal3();
        _this.option3 = _this.add.image(_this.xx2, _this.yy2, _this.option3Val);
        if (_this.option3Val == 'shape3') _this.option3.scale.setTo(0.9, 0.9);
        _this.option3.name = _this.option3Val;

        _this.clearArray.push(_this.option1);
        _this.clearArray.push(_this.option2);
        _this.clearArray.push(_this.option3);
    },
    //* This displays the green triangle shape and its options
    gotoGreenTriangle: function () {
        _this.QNo = 2; //Question number
        _this.Shape2_Flag = 1;

        _this.objectArray = [1, 2]; // 
        _this.shuffleArray(_this.objectArray);

        var torch_Array = [2];

        //Add Torch 
        _this.torch2 = _this.add.sprite(20, 78, 'torch2');
        _this.clearArray.push(_this.torch2);
        //Add 3D object
        if (_this.objectArray[0] == 1) {
            _this.purpleTri = _this.add.image(310, 260, 'Object3');
            _this.correctImage = 'shape7';
            // _this.optionArray = [1,2,3,4,5,6,8,9,10,11,12,13,14,15,16];
        } else {
            _this.purpleTri = _this.add.image(220, 290, 'Object4');
            //  _this.optionArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,15,16];
            _this.correctImage = 'shape9';
        }

        _this.clearArray.push(_this.purpleTri);
        _this.decideOptions();

        _this.yArray = [200, 260, 300];
        _this.yOpArray = [100, 250, 400];
        _this.shuffleArray(_this.yOpArray);
        _this.obj = [0, 1, 2];
        _this.shuffleArray(_this.obj);
        if (_this.obj[0] == 0) _this.option1Val = _this.correctImage;
        if (_this.obj[0] == 1) _this.option1Val = _this.optionArray[0];
        if (_this.obj[0] == 2) _this.option1Val = _this.optionArray[1];

        if (_this.obj[1] == 0) _this.option2Val = _this.correctImage;
        if (_this.obj[1] == 1) _this.option2Val = _this.optionArray[0];
        if (_this.obj[1] == 2) _this.option2Val = _this.optionArray[1];

        if (_this.obj[2] == 0) _this.option3Val = _this.correctImage;
        if (_this.obj[2] == 1) _this.option3Val = _this.optionArray[0];
        if (_this.obj[2] == 2) _this.option3Val = _this.optionArray[1];
        //* display the option images
        _this.theImages = _this.option1Val;
        _this.getPosVal1();
        _this.option1 = _this.add.image(_this.x1, _this.y1, _this.option1Val);
        if (_this.option1Val == 'shape3') _this.option1.scale.setTo(0.9, 0.9);
        _this.option1.name = _this.option1Val;
        _this.theImages1 = _this.option2Val;
        _this.getPosVal2();
        _this.option2 = _this.add.image(_this.xx1, _this.yy1, _this.option2Val);
        if (_this.option2Val == 'shape3') _this.option2.scale.setTo(0.9, 0.9);
        _this.option2.name = _this.option2Val;
        _this.theImages2 = _this.option3Val;
        _this.getPosVal3();
        _this.option3 = _this.add.image(_this.xx2, _this.yy2, _this.option3Val);
        if (_this.option3Val == 'shape3') _this.option3.scale.setTo(0.9, 0.9);
        _this.option3.name = _this.option3Val;

        _this.clearArray.push(_this.option1);
        _this.clearArray.push(_this.option2);
        _this.clearArray.push(_this.option3);
    },
    //* This displays the Red cone shape and its options
    gotoRedCone: function () {
        _this.QNo = 1; //Question number
        _this.Shape3_Flag = 1;

        _this.objectArray = [1, 2]; // there are 4 different cuboid objects
        _this.shuffleArray(_this.objectArray);

        var torch_Array = [1];

        //Add Torch 
        _this.torch1 = _this.add.sprite(20, 78, 'torch2');

        _this.clearArray.push(_this.torch1);
        //Add 3D object
        if (_this.objectArray[0] == 1) {
            _this.purpleTri = _this.add.image(300, 240, 'Object5');
            _this.correctImage = 'shape8';
            // _this.optionArray = [1,2,3,4,5,6,8,9,10,11,12,13,14,15,16];
        } else {
            _this.purpleTri = _this.add.image(260, 265, 'Object6');
            //  _this.optionArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,15,16];
            _this.correctImage = 'shape7';
        }
        _this.clearArray.push(_this.purpleTri);
        _this.decideOptions();

        _this.yArray = [200, 260, 300];
        _this.yOpArray = [100, 250, 400];
        _this.shuffleArray(_this.yOpArray);
        _this.obj = [0, 1, 2];
        _this.shuffleArray(_this.obj);
        if (_this.obj[0] == 0) _this.option1Val = _this.correctImage;
        if (_this.obj[0] == 1) _this.option1Val = _this.optionArray[0];
        if (_this.obj[0] == 2) _this.option1Val = _this.optionArray[1];

        if (_this.obj[1] == 0) _this.option2Val = _this.correctImage;
        if (_this.obj[1] == 1) _this.option2Val = _this.optionArray[0];
        if (_this.obj[1] == 2) _this.option2Val = _this.optionArray[1];

        if (_this.obj[2] == 0) _this.option3Val = _this.correctImage;
        if (_this.obj[2] == 1) _this.option3Val = _this.optionArray[0];
        if (_this.obj[2] == 2) _this.option3Val = _this.optionArray[1];
        //* display the option images
        _this.theImages = _this.option1Val;
        _this.getPosVal1();
        _this.option1 = _this.add.image(_this.x1, _this.y1, _this.option1Val);
        if (_this.option1Val == 'shape3') _this.option1.scale.setTo(0.9, 0.9);
        _this.option1.name = _this.option1Val;
        _this.theImages1 = _this.option2Val;
        _this.getPosVal2();
        _this.option2 = _this.add.image(_this.xx1, _this.yy1, _this.option2Val);
        if (_this.option2Val == 'shape3') _this.option2.scale.setTo(0.9, 0.9);
        _this.option2.name = _this.option2Val;
        _this.theImages2 = _this.option3Val;
        _this.getPosVal3();
        _this.option3 = _this.add.image(_this.xx2, _this.yy2, _this.option3Val);
        if (_this.option3Val == 'shape3') _this.option3.scale.setTo(0.9, 0.9);
        _this.option3.name = _this.option3Val;

        _this.clearArray.push(_this.option1);
        _this.clearArray.push(_this.option2);
        _this.clearArray.push(_this.option3);

    },
    //* This displays the square shape and its options
    gotoGreenSquare: function () {
        _this.QNo = 1; //Question number
        _this.Shape4_Flag = 1;

        _this.objectArray = [1]; // there are 4 different cuboid objects
        _this.shuffleArray(_this.objectArray);

        _this.torch_Array = [1, 2];
        _this.shuffleArray(_this.torch_Array);

        //Add Torch
        if (_this.torch_Array[0] == 1) {
            _this.torch1 = _this.add.sprite(24, 73, 'torch1');
            _this.correctImage = 'shape14';
            //Add object
            _this.greensquare = _this.add.image(310, 230, 'Object7');
            _this.clearArray.push(_this.greensquare);
            // _this.optionArray = [1,2,3,4,5,6,8,9,10,11,12,13,14,15,16];
            _this.clearArray.push(_this.torch1);
        } else {
            _this.torch2 = _this.add.sprite(20, 78, 'torch2');
            //  _this.optionArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,15,16];
            _this.correctImage = 'shape14';
            //Add object
            _this.greensquare = _this.add.image(290, 270, 'Object7');
            _this.clearArray.push(_this.greensquare);
            _this.clearArray.push(_this.torch2);
        }

        _this.decideOptions();

        _this.yArray = [200, 260, 300];
        _this.yOpArray = [100, 250, 400];
        _this.shuffleArray(_this.yOpArray);

        _this.obj = [0, 1, 2];
        _this.shuffleArray(_this.obj);
        if (_this.obj[0] == 0) _this.option1Val = _this.correctImage;
        if (_this.obj[0] == 1) _this.option1Val = _this.optionArray[0];
        if (_this.obj[0] == 2) _this.option1Val = _this.optionArray[1];

        if (_this.obj[1] == 0) _this.option2Val = _this.correctImage;
        if (_this.obj[1] == 1) _this.option2Val = _this.optionArray[0];
        if (_this.obj[1] == 2) _this.option2Val = _this.optionArray[1];

        if (_this.obj[2] == 0) _this.option3Val = _this.correctImage;
        if (_this.obj[2] == 1) _this.option3Val = _this.optionArray[0];
        if (_this.obj[2] == 2) _this.option3Val = _this.optionArray[1];
        //* display the option images
        _this.theImages = _this.option1Val;
        _this.getPosVal1();
        _this.option1 = _this.add.image(_this.x1, _this.y1, _this.option1Val);
        if (_this.option1Val == 'shape3') _this.option1.scale.setTo(0.9, 0.9);
        _this.option1.name = _this.option1Val;
        _this.theImages1 = _this.option2Val;
        _this.getPosVal2();
        _this.option2 = _this.add.image(_this.xx1, _this.yy1, _this.option2Val);
        if (_this.option2Val == 'shape3') _this.option2.scale.setTo(0.9, 0.9);
        _this.option2.name = _this.option2Val;
        _this.theImages2 = _this.option3Val;
        _this.getPosVal3();
        _this.option3 = _this.add.image(_this.xx2, _this.yy2, _this.option3Val);
        if (_this.option3Val == 'shape3') _this.option3.scale.setTo(0.9, 0.9);
        _this.option3.name = _this.option3Val;

        _this.clearArray.push(_this.option1);
        _this.clearArray.push(_this.option2);
        _this.clearArray.push(_this.option3);

    },
    //* This displays the triangle shape and its options
    gotoBluetriangle: function () {
        _this.QNo = 5; //Question number
        _this.Shape5_Flag = 1;

        _this.objectArray = [1]; // there are 4 different cuboid objects
        _this.shuffleArray(_this.objectArray);

        _this.torch_Array = [1, 2];
        _this.shuffleArray(_this.torch_Array);

        //Add Torch
        if (_this.torch_Array[0] == 1) {
            _this.torch1 = _this.add.sprite(24, 73, 'torch1');
            _this.correctImage = 'shape7';
            //Add object
            _this.clearArray.push(_this.torch1);
            _this.greensquare = _this.add.image(300, 210, 'Object8');
            _this.clearArray.push(_this.greensquare);
            // _this.optionArray = [1,2,3,4,5,6,8,9,10,11,12,13,14,15,16];
        } else {
            _this.torch2 = _this.add.sprite(20, 78, 'torch2');
            _this.clearArray.push(_this.torch2);
            //  _this.optionArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,15,16];
            _this.correctImage = 'shape7';
            //Add object
            _this.greensquare = _this.add.image(270, 250, 'Object8');
            _this.clearArray.push(_this.greensquare);
        }

        _this.decideOptions();

        _this.yArray = [200, 260, 300];
        _this.yOpArray = [100, 250, 400];
        _this.shuffleArray(_this.yOpArray);

        _this.obj = [0, 1, 2];
        _this.shuffleArray(_this.obj);
        if (_this.obj[0] == 0) _this.option1Val = _this.correctImage;
        if (_this.obj[0] == 1) _this.option1Val = _this.optionArray[0];
        if (_this.obj[0] == 2) _this.option1Val = _this.optionArray[1];

        if (_this.obj[1] == 0) _this.option2Val = _this.correctImage;
        if (_this.obj[1] == 1) _this.option2Val = _this.optionArray[0];
        if (_this.obj[1] == 2) _this.option2Val = _this.optionArray[1];

        if (_this.obj[2] == 0) _this.option3Val = _this.correctImage;
        if (_this.obj[2] == 1) _this.option3Val = _this.optionArray[0];
        if (_this.obj[2] == 2) _this.option3Val = _this.optionArray[1];
        //* display the option images
        _this.theImages = _this.option1Val;
        _this.getPosVal1();
        _this.option1 = _this.add.image(_this.x1, _this.y1, _this.option1Val);
        if (_this.option1Val == 'shape3') _this.option1.scale.setTo(0.9, 0.9);
        _this.option1.name = _this.option1Val;
        _this.theImages1 = _this.option2Val;
        _this.getPosVal2();
        _this.option2 = _this.add.image(_this.xx1, _this.yy1, _this.option2Val);
        if (_this.option2Val == 'shape3') _this.option2.scale.setTo(0.9, 0.9);
        _this.option2.name = _this.option2Val;
        _this.theImages2 = _this.option3Val;
        _this.getPosVal3();
        _this.option3 = _this.add.image(_this.xx2, _this.yy2, _this.option3Val);
        if (_this.option3Val == 'shape3') _this.option3.scale.setTo(0.9, 0.9);
        _this.option3.name = _this.option3Val;

        _this.clearArray.push(_this.option1);
        _this.clearArray.push(_this.option2);
        _this.clearArray.push(_this.option3);

    },
    //* This displays the cylinder shape and its options
    gotoCylinder: function () {
        _this.QNo = 6; //Question number
        _this.Shape6_Flag = 1;

        _this.objectArray = [1, 2]; // there are 4 different cuboid objects
        _this.shuffleArray(_this.objectArray);

        var torch_Array = [1];

        //Add Torch 
        _this.torch1 = _this.add.sprite(20, 78, 'torch2');
        _this.clearArray.push(_this.torch1);
        //Add 3D object
        if (_this.objectArray[0] == 1) {
            _this.purpleTri = _this.add.image(315, 255, 'Object9');
            _this.correctImage = 'shape8';
            // _this.optionArray = [1,2,3,4,5,6,8,9,10,11,12,13,14,15,16];
        } else {
            _this.purpleTri = _this.add.image(280, 290, 'Object10');
            //  _this.optionArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,15,16];
            _this.correctImage = 'shape8';
        }
        _this.clearArray.push(_this.purpleTri);
        _this.decideOptions();

        _this.yArray = [200, 260, 300];
        _this.yOpArray = [100, 250, 400];
        _this.shuffleArray(_this.yOpArray);

        _this.obj = [0, 1, 2];
        _this.shuffleArray(_this.obj);
        if (_this.obj[0] == 0) _this.option1Val = _this.correctImage;
        if (_this.obj[0] == 1) _this.option1Val = _this.optionArray[0];
        if (_this.obj[0] == 2) _this.option1Val = _this.optionArray[1];

        if (_this.obj[1] == 0) _this.option2Val = _this.correctImage;
        if (_this.obj[1] == 1) _this.option2Val = _this.optionArray[0];
        if (_this.obj[1] == 2) _this.option2Val = _this.optionArray[1];

        if (_this.obj[2] == 0) _this.option3Val = _this.correctImage;
        if (_this.obj[2] == 1) _this.option3Val = _this.optionArray[0];
        if (_this.obj[2] == 2) _this.option3Val = _this.optionArray[1];
        //* display the option images
        _this.theImages = _this.option1Val;
        _this.getPosVal1();
        _this.option1 = _this.add.image(_this.x1, _this.y1, _this.option1Val);
        if (_this.option1Val == 'shape3') _this.option1.scale.setTo(0.9, 0.9);
        _this.option1.name = _this.option1Val;
        _this.theImages1 = _this.option2Val;
        _this.getPosVal2();
        _this.option2 = _this.add.image(_this.xx1, _this.yy1, _this.option2Val);
        if (_this.option2Val == 'shape3') _this.option2.scale.setTo(0.9, 0.9);
        _this.option2.name = _this.option2Val;
        _this.theImages2 = _this.option3Val;
        _this.getPosVal3();
        _this.option3 = _this.add.image(_this.xx2, _this.yy2, _this.option3Val);
        if (_this.option3Val == 'shape3') _this.option3.scale.setTo(0.9, 0.9);
        _this.option3.name = _this.option3Val;

        _this.clearArray.push(_this.option1);
        _this.clearArray.push(_this.option2);
        _this.clearArray.push(_this.option3);
    },
    //* This displays the rectangle shape and its options
    gotoRectAngleBox: function () {
        _this.QNo = 7; //Question number
        _this.Shape7_Flag = 1;
        _this.objectArray = [1]; // there are 4 different cuboid objects
        _this.shuffleArray(_this.objectArray);

        _this.torch_Array = [1, 2];
        _this.shuffleArray(_this.torch_Array);

        //Add Torch
        if (_this.torch_Array[0] == 1) {
            _this.torch1 = _this.add.sprite(24, 73, 'torch1');
            _this.correctImage = 'shape14';
            _this.clearArray.push(_this.torch1);
            //Add object
            _this.greensquare = _this.add.image(285, 240, 'Object11');
            _this.clearArray.push(_this.greensquare);
            // _this.optionArray = [1,2,3,4,5,6,8,9,10,11,12,13,14,15,16];
        } else {
            _this.torch2 = _this.add.sprite(20, 78, 'torch2');
            _this.clearArray.push(_this.torch2);
            //  _this.optionArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,15,16];
            _this.correctImage = 'shape9';
            //Add object
            _this.greensquare = _this.add.image(250, 310, 'Object11');
            _this.clearArray.push(_this.greensquare);
        }

        _this.decideOptions();

        _this.yArray = [200, 260, 300];
        _this.yOpArray = [100, 250, 400];
        _this.shuffleArray(_this.yOpArray);
        _this.obj = [0, 1, 2];
        _this.shuffleArray(_this.obj);
        if (_this.obj[0] == 0) _this.option1Val = _this.correctImage;
        if (_this.obj[0] == 1) _this.option1Val = _this.optionArray[0];
        if (_this.obj[0] == 2) _this.option1Val = _this.optionArray[1];

        if (_this.obj[1] == 0) _this.option2Val = _this.correctImage;
        if (_this.obj[1] == 1) _this.option2Val = _this.optionArray[0];
        if (_this.obj[1] == 2) _this.option2Val = _this.optionArray[1];

        if (_this.obj[2] == 0) _this.option3Val = _this.correctImage;
        if (_this.obj[2] == 1) _this.option3Val = _this.optionArray[0];
        if (_this.obj[2] == 2) _this.option3Val = _this.optionArray[1];
        //* display the option images
        _this.theImages = _this.option1Val;
        _this.getPosVal1();
        _this.option1 = _this.add.image(_this.x1, _this.y1, _this.option1Val);
        if (_this.option1Val == 'shape3') _this.option1.scale.setTo(0.9, 0.9);
        _this.option1.name = _this.option1Val;
        _this.theImages1 = _this.option2Val;
        _this.getPosVal2();
        _this.option2 = _this.add.image(_this.xx1, _this.yy1, _this.option2Val);
        if (_this.option2Val == 'shape3') _this.option2.scale.setTo(0.9, 0.9);
        _this.option2.name = _this.option2Val;
        _this.theImages2 = _this.option3Val;
        _this.getPosVal3();
        _this.option3 = _this.add.image(_this.xx2, _this.yy2, _this.option3Val);
        if (_this.option3Val == 'shape3') _this.option3.scale.setTo(0.9, 0.9);
        _this.option3.name = _this.option3Val;

        _this.clearArray.push(_this.option1);
        _this.clearArray.push(_this.option2);
        _this.clearArray.push(_this.option3);

    },
    //*These functions are used to change the frame of the option boxes
    changeFrame1: function () {

        _this.box1.frame = 1;
        _this.box2.frame = 0;
        _this.box3.frame = 0;
        // _this.box4.frame = 0;

        _this.selectedBox1 = true;
        _this.selectedBox2 = false;
        _this.selectedBox3 = false;
        // _this.selectedBox4 = false;

        _this.box1.name = _this.option1.name;
        _this.box2.name = "";
        _this.box3.name = "";


        console.log(_this.box1.name, "  _this.box1.name");
    },

    changeFrame2: function () {
        _this.box2.frame = 1;
        _this.box1.frame = 0;
        _this.box3.frame = 0;
        // _this.Box2_4.frame = 0;

        _this.selectedBox2 = true;
        _this.selectedBox1 = false;
        _this.selectedBox3 = false;
        //  _this.selectedBox4 = false;

        _this.box1.name = "";
        _this.box2.name = _this.option2.name;
        _this.box3.name = "";
        console.log(_this.box2.name, "  _this.box2.name");
    },

    changeFrame3: function () {
        _this.box3.frame = 1;
        _this.box2.frame = 0;
        _this.box1.frame = 0;

        _this.selectedBox3 = true;
        _this.selectedBox1 = false;
        _this.selectedBox2 = false;

        _this.box1.name = "";
        _this.box2.name = "";
        _this.box3.name = _this.option3.name;
        console.log(_this.box3.name, "  _this.box3.name");
    },
    //* getThePositionValues1 this function is used to get the x,y value of the option objects in part B
    getThePositionValues1: function () {
        //* for First box 
        //(465, 125, 'obj1'),(470, 130, 'obj2'),(485, 125, 'obj3'),(500, 140, 'obj4'),(510, 130, 'obj5'),(510, 115, 'obj6')           
        //(450, 155, 'obj7',_this.right_shape1.scale.setTo(0.85,0.9)),(455, 110, 'obj8', _this.right_shape1.scale.setTo(0.9,0.9)),
        //(510, 115, 'obj9'),(470, 135, 'obj10'),(455, 130, 'obj11'),(485, 120, 'obj12'),
        //(505, 100, 'obj13'),(490, 110, 'obj14'),(490, 130, 'obj15'),(500, 125, 'obj16'),(495, 130, 'obj17');

        switch (_this.theImage1) {
            case 'obj1': _this.x1 = 465;
                _this.y1 = 125;
                break;
            case 'obj2': _this.x1 = 470;
                _this.y1 = 130;
                break;
            case 'obj3': _this.x1 = 485;
                _this.y1 = 125;
                break;
            case 'obj4': _this.x1 = 500;
                _this.y1 = 140;
                break;
            case 'obj5': _this.x1 = 510;
                _this.y1 = 130;
                break;
            case 'obj6': _this.x1 = 510;
                _this.y1 = 115;
                break;
            case 'obj7': _this.x1 = 450;
                _this.y1 = 155;
                break;
            case 'obj8': _this.x1 = 455;
                _this.y1 = 110;
                break;
            case 'obj9': _this.x1 = 510;
                _this.y1 = 115;
                break;
            case 'obj10': _this.x1 = 470;
                _this.y1 = 135;
                break;
            case 'obj11': _this.x1 = 455;
                _this.y1 = 130;
                break;
            case 'obj12': _this.x1 = 485;
                _this.y1 = 120;
                break;
            case 'obj13': _this.x1 = 505;
                _this.y1 = 100;
                break;
            case 'obj14': _this.x1 = 490;
                _this.y1 = 110;
                break;
            case 'obj15': _this.x1 = 490;
                _this.y1 = 130;
                break;
            case 'obj16': _this.x1 = 500;
                _this.y1 = 125;
                break;
            case 'obj17': _this.x1 = 495;
                _this.y1 = 130;
                break;
        }
    },

    getThePositionValues2: function () {

        //*Second box right top
        //(680, 125,'obj1'),(690, 130,'obj2'),(710, 125,'obj3'),(720, 140,'obj4'),
        //(730, 130,'obj5'),(730, 115,'obj6'),(670, 155,'obj7', _this.right_shape2.scale.setTo(0.85,0.9)),
        //(680, 110,'obj8',_this.right_shape1.scale.setTo(0.9,0.9))
        //(730, 115,'obj9'),(690, 135,'obj10'),(675, 130,'obj11'),(700, 120,'obj12')
        //(725, 100,'obj13'),(710, 110,'obj14'),(710, 130,'obj15'),(720, 125,'obj16'),(715, 130,'obj17')

        switch (_this.theImage2) {
            case 'obj1': _this.x2 = 680;
                _this.y2 = 125;
                break;
            case 'obj2': _this.x2 = 690;
                _this.y2 = 130;
                break;
            case 'obj3': _this.x2 = 710;
                _this.y2 = 125;
                break;
            case 'obj4': _this.x2 = 720;
                _this.y2 = 140;
                break;
            case 'obj5': _this.x2 = 730;
                _this.y2 = 130;
                break;
            case 'obj6': _this.x2 = 730;
                _this.y2 = 115;
                break;
            case 'obj7': _this.x2 = 670;
                _this.y2 = 155;
                break;
            case 'obj8': _this.x2 = 680;
                _this.y2 = 110;
                break;
            case 'obj9': _this.x2 = 730;
                _this.y2 = 115;
                break;
            case 'obj10': _this.x2 = 690;
                _this.y2 = 135;
                break;
            case 'obj11': _this.x2 = 675;
                _this.y2 = 130;
                break;
            case 'obj12': _this.x2 = 700;
                _this.y2 = 120;
                break;
            case 'obj13': _this.x2 = 725;
                _this.y2 = 100;
                break;
            case 'obj14': _this.x2 = 710;
                _this.y2 = 110;
                break;
            case 'obj15': _this.x2 = 710;
                _this.y2 = 130;
                break;
            case 'obj16': _this.x2 = 720;
                _this.y2 = 125;
                break;
            case 'obj17': _this.x2 = 715;
                _this.y2 = 130;
                break;
        }
    },

    getThePositionValues3: function () {

        //* third box bottom left
        //(465, 345, 'obj1'),(470, 350, 'obj2'),(485, 350, 'obj3'),(500, 360, 'obj4')
        //(510, 360, 'obj5'),(510, 340, 'obj6'),(450, 370, 'obj7'),(455, 340, 'obj8')
        //(510, 340, 'obj9'),(470, 360, 'obj10'),(455, 350, 'obj11'),(485, 340, 'obj12')
        // (505, 330, 'obj13'),(490, 330, 'obj14'),(490, 350, 'obj15'),(500, 350, 'obj16'),(495, 350, 'obj17')

        switch (_this.theImage3) {
            case 'obj1': _this.x3 = 465;
                _this.y3 = 345;
                break;
            case 'obj2': _this.x3 = 470;
                _this.y3 = 350;
                break;
            case 'obj3': _this.x3 = 485;
                _this.y3 = 350;
                break;
            case 'obj4': _this.x3 = 500;
                _this.y3 = 360;
                break;
            case 'obj5': _this.x3 = 510;
                _this.y3 = 360;
                break;
            case 'obj6': _this.x3 = 510;
                _this.y3 = 340;
                break;
            case 'obj7': _this.x3 = 450;
                _this.y3 = 370;
                break;
            case 'obj8': _this.x3 = 455;
                _this.y3 = 340;
                break;
            case 'obj9': _this.x3 = 510;
                _this.y3 = 340;
                break;
            case 'obj10': _this.x3 = 470;
                _this.y3 = 360;
                break;
            case 'obj11': _this.x3 = 455;
                _this.y3 = 350;
                break;
            case 'obj12': _this.x3 = 485;
                _this.y3 = 340;
                break;
            case 'obj13': _this.x3 = 505;
                _this.y3 = 330;
                break;
            case 'obj14': _this.x3 = 490;
                _this.y3 = 330;
                break;
            case 'obj15': _this.x3 = 490;
                _this.y3 = 350;
                break;
            case 'obj16': _this.x3 = 500;
                _this.y3 = 350;
                break;
            case 'obj17': _this.x3 = 495;
                _this.y3 = 350;
                break;
        }
    },

    getThePositionValues4: function () {
        //*4th Box  bottom right 
        //(680, 345,'obj1'),(690, 350,'obj2'),(710, 350,'obj3'),(720, 360,'obj4'),
        //(730, 360,'obj5'),(730, 340,'obj6'),(670, 370,'obj7', _this.right_shape2.scale.setTo(0.85,0.9)),
        //(680, 340,'obj8',_this.right_shape1.scale.setTo(0.9,0.9))
        //(730, 340,'obj9'),(690, 360,'obj10'),(675, 350,'obj11'),(700, 340,'obj12')
        //(725, 330,'obj13'),(710, 330,'obj14'),(710, 350,'obj15'),(720, 350,'obj16'),(715, 350,'obj17')
        // if (_this.theImage == 'obj1') {
        // }
        switch (_this.theImage4) {
            case 'obj1': _this.x4 = 680;
                _this.y4 = 345;
                break;
            case 'obj2': _this.x4 = 690;
                _this.y4 = 350;
                break;
            case 'obj3': _this.x4 = 710;
                _this.y4 = 350;
                break;
            case 'obj4': _this.x4 = 720;
                _this.y4 = 360;
                break;
            case 'obj5': _this.x4 = 730;
                _this.y4 = 360;
                break;
            case 'obj6': _this.x4 = 730;
                _this.y4 = 340;
                break;
            case 'obj7': _this.x4 = 670;
                _this.y4 = 370;
                break;
            case 'obj8': _this.x4 = 680;
                _this.y4 = 340;
                break;
            case 'obj9': _this.x4 = 730;
                _this.y4 = 340;
                break;
            case 'obj10': _this.x4 = 690;
                _this.y4 = 360;
                break;
            case 'obj11': _this.x4 = 675;
                _this.y4 = 350;
                break;
            case 'obj12': _this.x4 = 700;
                _this.y4 = 340;
                break;
            case 'obj13': _this.x4 = 725;
                _this.y4 = 330;
                break;
            case 'obj14': _this.x4 = 710;
                _this.y4 = 330;
                break;
            case 'obj15': _this.x4 = 710;
                _this.y4 = 350;
                break;
            case 'obj16': _this.x4 = 720;
                _this.y4 = 350;
                break;
            case 'obj17': _this.x4 = 715;
                _this.y4 = 350;
                break;
        }
    },
    //* This function displays the initial screen for part B
    InitialScreenPart2: function () {
        _this.sceneCount++;
        _this.AnsTimerCount = 0;
        _this.noofAttempts = 0;

        _this.clearArray = [];
        _this.Question_flag = 2;
        console.log(_this.count1, "_this.count1");
        if (_this.count1 === 0) {
            _this.Ask_Question2.play();
        }
        console.log("AskingQuestion 2");

        _this.tick = _this.add.sprite(880, 455, 'TickBtn');
        _this.clearArray.push(_this.tick);

        _this.Box1 = _this.add.sprite(30, 70, 'Box1');
        _this.clearArray.push(_this.Box1);

        _this.Box2_1 = _this.add.sprite(440, 70, 'Box2');
        _this.Box2_2 = _this.add.sprite(660, 70, 'Box2');
        _this.Box2_3 = _this.add.sprite(440, 295, 'Box2');
        _this.Box2_4 = _this.add.sprite(660, 295, 'Box2');
        _this.clearArray.push(_this.Box2_1);
        _this.clearArray.push(_this.Box2_2);
        _this.clearArray.push(_this.Box2_3);
        _this.clearArray.push(_this.Box2_4);

        _this.tick.inputEnabled = true;
        _this.tick.input.useHandCursor = true;
        _this.tick.events.onInputDown.add(_this.tickFirstEvaluation, _this);

        _this.Box2_1.inputEnabled = true;
        _this.Box2_1.input.useHandCursor = true;
        _this.Box2_1.events.onInputDown.add(_this.changeFrame11, _this);

        _this.Box2_2.inputEnabled = true;
        _this.Box2_2.input.useHandCursor = true;
        _this.Box2_2.events.onInputDown.add(_this.changeFrame12, _this);

        _this.Box2_3.inputEnabled = true;
        _this.Box2_3.input.useHandCursor = true;
        _this.Box2_3.events.onInputDown.add(_this.changeFrame13, _this);

        _this.Box2_4.inputEnabled = true;
        _this.Box2_4.input.useHandCursor = true;
        _this.Box2_4.events.onInputDown.add(_this.changeFrame14, _this);

        _this.shapesGroup = _this.add.group();

        switch (_this.numbers1[_this.count1]) {
            case 1: _this.gotoSquareshape();
                break;
            case 2: _this.gotoTriangleshape();
                break;
            case 3: _this.gotoCylindershape();
                break;
            case 4: _this.gotoRectangleshape();
                break;
            case 5: _this.gotoCircleshape();

        }
    },
    //* Displays square shape and its real time option objects
    gotoSquareshape: function () {
        console.log("squareee");
        _this.QNo = 1; //Question number
        _this.Shape1_Flag = 1;

        _this.square1 = _this.add.image(130, 200, 'shape14');
        _this.square1.scale.setTo(2, 2);
        _this.clearArray.push(_this.square1);

        _this.numbers = [1, 2, 3, 4];//1,2, 3,  // 4 wrong ans 1 2 3 right ans

        // Shuffle the array using Phaser.ArrayUtils.shuffle
        Phaser.ArrayUtils.shuffle(_this.numbers);
        console.log(_this.numbers[0], "_this.numbers[0].....")

        if (_this.numbers[0] === 4) {
            console.log("44444"); // 1st box wrong ans
            _this.choiceArray = ['obj1', 'obj2', 'obj7', 'obj12', 'obj8', 'obj9', 'obj11', 'obj15', 'obj16', 'obj17'];
            _this.shuffleArray(_this.choiceArray);

            _this.theImage1 = _this.choiceArray[0];
            _this.getThePositionValues1();
            _this.right_shape1 = _this.add.image(_this.x1, _this.y1, _this.choiceArray[0]);
            if (_this.choiceArray[0] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[0] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape1);

            _this.theImage2 = _this.choiceArray[1];
            _this.getThePositionValues2();
            _this.right_shape2 = _this.add.image(_this.x2, _this.y2, _this.choiceArray[1]);
            if (_this.choiceArray[1] == 'obj8') _this.right_shape2.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[1] == 'obj7') _this.right_shape2.scale.setTo(0.85, 0.9);
            // _this.right_shape2.scale.setTo(0.9, 0.9);
            _this.clearArray.push(_this.right_shape2);

            _this.theImage3 = _this.choiceArray[2];
            _this.getThePositionValues3();
            _this.right_shape3 = _this.add.image(_this.x3, _this.y3, _this.choiceArray[2]);
            if (_this.choiceArray[2] == 'obj8') _this.right_shape3.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[2] == 'obj7') _this.right_shape3.scale.setTo(0.85, 0.9);
            //_this.right_shape3.scale.setTo(0.9, 0.9);
            _this.clearArray.push(_this.right_shape3);

            _this.theImage4 = _this.choiceArray[3];
            _this.getThePositionValues4();
            _this.right_shape4 = _this.add.image(_this.x4, _this.y4, _this.choiceArray[3]);
            if (_this.choiceArray[3] == 'obj8') _this.right_shape4.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[3] == 'obj7') _this.right_shape4.scale.setTo(0.85, 0.9);
            //   _this.right_shape4.scale.setTo(0.9, 0.9);
            _this.clearArray.push(_this.right_shape4);
        }
        else if (_this.numbers[0] === 3) {
            console.log("33333"); // 2nd box wrong ans
            _this.choiceArray = ['obj1', 'obj2', 'obj7', 'obj12', 'obj8', 'obj9', 'obj11', 'obj15', 'obj16', 'obj17'];
            _this.shuffleArray(_this.choiceArray);
            _this.wrongChoiceArray = ['obj3', 'obj4', 'obj5', 'obj6', 'obj10', 'obj13', 'obj14'];
            _this.shuffleArray(_this.wrongChoiceArray);

            _this.theImage2 = _this.wrongChoiceArray[0];
            _this.getThePositionValues2();
            _this.wrong_shape1 = _this.add.image(_this.x2, _this.y2, _this.wrongChoiceArray[0]);
            if (_this.wrongChoiceArray[0] == 'obj8') _this.wrong_shape1.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[0] == 'obj7') _this.wrong_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape1);

            _this.theImage1 = _this.choiceArray[0];
            _this.getThePositionValues1();
            _this.right_shape1 = _this.add.image(_this.x1, _this.y1, _this.choiceArray[0]);
            if (_this.choiceArray[0] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[0] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape1);
            //_this.right_shape1.scale.setTo(0.9, 0.9);

            _this.theImage3 = _this.choiceArray[1];
            _this.getThePositionValues3();
            _this.right_shape2 = _this.add.image(_this.x3, _this.y3, _this.choiceArray[1]);
            if (_this.choiceArray[1] == 'obj8') _this.right_shape2.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[1] == 'obj7') _this.right_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape2);
            //  _this.right_shape2.scale.setTo(0.9, 0.9);

            _this.theImage4 = _this.choiceArray[2];
            _this.getThePositionValues4();
            _this.right_shape3 = _this.add.image(_this.x4, _this.y4, _this.choiceArray[2]);
            if (_this.choiceArray[2] == 'obj8') _this.right_shape3.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[2] == 'obj7') _this.right_shape3.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape3);
            // _this.right_shape3.scale.setTo(0.9, 0.9);

        }
        else if (_this.numbers[0] === 2) {
            console.log("222222");// 3rd box wrong ans
            _this.choiceArray = ['obj1', 'obj2', 'obj7', 'obj12', 'obj8', 'obj9', 'obj11', 'obj15', 'obj16', 'obj17'];
            _this.shuffleArray(_this.choiceArray);
            _this.wrongChoiceArray = ['obj3', 'obj4', 'obj5', 'obj6', 'obj10', 'obj13', 'obj14'];
            _this.shuffleArray(_this.wrongChoiceArray);

            _this.theImage3 = _this.wrongChoiceArray[0];
            _this.getThePositionValues3();
            _this.wrong_shape1 = _this.add.image(_this.x3, _this.y3, _this.wrongChoiceArray[0]);
            if (_this.wrongChoiceArray[0] == 'obj8') _this.wrong_shape1.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[0] == 'obj7') _this.wrong_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape1);
            // _this.wrong_shape1.scale.setTo(0.9, 0.9);

            _this.theImage2 = _this.wrongChoiceArray[1];
            _this.getThePositionValues2();
            _this.wrong_shape2 = _this.add.image(_this.x2, _this.y2, _this.wrongChoiceArray[1]);
            if (_this.wrongChoiceArray[1] == 'obj8') _this.wrong_shape2.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[1] == 'obj7') _this.wrong_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape2);
            //_this.wrong_shape2.scale.setTo(0.9, 0.9);
            _this.theImage1 = _this.choiceArray[0];
            _this.getThePositionValues1();
            _this.right_shape1 = _this.add.image(_this.x1, _this.y1, _this.choiceArray[0]);
            if (_this.choiceArray[0] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[0] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape1);
            //  _this.right_shape1.scale.setTo(0.9, 0.9);
            _this.theImage4 = _this.choiceArray[1];
            _this.getThePositionValues4();
            _this.right_shape2 = _this.add.image(_this.x4, _this.y4, _this.choiceArray[1]);
            if (_this.choiceArray[1] == 'obj8') _this.right_shape2.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[1] == 'obj7') _this.right_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape2);
            // _this.right_shape2.scale.setTo(0.9, 0.9);

        }
        else if (_this.numbers[0] === 1) {
            console.log("111111"); // 4th box wrong ans
            _this.choiceArray = ['obj1', 'obj2', 'obj7', 'obj12', 'obj8', 'obj9', 'obj11', 'obj15', 'obj16', 'obj17'];
            _this.shuffleArray(_this.choiceArray);
            _this.wrongChoiceArray = ['obj3', 'obj4', 'obj5', 'obj6', 'obj10', 'obj13', 'obj14'];
            _this.shuffleArray(_this.wrongChoiceArray);

            _this.theImage4 = _this.wrongChoiceArray[0]
            _this.getThePositionValues4();
            _this.wrong_shape1 = _this.add.image(_this.x4, _this.y4, _this.wrongChoiceArray[0]);
            if (_this.wrongChoiceArray[0] == 'obj8') _this.wrong_shape1.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[0] == 'obj7') _this.wrong_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape1);
            // _this.wrong_shape1.scale.setTo(0.9, 0.9);

            _this.theImage1 = _this.wrongChoiceArray[1];
            _this.getThePositionValues1();
            _this.wrong_shape2 = _this.add.image(_this.x1, _this.y1, _this.wrongChoiceArray[1]);
            if (_this.wrongChoiceArray[1] == 'obj8') _this.wrong_shape2.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[1] == 'obj7') _this.wrong_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape2);
            //_this.wrong_shape2.scale.setTo(0.9, 0.9);

            _this.theImage2 = _this.wrongChoiceArray[2];
            _this.getThePositionValues2();
            _this.wrong_shape3 = _this.add.image(_this.x2, _this.y2, _this.wrongChoiceArray[2]);
            if (_this.wrongChoiceArray[2] == 'obj8') _this.wrong_shape3.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[2] == 'obj7') _this.wrong_shape3.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape3);
            ///_this.wrong_shape3.scale.setTo(0.9, 0.9);
            _this.theImage3 = _this.choiceArray[0];
            _this.getThePositionValues3();
            _this.right_shape1 = _this.add.image(_this.x3, _this.y3, _this.choiceArray[0]);
            if (_this.choiceArray[0] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[0] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape1);
            //_this.right_shape1.scale.setTo(0.9, 0.9);
        }
    },
    //* Displays triangle shape and its real time option objects
    gotoTriangleshape: function () {
        _this.QNo = 2; //Question number
        _this.Shape2_Flag = 1;

        _this.triangle1 = _this.add.image(150, 230, 'shape7');
        _this.triangle1.scale.setTo(1.2, 1.2);
        _this.clearArray.push(_this.triangle1);

        _this.numbersTri = [1, 2, 3, 4]; // 4 wrong ans 1 2 3 right ans
        Phaser.ArrayUtils.shuffle(_this.numbersTri);

        if (_this.numbersTri[0] === 4) {
            console.log("44444"); // 1st box wrong ans
            _this.choiceArray = ['obj1', 'obj2', 'obj3', 'obj9', 'obj10', 'obj13', 'obj14'];
            _this.shuffleArray(_this.choiceArray);
            _this.theImage1 = _this.choiceArray[0];
            _this.getThePositionValues1();
            _this.right_shape1 = _this.add.image(_this.x1, _this.y1, _this.choiceArray[0]);
            if (_this.choiceArray[0] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[0] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape1);

            _this.theImage2 = _this.choiceArray[1];
            _this.getThePositionValues2();
            _this.right_shape2 = _this.add.image(_this.x2, _this.y2, _this.choiceArray[1]);
            if (_this.choiceArray[1] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[1] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape2);

            _this.theImage3 = _this.choiceArray[2];
            _this.getThePositionValues3();
            _this.right_shape3 = _this.add.image(_this.x3, _this.y3, _this.choiceArray[2]);
            if (_this.choiceArray[2] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[2] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape3);

            _this.theImage4 = _this.choiceArray[3];
            _this.getThePositionValues4();
            _this.right_shape4 = _this.add.image(_this.x4, _this.y4, _this.choiceArray[3]);
            if (_this.choiceArray[3] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[3] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape4);
        }
        else if (_this.numbersTri[0] === 3) {
            console.log("33333"); // 2nd box wrong ans
            _this.choiceArray = ['obj1', 'obj2', 'obj3', 'obj9', 'obj10', 'obj13', 'obj14'];
            _this.shuffleArray(_this.choiceArray);
            _this.wrongChoiceArray = ['obj4', 'obj5', 'obj6', 'obj7', 'obj8', 'obj11', 'obj12', 'obj15', 'obj16', 'obj17'];
            _this.shuffleArray(_this.wrongChoiceArray);

            _this.theImage2 = _this.wrongChoiceArray[0];
            _this.getThePositionValues2();
            _this.wrong_shape1 = _this.add.image(_this.x2, _this.y2, _this.wrongChoiceArray[0]);
            if (_this.wrongChoiceArray[0] == 'obj8') _this.wrong_shape1.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[0] == 'obj7') _this.wrong_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape1);

            _this.theImage1 = _this.choiceArray[0];
            _this.getThePositionValues1();
            _this.right_shape1 = _this.add.image(_this.x1, _this.y1, _this.choiceArray[0]);
            if (_this.choiceArray[0] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[0] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape1);

            _this.theImage3 = _this.choiceArray[1];
            _this.getThePositionValues3();
            _this.right_shape2 = _this.add.image(_this.x3, _this.y3, _this.choiceArray[1]);
            if (_this.choiceArray[1] == 'obj8') _this.right_shape2.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[1] == 'obj7') _this.right_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape2);
            //  _this.right_shape2.scale.setTo(0.9, 0.9);

            _this.theImage4 = _this.choiceArray[2];
            _this.getThePositionValues4();
            _this.right_shape3 = _this.add.image(_this.x4, _this.y4, _this.choiceArray[2]);
            if (_this.choiceArray[2] == 'obj8') _this.right_shape3.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[2] == 'obj7') _this.right_shape3.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape3);
        }
        else if (_this.numbersTri[0] === 2) {
            console.log("222222");// 3rd box wrong ans
            _this.choiceArray = ['obj1', 'obj2', 'obj3', 'obj9', 'obj10', 'obj13', 'obj14'];
            _this.shuffleArray(_this.choiceArray);
            _this.wrongChoiceArray = ['obj4', 'obj5', 'obj6', 'obj7', 'obj8', 'obj11', 'obj12', 'obj15', 'obj16', 'obj17'];
            _this.shuffleArray(_this.wrongChoiceArray);

            _this.theImage3 = _this.wrongChoiceArray[0];
            _this.getThePositionValues3();
            _this.wrong_shape1 = _this.add.image(_this.x3, _this.y3, _this.wrongChoiceArray[0]);
            if (_this.wrongChoiceArray[0] == 'obj8') _this.wrong_shape1.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[0] == 'obj7') _this.wrong_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape1);

            _this.theImage2 = _this.wrongChoiceArray[1];
            _this.getThePositionValues2();
            _this.wrong_shape2 = _this.add.image(_this.x2, _this.y2, _this.wrongChoiceArray[1]);
            if (_this.wrongChoiceArray[1] == 'obj8') _this.wrong_shape2.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[1] == 'obj7') _this.wrong_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape2);

            _this.theImage1 = _this.choiceArray[0];
            _this.getThePositionValues1();
            _this.right_shape1 = _this.add.image(_this.x1, _this.y1, _this.choiceArray[0]);
            if (_this.choiceArray[0] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[0] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape1);

            _this.theImage4 = _this.choiceArray[1];
            _this.getThePositionValues4();
            _this.right_shape2 = _this.add.image(_this.x4, _this.y4, _this.choiceArray[1]);
            if (_this.choiceArray[1] == 'obj8') _this.right_shape2.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[1] == 'obj7') _this.right_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape2);
        }
        else if (_this.numbersTri[0] === 1) {
            console.log("111111"); // 4th box wrong ans
            _this.choiceArray = ['obj1', 'obj2', 'obj3', 'obj9', 'obj10', 'obj13', 'obj14'];
            _this.shuffleArray(_this.choiceArray);
            _this.wrongChoiceArray = ['obj4', 'obj5', 'obj6', 'obj7', 'obj8', 'obj11', 'obj12', 'obj15', 'obj16', 'obj17'];
            _this.shuffleArray(_this.wrongChoiceArray);

            _this.theImage4 = _this.wrongChoiceArray[0]
            _this.getThePositionValues4();
            _this.wrong_shape1 = _this.add.image(_this.x4, _this.y4, _this.wrongChoiceArray[0]);
            if (_this.wrongChoiceArray[0] == 'obj8') _this.wrong_shape1.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[0] == 'obj7') _this.wrong_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape1);

            _this.theImage1 = _this.wrongChoiceArray[1];
            _this.getThePositionValues1();
            _this.wrong_shape2 = _this.add.image(_this.x1, _this.y1, _this.wrongChoiceArray[1]);
            if (_this.wrongChoiceArray[1] == 'obj8') _this.wrong_shape2.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[1] == 'obj7') _this.wrong_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape2);

            _this.theImage2 = _this.wrongChoiceArray[2];
            _this.getThePositionValues2();
            _this.wrong_shape3 = _this.add.image(_this.x2, _this.y2, _this.wrongChoiceArray[2]);
            if (_this.wrongChoiceArray[2] == 'obj8') _this.wrong_shape3.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[2] == 'obj7') _this.wrong_shape3.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape3);

            _this.theImage3 = _this.choiceArray[0];
            _this.getThePositionValues3();
            _this.right_shape1 = _this.add.image(_this.x3, _this.y3, _this.choiceArray[0]);
            if (_this.choiceArray[0] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[0] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape1);
        }
    },
    //* Displays Cylinder shape and its real time option objects
    gotoCylindershape: function () {
        _this.QNo = 1; //Question number
        _this.Shape3_Flag = 1;

        _this.Cylinder1 = _this.add.image(175, 230, 'shape11');
        _this.Cylinder1.scale.setTo(1.1, 1.1);
        _this.clearArray.push(_this.Cylinder1);

        _this.numbersCylinder = [1, 2, 3]; // 4 wrong ans 1 2 3 right ans
        Phaser.ArrayUtils.shuffle(_this.numbersCylinder);

        if (_this.numbersCylinder[0] === 3) {
            console.log("33333"); // 2nd box wrong ans
            _this.choiceArray = ['obj4', 'obj5', 'obj6'];
            _this.shuffleArray(_this.choiceArray);
            _this.wrongChoiceArray = ['obj1', 'obj2', 'obj3', 'obj7', 'obj8', 'obj9', 'obj10', 'obj11', 'obj12', 'obj13', 'obj14', 'obj15', 'obj16', 'obj17'];
            _this.shuffleArray(_this.wrongChoiceArray);

            _this.theImage2 = _this.wrongChoiceArray[0];
            _this.getThePositionValues2();
            _this.wrong_shape1 = _this.add.image(_this.x2, _this.y2, _this.wrongChoiceArray[0]);
            if (_this.wrongChoiceArray[0] == 'obj8') _this.wrong_shape1.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[0] == 'obj7') _this.wrong_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape1);

            _this.theImage1 = _this.choiceArray[0];
            _this.getThePositionValues1();
            _this.right_shape1 = _this.add.image(_this.x1, _this.y1, _this.choiceArray[0]);
            if (_this.choiceArray[0] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[0] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape1);

            _this.theImage3 = _this.choiceArray[1];
            _this.getThePositionValues3();
            _this.right_shape2 = _this.add.image(_this.x3, _this.y3, _this.choiceArray[1]);
            if (_this.choiceArray[1] == 'obj8') _this.right_shape2.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[1] == 'obj7') _this.right_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape2);

            _this.theImage4 = _this.choiceArray[2];
            _this.getThePositionValues4();
            _this.right_shape3 = _this.add.image(_this.x4, _this.y4, _this.choiceArray[2]);
            if (_this.choiceArray[2] == 'obj8') _this.right_shape3.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[2] == 'obj7') _this.right_shape3.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape3);
        }
        else if (_this.numbersCylinder[0] === 2) {
            console.log("222222");// 3rd box wrong ans
            _this.choiceArray = ['obj4', 'obj5', 'obj6'];
            _this.shuffleArray(_this.choiceArray);
            _this.wrongChoiceArray = ['obj1', 'obj2', 'obj3', 'obj7', 'obj8', 'obj9', 'obj10', 'obj11', 'obj12', 'obj13', 'obj14', 'obj15', 'obj16', 'obj17'];
            _this.shuffleArray(_this.wrongChoiceArray);

            _this.theImage3 = _this.wrongChoiceArray[0];
            _this.getThePositionValues3();
            _this.wrong_shape1 = _this.add.image(_this.x3, _this.y3, _this.wrongChoiceArray[0]);
            if (_this.wrongChoiceArray[0] == 'obj8') _this.wrong_shape1.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[0] == 'obj7') _this.wrong_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape1);

            _this.theImage2 = _this.wrongChoiceArray[1];
            _this.getThePositionValues2();
            _this.wrong_shape2 = _this.add.image(_this.x2, _this.y2, _this.wrongChoiceArray[1]);
            if (_this.wrongChoiceArray[1] == 'obj8') _this.wrong_shape2.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[1] == 'obj7') _this.wrong_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape2);

            _this.theImage1 = _this.choiceArray[0];
            _this.getThePositionValues1();
            _this.right_shape1 = _this.add.image(_this.x1, _this.y1, _this.choiceArray[0]);
            if (_this.choiceArray[0] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[0] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape1);

            _this.theImage4 = _this.choiceArray[1];
            _this.getThePositionValues4();
            _this.right_shape2 = _this.add.image(_this.x4, _this.y4, _this.choiceArray[1]);
            if (_this.choiceArray[1] == 'obj8') _this.right_shape2.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[1] == 'obj7') _this.right_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape2);
        }
        else if (_this.numbersCylinder[0] === 1) {
            console.log("111111"); // 4th box wrong ans
            _this.choiceArray = ['obj4', 'obj5', 'obj6'];
            _this.shuffleArray(_this.choiceArray);
            _this.wrongChoiceArray = ['obj1', 'obj2', 'obj3', 'obj7', 'obj8', 'obj9', 'obj10', 'obj11', 'obj12', 'obj13', 'obj14', 'obj15', 'obj16', 'obj17'];
            _this.shuffleArray(_this.wrongChoiceArray);

            _this.theImage4 = _this.wrongChoiceArray[0]
            _this.getThePositionValues4();
            _this.wrong_shape1 = _this.add.image(_this.x4, _this.y4, _this.wrongChoiceArray[0]);
            if (_this.wrongChoiceArray[0] == 'obj8') _this.wrong_shape1.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[0] == 'obj7') _this.wrong_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape1);

            _this.theImage1 = _this.wrongChoiceArray[1];
            _this.getThePositionValues1();
            _this.wrong_shape2 = _this.add.image(_this.x1, _this.y1, _this.wrongChoiceArray[1]);
            if (_this.wrongChoiceArray[1] == 'obj8') _this.wrong_shape2.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[1] == 'obj7') _this.wrong_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape2);

            _this.theImage2 = _this.wrongChoiceArray[2];
            _this.getThePositionValues2();
            _this.wrong_shape3 = _this.add.image(_this.x2, _this.y2, _this.wrongChoiceArray[2]);
            if (_this.wrongChoiceArray[2] == 'obj8') _this.wrong_shape3.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[2] == 'obj7') _this.wrong_shape3.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape3);

            _this.theImage3 = _this.choiceArray[0];
            _this.getThePositionValues3();
            _this.right_shape1 = _this.add.image(_this.x3, _this.y3, _this.choiceArray[0]);
            if (_this.choiceArray[0] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[0] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape1);
        }
    },
    //* Displays rectangle shape and its real time option objects
    gotoRectangleshape: function () {
        _this.QNo = 1; //Question number
        _this.Shape4_Flag = 1;

        _this.rect1 = _this.add.image(135, 230, 'shape9');
        _this.rect1.scale.setTo(1.5, 1.5);
        _this.clearArray.push(_this.rect1);

        _this.numbersRect = [1, 2, 3, 4]; // 4 wrong ans 1 2 3 right ans
        Phaser.ArrayUtils.shuffle(_this.numbersRect);

        if (_this.numbersRect[0] === 4) {
            console.log("44444"); // 1st box wrong ans
            _this.choiceArray = ['obj4', 'obj5', 'obj6', 'obj7', 'obj8', 'obj9', 'obj10', 'obj12', 'obj11'];
            _this.shuffleArray(_this.choiceArray);

            _this.theImage1 = _this.choiceArray[0];
            _this.getThePositionValues1();
            _this.right_shape1 = _this.add.image(_this.x1, _this.y1, _this.choiceArray[0]);
            if (_this.choiceArray[0] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[0] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape1);

            _this.theImage2 = _this.choiceArray[1];
            _this.getThePositionValues2();
            _this.right_shape2 = _this.add.image(_this.x2, _this.y2, _this.choiceArray[1]);
            if (_this.choiceArray[1] == 'obj8') _this.right_shape2.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[1] == 'obj7') _this.right_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape2);

            _this.theImage3 = _this.choiceArray[2];
            _this.getThePositionValues3();
            _this.right_shape3 = _this.add.image(_this.x3, _this.y3, _this.choiceArray[2]);
            if (_this.choiceArray[2] == 'obj8') _this.right_shape3.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[2] == 'obj7') _this.right_shape3.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape3);

            _this.theImage4 = _this.choiceArray[3];
            _this.getThePositionValues4();
            _this.right_shape4 = _this.add.image(_this.x4, _this.y4, _this.choiceArray[3]);
            if (_this.choiceArray[3] == 'obj8') _this.right_shape4.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[3] == 'obj7') _this.right_shape4.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape4);

        } else if (_this.numbersRect[0] === 3) {
            console.log("33333"); // 2nd box wrong ans
            _this.choiceArray = ['obj4', 'obj5', 'obj6', 'obj7', 'obj8', 'obj9', 'obj10', 'obj12', 'obj11'];
            _this.shuffleArray(_this.choiceArray);
            _this.wrongChoiceArray = ['obj1', 'obj2', 'obj3', 'obj13', 'obj14', 'obj15', 'obj16', 'obj17'];
            _this.shuffleArray(_this.wrongChoiceArray);

            _this.theImage2 = _this.wrongChoiceArray[0];
            _this.getThePositionValues2();
            _this.wrong_shape1 = _this.add.image(_this.x2, _this.y2, _this.wrongChoiceArray[0]);
            if (_this.wrongChoiceArray[0] == 'obj8') _this.wrong_shape1.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[0] == 'obj7') _this.wrong_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape1);

            _this.theImage1 = _this.choiceArray[0];
            _this.getThePositionValues1()
            _this.right_shape1 = _this.add.image(_this.x1, _this.y1, _this.choiceArray[0]);
            if (_this.choiceArray[0] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[0] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape1);

            _this.theImage3 = _this.choiceArray[1];
            _this.getThePositionValues3();
            _this.right_shape2 = _this.add.image(_this.x3, _this.y3, _this.choiceArray[1]);
            if (_this.choiceArray[1] == 'obj8') _this.right_shape2.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[1] == 'obj7') _this.right_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape2);

            _this.theImage4 = _this.choiceArray[2];
            _this.getThePositionValues4();
            _this.right_shape3 = _this.add.image(_this.x4, _this.y4, _this.choiceArray[2]);
            if (_this.choiceArray[2] == 'obj8') _this.right_shape3.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[2] == 'obj7') _this.right_shape3.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape3);
        }
        else if (_this.numbersRect[0] === 2) {
            console.log("222222");// 3rd box wrong ans
            _this.choiceArray = ['obj4', 'obj5', 'obj6', 'obj7', 'obj8', 'obj9', 'obj10', 'obj12', 'obj11'];
            _this.shuffleArray(_this.choiceArray);
            _this.wrongChoiceArray = ['obj1', 'obj2', 'obj3', 'obj13', 'obj14', 'obj15', 'obj16', 'obj17'];
            _this.shuffleArray(_this.wrongChoiceArray);

            _this.theImage3 = _this.wrongChoiceArray[0];
            _this.getThePositionValues3();
            _this.wrong_shape1 = _this.add.image(_this.x3, _this.y3, _this.wrongChoiceArray[0]);
            if (_this.wrongChoiceArray[0] == 'obj8') _this.wrong_shape1.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[0] == 'obj7') _this.wrong_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape1);

            _this.theImage2 = _this.wrongChoiceArray[1];
            _this.getThePositionValues2();
            _this.wrong_shape2 = _this.add.image(_this.x2, _this.y2, _this.wrongChoiceArray[1]);
            if (_this.wrongChoiceArray[1] == 'obj8') _this.wrong_shape2.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[1] == 'obj7') _this.wrong_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape2);

            _this.theImage1 = _this.choiceArray[0];
            _this.getThePositionValues1();
            _this.right_shape1 = _this.add.image(_this.x1, _this.y1, _this.choiceArray[0]);
            if (_this.choiceArray[0] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[0] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape1);

            _this.theImage4 = _this.choiceArray[1];
            _this.getThePositionValues4();
            _this.right_shape2 = _this.add.image(_this.x4, _this.y4, _this.choiceArray[1]);
            if (_this.choiceArray[1] == 'obj8') _this.right_shape2.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[1] == 'obj7') _this.right_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape2);
        }
        else if (_this.numbersRect[0] === 1) {
            console.log("111111"); // 4th box wrong ans
            _this.choiceArray = ['obj4', 'obj5', 'obj6', 'obj7', 'obj8', 'obj9', 'obj10', 'obj12', 'obj11'];
            _this.shuffleArray(_this.choiceArray);
            _this.wrongChoiceArray = ['obj1', 'obj2', 'obj3', 'obj13', 'obj14', 'obj15', 'obj16', 'obj17'];
            _this.shuffleArray(_this.wrongChoiceArray);

            _this.theImage4 = _this.wrongChoiceArray[0]
            _this.getThePositionValues4();
            _this.wrong_shape1 = _this.add.image(_this.x4, _this.y4, _this.wrongChoiceArray[0]);
            if (_this.wrongChoiceArray[0] == 'obj8') _this.wrong_shape1.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[0] == 'obj7') _this.wrong_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape1);

            _this.theImage1 = _this.wrongChoiceArray[1];
            _this.getThePositionValues1();
            _this.wrong_shape2 = _this.add.image(_this.x1, _this.y1, _this.wrongChoiceArray[1]);
            if (_this.wrongChoiceArray[1] == 'obj8') _this.wrong_shape2.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[1] == 'obj7') _this.wrong_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape2);

            _this.theImage2 = _this.wrongChoiceArray[2];
            _this.getThePositionValues2();
            _this.wrong_shape3 = _this.add.image(_this.x2, _this.y2, _this.wrongChoiceArray[2]);
            if (_this.wrongChoiceArray[2] == 'obj8') _this.wrong_shape3.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[2] == 'obj7') _this.wrong_shape3.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape3);

            _this.theImage3 = _this.choiceArray[0];
            _this.getThePositionValues3();
            _this.right_shape1 = _this.add.image(_this.x3, _this.y3, _this.choiceArray[0]);
            if (_this.choiceArray[0] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[0] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape1);
        }
    },
    //* Displays circle shape and its real time option objects
    gotoCircleshape: function () {
        _this.QNo = 5; //Question number
        _this.Shape5_Flag = 1;

        _this.Circle1 = _this.add.image(160, 230, 'shape8');
        _this.Circle1.scale.setTo(1.1, 1.1);
        _this.clearArray.push(_this.Circle1);

        _this.numbersCircle = [1, 2, 3, 4]; // 4 wrong ans 1 2 3 right ans
        Phaser.ArrayUtils.shuffle(_this.numbersCircle);

        if (_this.numbersCircle[0] === 4) {
            console.log("44444"); // 1st box wrong ans
            _this.choiceArray = ['obj4', 'obj5', 'obj6', 'obj13', 'obj14'];
            _this.shuffleArray(_this.choiceArray);

            _this.theImage1 = _this.choiceArray[0];
            _this.getThePositionValues1();
            _this.right_shape1 = _this.add.image(_this.x1, _this.y1, _this.choiceArray[0]);
            if (_this.choiceArray[0] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[0] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape1);

            _this.theImage2 = _this.choiceArray[1];
            _this.getThePositionValues2();
            _this.right_shape2 = _this.add.image(_this.x2, _this.y2, _this.choiceArray[1]);
            if (_this.choiceArray[1] == 'obj8') _this.right_shape2.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[1] == 'obj7') _this.right_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape2);

            _this.theImage3 = _this.choiceArray[2];
            _this.getThePositionValues3();
            _this.right_shape3 = _this.add.image(_this.x3, _this.y3, _this.choiceArray[2]);
            if (_this.choiceArray[2] == 'obj8') _this.right_shape3.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[2] == 'obj7') _this.right_shape3.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape3);

            _this.theImage4 = _this.choiceArray[3];
            _this.getThePositionValues4();
            _this.right_shape4 = _this.add.image(_this.x4, _this.y4, _this.choiceArray[3]);
            if (_this.choiceArray[3] == 'obj8') _this.right_shape4.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[3] == 'obj7') _this.right_shape4.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape4);

        } else if (_this.numbersCircle[0] === 3) {
            console.log("33333"); // 2nd box wrong ans
            _this.choiceArray = ['obj4', 'obj5', 'obj6', 'obj13', 'obj14'];
            _this.shuffleArray(_this.choiceArray);
            _this.wrongChoiceArray = ['obj1', 'obj2', 'obj3', 'obj7', 'obj8', 'obj9', 'obj10', 'obj11', 'obj12', 'obj15', 'obj16', 'obj17'];
            _this.shuffleArray(_this.wrongChoiceArray);

            _this.theImage2 = _this.wrongChoiceArray[0];
            _this.getThePositionValues2();
            _this.wrong_shape1 = _this.add.image(_this.x2, _this.y2, _this.wrongChoiceArray[0]);
            if (_this.wrongChoiceArray[0] == 'obj8') _this.wrong_shape1.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[0] == 'obj7') _this.wrong_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape1);

            _this.theImage1 = _this.choiceArray[0];
            _this.getThePositionValues1();
            _this.right_shape1 = _this.add.image(_this.x1, _this.y1, _this.choiceArray[0]);
            if (_this.choiceArray[0] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[0] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape1);

            _this.theImage3 = _this.choiceArray[1];
            _this.getThePositionValues3();
            _this.right_shape2 = _this.add.image(_this.x3, _this.y3, _this.choiceArray[1]);
            if (_this.choiceArray[1] == 'obj8') _this.right_shape2.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[1] == 'obj7') _this.right_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape2);

            _this.theImage4 = _this.choiceArray[2];
            _this.getThePositionValues4();
            _this.right_shape3 = _this.add.image(_this.x4, _this.y4, _this.choiceArray[2]);
            if (_this.choiceArray[2] == 'obj8') _this.right_shape3.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[2] == 'obj7') _this.right_shape3.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape3);
        }
        else if (_this.numbersCircle[0] === 2) {
            console.log("222222");// 3rd box wrong ans
            _this.choiceArray = ['obj4', 'obj5', 'obj6', 'obj13', 'obj14'];
            _this.shuffleArray(_this.choiceArray);
            _this.wrongChoiceArray = ['obj1', 'obj2', 'obj3', 'obj7', 'obj8', 'obj9', 'obj10', 'obj11', 'obj12', 'obj15', 'obj16', 'obj17'];
            _this.shuffleArray(_this.wrongChoiceArray);

            _this.theImage3 = _this.wrongChoiceArray[0];
            _this.getThePositionValues3();
            _this.wrong_shape1 = _this.add.image(_this.x3, _this.y3, _this.wrongChoiceArray[0]);
            if (_this.wrongChoiceArray[0] == 'obj8') _this.wrong_shape1.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[0] == 'obj7') _this.wrong_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape1);

            _this.theImage2 = _this.wrongChoiceArray[1];
            _this.getThePositionValues2();
            _this.wrong_shape2 = _this.add.image(_this.x2, _this.y2, _this.wrongChoiceArray[1]);
            if (_this.wrongChoiceArray[1] == 'obj8') _this.wrong_shape2.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[1] == 'obj7') _this.wrong_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape2);

            _this.theImage1 = _this.choiceArray[0];
            _this.getThePositionValues1();
            _this.right_shape1 = _this.add.image(_this.x1, _this.y1, _this.choiceArray[0]);
            if (_this.choiceArray[0] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[0] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape1);

            _this.theImage4 = _this.choiceArray[1];
            _this.getThePositionValues4();
            _this.right_shape2 = _this.add.image(_this.x4, _this.y4, _this.choiceArray[1]);
            if (_this.choiceArray[1] == 'obj8') _this.right_shape2.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[1] == 'obj7') _this.right_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape2);
        }
        else if (_this.numbersCircle[0] === 1) {
            console.log("111111"); // 4th box wrong ans
            _this.choiceArray = ['obj4', 'obj5', 'obj6', 'obj13', 'obj14'];
            _this.shuffleArray(_this.choiceArray);
            _this.wrongChoiceArray = ['obj1', 'obj2', 'obj3', 'obj7', 'obj8', 'obj9', 'obj10', 'obj11', 'obj12', 'obj15', 'obj16', 'obj17'];
            _this.shuffleArray(_this.wrongChoiceArray);

            _this.theImage4 = _this.wrongChoiceArray[0]
            _this.getThePositionValues4();
            _this.wrong_shape1 = _this.add.image(_this.x4, _this.y4, _this.wrongChoiceArray[0]);
            if (_this.wrongChoiceArray[0] == 'obj8') _this.wrong_shape1.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[0] == 'obj7') _this.wrong_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape1);

            _this.theImage1 = _this.wrongChoiceArray[1];
            _this.getThePositionValues1();
            _this.wrong_shape2 = _this.add.image(_this.x1, _this.y1, _this.wrongChoiceArray[1]);
            if (_this.wrongChoiceArray[1] == 'obj8') _this.wrong_shape2.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[1] == 'obj7') _this.wrong_shape2.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape2);

            _this.theImage2 = _this.wrongChoiceArray[2];
            _this.getThePositionValues2();
            _this.wrong_shape3 = _this.add.image(_this.x2, _this.y2, _this.wrongChoiceArray[2]);
            if (_this.wrongChoiceArray[2] == 'obj8') _this.wrong_shape3.scale.setTo(0.9, 0.9);
            if (_this.wrongChoiceArray[2] == 'obj7') _this.wrong_shape3.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.wrong_shape3);

            _this.theImage3 = _this.choiceArray[0];
            _this.getThePositionValues3();
            _this.right_shape1 = _this.add.image(_this.x3, _this.y3, _this.choiceArray[0]);
            if (_this.choiceArray[0] == 'obj8') _this.right_shape1.scale.setTo(0.9, 0.9);
            if (_this.choiceArray[0] == 'obj7') _this.right_shape1.scale.setTo(0.85, 0.9);
            _this.clearArray.push(_this.right_shape1);
        }
    },
    //* used for frame change of the option boxes in part B
    changeFrame11: function () {
        if (_this.selectedBox1 === true) {
            _this.Box2_1.frame = 0;
            _this.selectedBox1 = false;
        } else {
            _this.Box2_1.frame = 1;
            _this.selectedBox1 = true;
        }
    },

    changeFrame12: function () {
        if (_this.selectedBox2 === true) {
            _this.Box2_2.frame = 0;
            _this.selectedBox2 = false;
        } else {
            _this.Box2_2.frame = 1;
            _this.selectedBox2 = true;
        }
    },

    changeFrame13: function () {
        if (_this.selectedBox3 === true) {
            _this.Box2_3.frame = 0;
            _this.selectedBox3 = false;
        } else {
            _this.Box2_3.frame = 1;
            _this.selectedBox3 = true;
        }
    },

    changeFrame14: function () {
        if (_this.selectedBox4 === true) {
            _this.Box2_4.frame = 0;
            _this.selectedBox4 = false;
        } else {
            _this.Box2_4.frame = 1;
            _this.selectedBox4 = true;
        }
    },
    //*Tick button in the question screen and the evaluation of the top box or workspace. Part B
    tickFirstEvaluation: function (target) {
        console.log("tick evaluation");
        _this.clickSound.play();
        _this.tickFlag = 2;

        if (_this.Shape1_Flag) {
            if (_this.numbers[0] == 4) {
                console.log("4 >>");
                if (_this.selectedBox1 == true && _this.selectedBox2 == true && _this.selectedBox3 === true && _this.selectedBox4 == true) {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else {
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }
            } else if (_this.numbers[0] == 3) {
                console.log("3 >>");
                if (_this.selectedBox1 == true && _this.selectedBox3 == true && _this.selectedBox4 == true && _this.selectedBox2 === false) {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox2 == true) {
                    _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                    _this.selectedBox2 = false;
                } else {
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }

            } else if (_this.numbers[0] == 2) {
                console.log("2 >>");
                if (_this.selectedBox1 == true && _this.selectedBox4 == true && _this.selectedBox2 === false && _this.selectedBox3 == false) {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox2 == true || _this.selectedBox3 == true) {
                    if (_this.selectedBox2 == true) {
                        _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                        _this.selectedBox2 = false;
                    }
                    if (_this.selectedBox3 == true) {
                        _this.handleSelectedBox(_this.Box2_3, _this.selectedBox3, _this.wrongSound);
                        _this.selectedBox3 = false;
                    }
                } else {
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }

            } else if (_this.numbers[0] == 1) {
                console.log("1 >>");
                if (_this.selectedBox3 == true && _this.selectedBox1 == false && _this.selectedBox4 == false && _this.selectedBox2 === false) {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox1 == true || _this.selectedBox2 == true || _this.selectedBox4 == true) {
                    if (_this.selectedBox1 == true) {
                        _this.handleSelectedBox(_this.Box2_1, _this.selectedBox1, _this.wrongSound);
                        _this.selectedBox1 = false;
                    }
                    if (_this.selectedBox2 == true) {
                        _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                        _this.selectedBox2 = false;
                    }
                    if (_this.selectedBox4 == true) {
                        _this.handleSelectedBox(_this.Box2_4, _this.selectedBox4, _this.wrongSound);
                        _this.selectedBox4 = false;
                    }
                } else {
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }
            }
        } else if (_this.Shape2_Flag) {
            if (_this.numbersTri[0] == 4) {
                console.log("4 >>");
                if (_this.selectedBox1 == true && _this.selectedBox2 == true && _this.selectedBox3 === true && _this.selectedBox4 == true) {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else {
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }
            } else if (_this.numbersTri[0] == 3) {
                console.log("3 >>");
                if (_this.selectedBox1 == true && _this.selectedBox3 == true && _this.selectedBox4 == true && _this.selectedBox2 === false) {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox2 == true) {
                    _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                    _this.selectedBox2 = false;
                } else {
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }

            } else if (_this.numbersTri[0] == 2) {
                console.log("2 >>");
                if (_this.selectedBox1 == true && _this.selectedBox4 == true && _this.selectedBox2 === false && _this.selectedBox3 == false) {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox2 == true || _this.selectedBox3 == true) {
                    if (_this.selectedBox2 == true) {
                        _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                        _this.selectedBox2 = false;
                    }
                    if (_this.selectedBox3 == true) {
                        _this.handleSelectedBox(_this.Box2_3, _this.selectedBox3, _this.wrongSound);
                        _this.selectedBox3 = false;
                    }
                } else {
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }

            } else if (_this.numbersTri[0] == 1) {
                console.log("1 >>");
                if (_this.selectedBox3 == true && _this.selectedBox1 == false && _this.selectedBox4 == false && _this.selectedBox2 === false) {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox1 == true || _this.selectedBox2 == true || _this.selectedBox4 == true) {
                    if (_this.selectedBox1 == true) {
                        _this.handleSelectedBox(_this.Box2_1, _this.selectedBox1, _this.wrongSound);
                        _this.selectedBox1 = false;
                    }
                    if (_this.selectedBox2 == true) {
                        _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                        _this.selectedBox2 = false;
                    }
                    if (_this.selectedBox4 == true) {
                        _this.handleSelectedBox(_this.Box2_4, _this.selectedBox4, _this.wrongSound);
                        _this.selectedBox4 = false;
                    }

                } else {
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }
            }
        } else if (_this.Shape3_Flag) {

            if (_this.numbersCylinder[0] == 3) {
                console.log("3 >>");
                if (_this.selectedBox1 == true && _this.selectedBox3 == true && _this.selectedBox4 == true && _this.selectedBox2 == false) {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox2 == true) {
                    _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                    _this.selectedBox2 = false;
                } else {
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }

            } else if (_this.numbersCylinder[0] == 2) {
                console.log("2 >>");
                if (_this.selectedBox1 == true && _this.selectedBox4 == true && _this.selectedBox2 == false && _this.selectedBox3 == false) {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox2 == true || _this.selectedBox3 == true) {
                    if (_this.selectedBox2 == true) {
                        _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                        _this.selectedBox2 = false;
                    }
                    if (_this.selectedBox3 == true) {
                        _this.handleSelectedBox(_this.Box2_3, _this.selectedBox3, _this.wrongSound);
                        _this.selectedBox3 = false;
                    }
                } else {
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }

            } else if (_this.numbersCylinder[0] === 1) {
                console.log("1 >>");
                if (_this.selectedBox3 == true && _this.selectedBox1 == false && _this.selectedBox4 == false && _this.selectedBox2 === false) {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox1 == true || _this.selectedBox2 == true || _this.selectedBox4 == true) {
                    if (_this.selectedBox1 == true) {
                        _this.handleSelectedBox(_this.Box2_1, _this.selectedBox1, _this.wrongSound);
                        _this.selectedBox1 = false;
                    }
                    if (_this.selectedBox2 == true) {
                        _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                        _this.selectedBox2 = false;
                    }
                    if (_this.selectedBox4 == true) {
                        _this.handleSelectedBox(_this.Box2_4, _this.selectedBox4, _this.wrongSound);
                        _this.selectedBox4 = false;
                    }
                } else {
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }
            }
        }
        else if (_this.Shape4_Flag) {
            if (_this.numbersRect[0] == 4) {
                console.log("4 >>");
                if (_this.selectedBox1 == true && _this.selectedBox2 == true && _this.selectedBox3 === true && _this.selectedBox4 == true) {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else {
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }
            } else if (_this.numbersRect[0] == 3) {
                console.log("3 >>");
                if (_this.selectedBox1 == true && _this.selectedBox3 == true && _this.selectedBox4 == true && _this.selectedBox2 === false) {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox2 == true) {
                    _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                    _this.selectedBox2 = false;
                } else {
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }

            } else if (_this.numbersRect[0] == 2) {
                console.log("2 >>");
                if (_this.selectedBox1 == true && _this.selectedBox4 == true && _this.selectedBox2 === false && _this.selectedBox3 == false) {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox2 == true || _this.selectedBox3 == true) {
                    if (_this.selectedBox2 == true) {
                        _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                        _this.selectedBox2 = false;
                    }
                    if (_this.selectedBox3 === true) {
                        _this.handleSelectedBox(_this.Box2_3, _this.selectedBox3, _this.wrongSound);
                        _this.selectedBox3 = false;
                    }
                } else {
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }

            } else if (_this.numbersRect[0] == 1) {
                console.log("1 >>");
                if (_this.selectedBox3 == true && _this.selectedBox1 == false && _this.selectedBox4 == false && _this.selectedBox2 === false) {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox1 == true || _this.selectedBox2 == true || _this.selectedBox4 == true) {
                    if (_this.selectedBox1 == true) {
                        _this.handleSelectedBox(_this.Box2_1, _this.selectedBox1, _this.wrongSound);
                        _this.selectedBox1 = false;
                    }
                    if (_this.selectedBox2 == true) {
                        _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                        _this.selectedBox2 = false;
                    }
                    if (_this.selectedBox4 == true) {
                        _this.handleSelectedBox(_this.Box2_4, _this.selectedBox4, _this.wrongSound);
                        _this.selectedBox4 = false;
                    }

                } else {
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }
            }
        } else if (_this.Shape5_Flag) {
            if (_this.numbersCircle[0] == 4) {
                console.log("4 >>");
                if (_this.selectedBox1 == true && _this.selectedBox2 == true && _this.selectedBox3 === true && _this.selectedBox4 == true) {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else {
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }
            } else if (_this.numbersCircle[0] == 3) {
                console.log("3 >>");
                if (_this.selectedBox1 == true && _this.selectedBox3 == true && _this.selectedBox4 == true && _this.selectedBox2 === false) {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox2 == true) {
                    _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                    _this.selectedBox2 = false;
                } else {
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }

            } else if (_this.numbersCircle[0] == 2) {
                console.log("2 >>");
                if (_this.selectedBox1 == true && _this.selectedBox4 == true && _this.selectedBox2 === false && _this.selectedBox3 == false) {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox2 == true || _this.selectedBox3 == true) {
                    if (_this.selectedBox2 == true) {
                        _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                        _this.selectedBox2 = false;
                    }
                    if (_this.selectedBox3 == true) {
                        _this.handleSelectedBox(_this.Box2_3, _this.selectedBox3, _this.wrongSound);
                        _this.selectedBox3 = false;
                    }
                } else {
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }

            } else if (_this.numbersCircle[0] == 1) {
                console.log("1 >>");
                if (_this.selectedBox3 == true && _this.selectedBox1 == false && _this.selectedBox4 == false && _this.selectedBox2 === false) {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox1 == true || _this.selectedBox2 == true || _this.selectedBox4 == true) {
                    if (_this.selectedBox1 == true) {
                        _this.handleSelectedBox(_this.Box2_1, _this.selectedBox1, _this.wrongSound);
                        _this.selectedBox1 = false;
                    }
                    if (_this.selectedBox2 == true) {
                        _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                        _this.selectedBox2 = false;
                    }
                    if (_this.selectedBox4 == true) {
                        _this.handleSelectedBox(_this.Box2_4, _this.selectedBox4, _this.wrongSound);
                        _this.selectedBox4 = false;
                    }

                } else {
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }
            }
        } else {
            _this.noofAttempts++;
            _this.wrongSound.play();
        }
    },
    //*Tick button in the question screen and the evaluation of the top box or workspace. Part A
    tickSecondEvaluation: function (target) {
        console.log("tick evaluation 2");
        _this.clickSound.play();
        _this.tickFlag = 1;
        if (_this.numbers[_this.count1] == 1) {
            if (_this.objectArray[0] == 1) {
                if (_this.selectedBox1 == true && _this.box1.name == 'shape7') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();

                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox2 == true && _this.box2.name == 'shape7') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    //_this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox3 == true && _this.box3.name == 'shape7') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else {
                    if (_this.selectedBox1 == true) {
                        var blinkTween = _this.add.tween(_this.box1).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box1.tint = 0xffffff;
                        }, this);

                        _this.box1.frame = 0;
                        _this.selectedBox1 = false;
                    }
                    if (_this.selectedBox2 == true) {
                        var blinkTween = _this.add.tween(_this.box2).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box2.tint = 0xffffff;
                        }, this);

                        _this.box2.frame = 0;
                        _this.selectedBox2 = false;
                    }
                    if (_this.selectedBox3 == true) {
                        var blinkTween = _this.add.tween(_this.box3).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box3.tint = 0xffffff;
                        }, this);

                        _this.box3.frame = 0;
                        _this.selectedBox3 = false;
                    }
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }
            } else {
                if (_this.selectedBox1 == true && _this.box1.name == 'shape14') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox2 == true && _this.box2.name == 'shape14') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox3 == true && _this.box3.name == 'shape14') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else {
                    if (_this.selectedBox1 == true) {
                        var blinkTween = _this.add.tween(_this.box1).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box1.tint = 0xffffff;
                        }, this);

                        _this.box1.frame = 0;
                        _this.selectedBox1 = false;
                    }
                    if (_this.selectedBox2 == true) {
                        var blinkTween = _this.add.tween(_this.box2).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box2.tint = 0xffffff;
                        }, this);

                        _this.box2.frame = 0;
                        _this.selectedBox2 = false;
                    }
                    if (_this.selectedBox3 == true) {
                        var blinkTween = _this.add.tween(_this.box3).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box3.tint = 0xffffff;
                        }, this);

                        _this.box3.frame = 0;
                        _this.selectedBox3 = false;
                    }
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }
            }
        } else if (_this.numbers[_this.count1] == 2) {
            if (_this.objectArray[0] == 1) {
                if (_this.selectedBox1 == true && _this.box1.name == 'shape7') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    //  _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox2 == true && _this.box2.name == 'shape7') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox3 == true && _this.box3.name == 'shape7') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else {
                    if (_this.selectedBox1 == true) {
                        var blinkTween = _this.add.tween(_this.box1).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box1.tint = 0xffffff;
                        }, this);

                        _this.box1.frame = 0;
                        _this.selectedBox1 = false;
                    }
                    if (_this.selectedBox2 == true) {
                        var blinkTween = _this.add.tween(_this.box2).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box2.tint = 0xffffff;
                        }, this);

                        _this.box2.frame = 0;
                        _this.selectedBox2 = false;
                    }
                    if (_this.selectedBox3 == true) {
                        var blinkTween = _this.add.tween(_this.box3).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box3.tint = 0xffffff;
                        }, this);

                        _this.box3.frame = 0;
                        _this.selectedBox3 = false;
                    }
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }
            } else {
                if (_this.selectedBox1 == true && _this.box1.name == 'shape9') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox2 == true && _this.box2.name == 'shape9') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox3 == true && _this.box3.name == 'shape9') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else {
                    if (_this.selectedBox1 == true) {
                        var blinkTween = _this.add.tween(_this.box1).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box1.tint = 0xffffff;
                        }, this);

                        _this.box1.frame = 0;
                        _this.selectedBox1 = false;
                    }
                    if (_this.selectedBox2 == true) {
                        var blinkTween = _this.add.tween(_this.box2).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box2.tint = 0xffffff;
                        }, this);

                        _this.box2.frame = 0;
                        _this.selectedBox2 = false;
                    }
                    if (_this.selectedBox3 == true) {
                        var blinkTween = _this.add.tween(_this.box3).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box3.tint = 0xffffff;
                        }, this);

                        _this.box3.frame = 0;
                        _this.selectedBox3 = false;
                    }
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }
            }
        } else if (_this.numbers[_this.count1] == 3) {
            if (_this.objectArray[0] == 1) {
                if (_this.selectedBox1 == true && _this.box1.name == 'shape8') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox2 == true && _this.box2.name == 'shape8') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox3 == true && _this.box3.name == 'shape8') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else {
                    if (_this.selectedBox1 == true) {
                        var blinkTween = _this.add.tween(_this.box1).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box1.tint = 0xffffff;
                        }, this);

                        _this.box1.frame = 0;
                        _this.selectedBox1 = false;
                    }
                    if (_this.selectedBox2 == true) {
                        var blinkTween = _this.add.tween(_this.box2).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box2.tint = 0xffffff;
                        }, this);

                        _this.box2.frame = 0;
                        _this.selectedBox2 = false;
                    }
                    if (_this.selectedBox3 == true) {
                        var blinkTween = _this.add.tween(_this.box3).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box3.tint = 0xffffff;
                        }, this);

                        _this.box3.frame = 0;
                        _this.selectedBox3 = false;
                    }
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }
            } else {
                if (_this.selectedBox1 == true && _this.box1.name == 'shape7') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox2 == true && _this.box2.name == 'shape7') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox3 == true && _this.box3.name == 'shape7') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else {
                    if (_this.selectedBox1 == true) {
                        var blinkTween = _this.add.tween(_this.box1).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box1.tint = 0xffffff;
                        }, this);

                        _this.box1.frame = 0;
                        _this.selectedBox1 = false;
                    }
                    if (_this.selectedBox2 == true) {
                        var blinkTween = _this.add.tween(_this.box2).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box2.tint = 0xffffff;
                        }, this);

                        _this.box2.frame = 0;
                        _this.selectedBox2 = false;
                    }
                    if (_this.selectedBox3 == true) {
                        var blinkTween = _this.add.tween(_this.box3).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box3.tint = 0xffffff;
                        }, this);

                        _this.box3.frame = 0;
                        _this.selectedBox3 = false;
                    }
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }
            }
        } else if (_this.numbers[_this.count1] == 4) {
            if (_this.selectedBox1 == true && _this.box1.name == 'shape14') {
                _this.celebrationSound.play();
                _this.disableBoxes();
                _this.starActions();
                // _this.count1++;
                _this.time.events.add(3000, () => {
                    _this.clearAll();
                    _this.NextQuestion();
                });
            } else if (_this.selectedBox2 == true && _this.box2.name == 'shape14') {
                _this.celebrationSound.play();
                _this.disableBoxes();
                _this.starActions();
                // _this.count1++;
                _this.time.events.add(3000, () => {
                    _this.clearAll();
                    _this.NextQuestion();
                });
            } else if (_this.selectedBox3 == true && _this.box3.name == 'shape14') {
                _this.celebrationSound.play();
                _this.disableBoxes();
                _this.starActions();
                // _this.count1++;
                _this.time.events.add(3000, () => {
                    _this.clearAll();
                    _this.NextQuestion();
                });
            } else {
                if (_this.selectedBox1 == true) {
                    var blinkTween = _this.add.tween(_this.box1).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                    _this.time.events.add(500, function () {
                        blinkTween.stop();
                        _this.box1.tint = 0xffffff;
                    }, this);

                    _this.box1.frame = 0;
                    _this.selectedBox1 = false;
                }
                if (_this.selectedBox2 == true) {
                    var blinkTween = _this.add.tween(_this.box2).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                    _this.time.events.add(500, function () {
                        blinkTween.stop();
                        _this.box2.tint = 0xffffff;
                    }, this);

                    _this.box2.frame = 0;
                    _this.selectedBox2 = false;
                }
                if (_this.selectedBox3 == true) {
                    var blinkTween = _this.add.tween(_this.box3).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                    _this.time.events.add(500, function () {
                        blinkTween.stop();
                        _this.box3.tint = 0xffffff;
                    }, this);

                    _this.box3.frame = 0;
                    _this.selectedBox3 = false;
                }
                _this.noofAttempts++;
                _this.wrongSound.play();
                // }
            }
        } else if (_this.numbers[_this.count1] == 5) {
            if (_this.selectedBox1 == true && _this.box1.name == 'shape7') {
                _this.celebrationSound.play();
                _this.disableBoxes();
                _this.starActions();
                // _this.count1++;
                _this.time.events.add(3000, () => {
                    _this.clearAll();
                    _this.NextQuestion();
                });
            } else if (_this.selectedBox2 == true && _this.box2.name == 'shape7') {
                _this.celebrationSound.play();
                _this.disableBoxes();
                _this.starActions();
                // _this.count1++;
                _this.time.events.add(3000, () => {
                    _this.clearAll();
                    _this.NextQuestion();
                });
            } else if (_this.selectedBox3 == true && _this.box3.name == 'shape7') {
                _this.celebrationSound.play();
                _this.disableBoxes();
                _this.starActions();
                // _this.count1++;
                _this.time.events.add(3000, () => {
                    _this.clearAll();
                    _this.NextQuestion();
                });
            } else {
                if (_this.selectedBox1 == true) {
                    var blinkTween = _this.add.tween(_this.box1).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                    _this.time.events.add(500, function () {
                        blinkTween.stop();
                        _this.box1.tint = 0xffffff;
                    }, this);

                    _this.box1.frame = 0;
                    _this.selectedBox1 = false;
                }
                if (_this.selectedBox2 == true) {
                    var blinkTween = _this.add.tween(_this.box2).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                    _this.time.events.add(500, function () {
                        blinkTween.stop();
                        _this.box2.tint = 0xffffff;
                    }, this);

                    _this.box2.frame = 0;
                    _this.selectedBox2 = false;
                }
                if (_this.selectedBox3 == true) {
                    var blinkTween = _this.add.tween(_this.box3).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                    _this.time.events.add(500, function () {
                        blinkTween.stop();
                        _this.box3.tint = 0xffffff;
                    }, this);

                    _this.box3.frame = 0;
                    _this.selectedBox3 = false;
                }
                _this.noofAttempts++;
                _this.wrongSound.play();
            }
        } else if (_this.numbers[_this.count1] == 6) {
            if (_this.objectArray[0] == 1 || _this.objectArray[0] == 2) {
                if (_this.selectedBox1 == true && _this.box1.name == 'shape8') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox2 == true && _this.box2.name == 'shape8') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox3 == true && _this.box3.name == 'shape8') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else {
                    if (_this.selectedBox1 == true) {
                        var blinkTween = _this.add.tween(_this.box1).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box1.tint = 0xffffff;
                        }, this);

                        _this.box1.frame = 0;
                        _this.selectedBox1 = false;
                    }
                    if (_this.selectedBox2 == true) {
                        var blinkTween = _this.add.tween(_this.box2).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box2.tint = 0xffffff;
                        }, this);

                        _this.box2.frame = 0;
                        _this.selectedBox2 = false;
                    }
                    if (_this.selectedBox3 == true) {
                        var blinkTween = _this.add.tween(_this.box3).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box3.tint = 0xffffff;
                        }, this);

                        _this.box3.frame = 0;
                        _this.selectedBox3 = false;
                    }
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }
            }
        } else if (_this.numbers[_this.count1] == 7) {
            if (_this.torch_Array[0] == 1) {
                if (_this.selectedBox1 == true && _this.box1.name == 'shape14') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox2 == true && _this.box2.name == 'shape14') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox3 == true && _this.box3.name == 'shape14') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else {
                    if (_this.selectedBox1 == true) {
                        var blinkTween = _this.add.tween(_this.box1).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box1.tint = 0xffffff;
                        }, this);

                        _this.box1.frame = 0;
                        _this.selectedBox1 = false;
                    }
                    if (_this.selectedBox2 == true) {
                        var blinkTween = _this.add.tween(_this.box2).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box2.tint = 0xffffff;
                        }, this);

                        _this.box2.frame = 0;
                        _this.selectedBox2 = false;
                    }
                    if (_this.selectedBox3 == true) {
                        var blinkTween = _this.add.tween(_this.box3).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box3.tint = 0xffffff;
                        }, this);

                        _this.box3.frame = 0;
                        _this.selectedBox3 = false;
                    }
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }
            } else {
                _this.count1++;
                if (_this.selectedBox1 == true && _this.box1.name == 'shape9') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    // _this.count1++;
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox2 == true && _this.box2.name == 'shape9') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();

                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else if (_this.selectedBox3 == true && _this.box3.name == 'shape9') {
                    _this.celebrationSound.play();
                    _this.disableBoxes();
                    _this.starActions();
                    _this.time.events.add(3000, () => {
                        _this.clearAll();
                        _this.NextQuestion();
                    });
                } else {
                    if (_this.selectedBox1 == true) {
                        var blinkTween = _this.add.tween(_this.box1).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box1.tint = 0xffffff;
                        }, this);

                        _this.box1.frame = 0;
                        _this.selectedBox1 = false;
                    }
                    if (_this.selectedBox2 == true) {
                        var blinkTween = _this.add.tween(_this.box2).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box2.tint = 0xffffff;
                        }, this);

                        _this.box2.frame = 0;
                        _this.selectedBox2 = false;
                    }
                    if (_this.selectedBox3 == true) {
                        var blinkTween = _this.add.tween(_this.box3).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                        _this.time.events.add(500, function () {
                            blinkTween.stop();
                            _this.box3.tint = 0xffffff;
                        }, this);

                        _this.box3.frame = 0;
                        _this.selectedBox3 = false;
                    }
                    _this.noofAttempts++;
                    _this.wrongSound.play();
                }
            }
        } else {
            _this.wrongSound.play();
        }
    },

    handleSelectedBox: function (box, selected, sound) {
        if (selected) {
            var blinkTween = _this.add.tween(box).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
            _this.time.events.add(500, function () {
                blinkTween.stop();
                box.tint = 0xffffff;
            }, this);

            box.frame = 0;

            sound.play();
        }
    },

    removeStyle: function (target) {
        target.visible = false;
    },

    //clearing the screen after each question
    clearAll: function () {
        _this.shapesGroup.destroy();
        _this.QuestionGroup.destroy();

        _this.clearArray.forEach(element => {
            element.destroy();
        });

        _this.tick.destroy();

        _this.Shape1_Flag = 0;
        _this.Shape2_Flag = 0;
        _this.Shape3_Flag = 0;
        _this.Shape4_Flag = 0;
        _this.Shape5_Flag = 0;
        _this.Shape6_Flag = 0;
        _this.Shape7_Flag = 0;

        _this.right = false;
        _this.wrong = false;

        _this.selectedBox1 = false;
        _this.selectedBox2 = false;
        _this.selectedBox3 = false;
        _this.selectedBox4 = false;
    },

    disableBoxes: function () {
        if (_this.tickFlag == 1) {
            _this.tick.events.onInputDown.removeAll();

            _this.box1.events.onInputDown.removeAll();
            _this.box2.events.onInputDown.removeAll();
            _this.box3.events.onInputDown.removeAll();

            _this.box1.input.useHandCursor = false;
            _this.box2.input.useHandCursor = false;
            _this.box3.input.useHandCursor = false;
        } else if (_this.tickFlag == 2) {
            _this.tick.events.onInputDown.removeAll();

            _this.Box2_1.events.onInputDown.removeAll();
            _this.Box2_2.events.onInputDown.removeAll();
            _this.Box2_3.events.onInputDown.removeAll();
            _this.Box2_4.events.onInputDown.removeAll();

            _this.Box2_1.input.useHandCursor = false;
            _this.Box2_2.input.useHandCursor = false;
            _this.Box2_3.input.useHandCursor = false;
            _this.Box2_4.input.useHandCursor = false;
        }
    },

    //Adding a star to the above created six stars.
    starActions: function (target) {
        _this.noofAttempts++;
        telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);

        _this.microConcepts = "GeometryG7";
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
            //console.log("removing the demo audio1");
            _this.demoAudio2.pause();
            _this.demoAudio2 = null;
            _this.demoAudio2src = null;
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
        _this.demoAudio1 = document.createElement('audio');
        _this.demoAudio1src = document.createElement('source');
        _this.demoAudio1src.setAttribute("src", window.baseUrl + "questionSounds/INT-DL3-G7/" + _this.languageSelected + "/V1.mp3");
        _this.demoAudio1.appendChild(_this.demoAudio1src);

        _this.demoAudio2 = document.createElement('audio');
        _this.demoAudio2src = document.createElement('source');
        _this.demoAudio2src.setAttribute("src", window.baseUrl + "questionSounds/INT-DL3-G7/" + _this.languageSelected + "/V2.mp3");
        _this.demoAudio2.appendChild(_this.demoAudio2src);

        // QUESTION AUDIOS
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/INT-DL3-G7/" +
            _this.languageSelected + "/V1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        _this.video_playing = 0;
        _this.showDemoVideo();  //* call the function to show the video


        _this.skip = _this.add.image(870, 390, 'skipArrow');       //* skip button shown at the bottom
        _this.skip.inputEnabled = true;
        _this.skip.input.useHandCursor = true;
        _this.skip.events.onInputDown.add(function () {
            _this.stopAudio();

            if (_this.demoVideo_2)
                _this.demoVideo_2.stop(false);
            if (_this.demoVideo_1)
                _this.demoVideo_1.stop(false);
            if (_this.videoWorld_1)
                _this.videoWorld_1.destroy();
            if (_this.videoWorld_2)
                _this.videoWorld_2.destroy();

            _this.game.paused = false;  //* restart the game
        });
    },
    showDemoVideo: function () {


        // _this.demoVideo_1 = _this.add.video('ML2_1');
        // _this.demoVideo_1.play(false);
        // _this.demoVideo_1.changeSource("demoVideos/ML2-G7_1.mp4");
        // _this.video_playing = 1;
        // _this.videoWorld_1 = _this.demoVideo_1.addToWorld();

        // //* play the demo audio1 after 4 sec delay
        // _this.demoAudio1Timer = setTimeout(function ()    //* demoAudio1 js timer to play demoAudio1Timer after 4 seconds.
        // {
        //     console.log("inside demoAudio1sound.....")
        //     _this.demoVideo_1.playbackRate = 0;     //* pausing the video after 4sec
        //     clearTimeout(_this.demoAudio1Timer);         //* clear the time once its used.
        //     _this.demoAudio1.play();
        // }, 4000);

        // _this.demoVideo1PauseTimer = setTimeout(function () {
        //     console.log("inside demoAudio1sound.....")
        //     _this.demoVideo_1.playbackRate = 1;  //* resuming the video after 9 sec
        //     clearTimeout(_this.demoVideo1PauseTimer);
        // }, 9000);

        // _this.q1Timer = setTimeout(function ()    //* q1 js timer to play q1 after 11 seconds.
        // {
        //     console.log("inside q1sound.....")
        //     clearTimeout(_this.q1Timer);         //* clear the time once its used.
        //     _this.q1Sound.play();
        // }, 11000);

        // _this.demoAudio2Timer = setTimeout(function ()    //* demo audio2 js timer to play demo audio2 after 10 seconds.
        // {
        //     console.log("inside demoau2sound.....")
        //     clearTimeout(_this.demoAudio2Timer);         //* clear the time once its used.
        //     _this.demoAudio2.play();
        // }, 19000);

        // _this.q2Timer = setTimeout(function ()    //* q2 js timer to play q2 after 15 seconds.
        // {
        //     console.log("inside q2sound.....")
        //     clearTimeout(_this.q2Timer);         //* clear the time once its used.
        //     _this.q2Sound.play();
        // }, 24000);

        // _this.demoVideo_1.onComplete.add(function () {
        //     console.log("audio2 ended - pause video1");
        //     _this.demoVideo_2 = _this.add.video('ML2_2');
        //     _this.demoVideo_2.play(false);
        //     _this.demoVideo_2.changeSource("demoVideos/ML2-G7_2.mp4");  //* phaser needs this.to run in mobile
        //     _this.video_playing = 2;
        //     _this.videoWorld_2 = _this.demoVideo_2.addToWorld();

        //     _this.skip.bringToTop();
        //     _this.q3Sound.play();
        //     _this.demoVideo_2.onComplete.add(function () {
        //         console.log("demovideo 2 completed......!!!1")
        //         _this.stopAudio();
        //         _this.demoVideo_2.stop(false);
        //         _this.demoVideo_1.stop(false);
        //         _this.videoWorld_1.destroy();
        //         _this.videoWorld_2.destroy();
        //         _this.game.paused = false;

        //     });
        // });
    }
}