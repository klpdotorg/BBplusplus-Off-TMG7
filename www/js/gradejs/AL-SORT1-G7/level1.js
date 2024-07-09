Game.AL_SORT1_G7level1 = function () { };


Game.AL_SORT1_G7level1.prototype =
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
        // _this.wronganssrc.setAttribute("src", window.baseUrl + "sounds/wrongans.mp3");
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

        _this.firecrack = document.createElement('audio');
        _this.firecracksrc = document.createElement('source');
        _this.firecracksrc.setAttribute("src", window.baseUrl + "sounds/firecracker_03.mp3");
        _this.firecrack.appendChild(_this.firecracksrc);

        _this.cartoon_whistle = document.createElement('audio');
        _this.cartoon_whistlesrc = document.createElement('source');
        _this.cartoon_whistlesrc.setAttribute("src", window.baseUrl + "sounds/cartoon_whistle.mp3");
        _this.cartoon_whistle.appendChild(_this.cartoon_whistlesrc);

        _this.failure_cartoon = document.createElement('audio');
        _this.failure_cartoonsrc = document.createElement('source');
        _this.failure_cartoonsrc.setAttribute("src", window.baseUrl + "sounds/failure_cartoon.mp3");
        _this.failure_cartoon.appendChild(_this.failure_cartoonsrc);

        _this.Ask_Question1 = _this.createAudio("AL_SORT1_G7_a1");
        _this.Ask_Question2 = _this.createAudio("AL_SORT1_G7_a2");

        telInitializer.gameIdInit("AL_SORT1_G7", gradeSelected);// first Tele call
        console.log(gameID, "gameID...");
    },

    create: function (game) {

        //* show the demo video
        // _this.time.events.add(1, function () {

        //     // _this.ViewDemoVideo();
        // });

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
        _this.noofAttempts = 0;//total attempt to answer q question
        _this.AnsTimerCount = 0;//total time
        _this.sceneCount = 0;//no of screen
        _this.questionid = null;//always 1

        _this.AnsTimerCount = 0;
        _this.count1 = 0;
        _this.trackCount = 0;
        _this.speakerbtn;
        _this.background;
        _this.count = 0;
        _this.starsGroup;

        _this.seconds = 0;
        _this.minutes = 0;
        _this.numberOfQuestions = 0;

        _this.counterForTimer = 0;

        _this.greenposinc = 0;  //counter for incrementing position of green ball position in array
        _this.yellowposinc = 0; //counter for incrementing position of yellow ball position in array
        _this.greentime = 2300;  //tween time for first green ball
        _this.yellowtime = 2300; //tween time for first yellow ball


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
            _this.state.start('grade7Algebra', true, false);
        });

        _this.speakerbtn = _this.add.sprite(600, 6, 'CommonSpeakerBtn');

        _this.speakerbtn.events.onInputDown.add(function () {
            telInitializer.tele_interactEvent("TOUCH", "speaker");
            if (_this.speakerbtnClicked == false && _this.rightbtn_Clicked == false) {
                _this.speakerbtn.inputEnabled = false;
                _this.speakerbtn.input.useHandCursor = false;
                _this.clickSound.play();

                _this.Ask_Question1.play();
                _this.Ask_Question1.addEventListener('ended', function () {
                    _this.Ask_Question2.play()
                });


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
        //_this.hintBtn = _this.add.sprite(670, 6, 'bulb');
        //_this.hintBtn.scale.setTo(0.5, 0.6);
        //_this.hintBtn.smoothed = false;
        //_this.hintBtnAnim = //_this.hintBtn.animations.add('hint');
        //_this.hintBtnAnim.play(15);
        //_this.hintBtnAnim.onComplete.add(function () {
            //_this.hintBtnAnim.play(15);
     //   }, _this);
        //_this.hintBtn.inputEnabled = false;
        // //_this.hintBtn.inputEnabled = true;
        // //_this.hintBtn.input.useHandCursor = true;

        //_this.hintBtn.events.onInputDown.add(function () {
            //// console.log("inside hintbutton function");
            //* show the demo video
            //_this.hintBtn.inputEnabled = false;
            //_this.hintBtn.input.useHandCursor = false;
            // _this.time.events.add(1, function () {
            //     //// console.log(//_this.hintBtn.inputEnabled, "status of hintBtn");
            //     _this.ViewDemoVideo();
            // });

      //  });

        _this.generateStarsForTheScene(6);

        //* start the game with first question
        _this.time.events.add(1000, _this.getQuestion);
    },

    createAudio: function (src) {
        audio = document.createElement('audio');
        audiosrc = document.createElement('source');
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/AL-SORT1-G7/" + _this.languageSelected + "/" + src + ".mp3");
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

        _this.Initial_randomizing();
        _this.DisplayQuestion();


        console.log("inside get question.....");
        //_this.hintBtn.inputEnabled = true;
        //_this.hintBtn.input.useHandCursor = true;
        _this.hint_flag = 1;

        _this.questionid = 1;
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

    Initial_randomizing: function () {

        //* 3xy2 ; 5y2x     — Ans : Like terms
        //* -2ab ; 8ba      — Ans : Like terms
        //* 2m ; 5n         — Ans : Unlike terms
        //* 2mn ; 3n        —Ans  : Unlike terms
        //* 10mn; mn2       —Ans  : Unlike terms
        //* 15x, –21x       — Ans : Like terms 

        //*we have to generate two strings and it can be like or unlike terms
        //* we can generate 3 like 3 unlike OR 4 like 2 unlike OR 2 like 4 unlike [ 3 types of possibilities]

        _this.Array0 = [];  //to store two digit randomised number for first string
        _this.Array1 = [];  //to store two digit randomised number for second string
        _this.Array2 = [];  //to store a randomised number to select a typpe of term pattern
        _this.Ques1 = [];   //for string 1
        _this.Ques2 = [];   //for string 2

        _this.choice = [0, 1, 2];   // for 3 different types of possibility as mentioned in above
        _this.shuffleArray(_this.choice);
        //console.log("Choice", _this.choice);

        //* we store a term pattern and respective like and unlike pattern for each

        if (_this.choice[0] == 0) {
            _this.question = [0, 1, 0, 1, 0, 1];  //3 like 3 unlike
            _this.variableArray = ["x", "n", "a", "yx", "nm", "ab", "xy" + "\u{00B2}", "x" + "\u{00B2}" + "y", "mn" + "\u{00B2}", "m" + "\u{00B2}" + "n", "a" + "\u{00B2}" + "b", "ab" + "\u{00B2}"];
            _this.likeArray = ["x", "n", "a", "xy", "mn", "ba", "y" + "\u{00B2}" + "x", "yx" + "\u{00B2}", "mn" + "\u{00B2}", "nm" + "\u{00B2}", "ba" + "\u{00B2}", "b" + "\u{00B2}" + "a"];
            _this.unlikeArray = ["xy", "n\u{00B2}", "ab", "y", "n", "a\u{00B2}", "y" + "\u{00B2}", "xy" + "\u{00B2}", "mn", "mn" + "\u{00B2}", "a", "a" + "\u{00B2}" + "b"];
        }
        else if (_this.choice[0] == 1) {
            _this.question = [0, 1, 1, 0, 1, 1];  //2 like 4 unlike
            _this.variableArray = ["y", "m", "b", "yx", "nm", "ab", "xy" + "\u{00B2}", "x" + "\u{00B2}" + "y", "mn" + "\u{00B2}", "m" + "\u{00B2}" + "n", "a" + "\u{00B2}" + "b", "ab" + "\u{00B2}"];
            _this.likeArray = ["y", "m", "b", "xy", "mn", "ba", "y" + "\u{00B2}" + "x", "yx" + "\u{00B2}", "mn" + "\u{00B2}", "nm" + "\u{00B2}", "ba" + "\u{00B2}", "b" + "\u{00B2}" + "a"];
            _this.unlikeArray = ["xy" + "\u{00B2}", "nm", "ab", "y", "n" + "\u{00B2}", "b\u{00B2}", "x" + "\u{00B2}", "xy" + "\u{00B2}", "mn", "m" + "\u{00B2}", "ab", "b" + "\u{00B2}"];
        }
        else if (_this.choice[0] == 2) {
            _this.question = [0, 1, 0, 0, 1, 0]; //4 like 2 unlike
            _this.variableArray = ["y", "n", "b", "yx", "nm", "ab", "xy" + "\u{00B2}", "x" + "\u{00B2}" + "y", "mn" + "\u{00B2}", "m" + "\u{00B2}" + "n", "a" + "\u{00B2}" + "b", "ab" + "\u{00B2}"];
            _this.likeArray = ["y", "n", "b", "xy", "mn", "ba", "y" + "\u{00B2}" + "x", "yx" + "\u{00B2}", "mn" + "\u{00B2}", "nm" + "\u{00B2}", "ba" + "\u{00B2}", "b" + "\u{00B2}" + "a"];
            _this.unlikeArray = ["y" + "\u{00B2}", "nm", "ab", "y", "n" + "\u{00B2}", "b\u{00B2}", "x" + "\u{00B2}", "xy" + "\u{00B2}", "mn", "m" + "\u{00B2}", "ba", "a" + "\u{00B2}"];
        }
        _this.shuffleArray(_this.question);
        console.log(_this.question);
        // console.log(_this.variableArray.length);
        //  console.log(_this.likeArray.length);
        //  console.log(_this.unlikeArray.length);

        for (let i = 0; i < 6; i++)   //to store two digit randomised number for first string
        {
            _this.aValue = Math.floor(Math.random() * 98) + 1;
            _this.sign = Math.floor(Math.random() * (3));
            if (_this.sign == 0)
                _this.aValue = _this.aValue;  //for positive numbers 
            else if (_this.sign == 1)
                _this.aValue = -_this.aValue;  // for negative numbers
            else
                _this.aValue = "";  //for zero

            _this.Array0.push(_this.aValue);
        }



        for (let i = 0; i < 6; i++)  //to store two digit randomised number for second string
        {
            _this.aValue = Math.floor(Math.random() * 98) + 1;
            _this.sign = Math.floor(Math.random() * (3));
            _this.term = Math.floor(Math.random() * (12));
            if (_this.sign == 0)
                _this.aValue = _this.aValue;  //for positive numbers 
            else if (_this.sign == 1)
                _this.aValue = -_this.aValue;  // for negative numbers
            else
                _this.aValue = "";  //for zero

            _this.Array1.push(_this.aValue);


            for (j = 0; j <= i - 1; j++)   //for no repetition of term pattern
            {
                if (_this.Array2[j] == _this.term) {
                    a = Math.floor(Math.random() * (12));
                    _this.term = a;
                    j = -1;
                }
            }
            _this.Array2.push(_this.term);
        }
        // console.log(_this.Array0, "array0");
        // console.log(_this.Array1, "array1");
        // console.log(_this.Array2, "array2");

        // x = 0 ; y =0  ;
        for (let i = 0; i < 6; i++) {
            if (_this.question[i] == 0)   //if like variabe store question in string 1 and like variable answer in string 2
            {
                // _this.a= _this.add.text(70 +x, 150+y,  "like" );
                _this.string1 = _this.Array0[i] + _this.variableArray[_this.Array2[i]];
                _this.string2 = _this.Array1[i] + _this.likeArray[_this.Array2[i]];

                _this.Ques1.push(_this.string1);
                _this.Ques2.push(_this.string2);


            }
            else   //unlike variabe, store question in string 1 and unlike variable answer in string 2
            {
                // _this.a= _this.add.text(70 + x, 150 +y ,  "unlike" );
                _this.string1 = _this.Array0[i] + _this.variableArray[_this.Array2[i]];
                _this.string2 = _this.Array1[i] + _this.unlikeArray[_this.Array2[i]];

                _this.Ques1.push(_this.string1);
                _this.Ques2.push(_this.string2);
            }

        }

        console.log(_this.Ques1);
        console.log(_this.Ques2);


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


    DisplayQuestion: function () {

        _this.Ask_Question1.play();
        _this.Ask_Question1.addEventListener('ended', function () {
            _this.Ask_Question2.play()
        });

        _this.panel = _this.add.image(20, 65, 'panel');  //the blue panel
        _this.bombG = _this.add.image(90, 449, 'bombG');
        _this.bombO = _this.add.image(810, 449, 'bombO');

        _this.greenCan = _this.add.sprite(92, 457, 'greenCanon');
        // _this.greenCan.scale.setTo(0.8, 1);
        // _this.greenCan = _this.add.sprite(0, 0, 'greenCanon'); 
        _this.greenCan.frame = 14;
        // _this.greenCan.anchor.setTo(0.5, 0.5);
        _this.greenCan.anchor.setTo(0.18, 0.87);
        //_this.greenCan.angle=40;


        _this.yellowCan = _this.add.sprite(850, 455, 'yellowCanon');
        // _this.yellowCan.scale.setTo(0.8, 1);
        _this.yellowCan.frame = 14;
        _this.yellowCan.anchor.setTo(0.76, 0.86);


        _this.wick1 = _this.add.image(74, 457, 'wick1');
        _this.wick2 = _this.add.image(864, 462, 'wick2');
        _this.wheelG = _this.add.image(86, 453, 'wheelG');
        _this.wheelG.scale.setTo(0.9, 1);
        _this.wheelO = _this.add.image(805, 453, 'wheelO');
        _this.wheelO.scale.setTo(0.9, 1);



        _this.greenCan.inputEnabled = true;
        _this.greenCan.input.useHandCursor = true;
        _this.greenCan.events.onInputDown.add(_this.greenshoot);

        _this.yellowCan.inputEnabled = true;
        _this.yellowCan.input.useHandCursor = true;
        _this.yellowCan.events.onInputDown.add(_this.yellowshoot);

        _this.forTween();  //calling function of pink ball to tween


    },

    forTween: function () {

        _this.sceneCount++;
        _this.noofAttempts = 0;

        if (_this.greenCan.inputEnabled == false) {
            _this.greenCan.inputEnabled = true;
            _this.greenCan.input.useHandCursor = true;
        }
        if (_this.yellowCan.inputEnabled == false) {
            _this.yellowCan.inputEnabled = true;
            _this.yellowCan.input.useHandCursor = true;
        }

        if (_this.count == 6)
            _this.lastScreenCelebration();
        else
        // if(_this.count != 6)
        {
            _this.pinkBall = _this.add.image(430, 20, 'pinkBall'); //add pink ball
            _this.pinkBall.scale.setTo(0.9, 1);

            //creating mask for pink ball
            // Create a new mask graphics object
            _this.mask2 = _this.game.add.graphics(457, 65); //create mask for pink ball so that it appears from half at beginning 

            // Draw a sector shape on the mask graphics object
            _this.mask2.beginFill(0xffffff);
            _this.mask2.moveTo(0, 0);
            _this.mask2.lineTo(0, 0);
            _this.mask2.arc(0, 0, 455, _this.game.math.degToRad(-180), _this.game.math.degToRad(0), true);
            _this.mask2.lineTo(0, 0);
            _this.mask2.endFill();

            // Apply the mask to the pink ball
            _this.pinkBall.mask = _this.mask2;


            len1 = _this.Ques1[_this.count].length;  //get the length of string 1 to set its position
            if (len1 == 6)
                _this.x1 = 18;    //x1 is for vertical tweeing position
            else if (len1 == 5)
                _this.x1 = 20;
            else if (len1 == 4)
                _this.x1 = 24;
            else if (len1 == 3)
                _this.x1 = 34;
            else if (len1 == 2)
                _this.x1 = 37;
            else
                _this.x1 = 42;



            len2 = _this.Ques2[_this.count].length;  //get the length of string 2 to set its position
            if (len2 == 6)
                _this.x2 = 18;   //x2 is for vertical tweeing position
            else if (len2 == 5)
                _this.x2 = 20;
            else if (len2 == 4)
                _this.x2 = 24;
            else if (len2 == 3)
                _this.x2 = 34;
            else if (len2 == 2)
                _this.x2 = 37;
            else
                _this.x2 = 42;

            _this.val1 = _this.add.text(_this.x1, 59, _this.Ques1[_this.count]);  //add val1 to pink ball
            _this.applyingStyle2(_this.val1);
            _this.pinkBall.addChild(_this.val1);
            //_this.val1.mask = _this.mask2;   //add mask so that it appears only inside the blue panel
            _this.val2 = _this.add.text(_this.x2, 26, _this.Ques2[_this.count]);  //add val1 to pink ball
            _this.applyingStyle1(_this.val2);
            _this.pinkBall.addChild(_this.val2);
            // _this.val2.mask = _this.mask2;  //add mask so that it appears only inside the blue panel


            //add tweening for pink ball and its two strings
            _this.tween = _this.add.tween(_this.pinkBall).to({ x: 430, y: 530 }, 15000, Phaser.Easing.Linear.None, true);
            //_this.tween1 = _this.add.tween(_this.val1).to({x: _this.x1, y: 520}, 13000, Phaser.Easing.Linear.None, true);
            // _this.tween2 = _this.add.tween(_this.val2).to({x: _this.x2, y: 520}, 14000, Phaser.Easing.Linear.None, true);
        }

        _this.tween.onComplete.add(function () {

            _this.ab = _this.Ques1.splice(_this.count, 1)[0];   //to shift the string1 to end of array remove it and push again 
            _this.Ques1.push(_this.ab);
            console.log(_this.Ques1);

            _this.abc = _this.Ques2.splice(_this.count, 1)[0];  //to shift the string2 to end of array remove it and push again 
            _this.Ques2.push(_this.abc);
            console.log(_this.Ques2);

            _this.abcd = _this.question.splice(_this.count, 1)[0];  //to shift the like or unlike variable to end of array remove it and push again 
            _this.question.push(_this.abcd);

            // if(_this.count == 6)
            //     _this.lastScreenCelebration();  //if all 6 are done last screen
            // else                  //if(_this.tweenFlag == 0)
            _this.forTween();  //else continue with next ball
        });

    },


    greenshoot: function () {
        _this.clickSound.play();
        _this.greenCan.inputEnabled = false;  //if one gun is cicked both should be disabled till next question
        _this.yellowCan.inputEnabled = false;

        //setting angle for different position of pink ball
        if (_this.pinkBall.y < 95) _this.angle = 28;
        else if (_this.pinkBall.y < 140) _this.angle = 33;
        else if (_this.pinkBall.y < 180) _this.angle = 37;
        else if (_this.pinkBall.y < 210) _this.angle = 42;
        else if (_this.pinkBall.y < 250) _this.angle = 44;
        else if (_this.pinkBall.y >= 251 && _this.pinkBall.y < 340)  //after pink.y is more than 340 the shoot should miss
            _this.angle = 44;
        console.log(_this.angle);



        // var angle = _this.game.physics.arcade.angleBetween(_this.greenCan, _this.pinkBall); 
        // // Set the rotation of the cannon sprite
        // _this.greenCan.angle = -(angle);
        // console.log(_this.greenCan.angle, "angle")

        // var vec= new Phaser.Point(_this.pinkBall.x-_this.greenCan.x+40, _this.pinkBall.y-_this.greenCan.y+450 );
        // var angle = Phaser.Math.radToDeg(Math.atan2(vec.y, vec.x));
        // _this.greenCan.angle = -angle;
        // console.log(_this.greenCan.angle, "angle")

        if (_this.question[_this.count] == 0)   //like equation to display on screen and see
        {

            _this.tweenGGun = _this.add.tween(_this.greenCan).to({ angle: _this.angle }, 1000, Phaser.Easing.Linear.None, true);
            _this.tweenGGun.onComplete.add(function () { //on completion of tween rotation for gun
                _this.cartoon_whistle.play();
                _this.wick1.visible = false;
                _this.green = _this.greenCan.animations.add('grenn');
                _this.green.play(14);

                _this.green.onComplete.add(function () {  //once the shooting anim is done
                    if (_this.pinkBall.y >= 340)   //pink.y is more than 340 the shoot should miss
                    {
                        _this.stopwhistle();
                        _this.failure_cartoon.play();
                        _this.greenCan.frame = 14;
                        _this.tweenGGunback = _this.add.tween(_this.greenCan).to({ angle: 0 }, 1000, Phaser.Easing.Linear.None, true);
                        _this.wick1.visible = true;
                    }
                    else {
                        _this.wick1.visible = true;
                        _this.greenblast = _this.add.sprite(_this.pinkBall.x - 30, _this.pinkBall.y - 20, 'greenBlast');
                        _this.greenblast.scale.setTo(0.7, 0.7);
                        //_this.greenanim = _this.greenblast.animations.add('greenblastt',[0,3,6,9,12,15,18,19,20,21,22,23,24], true);  //start the blast animation
                        _this.greenanim = _this.greenblast.animations.add('greenblastt', [0, 2, 3, 6, 7, 9, 11, 12, 15, 16, 18, 19, 20, 21, 22, 23, 24], true);  //start the blast animation

                        _this.greenanim.play(22);
                        _this.stopwhistle();
                        _this.firecrack.play();

                        _this.greenanim.onComplete.add(function () {
                            _this.greenCan.frame = 14;
                            _this.greenblast.destroy();
                        });

                        _this.addGreenBall();  //and call function for green ball generation nd tweening
                    }

                }, _this);
            });
        }
        else  //unlike equation so give wrong sound
        {
            _this.tweenGGunn = _this.add.tween(_this.greenCan).to({ angle: _this.angle }, 1000, Phaser.Easing.Linear.None, true);
            _this.tweenGGunn.onComplete.add(function () { //on completion of tween rotation for gun
                _this.tweenGGunnback = _this.add.tween(_this.greenCan).to({ angle: 0 }, 1000, Phaser.Easing.Linear.None, true);
                _this.noofAttempts ++;
                _this.wrongSound.play();  //if it was unlike equation then wrong answer so wrong sound
                _this.tween.timeScale = 4;
            });

        }

    },

    addGreenBall: function () {
        _this.greenBall = _this.add.image(_this.pinkBall.x, _this.pinkBall.y, 'greenBall');
        _this.val1.visible = false;
        _this.val2.visible = false;

        _this.tween.stop();   //stop the tween 

        _this.pinkBall.destroy();  //destroy pink ball
        _this.mask2.visible = false;
        _this.greenpos = [150, 250, 350, 450];  //x position for green balls to be placed

        _this.s1 = _this.add.text(_this.val1.x - 6, _this.val1.y - 5, _this.Ques1[_this.count]); //val1 in green ball
        _this.applyingStyle2(_this.s1);
        _this.s2 = _this.add.text(_this.val2.x - 6, _this.val2.y - 5, _this.Ques2[_this.count]); //val2 in green ball
        _this.applyingStyle1(_this.s2);
        _this.greenBall.addChild(_this.s1);
        _this.greenBall.addChild(_this.s2);
        //tween green ball and its values to end of blue panel in linear way
        _this.tweenA = _this.add.tween(_this.greenBall).to({ x: 430, y: 425 }, 2000, Phaser.Easing.Linear.None, true);
        _this.tweenA.onComplete.add(function () {
            //tween green ball and its values to end of gun in linear way
            _this.tweenD = _this.add.tween(_this.greenBall).to({ x: _this.greenpos[_this.greenposinc], y: 425 }, _this.greentime, Phaser.Easing.Linear.None, true);
            _this.tweenD.onComplete.add(function () {
                //once tweeing is done start star action
                _this.greenposinc++;
                _this.noofAttempts++;
                _this.count++;
                _this.starActions(_this.count1);
                _this.greenCan.frame = 14;
                _this.tweenX = _this.add.tween(_this.greenCan).to({ angle: 0 }, 1000, Phaser.Easing.Linear.None, true);


                _this.greentime = _this.greentime - 500;  //for next ball position decrement the tween time

            });

        });

    },

    yellowshoot: function () {
        _this.clickSound.play();
        _this.greenCan.inputEnabled = false;  //if one gun is cicked both should be disabled till next question
        _this.yellowCan.inputEnabled = false;

        //setting angle for different position of pink ball
        if (_this.pinkBall.y < 95) _this.angle1 = -28;
        else if (_this.pinkBall.y < 140) _this.angle1 = -33;
        else if (_this.pinkBall.y < 180) _this.angle1 = -37;
        else if (_this.pinkBall.y < 210) _this.angle1 = -42
        else if (_this.pinkBall.y < 250) _this.angle1 = -44;
        else if (_this.pinkBall.y >= 251 && _this.pinkBall.y < 340)  //after pink.y is more than 340 the shoot should miss
            _this.angle1 = -44;
        console.log(_this.angle1);

        if (_this.question[_this.count] == 1)   //to display on screen and see
        {
            _this.tweenYGun = _this.add.tween(_this.yellowCan).to({ angle: _this.angle1 }, 1000, Phaser.Easing.Linear.None, true);
            _this.tweenYGun.onComplete.add(function () {
                _this.cartoon_whistle.play();
                _this.wick2.visible = false;
                _this.yellow = _this.yellowCan.animations.add('yellowe');
                _this.yellow.play(14);


                _this.yellow.onComplete.add(function () {   //once the shooting anim is done
                    if (_this.pinkBall.y >= 340) {
                        _this.stopwhistle();
                        _this.failure_cartoon.play();   //pink.y is more than 340 the shoot should miss
                        _this.yellowCan.frame = 14;
                        _this.tweenYGunback = _this.add.tween(_this.yellowCan).to({ angle: 0 }, 1000, Phaser.Easing.Linear.None, true);
                        _this.wick2.visible = true;

                    }
                    else {
                        _this.wick2.visible = true;
                        _this.yellowblast = _this.add.sprite(_this.pinkBall.x - 30, _this.pinkBall.y - 20, 'yellowBlast');
                        _this.yellowblast.scale.setTo(0.7, 0.7);
                        _this.yellowanim = _this.yellowblast.animations.add('yellowblastt', [0, 2, 3, 6, 7, 9, 11, 12, 15, 16, 18, 19, 20, 21, 22, 23, 24], true);
                        _this.yellowanim.play(22);      //start the blast animation
                        _this.stopwhistle();
                        _this.firecrack.play();

                        _this.yellowanim.onComplete.add(function () {
                            _this.yellowCan.frame = 14;
                            _this.yellowblast.destroy();
                        });
                        _this.addYellowBall();   //and call function for yellow ball generation nd tweening
                    }


                }, _this);

            });
        }
        else {
            _this.tweenYGunn = _this.add.tween(_this.yellowCan).to({ angle: _this.angle1 }, 1000, Phaser.Easing.Linear.None, true);
            _this.tweenYGunn.onComplete.add(function () { //on completion of tween rotation for gun
                _this.tweenYGunnback = _this.add.tween(_this.yellowCan).to({ angle: 0 }, 1000, Phaser.Easing.Linear.None, true);
                _this.noofAttempts ++;
                _this.wrongSound.play();    //if it was like equation then wrong answer so wrong sound
                _this.tween.timeScale = 4;
            });


        }
    },

    addYellowBall: function () {
        _this.yellowBall = _this.add.image(_this.pinkBall.x, _this.pinkBall.y, 'orangeBall');
        _this.val1.visible = false;
        _this.val2.visible = false;

        _this.tween.stop();
        _this.pinkBall.destroy();
        _this.mask2.visible = false;
        _this.yellowpos = [705, 605, 505, 405];  //x position for yellow balls to be placed


        _this.s1 = _this.add.text(_this.val1.x - 6, _this.val1.y - 5, _this.Ques1[_this.count]);  //val1 in yellow ball
        _this.applyingStyle2(_this.s1);
        _this.s2 = _this.add.text(_this.val2.x - 6, _this.val2.y - 5, _this.Ques2[_this.count]);  //val2 in yellow ball
        _this.applyingStyle1(_this.s2);
        _this.yellowBall.addChild(_this.s1);
        _this.yellowBall.addChild(_this.s2);
        //tween yellow ball and its values to end of blue panel in linear way
        _this.tweenM = _this.add.tween(_this.yellowBall).to({ x: 430, y: 425 }, 2000, Phaser.Easing.Linear.None, true);
        _this.tweenM.onComplete.add(function () {
            //tween yellow ball and its values to end of gun in linear way
            _this.tweenP = _this.add.tween(_this.yellowBall).to({ x: _this.yellowpos[_this.yellowposinc], y: 425 }, _this.yellowtime, Phaser.Easing.Linear.None, true);
            _this.tweenP.onComplete.add(function () {
                //once tweeing is done start star action
                //_this.tweenFlag = 1;
                _this.yellowposinc++;
                _this.noofAttempts++;
                _this.count++;
                _this.starActions(_this.count1);
                _this.yellowCan.frame = 14;
                _this.tweenY = _this.add.tween(_this.yellowCan).to({ angle: 0 }, 1000, Phaser.Easing.Linear.None, true);

                _this.yellowtime = _this.yellowtime - 500;  //for next ball position decrement the tween time

            });

        });

    },


    lastScreenCelebration: function () {
        // _this.celebrationSound.play();
        //_this.starActions();
        _this.time.events.add(1000, () => {
            _this.state.start('score', true, false,gameID, _this.microConcepts);

            console.log("score");

        });
    },



    applyingStyle: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.visible = true;
    },

    applyingStyle2: function (target) {
        //target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#000000';
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '25px';
    },
    applyingStyle1: function (target) {
        //target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#FFFFFF';
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = '25px';
    },

    stopwhistle: function () {
        if (_this.cartoon_whistle) {
            _this.cartoon_whistle.pause();
            _this.cartoon_whistle.currentTime = 0.0;
        }

    },

    starActions: function (target) {
        telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);

        _this.AnsTimerCount = 0;
        _this.microConcepts = "AlgebraG7";

        console.log("starActions")
        _this.celebrationSound.play();
        starAnim = _this.starsGroup.getChildAt(_this.numberOfQuestions);
        starAnim.smoothed = false;
        anim = starAnim.animations.add('star', [0, 3, 6, 9, 12, 15, 17, 19, 22, 23, 24, 26, 28, 30, 32, 35], true);  //start the blast
        // anim = starAnim.animations.add('star');
        _this.numberOfQuestions++;
        anim.play(20);
        _this.count1++;
        anim.onComplete.add(function () {
            //starAnim.y = 10;
            _this.starsGroup.getChildAt(_this.numberOfQuestions - 1).frame = 35;
            _this.forTween();
        });
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
        _this.demoAudio1src.setAttribute("src", window.baseUrl + "questionSounds/AL-SORT1-G7/" + _this.languageSelected + "/V1.mp3");
        _this.demoAudio1.appendChild(_this.demoAudio1src);

        _this.demoAudio2 = document.createElement('audio');
        _this.demoAudio2src = document.createElement('source');
        _this.demoAudio2src.setAttribute("src", window.baseUrl + "questionSounds/AL-SORT1-G7/" + _this.languageSelected + "/V2.mp3");
        _this.demoAudio2.appendChild(_this.demoAudio2src);

        // QUESTION AUDIOS
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/AL-SORT1-G7/" +
            _this.languageSelected + "/V1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        _this.q2Sound = document.createElement('audio');
        _this.q2Soundsrc = document.createElement('source');
        _this.q2Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/AL-SORT1-G7/" +
            _this.languageSelected + "/V2.mp3");
        _this.q2Sound.appendChild(_this.q2Soundsrc);

        _this.q3Sound = document.createElement('audio');
        _this.q3Soundsrc = document.createElement('source');
        _this.q3Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/AL-SORT1-G7/" +
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



        // _this.demoVideo_1 = _this.add.video('AL-SORT1-G7_1');
        // _this.demoVideo_1.play(false);
        // _this.demoVideo_1.changeSource("demoVideos/AL-SORT1-G7_1.mp4");
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
        //     _this.demoVideo_2.changeSource("demoVideos/AL-SORT1-G7_2.mp4");  //* phaser needs this.to run in mobile
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
    }
}