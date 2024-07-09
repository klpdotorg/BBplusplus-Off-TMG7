Game.NSF_CUIS_G7level1 = function () { };


Game.NSF_CUIS_G7level1.prototype =
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
        _this.clickSoundsrc.setAttribute("src",window.baseUrl + "sounds/ClickSound.mp3");
        _this.clickSound.appendChild(_this.clickSoundsrc);

        _this.celebrationSound = document.createElement('audio');
        _this.celebrationSoundsrc = document.createElement('source');
        _this.celebrationSoundsrc.setAttribute("src",window.baseUrl + "sounds/celebration.mp3");
        _this.celebrationSound.appendChild(_this.celebrationSoundsrc);

        _this.counterCelebrationSound = document.createElement('audio');
        _this.counterCelebrationSoundsrc = document.createElement('source');
        _this.counterCelebrationSoundsrc.setAttribute("src",window.baseUrl + "sounds/counter_celebration.mp3");
        _this.counterCelebrationSound.appendChild(_this.counterCelebrationSoundsrc);

        _this.wrongans = document.createElement('audio');
        _this.wronganssrc = document.createElement('source');
        _this.wronganssrc.setAttribute("src",window.baseUrl + "sounds/WrongCelebrationSound.mp3");
        _this.wrongans.appendChild(_this.wronganssrc);

        _this.fraction_change = document.createElement('audio');
        _this.fraction_changesrc = document.createElement('source');
        _this.fraction_changesrc.setAttribute("src", window.baseUrl +"sounds/fraction_change.mp3");
        _this.fraction_change.appendChild(_this.fraction_changesrc);
        //fraction_change

        _this.Ask_Question1 = _this.createAudio("NSF_CUIS_G7_a1");
        _this.Ask_Question2 = _this.createAudio("NSF_CUIS_G7_a2");
        _this.Ask_Question3 = _this.createAudio("NSF_CUIS_G7_a3");

        //edited for baseurl apk
        telInitializer.gameIdInit("NSF_CUIS_G7", gradeSelected);// first Tele call
        console.log(gameID, "gameID...");


    },

    create: function (game) {
        _this.hintBtn = _this.add.sprite(670, 6, 'bulb');
        _this.hintBtn.scale.setTo(0.5, 0.6);
        _this.hintBtn.visible = false;
        // * show the demo video
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
        _this.speakerbtn;
        _this.background;
        _this.count = 0;
        _this.starsGroup;
        _this.selectedAns1 = '';
        _this.selectedAns2 = '';
        _this.AnswerBox;
        _this.seconds = 0;
        _this.minutes = 0;
        _this.stage = 0;
        _this.Question_flag = 0;
        _this.starting = 0;
        _this.objectCounter = 0;

        _this.color_flag;
        _this.object_tracker = 0;
        _this.object_holdArray = [];
        _this.fraction_flag = 0;
        _this.denomNum_flag = 0;
        _this.f_part = 0;

        _this.counterForTimer = 0;

        _this.questionType2OrginalArray = [];

        _this.tweenObjectGroup = _this.add.group();

        _this.initObjectArray = [];
        _this.objHolderArray = [];

        _this.hint_flag = 0;
        _this.speakerbtnClicked = false;
        _this.rightbtn_Clicked = false;

        _this.background = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'BG1');
        _this.navBar = _this.add.sprite(0, 0, 'navBar');

        _this.backbtn = _this.add.sprite(5, 6, 'backbtn');
        _this.backbtn.inputEnabled = true;
        _this.backbtn.input.useHandCursor = true;
        _this.backbtn.events.onInputDown.add(function () {
            console.log("inside backbutton function");
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

                if (_this.Question_flag == 0) {
                    _this.Ask_Question1.play();
                }
                else if (_this.Question_flag == 1) {
                    _this.Ask_Question2.play();
                }
                else if (_this.Question_flag == 2) {
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
        audiosrc.setAttribute("src",window.baseUrl + "questionSounds/NSF-CUIS-G7/" + _this.languageSelected + "/" + src + ".mp3");
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
        _this.displayInitialScreen();

        if (_this.count1 == 0) {
            _this.Ask_Question1.play();
        }
        _this.Question_flag = 0;

        console.log("inside get question.....");
        
        _this.hintBtn.inputEnabled = true;
        _this.hintBtn.input.useHandCursor = true;
        _this.hint_flag = 1;

        //edited for baseurl apk
        _this.questionid = 1;
    },

    Initial_randomizing: function () {

        _this.denomArray = [];
        _this.numaratorArray = [];
        _this.improperdenomArray = [];
        _this.impropernumaratorArray = [];
        _this.wholeNumberArray = [];

        //* Generate the numerator and denominator for proper fractions
        //* where numarator is less than denominator
        //* here maximum 10 we can have as denominator
        //* will generate denominator first
        for (i = 0; i < 2; i++) {
            _this.properDenominator = Math.floor(Math.random() * (11 - 2) + 2); //10
            console.log(_this.properDenominator, " denom");
            for (j = 0; j < _this.denomArray.length; j++) {
                if (_this.properDenominator == _this.denomArray[j]) {
                    _this.properDenominator = Math.floor(Math.random() * (11 - 2) + 2);
                    j = -1;
                }
            }
            _this.denomArray.push(_this.properDenominator);

            _this.properNumarator = Math.floor(Math.random() * (_this.properDenominator - 1) + 1);//9 9/10
            _this.numaratorArray.push(_this.properNumarator);
        }
        //* Generate the numerator and denominator for improper fractions
        for (i = 2; i < 4; i++) {
            _this.improperNumarator = Math.floor(Math.random() * (10 - 3) + 3);//9 9/10
            for (j = 2; j < _this.numaratorArray.length; j++) {
                if (_this.improperNumarator == _this.numaratorArray[j]) {
                    _this.improperNumarator = Math.floor(Math.random() * (10 - 3) + 3);
                    j = 1;
                }
            }
            _this.numaratorArray.push(_this.improperNumarator);

            _this.improperDenominator = Math.floor(Math.random() * (_this.improperNumarator - 2) + 2); //10
            _this.denomArray.push(_this.improperDenominator);
        }
        //* whole number generation
        for (i = 0; i < 2; i++) {
            _this.wholeNumber = Math.floor(Math.random() * (11 - 2) + 2);
            for (j = 0; j < _this.wholeNumberArray.length; j++) {
                if (_this.wholeNumber == _this.wholeNumberArray[j]) {
                    _this.wholeNumber = Math.floor(Math.random() * (11 - 2) + 2);
                    j = -1;
                }
            }
            _this.wholeNumberArray.push(_this.wholeNumber);
        }
        console.log(_this.numaratorArray, "numarator array");
        console.log(_this.denomArray, "denom array");
        console.log(_this.wholeNumberArray, "whole array");
    },

    displayInitialScreen: function () {

        //edited for baseurl apk
        _this.sceneCount++;
        // _this.AnsTimerCount = 0;
        _this.noofAttempts = 0;
        //....


        //* This function displays the initial screen with the big colum 
        //* and numbers, objects of the equation
        //_this.colorsGroup = _this.add.group();
        console.log("inside display object .......")
        if (_this.count1 == 0) {
            _this.column = _this.add.image(40, 80, 'Table_1');
            _this.column.scale.setTo(1, 1.54);

            _this.column_2 = _this.add.image(290, 180, 'Table_2');
            _this.column_2.scale.setTo(0.95, 1);

            _this.orange1 = _this.add.image(50, 90, 'o10');
            _this.orange = _this.add.image(50, 90, 'o10');
            _this.orange.inputEnabled = true;
            _this.orange.input.useHandCursor = true;
            _this.orange.input.enableDrag(true);
            _this.orange.events.onDragStop.add(function () {
                _this.object_name = "o10";
                _this.orange.x = 50;
                _this.orange.y = 90;
                if (_this.f_part == 0) {
                    if (_this.denomNum_flag == 1) {
                        if (_this.color_flag == 1) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject1 = _this.add.image(520, 340, _this.object_name);
                            _this.color_flag = 1; //switch the color flag from numerator to denominator position
                            _this.box_flag = 10;
                        }
                    }
                    else {
                        if (_this.color_flag == 0) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject0 = _this.add.image(520, 360, _this.object_name);
                            _this.color_flag = 0;
                            _this.box_flag = 10;
                        }
                    }
                } else {
                    _this.wrongans.play();
                }
            });

            _this.blue1 = _this.add.image(50, 127, 'bl9');
            _this.blue = _this.add.image(50, 127, 'bl9');
            _this.blue.inputEnabled = true;
            _this.blue.input.useHandCursor = true;
            _this.blue.input.enableDrag(true);
            _this.blue.events.onDragStop.add(function (target) {
                _this.object_name = "bl9";
                _this.blue.x = 50;
                _this.blue.y = 127;
                if (_this.f_part == 0) {
                    if (_this.denomNum_flag == 1) {
                        if (_this.color_flag == 1) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject1 = _this.add.image(520, 340, _this.object_name);
                            _this.color_flag = 1; //switch the color flag from numerator to denominator position
                            _this.box_flag = 9;
                        }
                    }
                    else {
                        //if(_this.WorkAreaObject0) _this.WorkAreaObject0.destroy();
                        if (_this.color_flag == 0) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject0 = _this.add.image(520, 360, _this.object_name);
                            _this.color_flag = 0;
                            _this.box_flag = 9;
                        }
                    }
                } else {
                    _this.wrongans.play();
                }
            });

            _this.brown1 = _this.add.image(50, 164, 'b8');
            _this.brown = _this.add.image(50, 164, 'b8');
            // _this.colorsGroup.add(_this.brown);
            _this.brown.inputEnabled = true;
            _this.brown.input.useHandCursor = true;
            _this.brown.input.enableDrag(true);
            _this.brown.events.onDragStop.add(function (target) {
                _this.object_name = "b8";
                _this.brown.x = 50;
                _this.brown.y = 164;
                if (_this.f_part == 0) {
                    if (_this.denomNum_flag == 1) {
                        if (_this.color_flag == 1) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject1 = _this.add.image(520, 340, _this.object_name);
                            _this.color_flag = 1; //switch the color flag from numerator to denominator position
                            _this.box_flag = 8;
                        }
                    }
                    else {
                        // if(_this.WorkAreaObject0) _this.WorkAreaObject0.destroy();
                        if (_this.color_flag == 0) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject0 = _this.add.image(520, 360, _this.object_name);
                            _this.color_flag = 0;
                            _this.box_flag = 8;
                        }
                    }
                } else {
                    _this.wrongans.play()
                }

            });

            _this.gray1 = _this.add.image(50, 201, 'dc7');
            _this.gray = _this.add.image(50, 201, 'dc7');
            // _this.colorsGroup.add(_this.gray);
            _this.gray.inputEnabled = true;
            _this.gray.input.useHandCursor = true;
            _this.gray.input.enableDrag(true);
            _this.gray.events.onDragStop.add(function (target) {
                _this.object_name = "dc7";
                _this.gray.x = 50;
                _this.gray.y = 201;
                if (_this.f_part == 0) {
                    if (_this.denomNum_flag == 1) {
                        if (_this.color_flag == 1) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject1 = _this.add.image(520, 340, _this.object_name);
                            _this.color_flag = 1; //switch the color flag from numerator to denominator position
                            _this.box_flag = 7;
                        }
                    }
                    else {
                        //if(_this.WorkAreaObject0) _this.WorkAreaObject0.destroy();
                        if (_this.color_flag == 0) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject0 = _this.add.image(520, 360, _this.object_name);
                            _this.color_flag = 0;
                            _this.box_flag = 7;
                        }
                    }
                } else {
                    _this.wrongans.play();
                }
            });

            _this.dgreen1 = _this.add.image(50, 238, 'dg6');
            _this.dgreen = _this.add.image(50, 238, 'dg6');
            // _this.colorsGroup.add(_this.dgreen);
            _this.dgreen.inputEnabled = true;
            _this.dgreen.input.useHandCursor = true;
            _this.dgreen.input.enableDrag(true);
            _this.dgreen.events.onDragStop.add(function (target) {
                _this.object_name = "dg6";
                _this.dgreen.x = 50;
                _this.dgreen.y = 238;
                if (_this.f_part == 0) {
                    if (_this.denomNum_flag == 1) {
                        if (_this.color_flag == 1) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject1 = _this.add.image(520, 340, _this.object_name);
                            _this.color_flag = 1; //switch the color flag from numerator to denominator position
                            _this.box_flag = 6;
                        }
                    }
                    else {
                        if (_this.color_flag == 0) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject0 = _this.add.image(520, 360, _this.object_name);
                            _this.color_flag = 0;
                            _this.box_flag = 6;
                        }
                    }
                } else {
                    _this.wrongans.play();
                }
            });

            _this.yellow1 = _this.add.image(50, 275, 'y5');
            _this.yellow = _this.add.image(50, 275, 'y5');
            //_this.colorsGroup.add(_this.yellow);
            _this.yellow.inputEnabled = true;
            _this.yellow.input.useHandCursor = true;
            _this.yellow.input.enableDrag(true);
            _this.yellow.events.onDragStop.add(function (target) {
                _this.object_name = "y5";
                _this.yellow.x = 50;
                _this.yellow.y = 275;
                if (_this.f_part == 0) {
                    if (_this.denomNum_flag == 1) {
                        if (_this.color_flag == 1) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject1 = _this.add.image(520, 340, _this.object_name);
                            _this.color_flag = 1; //switch the color flag from numerator to denominator position
                            _this.box_flag = 5;
                        }
                    }
                    else {
                        if (_this.color_flag == 0) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject0 = _this.add.image(520, 360, _this.object_name);
                            _this.color_flag = 0;
                            _this.box_flag = 5;
                        }

                    }
                } else {
                    _this.wrongans.play();
                }
            });

            _this.purple1 = _this.add.image(50, 312, 'p4');
            _this.purple = _this.add.image(50, 312, 'p4');
            // _this.colorsGroup.add(_this.purple);
            _this.purple.inputEnabled = true;
            _this.purple.input.useHandCursor = true;
            _this.purple.input.enableDrag(true);
            _this.purple.events.onDragStop.add(function (target) {
                _this.object_name = "p4";
                _this.purple.x = 50;
                _this.purple.y = 312;
                if (_this.f_part == 0) {
                    if (_this.denomNum_flag == 1) {
                        if (_this.color_flag == 1) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject1 = _this.add.image(520, 340, _this.object_name);
                            _this.color_flag = 1; //switch the color flag from numerator to denominator position
                            _this.box_flag = 4;
                        }
                    }
                    else {
                        if (_this.color_flag == 0) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject0 = _this.add.image(520, 360, _this.object_name);
                            _this.color_flag = 0;
                            _this.box_flag = 4;
                        }
                    }
                } else {
                    _this.wrongans.play();
                }
            });

            _this.lgreen1 = _this.add.image(50, 349, 'lg3');
            _this.lgreen = _this.add.image(50, 349, 'lg3');
            //_this.colorsGroup.add(_this.lgreen);
            _this.lgreen.inputEnabled = true;
            _this.lgreen.input.useHandCursor = true;
            _this.lgreen.input.enableDrag(true);
            _this.lgreen.events.onDragStop.add(function (target) {
                _this.object_name = "lg3";
                _this.lgreen.x = 50;
                _this.lgreen.y = 349;
                if (_this.f_part == 0) {
                    if (_this.denomNum_flag == 1) {
                        if (_this.color_flag == 1) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject1 = _this.add.image(520, 340, _this.object_name);
                            _this.color_flag = 1; //switch the color flag from numerator to denominator position
                            _this.box_flag = 3;
                        }
                    }
                    else {
                        if (_this.color_flag == 0) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject0 = _this.add.image(520, 360, _this.object_name);
                            _this.color_flag = 0;
                            _this.box_flag = 3;
                        }
                    }
                } else {
                    _this.wrongans.play();
                }
            });

            _this.red1 = _this.add.image(50, 386, 'r2');
            _this.red = _this.add.image(50, 386, 'r2');
            // _this.colorsGroup.add(_this.red);
            _this.red.inputEnabled = true;
            _this.red.input.useHandCursor = true;
            _this.red.input.enableDrag(true);
            _this.red.events.onDragStop.add(function (target) {
                _this.object_name = "r2";
                _this.red.x = 50;
                _this.red.y = 386;
                if (_this.f_part == 0) {
                    if (_this.denomNum_flag == 1) {
                        if (_this.color_flag == 1) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject1 = _this.add.image(520, 340, _this.object_name);
                            _this.color_flag = 1; //switch the color flag from numerator to denominator position
                            _this.box_flag = 2;
                        }
                    }
                    else {
                        if (_this.color_flag == 0) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject0 = _this.add.image(520, 360, _this.object_name);
                            _this.color_flag = 0;
                            _this.box_flag = 2;
                        }
                    }
                } else {
                    _this.wrongans.play();
                }
            });

            _this.white1 = _this.add.image(50, 423, 'w1');
            _this.white = _this.add.image(50, 423, 'w1');
            //_this.colorsGroup.add(_this.white);
            _this.white.inputEnabled = true;
            _this.white.input.useHandCursor = true;
            _this.white.input.enableDrag(true);
            _this.white.events.onDragStop.add(function (target) {
                _this.object_name = "w1";
                _this.white.x = 50;
                _this.white.y = 423;
                if (_this.f_part == 0) {
                    if (_this.denomNum_flag == 1) {
                        if (_this.color_flag == 1) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject1 = _this.add.image(520, 340, _this.object_name);
                            _this.color_flag = 1; //switch the color flag from numerator to denominator position
                            _this.box_flag = 1;
                        }
                    }
                    else {
                        if (_this.color_flag == 0) {
                            _this.wrongans.play();
                        }
                        else {
                            _this.WorkAreaObject0 = _this.add.image(520, 360, _this.object_name);
                            _this.color_flag = 0;
                            _this.box_flag = 1;
                        }
                    }
                } else {
                    _this.wrongans.play();
                }
            });

            _this.equationBox = _this.add.image(291, 71, 'Textbox_1');
            _this.equationBox.scale.setTo(0.9, 1);
            _this.tickBtn = _this.add.image(850, 75, 'TickBtn');
            _this.tickBtn.inputEnabled = true;
            _this.tickBtn.input.useHandCursor = true;
            _this.tickBtn.events.onInputDown.add(function () {
                _this.validateDenominator();
            });

            _this.swapBtn = _this.add.sprite(120, 380, 'swap');
            // _this.swapBtn.frame =0;
            _this.eraser = _this.add.sprite(180, 380, 'swapEraser');
            // _this.eraser.frame =1;
            _this.eraser.inputEnabled = true;
            _this.eraser.input.useHandCursor = true;
            _this.eraser.input.enableDrag(true);
            _this.eraser.events.onDragStop.add(_this.eraserDrop, _this);
            _this.eraser.events.onDragStart.add(_this.eraserStart, _this);
        }

        if (_this.fraction_flag == 0) {
            console.log("hiii")
            _this.numerator = _this.add.text(318, 82, _this.numaratorArray[_this.count1]);
            _this.applyingStyle(_this.numerator);
            //_this.devideSign = _this.add.text(309, 88, "__");
            _this.hrLine(313 - 4, 118);
            // _this.applyingStyle( _this.devideSign);
            if (_this.denomArray[_this.count1] >= 10) {
                _this.denominator = _this.add.text(308, 123, _this.denomArray[_this.count1]);
                _this.applyingStyle(_this.denominator);
                _this.denominator.fontSize = 29;
            }
            else {
                _this.denominator = _this.add.text(318, 124, _this.denomArray[_this.count1]);
                _this.applyingStyle(_this.denominator);
            }

            if (_this.count1 == 0) time_delay = 3000;
            else time_delay = 750;
            _this.time.events.add(time_delay, function () {
                _this.fraction_change.play();
                _this.yellow_bg = _this.add.image(308, 123, 'yellow_bg');//123, 80
                if (_this.fraction_flag == 0) {
                    if (_this.denomArray[_this.count1] >= 10) {
                        _this.denominatorCopy = _this.add.text(309, 125, _this.denomArray[_this.count1]);
                        _this.applyingStyle(_this.denominatorCopy);
                        _this.denominator.fontSize = 29;
                        _this.denominator.destroy();
                    }
                    else {
                        _this.denominatorCopy = _this.add.text(318, 125, _this.denomArray[_this.count1]);
                        _this.applyingStyle(_this.denominatorCopy);
                        _this.denominator.destroy();
                    }
                }
                //_this.equationBox.frame = 1;
            });
        }
    },

    eraserStart: function (target) {
        // _this.eraser.bringToTop();
        _this.world.bringToTop(_this.eraser);
        // _this.eraser.scale.setTo(0.5)
    },

    eraserDrop: function (target) {

        if (_this.denomNum_flag == 0) {
            if (_this.color_flag == 0) {
                if (_this.checkOverlap(target, _this.WorkAreaObject0)) {
                    _this.WorkAreaObject0.destroy();
                    _this.color_flag = -1;
                    _this.box_flag = 0;
                    target.x = 180;
                    target.y = 380;
                }
                else {
                    target.x = 180;
                    target.y = 380;
                }
            }
            else {
                target.x = 180;
                target.y = 380;
            }
        }
        else if (_this.denomNum_flag == 1) {
            if (_this.color_flag == 1) {
                if (_this.checkOverlap(target, _this.WorkAreaObject1)) {
                    _this.WorkAreaObject1.destroy();
                    _this.color_flag = -1;
                    _this.box_flag = 0;
                    target.x = 180;
                    target.y = 380;
                }
                else {
                    target.x = 180;
                    target.y = 380;
                }
            }
            else {
                target.x = 180;
                target.y = 380;
            }
        }
        else {
            target.x = 180;//180, 380,
            target.y = 380;
        }
    },

    checkOverlap: function (spriteA, spriteB) {
        _this.boundsA = spriteA.getBounds();
        _this.boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(_this.boundsA, _this.boundsB);
    },

    validateDenominator: function () {
        //* validate both denominator and numarator here for proper and improper fraction
        if (_this.denomNum_flag == 0) {
            console.log("denom.....");
            if (_this.box_flag == _this.denomArray[_this.count1])//&& _this.object_tracker == 1
            {
                _this.counterCelebrationSound.play();
                _this.time.events.add(1600, function () {
                    _this.yellow_bg.destroy();
                    _this.yellow_bg1 = _this.add.image(308, 80, 'yellow_bg');
                    if (_this.fraction_flag == 0) {
                        _this.numeratorCopy = _this.add.text(318, 82, _this.numaratorArray[_this.count1]);
                        _this.applyingStyle(_this.numeratorCopy);
                        _this.numerator.destroy();
                    }
                    _this.fraction_change.play();
                })
                //_this.color_flag =1;
                _this.denomNum_flag = 1;
            }
            else {
                _this.wrongans.play();
                //_this.destroyTheWrongOne();
                _this.color_flag = -1;
                if (_this.WorkAreaObject0) _this.WorkAreaObject0.destroy();
            }
        }
        else {
            console.log("nume.....");
            if (_this.box_flag == _this.numaratorArray[_this.count1])//&& _this.object_tracker == 1
            {
                _this.celebration();
                if (_this.count1 >= 4) {
                    _this.tickBtn.destroy();
                    _this.f_part = 1;
                    _this.color_flag = -1;
                    _this.fraction_flag = 1;
                    _this.denomNum_flag = 0;
                    _this.time.events.add(1500, function () {
                        _this.nextquestion();
                    })
                }
                _this.time.events.add(2100, function () {
                    _this.denomNum_flag = 0;
                    _this.equationBox.frame = 0;
                    _this.WorkAreaObject0.destroy();
                    _this.WorkAreaObject1.destroy();
                    _this.denominatorCopy.destroy();
                    _this.numeratorCopy.destroy();
                    _this.yellow_bg1.destroy();
                    _this.displayInitialScreen();
                });
            }
            else {
                //edited for baseurl apk
                _this.noofAttempts++;

                _this.wrongans.play();
                _this.color_flag = -1;
                if (_this.WorkAreaObject1) _this.WorkAreaObject1.destroy();
            }
        }
    },

    displayWholeEquation: function () {

        // //edited for baseurl apk
        // _this.sceneCount++;
        // // _this.AnsTimerCount = 0;
        // _this.noofAttempts = 0;
        // //....


        //* this is only for whole numbers display numbers for whole number part
        //* also tween the numbers add answer box
        // _this.devideSign.destroy();
        _this.equationBox.destroy();
        _this.equationBox = _this.add.image(290, 71, 'Textbox_1');
        _this.equationBox.scale.setTo(0.9, 1);
        if (_this.wholeNumberArray[_this.stage] >= 10) {
            _this.x = 309;
        } else {
            _this.x = 318;
        }
        if (_this.wholeNumberArray[_this.stage] >= 10) {
            _this.whole_num = _this.add.text(_this.x, 97, _this.wholeNumberArray[_this.stage]);
        }
        else {
            _this.whole_num = _this.add.text(_this.x, 97, _this.wholeNumberArray[_this.stage]);
        }

        _this.applyingStyle(_this.whole_num);

        _this.time.events.add(2000, function () {
            _this.tweenNumber = _this.add.tween(_this.whole_num);
            _this.tweenNumber.to({ x: _this.x, y: 82 }, 500, 'Linear', true, 0);
            _this.tweenNumber.start();

            _this.tweenNumber.onComplete.add(function () {
                console.log("hey..")
                _this.hrLine(313 - 4, 118);
                _this.AnswerBox = _this.add.image(308, 122, 'textbox2');
                _this.AnswerBox.scale.setTo(0.8, 0.8);
                _this.addNumberPad();
            });
        })
    },

    validateWholeNumber: function () {
        //* to validate whole number part
        if (_this.denomNum_flag == 0) {
            if (_this.box_flag == 1) {
                _this.counterCelebrationSound.play();
                _this.time.events.add(2000, function () {
                    _this.yellow_bg1.destroy();
                    _this.yellow_bg = _this.add.image(308, 80, 'yellow_bg');// _this.equationBox.frame = 2;
                    _this.fraction_change.play();
                    _this.whole_num.destroy();
                    if (_this.wholeNumberArray[_this.stage] >= 10) {
                        _this.x = 309;
                    } else {
                        _this.x = 318;
                    }
                    if (_this.wholeNumberArray[_this.stage] >= 10) {
                        _this.whole_num1 = _this.add.text(_this.x, 82, _this.wholeNumberArray[_this.stage]);
                    }
                    else {
                        _this.whole_num1 = _this.add.text(_this.x, 82, _this.wholeNumberArray[_this.stage]);
                    }
                    _this.applyingStyle(_this.whole_num1);
                })
                //_this.color_flag =1;
                _this.denomNum_flag = 1;
            }
            else {
                _this.wrongans.play();
                //_this.destroyTheWrongOne();
                _this.color_flag = -1;
                if (_this.WorkAreaObject0) _this.WorkAreaObject0.destroy();
            }
        }
        else {
            if (_this.box_flag == _this.wholeNumberArray[_this.stage]) {
                _this.WorkAreaObject0.destroy();
                _this.tickBtn1.destroy();
                _this.stage++;
                _this.denomNum_flag = 0;
                _this.f_part = 1;
                _this.celebration();
                _this.time.events.add(1200, function () {
                    _this.WorkAreaObject1.destroy();
                    _this.hrSign1.destroy();
                    _this.whole_num1.destroy();
                    _this.whole_num2.destroy();
                    _this.yellow_bg.destroy();
                    _this.nextquestion();
                })
            }
            else {
                //edited for baseurl apk
                _this.noofAttempts++;

                _this.wrongans.play();
                _this.color_flag = -1;
                if (_this.WorkAreaObject1) _this.WorkAreaObject1.destroy();
            }
        }
    },

    applyingStyle: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = 25;
    },

    applyingStyleRed: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#FF0000';
        target.fontWeight = 'normal';
        target.visible = true;
    },

    hrLine: function (x, y) {
        _this.hrSign1 = _this.add.graphics();
        _this.hrSign1.lineStyle(4, 0x65B4C3);
        _this.hrSign1.moveTo(x - 1, y);
        _this.hrSign1.lineTo(x + 33, y);

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
        _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked1, _this);

        _this.enterTxt = _this.add.text(-100, 8, "");
        _this.enterTxt.anchor.setTo(0.5);
        _this.enterTxt.align = 'center';
        _this.enterTxt.font = "Akzidenz-Grotesk BQ";
        _this.enterTxt.fontSize = "30px";
        _this.enterTxt.fontWeight = 'normal';
        _this.enterTxt.fill = '#65B4C3';

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
        _this.AnswerBox.removeChild(_this.enterTxt);

        _this.enterTxt.destroy();
        _this.enterTxt;
        _this.enterTxt.text = "";
        // _this.AnswerBox.name = '';
    },

    tweenNumPad: function () {
        _this.numGroup.visible = true;
        _this.numpadTween.to({ x: 0, y: -43 }, 1000, 'Linear', true, 0);
    },

    numClicked: function (target) {
        console.log(target.name)
        _this.clickSound.play();
        if (_this.selectedAns2 === '') {
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


        if (_this.selectedAns1 === "") var_selectedAns1 = " ";
        else var_selectedAns1 = _this.selectedAns1;

        if (_this.selectedAns2 === "") var_selectedAns2 = " ";
        else var_selectedAns2 = _this.selectedAns2;

        if (_this.selectedAns2 === "")
            _this.enterTxt = _this.add.text(14, 5, "" + var_selectedAns1 + var_selectedAns2, { fontSize: '30px' });
        else
            _this.enterTxt = _this.add.text(4, 5, "" + var_selectedAns1 + var_selectedAns2, { fontSize: '30px' });
        _this.enterTxt.align = 'right';
        _this.enterTxt.font = "Akzidenz-Grotesk BQ";
        _this.enterTxt.fill = '#65B4C3';
        _this.enterTxt.fontWeight = 'normal';
        _this.AnswerBox.addChild(_this.enterTxt);
        _this.enterTxt.visible = true;
        console.log(_this.selectedAns1, _this.selectedAns2)
        _this.AnswerBox.name = Number('' + var_selectedAns1 + var_selectedAns2);
        console.log(_this.AnswerBox.name);
    },

    rightbtnClicked1: function (target) {
        console.log(target.name);
        console.log("inside rightbtn");
        _this.clickSound.play();
        if (Number('' + _this.selectedAns1 + _this.selectedAns2) == '') {
            _this.wrongans.play();
        }
        else if (Number('' + _this.selectedAns1 + _this.selectedAns2) == 1) {
            _this.counterCelebrationSound.play();
            _this.Question_flag = 2;
            if (_this.count1 == 4) {
                _this.Ask_Question3.play();
            }
            _this.time.events.add(1300, function () {
                _this.f_part = 0;
                _this.numGroup.destroy();
                _this.AnswerBox.destroy();
                _this.fraction_change.play();
                _this.yellow_bg1 = _this.add.image(308, 123, 'yellow_bg');
                _this.whole_num2 = _this.add.text(318, 125, "1");
                _this.applyingStyle(_this.whole_num2);
                _this.tickBtn1 = _this.add.image(850, 75, 'TickBtn');
                _this.tickBtn1.inputEnabled = true;
                _this.tickBtn1.input.useHandCursor = true;
                _this.tickBtn1.events.onInputDown.add(function () {

                    _this.validateWholeNumber();
                });
                _this.eraseScreen();
            });
        }
        else {
            _this.wrongans.play();
            _this.eraseScreen();
        }
    },

    nextquestion: function () {
        if (_this.count1 < 6) {
            _this.qn_flag = 1;
            _this.time.events.add(500, function () {
                if (_this.count1 == 4) {
                    _this.Ask_Question2.play();
                }
                _this.Question_flag = 1;
                _this.displayWholeEquation();
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

    celebration: function () {
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
        //edited for baseurl apk
        _this.AnsTimerCount = 0;//total time
        _this.microConcepts = "Number SystemsG7";

        starAnim = _this.starsGroup.getChildAt(_this.count1);
        starAnim.smoothed = false;
        anim = starAnim.animations.add('star');
        //_this.anim.play();
        _this.count1++;
        anim.play();
    },

    shutdown: function () {
        //  _this.stopVoice();
    },

    //* Load all the audios required for the demo vedio, add skip button
    DemoVideo: function () {
        //*  These are cuisenaire rods which we are going to use for Fractions and its operations
        _this.demoAudio1 = document.createElement('audio');
        _this.demoAudio1src = document.createElement('source');
        _this.demoAudio1src.setAttribute("src",window.baseUrl + "questionSounds/NSF-CUIS-G7/" + _this.languageSelected + "/NSF_CUIS_G7_d1.mp3");
        _this.demoAudio1.appendChild(_this.demoAudio1src);

        //*  Represent the fraction ⅔ using cuisenaire rod 

        _this.demoAudio2 = document.createElement('audio');
        _this.demoAudio2src = document.createElement('source');
        _this.demoAudio2src.setAttribute("src", window.baseUrl +"questionSounds/NSF-CUIS-G7/" + _this.languageSelected + "/NSF_CUIS_G7_d2.mp3");
        _this.demoAudio2.appendChild(_this.demoAudio2src);

        //*  Always Remember, that the  Whole is represented by the denominator and the part is represented by the numerator.

        _this.demoAudio3 = document.createElement('audio');
        _this.demoAudio3src = document.createElement('source');
        _this.demoAudio3src.setAttribute("src",window.baseUrl + "questionSounds/NSF-CUIS-G7/" + _this.languageSelected + "/NSF_CUIS_G7_d3.mp3");
        _this.demoAudio3.appendChild(_this.demoAudio3src);

        //*   so first select whole and then the part
        // _this.demoAudio4 = document.createElement('audio');
        // _this.demoAudio4src = document.createElement('source');
        // _this.demoAudio4src.setAttribute("src", "questionSounds/NSF-CUIS-G7/" + _this.languageSelected + "/NSF_CUIS_G7_d4.mp3");
        // _this.demoAudio4.appendChild(_this.demoAudio4src);

        //* Represent 7 using cuisenaire rod 
        _this.demoAudio5 = document.createElement('audio');
        _this.demoAudio5src = document.createElement('source');
        _this.demoAudio5src.setAttribute("src",window.baseUrl + "questionSounds/NSF-CUIS-G7/" + _this.languageSelected + "/NSF_CUIS_G7_d4.mp3");
        _this.demoAudio5.appendChild(_this.demoAudio5src);

        //* Enter the Answer
        _this.demoAudio6 = document.createElement('audio');
        _this.demoAudio6src = document.createElement('source');
        _this.demoAudio6src.setAttribute("src",window.baseUrl + "questionSounds/NSF-CUIS-G7/" + _this.languageSelected + "/NSF_CUIS_G7_d5.mp3");
        _this.demoAudio6.appendChild(_this.demoAudio6src);

        //*  In fraction operation with cuisenaire rod, whole number is always represented by denominator as  1, here it will be  7 by 1(7/1 )
        _this.demoAudio7 = document.createElement('audio');
        _this.demoAudio7src = document.createElement('source');
        _this.demoAudio7src.setAttribute("src",window.baseUrl + "questionSounds/NSF-CUIS-G7/" + _this.languageSelected + "/NSF_CUIS_G7_d6.mp3");
        _this.demoAudio7.appendChild(_this.demoAudio7src);

        _this.video_playing = 0;
        _this.showDemoVideo();  //* call the function to show the video

        //* skip button shown at the bottom when clicked dlete all the demo vedio added will be deleted also the sudis will be stopped
        //* skip btn will be deleted
        _this.skip = _this.add.image(870, 410, 'skipArrow');
        _this.skip.inputEnabled = true;
        _this.skip.input.useHandCursor = true;
        _this.skip.events.onInputDown.add(function () {
            _this.stopAudio();

            if (_this.demoVideo_1)
                _this.demoVideo_1.stop(false);
            if (_this.videoWorld_1)
                _this.videoWorld_1.destroy();
            if (_this.demoVideo_2)
                _this.demoVideo_2.stop(false);
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
        if (_this.demoAudio3Timer) clearTimeout(_this.demoAudio3Timer);
        // if (_this.demoAudio4Timer) clearTimeout(_this.demoAudio4Timer);
        if (_this.demoAudio5Timer) clearTimeout(_this.demoAudio5Timer);
        if (_this.demoAudio6Timer) clearTimeout(_this.demoAudio6Timer);
        if (_this.demoAudio7Timer) clearTimeout(_this.demoAudio7Timer);


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
        // if (_this.demoAudio4) {
        //     console.log("removing the demo audio4");
        //     _this.demoAudio4.pause();
        //     _this.demoAudio4 = null;
        //     _this.demoAudio4src = null;
        // }
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

        _this.skip.events.onInputDown.removeAll();
        _this.skip.destroy();//* skip button destroyed

    },
    dA3: function () {
        _this.demoVideo_1.playbackRate = 1;
    },
    dA4: function () {
        _this.demoVideo_2.playbackRate = 1;
    },

    showDemoVideo: function () {
        _this.demoVideo_1 = _this.add.video('nsfcuis_1');
        _this.demoVideo_1.play(false);
        _this.demoVideo_1.changeSource(window.baseUrl + "assets/demoVideos/NSF-CUIS-G7_1.mp4");
        _this.video_playing = 1;
        _this.videoWorld_1 = _this.demoVideo_1.addToWorld();

        _this.demoAudio1Timer = setTimeout(function ()    //* demoAudio1Timer js timer to play demoAudio1 after 1 seconds.
        {
            console.log("inside demoAudio1sound.....")
            clearTimeout(_this.demoAudio1Timer);         //* clear the time once its used.
            _this.demoAudio1.play();
        }, 1000);

        _this.demoAudio2Timer = setTimeout(function ()    //* demoAudio2Timer js timer to play demoAudio2 after 15 seconds.
        {
            console.log("inside demoAudio2sound.....")
            clearTimeout(_this.demoAudio2Timer);
            _this.demoVideo_1.playbackRate = 0;         //* clear the time once its used.
            _this.demoAudio2.play();
        }, 15000);

        _this.demoAudio3Timer = setTimeout(function ()    //* demoAudio3Timer js timer to play demoAudio3 after 21 seconds.
        {
            console.log("inside demoAudio3sound.....")
            clearTimeout(_this.demoAudio3Timer);         //* clear the time once its used.
            _this.demoAudio3.play();
        }, 21000);
        _this.demoAudio3.addEventListener('ended', _this.dA3);

        // _this.demoAudio4Timer = setTimeout(function ()    //* demoAudio4Timer js timer to play demoAudio4 after 30 seconds.
        // {
        //     console.log("inside demoAudio4sound.....")
        //     clearTimeout(_this.demoAudio4Timer);         //* clear the time once its used.
        //     _this.demoAudio4.play();
        // }, 30000);

        _this.demoVideo_1.onComplete.add(function () {
            //* Add the second demo vedio
            console.log("audio2 ended - pause video1");
            _this.demoVideo_2 = _this.add.video('nsfcuis_2');
            _this.demoVideo_2.play(false);
            _this.demoVideo_2.changeSource(window.baseUrl + "assets/demoVideos/NSF-CUIS-G7_2.mp4");  //* phaser needs this.to run in mobile
            _this.video_playing = 2;
            _this.videoWorld_2 = _this.demoVideo_2.addToWorld();

            _this.skip.bringToTop();

            _this.demoAudio5Timer = setTimeout(function ()    //* demoAudio5Timer js timer to play demoAudio5 after 1 seconds.
            {
                console.log("inside demoAudio5sound.....")
                clearTimeout(_this.demoAudio5Timer);
                _this.demoVideo_2.playbackRate = 0;         //* clear the time once its used.
                _this.demoAudio5.play();
            }, 1000);


            _this.demoAudio6Timer = setTimeout(function ()    //* demoAudio6Timer js timer to play demoAudio6 after 5 seconds.
            {
                console.log("inside demoAudio6sound.....")
                clearTimeout(_this.demoAudio6Timer);
                _this.demoAudio6.play();
            }, 5000);
            _this.demoAudio6.addEventListener('ended', _this.dA4);

            _this.demoAudio7Timer = setTimeout(function ()    //* demoAudio7Timer js timer to play demoAudio7 after 10 seconds.
            {
                console.log("inside demoAudio7sound.....")
                clearTimeout(_this.demoAudio7Timer);         //* clear the time once its used.
                //_this.demoVideo_2.playbackRate = 0;
                _this.demoAudio7.play();
            }, 10000);
            //_this.demoAudio7.addEventListener('ended', _this.dA4);

            _this.demoVideo_2.onComplete.add(function () {
                console.log("demovideo 2 completed......!!!1")
                _this.stopAudio(); //* stop all the audios
                _this.demoVideo_2.stop(false); //* delete all the demo vedio one by one
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