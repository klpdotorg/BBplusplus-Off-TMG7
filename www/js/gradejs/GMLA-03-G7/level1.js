Game.GMLA_03_G7level1 = function () { };


Game.GMLA_03_G7level1.prototype =
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
        _this.wronganssrc.setAttribute("src", window.baseUrl + "sounds/WrongCelebrationSound.mp3");
        _this.wrongans.appendChild(_this.wronganssrc);

        _this.wrongSound = document.createElement('audio');
        _this.wrongSoundsrc = document.createElement('source');
        _this.wrongSoundsrc.setAttribute("src", window.baseUrl + "sounds/WrongCelebrationSound.mp3");
        _this.wrongSound.appendChild(_this.wrongSoundsrc);


        _this.Ask_Question1 = _this.createAudio("GMLA_03_G7_a1");
        _this.Ask_Question2 = _this.createAudio("GMLA_03_G7_a2");
        _this.Ask_Question3 = _this.createAudio("GMLA_03_G7_a3");
        _this.Ask_Question4 = _this.createAudio("GMLA_03_G7_a4");
        _this.Ask_Question5 = _this.createAudio("GMLA_03_G7_a5");
        _this.Ask_Question6 = _this.createAudio("GMLA_03_G7_a6");
        _this.Ask_Question7 = _this.createAudio("GMLA_03_G7_a7");
        _this.Ask_Question8 = _this.createAudio("GMLA_03_G7_a8");
        _this.Ask_Question9 = _this.createAudio("GMLA_03_G7_a9");
        _this.Ask_Question10 = _this.createAudio("GMLA_03_G7_a11");
        _this.Ask_Question11 = _this.createAudio("GMLA_03_G7_a12");
        _this.Ask_Question12 = _this.createAudio("GMLA_03_G7_a13");

        telInitializer.gameIdInit("GMLA_03_G7", gradeSelected);
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

    ViewDemoVideo: function () {
        //* pause the game before going to the demovideo 
        _this.game.paused = true;
        _this.DemoVideo();  //* at the end of demo video/skip pressed, it will unpause the game.
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
        _this.selectedAns3 = '';
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

        _this.numberOfQuestions = 0;
        _this.rightbtnFlag = 0;

        _this.numbers = _this.add.group();


        valuesCombinationsNum = []
        valuesCombinationsDenom = []

        valuesCombinationsNum2 = []
        valuesCombinationsDenom2 = []



        _this.counterForTimer = 0;

        _this.arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

        //generating map here for the first 3 sets.
        _this.map = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];//1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
        _this.shuffleArray(_this.map);
        console.log(_this.map, "_this.map");

        _this.enterTxt1_angle = [43, 110, 63, 58, 75, 90, 57, 94, 68, 68, 52, 70];
        _this.enterTxt2_angle = [137, 70, 63, 98, 60, 33, 110, 94, 68, 90, 128, 80];
        _this.enterTxt3_angle = [47, 70, 30, 82, 45, 90, 70, 33, 112, 90, 52, 110];
        _this.enterTxt4_angle = [43, 52, 117, 40, 75, 57, 53, 53, 85, 22, 51, 30];
        _this.enterTxt5_angle = [90, 58, 87, 82, 105, 90, 70, 86, 27, 90, 77, 70];

        //x and y position for first screen map
        _this.redCircle_x = [500, 200, 430, 620, 160, 150, 200, 320, 440, 370, 280, 350];
        _this.redCircle_y = [170, 200, 150, 140, 140, 130, 210, 200, 150, 250, 110, 110];

        //x and y position for second screen map
        _this.redCircle2_x = [460, 150, 400, 580, 108, 130, 150, 270, 400, 320, 190, 350];
        _this.redCircle2_y = [150, 200, 150, 135, 95, 140, 210, 200, 150, 210, 110, 120];

        //numbers for second screen map
        _this.numberOne_x = [637, 353, 567, 780, 150, 218, 200, 346, 478, 358, 250, 488];
        _this.numberOne_y = [213, 300, 195, 200, 240, 340, 395, 394, 355, 275, 295, 335];

        _this.numberTwo_x = [632, 286, 487, 653, 178, 278, 358, 468, 578, 518, 388, 558];
        _this.numberTwo_y = [320, 410, 354, 330, 155, 165, 305, 255, 195, 405, 295, 195];

        _this.numberThree_x = [591, 248, 505, 780, 260, 338, 260, 363, 588, 508, 388, 369];
        _this.numberThree_y = [173, 240, 175, 300, 150, 318, 244, 245, 335, 265, 155, 255];

        _this.numberFour_x = [517, 215, 600, 700, 310, 328, 190, 308, 438, 428, 218, 556];
        _this.numberFour_y = [320, 387, 314, 170, 220, 215, 302, 295, 245, 235, 215, 300];

        _this.numberFive_x = [498, 188, 443, 633, 246, 198, 298, 468, 500, 378, 288, 438];
        _this.numberFive_y = [230, 310, 250, 220, 305, 225, 415, 395, 175, 405, 135, 145];

        //blue circle for second screen map
        _this.numberCircleOne_x = [630, 345, 560, 773, 143, 210, 193, 340, 470, 350, 245, 480];
        _this.numberCircleOne_y = [210, 295, 190, 195, 235, 335, 390, 390, 350, 270, 290, 330];

        _this.numberCircleTwo_x = [625, 278, 480, 646, 170, 270, 350, 460, 570, 510, 380, 550];
        _this.numberCircleTwo_y = [315, 405, 350, 325, 150, 160, 300, 250, 190, 400, 290, 190];

        _this.numberCircleThree_x = [585, 240, 497, 773, 252, 330, 250, 355, 580, 500, 380, 360];
        _this.numberCircleThree_y = [170, 235, 170, 295, 145, 315, 240, 240, 330, 260, 150, 250];

        _this.numberCircleFour_x = [510, 208, 592, 693, 303, 320, 183, 300, 430, 420, 210, 550];
        _this.numberCircleFour_y = [315, 382, 310, 165, 215, 210, 298, 290, 240, 230, 210, 295];

        _this.numberCircleFive_x = [490, 180, 435, 625, 238, 190, 290, 460, 493, 370, 280, 430];
        _this.numberCircleFive_y = [225, 305, 245, 218, 300, 220, 410, 390, 170, 400, 130, 140];

        //numbers for third screen map with x,y,z
        _this.numberOne_x_1 = [639, 353, 567, 780, 150, 218, 200, 346, 478, 358, 255, 490];
        _this.numberOne_y_1 = [213, 299, 195, 199, 240, 340, 394, 394, 354, 274, 293, 333];

        _this.numberTwo_x_1 = [632, 288, 489, 653, 178, 278, 358, 470, 580, 518, 388, 558];
        _this.numberTwo_y_1 = [319, 410, 352, 329, 155, 164, 304, 254, 194, 404, 294, 194];

        _this.numberThree_x_1 = [592, 250, 505, 783, 262, 340, 260, 365, 590, 511, 390, 370];
        _this.numberThree_y_1 = [173, 239, 174, 299, 149, 318, 244, 243, 333, 264, 154, 254];

        _this.numberFour_x_1 = [520, 215, 602, 703, 314, 330, 192, 308, 438, 430, 218, 556];
        _this.numberFour_y_1 = [318, 386, 312, 168, 219, 214, 302, 294, 244, 234, 215, 300];

        _this.numberFive_x_1 = [501, 191, 445, 636, 249, 201, 300, 471, 503, 380, 290, 440];
        _this.numberFive_y_1 = [228, 307, 247, 220, 302, 222, 412, 392, 172, 402, 132, 142];

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
                    if (_this.order[0] == 1) {
                        _this.Ask_Question1.play();
                    }
                    if (_this.order[0] == 2) {
                        _this.Ask_Question2.play();
                    }
                    if (_this.order[0] == 3) {
                        _this.Ask_Question3.play();
                    }
                    if (_this.order[0] == 4) {
                        _this.Ask_Question4.play();
                    }
                    if (_this.order[0] == 5) {
                        _this.Ask_Question5.play();
                    }
                    if (_this.order[0] == 6) {
                        _this.Ask_Question6.play();
                    }
                    if (_this.order[0] == 7) {
                        _this.Ask_Question7.play();
                    }
                    if (_this.order[0] == 8) {
                        _this.Ask_Question8.play();
                    }
                    if (_this.order[0] == 9) {
                        _this.Ask_Question9.play();
                    }

                }
                if (_this.Question_flag == 1) {
                    _this.Ask_Question10.play();
                }
                if (_this.Question_flag == 2) {
                    _this.Ask_Question11.play();
                }
                if (_this.Question_flag == 3) {
                    _this.Ask_Question12.play();
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
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-03-G7/" + _this.languageSelected + "/" + src + ".mp3");
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
        _this.noofAttempts = 0;
        _this.AnsTimerCount = 0;

        _this.color_flag = 0;
        _this.tick1Flag = false;
        _this.numberpadFlag = false;

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
        _this.sceneCount++;

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
        _this.formTheFirstMap();
        _this.DisplayQuestion();


        //   _this.ThirdMapDisplay();


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

        _this.Ask_Question6.pause();
        _this.Ask_Question6 = null;

        _this.Ask_Question7.pause();
        _this.Ask_Question7 = null;

        _this.Ask_Question8.pause();
        _this.Ask_Question8 = null;

        _this.Ask_Question9.pause();
        _this.Ask_Question9 = null;

        _this.Ask_Question10.pause();
        _this.Ask_Question10 = null;

        _this.Ask_Question11.pause();
        _this.Ask_Question11 = null;

        _this.Ask_Question12.pause();
        _this.Ask_Question12 = null;

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
        if (_this.Ask_Question7) {
            _this.Ask_Question7.pause();
            _this.Ask_Question7.currentTime = 0.0;
        }
        if (_this.Ask_Question8) {
            _this.Ask_Question8.pause();
            _this.Ask_Question8.currentTime = 0.0;
        }
        if (_this.Ask_Question9) {
            _this.Ask_Question9.pause();
            _this.Ask_Question9.currentTime = 0.0;
        }
        if (_this.Ask_Question10) {
            _this.Ask_Question10.pause();
            _this.Ask_Question10.currentTime = 0.0;
        }
        if (_this.Ask_Question11) {
            _this.Ask_Question11.pause();
            _this.Ask_Question11.currentTime = 0.0;
        }
        if (_this.Ask_Question12) {
            _this.Ask_Question12.pause();
            _this.Ask_Question12.currentTime = 0.0;
        }
        if (_this.q1Sound) {
            _this.q1Sound.pause();
            _this.q1Sound.currentTime = 0.0;
        }
        if (_this.q2Sound) {
            _this.q2Sound.pause();
            _this.q2Sound.currentTime = 0.0;
        }
    },

    Initial_randomizing: function () {
        console.log("Initial_randomizing");

        _this.allMapsGroup = _this.add.group();
        _this.allCircleGroup = _this.add.group();

        _this.allMapsGroupSecond = _this.add.group();
        _this.allCircleGroupSecond = _this.add.group();

        _this.allMapsGroup_second = _this.add.group();

        _this.allMapsGroupThrid = _this.add.group();


        /* 1. Linear pair
       2.  Any two vertically opposite angles
       3. Acute vertically opposite angles (where both angles appear to be lesser than 90 degrees)
       4. Obtuse vertically opposite angles (where both angles appear to be greater than 90 degrees)
       5. Right angled vertically opposite angles  (where both angles appear to be at 90 degrees)
       6. Any two adjacent angles
       7. Adjacent angles which are supplementary to each other
       8. Adjacent angles which are complementary to each other.
       9. Adjacent angles that do not form a linear pair */

        // _this.map = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];//1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
        // _this.shuffleArray(_this.map);
        // console.log(_this.map, "_this.map");

        if (_this.map[_this.count1] == 1 || _this.map[_this.count1] == 2 || _this.map[_this.count1] == 4 || _this.map[_this.count1] == 5 || _this.map[_this.count1] == 7 || _this.map[_this.count1] == 11 || _this.map[_this.count1] == 3 || _this.map[_this.count1] == 9 || _this.map[_this.count1] == 12) {
            _this.order = [1, 2, 3, 6, 7, 9];
        }
        else if (_this.map[_this.count1] == 6) {
            _this.order = [1, 6, 7, 8, 9];
        }
        else if (_this.map[_this.count1] == 8) {
            _this.order = [1, 2, 4, 6, 7, 9];
        }
        else if (_this.map[_this.count1] == 10) {
            _this.order = [1, 2, 5, 6, 7, 8, 9];
        }

        _this.shuffleArray(_this.order);
        console.log(_this.order, "_this.order");

        console.log(_this.map, "_this.map");

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

    //store 12 maps for the first screen zoom out
    formTheFirstMap: function () {
        console.log("formTheFirstMap");
        _this.map_1 = _this.add.image(80, 80, 'Loc_1_1');
        _this.circle_1 = _this.add.image(180, 180, 'Red Circle_2');
        _this.map_1.name = "Loc_1_1";
        _this.circle_1.name = "Red Circle_2";
        _this.map_1.visible = false;
        _this.circle_1.visible = false;
        _this.allMapsGroup.addChild(_this.map_1);
        _this.allCircleGroup.addChild(_this.circle_1);

        _this.map_2 = _this.add.image(80, 80, 'Loc_4');
        _this.circle_2 = _this.add.image(80, 80, 'Red Circle_2');
        _this.circle_2.name = "Red Circle_2";
        _this.map_2.name = "Loc_4";
        _this.map_2.visible = false;
        _this.allMapsGroup.addChild(_this.map_2);
        _this.allCircleGroup.addChild(_this.circle_2);

        _this.map_3 = _this.add.image(80, 80, 'Loc_8_1');
        _this.circle_3 = _this.add.image(180, 180, 'Red Circle_2');
        _this.map_3.name = "Loc_8_1";
        _this.circle_3.name = "Red Circle_2";
        _this.circle_3.visible = false;
        _this.map_3.visible = false;
        _this.allMapsGroup.addChild(_this.map_3);
        _this.allCircleGroup.addChild(_this.circle_3);

        _this.map_4 = _this.add.image(80, 80, 'Loc_16');
        _this.circle_4 = _this.add.image(180, 180, 'Red Circle_2');
        _this.map_4.name = "Loc_16";
        _this.circle_4.name = "Red Circle_2";
        _this.circle_4.visible = false;
        _this.map_4.visible = false;
        _this.allMapsGroup.addChild(_this.map_4);
        _this.allCircleGroup.addChild(_this.circle_4);

        _this.map_5 = _this.add.image(80, 80, 'Loc_1');
        _this.circle_5 = _this.add.image(180, 180, 'Red Circle_2');
        _this.map_5.name = "Loc_1";
        _this.circle_5.name = "Red Circle_2";
        _this.circle_5.visible = false;
        _this.map_5.visible = false;
        _this.allMapsGroup.addChild(_this.map_5);
        _this.allCircleGroup.addChild(_this.circle_5);

        _this.map_6 = _this.add.image(80, 80, 'Loc_2');
        _this.circle_6 = _this.add.image(180, 180, 'Red Circle_2');
        _this.map_6.name = "Loc_2";
        _this.circle_6.name = "Red Circle_2";
        _this.circle_6.visible = false;
        _this.map_6.visible = false;
        _this.allMapsGroup.addChild(_this.map_6);
        _this.allCircleGroup.addChild(_this.circle_6);

        _this.map_7 = _this.add.image(80, 80, 'Loc_4_1');
        _this.circle_7 = _this.add.image(180, 180, 'Red Circle_2');
        _this.map_7.name = "Loc_4_1";
        _this.circle_7.name = "Red Circle_2";
        _this.circle_7.visible = false;
        _this.map_7.visible = false;
        _this.allMapsGroup.addChild(_this.map_7);
        _this.allCircleGroup.addChild(_this.circle_7);

        _this.map_8 = _this.add.image(80, 80, 'Loc_6');
        _this.circle_8 = _this.add.image(180, 180, 'Red Circle_2');
        _this.map_8.name = "Loc_6";
        _this.circle_8.name = "Red Circle_2";
        _this.circle_8.visible = false;
        _this.map_8.visible = false;
        _this.allMapsGroup.addChild(_this.map_8);
        _this.allCircleGroup.addChild(_this.circle_8);

        _this.map_9 = _this.add.image(80, 80, 'Loc_8');
        _this.circle_9 = _this.add.image(180, 180, 'Red Circle_2');
        _this.map_9.name = "Loc_8";
        _this.map_9.visible = false;
        _this.circle_9.name = "Red Circle_2";
        _this.circle_9.visible = false;
        _this.allMapsGroup.addChild(_this.map_9);
        _this.allCircleGroup.addChild(_this.circle_9);

        _this.map_10 = _this.add.image(80, 80, 'Loc_10');
        _this.circle_10 = _this.add.image(180, 180, 'Red Circle_2');
        _this.map_10.name = "Loc_10";
        _this.map_10.visible = false;
        _this.circle_10.name = "Red Circle_2";
        _this.circle_10.visible = false;
        _this.allMapsGroup.addChild(_this.map_10);
        _this.allCircleGroup.addChild(_this.circle_10);

        _this.map_11 = _this.add.image(80, 80, 'Loc_12');
        _this.circle_11 = _this.add.image(180, 180, 'Red Circle_2');
        _this.map_11.name = "Loc_12";
        _this.map_11.visible = false;
        _this.circle_11.name = "Red Circle_2";
        _this.circle_11.visible = false;
        _this.allMapsGroup.addChild(_this.map_11);
        _this.allCircleGroup.addChild(_this.circle_11);

        _this.map_12 = _this.add.image(80, 80, 'Loc_14');
        _this.circle_12 = _this.add.image(180, 180, 'Red Circle_2');
        _this.map_12.name = "Loc_14";
        _this.map_12.visible = false;
        _this.circle_12.name = "Red Circle_2";
        _this.circle_12.visible = false;
        _this.allMapsGroup.addChild(_this.map_12);
        _this.allCircleGroup.addChild(_this.circle_12);

        // console.log(_this.allMapsGroup.length, "_this.allMapsGroup");
    },

    //display the round and map for first screen
    DisplayQuestion: function () {
        console.log("DisplayQuestion");
        //console.log(_this.allMapsGroup.length, _this.map[_this.count1], "_this.allMapsGroup");

        _this.firstMap = _this.allMapsGroup.getChildAt(_this.map[_this.count1] - 1).name;
        _this.mapShow = _this.add.image(40, 80, _this.firstMap);

        _this.redCircle = _this.map[_this.count1] - 1;

        _this.firstCircle = _this.allCircleGroup.getChildAt(_this.redCircle).name;
        _this.circleShow = _this.add.image(_this.redCircle_x[_this.map[_this.count1] - 1], _this.redCircle_y[_this.map[_this.count1] - 1], _this.firstCircle);

        // console.log(_this.firstMap, _this.allMapsGroup.getChildAt(_this.map[_this.count1] - 1).name, "_this.firstMap");

        if (_this.order[0] == 1) {
            _this.Ask_Question1.play();
        }
        if (_this.order[0] == 2) {
            _this.Ask_Question2.play();
        }
        if (_this.order[0] == 3) {
            _this.Ask_Question3.play();
        }
        if (_this.order[0] == 4) {
            _this.Ask_Question4.play();
        }
        if (_this.order[0] == 5) {
            _this.Ask_Question5.play();
        }
        if (_this.order[0] == 6) {
            _this.Ask_Question6.play();
        }
        if (_this.order[0] == 7) {
            _this.Ask_Question7.play();
        }
        if (_this.order[0] == 8) {
            _this.Ask_Question8.play();
        }
        if (_this.order[0] == 9) {
            _this.Ask_Question9.play();
        }

        // Set the starting and ending zoom levels for the first image
        _this.startZoom1 = 0.9;
        _this.endZoom1 = 1.0;

        // Set the duration of the first animation in milliseconds
        _this.duration1 = 1000;

        // Create a new tween to gradually increase the scale of the first image
        _this.zoomTween1 = _this.add.tween(_this.mapShow.scale).to({ x: _this.endZoom1, y: _this.endZoom1 }, _this.duration1, Phaser.Easing.Linear.None, true);
        // _this.circleShow.x += 100;
        // Set the starting scale of the first image
        _this.mapShow.scale.set(_this.startZoom1);
        // _this.circleShow.scale.set(_this.startZoom1);

        // Start the second animation when the first tween completes
        _this.zoomTween1.onComplete.add(() => {
            // Get a reference to the second image
            _this.formTheSecondMap();
            _this.DisplaySecondQuestion();

            // Set the duration of the second animation in milliseconds
            _this.duration2 = 1000;

            // Set the starting scale and alpha of the second image
            //  _this.mapShowSecond.scale.set(_this.startZoom2);
            _this.mapShowSecond.alpha = 0;

            // Create a new tween to gradually increase the scale and alpha of the second image
            _this.zoomTween2 = _this.add.tween(_this.mapShowSecond).to({ alpha: 1, x: 40, y: 80 }, _this.duration2, Phaser.Easing.Linear.None, true);

            // Remove the first image when the second tween completes
            _this.zoomTween2.onComplete.add(() => {
                _this.DestoryFirstScreenObj();
            });
        });
        _this.zoomTween1.onUpdateCallback(() => {
            _this.mapShow.scale.set(_this.mapShow.scale.x + (_this.endZoom1 - _this.startZoom1) / _this.duration1 * _this.time.elapsedMS);
            // _this.circleShow.scale.set(_this.circleShow.scale.x + (_this.endZoom1 - _this.startZoom1) / _this.duration1 * _this.time.elapsedMS);
        });

    },

    //store 12 maps for the second screen zoom in
    formTheSecondMap: function () {
        console.log("formTheSecondMap");
        _this.map_1 = _this.add.image(80, 80, 'Loc_1_1');
        _this.circle_1 = _this.add.image(180, 180, 'Red Circle_1');
        _this.map_1.name = "Loc_1_1";
        _this.circle_1.name = "Red Circle_1";
        _this.map_1.visible = false;
        _this.circle_1.visible = false;
        _this.allMapsGroupSecond.addChild(_this.map_1);
        _this.allCircleGroupSecond.addChild(_this.circle_1);

        _this.map_2 = _this.add.image(80, 80, 'Loc_5');
        _this.circle_2 = _this.add.image(80, 80, 'Red Circle_1');
        _this.circle_2.name = "Red Circle_1";
        _this.map_2.name = "Loc_5";
        _this.map_2.visible = false;
        _this.allMapsGroupSecond.addChild(_this.map_2);
        _this.allCircleGroupSecond.addChild(_this.circle_2);

        _this.map_3 = _this.add.image(80, 80, 'Loc_9_1');
        _this.circle_3 = _this.add.image(180, 180, 'Red Circle_1');
        _this.map_3.name = "Loc_9_1";
        _this.circle_3.name = "Red Circle_1";
        _this.circle_3.visible = false;
        _this.map_3.visible = false;
        _this.allMapsGroupSecond.addChild(_this.map_3);
        _this.allCircleGroupSecond.addChild(_this.circle_3);

        _this.map_4 = _this.add.image(80, 80, 'Loc_17');
        _this.circle_4 = _this.add.image(180, 180, 'Red Circle_1');
        _this.map_4.name = "Loc_17";
        _this.circle_4.name = "Red Circle_1";
        _this.circle_4.visible = false;
        _this.map_4.visible = false;
        _this.allMapsGroupSecond.addChild(_this.map_4);
        _this.allCircleGroupSecond.addChild(_this.circle_4);

        _this.map_5 = _this.add.image(80, 80, 'Loc_1');
        _this.circle_5 = _this.add.image(180, 180, 'Red Circle_1');
        _this.map_5.name = "Loc_1";
        _this.circle_5.name = "Red Circle_1";
        _this.circle_5.visible = false;
        _this.map_5.visible = false;
        _this.allMapsGroupSecond.addChild(_this.map_5);
        _this.allCircleGroupSecond.addChild(_this.circle_5);

        _this.map_6 = _this.add.image(80, 80, 'Loc_3');
        _this.circle_6 = _this.add.image(180, 180, 'Red Circle_1');
        _this.map_6.name = "Loc_3";
        _this.circle_6.name = "Red Circle_1";
        _this.circle_6.visible = false;
        _this.map_6.visible = false;
        _this.allMapsGroupSecond.addChild(_this.map_6);
        _this.allCircleGroupSecond.addChild(_this.circle_6);

        _this.map_7 = _this.add.image(80, 80, 'Loc_5_1');
        _this.circle_7 = _this.add.image(180, 180, 'Red Circle_1');
        _this.map_7.name = "Loc_5_1";
        _this.circle_7.name = "Red Circle_1";
        _this.circle_7.visible = false;
        _this.map_7.visible = false;
        _this.allMapsGroupSecond.addChild(_this.map_7);
        _this.allCircleGroupSecond.addChild(_this.circle_7);

        _this.map_8 = _this.add.image(80, 80, 'Loc_7');
        _this.circle_8 = _this.add.image(180, 180, 'Red Circle_1');
        _this.map_8.name = "Loc_7";
        _this.circle_8.name = "Red Circle_1";
        _this.circle_8.visible = false;
        _this.map_8.visible = false;
        _this.allMapsGroupSecond.addChild(_this.map_8);
        _this.allCircleGroupSecond.addChild(_this.circle_8);

        _this.map_9 = _this.add.image(80, 80, 'Loc_9');
        _this.circle_9 = _this.add.image(180, 180, 'Red Circle_1');
        _this.map_9.name = "Loc_9";
        _this.map_9.visible = false;
        _this.circle_9.name = "Red Circle_1";
        _this.circle_9.visible = false;
        _this.allMapsGroupSecond.addChild(_this.map_9);
        _this.allCircleGroupSecond.addChild(_this.circle_9);

        _this.map_10 = _this.add.image(80, 80, 'Loc_11');
        _this.circle_10 = _this.add.image(180, 180, 'Red Circle_1');
        _this.map_10.name = "Loc_11";
        _this.map_10.visible = false;
        _this.circle_10.name = "Red Circle_1";
        _this.circle_10.visible = false;
        _this.allMapsGroupSecond.addChild(_this.map_10);
        _this.allCircleGroupSecond.addChild(_this.circle_10);

        _this.map_11 = _this.add.image(80, 80, 'Loc_13');
        _this.circle_11 = _this.add.image(180, 180, 'Red Circle_1');
        _this.map_11.name = "Loc_13";
        _this.map_11.visible = false;
        _this.circle_11.name = "Red Circle_1";
        _this.circle_11.visible = false;
        _this.allMapsGroupSecond.addChild(_this.map_11);
        _this.allCircleGroupSecond.addChild(_this.circle_11);

        _this.map_12 = _this.add.image(80, 80, 'Loc_15');
        _this.circle_12 = _this.add.image(180, 180, 'Red Circle_1');
        _this.map_12.name = "Loc_15";
        _this.map_12.visible = false;
        _this.circle_12.name = "Red Circle_1";
        _this.circle_12.visible = false;
        _this.allMapsGroupSecond.addChild(_this.map_12);
        _this.allCircleGroupSecond.addChild(_this.circle_12);

    },

    //display the circle and map for second screen screen
    DisplaySecondQuestion: function () {
        console.log("DisplaySecondQuestion");

        _this.secondMap = _this.allMapsGroupSecond.getChildAt(_this.map[_this.count1] - 1).name;
        _this.mapShowSecond = _this.add.image(40, 80, _this.secondMap);

        _this.redCircleSecond = _this.map[_this.count1] - 1;

        _this.secondCircle = _this.allCircleGroupSecond.getChildAt(_this.redCircleSecond).name;
        _this.circleShowSecond = _this.add.image(_this.redCircle2_x[_this.map[_this.count1] - 1], _this.redCircle2_y[_this.map[_this.count1] - 1], _this.secondCircle);

        _this.numberCircleOne = _this.add.sprite(_this.numberCircleOne_x[_this.map[_this.count1] - 1], _this.numberCircleOne_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleOne.frame = 0;
        _this.numberCircleOne.scale.setTo(0.8);
        _this.numberCircleOne.inputEnabled = true;
        _this.numberCircleOne.input.useHandCursor = true;
        _this.numberCircleOne.events.onInputDown.add(_this.oneInput);

        _this.numberCircleTwo = _this.add.sprite(_this.numberCircleTwo_x[_this.map[_this.count1] - 1], _this.numberCircleTwo_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleTwo.frame = 0;
        _this.numberCircleTwo.scale.setTo(0.8);
        _this.numberCircleTwo.inputEnabled = true;
        _this.numberCircleTwo.input.useHandCursor = true;
        _this.numberCircleTwo.events.onInputDown.add(_this.twoInput);

        _this.numberCircleThree = _this.add.sprite(_this.numberCircleThree_x[_this.map[_this.count1] - 1], _this.numberCircleThree_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleThree.frame = 0;
        _this.numberCircleThree.scale.setTo(0.8);
        _this.numberCircleThree.inputEnabled = true;
        _this.numberCircleThree.input.useHandCursor = true;
        _this.numberCircleThree.events.onInputDown.add(_this.threeInput);

        _this.numberCircleFour = _this.add.sprite(_this.numberCircleFour_x[_this.map[_this.count1] - 1], _this.numberCircleFour_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleFour.frame = 0;
        _this.numberCircleFour.scale.setTo(0.8);
        _this.numberCircleFour.inputEnabled = true;
        _this.numberCircleFour.input.useHandCursor = true;
        _this.numberCircleFour.events.onInputDown.add(_this.fourInput);

        _this.numberCircleFive = _this.add.sprite(_this.numberCircleFive_x[_this.map[_this.count1] - 1], _this.numberCircleFive_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleFive.frame = 0;
        _this.numberCircleFive.scale.setTo(0.8);
        _this.numberCircleFive.inputEnabled = true;
        _this.numberCircleFive.input.useHandCursor = true;
        _this.numberCircleFive.events.onInputDown.add(_this.fiveInput);

        _this.one = _this.add.sprite(_this.numberOne_x[_this.map[_this.count1] - 1], _this.numberOne_y[_this.map[_this.count1] - 1], 'Number');
        _this.one.frame = 0;
        _this.one.scale.setTo(0.8);

        _this.two = _this.add.sprite(_this.numberTwo_x[_this.map[_this.count1] - 1], _this.numberTwo_y[_this.map[_this.count1] - 1], 'Number');
        _this.two.frame = 1;
        _this.two.scale.setTo(0.8);

        _this.three = _this.add.sprite(_this.numberThree_x[_this.map[_this.count1] - 1], _this.numberThree_y[_this.map[_this.count1] - 1], 'Number');
        _this.three.frame = 2;
        _this.three.scale.setTo(0.8);

        _this.four = _this.add.sprite(_this.numberFour_x[_this.map[_this.count1] - 1], _this.numberFour_y[_this.map[_this.count1] - 1], 'Number');
        _this.four.frame = 3;
        _this.four.scale.setTo(0.8);

        _this.five = _this.add.sprite(_this.numberFive_x[_this.map[_this.count1] - 1], _this.numberFive_y[_this.map[_this.count1] - 1], 'Number');
        _this.five.frame = 4;
        _this.five.scale.setTo(0.8);

        _this.tick = _this.add.sprite(888, 440, 'TickBtn');
        _this.tick.scale.setTo(0.9, 1.2);
        _this.tick.frame = 1;
        _this.tick.inputEnabled = true;
        _this.tick.input.useHandCursor = true;
        _this.tick.events.onInputDown.add(_this.tickEvaluation);

    },

    //destroing the first screen map and circle. 
    DestoryFirstScreenObj: function () {
        console.log("DestoryFirstScreenObj");
        _this.allMapsGroup.destroy();
        _this.allCircleGroup.destroy();
        _this.mapShow.destroy();
        _this.circleShow.destroy();
    },

    oneInput: function () {
        console.log("oneInput");
        _this.clickSound.play();
        if (_this.numberCircleOne.frame == 1)
            _this.numberCircleOne.frame = 0;

        else
            _this.numberCircleOne.frame = 1;
    },

    twoInput: function () {
        console.log("twoInput");
        _this.clickSound.play();
        if (_this.numberCircleTwo.frame == 1)
            _this.numberCircleTwo.frame = 0;

        else
            _this.numberCircleTwo.frame = 1;
    },

    threeInput: function () {
        console.log("threeInput");
        _this.clickSound.play();
        if (_this.numberCircleThree.frame == 1)
            _this.numberCircleThree.frame = 0;

        else
            _this.numberCircleThree.frame = 1;
    },

    fourInput: function () {
        console.log("fourInput");
        _this.clickSound.play();
        if (_this.numberCircleFour.frame == 1)
            _this.numberCircleFour.frame = 0;

        else
            _this.numberCircleFour.frame = 1;
    },

    fiveInput: function () {
        console.log("fiveInput");
        _this.clickSound.play();
        if (_this.numberCircleFive.frame == 1)
            _this.numberCircleFive.frame = 0;

        else
            _this.numberCircleFive.frame = 1;
    },

    //Tick button in the question screen and its evaluation.
    tickEvaluation: function () {
        console.log("tickEvaluation");
        if (_this.map[_this.count1] == 1) {
            _this.map1Validation();
        }
        else if (_this.map[_this.count1] == 2) {
            _this.map2Validation();
        }
        else if (_this.map[_this.count1] == 3) {
            _this.map3Validation();
        }
        else if (_this.map[_this.count1] == 4) {
            _this.map4Validation();
        }
        else if (_this.map[_this.count1] == 5) {
            _this.map5Validation();
        }
        else if (_this.map[_this.count1] == 6) {
            _this.map6Validation();
        }
        else if (_this.map[_this.count1] == 7) {
            _this.map7Validation();
        }
        else if (_this.map[_this.count1] == 8) {
            _this.map8Validation();
        }
        else if (_this.map[_this.count1] == 9) {
            _this.map9Validation();
        }
        else if (_this.map[_this.count1] == 10) {
            _this.map10Validation();
        }
        else if (_this.map[_this.count1] == 11) {
            _this.map11Validation();
        }
        else {
            _this.map12Validation();
        }

    },

    map1Validation: function () {
        console.log("map1Validation");
        if (_this.order[0] == 1 || _this.order[0] == 7) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 2 || _this.order[0] == 3) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 6) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFive.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFive.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 9) {
            if ((_this.numberCircleFive.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFive.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else {
            console.log("exit.....");
        }

    },

    map2Validation: function () {
        console.log("map2Validation");
        if (_this.order[0] == 1 || _this.order[0] == 7) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 2 || _this.order[0] == 3) {
            if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 6) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFour.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFour.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 9) {
            if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFour.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFour.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else {
            console.log("exit.....");
        }

    },

    map3Validation: function () {
        console.log("map3Validation");
        if (_this.order[0] == 1 || _this.order[0] == 7) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 2 || _this.order[0] == 3) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleThree.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 6) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0 && _this.numberCircleFour.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 9) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0 && _this.numberCircleFour.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else {
            console.log("exit....")
        }
    },

    map4Validation: function () {
        console.log("map4Validation");
        if (_this.order[0] == 1 || _this.order[0] == 7) {
            if ((_this.numberCircleThree.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFive.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 2 || _this.order[0] == 3) {
            if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 6) {
            if ((_this.numberCircleThree.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0 && _this.numberCircleFour.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFour.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 9) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFour.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else {
            console.log("exit..");
        }
    },

    map5Validation: function () {
        console.log("map5Validation");
        if (_this.order[0] == 1 || _this.order[0] == 7) {
            if ((_this.numberCircleFour.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFive.frame == 1 && _this.numberCircleOne.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 3 || _this.order[0] == 2) {
            if ((_this.numberCircleFour.frame == 1 && _this.numberCircleOne.frame == 1) && (_this.numberCircleFive.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 6) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFour.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 9) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else {
            console.log("exit...");
        }
    },

    map6Validation: function () {
        console.log("map6Validation");
        if (_this.order[0] == 1 || _this.order[0] == 7) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFive.frame == 1 && _this.numberCircleOne.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 2 || _this.order[0] == 3) {
            if ((_this.numberCircleFive.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 6) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleFour.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 8) {
            if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleFive.frame == 0 && _this.numberCircleOne.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 9) {
            if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else {
            console.log("exit...");
        }

    },

    map7Validation: function () {
        console.log("map7Validation");
        if (_this.order[0] == 1 || _this.order[0] == 7) {
            if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFive.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 2 || _this.order[0] == 3) {
            if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 6) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0 && _this.numberCircleFour.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleFive.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 7) {
            if ((_this.numberCircleThree.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFive.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 9) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleFive.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else {
            console.log("exit...");
        }
    },

    map8Validation: function () {
        console.log("map8Validation");
        if (_this.order[0] == 1 || _this.order[0] == 7) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFive.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 2 || _this.order[0] == 4) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 6) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleFive.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleFive.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 9) {
            if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleFive.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleFive.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else {
            console.log("exit...");
        }
    },

    map9Validation: function () {
        console.log("map9Validation");
        if (_this.order[0] == 1 || _this.order[0] == 7) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleThree.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 2 || _this.order[0] == 3) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 6) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFive.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleFive.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 9) {
            if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFive.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleFive.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else {
            console.log("exit...");
        }
    },

    map10Validation: function () {
        console.log("map10Validation");
        if (_this.order[0] == 1 || _this.order[0] == 7) {
            if ((_this.numberCircleFive.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleThree.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 2 || _this.order[0] == 5) {
            if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 6) {
            if ((_this.numberCircleFive.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleFive.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleFive.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 8) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleFive.frame == 0 && _this.numberCircleThree.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 9) {
            if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleFive.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleFive.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }

            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else {
            console.log("exit...");
        }
    },

    map11Validation: function () {
        console.log("map11Validation");
        if (_this.order[0] == 1 || _this.order[0] == 7) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleThree.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 2 || _this.order[0] == 3) {
            if ((_this.numberCircleThree.frame == 1 && _this.numberCircleOne.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 6) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFive.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleFive.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 9) {
            if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFive.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleFive.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else {
            console.log("exit...");
        }
    },

    map12Validation: function () {
        console.log("map12Validation");
        if (_this.order[0] == 1 || _this.order[0] == 7) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 2 || _this.order[0] == 3) {
            if ((_this.numberCircleFive.frame == 1 && _this.numberCircleOne.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleThree.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 6) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleThree.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0 && _this.numberCircleTwo.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleFive.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFive.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleThree.frame == 1 && _this.numberCircleFive.frame == 1) && (_this.numberCircleFour.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleOne.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else if (_this.order[0] == 9) {
            if ((_this.numberCircleOne.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 0 && _this.numberCircleFive.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleTwo.frame == 1 && _this.numberCircleFour.frame == 1) && (_this.numberCircleFive.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleThree.frame == 0)) {
                _this.partBQuestion();
            }
            else if ((_this.numberCircleFive.frame == 1 && _this.numberCircleTwo.frame == 1) && (_this.numberCircleThree.frame == 0 && _this.numberCircleOne.frame == 0 && _this.numberCircleFour.frame == 0)) {
                _this.partBQuestion();
            }
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.numberCircleOne.frame = 0;
                _this.numberCircleTwo.frame = 0;
                _this.numberCircleThree.frame = 0;
                _this.numberCircleFour.frame = 0;
                _this.numberCircleFive.frame = 0;
            }
        }
        else {
            console.log("exit...");
        }

    },

    partBQuestion: function () {
        _this.noofAttempts++;
        _this.counterCelebrationSound.play();
        _this.destroyPartA();
        _this.time.events.add(800, () => {
            _this.ThirdMapDisplay();
        });
    },

    destroyPartA: function () {
        //  _this.allMapsGroupSecond.destroy();
        _this.allCircleGroupSecond.destroy();
        _this.tick.destroy();
        _this.mapShowSecond.destroy();
        _this.circleShowSecond.destroy();
        _this.numberCircleOne.destroy();
        _this.numberCircleTwo.destroy();
        _this.numberCircleThree.destroy();
        _this.numberCircleFour.destroy();
        _this.numberCircleFive.destroy();

        _this.one.destroy();
        _this.two.destroy();
        _this.three.destroy();
        _this.four.destroy();
        _this.five.destroy();
    },

    lastScreenCelebration: function () {
        console.log("lastScreenCelebration");
        _this.celebrationSound.play();
        telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);
        _this.starActions();
        _this.time.events.add(3000, () => {
            _this.clearAll();
            if (_this.count1 == 6) {
                _this.state.start('score', true, false, gameID, _this.microConcepts);
                console.log("score");
            }
            else {
                _this.time.events.add(800, () => {
                    _this.getQuestion();
                });

            }
        });
    },

    //second set of map displaying (3 to 6)
    ThirdMapDisplay: function () {
        console.log("ThirdMapDisplay");

        _this.map_1 = _this.add.image(80, 80, 'Loc_1_1');
        _this.map_1.name = "Loc_1_1";
        _this.map_1.visible = false;
        _this.allMapsGroupThrid.addChild(_this.map_1);

        _this.map_2 = _this.add.image(80, 80, 'Loc_5');
        _this.map_2.name = "Loc_5";
        _this.map_2.visible = false;
        _this.allMapsGroupThrid.addChild(_this.map_2);

        _this.map_3 = _this.add.image(80, 80, 'Loc_9_1');
        _this.map_3.name = "Loc_9_1";
        _this.map_3.visible = false;
        _this.allMapsGroupThrid.addChild(_this.map_3);

        _this.map_4 = _this.add.image(80, 80, 'Loc_17');
        _this.map_4.name = "Loc_17";
        _this.map_4.visible = false;
        _this.allMapsGroupThrid.addChild(_this.map_4);

        _this.map_5 = _this.add.image(80, 80, 'Loc_1');
        _this.map_5.name = "Loc_1";
        _this.map_5.visible = false;
        _this.allMapsGroupThrid.addChild(_this.map_5);

        _this.map_6 = _this.add.image(80, 80, 'Loc_3');
        _this.map_6.name = "Loc_3";
        _this.map_6.visible = false;
        _this.allMapsGroupThrid.addChild(_this.map_6);

        _this.map_7 = _this.add.image(80, 80, 'Loc_5_1');
        _this.map_7.name = "Loc_5_1";
        _this.map_7.visible = false;
        _this.allMapsGroupThrid.addChild(_this.map_7);

        _this.map_8 = _this.add.image(80, 80, 'Loc_7');
        _this.map_8.name = "Loc_7";
        _this.map_8.visible = false;
        _this.allMapsGroupThrid.addChild(_this.map_8);

        _this.map_9 = _this.add.image(80, 80, 'Loc_9');
        _this.map_9.name = "Loc_9";
        _this.map_9.visible = false;
        _this.allMapsGroupThrid.addChild(_this.map_9);

        _this.map_10 = _this.add.image(80, 80, 'Loc_11');
        _this.map_10.name = "Loc_11";
        _this.map_10.visible = false;
        _this.allMapsGroupThrid.addChild(_this.map_10);

        _this.map_11 = _this.add.image(80, 80, 'Loc_13');
        _this.map_11.name = "Loc_13";
        _this.map_11.visible = false;
        _this.allMapsGroupThrid.addChild(_this.map_11);

        _this.map_12 = _this.add.image(80, 80, 'Loc_15');
        _this.map_12.name = "Loc_15";
        _this.map_12.visible = false;
        _this.allMapsGroupThrid.addChild(_this.map_12);

        //order for asking questions
        _this.order_1 = Math.floor(Math.random() * (4 - 2)) + 2;//2,3

        if (_this.order_1 == 2)
            _this.variableArray = ['x', 'y'];
        else
            _this.variableArray = ['x', 'y', 'z'];

        console.log(_this.variableArray, " _this.variableArray");
        console.log(_this.order_1, "_this.order_1");

        _this.thirdMap = _this.allMapsGroupThrid.getChildAt(_this.map[_this.count1] - 1).name;
        _this.mapShowThird = _this.add.image(40, 80, _this.thirdMap);
        _this.mapShowThird.alpha = 0;

        _this.tween1 = _this.add.tween(_this.mapShowThird).to({ alpha: 1 }, 2500, Phaser.Easing.Linear.None, true);
        _this.tween1.onComplete.add(function () {

            _this.addThirdMapNumbers();

        });

        // _this.addThirdMapNumbers();
    },

    //store 12 maps for the second set screen zoom in
    addThirdMapNumbers: function () {
        console.log("addThirdMapNumbers");
        _this.Question_flag = 1;
        if (_this.count1 == 0) {
            _this.Ask_Question10.play();
        }

        if (_this.map[_this.count1] == 1) {
            _this.map1XYZ();
        }
        else if (_this.map[_this.count1] == 2 || _this.map[_this.count1] == 8 || _this.map[_this.count1] == 9) {
            _this.map2XYZ();
        }
        else if (_this.map[_this.count1] == 3) {
            _this.map3XYZ();
        }
        else if (_this.map[_this.count1] == 4 || _this.map[_this.count1] == 5 || _this.map[_this.count1] == 6 || _this.map[_this.count1] == 7 || _this.map[_this.count1] == 10) {
            _this.map4XYZ();
        }

        else if (_this.map[_this.count1] == 11 || _this.map[_this.count1] == 12) {
            _this.map5XYZ();
        }

        // _this.mask_1_pos_x = [590, 280, 530, 710, 235, 270, 275, 405, 530, 445, 320, 475];
        // _this.mask_1_pos_y = [270, 340, 280, 265, 245, 270, 340, 340, 280, 330, 235, 250];
        //first arc
        _this.circle1_x = [595, 280, 535, 710, 238, 276, 280, 408, 530, 447, 325, 475];
        _this.circle1_y = [265, 340, 275, 265, 244, 270, 332, 338, 280, 333, 238, 255];
        _this.circle1 = _this.game.add.graphics(_this.circle1_x[_this.map[_this.count1] - 1], _this.circle1_y[_this.map[_this.count1] - 1]);
        _this.circle1.beginFill(0xE11584);
        _this.radius1 = [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 100];
        _this.circle1.drawCircle(0, 0, _this.radius1[_this.map[_this.count1] - 1]);
        _this.circle1.endFill();
        //_this.circle1.alpha =0.5;

        _this.mask_1_pos_x = [605, 290, 541, 717, 228, 267, 272, 403, 526, 440, 315, 475];
        _this.mask_1_pos_y = [265, 335, 267, 258, 243, 284, 336, 348, 298, 330, 248, 265];

        _this.mask1 = _this.game.add.graphics(_this.mask_1_pos_x[_this.map[_this.count1] - 1], _this.mask_1_pos_y[_this.map[_this.count1] - 1]);

        // Draw a sector shape on the mask graphics object
        _this.mask1.beginFill(0xffffff);
        _this.mask1.moveTo(0, 0);
        _this.mask1.lineTo(50, 0);
        _this.mask1_x = [342, 47, 330, 350, 210, 172, 170, 179, 160, 250, 160, 110];// 
        _this.mask1_y = [298, 286, 270, 293, 136, 80, 105, 83, 90, 185, 107, 45];//  
        _this.mask1.arc(0, 0, 50, _this.math.degToRad(_this.mask1_x[_this.map[_this.count1] - 1]), _this.math.degToRad(_this.mask1_y[_this.map[_this.count1] - 1]), true);
        _this.mask1.lineTo(0, 0);
        _this.mask1.lineTo(0, 0);
        _this.mask1.endFill();
        // Apply the mask to the circle sprite
        _this.circle1.mask = _this.mask1;

        //second arc
        _this.circle2_x = [595, 280, 535, 703, 230, 273, 290, 415, 540, 455, 330, 483];
        _this.circle2_y = [265, 340, 275, 280, 234, 260, 325, 335, 270, 340, 244, 245];
        _this.circle2 = _this.game.add.graphics(_this.circle1_x[_this.map[_this.count1] - 1], _this.circle1_y[_this.map[_this.count1] - 1]);
        _this.circle2.beginFill(0xE11584);
        _this.radius2 = [90, 90, 90, 70, 70, 70, 70, 70, 70, 70, 80, 70];
        _this.circle2.drawCircle(0, 0, _this.radius1[_this.map[_this.count1] - 1]);
        _this.circle2.endFill();

        _this.mask_2_pos_x = [595, 282, 530, 703, 230, 276, 291, 415, 538, 455, 330, 483];
        _this.mask_2_pos_y = [280, 356, 297, 280, 232, 250, 326, 335, 271, 343, 243, 245];
        _this.mask2 = _this.game.add.graphics(_this.mask_2_pos_x[_this.map[_this.count1] - 1], _this.mask_2_pos_y[_this.map[_this.count1] - 1]);

        // Draw a sector shape on the mask graphics object
        _this.mask2.beginFill(0xffffff);
        _this.mask2.moveTo(0, 0);
        _this.mask2.lineTo(50, 0);
        _this.mask2_x = [117, 107, 150, 173, 273, 295, 46, 360, 340, 95, 110, 20];// 
        _this.mask2_y = [341, 43, 90, 75, 213, 264, 288, 263, 270, 3, 343, 290];//    
        _this.mask2.arc(0, 0, 50, _this.math.degToRad(_this.mask2_x[_this.map[_this.count1] - 1]), _this.math.degToRad(_this.mask2_y[_this.map[_this.count1] - 1]), true);
        _this.mask2.lineTo(0, 0);
        _this.mask2.lineTo(0, 0);
        _this.mask2.endFill();
        // Apply the mask to the circle sprite
        _this.circle2.mask = _this.mask2;

        //third arc
        _this.circle3_x = [595, 280, 535, 715, 240, 280, 280, 405, 540, 455, 335, 460];
        _this.circle3_y = [265, 340, 275, 278, 229, 278, 315, 330, 290, 330, 230, 252];
        _this.circle3 = _this.game.add.graphics(_this.circle1_x[_this.map[_this.count1] - 1], _this.circle1_y[_this.map[_this.count1] - 1]);
        _this.circle3.beginFill(0xE11584);
        _this.radius3 = [90, 90, 90, 70, 70, 70, 70, 60, 70, 70, 60, 80];
        _this.circle3.drawCircle(0, 0, _this.radius1[_this.map[_this.count1] - 1]);
        _this.circle3.endFill();

        _this.mask_3_pos_x = [593, 280, 530, 714, 242, 280, 280, 400, 538, 455, 335, 460];
        _this.mask_3_pos_y = [263, 325, 260, 278, 228, 280, 318, 320, 290, 329, 230, 252];
        _this.mask3 = _this.game.add.graphics(_this.mask_3_pos_x[_this.map[_this.count1] - 1], _this.mask_3_pos_y[_this.map[_this.count1] - 1]);

        // Draw a sector shape on the mask graphics object
        _this.mask3.beginFill(0xffffff);
        _this.mask3.moveTo(0, 0);
        _this.mask3.lineTo(50, 0);
        _this.mask3_x = [298, 287, 270, 74, 318, 85, 290, 263, 90, 5, 340, 228];// 
        _this.mask3_y = [255, 224, 250, 350, 270, 350, 227, 230, 340, 274, 287, 110];//  
        _this.mask3.arc(0, 0, 50, _this.math.degToRad(_this.mask3_x[_this.map[_this.count1] - 1]), _this.math.degToRad(_this.mask3_y[_this.map[_this.count1] - 1]), true);
        _this.mask3.lineTo(0, 0);
        _this.mask3.lineTo(0, 0);
        _this.mask3.endFill();
        // Apply the mask to the circle sprite
        _this.circle3.mask = _this.mask3;

        //fourth arc
        _this.circle4_x = [595, 280, 535, 706, 248, 285, 265, 398, 525, 445, 317, 490];
        _this.circle4_y = [265, 340, 275, 254, 240, 260, 325, 335, 280, 320, 235, 265];
        _this.circle4 = _this.add.graphics(_this.circle1_x[_this.map[_this.count1] - 1], _this.circle1_y[_this.map[_this.count1] - 1]);
        _this.circle4.beginFill(0xE11584);
        _this.radius4 = [90, 90, 90, 70, 70, 60, 70, 60, 70, 60, 70, 50];
        _this.circle4.drawCircle(0, 0, _this.radius1[_this.map[_this.count1] - 1]);
        _this.circle4.endFill();

        _this.mask_4_pos_x = [582, 270, 541, 707, 247, 285, 262, 398, 518, 443, 316, 496];
        _this.mask_4_pos_y = [285, 352, 290, 253, 240, 260, 326, 336, 280, 310, 235, 269];
        _this.mask4 = _this.add.graphics(_this.mask_4_pos_x[_this.map[_this.count1] - 1], _this.mask_4_pos_y[_this.map[_this.count1] - 1]);

        // Draw a sector shape on the mask graphics object
        _this.mask4.beginFill(0xffffff);
        _this.mask4.moveTo(0, 0);
        _this.mask4.lineTo(50, 0);
        _this.mask4_x = [160, 159, 90, 290, 31, 353, 224, 230, 244, 273, 212, 45];//  
        _this.mask4_y = [120, 109, 328, 252, 316, 295, 165, 178, 157, 255, 160, 20];//  
        _this.mask4.arc(0, 0, 50, _this.math.degToRad(_this.mask4_x[_this.map[_this.count1] - 1]), _this.math.degToRad(_this.mask4_y[_this.map[_this.count1] - 1]), true);
        _this.mask4.lineTo(0, 0);
        _this.mask4.lineTo(0, 0);
        _this.mask4.endFill();
        // Apply the mask to the circle sprite
        _this.circle4.mask = _this.mask4;

        //five arc
        _this.circle5_x = [595, 280, 535, 695, 240, 265, 285, 415, 530, 442, 325, 465];
        _this.circle5_y = [265, 340, 275, 260, 246, 265, 345, 345, 270, 342, 230, 240];
        _this.circle5 = _this.add.graphics(_this.circle1_x[_this.map[_this.count1] - 1], _this.circle1_y[_this.map[_this.count1] - 1]);
        _this.circle5.beginFill(0xE11584);
        _this.radius5 = [90, 90, 90, 70, 70, 70, 60, 70, 65, 70, 75, 70];
        _this.circle5.drawCircle(0, 0, _this.radius1[_this.map[_this.count1] - 1]);
        _this.circle5.endFill();

        _this.mask_5_pos_x = [583, 268, 522, 696, 238, 265, 285, 415, 527, 442, 325, 465];
        _this.mask_5_pos_y = [272, 342, 280, 261, 250, 265, 345, 347, 258, 342, 227, 240];
        _this.mask5 = _this.add.graphics(_this.mask_5_pos_x[_this.map[_this.count1] - 1], _this.mask_5_pos_y[_this.map[_this.count1] - 1]);

        // Draw a sector shape on the mask graphics object
        _this.mask5.beginFill(0xffffff);
        _this.mask5.moveTo(0, 0);
        _this.mask5.lineTo(50, 0);
        _this.mask5_x = [258, 225, 246, 254, 137, 263, 110, 85, 270, 185, 286, 291];//  
        _this.mask5_y = [160, 165, 150, 169, 29, 170, 50, 358, 246, 93, 213, 225];//  
        _this.mask5.arc(0, 0, 50, _this.math.degToRad(_this.mask5_x[_this.map[_this.count1] - 1]), _this.math.degToRad(_this.mask5_y[_this.map[_this.count1] - 1]), true);
        _this.mask5.lineTo(0, 0);
        _this.mask5.lineTo(0, 0);
        _this.mask5.endFill();
        // Apply the mask to the circle sprite
        _this.circle5.mask = _this.mask5;

    },

    map1XYZ: function () {
        _this.numberCircleOne = _this.add.sprite(_this.numberCircleOne_x[_this.map[_this.count1] - 1], _this.numberCircleOne_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleOne.frame = 0;
        _this.numberCircleOne.scale.setTo(0.8);
        if (_this.order_1 == 2) {
            _this.numberCircleOne.inputEnabled = true;
            _this.numberCircleOne.input.useHandCursor = true;
            _this.numberCircleOne.events.onInputDown.add(_this.oneAngle);
        }

        _this.numberCircleTwo = _this.add.sprite(_this.numberCircleTwo_x[_this.map[_this.count1] - 1], _this.numberCircleTwo_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleTwo.frame = 0;
        _this.numberCircleTwo.scale.setTo(0.8);
        _this.numberCircleTwo.inputEnabled = true;
        _this.numberCircleTwo.input.useHandCursor = true;
        _this.numberCircleTwo.events.onInputDown.add(_this.twoAngle);

        _this.numberCircleThree = _this.add.sprite(_this.numberCircleThree_x[_this.map[_this.count1] - 1], _this.numberCircleThree_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleThree.frame = 0;
        _this.numberCircleThree.scale.setTo(0.8);
        _this.numberCircleThree.inputEnabled = true;
        _this.numberCircleThree.input.useHandCursor = true;
        _this.numberCircleThree.events.onInputDown.add(_this.threeAngle);

        _this.numberCircleFour = _this.add.sprite(_this.numberCircleFour_x[_this.map[_this.count1] - 1], _this.numberCircleFour_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleFour.frame = 0;
        _this.numberCircleFour.scale.setTo(0.8);

        _this.numberCircleFive = _this.add.sprite(_this.numberCircleFive_x[_this.map[_this.count1] - 1], _this.numberCircleFive_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleFive.frame = 0;
        _this.numberCircleFive.scale.setTo(0.8);

        if (_this.order_1 == 2) {
            console.log("one...")
            _this.one = _this.add.sprite(_this.numberOne_x_1[_this.map[_this.count1] - 1], _this.numberOne_y_1[_this.map[_this.count1] - 1], 'Number');
            _this.one.frame = 2;//0
            _this.one.scale.setTo(0.8);
        }
        else {
            _this.valZ = _this.add.text(_this.numberOne_x_1[_this.map[_this.count1] - 1], _this.numberOne_y_1[_this.map[_this.count1] - 1], "z");
            _this.valZ.fontSize = "20px";
            _this.valZ.fill = '#ffffff';
        }

        _this.two = _this.add.sprite(_this.numberTwo_x_1[_this.map[_this.count1] - 1], _this.numberTwo_y_1[_this.map[_this.count1] - 1], 'Number');
        _this.two.frame = 0;//1
        _this.two.scale.setTo(0.8);

        _this.three = _this.add.sprite(_this.numberThree_x_1[_this.map[_this.count1] - 1], _this.numberThree_y_1[_this.map[_this.count1] - 1], 'Number');
        _this.three.frame = 1;//2
        _this.three.scale.setTo(0.8);

        _this.valX = _this.add.text(_this.numberFour_x_1[_this.map[_this.count1] - 1], _this.numberFour_y_1[_this.map[_this.count1] - 1], "x");//4
        _this.valX.fontSize = "20px";
        _this.valX.fill = '#ffffff';

        _this.valY = _this.add.text(_this.numberFive_x_1[_this.map[_this.count1] - 1], _this.numberFive_y_1[_this.map[_this.count1] - 1], "y");//5
        _this.valY.fontSize = "20px";
        _this.valY.fill = '#ffffff';


    },
    map2XYZ: function () {
        _this.numberCircleOne = _this.add.sprite(_this.numberCircleOne_x[_this.map[_this.count1] - 1], _this.numberCircleOne_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleOne.frame = 0;
        _this.numberCircleOne.scale.setTo(0.8);
        _this.numberCircleOne.inputEnabled = true;
        _this.numberCircleOne.input.useHandCursor = true;
        _this.numberCircleOne.events.onInputDown.add(_this.oneAngle);

        _this.numberCircleTwo = _this.add.sprite(_this.numberCircleTwo_x[_this.map[_this.count1] - 1], _this.numberCircleTwo_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleTwo.frame = 0;
        _this.numberCircleTwo.scale.setTo(0.8);
        if (_this.order_1 == 2) {
            _this.numberCircleTwo.inputEnabled = true;
            _this.numberCircleTwo.input.useHandCursor = true;
            _this.numberCircleTwo.events.onInputDown.add(_this.twoAngle);
        }

        _this.numberCircleThree = _this.add.sprite(_this.numberCircleThree_x[_this.map[_this.count1] - 1], _this.numberCircleThree_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleThree.frame = 0;
        _this.numberCircleThree.scale.setTo(0.8);

        _this.numberCircleFour = _this.add.sprite(_this.numberCircleFour_x[_this.map[_this.count1] - 1], _this.numberCircleFour_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleFour.frame = 0;
        _this.numberCircleFour.scale.setTo(0.8);
        _this.numberCircleFour.inputEnabled = true;
        _this.numberCircleFour.input.useHandCursor = true;
        _this.numberCircleFour.events.onInputDown.add(_this.fourAngle);

        _this.numberCircleFive = _this.add.sprite(_this.numberCircleFive_x[_this.map[_this.count1] - 1], _this.numberCircleFive_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleFive.frame = 0;
        _this.numberCircleFive.scale.setTo(0.8);

        _this.one = _this.add.sprite(_this.numberOne_x_1[_this.map[_this.count1] - 1], _this.numberOne_y_1[_this.map[_this.count1] - 1], 'Number');
        _this.one.frame = 0;//0
        _this.one.scale.setTo(0.8);

        if (_this.order_1 == 2) {
            _this.two = _this.add.sprite(_this.numberTwo_x_1[_this.map[_this.count1] - 1], _this.numberTwo_y_1[_this.map[_this.count1] - 1], 'Number');
            _this.two.frame = 2;//1
            _this.two.scale.setTo(0.8);
        }
        else {
            _this.valZ = _this.add.text(_this.numberTwo_x_1[_this.map[_this.count1] - 1], _this.numberTwo_y_1[_this.map[_this.count1] - 1], "z");
            _this.valZ.fontSize = "20px";
            _this.valZ.fill = '#ffffff';
        }

        _this.four = _this.add.sprite(_this.numberFour_x_1[_this.map[_this.count1] - 1], _this.numberFour_y_1[_this.map[_this.count1] - 1], 'Number');
        _this.four.frame = 1;//3
        _this.four.scale.setTo(0.8);


        _this.valX = _this.add.text(_this.numberThree_x_1[_this.map[_this.count1] - 1], _this.numberThree_y_1[_this.map[_this.count1] - 1], "x");
        _this.valX.fontSize = "20px";
        _this.valX.fill = '#ffffff';

        _this.valY = _this.add.text(_this.numberFive_x_1[_this.map[_this.count1] - 1], _this.numberFive_y_1[_this.map[_this.count1] - 1], "y");
        _this.valY.fontSize = "20px";
        _this.valY.fill = '#ffffff';



    },
    map3XYZ: function () {
        _this.numberCircleOne = _this.add.sprite(_this.numberCircleOne_x[_this.map[_this.count1] - 1], _this.numberCircleOne_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleOne.frame = 0;
        _this.numberCircleOne.scale.setTo(0.8);
        _this.numberCircleOne.inputEnabled = true;
        _this.numberCircleOne.input.useHandCursor = true;
        _this.numberCircleOne.events.onInputDown.add(_this.oneAngle);

        _this.numberCircleTwo = _this.add.sprite(_this.numberCircleTwo_x[_this.map[_this.count1] - 1], _this.numberCircleTwo_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleTwo.frame = 0;
        _this.numberCircleTwo.scale.setTo(0.8);
        if (_this.order_1 == 2) {
            _this.numberCircleTwo.inputEnabled = true;
            _this.numberCircleTwo.input.useHandCursor = true;
            _this.numberCircleTwo.events.onInputDown.add(_this.twoAngle);
        }

        _this.numberCircleThree = _this.add.sprite(_this.numberCircleThree_x[_this.map[_this.count1] - 1], _this.numberCircleThree_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleThree.frame = 0;
        _this.numberCircleThree.scale.setTo(0.8);
        _this.numberCircleThree.inputEnabled = true;
        _this.numberCircleThree.input.useHandCursor = true;
        _this.numberCircleThree.events.onInputDown.add(_this.threeAngle);

        _this.numberCircleFour = _this.add.sprite(_this.numberCircleFour_x[_this.map[_this.count1] - 1], _this.numberCircleFour_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleFour.frame = 0;
        _this.numberCircleFour.scale.setTo(0.8);

        _this.numberCircleFive = _this.add.sprite(_this.numberCircleFive_x[_this.map[_this.count1] - 1], _this.numberCircleFive_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleFive.frame = 0;
        _this.numberCircleFive.scale.setTo(0.8);

        _this.one = _this.add.sprite(_this.numberOne_x_1[_this.map[_this.count1] - 1], _this.numberOne_y_1[_this.map[_this.count1] - 1], 'Number');
        _this.one.frame = 0;
        _this.one.scale.setTo(0.8);

        if (_this.order_1 == 2) {
            _this.two = _this.add.sprite(_this.numberTwo_x_1[_this.map[_this.count1] - 1], _this.numberTwo_y_1[_this.map[_this.count1] - 1], 'Number');
            _this.two.frame = 2;//1
            _this.two.scale.setTo(0.8);
        }
        else {
            _this.valZ = _this.add.text(_this.numberTwo_x_1[_this.map[_this.count1] - 1], _this.numberTwo_y_1[_this.map[_this.count1] - 1], "z");
            _this.valZ.fontSize = "20px";
            _this.valZ.fill = '#ffffff';
        }

        _this.three = _this.add.sprite(_this.numberThree_x_1[_this.map[_this.count1] - 1], _this.numberThree_y_1[_this.map[_this.count1] - 1], 'Number');
        _this.three.frame = 1;//2
        _this.three.scale.setTo(0.8);

        _this.valX = _this.add.text(_this.numberFour_x_1[_this.map[_this.count1] - 1], _this.numberFour_y_1[_this.map[_this.count1] - 1], "x");
        _this.valX.fontSize = "20px";
        _this.valX.fill = '#ffffff';

        _this.valY = _this.add.text(_this.numberFive_x_1[_this.map[_this.count1] - 1], _this.numberFive_y_1[_this.map[_this.count1] - 1], "y");
        _this.valY.fontSize = "20px";
        _this.valY.fill = '#ffffff';



    },
    map4XYZ: function () {
        _this.numberCircleOne = _this.add.sprite(_this.numberCircleOne_x[_this.map[_this.count1] - 1], _this.numberCircleOne_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleOne.frame = 0;
        _this.numberCircleOne.scale.setTo(0.8);
        _this.numberCircleOne.inputEnabled = true;
        _this.numberCircleOne.input.useHandCursor = true;
        _this.numberCircleOne.events.onInputDown.add(_this.oneAngle);

        _this.numberCircleTwo = _this.add.sprite(_this.numberCircleTwo_x[_this.map[_this.count1] - 1], _this.numberCircleTwo_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleTwo.frame = 0;
        _this.numberCircleTwo.scale.setTo(0.8);
        _this.numberCircleTwo.inputEnabled = true;
        _this.numberCircleTwo.input.useHandCursor = true;
        _this.numberCircleTwo.events.onInputDown.add(_this.twoAngle);

        _this.numberCircleThree = _this.add.sprite(_this.numberCircleThree_x[_this.map[_this.count1] - 1], _this.numberCircleThree_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleThree.frame = 0;
        _this.numberCircleThree.scale.setTo(0.8);
        if (_this.order_1 == 2) {
            _this.numberCircleThree.inputEnabled = true;
            _this.numberCircleThree.input.useHandCursor = true;
            _this.numberCircleThree.events.onInputDown.add(_this.threeAngle);
        }


        _this.numberCircleFour = _this.add.sprite(_this.numberCircleFour_x[_this.map[_this.count1] - 1], _this.numberCircleFour_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleFour.frame = 0;
        _this.numberCircleFour.scale.setTo(0.8);

        _this.numberCircleFive = _this.add.sprite(_this.numberCircleFive_x[_this.map[_this.count1] - 1], _this.numberCircleFive_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleFive.frame = 0;
        _this.numberCircleFive.scale.setTo(0.8);

        _this.one = _this.add.sprite(_this.numberOne_x_1[_this.map[_this.count1] - 1], _this.numberOne_y_1[_this.map[_this.count1] - 1], 'Number');
        _this.one.frame = 0;
        _this.one.scale.setTo(0.8);

        _this.two = _this.add.sprite(_this.numberTwo_x_1[_this.map[_this.count1] - 1], _this.numberTwo_y_1[_this.map[_this.count1] - 1], 'Number');
        _this.two.frame = 1;
        _this.two.scale.setTo(0.8);

        if (_this.order_1 == 2) {
            console.log("order2....");
            _this.three = _this.add.sprite(_this.numberThree_x_1[_this.map[_this.count1] - 1], _this.numberThree_y_1[_this.map[_this.count1] - 1], 'Number');
            _this.three.frame = 2;
            _this.three.scale.setTo(0.8);
        }
        else {
            _this.valZ = _this.add.text(_this.numberThree_x_1[_this.map[_this.count1] - 1], _this.numberThree_y_1[_this.map[_this.count1] - 1], "z");
            _this.valZ.fontSize = "20px";
            _this.valZ.fill = '#ffffff';
        }

        _this.valX = _this.add.text(_this.numberFour_x_1[_this.map[_this.count1] - 1], _this.numberFour_y_1[_this.map[_this.count1] - 1], "x");
        _this.valX.fontSize = "20px";
        _this.valX.fill = '#ffffff';

        _this.valY = _this.add.text(_this.numberFive_x_1[_this.map[_this.count1] - 1], _this.numberFive_y_1[_this.map[_this.count1] - 1], "y");
        _this.valY.fontSize = "20px";
        _this.valY.fill = '#ffffff';


    },
    map5XYZ: function () {
        _this.numberCircleOne = _this.add.sprite(_this.numberCircleOne_x[_this.map[_this.count1] - 1], _this.numberCircleOne_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleOne.frame = 0;
        _this.numberCircleOne.scale.setTo(0.8);
        if (_this.order_1 == 2) {
            _this.numberCircleOne.inputEnabled = true;
            _this.numberCircleOne.input.useHandCursor = true;
            _this.numberCircleOne.events.onInputDown.add(_this.oneAngle);
        }

        _this.numberCircleTwo = _this.add.sprite(_this.numberCircleTwo_x[_this.map[_this.count1] - 1], _this.numberCircleTwo_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleTwo.frame = 0;
        _this.numberCircleTwo.scale.setTo(0.8);
        _this.numberCircleTwo.inputEnabled = true;
        _this.numberCircleTwo.input.useHandCursor = true;
        _this.numberCircleTwo.events.onInputDown.add(_this.twoAngle);

        _this.numberCircleThree = _this.add.sprite(_this.numberCircleThree_x[_this.map[_this.count1] - 1], _this.numberCircleThree_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleThree.frame = 0;
        _this.numberCircleThree.scale.setTo(0.8);

        _this.numberCircleFour = _this.add.sprite(_this.numberCircleFour_x[_this.map[_this.count1] - 1], _this.numberCircleFour_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleFour.frame = 0;
        _this.numberCircleFour.scale.setTo(0.8);
        _this.numberCircleFour.inputEnabled = true;
        _this.numberCircleFour.input.useHandCursor = true;
        _this.numberCircleFour.events.onInputDown.add(_this.fourAngle);

        _this.numberCircleFive = _this.add.sprite(_this.numberCircleFive_x[_this.map[_this.count1] - 1], _this.numberCircleFive_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleFive.frame = 0;
        _this.numberCircleFive.scale.setTo(0.8);
        // _this.numberCircleFive.inputEnabled = true;
        // _this.numberCircleFive.input.useHandCursor = true;
        // _this.numberCircleFive.events.onInputDown.add(_this.fiveAngle);

        if (_this.order_1 == 2) {
            _this.one = _this.add.sprite(_this.numberOne_x_1[_this.map[_this.count1] - 1], _this.numberOne_y_1[_this.map[_this.count1] - 1], 'Number');
            _this.one.frame = 2;//0
            _this.one.scale.setTo(0.8);
        }
        else {
            // _this.valZ = _this.add.sprite(_this.numberThree_x[_this.map[_this.count1] - 1], _this.numberThree_y[_this.map[_this.count1] - 1], 'Number');
            // _this.valZ.scale.setTo(0.8);
            _this.valZ = _this.add.text(_this.numberOne_x_1[_this.map[_this.count1] - 1], _this.numberOne_y_1[_this.map[_this.count1] - 1], "z");
            _this.valZ.fontSize = "20px";
            _this.valZ.fill = '#ffffff';
        }

        _this.two = _this.add.sprite(_this.numberTwo_x_1[_this.map[_this.count1] - 1], _this.numberTwo_y_1[_this.map[_this.count1] - 1], 'Number');
        _this.two.frame = 0;//1
        _this.two.scale.setTo(0.8);

        _this.four = _this.add.sprite(_this.numberFour_x_1[_this.map[_this.count1] - 1], _this.numberFour_y_1[_this.map[_this.count1] - 1], 'Number');
        _this.four.frame = 1;//3
        _this.four.scale.setTo(0.8);

        _this.valX = _this.add.text(_this.numberThree_x_1[_this.map[_this.count1] - 1], _this.numberThree_y_1[_this.map[_this.count1] - 1], "x");
        _this.valX.fontSize = "20px";
        _this.valX.fill = '#ffffff';

        _this.valY = _this.add.text(_this.numberFive_x_1[_this.map[_this.count1] - 1], _this.numberFive_y_1[_this.map[_this.count1] - 1], "y");
        _this.valY.fontSize = "20px";
        _this.valY.fill = '#ffffff';


    },

    oneAngle: function () {
        console.log("oneAngle");
        _this.clickSound.play();
        _this.numberCircleOne.destroy();
        _this.one.destroy();

        _this.angleOne = _this.add.text(_this.numberOne_x[_this.map[_this.count1] - 1], _this.numberOne_y[_this.map[_this.count1] - 1], _this.enterTxt1_angle[_this.map[_this.count1] - 1] + "\u{00B0}");
        _this.applyingStyle(_this.angleOne);

        if (_this.tick1Flag == false) {
            _this.tick1 = _this.add.sprite(888, 440, 'TickBtn');
            _this.tick1.scale.setTo(0.9, 1.2);
            _this.tick1.frame = 1;
            _this.tick1.inputEnabled = true;
            _this.tick1.input.useHandCursor = true;
            _this.tick1.events.onInputDown.add(_this.enterX);
            _this.tick1Flag = true;
        }
        if (_this.numberpadFlag == false) {
            if (_this.map[_this.count1] == 1) {
                if (_this.order_1 == 2) {
                    if (!(_this.two.exists || _this.three.exists || _this.one.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.two.exists || _this.three.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
            }
            else if (_this.map[_this.count1] == 2 || _this.map[_this.count1] == 8 || _this.map[_this.count1] == 9) {
                if (_this.order_1 == 2) {
                    if (!(_this.one.exists || _this.four.exists || _this.two.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.one.exists || _this.four.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
            }
            else if (_this.map[_this.count1] == 3) {
                if (_this.order_1 == 2) {
                    if (!(_this.one.exists || _this.three.exists || _this.two.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.one.exists || _this.three.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
            }
            else if (_this.map[_this.count1] == 4 || _this.map[_this.count1] == 5 || _this.map[_this.count1] == 6 || _this.map[_this.count1] == 7 || _this.map[_this.count1] == 10) {
                if (_this.order_1 == 2) {
                    if (!(_this.one.exists || _this.two.exists || _this.three.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.one.exists || _this.two.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
            }

            else if (_this.map[_this.count1] == 11 || _this.map[_this.count1] == 12) {
                if (_this.order_1 == 2) {
                    if (!(_this.two.exists || _this.four.exists || _this.one.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.two.exists || _this.four.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }

            }

        }
    },
    twoAngle: function () {
        console.log("twoAngle");
        _this.clickSound.play();
        _this.numberCircleTwo.destroy();
        _this.two.destroy();
        _this.angleTwo = _this.add.text(_this.numberTwo_x[_this.map[_this.count1] - 1], _this.numberTwo_y[_this.map[_this.count1] - 1], _this.enterTxt2_angle[_this.map[_this.count1] - 1] + "\u{00B0}");
        _this.applyingStyle(_this.angleTwo);

        if (_this.tick1Flag == false) {
            _this.tick1 = _this.add.sprite(888, 440, 'TickBtn');
            _this.tick1.scale.setTo(0.9, 1.2);
            _this.tick1.frame = 1;
            _this.tick1.inputEnabled = true;
            _this.tick1.input.useHandCursor = true;
            _this.tick1.events.onInputDown.add(_this.enterX);
            _this.tick1Flag = true;
        }
        if (_this.numberpadFlag == false) {
            if (_this.map[_this.count1] == 1) {
                if (_this.order_1 == 2) {
                    if (!(_this.two.exists || _this.three.exists || _this.one.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.two.exists || _this.three.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
            }
            else if (_this.map[_this.count1] == 2 || _this.map[_this.count1] == 8 || _this.map[_this.count1] == 9) {
                if (_this.order_1 == 2) {
                    if (!(_this.one.exists || _this.four.exists || _this.two.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.one.exists || _this.four.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
            }
            else if (_this.map[_this.count1] == 3) {
                if (_this.order_1 == 2) {
                    if (!(_this.one.exists || _this.three.exists || _this.two.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.one.exists || _this.three.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
            }
            else if (_this.map[_this.count1] == 4 || _this.map[_this.count1] == 5 || _this.map[_this.count1] == 6 || _this.map[_this.count1] == 7 || _this.map[_this.count1] == 10) {
                if (_this.order_1 == 2) {
                    if (!(_this.one.exists || _this.two.exists || _this.three.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.one.exists || _this.two.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
            }

            else if (_this.map[_this.count1] == 11 || _this.map[_this.count1] == 12) {
                if (_this.order_1 == 2) {
                    if (!(_this.two.exists || _this.four.exists || _this.one.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.two.exists || _this.four.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }

            }
            // _this.numberpadFlag = true;
        }
        // if (_this.order == 2) {
        //     if (!(_this.one.exists || _this.two.exists || _this.three.exists) || !(_this.two.exists || _this.three.exists || _this.one.exists) ||
        //         !(_this.one.exists || _this.four.exists || _this.two.exists) || !(_this.one.exists || _this.three.exists || _this.two.exists) ||
        //         !(_this.two.exists || _this.four.exists || _this.one.exists)) {
        //         console.log("abc..")
        //         _this.enterX();
        //         _this.tick1.destroy();
        //     }
        // }
        // else {
        //     if (!(_this.one.exists || _this.two.exists) || !(_this.two.exists || _this.three.exists) ||
        //         !(_this.one.exists || _this.four.exists) || !(_this.one.exists || _this.three.exists) ||
        //         !(_this.two.exists || _this.four.exists)) {
        //         _this.enterX();
        //         _this.tick1.destroy();
        //     }
        // }
    },
    threeAngle: function () {
        console.log("threeAngle");
        _this.clickSound.play();
        _this.numberCircleThree.destroy();
        _this.three.destroy();

        _this.angleThree = _this.add.text(_this.numberThree_x[_this.map[_this.count1] - 1], _this.numberThree_y[_this.map[_this.count1] - 1], _this.enterTxt3_angle[_this.map[_this.count1] - 1] + "\u{00B0}");
        _this.applyingStyle(_this.angleThree);

        if (_this.tick1Flag == false) {
            _this.tick1 = _this.add.sprite(888, 440, 'TickBtn');
            _this.tick1.scale.setTo(0.9, 1.2);
            _this.tick1.frame = 1;
            _this.tick1.inputEnabled = true;
            _this.tick1.input.useHandCursor = true;
            _this.tick1.events.onInputDown.add(_this.enterX);
            _this.tick1Flag = true;
        }
        if (_this.numberpadFlag == false) {
            if (_this.map[_this.count1] == 1) {
                if (_this.order_1 == 2) {
                    if (!(_this.two.exists || _this.three.exists || _this.one.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.two.exists || _this.three.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
            }
            else if (_this.map[_this.count1] == 2 || _this.map[_this.count1] == 8 || _this.map[_this.count1] == 9) {
                if (_this.order_1 == 2) {
                    if (!(_this.one.exists || _this.four.exists || _this.two.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.one.exists || _this.four.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
            }
            else if (_this.map[_this.count1] == 3) {
                if (_this.order_1 == 2) {
                    if (!(_this.one.exists || _this.three.exists || _this.two.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.one.exists || _this.three.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
            }
            else if (_this.map[_this.count1] == 4 || _this.map[_this.count1] == 5 || _this.map[_this.count1] == 6 || _this.map[_this.count1] == 7 || _this.map[_this.count1] == 10) {
                if (_this.order_1 == 2) {
                    if (!(_this.one.exists || _this.two.exists || _this.three.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.one.exists || _this.two.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
            }

            else if (_this.map[_this.count1] == 11 || _this.map[_this.count1] == 12) {
                if (_this.order_1 == 2) {
                    if (!(_this.two.exists || _this.four.exists || _this.one.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.two.exists || _this.four.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }

            }
            // _this.numberpadFlag = true;
        }
        // if (_this.order == 2) {
        //     if (!(_this.one.exists || _this.two.exists || _this.three.exists) || !(_this.two.exists || _this.three.exists || _this.one.exists) ||
        //         !(_this.one.exists || _this.four.exists || _this.two.exists) || !(_this.one.exists || _this.three.exists || _this.two.exists) ||
        //         !(_this.two.exists || _this.four.exists || _this.one.exists)) {
        //         console.log("abc..")
        //         _this.enterX();
        //         _this.tick1.destroy();
        //     }
        // }
        // else {
        //     if (!(_this.one.exists || _this.two.exists) || !(_this.two.exists || _this.three.exists) ||
        //         !(_this.one.exists || _this.four.exists) || !(_this.one.exists || _this.three.exists) ||
        //         !(_this.two.exists || _this.four.exists)) {
        //         _this.enterX();
        //         _this.tick1.destroy();
        //     }
        // }
    },
    fourAngle: function () {
        console.log("fourAngle");
        _this.clickSound.play();
        _this.numberCircleFour.destroy();
        _this.four.destroy();
        _this.angleFour = _this.add.text(_this.numberFour_x[_this.map[_this.count1] - 1], _this.numberFour_y[_this.map[_this.count1] - 1], _this.enterTxt4_angle[_this.map[_this.count1] - 1] + "\u{00B0}");
        _this.applyingStyle(_this.angleFour);

        if (_this.tick1Flag == false) {
            _this.tick1 = _this.add.sprite(888, 440, 'TickBtn');
            _this.tick1.scale.setTo(0.9, 1.2);
            _this.tick1.frame = 1;
            _this.tick1.inputEnabled = true;
            _this.tick1.input.useHandCursor = true;
            _this.tick1.events.onInputDown.add(_this.enterX);
            _this.tick1Flag = true;
        }
        if (_this.numberpadFlag == false) {
            if (_this.map[_this.count1] == 1) {
                if (_this.order_1 == 2) {
                    if (!(_this.two.exists || _this.three.exists || _this.one.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.two.exists || _this.three.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
            }
            else if (_this.map[_this.count1] == 2 || _this.map[_this.count1] == 8 || _this.map[_this.count1] == 9) {
                if (_this.order_1 == 2) {
                    if (!(_this.one.exists || _this.four.exists || _this.two.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.one.exists || _this.four.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
            }
            else if (_this.map[_this.count1] == 3) {
                if (_this.order_1 == 2) {
                    if (!(_this.one.exists || _this.three.exists || _this.two.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.one.exists || _this.three.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
            }
            else if (_this.map[_this.count1] == 4 || _this.map[_this.count1] == 5 || _this.map[_this.count1] == 6 || _this.map[_this.count1] == 7 || _this.map[_this.count1] == 10) {
                if (_this.order_1 == 2) {
                    if (!(_this.one.exists || _this.two.exists || _this.three.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.one.exists || _this.two.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
            }

            else if (_this.map[_this.count1] == 11 || _this.map[_this.count1] == 12) {
                if (_this.order_1 == 2) {
                    if (!(_this.two.exists || _this.four.exists || _this.one.exists)) {
                        console.log("abc..")
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }
                else {
                    if (!(_this.two.exists || _this.four.exists)) {
                        _this.enterX();
                        _this.tick1.destroy();
                    }
                }

            }
            // _this.numberpadFlag = true;
        }
        // if (_this.order == 2) {
        //     if (!(_this.one.exists || _this.two.exists || _this.three.exists) || !(_this.two.exists || _this.three.exists || _this.one.exists) ||
        //         !(_this.one.exists || _this.four.exists || _this.two.exists) || !(_this.one.exists || _this.three.exists || _this.two.exists) ||
        //         !(_this.two.exists || _this.four.exists || _this.one.exists)) {
        //         console.log("abc..")
        //         _this.enterX();
        //         _this.tick1.destroy();
        //     }
        // }
        // else {
        //     if (!(_this.one.exists || _this.two.exists) || !(_this.two.exists || _this.three.exists) ||
        //         !(_this.one.exists || _this.four.exists) || !(_this.one.exists || _this.three.exists) ||
        //         !(_this.two.exists || _this.four.exists)) {
        //         _this.enterX();
        //         _this.tick1.destroy();
        //     }
        // }
    },

    enterX: function () {
        _this.tick1.destroy();
        if (_this.color_flag == 0) {
            if (_this.tick1) {
                _this.tick1.destroy();
            }
            _this.AnswerBox = _this.add.image(50, 85, 'AnswerBox');
            _this.AnswerBox.scale.setTo(0.9);
            _this.enterTxt6 = _this.add.text(75, 100, "x = ");
            _this.enterTxt6.fontSize = "30px";
            _this.enterTxt6.fill = '#E11584';
            //_this.color_flag = 1;
            _this.addNumberPad();

        }
    },

    enterY: function () {
        _this.tick1.destroy();
        //if (_this.color_flag == 0) {
        _this.AnswerBox = _this.add.image(50, 85, 'AnswerBox');
        _this.AnswerBox.scale.setTo(0.9);
        _this.enterTxt6 = _this.add.text(75, 100, "y = ");
        _this.enterTxt6.fontSize = "30px";
        _this.enterTxt6.fill = '#E11584';
        //_this.color_flag = 1;
        _this.Question_flag = 2;
        if (_this.count1 == 0) {
            _this.Ask_Question11.play();
        }
        _this.addNumberPad();

        //}
    },

    enterZ: function () {
        _this.tick1.destroy();
        //if (_this.color_flag == 0) {
        _this.AnswerBox = _this.add.image(50, 85, 'AnswerBox');
        _this.AnswerBox.scale.setTo(0.9);
        _this.enterTxt6 = _this.add.text(75, 100, "z = ");
        _this.enterTxt6.fontSize = "30px";
        _this.enterTxt6.fill = '#E11584';
        //_this.color_flag = 1;
        _this.Question_flag = 3;
        if (_this.count1 == 0) {
            _this.Ask_Question12.play();
        }
        _this.addNumberPad();

        //}
    },

    rightbtnClicked: function () {
        console.log("rightbtnClicked");
        _this.clickSound.play();
        if (_this.tick1) {
            _this.tick1.destroy();
        }

        //x validation
        if (_this.color_flag == 0) {
            if (_this.map[_this.count1] == 1 || _this.map[_this.count1] == 3 || _this.map[_this.count1] == 4 ||
                _this.map[_this.count1] == 5 || _this.map[_this.count1] == 6 || _this.map[_this.count1] == 7 ||
                _this.map[_this.count1] == 10) {
                if (_this.AnswerBox.name == _this.enterTxt4_angle[_this.map[_this.count1] - 1]) {
                    _this.noofAttempts++;
                    _this.counterCelebrationSound.play();
                    _this.numGroup.destroy();
                    _this.time.events.add(1500, function () {
                        _this.eraseScreen();
                        _this.AnswerBox.destroy();
                        _this.enterTxt6.destroy();
                        _this.numberCircleFour.destroy();
                        _this.valX.destroy();
                        _this.angleFour = _this.add.text(_this.numberFour_x[_this.map[_this.count1] - 1], _this.numberFour_y[_this.map[_this.count1] - 1], _this.enterTxt4_angle[_this.map[_this.count1] - 1] + "\u{00B0}");
                        _this.applyingStyle(_this.angleFour);

                        _this.time.events.add(2500, function () {
                            _this.color_flag = 1;
                            _this.enterY();
                        });
                    });
                }
                else {
                    _this.noofAttempts++;
                    _this.wrong++;
                    _this.wrongSound.play();
                    _this.eraseScreen();
                }
            }
            if (_this.map[_this.count1] == 2 || _this.map[_this.count1] == 8 || _this.map[_this.count1] == 9 || _this.map[_this.count1] == 11 || _this.map[_this.count1] == 12) {
                if (_this.AnswerBox.name == _this.enterTxt3_angle[_this.map[_this.count1] - 1]) {
                    _this.noofAttempts++;
                    _this.counterCelebrationSound.play();
                    _this.numGroup.destroy();
                    _this.time.events.add(1500, function () {
                        _this.eraseScreen();
                        _this.AnswerBox.destroy();
                        _this.enterTxt6.destroy();
                        _this.numberCircleThree.destroy();
                        _this.valX.destroy();
                        _this.angleThree = _this.add.text(_this.numberThree_x[_this.map[_this.count1] - 1] - 5, _this.numberThree_y[_this.map[_this.count1] - 1], _this.enterTxt3_angle[_this.map[_this.count1] - 1] + "\u{00B0}");
                        _this.applyingStyle(_this.angleThree);

                        _this.time.events.add(2500, function () {
                            _this.color_flag = 1;
                            _this.enterY();
                        });
                    });
                }
                else {
                    _this.noofAttempts++;
                    _this.wrong++;
                    _this.wrongSound.play();
                    _this.eraseScreen();
                }
            }
        }
        //y validation
        else if (_this.color_flag == 1) {
            // if (_this.map[_this.count1] == 1 || _this.map[_this.count1] == 2 || _this.map[_this.count1] == 8 || _this.map[_this.count1] == 9) {
            if (_this.AnswerBox.name == _this.enterTxt5_angle[_this.map[_this.count1] - 1]) {
                _this.noofAttempts++;
                _this.counterCelebrationSound.play();
                _this.numGroup.destroy();
                _this.time.events.add(1500, function () {
                    _this.eraseScreen();
                    _this.AnswerBox.destroy();
                    _this.enterTxt6.destroy();
                    _this.numberCircleFive.destroy();
                    _this.valY.destroy();
                    _this.angleFive = _this.add.text(_this.numberFive_x[_this.map[_this.count1] - 1], _this.numberFive_y[_this.map[_this.count1] - 1], _this.enterTxt5_angle[_this.map[_this.count1] - 1] + "\u{00B0}");
                    _this.applyingStyle(_this.angleFive);

                    if (_this.order_1 == 3) {
                        _this.time.events.add(2500, function () {
                            _this.color_flag = 2;
                            _this.enterZ();
                        });
                    }
                    else {
                        _this.color_flag = 0;
                        _this.lastScreenCelebration();
                    }
                });
            }
            else {
                _this.noofAttempts++;
                _this.wrong++;
                _this.wrongSound.play();
                _this.eraseScreen();
            }
            // }

        }
        //z validation
        else if (_this.order_1 == 3) {
            if (_this.color_flag == 2) {
                if (_this.map[_this.count1] == 1 || _this.map[_this.count1] == 11 || _this.map[_this.count1] == 12) {
                    if (_this.AnswerBox.name == _this.enterTxt1_angle[_this.map[_this.count1] - 1]) {
                        _this.noofAttempts++;
                        _this.counterCelebrationSound.play();
                        _this.numGroup.destroy();
                        _this.time.events.add(1500, function () {
                            _this.eraseScreen();
                            _this.AnswerBox.destroy();
                            _this.enterTxt6.destroy();
                            // _this.numberCircleThree.destroy();
                            _this.numberCircleOne.destroy();
                            _this.valZ.destroy();
                            _this.angleOne = _this.add.text(_this.numberOne_x[_this.map[_this.count1] - 1], _this.numberOne_y[_this.map[_this.count1] - 1], _this.enterTxt1_angle[_this.map[_this.count1] - 1] + "\u{00B0}");
                            _this.applyingStyle(_this.angleOne);

                            _this.time.events.add(2500, function () {
                                _this.color_flag = 0;
                                _this.lastScreenCelebration();
                            });
                        });
                    }
                    else {
                        _this.noofAttempts++;
                        _this.wrong++;
                        _this.wrongSound.play();
                        _this.eraseScreen();
                    }
                }
                if (_this.map[_this.count1] == 2 || _this.map[_this.count1] == 8 || _this.map[_this.count1] == 9 || _this.map[_this.count1] == 3) {
                    if (_this.AnswerBox.name == _this.enterTxt2_angle[_this.map[_this.count1] - 1]) {
                        _this.noofAttempts++;
                        _this.counterCelebrationSound.play();
                        _this.numGroup.destroy();
                        _this.time.events.add(1500, function () {
                            _this.eraseScreen();
                            _this.AnswerBox.destroy();
                            _this.enterTxt6.destroy();
                            _this.numberCircleTwo.destroy();
                            _this.valZ.destroy();
                            _this.angleTwo = _this.add.text(_this.numberTwo_x[_this.map[_this.count1] - 1], _this.numberTwo_y[_this.map[_this.count1] - 1], _this.enterTxt2_angle[_this.map[_this.count1] - 1] + "\u{00B0}");
                            _this.applyingStyle(_this.angleTwo);

                            _this.time.events.add(2500, function () {
                                _this.color_flag = 0;
                                _this.lastScreenCelebration();
                            });
                        });
                    }
                    else {
                        _this.noofAttempts++;
                        _this.wrong++;
                        _this.wrongSound.play();
                        _this.eraseScreen();
                    }
                }
                if (_this.map[_this.count1] == 4 || _this.map[_this.count1] == 5 || _this.map[_this.count1] == 6 || _this.map[_this.count1] == 7 || _this.map[_this.count1] == 10) {
                    if (_this.AnswerBox.name == _this.enterTxt3_angle[_this.map[_this.count1] - 1]) {
                        _this.noofAttempts++;
                        _this.counterCelebrationSound.play();
                        _this.numGroup.destroy();
                        _this.time.events.add(1500, function () {
                            _this.eraseScreen();
                            _this.AnswerBox.destroy();
                            _this.enterTxt6.destroy();
                            _this.numberCircleThree.destroy();
                            _this.valZ.destroy();
                            _this.angleThree = _this.add.text(_this.numberThree_x[_this.map[_this.count1] - 1], _this.numberThree_y[_this.map[_this.count1] - 1], _this.enterTxt3_angle[_this.map[_this.count1] - 1] + "\u{00B0}");
                            _this.applyingStyle(_this.angleThree);

                            _this.time.events.add(2500, function () {
                                _this.color_flag = 0;
                                _this.lastScreenCelebration();
                            });
                        });
                    }
                    else {
                        _this.noofAttempts++;
                        _this.wrong++;
                        _this.wrongSound.play();
                        _this.eraseScreen();
                    }
                }
            }
        }

    },


    //* Change this function to show small number pad as given in GDD. (no signs)
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
        _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked, _this);

        _this.enterTxt = _this.add.text(120, 20, "");//75, 100
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

        //if(_this.flag==0)
        //{
        //_this.enterTxt.destroy();
        //_this.enterTxt;
        //_this.enterTxt.text = "";
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
            _this.enterTxt = _this.add.text(120, 20, "" + var_selectedAns1 + var_selectedAns2 + var_selectedAns3, { fontSize: '25px' });//47, 8
        }
        else if (_this.selectedAns3 === "") {
            console.log("12");
            _this.enterTxt = _this.add.text(115, 20, "" + var_selectedAns1 + var_selectedAns2 + var_selectedAns3, { fontSize: '25px' });//42, 8
        }
        else {
            console.log("13");
            _this.enterTxt = _this.add.text(108, 20, "" + var_selectedAns1 + var_selectedAns2 + var_selectedAns3, { fontSize: '25px' });//38, 8
        }

        _this.enterTxt.align = 'right';
        // _this.enterTxt.font = "Akzidenz-Grotesk BQ";
        _this.enterTxt.fill = '#E11584';
        // _this.enterTxt.fontWeight = 'normal';
        _this.AnswerBox.addChild(_this.enterTxt);
        _this.enterTxt.visible = true;
        console.log(_this.selectedAns1, _this.selectedAns2, _this.selectedAns3);
        _this.AnswerBox.name = Number('' + var_selectedAns1 + var_selectedAns2 + var_selectedAns3);
        //_this.AnswerBox.name = Number('' + _this.selectedAns1 + _this.selectedAns2 + _this.selectedAns3);
        console.log(_this.AnswerBox.name);
    },


    clearAll: function () {
        console.log("ClearAll");

        _this.allMapsGroupThrid.destroy();
        _this.mapShowThird.destroy();
        _this.circle1.destroy();
        _this.mask1.destroy();
        _this.circle2.destroy();
        _this.mask2.destroy();
        _this.circle3.destroy();
        _this.mask3.destroy();
        _this.circle4.destroy();
        _this.mask4.destroy();
        _this.circle5.destroy();
        _this.mask5.destroy();

        if (_this.numberCircleOne) _this.numberCircleOne.destroy();
        if (_this.numberCircleTwo) _this.numberCircleTwo.destroy();
        if (_this.numberCircleThree) _this.numberCircleThree.destroy();
        if (_this.numberCircleFour) _this.numberCircleFour.destroy();
        if (_this.numberCircleFive) _this.numberCircleFive.destroy();

        if (_this.angleOne) _this.angleOne.destroy();
        if (_this.angleTwo) _this.angleTwo.destroy();
        if (_this.angleThree) _this.angleThree.destroy();
        if (_this.angleFour) _this.angleFour.destroy();
        if (_this.angleFive) _this.angleFive.destroy();

        if (_this.four) _this.four.destroy();
        if (_this.three) _this.three.destroy();
        if (_this.two) _this.two.destroy();
        if (_this.one) _this.one.destroy();

        _this.Question_flag = 0;
        _this.map.shift();//removing first element from the array
    },


    applyingStyle: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#E11584';
        target.fontWeight = 'normal';
        target.visible = true;
    },
    applyingStyle2: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.visible = true;
    },
    applyingStyle1: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '20px';
    },
    checkOverlap: function (spriteA, spriteB) {
        _this.boundsA = spriteA.getBounds();
        _this.boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(_this.boundsA, _this.boundsB);
    },


    starActions: function (target) {
        console.log("starActions")
        starAnim = _this.starsGroup.getChildAt(_this.count1);
        starAnim.smoothed = false;
        anim = starAnim.animations.add('star');
        _this.microConcepts = "GeometryG7";
        _this.count1++;
        anim.play();

        if (_this.numberCircleOne.exists) _this.numberCircleOne.inputEnabled = false;
        if (_this.numberCircleTwo.exists) _this.numberCircleTwo.inputEnabled = false;
        if (_this.numberCircleThree.exists) _this.numberCircleThree.inputEnabled = false;
        if (_this.numberCircleFour.exists) _this.numberCircleFour.inputEnabled = false;
        if (_this.numberCircleFive.exists) _this.numberCircleFive.inputEnabled = false;
    },


    shutdown: function () {
        _this.stopVoice();
        //RI.gotoEndPage();
        //telInitializer.tele_end();
    },

    DemoVideo: function () {
        _this.pauseVoice();
        //* Drag the strips and square pieces onto the grid to represent the given decimal number.
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-03-G7/" +
            _this.languageSelected + "/GMLA_03_G7_h1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        _this.q2Sound = document.createElement('audio');
        _this.q2Soundsrc = document.createElement('source');
        _this.q2Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-03-G7/" +
            _this.languageSelected + "/GMLA_03_G7_h2.mp3");
        _this.q2Sound.appendChild(_this.q2Soundsrc);

        _this.video_playing = 0;
        _this.showDemoVideo();  //* call the function to show the video

        _this.skip = _this.add.image(820, 110, 'close');  //700, 70     //* skip button shown at the bottom
        _this.skip.inputEnabled = true;
        _this.skip.input.useHandCursor = true;
        _this.skip.events.onInputDown.add(function () {
            _this.stopAudio();

            if (_this.hintBtn) {
                _this.hintBtn.inputEnabled = true;
                _this.hintBtn.input.useHandCursor = true;
            }
            // console.log(_this.game.paused, '_this.game.paused')
            _this.game.paused = false;  //* restart the game
            console.log(_this.game.paused, '_this.game.paused')
        });
    },
    stopAudio: function () {

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

    showDemoVideo: function () {

        _this.background_demo = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'BG1');

        _this.bgBox = _this.add.image(70, 80, 'bgbox2');

        _this.background_demo.addChild(_this.bgBox);

        _this.drawLinearAngle();

    },
    drawLinearAngle: function () {
        if (_this.verticalGroup)
            _this.verticalGroup.destroy();

        _this.linearGroup = _this.add.group();
        console.log('draw angles');
        _this.q1Sound.play();

        //straight line
        // Create a Graphics object
        var graphics = _this.add.graphics(0, 0);

        // Set the line style (color, thickness)
        graphics.lineStyle(2, 0x4472c4); // 2 pixels thick, color//0xffffff white

        // Draw a line
        graphics.moveTo(255, 350); // Starting point
        graphics.lineTo(705, 350); // Ending point

        // Draw a line for arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(695, 345); // Starting point 590, 182
        graphics.lineTo(705, 350); // Ending point 600, 180
        graphics.lineTo(695, 355); // Ending point 596, 192

        //for left triangle
        // Draw a line for arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(265, 345); // Starting point 590, 182
        graphics.lineTo(255, 350); // Ending point 600, 180
        graphics.lineTo(265, 355); // Ending point 596, 192

        //slop line
        // Set the line style (color, thickness)
        graphics.lineStyle(2, 0x4472c4); // 2 pixels thick, color//0xffffff white

        // Draw a line
        graphics.moveTo(470, 350); // Starting point
        graphics.lineTo(655, 180); // Ending point

        // Draw a line for arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(644, 182); // Starting point 590, 180
        graphics.lineTo(655, 180); // Ending point 600, 180
        graphics.lineTo(651, 192); // Ending point 600, 190

        graphics.lineStyle(2, 0x4472c4);
        // Draw the arc representing a 40-degree angle
        var angle = Phaser.Math.degToRad(180); // Convert angle to radians
        graphics.arc(475, 350, 40, Phaser.Math.PI2, Phaser.Math.PI2 - angle, true);



        var text = _this.add.text(545, 305, "1", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#FF0000", // Red color "#FF0000"

        });
        var text_2 = _this.add.text(435, 265, "2", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#FF0000"  // Red color "#FF0000"
        });

        _this.nextScreen = _this.add.image(780, 390, 'skipArrow');       //* skip button shown at the bottom
        _this.nextScreen.inputEnabled = true;
        _this.nextScreen.input.useHandCursor = true;
        _this.linearGroup.addChild(_this.nextScreen);
        _this.nextScreen.events.onInputDown.add(function () {
            _this.pauseVoice();
            _this.drawOppositAngle();
        });

        _this.linearGroup.addChild(graphics);
        _this.linearGroup.addChild(text);
        _this.linearGroup.addChild(text_2);
        _this.background_demo.addChild(_this.linearGroup);

    },
    drawOppositAngle: function () {
        if (_this.linearGroup)
            _this.linearGroup.destroy();

        _this.verticalGroup = _this.add.group();
        _this.q2Sound.play();
        //cross line
        // Create a Graphics object
        var graphics = _this.add.graphics(0, 0);

        // Set the line style (color, thickness)
        graphics.lineStyle(2, 0x4472c4); // 2 pixels thick, color//0xffffff white

        // Draw a line
        graphics.moveTo(255, 150); // Starting point
        graphics.lineTo(705, 350); // Ending point

        // Set the line style (color, thickness)
        graphics.lineStyle(2, 0x4472c4); // 2 pixels thick, color//0xffffff white

        // Draw a line
        graphics.moveTo(255, 350); // Starting point
        graphics.lineTo(705, 150); // Ending point

        //for right down arrow
        // Draw a line for arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(697, 341); // Starting point +10,-5
        graphics.lineTo(705, 350); // Ending point 
        graphics.lineTo(694, 352); // Ending point +10,+5

        //for right up arrow
        // Draw a line for arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(692, 149); // Starting point +10,-5
        graphics.lineTo(705, 150); // Ending point 
        graphics.lineTo(696, 161); // Ending point +10,+5

        //for left up arrow
        // Draw a line for arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(267, 149); // Starting point +10,-5
        graphics.lineTo(255, 150); // Ending point 650
        graphics.lineTo(263, 160); // Ending point +10,+5

        //for left down arrow
        // Draw a line for arrow
        graphics.lineStyle(3, 0x4472c4);
        graphics.moveTo(266, 339); // Starting point +10,-5
        graphics.lineTo(255, 350); // Ending point 
        graphics.lineTo(269, 350); // Ending point +10,+5


        // Draw the arc representing a 40-degree angle
        // Create a Graphics object
        var arc_line = _this.add.graphics(0, 0);

        // Set the line style (color, thickness)
        arc_line.lineStyle(2, 0xFFA500); // 2 pixels thick, color//0xffffff white//#FFA500 orenge
        arc_line.arc(480, 250, 40, _this.math.degToRad(155), _this.math.degToRad(25), true);

        arc_line.arc(480, 250, 40, _this.math.degToRad(335), _this.math.degToRad(205), true);

        //#7F00FF violet
        // Set the line style (color, thickness)
        arc_line.lineStyle(2, 0x7F00FF); // 2 pixels thick, color//0xffffff white//#FFA500 orenge
        arc_line.arc(480, 250, 40, _this.math.degToRad(205), _this.math.degToRad(155), true);

        arc_line.arc(480, 250, 40, _this.math.degToRad(25), _this.math.degToRad(335), true);

        var text = _this.add.text(470, 170, "1", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#FFA500"  // Red color "#FF0000"
        });
        var text_2 = _this.add.text(545, 235, "2", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#7F00FF"  // Red color "#FF0000"
        });
        var text_3 = _this.add.text(470, 310, "3", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#FFA500"  // Red color "#FF0000"
        });
        var text_4 = _this.add.text(405, 235, "4", {
            font: "24px Akzidenz-Grotesk BQ",
            fill: "#7F00FF"  // Red color "#FF0000"
        });

        _this.verticalGroup.addChild(graphics);
        _this.verticalGroup.addChild(arc_line);
        _this.verticalGroup.addChild(text);
        _this.verticalGroup.addChild(text_2);
        _this.verticalGroup.addChild(text_3);
        _this.verticalGroup.addChild(text_4);

        _this.previousScreen = _this.add.image(180, 440, 'skipArrow');       //* back to first screen
        _this.previousScreen.angle = 180;
        _this.previousScreen.inputEnabled = true;
        _this.previousScreen.input.useHandCursor = true;

        _this.previousScreen.events.onInputDown.add(function () {
            _this.pauseVoice();
            _this.drawLinearAngle();
        });

        _this.verticalGroup.addChild(_this.previousScreen);


        _this.background_demo.addChild(_this.verticalGroup);
    },
}