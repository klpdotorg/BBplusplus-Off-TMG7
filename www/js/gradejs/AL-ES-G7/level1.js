Game.AL_ES_G7level1 = function () { };


Game.AL_ES_G7level1.prototype =
{

    init: function (game) {
        _this = this;

        _this.languageSelected = window.languageSelected;
        // _this.languageSelected = document.getElementById("LANGUAGE").innerHTML;

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

        _this.wrongSound = document.createElement('audio');
        _this.wrongSoundsrc = document.createElement('source');
        _this.wrongSoundsrc.setAttribute("src", window.baseUrl + "sounds/WrongCelebrationSound.mp3");
        _this.wrongSound.appendChild(_this.wrongSoundsrc);

        _this.counterCelebrationSound = document.createElement('audio');
        _this.counterCelebrationSoundsrc = document.createElement('source');
        _this.counterCelebrationSoundsrc.setAttribute("src", window.baseUrl + "sounds/counter_celebration.mp3");
        _this.counterCelebrationSound.appendChild(_this.counterCelebrationSoundsrc);


        _this.clungSound = document.createElement('audio');
        _this.clungSoundsrc = document.createElement('source');
        _this.clungSoundsrc.setAttribute("src", window.baseUrl + "sounds/clung.mp3");
        _this.clungSound.appendChild(_this.clungSoundsrc);

        _this.snapSound = document.createElement('audio');
        _this.snapSoundsrc = document.createElement('source');
        _this.snapSoundsrc.setAttribute("src", window.baseUrl + "sounds/Tap.mp3");
        _this.snapSound.appendChild(_this.snapSoundsrc);

        _this.SuccessSound = document.createElement('audio');
        _this.SuccessSoundsrc = document.createElement('source');
        _this.SuccessSoundsrc.setAttribute("src", window.baseUrl + "sounds/Success.mp3");
        _this.SuccessSound.appendChild(_this.SuccessSoundsrc);

        _this.SmallRewardSound = document.createElement('audio');
        _this.SmallRewardSoundsrc = document.createElement('source');
        _this.SmallRewardSoundsrc.setAttribute("src", window.baseUrl + "sounds/Small Reward.mp3");
        _this.SmallRewardSound.appendChild(_this.SmallRewardSoundsrc);

        _this.GamePositiveSound = document.createElement('audio');
        _this.GamePositiveSoundsrc = document.createElement('source');
        _this.GamePositiveSoundsrc.setAttribute("src", window.baseUrl + "sounds/Game Positive.mp3");
        _this.GamePositiveSound.appendChild(_this.GamePositiveSoundsrc);

        //edited for baseurl apk
        telInitializer.gameIdInit("AL_ES_G7", gradeSelected);// first Tele call
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
            _this.gameCreate();
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
        _this.wholeNoQues = -1;
        //* play the audio only once.( when answer is wrong, it does not repeat the audio)
        _this.audio_Q1_Played = false;
        _this.audio_Q2_Played = false;
        _this.audio_Q3_Played = false;
        //* show the drag action demo only once. dont repeat when answer given is wrong
        _this.dragActionShown = false;

        _this.speakerbtn;
        _this.background;
        _this.starsGroup;
        _this.text;
        _this.click;

        _this.seconds = 0;
        _this.minutes = 0;
        _this.counterForTimer = 0;
        _this.number;
        _this.selectedAns1 = '';

        _this.qn_flag = 0;
        _this.index2 = 0;

        _this.bigGreenStripCount = 0;
        _this.bigPinkStripCount = 0;
        _this.smallGreenCount = 0;
        _this.smallPinkCount = 0;
        _this.smallRightpinkCount = 0;
        _this.smallRightgreenCount = 0;

        _this.reArrangedArray = [];

        _this.speakerbtnClicked = false;
        _this.rightbtn_is_Clicked = false;

        _this.background = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'Bg new');
        _this.tickbtn = _this.add.sprite(812, 405, 'tickbtn');//812, 405
        _this.tickbtn.frame = 1;
        _this.tickbtn.visible = false;

        _this.navBar = _this.add.sprite(0, 0, 'navBar');

        _this.backbtn = _this.add.sprite(5, 6, 'backbtn');
        _this.backbtn.inputEnabled = true;
        _this.backbtn.input.useHandCursor = true;
        _this.backbtn.events.onInputDown.add(function () {

            _this.stopVoice();
            _this.time.events.removeAll();
            _this.backbtn.events.onInputDown.removeAll();
            _this.time.events.add(50, function () {
                _this.state.start('grade7Algebra', true, false);
            });
        });

        _this.speakerbtn = _this.add.sprite(600, 6, 'CommonSpeakerBtn');


        _this.speakerbtn.events.onInputDown.add(function () {
            ////// console.log("Hello");
            telInitializer.tele_interactEvent("TOUCH", "speaker");
            //telInitializer.tele_interactEvent("TOUCH", "speaker");
            if (_this.speakerbtnClicked == false && _this.rightbtn_is_Clicked == false) {
                _this.speakerbtn.inputEnabled = false;
                _this.speakerbtn.input.useHandCursor = false;
                _this.clickSound.play();
                // console.log("first time")

                // console.log(_this.qn_flag);
                if (_this.qn_flag == 0) {
                    // console.log("first voice note");
                    _this.askQn1();
                }
                else if (_this.qn_flag == 1) {
                    _this.askQn2();
                }
                else if (_this.qn_flag == 2) {
                    _this.askQn3();
                }
                _this.time.events.add(4000, function () {
                    _this.speakerbtnClicked = false;
                    _this.EnableVoice();
                });
            }

        }, _this);

        _this.enterTxt1 = null;
        _this.enterTxt2 = null;
        _this.enterTxt3 = null;
        _this.numGroup = _this.add.group();

        _this.boxesObj = [];
        _this.grayboxesObj = [];
        _this.grayboxes2Obj = [];

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
            // console.log("inside hintbutton function");
            //* show the demo video
            _this.hintBtn.inputEnabled = false;
            _this.hintBtn.input.useHandCursor = false;
            _this.time.events.add(1, function () {
                _this.ViewDemoVideo();
            });
        });

        _this.generateStarsForTheScene(6);
        _this.mybox3 = _this.add.image(655, 350, 'yellowtextbox');
        _this.mybox3.scale.setTo(1.0);
        _this.mybox3.visible = false;

        _this.time.events.add(2000, _this.getQuestion);

        _this.fractionX = [70, 160];
        _this.fraction2X = [285, 370];
        _this.fractionY = [90, 150, 210, 270];
        _this.fraction2Y = [90, 150, 210, 270];

        _this.denominator = false;
        _this.numerator = false;
        _this.numpad = 0;
        _this.wholeCnt = 0; //use for evaluation for whole ans
        _this.wrongAns = 0; //used for wrong answer for 1/4 to ask same 1/4 qn //we have to asset for 1/4 

        _this.objectCounter = 0; // To keep track of the dragged objects(car, cake, cup)

        //* AL-ES-G7 game .....//  
        _this.bigTileX = [290, 313, 336, 359, 382];
        _this.bigTileY = [170, 91];

        _this.smallTilePostionX = [405, 427, 449, 471, 405, 427, 449, 471, 405, 427, 449, 471, 405, 427, 449, 471, 405, 427, 449, 471, 405, 427, 449, 471, 405, 427, 449, 471, 405, 427, 449, 471];
        _this.smallTilePostionY = [227, 207.5, 188, 168.5, 149, 129.5, 110, 90.5];

        _this.smallRightTilePostionX = [700, 722, 744, 766, 788, 810, 832, 854, 876];
        _this.smallRightTilePostionY = [227, 207.5, 188, 168.5, 149, 129.5, 110, 90.5, 71];

        _this.newStripsX = [700, 722, 744, 766, 788, 810, 832, 854, 876];
        _this.newStripsY = [227, 207.5, 188, 168.5, 149, 129.5, 110, 90.5, 71];

        ////x =  723, 746,769,792,815,838,861,884
        _this.redLineX = [722, 744.5, 767, 789.5, 812, 834.5, 857, 879.5];
        _this.bigTileLineX = [312.5, 335, 357.5, 380, 402.5];

        _this.holdObjectArray = [];


        //* Add answer box to the top of the screen
        _this.answerBox = _this.add.sprite(755, 405, 'textbox3');
        _this.answerBox.scale.setTo(0.9);
        _this.answerBox.visible = false;
        _this.answerBox.frame = 1;

        //* declaring variable for original answer
        _this.originalAnswer = false;

        _this.tweenAarray = [];
        //_this.questionTypeArray = [];

        //* Intial position of the balance 
        _this.balanceLX = 65;
        _this.balanceLY = 274;
        _this.balanceRX = 335;
        _this.balanceRY = 274;

        _this.flip_flag = true;

        //* Gropus to hold the objects 

        _this.leftscaleGroup = _this.add.group();
        _this.rightscaleGroup = _this.add.group();

        _this.tweenInProgress = false;
    },

    //* function to enable the speaker button once pressed.
    EnableVoice: function () {
        ////// console.log("SBtn: " + _this.speakerbtnClicked + " RBtn: " + _this.rightbtnClicked);
        if (_this.speakerbtnClicked == false && _this.rightbtn_is_Clicked == false) {
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

    shuffle: function (array) {
        //// console.log('hi');
        var currentIndex = array.length, temporaryValue, randomIndex;
        //// console.log('_this.currentIndex');

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

    askQn1: function () {
        //// console.log("Subtract the second fraction from the first fraction");
        _this.Question1 = document.createElement('audio');
        _this.Question1src = document.createElement('source');
        _this.Question1src.setAttribute("src", window.baseUrl + "questionSounds/AL-ES-G7/" + _this.languageSelected + "/AL_ES_G7_a1.mp3");
        _this.Question1.appendChild(_this.Question1src);
        _this.Question1.play();
        // _this.Question1.addEventListener('ended', _this.askQn11);
    },

    //question 2
    askQn2: function () {
        //// console.log('Drag the remaining fraction pieces to the whole');
        _this.Question2 = document.createElement('audio');
        _this.Question2src = document.createElement('source');
        _this.Question2src.setAttribute("src", window.baseUrl + "questionSounds/AL-ES-G7/" + _this.languageSelected + "/AL_ES_G7_a2.mp3");
        _this.Question2.appendChild(_this.Question2src);
        _this.Question2.play();
    },

    askQn3: function () {
        //// console.log('Enter the answer');
        _this.Question3 = document.createElement('audio');
        _this.Question3src = document.createElement('source');
        _this.Question3src.setAttribute("src", window.baseUrl + "questionSounds/AL-ES-G7/" + _this.languageSelected + "/AL_ES_G7_a3.mp3");
        _this.Question3.appendChild(_this.Question3src);
        _this.Question3.play();
    },

    getQuestion: function () {
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
        _this.Initial_randomizing();
        _this.displayQuestions();


        if (_this.count1 == 0) {
            // console.log("Addition....")
            _this.askQn1();
            _this.qn_flag = 0;
        }

        if (_this.count1 == 0) {
            _this.time.events.add(5000, function () {
                _this.askQn2();
            })
        }
        _this.qn_flag = 1;

        //* hintbtn will be true when the game is playing
        _this.hintBtn.inputEnabled = true;
        _this.hintBtn.input.useHandCursor = true;
        _this.hint_flag = 1;

        //edited for baseurl apk
        _this.questionid = 1;

    },

    displayQuestions: function () {
        //edited for baseurl apk
        _this.sceneCount++;
        // _this.AnsTimerCount = 0;
        _this.noofAttempts = 0;
        //....

        //* Create needed number of groups and call displayObjectsOnScreen function to display the objects
        // console.log("Inside display Question......!")
        _this.noofTiles = 0;
        _this.noofRightTiles = 0;
        _this.greenBigTileGroup = _this.add.group();
        _this.greensmallTileGroup = _this.add.group();
        _this.reArrangedGrp = _this.add.group();
        _this.tweenGroup = _this.add.group();
        _this.pinkGreensmalTileGroup = _this.add.group();

        _this.displayObjectsOnScreen();
        _this.calculateDisplacementandAngle();
    },

    displayObjectsOnScreen: function () {

        //* Display Balance , and all neccessary objects on the screen

        weightScale2 = this.add.sprite(this.world.centerX + 120, 304, 'beam');
        weightScale2.scale.setTo(1);
        weightScale2.anchor.setTo(0.5, 0.5);
        weightScale2.angle = 0.000; //* Changed -=0 to = 0.000

        weightScale3 = this.add.sprite(270, 215, 'weight gauge part_1');
        weightScale3.scale.setTo(1);
        weightScale3.y += 0;
        _this.leftscaleGroup.add(weightScale3);

        weightScale4 = this.add.sprite(605, 215, 'weight gauge part_2');
        weightScale4.scale.setTo(1);
        weightScale4.y -= 0;
        _this.rightscaleGroup.add(weightScale4);

        weightScale1 = this.add.sprite(this.world.centerX + 120, 290, 'base');
        weightScale1.anchor.setTo(0.5, 0);

        //_this.obj = _this.add.image(405,330,"green3");
        //** Reding change box
        _this.readerBox1 = _this.add.image(370, 410, 'textbox2');
        _this.readerBox1.visible = false;
        _this.readerBox1.scale.setTo(1, 1);
        _this.readerBox2 = _this.add.image(680, 410, 'textbox2');
        _this.readerBox2.scale.setTo(0.7, 1);
        _this.readerBox2.visible = false;

        _this.aText;
        _this.bText;
        _this.cText;

        _this.EquationBox1 = _this.add.image(50, 342, 'textbox1');//textbox1
        _this.EquationBox1.scale.setTo(0.8, 0.8);
        let string;
        string = String(_this.AArray[_this.count1]) + _this.variableArray[_this.count1];//+_this.BArray[_this.count1]+"="+_this.CArray[_this.count1]

        if (_this.BArray[_this.count1] > 0)
            string = string + " " + "+" + _this.BArray[_this.count1];
        else if (_this.BArray[_this.count1] < 0)
            string = string + " " + _this.BArray[_this.count1];

        string = string + " " + "=" + " " + _this.CArray[_this.count1];

        //_this.questionText = _this.add.text(26, 19, string);
        if (_this.variableArray[_this.count1] == "m") {
            _this.EquationText = _this.add.text(35, 19, string);
        } else {
            _this.EquationText = _this.add.text(30, 19, string);
        }

        _this.applyingStyleBlue(_this.EquationText);
        _this.EquationBox1.addChild(_this.EquationText);

        //*gray panel ,Tiles and arrows
        _this.panel1 = _this.add.image(38, 120, 'panel');//210
        _this.panel2 = _this.add.image(150, 120, 'panel');//210
        _this.xvariable = _this.add.text(70, 125, "-" + _this.variableArray[_this.count1]);//215
        _this.applyingStyle(_this.xvariable);
        _this.positiveXvariable = _this.add.text(180, 125, "+" + _this.variableArray[_this.count1]);//215
        _this.applyingStyle(_this.positiveXvariable);

        _this.minusOne = _this.add.text(70, 260, "-1");//350
        _this.applyingStyle(_this.minusOne);
        _this.plusOne = _this.add.text(180, 260, "+1");//350
        _this.applyingStyle(_this.plusOne);

        _this.minusXTile = _this.add.image(73, 165, 'green2');//255
        _this.minuSmalTile = _this.add.image(73, 294, 'green3');//385
        _this.plustXtile = _this.add.image(185, 165, 'pink2');//255
        _this.pluSmallTile = _this.add.image(185, 294, 'pink3');//385

        //     _this.arrowMinus1 = _this.add.image(50, 185, 'arrow1');//* minus side left arrow//285
        //     _this.arrowMinus2 = _this.add.image(50, 285, 'arrow1');//* minus side -1 arrow//375
        //     _this.arrowPlus1 = _this.add.image(160, 185, 'arrow1'); //* plus side left arrow//285
        //     _this.arrowPlus2 = _this.add.image(160, 285, 'arrow1');

        //    // _this.arrowMinus3 = _this.add.image(100, 185, 'arrow2');// witgout any event//Y same as above
        //     _this.arrowMinus4 = _this.add.image(100, 285, 'arrow2');
        //    // _this.arrowPlus3 = _this.add.image(213, 185, 'arrow2');//without any event
        //     _this.arrowPlus4 = _this.add.image(213, 285, 'arrow2');

        _this.minusXTile.inputEnabled = true;
        _this.minusXTile.input.useHandCursor = true;
        _this.minusXTile.input.enableDrag(true);
        _this.minusXTile.events.onDragStop.add(function (target)//73, 165,
        {

            if (target.x > 200 && target.x < 520) {
                console.log(target.x, "Left side ..........!");
                _this.addGreenBigTile();
                _this.minusXTile.x = 73;
                _this.minusXTile.y = 165;
            } else {
                console.log(target.x, "None.........!");
                _this.minusXTile.x = 73;
                _this.minusXTile.y = 165;
            }
        })

        _this.plustXtile.inputEnabled = true;
        _this.plustXtile.input.useHandCursor = true;
        _this.plustXtile.input.enableDrag(true);
        _this.plustXtile.events.onDragStop.add(function (target) {
            if (target.x > 200 && target.x < 520) {
                console.log(target.x, "Left side ..........!");
                _this.addPinkBigTile();
                _this.plustXtile.x = 185;
                _this.plustXtile.y = 165;
            } else {
                console.log(target.x, "None.........!");
                _this.plustXtile.x = 185;
                _this.plustXtile.y = 165;
            }
        });

        _this.minuSmalTile.inputEnabled = true;
        _this.minuSmalTile.input.useHandCursor = true;
        _this.minuSmalTile.input.enableDrag(true);
        _this.minuSmalTile.events.onDragStop.add(function (target) {
            if (target.x > 200 && target.x < 520) {
                console.log(target.x, "Left side ..........!");
                _this.addGreenSmalTile();
                _this.minuSmalTile.x = 73;
                _this.minuSmalTile.y = 294;
            } else if (target.x > 520 && target.x < 890) {
                console.log(target.x, "Right Side .........!");
                _this.addsmalMinusTile();
                _this.minuSmalTile.x = 73;
                _this.minuSmalTile.y = 294;
            } else {
                console.log(target.x, "None.........!");
                _this.minuSmalTile.x = 73;
                _this.minuSmalTile.y = 294;
            }
        });

        _this.pluSmallTile.inputEnabled = true;
        _this.pluSmallTile.input.useHandCursor = true;
        _this.pluSmallTile.input.enableDrag(true);
        _this.pluSmallTile.events.onDragStop.add(function (target) {
            if (target.x > 200 && target.x < 520) {
                console.log(target.x, "Left side ..........!");
                _this.addPinkSmalTile();
                _this.pluSmallTile.x = 185;
                _this.pluSmallTile.y = 294;
            } else if (target.x > 520 && target.x < 890) {
                console.log(target.x, "Right Side .........!");
                _this.addsmalPlusTile();
                _this.pluSmallTile.x = 185;
                _this.pluSmallTile.y = 294;
            } else {
                console.log(target.x, "None.........!");
                _this.pluSmallTile.x = 185;
                _this.pluSmallTile.y = 294;
            }
        });


        _this.greenBigTileX = 0;
        _this.greenBigTileY = 0;

        _this.greenSmallTileX = 0;
        _this.greenSmallTileY = 0;// _this.greenSmallTileX= 405;
        //_this.greenSmallTileY= 227;

        _this.greenPinkSmallTileX = 0;
        _this.greenPinkSmallTileY = 0;

        _this.reSetX = 0;
        _this.reSetY = 0;

        _this.reSetBigX = 0;
        _this.reSetBigY = 0;

        _this.reSetRightX = 0;
        _this.reSetRightY = 0;

        _this.newStripX = 0
        _this.newStripY = 0;

        _this.addTilesX = 0;

        _this.x1 = 312.5;

        _this.reArrangeX = 0;
        _this.reArrangeY = 0
        _this.reArrangeXBigTileX = 0;
        _this.reArrangeXBigTileY = 0;

        _this.netWeight = 0;
        _this.netWeight2 = 0;
        _this.greenObjectCounter = 0;
        _this.pinkObjectCounter = 0;
        _this.greensmallObjectCounter = 0;
        _this.pinksmallObjectCounter = 0;
        _this.greensmallObjectCounter1 = 0;
        _this.pinksmallObjectCounter1 = 0;
    },
    //* Apply color and other styles to object if needed
    applyingStyleRed: function (target) {
        // console.log("applyingStyle")
        target.align = 'right';
        target.fontSize = 23;
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#FF0000';
        target.fontWeight = 'normal';
        target.visible = true;
    },

    applyingStyle: function (target) {
        // console.log("applyingStyle")
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#FF0000';
        target.fontWeight = 'normal';
        target.visible = true;
    },

    applyingStyleBlue: function (target) {
        // console.log("applyingStyle")
        target.align = 'right';
        target.fontSize = 28;
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.visible = true;
    },


    applyingStyleBlue2: function (target) {
        // console.log("applyingStyle")
        target.align = 'right';
        // target.fontSize = 22;
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.visible = true;
    },

    addGreenBigTile: function () {
        //* Adding Big Green Tile on to the balance
        _this.clickSound.play();
        if (_this.readerBox1.visible == false) _this.readerBox1.visible = true;

        if (_this.greenBigTileGroup.length > 9) {
            return;
        }
        if (_this.readerText) _this.readerText.destroy();

        _this.greenObjectCounter += 1;
        _this.greenTile = _this.add.image(_this.bigTileX[_this.greenBigTileX], _this.bigTileY[_this.greenBigTileY], 'green2');
        _this.greenTile.name = "bigGreen";
        _this.greenBigTileGroup.addChild(_this.greenTile);
        _this.bigGreenStripCount += 1;

        _this.readerText = _this.add.text(380, 425, "-" + _this.bigGreenStripCount + _this.variableArray[_this.count1]);//360,420
        _this.applyingStyleRed(_this.readerText);
        //_this.readerBox1.addChild(_this.readerText);
        _this.adjustLeftsideBalance();

        _this.removigObject();
        _this.leftscaleGroup.add(_this.greenBigTileGroup);
        _this.greenBigTileX++;
        // _this.nextBottleXidx++;
        if (_this.greenBigTileX >= 5) {
            _this.greenBigTileY++;
            _this.greenBigTileX = 0;
        }
    },

    addPinkBigTile: function () {
        //* Adding Big pink Tile on to the balance
        _this.clickSound.play();
        if (_this.readerBox1.visible == false) _this.readerBox1.visible = true;

        if (_this.greenBigTileGroup.length > 9) {
            return;
        }
        if (_this.readerText1) _this.readerText1.destroy();

        _this.pinkObjectCounter += 1;
        _this.pinkTile = _this.add.image(_this.bigTileX[_this.greenBigTileX], _this.bigTileY[_this.greenBigTileY], 'pink2');
        _this.pinkTile.name = "bigPink";
        _this.greenBigTileGroup.addChild(_this.pinkTile);
        _this.bigPinkStripCount += 1;

        _this.readerText1 = _this.add.text(420, 425, "+" + _this.bigPinkStripCount + _this.variableArray[_this.count1]);//360,420
        _this.applyingStyleRed(_this.readerText1);

        _this.adjustLeftsideBalance();


        _this.leftscaleGroup.add(_this.greenBigTileGroup);
        _this.removigObject();
        // console.log(_this.numCount2, "num counttttt");

        _this.greenBigTileX++;
        // _this.nextBottleXidx++;
        if (_this.greenBigTileX >= 5) {
            _this.greenBigTileY++;
            _this.greenBigTileX = 0;
        }
    },

    addGreenSmalTile: function () {
        //* Adding small Green Tile on to the balance
        // console.log("HIIIIII");
        _this.clickSound.play();
        if (_this.readerBox1.visible == false) _this.readerBox1.visible = true;

        if (_this.greensmallTileGroup.length > 31) {
            return;
        }
        if (_this.readerText2) _this.readerText2.destroy();

        _this.noofTiles += 1;
        _this.greensmallObjectCounter += 1;
        // console.log(_this.greenSmallTileY, "Y value Initiallyyy");
        _this.greenTile = _this.add.image(_this.smallTilePostionX[_this.greenSmallTileX], _this.smallTilePostionY[_this.greenSmallTileY], 'green3');
        _this.greenTile.name = "green";
        _this.greensmallTileGroup.addChild(_this.greenTile)
        _this.smallGreenCount += 1;

        _this.readerText2 = _this.add.text(470, 425, "-" + _this.smallGreenCount);//360,420
        _this.applyingStyleRed(_this.readerText2);

        _this.adjustLeftsideBalance();
        // console.log(_this.greensmallTileGroup.length, "Green small Tile Group...");
        _this.leftscaleGroup.add(_this.greensmallTileGroup);
        _this.removesmallLeftTile();

        _this.greenSmallTileX++;
        // _this.nextBottleXidx++;
        if (_this.greenSmallTileX >= 4) {
            _this.greenSmallTileY++;
            _this.greenSmallTileX = 0;
        }
    },

    addPinkSmalTile: function () {
        //* Adding small pink Tile on to the balance
        _this.clickSound.play();
        if (_this.readerBox1.visible == false) _this.readerBox1.visible = true;
        if (_this.greensmallTileGroup.length > 31) {
            return;
        }
        if (_this.readerText3) _this.readerText3.destroy();


        _this.pinksmallObjectCounter += 1;
        _this.pinkTile = _this.add.image(_this.smallTilePostionX[_this.greenSmallTileX], _this.smallTilePostionY[_this.greenSmallTileY], 'pink3');
        _this.pinkTile.name = "pink";
        _this.greensmallTileGroup.addChild(_this.pinkTile);
        _this.smallPinkCount += 1;

        _this.readerText3 = _this.add.text(510, 425, "+" + _this.smallPinkCount);//360,420
        _this.applyingStyleRed(_this.readerText3);

        _this.adjustLeftsideBalance();
        // console.log(_this.greensmallTileGroup.length, "pink small Tile Group...");

        _this.leftscaleGroup.add(_this.greensmallTileGroup);
        _this.removesmallLeftTile();
        _this.greenSmallTileX++;
        // _this.nextBottleXidx++;
        if (_this.greenSmallTileX >= 4) {
            _this.greenSmallTileY++;
            _this.greenSmallTileX = 0;
        }
    },

    addsmalMinusTile: function () {
        //* Adding small minus Green Tile on to right side of the balance
        _this.clickSound.play();
        if (_this.readerBox2.visible == false) _this.readerBox2.visible = true;

        if (_this.pinkGreensmalTileGroup.length > 71) {
            return;
        }
        if (_this.readerText4) _this.readerText4.destroy();
        //_this.noofRightTiles += 1;
        _this.greensmallObjectCounter1 += 1;
        _this.greenTile = _this.add.image(_this.smallRightTilePostionX[_this.greenPinkSmallTileX], _this.smallRightTilePostionY[_this.greenPinkSmallTileY], 'green3');
        _this.greenTile.name = "minusGreen";
        _this.pinkGreensmalTileGroup.addChild(_this.greenTile);
        _this.holdObjectArray.push(_this.greenTile);
        _this.smallRightgreenCount += 1;

        _this.readerText4 = _this.add.text(700, 425, "-" + _this.smallRightgreenCount);//360,420
        _this.applyingStyleRed(_this.readerText4);
        _this.adjustLeftsideBalance();
        // console.log(_this.pinkGreensmalTileGroup.length, "Green small Tile Group...");

        _this.rightscaleGroup.add(_this.pinkGreensmalTileGroup);
        _this.removesmallRightTiles();

        _this.greenPinkSmallTileX++;

        if (_this.greenPinkSmallTileX >= 9) {
            _this.greenPinkSmallTileY++;
            _this.greenPinkSmallTileX = 0;
        }
    },

    addsmalPlusTile: function () {
        //* Adding small minus pink Tile on to right side of the balance
        _this.clickSound.play();
        if (_this.readerBox2.visible == false) _this.readerBox2.visible = true;

        if (_this.pinkGreensmalTileGroup.length > 71) {
            return;
        }
        if (_this.readerText5) _this.readerText5.destroy();
        //_this.noofRightTiles += 1;
        _this.pinksmallObjectCounter1 += 1;
        _this.pinkTile = _this.add.image(_this.smallRightTilePostionX[_this.greenPinkSmallTileX], _this.smallRightTilePostionY[_this.greenPinkSmallTileY], 'pink3');
        _this.pinkTile.name = "plusPink";
        _this.pinkGreensmalTileGroup.addChild(_this.pinkTile);
        _this.holdObjectArray.push(_this.pinkTile);
        _this.smallRightpinkCount += 1;

        _this.readerText5 = _this.add.text(740, 425, "+" + _this.smallRightpinkCount);//360,420
        _this.applyingStyleRed(_this.readerText5);

        _this.adjustLeftsideBalance();
        // console.log(_this.pinkGreensmalTileGroup.length, "Green small Tile Group...");
        _this.rightscaleGroup.add(_this.pinkGreensmalTileGroup);

        _this.removesmallRightTiles();

        _this.greenPinkSmallTileX++;

        if (_this.greenPinkSmallTileX >= 9) {
            _this.greenPinkSmallTileY++;
            _this.greenPinkSmallTileX = 0;
        }
    },

    calculateDisplacementandAngle: function () {
        //* 9 is the max number of big strips in the left side of the balance.
        //* where 104 = 32+72(rightside) 32 is the max no of small square in the left side and 72 on the right side
        //* we have Y(term) stored in (_this.DArray[_this.count1]) array

        //* This function will called for each question since our equation changes we need to find find max weight each time 
        //* and Y displace ment of the balance(_this.Y_Unit_Px) and the angle of the beam(_this.Angle_Unit)
        //* If Y is positive:     (if Y > 0) //* Y nothing but the term we should find 
        //*Max Weight: 9*Y+104   

        //*If Y is negative:    (if Y <0)
        //*Max Weight:  9*-(Y)+104

        //*Y_Unit_Px = 30 / Max_Weight
        //*Angle_Unit = 11 / Max_Weight

        //* _this.Y_Unit_Px = per object Y displacment
        //* _this.Angle_Unit = perobject Angle displacment

        if (_this.DArray[_this.count1] < 0) {
            console.log("y<0 max wei")
            _this.MaxWeight = 9 * -(_this.DArray[_this.count1]) + 104;
        } else {
            console.log("y>0 max wei")
            _this.MaxWeight = 9 * (_this.DArray[_this.count1]) + 104;
        }


        _this.Y_Unit_Px = 30 / _this.MaxWeight;
        _this.Angle_Unit = 11 / _this.MaxWeight;

        //* round up the values upto 3 decimal point 
        _this.Y_Unit_Px = Number((_this.Y_Unit_Px).toFixed(3));
        _this.Angle_Unit = Number((_this.Angle_Unit).toFixed(3));

        console.log(_this.MaxWeight, "MaxWeight tho");
        console.log(_this.Y_Unit_Px, "Y Displacement");
        console.log(_this.Angle_Unit, "bar Angle displacemnt");
    },


    removesmallLeftTile: function (target) {

        //* This function removes the small squares which is dragged from the left side of the balance
        //* and rearranges the same grp.

        for (k = 0; k < _this.greensmallTileGroup.length; k++) {
            _this.greensmallTileGroup.getChildAt(k).inputEnabled = true;
            _this.greensmallTileGroup.getChildAt(k).input.enableDrag(true);
            _this.greensmallTileGroup.getChildAt(k).input.useHandCursor = true;
            _this.greensmallTileGroup.getChildAt(k).events.onDragStop.add(function (target) {
                if (target.name == "green") {
                    _this.greensmallObjectCounter -= 1;
                    _this.smallGreenCount -= 1;
                    if (_this.readerText2) _this.readerText2.destroy();
                    if (_this.smallGreenCount == 0) {
                        // console.log("its zero")
                    } else {
                        _this.readerText2 = _this.add.text(470, 425, "-" + _this.smallGreenCount);//360,420
                        _this.applyingStyleRed(_this.readerText2);
                    }

                } else {
                    _this.pinksmallObjectCounter -= 1;
                    _this.smallPinkCount -= 1;
                    if (_this.readerText3) _this.readerText3.destroy();
                    if (_this.smallPinkCount == 0) {
                        // console.log("its zero")
                    } else {
                        _this.readerText3 = _this.add.text(510, 425, "+" + _this.smallPinkCount);//360,420
                        _this.applyingStyleRed(_this.readerText3);
                    }
                }

                target.destroy();
                _this.adjustBalanaceback();
                _this.greenSmallTileX--;


                reArrangesquare = _this.greensmallTileGroup;
                _this.reArrangeTheGroup();

                if (_this.greenSmallTileX < 0) {
                    _this.greenSmallTileY--;
                    _this.greenSmallTileX = 3;
                }

            })
        }
    },

    reArrangeTheGroup: function () {
        // * Rearrange left small squares grp.
        for (i = 0; i < reArrangesquare.length; i++) {

            // (_this.smallTilePostionX[_this.reSetX],_this.smallTilePostionY[_this.reSetY], .name);
            reArrangesquare.getChildAt(i).x = _this.smallTilePostionX[_this.reSetX];
            reArrangesquare.getChildAt(i).y = _this.smallTilePostionY[_this.reSetY];

            _this.reSetX++;
            if (_this.reSetX >= 4) {
                _this.reSetY++;
                _this.reSetX = 0;
            }
        }
        _this.reSetX = 0;
        _this.reSetY = 0;
    },

    removigObject: function () {

        //* This function removes the big Strips which is dragged from the left side of the balance
        //* and rearranges the same grp.

        for (s = 0; s < _this.greenBigTileGroup.length; s++) {
            // console.log("remooooov////");
            _this.greenBigTileGroup.getChildAt(s).inputEnabled = true;
            _this.greenBigTileGroup.getChildAt(s).input.enableDrag(true);
            _this.greenBigTileGroup.getChildAt(s).input.useHandCursor = true;
            _this.greenBigTileGroup.getChildAt(s).events.onDragStop.add(function (target) {

                if (target.name == "bigGreen") {
                    // console.log("Big Green --------------");
                    _this.greenObjectCounter -= 1;
                    _this.bigGreenStripCount -= 1;
                    if (_this.readerText) _this.readerText.destroy();
                    if (_this.bigGreenStripCount == 0) {
                        // console.log("its zero")
                    } else {
                        _this.readerText = _this.add.text(380, 425, "-" + _this.bigGreenStripCount + _this.variableArray[_this.count1]);//360,420
                        _this.applyingStyleRed(_this.readerText);
                    }

                } else {
                    _this.pinkObjectCounter -= 1;
                    _this.bigPinkStripCount -= 1;
                    if (_this.readerText1) _this.readerText1.destroy();
                    if (_this.bigPinkStripCount == 0) {
                        // console.log("its zero")
                    } else {
                        _this.readerText1 = _this.add.text(420, 425, "+" + _this.bigPinkStripCount + _this.variableArray[_this.count1]);//360,420
                        _this.applyingStyleRed(_this.readerText1);
                    }
                }


                target.destroy();
                _this.adjustBalanaceback();
                _this.greenBigTileX--;

                reArrangestrip = _this.greenBigTileGroup;
                _this.reArrangeTheBigGroup();

                if (_this.greenBigTileX < 0) {
                    _this.greenBigTileY--;
                    _this.greenBigTileX = 4;
                }
            });

        }//this.greensmallTileGroup.getChildAt(k).events.onDragStop.add(function(target)

    },

    reArrangeTheBigGroup: function () {
        //* Rearranges the big strip grp in the left side of the balance
        // console.log(reArrangestrip.length,"Arrrrrrrrrrrange");
        for (i = 0; i < reArrangestrip.length; i++) {
            reArrangestrip.getChildAt(i).x = _this.bigTileX[_this.reSetBigX];
            reArrangestrip.getChildAt(i).y = _this.bigTileY[_this.reSetBigY];

            _this.reSetBigX++;
            if (_this.reSetBigX >= 5) {
                _this.reSetBigY++;
                _this.reSetBigX = 0;
            }
        }
        _this.reSetBigX = 0;
        _this.reSetBigY = 0;
    },

    removesmallRightTiles: function () {
        //* This function removes the small squares which is dragged from the right side of the balance
        //* and rearranges the same grp.
        for (l = 0; l < _this.pinkGreensmalTileGroup.length; l++) {

            _this.pinkGreensmalTileGroup.getChildAt(l).inputEnabled = true;
            _this.pinkGreensmalTileGroup.getChildAt(l).input.enableDrag(true);
            _this.pinkGreensmalTileGroup.getChildAt(l).input.useHandCursor = true;
            _this.pinkGreensmalTileGroup.getChildAt(l).events.onDragStop.add(function (target) {
                if (target.name == "minusGreen") {
                    _this.greensmallObjectCounter1 -= 1;
                    _this.smallRightgreenCount -= 1;
                    if (_this.readerText4) _this.readerText4.destroy();
                    if (_this.smallRightgreenCount == 0) {
                        // console.log("its zero again")
                    } else {
                        _this.readerText4 = _this.add.text(700, 425, "-" + _this.smallRightgreenCount);//360,420
                        _this.applyingStyleRed(_this.readerText4);
                    }

                } else {
                    _this.pinksmallObjectCounter1 -= 1;
                    _this.smallRightpinkCount -= 1;
                    if (_this.readerText5) _this.readerText5.destroy();
                    if (_this.smallRightpinkCount == 0) {

                    } else {
                        _this.readerText5 = _this.add.text(740, 425, "+" + _this.smallRightpinkCount);//360,420
                        _this.applyingStyleRed(_this.readerText5);
                    }
                }

                target.destroy();
                _this.adjustBalanaceback();
                _this.greenPinkSmallTileX--;

                reArrangesmallSquare = _this.pinkGreensmalTileGroup;
                _this.reArrangeTheSmallGroup();

                if (_this.greenPinkSmallTileX < 0) {
                    _this.greenPinkSmallTileY--;
                    _this.greenPinkSmallTileX = 8;
                }
            });
        }
    },

    reArrangeTheSmallGroup: function () {
        //* Rearranges the right side grp of the balanace.
        // console.log(reArrangesmallSquare.length,"Arrrrrrrrrrrange");
        for (i = 0; i < reArrangesmallSquare.length; i++) {

            reArrangesmallSquare.getChildAt(i).x = _this.smallRightTilePostionX[_this.reSetRightX];
            reArrangesmallSquare.getChildAt(i).y = _this.smallRightTilePostionY[_this.reSetRightY];

            _this.reSetRightX++;
            if (_this.reSetRightX >= 9) {
                _this.reSetRightY++;
                _this.reSetRightX = 0;
            }
        }
        _this.reSetRightX = 0;
        _this.reSetRightY = 0;
    },

    checkOverlap: function (spriteA, spriteB) {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },

    adjustLeftsideBalance: function () {

        //* Based on the net weight we will find Y ( vertical displacement of the left balance) and Angle (beam of the balance)
        //* Maximum displacement is 11 digrees & 30 Y value // max displacement
        //*AL-ES-G7
        // If Y is positive:               (if Y > 0)
        // Net Weight: C*y – G*y + K – M + N :   
        // (C number of Pink strips - G number of Green Strips + K pink squares – S green squares – M pink square + N green square)

        // If Y is negative:              (if Y <0)
        // Net Weight: C*(y) - G*(y) + K – M + N
        // (C number of Pink strips - G number of Green Strips + K pink squares – S green squares – M pink square + N green square)
        //* _this.leftscaleGroup.y = this is the Y displacement for left side balance 
        //*_this.rightscaleGroup.y = this is the Y displacement for right side balance
        //*  weightScale2.angle  = this is the angle displacement of the beam
        //*_this.prevnetWeight will store the previous netweight.
        //*_this.diffnetWeight will give the current netweight everytime by subtracting _this.netWeight - _this.prevnetWeight

        _this.equalizeTheBalance(); //* Will display Tick if the equation is matched

        _this.prevnetWeight = _this.netWeight; //* save the previous net weight.
        if (_this.DArray[_this.count1] < 0) {
            console.log("negetive Y")
            _this.netWeight = _this.pinkObjectCounter * (_this.DArray[_this.count1]) - _this.greenObjectCounter * (_this.DArray[_this.count1])
                + _this.pinksmallObjectCounter - _this.greensmallObjectCounter - _this.pinksmallObjectCounter1 + _this.greensmallObjectCounter1;
        }
        else {
            console.log("positive Y")
            _this.netWeight = _this.pinkObjectCounter * _this.DArray[_this.count1] - _this.greenObjectCounter * _this.DArray[_this.count1]
                + _this.pinksmallObjectCounter - _this.greensmallObjectCounter - _this.pinksmallObjectCounter1 + _this.greensmallObjectCounter1;
        }

        console.log(_this.netWeight, ".....netWeight !!")

        _this.diffnetWeight = _this.netWeight - _this.prevnetWeight;
        console.log(_this.diffnetWeight, ".....diffnetWeight !!!!!")

        _this.leftscaleGroup.y = _this.leftscaleGroup.y + _this.Y_Unit_Px * _this.diffnetWeight;
        _this.rightscaleGroup.y = _this.rightscaleGroup.y - _this.Y_Unit_Px * _this.diffnetWeight;
        weightScale2.angle = weightScale2.angle - _this.Angle_Unit * _this.diffnetWeight;

    },

    adjustBalanaceback: function () {
        //* When you remove objects from the balance you will call balance back to bring balance to the previous position
        //* Here also we will find netweight and adjust balance according the netweight.
        // If Y is positive:               (if Y > 0)
        // Net Weight: C*y – G*y + K – M + N :   
        // (C number of Pink strips - G number of Green Strips + K pink squares – S green squares – M pink square + N green square)

        // If Y is negative:              (if Y <0)
        // Net Weight: C*(y) - G*(y) + K – M + N
        // (C number of Pink strips - G number of Green Strips + K pink squares – S green squares – M pink square + N green square)
        //* _this.leftscaleGroup.y = this is the Y displacement for left side balance 
        //*_this.rightscaleGroup.y = this is the Y displacement for right side balance
        //*  weightScale2.angle  = this is the angle displacement of the beam
        //*_this.prevnetWeight will store the previous netweight.
        //*_this.diffnetWeight will give the current netweight everytime by subtracting _this.netWeight - _this.prevnetWeight

        _this.prevnetWeight = _this.netWeight;
        if (_this.DArray[_this.count1] < 0) {
            console.log("negetive Y")
            _this.netWeight = _this.pinkObjectCounter * (_this.DArray[_this.count1]) - _this.greenObjectCounter * (_this.DArray[_this.count1])
                + _this.pinksmallObjectCounter - _this.greensmallObjectCounter - _this.pinksmallObjectCounter1 + _this.greensmallObjectCounter1;
        }
        else {
            console.log("positive Y")
            _this.netWeight = _this.pinkObjectCounter * _this.DArray[_this.count1] - _this.greenObjectCounter * _this.DArray[_this.count1]
                + _this.pinksmallObjectCounter - _this.greensmallObjectCounter - _this.pinksmallObjectCounter1 + _this.greensmallObjectCounter1;
        }

        console.log(_this.netWeight, ".....netWeight !!")

        _this.diffnetWeight = _this.netWeight - _this.prevnetWeight;

        weightScale2.angle -= _this.Angle_Unit * _this.diffnetWeight;
        _this.leftscaleGroup.y += _this.Y_Unit_Px * _this.diffnetWeight;
        _this.rightscaleGroup.y -= _this.Y_Unit_Px * _this.diffnetWeight;
        _this.barAngleY = weightScale2.angle - _this.Angle_Unit * _this.diffnetWeight;

        //* rounding up the value upto 3 decimal point
        weightScale2.angle = Number((weightScale2.angle).toFixed(3));
        _this.leftscaleGroup.y = Number((_this.leftscaleGroup.y).toFixed(3));
        _this.rightscaleGroup.y = Number((_this.rightscaleGroup.y).toFixed(3));

        console.log(Number((weightScale2.angle).toFixed(3)), "weightScale2.angle..........");
        console.log(Number((weightScale2.angle).toFixed(3)), "weightScale2.angle..........");
        console.log(_this.leftscaleGroup.y, "_this.leftscaleGroup.y....");
        console.log(_this.barAngleY, "_this.barAngleY....");

        _this.equalizeTheBalance();
    },

    displayTickafterZeroPairing: function () {
        //* validate when a tick button is cliecked and display the further options
        //* adds devide sign on the screen
        // console.log("balancedddd ...........")
        let a = [];
        a.push(0);
        a.push(0);
        a.push(0);
        for (let i = 0; i < _this.greenBigTileGroup.length; i++) {
            if (_this.greenBigTileGroup.getChildAt(i).name == 'bigGreen') {
                a[0] -= 1;
            }
            else if (_this.greenBigTileGroup.getChildAt(i).name == 'bigPink') {
                a[0] += 1;
            }
        }

        for (let i = 0; i < _this.greensmallTileGroup.length; i++) {
            if (_this.greensmallTileGroup.getChildAt(i).name == 'green') {
                a[1] -= 1;
            }
            else if (_this.greensmallTileGroup.getChildAt(i).name == 'pink') {
                a[1] += 1;
            }
        }

        for (let i = 0; i < _this.pinkGreensmalTileGroup.length; i++) {
            if (_this.pinkGreensmalTileGroup.getChildAt(i).name == 'minusGreen') {
                a[2] -= 1;
            }
            else if (_this.pinkGreensmalTileGroup.getChildAt(i).name == 'plusPink') {
                a[2] += 1;
            }
        }
        // console.log(a, "AAAAAA.....[]");
        if (_this.CArray[_this.count1] < 0) {
            _this.dValue1 = _this.CArray[_this.count1] - _this.BArray[_this.count1];//_this.cValue - _this.bValue
        } else {
            _this.dValue1 = _this.CArray[_this.count1] - _this.BArray[_this.count1];
        }


        if (a[2] == _this.dValue1) {
            //_this.counterCelebrationSound.play();
            _this.SmallRewardSound.play();
            _this.panel1.destroy();
            _this.panel2.destroy();
            _this.minuSmalTile.destroy();
            _this.pluSmallTile.destroy();
            _this.minusOne.destroy();
            _this.plusOne.destroy();
            _this.EquationBox1.y = 120;
            if (_this.count1 == 0) {
                _this.dragtoBottomTween();
            }
            _this.addDevideSign = _this.add.sprite(550, 100, 'devideSign');
            _this.addDevideSign.scale.setTo(0.8, 0.8);
            _this.addDevideSign.frame = 1;
            _this.addDevideSign.inputEnabled = true;
            _this.addDevideSign.input.useHandCursor = true;
            _this.addDevideSign.events.onInputDown.add(_this.addRearrangedStrips, _this);
            _this.totalSmallStrip = a[2];//42 ,-42
            //_this.smallTripName = a[2].name;
            if (_this.totalSmallStrip < 0) {
                _this.totalSmallStrip = Math.abs(_this.totalSmallStrip);
                _this.smallTripName = 'green3';
            } else {
                _this.smallTripName = 'pink3';
            }
        }
    },

    addRearrangedStrips: function () {
        //* Rearrange the strips when the devide sign is clicked
        if (_this.hand) _this.hand.destroy();
        _this.pinkGreensmalTileGroup.destroy();
        _this.counterCelebrationSound.play();
        _this.addDevideSign.frame = 0;

        if (_this.AArray[_this.count1] < 0) {
            _this.Acount = Math.abs(_this.AArray[_this.count1]);
        } else {
            _this.Acount = _this.AArray[_this.count1];
        }
        _this.noOfElement = _this.totalSmallStrip / _this.Acount;
        if (_this.noOfElement < 0) Math.abs(_this.noOfElement);

        // console.log("Newww Stripssss");
        for (i = 0; i < _this.totalSmallStrip; i++)//i =3
        {
            // console.log("Add new strip...");
            _this.addNewStrips = _this.add.image(_this.newStripsX[_this.newStripX], _this.newStripsY[_this.newStripY], _this.smallTripName);
            _this.reArrangedGrp.addChild(_this.addNewStrips);
            _this.newStripX++;
            if (_this.newStripX >= _this.Acount) {
                _this.newStripY++;
                _this.newStripX = 0;
            }
        }

        _this.addRedLines();

        if (_this.Acount <= 5) {
            _this.addLeftRedLines();
        }
        else {
            _this.addRedSmallLines();
        }

        //* Display text for enetering the answer 
        if (_this.AArray[_this.count1] < 0) {
            //* when the final answer is <0
            _this.addDevideSign.destroy();

            // console.log("A less than 0");
            _this.addFlipbtn = _this.add.sprite(550, 90, 'flipBtn');
            _this.addFlipbtn.scale.setTo(0.9, 0.9);
            _this.addFlipbtn.frame = 1;

            if (_this.flip_flag == true) {
                _this.dragtoBottomTween();
                _this.flip_flag = false;
            }

            let string2;
            _this.answerBackgrnd = _this.add.image(45, 240, 'textbox1');
            _this.answerBackgrnd.scale.setTo(0.9, 0.9);
            _this.AnswerBox1 = _this.add.sprite(140, 250, 'newBox');
            _this.AnswerBox1.scale.setTo(1.2, 1);
            _this.AnswerBox1.frame = 1;
            string2 = _this.variableArray[_this.count1];

            _this.variableValue = _this.add.text(75, 260, string2);
            _this.applyingStyleBlue(_this.variableValue);
            _this.equalSign = _this.add.text(110, 260, "=");
            _this.applyingStyleBlue(_this.equalSign);

            _this.addFlipbtn.inputEnabled = true;
            _this.addFlipbtn.input.useHandCursor = true;
            _this.addFlipbtn.events.onInputDown.add(function () {
                _this.addFlipbtn.frame = 0;
                _this.GamePositiveSound.play();
                _this.addFlipbtn.inputEnabled = false;
                _this.variableValue.destroy();
                _this.qn_flag = 2;
                if (_this.count1 == 0) _this.askQn3();
                _this.addNumberPad();
                _this.rearangeNegetiveTerm();
                _this.addRedLines();
                if (_this.Acount <= 5) {
                    _this.addLeftRedLines();
                }
                else {
                    _this.addTilesX = 0;
                    _this.addRedSmallLines();
                }
                let string3;
                string3 = _this.variableArray[_this.count1];
                _this.variableValue = _this.add.text(75, 260, string3);
                _this.applyingStyleBlue(_this.variableValue);
                // _this.addFlipbtn.events.onInputDown.add(_this.rearangeNegetiveTerm, _this);

            })
        }
        else {
            //* when the final answer is >0
            let string2;
            _this.answerBackgrnd = _this.add.image(45, 240, 'textbox1');
            _this.answerBackgrnd.scale.setTo(0.9, 0.9);
            _this.AnswerBox1 = _this.add.sprite(140, 250, 'newBox');
            _this.AnswerBox1.scale.setTo(1.2, 1);
            _this.AnswerBox1.frame = 1;

            string2 = _this.variableArray[_this.count1];
            _this.variableValue = _this.add.text(75, 260, string2);
            _this.applyingStyleBlue(_this.variableValue);
            _this.equalSign = _this.add.text(110, 260, "=");
            _this.applyingStyleBlue(_this.equalSign);

            _this.time.events.add(1500, () => {
                _this.addDevideSign.destroy();
                _this.qn_flag = 2;
                if (_this.count1 == 0) _this.askQn3();
                _this.addNumberPad();
            })
        }
    },

    rearangeNegetiveTerm: function () {
        //* Rearrange the  strips in negetive term case
        if (_this.greenBigTileGroup.getChildAt(_this.greenBigTileGroup.length - 1).name == "bigGreen") {
            _this.bigStripName = "pink2";
            _this.lastSign1 = "+";
        }
        else {
            _this.bigStripName = "green2";
            _this.lastSign1 = "-";
        }

        if (_this.smallTripName == "pink3") {
            _this.smallTripName = "green3";
            _this.lastSign2 = "-";
        } else {
            _this.smallTripName = "pink3";
            _this.lastSign2 = "+";
        }

        _this.greenBigTileGroup.destroy();

        _this.addFlipbtn.destroy();
        _this.rearangeNegetiveTerm2();
        _this.rearangeNegetiveTerm3();
    },

    rearangeNegetiveTerm2: function () {
        //* Rearrange the left strips in negetive term case
        for (i = 0; i < _this.Acount; i++)//i =3
        {
            // console.log("Add new strip...");
            if (_this.readerText) _this.readerText.destroy();
            if (_this.readerText1) _this.readerText1.destroy();
            _this.addNewBigStrips = _this.add.image(_this.bigTileX[_this.reArrangeXBigTileX], _this.bigTileY[_this.reArrangeXBigTileY], _this.bigStripName);
            _this.reArrangedArray.push(_this.addNewBigStrips);

            _this.readerText1 = _this.add.text(420, 425, _this.lastSign1 + _this.Acount + _this.variableArray[_this.count1]);//360,420
            _this.applyingStyleRed(_this.readerText1);

            _this.reArrangeXBigTileX++;
            // _this.nextBottleXidx++;
            if (_this.reArrangeXBigTileX >= 5) {
                _this.reArrangeXBigTileY++;
                _this.reArrangeXBigTileX = 0;
            }
        }
    },

    rearangeNegetiveTerm3: function () {
        //* Rearrange the right strips in negetive term case
        for (l = 0; l < _this.totalSmallStrip; l++)//i =3
        {
            // console.log("adding Right small square...");
            if (_this.readerText4) _this.readerText4.destroy();
            if (_this.readerText5) _this.readerText5.destroy();
            _this.addNewStripsTile = _this.add.image(_this.newStripsX[_this.reArrangeX], _this.newStripsY[_this.reArrangeY], _this.smallTripName);
            _this.reArrangedArray.push(_this.addNewStripsTile);

            _this.readerText4 = _this.add.text(720, 425, _this.lastSign2 + _this.totalSmallStrip);//360,420
            _this.applyingStyleRed(_this.readerText4);

            _this.reArrangeX++;
            // console.log(_this.reArrangeX, "_this.reArrangeX ++");
            if (_this.reArrangeX >= _this.Acount) {

                _this.reArrangeY++;
                _this.reArrangeX = 0;
            }
        }

    },

    addRedLines: function () {

        //* Showing Red lines on  right small squares
        for (let j = 0; j < _this.Acount - 1; j++) {
            // console.log("Add new Liness...");
            _this.graphics3 = _this.add.graphics();
            _this.graphics3.lineStyle(4, 0xFF0000);
            _this.graphics3.moveTo(_this.redLineX[j], 250);//0,1,2 _this.totalSmallStrip- 1
            _this.graphics3.lineTo(_this.redLineX[j], 80);
            _this.reArrangedArray.push(_this.graphics3);
            //x =  723, 746,769,792,815,838,861,884
            //_this.newStripXX ++;
        }
    },

    addLeftRedLines: function () {
        //* Showing Red lines on left big strips
        for (let k = 0; k < _this.Acount - 1; k++) {//6
            // console.log("Add new Liness...");
            _this.graphics5 = _this.add.graphics();
            _this.graphics5.lineStyle(4, 0xFF0000);
            _this.graphics5.moveTo(_this.bigTileLineX[k], 250);//250//0,1,2 _this.totalSmallStrip- 1
            _this.graphics5.lineTo(_this.bigTileLineX[k], 80);//80
            _this.reArrangedArray.push(_this.graphics5);
            //x =  723, 746,769,792,815,838,861,884
            //_this.newStripXX ++; 
        }
    },

    addRedSmallLines: function () {
        //* Showing Red lines on left big object in case the term is >5
        let y1 = 250;
        let y2 = 170;
        // let x1 = 312.5;//312.5
        // let x2 =0;
        for (let k = 0; k < _this.Acount - 1; k++) {//6
            // console.log("Add new Liness...");
            _this.graphics6 = _this.add.graphics();
            _this.graphics6.lineStyle(4, 0xFF0000);
            _this.graphics6.moveTo(_this.bigTileLineX[_this.addTilesX], y1);//250//0,1,2 _this.totalSmallStrip- 1
            _this.graphics6.lineTo(_this.bigTileLineX[_this.addTilesX], y2);//80
            _this.reArrangedArray.push(_this.graphics6);

            _this.addTilesX++;
            if (_this.addTilesX == 5) {
                // console.log("iff.........k ==5");
                _this.graphics4 = _this.add.graphics();
                _this.graphics4.lineStyle(4, 0xFF0000);
                _this.graphics4.moveTo(287, 170);//0,1,2 _this.totalSmallStrip- 1
                _this.graphics4.lineTo(410, 170);
                _this.reArrangedArray.push(_this.graphics4);
                //_this.x1 = 312.5; 
                _this.addTilesX = 0;
                y1 = 170;
                y2 = 80;
            }
        }
    },

    equalizeTheBalance: function () {
        //* This function will display a tick button and plays clung sound when the balance is equal
        // console.log("balancedddd ...........")
        let a = [];
        a.push(0);
        a.push(0);
        a.push(0);
        for (let i = 0; i < _this.greenBigTileGroup.length; i++) {
            if (_this.greenBigTileGroup.getChildAt(i).name == 'bigGreen') {
                a[0] -= 1;
            }
            else if (_this.greenBigTileGroup.getChildAt(i).name == 'bigPink') {
                a[0] += 1;
            }
        }

        for (let i = 0; i < _this.greensmallTileGroup.length; i++) {
            if (_this.greensmallTileGroup.getChildAt(i).name == 'green') {
                a[1] -= 1;
            }
            else if (_this.greensmallTileGroup.getChildAt(i).name == 'pink') {
                a[1] += 1;
            }
        }

        for (let i = 0; i < _this.pinkGreensmalTileGroup.length; i++) {
            if (_this.pinkGreensmalTileGroup.getChildAt(i).name == 'minusGreen') {
                a[2] -= 1;
            }
            else if (_this.pinkGreensmalTileGroup.getChildAt(i).name == 'plusPink') {
                a[2] += 1;
            }
        }
        // console.log(a, "AAAAAA.....[]");
        if (a[0] == _this.AArray[_this.count1] && a[1] == _this.BArray[_this.count1] && a[2] == _this.CArray[_this.count1]) {
            _this.clungSound.play();
            _this.displayTickmark();
        }
    },

    tickEvaluation: function () {
        //* vaidate on pressing the tick button
        _this.clickSound.play();
        let a = [];
        let b = [];
        a.push(0);
        a.push(0);
        a.push(0);
        b.push(0);
        b.push(0);
        b.push(0);

        for (let i = 0; i < _this.greenBigTileGroup.length; i++) {
            if (_this.greenBigTileGroup.getChildAt(i).name == 'bigGreen') {
                a[0] -= 1;
            }
            else if (_this.greenBigTileGroup.getChildAt(i).name == 'bigPink') {
                b[0] += 1;
            }
        }

        for (let i = 0; i < _this.greensmallTileGroup.length; i++) {
            if (_this.greensmallTileGroup.getChildAt(i).name == 'green') {
                a[1] -= 1;
            }
            else if (_this.greensmallTileGroup.getChildAt(i).name == 'pink') {
                b[1] += 1;
            }
        }

        for (let i = 0; i < _this.pinkGreensmalTileGroup.length; i++) {
            if (_this.pinkGreensmalTileGroup.getChildAt(i).name == 'minusGreen') {
                a[2] -= 1;
            }
            else if (_this.pinkGreensmalTileGroup.getChildAt(i).name == 'plusPink') {
                b[2] += 1;
            }
        }

        // console.log(a, "AAAAAA.....[]");

        if (((a[0] == _this.AArray[_this.count1] && b[0] == 0) || (b[0] == _this.AArray[_this.count1] && a[0] == 0)) &&
            ((a[1] == _this.BArray[_this.count1] && b[1] == 0) || (b[1] == _this.BArray[_this.count1] && a[1] == 0)) &&
            ((a[2] == _this.CArray[_this.count1] && b[2] == 0) || (b[2] == _this.CArray[_this.count1] && a[2] == 0))) {

            _this.counterCelebrationSound.play();
            _this.xvariable.destroy();
            _this.tickbtn.visible = false;
            _this.positiveXvariable.destroy();
            _this.minusXTile.destroy();
            _this.plustXtile.destroy();
            _this.minuSmalTile.destroy();
            _this.pluSmallTile.destroy();

            _this.pinkGreensmalTileGroup.forEach(element => {
                element.inputEnabled = false;
            });
            _this.greenBigTileGroup.forEach(element => {
                element.inputEnabled = false;
            });
            _this.greensmallTileGroup.forEach(element => {
                element.inputEnabled = false;
            });

            if (_this.readerText) {
                _this.readerText.x = 420;
            } else {
                _this.readerText1.x = 420;
            }

            _this.panel1.scale.setTo(1, 0.4);
            _this.panel2.scale.setTo(1, 0.4);
            _this.minusOne.y = 130;
            _this.plusOne.y = 130;

            _this.minuSmalTile = _this.add.image(73, 165, 'green3');
            _this.minuSmalTile.inputEnabled = true;
            _this.minuSmalTile.input.useHandCursor = true;//385//255
            _this.pluSmallTile = _this.add.image(185, 165, 'pink3');
            _this.pluSmallTile.inputEnabled = true;
            _this.pluSmallTile.input.useHandCursor = true;//385


            _this.EquationBox1.y = 220;

            _this.minuSmalTile.events.onInputDown.add(_this.startZeroPairingGreen, _this);
            _this.pluSmallTile.events.onInputDown.add(_this.startZeroParingPink, _this);

            if (_this.count1 == 0) {
                _this.dragtoBottomTween2();
            }


        }
        else {
            _this.wrongSound.play();
        }
    },

    startZeroPairingGreen: function () {
        //* This function is to make zero pairing when the green square is clicked
        //* whenever opposite signs meets like + and - they we hit and destroy together 
        //* whenever same signs meets like -&- or +&+ they will be added one after the other
        //* like how zero pairing happens
        //if()
        if ((_this.greensmallTileGroup.length > 31 && _this.greensmallTileGroup.getChildAt(_this.greensmallTileGroup.length - 1).name == "green") ||
            (_this.pinkGreensmalTileGroup.length > 31 && _this.pinkGreensmalTileGroup.getChildAt(_this.pinkGreensmalTileGroup.length - 1).name == "minusGreen")) {
            _this.wrongSound.play();
            return;
        }
        _this.minuSmalTile.inputEnabled = false;
        _this.pluSmallTile.inputEnabled = false;

        _this.addGreenTile1 = _this.add.image(73, 165, 'green3');
        _this.addGreenTile2 = _this.add.image(73, 165, 'green3');
        _this.greenTween1 = _this.add.tween(_this.addGreenTile1);
        _this.greenTween1.to({ x: 500, y: 165 }, 500, 'Linear', true, 0);
        _this.greenTween1.start();
        _this.greenTween2 = _this.add.tween(_this.addGreenTile2);
        _this.greenTween2.to({ x: 500, y: 165 }, 500, 'Linear', true, 0);
        _this.greenTween2.start();

        _this.greenTween1.onComplete.add(function () {
            _this.tween1 = _this.add.tween(_this.addGreenTile1);
            if (_this.greensmallTileGroup.length > 0) {

                if (_this.greensmallTileGroup.getChildAt(_this.greensmallTileGroup.length - 1).name == "pink") {
                    //* destroy both last ele and addGreenTile1
                    _this.greenSmallTileX--;

                    if (_this.greenSmallTileX < 0) {
                        _this.greenSmallTileY--;
                        _this.greenSmallTileX = 3;
                    }
                    _this.tween1.to({ x: _this.smallTilePostionX[_this.greenSmallTileX], y: _this.smallTilePostionY[_this.greenSmallTileY] }, 200, 'Linear', true, 0);

                    _this.tween1.onComplete.add(function () {
                        console.log("destroy")
                        // if (_this.readerText3) _this.readerText3.destroy();
                        if (_this.readerText3) _this.readerText3.destroy();

                        _this.snapSound.play();
                        _this.greensmallTileGroup.getChildAt(_this.greensmallTileGroup.length - 1).destroy();
                        _this.addGreenTile1.destroy();

                        if (_this.greensmallTileGroup.length == 0) {

                        } else {
                            _this.readerText3 = _this.add.text(510, 425, "+" + _this.greensmallTileGroup.length);//360,420
                            _this.applyingStyleRed(_this.readerText3);
                        }

                        _this.displayTickafterZeroPairing();
                    })
                }
                else {
                    //*add with last x green Square

                    _this.tween1.to({ x: _this.smallTilePostionX[_this.greenSmallTileX], y: _this.smallTilePostionY[_this.greenSmallTileY] }, 200, 'Linear', true, 0);

                    _this.tween1.onComplete.add(function () {
                        //if (_this.readerText3) _this.readerText3.destroy();
                        if (_this.readerText2) _this.readerText2.destroy();
                        console.log("addChild....");

                        _this.snapSound.play();
                        _this.addGreenTile1.name = "green";
                        _this.greensmallTileGroup.addChild(_this.addGreenTile1);

                        _this.readerText2 = _this.add.text(470, 425, "-" + _this.greensmallTileGroup.length);//360,420
                        _this.applyingStyleRed(_this.readerText2);

                        _this.greenSmallTileX++;
                        if (_this.greenSmallTileX >= 4) {
                            _this.greenSmallTileY++;
                            _this.greenSmallTileX = 0;
                        }
                        _this.displayTickafterZeroPairing();
                    })

                }
            } else {

                //* add from begining
                if (_this.greensmallTileGroup.length == 0) {
                    _this.greenSmallTileX = 0;
                    _this.greenSmallTileY = 0;
                }
                _this.tween1.to({ x: _this.smallTilePostionX[_this.greenSmallTileX], y: _this.smallTilePostionY[_this.greenSmallTileY] }, 200, 'Linear', true, 0);

                _this.tween1.onComplete.add(function () {
                    console.log("add agian")
                    if (_this.readerText3) _this.readerText3.destroy();
                    if (_this.readerText2) _this.readerText2.destroy();
                    // console.log("onCompleteeeee....");
                    _this.snapSound.play();
                    _this.addGreenTile1.name = "green";
                    _this.greensmallTileGroup.addChild(_this.addGreenTile1);


                    _this.readerText2 = _this.add.text(470, 425, "-" + _this.greensmallTileGroup.length);//360,420
                    _this.applyingStyleRed(_this.readerText2);

                    _this.greenSmallTileX++;
                    if (_this.greenSmallTileX >= 4) {
                        _this.greenSmallTileY++;
                        _this.greenSmallTileX = 0;
                    }
                    _this.displayTickafterZeroPairing();
                })

            }
        })

        _this.greenTween2.onComplete.add(function () {
            _this.tween2 = _this.add.tween(_this.addGreenTile2);
            if (_this.pinkGreensmalTileGroup.length > 0) {
                if (_this.pinkGreensmalTileGroup.getChildAt(_this.pinkGreensmalTileGroup.length - 1).name == "plusPink") {
                    //* destroy both last ele and addGreenTile1

                    _this.greenPinkSmallTileX--;
                    if (_this.greenPinkSmallTileX < 0) {
                        _this.greenPinkSmallTileY--;
                        _this.greenPinkSmallTileX = 8;
                    }

                    _this.tween2.to({ x: _this.smallRightTilePostionX[_this.greenPinkSmallTileX], y: _this.smallRightTilePostionY[_this.greenPinkSmallTileY] }, 200, 'Linear', true, 0);

                    _this.tween2.onComplete.add(function () {
                        console.log("destroyy")
                        //    if (_this.readerText5) _this.readerText5.destroy();

                        if (_this.readerText5) _this.readerText5.destroy();
                        _this.snapSound.play();
                        _this.pinkGreensmalTileGroup.getChildAt(_this.pinkGreensmalTileGroup.length - 1).destroy();
                        _this.addGreenTile2.destroy();

                        if (_this.pinkGreensmalTileGroup.length == 0) {
                            // console.log();
                        } else {
                            _this.readerText5 = _this.add.text(740, 425, "+" + _this.pinkGreensmalTileGroup.length);//360,420
                            _this.applyingStyleRed(_this.readerText5);
                        }

                        _this.minuSmalTile.inputEnabled = true;
                        _this.pluSmallTile.inputEnabled = true;

                        _this.displayTickafterZeroPairing();
                    })
                }
                else {

                    //*add with last x 

                    _this.tween2.to({ x: _this.smallRightTilePostionX[_this.greenPinkSmallTileX], y: _this.smallRightTilePostionY[_this.greenPinkSmallTileY] }, 200, 'Linear', true, 0);

                    _this.tween2.onComplete.add(function () {
                        console.log("add with last x ");

                        //if (_this.readerText5) _this.readerText5.destroy();
                        if (_this.readerText4) _this.readerText4.destroy();

                        _this.snapSound.play();
                        _this.addGreenTile2.name = "minusGreen";
                        _this.pinkGreensmalTileGroup.addChild(_this.addGreenTile2);
                        //_this.holdObjectArray.push(_this.addGreenTile1);
                        _this.readerText4 = _this.add.text(720, 425, "-" + _this.pinkGreensmalTileGroup.length);//360,420
                        _this.applyingStyleRed(_this.readerText4);

                        _this.greenPinkSmallTileX++;
                        if (_this.greenPinkSmallTileX >= 9) {
                            _this.greenPinkSmallTileY++;
                            _this.greenPinkSmallTileX = 0;
                        }

                        _this.minuSmalTile.inputEnabled = true;
                        _this.pluSmallTile.inputEnabled = true;

                        _this.displayTickafterZeroPairing();
                    })
                }
            } else {
                //* add from begining
                if (_this.pinkGreensmalTileGroup.length == 0) {
                    _this.greenPinkSmallTileX = 0;
                    _this.greenPinkSmallTileY = 0;
                }

                _this.tween2.to({ x: _this.smallRightTilePostionX[_this.greenPinkSmallTileX], y: _this.smallRightTilePostionY[_this.greenPinkSmallTileY] }, 200, 'Linear', true, 0);

                _this.tween2.onComplete.add(function () {
                    console.log("add againnn")

                    // if (_this.readerText5) _this.readerText5.destroy();
                    if (_this.readerText4) _this.readerText4.destroy();

                    _this.snapSound.play();
                    _this.addGreenTile2.name = "minusGreen";
                    _this.pinkGreensmalTileGroup.addChild(_this.addGreenTile2);

                    _this.readerText4 = _this.add.text(720, 425, "-" + _this.pinkGreensmalTileGroup.length);//360,420
                    _this.applyingStyleRed(_this.readerText4);

                    _this.greenPinkSmallTileX++;
                    if (_this.greenPinkSmallTileX >= 9) {
                        _this.greenPinkSmallTileY++;
                        _this.greenPinkSmallTileX = 0;
                    }

                    _this.minuSmalTile.inputEnabled = true;
                    _this.pluSmallTile.inputEnabled = true;

                    _this.displayTickafterZeroPairing();
                })
            }
        })

    },

    startZeroParingPink: function () {
        if ((_this.greensmallTileGroup.length > 31 && _this.greensmallTileGroup.getChildAt(_this.greensmallTileGroup.length - 1).name == "pink") ||
            (_this.pinkGreensmalTileGroup.length > 31 && _this.pinkGreensmalTileGroup.getChildAt(_this.pinkGreensmalTileGroup.length - 1).name == "plusPink")) {
            _this.wrongSound.play();
            return;
        }
        //* This function is to make zero pairing when the pink square is clicked
        _this.pluSmallTile.inputEnabled = false;
        _this.minuSmalTile.inputEnabled = false;


        _this.addPinkTile1 = _this.add.image(185, 165, 'pink3');
        _this.addPinkTile2 = _this.add.image(185, 165, 'pink3');
        _this.pinkTween1 = _this.add.tween(_this.addPinkTile1);
        _this.pinkTween1.to({ x: 500, y: 165 }, 500, 'Linear', true, 0);
        _this.pinkTween1.start();
        _this.pinkTween2 = _this.add.tween(_this.addPinkTile2);
        _this.pinkTween2.to({ x: 500, y: 165 }, 500, 'Linear', true, 0);
        _this.pinkTween2.start();

        _this.pinkTween1.onComplete.add(function () {
            _this.pinktween1 = _this.add.tween(_this.addPinkTile1);
            if (_this.greensmallTileGroup.length > 0) {

                if (_this.greensmallTileGroup.getChildAt(_this.greensmallTileGroup.length - 1).name == "green") {

                    //destroy both pink and green
                    _this.greenSmallTileX--;
                    if (_this.greenSmallTileX < 0) {
                        _this.greenSmallTileY--;
                        _this.greenSmallTileX = 3;
                    }

                    _this.pinktween1.to({ x: _this.smallTilePostionX[_this.greenSmallTileX], y: _this.smallTilePostionY[_this.greenSmallTileY] }, 200, 'Linear', true, 0);
                    _this.pinktween1.onComplete.add(function () {

                        if (_this.readerText2) _this.readerText2.destroy();
                        // if (_this.readerText2) _this.readerText2.destroy();

                        _this.snapSound.play();
                        _this.greensmallTileGroup.getChildAt(_this.greensmallTileGroup.length - 1).destroy();
                        _this.addPinkTile1.destroy();

                        if (_this.greensmallTileGroup.length == 0) {
                            // console.log();
                        } else {
                            _this.readerText2 = _this.add.text(470, 425, "-" + _this.greensmallTileGroup.length);//360,420
                            _this.applyingStyleRed(_this.readerText2);
                        }

                        _this.displayTickafterZeroPairing();
                    })
                } else {
                    //add pink with last x
                    _this.pinktween1.to({ x: _this.smallTilePostionX[_this.greenSmallTileX], y: _this.smallTilePostionY[_this.greenSmallTileY] }, 200, 'Linear', true, 0);
                    _this.pinktween1.onComplete.add(function () {
                        if (_this.readerText3) _this.readerText3.destroy();
                        //if (_this.readerText2) _this.readerText2.destroy();

                        _this.snapSound.play();
                        _this.addPinkTile1.name = "pink";
                        _this.greensmallTileGroup.addChild(_this.addPinkTile1);

                        _this.readerText3 = _this.add.text(510, 425, "+" + _this.greensmallTileGroup.length);//360,420
                        _this.applyingStyleRed(_this.readerText3);

                        _this.greenSmallTileX++;
                        if (_this.greenSmallTileX >= 4) {
                            _this.greenSmallTileY++;
                            _this.greenSmallTileX = 0;
                        }
                        _this.displayTickafterZeroPairing();
                    })
                }
            } else {
                //* add from the begining
                if (_this.greensmallTileGroup.length == 0) {
                    _this.greenSmallTileX = 0;
                    _this.greenSmallTileY = 0;
                }

                _this.pinktween1.to({ x: _this.smallTilePostionX[_this.greenSmallTileX], y: _this.smallTilePostionY[_this.greenSmallTileY] }, 200, 'Linear', true, 0);
                _this.pinktween1.onComplete.add(function () {
                    if (_this.readerText3) _this.readerText3.destroy();
                    // if (_this.readerText2) _this.readerText2.destroy();

                    _this.snapSound.play();
                    _this.addPinkTile1.name = "pink";
                    _this.greensmallTileGroup.addChild(_this.addPinkTile1);

                    _this.readerText3 = _this.add.text(510, 425, "+" + _this.greensmallTileGroup.length);//360,420
                    _this.applyingStyleRed(_this.readerText3);

                    _this.greenSmallTileX++;
                    if (_this.greenSmallTileX >= 4) {
                        _this.greenSmallTileY++;
                        _this.greenSmallTileX = 0;
                    }
                    _this.displayTickafterZeroPairing();
                })
            }

        })

        _this.pinkTween2.onComplete.add(function () {
            _this.pinktween2 = _this.add.tween(_this.addPinkTile2);
            if (_this.pinkGreensmalTileGroup.length > 0) {

                if (_this.pinkGreensmalTileGroup.getChildAt(_this.pinkGreensmalTileGroup.length - 1).name == "minusGreen") {

                    //destroy both pink and green
                    _this.greenPinkSmallTileX--;
                    if (_this.greenPinkSmallTileX < 0) {
                        _this.greenPinkSmallTileY--;
                        _this.greenPinkSmallTileX = 8;
                    }
                    _this.pinktween2.to({ x: _this.smallRightTilePostionX[_this.greenPinkSmallTileX], y: _this.smallRightTilePostionY[_this.greenPinkSmallTileY] }, 200, 'Linear', true, 0);

                    _this.pinktween2.onComplete.add(function () {
                        console.log("Destroyyy")
                        if (_this.readerText4) _this.readerText4.destroy();
                        //if (_this.readerText4) _this.readerText4.destroy();

                        _this.snapSound.play();
                        _this.pinkGreensmalTileGroup.getChildAt(_this.pinkGreensmalTileGroup.length - 1).destroy();
                        _this.addPinkTile2.destroy();

                        if (_this.pinkGreensmalTileGroup.length == 0) {
                            // console.log();
                        } else {
                            _this.readerText4 = _this.add.text(720, 425, "-" + _this.pinkGreensmalTileGroup.length);//360,420
                            _this.applyingStyleRed(_this.readerText4);
                        }

                        _this.pluSmallTile.inputEnabled = true;
                        _this.minuSmalTile.inputEnabled = true;

                        _this.displayTickafterZeroPairing();
                    })

                } else {
                    //add pink with last x
                    _this.pinktween2.to({ x: _this.smallRightTilePostionX[_this.greenPinkSmallTileX], y: _this.smallRightTilePostionY[_this.greenPinkSmallTileY] }, 200, 'Linear', true, 0);

                    _this.pinktween2.onComplete.add(function () {
                        console.log("addchilddd")
                        if (_this.readerText5) _this.readerText5.destroy();
                        // if (_this.readerText4) _this.readerText4.destroy();

                        _this.snapSound.play();
                        _this.addPinkTile2.name = "plusPink";
                        _this.pinkGreensmalTileGroup.addChild(_this.addPinkTile2);

                        _this.readerText5 = _this.add.text(740, 425, "+" + _this.pinkGreensmalTileGroup.length);//360,420
                        _this.applyingStyleRed(_this.readerText5);

                        _this.greenPinkSmallTileX++;
                        if (_this.greenPinkSmallTileX >= 9) {
                            _this.greenPinkSmallTileY++;
                            _this.greenPinkSmallTileX = 0;
                        }

                        _this.pluSmallTile.inputEnabled = true;
                        _this.minuSmalTile.inputEnabled = true;

                        _this.displayTickafterZeroPairing();
                    })
                }
            } else {
                //* add from the begining
                if (_this.pinkGreensmalTileGroup.length == 0) {
                    _this.greenPinkSmallTileX = 0;
                    _this.greenPinkSmallTileY = 0;
                }

                _this.pinktween2.to({ x: _this.smallRightTilePostionX[_this.greenPinkSmallTileX], y: _this.smallRightTilePostionY[_this.greenPinkSmallTileY] }, 200, 'Linear', true, 0);

                _this.pinktween2.onComplete.add(function () {
                    console.log("addchilddd")
                    if (_this.readerText5) _this.readerText5.destroy();
                    //  if (_this.readerText4) _this.readerText4.destroy();

                    _this.snapSound.play();
                    _this.addPinkTile2.name = "plusPink";
                    _this.pinkGreensmalTileGroup.addChild(_this.addPinkTile2);

                    _this.readerText5 = _this.add.text(740, 425, "+" + _this.pinkGreensmalTileGroup.length);//360,420
                    _this.applyingStyleRed(_this.readerText5);

                    _this.greenPinkSmallTileX++;
                    if (_this.greenPinkSmallTileX >= 9) {
                        _this.greenPinkSmallTileY++;
                        _this.greenPinkSmallTileX = 0;
                    }

                    _this.pluSmallTile.inputEnabled = true;
                    _this.minuSmalTile.inputEnabled = true;

                    _this.displayTickafterZeroPairing();
                })
            }
        })
    },

    ////
    stopVoice: function () {
        if (_this.Question1) {
            if (_this.Question1.contains(_this.Question1src)) {
                _this.Question1.removeChild(_this.Question1src);
                _this.Question1src = null;
            }

            if (!_this.Question1.paused) {
                _this.Question1.pause();
                _this.Question1.currentTime = 0.0;
            }
            _this.Question1 = null;
            _this.Question1src = null;
        }

        if (_this.Question11) {
            if (_this.Question11.contains(_this.Question11src)) {
                _this.Question11.removeChild(_this.Question11src);
                _this.Question11src = null;
            }

            if (!_this.Question11.paused) {
                _this.Question11.pause();
                _this.Question11.currentTime = 0.0;
            }
            _this.Question11 = null;
            _this.Question11src = null;
        }

        if (_this.Question2) {
            if (_this.Question2.contains(_this.Question2src)) {
                _this.Question2.removeChild(_this.Question2src);
                _this.Question2src = null;
            }

            if (!_this.Question2.paused) {
                _this.Question2.pause();
                _this.Question2.currentTime = 0.0;
            }
            _this.Question2 = null;
            _this.Question2src = null;
        }

        if (_this.Question3) {
            if (_this.Question3.contains(_this.Question3src)) {
                _this.Question3.removeChild(_this.Question3src);
                _this.Question3src = null;
            }

            if (!_this.Question3.paused) {
                _this.Question3.pause();
                _this.Question3.currentTime = 0.0;
            }
            _this.Question3 = null;
            _this.Question3src = null;
        }

        if (_this.celebrationSound) {
            if (_this.celebrationSound.isPlaying) {
                _this.celebrationSound.stop();
                _this.celebrationSound = null;
            }
        }
    },

    generateStarsForTheScene: function (count) {
        _this.starsGroup = _this.add.group();
        for (let i = 0; i < count; i++) {
            _this.starsGroup.create(_this.world.centerX - 15, 10, 'starAnim');
            for (let j = 0; j < i; j++) {
                if (_this.starsGroup.getChildAt(j)) {
                    _this.starsGroup.getChildAt(j).x -= 15;
                    _this.starsGroup.getChildAt(i).x += 15;
                }
            }
        }
    },

    starActions: function (target) {
        //edited for baseurl apk
        _this.AnsTimerCount = 0;
        _this.microConcepts = "AlgebraG7";

        starAnim = _this.starsGroup.getChildAt(_this.count1);
        starAnim.smoothed = false;
        anim = starAnim.animations.add('star');
        _this.count1++;
        anim.play();
    },

    celebration1: function () {
        _this.counterCelebrationSound.play();
        // _this.starActions(_this.count1);
    },

    celebration: function () {
        //_this.numGroup.destroy();
        _this.celebrationSound.play();
        _this.starActions(_this.count1);
    },

    Initial_randomizing: function () {

        _this.ObjectArray = [];
        //* array for storing the RHS & LHS value type 
        _this.AArray = [];
        _this.BArray = [];
        _this.CArray = [];
        _this.DArray = [];
        _this.variableArray = ["x", "y", "m", "n", "y", "x"];
        _this.shuffle(_this.variableArray);

        for (i = 0; i < 6; i++) {

            //* Find the equation such that you should get a final a whole number
            //* Lets consider aX+b = c
            //* here a can be + or - and b can be + or - and c can be + or -
            //* AL-ES-G7 
            //* Examples = 	3y- 3 = 12, 2x- 4 = 10, 5m - 5 =5, 4n +3 = 9, -2n + 4 = 6
            //* y,x,m,n can be possible as variables
            // find a sign  
            //find b
            //find c (-/+)
            //d = will hold result of c+b/c-b (-8)
            //while c+b / c-b % a !=0
            // regenerate a again
            //or store a

            // 3y +(-3) = -12
            //a, sign ,(0,1),0 = 1,1= -1,b (0,1),0 = 1,1= -1,c
            //5-9-5= -14 2,7,14
            _this.aValue = Math.floor(Math.random() * 8) + 2;
            // console.log(_this.aValue, "a!!");
            _this.sign3 = Math.floor(Math.random() * (2));
            if (_this.sign3 == 0) {
                _this.aValue = _this.aValue;
                // console.log(_this.aValue, "aaa+++++");
            }
            else {
                _this.aValue = -_this.aValue;
                // console.log(_this.aValue, "aaa--------");
            }

            _this.bValue = Math.floor(Math.random() * 10) + 1;
            _this.sign1 = Math.floor(Math.random() * (2));
            if (_this.sign1 == 0) {
                _this.bValue = +_this.bValue;
                // console.log(_this.bValue, "bbb+++++");
            }
            else {
                _this.bValue = -_this.bValue;
                // console.log(_this.bValue, "bbb--------");
            }

            _this.cValue = Math.floor(Math.random() * 10) + 1; //-8
            _this.sign2 = Math.floor(Math.random() * (2));
            if (_this.sign2 == 0) {
                _this.cValue = _this.cValue;
                // console.log(_this.cValue, "c value!!!!");
            }
            else {
                _this.cValue = - _this.cValue;
                // console.log(_this.cValue, "c value negetive ////");
            }

            if (_this.bValue > 0) {
                _this.dValue = _this.cValue - _this.bValue;
                // console.log(_this.dValue, "DDD val>0");
            }
            else {
                _this.dValue = _this.cValue - _this.bValue;//50+
                // console.log(_this.dValue, "DDD val<0");
            }
            while (_this.dValue == 0 || (_this.dValue % _this.aValue != 0) || ((Math.abs(_this.dValue / _this.aValue) > 8))) {//d/a = x <=8
                _this.reGenerateTheNumbers();
            }
            _this.AArray.push(_this.aValue);
            _this.BArray.push(_this.bValue);
            _this.CArray.push(_this.cValue);
            _this.DArray.push(_this.dValue / _this.aValue);

        }

    },

    reGenerateTheNumbers: function () {
        //* In certain condition we will generate the numbers again 
        //* If we didnt get the final answer as whole number try until we gets it and return the values to the above function
        _this.aValue = Math.floor(Math.random() * 8) + 2;

        _this.sign3 = Math.floor(Math.random() * (2));
        if (_this.sign3 == 0) {
            _this.aValue = _this.aValue;
            // console.log(_this.aValue, "aaa+++++");
        }
        else {
            _this.aValue = -_this.aValue;
            // console.log(_this.aValue, "aaa--------");
        }
        // console.log(_this.aValue, "a!!");
        _this.bValue = Math.floor(Math.random() * 10) + 1;
        _this.sign1 = Math.floor(Math.random() * (2));
        if (_this.sign1 == 0) {
            _this.bValue = _this.bValue;
            // console.log(_this.bValue, "bbb+++++");
        }
        else {
            _this.bValue = -_this.bValue;
            // console.log(_this.bValue, "bbb--------");
        }

        _this.cValue = Math.floor(Math.random() * 10) + 1; //-8
        _this.sign2 = Math.floor(Math.random() * (2));
        if (_this.sign2 == 0) {
            _this.cValue = _this.cValue;
            // console.log(_this.cValue, "c value!!!!");
        }
        else {
            _this.cValue = - _this.cValue;
            // console.log(_this.cValue, "c value negetive ////");
        }

        if (_this.bValue > 0) {
            _this.dValue = _this.cValue - _this.bValue;
            // console.log(_this.dValue, "DDD val>0");
        }
        else {
            _this.dValue = _this.cValue - _this.bValue;//50+
            // console.log(_this.dValue, "DDD val<0");
        }
    },

    dragtoBottomTween: function () {
        //* show hand signs on the devide sign as wel as on flip button
        _this.time.events.add(500, function () {
            _this.hand = _this.add.image(630, 150, 'hand');//620,110
            _this.hand.scale.setTo(0.5, 0.5);
        });
        _this.time.events.add(1000, function () {
            //* add tween to temp group and tween it to work space.
            tempDragAction = _this.add.tween(_this.hand);
            tempDragAction.to({ x: 580, y: 130 }, 500, 'Linear', true, 0);
            tempDragAction.start();
        });
        // _this.handGroup.destroy();

        _this.time.events.add(2500, function () {
            _this.hand.destroy();
        });
    },

    dragtoBottomTween2: function () {
        //* This to show what to do in zero pairing stage//
        _this.time.events.add(500, function () {
            _this.hand = _this.add.image(190, 200, 'hand');//620,110
            _this.hand.scale.setTo(0.5, 0.5);
        });
        _this.time.events.add(1000, function () {
            //* add tween to temp group and tween it to work space.
            tempDragAction = _this.add.tween(_this.hand);
            if (_this.BArray[_this.count1] < 0) {
                console.log("positive");
                tempDragAction.to({ x: 190, y: 170 }, 500, 'Linear', true, 0);
                tempDragAction.start();
            } else {

                console.log("negetive");
                tempDragAction.to({ x: 76, y: 170 }, 500, 'Linear', true, 0);
                tempDragAction.start();
            }
        });
        // _this.handGroup.destroy();

        _this.time.events.add(3000, function () {
            _this.hand.destroy();
        });
    },

    TweentheObjects: function () {
        _this.time.events.add(500, function () {
            _this.hand = _this.add.image(620, 440, 'hand');
            _this.hand.scale.setTo(0.5, 0.5);
        });
    },

    displayTickmark: function () {
        _this.tickbtn.events.onInputDown.removeAll();
        _this.tickbtn.visible = true;
        _this.tickbtn.inputEnabled = true;
        _this.tickbtn.input.useHandCursor = true;
        _this.tickbtn.events.onInputDown.add(_this.tickEvaluation, _this);
    },

    nextquestion: function () {
        //* Go to next question if you have not completed all the 6 question 
        //* else end the game 
        if (_this.count1 < 6) {
            _this.qn_flag = 1;
            _this.time.events.add(1500, function () {
                _this.displayQuestions();
            });
        }
        else {
            _this.timer1.stop();
            _this.timer1 = null;
            _this.time.events.add(1000, function () {
                // _this.state.start('score');
                _this.state.start('score', true, false, gameID, _this.microConcepts);
            });
        }
    },

    //Adding the numberpad.
    addNumberPad: function () {
        _this.objGroup = _this.add.group();
        _this.numGroup = _this.add.group();

        _this.AnswerBox1.removeChild(_this.enterTxt1);

        _this.selectedAns11 = '';
        _this.selectedAns21 = '';
        _this.selectedAns31 = '';

        _this.AnswerBox1.name = '';
        _this.fourNotEntered1 = false;
        _this.signNotselected1 = false;

        _this.finalval1 = '';
        _this.signVal1 = '';

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

        _this.numpadTween = _this.add.tween(_this.numGroup);
        _this.tweenNumPad();
    },

    tweenNumPad: function () {
        _this.numGroup.visible = true;
        _this.numpadTween.to({ x: 0, y: -43 }, 1000, 'Linear', true, 0);
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
    wrongbtnClicked1: function (target) {
        _this.clickSound.play();
        _this.disableInputs1();
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
            if (_this.signVal1 == '-') {
                console.log("---------");
                _this.enterTxt1 = _this.add.text(12, 14, "" + _this.signVal1 + _this.finalval1, { fontSize: '20px' });
            } else {
                _this.enterTxt1 = _this.add.text(8, 14, "" + _this.signVal1 + _this.finalval1, { fontSize: '20px' });
            }

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
            _this.applyingStyleBlue2(_this.enterTxt1);
            _this.AnswerBox1.addChild(_this.enterTxt1);
            _this.AnswerBox1.name = Number(_this.signVal1 + _this.finalval1);
            _this.enterTxt1.visible = true;
        }
    },

    rightbtnClicked: function () {
        //* Compare the final answer entered by the user and evaluate it.
        //* If correct answer enetred give a star and mo ve to next question if not give error sound.
        _this.clickSound.play();
        _this.rightbtn.inputEnabled = false;
        _this.rightbtn.input.useHandCursor = false;
        // _this.rightbtn_is_Clicked = true;
        //Evaluating negative numbers.
        if (_this.finalval1.length == 0) {
            //edited for baseurl apk
            _this.noofAttempts++;

            _this.wrongSound.play();
            _this.disableInputs1();
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


        if (Number(_this.signVal1 + _this.finalval1) == _this.DArray[_this.count1]) {
            _this.disableInputs1();
            _this.AnswerBox1.addChild(_this.enterTxt1);
        }
        else {
            //edited for baseurl apk
            _this.noofAttempts++;

            _this.wrongSound.play();
            _this.disableInputs1();
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
            _this.eraseScreen();
            _this.nextquestion();
        });

    },

    eraseScreen: function () {
        //* Clean the screen after each quaestion
        _this.reArrangedArray.forEach(element => {
            // console.log("deleting dragged obj");
            element.destroy();
        });

        _this.leftscaleGroup.forEach(element => {
            element.destroy();
        });

        _this.rightscaleGroup.forEach(element => {
            element.destroy();
        });
        weightScale1.destroy();
        weightScale2.destroy();

        _this.numGroup.destroy();
        _this.reArrangedGrp.destroy();
        _this.greenBigTileGroup.destroy();
        _this.greensmallTileGroup.destroy();
        _this.pinkGreensmalTileGroup.destroy();

        _this.readerBox1.destroy();
        _this.readerBox2.destroy();
        _this.answerBackgrnd.destroy();
        _this.equalSign.destroy();

        if (_this.readerText) _this.readerText.destroy();
        if (_this.readerText1) _this.readerText1.destroy();
        if (_this.readerText2) _this.readerText2.destroy();
        if (_this.readerText3) _this.readerText3.destroy();
        if (_this.readerText4) _this.readerText4.destroy();
        if (_this.readerText5) _this.readerText5.destroy();

        _this.bigGreenStripCount = 0;
        _this.bigPinkStripCount = 0;
        _this.smallGreenCount = 0;
        _this.smallPinkCount = 0;
        _this.smallRightpinkCount = 0;
        _this.smallRightgreenCount = 0;

        _this.EquationBox1.destroy();
        _this.EquationText.destroy();
        _this.AnswerBox1.destroy();
        _this.variableValue.destroy();
    },


    DemoVideo: function () {
        //* Erase extra algebraic tile by dragging it out
        _this.demoAudio1 = document.createElement('audio');
        _this.demoAudio1src = document.createElement('source');
        _this.demoAudio1src.setAttribute("src", window.baseUrl + "questionSounds/AL-ES-G7/" +
            _this.languageSelected + "/AL_ES_G7_d1.mp3");
        _this.demoAudio1.appendChild(_this.demoAudio1src);

        //* Add algebraic tiles for zero pair such that the equation has one side variable and another side constant term
        _this.demoAudio2 = document.createElement('audio');
        _this.demoAudio2src = document.createElement('source');
        _this.demoAudio2src.setAttribute("src", window.baseUrl + "questionSounds/AL-ES-G7/" +
            _this.languageSelected + "/AL_ES_G7_d2.mp3");
        _this.demoAudio2.appendChild(_this.demoAudio2src);

        //* To find the value of the variable ,divide it equally by using divide button.
        _this.demoAudio3 = document.createElement('audio');
        _this.demoAudio3src = document.createElement('source');
        _this.demoAudio3src.setAttribute("src", window.baseUrl + "questionSounds/AL-ES-G7/" +
            _this.languageSelected + "/AL_ES_G7_d3.mp3");
        _this.demoAudio3.appendChild(_this.demoAudio3src);

        //*  If the Variable is negative , use the flip button to change the sign of the equation.
        _this.demoAudio4 = document.createElement('audio');
        _this.demoAudio4src = document.createElement('source');
        _this.demoAudio4src.setAttribute("src", window.baseUrl + "questionSounds/AL-ES-G7/" +
            _this.languageSelected + "/AL_ES_G7_d4.mp3");
        _this.demoAudio4.appendChild(_this.demoAudio4src);


        //* Solve the equation and find the value of the variable
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/AL-ES-G7/" +
            _this.languageSelected + "/AL_ES_G7_a1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        //* Model the equation using algebraic tiles.
        _this.q2Sound = document.createElement('audio');
        _this.q2Soundsrc = document.createElement('source');
        _this.q2Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/AL-ES-G7/" +
            _this.languageSelected + "/AL_ES_G7_a2.mp3");
        _this.q2Sound.appendChild(_this.q2Soundsrc);

        //* Enter the value of a variable
        _this.q3Sound = document.createElement('audio');
        _this.q3Soundsrc = document.createElement('source');
        _this.q3Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/AL-ES-G7/" +
            _this.languageSelected + "/AL_ES_G7_a3.mp3");
        _this.q3Sound.appendChild(_this.q3Soundsrc);


        _this.video_playing = 0;
        _this.showDemoVideo();  //* call the function to show the video

        _this.skip = _this.add.image(870, 360, 'skipArrow');       //* skip button shown at the bottom
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
        if (_this.demoAudio2Timer) clearTimeout(_this.demoAudio2Timer);
        if (_this.demoAudio4Timer) clearTimeout(_this.demoAudio4Timer);
        if (_this.demoAudio5Timer) clearTimeout(_this.demoAudio5Timer);
        if (_this.demoAudio6Timer) clearTimeout(_this.demoAudio6Timer);


        if (_this.demoAudio1) {
            _this.demoAudio1.pause();
            _this.demoAudio1 = null;
            _this.demoAudio1src = null;
        }
        if (_this.demoAudio2) {
            _this.demoAudio2.pause();
            _this.demoAudio2 = null;
            _this.demoAudio2src = null;
        }
        if (_this.demoAudio3) {
            _this.demoAudio3.pause();
            _this.demoAudio3 = null;
            _this.demoAudio3src = null;
        }
        if (_this.demoAudio4) {
            _this.demoAudio4.pause();
            _this.demoAudio4 = null;
            _this.demoAudio4src = null;
        }

        if (_this.q1Sound) {
            _this.q1Sound.pause();
            _this.q1Sound = null;
            _this.q1Soundsrc = null;
        }

        if (_this.q2Sound) {
            _this.q2Sound.pause();
            _this.q2Sound = null;
            _this.q2Soundsrc = null;
        }

        if (_this.q3Sound) {
            _this.q3Sound.pause();
            _this.q3Sound = null;
            _this.q3Soundsrc = null;
        }

        _this.skip.events.onInputDown.removeAll();
        _this.skip.destroy();
    },

    q1S: function () {
        console.log("inside q1S.....")
        _this.q2Sound.play();
    },

    dA1: function () {
        console.log("inside dA1.....")
        _this.demoAudio1Timer = setTimeout(function ()    //* demoAudio1Timer js timer to play demoAudio1 after 5 seconds.
        {
            _this.demoVideo_1.playbackRate = 0;
            clearTimeout(_this.demoAudi1Timer);    //* clear the time once its used.
            _this.demoAudio1.play();
        }, 5000);


    },

    dA2: function () {
        console.log("inside dA2.....")
        _this.demoVideo_1.playbackRate = 1;
        _this.demoAudio2Timer = setTimeout(function ()    //* demoAudio2Timer js timer to play demoAudio2 after 14.5 seconds.
        {
            clearTimeout(_this.demoAudi2Timer);     //* clear the time once its used.
            _this.demoAudio2.play();
        }, 14500);
    },

    dA4: function () {
        console.log("inside dA4.....")
        _this.demoVideo_1.playbackRate = 0;
        _this.demoAudio4.play();
    },

    dA5: function () {
        _this.demoVideo_1.playbackRate = 1;
        console.log("inside dA5.....");
        _this.demoAudio6Timer = setTimeout(function ()    //* demoAudio6Timer js timer to play q3sound after 4 seconds.
        {
            clearTimeout(_this.demoAudio6Timer);         //* clear the time once its used.
            _this.q3Sound.play();
        }, 4000);
    },

    showDemoVideo: function () {
        // * As _this.game is paused, phaser time events cannot be used since its timer is stopped.
        // * so we have to use js timers as required
        _this.demoVideo_1 = _this.add.video('alesg7');
        _this.demoVideo_1.play(false);
        _this.video_playing = 1;
        _this.demoVideo_1.changeSource(window.baseUrl + "assets/demoVideos/AL-ES-G7.mp4");
        _this.videoWorld_1 = _this.demoVideo_1.addToWorld();


        _this.q1Sound.play();
        //* Here the audios are added one after the other
        _this.q1Sound.addEventListener('ended', _this.q1S);
        _this.q2Sound.addEventListener('ended', _this.dA1);
        _this.demoAudio1.addEventListener('ended', _this.dA2);

        _this.demoAudio4Timer = setTimeout(function ()    //* demoAudio4Timer js timer to play demoAudio4 after 46 seconds.
        {
            console.log("inside dA3.....")
            // _this.demoVideo_1.playbackRate = 0;     //* pausing the video 
            clearTimeout(_this.demoAudio4Timer);     //* clear the time once its used.
            _this.demoAudio3.play();
        }, 48000);
        _this.demoAudio3.addEventListener('ended', _this.dA4);

        // _this.demoAudio5Timer = setTimeout(function ()    //* demoAudio5Timer js timer to play demoAudio5 after 56.2 seconds.
        // {
        //     console.log("inside dA5");
        //     _this.demoVideo_1.playbackRate = 0;           //* pausing the video 
        //     clearTimeout(_this.demoAudio5Timer);         //* clear the time once its used.
        //     _this.demoAudio4.play();
        // }, 56800);

        _this.demoAudio4.addEventListener('ended', _this.dA5);



        _this.demoVideo_1.onComplete.add(function ()   //* on completion of demovideo close the video
        {
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



