Game.GMPYTH_G7level1 = function () { };

Game.GMPYTH_G7level1.prototype =
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

        _this.counterCelebrationSound = document.createElement('audio');
        _this.counterCelebrationSoundsrc = document.createElement('source');
        _this.counterCelebrationSoundsrc.setAttribute("src", window.baseUrl + "sounds/counter_celebration.mp3");
        _this.counterCelebrationSound.appendChild(_this.counterCelebrationSoundsrc);

        _this.wrongSound = document.createElement('audio');
        _this.wrongSoundsrc = document.createElement('source');
        _this.wrongSoundsrc.setAttribute("src", window.baseUrl + "sounds/WrongCelebrationSound.mp3");
        _this.wrongSound.appendChild(_this.wrongSoundsrc);

        _this.SmallReward = document.createElement('audio');
        _this.SmallRewardsrc = document.createElement('source');
        _this.SmallRewardsrc.setAttribute("src", window.baseUrl + "sounds/Small Reward.mp3");
        _this.SmallReward.appendChild(_this.SmallRewardsrc);

        _this.TapSound = document.createElement('audio');
        _this.Tapsrc = document.createElement('source');
        _this.Tapsrc.setAttribute("src", window.baseUrl + "sounds/Tap.mp3");
        _this.TapSound.appendChild(_this.Tapsrc);

        _this.Ask_Question1 = _this.createAudio("GM_PYTH_G7_a3");//Tap and Select any of the square
        _this.Ask_Question2 = _this.createAudio("GM_PYTH_G7_a4");//count and write  the length of the Side of the square
        _this.Ask_Question3 = _this.createAudio("GM_PYTH_G7_a5");//enter the Area of the square 
        _this.Ask_Question4 = _this.createAudio("GM_PYTH_G7_a1");//verify pythagoras theorem , Is square of 'a' plus square of 'b'  equal to square of 'c' ?  Can the sides form a right angle triangle?
        _this.Ask_Question5 = _this.createAudio("GM_PYTH_G7_a7");//Find the Area of a shape.
        _this.Ask_Question6 = _this.createAudio("GM_PYTH_G7_a6");//Select the square
        _this.Ask_Question7 = _this.createAudio("GM_PYTH_G7_a2");//These sides cannot form a right angle triangle

        telInitializer.gameIdInit("GM_PYTH_G7", gradeSelected);// first Tele call
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
        //*add these  variables
        _this.hint_flag = 0;
        _this.noofAttempts = 0;//total attempt to answer q question
        _this.AnsTimerCount = 0;//total time
        _this.sceneCount = 0;//no of screen
        _this.questionid = null;//always 1

    //    _this.AnsTimerCount = 0;
        _this.count1 = 0;
        _this.trackCount = 0;
        _this.speakerbtn;
        _this.background;
        _this.count = 0;
        _this.starsGroup;
        _this.selectedAns1 = '';
        _this.selectedAns2 = '';
        _this.selectedAns3 = '';
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

        _this.hand_flag = 1;
        _this.f_buttonClick = false;

        _this.allSides_flag = 0;

        _this.shake = new Phaser.Plugin.Shake(game);
        game.plugins.add(_this.shake);

        _this.counterForTimer = 0;
        _this.array = ["3n", "2n", "3n", "2n", "4n", "5n", "3n", "2n+1", "3n+1", "5n+1", "7n+1", "4n+1", "3n+1", "2n+1"];
        _this.arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        _this.shuffle(_this.arr);

        _this.empty_pos1Array = [0, 0, 0, 0];
        _this.tweenObjectGroup = _this.add.group();
        _this.clearScreenArray = [];
        _this.initObjectArray = [];

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
                _this.state.start('grade7Geometry',true,false);
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
                } else if (_this.Question_flag == 6) {
                    _this.Ask_Question7.play();
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

        // //bulb 
        // _this.hintBtn = _this.add.sprite(670, 6, 'bulb');
        // _this.hintBtn.scale.setTo(0.5, 0.6);
        // _this.hintBtn.smoothed = false;
        // _this.hintBtnAnim = _this.hintBtn.animations.add('hint');
        // _this.hintBtnAnim.play(15);
        // _this.hintBtnAnim.onComplete.add(function () {
        //     _this.hintBtnAnim.play(15);
        // }, _this);
        // _this.hintBtn.inputEnabled = true;
        // _this.hintBtn.input.useHandCursor = true;

        // _this.hintBtn.events.onInputDown.add(function () {
        //     console.log("inside hintbutton function");
        //     //* show the demo video
        //     _this.hintBtn.inputEnabled = false;
        //     _this.hintBtn.input.useHandCursor = false;
        //     _this.time.events.add(1, function () {
        //         _this.ViewDemoVideo();
        //     });

        // });
        //bulb
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
                console.log(_this.hintBtn.inputEnabled, "status of hintBtn");
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
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/GM-PYTH-G7/" + _this.languageSelected + "/" + src + ".mp3");
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

        _this.area_flag = 0;
        _this.sides_flag = 0;
        _this.triangle_flag = 0;
        _this.gmpar_flag = 0;

        _this.Initial_randomizing();
        _this.displayGridView();
        //_this.displayNextShapes();

        _this.hintBtn.inputEnabled = true;
        _this.hintBtn.input.useHandCursor = true;
        _this.hint_flag = 1;
        _this.questionid =1;
    },

    createSemiCircle: function () {
        //* Display Semicircles and display area
        _this.time.events.add(2000, function () {
            _this.SmallReward.play();
        })
        //* Semicircle
        _this.bgiPanel = _this.add.image(30, 65, 'bgiPanel');
        _this.bgiPanel.scale.setTo(1.33, 1.13);
        _this.clearScreenArray.push(_this.bgiPanel);
        //_this.time.events.add(1000, function () {
        _this.c1 = _this.add.image(50, 190, 'greenFilledCircle');
        _this.c1.visible = false;
        _this.clearScreenArray.push(_this.c1);
        // })
        // _this.time.events.add(1500, function () {
        _this.c2 = _this.add.image(148, 500, 'orangeFilledCircle');
        _this.c2.angle = 270;
        _this.c2.visible = false;
        _this.clearScreenArray.push(_this.c2);
        // })

        //_this.time.events.add(2000, function () {
        _this.c3 = _this.add.image(482, 268, 'pinkFilledCircle');
        _this.c3.angle = 130;
        _this.c3.visible = false;
        _this.clearScreenArray.push(_this.c3);
        //})
        ///////* REMOVE IT LATER
        // _this.areaofA = (3.14 / 2) * _this.TripletArray[_this.trackCount][0] * _this.TripletArray[_this.trackCount][0];
        // _this.roundedNumber = _this.areaofA.toFixed(2);
        // _this.areaofB = (3.14 / 2) * _this.TripletArray[_this.trackCount][1] * _this.TripletArray[_this.trackCount][1];
        // _this.roundedNumber1 = _this.areaofB.toFixed(2);
        // _this.areaofC = (3.14 / 2) * _this.TripletArray[_this.trackCount][2] * _this.TripletArray[_this.trackCount][2];
        // _this.roundedNumber2 = _this.areaofC.toFixed(2);
        ///////
        _this.textA = _this.add.text(65, 270, _this.roundedNumber);
        _this.textA.font = "Akzidenz-Grotesk BQ";
        _this.textA.fill = '#FFFFFF';// #808000
        _this.textA.fontWeight = 'normal';
        _this.textA.visible = false;
        // _this.clearScreenArray.push(_this.textA);

        _this.textB = _this.add.text(215, 420, _this.roundedNumber1);
        _this.textB.font = "Akzidenz-Grotesk BQ";
        _this.textB.fill = '#FFFFFF';// #808000
        _this.textB.fontWeight = 'normal';
        _this.textB.visible = false;
        //  _this.clearScreenArray.push(_this.textB);

        _this.textC = _this.add.text(292, 238, _this.thirdSemiArea);
        _this.textC.font = "Akzidenz-Grotesk BQ";
        _this.textC.fill = '#FFFFFF';// #808000
        _this.textC.fontWeight = 'normal';
        _this.textC.visible = false;
        // _this.clearScreenArray.push(_this.textC);

        _this.time.events.add(1000, function () {
            _this.c1.visible = true;
            _this.textA.visible = true;
        });
        _this.time.events.add(1600, function () {
            _this.c2.visible = true;
            _this.textB.visible = true;
        });
        _this.time.events.add(2100, function () {
            _this.c3.visible = true;
            _this.textC.visible = true;
        });

        // _this.testSemi();
        //* Display the expanded formula
        _this.formulaBox12 = _this.add.image(410, 100, 'textbox2');
        _this.formulaBox12.scale.setTo(1.1, 1);
        _this.clearScreenArray.push(_this.formulaBox12);

        let string;
        string = '(' + '\u03C0' + '/' + 2 + ')';
        _this.semicircleFormula = _this.add.text(440, 140, string)
        _this.semicircleFormula.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula.fill = '#FF0000';// #808000
        _this.semicircleFormula.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula);

        let string1;
        string1 = 'a' + "\u{00B2}" + '/' + 2 + "\u{00B2}" + ' ' + '+';
        _this.semicircleFormula1 = _this.add.text(510, 140, string1)
        _this.semicircleFormula1.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula1.fill = '#FF0000';// #808000
        _this.semicircleFormula1.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula1);

        let string2;
        string2 = '(' + '\u03C0' + '/' + 2 + ')';
        _this.semicircleFormula2 = _this.add.text(605, 140, string2)
        _this.semicircleFormula2.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula2.fill = '#FF0000';// #808000
        _this.semicircleFormula2.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula2);

        let string3;
        string3 = 'b' + "\u{00B2}" + '/' + 2 + "\u{00B2}" + ' ' + '=';
        _this.semicircleFormula3 = _this.add.text(675, 140, string3)
        _this.semicircleFormula3.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula3.fill = '#FF0000';// #808000
        _this.semicircleFormula3.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula3);

        let string4;
        string4 = '(' + '\u03C0' + '/' + 2 + ')';
        _this.semicircleFormula4 = _this.add.text(770, 140, string4)
        _this.semicircleFormula4.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula4.fill = '#FF0000';// #808000
        _this.semicircleFormula4.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula4);

        let string5;
        string5 = 'c' + "\u{00B2}" + '/' + 2 + "\u{00B2}";
        _this.semicircleFormula6 = _this.add.text(840, 140, string5)
        _this.semicircleFormula6.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula6.fill = '#FF0000';// #808000
        _this.semicircleFormula6.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula6);

        _this.testSemi();
        //FF0000
        //textbox2
        //* Show the Dashed Image
        _this.time.events.add(2700, function () {
            _this.c3.visible = false;
            _this.textC.destroy();
            // _this.time.events.add(1000, function()
            // {
            _this.c3Dotted.visible = true;
            _this.cutLine1.visible = true;
            _this.cutLine2.visible = true;
            _this.text3.visible = true
        });
        _this.time.events.add(3500, function () {
            _this.c2.visible = false;
            _this.textB.destroy();
            //  _this.time.events.add(1000, function()
            // {
            _this.c2Dotted.visible = true;
            _this.cutLine3.visible = true;
            _this.cutLine4.visible = true;
            _this.text2.visible = true
            // })
        });
        _this.time.events.add(4000, function () {
            _this.c1.visible = false;
            _this.textA.destroy();
            // _this.time.events.add(1000, function()
            //{
            _this.c1Dotted.visible = true;
            _this.cutLine5.visible = true;
            _this.cutLine6.visible = true;
            _this.text1.visible = true
            //  })
            _this.simpleFormula();
        });
        _this.time.events.add(4500, function () {
            _this.graphics22.visible = true;
            _this.celebration();

        });

        _this.time.events.add(6800, function () {
            if (_this.formulaBox) _this.formulaBox.destroy();
            _this.clearScreenArray.forEach(element => {
                element.destroy();
            });
            _this.time.events.add(1500, function () {
                _this.nextquestion();
            })
        });
    },

    testEquilateral: function () {
        _this.graphicsE = _this.game.add.graphics(130, 192);
        _this.graphicsE.lineStyle(2, 0x00BFFF);
        _this.graphicsE.beginFill(0x00BFFF, 1);
        _this.graphicsE.moveTo(200, -15);
        _this.graphicsE.lineTo(200, 200);
        _this.graphicsE.lineTo(130, 200);
        _this.graphicsE.lineTo(200, -15);
        _this.clearScreenArray.push(_this.graphicsE);

        _this.graphicsE.endFill();
        _this.graphicsE.visible = false;

        //* add dashed hexagon
        _this.e1Dotted = _this.add.image(335, 465, 'shap_2');
        _this.e1Dotted.scale.setTo(0.2, 0.2);
        _this.e1Dotted.angle = 180;
        _this.e1Dotted.visible = false;
        _this.clearScreenArray.push(_this.e1Dotted);

        let stringe1 = 'a' + '=' + _this.TripletArray[_this.trackCount][0];
        _this.text1 = _this.add.text(345, 405, stringe1);
        _this.applyingStyle(_this.text1);
        _this.text1.visible = false;
        _this.clearScreenArray.push(_this.text1);

        _this.cutLine1 = _this.add.image(460, 120, 'corss_bigLine');
        //_this.cutLine2 = _this.add.image(545, 135, 'corss_smallLine');
        _this.cutLine1.scale.setTo(0.8, 1);
        // _this.cutLine2.scale.setTo(0.8, 1);
        _this.cutLine1.visible = false;
        // _this.cutLine2.visible = false;
        _this.clearScreenArray.push(_this.cutLine1);

        _this.e2Dotted = _this.add.image(530, 168, 'shap_2');
        _this.e2Dotted.scale.setTo(0.55, 0.55);
        _this.e2Dotted.angle = 90;
        _this.e2Dotted.visible = false;
        _this.clearScreenArray.push(_this.e2Dotted);

        let stringe2 = 'b' + '=' + _this.TripletArray[_this.trackCount][1];
        _this.text2 = _this.add.text(380, 260, stringe2);
        _this.applyingStyle(_this.text2);
        _this.text2.visible = false;
        _this.clearScreenArray.push(_this.text2);

        _this.cutLine3 = _this.add.image(600, 120, 'corss_bigLine');
        // _this.cutLine4 = _this.add.image(700, 135, 'corss_smallLine');
        _this.cutLine3.scale.setTo(0.8, 1);
        // _this.cutLine4.scale.setTo(0.8, 1);
        _this.cutLine3.visible = false;
        // _this.cutLine4.visible = false;
        _this.clearScreenArray.push(_this.cutLine3);

        _this.e3Dotted = _this.add.image(68, 334, 'shap_2');
        _this.e3Dotted.scale.setTo(0.58, 0.55);
        _this.e3Dotted.angle = -72;
        _this.e3Dotted.visible = false;
        _this.clearScreenArray.push(_this.e3Dotted);

        let stringe3 = 'c' + '=' + _this.TripletArray[_this.trackCount][2];
        _this.text3 = _this.add.text(188, 244, stringe3);
        _this.applyingStyle(_this.text3);
        _this.text3.visible = false;
        _this.clearScreenArray.push(_this.text3);

        _this.cutLine5 = _this.add.image(765, 120, 'corss_bigLine');
        //_this.cutLine6 = _this.add.image(855, 135, 'corss_smallLine');
        _this.cutLine5.scale.setTo(0.8, 1);
        // _this.cutLine6.scale.setTo(0.8, 1);
        _this.cutLine5.visible = false;
        //_this.cutLine6.visible = false;
        _this.clearScreenArray.push(_this.cutLine5);
    },

    testHexa: function () {

        _this.graphicsH = _this.game.add.graphics(80, 162);

        // Set the line style for the triangle (line thickness and color)
        _this.graphicsH.lineStyle(2, 0x00BFFF);
        _this.graphicsH.beginFill(0x00BFFF, 1);
        // Move the drawing cursor to the first point of the triangle
        _this.graphicsH.moveTo(200, 80);
        // Draw lines to the other two points of the triangle, making a left angle
        _this.graphicsH.lineTo(200, 200);
        _this.graphicsH.lineTo(150, 200);
        _this.graphicsH.lineTo(200, 80);
        _this.clearScreenArray.push(_this.graphicsH);


        // Render the graphics object to the game canvas
        _this.graphicsH.endFill();
        _this.graphicsH.visible = false;

        //* add dashed hexagon
        _this.h1Dotted = _this.add.image(174, 394, 'shap_3');//184, 380,
        _this.h1Dotted.scale.setTo(0.35, 0.35);///3,3
        _this.h1Dotted.angle = -30;
        _this.h1Dotted.visible = false;
        _this.clearScreenArray.push(_this.h1Dotted);

        let stringh1 = 'a' + '=' + _this.TripletArray[_this.trackCount][0];
        _this.text1 = _this.add.text(235, 404, stringh1);
        _this.applyingStyle(_this.text1);
        _this.text1.visible = false;
        _this.clearScreenArray.push(_this.text1);

        //     //* ADD line 1
        _this.cutLine1 = _this.add.image(450, 120, 'corss_bigLine');
        //_this.cutLine2 = _this.add.image(545, 135, 'corss_smallLine');
        _this.cutLine1.scale.setTo(0.8, 1);
        // _this.cutLine2.scale.setTo(0.8, 1);
        _this.cutLine1.visible = false;
        // _this.cutLine2.visible = false;
        _this.clearScreenArray.push(_this.cutLine1);

        _this.h2Dotted = _this.add.image(282, 180, 'shap_3');
        _this.h2Dotted.scale.setTo(0.6, 0.65);
        _this.h2Dotted.visible = false;
        _this.clearScreenArray.push(_this.h2Dotted);

        let stringh2 = 'b' + '=' + _this.TripletArray[_this.trackCount][1];
        _this.text2 = _this.add.text(360, 290, stringh2);
        _this.applyingStyle(_this.text2);
        _this.text2.visible = false;
        _this.clearScreenArray.push(_this.text2);

        _this.cutLine3 = _this.add.image(605, 120, 'corss_bigLine');
        _this.cutLine3.scale.setTo(0.8, 1);
        _this.cutLine3.visible = false
        _this.clearScreenArray.push(_this.cutLine3);

        _this.h3Dotted = _this.add.image(113, 85, 'shap_3');
        _this.h3Dotted.scale.setTo(0.65, 0.75);
        _this.h3Dotted.angle = 23;
        _this.h3Dotted.visible = false;
        _this.clearScreenArray.push(_this.h3Dotted);

        let stringh3 = 'c' + '=' + _this.TripletArray[_this.trackCount][2];
        _this.text3 = _this.add.text(123, 245, stringh3);
        _this.applyingStyle(_this.text3);
        _this.text3.visible = false;
        _this.clearScreenArray.push(_this.text3);

        _this.cutLine5 = _this.add.image(785, 120, 'corss_bigLine');
        _this.cutLine5.scale.setTo(0.8, 1);
        _this.cutLine5.visible = false;
        _this.clearScreenArray.push(_this.cutLine5);
    },

    testSemi: function () {
        _this.graphics22 = _this.game.add.graphics(-100, 162);
        // Set line style
        _this.graphics22.lineStyle(2, 0x00BFFF, 1);
        _this.graphics22.beginFill(0x00BFFF, 1);


        // Draw triangle
        _this.graphics22.moveTo(270, 10);
        _this.graphics22.lineTo(470, 200);
        _this.graphics22.lineTo(270, 200);
        _this.graphics22.lineTo(270, 10);

        _this.clearScreenArray.push(_this.graphics22);
        // // Render graphics object
        _this.graphics22.endFill();
        _this.graphics22.visible = false;

        _this.c1Dotted = _this.add.image(55, 360, 'shap_1');
        _this.c1Dotted.scale.setTo(0.4, 0.45);
        _this.c1Dotted.angle = -89;
        _this.c1Dotted.visible = false;
        _this.clearScreenArray.push(_this.c1Dotted);

        let stringca = 'a' + '=' + _this.TripletArray[_this.trackCount][0];
        _this.text1 = _this.add.text(85, 250, stringca);
        _this.applyingStyle(_this.text1);
        _this.text1.visible = false;
        _this.clearScreenArray.push(_this.text1);

        //     //* ADD line 1
        _this.cutLine1 = _this.add.image(450, 120, 'corss_bigLine');
        _this.cutLine2 = _this.add.image(545, 135, 'corss_smallLine');
        _this.cutLine1.scale.setTo(0.8, 1);
        _this.cutLine2.scale.setTo(0.8, 1);
        _this.cutLine1.visible = false;
        _this.cutLine2.visible = false;
        _this.clearScreenArray.push(_this.cutLine1);
        _this.clearScreenArray.push(_this.cutLine2);

        _this.c2Dotted = _this.add.image(375, 475, 'shap_1');
        _this.c2Dotted.scale.setTo(0.44, 0.45);
        _this.c2Dotted.angle = 180;
        _this.c2Dotted.visible = false;
        _this.clearScreenArray.push(_this.c2Dotted);

        let stringb = 'b' + '=' + _this.TripletArray[_this.trackCount][1];
        _this.text2 = _this.add.text(240, 410, stringb);
        _this.applyingStyle(_this.text2);
        _this.text2.visible = false;
        _this.clearScreenArray.push(_this.text2);

        //     //* ADD line 2
        //    // _this.cutLine2 = _this.add.image(112, 340, 'shap_1');
        _this.cutLine3 = _this.add.image(605, 120, 'corss_bigLine');
        _this.cutLine4 = _this.add.image(700, 135, 'corss_smallLine');
        _this.cutLine3.scale.setTo(0.8, 1);
        _this.cutLine4.scale.setTo(0.8, 1);
        _this.cutLine3.visible = false;
        _this.cutLine4.visible = false;
        _this.clearScreenArray.push(_this.cutLine3);
        _this.clearScreenArray.push(_this.cutLine4);

        _this.c3Dotted = _this.add.image(260, 70, 'shap_1');
        _this.c3Dotted.scale.setTo(0.6, 0.55);
        _this.c3Dotted.angle = 43;
        _this.c3Dotted.visible = false;
        _this.clearScreenArray.push(_this.c3Dotted);

        let stringcc = 'c' + '=' + _this.TripletArray[_this.trackCount][2];
        _this.text3 = _this.add.text(270, 200, stringcc);
        _this.applyingStyle(_this.text3);
        _this.text3.visible = false;
        _this.clearScreenArray.push(_this.text3);
        //     //* ADD line 3
        //    // _this.cutLine3 = _this.add.image(112, 340, 'shap_1');
        _this.cutLine5 = _this.add.image(785, 120, 'corss_bigLine');
        _this.cutLine6 = _this.add.image(855, 135, 'corss_smallLine');
        _this.cutLine5.scale.setTo(0.8, 1);
        _this.cutLine6.scale.setTo(0.8, 1);
        _this.cutLine5.visible = false;
        _this.cutLine6.visible = false;
        _this.clearScreenArray.push(_this.cutLine5);
        _this.clearScreenArray.push(_this.cutLine6);
    },

    testSquare: function () {
        _this.graphicsSQ = _this.game.add.graphics(-60, 152);
        _this.graphicsSQ.lineStyle(2, 0x00BFFF, 1);
        _this.graphicsSQ.beginFill(0x00BFFF, 1);

        // Draw triangle
        _this.graphicsSQ.moveTo(285, 100);
        _this.graphicsSQ.lineTo(400, 200);
        _this.graphicsSQ.lineTo(287, 200);
        _this.graphicsSQ.lineTo(287, 100);
        _this.clearScreenArray.push(_this.graphicsSQ);

        // // Render graphics object
        _this.graphicsSQ.endFill();
        _this.graphicsSQ.visible = false;

        _this.s1Dotted = _this.add.image(118, 250, 'shap_5');
        _this.s1Dotted.scale.setTo(0.45, 0.45);
        //   _this.s1Dotted.angle = -89;
        _this.s1Dotted.visible = false;
        _this.clearScreenArray.push(_this.s1Dotted);

        let strings1 = 'a' + '=' + _this.TripletArray[_this.trackCount][0];
        _this.text1 = _this.add.text(145, 280, strings1);
        _this.applyingStyle(_this.text1);
        _this.text1.visible = false;
        _this.clearScreenArray.push(_this.text1);

        _this.s2Dotted = _this.add.image(224, 355, 'shap_5');
        _this.s2Dotted.scale.setTo(0.51, 0.5);
        // _this.s2Dotted.angle = 180;
        _this.s2Dotted.visible = false;
        _this.clearScreenArray.push(_this.s2Dotted);

        let strings2 = 'b' + '=' + _this.TripletArray[_this.trackCount][1];
        _this.text2 = _this.add.text(250, 395, strings2);
        _this.applyingStyle(_this.text2);
        _this.text2.visible = false;
        _this.clearScreenArray.push(_this.text2);

        _this.s3Dotted = _this.add.image(318, 141, 'shap_5');
        _this.s3Dotted.scale.setTo(0.67, 0.6);
        _this.s3Dotted.angle = 41;
        _this.s3Dotted.visible = false;
        _this.clearScreenArray.push(_this.s3Dotted);

        let strings3 = 'c' + '=' + _this.TripletArray[_this.trackCount][2];
        _this.text3 = _this.add.text(300, 230, strings3);
        _this.applyingStyle(_this.text3);
        _this.text3.visible = false;
        _this.clearScreenArray.push(_this.text3);

    },

    simpleFormula2: function () {
        _this.formulaBox1 = _this.add.image(300, 70, 'textbox2');
        _this.formulaBox1.scale.setTo(0.6, 0.8);
        _this.clearScreenArray.push(_this.formulaBox1);

        let string;
        string = 'a' + '\u{00B2}' + ' ' + '+' + ' ' + 'b' + '\u{00B2}';
        _this.semicircleFormula = _this.add.text(250, 245, string)
        _this.semicircleFormula.fill = '#FF0000';

        let string1;
        string1 = '=' + ' ' + 'c' + "\u{00B2}";
        _this.semicircleFormula1 = _this.add.text(350, 245, string1)
        _this.semicircleFormula1.fill = '#FF0000';
        _this.clearScreenArray.push(_this.semicircleFormula);
        _this.clearScreenArray.push(_this.semicircleFormula1);
    },


    simpleFormula1: function () {
        _this.formulaBox1 = _this.add.image(540, 220, 'textbox2');
        _this.formulaBox1.scale.setTo(0.6, 0.8);
        _this.clearScreenArray.push(_this.formulaBox1);

        let string;
        string = 'a' + '\u{00B2}' + ' ' + '+' + ' ' + 'b' + '\u{00B2}';
        _this.semicircleFormula = _this.add.text(620, 245, string)
        _this.semicircleFormula.fill = '#FF0000';

        let string1;
        string1 = '=' + ' ' + 'c' + "\u{00B2}";
        _this.semicircleFormula1 = _this.add.text(710, 245, string1)
        _this.semicircleFormula1.fill = '#FF0000';
        _this.clearScreenArray.push(_this.semicircleFormula);
        _this.clearScreenArray.push(_this.semicircleFormula1);
    },

    simpleFormula: function () {
        _this.formulaBox11 = _this.add.image(500, 220, 'textbox2');
        _this.formulaBox11.scale.setTo(0.8, 0.8);
        _this.clearScreenArray.push(_this.formulaBox11);

        let string;
        string = 'a' + '\u{00B2}' + ' ' + '+' + ' ' + 'b' + '\u{00B2}';
        _this.semicircleFormula = _this.add.text(620, 245, string)
        _this.semicircleFormula.fill = '#FF0000';

        let string1;
        string1 = '=' + ' ' + 'c' + "\u{00B2}";
        _this.semicircleFormula1 = _this.add.text(710, 245, string1)
        _this.semicircleFormula1.fill = '#FF0000';
        _this.clearScreenArray.push(_this.semicircleFormula);
        _this.clearScreenArray.push(_this.semicircleFormula1);
    },

    createHexagonImage: function () {
        //*Hexagon
        _this.time.events.add(2000, function () {
            _this.SmallReward.play();
        })

        _this.bgiPanel = _this.add.image(30, 65, 'bgiPanel');
        _this.bgiPanel.scale.setTo(1.33, 1.13);
        _this.clearScreenArray.push(_this.bgiPanel);

        _this.c1 = _this.add.image(253, 345, 'greenHexa');
        _this.c1.scale.setTo(1.5, 1.5);
        _this.c1.angle = 36;
        _this.c1.visible = false;
        _this.clearScreenArray.push(_this.c1);

        _this.c2 = _this.add.image(290, 200, 'orangeHexa');
        _this.c2.visible = false;
        _this.c3 = _this.add.image(128, 113, 'pinkHexa');
        _this.c3.angle = 26;
        _this.c3.visible = false;
        _this.clearScreenArray.push(_this.c2);
        /////////////
        // _this.areaofA = 3 * Math.sqrt(3) / 2 * (_this.TripletArray[_this.trackCount][0] * _this.TripletArray[_this.trackCount][0]);
        // _this.roundedNumber = _this.areaofA.toFixed(2);
        // _this.areaofB = 3 * Math.sqrt(3) / 2 * (_this.TripletArray[_this.trackCount][1] * _this.TripletArray[_this.trackCount][1]);
        // _this.roundedNumber1 = _this.areaofB.toFixed(2);
        // _this.areaofC = 3 * Math.sqrt(3) / 2 * (_this.TripletArray[_this.trackCount][2] * _this.TripletArray[_this.trackCount][2]);
        // _this.roundedNumber2 = _this.areaofC.toFixed(2);
        /////////////
        _this.textA = _this.add.text(220, 410, _this.roundedNumber);
        _this.applyingStyleWhite(_this.textA);
        _this.textA.visible = false;

        _this.textB = _this.add.text(340, 320, _this.roundedNumber1);
        _this.applyingStyleWhite(_this.textB);
        _this.textB.visible = false;

        _this.textC = _this.add.text(114, 282, _this.thirdHexArea);
        _this.applyingStyleWhite(_this.textC);
        _this.textC.visible = false;

        _this.time.events.add(1000, function () {
            _this.c1.visible = true;
            _this.textA.visible = true;
        })
        _this.time.events.add(1600, function () {
            _this.c2.visible = true;
            _this.textB.visible = true;
            //  _this.c2.angle = 16;
        })

        _this.time.events.add(2100, function () {
            _this.c3.visible = true;
            _this.textC.visible = true;
        })

        _this.formulaBox = _this.add.image(410, 100, 'textbox2');
        _this.formulaBox.scale.setTo(1.1, 1);
        _this.clearScreenArray.push(_this.formulaBox);

        //display The formula's
        // _this.add.formulaBox = _this.add.image(410, 100, 'textbox2');
        // _this.add.formulaBox.scale.setTo(1.1, 1);
        let string;
        string = 3 + '(' + '\u221A' + 3 + '/' + 2 + ')';
        _this.semicircleFormula = _this.add.text(440, 140, string)
        _this.semicircleFormula.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula.fill = '#FF0000';// #808000
        _this.semicircleFormula.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula);

        let string1;
        string1 = 'a' + "\u{00B2}" + ' ' + '+';
        _this.semicircleFormula1 = _this.add.text(540, 140, string1)
        _this.semicircleFormula1.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula1.fill = '#FF0000';// #808000
        _this.semicircleFormula1.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula1);

        let string2;
        string2 = 3 + '(' + '\u221A' + 3 + '/' + 2 + ')';
        _this.semicircleFormula2 = _this.add.text(600, 140, string2)
        _this.semicircleFormula2.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula2.fill = '#FF0000';// #808000
        _this.semicircleFormula2.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula2);

        let string3;
        string3 = 'b' + "\u{00B2}" + ' ' + '=';
        _this.semicircleFormula3 = _this.add.text(700, 140, string3)
        _this.semicircleFormula3.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula3.fill = '#FF0000';// #808000
        _this.semicircleFormula3.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula3);

        let string4;
        string4 = 3 + '(' + '\u221A' + 3 + '/' + 2 + ')';
        _this.semicircleFormula4 = _this.add.text(760, 140, string4)
        _this.semicircleFormula4.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula4.fill = '#FF0000';// #808000
        _this.semicircleFormula4.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula4);

        let string5;
        string5 = 'c' + "\u{00B2}";
        _this.semicircleFormula5 = _this.add.text(860, 140, string5)
        _this.semicircleFormula5.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula5.fill = '#FF0000';// #808000
        _this.semicircleFormula5.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula5);

        _this.testHexa();

        _this.time.events.add(2700, function () {
            _this.c3.visible = false;
            _this.textC.destroy();
            _this.h3Dotted.visible = true;
            _this.cutLine1.visible = true;
            _this.text3.visible = true
            // _this.cutLine2.visible = true;

        });
        _this.time.events.add(3500, function () {
            _this.c2.visible = false;
            _this.textB.destroy();
            //  _this.time.events.add(1000, function()
            // {
            _this.h2Dotted.visible = true;
            _this.cutLine3.visible = true;
            _this.text2.visible = true
            //_this.cutLine4.visible = true;

        });
        _this.time.events.add(4000, function () {
            _this.c1.visible = false;
            _this.textA.destroy();
            _this.h1Dotted.visible = true;
            _this.cutLine5.visible = true;
            _this.text1.visible = true
            // _this.cutLine6.visible = true;

            _this.simpleFormula();
        });
        _this.time.events.add(4500, function () {
            _this.graphicsH.visible = true;
            _this.celebration();
        });

        _this.time.events.add(6800, function () {
            // _this.celebration();
            if (_this.formulaBox) _this.formulaBox.destroy();
            _this.clearScreenArray.forEach(element => {
                element.destroy();
            });
            _this.time.events.add(1500, function () {
                _this.nextquestion();
            })
        });
    },

    createEquilateralImage: function () {
        _this.time.events.add(2000, function () {
            _this.SmallReward.play();
        })
        //*Equilateral
        _this.bgiPanel = _this.add.image(30, 65, 'bgiPanel');
        _this.bgiPanel.scale.setTo(1.33, 1.13);
        _this.clearScreenArray.push(_this.bgiPanel);
        //_this.time.events.add(1000, function () {
        _this.c1 = _this.add.image(260, 490, 'greenLateral');
        _this.c1.angle = 270;
        _this.c1.visible = false;
        _this.clearScreenArray.push(_this.c1);

        //})
        //_this.time.events.add(1500, function () {
        _this.c2 = _this.add.image(110, 103, 'pinkLateral');
        _this.c2.angle = 16;
        _this.c2.visible = false;
        _this.clearScreenArray.push(_this.c2);

        _this.c3 = _this.add.image(220.5, 361, 'orangeLateral');
        _this.c3.angle = 300;
        _this.c3.visible = false;
        _this.clearScreenArray.push(_this.c3);
        // })
        //////////
        // _this.areaofA = Math.sqrt(3) / 4 * (_this.TripletArray[_this.trackCount][0] * _this.TripletArray[_this.trackCount][0]);
        // _this.roundedNumber = _this.areaofA.toFixed(2);
        // _this.areaofB = Math.sqrt(3) / 4 * (_this.TripletArray[_this.trackCount][1] * _this.TripletArray[_this.trackCount][1]);
        // _this.roundedNumber1 = _this.areaofB.toFixed(2);
        // _this.areaofC = Math.sqrt(3) / 4 * (_this.TripletArray[_this.trackCount][2] * _this.TripletArray[_this.trackCount][2]);
        // _this.roundedNumber2 = _this.areaofC.toFixed(2);
        ////////////         
        _this.textA = _this.add.text(330, 450, _this.roundedNumber);
        _this.textA.font = "Akzidenz-Grotesk BQ";
        _this.textA.fill = '#808000';// #808000
        _this.textA.fontWeight = 'normal';
        // _this.applyingStyleWhite(_this.textA);
        _this.textA.alpha = 3.5;
        _this.textA.visible = false;

        _this.textB = _this.add.text(380, 290, _this.roundedNumber1);//380, 323
        _this.applyingStyleWhite(_this.textB);
        _this.textB.visible = false;

        _this.textC = _this.add.text(180, 260, _this.thirdEQArea);
        _this.applyingStyleWhite(_this.textC);
        _this.textC.visible = false;

        _this.time.events.add(1000, function () {
            _this.c1.visible = true;
            _this.textA.visible = true;
        })

        _this.time.events.add(1600, function () {
            _this.c2.visible = true;
            _this.textC.visible = true;
        })

        _this.time.events.add(2100, function () {
            _this.c3.visible = true;
            _this.textB.visible = true;
        })

        _this.formulaBox = _this.add.image(410, 100, 'textbox2');
        _this.formulaBox.scale.setTo(1.1, 1);
        _this.clearScreenArray.push(_this.formulaBox);

        //display The formula's

        let string;
        string = '(' + '\u221A' + 3 + '/' + 4 + ')';
        _this.semicircleFormula = _this.add.text(460, 140, string)
        _this.semicircleFormula.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula.fill = '#FF0000';// #808000
        _this.semicircleFormula.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula);

        let string1;
        string1 = 'a' + "\u{00B2}" + ' ' + '+';
        _this.semicircleFormula1 = _this.add.text(540, 140, string1)
        _this.semicircleFormula1.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula1.fill = '#FF0000';// #808000
        _this.semicircleFormula1.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula1);

        let string2;
        string2 = '(' + '\u221A' + 3 + '/' + 4 + ')';;
        _this.semicircleFormula2 = _this.add.text(600, 140, string2)
        _this.semicircleFormula2.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula2.fill = '#FF0000';// #808000
        _this.semicircleFormula2.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula2);

        let string3;
        string3 = 'b' + "\u{00B2}" + ' ' + '=';
        _this.semicircleFormula3 = _this.add.text(680, 140, string3)
        _this.semicircleFormula3.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula3.fill = '#FF0000';// #808000
        _this.semicircleFormula3.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula3);

        let string4;
        string4 = '(' + '\u221A' + 3 + '/' + 4 + ')';
        _this.semicircleFormula4 = _this.add.text(745, 140, string4)
        _this.semicircleFormula4.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula4.fill = '#FF0000';// #808000
        _this.semicircleFormula4.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula4);

        let string5;
        string5 = 'c' + "\u{00B2}";
        _this.semicircleFormula5 = _this.add.text(825, 140, string5)
        _this.semicircleFormula5.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula5.fill = '#FF0000';// #808000
        _this.semicircleFormula5.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula5);

        _this.testEquilateral();

        _this.time.events.add(2700, function () {
            _this.c3.visible = false;
            _this.textB.destroy();
            _this.e2Dotted.visible = true;
            _this.cutLine1.visible = true;
            _this.text2.visible = true
            // _this.cutLine2.visible = true;

        });
        _this.time.events.add(3500, function () {
            _this.c2.visible = false;
            _this.textC.destroy();
            _this.e3Dotted.visible = true;
            _this.cutLine3.visible = true;
            _this.text3.visible = true
            //_this.cutLine4.visible = true;
        });
        _this.time.events.add(4000, function () {
            _this.c1.visible = false;
            _this.textA.destroy();
            _this.e1Dotted.visible = true;
            _this.cutLine5.visible = true;
            _this.text1.visible = true
            // _this.cutLine6.visible = true;
            _this.simpleFormula1();
        });

        _this.time.events.add(4500, function () {
            _this.graphicsE.visible = true;
            _this.celebration();
        });

        _this.time.events.add(6800, function () {
            // _this.celebration();
            _this.clearScreenArray.forEach(element => {
                element.destroy();
            });
            _this.time.events.add(1500, function () {
                _this.nextquestion();
            })
        });
    },

    createSquareImage: function () {
        _this.time.events.add(2000, function () {
            _this.SmallReward.play();
        })
        //*square
        _this.bgiPanel = _this.add.image(30, 65, 'bgiPanel');
        _this.bgiPanel.scale.setTo(1.33, 1.13);
        _this.clearScreenArray.push(_this.bgiPanel);
        // _this.time.events.add(1000, function () {
        _this.c1 = _this.add.image(120, 250, 'greenbox');
        _this.c1.visible = false;
        _this.clearScreenArray.push(_this.c1);

        _this.c2 = _this.add.image(215, 343, 'Orangebox');
        _this.c2.visible = false;
        _this.clearScreenArray.push(_this.c2);

        _this.c3 = _this.add.image(311, 126.8, 'pinkbox');
        _this.c3.angle = 38;
        _this.c3.visible = false;
        _this.clearScreenArray.push(_this.c3);

        _this.textA = _this.add.text(150, 280, _this.areaofA);//_this.areaofA
        _this.applyingStyleWhite(_this.textA);
        _this.textA.visible = false;

        _this.textB = _this.add.text(265, 390, _this.areaofB);//_this.areaofB
        _this.applyingStyleWhite(_this.textB);
        _this.textB.visible = false;

        _this.textC = _this.add.text(315, 220, _this.areaofC);// _this.areaofC
        _this.applyingStyleWhite(_this.textC);
        _this.textC.visible = false;

        _this.time.events.add(1000, function () {
            _this.c1.visible = true;
            _this.textA.visible = true;
        })
        _this.time.events.add(1600, function () {
            _this.c2.visible = true;
            _this.textB.visible = true;
        })
        _this.time.events.add(2100, function () {
            _this.c3.visible = true;
            _this.textC.visible = true;
        })

        //display The formula's
        _this.formulaBox = _this.add.image(430, 100, 'textbox2');
        _this.formulaBox.scale.setTo(0.9, 1);
        _this.clearScreenArray.push(_this.formulaBox);

        let string;
        string = 'a' + '\u{00B2}' + ' ' + '+' + ' ' + 'b' + '\u{00B2}';
        _this.semicircleFormula = _this.add.text(570, 140, string)
        _this.semicircleFormula.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula.fill = '#FF0000';// #808000
        _this.semicircleFormula.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula);

        let string1;
        string1 = '=' + ' ' + 'c' + "\u{00B2}";
        _this.semicircleFormula1 = _this.add.text(660, 140, string1)
        _this.semicircleFormula1.font = "Akzidenz-Grotesk BQ";
        _this.semicircleFormula1.fill = '#FF0000';// #808000
        _this.semicircleFormula1.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.semicircleFormula1);

        _this.testSquare();

        _this.time.events.add(2700, function () {
            _this.c3.visible = false;
            _this.textC.destroy();
            _this.s3Dotted.visible = true;
            _this.text3.visible = true

        });
        _this.time.events.add(3500, function () {
            _this.c2.visible = false;
            _this.textB.destroy();
            _this.s2Dotted.visible = true;
            _this.text2.visible = true

        });
        _this.time.events.add(4000, function () {
            _this.c1.visible = false;
            _this.textA.destroy();
            _this.s1Dotted.visible = true;
            _this.text1.visible = true

            // _this.simpleFormula();
        });
        _this.time.events.add(4500, function () {
            _this.graphicsSQ.visible = true;
            _this.celebration();
        });

        _this.time.events.add(6800, function () {
            // _this.celebration();
            if (_this.formulaBox) _this.formulaBox.destroy();
            _this.clearScreenArray.forEach(element => {
                element.destroy();
            });
            _this.time.events.add(1500, function () {
                _this.nextquestion();
            })
        });
    },

    test: function () {
        _this.power = "\u{00B2}";
        _this.bgiPanel = _this.add.image(350, 70, 'textbox2');
        _this.bgiPanel.scale.setTo(0.5, 0.8);
        _this.clearScreenArray.push(_this.bgiPanel);

        _this.time.events.add(200, function () {
            _this.formulaA = _this.add.text(390, 100, 'a' + _this.power);
            _this.applyingStyle(_this.formulaA);
            _this.clearScreenArray.push(_this.formulaA);
        })

        _this.time.events.add(700, function () {
            _this.pluSign = _this.add.text(420, 100, '+');
            _this.applyingStyle(_this.pluSign);
            _this.clearScreenArray.push(_this.pluSign);
        })

        _this.time.events.add(1200, function () {
            _this.formulaB = _this.add.text(445, 100, 'b' + _this.power);
            _this.applyingStyle(_this.formulaB);
            _this.clearScreenArray.push(_this.formulaB);
        })

        _this.time.events.add(1700, function () {

            _this.formulaE = _this.add.text(485, 100, '=');
            _this.applyingStyle(_this.formulaE);
            _this.clearScreenArray.push(_this.formulaE);
        })

        _this.time.events.add(2200, function () {

            _this.notequal = _this.add.text(488, 101, '/');
            _this.applyingStyle(_this.notequal);
            _this.clearScreenArray.push(_this.notequal);
        })
        _this.time.events.add(2700, function () {

            _this.formulac = _this.add.text(515, 100, 'c' + _this.power);
            _this.applyingStyle(_this.formulac);
            _this.clearScreenArray.push(_this.formulac);
        })

    },

    moveToAnimationPart: function () {
        console.log('moveToAnimationPart');
        _this.box1_group = _this.add.group();
        _this.box2_group = _this.add.group();
        _this.box3_group = _this.add.group();

        _this.panel2.destroy();
        _this.box11.destroy();
        _this.box22.destroy();
        _this.box33.destroy();

        if (_this.count1 == 0) {
            _this.Ask_Question4.play();
        }
        _this.Question_flag = 3;

        _this.columnGrid.destroy();
        _this.power = "\u{00B2}";
        //_this.bgiPanel = _this.add.image(260, 70, 'bgiPanel');
        _this.bgiPanel.scale.setTo(1, 1.1);
        var graphics = _this.game.add.graphics(0, 0);
        // Set the line style
        graphics.lineStyle(4, 0x00BFFF);
        // Draw a square
        graphics.drawRect(320, 240, 100, 100);
        // Render the graphics
        graphics.endFill();
        _this.clearScreenArray.push(graphics);
        _this.box1_group.addChild(graphics);

        _this.aArea = _this.add.text(330, 270, "a" + _this.power);
        _this.applyingStyle(_this.aArea);
        _this.box1_group.addChild(_this.aArea);
        _this.aAreaSign = _this.add.text(355, 270, "=");
        _this.applyingStyle(_this.aAreaSign);
        _this.box1_group.addChild(_this.aAreaSign);
        _this.aAreaVal = _this.add.text(375, 270, _this.GridTripletArray[_this.limit][0] * _this.GridTripletArray[_this.limit][0]);
        _this.applyingStyle(_this.aAreaVal);
        _this.box1_group.addChild(_this.aAreaVal);
        _this.clearScreenArray.push(_this.aArea);
        _this.clearScreenArray.push(_this.aAreaSign);
        _this.clearScreenArray.push(_this.aAreaVal);

        _this.graphics3 = _this.game.add.graphics(0, 0);
        _this.graphics3.lineStyle(4, 0x00BFFF);
        _this.graphics3.drawRect(460, 110, 160, 160);
        _this.graphics3.endFill();
        _this.box2_group.addChild(_this.graphics3);
        _this.bArea = _this.add.text(490, 170, "c" + _this.power);
        _this.applyingStyle(_this.bArea);
        _this.box2_group.addChild(_this.bArea);
        _this.bAreaSign = _this.add.text(520, 170, "=");
        _this.applyingStyle(_this.bAreaSign);
        _this.box2_group.addChild(_this.bAreaSign);
        _this.bAreaVal = _this.add.text(540, 170, _this.GridTripletArray[_this.limit][2] * _this.GridTripletArray[_this.limit][2]);
        _this.applyingStyle(_this.bAreaVal);
        _this.box2_group.addChild(_this.bAreaVal);
        _this.clearScreenArray.push(_this.graphics3);
        _this.clearScreenArray.push(_this.bAreaSign);
        _this.clearScreenArray.push(_this.bArea);
        _this.clearScreenArray.push(_this.bAreaVal);

        _this.graphics2 = _this.game.add.graphics(0, 0);
        _this.graphics2.lineStyle(4, 0x00BFFF);
        _this.graphics2.drawRect(460, 340, 125, 130);
        _this.graphics2.endFill();
        _this.box3_group.addChild(_this.graphics2);
        _this.cArea = _this.add.text(480, 390, "b" + _this.power);
        _this.applyingStyle(_this.cArea);
        _this.box3_group.addChild(_this.cArea);
        _this.cAreaSign = _this.add.text(510, 390, "=");
        _this.applyingStyle(_this.cAreaSign);
        _this.box3_group.addChild(_this.cAreaSign);
        _this.cAreaVal = _this.add.text(530, 390, _this.GridTripletArray[_this.limit][1] * _this.GridTripletArray[_this.limit][1]);
        _this.applyingStyle(_this.cAreaVal);
        _this.box3_group.addChild(_this.cAreaVal);
        _this.clearScreenArray.push(_this.graphics2);
        _this.clearScreenArray.push(_this.cArea);
        _this.clearScreenArray.push(_this.cAreaSign);
        _this.clearScreenArray.push(_this.cAreaVal);

        _this.graphics22 = _this.game.add.graphics(128, 142);
        // Set line style
        _this.graphics22.lineStyle(2, 0x00BFFF, 1);
        _this.graphics22.beginFill(0x00BFFF, 1);

        // Draw triangle
        _this.graphics22.moveTo(296, 100);
        _this.graphics22.lineTo(417, 200);
        _this.graphics22.lineTo(292, 200);
        _this.graphics22.lineTo(295, 100);

        // Render graphics object
        _this.graphics22.endFill();
        _this.graphics22.visible = false;
        _this.clearScreenArray.push(_this.graphics22);

        _this.thumbsUp = _this.add.sprite(750, 90, 'thumbsUp');
        _this.thumbsDown = _this.add.sprite(820, 90, 'thumbsDown');

        _this.thumbsUp.inputEnabled = true;
        _this.thumbsUp.input.useHandCursor = true;
        _this.thumbsUp.events.onInputDown.add(function () {

            _this.thumbsUp.inputEnabled = false;

            _this.thumbsUp.frame = 1;
            // _this.counterCelebrationSound.play();
            _this.createSquareAnim();
        })

        _this.thumbsDown.inputEnabled = true;
        _this.thumbsDown.input.useHandCursor = true;
        _this.thumbsDown.events.onInputDown.add(function () {

            // _this.thumbsDown.inputEnabled = false;
            _this.thumbsDown.frame = 1;
            _this.noofAttempts ++;
            _this.wrongSound.play();
            _this.time.events.add(1000, function () {
                _this.thumbsDown.frame = 0;
            })
        })

    },

    createSquareAnim: function () {
        _this.thumbsUp.destroy();
        _this.thumbsDown.destroy();
        // _this.time.events.add(2000, function () {
        _this.SmallReward.play();
        // })
        _this.tweenPEraser = _this.add.tween(_this.box3_group);
        _this.tweenPEraser.to({ x: -40, y: 0 }, 500, 'Linear', true, 0);
        _this.tweenPEraser.start();

        _this.tweenPEraser.onComplete.add(function () {

            _this.tweenPEraser11 = _this.add.tween(_this.box2_group);
            _this.tweenPEraser11.to({ x: 243, y: -265, angle: 40 }, 500, 'Linear', true, 0);
            _this.tweenPEraser11.start();

            _this.tweenPEraser11.onComplete.add(function () {
                _this.graphics22.visible = true;

                _this.textbox2 = _this.add.image(690, 90, 'textbox2');
                _this.textbox2.scale.setTo(0.4, 0.7);
                _this.clearScreenArray.push(_this.textbox2);
                _this.formulaA = _this.add.text(710, 115, 'a' + _this.power);
                _this.applyingStyle(_this.formulaA);
                _this.clearScreenArray.push(_this.formulaA);
                _this.pluSign = _this.add.text(745, 115, '+');
                _this.applyingStyle(_this.pluSign);
                _this.clearScreenArray.push(_this.pluSign);
                _this.formulaB = _this.add.text(770, 115, 'b' + _this.power);
                _this.applyingStyle(_this.formulaB);
                _this.clearScreenArray.push(_this.formulaB);
                _this.formulaEQ = _this.add.text(810, 115, '=');
                _this.applyingStyle(_this.formulaEQ);
                _this.clearScreenArray.push(_this.formulaEQ);
                _this.formulaC = _this.add.text(840, 115, 'c' + _this.power);
                _this.applyingStyle(_this.formulaC);
                _this.clearScreenArray.push(_this.formulaC);

                _this.celebration();
                _this.time.events.add(1900, function () {
                    // _this.celebration();
                    _this.bgiPanel.destroy();

                    _this.clearScreenArray.forEach(element => {
                        element.destroy();
                        // _this.count1 = 0;
                    });
                    _this.displayNextShapes();
                })
            })
            // })
        })

    },

    Initial_randomizing: function () {
        //* Randomize the shapes between rectangle and square for area to display 
        //*randomize the quation or the numbers to find the area of a rect angle and square
        //*Decide the shapes
        // _this.shapesArray = [1, 2, 3]; //,2,3
        // _this.shapesArray = _this.shuffle(_this.shapesArray);

        //* GM_PYTH
        // function generatePythagoreanTriples(limit) {
        //     const triples = [];
        //     for (let a = 1; a <= limit; a++) {
        //       for (let b = a; b <= limit; b++) {
        //         const c = Math.sqrt(a * a + b * b);
        //         if (c % 1 === 0 && c <= limit) {
        //           triples.push([a, b, c]);
        //         }
        //       }
        //     }
        //     return triples;
        //   }

        //*Here decide which shape you want to display 
        //* you have semi circle,hexagon and equilateral triangle
        //*display panel, one button and first shape
        //* when click on button display the foemula plus area of the shape
        /** */
        _this.decideShape = [1, 2, 3, 4];//1, 2, 3, 4
        _this.term = Math.floor(Math.random() * 4) + 1;

        _this.decideShape.push(_this.term);
        // _this.decideShape = [1];
        //1 - semicircle,2 - hexagon, 3 - equilateral, 4 - square
        _this.shuffle(_this.decideShape);


        _this.GridTripletArray = [];
        _this.TripletArray = [];
        _this.nonPyth_Triplets = [[2, 3, 4], [3, 5, 7], [5, 8, 10]];
        _this.shuffle(_this.nonPyth_Triplets);

        // Example usage
        _this.triples = _this.generatePythagoreanTriples(20);
        console.log(_this.triples); // [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [12, 16, 20]]
        console.log(_this.triples[0], "0000");
        _this.shuffle(_this.triples);

        _this.GridTripletArray.push(_this.triples[0]);

        for (i = 1; i < 5; i++) {
            _this.TripletArray.push(_this.triples[i]);

        }
        _this.TripletArray.push(_this.nonPyth_Triplets[0]);
        _this.shuffle(_this.TripletArray);

        console.log(_this.TripletArray, "_this.TripletArray !!!!!!");
        console.log(_this.GridTripletArray, "_this.GridTripletArray @@@");
        console.log(_this.decideShape, "_this.decideShape %%%");
    },

    generatePythagoreanTriples(limit) {
        const triples = [];
        for (let a = 1; a <= limit; a++) {
            for (let b = a; b <= limit; b++) {
                const c = Math.sqrt(a * a + b * b);
                if (c % 1 === 0 && c <= limit) {
                    triples.push([a, b, c]);
                }
            }
        }
        return triples;
    },

    displayGridView: function () {
        if (_this.count1 == 0) {
            _this.Ask_Question1.play();
        }
        _this.Question_flag = 0;
        _this.aGroup = [];
        _this.bGroup = [];
        _this.cGroup = [];
        _this.shuffle(_this.triples);
        _this.box3_1 = 0;
        _this.box2_1 = 0;
        _this.box1_1 = 0;
        console.log(_this.triples, "_this.triples");

        _this.bgiPanel = _this.add.image(260, 70, 'bgiPanel');
        _this.columnGrid = _this.add.image(265, 75, 'columnGrid');
        _this.columnGrid.scale.setTo(1.14, 1.08);

        _this.panel2 = _this.add.image(25, 70, 'panel1');

        _this.box11 = _this.add.sprite(50, 80, 'pinkbox');//a
        _this.box11.frame = 1;
        _this.box22 = _this.add.sprite(63, 240, 'Orangebox');//b
        _this.box22.frame = 1;
        _this.box33 = _this.add.sprite(76, 370, 'greenbox');
        _this.box33.frame = 1;

        _this.box1 = _this.add.sprite(50, 80, 'pinkbox');//a
        _this.box2 = _this.add.sprite(63, 240, 'Orangebox');//b
        _this.box3 = _this.add.sprite(76, 370, 'greenbox');//c

        _this.box1.inputEnabled = true;
        _this.box2.inputEnabled = true;
        _this.box3.inputEnabled = true;

        _this.box1.input.useHandCursor = true;
        _this.box2.input.useHandCursor = true;
        _this.box3.input.useHandCursor = true;

        _this.box1.events.onInputDown.add(_this.box1Clicked, _this);
        _this.box2.events.onInputDown.add(_this.box2Clicked, _this);
        _this.box3.events.onInputDown.add(_this.box3Clicked, _this);

        if (_this.count1 == 0) _this.showtank1ClickigDemo();
    },

    box1Clicked: function () {

        _this.tweebox1 = _this.add.tween(_this.box1);
        _this.tweebox1.to({ x: 515, y: 155 }, 500, 'Linear', true, 0);
        _this.box1.bringToTop();
        _this.tweebox1.start();

        _this.tweebox1.onComplete.add(function () {
            if (_this.count1 == 0) {
                _this.Ask_Question2.play();
            }
            _this.Question_flag = 1;

            _this.box_flag = 1;
            _this.box1.destroy();
            _this.bx1_Box = 0;
            // _this.box1.inputEnabled = false;
            if (_this.box2) _this.box2.inputEnabled = false;
            if (_this.box3) _this.box3.inputEnabled = false;

            _this.equationVarC = _this.GridTripletArray[_this.limit][2];
            _this.addNewPinkBox = _this.add.sprite(515, 155, 'pinkbox');
            //  _this.cGroup.push(_this.addNewPinkBox);

            _this.x1 = _this.addNewPinkBox.x + 10;//* _this.equationVarC;  
            _this.y1 = _this.addNewPinkBox.y + 10;
            _this.tx = _this.addNewPinkBox.x + 15 * _this.equationVarC;
            _this.ty = _this.addNewPinkBox.y + 15 * _this.equationVarC;

            if (_this.count1 == 0 && _this.hand_flag == 1) _this.showtank1ClickigDemo2();

            _this.addNewPinkBox.scale.setTo(0.106 * _this.equationVarC, 0.101 * _this.equationVarC);
            _this.columnGrid.bringToTop();
            _this.columnGrid.alpha = 0.5;

            var graphics = _this.game.add.graphics(514, 154);
            graphics.lineStyle(5, 0x00BFFF);
            graphics.moveTo(0, 0);
            graphics.lineTo(16.75 * _this.equationVarC, 0);//100
            graphics.endFill();
            _this.cGroup.push(graphics);

            _this.displayC = _this.add.text(530, 120, 'c');
            _this.applyingStyle(_this.displayC);
            _this.cGroup.push(_this.displayC);

            _this.AnswerBox = _this.add.image(740, 80, 'textBox1');
            _this.AnswerBox.scale.setTo(0.9, 1);
            _this.addTextC = _this.add.text(770, 100, 'c');
            _this.applyingStyle(_this.addTextC);
            _this.cGroup.push(_this.addTextC);
            _this.addEqualsign = _this.add.text(790, 100, '=');
            _this.applyingStyle(_this.addEqualsign);
            _this.cGroup.push(_this.addEqualsign);

            _this.addNumberPad();
        })
    },

    box2Clicked: function () {

        _this.tweebox2 = _this.add.tween(_this.box2);
        _this.tweebox2.to({ x: 432, y: 155 }, 500, 'Linear', true, 0);
        _this.box2.bringToTop();
        _this.tweebox2.start();

        _this.tweebox2.onComplete.add(function () {
            if (_this.count1 == 0) {
                _this.Ask_Question2.play();
            }
            _this.Question_flag = 1;

            _this.box_flag = 2;
            _this.box2.destroy();
            _this.bx2_Box = 0;

            if (_this.box1) _this.box1.inputEnabled = false;
            if (_this.box3) _this.box3.inputEnabled = false;

            _this.equationVarb = _this.GridTripletArray[_this.limit][1];
            _this.addNewOrangeBox = _this.add.sprite(432, 156, 'Orangebox');
            // _this.bGroup.push(_this.addNewOrangeBox);

            _this.x1 = _this.addNewOrangeBox.x + 10;
            _this.y1 = _this.addNewOrangeBox.y + 10;
            _this.tx = _this.addNewOrangeBox.x + 15 * _this.equationVarb;
            _this.ty = _this.addNewOrangeBox.y + 15 * _this.equationVarb;

            if (_this.count1 == 0 && _this.hand_flag == 1) _this.showtank1ClickigDemo2();
            // _this.equationVarb = _this.triples[0][1];
            _this.addNewOrangeBox.scale.setTo(0.132 * _this.equationVarb, 0.126 * _this.equationVarb);//0.9, 0.85 = 5 grid, to reach one grid = width = 0.18, height = 0.2

            _this.columnGrid.bringToTop();
            _this.columnGrid.alpha = 0.5;

            var graphics = _this.game.add.graphics(431, 155);
            graphics.lineStyle(5, 0x00BFFF);
            graphics.moveTo(0, 0);
            graphics.lineTo(16.7 * _this.equationVarb, 0);//100
            graphics.endFill();
            _this.bGroup.push(graphics);

            _this.displayB = _this.add.text(440, 120, 'b');
            _this.applyingStyle(_this.displayB);
            _this.bGroup.push(_this.displayB);

            _this.AnswerBox = _this.add.image(740, 80, 'textBox1');
            _this.AnswerBox.scale.setTo(0.9, 1);
            _this.addTextB = _this.add.text(770, 100, 'b');
            _this.applyingStyle(_this.addTextB);
            _this.bGroup.push(_this.addTextB);
            _this.addEqualsign = _this.add.text(790, 100, '=');
            _this.applyingStyle(_this.addEqualsign);
            _this.bGroup.push(_this.addEqualsign);

            _this.addNumberPad();
        })

    },

    box3Clicked: function () {

        _this.tweebox3 = _this.add.tween(_this.box3);
        _this.tweebox3.to({ x: 348, y: 230 }, 500, 'Linear', true, 0);
        _this.box3.bringToTop();
        _this.tweebox3.start();

        _this.tweebox3.onComplete.add(function () {

            if (_this.count1 == 0) {
                _this.Ask_Question2.play();
            }

            _this.Question_flag = 1;

            _this.box_flag = 3;
            _this.box3.destroy();
            _this.bx3_Box = 0;
            _this.tempText = 5;

            _this.addNewGreenBox = _this.add.sprite(348, 231.5, 'greenbox');
            // _this.aGroup.push(_this.addNewGreenBox);
            _this.x1 = _this.addNewGreenBox.x + 10;
            _this.y1 = _this.addNewGreenBox.y + 10;
            _this.tx = _this.addNewGreenBox.x + 15 * _this.GridTripletArray[_this.limit][0];
            _this.ty = _this.addNewGreenBox.y + 15 * _this.GridTripletArray[_this.limit][0];

            if (_this.count1 == 0 && _this.hand_flag == 1) _this.showtank1ClickigDemo2();

            if (_this.box1) _this.box1.inputEnabled = false;
            if (_this.box2) _this.box2.inputEnabled = false;

            _this.equationVar = _this.GridTripletArray[_this.limit][0];//_this.triples[0][0];
            _this.addNewGreenBox.scale.setTo(0.18 * _this.equationVar, 0.17 * _this.equationVar);

            _this.columnGrid.bringToTop();
            _this.columnGrid.alpha = 0.5;

            // Create a new graphics object
            var graphics = _this.game.add.graphics(348, 230);
            // Set the line style
            graphics.lineStyle(5, 0x00BFFF);
            // Draw a line
            graphics.moveTo(0, 0);
            graphics.lineTo(16.8 * _this.equationVar, 0);//100

            // Render the graphics
            graphics.endFill();
            _this.aGroup.push(graphics);

            _this.displayA = _this.add.text(380, 200, 'a');
            _this.applyingStyle(_this.displayA);
            // _this.aGroup.push(_this.displayA);

            _this.AnswerBox = _this.add.image(740, 80, 'textBox1');
            _this.AnswerBox.scale.setTo(0.9, 1);
            _this.addTextA = _this.add.text(770, 100, 'a');
            _this.applyingStyle(_this.addTextA);
            _this.aGroup.push(_this.addTextA);
            _this.addEqualsign = _this.add.text(790, 100, '=');
            _this.applyingStyle(_this.addEqualsign);
            _this.aGroup.push(_this.addEqualsign);

            _this.addNumberPad();

        })
    },

    eraseAllTheBox: function () {
        _this.bx1_Box = 1;
        _this.bx2_Box = 1;
        _this.bx3_Box = 1;
        _this.addNewGreenBox.destroy();
        _this.displayAArea.destroy();
        _this.addNewOrangeBox.destroy();
        _this.displayBArea.destroy();
        _this.addNewPinkBox.destroy();
        _this.displayCArea.destroy();
    },

    displayNextShapes: function () {
        _this.sceneCount ++;
        _this.AnsTimerCount = 0;
        _this.noofAttempts = 0;
        // //*Here decide which shape you want to display 
        // //* you have semi circle,hexagon and equilateral triangle
        // //*display panel, one button and first shape
        // //* when click on button display the foemula plus area of the shape
        // _this.decideShape = [1, 2, 3, 4];//1 - semicircle,2 - hexagon, 3 - equilateral, 4 - square
        // //_this.shuffle(_this.decideShape);

        console.log(_this.decideShape, "_this.decideShape");
        if (_this.decideShape[_this.trackCount] == 1) {
            _this.displaySemiCircles();
        } else if (_this.decideShape[_this.trackCount] == 2) {
            _this.displayHexagons();
        } else if (_this.decideShape[_this.trackCount] == 3) {
            _this.displayEqulaterals();
        } else {
            _this.displaySquareshapes();
        }

    },

    checkPyth: function () {
        _this.aSquare = _this.TripletArray[_this.trackCount][0] * _this.TripletArray[_this.trackCount][0];
        _this.bSquare = _this.TripletArray[_this.trackCount][1] * _this.TripletArray[_this.trackCount][1];
        _this.cSquare = _this.TripletArray[_this.trackCount][2] * _this.TripletArray[_this.trackCount][2];

        if (_this.aSquare + _this.bSquare == _this.cSquare) {
            _this.is_Pyth = true;
        } else {
            _this.is_Pyth = false;
        }
    },

    displaySquareshapes: function () {
        if (_this.count1 == 1) {
            _this.Ask_Question5.play();
        }
        _this.Question_flag = 4;
        if (_this.count1 == 1 && _this.f_buttonClick == false) _this.showButtonClickigDemo();

        _this.square1_flag = 1;
        _this.formlaButton = _this.add.image(50, 60, 'formlaButton');
        _this.rectPanel = _this.add.image(50, 160, 'rectPanel');
        _this.rectPanel.scale.setTo(0.95, 0.95);
        _this.clearScreenArray.push(_this.formlaButton);
        _this.clearScreenArray.push(_this.rectPanel);

        _this.equilateral1 = _this.add.image(80, 270, 'greenbox');
        _this.equilateralLine1 = _this.add.image(182, 272, 'greenEqLine');
        _this.displayAvalue = _this.add.text(220, 310, 'a' + '=');
        _this.displayAvalue.font = "Akzidenz-Grotesk BQ";
        _this.displayAvalue.fill = '#808000';// #808000
        _this.displayAvalue.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.equilateral1);
        _this.clearScreenArray.push(_this.equilateralLine1);
        _this.clearScreenArray.push(_this.displayAvalue);

        _this.tripletA = _this.add.text(260, 310, _this.TripletArray[_this.trackCount][0]);
        _this.tripletA.font = "Akzidenz-Grotesk BQ";
        _this.tripletA.fill = '#808000';// #808000
        _this.tripletA.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.tripletA);

        _this.formlaButton.inputEnabled = true;
        _this.formlaButton.input.useHandCursor = true;
        _this.formlaButton.events.onInputDown.add(function () {
            _this.TapSound.play();
            if (_this.square1_flag == 1) {
                _this.formlaButton.frame = 1;
                _this.formlaButton.inputEnabled = false;
                _this.formlaSquare = _this.add.text(130, 90, 's' + '\u{00B2}');
                _this.formlaSquare.font = "Akzidenz-Grotesk BQ";
                _this.formlaSquare.fill = '#FF0000';// #808000
                _this.formlaSquare.fontWeight = 'normal';

                _this.aSquare = _this.add.text(100, 420, 'A' + "=");
                _this.aSquare.font = "Akzidenz-Grotesk BQ";
                _this.aSquare.fill = '#808000';// #808000
                _this.aSquare.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.aSquare);

                _this.areaofA = _this.TripletArray[_this.trackCount][0] * _this.TripletArray[_this.trackCount][0];
                //   _this.areaofA = 46;
                if (_this.areaofA < 10) _this.x = 155;
                if (_this.areaofA > 9) _this.x = 150;
                _this.displayAreaA = _this.add.text(_this.x, 420, _this.areaofA);
                _this.displayAreaA.font = "Akzidenz-Grotesk BQ";
                _this.displayAreaA.fill = '#808000';// #808000
                _this.displayAreaA.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.displayAreaA);


                _this.square1_flag = 2;
                _this.time.events.add(1500, function () {
                    _this.formlaSquare.visible = false;
                    _this.formlaButton.frame = 0;
                    _this.formlaButton.inputEnabled = true;

                    _this.squareB2 = _this.add.image(300, 260, 'Orangebox');
                    _this.squareBLine2 = _this.add.image(432, 262, 'orangeXLine');
                    _this.displayAvalue = _this.add.text(470, 310, 'b' + '=');
                    _this.displayAvalue.font = "Akzidenz-Grotesk BQ";
                    _this.displayAvalue.fill = '#FF7F50';// #808000
                    _this.displayAvalue.fontWeight = 'normal';
                    _this.clearScreenArray.push(_this.squareB2);
                    _this.clearScreenArray.push(_this.squareBLine2);
                    _this.clearScreenArray.push(_this.displayAvalue);

                    _this.tripletB = _this.add.text(510, 310, _this.TripletArray[_this.trackCount][1]);
                    _this.tripletB.font = "Akzidenz-Grotesk BQ";
                    _this.tripletB.fill = '#FF7F50';// #808000
                    _this.tripletB.fontWeight = 'normal';
                    _this.clearScreenArray.push(_this.tripletB);

                })
            } else if (_this.square1_flag == 2) {
                _this.formlaButton.inputEnabled = false;
                _this.formlaButton.frame = 1;
                _this.formlaSquare.visible = true;

                _this.bSquare = _this.add.text(320, 420, 'A' + "=");
                _this.bSquare.font = "Akzidenz-Grotesk BQ";
                _this.bSquare.fill = '#FF7F50';// #808000
                _this.bSquare.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.bSquare);

                _this.areaofB = _this.TripletArray[_this.trackCount][1] * _this.TripletArray[_this.trackCount][1];
                //  var roundedNumber = _this.areaofB.toFixed(2);
                if (_this.areaofB < 10) _this.x1 = 390;
                if (_this.areaofB > 9) _this.x1 = 380;
                if (_this.areaofB > 99) _this.x1 = 370;
                _this.displayAreaB = _this.add.text(_this.x1, 420, _this.areaofB);
                _this.displayAreaB.font = "Akzidenz-Grotesk BQ";
                _this.displayAreaB.fill = '#FF7F50';// #808000
                _this.displayAreaB.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.displayAreaB);

                _this.square1_flag = 3;
                _this.time.events.add(1500, function () {
                    _this.formlaSquare.visible = false;
                    _this.formlaButton.frame = 0;
                    _this.formlaButton.inputEnabled = true;

                    //c
                    _this.equilateral3 = _this.add.image(570, 240, 'pinkbox');
                    _this.equilateralLine3 = _this.add.image(740, 242, 'pinkXLine');
                    _this.equilateralLine3.scale.setTo(1, 1.25);
                    _this.displayAvalue = _this.add.text(790, 310, 'c' + '=');
                    _this.displayAvalue.font = "Akzidenz-Grotesk BQ";
                    _this.displayAvalue.fill = '#FF1493';// //FF1493
                    _this.displayAvalue.fontWeight = 'normal';
                    _this.clearScreenArray.push(_this.equilateral3);
                    _this.clearScreenArray.push(_this.equilateralLine3);
                    _this.clearScreenArray.push(_this.displayAvalue);

                    _this.tripletA = _this.add.text(830, 310, _this.TripletArray[_this.trackCount][2]);
                    _this.tripletA.font = "Akzidenz-Grotesk BQ";
                    _this.tripletA.fill = '#FF1493';// #808000
                    _this.tripletA.fontWeight = 'normal';
                    _this.clearScreenArray.push(_this.tripletA);
                })

            } else {
                if (_this.count1 == 1) {
                    _this.Ask_Question4.play();
                }
                _this.Question_flag = 3;
                _this.formlaButton.frame = 1;
                _this.formlaSquare.visible = true;
                _this.formlaButton.inputEnabled = false;

                _this.cSquare = _this.add.text(600, 420, 'A' + "=");
                _this.cSquare.font = "Akzidenz-Grotesk BQ";
                _this.cSquare.fill = '#FF1493';// #808000
                _this.cSquare.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.cSquare);

                _this.areaofC = _this.TripletArray[_this.trackCount][2] * _this.TripletArray[_this.trackCount][2];
                if (_this.areaofC < 10) _this.x2 = 670;
                if (_this.areaofC > 9) _this.x2 = 660;
                if (_this.areaofC > 99) _this.x2 = 650;
                _this.displayAreaC = _this.add.text(_this.x2, 420, _this.areaofC);
                _this.displayAreaC.font = "Akzidenz-Grotesk BQ";
                _this.displayAreaC.fill = '#FF1493';// #808000
                _this.displayAreaC.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.displayAreaC);

                _this.time.events.add(800, function () {
                    _this.formlaButton.destroy();
                    _this.formlaSquare.destroy();
                })

                //* add ThumsUp and Down symbol

                _this.thumbsUp = _this.add.sprite(750, 80, 'thumbsUp');
                _this.thumbsDown = _this.add.sprite(820, 80, 'thumbsDown');

                _this.thumbsUp.inputEnabled = true;
                _this.thumbsUp.input.useHandCursor = true;
                _this.thumbsUp.events.onInputDown.add(function () {

                    _this.thumbsUp.frame = 1;
                    _this.checkPyth();
                    if (_this.is_Pyth == true) {
                        _this.thumbsUp.inputEnabled = false;
                        _this.counterCelebrationSound.play();
                        _this.thumbsUp.destroy();
                        _this.thumbsDown.destroy();
                        //* Anikmation for Semi Circle
                        _this.createSquareImage();
                    } else {
                        _this.noofAttempts ++;
                        _this.wrongSound.play();
                        _this.time.events.add(1000, function () {
                            _this.thumbsUp.frame = 0;
                        })
                    }
                })

                _this.thumbsDown.inputEnabled = true;
                _this.thumbsDown.input.useHandCursor = true;
                _this.thumbsDown.events.onInputDown.add(function () {

                    _this.thumbsDown.frame = 1;
                    _this.checkPyth();
                    if (_this.is_Pyth == false) {
                        _this.thumbsUp.inputEnabled = false;
                        _this.thumbsUp.destroy();
                        _this.thumbsDown.destroy();

                        _this.Ask_Question7.play();
                        _this.Question_flag = 6;

                        _this.test();
                        _this.Ask_Question7.addEventListener('ended', function () {
                            _this.celebration();
                            _this.time.events.add(1200, function () {
                                _this.clearScreenArray.forEach(element => {
                                    element.destroy();
                                })
                                _this.nextquestion();
                            })
                        });

                    } else {
                        _this.noofAttempts ++;
                        // _this.thumbsDown.frame = 1;
                        _this.wrongSound.play();
                        _this.time.events.add(1000, function () {
                            _this.thumbsDown.frame = 0;
                        })
                    }
                })
            }
        })

    },

    displayEqulaterals: function () {
        if (_this.count1 == 1) {
            _this.Ask_Question5.play();
        }
        _this.Question_flag = 4;
        if (_this.count1 == 1 && _this.f_buttonClick == false) _this.showButtonClickigDemo();

        _this.equilateral_flag = 1;
        _this.formlaButton = _this.add.image(50, 60, 'formlaButton');
        _this.rectPanel = _this.add.image(50, 160, 'rectPanel');
        _this.rectPanel.scale.setTo(0.95, 0.95);
        _this.clearScreenArray.push(_this.formlaButton);
        _this.clearScreenArray.push(_this.rectPanel);

        _this.equilateral1 = _this.add.image(70, 300, 'greenLateral');
        _this.equilateralLine1 = _this.add.image(145, 300, 'greenEqLine');
        _this.displayAvalue = _this.add.text(180, 320, 'a' + '=');
        _this.displayAvalue.font = "Akzidenz-Grotesk BQ";
        _this.displayAvalue.fill = '#808000';// #808000
        _this.displayAvalue.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.equilateral1);
        _this.clearScreenArray.push(_this.equilateralLine1);
        _this.clearScreenArray.push(_this.displayAvalue);

        _this.tripletA = _this.add.text(220, 320, _this.TripletArray[_this.trackCount][0]);
        _this.tripletA.font = "Akzidenz-Grotesk BQ";
        _this.tripletA.fill = '#808000';// #808000
        _this.tripletA.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.tripletA);

        _this.formlaButton.inputEnabled = true;
        _this.formlaButton.input.useHandCursor = true;
        _this.formlaButton.events.onInputDown.add(function () {
            _this.TapSound.play();
            if (_this.equilateral_flag == 1) {
                //Formula for Equilateral //A = (√3/4) x s²
                _this.formlaButton.frame = 1;
                _this.formlaButton.inputEnabled = false;
                _this.formlaEquilateral = _this.add.text(130, 90, '(' + '\u221A' + 3 + '/' + 4 + ')' + ' ' + 'r' + '\u{00B2}');
                _this.formlaEquilateral.font = "Akzidenz-Grotesk BQ";
                _this.formlaEquilateral.fill = '#FF0000';// #808000
                _this.formlaEquilateral.fontWeight = 'normal';

                _this.aSquare = _this.add.text(75, 450, 'A' + "=");
                _this.aSquare.font = "Akzidenz-Grotesk BQ";
                _this.aSquare.fill = '#808000';// #808000
                _this.aSquare.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.aSquare);

                //(√3/4) x 64
                _this.areaofA = Math.sqrt(3) / 4 * (_this.TripletArray[_this.trackCount][0] * _this.TripletArray[_this.trackCount][0]);
                _this.roundedNumber = _this.areaofA.toFixed(2);
                _this.displayAreaA = _this.add.text(125, 450, _this.roundedNumber);
                _this.displayAreaA.font = "Akzidenz-Grotesk BQ";
                _this.displayAreaA.fill = '#808000';// #808000
                _this.displayAreaA.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.displayAreaA);

                _this.equilateral_flag = 2;
                _this.time.events.add(1500, function () {
                    _this.formlaEquilateral.visible = false;
                    _this.formlaButton.frame = 0;
                    //     _this.formlaButton.visible = true;
                    _this.formlaButton.inputEnabled = true;

                    _this.equilateral2 = _this.add.image(252, 215, 'orangeLateral');
                    _this.equilateral2.scale.setTo(0.9, 0.9);
                    _this.equilateralLine2 = _this.add.image(465, 215, 'orangeEqLine');
                    _this.equilateralLine2.scale.setTo(0.9, 0.9);
                    _this.displayAvalue = _this.add.text(500, 315, 'b' + '=');
                    _this.displayAvalue.font = "Akzidenz-Grotesk BQ";
                    _this.displayAvalue.fill = '#FF7F50';// #808000
                    _this.displayAvalue.fontWeight = 'normal';
                    _this.clearScreenArray.push(_this.equilateral2);
                    _this.clearScreenArray.push(_this.equilateralLine2);
                    _this.clearScreenArray.push(_this.displayAvalue);

                    _this.tripletA = _this.add.text(540, 315, _this.TripletArray[_this.trackCount][1]);
                    _this.tripletA.font = "Akzidenz-Grotesk BQ";
                    _this.tripletA.fill = '#FF7F50';// #808000
                    _this.tripletA.fontWeight = 'normal';
                    _this.clearScreenArray.push(_this.tripletA);

                })

            } else if (_this.equilateral_flag == 2) {
                _this.formlaButton.frame = 1;
                _this.formlaButton.inputEnabled = false;
                _this.formlaEquilateral.visible = true;

                _this.bSquare = _this.add.text(315, 450, 'A' + "=");
                _this.bSquare.font = "Akzidenz-Grotesk BQ";
                _this.bSquare.fill = '#FF7F50';// #808000
                _this.bSquare.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.bSquare);

                _this.areaofB = Math.sqrt(3) / 4 * (_this.TripletArray[_this.trackCount][1] * _this.TripletArray[_this.trackCount][1]);
                _this.roundedNumber1 = _this.areaofB.toFixed(2);
                _this.displayAreaB = _this.add.text(365, 450, _this.roundedNumber1);
                _this.displayAreaB.font = "Akzidenz-Grotesk BQ";
                _this.displayAreaB.fill = '#FF7F50';// #808000
                _this.displayAreaB.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.displayAreaB);

                _this.equilateral_flag = 3;

                _this.time.events.add(1500, function () {
                    _this.formlaEquilateral.visible = false;
                    _this.formlaButton.frame = 0;
                    _this.formlaButton.inputEnabled = true;

                    //c
                    _this.equilateral3 = _this.add.image(580, 195, 'pinkLateral');
                    _this.equilateralLine3 = _this.add.image(815, 195, 'pinkEqLine');
                    _this.displayAvalue = _this.add.text(855, 310, 'c' + '=');
                    _this.displayAvalue.font = "Akzidenz-Grotesk BQ";
                    _this.displayAvalue.fill = '#FF1493';// //FF1493
                    _this.displayAvalue.fontWeight = 'normal';
                    _this.clearScreenArray.push(_this.equilateral3);
                    _this.clearScreenArray.push(_this.equilateralLine3);
                    _this.clearScreenArray.push(_this.displayAvalue);

                    _this.tripletA = _this.add.text(890, 310, _this.TripletArray[_this.trackCount][2]);
                    _this.tripletA.font = "Akzidenz-Grotesk BQ";
                    _this.tripletA.fill = '#FF1493';// #808000
                    _this.tripletA.fontWeight = 'normal';
                    _this.clearScreenArray.push(_this.tripletA);
                })
            }
            else {
                if (_this.count1 == 1) {
                    _this.Ask_Question4.play();
                }
                _this.Question_flag = 3;
                _this.formlaButton.frame = 1;
                _this.formlaEquilateral.visible = true;
                _this.formlaButton.inputEnabled = false;

                _this.cSquare = _this.add.text(650, 450, 'A' + "=");
                _this.cSquare.font = "Akzidenz-Grotesk BQ";
                _this.cSquare.fill = '#FF1493';// #808000
                _this.cSquare.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.cSquare);

                // _this.areaofC = Math.sqrt(3) / 4 * (_this.TripletArray[_this.trackCount][2] * _this.TripletArray[_this.trackCount][2]);
                // console.log(_this.areaofC, " _this.areaofC >>>>");
                // _this.roundedNumberEQ = _this.areaofC.toFixed(2);
                _this.checkPyth();
                if (_this.is_Pyth == true) {
                    console.log("PYTH @@");
                    _this.thirdEQArea = Number(_this.roundedNumber) + Number(_this.roundedNumber1);
                    _this.thirdEQArea = _this.thirdEQArea.toFixed(2)
                } else {
                    console.log("No PYTH @@");
                    _this.areaofC = Math.sqrt(3) / 4 * (_this.TripletArray[_this.trackCount][2] * _this.TripletArray[_this.trackCount][2]);
                    _this.thirdEQArea = _this.areaofC.toFixed(2);
                }
                _this.displayAreaC = _this.add.text(700, 450, _this.thirdEQArea);
                _this.displayAreaC.font = "Akzidenz-Grotesk BQ";
                _this.displayAreaC.fill = '#FF1493';// #808000
                _this.displayAreaC.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.displayAreaC);

                _this.time.events.add(800, function () {
                    _this.formlaButton.destroy();
                    _this.formlaEquilateral.destroy();

                })
                //* add ThumsUp and Down symbol
                _this.thumbsUp = _this.add.sprite(750, 80, 'thumbsUp');
                _this.thumbsDown = _this.add.sprite(820, 80, 'thumbsDown');

                _this.thumbsUp.inputEnabled = true;
                _this.thumbsUp.input.useHandCursor = true;
                _this.thumbsUp.events.onInputDown.add(function () {

                    _this.thumbsUp.frame = 1;
                    // _this.checkPyth();

                    if (_this.is_Pyth == true) {
                        _this.thumbsUp.inputEnabled = false;
                        _this.counterCelebrationSound.play();
                        _this.thumbsUp.destroy();
                        _this.thumbsDown.destroy();
                        //* Animation for Equilateral
                        _this.createEquilateralImage(_this.roundedNumber, _this.roundedNumber1, _this.thirdEQArea);
                    } else {
                        _this.noofAttempts ++;
                        _this.wrongSound.play();
                        _this.time.events.add(1000, function () {
                            _this.thumbsUp.frame = 0;
                        })
                    }
                })

                _this.thumbsDown.inputEnabled = true;
                _this.thumbsDown.input.useHandCursor = true;
                _this.thumbsDown.events.onInputDown.add(function () {

                    _this.thumbsDown.frame = 1;
                    _this.checkPyth();
                    if (_this.is_Pyth == false) {
                        _this.thumbsUp.inputEnabled = false;
                        _this.thumbsUp.destroy();
                        _this.thumbsDown.destroy();

                        _this.Ask_Question7.play();
                        _this.Question_flag = 6;

                        _this.test();
                        _this.Ask_Question7.addEventListener('ended', function () {
                            _this.celebration();
                            _this.time.events.add(1200, function () {
                                _this.clearScreenArray.forEach(element => {
                                    element.destroy();
                                })
                                _this.nextquestion();
                            })
                        });
                    } else {
                        _this.noofAttempts ++;
                        // _this.thumbsDown.frame = 1;
                        _this.wrongSound.play();
                        _this.time.events.add(1000, function () {
                            _this.thumbsDown.frame = 0;
                        })
                    }
                })
            }
        })
    },

    calculateSemiCircleArea: function (diameter) {

        // Step 1: Calculate the radius
        const radius = diameter / 2;
        // Step 2: Find the area of the semicircle
        const area = (Math.PI * radius * radius) / 2;

        console.log(area);

        return area;
    },

    displaySemiCircles: function () {
        if (_this.count1 == 1) {
            _this.Ask_Question5.play();
        }
        if (_this.count1 == 1 && _this.f_buttonClick == false) _this.showButtonClickigDemo();
        _this.Question_flag = 4;
        _this.semiCircle_flag = 1;
        _this.formlaButton = _this.add.image(50, 60, 'formlaButton');
        _this.clearScreenArray.push(_this.formlaButton);
        _this.rectPanel = _this.add.image(50, 160, 'rectPanel');
        _this.rectPanel.scale.setTo(0.95, 1);
        _this.clearScreenArray.push(_this.rectPanel);

        _this.circle1 = _this.add.image(70, 220, 'greenCircle');
        _this.circle1Line1 = _this.add.image(182, 222, 'greenLine');
        _this.displayAvalue = _this.add.text(220, 310, 'a' + '=');
        _this.displayAvalue.font = "Akzidenz-Grotesk BQ";
        _this.displayAvalue.fill = '#808000';// #808000
        _this.displayAvalue.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.circle1);
        _this.clearScreenArray.push(_this.circle1Line1);
        _this.clearScreenArray.push(_this.displayAvalue);

        _this.tripletA = _this.add.text(260, 310, _this.TripletArray[_this.trackCount][0]);
        _this.tripletA.font = "Akzidenz-Grotesk BQ";
        _this.tripletA.fill = '#808000';// #808000
        _this.tripletA.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.tripletA);

        _this.formlaButton.inputEnabled = true;
        _this.formlaButton.input.useHandCursor = true;
        _this.formlaButton.events.onInputDown.add(function () {
            _this.TapSound.play();
            if (_this.semiCircle_flag == 1) {

                _this.formlaButton.frame = 1;
                _this.formlaButton.inputEnabled = false;
                _this.formlaSemicircle = _this.add.text(130, 90, '(' + '\u03C0' + '/' + 2 + ')' + ' ' + 'r' + '\u{00B2}');
                _this.formlaSemicircle.font = "Akzidenz-Grotesk BQ";
                _this.formlaSemicircle.fill = '#FF0000';// #808000
                _this.formlaSemicircle.fontWeight = 'normal';

                _this.circle1.destroy();
                _this.circleFilled1 = _this.add.image(70, 220, 'greenFilledCircle');
                _this.clearScreenArray.push(_this.circleFilled1);

                _this.aSquare = _this.add.text(80, 500, 'A' + "=");
                _this.aSquare.font = "Akzidenz-Grotesk BQ";
                _this.aSquare.fill = '#808000';// #808000
                _this.aSquare.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.aSquare);

                _this.areaofA = _this.calculateSemiCircleArea(_this.TripletArray[_this.trackCount][0]);//(3.14 / 2) * _this.TripletArray[_this.trackCount][0] * _this.TripletArray[_this.trackCount][0];
                _this.roundedNumber = _this.areaofA.toFixed(2);
                _this.displayAreaA = _this.add.text(130, 500, _this.roundedNumber);
                _this.displayAreaA.font = "Akzidenz-Grotesk BQ";
                _this.displayAreaA.fill = '#808000';// #808000
                _this.displayAreaA.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.displayAreaA);

                _this.semiCircle_flag = 2;
                //E11584
                _this.time.events.add(1500, function () {
                    _this.formlaSemicircle.visible = false;
                    _this.formlaButton.frame = 0;
                    _this.formlaButton.inputEnabled = true;
                    //b

                    _this.circle2 = _this.add.image(300, 220, 'orangeCircle');
                    _this.circle2Line1 = _this.add.image(432, 222, 'orangeLine');
                    _this.displayAvalue = _this.add.text(470, 310, 'b' + '=');
                    _this.displayAvalue.font = "Akzidenz-Grotesk BQ";
                    _this.displayAvalue.fill = '#FF7F50';// #808000
                    _this.displayAvalue.fontWeight = 'normal';

                    _this.clearScreenArray.push(_this.circle2);
                    _this.clearScreenArray.push(_this.circle2Line1);
                    _this.clearScreenArray.push(_this.displayAvalue);

                    _this.tripletA = _this.add.text(510, 310, _this.TripletArray[_this.trackCount][1]);
                    _this.tripletA.font = "Akzidenz-Grotesk BQ";
                    _this.tripletA.fill = '#FF7F50';// #808000
                    _this.tripletA.fontWeight = 'normal';
                    _this.clearScreenArray.push(_this.tripletA);

                })
            } else if (_this.semiCircle_flag == 2) {
                _this.formlaButton.inputEnabled = false;
                _this.formlaButton.frame = 1;
                _this.formlaSemicircle.visible = true;

                _this.circle2.destroy();
                _this.circleFilled2 = _this.add.image(300, 220, 'orangeFilledCircle');
                _this.clearScreenArray.push(_this.circleFilled2);

                _this.bSquare = _this.add.text(310, 500, 'A' + "=");
                _this.bSquare.font = "Akzidenz-Grotesk BQ";
                _this.bSquare.fill = '#FF7F50';// #808000
                _this.bSquare.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.bSquare);

                _this.areaofB = _this.calculateSemiCircleArea(_this.TripletArray[_this.trackCount][1]);
                _this.roundedNumber1 = _this.areaofB.toFixed(2);
                _this.displayAreaB = _this.add.text(360, 500, _this.roundedNumber1);
                _this.displayAreaB.font = "Akzidenz-Grotesk BQ";
                _this.displayAreaB.fill = '#FF7F50';// #808000
                _this.displayAreaB.fontWeight = 'normal';

                _this.clearScreenArray.push(_this.displayAreaB);

                _this.semiCircle_flag = 3;

                _this.time.events.add(1500, function () {
                    _this.formlaSemicircle.visible = false;
                    _this.formlaButton.frame = 0;
                    _this.formlaButton.inputEnabled = true;

                    //c
                    _this.circle3 = _this.add.image(570, 175, 'pinkCircle');
                    _this.circle3Line1 = _this.add.image(740, 175, 'pinkLine');
                    _this.displayAvalue = _this.add.text(790, 310, 'c' + '=');
                    _this.displayAvalue.font = "Akzidenz-Grotesk BQ";
                    _this.displayAvalue.fill = '#FF1493';// //FF1493
                    _this.displayAvalue.fontWeight = 'normal';

                    _this.clearScreenArray.push(_this.circle3);
                    _this.clearScreenArray.push(_this.circle3Line1);
                    _this.clearScreenArray.push(_this.displayAvalue);

                    _this.tripletA = _this.add.text(830, 310, _this.TripletArray[_this.trackCount][2]);
                    _this.tripletA.font = "Akzidenz-Grotesk BQ";
                    _this.tripletA.fill = '#FF1493';// #808000
                    _this.tripletA.fontWeight = 'normal';
                    _this.clearScreenArray.push(_this.tripletA);
                })
            } else {
                if (_this.count1 == 1) {
                    _this.Ask_Question4.play();
                }
                _this.Question_flag = 3;
                _this.formlaButton.frame = 1;
                _this.formlaSemicircle.visible = true;
                _this.formlaButton.inputEnabled = false;

                _this.circle3.destroy();
                _this.circleFilled3 = _this.add.image(570, 175, 'pinkFilledCircle');
                _this.clearScreenArray.push(_this.circleFilled3);

                _this.cSquare = _this.add.text(600, 500, 'A' + "=");
                _this.cSquare.font = "Akzidenz-Grotesk BQ";
                _this.cSquare.fill = '#FF1493';// #808000
                _this.cSquare.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.cSquare);

                // _this.areaofC = _this.calculateSemiCircleArea(_this.TripletArray[_this.trackCount][2]);
                // _this.roundedNumber2 = _this.areaofC.toFixed(2);
                _this.checkPyth();
                if (_this.is_Pyth == true) {
                    console.log("PYTH @@");
                    _this.thirdSemiArea = Number(_this.roundedNumber) + Number(_this.roundedNumber1);
                    _this.thirdSemiArea = _this.thirdSemiArea.toFixed(2);
                } else {
                    console.log("No PYTH @@");
                    _this.areaofC = _this.calculateSemiCircleArea(_this.TripletArray[_this.trackCount][2]);
                    _this.thirdSemiArea = _this.areaofC.toFixed(2);
                }
                _this.displayAreaC = _this.add.text(650, 500, _this.thirdSemiArea);
                _this.displayAreaC.font = "Akzidenz-Grotesk BQ";
                _this.displayAreaC.fill = '#FF1493';// #808000
                _this.displayAreaC.fontWeight = 'normal';

                _this.clearScreenArray.push(_this.displayAreaC);

                _this.time.events.add(800, function () {
                    _this.formlaButton.destroy();
                    _this.formlaSemicircle.destroy();
                })

                //* add ThumsUp and Down symbol

                _this.thumbsUp = _this.add.sprite(750, 80, 'thumbsUp');
                _this.thumbsDown = _this.add.sprite(820, 80, 'thumbsDown');

                _this.thumbsUp.inputEnabled = true;
                _this.thumbsUp.input.useHandCursor = true;
                _this.thumbsUp.events.onInputDown.add(function () {

                    _this.thumbsUp.frame = 1;
                    //_this.checkPyth();

                    if (_this.is_Pyth == true) {
                        _this.thumbsUp.inputEnabled = false;
                        _this.counterCelebrationSound.play();
                        _this.thumbsUp.destroy();
                        _this.thumbsDown.destroy();
                        //* Animation for Semi Circle
                        _this.clearScreenArray.forEach(element => {
                            element.destroy();
                        });
                        _this.createSemiCircle(_this.roundedNumber, _this.roundedNumber1, _this.thirdSemiArea);
                    } else {
                        _this.noofAttempts ++;
                        _this.wrongSound.play();
                        _this.time.events.add(1000, function () {
                            _this.thumbsUp.frame = 0;
                        })
                    }

                })

                _this.thumbsDown.inputEnabled = true;
                _this.thumbsDown.input.useHandCursor = true;
                _this.thumbsDown.events.onInputDown.add(function () {

                    _this.thumbsDown.frame = 1;
                    _this.checkPyth();

                    if (_this.is_Pyth == false) {
                        _this.thumbsUp.inputEnabled = false;
                        _this.thumbsUp.destroy();
                        _this.thumbsDown.destroy();
                        _this.Ask_Question7.play();
                        _this.Question_flag = 6;

                        _this.test();
                        _this.Ask_Question7.addEventListener('ended', function () {
                            _this.celebration();
                            _this.time.events.add(1200, function () {
                                _this.clearScreenArray.forEach(element => {
                                    element.destroy();
                                })
                                _this.nextquestion();
                            })
                        });
                    } else {
                        _this.noofAttempts ++;
                        // _this.thumbsDown.frame = 1;
                        _this.wrongSound.play();
                        _this.time.events.add(1000, function () {
                            _this.thumbsDown.frame = 0;
                        })
                    }
                })
            }
        })

    },

    displayHexagons: function () {
        if (_this.count1 == 1) {
            _this.Ask_Question5.play();
        }
        _this.Question_flag = 4;
        if (_this.count1 == 1 && _this.f_buttonClick == false) _this.showButtonClickigDemo();

        _this.hexagon_flag = 1;
        _this.formlaButton = _this.add.image(50, 60, 'formlaButton');
        _this.rectPanel = _this.add.image(50, 160, 'rectPanel');
        _this.rectPanel.scale.setTo(0.95, 0.95);
        _this.clearScreenArray.push(_this.formlaButton);
        _this.clearScreenArray.push(_this.rectPanel);

        _this.hexagon1 = _this.add.image(70, 280, 'greenHexa');
        _this.hexagon1Line1 = _this.add.image(145, 300, 'greenXLine');
        _this.displayAvalue = _this.add.text(180, 300, 'a' + '=');
        _this.displayAvalue.font = "Akzidenz-Grotesk BQ";
        _this.displayAvalue.fill = '#808000';// #808000
        _this.displayAvalue.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.hexagon1);
        _this.clearScreenArray.push(_this.hexagon1Line1);
        _this.clearScreenArray.push(_this.displayAvalue);

        _this.tripletA = _this.add.text(220, 300, _this.TripletArray[_this.trackCount][0]);
        _this.tripletA.font = "Akzidenz-Grotesk BQ";
        _this.tripletA.fill = '#808000';// #808000
        _this.tripletA.fontWeight = 'normal';
        _this.clearScreenArray.push(_this.tripletA);

        _this.formlaButton.inputEnabled = true;
        _this.formlaButton.input.useHandCursor = true;
        _this.formlaButton.events.onInputDown.add(function () {
            _this.TapSound.play();
            if (_this.hexagon_flag == 1) {
                _this.formlaButton.frame = 1;
                _this.formlaButton.inputEnabled = false;
                _this.formlaHexagon = _this.add.text(130, 90, '\u221A' + 3 + '/' + 4 + 'x' + '\u{00B2}');
                _this.formlaHexagon.font = "Akzidenz-Grotesk BQ";
                _this.formlaHexagon.fill = '#FF0000';// #808000
                _this.formlaHexagon.fontWeight = 'normal';

                _this.aSquare = _this.add.text(80, 460, 'A' + "=");
                _this.aSquare.font = "Akzidenz-Grotesk BQ";
                _this.aSquare.fill = '#808000';// #808000
                _this.aSquare.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.aSquare);

                _this.areaofA = 3 * Math.sqrt(3) / 2 * (_this.TripletArray[_this.trackCount][0] * _this.TripletArray[_this.trackCount][0]);
                _this.roundedNumber = _this.areaofA.toFixed(2);
                _this.displayAreaA = _this.add.text(130, 460, _this.roundedNumber);
                _this.displayAreaA.font = "Akzidenz-Grotesk BQ";
                _this.displayAreaA.fill = '#808000';// #808000
                _this.displayAreaA.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.displayAreaA);

                _this.hexagon_flag = 2;

                _this.time.events.add(1500, function () {
                    _this.formlaHexagon.visible = false;
                    _this.formlaButton.frame = 0;
                    _this.formlaButton.inputEnabled = true;

                    //b
                    _this.hexagon2 = _this.add.image(265, 220, 'orangeHexa');
                    _this.hexagonLine2 = _this.add.image(475, 274, 'orangeXLine');
                    _this.displayAvalue = _this.add.text(505, 310, 'b' + '=');
                    _this.displayAvalue.font = "Akzidenz-Grotesk BQ";
                    _this.displayAvalue.fill = '#FF7F50';// #808000
                    _this.displayAvalue.fontWeight = 'normal';
                    _this.clearScreenArray.push(_this.hexagon2);
                    _this.clearScreenArray.push(_this.hexagonLine2);
                    _this.clearScreenArray.push(_this.displayAvalue);

                    _this.tripletA = _this.add.text(545, 310, _this.TripletArray[_this.trackCount][1]);
                    _this.tripletA.font = "Akzidenz-Grotesk BQ";
                    _this.tripletA.fill = '#FF7F50';// #808000
                    _this.tripletA.fontWeight = 'normal';
                    _this.clearScreenArray.push(_this.tripletA);
                })

            } else if (_this.hexagon_flag == 2) {
                _this.formlaButton.inputEnabled = false;
                _this.formlaButton.frame = 1;
                _this.formlaHexagon.visible = true;

                // _this.areaofA =  (Math.sqrt(3)/4)*  _this.triples[2][0] * _this.triples[2][0];
                _this.bSquare = _this.add.text(310, 460, 'A' + "=");
                _this.bSquare.font = "Akzidenz-Grotesk BQ";
                _this.bSquare.fill = '#FF7F50';// #808000
                _this.bSquare.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.bSquare);

                _this.areaofB = 3 * Math.sqrt(3) / 2 * (_this.TripletArray[_this.trackCount][1] * _this.TripletArray[_this.trackCount][1]);
                _this.roundedNumber1 = _this.areaofB.toFixed(2);
                _this.displayAreaB = _this.add.text(360, 460, _this.roundedNumber1);
                _this.displayAreaB.font = "Akzidenz-Grotesk BQ";
                _this.displayAreaB.fill = '#FF7F50';// #808000
                _this.displayAreaB.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.displayAreaB);
                _this.hexagon_flag = 3;

                _this.time.events.add(1500, function () {
                    _this.formlaHexagon.visible = false;
                    _this.formlaButton.frame = 0;
                    _this.formlaButton.inputEnabled = true;

                    _this.circle3 = _this.add.image(580, 205, 'pinkHexa');
                    _this.circle3Line1 = _this.add.image(790, 263, 'pinkXLine');
                    _this.displayAvalue = _this.add.text(830, 310, 'c' + '=');
                    _this.displayAvalue.font = "Akzidenz-Grotesk BQ";
                    _this.displayAvalue.fill = '#FF1493';// //FF1493
                    _this.displayAvalue.fontWeight = 'normal';
                    _this.clearScreenArray.push(_this.circle3);
                    _this.clearScreenArray.push(_this.circle3Line1);
                    _this.clearScreenArray.push(_this.displayAvalue);

                    _this.tripletA = _this.add.text(865, 310, _this.TripletArray[_this.trackCount][2]);
                    _this.tripletA.font = "Akzidenz-Grotesk BQ";
                    _this.tripletA.fill = '#FF1493';// #808000
                    _this.tripletA.fontWeight = 'normal';
                    _this.clearScreenArray.push(_this.tripletA);
                })
            } else {
                if (_this.count1 == 1) {
                    _this.Ask_Question4.play();
                }
                _this.Question_flag = 3;
                _this.formlaButton.frame = 1;
                _this.formlaHexagon.visible = true;
                _this.formlaButton.inputEnabled = false;

                _this.cSquare = _this.add.text(630, 460, 'A' + "=");
                _this.cSquare.font = "Akzidenz-Grotesk BQ";
                _this.cSquare.fill = '#FF1493';// #808000
                _this.cSquare.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.cSquare);

                // _this.areaofC = 3 * Math.sqrt(3) / 2 * (_this.TripletArray[_this.trackCount][2] * _this.TripletArray[_this.trackCount][2]);
                // _this.roundedNumber3 = _this.areaofC.toFixed(2);
                _this.checkPyth();
                if (_this.is_Pyth == true) {
                    console.log("PYTH @@");
                    _this.thirdHexArea = Number(_this.roundedNumber) + Number(_this.roundedNumber1);
                    _this.thirdHexArea = _this.thirdHexArea.toFixed(2)
                } else {
                    console.log("No PYTH @@");
                    _this.areaofC = 3 * Math.sqrt(3) / 2 * (_this.TripletArray[_this.trackCount][2] * _this.TripletArray[_this.trackCount][2]);
                    _this.thirdHexArea = _this.areaofC.toFixed(2);
                }
                _this.displayAreaC = _this.add.text(680, 460, _this.thirdHexArea);
                _this.displayAreaC.font = "Akzidenz-Grotesk BQ";
                _this.displayAreaC.fill = '#FF1493';// #808000
                _this.displayAreaC.fontWeight = 'normal';
                _this.clearScreenArray.push(_this.displayAreaC);

                _this.time.events.add(800, function () {
                    _this.formlaButton.destroy();
                    _this.formlaHexagon.destroy();
                })

                _this.thumbsUp = _this.add.sprite(750, 80, 'thumbsUp');
                _this.thumbsDown = _this.add.sprite(820, 80, 'thumbsDown');

                _this.thumbsUp.inputEnabled = true;
                _this.thumbsUp.input.useHandCursor = true;
                _this.thumbsUp.events.onInputDown.add(function () {

                    _this.thumbsUp.frame = 1;
                    // _this.checkPyth();
                    if (_this.is_Pyth == true) {
                        _this.thumbsUp.inputEnabled = false;
                        //  _this.thumbsUp.frame = 1;
                        _this.counterCelebrationSound.play();
                        _this.thumbsUp.destroy();
                        _this.thumbsDown.destroy();
                        //* Animation for hexagon
                        _this.createHexagonImage(_this.roundedNumber, _this.roundedNumber1, _this.thirdHexArea);
                    } else {
                        _this.noofAttempts ++;
                        _this.wrongSound.play();
                        _this.time.events.add(1000, function () {
                            _this.thumbsUp.frame = 0;
                        })
                    }

                })

                _this.thumbsDown.inputEnabled = true;
                _this.thumbsDown.input.useHandCursor = true;
                _this.thumbsDown.events.onInputDown.add(function () {

                    _this.thumbsDown.frame = 1;
                    _this.checkPyth();

                    if (_this.is_Pyth == false) {
                        _this.thumbsDown.inputEnabled = false;
                        _this.thumbsUp.destroy();
                        _this.thumbsDown.destroy();
                        _this.Ask_Question7.play();
                        _this.Question_flag = 6;

                        _this.test();
                        _this.Ask_Question7.addEventListener('ended', function () {
                            _this.celebration();
                            _this.time.events.add(1200, function () {
                                _this.clearScreenArray.forEach(element => {
                                    element.destroy();
                                })
                                _this.nextquestion();
                            })
                        });
                    } else {
                        _this.noofAttempts ++;
                        _this.wrongSound.play();
                        _this.time.events.add(1000, function () {
                            _this.thumbsDown.frame = 0;
                        })
                    }

                })

            }
        })
    },

    applyingStyle: function (target) //* Blue colors to text
    {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.fontSize = 24;
        target.visible = true;
    },

    applyingStyleWhite: function (target) //* Blue colors to text
    {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#FFFFFF';
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

    rightbtnClicked1: function (target) //* validating area and perimeter accoring to the question
    {
        _this.power = "\u{00B2}";
        if (_this.box_flag == 3) {
            //_this.triples[0][0]
            if (_this.box3_1 == 0) {

                if (Number('' + _this.selectedAns1 + _this.selectedAns2 + _this.selectedAns3) == _this.GridTripletArray[_this.limit][0]) {
                    _this.box3_1 = 1;
                    _this.counterCelebrationSound.play();
                    _this.eraseScreen();
                    _this.addTextA.destroy();
                    _this.string = 'a' + _this.power;
                    _this.addTextA2 = _this.add.text(755, 100, _this.string);
                    _this.applyingStyle(_this.addTextA2);
                    _this.aGroup.push(_this.addTextA2);

                    _this.displayA.x = 360;
                    _this.displayAequals = _this.add.text(385, 200, '=');
                    _this.applyingStyle(_this.displayAequals);
                    _this.aGroup.push(_this.displayAequals);
                    _this.displayTheFirstSide = _this.add.text(410, 200, _this.GridTripletArray[_this.limit][0]);
                    _this.applyingStyle(_this.displayTheFirstSide);
                    // _this.aGroup.push(_this.displayTheFirstSide);
                    _this.time.events.add(1300, function () {
                        if (_this.count1 == 0) {
                            _this.Ask_Question3.play();
                        }
                        if (_this.count1 == 0 && _this.hand_flag == 0) _this.showtank1ClickigDemo3();

                    })
                    _this.Question_flag = 2;

                } else {
                    _this.noofAttempts ++;
                    _this.wrongSound.play();
                    _this.eraseScreen();
                }
            } else {
                if (Number('' + _this.selectedAns1 + _this.selectedAns2 + _this.selectedAns3) == _this.GridTripletArray[_this.limit][0] * _this.GridTripletArray[_this.limit][0]) {
                    _this.counterCelebrationSound.play();

                    _this.displayA.destroy();
                    _this.displayTheFirstSide.destroy();
                    _this.string = 'a' + _this.power;
                    _this.displayAsquare = _this.add.text(355, 200, _this.string);
                    _this.applyingStyle(_this.displayAsquare);
                    _this.aGroup.push(_this.displayAsquare);
                    _this.displayTheArea = _this.add.text(405, 200, _this.GridTripletArray[_this.limit][0] * _this.GridTripletArray[_this.limit][0]);
                    _this.applyingStyle(_this.displayTheArea);
                    _this.aGroup.push(_this.displayTheArea);
                    _this.numGroup.destroy();
                    _this.numpad = 0;
                    _this.allSides_flag = _this.allSides_flag + 1;

                    _this.time.events.add(1500, function () {
                        _this.columnGrid.alpha = 1;
                        _this.eraseScreen();
                        _this.AnswerBox.destroy();
                        _this.aGroup.forEach(element => {
                            element.destroy();

                            console.log(_this.allSides_flag, "_this.allSides_flag");
                        })

                        _this.addNewGreenBox.bringToTop();
                        _this.tweenGreenBox = _this.add.tween(_this.addNewGreenBox);
                        _this.tweenGreenBox.to({ x: 76, y: 370 }, 600, 'Linear', true, 0);
                        _this.tweenGreenBox.start();
                        // _this.clearScreenArray.push(_this.addNewGreenBox);
                        _this.firstArea = _this.GridTripletArray[_this.count1][0] * _this.GridTripletArray[_this.count1][0];
                        if (_this.firstArea > 99) _this.xX = 100;
                        if (_this.firstArea < 100) _this.xX = 110;
                        if (_this.firstArea < 10) _this.xX = 120;
                        _this.tweenGreenBox.onComplete.add(function () {
                            //_this.counterCelebrationSound.play();
                            _this.addNewGreenBox.scale.setTo(1, 1);
                            _this.displayAArea = _this.add.text(_this.xX, 400, _this.firstArea);
                            _this.applyingStyleWhite(_this.displayAArea);
                            //  _this.clearScreenArray.push(_this.displayCArea);

                            if (_this.count1 == 0) {
                                // if (_this.allSides_flag != 3) _this.Ask_Question1.play();
                                if (_this.allSides_flag == 2) {
                                    _this.Ask_Question6.play();
                                } else {
                                    if (_this.allSides_flag != 3) _this.Ask_Question1.play();
                                }
                            }
                            _this.Question_flag = 0;

                            if (_this.bx1_Box != 0) {
                                console.log()
                                _this.box1.inputEnabled = true;
                            }
                            if (_this.bx2_Box != 0) {
                                if (_this.box2) _this.box2.inputEnabled = true;
                            }

                        })

                        if (_this.allSides_flag == 3) {
                            _this.time.events.add(1900, function () {
                                _this.eraseAllTheBox();
                                _this.moveToAnimationPart();
                            })

                        }
                    })

                } else {
                    _this.noofAttempts ++;
                    _this.wrongSound.play();
                    _this.eraseScreen();
                }
            }
        } else if (_this.box_flag == 2) {
            if (_this.box2_1 == 0) {
                if (Number('' + _this.selectedAns1 + _this.selectedAns2 + _this.selectedAns3) == _this.GridTripletArray[_this.limit][1]) {
                    _this.box2_1 = 1;
                    _this.counterCelebrationSound.play();
                    _this.eraseScreen();
                    _this.addTextB.destroy();
                    _this.string = 'b' + _this.power;
                    _this.addTextB2 = _this.add.text(755, 100, _this.string);
                    _this.applyingStyle(_this.addTextB2);
                    _this.bGroup.push(_this.addTextB2);

                    _this.displayBequals = _this.add.text(460, 120, '=');
                    _this.applyingStyle(_this.displayBequals);
                    _this.bGroup.push(_this.displayBequals);
                    _this.displayTheSecondSide = _this.add.text(480, 120, _this.GridTripletArray[_this.limit][1]);
                    _this.applyingStyle(_this.displayTheSecondSide);
                    _this.time.events.add(1500, function () {
                        if (_this.count1 == 0) {
                            _this.Ask_Question3.play();
                        }
                        if (_this.count1 == 0 && _this.hand_flag == 0) _this.showtank1ClickigDemo3();

                    })
                    _this.Question_flag = 2;

                } else {
                    _this.noofAttempts ++;
                    _this.wrongSound.play();
                    _this.eraseScreen();
                }

            } else {
                if (Number('' + _this.selectedAns1 + _this.selectedAns2 + _this.selectedAns3) == _this.GridTripletArray[_this.limit][1] * _this.GridTripletArray[_this.limit][1]) {
                    _this.counterCelebrationSound.play();
                    _this.displayB.destroy();
                    _this.displayTheSecondSide.destroy();
                    _this.string = 'b' + _this.power;
                    _this.displayAsquare = _this.add.text(435, 120, _this.string);
                    _this.applyingStyle(_this.displayAsquare);
                    _this.bGroup.push(_this.displayAsquare);
                    _this.displayTheArea = _this.add.text(480, 120, _this.GridTripletArray[_this.limit][1] * _this.GridTripletArray[_this.limit][1]);
                    _this.applyingStyle(_this.displayTheArea);
                    _this.bGroup.push(_this.displayTheArea);
                    _this.numGroup.destroy();
                    _this.numpad = 0;
                    _this.allSides_flag = _this.allSides_flag + 1;

                    console.log(_this.allSides_flag, "_this.allSides_flag");
                    _this.time.events.add(1500, function () {
                        _this.columnGrid.alpha = 1;
                        _this.eraseScreen();
                        _this.AnswerBox.destroy();
                        _this.bGroup.forEach(element => {
                            element.destroy();
                        })

                        _this.addNewOrangeBox.bringToTop();
                        _this.tweenPinkBox = _this.add.tween(_this.addNewOrangeBox);
                        _this.tweenPinkBox.to({ x: 63, y: 240 }, 600, 'Linear', true, 0);
                        _this.tweenPinkBox.start();
                        // _this.clearScreenArray.push(_this.addNewOrangeBox);
                        _this.secondArea = _this.GridTripletArray[_this.count1][1] * _this.GridTripletArray[_this.count1][1];
                        if (_this.secondArea > 99) _this.xX = 103;
                        if (_this.secondArea < 100) _this.xX = 113;
                        _this.tweenPinkBox.onComplete.add(function () {
                            //  _this.counterCelebrationSound.play();
                            _this.addNewOrangeBox.scale.setTo(1, 1);
                            _this.displayBArea = _this.add.text(_this.xX, 290, _this.secondArea);
                            _this.applyingStyleWhite(_this.displayBArea);

                            if (_this.count1 == 0) {
                                //if (_this.allSides_flag != 3) _this.Ask_Question1.play();
                                if (_this.allSides_flag == 2) {
                                    _this.Ask_Question6.play();
                                } else {
                                    if (_this.allSides_flag != 3) _this.Ask_Question1.play();
                                }
                            }
                            _this.Question_flag = 0;
                            // _this.clearScreenArray.push(_this.displayBArea);
                            if (_this.bx1_Box != 0) {
                                if (_this.box1) _this.box1.inputEnabled = true;
                            }
                            if (_this.bx3_Box != 0) {
                                if (_this.box3) _this.box3.inputEnabled = true;
                            }
                        })

                        if (_this.allSides_flag == 3) {
                            _this.time.events.add(1900, function () {
                                _this.eraseAllTheBox();
                                _this.moveToAnimationPart();
                            })
                        }
                    })

                } else {
                    _this.noofAttempts ++;
                    _this.wrongSound.play();
                    _this.eraseScreen();
                }
            }
        } else {
            if (_this.box1_1 == 0) {
                if (Number('' + _this.selectedAns1 + _this.selectedAns2 + _this.selectedAns3) == _this.GridTripletArray[_this.count1][2]) {
                    _this.box1_1 = 1;
                    _this.counterCelebrationSound.play();
                    _this.eraseScreen();
                    _this.addTextC.destroy();
                    _this.string = 'c' + _this.power;
                    _this.addTextC2 = _this.add.text(755, 100, _this.string);
                    _this.applyingStyle(_this.addTextC2);
                    _this.cGroup.push(_this.addTextC2);

                    _this.displayCequals = _this.add.text(550, 120, '=');
                    _this.applyingStyle(_this.displayCequals);
                    _this.cGroup.push(_this.displayCequals);
                    _this.displayTheThirddSide = _this.add.text(570, 120, _this.GridTripletArray[_this.count1][2]);
                    _this.applyingStyle(_this.displayTheThirddSide);

                    _this.time.events.add(1500, function () {
                        if (_this.count1 == 0) {
                            _this.Ask_Question3.play();
                        }
                        if (_this.count1 == 0 && _this.hand_flag == 0) _this.showtank1ClickigDemo3();
                    })
                    _this.Question_flag = 2;
                } else {
                    _this.noofAttempts ++;
                    _this.wrongSound.play();
                    _this.eraseScreen();
                }

            } else {
                if (Number('' + _this.selectedAns1 + _this.selectedAns2 + _this.selectedAns3) == _this.GridTripletArray[_this.count1][2] * _this.GridTripletArray[_this.count1][2]) {
                    _this.counterCelebrationSound.play();
                    // _this.eraseScreen();
                    _this.addTextC2.destroy();
                    _this.displayC.destroy();
                    _this.displayTheThirddSide.destroy();
                    _this.string = 'c' + _this.power;
                    _this.displayCsquare = _this.add.text(520, 120, _this.string);
                    _this.applyingStyle(_this.displayCsquare);
                    _this.cGroup.push(_this.displayCsquare);
                    _this.displayTheArea = _this.add.text(570, 120, _this.GridTripletArray[_this.count1][2] * _this.GridTripletArray[_this.count1][2]);
                    _this.applyingStyle(_this.displayTheArea);
                    _this.cGroup.push(_this.displayTheArea);
                    _this.numGroup.destroy();
                    _this.numpad = 0;
                    _this.allSides_flag = _this.allSides_flag + 1;

                    console.log(_this.allSides_flag, "_this.allSides_flag");
                    _this.time.events.add(1500, function () {
                        _this.columnGrid.alpha = 1;
                        _this.eraseScreen();
                        _this.AnswerBox.destroy();
                        _this.cGroup.forEach(element => {
                            element.destroy();
                        })

                        _this.addNewPinkBox.bringToTop();
                        _this.tweenPinkBox = _this.add.tween(_this.addNewPinkBox);
                        _this.tweenPinkBox.to({ x: 50, y: 80 }, 600, 'Linear', true, 0);
                        _this.tweenPinkBox.start();
                        // _this.clearScreenArray.push(_this.addNewPinkBox);
                        _this.thirdArea = _this.GridTripletArray[_this.count1][2] * _this.GridTripletArray[_this.count1][2];
                        if (_this.thirdArea > 99) _this.xX = 100;
                        if (_this.thirdArea < 100) _this.xX = 110;
                        _this.tweenPinkBox.onComplete.add(function () {
                            // _this.counterCelebrationSound.play();
                            _this.addNewPinkBox.scale.setTo(1, 1);
                            _this.displayCArea = _this.add.text(_this.xX, 145, _this.thirdArea);
                            _this.applyingStyleWhite(_this.displayCArea);
                            //  _this.clearScreenArray.push(_this.displayCArea);
                            if (_this.count1 == 0) {
                                // if (_this.allSides_flag != 3) _this.Ask_Question1.play();
                                if (_this.allSides_flag == 2) {
                                    _this.Ask_Question6.play();
                                } else {
                                    if (_this.allSides_flag != 3) _this.Ask_Question1.play();
                                }
                            }
                            _this.Question_flag = 0;

                            if (_this.bx2_Box != 0) {
                                if (_this.box2) _this.box2.inputEnabled = true;
                            }
                            if (_this.bx3_Box != 0) {
                                if (_this.box3) _this.box3.inputEnabled = true;
                            }

                        })

                        if (_this.allSides_flag == 3) {
                            _this.time.events.add(1900, function () {
                                _this.eraseAllTheBox();
                                _this.moveToAnimationPart();
                            })
                        }
                    })
                } else {
                    _this.noofAttempts ++;
                    _this.wrongSound.play();
                    _this.eraseScreen();
                }
            }
        }
    },

    nextquestion: function () {
        if (_this.count1 < 6) {
            _this.trackCount++;
            _this.qn_flag = 1;
            _this.time.events.add(500, function () {
                _this.displayNextShapes();
            });
        }
        else {
            _this.timer1.stop();
            _this.timer1 = null;
            _this.time.events.add(1000, function () {
                _this.state.start('score', true, false,gameID, _this.microConcepts);
            });
        }
    },

    showButtonClickigDemo: function () {
        console.log("hiiii")
        _this.f_buttonClick = true;
        _this.time.events.add(1000, function () {
            //* This will show the demo for clicking the box
            _this.hand = _this.add.image(80, 100, 'hand');
            _this.hand.scale.setTo(0.65);
            _this.time.events.add(400, () => {
                _this.hand.scale.setTo(0.6);
                _this.time.events.add(400, () => {
                    _this.hand.scale.setTo(0.65);
                    _this.time.events.add(450, () => {
                        _this.hand.destroy();
                    })
                })
            })
        })
    },

    showtank1ClickigDemo: function () {
        console.log("hiiii")
        //_this.hand_flag = 1;
        _this.time.events.add(1000, function () {
            //* This will show the demo for clicking the box
            _this.hand = _this.add.image(120, 180, 'hand');
            _this.hand.scale.setTo(0.65);
            _this.time.events.add(400, () => {
                _this.hand.scale.setTo(0.6);
                _this.time.events.add(400, () => {
                    _this.hand.scale.setTo(0.65);
                    _this.time.events.add(450, () => {
                        _this.hand.destroy();
                    })
                })
            })
        })
    },

    showtank1ClickigDemo2: function () {
        _this.hand_flag = 0;
        _this.time.events.add(800, function () {
            _this.hand = _this.add.image(_this.x1, _this.y1, 'hand');
            _this.hand.scale.setTo(0.65);
            _this.time.events.add(400, () => {
                _this.tweenHand = _this.add.tween(_this.hand);
                _this.tweenHand.to({ x: _this.tx, y: _this.y1 }, 500, 'Linear', true, 0);
                _this.tweenHand.start();

                _this.tweenHand.onComplete.add(function () {
                    _this.hand.destroy();
                })
            })
        })
    },

    showtank1ClickigDemo3: function () {
        _this.hand_flag = null;
        // _this.time.events.add(800, function () {
        _this.hand = _this.add.image(_this.x1, _this.y1, 'hand');
        _this.hand.scale.setTo(0.65);
        // _this.time.events.add(400, () => {
        _this.tweenHand = _this.add.tween(_this.hand);
        _this.tweenHand.to({ x: _this.tx, y: _this.y1 }, 360, 'Linear', true, 0);
        _this.tweenHand.start();
        _this.tweenHand.onComplete.add(function () {
            _this.tweenHandright = _this.add.tween(_this.hand);
            _this.tweenHandright.to({ x: _this.tx, y: _this.ty }, 360, 'Linear', true, 0);
            _this.tweenHandright.start();
            _this.tweenHandright.onComplete.add(function () {
                _this.tweenHandleft = _this.add.tween(_this.hand);
                _this.tweenHandleft.to({ x: _this.x1, y: _this.ty }, 360, 'Linear', true, 0);
                _this.tweenHandleft.start();
                _this.tweenHandleft.onComplete.add(function () {
                    _this.tweenHandtop = _this.add.tween(_this.hand);
                    _this.tweenHandtop.to({ x: _this.x1, y: _this.y1 }, 360, 'Linear', true, 0);
                    _this.tweenHandtop.start();
                    _this.tweenHandtop.onComplete.add(function () {
                        _this.hand.destroy();
                    })
                })
            })
            // _this.hand.destroy();
        })
    },

    celebration: function () {
        _this.celebrationSound.play();
        _this.starActions(_this.count1);
    },

    starActions: function (target) {
        _this.noofAttempts ++;

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

    addNumberPad: function () {
        _this.numberpadFlag = true;
        _this.Choice = 1;
        _this.objGroup = _this.add.group();
        _this.numGroup = _this.add.group();

        var bottomnumpadbg = _this.numGroup.create(0, 515, 'numpadbg'); _this.mask
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
        _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked1, _this);

        _this.enterTxt = _this.add.text(75, 100, "");
        // _this.enterTxt.bringToTop();

        _this.numpadTween = _this.add.tween(_this.numGroup);
        //_this.AnswerBox.visible=true;
        //tween in the number pad after a second.
        _this.tweenNumPad();
    },

    wrongbtnClicked: function (target) {
        _this.clickSound.play();
        _this.eraseScreen();
    },

    eraseScreen: function (target) {
        _this.selectedAns1 = '';
        _this.selectedAns2 = '';
        _this.selectedAns3 = '';
        _this.AnswerBox.removeChild(_this.enterTxt);

        _this.AnswerBox.name = '';
        //}
    },

    tweenNumPad: function () {
        _this.numGroup.visible = true;
        _this.numpadTween.to({ x: 0, y: -43 }, 1000, 'Linear', true, 0);
    },

    numClicked: function (target) {
        console.log(target.name)
        _this.clickSound.play();
        var_selectedAns1 = " ";
        var_selectedAns2 = " ";
        var_selectedAns3 = " ";

        if (_this.selectedAns3 === '' && _this.selectedAns2 !== '' && _this.selectedAns1 !== '') {
            console.log("1");
            if (_this.selectedAns2 === 0 && target.name !== 0) {
                _this.selectedAns3 = target.name;
            }
            else if (_this.selectedAns2 !== '' && _this.selectedAns2 !== 0) {
                _this.selectedAns3 = target.name;
            }
            else if (_this.selectedAns2 !== 0 && target.name == 10) {
                _this.selectedAns2 = 0;
            }
            else {
                _this.selectedAns2 = target.name;
            }
        }

        if (_this.selectedAns2 === '') {
            console.log("2");
            if (_this.selectedAns1 === 0 && target.name !== 0) {
                _this.selectedAns2 = target.name;
            }
            else if (_this.selectedAns1 !== '' && _this.selectedAns1 !== 0) {
                _this.selectedAns2 = target.name;
            }
            else if (_this.selectedAns1 !== 0 && target.name == 10) {
                _this.selectedAns1 = 0;
            }
            else {
                _this.selectedAns1 = target.name;
            }
        }

        _this.AnswerBox.removeChild(_this.enterTxt);
        _this.enterTxt.visible = false;

        if (_this.selectedAns1 === 10) var_selectedAns1 = 0;
        else var_selectedAns1 = _this.selectedAns1;
        if (_this.selectedAns2 === 10) _this.selectedAns2 = 0;
        else var_selectedAns2 = _this.selectedAns2;
        if (_this.selectedAns3 === 10) _this.selectedAns3 = 0;
        else var_selectedAns3 = _this.selectedAns3;


        if (_this.selectedAns1 === "") var_selectedAns1 = " ";
        else var_selectedAns1 = _this.selectedAns1;

        if (_this.selectedAns2 === "") var_selectedAns2 = " ";
        else var_selectedAns2 = _this.selectedAns2;

        if (_this.selectedAns3 === "") var_selectedAns3 = " ";
        else var_selectedAns3 = _this.selectedAns3;

        //type0-scene1  type1-scene2  type2-scene3
        if (_this.selectedAns2 === "" && _this.selectedAns3 === "") {
            console.log("1");
            _this.enterTxt = _this.add.text(120, 22, "" + var_selectedAns1 + var_selectedAns2 + var_selectedAns3, { fontSize: '23px' });
        }
        else if (_this.selectedAns3 === "") {
            console.log("12");
            _this.enterTxt = _this.add.text(113, 22, "" + var_selectedAns1 + var_selectedAns2 + var_selectedAns3, { fontSize: '23px' });
        }
        else {
            console.log("13");
            _this.enterTxt = _this.add.text(107, 22, "" + var_selectedAns1 + var_selectedAns2 + var_selectedAns3, { fontSize: '23px' });
        }

        _this.enterTxt.align = 'right';
        _this.enterTxt.font = "Akzidenz-Grotesk BQ";
        _this.enterTxt.fill = '#65B4C3';//'#65B4C3','#E11584' = red
        _this.enterTxt.fontWeight = 'normal';
        _this.AnswerBox.addChild(_this.enterTxt);
        _this.enterTxt.visible = true;
        console.log(_this.selectedAns1, _this.selectedAns2, _this.selectedAns3);
        _this.AnswerBox.name = Number('' + var_selectedAns1 + var_selectedAns2 + var_selectedAns3);
        //_this.AnswerBox.name = Number('' + _this.selectedAns1 + _this.selectedAns2 + _this.selectedAns3);
        console.log(_this.AnswerBox.name);
    },

    DemoVideo: function () {
        //*  ‘S ‘ represents the side of a square
        _this.demoAudio1 = document.createElement('audio');
        _this.demoAudio1src = document.createElement('source');
        _this.demoAudio1src.setAttribute("src", window.baseUrl +  "questionSounds/GM-PYTH-G7/" + _this.languageSelected + "/GM_PYTH_G7_d1.mp3");
        _this.demoAudio1.appendChild(_this.demoAudio1src);

        //* ‘P ‘ represents perimeter
        _this.demoAudio2 = document.createElement('audio');
        _this.demoAudio2src = document.createElement('source');
        _this.demoAudio2src.setAttribute("src", window.baseUrl + "questionSounds/GM-PYTH-G7/" + _this.languageSelected + "/GM_PYTH_G7_d2.mp3");
        _this.demoAudio2.appendChild(_this.demoAudio2src);

        //*  ‘L ‘ represents the Length and  ‘B’ represents the breadth  of a rectangle
        _this.demoAudio3 = document.createElement('audio');
        _this.demoAudio3src = document.createElement('source');
        _this.demoAudio3src.setAttribute("src", window.baseUrl +  "questionSounds/GM-PYTH-G7/" + _this.languageSelected + "/GM_PYTH_G7_d3.mp3");
        _this.demoAudio3.appendChild(_this.demoAudio3src);

        //* verify pythagoras theorem , Is a2 +b2 equal to  c2 ? Can the sides form a right angle triangle?
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GM-PYTH-G7/" +
            _this.languageSelected + "/GM_PYTH_G7_a1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        //* These sides cannot form a right angle triangle
        _this.q2Sound = document.createElement('audio');
        _this.q2Soundsrc = document.createElement('source');
        _this.q2Soundsrc.setAttribute("src", window.baseUrl +  "questionSounds/GM-PYTH-G7/" +
            _this.languageSelected + "/GM_PYTH_G7_a2.mp3");
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
            if (_this.demoVideo_2)
                _this.demoVideo_2.stop(false);

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

        if (_this.demoAudio1Timer) clearTimeout(_this.demoAudio1Timer);
        if (_this.demoAudio2Timer) clearTimeout(_this.demoAudio2Timer);
        if (_this.q1Timer) clearTimeout(_this.q1Timer);
        if (_this.q2Timer) clearTimeout(_this.q2Timer);


        if (_this.demoAudio1) {
            console.log("removing the demo audio1");
            _this.demoAudio1.pause();
            _this.demoAudio1 = null;
            _this.demoAudio1src = null;
        }

        if (_this.demoAudio2) {
            console.log("removing the demo audio1");
            _this.demoAudio2.pause();
            _this.demoAudio2 = null;
            _this.demoAudio2src = null;
        }

        if (_this.demoAudio3) {
            console.log("removing the demo audio1");
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

        _this.skip.events.onInputDown.removeAll();
        _this.skip.destroy();                //* skip button destroyed

    },

    dA1: function () {
        console.log("inside demoAudio3sound.....");
        // _this.demoVideo_1.playbackRate = 1;
        _this.demoAudio3.play();
    },
    dA2: function () {
        console.log("inside playbackRate 1.....");
        _this.demoVideo_1.playbackRate = 1;
    },

    dA3: function () {
        console.log("inside demoAudio3sound.....");
        // _this.demoVideo_1.playbackRate = 1;
        _this.demoAudio3.play();
    },
    dA4: function () {
        console.log("inside playbackRate 1.....");
        _this.demoVideo_2.playbackRate = 1;
    },

    showDemoVideo: function () {
        _this.demoVideo_1 = _this.add.video('GMPYTHG71');
        _this.demoVideo_1.play(false);
        _this.demoVideo_1.changeSource(window.baseUrl + "assets/demoVideos/Gm-Pyth-G7-1.mp4");
        _this.video_playing = 1;
        _this.videoWorld_1 = _this.demoVideo_1.addToWorld();

        _this.demoAudio1.play();
        console.log("inside demoAudio1sound.....");
        //* play the demo audio1 after 1 sec delay
        _this.demoAudio1Timer = setTimeout(function ()    //* demoAudio1 js timer to play demoAudio1Timer after 1 seconds.
        {
            console.log("inside demoAudio2sound.....");
            _this.demoVideo_1.playbackRate = 0.6;
            clearTimeout(_this.demoAudio1Timer);         //* clear the time once its used.
            _this.demoAudio2.play();
        }, 11000);

        _this.demoAudio2.addEventListener('ended', _this.dA1);

        _this.demoAudio3.addEventListener('ended', _this.dA2);

        _this.q1Timer = setTimeout(function ()    //* q3 js timer to play q3 after 40 seconds.
        {
            console.log("inside q1sound.....")
            _this.demoVideo_1.playbackRate = 0.6;
            clearTimeout(_this.q1Timer);         //* clear the time once its used.
            _this.q1Sound.play();
        }, 42000);

        _this.q1Sound.addEventListener('ended', _this.dA2);

        _this.demoVideo_1.onComplete.add(function () {
            console.log("audio2 ended - pause video1");
            _this.demoVideo_2 = _this.add.video('GMPYTHG72');
            _this.demoVideo_2.play(false);
            _this.demoVideo_2.changeSource(window.baseUrl + "assets/demoVideos/Gm-Pyth-G7-2.mp4");  //* phaser needs this.to run in mobile
            _this.video_playing = 2;
            _this.videoWorld_2 = _this.demoVideo_2.addToWorld();

            _this.skip.bringToTop();

            _this.demoAudio1.play();

            //* play the demo audio1 after 1 sec delay
            _this.demoAudio2Timer = setTimeout(function ()    //* demoAudio1 js timer to play demoAudio1Timer after 1 seconds.
            {
                console.log("inside demoAudio2sound.....");
                _this.demoVideo_2.playbackRate = 0.65;
                clearTimeout(_this.demoAudio1Timer);         //* clear the time once its used.
                _this.demoAudio2.play();
            }, 11000);

            _this.demoAudio2.addEventListener('ended', _this.dA3);

            _this.demoAudio3.addEventListener('ended', _this.dA4);

            _this.q2Timer = setTimeout(function ()    //* q3 js timer to play q3 after 40 seconds.
            {
                console.log("inside q2sound.....")
                clearTimeout(_this.q2Timer);         //* clear the time once its used.
                _this.q2Sound.play();
            }, 45000);


            _this.demoVideo_2.onComplete.add(function () {
                console.log("demovideo 2 completed......!!!1")

                _this.stopAudio();
                _this.demoVideo_2.stop(false);
                _this.demoVideo_1.stop(false);
                _this.videoWorld_2.destroy();
                _this.videoWorld_1.destroy();

                if (_this.hintBtn) {
                    _this.hintBtn.inputEnabled = true;
                    _this.hintBtn.input.useHandCursor = true;
                }
                _this.game.paused = false;

            });

        });
    }
}
