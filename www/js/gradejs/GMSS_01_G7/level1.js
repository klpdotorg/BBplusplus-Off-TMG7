Game.GMSS_01_G7level1 = function () { };


Game.GMSS_01_G7level1.prototype =
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

        // _this.snapSound = document.createElement('audio');
        // _this.snapSoundsrc = document.createElement('source');
        // _this.snapSoundsrc.setAttribute("src", window.baseUrl + "sounds/snapSound.mp3");
        // _this.snapSound.appendChild(_this.snapSoundsrc);

        _this.framechange = document.createElement('audio');
        _this.framechangesrc = document.createElement('source');
        _this.framechangesrc.setAttribute("src", window.baseUrl + "sounds/Frame_change_sound.mp3");
        _this.framechange.appendChild(_this.framechangesrc);


        _this.Ask_Question1 = _this.createAudio("GMSS_01_G7_a1");
        telInitializer.gameIdInit("GMSS_01_G7", gradeSelected);// first Tele call
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
        _this.sceneCount =0;//no of screen
        _this.questionid = null;//always 1

       // _this.AnsTimerCount = 0;
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

        _this.namesArray = [];

        _this.shapesArray = [];
        _this.shapeCount = 0;
        _this.Shape1_Flag = 0;
        _this.Shape2_Flag = 0;
        _this.Shape3_Flag = 0;
        _this.Shape4_Flag = 0;
        _this.Shape5_Flag = 0;
        _this.Shape6_Flag = 0;
        _this.Shape7_Flag = 0;

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
            _this.state.start('grade7Geometry',true,false);
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
        // //_this.hintBtn.input.useHandCursor = true;
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

        _this.greenObjectArray = [];

        //* start the game with first question
        _this.time.events.add(1000, _this.getQuestion);

    },
    createAudio: function (src) {
        audio = document.createElement('audio');
        audiosrc = document.createElement('source');
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/GMSS_01_G7/" + _this.languageSelected + "/" + src + ".mp3");
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

        _this.shapesArray = [1, 2, 3, 4, 5, 6, 7];
        Phaser.ArrayUtils.shuffle(_this.shapesArray);
        _this.InitialScreen();

        _this.questionid = 1;
    },
    stopVoice: function () {
        _this.Ask_Question1.pause();
        _this.Ask_Question1 = null;

        if (_this.celebrationSound) {
            if (_this.celebrationSound.isPlaying) {
                _this.celebrationSound.stop();
                _this.celebrationSound = null;
            }
        }
       
    },

    NextQuestion: function () {
        console.log('next question.......')

        _this.shapeCount++;
        if (_this.shapeCount < 6) {
            _this.InitialScreen();//PartA
        }
        else {
            _this.timer1.stop();
            _this.timer1 = null;
            _this.time.events.add(1000, function () {_this.state.start('score', true, false,gameID, _this.microConcepts);
        });
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
    //this function is used for showing the question.

    InitialScreen: function () {
        _this.sceneCount++;
        _this.AnsTimerCount=0;
        _this.noofAttempts=0;

        _this.power = "\u{00B2}";
        _this.Question_flag = 1;
        if (_this.shapeCount === 0) {
            _this.Ask_Question1.play();
        }
        console.log("AskingQuestion")

        _this.thumbsUp = _this.add.sprite(865, 85, 'thumbsUp');
        _this.thumbsDown = _this.add.sprite(865, 160, 'thumbsDown');

        _this.Box1 = _this.add.sprite(40, 70, 'Box1');
        _this.Box2 = _this.add.sprite(450, 70, 'Box1');

        _this.thumbsUp.inputEnabled = true;
        _this.thumbsUp.input.useHandCursor = true;
        _this.thumbsUp.events.onInputDown.add(_this.tickFirstEvaluation, _this);

        _this.thumbsDown.inputEnabled = true;
        _this.thumbsDown.input.useHandCursor = true;
        _this.thumbsDown.events.onInputDown.add(_this.tickSecondEvaluation, _this);

        _this.shapesGroup = _this.add.group();

        _this.QuestionGroup = _this.add.group();

        console.log(_this.shapesArray)

        switch (_this.shapesArray[_this.shapeCount]) {
            case 1: _this.gotoShape1();
                break;
            case 2: _this.gotoShape2();
                break;
            case 3: _this.gotoShape3();
                break;
            case 4: _this.gotoShape4();
                break;
            case 5: _this.gotoShape5();
                break;
            case 6: _this.gotoShape6();
                break;
            case 7: _this.gotoShape7();
                break;

        }
    },

    gotoShape1: function () {
        _this.QNo = 1; //Question number
        _this.Shape1_Flag = 1;

        _this.shape1 = _this.add.image(60, 200, 'Shape1');
        _this.QuestionGroup.addChild(_this.shape1);

        var rightOrWrong = [1, 2]; // 1== right 2== wrong
        Phaser.ArrayUtils.shuffle(rightOrWrong);

        var rightShapes = [1, 2, 3, 4, 5, 6];
        Phaser.ArrayUtils.shuffle(rightShapes);

        var wrongShapes = [1, 2, 3, 4, 5, 6];
        Phaser.ArrayUtils.shuffle(wrongShapes);

        if (rightOrWrong[0] === 1) {
            if (rightShapes[0] === 1) { var right_shape1 = _this.add.image(460, 100, 'right1_Shape1'); right_shape1.name = 'R1S1'; _this.shapesGroup.addChild(right_shape1); }
            else if (rightShapes[0] === 2) { var right_shape2 = _this.add.image(490, 120, 'right2_Shape1'); right_shape2.name = 'R2S1'; _this.shapesGroup.addChild(right_shape2); }
            else if (rightShapes[0] === 3) { var right_shape3 = _this.add.image(510, 120, 'right3_Shape1'); right_shape3.name = 'R3S1'; _this.shapesGroup.addChild(right_shape3); }
            else if (rightShapes[0] === 4) { var right_shape4 = _this.add.image(520, 100, 'right4_Shape1'); right_shape4.name = 'R4S1'; _this.shapesGroup.addChild(right_shape4); }
            else if (rightShapes[0] === 5) { var right_shape5 = _this.add.image(540, 100, 'right5_Shape1'); right_shape5.name = 'R5S1'; _this.shapesGroup.addChild(right_shape5); }
            else if (rightShapes[0] === 6) { var right_shape6 = _this.add.image(520, 120, 'right6_Shape1'); right_shape6.name = 'R6S1'; _this.shapesGroup.addChild(right_shape6); }
        }
        else if (rightOrWrong[0] === 2) {
            if (wrongShapes[0] === 1) { var wrong_shape1 = _this.add.image(480, 140, 'wrong1_Shape1'); wrong_shape1.name = 'W1S1'; _this.shapesGroup.addChild(wrong_shape1); }
            else if (wrongShapes[0] === 2) { var wrong_shape2 = _this.add.image(540, 110, 'wrong2_Shape1'); wrong_shape2.name = 'W2S1'; _this.shapesGroup.addChild(wrong_shape2); }
            else if (wrongShapes[0] === 3) { var wrong_shape3 = _this.add.image(540, 140, 'wrong3_Shape1'); wrong_shape3.name = 'W3S1'; _this.shapesGroup.addChild(wrong_shape3); }
            else if (wrongShapes[0] === 4) { var wrong_shape4 = _this.add.image(510, 140, 'wrong4_Shape1'); wrong_shape4.name = 'W4S1'; _this.shapesGroup.addChild(wrong_shape4); }
            else if (wrongShapes[0] === 5) { var wrong_shape5 = _this.add.image(500, 130, 'wrong5_Shape1'); wrong_shape5.name = 'W5S1'; _this.shapesGroup.addChild(wrong_shape5); }
            else if (wrongShapes[0] === 6) { var wrong_shape6 = _this.add.image(540, 140, 'wrong6_Shape1'); wrong_shape6.name = 'W6S1'; _this.shapesGroup.addChild(wrong_shape6); }
        }

    },
    gotoShape2: function () {
        _this.QNo = 2; //Question number
        _this.Shape2_Flag = 1;

        _this.shape2 = _this.add.image(90, 100, 'Shape2');
        _this.QuestionGroup.addChild(_this.shape2);

        var rightOrWrong = [1, 2]; // 1== right 2== wrong
        Phaser.ArrayUtils.shuffle(rightOrWrong);

        var rightShapes = [1, 2];
        Phaser.ArrayUtils.shuffle(rightShapes);

        var wrongShapes = [1, 2, 3, 4];
        Phaser.ArrayUtils.shuffle(wrongShapes);

        if (rightOrWrong[0] === 1) {
            if (rightShapes[0] === 1) { var right_shape1 = _this.add.image(480, 120, 'right1_Shape2'); right_shape1.width = '340'; right_shape1.height = '306'; right_shape1.name = 'R1S2'; _this.shapesGroup.addChild(right_shape1); }
            else if (rightShapes[0] === 2) { var right_shape2 = _this.add.image(480, 100, 'right2_Shape2'); right_shape2.width = '335'; right_shape2.height = '380'; right_shape2.name = 'R2S2'; _this.shapesGroup.addChild(right_shape2); }
        }
        else if (rightOrWrong[0] === 2) {
            if (wrongShapes[0] === 1) { var wrong_shape1 = _this.add.image(490, 80, 'wrong1_Shape2'); wrong_shape1.width = '225'; wrong_shape1.height = '410'; wrong_shape1.name = 'W1S2'; _this.shapesGroup.addChild(wrong_shape1); }
            else if (wrongShapes[0] === 2) { var wrong_shape2 = _this.add.image(480, 90, 'wrong2_Shape2'); wrong_shape2.width = '340'; wrong_shape2.height = '403'; wrong_shape2.name = 'W2S2'; _this.shapesGroup.addChild(wrong_shape2); }
            else if (wrongShapes[0] === 3) { var wrong_shape3 = _this.add.image(500, 110, 'wrong3_Shape2'); wrong_shape3.width = '285'; wrong_shape3.height = '335'; wrong_shape3.name = 'W3S2'; _this.shapesGroup.addChild(wrong_shape3); }
            else if (wrongShapes[0] === 4) { var wrong_shape4 = _this.add.image(470, 130, 'wrong4_Shape2'); wrong_shape4.width = '358'; wrong_shape4.height = '210'; wrong_shape4.name = 'W4S2'; _this.shapesGroup.addChild(wrong_shape4); }
        }
    },
    gotoShape3: function () {
        _this.QNo = 3; //Question number
        _this.Shape3_Flag = 1;

        _this.shape3 = _this.add.image(90, 140, 'Shape3');
        _this.QuestionGroup.addChild(_this.shape3);

        var rightOrWrong = [1, 2]; // 1== right 2== wrong
        Phaser.ArrayUtils.shuffle(rightOrWrong);

        var rightShapes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        Phaser.ArrayUtils.shuffle(rightShapes);

        var wrongShapes = [1, 2, 4, 5, 6, 7];
        Phaser.ArrayUtils.shuffle(wrongShapes);

        if (rightOrWrong[0] === 1) {
            if (rightShapes[0] === 1) { var right_shape1 = _this.add.image(480, 140, 'right1_Shape3'); right_shape1.name = 'R1S3'; _this.shapesGroup.addChild(right_shape1); }
            else if (rightShapes[0] === 2) { var right_shape2 = _this.add.image(480, 140, 'right2_Shape3'); right_shape2.name = 'R2S3'; _this.shapesGroup.addChild(right_shape2); }
            else if (rightShapes[0] === 3) { var right_shape3 = _this.add.image(480, 140, 'right3_Shape3'); right_shape3.name = 'R3S3'; _this.shapesGroup.addChild(right_shape3); }
            else if (rightShapes[0] === 4) { var right_shape4 = _this.add.image(480, 140, 'right4_Shape3'); right_shape4.name = 'R4S3'; _this.shapesGroup.addChild(right_shape4); }
            else if (rightShapes[0] === 5) { var right_shape5 = _this.add.image(480, 140, 'right5_Shape3'); right_shape5.name = 'R5S3'; _this.shapesGroup.addChild(right_shape5); }
            else if (rightShapes[0] === 6) { var right_shape6 = _this.add.image(480, 140, 'right6_Shape3'); right_shape6.name = 'R6S3'; _this.shapesGroup.addChild(right_shape6); }
            else if (rightShapes[0] === 7) { var right_shape7 = _this.add.image(480, 140, 'right7_Shape3'); right_shape7.name = 'R7S3'; _this.shapesGroup.addChild(right_shape7); }
            else if (rightShapes[0] === 8) { var right_shape8 = _this.add.image(480, 140, 'right8_Shape3'); right_shape8.name = 'R8S3'; _this.shapesGroup.addChild(right_shape8); }
            else if (rightShapes[0] === 9) { var right_shape9 = _this.add.image(475, 160, 'right9_Shape3'); right_shape9.scale.setTo(0.85, 1); right_shape9.name = 'R9S3'; _this.shapesGroup.addChild(right_shape9); }
            else if (rightShapes[0] === 10) { var right_shape10 = _this.add.image(540, 100, 'right10_Shape3'); right_shape10.scale.setTo(1, 0.9); right_shape10.name = 'R10S3'; _this.shapesGroup.addChild(right_shape10); }
            else if (rightShapes[0] === 11) { var right_shape11 = _this.add.image(500, 120, 'right11_Shape3'); right_shape11.name = 'R11S3'; _this.shapesGroup.addChild(right_shape11); }
            else if (rightShapes[0] === 12) { var right_shape12 = _this.add.image(500, 120, 'right12_Shape3'); right_shape12.name = 'R12S3'; _this.shapesGroup.addChild(right_shape12); }
            else if (rightShapes[0] === 13) { var right_shape13 = _this.add.image(520, 120, 'right13_Shape3'); right_shape13.name = 'R13S3'; _this.shapesGroup.addChild(right_shape13); }
            else if (rightShapes[0] === 14) { var right_shape14 = _this.add.image(520, 120, 'right14_Shape3'); right_shape14.name = 'R14S3'; _this.shapesGroup.addChild(right_shape14); }
            else if (rightShapes[0] === 15) { var right_shape15 = _this.add.image(520, 120, 'right15_Shape3'); right_shape15.name = 'R15S3'; _this.shapesGroup.addChild(right_shape15); }
            else if (rightShapes[0] === 16) { var right_shape16 = _this.add.image(520, 120, 'right16_Shape3'); right_shape16.name = 'R16S3'; _this.shapesGroup.addChild(right_shape16); }
            else if (rightShapes[0] === 17) { var right_shape17 = _this.add.image(500, 120, 'right17_Shape3'); right_shape17.name = 'R17S3'; _this.shapesGroup.addChild(right_shape17); }
            else if (rightShapes[0] === 18) { var right_shape18 = _this.add.image(500, 120, 'right18_Shape3'); right_shape18.name = 'R18S3'; _this.shapesGroup.addChild(right_shape18); }
        }
        else if (rightOrWrong[0] === 2) {
            if (wrongShapes[0] === 1) { var wrong_shape1 = _this.add.image(475, 220, 'wrong1_Shape3'); wrong_shape1.scale.setTo(0.7, 1); wrong_shape1.name = 'W1S3'; _this.shapesGroup.addChild(wrong_shape1); }
            else if (wrongShapes[0] === 2) { var wrong_shape2 = _this.add.image(520, 140, 'wrong2_Shape3'); wrong_shape2.scale.setTo(0.9, 0.95); wrong_shape2.name = 'W2S3'; _this.shapesGroup.addChild(wrong_shape2); }
            // wrong image 3 is removed becs right and wrong image 3 looks similar... so it is considered as right image
            else if (wrongShapes[0] === 4) { var wrong_shape4 = _this.add.image(480, 180, 'wrong4_Shape3'); wrong_shape4.scale.setTo(0.8, 1); wrong_shape4.name = 'W4S3'; _this.shapesGroup.addChild(wrong_shape4); }
            else if (wrongShapes[0] === 5) { var wrong_shape5 = _this.add.image(480, 180, 'wrong5_Shape3'); wrong_shape5.name = 'W5S3'; _this.shapesGroup.addChild(wrong_shape5); }
            else if (wrongShapes[0] === 6) { var wrong_shape6 = _this.add.image(500, 150, 'wrong6_Shape3'); wrong_shape6.name = 'W6S3'; _this.shapesGroup.addChild(wrong_shape6); }
            else if (wrongShapes[0] === 7) { var wrong_shape7 = _this.add.image(550, 150, 'wrong7_Shape3'); wrong_shape7.name = 'W7S3'; _this.shapesGroup.addChild(wrong_shape7); }
        }
    },
    gotoShape4: function () {
        _this.QNo = 4; //Question number
        _this.Shape4_Flag = 1;

        _this.shape4 = _this.add.image(90, 140, 'Shape4');
        _this.QuestionGroup.addChild(_this.shape4);

        var rightOrWrong = [1, 2]; // 1== right 2== wrong
        Phaser.ArrayUtils.shuffle(rightOrWrong);

        var rightShapes = [1, 2, 3, 4];
        Phaser.ArrayUtils.shuffle(rightShapes);

        var wrongShapes = [1, 2, 3];
        Phaser.ArrayUtils.shuffle(wrongShapes);

        if (rightOrWrong[0] === 1) {
            if (rightShapes[0] === 1) { var right_shape1 = _this.add.image(500, 85, 'right1_Shape4'); right_shape1.width = '305'; right_shape1.height = '420'; right_shape1.name = 'R1S4'; _this.shapesGroup.addChild(right_shape1); }
            else if (rightShapes[0] === 2) { var right_shape2 = _this.add.image(470, 100, 'right2_Shape4'); right_shape2.width = '370'; right_shape2.height = '380'; right_shape2.name = 'R2S4'; _this.shapesGroup.addChild(right_shape2); }
            else if (rightShapes[0] === 3) { var right_shape3 = _this.add.image(470, 120, 'right3_Shape4'); right_shape3.width = '360'; right_shape3.height = '320'; right_shape3.name = 'R3S4'; _this.shapesGroup.addChild(right_shape3); }
            else if (rightShapes[0] === 4) { var right_shape4 = _this.add.image(470, 120, 'right4_Shape4'); right_shape4.width = '345'; right_shape4.height = '365'; right_shape4.name = 'R4S4'; _this.shapesGroup.addChild(right_shape4); }
        }
        else if (rightOrWrong[0] === 2) {
            if (wrongShapes[0] === 1) { var wrong_shape1 = _this.add.image(490, 160, 'wrong1_Shape4'); wrong_shape1.scale.setTo(0.7, 0.8); wrong_shape1.name = 'W1S4'; _this.shapesGroup.addChild(wrong_shape1); }
            else if (wrongShapes[0] === 2) { var wrong_shape2 = _this.add.image(495, 160, 'wrong2_Shape4'); wrong_shape2.scale.setTo(0.75, 0.85); wrong_shape2.name = 'W2S4'; _this.shapesGroup.addChild(wrong_shape2); }
            else if (wrongShapes[0] === 3) { var wrong_shape3 = _this.add.image(465, 200, 'wrong3_Shape4'); wrong_shape3.scale.setTo(0.52, 0.59); wrong_shape3.name = 'W3S4'; _this.shapesGroup.addChild(wrong_shape3); }
        }

    },
    gotoShape5: function () {
        _this.QNo = 5; //Question number
        _this.Shape5_Flag = 1;

        _this.shape5 = _this.add.image(110, 120, 'Shape5');
        _this.shape5.scale.setTo(1, 0.9);
        _this.QuestionGroup.addChild(_this.shape5);

        var rightOrWrong = [1, 2]; // 1== right 2== wrong
        Phaser.ArrayUtils.shuffle(rightOrWrong);

        var rightShapes = [1, 2, 3, 4, 5, 6, 7];
        Phaser.ArrayUtils.shuffle(rightShapes);

        var wrongShapes = [1, 2, 3, 4, 5, 6, 7];
        Phaser.ArrayUtils.shuffle(wrongShapes);

        if (rightOrWrong[0] === 1) {
            if (rightShapes[0] === 1) { var right_shape1 = _this.add.image(480, 140, 'right1_Shape5'); right_shape1.name = 'R1S5'; _this.shapesGroup.addChild(right_shape1); }
            else if (rightShapes[0] === 2) { var right_shape2 = _this.add.image(480, 140, 'right2_Shape5'); right_shape2.name = 'R2S5'; _this.shapesGroup.addChild(right_shape2); }
            else if (rightShapes[0] === 3) { var right_shape3 = _this.add.image(480, 150, 'right3_Shape5'); right_shape3.name = 'R3S5'; _this.shapesGroup.addChild(right_shape3); }
            else if (rightShapes[0] === 4) { var right_shape4 = _this.add.image(480, 120, 'right4_Shape5'); right_shape4.scale.setTo(0.75, 0.85); right_shape4.name = 'R4S5'; _this.shapesGroup.addChild(right_shape4); }
            else if (rightShapes[0] === 5) { var right_shape5 = _this.add.image(480, 140, 'right5_Shape5'); right_shape5.scale.setTo(0.85, 0.9); right_shape5.name = 'R5S5'; _this.shapesGroup.addChild(right_shape5); }
            else if (rightShapes[0] === 6) { var right_shape6 = _this.add.image(480, 140, 'right6_Shape5'); right_shape6.scale.setTo(0.85, 0.9); right_shape6.name = 'R6S5'; _this.shapesGroup.addChild(right_shape6); }
            else if (rightShapes[0] === 7) { var right_shape7 = _this.add.image(480, 120, 'right7_Shape5'); right_shape7.scale.setTo(0.85, 0.9); right_shape7.name = 'R7S5'; _this.shapesGroup.addChild(right_shape7); }
        }
        else if (rightOrWrong[0] === 2) {
            if (wrongShapes[0] === 1) { var wrong_shape1 = _this.add.image(490, 160, 'wrong1_Shape5'); wrong_shape1.scale.setTo(0.85, 0.9); wrong_shape1.name = 'W1S5'; _this.shapesGroup.addChild(wrong_shape1); }
            else if (wrongShapes[0] === 2) { var wrong_shape2 = _this.add.image(510, 130, 'wrong2_Shape5'); wrong_shape2.scale.setTo(0.85, 0.9); wrong_shape2.name = 'W2S5'; _this.shapesGroup.addChild(wrong_shape2); }
            else if (wrongShapes[0] === 3) { var wrong_shape3 = _this.add.image(490, 160, 'wrong3_Shape5'); wrong_shape3.name = 'W3S5'; _this.shapesGroup.addChild(wrong_shape3); }
            else if (wrongShapes[0] === 4) { var wrong_shape4 = _this.add.image(470, 110, 'wrong4_Shape5'); wrong_shape4.scale.setTo(0.65, 0.7); wrong_shape4.name = 'W4S5'; _this.shapesGroup.addChild(wrong_shape4); }
            else if (wrongShapes[0] === 5) { var wrong_shape5 = _this.add.image(475, 180, 'wrong5_Shape5'); wrong_shape5.scale.setTo(0.9, 0.95); wrong_shape5.name = 'W5S5'; _this.shapesGroup.addChild(wrong_shape5); }
            else if (wrongShapes[0] === 6) { var wrong_shape6 = _this.add.image(500, 160, 'wrong6_Shape5'); wrong_shape6.scale.setTo(0.9, 0.95); wrong_shape6.name = 'W6S5'; _this.shapesGroup.addChild(wrong_shape6); }
            else if (wrongShapes[0] === 7) { var wrong_shape7 = _this.add.image(480, 120, 'wrong7_Shape5'); wrong_shape7.scale.setTo(0.85, 0.9); wrong_shape7.name = 'W7S5'; _this.shapesGroup.addChild(wrong_shape7); }
        }

    },
    gotoShape6: function () {
        _this.QNo = 1; //Question number
        _this.Shape6_Flag = 1;

        _this.shape6 = _this.add.image(47, 130, 'Shape6');
        _this.QuestionGroup.addChild(_this.shape6);

        var rightOrWrong = [1, 2]; // 1== right 2== wrong
        Phaser.ArrayUtils.shuffle(rightOrWrong);

        var rightShapes = [1, 2];
        Phaser.ArrayUtils.shuffle(rightShapes);

        var wrongShapes = [1, 2, 3, 4, 5];
        Phaser.ArrayUtils.shuffle(wrongShapes);

        if (rightOrWrong[0] === 1) {
            if (rightShapes[0] === 1) { var right_shape1 = _this.add.image(480, 120, 'right1_Shape6'); right_shape1.scale.setTo(0.85, 1); right_shape1.name = 'R1S6'; _this.shapesGroup.addChild(right_shape1); }
            else if (rightShapes[0] === 2) { var right_shape2 = _this.add.image(470, 200, 'right2_Shape6'); right_shape2.scale.setTo(0.7, 0.9); right_shape2.name = 'R2S6'; _this.shapesGroup.addChild(right_shape2); }
        }
        else if (rightOrWrong[0] === 2) {
            if (wrongShapes[0] === 1) { var wrong_shape1 = _this.add.image(490, 120, 'wrong1_Shape6'); wrong_shape1.scale.setTo(0.85, 1); wrong_shape1.name = 'W1S6'; _this.shapesGroup.addChild(wrong_shape1); }
            else if (wrongShapes[0] === 2) { var wrong_shape2 = _this.add.image(480, 140, 'wrong2_Shape6'); wrong_shape2.scale.setTo(0.85, 0.85); wrong_shape2.name = 'W2S6'; _this.shapesGroup.addChild(wrong_shape2); }
            else if (wrongShapes[0] === 3) { var wrong_shape3 = _this.add.image(470, 120, 'wrong3_Shape6'); wrong_shape3.scale.setTo(0.7, 1); wrong_shape3.name = 'W3S6'; _this.shapesGroup.addChild(wrong_shape3); }
            else if (wrongShapes[0] === 4) { var wrong_shape4 = _this.add.image(480, 200, 'wrong4_Shape6'); wrong_shape4.scale.setTo(0.6, 1); wrong_shape4.name = 'W4S6'; _this.shapesGroup.addChild(wrong_shape4); }
            else if (wrongShapes[0] === 5) { var wrong_shape5 = _this.add.image(480, 200, 'wrong5_Shape6'); wrong_shape5.scale.setTo(0.6, 1); wrong_shape5.name = 'W5S6'; _this.shapesGroup.addChild(wrong_shape5); }
        }


    },
    gotoShape7: function () {
        _this.QNo = 1; //Question number
        _this.Shape7_Flag = 1;

        _this.shape7 = _this.add.image(70, 100, 'Shape7');
        _this.shape7.scale.setTo(0.95, 0.85);
        _this.QuestionGroup.addChild(_this.shape7);

        var rightOrWrong = [1, 2]; // 1== right 2== wrong
        Phaser.ArrayUtils.shuffle(rightOrWrong);

        var rightShapes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        Phaser.ArrayUtils.shuffle(rightShapes);

        var wrongShapes = [1, 2, 3, 4, 5, 6];
        Phaser.ArrayUtils.shuffle(wrongShapes);

        if (rightOrWrong[0] === 1) {
            if (rightShapes[0] === 1) { var right_shape1 = _this.add.image(520, 140, 'right1_Shape7'); right_shape1.name = 'R1S7'; _this.shapesGroup.addChild(right_shape1); }
            else if (rightShapes[0] === 2) { var right_shape2 = _this.add.image(520, 140, 'right2_Shape7'); right_shape2.name = 'R2S7'; _this.shapesGroup.addChild(right_shape2); }
            else if (rightShapes[0] === 3) { var right_shape3 = _this.add.image(520, 140, 'right3_Shape7'); right_shape3.name = 'R3S7'; _this.shapesGroup.addChild(right_shape3); }
            else if (rightShapes[0] === 4) { var right_shape4 = _this.add.image(500, 140, 'right4_Shape7'); right_shape4.scale.setTo(0.85, 1); right_shape4.name = 'R4S7'; _this.shapesGroup.addChild(right_shape4); }
            else if (rightShapes[0] === 5) { var right_shape5 = _this.add.image(520, 120, 'right5_Shape7'); right_shape5.scale.setTo(0.85, 0.9); right_shape5.name = 'R5S7'; _this.shapesGroup.addChild(right_shape5); }
            else if (rightShapes[0] === 6) { var right_shape6 = _this.add.image(470, 140, 'right6_Shape7'); right_shape6.name = 'R6S7'; _this.shapesGroup.addChild(right_shape6); }
            else if (rightShapes[0] === 7) { var right_shape7 = _this.add.image(480, 160, 'right7_Shape7'); right_shape7.scale.setTo(0.75, 1); right_shape7.name = 'R7S7'; _this.shapesGroup.addChild(right_shape7); }
            else if (rightShapes[0] === 8) { var right_shape8 = _this.add.image(480, 140, 'right8_Shape7'); right_shape8.scale.setTo(0.75, 1); right_shape8.name = 'R8S7'; _this.shapesGroup.addChild(right_shape8); }
            else if (rightShapes[0] === 9) { var right_shape9 = _this.add.image(480, 160, 'right9_Shape7'); right_shape9.scale.setTo(0.85, 1); right_shape9.name = 'R9S7'; _this.shapesGroup.addChild(right_shape9); }
            else if (rightShapes[0] === 10) { var right_shape10 = _this.add.image(520, 140, 'right10_Shape7'); right_shape10.name = 'R10S7'; _this.shapesGroup.addChild(right_shape10); }
            else if (rightShapes[0] === 11) { var right_shape11 = _this.add.image(540, 100, 'right11_Shape7'); right_shape11.scale.setTo(0.9, 0.85); right_shape11.name = 'R11S7'; _this.shapesGroup.addChild(right_shape11); }
            else if (rightShapes[0] === 12) { var right_shape12 = _this.add.image(520, 100, 'right12_Shape7'); right_shape12.scale.setTo(0.9, 0.9); right_shape12.name = 'R12S7'; _this.shapesGroup.addChild(right_shape12); }
            else if (rightShapes[0] === 13) { var right_shape13 = _this.add.image(500, 120, 'right13_Shape7'); right_shape13.scale.setTo(0.95, 0.95); right_shape13.name = 'R13S7'; _this.shapesGroup.addChild(right_shape13); }
            else if (rightShapes[0] === 14) { var right_shape14 = _this.add.image(500, 140, 'right14_Shape7'); right_shape14.name = 'R14S7'; _this.shapesGroup.addChild(right_shape14); }
            else if (rightShapes[0] === 15) { var right_shape15 = _this.add.image(500, 120, 'right15_Shape7'); right_shape15.scale.setTo(0.85, 0.85); right_shape15.name = 'R15S7'; _this.shapesGroup.addChild(right_shape15); }
            else if (rightShapes[0] === 16) { var right_shape16 = _this.add.image(520, 120, 'right16_Shape7'); right_shape16.scale.setTo(1, 0.9); right_shape16.name = 'R16S7'; _this.shapesGroup.addChild(right_shape16); }
            else if (rightShapes[0] === 17) { var right_shape17 = _this.add.image(500, 100, 'right17_Shape7'); right_shape17.name = 'R17S7'; _this.shapesGroup.addChild(right_shape17); }
            else if (rightShapes[0] === 18) { var right_shape18 = _this.add.image(500, 140, 'right18_Shape7'); right_shape18.name = 'R18S7'; _this.shapesGroup.addChild(right_shape18); }
        }
        else if (rightOrWrong[0] === 2) {
            if (wrongShapes[0] === 1) { var wrong_shape1 = _this.add.image(490, 140, 'wrong1_Shape7'); wrong_shape1.name = 'W1S7'; _this.shapesGroup.addChild(wrong_shape1); }
            else if (wrongShapes[0] === 2) { var wrong_shape2 = _this.add.image(500, 120, 'wrong2_Shape7'); wrong_shape2.scale.setTo(0.9, 0.95); wrong_shape2.name = 'W2S7'; _this.shapesGroup.addChild(wrong_shape2); }
            else if (wrongShapes[0] === 3) { var wrong_shape3 = _this.add.image(520, 150, 'wrong3_Shape7'); wrong_shape3.name = 'W3S7'; _this.shapesGroup.addChild(wrong_shape3); }
            else if (wrongShapes[0] === 4) { var wrong_shape4 = _this.add.image(520, 140, 'wrong4_Shape7'); wrong_shape4.scale.setTo(0.8, 1); wrong_shape4.name = 'W4S7'; _this.shapesGroup.addChild(wrong_shape4); }
            else if (wrongShapes[0] === 5) { var wrong_shape5 = _this.add.image(530, 140, 'wrong5_Shape7'); wrong_shape5.name = 'W5S7'; _this.shapesGroup.addChild(wrong_shape5); }
            else if (wrongShapes[0] === 6) { var wrong_shape6 = _this.add.image(540, 150, 'wrong6_Shape7'); wrong_shape6.name = 'W6S7'; _this.shapesGroup.addChild(wrong_shape6); }
        }
    },


    //Tick button in the question screen and the evaluation of the top box or workspace.
    tickFirstEvaluation: function (target) {
        console.log("thumbs Up evaluation");
        _this.clickSound.play();
        _this.thumbsUp.frame = 1;
        _this.thumbsDown.frame = 0;

        if (_this.Shape1_Flag) {
            if (_this.shapesGroup.getChildAt(0).name === 'R1S1' || _this.shapesGroup.getChildAt(0).name === 'R2S1' || _this.shapesGroup.getChildAt(0).name === 'R3S1' || _this.shapesGroup.getChildAt(0).name === 'R4S1' || _this.shapesGroup.getChildAt(0).name === 'R5S1' || _this.shapesGroup.getChildAt(0).name === 'R6S1') { _this.right = true; }
            else { _this.right = false; }
        }
        else if (_this.Shape2_Flag) {
            if (_this.shapesGroup.getChildAt(0).name === 'R1S2' || _this.shapesGroup.getChildAt(0).name === 'R2S2') { _this.right = true; }
            else { _this.right = false; }
        }
        else if (_this.Shape3_Flag) {
            if (_this.shapesGroup.getChildAt(0).name === 'R1S3' || _this.shapesGroup.getChildAt(0).name === 'R2S3' || _this.shapesGroup.getChildAt(0).name === 'R3S3' || _this.shapesGroup.getChildAt(0).name === 'R4S3' || _this.shapesGroup.getChildAt(0).name === 'R5S3' || _this.shapesGroup.getChildAt(0).name === 'R6S3' || _this.shapesGroup.getChildAt(0).name === 'R7S3' || _this.shapesGroup.getChildAt(0).name === 'R8S3' || _this.shapesGroup.getChildAt(0).name === 'R9S3' || _this.shapesGroup.getChildAt(0).name === 'R10S3' || _this.shapesGroup.getChildAt(0).name === 'R11S3' || _this.shapesGroup.getChildAt(0).name === 'R12S3' || _this.shapesGroup.getChildAt(0).name === 'R13S3' || _this.shapesGroup.getChildAt(0).name === 'R14S3' || _this.shapesGroup.getChildAt(0).name === 'R15S3' || _this.shapesGroup.getChildAt(0).name === 'R16S3' || _this.shapesGroup.getChildAt(0).name === 'R17S3' || _this.shapesGroup.getChildAt(0).name === 'R18S3') { _this.right = true; }
            else { _this.right = false; }
        }
        else if (_this.Shape4_Flag) {
            if (_this.shapesGroup.getChildAt(0).name === 'R1S4' || _this.shapesGroup.getChildAt(0).name === 'R2S4' || _this.shapesGroup.getChildAt(0).name === 'R3S4' || _this.shapesGroup.getChildAt(0).name === 'R4S4') { _this.right = true; }
            else { _this.right = false; }
        }
        else if (_this.Shape5_Flag) {
            if (_this.shapesGroup.getChildAt(0).name === 'R1S5' || _this.shapesGroup.getChildAt(0).name === 'R2S5' || _this.shapesGroup.getChildAt(0).name === 'R3S5' || _this.shapesGroup.getChildAt(0).name === 'R4S5' || _this.shapesGroup.getChildAt(0).name === 'R5S5' || _this.shapesGroup.getChildAt(0).name === 'R6S5' || _this.shapesGroup.getChildAt(0).name === 'R7S5') { _this.right = true; }
            else { _this.right = false; }
        }
        else if (_this.Shape6_Flag) {
            if (_this.shapesGroup.getChildAt(0).name === 'R1S6' || _this.shapesGroup.getChildAt(0).name === 'R2S6') { _this.right = true; }
            else { _this.right = false; }
        }
        else if (_this.Shape7_Flag) {
            if (_this.shapesGroup.getChildAt(0).name === 'R1S7' || _this.shapesGroup.getChildAt(0).name === 'R2S7' || _this.shapesGroup.getChildAt(0).name === 'R3S7' || _this.shapesGroup.getChildAt(0).name === 'R4S7' || _this.shapesGroup.getChildAt(0).name === 'R5S7' || _this.shapesGroup.getChildAt(0).name === 'R6S7' || _this.shapesGroup.getChildAt(0).name === 'R7S7' || _this.shapesGroup.getChildAt(0).name === 'R8S7' || _this.shapesGroup.getChildAt(0).name === 'R9S7' || _this.shapesGroup.getChildAt(0).name === 'R10S7' || _this.shapesGroup.getChildAt(0).name === 'R11S7' || _this.shapesGroup.getChildAt(0).name === 'R12S7' || _this.shapesGroup.getChildAt(0).name === 'R13S7' || _this.shapesGroup.getChildAt(0).name === 'R14S7' || _this.shapesGroup.getChildAt(0).name === 'R15S7' || _this.shapesGroup.getChildAt(0).name === 'R16S7' || _this.shapesGroup.getChildAt(0).name === 'R17S7' || _this.shapesGroup.getChildAt(0).name === 'R18S7') { _this.right = true; }
            else { _this.right = false; }
        }

        if (_this.right) {
            _this.thumbsUp.events.onInputDown.removeAll();
            _this.thumbsDown.events.onInputDown.removeAll();

            _this.noofAttempts ++;
            _this.celebrationSound.play();
            _this.starActions();
            _this.time.events.add(3000, () => {
                _this.clearAll();

                if (_this.numberOfQuestions == 6) {
                    _this.state.start('score', true, false,gameID, _this.microConcepts);
                }
                else {
                    _this.NextQuestion();
                }
            });
        } else if (_this.right === false) {
            _this.noofAttempts ++;
            _this.wrongSound.play();
        }

    },
    tickSecondEvaluation: function (target) {
        console.log("thumbs Down evaluation");
        _this.clickSound.play();
        _this.thumbsUp.frame = 0;
        _this.thumbsDown.frame = 1;

        if (_this.Shape1_Flag) {
            if (_this.shapesGroup.getChildAt(0).name === 'R1S1' || _this.shapesGroup.getChildAt(0).name === 'R2S1' || _this.shapesGroup.getChildAt(0).name === 'R3S1' || _this.shapesGroup.getChildAt(0).name === 'R4S1' || _this.shapesGroup.getChildAt(0).name === 'R5S1' || _this.shapesGroup.getChildAt(0).name === 'R6S1') { _this.wrong = false; }
            else { _this.wrong = true; }
        }
        else if (_this.Shape2_Flag) {
            if (_this.shapesGroup.getChildAt(0).name === 'R1S2' || _this.shapesGroup.getChildAt(0).name === 'R2S2') { _this.wrong = false; }
            else { _this.wrong = true; }
        }
        else if (_this.Shape3_Flag) {
            if (_this.shapesGroup.getChildAt(0).name === 'R1S3' || _this.shapesGroup.getChildAt(0).name === 'R2S3' || _this.shapesGroup.getChildAt(0).name === 'R3S3' || _this.shapesGroup.getChildAt(0).name === 'R4S3' || _this.shapesGroup.getChildAt(0).name === 'R5S3' || _this.shapesGroup.getChildAt(0).name === 'R6S3' || _this.shapesGroup.getChildAt(0).name === 'R7S3' || _this.shapesGroup.getChildAt(0).name === 'R8S3' || _this.shapesGroup.getChildAt(0).name === 'R9S3' || _this.shapesGroup.getChildAt(0).name === 'R10S3' || _this.shapesGroup.getChildAt(0).name === 'R11S3' || _this.shapesGroup.getChildAt(0).name === 'R12S3' || _this.shapesGroup.getChildAt(0).name === 'R13S3' || _this.shapesGroup.getChildAt(0).name === 'R14S3' || _this.shapesGroup.getChildAt(0).name === 'R15S3' || _this.shapesGroup.getChildAt(0).name === 'R16S3' || _this.shapesGroup.getChildAt(0).name === 'R17S3' || _this.shapesGroup.getChildAt(0).name === 'R18S3') { _this.wrong = false; }
            else { _this.wrong = true; }
        }
        else if (_this.Shape4_Flag) {
            if (_this.shapesGroup.getChildAt(0).name === 'R1S4' || _this.shapesGroup.getChildAt(0).name === 'R2S4' || _this.shapesGroup.getChildAt(0).name === 'R3S4' || _this.shapesGroup.getChildAt(0).name === 'R4S4') { _this.wrong = false; }
            else { _this.wrong = true; }
        }
        else if (_this.Shape5_Flag) {
            if (_this.shapesGroup.getChildAt(0).name === 'R1S5' || _this.shapesGroup.getChildAt(0).name === 'R2S5' || _this.shapesGroup.getChildAt(0).name === 'R3S5' || _this.shapesGroup.getChildAt(0).name === 'R4S5' || _this.shapesGroup.getChildAt(0).name === 'R5S5' || _this.shapesGroup.getChildAt(0).name === 'R6S5' || _this.shapesGroup.getChildAt(0).name === 'R7S5') { _this.wrong = false; }
            else { _this.wrong = true; }
        }
        else if (_this.Shape6_Flag) {
            if (_this.shapesGroup.getChildAt(0).name === 'R1S6' || _this.shapesGroup.getChildAt(0).name === 'R2S6') { _this.wrong = false; }
            else { _this.wrong = true; }
        }
        else if (_this.Shape7_Flag) {
            if (_this.shapesGroup.getChildAt(0).name === 'R1S7' || _this.shapesGroup.getChildAt(0).name === 'R2S7' || _this.shapesGroup.getChildAt(0).name === 'R3S7' || _this.shapesGroup.getChildAt(0).name === 'R4S7' || _this.shapesGroup.getChildAt(0).name === 'R5S7' || _this.shapesGroup.getChildAt(0).name === 'R6S7' || _this.shapesGroup.getChildAt(0).name === 'R7S7' || _this.shapesGroup.getChildAt(0).name === 'R8S7' || _this.shapesGroup.getChildAt(0).name === 'R9S7' || _this.shapesGroup.getChildAt(0).name === 'R10S7' || _this.shapesGroup.getChildAt(0).name === 'R11S7' || _this.shapesGroup.getChildAt(0).name === 'R12S7' || _this.shapesGroup.getChildAt(0).name === 'R13S7' || _this.shapesGroup.getChildAt(0).name === 'R14S7' || _this.shapesGroup.getChildAt(0).name === 'R15S7' || _this.shapesGroup.getChildAt(0).name === 'R16S7' || _this.shapesGroup.getChildAt(0).name === 'R17S7' || _this.shapesGroup.getChildAt(0).name === 'R18S7') { _this.wrong = false; }
            else { _this.wrong = true; }
        }

        if (_this.wrong) {
            _this.thumbsUp.events.onInputDown.removeAll();
            _this.thumbsDown.events.onInputDown.removeAll();

            _this.noofAttempts ++;
            _this.celebrationSound.play();
            
            _this.starActions();
            _this.time.events.add(3000, () => {
                _this.clearAll();

                if (_this.numberOfQuestions == 6) {
                    _this.state.start('score', true, false,gameID, _this.microConcepts);
                }
                else {
                    _this.NextQuestion();
                }
            });
        } else if (_this.wrong === false) {
            _this.noofAttempts ++;
            _this.wrongSound.play();
        }


    },

    removeStyle: function (target) {
        target.visible = false;
    },
    //applying the style to the text in the answerbox.
    applyingStyle: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#FFFFFF'; //white color
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '22px';
    },
    applyingWhite: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#FFFFFF'; //white color
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '24px';
    },
    applyingStyle1: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#32CD32'; //green color
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '26px';
    },
    applyingStyle2: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#E0115F'; //pink color
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '26px';
    },
    plusSignBlue: function (x, y) {
        console.log("plusSignBlue");
        _this.pSign1 = _this.add.graphics();
        _this.pSign1.lineStyle(4, 0x65B4C3);
        _this.pSign1.moveTo(x, y);
        _this.pSign1.lineTo(x + 12, y);
    },

    applyingStyleBlue: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '30px';
    },
    //clearing the screen (seconf scene).
    clearAll: function () {
        _this.shapesGroup.destroy();
        _this.QuestionGroup.destroy();

        _this.thumbsUp.destroy();
        _this.thumbsDown.destroy();

        _this.Box1.destroy();
        _this.Box2.destroy();

        _this.Shape1_Flag = 0;
        _this.Shape2_Flag = 0;
        _this.Shape3_Flag = 0;
        _this.Shape4_Flag = 0;
        _this.Shape5_Flag = 0;
        _this.Shape6_Flag = 0;
        _this.Shape7_Flag = 0;

        _this.right = false;
        _this.wrong = false;
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