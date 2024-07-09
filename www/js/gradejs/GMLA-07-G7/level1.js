Game.GMLA_07_G7level1 = function () { };


Game.GMLA_07_G7level1.prototype =
{
    init: function (param, score) {
        _this = this;

        this.Stararr = param;
        this.score = score;
        _this.languageSelected = window.languageSelected;

        if (_this.languageSelected == null
            || _this.languageSelected == " "
            || _this.languageSelected == "") {
            _this.languageSelected = "ENG";
        }
        else //// console.log("Language selected: " + _this.languageSelected);
            _this.clickSound = document.createElement('audio');
        _this.clickSoundsrc = document.createElement('source');
        _this.clickSoundsrc.setAttribute("src", window.baseUrl + "sounds/clickSound.mp3");
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

        _this.Ask_Question1 = _this.createAudio("GMLA_07_G7_a1");
        _this.Ask_Question2 = _this.createAudio("GMLA_07_G7_a2");
        _this.Ask_Question3 = _this.createAudio("GMLA_07_G7_a5");
        _this.Ask_Question4 = _this.createAudio("GMLA_07_G7_a6");
        _this.Ask_Question5 = _this.createAudio("GMLA_07_G7_a7");

        telInitializer.gameIdInit("GMLA_07_G7", gradeSelected);
        console.log(gameID, "gameID...");
    },

    create: function (game) {

        //* show the demo video
        _this.time.events.add(1, function () {

            // _this.ViewDemoVideo();
        });

        //* start the game with delay. Since the Demo video will pause the game, the timer will freeze
        //* and then start after the game is unpaused and continues to call the gameCreate function.
        _this.time.events.add(1500, function () {
            console.log("//////////////////")
            _this.gameCreate(game);
        });
    },

    ViewDemoHint: function () {
        //* pause the game before going to the demovideo 
        _this.game.paused = true;
        _this.DemoHint();  //* at the end of demo video/skip pressed, it will unpause the game.
    },

    gameCreate: function (game) {
        _this.questionid = null;
        _this.noofAttempts = 0;
        _this.sceneCount = 0;
        _this.AnsTimerCount = 0;

        _this.microConcepts;

        _this.count1 = 0;  //for partB tracking
        _this.speakerbtn;
        _this.background;
        _this.count = 0;  //for partA tracking
        _this.starsGroup;

        _this.seconds = 0;
        _this.minutes = 0;
        _this.numberOfQuestions = 0;
        _this.counterForTimer = 0;

        _this.queFlag = 0; //for question audio

        //* variables for partA
        _this.quest1 = [];  //for partA questions
        _this.ans1 = [];  //for partA answers
        _this.widthboxCount1 = 0;  //counter for widthbox clicked to become 4
        _this.selected1 = []; //selected woodstick cm to store
        _this.panelcount1 = 0;  //if panelcount is 3 draw a triangle

        //* variables for partA
        _this.quest2 = [];  //for partb questions
        _this.ans2 = [];   //for partb answers
        _this.widthboxCount2 = 0;  //counter for widthbox clicked to become 5
        _this.selected2 = []; //selected woodstick cm to store
        _this.panelcount2 = 0;  //if panelcount is 3 draw a triangle
        _this.ansCount = 0;  //to validate once all a b and their sums are clicked, display inequality symbols

        _this.fouransLen1 = 0;  //for number pad entering value of 4 digit and not more is allowed
        _this.fouransLen2 = 0;
        _this.fouransLen3 = 0;
        _this.fouransLen4 = 0;
        _this.fouransLen5 = 0;
        _this.fouransLen6 = 0;
        _this.fouransLen7 = 0;
        _this.fouransLen8 = 0;
        _this.fouransLen9 = 0;

        _this.correct1 = 0;  //for symbol validations
        _this.correct2 = 0;
        _this.correct3 = 0;

        _this.wrongAnswer = 0;  //after 2 times wrong give hint for partB

        _this.hint_flag = 0;
        _this.speakerbtnClicked = false;
        _this.rightbtn_Clicked = false;

        _this.background = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'BG');
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

                if (_this.queFlag == 1)
                    _this.Ask_Question1.play();
                if (_this.queFlag == 2)
                    _this.Ask_Question2.play();
                if (_this.queFlag == 3)
                    _this.Ask_Question3.play();
                if (_this.queFlag == 4)
                    _this.Ask_Question4.play();
                if (_this.queFlag == 5)
                    _this.Ask_Question5.play();



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
            //// console.log("inside hintbutton function");
            //* show the demo video
            _this.hintBtn.inputEnabled = false;
            _this.hintBtn.input.useHandCursor = false;
            _this.time.events.add(1, function () {
                //// console.log(_this.hintBtn.inputEnabled, "status of hintBtn");
                _this.ViewDemoHint();
            });

        });

        _this.generateStarsForTheScene(6);

        //* start the game with first question
        _this.time.events.add(1000, _this.getQuestion);
    },

    createAudio: function (src) {
        audio = document.createElement('audio');
        audiosrc = document.createElement('source');
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-07-G7/" + _this.languageSelected + "/" + src + ".mp3");
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

        _this.Initial_randomizing();  //randomize for PartA
        _this.DisplayQuestionA();  //for Part A
        _this.Initial_randomizing1();  //randomize for PartB
        // _this.DisplayQuestionB();  //for Part B


        console.log("inside get question.....");
        _this.hintBtn.inputEnabled = true;
        _this.hintBtn.input.useHandCursor = true;
        _this.hint_flag = 1;

        _this.questionid = 1;
    },

    stopVoice: function () {
        _this.Ask_Question1.pause();
        _this.Ask_Question1 = null;

        _this.Ask_Question2.pause();
        _this.Ask_Question2 = null;

        _this.Ask_Question3.pause();
        _this.Ask_Question3 = null;

        _this.Ask_Question4.pause();
        _this.Ask_Question4 = null;

        _this.Ask_Question5.pause();
        _this.Ask_Question5 = null;

        if (_this.celebrationSound) {
            if (_this.celebrationSound.isPlaying) {
                _this.celebrationSound.stop();
                _this.celebrationSound = null;
            }
        }

    },

    Initial_randomizing: function () {

        //*Property of the lengths of sides of a triangle:
        //* The sum of the lengths of any two sides of a triangle is greater than the length of the third side.
        //* a+b>c   b+c>a  a+c>b

        _this.counter = 0; //counter to generate only 3 questions
        do {

            //first generate 4 random numbers between 1 to 11 with 0.5 difference
            let number1 = Math.floor(Math.random() * 21) + 2;  // from 1 till 11
            number1 /= 2.0;
            let number2 = Math.floor(Math.random() * 15) + 2;  // from 1 till 8
            number2 /= 2.0;
            let number3 = Math.floor(Math.random() * 15) + 2;  // from 1 till 8
            number3 /= 2.0;
            let number4 = Math.floor(Math.random() * 15) + 2;  // from 1 till 8
            number4 /= 2.0;


            _this.nums = [number1, number2, number3, number4];  //4 numbers in a array
            //   console.log(_this.nums, "num");
            _this.validSubsets = []; //length=0

            for (let m = 0; m < 4; m++) {   //from 4 numbers we can generate 4 different subsets therefore 3 for loops to generate subsets
                for (let n = m + 1; n < 4; n++) {
                    for (let o = n + 1; o < 4; o++) {
                        const subset = [_this.nums[m], _this.nums[n], _this.nums[o]];   //subset stored
                        //check the triangle porperty
                        if (subset[0] + subset[1] > subset[2] && subset[2] + subset[1] > subset[0] && subset[2] + subset[0] > subset[1]) //&& _this.validSubsets.length === 0) {
                            _this.validSubsets.push(subset);  //if all 3 condtn satisfy push inside validsubsets
                    }
                }
            }

            if (_this.validSubsets.length === 1)  //it should contain only 1 unique subset hence check length is 1 or no
            {
                _this.quest1.push(_this.nums);  //push the valid question and answer in arrays
                _this.ans1.push(_this.validSubsets);
                _this.counter++;
                //  console.log("Set of numbers:", _this.nums);   
                // _this.a= _this.add.text(50 , 50+_this.y,  _this.nums );
                //console.log("Valid subset:", _this.validSubsets[0]);
                //_this.a= _this.add.text(400, 50+_this.y  ,  _this.validSubsets[0] );
                //_this.y = _this.y + 50;
            }
        } while (_this.counter != 3);  //once 3 questions r generated come out of loop

        console.log(_this.quest1, "que");
        console.log(_this.ans1, "ans");
    },

    Initial_randomizing1: function () {

        _this.counter1 = 0; //counter to generate only 3 questions
        do {

            //first generate 4 random numbers between 1 to 11 with 0.5 difference
            let number1 = Math.floor(Math.random() * 15) + 2;  //from 1 til 8
            number1 /= 2.0;
            let number2 = Math.floor(Math.random() * 15) + 2; // from 1 till 8
            number2 /= 2.0;
            let number3 = Math.floor(Math.random() * 21) + 2;  // from 1 till 11
            number3 /= 2.0;
            let number4 = Math.floor(Math.random() * 15) + 2; // from 1 till 8
            number4 /= 2.0;
            let number5 = Math.floor(Math.random() * 15) + 2;
            number5 /= 2.0;

            // console.log(number1, "n1");
            // console.log(number2, "n2");
            // console.log(number3, "n3");
            // console.log(number4, "n4");

            _this.nums = [number1, number2, number3, number4, number5];  //5 numbers in a array
            //console.log(_this.nums)
            _this.validSubsets = []; //length=0

            for (let m = 0; m < 5; m++) {   //from 4 numbers we can generate 4 different subsets therefore 3 for loops to generate subsets
                for (let n = m + 1; n < 5; n++) {
                    for (let o = n + 1; o < 5; o++) {
                        // for (let p = o + 1; p < 5; p++) {
                        const subset = [_this.nums[m], _this.nums[n], _this.nums[o]];   //subset stored
                        //  console.log(subset)
                        //check the triangle porperty
                        if (subset[0] + subset[1] > subset[2] && subset[2] + subset[1] > subset[0] && subset[2] + subset[0] > subset[1]) //&& _this.validSubsets.length === 0) {
                            _this.validSubsets.push(subset);  //if all 3 condtn satisfy push inside validsubsets
                    }
                }
            }

            if (_this.validSubsets.length === 1)  //it should contain only 1 unique subset hence check length is 1 or no
            {
                _this.quest2.push(_this.nums);  //push the valid question and answer in arrays
                _this.ans2.push(_this.validSubsets);
                _this.counter1++;
                // console.log("Set of numbers:", _this.nums);   
                //  _this.a = _this.add.text(50, 50 + _this.y, _this.nums);
                // console.log("Valid subset:", _this.validSubsets[0]);
                // _this.a = _this.add.text(400, 50 + _this.y, _this.validSubsets[0]);
                //_this.y = _this.y + 50;
            }
        } while (_this.counter1 != 3);  //once 3 questions r generated come out of loop

        console.log(_this.quest2, "que");
        console.log(_this.ans2, "ans");
    },

    shuffleArray: function (array) {
        let len = array.length, currentIndex;
        for (currentIndex = len - 1; currentIndex > 0; currentIndex--) {
            let randIndex = Math.floor(Math.random() * (currentIndex + 1));
            var temp = array[currentIndex];
            array[currentIndex] = array[randIndex];
            array[randIndex] = temp;
        }
    },

    DisplayQuestionA: function () {
        console.log("first screen");
        if (_this.count == 0) _this.Ask_Question1.play();
        _this.queFlag = 1;

        //display each panel with its width box
        _this.panel1 = _this.add.sprite(20, 80, 'panel1');
        _this.panel1.scale.setTo(1.02, 1);
        _this.widthbox1 = _this.add.sprite(880, 75, 'WidthBox');
        _this.widthbox1.inputEnabled = true;
        _this.widthbox1.input.useHandCursor = true;
        _this.widthbox1.events.onInputDown.add(_this.width1);

        _this.panel2 = _this.add.sprite(20, 160, 'panel1');
        _this.panel2.scale.setTo(1.02, 1);
        _this.widthbox2 = _this.add.sprite(880, 155, 'WidthBox');
        _this.widthbox2.inputEnabled = true;
        _this.widthbox2.input.useHandCursor = true;
        _this.widthbox2.events.onInputDown.add(_this.width2);

        _this.panel3 = _this.add.sprite(20, 240, 'panel1');
        _this.panel3.scale.setTo(1.02, 1);
        _this.widthbox3 = _this.add.sprite(880, 235, 'WidthBox');
        _this.widthbox3.inputEnabled = true;
        _this.widthbox3.input.useHandCursor = true;
        _this.widthbox3.events.onInputDown.add(_this.width3);

        _this.panel4 = _this.add.sprite(20, 320, 'panel1');
        _this.panel4.scale.setTo(1.02, 1);
        _this.widthbox4 = _this.add.sprite(880, 315, 'WidthBox');
        _this.widthbox4.inputEnabled = true;
        _this.widthbox4.input.useHandCursor = true;
        _this.widthbox4.events.onInputDown.add(_this.width4);

        //for random question generated display 4 wood peices in each panel according to question
        _this.wood1 = _this.add.image(30, 100, 'woodPeice');
        _this.wood1.scale.setTo(_this.quest1[_this.count][0] / 10, 1);
        _this.wood2 = _this.add.image(30, 180, 'woodPeice');
        _this.wood2.scale.setTo(_this.quest1[_this.count][1] / 10, 1);
        _this.wood3 = _this.add.image(30, 260, 'woodPeice');
        _this.wood3.scale.setTo(_this.quest1[_this.count][2] / 10, 1);
        _this.wood4 = _this.add.image(30, 340, 'woodPeice');
        _this.wood4.scale.setTo(_this.quest1[_this.count][3] / 10, 1);

        _this.tickBtn4 = _this.add.sprite(855, 410, 'TickBtn');
        _this.tickBtn4.inputEnabled = true;
        _this.tickBtn4.input.useHandCursor = true;
        _this.tickBtn4.events.onInputDown.add(_this.nextpage);  //add tick button to click after selecting 3 sides
        _this.tickBtn4.visible = false;
        //11.5-1.13   11-1.08  10.5- 1.04  10- 0.98  9.5- 0.94  9- 0.89  8.5- 0.84
        //8- 0.79  7.5- 0.74  7- 0.69  6.5- 0.64  6- 0.59 5.5- 0.54
        //5- 0.49  4.5- 0.44  4- 0.39  3.5- 0.35  3- 0.3  2.5- 0.25  2- 0.2   1.5-0.15
        if (_this.count == 0) {
            let hand = _this.add.image(920, 100, 'hand');
            hand.scale.setTo(0.5, 0.5);
            _this.handTween = _this.add.tween(hand);
            _this.handTween.to({ x: 900, y: 100 }, 1000, 'Linear', true, 0);
            _this.handTween.onComplete.add(function () {
                _this.clickSound.play();
                _this.widthbox1.frame = 1;
                _this.time.events.add(1500, function () {
                    hand.destroy();
                    _this.widthbox1.frame = 0;
                });

            });
        }

    },

    width1: function () {
        _this.clickSound.play();
        _this.widthboxCount1++;  //counter to keep track of all width box clicked or no
        _this.widthbox1.inputEnabled = false;
        _this.widthbox1.frame = 1;  //change to yellow
        _this.scale1 = _this.add.sprite(-105, 115, 'scale');  //add a wooden scale
        _this.scale1.alpha = 0;
        _this.tween11 = _this.add.tween(_this.scale1).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true); //tween to get scale
        _this.tween1 = _this.add.tween(_this.scale1).to({ x: 15, y: 115 }, 2000, Phaser.Easing.Linear.None, true); //tween to get scale
        _this.tween1.onComplete.add(function () {
            _this.time.events.add(1500, function () {
                _this.scale1.destroy(); //destroy wooden scale
                _this.widthbox1.frame = 0;  //frame back to 0

                _this.len1 = _this.add.text(787, 100, _this.quest1[_this.count][0] + " cm"); //display the cm
                _this.applyingStyle(_this.len1);
                _this.enablePanelFrame1();
            });
        });

    },

    width2: function () {
        _this.clickSound.play();
        _this.widthboxCount1++;
        _this.widthbox2.inputEnabled = false;
        _this.widthbox2.frame = 1;
        _this.scale2 = _this.add.sprite(-105, 195, 'scale');
        _this.scale2.alpha = 0;
        _this.tween22 = _this.add.tween(_this.scale2).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true); //tween to get scale
        _this.tween2 = _this.add.tween(_this.scale2).to({ x: 15, y: 195 }, 2000, Phaser.Easing.Linear.None, true);
        _this.tween2.onComplete.add(function () {
            _this.time.events.add(1500, function () {
                _this.scale2.destroy();
                _this.widthbox2.frame = 0;

                _this.len2 = _this.add.text(787, 180, _this.quest1[_this.count][1] + " cm");
                _this.applyingStyle(_this.len2);
                _this.enablePanelFrame1();
            });
        });

    },

    width3: function () {
        _this.clickSound.play();
        _this.widthboxCount1++;
        _this.widthbox3.inputEnabled = false;
        _this.widthbox3.frame = 1;
        _this.scale3 = _this.add.sprite(-105, 275, 'scale');
        _this.scale3.alpha = 0;
        _this.tween33 = _this.add.tween(_this.scale3).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true); //tween to get scale
        _this.tween3 = _this.add.tween(_this.scale3).to({ x: 15, y: 275 }, 2000, Phaser.Easing.Linear.None, true);
        _this.tween3.onComplete.add(function () {
            _this.time.events.add(1500, function () {
                _this.scale3.destroy();
                _this.widthbox3.frame = 0;

                _this.len3 = _this.add.text(787, 260, _this.quest1[_this.count][2] + " cm");
                _this.applyingStyle(_this.len3);
                _this.enablePanelFrame1();
            });
        });

    },

    width4: function () {
        _this.clickSound.play();
        _this.widthboxCount1++;
        _this.widthbox4.inputEnabled = false;
        _this.widthbox4.frame = 1;
        _this.scale4 = _this.add.sprite(-105, 355, 'scale');
        _this.scale4.alpha = 0;
        _this.tween44 = _this.add.tween(_this.scale4).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true); //tween to get scale
        _this.tween4 = _this.add.tween(_this.scale4).to({ x: 15, y: 355 }, 2000, Phaser.Easing.Linear.None, true);
        _this.tween4.onComplete.add(function () {
            _this.time.events.add(1500, function () {
                _this.scale4.destroy();
                _this.widthbox4.frame = 0;

                _this.len4 = _this.add.text(787, 340, _this.quest1[_this.count][3] + " cm");
                _this.applyingStyle(_this.len4);
                _this.enablePanelFrame1();
            });
        });

    },

    enablePanelFrame1: function () {
        if (_this.widthboxCount1 == 4)  //if all 4 lengths r displayed next enable panel selection
        {
            if (_this.count == 0) _this.Ask_Question2.play();
            _this.queFlag = 2;
            _this.panel1.inputEnabled = true;
            _this.panel1.input.useHandCursor = true;
            _this.panel1.events.onInputDown.add(_this.panel1Frame);
            _this.panel2.inputEnabled = true;
            _this.panel2.input.useHandCursor = true;
            _this.panel2.events.onInputDown.add(_this.panel2Frame);
            _this.panel3.inputEnabled = true;
            _this.panel3.input.useHandCursor = true;
            _this.panel3.events.onInputDown.add(_this.panel3Frame);
            _this.panel4.inputEnabled = true;
            _this.panel4.input.useHandCursor = true;
            _this.panel4.events.onInputDown.add(_this.panel4Frame);
            _this.tickBtn4.visible = true;


        }
    },

    panel1Frame: function () {
        _this.clickSound.play();
        if (_this.panel1.frame == 0) {
            _this.panelcount1++;  //when 3 panel clicked draw a triangle
            _this.selected1.push(_this.quest1[_this.count][0]); //push the selected frame question 
            _this.panel1.frame = 1;  //highlight to yellow
        }
        else {
            _this.panelcount1--; //when clicked again remove highlight, panel count and also pop
            _this.selected1.splice(_this.selected1.indexOf(_this.quest1[_this.count][0]), 1);
            _this.panel1.frame = 0;
        }
    },

    panel2Frame: function () {
        _this.clickSound.play();
        if (_this.panel2.frame == 0) {
            _this.panelcount1++;
            _this.selected1.push(_this.quest1[_this.count][1]);
            _this.panel2.frame = 1;
        }
        else {
            _this.panelcount1--;
            _this.selected1.splice(_this.selected1.indexOf(_this.quest1[_this.count][1]), 1);
            _this.panel2.frame = 0;
        }


    },

    panel3Frame: function () {
        _this.clickSound.play();
        if (_this.panel3.frame == 0) {
            _this.selected1.push(_this.quest1[_this.count][2]);
            _this.panelcount1++;
            _this.panel3.frame = 1;
        }
        else {
            _this.panelcount1--;
            _this.selected1.splice(_this.selected1.indexOf(_this.quest1[_this.count][2]), 1);
            _this.panel3.frame = 0;
        }

    },

    panel4Frame: function () {
        _this.clickSound.play();
        if (_this.panel4.frame == 0) {
            _this.panelcount1++;
            _this.selected1.push(_this.quest1[_this.count][3]);
            _this.panel4.frame = 1;
        }
        else {
            _this.panelcount1--;
            _this.selected1.splice(_this.selected1.indexOf(_this.quest1[_this.count][3]), 1);
            _this.panel4.frame = 0;
        }

    },

    nextpage: function () {
        if (_this.panelcount1 == 3)  //if 3 sides are selected draw a triangle
        {

            _this.tickBtn4.inputEnabled = false;
            _this.newScreen();  //to destroy old screen objects
            _this.queFlag = 0;

            _this.sortedArray = _this.selected1.slice();  //sort in ascending order
            for (let i = 0; i < 3 - 1; i++) {
                for (let j = 0; j < 3 - i - 1; j++) {
                    if (_this.sortedArray[j] > _this.sortedArray[j + 1]) {
                        let temp = _this.sortedArray[j];
                        _this.sortedArray[j] = _this.sortedArray[j + 1];
                        _this.sortedArray[j + 1] = temp;
                    }
                }
            }

            _this.sortedArray1 = _this.selected1.sort().toString();  //sort array in ascending order and convert to string
            _this.sortedArray2 = _this.ans1[_this.count][0].sort().toString();
            if (_this.sortedArray1 === _this.sortedArray2) _this.flagset = 1;  //if selected sides are equal
            else _this.flagset = 0;

            _this.a = _this.sortedArray[2];  //let the longest side be base side
            _this.b = _this.sortedArray[1];
            _this.c = _this.sortedArray[0];

            _this.betaDegrees = Math.acos((_this.a * _this.a + _this.c * _this.c - _this.b * _this.b) / (2 * _this.a * _this.c));
            _this.gammaDegrees = Math.acos((_this.a * _this.a + _this.b * _this.b - _this.c * _this.c) / (2 * _this.a * _this.b));

            _this.beta = _this.betaDegrees * 180 / Math.PI;
            _this.gamma = _this.gammaDegrees * 180 / Math.PI;


            _this.stick1 = _this.add.sprite(450, 500, 'woodPeice'); // create a sprite for the first stick image
            _this.stick1.anchor.setTo(0.5, 0.5); // set the anchor point to the left side of the stick
            _this.stick1.scale.setTo(_this.sortedArray[2] / 10, 1); // set the scale of the stick to match its length
            _this.leng1 = _this.add.text(450, 510, _this.sortedArray[2] + " cm");
            _this.applyingStyle(_this.leng1);

            _this.stick2 = _this.add.sprite(448 - _this.stick1.width / 2, 484, 'woodPeice');
            _this.stick2.anchor.setTo(01, 0.55);
            _this.stick2.scale.setTo(_this.sortedArray[1] / 10, 1);
            if (_this.flagset == 1)
                _this.stick2.angle = 180 - _this.gamma;
            else
                _this.stick2.angle = 160;
            _this.leng2 = _this.add.text(_this.stick2.x - 40, _this.stick2.y - 90, _this.sortedArray[1] + " cm");
            _this.applyingStyle(_this.leng2);

            _this.stick3 = _this.add.sprite(445 + _this.stick1.width / 2, 496, 'woodPeice');
            _this.stick3.anchor.setTo(1, 1);
            _this.stick3.scale.setTo(_this.sortedArray[0] / 10, 1);
            if (_this.flagset == 1)
                _this.stick3.angle = _this.beta;
            else
                _this.stick3.angle = 50;
            _this.leng3 = _this.add.text(_this.stick3.x + 8, _this.stick3.y - 90, _this.sortedArray[0] + " cm");
            _this.applyingStyle(_this.leng3);

            _this.triangle = _this.add.group(); // create a group to hold the sticks
            _this.triangle.add(_this.stick1); // add the first stick to the group
            _this.triangle.add(_this.stick2); // add the second stick to the group
            _this.triangle.add(_this.stick3); // add the third stick to the group
        }
        else{
            _this.noofAttempts++;
            _this.wrongSound.play();
        }
            

    },

    newScreen: function () {
        //to make all objects visible false and not to destroy it, becuase when back button is clicked we should make them all visible
        _this.panel1.visible = false;
        _this.widthbox1.visible = false;
        _this.wood1.visible = false;
        _this.len1.visible = false;

        _this.panel2.visible = false;
        _this.widthbox2.visible = false;
        _this.wood2.visible = false;
        _this.len2.visible = false;

        _this.panel3.visible = false;
        _this.widthbox3.visible = false;
        _this.wood3.visible = false;
        _this.len3.visible = false;

        _this.panel4.visible = false;
        _this.widthbox4.visible = false;
        _this.wood4.visible = false;
        _this.len4.visible = false;

        _this.tickBtn4.visible = false;



        _this.panelsecondScreen = _this.add.image(10, 60, 'panel4')
        _this.panelsecondScreen.scale.setTo(1.6, 1.215);

        _this.tickBtn = _this.add.sprite(895, 450, 'TickBtn');
        _this.tickBtn.inputEnabled = true;
        _this.tickBtn.input.useHandCursor = true;
        _this.tickBtn.events.onInputDown.add(_this.validatePartA);  //validate if 3 sides r selected correct

        _this.backbutton = _this.add.sprite(895, 90, 'Backbutton');
        _this.backbutton.scale.setTo(0.9, 0.9);
        _this.backbutton.inputEnabled = true;
        _this.backbutton.input.useHandCursor = true;
        _this.backbutton.events.onInputDown.add(_this.previous);  //go to previous screen

    },

    validatePartA: function () {
        if (_this.sortedArray1 === _this.sortedArray2)  //compare if selected sides are equal to the answer stored array
        {
            telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);
            _this.backbutton.inputEnabled = false;
            _this.tickBtn.inputEnabled = false;
            _this.celebrationSound.play();
            _this.starActions();  // question completed
            _this.time.events.add(1500, function () {
                if (_this.count == 3)  //if part A all 3 questions are done then destroy screen and go to part B
                {
                    _this.destroyA();
                    _this.DisplayQuestionB();
                }
                else   //else destroy screen and go to part a next ques
                {
                    _this.destroyA();
                    _this.DisplayQuestionA();
                }
            });

        }
        else   //if selected side is not equal to answer
        {
            _this.noofAttempts++;
            _this.wrongSound.play();
        }

    },

    previous: function () {
        _this.destroyCommon();

        //make all objects visible
        _this.panel1.visible = true;
        _this.widthbox1.visible = true;
        _this.wood1.visible = true;
        _this.len1.visible = true;

        _this.panel2.visible = true;
        _this.widthbox2.visible = true;
        _this.wood2.visible = true;
        _this.len2.visible = true;

        _this.panel3.visible = true;
        _this.widthbox3.visible = true;
        _this.wood3.visible = true;
        _this.len3.visible = true;

        _this.panel4.visible = true;
        _this.widthbox4.visible = true;
        _this.wood4.visible = true;
        _this.len4.visible = true;

        _this.tickBtn4.visible = true;
        _this.tickBtn4.inputEnabled = true;
        _this.tickBtn4.input.useHandCursor = true;

    },

    destroyCommon: function () {
        _this.panelsecondScreen.destroy();
        //  _this.tickBtn4.visible = false;
        _this.tickBtn.destroy();
        _this.backbutton.destroy();
        _this.leng1.destroy();
        _this.leng2.destroy();
        _this.leng3.destroy();
        _this.triangle.destroy();
    },

    destroyA: function () {
        //destroy objects and initilase count variiables to 0
        _this.destroyCommon();
        _this.panelcount1 = 0;
        _this.widthboxCount1 = 0;
        _this.selected1 = [];
        _this.sortedArray = [];
        _this.sortedArray1 = [];
        _this.sortedArray2 = [];
        _this.panel1.destroy();
        _this.widthbox1.destroy();
        _this.wood1.destroy();
        _this.len1.destroy();

        _this.panel2.destroy();
        _this.widthbox2.destroy();
        _this.wood2.destroy();
        _this.len2.destroy();

        _this.panel3.destroy();
        _this.widthbox3.destroy();
        _this.wood3.destroy();
        _this.len3.destroy();

        _this.panel4.destroy();
        _this.widthbox4.destroy();
        _this.wood4.destroy();
        _this.len4.destroy();

        _this.tickBtn4.destroy();


    },

    DisplayQuestionB: function () {
        if (_this.count1 == 0) _this.Ask_Question1.play();
        _this.queFlag = 1;

        //display each panel with its width box
        _this.panel11 = _this.add.sprite(20, 80, 'panel1');
        _this.panel11.scale.setTo(1.02, 1);
        _this.widthbox11 = _this.add.sprite(880, 75, 'WidthBox');
        _this.widthbox11.inputEnabled = true;
        _this.widthbox11.input.useHandCursor = true;
        _this.widthbox11.events.onInputDown.add(_this.width11);

        _this.panel22 = _this.add.sprite(20, 160, 'panel1');
        _this.panel22.scale.setTo(1.02, 1);
        _this.widthbox22 = _this.add.sprite(880, 155, 'WidthBox');
        _this.widthbox22.inputEnabled = true;
        _this.widthbox22.input.useHandCursor = true;
        _this.widthbox22.events.onInputDown.add(_this.width22);

        _this.panel33 = _this.add.sprite(20, 240, 'panel1');
        _this.panel33.scale.setTo(1.02, 1);
        _this.widthbox33 = _this.add.sprite(880, 235, 'WidthBox');
        _this.widthbox33.inputEnabled = true;
        _this.widthbox33.input.useHandCursor = true;
        _this.widthbox33.events.onInputDown.add(_this.width33);

        _this.panel44 = _this.add.sprite(20, 320, 'panel1');
        _this.panel44.scale.setTo(1.02, 1);
        _this.widthbox44 = _this.add.sprite(880, 315, 'WidthBox');
        _this.widthbox44.inputEnabled = true;
        _this.widthbox44.input.useHandCursor = true;
        _this.widthbox44.events.onInputDown.add(_this.width44);

        _this.panel55 = _this.add.sprite(20, 400, 'panel1');
        _this.panel55.scale.setTo(1.02, 1);
        _this.widthbox55 = _this.add.sprite(880, 395, 'WidthBox');
        _this.widthbox55.inputEnabled = true;
        _this.widthbox55.input.useHandCursor = true;
        _this.widthbox55.events.onInputDown.add(_this.width55);

        //for random question generated display 4 wood peices in each panel according to question
        _this.wood11 = _this.add.image(30, 100, 'woodPeice');
        _this.wood11.scale.setTo(_this.quest2[_this.count1][0] / 10, 1);
        _this.wood22 = _this.add.image(30, 180, 'woodPeice');
        _this.wood22.scale.setTo(_this.quest2[_this.count1][1] / 10, 1);
        _this.wood33 = _this.add.image(30, 260, 'woodPeice');
        _this.wood33.scale.setTo(_this.quest2[_this.count1][2] / 10, 1);
        _this.wood44 = _this.add.image(30, 340, 'woodPeice');
        _this.wood44.scale.setTo(_this.quest2[_this.count1][3] / 10, 1);
        _this.wood55 = _this.add.image(30, 420, 'woodPeice');
        _this.wood55.scale.setTo(_this.quest2[_this.count1][4] / 10, 1);
        //11.5-1.13   11-1.08  10.5- 1.04  10- 0.98  9.5- 0.94  9- 0.89  8.5- 0.84
        //8- 0.79  7.5- 0.74  7- 0.69  6.5- 0.64  6- 0.59 5.5- 0.54
        //5- 0.49  4.5- 0.44  4- 0.39  3.5- 0.35  3- 0.3  2.5- 0.25  2- 0.2   1.5-0.15

    },

    width11: function () {
        _this.clickSound.play();
        _this.widthbox11.inputEnabled = false;
        _this.widthbox11.frame = 1;  //change to yellow
        _this.scale11 = _this.add.sprite(-105, 115, 'scale');
        _this.scale11.alpha = 0;
        _this.tween11o = _this.add.tween(_this.scale11).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true); //tween to get scale
        _this.tween1o = _this.add.tween(_this.scale11).to({ x: 15, y: 115 }, 2000, Phaser.Easing.Linear.None, true); //tween to get scale
        _this.tween1o.onComplete.add(function () {
            _this.time.events.add(1500, function () {
                _this.scale11.destroy();
                _this.widthbox11.frame = 0;

                _this.len11 = _this.add.text(787, 100, _this.quest2[_this.count1][0] + " cm"); //display the cm
                _this.applyingStyle(_this.len11);
                _this.widthboxCount2++;  //counter to keep track of all width box clicked or no
                _this.enablePanelFrame2();
            });
        });

    },

    width22: function () {
        _this.clickSound.play();
        _this.widthbox22.inputEnabled = false;
        _this.widthbox22.frame = 1;
        _this.scale22 = _this.add.sprite(-105, 195, 'scale');
        _this.scale22.alpha = 0;
        _this.tween22o = _this.add.tween(_this.scale22).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true); //tween to get scale
        _this.tween2o = _this.add.tween(_this.scale22).to({ x: 15, y: 195 }, 2000, Phaser.Easing.Linear.None, true);
        _this.tween2o.onComplete.add(function () {
            _this.time.events.add(1500, function () {
                _this.scale22.destroy();
                _this.widthbox22.frame = 0;

                _this.len22 = _this.add.text(787, 180, _this.quest2[_this.count1][1] + " cm");
                _this.applyingStyle(_this.len22);
                _this.widthboxCount2++;
                _this.enablePanelFrame2();
            });
        });

    },

    width33: function () {
        _this.clickSound.play();
        _this.widthbox33.inputEnabled = false;
        _this.widthbox33.frame = 1;
        _this.scale33 = _this.add.sprite(-105, 275, 'scale');
        _this.scale33.alpha = 0;
        _this.tween33o = _this.add.tween(_this.scale33).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true); //tween to get scale
        _this.tween3o = _this.add.tween(_this.scale33).to({ x: 15, y: 275 }, 2000, Phaser.Easing.Linear.None, true);
        _this.tween3o.onComplete.add(function () {
            _this.time.events.add(1500, function () {
                _this.scale33.destroy();
                _this.widthbox33.frame = 0;

                _this.len33 = _this.add.text(787, 260, _this.quest2[_this.count1][2] + " cm");
                _this.applyingStyle(_this.len33);
                _this.widthboxCount2++;
                _this.enablePanelFrame2();
            });
        });

    },

    width44: function () {
        _this.clickSound.play();
        _this.widthbox44.inputEnabled = false;
        _this.widthbox44.frame = 1;
        _this.scale44 = _this.add.sprite(-105, 355, 'scale');
        _this.scale44.alpha = 0;
        _this.tween44o = _this.add.tween(_this.scale44).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true); //tween to get scale
        _this.tween4o = _this.add.tween(_this.scale44).to({ x: 15, y: 355 }, 2000, Phaser.Easing.Linear.None, true);
        _this.tween4o.onComplete.add(function () {
            _this.time.events.add(1500, function () {
                _this.scale44.destroy();
                _this.widthbox44.frame = 0;

                _this.len44 = _this.add.text(787, 340, _this.quest2[_this.count1][3] + " cm");
                _this.applyingStyle(_this.len44);
                _this.widthboxCount2++;
                _this.enablePanelFrame2();
            });
        });

    },


    width55: function () {
        _this.clickSound.play();
        _this.widthbox55.inputEnabled = false;
        _this.widthbox55.frame = 1;
        _this.scale55 = _this.add.sprite(-105, 435, 'scale');
        _this.scale55.alpha = 0;
        _this.tween55o = _this.add.tween(_this.scale55).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true); //tween to get scale
        _this.tween5o = _this.add.tween(_this.scale55).to({ x: 15, y: 435 }, 2000, Phaser.Easing.Linear.None, true);
        _this.tween5o.onComplete.add(function () {
            _this.time.events.add(1500, function () {
                _this.scale55.destroy();
                _this.widthbox55.frame = 0;

                _this.len55 = _this.add.text(787, 420, _this.quest2[_this.count1][4] + " cm");
                _this.applyingStyle(_this.len55);
                _this.widthboxCount2++;
                _this.enablePanelFrame2();
            });

        });

    },

    enablePanelFrame2: function () {

        if (_this.widthboxCount2 == 5)  //if all 5 lengths r displayed next enable panel selection
        {
            if (_this.count1 == 0) _this.Ask_Question2.play();
            _this.queFlag = 2;
            _this.panel11.inputEnabled = true;
            _this.panel11.input.useHandCursor = true;
            _this.panel11.events.onInputDown.add(_this.panel11Frame);
            _this.panel22.inputEnabled = true;
            _this.panel22.input.useHandCursor = true;
            _this.panel22.events.onInputDown.add(_this.panel22Frame);
            _this.panel33.inputEnabled = true;
            _this.panel33.input.useHandCursor = true;
            _this.panel33.events.onInputDown.add(_this.panel33Frame);
            _this.panel44.inputEnabled = true;
            _this.panel44.input.useHandCursor = true;
            _this.panel44.events.onInputDown.add(_this.panel44Frame);
            _this.panel55.inputEnabled = true;
            _this.panel55.input.useHandCursor = true;
            _this.panel55.events.onInputDown.add(_this.panel55Frame);

            _this.tickBtn3 = _this.add.sprite(855, 470, 'TickBtn');
            _this.tickBtn3.inputEnabled = true;
            _this.tickBtn3.input.useHandCursor = true;
            _this.tickBtn3.events.onInputDown.add(_this.nextscreen);  //add tick button to click after selecting 3 sides

        }

    },

    panel11Frame: function () {
        _this.clickSound.play();
        if (_this.panel11.frame == 0) {
            _this.panelcount2++;  //when 3 panel clicked draw a triangle
            _this.selected2.push(_this.quest2[_this.count1][0]); //push the selected frame question 
            _this.panel11.frame = 1;  //highlight to yellow
        }
        else {
            _this.panelcount2--; //when clicked again remove highlight, panel count and also pop
            _this.selected2.splice(_this.selected2.indexOf(_this.quest2[_this.count1][0]), 1);
            _this.panel11.frame = 0;
        }
    },

    panel22Frame: function () {
        _this.clickSound.play();
        if (_this.panel22.frame == 0) {
            _this.panelcount2++;
            _this.selected2.push(_this.quest2[_this.count1][1]);
            _this.panel22.frame = 1;
        }
        else {
            _this.panelcount2--;
            _this.selected2.splice(_this.selected2.indexOf(_this.quest2[_this.count1][1]), 1);
            _this.panel22.frame = 0;
        }
    },

    panel33Frame: function () {
        _this.clickSound.play();
        if (_this.panel33.frame == 0) {
            _this.selected2.push(_this.quest2[_this.count1][2]);
            _this.panelcount2++;
            _this.panel33.frame = 1;
        }
        else {
            _this.panelcount2--;
            _this.selected2.splice(_this.selected2.indexOf(_this.quest2[_this.count1][2]), 1);
            _this.panel33.frame = 0;
        }

    },

    panel44Frame: function () {
        _this.clickSound.play();
        if (_this.panel44.frame == 0) {
            _this.panelcount2++;
            _this.selected2.push(_this.quest2[_this.count1][3]);
            _this.panel44.frame = 1;
        }
        else {
            _this.panelcount2--;
            _this.selected2.splice(_this.selected2.indexOf(_this.quest2[_this.count1][3]), 1);
            _this.panel44.frame = 0;
        }
    },

    panel55Frame: function () {
        _this.clickSound.play();
        if (_this.panel55.frame == 0) {
            _this.panelcount2++;
            _this.selected2.push(_this.quest2[_this.count1][4]);
            _this.panel55.frame = 1;
        }
        else {
            _this.panelcount2--;
            _this.selected2.splice(_this.selected2.indexOf(_this.quest2[_this.count1][4]), 1);
            _this.panel55.frame = 0;
        }
    },

    nextscreen: function () //make obejcts visibility false
    {
        if (_this.panelcount2 == 3 || _this.wrongAnswer == 2) {
            //if(_this.tickBtn3) _this.tickBtn3.inputEnabled = false;
            if (_this.tickBtn2) _this.tickBtn2.destroy();
            if (_this.tickBtn3) _this.tickBtn3.visible = false;
            _this.queFlag = 0;
            _this.panel11.visible = false;
            _this.widthbox11.visible = false;
            _this.wood11.visible = false;
            _this.len11.visible = false;

            _this.panel22.visible = false;
            _this.widthbox22.visible = false;
            _this.wood22.visible = false;
            _this.len22.visible = false;

            _this.panel33.visible = false;
            _this.widthbox33.visible = false;
            _this.wood33.visible = false;
            _this.len33.visible = false;

            _this.panel44.visible = false;
            _this.widthbox44.visible = false;
            _this.wood44.visible = false;
            _this.len44.visible = false;

            _this.panel55.visible = false;
            _this.widthbox55.visible = false;
            _this.wood55.visible = false;
            _this.len55.visible = false;
            _this.displayabc();  //display textboxes and value of a b c
        }
        else{
            _this.noofAttempts++;
            _this.wrongSound.play();
        }
            

    },

    destroyabcPage: function () {

        if (_this.numGroup) _this.numGroup.destroy();
        _this.box.destroy();
        _this.box2.destroy();
        _this.box3.destroy();
        _this.box4.destroy();
        _this.box5.destroy();
        _this.acm.destroy();
        _this.bcm.destroy();
        _this.ccm.destroy();
        _this.AnswerBox1.destroy();
        _this.AnswerBox2.destroy();
        _this.AnswerBox3.destroy();
        _this.AnswerBox4.destroy();
        _this.AnswerBox5.destroy();
        _this.AnswerBox6.destroy();
        _this.AnswerBox7.destroy();
        _this.AnswerBox8.destroy();
        _this.AnswerBox9.destroy();
        _this.aa.destroy();
        _this.aaa.destroy();
        _this.bb.destroy();
        _this.bbb.destroy();
        _this.cc.destroy();
        _this.ccc.destroy();
        _this.sign1.destroy();
        _this.sign11.destroy();
        _this.sign2.destroy();
        _this.sign22.destroy();
        _this.sign3.destroy();
        _this.sign33.destroy();



        _this.backbutton1.destroy();
        _this.BackToB();  //back to part B question screen
    },


    displayabc: function () {
        if (_this.count1 == 0 && _this.wrongAnswer == 0)
            _this.Ask_Question3.play();
        _this.queFlag = 3;

        console.log("displayABC");
        _this.backbutton1 = _this.add.sprite(895, 90, 'Backbutton');
        _this.backbutton1.scale.setTo(0.9, 0.9);
        _this.backbutton1.inputEnabled = true;
        _this.backbutton1.input.useHandCursor = true;
        _this.backbutton1.events.onInputDown.add(_this.destroyabcPage);  //go to previous screen

        //adding all the panels and textbox on screen
        _this.box = _this.add.sprite(40, 80, 'Textbox1');
        _this.box.scale.setTo(1, 1.1);
        _this.box2 = _this.add.sprite(270, 80, 'panel2');
        _this.box2.scale.setTo(0.65, 0.82);
        _this.box3 = _this.add.sprite(300, 110, 'Textbox2');
        _this.box4 = _this.add.sprite(300, 230, 'Textbox2');
        _this.box5 = _this.add.sprite(300, 340, 'Textbox2');

        //diplaying a b c and their values in left panel
        _this.acm = _this.add.text(90, 120, "a = " + _this.selected2[0]); //display the cm
        _this.applyingStyle(_this.acm);
        _this.bcm = _this.add.text(90, 160, "b = " + _this.selected2[1]); //display the cm
        _this.applyingStyle(_this.bcm);
        _this.ccm = _this.add.text(90, 200, "c = " + _this.selected2[2]); //display the cm
        _this.applyingStyle(_this.ccm);

        //a+b= adding all necessary objects for this
        _this.AnswerBox1 = _this.add.sprite(315, 128, 'Textbox3');
        _this.aa = _this.add.text(330, 132, " a ");
        _this.applyingStyle2(_this.aa);
        _this.AnswerBox2 = _this.add.sprite(415, 128, 'Textbox3');
        _this.bb = _this.add.text(430, 134, " b ");
        _this.applyingStyle2(_this.bb);
        _this.AnswerBox3 = _this.add.sprite(515, 128, 'Textbox3');
        _this.sign1 = _this.add.text(380, 132, " + ");
        _this.applyingStyle(_this.sign1);
        _this.sign11 = _this.add.text(480, 132, " = ");
        _this.applyingStyle(_this.sign11);

        //c+b= adding all necessary objects for this
        _this.AnswerBox4 = _this.add.sprite(315, 248, 'Textbox3');
        _this.cc = _this.add.text(330, 252, " c ");
        _this.applyingStyle2(_this.cc);
        _this.AnswerBox5 = _this.add.sprite(415, 248, 'Textbox3');
        _this.bbb = _this.add.text(430, 254, " b ");
        _this.applyingStyle2(_this.bbb);
        _this.AnswerBox6 = _this.add.sprite(515, 248, 'Textbox3');
        _this.sign2 = _this.add.text(380, 252, " + ");
        _this.applyingStyle(_this.sign2);
        _this.sign22 = _this.add.text(480, 252, " = ");
        _this.applyingStyle(_this.sign22);

        //a+c= adding all necessary objects for this
        _this.AnswerBox7 = _this.add.sprite(315, 358, 'Textbox3');
        _this.aaa = _this.add.text(330, 362, " a ");
        _this.applyingStyle2(_this.aaa);
        _this.AnswerBox8 = _this.add.sprite(415, 358, 'Textbox3');
        _this.ccc = _this.add.text(430, 362, " c ");
        _this.applyingStyle2(_this.ccc);
        _this.AnswerBox9 = _this.add.sprite(515, 358, 'Textbox3');
        _this.sign3 = _this.add.text(380, 362, " + ");
        _this.applyingStyle(_this.sign3);
        _this.sign33 = _this.add.text(480, 362, " = ");
        _this.applyingStyle(_this.sign33);

        _this.AnswerBox1.inputEnabled = true;
        _this.flag1 = 0;
        _this.AnswerBox2.inputEnabled = true;
        _this.flag2 = 0;
        _this.AnswerBox3.inputEnabled = true;
        _this.flag3 = 0;  //flags for each answer boxes
        _this.flag4 = 0;
        _this.flag5 = 0;
        _this.flag6 = 0;
        _this.flag7 = 0;
        _this.flag8 = 0;
        _this.flag9 = 0;

        _this.AnswerBox1.input.useHandCursor = true;
        _this.AnswerBox2.input.useHandCursor = true;
        _this.AnswerBox3.input.useHandCursor = true;
        _this.AnswerBox1.frame = 1;

        _this.addNumberPad();  //add number pad

        _this.AnswerBox1.events.onInputDown.add(function () {

            if (_this.flag2 == 0 && _this.AnswerBox2.name == '')
                _this.bb.visible = true;
            _this.AnswerBox1.frame = 1;
            _this.AnswerBox2.frame = 0;
            _this.AnswerBox3.frame = 0;

            _this.clickSound.play();
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked1, _this); //add wrong click event
            _this.rightbtn.events.onInputDown.removeAll();
            _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked1, _this); //add right click event
            for (let i = 0; i <= 11; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked1, _this);
            }
        });

        _this.AnswerBox2.events.onInputDown.add(function () {
            if (_this.flag1 == 0 && _this.AnswerBox1.name == '')
                _this.aa.visible = true;
            _this.AnswerBox1.frame = 0;
            _this.AnswerBox2.frame = 1;
            _this.AnswerBox3.frame = 0;
            _this.clickSound.play();

            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked2, _this);
            for (let i = 0; i <= 11; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked2, _this);
            }
        });

        _this.AnswerBox3.events.onInputDown.add(function () {
            if (_this.flag2 == 0 && _this.AnswerBox2.name == '')
                _this.bb.visible = true;
            if (_this.flag1 == 0 && _this.AnswerBox1.name == '')
                _this.aa.visible = true;
            _this.AnswerBox1.frame = 0;
            _this.AnswerBox2.frame = 0;
            _this.AnswerBox3.frame = 1;

            _this.clickSound.play();
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked3, _this);

            for (let i = 0; i <= 11; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked3, _this);
            }

        });

        _this.AnswerBox4.events.onInputDown.add(function () {
            if (_this.flag5 == 0 && _this.AnswerBox5.name == '')
                _this.bbb.visible = true;
            _this.AnswerBox4.frame = 1;
            _this.AnswerBox5.frame = 0;
            _this.AnswerBox6.frame = 0;
            _this.clickSound.play();

            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked4, _this);
            for (let i = 0; i <= 11; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked4, _this);
            }
        });

        _this.AnswerBox5.events.onInputDown.add(function () {
            if (_this.flag4 == 0 && _this.AnswerBox4.name == '')
                _this.cc.visible = true;
            _this.AnswerBox4.frame = 0;
            _this.AnswerBox5.frame = 1;
            _this.AnswerBox6.frame = 0;

            _this.clickSound.play();
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked5, _this);
            for (let i = 0; i <= 11; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked5, _this);
            }
        });

        _this.AnswerBox6.events.onInputDown.add(function () {
            if (_this.flag5 == 0 && _this.AnswerBox5.name == '')
                _this.bbb.visible = true;
            if (_this.flag4 == 0 && _this.AnswerBox4.name == '')
                _this.cc.visible = true;
            _this.AnswerBox4.frame = 0;
            _this.AnswerBox5.frame = 0;
            _this.AnswerBox6.frame = 1;

            _this.clickSound.play();
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked6, _this);
            for (let i = 0; i <= 11; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked6, _this);
            }
        });

        _this.AnswerBox7.events.onInputDown.add(function () {
            if (_this.flag8 == 0 && _this.AnswerBox8.name == '')
                _this.ccc.visible = true;
            _this.AnswerBox7.frame = 1;
            _this.AnswerBox8.frame = 0;
            _this.AnswerBox9.frame = 0;
            _this.clickSound.play();

            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked7, _this);
            for (let i = 0; i <= 11; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked7, _this);
            }
        });

        _this.AnswerBox8.events.onInputDown.add(function () {
            if (_this.flag7 == 0 && _this.AnswerBox7.name == '')
                _this.aaa.visible = true;
            _this.AnswerBox7.frame = 0;
            _this.AnswerBox8.frame = 1;
            _this.AnswerBox9.frame = 0;

            _this.clickSound.play();
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked8, _this);
            for (let i = 0; i <= 11; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked8, _this);
            }
        });

        _this.AnswerBox9.events.onInputDown.add(function () {

            if (_this.flag8 == 0 && _this.AnswerBox8.name == '')
                _this.ccc.visible = true;
            if (_this.flag7 == 0 && _this.AnswerBox7.name == '')
                _this.aaa.visible = true;
            _this.AnswerBox7.frame = 0;
            _this.AnswerBox8.frame = 0;
            _this.AnswerBox9.frame = 1;

            _this.clickSound.play();
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked9, _this);
            for (let i = 0; i <= 11; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked9, _this);
            }
        });

    },

    addNumberPad: function () {
        console.log("numPad");
        _this.objGroup = _this.add.group();
        _this.numGroup = _this.add.group();

        _this.selectedAns11 = '';
        _this.selectedAns21 = '';
        _this.selectedAns31 = '';

        _this.selectedAns12 = '';
        _this.selectedAns22 = '';
        _this.selectedAns32 = '';

        _this.selectedAns13 = '';
        _this.selectedAns23 = '';
        _this.selectedAns33 = '';

        _this.selectedAns14 = '';
        _this.selectedAns24 = '';
        _this.selectedAns34 = '';

        _this.selectedAns15 = '';
        _this.selectedAns25 = '';
        _this.selectedAns35 = '';

        _this.selectedAns16 = '';
        _this.selectedAns26 = '';
        _this.selectedAns36 = '';

        _this.selectedAns17 = '';
        _this.selectedAns27 = '';
        _this.selectedAns37 = '';

        _this.selectedAns18 = '';
        _this.selectedAns28 = '';
        _this.selectedAns38 = '';

        _this.selectedAns19 = '';
        _this.selectedAns29 = '';
        _this.selectedAns39 = '';

        //for decimal point
        _this.dotselected1 = false;
        _this.dotselected2 = false;
        _this.dotselected3 = false;
        _this.dotselected4 = false;
        _this.dotselected5 = false;
        _this.dotselected6 = false;
        _this.dotselected7 = false;
        _this.dotselected8 = false;
        _this.dotselected9 = false;

        //for validating 4 digit
        _this.fourNotEntered1 = false;
        _this.fourNotEntered2 = false;
        _this.fourNotEntered3 = false;
        _this.fourNotEntered4 = false;
        _this.fourNotEntered5 = false;
        _this.fourNotEntered6 = false;
        _this.fourNotEntered7 = false;
        _this.fourNotEntered8 = false;
        _this.fourNotEntered9 = false;

        //to store final value
        _this.finalval1 = '';
        _this.finalval2 = '';
        _this.finalval3 = '';
        _this.finalval4 = '';
        _this.finalval5 = '';
        _this.finalval6 = '';
        _this.finalval7 = '';
        _this.finalval8 = '';
        _this.finalval9 = '';

        var bottomnumpadbg = _this.numGroup.create(0, 515, 'numpadbg');
        bottomnumpadbg.scale.setTo(1, 1);

        _this.x = 54;
        // set the number pad invisible initially. only after tweening it is made visible
        _this.numGroup.visible = false;
        for (var i = 0; i <= 10; i++) {
            _this.numbg = _this.numGroup.create(_this.x, 552, 'Numberpad');
            _this.numbg.anchor.setTo(0.5);
            _this.numbg.name = i + 1;
            _this.numbg.frame = i;
            _this.numbg.inputEnabled = true;
            _this.numbg.input.useHandCursor = true;
            if (_this.flag1 == 1 && _this.flag2 == 1 && _this.flag3 == 1 && _this.flag5 == 0)
                _this.numbg.events.onInputDown.add(_this.numClicked4, _this);
            else if (_this.flag4 == 1 && _this.flag5 == 1 && _this.flag6 == 1 && _this.flag9 == 0)
                _this.numbg.events.onInputDown.add(_this.numClicked7, _this);
            else
                _this.numbg.events.onInputDown.add(_this.numClicked1, _this);

            _this.x += 70;
        }

        _this.wrongbtn = _this.numGroup.create(845, 552, 'Numberpad');
        _this.wrongbtn.frame = 11;
        _this.wrongbtn.anchor.setTo(0.5);
        _this.wrongbtn.name = "wrongbtn";
        _this.wrongbtn.inputEnabled = true;
        _this.wrongbtn.input.useHandCursor = true;
        if (_this.flag1 == 1 && _this.flag4 == 1)
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked7, _this);
        else if (_this.flag1 == 1 && _this.flag4 == 0)
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked4, _this);
        else
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked1, _this);

        _this.rightbtn = _this.numGroup.create(915, 552, 'Numberpad');
        _this.rightbtn.frame = 12;
        _this.rightbtn.anchor.setTo(0.5);
        _this.rightbtn.name = "rightbtn";
        _this.rightbtn.inputEnabled = true;
        _this.rightbtn.input.useHandCursor = true;
        if (_this.flag1 == 1 && _this.flag2 == 1 && _this.flag3 == 1 && _this.flag5 == 0)
            _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked2, _this);
        else if (_this.flag4 == 1 && _this.flag5 == 1 && _this.flag6 == 1 && _this.flag9 == 0)
            _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked3, _this);
        else
            _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked1, _this);

        _this.enterTxt1 = '';
        _this.enterTxt2 = '';
        _this.enterTxt3 = '';
        _this.enterTxt4 = '';
        _this.enterTxt5 = '';
        _this.enterTxt6 = '';
        _this.enterTxt7 = '';
        _this.enterTxt8 = '';
        _this.enterTxt9 = '';
        _this.numpadTween = _this.add.tween(_this.numGroup);
        _this.tweenNumPad();

    },

    rightbtnClicked1: function () {
        if (_this.AnswerBox1.name == _this.selected2[0])  //if correct value of a is given
        {
            _this.AnswerBox1.inputEnabled = false;
            for (let i = 0; i <= 11; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked2, _this);
            }
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked2, _this);
            _this.AnswerBox1.frame = 0;
            _this.flag1 = 1;
            _this.aaLett = _this.add.text(_this.AnswerBox1.x + _this.enterTxt1.x, _this.AnswerBox1.y + _this.enterTxt1.y, _this.AnswerBox1.name);
            _this.applyingStyle(_this.aaLett);
            _this.aaLett.visible = false;  //to dispay value when answer box is detroyed
            _this.disablecommon1(); //to reset values of variables for next question clearance 

        }
        else {
            _this.disableInputs1(); //clear
            _this.aa.visible = true;
        }

        if (_this.AnswerBox2.name == _this.selected2[1]) {
            _this.AnswerBox2.inputEnabled = false;
            _this.AnswerBox2.frame = 0;
            for (let i = 0; i <= 11; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked3, _this);
            }
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked3, _this);
            _this.flag2 = 1;
            _this.bbLett = _this.add.text(_this.AnswerBox2.x + _this.enterTxt2.x, _this.AnswerBox2.y + _this.enterTxt2.y, _this.AnswerBox2.name);
            _this.applyingStyle(_this.bbLett);
            _this.bbLett.visible = false;
            _this.disablecommon2();
        }
        else {
            _this.disableInputs2();
            _this.bb.visible = true;
        }

        if (_this.AnswerBox3.name == _this.selected2[0] + _this.selected2[1]) {
            _this.AnswerBox3.frame = 0;
            _this.AnswerBox3.inputEnabled = false;
            _this.flag3 = 1;
            _this.absum = _this.add.text(_this.AnswerBox3.x + _this.enterTxt3.x, _this.AnswerBox3.y + _this.enterTxt3.y, _this.AnswerBox3.name);
            _this.applyingStyle(_this.absum);
            _this.absum.visible = false;
            _this.disablecommon3();
        }
        else
            _this.disableInputs3();

        if (_this.flag1 == 1 && _this.flag2 == 1 && _this.flag3 == 1)  //if all 3 are correct
        {
            _this.noofAttempts++;
            _this.counterCelebrationSound.play();
            _this.numGroup.destroy();
            _this.time.events.add(1000, function () {
                _this.addNumberPad();
                _this.AnswerBox4.inputEnabled = true;
                _this.AnswerBox4.input.useHandCursor = true;
                _this.AnswerBox5.inputEnabled = true;
                _this.AnswerBox5.input.useHandCursor = true;
                _this.AnswerBox6.inputEnabled = true;
                _this.AnswerBox6.input.useHandCursor = true;
                _this.AnswerBox4.frame = 1;

            });
        }
        else {
            if (_this.flag1 == 1 && _this.flag2 == 0) {
                _this.AnswerBox2.frame = 1;
                _this.AnswerBox1.frame = 0;
                _this.AnswerBox3.frame = 0;
                for (let i = 0; i <= 11; i++) {
                    _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                    _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked2, _this);
                }
                _this.wrongbtn.events.onInputDown.removeAll();
                _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked2, _this);
            }
            if (_this.flag1 == 1 && _this.flag2 == 1 && _this.flag3 == 0) {
                _this.AnswerBox3.frame = 1;
                _this.AnswerBox2.frame = 0;
                _this.AnswerBox1.frame = 0;
                for (let i = 0; i <= 11; i++) {
                    _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                    _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked3, _this);
                }
                _this.wrongbtn.events.onInputDown.removeAll();
                _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked3, _this);
            }
            if (_this.flag1 == 0 && _this.flag2 == 1 && _this.flag3 == 1 || _this.flag1 == 0 && _this.flag2 == 0 && _this.flag3 == 0 || _this.flag1 == 0 && _this.flag2 == 0 && _this.flag3 == 1 || _this.flag1 == 0 && _this.flag2 == 1 && _this.flag3 == 0) {
                _this.AnswerBox1.frame = 1;
                _this.AnswerBox2.frame = 0;
                _this.AnswerBox3.frame = 0;
                for (let i = 0; i <= 11; i++) {
                    _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                    _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked1, _this);
                }
                _this.wrongbtn.events.onInputDown.removeAll();
                _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked1, _this);
            }
            _this.noofAttempts++;
            _this.wrongSound.play();
        }
    },

    rightbtnClicked2: function () {
        if (_this.AnswerBox4.name == _this.selected2[2])  //if correct value of box4 is given
        {
            _this.AnswerBox4.inputEnabled = false;
            for (let i = 0; i <= 11; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked5, _this);
            }
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked5, _this);
            _this.AnswerBox4.frame = 0;
            _this.flag4 = 1;
            _this.ccLett = _this.add.text(_this.AnswerBox4.x + _this.enterTxt4.x, _this.AnswerBox4.y + _this.enterTxt4.y, _this.AnswerBox4.name);
            _this.applyingStyle(_this.ccLett);
            _this.ccLett.visible = false;
            _this.disablecommon4(); //to reset values of variables for next question clearance

        }
        else {
            _this.disableInputs4(); //clear
            _this.cc.visible = true;
        }

        if (_this.AnswerBox5.name == _this.selected2[1]) {
            _this.AnswerBox5.inputEnabled = false;
            _this.AnswerBox5.frame = 0;
            for (let i = 0; i <= 11; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked6, _this);
            }
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked6, _this);
            _this.flag5 = 1;
            _this.bbbLett = _this.add.text(_this.AnswerBox5.x + _this.enterTxt5.x, _this.AnswerBox5.y + _this.enterTxt5.y, _this.AnswerBox5.name);
            _this.applyingStyle(_this.bbbLett);
            _this.bbbLett.visible = false;
            _this.disablecommon5();
        }
        else {
            _this.disableInputs5();
            _this.bbb.visible = true;
        }

        if (_this.AnswerBox6.name == _this.selected2[2] + _this.selected2[1]) {
            _this.AnswerBox6.frame = 0;
            _this.AnswerBox6.inputEnabled = false;
            _this.flag6 = 1;
            _this.cbsum = _this.add.text(_this.AnswerBox6.x + _this.enterTxt6.x, _this.AnswerBox6.y + _this.enterTxt6.y, _this.AnswerBox6.name);
            _this.applyingStyle(_this.cbsum);
            _this.cbsum.visible = false;
            _this.disablecommon6();
        }
        else
            _this.disableInputs6();

        if (_this.flag4 == 1 && _this.flag5 == 1 && _this.flag6 == 1)  // if all 3 are correct
        {
            _this.noofAttempts++;
            _this.counterCelebrationSound.play();
            _this.numGroup.destroy();
            _this.time.events.add(1000, function () {
                _this.addNumberPad();
                _this.AnswerBox7.inputEnabled = true;
                _this.AnswerBox7.input.useHandCursor = true;
                _this.AnswerBox8.inputEnabled = true;
                _this.AnswerBox8.input.useHandCursor = true;
                _this.AnswerBox9.inputEnabled = true;
                _this.AnswerBox9.input.useHandCursor = true;
                _this.AnswerBox7.frame = 1;

            });
        }
        else {
            _this.noofAttempts++;
            _this.wrongSound.play();
            if (_this.flag4 == 1 && _this.flag5 == 0) {
                _this.AnswerBox5.frame = 1;
                _this.AnswerBox6.frame = 0;
                _this.AnswerBox4.frame = 0;
                for (let i = 0; i <= 11; i++) {
                    _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                    _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked5, _this);
                }
                _this.wrongbtn.events.onInputDown.removeAll();
                _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked5, _this);
            }
            if (_this.flag4 == 1 && _this.flag5 == 1 && _this.flag6 == 0) {
                for (let i = 0; i <= 11; i++) {
                    _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                    _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked6, _this);
                }
                _this.wrongbtn.events.onInputDown.removeAll();
                _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked6, _this);
                _this.AnswerBox6.frame = 1;
                _this.AnswerBox5.frame = 0;
                _this.AnswerBox4.frame = 0;
            }
            if (_this.flag4 == 0 && _this.flag5 == 1 && _this.flag6 == 1 || _this.flag4 == 0 && _this.flag5 == 0 && _this.flag6 == 0 || _this.flag4 == 0 && _this.flag5 == 0 && _this.flag6 == 1 || _this.flag4 == 0 && _this.flag5 == 1 && _this.flag6 == 0) {
                for (let i = 0; i <= 11; i++) {
                    _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                    _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked4, _this);
                }
                _this.wrongbtn.events.onInputDown.removeAll();
                _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked4, _this);
                _this.AnswerBox4.frame = 1;
                _this.AnswerBox6.frame = 0;
                _this.AnswerBox5.frame = 0;
            }
        }
    },
    rightbtnClicked3: function () {
        if (_this.AnswerBox7.name == _this.selected2[0])  //if correct value of a is given
        {
            _this.AnswerBox7.inputEnabled = false;
            _this.AnswerBox7.frame = 0;
            for (let i = 0; i <= 11; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked8, _this);
            }
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked8, _this);
            _this.flag7 = 1;
            _this.aaaLett = _this.add.text(_this.AnswerBox7.x + _this.enterTxt7.x, _this.AnswerBox7.y + _this.enterTxt7.y, _this.AnswerBox7.name);
            _this.applyingStyle(_this.aaaLett);
            _this.aaaLett.visible = false;
            _this.disablecommon7(); //to reset values of variables for next question clearance

        }
        else {
            _this.disableInputs7(); //clear
            _this.aaa.visible = true;

        }

        if (_this.AnswerBox8.name == _this.selected2[2]) {
            _this.AnswerBox8.inputEnabled = false;
            _this.AnswerBox8.frame = 0;
            for (let i = 0; i <= 11; i++) {
                _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked9, _this);
            }
            _this.wrongbtn.events.onInputDown.removeAll();
            _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked9, _this);
            _this.flag8 = 1;
            _this.cccLett = _this.add.text(_this.AnswerBox8.x + _this.enterTxt8.x, _this.AnswerBox8.y + _this.enterTxt8.y, _this.AnswerBox8.name);
            _this.applyingStyle(_this.cccLett);
            _this.cccLett.visible = false;
            _this.disablecommon8();
        }
        else {
            _this.disableInputs8();
            _this.ccc.visible = true;
        }

        if (_this.AnswerBox9.name == _this.selected2[0] + _this.selected2[2]) {
            _this.AnswerBox9.frame = 0;
            _this.AnswerBox9.inputEnabled = false;
            _this.flag9 = 1;
            _this.acsum = _this.add.text(_this.AnswerBox9.x + _this.enterTxt9.x, _this.AnswerBox9.y + _this.enterTxt9.y, _this.AnswerBox9.name);
            _this.applyingStyle(_this.acsum);
            _this.acsum.visible = false;
            _this.disablecommon9();
        }
        else
            _this.disableInputs9();

        if (_this.flag7 == 1 && _this.flag8 == 1 && _this.flag9 == 1)  //if all 3 are correct
        {
            _this.noofAttempts++;
            _this.counterCelebrationSound.play();
            _this.numGroup.destroy();
            _this.backbutton1.inputEnabled = false;
            _this.time.events.add(1000, function () {
                _this.displaySymbols();

            });
        }
        else {
            _this.noofAttempts++;
            _this.wrongSound.play();
            if (_this.flag7 == 1 && _this.flag8 == 0) {
                _this.AnswerBox8.frame = 1;
                _this.AnswerBox9.frame = 0;
                _this.AnswerBox7.frame = 0;
                for (let i = 0; i <= 11; i++) {
                    _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                    _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked8, _this);
                }
                _this.wrongbtn.events.onInputDown.removeAll();
                _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked8, _this);
            }
            if (_this.flag7 == 1 && _this.flag8 == 1 && _this.flag9 == 0) {
                _this.AnswerBox9.frame = 1;
                _this.AnswerBox8.frame = 0;
                _this.AnswerBox7.frame = 0;
                for (let i = 0; i <= 11; i++) {
                    _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                    _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked9, _this);
                }
                _this.wrongbtn.events.onInputDown.removeAll();
                _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked9, _this);
            }
            if (_this.flag7 == 0 && _this.flag8 == 1 && _this.flag9 == 1 || _this.flag7 == 0 && _this.flag8 == 0 && _this.flag9 == 0 || _this.flag7 == 0 && _this.flag8 == 0 && _this.flag9 == 1 || _this.flag7 == 0 && _this.flag8 == 1 && _this.flag9 == 0) {
                for (let i = 0; i <= 11; i++) {
                    _this.numGroup.getChildAt(i).events.onInputDown.removeAll();
                    _this.numGroup.getChildAt(i).events.onInputDown.add(_this.numClicked7, _this);
                }
                _this.wrongbtn.events.onInputDown.removeAll();
                _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked7, _this);
                _this.AnswerBox7.frame = 1;
                _this.AnswerBox8.frame = 0;
                _this.AnswerBox9.frame = 0;
            }
        }
    },


    destroyAnswerBox: function () {
        _this.backbutton1.destroy();
        _this.aaLett.visible = true;
        _this.aaaLett.visible = true;
        _this.bbLett.visible = true;
        _this.bbbLett.visible = true;
        _this.ccLett.visible = true;
        _this.cccLett.visible = true;
        _this.absum.visible = true;
        _this.cbsum.visible = true;
        _this.acsum.visible = true;
        _this.AnswerBox1.destroy();
        _this.AnswerBox2.destroy();
        _this.AnswerBox3.destroy();
        _this.AnswerBox4.destroy();
        _this.AnswerBox5.destroy();
        _this.AnswerBox6.destroy();
        _this.AnswerBox7.destroy();
        _this.AnswerBox8.destroy();
        _this.AnswerBox9.destroy();

    },

    displaySymbols: function () {
        if (_this.count1 == 0 && _this.wrongAnswer == 0)
            _this.Ask_Question4.play();
        _this.queFlag = 4;
        _this.destroyAnswerBox();
        _this.symPanel = _this.add.image(870, 80, 'panel5');
        _this.Txtbox1 = _this.add.image(600, 125, 'Textbox4');
        _this.letter1 = _this.add.text(650, 132, 'c');
        _this.applyingStyle(_this.letter1);
        _this.Txtbox2 = _this.add.image(600, 245, 'Textbox4');
        _this.letter2 = _this.add.text(650, 252, 'a');
        _this.applyingStyle(_this.letter2);
        _this.Txtbox3 = _this.add.image(600, 355, 'Textbox4');
        _this.letter3 = _this.add.text(650, 362, 'b');
        _this.applyingStyle(_this.letter3);
        _this.sym1 = _this.add.sprite(875, 90, 'symbol1');
        _this.sym2 = _this.add.sprite(875, 160, 'symbol2');
        _this.sym3 = _this.add.sprite(875, 220, 'symbol3');
        _this.tickBtn1 = _this.add.sprite(870, 380, 'TickBtn');
        _this.tickBtn1.inputEnabled = true;
        _this.tickBtn1.input.useHandCursor = true;
        _this.tickBtn1.events.onInputDown.add(_this.validateSymbols);

        _this.sym1.inputEnabled = true;
        _this.sym1.input.useHandCursor = true;
        _this.sym1.input.enableDrag(true);

        _this.sym2.inputEnabled = true;
        _this.sym2.input.useHandCursor = true;
        _this.sym2.input.enableDrag(true);

        _this.sym3.inputEnabled = true;
        _this.sym3.input.useHandCursor = true;
        _this.sym3.input.enableDrag(true);


        _this.sym1.events.onDragUpdate.add(_this.bringSymTop1);
        _this.sym2.events.onDragUpdate.add(_this.bringSymTop2);
        _this.sym3.events.onDragUpdate.add(_this.bringSymTop3);

        _this.sym1.events.onDragStop.add(_this.lessThan);
        _this.sym2.events.onDragStop.add(_this.GreaterThan);
        _this.sym3.events.onDragStop.add(_this.equalTo);
    },

    bringSymTop1: function () {
        _this.sym1.bringToTop();

    },

    bringSymTop2: function () {
        _this.sym2.bringToTop();

    },

    bringSymTop3: function () {
        _this.sym3.bringToTop();

    },

    lessThan: function (target) {    //when one symbol is placed if there is already a symbol existing then make it null
        if (target.x > 540 && target.x < 680 && target.y > 90 && target.y < 220)  //for first box
        {

            if (_this.sym12) { _this.sym12.visible = false; _this.sym12 = null; }
            if (_this.sym11) { _this.sym11.visible = false; _this.sym11 = null; }
            if (_this.sym13) { _this.sym13.visible = false; _this.sym13 = null; }

            _this.sym11 = _this.add.sprite(599, 123, 'symbol1');
            _this.sym11.scale.setTo(0.81, 0.8);

        }
        else if (target.x > 540 && target.x < 680 && target.y > 230 && target.y < 320)  //for second box
        {

            if (_this.sym22) { _this.sym22.visible = false; _this.sym22 = null; }
            if (_this.sym23) { _this.sym23.visible = false; _this.sym23 = null; }
            if (_this.sym21) { _this.sym21.visible = false; _this.sym21 = null; }

            _this.sym21 = _this.add.sprite(599, 243, 'symbol1');
            _this.sym21.scale.setTo(0.81, 0.8);

        }
        else if (target.x > 540 && target.x < 680 && target.y > 330 && target.y < 430)  //for third box
        {

            if (_this.sym33) { _this.sym33.visible = false; _this.sym33 = null; }
            if (_this.sym32) { _this.sym32.visible = false; _this.sym32 = null; }
            if (_this.sym31) { _this.sym31.visible = false; _this.sym31 = null; }

            _this.sym31 = _this.add.sprite(599, 353, 'symbol1');
            _this.sym31.scale.setTo(0.81, 0.8);

        }
        _this.sym1.x = 875;
        _this.sym1.y = 90;

    },

    GreaterThan: function (target) {    //when one symbol is placed if there is already a symbol existing then make it null
        if (target.x > 540 && target.x < 680 && target.y > 90 && target.y < 220) {

            if (_this.sym12) { _this.sym12.visible = false; _this.sym12 = null; }
            if (_this.sym11) { _this.sym11.visible = false; _this.sym11 = null; }
            if (_this.sym13) { _this.sym13.visible = false; _this.sym13 = null; }

            _this.sym12 = _this.add.sprite(599, 123, 'symbol2');
            _this.sym12.scale.setTo(0.81, 0.8);


        }
        else if (target.x > 540 && target.x < 680 && target.y > 230 && target.y < 320) {

            if (_this.sym22) { _this.sym22.visible = false; _this.sym22 = null; }
            if (_this.sym23) { _this.sym23.visible = false; _this.sym23 = null; }
            if (_this.sym21) { _this.sym21.visible = false; _this.sym21 = null; }

            _this.sym22 = _this.add.sprite(599, 243, 'symbol2');
            _this.sym22.scale.setTo(0.81, 0.8);

        }
        else if (target.x > 540 && target.x < 680 && target.y > 330 && target.y < 430) {

            if (_this.sym33) { _this.sym33.visible = false; _this.sym33 = null; }
            if (_this.sym32) { _this.sym32.visible = false; _this.sym32 = null; }
            if (_this.sym31) { _this.sym31.visible = false; _this.sym31 = null; }

            _this.sym32 = _this.add.sprite(599, 353, 'symbol2');
            _this.sym32.scale.setTo(0.81, 0.8);

        }
        _this.sym2.x = 875;
        _this.sym2.y = 160;
    },

    equalTo: function (target) {
        //when one symbol is placed if there is already a symbol existing then make it null
        if (target.x > 540 && target.x < 680 && target.y > 90 && target.y < 220) {

            if (_this.sym12) { _this.sym12.visible = false; _this.sym12 = null; }
            if (_this.sym11) { _this.sym11.visible = false; _this.sym11 = null; }
            if (_this.sym13) { _this.sym13.visible = false; _this.sym13 = null; }

            _this.sym13 = _this.add.sprite(599, 123, 'symbol3');
            _this.sym13.scale.setTo(0.81, 0.8);

        }
        else if (target.x > 540 && target.x < 680 && target.y > 230 && target.y < 320) {

            if (_this.sym22) { _this.sym22.visible = false; _this.sym22 = null; }
            if (_this.sym23) { _this.sym23.visible = false; _this.sym23 = null; }
            if (_this.sym21) { _this.sym21.visible = false; _this.sym21 = null; }

            _this.sym23 = _this.add.sprite(599, 243, 'symbol3');
            _this.sym23.scale.setTo(0.81, 0.8);

        }
        else if (target.x > 540 && target.x < 680 && target.y > 330 && target.y < 430) {

            if (_this.sym33) { _this.sym33.visible = false; _this.sym33 = null; }
            if (_this.sym32) { _this.sym32.visible = false; _this.sym32 = null; }
            if (_this.sym31) { _this.sym31.visible = false; _this.sym31 = null; }

            _this.sym33 = _this.add.sprite(599, 353, 'symbol3');
            _this.sym33.scale.setTo(0.81, 0.8);

        }
        _this.sym3.x = 875;
        _this.sym3.y = 220;
    },

    validateSymbols: function () {   //if all symbols are placed according to the values of sum and its comparison value
        if ((_this.selected2[0] + _this.selected2[1] > _this.selected2[2] && _this.sym12) || (_this.selected2[0] + _this.selected2[1] < _this.selected2[2] && _this.sym11) || (_this.selected2[0] + _this.selected2[1] == _this.selected2[2] && _this.sym13))
            _this.correct1 = 1;
        else {
            if (_this.sym12) { _this.sym12.visible = false; _this.sym12 = null; }
            if (_this.sym11) { _this.sym11.visible = false; _this.sym11 = null; }
            if (_this.sym13) { _this.sym13.visible = false; _this.sym13 = null; }

        }

        if ((_this.selected2[2] + _this.selected2[1] > _this.selected2[0] && _this.sym22) || (_this.selected2[2] + _this.selected2[1] < _this.selected2[0] && _this.sym21) || (_this.selected2[2] + _this.selected2[1] == _this.selected2[0] && _this.sym23))
            _this.correct2 = 1;
        else {

            if (_this.sym22) { _this.sym22.visible = false; _this.sym22 = null; }
            if (_this.sym23) { _this.sym23.visible = false; _this.sym23 = null; }
            if (_this.sym21) { _this.sym21.visible = false; _this.sym21 = null; }
        }

        if ((_this.selected2[0] + _this.selected2[2] > _this.selected2[1] && _this.sym32) || (_this.selected2[0] + _this.selected2[2] < _this.selected2[1] && _this.sym31) || (_this.selected2[0] + _this.selected2[2] == _this.selected2[1] && _this.sym33))
            _this.correct3 = 1;
        else {

            if (_this.sym33) { _this.sym33.visible = false; _this.sym33 = null; }
            if (_this.sym32) { _this.sym32.visible = false; _this.sym32 = null; }
            if (_this.sym31) { _this.sym31.visible = false; _this.sym31 = null; }
        }

        if (_this.correct1 == 1 && _this.correct2 == 1 && _this.correct3 == 1) {
            _this.tickBtn1.inputEnabled = false;
            _this.noofAttempts++;
            _this.counterCelebrationSound.play();  //correct and go for thums up down
            _this.time.events.add(500, function () {
                _this.nextStage();
            });
        }
        else {
            _this.correct3 = 0;
            _this.correct2 = 0;
            _this.correct1 = 0;
            _this.noofAttempts++;
            _this.wrongSound.play();
        }

    },

    nextStage: function () {

        if (_this.count1 == 0 && _this.wrongAnswer == 0)
            _this.Ask_Question5.play();
        _this.queFlag = 5;


        _this.tickBtn1.destroy();
        _this.sym1.destroy();
        _this.sym2.destroy();
        _this.sym3.destroy();
        _this.symPanel.destroy();
        _this.time.events.add(500, function () {
            _this.thumUp = _this.add.sprite(855, 80, 'thumsUp');
            _this.thumDown = _this.add.sprite(855, 170, 'thumsDown');

            _this.thumUp.inputEnabled = true;
            _this.thumUp.input.useHandCursor = true;
            _this.thumUp.events.onInputDown.add(_this.thumupHigh);

            _this.thumDown.inputEnabled = true;
            _this.thumDown.input.useHandCursor = true;
            _this.thumDown.events.onInputDown.add(_this.thumDownHigh);
        });

    },

    thumupHigh: function ()  //if thumpUp clicked disable thump down
    {
        _this.thumUp.frame = 1;
        if (_this.thumDown.frame == 1)
            _this.thumDown.frame = 0;
        _this.thumDown.inputEnabled = false;
        _this.thumUp.inputEnabled = false;
        _this.validateThump();
    },

    thumDownHigh: function () {
        _this.thumDown.frame = 1;
        if (_this.thumUp.frame == 1)
            _this.thumUp.frame = 0;
        _this.thumUp.inputEnabled = false;
        _this.thumDown.inputEnabled = false;
        _this.validateThump();
    },

    validateThump: function ()  //validation of thumsup/thumsdown
    {
        if (_this.thumUp.frame == 1) // thumps up is clicked check if all 3 symbols are greater than
        {
            if (_this.sym12 && _this.sym22 && _this.sym32) // if yes then correct and draw triangle
            {
                _this.noofAttempts++;
                _this.counterCelebrationSound.play();
                _this.time.events.add(1000, function () {
                    _this.destroySymbols();
                    _this.drawTriangle();
                });

            }
            else  //else wrong give again chance
            {   _this.noofAttempts++;
                _this.wrongSound.play();
                _this.thumDown.inputEnabled = true;
                _this.thumUp.inputEnabled = true;
            }
        }
        else {
            if (_this.sym12 && _this.sym22 && _this.sym32) {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.thumDown.inputEnabled = true;
                _this.thumUp.inputEnabled = true;
            }
            else {
                _this.time.events.add(1000, function () {
                    _this.destroySymbols();
                    _this.wrongAnswer++;

                    _this.BackToB();  //wrong go to previous screen 
                });
            }
        }
    },

    BackToB: function () {
        _this.queFlag = 2;

        if (_this.tickBtn3) {
            console.log("hi");
            _this.tickBtn3.visible = true;
        }
        _this.panel11.visible = true;
        _this.widthbox11.visible = true;
        _this.wood11.visible = true;
        _this.len11.visible = true;

        _this.panel22.visible = true;
        _this.widthbox22.visible = true;
        _this.wood22.visible = true;
        _this.len22.visible = true;

        _this.panel33.visible = true;
        _this.widthbox33.visible = true;
        _this.wood33.visible = true;
        _this.len33.visible = true;

        _this.panel44.visible = true;
        _this.widthbox44.visible = true;
        _this.wood44.visible = true;
        _this.len44.visible = true;

        _this.panel55.visible = true;
        _this.widthbox55.visible = true;
        _this.wood55.visible = true;
        _this.len55.visible = true;
        _this.ansCount = 0;
        // if(_this.tickBtn3)
        // {
        //     console.log("hi1");
        //      _this.tickBtn3.inputEnabled = true;
        //      _this.tickBtn3.input.useHandCursor = true;
        // }

        //_this.backbutton1.inputEnabled = true;

        if (_this.wrongAnswer == 2)  //if already 2 times wrong is entered then give hint
        {
            _this.time.events.add(1000, function () {
                _this.panel11.inputEnabled = false;
                _this.panel22.inputEnabled = false;
                _this.panel33.inputEnabled = false;
                _this.panel44.inputEnabled = false;
                _this.panel55.inputEnabled = false;

                _this.panel11.frame = 0;
                _this.panel22.frame = 0;
                _this.panel33.frame = 0;
                _this.panel44.frame = 0;
                _this.panel55.frame = 0;

                _this.tickBtn3.destroy();


                _this.time.events.add(500, function () {

                    _this.highLightCorrectFrame();
                });
            });
        }
    },

    highLightCorrectFrame: function () {
        _this.queFlag = 0;
        _this.selected2 = [];

        for (_this.i = 0; _this.i < 3; _this.i++) {
            if (_this.quest2[_this.count1][0] == _this.ans2[_this.count1][0][_this.i])  //to check if first panel cm is in answer array then highlight
            {
                _this.selected2.push(_this.quest2[_this.count1][0]);
                _this.p1 = _this.panel11.animations.add('p1');
                _this.p1.play(2);   //play animation of higlight
                _this.p1.onComplete.add(function () {
                    _this.p1.play(2);
                    _this.p1.onComplete.add(function () {
                        _this.p1.play(2);
                        _this.p1.onComplete.add(function () {
                            _this.panel11.frame = 1;
                        });
                    });
                });

                break;
            }
        }
        for (_this.q = 0; _this.q < 3; _this.q++)  //for panel 2
        {
            if (_this.quest2[_this.count1][1] == _this.ans2[_this.count1][0][_this.q]) {
                _this.selected2.push(_this.quest2[_this.count1][1]);
                console.log("panel2")
                _this.p2 = _this.panel22.animations.add('p2');
                _this.p2.play(2);
                _this.p2.onComplete.add(function () {
                    _this.p2.play(2);
                    _this.p2.onComplete.add(function () {
                        _this.p2.play(2);
                        _this.p2.onComplete.add(function () {
                            _this.panel22.frame = 1;
                        });
                    });
                });

                break;
            }
        }
        for (_this.p = 0; _this.p < 3; _this.p++)  //for panel 3
        {
            if (_this.quest2[_this.count1][2] == _this.ans2[_this.count1][0][_this.p]) {
                _this.selected2.push(_this.quest2[_this.count1][2]);

                console.log("panel3")
                _this.p3 = _this.panel33.animations.add('p3');
                _this.p3.play(2);
                _this.p3.onComplete.add(function () {
                    _this.p3.play(2);
                    _this.p3.onComplete.add(function () {
                        _this.p3.play(2);
                        _this.p3.onComplete.add(function () {
                            _this.panel33.frame = 1;
                        });
                    });
                });
                break;

            }
        }
        for (_this.m = 0; _this.m < 3; _this.m++)  //for panel 4
        {
            if (_this.quest2[_this.count1][3] == _this.ans2[_this.count1][0][_this.m]) {
                _this.selected2.push(_this.quest2[_this.count1][3]);
                console.log("panel4")
                _this.p4 = _this.panel44.animations.add('p4');
                _this.p4.play(2);
                _this.p4.onComplete.add(function () {
                    _this.p4.play(2);
                    _this.p4.onComplete.add(function () {
                        _this.p4.play(2);
                        _this.p4.onComplete.add(function () {
                            _this.panel44.frame = 1;
                        });
                    });
                });
                break;
            }
        }
        for (_this.l = 0; _this.l < 3; _this.l++) {
            if (_this.quest2[_this.count1][4] == _this.ans2[_this.count1][0][_this.l]) {
                _this.selected2.push(_this.quest2[_this.count1][4]);
                console.log("panel5")
                _this.p5 = _this.panel55.animations.add('p5');
                _this.p5.play(2);
                _this.p5.onComplete.add(function () {
                    _this.p5.play(2);
                    _this.p5.onComplete.add(function () {
                        _this.p5.play(2);
                        _this.p5.onComplete.add(function () {
                            _this.panel55.frame = 1;
                        });
                    });
                });
                break;
            }
        }
        if (_this.tickBtn3) _this.tickBtn3.destroy();
        _this.backbutton1.destroy();
        _this.tickBtn2 = _this.add.sprite(855, 470, 'TickBtn');
        _this.tickBtn2.frame = 1;
        _this.tickBtn2.inputEnabled = true;
        _this.tickBtn2.input.useHandCursor = true;
        _this.tickBtn2.events.onInputDown.add(_this.nextscreen);  //has to click tick button to go for next screen
    },

    destroySymbols: function () {
        if (_this.sym12) { _this.sym12.visible = false; _this.sym12.kill(); _this.sym12 = null; }
        if (_this.sym11) { _this.sym11.visible = false; _this.sym11.kill(); _this.sym11 = null; }
        if (_this.sym13) { _this.sym13.visible = false; _this.sym13.kill(); _this.sym13 = null; }
        if (_this.sym22) { _this.sym22.visible = false; _this.sym22.kill(); _this.sym22 = null; }
        if (_this.sym23) { _this.sym23.visible = false; _this.sym23.kill(); _this.sym23 = null; }
        if (_this.sym21) { _this.sym21.visible = false; _this.sym21.kill(); _this.sym21 = null; }
        if (_this.sym33) { _this.sym33.visible = false; _this.sym33.kill(); _this.sym33 = null; }
        if (_this.sym32) { _this.sym32.visible = false; _this.sym32.kill(); _this.sym32 = null; }
        if (_this.sym31) { _this.sym31.visible = false; _this.sym31.kill(); _this.sym31 = null; }
        _this.box.destroy();
        _this.box2.destroy();
        _this.box3.destroy();
        _this.box4.destroy();
        _this.box5.destroy();
        _this.acm.destroy();
        _this.ccm.destroy();
        _this.bcm.destroy();
        _this.Txtbox1.destroy();
        _this.Txtbox2.destroy();
        _this.Txtbox3.destroy();
        _this.aaLett.destroy();
        _this.aaaLett.destroy();
        _this.bbLett.destroy();
        _this.bbbLett.destroy();
        _this.ccLett.destroy();
        _this.cccLett.destroy();
        _this.absum.destroy();
        _this.cbsum.destroy();
        _this.acsum.destroy();
        _this.thumDown.destroy();
        _this.thumUp.destroy();

        _this.sign1.destroy();
        _this.sign11.destroy();
        _this.sign2.destroy();
        _this.sign22.destroy();
        _this.sign3.destroy();
        _this.sign33.destroy();
        _this.letter1.destroy();
        _this.letter2.destroy();
        _this.letter3.destroy();

        _this.correct1 = 0;
        _this.correct2 = 0;
        _this.correct3 = 0;

    },

    drawTriangle: function ()  //draw triangle once all validation are done
    {
        _this.queFlag = 0;
        _this.panelsecondScreen2 = _this.add.image(10, 60, 'panel4')
        _this.panelsecondScreen2.scale.setTo(1.6, 1.2);

        _this.sortedArrayy = _this.selected2.slice();
        for (let i = 0; i < 3 - 1; i++) {
            for (let j = 0; j < 3 - i - 1; j++) {
                if (_this.sortedArrayy[j] > _this.sortedArrayy[j + 1]) {
                    let temp = _this.sortedArrayy[j];
                    _this.sortedArrayy[j] = _this.sortedArrayy[j + 1];
                    _this.sortedArrayy[j + 1] = temp;
                }
            }
        }

        _this.a2 = _this.sortedArrayy[2];
        _this.b2 = _this.sortedArrayy[1];
        _this.c2 = _this.sortedArrayy[0];


        _this.betaDegrees2 = Math.acos((_this.a2 * _this.a2 + _this.c2 * _this.c2 - _this.b2 * _this.b2) / (2 * _this.a2 * _this.c2));
        _this.gammaDegrees2 = Math.acos((_this.a2 * _this.a2 + _this.b2 * _this.b2 - _this.c2 * _this.c2) / (2 * _this.a2 * _this.b2));

        _this.beta2 = _this.betaDegrees2 * 180 / Math.PI;
        _this.gamma2 = _this.gammaDegrees2 * 180 / Math.PI;


        _this.stick11 = _this.add.sprite(450, 490, 'woodPeice'); // create a sprite for the first stick image
        _this.stick11.anchor.setTo(0.5, 0.5); // set the anchor point to the left side of the stick
        _this.stick11.scale.setTo(_this.sortedArrayy[2] / 10, 1); // set the scale of the stick to match its length
        _this.leng11 = _this.add.text(450, 500, _this.sortedArrayy[2] + " cm");
        _this.applyingStyle(_this.leng11);

        _this.stick22 = _this.add.sprite(448 - _this.stick11.width / 2, 474, 'woodPeice');
        _this.stick22.anchor.setTo(01, 0.55);
        _this.stick22.scale.setTo(_this.sortedArrayy[1] / 10, 1);
        _this.stick22.angle = 180 - _this.gamma2;
        _this.leng22 = _this.add.text(_this.stick22.x - 35, _this.stick22.y - 74, _this.sortedArrayy[1] + " cm");
        _this.applyingStyle(_this.leng22);

        _this.stick33 = _this.add.sprite(445 + _this.stick11.width / 2, 486, 'woodPeice');
        _this.stick33.anchor.setTo(1, 1);
        _this.stick33.scale.setTo(_this.sortedArrayy[0] / 10, 1);
        _this.stick33.angle = _this.beta2;
        _this.leng33 = _this.add.text(_this.stick33.x + 14, _this.stick33.y - 90, _this.sortedArrayy[0] + " cm");
        _this.applyingStyle(_this.leng33);

        telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);

        _this.time.events.add(500, function () {
            _this.starActions();
        });

        _this.time.events.add(2500, function () {
            _this.count1++;
            _this.destroyTirangle();

            _this.time.events.add(500, function () {
                if (_this.count1 == 3)
                    _this.state.start('score', true, false, gameID, _this.microConcepts);
                else
                    _this.DisplayQuestionB();
            });
        });
    },

    destroyTirangle: function () {
        _this.wrongAnswer = 0;
        _this.ansCount = 0;
        _this.panelcount2 = 0;
        _this.widthboxCount2 = 0;
        _this.i = 0;
        _this.l = 0;
        _this.m = 0;
        _this.p = 0;
        _this.q = 0;
        _this.selected2 = [];
        _this.panelsecondScreen2.destroy();
        _this.stick11.destroy();
        _this.stick22.destroy();
        _this.stick33.destroy();
        _this.leng11.destroy();
        _this.leng22.destroy();
        _this.leng33.destroy();
    },

    //for clearing the answer box.
    wrongbtnClicked1: function (target) {
        _this.clickSound.play();
        _this.disableInputs1();
        _this.aa.visible = true;
    },
    wrongbtnClicked2: function (target) {
        _this.clickSound.play();
        _this.disableInputs2();
        _this.bb.visible = true;
    },
    wrongbtnClicked3: function (target) {
        _this.clickSound.play();
        _this.disableInputs3();
    },
    wrongbtnClicked4: function (target) {
        _this.clickSound.play();
        _this.disableInputs4();
        _this.cc.visible = true;
    },
    wrongbtnClicked5: function (target) {
        _this.clickSound.play();
        _this.disableInputs5();
        _this.bbb.visible = true;
    },
    wrongbtnClicked6: function (target) {
        _this.clickSound.play();
        _this.disableInputs6();
    },
    wrongbtnClicked7: function (target) {
        _this.clickSound.play();
        _this.disableInputs7();
        _this.aaa.visible = true;
    },
    wrongbtnClicked8: function (target) {
        _this.clickSound.play();
        _this.disableInputs8();
        _this.ccc.visible = true;
    },
    wrongbtnClicked9: function (target) {
        _this.clickSound.play();
        _this.disableInputs9();

    },

    //for clearing the answer box.
    disableInputs1: function () {
        _this.AnswerBox1.removeChild(_this.enterTxt1);
        _this.AnswerBox1.name = '';
        _this.disablecommon1();
    },
    disablecommon1: function () {
        _this.selectedAns11 = '';
        _this.selectedAns21 = '';
        _this.selectedAns31 = '';
        _this.fourNotEntered1 = false;
        _this.dotselected1 = false;
        _this.finalval1 = '';
        _this.fouransLen1 = 0;

    },
    //for clearing the answer box.
    disableInputs2: function () {
        _this.AnswerBox2.removeChild(_this.enterTxt2);
        _this.AnswerBox2.name = '';
        _this.disablecommon2();
    },
    disablecommon2: function () {
        _this.selectedAns12 = '';
        _this.selectedAns22 = '';
        _this.selectedAns32 = '';
        _this.fourNotEntered2 = false;
        _this.dotselected2 = false;
        _this.finalval2 = '';
        _this.fouransLen2 = 0;
    },
    //for clearing the answer box.
    disableInputs3: function () {
        _this.AnswerBox3.removeChild(_this.enterTxt3);
        _this.AnswerBox3.name = '';
        _this.disablecommon3();
    },
    disablecommon3: function () {
        _this.selectedAns13 = '';
        _this.selectedAns23 = '';
        _this.selectedAns33 = '';
        _this.fourNotEntered3 = false;
        _this.dotselected3 = false;
        _this.fouransLen3 = 0;
        _this.finalval3 = '';
    },

    //for clearing the answer box.
    disableInputs4: function () {
        _this.AnswerBox4.removeChild(_this.enterTxt4);
        _this.AnswerBox4.name = '';
        _this.disablecommon4();

    },
    disablecommon4: function () {
        _this.selectedAns14 = '';
        _this.selectedAns24 = '';
        _this.selectedAns34 = '';
        _this.fourNotEntered4 = false;
        _this.dotselected4 = false;
        _this.finalval4 = '';
        _this.fouransLen4 = 0;
    },
    //for clearing the answer box.
    disableInputs5: function () {
        _this.AnswerBox5.removeChild(_this.enterTxt5);
        _this.AnswerBox5.name = '';
        _this.disablecommon5();
    },
    disablecommon5: function () {
        _this.selectedAns15 = '';
        _this.selectedAns25 = '';
        _this.selectedAns35 = '';
        _this.fourNotEntered5 = false;
        _this.dotselected5 = false;
        _this.finalval5 = '';
        _this.fouransLen5 = 0;
    },
    //for clearing the answer box.
    disableInputs6: function () {
        _this.AnswerBox6.removeChild(_this.enterTxt6);
        _this.AnswerBox6.name = '';
        _this.disablecommon6();
    },
    disablecommon6: function () {
        _this.selectedAns16 = '';
        _this.selectedAns26 = '';
        _this.selectedAns36 = '';
        _this.fourNotEntered6 = false;
        _this.dotselected6 = false;
        _this.fouransLen6 = 0;
        _this.finalval6 = '';
    },
    //for clearing the answer box.
    disableInputs7: function () {
        _this.AnswerBox7.removeChild(_this.enterTxt7);
        _this.AnswerBox7.name = '';
        _this.disablecommon7();
    },
    disablecommon7: function () {
        _this.selectedAns17 = '';
        _this.selectedAns27 = '';
        _this.selectedAns37 = '';
        _this.fourNotEntered7 = false;
        _this.dotselected7 = false;
        _this.finalval7 = '';
        _this.fouransLen7 = 0;
    },
    //for clearing the answer box.
    disableInputs8: function () {
        _this.AnswerBox8.removeChild(_this.enterTxt8);
        _this.AnswerBox8.name = '';
        _this.disablecommon8();
    },
    disablecommon8: function () {
        _this.selectedAns18 = '';
        _this.selectedAns28 = '';
        _this.selectedAns38 = '';
        _this.fourNotEntered8 = false;
        _this.dotselected8 = false;
        _this.finalval8 = '';
        _this.fouransLen8 = 0;
    },
    //for clearing the answer box.
    disableInputs9: function () {
        _this.AnswerBox9.removeChild(_this.enterTxt9);
        _this.AnswerBox9.name = '';
        _this.disablecommon9();
    },
    disablecommon9: function () {
        _this.fourNotEntered9 = false;
        _this.dotselected9 = false;
        _this.fouransLen9 = 0;
        _this.finalval9 = '';
        _this.selectedAns19 = '';
        _this.selectedAns29 = '';
        _this.selectedAns39 = '';
    },
    //Displaying the clicked number.
    numClicked1: function (target) {
        console.log("numclivked1");
        _this.clickSound.play();
        _this.aa.visible = false;

        var_selectedAns11 = " ";
        var_selectedAns21 = " ";
        var_selectedAns31 = " ";
        if (target.name == 10) {
            target.name = '0';
        }
        if (target.name == 11 && _this.dotselected1 == true) {
            return;
        }
        else if (target.name == 11 && _this.dotselected1 == false) {
            target.name = ".";
            _this.dotselected1 = true;
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
        if (_this.fouransLen1 != 4) {
            if (_this.fouransLen1 == 3 && _this.dotselected1 == false)
                return;
            _this.finalval1 += '';
            _this.finalval1 += target.name;
            if (target.name == '.')
                target.name = 11;
            _this.fouransLen1 += 1;
        }

        if (target.name == '0')
            target.name = 10;


        if (_this.fourNotEntered1 == false) {
            _this.enterTxt1.visible = false;
            _this.AnswerBox1.removeChild(_this.enterTxt1);

            if ((_this.fouransLen1 == 1))
                _this.enterTxt1 = _this.add.text(26, 5, "" + _this.finalval1, { fontSize: '15px' });
            else if (_this.fouransLen1 == 2)
                _this.enterTxt1 = _this.add.text(18, 5, "" + _this.finalval1, { fontSize: '15px' });
            else if (_this.fouransLen1 == 3)
                _this.enterTxt1 = _this.add.text(12, 5, "" + _this.finalval1, { fontSize: '15px' });
            else {
                _this.enterTxt1 = _this.add.text(10, 5, "" + _this.finalval1, { fontSize: '15px' });
                _this.fourNotEntered1 = true;
            }
            _this.applyingStyle(_this.enterTxt1);
            _this.AnswerBox1.addChild(_this.enterTxt1);
            _this.AnswerBox1.name = ('' + _this.finalval1);
            _this.enterTxt1.visible = true;
        }
    },

    numClicked2: function (target) {
        _this.bb.visible = false;

        _this.clickSound.play();
        var_selectedAns12 = " ";
        var_selectedAns22 = " ";
        var_selectedAns32 = " ";
        if (target.name == 10) {
            target.name = '0';
        }

        if (target.name == 11 && _this.dotselected2 == true) {
            return;
        }

        else if (target.name == 11 && _this.dotselected2 == false) {
            target.name = ".";
            _this.dotselected2 = true;
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
        if (_this.fouransLen2 != 4) {
            if (_this.fouransLen2 == 3 && _this.dotselected2 == false)
                return;
            _this.finalval2 += '';
            _this.finalval2 += target.name;
            if (target.name == '.')
                target.name = 11;
            _this.fouransLen2 += 1;
        }

        if (target.name == '0')
            target.name = 10;

        if (target.name == '.')
            target.name = 11;

        if (_this.fourNotEntered2 == false) {
            _this.enterTxt2.visible = false;
            _this.AnswerBox2.removeChild(_this.enterTxt2);

            if ((_this.fouransLen2 == 1))
                _this.enterTxt2 = _this.add.text(26, 5, "" + _this.finalval2, { fontSize: '15px' });
            else if (_this.fouransLen2 == 2)
                _this.enterTxt2 = _this.add.text(18, 5, "" + _this.finalval2, { fontSize: '15px' });
            else if (_this.fouransLen2 == 3)
                _this.enterTxt2 = _this.add.text(12, 5, "" + _this.finalval2, { fontSize: '15px' });
            else {
                _this.enterTxt2 = _this.add.text(10, 5, "" + _this.finalval2, { fontSize: '15px' });
                _this.fourNotEntered2 = true;

            }
            _this.applyingStyle(_this.enterTxt2);
            _this.AnswerBox2.addChild(_this.enterTxt2);
            _this.AnswerBox2.name = ('' + _this.finalval2);
            _this.enterTxt2.visible = true;
        }
    },

    //Displaying the clicked number.
    numClicked3: function (target) {
        _this.clickSound.play();
        var_selectedAns13 = " ";
        var_selectedAns23 = " ";
        var_selectedAns33 = " ";
        if (target.name == 10) {
            target.name = '0';
        }

        if (target.name == 11 && _this.dotselected3 == true) {
            return;
        }

        else if (target.name == 11 && _this.dotselected3 == false) {
            target.name = ".";
            _this.dotselected3 = true;
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
        if (_this.fouransLen3 != 4) {
            if (_this.fouransLen3 == 3 && _this.dotselected3 == false)
                return;
            _this.finalval3 += '';
            _this.finalval3 += target.name;
            if (target.name == '.')
                target.name = 11;
            _this.fouransLen3 += 1;
        }

        if (target.name == '0')
            target.name = 10;


        if (_this.fourNotEntered3 == false) {
            _this.enterTxt3.visible = false;
            _this.AnswerBox3.removeChild(_this.enterTxt3);

            if ((_this.fouransLen3 == 1))
                _this.enterTxt3 = _this.add.text(26, 5, "" + _this.finalval3, { fontSize: '15px' });
            else if (_this.fouransLen3 == 2)
                _this.enterTxt3 = _this.add.text(18, 5, "" + _this.finalval3, { fontSize: '15px' });
            else if (_this.fouransLen3 == 3)
                _this.enterTxt3 = _this.add.text(12, 5, "" + _this.finalval3, { fontSize: '15px' });
            else {
                _this.enterTxt3 = _this.add.text(10, 5, "" + _this.finalval3, { fontSize: '15px' });
                _this.fourNotEntered3 = true;
            }
            _this.applyingStyle(_this.enterTxt3);
            _this.AnswerBox3.addChild(_this.enterTxt3);
            _this.AnswerBox3.name = ('' + _this.finalval3);
            _this.enterTxt3.visible = true;
        }
    },

    //Displaying the clicked number.
    numClicked4: function (target) {
        _this.cc.visible = false;

        _this.clickSound.play();
        var_selectedAns14 = " ";
        var_selectedAns24 = " ";
        var_selectedAns34 = " ";
        if (target.name == 10) {
            target.name = '0';
        }

        if (target.name == 11 && _this.dotselected4 == true) {
            return;
        }

        else if (target.name == 11 && _this.dotselected4 == false) {
            target.name = ".";
            _this.dotselected4 = true;
        }

        if (_this.selectedAns14 === '') {
            _this.selectedAns14 = target.name;
            var_selectedAns14 = _this.selectedAns14;
        }
        else if (_this.selectedAns24 === '') {
            _this.selectedAns24 = target.name;
            var_selectedAns14 = _this.selectedAns14;
            var_selectedAns24 = _this.selectedAns24;

        }
        if (_this.fouransLen4 != 4) {
            if (_this.fouransLen4 == 3 && _this.dotselected4 == false)
                return;
            _this.finalval4 += '';
            _this.finalval4 += target.name;
            if (target.name == '.')
                target.name = 11;
            _this.fouransLen4 += 1;
        }

        if (target.name == '0')
            target.name = 10;


        if (_this.fourNotEntered4 == false) {
            _this.enterTxt4.visible = false;
            _this.AnswerBox4.removeChild(_this.enterTxt4);

            if ((_this.fouransLen4 == 1))
                _this.enterTxt4 = _this.add.text(25, 5, "" + _this.finalval4, { fontSize: '15px' });
            else if (_this.fouransLen4 == 2)
                _this.enterTxt4 = _this.add.text(18, 5, "" + _this.finalval4, { fontSize: '15px' });
            else if (_this.fouransLen4 == 3)
                _this.enterTxt4 = _this.add.text(12, 5, "" + _this.finalval4, { fontSize: '15px' });
            else {
                _this.enterTxt4 = _this.add.text(10, 5, "" + _this.finalval4, { fontSize: '15px' });
                _this.fourNotEntered4 = true;
            }
            _this.applyingStyle(_this.enterTxt4);
            _this.AnswerBox4.addChild(_this.enterTxt4);
            _this.AnswerBox4.name = ('' + _this.finalval4);
            _this.enterTxt4.visible = true;
        }
    },

    //Displaying the clicked number.
    numClicked5: function (target) {
        _this.bbb.visible = false;

        _this.clickSound.play();
        var_selectedAns15 = " ";
        var_selectedAns25 = " ";
        var_selectedAns35 = " ";
        if (target.name == 10) {
            target.name = '0';
        }

        if (target.name == 11 && _this.dotselected5 == true) {
            return;
        }

        else if (target.name == 11 && _this.dotselected5 == false) {
            target.name = ".";
            _this.dotselected5 = true;
        }

        if (_this.selectedAns15 === '') {
            _this.selectedAns15 = target.name;
            var_selectedAns15 = _this.selectedAns15;
        }
        else if (_this.selectedAns25 === '') {
            _this.selectedAns25 = target.name;
            var_selectedAns15 = _this.selectedAns15;
            var_selectedAns25 = _this.selectedAns25;

        }
        if (_this.fouransLen5 != 4) {
            if (_this.fouransLen5 == 3 && _this.dotselected5 == false)
                return;
            _this.finalval5 += '';
            _this.finalval5 += target.name;
            if (target.name == '.')
                target.name = 11;
            _this.fouransLen5 += 1;
        }

        if (target.name == '0')
            target.name = 10;


        if (_this.fourNotEntered5 == false) {
            _this.enterTxt5.visible = false;
            _this.AnswerBox5.removeChild(_this.enterTxt5);

            if ((_this.fouransLen5 == 1))
                _this.enterTxt5 = _this.add.text(25, 5, "" + _this.finalval5, { fontSize: '15px' });
            else if (_this.fouransLen5 == 2)
                _this.enterTxt5 = _this.add.text(18, 5, "" + _this.finalval5, { fontSize: '15px' });
            else if (_this.fouransLen5 == 3)
                _this.enterTxt5 = _this.add.text(12, 5, "" + _this.finalval5, { fontSize: '15px' });
            else {
                _this.enterTxt5 = _this.add.text(10, 5, "" + _this.finalval5, { fontSize: '15px' });
                _this.fourNotEntered5 = true;
            }
            _this.applyingStyle(_this.enterTxt5);
            _this.AnswerBox5.addChild(_this.enterTxt5);
            _this.AnswerBox5.name = ('' + _this.finalval5);
            _this.enterTxt5.visible = true;
        }
    },

    //Displaying the clicked number.
    numClicked6: function (target) {
        _this.clickSound.play();
        var_selectedAns16 = " ";
        var_selectedAns26 = " ";
        var_selectedAns36 = " ";
        if (target.name == 10) {
            target.name = '0';
        }

        if (target.name == 11 && _this.dotselected6 == true) {
            return;
        }

        else if (target.name == 11 && _this.dotselected6 == false) {
            target.name = ".";
            _this.dotselected6 = true;
        }

        if (_this.selectedAns16 === '') {
            _this.selectedAns16 = target.name;
            var_selectedAns16 = _this.selectedAns16;
        }
        else if (_this.selectedAns26 === '') {
            _this.selectedAns26 = target.name;
            var_selectedAns16 = _this.selectedAns16;
            var_selectedAns26 = _this.selectedAns26;

        }
        if (_this.fouransLen6 != 4) {
            if (_this.fouransLen6 == 3 && _this.dotselected6 == false)
                return;
            _this.finalval6 += '';
            _this.finalval6 += target.name;
            if (target.name == '.')
                target.name = 11;
            _this.fouransLen6 += 1;
        }

        if (target.name == '0')
            target.name = 10;


        if (_this.fourNotEntered6 == false) {
            _this.enterTxt6.visible = false;
            _this.AnswerBox4.removeChild(_this.enterTxt6);

            if ((_this.fouransLen6 == 1))
                _this.enterTxt6 = _this.add.text(25, 5, "" + _this.finalval6, { fontSize: '15px' });
            else if (_this.fouransLen6 == 2)
                _this.enterTxt6 = _this.add.text(18, 5, "" + _this.finalval6, { fontSize: '15px' });
            else if (_this.fouransLen6 == 3)
                _this.enterTxt6 = _this.add.text(12, 5, "" + _this.finalval6, { fontSize: '15px' });
            else {
                _this.enterTxt6 = _this.add.text(10, 5, "" + _this.finalval6, { fontSize: '15px' });
                _this.fourNotEntered6 = true;
            }
            _this.applyingStyle(_this.enterTxt6);
            _this.AnswerBox6.addChild(_this.enterTxt6);
            _this.AnswerBox6.name = ('' + _this.finalval6);
            _this.enterTxt6.visible = true;
        }
    },
    //Displaying the clicked number.
    numClicked7: function (target) {
        _this.aaa.visible = false;

        _this.clickSound.play();
        var_selectedAns17 = " ";
        var_selectedAns27 = " ";
        var_selectedAns37 = " ";
        if (target.name == 10) {
            target.name = '0';
        }

        if (target.name == 11 && _this.dotselected7 == true) {
            return;
        }

        else if (target.name == 11 && _this.dotselected7 == false) {
            target.name = ".";
            _this.dotselected7 = true;
        }

        if (_this.selectedAns17 === '') {
            _this.selectedAns17 = target.name;
            var_selectedAns17 = _this.selectedAns17;
        }
        else if (_this.selectedAns27 === '') {
            _this.selectedAns27 = target.name;
            var_selectedAns17 = _this.selectedAns17;
            var_selectedAns27 = _this.selectedAns27;

        }
        if (_this.fouransLen7 != 4) {
            if (_this.fouransLen7 == 3 && _this.dotselected7 == false)
                return;
            _this.finalval7 += '';
            _this.finalval7 += target.name;
            if (target.name == '.')
                target.name = 11;
            _this.fouransLen7 += 1;
        }

        if (target.name == '0')
            target.name = 10;


        if (_this.fourNotEntered7 == false) {
            _this.enterTxt7.visible = false;
            _this.AnswerBox7.removeChild(_this.enterTxt7);

            if ((_this.fouransLen7 == 1))
                _this.enterTxt7 = _this.add.text(25, 5, "" + _this.finalval7, { fontSize: '15px' });
            else if (_this.fouransLen7 == 2)
                _this.enterTxt7 = _this.add.text(18, 5, "" + _this.finalval7, { fontSize: '15px' });
            else if (_this.fouransLen7 == 3)
                _this.enterTxt7 = _this.add.text(12, 5, "" + _this.finalval7, { fontSize: '15px' });
            else {
                _this.enterTxt7 = _this.add.text(10, 5, "" + _this.finalval7, { fontSize: '15px' });
                _this.fourNotEntered7 = true;
            }
            _this.applyingStyle(_this.enterTxt7);
            _this.AnswerBox7.addChild(_this.enterTxt7);
            _this.AnswerBox7.name = ('' + _this.finalval7);
            _this.enterTxt7.visible = true;
        }
    },

    //Displaying the clicked number.
    numClicked8: function (target) {
        _this.ccc.visible = false;

        _this.clickSound.play();
        var_selectedAns18 = " ";
        var_selectedAns28 = " ";
        var_selectedAns38 = " ";
        if (target.name == 10) {
            target.name = '0';
        }

        if (target.name == 11 && _this.dotselected8 == true) {
            return;
        }

        else if (target.name == 11 && _this.dotselected8 == false) {
            target.name = ".";
            _this.dotselected8 = true;
        }

        if (_this.selectedAns18 === '') {
            _this.selectedAns18 = target.name;
            var_selectedAns18 = _this.selectedAns18;
        }
        else if (_this.selectedAns28 === '') {
            _this.selectedAns28 = target.name;
            var_selectedAns18 = _this.selectedAns18;
            var_selectedAns28 = _this.selectedAns28;

        }
        if (_this.fouransLen8 != 4) {
            if (_this.fouransLen8 == 3 && _this.dotselected8 == false)
                return;
            _this.finalval8 += '';
            _this.finalval8 += target.name;
            if (target.name == '.')
                target.name = 11;
            _this.fouransLen8 += 1;
        }

        if (target.name == '0')
            target.name = 10;


        if (_this.fourNotEntered8 == false) {
            _this.enterTxt8.visible = false;
            _this.AnswerBox8.removeChild(_this.enterTxt8);

            if ((_this.fouransLen8 == 1))
                _this.enterTxt8 = _this.add.text(25, 5, "" + _this.finalval8, { fontSize: '15px' });
            else if (_this.fouransLen8 == 2)
                _this.enterTxt8 = _this.add.text(18, 5, "" + _this.finalval8, { fontSize: '15px' });
            else if (_this.fouransLen8 == 3)
                _this.enterTxt8 = _this.add.text(12, 5, "" + _this.finalval8, { fontSize: '15px' });
            else {
                _this.enterTxt8 = _this.add.text(10, 5, "" + _this.finalval8, { fontSize: '15px' });
                _this.fourNotEntered8 = true;
            }
            _this.applyingStyle(_this.enterTxt8);
            _this.AnswerBox8.addChild(_this.enterTxt8);
            _this.AnswerBox8.name = ('' + _this.finalval8);
            _this.enterTxt8.visible = true;
        }
    },
    //Displaying the clicked number.
    numClicked9: function (target) {
        _this.clickSound.play();
        var_selectedAns19 = " ";
        var_selectedAns29 = " ";
        var_selectedAns39 = " ";
        if (target.name == 10) {
            target.name = '0';
        }

        if (target.name == 11 && _this.dotselected9 == true) {
            return;
        }

        else if (target.name == 11 && _this.dotselected9 == false) {
            target.name = ".";
            _this.dotselected9 = true;
        }

        if (_this.selectedAns19 === '') {
            _this.selectedAns19 = target.name;
            var_selectedAns19 = _this.selectedAns19;
        }
        else if (_this.selectedAns29 === '') {
            _this.selectedAns29 = target.name;
            var_selectedAns19 = _this.selectedAns19;
            var_selectedAns29 = _this.selectedAns29;

        }
        if (_this.fouransLen9 != 4) {
            if (_this.fouransLen9 == 3 && _this.dotselected9 == false)
                return;
            _this.finalval9 += '';
            _this.finalval9 += target.name;
            if (target.name == '.')
                target.name = 11;
            _this.fouransLen9 += 1;
        }

        if (target.name == '0')
            target.name = 10;


        if (_this.fourNotEntered9 == false) {
            _this.enterTxt9.visible = false;
            _this.AnswerBox9.removeChild(_this.enterTxt9);

            if ((_this.fouransLen9 == 1))
                _this.enterTxt9 = _this.add.text(25, 5, "" + _this.finalval9, { fontSize: '15px' });
            else if (_this.fouransLen9 == 2)
                _this.enterTxt9 = _this.add.text(18, 5, "" + _this.finalval9, { fontSize: '15px' });
            else if (_this.fouransLen9 == 3)
                _this.enterTxt9 = _this.add.text(12, 5, "" + _this.finalval9, { fontSize: '15px' });
            else {
                _this.enterTxt9 = _this.add.text(10, 5, "" + _this.finalval9, { fontSize: '15px' });
                _this.fourNotEntered9 = true;
            }
            _this.applyingStyle(_this.enterTxt9);
            _this.AnswerBox9.addChild(_this.enterTxt9);
            _this.AnswerBox9.name = ('' + _this.finalval9);
            _this.enterTxt9.visible = true;
        }
    },
    //Tween  the numberpad.
    tweenNumPad: function () {
        _this.numGroup.visible = true;
        _this.numpadTween.to({ x: 0, y: -43 }, 1000, 'Linear', true, 0);
    },

    applyingStyle: function (target) {
        target.textAlign = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#63C5DA';  //for blue color
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '25px';
    },

    applyingStyle2: function (target) {
        //target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#BEBEBE';  //for gray color
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '25px';
    },

    starActions: function (target) {
        console.log("starActions")
        _this.celebrationSound.play();
        starAnim = _this.starsGroup.getChildAt(_this.numberOfQuestions);
        starAnim.smoothed = false;
        anim = starAnim.animations.add('star');
        _this.numberOfQuestions++;

        _this.microConcepts = "GeometryG7";
        anim.play();
        _this.count++;

    },

    shutdown: function () {
        _this.stopVoice();
        //RI.gotoEndPage();
        //telInitializer.tele_end();
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
        if (_this.q1Sound) {
            _this.q1Sound.pause();
            _this.q1Sound.currentTime = 0.0;
        }
        // if (_this.q1_1Sound) {
        //     _this.q1_1Sound.pause();
        //     _this.q1_1Sound.currentTime = 0.0;
        // }
        if (_this.q2Sound) {
            _this.q2Sound.pause();
            _this.q2Sound.currentTime = 0.0;
        }
        if (_this.q3Sound) {
            _this.q3Sound.pause();
            _this.q3Sound.currentTime = 0.0;
        }
    },

    DemoHint: function () {
        _this.pauseVoice();

        // // QUESTION AUDIOS
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-07-G7/" +
            _this.languageSelected + "/GMLA_07_G7_h1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        // _this.q1_1Sound = document.createElement('audio');
        // _this.q1_1Soundsrc = document.createElement('source');
        // _this.q1_1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-07-G7/" +
        //     _this.languageSelected + "/DV1_1.mp3");
        // _this.q1_1Sound.appendChild(_this.q1_1Soundsrc);

        _this.q2Sound = document.createElement('audio');
        _this.q2Soundsrc = document.createElement('source');
        _this.q2Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-07-G7/" +
            _this.languageSelected + "/GMLA_07_G7_h2.mp3");
        _this.q2Sound.appendChild(_this.q2Soundsrc);

        _this.q3Sound = document.createElement('audio');
        _this.q3Soundsrc = document.createElement('source');
        _this.q3Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-07-G7/" +
            _this.languageSelected + "/GMLA_07_G7_h3.mp3");
        _this.q3Sound.appendChild(_this.q3Soundsrc);


        _this.video_playing = 0;
        _this.showDemoHint();  //* call the function to show the video


        _this.skip = _this.add.image(820, 110, 'close');       //* skip button shown at the bottom
        _this.skip.inputEnabled = true;
        _this.skip.input.useHandCursor = true;
        _this.skip.events.onInputDown.add(function () {
            _this.stopAudio();

            if (_this.hintBtn) {
                _this.hintBtn.inputEnabled = true;
                _this.hintBtn.input.useHandCursor = true;
            }

            _this.game.paused = false;  //* restart the game
        });
    },
    stopAudio: function () {
        //* clear all the timers first

        if (_this.q1Sound) {
            //// console.log("removing the q1");
            _this.q1Sound.pause();
            _this.q1Sound = null;
            _this.q1Soundsrc = null;
        }

        // if (_this.q1_1Sound) {
        //     //// console.log("removing the q1");
        //     _this.q1_1Sound.pause();
        //     _this.q1_1Sound = null;
        //     _this.q1_1Soundsrc = null;
        // }

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

        if (_this.background_demo) _this.background_demo.destroy();
        _this.speakerbtn.inputEnabled = true;

        _this.skip.events.onInputDown.removeAll();
        _this.skip.destroy();                //* skip button destroyed

    },

    showDemoHint: function () {

        _this.background_demo = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'BG');

        _this.bgBox = _this.add.image(70, 80, 'bgbox2');

        _this.background_demo.addChild(_this.bgBox);

        _this.cnTriangle();


    },

    // q1S: function () {
    //     console.log("inside q1S.....")
    //     // _this.q1_1Sound.play();
    // },

    q2S: function () {
        console.log("inside q1S.....")
        _this.q2Sound.play();
    },
    cnTriangle: function () {
        if (_this.triangleGroup)
            _this.triangleGroup.destroy();

        console.log("drawTrngle");
        _this.nontriangleGroup = _this.add.group();
        _this.q1Sound.play();

        //* Here the audios are added one after the other
        _this.q1Sound.addEventListener('ended', () => _this.q2Sound.play());
        console.log("inside q1S.....");
        // _this.q1_1Sound.addEventListener('ended', () => _this.q2Sound.play());

        //straight line
        // Create a Graphics object
        var graphics = _this.add.graphics(0, 0);

        // Set the line style (color, thickness)
        graphics.lineStyle(2, 0x4472c4); // 2 pixels thick, color//0xffffff white
        // Draw a line
        graphics.moveTo(220, 350); // Starting point
        graphics.lineTo(440, 350); // Ending point

        graphics.moveTo(440, 350); // Starting point
        graphics.lineTo(390, 320); // Ending point

        graphics.moveTo(220, 350); // Starting point
        graphics.lineTo(320, 300); // Ending point

        _this.nontriangleGroup.addChild(graphics);

        var text = _this.add.text(420, 300, "1", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });

        var text_2 = _this.add.text(250, 290, "2", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });

        var text_3 = _this.add.text(320, 370, "4", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });

        //............
        var text_4 = _this.add.text(520, 180, "1 + 2 = 3", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });

        var text_5 = _this.add.text(630, 180, "<", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#FF0000"  // Red color "#FF0000"
        });

        var text_6 = _this.add.text(660, 180, "4", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });
        //..............................

        var text_7 = _this.add.text(520, 230, "2 + 4 = 6", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });

        var text_8 = _this.add.text(630, 230, ">", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#008000"  // Red color "#FF0000"//#008000 green
        });

        var text_9 = _this.add.text(660, 230, "1", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });
        //..............................

        var text_10 = _this.add.text(520, 280, "1 + 4 = 5", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });

        var text_11 = _this.add.text(630, 280, ">", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#008000"  // Red color "#FF0000"//#008000 green
        });

        var text_12 = _this.add.text(660, 280, "2", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });

        _this.nontriangleGroup.addChild(text);
        _this.nontriangleGroup.addChild(text_2);
        _this.nontriangleGroup.addChild(text_3);
        _this.nontriangleGroup.addChild(text_4);
        _this.nontriangleGroup.addChild(text_5);
        _this.nontriangleGroup.addChild(text_6);
        _this.nontriangleGroup.addChild(text_7);
        _this.nontriangleGroup.addChild(text_8);
        _this.nontriangleGroup.addChild(text_9);
        _this.nontriangleGroup.addChild(text_10);
        _this.nontriangleGroup.addChild(text_11);
        _this.nontriangleGroup.addChild(text_12);

        _this.nextScreen = _this.add.image(780, 390, 'skipArrow');       //* skip button shown at the bottom
        _this.nextScreen.inputEnabled = true;
        _this.nextScreen.input.useHandCursor = true;
        _this.nontriangleGroup.addChild(_this.nextScreen);
        _this.nextScreen.events.onInputDown.add(function () {
            _this.pauseVoice();
            _this.drawTriangle();
        });

        _this.background_demo.addChild(_this.nontriangleGroup);

    },
    drawTriangle: function () {
        if (_this.nontriangleGroup)
            _this.nontriangleGroup.destroy();

        _this.triangleGroup = _this.add.group();

        _this.q3Sound.play();
        //straight line
        // Create a Graphics object
        var graphics = _this.add.graphics(0, 0);

        // Set the line style (color, thickness)
        graphics.lineStyle(2, 0x4472c4); // 2 pixels thick, color//0xffffff white
        // Draw a line
        graphics.moveTo(220, 350); // Starting point
        graphics.lineTo(440, 350); // Ending point
        graphics.lineTo(350, 280); // middle point
        graphics.lineTo(220, 350); // Ending point

        var text = _this.add.text(420, 300, "2", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });

        var text_2 = _this.add.text(250, 290, "3", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });

        var text_3 = _this.add.text(320, 370, "4", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });

        //............
        var text_4 = _this.add.text(520, 180, "3 + 2 = 5", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });

        var text_5 = _this.add.text(630, 180, ">", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#008000"  // Red color "#FF0000"
        });

        var text_6 = _this.add.text(660, 180, "4", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });
        //..............................

        var text_7 = _this.add.text(520, 230, "2 + 4 = 6", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });

        var text_8 = _this.add.text(630, 230, ">", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#008000"  // Red color "#FF0000"//#008000 green
        });

        var text_9 = _this.add.text(660, 230, "3", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });
        //..............................

        var text_10 = _this.add.text(520, 280, "3 + 4 = 7", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });

        var text_11 = _this.add.text(630, 280, ">", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#008000"  // Red color "#FF0000"//#008000 green
        });

        var text_12 = _this.add.text(660, 280, "2", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });

        _this.triangleGroup.addChild(graphics);
        _this.triangleGroup.addChild(text);
        _this.triangleGroup.addChild(text_2);
        _this.triangleGroup.addChild(text_3);
        _this.triangleGroup.addChild(text_4);
        _this.triangleGroup.addChild(text_5);
        _this.triangleGroup.addChild(text_6);
        _this.triangleGroup.addChild(text_7);
        _this.triangleGroup.addChild(text_8);
        _this.triangleGroup.addChild(text_9);
        _this.triangleGroup.addChild(text_10);
        _this.triangleGroup.addChild(text_11);
        _this.triangleGroup.addChild(text_12);

        _this.previousScreen = _this.add.image(180, 440, 'skipArrow');       //* back to first screen
        _this.previousScreen.angle = 180;
        _this.previousScreen.inputEnabled = true;
        _this.previousScreen.input.useHandCursor = true;

        _this.previousScreen.events.onInputDown.add(function () {
            _this.pauseVoice();
            _this.cnTriangle();
        });

        _this.triangleGroup.addChild(_this.previousScreen);

        _this.background_demo.addChild(_this.triangleGroup);

    },
}