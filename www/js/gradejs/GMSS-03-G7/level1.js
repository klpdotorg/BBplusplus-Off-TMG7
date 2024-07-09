Game.GMSS_03_G7level1 = function () { };


Game.GMSS_03_G7level1.prototype =
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
        _this.wronganssrc.setAttribute("src", window.baseUrl + "sounds/WrongCelebrationSound.mp3");
        _this.wrongans.appendChild(_this.wronganssrc);

        _this.wrongSound = document.createElement('audio');
        _this.wrongSoundsrc = document.createElement('source');
        _this.wrongSoundsrc.setAttribute("src", window.baseUrl + "sounds/WrongCelebrationSound.mp3");
        _this.wrongSound.appendChild(_this.wrongSoundsrc);

        // _this.snapSound = document.createElement('audio');
        // _this.snapSoundsrc = document.createElement('source');
        // _this.snapSoundsrc.setAttribute("src",  window.baseUrl + "sounds/snapSound.mp3");
        // _this.snapSound.appendChild(_this.snapSoundsrc);

        _this.framechange = document.createElement('audio');
        _this.framechangesrc = document.createElement('source');
        _this.framechangesrc.setAttribute("src", window.baseUrl + "sounds/Frame_change_sound.mp3");
        _this.framechange.appendChild(_this.framechangesrc);


        _this.Ask_Question1 = _this.createAudio("GMSS_03_G7_a1");
        _this.Ask_Question2 = _this.createAudio("GMSS_03_G7_a2");

        telInitializer.gameIdInit("GMSS_03_G7", gradeSelected);// first Tele call
        console.log(gameID, "gameID...");
    },
    create: function (game) {
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

        _this.AnsTimerCount = 0;
        _this.numberOfQuestions = 0;
        _this.speakerbtn;
        _this.background;
        _this.count = 0;
        _this.starsGroup;
        _this.AnswerBox;
        _this.seconds = 0;
        _this.minutes = 0;
        _this.Question_flag = 0;

        _this.count1 = 0;

        _this.counterForTimer = 0;

        _this.namesArray = [];

        _this.partACount = 0;

        _this.shapesArray = [];
        _this.shapeCount = 0;
        _this.Shape1_Flag = 0;
        _this.Shape2_Flag = 0;
        _this.Shape3_Flag = 0;
        _this.Shape4_Flag = 0;
        _this.Shape5_Flag = 0;
        _this.Shape6_Flag = 0;
        _this.Shape7_Flag = 0;

        _this.selectedBox1 = false;
        _this.selectedBox2 = false;
        _this.selectedBox3 = false;
        _this.selectedBox4 = false;

        _this.right = false;
        _this.wrong = false;

        _this.speakerbtnClicked = false;
        _this.rightbtn_Clicked = false;

        _this.shake = new Phaser.Plugin.Shake(game);
        game.plugins.add(_this.shake);

        _this.boxPosition_x = [440, 660, 440, 660];
        _this.boxPosition_y = [70, 70, 295, 295];

        _this.objectArray = ['beetroot', 'bread', 'star_fruit', 'bringle', 'butter_fruit', 'cucumber', 'Kiwi_fruit', 'onion', 'Orange', 'potato', 'Quins_fruit', 'tomato'];
        //'beetroot', 'bread', 'star_fruit', 'bringle', 'butter_fruit', 'cucumber', 'Kiwi_fruit', 'onion', 'Orange', 'potato', 'Quins_fruit', 'tomato'
        _this.shuffleArray(_this.objectArray);
        console.log(_this.objectArray, "_this.objectArray");

        _this.optionObjectOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        _this.optionObjectOrder_x = [70, 50, 60, 60, 70, 55, 70, 60, 70, 55, 60, 60, 55, 75, 50, 70];
        _this.optionObjectOrderr_y = [50, 70, 65, 60, 50, 55, 60, 65, 50, 60, 60, 70, 70, 50, 80, 60];
        _this.optionObjectOrder_name = ['cylinder_green', 'rectangle_shape', 'square_shape_green', 'circle_shape', 'drop_shape_blue', 'star_shape_green',
            'heart_shape', 'hexagon_shape', 'ovel_shape_vertical', 'triangle_shape_pink', 'flower_shape', 'square_shape_orange', 'ovel_shape_horizontal',
            'parallel_shape_vertical', 'parallel_shape_horizontal', 'waterdrop_shape'];


        _this.background = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'BG1');
        //** include the background file, navigation bar, stars, timer objects.
        _this.navBar = _this.add.sprite(0, 0, 'navBar');

        _this.backbtn = _this.add.sprite(5, 6, 'backbtn');
        _this.backbtn.inputEnabled = true;
        _this.backbtn.input.useHandCursor = true;
        _this.backbtn.events.onInputDown.add(function () {
            _this.state.start('grade7Geometry', true, false);
        });

        _this.speakerbtn = _this.add.sprite(600, 6, 'CommonSpeakerBtn');

        _this.speakerbtn.events.onInputDown.add(function () {
            telInitializer.tele_interactEvent("TOUCH", "speaker");
            if (_this.speakerbtnClicked == false && _this.rightbtn_Clicked == false) {
                _this.speakerbtn.inputEnabled = false;
                _this.speakerbtn.input.useHandCursor = false;
                _this.clickSound.play();

                if (_this.Question_flag == 0) {
                    if (_this.objectCutting[0] == 1 && _this.objectArray[_this.count1] == 'star_fruit') {
                        _this.pauseVoice();
                        _this.Ask_Question1.play();
                    }
                    if (_this.objectCutting[0] == 1) {
                        _this.pauseVoice();
                        _this.Ask_Question1.play();
                    }
                    if (_this.objectCutting[0] == 2) {
                        _this.pauseVoice();
                        _this.Ask_Question2.play();
                    }
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
        // // _this.hintBtn.inputEnabled = true;
        // // _this.hintBtn.input.useHandCursor = true;
        // _this.hintBtn.inputEnabled = false
        // _this.hintBtn.events.onInputDown.add(function () {
        //     console.log("inside hintbutton function");
        //     //* show the demo video
        //     _this.hintBtn.inputEnabled = false;
        //     _this.hintBtn.input.useHandCursor = false;
        //     _this.time.events.add(1, function () {
        //        // console.log(_this.hintBtn.inputEnabled, "status of hintBtn");
        //         _this.ViewDemoVideo();
        //     });

        // });

        _this.generateStarsForTheScene(6);

        //* include variables for use - objGroup (where egg objects can be added)
        _this.objGroup;
        _this.numGroup;

        //* start the game with first question
        _this.time.events.add(1000, _this.getQuestion);

    },
    createAudio: function (src) {
        audio = document.createElement('audio');
        audiosrc = document.createElement('source');
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/GMSS-03-G7/" + _this.languageSelected + "/" + src + ".mp3");
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

        _this.InitialScreen();

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

    //this function is used for showing the question.
    InitialScreen: function () {
        _this.sceneCount++;
        _this.noofAttempts=0;
        _this.AnsTimerCount=0;
        _this.tick = _this.add.sprite(880, 440, 'TickBtn');

        _this.Box1 = _this.add.sprite(30, 70, 'Box1');

        _this.tick.inputEnabled = true;
        _this.tick.input.useHandCursor = true;
        _this.tick.events.onInputDown.add(_this.tickValidation, _this);

        _this.boxGroup = _this.add.group();

        _this.QuestionGroup = _this.add.group();

        _this.objectCutting = [1, 2];//1, 2//horizontal,vertically
        _this.shuffleArray(_this.objectCutting);
        console.log(_this.objectCutting, "_this.objectCutting ");

        _this.optionOrder = [1, 2, 3, 4];//1,2,3,4//box option randomizing
        _this.shuffleArray(_this.optionOrder);
        console.log(_this.optionOrder, "option order..");

        switch (_this.objectArray[_this.count1]) {
            case 'beetroot': _this.beetrootShow();
                break;
            case 'bread': _this.breadShow();
                break;
            case 'star_fruit': _this.star_fruitShow();
                break;
            case 'bringle': _this.bringleShow();
                break;
            case 'butter_fruit': _this.butter_fruitShow();
                break;
            case 'cucumber': _this.cucumberShow();
                break;
            case 'Kiwi_fruit': _this.Kiwi_fruitShow();
                break;
            case 'onion': _this.onionShow();
                break;
            case 'Orange': _this.OrangeShow();
                break;
            case 'potato': _this.potatoShow();
                break;
            case 'Quins_fruit': _this.Quins_fruitShow();
                break;
            case 'tomato': _this.tomatoShow();
                break;
        }

        _this.firstOption();
        _this.secondOptiont();
        _this.thirdOption();
        _this.forthOption();

    },
    referenceFunction: function () {
        _this.add.image(70, 50, 'cylinder_green');//0
        _this.add.image(50, 70, 'rectangle_shape');//1
        _this.add.image(60, 65, 'square_shape_green');//2
        _this.add.image(60, 60, 'circle_shape');//3
        _this.add.image(70, 50, 'drop_shape_blue');//4
        _this.add.image(55, 55, 'star_shape_green');//5
        _this.add.image(70, 60, 'heart_shape');//6
        _this.add.image(60, 65, 'hexagon_shape');//7
        _this.add.image(70, 50, 'ovel_shape_vertical');//8
        _this.add.image(55, 60, 'triangle_shape_pink');//9
        _this.add.image(60, 60, 'flower_shape');//10
        _this.add.image(60, 70, 'square_shape_orange');//11
        _this.add.image(55, 70, 'ovel_shape_horizontal');//12
        _this.add.image(75, 50, 'parallel_shape_vertical');//13
        _this.add.image(50, 80, 'parallel_shape_horizontal');//14
        _this.add.image(70, 60, 'waterdrop_shape');//15



        _this.optionObjectOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        _this.optionObjectOrder_x = [70, 50, 60, 60, 70, 55, 70, 60, 70, 55, 60, 60, 55, 75, 50, 70];
        _this.optionObjectOrderr_y = [50, 70, 65, 60, 50, 55, 60, 65, 50, 60, 60, 70, 70, 50, 80, 60];
        _this.optionObjectOrder_name = ['cylinder_green', 'rectangle_shape', 'square_shape_green', 'circle_shape', 'drop_shape_blue', 'star_shape_green',
            'heart_shape', 'hexagon_shape', 'ovel_shape_vertical', 'triangle_shape_pink', 'flower_shape', 'square_shape_orange', 'ovel_shape_horizontal',
            'parallel_shape_vertical', 'parallel_shape_horizontal', 'waterdrop_shape'];

    },

    beetrootShow: function () {
        _this.beetroot_1 = _this.add.image(140, 190, 'beetroot_1');

        if (_this.objectCutting[0] == 1 || 2) {
            //horizontal cutting line
            _this.horizontal_arrow = _this.add.image(70, 270, 'horizontal_arrow');
            _this.horizontal_arrow.scale.setTo(0.8, 0.8);

            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question1.play();
                //// _this.Question_flag = 1;
            }
        }

        _this.correctShape = ['circle_shape'];

        // _this.wrongShapes = ['rectangle_shape', 'square_shape_green', 'star_shape_pink'];
        _this.wrongShapes = [0, 1, 2, 5, 6, 7, 9, 10, 11, 13, 14, 15];
        _this.shuffleArray(_this.wrongShapes);
    },
    breadShow: function () {
        _this.bread_1 = _this.add.image(130, 190, 'bread_1');

        if (_this.objectCutting[0] == 1 || 2) {
            //vertical cutting line
            _this.vertical_arrow = _this.add.image(250, 90, 'vertical_arrow');

            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question2.play();
                // _this.Question_flag = 1;
            }
        }

        _this.correctShape = ['square_shape_orange'];

        // _this.wrongShapes = ['triangle_shape_pink', 'drop_shape_blue', 'flower_shape'];//'triangle_shape_green','drop_shape_pink'
        _this.wrongShapes = [0, 1, 3, 4, 5, 6, 7, 9, 10, 12, 13, 14, 15];
        _this.shuffleArray(_this.wrongShapes);

    },
    star_fruitShow: function () {
        _this.star_fruit_1 = _this.add.image(130, 190, 'star_fruit_1');


        if (_this.objectCutting[0] == 1 || 2) {
            //horizontal cutting line
            _this.horizontal_arrow = _this.add.image(70, 260, 'horizontal_arrow');
            _this.horizontal_arrow.scale.setTo(0.8, 0.8);

            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question1.play();
                // _this.Question_flag = 1;
            }
        }

        _this.correctShape = ['star_shape_green'];//'star_shape_pink'

        // _this.wrongShapes = ['ovel_shape_horizontal', 'circle_shape', 'square_shape_green'];//'square_shape_pink','square_shape_orange'
        _this.wrongShapes = [0, 1, 2, 3, 4, 6, 7, 9, 11, 12, 13, 14, 15];
        _this.shuffleArray(_this.wrongShapes);

    },
    bringleShow: function () {
        _this.bringle_1 = _this.add.image(120, 250, 'bringle_1');
        if (_this.objectCutting[0] == 1) {
            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question1.play();
                // _this.Question_flag = 1;
            }
        }
        if (_this.objectCutting[0] == 2) {
            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question2.play();
                // _this.Question_flag = 1;
            }
        }

        if (_this.objectCutting[0] == 1) {
            //horizontal cutting line
            _this.horizontal_arrow = _this.add.image(50, 270, 'horizontal_arrow');
            _this.horizontal_arrow.scale.setTo(0.9, 0.9);
            _this.wrongShapes = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 13, 14, 15];
        }
        if (_this.objectCutting[0] == 2) {
            //vertical cutting line
            _this.vertical_arrow = _this.add.image(200, 90, 'vertical_arrow');
            _this.wrongShapes = [1, 2, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15];
        }

        _this.correctShape = ['cylinder_green', 'circle_shape'];//'cylinder_pink' horizontal  'circle_shape' vertical

        // _this.wrongShapes = ['rectangle_shape', 'cylinder_pink', 'square_shape_green', 'circle_shape'];//'cylinder_green','square_shape_orange','square_shape_pink'
        _this.shuffleArray(_this.wrongShapes);

    },
    butter_fruitShow: function () {
        _this.butter_fruit_1 = _this.add.image(150, 170, 'butter_fruit_1');
        if (_this.objectCutting[0] == 1) {
            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question1.play();
                // _this.Question_flag = 1;
            }
        }
        if (_this.objectCutting[0] == 2) {
            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question2.play();
                // _this.Question_flag = 1;
            }
        }

        if (_this.objectCutting[0] == 1) {
            //horizontal cutting line
            _this.horizontal_arrow = _this.add.image(70, 270, 'horizontal_arrow');
            _this.horizontal_arrow.scale.setTo(0.8, 0.8);

            _this.correctShape = ['circle_shape'];

            //_this.wrongShapes = ['drop_shape_blue', 'hexagon_shape', 'triangle_shape_pink'];//'drop_shape_pink','triangle_shape_green'
            _this.wrongShapes = [0, 1, 2, 5, 6, 7, 9, 10, 11, 13, 14, 15];
        }
        if (_this.objectCutting[0] == 2) {
            //vertical cutting line
            _this.vertical_arrow = _this.add.image(200, 90, 'vertical_arrow');

            _this.correctShape = ['drop_shape_pink'];//'drop_shape_blue'

            // _this.wrongShapes = ['circle_shape', 'parallel_shape_horizontal', 'triangle_shape_pink'];//'drop_shape_pink','triangle_shape_green'
            _this.wrongShapes = [0, 1, 2, 5, 6, 7, 9, 10, 11, 12, 13, 14];
        }
        _this.shuffleArray(_this.wrongShapes);
    },
    cucumberShow: function () {
        _this.cucumber_1 = _this.add.image(100, 240, 'cucumber_1');
        _this.cucumber_1.scale.setTo(0.8, 0.8);
        if (_this.objectCutting[0] == 1) {
            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question1.play();
                // _this.Question_flag = 1;
            }
        }
        if (_this.objectCutting[0] == 2) {
            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question2.play();
                // _this.Question_flag = 1;
            }
        }

        if (_this.objectCutting[0] == 1) {
            //horizontal cutting line
            _this.horizontal_arrow = _this.add.image(50, 250, 'horizontal_arrow');
            _this.horizontal_arrow.scale.setTo(0.9, 0.9);

            _this.correctShape = ['cylinder_green'];//cylinder_pink

            //_this.wrongShapes = ['rectangle_shape', 'circle_shape', 'square_shape_green'];//'square_shape_pink','square_shape_orange'
            _this.wrongShapes = [1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14];
        }
        if (_this.objectCutting[0] == 2) {
            //vertical cutting line
            _this.vertical_arrow = _this.add.image(200, 90, 'vertical_arrow');

            _this.correctShape = ['circle_shape'];

            // _this.wrongShapes = ['rectangle_shape', 'cylinder_green', 'square_shape_green'];//'cylinder_pink','square_shape_pink','square_shape_orange'
            _this.wrongShapes = [0, 1, 2, 5, 6, 7, 9, 10, 11, 13, 14, 15];
        }
        _this.shuffleArray(_this.wrongShapes);
    },
    Kiwi_fruitShow: function () {
        _this.Kiwi_fruit_1 = _this.add.image(140, 200, 'Kiwi_fruit_1');
        if (_this.objectCutting[0] == 1) {
            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question1.play();
                // _this.Question_flag = 1;
            }
        }
        if (_this.objectCutting[0] == 2) {
            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question2.play();
                // _this.Question_flag = 1;
            }
        }

        if (_this.objectCutting[0] == 1) {
            //horizontal cutting line
            _this.horizontal_arrow = _this.add.image(70, 280, 'horizontal_arrow');
            _this.horizontal_arrow.scale.setTo(0.8, 0.8);

            _this.correctShape = ['circle_shape'];

            // _this.wrongShapes = ['ovel_shape_horizontal', 'star_shape_pink', 'square_shape_green'];//'star_shape_green','square_shape_pink','square_shape_orange'
            _this.wrongShapes = [0, 1, 2, 5, 6, 7, 9, 10, 11, 13, 14, 15];
        }
        if (_this.objectCutting[0] == 2) {
            //vertical cutting line
            _this.vertical_arrow = _this.add.image(190, 90, 'vertical_arrow');

            _this.correctShape = ['ovel_shape_vertical'];

            // _this.wrongShapes = ['triangle_shape_pink', 'drop_shape_blue', 'square_shape_green'];//'triangle_shape_green','drop_shape_pink','cylinder_pink','square_shape_pink','square_shape_orange'
            _this.wrongShapes = [1, 2, 3, 5, 6, 7, 9, 11, 13, 14];
        }
        _this.shuffleArray(_this.wrongShapes);
    },
    onionShow: function () {
        _this.onion_1 = _this.add.image(140, 180, 'onion_1');
        if (_this.objectCutting[0] == 1) {
            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question1.play();
                // _this.Question_flag = 1;
            }
        }
        if (_this.objectCutting[0] == 2) {
            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question2.play();
                // _this.Question_flag = 1;
            }
        }


        if (_this.objectCutting[0] == 1) {
            //horizontal cutting line
            _this.horizontal_arrow = _this.add.image(70, 280, 'horizontal_arrow');
            _this.horizontal_arrow.scale.setTo(0.8, 0.8);

            _this.correctShape = ['circle_shape'];
            _this.wrongShapes = [0, 1, 2, 5, 6, 7, 9, 10, 11, 13, 14, 15];

            // _this.wrongShapes = ['ovel_shape_horizontal', 'star_shape_pink', 'square_shape_green'];//'star_shape_green','square_shape_pink','square_shape_orange'
        }
        if (_this.objectCutting[0] == 2) {
            //vertical cutting line
            _this.vertical_arrow = _this.add.image(200, 90, 'vertical_arrow');

            _this.correctShape = ['waterdrop_shape'];
            _this.wrongShapes = [0, 1, 2, 5, 6, 7, 9, 10, 11, 13, 14];

            //  _this.wrongShapes = ['ovel_shape_horizontal', 'star_shape_pink', 'square_shape_green'];//'star_shape_green','square_shape_pink','square_shape_orange'

        }
        _this.shuffleArray(_this.wrongShapes);
    },
    OrangeShow: function () {
        _this.Orange_1 = _this.add.image(140, 200, 'Orange_1');
        if (_this.objectCutting[0] == 1) {
            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question1.play();
                // _this.Question_flag = 1;
            }
        }
        if (_this.objectCutting[0] == 2) {
            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question2.play();
                // _this.Question_flag = 1;
            }
        }


        if (_this.objectCutting[0] == 1) {
            //horizontal cutting line
            _this.horizontal_arrow = _this.add.image(70, 280, 'horizontal_arrow');
            _this.horizontal_arrow.scale.setTo(0.8, 0.8);

            _this.correctShape = ['circle_shape'];
            _this.wrongShapes = [0, 1, 2, 5, 6, 7, 9, 10, 11, 13, 14, 15];
            // _this.wrongShapes = ['drop_shape_blue', 'star_shape_pink', 'cylinder_green'];//'drop_shape_pink','star_shape_green','cylinder_pink'
        }
        if (_this.objectCutting[0] == 2) {
            //vertical cutting line
            _this.vertical_arrow = _this.add.image(200, 90, 'vertical_arrow');

            _this.correctShape = ['circle_shape'];
            _this.wrongShapes = [0, 1, 2, 5, 6, 7, 9, 10, 11, 13, 14, 15];
            // _this.wrongShapes = ['drop_shape_blue', 'star_shape_pink', 'cylinder_green'];//'drop_shape_pink','star_shape_green','cylinder_pink'
        }
        _this.shuffleArray(_this.wrongShapes);
    },
    potatoShow: function () {
        _this.potato_1 = _this.add.image(110, 210, 'potato_1');
        if (_this.objectCutting[0] == 1) {
            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question1.play();
                // _this.Question_flag = 1;
            }
        }
        if (_this.objectCutting[0] == 2) {
            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question2.play();
                // _this.Question_flag = 1;
            }
        }


        if (_this.objectCutting[0] == 1) {
            //horizontal cutting line
            _this.horizontal_arrow = _this.add.image(60, 270, 'horizontal_arrow');
            _this.horizontal_arrow.scale.setTo(0.8, 0.8);

            _this.correctShape = ['ovel_shape_horizontal'];//ovel_shape_vertical
            _this.wrongShapes = [1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15];
            // _this.wrongShapes = ['circle_shape', 'heart_shape', 'hexagon_shape'];//'drop_shape_pink','star_shape_green','cylinder_pink'
        }
        if (_this.objectCutting[0] == 2) {
            //vertical cutting line
            _this.vertical_arrow = _this.add.image(200, 90, 'vertical_arrow');

            _this.correctShape = ['circle_shape'];
            _this.wrongShapes = [0, 1, 2, 5, 6, 7, 9, 10, 11, 13, 14, 15];
            // _this.wrongShapes = ['triangle_shape_pink', 'parallel_shape_horizontal', 'ovel_shape_horizontal'];//'triangle_shape_green','ovel_shape_vertical'
        }
        _this.shuffleArray(_this.wrongShapes);
    },
    Quins_fruitShow: function () {

        _this.Quins_fruit_1 = _this.add.image(150, 180, 'Quins_fruit_1');
        if (_this.objectCutting[0] == 1) {
            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question1.play();
                // _this.Question_flag = 1;
            }
        }
        if (_this.objectCutting[0] == 2) {
            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question2.play();
                // _this.Question_flag = 1;
            }
        }

        if (_this.objectCutting[0] == 1) {
            console.log("Quins_fruitShow");
            //horizontal cutting line
            _this.horizontal_arrow = _this.add.image(60, 270, 'horizontal_arrow');
            _this.horizontal_arrow.scale.setTo(0.8, 0.8);

            _this.correctShape = ['ovel_shape_horizontal'];//'ovel_shape_horizontal'ovel_shape_vertical
            _this.wrongShapes = [1, 2, 3, 5, 6, 7, 9, 11, 13, 14];//  
            // _this.wrongShapes = ['star_shape_pink', 'circle_shape', 'square_shape_green'];//'star_shape_green','square_shape_pink','square_shape_orange'
        }
        if (_this.objectCutting[0] == 2) {
            console.log("Quins_fruitShow");
            //vertical cutting line
            _this.vertical_arrow = _this.add.image(190, 90, 'vertical_arrow');

            _this.correctShape = ['waterdrop_shape'];
            _this.wrongShapes = [0, 1, 2, 5, 6, 7, 9, 10, 11, 13, 14];
            // _this.wrongShapes = ['star_shape_pink', 'circle_shape', 'parallel_shape_vertical'];//'star_shape_green'
        }
        _this.shuffleArray(_this.wrongShapes);
        console.log(_this.wrongShapes, " _this.wrongShapes");
    },
    tomatoShow: function () {
        _this.tomato_1 = _this.add.image(130, 190, 'tomato_1');
        if (_this.objectCutting[0] == 1) {
            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question1.play();
                // _this.Question_flag = 1;
            }
        }
        if (_this.objectCutting[0] == 2) {
            if (_this.count1 === 0) {
                _this.pauseVoice();
                _this.Ask_Question2.play();
                // _this.Question_flag = 1;
            }
        }


        if (_this.objectCutting[0] == 1) {
            //horizontal cutting line
            _this.horizontal_arrow = _this.add.image(50, 270, 'horizontal_arrow');
            _this.horizontal_arrow.scale.setTo(0.9, 0.9);

            _this.correctShape = ['circle_shape'];//'ovel_shape_horizontal'
            _this.wrongShapes = [0, 1, 2, 5, 6, 7, 9, 10, 11, 13, 14, 15];
            // _this.wrongShapes = ['drop_shape_blue', 'hexagon_shape', 'triangle_shape_pink'];//'drop_shape_pink','triangle_shape_green'
        }
        if (_this.objectCutting[0] == 2) {
            //vertical cutting line
            _this.vertical_arrow = _this.add.image(200, 90, 'vertical_arrow');

            _this.correctShape = ['circle_shape'];
            _this.wrongShapes = [0, 1, 2, 5, 6, 7, 9, 10, 11, 13, 14, 15];
            // _this.wrongShapes = ['triangle_shape_pink', 'star_shape_pink', 'square_shape_green'];//'triangle_shape_green','star_shape_green',,'square_shape_pink','square_shape_orange'
        }
        _this.shuffleArray(_this.wrongShapes);
    },

    firstOption: function () {
        console.log("first option");
        if (_this.optionOrder[0] == 1) {
            _this.Box2_1 = _this.add.sprite(_this.boxPosition_x[0], _this.boxPosition_y[0], 'Box2');
            _this.Box2_1.frame = 0;
            _this.Box2_1.scale.setTo(0.95, 0.95);
        }
        else if (_this.optionOrder[1] == 1) {
            _this.Box2_1 = _this.add.sprite(_this.boxPosition_x[1], _this.boxPosition_y[1], 'Box2');
            _this.Box2_1.frame = 0;
            _this.Box2_1.scale.setTo(0.95, 0.95);
        }
        else if (_this.optionOrder[2] == 1) {
            _this.Box2_1 = _this.add.sprite(_this.boxPosition_x[2], _this.boxPosition_y[2], 'Box2');
            _this.Box2_1.frame = 0;
            _this.Box2_1.scale.setTo(0.95, 0.95);
        }
        else if (_this.optionOrder[3] == 1) {
            _this.Box2_1 = _this.add.sprite(_this.boxPosition_x[3], _this.boxPosition_y[3], 'Box2');
            _this.Box2_1.frame = 0;
            _this.Box2_1.scale.setTo(0.95, 0.95);
        }
        else {
            console.log(".....");
        }

        switch (_this.objectArray[_this.count1]) {
            case 'beetroot':
                _this.correctShape = _this.add.image(60, 60, 'circle_shape');
                _this.Box2_1.addChild(_this.correctShape);
                break;
            case 'bread':
                _this.correctShape = _this.add.image(60, 70, 'square_shape_orange');
                _this.Box2_1.addChild(_this.correctShape);
                break;
            case 'star_fruit':
                _this.opShape = [1, 2];
                _this.shuffleArray(_this.opShape);
                if (_this.opShape[0] == 1)
                    _this.correctShape = _this.add.image(55, 55, 'star_shape_green');
                else _this.correctShape = _this.add.image(55, 55, 'star_shape_pink');
                _this.Box2_1.addChild(_this.correctShape);
                break;
            case 'bringle':
                if (_this.objectCutting[0] == 1) {
                    //horizontal cutting 
                    _this.opShape = [1, 2];
                    _this.shuffleArray(_this.opShape);
                    if (_this.opShape[0] == 1)
                        _this.correctShape = _this.add.image(70, 50, 'cylinder_green');
                    else _this.correctShape = _this.add.image(70, 50, 'cylinder_pink');
                }
                if (_this.objectCutting[0] == 2) {
                    //vertical cutting line circle_shape
                    _this.correctShape = _this.add.image(60, 60, 'circle_shape');
                }

                _this.Box2_1.addChild(_this.correctShape);
                break;
            case 'butter_fruit':
                if (_this.objectCutting[0] == 1) {
                    //horizontal cutting 
                    _this.correctShape = _this.add.image(60, 60, 'circle_shape');
                }
                if (_this.objectCutting[0] == 2) {
                    //vertical cutting line circle_shape
                    _this.opShape = [1, 2];
                    _this.shuffleArray(_this.opShape);
                    if (_this.opShape[0] == 1)
                        _this.correctShape = _this.add.image(70, 50, 'drop_shape_pink');
                    else _this.correctShape = _this.add.image(70, 50, 'drop_shape_blue');
                }
                _this.Box2_1.addChild(_this.correctShape);
                break;
            case 'cucumber':
                if (_this.objectCutting[0] == 1) {
                    //horizontal cutting 
                    _this.opShape = [1, 2];
                    _this.shuffleArray(_this.opShape);
                    if (_this.opShape[0] == 1)
                        _this.correctShape = _this.add.image(70, 50, 'cylinder_green');
                    else _this.correctShape = _this.add.image(70, 50, 'cylinder_pink');
                }
                if (_this.objectCutting[0] == 2) {
                    //vertical cutting line circle_shape
                    _this.correctShape = _this.add.image(60, 60, 'circle_shape');
                }
                _this.Box2_1.addChild(_this.correctShape);
                break;
            case 'Kiwi_fruit':
                if (_this.objectCutting[0] == 1) {
                    //horizontal cutting 
                    _this.correctShape = _this.add.image(60, 60, 'circle_shape');
                }
                if (_this.objectCutting[0] == 2) {
                    //vertical cutting line circle_shape
                    _this.correctShape = _this.add.image(70, 50, 'ovel_shape_vertical');
                    _this.correctShape.scale.setTo(1, 1.1);
                }
                _this.Box2_1.addChild(_this.correctShape);
                break;
            case 'onion':
                if (_this.objectCutting[0] == 2) _this.correctShape = _this.add.image(70, 60, 'waterdrop_shape');
                if (_this.objectCutting[0] == 1) _this.correctShape = _this.add.image(60, 60, 'circle_shape');

                _this.Box2_1.addChild(_this.correctShape);
                break;
            case 'Orange':
                _this.correctShape = _this.add.image(60, 60, 'circle_shape');

                _this.Box2_1.addChild(_this.correctShape);
                break;
            case 'potato':
                if (_this.objectCutting[0] == 1) {
                    //horizontal cutting 
                    _this.opShape = [1, 2];
                    _this.shuffleArray(_this.opShape);
                    if (_this.opShape[0] == 1)
                        _this.correctShape = _this.add.image(55, 70, 'ovel_shape_horizontal');
                    else {
                        _this.correctShape = _this.add.image(70, 50, 'ovel_shape_vertical');
                        _this.correctShape.scale.setTo(1, 1.1);
                    }
                }
                if (_this.objectCutting[0] == 2) {
                    //vertical cutting line circle_shape
                    _this.correctShape = _this.add.image(60, 60, 'circle_shape');
                }
                _this.Box2_1.addChild(_this.correctShape);
                break;
            case 'Quins_fruit':
                if (_this.objectCutting[0] == 1) {
                    console.log("correct op");
                    //horizontal cutting 
                    // _this.opShape = [1, 2];
                    // _this.shuffleArray(_this.opShape);
                    // if (_this.opShape[0] == 1)
                    _this.correctShape = _this.add.image(55, 70, 'ovel_shape_horizontal');
                    // else {
                    //     _this.correctShape = _this.add.image(70, 50, 'ovel_shape_vertical');
                    //     _this.correctShape.scale.setTo(1, 1.1);
                    // }
                }
                if (_this.objectCutting[0] == 2) {
                    console.log("correct op");
                    //vertical cutting line circle_shape
                    _this.correctShape = _this.add.image(70, 60, 'waterdrop_shape');
                }
                _this.Box2_1.addChild(_this.correctShape);
                console.log("Quins_fruit first");
                break;
            case 'tomato':
                _this.correctShape = _this.add.image(60, 60, 'circle_shape');
                _this.Box2_1.addChild(_this.correctShape);
                break;
        }

        _this.Box2_1.inputEnabled = true;
        _this.Box2_1.input.useHandCursor = true;
        _this.Box2_1.events.onInputDown.add(_this.changeFrame1, _this);
    },

    secondOptiont: function () {
        console.log("second option");
        if (_this.optionOrder[0] == 2) {
            _this.Box2_2 = _this.add.sprite(_this.boxPosition_x[0], _this.boxPosition_y[0], 'Box2');
            _this.Box2_2.frame = 0;
            _this.Box2_2.scale.setTo(0.95, 0.95);
        }
        else if (_this.optionOrder[1] == 2) {
            _this.Box2_2 = _this.add.sprite(_this.boxPosition_x[1], _this.boxPosition_y[1], 'Box2');
            _this.Box2_2.frame = 0;
            _this.Box2_2.scale.setTo(0.95, 0.95);
        }
        else if (_this.optionOrder[2] == 2) {
            _this.Box2_2 = _this.add.sprite(_this.boxPosition_x[2], _this.boxPosition_y[2], 'Box2');
            _this.Box2_2.frame = 0;
            _this.Box2_2.scale.setTo(0.95, 0.95);
        }
        else if (_this.optionOrder[3] == 2) {
            _this.Box2_2 = _this.add.sprite(_this.boxPosition_x[3], _this.boxPosition_y[3], 'Box2');
            _this.Box2_2.frame = 0;
            _this.Box2_2.scale.setTo(0.95, 0.95);
        }
        else {
            console.log(".....");
        }
        switch (_this.objectArray[_this.count1]) {
            case 'beetroot':
                _this.wrongShape_1 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[0]], _this.optionObjectOrderr_y[_this.wrongShapes[0]], _this.optionObjectOrder_name[_this.wrongShapes[0]]);
                _this.Box2_2.addChild(_this.wrongShape_1);
                break;
            case 'bread':
                // _this.opShape_1 = [1, 2];
                // _this.shuffleArray(_this.opShape_1);
                // if (_this.opShape_1[0] == 1)
                //     _this.wrongShape_1 = _this.add.image(55, 60, 'triangle_shape_pink');
                // else 
                _this.wrongShape_1 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[0]], _this.optionObjectOrderr_y[_this.wrongShapes[0]], _this.optionObjectOrder_name[_this.wrongShapes[0]]);
                _this.Box2_2.addChild(_this.wrongShape_1);
                break;
            case 'star_fruit':
                _this.wrongShape_1 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[0]], _this.optionObjectOrderr_y[_this.wrongShapes[0]], _this.optionObjectOrder_name[_this.wrongShapes[0]]);
                _this.Box2_2.addChild(_this.wrongShape_1);
                break;
            case 'bringle':
                _this.wrongShape_1 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[0]], _this.optionObjectOrderr_y[_this.wrongShapes[0]], _this.optionObjectOrder_name[_this.wrongShapes[0]]);
                _this.Box2_2.addChild(_this.wrongShape_1);
                break;
            case 'butter_fruit':
                // if (_this.objectCutting[0] == 1) {
                //     _this.opShape_1 = [1, 2];
                //     _this.shuffleArray(_this.opShape_1);
                //     if (_this.opShape_1[0] == 1)
                //         _this.wrongShape_1 = _this.add.image(70, 50, 'drop_shape_blue');
                //     else _this.wrongShape_1 = _this.add.image(70, 50, 'drop_shape_pink');
                // }
                // if (_this.objectCutting[0] == 2) {
                //    
                _this.wrongShape_1 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[0]], _this.optionObjectOrderr_y[_this.wrongShapes[0]], _this.optionObjectOrder_name[_this.wrongShapes[0]]);
                // }

                _this.Box2_2.addChild(_this.wrongShape_1);
                break;
            case 'cucumber':
                _this.wrongShape_1 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[0]], _this.optionObjectOrderr_y[_this.wrongShapes[0]], _this.optionObjectOrder_name[_this.wrongShapes[0]]);

                _this.Box2_2.addChild(_this.wrongShape_1);
                break;
            case 'Kiwi_fruit':
                // if (_this.objectCutting[0] == 1) {
                //     _this.wrongShape_1 = _this.add.image(55, 70, 'ovel_shape_horizontal');
                // }
                // if (_this.objectCutting[0] == 2) {
                //     _this.opShape_1 = [1, 2];
                //     _this.shuffleArray(_this.opShape_1);
                //     if (_this.opShape_1[0] == 1)
                //         _this.wrongShape_1 = _this.add.image(55, 60, 'triangle_shape_pink');
                //     else 
                _this.wrongShape_1 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[0]], _this.optionObjectOrderr_y[_this.wrongShapes[0]], _this.optionObjectOrder_name[_this.wrongShapes[0]]);
                // }

                _this.Box2_2.addChild(_this.wrongShape_1);
                break;
            case 'onion':
                // _this.wrongShape_1 = _this.add.image(50, 70, 'ovel_shape_horizontal');
                _this.wrongShape_1 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[0]], _this.optionObjectOrderr_y[_this.wrongShapes[0]], _this.optionObjectOrder_name[_this.wrongShapes[0]]);
                _this.Box2_2.addChild(_this.wrongShape_1);
                break;
            case 'Orange':
                // _this.opShape_1 = [1, 2];
                // _this.shuffleArray(_this.opShape_1);
                // if (_this.opShape_1[0] == 1)
                //     _this.wrongShape_1 = _this.add.image(70, 50, 'drop_shape_blue');
                // else _this.wrongShape_1 = _this.add.image(70, 50, 'drop_shape_pink');
                _this.wrongShape_1 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[0]], _this.optionObjectOrderr_y[_this.wrongShapes[0]], _this.optionObjectOrder_name[_this.wrongShapes[0]]);
                _this.Box2_2.addChild(_this.wrongShape_1);
                break;
            case 'potato':
                // if (_this.objectCutting[0] == 1) {
                //     _this.wrongShape_1 = _this.add.image(60, 60, 'circle_shape');
                // }
                // if (_this.objectCutting[0] == 2) {
                //     _this.opShape_1 = [1, 2];
                //     _this.shuffleArray(_this.opShape_1);
                //     if (_this.opShape_1[0] == 1)
                //         _this.wrongShape_1 = _this.add.image(55, 60, 'triangle_shape_pink');
                //     else _this.wrongShape_1 = _this.add.image(55, 60, 'triangle_shape_green');
                // }
                _this.wrongShape_1 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[0]], _this.optionObjectOrderr_y[_this.wrongShapes[0]], _this.optionObjectOrder_name[_this.wrongShapes[0]]);
                _this.Box2_2.addChild(_this.wrongShape_1);
                break;
            case 'Quins_fruit':
                // _this.opShape_1 = [1, 2];
                // _this.shuffleArray(_this.opShape_1);
                // if (_this.opShape_1[0] == 1)
                //     _this.wrongShape_1 = _this.add.image(55, 55, 'star_shape_green');
                // else _this.wrongShape_1 = _this.add.image(55, 55, 'star_shape_pink');
                _this.wrongShape_1 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[0]], _this.optionObjectOrderr_y[_this.wrongShapes[0]], _this.optionObjectOrder_name[_this.wrongShapes[0]]);
                _this.Box2_2.addChild(_this.wrongShape_1);
                console.log("Quins_fruit second");
                break;
            case 'tomato':
                _this.opShape_1 = [1, 2];
                // _this.shuffleArray(_this.opShape_1);
                // if (_this.opShape_1[0] == 1)
                //     _this.wrongShape_1 = _this.add.image(55, 60, 'triangle_shape_pink');
                // else _this.wrongShape_1 = _this.add.image(55, 60, 'triangle_shape_green');
                _this.wrongShape_1 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[0]], _this.optionObjectOrderr_y[_this.wrongShapes[0]], _this.optionObjectOrder_name[_this.wrongShapes[0]]);
                _this.Box2_2.addChild(_this.wrongShape_1);
                break;
        }

        _this.Box2_2.inputEnabled = true;
        _this.Box2_2.input.useHandCursor = true;
        _this.Box2_2.events.onInputDown.add(_this.changeFrame2, _this);
    },

    thirdOption: function () {
        console.log("third option");
        if (_this.optionOrder[0] == 3) {
            _this.Box2_3 = _this.add.sprite(_this.boxPosition_x[0], _this.boxPosition_y[0], 'Box2');
            _this.Box2_3.frame = 0;
            _this.Box2_3.scale.setTo(0.95, 0.95);
        }
        else if (_this.optionOrder[1] == 3) {
            _this.Box2_3 = _this.add.sprite(_this.boxPosition_x[1], _this.boxPosition_y[1], 'Box2');
            _this.Box2_3.frame = 0;
            _this.Box2_3.scale.setTo(0.95, 0.95);
        }
        else if (_this.optionOrder[2] == 3) {
            _this.Box2_3 = _this.add.sprite(_this.boxPosition_x[2], _this.boxPosition_y[2], 'Box2');
            _this.Box2_3.frame = 0;
            _this.Box2_3.scale.setTo(0.95, 0.95);
        }
        else if (_this.optionOrder[3] == 3) {
            _this.Box2_3 = _this.add.sprite(_this.boxPosition_x[3], _this.boxPosition_y[3], 'Box2');
            _this.Box2_3.frame = 0;
            _this.Box2_3.scale.setTo(0.95, 0.95);
        }
        else {
            console.log(".....");
        }
        switch (_this.objectArray[_this.count1]) {
            case 'beetroot':
                // _this.opShape_2 = [1, 2, 3];
                // _this.shuffleArray(_this.opShape_2);
                // if (_this.opShape_2[0] == 1)
                //     _this.wrongShape_2 = _this.add.image(60, 65, 'square_shape_green');
                // else if (_this.opShape_2[0] == 2) _this.wrongShape_2 = _this.add.image(60, 65, 'square_shape_pink');
                // else
                _this.wrongShape_2 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[1]], _this.optionObjectOrderr_y[_this.wrongShapes[1]], _this.optionObjectOrder_name[_this.wrongShapes[1]]);
                _this.Box2_3.addChild(_this.wrongShape_2);
                break;
            case 'bread':
                // _this.opShape_2 = [1, 2, 3];
                // _this.shuffleArray(_this.opShape_2);
                // if (_this.opShape_2[0] == 1)
                //     _this.wrongShape_2 = _this.add.image(70, 50, 'drop_shape_blue');
                // else 
                _this.wrongShape_2 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[1]], _this.optionObjectOrderr_y[_this.wrongShapes[1]], _this.optionObjectOrder_name[_this.wrongShapes[1]]);
                _this.Box2_3.addChild(_this.wrongShape_2);
                break;
            case 'star_fruit':
                _this.wrongShape_2 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[1]], _this.optionObjectOrderr_y[_this.wrongShapes[1]], _this.optionObjectOrder_name[_this.wrongShapes[1]]);
                _this.Box2_3.addChild(_this.wrongShape_2);
                break;
            case 'bringle':
                // if (_this.objectCutting[0] == 1) {//horizontal cutting so circle shape
                //     _this.wrongShape_2 = _this.add.image(60, 60, 'circle_shape');
                // }
                // if (_this.objectCutting[0] == 2) {//vertical cutting so cylinder shape
                //     _this.opShape_2 = [1, 2];
                //     _this.shuffleArray(_this.opShape_2);
                //     if (_this.opShape_2[0] == 1)
                //         _this.wrongShape_2 = _this.add.image(70, 50, 'cylinder_green');
                //     else 
                // }
                _this.wrongShape_2 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[1]], _this.optionObjectOrderr_y[_this.wrongShapes[1]], _this.optionObjectOrder_name[_this.wrongShapes[1]]);
                _this.Box2_3.addChild(_this.wrongShape_2);
                break;
            case 'butter_fruit':
                // if (_this.objectCutting[0] == 1) {
                //     _this.wrongShape_2 = _this.add.image(60, 65, 'hexagon_shape');
                // }
                // if (_this.objectCutting[0] == 2) {
                //     
                _this.wrongShape_2 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[1]], _this.optionObjectOrderr_y[_this.wrongShapes[1]], _this.optionObjectOrder_name[_this.wrongShapes[1]]);
                // }
                _this.Box2_3.addChild(_this.wrongShape_2);
                break;
            case 'cucumber':
                // if (_this.objectCutting[0] == 1) {
                //     _this.wrongShape_2 = _this.add.image(60, 60, 'circle_shape');
                // }
                // if (_this.objectCutting[0] == 2) {
                //     _this.opShape_2 = [1, 2];
                //     _this.shuffleArray(_this.opShape_2);
                //     if (_this.opShape_2[0] == 1)
                //         _this.wrongShape_2 = _this.add.image(70, 50, 'cylinder_green');
                //     else 
                _this.wrongShape_2 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[1]], _this.optionObjectOrderr_y[_this.wrongShapes[1]], _this.optionObjectOrder_name[_this.wrongShapes[1]]);
                // }
                _this.Box2_3.addChild(_this.wrongShape_2);
                break;
            case 'Kiwi_fruit':
                // if (_this.objectCutting[0] == 1) {
                //     _this.opShape_2 = [1, 2];
                //     _this.shuffleArray(_this.opShape_2);
                //     if (_this.opShape_2[0] == 1)
                //         _this.wrongShape_2 = _this.add.image(55, 55, 'star_shape_green');
                //     else _this.wrongShape_2 = _this.add.image(55, 55, 'star_shape_pink');
                // }
                // if (_this.objectCutting[0] == 2) {
                //     _this.opShape_2 = [1, 2];
                //     _this.shuffleArray(_this.opShape_2);
                //     if (_this.opShape_2[0] == 1)
                //         _this.wrongShape_2 = _this.add.image(70, 50, 'drop_shape_pink');
                //     else _this.wrongShape_2 = _this.add.image(70, 50, 'drop_shape_blue');
                // }
                _this.wrongShape_2 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[1]], _this.optionObjectOrderr_y[_this.wrongShapes[1]], _this.optionObjectOrder_name[_this.wrongShapes[1]]);
                _this.Box2_3.addChild(_this.wrongShape_2);
                break;
            case 'onion':
                // _this.opShape_2 = [1, 2];
                // _this.shuffleArray(_this.opShape_2);
                // if (_this.opShape_2[0] == 1)
                //     _this.wrongShape_2 = _this.add.image(55, 55, 'star_shape_green');
                // else _this.wrongShape_2 = _this.add.image(55, 55, 'star_shape_pink');
                _this.wrongShape_2 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[1]], _this.optionObjectOrderr_y[_this.wrongShapes[1]], _this.optionObjectOrder_name[_this.wrongShapes[1]]);
                _this.Box2_3.addChild(_this.wrongShape_2);
                break;
            case 'Orange':
                // _this.opShape_2 = [1, 2];
                // _this.shuffleArray(_this.opShape_2);
                // if (_this.opShape_2[0] == 1)
                //     _this.wrongShape_2 = _this.add.image(55, 55, 'star_shape_green');
                // else _this.wrongShape_2 = _this.add.image(55, 55, 'star_shape_pink');
                _this.wrongShape_2 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[1]], _this.optionObjectOrderr_y[_this.wrongShapes[1]], _this.optionObjectOrder_name[_this.wrongShapes[1]]);
                _this.Box2_3.addChild(_this.wrongShape_2);
                break;
            case 'potato':
                // if (_this.objectCutting[0] == 1) {//horizontal cutting so circle shape
                //     _this.wrongShape_2 = _this.add.image(70, 60, 'heart_shape');
                // }
                // if (_this.objectCutting[0] == 2) {//vertical cutting so cylinder shape
                //     _this.wrongShape_2 = _this.add.image(50, 80, 'parallel_shape_horizontal');
                // }
                _this.wrongShape_2 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[1]], _this.optionObjectOrderr_y[_this.wrongShapes[1]], _this.optionObjectOrder_name[_this.wrongShapes[1]]);
                _this.Box2_3.addChild(_this.wrongShape_2);
                break;
            case 'Quins_fruit':
                // _this.wrongShape_2 = _this.add.image(60, 60, 'circle_shape');
                _this.wrongShape_2 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[1]], _this.optionObjectOrderr_y[_this.wrongShapes[1]], _this.optionObjectOrder_name[_this.wrongShapes[1]]);
                _this.Box2_3.addChild(_this.wrongShape_2);
                console.log("Quins_fruit third");
                break;
            case 'tomato':
                // if (_this.objectCutting[0] == 1) {
                //     _this.wrongShape_2 = _this.add.image(60, 65, 'hexagon_shape');
                // }
                // if (_this.objectCutting[0] == 2) {
                //     _this.opShape_2 = [1, 2];
                //     _this.shuffleArray(_this.opShape_2);
                //     if (_this.opShape_2[0] == 1)
                //         _this.wrongShape_2 = _this.add.image(55, 55, 'star_shape_green');
                //     else _this.wrongShape_2 = _this.add.image(55, 55, 'star_shape_pink');
                // }
                _this.wrongShape_2 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[1]], _this.optionObjectOrderr_y[_this.wrongShapes[1]], _this.optionObjectOrder_name[_this.wrongShapes[1]]);
                _this.Box2_3.addChild(_this.wrongShape_2);
                break;
        }

        _this.Box2_3.inputEnabled = true;
        _this.Box2_3.input.useHandCursor = true;
        _this.Box2_3.events.onInputDown.add(_this.changeFrame3, _this);
    },

    forthOption: function () {
        console.log("forth option");
        if (_this.optionOrder[0] == 4) {
            _this.Box2_4 = _this.add.sprite(_this.boxPosition_x[0], _this.boxPosition_y[0], 'Box2');
            _this.Box2_4.frame = 0;
            _this.Box2_4.scale.setTo(0.95, 0.95);
        }
        else if (_this.optionOrder[1] == 4) {
            _this.Box2_4 = _this.add.sprite(_this.boxPosition_x[1], _this.boxPosition_y[1], 'Box2');
            _this.Box2_4.frame = 0;
            _this.Box2_4.scale.setTo(0.95, 0.95);
        }
        else if (_this.optionOrder[2] == 4) {
            _this.Box2_4 = _this.add.sprite(_this.boxPosition_x[2], _this.boxPosition_y[2], 'Box2');
            _this.Box2_4.frame = 0;
            _this.Box2_4.scale.setTo(0.95, 0.95);
        }
        else if (_this.optionOrder[3] == 4) {
            _this.Box2_4 = _this.add.sprite(_this.boxPosition_x[3], _this.boxPosition_y[3], 'Box2');
            _this.Box2_4.frame = 0;
            _this.Box2_4.scale.setTo(0.95, 0.95);
        }
        else {
            console.log(".....");
        }
        switch (_this.objectArray[_this.count1]) {
            case 'beetroot':
                // _this.opShape_3 = [1, 2];
                // _this.shuffleArray(_this.opShape_3);
                // if (_this.opShape_3[0] == 1)
                //     _this.wrongShape_3 = _this.add.image(55, 55, 'star_shape_pink');
                // else
                _this.wrongShape_3 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[2]], _this.optionObjectOrderr_y[_this.wrongShapes[2]], _this.optionObjectOrder_name[_this.wrongShapes[2]]);
                _this.Box2_4.addChild(_this.wrongShape_3);

                break;
            case 'bread':
                _this.wrongShape_3 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[2]], _this.optionObjectOrderr_y[_this.wrongShapes[2]], _this.optionObjectOrder_name[_this.wrongShapes[2]]);
                _this.Box2_4.addChild(_this.wrongShape_3);
                break;
            case 'star_fruit':
                // _this.opShape_3 = [1, 2, 3];
                // _this.shuffleArray(_this.opShape_3);
                // if (_this.opShape_3[0] == 1) _this.wrongShape_3 = _this.add.image(60, 65, 'square_shape_green');
                // else if (_this.opShape_3[0] == 2) _this.wrongShape_3 = _this.add.image(60, 65, 'square_shape_orange');
                // else 
                _this.wrongShape_3 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[2]], _this.optionObjectOrderr_y[_this.wrongShapes[2]], _this.optionObjectOrder_name[_this.wrongShapes[2]]);
                _this.Box2_4.addChild(_this.wrongShape_3);
                break;
            case 'bringle':
                // _this.opShape_3 = [1, 2, 3];
                // _this.shuffleArray(_this.opShape_3);
                // if (_this.opShape_3[0] == 1) _this.wrongShape_3 = _this.add.image(60, 65, 'square_shape_green');
                // else if (_this.opShape_3[0] == 2) _this.wrongShape_3 = _this.add.image(60, 65, 'square_shape_orange');
                // else
                _this.wrongShape_3 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[2]], _this.optionObjectOrderr_y[_this.wrongShapes[2]], _this.optionObjectOrder_name[_this.wrongShapes[2]]);
                _this.Box2_4.addChild(_this.wrongShape_3);
                break;
            case 'butter_fruit':
                // _this.opShape_3 = [1, 2];
                // _this.shuffleArray(_this.opShape_3);
                // if (_this.opShape_3[0] == 1) _this.wrongShape_3 = _this.add.image(50, 60, 'triangle_shape_pink');
                // else 
                _this.wrongShape_3 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[2]], _this.optionObjectOrderr_y[_this.wrongShapes[2]], _this.optionObjectOrder_name[_this.wrongShapes[2]]);

                _this.Box2_4.addChild(_this.wrongShape_3);
                break;
            case 'cucumber':
                // _this.opShape_3 = [1, 2, 3];
                // _this.shuffleArray(_this.opShape_3);
                // if (_this.opShape_3[0] == 1) _this.wrongShape_3 = _this.add.image(60, 65, 'square_shape_green');
                // else if (_this.opShape_3[0] == 1) _this.wrongShape_3 = _this.add.image(60, 65, 'square_shape_pink');
                // else 
                _this.wrongShape_3 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[2]], _this.optionObjectOrderr_y[_this.wrongShapes[2]], _this.optionObjectOrder_name[_this.wrongShapes[2]]);

                _this.Box2_4.addChild(_this.wrongShape_3);
                break;
            case 'Kiwi_fruit':
                // _this.opShape_3 = [1, 2, 3];
                // _this.shuffleArray(_this.opShape_3);
                // if (_this.opShape_3[0] == 1)
                //     _this.wrongShape_3 = _this.add.image(60, 65, 'square_shape_green');
                // else if (_this.opShape_3[0] == 2) _this.wrongShape_3 = _this.add.image(60, 65, 'square_shape_pink');
                // else _this.wrongShape_3 = _this.add.image(60, 65, 'square_shape_orange');
                _this.wrongShape_3 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[2]], _this.optionObjectOrderr_y[_this.wrongShapes[2]], _this.optionObjectOrder_name[_this.wrongShapes[2]]);
                _this.Box2_4.addChild(_this.wrongShape_3);
                break;
            case 'onion':
                // _this.opShape_3 = [1, 2, 3];
                // _this.shuffleArray(_this.opShape_3);
                // if (_this.opShape_3[0] == 1)
                //     _this.wrongShape_3 = _this.add.image(60, 65, 'square_shape_green');
                // else if (_this.opShape_3[0] == 2) _this.wrongShape_3 = _this.add.image(60, 65, 'square_shape_pink');
                // else _this.wrongShape_3 = _this.add.image(60, 65, 'square_shape_orange');
                _this.wrongShape_3 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[2]], _this.optionObjectOrderr_y[_this.wrongShapes[2]], _this.optionObjectOrder_name[_this.wrongShapes[2]]);
                _this.Box2_4.addChild(_this.wrongShape_3);
                break;
            case 'Orange':
                // _this.opShape_3 = [1, 2];
                // _this.shuffleArray(_this.opShape_3);
                // if (_this.opShape_3[0] == 1)
                //     _this.wrongShape_3 = _this.add.image(70, 50, 'cylinder_green');
                // else _this.wrongShape_3 = _this.add.image(70, 50, 'cylinder_pink');
                _this.wrongShape_3 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[2]], _this.optionObjectOrderr_y[_this.wrongShapes[2]], _this.optionObjectOrder_name[_this.wrongShapes[2]]);
                _this.Box2_4.addChild(_this.wrongShape_3);
                break;
            case 'potato':
                // if (_this.objectCutting[0] == 1) {
                //     _this.wrongShape_3 = _this.add.image(60, 65, 'hexagon_shape');
                // }
                // if (_this.objectCutting[0] == 2) {
                //     _this.opShape_3 = [1, 2];
                //     _this.shuffleArray(_this.opShape_3);
                //     if (_this.opShape_3[0] == 1)
                //         _this.wrongShape_3 = _this.add.image(55, 70, 'ovel_shape_horizontal');
                //     else {
                //         _this.wrongShape_3 = _this.add.image(70, 50, 'ovel_shape_vertical');
                //         _this.wrongShape_3.scale.setTo(1, 1.1);
                //     }
                // }
                _this.wrongShape_3 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[2]], _this.optionObjectOrderr_y[_this.wrongShapes[2]], _this.optionObjectOrder_name[_this.wrongShapes[2]]);
                _this.Box2_4.addChild(_this.wrongShape_3);
                break;
            case 'Quins_fruit':
                // if (_this.objectCutting[0] == 1) {
                //     _this.opShape_3 = [1, 2, 3];
                //     _this.shuffleArray(_this.opShape_3);
                //     if (_this.opShape_3[0] == 1) _this.wrongShape_3 = _this.add.image(60, 65, 'square_shape_green');
                //     else if (_this.opShape_3[0] == 2) _this.wrongShape_3 = _this.add.image(60, 65, 'square_shape_orange');
                //     else _this.wrongShape_3 = _this.add.image(60, 65, 'square_shape_pink');
                // }
                // if (_this.objectCutting[0] == 2) {
                //     _this.wrongShape_3 = _this.add.image(75, 50, 'parallel_shape_vertical');
                // }
                _this.wrongShape_3 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[2]], _this.optionObjectOrderr_y[_this.wrongShapes[2]], _this.optionObjectOrder_name[_this.wrongShapes[2]]);
                _this.Box2_4.addChild(_this.wrongShape_3);
                console.log("Quins_fruit forth");
                break;
            case 'tomato':
                // if (_this.objectCutting[0] == 1) {
                //     _this.opShape_3 = [1, 2];
                //     _this.shuffleArray(_this.opShape_3);
                //     if (_this.opShape_3[0] == 1)
                //         _this.wrongShape_3 = _this.add.image(70, 50, 'drop_shape_blue');
                //     else _this.wrongShape_3 = _this.add.image(70, 50, 'drop_shape_pink');
                // }
                // if (_this.objectCutting[0] == 2) {
                //     _this.opShape_3 = [1, 2, 3];
                //     _this.shuffleArray(_this.opShape_3);
                //     if (_this.opShape_3[0] == 1) _this.wrongShape_3 = _this.add.image(60, 65, 'square_shape_green');
                //     else if (_this.opShape_3[0] == 2) _this.wrongShape_3 = _this.add.image(60, 65, 'square_shape_orange');
                //     else _this.wrongShape_3 = _this.add.image(60, 65, 'square_shape_pink');
                // }
                _this.wrongShape_3 = _this.add.image(_this.optionObjectOrder_x[_this.wrongShapes[2]], _this.optionObjectOrderr_y[_this.wrongShapes[2]], _this.optionObjectOrder_name[_this.wrongShapes[2]]);
                _this.Box2_4.addChild(_this.wrongShape_3);
                break;
        }


        _this.Box2_4.inputEnabled = true;
        _this.Box2_4.input.useHandCursor = true;
        _this.Box2_4.events.onInputDown.add(_this.changeFrame4, _this);
    },

    //option validation will do here
    tickValidation: function () {
        console.log("tick");
        if (_this.Box2_1.frame == 1) {
            console.log("tick correct");
            _this.counterCelebrationSound.play();
            _this.tick.inputEnabled = false;
            _this.tick.input.useHandCursor = false;
            _this.Box2_1.inputEnabled = false;
            _this.Box2_1.input.useHandCursor = false;
            _this.Box2_2.inputEnabled = false;
            _this.Box2_2.input.useHandCursor = false;
            _this.Box2_3.inputEnabled = false;
            _this.Box2_3.input.useHandCursor = false;
            _this.Box2_4.inputEnabled = false;
            _this.Box2_4.input.useHandCursor = false;
            _this.tick.destroy();
            switch (_this.objectArray[_this.count1]) {
                case 'beetroot': _this.beetrootAnim();
                    break;
                case 'bread': _this.breadAnim();
                    break;
                case 'star_fruit': _this.star_fruitAnim();
                    break;
                case 'bringle': _this.bringleAnim();
                    break;
                case 'butter_fruit': _this.butter_fruitAnim();
                    break;
                case 'cucumber': _this.cucumberAnim();
                    break;
                case 'Kiwi_fruit': _this.Kiwi_fruitAnim();
                    break;
                case 'onion': _this.onionAnim();
                    break;
                case 'Orange': _this.OrangeAnim();
                    break;
                case 'potato': _this.potatoAnim();
                    break;
                case 'Quins_fruit': _this.Quins_fruitAnim();
                    break;
                case 'tomato': _this.tomatoAnim();
                    break;
            }

        }
        else {
            console.log("tick wrong");
            _this.noofAttempts
            _this.wrongSound.play();
            _this.boxgrp = _this.add.group();
            _this.boxgrp.addChild(_this.Box2_1);
            _this.boxgrp.addChild(_this.Box2_2);
            _this.boxgrp.addChild(_this.Box2_3);
            _this.boxgrp.addChild(_this.Box2_4);
            _this.shake.shake(10, _this.boxgrp);

            if (_this.Box2_2.frame == 1) _this.Box2_2.frame = 2;
            if (_this.Box2_3.frame == 1) _this.Box2_3.frame = 2;
            if (_this.Box2_4.frame == 1) _this.Box2_4.frame = 2;
            _this.time.events.add(500, () => {
                _this.Box2_1.frame = 0;
                _this.Box2_2.frame = 0;
                _this.Box2_3.frame = 0;
                _this.Box2_4.frame = 0;
            });
        }
    },
    beetrootAnim: function () {
        _this.boxGroup.addChild(_this.Box2_1);
        _this.boxGroup.addChild(_this.Box2_2);
        _this.boxGroup.addChild(_this.Box2_3);
        _this.boxGroup.addChild(_this.Box2_4);

        _this.Box2 = _this.add.sprite(450, 70, 'Box1');
        _this.Box2.alpha = 0;

        _this.lastObject = _this.add.image(500, 200, 'beetroot_2');//130,190//30,70==100,120
        // _this.lastObject.scale.setTo(0.8, 0.8);
        _this.horizontal_arrow.destroy();
        _this.lastObject.alpha = 0;

        _this.lastScreenCelebration();
        _this.firstTween = _this.add.tween(_this.boxGroup).to({ alpha: 0 }, 1000, 'Linear', true, 0);

        _this.firstTween.onComplete.add(function () {
            _this.boxTween = _this.add.tween(_this.Box2).to({ alpha: 1 }, 500, 'Linear', true, 0);
            _this.secondTween = _this.add.tween(_this.lastObject).to({ alpha: 1 }, 500, 'Linear', true, 0);

            // _this.secondTween.onComplete.add(function () {
            //     _this.time.events.add(3000, () => {
            //         _this.clearAll();
            //     });
            // });
        });
    },
    breadAnim: function () {
        _this.boxGroup.addChild(_this.Box2_1);
        _this.boxGroup.addChild(_this.Box2_2);
        _this.boxGroup.addChild(_this.Box2_3);
        _this.boxGroup.addChild(_this.Box2_4);

        _this.Box2 = _this.add.sprite(450, 70, 'Box1');
        _this.Box2.alpha = 0;

        _this.lastObject = _this.add.image(550, 190, 'bread_2');//130,190//30,70==100,120
        // _this.lastObject.scale.setTo(0.8, 0.8);
        _this.vertical_arrow.destroy();
        _this.lastObject.alpha = 0;
        _this.lastScreenCelebration();
        _this.firstTween = _this.add.tween(_this.boxGroup).to({ alpha: 0 }, 1000, 'Linear', true, 0);

        _this.firstTween.onComplete.add(function () {
            _this.boxTween = _this.add.tween(_this.Box2).to({ alpha: 1 }, 500, 'Linear', true, 0);
            _this.secondTween = _this.add.tween(_this.lastObject).to({ alpha: 1 }, 500, 'Linear', true, 0);

            // _this.secondTween.onComplete.add(function () {
            //     _this.time.events.add(3000, () => {
            //         _this.clearAll();
            //     });
            // });
        });
    },
    star_fruitAnim: function () {
        _this.boxGroup.addChild(_this.Box2_1);
        _this.boxGroup.addChild(_this.Box2_2);
        _this.boxGroup.addChild(_this.Box2_3);
        _this.boxGroup.addChild(_this.Box2_4);

        _this.Box2 = _this.add.sprite(450, 70, 'Box1');
        _this.Box2.alpha = 0;

        _this.lastObject = _this.add.image(550, 190, 'star_fruit_2');//130,190//30,70==100,120
        // _this.lastObject.scale.setTo(0.8, 0.8);
        _this.horizontal_arrow.destroy();
        _this.lastObject.alpha = 0;
        _this.lastScreenCelebration();
        _this.firstTween = _this.add.tween(_this.boxGroup).to({ alpha: 0 }, 1000, 'Linear', true, 0);

        _this.firstTween.onComplete.add(function () {
            _this.boxTween = _this.add.tween(_this.Box2).to({ alpha: 1 }, 500, 'Linear', true, 0);
            _this.secondTween = _this.add.tween(_this.lastObject).to({ alpha: 1 }, 500, 'Linear', true, 0);

            // _this.secondTween.onComplete.add(function () {
            //     _this.time.events.add(3000, () => {
            //         _this.clearAll();
            //     });
            // });
        });
    },
    bringleAnim: function () {
        _this.boxGroup.addChild(_this.Box2_1);
        _this.boxGroup.addChild(_this.Box2_2);
        _this.boxGroup.addChild(_this.Box2_3);
        _this.boxGroup.addChild(_this.Box2_4);

        _this.Box2 = _this.add.sprite(450, 70, 'Box1');
        _this.Box2.alpha = 0;
        if (_this.objectCutting[0] == 1) {
            _this.lastObject = _this.add.image(540, 250, 'bringle_2');//130,190//30,70==100,120
            // _this.lastObject.scale.setTo(0.8, 0.8);
            _this.horizontal_arrow.destroy();
            _this.lastObject.alpha = 0;
        }
        if (_this.objectCutting[0] == 2) {
            _this.lastObject = _this.add.image(540, 250, 'bringle_3');
            _this.vertical_arrow.destroy();
            _this.lastObject.alpha = 0;
        }
        _this.lastScreenCelebration();
        _this.firstTween = _this.add.tween(_this.boxGroup).to({ alpha: 0 }, 1000, 'Linear', true, 0);

        _this.firstTween.onComplete.add(function () {
            _this.boxTween = _this.add.tween(_this.Box2).to({ alpha: 1 }, 500, 'Linear', true, 0);
            _this.secondTween = _this.add.tween(_this.lastObject).to({ alpha: 1 }, 500, 'Linear', true, 0);

            // _this.secondTween.onComplete.add(function () {
            //     _this.time.events.add(3000, () => {
            //         _this.clearAll();
            //     });
            // });
        });
    },
    butter_fruitAnim: function () {
        _this.boxGroup.addChild(_this.Box2_1);
        _this.boxGroup.addChild(_this.Box2_2);
        _this.boxGroup.addChild(_this.Box2_3);
        _this.boxGroup.addChild(_this.Box2_4);

        _this.Box2 = _this.add.sprite(450, 70, 'Box1');
        _this.Box2.alpha = 0;
        if (_this.objectCutting[0] == 1) {
            _this.lastObject = _this.add.image(560, 200, 'butter_fruit_2');//130,190//30,70==100,120
            // _this.lastObject.scale.setTo(0.8, 0.8);
            _this.horizontal_arrow.destroy();
            _this.lastObject.alpha = 0;
        }
        if (_this.objectCutting[0] == 2) {
            _this.lastObject = _this.add.image(560, 150, 'butter_fruit_3');
            _this.vertical_arrow.destroy();
            _this.lastObject.alpha = 0;
        }
        _this.lastScreenCelebration();
        _this.firstTween = _this.add.tween(_this.boxGroup).to({ alpha: 0 }, 1000, 'Linear', true, 0);

        _this.firstTween.onComplete.add(function () {
            _this.boxTween = _this.add.tween(_this.Box2).to({ alpha: 1 }, 500, 'Linear', true, 0);
            _this.secondTween = _this.add.tween(_this.lastObject).to({ alpha: 1 }, 500, 'Linear', true, 0);

            // _this.secondTween.onComplete.add(function () {
            //     _this.time.events.add(3000, () => {
            //         _this.clearAll();
            //     });
            // });
        });
    },
    cucumberAnim: function () {
        _this.boxGroup.addChild(_this.Box2_1);
        _this.boxGroup.addChild(_this.Box2_2);
        _this.boxGroup.addChild(_this.Box2_3);
        _this.boxGroup.addChild(_this.Box2_4);

        _this.Box2 = _this.add.sprite(450, 70, 'Box1');
        _this.Box2.alpha = 0;
        if (_this.objectCutting[0] == 1) {
            _this.lastObject = _this.add.image(510, 210, 'cucumber_2');//130,190//30,70==100,120
            // _this.lastObject.scale.setTo(0.8, 0.8);
            _this.horizontal_arrow.destroy();
            _this.lastObject.alpha = 0;
        }
        if (_this.objectCutting[0] == 2) {
            _this.lastObject = _this.add.image(520, 230, 'cucumber_3');
            _this.vertical_arrow.destroy();
            _this.lastObject.alpha = 0;
        }
        _this.lastScreenCelebration();
        _this.firstTween = _this.add.tween(_this.boxGroup).to({ alpha: 0 }, 1000, 'Linear', true, 0);

        _this.firstTween.onComplete.add(function () {
            _this.boxTween = _this.add.tween(_this.Box2).to({ alpha: 1 }, 500, 'Linear', true, 0);
            _this.secondTween = _this.add.tween(_this.lastObject).to({ alpha: 1 }, 500, 'Linear', true, 0);

            // _this.secondTween.onComplete.add(function () {
            //     _this.time.events.add(3000, () => {
            //         _this.clearAll();
            //     });
            // });
        });
    },
    Kiwi_fruitAnim: function () {
        _this.boxGroup.addChild(_this.Box2_1);
        _this.boxGroup.addChild(_this.Box2_2);
        _this.boxGroup.addChild(_this.Box2_3);
        _this.boxGroup.addChild(_this.Box2_4);

        _this.Box2 = _this.add.sprite(450, 70, 'Box1');
        _this.Box2.alpha = 0;
        if (_this.objectCutting[0] == 1) {
            _this.lastObject = _this.add.image(500, 210, 'Kiwi_fruit_2');//130,190//30,70==100,120
            // _this.lastObject.scale.setTo(0.8, 0.8);
            _this.horizontal_arrow.destroy();
            _this.lastObject.alpha = 0;
        }
        if (_this.objectCutting[0] == 2) {
            _this.lastObject = _this.add.image(580, 200, 'Kiwi_fruit_3');
            _this.vertical_arrow.destroy();
            _this.lastObject.alpha = 0;
        }
        _this.lastScreenCelebration();
        _this.firstTween = _this.add.tween(_this.boxGroup).to({ alpha: 0 }, 1000, 'Linear', true, 0);

        _this.firstTween.onComplete.add(function () {
            _this.boxTween = _this.add.tween(_this.Box2).to({ alpha: 1 }, 500, 'Linear', true, 0);
            _this.secondTween = _this.add.tween(_this.lastObject).to({ alpha: 1 }, 500, 'Linear', true, 0);

            // _this.secondTween.onComplete.add(function () {
            //     _this.time.events.add(3000, () => {
            //         _this.clearAll();
            //     });
            // });
        });
    },
    onionAnim: function () {
        _this.boxGroup.addChild(_this.Box2_1);
        _this.boxGroup.addChild(_this.Box2_2);
        _this.boxGroup.addChild(_this.Box2_3);
        _this.boxGroup.addChild(_this.Box2_4);

        _this.Box2 = _this.add.sprite(450, 70, 'Box1');
        _this.Box2.alpha = 0;
        if (_this.objectCutting[0] == 1) {
            _this.lastObject = _this.add.image(570, 200, 'onion_3');//130,190//30,70==100,120
            // _this.lastObject.scale.setTo(0.8, 0.8);
            _this.horizontal_arrow.destroy();
            _this.lastObject.alpha = 0;
        }
        if (_this.objectCutting[0] == 2) {
            _this.lastObject = _this.add.image(570, 200, 'onion_2');
            _this.vertical_arrow.destroy();
            _this.lastObject.alpha = 0;
        }
        _this.lastScreenCelebration();
        _this.firstTween = _this.add.tween(_this.boxGroup).to({ alpha: 0 }, 1000, 'Linear', true, 0);

        _this.firstTween.onComplete.add(function () {
            _this.boxTween = _this.add.tween(_this.Box2).to({ alpha: 1 }, 500, 'Linear', true, 0);
            _this.secondTween = _this.add.tween(_this.lastObject).to({ alpha: 1 }, 500, 'Linear', true, 0);

            // _this.secondTween.onComplete.add(function () {
            //     _this.time.events.add(3000, () => {
            //         _this.clearAll();
            //     });
            // });
        });
    },
    OrangeAnim: function () {
        _this.boxGroup.addChild(_this.Box2_1);
        _this.boxGroup.addChild(_this.Box2_2);
        _this.boxGroup.addChild(_this.Box2_3);
        _this.boxGroup.addChild(_this.Box2_4);

        _this.Box2 = _this.add.sprite(450, 70, 'Box1');
        _this.Box2.alpha = 0;
        if (_this.objectCutting[0] == 1) {
            _this.lastObject = _this.add.image(570, 200, 'Orange_2');//130,190//30,70==100,120
            // _this.lastObject.scale.setTo(0.8, 0.8);
            _this.horizontal_arrow.destroy();
            _this.lastObject.alpha = 0;
        }
        if (_this.objectCutting[0] == 2) {
            _this.lastObject = _this.add.image(570, 200, 'Orange_3');
            _this.vertical_arrow.destroy();
            _this.lastObject.alpha = 0;
        }
        _this.lastScreenCelebration();
        _this.firstTween = _this.add.tween(_this.boxGroup).to({ alpha: 0 }, 1000, 'Linear', true, 0);

        _this.firstTween.onComplete.add(function () {
            _this.boxTween = _this.add.tween(_this.Box2).to({ alpha: 1 }, 500, 'Linear', true, 0);
            _this.secondTween = _this.add.tween(_this.lastObject).to({ alpha: 1 }, 500, 'Linear', true, 0);

            // _this.secondTween.onComplete.add(function () {
            //     _this.time.events.add(3000, () => {
            //         _this.clearAll();
            //     });
            // });
        });
    },
    potatoAnim: function () {
        _this.boxGroup.addChild(_this.Box2_1);
        _this.boxGroup.addChild(_this.Box2_2);
        _this.boxGroup.addChild(_this.Box2_3);
        _this.boxGroup.addChild(_this.Box2_4);

        _this.Box2 = _this.add.sprite(450, 70, 'Box1');
        _this.Box2.alpha = 0;
        if (_this.objectCutting[0] == 1) {
            _this.lastObject = _this.add.image(550, 230, 'potato_2');//130,190//30,70==100,120
            // _this.lastObject.scale.setTo(0.8, 0.8);
            _this.horizontal_arrow.destroy();
            _this.lastObject.alpha = 0;
        }
        if (_this.objectCutting[0] == 2) {
            _this.lastObject = _this.add.image(550, 210, 'potato_3');
            _this.vertical_arrow.destroy();
            _this.lastObject.alpha = 0;
        }
        _this.lastScreenCelebration();
        _this.firstTween = _this.add.tween(_this.boxGroup).to({ alpha: 0 }, 1000, 'Linear', true, 0);

        _this.firstTween.onComplete.add(function () {
            _this.boxTween = _this.add.tween(_this.Box2).to({ alpha: 1 }, 500, 'Linear', true, 0);
            _this.secondTween = _this.add.tween(_this.lastObject).to({ alpha: 1 }, 500, 'Linear', true, 0);

            // _this.secondTween.onComplete.add(function () {
            //     _this.time.events.add(3000, () => {
            //         _this.clearAll();
            //     });
            // });
        });
    },
    Quins_fruitAnim: function () {
        _this.boxGroup.addChild(_this.Box2_1);
        _this.boxGroup.addChild(_this.Box2_2);
        _this.boxGroup.addChild(_this.Box2_3);
        _this.boxGroup.addChild(_this.Box2_4);

        _this.Box2 = _this.add.sprite(450, 70, 'Box1');
        _this.Box2.alpha = 0;
        if (_this.objectCutting[0] == 1) {
            _this.lastObject = _this.add.image(580, 230, 'Quins_fruit_2');//130,190//30,70==100,120
            // _this.lastObject.scale.setTo(0.8, 0.8);
            _this.horizontal_arrow.destroy();
            _this.lastObject.alpha = 0;
        }
        if (_this.objectCutting[0] == 2) {
            _this.lastObject = _this.add.image(550, 210, 'Quins_fruit_3');
            _this.vertical_arrow.destroy();
            _this.lastObject.alpha = 0;
        }
        _this.lastScreenCelebration();
        _this.firstTween = _this.add.tween(_this.boxGroup).to({ alpha: 0 }, 1000, 'Linear', true, 0);

        _this.firstTween.onComplete.add(function () {
            _this.boxTween = _this.add.tween(_this.Box2).to({ alpha: 1 }, 500, 'Linear', true, 0);
            _this.secondTween = _this.add.tween(_this.lastObject).to({ alpha: 1 }, 500, 'Linear', true, 0);

            // _this.secondTween.onComplete.add(function () {
            //     _this.time.events.add(3000, () => {
            //         _this.clearAll();
            //     });
            // });
        });
    },
    tomatoAnim: function () {
        _this.boxGroup.addChild(_this.Box2_1);
        _this.boxGroup.addChild(_this.Box2_2);
        _this.boxGroup.addChild(_this.Box2_3);
        _this.boxGroup.addChild(_this.Box2_4);

        _this.Box2 = _this.add.sprite(450, 70, 'Box1');
        _this.Box2.alpha = 0;
        if (_this.objectCutting[0] == 1) {
            _this.lastObject = _this.add.image(520, 210, 'tomato_2');//130,190//30,70==100,120
            _this.lastObject.scale.setTo(0.8, 0.8);
            _this.horizontal_arrow.destroy();
            _this.lastObject.alpha = 0;
        }
        if (_this.objectCutting[0] == 2) {
            _this.lastObject = _this.add.image(560, 190, 'tomato_3');
            _this.vertical_arrow.destroy();
            _this.lastObject.alpha = 0;
        }
        _this.lastScreenCelebration();
        _this.firstTween = _this.add.tween(_this.boxGroup).to({ alpha: 0 }, 1000, 'Linear', true, 0);

        _this.firstTween.onComplete.add(function () {
            _this.boxTween = _this.add.tween(_this.Box2).to({ alpha: 1 }, 500, 'Linear', true, 0);
            _this.secondTween = _this.add.tween(_this.lastObject).to({ alpha: 1 }, 500, 'Linear', true, 0);

            // _this.secondTween.onComplete.add(function () {
            //     _this.time.events.add(3000, () => {
            //         _this.clearAll();
            //     });
            // });
        });

    },

    lastScreenCelebration: function () {
        _this.noofAttempts++;

        telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);
        _this.microConcepts = "GeometryG7";
        _this.celebrationSound.play();
        _this.starActions();
        _this.pauseVoice();
        _this.speakerbtn.inputEnabled = false;
        _this.time.events.add(4000, () => {
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


    changeFrame1: function () {
        _this.Box2_1.frame = 1;
        _this.Box2_2.frame = 0;
        _this.Box2_3.frame = 0;
        _this.Box2_4.frame = 0;

        _this.selectedBox1 = true;
        _this.selectedBox2 = false;
        _this.selectedBox3 = false;
        _this.selectedBox4 = false;
    },
    changeFrame2: function () {
        _this.Box2_2.frame = 1;
        _this.Box2_1.frame = 0;
        _this.Box2_3.frame = 0;
        _this.Box2_4.frame = 0;

        _this.selectedBox2 = true;
        _this.selectedBox1 = false;
        _this.selectedBox3 = false;
        _this.selectedBox4 = false;
    },
    changeFrame3: function () {
        _this.Box2_3.frame = 1;
        _this.Box2_1.frame = 0;
        _this.Box2_2.frame = 0;
        _this.Box2_4.frame = 0;

        _this.selectedBox3 = true;
        _this.selectedBox1 = false;
        _this.selectedBox2 = false;
        _this.selectedBox4 = false;
    },
    changeFrame4: function () {
        _this.Box2_4.frame = 1;
        _this.Box2_1.frame = 0;
        _this.Box2_2.frame = 0;
        _this.Box2_3.frame = 0;

        _this.selectedBox4 = true;
        _this.selectedBox1 = false;
        _this.selectedBox2 = false;
        _this.selectedBox3 = false;
    },



    //applying the style to the text in the answerbox.
    applyingStyle: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#FFFFFF'; //white color
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '22px';
    },
    applyingWhite: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#FFFFFF'; //white color
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '24px';
    },
    applyingStyle1: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#32CD32'; //green color
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '26px';
    },
    applyingStyle2: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#E0115F'; //pink color
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '26px';
    },
    plusSignBlue: function (x, y) {
        console.log("plusSignBlue");
        _this.pSign1 = _this.add.graphics();
        _this.pSign1.lineStyle(4, 0x65B4C3);
        _this.pSign1.moveTo(x, y);
        _this.pSign1.lineTo(x + 12, y);
    },

    applyingStyleBlue: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '30px';
    },
    //clearing the screen (seconf scene).
    clearAll: function () {
        _this.Box2_1.destroy();
        _this.Box2_2.destroy();
        _this.Box2_3.destroy();
        _this.Box2_4.destroy();
        _this.Box2.destroy();
        _this.boxGroup.destroy();
        _this.Box1.destroy();
        _this.lastObject.destroy();

        switch (_this.objectArray[_this.count1]) {
            case 'beetroot': _this.beetroot_1.destroy();
                break;
            case 'bread': _this.bread_1.destroy();
                break;
            case 'star_fruit': _this.star_fruit_1.destroy();
                break;
            case 'bringle': _this.bringle_1.destroy();
                break;
            case 'butter_fruit': _this.butter_fruit_1.destroy();
                break;
            case 'cucumber': _this.cucumber_1.destroy();
                break;
            case 'Kiwi_fruit': _this.Kiwi_fruit_1.destroy();
                break;
            case 'onion': _this.onion_1.destroy();
                break;
            case 'Orange': _this.Orange_1.destroy();
                break;
            case 'potato': _this.potato_1.destroy();
                break;
            case 'Quins_fruit': _this.Quins_fruit_1.destroy();
                break;
            case 'tomato': _this.tomato_1.destroy();
                break;
        }

        _this.count1++;
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
            //console.log("removing the demo audio1");
            _this.demoAudio2.pause();
            _this.demoAudio2 = null;
            _this.demoAudio2src = null;
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
        _this.demoAudio1 = document.createElement('audio');
        _this.demoAudio1src = document.createElement('source');
        _this.demoAudio1src.setAttribute("src", window.baseUrl + "questionSounds/INT-DL3-G7/" + _this.languageSelected + "/V1.mp3");
        _this.demoAudio1.appendChild(_this.demoAudio1src);

        _this.demoAudio2 = document.createElement('audio');
        _this.demoAudio2src = document.createElement('source');
        _this.demoAudio2src.setAttribute("src", window.baseUrl + "questionSounds/INT-DL3-G7/" + _this.languageSelected + "/V2.mp3");
        _this.demoAudio2.appendChild(_this.demoAudio2src);

        // QUESTION AUDIOS
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/INT-DL3-G7/" +
            _this.languageSelected + "/V1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        _this.video_playing = 0;
        _this.showDemoVideo();  //* call the function to show the video


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

            _this.game.paused = false;  //* restart the game
        });
    },
    showDemoVideo: function () {


        // _this.demoVideo_1 = _this.add.video('ML2_1');
        // _this.demoVideo_1.play(false);
        // _this.demoVideo_1.changeSource("demoVideos/ML2-G7_1.mp4");
        // _this.video_playing = 1;
        // _this.videoWorld_1 = _this.demoVideo_1.addToWorld();

        // //* play the demo audio1 after 4 sec delay
        // _this.demoAudio1Timer = setTimeout(function ()    //* demoAudio1 js timer to play demoAudio1Timer after 4 seconds.
        // {
        //     console.log("inside demoAudio1sound.....")
        //     _this.demoVideo_1.playbackRate = 0;     //* pausing the video after 4sec
        //     clearTimeout(_this.demoAudio1Timer);         //* clear the time once its used.
        //     _this.demoAudio1.play();
        // }, 4000);

        // _this.demoVideo1PauseTimer = setTimeout(function () {
        //     console.log("inside demoAudio1sound.....")
        //     _this.demoVideo_1.playbackRate = 1;  //* resuming the video after 9 sec
        //     clearTimeout(_this.demoVideo1PauseTimer);
        // }, 9000);

        // _this.q1Timer = setTimeout(function ()    //* q1 js timer to play q1 after 11 seconds.
        // {
        //     console.log("inside q1sound.....")
        //     clearTimeout(_this.q1Timer);         //* clear the time once its used.
        //     _this.q1Sound.play();
        // }, 11000);

        // _this.demoAudio2Timer = setTimeout(function ()    //* demo audio2 js timer to play demo audio2 after 10 seconds.
        // {
        //     console.log("inside demoau2sound.....")
        //     clearTimeout(_this.demoAudio2Timer);         //* clear the time once its used.
        //     _this.demoAudio2.play();
        // }, 19000);

        // _this.q2Timer = setTimeout(function ()    //* q2 js timer to play q2 after 15 seconds.
        // {
        //     console.log("inside q2sound.....")
        //     clearTimeout(_this.q2Timer);         //* clear the time once its used.
        //     _this.q2Sound.play();
        // }, 24000);

        // _this.demoVideo_1.onComplete.add(function () {
        //     console.log("audio2 ended - pause video1");
        //     _this.demoVideo_2 = _this.add.video('ML2_2');
        //     _this.demoVideo_2.play(false);
        //     _this.demoVideo_2.changeSource("demoVideos/ML2-G7_2.mp4");  //* phaser needs this.to run in mobile
        //     _this.video_playing = 2;
        //     _this.videoWorld_2 = _this.demoVideo_2.addToWorld();

        //     _this.skip.bringToTop();
        //     _this.q3Sound.play();
        //     _this.demoVideo_2.onComplete.add(function () {
        //         console.log("demovideo 2 completed......!!!1")
        //         _this.stopAudio();
        //         _this.demoVideo_2.stop(false);
        //         _this.demoVideo_1.stop(false);
        //         _this.videoWorld_1.destroy();
        //         _this.videoWorld_2.destroy();
        //         _this.game.paused = false;

        //     });
        // });
    }
}