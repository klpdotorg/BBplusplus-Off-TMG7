Game.GMLA_05_G7level1 = function () { };


Game.GMLA_05_G7level1.prototype =
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
        else //// console.log("Language selected: " + _this.languageSelected);
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

        _this.gameSound = document.createElement('audio');
        _this.gameSoundsrc = document.createElement('source');
        _this.gameSoundsrc.setAttribute("src", window.baseUrl + "sounds/Game Positive.mp3");
        _this.gameSound.appendChild(_this.gameSoundsrc);

        _this.Ask_Question1 = _this.createAudio("GMLA_05_G7_a1");
        _this.Ask_Question2 = _this.createAudio("GMLA_05_G7_a2");
        _this.Ask_Question3 = _this.createAudio("GMLA_05_G7_a3");
        // _this.Ask_Question4 = _this.createAudio("V4");
        // _this.Ask_Question5 = _this.createAudio("V5");
        // _this.Ask_Question6 = _this.createAudio("V6");
        // _this.Ask_Question7 = _this.createAudio("V7");

        telInitializer.gameIdInit("GMLA_05_G7", gradeSelected);
        console.log(gameID, "gameID...");
    },

    create: function (game) {

        //* show the demo video
        _this.time.events.add(1, function () {

            // _this.ViewDemoHint();
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

        _this.count1 = 0;//0
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

        _this.objectsArray = ['sandwitch', 'waffer', 'cheese', 'watermelon', 'sandwitch', 'waffer', 'cheese', 'watermelon'];//'sandwitch', 'waffer', 'cheese', 'watermelon', 'sandwitch', 'waffer', 'cheese', 'watermelon'
        _this.shuffleArray(_this.objectsArray);
        console.log(_this.objectsArray, "_this.objectsArray");

        _this.shake = new Phaser.Plugin.Shake(game);
        game.plugins.add(_this.shake);

        _this.counterForTimer = 0;

        _this.arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

        _this.boxPosition_x = [20, 20, 20];
        _this.boxPosition_y = [100, 236, 372];

        _this.hint_flag = 0;
        _this.speakerbtnClicked = false;
        _this.rightbtn_Clicked = false;

        _this.background = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'BG1');
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

                if (_this.Question_flag == 0) {
                    _this.pauseVoice();
                    _this.Ask_Question1.play();
                }
                else if (_this.Question_flag == 1) {
                    _this.pauseVoice();
                    _this.Ask_Question2.play();
                }
                else if (_this.Question_flag == 2) {
                    _this.pauseVoice();
                    _this.Ask_Question3.play();
                }
                // else if (_this.Question_flag == 3) {
                //     _this.pauseVoice();
                //     _this.Ask_Question4.play();
                // }
                // else if (_this.Question_flag == 4) {
                //     _this.pauseVoice();
                //     _this.Ask_Question5.play();
                // }
                // else if (_this.Question_flag == 5) {
                //     _this.pauseVoice();
                //     _this.Ask_Question6.play();
                // }
                // else if (_this.Question_flag == 6) {
                //     _this.pauseVoice();
                //     _this.Ask_Question7.play();
                // }

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
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-05-G7/" + _this.languageSelected + "/" + src + ".mp3");
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

        console.log("inside get question.....");
        _this.hintBtn.inputEnabled = true;
        _this.hintBtn.input.useHandCursor = true;
        _this.hint_flag = 1;

        _this.questionid = 1;
    },

    stopVoice: function () {
        if (_this.Ask_Question1) {
            _this.Ask_Question1.pause();
            _this.Ask_Question1 = null;
        }
        if (_this.Ask_Question2) {
            _this.Ask_Question2.pause();
            _this.Ask_Question2 = null;
        }
        if (_this.Ask_Question3) {
            _this.Ask_Question3.pause();
            _this.Ask_Question3 = null;
        }
        // if (_this.Ask_Question4) {
        //     _this.Ask_Question4.pause();
        //     _this.Ask_Question4 = null;
        // }
        // if (_this.Ask_Question5) {
        //     _this.Ask_Question5.pause();
        //     _this.Ask_Question5 = null;
        // }
        // if (_this.Ask_Question6) {
        //     _this.Ask_Question6.pause();
        //     _this.Ask_Question6 = null;
        // }
        // if (_this.Ask_Question7) {
        //     _this.Ask_Question7.pause();
        //     _this.Ask_Question7 = null;
        // }


        if (_this.celebrationSound) {
            if (_this.celebrationSound.isPlaying) {
                _this.celebrationSound.stop();
                _this.celebrationSound = null;
            }
        }

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
        // if (_this.Ask_Question4) {
        //     _this.Ask_Question4.pause();
        //     _this.Ask_Question4.currentTime = 0.0;
        // }
        // if (_this.Ask_Question5) {
        //     _this.Ask_Question5.pause();
        //     _this.Ask_Question5.currentTime = 0.0;
        // }
        // if (_this.Ask_Question6) {
        //     _this.Ask_Question6.pause();
        //     _this.Ask_Question6.currentTime = 0.0;
        // }
        // if (_this.Ask_Question7) {
        //     _this.Ask_Question7.pause();
        //     _this.Ask_Question7.currentTime = 0.0;
        // }
        if (_this.q1Sound) {
            _this.q1Sound.pause();
            _this.q1Sound.currentTime = 0.0;
        }
        if (_this.q2Sound) {
            _this.q2Sound.pause();
            _this.q2Sound.currentTime = 0.0;
        }
    },
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

    Initial_randomizing: function () {
        _this.noofAttempts = 0;
        _this.AnsTimerCount = 0;
        _this.sceneCount++;
        /**
         * ●	Two types of questions can be asked:
        ○	Find the value of the unknown exterior angle with the help of the values of the interior opposite angles. (4 out of 6 questions)
        ■	The triangle with the extended arm will be displayed in the question
        ○	Find the value of the unknown interior angle with the help of the values of the exterior angle and an interior opposite angle. (2 out of 6 questions)
        ■	The shape attached to the exterior angle will be displayed as the question and the child has to find the triangle         */

        //for sandwitch we are randomizing the angle here. here we want to know 3 angle x,y,z.
        //angle A range from 20 to 35 degree
        //randomize the x,y,z angle

        //sandwitchOrder 1 is the slop come like \ this. 2nd one is /.
        _this.sandwitchOrder = [1, 2];//1, 2
        _this.shuffleArray(_this.sandwitchOrder);
        console.log(_this.sandwitchOrder, "_this.sandwitchOrder");

        _this.ywOrder = [1];//1,2
        // _this.shuffleArray(_this.ywOrder);
        console.log(_this.ywOrder, "_this.ywOrder");

        if (_this.count1 < 6) {
            if (_this.objectsArray[_this.count1] == 'sandwitch') {
                _this.angle_y = Math.floor(Math.random() * (35 - 25)) + 25;//20 to 35
                console.log(_this.angle_y, "_this.angle_y");

                _this.angle_z = 90;

                _this.angle_x = _this.angle_y + 90;
                console.log(_this.angle_x, "_this.angle_x");
                _this.angle_w = 180 - _this.angle_x;
                console.log(_this.angle_w, "_this.angle_w");
            }
            else if (_this.objectsArray[_this.count1] == 'waffer') {
                //randomization for waffer.
                _this.waffer_Angle_y = Math.floor(Math.random() * (70 - 45)) + 45;//angle c
                console.log(_this.waffer_Angle_y, "_this.waffer_Angle_y");

                while (_this.waffer_Angle_y == 59 || _this.waffer_Angle_y == 60 || _this.waffer_Angle_y == 61) {
                    _this.waffer_Angle_y = Math.floor(Math.random() * (70 - 45)) + 45;//angle c
                    console.log(_this.waffer_Angle_y, "_this.waffer_Angle_y");
                }

                _this.waffer_Angle_z = 52;//angle a

                _this.waffer_Angle_b = 180 - (_this.waffer_Angle_y + _this.waffer_Angle_z);
                console.log(_this.waffer_Angle_b, "_this.waffer_Angle_b");

                _this.waffer_Angle_x = 180 - _this.waffer_Angle_b;
                console.log(_this.waffer_Angle_x, "_this.waffer_Angle_x");
            }
            else if (_this.objectsArray[_this.count1] == 'cheese') {
                //randomization for cheese.
                _this.cheese_Angle_y = Math.floor(Math.random() * (75 - 45)) + 45;//angle c
                console.log(_this.cheese_Angle_y, "_this.cheese_Angle_y");

                _this.cheese_Angle_z = 65;//angle a

                _this.cheese_Angle_b = 180 - (_this.cheese_Angle_y + _this.cheese_Angle_z);//angle b
                console.log(_this.cheese_Angle_b, "_this.cheese_Angle_b");

                _this.cheese_Angle_x = 180 - _this.cheese_Angle_b;
                console.log(_this.cheese_Angle_x, "_this.cheese_Angle_x");

            }
            else {
                if (_this.objectsArray[_this.count1] == 'watermelon') {
                    if (_this.count1 > 3) {
                        _this.ywOrder = [1, 3];//1, 3
                        _this.shuffleArray(_this.ywOrder);
                        console.log(_this.ywOrder, "_this.ywOrder");
                    }
                    //randomization for watermelon.
                    _this.watermelon_Angle_y = Math.floor(Math.random() * (70 - 35)) + 35;//angle c
                    console.log(_this.watermelon_Angle_y, "_this.watermelon_Angle_y");

                    if (_this.ywOrder[0] == 3) {

                        // _this.watermelon_Angle_y_1 = Math.floor(Math.random() * (70 - 40)) + 40;//angle c total angle. spliting it to two
                        // console.log(_this.watermelon_Angle_y_1, "_this.watermelon_Angle_y_1");

                        _this.watermelon_Angle_z = Math.floor(Math.random() * (60 - 50)) + 50;//angle a
                        console.log(_this.watermelon_Angle_z, "_this.watermelon_Angle_z");

                        _this.wAngle_W = 180 - _this.watermelon_Angle_z;
                        console.log(_this.wAngle_W, "_this.wAngle_W");

                        _this.wAngle_V = 180 - (45 + _this.wAngle_W);
                        console.log(_this.wAngle_V, "_this.wAngle_V");// y1 angle 

                        _this.watermelon_Angle_z_1 = 45;

                        _this.watermelon_Angle_y_1 = _this.watermelon_Angle_y - _this.wAngle_V;//y angle
                        console.log(_this.watermelon_Angle_y_1, "_this.watermelon_Angle_y_1");

                        _this.watermelon_Angle_b = 180 - (_this.watermelon_Angle_y_1 + _this.watermelon_Angle_z);//angle b
                        console.log(_this.watermelon_Angle_b, "_this.watermelon_Angle_b");

                        _this.watermelon_Angle_x = 180 - _this.watermelon_Angle_b;
                        console.log(_this.watermelon_Angle_x, "_this.watermelon_Angle_x");

                        console.log(_this.watermelon_Angle_z + _this.watermelon_Angle_y_1 + _this.watermelon_Angle_b, "total 180");
                    }
                    else {
                        _this.watermelon_Angle_z = 45;//angle a

                        _this.watermelon_Angle_b = 180 - (_this.watermelon_Angle_y + _this.watermelon_Angle_z);//angle b
                        console.log(_this.watermelon_Angle_b, "_this.watermelon_Angle_b");

                        _this.watermelon_Angle_x = 180 - _this.watermelon_Angle_b;
                        console.log(_this.watermelon_Angle_x, "_this.watermelon_Angle_x");
                    }


                }
            }

        }

        if (_this.objectsArray[_this.count1] == 'sandwitch')
            _this.sandwitchMask();
        else if (_this.objectsArray[_this.count1] == 'waffer')
            _this.wafferMask();
        else if (_this.objectsArray[_this.count1] == 'cheese')
            _this.cheeseMask();
        else {
            if (_this.objectsArray[_this.count1] == 'watermelon')
                _this.watermelonMask();
        }

        _this.watermelonGroup = _this.add.group();
        _this.watermelonGroup_2 = _this.add.group();
        _this.watermelonGroup_3 = _this.add.group();
        _this.watermelonGroup_4 = _this.add.group();

        _this.sandwitchGroup = _this.add.group();
        _this.sandwitchGroup_2 = _this.add.group();
        _this.sandwitchGroup_3 = _this.add.group();
        _this.sandwitchGroup_4 = _this.add.group();

        _this.wafferGroup = _this.add.group();
        _this.wafferGroup_2 = _this.add.group();
        _this.wafferGroup_3 = _this.add.group();
        _this.wafferGroup_4 = _this.add.group();

        _this.CheeseGroup = _this.add.group();
        _this.CheeseGroup_2 = _this.add.group();
        _this.CheeseGroup_3 = _this.add.group();
        _this.CheeseGroup_4 = _this.add.group();

        _this.Question_flag = 0;
        if (_this.count1 == 0) {
            _this.Ask_Question1.play();
        }

    },

    watermelonMask: function () {
        _this.panel_1 = _this.add.image(200, 100, 'panle_1');//white screen
        _this.panel_1.scale.setTo(0.75, 0.65);

        _this.panel_2 = _this.add.image(230, 110, 'panle_3');//tray
        _this.panel_2.scale.setTo(0.72, 0.65);

        _this.watermelon_1 = _this.add.image(430, 180, 'watermelon');
        _this.watermelon_1.scale.setTo(0.7);

        _this.watermelon_2 = _this.add.image(430, 180, 'watermelon');
        _this.watermelon_2.scale.setTo(0.7);
        _this.watermelon_2.alpha = 0;

        _this.orange_1 = _this.add.image(700, 140, 'orange');
        _this.orange_1.scale.setTo(0.7);
        _this.orange_2 = _this.add.image(700, 210, 'orange');
        _this.orange_2.scale.setTo(0.7);
        _this.orange_3 = _this.add.image(700, 280, 'orange');
        _this.orange_3.scale.setTo(0.7);
        _this.orange_4 = _this.add.image(700, 350, 'orange');
        _this.orange_4.scale.setTo(0.7);

        _this.strawberry_1 = _this.add.image(460, 140, 'strawberry');
        _this.strawberry_1.scale.setTo(0.7);
        _this.strawberry_2 = _this.add.image(520, 140, 'strawberry');
        _this.strawberry_2.scale.setTo(0.7);
        _this.strawberry_3 = _this.add.image(580, 140, 'strawberry');
        _this.strawberry_3.scale.setTo(0.7);
        _this.strawberry_4 = _this.add.image(640, 140, 'strawberry');
        _this.strawberry_4.scale.setTo(0.7);

        _this.strawberry_5 = _this.add.image(520, 210, 'strawberry');
        _this.strawberry_5.scale.setTo(0.7);
        _this.strawberry_6 = _this.add.image(580, 210, 'strawberry');
        _this.strawberry_6.scale.setTo(0.7);
        _this.strawberry_7 = _this.add.image(640, 210, 'strawberry');
        _this.strawberry_7.scale.setTo(0.7);

        _this.strawberry_8 = _this.add.image(590, 280, 'strawberry');
        _this.strawberry_8.scale.setTo(0.7);
        _this.strawberry_9 = _this.add.image(650, 280, 'strawberry');
        _this.strawberry_9.scale.setTo(0.7);

        _this.strawberry_10 = _this.add.image(655, 350, 'strawberry');
        _this.strawberry_10.scale.setTo(0.7);

        // Convert _this.watermelon_Angle_z degrees to radians
        _this.watermelon_Angle_z_sin = _this.watermelon_Angle_z * Math.PI / 180;
        // Find the sine of the angle
        _this.sineOfAngle_z = Math.sin(_this.watermelon_Angle_z_sin);
        _this.sinA = _this.sineOfAngle_z.toFixed(2);
        console.log(_this.sinA, "a angle.."); // Output: 0.5

        // Convert _this.watermelon_Angle_b degrees to radians
        _this.watermelon_Angle_b_sin = _this.watermelon_Angle_b * Math.PI / 180;
        // Find the sine of the angle
        _this.sineOfAngle_b = Math.sin(_this.watermelon_Angle_b_sin);
        _this.sinB = _this.sineOfAngle_b.toFixed(2);
        console.log(_this.sinB, "b angle.."); // Output: 0.5

        // Convert _this.watermelon_Angle_y degrees to radians
        _this.watermelon_Angle_y_sin = _this.watermelon_Angle_y * Math.PI / 180;
        // Find the sine of the angle
        _this.sineOfAngle_y = Math.sin(_this.watermelon_Angle_y_sin);
        _this.sinC = _this.sineOfAngle_y.toFixed(2);
        console.log(_this.sinC, "c angle.."); // Output: 0.5

        //fiding the hiding part angles.
        // Convert _this.watermelon_Angle_z degrees to radians z=45 degree
        _this.watermelon_Angle_z_1_sin = _this.watermelon_Angle_z_1 * Math.PI / 180;
        // Find the sine of the angle
        _this.sineOfAngle_z_1 = Math.sin(_this.watermelon_Angle_z_1_sin);
        _this.sinA_1 = _this.sineOfAngle_z_1.toFixed(2);
        console.log(_this.sinA_1, "z1 angle.."); // Output: 0.5

        // Convert _this.wAngle_V degrees to radians
        _this.watermelon_Angle_v_sin = _this.wAngle_V * Math.PI / 180;
        // Find the sine of the angle
        _this.sineOfAngle_v = Math.sin(_this.watermelon_Angle_v_sin);
        _this.sinV = _this.sineOfAngle_v.toFixed(2);
        console.log(_this.sinV, "v angle.."); // Output: 0.5

        // Convert _this.wAngle_W degrees to radians
        _this.watermelon_Angle_w_sin = _this.wAngle_W * Math.PI / 180;
        // Find the sine of the angle
        _this.sineOfAngle_w = Math.sin(_this.watermelon_Angle_w_sin);
        _this.sinW = _this.sineOfAngle_w.toFixed(2);
        console.log(_this.sinW, "w angle.."); // Output: 0.5

        //calculating the new z side part
        _this.CAside_part = ((185 * _this.sinA_1) / _this.sinW);
        console.log(_this.CAside_part, "CAside_part..");

        // for masking the sandwitch pease we draw a traingle and that is used for masking the object.
        if (_this.count1 < 4) {
            // Create a new graphics object
            var triangle = _this.add.graphics(0, 0);

            // Draw the triangle on the graphics object
            triangle.beginFill(0xffffff); // Set the color of the triangle
            triangle.moveTo(705, 447); // Set the starting point of the triangle
            triangle.lineTo(430, 447); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)//430 + ((272 * _this.sinC) / _this.sinB), 300
            triangle.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 447 - ((185 * _this.sinC) / _this.sinB)); // Draw the second line of the triangle
            triangle.lineTo(705, 447); // Draw the third line of the triangle to close the shape
            triangle.endFill();
            triangle.endFill();
            triangle.alpha = 0;

            _this.watermelon_1.mask = triangle;
        }
        else {
            // Create a new graphics object
            var triangle = _this.add.graphics(0, 0);

            // Draw the triangle on the graphics object
            triangle.beginFill(0xffffff); // Set the color of the triangle
            triangle.moveTo(430, 447); // Set the starting point of the triangle
            triangle.lineTo(430, 180); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)//430 + ((272 * _this.sinC) / _this.sinB), 300
            triangle.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 447 - ((185 * _this.sinC) / _this.sinB)); // Draw the second line of the triangle
            triangle.lineTo(430, 447); // Draw the third line of the triangle to close the shape
            triangle.endFill();
            triangle.alpha = 0;

            _this.watermelon_1.mask = triangle;

            if (_this.ywOrder[0] == 3) {
                // Create a new graphics object
                var maskMe = _this.add.graphics(0, 0);

                // Draw the triangle on the graphics object
                maskMe.beginFill(0xffffff); // Set the color of the triangle
                maskMe.moveTo(430, 446);
                maskMe.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));
                maskMe.lineTo(705 - ((185 * _this.sinV) / _this.sinW), 445 - ((185 * _this.sinV) / _this.sinW));
                maskMe.lineTo(430, 446);
                maskMe.endFill();
                maskMe.alpha = 0;
                _this.watermelon_2.mask = maskMe;
            }
        }

        if (_this.count1 > 3) {
            if (_this.ywOrder[0] == 1 || _this.ywOrder[0] == 2) {
                //for yello filling triangle. second part
                // create a new graphics object. right side height
                _this.melonTriangle_2 = _this.add.graphics(0, 0);
                // set the line style
                _this.melonTriangle_2.lineStyle(4, 0x40E0D0, 1);
                _this.melonTriangle_2.beginFill(0xFFFF00);//yellow color
                // draw the line
                _this.melonTriangle_2.moveTo(705, 446); // Set the starting point of the triangle
                _this.melonTriangle_2.lineTo(430, 446); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)//430 + ((272 * _this.sinC) / _this.sinB), 300
                _this.melonTriangle_2.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB)); // Draw the second line of the triangle
                _this.melonTriangle_2.lineTo(705, 446);
                _this.melonTriangle_2.endFill();
                _this.melonTriangle_2.alpha = 0;
            }
            else {
                //for yello filling triangle. second part
                // create a new graphics object. right side height
                _this.melonTriangle_2 = _this.add.graphics(0, 0);
                // set the line style
                _this.melonTriangle_2.lineStyle(4, 0x40E0D0, 1);
                _this.melonTriangle_2.beginFill(0xFFFF00);//yellow color
                _this.melonTriangle_2.moveTo(430, 446);
                _this.melonTriangle_2.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));
                _this.melonTriangle_2.lineTo(705 - ((185 * _this.sinV) / _this.sinW), 445 - ((185 * _this.sinV) / _this.sinW));
                _this.melonTriangle_2.lineTo(430, 446);

                _this.melonTriangle_2.endFill();
                _this.melonTriangle_2.alpha = 0;

                // //hiding part
                // _this.melonTriangle_3 = _this.add.graphics(0, 0);
                // _this.melonTriangle_3.lineStyle(4, 0xFFFF00, 1);
                // _this.melonTriangle_3.moveTo(430, 446);
                // _this.melonTriangle_3.lineTo(705, 446);
                // _this.melonTriangle_3.lineTo(705 - ((185 * _this.sinV) / _this.sinW), 445 - ((185 * _this.sinV) / _this.sinW));
                // _this.melonTriangle_3.lineTo(430, 446);

                // _this.melonTriangle_3.endFill();
                // _this.melonTriangle_3.alpha = 1;
            }
        }

        _this.time.events.add(3000, () => {
            if (_this.count1 > 3) _this.watermelonGroup_4.addChild(_this.melonTriangle_2);
            if (_this.ywOrder[0] == 1 || _this.count1 < 4) {
                //for creating pink mask
                // Create a new circle sprite
                _this.circle = _this.add.graphics(430, 445);
                _this.circle.beginFill(0xE11584);//0xE11584
                _this.circle.drawCircle(0, 0, 70);
                _this.circle.endFill();
                // Create a new mask graphics object
                _this.mask_1 = _this.add.graphics(430, 445);
                // Draw a sector shape on the mask graphics object
                _this.mask_1.beginFill(0xffffff);
                _this.mask_1.moveTo(0, 0);
                _this.mask_1.lineTo(50, 0);
                _this.mask_1.arc(0, 0, 70, _this.math.degToRad(0), _this.math.degToRad(360 - _this.watermelon_Angle_y), true);
                _this.mask_1.lineTo(0, 0);
                _this.mask_1.endFill();
                // Apply the mask to the circle sprite
                _this.circle.mask = _this.mask_1;
                _this.circle.alpha = 0;
                _this.mask_1.alpha = 0;

                _this.watermelonGroup_4.addChild(_this.circle);
                _this.watermelonGroup_4.addChild(_this.mask_1);
            }
            else {
                //for z finding angle
                //for creating pink mask
                // Create a new circle sprite
                _this.circle = _this.add.graphics(430, 445);
                _this.circle.beginFill(0xE11584);//0xE11584
                _this.circle.drawCircle(0, 0, 70);
                _this.circle.endFill();
                // Create a new mask graphics object
                _this.mask_1 = _this.add.graphics(430, 445);
                // Draw a sector shape on the mask graphics object
                _this.mask_1.beginFill(0xffffff);
                _this.mask_1.moveTo(0, 0);
                _this.mask_1.lineTo(50, 0);
                _this.mask_1.arc(0, 0, 70, _this.math.degToRad(360 - _this.wAngle_V), _this.math.degToRad((360 - _this.wAngle_V) - _this.watermelon_Angle_y_1), true);
                _this.mask_1.lineTo(0, 0);
                _this.mask_1.endFill();
                // Apply the mask to the circle sprite
                _this.circle.mask = _this.mask_1;
                _this.circle.alpha = 0;
                _this.mask_1.alpha = 0;

                _this.watermelonGroup_4.addChild(_this.circle);
                _this.watermelonGroup_4.addChild(_this.mask_1);
            }
            if ((_this.ywOrder[0] == 1 || _this.ywOrder[0] == 2) || _this.count1 < 4) {
                //for creating orange mask
                // Create a new circle sprite
                _this.circleMask_2 = _this.add.graphics(703, 445);
                _this.circleMask_2.beginFill(0xff8c00);
                _this.circleMask_2.drawCircle(0, 0, 65);
                _this.circleMask_2.endFill();
                // Create a new mask graphics object
                _this.mask_2 = _this.add.graphics(703, 445);
                // Draw a sector shape on the mask graphics object
                _this.mask_2.beginFill(0xffffff);
                _this.mask_2.moveTo(0, 0);
                _this.mask_2.lineTo(50, 0);
                _this.mask_2.arc(0, 0, 60, _this.math.degToRad(180), _this.math.degToRad(360 - _this.watermelon_Angle_z + 270), true);
                _this.mask_2.lineTo(0, 0);
                _this.mask_2.endFill();
                // Apply the mask to the circle sprite
                _this.circleMask_2.mask = _this.mask_2;

                _this.circleMask_2.alpha = 0;
                _this.mask_2.alpha = 0;

                _this.watermelonGroup_4.addChild(_this.circleMask_2);
                _this.watermelonGroup_4.addChild(_this.mask_2);
            }
            else {
                //for creating orange mask
                // Create a new circle sprite
                _this.circleMask_2 = _this.add.graphics(705 - ((185 * _this.sinV) / _this.sinW), 445 - ((185 * _this.sinV) / _this.sinW));
                _this.circleMask_2.beginFill(0xff8c00);
                _this.circleMask_2.drawCircle(0, 0, 65);
                _this.circleMask_2.endFill();
                // Create a new mask graphics object
                _this.mask_2 = _this.add.graphics(705 - ((185 * _this.sinV) / _this.sinW), 445 - ((185 * _this.sinV) / _this.sinW));
                // Draw a sector shape on the mask graphics object
                _this.mask_2.beginFill(0xffffff);
                _this.mask_2.moveTo(0, 0);
                _this.mask_2.lineTo(50, 0);
                _this.mask_2.arc(0, 0, 60, _this.math.degToRad(230), _this.math.degToRad(230 - _this.watermelon_Angle_z), true);
                _this.mask_2.lineTo(0, 0);
                _this.mask_2.endFill();
                // Apply the mask to the circle sprite
                _this.circleMask_2.mask = _this.mask_2;

                _this.circleMask_2.alpha = 0;
                _this.mask_2.alpha = 0;

                _this.watermelonGroup_4.addChild(_this.circleMask_2);
                _this.watermelonGroup_4.addChild(_this.mask_2);
            }

            if (_this.count1 > 3) {
                //for creating blue mask
                // Create a new circle sprite
                _this.circleMask_6 = _this.add.graphics(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));//705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB)
                _this.circleMask_6.beginFill(0x40E0D0);
                _this.circleMask_6.drawCircle(0, 0, 79);
                _this.circleMask_6.endFill();

                // Create a new mask graphics object
                _this.mask_6 = _this.add.graphics(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));//705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB)

                // Draw a sector shape on the mask graphics object
                _this.mask_6.beginFill(0xffffff);
                _this.mask_6.moveTo(0, 0);
                _this.mask_6.lineTo(50, 0);
                _this.mask_6.arc(0, 0, 20, _this.math.degToRad(230), _this.math.degToRad(360 - _this.watermelon_Angle_x + 230), true);
                _this.mask_6.lineTo(0, 0);
                _this.mask_6.endFill();

                // Apply the mask to the circle sprite
                _this.circleMask_6.mask = _this.mask_6;

                _this.circleMask_6.alpha = 0;
                _this.mask_6.alpha = 0;

                _this.watermelonGroup_4.addChild(_this.circleMask_6);
                _this.watermelonGroup_4.addChild(_this.mask_6);

            }

            if (_this.count1 < 4 || (_this.ywOrder[0] == 1 || _this.ywOrder[0] == 2)) {
                //for blue line
                // create a new graphics object
                _this.graphics_height = _this.add.graphics(0, 0);
                // set the line style
                _this.graphics_height.lineStyle(4, 0x40E0D0, 1);
                // draw the line
                _this.graphics_height.moveTo(430, 445);//straight line
                _this.graphics_height.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));//straight line//180
                _this.graphics_height.endFill();

                // create a new graphics object
                _this.graphics_bottom = _this.add.graphics(0, 0);
                // set the line style
                _this.graphics_bottom.lineStyle(4, 0x40E0D0, 1);
                // draw the line
                _this.graphics_bottom.moveTo(430, 445);//bottom line
                _this.graphics_bottom.lineTo(705, 445);//bottom line
                _this.graphics_bottom.endFill();

                // create a new graphics object
                _this.graphics_slop = _this.add.graphics(0, 0);

                // set the line style
                _this.graphics_slop.lineStyle(4, 0x40E0D0, 1);

                // draw the line
                _this.graphics_slop.moveTo(705, 445);//slop line
                _this.graphics_slop.lineTo(705 - ((185 * _this.sinC) / _this.sinB) - 53, 445 - ((185 * _this.sinC) / _this.sinB) - 50);//slop line
                _this.graphics_slop.endFill();

                _this.watermelonGroup_4.addChild(_this.graphics_height);
                _this.watermelonGroup_4.addChild(_this.graphics_bottom);
                _this.watermelonGroup_4.addChild(_this.graphics_slop);

            }
            else {
                //for blue line
                // create a new graphics object
                _this.graphics_height = _this.add.graphics(0, 0);
                // set the line style
                _this.graphics_height.lineStyle(4, 0x40E0D0, 1);
                // draw the line
                _this.graphics_height.moveTo(430, 446);//straight line
                _this.graphics_height.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));//straight line//180
                _this.graphics_height.endFill();

                // create a new graphics object
                _this.graphics_bottom = _this.add.graphics(0, 0);
                // set the line style
                _this.graphics_bottom.lineStyle(4, 0x40E0D0, 1);
                // draw the line
                _this.graphics_bottom.moveTo(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));//bottom line
                _this.graphics_bottom.lineTo(705 - ((185 * _this.sinV) / _this.sinW), 445 - ((185 * _this.sinV) / _this.sinW));//bottom line
                _this.graphics_bottom.endFill();

                // create a new graphics object
                _this.graphics_slop = _this.add.graphics(0, 0);

                // set the line style
                _this.graphics_slop.lineStyle(4, 0x40E0D0, 1);

                // draw the line
                _this.graphics_slop.moveTo(705 - ((185 * _this.sinV) / _this.sinW), 445 - ((185 * _this.sinV) / _this.sinW));//slop line
                _this.graphics_slop.lineTo(430, 446);//slop line
                _this.graphics_slop.endFill();

                _this.watermelonGroup_4.addChild(_this.graphics_height);
                _this.watermelonGroup_4.addChild(_this.graphics_bottom);
                _this.watermelonGroup_4.addChild(_this.graphics_slop);
            }
            if (_this.count1 > 3) {
                //for blue line
                // create a new graphics object. right side height
                _this.melonTriangle = _this.add.graphics(0, 0);
                // set the line style
                _this.melonTriangle.lineStyle(4, 0x40E0D0, 1);
                // draw the line
                _this.melonTriangle.moveTo(430, 445);//straight line//x1,y1
                _this.melonTriangle.lineTo(430, 180);//bottom line//x2,y2
                _this.melonTriangle.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));//slop line//x3,y3
                _this.melonTriangle.lineTo(430, 444);//straight line//x4,y4
                _this.melonTriangle.endFill();

                _this.watermelonGroup_4.addChild(_this.melonTriangle);

            }

        });

        _this.time.events.add(4800, () => {
            _this.watermelon_1.alpha = 0;
            _this.panel_2.alpha = 0;
            _this.orange_1.alpha = 0;
            _this.orange_2.alpha = 0;
            _this.orange_3.alpha = 0;
            _this.orange_4.alpha = 0;
            _this.strawberry_1.alpha = 0;
            _this.strawberry_2.alpha = 0;
            _this.strawberry_3.alpha = 0;
            _this.strawberry_4.alpha = 0;
            _this.strawberry_5.alpha = 0;
            _this.strawberry_6.alpha = 0;
            _this.strawberry_7.alpha = 0;
            _this.strawberry_8.alpha = 0;
            _this.strawberry_9.alpha = 0;
            _this.strawberry_10.alpha = 0;
        });
        _this.time.events.add(7000, () => {
            if (_this.count1 < 4) {
                _this.Question_flag = 1;
                if (_this.count1 == 0) {
                    _this.pauseVoice();
                    _this.Ask_Question2.play();
                }
            }
            else {
                if (_this.ywOrder[0] == 1 || _this.ywOrder[0] == 2) {
                    _this.Question_flag = 3;
                    if (_this.count1 == 4) {
                        _this.pauseVoice();
                        // _this.Ask_Question4.play();
                    }
                }
                else {
                    _this.Question_flag = 5;
                    if (_this.count1 == 4) {
                        _this.pauseVoice();
                        // _this.Ask_Question6.play();
                    }
                }

            }

            _this.exterior_x = _this.add.image(640 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB) - 20, 'close_btn');
            _this.exterior_x.scale.setTo(0.45);
            _this.watermelonGroup_4.addChild(_this.exterior_x);
            if (_this.count1 > 3) {
                _this.exterior_x.inputEnabled = true;
                _this.exterior_x.input.useHandCursor = true;
                _this.exterior_x.events.onInputDown.add(_this.exterior_x_MelonAngle);
            }

            if (_this.count1 < 4) {
                _this.interiar_y = _this.add.sprite(475, 445 - ((185 * _this.sinC) / _this.sinB) / 3.4, 'Y_and_Z');
                _this.interiar_y.frame = 1;
                _this.interiar_y.scale.setTo(0.55);
                _this.interiar_y.inputEnabled = true;
                _this.interiar_y.input.useHandCursor = true;
                _this.interiar_y.events.onInputDown.add(_this.interiar_y_MelonAngle);
                _this.watermelonGroup_4.addChild(_this.interiar_y);
            }
            else {

                if (_this.ywOrder[0] == 1) {
                    _this.interiar_y = _this.add.sprite(475, 445 - ((185 * _this.sinC) / _this.sinB) / 3.4, 'Y_and_Z');
                    _this.interiar_y.frame = 1;
                    _this.interiar_y.scale.setTo(0.6);
                    _this.watermelonGroup_4.addChild(_this.interiar_y);
                }
                if (_this.ywOrder[0] == 2) {
                    _this.interiar_w = _this.add.sprite(690 - ((185 * _this.sinC) / _this.sinB), 480 - ((185 * _this.sinC) / _this.sinB), 'Y_and_Z');
                    _this.interiar_w.frame = 1;
                    _this.interiar_w.scale.setTo(0.6);
                    _this.watermelonGroup_4.addChild(_this.interiar_w);
                }
                if (_this.ywOrder[0] == 3) {
                    _this.interiar_y = _this.add.sprite(475, 445 - ((185 * _this.sinC) / _this.sinB) / 3.2, 'Y_and_Z');
                    _this.interiar_y.frame = 1;
                    _this.interiar_y.scale.setTo(0.55);
                    _this.interiar_y.inputEnabled = true;
                    _this.interiar_y.input.useHandCursor = true;
                    _this.watermelonGroup_4.addChild(_this.interiar_y);
                    _this.interiar_y.events.onInputDown.add(_this.interiar_y_MelonAngle);
                }
            }

            if (_this.count1 < 4 || _this.ywOrder[0] == 1 || _this.ywOrder[0] == 2) {
                _this.interiar_z = _this.add.sprite(630, 405, 'Y_and_Z');
                _this.interiar_z.scale.setTo(0.6);
                _this.interiar_z.inputEnabled = true;
                _this.interiar_z.input.useHandCursor = true;
                _this.interiar_z.events.onInputDown.add(_this.interiar_z_MelonAngle);
                _this.watermelonGroup_4.addChild(_this.interiar_z);
            }
            else {
                _this.interiar_z = _this.add.sprite(620 - ((185 * _this.sinV) / _this.sinW), 410 - ((185 * _this.sinV) / _this.sinW), 'Y_and_Z');
                _this.interiar_z.scale.setTo(0.6);
                _this.watermelonGroup_4.addChild(_this.interiar_z);
            }

            _this.circle.alpha = 1;
            _this.mask_1.alpha = 1;

            _this.circleMask_2.alpha = 1;
            _this.mask_2.alpha = 1;

            // _this.watermelonGroup_4.scale.setTo(1.3);
            // _this.watermelonGroup_4.x = -150;
            // _this.watermelonGroup_4.y = -150;

            //this is done for the second screen triangle scale increasing.
            var initialX = _this.watermelonGroup_4.x - 150;
            var initialY = _this.watermelonGroup_4.y - 100;

            var tween = _this.add.tween(_this.watermelonGroup_4.scale).to({ x: 1.3, y: 1.3 }, 1000, Phaser.Easing.Linear.None, true);// tween for scale increasing
            var positionTween = _this.add.tween(_this.watermelonGroup_4).to({ x: initialX, y: initialY }, 1000, Phaser.Easing.Linear.None);// tween for x and y position fixing

            tween.start();
            positionTween.start();

            if (_this.count1 > 3) {
                _this.circleMask_6.alpha = 1;
                _this.mask_6.alpha = 1;
            }
        });
    },

    cheeseMask: function () {
        _this.panel_1 = _this.add.image(200, 100, 'panle_1');//white screen
        _this.panel_1.scale.setTo(0.75, 0.65);

        _this.panel_2 = _this.add.image(230, 110, 'panle_3');//tray
        _this.panel_2.scale.setTo(0.72, 0.65);

        _this.cherry = _this.add.image(700, 340, 'cherry');
        _this.cherry.scale.setTo(0.72, 0.65);

        _this.almond = _this.add.image(700, 220, 'objct_3');
        _this.almond.scale.setTo(0.72, 0.65);

        _this.almond_2 = _this.add.image(578, 220, 'objct_3');
        _this.almond_2.scale.setTo(0.72, 0.65);

        _this.stick = _this.add.image(580, 130, 'objct_1');
        _this.stick.scale.setTo(0.72, 0.65);

        _this.sausage = _this.add.image(420, 130, 'objct_2');
        _this.sausage.scale.setTo(0.72, 0.65);
        _this.sausage_2 = _this.add.image(420, 180, 'objct_2');
        _this.sausage_2.scale.setTo(0.72, 0.65);
        _this.sausage_3 = _this.add.image(420, 230, 'objct_2');
        _this.sausage_3.scale.setTo(0.72, 0.65);

        _this.cheese_1 = _this.add.image(430, 320, 'cheese');
        _this.cheese_1.scale.setTo(0.7);

        _this.cheese_2 = _this.add.image(430, 320, 'cheese');
        _this.cheese_2.scale.setTo(0.7);
        _this.cheese_2.alpha = 0;

        //for finding the side length of the triangle. a/sinA = b/sinB = c/sinC we can use.
        //here we got the angle now. and one side /_\. length of the left side is 200.
        //so a/sin(_this.cheeser_Angle_z) = 200/sin(_this.cheese_Angle_b) = c/sin(_this.cheese_Angle_y)

        // Convert _this.cheese_Angle_z degrees to radians
        _this.cheese_Angle_z_sin = _this.cheese_Angle_z * Math.PI / 180;
        // Find the sine of the angle
        _this.sineOfAngle_z = Math.sin(_this.cheese_Angle_z_sin);
        _this.sinA = _this.sineOfAngle_z.toFixed(1);
        console.log(_this.sinA, "a angle.."); // Output: 0.5

        // Convert _this.cheese_Angle_b degrees to radians
        _this.cheese_Angle_b_sin = _this.cheese_Angle_b * Math.PI / 180;
        // Find the sine of the angle
        _this.sineOfAngle_b = Math.sin(_this.cheese_Angle_b_sin);
        _this.sinB = _this.sineOfAngle_b.toFixed(1);
        console.log(_this.sinB, "b angle.."); // Output: 0.5

        // Convert _this.cheese_Angle_y degrees to radians
        _this.cheese_Angle_y_sin = _this.cheese_Angle_y * Math.PI / 180;
        // Find the sine of the angle
        _this.sineOfAngle_y = Math.sin(_this.cheese_Angle_y_sin);
        _this.sinC = _this.sineOfAngle_y.toFixed(1);
        console.log(_this.sinC, "c angle.."); // Output: 0.5

        //for masking the sandwitch pease we draw a traingle and that is used for masking the object.
        if (_this.count1 < 4) {
            // Create a new graphics object
            var triangle = _this.add.graphics(0, 0);

            // Draw the triangle on the graphics object
            triangle.beginFill(0xffffff); // Set the color of the triangle
            triangle.moveTo(430, 445); // Set the starting point of the triangle
            triangle.lineTo(490, 320); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)
            triangle.lineTo(430 + ((139 * _this.sinC) / _this.sinB), 445); // Draw the second line of the triangle
            triangle.lineTo(685, 445); // Draw the third line of the triangle to close the shape
            triangle.endFill();
            triangle.alpha = 0;

            _this.cheese_1.mask = triangle;
        }
        else {
            var triangle = _this.add.graphics(0, 0);
            triangle.beginFill(0xffffff); // Set the color of the triangle
            triangle.moveTo(430 + ((139 * _this.sinC) / _this.sinB), 445); // Set the starting point of the triangle
            triangle.lineTo(490, 320); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)
            triangle.lineTo(620, 320); // Draw the second line of the triangle
            triangle.lineTo(685, 445); // Draw the third line of the triangle to close the shape
            triangle.endFill();
            triangle.alpha = 0;

            _this.cheese_1.mask = triangle;
        }

        if (_this.count1 > 3) {
            //for yello filling triangle. second part
            // create a new graphics object. right side height
            _this.cheeseTriangle_2 = _this.add.graphics(0, 0);
            // set the line style
            _this.cheeseTriangle_2.lineStyle(4, 0x40E0D0, 1);
            _this.cheeseTriangle_2.beginFill(0xFFFF00);//yellow color
            // draw the line
            _this.cheeseTriangle_2.moveTo(430, 445); // Set the starting point of the triangle
            _this.cheeseTriangle_2.lineTo(490, 320); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)
            _this.cheeseTriangle_2.lineTo(430 + ((139 * _this.sinC) / _this.sinB), 445); // Draw the second line of the triangle
            _this.cheeseTriangle_2.lineTo(430, 445);

            _this.cheeseTriangle_2.endFill();
            _this.cheeseTriangle_2.alpha = 0;
        }

        _this.time.events.add(3000, () => {
            if (_this.count1 > 3) _this.CheeseGroup_4.addChild(_this.cheeseTriangle_2);
            if (_this.ywOrder[0] == 1 || _this.count1 < 4) {
                //for creating pink mask
                // Create a new circle sprite
                _this.circle = _this.add.graphics(490, 320);
                _this.circle.beginFill(0xE11584);//0xE11584
                _this.circle.drawCircle(0, 0, 70);
                _this.circle.endFill();
                // Create a new mask graphics object
                _this.mask_1 = _this.add.graphics(490, 320);
                // Draw a sector shape on the mask graphics object
                _this.mask_1.beginFill(0xffffff);
                _this.mask_1.moveTo(0, 0);
                _this.mask_1.lineTo(50, 0);
                _this.mask_1.arc(0, 0, 70, _this.math.degToRad(119), _this.math.degToRad(360 - _this.cheese_Angle_y + 119), true);
                _this.mask_1.lineTo(0, 0);
                _this.mask_1.endFill();
                // Apply the mask to the circle sprite
                _this.circle.mask = _this.mask_1;

                _this.circle.alpha = 0;
                _this.mask_1.alpha = 0;

                _this.CheeseGroup_4.addChild(_this.circle);
                _this.CheeseGroup_4.addChild(_this.mask_1);
            }
            else {
                //for creating pink mask
                // Create a new circle sprite
                _this.circle = _this.add.graphics(430 + ((139 * _this.sinC) / _this.sinB), 445);
                _this.circle.beginFill(0xE11584);//0xE11584
                _this.circle.drawCircle(0, 0, 79);
                _this.circle.endFill();
                // Create a new mask graphics object
                _this.mask_1 = _this.add.graphics(430 + ((139 * _this.sinC) / _this.sinB), 445);
                // Draw a sector shape on the mask graphics object
                _this.mask_1.beginFill(0xffffff);
                _this.mask_1.moveTo(0, 0);
                _this.mask_1.lineTo(50, 0);
                _this.mask_1.arc(0, 0, 20, _this.math.degToRad(180 + _this.cheese_Angle_b), _this.math.degToRad(180), true);
                _this.mask_1.lineTo(0, 0);
                _this.mask_1.endFill();
                // Apply the mask to the circle sprite
                _this.circle.mask = _this.mask_1;

                _this.circle.alpha = 0;
                _this.mask_1.alpha = 0;

                _this.CheeseGroup_4.addChild(_this.circle);
                _this.CheeseGroup_4.addChild(_this.mask_1);
            }

            //for creating orange mask
            // Create a new circle sprite
            _this.circleMask_2 = _this.add.graphics(430, 445);
            _this.circleMask_2.beginFill(0xff8c00);
            _this.circleMask_2.drawCircle(0, 0, 65);
            _this.circleMask_2.endFill();
            // Create a new mask graphics object
            _this.mask_2 = _this.add.graphics(430, 445);
            // Draw a sector shape on the mask graphics object
            _this.mask_2.beginFill(0xffffff);
            _this.mask_2.moveTo(0, 0);
            _this.mask_2.lineTo(50, 0);
            _this.mask_2.arc(0, 0, 60, _this.math.degToRad(0), _this.math.degToRad(270 - _this.cheese_Angle_z + 90), true);
            _this.mask_2.lineTo(0, 0);
            _this.mask_2.endFill();
            // Apply the mask to the circle sprite
            _this.circleMask_2.mask = _this.mask_2;

            _this.circleMask_2.alpha = 0;
            _this.mask_2.alpha = 0;

            _this.CheeseGroup_4.addChild(_this.circleMask_2);
            _this.CheeseGroup_4.addChild(_this.mask_2);

            if (_this.count1 > 3) {
                //for creating orange mask
                // Create a new circle sprite
                _this.circleMask_6 = _this.add.graphics(430 + ((139 * _this.sinC) / _this.sinB), 445);//376 + ((200 * _this.sinC) / _this.sinB), 445
                _this.circleMask_6.beginFill(0x40E0D0);
                _this.circleMask_6.drawCircle(0, 0, 79);
                _this.circleMask_6.endFill();

                // Create a new mask graphics object
                _this.mask_6 = _this.add.graphics(430 + ((139 * _this.sinC) / _this.sinB), 445);

                // Draw a sector shape on the mask graphics object
                _this.mask_6.beginFill(0xffffff);
                _this.mask_6.moveTo(0, 0);
                _this.mask_6.lineTo(50, 0);
                _this.mask_6.arc(0, 0, 20, _this.math.degToRad(0), _this.math.degToRad(360 - _this.cheese_Angle_x), true);
                _this.mask_6.lineTo(0, 0);
                _this.mask_6.endFill();

                // Apply the mask to the circle sprite
                _this.circleMask_6.mask = _this.mask_6;

                _this.circleMask_6.alpha = 0;
                _this.mask_6.alpha = 0;

                _this.CheeseGroup_4.addChild(_this.circleMask_6);
                _this.CheeseGroup_4.addChild(_this.mask_6);

            }

            //for blue line
            // create a new graphics object
            _this.graphics_height = _this.add.graphics(0, 0);
            // set the line style
            _this.graphics_height.lineStyle(4, 0x40E0D0, 1);
            // draw the line
            _this.graphics_height.moveTo(430, 445);//straight line
            _this.graphics_height.lineTo(490, 320);//straight line
            _this.graphics_height.endFill();

            // create a new graphics object
            _this.graphics_bottom = _this.add.graphics(0, 0);
            // set the line style
            _this.graphics_bottom.lineStyle(4, 0x40E0D0, 1);
            // draw the line
            _this.graphics_bottom.moveTo(490, 320);//bottom line
            _this.graphics_bottom.lineTo(430 + ((139 * _this.sinC) / _this.sinB), 445);//bottom line
            _this.graphics_bottom.endFill();

            // create a new graphics object
            _this.graphics_slop = _this.add.graphics(0, 0);

            // set the line style
            _this.graphics_slop.lineStyle(4, 0x40E0D0, 1);

            // draw the line
            _this.graphics_slop.moveTo(430, 445);//slop line
            _this.graphics_slop.lineTo(430 + ((139 * _this.sinC) / _this.sinB) + 50, 445);//slop line
            _this.graphics_slop.endFill();

            _this.CheeseGroup_4.addChild(_this.graphics_height);
            _this.CheeseGroup_4.addChild(_this.graphics_bottom);
            _this.CheeseGroup_4.addChild(_this.graphics_slop);

            if (_this.count1 > 3) {
                //for blue line
                // create a new graphics object. right side height
                _this.cheeseTriangle = _this.add.graphics(0, 0);
                // set the line style
                _this.cheeseTriangle.lineStyle(4, 0x40E0D0, 1);
                // draw the line
                _this.cheeseTriangle.moveTo(430 + ((139 * _this.sinC) / _this.sinB), 445);//straight line//x1,y1
                _this.cheeseTriangle.lineTo(685, 445);//bottom line//x2,y2
                _this.cheeseTriangle.lineTo(620, 320);//slop line//x3,y3
                _this.cheeseTriangle.lineTo(492, 320);//straight line//x4,y4
                _this.cheeseTriangle.lineTo(430 + ((139 * _this.sinC) / _this.sinB), 445);//straight line////x5,y5

                _this.cheeseTriangle.endFill();
                _this.CheeseGroup_4.addChild(_this.cheeseTriangle);
            }
        });

        _this.time.events.add(4800, () => {
            _this.cheese_1.alpha = 0;
            _this.panel_2.alpha = 0;
            _this.cherry.alpha = 0;
            _this.almond.alpha = 0;
            _this.almond_2.alpha = 0;
            _this.stick.alpha = 0;
            _this.sausage.alpha = 0;
            _this.sausage_2.alpha = 0;
            _this.sausage_3.alpha = 0;
        });

        _this.time.events.add(7000, () => {
            if (_this.count1 < 4) {
                _this.Question_flag = 1;
                if (_this.count1 == 0) {
                    _this.pauseVoice();
                    _this.Ask_Question2.play();
                }
            }
            else {
                _this.Question_flag = 3;
                if (_this.count1 == 4) {
                    _this.pauseVoice();
                    // _this.Ask_Question4.play();
                }
            }

            _this.exterior_x = _this.add.image(430 + ((139 * _this.sinC) / _this.sinB) + 10, 405, 'close_btn');
            _this.exterior_x.scale.setTo(0.37);
            _this.CheeseGroup_4.addChild(_this.exterior_x);
            if (_this.count1 > 3) {
                _this.exterior_x.inputEnabled = true;
                _this.exterior_x.input.useHandCursor = true;
                _this.exterior_x.events.onInputDown.add(_this.exterior_x_CheeseAngle);
            }

            if (_this.count1 < 4) {
                _this.interiar_y = _this.add.sprite(475, 360, 'Y_and_Z');
                _this.interiar_y.frame = 1;
                _this.interiar_y.scale.setTo(0.45);
                _this.interiar_y.inputEnabled = true;
                _this.interiar_y.input.useHandCursor = true;
                _this.interiar_y.events.onInputDown.add(_this.interiar_y_CheeseAngle);
                _this.CheeseGroup_4.addChild(_this.interiar_y);
            }
            else {
                if (_this.ywOrder[0] == 1) {
                    _this.interiar_y = _this.add.sprite(475, 360, 'Y_and_Z');
                    _this.interiar_y.frame = 1;
                    _this.interiar_y.scale.setTo(0.5);
                    _this.CheeseGroup_4.addChild(_this.interiar_y);
                }
                if (_this.ywOrder[0] == 2) {
                    _this.interiar_w = _this.add.sprite(430 + ((139 * _this.sinC) / _this.sinB) - 50, 420, 'Y_and_Z');//
                    _this.interiar_w.frame = 1;
                    _this.interiar_w.scale.setTo(0.4);
                    _this.CheeseGroup_4.addChild(_this.interiar_w);
                }
            }

            _this.interiar_z = _this.add.sprite(460, 405, 'Y_and_Z');
            _this.interiar_z.scale.setTo(0.5);
            _this.interiar_z.inputEnabled = true;
            _this.interiar_z.input.useHandCursor = true;
            _this.interiar_z.events.onInputDown.add(_this.interiar_z_CheeseAngle);
            _this.CheeseGroup_4.addChild(_this.interiar_z);

            _this.circle.alpha = 1;
            _this.mask_1.alpha = 1;
            _this.circleMask_2.alpha = 1;
            _this.mask_2.alpha = 1;

            //this is done for the second screen triangle scale increasing.
            var initialX = _this.CheeseGroup_4.x - 300;
            var initialY = _this.CheeseGroup_4.y - 280;

            var tween = _this.add.tween(_this.CheeseGroup_4.scale).to({ x: 1.5, y: 1.5 }, 1000, Phaser.Easing.Linear.None, true);// tween for scale increasing
            var positionTween = _this.add.tween(_this.CheeseGroup_4).to({ x: initialX, y: initialY }, 1000, Phaser.Easing.Linear.None);// tween for x and y position fixing

            tween.start();
            positionTween.start();

            if (_this.count1 > 3) {
                _this.circleMask_6.alpha = 1;
                _this.mask_6.alpha = 1;
            }
        });

    },

    wafferMask: function () {
        _this.panel_1 = _this.add.image(200, 100, 'panle_1');//white screen
        _this.panel_1.scale.setTo(0.75, 0.65);

        _this.panel_2 = _this.add.image(250, 110, 'panle_2');//tray
        _this.panel_2.scale.setTo(0.7, 0.65);

        _this.buiscut = _this.add.image(320, 150, 'sweet_3');
        _this.buiscut.scale.setTo(0.7);

        _this.buiscut_2 = _this.add.image(320, 290, 'sweet_3');
        _this.buiscut_2.scale.setTo(0.7);

        _this.sprinkle = _this.add.image(450, 140, 'sweet_2');
        _this.sprinkle.scale.setTo(0.6);

        _this.donut = _this.add.image(630, 140, 'sweet_1');
        _this.donut.scale.setTo(0.7);

        _this.waffer_1 = _this.add.image(380, 280, 'waffer');
        _this.waffer_1.scale.setTo(0.7);

        _this.waffer_2 = _this.add.image(380, 280, 'waffer');
        _this.waffer_2.scale.setTo(0.7);
        _this.waffer_2.alpha = 0;

        //for finding the side length of the triangle. a/sinA = b/sinB = c/sinC we can use.
        //here we got the angle now. and one side /_\. length of the left side is 200.
        //so a/sin(_this.waffer_Angle_z) = 200/sin(_this.waffer_Angle_b) = c/sin(_this.waffer_Angle_y)

        // Convert _this.waffer_Angle_z degrees to radians
        _this.waffer_Angle_z_sin = _this.waffer_Angle_z * Math.PI / 180;
        // Find the sine of the angle
        _this.sineOfAngle_z = Math.sin(_this.waffer_Angle_z_sin);
        _this.sinA = _this.sineOfAngle_z.toFixed(1);
        console.log(_this.sinA, "a angle.."); // Output: 0.5

        // Convert _this.waffer_Angle_b degrees to radians
        _this.waffer_Angle_b_sin = _this.waffer_Angle_b * Math.PI / 180;
        // Find the sine of the angle
        _this.sineOfAngle_b = Math.sin(_this.waffer_Angle_b_sin);
        _this.sinB = _this.sineOfAngle_b.toFixed(1);
        console.log(_this.sinB, "b angle.."); // Output: 0.5

        // Convert _this.waffer_Angle_y degrees to radians
        _this.waffer_Angle_y_sin = _this.waffer_Angle_y * Math.PI / 180;
        // Find the sine of the angle
        _this.sineOfAngle_y = Math.sin(_this.waffer_Angle_y_sin);
        _this.sinC = _this.sineOfAngle_y.toFixed(1);
        console.log(_this.sinC, "c angle.."); // Output: 0.5

        //for masking the sandwitch pease we draw a traingle and that is used for masking the object.
        if (_this.count1 < 4) {
            // Create a new graphics object
            var triangle = _this.add.graphics(0, 0);

            // Draw the triangle on the graphics object
            triangle.beginFill(0xffffff); // Set the color of the triangle
            triangle.moveTo(376, 445); // Set the starting point of the triangle
            triangle.lineTo(500, 288); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)
            triangle.lineTo(376 + ((200 * _this.sinC) / _this.sinB), 445); // Draw the second line of the triangle//(_this.waffer_1.width - _this.sideLength_c) 
            triangle.lineTo(740, 445); // Draw the third line of the triangle to close the shape
            triangle.endFill();
            triangle.alpha = 0;

            _this.waffer_1.mask = triangle;
        }
        else {
            // Create a new graphics object
            var triangle = _this.add.graphics(0, 0);

            // Draw the triangle on the graphics object
            triangle.beginFill(0xffffff); // Set the color of the triangle
            triangle.moveTo(376 + ((200 * _this.sinC) / _this.sinB), 445); // Set the starting point of the triangle
            triangle.lineTo(500, 288); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)
            triangle.lineTo(690, 288); // Draw the second line of the triangle//(_this.waffer_1.width - _this.sideLength_c) 
            triangle.lineTo(763, 445); // Draw the third line of the triangle to close the shape
            triangle.lineTo(376 + ((200 * _this.sinC) / _this.sinB), 445);//straight line////x5,y5
            triangle.endFill();
            triangle.alpha = 0;

            _this.waffer_1.mask = triangle;
        }
        if (_this.count1 > 3) {
            //for yello filling triangle. second part
            // create a new graphics object. right side height
            _this.wfTriangle_2 = _this.add.graphics(0, 0);
            // set the line style
            _this.wfTriangle_2.lineStyle(4, 0x40E0D0, 1);//thickness, color, alpha
            _this.wfTriangle_2.beginFill(0xFFFF00);//yellow color
            // draw the line
            _this.wfTriangle_2.moveTo(376, 445);//straight line
            _this.wfTriangle_2.lineTo(500, 288);//straight line
            _this.wfTriangle_2.lineTo(376 + ((200 * _this.sinC) / _this.sinB), 445);//slop line
            _this.wfTriangle_2.lineTo(376, 445);

            _this.wfTriangle_2.endFill();
            _this.wfTriangle_2.alpha = 0;
        }

        _this.time.events.add(3000, () => {
            if (_this.count1 > 3) _this.wafferGroup_4.addChild(_this.wfTriangle_2);
            if (_this.ywOrder[0] == 1 || _this.count1 < 4) {
                //for creating pink mask
                // Create a new circle sprite
                _this.circle = _this.add.graphics(500, 290);
                _this.circle.beginFill(0xE11584);//0xE11584
                _this.circle.drawCircle(0, 0, 85);
                _this.circle.endFill();
                // Create a new mask graphics object
                _this.mask_1 = _this.add.graphics(500, 290);
                // Draw a sector shape on the mask graphics object
                _this.mask_1.beginFill(0xffffff);
                _this.mask_1.moveTo(0, 0);
                _this.mask_1.lineTo(50, 0);
                _this.mask_1.arc(0, 0, 60, _this.math.degToRad(132), _this.math.degToRad(360 - _this.waffer_Angle_y + 130), true);//(128), _this.math.degToRad(360 - _this.waffer_Angle_y + 127), true);
                _this.mask_1.lineTo(0, 0);
                _this.mask_1.endFill();
                // Apply the mask to the circle sprite
                _this.circle.mask = _this.mask_1;

                _this.circle.alpha = 0;
                _this.mask_1.alpha = 0;

                _this.wafferGroup_4.addChild(_this.circle);
                _this.wafferGroup_4.addChild(_this.mask_1);
            }
            else {
                //for creating pink mask
                // Create a new circle sprite
                _this.circle = _this.add.graphics(376 + ((200 * _this.sinC) / _this.sinB), 445);
                _this.circle.beginFill(0xE11584);//0xE11584
                _this.circle.drawCircle(0, 0, 79);
                _this.circle.endFill();
                // Create a new mask graphics object
                _this.mask_1 = _this.add.graphics(376 + ((200 * _this.sinC) / _this.sinB), 445);
                // Draw a sector shape on the mask graphics object
                _this.mask_1.beginFill(0xffffff);
                _this.mask_1.moveTo(0, 0);
                _this.mask_1.lineTo(50, 0);
                _this.mask_1.arc(0, 0, 20, _this.math.degToRad(180 + _this.waffer_Angle_b), _this.math.degToRad(180), true);
                _this.mask_1.lineTo(0, 0);
                _this.mask_1.endFill();
                // Apply the mask to the circle sprite
                _this.circle.mask = _this.mask_1;

                _this.circle.alpha = 0;
                _this.mask_1.alpha = 0;

                _this.wafferGroup_4.addChild(_this.circle);
                _this.wafferGroup_4.addChild(_this.mask_1);
            }
            //for creating orange mask
            // Create a new circle sprite
            _this.circleMask_2 = _this.add.graphics(380, 445);
            _this.circleMask_2.beginFill(0xff8c00);
            _this.circleMask_2.drawCircle(0, 0, 79);
            _this.circleMask_2.endFill();
            // Create a new mask graphics object
            _this.mask_2 = _this.add.graphics(380, 445);
            // Draw a sector shape on the mask graphics object
            _this.mask_2.beginFill(0xffffff);
            _this.mask_2.moveTo(0, 0);
            _this.mask_2.lineTo(50, 0);
            _this.mask_2.arc(0, 0, 60, _this.math.degToRad(0), _this.math.degToRad(270 - _this.waffer_Angle_z + 85), true);
            _this.mask_2.lineTo(0, 0);
            _this.mask_2.endFill();
            // Apply the mask to the circle sprite
            _this.circleMask_2.mask = _this.mask_2;

            _this.circleMask_2.alpha = 0;
            _this.mask_2.alpha = 0;

            _this.wafferGroup_4.addChild(_this.circleMask_2);
            _this.wafferGroup_4.addChild(_this.mask_2);

            if (_this.count1 > 3) {
                //for creating blue mask
                // Create a new circle sprite
                _this.circleMask_6 = _this.add.graphics(376 + ((200 * _this.sinC) / _this.sinB), 445);//376 + ((200 * _this.sinC) / _this.sinB), 445
                _this.circleMask_6.beginFill(0x40E0D0);
                _this.circleMask_6.drawCircle(0, 0, 79);
                _this.circleMask_6.endFill();

                // Create a new mask graphics object
                _this.mask_6 = _this.add.graphics(376 + ((200 * _this.sinC) / _this.sinB), 445);

                // Draw a sector shape on the mask graphics object
                _this.mask_6.beginFill(0xffffff);
                _this.mask_6.moveTo(0, 0);
                _this.mask_6.lineTo(50, 0);
                _this.mask_6.arc(0, 0, 20, _this.math.degToRad(0), _this.math.degToRad(360 - _this.waffer_Angle_x), true);
                _this.mask_6.lineTo(0, 0);
                _this.mask_6.endFill();

                // Apply the mask to the circle sprite
                _this.circleMask_6.mask = _this.mask_6;
                _this.circleMask_6.alpha = 0;
                _this.mask_6.alpha = 0;

                _this.wafferGroup_4.addChild(_this.circleMask_6);
                _this.wafferGroup_4.addChild(_this.mask_6);

            }

            //for blue line
            // create a new graphics object
            _this.graphics_height = _this.add.graphics(0, 0);
            // set the line style
            _this.graphics_height.lineStyle(4, 0x40E0D0, 1);//6
            // draw the line
            _this.graphics_height.moveTo(376, 445);//straight line
            _this.graphics_height.lineTo(500, 288);//straight line
            _this.graphics_height.endFill();

            // create a new graphics object
            _this.graphics_bottom = _this.add.graphics(0, 0);
            // set the line style
            _this.graphics_bottom.lineStyle(4, 0x40E0D0, 1);
            // draw the line
            _this.graphics_bottom.moveTo(376, 445);//bottom line
            _this.graphics_bottom.lineTo(376 + ((200 * _this.sinC) / _this.sinB) + 80, 445);//bottom line
            _this.graphics_bottom.endFill();

            // create a new graphics object
            _this.graphics_slop = _this.add.graphics(0, 0);

            // set the line style
            _this.graphics_slop.lineStyle(4, 0x40E0D0, 1);

            // draw the line
            _this.graphics_slop.moveTo(500, 288);//slop line
            _this.graphics_slop.lineTo(376 + ((200 * _this.sinC) / _this.sinB), 445);//slop line
            _this.graphics_slop.endFill();

            _this.wafferGroup_4.addChild(_this.graphics_height);
            _this.wafferGroup_4.addChild(_this.graphics_bottom);
            _this.wafferGroup_4.addChild(_this.graphics_slop);

            if (_this.count1 > 3) {
                //for blue line
                // create a new graphics object. right side height
                _this.wfTriangle = _this.add.graphics(0, 0);
                // set the line style
                _this.wfTriangle.lineStyle(4, 0x40E0D0, 1);
                // draw the line
                _this.wfTriangle.moveTo(376 + ((200 * _this.sinC) / _this.sinB), 445);//straight line//x1,y1
                _this.wfTriangle.lineTo(763, 445);//bottom line//x2,y2
                _this.wfTriangle.lineTo(690, 288);//slop line//x3,y3
                _this.wfTriangle.lineTo(502, 288);//straight line//x4,y4
                _this.wfTriangle.lineTo(376 + ((200 * _this.sinC) / _this.sinB), 445);//straight line////x5,y5

                _this.wfTriangle.endFill();
                _this.wafferGroup_4.addChild(_this.wfTriangle);
            }
        });

        _this.time.events.add(4800, () => {
            _this.waffer_1.alpha = 0;
            _this.panel_2.alpha = 0;
            _this.buiscut.alpha = 0;
            _this.buiscut_2.alpha = 0;
            _this.sprinkle.alpha = 0;
            _this.donut.alpha = 0;
        });

        _this.time.events.add(7000, () => {
            if (_this.count1 < 4) {
                _this.Question_flag = 1;
                if (_this.count1 == 0) {
                    _this.pauseVoice();
                    _this.Ask_Question2.play();
                }
            }
            else {
                _this.Question_flag = 3;
                if (_this.count1 == 4) {
                    _this.pauseVoice();
                    // _this.Ask_Question4.play();
                }
            }

            _this.exterior_x = _this.add.image(376 + ((200 * _this.sinC) / _this.sinB) + 10, 405, 'close_btn');
            _this.exterior_x.scale.setTo(0.37);
            _this.wafferGroup_4.addChild(_this.exterior_x);
            if (_this.count1 > 3) {
                _this.exterior_x.inputEnabled = true;
                _this.exterior_x.input.useHandCursor = true;
                _this.exterior_x.events.onInputDown.add(_this.exterior_x_WafferAngle);
            }

            if (_this.count1 < 4) {
                _this.interiar_y = _this.add.sprite(475, 335, 'Y_and_Z');
                _this.interiar_y.frame = 1;
                _this.interiar_y.scale.setTo(0.5);
                _this.interiar_y.inputEnabled = true;
                _this.interiar_y.input.useHandCursor = true;
                _this.interiar_y.events.onInputDown.add(_this.interiar_y_WafferAngle);
                _this.wafferGroup_4.addChild(_this.interiar_y);
            }
            else {
                if (_this.ywOrder[0] == 1) {
                    _this.interiar_y = _this.add.sprite(475, 335, 'Y_and_Z');
                    _this.interiar_y.frame = 1;
                    _this.interiar_y.scale.setTo(0.5);
                    _this.wafferGroup_4.addChild(_this.interiar_y);
                }
                if (_this.ywOrder[0] == 2) {
                    _this.interiar_w = _this.add.sprite(376 + ((200 * _this.sinC) / _this.sinB) - 60, 400, 'Y_and_Z');
                    _this.interiar_w.frame = 1;
                    _this.interiar_w.scale.setTo(0.5);
                    _this.wafferGroup_4.addChild(_this.interiar_w);
                }
            }

            _this.interiar_z = _this.add.sprite(420, 405, 'Y_and_Z');
            _this.interiar_z.scale.setTo(0.5);
            _this.interiar_z.inputEnabled = true;
            _this.interiar_z.input.useHandCursor = true;
            _this.interiar_z.events.onInputDown.add(_this.interiar_z_WafferAngle);
            _this.wafferGroup_4.addChild(_this.interiar_z);

            // if (_this.ywOrder[0] == 1 || _this.count1 < 4) {
            _this.circle.alpha = 1;
            _this.mask_1.alpha = 1;
            //}
            _this.circleMask_2.alpha = 1;
            _this.mask_2.alpha = 1;

            //this is done for the second screen triangle scale increasing.
            var initialX = _this.wafferGroup_4.x - 300;
            var initialY = _this.wafferGroup_4.y - 250;

            var tween = _this.add.tween(_this.wafferGroup_4.scale).to({ x: 1.5, y: 1.5 }, 1000, Phaser.Easing.Linear.None, true);// tween for scale increasing
            var positionTween = _this.add.tween(_this.wafferGroup_4).to({ x: initialX, y: initialY }, 1000, Phaser.Easing.Linear.None);// tween for x and y position fixing

            tween.start();
            positionTween.start();

            if (_this.count1 > 3) {
                _this.circleMask_6.alpha = 1;
                _this.mask_6.alpha = 1;
            }

        });
    },

    sandwitchMask: function () {
        console.log("sandwitch");

        _this.panel_1 = _this.add.image(200, 100, 'panle_1');//white screen
        _this.panel_1.scale.setTo(0.75, 0.65);

        _this.panel_2 = _this.add.image(250, 110, 'panle_2');//tray
        _this.panel_2.scale.setTo(0.7, 0.65);

        _this.cashew = _this.add.image(330, 140, 'cashew');
        _this.cashew.scale.setTo(0.7);

        _this.apple = _this.add.image(330, 330, 'green_apple');
        _this.apple.scale.setTo(0.7);

        _this.sandwitch_1 = _this.add.image(470, 140, 'sandwich');
        _this.sandwitch_1.scale.setTo(0.56, 0.56);

        _this.sandwitch_2 = _this.add.image(470, 140, 'sandwich');
        _this.sandwitch_2.scale.setTo(0.56, 0.56);
        _this.sandwitch_2.alpha = 0;

        //adjusent side is 296.24 
        /*  Opp = Opposite side;   Adj = Adjacent side;  hyp = Hypoteneuse;  X = exterior angle.
        We know that Tan A = Opp / Adj
        Adj has fixed number of pixels in this case. Assume Adj = 100. Find the side Opp for different values of angle A.
        Set Angle A as random angle between 20 to 40 degrees. Find Opp side length. 
        Examples:
        When A = 20;  Tan 20 = Opp / Adj;   Opp = 100 * Tan 20  = 100 * 0.364
        When A = 30;  Tan 30 = Opp / Adj;   Opp = 100 * Tan 30  = 100 * 0.577
        When A = 40;  Tan 30 = Opp / Adj;   Opp = 100 * Tan 40  = 100 * 0.839 */

        // convert the angle to radians
        _this.angleInRadians = _this.math.degToRad(_this.angle_y);
        // find the tangent of the angle
        _this.tangent = Math.tan(_this.angleInRadians);
        _this.tanA = _this.tangent.toFixed(1);
        console.log(_this.tanA, "_this.tanA");

        // convert the angle to radians
        _this.angleInRadians_4 = _this.math.degToRad(_this.angle_w);
        // find the tangent of the angle
        _this.tangent_3 = Math.tan(_this.angleInRadians_4);
        _this.tanB = _this.tangent_3.toFixed(1);
        console.log(_this.tanB, "_this.tanB");

        if (_this.sandwitchOrder[0] == 1) {
            //for masking the sandwitch pease we draw a traingle and that is used for masking the object.
            if (_this.count1 < 4) {
                // Create a new graphics object
                var triangle = _this.add.graphics(0, 0);

                // Draw the triangle on the graphics object
                triangle.beginFill(0xffffff); // Set the color of the triangle
                triangle.moveTo(450, 450); // Set the starting point of the triangle
                triangle.lineTo(450, 100); // Draw the first line of the triangle
                triangle.lineTo(450 + (_this.sandwitch_1.height * _this.tanA) + 56, 450); // Draw the second line of the triangle
                triangle.lineTo(740, 450); // Draw the third line of the triangle to close the shape
                triangle.endFill();
                triangle.alpha = 0;

                _this.sandwitch_1.mask = triangle;
            }
            else {
                // Create a new graphics object
                var triangle = _this.add.graphics(0, 0);

                // Draw the triangle on the graphics object
                triangle.beginFill(0xffffff); // Set the color of the triangle
                triangle.moveTo(450, 100); // Set the starting point of the triangle
                triangle.lineTo(450 + (_this.sandwitch_1.height * _this.tanA) + 56, 450); // Draw the first line of the triangle
                triangle.lineTo(760, 450); // Draw the second line of the triangle
                triangle.lineTo(760, 100); // Draw the third line of the triangle to close the shape
                triangle.endFill();
                triangle.alpha = 0;

                _this.sandwitch_1.mask = triangle;
            }

            if (_this.count1 > 3) {
                //for finding y
                //for blue line// create a new graphics object                    
                _this.sandwichTriangle_2 = _this.add.graphics(0, 0);
                // set the line style
                _this.sandwichTriangle_2.lineStyle(4, 0x40E0D0, 1);
                _this.sandwichTriangle_2.beginFill(0xFFFF00);//yellow color
                // draw the line
                _this.sandwichTriangle_2.moveTo(485, 410);//straight line
                _this.sandwichTriangle_2.lineTo(485, 163);//straight line
                _this.sandwichTriangle_2.lineTo(485 + (_this.sandwitch_1.height * _this.tanA), 410);//slop line
                _this.sandwichTriangle_2.lineTo(485, 410);//bottom line
                _this.sandwichTriangle_2.endFill();
                _this.sandwichTriangle_2.alpha = 0;
            }

            _this.time.events.add(3000, () => {
                if (_this.count1 > 3) _this.sandwitchGroup_4.addChild(_this.sandwichTriangle_2);
                if (_this.ywOrder[0] == 1 || _this.count1 < 4) {
                    //for creating pink mask
                    // Create a new circle sprite
                    _this.circle = _this.add.graphics(486, 162);
                    _this.circle.beginFill(0xE11584);//0xE11584
                    _this.circle.drawCircle(0, 0, 85);
                    _this.circle.endFill();

                    // Create a new mask graphics object
                    _this.mask_1 = _this.add.graphics(486, 162);

                    // Draw a sector shape on the mask graphics object
                    _this.mask_1.beginFill(0xffffff);
                    _this.mask_1.moveTo(0, 0);
                    _this.mask_1.lineTo(50, 0);
                    _this.mask_1.arc(0, 0, 100, _this.math.degToRad(90), _this.math.degToRad(360 - _this.angle_y + 90), true);
                    _this.mask_1.lineTo(0, 0);
                    _this.mask_1.endFill();

                    // Apply the mask to the circle sprite
                    _this.circle.mask = _this.mask_1;

                    _this.circle.alpha = 0;
                    _this.mask_1.alpha = 0;

                    _this.sandwitchGroup_4.addChild(_this.circle);
                    _this.sandwitchGroup_4.addChild(_this.mask_1);
                }
                else {
                    //for creating pink mask
                    // Create a new circle sprite
                    _this.circle = _this.add.graphics(485 + (_this.sandwitch_1.height * _this.tanA), 410);
                    _this.circle.beginFill(0xE11584);//0xE11584
                    _this.circle.drawCircle(0, 0, 79);
                    _this.circle.endFill();

                    // Create a new mask graphics object
                    _this.mask_1 = _this.add.graphics(485 + (_this.sandwitch_1.height * _this.tanA), 410);

                    // Draw a sector shape on the mask graphics object
                    _this.mask_1.beginFill(0xffffff);
                    _this.mask_1.moveTo(0, 0);
                    _this.mask_1.lineTo(50, 0);
                    _this.mask_1.arc(0, 0, 20, _this.math.degToRad(180), _this.math.degToRad((360 - _this.angle_w) + 310), true);
                    _this.mask_1.lineTo(0, 0);
                    _this.mask_1.endFill();

                    // Apply the mask to the circle sprite
                    _this.circle.mask = _this.mask_1;

                    _this.circle.alpha = 0;
                    _this.mask_1.alpha = 0;

                    _this.sandwitchGroup_4.addChild(_this.circle);
                    _this.sandwitchGroup_4.addChild(_this.mask_1);
                }

                //for creating orange mask
                // Create a new circle sprite
                _this.circleMask_2 = _this.add.graphics(486, 409);
                _this.circleMask_2.beginFill(0xff8c00);
                _this.circleMask_2.drawCircle(0, 0, 79);
                _this.circleMask_2.endFill();

                // Create a new mask graphics object
                _this.mask_2 = _this.add.graphics(486, 409);

                // Draw a sector shape on the mask graphics object
                _this.mask_2.beginFill(0xffffff);
                _this.mask_2.moveTo(0, 0);
                _this.mask_2.lineTo(50, 0);
                _this.mask_2.arc(0, 0, 60, _this.math.degToRad(0), _this.math.degToRad(270), true);
                _this.mask_2.lineTo(0, 0);
                _this.mask_2.endFill();

                // Apply the mask to the circle sprite
                _this.circleMask_2.mask = _this.mask_2;

                _this.circleMask_2.alpha = 0;
                _this.mask_2.alpha = 0;

                _this.sandwitchGroup_4.addChild(_this.circleMask_2);
                _this.sandwitchGroup_4.addChild(_this.mask_2);

                if (_this.count1 > 3) {
                    //for creating blue mask
                    // Create a new circle sprite
                    _this.swCircleMask_1 = _this.add.graphics((485 + (_this.sandwitch_1.height * _this.tanA)), 410);//(_this.sandwitch_1.height * _this.tanA)
                    _this.swCircleMask_1.beginFill(0x40E0D0);
                    _this.swCircleMask_1.drawCircle(0, 0, 79);
                    _this.swCircleMask_1.endFill();

                    // Create a new mask graphics object
                    _this.sw_mask_1 = _this.add.graphics((485 + (_this.sandwitch_1.height * _this.tanA)), 410);//(_this.sandwitch_1.height * _this.tanA)

                    // Draw a sector shape on the mask graphics object
                    _this.swCircleMask_1.beginFill(0xffffff);
                    _this.sw_mask_1.moveTo(0, 0);
                    _this.sw_mask_1.lineTo(50, 0);
                    _this.sw_mask_1.arc(0, 0, 20, _this.math.degToRad(0), _this.math.degToRad(360 - _this.angle_x), true);
                    _this.sw_mask_1.lineTo(0, 0);
                    _this.sw_mask_1.endFill();

                    // Apply the mask to the circle sprite
                    _this.swCircleMask_1.mask = _this.sw_mask_1;

                    _this.swCircleMask_1.alpha = 0;
                    _this.sw_mask_1.alpha = 0;

                    _this.sandwitchGroup_4.addChild(_this.swCircleMask_1);
                    _this.sandwitchGroup_4.addChild(_this.sw_mask_1);
                }

                //for blue line
                // create a new graphics object
                _this.graphics_height = _this.add.graphics(0, 0);

                // set the line style
                _this.graphics_height.lineStyle(4, 0x40E0D0, 1);

                // draw the line
                _this.graphics_height.moveTo(485, 410);//straight line
                _this.graphics_height.lineTo(485, 160);//straight line
                _this.graphics_height.endFill();

                // create a new graphics object
                _this.graphics_bottom = _this.add.graphics(0, 0);

                // set the line style
                _this.graphics_bottom.lineStyle(4, 0x40E0D0, 1);

                // draw the line
                _this.graphics_bottom.moveTo(485, 410);//bottom line
                _this.graphics_bottom.lineTo(740, 410);//bottom line
                _this.graphics_bottom.endFill();

                // create a new graphics object
                _this.graphics_slop = _this.add.graphics(0, 0);

                // set the line style
                _this.graphics_slop.lineStyle(4, 0x40E0D0, 1);

                // draw the line
                _this.graphics_slop.moveTo(485, 162);//slop line
                _this.graphics_slop.lineTo(485 + (_this.sandwitch_1.height * _this.tanA), 410);//slop line
                _this.graphics_slop.endFill();

                _this.sandwitchGroup_4.addChild(_this.graphics_height);
                _this.sandwitchGroup_4.addChild(_this.graphics_bottom);
                _this.sandwitchGroup_4.addChild(_this.graphics_slop);

                if (_this.count1 > 3) {

                    //for blue line
                    // create a new graphics object. right side height
                    _this.swTriangle_1 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.swTriangle_1.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.swTriangle_1.moveTo(740, 410);//straight line//x1,y1
                    _this.swTriangle_1.lineTo((485 + (_this.sandwitch_1.height * _this.tanA)), 410);//bottom line//x2,y2
                    _this.swTriangle_1.lineTo(488, 160);//slop line//x3,y3
                    _this.swTriangle_1.lineTo(740, 160);//straight line//x4,y4
                    _this.swTriangle_1.lineTo(740, 410);//straight line////x5,y5

                    _this.swTriangle_1.endFill();
                    _this.sandwitchGroup_4.addChild(_this.swTriangle_1);
                }
            });

            _this.time.events.add(4800, () => {
                _this.sandwitch_1.alpha = 0;
                _this.panel_2.alpha = 0;
                _this.cashew.alpha = 0;
                _this.apple.alpha = 0;
            });
            _this.time.events.add(7000, () => {
                if (_this.count1 < 4) {
                    _this.Question_flag = 1;
                    if (_this.count1 == 0) {
                        //  _this.Question_flag = 1;
                        _this.pauseVoice();
                        _this.Ask_Question2.play();
                    }
                }
                else {
                    _this.Question_flag = 3;
                    if (_this.count1 == 4) {
                        //  _this.Question_flag = 1;
                        _this.pauseVoice();
                        // _this.Ask_Question4.play();
                    }
                }

                _this.exterior_x = _this.add.image(485 + (_this.sandwitch_1.height * _this.tanA) + 20, 350, 'close_btn');
                _this.exterior_x.scale.setTo(0.5);
                _this.sandwitchGroup_4.addChild(_this.exterior_x);
                if (_this.count1 > 3) {
                    _this.exterior_x.inputEnabled = true;
                    _this.exterior_x.input.useHandCursor = true;
                    _this.exterior_x.events.onInputDown.add(_this.exterior_x_SandwitchAngle);
                }

                if (_this.count1 < 4) {
                    _this.interiar_y = _this.add.sprite(489, 220, 'Y_and_Z');
                    _this.interiar_y.frame = 1;
                    _this.interiar_y.scale.setTo(0.7);
                    _this.interiar_y.inputEnabled = true;
                    _this.interiar_y.input.useHandCursor = true;
                    _this.interiar_y.events.onInputDown.add(_this.interiar_y_Angle);
                    _this.sandwitchGroup_4.addChild(_this.interiar_y);
                }
                else {
                    if (_this.ywOrder[0] == 1) {
                        _this.interiar_y = _this.add.sprite(489, 220, 'Y_and_Z');
                        _this.interiar_y.frame = 1;
                        _this.interiar_y.scale.setTo(0.7);
                        _this.sandwitchGroup_4.addChild(_this.interiar_y);
                    }
                    if (_this.ywOrder[0] == 2) {
                        _this.interiar_w = _this.add.sprite(485 + (_this.sandwitch_1.height * _this.tanA) - 50, 375, 'Y_and_Z');
                        _this.interiar_w.frame = 1;
                        _this.interiar_w.scale.setTo(0.7);
                        _this.sandwitchGroup_4.addChild(_this.interiar_w);
                    }
                }

                _this.interiar_z = _this.add.sprite(520, 350, 'Y_and_Z');
                _this.interiar_z.scale.setTo(0.7);
                _this.interiar_z.inputEnabled = true;
                _this.interiar_z.input.useHandCursor = true;
                _this.interiar_z.events.onInputDown.add(_this.interiar_z_Angle);
                _this.sandwitchGroup_4.addChild(_this.interiar_z);

                _this.circle.alpha = 1;
                _this.mask_1.alpha = 1;

                _this.circleMask_2.alpha = 1;
                _this.mask_2.alpha = 1;

                //this is done for the second screen triangle scale increasing.
                var initialX = _this.sandwitchGroup_4.x - 100;
                var initialY = _this.sandwitchGroup_4.y - 50;

                var tween = _this.add.tween(_this.sandwitchGroup_4.scale).to({ x: 1.2, y: 1.2 }, 1000, Phaser.Easing.Linear.None, true);// tween for scale increasing
                var positionTween = _this.add.tween(_this.sandwitchGroup_4).to({ x: initialX, y: initialY }, 1000, Phaser.Easing.Linear.None);// tween for x and y position fixing

                tween.start();
                positionTween.start();

                if (_this.count1 > 3) {
                    _this.swCircleMask_1.alpha = 1;
                    _this.sw_mask_1.alpha = 1;
                }
            });
        }
        if (_this.sandwitchOrder[0] == 2) {
            //for masking the sandwitch pease we draw a traingle and that is used for masking the object.
            if (_this.count1 < 4) {
                // Create a new graphics object
                var triangle = _this.add.graphics(0, 0);

                // Draw the triangle on the graphics object
                triangle.beginFill(0xffffff); // Set the color of the triangle
                triangle.moveTo(460, 420); // Set the starting point of the triangle
                triangle.lineTo(760, 420 - (_this.sandwitch_1.height * _this.tanA)); // Draw the slop line of the triangle
                triangle.lineTo(760, 420); // Draw the right side line of the triangle
                triangle.lineTo(460, 420); // Draw the bottom line of the triangle to close the shape
                triangle.endFill();
                triangle.alpha = 0;

                _this.sandwitch_1.mask = triangle;
            }
            else {
                // Create a new graphics object
                var triangle = _this.add.graphics(0, 0);

                // Draw the triangle on the graphics object
                triangle.moveTo(760, 420);//straight line//x1,y1
                triangle.lineTo(760, 140);//slop line//x3,y3
                triangle.lineTo(460, 140);//straight line//x4,y4
                triangle.lineTo(460, 420);//straight line////x5,y5
                triangle.lineTo(760, 420 - (_this.sandwitch_1.height * _this.tanA));//bottom line//x2,y2
                triangle.endFill();
                triangle.alpha = 0;

                _this.sandwitch_1.mask = triangle;
            }

            if (_this.count1 > 3) {
                //for finding y
                //for blue line// create a new graphics object                    
                _this.sandwichTriangle_2 = _this.add.graphics(0, 0);
                // set the line style
                _this.sandwichTriangle_2.lineStyle(4, 0x40E0D0, 1);
                _this.sandwichTriangle_2.beginFill(0xFFFF00);//yellow color
                // draw the line
                _this.sandwichTriangle_2.moveTo(737, 160);//straight line
                _this.sandwichTriangle_2.lineTo(737, 410);//straight line
                _this.sandwichTriangle_2.lineTo(485, 410);//slop line
                _this.sandwichTriangle_2.lineTo(737, 430 - (_this.sandwitch_1.height * _this.tanA));//bottom line
                _this.sandwichTriangle_2.endFill();
                _this.sandwichTriangle_2.alpha = 0;
            }

            _this.time.events.add(3000, () => {
                if (_this.count1 > 3) _this.sandwitchGroup_4.addChild(_this.sandwichTriangle_2);
                //for creating orange mask
                // Create a new circle sprite
                _this.circleMask_2 = _this.add.graphics(737, 409);
                _this.circleMask_2.beginFill(0xff8c00);
                _this.circleMask_2.drawCircle(0, 0, 79);
                _this.circleMask_2.endFill();

                // Create a new mask graphics object
                _this.mask_2 = _this.add.graphics(737, 409);

                // Draw a sector shape on the mask graphics object
                _this.mask_2.beginFill(0xffffff);
                _this.mask_2.moveTo(0, 0);
                _this.mask_2.lineTo(50, 0);
                _this.mask_2.arc(0, 0, 30, _this.math.degToRad(270), _this.math.degToRad(180), true);
                _this.mask_2.lineTo(0, 0);
                _this.mask_2.endFill();

                // Apply the mask to the circle sprite
                _this.circleMask_2.mask = _this.mask_2;

                _this.circleMask_2.alpha = 0;
                _this.mask_2.alpha = 0;

                _this.sandwitchGroup_4.addChild(_this.circleMask_2);
                _this.sandwitchGroup_4.addChild(_this.mask_2);

                if (_this.count1 > 3) {
                    //for creating blue mask
                    // Create a new circle sprite
                    _this.swCircleMask_1 = _this.add.graphics(737, 430 - (_this.sandwitch_1.height * _this.tanA));//(_this.sandwitch_1.height * _this.tanA)
                    _this.swCircleMask_1.beginFill(0x40E0D0);
                    _this.swCircleMask_1.drawCircle(0, 0, 79);
                    _this.swCircleMask_1.endFill();

                    // Create a new mask graphics object
                    _this.sw_mask_1 = _this.add.graphics(737, 430 - (_this.sandwitch_1.height * _this.tanA));//(_this.sandwitch_1.height * _this.tanA)

                    // Draw a sector shape on the mask graphics object
                    _this.sw_mask_1.beginFill(0xffffff);
                    _this.sw_mask_1.moveTo(0, 0);
                    _this.sw_mask_1.lineTo(50, 0);
                    _this.sw_mask_1.arc(0, 0, 20, _this.math.degToRad(270), _this.math.degToRad(270 - _this.angle_x), true);
                    _this.sw_mask_1.lineTo(0, 0);
                    _this.sw_mask_1.endFill();

                    // Apply the mask to the circle sprite
                    _this.swCircleMask_1.mask = _this.sw_mask_1;

                    _this.swCircleMask_1.alpha = 0;
                    _this.sw_mask_1.alpha = 0;

                    _this.sandwitchGroup_4.addChild(_this.swCircleMask_1);
                    _this.sandwitchGroup_4.addChild(_this.sw_mask_1);
                }

                if (_this.ywOrder[0] == 1 || _this.count1 < 4) {
                    //for creating pink mask
                    // Create a new circle sprite
                    _this.circle = _this.add.graphics(486, 410);
                    _this.circle.beginFill(0xE11584);//0xE11584
                    _this.circle.drawCircle(0, 0, 85);
                    _this.circle.endFill();

                    // Create a new mask graphics object
                    _this.mask_1 = _this.add.graphics(486, 410);

                    // Draw a sector shape on the mask graphics object
                    _this.mask_1.beginFill(0xffffff);
                    _this.mask_1.moveTo(0, 0);
                    _this.mask_1.lineTo(50, 0);
                    _this.mask_1.arc(0, 0, 100, _this.math.degToRad(0), _this.math.degToRad(270 - _this.angle_y + 90), true);
                    _this.mask_1.lineTo(0, 0);
                    _this.mask_1.endFill();

                    // Apply the mask to the circle sprite
                    _this.circle.mask = _this.mask_1;
                    _this.circle.alpha = 0;
                    _this.mask_1.alpha = 0;
                    _this.sandwitchGroup_4.addChild(_this.circle);
                    _this.sandwitchGroup_4.addChild(_this.mask_1);

                }
                else {
                    //for creating pink mask
                    // Create a new circle sprite
                    _this.circle = _this.add.graphics(737, 430 - (_this.sandwitch_1.height * _this.tanA));
                    _this.circle.beginFill(0xE11584);//0xE11584
                    _this.circle.drawCircle(0, 0, 79);
                    _this.circle.endFill();

                    // Create a new mask graphics object
                    _this.mask_1 = _this.add.graphics(737, 430 - (_this.sandwitch_1.height * _this.tanA));

                    // Draw a sector shape on the mask graphics object
                    _this.mask_1.beginFill(0xffffff);
                    _this.mask_1.moveTo(0, 0);
                    _this.mask_1.lineTo(50, 0);
                    _this.mask_1.arc(0, 0, 20, _this.math.degToRad(90), _this.math.degToRad((360 - _this.angle_w) + 215), true);
                    _this.mask_1.lineTo(0, 0);
                    _this.mask_1.endFill();

                    // Apply the mask to the circle sprite
                    _this.circle.mask = _this.mask_1;
                    _this.circle.alpha = 0;
                    _this.mask_1.alpha = 0;
                    _this.sandwitchGroup_4.addChild(_this.circle);
                    _this.sandwitchGroup_4.addChild(_this.mask_1);
                }

                //for blue line
                // create a new graphics object
                _this.graphics_height = _this.add.graphics(0, 0);

                // set the line style
                _this.graphics_height.lineStyle(4, 0x40E0D0, 1);

                // draw the line
                _this.graphics_height.moveTo(737, 410);//straight line
                _this.graphics_height.lineTo(737, 160);//straight line
                _this.graphics_height.endFill();

                // create a new graphics object
                _this.graphics_bottom = _this.add.graphics(0, 0);

                // set the line style
                _this.graphics_bottom.lineStyle(4, 0x40E0D0, 1);

                // draw the line
                _this.graphics_bottom.moveTo(485, 410);//bottom line
                _this.graphics_bottom.lineTo(737, 410);//bottom line
                _this.graphics_bottom.endFill();

                // create a new graphics object
                _this.graphics_slop = _this.add.graphics(0, 0);

                // set the line style
                _this.graphics_slop.lineStyle(4, 0x40E0D0, 1);

                // draw the line
                _this.graphics_slop.moveTo(485, 410);//slop line
                _this.graphics_slop.lineTo(737, 430 - (_this.sandwitch_1.height * _this.tanA));//slop line
                _this.graphics_slop.endFill();

                _this.sandwitchGroup_4.addChild(_this.graphics_height);
                _this.sandwitchGroup_4.addChild(_this.graphics_bottom);
                _this.sandwitchGroup_4.addChild(_this.graphics_slop);

                if (_this.count1 > 3) {

                    //for blue line
                    // create a new graphics object. right side height
                    _this.swTriangle_1 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.swTriangle_1.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.swTriangle_1.moveTo(737, 410);//straight line//x1,y1
                    _this.swTriangle_1.lineTo(737, 160);//slop line//x3,y3
                    _this.swTriangle_1.lineTo(485, 160);//straight line//x4,y4
                    _this.swTriangle_1.lineTo(485, 410);//straight line////x5,y5
                    _this.swTriangle_1.lineTo(737, 430 - (_this.sandwitch_1.height * _this.tanA));//bottom line//x2,y2

                    _this.swTriangle_1.endFill();
                    _this.sandwitchGroup_4.addChild(_this.swTriangle_1);

                }
            });
            _this.time.events.add(4800, () => {
                _this.sandwitch_1.alpha = 0;
                _this.panel_2.alpha = 0;
                _this.cashew.alpha = 0;
                _this.apple.alpha = 0;
            });
            _this.time.events.add(7000, () => {
                if (_this.count1 < 4) {
                    _this.Question_flag = 1;
                    if (_this.count1 == 0) {
                        _this.pauseVoice();
                        _this.Ask_Question2.play();
                    }
                }
                else {
                    _this.Question_flag = 3;
                    if (_this.count1 == 4) {
                        _this.pauseVoice();
                        // _this.Ask_Question4.play();
                    }
                }
                _this.exterior_x = _this.add.image(680, 390 - (_this.sandwitch_1.height * _this.tanA), 'close_btn');
                _this.exterior_x.scale.setTo(0.5);
                _this.sandwitchGroup_4.addChild(_this.exterior_x);
                if (_this.count1 > 3) {
                    _this.exterior_x.inputEnabled = true;
                    _this.exterior_x.input.useHandCursor = true;
                    _this.exterior_x.events.onInputDown.add(_this.exterior_x_SandwitchAngle);
                }

                if (_this.count1 < 4) {
                    _this.interiar_y = _this.add.sprite(560, 365, 'Y_and_Z');
                    _this.interiar_y.frame = 1;
                    _this.interiar_y.scale.setTo(0.7);
                    _this.interiar_y.inputEnabled = true;
                    _this.interiar_y.input.useHandCursor = true;
                    _this.interiar_y.events.onInputDown.add(_this.interiar_y_Angle);
                    _this.sandwitchGroup_4.addChild(_this.interiar_y);
                }
                else {
                    if (_this.ywOrder[0] == 1) {
                        _this.interiar_y = _this.add.sprite(560, 365, 'Y_and_Z');
                        _this.interiar_y.frame = 1;
                        _this.interiar_y.scale.setTo(0.7);
                        _this.sandwitchGroup_4.addChild(_this.interiar_y);
                    }

                    if (_this.ywOrder[0] == 2) {
                        _this.interiar_w = _this.add.sprite(690, 450 - (_this.sandwitch_1.height * _this.tanA), 'Y_and_Z');
                        _this.interiar_w.frame = 1;
                        _this.interiar_w.scale.setTo(0.7);
                        _this.sandwitchGroup_4.addChild(_this.interiar_w);
                    }
                }

                _this.interiar_z = _this.add.sprite(680, 360, 'Y_and_Z');
                _this.interiar_z.scale.setTo(0.7);
                _this.interiar_z.inputEnabled = true;
                _this.interiar_z.input.useHandCursor = true;
                _this.interiar_z.events.onInputDown.add(_this.interiar_z_Angle);
                _this.sandwitchGroup_4.addChild(_this.interiar_z);

                _this.circle.alpha = 1;
                _this.mask_1.alpha = 1;

                _this.circleMask_2.alpha = 1;
                _this.mask_2.alpha = 1;

                //this is done for the second screen triangle scale increasing.
                var initialX = _this.sandwitchGroup_4.x - 100;
                var initialY = _this.sandwitchGroup_4.y - 50;

                var tween = _this.add.tween(_this.sandwitchGroup_4.scale).to({ x: 1.2, y: 1.2 }, 1000, Phaser.Easing.Linear.None, true);// tween for scale increasing
                var positionTween = _this.add.tween(_this.sandwitchGroup_4).to({ x: initialX, y: initialY }, 1000, Phaser.Easing.Linear.None);// tween for x and y position fixing

                tween.start();
                positionTween.start();

                if (_this.count1 > 3) {
                    _this.swCircleMask_1.alpha = 1;
                    _this.sw_mask_1.alpha = 1;
                }

            });

        }

    },

    //here we are showing the angle when child press on the y  sandwitch
    interiar_y_Angle: function () {
        if (_this.count1 < 4) {
            _this.clickSound.play();
            _this.interiar_y.destroy();
            if (_this.sandwitchOrder[0] == 1) {
                _this.angleY = _this.add.text(493, 230, _this.angle_y + "\u{00B0}");
                _this.sandwitchGroup_4.addChild(_this.angleY);
                _this.applyingStyle_Pink(_this.angleY);
                _this.angleY.fontSize = '18px';
            }
            if (_this.sandwitchOrder[0] == 2) {
                _this.angleY = _this.add.text(560, 385, _this.angle_y + "\u{00B0}");
                _this.applyingStyle_Pink(_this.angleY);
                _this.sandwitchGroup_4.addChild(_this.angleY);
                _this.angleY.fontSize = '18px';
            }
            if (!(_this.interiar_y.exists || _this.interiar_z.exists)) {
                _this.findValueX();
            }
        }
        else {
            if (_this.ywOrder[0] == 1) {
                if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                    _this.findValueY();
                }
            }
            else {
                if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                    _this.findValueW();
                }
            }
        }
    },

    //here we are showing the angle when child press on the y
    interiar_y_WafferAngle: function () {
        if (_this.count1 < 4) {
            _this.clickSound.play();
            _this.interiar_y.destroy();
            _this.angleY = _this.add.text(475, 335, _this.waffer_Angle_y + "\u{00B0}");
            _this.wafferGroup_4.addChild(_this.angleY);
            _this.applyingStyle_Pink(_this.angleY);
            _this.angleY.fontSize = '18px';
            //checking the object is present or not
            if (!(_this.interiar_y.exists || _this.interiar_z.exists)) {
                _this.findValueX();
            }
        }
        else {
            if (_this.ywOrder[0] == 1) {
                if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                    _this.findValueY();
                }
            }
            else {
                //checking the object is present or not
                if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                    _this.findValueW();
                }
            }
        }
    },
    //here we are showing the angle when child press on the y 
    interiar_y_CheeseAngle: function () {
        if (_this.count1 < 4) {
            _this.clickSound.play();
            _this.interiar_y.destroy();
            _this.angleY = _this.add.text(472, 360, _this.cheese_Angle_y + "\u{00B0}");
            _this.CheeseGroup_4.addChild(_this.angleY);
            _this.applyingStyle_Pink(_this.angleY);
            //_this.angleY.fontSize = '15px';
            //checking the object is present or not
            if (!(_this.interiar_y.exists || _this.interiar_z.exists)) {
                _this.findValueX();
            }
        }
        else {
            if (_this.ywOrder[0] == 1) {
                if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                    _this.findValueY();
                }
            }
            else {
                if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                    _this.findValueW();
                }
            }
        }
    },
    //here we are showing the angle when child press on the y 
    interiar_y_MelonAngle: function () {
        if (_this.count1 < 4) {
            _this.clickSound.play();
            _this.interiar_y.destroy();
            _this.angleY = _this.add.text(475, 445 - ((185 * _this.sinC) / _this.sinB) / 3.3, _this.watermelon_Angle_y + "\u{00B0}");
            _this.watermelonGroup_4.addChild(_this.angleY);
            _this.applyingStyle_Pink(_this.angleY);
            _this.angleY.fontSize = '18px';
            //checking the object is present or not
            if (!(_this.interiar_y.exists || _this.interiar_z.exists)) {
                _this.findValueX();
            }
        }
        else {
            if (_this.ywOrder[0] == 1) {
                if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                    _this.findValueY();
                }
            }
            else if (_this.ywOrder[0] == 3) {
                _this.clickSound.play();
                _this.interiar_y.destroy();
                _this.angleY = _this.add.text(475, 445 - ((185 * _this.sinC) / _this.sinB) / 3.3, _this.watermelon_Angle_y_1 + "\u{00B0}");
                _this.watermelonGroup_4.addChild(_this.angleY);
                _this.applyingStyle_Pink(_this.angleY);
                _this.angleY.fontSize = '18px';
                if (!(_this.interiar_y.exists || _this.exterior_x.exists)) {
                    _this.findValueZ();
                    console.log("...")
                }
            }
            else {
                if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                    _this.findValueW();
                }
            }
        }
    },

    //here we are showing the angle when child press on the z sandwitch
    interiar_z_Angle: function () {
        if (_this.count1 < 4) {
            _this.clickSound.play();
            _this.interiar_z.destroy();
            if (_this.sandwitchOrder[0] == 1) {
                _this.angleZ = _this.add.text(520, 350, _this.angle_z + "\u{00B0}");
                _this.applyingStyle_Orange(_this.angleZ);
                _this.sandwitchGroup_4.addChild(_this.angleZ);
                _this.angleZ.fontSize = '18px';
            }
            if (_this.sandwitchOrder[0] == 2) {
                _this.angleZ = _this.add.text(680, 360, _this.angle_z + "\u{00B0}");
                _this.applyingStyle_Orange(_this.angleZ);
                _this.sandwitchGroup_4.addChild(_this.angleZ);
                _this.angleZ.fontSize = '18px';
            }
            //checking the object is present or not
            if (!(_this.interiar_y.exists || _this.interiar_z.exists)) {
                _this.findValueX();
            }
        }
        else {
            _this.clickSound.play();
            _this.interiar_z.destroy();
            if (_this.sandwitchOrder[0] == 1) {
                _this.angleZ = _this.add.text(520, 350, _this.angle_z + "\u{00B0}");
                _this.applyingStyle_Orange(_this.angleZ);
                _this.sandwitchGroup_4.addChild(_this.angleZ);
                _this.angleZ.fontSize = '18px';
            }
            if (_this.sandwitchOrder[0] == 2) {
                _this.angleZ = _this.add.text(680, 360, _this.angle_z + "\u{00B0}");
                _this.applyingStyle_Orange(_this.angleZ);
                _this.sandwitchGroup_4.addChild(_this.angleZ);
                _this.angleZ.fontSize = '18px';
            }

            if (_this.ywOrder[0] == 1 && !(_this.exterior_x.exists || _this.interiar_z.exists)) {
                _this.findValueY();
            }
            if (_this.ywOrder[0] == 2 && !(_this.exterior_x.exists || _this.interiar_z.exists)) {
                _this.findValueW();
            }
        }

    },
    //here we are showing the angle when child press on the z
    interiar_z_WafferAngle: function () {
        if (_this.count1 < 4) {
            _this.clickSound.play();
            _this.interiar_z.destroy();
            _this.angleZ = _this.add.text(420, 405, _this.waffer_Angle_z + "\u{00B0}");
            _this.wafferGroup_4.addChild(_this.angleZ);
            _this.applyingStyle_Orange(_this.angleZ);
            _this.angleZ.fontSize = '18px';
            //checking the object is present or not
            if (!(_this.interiar_y.exists || _this.interiar_z.exists)) {
                _this.findValueX();
            }
        }
        else {
            _this.clickSound.play();
            _this.interiar_z.destroy();
            _this.angleZ = _this.add.text(420, 405, _this.waffer_Angle_z + "\u{00B0}");
            _this.wafferGroup_4.addChild(_this.angleZ);
            _this.applyingStyle_Orange(_this.angleZ);
            _this.angleZ.fontSize = '18px';
            if (_this.ywOrder[0] == 1) {
                if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                    _this.findValueY();
                }
            }
            else {
                if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                    _this.findValueW();
                }
            }
        }
    },
    //here we are showing the angle when child press on the z
    interiar_z_CheeseAngle: function () {
        if (_this.count1 < 4) {
            _this.clickSound.play();
            _this.interiar_z.destroy();
            _this.angleZ = _this.add.text(460, 405, _this.cheese_Angle_z + "\u{00B0}");
            _this.CheeseGroup_4.addChild(_this.angleZ);
            _this.applyingStyle_Orange(_this.angleZ);
            // _this.angleZ.fontSize = '15px';
            //checking the object is present or not
            if (!(_this.interiar_y.exists || _this.interiar_z.exists)) {
                _this.findValueX();
            }
        }
        else {
            _this.clickSound.play();
            _this.interiar_z.destroy();
            _this.angleZ = _this.add.text(460, 405, _this.cheese_Angle_z + "\u{00B0}");
            _this.CheeseGroup_4.addChild(_this.angleZ);
            _this.applyingStyle_Orange(_this.angleZ);
            // _this.angleZ.fontSize = '15px';
            if (_this.ywOrder[0] == 1) {
                if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                    _this.findValueY();
                }
            }
            else {
                if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                    _this.findValueW();
                }
            }
        }
    },
    //here we are showing the angle when child press on the z
    interiar_z_MelonAngle: function () {
        if (_this.count1 < 4) {
            _this.clickSound.play();
            _this.interiar_z.destroy();
            _this.angleZ = _this.add.text(630, 405, _this.watermelon_Angle_z + "\u{00B0}");
            _this.applyingStyle_Orange(_this.angleZ);
            _this.watermelonGroup_4.addChild(_this.angleZ);
            _this.angleZ.fontSize = '18px';
            //checking the object is present or not
            if (!(_this.interiar_y.exists || _this.interiar_z.exists)) {
                _this.findValueX();
            }
        }
        else {
            _this.clickSound.play();
            _this.interiar_z.destroy();
            _this.angleZ = _this.add.text(630, 405, _this.watermelon_Angle_z + "\u{00B0}");
            _this.applyingStyle_Orange(_this.angleZ);
            _this.watermelonGroup_4.addChild(_this.angleZ);
            _this.angleZ.fontSize = '18px';
            if (_this.ywOrder[0] == 1) {
                if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                    _this.findValueY();
                }
            }
            else {
                if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                    _this.findValueW();
                }
            }
        }
    },

    //here we are showing the angle when child press on the x
    exterior_x_CheeseAngle: function () {
        _this.clickSound.play();
        _this.exterior_x.destroy();
        _this.angleX = _this.add.text(430 + ((139 * _this.sinC) / _this.sinB) + 10, 400, _this.cheese_Angle_x + "\u{00B0}");
        _this.CheeseGroup_4.addChild(_this.angleX);
        _this.applyingStyle_blue_2(_this.angleX);
        // _this.angleZ.fontSize = '15px';
        if (_this.ywOrder[0] == 1) {
            if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                _this.findValueY();
            }
        }
        else {
            if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                _this.findValueW();
            }
        }
    },
    //here we are showing the angle when child press on the x
    exterior_x_MelonAngle: function () {
        _this.clickSound.play();
        _this.exterior_x.destroy();
        _this.angleX = _this.add.text(640 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB) - 10, _this.watermelon_Angle_x + "\u{00B0}");
        _this.watermelonGroup_4.addChild(_this.angleX);
        _this.applyingStyle_blue_2(_this.angleX);
        _this.angleX.fontSize = '18px';

        if (_this.ywOrder[0] == 1) {
            if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                _this.findValueY();
            }
        }
        else if (_this.ywOrder[0] == 3) {
            if (!(_this.interiar_y.exists || _this.exterior_x.exists)) {
                _this.findValueZ();
            }
        }
        else {
            if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                _this.findValueW();
            }
        }
    },
    //here we are showing the angle when child press on the x
    exterior_x_WafferAngle: function () {
        _this.clickSound.play();
        _this.exterior_x.destroy();
        _this.angleX = _this.add.text(376 + ((200 * _this.sinC) / _this.sinB) + 10, 400, _this.waffer_Angle_x + "\u{00B0}");
        _this.wafferGroup_4.addChild(_this.angleX);
        _this.applyingStyle_blue_2(_this.angleX);
        _this.angleX.fontSize = '18px';

        if (_this.ywOrder[0] == 1) {
            if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                _this.findValueY();
            }
        }
        else {
            if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                _this.findValueW();
            }
        }
    },
    //here we are showing the angle when child press on the x
    exterior_x_SandwitchAngle: function () {
        _this.clickSound.play();
        _this.exterior_x.destroy();
        if (_this.sandwitchOrder[0] == 1) {
            _this.angleX = _this.add.text(485 + (_this.sandwitch_1.height * _this.tanA), 365, _this.angle_x + "\u{00B0}");
            _this.applyingStyle_blue_2(_this.angleX);
            _this.sandwitchGroup_4.addChild(_this.angleX);
            _this.angleX.fontSize = '18px';
        }
        if (_this.sandwitchOrder[0] == 2) {
            _this.angleX = _this.add.text(690, 390 - (_this.sandwitch_1.height * _this.tanA), _this.angle_x + "\u{00B0}");
            _this.applyingStyle_blue_2(_this.angleX);
            _this.sandwitchGroup_4.addChild(_this.angleX);
            _this.angleX.fontSize = '18px';
        }

        if (_this.ywOrder[0] == 1) {
            if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                _this.findValueY();
            }
        }
        else {
            if (!(_this.interiar_z.exists || _this.exterior_x.exists)) {
                _this.findValueW();
            }
        }
    },


    //here showing the 3 boxes with options.
    findValueX: function () {
        console.log("findValueX");
        _this.Question_flag = 2;
        if (_this.count1 == 0) {
            _this.pauseVoice();
            _this.Ask_Question3.play();
        }
        _this.boxOptionRandomise();

        _this.firstOptionSidePart();
        _this.secondOptionSidePart();
        _this.thirdOptionSidePart();

        _this.tick = _this.add.sprite(880, 450, 'TickBtn');
        _this.tick.inputEnabled = true;
        _this.tick.input.useHandCursor = true;
        _this.tick.events.onInputDown.add(_this.tickEvaluation, _this);


    },
    //here showing the 3 boxes with options.
    findValueW: function () {
        console.log("findValuez");
        _this.Question_flag = 4;
        if (_this.count1 == 4) {
            _this.pauseVoice();
            // _this.Ask_Question5.play();
        }
        _this.boxOptionRandomiseW();

        _this.firstOptionSidePart();
        _this.secondOptionSidePart();
        _this.thirdOptionSidePart();

        _this.tick = _this.add.sprite(880, 450, 'TickBtn');
        _this.tick.inputEnabled = true;
        _this.tick.input.useHandCursor = true;
        _this.tick.events.onInputDown.add(_this.tickEvaluation, _this);


    },
    //here showing the 3 boxes with options.
    findValueY: function () {
        console.log("findValuey");
        _this.Question_flag = 4;
        if (_this.count1 == 4) {
            _this.pauseVoice();
            // _this.Ask_Question5.play();
        }
        _this.boxOptionRandomiseY();

        _this.firstOptionSidePart();
        _this.secondOptionSidePart();
        _this.thirdOptionSidePart();

        _this.tick = _this.add.sprite(880, 450, 'TickBtn');
        _this.tick.inputEnabled = true;
        _this.tick.input.useHandCursor = true;
        _this.tick.events.onInputDown.add(_this.tickEvaluation, _this);


    },
    //finding the value of z
    findValueZ: function () {
        console.log("findValuez");
        _this.Question_flag = 6;
        if (_this.count1 == 4) {
            _this.pauseVoice();
            // _this.Ask_Question7.play();
        }
        _this.boxOptionRandomiseZ();
        _this.firstOptionSidePart();
        _this.secondOptionSidePart();
        _this.thirdOptionSidePart();

        _this.tick = _this.add.sprite(880, 450, 'TickBtn');
        _this.tick.inputEnabled = true;
        _this.tick.input.useHandCursor = true;
        _this.tick.events.onInputDown.add(_this.tickEvaluation, _this);

    },

    //we have to find the box options randomization. this is used for the first set of question.
    boxOptionRandomise: function () {
        //we know the angle x and we have to find the 2 options here. one we can find less than x angle and one greater than x angle.
        _this.optionOrder = [1, 2, 3];
        _this.shuffleArray(_this.optionOrder);
        console.log(_this.optionOrder, "option order..");

        if (_this.objectsArray[_this.count1] == 'sandwitch') {
            console.log("sandwitch..");
            _this.first_Option = Math.floor(Math.random() * (_this.angle_x - (_this.angle_x - 5))) + (_this.angle_x - 5);//1 to 3; (max - min) ) + min  
            console.log(_this.first_Option, "first_Option_x..");

            _this.second_Option = Math.floor(Math.random() * (_this.angle_x - (_this.angle_x + 5))) + (_this.angle_x + 5);//1 to 3; (max - min) ) + min  
            console.log(_this.second_Option, "second_Option_x..");

            while (_this.first_Option == _this.angle_x || _this.second_Option == _this.angle_x) {
                _this.first_Option = Math.floor(Math.random() * (_this.angle_x - (_this.angle_x - 5))) + (_this.angle_x - 5);//1 to 3; (max - min) ) + min  
                console.log(_this.first_Option, "first_Option_x..");

                _this.second_Option = Math.floor(Math.random() * (_this.angle_x - (_this.angle_x + 5))) + (_this.angle_x + 5);//1 to 3; (max - min) ) + min  
                console.log(_this.second_Option, "second_Option_x..");
            }

            //finding tan angle for second option
            _this.tanAngle_1 = 180 - (90 + (180 - _this.first_Option));

            // convert the angle to radians
            _this.angleInRadians_1 = _this.math.degToRad(_this.tanAngle_1);
            // find the tangent of the angle
            _this.tangent_1 = Math.tan(_this.angleInRadians_1);
            _this.tanA_1 = _this.tangent_1.toFixed(2);
            console.log(_this.tanA_1, "_this.tanA_1");

            //finding tan angle for third option
            _this.tanAngle_2 = 180 - (90 + (180 - _this.second_Option));

            // convert the angle to radians
            _this.angleInRadians_2 = _this.math.degToRad(_this.tanAngle_2);
            // find the tangent of the angle
            _this.tangent_2 = Math.tan(_this.angleInRadians_2);
            _this.tanA_2 = _this.tangent_2.toFixed(2);
            console.log(_this.tanA_2, "_this.tanA_2");
        }
        if (_this.objectsArray[_this.count1] == 'waffer') {
            console.log("waffer..");
            _this.first_Option = Math.floor(Math.random() * (_this.waffer_Angle_x - (_this.waffer_Angle_x - 5))) + (_this.waffer_Angle_x - 5);//1 to 3; (max - min) ) + min  
            console.log(_this.first_Option, "first_Option_x..");

            _this.second_Option = Math.floor(Math.random() * (_this.waffer_Angle_x - (_this.waffer_Angle_x + 5))) + (_this.waffer_Angle_x + 5);//1 to 3; (max - min) ) + min  
            console.log(_this.second_Option, "second_Option_x..");

            while (_this.first_Option == _this.waffer_Angle_x || _this.second_Option == _this.waffer_Angle_x) {
                _this.first_Option = Math.floor(Math.random() * (_this.waffer_Angle_x - (_this.waffer_Angle_x - 5))) + (_this.waffer_Angle_x - 5);//1 to 3; (max - min) ) + min  
                console.log(_this.first_Option, "first_Option_x..");

                _this.second_Option = Math.floor(Math.random() * (_this.waffer_Angle_x - (_this.waffer_Angle_x + 5))) + (_this.waffer_Angle_x + 5);//1 to 3; (max - min) ) + min  
                console.log(_this.second_Option, "second_Option_x..");
            }

            //finding tan angle for second option
            _this.waffer_Angle_b_2 = 180 - _this.first_Option;
            console.log(_this.waffer_Angle_b_2, "_this.waffer_Angle_b_2");
            // Convert _this.waffer_Angle_b_2 degrees to radians
            _this.waffer_Angle_b_sin_2 = _this.waffer_Angle_b_2 * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_b_2 = Math.sin(_this.waffer_Angle_b_sin_2);
            _this.sinB_2 = _this.sineOfAngle_b_2.toFixed(1);
            console.log(_this.sinB_2, "b angle..");

            _this.waffer_Angle_c_2 = 180 - (_this.waffer_Angle_b_2 + _this.waffer_Angle_z);
            console.log(_this.waffer_Angle_c_2, "_this.waffer_Angle_c_2");
            // Convert _this.waffer_Angle_y degrees to radians
            _this.waffer_Angle_y_sin_2 = _this.waffer_Angle_c_2 * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_y_2 = Math.sin(_this.waffer_Angle_y_sin_2);
            _this.sinC_2 = _this.sineOfAngle_y_2.toFixed(1);
            console.log(_this.sinC_2, "c angle..");

            //finding tan angle for third option
            _this.waffer_Angle_b_3 = 180 - _this.second_Option;
            console.log(_this.waffer_Angle_b_3, "_this.waffer_Angle_b_3");
            // Convert _this.waffer_Angle_b_2 degrees to radians
            _this.waffer_Angle_b_sin_3 = _this.waffer_Angle_b_3 * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_b_3 = Math.sin(_this.waffer_Angle_b_sin_3);
            _this.sinB_3 = _this.sineOfAngle_b_3.toFixed(1);
            console.log(_this.sinB_3, "b angle..");

            _this.waffer_Angle_c_3 = 180 - (_this.waffer_Angle_b_3 + _this.waffer_Angle_z);
            console.log(_this.waffer_Angle_c_3, "_this.waffer_Angle_c_3");
            // Convert _this.waffer_Angle_y degrees to radians
            _this.waffer_Angle_y_sin_3 = _this.waffer_Angle_c_3 * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_y_3 = Math.sin(_this.waffer_Angle_y_sin_3);
            _this.sinC_3 = _this.sineOfAngle_y_3.toFixed(1);
            console.log(_this.sinC_3, "c angle..");
        }
        if (_this.objectsArray[_this.count1] == 'cheese') {
            console.log("cheese..");
            _this.first_Option = Math.floor(Math.random() * (_this.cheese_Angle_x - (_this.cheese_Angle_x - 5))) + (_this.cheese_Angle_x - 5);//1 to 3; (max - min) ) + min  
            console.log(_this.first_Option, "first_Option_x..");

            _this.second_Option = Math.floor(Math.random() * (_this.cheese_Angle_x - (_this.cheese_Angle_x + 5))) + (_this.cheese_Angle_x + 5);//1 to 3; (max - min) ) + min  
            console.log(_this.second_Option, "second_Option_x..");

            while (_this.first_Option == _this.cheese_Angle_x || _this.second_Option == _this.cheese_Angle_x) {
                _this.first_Option = Math.floor(Math.random() * (_this.cheese_Angle_x - (_this.cheese_Angle_x - 5))) + (_this.cheese_Angle_x - 5);//1 to 3; (max - min) ) + min  
                console.log(_this.first_Option, "first_Option_x..");

                _this.second_Option = Math.floor(Math.random() * (_this.cheese_Angle_x - (_this.cheese_Angle_x + 5))) + (_this.cheese_Angle_x + 5);//1 to 3; (max - min) ) + min  
                console.log(_this.second_Option, "second_Option_x..");
            }

            //finding tan angle for second option
            _this.cheese_Angle_b_2 = 180 - _this.first_Option;
            console.log(_this.cheese_Angle_b_2, "_this.cheese_Angle_b_2");
            // Convert _this.cheese_Angle_b_2 degrees to radians
            _this.cheese_Angle_b_sin_2 = _this.cheese_Angle_b_2 * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_b_2 = Math.sin(_this.cheese_Angle_b_sin_2);
            _this.sinB_2 = _this.sineOfAngle_b_2.toFixed(1);
            console.log(_this.sinB_2, "b angle..");

            _this.cheese_Angle_c_2 = 180 - (_this.cheese_Angle_b_2 + _this.cheese_Angle_z);
            console.log(_this.cheese_Angle_c_2, "_this.cheese_Angle_c_2");
            // Convert _this.cheese_Angle_y degrees to radians
            _this.cheese_Angle_y_sin_2 = _this.cheese_Angle_c_2 * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_y_2 = Math.sin(_this.cheese_Angle_y_sin_2);
            _this.sinC_2 = _this.sineOfAngle_y_2.toFixed(1);
            console.log(_this.sinC_2, "c angle..");

            //finding tan angle for third option
            _this.cheese_Angle_b_3 = 180 - _this.second_Option;
            console.log(_this.cheese_Angle_b_3, "_this.cheese_Angle_b_3");
            // Convert _this.cheese_Angle_b_2 degrees to radians
            _this.cheese_Angle_b_sin_3 = _this.cheese_Angle_b_3 * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_b_3 = Math.sin(_this.cheese_Angle_b_sin_3);
            _this.sinB_3 = _this.sineOfAngle_b_3.toFixed(1);
            console.log(_this.sinB_3, "b angle..");

            _this.cheese_Angle_c_3 = 180 - (_this.cheese_Angle_b_3 + _this.cheese_Angle_z);
            console.log(_this.cheese_Angle_c_3, "_this.cheese_Angle_c_3");
            // Convert _this.cheese_Angle_y degrees to radians
            _this.cheese_Angle_y_sin_3 = _this.cheese_Angle_c_3 * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_y_3 = Math.sin(_this.cheese_Angle_y_sin_3);
            _this.sinC_3 = _this.sineOfAngle_y_3.toFixed(1);
            console.log(_this.sinC_3, "c angle..");
        }
        if (_this.objectsArray[_this.count1] == 'watermelon') {
            console.log("watermelon..");
            _this.first_Option = Math.floor(Math.random() * (_this.watermelon_Angle_x - (_this.watermelon_Angle_x - 5))) + (_this.watermelon_Angle_x - 5);//1 to 3; (max - min) ) + min  
            console.log(_this.first_Option, "first_Option_x..");

            _this.second_Option = Math.floor(Math.random() * (_this.watermelon_Angle_x - (_this.watermelon_Angle_x + 5))) + (_this.watermelon_Angle_x + 5);//1 to 3; (max - min) ) + min  
            console.log(_this.second_Option, "second_Option_x..");

            while (_this.first_Option == _this.watermelon_Angle_x || _this.second_Option == _this.watermelon_Angle_x) {
                _this.first_Option = Math.floor(Math.random() * (_this.watermelon_Angle_x - (_this.watermelon_Angle_x - 5))) + (_this.watermelon_Angle_x - 5);//1 to 3; (max - min) ) + min  
                console.log(_this.first_Option, "first_Option_x..");

                _this.second_Option = Math.floor(Math.random() * (_this.watermelon_Angle_x - (_this.watermelon_Angle_x + 5))) + (_this.watermelon_Angle_x + 5);//1 to 3; (max - min) ) + min  
                console.log(_this.second_Option, "second_Option_x..");
            }

            //finding tan angle for second option
            _this.watermelon_Angle_b_2 = 180 - _this.first_Option;
            console.log(_this.watermelon_Angle_b_2, "_this.watermelon_Angle_b_2");
            // Convert _this.watermelon_Angle_b_2 degrees to radians
            _this.watermelon_Angle_b_sin_2 = _this.watermelon_Angle_b_2 * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_b_2 = Math.sin(_this.watermelon_Angle_b_sin_2);
            _this.sinB_2 = _this.sineOfAngle_b_2.toFixed(1);
            console.log(_this.sinB_2, "b angle..");

            _this.watermelon_Angle_c_2 = 180 - (_this.watermelon_Angle_b_2 + _this.watermelon_Angle_z);
            console.log(_this.watermelon_Angle_c_2, "_this.watermelon_Angle_c_2");
            // Convert _this.watermelon_Angle_y degrees to radians
            _this.watermelon_Angle_y_sin_2 = _this.watermelon_Angle_c_2 * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_y_2 = Math.sin(_this.watermelon_Angle_y_sin_2);
            _this.sinC_2 = _this.sineOfAngle_y_2.toFixed(1);
            console.log(_this.sinC_2, "c angle..");

            //finding tan angle for third option
            _this.watermelon_Angle_b_3 = 180 - _this.second_Option;
            console.log(_this.watermelon_Angle_b_3, "_this.watermelon_Angle_b_3");
            // Convert _this.watermelon_Angle_b_2 degrees to radians
            _this.watermelon_Angle_b_sin_3 = _this.watermelon_Angle_b_3 * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_b_3 = Math.sin(_this.watermelon_Angle_b_sin_3);
            _this.sinB_3 = _this.sineOfAngle_b_3.toFixed(1);
            console.log(_this.sinB_3, "b angle..");

            _this.watermelon_Angle_c_3 = 180 - (_this.watermelon_Angle_b_3 + _this.watermelon_Angle_z);
            console.log(_this.watermelon_Angle_c_3, "_this.watermelon_Angle_c_3");
            // Convert _this.watermelon_Angle_y degrees to radians
            _this.watermelon_Angle_y_sin_3 = _this.watermelon_Angle_c_3 * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_y_3 = Math.sin(_this.watermelon_Angle_y_sin_3);
            _this.sinC_3 = _this.sineOfAngle_y_3.toFixed(1);
            console.log(_this.sinC_3, "c angle..");
        }

    },
    boxOptionRandomiseW: function () {
        //we know the angle z and we have to find the 2 options here. one we can find less than z angle and one greater than z angle.
        _this.optionOrder = [1, 2, 3];
        _this.shuffleArray(_this.optionOrder);
        console.log(_this.optionOrder, "option order..");

        if (_this.objectsArray[_this.count1] == 'sandwitch') {
            console.log("sandwitch..");
            _this.first_Option = Math.floor(Math.random() * (_this.angle_w - (_this.angle_w - 5))) + (_this.angle_w - 5);//1 to 3; (max - min) ) + min  
            console.log(_this.first_Option, "first_Option_w..");

            _this.second_Option = Math.floor(Math.random() * (_this.angle_w - (_this.angle_w + 5))) + (_this.angle_w + 5);//1 to 3; (max - min) ) + min  
            console.log(_this.second_Option, "second_Option_w..");

            while (_this.first_Option == _this.angle_w || _this.second_Option == _this.angle_w) {
                _this.first_Option = Math.floor(Math.random() * (_this.angle_w - (_this.angle_w - 5))) + (_this.angle_w - 5);//1 to 3; (max - min) ) + min  
                console.log(_this.first_Option, "first_Option_w..");

                _this.second_Option = Math.floor(Math.random() * (_this.angle_w - (_this.angle_w + 5))) + (_this.angle_w + 5);//1 to 3; (max - min) ) + min  
                console.log(_this.second_Option, "second_Option_w..");
            }
            // convert the angle to radians
            _this.angleInRadians_2 = _this.math.degToRad(90 - _this.first_Option);
            // find the tangent of the angle
            _this.tanAngle_1 = Math.tan(_this.angleInRadians_2);
            _this.tanA_1 = _this.tanAngle_1.toFixed(1);
            console.log(_this.tanA_1, "_this.tanA_1");

            // convert the angle to radians
            _this.angleInRadians_3 = _this.math.degToRad(90 - _this.second_Option);
            // find the tangent of the angle
            _this.tanAngle_2 = Math.tan(_this.angleInRadians_3);
            _this.tanA_2 = _this.tanAngle_2.toFixed(1);
            console.log(_this.tanA_2, "_this.tanA_2");
        }
        if (_this.objectsArray[_this.count1] == 'waffer') {
            console.log("waffer..");
            _this.first_Option = Math.floor(Math.random() * (_this.waffer_Angle_b - (_this.waffer_Angle_b - 5))) + (_this.waffer_Angle_b - 5);//1 to 3; (max - min) ) + min  

            _this.second_Option = Math.floor(Math.random() * (_this.waffer_Angle_b - (_this.waffer_Angle_b + 5))) + (_this.waffer_Angle_b + 5);//1 to 3; (max - min) ) + min  

            while (_this.first_Option == _this.waffer_Angle_b || _this.second_Option == _this.waffer_Angle_b) {
                _this.first_Option = Math.floor(Math.random() * (_this.waffer_Angle_b - (_this.waffer_Angle_b - 5))) + (_this.waffer_Angle_b - 5);//1 to 3; (max - min) ) + min  

                _this.second_Option = Math.floor(Math.random() * (_this.waffer_Angle_b - (_this.waffer_Angle_b + 5))) + (_this.waffer_Angle_b + 5);//1 to 3; (max - min) ) + min  
            }

            // Convert _this.waffer_Angle_b degrees to radians
            _this.waffer_Angle_b_sin_2 = _this.first_Option * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_b_2 = Math.sin(_this.waffer_Angle_b_sin_2);
            _this.sinB_2 = _this.sineOfAngle_b_2.toFixed(1);
            console.log(_this.sinB_2, "b angle.."); // Output: 0.5

            // Convert _this.waffer_Angle_b degrees to radians
            _this.waffer_Angle_b_sin_3 = _this.second_Option * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_b_3 = Math.sin(_this.waffer_Angle_b_sin_3);
            _this.sinB_3 = _this.sineOfAngle_b_3.toFixed(1);
            console.log(_this.sinB_3, "b angle.."); // Output: 0.5

            console.log(_this.first_Option, "first_Option_w..");
            console.log(_this.second_Option, "second_Option_w..");
        }
        if (_this.objectsArray[_this.count1] == 'cheese') {
            console.log("cheese..");
            _this.first_Option = Math.floor(Math.random() * (_this.cheese_Angle_b - (_this.cheese_Angle_b - 5))) + (_this.cheese_Angle_b - 5);//1 to 3; (max - min) ) + min  

            _this.second_Option = Math.floor(Math.random() * (_this.cheese_Angle_b - (_this.cheese_Angle_b + 5))) + (_this.cheese_Angle_b + 5);//1 to 3; (max - min) ) + min  

            while (_this.first_Option == _this.cheese_Angle_b || _this.second_Option == _this.cheese_Angle_b) {
                _this.first_Option = Math.floor(Math.random() * (_this.cheese_Angle_b - (_this.cheese_Angle_b - 5))) + (_this.cheese_Angle_b - 5);//1 to 3; (max - min) ) + min  

                _this.second_Option = Math.floor(Math.random() * (_this.cheese_Angle_b - (_this.cheese_Angle_b + 5))) + (_this.cheese_Angle_b + 5);//1 to 3; (max - min) ) + min  
            }

            // Convert _this.cheese_Angle_b degrees to radians
            _this.cheese_Angle_b_sin_2 = _this.first_Option * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_b_2 = Math.sin(_this.cheese_Angle_b_sin_2);
            _this.sinB_2 = _this.sineOfAngle_b_2.toFixed(1);
            console.log(_this.sinB_2, "b angle.."); // Output: 0.5

            // Convert _this.cheese_Angle_b degrees to radians
            _this.cheese_Angle_b_sin_3 = _this.second_Option * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_b_3 = Math.sin(_this.cheese_Angle_b_sin_3);
            _this.sinB_3 = _this.sineOfAngle_b_3.toFixed(1);
            console.log(_this.sinB_3, "b angle.."); // Output: 0.5

            console.log(_this.first_Option, "first_Option_w..");
            console.log(_this.second_Option, "second_Option_w..");
        }
        if (_this.objectsArray[_this.count1] == 'watermelon') {
            console.log("watermelon..");
            _this.first_Option = Math.floor(Math.random() * (_this.watermelon_Angle_b - (_this.watermelon_Angle_b - 5))) + (_this.watermelon_Angle_b - 5);//1 to 3; (max - min) ) + min  

            _this.second_Option = Math.floor(Math.random() * (_this.watermelon_Angle_b - (_this.watermelon_Angle_b + 5))) + (_this.watermelon_Angle_b + 5);//1 to 3; (max - min) ) + min  

            while (_this.first_Option == _this.watermelon_Angle_b || _this.second_Option == _this.watermelon_Angle_b) {
                _this.first_Option = Math.floor(Math.random() * (_this.watermelon_Angle_b - (_this.watermelon_Angle_b - 5))) + (_this.watermelon_Angle_b - 5);//1 to 3; (max - min) ) + min  

                _this.second_Option = Math.floor(Math.random() * (_this.watermelon_Angle_b - (_this.watermelon_Angle_b + 5))) + (_this.watermelon_Angle_b + 5);//1 to 3; (max - min) ) + min  
            }

            // Convert _this.watermelon_Angle_b degrees to radians
            _this.watermelon_Angle_b_sin_2 = _this.first_Option * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_b_2 = Math.sin(_this.watermelon_Angle_b_sin_2);
            _this.sinB_2 = _this.sineOfAngle_b_2.toFixed(1);
            console.log(_this.sinB_2, "b angle.."); // Output: 0.5

            // Convert _this.watermelon_Angle_b degrees to radians
            _this.watermelon_Angle_b_sin_3 = _this.second_Option * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_b_3 = Math.sin(_this.watermelon_Angle_b_sin_3);
            _this.sinB_3 = _this.sineOfAngle_b_3.toFixed(1);
            console.log(_this.sinB_3, "b angle.."); // Output: 0.5

            console.log(_this.first_Option, "first_Option_w..");
            console.log(_this.second_Option, "second_Option_w..");
        }
    },
    boxOptionRandomiseY: function () {
        //we know the angle y and we have to find the 2 options here. one we can find less than y angle and one greater than y angle.
        _this.optionOrder = [1, 2, 3];
        _this.shuffleArray(_this.optionOrder);
        console.log(_this.optionOrder, "option order..");

        if (_this.objectsArray[_this.count1] == 'sandwitch') {
            console.log("sandwitch..");
            _this.first_Option = Math.floor(Math.random() * (_this.angle_y - (_this.angle_y - 5))) + (_this.angle_y - 5);//1 to 3; (max - min) ) + min  
            console.log(_this.first_Option, "first_Option_y..");

            _this.second_Option = Math.floor(Math.random() * (_this.angle_y - (_this.angle_y + 5))) + (_this.angle_y + 5);//1 to 3; (max - min) ) + min  
            console.log(_this.second_Option, "second_Option_y..");

            while (_this.first_Option == _this.angle_y || _this.second_Option == _this.angle_y) {
                _this.first_Option = Math.floor(Math.random() * (_this.angle_y - (_this.angle_y - 5))) + (_this.angle_y - 5);//1 to 3; (max - min) ) + min  
                console.log(_this.first_Option, "first_Option_y..");

                _this.second_Option = Math.floor(Math.random() * (_this.angle_y - (_this.angle_y + 5))) + (_this.angle_y + 5);//1 to 3; (max - min) ) + min  
                console.log(_this.second_Option, "second_Option_y..");
            }
            // convert the angle to radians
            _this.angleInRadians_2 = _this.math.degToRad(_this.first_Option);
            // find the tangent of the angle
            _this.tanAngle_1 = Math.tan(_this.angleInRadians_2);
            _this.tanA_1 = _this.tanAngle_1.toFixed(1);
            console.log(_this.tanA_1, "_this.tanA_1");

            // convert the angle to radians
            _this.angleInRadians_3 = _this.math.degToRad(_this.second_Option);
            // find the tangent of the angle
            _this.tanAngle_2 = Math.tan(_this.angleInRadians_3);
            _this.tanA_2 = _this.tanAngle_2.toFixed(1);
            console.log(_this.tanA_2, "_this.tanA_2");

        }
        if (_this.objectsArray[_this.count1] == 'waffer') {
            console.log("waffer..");
            _this.first_Option = Math.floor(Math.random() * (_this.waffer_Angle_y - (_this.waffer_Angle_y - 5))) + (_this.waffer_Angle_y - 5);//1 to 3; (max - min) ) + min  

            _this.second_Option = Math.floor(Math.random() * (_this.waffer_Angle_y - (_this.waffer_Angle_y + 5))) + (_this.waffer_Angle_y + 5);//1 to 3; (max - min) ) + min  

            while (_this.first_Option == _this.waffer_Angle_y || _this.second_Option == _this.waffer_Angle_y) {
                _this.first_Option = Math.floor(Math.random() * (_this.waffer_Angle_y - (_this.waffer_Angle_y - 5))) + (_this.waffer_Angle_y - 5);//1 to 3; (max - min) ) + min  

                _this.second_Option = Math.floor(Math.random() * (_this.waffer_Angle_y - (_this.waffer_Angle_y + 5))) + (_this.waffer_Angle_y + 5);//1 to 3; (max - min) ) + min  
            }

            // Convert _this.waffer_Angle_b degrees to radians
            _this.waffer_Angle_c_sin_2 = _this.first_Option * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_c_2 = Math.sin(_this.waffer_Angle_c_sin_2);
            _this.sinC_2 = _this.sineOfAngle_c_2.toFixed(1);
            console.log(_this.sinC_2, "c angle.."); // Output: 0.5

            // Convert _this.waffer_Angle_b degrees to radians
            _this.waffer_Angle_c_sin_3 = _this.second_Option * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_c_3 = Math.sin(_this.waffer_Angle_c_sin_3);
            _this.sinC_3 = _this.sineOfAngle_c_3.toFixed(1);
            console.log(_this.sinC_3, "c angle.."); // Output: 0.5

            console.log(_this.first_Option, "first_Option_c..");
            console.log(_this.second_Option, "second_Option_c..");

        }
        if (_this.objectsArray[_this.count1] == 'cheese') {
            console.log("cheese..");
            _this.first_Option = Math.floor(Math.random() * (_this.cheese_Angle_y - (_this.cheese_Angle_y - 5))) + (_this.cheese_Angle_y - 5);//1 to 3; (max - min) ) + min  

            _this.second_Option = Math.floor(Math.random() * (_this.cheese_Angle_y - (_this.cheese_Angle_y + 5))) + (_this.cheese_Angle_y + 5);//1 to 3; (max - min) ) + min  

            while (_this.first_Option == _this.cheese_Angle_y || _this.second_Option == _this.cheese_Angle_y) {
                _this.first_Option = Math.floor(Math.random() * (_this.cheese_Angle_y - (_this.cheese_Angle_y - 5))) + (_this.cheese_Angle_y - 5);//1 to 3; (max - min) ) + min  

                _this.second_Option = Math.floor(Math.random() * (_this.cheese_Angle_y - (_this.cheese_Angle_y + 5))) + (_this.cheese_Angle_y + 5);//1 to 3; (max - min) ) + min  
            }

            // Convert _this.cheese_Angle_b degrees to radians
            _this.cheese_Angle_c_sin_2 = _this.first_Option * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_c_2 = Math.sin(_this.cheese_Angle_c_sin_2);
            _this.sinC_2 = _this.sineOfAngle_c_2.toFixed(1);
            console.log(_this.sinC_2, "c angle.."); // Output: 0.5

            // Convert _this.cheese_Angle_b degrees to radians
            _this.cheese_Angle_c_sin_3 = _this.second_Option * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_c_3 = Math.sin(_this.cheese_Angle_c_sin_3);
            _this.sinC_3 = _this.sineOfAngle_c_3.toFixed(1);
            console.log(_this.sinC_3, "c angle.."); // Output: 0.5

            console.log(_this.first_Option, "first_Option_w..");
            console.log(_this.second_Option, "second_Option_w..");
        }
        if (_this.objectsArray[_this.count1] == 'watermelon') {
            console.log("cheese..");
            _this.first_Option = Math.floor(Math.random() * (_this.watermelon_Angle_y - (_this.watermelon_Angle_y - 5))) + (_this.watermelon_Angle_y - 5);//1 to 3; (max - min) ) + min  

            _this.second_Option = Math.floor(Math.random() * (_this.watermelon_Angle_y - (_this.watermelon_Angle_y + 5))) + (_this.watermelon_Angle_y + 5);//1 to 3; (max - min) ) + min  

            while (_this.first_Option == _this.watermelon_Angle_y || _this.second_Option == _this.watermelon_Angle_y) {
                _this.first_Option = Math.floor(Math.random() * (_this.watermelon_Angle_y - (_this.watermelon_Angle_y - 5))) + (_this.watermelon_Angle_y - 5);//1 to 3; (max - min) ) + min  

                _this.second_Option = Math.floor(Math.random() * (_this.watermelon_Angle_y - (_this.watermelon_Angle_y + 5))) + (_this.watermelon_Angle_y + 5);//1 to 3; (max - min) ) + min  
            }

            // Convert _this.cheese_Angle_b degrees to radians
            _this.watermelon_Angle_y_sin_2 = _this.first_Option * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_c_2 = Math.sin(_this.watermelon_Angle_y_sin_2);
            _this.sinC_2 = _this.sineOfAngle_c_2.toFixed(2);
            console.log(_this.sinC_2, "c angle.."); // Output: 0.5

            // Convert _this.cheese_Angle_b degrees to radians
            _this.watermelon_Angle_y_sin_3 = _this.second_Option * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_c_3 = Math.sin(_this.watermelon_Angle_y_sin_3);
            _this.sinC_3 = _this.sineOfAngle_c_3.toFixed(1);
            console.log(_this.sinC_3, "c angle.."); // Output: 0.5

            console.log(_this.first_Option, "first_Option_w..");
            console.log(_this.second_Option, "second_Option_w..");
        }
    },
    boxOptionRandomiseZ: function () {
        //we know the angle y and we have to find the 2 options here. one we can find less than y angle and one greater than y angle.
        _this.optionOrder = [1, 2, 3];
        _this.shuffleArray(_this.optionOrder);
        console.log(_this.optionOrder, "option order..");

        if (_this.objectsArray[_this.count1] == 'watermelon') {
            console.log("cheese..");
            _this.first_Option = Math.floor(Math.random() * (_this.watermelon_Angle_z - (_this.watermelon_Angle_z - 5))) + (_this.watermelon_Angle_z - 5);//1 to 3; (max - min) ) + min  

            _this.second_Option = Math.floor(Math.random() * (_this.watermelon_Angle_z - (_this.watermelon_Angle_z + 5))) + (_this.watermelon_Angle_z + 5);//1 to 3; (max - min) ) + min  

            while (_this.first_Option == _this.watermelon_Angle_z || _this.second_Option == _this.watermelon_Angle_z) {
                _this.first_Option = Math.floor(Math.random() * (_this.watermelon_Angle_z - (_this.watermelon_Angle_z - 5))) + (_this.watermelon_Angle_z - 5);//1 to 3; (max - min) ) + min  

                _this.second_Option = Math.floor(Math.random() * (_this.watermelon_Angle_z - (_this.watermelon_Angle_z + 5))) + (_this.watermelon_Angle_z + 5);//1 to 3; (max - min) ) + min  
            }

            // Convert _this.cheese_Angle_b degrees to radians
            _this.watermelon_Angle_z_sin_2 = _this.first_Option * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_c_2 = Math.sin(_this.watermelon_Angle_z_sin_2);
            _this.sinC_2 = _this.sineOfAngle_c_2.toFixed(2);
            console.log(_this.sinC_2, "c angle.."); // Output: 0.5

            // Convert _this.cheese_Angle_b degrees to radians
            _this.watermelon_Angle_z_sin_3 = _this.second_Option * Math.PI / 180;
            // Find the sine of the angle
            _this.sineOfAngle_c_3 = Math.sin(_this.watermelon_Angle_z_sin_3);
            _this.sinC_3 = _this.sineOfAngle_c_3.toFixed(1);
            console.log(_this.sinC_3, "c angle.."); // Output: 0.5

            console.log(_this.first_Option, "first_Option_w..");
            console.log(_this.second_Option, "second_Option_w..");
        }
    },

    firstOptionSidePart: function () {
        console.log("firstOptionSidePart....");
        if (_this.optionOrder[0] == 1) {
            _this.box_1 = _this.add.sprite(20, _this.boxPosition_y[0], 'box');
            _this.box_1.frame = 0;
            _this.box_1.scale.setTo(0.9);
        }
        else if (_this.optionOrder[1] == 1) {
            _this.box_1 = _this.add.sprite(20, _this.boxPosition_y[1], 'box');
            _this.box_1.frame = 0;
            _this.box_1.scale.setTo(0.9);
        }
        else if (_this.optionOrder[2] == 1) {
            _this.box_1 = _this.add.sprite(20, _this.boxPosition_y[2], 'box');
            _this.box_1.frame = 0;
            _this.box_1.scale.setTo(0.9);
        }
        else {
            console.log(".....");
        }
        if (_this.count1 < 4) {

            if (_this.objectsArray[_this.count1] == 'sandwitch') {

                //for blue line
                // create a new graphics object. right side height
                _this.triangleRemain_1 = _this.add.graphics(0, 0);
                // set the line style
                _this.triangleRemain_1.lineStyle(4, 0x40E0D0, 1);
                // draw the line
                _this.triangleRemain_1.moveTo(740, 410);//straight line//x1,y1
                _this.triangleRemain_1.lineTo((485 + (_this.sandwitch_1.height * _this.tanA)), 410);//bottom line//x2,y2
                _this.triangleRemain_1.lineTo(485, 160);//slop line//x3,y3
                _this.triangleRemain_1.lineTo(740, 160);//straight line//x4,y4
                _this.triangleRemain_1.lineTo(740, 410);//straight line////x5,y5

                _this.triangleRemain_1.endFill();

                _this.sandwitchGroup.addChild(_this.triangleRemain_1);
                //for creating orange mask
                // Create a new circle sprite
                _this.circleMask_3 = _this.add.graphics((485 + (_this.sandwitch_1.height * _this.tanA)), 410);
                _this.circleMask_3.beginFill(0x40E0D0);
                _this.circleMask_3.drawCircle(0, 0, 79);
                _this.circleMask_3.endFill();

                // Create a new mask graphics object
                _this.mask_3 = _this.add.graphics((485 + (_this.sandwitch_1.height * _this.tanA)), 410);

                // Draw a sector shape on the mask graphics object
                _this.mask_3.beginFill(0xffffff);
                _this.mask_3.moveTo(0, 0);
                _this.mask_3.lineTo(50, 0);
                _this.mask_3.arc(0, 0, 20, _this.math.degToRad(0), _this.math.degToRad(360 - _this.angle_x), true);
                _this.mask_3.lineTo(0, 0);
                _this.mask_3.endFill();

                // Apply the mask to the circle sprite
                _this.circleMask_3.mask = _this.mask_3;

                _this.sandwitchGroup.addChild(_this.mask_3);
                _this.sandwitchGroup.addChild(_this.circleMask_3);


                _this.sandwitchGroup.scale.setTo(0.4);
                _this.sandwitchGroup.x = -170;
                _this.sandwitchGroup.y = -50;

                _this.angle_x_1 = _this.add.text(30, 120, ('X = ' + _this.angle_x + "\u{00B0}"));
                _this.applyingStyle_blue(_this.angle_x_1);

                _this.box_1.addChild(_this.sandwitchGroup);
                _this.box_1.addChild(_this.angle_x_1);

            }

            else if (_this.objectsArray[_this.count1] == 'waffer') {


                //for blue line
                // create a new graphics object. right side height
                _this.triangleRemain_1 = _this.add.graphics(0, 0);
                // set the line style
                _this.triangleRemain_1.lineStyle(4, 0x40E0D0, 1);
                // draw the line
                _this.triangleRemain_1.moveTo(376 + ((200 * _this.sinC) / _this.sinB), 445);//straight line//x1,y1
                _this.triangleRemain_1.lineTo(763, 445);//bottom line//x2,y2
                _this.triangleRemain_1.lineTo(690, 288);//slop line//x3,y3
                _this.triangleRemain_1.lineTo(502, 288);//straight line//x4,y4
                _this.triangleRemain_1.lineTo(376 + ((200 * _this.sinC) / _this.sinB), 445);//straight line////x5,y5

                _this.triangleRemain_1.endFill();

                _this.wafferGroup.addChild(_this.triangleRemain_1);

                //for creating orange mask
                // Create a new circle sprite
                _this.circleMask_3 = _this.add.graphics(376 + ((200 * _this.sinC) / _this.sinB), 445);//376 + ((200 * _this.sinC) / _this.sinB), 445
                _this.circleMask_3.beginFill(0x40E0D0);
                _this.circleMask_3.drawCircle(0, 0, 79);
                _this.circleMask_3.endFill();

                // Create a new mask graphics object
                _this.mask_3 = _this.add.graphics(376 + ((200 * _this.sinC) / _this.sinB), 445);

                // Draw a sector shape on the mask graphics object
                _this.mask_3.beginFill(0xffffff);
                _this.mask_3.moveTo(0, 0);
                _this.mask_3.lineTo(50, 0);
                _this.mask_3.arc(0, 0, 20, _this.math.degToRad(0), _this.math.degToRad(360 - _this.waffer_Angle_x), true);
                _this.mask_3.lineTo(0, 0);
                _this.mask_3.endFill();

                // Apply the mask to the circle sprite
                _this.circleMask_3.mask = _this.mask_3;

                // _this.triangleRemain_1.scale.setTo(0.35);
                // _this.triangleRemain_1.x = -140;
                // _this.triangleRemain_1.y = -60;

                // _this.world.add(_this.triangleRemain_1);

                _this.wafferGroup.addChild(_this.mask_3);
                _this.wafferGroup.addChild(_this.circleMask_3);

                _this.wafferGroup.scale.setTo(0.4);
                _this.wafferGroup.x = -180;
                _this.wafferGroup.y = -80;

                _this.angle_x_1 = _this.add.text(30, 120, ('X = ' + _this.waffer_Angle_x + "\u{00B0}"));
                _this.applyingStyle_blue(_this.angle_x_1);

                // _this.box_1.addChild(_this.triangleRemain_1);
                // _this.box_1.addChild(_this.angle_x_1);
                // _this.box_1.addChild(_this.circleMask_3);
                // _this.box_1.addChild(_this.mask_3);
                _this.box_1.addChild(_this.wafferGroup);
                _this.box_1.addChild(_this.angle_x_1);
                console.log(_this.wafferGroup.x, "_this.wafferGroupxxx");
            }
            else if (_this.objectsArray[_this.count1] == 'cheese') {


                //for blue line
                // create a new graphics object. right side height
                _this.triangleRemain_1 = _this.add.graphics(0, 0);
                // set the line style
                _this.triangleRemain_1.lineStyle(4, 0x40E0D0, 1);
                // draw the line
                _this.triangleRemain_1.moveTo(430 + ((139 * _this.sinC) / _this.sinB), 445);//straight line//x1,y1
                _this.triangleRemain_1.lineTo(685, 445);//bottom line//x2,y2
                _this.triangleRemain_1.lineTo(620, 320);//slop line//x3,y3
                _this.triangleRemain_1.lineTo(491, 320);//straight line//x4,y4
                _this.triangleRemain_1.lineTo(430 + ((139 * _this.sinC) / _this.sinB), 445);//straight line////x5,y5

                _this.triangleRemain_1.endFill();

                _this.CheeseGroup.addChild(_this.triangleRemain_1);
                //for creating orange mask
                // Create a new circle sprite
                _this.circleMask_3 = _this.add.graphics(430 + ((139 * _this.sinC) / _this.sinB), 445);//376 + ((200 * _this.sinC) / _this.sinB), 445
                _this.circleMask_3.beginFill(0x40E0D0);
                _this.circleMask_3.drawCircle(0, 0, 79);
                _this.circleMask_3.endFill();

                // Create a new mask graphics object
                _this.mask_3 = _this.add.graphics(430 + ((139 * _this.sinC) / _this.sinB), 445);

                // Draw a sector shape on the mask graphics object
                _this.mask_3.beginFill(0xffffff);
                _this.mask_3.moveTo(0, 0);
                _this.mask_3.lineTo(50, 0);
                _this.mask_3.arc(0, 0, 20, _this.math.degToRad(0), _this.math.degToRad(360 - _this.cheese_Angle_x), true);
                _this.mask_3.lineTo(0, 0);
                _this.mask_3.endFill();

                // Apply the mask to the circle sprite
                _this.circleMask_3.mask = _this.mask_3;

                // _this.triangleRemain_1.scale.setTo(0.5);
                // _this.triangleRemain_1.x = -210;
                // _this.triangleRemain_1.y = -130;

                // _this.world.add(_this.triangleRemain_1);

                _this.CheeseGroup.addChild(_this.mask_3);
                _this.CheeseGroup.addChild(_this.circleMask_3);

                _this.CheeseGroup.scale.setTo(0.5);
                _this.CheeseGroup.x = -210;
                _this.CheeseGroup.y = -120;

                _this.angle_x_1 = _this.add.text(30, 120, ('X = ' + _this.cheese_Angle_x + "\u{00B0}"));
                _this.applyingStyle_blue(_this.angle_x_1);

                // _this.box_1.addChild(_this.triangleRemain_1);
                // _this.box_1.addChild(_this.angle_x_1);
                // _this.box_1.addChild(_this.circleMask_3);
                // _this.box_1.addChild(_this.mask_3);
                _this.box_1.addChild(_this.CheeseGroup);
                _this.box_1.addChild(_this.angle_x_1);
            }
            else {
                if (_this.objectsArray[_this.count1] == 'watermelon') {

                    //for blue line
                    // create a new graphics object. right side height
                    _this.triangleRemain_1 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_1.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_1.moveTo(430, 445);//straight line//x1,y1
                    _this.triangleRemain_1.lineTo(430, 180);//bottom line//x2,y2
                    _this.triangleRemain_1.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));//slop line//x3,y3
                    _this.triangleRemain_1.lineTo(430, 444);//straight line//x4,y4
                    _this.triangleRemain_1.endFill();

                    _this.watermelonGroup.addChild(_this.triangleRemain_1);
                    //for creating orange mask
                    // Create a new circle sprite
                    _this.circleMask_3 = _this.add.graphics(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));//705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB)
                    _this.circleMask_3.beginFill(0x40E0D0);
                    _this.circleMask_3.drawCircle(0, 0, 79);
                    _this.circleMask_3.endFill();

                    // Create a new mask graphics object
                    _this.mask_3 = _this.add.graphics(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));

                    // Draw a sector shape on the mask graphics object
                    _this.mask_3.beginFill(0xffffff);
                    _this.mask_3.moveTo(0, 0);
                    _this.mask_3.lineTo(50, 0);
                    _this.mask_3.arc(0, 0, 20, _this.math.degToRad(230), _this.math.degToRad(360 - _this.watermelon_Angle_x + 230), true);
                    _this.mask_3.lineTo(0, 0);
                    _this.mask_3.endFill();

                    // Apply the mask to the circle sprite
                    _this.circleMask_3.mask = _this.mask_3;

                    _this.watermelonGroup.addChild(_this.circleMask_3);
                    _this.watermelonGroup.addChild(_this.mask_3);


                    _this.watermelonGroup.scale.setTo(0.4);
                    _this.watermelonGroup.x = -120;
                    _this.watermelonGroup.y = -65;

                    _this.angle_x_1 = _this.add.text(30, 120, ('X = ' + _this.watermelon_Angle_x + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_1);

                    _this.box_1.addChild(_this.watermelonGroup);
                    _this.box_1.addChild(_this.angle_x_1);

                }
            }
        }
        else {
            if (_this.objectsArray[_this.count1] == 'sandwitch') {
                if (_this.ywOrder[0] == 1) {
                    //for finding y
                    //for creating pink mask
                    // Create a new circle sprite
                    _this.circleMask_3 = _this.add.graphics(486, 162);
                    _this.circleMask_3.beginFill(0xE11584);//0xE11584
                    _this.circleMask_3.drawCircle(0, 0, 85);
                    _this.circleMask_3.endFill();

                    // Create a new mask graphics object
                    _this.mask_3 = _this.add.graphics(486, 162);

                    // Draw a sector shape on the mask graphics object
                    _this.mask_3.beginFill(0xffffff);
                    _this.mask_3.moveTo(0, 0);
                    _this.mask_3.lineTo(50, 0);
                    _this.mask_3.arc(0, 0, 100, _this.math.degToRad(90), _this.math.degToRad(360 - _this.angle_y + 90), true);
                    _this.mask_3.lineTo(0, 0);
                    _this.mask_3.endFill();

                    // Apply the mask to the circle sprite
                    _this.circleMask_3.mask = _this.mask_3;
                    _this.sandwitchGroup.addChild(_this.mask_3);
                    _this.sandwitchGroup.addChild(_this.circleMask_3);
                    //for blue line// create a new graphics object                    
                    _this.triangleRemain_1 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_1.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_1.moveTo(485, 410);//straight line
                    _this.triangleRemain_1.lineTo(485, 160);//straight line
                    _this.triangleRemain_1.lineTo(485 + (_this.sandwitch_1.height * _this.tanA), 410);//slop line
                    _this.triangleRemain_1.lineTo(485, 410);//bottom line
                    _this.triangleRemain_1.endFill();

                    _this.sandwitchGroup.addChild(_this.triangleRemain_1);

                    _this.sandwitchGroup.scale.setTo(0.4);
                    _this.sandwitchGroup.x = -140;
                    _this.sandwitchGroup.y = -50;

                    _this.angle_x_1 = _this.add.text(30, 120, ('Y = ' + _this.angle_y + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_1);

                    _this.box_1.addChild(_this.sandwitchGroup);
                    _this.box_1.addChild(_this.angle_x_1);
                }
                else {
                    //for finding w
                    //for creating orange mask
                    // Create a new circle sprite
                    _this.circleMask_3 = _this.add.graphics(485 + (_this.sandwitch_1.height * _this.tanA), 410);
                    _this.circleMask_3.beginFill(0xE11584);
                    _this.circleMask_3.drawCircle(0, 0, 79);
                    _this.circleMask_3.endFill();

                    // Create a new mask graphics object
                    _this.mask_3 = _this.add.graphics(485 + (_this.sandwitch_1.height * _this.tanA), 410);

                    // Draw a sector shape on the mask graphics object
                    _this.mask_3.beginFill(0xffffff);
                    _this.mask_3.moveTo(0, 0);
                    _this.mask_3.lineTo(50, 0);
                    _this.mask_3.arc(0, 0, 60, _this.math.degToRad(180), _this.math.degToRad((360 - _this.angle_w) + 305), true);
                    _this.mask_3.lineTo(0, 0);
                    _this.mask_3.endFill();

                    // Apply the mask to the circle sprite
                    _this.circleMask_3.mask = _this.mask_3;

                    _this.sandwitchGroup.addChild(_this.circleMask_3);
                    _this.sandwitchGroup.addChild(_this.mask_3);
                    //for blue line
                    // create a new graphics object
                    _this.triangleRemain_1 = _this.add.graphics(0, 0);

                    // set the line style
                    _this.triangleRemain_1.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_1.moveTo(485, 410);//straight line
                    _this.triangleRemain_1.lineTo(485, 160);//straight line
                    _this.triangleRemain_1.lineTo(485 + (_this.sandwitch_1.height * _this.tanA), 410);//slop line
                    _this.triangleRemain_1.lineTo(485, 410);//bottom line
                    _this.triangleRemain_1.endFill();

                    _this.sandwitchGroup.addChild(_this.triangleRemain_1);

                    _this.sandwitchGroup.scale.setTo(0.4);
                    _this.sandwitchGroup.x = -140;
                    _this.sandwitchGroup.y = -50;

                    _this.angle_x_1 = _this.add.text(30, 120, ('Y = ' + _this.angle_w + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_1);

                    _this.box_1.addChild(_this.sandwitchGroup);
                    _this.box_1.addChild(_this.angle_x_1);
                }

            }
            else if (_this.objectsArray[_this.count1] == 'waffer') {

                if (_this.ywOrder[0] == 1) {
                    //finding y value
                    //for creating pink mask
                    // Create a new circle sprite
                    _this.circleMask_3 = _this.add.graphics(500, 290);
                    _this.circleMask_3.beginFill(0xE11584);//0xE11584
                    _this.circleMask_3.drawCircle(0, 0, 85);
                    _this.circleMask_3.endFill();
                    // Create a new mask graphics object
                    _this.mask_3 = _this.add.graphics(500, 290);
                    // Draw a sector shape on the mask graphics object
                    _this.mask_3.beginFill(0xffffff);
                    _this.mask_3.moveTo(0, 0);
                    _this.mask_3.lineTo(50, 0);
                    _this.mask_3.arc(0, 0, 60, _this.math.degToRad(129), _this.math.degToRad(360 - _this.waffer_Angle_y + 129), true);
                    _this.mask_3.lineTo(0, 0);
                    _this.mask_3.endFill();
                    // Apply the mask to the circle sprite
                    _this.circleMask_3.mask = _this.mask_3;

                    _this.wafferGroup.addChild(_this.mask_3);
                    _this.wafferGroup.addChild(_this.circleMask_3);
                    //for blue line
                    // create a new graphics object
                    _this.triangleRemain_1 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_1.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_1.moveTo(376, 445);//straight line
                    _this.triangleRemain_1.lineTo(500, 288);//straight line
                    _this.triangleRemain_1.lineTo(376 + ((200 * _this.sinC) / _this.sinB), 445);//slop line
                    _this.triangleRemain_1.lineTo(376, 445);
                    _this.triangleRemain_1.endFill();

                    _this.wafferGroup.addChild(_this.triangleRemain_1);

                    _this.wafferGroup.scale.setTo(0.4);
                    _this.wafferGroup.x = -110;
                    _this.wafferGroup.y = -80;

                    _this.angle_x_1 = _this.add.text(30, 120, ('Y = ' + _this.waffer_Angle_y + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_1);

                    _this.box_1.addChild(_this.wafferGroup);
                    _this.box_1.addChild(_this.angle_x_1);
                }
                else {
                    //finding w value
                    //for creating pink mask
                    // Create a new circle sprite
                    _this.circleMask_3 = _this.add.graphics(376 + ((200 * _this.sinC) / _this.sinB), 445);
                    _this.circleMask_3.beginFill(0xE11584);//0xE11584
                    _this.circleMask_3.drawCircle(0, 0, 79);
                    _this.circleMask_3.endFill();
                    // Create a new mask graphics object
                    _this.mask_3 = _this.add.graphics(376 + ((200 * _this.sinC) / _this.sinB), 445);
                    // Draw a sector shape on the mask graphics object
                    _this.mask_3.beginFill(0xffffff);
                    _this.mask_3.moveTo(0, 0);
                    _this.mask_3.lineTo(50, 0);
                    _this.mask_3.arc(0, 0, 20, _this.math.degToRad(180 + _this.waffer_Angle_b), _this.math.degToRad(180), true);
                    _this.mask_3.lineTo(0, 0);
                    _this.mask_3.endFill();
                    // Apply the mask to the circle sprite
                    _this.circleMask_3.mask = _this.mask_3;

                    _this.wafferGroup.addChild(_this.mask_3);
                    _this.wafferGroup.addChild(_this.circleMask_3);
                    //for blue line
                    // create a new graphics object
                    _this.triangleRemain_1 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_1.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_1.moveTo(376, 445);//straight line
                    _this.triangleRemain_1.lineTo(500, 288);//straight line
                    _this.triangleRemain_1.lineTo(376 + ((200 * _this.sinC) / _this.sinB), 445);//slop line
                    _this.triangleRemain_1.lineTo(376, 445);
                    _this.triangleRemain_1.endFill();

                    _this.wafferGroup.addChild(_this.triangleRemain_1);

                    _this.wafferGroup.scale.setTo(0.4);
                    _this.wafferGroup.x = -110;
                    _this.wafferGroup.y = -80;

                    _this.angle_x_1 = _this.add.text(30, 120, ('Y = ' + _this.waffer_Angle_b + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_1);

                    _this.box_1.addChild(_this.wafferGroup);
                    _this.box_1.addChild(_this.angle_x_1);
                }
            }
            else if (_this.objectsArray[_this.count1] == 'cheese') {

                if (_this.ywOrder[0] == 1) {
                    //finding y value
                    //for creating pink mask
                    // Create a new circle sprite
                    _this.circleMask_3 = _this.add.graphics(490, 320);
                    _this.circleMask_3.beginFill(0xE11584);//0xE11584
                    _this.circleMask_3.drawCircle(0, 0, 85);
                    _this.circleMask_3.endFill();
                    // Create a new mask graphics object
                    _this.mask_3 = _this.add.graphics(490, 320);
                    // Draw a sector shape on the mask graphics object
                    _this.mask_3.beginFill(0xffffff);
                    _this.mask_3.moveTo(0, 0);
                    _this.mask_3.lineTo(50, 0);
                    _this.mask_3.arc(0, 0, 60, _this.math.degToRad(119), _this.math.degToRad(360 - _this.cheese_Angle_y + 119), true);
                    _this.mask_3.lineTo(0, 0);
                    _this.mask_3.endFill();
                    // Apply the mask to the circle sprite
                    _this.circleMask_3.mask = _this.mask_3;

                    _this.CheeseGroup.addChild(_this.mask_3);
                    _this.CheeseGroup.addChild(_this.circleMask_3);

                    //for blue line
                    // create a new graphics object
                    _this.triangleRemain_1 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_1.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_1.moveTo(430, 445); // Set the starting point of the triangle
                    _this.triangleRemain_1.lineTo(490, 320); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)
                    _this.triangleRemain_1.lineTo(430 + ((139 * _this.sinC) / _this.sinB), 445); // Draw the second line of the triangle
                    _this.triangleRemain_1.lineTo(430, 445);
                    _this.triangleRemain_1.endFill();

                    _this.CheeseGroup.addChild(_this.triangleRemain_1);

                    _this.CheeseGroup.scale.setTo(0.5);
                    _this.CheeseGroup.x = -170;
                    _this.CheeseGroup.y = -120;

                    _this.angle_x_1 = _this.add.text(30, 120, ('Y = ' + _this.cheese_Angle_y + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_1);

                    _this.box_1.addChild(_this.CheeseGroup);
                    _this.box_1.addChild(_this.angle_x_1);
                }
                else {
                    //finding w value
                    //for creating pink mask
                    // Create a new circle sprite
                    _this.circleMask_3 = _this.add.graphics(430 + ((139 * _this.sinC) / _this.sinB), 445);
                    _this.circleMask_3.beginFill(0xE11584);//0xE11584
                    _this.circleMask_3.drawCircle(0, 0, 79);
                    _this.circleMask_3.endFill();
                    // Create a new mask graphics object
                    _this.mask_3 = _this.add.graphics(430 + ((139 * _this.sinC) / _this.sinB), 445);
                    // Draw a sector shape on the mask graphics object
                    _this.mask_3.beginFill(0xffffff);
                    _this.mask_3.moveTo(0, 0);
                    _this.mask_3.lineTo(50, 0);
                    _this.mask_3.arc(0, 0, 20, _this.math.degToRad(180 + _this.cheese_Angle_b), _this.math.degToRad(180), true);
                    _this.mask_3.lineTo(0, 0);
                    _this.mask_3.endFill();
                    // Apply the mask to the circle sprite
                    _this.circleMask_3.mask = _this.mask_3;

                    _this.CheeseGroup.addChild(_this.mask_3);
                    _this.CheeseGroup.addChild(_this.circleMask_3);
                    // create a new graphics object
                    _this.triangleRemain_1 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_1.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_1.moveTo(430, 445); // Set the starting point of the triangle
                    _this.triangleRemain_1.lineTo(490, 320); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)
                    _this.triangleRemain_1.lineTo(430 + ((139 * _this.sinC) / _this.sinB), 445); // Draw the second line of the triangle
                    _this.triangleRemain_1.lineTo(430, 445);
                    _this.triangleRemain_1.endFill();

                    _this.CheeseGroup.addChild(_this.triangleRemain_1);

                    _this.CheeseGroup.scale.setTo(0.5);
                    _this.CheeseGroup.x = -170;
                    _this.CheeseGroup.y = -120;

                    _this.angle_x_1 = _this.add.text(30, 120, ('Y = ' + _this.cheese_Angle_b + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_1);

                    _this.box_1.addChild(_this.CheeseGroup);
                    _this.box_1.addChild(_this.angle_x_1);
                }
            }
            else {
                if (_this.objectsArray[_this.count1] == 'watermelon') {

                    if (_this.ywOrder[0] == 1) {

                        //for creating pink mask
                        // Create a new circle sprite
                        _this.circleMask_3 = _this.add.graphics(430, 445);
                        _this.circleMask_3.beginFill(0xE11584);//0xE11584
                        _this.circleMask_3.drawCircle(0, 0, 85);
                        _this.circleMask_3.endFill();
                        // Create a new mask graphics object
                        _this.mask_3 = _this.add.graphics(430, 445);
                        // Draw a sector shape on the mask graphics object
                        _this.mask_3.beginFill(0xffffff);
                        _this.mask_3.moveTo(0, 0);
                        _this.mask_3.lineTo(50, 0);
                        _this.mask_3.arc(0, 0, 60, _this.math.degToRad(0), _this.math.degToRad(360 - _this.watermelon_Angle_y), true);
                        _this.mask_3.lineTo(0, 0);
                        _this.mask_3.endFill();
                        // Apply the mask to the circle sprite
                        _this.circleMask_3.mask = _this.mask_3;

                        _this.watermelonGroup.addChild(_this.mask_3);
                        _this.watermelonGroup.addChild(_this.circleMask_3);

                        _this.watermelonGroup.scale.setTo(0.4);
                        _this.watermelonGroup.x = -140;
                        _this.watermelonGroup.y = -80;

                        _this.angle_x_1 = _this.add.text(30, 120, ('Y = ' + _this.watermelon_Angle_y + "\u{00B0}"));
                        _this.applyingStyle_blue(_this.angle_x_1);

                        _this.box_1.addChild(_this.watermelonGroup);
                        _this.box_1.addChild(_this.angle_x_1);

                        //finding y value
                        //for blue line
                        // create a new graphics object
                        _this.triangleRemain_1 = _this.add.graphics(0, 0);
                        // set the line style
                        _this.triangleRemain_1.lineStyle(4, 0x40E0D0, 1);
                        // draw the line
                        _this.triangleRemain_1.moveTo(705, 446); // Set the starting point of the triangle
                        _this.triangleRemain_1.lineTo(430, 446); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)//430 + ((272 * _this.sinC) / _this.sinB), 300
                        _this.triangleRemain_1.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB)); // Draw the second line of the triangle
                        _this.triangleRemain_1.lineTo(705, 446); // Draw the third line of the triangle to close the shape
                        _this.triangleRemain_1.endFill();

                        _this.watermelonGroup.addChild(_this.triangleRemain_1);
                    }
                    else if (_this.ywOrder[0] == 2) {
                        //for creating pink mask
                        // Create a new circle sprite
                        _this.circleMask_3 = _this.add.graphics(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));
                        _this.circleMask_3.beginFill(0xE11584);//0xE11584
                        _this.circleMask_3.drawCircle(0, 0, 79);
                        _this.circleMask_3.endFill();
                        // Create a new mask graphics object
                        _this.mask_3 = _this.add.graphics(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));
                        // Draw a sector shape on the mask graphics object
                        _this.mask_3.beginFill(0xffffff);
                        _this.mask_3.moveTo(0, 0);
                        _this.mask_3.lineTo(50, 0);
                        _this.mask_3.arc(0, 0, 20, _this.math.degToRad(230 - _this.watermelon_Angle_x), _this.math.degToRad(50), true);
                        _this.mask_3.lineTo(0, 0);
                        _this.mask_3.endFill();
                        // Apply the mask to the circle sprite
                        _this.circleMask_3.mask = _this.mask_3;

                        _this.watermelonGroup.addChild(_this.mask_3);
                        _this.watermelonGroup.addChild(_this.circleMask_3);

                        _this.watermelonGroup.scale.setTo(0.4);
                        _this.watermelonGroup.x = -140;
                        _this.watermelonGroup.y = -80;

                        _this.angle_x_1 = _this.add.text(30, 120, ('Y = ' + _this.watermelon_Angle_b + "\u{00B0}"));
                        _this.applyingStyle_blue(_this.angle_x_1);

                        _this.box_1.addChild(_this.watermelonGroup);
                        _this.box_1.addChild(_this.angle_x_1);

                        //finding y value
                        //for blue line
                        // create a new graphics object
                        _this.triangleRemain_1 = _this.add.graphics(0, 0);
                        // set the line style
                        _this.triangleRemain_1.lineStyle(4, 0x40E0D0, 1);
                        // draw the line
                        _this.triangleRemain_1.moveTo(705, 446); // Set the starting point of the triangle
                        _this.triangleRemain_1.lineTo(430, 446); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)//430 + ((272 * _this.sinC) / _this.sinB), 300
                        _this.triangleRemain_1.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB)); // Draw the second line of the triangle
                        _this.triangleRemain_1.lineTo(705, 446); // Draw the third line of the triangle to close the shape
                        _this.triangleRemain_1.endFill();

                        _this.watermelonGroup.addChild(_this.triangleRemain_1);
                    }
                    else {
                        //for creating orenge mask
                        // Create a new circle sprite
                        _this.circleMask_3 = _this.add.graphics(705 - ((185 * _this.sinV) / _this.sinW), 445 - ((185 * _this.sinV) / _this.sinW));
                        _this.circleMask_3.beginFill(0xff8c00);//0xE11584
                        _this.circleMask_3.drawCircle(0, 0, 65);
                        _this.circleMask_3.endFill();
                        // Create a new mask graphics object
                        _this.mask_3 = _this.add.graphics(705 - ((185 * _this.sinV) / _this.sinW), 445 - ((185 * _this.sinV) / _this.sinW));
                        // Draw a sector shape on the mask graphics object
                        _this.mask_3.beginFill(0xffffff);
                        _this.mask_3.moveTo(0, 0);
                        _this.mask_3.lineTo(50, 0);
                        _this.mask_3.arc(0, 0, 60, _this.math.degToRad(230), _this.math.degToRad(230 - _this.watermelon_Angle_z), true);
                        _this.mask_3.lineTo(0, 0);
                        _this.mask_3.endFill();
                        // Apply the mask to the circle sprite
                        _this.circleMask_3.mask = _this.mask_3;

                        _this.watermelonGroup.addChild(_this.mask_3);
                        _this.watermelonGroup.addChild(_this.circleMask_3);

                        _this.watermelonGroup.scale.setTo(0.4);
                        _this.watermelonGroup.x = -140;
                        _this.watermelonGroup.y = -80;

                        _this.angle_x_1 = _this.add.text(30, 120, ('Z = ' + _this.watermelon_Angle_z + "\u{00B0}"));
                        _this.applyingStyle_blue(_this.angle_x_1);

                        _this.box_1.addChild(_this.watermelonGroup);
                        _this.box_1.addChild(_this.angle_x_1);

                        //finding z value
                        //for blue line
                        // create a new graphics object
                        _this.triangleRemain_1 = _this.add.graphics(0, 0);
                        // set the line style
                        _this.triangleRemain_1.lineStyle(4, 0x40E0D0, 1);
                        // draw the line
                        _this.triangleRemain_1.moveTo(430, 446);
                        _this.triangleRemain_1.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));
                        _this.triangleRemain_1.lineTo(705 - ((185 * _this.sinV) / _this.sinW), 445 - ((185 * _this.sinV) / _this.sinW));
                        _this.triangleRemain_1.lineTo(430, 446);//draw the third line of the triangle to close the shape
                        _this.triangleRemain_1.endFill();

                        _this.watermelonGroup.addChild(_this.triangleRemain_1);
                    }

                }
            }
        }
        _this.box_1.inputEnabled = true;
        _this.box_1.input.useHandCursor = true;
        _this.box_1.events.onInputDown.add(_this.box_1Clicked, _this);

    },

    secondOptionSidePart: function () {
        console.log("secondOptionSidePart....");
        if (_this.optionOrder[0] == 2) {
            _this.box_2 = _this.add.sprite(20, _this.boxPosition_y[0], 'box');
            _this.box_2.frame = 0;
            _this.box_2.scale.setTo(0.9);
        }
        else if (_this.optionOrder[1] == 2) {
            _this.box_2 = _this.add.sprite(20, _this.boxPosition_y[1], 'box');
            _this.box_2.frame = 0;
            _this.box_2.scale.setTo(0.9);
        }
        else if (_this.optionOrder[2] == 2) {
            _this.box_2 = _this.add.sprite(20, _this.boxPosition_y[2], 'box');
            _this.box_2.frame = 0;
            _this.box_2.scale.setTo(0.9);
        }
        else {
            console.log(".....");
        }

        if (_this.count1 < 4) {
            if (_this.objectsArray[_this.count1] == 'sandwitch') {

                //for blue line
                // create a new graphics object. right side height
                _this.triangleRemain_2 = _this.add.graphics(0, 0);
                // set the line style
                _this.triangleRemain_2.lineStyle(4, 0x40E0D0, 1);
                // draw the line
                _this.triangleRemain_2.moveTo(740, 410);//straight line//x1,y1
                _this.triangleRemain_2.lineTo((485 + (_this.sandwitch_1.height * _this.tanA_1)), 410);//bottom line//x2,y2
                _this.triangleRemain_2.lineTo(485, 160);//slop line//x3,y3
                _this.triangleRemain_2.lineTo(740, 160);//straight line//x4,y4
                _this.triangleRemain_2.lineTo(740, 410);//straight line////x5,y5

                _this.triangleRemain_2.endFill();

                _this.sandwitchGroup_2.addChild(_this.triangleRemain_2);

                // _this.triangleRemain_2.scale.setTo(0.35);
                // _this.triangleRemain_2.x = -130;
                // _this.triangleRemain_2.y = -30;

                // _this.world.add(_this.triangleRemain_2);
                //for creating orange mask
                // Create a new circle sprite
                _this.circleMask_4 = _this.add.graphics((485 + (_this.sandwitch_1.height * _this.tanA_1)), 410);//(_this.sandwitch_1.height * _this.tanA)
                _this.circleMask_4.beginFill(0x40E0D0);
                _this.circleMask_4.drawCircle(0, 0, 79);
                _this.circleMask_4.endFill();

                // Create a new mask graphics object
                _this.mask_4 = _this.add.graphics((485 + (_this.sandwitch_1.height * _this.tanA_1)), 410);//(_this.sandwitch_1.height * _this.tanA)

                // Draw a sector shape on the mask graphics object
                _this.mask_4.beginFill(0xffffff);
                _this.mask_4.moveTo(0, 0);
                _this.mask_4.lineTo(50, 0);
                _this.mask_4.arc(0, 0, 20, _this.math.degToRad(0), _this.math.degToRad(360 - _this.first_Option), true);
                _this.mask_4.lineTo(0, 0);
                _this.mask_4.endFill();

                // Apply the mask to the circle sprite
                _this.circleMask_4.mask = _this.mask_4;

                _this.sandwitchGroup_2.addChild(_this.mask_4);
                _this.sandwitchGroup_2.addChild(_this.circleMask_4);
                _this.angle_x_2 = _this.add.text(30, 120, ('X = ' + _this.first_Option + "\u{00B0}"));
                _this.applyingStyle_blue(_this.angle_x_2);

                _this.sandwitchGroup_2.scale.setTo(0.4);
                _this.sandwitchGroup_2.x = -170;
                _this.sandwitchGroup_2.y = -50;

                // _this.box_2.addChild(_this.triangleRemain_2);
                // _this.box_2.addChild(_this.angle_x_2);
                // _this.box_2.addChild(_this.circleMask_4);
                // _this.box_2.addChild(_this.mask_4);
                _this.box_2.addChild(_this.sandwitchGroup_2);
                _this.box_2.addChild(_this.angle_x_2);
            }
            else if (_this.objectsArray[_this.count1] == 'waffer') {

                //for blue line
                // create a new graphics object. right side height
                _this.triangleRemain_2 = _this.add.graphics(0, 0);
                // set the line style
                _this.triangleRemain_2.lineStyle(4, 0x40E0D0, 1);
                // draw the line
                _this.triangleRemain_2.moveTo(376 + ((200 * _this.sinC_2) / _this.sinB_2), 445);//straight line//x1,y1
                _this.triangleRemain_2.lineTo(763, 445);//bottom line//x2,y2
                _this.triangleRemain_2.lineTo(690, 288);//slop line//x3,y3
                _this.triangleRemain_2.lineTo(502, 288);//straight line//x4,y4
                _this.triangleRemain_2.lineTo(376 + ((200 * _this.sinC_2) / _this.sinB_2), 445);//straight line////x5,y5

                _this.triangleRemain_2.endFill();

                _this.wafferGroup_2.addChild(_this.triangleRemain_2);
                //for creating orange mask
                // Create a new circle sprite
                _this.circleMask_4 = _this.add.graphics(376 + ((200 * _this.sinC_2) / _this.sinB_2), 445);//376 + ((200 * _this.sinC) / _this.sinB), 445
                _this.circleMask_4.beginFill(0x40E0D0);
                _this.circleMask_4.drawCircle(0, 0, 79);
                _this.circleMask_4.endFill();

                // Create a new mask graphics object
                _this.mask_4 = _this.add.graphics(376 + ((200 * _this.sinC_2) / _this.sinB_2), 445);

                // Draw a sector shape on the mask graphics object
                _this.mask_4.beginFill(0xffffff);
                _this.mask_4.moveTo(0, 0);
                _this.mask_4.lineTo(50, 0);
                _this.mask_4.arc(0, 0, 20, _this.math.degToRad(0), _this.math.degToRad(360 - _this.first_Option), true);
                _this.mask_4.lineTo(0, 0);
                _this.mask_4.endFill();

                // Apply the mask to the circle sprite
                _this.circleMask_4.mask = _this.mask_4;

                _this.wafferGroup_2.addChild(_this.mask_4);
                _this.wafferGroup_2.addChild(_this.circleMask_4);


                // _this.triangleRemain_2.scale.setTo(0.35);
                // _this.triangleRemain_2.x = -140;
                // _this.triangleRemain_2.y = -60;

                // _this.world.add(_this.triangleRemain_2);

                _this.wafferGroup_2.scale.setTo(0.4);
                _this.wafferGroup_2.x = -180;
                _this.wafferGroup_2.y = -80;

                _this.angle_x_2 = _this.add.text(30, 120, ('X = ' + _this.first_Option + "\u{00B0}"));
                _this.applyingStyle_blue(_this.angle_x_2);

                // _this.box_2.addChild(_this.triangleRemain_2);
                // _this.box_2.addChild(_this.angle_x_2);
                // _this.box_2.addChild(_this.circleMask_4);
                // _this.box_2.addChild(_this.mask_4);
                _this.box_2.addChild(_this.wafferGroup_2);
                _this.box_2.addChild(_this.angle_x_2);
            }
            else if (_this.objectsArray[_this.count1] == 'cheese') {


                //for blue line
                // create a new graphics object. right side height
                _this.triangleRemain_2 = _this.add.graphics(0, 0);
                // set the line style
                _this.triangleRemain_2.lineStyle(4, 0x40E0D0, 1);
                // draw the line
                _this.triangleRemain_2.moveTo(430 + ((139 * _this.sinC) / _this.sinB), 445);//straight line//x1,y1
                _this.triangleRemain_2.lineTo(685, 445);//bottom line//x2,y2
                _this.triangleRemain_2.lineTo(620, 320);//slop line//x3,y3
                _this.triangleRemain_2.lineTo(491, 320);//straight line//x4,y4
                _this.triangleRemain_2.lineTo(430 + ((139 * _this.sinC) / _this.sinB), 445);//straight line////x5,y5

                _this.triangleRemain_2.endFill();

                _this.CheeseGroup_2.addChild(_this.triangleRemain_2);

                //for creating orange mask
                // Create a new circle sprite
                _this.circleMask_4 = _this.add.graphics(430 + ((139 * _this.sinC) / _this.sinB), 445);//376 + ((200 * _this.sinC) / _this.sinB), 445
                _this.circleMask_4.beginFill(0x40E0D0);
                _this.circleMask_4.drawCircle(0, 0, 79);
                _this.circleMask_4.endFill();

                // Create a new mask graphics object
                _this.mask_4 = _this.add.graphics(430 + ((139 * _this.sinC) / _this.sinB), 445);

                // Draw a sector shape on the mask graphics object
                _this.mask_4.beginFill(0xffffff);
                _this.mask_4.moveTo(0, 0);
                _this.mask_4.lineTo(50, 0);
                _this.mask_4.arc(0, 0, 20, _this.math.degToRad(0), _this.math.degToRad(360 - _this.first_Option), true);
                _this.mask_4.lineTo(0, 0);
                _this.mask_4.endFill();

                // Apply the mask to the circle sprite
                _this.circleMask_4.mask = _this.mask_4;

                _this.CheeseGroup_2.addChild(_this.mask_4);
                _this.CheeseGroup_2.addChild(_this.circleMask_4);


                // _this.triangleRemain_2.scale.setTo(0.5);
                // _this.triangleRemain_2.x = -210;
                // _this.triangleRemain_2.y = -130;

                // _this.world.add(_this.triangleRemain_2);


                _this.CheeseGroup_2.scale.setTo(0.5);
                _this.CheeseGroup_2.x = -210;
                _this.CheeseGroup_2.y = -120;


                _this.angle_x_2 = _this.add.text(30, 120, ('X = ' + _this.first_Option + "\u{00B0}"));
                _this.applyingStyle_blue(_this.angle_x_2);

                // _this.box_2.addChild(_this.triangleRemain_2);
                // _this.box_2.addChild(_this.angle_x_2);
                // _this.box_2.addChild(_this.circleMask_4);
                // _this.box_2.addChild(_this.mask_4);
                _this.box_2.addChild(_this.CheeseGroup_2);
                _this.box_2.addChild(_this.angle_x_2);
            }
            else {
                if (_this.objectsArray[_this.count1] == 'watermelon') {


                    //for blue line
                    // create a new graphics object. right side height
                    _this.triangleRemain_2 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_2.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_2.moveTo(430, 445);//straight line//x1,y1
                    _this.triangleRemain_2.lineTo(430, 180);//bottom line//x2,y2
                    _this.triangleRemain_2.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));//slop line//x3,y3
                    _this.triangleRemain_2.lineTo(430, 444);//straight line//x4,y4
                    _this.triangleRemain_2.endFill();

                    _this.watermelonGroup_2.addChild(_this.triangleRemain_2);
                    //for creating orange mask
                    // Create a new circle sprite
                    _this.circleMask_4 = _this.add.graphics(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));//705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB)
                    _this.circleMask_4.beginFill(0x40E0D0);
                    _this.circleMask_4.drawCircle(0, 0, 79);
                    _this.circleMask_4.endFill();

                    // Create a new mask graphics object
                    _this.mask_4 = _this.add.graphics(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));

                    // Draw a sector shape on the mask graphics object
                    _this.mask_4.beginFill(0xffffff);
                    _this.mask_4.moveTo(0, 0);
                    _this.mask_4.lineTo(50, 0);
                    _this.mask_4.arc(0, 0, 20, _this.math.degToRad(230), _this.math.degToRad(360 - _this.first_Option + 230), true);
                    _this.mask_4.lineTo(0, 0);
                    _this.mask_4.endFill();

                    // Apply the mask to the circle sprite
                    _this.circleMask_4.mask = _this.mask_4;
                    _this.watermelonGroup_2.addChild(_this.circleMask_4);
                    _this.watermelonGroup_2.addChild(_this.mask_4);

                    _this.watermelonGroup_2.scale.setTo(0.4);
                    _this.watermelonGroup_2.x = -120;
                    _this.watermelonGroup_2.y = -65;

                    _this.angle_x_2 = _this.add.text(30, 120, ('X = ' + _this.first_Option + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_2);

                    _this.box_2.addChild(_this.watermelonGroup_2);
                    _this.box_2.addChild(_this.angle_x_2);

                }
            }
        }
        else {
            if (_this.objectsArray[_this.count1] == 'sandwitch') {
                if (_this.ywOrder[0] == 1) {
                    //for finding y
                    //for creating pink mask
                    // Create a new circle sprite
                    _this.circleMask_4 = _this.add.graphics(486, 162);
                    _this.circleMask_4.beginFill(0xE11584);//0xE11584
                    _this.circleMask_4.drawCircle(0, 0, 85);
                    _this.circleMask_4.endFill();

                    // Create a new mask graphics object
                    _this.mask_4 = _this.add.graphics(486, 162);

                    // Draw a sector shape on the mask graphics object
                    _this.mask_4.beginFill(0xffffff);
                    _this.mask_4.moveTo(0, 0);
                    _this.mask_4.lineTo(50, 0);
                    _this.mask_4.arc(0, 0, 100, _this.math.degToRad(90), _this.math.degToRad(360 - _this.first_Option + 90), true);
                    _this.mask_4.lineTo(0, 0);
                    _this.mask_4.endFill();

                    // Apply the mask to the circle sprite
                    _this.circleMask_4.mask = _this.mask_4;

                    _this.sandwitchGroup_2.addChild(_this.mask_4);
                    _this.sandwitchGroup_2.addChild(_this.circleMask_4);

                    //for blue line// create a new graphics object                    
                    _this.triangleRemain_2 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_2.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_2.moveTo(485, 410);//straight line
                    _this.triangleRemain_2.lineTo(485, 160);//straight line
                    _this.triangleRemain_2.lineTo(485 + (_this.sandwitch_1.height * _this.tanA_1), 410);//slop line
                    _this.triangleRemain_2.lineTo(485, 410);//bottom line
                    _this.triangleRemain_2.endFill();

                    _this.sandwitchGroup_2.addChild(_this.triangleRemain_2);

                    _this.sandwitchGroup_2.scale.setTo(0.4);
                    _this.sandwitchGroup_2.x = -140;
                    _this.sandwitchGroup_2.y = -50;

                    _this.angle_x_2 = _this.add.text(30, 120, ('Y = ' + _this.first_Option + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_2);

                    _this.box_2.addChild(_this.sandwitchGroup_2);
                    _this.box_2.addChild(_this.angle_x_2);
                }
                else {
                    //for finding w
                    //for creating orange mask
                    // Create a new circle sprite
                    _this.circleMask_4 = _this.add.graphics(485 + (_this.sandwitch_1.height * _this.tanA_1), 410);
                    _this.circleMask_4.beginFill(0xE11584);
                    _this.circleMask_4.drawCircle(0, 0, 79);
                    _this.circleMask_4.endFill();

                    // Create a new mask graphics object
                    _this.mask_4 = _this.add.graphics(485 + (_this.sandwitch_1.height * _this.tanA_1), 410);

                    // Draw a sector shape on the mask graphics object
                    _this.mask_4.beginFill(0xffffff);
                    _this.mask_4.moveTo(0, 0);
                    _this.mask_4.lineTo(50, 0);
                    _this.mask_4.arc(0, 0, 60, _this.math.degToRad(180), _this.math.degToRad((360 - _this.first_Option) + 310), true);
                    _this.mask_4.lineTo(0, 0);
                    _this.mask_4.endFill();

                    // Apply the mask to the circle sprite
                    _this.circleMask_4.mask = _this.mask_4;

                    _this.sandwitchGroup_2.addChild(_this.circleMask_4);
                    _this.sandwitchGroup_2.addChild(_this.mask_4);
                    //for blue line
                    // create a new graphics object
                    _this.triangleRemain_2 = _this.add.graphics(0, 0);

                    // set the line style
                    _this.triangleRemain_2.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_2.moveTo(485, 410);//straight line
                    _this.triangleRemain_2.lineTo(485, 170);//straight line
                    _this.triangleRemain_2.lineTo(485 + (_this.sandwitch_1.height * _this.tanA_1), 410);//slop line
                    _this.triangleRemain_2.lineTo(485, 410);//bottom line
                    _this.triangleRemain_2.endFill();

                    _this.sandwitchGroup_2.addChild(_this.triangleRemain_2);

                    _this.sandwitchGroup_2.scale.setTo(0.4);
                    _this.sandwitchGroup_2.x = -140;
                    _this.sandwitchGroup_2.y = -50;

                    _this.angle_x_2 = _this.add.text(30, 120, ('Y = ' + _this.first_Option + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_2);

                    _this.box_2.addChild(_this.sandwitchGroup_2);
                    _this.box_2.addChild(_this.angle_x_2);
                }

            }
            else if (_this.objectsArray[_this.count1] == 'waffer') {

                if (_this.ywOrder[0] == 1) {
                    //finding y value
                    //for creating pink mask
                    // Create a new circle sprite
                    _this.circleMask_4 = _this.add.graphics(500, 290);
                    _this.circleMask_4.beginFill(0xE11584);//0xE11584
                    _this.circleMask_4.drawCircle(0, 0, 85);
                    _this.circleMask_4.endFill();
                    // Create a new mask graphics object
                    _this.mask_4 = _this.add.graphics(500, 290);
                    // Draw a sector shape on the mask graphics object
                    _this.mask_4.beginFill(0xffffff);
                    _this.mask_4.moveTo(0, 0);
                    _this.mask_4.lineTo(50, 0);
                    _this.mask_4.arc(0, 0, 60, _this.math.degToRad(129), _this.math.degToRad(360 - _this.first_Option + 129), true);
                    _this.mask_4.lineTo(0, 0);
                    _this.mask_4.endFill();
                    // Apply the mask to the circle sprite
                    _this.circleMask_4.mask = _this.mask_4;

                    _this.wafferGroup_2.addChild(_this.mask_4);
                    _this.wafferGroup_2.addChild(_this.circleMask_4);
                    //for blue line
                    // create a new graphics object
                    _this.triangleRemain_2 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_2.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_2.moveTo(376, 445);//straight line
                    _this.triangleRemain_2.lineTo(500, 288);//straight line
                    _this.triangleRemain_2.lineTo(376 + ((200 * _this.sinC_2) / _this.sinB), 445);//slop line
                    _this.triangleRemain_2.lineTo(376, 445);
                    _this.triangleRemain_2.endFill();

                    _this.wafferGroup_2.addChild(_this.triangleRemain_2);

                    _this.wafferGroup_2.scale.setTo(0.4);
                    _this.wafferGroup_2.x = -110;
                    _this.wafferGroup_2.y = -80;

                    _this.angle_x_2 = _this.add.text(30, 120, ('Y = ' + _this.first_Option + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_2);

                    _this.box_2.addChild(_this.wafferGroup_2);
                    _this.box_2.addChild(_this.angle_x_2);
                }
                else {
                    //finding w value
                    //for creating pink mask
                    // Create a new circle sprite
                    _this.circleMask_4 = _this.add.graphics(376 + ((200 * _this.sinC) / _this.sinB_2), 445);
                    _this.circleMask_4.beginFill(0xE11584);//0xE11584
                    _this.circleMask_4.drawCircle(0, 0, 79);
                    _this.circleMask_4.endFill();
                    // Create a new mask graphics object
                    _this.mask_4 = _this.add.graphics(376 + ((200 * _this.sinC) / _this.sinB_2), 445);
                    // Draw a sector shape on the mask graphics object
                    _this.mask_4.beginFill(0xffffff);
                    _this.mask_4.moveTo(0, 0);
                    _this.mask_4.lineTo(50, 0);
                    _this.mask_4.arc(0, 0, 20, _this.math.degToRad(180 + _this.first_Option), _this.math.degToRad(180), true);
                    _this.mask_4.lineTo(0, 0);
                    _this.mask_4.endFill();
                    // Apply the mask to the circle sprite
                    _this.circleMask_4.mask = _this.mask_4;

                    _this.wafferGroup_2.addChild(_this.mask_4);
                    _this.wafferGroup_2.addChild(_this.circleMask_4);

                    //for blue line
                    // create a new graphics object
                    _this.triangleRemain_2 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_2.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_2.moveTo(376, 445);//straight line
                    _this.triangleRemain_2.lineTo(500, 288);//straight line
                    _this.triangleRemain_2.lineTo(376 + ((200 * _this.sinC) / _this.sinB_2), 445);//slop line
                    _this.triangleRemain_2.lineTo(376, 445);
                    _this.triangleRemain_2.endFill();

                    _this.wafferGroup_2.addChild(_this.triangleRemain_2);

                    _this.wafferGroup_2.scale.setTo(0.4);
                    _this.wafferGroup_2.x = -110;
                    _this.wafferGroup_2.y = -80;

                    _this.angle_x_2 = _this.add.text(30, 120, ('Y = ' + _this.first_Option + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_2);

                    _this.box_2.addChild(_this.wafferGroup_2);
                    _this.box_2.addChild(_this.angle_x_2);
                }
            }
            else if (_this.objectsArray[_this.count1] == 'cheese') {

                if (_this.ywOrder[0] == 1) {
                    //finding y value
                    //for creating pink mask
                    // Create a new circle sprite
                    _this.circleMask_4 = _this.add.graphics(490, 320);
                    _this.circleMask_4.beginFill(0xE11584);//0xE11584
                    _this.circleMask_4.drawCircle(0, 0, 85);
                    _this.circleMask_4.endFill();
                    // Create a new mask graphics object
                    _this.mask_4 = _this.add.graphics(490, 320);
                    // Draw a sector shape on the mask graphics object
                    _this.mask_4.beginFill(0xffffff);
                    _this.mask_4.moveTo(0, 0);
                    _this.mask_4.lineTo(50, 0);
                    _this.mask_4.arc(0, 0, 60, _this.math.degToRad(119), _this.math.degToRad(360 - _this.first_Option + 119), true);
                    _this.mask_4.lineTo(0, 0);
                    _this.mask_4.endFill();
                    // Apply the mask to the circle sprite
                    _this.circleMask_4.mask = _this.mask_4;

                    _this.CheeseGroup_2.addChild(_this.mask_4);
                    _this.CheeseGroup_2.addChild(_this.circleMask_4);

                    //for blue line
                    // create a new graphics object
                    _this.triangleRemain_2 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_2.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_2.moveTo(430, 445); // Set the starting point of the triangle
                    _this.triangleRemain_2.lineTo(490, 320); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)
                    _this.triangleRemain_2.lineTo(430 + ((139 * _this.sinC_2) / _this.sinB), 445); // Draw the second line of the triangle
                    _this.triangleRemain_2.lineTo(430, 445);
                    _this.triangleRemain_2.endFill();

                    _this.CheeseGroup_2.addChild(_this.triangleRemain_2);

                    _this.CheeseGroup_2.scale.setTo(0.5);
                    _this.CheeseGroup_2.x = -170;
                    _this.CheeseGroup_2.y = -120;

                    _this.angle_x_2 = _this.add.text(30, 120, ('Y = ' + _this.first_Option + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_2);

                    _this.box_2.addChild(_this.CheeseGroup_2);
                    _this.box_2.addChild(_this.angle_x_2);
                }
                else {
                    //finding w value
                    //for creating pink mask
                    // Create a new circle sprite
                    _this.circleMask_4 = _this.add.graphics(430 + ((139 * _this.sinC) / _this.sinB_2), 445);
                    _this.circleMask_4.beginFill(0xE11584);//0xE11584
                    _this.circleMask_4.drawCircle(0, 0, 79);
                    _this.circleMask_4.endFill();
                    // Create a new mask graphics object
                    _this.mask_4 = _this.add.graphics(430 + ((139 * _this.sinC) / _this.sinB_2), 445);
                    // Draw a sector shape on the mask graphics object
                    _this.mask_4.beginFill(0xffffff);
                    _this.mask_4.moveTo(0, 0);
                    _this.mask_4.lineTo(50, 0);
                    _this.mask_4.arc(0, 0, 20, _this.math.degToRad(180 + _this.first_Option), _this.math.degToRad(180), true);
                    _this.mask_4.lineTo(0, 0);
                    _this.mask_4.endFill();
                    // Apply the mask to the circle sprite
                    _this.circleMask_4.mask = _this.mask_4;

                    _this.CheeseGroup_2.addChild(_this.mask_4);
                    _this.CheeseGroup_2.addChild(_this.circleMask_4);
                    // create a new graphics object
                    _this.triangleRemain_2 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_2.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_2.moveTo(430, 445); // Set the starting point of the triangle
                    _this.triangleRemain_2.lineTo(490, 320); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)
                    _this.triangleRemain_2.lineTo(430 + ((139 * _this.sinC) / _this.sinB_2), 445); // Draw the second line of the triangle
                    _this.triangleRemain_2.lineTo(430, 445);
                    _this.triangleRemain_2.endFill();

                    _this.CheeseGroup_2.addChild(_this.triangleRemain_2);

                    _this.CheeseGroup_2.scale.setTo(0.5);
                    _this.CheeseGroup_2.x = -170;
                    _this.CheeseGroup_2.y = -120;

                    _this.angle_x_2 = _this.add.text(30, 120, ('Y = ' + _this.first_Option + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_2);

                    _this.box_2.addChild(_this.CheeseGroup_2);
                    _this.box_2.addChild(_this.angle_x_2);
                }
            }
            else {
                if (_this.objectsArray[_this.count1] == 'watermelon') {
                    if (_this.ywOrder[0] == 1) {
                        //finding y value
                        //for creating pink mask
                        // Create a new circle sprite
                        _this.circleMask_4 = _this.add.graphics(430, 445);
                        _this.circleMask_4.beginFill(0xE11584);//0xE11584
                        _this.circleMask_4.drawCircle(0, 0, 85);
                        _this.circleMask_4.endFill();
                        // Create a new mask graphics object
                        _this.mask_4 = _this.add.graphics(430, 445);
                        // Draw a sector shape on the mask graphics object
                        _this.mask_4.beginFill(0xffffff);
                        _this.mask_4.moveTo(0, 0);
                        _this.mask_4.lineTo(50, 0);
                        _this.mask_4.arc(0, 0, 60, _this.math.degToRad(0), _this.math.degToRad(360 - _this.first_Option), true);
                        _this.mask_4.lineTo(0, 0);
                        _this.mask_4.endFill();
                        // Apply the mask to the circle sprite
                        _this.circleMask_4.mask = _this.mask_4;

                        _this.watermelonGroup_2.addChild(_this.mask_4);
                        _this.watermelonGroup_2.addChild(_this.circleMask_4);
                        //for blue line
                        // create a new graphics object
                        _this.triangleRemain_2 = _this.add.graphics(0, 0);
                        // set the line style
                        _this.triangleRemain_2.lineStyle(4, 0x40E0D0, 1);
                        // draw the line
                        _this.triangleRemain_2.moveTo(705, 446); // Set the starting point of the triangle
                        _this.triangleRemain_2.lineTo(430, 446); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)//430 + ((272 * _this.sinC) / _this.sinB), 300
                        _this.triangleRemain_2.lineTo(705 - ((185 * _this.sinC_2) / _this.sinB), 445 - ((185 * _this.sinC_2) / _this.sinB)); // Draw the second line of the triangle
                        _this.triangleRemain_2.lineTo(705, 446); // Draw the third line of the triangle to close the shape
                        _this.triangleRemain_2.endFill();

                        _this.watermelonGroup_2.addChild(_this.triangleRemain_2);

                        _this.watermelonGroup_2.scale.setTo(0.4);
                        _this.watermelonGroup_2.x = -140;
                        _this.watermelonGroup_2.y = -80;

                        _this.angle_x_2 = _this.add.text(30, 120, ('Y = ' + _this.first_Option + "\u{00B0}"));
                        _this.applyingStyle_blue(_this.angle_x_2);

                        _this.box_2.addChild(_this.watermelonGroup_2);
                        _this.box_2.addChild(_this.angle_x_2);
                    }
                    else if (_this.ywOrder[0] == 2) {
                        //finding y value
                        //for creating pink mask
                        // Create a new circle sprite
                        _this.circleMask_4 = _this.add.graphics(705 - ((185 * _this.sinC) / _this.sinB_2), 445 - ((185 * _this.sinC) / _this.sinB_2));
                        _this.circleMask_4.beginFill(0xE11584);//0xE11584
                        _this.circleMask_4.drawCircle(0, 0, 79);
                        _this.circleMask_4.endFill();
                        // Create a new mask graphics object
                        _this.mask_4 = _this.add.graphics(705 - ((185 * _this.sinC) / _this.sinB_2), 445 - ((185 * _this.sinC) / _this.sinB_2));
                        // Draw a sector shape on the mask graphics object
                        _this.mask_4.beginFill(0xffffff);
                        _this.mask_4.moveTo(0, 0);
                        _this.mask_4.lineTo(50, 0);
                        _this.mask_4.arc(0, 0, 20, _this.math.degToRad(230 - (180 - _this.first_Option)), _this.math.degToRad(50), true);
                        _this.mask_4.lineTo(0, 0);
                        _this.mask_4.endFill();
                        // Apply the mask to the circle sprite
                        _this.circleMask_4.mask = _this.mask_4;

                        _this.watermelonGroup_2.addChild(_this.mask_4);
                        _this.watermelonGroup_2.addChild(_this.circleMask_4);

                        //for blue line
                        // create a new graphics object
                        _this.triangleRemain_2 = _this.add.graphics(0, 0);
                        // set the line style
                        _this.triangleRemain_2.lineStyle(4, 0x40E0D0, 1);
                        // draw the line
                        _this.triangleRemain_2.moveTo(705, 446); // Set the starting point of the triangle
                        _this.triangleRemain_2.lineTo(430, 446); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)//430 + ((272 * _this.sinC) / _this.sinB), 300
                        _this.triangleRemain_2.lineTo(705 - ((185 * _this.sinC) / _this.sinB_2), 445 - ((185 * _this.sinC) / _this.sinB_2)); // Draw the second line of the triangle
                        _this.triangleRemain_2.lineTo(705, 446); // Draw the third line of the triangle to close the shape
                        _this.triangleRemain_2.endFill();

                        _this.watermelonGroup_2.addChild(_this.triangleRemain_2);

                        _this.watermelonGroup_2.scale.setTo(0.4);
                        _this.watermelonGroup_2.x = -140;
                        _this.watermelonGroup_2.y = -80;

                        _this.angle_x_2 = _this.add.text(30, 120, ('Y = ' + _this.first_Option + "\u{00B0}"));
                        _this.applyingStyle_blue(_this.angle_x_2);

                        _this.box_2.addChild(_this.watermelonGroup_2);
                        _this.box_2.addChild(_this.angle_x_2);
                    }
                    else {
                        //for creating orenge mask
                        // Create a new circle sprite
                        _this.circleMask_4 = _this.add.graphics(705 - ((185 * _this.sinV) / _this.sinW), 445 - ((185 * _this.sinV) / _this.sinW));
                        _this.circleMask_4.beginFill(0xff8c00);//0xE11584
                        _this.circleMask_4.drawCircle(0, 0, 65);
                        _this.circleMask_4.endFill();
                        // Create a new mask graphics object
                        _this.mask_4 = _this.add.graphics(705 - ((185 * _this.sinV) / _this.sinW), 445 - ((185 * _this.sinV) / _this.sinW));
                        // Draw a sector shape on the mask graphics object
                        _this.mask_4.beginFill(0xffffff);
                        _this.mask_4.moveTo(0, 0);
                        _this.mask_4.lineTo(50, 0);
                        _this.mask_4.arc(0, 0, 60, _this.math.degToRad(230), _this.math.degToRad(230 - _this.first_Option), true);
                        _this.mask_4.lineTo(0, 0);
                        _this.mask_4.endFill();
                        // Apply the mask to the circle sprite
                        _this.circleMask_4.mask = _this.mask_4;

                        _this.watermelonGroup_2.addChild(_this.mask_4);
                        _this.watermelonGroup_2.addChild(_this.circleMask_4);

                        _this.watermelonGroup_2.scale.setTo(0.4);
                        _this.watermelonGroup_2.x = -140;
                        _this.watermelonGroup_2.y = -80;

                        _this.angle_x_2 = _this.add.text(30, 120, ('Z = ' + _this.first_Option + "\u{00B0}"));
                        _this.applyingStyle_blue(_this.angle_x_2);

                        _this.box_2.addChild(_this.watermelonGroup_2);
                        _this.box_2.addChild(_this.angle_x_2);

                        //finding z value
                        //for blue line
                        // create a new graphics object
                        _this.triangleRemain_2 = _this.add.graphics(0, 0);
                        // set the line style
                        _this.triangleRemain_2.lineStyle(4, 0x40E0D0, 1);
                        // draw the line
                        _this.triangleRemain_2.moveTo(430, 446);
                        _this.triangleRemain_2.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));
                        _this.triangleRemain_2.lineTo(705 - ((185 * _this.sinV) / _this.sinW), 445 - ((185 * _this.sinV) / _this.sinW));
                        _this.triangleRemain_2.lineTo(430, 446);//draw the third line of the triangle to close the shape
                        _this.triangleRemain_2.endFill();

                        _this.watermelonGroup_2.addChild(_this.triangleRemain_2);
                    }
                }
            }
        }

        _this.box_2.inputEnabled = true;
        _this.box_2.input.useHandCursor = true;
        _this.box_2.events.onInputDown.add(_this.box_2Clicked, _this);
    },

    thirdOptionSidePart: function () {
        console.log("thirdOptionSidePart....");
        if (_this.optionOrder[0] == 3) {
            _this.box_3 = _this.add.sprite(20, _this.boxPosition_y[0], 'box');
            _this.box_3.frame = 0;
            _this.box_3.scale.setTo(0.9);
        }
        else if (_this.optionOrder[1] == 3) {
            _this.box_3 = _this.add.sprite(20, _this.boxPosition_y[1], 'box');
            _this.box_3.frame = 0;
            _this.box_3.scale.setTo(0.9);
        }
        else if (_this.optionOrder[2] == 3) {
            _this.box_3 = _this.add.sprite(20, _this.boxPosition_y[2], 'box');
            _this.box_3.frame = 0;
            _this.box_3.scale.setTo(0.9);
        }
        else {
            console.log(".....");
        }

        if (_this.count1 < 4) {
            if (_this.objectsArray[_this.count1] == 'sandwitch') {

                //for blue line
                // create a new graphics object. right side height
                _this.triangleRemain_3 = _this.add.graphics(0, 0);
                // set the line style
                _this.triangleRemain_3.lineStyle(4, 0x40E0D0, 1);
                // draw the line
                _this.triangleRemain_3.moveTo(740, 410);//straight line//x1,y1
                _this.triangleRemain_3.lineTo((485 + (_this.sandwitch_1.height * _this.tanA_2)), 410);//bottom line//x2,y2
                _this.triangleRemain_3.lineTo(485, 160);//slop line//x3,y3
                _this.triangleRemain_3.lineTo(740, 160);//straight line//x4,y4
                _this.triangleRemain_3.lineTo(740, 410);//straight line////x5,y5

                _this.triangleRemain_3.endFill();

                _this.sandwitchGroup_3.addChild(_this.triangleRemain_3);
                //for creating orange mask
                // Create a new circle sprite
                _this.circleMask_5 = _this.add.graphics((485 + (_this.sandwitch_1.height * _this.tanA_2)), 410);//(_this.sandwitch_1.height * _this.tanA)
                _this.circleMask_5.beginFill(0x40E0D0);
                _this.circleMask_5.drawCircle(0, 0, 79);
                _this.circleMask_5.endFill();

                // Create a new mask graphics object
                _this.mask_5 = _this.add.graphics((485 + (_this.sandwitch_1.height * _this.tanA_2)), 410);//(_this.sandwitch_1.height * _this.tanA)

                // Draw a sector shape on the mask graphics object
                _this.mask_5.beginFill(0xffffff);
                _this.mask_5.moveTo(0, 0);
                _this.mask_5.lineTo(50, 0);
                _this.mask_5.arc(0, 0, 20, _this.math.degToRad(0), _this.math.degToRad(360 - _this.second_Option), true);
                _this.mask_5.lineTo(0, 0);
                _this.mask_5.endFill();

                // Apply the mask to the circle sprite
                _this.circleMask_5.mask = _this.mask_5;

                _this.sandwitchGroup_3.addChild(_this.mask_5);
                _this.sandwitchGroup_3.addChild(_this.circleMask_5);

                // _this.triangleRemain_3.scale.setTo(0.35);
                // _this.triangleRemain_3.x = -130;
                // _this.triangleRemain_3.y = -30;

                //_this.world.add(_this.triangleRemain_3);

                _this.angle_x_3 = _this.add.text(30, 120, ('X = ' + _this.second_Option + "\u{00B0}"));
                _this.applyingStyle_blue(_this.angle_x_3);

                _this.sandwitchGroup_3.scale.setTo(0.4);
                _this.sandwitchGroup_3.x = -170;
                _this.sandwitchGroup_3.y = -50;

                // _this.box_3.addChild(_this.triangleRemain_3);
                // _this.box_3.addChild(_this.angle_x_3);
                // _this.box_3.addChild(_this.circleMask_5);
                // _this.box_3.addChild(_this.mask_5);
                _this.box_3.addChild(_this.sandwitchGroup_3);
                _this.box_3.addChild(_this.angle_x_3);
            }

            else if (_this.objectsArray[_this.count1] == 'waffer') {

                //for blue line
                // create a new graphics object. right side height
                _this.triangleRemain_3 = _this.add.graphics(0, 0);
                // set the line style
                _this.triangleRemain_3.lineStyle(4, 0x40E0D0, 1);
                // draw the line
                _this.triangleRemain_3.moveTo(376 + ((200 * _this.sinC_3) / _this.sinB_3), 445);//straight line//x1,y1
                _this.triangleRemain_3.lineTo(763, 445);//bottom line//x2,y2
                _this.triangleRemain_3.lineTo(690, 288);//slop line//x3,y3
                _this.triangleRemain_3.lineTo(502, 288);//straight line//x4,y4
                _this.triangleRemain_3.lineTo(376 + ((200 * _this.sinC_3) / _this.sinB_3), 445);//straight line////x5,y5

                _this.triangleRemain_3.endFill();

                _this.wafferGroup_3.addChild(_this.triangleRemain_3);
                //for creating orange mask
                // Create a new circle sprite
                _this.circleMask_5 = _this.add.graphics(376 + ((200 * _this.sinC_3) / _this.sinB_3), 445);//376 + ((200 * _this.sinC) / _this.sinB), 445
                _this.circleMask_5.beginFill(0x40E0D0);
                _this.circleMask_5.drawCircle(0, 0, 79);
                _this.circleMask_5.endFill();

                // Create a new mask graphics object
                _this.mask_5 = _this.add.graphics(376 + ((200 * _this.sinC_3) / _this.sinB_3), 445);

                // Draw a sector shape on the mask graphics object
                _this.mask_5.beginFill(0xffffff);
                _this.mask_5.moveTo(0, 0);
                _this.mask_5.lineTo(50, 0);
                _this.mask_5.arc(0, 0, 20, _this.math.degToRad(0), _this.math.degToRad(360 - _this.second_Option), true);
                _this.mask_5.lineTo(0, 0);
                _this.mask_5.endFill();

                // Apply the mask to the circle sprite
                _this.circleMask_5.mask = _this.mask_5;

                // _this.triangleRemain_3.scale.setTo(0.35);
                // _this.triangleRemain_3.x = -140;
                // _this.triangleRemain_3.y = -60;

                // _this.world.add(_this.triangleRemain_3);

                _this.wafferGroup_3.addChild(_this.mask_5);
                _this.wafferGroup_3.addChild(_this.circleMask_5);
                _this.wafferGroup_3.scale.setTo(0.4);
                _this.wafferGroup_3.x = -180;
                _this.wafferGroup_3.y = -80;

                _this.angle_x_3 = _this.add.text(30, 120, ('X = ' + _this.second_Option + "\u{00B0}"));
                _this.applyingStyle_blue(_this.angle_x_3);

                // _this.box_3.addChild(_this.triangleRemain_3);
                // _this.box_3.addChild(_this.angle_x_3);
                // _this.box_3.addChild(_this.circleMask_5);
                // _this.box_3.addChild(_this.mask_5);
                _this.box_3.addChild(_this.wafferGroup_3);
                _this.box_3.addChild(_this.angle_x_3);
            }
            else if (_this.objectsArray[_this.count1] == 'cheese') {

                //for blue line
                // create a new graphics object. right side height
                _this.triangleRemain_3 = _this.add.graphics(0, 0);
                // set the line style
                _this.triangleRemain_3.lineStyle(4, 0x40E0D0, 1);
                // draw the line
                _this.triangleRemain_3.moveTo(430 + ((139 * _this.sinC) / _this.sinB), 445);//straight line//x1,y1
                _this.triangleRemain_3.lineTo(685, 445);//bottom line//x2,y2
                _this.triangleRemain_3.lineTo(620, 320);//slop line//x3,y3
                _this.triangleRemain_3.lineTo(491, 320);//straight line//x4,y4
                _this.triangleRemain_3.lineTo(430 + ((139 * _this.sinC) / _this.sinB), 445);//straight line////x5,y5

                _this.triangleRemain_3.endFill();

                _this.CheeseGroup_3.addChild(_this.triangleRemain_3);
                //for creating orange mask
                // Create a new circle sprite
                _this.circleMask_5 = _this.add.graphics(430 + ((139 * _this.sinC) / _this.sinB), 445);//376 + ((200 * _this.sinC) / _this.sinB), 445
                _this.circleMask_5.beginFill(0x40E0D0);
                _this.circleMask_5.drawCircle(0, 0, 79);
                _this.circleMask_5.endFill();

                // Create a new mask graphics object
                _this.mask_5 = _this.add.graphics(430 + ((139 * _this.sinC) / _this.sinB), 445);

                // Draw a sector shape on the mask graphics object
                _this.mask_5.beginFill(0xffffff);
                _this.mask_5.moveTo(0, 0);
                _this.mask_5.lineTo(50, 0);
                _this.mask_5.arc(0, 0, 20, _this.math.degToRad(0), _this.math.degToRad(360 - _this.second_Option), true);
                _this.mask_5.lineTo(0, 0);
                _this.mask_5.endFill();

                // Apply the mask to the circle sprite
                _this.circleMask_5.mask = _this.mask_5;

                // _this.triangleRemain_3.scale.setTo(0.5);
                // _this.triangleRemain_3.x = -210;
                // _this.triangleRemain_3.y = -130;

                // _this.world.add(_this.triangleRemain_3);

                _this.CheeseGroup_3.addChild(_this.mask_5);
                _this.CheeseGroup_3.addChild(_this.circleMask_5);

                _this.CheeseGroup_3.scale.setTo(0.5);
                _this.CheeseGroup_3.x = -210;
                _this.CheeseGroup_3.y = -120;

                _this.angle_x_3 = _this.add.text(30, 120, ('X = ' + _this.second_Option + "\u{00B0}"));
                _this.applyingStyle_blue(_this.angle_x_3);

                // _this.box_3.addChild(_this.triangleRemain_3);
                // _this.box_3.addChild(_this.angle_x_3);
                // _this.box_3.addChild(_this.circleMask_5);
                // _this.box_3.addChild(_this.mask_5);
                _this.box_3.addChild(_this.CheeseGroup_3);
                _this.box_3.addChild(_this.angle_x_3);
            }
            else {
                if (_this.objectsArray[_this.count1] == 'watermelon') {

                    //for blue line
                    // create a new graphics object. right side height
                    _this.triangleRemain_3 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_3.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_3.moveTo(430, 445);//straight line//x1,y1
                    _this.triangleRemain_3.lineTo(430, 180);//bottom line//x2,y2
                    _this.triangleRemain_3.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));//slop line//x3,y3
                    _this.triangleRemain_3.lineTo(430, 444);//straight line//x4,y4
                    _this.triangleRemain_3.endFill();


                    _this.watermelonGroup_3.addChild(_this.triangleRemain_3);
                    //for creating orange mask
                    // Create a new circle sprite
                    _this.circleMask_5 = _this.add.graphics(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));//705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB)
                    _this.circleMask_5.beginFill(0x40E0D0);
                    _this.circleMask_5.drawCircle(0, 0, 79);
                    _this.circleMask_5.endFill();

                    // Create a new mask graphics object
                    _this.mask_5 = _this.add.graphics(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));

                    // Draw a sector shape on the mask graphics object
                    _this.mask_5.beginFill(0xffffff);
                    _this.mask_5.moveTo(0, 0);
                    _this.mask_5.lineTo(50, 0);
                    _this.mask_5.arc(0, 0, 20, _this.math.degToRad(230), _this.math.degToRad(360 - _this.second_Option + 230), true);
                    _this.mask_5.lineTo(0, 0);
                    _this.mask_5.endFill();

                    // Apply the mask to the circle sprite
                    _this.circleMask_5.mask = _this.mask_5;
                    _this.watermelonGroup_3.addChild(_this.circleMask_5);
                    _this.watermelonGroup_3.addChild(_this.mask_5);


                    _this.watermelonGroup_3.scale.setTo(0.4);
                    _this.watermelonGroup_3.x = -120;
                    _this.watermelonGroup_3.y = -65;

                    _this.angle_x_3 = _this.add.text(30, 120, ('X = ' + _this.second_Option + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_3);

                    _this.box_3.addChild(_this.watermelonGroup_3);
                    _this.box_3.addChild(_this.angle_x_3);

                }
            }
        }
        else {
            if (_this.objectsArray[_this.count1] == 'sandwitch') {
                if (_this.ywOrder[0] == 1) {
                    //for finding y
                    //for creating pink mask
                    // Create a new circle sprite
                    _this.circleMask_5 = _this.add.graphics(486, 162);
                    _this.circleMask_5.beginFill(0xE11584);//0xE11584
                    _this.circleMask_5.drawCircle(0, 0, 85);
                    _this.circleMask_5.endFill();

                    // Create a new mask graphics object
                    _this.mask_5 = _this.add.graphics(486, 162);

                    // Draw a sector shape on the mask graphics object
                    _this.mask_5.beginFill(0xffffff);
                    _this.mask_5.moveTo(0, 0);
                    _this.mask_5.lineTo(50, 0);
                    _this.mask_5.arc(0, 0, 100, _this.math.degToRad(90), _this.math.degToRad(360 - _this.second_Option + 90), true);
                    _this.mask_5.lineTo(0, 0);
                    _this.mask_5.endFill();

                    // Apply the mask to the circle sprite
                    _this.circleMask_5.mask = _this.mask_5;

                    _this.sandwitchGroup_3.addChild(_this.mask_5);
                    _this.sandwitchGroup_3.addChild(_this.circleMask_5);
                    //for blue line// create a new graphics object                    
                    _this.triangleRemain_3 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_3.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_3.moveTo(485, 410);//straight line
                    _this.triangleRemain_3.lineTo(485, 160);//straight line
                    _this.triangleRemain_3.lineTo(485 + (_this.sandwitch_1.height * _this.tanA_2), 410);//slop line
                    _this.triangleRemain_3.lineTo(485, 410);//bottom line
                    _this.triangleRemain_3.endFill();

                    _this.sandwitchGroup_3.addChild(_this.triangleRemain_3);

                    _this.sandwitchGroup_3.scale.setTo(0.4);
                    _this.sandwitchGroup_3.x = -140;
                    _this.sandwitchGroup_3.y = -50;

                    _this.angle_x_3 = _this.add.text(30, 120, ('Y = ' + _this.second_Option + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_3);

                    _this.box_3.addChild(_this.sandwitchGroup_3);
                    _this.box_3.addChild(_this.angle_x_3);
                }
                else {
                    //for finding w
                    //for creating orange mask
                    // Create a new circle sprite
                    _this.circleMask_5 = _this.add.graphics(485 + (_this.sandwitch_1.height * _this.tanA_2), 410);
                    _this.circleMask_5.beginFill(0xE11584);
                    _this.circleMask_5.drawCircle(0, 0, 79);
                    _this.circleMask_5.endFill();

                    // Create a new mask graphics object
                    _this.mask_5 = _this.add.graphics(485 + (_this.sandwitch_1.height * _this.tanA_2), 410);

                    // Draw a sector shape on the mask graphics object
                    _this.mask_5.beginFill(0xffffff);
                    _this.mask_5.moveTo(0, 0);
                    _this.mask_5.lineTo(50, 0);
                    _this.mask_5.arc(0, 0, 60, _this.math.degToRad(180), _this.math.degToRad((360 - _this.second_Option) + 305), true);
                    _this.mask_5.lineTo(0, 0);
                    _this.mask_5.endFill();

                    // Apply the mask to the circle sprite
                    _this.circleMask_5.mask = _this.mask_5;

                    _this.sandwitchGroup_3.addChild(_this.circleMask_5);
                    _this.sandwitchGroup_3.addChild(_this.mask_5);
                    //for blue line
                    // create a new graphics object
                    _this.triangleRemain_3 = _this.add.graphics(0, 0);

                    // set the line style
                    _this.triangleRemain_3.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_3.moveTo(485, 410);//straight line
                    _this.triangleRemain_3.lineTo(485, 170);//straight line
                    _this.triangleRemain_3.lineTo(485 + (_this.sandwitch_1.height * _this.tanA_2), 410);//slop line
                    _this.triangleRemain_3.lineTo(485, 410);//bottom line
                    _this.triangleRemain_3.endFill();

                    _this.sandwitchGroup_3.addChild(_this.triangleRemain_3);


                    _this.sandwitchGroup_3.scale.setTo(0.4);
                    _this.sandwitchGroup_3.x = -140;
                    _this.sandwitchGroup_3.y = -50;

                    _this.angle_x_3 = _this.add.text(30, 120, ('Y = ' + _this.second_Option + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_3);

                    _this.box_3.addChild(_this.sandwitchGroup_3);
                    _this.box_3.addChild(_this.angle_x_3);
                }

            }
            else if (_this.objectsArray[_this.count1] == 'waffer') {

                if (_this.ywOrder[0] == 1) {
                    //finding y value
                    //for creating pink mask
                    // Create a new circle sprite
                    _this.circleMask_5 = _this.add.graphics(500, 290);
                    _this.circleMask_5.beginFill(0xE11584);//0xE11584
                    _this.circleMask_5.drawCircle(0, 0, 85);
                    _this.circleMask_5.endFill();
                    // Create a new mask graphics object
                    _this.mask_5 = _this.add.graphics(500, 290);
                    // Draw a sector shape on the mask graphics object
                    _this.mask_5.beginFill(0xffffff);
                    _this.mask_5.moveTo(0, 0);
                    _this.mask_5.lineTo(50, 0);
                    _this.mask_5.arc(0, 0, 60, _this.math.degToRad(129), _this.math.degToRad(360 - _this.second_Option + 129), true);
                    _this.mask_5.lineTo(0, 0);
                    _this.mask_5.endFill();
                    // Apply the mask to the circle sprite
                    _this.circleMask_5.mask = _this.mask_5;

                    _this.wafferGroup_3.addChild(_this.mask_5);
                    _this.wafferGroup_3.addChild(_this.circleMask_5);
                    //for blue line
                    // create a new graphics object
                    _this.triangleRemain_3 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_3.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_3.moveTo(376, 445);//straight line
                    _this.triangleRemain_3.lineTo(500, 288);//straight line
                    _this.triangleRemain_3.lineTo(376 + ((200 * _this.sinC_3) / _this.sinB), 445);//slop line
                    _this.triangleRemain_3.lineTo(376, 445);
                    _this.triangleRemain_3.endFill();

                    _this.wafferGroup_3.addChild(_this.triangleRemain_3);

                    _this.wafferGroup_3.scale.setTo(0.4);
                    _this.wafferGroup_3.x = -110;
                    _this.wafferGroup_3.y = -80;

                    _this.angle_x_3 = _this.add.text(30, 120, ('Y = ' + _this.second_Option + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_3);

                    _this.box_3.addChild(_this.wafferGroup_3);
                    _this.box_3.addChild(_this.angle_x_3);
                }
                else {
                    //finding w value
                    //for creating pink mask
                    // Create a new circle sprite
                    _this.circleMask_5 = _this.add.graphics(376 + ((200 * _this.sinC) / _this.sinB_3), 445);
                    _this.circleMask_5.beginFill(0xE11584);//0xE11584
                    _this.circleMask_5.drawCircle(0, 0, 79);
                    _this.circleMask_5.endFill();
                    // Create a new mask graphics object
                    _this.mask_5 = _this.add.graphics(376 + ((200 * _this.sinC) / _this.sinB_3), 445);
                    // Draw a sector shape on the mask graphics object
                    _this.mask_5.beginFill(0xffffff);
                    _this.mask_5.moveTo(0, 0);
                    _this.mask_5.lineTo(50, 0);
                    _this.mask_5.arc(0, 0, 20, _this.math.degToRad(180 + _this.second_Option), _this.math.degToRad(180), true);
                    _this.mask_5.lineTo(0, 0);
                    _this.mask_5.endFill();
                    // Apply the mask to the circle sprite
                    _this.circleMask_5.mask = _this.mask_5;

                    _this.wafferGroup_3.addChild(_this.mask_5);
                    _this.wafferGroup_3.addChild(_this.circleMask_5);

                    //for blue line
                    // create a new graphics object
                    _this.triangleRemain_3 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_3.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_3.moveTo(376, 445);//straight line
                    _this.triangleRemain_3.lineTo(500, 288);//straight line
                    _this.triangleRemain_3.lineTo(376 + ((200 * _this.sinC) / _this.sinB_3), 445);//slop line
                    _this.triangleRemain_3.lineTo(376, 445);
                    _this.triangleRemain_3.endFill();

                    _this.wafferGroup_3.addChild(_this.triangleRemain_3);

                    _this.wafferGroup_3.scale.setTo(0.4);
                    _this.wafferGroup_3.x = -110;
                    _this.wafferGroup_3.y = -80;

                    _this.angle_x_3 = _this.add.text(30, 120, ('Y = ' + _this.second_Option + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_3);

                    _this.box_3.addChild(_this.wafferGroup_3);
                    _this.box_3.addChild(_this.angle_x_3);
                }
            }
            else if (_this.objectsArray[_this.count1] == 'cheese') {

                if (_this.ywOrder[0] == 1) {
                    //finding y value
                    //for creating pink mask
                    // Create a new circle sprite
                    _this.circleMask_5 = _this.add.graphics(490, 320);
                    _this.circleMask_5.beginFill(0xE11584);//0xE11584
                    _this.circleMask_5.drawCircle(0, 0, 85);
                    _this.circleMask_5.endFill();
                    // Create a new mask graphics object
                    _this.mask_5 = _this.add.graphics(490, 320);
                    // Draw a sector shape on the mask graphics object
                    _this.mask_5.beginFill(0xffffff);
                    _this.mask_5.moveTo(0, 0);
                    _this.mask_5.lineTo(50, 0);
                    _this.mask_5.arc(0, 0, 60, _this.math.degToRad(119), _this.math.degToRad(360 - _this.second_Option + 119), true);
                    _this.mask_5.lineTo(0, 0);
                    _this.mask_5.endFill();
                    // Apply the mask to the circle sprite
                    _this.circleMask_5.mask = _this.mask_5;

                    _this.CheeseGroup_3.addChild(_this.mask_5);
                    _this.CheeseGroup_3.addChild(_this.circleMask_5);
                    //for blue line
                    // create a new graphics object
                    _this.triangleRemain_3 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_3.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_3.moveTo(430, 445); // Set the starting point of the triangle
                    _this.triangleRemain_3.lineTo(490, 320); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)
                    _this.triangleRemain_3.lineTo(430 + ((139 * _this.sinC_3) / _this.sinB), 445); // Draw the second line of the triangle
                    _this.triangleRemain_3.lineTo(430, 445);
                    _this.triangleRemain_3.endFill();

                    _this.CheeseGroup_3.addChild(_this.triangleRemain_3);

                    _this.CheeseGroup_3.scale.setTo(0.5);
                    _this.CheeseGroup_3.x = -170;
                    _this.CheeseGroup_3.y = -120;

                    _this.angle_x_3 = _this.add.text(30, 120, ('Y = ' + _this.second_Option + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_3);

                    _this.box_3.addChild(_this.CheeseGroup_3);
                    _this.box_3.addChild(_this.angle_x_3);
                }
                else {
                    //finding w value
                    //for creating pink mask
                    // Create a new circle sprite
                    _this.circleMask_5 = _this.add.graphics(430 + ((139 * _this.sinC) / _this.sinB_3), 445);
                    _this.circleMask_5.beginFill(0xE11584);//0xE11584
                    _this.circleMask_5.drawCircle(0, 0, 79);
                    _this.circleMask_5.endFill();
                    // Create a new mask graphics object
                    _this.mask_5 = _this.add.graphics(430 + ((139 * _this.sinC) / _this.sinB_3), 445);
                    // Draw a sector shape on the mask graphics object
                    _this.mask_5.beginFill(0xffffff);
                    _this.mask_5.moveTo(0, 0);
                    _this.mask_5.lineTo(50, 0);
                    _this.mask_5.arc(0, 0, 20, _this.math.degToRad(180 + _this.second_Option), _this.math.degToRad(180), true);
                    _this.mask_5.lineTo(0, 0);
                    _this.mask_5.endFill();
                    // Apply the mask to the circle sprite
                    _this.circleMask_5.mask = _this.mask_5;

                    _this.CheeseGroup_3.addChild(_this.mask_5);
                    _this.CheeseGroup_3.addChild(_this.circleMask_5);

                    // create a new graphics object
                    _this.triangleRemain_3 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_3.lineStyle(4, 0x40E0D0, 1);
                    // draw the line
                    _this.triangleRemain_3.moveTo(430, 445); // Set the starting point of the triangle
                    _this.triangleRemain_3.lineTo(490, 320); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)
                    _this.triangleRemain_3.lineTo(430 + ((139 * _this.sinC) / _this.sinB_3), 445); // Draw the second line of the triangle
                    _this.triangleRemain_3.lineTo(430, 445);
                    _this.triangleRemain_3.endFill();

                    _this.CheeseGroup_3.addChild(_this.triangleRemain_3);

                    _this.CheeseGroup_3.scale.setTo(0.5);
                    _this.CheeseGroup_3.x = -170;
                    _this.CheeseGroup_3.y = -120;

                    _this.angle_x_3 = _this.add.text(30, 120, ('Y = ' + _this.second_Option + "\u{00B0}"));
                    _this.applyingStyle_blue(_this.angle_x_3);

                    _this.box_3.addChild(_this.CheeseGroup_3);
                    _this.box_3.addChild(_this.angle_x_3);
                }
            }
            else {
                if (_this.objectsArray[_this.count1] == 'watermelon') {
                    if (_this.ywOrder[0] == 1) {
                        //finding y value
                        //for creating pink mask
                        // Create a new circle sprite
                        _this.circleMask_5 = _this.add.graphics(430, 445);
                        _this.circleMask_5.beginFill(0xE11584);//0xE11584
                        _this.circleMask_5.drawCircle(0, 0, 85);
                        _this.circleMask_5.endFill();
                        // Create a new mask graphics object
                        _this.mask_5 = _this.add.graphics(430, 445);
                        // Draw a sector shape on the mask graphics object
                        _this.mask_5.beginFill(0xffffff);
                        _this.mask_5.moveTo(0, 0);
                        _this.mask_5.lineTo(50, 0);
                        _this.mask_5.arc(0, 0, 60, _this.math.degToRad(0), _this.math.degToRad(360 - _this.second_Option), true);
                        _this.mask_5.lineTo(0, 0);
                        _this.mask_5.endFill();
                        // Apply the mask to the circle sprite
                        _this.circleMask_5.mask = _this.mask_5;

                        _this.watermelonGroup_3.addChild(_this.mask_5);
                        _this.watermelonGroup_3.addChild(_this.circleMask_5);
                        //for blue line
                        // create a new graphics object
                        _this.triangleRemain_3 = _this.add.graphics(0, 0);
                        // set the line style
                        _this.triangleRemain_3.lineStyle(4, 0x40E0D0, 1);
                        // draw the line
                        _this.triangleRemain_3.moveTo(705, 446); // Set the starting point of the triangle
                        _this.triangleRemain_3.lineTo(430, 446); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)//430 + ((272 * _this.sinC) / _this.sinB), 300
                        _this.triangleRemain_3.lineTo(705 - ((185 * _this.sinC_3) / _this.sinB), 445 - ((185 * _this.sinC_3) / _this.sinB)); // Draw the second line of the triangle
                        _this.triangleRemain_3.lineTo(705, 446); // Draw the third line of the triangle to close the shape
                        _this.triangleRemain_3.endFill();

                        _this.watermelonGroup_3.addChild(_this.triangleRemain_3);

                        _this.watermelonGroup_3.scale.setTo(0.4);
                        _this.watermelonGroup_3.x = -140;
                        _this.watermelonGroup_3.y = -80;

                        _this.angle_x_3 = _this.add.text(30, 120, ('Y = ' + _this.second_Option + "\u{00B0}"));
                        _this.applyingStyle_blue(_this.angle_x_3);

                        _this.box_3.addChild(_this.watermelonGroup_3);
                        _this.box_3.addChild(_this.angle_x_3);
                    }
                    else if (_this.ywOrder[0] == 2) {
                        //finding y value
                        //for creating pink mask
                        // Create a new circle sprite
                        _this.circleMask_5 = _this.add.graphics(705 - ((185 * _this.sinC) / _this.sinB_3), 445 - ((185 * _this.sinC) / _this.sinB_3));
                        _this.circleMask_5.beginFill(0xE11584);//0xE11584
                        _this.circleMask_5.drawCircle(0, 0, 79);
                        _this.circleMask_5.endFill();
                        // Create a new mask graphics object
                        _this.mask_5 = _this.add.graphics(705 - ((185 * _this.sinC) / _this.sinB_3), 445 - ((185 * _this.sinC) / _this.sinB_3));
                        // Draw a sector shape on the mask graphics object
                        _this.mask_5.beginFill(0xffffff);
                        _this.mask_5.moveTo(0, 0);
                        _this.mask_5.lineTo(50, 0);
                        _this.mask_5.arc(0, 0, 20, _this.math.degToRad(230 - (180 - _this.second_Option)), _this.math.degToRad(50), true);
                        _this.mask_5.lineTo(0, 0);
                        _this.mask_5.endFill();
                        // Apply the mask to the circle sprite
                        _this.circleMask_5.mask = _this.mask_5;

                        _this.watermelonGroup_3.addChild(_this.mask_5);
                        _this.watermelonGroup_3.addChild(_this.circleMask_5);
                        //for blue line
                        // create a new graphics object
                        _this.triangleRemain_3 = _this.add.graphics(0, 0);
                        // set the line style
                        _this.triangleRemain_3.lineStyle(4, 0x40E0D0, 1);
                        // draw the line
                        _this.triangleRemain_3.moveTo(705, 446); // Set the starting point of the triangle
                        _this.triangleRemain_3.lineTo(430, 446); // Draw the first line of the triangle//376 + ((200 * _this.sinA) / _this.sinB)//430 + ((272 * _this.sinC) / _this.sinB), 300
                        _this.triangleRemain_3.lineTo(705 - ((185 * _this.sinC) / _this.sinB_3), 445 - ((185 * _this.sinC) / _this.sinB_3)); // Draw the second line of the triangle
                        _this.triangleRemain_3.lineTo(705, 446); // Draw the third line of the triangle to close the shape
                        _this.triangleRemain_3.endFill();

                        _this.watermelonGroup_3.addChild(_this.triangleRemain_3);

                        _this.watermelonGroup_3.scale.setTo(0.4);
                        _this.watermelonGroup_3.x = -140;
                        _this.watermelonGroup_3.y = -80;

                        _this.angle_x_3 = _this.add.text(30, 120, ('Y = ' + _this.second_Option + "\u{00B0}"));
                        _this.applyingStyle_blue(_this.angle_x_3);

                        _this.box_3.addChild(_this.watermelonGroup_3);
                        _this.box_3.addChild(_this.angle_x_3);
                    }
                    else {
                        //for creating orenge mask
                        // Create a new circle sprite
                        _this.circleMask_5 = _this.add.graphics(705 - ((185 * _this.sinV) / _this.sinW), 445 - ((185 * _this.sinV) / _this.sinW));
                        _this.circleMask_5.beginFill(0xff8c00);//0xE11584
                        _this.circleMask_5.drawCircle(0, 0, 65);
                        _this.circleMask_5.endFill();
                        // Create a new mask graphics object
                        _this.mask_5 = _this.add.graphics(705 - ((185 * _this.sinV) / _this.sinW), 445 - ((185 * _this.sinV) / _this.sinW));
                        // Draw a sector shape on the mask graphics object
                        _this.mask_5.beginFill(0xffffff);
                        _this.mask_5.moveTo(0, 0);
                        _this.mask_5.lineTo(50, 0);
                        _this.mask_5.arc(0, 0, 60, _this.math.degToRad(230), _this.math.degToRad(230 - _this.second_Option), true);
                        _this.mask_5.lineTo(0, 0);
                        _this.mask_5.endFill();
                        // Apply the mask to the circle sprite
                        _this.circleMask_5.mask = _this.mask_5;

                        _this.watermelonGroup_3.addChild(_this.mask_5);
                        _this.watermelonGroup_3.addChild(_this.circleMask_5);

                        _this.watermelonGroup_3.scale.setTo(0.4);
                        _this.watermelonGroup_3.x = -140;
                        _this.watermelonGroup_3.y = -80;

                        _this.angle_x_3 = _this.add.text(30, 120, ('Z = ' + _this.second_Option + "\u{00B0}"));
                        _this.applyingStyle_blue(_this.angle_x_3);

                        _this.box_3.addChild(_this.watermelonGroup_3);
                        _this.box_3.addChild(_this.angle_x_3);

                        //finding z value
                        //for blue line
                        // create a new graphics object
                        _this.triangleRemain_3 = _this.add.graphics(0, 0);
                        // set the line style
                        _this.triangleRemain_3.lineStyle(4, 0x40E0D0, 1);
                        // draw the line
                        _this.triangleRemain_3.moveTo(430, 446);
                        _this.triangleRemain_3.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));
                        _this.triangleRemain_3.lineTo(705 - ((185 * _this.sinV) / _this.sinW), 445 - ((185 * _this.sinV) / _this.sinW));
                        _this.triangleRemain_3.lineTo(430, 446);//draw the third line of the triangle to close the shape
                        _this.triangleRemain_3.endFill();

                        _this.watermelonGroup_3.addChild(_this.triangleRemain_3);
                    }
                }
            }
        }

        _this.box_3.inputEnabled = true;
        _this.box_3.input.useHandCursor = true;
        _this.box_3.events.onInputDown.add(_this.box_3Clicked, _this);
    },

    //it draw the remaining part of the triangle in the sandwitch
    correctOptionPart: function () {
        if (_this.objectsArray[_this.count1] == 'sandwitch') {
            if (_this.sandwitchOrder[0] == 1) {
                // Create a tween to scale and move the group
                var tween = _this.add.tween(_this.parent);
                tween.to({ x: 488, y: 160, alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(function () {
                    // _this.parent.scale.setTo(2);
                    _this.parent.destroy();
                    //for creating orange mask
                    // Create a new circle sprite
                    _this.circleMask_6 = _this.add.graphics((485 + (_this.sandwitch_1.height * _this.tanA)), 410);//(_this.sandwitch_1.height * _this.tanA)
                    _this.circleMask_6.beginFill(0x40E0D0);
                    _this.circleMask_6.drawCircle(0, 0, 79);
                    _this.circleMask_6.endFill();

                    // Create a new mask graphics object
                    _this.mask_6 = _this.add.graphics((485 + (_this.sandwitch_1.height * _this.tanA)), 410);//(_this.sandwitch_1.height * _this.tanA)

                    // Draw a sector shape on the mask graphics object
                    _this.mask_6.beginFill(0xffffff);
                    _this.mask_6.moveTo(0, 0);
                    _this.mask_6.lineTo(50, 0);
                    _this.mask_6.arc(0, 0, 20, _this.math.degToRad(0), _this.math.degToRad(360 - _this.angle_x), true);
                    _this.mask_6.lineTo(0, 0);
                    _this.mask_6.endFill();

                    // Apply the mask to the circle sprite
                    _this.circleMask_6.mask = _this.mask_6;

                    _this.sandwitchGroup_4.addChild(_this.circleMask_6);
                    _this.sandwitchGroup_4.addChild(_this.mask_6);

                    //for blue line
                    // create a new graphics object. right side height
                    _this.triangleRemain_4 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_4.lineStyle(4, 0x40E0D0, 1);
                    _this.triangleRemain_4.beginFill(0xFFFF00);//yellow color
                    // draw the line
                    _this.triangleRemain_4.moveTo(740, 410);//straight line//x1,y1
                    _this.triangleRemain_4.lineTo((485 + (_this.sandwitch_1.height * _this.tanA)), 410);//bottom line//x2,y2
                    _this.triangleRemain_4.lineTo(488, 160);//slop line//x3,y3
                    _this.triangleRemain_4.lineTo(740, 160);//straight line//x4,y4
                    _this.triangleRemain_4.lineTo(740, 410);//straight line////x5,y5

                    _this.triangleRemain_4.endFill();

                    _this.sandwitchGroup_4.addChild(_this.triangleRemain_4);

                    _this.angle_x_4 = _this.add.text((485 + (_this.sandwitch_1.height * _this.tanA)), 340, ('X = ' + _this.angle_x + "\u{00B0}"));
                    _this.applyingStyle_blue_2(_this.angle_x_4);
                    _this.sandwitchGroup_4.addChild(_this.angle_x_4);

                    //this is done for the second screen triangle scale increasing.
                    var initialX = _this.sandwitchGroup_4.x + 100;
                    var initialY = _this.sandwitchGroup_4.y + 50;

                    var scaleTween = _this.add.tween(_this.sandwitchGroup_4.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None, true);// tween for scale increasing
                    var positionBackTween = _this.add.tween(_this.sandwitchGroup_4).to({ x: initialX, y: initialY }, 1000, Phaser.Easing.Linear.None);// tween for x and y position fixing

                    scaleTween.start();
                    positionBackTween.start();
                    scaleTween.onComplete.add(function () {
                        _this.time.events.add(800, () => {
                            _this.sandwitchShowingScreen();
                            _this.gameSound.play();
                        });
                    });
                });
            }

            if (_this.sandwitchOrder[0] == 2) {

                // Create a tween to scale and move the group
                var tween = _this.add.tween(_this.parent);
                tween.to({ x: 485, y: 360, alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(function () {
                    // _this.parent.scale.setTo(2);
                    _this.parent.destroy();
                    //for blue line
                    // create a new graphics object. right side height
                    _this.triangleRemain_4 = _this.add.graphics(0, 0);
                    // set the line style
                    _this.triangleRemain_4.lineStyle(4, 0x40E0D0, 1);
                    _this.triangleRemain_4.beginFill(0xFFFF00);//yellow color
                    // draw the line
                    _this.triangleRemain_4.moveTo(737, 410);//straight line//x1,y1
                    _this.triangleRemain_4.lineTo(737, 160);//slop line//x3,y3
                    _this.triangleRemain_4.lineTo(485, 160);//straight line//x4,y4
                    _this.triangleRemain_4.lineTo(485, 410);//straight line////x5,y5
                    _this.triangleRemain_4.lineTo(737, 430 - (_this.sandwitch_1.height * _this.tanA));//bottom line//x2,y2

                    _this.triangleRemain_4.endFill();
                    _this.sandwitchGroup_4.addChild(_this.triangleRemain_4);

                    //for creating orange mask
                    // Create a new circle sprite
                    _this.circleMask_6 = _this.add.graphics(737, 430 - (_this.sandwitch_1.height * _this.tanA));//(_this.sandwitch_1.height * _this.tanA)
                    _this.circleMask_6.beginFill(0x40E0D0);
                    _this.circleMask_6.drawCircle(0, 0, 79);
                    _this.circleMask_6.endFill();

                    // Create a new mask graphics object
                    _this.mask_6 = _this.add.graphics(737, 430 - (_this.sandwitch_1.height * _this.tanA));//(_this.sandwitch_1.height * _this.tanA)

                    // Draw a sector shape on the mask graphics object
                    _this.mask_6.beginFill(0xffffff);
                    _this.mask_6.moveTo(0, 0);
                    _this.mask_6.lineTo(50, 0);
                    _this.mask_6.arc(0, 0, 20, _this.math.degToRad(270), _this.math.degToRad(270 - _this.angle_x), true);
                    _this.mask_6.lineTo(0, 0);
                    _this.mask_6.endFill();

                    // Apply the mask to the circle sprite
                    _this.circleMask_6.mask = _this.mask_6;

                    _this.sandwitchGroup_4.addChild(_this.circleMask_6);
                    _this.sandwitchGroup_4.addChild(_this.mask_6);

                    _this.angle_x_4 = _this.add.text(650, 390 - (_this.sandwitch_1.height * _this.tanA), ('X = ' + _this.angle_x + "\u{00B0}"));
                    _this.applyingStyle_blue_2(_this.angle_x_4);
                    _this.sandwitchGroup_4.addChild(_this.angle_x_4);

                    //this is done for the second screen triangle scale increasing.
                    var initialX = _this.sandwitchGroup_4.x + 100;
                    var initialY = _this.sandwitchGroup_4.y + 50;

                    var scaleTween = _this.add.tween(_this.sandwitchGroup_4.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None, true);// tween for scale increasing
                    var positionBackTween = _this.add.tween(_this.sandwitchGroup_4).to({ x: initialX, y: initialY }, 1000, Phaser.Easing.Linear.None);// tween for x and y position fixing

                    scaleTween.start();
                    positionBackTween.start();
                    scaleTween.onComplete.add(function () {
                        _this.time.events.add(800, () => {
                            _this.sandwitchShowingScreen();
                            _this.gameSound.play();
                        });
                    });
                });

            }

            // _this.sandwitchShowingScreen();

        }
        else if (_this.objectsArray[_this.count1] == 'waffer') {

            // Create a tween to scale and move the group
            var tween = _this.add.tween(_this.parent);
            tween.to({ x: 502, y: 288, alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(function () {
                // _this.parent.scale.setTo(2);
                _this.parent.destroy();
                //for blue line
                // create a new graphics object. right side height
                _this.triangleRemain_4 = _this.add.graphics(0, 0);
                // set the line style
                _this.triangleRemain_4.lineStyle(4, 0x40E0D0, 1);
                _this.triangleRemain_4.beginFill(0xFFFF00);//yellow color
                // draw the line
                _this.triangleRemain_4.moveTo(376 + ((200 * _this.sinC) / _this.sinB), 445);//straight line//x1,y1
                _this.triangleRemain_4.lineTo(763, 445);//bottom line//x2,y2
                _this.triangleRemain_4.lineTo(690, 288);//slop line//x3,y3
                _this.triangleRemain_4.lineTo(502, 288);//straight line//x4,y4
                _this.triangleRemain_4.lineTo(376 + ((200 * _this.sinC) / _this.sinB), 445);//straight line////x5,y5

                _this.triangleRemain_4.endFill();

                _this.wafferGroup_4.addChild(_this.triangleRemain_4);

                console.log(_this.triangleRemain_4.scale, "scale...");

                //for creating orange mask
                // Create a new circle sprite
                _this.circleMask_6 = _this.add.graphics(376 + ((200 * _this.sinC) / _this.sinB), 445);//376 + ((200 * _this.sinC) / _this.sinB), 445
                _this.circleMask_6.beginFill(0x40E0D0);
                _this.circleMask_6.drawCircle(0, 0, 79);
                _this.circleMask_6.endFill();

                // Create a new mask graphics object
                _this.mask_6 = _this.add.graphics(376 + ((200 * _this.sinC) / _this.sinB), 445);

                // Draw a sector shape on the mask graphics object
                _this.mask_6.beginFill(0xffffff);
                _this.mask_6.moveTo(0, 0);
                _this.mask_6.lineTo(50, 0);
                _this.mask_6.arc(0, 0, 20, _this.math.degToRad(0), _this.math.degToRad(360 - _this.waffer_Angle_x), true);
                _this.mask_6.lineTo(0, 0);
                _this.mask_6.endFill();

                // Apply the mask to the circle sprite
                _this.circleMask_6.mask = _this.mask_6;

                _this.wafferGroup_4.addChild(_this.circleMask_6);
                _this.wafferGroup_4.addChild(_this.mask_6);

                _this.angle_x_4 = _this.add.text(376 + ((200 * _this.sinC) / _this.sinB), 390, ('X = ' + _this.waffer_Angle_x + "\u{00B0}"));
                _this.wafferGroup_4.addChild(_this.angle_x_4);
                _this.applyingStyle_blue_2(_this.angle_x_4);

                //this is done for the second screen triangle scale increasing.
                var initialX = _this.wafferGroup_4.x + 300;
                var initialY = _this.wafferGroup_4.y + 250;

                var scaleTween = _this.add.tween(_this.wafferGroup_4.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None, true);// tween for scale increasing
                var positionBackTween = _this.add.tween(_this.wafferGroup_4).to({ x: initialX, y: initialY }, 1000, Phaser.Easing.Linear.None);// tween for x and y position fixing

                scaleTween.start();
                positionBackTween.start();

                scaleTween.onComplete.add(function () {
                    _this.time.events.add(800, () => {
                        _this.wafferShowingScreen();
                        _this.gameSound.play();
                    });
                });

            });



            //  _this.wafferShowingScreen();

        }
        else if (_this.objectsArray[_this.count1] == 'cheese') {
            // Create a tween to scale and move the group
            var tween = _this.add.tween(_this.parent);
            tween.to({ x: 502, y: 288, alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(function () {
                // _this.parent.scale.setTo(2);
                _this.parent.destroy();
                //for blue line
                // create a new graphics object. right side height
                _this.triangleRemain_4 = _this.add.graphics(0, 0);
                // set the line style
                _this.triangleRemain_4.lineStyle(4, 0x40E0D0, 1);
                _this.triangleRemain_4.beginFill(0xFFFF00);//yellow color
                // draw the line
                _this.triangleRemain_4.moveTo(430 + ((139 * _this.sinC) / _this.sinB), 445);//straight line//x1,y1
                _this.triangleRemain_4.lineTo(685, 445);//bottom line//x2,y2
                _this.triangleRemain_4.lineTo(620, 320);//slop line//x3,y3
                _this.triangleRemain_4.lineTo(492, 320);//straight line//x4,y4
                _this.triangleRemain_4.lineTo(430 + ((139 * _this.sinC) / _this.sinB), 445);//straight line////x5,y5

                _this.triangleRemain_4.endFill();

                _this.CheeseGroup_4.addChild(_this.triangleRemain_4);

                //for creating orange mask
                // Create a new circle sprite
                _this.circleMask_6 = _this.add.graphics(430 + ((139 * _this.sinC) / _this.sinB), 445);//376 + ((200 * _this.sinC) / _this.sinB), 445
                _this.circleMask_6.beginFill(0x40E0D0);
                _this.circleMask_6.drawCircle(0, 0, 79);
                _this.circleMask_6.endFill();

                // Create a new mask graphics object
                _this.mask_6 = _this.add.graphics(430 + ((139 * _this.sinC) / _this.sinB), 445);

                // Draw a sector shape on the mask graphics object
                _this.mask_6.beginFill(0xffffff);
                _this.mask_6.moveTo(0, 0);
                _this.mask_6.lineTo(50, 0);
                _this.mask_6.arc(0, 0, 20, _this.math.degToRad(0), _this.math.degToRad(360 - _this.cheese_Angle_x), true);
                _this.mask_6.lineTo(0, 0);
                _this.mask_6.endFill();

                // Apply the mask to the circle sprite
                _this.circleMask_6.mask = _this.mask_6;

                _this.CheeseGroup_4.addChild(_this.circleMask_6);
                _this.CheeseGroup_4.addChild(_this.mask_6);

                _this.angle_x_4 = _this.add.text(430 + ((139 * _this.sinC) / _this.sinB) + 10, 400, ('X = ' + _this.cheese_Angle_x + "\u{00B0}"));
                _this.applyingStyle_blue_2(_this.angle_x_4);
                _this.CheeseGroup_4.addChild(_this.angle_x_4);

                //this is done for the second screen triangle scale increasing.
                var initialX = _this.CheeseGroup_4.x + 300;
                var initialY = _this.CheeseGroup_4.y + 280;

                var scaleTween = _this.add.tween(_this.CheeseGroup_4.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None, true);// tween for scale increasing
                var positionBackTween = _this.add.tween(_this.CheeseGroup_4).to({ x: initialX, y: initialY }, 1000, Phaser.Easing.Linear.None);// tween for x and y position fixing

                scaleTween.start();
                positionBackTween.start();

                scaleTween.onComplete.add(function () {
                    _this.time.events.add(800, () => {
                        _this.cheeseShowingScreen();
                        _this.gameSound.play();
                    });
                });

            });

        }
        else if (_this.objectsArray[_this.count1] == 'watermelon') {
            // Create a tween to scale and move the group
            var tween = _this.add.tween(_this.parent);
            tween.to({ x: 430, y: 445 - ((185 * _this.sinC) / _this.sinB), alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(function () {
                // _this.parent.scale.setTo(2);
                _this.parent.destroy();
                //for blue line
                // create a new graphics object. right side height
                _this.triangleRemain_4 = _this.add.graphics(0, 0);
                // set the line style
                _this.triangleRemain_4.lineStyle(4, 0x40E0D0, 1);
                _this.triangleRemain_4.beginFill(0xFFFF00);//yellow color
                // draw the line
                _this.triangleRemain_4.moveTo(430, 445);//straight line//x1,y1
                _this.triangleRemain_4.lineTo(430, 180);//bottom line//x2,y2
                _this.triangleRemain_4.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));//slop line//x3,y3
                _this.triangleRemain_4.lineTo(430, 444);//straight line//x4,y4
                _this.triangleRemain_4.endFill();

                _this.watermelonGroup_4.addChild(_this.triangleRemain_4);

                //for creating orange mask
                // Create a new circle sprite
                _this.circleMask_6 = _this.add.graphics(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));//705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB)
                _this.circleMask_6.beginFill(0x40E0D0);
                _this.circleMask_6.drawCircle(0, 0, 79);
                _this.circleMask_6.endFill();

                // Create a new mask graphics object
                _this.mask_6 = _this.add.graphics(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));//705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB)

                // Draw a sector shape on the mask graphics object
                _this.mask_6.beginFill(0xffffff);
                _this.mask_6.moveTo(0, 0);
                _this.mask_6.lineTo(50, 0);
                _this.mask_6.arc(0, 0, 20, _this.math.degToRad(230), _this.math.degToRad(360 - _this.watermelon_Angle_x + 230), true);
                _this.mask_6.lineTo(0, 0);
                _this.mask_6.endFill();

                // Apply the mask to the circle sprite
                _this.circleMask_6.mask = _this.mask_6;

                _this.watermelonGroup_4.addChild(_this.circleMask_6);
                _this.watermelonGroup_4.addChild(_this.mask_6);

                _this.angle_x_4 = _this.add.text(610 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB), ('X = ' + _this.watermelon_Angle_x + "\u{00B0}"));
                _this.watermelonGroup_4.addChild(_this.angle_x_4);
                _this.applyingStyle_blue_2(_this.angle_x_4);

                //this is done for the second screen triangle scale increasing.
                var initialX = _this.watermelonGroup_4.x + 150;
                var initialY = _this.watermelonGroup_4.y + 100;

                var scaleTween = _this.add.tween(_this.watermelonGroup_4.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None, true);// tween for scale increasing
                var positionBackTween = _this.add.tween(_this.watermelonGroup_4).to({ x: initialX, y: initialY }, 1000, Phaser.Easing.Linear.None);// tween for x and y position fixing

                scaleTween.start();
                positionBackTween.start();

                scaleTween.onComplete.add(function () {
                    _this.time.events.add(800, () => {
                        _this.melonShowingScreen();
                        _this.gameSound.play();
                    });
                });
            });
        }
    },

    box_1Clicked: function () {
        _this.clickSound.play();

        if (_this.box_1.frame == 1)
            _this.box_1.frame = 0;
        else {
            _this.box_1.frame = 1;
            _this.box_2.frame = 0;
            _this.box_3.frame = 0;
        }
    },
    box_2Clicked: function () {
        _this.clickSound.play();

        if (_this.box_2.frame == 1) {
            _this.box_2.frame = 0;
        }
        else {
            _this.box_1.frame = 0;
            _this.box_2.frame = 1;
            _this.box_3.frame = 0;
        }
    },
    box_3Clicked: function () {
        _this.clickSound.play();
        if (_this.box_3.frame == 1)
            _this.box_3.frame = 0;
        else {
            _this.box_1.frame = 0;
            _this.box_2.frame = 0;
            _this.box_3.frame = 1;
        }
    },

    tickEvaluation: function () {
        if (_this.box_1.frame == 1) {
            _this.noofAttempts++;
            _this.counterCelebrationSound.play();
            if (_this.objectsArray[_this.count1] == 'waffer') {
                // Add the image group to a new parent object
                _this.parent = _this.add.group();
                _this.parent.add(_this.wafferGroup);
                _this.parent.x = 20;
                _this.parent.y = _this.box_1.y;
                console.log(_this.parent.scale, "scale...");
            }
            if (_this.objectsArray[_this.count1] == 'cheese') {
                // Add the image group to a new parent object
                _this.parent = _this.add.group();
                _this.parent.add(_this.CheeseGroup);
                _this.parent.x = 20;
                _this.parent.y = _this.box_1.y;
                console.log(_this.parent.scale, "scale...");
            }
            if (_this.objectsArray[_this.count1] == 'watermelon') {
                // Add the image group to a new parent object
                _this.parent = _this.add.group();
                _this.parent.add(_this.watermelonGroup);
                _this.parent.x = 20;
                _this.parent.y = _this.box_1.y;
                console.log(_this.parent.scale, "scale...");
            }
            if (_this.objectsArray[_this.count1] == 'sandwitch') {
                // Add the image group to a new parent object
                _this.parent = _this.add.group();
                _this.parent.add(_this.sandwitchGroup);
                _this.parent.x = 20;
                _this.parent.y = _this.box_1.y;
                //  _this.triangleRemain_1.anchor.setTo(0.5, 0.5);     
                // Rotate the object by setting the angle property
                if (_this.sandwitchOrder[0] == 2) {
                    _this.parent.angle = 270;
                    _this.parent.x = 20;
                    _this.parent.y = _this.box_1.y + 80;
                }
                console.log(_this.parent.scale, "scale...");
            }

            _this.box_1.destroy();
            //_this.box_1.alpha = 0;
            _this.box_2.destroy();
            _this.box_3.destroy();
            //  _this.triangleRemain_1.destroy();
            _this.angle_x_1.destroy();
            //  _this.circleMask_3.destroy();
            // _this.mask_3.destroy();
            _this.mask_4.destroy();
            _this.mask_5.destroy();
            _this.triangleRemain_2.destroy();
            _this.angle_x_2.destroy();
            _this.circleMask_4.destroy();
            _this.triangleRemain_3.destroy();
            _this.angle_x_3.destroy();
            _this.circleMask_5.destroy();
            _this.tick.destroy();

            if (_this.count1 < 4) {
                _this.correctOptionPart();
                _this.exterior_x.destroy();
            }
            else {
                if (_this.objectsArray[_this.count1] == 'sandwitch') {
                    if (_this.sandwitchOrder[0] == 2) {
                        var tween = _this.add.tween(_this.parent);
                        tween.to({ x: 485, y: 400, alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
                        tween.onComplete.add(function () {
                            // _this.parent.scale.setTo(2);
                            _this.parent.destroy();
                            _this.sandwichTriangle_2.alpha = 1;
                        });
                    }
                    else {
                        var tween = _this.add.tween(_this.parent);
                        tween.to({ x: 485, y: 300, alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
                        tween.onComplete.add(function () {
                            // _this.parent.scale.setTo(2);
                            _this.parent.destroy();
                            _this.sandwichTriangle_2.alpha = 1;
                        });
                    }
                    //  _this.partBSandwitchShow();
                    if (_this.ywOrder[0] == 1) {
                        _this.interiar_y.destroy();
                        if (_this.sandwitchOrder[0] == 1) {
                            _this.angle_x_4 = _this.add.text(493, 230, _this.angle_y + "\u{00B0}");
                            _this.applyingStyle_Pink(_this.angle_x_4);
                            _this.sandwitchGroup_4.addChild(_this.angle_x_4);
                            _this.angle_x_4.fontSize = '18px';
                        }
                        if (_this.sandwitchOrder[0] == 2) {
                            _this.angle_x_4 = _this.add.text(560, 385, _this.angle_y + "\u{00B0}");
                            _this.applyingStyle_Pink(_this.angle_x_4);
                            _this.sandwitchGroup_4.addChild(_this.angle_x_4);
                            _this.angle_x_4.fontSize = '18px';
                        }
                    }
                    else {
                        _this.interiar_w.destroy();
                        if (_this.sandwitchOrder[0] == 1) {
                            _this.angle_x_4 = _this.add.text(430 + (_this.sandwitch_1.height * _this.tanA), 380, (_this.angle_w + "\u{00B0}"));
                            _this.applyingStyle_Pink(_this.angle_x_4);
                            _this.sandwitchGroup_4.addChild(_this.angle_x_4);
                            _this.angle_x_4.fontSize = '18px';
                        }
                        if (_this.sandwitchOrder[0] == 2) {
                            _this.angle_x_4 = _this.add.text(708, 460 - (_this.sandwitch_1.height * _this.tanA), (_this.angle_w + "\u{00B0}"));
                            _this.applyingStyle_Pink(_this.angle_x_4);
                            _this.sandwitchGroup_4.addChild(_this.angle_x_4);
                            _this.angle_x_4.fontSize = '18px';
                        }
                    }
                    _this.time.events.add(800, () => {
                        _this.partBSandwitchShow();
                        _this.gameSound.play();
                    });
                }
                if (_this.objectsArray[_this.count1] == 'waffer') {
                    var tween = _this.add.tween(_this.parent);
                    tween.to({ x: 376, y: 288, alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
                    tween.onComplete.add(function () {
                        // _this.parent.scale.setTo(2);
                        _this.parent.destroy();
                        _this.wfTriangle_2.alpha = 1;
                    });

                    if (_this.ywOrder[0] == 1) {
                        _this.interiar_y.destroy();
                        _this.angle_x_4 = _this.add.text(475, 335, _this.waffer_Angle_y + "\u{00B0}");
                        _this.applyingStyle_Pink(_this.angle_x_4);
                        _this.wafferGroup_4.addChild(_this.angle_x_4);
                        _this.angle_x_4.fontSize = '18px';
                    }
                    else {
                        _this.interiar_w.destroy();
                        _this.angle_x_4 = _this.add.text(376 + ((200 * _this.sinC) / _this.sinB) - 60, 400, _this.waffer_Angle_b + "\u{00B0}");
                        _this.applyingStyle_Pink(_this.angle_x_4);
                        _this.wafferGroup_4.addChild(_this.angle_x_4);
                        _this.angle_x_4.fontSize = '18px';
                    }
                    _this.time.events.add(800, () => {
                        //  _this.wfTriangle_2.destroy();
                        _this.partBWafferShow();
                        _this.gameSound.play();
                    });

                }
                if (_this.objectsArray[_this.count1] == 'cheese') {
                    var tween = _this.add.tween(_this.parent);
                    tween.to({ x: 376, y: 288, alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
                    tween.onComplete.add(function () {
                        // _this.parent.scale.setTo(2);
                        _this.parent.destroy();
                        _this.cheeseTriangle_2.alpha = 1;
                    });
                    if (_this.ywOrder[0] == 1) {
                        _this.interiar_y.destroy();
                        _this.angle_x_4 = _this.add.text(472, 360, _this.cheese_Angle_y + "\u{00B0}");
                        //_this.applyingStyle_Pink(_this.angle_x_4);
                        _this.CheeseGroup_4.addChild(_this.angle_x_4);
                        _this.applyingStyle_Pink(_this.angle_x_4);
                        _this.angle_x_4.fontSize = '15px';
                    }
                    else {
                        _this.interiar_w.destroy();
                        _this.angle_x_4 = _this.add.text(430 + ((139 * _this.sinC) / _this.sinB) - 50, 420, _this.cheese_Angle_b + "\u{00B0}");
                        //_this.applyingStyle_Pink(_this.angle_x_4);
                        _this.CheeseGroup_4.addChild(_this.angle_x_4);
                        _this.applyingStyle_Pink(_this.angle_x_4);
                        _this.angle_x_4.fontSize = '15px';
                    }
                    _this.time.events.add(800, () => {
                        _this.partBCheeseShow();
                        _this.gameSound.play();
                    });
                }
                if (_this.objectsArray[_this.count1] == 'watermelon') {
                    var tween = _this.add.tween(_this.parent);
                    tween.to({ x: 376, y: 288, alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
                    tween.onComplete.add(function () {
                        // _this.parent.scale.setTo(2);
                        _this.parent.destroy();
                        _this.melonTriangle_2.alpha = 1;
                    });
                    if (_this.ywOrder[0] == 1) {
                        _this.interiar_y.destroy();
                        _this.angle_x_4 = _this.add.text(475, 445 - ((185 * _this.sinC) / _this.sinB) / 3.3, _this.watermelon_Angle_y + "\u{00B0}");
                        _this.watermelonGroup_4.addChild(_this.angle_x_4);
                        _this.applyingStyle_Pink(_this.angle_x_4);
                        _this.angle_x_4.fontSize = '18px';
                    }
                    else if (_this.ywOrder[0] == 2) {
                        _this.interiar_w.destroy();
                        _this.angle_x_4 = _this.add.text(690 - ((185 * _this.sinC) / _this.sinB), 480 - ((185 * _this.sinC) / _this.sinB), _this.watermelon_Angle_b + "\u{00B0}");
                        _this.watermelonGroup_4.addChild(_this.angle_x_4);
                        _this.applyingStyle_Pink(_this.angle_x_4);
                        _this.angle_x_4.fontSize = '18px';
                    }
                    else {
                        _this.interiar_z.destroy();
                        _this.angle_x_4 = _this.add.text(620 - ((185 * _this.sinV) / _this.sinW), 410 - ((185 * _this.sinV) / _this.sinW), _this.watermelon_Angle_z + "\u{00B0}");
                        _this.watermelonGroup_4.addChild(_this.angle_x_4);
                        _this.applyingStyle_Pink(_this.angle_x_4);
                        _this.angle_x_4.fontSize = '18px';
                    }
                    _this.time.events.add(800, () => {
                        _this.partBMelonShow();
                        _this.gameSound.play();
                    });
                }
            }
        }
        else {
            _this.noofAttempts++;
            _this.wrongSound.play();
            _this.boxgrp = _this.add.group();
            _this.boxgrp.addChild(_this.box_1)
            _this.boxgrp.addChild(_this.box_2)
            _this.boxgrp.addChild(_this.box_3)
            _this.shake.shake(10, _this.boxgrp);
            _this.box_1.frame = 0;
            _this.box_2.frame = 0;
            _this.box_3.frame = 0;
        }
    },

    wafferShowingScreen: function () {
        _this.time.events.add(1500, () => {
            _this.wafferGroup_4.scale.setTo(1);
            _this.wafferGroup_4.x = 0;
            _this.wafferGroup_4.y = 0;

            _this.waffer_1.alpha = 1;
            _this.panel_2.alpha = 1;
            _this.buiscut.alpha = 1;
            _this.buiscut_2.alpha = 1;
            _this.sprinkle.alpha = 1;
            _this.donut.alpha = 1;
            _this.triangleRemain_4.destroy();
            _this.circleMask_6.destroy();
            _this.angle_x_4.destroy();
            _this.angleZ.destroy();
            _this.angleY.destroy();
            // _this.graphics_height.destroy();
            // _this.graphics_bottom.destroy();
            // _this.graphics_slop.destroy();
            _this.circle.destroy();
            _this.circleMask_2.destroy();
            _this.mask_1.destroy();
            _this.mask_2.destroy();
            _this.mask_6.destroy();

            //for blue line
            // create a new graphics object. right side height
            _this.triangleRemain_4 = _this.add.graphics(0, 0);
            // set the line style
            _this.triangleRemain_4.lineStyle(4, 0x40E0D0, 1);
            // draw the line
            _this.triangleRemain_4.moveTo(376 + ((200 * _this.sinC) / _this.sinB), 445);//straight line//x1,y1
            _this.triangleRemain_4.lineTo(763, 445);//bottom line//x2,y2
            _this.triangleRemain_4.lineTo(690, 288);//slop line//x3,y3
            _this.triangleRemain_4.lineTo(502, 288);//straight line//x4,y4
            _this.triangleRemain_4.lineTo(376 + ((200 * _this.sinC) / _this.sinB), 445);//straight line////x5,y5

            _this.triangleRemain_4.endFill();
        });
        _this.time.events.add(2500, () => {

            _this.lastScreenCelebration();
            _this.firstWafferTween = _this.add.tween(_this.waffer_1).to({ alpha: 1 }, 1000, 'Linear', true, 0);
            _this.firstWafferTween.onComplete.add(function () {

                _this.secondWafferTween = _this.add.tween(_this.waffer_2).to({ alpha: 1 }, 2000, 'Linear', true, 0);

                _this.secondWafferTween.onComplete.add(function () {
                    _this.graphics_height.destroy();
                    _this.graphics_bottom.destroy();
                    _this.graphics_slop.destroy();
                    _this.triangleRemain_4.destroy();
                    // create a new graphics object
                    _this.graphics_slop = _this.add.graphics(0, 0);
                    // set the line style
                    _this.graphics_slop.lineStyle(4, 0x98FB98, 1);
                    // draw the line
                    _this.graphics_slop.moveTo(500, 288);//slop line
                    _this.graphics_slop.lineTo(376 + ((200 * _this.sinC) / _this.sinB), 445);//slop line
                    _this.graphics_slop.endFill();
                    _this.graphics_slop.alpha = 0;
                });


            });


            // _this.time.events.add(4000, () => {
            //     _this.lastScreenCelebration();
            // });
        });

    },

    cheeseShowingScreen: function () {
        _this.time.events.add(1500, () => {
            _this.CheeseGroup_4.scale.setTo(1);
            _this.CheeseGroup_4.x = 0;
            _this.CheeseGroup_4.y = 0;

            _this.cheese_1.alpha = 1;
            _this.panel_2.alpha = 1;
            _this.cherry.alpha = 1;
            _this.almond.alpha = 1;
            _this.almond_2.alpha = 1;
            _this.stick.alpha = 1;
            _this.sausage.alpha = 1;
            _this.sausage_2.alpha = 1;
            _this.sausage_3.alpha = 1;
            _this.triangleRemain_4.destroy();
            _this.circleMask_6.destroy();
            _this.angle_x_4.destroy();
            _this.angleZ.destroy();
            _this.angleY.destroy();
            // _this.graphics_height.destroy();
            // _this.graphics_bottom.destroy();
            // _this.graphics_slop.destroy();
            _this.circle.destroy();
            _this.circleMask_2.destroy();
            _this.mask_1.destroy();
            _this.mask_2.destroy();
            _this.mask_6.destroy();

            //for blue line
            // create a new graphics object. right side height
            _this.triangleRemain_4 = _this.add.graphics(0, 0);
            // set the line style
            _this.triangleRemain_4.lineStyle(4, 0x40E0D0, 1);
            // draw the line
            _this.triangleRemain_4.moveTo(430 + ((139 * _this.sinC) / _this.sinB), 445);//straight line//x1,y1
            _this.triangleRemain_4.lineTo(685, 445);//bottom line//x2,y2
            _this.triangleRemain_4.lineTo(620, 320);//slop line//x3,y3
            _this.triangleRemain_4.lineTo(492, 320);//straight line//x4,y4
            _this.triangleRemain_4.lineTo(430 + ((139 * _this.sinC) / _this.sinB), 445);//straight line////x5,y5

            _this.triangleRemain_4.endFill();
        });
        _this.time.events.add(2500, () => {
            _this.lastScreenCelebration();
            _this.firstCheeseTween = _this.add.tween(_this.cheese_1).to({ alpha: 1 }, 1000, 'Linear', true, 0);
            _this.firstCheeseTween.onComplete.add(function () {

                _this.secondCheeseTween = _this.add.tween(_this.cheese_2).to({ alpha: 1 }, 1300, 'Linear', true, 0);

                _this.secondCheeseTween.onComplete.add(function () {
                    _this.graphics_height.destroy();
                    _this.graphics_bottom.destroy();
                    _this.graphics_slop.destroy();
                    _this.triangleRemain_4.destroy();
                    // create a new graphics object
                    _this.graphics_slop = _this.add.graphics(0, 0);
                    // set the line style
                    _this.graphics_slop.lineStyle(4, 0x98FB98, 1);
                    // draw the line
                    _this.graphics_slop.moveTo(490, 320);//bottom line
                    _this.graphics_slop.lineTo(430 + ((139 * _this.sinC) / _this.sinB), 445);//bottom line
                    _this.graphics_slop.endFill();
                    _this.graphics_slop.alpha = 0;
                });
            });
            // _this.time.events.add(4000, () => {

            // });
        });

    },

    melonShowingScreen: function () {
        _this.time.events.add(1500, () => {
            _this.watermelonGroup_4.scale.setTo(1);
            _this.watermelonGroup_4.x = 0;
            _this.watermelonGroup_4.y = 0;

            _this.watermelon_1.alpha = 1;
            _this.panel_2.alpha = 1;
            _this.orange_1.alpha = 1;
            _this.orange_2.alpha = 1;
            _this.orange_3.alpha = 1;
            _this.orange_4.alpha = 1;
            _this.strawberry_1.alpha = 1;
            _this.strawberry_2.alpha = 1;
            _this.strawberry_3.alpha = 1;
            _this.strawberry_4.alpha = 1;
            _this.strawberry_5.alpha = 1;
            _this.strawberry_6.alpha = 1;
            _this.strawberry_7.alpha = 1;
            _this.strawberry_8.alpha = 1;
            _this.strawberry_9.alpha = 1;
            _this.strawberry_10.alpha = 1;
            _this.triangleRemain_4.destroy();
            _this.circleMask_6.destroy();
            _this.angle_x_4.destroy();
            _this.angleZ.destroy();
            _this.angleY.destroy();
            // _this.graphics_height.destroy();
            // _this.graphics_bottom.destroy();
            // _this.graphics_slop.destroy();
            _this.circle.destroy();
            _this.circleMask_2.destroy();
            _this.mask_1.destroy();
            _this.mask_2.destroy();
            _this.mask_6.destroy();

            //for blue line
            // create a new graphics object. right side height
            _this.triangleRemain_4 = _this.add.graphics(0, 0);
            // set the line style
            _this.triangleRemain_4.lineStyle(4, 0x40E0D0, 1);
            // draw the line
            _this.triangleRemain_4.moveTo(430, 445);//straight line//x1,y1
            _this.triangleRemain_4.lineTo(430, 180);//bottom line//x2,y2
            _this.triangleRemain_4.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));//slop line//x3,y3
            _this.triangleRemain_4.lineTo(430, 444);//straight line//x4,y4
            _this.triangleRemain_4.endFill();
        });
        _this.time.events.add(2500, () => {
            _this.lastScreenCelebration();
            _this.firstMelonTween = _this.add.tween(_this.watermelon_1).to({ alpha: 1 }, 1000, 'Linear', true, 0);
            _this.firstMelonTween.onComplete.add(function () {

                _this.secondMelonTween = _this.add.tween(_this.watermelon_2).to({ alpha: 1 }, 1300, 'Linear', true, 0);

                _this.secondMelonTween.onComplete.add(function () {
                    _this.graphics_height.destroy();
                    _this.graphics_bottom.destroy();
                    _this.graphics_slop.destroy();
                    _this.triangleRemain_4.destroy();
                    // create a new graphics object
                    _this.graphics_slop = _this.add.graphics(0, 0);
                    // set the line style
                    _this.graphics_slop.lineStyle(4, 0x98FB98, 1);
                    // draw the line
                    _this.graphics_slop.moveTo(430, 445);//bottom line
                    _this.graphics_slop.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));//bottom line
                    _this.graphics_slop.endFill();
                    _this.graphics_slop.alpha = 0;
                });
            });
            // _this.time.events.add(4000, () => {
            //     _this.lastScreenCelebration();
            // });
        });

    },

    sandwitchShowingScreen: function () {
        _this.time.events.add(1500, () => {
            _this.sandwitchGroup_4.scale.setTo(1);
            _this.sandwitchGroup_4.x = 0;
            _this.sandwitchGroup_4.y = 0;

            _this.sandwitch_1.alpha = 1;
            _this.panel_2.alpha = 1;
            _this.cashew.alpha = 1;
            _this.apple.alpha = 1;
            _this.triangleRemain_4.destroy();
            _this.circleMask_6.destroy();
            _this.angle_x_4.destroy();
            _this.angleZ.destroy();
            _this.angleY.destroy();
            // _this.graphics_height.destroy();
            // _this.graphics_bottom.destroy();
            // _this.graphics_slop.destroy();
            _this.circle.destroy();
            _this.circleMask_2.destroy();
            _this.mask_1.destroy();
            _this.mask_2.destroy();
            _this.mask_6.destroy();

            if (_this.sandwitchOrder[0] == 1) {
                //for blue line
                // create a new graphics object. right side height
                _this.triangleRemain_4 = _this.add.graphics(0, 0);
                // set the line style
                _this.triangleRemain_4.lineStyle(4, 0x40E0D0, 1);
                // draw the line
                _this.triangleRemain_4.moveTo(740, 410);//straight line//x1,y1
                _this.triangleRemain_4.lineTo((485 + (_this.sandwitch_1.height * _this.tanA)), 410);//bottom line//x2,y2
                _this.triangleRemain_4.lineTo(488, 160);//slop line//x3,y3
                _this.triangleRemain_4.lineTo(740, 160);//straight line//x4,y4
                _this.triangleRemain_4.lineTo(740, 410);//straight line////x5,y5

                _this.triangleRemain_4.endFill();
            }
            if (_this.sandwitchOrder[0] == 2) {
                //for blue line
                // create a new graphics object. right side height
                _this.triangleRemain_4 = _this.add.graphics(0, 0);
                // set the line style
                _this.triangleRemain_4.lineStyle(4, 0x40E0D0, 1);
                // draw the line
                _this.triangleRemain_4.moveTo(737, 410);//straight line//x1,y1
                _this.triangleRemain_4.lineTo(737, 160);//slop line//x3,y3
                _this.triangleRemain_4.lineTo(485, 160);//straight line//x4,y4
                _this.triangleRemain_4.lineTo(485, 410);//straight line////x5,y5
                _this.triangleRemain_4.lineTo(737, 430 - (_this.sandwitch_1.height * _this.tanA));//bottom line//x2,y2

                _this.triangleRemain_4.endFill();
            }
        });

        _this.time.events.add(2500, () => {
            _this.lastScreenCelebration();

            _this.firstSandwitchTween = _this.add.tween(_this.sandwitch_1).to({ alpha: 1 }, 1000, 'Linear', true, 0);
            _this.firstSandwitchTween.onComplete.add(function () {

                _this.secondSandwitchTween = _this.add.tween(_this.sandwitch_2).to({ alpha: 1 }, 1300, 'Linear', true, 0);

                _this.secondSandwitchTween.onComplete.add(function () {
                    _this.graphics_height.destroy();
                    _this.graphics_bottom.destroy();
                    _this.graphics_slop.destroy();
                    _this.triangleRemain_4.destroy();
                    if (_this.sandwitchOrder[0] == 1) {
                        // create a new graphics object
                        _this.graphics_slop = _this.add.graphics(0, 0);
                        // set the line style
                        _this.graphics_slop.lineStyle(4, 0x98FB98, 1);
                        // draw the line
                        _this.graphics_slop.moveTo(485, 160);//slop line
                        _this.graphics_slop.lineTo(485 + (_this.sandwitch_1.height * _this.tanA), 420);//slop line
                        _this.graphics_slop.endFill();
                        _this.graphics_slop.alpha = 0;
                    }
                    if (_this.sandwitchOrder[0] == 2) {
                        // create a new graphics object
                        _this.graphics_slop = _this.add.graphics(0, 0);
                        // set the line style
                        _this.graphics_slop.lineStyle(4, 0x98FB98, 1);
                        // draw the line
                        _this.graphics_slop.moveTo(485, 410);//slop line
                        _this.graphics_slop.lineTo(740, 430 - (_this.sandwitch_1.height * _this.tanA));//slop line
                        _this.graphics_slop.endFill();
                        _this.graphics_slop.alpha = 0;
                    }
                });
            });
            // _this.time.events.add(4000, () => {
            //     _this.lastScreenCelebration();
            // });
        });
    },

    partBSandwitchShow: function () {
        _this.time.events.add(1500, () => {
            _this.sandwitchGroup_4.scale.setTo(1);
            _this.sandwitchGroup_4.x = 0;
            _this.sandwitchGroup_4.y = 0;

            _this.sandwichTriangle_2.destroy();
            _this.sandwitch_1.alpha = 1;
            _this.panel_2.alpha = 1;
            _this.cashew.alpha = 1;
            _this.apple.alpha = 1;
            _this.angle_x_4.destroy();
            _this.angleZ.destroy();
            _this.angleX.destroy();
            // _this.graphics_height.destroy();
            // _this.graphics_bottom.destroy();
            // _this.graphics_slop.destroy();
            _this.circle.destroy();
            _this.circleMask_2.destroy();
            _this.mask_1.destroy();
            _this.mask_2.destroy();
            // _this.swTriangle_1.destroy();
            _this.swCircleMask_1.destroy();
            _this.sw_mask_1.destroy();
        });
        //this is done for the second screen triangle scale increasing.
        var initialX = _this.sandwitchGroup_4.x + 100;
        var initialY = _this.sandwitchGroup_4.y + 50;

        var scaleTween = _this.add.tween(_this.sandwitchGroup_4.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None, true);// tween for scale increasing
        var positionBackTween = _this.add.tween(_this.sandwitchGroup_4).to({ x: initialX, y: initialY }, 1000, Phaser.Easing.Linear.None);// tween for x and y position fixing

        scaleTween.start();
        positionBackTween.start();
        scaleTween.onComplete.add(function () {
            _this.time.events.add(2500, () => {
                _this.lastScreenCelebration();
                _this.firstSandwitchTween = _this.add.tween(_this.sandwitch_1).to({ alpha: 1 }, 1000, 'Linear', true, 0);
                _this.firstSandwitchTween.onComplete.add(function () {

                    _this.secondSandwitchTween = _this.add.tween(_this.sandwitch_2).to({ alpha: 1 }, 1300, 'Linear', true, 0);

                    _this.secondSandwitchTween.onComplete.add(function () {
                        _this.graphics_height.destroy();
                        _this.graphics_bottom.destroy();
                        _this.graphics_slop.destroy();
                        _this.swTriangle_1.destroy();
                        if (_this.sandwitchOrder[0] == 1) {
                            // create a new graphics object
                            _this.graphics_slop = _this.add.graphics(0, 0);
                            // set the line style
                            _this.graphics_slop.lineStyle(4, 0x98FB98, 1);
                            // draw the line
                            _this.graphics_slop.moveTo(485, 160);//slop line
                            _this.graphics_slop.lineTo(485 + (_this.sandwitch_1.height * _this.tanA), 420);//slop line
                            _this.graphics_slop.endFill();
                            _this.graphics_slop.alpha = 0;
                        }
                        if (_this.sandwitchOrder[0] == 2) {
                            // create a new graphics object
                            _this.graphics_slop = _this.add.graphics(0, 0);
                            // set the line style
                            _this.graphics_slop.lineStyle(4, 0x98FB98, 1);
                            // draw the line
                            _this.graphics_slop.moveTo(485, 410);//slop line
                            _this.graphics_slop.lineTo(740, 430 - (_this.sandwitch_1.height * _this.tanA));//slop line
                            _this.graphics_slop.endFill();
                            _this.graphics_slop.alpha = 0;
                        }
                    });
                });
                // _this.time.events.add(4000, () => {
                //     _this.lastScreenCelebration();
            });
        });
    },
    partBWafferShow: function () {
        _this.time.events.add(1500, () => {
            _this.wafferGroup_4.scale.setTo(1);
            _this.wafferGroup_4.x = 0;
            _this.wafferGroup_4.y = 0;
            _this.wfTriangle_2.destroy();
            _this.waffer_1.alpha = 1;
            _this.panel_2.alpha = 1;
            _this.buiscut.alpha = 1;
            _this.buiscut_2.alpha = 1;
            _this.sprinkle.alpha = 1;
            _this.donut.alpha = 1;
            _this.angleZ.destroy();
            _this.angleX.destroy();
            _this.angle_x_4.destroy();
            // _this.wfTriangle.destroy();
            // _this.graphics_height.destroy();
            // _this.graphics_bottom.destroy();
            // _this.graphics_slop.destroy();
            _this.circle.destroy();
            _this.circleMask_2.destroy();
            _this.mask_1.destroy();
            _this.mask_2.destroy();
            _this.circleMask_6.destroy();
            _this.mask_6.destroy();

        });
        //this is done for the second screen triangle scale increasing.
        var initialX = _this.wafferGroup_4.x + 300;
        var initialY = _this.wafferGroup_4.y + 250;

        var scaleTween = _this.add.tween(_this.wafferGroup_4.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None, true);// tween for scale increasing
        var positionBackTween = _this.add.tween(_this.wafferGroup_4).to({ x: initialX, y: initialY }, 1000, Phaser.Easing.Linear.None);// tween for x and y position fixing

        scaleTween.start();
        positionBackTween.start();
        scaleTween.onComplete.add(function () {
            _this.time.events.add(2500, () => {
                _this.lastScreenCelebration();

                _this.firstWafferTween = _this.add.tween(_this.waffer_1).to({ alpha: 1 }, 1000, 'Linear', true, 0);
                _this.firstWafferTween.onComplete.add(function () {

                    _this.secondWafferTween = _this.add.tween(_this.waffer_2).to({ alpha: 1 }, 1300, 'Linear', true, 0);

                    _this.secondWafferTween.onComplete.add(function () {
                        _this.graphics_height.destroy();
                        _this.graphics_bottom.destroy();
                        _this.graphics_slop.destroy();
                        _this.wfTriangle.destroy();
                        // create a new graphics object
                        _this.graphics_slop = _this.add.graphics(0, 0);
                        // set the line style
                        _this.graphics_slop.lineStyle(4, 0x98FB98, 1);
                        // draw the line
                        _this.graphics_slop.moveTo(500, 288);//slop line
                        _this.graphics_slop.lineTo(376 + ((200 * _this.sinC) / _this.sinB), 445);//slop line
                        _this.graphics_slop.endFill();
                        _this.graphics_slop.alpha = 0;
                    });
                });
                // _this.time.events.add(4000, () => {

            });
        });
    },
    partBCheeseShow: function () {
        _this.time.events.add(1500, () => {
            _this.CheeseGroup_4.scale.setTo(1);
            _this.CheeseGroup_4.x = 0;
            _this.CheeseGroup_4.y = 0;
            _this.cheeseTriangle_2.destroy();
            _this.cheese_1.alpha = 1;
            _this.panel_2.alpha = 1;
            _this.cherry.alpha = 1;
            _this.almond.alpha = 1;
            _this.almond_2.alpha = 1;
            _this.stick.alpha = 1;
            _this.sausage.alpha = 1;
            _this.sausage_2.alpha = 1;
            _this.sausage_3.alpha = 1;
            //_this.cheeseTriangle.destroy();
            _this.circleMask_6.destroy();
            _this.angle_x_4.destroy();
            _this.angleZ.destroy();
            _this.angleX.destroy();
            // _this.graphics_height.destroy();
            // _this.graphics_bottom.destroy();
            // _this.graphics_slop.destroy();
            _this.circle.destroy();
            _this.circleMask_2.destroy();
            _this.mask_1.destroy();
            _this.mask_2.destroy();
            _this.mask_6.destroy();
        });
        //this is done for the second screen triangle scale increasing.
        var initialX = _this.CheeseGroup_4.x + 300;
        var initialY = _this.CheeseGroup_4.y + 250;

        var scaleTween = _this.add.tween(_this.CheeseGroup_4.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None, true);// tween for scale increasing
        var positionBackTween = _this.add.tween(_this.CheeseGroup_4).to({ x: initialX, y: initialY }, 1000, Phaser.Easing.Linear.None);// tween for x and y position fixing

        scaleTween.start();
        positionBackTween.start();
        scaleTween.onComplete.add(function () {
            _this.time.events.add(2500, () => {
                _this.lastScreenCelebration();
                _this.firstCheeseTween = _this.add.tween(_this.cheese_1).to({ alpha: 1 }, 1000, 'Linear', true, 0);
                _this.firstCheeseTween.onComplete.add(function () {

                    _this.secondCheeseTween = _this.add.tween(_this.cheese_2).to({ alpha: 1 }, 1300, 'Linear', true, 0);

                    _this.secondCheeseTween.onComplete.add(function () {
                        _this.graphics_height.destroy();
                        _this.graphics_bottom.destroy();
                        _this.graphics_slop.destroy();
                        _this.cheeseTriangle.destroy();
                        // create a new graphics object
                        _this.graphics_slop = _this.add.graphics(0, 0);
                        // set the line style
                        _this.graphics_slop.lineStyle(4, 0x98FB98, 1);
                        // draw the line
                        _this.graphics_slop.moveTo(490, 320);//bottom line
                        _this.graphics_slop.lineTo(430 + ((139 * _this.sinC) / _this.sinB), 445);//bottom line
                        _this.graphics_slop.endFill();
                        _this.graphics_slop.alpha = 0;
                    });
                });
            });
            // _this.time.events.add(4000, () => {
            //     _this.lastScreenCelebration();
            // });
        });
    },
    partBMelonShow: function () {
        _this.time.events.add(1500, () => {
            _this.watermelonGroup_4.scale.setTo(1);
            _this.watermelonGroup_4.x = 0;
            _this.watermelonGroup_4.y = 0;
            _this.melonTriangle_2.destroy();
            _this.watermelon_1.alpha = 1;
            _this.panel_2.alpha = 1;
            _this.orange_1.alpha = 1;
            _this.orange_2.alpha = 1;
            _this.orange_3.alpha = 1;
            _this.orange_4.alpha = 1;
            _this.strawberry_1.alpha = 1;
            _this.strawberry_2.alpha = 1;
            _this.strawberry_3.alpha = 1;
            _this.strawberry_4.alpha = 1;
            _this.strawberry_5.alpha = 1;
            _this.strawberry_6.alpha = 1;
            _this.strawberry_7.alpha = 1;
            _this.strawberry_8.alpha = 1;
            _this.strawberry_9.alpha = 1;
            _this.strawberry_10.alpha = 1;
            // _this.melonTriangle.destroy();
            _this.circleMask_6.destroy();
            _this.angle_x_4.destroy();
            if (_this.ywOrder[0] == 1 || _this.ywOrder[0] == 2) _this.angleZ.destroy();
            else _this.angleY.destroy();
            _this.angleX.destroy();
            // _this.graphics_height.destroy();
            // _this.graphics_bottom.destroy();
            // _this.graphics_slop.destroy();
            _this.circle.destroy();
            _this.circleMask_2.destroy();
            _this.mask_1.destroy();
            _this.mask_2.destroy();
            _this.mask_6.destroy();
        });
        //this is done for the second screen triangle scale increasing.
        var initialX = _this.watermelonGroup_4.x + 150;
        var initialY = _this.watermelonGroup_4.y + 100;

        var scaleTween = _this.add.tween(_this.watermelonGroup_4.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None, true);// tween for scale increasing
        var positionBackTween = _this.add.tween(_this.watermelonGroup_4).to({ x: initialX, y: initialY }, 1000, Phaser.Easing.Linear.None);// tween for x and y position fixing

        scaleTween.start();
        positionBackTween.start();
        scaleTween.onComplete.add(function () {
            _this.time.events.add(2500, () => {
                _this.lastScreenCelebration();
                _this.firstMelonTween = _this.add.tween(_this.watermelon_1).to({ alpha: 1 }, 1000, 'Linear', true, 0);
                _this.firstMelonTween.onComplete.add(function () {

                    _this.secondMelonTween = _this.add.tween(_this.watermelon_2).to({ alpha: 1 }, 1300, 'Linear', true, 0);

                    _this.secondMelonTween.onComplete.add(function () {
                        _this.graphics_height.destroy();
                        _this.graphics_bottom.destroy();
                        _this.graphics_slop.destroy();
                        _this.melonTriangle.destroy();
                        // create a new graphics object
                        _this.graphics_slop = _this.add.graphics(0, 0);
                        // set the line style
                        _this.graphics_slop.lineStyle(4, 0x98FB98, 1);
                        // draw the line
                        _this.graphics_slop.moveTo(430, 445);//bottom line
                        _this.graphics_slop.lineTo(705 - ((185 * _this.sinC) / _this.sinB), 445 - ((185 * _this.sinC) / _this.sinB));//bottom line
                        _this.graphics_slop.endFill();
                        _this.graphics_slop.alpha = 0;
                    });
                });
            });
            // _this.time.events.add(4000, () => {
            //     _this.lastScreenCelebration();
            // });
        });
    },

    lastScreenCelebration: function () {
        _this.celebrationSound.play();
        telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);
        _this.starActions();
        _this.time.events.add(4000, () => {
            _this.clearAll();
            if (_this.count1 == 6) {
                _this.state.start('score', true, false, gameID, _this.microConcepts);
                console.log("score");
            }
            else {
                _this.time.events.add(800, () => {
                    _this.Initial_randomizing();
                });
            }
        });
    },

    clearAll: function () {
        console.log("ClearAll");

        if (_this.objectsArray[_this.count1] == 'sandwitch') {
            _this.cashew.destroy();
            _this.apple.destroy();
            _this.tick.destroy();
            _this.sandwitch_1.destroy();
            _this.sandwitch_2.destroy();
            _this.graphics_slop.destroy();

        }
        else if (_this.objectsArray[_this.count1] == 'waffer') {
            _this.buiscut.destroy();
            _this.buiscut_2.destroy();
            _this.sprinkle.destroy();
            _this.donut.destroy();
            _this.waffer_1.destroy();
            _this.waffer_2.destroy();
            _this.graphics_slop.destroy();

        }
        else if (_this.objectsArray[_this.count1] == 'cheese') {
            _this.cheese_1.destroy();
            _this.cheese_2.destroy();
            _this.cherry.destroy();
            _this.almond.destroy();
            _this.almond_2.destroy();
            _this.stick.destroy();
            _this.sausage.destroy();
            _this.sausage_2.destroy();
            _this.sausage_3.destroy();
            _this.graphics_slop.destroy();

        }
        else {
            if (_this.objectsArray[_this.count1] == 'watermelon') {
                _this.watermelon_1.destroy();
                _this.watermelon_2.destroy();
                _this.orange_1.destroy();
                _this.orange_2.destroy();
                _this.orange_3.destroy();
                _this.orange_4.destroy();
                _this.strawberry_1.destroy();
                _this.strawberry_2.destroy();
                _this.strawberry_3.destroy();
                _this.strawberry_4.destroy();
                _this.strawberry_5.destroy();
                _this.strawberry_6.destroy();
                _this.strawberry_7.destroy();
                _this.strawberry_8.destroy();
                _this.strawberry_9.destroy();
                _this.strawberry_10.destroy();

            }
        }

        _this.panel_1.destroy();
        _this.panel_2.destroy();
        _this.graphics_height.destroy();
        _this.graphics_bottom.destroy();
        _this.graphics_slop.destroy();

        _this.triangleRemain_1.destroy();
        _this.circleMask_3.destroy();
        _this.mask_3.destroy();
        _this.count1++;
    },


    applyingStyle: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.visible = true;
    },
    applyingStyle_Pink: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#E11584';
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '15px';//18
    },

    applyingStyle_Orange: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#ff8c00';
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '15px';//18
    },

    applyingStyle_blue: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '17px';//17
    },
    applyingStyle_blue_2: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '15px';//17
    },

    checkOverlap: function (spriteA, spriteB) {
        _this.boundsA = spriteA.getBounds();
        _this.boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(_this.boundsA, _this.boundsB);
    },


    starActions: function (target) {
        console.log("get a star")
        starAnim = _this.starsGroup.getChildAt(_this.count1);
        starAnim.smoothed = false;
        anim = starAnim.animations.add('star');
        //_this.anim.play();
        _this.microConcepts = "GeometryG7";
        anim.play();
    },


    shutdown: function () {
        _this.stopVoice();
        //RI.gotoEndPage();
        //telInitializer.tele_end();
    },

    DemoHint: function () {
        _this.pauseVoice();
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-05-G7/" +
            _this.languageSelected + "/GMLA_05_G7_h1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        _this.q2Sound = document.createElement('audio');
        _this.q2Soundsrc = document.createElement('source');
        _this.q2Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-05-G7/" +
            _this.languageSelected + "/GMLA_05_G7_h2.mp3");
        _this.q2Sound.appendChild(_this.q2Soundsrc);


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
        if (_this.lineTimer) clearTimeout(_this.lineTimer);
        if (_this.q1Sound) {
            _this.q1Sound.pause();
            _this.q1Sound = null;
            _this.q1Soundsrc = null;
        }

        if (_this.q2Sound) {
            //// console.log("removing the q2");
            _this.q2Sound.pause();
            _this.q2Sound = null;
            _this.q2Soundsrc = null;
        }

        if (_this.background_demo) _this.background_demo.destroy();


        // _this.Question_flag = 2;
        _this.speakerbtn.inputEnabled = true;

        _this.skip.events.onInputDown.removeAll();
        _this.skip.destroy(); //* skip button destroyed

    },

    showDemoHint: function () {

        _this.background_demo = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'BG1');

        _this.bgBox = _this.add.image(70, 80, 'bgbox2');

        _this.background_demo.addChild(_this.bgBox);

        _this.drawTrngleExtror();

    },
    drawTrngleExtror: function () {
        if (_this.triangleSecGroup)
            _this.triangleSecGroup.destroy();

        console.log("drawTrngleExtror");
        _this.triangleGroup = _this.add.group();
        _this.q1Sound.play();
        //straight line
        // Create a Graphics object
        var graphics = _this.add.graphics(0, 0);

        // Set the line style (color, thickness)
        graphics.lineStyle(2, 0x4472c4); // 2 pixels thick, color//0xffffff white
        // Draw a line
        graphics.moveTo(300, 350); // Starting point
        graphics.lineTo(500, 350); // Ending point
        graphics.lineTo(400, 200); // middle point
        graphics.lineTo(300, 350); // Ending point


        _this.lineTimer = setTimeout(function () {            // Create a Graphics object
            var graphics_dup = _this.add.graphics(0, 0);

            // Set the line style (color, thickness)
            graphics_dup.lineStyle(2, 0x4472c4); // 2 pixels thick, color//0xffffff white
            // Draw a line
            graphics_dup.moveTo(500, 350); // Starting point
            graphics_dup.lineTo(650, 350); // Ending point

            // Draw the arc representing a 40-degree angle
            var angle = Phaser.Math.degToRad(125); // Convert angle to radians
            graphics.arc(500, 350, 40, Phaser.Math.PI2, Phaser.Math.PI2 - angle, true);

            var text = _this.add.text(530, 280, "a", {
                font: "24px Akzidenz-Grotesk BQ",
                fill: "#000000"  // Red color "#FF0000"
            });

            _this.triangleGroup.addChild(graphics_dup);
            _this.triangleGroup.addChild(text);

            _this.nextScreen = _this.add.image(780, 390, 'skipArrow');       //* skip button shown at the bottom
            _this.nextScreen.inputEnabled = true;
            _this.nextScreen.input.useHandCursor = true;
            _this.triangleGroup.addChild(_this.nextScreen);
            _this.nextScreen.events.onInputDown.add(function () {
                _this.pauseVoice();
                _this.calculateAngle();
            });
        }, 1000);

        _this.triangleGroup.addChild(graphics);

        _this.background_demo.addChild(_this.triangleGroup);
    },
    calculateAngle: function () {
        if (_this.triangleGroup)
            _this.triangleGroup.destroy();

        _this.triangleSecGroup = _this.add.group();
        _this.q2Sound.play();
        //straight line
        // Create a Graphics object
        var graphics = _this.add.graphics(0, 0);

        // Set the line style (color, thickness)
        graphics.lineStyle(2, 0x4472c4); // 2 pixels thick, color//0xffffff white
        // Draw a line
        graphics.moveTo(300, 350); // Starting point
        graphics.lineTo(500, 350); // Ending point
        graphics.lineTo(400, 200); // middle point
        graphics.lineTo(300, 350); // Ending point

        // Draw a line
        graphics.moveTo(500, 350); // Starting point
        graphics.lineTo(650, 350); // Ending point

        // Draw the arc representing a 40-degree angle
        var angle = Phaser.Math.degToRad(125); // Convert angle to radians
        graphics.arc(500, 350, 40, Phaser.Math.PI2, Phaser.Math.PI2 - angle, true);

        var text = _this.add.text(530, 280, "a", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });

        // Draw the arc representing a 40-degree angle
        var angle = Phaser.Math.degToRad(55); // Convert angle to radians
        graphics.lineStyle(2, 0xFFA500);
        graphics.arc(300, 350, 40, Phaser.Math.PI2, Phaser.Math.PI2 - angle, true);

        var text_2 = _this.add.text(350, 305, "c", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });

        // Draw the arc representing a 40-degree angle
        graphics.lineStyle(2, 0xFFA500);
        graphics.arc(400, 200, 40, _this.math.degToRad(125), _this.math.degToRad(55), true);

        var text_3 = _this.add.text(390, 250, "b", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });

        var text_4 = _this.add.text(520, 180, "<a = <b + <c", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#000000"  // Red color "#FF0000"
        });


        _this.triangleSecGroup.addChild(graphics);
        _this.triangleSecGroup.addChild(text);
        _this.triangleSecGroup.addChild(text_2);
        _this.triangleSecGroup.addChild(text_3);
        _this.triangleSecGroup.addChild(text_4);

        _this.previousScreen = _this.add.image(180, 440, 'skipArrow');       //* back to first screen
        _this.previousScreen.angle = 180;
        _this.previousScreen.inputEnabled = true;
        _this.previousScreen.input.useHandCursor = true;

        _this.previousScreen.events.onInputDown.add(function () {
            _this.pauseVoice();
            _this.drawTrngleExtror();
        });

        _this.triangleSecGroup.addChild(_this.previousScreen);

        _this.background_demo.addChild(_this.triangleSecGroup);
    },
}