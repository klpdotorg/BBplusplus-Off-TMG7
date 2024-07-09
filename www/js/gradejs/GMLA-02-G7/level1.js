Game.GMLA_02_G7level1 = function () { };


Game.GMLA_02_G7level1.prototype =
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

        _this.celebrationSound = document.createElement('audio');
        _this.celebrationSoundsrc = document.createElement('source');
        _this.celebrationSoundsrc.setAttribute("src", window.baseUrl + "sounds/celebration.mp3");
        _this.celebrationSound.appendChild(_this.celebrationSoundsrc);

        _this.wrongSound = document.createElement('audio');
        _this.wrongSoundsrc = document.createElement('source');
        _this.wrongSoundsrc.setAttribute("src", window.baseUrl + "sounds/WrongCelebrationSound.mp3");
        _this.wrongSound.appendChild(_this.wrongSoundsrc);

        _this.Drag_Snap = document.createElement('audio');
        _this.Drag_SnapSoundsrc = document.createElement('source');
        _this.Drag_SnapSoundsrc.setAttribute("src", window.baseUrl + "sounds/Drag_Snap.mp3");
        _this.Drag_Snap.appendChild(_this.Drag_SnapSoundsrc);

        _this.ladder_Sound = document.createElement('audio');
        _this.ladder_SoundSoundsrc = document.createElement('source');
        _this.ladder_SoundSoundsrc.setAttribute("src", window.baseUrl + "sounds/ladder.mp3");
        _this.ladder_Sound.appendChild(_this.ladder_SoundSoundsrc);

        _this.Ask_Question1 = _this.createAudio("GMLA_02_G7_a1");
        _this.Ask_Question2 = _this.createAudio("GMLA_02_G7_a2");
        _this.Ask_Question3 = _this.createAudio("GMLA_02_G7_a3");
        _this.Ask_Question4 = _this.createAudio("GMLA_02_G7_a4");


        _this.Ask_Question5 = _this.createAudio("GMLA_02_G7_h1");
        _this.Ask_Question6 = _this.createAudio("GMLA_02_G7_h2");

        telInitializer.gameIdInit("GMLA_02_G7", gradeSelected);
        console.log(gameID,"gameID...");
    },

    create: function (game) {

        //* start the game with delay. Since the Demo video will pause the game, the timer will freeze
        //* and then start after the game is unpaused and continues to call the gameCreate function.
        _this.time.events.add(1500, function () {
            console.log("//////////////////")
            _this.gameCreate(game);
        });
    },

    gameCreate: function (game) {
        _this.questionid = null;
        _this.noofAttempts = 0;
        _this.sceneCount = 0;
        _this.AnsTimerCount = 0;

        _this.microConcepts;

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
        _this.limit = 0;
        _this.audioTrack = 0;
        _this.tickBtn = 0;
        _this.tickBtn2 = 0;
        _this.tickBtn3 = 0;
        _this.shake = new Phaser.Plugin.Shake(game);
        game.plugins.add(_this.shake);

        //
        _this.box1_value = 0;
        _this.box2_value = 0;
        _this.box3_value = 0;
        _this.idx = 0;
        _this.bxClickCount = 0;
        _this.pairCount = 0;

        //    _this.grp4 = _this.add.group();
        // _this.grp2 = _this.add.group();
        // _this.grp3 = _this.add.group();
        _this.optionCheckArray = [];

        //_this.finalVal = 90; //

        _this.counterForTimer = 0;
        _this.arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        _this.shuffle(_this.arr);

        _this.empty_pos1Array = [0, 0, 0, 0];
        _this.tweenObjectGroup = _this.add.group();
        _this.clearScreenArray = [];


        _this.speakerbtnClicked = false;
        _this.rightbtn_Clicked = false;

        _this.background = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'bg');
        _this.navBar = _this.add.sprite(0, 0, 'navBar');

        _this.backbtn = _this.add.sprite(5, 6, 'backbtn');
        _this.backbtn.inputEnabled = true;
        _this.backbtn.input.useHandCursor = true;
        _this.backbtn.events.onInputDown.add(function () {
            //_this.state.start('GMPAR_01_G6Score');
            console.log("inside backbutton function");
            _this.stopVoice();
            _this.time.events.removeAll();
            _this.backbtn.events.onInputDown.removeAll();

            _this.time.events.add(50, function () {
                _this.state.start('grade7Geometry');
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
                else if (_this.Question_flag == 1) {
                    _this.Ask_Question2.play();
                } else if (_this.Question_flag == 2) {
                    _this.Ask_Question3.play();
                } else if (_this.Question_flag == 3) {
                    _this.Ask_Question4.play();
                } else if (_this.Question_flag == 4) {
                    _this.Ask_Question5.play();
                } else if (_this.Question_flag == 5) {
                    _this.Ask_Question6.play();
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
        _this.hintBtn = _this.add.sprite(670, 6, 'bulb');
        _this.hintBtn.scale.setTo(0.5, 0.6);
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
                // _this.ViewDemoVideo();

                _this.ViewHintInstruction();
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
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-02-G7/" + _this.languageSelected + "/" + src + ".mp3");
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
        //timer.setText(minutes + ':'+ seconds );
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

    getQuestion: function (target) {
        _this.noofAttempts = 0;
        _this.AnsTimerCount = 0;

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
            _this.AnsTimerCount++;
        }, _this);

        _this.sceneCount++;

        _this.timer1.start();

        /************************$$$$$$$$$$**********************/

        //  Start the timer running - this is important!
        //  It won't start automatically, allowing you to hook it to button events and the like.

        _this.speakerbtn.inputEnabled = true;
        _this.speakerbtn.input.useHandCursor = true;

        _this.Initial_randomizing();
        //_this.displayfirstPart();
        //_this.displayPartTwo();
        _this.decideThePart();

    },

    pauseVoice: function () {
        if (_this.Ask_Question1) {
            _this.Ask_Question1.pause();
            _this.Ask_Question1.currentTime = 0.0;
        }
        if (_this.Ask_Question2) {
            _this.Ask_Question2.pause();
            _this.Ask_Question2.currentTime = 0.0;
        }
        if (_this.Ask_Question3) {
            _this.Ask_Question3.pause();
            _this.Ask_Question3.currentTime = 0.0;
        }
        if (_this.Ask_Question4) {
            _this.Ask_Question4.pause();
            _this.Ask_Question4.currentTime = 0.0;
        }
        if (_this.Ask_Question5) {
            _this.Ask_Question5.pause();
            _this.Ask_Question5.currentTime = 0.0;
        }
        if (_this.Ask_Question6) {
            _this.Ask_Question6.pause();
            _this.Ask_Question6.currentTime = 0.0;
        }
    },

    Initial_randomizing: function () {
        //* Randomize to get angles for complimentary and supplimentary
        //* first 4 question will be asked to identify the odd card out of 3 
        //* 2 complementary question and 2 supplimentary
        //* last 2 is to find the pair for complementary and supplimentary

        _this.shapesArray = [1, 2, 3]; //,2,3
        _this.shapesArray = _this.shuffle(_this.shapesArray);

        // _this.decideQuardrants = [0, 90, 180, 270];
        // _this.decideQuardrants = _this.shuffle(_this.decideQuardrants);
        // _this.decideQuardrants2 = [0, 90, 180, 270];
        // _this.decideQuardrants2 = _this.shuffle(_this.decideQuardrants2);
        // _this.arcStartAngle = 180;

        _this.Aarray = [];
        _this.Barray = [];
        _this.Carray = [];

        _this.n1Array = [];
        _this.n2Array = [];
        _this.n3Array = [];
        _this.n4Array = [];

        let num1, num2;//compl
        let num3, num4;//supp
        //Complementary
        for (i = 0; i < 4; i++) {
            do {
                num1 = Math.floor(Math.random() * 89) + 20;
                num2 = Math.floor(Math.random() * 89) + 20;
            } while (num1 + num2 !== 90 || _this.n1Array.includes(num1) || _this.n1Array.includes(num2) || _this.n2Array.includes(num2) || _this.n2Array.includes(num1));

            _this.n1Array.push(num1);
            _this.n2Array.push(num2);

            // do {
            //     num1 = Math.floor(Math.random() * 89) + 20;
            //     num2 = Math.floor(Math.random() * 89) + 20;
            // } while (num1 + num2 !== 90 || _this.n1Array.includes(num1) || _this.n2Array.includes(num2));

        }
        //Supplimentary
        for (i = 4; i < 8; i++) {
            do {
                num3 = Math.floor(Math.random() * 170) + 20;
                num4 = Math.floor(Math.random() * 170) + 20;
            } while (num3 + num4 !== 180 || _this.n3Array.includes(num3) || _this.n3Array.includes(num4) || _this.n4Array.includes(num4) || _this.n4Array.includes(num3));

            _this.n3Array.push(num3);
            _this.n4Array.push(num4);
        }

        console.log(`The two n1Array n3 are`, _this.n1Array);
        console.log(`The two n2Array n4 are`, _this.n2Array);
        console.log(`The two n1Array n3 are`, _this.n3Array);
        console.log(`The two n2Array n4 are`, _this.n4Array);

        _this.pairArray = ["A", "B", "C"];//  _this.pairArray = ["A", "B", "C"];
        _this.pairArray = _this.shuffle(_this.pairArray);
        for (i = 0; i < 2; i++) {// for (i = 0; i < 2; i++)


            _this.aVal = Math.floor(Math.random() * (80 - 20) + 20);
            _this.bVal = Math.floor(Math.random() * (80 - 20) + 20);
            _this.cVal = Math.floor(Math.random() * (90 - 20) + 20);

            while (_this.aVal + _this.bVal != 90) {
                console.log("hii");
                _this.aVal = Math.floor(Math.random() * (80 - 20) + 20);
                _this.bVal = Math.floor(Math.random() * (80 - 20) + 20);
            }

            while (_this.aVal + _this.cVal == 90 || _this.bVal + _this.cVal == 90) {
                console.log("hii 90 c while");
                _this.cVal = Math.floor(Math.random() * (90 - 20) + 20);
            }
            _this.Aarray.push(_this.aVal);
            _this.Barray.push(_this.bVal);
            _this.Carray.push(_this.cVal);
        }

        for (i = 2; i < 4; i++) {//  for (i = 2; i < 4; i++) 
            //Supplimentary 
            _this.a1Val = Math.floor(Math.random() * (170 - 20) + 20);
            _this.b1Val = Math.floor(Math.random() * (170 - 20) + 20);
            _this.c1Val = Math.floor(Math.random() * (170 - 20) + 20);

            while (_this.a1Val + _this.b1Val != 180) {
                console.log("hii");
                _this.a1Val = Math.floor(Math.random() * (170 - 20) + 20);
                _this.b1Val = Math.floor(Math.random() * (170 - 20) + 20);
            }

            while (_this.a1Val + _this.c1Val == 180 || _this.b1Val + _this.c1Val == 180) {
                console.log("hii 180 c while");
                _this.c1Val = Math.floor(Math.random() * (170 - 20) + 20);
            }

            _this.Aarray.push(_this.a1Val);
            _this.Barray.push(_this.b1Val);
            _this.Carray.push(_this.c1Val);
        }

        console.log("pairArray", _this.pairArray);
        console.log("aVal", _this.Aarray);
        console.log("bval", _this.Barray);
        console.log("cval", _this.Carray);
        //console.log("_this.cVal +",  _this.cVal +_this.aVal, _this.cVal +_this.bVal);

    },

    dragtoBottomTween: function () {
        if (_this.finalVal == _this.box1_val) _this.x = 160;
        if (_this.finalVal == _this.box2_val) _this.x = 400;
        if (_this.finalVal == _this.box3_val) _this.x = 720;
        //* show hand signs on the devide sign as wel as on flip button
        _this.time.events.add(500, function () {
            _this.hand = _this.add.image(140, 450, 'hand');//620,110
            _this.hand.scale.setTo(0.5, 0.5);
        });
        _this.time.events.add(1000, function () {
            //* add tween to temp group and tween it to work space.
            tempDragAction = _this.add.tween(_this.hand);
            tempDragAction.to({ x: _this.x, y: 230 }, 500, 'Linear', true, 0);
            tempDragAction.start();
        });

        _this.time.events.add(2500, function () {
            console.log("hey HAndddddd")
            _this.hand.destroy();
        });
    },


    displayfirstPart: function () {
        //* Display the cards and objects for first part
        console.log("hiii...................")
        _this.grp1 = _this.add.group();
        _this.grp2 = _this.add.group();
        _this.grp3 = _this.add.group();
        _this.grp4 = _this.add.group();
        _this.grp5 = _this.add.group();

        // Create a new circle sprite
        // var circle = _this.game.add.graphics(450, 200);
        // circle.beginFill(0xff0000);
        // circle.drawCircle(0, 0, 50);
        // circle.endFill();

        // var circle = _this.game.add.image(220, 100, 'watermelon');

        // // // Create a new mask graphics object
        // var mask = _this.game.add.graphics(420, 300);
        // console.log(_this.Aarray[_this.count1],"_this.Aarray[_this.count1]");
        // // Draw a sector shape on the mask graphics object
        // mask.beginFill(0xffffff);
        // mask.moveTo(0, 0);
        // mask.lineTo(50, 0);
        // mask.arc(0, 0, -250, _this.game.math.degToRad(0), _this.game.math.degToRad(360 - _this.Aarray[_this.count1]), true);
        // mask.lineTo(0, 0);
        // mask.endFill();

        // // Apply the mask to the circle sprite
        // circle.mask = mask;
        if (_this.count1 == 0) {
            _this.Ask_Question1.play();
        }

        if (_this.count1 == 2) {
            _this.Question_flag = 1;
            _this.Ask_Question2.play();
        }

        //_this.dragtoBottomTween();
        _this.itemsToDisplay = ["pizza", "pie", "watermelon"];//, "pizza", "pie","watermelon", "pizza", "pie"
        _this.itemsToDisplay = _this.shuffle(_this.itemsToDisplay);
        //var circle = _this.game.add.image(40, 80, 'watermelon');
        _this.decideTheOptions();

        _this.box1_1 = _this.add.image(35, 70, 'box_1');
        _this.box1_1.scale.setTo(0.95, 1);
        _this.grp1.addChild(_this.box1_1);
        _this.box1_2 = _this.add.image(340, 70, 'box_1');
        _this.box1_2.scale.setTo(0.95, 1);
        _this.grp2.addChild(_this.box1_2);
        _this.box1_3 = _this.add.image(640, 70, 'box_1');
        _this.box1_3.scale.setTo(0.95, 1);
        _this.grp3.addChild(_this.box1_3);

        _this.clearScreenArray.push(_this.box1_1);
        _this.clearScreenArray.push(_this.box1_2);
        _this.clearScreenArray.push(_this.box1_3);

        if (_this.box1_val < 100) {
            _this.digree1Val = _this.add.text(260, 80, _this.box1_val + "\u{00B0}");
        } else {
            _this.digree1Val = _this.add.text(250, 80, _this.box1_val + "\u{00B0}");

        }
        _this.applyingStyle(_this.digree1Val);
        _this.grp1.addChild(_this.digree1Val);

        if (_this.box2_val < 100) {
            _this.digree2Val = _this.add.text(565, 80, _this.box2_val + "\u{00B0}");
        } else {
            _this.digree2Val = _this.add.text(550, 80, _this.box2_val + "\u{00B0}");
        }

        _this.applyingStyle(_this.digree2Val);
        _this.grp2.addChild(_this.digree2Val);
        if (_this.box3_val < 100) {
            _this.digree3Val = _this.add.text(865, 80, _this.box3_val + "\u{00B0}");
        } else {
            _this.digree3Val = _this.add.text(840, 80, _this.box3_val + "\u{00B0}");
        }
        _this.applyingStyle(_this.digree3Val);
        _this.grp3.addChild(_this.digree3Val);

        _this.clearScreenArray.push(_this.digree1Val);
        _this.clearScreenArray.push(_this.digree2Val);
        _this.clearScreenArray.push(_this.digree3Val);

        _this.box1_1.inputEnabled = true;
        _this.box1_2.inputEnabled = true;
        _this.box1_3.inputEnabled = true;

        _this.box1_1.input.useHandCursor = true;
        _this.box1_2.input.useHandCursor = true;
        _this.box1_3.input.useHandCursor = true;

        _this.box1_1.events.onInputDown.add(_this.box1Clicked, _this);
        _this.box1_2.events.onInputDown.add(_this.box2Clicked, _this);
        _this.box1_3.events.onInputDown.add(_this.box3Clicked, _this);

        _this.tick_mark = _this.add.image(860, 460, 'TickBtn');
        _this.clearScreenArray.push(_this.tick_mark);
        _this.tick_mark.frame = 1;
        _this.tick_mark.inputEnabled = true;
        _this.tick_mark.input.useHandCursor = true;
        _this.tick_mark.events.onInputDown.add(_this.validateTickClick, _this);


        _this.circle = _this.game.add.image(_this.x1, _this.y1, _this.itemsToDisplay[_this.idx]);//-15 -q1
        if (_this.itemsToDisplay[_this.idx] == "watermelon") {
            console.log("Malonn");
            _this.circle.scale.setTo(0.6, 0.7);
        } else if (_this.itemsToDisplay[_this.idx] == "pie") {
            _this.circle.scale.setTo(0.69, 0.79);
        } else {
            _this.circle.scale.setTo(0.64, 0.74);
        }
        _this.grp1.addChild(_this.circle);
        _this.clearScreenArray.push(_this.circle);

        _this.mask = _this.game.add.graphics(_this.x2, _this.y2);
        console.log(_this.box1_val, "_this.Aarray[_this.count1]");//115 -q1
        _this.grp1.addChild(_this.mask);

        _this.clearScreenArray.push(_this.mask);
        // Draw a sector shape on the mask graphics object
        _this.mask.beginFill(0xffffff);
        _this.mask.moveTo(0, 0);
        _this.mask.lineTo(50, 0);//0,90,180,270
        _this.arcStartAngle = _this.decideQuardrants[0];
        _this.arcEndAngle = _this.arcStartAngle + _this.box1_val;

        _this.mask.arc(0, 0, 250, _this.game.math.degToRad(_this.arcStartAngle), _this.game.math.degToRad(_this.arcEndAngle), false);//360 - _this.Aarray[_this.count1]//_this.box1_val

        // mask.arc(0, 0, 250, _this.game.math.degToRad(0), _this.game.math.degToRad(360 - _this.box1_val), true);//360 - _this.Aarray[_this.count1]//_this.box1_val
        _this.mask.lineTo(0, 0);
        _this.mask.endFill();
        // Apply the mask to the circle sprite
        _this.circle.mask = _this.mask;

        _this.circle2 = _this.game.add.image(_this.x3, _this.y3, _this.itemsToDisplay[1]);//_this.x3 _this.y3
        if (_this.itemsToDisplay[1] == "watermelon") {
            console.log("Malonn");
            _this.circle2.scale.setTo(0.6, 0.7);
        } else if (_this.itemsToDisplay[1] == "pie") {
            _this.circle2.scale.setTo(0.69, 0.79);
        } else {
            _this.circle2.scale.setTo(0.64, 0.74);
        }
        _this.grp2.addChild(_this.circle2);
        _this.saveX = _this.x3;
        _this.saveY = _this.y3;
        console.log(_this.saveX, _this.saveY, " _this.saveX, _this.savey");

        _this.clearScreenArray.push(_this.circle2);
        _this.mask2 = _this.game.add.graphics(_this.x4, _this.y4);//_this.x4,_this.y4
        console.log(_this.box2_val, "_this.Barray[_this.count1]");
        _this.grp2.addChild(_this.mask2);
        _this.clearScreenArray.push(_this.mask2);
        // Draw a sector shape on the mask graphics object
        _this.mask2.beginFill(0xffffff);
        _this.mask2.moveTo(0, 0);
        _this.mask2.lineTo(50, 0);

        _this.arcStartAngle1 = _this.decideQuardrants[1];
        _this.arcEndAngle1 = _this.arcStartAngle1 + _this.box2_val;

        _this.mask2.arc(0, 0, 250, _this.game.math.degToRad(_this.arcStartAngle1), _this.game.math.degToRad(_this.arcEndAngle1), false);//360 - _this.Aarray[_this.count1]
        _this.mask2.lineTo(0, 0);
        _this.mask2.endFill();

        _this.circle2.mask = _this.mask2;

        _this.circle3 = _this.game.add.image(_this.x5, _this.y5, _this.itemsToDisplay[2]);
        if (_this.itemsToDisplay[2] == "watermelon") {
            console.log("Malonn");
            _this.circle3.scale.setTo(0.6, 0.7);
        } else if (_this.itemsToDisplay[2] == "pie") {
            _this.circle3.scale.setTo(0.69, 0.79);
        } else {
            _this.circle3.scale.setTo(0.64, 0.74);
        }

        _this.grp3.addChild(_this.circle3);

        _this.clearScreenArray.push(_this.circle3);

        _this.mask3 = _this.game.add.graphics(_this.x6, _this.y6);
        console.log(_this.box3_val, "_this.Carray[_this.count1]");
        _this.grp3.addChild(_this.mask3);
        _this.clearScreenArray.push(_this.mask3);
        // Draw a sector shape on the mask graphics object
        _this.mask3.beginFill(0xffffff);
        _this.mask3.moveTo(0, 0);
        _this.mask3.lineTo(50, 0);
        _this.arcStartAngle2 = _this.decideQuardrants[2];
        _this.arcEndAngle2 = _this.arcStartAngle2 + _this.box3_val;
        _this.mask3.arc(0, 0, 250, _this.game.math.degToRad(_this.arcStartAngle2), _this.game.math.degToRad(_this.arcEndAngle2), false);//360 - _this.Aarray[_this.count1]
        _this.mask3.lineTo(0, 0);
        _this.mask3.endFill();
        //
        _this.circle3.mask = _this.mask3;
    },

    decideTheOptions: function () {
        //* shuffle and decide the angles to be asked in a card
        if (_this.pairArray[0] == "A") {
            _this.box1_val = _this.Aarray[_this.count1];

        } else if (_this.pairArray[0] == "B") {
            _this.box1_val = _this.Barray[_this.count1];
        } else {
            _this.box1_val = _this.Carray[_this.count1];
        }

        if (_this.pairArray[1] == "A") {
            _this.box2_val = _this.Aarray[_this.count1];

        } else if (_this.pairArray[1] == "B") {
            _this.box2_val = _this.Barray[_this.count1];
        } else {
            _this.box2_val = _this.Carray[_this.count1];
        }

        if (_this.pairArray[2] == "A") {
            _this.box3_val = _this.Aarray[_this.count1];

        } else if (_this.pairArray[2] == "B") {
            _this.box3_val = _this.Barray[_this.count1];
        } else {
            _this.box3_val = _this.Carray[_this.count1];
        }

        if (_this.count1 == 0 || _this.count1 == 1) {
            if (_this.box1_val + _this.box2_val == 90) {
                _this.finalVal = _this.box3_val;
            } else if (_this.box1_val + _this.box3_val == 90) {
                _this.finalVal = _this.box2_val;
            } else {
                _this.finalVal = _this.box1_val;
            }
        } else {
            //Original code upper one is to test
            if (_this.box1_val + _this.box2_val == 180) {
                _this.finalVal = _this.box3_val;
            } else if (_this.box1_val + _this.box3_val == 180) {
                _this.finalVal = _this.box2_val;
            } else {
                _this.finalVal = _this.box1_val;
            }
        }

        if (_this.count1 < 2) {
            console.log("positionForComplementaryAngles")
            _this.positionForComplementaryAngles();
        } else {
            console.log("positionForSupplimentary")
            _this.positionForSupplimentary();
        }
    },

    positionForComplementaryAngles: function () {
        //* decide x and y for the arcs
        if (_this.decideQuardrants[0] == 0) {
            _this.x1 = 5;
            _this.x2 = 125;
            _this.y1 = 70;
            _this.y2 = 210;
        } else if (_this.decideQuardrants[0] == 90) {
            _this.x1 = 60;
            _this.x2 = 200;
            _this.y1 = 50;
            _this.y2 = 190;
        }
        else if (_this.decideQuardrants[0] == 180) {
            _this.x1 = 100;
            _this.x2 = 230;
            _this.y1 = 140;
            _this.y2 = 280;
        }
        else if (_this.decideQuardrants[0] == 270) {
            _this.x1 = 5;
            _this.x2 = 125;
            _this.y1 = 160;
            _this.y2 = 310;

        }
        // second box 
        if (_this.decideQuardrants[1] == 0) {
            _this.x3 = 315;
            _this.x4 = 435;
            _this.y3 = 70;
            _this.y4 = 210;
        } else if (_this.decideQuardrants[1] == 90) {
            _this.x3 = 385;
            _this.x4 = 510;
            _this.y3 = 50;
            _this.y4 = 190;
        }
        else if (_this.decideQuardrants[1] == 180) {
            _this.x3 = 420;
            _this.x4 = 555;
            _this.y3 = 140;
            _this.y4 = 280;
        }
        else if (_this.decideQuardrants[1] == 270) {
            _this.x3 = 330;
            _this.x4 = 450;
            _this.y3 = 160;
            _this.y4 = 310;
        }
        // Third Box
        if (_this.decideQuardrants[2] == 0) {
            _this.x5 = 610;
            _this.x6 = 725;
            _this.y5 = 70;
            _this.y6 = 210;
        } else if (_this.decideQuardrants[2] == 90) {
            _this.x5 = 690;
            _this.x6 = 815;
            _this.y5 = 50;
            _this.y6 = 190;
        }
        else if (_this.decideQuardrants[2] == 180) {
            _this.x5 = 715;
            _this.x6 = 850;
            _this.y5 = 140;
            _this.y6 = 280;
        }
        else if (_this.decideQuardrants[2] == 270) {
            _this.x5 = 630;
            _this.x6 = 750;
            _this.y5 = 160;
            _this.y6 = 310;
        }
    },

    positionForSupplimentary: function () {
        console.log("positionForSupplimentary");
        //* decide x and y for the arcs
        if (_this.decideQuardrants[0] == 0) {
            if (_this.box1_val < 100) {
                _this.x1 = 5;
                _this.x2 = 125;
                _this.y1 = 70;
                _this.y2 = 210;
            } else {
                _this.x1 = 40;
                _this.x2 = 165;
                _this.y1 = 80;
                _this.y2 = 220;
            }

        } else if (_this.decideQuardrants[0] == 90) {
            if (_this.box1_val < 100) {
                _this.x1 = 70;
                _this.x2 = 200;
                _this.y1 = 60;
                _this.y2 = 210;
            } else {
                _this.x1 = 80;
                _this.x2 = 210;
                _this.y1 = 90;
                _this.y2 = 240;
            }
        }
        else if (_this.decideQuardrants[0] == 180) {
            if (_this.box1_val < 100) {
                _this.x1 = 90;
                _this.x2 = 220;
                _this.y1 = 150;
                _this.y2 = 290;
            } else {
                _this.x1 = 60;
                _this.x2 = 190;
                _this.y1 = 150;
                _this.y2 = 290;
            }

        }
        else if (_this.decideQuardrants[0] == 270) {
            if (_this.box1_val < 100) {
                _this.x1 = 10;
                _this.x2 = 120;
                _this.y1 = 160;
                _this.y2 = 305;
            } else {
                _this.x1 = 10;
                _this.x2 = 120;
                _this.y1 = 130;
                _this.y2 = 280;
            }

        }
        // second box 
        if (_this.decideQuardrants[1] == 0) {
            if (_this.box2_val < 100) {
                _this.x3 = 330;
                _this.x4 = 440;
                _this.y3 = 70;
                _this.y4 = 210;
            } else {
                _this.x3 = 345;
                _this.x4 = 470;
                _this.y3 = 80;
                _this.y4 = 225;
            }

        } else if (_this.decideQuardrants[1] == 90) {
            if (_this.box2_val < 100) {
                _this.x3 = 390;
                _this.x4 = 520;
                _this.y3 = 60;
                _this.y4 = 210;
            } else {
                _this.x3 = 390;
                _this.x4 = 520;
                _this.y3 = 80;
                _this.y4 = 240;
            }

        }
        else if (_this.decideQuardrants[1] == 180) {
            if (_this.box2_val < 100) {
                _this.x3 = 395;
                _this.x4 = 530;
                _this.y3 = 150;
                _this.y4 = 290;
            } else {
                _this.x3 = 365;
                _this.x4 = 500;
                _this.y3 = 150;
                _this.y4 = 290;
            }

        }
        else if (_this.decideQuardrants[1] == 270) {
            if (_this.box2_val < 100) {
                _this.x3 = 330;
                _this.x4 = 450;
                _this.y3 = 150;
                _this.y4 = 295;
            } else {
                _this.x3 = 320;
                _this.x4 = 440;
                _this.y3 = 150;
                _this.y4 = 300;
            }
        }
        // Third Box
        if (_this.decideQuardrants[2] == 0) {
            if (_this.box3_val < 100) {
                _this.x5 = 620;
                _this.x6 = 745;
                _this.y5 = 70;
                _this.y6 = 210;
            } else {
                _this.x5 = 645;
                _this.x6 = 775;
                _this.y5 = 70;
                _this.y6 = 210;
            }
        } else if (_this.decideQuardrants[2] == 90) {
            if (_this.box3_val < 100) {
                _this.x5 = 690;
                _this.x6 = 820;
                _this.y5 = 60;
                _this.y6 = 210;
            } else {
                _this.x5 = 690;
                _this.x6 = 820;
                _this.y5 = 80;
                _this.y6 = 230;
            }

        }
        else if (_this.decideQuardrants[2] == 180) {
            if (_this.box3_val < 100) {
                _this.x5 = 700;
                _this.x6 = 850;
                _this.y5 = 150;
                _this.y6 = 290;
            } else {
                _this.x5 = 665;
                _this.x6 = 790;
                _this.y5 = 150;
                _this.y6 = 290;
            }
        }
        else if (_this.decideQuardrants[2] == 270) {
            if (_this.box3_val < 100) {
                _this.x5 = 625;
                _this.x6 = 745;
                _this.y5 = 150;
                _this.y6 = 295;
            } else {
                _this.x5 = 625;
                _this.x6 = 745;
                _this.y5 = 140;
                _this.y6 = 285;
            }
        }
    },


    box1Clicked: function () {
        //* part two when the box is clicked
        _this.clickSound.play();
        console.log("hlo")
        if (_this.box1_1.frame == 0) {
            _this.noofAttempts++;
            _this.box1_1.frame = 1;
            _this.box1_value = _this.box1_val;
            console.log(_this.box1_value, " _this.box1_value");
        } else {
            _this.noofAttempts++;
            _this.box1_1.frame = 0;
            _this.box1_value = 0;
            console.log(_this.box1_value, " _this.box1_value");
        }
        // if(_this.box1_1.frame ==1)_this.box1_1.frame =0;

    },

    box2Clicked: function () {
        _this.clickSound.play();
        console.log("hlo")
        if (_this.box1_2.frame == 0) {
            _this.noofAttempts++;
            _this.box1_2.frame = 1;
            _this.box2_value = _this.box2_val;
            console.log(_this.box2_value, " _this.box2_value");

        } else {
            _this.noofAttempts++;
            _this.box1_2.frame = 0;
            _this.box2_value = 0;
            console.log(_this.box2_value, " _this.box2_value");
        }
        // if(_this.box1_1.frame ==1)_this.box1_1.frame =0;

    },

    box3Clicked: function () {
        _this.clickSound.play();
        console.log("hlo")
        if (_this.box1_3.frame == 0) {
            _this.noofAttempts++;
            _this.box1_3.frame = 1;
            _this.box3_value = _this.box3_val;
            console.log(_this.box3_value, " _this.box3_value");
        } else {
            _this.noofAttempts++;
            _this.box1_3.frame = 0;
            _this.box3_value = 0;
            console.log(_this.box3_value, " _this.box3_value");
        }
        // if(_this.box1_1.frame ==1)_this.box1_1.frame =0;

    },

    validateTickClick: function () {
        console.log("kooo")
        if (_this.box1_value == 0 && _this.box2_value == 0 && _this.box3_value == 0) {
            _this.noofAttempts++;
            _this.wrongSound.play();
            if (_this.box1_1.frame == 1) _this.box1_1.frame = 0;
            if (_this.box1_2.frame == 1) _this.box1_2.frame = 0;
            if (_this.box1_3.frame == 1) _this.box1_3.frame = 0;

        } else if (_this.box1_value == _this.finalVal && _this.box3_value == 0 && _this.box2_value == 0) {
            _this.noofAttempts++;
            _this.celebrationSound.play();
            _this.starActions(_this.count1);
            _this.animGroup = _this.grp1;
            _this.endingAnim();
            if (_this.tick_mark) _this.tick_mark.destroy();
            _this.time.events.add(6300, () => {
                _this.eraseScreen();
                _this.decideThePart();
            });


        } else if (_this.box3_value == _this.finalVal && _this.box2_value == 0 && _this.box1_value == 0) {
            _this.noofAttempts++;
            _this.celebrationSound.play();
            _this.starActions(_this.count1);
            _this.animGroup = _this.grp3;
            _this.endingAnim();
            if (_this.tick_mark) _this.tick_mark.destroy();
            _this.time.events.add(6300, () => {
                _this.eraseScreen();
                _this.decideThePart();
            });

        } else if (_this.box2_value == _this.finalVal && _this.box1_value == 0 && _this.box3_value == 0) {
            _this.noofAttempts++;
            _this.celebrationSound.play();
            _this.starActions(_this.count1);
            _this.animGroup = _this.grp2;
            _this.endingAnim();
            if (_this.tick_mark) _this.tick_mark.destroy();
            _this.time.events.add(6300, () => {
                _this.eraseScreen();
                _this.decideThePart();
            });

        } else {
            _this.noofAttempts++;
            console.log("Canttt !")
            _this.wrongSound.play();
            _this.box1_value = 0;
            _this.box2_value = 0;
            _this.box3_value = 0;
            if (_this.box1_1.frame == 1) _this.box1_1.frame = 0;
            if (_this.box1_2.frame == 1) _this.box1_2.frame = 0;
            if (_this.box1_3.frame == 1) _this.box1_3.frame = 0;
        }
    },

    displaytheEndingD: function () {
        //* displaying digree at the end after animation (in red color)
        if (_this.count1 < 3) {
            _this.complementary = _this.add.text(470, 80, 90 + "\u{00B0}");
            _this.applyingStyleRed(_this.complementary);
            _this.clearScreenArray.push(_this.complementary);
            // _this.positionForComplementaryAngles();

        } else {

            if (_this.y3 < 100) {
                _this.supplimantary = _this.add.text(560, 70, 180 + "\u{00B0}");
                _this.applyingStyleRed(_this.supplimantary);
                _this.clearScreenArray.push(_this.supplimantary);

            } else {
                _this.supplimantary = _this.add.text(470, 70, 180 + "\u{00B0}");
                _this.applyingStyleRed(_this.supplimantary);
                _this.clearScreenArray.push(_this.supplimantary);
            }
        }
    },

    //* Latest one
    endingAnim: function () {
        //* ending animation at the end of each question
        console.log("animm")
        if (_this.animGroup == _this.grp1) {
            console.log("grp1");
            _this.moveItem = _this.grp3;
            _this.flag = 1;

        } else if (_this.animGroup == _this.grp3) {
            _this.moveItem = _this.grp1;
            _this.flag = 3;
        } else if (_this.animGroup == _this.grp2) {
            _this.moveItem = _this.grp1;
            _this.moveItem1 = _this.grp3;
            _this.flag = 2;
        }
        console.log(_this.moveItem.name, "_this.moveItem................")

        _this.firstequationTween = _this.add.tween(_this.animGroup).to({ alpha: 0 }, 700, 'Linear', true, 0);
        _this.firstequationTween.onComplete.add(function () {
            _this.animGroup.destroy();

            if (_this.flag == 1) {
                _this.getTheScale();
                if (_this.count1 < 2) {
                    console.log("positionForComplementaryAngles")
                    _this.positionForComplementaryAnglesEndAnim1();
                } else {
                    console.log("positionForSupplimentary")
                    _this.positionForSupplimentaryEndAnim1();
                }
                var circle3 = _this.game.add.image(_this.x5, _this.y5, _this.itemsToDisplay[2]);//_this.x3 _this.y3
                circle3.scale.setTo(_this.scalex1, _this.scaley1);
                circle3.alpha = 0;
                _this.grp5.addChild(circle3);

                _this.clearScreenArray.push(circle3);
                var mask3 = _this.game.add.graphics(_this.x6, _this.y6);//_this.x4,_this.y4
                console.log(_this.box2_val, "_this.Barray[_this.count1]");
                _this.grp5.addChild(mask3);
                _this.clearScreenArray.push(mask3);
                mask3.alpha = 0;

                mask3.beginFill(0xffffff);
                mask3.moveTo(0, 0);
                mask3.lineTo(50, 0);

                _this.arcStartAngleN = _this.arcEndAngle1;
                _this.arcEndAngleN = _this.arcStartAngleN + _this.box3_val;

                mask3.arc(0, 0, 250, _this.game.math.degToRad(_this.arcStartAngleN), _this.game.math.degToRad(_this.arcEndAngleN), false);//360 - _this.Aarray[_this.count1]
                mask3.lineTo(0, 0);
                mask3.endFill();

                circle3.mask = mask3;
                console.log("first", _this.moveItem, "move item");

                // _this.tweenOddbox = _this.add.tween(_this.moveItem);
                // _this.tweenOddbox.to({ x: -310, y: 0 }, 500, 'Linear', true, 0);
                // _this.tweenOddbox.start();
                _this.tweenOddbox = _this.add.tween(_this.box1_2).to({ alpha: 0 }, 900, 'Linear', true, 0);
                _this.tweenOddbox11 = _this.add.tween(_this.grp3).to({ alpha: 0 }, 900, 'Linear', true, 0);//_this.box1_3
                _this.tweenOddbox11.onComplete.add(function () {

                    _this.grp1.destroy();
                    //_this.tweenOddbox111 = _this.add.tween(_this.grp3).to({ alpha: 0 }, 900, 'Linear', true, 0);

                    // _this.tweenOddbox111.onComplete.add(function () {
                    _this.grp3.destroy();
                    _this.digree2Val.destroy();
                    circle3.alpha = 1;
                    mask3.alpha = 1;

                    console.log(_this.y3, _this.y4, "_this.y3,_this.y4 @@@@@@@");


                    _this.firstequationTween1 = _this.add.tween(circle3);
                    _this.firstequationTween1.to({ x: _this.x3, y: _this.y3 }, 1000, 'Linear', true, 0);//- 200
                    _this.firstequationTween1.start();

                    _this.firstequationTween11 = _this.add.tween(mask3);
                    _this.firstequationTween11.to({ x: _this.x4, y: _this.y4 }, 1000, 'Linear', true, 0);//- 200
                    _this.firstequationTween11.start();
                    _this.ladder_Sound.play();
                    _this.firstequationTween11.onComplete.add(function () {
                        _this.displaytheEndingD();
                    })

                })

            } else if (_this.flag == 3) {
                _this.getTheScale1();
                if (_this.count1 < 2) {
                    console.log("positionForComplementaryAngles")
                    _this.positionForComplementaryAnglesEndAnim();
                } else {
                    console.log("positionForSupplimentary")
                    _this.positionForSupplimentaryEndAnim();
                }

                console.log("first", _this.moveItem, "move item");
                var circle3 = _this.game.add.image(_this.x1, _this.y1, _this.itemsToDisplay[0]);//_this.x3 _this.y3
                circle3.scale.setTo(_this.scalex1, _this.scaley1);
                console.log("_this.scalex1, _this.scaley1", _this.scalex1, _this.scaley1);
                circle3.alpha = 0;
                _this.grp5.addChild(circle3);


                _this.clearScreenArray.push(circle3);
                var mask3 = _this.game.add.graphics(_this.x2, _this.y2);//_this.x4,_this.y4
                console.log(_this.box2_val, "_this.Barray[_this.count1]");
                _this.grp5.addChild(mask3);
                _this.clearScreenArray.push(mask3);
                mask3.alpha = 0;

                mask3.beginFill(0xffffff);
                mask3.moveTo(0, 0);
                mask3.lineTo(50, 0);

                _this.arcStartAngleN = _this.arcEndAngle1;
                _this.arcEndAngleN = _this.arcStartAngleN + _this.box1_val;

                mask3.arc(0, 0, 250, _this.game.math.degToRad(_this.arcStartAngleN), _this.game.math.degToRad(_this.arcEndAngleN), false);//360 - _this.Aarray[_this.count1]
                mask3.lineTo(0, 0);
                mask3.endFill();

                circle3.mask = mask3;

                _this.tweenOddbox = _this.add.tween(_this.box1_2).to({ alpha: 0 }, 900, 'Linear', true, 0);
                _this.tweenOddbox11 = _this.add.tween(_this.grp1).to({ alpha: 0 }, 900, 'Linear', true, 0);//_this.box1_3
                _this.tweenOddbox11.onComplete.add(function () {

                    _this.grp3.destroy();

                    _this.grp1.destroy();
                    _this.digree2Val.destroy();

                    circle3.alpha = 1;
                    mask3.alpha = 1;

                    // _this.firstequationTween1 = _this.add.tween(circle3);
                    // _this.firstequationTween1.from({ x: 0, y: 70 }, 1000, 'Linear', true, 0);//- 200
                    // _this.firstequationTween1.start();


                    // _this.firstequationTween11 = _this.add.tween(mask3);
                    // _this.firstequationTween11.from({ x: 130, y: 210 }, 1000, 'Linear', true, 0);//- 200
                    // _this.firstequationTween11.start();
                    console.log(_this.y3, _this.y4, "_this.y3,_this.y4@@@@@@@@@");


                    _this.firstequationTween1 = _this.add.tween(circle3);
                    _this.firstequationTween1.to({ x: _this.x3, y: _this.y3 }, 1000, 'Linear', true, 0);//- 200
                    _this.firstequationTween1.start();


                    _this.firstequationTween11 = _this.add.tween(mask3);
                    _this.firstequationTween11.to({ x: _this.x4, y: _this.y4 }, 1000, 'Linear', true, 0);//- 200
                    _this.firstequationTween11.start();

                    _this.ladder_Sound.play();
                    _this.firstequationTween11.onComplete.add(function () {
                        _this.displaytheEndingD();
                    })
                    //})
                })


            } else if (_this.flag == 2) {
                _this.getTheScale2();
                //***** *
                if (_this.count1 < 2) {
                    console.log("positionForComplementaryAngles")
                    _this.positionForComplementaryAnglesEndAnim2();
                } else {
                    console.log("positionForSupplimentary")
                    _this.positionForSupplimentaryEndAnim2();
                }
                var circle3 = _this.game.add.image(_this.x5, _this.y5, _this.itemsToDisplay[2]);//_this.x3 _this.y3
                circle3.scale.setTo(_this.scalex1, _this.scaley1);//0.6, 0.7
                circle3.alpha = 0;
                _this.grp5.addChild(circle3);


                _this.clearScreenArray.push(circle3);
                var mask3 = _this.game.add.graphics(_this.x6, _this.y6);//_this.x4,_this.y4
                console.log(_this.box2_val, "_this.Barray[_this.count1]");
                _this.grp5.addChild(mask3);
                _this.clearScreenArray.push(mask3);
                mask3.alpha = 0;

                mask3.beginFill(0xffffff);
                mask3.moveTo(0, 0);
                mask3.lineTo(50, 0);

                _this.arcStartAngleN = _this.arcEndAngle;
                _this.arcEndAngleN = _this.arcStartAngleN + _this.box3_val;

                mask3.arc(0, 0, 250, _this.game.math.degToRad(_this.arcStartAngleN), _this.game.math.degToRad(_this.arcEndAngleN), false);//360 - _this.Aarray[_this.count1]
                mask3.lineTo(0, 0);
                mask3.endFill();

                circle3.mask = mask3;

                _this.tweenOddbox = _this.add.tween(_this.grp1).to({ alpha: 0 }, 800, 'Linear', true, 0);
                _this.tweenOddbox11 = _this.add.tween(_this.grp3).to({ alpha: 0 }, 800, 'Linear', true, 0);//_this.box1_3
                _this.tweenOddbox11.onComplete.add(function () {
                    _this.digree1Val.destroy();
                    _this.digree3Val.destroy();

                    if (_this.count1 < 3) {
                        if (_this.decideQuardrants[0] == 0) {
                            _this.x3 = 315;
                            _this.x4 = 435;
                            _this.y3 = 70;
                            _this.y4 = 210;
                        } else if (_this.decideQuardrants[0] == 90) {
                            _this.x3 = 385;
                            _this.x4 = 510;
                            _this.y3 = 50;
                            _this.y4 = 190;
                        }
                        else if (_this.decideQuardrants[0] == 180) {
                            _this.x3 = 420;
                            _this.x4 = 555;
                            _this.y3 = 140;
                            _this.y4 = 280;
                        }
                        else if (_this.decideQuardrants[0] == 270) {
                            _this.x3 = 330;
                            _this.x4 = 450;
                            _this.y3 = 160;
                            _this.y4 = 310;
                        }
                    } else {
                        console.log("suppl.....*****...........!!");
                        if (_this.decideQuardrants[0] == 0) {
                            _this.x3 = 345;
                            _this.x4 = 470;
                            _this.y3 = 90;
                            _this.y4 = 235;
                        } else if (_this.decideQuardrants[0] == 90) {
                            _this.x3 = 390;
                            _this.x4 = 520;
                            _this.y3 = 90;
                            _this.y4 = 250;
                        }
                        else if (_this.decideQuardrants[0] == 180) {
                            _this.x3 = 365;
                            _this.x4 = 500;
                            _this.y3 = 160;
                            _this.y4 = 300;
                        }
                        else if (_this.decideQuardrants[0] == 270) {
                            _this.x3 = 320;
                            _this.x4 = 440;
                            _this.y3 = 160;
                            _this.y4 = 310;
                        }
                    }


                    _this.grp2.destroy();
                    _this.grp3.destroy();
                    _this.grp1.removeChild(_this.box1_1);
                    _this.box1_1.destroy();

                    circle3.alpha = 1;
                    mask3.alpha = 1;
                    _this.grp1.alpha = 1;

                    _this.firstequationTweenfirstObj = _this.add.tween(_this.circle);
                    _this.firstequationTweenfirstObj.to({ x: _this.x3, y: _this.y3 }, 1000, 'Linear', true, 0);//- 200
                    _this.firstequationTweenfirstObj.start();

                    _this.firstequationTween2firstObj = _this.add.tween(_this.mask);
                    _this.firstequationTween2firstObj.to({ x: _this.x4, y: _this.y4, alpha: 1 }, 1000, 'Linear', true, 0);//- 200
                    _this.firstequationTween2firstObj.start();

                    //for 3rd box obj
                    // _this.firstequationTween1 = _this.add.tween(circle3);
                    // _this.firstequationTween1.from({ x: 700, y: 80 }, 1000, 'Linear', true, 0);//- 200
                    // _this.firstequationTween1.start();


                    // _this.firstequationTween11 = _this.add.tween(mask3);
                    // _this.firstequationTween11.from({ x: 830, y: 220 }, 1000, 'Linear', true, 0);//- 200
                    // _this.firstequationTween11.start();

                    _this.firstequationTween1 = _this.add.tween(circle3);
                    _this.firstequationTween1.to({ x: _this.x3, y: _this.y3 }, 1000, 'Linear', true, 0);//- 200
                    _this.firstequationTween1.start();


                    _this.firstequationTween11 = _this.add.tween(mask3);
                    _this.firstequationTween11.to({ x: _this.x4, y: _this.y4 }, 1000, 'Linear', true, 0);//- 200
                    _this.firstequationTween11.start();
                    _this.ladder_Sound.play();
                    // })
                    _this.firstequationTween11.onComplete.add(function () {
                        _this.displaytheEndingD();
                    })

                })
            }
        });

    },

    positionForComplementaryAnglesEndAnim: function () {
        //* decide x and y for the arcs
        if (_this.decideQuardrants[1] == 0) {
            _this.x1 = 5;
            _this.x2 = 125;
            _this.y1 = 70;
            _this.y2 = 210;
        } else if (_this.decideQuardrants[1] == 90) {
            _this.x1 = 60;
            _this.x2 = 200;
            _this.y1 = 50;
            _this.y2 = 190;
        }
        else if (_this.decideQuardrants[1] == 180) {
            _this.x1 = 100;
            _this.x2 = 230;
            _this.y1 = 140;
            _this.y2 = 280;
        }
        else if (_this.decideQuardrants[1] == 270) {
            _this.x1 = 5;
            _this.x2 = 125;
            _this.y1 = 160;
            _this.y2 = 310;
        }

    },

    positionForComplementaryAnglesEndAnim1: function () {

        console.log("compppppiiii")
        // Third Box
        if (_this.decideQuardrants[1] == 0) {
            _this.x5 = 610;
            _this.x6 = 725;
            _this.y5 = 70;
            _this.y6 = 210;
        } else if (_this.decideQuardrants[1] == 90) {
            _this.x5 = 690;
            _this.x6 = 815;
            _this.y5 = 50;
            _this.y6 = 190;
        }
        else if (_this.decideQuardrants[1] == 180) {
            _this.x5 = 715;
            _this.x6 = 850;
            _this.y5 = 140;
            _this.y6 = 280;
        }
        else if (_this.decideQuardrants[1] == 270) {
            _this.x5 = 630;
            _this.x6 = 750;
            _this.y5 = 160;
            _this.y6 = 310;
        }
    },

    positionForComplementaryAnglesEndAnim2: function () {

        console.log("compppppiiii")
        // Third Box
        if (_this.decideQuardrants[0] == 0) {
            _this.x5 = 610;
            _this.x6 = 725;
            _this.y5 = 70;
            _this.y6 = 210;
        } else if (_this.decideQuardrants[0] == 90) {
            _this.x5 = 690;
            _this.x6 = 815;
            _this.y5 = 50;
            _this.y6 = 190;
        }
        else if (_this.decideQuardrants[0] == 180) {
            _this.x5 = 715;
            _this.x6 = 850;
            _this.y5 = 140;
            _this.y6 = 280;
        }
        else if (_this.decideQuardrants[0] == 270) {
            _this.x5 = 630;
            _this.x6 = 750;
            _this.y5 = 160;
            _this.y6 = 310;
        }
    },

    positionForSupplimentaryEndAnim: function () {
        console.log("positionForSupplimentary");
        //* decide x and y for the arcs
        if (_this.decideQuardrants[1] == 0) {
            if (_this.box1_val < 100) {
                _this.x1 = 5;
                _this.x2 = 125;
                _this.y1 = 70;
                _this.y2 = 210;
            } else {
                _this.x1 = 40;
                _this.x2 = 165;
                _this.y1 = 80;
                _this.y2 = 220;
            }

        } else if (_this.decideQuardrants[1] == 90) {
            if (_this.box1_val < 100) {
                _this.x1 = 70;
                _this.x2 = 200;
                _this.y1 = 60;
                _this.y2 = 210;
            } else {
                _this.x1 = 80;
                _this.x2 = 210;
                _this.y1 = 90;
                _this.y2 = 240;
            }
        }
        else if (_this.decideQuardrants[1] == 180) {
            if (_this.box1_val < 100) {
                _this.x1 = 90;
                _this.x2 = 220;
                _this.y1 = 150;
                _this.y2 = 290;
            } else {
                _this.x1 = 60;
                _this.x2 = 190;
                _this.y1 = 150;
                _this.y2 = 290;
            }
        }
        else if (_this.decideQuardrants[1] == 270) {
            if (_this.box1_val < 100) {
                _this.x1 = 10;
                _this.x2 = 120;
                _this.y1 = 160;
                _this.y2 = 305;
            } else {
                _this.x1 = 10;
                _this.x2 = 110;
                _this.y1 = 130;
                _this.y2 = 280;
            }
        }

    },

    positionForSupplimentaryEndAnim1: function () {
        console.log("positionForSupplimentary");
        // Third Box
        if (_this.decideQuardrants[1] == 0) {
            if (_this.box3_val < 100) {
                _this.x5 = 620;
                _this.x6 = 745;
                _this.y5 = 70;
                _this.y6 = 210;
            } else {
                _this.x5 = 645;
                _this.x6 = 775;
                _this.y5 = 70;
                _this.y6 = 210;
            }
        } else if (_this.decideQuardrants[1] == 90) {
            if (_this.box3_val < 100) {
                _this.x5 = 690;
                _this.x6 = 820;
                _this.y5 = 60;
                _this.y6 = 210;
            } else {
                _this.x5 = 690;
                _this.x6 = 820;
                _this.y5 = 80;
                _this.y6 = 230;
            }
        }
        else if (_this.decideQuardrants[1] == 180) {
            if (_this.box3_val < 100) {
                _this.x5 = 700;
                _this.x6 = 850;
                _this.y5 = 150;
                _this.y6 = 290;
            } else {
                _this.x5 = 665;
                _this.x6 = 790;
                _this.y5 = 150;
                _this.y6 = 290;
            }
        }
        else if (_this.decideQuardrants[1] == 270) {
            if (_this.box3_val < 100) {
                _this.x5 = 625;
                _this.x6 = 745;
                _this.y5 = 150;
                _this.y6 = 295;
            } else {
                _this.x5 = 625;
                _this.x6 = 745;
                _this.y5 = 140;
                _this.y6 = 285;
            }
        }
    },

    positionForSupplimentaryEndAnim2: function () {
        console.log("positionForSupplimentary");
        // Third Box
        if (_this.decideQuardrants[0] == 0) {
            if (_this.box3_val < 100) {
                _this.x5 = 620;
                _this.x6 = 745;
                _this.y5 = 70;
                _this.y6 = 210;
            } else {
                _this.x5 = 645;
                _this.x6 = 770;
                _this.y5 = 70;
                _this.y6 = 210;
            }
        } else if (_this.decideQuardrants[0] == 90) {
            if (_this.box3_val < 100) {
                _this.x5 = 690;
                _this.x6 = 820;
                _this.y5 = 70;
                _this.y6 = 220;
            } else {
                _this.x5 = 690;
                _this.x6 = 820;
                _this.y5 = 80;
                _this.y6 = 240;
            }
        }
        else if (_this.decideQuardrants[0] == 180) {
            if (_this.box3_val < 100) {
                _this.x5 = 695;
                _this.x6 = 840;
                _this.y5 = 150;
                _this.y6 = 290;
            } else {
                _this.x5 = 665;
                _this.x6 = 790;
                _this.y5 = 150;
                _this.y6 = 290;
            }
        }
        else if (_this.decideQuardrants[0] == 270) {
            if (_this.box3_val < 100) {
                _this.x5 = 625;
                _this.x6 = 745;
                _this.y5 = 150;
                _this.y6 = 295;
            } else {
                _this.x5 = 625;
                _this.x6 = 745;
                _this.y5 = 140;
                _this.y6 = 285;
            }
        }
    },

    getTheScale: function () {
        //* Set the scale while displaying ending animation for each object.

        if (_this.itemsToDisplay[2] == 'pie') {
            console.log("pie")
            _this.scalex1 = 0.69;
            _this.scaley1 = 0.79;
        }

        if (_this.itemsToDisplay[2] == 'pizza') {
            console.log("pizza")
            _this.scalex1 = 0.64;
            _this.scaley1 = 0.74;
        }

        if (_this.itemsToDisplay[2] == 'watermelon') {
            console.log("watermelon")
            _this.scalex1 = 0.6;
            _this.scaley1 = 0.7;
        }
        //    if(_this.itemsToDisplay[1] == 'pie')_this.scaley1 =0.77;
        //     if(_this.itemsToDisplay[1] == 'pizza')_this.scaley1 =0.74;
        //     if(_this.itemsToDisplay[1] == 'watermelon')_this.scaley1 =0.7;
        //     if(_this.itemsToDisplay[0] == 'pie')_this.scaley =0.77;
        //    if(_this.itemsToDisplay[0] == 'pizza')_this.scaley =0.74;
        //    if(_this.itemsToDisplay[0] == 'watermelon')_this.scaley =0.7;
    },

    getTheScale1: function () {

        if (_this.itemsToDisplay[0] == 'pie') {
            console.log("pie")
            _this.scalex1 = 0.69;
            _this.scaley1 = 0.79;
        }

        if (_this.itemsToDisplay[0] == 'pizza') {
            console.log("pizza")
            _this.scalex1 = 0.64;
            _this.scaley1 = 0.74;
        }

        if (_this.itemsToDisplay[0] == 'watermelon') {
            console.log("watermelon")
            _this.scalex1 = 0.6;
            _this.scaley1 = 0.7;
        }
    },

    getTheScale2: function () {

        if (_this.itemsToDisplay[2] == 'pie') {
            console.log("pie")
            _this.scalex1 = 0.69;
            _this.scaley1 = 0.79;
        }

        if (_this.itemsToDisplay[2] == 'pizza') {
            console.log("pizza")
            _this.scalex1 = 0.64;
            _this.scaley1 = 0.74;
        }

        if (_this.itemsToDisplay[2] == 'watermelon') {
            console.log("watermelon")
            _this.scalex1 = 0.6;
            _this.scaley1 = 0.7;
        }
    },

    positionForSupplimentaryAnim: function () {
        // second box 
        if (_this.decideQuardrants[1] == 0) {
            _this.x3 = 350;
            _this.x4 = 485;
            _this.y3 = 60;
            _this.y4 = 200;
        } else if (_this.decideQuardrants[1] == 90) {
            _this.x3 = 390;
            _this.x4 = 510;
            _this.y3 = 100;
            _this.y4 = 240;
        }
        else if (_this.decideQuardrants[1] == 180) {
            _this.x3 = 370;
            _this.x4 = 390;
            _this.y3 = 130;
            _this.y4 = 270;
        }
        else if (_this.decideQuardrants[1] == 270) {
            _this.x3 = 320;
            _this.x4 = 450;
            _this.y3 = 140;
            _this.y4 = 280;
        }
    },

    eraseScreen: function () {
        _this.clearScreenArray.forEach(element => {
            element.destroy();
        });
        ///**** */
        //  _this.pairArray = _this.shuffle(_this.pairArray);
        _this.box1_value = 0;
        _this.box2_value = 0;
        _this.box3_value = 0;
    },

    decideThePart: function () {
        //* Decide which question to display

        if (_this.count1 < 4) {
            _this.decideQuardrants = [0, 90, 180, 270];
            _this.decideQuardrants = _this.shuffle(_this.decideQuardrants);
            _this.displayfirstPart();
        } else {
            _this.time.events.add(1500, function () {
                _this.decideQuardrants = [0, 90, 180, 270];
                _this.decideQuardrants = _this.shuffle(_this.decideQuardrants);
                _this.decideQuardrants2 = [0, 90, 180, 270];
                _this.decideQuardrants2 = _this.shuffle(_this.decideQuardrants2);

                _this.displayPartTwo();
                if (_this.count1 == 4) _this.angleValue = 90;
                if (_this.count1 == 5) _this.angleValue = 180;
            })

        }
    },

    displayPartTwo: function () {
        //*Display all the boxex and objects for part two
        if (_this.count1 == 4) {
            _this.Question_flag = 2;
            _this.Ask_Question3.play();
        }

        if (_this.count1 == 5) {
            _this.Question_flag = 3;
            _this.Ask_Question4.play();
        }

        _this.itemsToDisplay = ["watermelon", "pizza", "pie", "watermelon", "pizza", "pie"];
        _this.itemsToDisplay = _this.shuffle(_this.itemsToDisplay);

        _this.decideTheOptionsPart2();

        _this.box2_1 = _this.add.image(25, 70, 'box_2');
        _this.box2_2 = _this.add.image(257, 70, 'box_2');
        _this.box2_3 = _this.add.image(490, 70, 'box_2');
        _this.box2_4 = _this.add.image(724, 70, 'box_2');
        _this.box2_5 = _this.add.image(25, 280, 'box_2');
        _this.box2_6 = _this.add.image(257, 280, 'box_2');
        _this.box2_7 = _this.add.image(490, 280, 'box_2');
        _this.box2_8 = _this.add.image(724, 280, 'box_2');

        _this.tick_mark = _this.add.image(870, 470, 'TickBtn');
        _this.clearScreenArray.push(_this.tick_mark);
        _this.tick_mark.frame = 1;
        _this.tick_mark.inputEnabled = true;
        _this.tick_mark.input.useHandCursor = true;
        _this.tick_mark.events.onInputDown.add(_this.validateTickPart2, _this);

        _this.box1_obj = _this.add.image(_this.x1, _this.y1, _this.itemsToDisplay[_this.idx]);
        _this.box1_obj.scale.setTo(0.40, 0.42);
        _this.clearScreenArray.push(_this.box1_obj);
        // var mask1 = _this.game.add.graphics(180, 240);
        _this.box2_obj = _this.add.image(_this.x3, _this.y3, _this.itemsToDisplay[_this.idx]);
        _this.box2_obj.scale.setTo(0.40, 0.42);
        _this.clearScreenArray.push(_this.box2_obj);
        _this.box3_obj = _this.add.image(_this.x5, _this.y5, _this.itemsToDisplay[_this.idx]);
        _this.box3_obj.scale.setTo(0.40, 0.42);
        _this.clearScreenArray.push(_this.box3_obj);
        _this.box4_obj = _this.add.image(_this.x7, _this.y7, _this.itemsToDisplay[_this.idx]);
        _this.box4_obj.scale.setTo(0.40, 0.42);
        _this.clearScreenArray.push(_this.box4_obj);
        _this.box5_obj = _this.add.image(_this.x11, _this.y11, _this.itemsToDisplay[_this.idx]);
        _this.box5_obj.scale.setTo(0.40, 0.42);
        _this.clearScreenArray.push(_this.box5_obj);
        _this.box6_obj = _this.add.image(_this.x31, _this.y31, _this.itemsToDisplay[_this.idx]);
        _this.box6_obj.scale.setTo(0.40, 0.42);
        _this.clearScreenArray.push(_this.box6);
        _this.box7_obj = _this.add.image(_this.x51, _this.y51, _this.itemsToDisplay[_this.idx]);
        _this.box7_obj.scale.setTo(0.40, 0.42);
        _this.clearScreenArray.push(_this.box7_obj);
        _this.box8_obj = _this.add.image(_this.x71, _this.y71, _this.itemsToDisplay[_this.idx]);
        _this.box8_obj.scale.setTo(0.40, 0.42);
        _this.clearScreenArray.push(_this.box8_obj);

        _this.boxClicks();

        var mask1 = _this.game.add.graphics(_this.x2, _this.y2);
        _this.clearScreenArray.push(mask1);

        mask1.beginFill(0xffffff);
        mask1.moveTo(0, 0);
        mask1.lineTo(50, 0);
        _this.arcStartAngleC = _this.decideQuardrants[0];
        _this.arcEndAngleC = _this.arcStartAngleC + _this.box1_objVal;
        mask1.arc(0, 0, 250, _this.game.math.degToRad(_this.arcStartAngleC), _this.game.math.degToRad(_this.arcEndAngleC), false);//360 - _this.Aarray[_this.count1]
        mask1.lineTo(0, 0);
        mask1.endFill();
        // Apply the mask to the circle sprite
        _this.box1_obj.mask = mask1;

        var mask2 = _this.game.add.graphics(_this.x4, _this.y4);
        _this.clearScreenArray.push(mask2);
        mask2.beginFill(0xffffff);
        mask2.moveTo(0, 0);
        mask2.lineTo(50, 0);
        _this.arcStartAngleC2 = _this.decideQuardrants[1];
        _this.arcEndAngleC2 = _this.arcStartAngleC2 + _this.box2_objVal;
        mask2.arc(0, 0, 250, _this.game.math.degToRad(_this.arcStartAngleC2), _this.game.math.degToRad(_this.arcEndAngleC2), false);//360 - _this.Aarray[_this.count1]
        mask2.lineTo(0, 0);
        mask2.endFill();
        // Apply the mask to the circle sprite
        _this.box2_obj.mask = mask2;

        var mask3 = _this.game.add.graphics(_this.x6, _this.y6);
        _this.clearScreenArray.push(mask3);
        mask3.beginFill(0xffffff);
        mask3.moveTo(0, 0);
        mask3.lineTo(50, 0);
        _this.arcStartAngleC3 = _this.decideQuardrants[2];
        _this.arcEndAngleC3 = _this.arcStartAngleC3 + _this.box3_objVal;
        mask3.arc(0, 0, 250, _this.game.math.degToRad(_this.arcStartAngleC3), _this.game.math.degToRad(_this.arcEndAngleC3), false);//360 - _this.Aarray[_this.count1]
        mask3.lineTo(0, 0);
        mask3.endFill();
        // Apply the mask to the circle sprite
        _this.box3_obj.mask = mask3;

        var mask4 = _this.game.add.graphics(_this.x8, _this.y8);
        _this.clearScreenArray.push(mask4);
        mask4.beginFill(0xffffff);
        mask4.moveTo(0, 0);
        mask4.lineTo(50, 0);
        _this.arcStartAngleC4 = _this.decideQuardrants[3];
        _this.arcEndAngleC4 = _this.arcStartAngleC4 + _this.box4_objVal;
        mask4.arc(0, 0, 250, _this.game.math.degToRad(_this.arcStartAngleC4), _this.game.math.degToRad(_this.arcEndAngleC4), false);//360 - _this.Aarray[_this.count1]
        mask4.lineTo(0, 0);
        mask4.endFill();
        // Apply the mask to the circle sprite
        _this.box4_obj.mask = mask4;

        var mask5 = _this.game.add.graphics(_this.x21, _this.y21);
        _this.clearScreenArray.push(mask5);
        mask5.beginFill(0xffffff);
        mask5.moveTo(0, 0);
        mask5.lineTo(50, 0);
        _this.arcStartAngleC5 = _this.decideQuardrants2[0];
        _this.arcEndAngleC5 = _this.arcStartAngleC5 + _this.box5_objVal;
        mask5.arc(0, 0, 250, _this.game.math.degToRad(_this.arcStartAngleC5), _this.game.math.degToRad(_this.arcEndAngleC5), false);//360 - _this.Aarray[_this.count1]
        mask5.lineTo(0, 0);
        mask5.endFill();
        // Apply the mask to the circle sprite
        _this.box5_obj.mask = mask5;

        var mask6 = _this.game.add.graphics(_this.x41, _this.y41);
        _this.clearScreenArray.push(mask6);
        mask6.beginFill(0xffffff);
        mask6.moveTo(0, 0);
        mask6.lineTo(50, 0);
        _this.arcStartAngleC6 = _this.decideQuardrants2[1];
        _this.arcEndAngleC6 = _this.arcStartAngleC6 + _this.box6_objVal;
        mask6.arc(0, 0, 250, _this.game.math.degToRad(_this.arcStartAngleC6), _this.game.math.degToRad(_this.arcEndAngleC6), false);//360 - _this.Aarray[_this.count1]
        mask6.lineTo(0, 0);
        mask6.endFill();
        // Apply the mask to the circle sprite
        _this.box6_obj.mask = mask6;

        var mask7 = _this.game.add.graphics(_this.x61, _this.y61);
        _this.clearScreenArray.push(mask7);
        mask7.beginFill(0xffffff);
        mask7.moveTo(0, 0);
        mask7.lineTo(50, 0);
        _this.arcStartAngleC7 = _this.decideQuardrants2[2];
        _this.arcEndAngleC7 = _this.arcStartAngleC7 + _this.box7_objVal;
        mask7.arc(0, 0, 250, _this.game.math.degToRad(_this.arcStartAngleC7), _this.game.math.degToRad(_this.arcEndAngleC7), false);//360 - _this.Aarray[_this.count1]
        mask7.lineTo(0, 0);
        mask7.endFill();
        // Apply the mask to the circle sprite
        _this.box7_obj.mask = mask7;

        var mask8 = _this.game.add.graphics(_this.x81, _this.y81);
        _this.clearScreenArray.push(mask8);
        mask8.beginFill(0xffffff);
        mask8.moveTo(0, 0);
        mask8.lineTo(50, 0);
        _this.arcStartAngleC8 = _this.decideQuardrants2[3];
        _this.arcEndAngleC8 = _this.arcStartAngleC8 + _this.box8_objVal;
        mask8.arc(0, 0, 250, _this.game.math.degToRad(_this.arcStartAngleC8), _this.game.math.degToRad(_this.arcEndAngleC8), false);//360 - _this.Aarray[_this.count1]
        mask8.lineTo(0, 0);
        mask8.endFill();
        // Apply the mask to the circle sprite
        _this.box8_obj.mask = mask8;

        _this.displayTheDigrees();
    },

    decideTheOptionsPart2: function () {
        //* Decide what angles to display in the boxes
        _this.n1Array = _this.shuffle(_this.n1Array);
        _this.n2Array = _this.shuffle(_this.n2Array);
        _this.n3Array = _this.shuffle(_this.n3Array);
        _this.n4Array = _this.shuffle(_this.n4Array);
        //***** */
        if (_this.count1 == 4) {// if (_this.count1 == 4)//_this.count1 != 0
            _this.arr1 = _this.n1Array;
            _this.arr2 = _this.n2Array;

        } else {
            _this.arr1 = _this.n3Array;
            _this.arr2 = _this.n4Array;

        }
        console.log(_this.arr1, "  _this.arr1");
        console.log(_this.arr2, "  _this.arr2");

        _this.box1_objVal = _this.arr1[0];
        _this.box2_objVal = _this.arr1[1];
        _this.box3_objVal = _this.arr1[2];
        _this.box4_objVal = _this.arr1[3];

        _this.box5_objVal = _this.arr2[0];
        _this.box6_objVal = _this.arr2[1];
        _this.box7_objVal = _this.arr2[2];
        _this.box8_objVal = _this.arr2[3];

        if (_this.count1 == 4) {//if (_this.count1 == 4)
            _this.decideCompletementryXY();
            _this.decideCompletementryXY1();
        } else {
            _this.decideSupplimentaryXY();
            _this.decideSupplimentaryXY1();
        }

    },

    decideCompletementryXY: function () {
        //* positions for complementary angles 5th question
        // first box 
        if (_this.decideQuardrants[0] == 0) {
            _this.x1 = 30;
            _this.x2 = 100;
            _this.y1 = 50;
            _this.y2 = 140;
        } else if (_this.decideQuardrants[0] == 90) {
            _this.x1 = 75;
            _this.x2 = 158;
            _this.y1 = 50;
            _this.y2 = 120;
        }
        else if (_this.decideQuardrants[0] == 180) {
            _this.x1 = 75;
            _this.x2 = 174;
            _this.y1 = 100;
            _this.y2 = 200;
        }
        else if (_this.decideQuardrants[0] == 270) {
            _this.x1 = 45;
            _this.x2 = 120;
            _this.y1 = 110;
            _this.y2 = 220;
        }
        //second box 
        if (_this.decideQuardrants[1] == 0) {
            _this.x3 = 262;
            _this.x4 = 332;
            _this.y3 = 50;
            _this.y4 = 140;
        } else if (_this.decideQuardrants[1] == 90) {
            _this.x3 = 307;
            _this.x4 = 387;
            _this.y3 = 50;
            _this.y4 = 120;
        }
        else if (_this.decideQuardrants[1] == 180) {
            _this.x3 = 307;
            _this.x4 = 415;
            _this.y3 = 100;
            _this.y4 = 200;
        }
        else if (_this.decideQuardrants[1] == 270) {
            _this.x3 = 277;
            _this.x4 = 347;
            _this.y3 = 110;
            _this.y4 = 220;
        }
        //Third Box 
        if (_this.decideQuardrants[2] == 0) {
            _this.x5 = 495;
            _this.x6 = 565;
            _this.y5 = 50;
            _this.y6 = 135;
        } else if (_this.decideQuardrants[2] == 90) {
            _this.x5 = 540;
            _this.x6 = 620;
            _this.y5 = 50;
            _this.y6 = 120;
        }
        else if (_this.decideQuardrants[2] == 180) {
            _this.x5 = 540;
            _this.x6 = 638;
            _this.y5 = 100;
            _this.y6 = 200;
        }
        else if (_this.decideQuardrants[2] == 270) {
            _this.x5 = 510;
            _this.x6 = 580;
            _this.y5 = 110;
            _this.y6 = 220;
        }
        //4th Box
        if (_this.decideQuardrants[3] == 0) {
            _this.x7 = 729;
            _this.x8 = 799;
            _this.y7 = 50;
            _this.y8 = 140;
        } else if (_this.decideQuardrants[3] == 90) {
            _this.x7 = 774;
            _this.x8 = 848;
            _this.y7 = 50;
            _this.y8 = 120;
        }
        else if (_this.decideQuardrants[3] == 180) {
            _this.x7 = 774;
            _this.x8 = 873;//99
            _this.y7 = 100;
            _this.y8 = 200;
        }
        else if (_this.decideQuardrants[3] == 270) {
            _this.x7 = 744;
            _this.x8 = 820;
            _this.y7 = 110;
            _this.y8 = 220;
        }

    },

    decideCompletementryXY1: function () {
        //* decide position for the 2nd row objects in the 5th question
        console.log("second rw");
        // first box 
        if (_this.decideQuardrants2[0] == 0) {
            _this.x11 = 30;
            _this.x21 = 100;
            _this.y11 = 260;
            _this.y21 = 350;
        } else if (_this.decideQuardrants2[0] == 90) {
            _this.x11 = 75;
            _this.x21 = 158;
            _this.y11 = 260;
            _this.y21 = 335;
        }
        else if (_this.decideQuardrants2[0] == 180) {
            _this.x11 = 75;
            _this.x21 = 174;
            _this.y11 = 310;
            _this.y21 = 410;
        }
        else if (_this.decideQuardrants2[0] == 270) {
            _this.x11 = 45;
            _this.x21 = 120;
            _this.y11 = 320;
            _this.y21 = 410;
        }
        //second box 
        if (_this.decideQuardrants2[1] == 0) {
            _this.x31 = 262;
            _this.x41 = 332;
            _this.y31 = 260;
            _this.y41 = 350;
        } else if (_this.decideQuardrants2[1] == 90) {
            _this.x31 = 307;
            _this.x41 = 381;//74
            _this.y31 = 260;
            _this.y41 = 330;
        }
        else if (_this.decideQuardrants2[1] == 180) {
            _this.x31 = 307;
            _this.x41 = 415;
            _this.y31 = 310;
            _this.y41 = 410;
        }
        else if (_this.decideQuardrants2[1] == 270) {
            _this.x31 = 277;
            _this.x41 = 347;
            _this.y31 = 320;
            _this.y41 = 410;
        }
        //Third Box 
        if (_this.decideQuardrants2[2] == 0) {
            _this.x51 = 495;
            _this.x61 = 565;
            _this.y51 = 260;
            _this.y61 = 350;
        } else if (_this.decideQuardrants2[2] == 90) {
            _this.x51 = 540;
            _this.x61 = 620;
            _this.y51 = 260;
            _this.y61 = 325;
        }
        else if (_this.decideQuardrants2[2] == 180) {
            _this.x51 = 540;
            _this.x61 = 638;
            _this.y51 = 310;
            _this.y61 = 410;
        }
        else if (_this.decideQuardrants2[2] == 270) {
            _this.x51 = 510;
            _this.x61 = 580;
            _this.y51 = 320;
            _this.y61 = 410;
        }
        //4th Box
        if (_this.decideQuardrants2[3] == 0) {
            _this.x71 = 729;
            _this.x81 = 789;
            _this.y71 = 260;
            _this.y81 = 350;
        } else if (_this.decideQuardrants2[3] == 90) {
            _this.x71 = 774;
            _this.x81 = 848;
            _this.y71 = 260;
            _this.y81 = 330;
        }
        else if (_this.decideQuardrants2[3] == 180) {
            _this.x71 = 774;
            _this.x81 = 873;
            _this.y71 = 310;
            _this.y81 = 410;
        }
        else if (_this.decideQuardrants2[3] == 270) {
            _this.x71 = 744;
            _this.x81 = 820;
            _this.y71 = 320;
            _this.y81 = 410;
        }
    },

    decideSupplimentaryXY: function () {
        //* decide positions for part two supplimentary angles
        // first box 
        if (_this.decideQuardrants[0] == 0) {
            if (_this.box1_objVal < 100) {
                console.log("hii");
                _this.x1 = 25;
                _this.x2 = 103;
                _this.y1 = 50;
                _this.y2 = 140;
            }
            else {
                _this.x1 = 30;
                _this.x2 = 110;
                _this.y1 = 50;
                _this.y2 = 130;
            }
        } else if (_this.decideQuardrants[0] == 90) {
            if (_this.box1_objVal < 100) {
                _this.x1 = 55;
                _this.x2 = 137;
                _this.y1 = 50;
                _this.y2 = 123;
            } else {
                _this.x1 = 75;
                _this.x2 = 157;
                _this.y1 = 70;
                _this.y2 = 153;
            }
        }
        else if (_this.decideQuardrants[0] == 180) {
            if (_this.box1_objVal < 100) {
                _this.x1 = 85;
                _this.x2 = 180;
                _this.y1 = 90;
                _this.y2 = 190;
            } else {
                _this.x1 = 65;
                _this.x2 = 150;
                _this.y1 = 110;
                _this.y2 = 210;
            }
        }
        else if (_this.decideQuardrants[0] == 270) {
            if (_this.box1_objVal < 100) {
                _this.x1 = 30;
                _this.x2 = 110;
                _this.y1 = 110;
                _this.y2 = 202;
            } else {
                _this.x1 = 40;
                _this.x2 = 120;
                _this.y1 = 85;
                _this.y2 = 180;
            }
        }
        //second box 
        if (_this.decideQuardrants[1] == 0) {
            if (_this.box2_objVal < 100) {
                _this.x3 = 268;
                _this.x4 = 338;
                _this.y3 = 50;
                _this.y4 = 140;
            } else {
                _this.x3 = 267;
                _this.x4 = 348;
                _this.y3 = 50;
                _this.y4 = 135;
            }
        } else if (_this.decideQuardrants[1] == 90) {
            if (_this.box2_objVal < 100) {
                _this.x3 = 312;
                _this.x4 = 388;
                _this.y3 = 50;
                _this.y4 = 120;
            } else {
                _this.x3 = 312;
                _this.x4 = 384;
                _this.y3 = 70;
                _this.y4 = 163;
            }
        }
        else if (_this.decideQuardrants[1] == 180) {
            if (_this.box2_objVal < 100) {
                _this.x3 = 317;
                _this.x4 = 412;
                _this.y3 = 95;
                _this.y4 = 190;
            } else {
                _this.x3 = 297;
                _this.x4 = 382;
                _this.y3 = 100;
                _this.y4 = 200;
            }
        }
        else if (_this.decideQuardrants[1] == 270) {
            if (_this.box2_objVal < 100) {
                _this.x3 = 285;
                _this.x4 = 360;
                _this.y3 = 110;
                _this.y4 = 202;
            } else {
                _this.x3 = 272;
                _this.x4 = 337;
                _this.y3 = 85;
                _this.y4 = 180;
            }
        }
        //Third Box 
        if (_this.decideQuardrants[2] == 0) {
            if (_this.box3_objVal < 100) {
                _this.x5 = 490;
                _this.x6 = 570;
                _this.y5 = 50;
                _this.y6 = 140;
            } else {
                _this.x5 = 500;
                _this.x6 = 580;
                _this.y5 = 50;
                _this.y6 = 130;
            }
        } else if (_this.decideQuardrants[2] == 90) {
            if (_this.box3_objVal < 100) {
                _this.x5 = 560;
                _this.x6 = 635;
                _this.y5 = 50;
                _this.y6 = 133;
            } else {
                _this.x5 = 545;
                _this.x6 = 627;
                _this.y5 = 70;
                _this.y6 = 153;
            }
        }
        else if (_this.decideQuardrants[2] == 180) {
            if (_this.box3_objVal < 100) {
                _this.x5 = 545;
                _this.x6 = 630;
                _this.y5 = 90;
                _this.y6 = 190;
            } else {
                _this.x5 = 520;
                _this.x6 = 610;
                _this.y5 = 100;
                _this.y6 = 200;
            }
        }
        else if (_this.decideQuardrants[2] == 270) {
            if (_this.box3_objVal < 100) {
                _this.x5 = 520;
                _this.x6 = 600;
                _this.y5 = 110;
                _this.y6 = 202;

            } else {
                _this.x5 = 510;
                _this.x6 = 580;
                _this.y5 = 85;
                _this.y6 = 180;
            }
        }
        //4th Box
        if (_this.decideQuardrants[3] == 0) {
            if (_this.box4_objVal < 100) {
                _this.x7 = 734;
                _this.x8 = 800;
                _this.y7 = 50;
                _this.y8 = 140;
            } else {
                _this.x7 = 729;
                _this.x8 = 809;
                _this.y7 = 50;
                _this.y8 = 130;
            }
        } else if (_this.decideQuardrants[3] == 90) {
            if (_this.box4_objVal < 100) {
                _this.x7 = 790;
                _this.x8 = 870;
                _this.y7 = 50;
                _this.y8 = 120;
            } else {
                _this.x7 = 784;
                _this.x8 = 859;
                _this.y7 = 70;
                _this.y8 = 158;
            }
        }
        else if (_this.decideQuardrants[3] == 180) {
            if (_this.box4_objVal < 100) {
                _this.x7 = 785;
                _this.x8 = 879;
                _this.y7 = 90;
                _this.y8 = 190;
            } else {
                _this.x7 = 765;
                _this.x8 = 844;
                _this.y7 = 100;
                _this.y8 = 200;
            }
        }
        else if (_this.decideQuardrants[3] == 270) {
            if (_this.box4_objVal < 100) {
                _this.x7 = 755;
                _this.x8 = 828;
                _this.y7 = 110;
                _this.y8 = 202;
            } else {
                _this.x7 = 740;
                _this.x8 = 810;
                _this.y7 = 85;
                _this.y8 = 175;
            }
        }
    },

    decideSupplimentaryXY1: function () {
        //* decide positions for part two supplimentary angles
        // first box 
        if (_this.decideQuardrants2[0] == 0) {
            if (_this.box5_objVal < 100) {
                _this.x11 = 25;
                _this.x21 = 103;
                _this.y11 = 250;
                _this.y21 = 360;
            } else {
                _this.x11 = 30;
                _this.x21 = 110;
                _this.y11 = 260;
                _this.y21 = 350;
            }
        } else if (_this.decideQuardrants2[0] == 90) {
            if (_this.box5_objVal < 100) {
                _this.x11 = 55;
                _this.x21 = 137;
                _this.y11 = 260;
                _this.y21 = 341;
            } else {
                _this.x11 = 75;
                _this.x21 = 157;
                _this.y11 = 280;
                _this.y21 = 373;
            }
        }
        else if (_this.decideQuardrants2[0] == 180) {
            if (_this.box5_objVal < 100) {
                _this.x11 = 80;
                _this.x21 = 180;
                _this.y11 = 300;
                _this.y21 = 400;
            } else {
                _this.x11 = 60;
                _this.x21 = 140;
                _this.y11 = 310;
                _this.y21 = 410;
            }
        }
        else if (_this.decideQuardrants2[0] == 270) {
            if (_this.box5_objVal < 100) {
                _this.x11 = 30;
                _this.x21 = 110;
                _this.y11 = 315;
                _this.y21 = 397;
            } else {
                _this.x11 = 40;
                _this.x21 = 120;
                _this.y11 = 290;
                _this.y21 = 382;
            }
        }
        //second box 
        if (_this.decideQuardrants2[1] == 0) {
            if (_this.box6_objVal < 100) {
                _this.x31 = 263;
                _this.x41 = 333;
                _this.y31 = 260;
                _this.y41 = 350;
            } else {
                _this.x31 = 267;
                _this.x41 = 348;
                _this.y31 = 260;
                _this.y41 = 350;
            }
        } else if (_this.decideQuardrants2[1] == 90) {
            if (_this.box6_objVal < 100) {
                _this.x31 = 312;
                _this.x41 = 384;
                _this.y31 = 260;
                _this.y41 = 343;
            } else {
                _this.x31 = 312;
                _this.x41 = 384;
                _this.y31 = 280;
                _this.y41 = 373;
            }
        }
        else if (_this.decideQuardrants2[1] == 180) {
            if (_this.box6_objVal < 100) {
                _this.x31 = 317;
                _this.x41 = 412;
                _this.y31 = 305;
                _this.y41 = 405;
            } else {
                _this.x31 = 297;
                _this.x41 = 382;
                _this.y31 = 310;
                _this.y41 = 400;
            }
        }
        else if (_this.decideQuardrants2[1] == 270) {
            if (_this.box6_objVal < 100) {
                _this.x31 = 285;
                _this.x41 = 360;
                _this.y31 = 315;
                _this.y41 = 412;
            } else {
                _this.x31 = 272;
                _this.x41 = 337;
                _this.y31 = 290;
                _this.y41 = 390;
            }
        }
        //Third Box 
        if (_this.decideQuardrants2[2] == 0) {
            if (_this.box7_objVal < 100) {
                _this.x51 = 490;
                _this.x61 = 560;
                _this.y51 = 270;
                _this.y61 = 360;
            } else {
                _this.x51 = 500;
                _this.x61 = 580;
                _this.y51 = 260;
                _this.y61 = 350;
            }
        } else if (_this.decideQuardrants2[2] == 90) {
            if (_this.box7_objVal < 100) {
                _this.x51 = 560;
                _this.x61 = 635;
                _this.y51 = 260;
                _this.y61 = 348;
            } else {
                _this.x51 = 545;
                _this.x61 = 627;
                _this.y51 = 280;
                _this.y61 = 366;
            }
        }
        else if (_this.decideQuardrants2[2] == 180) {
            if (_this.box7_objVal < 100) {
                _this.x51 = 545;
                _this.x61 = 630;
                _this.y51 = 300;
                _this.y61 = 400;
            } else {
                _this.x51 = 520;
                _this.x61 = 610;
                _this.y51 = 310;
                _this.y61 = 410;
            }
        }
        else if (_this.decideQuardrants2[2] == 270) {
            if (_this.box7_objVal < 100) {
                _this.x51 = 520;
                _this.x61 = 600;
                _this.y51 = 310;
                _this.y61 = 402;
            } else {
                _this.x51 = 510;
                _this.x61 = 570;
                _this.y51 = 290;
                _this.y61 = 382;
            }
        }
        //4th Box
        if (_this.decideQuardrants2[3] == 0) {
            if (_this.box8_objVal < 100) {
                _this.x71 = 730;
                _this.x81 = 800;
                _this.y71 = 260;
                _this.y81 = 350;
            } else {
                _this.x71 = 729;
                _this.x81 = 809;
                _this.y71 = 260;
                _this.y81 = 350;
            }

        } else if (_this.decideQuardrants2[3] == 90) {
            if (_this.box8_objVal < 100) {
                _this.x71 = 790;
                _this.x81 = 870;
                _this.y71 = 260;
                _this.y81 = 343;
            } else {
                _this.x71 = 784;
                _this.x81 = 859;
                _this.y71 = 280;
                _this.y81 = 365;
            }
        }
        else if (_this.decideQuardrants2[3] == 180) {
            if (_this.box8_objVal < 100) {
                _this.x71 = 785;
                _this.x81 = 879;
                _this.y71 = 310;
                _this.y81 = 410;
            } else {
                _this.x71 = 765;
                _this.x81 = 844;
                _this.y71 = 310;
                _this.y81 = 410;
            }
        }
        else if (_this.decideQuardrants2[3] == 270) {
            if (_this.box8_objVal < 100) {
                _this.x71 = 755;
                _this.x81 = 828;
                _this.y71 = 310;
                _this.y81 = 402;
            } else {
                _this.x71 = 740;
                _this.x81 = 810;
                _this.y71 = 290;
                _this.y81 = 382;
            }
        }
    },

    displayTheDigrees: function () {
        //*Display the angles in blue text part two
        _this.Dg1 = _this.add.text(190, 80, _this.box1_objVal + "\u{00B0}");
        _this.applyingStyle1(_this.Dg1);
        _this.Dg2 = _this.add.text(422, 80, _this.box2_objVal + "\u{00B0}");
        _this.applyingStyle1(_this.Dg2);
        _this.Dg3 = _this.add.text(655, 80, _this.box3_objVal + "\u{00B0}");
        _this.applyingStyle1(_this.Dg3);
        _this.Dg4 = _this.add.text(889, 80, _this.box4_objVal + "\u{00B0}");
        _this.applyingStyle1(_this.Dg4);
        _this.Dg5 = _this.add.text(190, 290, _this.box5_objVal + "\u{00B0}");
        _this.applyingStyle1(_this.Dg5);
        _this.Dg6 = _this.add.text(422, 290, _this.box6_objVal + "\u{00B0}");
        _this.applyingStyle1(_this.Dg6);
        _this.Dg7 = _this.add.text(655, 290, _this.box7_objVal + "\u{00B0}");
        _this.applyingStyle1(_this.Dg7);
        _this.Dg8 = _this.add.text(889, 290, _this.box8_objVal + "\u{00B0}");
        _this.applyingStyle1(_this.Dg8);

    },

    findTheObject2: function () {
        //* Used to identify the object the box //part two
        if (_this.optionCheckArray[1] == _this.box2_1) {
            _this.finalObj2 = _this.box1_obj;
            _this.finalMask2 = _this.box1_obj.mask;
            _this.finalDg2 = _this.Dg1;
        }
        else if (_this.optionCheckArray[1] == _this.box2_2) {
            _this.finalObj2 = _this.box2_obj;
            _this.finalMask2 = _this.box2_obj.mask;
            _this.finalDg2 = _this.Dg2;
        } else if (_this.optionCheckArray[1] == _this.box2_3) {
            _this.finalObj2 = _this.box3_obj;
            _this.finalMask2 = _this.box3_obj.mask;
            _this.finalDg2 = _this.Dg3;
        }
        else if (_this.optionCheckArray[1] == _this.box2_4) {
            _this.finalObj2 = _this.box4_obj;
            _this.finalMask2 = _this.box4_obj.mask;
            _this.finalDg2 = _this.Dg4;
        } else if (_this.optionCheckArray[1] == _this.box2_5) {
            _this.finalObj2 = _this.box5_obj;
            _this.finalMask2 = _this.box5_obj.mask;
            _this.finalDg2 = _this.Dg5;
        }
        else if (_this.optionCheckArray[1] == _this.box2_6) {
            _this.finalObj2 = _this.box6_obj;
            _this.finalMask2 = _this.box6_obj.mask;
            _this.finalDg2 = _this.Dg6;
        }
        else if (_this.optionCheckArray[1] == _this.box2_7) {
            _this.finalObj2 = _this.box7_obj;
            _this.finalMask2 = _this.box7_obj.mask;
            _this.finalDg2 = _this.Dg7;
        } else if (_this.optionCheckArray[1] == _this.box2_8) {
            _this.finalObj2 = _this.box8_obj;
            _this.finalMask2 = _this.box8_obj.mask;
            _this.finalDg2 = _this.Dg8;
        }
    },

    findTheObject: function () {
        //* Used to identify the object the box //part two
        if (_this.optionCheckArray[0] == _this.box2_1) {
            _this.finalObj = _this.box1_obj;
            _this.finalMask = _this.box1_obj.mask;
            _this.finalDg = _this.Dg1;
        }
        else if (_this.optionCheckArray[0] == _this.box2_2) {
            _this.finalObj = _this.box2_obj;
            _this.finalMask = _this.box2_obj.mask;
            _this.finalDg = _this.Dg2;
        } else if (_this.optionCheckArray[0] == _this.box2_3) {
            _this.finalObj = _this.box3_obj;
            _this.finalMask = _this.box3_obj.mask;
            _this.finalDg = _this.Dg3;
        }
        else if (_this.optionCheckArray[0] == _this.box2_4) {
            _this.finalObj = _this.box4_obj;
            _this.finalMask = _this.box4_obj.mask;
            _this.finalDg = _this.Dg4;
        } else if (_this.optionCheckArray[0] == _this.box2_5) {
            _this.finalObj = _this.box5_obj;
            _this.finalMask = _this.box5_obj.mask;
            _this.finalDg = _this.Dg5;
        }
        else if (_this.optionCheckArray[0] == _this.box2_6) {
            _this.finalObj = _this.box6_obj;
            _this.finalMask = _this.box6_obj.mask;
            _this.finalDg = _this.Dg6;
        }
        else if (_this.optionCheckArray[0] == _this.box2_7) {
            _this.finalObj = _this.box7_obj;
            _this.finalMask = _this.box7_obj.mask;
            _this.finalDg = _this.Dg7;
        } else if (_this.optionCheckArray[0] == _this.box2_8) {
            _this.finalObj = _this.box8_obj;
            _this.finalMask = _this.box8_obj.mask;
            _this.finalDg = _this.Dg8;
        }

    },

    validateTickPart2: function () {
        //* validation for part two
        if (_this.optionCheckArray.length > 1 || _this.optionCheckArray.length == 1 && _this.optionCheckArray[0]) _this.finalNum1 = _this.optionCheckArray[0].name;
        // console.log(_this.optionCheckArray[0].name,"_this.optionCheckArray[0].name");

        if (_this.optionCheckArray.length > 1 || _this.optionCheckArray.length == 1 && _this.optionCheckArray[1]) _this.finalNum2 = _this.optionCheckArray[1].name;
        // console.log(_this.optionCheckArray[1].name,"_this.optionCheckArray[0].name");

        _this.findTheObject();
        _this.findTheObject2();

        console.log(_this.finalNum1, _this.finalNum2, "_this.finalNum1 and num 2 !!!");

        let finalResult = _this.finalNum1 + _this.finalNum2;
        console.log(finalResult, "finalResult !!!");

        if (finalResult == _this.angleValue)//_this.angleValue
        {
            _this.noofAttempts++;
            _this.ladder_Sound.play();
            // _this.optionCheckArray.destroy();
            _this.optionCheckArray.forEach(element => {
                element.destroy();
            });
            //_this.optionCheckArray.splice(0, _this.optionCheckArray.length);
            _this.finalNum1 = 0;
            _this.finalNum2 = 0;

            // let a = _this.optionCheckArray[0];
            // let b = _this.optionCheckArray[1];
            // let indexa = _this.optionCheckArray.indexOf(a);
            // _this.optionCheckArray.splice(indexa, 1);
            // let indexb = _this.optionCheckArray.indexOf(b);
            // _this.optionCheckArray.splice(indexb, 1);

            // console.log(_this.optionCheckArray.length, "_this.optionCheckArray.length!!!");
            _this.optionCheckArray = [];
            _this.finalObj.destroy();
            _this.finalObj2.destroy();
            _this.finalDg.destroy();
            _this.finalDg2.destroy();
            _this.finalMask.destroy();
            _this.finalMask2.destroy();
            _this.pairCount++;
            console.log(_this.pairCount, "_this.paircount %%%%%");
            if (_this.pairCount == 4 || _this.pairCount == 8) {
                console.log("next QQQQQQQQQQQQ")
                _this.tick_mark.destroy();
                _this.celebrationSound.play();
                _this.starActions(_this.count1);
                _this.nextquestion();
            }
        } else {
            _this.noofAttempts++;
            _this.wrongSound.play();
            if (_this.optionCheckArray.length > 1 || _this.optionCheckArray.length == 1 && _this.optionCheckArray[0]) _this.optionCheckArray[0].frame = 0;
            if (_this.optionCheckArray.length > 1 || _this.optionCheckArray.length == 1 && _this.optionCheckArray[1]) _this.optionCheckArray[1].frame = 0;
            let a = _this.optionCheckArray[0];
            let b = _this.optionCheckArray[1]
            let indexa = _this.optionCheckArray.indexOf(a);
            _this.optionCheckArray.splice(indexa, 1);
            let indexb = _this.optionCheckArray.indexOf(b);
            _this.optionCheckArray.splice(indexb, 1);
        }
    },

    boxClicks: function () {
        //* Enable all the boxes to click //part two
        _this.box2_1.inputEnabled = true;
        _this.box2_2.inputEnabled = true;
        _this.box2_3.inputEnabled = true;
        _this.box2_4.inputEnabled = true;
        _this.box2_5.inputEnabled = true;
        _this.box2_6.inputEnabled = true;
        _this.box2_7.inputEnabled = true;
        _this.box2_8.inputEnabled = true;

        _this.box2_1.input.useHandCursor = true;
        _this.box2_2.input.useHandCursor = true;
        _this.box2_3.input.useHandCursor = true;
        _this.box2_4.input.useHandCursor = true;
        _this.box2_5.input.useHandCursor = true;
        _this.box2_6.input.useHandCursor = true;
        _this.box2_7.input.useHandCursor = true;
        _this.box2_8.input.useHandCursor = true;

        _this.box2_1.events.onInputDown.add(_this.box1Clicked1, _this);
        _this.box2_2.events.onInputDown.add(_this.box2Clicked2, _this);
        _this.box2_3.events.onInputDown.add(_this.box3Clicked3, _this);
        _this.box2_4.events.onInputDown.add(_this.box4Clicked4, _this);
        _this.box2_5.events.onInputDown.add(_this.box5Clicked5, _this);
        _this.box2_6.events.onInputDown.add(_this.box6Clicked6, _this);
        _this.box2_7.events.onInputDown.add(_this.box7Clicked7, _this);
        _this.box2_8.events.onInputDown.add(_this.box8Clicked8, _this);

        console.log(_this.bxClickCount, "_this.bxClickCount ^^^^^^^");
    },

    box1Clicked1: function () {
        //* box click for part 2
        _this.Drag_Snap.play();
        if (_this.box2_1.frame == 0) {
            _this.box2_1.frame = 1;
            _this.box1_objVal = _this.arr1[0];
            _this.bxClickCount++;
            _this.box2_1.name = _this.arr1[0];
            _this.optionCheckArray.push(_this.box2_1);

            console.log(_this.box1_objVal, " _this.box1_value", _this.optionCheckArray.length, "array");

            _this.checkforOption();
        } else {
            _this.box2_1.frame = 0;
            _this.box1_objVal = 0;
            _this.bxClickCount--;
            //_this.optionCheckArray.pop();
            let itemToRemove = _this.box2_1;
            let index = _this.optionCheckArray.indexOf(itemToRemove);
            _this.optionCheckArray.splice(index, 1);
            console.log(_this.box1_objVal, " _this.box1_value");
            console.log(_this.optionCheckArray.length, " _this.optionCheckArray.length");
        }


    },

    box2Clicked2: function () {
        //* box click for part 2
        _this.Drag_Snap.play();
        if (_this.box2_2.frame == 0) {
            _this.box2_2.frame = 1;
            _this.box2_objVal = _this.arr1[1];
            _this.bxClickCount += 1;
            _this.box2_2.name = _this.arr1[1];
            _this.optionCheckArray.push(_this.box2_2);
            console.log(_this.box2_objVal, " _this.box1_value");
            console.log(_this.optionCheckArray.length, " _this.optionCheckArray.length");

            _this.checkforOption();
        } else {
            _this.box2_2.frame = 0;
            _this.box2_objVal = 0;
            _this.bxClickCount -= 1;
            //_this.optionCheckArray.pop();
            let itemToRemove = _this.box2_2;
            let index = _this.optionCheckArray.indexOf(itemToRemove);
            _this.optionCheckArray.splice(index, 1);
            console.log(_this.optionCheckArray.length, " _this.optionCheckArray.length");
            console.log(_this.box2_objVal, " _this.box1_value");
        }

    },

    box3Clicked3: function () {
        //* box click for part 2
        _this.Drag_Snap.play();
        if (_this.box2_3.frame == 0) {
            _this.box2_3.frame = 1;
            _this.box3_objVal = _this.arr1[2];
            _this.bxClickCount += 1;
            _this.box2_3.name = _this.arr1[2];
            _this.optionCheckArray.push(_this.box2_3);
            console.log(_this.box3_objVal, " _this.box1_value");
            console.log(_this.optionCheckArray.length, " _this.optionCheckArray.length");

            _this.checkforOption();
        } else {
            _this.box2_3.frame = 0;
            _this.box3_objVal = 0;
            _this.bxClickCount -= 1;
            // _this.optionCheckArray.pop();
            let itemToRemove = _this.box2_3;
            let index = _this.optionCheckArray.indexOf(itemToRemove);
            _this.optionCheckArray.splice(index, 1);
            console.log(_this.optionCheckArray.length, " _this.optionCheckArray.length");
            console.log(_this.box3_objVal, " _this.box1_value");
        }
    },

    box4Clicked4: function () {
        //* box click for part 2
        _this.Drag_Snap.play();
        if (_this.box2_4.frame == 0) {
            _this.box2_4.frame = 1;
            _this.box4_objVal = _this.arr1[3];
            _this.bxClickCount += 1;
            _this.box2_4.name = _this.arr1[3];
            _this.optionCheckArray.push(_this.box2_4);
            console.log(_this.optionCheckArray.length, " _this.optionCheckArray.length");
            console.log(_this.box4_objVal, " _this.box1_value");

            _this.checkforOption();
        } else {
            _this.box2_4.frame = 0;
            _this.box4_objVal = 0;
            _this.bxClickCount -= 1;
            //  _this.optionCheckArray.pop();
            let itemToRemove = _this.box2_4;
            let index = _this.optionCheckArray.indexOf(itemToRemove);
            _this.optionCheckArray.splice(index, 1);
            console.log(_this.optionCheckArray.length, " _this.optionCheckArray.length");
            console.log(_this.box4_objVal, " _this.box1_value");
        }
    },

    box5Clicked5: function () {
        _this.Drag_Snap.play();
        if (_this.box2_5.frame == 0) {
            _this.box2_5.frame = 1;
            _this.box5_objVal = _this.arr2[0];
            _this.bxClickCount += 1;
            _this.box2_5.name = _this.arr2[0];
            _this.optionCheckArray.push(_this.box2_5);
            console.log(_this.optionCheckArray.length, " _this.optionCheckArray.length");
            console.log(_this.box5_objVal, " _this.box1_value");

            _this.checkforOption();
        } else {
            _this.box2_5.frame = 0;
            _this.box5_objVal = 0;
            _this.bxClickCount -= 1;
            // _this.optionCheckArray.pop();
            let itemToRemove = _this.box2_5;
            let index = _this.optionCheckArray.indexOf(itemToRemove);
            _this.optionCheckArray.splice(index, 1);
            console.log(_this.optionCheckArray.length, " _this.optionCheckArray.length");
            console.log(_this.box5_objVal, " _this.box1_value");
        }
    },

    box6Clicked6: function () {
        _this.Drag_Snap.play();
        if (_this.box2_6.frame == 0) {
            _this.box2_6.frame = 1;
            _this.box6_objVal = _this.arr2[1];
            _this.bxClickCount += 1;
            _this.box2_6.name = _this.arr2[1];
            _this.optionCheckArray.push(_this.box2_6);
            console.log(_this.optionCheckArray.length, " _this.optionCheckArray.length");
            console.log(_this.box6_objVal, " _this.box1_value");

            _this.checkforOption();
        } else {
            _this.box2_6.frame = 0;
            _this.box6_objVal = 0;
            _this.bxClickCount -= 1;
            // _this.optionCheckArray.pop();
            let itemToRemove = _this.box2_6;
            let index = _this.optionCheckArray.indexOf(itemToRemove);
            _this.optionCheckArray.splice(index, 1);
            console.log(_this.optionCheckArray.length, " _this.optionCheckArray.length");
            console.log(_this.box6_objVal, " _this.box1_value");
        }
    },

    box7Clicked7: function () {
        _this.Drag_Snap.play();
        if (_this.box2_7.frame == 0) {
            _this.box2_7.frame = 1;
            _this.box7_objVal = _this.arr2[2];
            _this.bxClickCount += 1;
            _this.box2_7.name = _this.arr2[2];
            _this.optionCheckArray.push(_this.box2_7);
            console.log(_this.optionCheckArray.length, " _this.optionCheckArray.length");
            console.log(_this.box7_objVal, " _this.box1_value");

            _this.checkforOption();
        } else {
            _this.box2_7.frame = 0;
            _this.box7_objVal = 0;
            _this.bxClickCount -= 1;
            //  _this.optionCheckArray.pop();
            let itemToRemove = _this.box2_7;
            let index = _this.optionCheckArray.indexOf(itemToRemove);
            _this.optionCheckArray.splice(index, 1);
            console.log(_this.optionCheckArray.length, " _this.optionCheckArray.length");
            console.log(_this.box7_objVal, " _this.box1_value");
        }
    },

    box8Clicked8: function () {
        _this.Drag_Snap.play();
        if (_this.box2_8.frame == 0) {
            _this.box2_8.frame = 1;
            _this.box8_objVal = _this.arr2[3];
            _this.bxClickCount += 1;
            _this.box2_8.name = _this.arr2[3];
            _this.optionCheckArray.push(_this.box2_8);
            console.log(_this.optionCheckArray.length, " _this.optionCheckArray.length");
            console.log(_this.box8_objVal, " _this.box1_value");

            _this.checkforOption();
        } else {
            
            _this.box2_8.frame = 0;
            _this.box8_objVal = 0;
            _this.bxClickCount -= 1;
            // _this.optionCheckArray.pop();
            let itemToRemove = _this.box2_8;
            let index = _this.optionCheckArray.indexOf(itemToRemove);
            _this.optionCheckArray.splice(index, 1);
            console.log(_this.optionCheckArray.length, " _this.optionCheckArray.length");
            console.log(_this.box8_objVal, " _this.box1_value");
        }
    },

    checkforOption: function () {

        console.log("checkforOption");
        if (_this.optionCheckArray.length > 2) {
            _this.noofAttempts++;
            _this.optionCheckArrayVal = _this.optionCheckArray[0];
            _this.optionCheckArrayVal.frame = 0;
            let removedItem = _this.optionCheckArray.splice(_this.optionCheckArrayVal, 1);
            console.log(removedItem, "removedItem");

        } else {
            _this.noofAttempts++;
            console.log("is 2");
        }

    },

    applyingStyle: function (target) //* Blue colors to text
    {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.visible = true;
    },

    applyingStyle1: function (target) //* Blue colors to text
    {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontSize = 20;
        target.fontWeight = 'normal';
        target.visible = true;

    },

    applyingStyleRed: function (target) {
        //     // console.log("applyingStyle")
        //     target.align = 'right';
        //     target.fontSize = 23;
        //     target.font = "Akzidenz-Grotesk BQ";
        //   //  target.fill = '#FF0000';
        //     target.fontWeight = 'normal';
        //     target.visible = true;

        target.align = 'center';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#FF0000';
        target.fontWeight = 'normal';
        target.visible = true;
    },

    stopVoice: function () {
        if (_this.playQuestionSound) {
            if (_this.playQuestionSound.contains(_this.src)) {
                _this.playQuestionSound.removeChild(_this.src);
                _this.src = null;
            }
            if (!_this.playQuestionSound.paused) {
                _this.playQuestionSound.pause();
                _this.playQuestionSound.currentTime = 0.0;
            }
            _this.playQuestionSound = null;
            _this.src = null;
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

    nextquestion: function () {
        if (_this.count1 < 6) {
            _this.qn_flag = 1;
            _this.time.events.add(500, function () {
                _this.getQuestion();
            });
        }
        else {
            _this.timer1.stop();
            _this.timer1 = null;
            _this.time.events.add(1000, function () {
                _this.state.start('score', true, false,gameID,_this.microConcepts);
            });
        }
    },

    clearScreen: function () {
        console.log("clear the screen");
        //_this.stage = 0; 
        _this.selectedAns1 = '';
        _this.selectedAns2 = '';
        if (_this.count1 < 6) {
            _this.decideQn();
        }
        else {
            _this.nextquestion();
        }
    },

    celebration: function () {
        _this.celebrationSound.play();
        _this.starActions(_this.count1);
    },

    checkOverlap: function (spriteA, spriteB) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },

    calculate: function (choice, number) {
        if (choice === 0) {
            return number * 3;
        }
        else if (choice === 1) {
            return number * 2;
        }
        else if (choice === 2) {
            return number * 3;
        }
        else if (choice === 3) {
            return number * 2;
        }
        else if (choice === 4) {
            return number * 4;
        }
        else if (choice === 5) {
            return number * 5;
        }
        else if (choice === 6) {
            return number * 3;
        }
        else if (choice === 7) {
            return number * 2 + 1;
        }
        else if (choice === 8) {
            return number * 3 + 1;
        }
        else if (choice === 9) {
            return number * 5 + 1;
        }
        else if (choice === 10) {
            return number * 7 + 1;
        }
        else if (choice === 11) {
            return number * 4 + 1;
        }
        else if (choice === 12) {
            return number * 3 + 1;
        }
        else if (choice === 13) {
            return number * 2 + 1;
        }
    },

    starActions: function (target) {
        telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);

        _this.microConcepts = "GeometryG7";
        console.log("get a star")
        starAnim = _this.starsGroup.getChildAt(_this.count1);
        starAnim.smoothed = false;
        anim = starAnim.animations.add('star');
        //_this.anim.play();
        _this.count1++;
        anim.play();
    },

    shutdown: function () {
        _this.stopVoice();
    },

    ViewHintInstruction: function () {
        //* pause the game before going to the demovideo 
        _this.game.paused = true;
        _this.HintInstructions();
        //* at the end of demo video/skip pressed, it will unpause the game.
    },

    HintInstructions: function () {
        _this.video_playing = 0;
        _this.addGraphics = _this.add.group();

        _this.showHintInstructions();  //* call the function to show the hint instr

        if (_this.box1_1.exists) _this.box1_1.inputEnabled = false;
        if (_this.box1_2.exists) _this.box1_2.inputEnabled = false;
        if (_this.box1_3.exists) _this.box1_3.inputEnabled = false;
        if (_this.tick_mark.exists) _this.tick_mark.inputEnabled = false;

        _this.skip = _this.add.image(820, 110, 'close');       //* skip button shown at the bottom
        // _this.skip.scale.setTo(0.9, 0.9);
        _this.skip.inputEnabled = true;
        _this.skip.input.useHandCursor = true;
        _this.skip.events.onInputDown.add(function () {
            _this.stopAudio();
            console.log('skip arrow')
            _this.pauseVoice();

            if (_this.hintBtn) {
                _this.hintBtn.inputEnabled = true;
                _this.hintBtn.input.useHandCursor = true;
            }
            _this.game.paused = false;  //* restart the game
            console.log(_this.game.paused, '_this.game.paused')

            if (_this.box1_1.exists) { _this.box1_1.inputEnabled = true; _this.box1_1.input.useHandCursor = true; }
            if (_this.box1_2.exists) { _this.box1_2.inputEnabled = true; _this.box1_2.input.useHandCursor = true; }
            if (_this.box1_3.exists) { _this.box1_3.inputEnabled = true; _this.box1_3.input.useHandCursor = true; }
            if (_this.tick_mark.exists) { _this.tick_mark.inputEnabled = true; _this.tick_mark.input.useHandCursor = true; }
        });
    },

    showHintInstructions: function () {
        _this.pauseVoice();

        _this.playCount = 0;

        _this.background_demo = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'bg');

        _this.screenVal = 0;
        // var graphics = _this.add.graphics(0, 0);

        // // Set border color and thickness
        // var borderColor = 0x000000; // Black color
        // var borderThickness = 2;

        // // Set fill color
        // var fillColor = 0xFFE4B5; // Sky blue color //0xFFDAB9//peach  //0xFFFDD0//cream//  //0xFFE4B5//color gave in instr

        // // Draw the rectangle with border and fill
        // graphics.lineStyle(borderThickness, borderColor);
        // graphics.beginFill(fillColor);
        // graphics.drawRect(120, 50, 650, 450); // (x, y, width, height)
        // graphics.endFill();

        // _this.background_demo.addChild(graphics);

        _this.bgBox = _this.add.image(70, 80, 'bgbox2');

        _this.background_demo.addChild(_this.bgBox);

        _this.nextScreen = _this.add.image(780, 390, 'skipArrow');       //* skip button shown at the bottom
        _this.nextScreen.inputEnabled = true;
        _this.nextScreen.input.useHandCursor = true;

        _this.nextScreen.events.onInputDown.add(function () {
            _this.pauseVoice();
            _this.navigateToNextScreen();
        });

        _this.previousScreen = _this.add.image(180, 440, 'skipArrow');       //* back to first screen
        _this.previousScreen.angle = 180;
        _this.previousScreen.alpha = 0;
        _this.previousScreen.inputEnabled = true;
        _this.previousScreen.input.useHandCursor = true;

        _this.previousScreen.events.onInputDown.add(function () {
            _this.pauseVoice();
            _this.navigateToPrevScreen();
        });

        _this.drawAngle40();
        _this.drawAngle50();

        // _this.drawAngle180();
        // _this.drawAngle75();


       
        // _this.Question_flag = 5;
    },

    stopAudio: function () {
        if (_this.background_demo) _this.background_demo.destroy();
        _this.Question_flag = 2;
        _this.speakerbtn.inputEnabled = true;

        if (_this.group1) _this.group1.destroy();
        if (_this.group2) _this.group2.destroy();
        if (_this.group3) _this.group3.destroy();
        if (_this.group4) _this.group4.destroy();
        if (_this.group5) _this.group5.destroy();
        if (_this.group6) _this.group6.destroy();

        _this.nextScreen.destroy();
        _this.previousScreen.destroy();

        _this.skip.events.onInputDown.removeAll();
        _this.skip.destroy();                //* skip button destroyed

        _this.hintBtn.inputEnabled = true;
        _this.hintBtn.input.useHandCursor = true;

        // _this.hintBtn.events.onInputDown.add(function () {
        //     console.log("inside hintbutton function");
        //     //* show the demo video
        //     _this.hintBtn.inputEnabled = false;
        //     _this.hintBtn.input.useHandCursor = false;
        //     _this.time.events.add(1, function () {
        //         // _this.ViewDemoVideo();

        //         _this.ViewHintInstruction();
        //     });

        // });

    },

    drawAngle40: function () {
        _this.Ask_Question5.play();
        console.log('draw angle 40')
        _this.previousScreen.alpha = 0;
        _this.nextScreen.alpha = 1;
        _this.group1 = _this.add.group();

        _this.screenVal = 1;

        var graphics = _this.add.graphics(0, 0);

        // Calculate coordinates for the angle
        var centerX = 250;
        var centerY = 300;

        var angleDegrees = 40;
        var arrowLength = 185;

        // var graphics = game.add.graphics(0, 0);

        // Draw the arrow's tail (line)
        var tailEndX = centerX + arrowLength * Math.cos(Phaser.Math.degToRad(angleDegrees));
        var tailEndY = centerY - arrowLength * Math.sin(Phaser.Math.degToRad(angleDegrees));
        graphics.lineStyle(2, 0x4472c4); // Black color
        graphics.moveTo(centerX, centerY);
        graphics.lineTo(tailEndX, tailEndY);

        var angle = Phaser.Math.degToRad(40); // Convert angle to radians
        graphics.arc(250, 300, 40, Phaser.Math.PI2, Phaser.Math.PI2 - angle, true);

        var x = 250; // Replace with your desired x position
        var y = 300; // Replace with your desired y position
        var length = 160; // Replace with the desired length in pixels

        graphics.moveTo(x, y);
        graphics.lineTo(x + length, y);

        // Draw a line for down arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(399, 305); // Starting point 644, 182
        graphics.lineTo(410, 300); // Ending point 655, 180
        graphics.lineTo(399, 295); // Ending point 651, 192

        // Draw a line for up arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(380, 184); // Starting point 644, 182
        graphics.lineTo(392, 181); // Ending point 655, 180
        graphics.lineTo(386, 195); // Ending point 651, 192

        var text = _this.add.text(320, y - 40, "40" + '\u00B0', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#0x000000"  // Red color "#FF0000"
        });

        _this.background_demo.addChild(graphics);
        _this.background_demo.addChild(text);

        _this.group1.addChild(graphics);
        _this.group1.addChild(text);

    },

    drawAngle50: function () {
        console.log('draw angle 50')
        _this.screenVal = 1;
        _this.previousScreen.alpha = 0;
        _this.nextScreen.alpha = 1;
        var graphics = _this.add.graphics(0, 0);

        // Calculate coordinates for the angle
        var centerX = 520;
        var centerY = 300;

        var angleDegrees = 50;
        var arrowLength = 185;

        // Draw the arrow's tail (line)
        var tailEndX = centerX + arrowLength * Math.cos(Phaser.Math.degToRad(angleDegrees));
        var tailEndY = centerY - arrowLength * Math.sin(Phaser.Math.degToRad(angleDegrees));
        graphics.lineStyle(2, 0x4472c4); // Black color
        graphics.moveTo(centerX, centerY);
        graphics.lineTo(tailEndX, tailEndY);

        // Draw the arc representing a 40-degree angle
        var angle = Phaser.Math.degToRad(50); // Convert angle to radians
        graphics.arc(520, 300, 40, Phaser.Math.PI2, Phaser.Math.PI2 - angle, true);

        var x = 520; // Replace with your desired x position
        var y = 300; // Replace with your desired y position
        var length = 160; // Replace with the desired length in pixels

        graphics.moveTo(x, y);
        graphics.lineTo(x + length, y);


        // Draw a line for down arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(669, 305); // Starting point 644, 182
        graphics.lineTo(680, 300); // Ending point 655, 180
        graphics.lineTo(669, 295); // Ending point 651, 192

        // Draw a line for up arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(626, 165); // Starting point 644, 182
        graphics.lineTo(638, 160); // Ending point 655, 180
        graphics.lineTo(633, 175); // Ending point 651, 192


        var y = 305;
        var text = _this.add.text(590, y - 40, "50" + '\u00B0', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#0x000000"  // Red color "#FF0000"
        });

        var text2 = _this.add.text(400, y + 80, "40" + '\u00B0' + '  +  ' + "50" + '\u00B0' + '  =  ', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#0x000000"  // Red color "#FF0000"
        });

        var text3 = _this.add.text(560, y + 80, "90" + '\u00B0', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#FF0000"  // green color "#FF0000"
        });

        _this.background_demo.addChild(graphics);
        _this.background_demo.addChild(text);
        _this.background_demo.addChild(text2);
        _this.background_demo.addChild(text3);


        _this.group1.addChild(graphics);
        _this.group1.addChild(text);
        _this.group1.addChild(text2);
        _this.group1.addChild(text3);

    },

    drawAngle90: function () {
        _this.previousScreen.alpha = 1;
        _this.screenVal = 2;
        _this.group2 = _this.add.group();
        console.log('draw angle 90')

        var graphics = _this.add.graphics(0, 0);

        // Calculate coordinates for the angle
        var centerX = 400;
        var centerY = 300;

        var angleDegrees = 90;
        var arrowLength = 185;


        // Draw the arrow's tail (line)
        var tailEndX = centerX + arrowLength * Math.cos(Phaser.Math.degToRad(angleDegrees));
        var tailEndY = centerY - arrowLength * Math.sin(Phaser.Math.degToRad(angleDegrees));
        graphics.lineStyle(2, 0x4472c4); // Black color
        graphics.moveTo(centerX, centerY);
        graphics.lineTo(tailEndX, tailEndY);

        var angleDegrees2 = 50;
        var arrowLength2 = 185;

        // Draw the arrow's tail (line)
        var tailEndX = centerX + arrowLength2 * Math.cos(Phaser.Math.degToRad(angleDegrees2));
        var tailEndY = centerY - arrowLength2 * Math.sin(Phaser.Math.degToRad(angleDegrees2));
        graphics.lineStyle(2, 0x4472c4); // Black color
        graphics.moveTo(centerX, centerY);
        graphics.lineTo(tailEndX, tailEndY);

        // Draw the arc representing a 40-degree angle
        var angle = Phaser.Math.degToRad(40); // Convert angle to radians
        graphics.arc(370, 300 - 14, 40, Phaser.Math.PI2, Phaser.Math.PI2 - angle, true);


        // Draw the arc representing a 50-degree angle
        var angle = Phaser.Math.degToRad(50); // Convert angle to radians
        graphics.arc(400, 300, 50, Phaser.Math.PI2, Phaser.Math.PI2 - angle, true);

        var x = 400; // Replace with your desired x position
        var y = 300; // Replace with your desired y position
        var length = 150; // Replace with the desired length in pixels

        graphics.moveTo(x, y);
        graphics.lineTo(x + length, y);

        // Draw a line for down arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(539, 305); // Starting point 644, 182
        graphics.lineTo(550, 300); // Ending point 655, 180
        graphics.lineTo(539, 295); // Ending point 651, 192

        // Draw a line for 50 degree arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(507, 165); // Starting point 576, 165
        graphics.lineTo(518, 158); // Ending point 588, 160
        graphics.lineTo(516, 172); // Ending point 583, 175

        // Draw a line for 90 dg arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(395, 126); // Starting point 644, 182
        graphics.lineTo(400, 115); // Ending point 655, 180
        graphics.lineTo(405, 126); // Ending point 651, 192


        var text = _this.add.text(470, y - 40, "50" + '\u00B0', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#0x000000"  // Red color "#FF0000"
        });

        var text2 = _this.add.text(405, y - 70, "40" + '\u00B0', {
            font: "22px Akzidenz-Grotesk BQ",
            fill: "#0x000000"  // Red color "#FF0000"
        });


        //total degrees text
        var text3 = _this.add.text(390, y + 80, "40" + '\u00B0' + '  +  ' + "50" + '\u00B0' + '  =  ', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#0x000000"  // Red color "#FF0000"
        });

        var text4 = _this.add.text(540, y + 80, " 90" + '\u00B0', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#FF0000"  // green color "#FF0000"
        });

        _this.background_demo.addChild(graphics);
        _this.background_demo.addChild(text);
        _this.background_demo.addChild(text2);
        _this.background_demo.addChild(text3);
        _this.background_demo.addChild(text4);


        _this.group2.addChild(graphics);
        _this.group2.addChild(text);
        _this.group2.addChild(text2);
        _this.group2.addChild(text3);
        _this.group2.addChild(text4);
    },

    examplesForComplementoryAngle: function () {
        _this.screenVal = 3;
        _this.group3 = _this.add.group();

        var x = 380;
        var y = 100;

        var text = _this.add.text(x, y + 80, "50" + '\u00B0' + '  +  ' + "40" + '\u00B0' + '  =  ', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#0x000000"  // Red color "#FF0000"
        });

        var text2 = _this.add.text(x + 150, y + 80, " 90" + '\u00B0', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#FF0000"  // green color "#FF0000"
        });

        var text3 = _this.add.text(x, y + 140, "13" + '\u00B0' + '  +  ' + "77" + '\u00B0' + '  =  ', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#0x000000"  // Red color "#FF0000"
        });

        var text4 = _this.add.text(x + 150, y + 140, " 90" + '\u00B0', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#FF0000"  // green color "#FF0000"
        });

        var text5 = _this.add.text(x, y + 200, "72" + '\u00B0' + '  +  ' + "18" + '\u00B0' + '  =  ', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#0x000000"  // Red color "#FF0000"
        });

        var text6 = _this.add.text(x + 150, y + 200, " 90" + '\u00B0', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#FF0000"  // green color "#FF0000"
        });

        _this.background_demo.addChild(text);
        _this.background_demo.addChild(text2);
        _this.background_demo.addChild(text3);
        _this.background_demo.addChild(text4);
        _this.background_demo.addChild(text5);
        _this.background_demo.addChild(text6);


        _this.group3.addChild(text);
        _this.group3.addChild(text2);
        _this.group3.addChild(text3);
        _this.group3.addChild(text4);
        _this.group3.addChild(text5);
        _this.group3.addChild(text6);

    },

    drawAngle105: function () {
        if (_this.playCount === 0) {
            // _this.Ask_Question6.play();
            _this.playCount++;
        }
        _this.Ask_Question6.play();
        // _this.Question_flag = 6;

        console.log('draw angle 105')
        _this.group4 = _this.add.group();

        _this.screenVal = 4;

        var graphics = _this.add.graphics(0, 0);

        // Calculate coordinates for the angle
        var centerX = 300;
        var centerY = 300;

        var angleDegrees = 105;
        var arrowLength = 185;

        // var graphics = game.add.graphics(0, 0);

        // Draw the arrow's tail (line)
        var tailEndX = centerX + arrowLength * Math.cos(Phaser.Math.degToRad(angleDegrees));
        var tailEndY = centerY - arrowLength * Math.sin(Phaser.Math.degToRad(angleDegrees));
        graphics.lineStyle(2, 0x4472c4); // Black color
        graphics.moveTo(centerX, centerY);
        graphics.lineTo(tailEndX, tailEndY);

        // Draw the arc representing a 40-degree angle
        var angle = Phaser.Math.degToRad(105); // Convert angle to radians
        graphics.arc(300, 300, 25, Phaser.Math.PI2, Phaser.Math.PI2 - angle, true);

        var x = 300; // Replace with your desired x position
        var y = 300; // Replace with your desired y position
        var length = 150; // Replace with the desired length in pixels

        graphics.moveTo(x, y);
        graphics.lineTo(x + length, y);


        // Draw a line for down arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(439, 305); // Starting point 644, 182
        graphics.lineTo(450, 300); // Ending point 550, 300
        graphics.lineTo(439, 295); // Ending point 651, 192

        // Draw a line for up arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(249, 132); // Starting point 644, 182
        graphics.lineTo(251, 120); // Ending point 655, 180
        graphics.lineTo(259, 128); // Ending point 651, 192


        var text = _this.add.text(310, y - 60, "105" + '\u00B0', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#0x000000"  // Red color "#FF0000"
        });

        _this.background_demo.addChild(graphics);
        _this.background_demo.addChild(text);

        _this.group4.addChild(graphics);
        _this.group4.addChild(text);

    },

    drawAngle75: function () {
        console.log('draw angle 50')
        _this.screenVal = 4;
        var graphics = _this.add.graphics(0, 0);

        // Calculate coordinates for the angle
        var centerX = 520;
        var centerY = 300;

        var angleDegrees = 75;
        var arrowLength = 185;

        // Draw the arrow's tail (line)
        var tailEndX = centerX + arrowLength * Math.cos(Phaser.Math.degToRad(angleDegrees));
        var tailEndY = centerY - arrowLength * Math.sin(Phaser.Math.degToRad(angleDegrees));
        graphics.lineStyle(2, 0x4472c4); // Black color
        graphics.moveTo(centerX, centerY);
        graphics.lineTo(tailEndX, tailEndY);

        // Draw the arc representing a 40-degree angle
        var angle = Phaser.Math.degToRad(75); // Convert angle to radians
        graphics.arc(520, 300, 25, Phaser.Math.PI2, Phaser.Math.PI2 - angle, true);

        var x = 520; // Replace with your desired x position
        var y = 300; // Replace with your desired y position
        var length = 150; // Replace with the desired length in pixels

        graphics.moveTo(x, y);
        graphics.lineTo(x + length, y);

        // Draw a line for down arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(659, 305); // Starting point 644, 182
        graphics.lineTo(670, 300); // Ending point 550, 300
        graphics.lineTo(659, 295); // Ending point 651, 192

        // Draw a line for up arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(560, 128); // Starting point 644, 182
        graphics.lineTo(569, 120); // Ending point 655, 180
        graphics.lineTo(571, 133); // Ending point 651, 192


        var text = _this.add.text(540, y - 40, "75" + '\u00B0', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#0x000000"  // Red color "#FF0000"
        });

        var text2 = _this.add.text(350, y + 80, "105" + '\u00B0' + '  +  ' + "75" + '\u00B0' + '  =  ', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#0x000000"  // Red color "#FF0000"
        });

        var text3 = _this.add.text(510, y + 80, " 180" + '\u00B0', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#FF0000"  // green color "#FF0000"
        });

        _this.background_demo.addChild(graphics);
        _this.background_demo.addChild(text);
        _this.background_demo.addChild(text2);
        _this.background_demo.addChild(text3);


        _this.group4.addChild(graphics);
        _this.group4.addChild(text);
        _this.group4.addChild(text2);
        _this.group4.addChild(text3);

    },

    drawAngle180: function () {
        _this.nextScreen.alpha = 1;
        _this.screenVal = 5;
        _this.group5 = _this.add.group();
        console.log('draw angle 180')

        var graphics = _this.add.graphics(0, 0);

        // Calculate coordinates for the angle
        var centerX = 500;
        var centerY = 300;

        var angleDegrees = 180;
        var arrowLength = 185;


        // Draw the arrow's tail (line)
        var tailEndX = centerX + arrowLength * Math.cos(Phaser.Math.degToRad(angleDegrees));
        var tailEndY = centerY - arrowLength * Math.sin(Phaser.Math.degToRad(angleDegrees));
        graphics.lineStyle(2, 0x4472c4); // Black color
        graphics.moveTo(centerX, centerY);
        graphics.lineTo(tailEndX, tailEndY);

        graphics.beginFill(0x4472c4);

        // Draw the smaller triangle arrow pointing to the left
        var x = 320; // X position
        var y = 305; // Y position

        var angleDegrees2 = 75;
        var arrowLength2 = 185;

        // Draw the arrow's tail (line)
        var tailEndX = centerX + arrowLength2 * Math.cos(Phaser.Math.degToRad(angleDegrees2));
        var tailEndY = centerY - arrowLength2 * Math.sin(Phaser.Math.degToRad(angleDegrees2));
        graphics.lineStyle(2, 0x4472c4); // Black color
        graphics.moveTo(centerX, centerY);
        graphics.lineTo(tailEndX, tailEndY);
        graphics.endFill();

        var x = 500; // Replace with your desired x position
        var y = 300; // Replace with your desired y position
        var length = 150; // Replace with the desired length in pixels

        graphics.moveTo(x, y);
        graphics.lineTo(x + length, y);
        graphics.endFill();

        // Draw the arc representing a 105-degree angle on the second side
        var y = 305;
        var angleDegrees = 105;
        var arcCenterX = 510;
        var arcCenterY = y - 5;
        var arcRadius = 35;
        var startAngle = 270; // Half the angle added to 90 degrees
        var endAngle = 180; // Half the angle subtracted from 90 degrees

        graphics.lineStyle(2, 0x4472c4);
        graphics.arc(arcCenterX, arcCenterY, arcRadius, Phaser.Math.degToRad(startAngle), Phaser.Math.degToRad(endAngle), true);


        // Draw the arc representing a 50-degree angle
        var angle = Phaser.Math.degToRad(75); // Convert angle to radians
        graphics.arc(500, y - 5, 30, Phaser.Math.PI2, Phaser.Math.PI2 - angle, true);


        // Draw a line for right arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(639, 305); // Starting point 644, 182
        graphics.lineTo(650, 300); // Ending point 550, 300
        graphics.lineTo(639, 295); // Ending point 651, 192

        // Draw a line for left arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(326, 305); // Starting point 644, 182
        graphics.lineTo(315, 300); // Ending point 550, 300
        graphics.lineTo(326, 295); // Ending point 651, 192

         // Draw a line for 75 dg arrow
         graphics.lineStyle(3, 0x4472c4);
         graphics.moveTo(540, 128); // Starting point 644, 182
         graphics.lineTo(549, 120); // Ending point 655, 180
         graphics.lineTo(551, 133); // Ending point 651, 192 


        var text = _this.add.text(550, y - 50, "75" + '\u00B0', {
            font: "22px Akzidenz-Grotesk BQ",
            fill: "#0x000000"  // Red color "#FF0000"
        });

        var text2 = _this.add.text(450, y - 60, "105" + '\u00B0', {
            font: "22px Akzidenz-Grotesk BQ",
            fill: "#0x000000"  // Red color "#FF0000"
        });


        //total degrees text
        var text3 = _this.add.text(350, y + 50, "105" + '\u00B0' + '  +  ' + "75" + '\u00B0' + '  =  ', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#0x000000"  // Red color "#FF0000"
        });

        var text4 = _this.add.text(550, y + 50, " 180" + '\u00B0', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#FF0000"  // green color "#FF0000"
        });

        _this.background_demo.addChild(graphics);
        _this.background_demo.addChild(text);
        _this.background_demo.addChild(text2);
        _this.background_demo.addChild(text3);
        _this.background_demo.addChild(text4);


        _this.group5.addChild(graphics);
        _this.group5.addChild(text);
        _this.group5.addChild(text2);
        _this.group5.addChild(text3);
        _this.group5.addChild(text4);
    },

    examplesForSupplementoryAngle: function () {
        _this.nextScreen.alpha = 0;
        _this.screenVal = 6;
        _this.group6 = _this.add.group();

        var x = 350;
        var y = 100;

        var text = _this.add.text(x, y + 80, "150" + '\u00B0' + '  +  ' + "30" + '\u00B0' + '  =  ', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#0x000000"  // Red color "#FF0000"
        });

        var text2 = _this.add.text(x + 160, y + 80, " 180" + '\u00B0', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#FF0000"  // green color "#FF0000"
        });

        var text3 = _this.add.text(x, y + 140, "13" + '\u00B0' + '  +  ' + "167" + '\u00B0' + '  =  ', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#0x000000"  // Red color "#FF0000"
        });

        var text4 = _this.add.text(x + 160, y + 140, " 180" + '\u00B0', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#FF0000"  // green color "#FF0000"
        });

        var text5 = _this.add.text(x, y + 200, "72" + '\u00B0' + '  +  ' + "108" + '\u00B0' + '  =  ', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#0x000000"  // Red color "#FF0000"
        });

        var text6 = _this.add.text(x + 160, y + 200, " 180" + '\u00B0', {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#FF0000"  // green color "#FF0000"
        });

        _this.background_demo.addChild(text);
        _this.background_demo.addChild(text2);
        _this.background_demo.addChild(text3);
        _this.background_demo.addChild(text4);
        _this.background_demo.addChild(text5);
        _this.background_demo.addChild(text6);


        _this.group6.addChild(text);
        _this.group6.addChild(text2);
        _this.group6.addChild(text3);
        _this.group6.addChild(text4);
        _this.group6.addChild(text5);
        _this.group6.addChild(text6);

    },

    navigateToPrevScreen() {
        if (_this.screenVal === 1) {
            _this.previousScreen.alpha = 0;
            _this.nextScreen.alpha = 1;
        }
        else if (_this.screenVal === 2) {
            _this.nextScreen.alpha = 1;
            _this.group2.destroy();
            _this.drawAngle40();
            _this.drawAngle50();
        }
        else if (_this.screenVal === 3) {
            _this.nextScreen.alpha = 1;
            _this.group3.destroy();
            _this.drawAngle90();
        }
        else if (_this.screenVal === 4) {
            _this.nextScreen.alpha = 1;
            _this.group4.destroy();
            _this.examplesForComplementoryAngle();
        }
        else if (_this.screenVal === 5) {
            _this.nextScreen.alpha = 1;
            _this.group5.destroy();
            _this.drawAngle105();
            _this.drawAngle75();
        }
        else if (_this.screenVal === 6) {
            _this.group6.destroy();
            _this.drawAngle180();
        }
    },

    navigateToNextScreen() {
        if (_this.screenVal === 1) {
            _this.group1.destroy();
            _this.drawAngle90();
        }
        else if (_this.screenVal === 2) {
            _this.group2.destroy();
            _this.examplesForComplementoryAngle();
        }
        else if (_this.screenVal === 3) {
            _this.group3.destroy();
            _this.drawAngle105();
            _this.drawAngle75();
        }
        else if (_this.screenVal === 4) {
            _this.group4.destroy();
            _this.drawAngle180();
        }
        else if (_this.screenVal === 5) {
            _this.group5.destroy();
            _this.examplesForSupplementoryAngle();
        }
        else if (_this.screenVal === 6) {
            _this.nextScreen.alpha = 0;
        }
    },
}
