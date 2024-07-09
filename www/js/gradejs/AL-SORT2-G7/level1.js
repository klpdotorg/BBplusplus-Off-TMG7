Game.AL_SORT2_G7level1 = function () { };


Game.AL_SORT2_G7level1.prototype =
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
        _this.wronganssrc.setAttribute("src", window.baseUrl + "sounds/wrongans.mp3");
        _this.wrongans.appendChild(_this.wronganssrc);

        _this.wrongSound = document.createElement('audio');
        _this.wrongSoundsrc = document.createElement('source');
        _this.wrongSoundsrc.setAttribute("src", window.baseUrl + "sounds/WrongCelebrationSound.mp3");
        _this.wrongSound.appendChild(_this.wrongSoundsrc);

        _this.bucketDrop = document.createElement('audio');
        _this.bucketDropsrc = document.createElement('source');
        _this.bucketDropsrc.setAttribute("src", window.baseUrl + "sounds/Skill Level Up.mp3");
        _this.bucketDrop.appendChild(_this.bucketDropsrc);

        _this.failure_honk = document.createElement('audio');
        _this.failure_honksrc = document.createElement('source');
        _this.failure_honksrc.setAttribute("src", window.baseUrl + "sounds/Negative Alert.mp3");
        _this.failure_honk.appendChild(_this.failure_honksrc);

        _this.Ask_Question1 = _this.createAudio("AL_SORT2_G7_a1");
        _this.Ask_Question2 = _this.createAudio("AL_SORT2_G7_a2");

        telInitializer.gameIdInit("AL_SORT2_G7", gradeSelected);// first Tele call
        console.log(gameID, "gameID...");
    },
    create: function (game) {

        //* show the demo video
        // _this.time.events.add(1, function () 
        // {
        //     _this.ViewDemoVideo(); 
        // });

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

        //  _this.AnsTimerCount = 0;
        _this.numberOfQuestions = 0;
        _this.speakerbtn;
        _this.background;
        _this.count = 0;
        _this.starsGroup;
        _this.AnswerBox;
        _this.seconds = 0;
        _this.minutes = 0;
        _this.Question_flag = 0;

        _this.called_me = false;
        _this.hand_flag = 1;
        _this.demo = 0;

        _this.basket1Y = 360;
        _this.basket2Y = 360;
        _this.basket3Y = 360;

        _this.counterForTimer = 0;

        _this.count1 = 0;

        _this.namesArray = [];

        //Box1 New Obj
        _this.bx1NewX = 50;
        _this.bx1NewY = 440;
        _this.bx1TextNewX = 110;
        _this.bx1TextNewY = 460;

        //Box2 New Obj
        _this.bx2NewX = 270;
        _this.bx2NewY = 440;
        _this.bx2TextNewX = 310;
        _this.bx2TextNewY = 460;

        //Box3 New Obj
        _this.bx3NewX = 490;
        _this.bx3NewY = 440;
        _this.bx3TextNewX = 518;
        _this.bx3TextNewY = 460;

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
                _this.state.start('grade7Algebra', true, false);            });
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
        // _this.hintBtn.smoothed = false;
        // _this.hintBtnAnim = _this.hintBtn.animations.add('hint');
        // _this.hintBtnAnim.play(15);
        // _this.hintBtnAnim.onComplete.add(function () {
        //     _this.hintBtnAnim.play(15);
        // }, _this);
        // _this.hintBtn.inputEnabled = false;
        // _this.hintBtn.inputEnabled = true;
        // _this.hintBtn.input.useHandCursor = true;

     //   _this.hintBtn.events.onInputDown.add(function () {
            //console.log("inside hintbutton function");
            //* show the demo video
            // _this.hintBtn.inputEnabled = false;
            // _this.hintBtn.input.useHandCursor = false;
            // _this.time.events.add(1, function () {
            //     //console.log(_this.hintBtn.inputEnabled, "status of hintBtn");
            //     _this.ViewDemoVideo();
            // });

        //});

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
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/AL-SORT2-G7/" + _this.languageSelected + "/" + src + ".mp3");
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
        // _this.startDisplayFruits();
        //_this.test123();

        if (_this.numberOfQuestions == 0) {
            _this.speakerbtn.inputEnabled = false;
            _this.Ask_Question1.play();
            _this.Ask_Question1.addEventListener('ended', () => {
                if (_this.hand_flag == 1) _this.showtank1ClickigDemo2();
                _this.Ask_Question2.play();
            });
        }
        _this.Ask_Question2.addEventListener('ended', () => {
            _this.speakerbtn.inputEnabled = true;

            if (_this.called_me == false) _this.startDisplayFruits();

        });
        _this.questionid = 1;
    },

    showtank1ClickigDemo2: function () {
        _this.hand_flag = 0;
        _this.time.events.add(500, function () {
            _this.hand = _this.add.image(130, 450, 'hand');
            _this.hand.scale.setTo(0.65);
            _this.time.events.add(400, () => {
                _this.hand.scale.setTo(0.6);
                _this.time.events.add(400, () => {
                    _this.hand.scale.setTo(0.65);
                    _this.time.events.add(600, () => {
                        _this.tweenHand = _this.add.tween(_this.hand);
                        _this.tweenHand.to({ x: 350, y: 450 }, 700, 'Linear', true, 0);
                        _this.tweenHand.start();

                        _this.tweenHand.onComplete.add(function () {
                            //_this.hand.destroy();
                            _this.hand.scale.setTo(0.6);
                            _this.time.events.add(600, () => {
                                _this.hand.scale.setTo(0.65);
                                _this.time.events.add(500, () => {
                                    _this.tweenHand1 = _this.add.tween(_this.hand);
                                    _this.tweenHand1.to({ x: 570, y: 450 }, 700, 'Linear', true, 0);
                                    _this.tweenHand1.start();

                                    _this.tweenHand1.onComplete.add(function () {
                                        _this.hand.scale.setTo(0.6);
                                        _this.time.events.add(900, () => {
                                            _this.hand.scale.setTo(0.65);
                                            _this.hand.destroy();
                                        })
                                    })
                                })

                            })

                        })
                    })
                })
            })
        })
    },

    test1: function () {
        //for testing size of fruit ..not used in the game
        _this.fruit = _this.add.image(130, 70, 'banana');
        _this.fruit.scale.setTo(0.9, 0.75);

        _this.fruit = _this.add.image(330, 70, 'muskMelon1');
        _this.fruit.scale.setTo(1.1, 1);

        _this.fruit = _this.add.image(530, 70, 'waterMelon');
        _this.fruit.scale.setTo(0.9, 0.75);


        _this.fruit = _this.add.image(730, 70, 'muskMelon2');
        _this.fruit.scale.setTo(0.9, 0.75);

        _this.equationText1 = _this.add.text(130, 80, _this.monomialArray[0]);
        _this.applyingStyle(_this.equationText1);
        _this.equationText2 = _this.add.text(330, 80, _this.monomialArray[1]);
        _this.applyingStyle(_this.equationText2);
        _this.equationText3 = _this.add.text(530, 80, _this.monomialArray[2]);
        _this.applyingStyle(_this.equationText3);
        _this.equationText4 = _this.add.text(730, 80, _this.monomialArray[3]);
        _this.applyingStyle(_this.equationText4);

    },

    test123: function () {
        // // Example: Generate 5 random trinomial equations with multiple variables
        // for (let i = 0; i < 5; i++) {
        //     const equation = generateTrinomialEquation();
        //     console.log(equation);
        // }

        // Function to generate random integer within a range
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Function to generate a random trinomial equation with multiple variables
        function generateTrinomialEquation() {
            const variables = ['x', 'y', 'z']; // Add more variables here if needed

            const variable1 = variables[Math.floor(Math.random() * variables.length)];
            const variable2 = variables[Math.floor(Math.random() * variables.length)];
            const variable3 = variables[Math.floor(Math.random() * variables.length)];

            const coefficient1 = getRandomInt(1, 10); // Random coefficient for the first term
            const coefficient2 = getRandomInt(1, 10); // Random coefficient for the second term
            const coefficient3 = getRandomInt(1, 10); // Random coefficient for the third term

            // Randomly choose the exponents (you can adjust the range if you want larger exponents)
            const exponent1 = getRandomInt(1, 3);
            const exponent2 = getRandomInt(1, 3);
            const exponent3 = getRandomInt(1, 3);

            // Randomly choose the operators for connecting the terms
            const operator1 = Math.random() < 0.5 ? '+' : '-';
            const operator2 = Math.random() < 0.5 ? '+' : '-';

            // Build the equation
            const equation = `${coefficient1}${variable1}^${exponent1} ${operator1} ${coefficient2}${variable2}^${exponent2} ${operator2} ${coefficient3}${variable3}^${exponent3}`;

            return equation;
        }

        // Example: Generate 5 random trinomial equations with different variables
        for (let i = 0; i < 5; i++) {
            const equation = generateTrinomialEquation();
            console.log(equation);
        }

    },

    enableBaskets: function () {
        //* Give input enable permissions to the bucket here
        // _this.basket1Y = 360;
        // _this.basket2Y = 360;
        // _this.basket3Y = 360;

        _this.bucket1.inputEnabled = true;
        _this.bucket1.input.useHandCursor = true;
        _this.bucket1.events.onInputDown.add(_this.bucket1IsClicked, _this);

        _this.bucket2.inputEnabled = true;
        _this.bucket2.input.useHandCursor = true;
        _this.bucket2.events.onInputDown.add(_this.bucket2IsClicked, _this);

        _this.bucket3.inputEnabled = true;
        _this.bucket3.input.useHandCursor = true;
        _this.bucket3.events.onInputDown.add(_this.bucket3IsClicked, _this);
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

    //* trying..........
    QuestionFormation: function () {
        //* Generating 6 sets of equations where all three terms are included
        //* monomial, binomia,trinomials are included
        //* SCvv - sign,constant,variable1,variable 2 this is the rule
        _this.monomialArray = [];
        _this.termsArray = [];
        for (i = 0; i < 6; i++) {

            _this.term = Math.floor(Math.random() * 3) + 1;// _this.term = Math.floor(Math.random() * 3) + 1;
            console.log(_this.term, " _this.term");
            _this.termsArray.push(_this.term);

            _this.variable1 = ['x', 'm', 'a'];
            _this.shuffleArray(_this.variable1);
            _this.variable2 = ['y', 'n', 'b'];

            _this.constantNum = Math.floor(Math.random() * 30) + 1;

            if (_this.variable1[0] == 'x') _this.SecondVariable = 'y';
            if (_this.variable1[0] == 'm') _this.SecondVariable = 'n';
            if (_this.variable1[0] == 'a') _this.SecondVariable = 'b';

            _this.power = "\u{00B2}";
            _this.cube = "\u{00B3}";
            _this.firstVarOptions = [0, 1, 2];
            _this.shuffleArray(_this.firstVarOptions);
            _this.secondVarOptions = [0, 1, 2, 3];
            _this.shuffleArray(_this.secondVarOptions);

            _this.sign = Math.floor(Math.random() * (2)); // 0,1 0= +, 1 =-
            // console.log(_this.sign, "_this.equationSign");

            if (_this.sign == 0) {
                _this.equationSign = '+';
            } else {
                _this.equationSign = '-';
            }
            if (_this.term == 1) {

                if (_this.firstVarOptions[0] == 0) {
                    _this.firstVariable = _this.variable1[0];

                }
                else if (_this.firstVarOptions[0] == 1) {
                    _this.firstVariable = _this.variable1[0] + _this.power;

                } else if (_this.firstVarOptions[0] == 2) {
                    _this.firstVariable = _this.variable1[0] + _this.cube;

                } else {
                    _this.firstVariable = '';
                }
                //*Find second number here 
                if (_this.secondVarOptions[0] == 0) {
                    _this.secondVariableVal = _this.SecondVariable;
                }
                else if (_this.secondVarOptions[0] == 1) {
                    _this.secondVariableVal = _this.SecondVariable + _this.power;
                    //   console.log("_this.SecondVariable", _this.secondVariableVal);
                } else if (_this.secondVarOptions[0] == 2) {
                    _this.secondVariableVal = _this.SecondVariable + _this.cube;
                    //  console.log("_this.SecondVariable", _this.secondVariableVal);
                } else {
                    _this.secondVariableVal = '';
                    // console.log("_this.SecondVariable", _this.secondVariableVal);
                }

                if (_this.equationSign == '-') {
                    // *SCvv
                    if (_this.constantNum == 1) _this.finalTerm = _this.equationSign + _this.firstVariable + _this.secondVariableVal;
                    else _this.finalTerm = _this.equationSign + _this.constantNum + _this.firstVariable + _this.secondVariableVal;

                    console.log(_this.finalTerm, " _this.finalTerm");
                } else {
                    // *SCvv
                    if (_this.constantNum == 1) _this.finalTerm = _this.firstVariable + _this.secondVariableVal;
                    else _this.finalTerm = _this.constantNum + _this.firstVariable + _this.secondVariableVal;

                    console.log(_this.finalTerm, " _this.finalTerm");
                }
                _this.monomialArray.push(_this.finalTerm);
                console.log(_this.monomialArray, " _this.monomialArray");
            }
            else if (_this.term == 2) {

                // }
                // *SCvv

                function getRandomInt(min, max) {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }

                // Function to generate a random binomial equation
                function generateBinomialEquation() {
                    const varOp = [0, 1, 2];
                    _this.shuffleArray(varOp);
                    const coefficient1 = getRandomInt(2, 10); // Random coefficient for the first term
                    const coefficient2 = getRandomInt(2, 10); // Random coefficient for the second term
                    const variable = ['x', 'a', 'm']; // You can change the variable to any other letter if needed
                    const variable1 = ['y', 'b', 'n'];
                    // Randomly choose whether it's addition or subtraction
                    const operator = Math.random() < 0.5 ? '+' : '-';

                    // Randomly choose the exponents (you can adjust the range if you want larger exponents)
                    const exponent1 = getRandomInt(2, 3);
                    const exponent2 = getRandomInt(2, 3);

                    if (exponent1 == 2) _this.exp1 = "\u{00B2}";
                    if (exponent1 == 3) _this.exp1 = "\u{00B3}";

                    if (exponent2 == 2) _this.exp2 = "\u{00B2}";
                    if (exponent2 == 3) _this.exp2 = "\u{00B3}";
                    // Build the equation
                    const equation = `${coefficient1}${variable[varOp[0]]}${_this.exp1}${operator} ${coefficient2}${variable1[varOp[0]]}${_this.exp2}`;

                    return equation;
                }

                // Example: Generate 5 random binomial equations
                // for (let i = 0; i < 5; i++) {
                const equation = generateBinomialEquation();
                console.log(equation);
                // }

                _this.monomialArray.push(equation);
                console.log(_this.monomialArray, " _this.monomialArray");
            } else {
                //* generate trinomials
                //* use only these variables for trinomials

                _this.variable1 = ['x', 'a'];
                _this.shuffleArray(_this.variable1);

                if (_this.variable1[0] == 'x') _this.SecondVariable = 'y';
                if (_this.variable1[0] == 'a') _this.SecondVariable = 'b';

                //term 1
                _this.constantNum = Math.floor(Math.random() * 9) + 1;
                if (_this.constantNum == 1) _this.constantNum = '';

                _this.firstVarOptions = [0];

                _this.secondVarOptions = [0, 3];


                _this.firstVariable = _this.variable1[0];
                _this.secondVariableVal = '';

                //term 2
                _this.sign2 = Math.floor(Math.random() * (2));
                if (_this.sign2 == 0) {
                    _this.equationSign2 = '+';
                } else {
                    _this.equationSign2 = '-';
                }

                _this.constantNum1 = Math.floor(Math.random() * 9) + 1;
                if (_this.constantNum1 == 1) _this.constantNum1 = '';


                _this.firstVarOptions = [0];

                _this.secondVarOptions = [0, 3];

                _this.secondVariableVal1 = _this.SecondVariable;
                _this.firstVariable1 = '';

                //term3
                _this.sign3 = Math.floor(Math.random() * (2));
                if (_this.sign3 == 0) {
                    _this.equationSign3 = '+';
                } else {
                    _this.equationSign3 = '-';
                }

                _this.constantNum2 = Math.floor(Math.random() * 9) + 1;
                if (_this.constantNum2 == 1) _this.constantNum2 = '';


                _this.firstVarOptions = [0];

                _this.secondVarOptions = [0, 3];

                _this.firstVariable2 = _this.variable1[0];
                _this.secondVariableVal2 = _this.SecondVariable;

                if (_this.equationSign == '-') {
                    _this.finalTerm = _this.equationSign + _this.constantNum + _this.firstVariable + _this.secondVariableVal + _this.equationSign2 + _this.constantNum1 + _this.firstVariable1 + _this.secondVariableVal1
                        + _this.equationSign3 + _this.constantNum2 + _this.firstVariable2 + _this.secondVariableVal2;
                    console.log(_this.finalTerm, " _this.finalTerm");
                } else {
                    _this.finalTerm = _this.constantNum + _this.firstVariable + _this.secondVariableVal + _this.equationSign2 + _this.constantNum1 + _this.firstVariable1 + _this.secondVariableVal1
                        + _this.equationSign3 + _this.constantNum2 + _this.firstVariable2 + _this.secondVariableVal2;
                    console.log(_this.finalTerm, " _this.finalTerm");
                }
                _this.monomialArray.push(_this.finalTerm);
                console.log(_this.monomialArray, " _this.monomialArray");
            }
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
    //this function is used for showing the baskets on the screen.
    AskingQuestion: function () {
        console.log("AskingQuestion")

        _this.panel = _this.add.image(20, 70, "panel");
        _this.plank = _this.add.image(25, 480, "plank");

        _this.bucket1 = _this.add.image(30, 380, "backet_1");
        _this.bucket2 = _this.add.image(250, 380, "backet_2");
        _this.bucket3 = _this.add.image(470, 380, "backet_3");

    },

    startDisplayFruits: function () {
        _this.sceneCount++;
        //  _this.AnsTimerCount =0;
        _this.noofAttempts = 0;
        //*This function will start the tween with fruits and equation
        //* also sets the position of the fruits
        _this.called_me = true;
        _this.wrongAns = false;
        console.log("startDisplayFruits +++++++");
        _this.eqGroup = _this.add.group();
        _this.bx1Group = _this.add.group();

        if (_this.bucket1.inputEnabled == false) _this.bucket1.inputEnabled = true;
        if (_this.bucket2.inputEnabled == false) _this.bucket2.inputEnabled = true;
        if (_this.bucket3.inputEnabled == false) _this.bucket3.inputEnabled = true;

        //     //*1= muskmelon1, 2= banana, 3=watermelon, 4=muskmelon2
        _this.shuffTheFruits = [1, 2, 3, 4];//_this.shuffTheFruits = [1, 2, 3, 4];
        _this.shuffleArray(_this.shuffTheFruits);
        if (_this.shuffTheFruits[0] == 1) _this.fruitToDisplay = "muskMelon1";
        if (_this.shuffTheFruits[0] == 2) _this.fruitToDisplay = "banana";
        if (_this.shuffTheFruits[0] == 3) _this.fruitToDisplay = "waterMelon";
        if (_this.shuffTheFruits[0] == 4) _this.fruitToDisplay = "muskMelon2";

        //  _this.eqGroup.addChild(_this.fruitToDisplay);

        _this.fruit = _this.add.image(730, 70, _this.fruitToDisplay);
        _this.eqGroup.addChild(_this.fruit);
        if (_this.termsArray[_this.count1] == 3 && _this.fruitToDisplay == 'muskMelon1') {
            console.log("hey")
            _this.fruit.scale.setTo(1.1, 1);
        }

        // _this.string = _this.monomialArray[_this.count1];
        // var len =  _this.string.length;
        console.log(" _this.string ^^^^^^^^^^^", _this.monomialArray[_this.count1].length);

        if (_this.termsArray[_this.count1] == 1) {

            console.log("MONOOOOOO");
            if (_this.monomialArray[_this.count1].length < 5) {
                if (_this.fruitToDisplay == "muskMelon1" || _this.fruitToDisplay == "banana") _this.equationText = _this.add.text(800, 105, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "waterMelon") _this.equationText = _this.add.text(800, 90, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "muskMelon2") _this.equationText = _this.add.text(805, 100, _this.monomialArray[_this.count1]);
            } else {
                if (_this.fruitToDisplay == "muskMelon1" || _this.fruitToDisplay == "banana") _this.equationText = _this.add.text(785, 105, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "waterMelon") _this.equationText = _this.add.text(790, 90, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "muskMelon2") _this.equationText = _this.add.text(795, 100, _this.monomialArray[_this.count1]);
            }

        } else if (_this.termsArray[_this.count1] == 2) {
            console.log("Bioooooo");
            if (_this.monomialArray[_this.count1].length < 8) {
                if (_this.fruitToDisplay == "banana") _this.equationText = _this.add.text(786, 110, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "muskMelon1") _this.equationText = _this.add.text(785, 100, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "waterMelon") _this.equationText = _this.add.text(785, 90, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "muskMelon2") _this.equationText = _this.add.text(785, 95, _this.monomialArray[_this.count1]);
            } else if (_this.monomialArray[_this.count1].length == 8) {
                if (_this.fruitToDisplay == "banana") _this.equationText = _this.add.text(775, 110, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "muskMelon1") _this.equationText = _this.add.text(767, 100, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "waterMelon") _this.equationText = _this.add.text(775, 90, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "muskMelon2") _this.equationText = _this.add.text(770, 95, _this.monomialArray[_this.count1]);
            }
            else {
                if (_this.fruitToDisplay == "banana") _this.equationText = _this.add.text(767, 110, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "muskMelon1") _this.equationText = _this.add.text(760, 100, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "waterMelon") _this.equationText = _this.add.text(765, 90, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "muskMelon2") _this.equationText = _this.add.text(765, 95, _this.monomialArray[_this.count1]);
            }
            // _this.equationText = _this.add.text(765, 90, _this.monomialArray[_this.count1]);
        }
        else {
            console.log("Triooooo");
            if (_this.monomialArray[_this.count1].length < 8) {
                if (_this.fruitToDisplay == "muskMelon1") _this.equationText = _this.add.text(770, 100, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "banana") _this.equationText = _this.add.text(770, 100, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "waterMelon") _this.equationText = _this.add.text(765, 85, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "muskMelon2") _this.equationText = _this.add.text(775, 90, _this.monomialArray[_this.count1]);
            } else if (_this.monomialArray[_this.count1].length == 8) {
                if (_this.fruitToDisplay == "muskMelon1") _this.equationText = _this.add.text(770, 95, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "banana") _this.equationText = _this.add.text(760, 100, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "waterMelon") _this.equationText = _this.add.text(770, 85, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "muskMelon2") _this.equationText = _this.add.text(765, 90, _this.monomialArray[_this.count1]);
            }
            else {
                if (_this.fruitToDisplay == "muskMelon1") _this.equationText = _this.add.text(760, 95, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "banana") _this.equationText = _this.add.text(760, 100, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "waterMelon") _this.equationText = _this.add.text(755, 85, _this.monomialArray[_this.count1]);
                if (_this.fruitToDisplay == "muskMelon2") _this.equationText = _this.add.text(755, 95, _this.monomialArray[_this.count1]);
            }

        }
        /// _this.equationText = _this.add.text(800, 100, _this.monomialArray[_this.count1]);
        _this.applyingStyle(_this.equationText);
        _this.eqGroup.addChild(_this.equationText);

        if (_this.monomialArray[_this.count1].length > 13) _this.equationText.fontSize = 22;

        //* if count1 == 0 then show a hand symbol below the eqGroup show the equation and then 
        //* show hand symbol clicking on the particular basket
        //* once this done then start with the tweening
        if (_this.numberOfQuestions == 0 && _this.demo == 0) {
            _this.showDemo();
        } else {

            _this.startMainTween();
        }
    },

    startMainTween: function () {
        _this.enableBaskets();
        _this.fruitTween = _this.add.tween(_this.eqGroup);
        _this.fruitTween.to({ x: 0, y: 370 }, 4500, 'Linear', true, 0);
        _this.fruitTween.start();


        _this.fruitTween.onComplete.add(function () {
            _this.bucket1.inputEnabled = false;
            _this.bucket2.inputEnabled = false;
            _this.bucket3.inputEnabled = false;

            if (_this.wrongAns == true) {
                console.log("fruitTween.onComplete ------");
                _this.count1++;
                console.log(_this.count1, "_this.count1");
                if (_this.count1 >= _this.monomialArray.length) {
                    console.log("  if(_this.count1 > _this.monomialArray.length)");
                    _this.count1 = 0;
                }
                _this.eqGroup.destroy();
                _this.startDisplayFruits();
            } else {
                _this.failure_honk.play();

                _this.time.events.add(1800, function () {
                    console.log("fruitTween.onComplete ------");
                    _this.count1++;
                    console.log(_this.count1, "_this.count1");
                    if (_this.count1 >= _this.monomialArray.length) {
                        console.log("  if(_this.count1 > _this.monomialArray.length)");
                        _this.count1 = 0;
                    }
                    _this.eqGroup.destroy();
                    _this.startDisplayFruits();
                })
            }

            // console.log("fruitTween.onComplete ------");
            // _this.count1++;
            // console.log(_this.count1, "_this.count1");
            // if (_this.count1 >= _this.monomialArray.length) {
            //     console.log("  if(_this.count1 > _this.monomialArray.length)");
            //     _this.count1 = 0;
            // }
            // _this.eqGroup.destroy();
            // _this.startDisplayFruits();
        })
    },

    showDemo: function () {
        _this.demo = 1;
        _this.hand = _this.add.image(750, 130, 'hand');
        _this.hand.scale.setTo(0.65);

        _this.tweenHandShow = _this.add.tween(_this.hand);
        _this.tweenHandShow.to({ x: 840, y: 130 }, 800, 'Linear', true, 0);
        _this.tweenHandShow.start();

        _this.tweenHandShow.onComplete.add(function () {
            _this.tweenHandShow1 = _this.add.tween(_this.hand);
            if (_this.termsArray[_this.count1] == 1) _this.xX = 130;
            if (_this.termsArray[_this.count1] == 2) _this.xX = 350;
            if (_this.termsArray[_this.count1] == 3) _this.xX = 570;
            _this.tweenHandShow1.to({ x: _this.xX, y: 450 }, 1000, 'Linear', true, 0);
            _this.tweenHandShow1.start();

            _this.tweenHandShow1.onComplete.add(function () {
                _this.time.events.add(1000, function () {
                    _this.hand.destroy();
                })
                _this.startMainTween();

            })
        })

    },

    bucket1IsClicked: function () {
        //*actions to be done when the first bucket is clicked
        _this.bucket1.inputEnabled = false;
        _this.bucket2.inputEnabled = false;
        _this.bucket3.inputEnabled = false;
        //*Validate the Correct answer 
        if (_this.termsArray[_this.count1] == 1) {

            console.log("YES!");
            _this.fruitTween.stop();

            // _this.bucketDrop.play();
            _this.time.events.add(700, function () {
                _this.bucketDrop.play();
                console.log("New Tween !!");
                _this.newTween = _this.add.tween(_this.eqGroup).to({ x: -700, y: _this.basket1Y }, 1000, 'Linear', true, 0);
                //   newTween.to({ x:35, y: 480 }, 1000, 'Linear', true, 0);
                _this.newTween.start();
                _this.basket1Y = _this.basket1Y - 45;
                console.log(_this.basket1Y, "basket1Y");

                _this.newTween.onComplete.add(function () {
                    //* Add new object instead of old one
                    //add fruit//add text
                    _this.newFruit = _this.add.image(_this.bx1NewX, _this.bx1NewY, _this.fruitToDisplay);
                    if (_this.fruitToDisplay == 'banana') {
                        _this.newFruit.scale.setTo(0.9, 0.8);
                    } else { _this.newFruit.scale.setTo(0.9, 0.9); }
                    _this.neweEquationText = _this.add.text(_this.bx1TextNewX, _this.bx1TextNewY, _this.monomialArray[_this.count1]);
                    _this.applyingStyle1(_this.neweEquationText);

                    _this.noofAttempts++;
                    _this.bucket1.bringToTop();
                    _this.starActions();
                    //  _this.count1++;
                    _this.wrongAns = true;
                    _this.celebrationSound.play();
                    _this.eqGroup.destroy();

                    _this.bx1NewY = _this.bx1NewY - 45;
                    _this.bx1TextNewY = _this.bx1TextNewY - 45;

                    console.log(_this.monomialArray, " before slice")
                    //
                    _this.monomialArray.splice(_this.count1, 1);
                    console.log(_this.monomialArray, " after slice")
                    _this.termsArray.splice(_this.count1, 1);

                    if (_this.count1 >= _this.monomialArray.length) {
                        console.log("Splice and check")
                        _this.count1 = 0;
                    }

                    _this.time.events.add(4000, () => {
                        // _this.clearAll();
                        if (_this.numberOfQuestions == 6) {
                            _this.basket1Y = 360;
                            _this.basket2Y = 360;
                            _this.basket3Y = 360;
                            _this.state.start('score', true, false,gameID, _this.microConcepts);
                        }
                        else {
                            //  _this.QuestionFormation();
                            _this.startDisplayFruits();
                        }
                    });
                })
            })

        } else {
            _this.noofAttempts++;
            _this.wrongAns = true;

            _this.wrongSound.play();

            _this.bucket1.inputEnabled = false;
            _this.bucket2.inputEnabled = false;
            _this.bucket3.inputEnabled = false;

        }
    },

    bucket2IsClicked: function () {
        //*actions to be done when the second bucket is clicked
        _this.bucket1.inputEnabled = false;
        _this.bucket2.inputEnabled = false;
        _this.bucket3.inputEnabled = false;
        if (_this.termsArray[_this.count1] == 2) {

            console.log("YES!");
            _this.fruitTween.stop();
            //  _this.bucketDrop.play();

            _this.time.events.add(700, function () {
                _this.bucketDrop.play();
                console.log("New Tween !!");
                _this.newTween = _this.add.tween(_this.eqGroup).to({ x: -470, y: _this.basket2Y }, 1000, 'Linear', true, 0);
                //   newTween.to({ x:35, y: 480 }, 1000, 'Linear', true, 0);
                _this.newTween.start();
                _this.basket2Y = _this.basket2Y - 45;

                _this.newTween.onComplete.add(function () {

                    _this.newFruit = _this.add.image(_this.bx2NewX, _this.bx2NewY, _this.fruitToDisplay);
                    if (_this.fruitToDisplay == 'banana') {
                        _this.newFruit.scale.setTo(0.9, 0.8);
                    } else { _this.newFruit.scale.setTo(0.9, 0.9); }
                    if (_this.monomialArray[_this.count1].length >= 10) _this.bx2TextNewX = _this.bx2TextNewX - 6;
                    _this.equationText = _this.add.text(_this.bx2TextNewX, _this.bx2TextNewY, _this.monomialArray[_this.count1]);
                    _this.applyingStyle1(_this.equationText);

                    _this.noofAttempts++;
                    _this.bucket2.bringToTop();
                    _this.starActions();
                    //  _this.count1++;
                    _this.wrongAns = true;
                    _this.celebrationSound.play();
                    _this.eqGroup.destroy();

                    _this.bx2NewY = _this.bx2NewY - 45;
                    _this.bx2TextNewY = _this.bx2TextNewY - 45;

                    console.log(_this.monomialArray, " before slice")
                    //
                    _this.monomialArray.splice(_this.count1, 1);
                    console.log(_this.monomialArray, " after slice")
                    _this.termsArray.splice(_this.count1, 1);

                    if (_this.count1 >= _this.monomialArray.length) {
                        console.log("Splice and check")
                        _this.count1 = 0;
                    }

                    _this.time.events.add(4000, () => {
                        // _this.clearAll();
                        if (_this.numberOfQuestions == 6) {
                            _this.state.start('score', true, false,gameID, _this.microConcepts);
                        }
                        else {
                            // _this.QuestionFormation();
                            _this.startDisplayFruits();
                        }
                    });
                })
            })

        } else {
            _this.noofAttempts++;
            _this.wrongAns = true;
            _this.wrongSound.play();
            _this.bucket1.inputEnabled = false;
            _this.bucket2.inputEnabled = false;
            _this.bucket3.inputEnabled = false;

        }
    },

    bucket3IsClicked: function () {
        //*actions to be done when the third bucket is clicked
        _this.bucket1.inputEnabled = false;
        _this.bucket2.inputEnabled = false;
        _this.bucket3.inputEnabled = false;
        if (_this.termsArray[_this.count1] == 3) {

            console.log("YES!");
            _this.fruitTween.stop();
            // _this.bucketDrop.play();

            _this.time.events.add(700, function () {
                _this.bucketDrop.play();
                console.log("New Tween !!");
                _this.newTween = _this.add.tween(_this.eqGroup).to({ x: -250, y: _this.basket3Y }, 1000, 'Linear', true, 0);
                //   newTween.to({ x:35, y: 480 }, 1000, 'Linear', true, 0);
                _this.newTween.start();
                _this.basket3Y = _this.basket3Y - 45;

                _this.newTween.onComplete.add(function () {

                    _this.newFruit = _this.add.image(_this.bx3NewX, _this.bx3NewY, _this.fruitToDisplay);
                    if (_this.fruitToDisplay == 'banana') {
                        _this.newFruit.scale.setTo(0.9, 0.8);
                    } else { _this.newFruit.scale.setTo(0.9, 0.9); }
                    if (_this.monomialArray[_this.count1].length < 8) _this.bx3TextNewX = _this.bx3TextNewX + 5;
                    _this.equationText = _this.add.text(_this.bx3TextNewX, _this.bx3TextNewY, _this.monomialArray[_this.count1]);
                    _this.applyingStyle1(_this.equationText);

                    _this.noofAttempts++;
                    _this.bucket3.bringToTop();
                    _this.starActions();
                    // _this.count1++;
                    _this.wrongAns = true;
                    _this.celebrationSound.play();
                    _this.eqGroup.destroy();

                    _this.bx3NewY = _this.bx3NewY - 45;
                    _this.bx3TextNewY = _this.bx3TextNewY - 45;

                    console.log(_this.monomialArray, " before slice")
                    //
                    _this.monomialArray.splice(_this.count1, 1);
                    console.log(_this.monomialArray, " after slice")
                    _this.termsArray.splice(_this.count1, 1);

                    if (_this.count1 >= _this.monomialArray.length) {
                        console.log("Splice and check")
                        _this.count1 = 0;
                    }


                    _this.time.events.add(4000, () => {
                        // _this.clearAll();
                        if (_this.numberOfQuestions == 6) {
                            _this.state.start('score', true, false,gameID, _this.microConcepts);
                        }
                        else {
                            //  _this.QuestionFormation();
                            _this.startDisplayFruits();
                        }
                    });
                })
            })

        } else {
            _this.noofAttempts++;
            _this.wrongAns = true;
            _this.wrongSound.play();
            _this.bucket1.inputEnabled = false;
            _this.bucket2.inputEnabled = false;
            _this.bucket3.inputEnabled = false;

        }
    },

    //applying the style to the text in the answerbox.
    applyingStyle: function (target) {
        //* Black text
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#000000';
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '23px';
    },
    applyingStyle1: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#000000';
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '21px';
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
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/AL-SUB-G7/" +
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
            // if (_this.hintBtn) {
            //     _this.hintBtn.inputEnabled = true;
            //     _this.hintBtn.input.useHandCursor = true;
            // }

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
        _this.demoVideo_1.changeSource("demoVideos/AL-SUB-G7.mp4");
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
            // if (_this.hintBtn) {
            //     _this.hintBtn.inputEnabled = true;
            //     _this.hintBtn.input.useHandCursor = true;
            // }
            _this.game.paused = false;

        });
    }
}
