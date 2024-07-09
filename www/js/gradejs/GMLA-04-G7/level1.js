Game.GMLA_04_G7level1 = function () { };


Game.GMLA_04_G7level1.prototype =
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

        // _this.wrongans = document.createElement('audio');
        // _this.wronganssrc = document.createElement('source');
        // _this.wronganssrc.setAttribute("src", window.baseUrl + "sounds/WrongCelebrationSound.mp3");
        // _this.wrongans.appendChild(_this.wronganssrc);

        _this.wrongSound = document.createElement('audio');
        _this.wrongSoundsrc = document.createElement('source');
        _this.wrongSoundsrc.setAttribute("src", window.baseUrl + "sounds/WrongCelebrationSound.mp3");
        _this.wrongSound.appendChild(_this.wrongSoundsrc);

        _this.snapSound = document.createElement('audio');
        _this.snapSoundsrc = document.createElement('source');
        _this.snapSoundsrc.setAttribute("src", window.baseUrl + "sounds/snapSound.mp3");
        _this.snapSound.appendChild(_this.snapSoundsrc);

        _this.framechange = document.createElement('audio');
        _this.framechangesrc = document.createElement('source');
        _this.framechangesrc.setAttribute("src", window.baseUrl + "sounds/Frame_change_sound.mp3");
        _this.framechange.appendChild(_this.framechangesrc);

        _this.Ask_Question1 = _this.createAudio("GMLA_04_G7_a1");
        _this.Ask_Question2 = _this.createAudio("GMLA_04_G7_a2");
        _this.Ask_Question3 = _this.createAudio("GMLA_04_G7_a5");
        _this.Ask_Question4 = _this.createAudio("GMLA_04_G7_a6");
        _this.Ask_Question5 = _this.createAudio("GMLA_04_G7_a4");
        _this.Ask_Question6 = _this.createAudio("GMLA_04_G7_a9");
        _this.Ask_Question7 = _this.createAudio("GMLA_04_G7_a8");
        _this.Ask_Question8 = _this.createAudio("GMLA_04_G7_a10");
        _this.Ask_Question9 = _this.createAudio("GMLA_04_G7_a11");
        _this.Ask_Question10 = _this.createAudio("GMLA_04_G7_a12");
        _this.Ask_Question11 = _this.createAudio("GMLA_04_G7_a13");
        _this.Ask_Question12 = _this.createAudio("GMLA_04_G7_a3");

        _this.Ask_Question13 = _this.createAudio("GMLA_04_G7_h1");
        // _this.Ask_Question14 = _this.createAudio("HV2");
        _this.Ask_Question15 = _this.createAudio("GMLA_04_G7_h1");
        _this.Ask_Question16 = _this.createAudio("GMLA_04_G7_h1");

        telInitializer.gameIdInit("GMLA_04_G7", gradeSelected);
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
        _this.line = 0;
        _this.wrong = 0;

        _this.numberOfQuestions = 0;
        _this.rightbtnFlag = 0;

        _this.allMapsGroup = _this.add.group();   //to store 16 maps for first scene
        _this.allCircleGroup = _this.add.group();

        _this.allMapsGroupSecond = _this.add.group();   //to store first map for second scene
        _this.allCircleGroupSecond = _this.add.group();

        _this.allMapsGroupThird = _this.add.group();   //to store 16 maps for third scene i.e zoomed one
        _this.allCircleGroupThird = _this.add.group();

        _this.allMapsGroupFourth = _this.add.group();  //to store 16 maps of slanted lines for part B

        _this.numbers = _this.add.group();


        _this.color_flag = 0;

        _this.counterForTimer = 0;


        _this.arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];


        //values for Part A questions for 16 scenes
        //x and y position for first screen map
        _this.redCircle_x = [322, 550, 400, 60, 260, 455, 440, 570, 620, 200, 590, 320, 665, 440, 605, 155];
        _this.redCircle_y = [148, 240, 150, 370, 290, 110, 170, 330, 335, 110, 190, 305, 290, 320, 310, 80];

        _this.redCircle_scalex = [0.8, 0.8, 0.8, 0.8, 1.2, 1.1, 1.4, 0.9, 0.7, 1, 0.75, 1.1, 0.7, 1.1, 0.6, 0.8];
        _this.redCircle_scaley = [0.9, 0.9, 0.9, 0.9, 1.3, 1.1, 1.4, 0.9, 0.7, 1.1, 0.75, 1.1, 0.7, 1.1, 0.6, 0.9];

        //x and y position for second screen map
        _this.redCircle2_x = [365, 450, 400, 90, 310, 440, 450, 450, 380, 310, 420, 385, 400, 380, 350, 280];
        _this.redCircle2_y = [160, 160, 160, 180, 190, 150, 160, 120, 120, 100, 110, 110, 120, 165, 160, 80];

        _this.line1_x = [410, 33, 535, 30, 33, 475, 510, 745, 850, 365, 720, 550, 700, 280, 315, 330];
        _this.line1_y = [72, 220, 135, 245, 240, 77, 72, 210, 210, 70, 180, 72, 180, 164, 145, 155];
        _this.line1_angle = [0, -90, 36, -45, -90, -33, 0, 90, 90, 0, 90, 0, 90, -70, -60, -60];

        _this.line3_x = [510, 605, 685, 60, 450, 340, 605, 745, 700, 475, 490, 445, 520, 495, 465, 220];
        _this.line3_y = [72, 72, 140, 105, 72, 77, 72, 270, 90, 70, 80, 72, 72, 72, 72, 225];
        _this.line3_angle = [0, 0, 36, -45, 0, -33, 0, 90, 57, 0, -14, 0, 0, 0, 0, -60];

        _this.line2_x = [190, 33, 385, 70, 33, 300, 60, 460, 40, 180, 145, 250, 305, 300, 300, 165];
        _this.line2_y = [72, 350, 145, 460, 380, 470, 305, 115, 280, 425, 305, 370, 300, 305, 285, 365];
        _this.line2_angle = [38.4, 0, 54, -45, 0, -33, 0, 36, 0, -39, 0, -28, 0, 21, 29.5, -30];

        _this.line1_scalex = [3.5, 3.2, 3.6, 2.9, 3.5, 2.9, 3.4, 3.6, 4.4, 2.8, 3.6, 3.5, 3.2, 3.6, 3.4, 4.2];
        _this.line1_scaley = [2.2, 3.7, 2.3, 1.8, 3.2, 2.2, 2.2, 2.8, 4.1, 2.15, 2.9, 2.2, 2.9, 2, 2, 1.8];

        _this.line2_scalex = [1.8, 1.9, 1.2, 1.3, 1.68, 1.7, 2.1, 1.2, 2.1, 1.4, 1.5, 1.2, 1.05, 1, 1, 1.2];
        _this.line2_scaley = [3.9, 3.2, 3.6, 3, 3.5, 3.3, 4.8, 3.4, 4.4, 3.3, 4.2, 3.3, 3, 3.8, 3.6, 3.6];

        _this.line3_scalex = [3.5, 3.3, 3.6, 2.9, 3.2, 2.9, 3.4, 3.7, 2.9, 2.8, 3.6, 3.5, 2.7, 3.6, 3.4, 4.6];
        _this.line3_scaley = [2.2, 2.2, 2.3, 2.2, 2, 2.4, 2.2, 2.8, 2.7, 2.15, 2.2, 2.2, 2.1, 2.2, 2.2, 1.8];

        _this.line11_scalex = [2, 2.3, 3, 1.5, 2.2, 1.5, 2, 2.5, 2.9, 1.6, 2.5, 2.3, 1.7, 2.1, 2.1, 2.6];
        _this.line11_scaley = [2.2, 3.7, 2.3, 1.8, 3.2, 2.2, 2.2, 2.8, 4.1, 2.15, 2.9, 2.2, 2, 2, 2, 1.8];

        _this.line22_scalex = [1.8, 1.9, 1.2, 1.3, 1.68, 1.7, 2.1, 1.2, 2.1, 1.4, 1.5, 1.2, 1.05, 1, 1, 1.2];
        _this.line22_scaley = [2.5, 2.3, 3, 1.3, 2.3, 2, 3.4, 2.3, 3.4, 2, 3, 2, 1.7, 2.2, 2.2, 1.9];


        _this.line33_scalex = [2, 2, 3, 1.5, 2.6, 1.5, 2, 2.5, 2, 1.6, 2.1, 2.3, 1.1, 2.1, 2.1, 2.6];
        _this.line33_scaley = [2.2, 2.2, 2.3, 2.2, 2, 2.4, 2.2, 2.8, 2.7, 2.15, 2.2, 2.2, 2.1, 2.2, 2.2, 1.8];

        //numbers for second screen map
        _this.numberOne_x = [533, 628, 558, 153, 479, 609, 629, 723, 393, 493, 578, 573, 539, 463, 435, 312];
        _this.numberOne_y = [313, 368, 348, 392, 398, 223, 263, 287, 302, 122, 328, 152, 313, 183, 162, 292];

        _this.numberTwo_x = [530, 575, 528, 119, 418, 634, 629, 653, 314, 499, 524, 573, 489, 519, 493, 271];
        _this.numberTwo_y = [372, 368, 392, 353, 398, 268, 329, 287, 302, 187, 327, 212, 313, 197, 193, 262];

        _this.numberThree_x = [488, 629, 524, 191, 479, 569, 575, 683, 468, 443, 569, 519, 538, 464, 436, 353];
        _this.numberThree_y = [278, 319, 292, 357, 338, 253, 264, 242, 247, 162, 267, 178, 263, 238, 227, 259];

        _this.numberFour_x = [483, 573, 483, 153, 418, 598, 574, 607, 388, 448, 508, 518, 489, 520, 488, 318];
        _this.numberFour_y = [342, 318, 343, 322, 339, 293, 329, 242, 246, 217, 267, 242, 263, 260, 256, 232];

        _this.numberFive_x = [428, 628, 484, 238, 479, 514, 532, 643, 513, 383, 554, 474, 539, 464, 436, 428];
        _this.numberFive_y = [228, 223, 238, 302, 248, 289, 264, 218, 228, 217, 197, 208, 193, 333, 322, 222];

        _this.numberSix_x = [428, 573, 448, 203, 418, 538, 532, 563, 433, 388, 489, 473, 489, 518, 488, 385];
        _this.numberSix_y = [285, 223, 291, 273, 248, 328, 328, 218, 222, 272, 198, 266, 193, 353, 357, 192];

        _this.numberSeven_x = [382, 630, 446, 274, 479, 471, 480, 588, 564, 334, 544, 419, 539, 465, 437, 476];
        _this.numberSeven_y = [188, 172, 194, 267, 187, 314, 264, 174, 178, 242, 142, 237, 143, 392, 392, 192];

        _this.numberEight_x = [380, 574, 409, 239, 418, 499, 480, 518, 494, 334, 479, 418, 489, 519, 489, 436];
        _this.numberEight_y = [252, 174, 248, 233, 188, 354, 329, 179, 177, 313, 142, 293, 143, 410, 417, 162];




        //blue circle for second screen map
        _this.numberCircleOne_x = [525, 620, 550, 145, 470, 600, 620, 715, 385, 485, 570, 565, 530, 455, 427, 305];
        _this.numberCircleOne_y = [310, 365, 345, 390, 395, 220, 260, 285, 300, 120, 325, 150, 310, 180, 160, 290];

        _this.numberCircleTwo_x = [523, 566, 519, 110, 410, 625, 620, 645, 305, 490, 515, 565, 480, 510, 485, 263];
        _this.numberCircleTwo_y = [370, 365, 390, 350, 395, 265, 325, 285, 300, 185, 325, 210, 310, 195, 190, 260];

        _this.numberCircleThree_x = [480, 621, 515, 183, 470, 560, 566, 675, 460, 435, 560, 510, 530, 455, 427, 345];
        _this.numberCircleThree_y = [275, 315, 290, 355, 335, 250, 260, 240, 245, 160, 265, 175, 260, 235, 225, 257];

        _this.numberCircleFour_x = [475, 565, 475, 145, 410, 590, 566, 600, 380, 440, 500, 510, 480, 512, 480, 310];
        _this.numberCircleFour_y = [340, 315, 340, 320, 335, 290, 325, 240, 245, 215, 265, 240, 260, 257, 253, 230];

        _this.numberCircleFive_x = [420, 620, 475, 230, 470, 505, 524, 635, 505, 375, 545, 465, 530, 455, 427, 420];
        _this.numberCircleFive_y = [224, 220, 235, 300, 245, 285, 260, 215, 225, 215, 195, 205, 190, 330, 320, 220];

        _this.numberCircleSix_x = [420, 566, 440, 195, 410, 530, 524, 555, 425, 380, 480, 465, 480, 510, 480, 376];
        _this.numberCircleSix_y = [282, 220, 288, 270, 245, 325, 325, 215, 220, 270, 195, 263, 190, 351, 355, 190];

        _this.numberCircleSeven_x = [373, 621, 437, 265, 470, 462, 471, 580, 555, 325, 535, 410, 530, 455, 427, 467];
        _this.numberCircleSeven_y = [184, 170, 190, 265, 185, 310, 260, 170, 175, 240, 140, 235, 140, 390, 390, 190];

        _this.numberCircleEight_x = [371, 565, 400, 230, 410, 490, 471, 510, 485, 325, 470, 410, 480, 510, 480, 428];
        _this.numberCircleEight_y = [250, 170, 245, 230, 185, 350, 325, 175, 175, 311, 140, 290, 140, 408, 413, 160];

        //values for Part B questions for 16 scenes for X

        _this.enterTxt_x = [432, 562, 462, 171, 406, 452, 452, 611, 572, 366, 486, 462, 471, 457, 426, 397];
        _this.enterTxt_y = [245, 175, 188, 336, 176, 293, 305, 275, 162, 202, 187, 200, 179, 297, 156, 162];

        _this.one_x = [481, 561, 471, 191, 411, 551, 541, 531, 310, 435, 515, 510, 471, 451, 421, 256];
        _this.one_y = [364, 344, 324, 244, 313, 233, 300, 208, 274, 204, 304, 224, 294, 224, 364, 245];


        _this.two_x = [521, 621, 511, 226, 411, 586, 596, 611, 386, 487, 567, 567, 527, 517, 487, 307];
        _this.two_y = [404, 344, 364, 284, 368, 283, 300, 208, 278, 167, 304, 198, 294, 244, 384, 274];

        _this.three_x = [530, 621, 561, 266, 471, 631, 596, 556, 367, 487, 556, 567, 527, 517, 487, 359];
        _this.three_y = [344, 284, 324, 243, 368, 243, 243, 158, 231, 104, 248, 138, 234, 178, 324, 240];

        _this.four_x = [480, 560, 510, 225, 470, 596, 541, 480, 450, 434, 500, 510, 471, 450, 420, 304];
        _this.four_y = [304, 284, 274, 203, 312, 193, 243, 163, 233, 143, 248, 164, 234, 158, 299, 209];


        _this.parellelAngle = [132, 90, 85, 100, 90, 77, 90, 145, 30, 60, 105, 70, 90, 75, 80, 50]; //Answers stored


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

                if (_this.Question_flag == 0)
                    _this.Ask_Question1.play();

                if (_this.Question_flag == 1)
                    _this.Ask_Question2.play();

                if (_this.Question_flag == 2) {
                    if (_this.pairs[_this.count] == 1) {
                        console.log("interior");
                        _this.Ask_Question3.play();
                    }
                    if (_this.pairs[_this.count] == 2) {
                        console.log("exterior");
                        _this.Ask_Question4.play();
                    }
                    if (_this.pairs[_this.count] == 3) {
                        console.log("corresponding");
                        _this.Ask_Question5.play();
                    }
                    if (_this.pairs[_this.count] == 4) {
                        console.log("alternate interior");
                        _this.Ask_Question6.play();
                    }
                    if (_this.pairs[_this.count] == 5) {
                        console.log("alternate exterior");
                        _this.Ask_Question7.play();
                    }
                    if (_this.pairs[_this.count] == 6) {
                        console.log("same side of traversal interior");
                        _this.Ask_Question8.play();
                    }
                }

                if (_this.Question_flag == 3)
                    _this.Ask_Question9.play();

                if (_this.Question_flag == 4)
                    _this.Ask_Question10.play();

                if (_this.Question_flag == 5)
                    _this.Ask_Question11.play();

                if (_this.Question_flag == 12)
                    _this.Ask_Question12.play();

                if (_this.Question_flag == 13)
                    _this.Ask_Question13.play();

                // if (_this.Question_flag == 14)
                //     _this.Ask_Question14.play();

                if (_this.Question_flag == 15)
                    _this.Ask_Question15.play();

                if (_this.Question_flag == 16)
                    _this.Ask_Question16.play();



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
                // _this.ViewDemoVideo();

                _this.ViewHintInstruction();
            });

        });

        _this.generateStarsForTheScene(6);

        //* start the game with first question
        _this.time.events.add(1000, _this.getQuestion);
    },

    createAudio: function (src) {
        audio = document.createElement('audio');
        audiosrc = document.createElement('source');
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-04-G7/" + _this.languageSelected + "/" + src + ".mp3");
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
        _this.firstMapp();

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
        if (_this.Ask_Question13) {
            _this.Ask_Question13.pause();
            _this.Ask_Question13.currentTime = 0.0;
        }
        // if (_this.Ask_Question14) {
        //     _this.Ask_Question14.pause();
        //     _this.Ask_Question14.currentTime = 0.0;
        // }
        if (_this.Ask_Question15) {
            _this.Ask_Question15.pause();
            _this.Ask_Question15.currentTime = 0.0;
        }
        if (_this.Ask_Question16) {
            _this.Ask_Question16.pause();
            _this.Ask_Question16.currentTime = 0.0;
        }
        if (_this.q1Sound) {
            _this.q1Sound.pause();
            _this.q1Sound.currentTime = 0.0;
        }
        // if (_this.q2Sound) {
        //     _this.q2Sound.pause();
        //     _this.q2Sound.currentTime = 0.0;
        // }
        if (_this.q3Sound) {
            _this.q3Sound.pause();
            _this.q3Sound.currentTime = 0.0;
        }
        if (_this.q4Sound) {
            _this.q4Sound.pause();
            _this.q4Sound.currentTime = 0.0;
        }
    },

    Initial_randomizing: function () {
        _this.sceneCount++;
        _this.noofAttempts = 0;
        _this.AnsTimerCount = 0;
        /* 1. Interior angles
        2.  Exterior angles
        3. corresponding angles
        4. Alternate interior angles
        5. Alternate exterior angles
        6. interior on same side of traversal angles */

        _this.pairs = [1, 2, 3, 4, 5, 6];  //for 6 different types of paired angles
        _this.shuffleArray(_this.pairs);


        _this.order = [1, 2, 3, 4];   // just to randomize in 4 different ways so that same angle question or same scenes do not appear again
        _this.shuffleArray(_this.order);
        console.log(_this.order, "_this.order");

        if (_this.order[0] == 1) {
            _this.map = [1, 3, 5, 9, 11, 15];
        }
        else if (_this.order[0] == 2) {
            _this.map = [1, 3, 13, 9, 11, 15];
        }
        else if (_this.order[0] == 3) {
            _this.map = [4, 6, 7, 10, 14];
        }
        else if (_this.order[0] == 4) {
            _this.map = [2, 4, 6, 8, 10, 12, 14, 16];
        }

        // _this.map = [16];
        _this.shuffleArray(_this.map);
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

    firstMapp: function () {

        //* Adding all the 16 map to group and displaying appropriate scene with circled dot on it with correct position

        console.log("count1", _this.count1);
        console.log("map1", _this.map[_this.count1]);
        console.log((_this.map[_this.count1] - 1));
        console.log("pairs", _this.pairs);

        console.log(" _this.Ask_Question1");
        if (_this.count1 == 0)
            _this.Ask_Question1.play();

        _this.map_1 = _this.add.image(80, 80, 'scene1.0');
        _this.map_1.name = "scene1.0";
        _this.allMapsGroup.addChild(_this.map_1);

        _this.map_2 = _this.add.image(80, 80, 'scene1.0');
        _this.map_2.name = "scene1.0";
        _this.allMapsGroup.addChild(_this.map_2);

        _this.map_3 = _this.add.image(80, 80, 'scene2.0');
        _this.map_3.name = "scene2.0";
        _this.allMapsGroup.addChild(_this.map_3);

        _this.map_4 = _this.add.image(80, 80, 'scene2.0');
        _this.map_4.name = "scene2.0";
        _this.allMapsGroup.addChild(_this.map_4);

        _this.map_5 = _this.add.image(80, 80, 'scene3.0');
        _this.map_5.name = "scene3.0";
        _this.allMapsGroup.addChild(_this.map_5);

        _this.map_6 = _this.add.image(80, 80, 'scene3.0');
        _this.map_6.name = "scene3.0";
        _this.allMapsGroup.addChild(_this.map_6);

        _this.map_7 = _this.add.image(80, 80, 'scene4.0');
        _this.map_7.name = "scene4.0";
        _this.allMapsGroup.addChild(_this.map_7);

        _this.map_8 = _this.add.image(80, 80, 'scene4.0');
        _this.map_8.name = "scene4.0";
        _this.allMapsGroup.addChild(_this.map_8);

        _this.map_9 = _this.add.image(80, 80, 'scene5.0');
        _this.map_9.name = "scene5.0";
        _this.allMapsGroup.addChild(_this.map_9);

        _this.map_10 = _this.add.image(80, 80, 'scene5.0');
        _this.map_10.name = "scene5.0";
        _this.allMapsGroup.addChild(_this.map_10);

        _this.map_11 = _this.add.image(80, 80, 'scene6.0');
        _this.map_11.name = "scene6.0";
        _this.allMapsGroup.addChild(_this.map_11);

        _this.map_12 = _this.add.image(80, 80, 'scene6.0');
        _this.map_12.name = "scene6.0";
        _this.allMapsGroup.addChild(_this.map_12);

        _this.map_13 = _this.add.image(80, 80, 'scene7.0');
        _this.map_13.name = "scene7.0";
        _this.allMapsGroup.addChild(_this.map_13);

        _this.map_14 = _this.add.image(80, 80, 'scene7.0');
        _this.map_14.name = "scene7.0";
        _this.allMapsGroup.addChild(_this.map_14);

        _this.map_15 = _this.add.image(80, 80, 'scene8.0');
        _this.map_15.name = "scene8.0";
        _this.allMapsGroup.addChild(_this.map_15);

        _this.map_16 = _this.add.image(80, 80, 'scene8.0');
        _this.map_16.name = "scene8.0";
        _this.allMapsGroup.addChild(_this.map_16);



        _this.firstMap = _this.allMapsGroup.getChildAt(_this.map[_this.count1] - 1).name;  //get the correct scene 
        _this.mapShow0 = _this.add.image(40, 80, _this.firstMap);
        _this.mapShow0.scale.setTo(2.2, 2.2);

        _this.circleShow = _this.add.image(_this.redCircle_x[_this.map[_this.count1] - 1], _this.redCircle_y[_this.map[_this.count1] - 1], 'Red Circle_3');
        _this.circleShow.scale.setTo(_this.redCircle_scalex[_this.map[_this.count1] - 1], _this.redCircle_scaley[_this.map[_this.count1] - 1]);
        _this.circleShow.inputEnabled = true;
        _this.circleShow.input.useHandCursor = true;
        _this.circleShow.events.onInputDown.add(_this.destroyFirst); //click on dotted circle to go to zoomed version
    },

    destroyFirst: function () {
        _this.circleShow.inputEnabled = false;
        _this.time.events.add(500, () => {
            console.log("///////////////++++++++++");
            _this.DestoryFirstScreenObj(); //destroy dotted circle of first screen

            _this.alphatween = _this.add.tween(_this.mapShow0).to({ alpha: 0 }, 2500, Phaser.Easing.Linear.None, true); //tween to make is blurred image
            if ((_this.map[_this.count1] - 1) == 0)  //since scene 1 has extra in between image to be displayed go to second map
                _this.secondMap();
            else
                _this.thirdMap(); //all other scenes navigate to third map

        });

    },

    secondMap: function () {

        //add map 2 for scene 1 and dotted circle
        _this.map_1 = _this.add.image(80, 80, 'scene1.1');

        _this.circle_1 = _this.add.image(180, 180, 'Red Circle_2');
        _this.map_1.name = "scene1.1";
        _this.circle_1.name = "Red Circle_2";
        _this.allMapsGroupSecond.addChild(_this.map_1);
        _this.allCircleGroupSecond.addChild(_this.circle_1);


        _this.firstMap = _this.allMapsGroupSecond.getChildAt(0).name;
        _this.mapShow = _this.add.image(40, 80, _this.firstMap);
        _this.mapShow.scale.setTo(0.2, 0.2);
        _this.circleShow = _this.add.image(_this.redCircle2_x[_this.map[_this.count1] - 1], _this.redCircle2_y[_this.map[_this.count1] - 1], 'Red Circle_2');
        _this.circleShow.scale.setTo(0.1, 0.1);

        //tween map and dotted circle from the first map dotted circle position
        _this.tween1 = _this.add.tween(_this.mapShow).from({ x: _this.redCircle_x[_this.map[_this.count1] - 1], y: _this.redCircle_y[_this.map[_this.count1] - 1] }, 2000, Phaser.Easing.Linear.None, true);
        _this.tween = _this.add.tween(_this.circleShow).from({ x: _this.redCircle_x[_this.map[_this.count1] - 1], y: _this.redCircle_y[_this.map[_this.count1] - 1] }, 2000, Phaser.Easing.Linear.None, true);

        //tween map and dotted circle from the first map dotted circle to incresed sacle size
        _this.zoomTween1 = _this.add.tween(_this.mapShow.scale).to({ x: 2.2, y: 2.2 }, 2000, Phaser.Easing.Linear.None, true);
        _this.zoomTween2 = _this.add.tween(_this.circleShow.scale).to({ x: 0.5, y: 0.6 }, 2000, Phaser.Easing.Linear.None, true);

        _this.zoomTween1.onComplete.add(function () {
            _this.allMapsGroup.destroy();  //destroy old map
            _this.mapShow0.destroy();
            _this.circleShow.inputEnabled = true;
            _this.circleShow.input.useHandCursor = true;
            _this.circleShow.events.onInputDown.add(_this.destroySecond); //on click on dotted circle destroy map and go to third scene
        });



    },

    destroySecond: function () {
        _this.time.events.add(500, () => {
            console.log("///////////////++++++++++");
            _this.DestorySecondScreenObj(); //destrroy second map objects
            _this.thirdMap();

        });
    },

    thirdMap: function () {
        _this.Question_flag = 1;
        console.log(" _this.Ask_Question2");
        if (_this.count1 == 0)
            _this.Ask_Question2.play();

        _this.map_11 = _this.add.image(80, 80, 'scene1.2');
        _this.map_11.name = "scene1.2";
        _this.allMapsGroupThird.addChild(_this.map_11);

        _this.map_12 = _this.add.image(80, 80, 'scene1.3');
        _this.map_12.name = "scene1.3";
        _this.allMapsGroupThird.addChild(_this.map_12);

        _this.map_21 = _this.add.image(80, 80, 'scene2.1');
        _this.map_21.name = "scene2.1";
        _this.allMapsGroupThird.addChild(_this.map_21);

        _this.map_22 = _this.add.image(80, 80, 'scene2.2');
        _this.map_22.name = "scene2.2";
        _this.allMapsGroupThird.addChild(_this.map_22);

        _this.map_31 = _this.add.image(80, 80, 'scene3.1');
        _this.map_31.name = "scene3.1";
        _this.allMapsGroupThird.addChild(_this.map_31);

        _this.map_32 = _this.add.image(80, 80, 'scene3.2');
        _this.map_32.name = "scene3.2";
        _this.allMapsGroupThird.addChild(_this.map_32);

        _this.map_41 = _this.add.image(80, 80, 'scene4.1');
        _this.map_41.name = "scene4.1";
        _this.allMapsGroupThird.addChild(_this.map_41);

        _this.map_42 = _this.add.image(80, 80, 'scene4.2');
        _this.map_42.name = "scene4.2";
        _this.allMapsGroupThird.addChild(_this.map_42);

        _this.map_51 = _this.add.image(80, 80, 'scene5.1');
        _this.map_51.name = "scene5.1";
        _this.allMapsGroupThird.addChild(_this.map_51);

        _this.map_52 = _this.add.image(80, 80, 'scene5.2');
        _this.map_52.name = "scene5.2";
        _this.allMapsGroupThird.addChild(_this.map_52);

        _this.map_61 = _this.add.image(80, 80, 'scene6.1');
        _this.map_61.name = "scene6.1";
        _this.allMapsGroupThird.addChild(_this.map_61);

        _this.map_62 = _this.add.image(80, 80, 'scene6.2');
        _this.map_62.name = "scene6.2";
        _this.allMapsGroupThird.addChild(_this.map_62);

        _this.map_71 = _this.add.image(80, 80, 'scene7.1');
        _this.map_71.name = "scene7.1";
        _this.allMapsGroupThird.addChild(_this.map_71);

        _this.map_72 = _this.add.image(80, 80, 'scene7.2');
        _this.map_72.name = "scene7.2";
        _this.allMapsGroupThird.addChild(_this.map_72);

        _this.map_81 = _this.add.image(80, 80, 'scene8.1');
        _this.map_81.name = "scene8.1";
        _this.allMapsGroupThird.addChild(_this.map_81);

        _this.map_82 = _this.add.image(80, 80, 'scene8.2');
        _this.map_82.name = "scene8.2";
        _this.allMapsGroupThird.addChild(_this.map_82);


        _this.firstMap = _this.allMapsGroupThird.getChildAt(_this.map[_this.count1] - 1).name;
        _this.mapShow = _this.add.image(40, 80, _this.firstMap);
        _this.circleShow = _this.add.image(_this.redCircle2_x[_this.map[_this.count1] - 1], _this.redCircle2_y[_this.map[_this.count1] - 1], 'Red Circle_2');

        if ((_this.map[_this.count1] - 1) != 0) {
            _this.mapShow.scale.setTo(0.2, 0.2);
            _this.circleShow.scale.setTo(0.1, 0.1);

            //tween map and dotted circle from the first map dotted circle position
            _this.tween = _this.add.tween(_this.mapShow).from({ x: _this.redCircle_x[_this.map[_this.count1] - 1], y: _this.redCircle_y[_this.map[_this.count1] - 1] }, 2000, Phaser.Easing.Linear.None, true);
            _this.tween1 = _this.add.tween(_this.circleShow).from({ x: _this.redCircle_x[_this.map[_this.count1] - 1], y: _this.redCircle_y[_this.map[_this.count1] - 1] }, 2000, Phaser.Easing.Linear.None, true);

            if (_this.map[_this.count1] == 7) //since scene 7 image size is different scale is added
                _this.zoomTween1 = _this.add.tween(_this.mapShow.scale).to({ x: 2.7, y: 2.6 }, 2000, Phaser.Easing.Linear.None, true);
            else if (_this.map[_this.count1] == 8)  //since scene 8 image size is different scale is added
                _this.zoomTween1 = _this.add.tween(_this.mapShow.scale).to({ x: 3.25, y: 2.75 }, 2000, Phaser.Easing.Linear.None, true);
            else      //for all other image size is  scale is same
                _this.zoomTween1 = _this.add.tween(_this.mapShow.scale).to({ x: 2.2, y: 2.2 }, 2000, Phaser.Easing.Linear.None, true);


            _this.zoomTween2 = _this.add.tween(_this.circleShow.scale).to({ x: 0.5, y: 0.6 }, 2000, Phaser.Easing.Linear.None, true);

            _this.zoomTween1.onComplete.add(function () {
                _this.allMapsGroup.destroy();
                _this.mapShow0.destroy();    //destroy first map objects
            });
        }
        else {
            _this.mapShow.scale.setTo(2.2, 2.2);
            _this.circleShow.scale.setTo(0.5, 0.6);
        }

        _this.line2 = _this.add.image(_this.line2_x[_this.map[_this.count1] - 1], _this.line2_y[_this.map[_this.count1] - 1], 'line4');
        _this.line2.scale.setTo(_this.line2_scalex[_this.map[_this.count1] - 1], _this.line2_scaley[_this.map[_this.count1] - 1]);
        _this.line2.angle = _this.line2_angle[_this.map[_this.count1] - 1];
        _this.line2.alpha = 0;

        _this.line1 = _this.add.image(_this.line1_x[_this.map[_this.count1] - 1], _this.line1_y[_this.map[_this.count1] - 1], 'line1');
        _this.line1.scale.setTo(_this.line1_scalex[_this.map[_this.count1] - 1], _this.line1_scaley[_this.map[_this.count1] - 1]);
        _this.line1.angle = _this.line1_angle[_this.map[_this.count1] - 1];
        _this.line1.inputEnabled = true;
        _this.line1.input.useHandCursor = true;
        _this.line1.alpha = 0;
        _this.line1.events.onInputDown.add(_this.displayL1);


        _this.line3 = _this.add.image(_this.line3_x[_this.map[_this.count1] - 1], _this.line3_y[_this.map[_this.count1] - 1], 'line1');
        _this.line3.scale.setTo(_this.line3_scalex[_this.map[_this.count1] - 1], _this.line3_scaley[_this.map[_this.count1] - 1]);
        _this.line3.angle = _this.line3_angle[_this.map[_this.count1] - 1];
        _this.line3.alpha = 0;

        //since parallel lines must be selected first and then the travsersal
        if (_this.map[_this.count1] == 1 || _this.map[_this.count1] == 3 || _this.map[_this.count1] == 4 || _this.map[_this.count1] == 6 || _this.map[_this.count1] == 7 || _this.map[_this.count1] == 8 || _this.map[_this.count1] == 10 || _this.map[_this.count1] == 12 || _this.map[_this.count1] == 16) {
            _this.line3.inputEnabled = true;
            _this.line3.input.useHandCursor = true;
            _this.line3.events.onInputDown.add(_this.displayL3);
        }

        if (_this.map[_this.count1] == 2 || _this.map[_this.count1] == 5 || _this.map[_this.count1] == 9 || _this.map[_this.count1] == 11 || _this.map[_this.count1] == 13 || _this.map[_this.count1] == 14 || _this.map[_this.count1] == 15) {
            _this.line2.inputEnabled = true;
            _this.line2.input.useHandCursor = true;
            _this.line2.events.onInputDown.add(_this.displayL2);
        }


        _this.tick = _this.add.sprite(888, 440, 'TickBtn');
        _this.tick.scale.setTo(0.9, 1.2);
        _this.tick.frame = 1;
        _this.tick.inputEnabled = true;
        _this.tick.input.useHandCursor = true;
        _this.tick.events.onInputDown.add(_this.evaluateLines);



    },

    evaluateLines: function () {  //for selecting parallel lines

        console.log(_this.line);
        if (_this.line == 2) {  //check if 2 lines are added then proceed else wrong sound
            _this.line = 0;
            _this.noofAttempts++;
            _this.counterCelebrationSound.play();
            _this.tick.events.onInputDown.removeAll();
            _this.tick.events.onInputDown.add(_this.evaluateLines2);
            _this.Question_flag = 12;
            console.log(" _this.Ask_Question12");
            if (_this.count1 == 0)
                _this.Ask_Question12.play();

            if (_this.map[_this.count1] == 1 || _this.map[_this.count1] == 3 || _this.map[_this.count1] == 4 || _this.map[_this.count1] == 6 || _this.map[_this.count1] == 7 || _this.map[_this.count1] == 8 || _this.map[_this.count1] == 10 || _this.map[_this.count1] == 12 || _this.map[_this.count1] == 16) {
                _this.line2.inputEnabled = true;
                _this.line2.input.useHandCursor = true;
                _this.line2.events.onInputDown.add(_this.displayL2);
            }

            if (_this.map[_this.count1] == 2 || _this.map[_this.count1] == 5 || _this.map[_this.count1] == 9 || _this.map[_this.count1] == 11 || _this.map[_this.count1] == 13 || _this.map[_this.count1] == 14 || _this.map[_this.count1] == 15) {
                _this.line3.inputEnabled = true;
                _this.line3.input.useHandCursor = true;
                _this.line3.events.onInputDown.add(_this.displayL3);
            }
        }
        else {
            _this.noofAttempts++;
            _this.wrongSound.play();
        }

    },

    evaluateLines2: function () { //for selecting travsersal

        console.log(_this.line);
        if (_this.line == 1) {  //check if all 3 lines are added then proceed else wrong sound
            _this.line = 0;
            _this.noofAttempts++;
            _this.counterCelebrationSound.play();
            _this.destroyThird();
        }
        else {
            _this.noofAttempts++;
            _this.wrongSound.play();
        }
    },

    displayL1: function () {  //displaying each line when user clicks on that position
        _this.line1.scale.setTo(_this.line11_scalex[_this.map[_this.count1] - 1], _this.line11_scaley[_this.map[_this.count1] - 1]);
        _this.line1.alpha = 1;
        _this.line++;
        _this.line1.inputEnabled = false;

    },

    displayL3: function () {
        _this.line3.scale.setTo(_this.line33_scalex[_this.map[_this.count1] - 1], _this.line33_scaley[_this.map[_this.count1] - 1]);
        _this.line3.alpha = 1;
        _this.line++;
        _this.line3.inputEnabled = false;

    },

    displayL2: function () {
        _this.line2.scale.setTo(_this.line22_scalex[_this.map[_this.count1] - 1], _this.line22_scaley[_this.map[_this.count1] - 1]);
        _this.line2.alpha = 1;
        _this.line++;
        _this.line2.inputEnabled = false;

    },

    destroyThird: function () {
        _this.time.events.add(500, () => {
            console.log("///////////////++++++++++");
            _this.DestoryThirdScreenObj();  //destroy third screen objects and navigate to 4th screen
            _this.fourthMap();

        });

    },

    fourthMap: function () {

        //displaying numbers and asking for any one pair of question
        console.log(_this.pairs[_this.count]);
        _this.Question_flag = 2;
        if (_this.pairs[_this.count] == 1) {
            console.log("Interior");
            console.log(" _this.Ask_Question3");
            _this.Ask_Question3.play();
        }
        if (_this.pairs[_this.count] == 2) {
            console.log("Exterior");
            console.log(" _this.Ask_Question4");
            _this.Ask_Question4.play();
        }
        if (_this.pairs[_this.count] == 3) {
            console.log("Correspnding");
            console.log(" _this.Ask_Question5");
            _this.Ask_Question5.play();
        }
        if (_this.pairs[_this.count] == 4) {
            console.log("Alter interior");
            console.log(" _this.Ask_Question6");
            _this.Ask_Question6.play();
        }
        if (_this.pairs[_this.count] == 5) {
            console.log("Alter Exterior");
            console.log(" _this.Ask_Question7");
            _this.Ask_Question7.play();
        }
        if (_this.pairs[_this.count] == 6) {
            console.log("Same side");
            console.log(" _this.Ask_Question8");
            _this.Ask_Question8.play();
        }

        _this.numberCircleSeven = _this.add.sprite(_this.numberCircleSeven_x[_this.map[_this.count1] - 1], _this.numberCircleSeven_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleSeven.frame = 1;
        _this.numberCircleSeven.scale.setTo(0.8);
        _this.numberCircleSeven.inputEnabled = true;
        _this.numberCircleSeven.input.useHandCursor = true;
        _this.numberCircleSeven.events.onInputDown.add(_this.sevenInput);


        _this.numberCircleSix = _this.add.sprite(_this.numberCircleSix_x[_this.map[_this.count1] - 1], _this.numberCircleSix_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleSix.frame = 1;
        _this.numberCircleSix.scale.setTo(0.8);
        _this.numberCircleSix.inputEnabled = true;
        _this.numberCircleSix.input.useHandCursor = true;
        _this.numberCircleSix.events.onInputDown.add(_this.sixInput);

        _this.numberCircleFive = _this.add.sprite(_this.numberCircleFive_x[_this.map[_this.count1] - 1], _this.numberCircleFive_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleFive.frame = 1;
        _this.numberCircleFive.scale.setTo(0.8);
        _this.numberCircleFive.inputEnabled = true;
        _this.numberCircleFive.input.useHandCursor = true;
        _this.numberCircleFive.events.onInputDown.add(_this.fiveInput);


        _this.numberCircleThree = _this.add.sprite(_this.numberCircleThree_x[_this.map[_this.count1] - 1], _this.numberCircleThree_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleThree.frame = 1;
        _this.numberCircleThree.scale.setTo(0.8);
        _this.numberCircleThree.inputEnabled = true;
        _this.numberCircleThree.input.useHandCursor = true;
        _this.numberCircleThree.events.onInputDown.add(_this.threeInput);


        _this.numberCircleFour = _this.add.sprite(_this.numberCircleFour_x[_this.map[_this.count1] - 1], _this.numberCircleFour_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleFour.frame = 1;
        _this.numberCircleFour.scale.setTo(0.8);
        _this.numberCircleFour.inputEnabled = true;
        _this.numberCircleFour.input.useHandCursor = true;
        _this.numberCircleFour.events.onInputDown.add(_this.fourInput);


        _this.numberCircleEight = _this.add.sprite(_this.numberCircleEight_x[_this.map[_this.count1] - 1], _this.numberCircleEight_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleEight.frame = 1;
        _this.numberCircleEight.scale.setTo(0.8);
        _this.numberCircleEight.inputEnabled = true;
        _this.numberCircleEight.input.useHandCursor = true;
        _this.numberCircleEight.events.onInputDown.add(_this.eightInput);


        _this.numberCircleOne = _this.add.sprite(_this.numberCircleOne_x[_this.map[_this.count1] - 1], _this.numberCircleOne_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleOne.frame = 1;
        _this.numberCircleOne.scale.setTo(0.8);
        _this.numberCircleOne.inputEnabled = true;
        _this.numberCircleOne.input.useHandCursor = true;
        _this.numberCircleOne.events.onInputDown.add(_this.oneInput);

        _this.numberCircleTwo = _this.add.sprite(_this.numberCircleTwo_x[_this.map[_this.count1] - 1], _this.numberCircleTwo_y[_this.map[_this.count1] - 1], 'NumberCircle');
        _this.numberCircleTwo.frame = 1;
        _this.numberCircleTwo.scale.setTo(0.8);
        _this.numberCircleTwo.inputEnabled = true;
        _this.numberCircleTwo.input.useHandCursor = true;
        _this.numberCircleTwo.events.onInputDown.add(_this.twoInput);




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

        _this.seven = _this.add.sprite(_this.numberSeven_x[_this.map[_this.count1] - 1], _this.numberSeven_y[_this.map[_this.count1] - 1], 'Number');
        _this.seven.frame = 6;
        _this.seven.scale.setTo(0.8);

        _this.six = _this.add.sprite(_this.numberSix_x[_this.map[_this.count1] - 1], _this.numberSix_y[_this.map[_this.count1] - 1], 'Number');
        _this.six.frame = 5;
        _this.six.scale.setTo(0.8);

        _this.eight = _this.add.sprite(_this.numberEight_x[_this.map[_this.count1] - 1], _this.numberEight_y[_this.map[_this.count1] - 1], 'Number');
        _this.eight.frame = 7;
        _this.eight.scale.setTo(0.8);




        _this.tick1 = _this.add.sprite(888, 440, 'TickBtn');
        _this.tick1.scale.setTo(0.9, 1.2);
        _this.tick1.frame = 1;
        _this.tick1.inputEnabled = true;
        _this.tick1.input.useHandCursor = true;
        _this.tick1.events.onInputDown.add(_this.evaluatePairs);



    },

    evaluatePairs: function () {
        //based on which pair of angle asked evaulate

        if (_this.pairs[_this.count] == 1) {
            if (_this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0 && _this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1 && _this.numberCircleSeven.frame == 1 && _this.numberCircleSix.frame == 1 && _this.numberCircleEight.frame == 1 ||
                _this.numberCircleFour.frame == 0 && _this.numberCircleThree.frame == 0 && _this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1 && _this.numberCircleFive.frame == 1 && _this.numberCircleSeven.frame == 1 && _this.numberCircleSix.frame == 1 && _this.numberCircleEight.frame == 1 ||
                _this.numberCircleFour.frame == 0 && _this.numberCircleSix.frame == 0 && _this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1 && _this.numberCircleSeven.frame == 1 && _this.numberCircleFive.frame == 1 && _this.numberCircleEight.frame == 1 ||
                _this.numberCircleFive.frame == 0 && _this.numberCircleThree.frame == 0 && _this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1 && _this.numberCircleFour.frame == 1 && _this.numberCircleSeven.frame == 1 && _this.numberCircleSix.frame == 1 && _this.numberCircleEight.frame == 1 ||
                _this.numberCircleSix.frame == 0 && _this.numberCircleFive.frame == 0 && _this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1 && _this.numberCircleSeven.frame == 1 && _this.numberCircleFour.frame == 1 && _this.numberCircleEight.frame == 1 ||
                _this.numberCircleThree.frame == 0 && _this.numberCircleSix.frame == 0 && _this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1 && _this.numberCircleFour.frame == 1 && _this.numberCircleSeven.frame == 1 && _this.numberCircleFive.frame == 1 && _this.numberCircleEight.frame == 1
            )

                _this.correctAns();
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.frameReset();
            }
        }
        else if (_this.pairs[_this.count] == 2) {
            if (_this.numberCircleOne.frame == 0 && _this.numberCircleTwo.frame == 0 && _this.numberCircleThree.frame == 1 && _this.numberCircleFive.frame == 1 && _this.numberCircleFour.frame == 1 && _this.numberCircleSeven.frame == 1 && _this.numberCircleSix.frame == 1 && _this.numberCircleEight.frame == 1 ||
                _this.numberCircleOne.frame == 0 && _this.numberCircleSeven.frame == 0 && _this.numberCircleFour.frame == 1 && _this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1 && _this.numberCircleFive.frame == 1 && _this.numberCircleSix.frame == 1 && _this.numberCircleEight.frame == 1 ||
                _this.numberCircleOne.frame == 0 && _this.numberCircleEight.frame == 0 && _this.numberCircleFour.frame == 1 && _this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1 && _this.numberCircleSeven.frame == 1 && _this.numberCircleSix.frame == 1 && _this.numberCircleFive.frame == 1 ||
                _this.numberCircleTwo.frame == 0 && _this.numberCircleSeven.frame == 0 && _this.numberCircleOne.frame == 1 && _this.numberCircleFive.frame == 1 && _this.numberCircleThree.frame == 1 && _this.numberCircleFour.frame == 1 && _this.numberCircleSix.frame == 1 && _this.numberCircleEight.frame == 1 ||
                _this.numberCircleTwo.frame == 0 && _this.numberCircleEight.frame == 0 && _this.numberCircleOne.frame == 1 && _this.numberCircleFive.frame == 1 && _this.numberCircleThree.frame == 1 && _this.numberCircleSeven.frame == 1 && _this.numberCircleSix.frame == 1 && _this.numberCircleFour.frame == 1 ||
                _this.numberCircleSeven.frame == 0 && _this.numberCircleEight.frame == 0 && _this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1 && _this.numberCircleFour.frame == 1 && _this.numberCircleSix.frame == 1 && _this.numberCircleFive.frame == 1
            )
                _this.correctAns();
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.frameReset();
            }

        }
        else if (_this.pairs[_this.count] == 3) {
            if (_this.numberCircleOne.frame == 0 && _this.numberCircleFive.frame == 0 && _this.numberCircleFour.frame == 1 && _this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1 && _this.numberCircleSeven.frame == 1 && _this.numberCircleSix.frame == 1 && _this.numberCircleEight.frame == 1 ||
                _this.numberCircleTwo.frame == 0 && _this.numberCircleSix.frame == 0 && _this.numberCircleOne.frame == 1 && _this.numberCircleFive.frame == 1 && _this.numberCircleThree.frame == 1 && _this.numberCircleSeven.frame == 1 && _this.numberCircleFour.frame == 1 && _this.numberCircleEight.frame == 1 ||
                _this.numberCircleThree.frame == 0 && _this.numberCircleSeven.frame == 0 && _this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1 && _this.numberCircleFive.frame == 1 && _this.numberCircleFour.frame == 1 && _this.numberCircleSix.frame == 1 && _this.numberCircleEight.frame == 1 ||
                _this.numberCircleFour.frame == 0 && _this.numberCircleEight.frame == 0 && _this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1 && _this.numberCircleSeven.frame == 1 && _this.numberCircleSix.frame == 1 && _this.numberCircleFive.frame == 1
            )
                _this.correctAns();
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.frameReset();
            }

        }
        else if (_this.pairs[_this.count] == 4) {
            if (_this.numberCircleThree.frame == 0 && _this.numberCircleSix.frame == 0 && _this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1 && _this.numberCircleFive.frame == 1 && _this.numberCircleSeven.frame == 1 && _this.numberCircleFour.frame == 1 && _this.numberCircleEight.frame == 1 ||
                _this.numberCircleFour.frame == 0 && _this.numberCircleFive.frame == 0 && _this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1 && _this.numberCircleSeven.frame == 1 && _this.numberCircleSix.frame == 1 && _this.numberCircleEight.frame == 1
            )
                _this.correctAns();
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.frameReset();
            }

        }
        else if (_this.pairs[_this.count] == 5) {
            if (_this.numberCircleOne.frame == 0 && _this.numberCircleEight.frame == 0 && _this.numberCircleFive.frame == 1 && _this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1 && _this.numberCircleSeven.frame == 1 && _this.numberCircleSix.frame == 1 && _this.numberCircleFour.frame == 1 ||
                _this.numberCircleTwo.frame == 0 && _this.numberCircleSeven.frame == 0 && _this.numberCircleOne.frame == 1 && _this.numberCircleFive.frame == 1 && _this.numberCircleThree.frame == 1 && _this.numberCircleFour.frame == 1 && _this.numberCircleSix.frame == 1 && _this.numberCircleEight.frame == 1
            )
                _this.correctAns();
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.frameReset();
            }

        }
        else if (_this.pairs[_this.count] == 6) {
            if (_this.numberCircleThree.frame == 0 && _this.numberCircleFive.frame == 0 && _this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1 && _this.numberCircleFour.frame == 1 && _this.numberCircleSeven.frame == 1 && _this.numberCircleSix.frame == 1 && _this.numberCircleEight.frame == 1 ||
                _this.numberCircleFour.frame == 0 && _this.numberCircleSix.frame == 0 && _this.numberCircleOne.frame == 1 && _this.numberCircleTwo.frame == 1 && _this.numberCircleThree.frame == 1 && _this.numberCircleSeven.frame == 1 && _this.numberCircleFive.frame == 1 && _this.numberCircleEight.frame == 1
            )
                _this.correctAns();
            else {
                _this.noofAttempts++;
                _this.wrongSound.play();
                _this.frameReset();
            }

        }


    },

    correctAns: function () {
        _this.tick1.inputEnabled = false;
        _this.celebrationSound.play();
        telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);
        _this.starActions();
        _this.time.events.add(1500, () => {
            console.log("///////////////++++++++++");
            _this.DestoryFourth();
            _this.tick1.destroy();
            _this.count++;
            _this.fifthMap();

        });
    },

    fifthMap: function () {
        if (_this.tick) _this.tick.destroy();
        if (_this.tick1) _this.tick1.destroy();
        // _this.firstMap = _this.allMapsGroupSecond.getChildAt(0).name;
        // _this.mapShow = _this.add.image(30, 70, _this.firstMap);
        // _this.mapShow.scale.setTo(2.4,2);

        _this.firstMap = _this.allMapsGroupThird.getChildAt(_this.map[_this.count1] - 1).name;
        _this.mapShow = _this.add.image(40, 70, _this.firstMap);
        if (_this.map[_this.count1] == 7)
            _this.mapShow.scale.setTo(2.5, 2.5); // for scene 7
        else if (_this.map[_this.count1] == 8)
            _this.mapShow.scale.setTo(3.1, 2.7); // for scene 8
        else
            _this.mapShow.scale.setTo(2.2, 2.2);
        console.log("mapshow", _this.mapShow.scale);


        _this.tween1 = _this.add.tween(_this.mapShow).to({ alpha: 0.5 }, 2000, Phaser.Easing.Linear.None, true);

        _this.tween1.onComplete.add(function () {

            // _this.time.events.add(1500, () => {


            _this.mapShow.destroy();
            _this.bg = _this.add.image(30, 70, 'BG1');
            _this.bg.scale.setTo(2.3, 2.3);
            _this.bg.visible = false;

            _this.addMap();

            _this.mapshow_scalex = [2.4, 2.2, 2.2, 2.2, 2.2, 2.2, 2.1, 2.1, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2];
            _this.mapshow_scaley = [2.32, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1];
            _this.firstMap = _this.allMapsGroupFourth.getChildAt(_this.map[_this.count1] - 1).name;
            _this.mapShow1 = _this.add.image(30, 70, _this.firstMap);
            _this.mapShow1.scale.setTo(_this.mapshow_scalex[_this.map[_this.count1] - 1], _this.mapshow_scaley[_this.map[_this.count1] - 1]);
            _this.mapShow1.alpha = 0;
            console.log("mapshow1", _this.mapShow1.alpha);
            _this.tween1 = _this.add.tween(_this.mapShow1).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

            // _this.tween11 = _this.add.tween(_this.mapShow1).to({ alpha: 1 }, 3000, Phaser.Easing.Linear.None, true);

        });



        _this.time.events.add(5500, () => {
            // console.log("mapshow1", _this.mapShow1.alpha);

            _this.line2x = [270, 170, 265, 57, 75, 330, 350, 335, 255, 210, 270, 280, 296, 296, 296, 180];
            _this.line2y = [157, 330, 445, 428, 355, 420, 285, 225, 180, 370, 290, 330, 278, 289, 286, 180];
            _this.line2scaleX = [1.2, 1.3, 1.1, 1.1, 1.1, 1.1, 1, 0.9, 1.1, 1.1, 1.1, 1.1, 1, 1, 1, 1];
            _this.line2scaley = [1.9, 1.5, 1.4, 1.4, 1.4, 1.2, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.4];
            _this.line2angle = [40, 0, -43, -44, 0, -32, 0, 7, 3, -38, 0, -27, 0, 13, 23, 28];

            _this.line2 = _this.add.image(_this.line2x[_this.map[_this.count1] - 1], _this.line2y[_this.map[_this.count1] - 1], 'line4');
            _this.line2.scale.setTo(_this.line2scaleX[_this.map[_this.count1] - 1], _this.line2scaley[_this.map[_this.count1] - 1]);
            _this.line2.angle = _this.line2angle[_this.map[_this.count1] - 1];


            _this.line1x = [380, 660, 395, 70, 70, 475, 575, 330, 260, 375, 485, 452, 680, 670, 650, 595];
            _this.line1y = [85, 215, 170, 190, 200, 77, 64, 205, 275, 70, 70, 70, 195, 280, 310, 320];
            _this.line1scaleX = [1.5, 1.5, 1.6, 1.6, 1.6, 1.3, 1.3, 1.3, 1.5, 1.3, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4];
            _this.line1scaley = [1.9, 2.5, 1.8, 1.8, 2.2, 2, 1.8, 1.8, 2.1, 1.8, 2, 2, 2, 2, 2, 1.7];
            _this.line1angle = [-9, 93, -36, -40, -85, -34, 0, -90, -90, 11, -14, 4, 99, 110, 119, 134];

            _this.line1 = _this.add.image(_this.line1x[_this.map[_this.count1] - 1], _this.line1y[_this.map[_this.count1] - 1], 'line1');
            _this.line1.scale.setTo(_this.line1scaleX[_this.map[_this.count1] - 1], _this.line1scaley[_this.map[_this.count1] - 1]);
            _this.line1.angle = _this.line1angle[_this.map[_this.count1] - 1];


            _this.line3x = [510, 595, 655, 130, 444, 303, 530, 400, 620, 465, 650, 542, 503, 489, 456, 530];
            _this.line3y = [85, 70, 155, 160, 70, 85, 64, 78, 120, 70, 150, 70, 70, 70, 72, 135];
            _this.line3scaleX = [1.5, 1.5, 1.5, 1.5, 1.5, 1.3, 1.3, 1.3, 1.3, 1.3, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4];
            _this.line3scaley = [1.9, 1.9, 1.9, 1.9, 1.9, 2.2, 1.8, 1.8, 2, 1.8, 2, 2, 2, 2, 2, 2];
            _this.line3angle = [0, 0, 37, -46, 0, -40, 8, -50, 58, 0, 83, 0, 0, 0, 0, 61];

            _this.line3 = _this.add.image(_this.line3x[_this.map[_this.count1] - 1], _this.line3y[_this.map[_this.count1] - 1], 'line1');
            _this.line3.scale.setTo(_this.line3scaleX[_this.map[_this.count1] - 1], _this.line3scaley[_this.map[_this.count1] - 1]);
            _this.line3.angle = _this.line3angle[_this.map[_this.count1] - 1];
        });

        _this.time.events.add(7500, () => {
            _this.mapShow1.destroy();
            _this.addNumbers();
        });



        //_this.tween1 = _this.add.tween(_this.mapShow).from({x:300, y:200}, 2000, Phaser.Easing.Linear.None, true);
        // _this.zoomTween1 = _this.add.tween(_this.mapShow.scale).to({ x: 2.2, y: 2.2 }, 2000, Phaser.Easing.Linear.None, true);


    },

    addMap: function () {

        _this.map_1 = _this.add.image(60, 70, 'scene-1');
        _this.map_1.name = "scene-1";
        _this.allMapsGroupFourth.addChild(_this.map_1);

        _this.map_2 = _this.add.image(60, 70, 'scene-2');
        _this.map_2.name = "scene-2";
        _this.allMapsGroupFourth.addChild(_this.map_2);

        _this.map_3 = _this.add.image(60, 70, 'scene-3');
        _this.map_3.name = "scene-3";
        _this.allMapsGroupFourth.addChild(_this.map_3);

        _this.map_4 = _this.add.image(60, 70, 'scene-4');
        _this.map_4.name = "scene-4";
        _this.allMapsGroupFourth.addChild(_this.map_4);

        _this.map_5 = _this.add.image(60, 70, 'scene-5');
        _this.map_5.name = "scene-5";
        _this.allMapsGroupFourth.addChild(_this.map_5);

        _this.map_6 = _this.add.image(60, 70, 'scene-6');
        _this.map_6.name = "scene-6";
        _this.allMapsGroupFourth.addChild(_this.map_6);

        _this.map_7 = _this.add.image(60, 70, 'scene-7');
        _this.map_7.name = "scene-7";
        _this.allMapsGroupFourth.addChild(_this.map_7);

        _this.map_8 = _this.add.image(60, 70, 'scene-8');
        _this.map_8.name = "scene-8";
        _this.allMapsGroupFourth.addChild(_this.map_8);

        _this.map_9 = _this.add.image(60, 70, 'scene-9');
        _this.map_9.name = "scene-9";
        _this.allMapsGroupFourth.addChild(_this.map_9);

        _this.map_10 = _this.add.image(60, 70, 'scene-10');
        _this.map_10.name = "scene-10";
        _this.allMapsGroupFourth.addChild(_this.map_10);

        _this.map_11 = _this.add.image(60, 70, 'scene-11');
        _this.map_11.name = "scene-11";
        _this.allMapsGroupFourth.addChild(_this.map_11);

        _this.map_12 = _this.add.image(60, 70, 'scene-12');
        _this.map_12.name = "scene-12";
        _this.allMapsGroupFourth.addChild(_this.map_12);

        _this.map_13 = _this.add.image(60, 70, 'scene-13');
        _this.map_13.name = "scene-13";
        _this.allMapsGroupFourth.addChild(_this.map_13);

        _this.map_14 = _this.add.image(60, 70, 'scene-14');
        _this.map_14.name = "scene-14";
        _this.allMapsGroupFourth.addChild(_this.map_14);

        _this.map_15 = _this.add.image(60, 70, 'scene-15');
        _this.map_15.name = "scene-15";
        _this.allMapsGroupFourth.addChild(_this.map_15);

        _this.map_16 = _this.add.image(60, 70, 'scene-16');
        _this.map_16.name = "scene-16";
        _this.allMapsGroupFourth.addChild(_this.map_16);
    },

    addNumbers: function () {
        _this.Question_flag = 3;
        console.log(" _this.Ask_Question9");
        if (_this.count1 == 0)
            _this.Ask_Question9.play();

        _this.bg.visible = true;



        _this.numberCircle1One_x = [470, 550, 460, 180, 400, 540, 530, 520, 300, 424, 504, 499, 460, 440, 410, 245];
        _this.numberCircle1One_y = [360, 340, 320, 240, 310, 230, 297, 205, 270, 200, 300, 220, 290, 220, 360, 240];
        _this.numberCircle1One = _this.add.sprite(_this.numberCircle1One_x[_this.map[_this.count1] - 1], _this.numberCircle1One_y[_this.map[_this.count1] - 1], 'NumberCircle1');
        _this.numberCircle1One.frame = 0;
        _this.numberCircle1One.inputEnabled = true;
        _this.numberCircle1One.input.useHandCursor = true;
        _this.numberCircle1One.events.onInputDown.add(_this.oneInput1);

        _this.numberCircle1Two_x = [510, 610, 500, 215, 400, 575, 585, 600, 375, 475, 555, 555, 515, 505, 475, 295];
        _this.numberCircle1Two_y = [400, 340, 360, 280, 365, 280, 297, 205, 274, 163, 300, 195, 290, 240, 380, 270]
        _this.numberCircle1Two = _this.add.sprite(_this.numberCircle1Two_x[_this.map[_this.count1] - 1], _this.numberCircle1Two_y[_this.map[_this.count1] - 1], 'NumberCircle1');
        _this.numberCircle1Two.frame = 0;
        _this.numberCircle1Two.inputEnabled = true;
        _this.numberCircle1Two.input.useHandCursor = true;
        _this.numberCircle1Two.events.onInputDown.add(_this.twoInput1);

        _this.numberCircle1Three_x = [520, 610, 550, 255, 460, 620, 585, 545, 355, 475, 545, 555, 515, 505, 475, 350];
        _this.numberCircle1Three_y = [340, 280, 320, 240, 365, 240, 240, 155, 228, 100, 245, 135, 230, 175, 320, 235];
        _this.numberCircle1Three = _this.add.sprite(_this.numberCircle1Three_x[_this.map[_this.count1] - 1], _this.numberCircle1Three_y[_this.map[_this.count1] - 1], 'NumberCircle1');
        _this.numberCircle1Three.frame = 0;
        _this.numberCircle1Three.inputEnabled = true;
        _this.numberCircle1Three.input.useHandCursor = true;
        _this.numberCircle1Three.events.onInputDown.add(_this.threeInput1);

        _this.numberCircle1Four_x = [470, 550, 500, 215, 460, 585, 530, 470, 440, 424, 489, 499, 460, 440, 410, 295];
        _this.numberCircle1Four_y = [300, 280, 270, 200, 310, 190, 240, 160, 230, 140, 245, 160, 230, 155, 295, 205];
        _this.numberCircle1Four = _this.add.sprite(_this.numberCircle1Four_x[_this.map[_this.count1] - 1], _this.numberCircle1Four_y[_this.map[_this.count1] - 1], 'NumberCircle1');
        _this.numberCircle1Four.frame = 0;
        _this.numberCircle1Four.inputEnabled = true;
        _this.numberCircle1Four.input.useHandCursor = true;
        _this.numberCircle1Four.events.onInputDown.add(_this.fourInput1);



        _this.one = _this.add.sprite(_this.one_x[_this.map[_this.count1] - 1], _this.one_y[_this.map[_this.count1] - 1], 'Number');
        _this.one.frame = 0;
        _this.one.scale.setTo(0.8);

        _this.two = _this.add.sprite(_this.two_x[_this.map[_this.count1] - 1], _this.two_y[_this.map[_this.count1] - 1], 'Number');
        _this.two.frame = 1;
        _this.two.scale.setTo(0.8);

        _this.three = _this.add.sprite(_this.three_x[_this.map[_this.count1] - 1], _this.three_y[_this.map[_this.count1] - 1], 'Number');
        _this.three.frame = 2;
        _this.three.scale.setTo(0.8);

        _this.four = _this.add.sprite(_this.four_x[_this.map[_this.count1] - 1], _this.four_y[_this.map[_this.count1] - 1], 'Number');
        _this.four.frame = 3;
        _this.four.scale.setTo(0.8);

        _this.circle_x = [440, 570, 470, 180, 415, 460, 460, 620, 580, 375, 495, 470, 480, 465, 435, 405];
        _this.circle_y = [260, 190, 202, 350, 190, 307, 320, 290, 177, 217, 202, 215, 195, 310, 170, 177];
        _this.circle = _this.game.add.graphics(_this.circle_x[_this.map[_this.count1] - 1], _this.circle_y[_this.map[_this.count1] - 1]);
        _this.circle.beginFill(0x87CEEB);
        _this.circle.drawCircle(0, 0, 40);
        _this.circle.endFill();



        _this.enterTxt1 = _this.add.text(_this.enterTxt_x[_this.map[_this.count1] - 1], _this.enterTxt_y[_this.map[_this.count1] - 1], "X");
        _this.enterTxt1.fontSize = "25px";
        _this.enterTxt1.fill = '#ffffff';


    },

    oneInput1: function () {
        if (_this.numberCircle1One.frame == 0) {
            _this.numberCircle1One.frame = 1;
            _this.time.events.add(1500, () => {
                _this.numberCircle1One.destroy();
                _this.one.destroy();

                _this.circle2_x = [510, 596, 516, 232, 444, 594, 575, 551, 371, 465, 541, 542, 503, 489, 456, 309];
                _this.circle2_y = [374, 338, 338, 259, 356, 254, 293, 205, 275, 181, 298, 203, 286, 221, 363, 257];
                _this.circle2 = _this.game.add.graphics(_this.circle2_x[_this.map[_this.count1] - 1], _this.circle2_y[_this.map[_this.count1] - 1]);
                _this.circle2.beginFill(0xE11584);
                _this.radius1 = [76, 70, 70, 70, 70, 70, 70, 78, 48, 55, 68, 62, 70, 70, 70, 60];
                _this.circle2.drawCircle(0, 0, _this.radius1[_this.map[_this.count1] - 1]);
                _this.circle2.endFill();

                _this.mask2 = _this.game.add.graphics(_this.circle2_x[_this.map[_this.count1] - 1], _this.circle2_y[_this.map[_this.count1] - 1]);

                // Draw a sector shape on the mask graphics object
                _this.mask2.beginFill(0xffffff);
                _this.mask2.moveTo(0, 0);
                _this.mask2.lineTo(50, 0);
                _this.mask2_x = [227, 182, 237, 228, 272, 240, 182, 183, 183, 143, 182, 152, 181, 198, 206, 206];
                _this.mask2_y = [88, 89, 126, 136, 180, 148, 89, 40, 143, 91, 75, 91, 91, 91, 90, 150];
                _this.mask2.arc(0, 0, 50, _this.game.math.degToRad(_this.mask2_x[_this.map[_this.count1] - 1]), _this.game.math.degToRad(_this.mask2_y[_this.map[_this.count1] - 1]), true);
                _this.mask2.lineTo(0, 0);
                _this.mask2.lineTo(0, 0);
                _this.mask2.endFill();
                // Apply the mask to the circle sprite
                _this.circle2.mask = _this.mask2;

                _this.enterTxt2_x = [455, 550, 440, 155, 400, 510, 523, 465, 280, 425, 490, 490, 440, 430, 400, 220];
                _this.enterTxt2_y = [410, 380, 328, 240, 280, 240, 330, 210, 275, 215, 335, 235, 315, 250, 410, 245];
                _this.enterTxt2_angle = [132, 90, 95, 80, 90, 77, 90, 145, 30, 60, 105, 70, 90, 105, 100, 50];
                _this.enterTxt2 = _this.add.text(_this.enterTxt2_x[_this.map[_this.count1] - 1], _this.enterTxt2_y[_this.map[_this.count1] - 1], _this.enterTxt2_angle[_this.map[_this.count1] - 1] + "\u{00B0}");
                _this.enterTxt2.fontSize = "25px";
                _this.enterTxt2.fill = '#E11584';
                _this.enterX();

            });

        }


    },

    twoInput1: function () {
        if (_this.numberCircle1Two.frame == 0) {
            _this.numberCircle1Two.frame = 1;
            _this.time.events.add(1500, () => {
                _this.numberCircle1Two.destroy();
                _this.two.destroy();

                _this.circle3_x = [518, 604, 523, 238, 444, 599, 583, 563, 386, 472, 551, 550, 511, 497, 464, 317];
                _this.circle3_y = [380, 338, 346, 265, 363, 261, 293, 205, 275, 175, 298, 201, 286, 224, 366, 263];
                _this.circle3 = _this.game.add.graphics(_this.circle3_x[_this.map[_this.count1] - 1], _this.circle3_y[_this.map[_this.count1] - 1]);
                _this.circle3.beginFill(0xE11584);
                _this.radius2 = [64, 70, 65, 70, 70, 70, 70, 60, 74, 67, 62, 70, 70, 65, 65, 70];
                _this.circle3.drawCircle(0, 0, _this.radius2[_this.map[_this.count1] - 1]);
                _this.circle3.endFill();

                _this.mask3 = _this.game.add.graphics(_this.circle3_x[_this.map[_this.count1] - 1], _this.circle3_y[_this.map[_this.count1] - 1]);

                // Draw a sector shape on the mask graphics object
                _this.mask3.beginFill(0xffffff);
                _this.mask3.moveTo(0, 0);
                _this.mask3.lineTo(50, 0);
                _this.mask3_x = [89, 92, 130, 137, 181, 150, 92, 42, 151, 91, 78, 92, 92, 92, 92, 155];
                _this.mask3_y = [40, 1, 54, 45, 90, 57, 1, 1, 1, -36, 0, -27, 0, 19, 24, 28];
                _this.mask3.arc(0, 0, 50, _this.game.math.degToRad(_this.mask3_x[_this.map[_this.count1] - 1]), _this.game.math.degToRad(_this.mask3_y[_this.map[_this.count1] - 1]), true);
                _this.mask3.lineTo(0, 0);
                _this.mask3.lineTo(0, 0);
                _this.mask3.endFill();
                // Apply the mask to the circle sprite
                _this.circle3.mask = _this.mask3;

                _this.enterTxt3_x = [520, 630, 510, 230, 400, 575, 595, 615, 430, 490, 580, 580, 540, 530, 490, 295];
                _this.enterTxt3_y = [410, 380, 390, 310, 410, 310, 330, 210, 285, 215, 335, 235, 315, 265, 410, 310];
                _this.enterTxt3_angle = [48, 90, 85, 100, 90, 103, 90, 35, 150, 120, 75, 110, 90, 75, 80, 130];
                _this.enterTxt3 = _this.add.text(_this.enterTxt3_x[_this.map[_this.count1] - 1], _this.enterTxt3_y[_this.map[_this.count1] - 1], _this.enterTxt3_angle[_this.map[_this.count1] - 1] + "\u{00B0}");
                _this.enterTxt3.fontSize = "25px";
                _this.enterTxt3.fill = '#E11584';
                _this.enterX();

            });
        }


    },

    threeInput1: function () {
        if (_this.numberCircle1Three.frame == 0) {
            _this.numberCircle1Three.frame = 1;
            _this.time.events.add(1500, () => {
                _this.numberCircle1Three.destroy();
                _this.three.destroy();


                _this.circle4_x = [519, 604, 529, 245, 453, 606, 583, 553, 386, 473, 548, 550, 511, 497, 464, 325];
                _this.circle4_y = [368, 332, 337, 258, 363, 256, 285, 197, 266, 164, 290, 192, 278, 216, 358, 258];
                _this.circle4 = _this.game.add.graphics(_this.circle4_x[_this.map[_this.count1] - 1], _this.circle4_y[_this.map[_this.count1] - 1]);
                _this.circle4.beginFill(0xE11584);
                _this.radius3 = [74, 70, 70, 70, 70, 70, 70, 77, 74, 55, 65, 63, 70, 70, 70, 60];
                _this.circle4.drawCircle(0, 0, _this.radius3[_this.map[_this.count1] - 1]);
                _this.circle4.endFill();

                _this.mask4 = _this.game.add.graphics(_this.circle4_x[_this.map[_this.count1] - 1], _this.circle4_y[_this.map[_this.count1] - 1]);

                // Draw a sector shape on the mask graphics object
                _this.mask4.beginFill(0xffffff);
                _this.mask4.moveTo(0, 0);
                _this.mask4.lineTo(50, 0);
                _this.mask4_x = [39, 2, 58, 49, 92, 61, 2, 3, 332, -33, 5, -25, 1, 23, 24, 27];
                _this.mask4_y = [271, -89, -52, -46, 1, -30, -89, -139, 179, -90, -102, -90, -90, -90, -90, -28];
                _this.mask4.arc(0, 0, 50, _this.game.math.degToRad(_this.mask4_x[_this.map[_this.count1] - 1]), _this.game.math.degToRad(_this.mask4_y[_this.map[_this.count1] - 1]), true);
                _this.mask4.lineTo(0, 0);
                _this.mask4.lineTo(0, 0);
                _this.mask4.endFill();
                // Apply the mask to the circle sprite
                _this.circle4.mask = _this.mask4;

                _this.enterTxt4_x = [520, 630, 580, 290, 480, 670, 595, 605, 355, 485, 580, 580, 540, 540, 500, 380];
                _this.enterTxt4_y = [290, 265, 328, 250, 410, 240, 210, 160, 200, 100, 245, 125, 225, 175, 300, 245];
                _this.enterTxt4_angle = [132, 90, 95, 80, 90, 77, 90, 145, 150, 60, 105, 70, 90, 105, 100, 50];
                _this.enterTxt4 = _this.add.text(_this.enterTxt4_x[_this.map[_this.count1] - 1], _this.enterTxt4_y[_this.map[_this.count1] - 1], _this.enterTxt4_angle[_this.map[_this.count1] - 1] + "\u{00B0}");
                _this.enterTxt4.fontSize = "25px";
                _this.enterTxt4.fill = '#E11584';
                _this.enterX();

            });

        }

    },

    fourInput1: function () {
        if (_this.numberCircle1Four.frame == 0) {
            _this.numberCircle1Four.frame = 1;
            _this.time.events.add(1500, () => {
                _this.numberCircle1Four.destroy();
                _this.four.destroy();

                _this.circle5_x = [510, 596, 523, 239, 453, 601, 575, 545, 400, 465, 539, 542, 503, 489, 456, 318];
                _this.circle5_y = [362, 330, 329, 252, 355, 249, 285, 197, 266, 170, 290, 196, 278, 213, 353, 252];
                _this.circle5 = _this.game.add.graphics(_this.circle5_x[_this.map[_this.count1] - 1], _this.circle5_y[_this.map[_this.count1] - 1]);
                _this.circle5.beginFill(0xE11584);
                _this.radius4 = [64, 70, 65, 70, 70, 70, 70, 66, 48, 67, 64, 70, 70, 65, 65, 70];
                _this.circle5.drawCircle(0, 0, _this.radius4[_this.map[_this.count1] - 1]);
                _this.circle5.endFill();

                _this.mask5 = _this.game.add.graphics(_this.circle5_x[_this.map[_this.count1] - 1], _this.circle5_y[_this.map[_this.count1] - 1]);

                // Draw a sector shape on the mask graphics object
                _this.mask5.beginFill(0xffffff);
                _this.mask5.moveTo(0, 0);
                _this.mask5.lineTo(50, 0);
                _this.mask5_x = [272, 272, 310, 318, 1, -28, 272, 220, 0, 272, 260, 273, 271, 271, 271, 335];
                _this.mask5_y = [222, 181, 230, 224, -90, -125, 181, 181, -35, 142, 179, 152, 180, 196, 201, 205];
                _this.mask5.arc(0, 0, 50, _this.game.math.degToRad(_this.mask5_x[_this.map[_this.count1] - 1]), _this.game.math.degToRad(_this.mask5_y[_this.map[_this.count1] - 1]), true);
                _this.mask5.lineTo(0, 0);
                _this.mask5.lineTo(0, 0);
                _this.mask5.endFill();
                // Apply the mask to the circle sprite
                _this.circle5.mask = _this.mask5;

                _this.enterTxt5_x = [470, 550, 510, 230, 480, 595, 523, 470, 460, 410, 470, 470, 430, 423, 400, 295];
                _this.enterTxt5_y = [290, 265, 250, 180, 280, 175, 210, 160, 235, 105, 245, 125, 225, 145, 280, 180];
                _this.enterTxt5_angle = [48, 90, 85, 100, 90, 103, 90, 35, 30, 120, 75, 110, 90, 75, 80, 130];
                _this.enterTxt5 = _this.add.text(_this.enterTxt5_x[_this.map[_this.count1] - 1], _this.enterTxt5_y[_this.map[_this.count1] - 1], _this.enterTxt5_angle[_this.map[_this.count1] - 1] + "\u{00B0}");
                _this.enterTxt5.fontSize = "25px";
                _this.enterTxt5.fill = '#E11584';
                _this.enterX();

            });

        }


    },

    enterX: function () {

        if (_this.color_flag == 0) {
            _this.AnswerBox = _this.add.image(32, 75, 'AnswerBox');
            // _this.AnswerBox.scale.setTo(2, 2.3);
            _this.enterTxt6 = _this.add.text(75, 100, "X  = ");
            _this.enterTxt6.fontSize = "30px";
            _this.enterTxt6.fill = '#87CEEB';
            _this.color_flag = 1;
            _this.Question_flag = 4;
            console.log(" _this.Ask_Question10");
            if (_this.count1 == 0)
                _this.Ask_Question10.play();
            _this.addNumberPad();

        }

    },

    //* Change this function to show small number pad as given in GDD. (no signs)
    addNumberPad: function () {
        _this.Choice = 1;
        _this.objGroup = _this.add.group();
        _this.numGroup = _this.add.group();

        var bottomnumpadbg = _this.numGroup.create(0, 515, 'Numpadbg'); _this.mask
        bottomnumpadbg.scale.setTo(1, 1);

        bottomnumpadbg.name = "Numpadbg";

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
            _this.enterTxt = _this.add.text(157, 28, "" + var_selectedAns1 + var_selectedAns2 + var_selectedAns3, { fontSize: '30px' });
        }
        else if (_this.selectedAns3 === "") {
            console.log("12");
            _this.enterTxt = _this.add.text(150, 28, "" + var_selectedAns1 + var_selectedAns2 + var_selectedAns3, { fontSize: '30px' });
        }
        else {
            console.log("13");
            _this.enterTxt = _this.add.text(140, 28, "" + var_selectedAns1 + var_selectedAns2 + var_selectedAns3, { fontSize: '30px' });
        }

        _this.enterTxt.align = 'right';
        // _this.enterTxt.font = "Akzidenz-Grotesk BQ";
        _this.enterTxt.fill = '#87CEEB';
        // _this.enterTxt.fontWeight = 'normal';
        _this.AnswerBox.addChild(_this.enterTxt);
        _this.enterTxt.visible = true;
        console.log(_this.selectedAns1, _this.selectedAns2, _this.selectedAns3);
        _this.AnswerBox.name = Number('' + var_selectedAns1 + var_selectedAns2 + var_selectedAns3);
        console.log(_this.AnswerBox.name);
    },


    //after adding answer to numberpad and clicking on tick buttn for validation
    rightbtnClicked: function (target) {
        _this.clickSound.play();

        if (_this.AnswerBox.name == _this.parellelAngle[_this.map[_this.count1] - 1]) {
            _this.noofAttempts++;
            _this.counterCelebrationSound.play();
            _this.rightbtn.inputEnabled = false;
            _this.time.events.add(2500, function () {
                _this.clearAll();
                _this.firstMap = _this.allMapsGroupFourth.getChildAt(_this.map[_this.count1] - 1).name;
                _this.mapShow1 = _this.add.image(30, 70, _this.firstMap);
                //_this.mapShow1.alpha = 0;
                _this.mapShow1.scale.setTo(_this.mapshow_scalex[_this.map[_this.count1] - 1], _this.mapshow_scaley[_this.map[_this.count1] - 1]);
                _this.tween1 = _this.add.tween(_this.mapShow1).to({ alpha: 0.2 }, 2000, Phaser.Easing.Linear.None, true);
                // _this.mapShow1.scale.setTo(2.4, 2.32);
                // _this.time.events.add(2500, function () {
                _this.tween1.onComplete.add(function () {
                    _this.mapShow1.destroy();
                    //_this.firstMap = _this.allMapsGroupSecond.getChildAt(0).name;
                    // _this.mapShow = _this.add.image(30, 80, _this.firstMap);
                    //_this.mapShow.scale.setTo(2.4,2);
                    // _this.time.events.add(2500, function ()
                    // {
                    //     _this.mapShow.destroy();

                    // });
                    _this.firstMap = _this.allMapsGroupThird.getChildAt(_this.map[_this.count1] - 1).name;
                    _this.mapShow = _this.add.image(30, 80, _this.firstMap);

                    _this.mapShow.alpha = 0.2;
                    if (_this.map[_this.count1] == 7)
                        _this.mapShow.scale.setTo(2.5, 2.5); // for scene 7
                    else if (_this.map[_this.count1] == 8)
                        _this.mapShow.scale.setTo(3.1, 2.7); // for scene 8
                    else
                        _this.mapShow.scale.setTo(2.2, 2.2);
                    _this.tween1 = _this.add.tween(_this.mapShow).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
                    //_this.mapShow.scale.setTo(2.4, 2);

                    _this.time.events.add(3500, function () {
                        _this.celebrationSound.play();
                        telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);
                        _this.starActions();
                        _this.tween1 = _this.add.tween(_this.mapShow).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
                        _this.mapShow.destroy();
                        if (_this.count1 == 2)
                            _this.lastScreenCelebration();
                        else {
                            _this.count1++;
                            _this.Question_flag = 0;
                            _this.selectedAns1 = '';
                            _this.selectedAns2 = '';
                            _this.selectedAns3 = '';
                            _this.color_flag = 0;
                            _this.wrong = 0;
                            _this.time.events.add(1000, function () {
                                _this.firstMapp();
                            });
                        }


                    });
                });
            });

        }
        else if (_this.wrong == 2) {
            _this.noofAttempts++;
            _this.wrongSound.play();
            _this.eraseScreen();
            _this.time.events.add(1000, function () {
                _this.enterTxt1.destroy();
                _this.counterCelebrationSound.play();
                _this.enterTxt1_x = [420, 558, 458, 161, 403, 447, 448, 600, 568, 362, 476, 458, 468, 452, 423, 393];
                _this.enterTxt1_y = [249, 177, 190, 339, 178, 295, 307, 278, 164, 205, 191, 202, 184, 299, 159, 164];
                _this.enterTxt1 = _this.add.text(_this.enterTxt1_x[_this.map[_this.count1] - 1], _this.enterTxt1_y[_this.map[_this.count1] - 1], _this.parellelAngle[_this.map[_this.count1] - 1] + "\u{00B0}");
                // _this.tween1 = _this.add.tween(_this.enterTxt1).to({x:422, y:249}, 1000, Phaser.Easing.Linear.None, true);

                _this.enterTxt1.fontSize = '20px';
                _this.Question_flag = 5;
                console.log(" _this.Ask_Question11");
                if (_this.count1 == 0)
                    _this.Ask_Question11.play();

            });
            _this.wrong++;

        }
        else {
            _this.noofAttempts++;
            // if (_this.AnswerBox.name != '' || _this.AnswerBox.name == isNaN())\
            // if (!isNaN(_this.AnswerBox.name))
            _this.wrong++;
            _this.wrongSound.play();
            _this.eraseScreen();
        }

    },

    DestoryFourth: function () {
        //_this.allMapsGroupThird.destroy();

        _this.mapShow.destroy();
        _this.line1.destroy();
        _this.line2.destroy();
        _this.line3.destroy();
        _this.tick.destroy();

        _this.numberCircleOne.destroy();
        _this.numberCircleTwo.destroy();
        _this.numberCircleThree.destroy();
        _this.numberCircleFour.destroy();
        _this.numberCircleFive.destroy();
        _this.numberCircleSeven.destroy();
        _this.numberCircleSix.destroy();
        _this.numberCircleEight.destroy();

        _this.one.destroy();
        _this.two.destroy();
        _this.three.destroy();
        _this.four.destroy();
        _this.five.destroy();
        _this.six.destroy();
        _this.seven.destroy();
        _this.eight.destroy();
    },


    frameReset: function () {
        _this.numberCircleOne.frame = 1;
        _this.numberCircleThree.frame = 1;
        _this.numberCircleTwo.frame = 1;
        _this.numberCircleFour.frame = 1;
        _this.numberCircleFive.frame = 1;
        _this.numberCircleSix.frame = 1;
        _this.numberCircleSeven.frame = 1;
        _this.numberCircleEight.frame = 1;

    },


    //destroing the first screen map and circle. 
    DestoryFirstScreenObj: function () {
        //  _this.allMapsGroup.destroy();
        _this.allCircleGroup.destroy();
        //  _this.mapShow.destroy();
        _this.circleShow.destroy();
    },

    //destroing the first screen map and circle. 
    DestorySecondScreenObj: function () {
        // _this.allMapsGroupSecond.destroy();
        //_this.allCircleGroupSecond.destroy();
        _this.mapShow.destroy();
        _this.circleShow.destroy();
    },

    DestoryThirdScreenObj: function () {
        _this.allCircleGroupThird.destroy();
        _this.circleShow.destroy();
        _this.tick.destroy();
    },

    oneInput: function () {
        if (_this.numberCircleOne.frame == 0)
            _this.numberCircleOne.frame = 1;

        else
            _this.numberCircleOne.frame = 0;
    },

    twoInput: function () {
        if (_this.numberCircleTwo.frame == 0)
            _this.numberCircleTwo.frame = 1;

        else
            _this.numberCircleTwo.frame = 0;
    },

    threeInput: function () {
        if (_this.numberCircleThree.frame == 0)
            _this.numberCircleThree.frame = 1;

        else
            _this.numberCircleThree.frame = 0;
    },

    fourInput: function () {
        if (_this.numberCircleFour.frame == 0)
            _this.numberCircleFour.frame = 1;

        else
            _this.numberCircleFour.frame = 0;
    },

    fiveInput: function () {
        if (_this.numberCircleFive.frame == 0)
            _this.numberCircleFive.frame = 1;

        else
            _this.numberCircleFive.frame = 0;
    },

    sixInput: function () {
        if (_this.numberCircleSix.frame == 0)
            _this.numberCircleSix.frame = 1;

        else
            _this.numberCircleSix.frame = 0;
    },

    sevenInput: function () {
        if (_this.numberCircleSeven.frame == 0)
            _this.numberCircleSeven.frame = 1;

        else
            _this.numberCircleSeven.frame = 0;
    },

    eightInput: function () {
        if (_this.numberCircleEight.frame == 0)
            _this.numberCircleEight.frame = 1;

        else
            _this.numberCircleEight.frame = 0;
    },


    lastScreenCelebration: function () {
        // _this.celebrationSound.play();
        //_this.starActions();
        _this.time.events.add(1000, () => {
            _this.state.start('score', true, false, gameID, _this.microConcepts);
            console.log("score");

        });
    },

    clearAll: function () {
        console.log("ClearAll");

        _this.tick.destroy();

        _this.numberCircle1One.destroy();
        _this.numberCircle1Two.destroy();
        _this.numberCircle1Three.destroy();
        _this.numberCircle1Four.destroy();
        _this.circle.destroy();
        _this.enterTxt.destroy();
        _this.enterTxt1.destroy();
        _this.enterTxt6.destroy();
        if (_this.circle2) _this.circle2.destroy();
        if (_this.enterTxt2) _this.enterTxt2.destroy();
        if (_this.mask2) _this.mask2.destroy();

        if (_this.circle3) _this.circle3.destroy();
        if (_this.enterTxt3) _this.enterTxt3.destroy();
        if (_this.mask3) _this.mask3.destroy();

        if (_this.circle4) _this.circle4.destroy();
        if (_this.enterTxt4) _this.enterTxt4.destroy();
        if (_this.mask4) _this.mask4.destroy();

        if (_this.circle5) _this.circle5.destroy();
        if (_this.enterTxt5) _this.enterTxt5.destroy();
        if (_this.mask5) _this.mask5.destroy();

        _this.line1.destroy();
        _this.line2.destroy();
        _this.line3.destroy();
        _this.bg.destroy();


        _this.AnswerBox.destroy();
        _this.numGroup.destroy();

        _this.one.destroy();
        _this.two.destroy();
        _this.three.destroy();
        _this.four.destroy();


        _this.Question_flag = 0;
    },


    applyingStyle: function (target) {
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
        starAnim = _this.starsGroup.getChildAt(_this.numberOfQuestions);
        starAnim.smoothed = false;
        anim = starAnim.animations.add('star');
        _this.microConcepts = "GeometryG7";
        _this.numberOfQuestions++;
        anim.play();
    },


    shutdown: function () {
        _this.stopVoice();
        //RI.gotoEndPage();
        //telInitializer.tele_end();
    },

    DemoVideo: function () {


        // DEMO AUDIOS
        _this.demoAudio1 = document.createElement('audio');
        _this.demoAudio1src = document.createElement('source');
        _this.demoAudio1src.setAttribute("src", window.baseUrl + "questionSounds/GMLA-04-G7/" + _this.languageSelected + "/V1.mp3");
        _this.demoAudio1.appendChild(_this.demoAudio1src);

        _this.demoAudio2 = document.createElement('audio');
        _this.demoAudio2src = document.createElement('source');
        _this.demoAudio2src.setAttribute("src", window.baseUrl + "questionSounds/GMLA-04-G7/" + _this.languageSelected + "/V2.mp3");
        _this.demoAudio2.appendChild(_this.demoAudio2src);

        // QUESTION AUDIOS
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-04-G7/" +
            _this.languageSelected + "/V1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        _this.q2Sound = document.createElement('audio');
        _this.q2Soundsrc = document.createElement('source');
        _this.q2Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-04-G7/" +
            _this.languageSelected + "/V2.mp3");
        _this.q2Sound.appendChild(_this.q2Soundsrc);

        _this.q3Sound = document.createElement('audio');
        _this.q3Soundsrc = document.createElement('source');
        _this.q3Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-04-G7/" +
            _this.languageSelected + "/V3.mp3");
        _this.q3Sound.appendChild(_this.q3Soundsrc);


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
    stopAudio: function () {
        //* clear all the timers first

        if (_this.demoAudio1Timer) clearTimeout(_this.demoAudio1Timer);
        if (_this.demoVideo1PauseTimer) clearTimeout(_this.demoVideo1PauseTimer);
        if (_this.q1Timer) clearTimeout(_this.q1Timer);
        if (_this.demoAudio2Timer) clearTimeout(_this.demoAudio2Timer);
        if (_this.q2Timer) clearTimeout(_this.q2Timer);

        if (_this.demoAudio1) {
            //// console.log("removing the demo audio1");
            _this.demoAudio1.pause();
            _this.demoAudio1 = null;
            _this.demoAudio1src = null;
        }

        if (_this.demoAudio2) {
            //// console.log("removing the demo audio1");
            _this.demoAudio2.pause();
            _this.demoAudio2 = null;
            _this.demoAudio2src = null;
        }


        if (_this.q1Sound) {
            //// console.log("removing the q1");
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

        if (_this.q3Sound) {
            //// console.log("removing the q3");
            _this.q3Sound.pause();
            _this.q3Sound = null;
            _this.q3Soundsrc = null;
        }

        _this.skip.events.onInputDown.removeAll();
        _this.skip.destroy();                //* skip button destroyed

    },

    showDemoVideo: function () {



        // _this.demoVideo_1 = _this.add.video('GMLA-04-G7_1');
        // _this.demoVideo_1.play(false);
        // _this.demoVideo_1.changeSource("demoVideos/GMLA-04-G7_1.mp4");
        // _this.video_playing = 1;
        // _this.videoWorld_1 = _this.demoVideo_1.addToWorld();

        // //* play the demo audio1 after 4 sec delay
        // _this.demoAudio1Timer = setTimeout(function ()    //* demoAudio1 js timer to play demoAudio1Timer after 4 seconds.
        // {
        //     //// console.log("inside demoAudio1sound.....")
        //     _this.demoVideo_1.playbackRate = 0;     //* pausing the video after 4sec
        //     clearTimeout(_this.demoAudio1Timer);         //* clear the time once its used.
        //     _this.demoAudio1.play();
        // }, 4000);

        // _this.demoVideo1PauseTimer = setTimeout(function () {
        //     //// console.log("inside demoAudio1sound.....")
        //     _this.demoVideo_1.playbackRate = 1;  //* resuming the video after 9 sec
        //     clearTimeout(_this.demoVideo1PauseTimer);
        // }, 9000);

        // _this.q1Timer = setTimeout(function ()    //* q1 js timer to play q1 after 11 seconds.
        // {
        //     //// console.log("inside q1sound.....")
        //     clearTimeout(_this.q1Timer);         //* clear the time once its used.
        //     _this.q1Sound.play();
        // }, 11000);

        // _this.demoAudio2Timer = setTimeout(function ()    //* demo audio2 js timer to play demo audio2 after 10 seconds.
        // {
        //     //// console.log("inside demoau2sound.....")
        //     clearTimeout(_this.demoAudio2Timer);         //* clear the time once its used.
        //     _this.demoAudio2.play();
        // }, 19000);

        // _this.q2Timer = setTimeout(function ()    //* q2 js timer to play q2 after 15 seconds.
        // {
        //     //// console.log("inside q2sound.....")
        //     clearTimeout(_this.q2Timer);         //* clear the time once its used.
        //     _this.q2Sound.play();
        // }, 24000);

        // _this.demoVideo_1.onComplete.add(function () {
        //     //// console.log("audio2 ended - pause video1");
        //     _this.demoVideo_2 = _this.add.video('ML1_2');
        //     _this.demoVideo_2.play(false);
        //     _this.demoVideo_2.changeSource("demoVideos/GMLA-04-G7_2.mp4");  //* phaser needs this.to run in mobile
        //     _this.video_playing = 2;
        //     _this.videoWorld_2 = _this.demoVideo_2.addToWorld();

        //     _this.skip.bringToTop();
        //     _this.q3Sound.play();
        //     _this.demoVideo_2.onComplete.add(function () {
        //         //// console.log("demovideo 2 completed......!!!1")
        //         _this.stopAudio();
        //         _this.demoVideo_2.stop(false);
        //         _this.demoVideo_1.stop(false);
        //         _this.videoWorld_1.destroy();
        //         _this.videoWorld_2.destroy();
        //         _this.game.paused = false;

        //     });
        // });
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

        _this.skip = _this.add.image(820, 110, 'close');       //* skip button shown at the bottom
        // _this.skip.scale.setTo(0.9, 0.9);
        _this.skip.inputEnabled = true;
        _this.skip.input.useHandCursor = true;
        _this.skip.events.onInputDown.add(function () {
            _this.stopAudio2();
            console.log('skip arrow')
            _this.pauseVoice();

            if (_this.hintBtn) {
                _this.hintBtn.inputEnabled = true;
                _this.hintBtn.input.useHandCursor = true;
            }
            _this.game.paused = false;  //* restart the game
            console.log(_this.game.paused, '_this.game.paused')
        });
    },

    showHintInstructions: function () {
        _this.pauseVoice();

        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-04-G7/" +
            _this.languageSelected + "/GMLA_04_G7_h1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        // _this.q2Sound = document.createElement('audio');
        // _this.q2Soundsrc = document.createElement('source');
        // _this.q2Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-04-G7/" +
        //     _this.languageSelected + "/HV2.mp3");
        // _this.q2Sound.appendChild(_this.q2Soundsrc);

        _this.q3Sound = document.createElement('audio');
        _this.q3Soundsrc = document.createElement('source');
        _this.q3Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-04-G7/" +
            _this.languageSelected + "/GMLA_04_G7_h2.mp3");
        _this.q3Sound.appendChild(_this.q3Soundsrc);

        _this.q4Sound = document.createElement('audio');
        _this.q4Soundsrc = document.createElement('source');
        _this.q4Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/GMLA-04-G7/" +
            _this.languageSelected + "/GMLA_04_G7_h3.mp3");
        _this.q4Sound.appendChild(_this.q4Soundsrc);


        _this.playCount = 0;

        _this.background_demo = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'BG');

        _this.screenVal = 0;

        _this.bgBox = _this.add.image(70, 80, 'bgbox2');

        _this.background_demo.addChild(_this.bgBox);

        _this.drawParallelLines();
        _this.drawTraversalLine();
        _this.drawArc();
        _this.drawArc2();
        _this.drawArc3();
        _this.drawArc4();
        _this.drawArc5();
        _this.drawArc6();
        _this.drawArc7();
        _this.drawArc8();
        _this.representAngles();

        setTimeout(_this.playQuestion1(), 100);

    },

    playQuestion1: function () {
        _this.q1Sound.play();
        // _this.Ask_Question13.play();
        _this.Question_flag = 13;

        // _this.q2Timer = setTimeout(function ()    //* demoAudio1 js timer to play demoAudio1Timer after 4 seconds.
        // {
        //     console.log("inside q2sound.....")
        //     clearTimeout(_this.q2Timer);
        //     _this.q2Sound.play();
        //     _this.Question_flag = 14;
        // }, 2400);

        _this.q3Timer = setTimeout(function ()    //* demoAudio1 js timer to play demoAudio1Timer after 4 seconds.
        {
            console.log("inside q3sound.....")
            clearTimeout(_this.q3Timer);
            _this.q3Sound.play();
            _this.Question_flag = 15;
        }, 7800);

        _this.q4Timer = setTimeout(function ()    //* demoAudio1 js timer to play demoAudio1Timer after 4 seconds.
        {
            console.log("inside q4sound.....")
            clearTimeout(_this.q4Timer);
            _this.q4Sound.play();
            _this.Question_flag = 16;
        }, 13000);


    },


    stopAudio2: function () {

        if (_this.background_demo) _this.background_demo.destroy();
        _this.Question_flag = 2;
        _this.speakerbtn.inputEnabled = true;

        if (_this.q1Sound) {
            _this.q1Sound.pause();
            _this.q1Sound = null;
            _this.q1Soundsrc = null;
        }
        // if (_this.q2Sound) {
        //     _this.q2Sound.pause();
        //     _this.q2Sound = null;
        //     _this.q2Soundsrc = null;
        // }
        if (_this.q3Sound) {
            _this.q3Sound.pause();
            _this.q3Sound = null;
            _this.q3Soundsrc = null;
        }
        if (_this.q4Sound) {
            _this.q4Sound.pause();
            _this.q4Sound = null;
            _this.q4Soundsrc = null;
        }

        _this.skip.events.onInputDown.removeAll();
        _this.skip.destroy();                //* skip button destroyed

    },

    drawParallelLines: function () {
        console.log('parallel lines')

        var graphics = _this.add.graphics(0, 0);

        // Define the coordinates for the parallel lines
        var startX = 300;
        var endX = 550;
        var startY = 220;
        var endY = 220;

        // Draw the parallel lines
        graphics.lineStyle(2, 0x4472c4); // Line color and thickness

        // Draw the main lines
        graphics.moveTo(startX, startY);
        graphics.lineTo(endX, endY);

        // Draw arrowheads at both ends
        drawArrow(graphics, startX, startY, Math.atan2(endY - startY, endX - startX));
        drawArrow(graphics, endX, endY, Math.atan2(startY - endY, startX - endX));

        function drawArrow(graphics, x, y, angle) {
            var arrowLength = 5;

            var x1 = x + arrowLength * Math.cos(angle + Math.PI / 6);
            var y1 = y + arrowLength * Math.sin(angle + Math.PI / 6);
            var x2 = x + arrowLength * Math.cos(angle - Math.PI / 6);
            var y2 = y + arrowLength * Math.sin(angle - Math.PI / 6);

            graphics.beginFill(0x4472c4); // Arrow fill color
            graphics.moveTo(x, y);
            graphics.lineTo(x1, y1);
            graphics.lineTo(x2, y2);
            graphics.lineTo(x, y);
            graphics.endFill();
        }

        // Define the coordinates for the parallel lines
        var startX = 300;
        var endX = 550;
        var startY = 300;
        var endY = 300;

        // Draw the parallel lines
        graphics.lineStyle(2, 0x4472c4); // Line color and thickness

        // Draw the main lines
        graphics.moveTo(startX, startY);
        graphics.lineTo(endX, endY);

        // Draw arrowheads at both ends
        drawArrow(graphics, startX, startY, Math.atan2(endY - startY, endX - startX));
        drawArrow(graphics, endX, endY, Math.atan2(startY - endY, startX - endX));

        function drawArrow(graphics, x, y, angle) {
            var arrowLength = 5;

            var x1 = x + arrowLength * Math.cos(angle + Math.PI / 6);
            var y1 = y + arrowLength * Math.sin(angle + Math.PI / 6);
            var x2 = x + arrowLength * Math.cos(angle - Math.PI / 6);
            var y2 = y + arrowLength * Math.sin(angle - Math.PI / 6);

            graphics.beginFill(0x4472c4); // Arrow fill color
            graphics.moveTo(x, y);
            graphics.lineTo(x1, y1);
            graphics.lineTo(x2, y2);
            graphics.lineTo(x, y);
            graphics.endFill();
        }

        _this.background_demo.addChild(graphics);
    },

    drawTraversalLine: function () {
        console.log('Traversal lines')

        var graphics = _this.add.graphics(0, 0);

        // Define line endpoints and length
        var startX = 390;
        var startY = 400;
        var lineLength = 270;

        // // Calculate line endpoints
        // var endX = startX + lineLength * Math.cos(-Math.PI / 3); // -60-degree angle in radians
        // var endY = startY + lineLength * Math.sin(-Math.PI / 3);

        var angle = -70 * (Math.PI / 180); // Convert 80 degrees to radians (negative for right side)
        var endX = startX + lineLength * Math.cos(angle);
        var endY = startY + lineLength * Math.sin(angle);

        // Draw the line
        graphics.lineStyle(2, 0x4472c4); // Line color and thickness
        graphics.moveTo(startX, startY);
        graphics.lineTo(endX, endY);

        // Draw arrows at both ends
        drawArrow(graphics, startX, startY, Math.atan2(endY - startY, endX - startX));
        drawArrow(graphics, endX, endY, Math.atan2(startY - endY, startX - endX));

        // Function to draw an arrowhead
        function drawArrow(graphics, x, y, angle) {
            var arrowLength = 7;

            var x1 = x + arrowLength * Math.cos(angle + Math.PI / 6);
            var y1 = y + arrowLength * Math.sin(angle + Math.PI / 6);
            var x2 = x + arrowLength * Math.cos(angle - Math.PI / 6);
            var y2 = y + arrowLength * Math.sin(angle - Math.PI / 6);

            graphics.beginFill(0x4472c4); // Arrow fill color
            graphics.moveTo(x, y);
            graphics.lineTo(x1, y1);
            graphics.lineTo(x2, y2);
            graphics.lineTo(x, y);
            graphics.endFill();
        }

        _this.background_demo.addChild(graphics);
    },

    drawArc: function () {
        var graphics = _this.add.graphics(0, 0);

        var centerX = 465;
        var centerY = 222;
        var radius = 30;
        var startAngle = Math.PI; // 180 degrees in radians
        var endAngle = 1.5 * Math.PI; // 270 degrees in radians;
        var anticlockwise = false; // Clockwise direction

        graphics.lineStyle(2, 0x4472c4); // Line color and thickness

        graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);


        setTimeout(changeArcColor, 2500);

        function changeArcColor() {
            console.log('change arc 1')
            graphics.clear(); // Clear the previous graphics
            graphics.lineStyle(2, 0xFF0000); // Change line color to red
            graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        }

        setTimeout(changeArcColor2, 7800);

        function changeArcColor2() {
            console.log('change arc 1')
            graphics.clear(); // Clear the previous graphics
            graphics.lineStyle(2, 0x4472c4); // Change line color to red
            graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        }

        _this.background_demo.addChild(graphics);
    },

    drawArc2: function () {
        var graphics = _this.add.graphics(0, 0);

        var centerX = 446;
        var centerY = 220;
        var radius = 30;
        var startAngle = 0; // 180 degrees in radians
        var endAngle = Math.PI / 2; // 90 degrees in radians (180 degrees opposite from start)
        var anticlockwise = false; // Clockwise direction

        graphics.lineStyle(2, 0x4472c4); // Line color and thickness

        graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);

        setTimeout(changeArcColor, 2500);

        function changeArcColor() {
            console.log('change arc 4')
            graphics.clear(); // Clear the previous graphics
            graphics.lineStyle(2, 0xFFA500); // Change line color to orange
            graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        }

        setTimeout(changeArcColor2, 7800);

        function changeArcColor2() {
            console.log('change arc 4')
            graphics.clear(); // Clear the previous graphics
            graphics.lineStyle(2, 0xFFA500); // Change line color to orange
            graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        }

        _this.background_demo.addChild(graphics);
    },

    drawArc3: function () {
        var graphics = _this.add.graphics(0, 0);

        var centerX = 461;
        var centerY = 220;
        var radius = 10;
        var startAngle = 0; // 0 degrees in radians
        var endAngle = Math.PI / -2; // 45 degrees in radians
        var anticlockwise = true; // Anti-clockwise direction

        graphics.lineStyle(2, 0x4472c4); // Line color and thickness

        graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);

        setTimeout(changeArcColor, 2500);

        function changeArcColor() {
            console.log('change arc 2')
            graphics.clear(); // Clear the previous graphics
            graphics.lineStyle(2, 0xe75480); // Change line color to pink
            graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        }

        setTimeout(changeArcColor2, 7800);

        function changeArcColor2() {
            console.log('change arc 2')
            graphics.clear(); // Clear the previous graphics
            graphics.lineStyle(2, 0x4472c4); // Change line color to pink
            graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        }

        _this.background_demo.addChild(graphics);
    },

    drawArc4: function () {
        var graphics = _this.add.graphics(0, 0);

        var centerX = 452;
        var centerY = 220;
        var radius = 11;
        var startAngle = Math.PI; // 0 degrees in radians
        var endAngle = Math.PI / 2; // 90 degrees in radians
        var anticlockwise = true; // Clockwise direction

        graphics.lineStyle(2, 0x4472c4); // Line color and thickness

        graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);

        setTimeout(changeArcColor, 2500);

        function changeArcColor() {
            console.log('change arc 3')
            graphics.clear(); // Clear the previous graphics
            graphics.lineStyle(2, 0x800080); // Change line color to purple
            graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        }

        setTimeout(changeArcColor2, 7800);

        function changeArcColor2() {
            console.log('change arc 3')
            graphics.clear(); // Clear the previous graphics
            graphics.lineStyle(2, 0x800080); // Change line color to purple
            graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        }

        _this.background_demo.addChild(graphics);
    },

    drawArc5: function () {
        var graphics = _this.add.graphics(0, 0);

        var centerX = 436;
        var centerY = 300;
        var radius = 30;
        var startAngle = Math.PI; // 180 degrees in radians
        var endAngle = 1.5 * Math.PI; // 270 degrees in radians;
        var anticlockwise = false; // Clockwise direction

        graphics.lineStyle(2, 0x4472c4); // Line color and thickness

        graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);

        setTimeout(changeArcColor, 2500);

        function changeArcColor() {
            console.log('change arc 5')
            graphics.clear(); // Clear the previous graphics
            graphics.lineStyle(2, 0xFF0000); // Change line color to 0xFFA500
            graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        }

        setTimeout(changeArcColor2, 7800);

        function changeArcColor2() {
            console.log('change arc 5')
            graphics.clear(); // Clear the previous graphics
            graphics.lineStyle(2, 0xFFA500); // Change line color to 
            graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        }

        setTimeout(changeArcColor3, 14000);

        function changeArcColor3() {
            console.log('change arc 5')
            graphics.clear(); // Clear the previous graphics
            graphics.lineStyle(2, 0x800080); // Change line color to 
            graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        }

        _this.background_demo.addChild(graphics);
    },

    drawArc6: function () {
        var graphics = _this.add.graphics(0, 0);

        var centerX = 417;
        var centerY = 300;
        var radius = 30;
        var startAngle = 0; // 180 degrees in radians
        var endAngle = Math.PI / 2; // 90 degrees in radians (180 degrees opposite from start)
        var anticlockwise = false; // Clockwise direction

        graphics.lineStyle(2, 0x4472c4); // Line color and thickness

        graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);

        setTimeout(changeArcColor, 2500);

        function changeArcColor() {
            console.log('change arc 8')
            graphics.clear(); // Clear the previous graphics
            graphics.lineStyle(2, 0xFFA500); // Change line color to orange
            graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        }

        setTimeout(changeArcColor2, 7800);

        function changeArcColor2() {
            console.log('change arc 8')
            graphics.clear(); // Clear the previous graphics
            graphics.lineStyle(2, 0x4472c4); // Change line color to orange
            graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        }

        _this.background_demo.addChild(graphics);
    },

    drawArc7: function () {
        var graphics = _this.add.graphics(0, 0);

        var centerX = 431;
        var centerY = 300;
        var radius = 10;
        var startAngle = 0; // 0 degrees in radians
        var endAngle = Math.PI / -2; // 45 degrees in radians
        var anticlockwise = true; // Anti-clockwise direction

        graphics.lineStyle(2, 0x4472c4); // Line color and thickness

        graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);

        setTimeout(changeArcColor, 2500);

        function changeArcColor() {
            console.log('change arc 6')
            graphics.clear(); // Clear the previous graphics
            graphics.lineStyle(2, 0xe75480); // Change line color to 0x800080
            graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        }

        setTimeout(changeArcColor2, 7800);

        function changeArcColor2() {
            console.log('change arc 6')
            graphics.clear(); // Clear the previous graphics
            graphics.lineStyle(2, 0x800080); // Change line color to 
            graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        }

        setTimeout(changeArcColor3, 14000);

        function changeArcColor3() {
            console.log('change arc 6')
            graphics.clear(); // Clear the previous graphics
            graphics.lineStyle(2, 0xFFA500); // Change line color to 
            graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        }

        _this.background_demo.addChild(graphics);
    },

    drawArc8: function () {
        var graphics = _this.add.graphics(0, 0);

        var centerX = 422;
        var centerY = 300;
        var radius = 11;
        var startAngle = Math.PI; // 0 degrees in radians
        var endAngle = Math.PI / 2; // 90 degrees in radians
        var anticlockwise = true; // Clockwise direction

        graphics.lineStyle(2, 0x4472c4); // Line color and thickness

        graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);

        setTimeout(changeArcColor, 2500);

        function changeArcColor() {
            console.log('change arc 7')
            graphics.clear(); // Clear the previous graphics
            graphics.lineStyle(2, 0x800080); // Change line color to purple
            graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        }

        setTimeout(changeArcColor2, 7800);

        function changeArcColor2() {
            console.log('change arc 7')
            graphics.clear(); // Clear the previous graphics
            graphics.lineStyle(2, 0x4472c4); // Change line color to purple
            graphics.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        }

        _this.background_demo.addChild(graphics);
    },

    representAngles: function () {
        _this.text = _this.add.text(430, 180, "1", {
            font: "18px Akzidenz-Grotesk BQ",
            fill: "#4472c4"
        });

        _this.text2 = _this.add.text(470, 190, "2", {
            font: "18px Akzidenz-Grotesk BQ",
            fill: "#4472c4"
        });

        _this.text3 = _this.add.text(430, 230, "3", {
            font: "18px Akzidenz-Grotesk BQ",
            fill: "#4472c4"
        });

        _this.text4 = _this.add.text(470, 240, "4", {
            font: "18px Akzidenz-Grotesk BQ",
            fill: "#4472c4"
        });

        _this.text5 = _this.add.text(400, 260, "5", {
            font: "18px Akzidenz-Grotesk BQ",
            fill: "#4472c4"
        });

        _this.text6 = _this.add.text(445, 275, "6", {
            font: "18px Akzidenz-Grotesk BQ",
            fill: "#4472c4"
        });

        _this.text7 = _this.add.text(400, 310, "7", {
            font: "18px Akzidenz-Grotesk BQ",
            fill: "#4472c4"
        });

        _this.text8 = _this.add.text(440, 325, "8", {
            font: "18px Akzidenz-Grotesk BQ",
            fill: "#4472c4"
        });

        _this.background_demo.addChild(_this.text);
        _this.background_demo.addChild(_this.text2);
        _this.background_demo.addChild(_this.text3);
        _this.background_demo.addChild(_this.text4);
        _this.background_demo.addChild(_this.text5);
        _this.background_demo.addChild(_this.text6);
        _this.background_demo.addChild(_this.text7);
        _this.background_demo.addChild(_this.text8);
    },

    highLightCorrespondingAngles: function () {
        _this.time.events.add(1500, function () {
            _this.text = _this.add.text(430, 180, "5", {
                font: "18px  Akzidenz-Grotesk BQ",
                fill: "#6A0DAD"  // purple color
            });
        });

    }

}