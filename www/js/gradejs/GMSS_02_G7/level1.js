Game.GMSS_02_G7level1 = function () { };


Game.GMSS_02_G7level1.prototype =
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
        // _this.snapSoundsrc.setAttribute("src",window.baseUrl + "sounds/snapSound.mp3");
        // _this.snapSound.appendChild(_this.snapSoundsrc);

        _this.framechange = document.createElement('audio');
        _this.framechangesrc = document.createElement('source');
        _this.framechangesrc.setAttribute("src", window.baseUrl + "sounds/Frame_change_sound.mp3");
        _this.framechange.appendChild(_this.framechangesrc);


        _this.Ask_Question1 = _this.createAudio("GMSS_02_G7_a1");
        _this.Ask_Question2 = _this.createAudio("GMSS_02_G7_a2");

        
        telInitializer.gameIdInit("GMSS_02_G7", gradeSelected);// first Tele call
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

        //_this.AnsTimerCount = 0;
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
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/GMSS_02_G7/" + _this.languageSelected + "/" + src + ".mp3");
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

        _this.numbers = [1, 2, 3, 4, 5, 6, 7];
        Phaser.ArrayUtils.shuffle(_this.numbers);

        _this.InitialScreen();
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
        if (_this.QuestionArray[_this.count1] === 1) {
            _this.InitialScreen();//PartA
        } else if (_this.QuestionArray[_this.count1] === 2) {
            _this.InitialScreen2();//PartA
        }
        else {
            _this.timer1.stop();
            _this.timer1 = null;
            _this.time.events.add(1000, function () {
                _this.state.start('score', true, false, gameID, _this.microConcepts);
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
        _this.AnsTimerCount =0;
        _this.noofAttempts=0;
        _this.power = "\u{00B2}";

        if (_this.count1 === 0) {
            _this.Ask_Question1.play();
            _this.Question_flag = 1;
        }
        console.log("AskingQuestion")

        _this.tick = _this.add.sprite(880, 455, 'TickBtn');

        _this.Box1 = _this.add.sprite(30, 70, 'Box1');
        _this.Box2_1 = _this.add.sprite(440, 70, 'Box2');
        _this.Box2_2 = _this.add.sprite(660, 70, 'Box2');
        _this.Box2_3 = _this.add.sprite(440, 295, 'Box2');
        _this.Box2_4 = _this.add.sprite(660, 295, 'Box2');

        _this.tick.inputEnabled = true;
        _this.tick.input.useHandCursor = true;
        _this.tick.events.onInputDown.add(_this.tickFirstEvaluation, _this);

        _this.Box2_1.inputEnabled = true;
        _this.Box2_1.input.useHandCursor = true;
        _this.Box2_1.events.onInputDown.add(_this.changeFrame1, _this);

        _this.Box2_2.inputEnabled = true;
        _this.Box2_2.input.useHandCursor = true;
        _this.Box2_2.events.onInputDown.add(_this.changeFrame2, _this);

        _this.Box2_3.inputEnabled = true;
        _this.Box2_3.input.useHandCursor = true;
        _this.Box2_3.events.onInputDown.add(_this.changeFrame3, _this);

        _this.Box2_4.inputEnabled = true;
        _this.Box2_4.input.useHandCursor = true;
        _this.Box2_4.events.onInputDown.add(_this.changeFrame4, _this);

        _this.shapesGroup = _this.add.group();

        _this.QuestionGroup = _this.add.group();

        switch (_this.numbers[_this.count1]) {
            case 1: _this.gotoCylinder();
                break;
            case 2: _this.gotoCone();
                break;
            case 3: _this.gotoTriPyramid();
                break;
            case 4: _this.gotoSqPyramid();
                break;
            case 5: _this.gotoPrism();
                break;
            case 6: _this.gotoCube();
                break;
            case 7: _this.gotoCuboid();
                break;
        }
    },

    gotoCylinder: function () {
        _this.QNo = 1; //Question number
        _this.Shape1_Flag = 1;

        var cuboidArray = [1, 2, 3, 4]; // there are 4 different cuboid objects
        Phaser.ArrayUtils.shuffle(cuboidArray);

        if (cuboidArray[0] === 1) { var cylinder1 = _this.add.image(60, 200, 'Object1'); cylinder1.name = 'C1'; _this.QuestionGroup.addChild(cylinder1); }
        else if (cuboidArray[0] === 2) { var cylinder2 = _this.add.image(130, 200, 'Object2'); cylinder2.name = 'C2'; _this.QuestionGroup.addChild(cylinder2); }
        else if (cuboidArray[0] === 3) { var cylinder3 = _this.add.image(130, 180, 'Object3'); cylinder3.name = 'C3'; _this.QuestionGroup.addChild(cylinder3); }
        else if (cuboidArray[0] === 4) { var cylinder4 = _this.add.image(130, 170, 'Object4'); cylinder4.name = 'C4'; _this.QuestionGroup.addChild(cylinder4); }

        var numbers = [1, 2, 3, 4];

        // Shuffle the array using Phaser.ArrayUtils.shuffle
        Phaser.ArrayUtils.shuffle(numbers);

        // Find the index of number 1 in the shuffled array
        var index = numbers.indexOf(1);

        // Log the index of number 1
        console.log(index, 'index 1');


        if (index === 0) { // 1st box correct ans
            var right_shape1 = _this.add.image(465, 85, 'right1_Shape4'); right_shape1.scale.setTo(0.36, 0.4); right_shape1.name = 'R1O1'; _this.shapesGroup.addChild(right_shape1);
            var wrong_shape1 = _this.add.image(675, 100, 'wrong1_Shape4'); wrong_shape1.scale.setTo(0.4, 0.45); wrong_shape1.name = 'W1O1'; _this.shapesGroup.addChild(wrong_shape1);
            var wrong_shape2 = _this.add.image(465, 330, 'wrong2_Shape4'); wrong_shape2.scale.setTo(0.4, 0.43); wrong_shape2.name = 'W2O1'; _this.shapesGroup.addChild(wrong_shape2);
            var wrong_shape3 = _this.add.image(670, 360, 'wrong3_Shape4'); wrong_shape3.scale.setTo(0.28, 0.3); wrong_shape3.name = 'W3O1'; _this.shapesGroup.addChild(wrong_shape3);
        }
        else if (index === 1) { // 2nd box correct ans
            var right_shape1 = _this.add.image(670, 80, 'right2_Shape4'); right_shape1.scale.setTo(0.36, 0.4); right_shape1.name = 'R2O1'; _this.shapesGroup.addChild(right_shape1);
            var wrong_shape1 = _this.add.image(455, 100, 'wrong1_Shape4'); wrong_shape1.scale.setTo(0.4, 0.45); wrong_shape1.name = 'W1O1'; _this.shapesGroup.addChild(wrong_shape1);
            var wrong_shape2 = _this.add.image(465, 330, 'wrong2_Shape4'); wrong_shape2.scale.setTo(0.4, 0.43); wrong_shape2.name = 'W2O1'; _this.shapesGroup.addChild(wrong_shape2);
            var wrong_shape3 = _this.add.image(670, 360, 'wrong3_Shape4'); wrong_shape3.scale.setTo(0.28, 0.3); wrong_shape3.name = 'W3O1'; _this.shapesGroup.addChild(wrong_shape3);
        }
        else if (index === 2) { // 3rd box correct ans
            var right_shape1 = _this.add.image(460, 330, 'right3_Shape4'); right_shape1.scale.setTo(0.28, 0.32); right_shape1.name = 'R3O1'; _this.shapesGroup.addChild(right_shape1);
            var wrong_shape1 = _this.add.image(675, 100, 'wrong1_Shape4'); wrong_shape1.scale.setTo(0.4, 0.45); wrong_shape1.name = 'W1O1'; _this.shapesGroup.addChild(wrong_shape1);
            var wrong_shape2 = _this.add.image(460, 100, 'wrong2_Shape4'); wrong_shape2.scale.setTo(0.4, 0.43); wrong_shape2.name = 'W2O1'; _this.shapesGroup.addChild(wrong_shape2);
            var wrong_shape3 = _this.add.image(670, 360, 'wrong3_Shape4'); wrong_shape3.scale.setTo(0.28, 0.3); wrong_shape3.name = 'W3O1'; _this.shapesGroup.addChild(wrong_shape3);
        }
        else if (index === 3) { // 4th box correct ans
            var right_shape1 = _this.add.image(680, 310, 'right4_Shape4'); right_shape1.scale.setTo(0.32, 0.35); right_shape1.name = 'R4O1'; _this.shapesGroup.addChild(right_shape1);
            var wrong_shape1 = _this.add.image(675, 100, 'wrong1_Shape4'); wrong_shape1.scale.setTo(0.4, 0.45); wrong_shape1.name = 'W1O1'; _this.shapesGroup.addChild(wrong_shape1);
            var wrong_shape2 = _this.add.image(465, 330, 'wrong2_Shape4'); wrong_shape2.scale.setTo(0.4, 0.43); wrong_shape2.name = 'W2O1'; _this.shapesGroup.addChild(wrong_shape2);
            var wrong_shape3 = _this.add.image(450, 140, 'wrong3_Shape4'); wrong_shape3.scale.setTo(0.28, 0.3); wrong_shape3.name = 'W3O1'; _this.shapesGroup.addChild(wrong_shape3);
        }



    },
    gotoCone: function () {
        _this.QNo = 2; //Question number
        _this.Shape2_Flag = 1;

        var coneArray = [1, 2]; // there are 4 different cuboid objects
        Phaser.ArrayUtils.shuffle(coneArray);

        if (coneArray[0] === 1) { _this.shape2 = _this.add.image(100, 140, 'Object5'); _this.QuestionGroup.addChild(_this.shape2); }
        else if (coneArray[0] === 2) { _this.shape2 = _this.add.image(100, 140, 'Object16'); _this.QuestionGroup.addChild(_this.shape2); }

        var numbers = [1, 2, 3, 4]; // 1 means correct ans in any box

        // Shuffle the array using Phaser.ArrayUtils.shuffle
        Phaser.ArrayUtils.shuffle(numbers);

        // Find the index of number 1 in the shuffled array
        var index = numbers.indexOf(1);

        // Log the index of number 1
        console.log(index, 'index 1');


        if (index === 0) { // 1st box correct ans
            var right_shape1 = _this.add.image(460, 100, 'right1_Shape2'); right_shape1.scale.setTo(0.4, 0.45); right_shape1.name = 'R1O2'; _this.shapesGroup.addChild(right_shape1);
            var wrong_shape1 = _this.add.image(700, 85, 'wrong1_Shape2'); wrong_shape1.scale.setTo(0.36, 0.4); wrong_shape1.name = 'W1O2'; _this.shapesGroup.addChild(wrong_shape1);
            var wrong_shape2 = _this.add.image(470, 310, 'wrong2_Shape2'); wrong_shape2.scale.setTo(0.38, 0.43); wrong_shape2.name = 'W2O2'; _this.shapesGroup.addChild(wrong_shape2);
            var wrong_shape3 = _this.add.image(700, 330, 'wrong3_Shape2'); wrong_shape3.scale.setTo(0.4, 0.45); wrong_shape3.name = 'W3O2'; _this.shapesGroup.addChild(wrong_shape3);

        }
        else if (index === 1) { // 2nd box correct ans
            var right_shape2 = _this.add.image(690, 90, 'right2_Shape2'); right_shape2.scale.setTo(0.37, 0.41); right_shape2.name = 'R2O2'; _this.shapesGroup.addChild(right_shape2);
            var wrong_shape2 = _this.add.image(470, 85, 'wrong2_Shape2'); wrong_shape2.scale.setTo(0.36, 0.4); wrong_shape2.name = 'W2O2'; _this.shapesGroup.addChild(wrong_shape2);
            var wrong_shape3 = _this.add.image(470, 330, 'wrong3_Shape2'); wrong_shape3.scale.setTo(0.4, 0.45); wrong_shape3.name = 'W3O2'; _this.shapesGroup.addChild(wrong_shape3);
            var wrong_shape4 = _this.add.image(670, 360, 'wrong4_Shape2'); wrong_shape4.scale.setTo(0.32, 0.36); wrong_shape4.name = 'W4O2'; _this.shapesGroup.addChild(wrong_shape4);
        }
        else if (index === 2) { // 3rd box correct ans
            var right_shape1 = _this.add.image(460, 330, 'right1_Shape2'); right_shape1.scale.setTo(0.4, 0.45); right_shape1.name = 'R3O2'; _this.shapesGroup.addChild(right_shape1);
            var wrong_shape1 = _this.add.image(470, 85, 'wrong1_Shape2'); wrong_shape1.scale.setTo(0.36, 0.4); wrong_shape1.name = 'W1O2'; _this.shapesGroup.addChild(wrong_shape1);
            var wrong_shape3 = _this.add.image(700, 100, 'wrong3_Shape2'); wrong_shape3.scale.setTo(0.4, 0.45); wrong_shape3.name = 'W3O2'; _this.shapesGroup.addChild(wrong_shape3);
            var wrong_shape4 = _this.add.image(670, 360, 'wrong4_Shape2'); wrong_shape4.scale.setTo(0.32, 0.36); wrong_shape4.name = 'W4O2'; _this.shapesGroup.addChild(wrong_shape4);
        }
        else if (index === 3) { // 4th box correct ans
            var right_shape2 = _this.add.image(690, 310, 'right2_Shape2'); right_shape2.scale.setTo(0.37, 0.41); right_shape2.name = 'R4O2'; _this.shapesGroup.addChild(right_shape2);
            var wrong_shape1 = _this.add.image(490, 85, 'wrong1_Shape2'); wrong_shape1.scale.setTo(0.36, 0.4); wrong_shape1.name = 'W1O2'; _this.shapesGroup.addChild(wrong_shape1);
            var wrong_shape2 = _this.add.image(690, 100, 'wrong2_Shape2'); wrong_shape2.scale.setTo(0.36, 0.4); wrong_shape2.name = 'W2O2'; _this.shapesGroup.addChild(wrong_shape2);
            var wrong_shape4 = _this.add.image(460, 360, 'wrong4_Shape2'); wrong_shape4.scale.setTo(0.32, 0.36); wrong_shape4.name = 'W4O2'; _this.shapesGroup.addChild(wrong_shape4);

        }
    },
    gotoTriPyramid: function () {
        _this.QNo = 1; //Question number
        _this.Shape3_Flag = 1;

        _this.shape3 = _this.add.image(90, 160, 'Object13'); _this.QuestionGroup.addChild(_this.shape3);

        var numbers = [1, 2, 3, 4]; // 1 means correct ans in any box

        // Shuffle the array using Phaser.ArrayUtils.shuffle
        Phaser.ArrayUtils.shuffle(numbers);

        // Find the index of number 1 in the shuffled array
        var index = numbers.indexOf(1);

        // Log the index of number 1
        console.log(index, 'index 1');


        if (index === 0) { // 1st box correct ans
            var right_shape1 = _this.add.image(470, 100, 'right1_Shape6'); right_shape1.scale.setTo(0.4, 0.45); right_shape1.name = 'R1O3'; _this.shapesGroup.addChild(right_shape1);
            var wrong_shape1 = _this.add.image(690, 100, 'wrong1_Shape6'); wrong_shape1.scale.setTo(0.36, 0.4); wrong_shape1.name = 'W1O3'; _this.shapesGroup.addChild(wrong_shape1);
            var wrong_shape2 = _this.add.image(470, 330, 'wrong2_Shape6'); wrong_shape2.scale.setTo(0.38, 0.43); wrong_shape2.name = 'W2O3'; _this.shapesGroup.addChild(wrong_shape2);
            var wrong_shape3 = _this.add.image(675, 330, 'wrong3_Shape6'); wrong_shape3.scale.setTo(0.38, 0.45); wrong_shape3.name = 'W3O3'; _this.shapesGroup.addChild(wrong_shape3);

        }
        else if (index === 1) { // 2nd box correct ans
            var right_shape2 = _this.add.image(675, 140, 'right2_Shape6'); right_shape2.scale.setTo(0.37, 0.41); right_shape2.name = 'R2O3'; _this.shapesGroup.addChild(right_shape2);
            var wrong_shape4 = _this.add.image(455, 140, 'wrong4_Shape6'); wrong_shape4.scale.setTo(0.32, 0.38); wrong_shape4.name = 'W4O3'; _this.shapesGroup.addChild(wrong_shape4);
            var wrong_shape5 = _this.add.image(455, 370, 'wrong5_Shape6'); wrong_shape5.scale.setTo(0.3, 0.38); wrong_shape5.name = 'W5O3'; _this.shapesGroup.addChild(wrong_shape5);
            var wrong_shape1 = _this.add.image(690, 330, 'wrong1_Shape6'); wrong_shape1.scale.setTo(0.36, 0.4); wrong_shape1.name = 'W1O3'; _this.shapesGroup.addChild(wrong_shape1);
        }
        else if (index === 2) { // 3rd box correct ans
            var right_shape1 = _this.add.image(470, 330, 'right1_Shape6'); right_shape1.scale.setTo(0.4, 0.45); right_shape1.name = 'R3O3'; _this.shapesGroup.addChild(right_shape1);
            var wrong_shape1 = _this.add.image(470, 100, 'wrong1_Shape6'); wrong_shape1.scale.setTo(0.36, 0.4); wrong_shape1.name = 'W1O3'; _this.shapesGroup.addChild(wrong_shape1);
            var wrong_shape3 = _this.add.image(675, 100, 'wrong3_Shape6'); wrong_shape3.scale.setTo(0.38, 0.45); wrong_shape3.name = 'W3O3'; _this.shapesGroup.addChild(wrong_shape3);
            var wrong_shape5 = _this.add.image(680, 380, 'wrong5_Shape6'); wrong_shape5.scale.setTo(0.3, 0.38); wrong_shape5.name = 'W5O3'; _this.shapesGroup.addChild(wrong_shape5);
        }
        else if (index === 3) { // 4th box correct ans
            var right_shape2 = _this.add.image(675, 360, 'right2_Shape6'); right_shape2.scale.setTo(0.37, 0.41); right_shape2.name = 'R4O3'; _this.shapesGroup.addChild(right_shape2);
            var wrong_shape2 = _this.add.image(470, 100, 'wrong2_Shape6'); wrong_shape2.scale.setTo(0.38, 0.43); wrong_shape2.name = 'W2O3'; _this.shapesGroup.addChild(wrong_shape2);
            var wrong_shape4 = _this.add.image(675, 140, 'wrong4_Shape6'); wrong_shape4.scale.setTo(0.32, 0.38); wrong_shape4.name = 'W4O3'; _this.shapesGroup.addChild(wrong_shape4);
            var wrong_shape1 = _this.add.image(475, 330, 'wrong1_Shape6'); wrong_shape1.scale.setTo(0.36, 0.4); wrong_shape1.name = 'W1O3'; _this.shapesGroup.addChild(wrong_shape1);

        }
    },
    gotoSqPyramid: function () {
        _this.QNo = 1; //Question number
        _this.Shape4_Flag = 1;

        var sqpyramidArray = [1, 2]; // there are 4 different cuboid objects
        Phaser.ArrayUtils.shuffle(sqpyramidArray);

        if (sqpyramidArray[0] === 1) { _this.shape4 = _this.add.image(85, 180, 'Object7'); _this.QuestionGroup.addChild(_this.shape4); }
        else if (sqpyramidArray[0] === 2) { _this.shape4 = _this.add.image(75, 200, 'Object19'); _this.QuestionGroup.addChild(_this.shape4); }

        var numbers = [1, 2, 3, 4]; // 1 means correct ans in any box

        // Shuffle the array using Phaser.ArrayUtils.shuffle
        3

        // Find the index of number 1 in the shuffled array
        var index = numbers.indexOf(1);

        // Log the index of number 1
        console.log(index, 'index 1');


        if (index === 0) { // 1st box correct ans
            var right_shape1 = _this.add.image(470, 100, 'image1'); right_shape1.name = 'R1O4'; _this.shapesGroup.addChild(right_shape1);
            var wrong_shape1 = _this.add.image(680, 100, 'wrong1_Shape1'); wrong_shape1.scale.setTo(0.5, 0.55); wrong_shape1.name = 'W1O4'; _this.shapesGroup.addChild(wrong_shape1);
            var wrong_shape2 = _this.add.image(480, 310, 'wrong2_Shape1'); wrong_shape2.scale.setTo(0.6, 0.58); wrong_shape2.name = 'W2O4'; _this.shapesGroup.addChild(wrong_shape2);
            var wrong_shape3 = _this.add.image(720, 330, 'wrong3_Shape1'); wrong_shape3.scale.setTo(0.45, 0.55); wrong_shape3.name = 'W3O4'; _this.shapesGroup.addChild(wrong_shape3);

        }
        else if (index === 1) { // 2nd box correct ans
            var right_shape2 = _this.add.image(690, 100, 'right2_Shape1'); right_shape2.scale.setTo(0.4, 0.45); right_shape2.name = 'R2O4'; _this.shapesGroup.addChild(right_shape2);
            var wrong_shape4 = _this.add.image(455, 100, 'wrong4_Shape1'); wrong_shape4.scale.setTo(0.65, 0.55); wrong_shape4.name = 'W4O4'; _this.shapesGroup.addChild(wrong_shape4);
            var wrong_shape5 = _this.add.image(465, 330, 'wrong5_Shape1'); wrong_shape5.scale.setTo(0.55, 0.55); wrong_shape5.name = 'W5O4'; _this.shapesGroup.addChild(wrong_shape5);
            var wrong_shape6 = _this.add.image(710, 320, 'wrong6_Shape1'); wrong_shape6.scale.setTo(0.55, 0.65); wrong_shape6.name = 'W6O4'; _this.shapesGroup.addChild(wrong_shape6);
        }
        else if (index === 2) { // 3rd box correct ans
            var right_shape3 = _this.add.image(490, 330, 'right3_Shape1'); right_shape3.scale.setTo(0.4, 0.42); right_shape3.name = 'R3O4'; _this.shapesGroup.addChild(right_shape3);
            var wrong_shape1 = _this.add.image(460, 100, 'wrong1_Shape1'); wrong_shape1.scale.setTo(0.5, 0.55); wrong_shape1.name = 'W1O4'; _this.shapesGroup.addChild(wrong_shape1);
            var wrong_shape3 = _this.add.image(720, 100, 'wrong3_Shape1'); wrong_shape3.scale.setTo(0.45, 0.55); wrong_shape3.name = 'W3O4'; _this.shapesGroup.addChild(wrong_shape3);
            var wrong_shape5 = _this.add.image(690, 330, 'wrong5_Shape1'); wrong_shape5.scale.setTo(0.55, 0.55); wrong_shape5.name = 'W5O4'; _this.shapesGroup.addChild(wrong_shape5);
        }
        else if (index === 3) { // 4th box correct ans
            var right_shape4 = _this.add.image(720, 320, 'right4_Shape1'); right_shape4.scale.setTo(0.43, 0.45); right_shape4.name = 'R4O4'; _this.shapesGroup.addChild(right_shape4);
            var wrong_shape2 = _this.add.image(480, 90, 'wrong2_Shape1'); wrong_shape2.scale.setTo(0.6, 0.58); wrong_shape2.name = 'W2O4'; _this.shapesGroup.addChild(wrong_shape2);
            var wrong_shape4 = _this.add.image(680, 100, 'wrong4_Shape1'); wrong_shape4.scale.setTo(0.6, 0.55); wrong_shape4.name = 'W4O4'; _this.shapesGroup.addChild(wrong_shape4);
            var wrong_shape6 = _this.add.image(490, 320, 'wrong6_Shape1'); wrong_shape6.scale.setTo(0.55, 0.6); wrong_shape6.name = 'W6O4'; _this.shapesGroup.addChild(wrong_shape6);

        }

    },
    gotoPrism: function () {
        _this.QNo = 5; //Question number
        _this.Shape5_Flag = 1;

        var prismArray = [1, 2]; // there are 4 different cuboid objects
        Phaser.ArrayUtils.shuffle(prismArray);

        if (prismArray[0] === 1) { _this.shape5 = _this.add.image(140, 160, 'Object6'); _this.QuestionGroup.addChild(_this.shape5); }
        else if (prismArray[0] === 2) { _this.shape5 = _this.add.image(85, 180, 'Object17'); _this.QuestionGroup.addChild(_this.shape5); }

        var numbers = [1, 2, 3, 4]; // 1 means correct ans in any box

        // Shuffle the array using Phaser.ArrayUtils.shuffle
        Phaser.ArrayUtils.shuffle(numbers);

        // Find the index of number 1 in the shuffled array
        var index = numbers.indexOf(1);

        // Log the index of number 1
        console.log(index, 'index 1');


        if (index === 0) { // 1st box correct ans
            var right_shape1 = _this.add.image(455, 100, 'right4_Shape5'); right_shape1.scale.setTo(0.4, 0.45); right_shape1.name = 'R1O5'; _this.shapesGroup.addChild(right_shape1);
            var wrong_shape1 = _this.add.image(690, 120, 'wrong1_Shape5'); wrong_shape1.scale.setTo(0.4, 0.42); wrong_shape1.name = 'W1O5'; _this.shapesGroup.addChild(wrong_shape1);
            var wrong_shape2 = _this.add.image(470, 330, 'wrong2_Shape5'); wrong_shape2.scale.setTo(0.5, 0.45); wrong_shape2.name = 'W2O5'; _this.shapesGroup.addChild(wrong_shape2);
            var wrong_shape3 = _this.add.image(690, 330, 'wrong3_Shape5'); wrong_shape3.scale.setTo(0.5, 0.55); wrong_shape3.name = 'W3O5'; _this.shapesGroup.addChild(wrong_shape3);

        }
        else if (index === 1) { // 2nd box correct ans
            var right_shape2 = _this.add.image(680, 120, 'right5_Shape5'); right_shape2.scale.setTo(0.45, 0.45); right_shape2.name = 'R2O5'; _this.shapesGroup.addChild(right_shape2);
            var wrong_shape4 = _this.add.image(450, 90, 'wrong4_Shape5'); wrong_shape4.scale.setTo(0.35, 0.35); wrong_shape4.name = 'W4O5'; _this.shapesGroup.addChild(wrong_shape4);
            var wrong_shape5 = _this.add.image(460, 330, 'wrong5_Shape5'); wrong_shape5.scale.setTo(0.45, 0.5); wrong_shape5.name = 'W5O5'; _this.shapesGroup.addChild(wrong_shape5);
            var wrong_shape6 = _this.add.image(700, 330, 'wrong6_Shape5'); wrong_shape6.scale.setTo(0.45, 0.45); wrong_shape6.name = 'W6O5'; _this.shapesGroup.addChild(wrong_shape6);
        }
        else if (index === 2) { // 3rd box correct ans
            var right_shape3 = _this.add.image(460, 330, 'right6_Shape5'); right_shape3.scale.setTo(0.45, 0.5); right_shape3.name = 'R3O5'; _this.shapesGroup.addChild(right_shape3);
            var wrong_shape1 = _this.add.image(460, 120, 'wrong1_Shape5'); wrong_shape1.scale.setTo(0.45, 0.45); wrong_shape1.name = 'W1O5'; _this.shapesGroup.addChild(wrong_shape1);
            var wrong_shape3 = _this.add.image(690, 110, 'wrong3_Shape5'); wrong_shape3.scale.setTo(0.5, 0.55); wrong_shape3.name = 'W3O5'; _this.shapesGroup.addChild(wrong_shape3);
            var wrong_shape5 = _this.add.image(680, 340, 'wrong5_Shape5'); wrong_shape5.scale.setTo(0.45, 0.5); wrong_shape5.name = 'W5O5'; _this.shapesGroup.addChild(wrong_shape5);
        }
        else if (index === 3) { // 4th box correct ans
            var right_shape4 = _this.add.image(680, 320, 'right7_Shape5'); right_shape4.scale.setTo(0.4, 0.45); right_shape4.name = 'R4O5'; _this.shapesGroup.addChild(right_shape4);
            var wrong_shape2 = _this.add.image(460, 100, 'wrong2_Shape5'); wrong_shape2.scale.setTo(0.55, 0.45); wrong_shape2.name = 'W2O5'; _this.shapesGroup.addChild(wrong_shape2);
            var wrong_shape4 = _this.add.image(670, 90, 'wrong4_Shape5'); wrong_shape4.scale.setTo(0.35, 0.35); wrong_shape4.name = 'W4O5'; _this.shapesGroup.addChild(wrong_shape4);
            var wrong_shape6 = _this.add.image(480, 340, 'wrong6_Shape5'); wrong_shape6.scale.setTo(0.45, 0.45); wrong_shape6.name = 'W6O5'; _this.shapesGroup.addChild(wrong_shape6);

        }
    },
    gotoCube: function () {
        _this.QNo = 6; //Question number
        _this.Shape6_Flag = 1;

        var cubeArray = [1, 2, 3, 4]; // there are 4 different cuboid objects
        Phaser.ArrayUtils.shuffle(cubeArray);

        if (cubeArray[0] === 1) { _this.shape6 = _this.add.image(120, 180, 'Object12'); _this.QuestionGroup.addChild(_this.shape6); }
        else if (cubeArray[0] === 2) { _this.shape6 = _this.add.image(120, 180, 'Object14'); _this.QuestionGroup.addChild(_this.shape6); }
        else if (cubeArray[0] === 3) { _this.shape6 = _this.add.image(130, 180, 'Object15'); _this.QuestionGroup.addChild(_this.shape6); }
        else if (cubeArray[0] === 4) { _this.shape6 = _this.add.image(120, 180, 'Object18'); _this.QuestionGroup.addChild(_this.shape6); }

        var numbers = [1, 2, 3, 4]; // 1 means correct ans in any box

        // Shuffle the array using Phaser.ArrayUtils.shuffle
        Phaser.ArrayUtils.shuffle(numbers);

        // Find the index of number 1 in the shuffled array
        var index = numbers.indexOf(1);

        // Log the index of number 1
        console.log(index, 'index 1');


        if (index === 0) { // 1st box correct ans
            var correctShapes = [1, 2, 3, 4];
            Phaser.ArrayUtils.shuffle(correctShapes);
            if (correctShapes[0] === 1) { var right_shape1 = _this.add.image(465, 100, 'right1_Shape3'); right_shape1.scale.setTo(0.5, 0.5); right_shape1.name = 'R1O6'; _this.shapesGroup.addChild(right_shape1); }
            else if (correctShapes[0] === 2) { var right_shape2 = _this.add.image(465, 100, 'right2_Shape3'); right_shape2.scale.setTo(0.52, 0.58); right_shape2.name = 'R2O6'; _this.shapesGroup.addChild(right_shape2); }
            else if (correctShapes[0] === 3) { var right_shape3 = _this.add.image(465, 100, 'right3_Shape3'); right_shape3.scale.setTo(0.5, 0.55); right_shape3.name = 'R3O6'; _this.shapesGroup.addChild(right_shape3); }
            else if (correctShapes[0] === 4) { var right_shape4 = _this.add.image(465, 100, 'right4_Shape3'); right_shape4.scale.setTo(0.5, 0.55); right_shape4.name = 'R4O6'; _this.shapesGroup.addChild(right_shape4); }

            var wrong_shape1 = _this.add.image(680, 160, 'wrong1_Shape3'); wrong_shape1.scale.setTo(0.35, 0.42); wrong_shape1.name = 'W1O6'; _this.shapesGroup.addChild(wrong_shape1);
            var wrong_shape2 = _this.add.image(470, 310, 'wrong2_Shape3'); wrong_shape2.scale.setTo(0.5, 0.55); wrong_shape2.name = 'W2O6'; _this.shapesGroup.addChild(wrong_shape2);
            var wrong_shape3 = _this.add.image(680, 330, 'wrong3_Shape3'); wrong_shape3.scale.setTo(0.5, 0.55); wrong_shape3.name = 'W3O6'; _this.shapesGroup.addChild(wrong_shape3);

        }
        else if (index === 1) { // 2nd box correct ans
            var correctShapes = [5, 6, 7, 8];
            Phaser.ArrayUtils.shuffle(correctShapes);
            if (correctShapes[0] === 5) { var right_shape5 = _this.add.image(685, 110, 'right5_Shape3'); right_shape5.scale.setTo(0.5, 0.55); right_shape5.name = 'R5O6'; _this.shapesGroup.addChild(right_shape5); }
            else if (correctShapes[0] === 6) { var right_shape6 = _this.add.image(685, 110, 'right6_Shape3'); right_shape6.scale.setTo(0.52, 0.58); right_shape6.name = 'R6O6'; _this.shapesGroup.addChild(right_shape6); }
            else if (correctShapes[0] === 7) { var right_shape7 = _this.add.image(680, 110, 'right7_Shape3'); right_shape7.scale.setTo(0.55, 0.6); right_shape7.name = 'R7O6'; _this.shapesGroup.addChild(right_shape7); }
            else if (correctShapes[0] === 8) { var right_shape8 = _this.add.image(680, 100, 'right8_Shape3'); right_shape8.scale.setTo(0.55, 0.6); right_shape8.name = 'R8O6'; _this.shapesGroup.addChild(right_shape8); }

            var wrong_shape4 = _this.add.image(460, 140, 'wrong4_Shape3'); wrong_shape4.scale.setTo(0.4, 0.45); wrong_shape4.name = 'W4O6'; _this.shapesGroup.addChild(wrong_shape4);
            var wrong_shape5 = _this.add.image(460, 360, 'wrong5_Shape3'); wrong_shape5.scale.setTo(0.5, 0.55); wrong_shape5.name = 'W5O6'; _this.shapesGroup.addChild(wrong_shape5);
            var wrong_shape6 = _this.add.image(700, 340, 'wrong6_Shape3'); wrong_shape6.scale.setTo(0.5, 0.55); wrong_shape6.name = 'W6O6'; _this.shapesGroup.addChild(wrong_shape6);
        }
        else if (index === 2) { // 3rd box correct ans
            var correctShapes = [9, 10, 11, 12];
            Phaser.ArrayUtils.shuffle(correctShapes);
            if (correctShapes[0] === 9) { var right_shape9 = _this.add.image(455, 350, 'right9_Shape3'); right_shape9.scale.setTo(0.45, 0.5); right_shape9.name = 'R9O6'; _this.shapesGroup.addChild(right_shape9); }
            else if (correctShapes[0] === 10) { var right_shape10 = _this.add.image(500, 310, 'right10_Shape3'); right_shape10.scale.setTo(0.38, 0.43); right_shape10.name = 'R10O6'; _this.shapesGroup.addChild(right_shape10); }
            else if (correctShapes[0] === 11) { var right_shape11 = _this.add.image(480, 310, 'right11_Shape3'); right_shape11.scale.setTo(0.52, 0.57); right_shape11.name = 'R11O6'; _this.shapesGroup.addChild(right_shape11); }
            else if (correctShapes[0] === 12) { var right_shape12 = _this.add.image(480, 310, 'right12_Shape3'); right_shape12.scale.setTo(0.5, 0.55); right_shape12.name = 'R12O6'; _this.shapesGroup.addChild(right_shape12); }

            var wrong_shape1 = _this.add.image(455, 160, 'wrong1_Shape3'); wrong_shape1.scale.setTo(0.35, 0.42); wrong_shape1.name = 'W1O6'; _this.shapesGroup.addChild(wrong_shape1);
            var wrong_shape2 = _this.add.image(700, 85, 'wrong2_Shape3'); wrong_shape2.scale.setTo(0.5, 0.55); wrong_shape2.name = 'W2O6'; _this.shapesGroup.addChild(wrong_shape2);
            var wrong_shape3 = _this.add.image(680, 330, 'wrong3_Shape3'); wrong_shape3.scale.setTo(0.5, 0.55); wrong_shape3.name = 'W3O6'; _this.shapesGroup.addChild(wrong_shape3);
        }
        else if (index === 3) { // 4th box correct ans
            var correctShapes = [13, 14, 15, 16];
            Phaser.ArrayUtils.shuffle(correctShapes);
            if (correctShapes[0] === 13) { var right_shape13 = _this.add.image(700, 310, 'right13_Shape3'); right_shape13.scale.setTo(0.55, 0.58); right_shape13.name = 'R13O6'; _this.shapesGroup.addChild(right_shape13); }
            else if (correctShapes[0] === 14) { var right_shape14 = _this.add.image(700, 320, 'right14_Shape3'); right_shape14.scale.setTo(0.45, 0.5); right_shape14.name = 'R14O6'; _this.shapesGroup.addChild(right_shape14); }
            else if (correctShapes[0] === 15) { var right_shape15 = _this.add.image(700, 310, 'right15_Shape3'); right_shape15.scale.setTo(0.52, 0.57); right_shape15.name = 'R15O6'; _this.shapesGroup.addChild(right_shape15); }
            else if (correctShapes[0] === 16) { var right_shape16 = _this.add.image(700, 310, 'right16_Shape3'); right_shape16.scale.setTo(0.5, 0.55); right_shape16.name = 'R16O6'; _this.shapesGroup.addChild(right_shape16); }

            var wrong_shape4 = _this.add.image(460, 140, 'wrong4_Shape3'); wrong_shape4.scale.setTo(0.4, 0.45); wrong_shape4.name = 'W4O6'; _this.shapesGroup.addChild(wrong_shape4);
            var wrong_shape5 = _this.add.image(680, 140, 'wrong5_Shape3'); wrong_shape5.scale.setTo(0.5, 0.55); wrong_shape5.name = 'W5O6'; _this.shapesGroup.addChild(wrong_shape5);
            var wrong_shape6 = _this.add.image(480, 340, 'wrong6_Shape3'); wrong_shape6.scale.setTo(0.5, 0.55); wrong_shape6.name = 'W6O6'; _this.shapesGroup.addChild(wrong_shape6);

        }
    },
    gotoCuboid: function () {
        _this.QNo = 7; //Question number
        _this.Shape7_Flag = 1;

        var cubeArray = [1, 2, 3, 4]; // there are 4 different cuboid objects
        Phaser.ArrayUtils.shuffle(cubeArray);

        if (cubeArray[0] === 1) { _this.shape6 = _this.add.image(45, 230, 'Object8'); _this.QuestionGroup.addChild(_this.shape6); }
        else if (cubeArray[0] === 2) { _this.shape6 = _this.add.image(70, 210, 'Object9'); _this.QuestionGroup.addChild(_this.shape6); }
        else if (cubeArray[0] === 3) { _this.shape6 = _this.add.image(50, 150, 'Object10'); _this.QuestionGroup.addChild(_this.shape6); }
        else if (cubeArray[0] === 4) { _this.shape6 = _this.add.image(100, 180, 'Object11'); _this.QuestionGroup.addChild(_this.shape6); }

        var numbers = [1, 2, 3, 4]; // 1 means correct ans in any box

        // Shuffle the array using Phaser.ArrayUtils.shuffle
        Phaser.ArrayUtils.shuffle(numbers);

        // Find the index of number 1 in the shuffled array
        var index = numbers.indexOf(1);

        // Log the index of number 1
        console.log(index, 'index 1');


        if (index === 0) { // 1st box correct ans
            var correctShapes = [1, 2, 3, 4];
            Phaser.ArrayUtils.shuffle(correctShapes);
            if (correctShapes[0] === 1) { var right_shape1 = _this.add.image(470, 90, 'right1_Shape7'); right_shape1.scale.setTo(0.6, 0.58); right_shape1.name = 'R1O7'; _this.shapesGroup.addChild(right_shape1); }
            else if (correctShapes[0] === 2) { var right_shape2 = _this.add.image(470, 90, 'right2_Shape7'); right_shape2.scale.setTo(0.6, 0.6); right_shape2.name = 'R2O7'; _this.shapesGroup.addChild(right_shape2); }
            else if (correctShapes[0] === 3) { var right_shape3 = _this.add.image(470, 90, 'right3_Shape7'); right_shape3.scale.setTo(0.65, 0.65); right_shape3.name = 'R3O7'; _this.shapesGroup.addChild(right_shape3); }
            else if (correctShapes[0] === 4) { var right_shape4 = _this.add.image(460, 100, 'right4_Shape7'); right_shape4.scale.setTo(0.5, 0.55); right_shape4.name = 'R4O7'; _this.shapesGroup.addChild(right_shape4); }

            var wrong_shape1 = _this.add.image(680, 100, 'wrong1_Shape7'); wrong_shape1.scale.setTo(0.55, 0.5); wrong_shape1.name = 'W1O7'; _this.shapesGroup.addChild(wrong_shape1);
            var wrong_shape2 = _this.add.image(460, 310, 'wrong2_Shape7'); wrong_shape2.scale.setTo(0.5, 0.55); wrong_shape2.name = 'W2O7'; _this.shapesGroup.addChild(wrong_shape2);
            var wrong_shape3 = _this.add.image(700, 330, 'wrong3_Shape7'); wrong_shape3.scale.setTo(0.55, 0.55); wrong_shape3.name = 'W3O7'; _this.shapesGroup.addChild(wrong_shape3);

        }
        else if (index === 1) { // 2nd box correct ans
            var correctShapes = [5, 6, 7, 8];
            Phaser.ArrayUtils.shuffle(correctShapes);
            if (correctShapes[0] === 5) { var right_shape5 = _this.add.image(685, 85, 'right5_Shape7'); right_shape5.scale.setTo(0.5, 0.53); right_shape5.name = 'R5O7'; _this.shapesGroup.addChild(right_shape5); }
            else if (correctShapes[0] === 6) { var right_shape6 = _this.add.image(675, 110, 'right6_Shape7'); right_shape6.scale.setTo(0.52, 0.58); right_shape6.name = 'R6O7'; _this.shapesGroup.addChild(right_shape6); }
            else if (correctShapes[0] === 7) { var right_shape7 = _this.add.image(670, 120, 'right7_Shape7'); right_shape7.scale.setTo(0.45, 0.55); right_shape7.name = 'R7O7'; _this.shapesGroup.addChild(right_shape7); }
            else if (correctShapes[0] === 8) { var right_shape8 = _this.add.image(680, 100, 'right8_Shape7'); right_shape8.scale.setTo(0.43, 0.53); right_shape8.name = 'R8O7'; _this.shapesGroup.addChild(right_shape8); }

            var wrong_shape4 = _this.add.image(470, 100, 'wrong4_Shape7'); wrong_shape4.scale.setTo(0.45, 0.55); wrong_shape4.name = 'W4O7'; _this.shapesGroup.addChild(wrong_shape4);
            var wrong_shape5 = _this.add.image(480, 320, 'wrong5_Shape7'); wrong_shape5.scale.setTo(0.6, 0.65); wrong_shape5.name = 'W5O7'; _this.shapesGroup.addChild(wrong_shape5);
            var wrong_shape6 = _this.add.image(700, 320, 'wrong6_Shape7'); wrong_shape6.scale.setTo(0.65, 0.65); wrong_shape6.name = 'W6O7'; _this.shapesGroup.addChild(wrong_shape6);
        }
        else if (index === 2) { // 3rd box correct ans
            var correctShapes = [9, 10, 11, 12];
            Phaser.ArrayUtils.shuffle(correctShapes);
            if (correctShapes[0] === 9) { var right_shape9 = _this.add.image(455, 350, 'right9_Shape7'); right_shape9.scale.setTo(0.45, 0.5); right_shape9.name = 'R9O7'; _this.shapesGroup.addChild(right_shape9); }
            else if (correctShapes[0] === 10) { var right_shape10 = _this.add.image(470, 330, 'right10_Shape7'); right_shape10.scale.setTo(0.6, 0.6); right_shape10.name = 'R10O7'; _this.shapesGroup.addChild(right_shape10); }
            else if (correctShapes[0] === 11) { var right_shape11 = _this.add.image(480, 305, 'right11_Shape7'); right_shape11.scale.setTo(0.52, 0.45); right_shape11.name = 'R11O7'; _this.shapesGroup.addChild(right_shape11); }
            else if (correctShapes[0] === 12) { var right_shape12 = _this.add.image(480, 305, 'right12_Shape7'); right_shape12.scale.setTo(0.5, 0.45); right_shape12.name = 'R12O7'; _this.shapesGroup.addChild(right_shape12); }

            var wrong_shape1 = _this.add.image(455, 100, 'wrong1_Shape7'); wrong_shape1.scale.setTo(0.55, 0.5); wrong_shape1.name = 'W1O7'; _this.shapesGroup.addChild(wrong_shape1);
            var wrong_shape2 = _this.add.image(680, 100, 'wrong2_Shape7'); wrong_shape2.scale.setTo(0.5, 0.55); wrong_shape2.name = 'W2O7'; _this.shapesGroup.addChild(wrong_shape2);
            var wrong_shape3 = _this.add.image(700, 330, 'wrong3_Shape7'); wrong_shape3.scale.setTo(0.55, 0.55); wrong_shape3.name = 'W3O7'; _this.shapesGroup.addChild(wrong_shape3);
        }
        else if (index === 3) { // 4th box correct ans
            var correctShapes = [13, 14, 15, 16];
            Phaser.ArrayUtils.shuffle(correctShapes);
            if (correctShapes[0] === 13) { var right_shape13 = _this.add.image(680, 310, 'right13_Shape7'); right_shape13.scale.setTo(0.55, 0.55); right_shape13.name = 'R13O7'; _this.shapesGroup.addChild(right_shape13); }
            else if (correctShapes[0] === 14) { var right_shape14 = _this.add.image(680, 330, 'right14_Shape7'); right_shape14.scale.setTo(0.55, 0.55); right_shape14.name = 'R14O7'; _this.shapesGroup.addChild(right_shape14); }
            else if (correctShapes[0] === 15) { var right_shape15 = _this.add.image(690, 310, 'right15_Shape7'); right_shape15.scale.setTo(0.45, 0.5); right_shape15.name = 'R15O7'; _this.shapesGroup.addChild(right_shape15); }
            else if (correctShapes[0] === 16) { var right_shape16 = _this.add.image(700, 310, 'right16_Shape7'); right_shape16.scale.setTo(0.5, 0.5); right_shape16.name = 'R16O7'; _this.shapesGroup.addChild(right_shape16); }

            var wrong_shape4 = _this.add.image(470, 100, 'wrong4_Shape7'); wrong_shape4.scale.setTo(0.45, 0.55); wrong_shape4.name = 'W4O7'; _this.shapesGroup.addChild(wrong_shape4);
            var wrong_shape5 = _this.add.image(690, 100, 'wrong5_Shape7'); wrong_shape5.scale.setTo(0.6, 0.65); wrong_shape5.name = 'W5O7'; _this.shapesGroup.addChild(wrong_shape5);
            var wrong_shape6 = _this.add.image(480, 320, 'wrong6_Shape7'); wrong_shape6.scale.setTo(0.65, 0.65); wrong_shape6.name = 'W6O7'; _this.shapesGroup.addChild(wrong_shape6);

        }
    },

    changeFrame1: function () {
        _this.Box2_1.frame = 1;
        _this.Box2_2.frame = 0;
        _this.Box2_3.frame = 0;
        _this.Box2_4.frame = 0;

        _this.selectedBox1 = true;
        _this.selectedBox2 = false;
        _this.selectedBox3 = false;
        _this.selectedBox4 = false;
    },
    changeFrame2: function () {
        _this.Box2_2.frame = 1;
        _this.Box2_1.frame = 0;
        _this.Box2_3.frame = 0;
        _this.Box2_4.frame = 0;

        _this.selectedBox2 = true;
        _this.selectedBox1 = false;
        _this.selectedBox3 = false;
        _this.selectedBox4 = false;
    },
    changeFrame3: function () {
        _this.Box2_3.frame = 1;
        _this.Box2_1.frame = 0;
        _this.Box2_2.frame = 0;
        _this.Box2_4.frame = 0;

        _this.selectedBox3 = true;
        _this.selectedBox1 = false;
        _this.selectedBox2 = false;
        _this.selectedBox4 = false;
    },
    changeFrame4: function () {
        _this.Box2_4.frame = 1;
        _this.Box2_1.frame = 0;
        _this.Box2_2.frame = 0;
        _this.Box2_3.frame = 0;

        _this.selectedBox4 = true;
        _this.selectedBox1 = false;
        _this.selectedBox2 = false;
        _this.selectedBox3 = false;
    },

    InitialScreen2: function () {
        _this.sceneCount++;
        _this.AnsTimerCount =0;
        _this.noofAttempts=0;
        _this.power = "\u{00B2}";

        if (_this.count1 === 3) {
            _this.Ask_Question2.play();
            _this.Question_flag = 2;
        }
        console.log("AskingQuestion 2")

        _this.tick = _this.add.sprite(880, 455, 'TickBtn');

        _this.Box1 = _this.add.sprite(30, 70, 'Box1');
        _this.Box2_1 = _this.add.sprite(440, 70, 'Box2');
        _this.Box2_2 = _this.add.sprite(660, 70, 'Box2');
        _this.Box2_3 = _this.add.sprite(440, 295, 'Box2');
        _this.Box2_4 = _this.add.sprite(660, 295, 'Box2');

        _this.tick.inputEnabled = true;
        _this.tick.input.useHandCursor = true;
        _this.tick.events.onInputDown.add(_this.tickSecondEvaluation, _this);

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

        _this.QuestionGroup = _this.add.group();

        switch (_this.numbers[_this.count1]) {
            case 1: _this.gotoCylinder2();
                break;
            case 2: _this.gotoCone2();
                break;
            case 3: _this.gotoTriPyramid2();
                break;
            case 4: _this.gotoSqPyramid2();
                break;
            case 5: _this.gotoPrism2();
                break;
            case 6: _this.gotoCube2();
                break;
            case 7: _this.gotoCuboid2();
                break;
        }
    },

    gotoCylinder2: function () {
        _this.QNo = 1; //Question number
        _this.Shape1_Flag = 1;

        var cuboidArray = [1, 2, 3, 4];
        Phaser.ArrayUtils.shuffle(cuboidArray);

        if (cuboidArray[0] === 1) { var cylinder1 = _this.add.image(60, 200, 'Object1'); cylinder1.name = 'C1'; _this.QuestionGroup.addChild(cylinder1); }
        else if (cuboidArray[0] === 2) { var cylinder2 = _this.add.image(130, 200, 'Object2'); cylinder2.name = 'C2'; _this.QuestionGroup.addChild(cylinder2); }
        else if (cuboidArray[0] === 3) { var cylinder3 = _this.add.image(130, 180, 'Object3'); cylinder3.name = 'C3'; _this.QuestionGroup.addChild(cylinder3); }
        else if (cuboidArray[0] === 4) { var cylinder4 = _this.add.image(130, 170, 'Object4'); cylinder4.name = 'C4'; _this.QuestionGroup.addChild(cylinder4); }

        var numbers = [1, 2, 3, 4]; // 4 wrong ans 1 2 3 right ans

        // Shuffle the array using Phaser.ArrayUtils.shuffle
        Phaser.ArrayUtils.shuffle(numbers);


        if (numbers[0] === 4) { // 1st box wrong ans
            var wrong_shape1 = _this.add.image(460, 100, 'wrong1_Shape4'); wrong_shape1.scale.setTo(0.4, 0.45); wrong_shape1.name = 'W1O1'; _this.shapesGroup.addChild(wrong_shape1);

            var right_shape1 = _this.add.image(690, 85, 'right1_Shape4'); right_shape1.scale.setTo(0.36, 0.4); right_shape1.name = 'R1O1'; _this.shapesGroup.addChild(right_shape1);
            var right_shape2 = _this.add.image(450, 310, 'right2_Shape4'); right_shape2.scale.setTo(0.35, 0.4); right_shape2.name = 'R2O1'; _this.shapesGroup.addChild(right_shape2);
            var right_shape3 = _this.add.image(670, 310, 'right3_Shape4'); right_shape3.scale.setTo(0.32, 0.37); right_shape3.name = 'R3O1'; _this.shapesGroup.addChild(right_shape3);
        }
        else if (numbers[1] === 4) { // 2nd box wrong ans
            var wrong_shape2 = _this.add.image(685, 100, 'wrong2_Shape4'); wrong_shape2.scale.setTo(0.4, 0.43); wrong_shape2.name = 'W2O1'; _this.shapesGroup.addChild(wrong_shape2);

            var right_shape2 = _this.add.image(450, 85, 'right2_Shape4'); right_shape2.scale.setTo(0.35, 0.4); right_shape2.name = 'R2O1'; _this.shapesGroup.addChild(right_shape2);
            var right_shape3 = _this.add.image(450, 310, 'right3_Shape4'); right_shape3.scale.setTo(0.32, 0.37); right_shape3.name = 'R3O1'; _this.shapesGroup.addChild(right_shape3);
            var right_shape4 = _this.add.image(675, 310, 'right4_Shape4'); right_shape4.scale.setTo(0.34, 0.38); right_shape4.name = 'R4O1'; _this.shapesGroup.addChild(right_shape4);
        }
        else if (numbers[2] === 4) { // 3rd box wrong ans
            var wrong_shape3 = _this.add.image(450, 360, 'wrong3_Shape4'); wrong_shape3.scale.setTo(0.28, 0.3); wrong_shape3.name = 'W3O1'; _this.shapesGroup.addChild(wrong_shape3);

            var right_shape1 = _this.add.image(690, 85, 'right1_Shape4'); right_shape1.scale.setTo(0.36, 0.4); right_shape1.name = 'R1O1'; _this.shapesGroup.addChild(right_shape1);
            var right_shape2 = _this.add.image(450, 85, 'right2_Shape4'); right_shape2.scale.setTo(0.35, 0.4); right_shape2.name = 'R2O1'; _this.shapesGroup.addChild(right_shape2);
            var right_shape3 = _this.add.image(670, 310, 'right3_Shape4'); right_shape3.scale.setTo(0.32, 0.37); right_shape3.name = 'R3O1'; _this.shapesGroup.addChild(right_shape3);
        }
        else if (numbers[3] === 4) { // 4th box wrong ans
            var wrong_shape4 = _this.add.image(680, 330, 'wrong1_Shape4'); wrong_shape4.scale.setTo(0.4, 0.45); wrong_shape4.name = 'W4O1'; _this.shapesGroup.addChild(wrong_shape4);

            var right_shape2 = _this.add.image(450, 85, 'right2_Shape4'); right_shape2.scale.setTo(0.35, 0.4); right_shape2.name = 'R2O1'; _this.shapesGroup.addChild(right_shape2);
            var right_shape3 = _this.add.image(670, 90, 'right3_Shape4'); right_shape3.scale.setTo(0.32, 0.37); right_shape3.name = 'R3O1'; _this.shapesGroup.addChild(right_shape3);
            var right_shape4 = _this.add.image(450, 310, 'right4_Shape4'); right_shape4.scale.setTo(0.34, 0.38); right_shape4.name = 'R4O1'; _this.shapesGroup.addChild(right_shape4);
        }
    },
    gotoCone2: function () {
        _this.QNo = 2; //Question number
        _this.Shape2_Flag = 1;

        var coneArray = [1, 2];
        Phaser.ArrayUtils.shuffle(coneArray);

        if (coneArray[0] === 1) { _this.shape2 = _this.add.image(100, 140, 'Object5'); _this.QuestionGroup.addChild(_this.shape2); }
        else if (coneArray[0] === 2) { _this.shape2 = _this.add.image(100, 140, 'Object16'); _this.QuestionGroup.addChild(_this.shape2); }

        var numbers = [1, 2];
        Phaser.ArrayUtils.shuffle(numbers);

        if (numbers[0] === 1) { // 1st and 4th box wrong ans 0,3
            var wrong_shape1 = _this.add.image(485, 85, 'wrong1_Shape2'); wrong_shape1.scale.setTo(0.36, 0.4); wrong_shape1.name = 'W1O2'; _this.shapesGroup.addChild(wrong_shape1);

            var right_shape1 = _this.add.image(680, 100, 'right1_Shape2'); right_shape1.scale.setTo(0.4, 0.45); right_shape1.name = 'R1O2'; _this.shapesGroup.addChild(right_shape1);
            var right_shape2 = _this.add.image(465, 310, 'right2_Shape2'); right_shape2.scale.setTo(0.37, 0.41); right_shape2.name = 'R2O2'; _this.shapesGroup.addChild(right_shape2);

            var wrong_shape2 = _this.add.image(680, 310, 'wrong2_Shape2'); wrong_shape2.scale.setTo(0.38, 0.43); wrong_shape2.name = 'W2O2'; _this.shapesGroup.addChild(wrong_shape2);
        }
        else if (numbers[0] === 2) { // 2nd and 4th box wrong ans 1,3
            var right_shape1 = _this.add.image(460, 100, 'right1_Shape2'); right_shape1.scale.setTo(0.4, 0.45); right_shape1.name = 'R1O2'; _this.shapesGroup.addChild(right_shape1);
            var wrong_shape3 = _this.add.image(700, 100, 'wrong3_Shape2'); wrong_shape3.scale.setTo(0.4, 0.45); wrong_shape3.name = 'W3O2'; _this.shapesGroup.addChild(wrong_shape3);
            var right_shape2 = _this.add.image(470, 320, 'right2_Shape2'); right_shape2.scale.setTo(0.37, 0.41); right_shape2.name = 'R2O2'; _this.shapesGroup.addChild(right_shape2);
            var wrong_shape4 = _this.add.image(680, 360, 'wrong4_Shape2'); wrong_shape4.scale.setTo(0.32, 0.36); wrong_shape4.name = 'W4O2'; _this.shapesGroup.addChild(wrong_shape4);
        }
    },
    gotoTriPyramid2: function () {
        _this.QNo = 1; //Question number
        _this.Shape3_Flag = 1;

        _this.shape3 = _this.add.image(90, 160, 'Object13'); _this.QuestionGroup.addChild(_this.shape3);

        var numbers = [1, 2]; // 1 means correct ans in any box
        Phaser.ArrayUtils.shuffle(numbers);

        if (numbers[0] === 1) { // 1st and 3rd box wrong ans 0,2
            var wrong_shape1 = _this.add.image(465, 100, 'wrong1_Shape6'); wrong_shape1.scale.setTo(0.36, 0.4); wrong_shape1.name = 'W1O3'; _this.shapesGroup.addChild(wrong_shape1);
            var right_shape1 = _this.add.image(680, 100, 'right1_Shape6'); right_shape1.scale.setTo(0.4, 0.45); right_shape1.name = 'R1O3'; _this.shapesGroup.addChild(right_shape1);
            var wrong_shape3 = _this.add.image(450, 330, 'wrong3_Shape6'); wrong_shape3.scale.setTo(0.38, 0.45); wrong_shape3.name = 'W2O3'; _this.shapesGroup.addChild(wrong_shape3);
            var right_shape2 = _this.add.image(675, 360, 'right2_Shape6'); right_shape2.scale.setTo(0.37, 0.41); right_shape2.name = 'R2O3'; _this.shapesGroup.addChild(right_shape2);
        }
        else if (numbers[0] === 2) { // 2nd and 3rd box wrong ans 1,2
            var right_shape1 = _this.add.image(470, 100, 'right1_Shape6'); right_shape1.scale.setTo(0.4, 0.45); right_shape1.name = 'R1O3'; _this.shapesGroup.addChild(right_shape1);
            var wrong_shape4 = _this.add.image(670, 150, 'wrong4_Shape6'); wrong_shape4.scale.setTo(0.32, 0.38); wrong_shape4.name = 'W3O3'; _this.shapesGroup.addChild(wrong_shape4);
            var wrong_shape5 = _this.add.image(455, 370, 'wrong5_Shape6'); wrong_shape5.scale.setTo(0.3, 0.38); wrong_shape5.name = 'W4O3'; _this.shapesGroup.addChild(wrong_shape5);
            var right_shape2 = _this.add.image(675, 360, 'right2_Shape6'); right_shape2.scale.setTo(0.37, 0.41); right_shape2.name = 'R2O3'; _this.shapesGroup.addChild(right_shape2);
        }
    },
    gotoSqPyramid2: function () {
        _this.QNo = 1; //Question number
        _this.Shape4_Flag = 1;

        var sqpyramidArray = [1, 2];
        Phaser.ArrayUtils.shuffle(sqpyramidArray);

        if (sqpyramidArray[0] === 1) { _this.shape4 = _this.add.image(85, 180, 'Object7'); _this.QuestionGroup.addChild(_this.shape4); }
        else if (sqpyramidArray[0] === 2) { _this.shape4 = _this.add.image(75, 200, 'Object19'); _this.QuestionGroup.addChild(_this.shape4); }

        var numbers = [1, 2, 3, 4];
        Phaser.ArrayUtils.shuffle(numbers);

        if (numbers[0] === 4) { // 1st box wrong ans
            var wrong_shape1 = _this.add.image(460, 100, 'wrong1_Shape1'); wrong_shape1.scale.setTo(0.5, 0.55); wrong_shape1.name = 'W1O4'; _this.shapesGroup.addChild(wrong_shape1);
            var right_shape1 = _this.add.image(690, 100, 'image1'); right_shape1.name = 'R1O4'; _this.shapesGroup.addChild(right_shape1);
            var right_shape2 = _this.add.image(480, 330, 'right2_Shape1'); right_shape2.scale.setTo(0.4, 0.45); right_shape2.name = 'R2O4'; _this.shapesGroup.addChild(right_shape2);
            var right_shape3 = _this.add.image(710, 330, 'right3_Shape1'); right_shape3.scale.setTo(0.4, 0.42); right_shape3.name = 'R3O4'; _this.shapesGroup.addChild(right_shape3);
        }
        else if (numbers[1] === 4) { // 2nd box wrong ans
            var wrong_shape2 = _this.add.image(690, 85, 'wrong2_Shape1'); wrong_shape2.scale.setTo(0.6, 0.58); wrong_shape2.name = 'W2O4'; _this.shapesGroup.addChild(wrong_shape2);
            var right_shape4 = _this.add.image(490, 90, 'right4_Shape1'); right_shape4.scale.setTo(0.43, 0.45); right_shape4.name = 'R4O4'; _this.shapesGroup.addChild(right_shape4);
            var right_shape5 = _this.add.image(500, 310, 'right5_Shape1'); right_shape5.scale.setTo(0.42, 0.48); right_shape5.name = 'R5O4'; _this.shapesGroup.addChild(right_shape5);
            var right_shape6 = _this.add.image(710, 320, 'right6_Shape1'); right_shape6.scale.setTo(0.42, 0.48); right_shape6.name = 'R6O4'; _this.shapesGroup.addChild(right_shape6);
        }
        else if (numbers[2] === 4) { // 3rd box wrong ans
            var wrong_shape3 = _this.add.image(500, 330, 'wrong3_Shape1'); wrong_shape3.scale.setTo(0.45, 0.55); wrong_shape3.name = 'W3O4'; _this.shapesGroup.addChild(wrong_shape3);
            var right_shape1 = _this.add.image(470, 100, 'image1'); right_shape1.name = 'R1O4'; _this.shapesGroup.addChild(right_shape1);
            var right_shape3 = _this.add.image(700, 100, 'right3_Shape1'); right_shape3.scale.setTo(0.4, 0.42); right_shape3.name = 'R3O4'; _this.shapesGroup.addChild(right_shape3);
            var right_shape5 = _this.add.image(720, 320, 'right5_Shape1'); right_shape5.scale.setTo(0.42, 0.48); right_shape5.name = 'R5O4'; _this.shapesGroup.addChild(right_shape5);
        }
        else if (numbers[3] === 4) { // 4th box wrong ans
            var wrong_shape4 = _this.add.image(680, 320, 'wrong4_Shape1'); wrong_shape4.scale.setTo(0.6, 0.55); wrong_shape4.name = 'W4O4'; _this.shapesGroup.addChild(wrong_shape4);
            var right_shape2 = _this.add.image(480, 100, 'right2_Shape1'); right_shape2.scale.setTo(0.4, 0.45); right_shape2.name = 'R2O4'; _this.shapesGroup.addChild(right_shape2);
            var right_shape4 = _this.add.image(700, 90, 'right4_Shape1'); right_shape4.scale.setTo(0.43, 0.45); right_shape4.name = 'R4O4'; _this.shapesGroup.addChild(right_shape4);
            var right_shape6 = _this.add.image(480, 320, 'right6_Shape1'); right_shape6.scale.setTo(0.42, 0.48); right_shape6.name = 'R6O4'; _this.shapesGroup.addChild(right_shape6);
        }

    },
    gotoPrism2: function () {
        _this.QNo = 5; //Question number
        _this.Shape5_Flag = 1;

        var prismArray = [1, 2];
        Phaser.ArrayUtils.shuffle(prismArray);

        if (prismArray[0] === 1) { _this.shape5 = _this.add.image(140, 160, 'Object6'); _this.QuestionGroup.addChild(_this.shape5); }
        else if (prismArray[0] === 2) { _this.shape5 = _this.add.image(85, 180, 'Object17'); _this.QuestionGroup.addChild(_this.shape5); }

        var numbers = [1, 2, 3, 4];
        Phaser.ArrayUtils.shuffle(numbers);

        if (numbers[0] === 4) { // 1st box wrong ans
            var wrong_shape1 = _this.add.image(460, 110, 'wrong1_Shape5'); wrong_shape1.scale.setTo(0.45, 0.5); wrong_shape1.name = 'W1O5'; _this.shapesGroup.addChild(wrong_shape1);
            var right_shape1 = _this.add.image(690, 110, 'right1_Shape5'); right_shape1.scale.setTo(0.5, 0.55); right_shape1.name = 'R1O5'; _this.shapesGroup.addChild(right_shape1);
            var right_shape2 = _this.add.image(460, 330, 'right2_Shape5'); right_shape2.scale.setTo(0.5, 0.55); right_shape2.name = 'R2O5'; _this.shapesGroup.addChild(right_shape2);
            var right_shape3 = _this.add.image(690, 330, 'right3_Shape5'); right_shape3.scale.setTo(0.5, 0.55); right_shape3.name = 'R3O5'; _this.shapesGroup.addChild(right_shape3);
        }
        else if (numbers[1] === 4) { // 2nd box wrong ans
            var wrong_shape2 = _this.add.image(690, 100, 'wrong2_Shape5'); wrong_shape2.scale.setTo(0.5, 0.45); wrong_shape2.name = 'W2O5'; _this.shapesGroup.addChild(wrong_shape2);
            var right_shape4 = _this.add.image(450, 100, 'right5_Shape5'); right_shape4.scale.setTo(0.45, 0.5); right_shape4.name = 'R4O5'; _this.shapesGroup.addChild(right_shape4);
            var right_shape5 = _this.add.image(460, 330, 'right6_Shape5'); right_shape5.scale.setTo(0.45, 0.5); right_shape5.name = 'R5O5'; _this.shapesGroup.addChild(right_shape5);
            var right_shape6 = _this.add.image(680, 320, 'right7_Shape5'); right_shape6.scale.setTo(0.4, 0.45); right_shape6.name = 'R6O5'; _this.shapesGroup.addChild(right_shape6);
        }
        else if (numbers[2] === 4) { // 3rd box wrong ans
            var wrong_shape3 = _this.add.image(465, 330, 'wrong3_Shape5'); wrong_shape3.scale.setTo(0.5, 0.55); wrong_shape3.name = 'W3O5'; _this.shapesGroup.addChild(wrong_shape3);
            var right_shape1 = _this.add.image(465, 110, 'right1_Shape5'); right_shape1.scale.setTo(0.5, 0.55); right_shape1.name = 'R1O5'; _this.shapesGroup.addChild(right_shape1);
            var right_shape3 = _this.add.image(685, 110, 'right3_Shape5'); right_shape3.scale.setTo(0.5, 0.55); right_shape3.name = 'R3O5'; _this.shapesGroup.addChild(right_shape3);
            var right_shape5 = _this.add.image(680, 330, 'right6_Shape5'); right_shape5.scale.setTo(0.45, 0.5); right_shape5.name = 'R5O5'; _this.shapesGroup.addChild(right_shape5);
        }
        else if (numbers[3] === 4) { // 4th box wrong ans
            var wrong_shape4 = _this.add.image(670, 310, 'wrong4_Shape5'); wrong_shape4.scale.setTo(0.35, 0.35); wrong_shape4.name = 'W4O5'; _this.shapesGroup.addChild(wrong_shape4);
            var right_shape2 = _this.add.image(460, 100, 'right2_Shape5'); right_shape2.scale.setTo(0.5, 0.55); right_shape2.name = 'R2O5'; _this.shapesGroup.addChild(right_shape2);
            var right_shape4 = _this.add.image(670, 100, 'right5_Shape5'); right_shape4.scale.setTo(0.45, 0.5); right_shape4.name = 'R4O5'; _this.shapesGroup.addChild(right_shape4);
            var right_shape6 = _this.add.image(450, 320, 'right7_Shape5'); right_shape6.scale.setTo(0.4, 0.45); right_shape6.name = 'R6O5'; _this.shapesGroup.addChild(right_shape6);
        }
    },
    gotoCube2: function () {
        _this.QNo = 6; //Question number
        _this.Shape6_Flag = 1;

        var cubeArray = [1, 2, 3, 4];
        Phaser.ArrayUtils.shuffle(cubeArray);

        if (cubeArray[0] === 1) { _this.shape6 = _this.add.image(120, 180, 'Object12'); _this.QuestionGroup.addChild(_this.shape6); }
        else if (cubeArray[0] === 2) { _this.shape6 = _this.add.image(120, 180, 'Object14'); _this.QuestionGroup.addChild(_this.shape6); }
        else if (cubeArray[0] === 3) { _this.shape6 = _this.add.image(130, 180, 'Object15'); _this.QuestionGroup.addChild(_this.shape6); }
        else if (cubeArray[0] === 4) { _this.shape6 = _this.add.image(120, 180, 'Object18'); _this.QuestionGroup.addChild(_this.shape6); }

        var numbers = [1, 2, 3, 4];
        Phaser.ArrayUtils.shuffle(numbers);

        if (numbers[0] === 4) { // 1st box wrong ans
            var wrong_shape1 = _this.add.image(460, 110, 'wrong3_Shape3'); wrong_shape1.scale.setTo(0.5, 0.55); wrong_shape1.name = 'W1O6'; _this.shapesGroup.addChild(wrong_shape1);
            var right_shape1 = _this.add.image(680, 110, 'right1_Shape3'); right_shape1.scale.setTo(0.5, 0.5); right_shape1.name = 'R1O6'; _this.shapesGroup.addChild(right_shape1);
            var right_shape2 = _this.add.image(465, 330, 'right2_Shape3'); right_shape2.scale.setTo(0.52, 0.58); right_shape2.name = 'R2O6'; _this.shapesGroup.addChild(right_shape2);
            var right_shape3 = _this.add.image(680, 330, 'right3_Shape3'); right_shape3.scale.setTo(0.5, 0.55); right_shape3.name = 'R3O6'; _this.shapesGroup.addChild(right_shape3);
        }
        else if (numbers[1] === 4) { // 2nd box wrong ans
            var wrong_shape2 = _this.add.image(685, 140, 'wrong5_Shape3'); wrong_shape2.scale.setTo(0.5, 0.55); wrong_shape2.name = 'W2O6'; _this.shapesGroup.addChild(wrong_shape2);
            var right_shape5 = _this.add.image(460, 110, 'right5_Shape3'); right_shape5.scale.setTo(0.5, 0.55); right_shape5.name = 'R5O6'; _this.shapesGroup.addChild(right_shape5);
            var right_shape6 = _this.add.image(460, 330, 'right6_Shape3'); right_shape6.scale.setTo(0.52, 0.58); right_shape6.name = 'R6O6'; _this.shapesGroup.addChild(right_shape6);
            var right_shape7 = _this.add.image(675, 330, 'right7_Shape3'); right_shape7.scale.setTo(0.55, 0.6); right_shape7.name = 'R7O6'; _this.shapesGroup.addChild(right_shape7);
        }
        else if (numbers[2] === 4) { // 3rd box wrong ans
            var wrong_shape3 = _this.add.image(480, 340, 'wrong6_Shape3'); wrong_shape3.scale.setTo(0.5, 0.55); wrong_shape3.name = 'W3O6'; _this.shapesGroup.addChild(wrong_shape3);
            var right_shape9 = _this.add.image(455, 140, 'right9_Shape3'); right_shape9.scale.setTo(0.45, 0.5); right_shape9.name = 'R9O6'; _this.shapesGroup.addChild(right_shape9);
            var right_shape10 = _this.add.image(720, 90, 'right10_Shape3'); right_shape10.scale.setTo(0.38, 0.43); right_shape10.name = 'R10O6'; _this.shapesGroup.addChild(right_shape10);
            var right_shape11 = _this.add.image(690, 310, 'right11_Shape3'); right_shape11.scale.setTo(0.52, 0.57); right_shape11.name = 'R11O6'; _this.shapesGroup.addChild(right_shape11);
        }
        else if (numbers[3] === 4) { // 4th box wrong ans
            var wrong_shape4 = _this.add.image(710, 330, 'wrong7_Shape3'); wrong_shape4.scale.setTo(0.6, 0.6); wrong_shape4.name = 'W4O6'; _this.shapesGroup.addChild(wrong_shape4);
            var right_shape13 = _this.add.image(470, 85, 'right13_Shape3'); right_shape13.scale.setTo(0.55, 0.58); right_shape13.name = 'R13O6'; _this.shapesGroup.addChild(right_shape13);
            var right_shape14 = _this.add.image(710, 100, 'right14_Shape3'); right_shape14.scale.setTo(0.45, 0.5); right_shape14.name = 'R14O6'; _this.shapesGroup.addChild(right_shape14);
            var right_shape15 = _this.add.image(480, 310, 'right15_Shape3'); right_shape15.scale.setTo(0.52, 0.57); right_shape15.name = 'R15O6'; _this.shapesGroup.addChild(right_shape15);
        }
    },
    gotoCuboid2: function () {
        _this.QNo = 7; //Question number
        _this.Shape7_Flag = 1;

        var cubeArray = [1, 2, 3, 4];
        Phaser.ArrayUtils.shuffle(cubeArray);

        if (cubeArray[0] === 1) { _this.shape6 = _this.add.image(45, 230, 'Object8'); _this.QuestionGroup.addChild(_this.shape6); }
        else if (cubeArray[0] === 2) { _this.shape6 = _this.add.image(70, 210, 'Object9'); _this.QuestionGroup.addChild(_this.shape6); }
        else if (cubeArray[0] === 3) { _this.shape6 = _this.add.image(50, 150, 'Object10'); _this.QuestionGroup.addChild(_this.shape6); }
        else if (cubeArray[0] === 4) { _this.shape6 = _this.add.image(100, 180, 'Object11'); _this.QuestionGroup.addChild(_this.shape6); }

        var numbers = [1, 2, 3, 4];
        Phaser.ArrayUtils.shuffle(numbers);

        if (numbers[0] === 4) { // 1st box correct ans
            var wrong_shape1 = _this.add.image(460, 100, 'wrong1_Shape7'); wrong_shape1.scale.setTo(0.55, 0.5); wrong_shape1.name = 'W1O7'; _this.shapesGroup.addChild(wrong_shape1);
            var right_shape1 = _this.add.image(690, 90, 'right1_Shape7'); right_shape1.scale.setTo(0.6, 0.58); right_shape1.name = 'R1O7'; _this.shapesGroup.addChild(right_shape1);
            var right_shape2 = _this.add.image(470, 310, 'right2_Shape7'); right_shape2.scale.setTo(0.6, 0.6); right_shape2.name = 'R2O7'; _this.shapesGroup.addChild(right_shape2);
            var right_shape3 = _this.add.image(685, 320, 'right3_Shape7'); right_shape3.scale.setTo(0.65, 0.65); right_shape3.name = 'R3O7'; _this.shapesGroup.addChild(right_shape3);
        }
        else if (numbers[1] === 4) { // 2nd box correct ans
            var wrong_shape2 = _this.add.image(690, 90, 'wrong2_Shape7'); wrong_shape2.scale.setTo(0.5, 0.55); wrong_shape2.name = 'W2O7'; _this.shapesGroup.addChild(wrong_shape2);
            var right_shape5 = _this.add.image(460, 85, 'right5_Shape7'); right_shape5.scale.setTo(0.5, 0.53); right_shape5.name = 'R5O7'; _this.shapesGroup.addChild(right_shape5);
            var right_shape6 = _this.add.image(455, 330, 'right6_Shape7'); right_shape6.scale.setTo(0.52, 0.58); right_shape6.name = 'R6O7'; _this.shapesGroup.addChild(right_shape6);
            var right_shape7 = _this.add.image(670, 350, 'right7_Shape7'); right_shape7.scale.setTo(0.45, 0.55); right_shape7.name = 'R7O7'; _this.shapesGroup.addChild(right_shape7);

        }
        else if (numbers[2] === 4) { // 3rd box correct ans
            var wrong_shape3 = _this.add.image(480, 340, 'wrong3_Shape7'); wrong_shape3.scale.setTo(0.55, 0.55); wrong_shape3.name = 'W3O7'; _this.shapesGroup.addChild(wrong_shape3);
            var right_shape9 = _this.add.image(455, 120, 'right9_Shape7'); right_shape9.scale.setTo(0.45, 0.5); right_shape9.name = 'R9O7'; _this.shapesGroup.addChild(right_shape9);
            var right_shape10 = _this.add.image(690, 100, 'right10_Shape7'); right_shape10.scale.setTo(0.6, 0.6); right_shape10.name = 'R10O7'; _this.shapesGroup.addChild(right_shape10);
            var right_shape11 = _this.add.image(710, 305, 'right11_Shape7'); right_shape11.scale.setTo(0.52, 0.45); right_shape11.name = 'R11O7'; _this.shapesGroup.addChild(right_shape11);
        }
        else if (numbers[3] === 4) { // 4th box correct ans
            var wrong_shape4 = _this.add.image(700, 320, 'wrong4_Shape7'); wrong_shape4.scale.setTo(0.45, 0.55); wrong_shape4.name = 'W4O7'; _this.shapesGroup.addChild(wrong_shape4);
            var right_shape13 = _this.add.image(460, 85, 'right13_Shape7'); right_shape13.scale.setTo(0.55, 0.55); right_shape13.name = 'R13O7'; _this.shapesGroup.addChild(right_shape13);
            var right_shape14 = _this.add.image(685, 110, 'right14_Shape7'); right_shape14.scale.setTo(0.55, 0.55); right_shape14.name = 'R14O7'; _this.shapesGroup.addChild(right_shape14);
            var right_shape15 = _this.add.image(470, 310, 'right15_Shape7'); right_shape15.scale.setTo(0.45, 0.5); right_shape15.name = 'R15O7'; _this.shapesGroup.addChild(right_shape15);
        }
    },

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
    //Tick button in the question screen and the evaluation of the top box or workspace.
    tickFirstEvaluation: function (target) {
        console.log("tick evaluation");
        _this.clickSound.play();

        if (_this.Shape1_Flag) {
            if (_this.shapesGroup.getChildAt(0).name == 'R1O1' && _this.selectedBox1 == true) { _this.right = true; }
            else if (_this.shapesGroup.getChildAt(0).name == 'R2O1' && _this.selectedBox2 == true) { _this.right = true; }
            else if (_this.shapesGroup.getChildAt(0).name == 'R3O1' && _this.selectedBox3 == true) { _this.right = true; }
            else if (_this.shapesGroup.getChildAt(0).name == 'R4O1' && _this.selectedBox4 == true) { _this.right = true; }
        }
        else if (_this.Shape2_Flag) {
            if (_this.shapesGroup.getChildAt(0).name == 'R1O2' && _this.selectedBox1 == true) { _this.right = true; }
            else if (_this.shapesGroup.getChildAt(0).name == 'R2O2' && _this.selectedBox2 == true) { _this.right = true; }
            else if (_this.shapesGroup.getChildAt(0).name == 'R3O2' && _this.selectedBox3 == true) { _this.right = true; }
            else if (_this.shapesGroup.getChildAt(0).name == 'R4O2' && _this.selectedBox4 == true) { _this.right = true; }
        }
        else if (_this.Shape3_Flag) {
            if (_this.shapesGroup.getChildAt(0).name == 'R1O3' && _this.selectedBox1 == true) { _this.right = true; }
            else if (_this.shapesGroup.getChildAt(0).name == 'R2O3' && _this.selectedBox2 == true) { _this.right = true; }
            else if (_this.shapesGroup.getChildAt(0).name == 'R3O3' && _this.selectedBox3 == true) { _this.right = true; }
            else if (_this.shapesGroup.getChildAt(0).name == 'R4O3' && _this.selectedBox4 == true) { _this.right = true; }
        }
        else if (_this.Shape4_Flag) {
            if (_this.shapesGroup.getChildAt(0).name == 'R1O4' && _this.selectedBox1 == true) { _this.right = true; }
            else if (_this.shapesGroup.getChildAt(0).name == 'R2O4' && _this.selectedBox2 == true) { _this.right = true; }
            else if (_this.shapesGroup.getChildAt(0).name == 'R3O4' && _this.selectedBox3 == true) { _this.right = true; }
            else if (_this.shapesGroup.getChildAt(0).name == 'R4O4' && _this.selectedBox4 == true) { _this.right = true; }
        }
        else if (_this.Shape5_Flag) {
            if (_this.shapesGroup.getChildAt(0).name == 'R1O5' && _this.selectedBox1 == true) { _this.right = true; }
            else if (_this.shapesGroup.getChildAt(0).name == 'R2O5' && _this.selectedBox2 == true) { _this.right = true; }
            else if (_this.shapesGroup.getChildAt(0).name == 'R3O5' && _this.selectedBox3 == true) { _this.right = true; }
            else if (_this.shapesGroup.getChildAt(0).name == 'R4O5' && _this.selectedBox4 == true) { _this.right = true; }
        }
        else if (_this.Shape6_Flag) {
            if ((_this.shapesGroup.getChildAt(0).name == 'R1O6' || _this.shapesGroup.getChildAt(0).name == 'R2O6' || _this.shapesGroup.getChildAt(0).name == 'R3O6' || _this.shapesGroup.getChildAt(0).name == 'R4O6') && _this.selectedBox1 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'R5O6' || _this.shapesGroup.getChildAt(0).name == 'R6O6' || _this.shapesGroup.getChildAt(0).name == 'R7O6' || _this.shapesGroup.getChildAt(0).name == 'R8O6') && _this.selectedBox2 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'R9O6' || _this.shapesGroup.getChildAt(0).name == 'R10O6' || _this.shapesGroup.getChildAt(0).name == 'R11O6' || _this.shapesGroup.getChildAt(0).name == 'R12O6') && _this.selectedBox3 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'R13O6' || _this.shapesGroup.getChildAt(0).name == 'R14O6' || _this.shapesGroup.getChildAt(0).name == 'R15O6' || _this.shapesGroup.getChildAt(0).name == 'R16O6') && _this.selectedBox4 == true) { _this.right = true; }
        }
        else if (_this.Shape7_Flag) {
            if ((_this.shapesGroup.getChildAt(0).name == 'R1O7' || _this.shapesGroup.getChildAt(0).name == 'R2O7' || _this.shapesGroup.getChildAt(0).name == 'R3O7' || _this.shapesGroup.getChildAt(0).name == 'R4O7') && _this.selectedBox1 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'R5O7' || _this.shapesGroup.getChildAt(0).name == 'R6O7' || _this.shapesGroup.getChildAt(0).name == 'R7O7' || _this.shapesGroup.getChildAt(0).name == 'R8O7') && _this.selectedBox2 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'R9O7' || _this.shapesGroup.getChildAt(0).name == 'R10O7' || _this.shapesGroup.getChildAt(0).name == 'R11O7' || _this.shapesGroup.getChildAt(0).name == 'R12O7') && _this.selectedBox3 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'R13O7' || _this.shapesGroup.getChildAt(0).name == 'R14O7' || _this.shapesGroup.getChildAt(0).name == 'R15O7' || _this.shapesGroup.getChildAt(0).name == 'R16O7') && _this.selectedBox4 == true) { _this.right = true; }
        }


        if (_this.right) {
            _this.tick.events.onInputDown.removeAll();

            _this.Box2_1.events.onInputDown.removeAll();
            _this.Box2_2.events.onInputDown.removeAll();
            _this.Box2_3.events.onInputDown.removeAll();
            _this.Box2_4.events.onInputDown.removeAll();

            _this.Box2_1.input.useHandCursor = false;
            _this.Box2_2.input.useHandCursor = false;
            _this.Box2_3.input.useHandCursor = false;
            _this.Box2_4.input.useHandCursor = false;

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
        }
        else if (_this.right === false) {
            if (_this.selectedBox1 == true) {
                var blinkTween = _this.add.tween(_this.Box2_1).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                _this.time.events.add(500, function () {
                    blinkTween.stop();
                    _this.Box2_1.tint = 0xffffff;
                }, this);

                _this.Box2_1.frame = 0;
                _this.selectedBox1 = false;
            }
            else if (_this.selectedBox2 == true) {
                var blinkTween = _this.add.tween(_this.Box2_2).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                _this.time.events.add(500, function () {
                    blinkTween.stop();
                    _this.Box2_2.tint = 0xffffff;
                }, this);

                _this.Box2_2.frame = 0;
                _this.selectedBox2 = false;
            }
            else if (_this.selectedBox3 == true) {
                var blinkTween = _this.add.tween(_this.Box2_3).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                _this.time.events.add(500, function () {
                    blinkTween.stop();
                    _this.Box2_3.tint = 0xffffff;
                }, this);

                _this.Box2_3.frame = 0;
                _this.selectedBox3 = false;
            }
            else if (_this.selectedBox4 == true) {
                var blinkTween = _this.add.tween(_this.Box2_4).to({ tint: 0xff0000 }, 250, Phaser.Easing.Linear.None, true, 0, 1, true);
                _this.time.events.add(500, function () {
                    blinkTween.stop();
                    _this.Box2_4.tint = 0xffffff;
                }, this);

                _this.Box2_4.frame = 0;
                _this.selectedBox4 = false;
            }
            _this.noofAttempts ++;
            _this.wrongSound.play();
        }

    },

    tickSecondEvaluation: function (target) {
        console.log("tick evaluation 2");
        _this.clickSound.play();

        if (_this.Shape1_Flag) {
            if ((_this.shapesGroup.getChildAt(0).name == 'W1O1' && _this.selectedBox1 == false) && _this.selectedBox2 == true && _this.selectedBox3 == true && _this.selectedBox4 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'W2O1' && _this.selectedBox2 == false) && _this.selectedBox1 == true && _this.selectedBox3 == true && _this.selectedBox4 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'W3O1' && _this.selectedBox3 == false) && _this.selectedBox1 == true && _this.selectedBox2 == true && _this.selectedBox4 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'W4O1' && _this.selectedBox4 == false) && _this.selectedBox1 == true && _this.selectedBox2 == true && _this.selectedBox3 == true) { _this.right = true; }
        }
        else if (_this.Shape2_Flag) {
            if ((_this.shapesGroup.getChildAt(0).name == 'W1O2' && _this.shapesGroup.getChildAt(3).name == 'W2O2' && _this.selectedBox1 == false && _this.selectedBox4 == false) && _this.selectedBox2 == true && _this.selectedBox3 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(1).name == 'W3O2' && _this.shapesGroup.getChildAt(3).name == 'W4O2' && _this.selectedBox2 == false && _this.selectedBox4 == false) && _this.selectedBox1 == true && _this.selectedBox3 == true) { _this.right = true; }
        }
        else if (_this.Shape3_Flag) {
            if ((_this.shapesGroup.getChildAt(0).name == 'W1O3' && _this.shapesGroup.getChildAt(2).name == 'W2O3' && _this.selectedBox1 == false && _this.selectedBox3 == false) && _this.selectedBox2 == true && _this.selectedBox4 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(1).name == 'W3O3' && _this.shapesGroup.getChildAt(2).name == 'W4O3' && _this.selectedBox2 == false && _this.selectedBox3 == false) && _this.selectedBox1 == true && _this.selectedBox4 == true) { _this.right = true; }
        }
        else if (_this.Shape4_Flag) {
            if ((_this.shapesGroup.getChildAt(0).name == 'W1O4' && _this.selectedBox1 == false) && _this.selectedBox2 == true && _this.selectedBox3 == true && _this.selectedBox4 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'W2O4' && _this.selectedBox2 == false) && _this.selectedBox1 == true && _this.selectedBox3 == true && _this.selectedBox4 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'W3O4' && _this.selectedBox3 == false) && _this.selectedBox1 == true && _this.selectedBox2 == true && _this.selectedBox4 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'W4O4' && _this.selectedBox4 == false) && _this.selectedBox1 == true && _this.selectedBox2 == true && _this.selectedBox3 == true) { _this.right = true; }
        }
        else if (_this.Shape5_Flag) {
            if ((_this.shapesGroup.getChildAt(0).name == 'W1O5' && _this.selectedBox1 == false) && _this.selectedBox2 == true && _this.selectedBox3 == true && _this.selectedBox4 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'W2O5' && _this.selectedBox2 == false) && _this.selectedBox1 == true && _this.selectedBox3 == true && _this.selectedBox4 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'W3O5' && _this.selectedBox3 == false) && _this.selectedBox1 == true && _this.selectedBox2 == true && _this.selectedBox4 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'W4O5' && _this.selectedBox4 == false) && _this.selectedBox1 == true && _this.selectedBox2 == true && _this.selectedBox3 == true) { _this.right = true; }
        }
        else if (_this.Shape6_Flag) {
            if ((_this.shapesGroup.getChildAt(0).name == 'W1O6' && _this.selectedBox1 == false) && _this.selectedBox2 == true && _this.selectedBox3 == true && _this.selectedBox4 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'W2O6' && _this.selectedBox2 == false) && _this.selectedBox1 == true && _this.selectedBox3 == true && _this.selectedBox4 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'W3O6' && _this.selectedBox3 == false) && _this.selectedBox1 == true && _this.selectedBox2 == true && _this.selectedBox4 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'W4O6' && _this.selectedBox4 == false) && _this.selectedBox1 == true && _this.selectedBox2 == true && _this.selectedBox3 == true) { _this.right = true; }
        }
        else if (_this.Shape7_Flag) {
            if ((_this.shapesGroup.getChildAt(0).name == 'W1O7' && _this.selectedBox1 == false) && _this.selectedBox2 == true && _this.selectedBox3 == true && _this.selectedBox4 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'W2O7' && _this.selectedBox2 == false) && _this.selectedBox1 == true && _this.selectedBox3 == true && _this.selectedBox4 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'W3O7' && _this.selectedBox3 == false) && _this.selectedBox1 == true && _this.selectedBox2 == true && _this.selectedBox4 == true) { _this.right = true; }
            else if ((_this.shapesGroup.getChildAt(0).name == 'W4O7' && _this.selectedBox4 == false) && _this.selectedBox1 == true && _this.selectedBox2 == true && _this.selectedBox3 == true) { _this.right = true; }
        }


        if (_this.right) {
            _this.tick.events.onInputDown.removeAll();
            _this.Box2_1.events.onInputDown.removeAll();
            _this.Box2_2.events.onInputDown.removeAll();
            _this.Box2_3.events.onInputDown.removeAll();
            _this.Box2_4.events.onInputDown.removeAll();

            _this.Box2_1.input.useHandCursor = false;
            _this.Box2_2.input.useHandCursor = false;
            _this.Box2_3.input.useHandCursor = false;
            _this.Box2_4.input.useHandCursor = false;

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
        }
        else if (_this.right === false) {

            if (_this.Shape1_Flag) {
                if (_this.shapesGroup.getChildAt(0).name == 'W1O1') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W1O1' && _this.selectedBox1 == false) && (_this.selectedBox2 == false || _this.selectedBox3 == false || _this.selectedBox4 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox1 == true) {
                        _this.handleSelectedBox(_this.Box2_1, _this.selectedBox1, _this.wrongSound);
                        _this.selectedBox1 = false;
                    }
                }
                else if (_this.shapesGroup.getChildAt(0).name == 'W2O1') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W2O1' && _this.selectedBox2 == false) && (_this.selectedBox1 == false || _this.selectedBox3 == false || _this.selectedBox4 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox2 == true) {
                        _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                        _this.selectedBox2 = false;
                    }
                }
                else if (_this.shapesGroup.getChildAt(0).name == 'W3O1') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W3O1' && _this.selectedBox3 == false) && (_this.selectedBox1 == false || _this.selectedBox2 == false || _this.selectedBox4 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox3 == true) {
                        _this.handleSelectedBox(_this.Box2_3, _this.selectedBox3, _this.wrongSound);
                        _this.selectedBox3 = false;
                    }
                }
                else if (_this.shapesGroup.getChildAt(0).name == 'W4O1') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W4O1' && _this.selectedBox4 == false) && (_this.selectedBox1 == false || _this.selectedBox2 == false || _this.selectedBox3 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox4 == true) {
                        _this.handleSelectedBox(_this.Box2_4, _this.selectedBox4, _this.wrongSound);
                        _this.selectedBox4 = false;
                    }
                }
            }
            else if (_this.Shape2_Flag) {
                if (_this.shapesGroup.getChildAt(0).name == 'W1O2') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W1O2' && _this.shapesGroup.getChildAt(3).name == 'W2O2' && _this.selectedBox1 == false && _this.selectedBox4 == false) && (_this.selectedBox2 == false || _this.selectedBox3 == false)) { _this.wrongSound.play(); }
                    else {
                        if (_this.selectedBox1 == true) {
                            _this.handleSelectedBox(_this.Box2_1, _this.selectedBox1, _this.wrongSound);
                            _this.selectedBox1 = false;
                        }
                        if (_this.selectedBox4 == true) {
                            _this.handleSelectedBox(_this.Box2_4, _this.selectedBox4, _this.wrongSound);
                            _this.selectedBox4 = false;
                        }
                    }
                }

                else if (_this.shapesGroup.getChildAt(1).name == 'W3O2') {
                    if ((_this.shapesGroup.getChildAt(1).name == 'W3O2' && _this.shapesGroup.getChildAt(3).name == 'W4O2' && _this.selectedBox2 == false && _this.selectedBox4 == false) && (_this.selectedBox1 == false || _this.selectedBox3 == false)) { _this.wrongSound.play(); }
                    else {
                        if (_this.selectedBox2 == true) {
                            _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                            _this.selectedBox2 = false;
                        }
                        if (_this.selectedBox4 == true) {
                            _this.handleSelectedBox(_this.Box2_4, _this.selectedBox4, _this.wrongSound);
                            _this.selectedBox4 = false;
                        }
                    }
                }
            }
            else if (_this.Shape3_Flag) {
                if (_this.shapesGroup.getChildAt(0).name == 'W1O3') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W1O3' && _this.shapesGroup.getChildAt(2).name == 'W2O3' && _this.selectedBox1 == false && _this.selectedBox3 == false) && (_this.selectedBox2 == false || _this.selectedBox4 == false)) { _this.wrongSound.play(); }
                    else {
                        if (_this.selectedBox1 == true) {
                            _this.handleSelectedBox(_this.Box2_1, _this.selectedBox1, _this.wrongSound);
                            _this.selectedBox1 = false;
                        }
                        if (_this.selectedBox3 == true) {
                            _this.handleSelectedBox(_this.Box2_3, _this.selectedBox3, _this.wrongSound);
                            _this.selectedBox3 = false;
                        }
                    }
                }
                else if (_this.shapesGroup.getChildAt(1).name == 'W3O3') {
                    if ((_this.shapesGroup.getChildAt(1).name == 'W3O3' && _this.shapesGroup.getChildAt(2).name == 'W4O3' && _this.selectedBox2 == false && _this.selectedBox3 == false) && (_this.selectedBox1 == false || _this.selectedBox4 == false)) { _this.wrongSound.play(); }
                    else {
                        if (_this.selectedBox2 == true) {
                            _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                            _this.selectedBox2 = false;
                        }
                        if (_this.selectedBox3 == true) {
                            _this.handleSelectedBox(_this.Box2_3, _this.selectedBox3, _this.wrongSound);
                            _this.selectedBox3 = false;
                        }
                    }
                }
            }
            else if (_this.Shape4_Flag) {
                if (_this.shapesGroup.getChildAt(0).name == 'W1O4') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W1O4' && _this.selectedBox1 == false) && (_this.selectedBox2 == false || _this.selectedBox3 == false || _this.selectedBox4 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox1 == true) {
                        _this.handleSelectedBox(_this.Box2_1, _this.selectedBox1, _this.wrongSound);
                        _this.selectedBox1 = false;
                    }
                }

                else if (_this.shapesGroup.getChildAt(0).name == 'W2O4') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W2O4' && _this.selectedBox2 == false) && (_this.selectedBox1 == false || _this.selectedBox3 == false || _this.selectedBox4 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox2 == true) {
                        _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                        _this.selectedBox2 = false;
                    }
                }
                else if (_this.shapesGroup.getChildAt(0).name == 'W3O4') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W3O4' && _this.selectedBox3 == false) && (_this.selectedBox1 == false || _this.selectedBox2 == false || _this.selectedBox4 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox3 == true) {
                        _this.handleSelectedBox(_this.Box2_3, _this.selectedBox3, _this.wrongSound);
                        _this.selectedBox3 = false;
                    }
                }
                else if (_this.shapesGroup.getChildAt(0).name == 'W4O4') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W4O4' && _this.selectedBox4 == false) && (_this.selectedBox1 == false || _this.selectedBox2 == false || _this.selectedBox3 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox4 == true) {
                        _this.handleSelectedBox(_this.Box2_4, _this.selectedBox4, _this.wrongSound);
                        _this.selectedBox4 = false;
                    }
                }
            }
            else if (_this.Shape5_Flag) {
                if (_this.shapesGroup.getChildAt(0).name == 'W1O5') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W1O5' && _this.selectedBox1 == false) && (_this.selectedBox2 == false || _this.selectedBox3 == false || _this.selectedBox4 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox1 == true) {
                        _this.handleSelectedBox(_this.Box2_1, _this.selectedBox1, _this.wrongSound);
                        _this.selectedBox1 = false;
                    }
                }

                else if (_this.shapesGroup.getChildAt(0).name == 'W2O5') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W2O5' && _this.selectedBox2 == false) && (_this.selectedBox1 == false || _this.selectedBox3 == false || _this.selectedBox4 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox2 == true) {
                        _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                        _this.selectedBox2 = false;
                    }
                }
                else if (_this.shapesGroup.getChildAt(0).name == 'W3O5') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W3O5' && _this.selectedBox3 == false) && (_this.selectedBox1 == false || _this.selectedBox2 == false || _this.selectedBox4 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox3 == true) {
                        _this.handleSelectedBox(_this.Box2_3, _this.selectedBox3, _this.wrongSound);
                        _this.selectedBox3 = false;
                    }
                }
                else if (_this.shapesGroup.getChildAt(0).name == 'W4O5') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W4O5' && _this.selectedBox4 == false) && (_this.selectedBox1 == false || _this.selectedBox2 == false || _this.selectedBox3 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox4 == true) {
                        _this.handleSelectedBox(_this.Box2_4, _this.selectedBox4, _this.wrongSound);
                        _this.selectedBox4 = false;
                    }
                }
            }
            else if (_this.Shape6_Flag) {
                if (_this.shapesGroup.getChildAt(0).name == 'W1O6') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W1O6' && _this.selectedBox1 == false) && (_this.selectedBox2 == false || _this.selectedBox3 == false || _this.selectedBox4 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox1 == true) {
                        _this.handleSelectedBox(_this.Box2_1, _this.selectedBox1, _this.wrongSound);
                        _this.selectedBox1 = false;
                    }
                }

                else if (_this.shapesGroup.getChildAt(0).name == 'W2O6') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W2O6' && _this.selectedBox2 == false) && (_this.selectedBox1 == false || _this.selectedBox3 == false || _this.selectedBox4 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox2 == true) {
                        _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                        _this.selectedBox2 = false;
                    }
                }
                else if (_this.shapesGroup.getChildAt(0).name == 'W3O6') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W3O6' && _this.selectedBox3 == false) && (_this.selectedBox1 == false || _this.selectedBox2 == false || _this.selectedBox4 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox3 == true) {
                        _this.handleSelectedBox(_this.Box2_3, _this.selectedBox3, _this.wrongSound);
                        _this.selectedBox3 = false;
                    }
                }
                else if (_this.shapesGroup.getChildAt(0).name == 'W4O6') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W4O6' && _this.selectedBox4 == false) && (_this.selectedBox1 == false || _this.selectedBox2 == false || _this.selectedBox3 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox4 == true) {
                        _this.handleSelectedBox(_this.Box2_4, _this.selectedBox4, _this.wrongSound);
                        _this.selectedBox4 = false;
                    }
                }
            }
            else if (_this.Shape7_Flag) {
                if (_this.shapesGroup.getChildAt(0).name == 'W1O7') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W1O7' && _this.selectedBox1 == false) && (_this.selectedBox2 == false || _this.selectedBox3 == false || _this.selectedBox4 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox1 == true) {
                        _this.handleSelectedBox(_this.Box2_1, _this.selectedBox1, _this.wrongSound);
                        _this.selectedBox1 = false;
                    }
                }

                else if (_this.shapesGroup.getChildAt(0).name == 'W2O7') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W2O7' && _this.selectedBox2 == false) && (_this.selectedBox1 == false || _this.selectedBox3 == false || _this.selectedBox4 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox2 == true) {
                        _this.handleSelectedBox(_this.Box2_2, _this.selectedBox2, _this.wrongSound);
                        _this.selectedBox2 = false;
                    }
                }
                else if (_this.shapesGroup.getChildAt(0).name == 'W3O7') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W3O7' && _this.selectedBox3 == false) && (_this.selectedBox1 == false || _this.selectedBox2 == false || _this.selectedBox4 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox3 == true) {
                        _this.handleSelectedBox(_this.Box2_3, _this.selectedBox3, _this.wrongSound);
                        _this.selectedBox3 = false;
                    }
                }
                else if (_this.shapesGroup.getChildAt(0).name == 'W4O7') {
                    if ((_this.shapesGroup.getChildAt(0).name == 'W4O7' && _this.selectedBox4 == false) && (_this.selectedBox1 == false || _this.selectedBox2 == false || _this.selectedBox3 == false)) { _this.wrongSound.play(); }
                    else if (_this.selectedBox4 == true) {
                        _this.handleSelectedBox(_this.Box2_4, _this.selectedBox4, _this.wrongSound);
                        _this.selectedBox4 = false;
                    }
                }
            }
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

        _this.tick.destroy();

        _this.Box1.destroy();
        _this.Box2_1.destroy();
        _this.Box2_2.destroy();
        _this.Box2_3.destroy();
        _this.Box2_4.destroy();

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