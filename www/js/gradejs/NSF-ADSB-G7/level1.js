Game.NSF_ADSB_G7level1 = function () { };


Game.NSF_ADSB_G7level1.prototype =
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


        _this.Ask_Question1 = _this.createAudio("NSF_ADSB_G7_a1");
        _this.Ask_Question2 = _this.createAudio("NSF_ADSB_G7_a2");
        _this.Ask_Question3 = _this.createAudio("NSF_ADSB_G7_a3");

        //edited for baseurl apk
        telInitializer.gameIdInit("NSF_ADSB_G7", gradeSelected);// first Tele call
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


        valuesCombinationsNum = []
        valuesCombinationsDenom = []

        valuesCombinationsNum2 = []
        valuesCombinationsDenom2 = []

        _this.color_flag = 0;

        _this.counterForTimer = 0;

        _this.arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

        //_this.hint_flag = 0;
        _this.speakerbtnClicked = false;
        _this.rightbtn_Clicked = false;

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
                _this.state.start('grade7NumberSystems', true, false);
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
                if (_this.Question_flag == 2) {
                    _this.Ask_Question3.play();
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
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/NSF-ADSB-G7/" + _this.languageSelected + "/" + src + ".mp3");
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

        // if (_this.count1 == 3) {
        //     console.log("3 more")
        //     _this.Ask_Question2.play();
        // }

        console.log("inside get question.....");


        //* hintbtn will be true when the game is playing
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
        //* In our game we have 3 addition and 3 substraction. first we are generating values for addition. 
        //* for that we give the limit as 3.
        //* and in another for loop it will store the 3 values for substraction.
        //* Answer of Addition should not be more than 30/29 
        //* numerator value is in limit of 30 and denominator 29.
        //* _this.numeratorA =  //* max 29  min 2 numerator 
        // _this.numeratorC =  //* max 29  min 2 numerator

        _this.aArr = [];
        _this.bArr = [];
        _this.cArr = [];

        for (let i = 0; i < 3; i++) {
            // while(_this.aArr.length <3){

            _this.numeratorA = Math.floor(Math.random() * (25) + 3);  //generate 3 to 27
            _this.numeratorC = Math.floor(Math.random() * (28 - _this.numeratorA) + 3); //27 to 3

            // if ((_this.numeratorA + _this.numeratorC) <= 30) {
            //* q1 = 1/3 + 2/3. aArr[0] = 1  cArr[0] = 2 bArr[0] = 3
            //* q2 = 1/5 + 2/5. aArr[1] = 1  cArr[1] = 2 bArr[1] = 5
            //* q3 = 1/5 + 3/5  aArr[2] = 1  cArr[2] = 3 bArr[2] = 5
            //* q4 = 1/3 + 2/3 --should not repeat like this.   aArr[3] = 1  cArr[3] = 2 bArr[3] = 3
            //* q5 = 2/3 + 1/3 --should not repeat like this.   aArr[4] = 2  cArr[4] = 1 bArr[4] = 3

            if (_this.numeratorA <= _this.numeratorC) {

                _this.denominatorB = Math.floor(Math.random() * (_this.numeratorA - 2) + 2);
                //console.log(_this.denominatorB, 'a less');                        
            }
            else {
                _this.denominatorB = Math.floor(Math.random() * (_this.numeratorC - 2) + 2);
                //console.log(_this.denominatorB, 'c less');

            }

            //* if numeratorA or numeratorC is divisible by denominatorB. Then we have to generate a new denominatorB. 
            //* 12/6 3/6


            while ((_this.numeratorA % _this.denominatorB == 0) ||
                (_this.numeratorC % _this.denominatorB == 0)) {
                console.log("inside while add");
                _this.numeratorA = Math.floor(Math.random() * (25) + 3);  //generate 3 to 27
                _this.numeratorC = Math.floor(Math.random() * (28 - _this.numeratorA) + 3); //27 to 3

                if (_this.numeratorA <= _this.numeratorC) {

                    _this.denominatorB = Math.floor(Math.random() * (_this.numeratorA - 2) + 2);
                }
                else {
                    _this.denominatorB = Math.floor(Math.random() * (_this.numeratorC - 2) + 2);
                }
            }

            _this.aArr.push(_this.numeratorA);
            _this.cArr.push(_this.numeratorC);
            _this.bArr.push(_this.denominatorB);

        }


        for (var i = 0; i < _this.aArr.length; i++) {
            valuesCombinationsNum.push(_this.aArr[i] + _this.cArr[i]);
            //console.log(valuesCombinationsNum,"sum")
        }

        for (var i = 0; i < _this.bArr.length; i++) {
            valuesCombinationsDenom.push(_this.bArr[i] + _this.bArr[i]);
            //console.log(valuesCombinationsDenom,"sum")
        }

        //* check whether the result of a+b is<= 30, a and c then generate b accordingly. 
        //* by comparing b with a and c u will finalise b.
        // _this.denominatorB =  //* max a min 1
        // _this.denominatorB =  //* max c min 1
        //* store a in some array also b and c.
        // _this.numeratorA =  //* max 29  min 2 numerator 
        // _this.numeratorC =  //* max 29  min 2 numerator

        for (i = 3; i < 6; i++) {
            // while(_this.aArr.length <3){

            _this.numeratorA = Math.floor(Math.random() * (30 - 3) + 4);
            //console.log(_this.numeratorA);
            _this.numeratorC = Math.floor(Math.random() * (_this.numeratorA - 2) + 3);
            //console.log(_this.numeratorC);
            if (_this.numeratorA == _this.numeratorC) {
                console.log("if both equal")
                _this.numeratorC = _this.numeratorA - 1;
            }

            _this.denominatorB = Math.floor(Math.random() * (_this.numeratorC - 2) + 2);
            //console.log(_this.denominatorB, 'c less');

            while ((_this.numeratorA % _this.denominatorB == 0) ||
                (_this.numeratorC % _this.denominatorB == 0)) {
                _this.numeratorA = Math.floor(Math.random() * (30 - 3) + 4);
                console.log("inside while sub");
                _this.numeratorC = Math.floor(Math.random() * (_this.numeratorA - 2) + 3);
                //console.log(_this.numeratorC);
                if (_this.numeratorA == _this.numeratorC) {
                    console.log("if both equal")
                    _this.numeratorC = _this.numeratorA - 1;
                }

                _this.denominatorB = Math.floor(Math.random() * (_this.numeratorC - 2) + 2);

            }

            _this.aArr.push(_this.numeratorA);
            _this.cArr.push(_this.numeratorC);
            _this.bArr.push(_this.denominatorB);


        }
        console.log(_this.aArr, "_this.aArray");
        console.log(_this.cArr, "_this.cArray");
        console.log(_this.bArr, "_this.bArray");

        for (var i = 3; i < _this.aArr.length; i++) {
            valuesCombinationsNum.push(_this.aArr[i] - _this.cArr[i]);
            //console.log(valuesCombinationsNum,"substraction")
        }

        for (var i = 3; i < _this.bArr.length; i++) {
            valuesCombinationsDenom.push(_this.bArr[i] + _this.bArr[i]);
            //console.log(valuesCombinationsDenom,"sum")
        }

        // valuesCombinationsNum.push(sum);
        // valuesCombinationsDenom.push(sum2);

        console.log(valuesCombinationsNum, "valuesCombinationsNum.....")
        console.log(valuesCombinationsDenom, "valuesCombinationsDenom....")


    },

    //it shows the fraction box. 
    showfraction2Boxes: function (addvar, y) {
        console.log("showfraction2Boxes");
        _this.Question_flag = 1;
        if (_this.count1 == 0 || _this.count1 == 3) {
            _this.Ask_Question2.play();
        }
        _this.twofractionboxes = true;
        _this.onebox = false;
        _this.fourNotEntered = false;

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


        _this.divideSign = _this.add.graphics();
        _this.divideSign.lineStyle(4, 0x65B4C3);
        _this.divideSign.moveTo(addvar + 5, y + 5 + 43);
        _this.divideSign.lineTo(addvar + 39, y + 5 + 43);

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
        // _this.AnsTimerCount = 0;
        _this.noofAttempts = 0;
        //....

        console.log("MakeSideBar")
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
        console.log("showInitialScreen")

        _this.cPlus = [];
        _this.dPlus = [];
        // _this.Question_flag = 0;
        if (_this.count1 == 0) {
            _this.Ask_Question1.play();
            _this.Question_flag = 0;
        }
        // _this.Question_flag = 0;


        if (_this.count1 == 3) {
            console.log("3 more")
            _this.Question_flag = 2;
            _this.Ask_Question3.play();
        }
        _this.cubegrp = false;
        _this.questionBox = _this.add.sprite(250, 70, 'Text box_1')
        _this.AnsBox = _this.add.sprite(250, 180, 'box_2')
        _this.AnsBox.scale.setTo(1.01, 1.25)

        // _this.AnsBox2 = _this.add.sprite(250, 180, 'box_1')
        // _this.AnsBox2.visible = false

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
        if (_this.bArr[_this.count1] >= 10)
            _this.d1 = _this.add.text(26 - 4, 52, _this.bArr[_this.count1])
        else
            _this.d1 = _this.add.text(34 - 4, 52, _this.bArr[_this.count1])

        _this.questionBox.addChild(_this.d1)
        _this.applyingStyle(_this.d1);

        //if(_this.count<3)
        if (_this.count1 < 3) {
            //console.log("plus")
            _this.plusSignBlue(315 - 4, 115);
            _this.pSign11 = _this.pSign1;
            _this.pSign21 = _this.pSign2;
        }

        //else minus
        else {
            //console.log("minus");
            _this.minusBlueSign = _this.add.text(315 - 4, 100, "−");
            _this.minusBlueSign.scale.setTo(1, 1);
            _this.minusBlueSign.fill = '#65B4C3';

            // _this.minusSignBlue(315 - 4,100);
            // _this.mSign11 = _this.minusBlueSign1;
        }

        _this.cPlus.push(_this.pSign11);
        _this.dPlus.push(_this.pSign21);

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
        _this.yellowBox4.visible = false;
        if (_this.bArr[_this.count1] >= 10)
            _this.d2 = _this.add.text(91 - 4, 52, _this.bArr[_this.count1])
        else
            _this.d2 = _this.add.text(99 - 4, 52, _this.bArr[_this.count1])


        _this.questionBox.addChild(_this.d2)
        _this.applyingStyle(_this.d2);


        _this.box1Display = _this.add.sprite(260, 188, 'Text box_3');

        _this.firstFrac = true;
        if (_this.aArr[_this.count1] >= 10)
            _this.n11 = _this.add.text(6, 5, _this.aArr[_this.count1])
        else
            _this.n11 = _this.add.text(14, 5, _this.aArr[_this.count1])

        _this.n11.scale.setTo(0.8)

        _this.box1Display.addChild(_this.n11)
        _this.applyingStyle(_this.n11);

        _this.hrSign1 = _this.add.graphics();
        _this.hrSign1.lineStyle(4, 0xFF0000);
        _this.hrSign1.moveTo(8, 30);
        _this.hrSign1.lineTo(30, 30);

        _this.box1Display.addChild(_this.hrSign1);


        if (_this.bArr[_this.count1] >= 10)
            _this.d11 = _this.add.text(8, 30, _this.bArr[_this.count1])
        else
            _this.d11 = _this.add.text(14, 30, _this.bArr[_this.count1])

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

        _this.ans1Grp = _this.add.group();// denominator
        _this.ans2Grp = _this.add.group();//numerator a
        _this.ans4Grp = _this.add.group();//denominator
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

    },
    //this function will make the horizontal rods based on how much need.
    makeHrBoxes: function (len, name) {
        console.log("makeHrBoxes")
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
        _this.grayRod();
    },

    grayRod: function () {
        console.log("grayRod//////////")

        x = _this.ans1Grp.children.length;
        y = _this.ans2Grp.length;
        z = _this.ans3Grp.length;
        t = _this.ans4Grp.length;

        _this.ans1Grpcpys1 = _this.add.group();
        _this.ans2Grpcpys1 = _this.add.group();
        _this.ans4Grpcpys1 = _this.add.group();
        _this.ans3Grpcpys1 = _this.add.group();
        // //console.log("gray box..........")

        for (i = 0; i < x; i++) {
            box = _this.add.sprite(310 + i * 19, 219, 'allColor')
            box.frame = 10;
            _this.ans1Grpcpys1.addChild(box);
        }

        for (i = 0; i < y; i++) {
            box = _this.add.sprite(310 + i * 19, 199, 'allColor')
            box.frame = 10;

            _this.ans2Grpcpys1.addChild(box);
        }
        for (i = 0; i < z; i++) {
            box = _this.add.sprite(310 + i * 19, 300, 'allColor')
            box.frame = 10
            _this.ans3Grpcpys1.addChild(box);
        }
        for (i = 0; i < t; i++) {
            box = _this.add.sprite(310 + i * 19, 320, 'allColor')
            box.frame = 10;
            _this.ans4Grpcpys1.addChild(box);
        }

        _this.ans1Grpcpys1.visible = false;
        _this.ans2Grpcpys1.visible = false;
        _this.ans3Grpcpys1.visible = false;
        _this.ans4Grpcpys1.visible = false;
    },
    //dragging the side bar rods.
    dragUpdate: function (target) {
        console.log("dragUpdate")
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
        console.log("disableSidebar")
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
        console.log("reCreatehrGrp")
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
        if (_this.firstFrac == true) {
            matchy1 = 160;
            matchy2 = 245;
        }
        else {
            matchy1 = 260
            matchy2 = 350;
        }
        if (_this.checkOverlap(target, _this.AnsBox) && target.y >= matchy1 && target.y <= matchy2) {

            if (_this.yellowBox2.visible == true && (_this.ans1Grp.children.length + target.frame + 1) <= 30) {
                if (_this.ans1Grp.children.length == 0) {
                    x = 310;
                }
                else {
                    x = _this.ans1Grp.getChildAt(_this.ans1Grp.children.length - 1).x + 19;
                }
                for (i = 0; i < target.frame + 1; i++) {
                    box = _this.add.sprite(x + i * 19, 219, 'allColor');
                    box.lastidx = x;
                    box.frame = target.frame
                    _this.ans1Grp.addChild(box)


                }

                _this.borderBox1.destroy();
                _this.borderBox1 = _this.add.group();
                if (_this.ans1Grp.length > 10 || _this.ans1Grp.length > (target.frame + 1)) {
                    borderboxc = 313;
                    count = 0;
                    currFrame = _this.ans1Grp.getChildAt(0).frame;
                    for (q = 0; q < _this.ans1Grp.length - 1; q++) {
                        if ((_this.ans1Grp.getChildAt(q).frame != _this.ans1Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans1Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans1Grp)) || (currFrame == count)) {
                            _this.makeRectBox(_this.ans1Grp.getChildAt(q).frame + 1, 221, borderboxc);
                            borderboxc += (19 * (_this.ans1Grp.getChildAt(q).frame + 1));
                            _this.borderBox1.addChild(_this.graphics);

                        }
                        if (_this.ans1Grp.getChildAt(q).frame != _this.ans1Grp.getChildAt(q + 1).frame || currFrame == count) {
                            currFrame = _this.ans1Grp.getChildAt(q + 1).frame;
                            count = 0;
                        }
                        else {
                            count++;
                        }
                    }
                    _this.makeRectBox(_this.ans1Grp.getChildAt(q).frame + 1, 221, borderboxc);
                    _this.borderBox1.addChild(_this.graphics);

                }
            }

            else if (_this.yellowBox.visible == true && (_this.ans2Grp.children.length + target.frame + 1) <= 30) {
                if (_this.ans2Grp.children.length == 0) {
                    x = 310;
                }
                else {
                    x = _this.ans2Grp.getChildAt(_this.ans2Grp.children.length - 1).x + 19;
                }
                for (i = 0; i < target.frame + 1; i++) {
                    box = _this.add.sprite(x + i * 19, 199, 'allColor')
                    box.frame = target.frame;
                    box.lastidx = x;

                    _this.ans2Grp.addChild(box);

                }

                _this.borderBox2.destroy();
                _this.borderBox2 = _this.add.group();
                if (_this.ans2Grp.length > 10 || _this.ans2Grp.length > (target.frame + 1)) {
                    borderboxc = 313;
                    count = 0;
                    currFrame = _this.ans2Grp.getChildAt(0).frame;

                    for (q = 0; q < _this.ans2Grp.length - 1; q++) {
                        if ((_this.ans2Grp.getChildAt(q).frame != _this.ans2Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans2Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans2Grp)) || (count == currFrame)) {
                            _this.makeRectBox(_this.ans2Grp.getChildAt(q).frame + 1, 221 - 20, borderboxc);
                            borderboxc += (19 * (_this.ans2Grp.getChildAt(q).frame + 1));
                            _this.borderBox2.addChild(_this.graphics);
                        }
                        if (_this.ans2Grp.getChildAt(q).frame != _this.ans2Grp.getChildAt(q + 1).frame || currFrame == count) {
                            currFrame = _this.ans2Grp.getChildAt(q + 1).frame;
                            count = 0;
                        }
                        else {
                            count++;
                        }
                    }
                    _this.makeRectBox(_this.ans2Grp.getChildAt(q).frame + 1, 221 - 20, borderboxc);
                    _this.borderBox2.addChild(_this.graphics);

                }
            }
            else if (_this.yellowBox3.visible == true && (_this.ans3Grp.children.length + target.frame + 1) <= 30) {
                if (_this.ans3Grp.children.length == 0) {
                    x = 310;
                }
                else {
                    x = _this.ans3Grp.getChildAt(_this.ans3Grp.children.length - 1).x + 19;

                }
                for (i = 0; i < target.frame + 1; i++) {
                    box = _this.add.sprite(x + i * 19, 300, 'allColor')
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
                            _this.makeRectBox(_this.ans3Grp.getChildAt(q).frame + 1, 322 - 20, borderboxc);
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
                    _this.makeRectBox(_this.ans3Grp.getChildAt(q).frame + 1, 322 - 20, borderboxc);
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
                    box = _this.add.sprite(x + i * 19, 320, 'allColor')
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
            }
            _this.snapSound.pause();
            _this.snapSound.currentTime = 0;
            _this.snapSound.play();


        }
        _this.reCreatehrGrp();


    },
    eraserUpdate: function (target) {
        console.log("eraserUpdate")
        _this.world.bringToTop(_this.eraser)
        _this.eraser.scale.setTo(0.8)
    },
    eraserDrop: function (target) {
        console.log("eraserDrop")
        _this.NotErased = true
        if (_this.cubegrp != true) {
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
        else {
            if (_this.checkOverlap(target, _this.ans3Grp) || _this.checkOverlap(target, _this.ans4Grp)) {//ans3Grpcpys,ans4Grpcpys

                target.x = 175;
                target.y = 380;
                _this.eraser.scale.setTo(1);

            }
            else if (_this.checkOverlap(target, _this.ans1Grp)) {

                target.x = 175;
                target.y = 380;
                _this.eraser.scale.setTo(1);
            }

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
    remakeCubes: function (grp) {
        console.log("remakeCubes")
        _this.borderBox1.destroy();
        _this.borderBox2.destroy();
        _this.borderBox3.destroy();
        _this.borderBox4.destroy();
        _this.borderBox1 = _this.add.group();
        _this.borderBox2 = _this.add.group();
        _this.borderBox3 = _this.add.group();
        _this.borderBox4 = _this.add.group();

        if (_this.ans1Grp.length > 0 && (_this.ans1Grp.length > 10 || _this.ans1Grp.length > (_this.ans1Grp.getChildAt(0).frame + 1))) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans1Grp.getChildAt(0).frame;

            for (q = 0; q < _this.ans1Grp.length - 1; q++) {
                if ((_this.ans1Grp.getChildAt(q).frame != _this.ans1Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans1Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans1Grp)) || (currFrame == count)) {
                    _this.makeRectBox(_this.ans1Grp.getChildAt(q).frame + 1, 221, borderboxc);
                    borderboxc += (19 * (_this.ans1Grp.getChildAt(q).frame + 1));
                    _this.borderBox1.addChild(_this.graphics);

                }
                if (_this.ans1Grp.getChildAt(q).frame != _this.ans1Grp.getChildAt(q + 1).frame || currFrame == count) {
                    currFrame = _this.ans1Grp.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.ans1Grp.getChildAt(q).frame + 1, 221, borderboxc);
            _this.borderBox1.addChild(_this.graphics);

        }
        if (_this.ans2Grp.length > 0 && (_this.ans2Grp.length > 10 || _this.ans2Grp.length > (_this.ans2Grp.getChildAt(0).frame + 1))) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans2Grp.getChildAt(0).frame;

            for (q = 0; q < _this.ans2Grp.length - 1; q++) {
                if ((_this.ans2Grp.getChildAt(q).frame != _this.ans2Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans2Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans2Grp)) || (count == currFrame)) {
                    _this.makeRectBox(_this.ans2Grp.getChildAt(q).frame + 1, 221 - 20, borderboxc);
                    borderboxc += (19 * (_this.ans2Grp.getChildAt(q).frame + 1));
                    _this.borderBox2.addChild(_this.graphics);
                }
                if (_this.ans2Grp.getChildAt(q).frame != _this.ans2Grp.getChildAt(q + 1).frame || count == currFrame) {
                    currFrame = _this.ans2Grp.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.ans2Grp.getChildAt(q).frame + 1, 221 - 20, borderboxc);
            _this.borderBox2.addChild(_this.graphics);

        }
        if (_this.ans3Grp.length > 0 && (_this.ans3Grp.length > 10 || _this.ans3Grp.length > (_this.ans3Grp.getChildAt(0).frame + 1))) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans3Grp.getChildAt(0).frame;

            for (q = 0; q < _this.ans3Grp.length - 1; q++) {
                if ((_this.ans3Grp.getChildAt(q).frame != _this.ans3Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans3Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans3Grp)) || (currFrame == count)) {
                    _this.makeRectBox(_this.ans3Grp.getChildAt(q).frame + 1, 322 - 20, borderboxc);
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
            _this.makeRectBox(_this.ans3Grp.getChildAt(q).frame + 1, 322 - 20, borderboxc);
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
    // changing the question box
    changeQuesBox: function () {
        console.log("changeQuesBox")
        _this.questionBox.destroy();
        _this.pSign11.destroy();
        _this.pSign21.destroy();
        // _this.mSign11.destroy();
        if (_this.finalPart != true)
            _this.questionBox3 = _this.add.sprite(246, 55, 'Text box_2cpy')
        else {
            _this.questionBox2 = _this.add.sprite(248, 55, 'Text box_2');
            _this.disableInputs();
            _this.showfraction2Boxes(430, 70);
            _this.AnswerBox.scale.setTo(1);
            _this.AnswerBox1.scale.setTo(1);
            _this.divideSign.destroy();
            _this.AnswerBox.y -= 6;
            _this.AnswerBox1.y -= 1;

            // if (_this.count1 == 3) {
            //     _this.Question_flag = 2;
            //     // _this.Question_flag = 2;
            //     _this.Ask_Question3.play();
            // }



        }


        if (_this.aArr[_this.count1] >= 10)
            _this.n1 = _this.add.text(26 - 4, 14 + 14, _this.aArr[_this.count1])
        else
            _this.n1 = _this.add.text(34 - 4, 14 + 14, _this.aArr[_this.count1])

        _this.questionBox3.addChild(_this.n1)
        _this.applyingStyle(_this.n1);
        _this.hrLine(25 - 4, 47.5 + 14);
        _this.questionBox3.addChild(_this.hrSign1);


        if (_this.bArr[_this.count1] >= 10)
            _this.d1 = _this.add.text(26 - 4, 52 + 14, _this.bArr[_this.count1])
        else
            _this.d1 = _this.add.text(34 - 4, 52 + 14, _this.bArr[_this.count1])

        _this.questionBox3.addChild(_this.d1)
        _this.applyingStyle(_this.d1);


        // _this.plusSignBlue(315 - 4, 117)

        if (_this.count1 < 3) {
            _this.plusBlueSign2 = _this.add.text(315 - 4, 100, "+");
            _this.plusBlueSign2.fill = '#65B4C3';
        }

        //else minus
        else {
            //console.log("minus");
            _this.minusBlueSign2 = _this.add.text(315 - 4, 100, "−");
            _this.minusBlueSign2.scale.setTo(1, 1);
            _this.minusBlueSign2.fill = '#65B4C3';

            //    _this.minusSignBlue2(315, 100);
        }


        if (_this.cArr[_this.count1] >= 10)
            _this.n2 = _this.add.text(91 - 4, 14 + 14, _this.cArr[_this.count1])
        else
            _this.n2 = _this.add.text(99 - 4, 14 + 14, _this.cArr[_this.count1])

        _this.questionBox3.addChild(_this.n2)
        _this.applyingStyle(_this.n2);
        _this.hrLine(90 - 4, 47.5 + 14);
        _this.questionBox3.addChild(_this.hrSign1);

        if (_this.bArr[_this.count1] >= 10)
            _this.d2 = _this.add.text(91 - 4, 52 + 14, _this.bArr[_this.count1])
        else
            _this.d2 = _this.add.text(99 - 4, 52 + 14, _this.bArr[_this.count1])


        _this.questionBox3.addChild(_this.d2)
        _this.applyingStyle(_this.d2);


        _this.yelloBox6 = _this.add.sprite(385, 100, 'yellowTextbox')
        _this.blueeqsign2 = _this.add.text(394, 100, '=');
        _this.blueeqsign2.fill = '#65B4C3'



        // if (_this.finalPart != true)
        //     _this.makeansCpy();

    },

    // changing the question box in the last screen
    changeQuesBox2: function () {
        console.log("changeQuesBox2")
        _this.questionBox.destroy();
        _this.pSign11.destroy();
        _this.pSign21.destroy();
        // _this.mSign11.destroy();
        //console.log("questionBox2////")
        _this.questionBox2 = _this.add.sprite(248, 55, 'Text box_2');

        if (_this.aArr[_this.count1] >= 10) {
            //console.log("changeQuesBox2.......")
            _this.n1 = _this.add.text(26 - 4, 14 + 14, _this.aArr[_this.count1])
        }

        else {
            //console.log("else.......")
            _this.n1 = _this.add.text(34 - 4, 14 + 14, _this.aArr[_this.count1])

        }

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



        if (_this.count1 < 3) {
            _this.plusSignBlue(315 - 4, 117);
        }

        //else minus
        else {
            //console.log("minus");
            _this.minusBlueSign3 = _this.add.text(315 - 4, 100, "−");
            _this.minusBlueSign3.scale.setTo(1, 1);
            _this.minusBlueSign3.fill = '#65B4C3';

            // _this.minusSignBlue3(315 - 4, 117);
        }

        if (_this.cArr[_this.count1] >= 10)
            _this.n2 = _this.add.text(91 - 4, 14 + 14, _this.cArr[_this.count1])
        else
            _this.n2 = _this.add.text(99 - 4, 14 + 14, _this.cArr[_this.count1])

        _this.questionBox2.addChild(_this.n2)
        _this.applyingStyle(_this.n2);
        _this.hrLine(90 - 4, 47.5 + 14);
        _this.questionBox2.addChild(_this.hrSign1);

        if (_this.bArr[_this.count1] >= 10)
            _this.d2 = _this.add.text(91 - 4, 52 + 14, _this.bArr[_this.count1])
        else
            _this.d2 = _this.add.text(99 - 4, 52 + 14, _this.bArr[_this.count1])


        _this.questionBox2.addChild(_this.d2)
        _this.applyingStyle(_this.d2);


        _this.yelloBox5 = _this.add.sprite(385, 100, 'yellowTextbox')
        _this.blueeqsign = _this.add.text(394, 100, '=');
        _this.blueeqsign.fill = '#65B4C3'
        // if (_this.finalPart != true)
        //     _this.questionBox2 = _this.add.sprite(246, 55, 'Text box_2cpy')
        // else {
        //console.log("changeQuesBox2////")

        // _this.disableInputs();
        _this.showfraction2Boxes(430, 70);
        _this.AnswerBox.scale.setTo(1);
        _this.AnswerBox1.scale.setTo(1);
        _this.divideSign.destroy();
        _this.AnswerBox.y -= 6;
        _this.AnswerBox1.y -= 1;

        // if (_this.count1 == 3) {
        //     _this.Ask_Question3.play();
        //     _this.Question_flag = 2;
        // }
        // _this.Question_flag = 2;
        // }






        // if (_this.finalPart != true)
        //     _this.makeansCpy();

    },

    //showing hand symbol for dragging the cube
    showHandSymbol: function () {
        console.log("showHandSymbol")
        _this.draggableCpy = _this.add.group();
        _this.hand = _this.add.sprite(320, 210, 'hand');
        _this.hand.scale.setTo(0.6);
        for (i = 0; i < _this.ans1Grp.length; i++) {//ans1Grpcpys
            box = _this.add.sprite(_this.ans1Grp.getChildAt(i).x, _this.ans1Grp.getChildAt(i).y, 'allColor')//box = _this.add.sprite(_this.ans1Grpcpys.getChildAt(i).x, _this.ans1Grpcpys.getChildAt(i).y, 'allColor')
            box.frame = _this.ans1Grp.getChildAt(i).frame;//ans1Grpcpys
            _this.draggableCpy.addChild(box);
        }

        _this.dragableGrp = _this.add.group();
        _this.dragableGrp.addChild(_this.draggableCpy);
        _this.dragableGrp.addChild(_this.hand);

        _this.tween1 = _this.add.tween(_this.dragableGrp);
        _this.tween1.to({ x: -10, y: 196 }, 800, 'Linear', true, 0);
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
    rightbtnClicked: function () {
        console.log("rightbtnClicked")
        _this.userselected = 0;
        _this.clickSound.play();
        _this.rightbtn.inputEnabled = false;
        _this.rightbtn.input.useHandCursor = false;
        _this.rightbtn_is_Clicked = true;

        if (_this.yellowBox2.visible == true) {
            //console.log("if first")
            _this.rightbtn.frame = 1;
            if (_this.ans1Grp.children.length == _this.bArr[_this.count1] && _this.validateRods(_this.ans1Grp, _this.bArr[_this.count1])) {
                //console.log("if 2")
                _this.counterCelebrationSound.pause();
                _this.counterCelebrationSound.currentTime = 0;
                _this.counterCelebrationSound.play()
                _this.yellowBox2.visible = false;
                _this.yellowBox.visible = true;
                _this.ans1Grp.children.forEach(element => {
                    element.inputEnabled = false
                });

                _this.rightbtn.inputEnabled = true;

                _this.time.events.add(500, () => {
                    _this.rightbtn.frame = 0;
                })

            }
            else {
                //console.log("else 1")
                _this.wrongans.play();
                _this.rightbtn.frame = 0;
                _this.ans1Grp.destroy();
                _this.borderBox1.destroy();
                _this.ans1Grp = _this.add.group();

                _this.rightbtn.inputEnabled = true;
            }
        }
        else if (_this.yellowBox.visible == true) {
            _this.rightbtn.frame = 1;
            //console.log("else if 1")
            if (_this.ans2Grp.children.length == _this.aArr[_this.count1] && _this.validateRods(_this.ans2Grp, _this.aArr[_this.count1])) {
                //console.log("if ans2")
                _this.counterCelebrationSound.pause();
                _this.counterCelebrationSound.currentTime = 0;
                _this.counterCelebrationSound.play()
                _this.yellowBox.visible = false;
                _this.yellowBox4.visible = true;
                _this.firstFrac = false;
                _this.ans2Grp.children.forEach(element => {
                    element.inputEnabled = false
                });

                _this.rightbtn.inputEnabled = true;
                _this.textBox = _this.add.sprite(260, 253, 'Text box_4')

                if (_this.count1 < 3) {
                    //console.log("plus red");
                    _this.plusSign(10, 16)
                    _this.textBox.addChild(_this.pSign1);
                    _this.textBox.addChild(_this.pSign2);
                }
                //else minus
                else {
                    // _this.textBox2 = _this.add.sprite(260, 253, 'Text box_4')
                    //console.log("minus red");
                    _this.minusSign(10, 16);
                    _this.textBox.addChild(_this.mSign1);
                    // _this.textBox2.addChild(_this.mSign2);
                }


                _this.box2Display = _this.add.sprite(260, 293, 'Text box_3')
                //console.log("if crrr")
                if (_this.cArr[_this.count1] >= 10)
                    _this.n22 = _this.add.text(6, 5, _this.cArr[_this.count1])
                else
                    _this.n22 = _this.add.text(14, 5, _this.cArr[_this.count1])

                _this.n22.scale.setTo(0.8)

                _this.box2Display.addChild(_this.n22)
                _this.applyingStyle(_this.n22);

                _this.hrSign1 = _this.add.graphics();
                _this.hrSign1.lineStyle(4, 0xFF0000);
                _this.hrSign1.moveTo(8, 30);
                _this.hrSign1.lineTo(30, 30);

                _this.box2Display.addChild(_this.hrSign1);


                if (_this.bArr[_this.count1] >= 10)
                    _this.d22 = _this.add.text(6, 30, _this.bArr[_this.count1])
                else
                    _this.d22 = _this.add.text(14, 30, _this.bArr[_this.count1])

                _this.box2Display.addChild(_this.d22)
                _this.applyingStyle(_this.d22);
                _this.d22.scale.setTo(0.8)
                _this.d22.fill = '#FF0000';
                _this.n22.fill = '#FF0000';

                _this.reCreatehrGrp();

                _this.time.events.add(500, () => {
                    _this.rightbtn.frame = 0;
                })

            }
            else {
                //console.log("else last")
                _this.wrongans.play();
                _this.rightbtn.frame = 0;
                _this.ans2Grp.destroy();
                _this.borderBox2.destroy();
                _this.ans2Grp = _this.add.group();

                _this.rightbtn.inputEnabled = true;
            }
        }
        else if (_this.yellowBox4.visible == true) {
            _this.rightbtn.frame = 1;
            //console.log("else if 2")
            if (_this.ans4Grp.children.length == _this.bArr[_this.count1] && _this.validateRods(_this.ans4Grp, _this.bArr[_this.count1])) {
                _this.counterCelebrationSound.pause();
                _this.counterCelebrationSound.currentTime = 0;
                _this.counterCelebrationSound.play()
                _this.yellowBox4.visible = false;
                _this.yellowBox3.visible = true;
                _this.ans4Grp.children.forEach(element => {
                    element.inputEnabled = false
                });
                _this.time.events.add(500, () => {
                    _this.rightbtn.frame = 0;
                })
                _this.rightbtn.inputEnabled = true;

            }
            else {
                //console.log("else 222")
                _this.wrongans.play();
                _this.rightbtn.frame = 0;
                _this.borderBox4.destroy();
                _this.ans4Grp.destroy();
                _this.ans4Grp = _this.add.group();

                _this.rightbtn.inputEnabled = true;
            }
        }
        else if (_this.yellowBox3.visible == true) {
            _this.rightbtn.frame = 1;
            //console.log("else if 3")
            if (_this.ans3Grp.children.length == _this.cArr[_this.count1] && _this.validateRods(_this.ans3Grp, _this.cArr[_this.count1])) {
                _this.counterCelebrationSound.pause();
                _this.counterCelebrationSound.currentTime = 0;
                _this.counterCelebrationSound.play()
                _this.yellowBox3.visible = false;

                _this.ans3Grp.children.forEach(element => {
                    element.inputEnabled = false
                });

                _this.rightbtn.inputEnabled = true;

                _this.RedeqtextBox = _this.add.sprite(260, 410, 'Text box_4')
                _this.redeqSign = _this.add.text(12, 1, '=');
                _this.redeqSign.fill = '#FF0000'
                _this.RedeqtextBox.addChild(_this.redeqSign)

                // _this.AnsBox2.visible = true;
                _this.time.events.add(500, () => {
                    _this.rightbtn.frame = 0;
                })
                _this.cubegrp = true;

                if (_this.count1 == 0) {
                    _this.time.events.add(500, _this.showHandSymbol)
                    // _this.showHandSymbol();
                }
                else
                    _this.enableCubesDrag();
                //   _this.showfraction2Boxes();
                _this.disableSidebar();
                _this.changeQuesBox();
                _this.rightbtn.destroy();

            }
            else {
                //console.log("else33333")
                _this.wrongans.play();
                _this.rightbtn.frame = 0;
                _this.borderBox3.destroy();
                _this.ans3Grp.destroy();
                _this.ans3Grp = _this.add.group();

                _this.rightbtn.inputEnabled = true;
            }
        }

        else if (_this.AnswerBox.name == valuesCombinationsNum[_this.count1] && _this.AnswerBox1.name == _this.bArr[_this.count1]) {
            console.log("final part............")
            // _this.part3 = false;
            if (_this.speakerbtn == false) _this.speakerbtn = true;
            _this.finalPart = false;
            _this.correctAns();
            if (_this.count1 == 3) {
                _this.time.events.add(3000, function () {
                    console.log("time....")
                    _this.Ask_Question3.play();
                });

                console.log("time222....")
                _this.Question_flag = 2;
            }

        }
        else {
            //edited for baseurl apk
            _this.noofAttempts++;

            _this.wrongAnsClicked()
            _this.rightbtn.inputEnabled = true;
        }



    },

    //we can use this for dragging the cubes
    enableCubesDrag: function () {
        console.log("enableCubesDrag")
        // _this.reArrangeScreen();
        _this.finalAnsGrpDenom = _this.add.group();
        _this.finalAnsGrpNum = _this.add.group();

        _this.ans1Grp.children.forEach(box => {//ans1Grpcpys
            //console.log("ans1Grpcpys")
            box.inputEnabled = true;
            box.input.enableDrag(true);
            box.events.onDragUpdate.add(_this.dragUpdateRod, _this);
            box.events.onDragStart.add(_this.dragstartRod, _this);

            box.events.onDragStop.add(_this.dragStopRod, _this);
        });
        // _this.ans2Grp.children.forEach(box => {//ans2Grpcpys
        //     box.inputEnabled = true;
        //     box.input.enableDrag(true);
        //     box.events.onDragUpdate.add(_this.dragUpdateRod, _this);
        //     box.events.onDragStop.add(_this.dragStopRod, _this);
        //     box.events.onDragStart.add(_this.dragstartRod, _this);

        // });
        // _this.ans3Grp.children.forEach(box => {//ans3Grpcpys
        //     box.inputEnabled = true;
        //     box.input.enableDrag(true);
        //     box.events.onDragUpdate.add(_this.dragUpdateRod, _this);
        //     box.events.onDragStop.add(_this.dragStopRod, _this);
        //     box.events.onDragStart.add(_this.dragstartRod, _this);

        // });
        _this.ans4Grp.children.forEach(box => {//ans4Grpcpys
            //console.log("ans4Grpcpys")
            box.inputEnabled = true;
            box.input.enableDrag(true);
            box.events.onDragUpdate.add(_this.dragUpdateRod, _this);
            box.events.onDragStop.add(_this.dragStopRod, _this);
            box.events.onDragStart.add(_this.dragstartRod, _this);

        });
        _this.finalBorder = _this.add.group();
        _this.finalBorderDenom = _this.add.group();
    },
    dragstartRod: function (target) {
        console.log("dragstartRod")
        // _this.box22 = false;
        if (_this.ans1Grp.children.includes(target)) {//ans1Grpcpys
            _this.ans1Grpcpys1.visible = true
        }
        else if (_this.ans2Grp.children.includes(target)) {//ans2Grpcpys
            _this.ans2Grpcpys1.visible = true
            // _this.box22 = true;
            // _this.borderBox21.destroy();

        }
        else if (_this.ans3Grp.children.includes(target)) {//ans3Grpcpys
            _this.ans3Grpcpys1.visible = true
            // _this.borderBox31.destroy();

        }
        else if (_this.ans4Grp.children.includes(target)) {//ans4Grpcpys
            _this.ans4Grpcpys1.visible = true
            // _this.borderBox41.destroy();

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
        if (_this.ans1Grp.children.includes(target)) {//ans1Grpcpys
            grp = _this.ans1Grp;//ans1Grpcpys
        }
        else if (_this.ans2Grp.children.includes(target)) {//ans2Grpcpys
            grp = _this.ans2Grp;//ans2Grpcpys

        }
        else if (_this.ans3Grp.children.includes(target)) {//ans3Grpcpys
            grp = _this.ans3Grp;//ans3Grpcpys

        }
        else if (_this.ans4Grp.children.includes(target)) {//ans4Grpcpys
            grp = _this.ans4Grp;//ans4Grpcpys

        }

        for (let k = Number(target.name); k < grp.length; k++) {
            //console.log("framee1")
            grp.getChildAt(k).y = draggedCubey
            grp.getChildAt(k).x = draggedCubex + 19 * frontpos;
            frontpos++;

        }


        if (grp.length > 20 && grp.getChildAt(0).frame == 9) {
            if (grp.getChildAt(19).frame != 9) {
                //console.log("framee2")
                framee = grp.getChildAt(19).frame;
                grp.getChildAt(19).frame = 9;
                grp.getChildAt(grp.length - 1).frame = framee
            }
        }
        else if (grp.length > 10 && grp.getChildAt(0).frame == 9) {
            //console.log("framee3")
            if (grp.getChildAt(9).frame != 9) {
                framee = grp.getChildAt(9).frame;
                grp.getChildAt(9).frame = 9;
                grp.getChildAt(grp.length - 1).frame = framee
            }
        }

    },
    //stoping the dragging rod
    dragStopRod: function (target) {
        console.log("dragStopRod")
        _this.finalGrpNum = _this.add.group();
        _this.finalGrpNum2 = _this.add.group();
        if (_this.count1 < 3) {
            _this.Question_flag = 0;
            if (_this.ans1Grp.children.includes(target) || _this.ans4Grp.children.includes(target)) {
                x = _this.ans1Grpcpys1.length;

                if (x > 10 && x <= 20) {
                    y = _this.ans1Grpcpys1.length - 10; //14-10=4
                    for (i = 0; i < 10; i++) {
                        //console.log("dragStopRod iff")
                        box = _this.add.sprite(310 + i * 19, 415, 'allColor')
                        box.frame = 9;
                        _this.finalAnsGrpDenom.addChild(box);
                    }
                    for (i = 0; i < x - 10; i++) {
                        //console.log(x,"x value")
                        //console.log("1000000")
                        box = _this.add.sprite(310 + (190 + i * 19), 415, 'allColor')
                        box.frame = y - 1;
                        _this.finalAnsGrpDenom.addChild(box);
                    }
                }
                else if (x > 20) {
                    y = _this.ans1Grpcpys1.length - 20; //24-20=4
                    for (i = 0; i < 20; i++) {
                        //console.log("dragStopRod iff")
                        box = _this.add.sprite(310 + i * 19, 415, 'allColor')
                        box.frame = 9;
                        _this.finalAnsGrpDenom.addChild(box);
                    }
                    for (i = 0; i < x - 20; i++) {
                        //console.log(x,"x value")
                        //console.log("20 and above")
                        box = _this.add.sprite(310 + (380 + i * 19), 415, 'allColor')
                        box.frame = y - 1;
                        _this.finalAnsGrpDenom.addChild(box);
                    }
                }

                else {
                    //console.log("dragStopRod else")
                    for (i = 0; i < x; i++) {

                        //console.log("x<10")
                        box = _this.add.sprite(310 + i * 19, 415, 'allColor')
                        box.frame = x - 1;
                        _this.finalAnsGrpDenom.addChild(box);
                    }
                }


                _this.finalBorderDenom.destroy();
                _this.finalBorderDenom = _this.add.group();

                if (_this.ans1Grp.length > 0 && (_this.ans1Grp.length > 10 || _this.ans1Grp.length > (_this.ans1Grp.getChildAt(0).frame + 1))) {
                    borderboxc = 313;
                    count = 0;
                    currFrame = _this.ans1Grp.getChildAt(0).frame;

                    for (q = 0; q < _this.ans1Grp.length - 1; q++) {
                        if ((_this.ans1Grp.getChildAt(q).frame != _this.ans1Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans1Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans1Grp)) || (currFrame == count)) {
                            _this.makeRectBox(_this.ans1Grp.getChildAt(q).frame + 1, 416, borderboxc);
                            borderboxc += (19 * (_this.ans1Grp.getChildAt(q).frame + 1));
                            _this.finalBorderDenom.addChild(_this.graphics);

                        }
                        if (_this.ans1Grp.getChildAt(q).frame != _this.ans1Grp.getChildAt(q + 1).frame || currFrame == count) {
                            currFrame = _this.ans1Grp.getChildAt(q + 1).frame;
                            count = 0;
                        }
                        else {
                            count++;
                        }
                    }
                    _this.makeRectBox(_this.ans1Grp.getChildAt(q).frame + 1, 416, borderboxc);
                    _this.finalBorderDenom.addChild(_this.graphics);

                }

                if (_this.ans4Grp.length > 0 && (_this.ans4Grp.length > 10 || _this.ans4Grp.length > (_this.ans4Grp.getChildAt(0).frame + 1))) {
                    borderboxc = 313;
                    count = 0;
                    currFrame = _this.ans4Grp.getChildAt(0).frame;

                    for (q = 0; q < _this.ans4Grp.length - 1; q++) {
                        if ((_this.ans4Grp.getChildAt(q).frame != _this.ans4Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans4Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans4Grp)) || (currFrame == count)) {
                            _this.makeRectBox(_this.ans4Grp.getChildAt(q).frame + 1, 416, borderboxc);
                            borderboxc += (19 * (_this.ans4Grp.getChildAt(q).frame + 1));
                            _this.finalBorderDenom.addChild(_this.graphics);

                        }
                        if (_this.ans4Grp.getChildAt(q).frame != _this.ans4Grp.getChildAt(q + 1).frame || currFrame == count) {
                            currFrame = _this.ans4Grp.getChildAt(q + 1).frame;
                            count = 0;
                        }
                        else {
                            count++;
                        }
                    }
                    _this.makeRectBox(_this.ans4Grp.getChildAt(q).frame + 1, 416, borderboxc);
                    _this.finalBorderDenom.addChild(_this.graphics);

                }

                if (_this.ans1Grp.children.includes(target))
                    _this.ans1Grp.destroy();
                else {
                    _this.ans4Grp.destroy();
                }

                _this.world.bringToTop(_this.finalBorderDenom);

                _this.snapSound.pause();
                _this.snapSound.currentTime = 0;
                _this.snapSound.play();

            }
            else {
                //console.log("drag stop else")

                if (_this.finalAnsGrpNum.length > 0)
                    x = _this.finalAnsGrpNum.getChildAt(_this.finalAnsGrpNum.length - 1).x + 19;
                else
                    x = 310;
                if (_this.ans2Grp.children.includes(target)) {//   if (_this.ans2Grpcpys.children.includes(target)) {
                    for (i = 0; i < _this.ans2Grpcpys1.length; i++) {
                        box = _this.add.sprite(x + i * 19, 395, 'allColor')
                        box.frame = _this.ans2Grp.getChildAt(i).frame;//ans2Grpcpys
                        _this.finalAnsGrpNum.addChild(box);
                    }
                    _this.ans2Grp.destroy();//ans2Grpcpys
                }
                else if (_this.ans3Grp.children.includes(target)) {//ans3Grpcpys
                    for (i = 0; i < _this.ans3Grpcpys1.length; i++) {
                        box = _this.add.sprite(x + i * 19, 395, 'allColor')
                        box.frame = _this.ans3Grp.getChildAt(i).frame;//ans3Grpcpys
                        _this.finalAnsGrpNum.addChild(box);
                    }
                    _this.ans3Grp.destroy();//ans3Grpcpys
                }

                count = 0;
                currFrame = _this.finalAnsGrpNum.getChildAt(0).frame;
                _this.finalBorder.destroy();
                _this.finalBorder = _this.add.group();
                if (_this.finalAnsGrpNum.length > 10 || _this.finalAnsGrpNum.length > (_this.finalAnsGrpNum.getChildAt(0).frame + 1)) {
                    borderboxc = 313;
                    for (q = 0; q < _this.finalAnsGrpNum.length - 1; q++) {
                        if ((_this.finalAnsGrpNum.getChildAt(q).frame != _this.finalAnsGrpNum.getChildAt(q + 1).frame) || ((q + 1) % (_this.finalAnsGrpNum.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.finalAnsGrpNum)) || (count == currFrame)) {
                            _this.makeRectBox(_this.finalAnsGrpNum.getChildAt(q).frame + 1, 419 - 20, borderboxc);
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
                    _this.makeRectBox(_this.finalAnsGrpNum.getChildAt(q).frame + 1, 419 - 20, borderboxc);
                    _this.finalBorder.addChild(_this.graphics);

                }
                _this.world.bringToTop(_this.finalBorder);

                _this.snapSound.pause();
                _this.snapSound.currentTime = 0;
                _this.snapSound.play();

            }

            if (_this.count1 < 3) {
                if ((_this.finalAnsGrpDenom.length == valuesCombinationsDenom[_this.count1])) {
                    //(_this.finalAnsGrpNum.length == valuesCombinationsNum[_this.count1]) && 
                    //console.log("drag stop final....")
                    if (_this.finalAnsGrpNum.length == valuesCombinationsNum[_this.count1]) {
                        //console.log("drag stop final....")
                        _this.addNumberPad();
                        _this.changeQuesBox2();
                    }
                    else {
                        _this.ans2Grp.children.forEach(box => {
                            box.inputEnabled = true;
                            box.input.enableDrag(true);
                            box.events.onDragUpdate.add(_this.dragUpdateRod, _this);
                            box.events.onDragStop.add(_this.dragStopRod, _this);
                            box.events.onDragStart.add(_this.dragstartRod, _this);

                        });
                        _this.ans3Grp.children.forEach(box => {
                            box.inputEnabled = true;
                            box.input.enableDrag(true);
                            box.events.onDragUpdate.add(_this.dragUpdateRod, _this);
                            box.events.onDragStop.add(_this.dragStopRod, _this);
                            box.events.onDragStart.add(_this.dragstartRod, _this);

                        });
                    }


                }
            }

            else {
                if ((_this.finalAnsGrpDenom.length == valuesCombinationsDenom[_this.count1])) {
                    //(_this.finalAnsGrpNum.length == valuesCombinationsNum[_this.count1]) && 
                    //console.log("drag stop final....")
                    if (_this.finalAnsGrpNum.length == valuesCombinationsNum[_this.count1]) {
                        //console.log("drag stop final....")
                        _this.addNumberPad();
                        _this.changeQuesBox2();
                    }
                    else {
                        _this.ans2Grp.children.forEach(box => {
                            box.inputEnabled = true;
                            box.input.enableDrag(true);
                            box.events.onDragUpdate.add(_this.dragUpdateRod, _this);
                            box.events.onDragStop.add(_this.dragStopRod, _this);
                            box.events.onDragStart.add(_this.dragstartRod, _this);

                        });
                        _this.ans3Grp.children.forEach(box => {
                            box.inputEnabled = true;
                            box.input.enableDrag(true);
                            box.events.onDragUpdate.add(_this.dragUpdateRod, _this);
                            box.events.onDragStop.add(_this.dragStopRod, _this);
                            box.events.onDragStart.add(_this.dragstartRod, _this);

                        });
                    }


                }
            }
        }
        else {
            _this.Question_flag = 2;
            //console.log("substraction drag stop")
            if (_this.ans1Grp.children.includes(target) || _this.ans4Grp.children.includes(target)) {
                x = _this.ans1Grpcpys1.length;

                if (x > 10 && x <= 20) {
                    y = _this.ans1Grpcpys1.length - 10; //14-10=4
                    for (i = 0; i < 10; i++) {
                        //console.log("dragStopRod iff")
                        box = _this.add.sprite(310 + i * 19, 415, 'allColor')
                        box.frame = 9;
                        _this.finalAnsGrpDenom.addChild(box);
                    }
                    for (i = 0; i < x - 10; i++) {
                        //console.log(x,"x value")
                        //console.log("1000000")
                        box = _this.add.sprite(310 + (190 + i * 19), 415, 'allColor')
                        box.frame = y - 1;
                        _this.finalAnsGrpDenom.addChild(box);
                    }
                }
                else if (x > 20) {
                    y = _this.ans1Grpcpys1.length - 20; //24-20=4
                    for (i = 0; i < 20; i++) {
                        //console.log("dragStopRod iff")
                        box = _this.add.sprite(310 + i * 19, 415, 'allColor')
                        box.frame = 9;
                        _this.finalAnsGrpDenom.addChild(box);
                    }
                    for (i = 0; i < x - 20; i++) {
                        //console.log(x,"x value")
                        //console.log("20 and above")
                        box = _this.add.sprite(310 + (380 + i * 19), 415, 'allColor')
                        box.frame = y - 1;
                        _this.finalAnsGrpDenom.addChild(box);
                    }
                }

                else {
                    //console.log("dragStopRod else")
                    for (i = 0; i < x; i++) {

                        //console.log("x<10")
                        box = _this.add.sprite(310 + i * 19, 415, 'allColor')
                        box.frame = x - 1;
                        _this.finalAnsGrpDenom.addChild(box);
                    }
                }

                _this.finalBorderDenom.destroy();
                _this.finalBorderDenom = _this.add.group();

                if (_this.ans1Grp.length > 0 && (_this.ans1Grp.length > 10 || _this.ans1Grp.length > (_this.ans1Grp.getChildAt(0).frame + 1))) {
                    borderboxc = 313;
                    count = 0;
                    currFrame = _this.ans1Grp.getChildAt(0).frame;

                    for (q = 0; q < _this.ans1Grp.length - 1; q++) {
                        if ((_this.ans1Grp.getChildAt(q).frame != _this.ans1Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans1Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans1Grp)) || (currFrame == count)) {
                            _this.makeRectBox(_this.ans1Grp.getChildAt(q).frame + 1, 416, borderboxc);
                            borderboxc += (19 * (_this.ans1Grp.getChildAt(q).frame + 1));
                            _this.finalBorderDenom.addChild(_this.graphics);

                        }
                        if (_this.ans1Grp.getChildAt(q).frame != _this.ans1Grp.getChildAt(q + 1).frame || currFrame == count) {
                            currFrame = _this.ans1Grp.getChildAt(q + 1).frame;
                            count = 0;
                        }
                        else {
                            count++;
                        }
                    }
                    _this.makeRectBox(_this.ans1Grp.getChildAt(q).frame + 1, 416, borderboxc);
                    _this.finalBorderDenom.addChild(_this.graphics);

                }

                if (_this.ans4Grp.length > 0 && (_this.ans4Grp.length > 10 || _this.ans4Grp.length > (_this.ans4Grp.getChildAt(0).frame + 1))) {
                    borderboxc = 313;
                    count = 0;
                    currFrame = _this.ans4Grp.getChildAt(0).frame;

                    for (q = 0; q < _this.ans4Grp.length - 1; q++) {
                        if ((_this.ans4Grp.getChildAt(q).frame != _this.ans4Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans4Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans4Grp)) || (currFrame == count)) {
                            _this.makeRectBox(_this.ans4Grp.getChildAt(q).frame + 1, 416, borderboxc);
                            borderboxc += (19 * (_this.ans4Grp.getChildAt(q).frame + 1));
                            _this.finalBorderDenom.addChild(_this.graphics);

                        }
                        if (_this.ans4Grp.getChildAt(q).frame != _this.ans4Grp.getChildAt(q + 1).frame || currFrame == count) {
                            currFrame = _this.ans4Grp.getChildAt(q + 1).frame;
                            count = 0;
                        }
                        else {
                            count++;
                        }
                    }
                    _this.makeRectBox(_this.ans4Grp.getChildAt(q).frame + 1, 416, borderboxc);
                    _this.finalBorderDenom.addChild(_this.graphics);

                }

                if (_this.ans1Grp.children.includes(target))
                    _this.ans1Grp.destroy();
                else {
                    _this.ans4Grp.destroy();
                }

                _this.world.bringToTop(_this.finalBorderDenom);
                _this.snapSound.pause();
                _this.snapSound.currentTime = 0;
                _this.snapSound.play();

            }
            else {

                _this.ResetAll = false;
                if (_this.ans2Grp.children.includes(target)) {

                    x = _this.ans2Grpcpys1.length;
                    grp = _this.ans2Grp;
                    if (_this.finalAnsGrpNum.length > 0) {
                        _this.ResetAll = true;
                        _this.secondgrpcpylen = _this.finalAnsGrpNum.length;
                        _this.framesarr = [];
                        for (k = 0; k < _this.finalAnsGrpNum.length; k++) {
                            _this.framesarr.push(_this.finalAnsGrpNum.getChildAt(k).frame);
                        }

                        //console.log(_this.secondgrpcpy)
                        _this.finalAnsGrpNum.destroy();
                        _this.finalAnsGrpNum = _this.add.group();
                    }
                }
                else {
                    x = _this.ans3Grpcpys1.length;
                    grp = _this.ans3Grp;

                }


                for (i = 0; i < x; i++) {
                    box = _this.add.sprite(310 + i * 19, 395, 'allColor')
                    box.frame = grp.getChildAt(i).frame;
                    _this.finalAnsGrpNum.addChild(box);
                }
                if (_this.ResetAll == true) {
                    for (i = 0; i < _this.secondgrpcpylen; i++) {
                        box = _this.add.sprite(310 + i * 19, 395, 'allColor')
                        box.frame = _this.framesarr[i];
                        _this.finalAnsGrpNum.addChild(box);
                    }
                }

                if (_this.ans2Grp.children.includes(target))
                    _this.ans2Grp.destroy();
                else {
                    _this.ans3Grp.destroy();
                }

                _this.snapSound.pause();
                _this.snapSound.currentTime = 0;
                _this.snapSound.play();

            }
            if (_this.finalAnsGrpDenom.length == valuesCombinationsDenom[_this.count1]) {

                if (_this.ans2Grp.length == 0 && _this.ans3Grp.length == 0) {
                    _this.time.events.add(800, _this.showTweens)
                }
                else {
                    _this.ans2Grp.children.forEach(box => {
                        box.inputEnabled = true;
                        box.input.enableDrag(true);
                        box.events.onDragUpdate.add(_this.dragUpdateRod, _this);
                        box.events.onDragStop.add(_this.dragStopRod, _this);
                        box.events.onDragStart.add(_this.dragstartRod, _this);

                    });
                    _this.ans3Grp.children.forEach(box => {
                        box.inputEnabled = true;
                        box.input.enableDrag(true);
                        box.events.onDragUpdate.add(_this.dragUpdateRod, _this);
                        box.events.onDragStop.add(_this.dragStopRod, _this);
                        box.events.onDragStart.add(_this.dragstartRod, _this);

                    });
                }

            }
        }


    },
    showTweens: function () {
        console.log("showTweens");
        _this.time.events.removeAll();

        for (let i = 0; i < _this.ans3Grpcpys1.length; i++) {
            _this.time.events.add(20 * Math.abs(i + 1), function () {
                _this.finalAnsGrpNum.getChildAt(_this.finalAnsGrpNum.length - 1 - i).frame = 10;
                _this.finalAnsGrpNum.getChildAt(_this.finalAnsGrpNum.length - 1 - i).scale.setTo(0.9)
                _this.finalAnsGrpNum.getChildAt(_this.finalAnsGrpNum.length - 1 - i).y += 1;
            });

        }
        _this.framechange.play();

        _this.time.events.add(_this.ans3Grpcpys1.length * 60, () => {

            leftLength = valuesCombinationsNum[_this.count1]

            for (let i = _this.ans3Grpcpys1.length, k = 1; i < _this.ans2Grpcpys1.length; i++, k++) {
                _this.time.events.add(30 * k, function () {
                    if (leftLength <= 10)
                        _this.finalAnsGrpNum.getChildAt(i).frame = leftLength - 1;
                    else {
                        if (leftLength % 10 == 0)
                            _this.finalAnsGrpNum.getChildAt(i).frame = 9;
                        else if (leftLength < 20) {
                            if (i - _this.ans3Grpcpys1.length < 10) {
                                _this.finalAnsGrpNum.getChildAt(i).frame = 9;
                            }
                            else
                                _this.finalAnsGrpNum.getChildAt(i).frame = leftLength % 10 - 1;

                        }
                        else {
                            if (i - _this.ans3Grpcpys1.length < 20) {
                                _this.finalAnsGrpNum.getChildAt(i).frame = 9;
                            }
                            else
                                _this.finalAnsGrpNum.getChildAt(i).frame = leftLength % 10 - 1;

                        }
                    }
                });
            }

        })

        _this.time.events.add(60 * _this.ans3Grpcpys1.length + (50 * _this.ans2Grpcpys1.length), function () {

            _this.finalAnsGrpNum.destroy();
            _this.finalAnsGrpNum = _this.add.group();
            _this.snapSound.play();

            leftLength = valuesCombinationsNum[_this.count1]
            for (let i = 0; i < valuesCombinationsNum[_this.count1]; i++) {
                box = _this.add.sprite(310 + i * 19, 395, 'allColor')
                _this.finalAnsGrpNum.addChild(box);
                if (leftLength <= 10)
                    _this.finalAnsGrpNum.getChildAt(i).frame = leftLength - 1;
                else {
                    if (leftLength % 10 == 0)
                        _this.finalAnsGrpNum.getChildAt(i).frame = 9;
                    else if (leftLength < 20) {
                        if (i < 10) {
                            _this.finalAnsGrpNum.getChildAt(i).frame = 9;
                        }
                        else
                            _this.finalAnsGrpNum.getChildAt(i).frame = leftLength % 10 - 1;

                    }
                    else {
                        if (i < 20) {
                            _this.finalAnsGrpNum.getChildAt(i).frame = 9;
                        }
                        else
                            _this.finalAnsGrpNum.getChildAt(i).frame = leftLength % 10 - 1;

                    }
                }

            }

            _this.finalBorder.destroy();
            _this.finalBorder = _this.add.group();
            if (_this.finalAnsGrpNum.length > 10 || _this.finalAnsGrpNum.length > (_this.finalAnsGrpNum.getChildAt(0).frame + 1)) {
                borderboxc = 313;
                count = 0;
                currFrame = _this.finalAnsGrpNum.getChildAt(0).frame;
                for (q = 0; q < _this.finalAnsGrpNum.length - 1; q++) {
                    if ((_this.finalAnsGrpNum.getChildAt(q).frame != _this.finalAnsGrpNum.getChildAt(q + 1).frame) || ((q + 1) % (_this.finalAnsGrpNum.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.finalAnsGrpNum)) || (count == currFrame)) {
                        _this.makeRectBox(_this.finalAnsGrpNum.getChildAt(q).frame + 1, 419 - 20, borderboxc);
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
                _this.makeRectBox(_this.finalAnsGrpNum.getChildAt(q).frame + 1, 419 - 20, borderboxc);
                _this.finalBorder.addChild(_this.graphics);

            }
            _this.world.bringToTop(_this.finalBorder);

            _this.time.events.add(500, () => {
                _this.addNumberPad();
                _this.finalPart = true;
                _this.questionBox2.destroy();
                _this.yelloBox5.destroy();
                _this.pSign1.destroy();
                _this.blueeqsign.destroy();
                _this.changeQuesBox2();
            })

        })
    },
    checkAllSameBoxes: function (grp) {
        for (m = 0; m < grp.length - 1; m++) {
            if (grp.getChildAt(m).frame != grp.getChildAt(m + 1).frame) {
                return false;
            }
        }
        return true;
    },
    makeRectBox: function (x, y, z) {
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
    plusSignBlue: function (x, y) {
        console.log("plusSignBlue")
        _this.aPlus = [];
        _this.bPlus = [];
        _this.pSign1 = _this.add.graphics();
        _this.pSign1.lineStyle(4, 0x65B4C3);
        _this.pSign1.moveTo(x, y);
        _this.pSign1.lineTo(x + 16, y);

        _this.pSign2 = _this.add.graphics();
        _this.pSign2.lineStyle(4, 0x65B4C3);
        _this.pSign2.moveTo(x + 8, y - 9);
        _this.pSign2.lineTo(x + 8, y + 17 - 9);

        _this.aPlus.push(_this.pSign1);
        _this.bPlus.push(_this.pSign2);
    },
    plusSign: function (x, y) {
        console.log("plusSign")
        _this.aPlus2 = [];
        _this.bPlus2 = [];
        _this.pSign1 = _this.add.graphics();
        _this.pSign1.lineStyle(4, 0xFF0000);
        _this.pSign1.moveTo(x, y);
        _this.pSign1.lineTo(x + 16, y);

        _this.pSign2 = _this.add.graphics();
        _this.pSign2.lineStyle(4, 0xFF0000);
        _this.pSign2.moveTo(x + 8, y - 9);
        _this.pSign2.lineTo(x + 8, y + 17 - 9);

        _this.aPlus2.push(_this.pSign1);
        _this.bPlus2.push(_this.pSign2);
    },
    minusSign: function (x, y) {
        console.log("minussign")
        // _this.aPlus2 = [];
        // _this.bPlus2 = [];
        _this.mSign1 = _this.add.graphics();
        _this.mSign1.lineStyle(4, 0xFF0000);
        _this.mSign1.moveTo(x, y);
        _this.mSign1.lineTo(x + 16, y);

        // _this.pSign2 = _this.add.graphics();
        // _this.pSign2.lineStyle(4, 0xFF0000);
        // _this.pSign2.moveTo(x + 8, y - 9);
        // _this.pSign2.lineTo(x + 8, y + 17 - 9);

        // _this.aPlus2.push(_this.pSign1);
        // _this.bPlus2.push(_this.pSign2);
    },
    minusSignBlue: function () {
        _this.minusBlueSign1 = _this.add.graphics();
        _this.minusBlueSign1.lineStyle(4, 0x65B4C3);
        // _this.minusBlueSign3.fill = '#65B4C3';
        _this.minusBlueSign1.moveTo(x, y);
        _this.minusBlueSign1.lineTo(x + 16, y);
    },
    minusSignBlue2: function () {
        _this.minusBlueSign2 = _this.add.graphics();
        _this.minusBlueSign2.lineStyle(4, 0x65B4C3);
        // _this.minusBlueSign3.fill = '#65B4C3';
        _this.minusBlueSign2.moveTo(x, y);
        _this.minusBlueSign2.lineTo(x + 16, y);
    },
    minusSignBlue3: function () {
        _this.minusBlueSign3 = _this.add.graphics();
        _this.minusBlueSign3.lineStyle(4, 0x65B4C3);
        // _this.minusBlueSign3.fill = '#65B4C3';
        _this.minusBlueSign3.moveTo(x, y);
        _this.minusBlueSign3.lineTo(x + 16, y);
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
        _this.pSign1.destroy();
        _this.pSign2.destroy();
        _this.blueeqsign2.destroy();
        _this.ans1Grpcpys1.destroy();
        _this.ans2Grpcpys1.destroy();
        _this.ans3Grpcpys1.destroy();
        _this.ans4Grpcpys1.destroy();
        _this.AnswerBox.destroy();
        _this.AnswerBox1.destroy();
        _this.questionBox2.destroy();
        if (_this.count1 > 3) {
            _this.minusBlueSign.destroy();
            // _this.minusBlueSign1.destroy();
            _this.minusBlueSign2.destroy();
            _this.minusBlueSign3.destroy();
            _this.mSign1.destroy();
        }
        _this.finalAnsGrpDenom.destroy();
        _this.finalAnsGrpNum.destroy();
        _this.AnsBox.destroy();
        _this.plusBlueSign2.destroy();

        _this.yelloBox6.destroy();
        _this.questionBox3.destroy();
        _this.aPlus.forEach(element => {
            //console.log("deleting dragged obj");
            element.destroy();
        });
        _this.bPlus.forEach(element => {
            //console.log("deleting dragged obj");
            element.destroy();
        });
        _this.aPlus2.forEach(element => {
            //console.log("deleting dragged obj");
            element.destroy();
        });
        _this.bPlus2.forEach(element => {
            //console.log("deleting dragged obj");
            element.destroy();
        });
        _this.cPlus.forEach(element => {
            //console.log("deleting dragged obj");
            element.destroy();
        });
        _this.dPlus.forEach(element => {
            //console.log("deleting dragged obj");
            element.destroy();
        });
        _this.pSign1.destroy();
        _this.pSign2.destroy();
        _this.questionBox2.destroy();
        _this.finalAnsGrpDenom.destroy();
        _this.finalAnsGrpNum.destroy();
        _this.AnsBox.destroy();
        _this.sideGray.destroy();
        _this.box1Display.destroy();
        _this.box2Display.destroy();
        _this.textBox.destroy();
        _this.RedeqtextBox.destroy();
        _this.numGroup.destroy();
        _this.yelloBox5.destroy();
        _this.pSign11.destroy();
        _this.pSign21.destroy();
        _this.blueeqsign.destroy();
        _this.questionBox.destroy();
        _this.eraser.destroy();
        _this.finalBorder.destroy();
        _this.finalBorderDenom.destroy();
        _this.borderBox1.destroy();
        _this.borderBox2.destroy();
        _this.borderBox3.destroy();
        _this.borderBox4.destroy();

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
        if (_this.count1 <= 2) {
            _this.Question_flag = 0;
        }
        else {
            _this.Question_flag = 2;
        }
        if (_this.count1 < 5) {

            //edited for baseurl apk
            _this.noofAttempts++;
            telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);
            //..............

            console.log(_this.noofAttempts, "_this.noofAttempts.................");
            console.log(_this.AnsTimerCount, "_this.AnsTimerCount.................");
            console.log(_this.sceneCount, "_this.sceneCount.................");
            console.log(_this.questionid, "_this.questionid.................");


            _this.celebrationSound.play();
            _this.starActions(_this.count1);
            _this.time.events.add(2000, _this.ClearAll);
            _this.time.events.add(3000, _this.MakeSideBar);

        }
        else {
            //edited for baseurl apk
            _this.noofAttempts++;
            telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);
            //..............

            console.log(_this.noofAttempts, "_this.noofAttempts.................");
            console.log(_this.AnsTimerCount, "_this.AnsTimerCount.................");
            console.log(_this.sceneCount, "_this.sceneCount.................");
            console.log(_this.questionid, "_this.questionid.................");


            _this.celebrationSound.play();
            _this.starActions(_this.count1);
            _this.time.events.add(2000, _this.ClearAll);
            _this.time.events.add(2500, () => {
                _this.state.start('score', true, false, gameID, _this.microConcepts);
            })
        }
    },
    starActions: function (target) {
        //edited for baseurl apk
        _this.AnsTimerCount = 0;//total time
        _this.microConcepts = "Number SystemsG7";

        console.log("starActions")
        starAnim = _this.starsGroup.getChildAt(_this.count1);
        starAnim.smoothed = false;
        anim = starAnim.animations.add('star');
        _this.count1++;
        anim.play();
    },


    shutdown: function () {
        _this.stopVoice();
        //RI.gotoEndPage();
        //telInitializer.tele_end();
    },

    DemoVideo: function () {


        // Placed the cuisenaire rods for the first  number
        _this.demoAudio1 = document.createElement('audio');
        _this.demoAudio1src = document.createElement('source');
        _this.demoAudio1src.setAttribute("src", window.baseUrl + "questionSounds/NSF-ADSB-G7/" + _this.languageSelected + "/NSF_ADSB_G7_d1.mp3");
        _this.demoAudio1.appendChild(_this.demoAudio1src);

        // /Placed the cuisenaire rods for the second  number
        _this.demoAudio2 = document.createElement('audio');
        _this.demoAudio2src = document.createElement('source');
        _this.demoAudio2src.setAttribute("src", window.baseUrl + "questionSounds/NSF-ADSB-G7/" + _this.languageSelected + "/NSF_ADSB_G7_d2.mp3");
        _this.demoAudio2.appendChild(_this.demoAudio2src);

        // place the  denominator of the first number 
        _this.demoAudio3 = document.createElement('audio');
        _this.demoAudio3src = document.createElement('source');
        _this.demoAudio3src.setAttribute("src", window.baseUrl + "questionSounds/NSF-ADSB-G7/" + _this.languageSelected + "/NSF_ADSB_G7_d3.mp3");
        _this.demoAudio3.appendChild(_this.demoAudio3src);

        //place the denominator of the  second number 
        _this.demoAudio4 = document.createElement('audio');
        _this.demoAudio4src = document.createElement('source');
        _this.demoAudio4src.setAttribute("src", window.baseUrl + "questionSounds/NSF-ADSB-G7/" + _this.languageSelected + "/NSF_ADSB_G7_d4.mp3");
        _this.demoAudio4.appendChild(_this.demoAudio4src);

        //place the numerator of the first number 
        _this.demoAudio5 = document.createElement('audio');
        _this.demoAudio5src = document.createElement('source');
        _this.demoAudio5src.setAttribute("src", window.baseUrl + "questionSounds/NSF-ADSB-G7/" + _this.languageSelected + "/NSF_ADSB_G7_d5.mp3");
        _this.demoAudio5.appendChild(_this.demoAudio5src);

        // place the numerator of the second number
        _this.demoAudio6 = document.createElement('audio');
        _this.demoAudio6src = document.createElement('source');
        _this.demoAudio6src.setAttribute("src", window.baseUrl + "questionSounds/NSF-ADSB-G7/" + _this.languageSelected + "/NSF_ADSB_G7_d6.mp3");
        _this.demoAudio6.appendChild(_this.demoAudio6src);

        //In addition both the numerators will arranged side by side
        _this.demoAudio7 = document.createElement('audio');
        _this.demoAudio7src = document.createElement('source');
        _this.demoAudio7src.setAttribute("src", window.baseUrl + "questionSounds/NSF-ADSB-G7/" + _this.languageSelected + "/NSF_ADSB_G7_d7.mp3");
        _this.demoAudio7.appendChild(_this.demoAudio7src);

        //In subtraction ,the 2nd number’s numerator gets subtracted by the first number’s numerator.
        _this.demoAudio8 = document.createElement('audio');
        _this.demoAudio8src = document.createElement('source');
        _this.demoAudio8src.setAttribute("src", window.baseUrl + "questionSounds/NSF-ADSB-G7/" + _this.languageSelected + "/NSF_ADSB_G7_d14.mp3");
        _this.demoAudio8.appendChild(_this.demoAudio8src);


        // QUESTION AUDIOS
        //add the fractions
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/NSF-ADSB-G7/" +
            _this.languageSelected + "/NSF_ADSB_G7_a1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        //Subtract the fractions
        _this.q2Sound = document.createElement('audio');
        _this.q2Soundsrc = document.createElement('source');
        _this.q2Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/NSF-ADSB-G7/" +
            _this.languageSelected + "/NSF_ADSB_G7_a2.mp3");
        _this.q2Sound.appendChild(_this.q2Soundsrc);

        // enter the answer
        _this.q3Sound = document.createElement('audio');
        _this.q3Soundsrc = document.createElement('source');
        _this.q3Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/NSF-ADSB-G7/" +
            _this.languageSelected + "/NSF_ADSB_G7_a3.mp3");
        _this.q3Sound.appendChild(_this.q3Soundsrc);


        _this.video_playing = 0;
        _this.showDemoVideo();  //* call the function to show the video

        //* skip button shown at the bottom when clicked dlete all the demo vedio added will be deleted also the sudis will be stopped
        //* skip btn will be deleted
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
            if (_this.hintBtn) {
                _this.hintBtn.inputEnabled = true;
                _this.hintBtn.input.useHandCursor = true;
            }

            _this.game.paused = false;  //* restart the game
        });
    },

    stopAudio: function () {
        //* clear all the timers first

        if (_this.q2Timer) clearTimeout(_this.q2Timer);
        if (_this.q3Timer) clearTimeout(_this.q3Timer);
        if (_this.q4Timer) clearTimeout(_this.q4Timer);
        if (_this.demoAudio1Timer) clearTimeout(_this.demoAudio1Timer);
        if (_this.demoAudio2Timer) clearTimeout(_this.demoAudio2Timer);
        if (_this.demoAudio3Timer) clearTimeout(_this.demoAudio3Timer);
        if (_this.demoAudio4Timer) clearTimeout(_this.demoAudio4Timer);
        if (_this.demoAudio5Timer) clearTimeout(_this.demoAudio5Timer);
        if (_this.demoAudio6Timer) clearTimeout(_this.demoAudio6Timer);
        if (_this.demoAudio7Timer) clearTimeout(_this.demoAudio7Timer);
        if (_this.demoAudio11Timer) clearTimeout(_this.demoAudio11Timer);
        if (_this.demoAudio22Timer) clearTimeout(_this.demoAudio22Timer);
        if (_this.demoAudio33Timer) clearTimeout(_this.demoAudio33Timer);
        if (_this.demoAudio44Timer) clearTimeout(_this.demoAudio44Timer);
        if (_this.demoAudio55Timer) clearTimeout(_this.demoAudio55Timer);
        if (_this.demoAudio66Timer) clearTimeout(_this.demoAudio66Timer);
        if (_this.demoAudio88Timer) clearTimeout(_this.demoAudio88Timer);


        if (_this.demoAudio1) {
            console.log("removing the demo audio1");
            _this.demoAudio1.pause();
            _this.demoAudio1 = null;
            _this.demoAudio1src = null;
        }

        if (_this.demoAudio2) {
            console.log("removing the demo audio2");
            _this.demoAudio2.pause();
            _this.demoAudio2 = null;
            _this.demoAudio2src = null;
        }


        if (_this.q1Sound) {
            console.log("removing the q1");
            _this.q1Sound.pause();
            _this.q1Sound = null;
            _this.q1Soundsrc = null;
        }

        if (_this.demoAudio3) {
            console.log("removing the demo audio3");
            _this.demoAudio3.pause();
            _this.demoAudio3 = null;
            _this.demoAudio3src = null;
        }

        if (_this.demoAudio4) {
            console.log("removing the demo audio4");
            _this.demoAudio4.pause();
            _this.demoAudio4 = null;
            _this.demoAudio4src = null;
        }
        if (_this.demoAudio5) {
            console.log("removing the demo audio5");
            _this.demoAudio5.pause();
            _this.demoAudio5 = null;
            _this.demoAudio5src = null;
        }

        if (_this.demoAudio6) {
            console.log("removing the demo audio6");
            _this.demoAudio6.pause();
            _this.demoAudio6 = null;
            _this.demoAudio6src = null;
        }
        if (_this.demoAudio7) {
            console.log("removing the demo audio7");
            _this.demoAudio7.pause();
            _this.demoAudio7 = null;
            _this.demoAudio7src = null;
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

        if (_this.demoAudio8) {
            console.log("removing the demo audio8");
            _this.demoAudio8.pause();
            _this.demoAudio8 = null;
            _this.demoAudio8src = null;
        }

        _this.skip.events.onInputDown.removeAll();
        _this.skip.destroy();                //* skip button destroyed

    },

    dA8: function () {
        _this.demoVideo_2.playbackRate = 1;   //*play the video
    },

    dA7: function () {
        _this.demoVideo_1.playbackRate = 1;    //*play the video
    },

    dA4: function () {
        _this.demoAudio7.play();
    },

    dA5: function () {
        _this.demoAudio8.play();
        _this.demoAudio8.addEventListener('ended', _this.dA9);   //* play q3sound as soon as dv8 ends

    },

    dA9: function () {
        console.log("q3Sound");
        _this.q2Sound.play();
    },

    showDemoVideo: function () {

        _this.demoVideo_1 = _this.add.video('nsfadsb_1');
        _this.demoVideo_1.play(false);
        _this.demoVideo_1.changeSource(window.baseUrl + "assets/demoVideos/NSF-ADSB-G7_1.mp4");
        _this.video_playing = 1;
        _this.videoWorld_1 = _this.demoVideo_1.addToWorld();

        _this.q1Sound.play();  //* play q1 sound as soon as video starts

        _this.demoAudio1Timer = setTimeout(function ()    //* Start dv1 after 4 seconds
        {
            console.log("demoAudio1");
            clearTimeout(_this.demoAudio1Timer);         //* clear the time once its used.
            _this.demoAudio1.play();
        }, 4000);

        _this.demoAudio2Timer = setTimeout(function ()    //* Start dv2 after 14.5 seconds
        {
            console.log("demoAudio2");
            clearTimeout(_this.demoAudio2Timer);         //* clear the time once its used.
            _this.demoAudio2.play();
        }, 14500);

        _this.demoAudio3Timer = setTimeout(function ()    //* Start dv3 after 29.1 seconds
        {
            console.log("demoAudio3");
            clearTimeout(_this.demoAudio3Timer);         //* clear the time once its used.
            _this.demoAudio3.play();
        }, 29100);

        _this.demoAudio4Timer = setTimeout(function ()    //* Start dv4 after 35.6 seconds
        {
            console.log("demoAudio4");
            clearTimeout(_this.demoAudio4Timer);        //* clear the time once its used.
            _this.demoAudio4.play();
        }, 35600);

        _this.demoAudio5Timer = setTimeout(function ()    //* Start dv5 after 39.5 seconds
        {
            console.log("demoAudio5");
            clearTimeout(_this.demoAudio5Timer);       //* clear the time once its used.
            _this.demoAudio5.play();
        }, 39500);

        _this.demoAudio6Timer = setTimeout(function ()    //* Start dv6 after 42.8 seconds
        {
            console.log("demoAudio6");
            clearTimeout(_this.demoAudio6Timer);       //* clear the time once its used.
            _this.demoAudio6.play();
        }, 42800);
        _this.demoAudio6.addEventListener('ended', _this.dA4);

        // _this.q3Timer = setTimeout(function ()    //* Start q3sound after 50 seconds
        // {
        //     console.log("q3Sound");
        //     clearTimeout(_this.q3Timer);         //* clear the time once its used.
        //     _this.q3Sound.play();
        // }, 50000);
        _this.q2Timer = setTimeout(function ()    //* play q1sound in 0.1 second
        {
            console.log("q2Sound");
            clearTimeout(_this.q2Timer);        //* clear the time once its used.
            _this.q2Sound.play();
        }, 50000);

        _this.demoVideo_1.onComplete.add(function () {
            _this.demoVideo_2 = _this.add.video('nsfadsb_2');
            _this.demoVideo_2.play(false);
            _this.demoVideo_2.changeSource(window.baseUrl + "assets/demoVideos/NSF-ADSB-G7_2.mp4");  //* phaser needs this.to run in mobile
            _this.video_playing = 2;
            _this.videoWorld_2 = _this.demoVideo_2.addToWorld();

            _this.skip.bringToTop();
            _this.q3Sound.play();
            _this.demoAudio6.removeEventListener('ended', _this.dA4); //* remove event listener for dv6 since we are using it again  

            _this.demoAudio11Timer = setTimeout(function ()    //* play dv1 in 3.5 second
            {
                console.log("demoAudio1");
                clearTimeout(_this.demoAudio11Timer);         //* clear the time once its used.
                _this.demoAudio1.play();
            }, 2000);


            _this.demoAudio22Timer = setTimeout(function ()    //* play dv2 in 17.4 second
            {
                console.log("demoAudio2");
                clearTimeout(_this.demoAudio22Timer);         //* clear the time once its used.
                _this.demoAudio2.play();
            }, 15500);

            _this.demoAudio33Timer = setTimeout(function ()    //* play dv3 in 27 second
            {
                console.log("demoAudio3");
                clearTimeout(_this.demoAudio33Timer);          //* clear the time once its used.
                _this.demoAudio3.play();
            }, 27000);

            _this.demoAudio44Timer = setTimeout(function ()    //* play dv4 in 30.7 second
            {
                console.log("demoAudio4");
                clearTimeout(_this.demoAudio44Timer);         //* clear the time once its used.
                _this.demoAudio4.play();
            }, 30750);

            _this.demoAudio55Timer = setTimeout(function ()      //* play dv5 in 35.5 second
            {
                console.log("demoAudio5");
                clearTimeout(_this.demoAudio55Timer);            //* clear the time once its used.
                _this.demoAudio5.play();
            }, 33500);

            _this.demoAudio66Timer = setTimeout(function ()     //* play dv6 in 36 second 
            {
                console.log("demoAudio6");
                clearTimeout(_this.demoAudio66Timer);          //* clear the time once its used.
                _this.demoAudio6.play();
            }, 36000);
            _this.demoAudio6.addEventListener('ended', _this.dA5); //* play dv8 as soon as dv6 ends

            //*If ENG audio is smaller than expected use below code.
            // _this.q4Timer = setTimeout(function () 
            // {
            //     clearTimeout(_this.q4Timer);         //* clear the time once its used.
            //     _this.q3Sound.play();
            // }, 44500);

            _this.demoVideo_2.onComplete.add(function () {
                //console.log("demovideo 2 completed......!!!1")
                _this.stopAudio();
                _this.demoVideo_2.stop(false);
                _this.demoVideo_1.stop(false);
                _this.videoWorld_1.destroy();
                _this.videoWorld_2.destroy();
                if (_this.hintBtn) {
                    _this.hintBtn.inputEnabled = true;
                    _this.hintBtn.input.useHandCursor = true;
                }
                _this.game.paused = false;

            });
        });
    }
}