Game.INT_ML2_G7level1 = function () { };


Game.INT_ML2_G7level1.prototype =
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

        _this.framechange = document.createElement('audio');
        _this.framechangesrc = document.createElement('source');
        _this.framechangesrc.setAttribute("src", window.baseUrl + "sounds/Frame_change_sound.mp3");
        _this.framechange.appendChild(_this.framechangesrc);

        _this.snapSound = document.createElement('audio');
        _this.snapSoundsrc = document.createElement('source');
        _this.snapSoundsrc.setAttribute("src", window.baseUrl + "sounds/snapSound.mp3");
        _this.snapSound.appendChild(_this.snapSoundsrc);

        _this.Ask_Question1 = _this.createAudio("INT_ML1_G7_a1");
        _this.Ask_Question2 = _this.createAudio("INT_ML1_G7_a2");
        _this.Ask_Question3 = _this.createAudio("INT_ML1_G7_a3");
        _this.Ask_Question4 = _this.createAudio("INT_ML1_G7_a4");

        //edited for baseurl apk
        telInitializer.gameIdInit("NS_INT_ML_2_G7", gradeSelected);// first Tele call
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
        _this.hint_flag = 0;

        // _this.AnsTimerCount = 0;
        _this.count1 = 0;
        _this.speakerbtn;
        _this.background;
        _this.starsGroup;

        _this.seconds = 0;
        _this.minutes = 0;
        _this.selectedAns1 = ''
        _this.selectedAns2 = ''
        _this.selectedAns3 = ''

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
        valuesCombinations = []

        _this.background = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'bg');
        //** include the background file, navigation bar, stars, timer objects.

        _this.navBar = _this.add.sprite(0, 0, 'navBar');

        _this.backbtn = _this.add.sprite(5, 6, 'backbtn');
        _this.backbtn.inputEnabled = true;
        _this.backbtn.input.useHandCursor = true;
        _this.backbtn.events.onInputDown.add(function () {
            //_this.stopVoice();
            _this.time.events.removeAll();
            _this.backbtn.events.onInputDown.removeAll();
            _this.time.events.add(50, function () {
                _this.state.start('grade7NumberSystems', true, false);
            });
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
                if (_this.Question_flag == 4) {
                    _this.Ask_Question4.play();
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

        // BULB
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
            _this.hintBtn.inputEnabled = false;
            _this.hintBtn.input.useHandCursor = false;
            //* show the demo video
            _this.time.events.add(1, function () {
                _this.ViewDemoVideo();
            });

        });

        _this.generateStarsForTheScene(6);

        //* start the game with first question
        _this.time.events.add(1000, _this.getQuestion);
    },


    createAudio: function (src) {
        audio = document.createElement('audio');
        audiosrc = document.createElement('source');
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/INT-ML2-G7/" + _this.languageSelected + "/" + src + ".mp3");
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
        _this.StoreArrayValues();
        _this.showInitialScreen()

        //* hintbtn will be true when the game is playing
        _this.hintBtn.inputEnabled = true;
        _this.hintBtn.input.useHandCursor = true;
        _this.hint_flag = 1;
        //edited for baseurl apk
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
    showfractionbox: function (addvar, yvalue) {
        _this.onebox = true
        _this.AnswerBox = _this.add.image(addvar, yvalue, 'Text box_3');
        // _this.AnswerBox.scale.setTo(1.3, 1)
        _this.AnswerBox.frame = 1;
        _this.twofractionboxes = false;

    },
    StoreArrayValues: function () {
        // Generate 6Aven numbers and multiples of five and 2 odd
        qnCounts = []
        denomCounts = [0, 0, 0, 0]
        multiplier = [];
        multiplicand = [];

        valuesCombinations = []

        var isOne = false;
        denom = [2, 4, 5, 10]  //only 2 denom should be repeated

        for (i = 0; i < 6; i++) {



            x = Math.floor(Math.random() * (12 - 1 + 1) + 1)
            while (multiplicand.includes(x)) {
                x = Math.floor(Math.random() * (12 - 1 + 1) + 1)

            }
            if (i == 5 && !multiplicand.includes(1)) {
                x = 1;
            }

            if (x <= 9)
                y = Math.floor(Math.random() * (8 - 1 + 1) + 1)
            else
                y = Math.floor(Math.random() * (4 - 1 + 1) + 1)


            if (i > 1) {
                while (multiplier[i - 1] == y) {
                    if (x <= 9)
                        y = Math.floor(Math.random() * (8 - 1 + 1) + 1)
                    else
                        y = Math.floor(Math.random() * (4 - 1 + 1) + 1)

                }
            }
            while ((x == 1 && y == 1) || y == 1) {
                if (x <= 9)
                    y = Math.floor(Math.random() * (8 - 1 + 1) + 1)
                else
                    y = Math.floor(Math.random() * (4 - 1 + 1) + 1)

            }

            multiplicand[i] = x;
            multiplier[i] = y;
            valuesCombinations[i] = x * (-y);

        }

        console.log(multiplicand);
        console.log(multiplier);
        console.log(valuesCombinations);
    },
    showInitialScreen: function () {
        //edited for baseurl apk
        _this.sceneCount++;
        // _this.AnsTimerCount = 0;
        _this.noofAttempts = 0;
        //....

        _this.part1 = true;
        _this.fourNotEntered = false;
        _this.finalAns = false;
        _this.finalval = '';
        _this.signVal = "";
        _this.box1Signgrp = _this.add.group();
        _this.box1SignArr = []
        _this.blueBox1 = _this.add.sprite(50, 70, 'blue box_1')
        _this.blueBox1.scale.setTo(0.9, 0.94)

        _this.blueBox2 = _this.add.sprite(50, 160, 'blue box_2')
        _this.blueBox2.scale.setTo(0.9, 0.94)
        _this.blueBox2.visible = false;

        _this.fillBox2 = _this.add.sprite(70, 200, 'fill box_1');
        _this.fillBox2.scale.setTo(0.89, 0.9)
        if (multiplicand[_this.count1] <= 2) {
            _this.fillBox1 = _this.add.sprite(70, 200, 'fill box_3');
            _this.fillBox1.scale.setTo(0.89, 0.9)

        }
        else if (multiplicand[_this.count1] <= 9) {
            _this.fillBox1 = _this.add.sprite(70, 200, 'fill box_2');
            _this.fillBox1.scale.setTo(0.89, 0.9)

        }
        else {

            _this.fillBox1 = _this.add.sprite(70, 200, 'fill box_1');
            _this.fillBox1.scale.setTo(0.89, 0.9)
        }

        _this.eraser = _this.add.sprite(243 + 38, 85 + 40, 'eraser')
        _this.eraser.scale.setTo(0.9, 0.93)
        _this.eraser.anchor.setTo(0.5)

        _this.eraser.inputEnabled = true;
        _this.eraser.input.enableDrag(true)
        _this.eraser.events.onDragStop.add(_this.eraserDrop, _this)
        _this.eraser.events.onDragStart.add(_this.eraserStart, _this)

        _this.plus = _this.add.sprite(35 + 10, 10 + 5, 'plus')
        _this.blueBox1.addChild(_this.plus)
        plus = _this.add.sprite(22, 18, 'plusMinusS');
        plus.frame = 1;
        _this.plus.addChild(plus)
        _this.plus.inputEnabled = true;
        // plus.input.enableDrag(true)
        _this.plus.events.onInputDown.add(_this.plusDrop, _this)
        _this.minus = _this.add.sprite(130, 10 + 5, 'minus')
        _this.blueBox1.addChild(_this.minus)
        minus = _this.add.sprite(22, 18, 'plusMinusS');
        _this.minus.addChild(minus)
        _this.minus.inputEnabled = true;
        // minus.input.enableDrag(true)
        _this.minus.events.onInputDown.add(_this.minusDrop, _this)

        _this.PlusMinus = _this.add.sprite(290 + 10, 10 + 5, 'plusMinusA')
        _this.blueBox1.addChild(_this.PlusMinus)
        _this.PlusMinus.alpha = 0.5;
        // _this.PlusMinus.inputEnabled = true;
        // _this.PlusMinus.events.onInputDown.add(_this.plusMinuPressed, _this)

        _this.questionBox = _this.add.sprite(450, 80, 'Text box_1');
        _this.questionBox.scale.setTo(0.8, 0.9)
        // _this.questionBox.frame = 1;


        if (multiplicand[_this.count1] > 9)
            _this.text2 = _this.add.text(36, 30, '+' + multiplicand[_this.count1])
        else
            _this.text2 = _this.add.text(43, 30, '+' + multiplicand[_this.count1])
        _this.applyingStyle(_this.text2)
        _this.questionBox.addChild(_this.text2)
        _this.text2.scale.setTo(1.2)
        _this.text2.fill = '#F0000';

        _this.textSign = _this.add.text(113, 30, 'X')
        _this.questionBox.addChild(_this.textSign)
        _this.textSign.scale.setTo(1.2)
        _this.textSign.fill = '#FF0000';


        if (multiplier[_this.count1] > 9)
            _this.text4 = _this.add.text(146, 30, '(- ' + multiplier[_this.count1] + ')')
        else
            _this.text4 = _this.add.text(153, 30, '(- ' + multiplier[_this.count1] + ')')
        _this.applyingStyle(_this.text4)
        _this.questionBox.addChild(_this.text4)
        _this.text4.scale.setTo(1.2)
        _this.text4.fill = '#F0000';

        _this.Question_flag = 1;
        if (_this.count1 == 0) {
            _this.Ask_Question1.play()
        }

        _this.rightbtn = _this.add.sprite(820, 90, 'TickBtn')
        _this.rightbtn.inputEnabled = true;
        _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked, _this)


    },
    eraserStart: function (target) {
        // _this.eraser.bringToTop();
        _this.world.bringToTop(_this.eraser)
        _this.eraser.scale.setTo(0.5)

    },
    eraserDrop: function (target) {
        _this.NotErased = true
        _this.box1SignArr.forEach(element => {
            if (element && _this.checkOverlap(element, target) && _this.NotErased) {
                // delete this
                console.log("insideeee ", element.pos)

                _this.box1SignArr[element.pos] = null;
                _this.NotErased = false;
                element.destroy()
                _this.eraser.scale.setTo(0.9, 0.93)
                target.x = 243 + 38;
                target.y = 85 + 40;

            }
        });
        _this.eraser.scale.setTo(0.9, 0.93)
        target.x = 243 + 38;
        target.y = 85 + 40;
    },
    plusDrop: function (target) {
        _this.clickSound.play();
        _this.plus.frame = 1;
        _this.minus.frame = 0;
        _this.PlusMinus.frame = 0;

        if (_this.fillBox1.children.length < 20) {
            var countt = _this.getArrCount()
            sign = _this.add.sprite(42 * countt + 15, 10, 'plusMinusS')
            sign.frame = 1;
            _this.fillBox1.addChild(sign)
            sign.pos = countt;
            _this.box1SignArr[countt] = sign
        }


    },
    minusDrop: function (target) {
        _this.clickSound.play();

        _this.minus.frame = 1;
        _this.plus.frame = 0;
        _this.PlusMinus.frame = 0;
        if (_this.fillBox1.children.length < 20) {

            var countt = _this.getArrCount()
            sign = _this.add.sprite(42 * countt + 15, 10, 'plusMinusS')
            _this.fillBox1.addChild(sign)
            sign.pos = countt;
            _this.box1SignArr[countt] = sign;
        }

    },
    plusMinuPressed: function () {
        _this.clickSound.play();
        _this.PlusMinus.frame = 1;
        _this.minus.frame = 0;
        _this.plus.frame = 0;

        _this.box1SignArr.forEach(element => {
            if (element) {
                if (element.frame == 0) {
                    element.frame = 1;
                    // _this.plus.inputEnabled = true
                }
                else {
                    element.frame = 0;
                    // _this.minus.inputEnabled = true
                }
            }
        });
    },
    getArrCount: function () {
        count = 0;
        for (i = 0; i < _this.box1SignArr.length; i++) {
            if (_this.box1SignArr[i])
                count++;
            if (!_this.box1SignArr[i]) {
                return count;
            }

        }
        return count;
    },
    getAnswer1: function () {
        count = 0;
        plusSignCount = 0;
        _this.box1SignArr.forEach(element => {
            if (element) {
                if (element.frame == 0)
                    count++;
                else
                    plusSignCount++;
                // signF = element.frame
            }
        });
        if ((count == 0 && plusSignCount == multiplicand[_this.count1]) || (count == multiplicand[_this.count1] && plusSignCount == 0)) {
            return true;
        }
        else {
            return false;
        }
    },
    rightbtnClicked: function () {
        _this.userselected = 0;
        _this.clickSound.play();
        _this.rightbtn.inputEnabled = false;
        _this.rightbtn.input.useHandCursor = false;
        _this.rightbtn_is_Clicked = true;

        if (_this.part1 == true) {
            _this.rightbtn.frame = 1;

            if (_this.getAnswer1()) {
                _this.counterCelebrationSound.play()
                _this.part1 = false;
                _this.part11 = true;

                _this.Ask_Question1.currentTime = 0;
                _this.Ask_Question1.pause()
                _this.time.events.add(500, () => {
                    _this.Question_flag = 2;

                    _this.minus.inputEnabled = false;
                    _this.plus.inputEnabled = false;
                    _this.eraser.inputEnabled = false;
                    _this.PlusMinus.inputEnabled = true;
                    _this.PlusMinus.alpha = 1
                    _this.PlusMinus.events.onInputDown.add(_this.plusMinuPressed, _this)
                    _this.minus.frame = 0;
                    _this.plus.frame = 0;
                    _this.time.events.add(500, () => {

                        if (_this.count1 == 0)
                            _this.Ask_Question2.play();
                        _this.clickSound.play()
                        _this.questionBox.frame = 1;

                    })
                    _this.rightbtn.inputEnabled = true;

                })
            }
            else {
                _this.wrongans.play();
                _this.rightbtn.frame = 0;
                _this.box1SignArr.forEach(element => {
                    if (element)
                        element.destroy();

                });
                _this.box1SignArr = [];
                _this.minus.inputEnabled = true;
                _this.plus.inputEnabled = true;
                _this.rightbtn.inputEnabled = true;
            }
        }
        else if (_this.part11 == true) {
            _this.rightbtn.frame = 1;
            _this.box1SignArr.forEach(element => {
                if (element)
                    signn = element.frame

            });
            if (signn == 0) {
                _this.counterCelebrationSound.pause();
                _this.counterCelebrationSound.currentTime = 0;
                _this.counterCelebrationSound.play()
                _this.part11 = false;
                _this.part2 = true;

                _this.time.events.add(500, () => {
                    _this.rightbtn.destroy();
                    _this.minus.destroy();
                    _this.plus.destroy();
                    _this.PlusMinus.destroy();
                    _this.eraser.destroy();

                    _this.reArrange()
                    _this.Ask_Question2.pause();
                    _this.Ask_Question2.currentTime = 0;
                    var time = !_this.isrearrange ? 400 : 200 * _this.box1SignArr.length
                    _this.time.events.add(time, () => {
                        if (_this.count1 == 0)
                            _this.Ask_Question3.play();
                        _this.Question_flag = 3;
                        _this.showfractionbox(810, 90);
                        _this.blueBox1.visible = false;
                        _this.blueBox2.visible = true;
                        _this.AnswerBox.scale.setTo(0.9);
                        _this.addNumberPad();
                    })

                })
            }
            else {
                _this.wrongans.play();
                _this.rightbtn.frame = 0;
                _this.rightbtn.inputEnabled = true;
            }
        }
        else if (_this.part2 == true) {

            if (_this.AnswerBox.name == multiplier[_this.count1]) {
                _this.counterCelebrationSound.pause();
                _this.counterCelebrationSound.currentTime = 0;
                _this.counterCelebrationSound.play()
                _this.part2 = false;
                _this.part3 = true;

                // _this.add.tween(_this.rightbtn).to({ alpha: 0 }, 700, 'Linear', true, 0);
                _this.numGroup.destroy()
                _this.multiply();
            }
            else {
                _this.wrongAnsClicked()
                _this.rightbtn.inputEnabled = true;

            }
        }
        else if (_this.part3 == true) {

            if (_this.AnswerBox.name == valuesCombinations[_this.count1]) {
                _this.part3 = false;
                _this.correctAns();

            }
            else {
                //edited for baseurl apk
                _this.noofAttempts++;

                _this.wrongAnsClicked()
                _this.rightbtn.inputEnabled = true;
            }
        }


    },
    multiply: function () {
        _this.fillBoxes = []
        if (multiplier[_this.count1] <= 4)
            multi = multiplier[_this.count1];
        else
            multi = 4;
        _this.countloop = 0;
        _this.Loop = _this.time.create(false);
        _this.Loop.loop(multiplicand[_this.count1] * 110, function () {
            if (multiplicand[_this.count1] <= 2) {
                // _this.fillBox1.destroy()
                _this.fillBox = _this.add.sprite(70, 200 + 65 * (_this.countloop + 1), 'fill box_3');
                _this.fillBox.scale.setTo(0.89, 0.9);
                _this.fillBoxes.push(_this.fillBox);

            }
            else if (multiplicand[_this.count1] <= 9) {
                // _this.fillBox1.destroy()
                _this.fillBox = _this.add.sprite(70, 200 + 65 * (_this.countloop + 1), 'fill box_2');
                _this.fillBox.scale.setTo(0.89, 0.9);
                _this.fillBoxes.push(_this.fillBox);

            }
            else {
                _this.fillBox = _this.add.sprite(70, 200 + 65 * (_this.countloop + 1), 'fill box_1');
                _this.fillBox.scale.setTo(0.89, 0.9);
                _this.fillBoxes.push(_this.fillBox);

            }

            for (let i = 0, k = _this.box1SignArr.length; i < multiplicand[_this.count1]; i++, k++) {
                _this.time.events.add(100 * i, function () {
                    sign = _this.add.sprite(42 * (i) + 15, 10, 'plusMinusS')
                    _this.fillBox.addChild(sign);
                });

            }
            _this.framechange.play()
            _this.countloop++;
            if (_this.countloop == multi - 1) {
                _this.Loop.stop();
                _this.Loop = null;
                _this.makeRightBoxes()
            }

        }, _this);
        _this.Loop.start();


    },
    makeRightBoxes: function () {
        if (multiplier[_this.count1] <= 4)
            _this.showFinalPart();
        else {
            multi = multiplier[_this.count1] - 4;
            _this.countloop = 0;
            _this.Loop2 = _this.time.create(false);
            _this.Loop2.loop(multiplicand[_this.count1] * 120, function () {
                if (multiplicand[_this.count1] <= 2) {
                    // _this.fillBox1.destroy()
                    _this.fillBox = _this.add.sprite(480, 200 + 65 * (_this.countloop), 'fill box_3');
                    _this.fillBox.scale.setTo(0.89, 0.9);
                    _this.fillBoxes.push(_this.fillBox);

                }
                else if (multiplicand[_this.count1] <= 9) {
                    // _this.fillBox1.destroy()
                    _this.fillBox = _this.add.sprite(480, 200 + 65 * (_this.countloop), 'fill box_2');
                    _this.fillBox.scale.setTo(0.89, 0.9);
                    _this.fillBoxes.push(_this.fillBox);

                }
                else {
                    _this.fillBox = _this.add.sprite(480, 200 + 65 * (_this.countloop), 'fill box_1');
                    _this.fillBox.scale.setTo(0.89, 0.9);
                    _this.fillBoxes.push(_this.fillBox);

                }

                for (let i = 0, k = _this.box1SignArr.length; i < multiplicand[_this.count1]; i++, k++) {
                    _this.time.events.add(100 * i, function () {
                        sign = _this.add.sprite(42 * (i) + 15, 10, 'plusMinusS')
                        _this.fillBox.addChild(sign);
                    });

                }
                _this.framechange.play()
                _this.countloop++;
                if (_this.countloop == multi) {
                    _this.Loop2.stop();
                    _this.Loop2 = null;
                    _this.time.events.add(600, _this.showFinalPart);

                }

            }, _this);
            _this.Loop2.start();
        }
    },
    showFinalPart: function () {
        _this.Ask_Question3.pause()
        _this.Ask_Question3.currentTime = 0;

        _this.Question_flag = 4;
        if (_this.count1 == 0)
            _this.Ask_Question4.play()
        _this.AnswerBox.destroy()
        _this.finalAns = true;
        _this.fourNotEntered = false;
        _this.finalval = "";
        _this.signVal = "";
        _this.selectedAns1 = ''
        _this.selectedAns2 = ''
        _this.selectedAns3 = ''
        _this.questionBox.destroy();
        _this.questionBox = _this.add.sprite(450, 80 - 5, 'Text box_2')
        _this.questionBox.scale.setTo(0.7, 0.9)
        _this.showfractionbox(635, 93 - 5)
        _this.AnswerBox.scale.setTo(1.1, 0.95);

        if (multiplicand[_this.count1] > 9)
            _this.text2 = _this.add.text(36 - 5, 30, '+' + multiplicand[_this.count1])
        else
            _this.text2 = _this.add.text(43 - 5, 30, '+' + multiplicand[_this.count1])
        _this.applyingStyle(_this.text2)
        _this.questionBox.addChild(_this.text2)
        _this.text2.scale.setTo(1.2)
        _this.text2.fill = '#F0000';

        _this.textSign = _this.add.text(113 - 5, 30, 'X')
        _this.questionBox.addChild(_this.textSign)
        _this.textSign.scale.setTo(1.2)
        _this.textSign.fill = '#FF0000';


        if (multiplier[_this.count1] > 9)
            _this.text4 = _this.add.text(146 - 5, 30, '(- ' + multiplier[_this.count1] + ')')
        else
            _this.text4 = _this.add.text(153 - 5, 30, '(- ' + multiplier[_this.count1] + ')')
        _this.applyingStyle(_this.text4)
        _this.questionBox.addChild(_this.text4)
        _this.text4.scale.setTo(1.2)
        _this.text4.fill = '#F0000';

        _this.equalsSign();
        _this.addNumberPad()
    },
    reArrange: function () {
        _this.isrearrange = false;
        for (i = 0; i < _this.box1SignArr.length; i++) {
            if (!_this.box1SignArr[i] && (_this.box1SignArr[i + 1])) {
                _this.isrearrange = true;
                _this.reArrangeBoxes();
                break
            }
        }

        _this.fillBox2.visible = false;

    },
    reArrangeBoxes: function () {
        _this.framechange.play();

        for (let i = 0; i < _this.box1SignArr.length; i++) {
            if (_this.box1SignArr[i]) {
                _this.time.events.add(100 * Math.abs(_this.box1SignArr.length - i - 1), function () {
                    _this.box1SignArr[i].destroy();
                });
            }
        }
        _this.time.events.add(100 * _this.box1SignArr.length, () => {

            if (multiplicand[_this.count1] <= 2) {
                _this.fillBox = _this.fillBox1;
                _this.fillBox1 = _this.add.sprite(70, 200, 'fill box_3');
                _this.fillBox1.scale.setTo(0.89, 0.9)
                _this.fillBox.destroy()

            }
            else if (multiplicand[_this.count1] <= 9) {
                _this.fillBox = _this.fillBox1;
                _this.fillBox1 = _this.add.sprite(70, 200, 'fill box_2');
                _this.fillBox1.scale.setTo(0.89, 0.9)
                _this.fillBox.destroy()

            }
        })

        for (let i = multiplicand[_this.count1] - 1, k = _this.box1SignArr.length; i >= (0); i--, k++) {
            _this.time.events.add(100 * k, function () {
                sign = _this.add.sprite(42 * (multiplicand[_this.count1] - i - 1) + 15, 10, 'plusMinusS')
                _this.fillBox1.addChild(sign);

            });

        }

    },
    equalsSign: function () {
        _this.eqSign1 = _this.add.graphics();
        _this.eqSign1.lineStyle(4, 0xF0000);
        _this.eqSign1.moveTo(605 + 5 - 3, 80 + 38);
        _this.eqSign1.lineTo(605 + 22 - 3, 80 + 38);

        _this.eqSign2 = _this.add.graphics();
        _this.eqSign2.lineStyle(4, 0xF0000);
        _this.eqSign2.moveTo(605 + 5 - 3, 80 + 48);
        _this.eqSign2.lineTo(605 + 22 - 3, 80 + 48);
    },

    wrongAnsClicked: function () {
        _this.wrongans.play();
        _this.disableInputs()
    },
    addNumberPad: function () {

        _this.objGroup = _this.add.group();
        _this.numGroup = _this.add.group();

        var bottomnumpadbg = _this.numGroup.create(0, 515, 'numpadbg');
        //bottomnumpadbg.anchor.setTo(0.5);
        bottomnumpadbg.scale.setTo(1, 1);

        // bottomnumpadbg.name = "numpadbg";

        _this.x = 40;
        // set the number pad invisible initially. only after tweening it is made visible
        _this.numGroup.visible = false;

        for (var i = 0; i < 12; i++) {
            _this.numbg = _this.numGroup.create(_this.x, 552, 'Numberpad');
            _this.numbg.anchor.setTo(0.5);
            _this.numbg.scale.setTo(0.8);
            _this.numbg.name = i;
            _this.numbg.frame = i;

            _this.numbg.inputEnabled = true;
            _this.numbg.input.useHandCursor = true;
            _this.numbg.events.onInputDown.add(_this.numClicked, _this);

            _this.x += 65;
        }

        _this.wrongbtn = _this.numGroup.create(_this.x + 10, 552, 'Numberpad');
        _this.wrongbtn.frame = 12;
        _this.wrongbtn.anchor.setTo(0.5);
        _this.wrongbtn.scale.setTo(0.8);
        _this.wrongbtn.name = "wrongbtn";
        _this.wrongbtn.inputEnabled = true;
        _this.wrongbtn.input.useHandCursor = true;
        _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked, _this);

        _this.rightbtn = _this.numGroup.create(_this.x + 80, 552, 'Numberpad');
        _this.rightbtn.frame = 13;
        _this.rightbtn.anchor.setTo(0.5);
        _this.rightbtn.scale.setTo(0.8);
        _this.rightbtn.name = "rightbtn";
        _this.rightbtn.inputEnabled = true;
        _this.rightbtn.input.useHandCursor = true;
        _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked, _this);

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
        _this.disableInputs()
    },
    disableInputs: function () {
        _this.AnswerBox.removeChild(_this.enterTxt);
        _this.selectedAns1 = '';
        _this.selectedAns2 = '';
        _this.selectedAns3 = ''
        _this.AnswerBox.name = '';
        _this.fourNotEntered = false;
        _this.signNotselected = false
        _this.finalval = '';
        _this.signVal = ''
    },
    numClicked: function (target) {
        _this.clickSound.play();
        var_selectedAns1 = " "
        var_selectedAns2 = " "
        var_selectedAns3 = " "
        if (target.name == 10) {
            target.name = '-'
            _this.signNotselected = true;
        }
        if (target.name == 11) {
            target.name = '+';
            _this.signNotselected = true;
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
        if (target.name == '+' || target.name == '-') {
            newstr = target.name + _this.finalval;
            _this.signVal = target.name;
        }
        else if (_this.fourNotEntered == false) {
            _this.finalval += target.name
        }
        if (target.name == '+')
            target.name = 11;
        if (target.name == '-')
            target.name = 10;

        // _this.finalAns == true && _this.fourNotEntered == false

        if (_this.fourNotEntered == false || (target.name == 11 || target.name == 10)) {
            if (_this.finalAns == true) {
                _this.AnswerBox.removeChild(_this.enterTxt);
                _this.enterTxt.visible = false;

                if ((_this.selectedAns3 === "" && _this.selectedAns2 === ""))
                    _this.enterTxt = _this.add.text(28, 11, "" + _this.signVal + _this.finalval, { fontSize: '30px' });
                else if (_this.selectedAns3 === "")
                    _this.enterTxt = _this.add.text(20, 11, "" + _this.signVal + _this.finalval, { fontSize: '30px' });

                else {
                    _this.enterTxt = _this.add.text(13, 11, "" + _this.signVal + _this.finalval, { fontSize: '30px' });
                }
                if (_this.signVal == '+')
                    _this.enterTxt.x -= 6;
                if (_this.finalval.length == 2 && (target.name != 11 || target.name != 10)) {
                    _this.fourNotEntered = true
                }
                else if (_this.finalval.length == 3) {
                    _this.fourNotEntered = true

                }
                _this.enterTxt.scale.setTo(1, 1.1)

                _this.applyingStyle(_this.enterTxt);
                _this.AnswerBox.addChild(_this.enterTxt);
                _this.AnswerBox.name = Number(_this.signVal + _this.finalval);
                _this.enterTxt.visible = true
            }
            else {
                _this.AnswerBox.removeChild(_this.enterTxt);
                if ((_this.finalval.length == 1 && _this.signVal == ""))
                    _this.enterTxt = _this.add.text(25, 12, "" + _this.signVal + _this.finalval, { fontSize: '30px' });
                else {
                    if (_this.signVal == '+')
                        _this.enterTxt = _this.add.text(12, 12, "" + _this.signVal + _this.finalval, { fontSize: '30px' });

                    else
                        _this.enterTxt = _this.add.text(16, 12, "" + _this.signVal + _this.finalval, { fontSize: '30px' });
                }
                if (_this.finalval.length == 1 && (target.name != 11 || target.name != 10)) {
                    _this.fourNotEntered = true
                }
                else if (_this.finalval.length == 2) {
                    _this.fourNotEntered = true

                }
                _this.enterTxt.scale.setTo(1, 1.2)
                _this.applyingStyle(_this.enterTxt);
                _this.AnswerBox.addChild(_this.enterTxt);
                _this.AnswerBox.name = Number(_this.signVal + _this.finalval);
            }
        }

    },
    tweenNumPad: function () {
        _this.numGroup.visible = true;
        _this.numpadTween.to({ x: 0, y: -43 }, 1000, 'Linear', true, 0);

    },
    ClearAll: function () {

        _this.fillBox1.destroy();
        _this.fillBoxes.forEach(element => {
            element.destroy()
        });
        _this.blueBox2.destroy();
        _this.numGroup.destroy();
        _this.questionBox.destroy();
        _this.AnswerBox.destroy();
        _this.eqSign1.destroy();
        _this.eqSign2.destroy();

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
            _this.time.events.add(2000, _this.ClearAll);
            _this.time.events.add(3000, _this.showInitialScreen);

        }
        else {
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
            _this.time.events.add(2000, _this.ClearAll);
            _this.time.events.add(2500, () => {
                _this.state.start('score', true, false, gameID, _this.microConcepts);
            })
        }
    },
    starActions: function (target) {
        //edited for baseurl apk
        _this.AnsTimerCount = 0;//total time
        _this.microConcepts = "Number SystemsG7";

        starAnim = _this.starsGroup.getChildAt(_this.count1);
        starAnim.smoothed = false;
        anim = starAnim.animations.add('star');
        _this.count1++;
        anim.play();
    },


    shutdown: function () {
        _this.stopVoice();
        //RI.gotoEndPage();
        //telInitializer.tele_end();
    },

    DemoVideo: function () {

        // DEMO AUDIOS
        //DVo: This game helps us multiply integers.
        _this.demoAudio1 = document.createElement('audio');
        _this.demoAudio1src = document.createElement('source');
        _this.demoAudio1src.setAttribute("src", window.baseUrl + "questionSounds/INT-ML2-G7/" + _this.languageSelected + "/INT_ML1_G7_d1.mp3");
        _this.demoAudio1.appendChild(_this.demoAudio1src);

        // DVO: If the multiplier is a negative number, then the counters are inverted. 
        //If the multiplier is a positive number, then the counters remain as they are.
        _this.demoAudio2 = document.createElement('audio');
        _this.demoAudio2src = document.createElement('source');
        _this.demoAudio2src.setAttribute("src", window.baseUrl + "questionSounds/INT-ML2-G7/" + _this.languageSelected + "/INT_ML1_G7_d2.mp3");
        _this.demoAudio2.appendChild(_this.demoAudio2src);

        // QUESTION AUDIOS
        //Vo:  Look at the multiplicand. Using the positive and negative counters, create a group of the given number.
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/INT-ML2-G7/" +
            _this.languageSelected + "/INT_ML1_G7_a1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        //VO: Observe the multiplier. Check if the counters need to be inverted. Press the check button to proceed.
        _this.q2Sound = document.createElement('audio');
        _this.q2Soundsrc = document.createElement('source');
        _this.q2Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/INT-ML2-G7/" +
            _this.languageSelected + "/INT_ML1_G7_a2.mp3");
        _this.q2Sound.appendChild(_this.q2Soundsrc);

        //VO: How many times should the multiplicand be repeated?
        _this.q3Sound = document.createElement('audio');
        _this.q3Soundsrc = document.createElement('source');
        _this.q3Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/INT-ML2-G7/" +
            _this.languageSelected + "/INT_ML1_G7_a3.mp3");
        _this.q3Sound.appendChild(_this.q3Soundsrc);

        //VO: Count and type the answer.
        _this.q4Sound = document.createElement('audio');
        _this.q4Soundsrc = document.createElement('source');
        _this.q4Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/INT-ML2-G7/" +
            _this.languageSelected + "/INT_ML1_G7_a4.mp3");
        _this.q4Sound.appendChild(_this.q4Soundsrc);

        _this.video_playing = 0;
        _this.showDemoVideo();
        //* call the function to show the video

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
        if (_this.q1Timer) clearTimeout(_this.q1Timer);
        if (_this.q3Timer) clearTimeout(_this.q3Timer);
        if (_this.q4Timer) clearTimeout(_this.q4Timer);

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
        if (_this.q4Sound) {
            console.log("removing the q4");
            _this.q4Sound.pause();
            _this.q4Sound = null;
            _this.q4Soundsrc = null;
        }

        _this.skip.events.onInputDown.removeAll();
        _this.skip.destroy();                //* skip button destroyed
    },

    dA1: function () {
        _this.q1Sound.play();
    },

    dA2: function () {
        _this.demoAudio2.play();
    },

    dA3: function () {
        _this.demoVideo_1.playbackRate = 1;
        _this.q3Timer = setTimeout(function ()    //* q2 js timer to play q2 after 15 seconds.
        {
            console.log("inside q3sound.....")
            clearTimeout(_this.q3Timer);         //* clear the time once its used.
            _this.q3Sound.play();
        }, 5000);

        _this.q4Timer = setTimeout(function ()    //* q2 js timer to play q2 after 15 seconds.
        {
            console.log("inside q4sound.....")
            clearTimeout(_this.q4Timer);         //* clear the time once its used.
            _this.q4Sound.play();
        }, 13000);
    },

    showDemoVideo: function () {

        _this.demoVideo_1 = _this.add.video('ML2_1');
        _this.demoVideo_1.play(false);
        _this.demoVideo_1.changeSource(window.baseUrl + "assets/demoVideos/MLP-02-G7.mp4");
        _this.video_playing = 1;
        _this.videoWorld_1 = _this.demoVideo_1.addToWorld();

        _this.demoAudio1.play();
        _this.demoAudio1.addEventListener('ended', _this.dA1);

        _this.q2Timer = setTimeout(function ()    //* q1 js timer to play q1 after 11 seconds.
        {
            console.log("inside q2sound.....")
            clearTimeout(_this.q2Timer);         //* clear the time once its used.
            _this.q2Sound.play();
            _this.demoVideo_1.playbackRate = 0;
        }, 14000);
        _this.q2Sound.addEventListener('ended', _this.dA2);
        _this.demoAudio2.addEventListener('ended', _this.dA3);
        //  _this.q3Sound.addEventListener('ended', _this.dA4);

        _this.demoVideo_1.onComplete.add(function () {
            console.log("audio2 ended - pause video1");
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