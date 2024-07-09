Game.NSD_6_G7level1 = function () { };


Game.NSD_6_G7level1.prototype =
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

        _this.successSound = document.createElement('audio');
        _this.successSoundsrc = document.createElement('source');
        _this.successSoundsrc.setAttribute("src", window.baseUrl + "sounds/Success.mp3");
        _this.successSound.appendChild(_this.successSoundsrc);

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

        _this.framechange = document.createElement('audio');
        _this.framechangesrc = document.createElement('source');
        _this.framechangesrc.setAttribute("src", window.baseUrl + "sounds/Frame_change_sound.mp3");
        _this.framechange.appendChild(_this.framechangesrc);

        _this.snapSound = document.createElement('audio');
        _this.snapSoundsrc = document.createElement('source');
        _this.snapSoundsrc.setAttribute("src", window.baseUrl + "sounds/snapSound.mp3");
        _this.snapSound.appendChild(_this.snapSoundsrc);

        _this.Ask_Question1 = _this.createAudio("NSD_6_G7_a1");//Drag the whole number squares, decimal strips and square pieces to represent the dividend and the divisor.
        _this.Ask_Question2 = _this.createAudio("NSD_6_G7_a2");//Overlap the divisor to find out how many of the divisors are there in the dividend.
        _this.Ask_Question3 = _this.createAudio("NSD_6_G7_a3");//Count and type the answer.

        //edited for baseurl apk
        telInitializer.gameIdInit("NSD_6_G7", gradeSelected);// first Tele call
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

        _this.microConcepts;

        _this.count1 = 0;
        _this.speakerbtn;
        _this.background;
        _this.starsGroup;

        _this.seconds = 0;
        _this.minutes = 0;
        _this.selectedAns1 = ''
        _this.selectedAns2 = ''
        _this.selectedAns3 = ''
        _this.reverseDemoShown = false;

        _this.part1 = false;
        _this.part2 = false;
        _this.part3 = false;
        _this.part4 = false;
        _this.finalAns = false;
        _this.signNotselected = false;

        _this.counterForTimer = 0;

        _this.speakerbtnClicked = false;
        _this.rightbtn_Clicked = false;

        _this.Question_flag = -1;
        valuesCombinations = [];

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.setBoundsToWorld();

        _this.background = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'bg');
        //** include the background file, navigation bar, stars, timer objects.

        _this.navBar = _this.add.sprite(0, 0, 'navBar');

        _this.backbtn = _this.add.sprite(5, 6, 'backbtn');
        _this.backbtn.inputEnabled = true;
        _this.backbtn.input.useHandCursor = true;
        _this.backbtn.events.onInputDown.add(function () {
            _this.state.start('grade7NumberSystems', true, false);
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

        _this.numGroup;
        _this.grid = [];
        _this.greenBoxArr = [];
        _this.orangeBoxArr = []

        //BULB
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
            console.log("inside hintbutton function");
            //* show the demo video
            _this.hintBtn.inputEnabled = false;
            _this.hintBtn.input.useHandCursor = false;
            _this.time.events.add(1, function () {
                //console.log(_this.hintBtn.inputEnabled, "status of hintBtn");
                _this.ViewDemoVideo();
            });
        });

        _this.generateStarsForTheScene(6);

        //* start the game with first question
        _this.time.events.add(1000, _this.getQuestion);

        _this.questionid = 1;
    },


    createAudio: function (src) {
        audio = document.createElement('audio');
        audiosrc = document.createElement('source');
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/NSD-6-G7/" + _this.languageSelected + "/" + src + ".mp3");
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
    getQuestion: function (target) {
        if (_this.timer) {
            _this.timer.stop();
            _this.timer = null;
        }
        _this.timer = _this.time.create(false);

        //  Set a TimerEvent to occur after 2 seconds
        _this.timer.loop(1000, function () {
            _this.hintBtn.inputEnabled = true;
            _this.hintBtn.input.useHandCursor = true;
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


        // Stores Random Question values in Array
        // _this.StoreArrayValues();

        _this.Initial_randomization();
        _this.MakeSideBar();

        _this.hintBtn.inputEnabled = true;
        _this.hintBtn.input.useHandCursor = true;
        _this.hint_flag = 1;

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
    // here we shuffling the array.
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

    // randomization. we have 2 set of question. one set is for whole number answer. and second set is decimal number answer. 
    Initial_randomization: function () {
        ///* x/y = z. First 3 questions where z is whole number

        //* declare the array of possible Y values.
        //   Yarray = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9]

        // Find random number below 50: e.g Z = 13
        //         Z = random(from 0 to 50)

        //* Choose a random Y from Yarray such that Y*Z <= 5.
        //* When z= 13, only we can go up to 0.3 in the array (because 0.4*13 = 5.2 which is > 5)
        //* that is maximum array index till where we should search is 2 (which has 0.3)
        // max_index = trunc((5 / 13) * 10) = 3 - 1 = 2

        //* find a random number from 0 to max_index
        // i = random(from 0 till max_index)
        // Y = Yarray[i];  //* so this will give Y = 0.1 or 0.2 or 0.3
        // X = Y * Z = 0.1 * 13 = 1.3.

        // y = 0.1, x= y*z = 0.1 * 10 = 1
        // when z = 10 max_index = 4
        //if y = 0.2 x = 0.2 * 10 = 2
        //

        // second set question x/y = z
        // fraction=Math.floor(3*Math.random());
        // decimal=fraction 0 means 0.25, 1 means 0.5, 2 means 0.75;
        // y.whole=Math.floor(2*Math.random());
        // y.fraction=if y.whole is 1 then (if fraction is 0 or 2 then 0.2 or 0.6, else 0.2, 0.4, 0.6, or 0.8), else (if fraction is 0 or 2 then 0.4 or 0.8, else 0.2, 0.4, 0.6, or 0.8);
        // limit=*if(y==0.2){25}
        // else if(y==0.4){if(fraction==2){12}else{13}}
        // else if(y==0.6){8}
        // else if(y==0.8){if(fraction==0){7}else{6}}
        // else if(y==1.2){4}
        // else if(y==1.4){4}
        // else if(y==1.6){2}
        // else{2}
        // *
        // nonDecimal=Math.floor(limit*Math.random());
        // answer=decimal+nonDecimal;
        // x=y*answer;

        _this.Aarray = [];
        _this.Yarray = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9];
        _this.Zarray = [];
        _this.Barray = [];

        for (i = 0; i < 3; i++) {

            _this.answerZ = Math.floor(Math.random() * 20); //0 to 49//50

            max_index = Math.trunc((5 / _this.answerZ) * 10) - 1;

            if (max_index > 19) max_index = 19;

            let i = Math.floor(Math.random() * max_index);
            _this.denominatorB = _this.Yarray[i];
            _this.numeratorA = Number((_this.denominatorB * _this.answerZ).toFixed(1));

            while (Number.isInteger(_this.numeratorA) || _this.numeratorA == _this.denominatorB || _this.numeratorA < _this.denominatorB || _this.Barray.includes(_this.denominatorB) || _this.Aarray.includes(_this.numeratorA)) {//_this.numeratorA % 10
                _this.answerZ = Math.floor(Math.random() * 20); //0 to 50//50

                max_index = Math.trunc((5 / _this.answerZ) * 10) - 1;
                if (max_index > 19) max_index = 19;
                let i = Math.floor(Math.random() * max_index);
                _this.denominatorB = _this.Yarray[i];
                _this.numeratorA = Number((_this.denominatorB * _this.answerZ).toFixed(1));

            }

            _this.Aarray.push(_this.numeratorA);
            _this.Barray.push(_this.denominatorB);
            _this.Zarray.push(_this.answerZ);

        }

        for (i = 3; i < 6; i++) {

            _this.yArrFraction = [0.2, 0.6];
            _this.yArrFraction = _this.shuffle(_this.yArrFraction);

            _this.yArrFractionOne = [0.4, 0.8];
            _this.yArrFractionOne = _this.shuffle(_this.yArrFractionOne);

            _this.yArrFraction2 = [0.2, 0.4, 0.6, 0.8];
            _this.yArrFraction2 = _this.shuffle(_this.yArrFraction2);

            limit = [25, 12, 13, 8, 7, 6, 4, 4, 2, 2];

            _this.decimalArray = [0.25, 0.5, 0.75];

            _this.fraction = Math.floor(Math.random() * 3);
            _this.decimal = _this.decimalArray[_this.fraction];

            _this.yWhole = Math.floor(Math.random() * 2);

            if (_this.yWhole == 1) {
                if (_this.fraction == 0 || _this.fraction == 2)
                    _this.denominatorB = _this.yArrFraction[_this.yWhole];
                else
                    _this.denominatorB = _this.yArrFraction2[_this.yWhole];
            }
            else {
                if (_this.fraction == 0 || _this.fraction == 2)
                    _this.denominatorB = _this.yArrFractionOne[_this.yWhole];//0.2
                else
                    _this.denominatorB = _this.yArrFraction2[_this.yWhole];
            }

            _this.denominatorB += _this.yWhole;
            if (_this.denominatorB == 0.2) {
                limit = 24;
            }
            else if (_this.denominatorB == 0.4) {
                if (_this.fraction == 2)
                    limit = 11;
                else
                    limit = 12;

            }
            else if (_this.denominatorB == 0.6) {
                limit = 7;
            }
            else if (_this.denominatorB == 0.8) {
                if (_this.fraction == 0)
                    limit = 6;
                else
                    limit = 5;

            }
            else if (_this.denominatorB == 1.2) {
                limit = 3;
            }
            else if (_this.denominatorB == 1.4) {
                limit = 3;
            }
            else if (_this.denominatorB == 1.6) {
                limit = 1;
            }
            else {
                limit = 1;
            }
            _this.nonDecimal = Math.floor(Math.random() * limit);
            _this.answerZ = _this.decimal + _this.nonDecimal;
            _this.numeratorA = Number((_this.denominatorB * _this.answerZ).toFixed(1));//1.8

            while (Number.isInteger(_this.numeratorA) || _this.numeratorA == _this.denominatorB || _this.numeratorA < _this.denominatorB || _this.Aarray.includes(_this.numeratorA)) {//_this.numeratorA % 10
                _this.fraction = Math.floor(Math.random() * 3);
                _this.decimal = _this.decimalArray[_this.fraction];
                _this.yWhole = Math.floor(Math.random() * 2);

                if (_this.yWhole == 1) {
                    if (_this.fraction == 0 || _this.fraction == 2)
                        _this.denominatorB = _this.yArrFraction[_this.yWhole];
                    else
                        _this.denominatorB = _this.yArrFraction2[_this.yWhole];
                }
                else {
                    if (_this.fraction == 0 || _this.fraction == 2)
                        _this.denominatorB = _this.yArrFractionOne[_this.yWhole];
                    else
                        _this.denominatorB = _this.yArrFraction2[_this.yWhole];
                }
                _this.denominatorB += _this.yWhole;
                if (_this.denominatorB == 0.2) {
                    limit = 24;
                }
                else if (_this.denominatorB == 0.4) {
                    if (_this.fraction == 2)
                        limit = 11;
                    else
                        limit = 12;

                }
                else if (_this.denominatorB == 0.6) {
                    limit = 7;
                }
                else if (_this.denominatorB == 0.8) {
                    if (_this.fraction == 0)
                        limit = 6;
                    else
                        limit = 5;

                }
                else if (_this.denominatorB == 1.2) {
                    limit = 3;
                }
                else if (_this.denominatorB == 1.4) {
                    limit = 3;
                }
                else if (_this.denominatorB == 1.6) {
                    limit = 1;
                }
                else {
                    limit = 1;
                }
                _this.nonDecimal = Math.floor(Math.random() * limit);
                _this.answerZ = _this.decimal + _this.nonDecimal;
                _this.numeratorA = Number((_this.denominatorB * _this.answerZ).toFixed(1));

            }
            _this.Aarray.push(_this.numeratorA);
            _this.Barray.push(_this.denominatorB);
            _this.Zarray.push(_this.answerZ);

        }

        // _this.answerZ = 50;
        // _this.denominatorB = 0.2;
        // _this.numeratorA = 0.4;//4.4

        // _this.Aarray.push(_this.numeratorA);
        // _this.Barray.push(_this.denominatorB);
        // _this.Zarray.push(_this.answerZ);

        console.log(_this.Aarray, "_this.Aarray");
        console.log(_this.Barray, "_this.barray");
        console.log(_this.Zarray, "_this.zarray");

    },

    //side gray part with ojects.
    MakeSideBar: function () {
        _this.noofAttempts = 0;
        _this.AnsTimerCount = 0;
        _this.sceneCount++;
        _this.sideGray = _this.add.sprite(20, 170, 'panel_1');//30
        _this.finalPart = false;

        _this.greenStripe = _this.add.sprite(37, 184, 'greenBox')
        _this.greenStripe.scale.setTo(0.9);

        _this.orangeStripe = _this.add.sprite(75, 320, 'orangeBox')
        _this.orangeStripe.scale.setTo(0.9);

        _this.yellowStripe = _this.add.sprite(80, 190, 'yellowBox')
        _this.yellowStripe.scale.setTo(0.4);

        _this.reverse = _this.add.sprite(50, 210, 'reverse');

        _this.sideGray.addChild(_this.reverse)
        _this.showInitialScreen();


    },

    //initial screen loading.
    showInitialScreen: function () {
        _this.green_flag = 0;
        _this.grayBox = null;
        _this.grayBox2 = null;
        _this.firstGrp = null;
        _this.Question_flag = 1;
        _this.rverseclick = 0;
        _this.part1 = true;
        _this.fourNotEntered = false;
        if (_this.count1 == 0)
            _this.Ask_Question1.play();
        _this.x = 217;//250
        _this.xx = 350;
        _this.xstrike = 220;//252
        _this.xstrike2 = 360;
        _this.xstrike3 = 500;
        _this.xstrike4 = 640;

        _this.cubegrp = false;

        _this.questionBox = _this.add.sprite(70, 90, 'Text box_1')

        _this.workSpace2 = _this.add.sprite(210, 70, 'panel_3');//235
        _this.workSpace2.scale.setTo(1.05, 1);//0.73
        _this.workSpace2.visible = false;

        _this.workSpace = _this.add.sprite(235, 70, 'panel_2');//235
        _this.workSpace.scale.setTo(0.73, 0.75);
        _this.rightbtn = _this.add.sprite(860, 460, 'TickBtn')
        _this.rightbtn.inputEnabled = true;
        _this.rightbtn.input.useHandCursor = true;
        _this.rightbtn.events.onInputDown.add(_this.firstEvaluation, _this)

        _this.yellowBox = _this.add.sprite(12, 17, 'yellowTextbox')
        _this.questionBox.addChild(_this.yellowBox)
        _this.yellowBox.scale.setTo(1.7, 1)

        if (Math.round(_this.Aarray[_this.count1] * 100) % 10 == 0) {
            _this.n1 = _this.add.text(18, 19, _this.Aarray[_this.count1]);
            _this.yellowBox.scale.setTo(1.4, 1)
        }
        else {
            _this.n1 = _this.add.text(12, 19, _this.Aarray[_this.count1])
            _this.yellowBox.x = 8;

        }

        _this.questionBox.addChild(_this.n1)
        _this.applyingStyle(_this.n1);
        _this.n1.fill = '#FF0000';
        if (Math.round(_this.Aarray[_this.count1] * 100) % 10 == 0)
            _this.divideSign(134, 125);
        else
            _this.divideSign(134, 125);

        _this.yellowBox3 = _this.add.sprite(84, 17, 'yellowTextbox')
        _this.questionBox.addChild(_this.yellowBox3)
        _this.yellowBox3.visible = false;
        _this.yellowBox3.scale.setTo(1.65, 1);

        if (Math.round(_this.Barray[_this.count1] * 100) % 10 == 0) {
            _this.n2 = _this.add.text(89, 19, _this.Barray[_this.count1])
            _this.yellowBox3.scale.setTo(1.4, 1);
        }
        else {
            _this.n2 = _this.add.text(79, 19, _this.Barray[_this.count1])
            _this.yellowBox3.x = 77;
            _this.n1.x -= 2
            _this.yellowBox.x -= 2;
        }

        _this.questionBox.addChild(_this.n2)
        _this.applyingStyle(_this.n2);
        _this.n2.fill = '#FF0000';


        // Colors group
        _this.orangeGrp = _this.add.group();
        _this.yellowGrp = _this.add.group();
        _this.ggreenGrp = _this.add.group();

        _this.orangeGrp2 = _this.add.group();
        _this.yellowGrp2 = _this.add.group();
        _this.ggreenGrp2 = _this.add.group();
        _this.ggreenGrp2cpy = _this.add.group();

        _this.greenGrp = [];

        _this.greenyellowGrp = _this.add.group();


        _this.EnableBoxes();
        _this.lastX = 257;//257
        _this.part1 = true;
        _this.lastXArr = [0, 1];

        _this.lastX2 = 640;
        _this.lastX3 = 425;
        _this.lastX4 = 760;

        _this.eraser = _this.add.sprite(128, 380, 'eraser');
        _this.eraser.inputEnabled = true;
        _this.eraser.input.useHandCursor = true;
        _this.eraser.input.enableDrag(true);
        _this.eraser.events.onDragUpdate.add(_this.eraserUpdate, _this);
        _this.eraser.events.onDragStop.add(_this.eraserDrop, _this);


        _this.fourNotEntered = false;
        _this.fouransLen = 0;
        _this.finalval = '';
        _this.dotselected = false;
        _this.grayGrp = _this.add.group();

        _this.grayBoxEmty = [];
        _this.grayBox2Emty = [];
        for (j = 0; j < 100; j++) {
            _this.grayBoxEmty[j] = -1;
            _this.grayBox2Emty[j] = -1;
        }
        _this.gray = _this.add.group();

    },

    //enabling the objects for dragging
    EnableBoxes: function () {
        _this.greenStripecpy = _this.add.sprite(37, 184, 'greenBox')
        _this.greenStripecpy.scale.setTo(0.9);

        _this.orangeStripecpy = _this.add.sprite(75, 320, 'orangeBox')
        _this.orangeStripecpy.scale.setTo(0.9);

        _this.yellowStripecpy = _this.add.sprite(80, 190, 'yellowBox')
        _this.yellowStripecpy.scale.setTo(0.4);

        _this.yellowStripecpy.inputEnabled = true;
        _this.yellowStripecpy.input.useHandCursor = true;
        _this.yellowStripecpy.input.enableDrag(true);
        _this.yellowStripecpy.events.onDragUpdate.add(_this.dragUpdate, _this);
        _this.yellowStripecpy.events.onDragStop.add(_this.dragStop, _this);

        // _this.orangeStripecpy.inputEnabled = true;
        // _this.orangeStripecpy.input.enableDrag(true);
        // _this.orangeStripecpy.events.onDragUpdate.add(_this.dragUpdate, _this);
        // _this.orangeStripecpy.events.onDragStop.add(_this.dragStop, _this);

        _this.greenStripecpy.inputEnabled = true;
        _this.greenStripecpy.input.useHandCursor = true;
        _this.greenStripecpy.input.enableDrag(true);
        _this.greenStripecpy.events.onDragUpdate.add(_this.dragUpdate, _this);
        _this.greenStripecpy.events.onDragStop.add(_this.dragStop, _this);

    },
    disableBoxes: function () {
        _this.greenStripecpy.destroy();
        _this.orangeStripecpy.destroy();
        _this.yellowStripecpy.destroy();

    },
    reCreatehrGrp: function () {
        _this.disableBoxes();
        _this.EnableBoxes();

    },

    //dragging function for the first workspace
    dragUpdate: function (target) {
        target.bringToTop();
    },
    dragStop: function (target) {
        if (_this.checkOverlap(target, _this.workSpace)) {
            _this.snapSound.pause();
            _this.snapSound.currentTime = 0;

            if (_this.part1 == true) {

                if (target == _this.yellowStripecpy) {

                    if (_this.yellowGrp.children.length < 5) {
                        newBox = _this.add.sprite(_this.lastX + _this.yellowGrp.children.length * 10, 100 + _this.yellowGrp.children.length * 10, 'yellowBox');
                        newBox.scale.setTo(0.45, 0.52);//0.4
                        _this.yellowGrp.add(newBox);
                        _this.snapSound.play();
                    }
                }
                else if (target === _this.greenStripecpy) {
                    if (_this.ggreenGrp.children.length < 9) {
                        newGreenBox = _this.add.sprite(_this.lastX3 + _this.ggreenGrp.children.length * 15, 95, 'greenBox');
                        newGreenBox.scale.setTo(0.6, 0.55);
                        _this.ggreenGrp.add(newGreenBox);
                        _this.snapSound.play();
                    }
                }
            }
            if (_this.part2 == true) {
                if (target == _this.yellowStripecpy) {

                    if (_this.yellowGrp2.children.length < 1) {
                        newBox = _this.add.sprite(_this.lastX2 + _this.yellowGrp2.children.length * 10, 100 + _this.yellowGrp2.children.length * 10, 'yellowBox');
                        newBox.scale.setTo(0.4, 0.47);
                        _this.yellowGrp2.add(newBox);
                        _this.snapSound.play();
                    }
                }
                else if (target === _this.greenStripecpy) {
                    if (_this.ggreenGrp2.children.length < 9) {
                        newGreenBox = _this.add.sprite(_this.lastX4 + _this.ggreenGrp2.children.length * 15, 95, 'greenBox');
                        newGreenBox.scale.setTo(0.6, 0.5);
                        _this.ggreenGrp2.add(newGreenBox);
                        _this.snapSound.play();
                    }
                }
            }
        }
        _this.reCreatehrGrp();

    },

    //re arranging the first space yellow part after dragging.
    reArrangeYellow: function () {
        x = _this.yellowGrp.children.length;
        _this.yellowGrp.destroy();
        _this.yellowGrp = _this.add.group();
        for (i = 0; i < x; i++) {
            newBox = _this.add.sprite(_this.lastX + i * 10, 100 + i * 10, 'yellowBox')
            newBox.scale.setTo(0.45, 0.52);
            _this.yellowGrp.add(newBox);
        }
    },
    //re arranging the second space yellow part after dragging.
    reArrangeYellowSecond: function () {
        x = _this.yellowGrp2.children.length;
        _this.yellowGrp2.destroy();
        _this.yellowGrp2 = _this.add.group();
        for (i = 0; i < x; i++) {
            newBox = _this.add.sprite(_this.lastX2 + i * 10, 100 + i * 10, 'yellowBox')
            newBox.scale.setTo(0.4, 0.47);
            _this.yellowGrp2.add(newBox);
        }
    },
    //re arranging the first space green part after dragging.
    reArrangeGreen: function () {
        x = _this.ggreenGrp.children.length;
        _this.ggreenGrp.destroy();
        _this.ggreenGrp = _this.add.group();
        for (i = 0; i < x; i++) {
            newGreenBox = _this.add.sprite(_this.lastX3 + i * 15, 95, 'greenBox')
            newGreenBox.scale.setTo(0.6, 0.55);
            _this.ggreenGrp.add(newGreenBox);
        }
    },
    //re arranging the second space green part after dragging.
    reArrangeGreenSecond: function () {
        x = _this.ggreenGrp2.children.length;
        _this.ggreenGrp2.destroy();
        _this.ggreenGrp2 = _this.add.group();
        for (i = 0; i < x; i++) {
            newGreenBox = _this.add.sprite(_this.lastX4 + i * 15, 95, 'greenBox')
            newGreenBox.scale.setTo(0.6, 0.5);
            _this.ggreenGrp2.add(newGreenBox);
        }
    },

    eraserUpdate: function (target) {
        _this.world.bringToTop(_this.eraser)
        _this.eraser.scale.setTo(0.8)
    },
    eraserDrop: function (target) {
        _this.NotErased = true

        if (_this.part1 == true) {

            if (_this.checkOverlap(target, _this.yellowGrp)) {

                for (i = 0; i < _this.yellowGrp.children.length; i++) {
                    if (_this.checkOverlap(target, _this.yellowGrp.getChildAt(i))) {
                        _this.yellowGrp.getChildAt(i).destroy();
                        _this.reArrangeYellow();

                        break;
                    }
                }
            }
            if (_this.checkOverlap(target, _this.ggreenGrp)) {

                for (i = 0; i < _this.ggreenGrp.children.length; i++) {
                    if (_this.checkOverlap(target, _this.ggreenGrp.getChildAt(i))) {
                        _this.ggreenGrp.getChildAt(i).destroy();
                        _this.reArrangeGreen();

                        break;
                    }
                }
            }
        }

        if (_this.part2 == true) {

            if (_this.checkOverlap(target, _this.yellowGrp2)) {

                for (i = 0; i < _this.yellowGrp2.children.length; i++) {
                    if (_this.checkOverlap(target, _this.yellowGrp2.getChildAt(i))) {
                        _this.yellowGrp2.getChildAt(i).destroy();
                        _this.reArrangeYellowSecond();

                        break;
                    }
                }
            }
            if (_this.checkOverlap(target, _this.ggreenGrp2)) {

                for (i = 0; i < _this.ggreenGrp2.children.length; i++) {
                    if (_this.checkOverlap(target, _this.ggreenGrp2.getChildAt(i))) {
                        _this.ggreenGrp2.getChildAt(i).destroy();
                        _this.reArrangeGreenSecond();

                        break;
                    }
                }
            }
        }

        target.x = 128;
        target.y = 380;
        _this.eraser.scale.setTo(1);

    },

    //first part validation of first workspace
    firstEvaluation: function (target) {
        _this.clickSound.play();
        if (_this.part1 == true) {
            _this.disableBoxes();
            if (Number(_this.yellowGrp.length + "." + _this.ggreenGrp.length) == _this.Aarray[_this.count1]) {
                _this.eraser.events.onDragStop.removeAll();
                _this.eraser.events.onDragUpdate.add(_this.eraserUpdate, _this);
                _this.eraser.events.onDragStop.add(_this.eraserDrop, _this);
                _this.noofAttempts++;
                _this.counterCelebrationSound.play();
                _this.part1 = false;
                _this.part2 = true;
                _this.yellowBox3.visible = true;
                _this.yellowBox.visible = false;
                _this.reCreatehrGrp();
                target.events.onInputDown.add(_this.SecondEvaluation, _this);
            }
            else {
                _this.noofAttempts++;
                _this.wrongans.play();
                _this.yellowGrp.destroy();
                _this.ggreenGrp.destroy();
                _this.reCreatehrGrp();
                _this.rightbtn.inputEnabled = true;
                _this.rightbtn.input.useHandCursor = true;
                _this.yellowGrp = _this.add.group();
                _this.ggreenGrp = _this.add.group();
            }
        }
    },

    //second part validation of first workspace
    SecondEvaluation: function () {
        _this.clickSound.play();
        if (_this.part2 == true) {
            _this.disableBoxes();
            if (Number(_this.yellowGrp2.length + "." + _this.ggreenGrp2.length) == _this.Barray[_this.count1]) {
                _this.eraser.inputEnabled = false;
                _this.rightbtn.inputEnabled = false;
                _this.rightbtn.frame = 1;
                _this.part2 = false;
                _this.part3 = true;
                _this.noofAttempts++;
                _this.counterCelebrationSound.play();

                _this.greenStripe.destroy();
                _this.yellowStripe.destroy();
                _this.orangeStripe.destroy();
                _this.yellowBox3.visible = false;

                _this.time.events.add(500, () => {
                    _this.workSpace2.visible = true;
                    _this.rightbtn.destroy();
                    _this.workSpace.visible = false;
                    _this.SecondSpaceTween();
                });

            }
            else {
                _this.noofAttempts++;
                _this.wrongans.play();
                _this.yellowGrp2.destroy();
                _this.ggreenGrp2.destroy();
                _this.reCreatehrGrp();
                _this.rightbtn.inputEnabled = true;
                _this.yellowGrp2 = _this.add.group();
                _this.ggreenGrp2 = _this.add.group();
            }
        }
    },

    //second space tweening part.
    SecondSpaceTween: function () {
        console.log("SecondSpaceTween");
        if (_this.yellowGrp2.length > 0) {
            yellowDragAction = _this.add.tween(_this.yellowGrp2);
            yellowDragAction.to({ x: -350, y: 186 }, 500, 'Linear', true, 0);//470
            yellowDragAction.start();
            _this.yellowGrp2.scale.setTo(0.6, 0.52); //width,height//0.59

            tempDragAction = _this.add.tween(_this.ggreenGrp2);
            tempDragAction.to({ x: -360, y: 194 }, 500, 'Linear', true, 0);//406           
            tempDragAction.start();
            _this.ggreenGrp2.scale.setTo(0.6, 0.47);//0.6, 0.39

            tempDragAction.onComplete.add(function () {

                if (_this.yellowGrp.length > 0) {
                    totGreenGrpCount = _this.ggreenGrp.length;
                    totGrpCount = _this.yellowGrp.length;
                    _this.yellowGrp.destroy();
                    _this.yellowGrp = _this.add.group();
                    _this.Xx = 220;//252

                    for (let i = 0; i < totGrpCount; i++) {
                        if (i == 0) _this.ggreenGrp.destroy();
                        newYellow = _this.add.sprite(_this.Xx, 100, 'yellowBox')
                        newYellow.scale.setTo(0.52, 0.6);//0.52, 0.5
                        _this.yellowGrp.addChild(newYellow);
                        _this.Xx += 140;

                        if (i == totGrpCount - 1) {
                            _this.ggreenGrp = _this.add.group();
                            _this.recreatingGreen();
                        }
                    }
                }
                else {
                    greenDragAction = _this.add.tween(_this.ggreenGrp);
                    greenDragAction.to({ x: -105, y: 17 }, 500, 'Linear', true, 0);
                    _this.ggreenGrp.scale.setTo(0.8, 0.55);//0.8, 0.55
                    greenDragAction.start();
                }
                _this.yellowgreenStrip();
                _this.enableDragDenominator();

            });
        }
        else {
            tempDragAction = _this.add.tween(_this.ggreenGrp2);
            tempDragAction.to({ x: -720, y: 100 }, 500, 'Linear', true, 0);//680
            tempDragAction.start();

            tempDragAction.onComplete.add(function () {
                totGreenGrpCount = _this.ggreenGrp.length;
                if (_this.yellowGrp.length > 0) {

                    totGrpCount = _this.yellowGrp.length;
                    _this.yellowGrp.destroy();
                    _this.yellowGrp = _this.add.group();
                    _this.Xx = 220;//252

                    for (let i = 0; i < totGrpCount; i++) {
                        if (i == 0) _this.ggreenGrp.destroy();
                        newYellow = _this.add.sprite(_this.Xx, 100, 'yellowBox')
                        newYellow.scale.setTo(0.52, 0.6);//0.52, 0.5
                        _this.yellowGrp.addChild(newYellow);
                        _this.Xx += 140;

                        if (i == totGrpCount - 1) {
                            _this.ggreenGrp = _this.add.group();
                            _this.recreatingGreen();
                        }
                    }
                }
                else {
                    // console.log("....")
                    greenDragAction = _this.add.tween(_this.ggreenGrp);
                    greenDragAction.to({ x: -168, y: -7 }, 500, 'Linear', true, 0);//150 //-162
                    _this.ggreenGrp.scale.setTo(0.907, 1.09);//0.895, 0.825
                    greenDragAction.start();
                }

                _this.enableDragDenominator();
                _this.Question_flag = 2;
                if (_this.count1 == 0) {
                    _this.Ask_Question2.play()
                }

            });
        }

        _this.rightbtn2 = _this.add.sprite(860, 460, 'TickBtn')
        _this.rightbtn2.inputEnabled = true;
        _this.rightbtn2.input.useHandCursor = true;
        _this.rightbtn2.events.onInputDown.add(_this.ThirdEvaluation, _this);

    },

    //recreating the yellow and green strip for the left side
    yellowgreenStrip: function () {
        for (let i = 0; i < _this.yellowGrp2.length; i++) {
            newYellow = _this.add.sprite(35, 238, 'yellowBox')
            newYellow.scale.setTo(0.23, 0.24);//0.3, 0.32 //0.24
            _this.greenyellowGrp.addChild(newYellow);
        }
        _this.Grxx = 95;
        for (let i = 0; i < _this.ggreenGrp2.length; i++) {
            newGreen = _this.add.sprite(_this.Grxx + i * 9, 238, 'greenBox');
            newGreen.scale.setTo(0.45, 0.24);//0.4, 0.33
            _this.greenyellowGrp.addChild(newGreen);

        }

    },

    //dragging part of left side object(denominator)
    enableDragDenominator: function () {
        // console.log(_this.grayGrp.length, "_this.grayGrp.length ");
        // console.log(_this.Zarray[_this.count1], " _this.Zarray[_this.count1]");
        if (_this.count1 < 3) {
            if (_this.grayGrp.length == _this.Zarray[_this.count1]) {
                return;
            }
        }
        if (_this.count1 > 2) {
            if (_this.grayGrp.length == Math.floor(_this.Zarray[_this.count1]) + 1) {
                //_this.wrongans.play();
                return;
            }
        }
        if (_this.yellowGrp2.length == 0) {
            _this.ggreenGrp2.children.forEach(element => {
                element.inputEnabled = true;
                element.input.useHandCursor = true;
                element.input.enableDrag(true);
                element.events.onDragUpdate.add(_this.dragUpdateGrp, _this);
                element.events.onDragStop.add(_this.dragStopGrp, _this);
            });
            // _this.ggreenGrp2.input.useHandCursor = true;
        }
        else {
            _this.greenyellowGrp.children.forEach(element => {
                element.inputEnabled = true;
                element.input.useHandCursor = true;
                element.input.enableDrag(true);
                element.events.onDragUpdate.add(_this.dragUpdateGrp, _this);
                element.events.onDragStop.add(_this.dragStopGrp, _this);
            });
            // _this.greenyellowGrp.input.useHandCursor = true;

        }

    },

    //dragging part of second space object.
    dragUpdateGrp: function (target) {
        z = _this.ggreenGrp2.length;
        g = _this.yellowGrp2.length;

        if (_this.yellowGrp2.length == 0) {
            _this.world.bringToTop(_this.ggreenGrp2);
            var frontpos = 1;

            var draggedCubex = target.x - 12;
            var draggedCubey = target.y;
            grp = _this.ggreenGrp2;

            for (let k = 0; k < grp.length; k++) {
                grp.getChildAt(k).y = draggedCubey
                grp.getChildAt(k).x = draggedCubex + 12 * frontpos;
                frontpos++;

            }
        }
        else {
            _this.world.bringToTop(_this.greenyellowGrp);
            var frontpos = 1;

            var draggedCubex = target.x;
            var draggedCubex2 = draggedCubex + 40;
            var draggedCubey = target.y;
            grp3 = _this.greenyellowGrp;
            for (let k = 0; k < grp3.length; k++) {

                if (grp3.getChildAt(k).key == 'yellowBox') {
                    grp3.getChildAt(k).y = draggedCubey;
                    grp3.getChildAt(k).x = draggedCubex * frontpos;
                    frontpos++;
                }
                if (grp3.getChildAt(k).key == 'greenBox') {
                    grp3.getChildAt(k).y = draggedCubey;
                    grp3.getChildAt(k).x = draggedCubex2 + 9 * frontpos;
                    frontpos++;
                }

            }
        }

    },
    dragStopGrp: function (target) {

        if (_this.checkOverlap(target, _this.workSpace2)) {
            _this.ggreenGrp.children.forEach(element => {
                element.alpha = 0.5;//alpha is using for grayout the image...
            });
            _this.yellowGrp.children.forEach(element => {
                element.alpha = 0.5;//alpha is using for grayout the image...
            });

            _this.snapSound.pause();
            _this.snapSound.currentTime = 0;

            if (_this.yellowGrp.length > 0) {
                if (_this.yellowGrp2.length > 0) {
                    //second part more than 1 eg:1.2
                    for (let i = 0; i < _this.greenyellowGrp.length; i++) {
                        newYellow = _this.add.sprite(220, 100, 'yellowBox');
                        newYellow.scale.setTo(0.48, 0.5);//0.48, 0.5
                        _this.ggreenGrp2cpy.addChild(newYellow);
                        newGreen = _this.add.sprite(_this.xx + i * 14, 97, 'greenBox');
                        newGreen.scale.setTo(0.48, 0.5);
                        _this.ggreenGrp2cpy.addChild(newGreen);
                    }
                    // _this.time.events.add(500, _this.grayBoxStrike);
                    _this.grayBoxStrike();
                    _this.xx = newGreen.x + 14;
                    _this.greenyellowGrp.destroy();
                    _this.greenyellowGrp = _this.add.group();
                    _this.yellowgreenStrip();

                }
                else {
                    for (let i = 0; i < _this.ggreenGrp2.length; i++) {
                        newGreen = _this.add.sprite(_this.x + i * 14, 97, 'greenBox');
                        newGreen.scale.setTo(0.48, 0.5);
                        _this.ggreenGrp2cpy.addChild(newGreen);

                    }
                    //_this.time.events.add(500, _this.grayBoxStrike);
                    _this.grayBoxStrike();
                    _this.x = newGreen.x + 14;
                }
            }
            if (_this.yellowGrp.length == 0) {
                for (let i = 0; i < _this.ggreenGrp2.length; i++) {
                    newGreen = _this.add.sprite(_this.x + i * 14, 97, 'greenBox');
                    newGreen.scale.setTo(0.48, 0.5);
                    _this.ggreenGrp2cpy.addChild(newGreen);

                }
                //_this.time.events.add(500, _this.grayBoxStrike);
                _this.grayBoxStrike();
                _this.x = newGreen.x + 14;
            }

        }
        else {
            if (_this.yellowGrp2.length > 0) {
                _this.greenyellowGrp.destroy();
                _this.greenyellowGrp = _this.add.group();
                _this.yellowgreenStrip();
            }
        }
        _this.recreateSidebarGrp();


    },

    //after first dragging re creating the dragging part. 
    recreateSidebarGrp: function () {

        if (_this.yellowGrp2.length == 0) {
            _this.ggreenGrp2.destroy();
            _this.ggreenGrp2 = _this.add.group();

            for (let k = 0; k < z; k++) {
                newGreenstrip = _this.add.sprite(50 + k * 14, 200, 'greenBox');
                newGreenstrip.scale.setTo(0.6);
                _this.ggreenGrp2.addChild(newGreenstrip);
            }
            _this.enableDragDenominator();
            _this.world.bringToTop(_this.ggreenGrp2);
        }
        else {

            _this.enableDragDenominator();
        }
    },

    //gray box strike after dragging.
    grayBoxStrike: function () {
        _this.yellowCount = _this.yellowGrp.length;
        _this.world.bringToTop(_this.grayGrp);
        if (_this.yellowGrp2.length == 0 && _this.ggreenGrp2.length == 1) {
            _this.world.bringToTop(_this.grayGrp);
            _this.gray1 = _this.add.sprite(_this.xstrike, 100, 'grey1');
            _this.gray1.scale.setTo(0.37, 0.453);//0.368, 0.38//0.28,0.273
            _this.grayGrp.addChild(_this.gray1);
            _this.ggreenGrp2cpy.visible = false;
            _this.xstrike += 14;
            _this.world.bringToTop(_this.grayGrp);
        }
        if (_this.yellowGrp2.length == 0 && _this.ggreenGrp2.length == 2) {

            _this.world.bringToTop(_this.grayGrp);
            _this.gray2 = _this.add.sprite(_this.xstrike, 100, 'grey2');
            _this.gray2.scale.setTo(0.36, 0.453);//0.26, 0.273
            _this.grayGrp.addChild(_this.gray2);
            _this.ggreenGrp2cpy.visible = false;
            _this.xstrike += 28;
            _this.world.bringToTop(_this.grayGrp);

        }
        if (_this.yellowGrp2.length == 0 && _this.ggreenGrp2.length == 3) {
            _this.gray3 = _this.add.sprite(_this.xstrike, 100, 'grey3');
            _this.gray3.scale.setTo(0.36, 0.453);//0.285//0.26, 0.273
            _this.grayGrp.addChild(_this.gray3);
            _this.ggreenGrp2cpy.visible = false;
            _this.xstrike += 42;
            _this.world.bringToTop(_this.grayGrp);
        }
        if (_this.yellowGrp2.length == 0 && _this.ggreenGrp2.length == 4) {
            //for (i = 0; i < _this.ggreenGrp2.length; i++) {
            _this.gray4 = _this.add.sprite(_this.xstrike, 100, 'grey4');
            _this.gray4.scale.setTo(0.36, 0.453);//0.26, 0.273
            _this.grayGrp.addChild(_this.gray4);
            //}
            _this.ggreenGrp2cpy.visible = false;
            _this.xstrike += 56;
            _this.world.bringToTop(_this.grayGrp);
        }
        if (_this.yellowGrp2.length == 0 && _this.ggreenGrp2.length == 5) {
            //  for (i = 0; i < _this.ggreenGrp2.length; i++) {
            _this.gray5 = _this.add.sprite(_this.xstrike, 100, 'grey5');
            _this.gray5.scale.setTo(0.36, 0.453);
            _this.grayGrp.addChild(_this.gray5);
            //}
            _this.ggreenGrp2cpy.visible = false;
            _this.xstrike += 70;
            _this.world.bringToTop(_this.grayGrp);
        }
        if (_this.yellowGrp2.length == 0 && _this.ggreenGrp2.length == 6) {
            _this.gray6 = _this.add.sprite(_this.xstrike, 100, 'grey6');
            _this.gray6.scale.setTo(0.356, 0.453);//0.256, 0.273
            _this.grayGrp.addChild(_this.gray6);
            // }
            _this.ggreenGrp2cpy.visible = false;
            _this.xstrike += 84;
            _this.world.bringToTop(_this.grayGrp);
        }
        if (_this.yellowGrp2.length == 0 && _this.ggreenGrp2.length == 7) {
            // for (i = 0; i < _this.ggreenGrp2.length; i++) {
            _this.gray7 = _this.add.sprite(_this.xstrike, 100, 'grey7');
            _this.gray7.scale.setTo(0.356, 0.453);
            _this.grayGrp.addChild(_this.gray7);
            //}
            _this.ggreenGrp2cpy.visible = false;
            _this.xstrike += 98;
            _this.world.bringToTop(_this.grayGrp);
        }
        if (_this.yellowGrp2.length == 0 && _this.ggreenGrp2.length == 8) {
            //  for (i = 0; i < _this.ggreenGrp2.length; i++) {
            _this.gray8 = _this.add.sprite(_this.xstrike, 100, 'grey8');
            _this.gray8.scale.setTo(0.36, 0.453);
            _this.grayGrp.addChild(_this.gray8);
            //}
            _this.ggreenGrp2cpy.visible = false;
            _this.xstrike += 112;
            _this.world.bringToTop(_this.grayGrp);
        }
        if (_this.yellowGrp2.length == 0 && _this.ggreenGrp2.length == 9) {
            _this.gray9 = _this.add.sprite(_this.xstrike, 100, 'grey9');
            _this.gray9.scale.setTo(0.36, 0.453);
            _this.grayGrp.addChild(_this.gray9);
            _this.ggreenGrp2cpy.visible = false;
            _this.xstrike += 126;
            _this.world.bringToTop(_this.grayGrp);
        }
        if (_this.yellowGrp2.length == 1 && _this.ggreenGrp2.length == 0) {
            //for (i = 0; i < _this.ggreenGrp2.length; i++) {
            _this.gray10 = _this.add.sprite(_this.xstrike, 100, 'grey10');
            _this.gray10.scale.setTo(0.36, 0.453);
            _this.grayGrp.addChild(_this.gray10);
            // }
            _this.ggreenGrp2cpy.visible = false;
            _this.xstrike += 142;
            _this.world.bringToTop(_this.grayGrp);
        }
        if (_this.yellowGrp2.length == 1 && _this.ggreenGrp2.length == 1) {
            // for (i = 0; i < _this.ggreenGrp2.length; i++) {
            _this.gray11 = _this.add.sprite(_this.xstrike, 100, 'grey11');
            _this.gray11.scale.setTo(0.36, 0.453);
            _this.grayGrp.addChild(_this.gray11);
            //  }
            _this.ggreenGrp2cpy.visible = false;
            _this.xstrike += 155;
            _this.world.bringToTop(_this.grayGrp);
        }
        if (_this.yellowGrp2.length == 1 && _this.ggreenGrp2.length == 2) {
            // for (i = 0; i < _this.ggreenGrp2.length; i++) {
            _this.gray12 = _this.add.sprite(_this.xstrike, 100, 'grey12');
            _this.gray12.scale.setTo(0.36, 0.453);
            _this.grayGrp.addChild(_this.gray12);
            // }
            _this.ggreenGrp2cpy.visible = false;
            _this.xstrike += 168;
            _this.world.bringToTop(_this.grayGrp);
        }
        if (_this.yellowGrp2.length == 1 && _this.ggreenGrp2.length == 3) {
            //  for (i = 0; i < _this.ggreenGrp2.length; i++) {
            _this.gray13 = _this.add.sprite(_this.xstrike, 100, 'grey13');
            _this.gray13.scale.setTo(0.36, 0.453);
            _this.grayGrp.addChild(_this.gray13);
            // }
            _this.ggreenGrp2cpy.visible = false;
            _this.xstrike += 182;
            _this.world.bringToTop(_this.grayGrp);
        }
        if (_this.yellowGrp2.length == 1 && _this.ggreenGrp2.length == 4) {
            // for (i = 0; i < _this.ggreenGrp2.length; i++) {
            _this.gray14 = _this.add.sprite(_this.xstrike, 100, 'grey14');
            _this.gray14.scale.setTo(0.36, 0.453);
            _this.grayGrp.addChild(_this.gray14);
            //}
            _this.ggreenGrp2cpy.visible = false;
            _this.xstrike += 196;
            _this.world.bringToTop(_this.grayGrp);
        }
        if (_this.yellowGrp2.length == 1 && _this.ggreenGrp2.length == 5) {
            // for (i = 0; i < _this.ggreenGrp2.length; i++) {
            _this.gray15 = _this.add.sprite(_this.xstrike, 100, 'grey15');
            _this.gray15.scale.setTo(0.36, 0.453);
            _this.grayGrp.addChild(_this.gray15);
            //  }
            _this.ggreenGrp2cpy.visible = false;
            _this.xstrike += 210;
            _this.world.bringToTop(_this.grayGrp);
        }
        if (_this.yellowGrp2.length == 1 && _this.ggreenGrp2.length == 6) {
            // for (i = 0; i < _this.ggreenGrp2.length; i++) {
            _this.gray16 = _this.add.sprite(_this.xstrike, 100, 'grey16');
            _this.gray16.scale.setTo(0.36, 0.453);
            _this.grayGrp.addChild(_this.gray16);
            // }
            _this.ggreenGrp2cpy.visible = false;
            _this.xstrike += 224;
            _this.world.bringToTop(_this.grayGrp);
        }
        if (_this.yellowGrp2.length == 1 && _this.ggreenGrp2.length == 7) {
            //  for (i = 0; i < _this.ggreenGrp2.length; i++) {
            _this.gray17 = _this.add.sprite(_this.xstrike, 100, 'grey17');
            _this.gray17.scale.setTo(0.36, 0.453);
            _this.grayGrp.addChild(_this.gray17);
            //}
            _this.ggreenGrp2cpy.visible = false;
            _this.xstrike += 238;
            _this.world.bringToTop(_this.grayGrp);
        }
        if (_this.yellowGrp2.length == 1 && _this.ggreenGrp2.length == 8) {
            // for (i = 0; i < _this.ggreenGrp2.length; i++) {
            _this.gray18 = _this.add.sprite(_this.xstrike, 100, 'grey18');
            _this.gray18.scale.setTo(0.36, 0.453);
            _this.grayGrp.addChild(_this.gray18);
            // }
            _this.ggreenGrp2cpy.visible = false;
            _this.xstrike += 252;
            _this.world.bringToTop(_this.grayGrp);
        }
        if (_this.yellowGrp2.length == 1 && _this.ggreenGrp2.length == 9) {
            // for (i = 0; i < _this.ggreenGrp2.length; i++) {
            _this.gray19 = _this.add.sprite(_this.xstrike, 100, 'grey19');
            _this.gray19.scale.setTo(0.36, 0.453);
            _this.grayGrp.addChild(_this.gray19);
            // }
            _this.ggreenGrp2cpy.visible = false;
            _this.xstrike += 266;
            _this.world.bringToTop(_this.grayGrp);
        }

    },

    //after tweening recreating the green part
    recreatingGreen: function () {
        _this.Grx = _this.Xx - 2;//2
        for (let i = 0; i < totGreenGrpCount; i++) {
            newGreen = _this.add.sprite(_this.Grx + i * 14, 97, 'greenBox');
            newGreen.scale.setTo(0.5, 0.6);//0.5
            _this.ggreenGrp.addChild(newGreen);
        }

    },

    //third evaluation for the second space
    ThirdEvaluation: function () {

        if (_this.part3 == true && _this.count1 < 3) {
            _this.eraser.inputEnabled = false;
            _this.rightbtn2.inputEnabled = false;
            _this.rightbtn2.frame = 1;
            if (_this.grayGrp.length == _this.Zarray[_this.count1]) {
                _this.noofAttempts++;
                _this.counterCelebrationSound.play();
                _this.rightbtn2.destroy();
                _this.part3 = false;
                _this.part4 = true;
                _this.yellowGrp2.children.forEach(element => {
                    element.inputEnabled = false;
                });
                _this.ggreenGrp2.children.forEach(element => {
                    element.inputEnabled = false;
                });

                _this.time.events.add(1000, () => {
                    _this.addNumberPad();
                    _this.Question_flag = 3;
                    if (_this.count1 == 0) {
                        _this.Ask_Question3.play()
                    }
                });

            }
            else {
                _this.noofAttempts++;
                _this.wrongans.play();
                _this.grayGrp.destroy();
                _this.rightbtn2.inputEnabled = true;
                _this.grayGrp = _this.add.group();
                _this.xstrike = 220;//252
                _this.xstrike2 = 360;
                _this.xstrike3 = 500;
                _this.xstrike4 = 640;
                _this.enableDragDenominator();
            }

        }

        if (_this.part3 == true && _this.count1 > 2) {
            _this.eraser.inputEnabled = false;
            _this.rightbtn2.inputEnabled = false;
            _this.rightbtn2.frame = 1;
            if (_this.grayGrp.length == Math.floor(_this.Zarray[_this.count1]) + 1) {
                _this.noofAttempts++;
                _this.counterCelebrationSound.play();
                _this.rightbtn2.destroy();
                _this.part3 = false;
                _this.part4 = true;
                _this.yellowGrp2.children.forEach(element => {
                    element.inputEnabled = false;
                });
                _this.ggreenGrp2.children.forEach(element => {
                    element.inputEnabled = false;
                });
                _this.time.events.add(1000, () => {
                    _this.addNumberPad();

                    _this.Question_flag = 3;
                    if (_this.count1 == 0) {
                        _this.Ask_Question3.play()
                    }
                });
            }
            else {
                _this.noofAttempts++;
                _this.wrongans.play();
                _this.grayGrp.destroy();
                _this.rightbtn2.inputEnabled = true;
                _this.grayGrp = _this.add.group();
                _this.xstrike = 220;//252
                _this.enableDragDenominator();
            }
        }



    },
    divideSign: function (x, y) {
        _this.pSign1 = _this.add.graphics();
        _this.pSign1.lineStyle(4, 0xFF0000);
        _this.pSign1.moveTo(x, y);
        _this.pSign1.lineTo(x + 18, y);

        _this.pSign2 = _this.add.graphics();
        _this.pSign2.lineStyle(4, 0xFF0000);
        _this.pSign2.moveTo(x + 7, y - 9);
        _this.pSign2.lineTo(x + 11, y - 9);

        _this.pSign3 = _this.add.graphics();
        _this.pSign3.lineStyle(4, 0xFF0000);
        _this.pSign3.moveTo(x + 7, y + 9);
        _this.pSign3.lineTo(x + 11, y + 9);


    },

    //last answer part validation
    rightbtnClicked: function () {

        if (_this.part4 == true) {

            if (_this.checkAns()) {
                _this.part4 = false;
                _this.correctAns();
            }
            else {
                _this.wrongAnsClicked()
                _this.rightbtn.inputEnabled = true;
            }
        }

    },
    checkAns: function () {
        if ((_this.AnswerBox.name == _this.Zarray[_this.count1] + ".") || (_this.AnswerBox.name == "0" + _this.Zarray[_this.count1] + ".") || (_this.AnswerBox.name == "00" + _this.Zarray[_this.count1] + ".") || (_this.AnswerBox.name == "000" + _this.Zarray[_this.count1] + ".")) return false;
        if (String(_this.AnswerBox.name)[0] == ".") return false;
        else
            return _this.AnswerBox.name == _this.Zarray[_this.count1];
    },

    wrongAnsClicked: function () {
        _this.noofAttempts++;
        _this.wrongans.play();
        _this.disableInputs();
    },
    addNumberPad: function () {

        _this.objGroup = _this.add.group();
        _this.numGroup = _this.add.group();

        var bottomnumpadbg = _this.numGroup.create(0, 515, 'numpadbg');
        //bottomnumpadbg.anchor.setTo(0.5);
        bottomnumpadbg.scale.setTo(1, 1);

        // bottomnumpadbg.name = "numpadbg";

        _this.x = 44;
        // set the number pad invisible initially. only after tweening it is made visible
        _this.numGroup.visible = false;

        for (var i = 0; i <= 10; i++) {
            _this.numbg = _this.numGroup.create(_this.x, 552, 'Numberpad');
            _this.numbg.anchor.setTo(0.5);
            // _this.numbg.scale.setTo(0.9);
            _this.numbg.name = i + 1;
            _this.numbg.frame = i;

            _this.numbg.inputEnabled = true;
            _this.numbg.input.useHandCursor = true;
            _this.numbg.events.onInputDown.add(_this.numClicked, _this);

            _this.x += 58;
        }

        _this.wrongbtn = _this.numGroup.create(845, 552, 'Numberpad');
        _this.wrongbtn.frame = 11;
        _this.wrongbtn.anchor.setTo(0.5);
        // _this.wrongbtn.scale.setTo(0.8, 0.8);
        _this.wrongbtn.name = "wrongbtn";
        _this.wrongbtn.inputEnabled = true;
        _this.wrongbtn.input.useHandCursor = true;
        _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked, _this);

        _this.rightbtn = _this.numGroup.create(915, 552, 'Numberpad');
        _this.rightbtn.frame = 12;
        _this.rightbtn.anchor.setTo(0.5);
        // _this.rightbtn.scale.setTo(0.8, 0.8);
        _this.rightbtn.name = "rightbtn";
        _this.rightbtn.inputEnabled = true;
        _this.rightbtn.input.useHandCursor = true;
        _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked, _this);

        _this.AnswerBox = _this.numGroup.create(738, 552, 'Text box_2');
        _this.AnswerBox.anchor.setTo(0.5)

        _this.enterTxt = _this.add.text(8, 8, "");
        _this.enterTxt.anchor.setTo(0.5);
        _this.enterTxt.align = 'center';
        _this.enterTxt.font = "Akzidenz-Grotesk BQ";
        _this.enterTxt.fontSize = "30px";
        _this.enterTxt.fontWeight = 'normal';
        _this.enterTxt.fill = '#65B4C3';

        //_this.objGroup.add(_this.ScreenTextBox);
        _this.numpadTween = _this.add.tween(_this.numGroup);


        //_this.ScreenTextTween = _this.add.tween(_this.ScreenTextBox);

        //tween in the number pad after a second.
        //_this.time.events.add(100, _this.tweenNumPad);
        _this.tweenNumPad();

        //after 2 seconds, show the screen text box as enabled
        //_this.time.events.add(2000, _this.enableScreenText);

    },
    wrongbtnClicked: function (target) {
        _this.clickSound.play();
        _this.disableInputs();
    },
    disableInputs: function () {
        if (_this.enterTxt)
            _this.enterTxt.destroy();
        _this.AnswerBox.name = ""
        _this.fourNotEntered = false;
        _this.fouransLen = 0;
        _this.finalval = '';
        _this.dotselected = false;
    },
    numClicked: function (target) {
        _this.clickSound.play();
        var_selectedAns1 = " "
        var_selectedAns2 = " "
        var_selectedAns3 = " "
        // var_selectedAns4 = " "
        if (target.name == 10) {
            target.name = '0'
        }

        if (target.name == 11 && _this.dotselected == true) {
            return
        }

        else if (target.name == 11 && _this.dotselected == false) {
            target.name = "."
            _this.dotselected = true;
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
        else if (_this.selectedAns3 === '') {

            _this.selectedAns3 = target.name;
            var_selectedAns1 = _this.selectedAns1;
            var_selectedAns2 = _this.selectedAns2;
            var_selectedAns3 = _this.selectedAns3;

        }
        if (_this.fouransLen != 5) {//4
            if (_this.fouransLen == 4 && _this.dotselected == false)//3
                return;
            _this.finalval += ''
            _this.finalval += target.name;
            if (target.name == '.')
                target.name = 11;
            _this.fouransLen += 1;
        }

        if (target.name == '0')
            target.name = 10;

        if (target.name == '.')
            target.name = 11;

        if (_this.fourNotEntered == false) {

            {
                _this.enterTxt.visible = false;
                _this.AnswerBox.removeChild(_this.enterTxt);

                if ((_this.fouransLen == 1))

                    _this.enterTxt = _this.add.text(-10, -20, "" + _this.finalval, { fontSize: '20px' });
                else if (_this.fouransLen == 2)

                    _this.enterTxt = _this.add.text(-14, -20, "" + _this.finalval, { fontSize: '20px' });
                else if (_this.fouransLen == 3)

                    _this.enterTxt = _this.add.text(-19, -20, "" + _this.finalval, { fontSize: '20px' });
                else if (_this.fouransLen == 4)

                    _this.enterTxt = _this.add.text(-27, -20, "" + _this.finalval, { fontSize: '20px' });

                else {
                    _this.enterTxt = _this.add.text(-40, -20, "" + _this.finalval, { fontSize: '20px' });
                    _this.fourNotEntered = true;
                }
                _this.enterTxt.scale.setTo(1.5)
                _this.applyingStyle(_this.enterTxt);
                _this.AnswerBox.addChild(_this.enterTxt);
                _this.AnswerBox.name = ('' + _this.finalval);
            }
        }

    },
    tweenNumPad: function () {
        _this.numGroup.visible = true;
        _this.numpadTween.to({ x: 0, y: -43 }, 1000, 'Linear', true, 0);

    },
    ClearAll: function () {

        _this.numGroup.destroy();
        _this.disableInputs();
        _this.sideGray.destroy();
        _this.yellowGrp.destroy();
        _this.yellowGrp2.destroy();
        _this.ggreenGrp.destroy();
        _this.ggreenGrp2.destroy();
        _this.grayGrp.destroy();
        _this.greenyellowGrp.destroy();
        _this.questionBox.destroy();
        _this.workSpace.destroy();
        _this.workSpace2.destroy();
        _this.greenStripe.destroy();
        _this.yellowStripe.destroy();
        _this.orangeStripe.destroy();
        _this.eraser.destroy();
        if (_this.grayBox) {
            _this.grayBox.visible = true;
            _this.grayBox.destroy();
        }
        _this.lastXArr = [0, 0];
        _this.grayBox = null;
        _this.grayBox2 = null;
        _this.firstGrp = null;
        _this.resizeg2 = null;

        _this.pSign1.destroy();
        _this.pSign2.destroy();
        _this.pSign3.destroy();

    },
    checkOverlap: function (spriteA, spriteB) {
        _this.boundsA = spriteA.getBounds();
        _this.boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(_this.boundsA, _this.boundsB);
    },
    applyingStyle: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.visible = true;
    },
    correctAns: function () {

        if (_this.count1 < 5) {

            _this.celebrationSound.play();
            telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);
            _this.starActions(_this.count1);
            _this.time.events.add(2000, _this.ClearAll);
            _this.time.events.add(3000, _this.MakeSideBar);

        }
        else {
            _this.celebrationSound.play();
            telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);
            _this.starActions(_this.count1);
            _this.time.events.add(2000, _this.ClearAll);
            _this.time.events.add(2500, () => {
                _this.state.start('score', true, false, gameID, _this.microConcepts);

            })
        }
    },
    starActions: function (target) {
        starAnim = _this.starsGroup.getChildAt(_this.count1);
        starAnim.smoothed = false;
        anim = starAnim.animations.add('star');
        _this.microConcepts = "Number SystemsG7";
        _this.count1++;
        anim.play();
    },


    shutdown: function () {
        //_this.stopVoice();
        //RI.gotoEndPage();
        //telInitializer.tele_end();
    },

    DemoVideo: function () {


        // DEMO AUDIOS
        _this.demoAudio1 = document.createElement('audio');
        _this.demoAudio1src = document.createElement('source');
        _this.demoAudio1src.setAttribute("src", window.baseUrl + "questionSounds/NSD-6-G7/" + _this.languageSelected + "/NSD_6_G7_d1.mp3");
        _this.demoAudio1.appendChild(_this.demoAudio1src);

        _this.demoAudio2 = document.createElement('audio');
        _this.demoAudio2src = document.createElement('source');
        _this.demoAudio2src.setAttribute("src", window.baseUrl + "questionSounds/NSD-6-G7/" + _this.languageSelected + "/NSD_6_G7_d2.mp3");
        _this.demoAudio2.appendChild(_this.demoAudio2src);

        _this.demoAudio3 = document.createElement('audio');
        _this.demoAudio3src = document.createElement('source');
        _this.demoAudio3src.setAttribute("src", window.baseUrl + "questionSounds/NSD-6-G7/" + _this.languageSelected + "/NSD_6_G7_d3.mp3");
        _this.demoAudio3.appendChild(_this.demoAudio3src);

        // QUESTION AUDIOS
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/NSD-6-G7/" +
            _this.languageSelected + "/NSD_6_G7_a1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        _this.q2Sound = document.createElement('audio');
        _this.q2Soundsrc = document.createElement('source');
        _this.q2Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/NSD-6-G7/" +
            _this.languageSelected + "/NSD_6_G7_a2.mp3");
        _this.q2Sound.appendChild(_this.q2Soundsrc);

        _this.q3Sound = document.createElement('audio');
        _this.q3Soundsrc = document.createElement('source');
        _this.q3Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/NSD-6-G7/" +
            _this.languageSelected + "/NSD_6_G7_a3.mp3");
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
    stopAudio: function () {
        //* clear all the timers first

        if (_this.demoAudio1Timer) clearTimeout(_this.demoAudio1Timer);
        if (_this.q1Timer) clearTimeout(_this.q1Timer);
        if (_this.q2Timer) clearTimeout(_this.q2Timer);

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
        if (_this.demoAudio3) {
            console.log("removing the demo audio3");
            _this.demoAudio3.pause();
            _this.demoAudio3 = null;
            _this.demoAudio3src = null;
        }


        if (_this.q1Sound) {
            console.log("removing the q1");
            _this.q1Sound.pause();
            _this.q1Sound = null;
            _this.q1Soundsrc = null;
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

        _this.skip.events.onInputDown.removeAll();
        _this.skip.destroy();                //* skip button destroyed

    },

    dA1: function () {
        console.log("inside demoAudio2sound.....");
        // _this.demoVideo_1.playbackRate = 1;
        _this.demoAudio2.play();
    },
    dA2: function () {
        console.log("inside q1Sound.....");
        // _this.demoVideo_1.playbackRate = 1;
        _this.q1Sound.play();
    },

    showDemoVideo: function () {

        _this.demoVideo_1 = _this.add.video('NSD6G7');
        _this.demoVideo_1.play(false);
        _this.demoVideo_1.changeSource(window.baseUrl + "assets/demoVideos/Nsd-6-G7.mp4");
        _this.video_playing = 1;
        _this.videoWorld_1 = _this.demoVideo_1.addToWorld();

        _this.demoAudio1.play();

        _this.demoAudio1.addEventListener('ended', _this.dA1);
        _this.demoAudio2.addEventListener('ended', _this.dA2);

        //* play the demo audio1 after 4 sec delay
        _this.q1Timer = setTimeout(function ()    //* q1Timer js timer to play q1 after 4 seconds.
        {
            console.log("inside q2sound.....")
            // _this.demoVideo_1.playbackRate = 0;     //* pausing the video after 4sec
            clearTimeout(_this.q1Timer);         //* clear the time once its used.
            _this.q2Sound.play();
        }, 49000);

        //* play the demo audio1 after 4 sec delay
        _this.q2Timer = setTimeout(function ()    //* q1Timer js timer to play q1 after 4 seconds.
        {
            console.log("inside q3sound.....")
            // _this.demoVideo_1.playbackRate = 0;     //* pausing the video after 4sec
            clearTimeout(_this.q2Timer);         //* clear the time once its used.
            _this.q3Sound.play();
        }, 68000);

        //* play the demo audio1 after 4 sec delay
        _this.demoAudio1Timer = setTimeout(function ()    //* q1Timer js timer to play q1 after 4 seconds.
        {
            console.log("inside demoAudio3.....")
            // _this.demoVideo_1.playbackRate = 0;     //* pausing the video after 4sec
            clearTimeout(_this.demoAudio1Timer);         //* clear the time once its used.
            _this.demoAudio3.play();
        }, 77000);

        _this.demoVideo_1.onComplete.add(function () {
            console.log("demovideo 1 completed......!!!1")
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
