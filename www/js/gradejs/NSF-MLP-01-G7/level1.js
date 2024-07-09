Game.NSF_MLP_01_G7level1 = function () { };


Game.NSF_MLP_01_G7level1.prototype =
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

        _this.snapSound = document.createElement('audio');
        _this.snapSoundsrc = document.createElement('source');
        _this.snapSoundsrc.setAttribute("src", window.baseUrl + "sounds/snapSound.mp3");
        _this.snapSound.appendChild(_this.snapSoundsrc);

        _this.framechange = document.createElement('audio');
        _this.framechangesrc = document.createElement('source');
        _this.framechangesrc.setAttribute("src", window.baseUrl + "sounds/Frame_change_sound.mp3");
        _this.framechange.appendChild(_this.framechangesrc);

        _this.Ask_Question1 = _this.createAudio("NSF_MLP_01_G7_a1");
        _this.Ask_Question2 = _this.createAudio("NSF_MLP_01_G7_a2");
        //edited for baseurl online apk
        telInitializer.gameIdInit("NSF_MLP_01_G7", gradeSelected);// first Tele call
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
        _this.hint_flag = 0;// * hint flag zero

        // _this.AnsTimerCount = 0;
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

        _this.rightbtnFlag = 0;

        valuesCombinationsNum = []
        valuesCombinationsDenom = []

        valuesCombinationsNum2 = []
        valuesCombinationsDenom2 = []

        _this.color_flag = 0;

        _this.counterForTimer = 0;

        _this.arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

        _this.hint_flag = 0;
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
                _this.state.start('grade7NumberSystems',true,false);
            });
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
                if (_this.Question_flag == 3) {
                    _this.Ask_Question3.play();
                }

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
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/NSF-MLP-01-G7/" + _this.languageSelected + "/" + src + ".mp3");
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
        _this.MakeSideBar();
        // _this.changeQuesBox();

        if (_this.count1 == 0) {
            _this.Ask_Question1.play();
        }
        // _this.Question_flag = 1;

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

        _this.Ask_Question3.pause();
        _this.Ask_Question3 = null;


        if (_this.celebrationSound) {
            if (_this.celebrationSound.isPlaying) {
                _this.celebrationSound.stop();
                _this.celebrationSound = null;
            }
        }

    },

    Initial_randomizing: function () {
        //* store possible test cases to display the equation and shuffle it
        //* created array for storing the numerator and denominator value.
        // ●	Both terms are proper fraction 
        // ●	a/b * c/d ; where   ‘b’ and ‘d’ such that b * d <= 30
        // ○	b and d  always <=10
        // ●	Some examples :
        // ○	 ⅖ * ⅚ = 10/30 
        // ○	5/7 * 3/4 = 15/28
        // ○	⅖ 
        // ○	6/7 * 3/4= 18/28 

        //* Answer of multiply should not be more than 30/30 
        //* numerator value is in limit of 10 and denominator 10.
        //* _this.numeratorA =  //* max 9  min 1 numerator 
        //* _this.numeratorC =  //* max 9  min 1 numerator

        _this.aArr = [];
        _this.bArr = [];
        _this.cArr = [];
        _this.dArr = [];

        for (let i = 0; i < 6; i++) {

            _this.denominatorB = Math.floor(Math.random() * (9) + 2); //generate a number 2 to 10
            _this.numeratorA = Math.floor(Math.random() * (_this.denominatorB - 1) + 1);

            _this.denominatorD = Math.floor(Math.random() * (9) + 2);
            _this.numeratorC = Math.floor(Math.random() * (_this.denominatorD - 1) + 1);

            while (_this.denominatorB * _this.denominatorD > 30) {
                _this.denominatorB = Math.floor(Math.random() * (9) + 2);
                _this.numeratorA = Math.floor(Math.random() * (_this.denominatorB - 1) + 1);

                _this.denominatorD = Math.floor(Math.random() * (9) + 2);
                _this.numeratorC = Math.floor(Math.random() * (_this.denominatorD - 1) + 1);
            }

            _this.aArr.push(_this.numeratorA);
            _this.bArr.push(_this.denominatorB);
            _this.cArr.push(_this.numeratorC);
            _this.dArr.push(_this.denominatorD);
        }

        for (var i = 0; i < 6; i++) {
            valuesCombinationsNum.push(_this.aArr[i] * _this.cArr[i]);
        }
        for (var i = 0; i < 6; i++) {
            valuesCombinationsDenom.push(_this.bArr[i] * _this.dArr[i]);
        }

        console.log(_this.aArr, "_this.aArray");
        console.log(_this.bArr, "_this.bArray");
        console.log(_this.cArr, "_this.cArray");
        console.log(_this.dArr, "_this.dArray");
    },

    //it shows the fraction box. 
    showfraction2Boxes: function (addvar, y) {

        // _this.rightbtn.destroy();
        _this.twofractionboxes = true;
        _this.onebox = false;
        _this.fourNotEntered = false

        _this.AnswerBox = _this.add.image(addvar, y, 'white-box');
        _this.AnswerBox.scale.setTo(0.9)

        _this.AnswerBox.frame = 0;
        _this.q1 = false;

        _this.AnswerBox.inputEnabled = true;
        _this.AnswerBox.input.useHandCursor = true;
        _this.AnswerBox.events.onInputDown.add(function () {
            _this.AnswerBox.frame = 1;
            _this.AnswerBox1.frame = 0;
            _this.q2 = false;
            _this.clickSound.play();

            if (_this.AnswerBox.name == '') {
                _this.fourNotEntered = false
                _this.q1 = true;
                _this.q2 = false;
                _this.selectedAns2 = '';
                _this.selectedAns1 = '';
                _this.selectedAns3 = '';

            }
        });

        _this.AnswerBox1 = _this.add.image(addvar, y + 10 + 40, 'white-box');
        _this.AnswerBox1.scale.setTo(0.9);
        _this.AnswerBox1.frame = 1;
        _this.q2 = true;

        _this.AnswerBox1.inputEnabled = true;
        _this.AnswerBox1.input.useHandCursor = true;
        _this.AnswerBox1.events.onInputDown.add(function () {
            _this.AnswerBox.frame = 0;
            _this.AnswerBox1.frame = 1;
            _this.q1 = false;
            _this.clickSound.play();

            if (_this.AnswerBox1.name == '') {
                _this.fourNotEntered = false
                _this.q2 = true;
                _this.q1 = false;
                _this.selectedAns2 = '';
                _this.selectedAns1 = '';
                _this.selectedAns3 = '';

            }
        });

    },

    //this function is used for showing the side rods.
    MakeSideBar: function () {

        //edited for baseurl apk
        _this.sceneCount++;
        _this.noofAttempts = 0;
        //....

        _this.sideGray = _this.add.sprite(30, 70, 'box_3');
        colorsarr = [];
        _this.finalPart = false;
        // colors = ['orangecolor', 'bluecolor', 'browncolor', 'darkcolor', 'darkGreencolor', 'yellowcolor', 'purplecolor', 'lightGreencolor', 'redcolor', 'whitecolor']
        for (j = 0; j < 10; j++) {
            for (i = 0; i < 10 - j; i++) {
                box = _this.add.sprite(8 + i * 19, 10 + (10 - (10 - j)) * 37, 'allColor')
                box.frame = (10 - j) - 1;
                colorsarr.push(box);
                _this.sideGray.addChild(box);
            }
        }

        _this.reverse = _this.add.sprite(85, 310, 'reverse');
        _this.sideGray.addChild(_this.reverse)
        _this.showInitialScreen()
    },
    showInitialScreen: function () {

        _this.Question_flag = 1;
        if (_this.count1 == 0)
            _this.Ask_Question1.play();
        _this.cubegrp = false;
        _this.questionBox = _this.add.sprite(250, 70, 'Text box_1')
        _this.AnsBox = _this.add.sprite(250, 180, 'box_2')
        _this.AnsBox.scale.setTo(1.01, 1)

        _this.AnsBox2 = _this.add.sprite(250, 180, 'box_1');
        _this.AnsBox2.visible = false;
        _this.AnsBox2.scale.setTo(3.2, 0.5);

        _this.yellowBox = _this.add.sprite(25 - 4, 11, 'yellowTextbox')
        _this.questionBox.addChild(_this.yellowBox)
        _this.yellowBox.visible = false;

        if (_this.aArr[_this.count1] >= 10)
            _this.n1 = _this.add.text(26 - 4, 14, _this.aArr[_this.count1])
        else
            _this.n1 = _this.add.text(34 - 4, 14, _this.aArr[_this.count1])

        _this.questionBox.addChild(_this.n1)
        _this.applyingStyle(_this.n1);
        _this.hrLine(25 - 4, 47.5);
        _this.questionBox.addChild(_this.hrSign1);

        _this.yellowBox2 = _this.add.sprite(25 - 4, 51, 'yellowTextbox')
        _this.questionBox.addChild(_this.yellowBox2)
        _this.yellowBox2.visible = false;

        if (_this.bArr[_this.count1] >= 10)
            _this.d1 = _this.add.text(26 - 4, 52, _this.bArr[_this.count1])
        else
            _this.d1 = _this.add.text(34 - 4, 52, _this.bArr[_this.count1])

        _this.questionBox.addChild(_this.d1)
        _this.applyingStyle(_this.d1);

        _this.multiplyBlueSign = _this.add.text(312, 103, "X");
        _this.multiplyBlueSign.scale.setTo(1, 1);
        _this.multiplyBlueSign.fill = '#65B4C3';

        _this.yellowBox3 = _this.add.sprite(90 - 4, 11, 'yellowTextbox')
        _this.questionBox.addChild(_this.yellowBox3)
        _this.yellowBox3.visible = false;

        if (_this.cArr[_this.count1] >= 10)
            _this.n2 = _this.add.text(91 - 4, 14, _this.cArr[_this.count1])
        else
            _this.n2 = _this.add.text(99 - 4, 14, _this.cArr[_this.count1])

        _this.questionBox.addChild(_this.n2)
        _this.applyingStyle(_this.n2);
        _this.hrLine(90 - 4, 47.5);
        _this.questionBox.addChild(_this.hrSign1);

        _this.yellowBox4 = _this.add.sprite(90 - 4, 51, 'yellowTextbox')
        _this.questionBox.addChild(_this.yellowBox4)
        _this.yellowBox4.visible = true;

        if (_this.dArr[_this.count1] >= 10)
            _this.d2 = _this.add.text(91 - 4, 52, _this.dArr[_this.count1])
        else
            _this.d2 = _this.add.text(99 - 4, 52, _this.dArr[_this.count1])


        _this.questionBox.addChild(_this.d2)
        _this.applyingStyle(_this.d2);


        _this.box1Display = _this.add.sprite(260, 188, 'Text box_3');

        _this.firstFrac = true;
        if (_this.cArr[_this.count1] >= 10)
            _this.n11 = _this.add.text(6, 5, _this.cArr[_this.count1])
        else
            _this.n11 = _this.add.text(14, 5, _this.cArr[_this.count1])

        _this.n11.scale.setTo(0.8)

        _this.box1Display.addChild(_this.n11)
        _this.applyingStyle(_this.n11);

        _this.hrSign1 = _this.add.graphics();
        _this.hrSign1.lineStyle(4, 0xFF0000);
        _this.hrSign1.moveTo(8, 30);
        _this.hrSign1.lineTo(30, 30);

        _this.box1Display.addChild(_this.hrSign1);


        if (_this.dArr[_this.count1] >= 10)
            _this.d11 = _this.add.text(8, 30, _this.dArr[_this.count1])
        else
            _this.d11 = _this.add.text(14, 30, _this.dArr[_this.count1])

        _this.box1Display.addChild(_this.d11)
        _this.applyingStyle(_this.d11);
        _this.d11.scale.setTo(0.8)
        _this.d11.fill = '#FF0000';
        _this.n11.fill = '#FF0000';

        _this.rightbtn = _this.add.sprite(850, 70, 'TickBtn')
        _this.rightbtn.inputEnabled = true;
        _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked, _this)



        // Colors group
        _this.orangeGrp = _this.add.group();
        _this.blueGrp = _this.add.group();
        _this.brownGrp = _this.add.group();
        _this.darkGrp = _this.add.group();
        _this.darkGreenGrp = _this.add.group();
        _this.yellowGrp = _this.add.group();
        _this.purpleGrp = _this.add.group();
        _this.lightGreenGrp = _this.add.group();
        _this.redGrp = _this.add.group();
        _this.whiteGrp = _this.add.group();

        _this.ans1Grp = _this.add.group();// denominator b
        _this.ans2Grp = _this.add.group();//numerator a
        _this.ans4Grp = _this.add.group();//denominator d
        _this.ans3Grp = _this.add.group();//numerator c


        for (j = 0; j < 10; j++) {
            _this.makeHrBoxes(10 - j, 'abcd')
        }

        _this.eraser = _this.add.sprite(175, 380, 'eraser');
        // _this.sideGray.addChild(_this.eraser)
        _this.eraser.inputEnabled = true;
        _this.eraser.input.enableDrag(true);
        _this.eraser.events.onDragUpdate.add(_this.eraserUpdate, _this);
        _this.eraser.events.onDragStop.add(_this.eraserDrop, _this);
        _this.eraser.bringToTop();

        _this.borderBox1 = _this.add.group();
        _this.borderBox2 = _this.add.group();
        _this.borderBox3 = _this.add.group();
        _this.borderBox4 = _this.add.group();

        _this.ans3GrpDrag = _this.add.group();



    },
    //this function will make the horizontal rods based on how much need.
    makeHrBoxes: function (len, name) {
        for (i = 0; i < len; i++) {
            box = _this.add.sprite(38 + i * 19, 80 + (10 - len) * 37, 'allColor')
            box.frame = len - 1
            if (box.frame == 9)
                _this.orangeGrp.addChild(box);
            else if (box.frame == 8)
                _this.blueGrp.addChild(box);
            else if (box.frame == 7) {
                _this.brownGrp.addChild(box);
            }
            else if (box.frame == 6)
                _this.darkGrp.addChild(box);
            else if (box.frame == 5)
                _this.darkGreenGrp.addChild(box);
            else if (box.frame == 4)
                _this.yellowGrp.addChild(box);
            else if (box.frame == 3)
                _this.purpleGrp.addChild(box);
            else if (box.frame == 2)
                _this.lightGreenGrp.addChild(box);
            else if (box.frame == 1)
                _this.redGrp.addChild(box);
            else if (box.frame == 0)
                _this.whiteGrp.addChild(box);
            box.inputEnabled = true;
            box.input.enableDrag(true);
            box.events.onDragUpdate.add(_this.dragUpdate, _this);
            box.events.onDragStop.add(_this.dragStop, _this);
        }

    },


    //dragging the side bar rods.
    dragUpdate: function (target) {
        target.bringToTop();
        var frontpos = 1;
        var backpos = 1;
        var draggedCubex = target.x - 25;
        var draggedCubey = target.y;
        if (target.frame == 9) {
            grp = _this.orangeGrp
        }
        if (target.frame == 8) {
            grp = _this.blueGrp
        }
        if (target.frame == 7) {
            grp = _this.brownGrp
        }
        if (target.frame == 6) {
            grp = _this.darkGrp
        }
        if (target.frame == 5) {
            grp = _this.darkGreenGrp
        }
        if (target.frame == 4) {
            grp = _this.yellowGrp
        }
        if (target.frame == 3) {
            grp = _this.purpleGrp
        }
        if (target.frame == 2) {
            grp = _this.lightGreenGrp
        }
        if (target.frame == 1) {
            grp = _this.redGrp
        }
        if (target.frame == 0) {
            grp = _this.whiteGrp
        }
        for (let k = Number(target.name); k < target.frame + 1; k++) {
            grp.getChildAt(k).y = draggedCubey
            grp.getChildAt(k).x = draggedCubex + 19 * frontpos;
            frontpos++;
        }
        for (let k = Number(target.name) - 1; k >= 0; k--) {
            grp.getChildAt(k).y = draggedCubey;
            grp.getChildAt(k).x = draggedCubex - 19 * backpos;
            backpos++
        }

    },
    disableSidebar: function () {
        _this.blueGrp.destroy();
        _this.brownGrp.destroy();
        _this.redGrp.destroy();
        _this.whiteGrp.destroy();
        _this.darkGrp.destroy();
        _this.purpleGrp.destroy();
        _this.lightGreenGrp.destroy();
        _this.darkGreenGrp.destroy();
        _this.yellowGrp.destroy();
        _this.orangeGrp.destroy();


    },
    reCreatehrGrp: function () {
        _this.disableSidebar();
        _this.orangeGrp = _this.add.group();
        _this.blueGrp = _this.add.group();
        _this.brownGrp = _this.add.group();
        _this.darkGrp = _this.add.group();
        _this.darkGreenGrp = _this.add.group();
        _this.yellowGrp = _this.add.group();
        _this.purpleGrp = _this.add.group();
        _this.lightGreenGrp = _this.add.group();
        _this.redGrp = _this.add.group();
        _this.whiteGrp = _this.add.group();

        for (j = 0; j < 10; j++) {
            _this.makeHrBoxes(10 - j, 'abcd')
        }

    },
    //stop dragging in the side bar rods.
    dragStop: function (target) {
        console.log("dragStop")
        matchy1 = 160;
        matchy2 = 245;

        if (_this.checkOverlap(target, _this.AnsBox) && target.y >= matchy1 && target.y <= matchy2) {

            if (_this.yellowBox3.visible == true && (_this.ans3Grp.children.length + target.frame + 1) <= 30) {
                if (_this.ans3Grp.children.length == 0) {
                    x = 310;
                }
                else {
                    x = _this.ans3Grp.getChildAt(_this.ans3Grp.children.length - 1).x + 19;

                }
                for (i = 0; i < target.frame + 1; i++) {
                    box = _this.add.sprite(x + i * 19, 199, 'allColor')
                    box.frame = target.frame;
                    box.lastidx = x;
                    _this.ans3Grp.addChild(box);
                }
                _this.borderBox3.destroy();
                _this.borderBox3 = _this.add.group();
                if (_this.ans3Grp.length > 10 || _this.ans3Grp.length > (target.frame + 1)) {
                    borderboxc = 313;
                    count = 0;
                    currFrame = _this.ans3Grp.getChildAt(0).frame;

                    for (q = 0; q < _this.ans3Grp.length - 1; q++) {
                        if ((_this.ans3Grp.getChildAt(q).frame != _this.ans3Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans3Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans3Grp)) || (currFrame == count)) {
                            _this.makeRectBox(_this.ans3Grp.getChildAt(q).frame + 1, 221 - 20, borderboxc);
                            borderboxc += (19 * (_this.ans3Grp.getChildAt(q).frame + 1));
                            _this.borderBox3.addChild(_this.graphics);
                        }
                        if (_this.ans3Grp.getChildAt(q).frame != _this.ans3Grp.getChildAt(q + 1).frame || count == currFrame) {
                            currFrame = _this.ans3Grp.getChildAt(q + 1).frame;
                            count = 0;
                        }
                        else {
                            count++;
                        }
                    }
                    _this.makeRectBox(_this.ans3Grp.getChildAt(q).frame + 1, 221 - 20, borderboxc);
                    _this.borderBox3.addChild(_this.graphics);

                }

            }

            else if (_this.yellowBox4.visible == true && (_this.ans4Grp.children.length + target.frame + 1) <= 30) {
                if (_this.ans4Grp.children.length == 0) {
                    x = 310;
                }
                else {
                    x = _this.ans4Grp.getChildAt(_this.ans4Grp.children.length - 1).x + 19;
                }
                for (i = 0; i < target.frame + 1; i++) {
                    box = _this.add.sprite(x + i * 19, 219, 'allColor')
                    box.frame = target.frame;
                    box.lastidx = x;
                    _this.ans4Grp.addChild(box);
                }
                _this.borderBox4.destroy();
                _this.borderBox4 = _this.add.group();
                if (_this.ans4Grp.length > 10 || _this.ans4Grp.length > (target.frame + 1)) {
                    borderboxc = 313;
                    count = 0;
                    currFrame = _this.ans4Grp.getChildAt(0).frame;

                    for (q = 0; q < _this.ans4Grp.length - 1; q++) {
                        if ((_this.ans4Grp.getChildAt(q).frame != _this.ans4Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans4Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans4Grp)) || (count == currFrame)) {
                            _this.makeRectBox(_this.ans4Grp.getChildAt(q).frame + 1, 221, borderboxc);
                            borderboxc += (19 * (_this.ans4Grp.getChildAt(q).frame + 1));
                            _this.borderBox4.addChild(_this.graphics);
                        }
                        if (_this.ans4Grp.getChildAt(q).frame != _this.ans4Grp.getChildAt(q + 1).frame || count == currFrame) {
                            currFrame = _this.ans4Grp.getChildAt(q + 1).frame;
                            count = 0;
                        }
                        else {
                            count++;
                        }
                    }
                    _this.makeRectBox(_this.ans4Grp.getChildAt(q).frame + 1, 221, borderboxc);
                    _this.borderBox4.addChild(_this.graphics);

                }
            }
            _this.snapSound.pause();
            _this.snapSound.currentTime = 0;
            _this.snapSound.play();
        }

        _this.reCreatehrGrp();

    },
    eraserUpdate: function (target) {
        _this.world.bringToTop(_this.eraser)
        _this.eraser.scale.setTo(0.8)
    },
    eraserDrop: function (target) {
        console.log("eraserDrop");

        if (_this.finamnum == true) {

            if (_this.finalAnsGrpNum.length > _this.ans3Grp.length) {
                if (_this.checkOverlap(target, _this.finalAnsGrpNum)) {

                    x = _this.finalAnsGrpNum.length - 1;

                    if (x > 0) {
                        for (i = x; i > (x - _this.ans3Grp.length); i--) {
                            // if (_this.checkOverlap(_this.finalAnsGrpNum.getChildAt(i), target)) {
                            // target.x = 175;
                            // target.y = 380;
                            _this.finalAnsGrpNum.getChildAt(i).destroy();
                            //     _this.eraser.scale.setTo(1);

                            //     break;

                            // }
                        }

                        _this.remakeNumcubes();
                        _this.remakeNumeratorRod();
                    }
                    target.x = 175;
                    target.y = 380;
                    _this.eraser.scale.setTo(1);
                }


            }
            else {
                tobeckedbox = _this.finalAnsGrpNum;
                for (k = 0; k < tobeckedbox.children.length; k++) {
                    console.log("1.........")
                    if (_this.checkOverlap(tobeckedbox.getChildAt(k), target)) {
                        target.x = 175;
                        target.y = 380;
                        _this.deleteNumGrp(tobeckedbox.getChildAt(k).lastidx, tobeckedbox)
                        _this.eraser.scale.setTo(1);


                        break;
                    }

                };
            }

        }

        else if (_this.cubegrp != true) {
            if (_this.yellowBox2.visible == true)
                tobeckedbox = _this.ans1Grp;
            else if (_this.yellowBox.visible == true)
                tobeckedbox = _this.ans2Grp;
            else if (_this.yellowBox4.visible == true)
                tobeckedbox = _this.ans4Grp;
            else if (_this.yellowBox3.visible == true)
                tobeckedbox = _this.ans3Grp;

            for (k = 0; k < tobeckedbox.children.length; k++) {

                if (_this.checkOverlap(tobeckedbox.getChildAt(k), target)) {
                    target.x = 175;
                    target.y = 380;
                    _this.deleteGrp(tobeckedbox.getChildAt(k).lastidx, tobeckedbox)
                    _this.eraser.scale.setTo(1);
                    break;

                }
            };
        }
        else if (_this.cubegrp == true) {
            if (_this.checkOverlap(target, _this.ans3Grpcpys) || _this.checkOverlap(target, _this.ans4Grpcpys)) {
                console.log("2.........")
                if (_this.ans4Grpcpys.length > _this.ans4Grp.length) {
                    x = _this.ans4Grpcpys.length - 1;
                    y = _this.ans3Grpcpys.length - 1;
                    _this.ans4Grpcpy.destroy();
                    _this.ans3Grpcpy.destroy();
                    _this.ans1Grpcpy.destroy();
                    _this.ans2Grpcpy.destroy();

                    if (x > 0) {
                        for (i = x; i > (x - _this.ans4Grp.length); i--) {
                            _this.ans4Grpcpys.getChildAt(i).destroy()
                        }
                        for (i = y; i > (y - _this.ans3Grp.length); i--) {
                            _this.ans3Grpcpys.getChildAt(i).destroy()
                        }
                        _this.makeDraggableCubeGrp();
                    }
                }

                target.x = 175;
                target.y = 380;
                _this.eraser.scale.setTo(1);
                _this.remakeGrpBorders();

            }

            _this.world.bringToTop(_this.borderBox21);
            _this.world.bringToTop(_this.borderBox11);
            _this.world.bringToTop(_this.borderBox41);
            _this.world.bringToTop(_this.borderBox31);

        }
        target.x = 175;
        target.y = 380;
        _this.eraser.scale.setTo(1);


    },
    deleteGrp: function (idx, grp) {
        console.log("deleteGrp")
        for (t = 0; t < grp.children.length; t++) {
            element = grp.getChildAt(t)
            if (element.lastidx == idx) {
                element.destroy();
                t = -1;
            }
        };

        grp.children.forEach((element, i) => {
            minus = 310 + i * 19;
            element.x = minus;
        });
        _this.remakeCubes(grp);
    },
    deleteNumGrp: function (idx, grp) {
        console.log("deleteNumGrp");
        for (t = 0; t < grp.children.length; t++) {
            element = grp.getChildAt(t)
            if (element.lastidx == idx) {
                element.destroy();
                t = -1;
            }
        };

        grp.children.forEach((element, i) => {
            minus = 310 + i * 19;
            element.x = minus;
        });

        // _this.remakeNumcubesSecond(grp);
        _this.remakeNumeratorRodSecond();
    },
    remakeNumcubes: function (grp) {
        console.log("remakeNumcubes");
        _this.finalBorder.destroy();
        _this.finalBorder = _this.add.group();

        if (_this.finalAnsGrpNum.length > 10 || _this.finalAnsGrpNum.length > (_this.finalAnsGrpNum.getChildAt(0).frame + 1)) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.finalAnsGrpNum.getChildAt(0).frame;

            for (q = 0; q < _this.finalAnsGrpNum.length - 1; q++) {
                if ((_this.finalAnsGrpNum.getChildAt(q).frame != _this.finalAnsGrpNum.getChildAt(q + 1).frame) || ((q + 1) % (_this.finalAnsGrpNum.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.finalAnsGrpNum)) || (count == currFrame)) {
                    _this.makeRectBox(_this.finalAnsGrpNum.getChildAt(q).frame + 1, 339, borderboxc);
                    borderboxc += (19 * (_this.finalAnsGrpNum.getChildAt(q).frame + 1));
                    _this.finalBorder.addChild(_this.graphics);
                }
                if (_this.finalAnsGrpNum.getChildAt(q).frame != _this.finalAnsGrpNum.getChildAt(q + 1).frame || count == currFrame) {
                    currFrame = _this.finalAnsGrpNum.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.finalAnsGrpNum.getChildAt(q).frame + 1, 339, borderboxc);
            _this.finalBorder.addChild(_this.graphics);

        }

    },

    remakeNumcubesSecond: function (grp) {
        console.log("remakeNumcubesSecond");
        _this.finalBorder.destroy();
        // _this.finalBorder = _this.add.group();

        if (_this.finalAnsGrpNum.length == 0) {
            // borderboxc = 313;
            count = 0;
            currFrame = _this.ans3Grp.getChildAt(0).frame;

            // for (q = 0; q < _this.finalAnsGrpNum.length - 1; q++) {
            //     if ((_this.ans3Grp.getChildAt(q).frame != _this.ans3Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans3Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans3Grp)) || (count == currFrame)) {
            //         console.log("if 1.......");
            //         _this.makeRectBox(_this.ans3Grp.getChildAt(q).frame + 1, 339, borderboxc);
            //         borderboxc += (19 * (_this.ans3Grp.getChildAt(q).frame + 1));
            //         _this.finalBorder.addChild(_this.graphics);
            //     }
            //     if (_this.finalAnsGrpNum.getChildAt(q).frame != _this.finalAnsGrpNum.getChildAt(q + 1).frame || count == currFrame) {
            //         console.log("if 2.......");
            //         currFrame = _this.ans3Grp.getChildAt(q + 1).frame;
            //         count = 0;
            //     }
            //     else {
            //         console.log("else.....");
            //         count++;
            //     }
            // }
            _this.makeRectBox(_this.ans3Grp.getChildAt(q).frame + 1, 339, borderboxc);
            // _this.finalBorder.addChild(_this.graphics);

        }

    },

    remakeCubes: function (grp) {
        console.log("remakeCubes");
        _this.borderBox1.destroy();
        _this.borderBox2.destroy();
        _this.borderBox3.destroy();
        _this.borderBox4.destroy();
        _this.borderBox1 = _this.add.group();
        _this.borderBox2 = _this.add.group();
        _this.borderBox3 = _this.add.group();
        _this.borderBox4 = _this.add.group();

        if (_this.ans3Grp.length > 0 && (_this.ans3Grp.length > 10 || _this.ans3Grp.length > (_this.ans3Grp.getChildAt(0).frame + 1))) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans3Grp.getChildAt(0).frame;

            for (q = 0; q < _this.ans3Grp.length - 1; q++) {
                if ((_this.ans3Grp.getChildAt(q).frame != _this.ans3Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans3Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans3Grp)) || (currFrame == count)) {
                    _this.makeRectBox(_this.ans3Grp.getChildAt(q).frame + 1, 221 - 20, borderboxc);//322 - 20
                    borderboxc += (19 * (_this.ans3Grp.getChildAt(q).frame + 1));
                    _this.borderBox3.addChild(_this.graphics);
                }
                if (_this.ans3Grp.getChildAt(q).frame != _this.ans3Grp.getChildAt(q + 1).frame || count == currFrame) {
                    currFrame = _this.ans3Grp.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.ans3Grp.getChildAt(q).frame + 1, 221 - 20, borderboxc);//322 - 20
            _this.borderBox3.addChild(_this.graphics);

        }

        if (_this.ans4Grp.length > 0 && (_this.ans4Grp.length > 10 || _this.ans4Grp.length > (_this.ans4Grp.getChildAt(0).frame + 1))) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans4Grp.getChildAt(0).frame;

            for (q = 0; q < _this.ans4Grp.length - 1; q++) {
                if ((_this.ans4Grp.getChildAt(q).frame != _this.ans4Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans4Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans4Grp)) || (count == currFrame)) {
                    _this.makeRectBox(_this.ans4Grp.getChildAt(q).frame + 1, 322, borderboxc);
                    borderboxc += (19 * (_this.ans4Grp.getChildAt(q).frame + 1));
                    _this.borderBox4.addChild(_this.graphics);
                }
                if (_this.ans4Grp.getChildAt(q).frame != _this.ans4Grp.getChildAt(q + 1).frame || count == currFrame) {
                    currFrame = _this.ans4Grp.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.ans4Grp.getChildAt(q).frame + 1, 322, borderboxc);
            _this.borderBox4.addChild(_this.graphics);

        }


    },
    remakeGrpBorders: function () {
        console.log("remakeGrpBorders");
        _this.borderBox11.destroy();
        _this.borderBox21.destroy();
        _this.borderBox31.destroy();
        _this.borderBox41.destroy();
        _this.borderBox11 = _this.add.group();
        _this.borderBox21 = _this.add.group();
        _this.borderBox31 = _this.add.group();
        _this.borderBox41 = _this.add.group();


        if (_this.ans4Grpcpys.length > 10 || _this.ans4Grpcpys.length > (_this.ans4Grpcpys.getChildAt(0).frame + 1)) {
            borderboxc = 313;
            for (q = 0; q < _this.ans4Grpcpys.length - 1; q++) {
                if ((_this.ans4Grpcpys.getChildAt(q).frame != _this.ans4Grpcpys.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans4Grpcpys.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans4Grpcpys))) {

                    _this.makeRectBox(_this.ans4Grpcpys.getChildAt(q).frame + 1, 221, borderboxc);
                    borderboxc += (19 * (_this.ans4Grpcpys.getChildAt(q).frame + 1));
                    _this.borderBox41.addChild(_this.graphics);

                }
            }
            _this.makeRectBox(_this.ans4Grpcpys.getChildAt(q).frame + 1, 221, borderboxc);
            _this.borderBox41.addChild(_this.graphics);

        }

    },

    remakeNumeratorRod: function (target) {
        console.log("remakeNumeratorRod");

        x = 310 + _this.ans3GrpFinal.length * 19;
        for (i = 0; i < _this.ans3Grp.length; i++) {//_this.finalAnscpy - valuesCombinationsNum[_this.count1]
            console.log("123456")
            box = _this.add.sprite(x, _this.ans3Grp.getChildAt(0).y, 'allColor')
            box.frame = _this.finalAnsGrpNum.getChildAt(i).frame;
            _this.ans3GrpFinal.addChild(box);
            x = x + 19;


            box.inputEnabled = true;
            box.input.enableDrag(true);
            box.events.onDragUpdate.add(_this.dragUpdateNumRod, _this);
            box.events.onDragStop.add(_this.dragStopNumRod, _this);
            box.events.onDragStart.add(_this.dragstartNumRod, _this);
        }

        _this.remakeAns2Grp();


        // box.name = i;
    },

    remakeNumeratorRodSecond: function (target) {
        console.log("remakeNumeratorRodSecond");

        x = 310 + _this.ans3GrpFinal.length * 19;
        for (i = 0; i < _this.ans3Grp.length; i++) {//_this.finalAnscpy - valuesCombinationsNum[_this.count1]
            console.log("123456")
            box = _this.add.sprite(x, _this.ans3Grp.getChildAt(0).y, 'allColor')
            box.frame = _this.ans3GrpFinal.getChildAt(i).frame;
            _this.ans3GrpFinal.addChild(box);
            x = x + 19;

            box.inputEnabled = true;
            box.input.enableDrag(true);
            // box.events.onDragUpdate.add(_this.dragUpdateRod, _this);
            // box.events.onDragStop.add(_this.dragStopRod, _this);
            // box.events.onDragStart.add(_this.dragstartRod, _this);
            box.events.onDragUpdate.add(_this.dragUpdateNumRod, _this);
            box.events.onDragStop.add(_this.dragStopNumRod, _this);
            box.events.onDragStart.add(_this.dragstartNumRod, _this);
        }

        _this.remakeAns2Grp();


        // box.name = i;
    },

    // changing the question box
    changeQuesBox: function () {
        console.log("changeQuesBox")
        _this.questionBox.destroy();
        _this.multiplyBlueSign.destroy();
        if (_this.finalPart != true)
            _this.questionBox2 = _this.add.sprite(246, 55, 'Text box_2cpy')
        else {
            _this.questionBox2 = _this.add.sprite(248, 55, 'Text box_2');
            _this.showfraction2Boxes(430, 70);
            _this.AnswerBox.scale.setTo(1);
            _this.AnswerBox1.scale.setTo(1);
            _this.AnswerBox.y -= 6;
            _this.AnswerBox1.y -= 1;
            _this.Question_flag = 2;
            if (_this.count1 == 0)
                _this.Ask_Question2.play();

        }


        if (_this.aArr[_this.count1] >= 10)
            _this.n1 = _this.add.text(26 - 4, 14 + 14, _this.aArr[_this.count1])
        else
            _this.n1 = _this.add.text(34 - 4, 14 + 14, _this.aArr[_this.count1])

        _this.questionBox2.addChild(_this.n1)
        _this.applyingStyle(_this.n1);
        _this.hrLine(25 - 4, 47.5 + 14);
        _this.questionBox2.addChild(_this.hrSign1);


        if (_this.bArr[_this.count1] >= 10)
            _this.d1 = _this.add.text(26 - 4, 52 + 14, _this.bArr[_this.count1])
        else
            _this.d1 = _this.add.text(34 - 4, 52 + 14, _this.bArr[_this.count1])

        _this.questionBox2.addChild(_this.d1)
        _this.applyingStyle(_this.d1);


        _this.minusBlueSign2 = _this.add.text(315 - 4, 100, "x");
        _this.minusBlueSign2.scale.setTo(1, 1);
        _this.minusBlueSign2.fill = '#65B4C3';


        if (_this.cArr[_this.count1] >= 10)
            _this.n2 = _this.add.text(91 - 4, 14 + 14, _this.cArr[_this.count1])
        else
            _this.n2 = _this.add.text(99 - 4, 14 + 14, _this.cArr[_this.count1])

        _this.questionBox2.addChild(_this.n2)
        _this.applyingStyle(_this.n2);
        _this.hrLine(90 - 4, 47.5 + 14);
        _this.questionBox2.addChild(_this.hrSign1);

        if (_this.dArr[_this.count1] >= 10)
            _this.d2 = _this.add.text(91 - 4, 52 + 14, _this.dArr[_this.count1])
        else
            _this.d2 = _this.add.text(99 - 4, 52 + 14, _this.dArr[_this.count1])


        _this.questionBox2.addChild(_this.d2)
        _this.applyingStyle(_this.d2);


        _this.yelloBox5 = _this.add.sprite(385, 100, 'yellowTextbox')
        _this.blueeqsign2 = _this.add.text(394, 100, '=');
        _this.blueeqsign2.fill = '#65B4C3'

    },

    makeansCpy: function () {
        console.log("makeansCpy");
        _this.cubegrp = true;
        _this.ans4Grpcpys = _this.add.group();
        _this.ans3Grpcpys = _this.add.group();

        _this.borderBox11 = _this.add.group();
        _this.borderBox21 = _this.add.group();
        _this.borderBox31 = _this.add.group();
        _this.borderBox41 = _this.add.group();

        for (i = 0; i < _this.ans3Grp.length; i++) {
            console.log("123456")
            box = _this.add.sprite(310 + i * 19, _this.ans3Grp.getChildAt(0).y, 'allColor')
            box.frame = _this.ans3Grp.getChildAt(i).frame;
            _this.ans3Grpcpys.addChild(box);

        }

        for (i = 0; i < _this.ans4Grp.length; i++) {
            box = _this.add.sprite(310 + i * 19, _this.ans4Grp.getChildAt(0).y, 'allColor')
            box.frame = _this.ans4Grp.getChildAt(i).frame;
            _this.ans4Grpcpys.addChild(box);
        }

        if (_this.ans4Grp.length > 10 || _this.ans4Grp.length > (_this.ans4Grp.getChildAt(0).frame + 1)) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans4Grp.getChildAt(0).frame;

            for (q = 0; q < _this.ans4Grp.length - 1; q++) {
                if ((_this.ans4Grp.getChildAt(q).frame != _this.ans4Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans4Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans4Grp)) || (count == currFrame)) {
                    _this.makeRectBox(_this.ans4Grp.getChildAt(q).frame + 1, 221, borderboxc);
                    borderboxc += (19 * (_this.ans4Grp.getChildAt(q).frame + 1));
                    _this.borderBox41.addChild(_this.graphics);
                }
                if (_this.ans4Grp.getChildAt(q).frame != _this.ans4Grp.getChildAt(q + 1).frame || count == currFrame) {
                    currFrame = _this.ans4Grp.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.ans4Grp.getChildAt(q).frame + 1, 221, borderboxc);
            _this.borderBox41.addChild(_this.graphics);

        }

        _this.makeDraggableCubeGrp()

    },

    //showing hand symbol for dragging the cube
    showHandSymbol: function () {
        console.log("showHandSymbol")
        _this.draggableCpy = _this.add.group();
        _this.hand = _this.add.sprite(400, 230, 'hand');//320, 210
        _this.hand.scale.setTo(0.6);
        for (i = 0; i < _this.ans4Grpcpys.length; i++) {
            box = _this.add.sprite(_this.ans4Grpcpys.getChildAt(i).x, _this.ans4Grpcpys.getChildAt(i).y, 'allColor')
            box.frame = _this.ans4Grpcpys.getChildAt(i).frame;
            _this.draggableCpy.addChild(box);
        }

        _this.dragableGrp = _this.add.group();
        _this.dragableGrp.addChild(_this.draggableCpy);
        _this.dragableGrp.addChild(_this.hand);

        _this.tween1 = _this.add.tween(_this.dragableGrp);
        _this.tween1.to({ y: 156 }, 800, 'Linear', true, 0);
        _this.tween1.onComplete.add(() => {
            _this.time.events.add(500, () => {
                _this.dragableGrp.destroy();
                _this.enableCubesDrag();
            })
        })

    },

    validateRods: function (grp, val) {
        console.log("validateRods")
        if (val <= 10) {
            for (i = 0; i < grp.length; i++) {
                if (grp.getChildAt(i).frame != ((val) - 1))
                    return false;
            }
            return true;
        }
        else {

            if (val < 20) {
                if (grp.getChildAt(0).frame == 9) {
                    for (i = 10; i < grp.length; i++) {
                        if (grp.getChildAt(i).frame != ((val % 10) - 1)) {
                            return false
                        }
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (val == 20) {
                if (grp.getChildAt(0).frame == 9 && grp.getChildAt(10).frame == 9) {
                    return true
                }
                else return false;

            }
            else if (val == 30) {
                if (grp.getChildAt(0).frame == 9 && grp.getChildAt(10).frame == 9 && grp.getChildAt(20).frame == 9) {
                    return true
                }
                else return false;

            }
            else {
                if (grp.getChildAt(0).frame == 9) {
                    if (grp.getChildAt(10).frame == 9) {
                        for (i = 20; i < grp.length; i++) {
                            if (grp.getChildAt(i).frame != ((val % 10) - 1)) {
                                return false
                            }
                        }
                        return true;
                    }
                    else { return false }
                }
                else {
                    return false;
                }
            }
        }
    },

    validateRods2: function (grp, val) {
        console.log("validateRods2");
        frame = grp.getChildAt(0).frame;
        for (i = 0; i < grp.length; i++) {
            if (grp.getChildAt(i).frame != frame)
                return false
        }
        return grp.length == val
    },

    makeDraggableCubeGrp: function () {
        console.log("makeDraggableCubeGrp");

        _this.ans1Grpcpy = _this.add.group();
        _this.ans2Grpcpy = _this.add.group();
        _this.ans4Grpcpy = _this.add.group();
        _this.ans3Grpcpy = _this.add.group();


        for (i = 0; i < _this.ans3Grp.length; i++) {
            if (_this.ans3Grpcpys.length + _this.ans3Grp.length <= 30 && _this.ans4Grpcpys.length + _this.ans4Grp.length <= 30) {
                p = _this.ans3Grpcpys.getChildAt(_this.ans3Grpcpys.children.length - _this.ans3Grp.length).x + i * 19;
                y = _this.ans3Grpcpys.getChildAt(0).y;
                box = _this.add.sprite(p, y, 'allColor')
                box.frame = _this.ans3Grp.getChildAt(i).frame;
                _this.ans3Grpcpy.addChild(box);
                box.inputEnabled = true;
                box.input.enableDrag(true);
                box.events.onDragUpdate.add(_this.dragUpdategrp, _this);
                box.events.onDragStop.add(_this.dragStopgrp, _this);
            }
        }
        for (i = 0; i < _this.ans4Grp.length; i++) {
            if (_this.ans3Grpcpys.length + _this.ans3Grp.length <= 30 && _this.ans4Grpcpys.length + _this.ans4Grp.length <= 30) {
                p = _this.ans4Grpcpys.getChildAt(_this.ans4Grpcpys.children.length - _this.ans4Grp.length).x + i * 19;
                y = _this.ans4Grpcpys.getChildAt(0).y;
                box = _this.add.sprite(p, y, 'allColor')
                box.frame = _this.ans4Grp.getChildAt(i).frame;
                _this.ans4Grpcpy.addChild(box);
                box.inputEnabled = true;
                box.input.enableDrag(true);
                box.events.onDragUpdate.add(_this.dragUpdategrp, _this);
                box.events.onDragStop.add(_this.dragStopgrp, _this);
            }
        }

        _this.world.bringToTop(_this.borderBox21);
        _this.world.bringToTop(_this.borderBox11);
        _this.world.bringToTop(_this.borderBox41);
        _this.world.bringToTop(_this.borderBox31);
    },
    dragUpdategrp: function (target) {
        console.log("dragUpdategrp");
        target.bringToTop();
        var frontpos = 1;
        var backpos = 1;

        var draggedCubex = target.x - 25;//target.x - 25
        var draggedCubey = target.y;

        if (_this.ans3Grpcpy.children.includes(target)) {
            grp = _this.ans3Grpcpy;
            grp2 = _this.ans4Grpcpy;
            grp1f = _this.ans3Grp.length;
            grp2f = _this.ans4Grp.length;
        }
        else if (_this.ans4Grpcpy.children.includes(target)) {
            grp = _this.ans4Grpcpy;
            grp2 = _this.ans3Grpcpy;
            grp1f = _this.ans4Grp.length;
            grp2f = _this.ans3Grp.length;
        }
        for (let k = Number(target.name); k < grp1f; k++) {

            grp.getChildAt(k).y = draggedCubey
            grp.getChildAt(k).x = draggedCubex + 20 * frontpos;
            frontpos++;

        }
        for (let k = Number(target.name) - 1; k >= 0; k--) {

            grp.getChildAt(k).y = draggedCubey;
            grp.getChildAt(k).x = draggedCubex - 20 * backpos;
            backpos++

        }
        var draggedCubex = target.x;
        var draggedCubey = target.y;
        var backpos = 1;
        var frontpos = 1;

        for (let k = Number(target.name); k < grp2f; k++) {

            if (grp2 == _this.ans3Grpcpy) {
                grp2.getChildAt(k).y = draggedCubey - 20;
            }
            else
                grp2.getChildAt(k).y = draggedCubey + 20;
            grp2.getChildAt(k).x = draggedCubex + 20 * frontpos - (grp.children.length * 20);
            frontpos++;

        }

        if (grp.length > 20 && grp.getChildAt(0).frame == 9) {
            if (grp.getChildAt(19).frame != 9) {
                framee = grp.getChildAt(9).frame;
                grp.getChildAt(19).frame = 9;
                grp.getChildAt(grp.length - 1).frame = framee
            }
        }
        else if (grp.length > 10 && grp.getChildAt(0).frame == 9) {
            if (grp.getChildAt(9).frame != 9) {
                framee = grp.getChildAt(9).frame;
                grp.getChildAt(9).frame = 9;
                grp.getChildAt(grp.length - 1).frame = framee
            }
        }


    },
    dragStopgrp: function (target) {
        console.log("dragStopgrp");
        if ((_this.ans3Grpcpy.children.includes(target) || _this.ans4Grpcpy.children.includes(target))) {
            for (i = 0; i < _this.ans4Grp.length; i++) {
                y = _this.ans4Grpcpys.getChildAt(0).y;
                box = _this.add.sprite(_this.ans4Grpcpys.getChildAt(_this.ans4Grpcpys.children.length - 1).x + 19, y, 'allColor')
                box.frame = _this.ans4Grp.getChildAt(i).frame;
                _this.ans4Grpcpys.addChild(box);

            }
            for (i = 0; i < _this.ans3Grp.length; i++) {
                y = _this.ans3Grpcpys.getChildAt(0).y;
                box = _this.add.sprite(_this.ans4Grpcpys.getChildAt(_this.ans4Grpcpys.children.length - _this.ans4Grp.length - 1 + i).x + 19, y, 'allColor')
                box.frame = _this.ans3Grp.getChildAt(i).frame;
                _this.ans3Grpcpys.addChild(box);

            }
            _this.borderBox31.destroy();
            _this.borderBox31 = _this.add.group();
            if (_this.ans4Grpcpys.length > 10 || _this.ans4Grpcpys.length > (target.frame + 1)) {
                borderboxc = 313;
                for (q = 0; q < _this.ans4Grpcpys.length - 1; q++) {
                    if ((_this.ans4Grpcpys.getChildAt(q).frame != _this.ans4Grpcpys.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans4Grpcpys.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans3Grpcpys))) {
                        _this.makeRectBox(_this.ans4Grpcpys.getChildAt(q).frame + 1, 221, borderboxc);
                        borderboxc += (19 * (_this.ans4Grpcpys.getChildAt(q).frame + 1));
                        _this.borderBox31.addChild(_this.graphics);

                    }
                }
                _this.makeRectBox(_this.ans4Grpcpys.getChildAt(q).frame + 1, 221, borderboxc);
                _this.borderBox31.addChild(_this.graphics);

            }

            _this.snapSound.pause();
            _this.snapSound.currentTime = 0;
            _this.snapSound.play();
        }
        _this.ans1Grpcpy.destroy();
        _this.ans2Grpcpy.destroy();
        _this.ans3Grpcpy.destroy();
        _this.ans4Grpcpy.destroy();
        _this.makeDraggableCubeGrp();
        _this.world.bringToTop(_this.borderBox21);
        _this.world.bringToTop(_this.borderBox11);
        _this.world.bringToTop(_this.borderBox41);
        _this.world.bringToTop(_this.borderBox31);

    },

    rightbtnClicked: function () {
        console.log("rightbtnClicked")
        _this.userselected = 0;
        _this.clickSound.play();
        _this.rightbtn.inputEnabled = false;
        _this.rightbtn.input.useHandCursor = false;
        _this.rightbtn_is_Clicked = true;

        if (_this.yellowBox4.visible == true) {
            _this.rightbtn.frame = 1;
            if (_this.ans4Grp.children.length == _this.dArr[_this.count1] && _this.validateRods(_this.ans4Grp, _this.dArr[_this.count1])) {

                _this.counterCelebrationSound.pause();
                _this.counterCelebrationSound.currentTime = 0;
                _this.counterCelebrationSound.play()
                _this.yellowBox4.visible = false;
                _this.yellowBox3.visible = true;
                _this.ans4Grp.children.forEach(element => {
                    element.inputEnabled = false
                });

                _this.rightbtn.inputEnabled = true;

                _this.time.events.add(500, () => {
                    _this.rightbtn.frame = 0;
                })

            }
            else {
                _this.wrongans.play();
                _this.rightbtn.frame = 0;
                _this.ans4Grp.destroy();
                _this.borderBox4.destroy();
                _this.ans4Grp = _this.add.group();
                _this.rightbtn.inputEnabled = true;
            }
        }
        else if (_this.yellowBox3.visible == true) {
            _this.rightbtn.frame = 1;
            if ((_this.ans3Grp.children.length == _this.cArr[_this.count1]) || _this.ans3Grp.children.length == valuesCombinationsNum[_this.count1] && _this.validateRods(_this.ans3Grp, _this.cArr[_this.count1])) {//&& _this.validateRods(_this.ans3Grp, _this.cArr[_this.count1])

                _this.counterCelebrationSound.pause();
                _this.counterCelebrationSound.currentTime = 0;
                _this.counterCelebrationSound.play()
                _this.yellowBox3.visible = false;
                _this.yellowBox2.visible = true;
                _this.firstFrac = false;
                _this.disableSidebar();
                _this.makeansCpy();
                _this.Question_flag = 3;
                if (_this.count1 == 0)
                  // _this.Ask_Question3.play();
                _this.ans3Grp.children.forEach(element => {
                    element.inputEnabled = false
                });

                _this.rightbtn.inputEnabled = true;

                _this.time.events.add(500, () => {
                    _this.rightbtn.frame = 0;
                })

            }
            else {
                _this.wrongans.play();
                _this.rightbtn.frame = 0;
                _this.borderBox3.destroy();

                _this.ans3Grp.destroy();
                _this.ans3Grp = _this.add.group();

                _this.rightbtn.inputEnabled = true;
            }
        }

        else if (_this.yellowBox2.visible == true) {
            _this.rightbtn.frame = 1;
            if (_this.ans4Grpcpys.children.length == valuesCombinationsDenom[_this.count1]) {
                _this.counterCelebrationSound.pause();
                _this.counterCelebrationSound.currentTime = 0;
                _this.counterCelebrationSound.play();
                _this.ans3Grpcpy.destroy();
                _this.ans4Grpcpy.destroy();
                _this.rightbtn.destroy();

                _this.time.events.add(500, () => {
                    _this.yellowBox2.visible = false;
                    _this.framechange.play()
                    _this.time.events.add(500, () => {
                        _this.disableSidebar();
                        _this.sideGray.alpha = 0.65;
                        // _this.eraser.alpha = 0.65;
                        _this.changeQuesBox();
                        _this.reArrangeScreen();
                        if (_this.count1 == 0)
                            _this.time.events.add(500, _this.showHandSymbol)
                        else
                            _this.time.events.add(500, () => {
                                _this.enableCubesDrag();
                            })
                    })
                })

            }
            else {
                _this.wrongans.play();
                _this.rightbtn.inputEnabled = true;
                _this.rightbtn.frame = 0;
                _this.ans3Grpcpys.destroy();
                _this.ans4Grpcpys.destroy();
                _this.ans3Grpcpy.destroy();
                _this.ans4Grpcpy.destroy();
                _this.borderBox31.destroy();
                _this.borderBox41.destroy();
                _this.makeansCpy();
            }
        }

        else if (_this.finalPart == true) {

            if (_this.AnswerBox.name == valuesCombinationsNum[_this.count1] && _this.AnswerBox1.name == valuesCombinationsDenom[_this.count1]) {
                _this.part3 = false;
                _this.finalPart = false;
                _this.correctAns();

            }
            else {
                //edited for baseurl apk
                _this.noofAttempts++;

                _this.wrongAnsClicked()
                _this.rightbtn.inputEnabled = true;
            }
        }

    },

    rightButtonValidate: function () {
        if (_this.finalAnsGrpDenom.length == valuesCombinationsDenom[_this.count1] && _this.finalAnsGrpNum.length == valuesCombinationsNum[_this.count1]) {
            console.log("finalgrp...........")
            _this.ans3GrpFinal.children.forEach(element => {
                element.inputEnabled = false
            });

            _this.rightButton.destroy();
            _this.questionBox2.destroy();
            _this.yelloBox5.destroy();
            _this.multiplyBlueSign.destroy();
            _this.minusBlueSign2.destroy();
            _this.blueeqsign2.destroy();
            _this.addNumberPad();
            _this.counterCelebrationSound.pause();
            _this.counterCelebrationSound.currentTime = 0;
            _this.counterCelebrationSound.play()
            _this.finalNumgrp = true;
            _this.finalPart = true;
            _this.finalnumgr2 = _this.add.group()
            _this.finalgrp = false;
            _this.reCreatehrGrp();
            // _this.eraser.alpha = 1;
            _this.eraser.alpha = 0.65;
            _this.eraser.inputEnabled = false;
            // _this.sideGray.alpha = 1;
            // _this.sideGray.frame = 1;

            _this.sideGray.alpha = 0.65;
            _this.disableSidebar();
            _this.rightbtn.inputEnabled = true;
            _this.changeQuesBox();


        }
        else {
            _this.wrongans.play();
            _this.rightButton.inputEnabled = true;
        }
    },


    reArrangeScreen: function () {
        console.log("reArrangeScreen");
        _this.AnsBox2.visible = false;
        _this.AnsBox.scale.setTo(1.01, 1);
        z = _this.ans3Grpcpys.length;
        t = _this.ans4Grpcpys.length;

        _this.ans3Grpcpys.destroy();
        _this.ans4Grpcpys.destroy();


        _this.ans4Grpcpys1 = _this.add.group();
        _this.ans3Grpcpys1 = _this.add.group();

        _this.ans4Grpcpys = _this.add.group();
        _this.ans3Grpcpys = _this.add.group();
        _this.ans3GrpFinal = _this.add.group();

        _this.ans1Grpcpy.destroy();
        _this.ans2Grpcpy.destroy();
        _this.ans3Grpcpy.destroy();
        _this.ans4Grpcpy.destroy();

        _this.borderBox11.destroy();
        _this.borderBox21.destroy();
        _this.borderBox31.destroy();
        _this.borderBox41.destroy();

        _this.borderBox1.destroy();
        _this.borderBox2.destroy();
        _this.borderBox3.destroy();
        _this.borderBox4.destroy();

        _this.ans4Grp.visible = false;
        _this.ans2Grp.visible = false;
        _this.ans3Grp.visible = false;
        _this.ans1Grp.visible = false;


        _this.AnsBox2.visible = true;
        for (i = 0; i < z; i++) {
            //here changing the rod color.
            box = _this.add.sprite(310 + i * 19, 199, 'allColor')
            box.frame = 10;
            _this.ans3Grpcpys1.addChild(box);
        }
        for (i = 0; i < t; i++) {
            box = _this.add.sprite(310 + i * 19, 219, 'allColor')
            box.frame = 10;
            _this.ans4Grpcpys1.addChild(box);
        }

        _this.ans3Grpcpys1.visible = false;
        _this.ans4Grpcpys1.visible = false;

        _this.makeupperRodsGGrp(x, y, z, t);

    },

    makeupperRodsGGrp: function (x, y, z, t) {
        console.log("makeupperRodsGGrp");
        for (i = 0; i < z; i++) {
            console.log("for11");
            _this.x = 310 + i * 19;
            _this.y = 199;
            box = _this.add.sprite(_this.x, _this.y, 'allColor')
            box.frame = _this.ans3Grp.getChildAt(i % _this.ans3Grp.length).frame;

            _this.ans3GrpFinal.addChild(box);
            console.log("for1122222");
            _this.finalx = _this.x;
            _this.finaly = _this.y;
        }

        for (i = 0; i < t; i++) {
            box = _this.add.sprite(310 + i * 19, 219, 'allColor')
            if (_this.dArr[_this.count1] > 10) {
                if (i < t - Math.floor(t % 10))
                    box.frame = 9;
                else
                    box.frame = _this.ans4Grp.getChildAt(_this.ans4Grp.length - 1).frame;
            }
            else
                box.frame = _this.ans4Grp.getChildAt(i % _this.ans4Grp.length).frame;
            _this.ans4Grpcpys.addChild(box);
        }

        _this.borderBox11 = _this.add.group();
        _this.borderBox21 = _this.add.group();
        _this.borderBox31 = _this.add.group();
        _this.borderBox41 = _this.add.group();



        if (_this.ans3GrpFinal.length > 10 || _this.ans3GrpFinal.length > (_this.ans3GrpFinal.getChildAt(0).frame + 1)) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans3GrpFinal.getChildAt(0).frame;
            for (q = 0; q < _this.ans3GrpFinal.length - 1; q++) {
                if ((_this.ans3GrpFinal.getChildAt(q).frame != _this.ans3GrpFinal.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans3GrpFinal.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans3GrpFinal)) || (count == currFrame)) {
                    _this.makeRectBox(_this.ans3GrpFinal.getChildAt(q).frame + 1, 221 - 20, borderboxc);
                    borderboxc += (19 * (_this.ans3GrpFinal.getChildAt(q).frame + 1));
                    _this.borderBox31.addChild(_this.graphics);

                }
                if (_this.ans3GrpFinal.getChildAt(q).frame != _this.ans3GrpFinal.getChildAt(q + 1).frame || count == currFrame) {
                    currFrame = _this.ans3GrpFinal.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.ans3GrpFinal.getChildAt(q).frame + 1, 221 - 20, borderboxc);
            _this.borderBox31.addChild(_this.graphics);

        }

        if (_this.ans4Grpcpys.length > 10 || _this.ans4Grpcpys.length > (_this.ans4Grpcpys.getChildAt(0).frame + 1)) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans4Grpcpys.getChildAt(0).frame;
            for (q = 0; q < _this.ans4Grpcpys.length - 1; q++) {
                if ((_this.ans4Grpcpys.getChildAt(q).frame != _this.ans4Grpcpys.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans4Grpcpys.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans4Grpcpys)) || (count == currFrame)) {
                    _this.makeRectBox(_this.ans4Grpcpys.getChildAt(q).frame + 1, 221, borderboxc);
                    borderboxc += (19 * (_this.ans4Grpcpys.getChildAt(q).frame + 1));
                    _this.borderBox41.addChild(_this.graphics);

                }
                if (_this.ans4Grpcpys.getChildAt(q).frame != _this.ans4Grpcpys.getChildAt(q + 1).frame || count == currFrame) {
                    currFrame = _this.ans4Grpcpys.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.ans4Grpcpys.getChildAt(q).frame + 1, 221, borderboxc);
            _this.borderBox41.addChild(_this.graphics);

        }

    },

    //we can use this for dragging the cubes
    enableCubesDrag: function () {
        console.log("enableCubesDrag")
        // _this.reArrangeScreen();
        _this.finalAnsGrpDenom = _this.add.group();
        _this.finalAnsGrpNum = _this.add.group();
        _this.finalgrp = true;
        _this.finamnum = true;

        _this.ans4Grpcpys.children.forEach(box => {
            box.inputEnabled = true;
            box.input.enableDrag(true);
            box.events.onDragUpdate.add(_this.dragUpdateRod, _this);
            box.events.onDragStop.add(_this.dragStopRod, _this);
            box.events.onDragStart.add(_this.dragstartRod, _this);

        });
        _this.finalBorder = _this.add.group();
    },
    dragstartRod: function (target) {
        console.log("dragstartRod")
        if (_this.ans3GrpFinal.children.includes(target)) {
            _this.ans3Grpcpys1.visible = true
            _this.borderBox31.destroy();
        }
        else if (_this.ans4Grpcpys.children.includes(target)) {
            _this.ans4Grpcpys1.visible = true
            _this.borderBox41.destroy();
        }
    },
    //after dragging it shows the gray color cube
    dragUpdateRod: function (target) {
        console.log("dragUpdateRod")
        target.bringToTop();
        var frontpos = 1;
        var backpos = 1;
        var draggedCubex = target.x;
        var draggedCubey = target.y;
        var Movenumerator = false;
        var Movedenominator = false;

        if (_this.ans3GrpFinal.children.includes(target)) {
            Movenumerator = true;
            grp = _this.ans3GrpFinal;

        }
        else if (_this.ans4Grpcpys.children.includes(target)) {
            Movedenominator = true;
            grp = _this.ans4Grpcpys;

        }

        if (Movedenominator == true) {
            for (let k = Number(target.name); k < grp.length; k++) {
                //console.log("framee1")
                grp.getChildAt(k).y = draggedCubey
                grp.getChildAt(k).x = draggedCubex + 19 * frontpos;
                frontpos++;

            }
        }

        if (Movenumerator == true) {
            for (let k = grp.length - _this.ans3Grp.length; k < grp.length; k++) {
                console.log("numerator is drag");
                grp.getChildAt(k).y = draggedCubey
                grp.getChildAt(k).x = draggedCubex + 19 * frontpos;
                frontpos++;

            }
        }

    },
    //stoping the dragging rod
    dragStopRod: function (target) {
        console.log("dragStopRod");

        if (_this.ans4Grpcpys.children.includes(target)) {
            x = _this.ans4Grpcpys1.length;
            for (i = 0; i < x; i++) {
                box = _this.add.sprite(310 + i * 19, 415 - 60, 'allColor')
                box.frame = _this.ans4Grpcpys.getChildAt(i).frame;;
                _this.finalAnsGrpDenom.addChild(box);
            }

            if (_this.ans4Grpcpys.children.includes(target)) {
                _this.ans4Grpcpys.destroy();
            }


            borderboxc = 313;
            count = 0;
            _this.finalBorderd = _this.add.group();
            if (_this.finalAnsGrpDenom.length > 10 || _this.finalAnsGrpDenom.length > (_this.finalAnsGrpDenom.getChildAt(0).frame + 1)) {

                currFrame = _this.finalAnsGrpDenom.getChildAt(0).frame;
                for (q = 0; q < _this.finalAnsGrpDenom.length - 1; q++) {
                    if ((_this.finalAnsGrpDenom.getChildAt(q).frame != _this.finalAnsGrpDenom.getChildAt(q + 1).frame) || ((q + 1) % (_this.finalAnsGrpDenom.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.finalAnsGrpDenom)) || (count == currFrame)) {
                        _this.makeRectBox(_this.finalAnsGrpDenom.getChildAt(q).frame + 1, 359, borderboxc);
                        borderboxc += (19 * (_this.finalAnsGrpDenom.getChildAt(q).frame + 1));
                        _this.finalBorderd.addChild(_this.graphics);
                    }
                    if (_this.finalAnsGrpDenom.getChildAt(q).frame != _this.finalAnsGrpDenom.getChildAt(q + 1).frame || count == currFrame) {
                        currFrame = _this.finalAnsGrpDenom.getChildAt(q + 1).frame;
                        count = 0;
                    }
                    else {
                        count++;
                    }
                }
                _this.makeRectBox(_this.finalAnsGrpDenom.getChildAt(q).frame + 1, 359, borderboxc);
                _this.finalBorderd.addChild(_this.graphics);

            }
            _this.world.bringToTop(_this.finalBorderd);

            _this.snapSound.pause();
            _this.snapSound.currentTime = 0;
            _this.snapSound.play();

        }
        else {
            if (_this.finalAnsGrpNum.length > 0)
                x = _this.finalAnsGrpNum.getChildAt(_this.finalAnsGrpNum.length - 1).x + 19;
            else
                x = 310;

            if (_this.ans3GrpFinal.children.includes(target)) {
                console.log("ans3Grp..............");

                var i = 0;
                while (i < _this.ans3Grp.length) {
                    console.log("inside while..............");
                    box = _this.add.sprite(x + i * 19, 395 - 60, 'allColor')
                    box.frame = _this.ans3GrpFinal.getChildAt(i).frame;
                    _this.finalAnsGrpNum.addChild(box);
                    i++;
                    _this.finalAnscpy = _this.finalAnsGrpNum.length;

                }
                //* _this.ans3GrpFinal.length = 9//8//7, k = 6//7//8
                var rodLength = _this.ans3GrpFinal.length;
                for (let k = rodLength - _this.ans3Grp.length; k < rodLength; k++) {
                    _this.ans3GrpFinal.getChildAt(_this.ans3GrpFinal.length - 1).destroy();// 8//7
                }

                if (_this.ans3GrpFinal.length > 0)
                    _this.remakeAns2Grp();

            }

            _this.numeratorBorders();

            _this.snapSound.pause();
            _this.snapSound.currentTime = 0;
            _this.snapSound.play();


        }
        if (_this.finalAnsGrpDenom.length == valuesCombinationsDenom[_this.count1] && _this.ans4Grpcpys.length == 0) {//&& _this.ans4Grpcpys.length == 0
            console.log("dragStopRod....");
            if (_this.rightbtnFlag == 0) {
                _this.rightButton = _this.add.sprite(850, 70, 'TickBtn')
                _this.rightButton.inputEnabled = true;
                _this.rightButton.events.onInputDown.add(_this.rightButtonValidate, _this);
                _this.rightbtnFlag++;
            }

            if (_this.finalAnsGrpNum.length != valuesCombinationsNum[_this.count1]) {
                console.log("dragStopRod/////");
                _this.ans3GrpFinal.children.forEach((box, i) => {
                    box.inputEnabled = true;
                    box.input.enableDrag(true);
                    // box.events.onDragUpdate.add(_this.dragUpdateRod, _this);
                    // box.events.onDragStop.add(_this.dragStopRod, _this);
                    // box.events.onDragStart.add(_this.dragstartRod, _this);
                    box.events.onDragUpdate.add(_this.dragUpdateNumRod, _this);
                    box.events.onDragStop.add(_this.dragStopNumRod, _this);
                    box.events.onDragStart.add(_this.dragstartNumRod, _this);
                    box.name = i;

                });

            }


        }


    },

    dragstartNumRod: function (target) {
        console.log("dragstartNumRod");
        _this.ans3Grpcpys1.visible = true
    },
    dragUpdateNumRod: function (target) {
        console.log("dragUpdateNumRod");
        // target.bringToTop();
        var frontpos = 1;
        var backpos = 0;
        var draggedCubex = target.x;
        var draggedCubey = target.y;
        grp = _this.ans3GrpFinal;


        k = Math.floor(Number(target.name) / (grp.getChildAt(0).frame + 1)) * (grp.getChildAt(0).frame + 1);
        console.log("k = ", k)
        k2 = target.name;
        for (let i = target.name; i >= k; i--) {

            grp.getChildAt(i).y = draggedCubey
            grp.getChildAt(i).x = draggedCubex - 19 * backpos;
            backpos++;
            grp.getChildAt(i).visible = true;

        }


        for (let i = target.name + 1; i < grp.getChildAt(0).frame + k + 1; i++) {

            grp.getChildAt(i).y = draggedCubey
            grp.getChildAt(i).x = draggedCubex + 19 * frontpos;
            frontpos++;
            grp.getChildAt(i).visible = true;

        }

        m = 0;

    },

    dragStopNumRod: function (target) {
        console.log("dragStopNumRod");
        if (_this.finalAnsGrpNum.length > 0)
            x = _this.finalAnsGrpNum.getChildAt(_this.finalAnsGrpNum.length - 1).x + 19;
        else
            x = 310;

        if (_this.ans3GrpFinal.children.includes(target)) {
            console.log("ans3Grp..............");

            var i = 0;
            while (i < _this.ans3Grp.length) {
                console.log("inside while..............");
                box = _this.add.sprite(x + i * 19, 395 - 60, 'allColor')
                box.frame = _this.ans3GrpFinal.getChildAt(i).frame;
                _this.finalAnsGrpNum.addChild(box);
                i++;
                _this.finalAnscpy = _this.finalAnsGrpNum.length;

            }
            //* _this.ans3GrpFinal.length = 9//8//7, k = 6//7//8
            var rodLength = _this.ans3GrpFinal.length;
            for (let k = rodLength - _this.ans3Grp.length; k < rodLength; k++) {
                _this.ans3GrpFinal.getChildAt(_this.ans3GrpFinal.length - 1).destroy();// 8//7
            }

            if (_this.ans3GrpFinal.length > 0)
                _this.remakeAns2Grp();

        }

        _this.numeratorBorders();

        _this.snapSound.pause();
        _this.snapSound.currentTime = 0;
        _this.snapSound.play();

        if (_this.finalAnsGrpDenom.length == valuesCombinationsDenom[_this.count1] && _this.ans4Grpcpys.length == 0) {//&& _this.ans4Grpcpys.length == 0
            console.log("dragStopRod....");
            if (_this.rightbtnFlag == 0) {
                _this.rightButton = _this.add.sprite(850, 70, 'TickBtn')
                _this.rightButton.inputEnabled = true;
                _this.rightButton.events.onInputDown.add(_this.rightButtonValidate, _this);
                _this.rightbtnFlag++;
            }

            if (_this.finalAnsGrpNum.length != valuesCombinationsNum[_this.count1]) {
                console.log("dragStopRod/////");
                _this.ans3GrpFinal.children.forEach((box, i) => {
                    box.inputEnabled = true;
                    box.input.enableDrag(true);
                    // box.events.onDragUpdate.add(_this.dragUpdateRod, _this);
                    // box.events.onDragStop.add(_this.dragStopRod, _this);
                    // box.events.onDragStart.add(_this.dragstartRod, _this);
                    box.events.onDragUpdate.add(_this.dragUpdateNumRod, _this);
                    box.events.onDragStop.add(_this.dragStopNumRod, _this);
                    box.events.onDragStart.add(_this.dragstartNumRod, _this);
                    box.name = i;

                });

            }


        }

    },

    numeratorBorders: function () {
        console.log("numeratorBorders");
        count = 0;
        currFrame = _this.finalAnsGrpNum.getChildAt(0).frame;
        _this.finalBorder.destroy();
        _this.finalBorder = _this.add.group();
        if (_this.finalAnsGrpNum.length > 10 || _this.finalAnsGrpNum.length > (_this.finalAnsGrpNum.getChildAt(0).frame + 1)) {
            borderboxc = 313;
            for (q = 0; q < _this.finalAnsGrpNum.length - 1; q++) {
                if ((_this.finalAnsGrpNum.getChildAt(q).frame != _this.finalAnsGrpNum.getChildAt(q + 1).frame) || ((q + 1) % (_this.finalAnsGrpNum.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.finalAnsGrpNum)) || (count == currFrame)) {
                    _this.makeRectBox(_this.finalAnsGrpNum.getChildAt(q).frame + 1, 359 - 20, borderboxc);
                    borderboxc += (19 * (_this.finalAnsGrpNum.getChildAt(q).frame + 1));
                    _this.finalBorder.addChild(_this.graphics);
                }
                if (_this.finalAnsGrpNum.getChildAt(q).frame != _this.finalAnsGrpNum.getChildAt(q + 1).frame || count == currFrame) {
                    currFrame = _this.finalAnsGrpNum.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.finalAnsGrpNum.getChildAt(q).frame + 1, 359 - 20, borderboxc);
            _this.finalBorder.addChild(_this.graphics);

        }
        _this.world.bringToTop(_this.finalBorder);
    },

    remakeAns2Grp: function () {
        console.log("remakeAns2Grp");
        i = 0;
        ansframe = _this.ans3GrpFinal.getChildAt(0).frame + 1;
        if (_this.ans3GrpFinal.children.length > 0) {
            for (i = 0; i < _this.ans3GrpFinal.length; i++) {
                _this.ans3GrpFinal.getChildAt(i).x = 19 * i + 310;
                _this.ans3GrpFinal.getChildAt(i).y = 199;
                _this.ans3GrpFinal.getChildAt(i).name = i;
                _this.ans3GrpFinal.getChildAt(i).inputEnabled = true;
            }
            _this.borderBox31.destroy();
            _this.borderBox31 = _this.add.group();

            if (_this.ans3GrpFinal.length > 0 && _this.ans3GrpFinal.length > 10 || _this.ans3GrpFinal.length > (ansframe)) {
                borderboxc = 313;
                for (q = 0; q < _this.ans3GrpFinal.length - 1; q++) {
                    if ((_this.ans3GrpFinal.getChildAt(q).frame != _this.ans3GrpFinal.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans3GrpFinal.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans3GrpFinal))) {
                        _this.makeRectBox(_this.ans3GrpFinal.getChildAt(q).frame + 1, 221 - 20, borderboxc);
                        borderboxc += (19 * (_this.ans3GrpFinal.getChildAt(q).frame + 1));
                        _this.borderBox31.addChild(_this.graphics);

                    }
                }
                _this.makeRectBox(_this.ans3GrpFinal.getChildAt(q).frame + 1, 221 - 20, borderboxc);
                _this.borderBox31.addChild(_this.graphics);

            }
        }
    },

    checkAllSameBoxes: function (grp) {
        console.log("checkAllSameBoxes")
        for (m = 0; m < grp.length - 1; m++) {
            if (grp.getChildAt(m).frame != grp.getChildAt(m + 1).frame) {
                return false;
            }
        }
        return true;
    },
    makeRectBox: function (x, y, z) {
        console.log("makeRectBox")
        _this.graphics = _this.add.graphics();
        _this.graphics.lineStyle(3, 0x000000,);
        // 18.5*x 221 default
        _this.graphics.drawRect(z, y, 19 * x, 20);
    },
    hrLine: function (x, y) {
        console.log("hrLine")
        _this.hrSign1 = _this.add.graphics();
        _this.hrSign1.lineStyle(4, 0x65B4C3);
        _this.hrSign1.moveTo(x - 1, y);
        _this.hrSign1.lineTo(x + 35, y);

    },

    wrongAnsClicked: function () {
        console.log("wrongAnsClicked")
        _this.wrongans.play();
        _this.AnswerBox.removeChild(_this.enterTxt);
        _this.AnswerBox.frame = 0;
        _this.q2 = true;
        _this.q1 = false;
        _this.AnswerBox1.removeChild(_this.enterTxt1);
        _this.AnswerBox1.frame = 1;
        _this.disableInputs();
        _this.removeboth = false;

    },
    //* Change this function to show small number pad as given in GDD. (no signs)
    addNumberPad: function () {
        _this.Choice = 1;
        _this.objGroup = _this.add.group();
        _this.numGroup = _this.add.group();

        var bottomnumpadbg = _this.numGroup.create(0, 515, 'numpadbg');
        bottomnumpadbg.scale.setTo(1, 1);

        bottomnumpadbg.name = "numpadbg";

        _this.x = 70;
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

        _this.wrongbtn = _this.numGroup.create(_this.x + 10, 552, 'Numberpad');
        _this.wrongbtn.frame = 10;
        _this.wrongbtn.anchor.setTo(0.5);
        _this.wrongbtn.scale.setTo(0.8, 0.8);
        _this.wrongbtn.name = "wrongbtn";
        _this.wrongbtn.inputEnabled = true;
        _this.wrongbtn.input.useHandCursor = true;
        _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked, _this);

        _this.rightbtn = _this.numGroup.create(_this.x + 80, 552, 'Numberpad');
        _this.rightbtn.frame = 11;
        _this.rightbtn.anchor.setTo(0.5);
        _this.rightbtn.scale.setTo(0.8, 0.8);
        _this.rightbtn.name = "rightbtn";
        _this.rightbtn.inputEnabled = true;
        _this.rightbtn.input.useHandCursor = true;
        _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked, _this);

        _this.enterTxt = _this.add.text(-100, 8, "");
        _this.enterTxt.anchor.setTo(0.5);
        _this.enterTxt.align = 'center';
        _this.enterTxt.font = "Akzidenz-Grotesk BQ";
        _this.enterTxt.fontSize = "30px";
        _this.enterTxt.fontWeight = 'normal';
        _this.enterTxt.fill = '#65B4C3';

        _this.numpadTween = _this.add.tween(_this.numGroup);
        // _this.numGroup.visible = true;
        //_this.AnswerBox.visible=true;
        //tween in the number pad after a second.
        _this.tweenNumPad();
    },

    wrongbtnClicked: function (target) {
        console.log("wrongbtnClicked")
        _this.clickSound.play();
        _this.fourNotEntered = false;

        if (_this.AnswerBox.frame == 1) {
            _this.AnswerBox.removeChild(_this.enterTxt);
            _this.q1 = true;
            _this.AnswerBox.name = "";
            _this.enterTxt = ""


        }
        else {
            _this.AnswerBox1.removeChild(_this.enterTxt1);
            _this.q2 = true;
            _this.AnswerBox1.name = "";
            _this.enterTxt1 = ""

        }

        _this.selectedAns1 = '';
        _this.selectedAns2 = '';
        _this.selectedAns3 = '';

    },
    disableInputs: function () {
        console.log("disableInputs")
        _this.selectedAns1 = '';
        _this.selectedAns2 = '';
        _this.selectedAns3 = ''
        _this.AnswerBox.name = '';
        _this.AnswerBox1.name = '';
        _this.enterTxt = '';
        _this.enterTxt1 = '';
        _this.fourNotEntered = false;

    },
    numClicked: function (target) {
        console.log("numClicked")
        _this.clickSound.play();
        var_selectedAns1 = " "
        var_selectedAns2 = " "
        var_selectedAns3 = " "
        if (target.name == 10) {
            target.name = '0'
            _this.signNotselected = true;
        }

        if (_this.selectedAns1 === '') {
            _this.selectedAns1 = target.name;
            var_selectedAns1 = _this.selectedAns1;

        }
        else if (_this.selectedAns2 === '') {

            _this.selectedAns2 = target.name;
            var_selectedAns1 = _this.selectedAns1;
            var_selectedAns2 = _this.selectedAns2;


        }
        if (target.name == '0')
            target.name = 10;

        if (_this.fourNotEntered == false) {

            if (_this.q1 == true) {
                _this.enterTxt.visible = false;
                _this.AnswerBox.removeChild(_this.enterTxt);
                if ((var_selectedAns2 === " "))

                    _this.enterTxt = _this.add.text(19, 8, "" + var_selectedAns1 + var_selectedAns2, { fontSize: '20px' });

                else if ((var_selectedAns3 === " ")) {
                    _this.enterTxt = _this.add.text(14, 8, "" + var_selectedAns1 + var_selectedAns2, { fontSize: '20px' });
                    _this.q1 = false;
                    _this.fourNotEntered = true
                }

                _this.enterTxt.scale.setTo(1, 1.4)

                _this.applyingStyle(_this.enterTxt);
                _this.AnswerBox.addChild(_this.enterTxt);
                _this.AnswerBox.name = Number('' + var_selectedAns1 + var_selectedAns2);
            }

            else if (_this.q2 == true) {
                _this.AnswerBox1.removeChild(_this.enterTxt1);
                if ((var_selectedAns2 === " "))

                    _this.enterTxt1 = _this.add.text(19, 8, "" + var_selectedAns1 + var_selectedAns2, { fontSize: '20px' });
                else if ((var_selectedAns3 === " ")) {
                    _this.enterTxt1 = _this.add.text(14, 8, "" + var_selectedAns1 + var_selectedAns2, { fontSize: '20px' });
                    _this.q2 = false;
                    _this.fourNotEntered = true
                }


                _this.enterTxt1.scale.setTo(1, 1.4)

                _this.applyingStyle(_this.enterTxt1);

                _this.AnswerBox1.addChild(_this.enterTxt1);
                _this.AnswerBox1.name = Number('' + var_selectedAns1 + var_selectedAns2);
            }
        }

    },
    tweenNumPad: function () {
        console.log("tweenNumPad")
        _this.numGroup.visible = true;
        _this.numpadTween.to({ x: 0, y: -43 }, 1000, 'Linear', true, 0);

    },
    ClearAll: function () {
        console.log("ClearAll")
        _this.disableInputs()
        _this.minusBlueSign2.destroy();
        _this.blueeqsign2.destroy();
        _this.questionBox2.destroy();
        _this.yelloBox5.destroy();
        _this.ans3Grpcpys1.destroy();
        _this.ans4Grpcpys1.destroy();
        _this.AnswerBox.destroy();
        _this.AnswerBox1.destroy();
        _this.AnsBox2.destroy();
        _this.finalAnsGrpDenom.destroy();
        _this.finalAnsGrpNum.destroy();
        _this.AnsBox.destroy();
        _this.sideGray.destroy();
        _this.box1Display.destroy();
        _this.numGroup.destroy();
        _this.yelloBox5.destroy();
        _this.questionBox.destroy();
        _this.eraser.destroy();
        _this.finalBorder.destroy();
        _this.ans3GrpFinal.destroy();
        _this.finalBorderd.destroy();
        _this.borderBox1.destroy();
        _this.borderBox2.destroy();
        _this.borderBox3.destroy();
        _this.borderBox31.destroy();
        _this.rightButton.destroy();
        _this.borderBox4.destroy();
        // _this.borderBox32.destroy();
        _this.rightbtnFlag = 0;
        _this.finamnum = false;

    },
    checkOverlap: function (spriteA, spriteB) {
        console.log("checkOverlap")
        _this.boundsA = spriteA.getBounds();
        _this.boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(_this.boundsA, _this.boundsB);
    },
    applyingStyle: function (target) {
        console.log("applyingStyle")
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.visible = true;
    },
    correctAns: function () {
        console.log("correctAns")
        if (_this.count1 < 5) {

            _this.celebrationSound.play();

            //edited for baseurl apk
            _this.noofAttempts++;
            telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);
            //..............

            console.log(_this.noofAttempts, "_this.noofAttempts.................");
            console.log(_this.AnsTimerCount, "_this.AnsTimerCount.................");
            console.log(_this.sceneCount, "_this.sceneCount.................");
            console.log(_this.questionid, "_this.questionid.................");

            _this.starActions(_this.count1);
            _this.time.events.add(2000, _this.ClearAll);
            _this.time.events.add(3000, _this.MakeSideBar);

        }
        else {
            _this.celebrationSound.play();

            //edited for baseurl apk
            _this.noofAttempts++;
            telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);
            //..............

            console.log(_this.noofAttempts, "_this.noofAttempts.................");
            console.log(_this.AnsTimerCount, "_this.AnsTimerCount.................");
            console.log(_this.sceneCount, "_this.sceneCount.................");
            console.log(_this.questionid, "_this.questionid.................");

            _this.starActions(_this.count1);
            _this.time.events.add(2000, _this.ClearAll);
            _this.time.events.add(2500, () => {
                _this.state.start('score', true, false,gameID,_this.microConcepts);
            })
        }
    },
    starActions: function (target) {
        //edited for baseurl apk
        _this.AnsTimerCount = 0;
        _this.microConcepts = "Number SystemsG7";
        
        console.log("starActions")
        starAnim = _this.starsGroup.getChildAt(_this.count1);
        starAnim.smoothed = false;
        anim = starAnim.animations.add('star');
        _this.count1++;
        anim.play();
    },


    shutdown: function () {
        //_this.stopVoice();
        //RI.gotoEndPage();
        //telInitializer.tele_end();
    },

    q1S: function () {
        console.log("inside q1S.....")
        _this.demoAudio1.play();
    },

    dA1: function () {
        console.log("inside dA1.....")
        _this.demoAudio2.play();
    },

    dA2: function () {
        console.log("inside dA2.....")
        _this.demoAudio3.play();
    },

    dA3: function () {
        _this.demoVideo_1.playbackRate = 1;
        _this.demoAudio4Timer = setTimeout(function ()    //* demoAudio4Timer js timer to play demoAudio4 after 7 seconds.
        {
            console.log("inside dA3.....")
            _this.demoVideo_1.playbackRate = 0;     //* pausing the video after 7sec
            clearTimeout(_this.demoAudio4Timer);         //* clear the time once its used.
            _this.demoAudio4.play();
        }, 7000);
    },

    dA4: function () {
        //* clear the time once its used.
        console.log("inside dA4.....")
        _this.demoVideo_1.playbackRate = 1;
        _this.demoAudio5Timer = setTimeout(function ()    //* demoAudio5Timer js timer to play demoAudio5 after 6 seconds.
        {
            console.log("with delayyyyy");
            clearTimeout(_this.demoAudio5Timer);         //* clear the time once its used.
            _this.demoAudio5.play();
        }, 6000);
        _this.demoAudio6Timer = setTimeout(function ()    //* demoAudio6Timer js timer to play puase  after 8 seconds.
        {
            console.log("14 sec ////////");
            clearTimeout(_this.demoAudio6Timer);         //* clear the time once its used.
            _this.demoVideo_1.playbackRate = 0;
        }, 8100);
    },

    dA5: function () {
        console.log("inside dA5.....");
        _this.demoAudio6.play();
    },

    dA6: function () {
        if (_this.demoVideo_1.playbackRate == 0) _this.demoVideo_1.playbackRate = 1;
        _this.q2Timer = setTimeout(function ()    //* q2Timer js timer to play q2Sound after 2 seconds.
        {
            console.log("inside dA6.....")
            clearTimeout(_this.q2Timer);
            _this.q2Sound.play();
        }, 2000);
    },

    DemoVideo: function () {
        // DEMO AUDIOS
        //* In case of whole numbers , multiplication will grow up , for example 2 multiply by  3 , it means 2 - three times, 
        //* while in case of fraction, multiplication will grow down , for example ⅕ multiply by  ⅓  , it means ⅕ th of ⅓ rd .
        _this.demoAudio1 = document.createElement('audio');
        _this.demoAudio1src = document.createElement('source');
        _this.demoAudio1src.setAttribute("src", window.baseUrl + "questionSounds/NSF-MLP-01-G7/" + _this.languageSelected + "/NSF_MLP_01_G7_d1.mp3");
        _this.demoAudio1.appendChild(_this.demoAudio1src);

        //* Multiply   1/4  * 5/3 
        _this.demoAudio2 = document.createElement('audio');
        _this.demoAudio2src = document.createElement('source');
        _this.demoAudio2src.setAttribute("src",window.baseUrl + "questionSounds/NSF-MLP-01-G7/" + _this.languageSelected + "/NSF_MLP_01_G7_d2.mp3");
        _this.demoAudio2.appendChild(_this.demoAudio2src);

        //*  It means, to  find  1/4th  of 5/
        _this.demoAudio3 = document.createElement('audio');
        _this.demoAudio3src = document.createElement('source');
        _this.demoAudio3src.setAttribute("src",window.baseUrl + "questionSounds/NSF-MLP-01-G7/" + _this.languageSelected + "/NSF_MLP_01_G7_d3.mp3");
        _this.demoAudio3.appendChild(_this.demoAudio3src);

        //* Make whole from 5/3  such that we can get 1/4 from that whole.here we need to take 5/3 - four  times
        _this.demoAudio4 = document.createElement('audio');
        _this.demoAudio4src = document.createElement('source');
        _this.demoAudio4src.setAttribute("src",window.baseUrl + "questionSounds/NSF-MLP-01-G7/" + _this.languageSelected + "/NSF_MLP_01_G7_d4.mp3");
        _this.demoAudio4.appendChild(_this.demoAudio4src);

        //*  Drag whole to the workplace area
        _this.demoAudio5 = document.createElement('audio');
        _this.demoAudio5src = document.createElement('source');
        _this.demoAudio5src.setAttribute("src",window.baseUrl + "questionSounds/NSF-MLP-01-G7/" + _this.languageSelected + "/NSF_MLP_01_G7_d5.mp3");
        _this.demoAudio5.appendChild(_this.demoAudio5src);

        //*  drag  1/4th of 5/3
        _this.demoAudio6 = document.createElement('audio');
        _this.demoAudio6src = document.createElement('source');
        _this.demoAudio6src.setAttribute("src",window.baseUrl + "questionSounds/NSF-MLP-01-G7/" + _this.languageSelected + "/NSF_MLP_01_G7_d6.mp3");
        _this.demoAudio6.appendChild(_this.demoAudio6src);

        // QUESTION AUDIOS
        //* Multiply the fractions
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src",window.baseUrl + "questionSounds/NSF-MLP-01-G7/" +
            _this.languageSelected + "/NSF_MLP_01_G7_a1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        //* Enter the answer
        _this.q2Sound = document.createElement('audio');
        _this.q2Soundsrc = document.createElement('source');
        _this.q2Soundsrc.setAttribute("src",window.baseUrl + "questionSounds/NSF-MLP-01-G7/" +
            _this.languageSelected + "/NSF_MLP_01_G7_a2.mp3");
        _this.q2Sound.appendChild(_this.q2Soundsrc);

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
        if (_this.demoAudio4Timer) clearTimeout(_this.demoAudio4Timer);
        if (_this.demoAudio5Timer) clearTimeout(_this.demoAudio5Timer);
        if (_this.demoAudio6Timer) clearTimeout(_this.demoAudio6Timer);

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
        if (_this.demoAudio3) {
            //console.log("removing the q3");
            _this.demoAudio3.pause();
            _this.demoAudio3 = null;
            _this.demoAudio3src = null;
        }

        if (_this.demoAudio4) {
            //console.log("removing the q3");
            _this.demoAudio4.pause();
            _this.demoAudio4 = null;
            _this.demoAudio4src = null;
        }

        if (_this.demoAudio5) {
            //console.log("removing the q3");
            _this.demoAudio5.pause();
            _this.demoAudio5 = null;
            _this.demoAudio5src = null;
        }
        if (_this.demoAudio6) {
            //console.log("removing the q3");
            _this.demoAudio6.pause();
            _this.demoAudio6 = null;
            _this.demoAudio6src = null;
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

        _this.skip.events.onInputDown.removeAll();
        _this.skip.destroy();                //* skip button destroyed
    },

    showDemoVideo: function () {
        //* Demo vedio 1 is added here
        //* make pause = true in the begining of the vedio
        _this.demoVideo_1 = _this.add.video('ML1_1');
        _this.demoVideo_1.play(false);
        _this.demoVideo_1.changeSource(window.baseUrl + "assets/demoVideos/NSF_MLP_01_G7.mp4");
        _this.video_playing = 1;
        _this.videoWorld_1 = _this.demoVideo_1.addToWorld();

        _this.demoVideo_1.playbackRate = 0;
        _this.q1Sound.play();
        //* Here the audios are added one after the other
        _this.q1Sound.addEventListener('ended', _this.q1S);
        _this.demoAudio1.addEventListener('ended', _this.dA1);
        _this.demoAudio2.addEventListener('ended', _this.dA2);
        _this.demoAudio3.addEventListener('ended', _this.dA3);
        _this.demoAudio4.addEventListener('ended', _this.dA4);
        _this.demoAudio5.addEventListener('ended', _this.dA5);
        _this.demoAudio6.addEventListener('ended', _this.dA6);

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