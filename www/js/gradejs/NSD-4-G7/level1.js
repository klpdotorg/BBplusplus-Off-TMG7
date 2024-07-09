Game.NSD_4_G7level1 = function () { };


Game.NSD_4_G7level1.prototype =
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

        _this.Ask_Question1 = _this.createAudio("NSD_4_G7_a1");
        _this.Ask_Question2 = _this.createAudio("NSD_4_G7_a2");
        _this.Ask_Question3 = _this.createAudio("NSD_4_G7_a3");
        _this.Ask_Question4 = _this.createAudio("NSD_4_G7_a4");

        //edited for baseurl apk
        telInitializer.gameIdInit("NSD_4_G7", gradeSelected);// first Tele call
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
        _this.hint_flag = 0;// * hint flag zero

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
            // _this.state.start('score');
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
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/NSD-4-G7/" + _this.languageSelected + "/" + src + ".mp3");
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
        _this.MakeSideBar();

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
    StoreArrayValues: function () {
        denomCom = []
        randarr = [1, 1, 1, 0, 0, 0]

        randarr = _this.shuffle(randarr)
        valuesCombinations = []
        dividendArr = []
        divisorArr = []
        for (i = 0; i < 6; i++) {

            {
                dividend = Number((Math.random() * 4).toFixed(2));
                while ((Math.round(dividend * 100) % 10 == 0 && Math.round(dividend * 100) % 100 == 0) || dividendArr.includes(dividend) || dividend < 0.1) {
                    dividend = Number((Math.random() * 4).toFixed(2));
                }


                max = 4
                divisor = Math.floor(Math.random() * (max - 2 + 1) + 2)
                ans = String((dividend) / divisor)

                while (denomCom.includes(Math.floor(dividend) + "" + divisor) || ans.split('.')[1].length > 2 || Math.floor(Number(ans)) > 0) {
                    dividend = Number((Math.random() * 4).toFixed(2));
                    while ((Math.round(dividend * 100) % 10 == 0 && Math.round(dividend * 100) % 100 == 0) || dividendArr.includes(dividend) || dividend < 0.1) {
                        dividend = Number((Math.random() * 4).toFixed(2));
                    }

                    max = 4
                    divisor = Math.floor(Math.random() * (max - 2 + 1) + 2)
                    ans = String((dividend) / divisor)

                }
                ans = String((dividend) / divisor)

            }

            dividendArr.push(dividend);
            divisorArr.push(divisor);
            denomCom.push(Math.floor(dividend) + "" + divisor)
            valuesCombinations.push((Math.round(dividend * 100) / divisor) / 100)

        }
        console.log(dividendArr)
        console.log(divisorArr)
        console.log(valuesCombinations)

    },

    MakeSideBar: function () {
        //edited for baseurl apk
        _this.sceneCount++;
        // _this.AnsTimerCount = 0;
        _this.noofAttempts = 0;
        //....

        _this.sideGray = _this.add.sprite(30, 170, 'panel_1');
        _this.finalPart = false;

        _this.greenStripe = _this.add.sprite(37, 184, 'greenBox')
        _this.greenStripe.scale.setTo(0.9);

        _this.orangeStripe = _this.add.sprite(75, 330, 'orangeBox')
        _this.orangeStripe.scale.setTo(0.9);

        _this.yellowStripe = _this.add.sprite(80, 190, 'yellowBox')
        _this.yellowStripe.scale.setTo(0.4, 0.46);

        _this.reverse = _this.add.sprite(50, 210, 'reverse');

        _this.sideGray.addChild(_this.reverse)
        _this.showInitialScreen();


    },
    showInitialScreen: function () {



        _this.grayBox = null;
        _this.grayBox2 = null;
        _this.Question_flag = 1;
        _this.rverseclick = 0;
        _this.part1 = true;
        _this.fourNotEntered = false;
        if (_this.count1 == 0)
            _this.Ask_Question1.play();

        _this.cubegrp = false;

        _this.questionBox = _this.add.sprite(70, 90, 'Text box_1')

        _this.workSpace = _this.add.sprite(235, 70, 'panel_2');
        _this.rightbtn = _this.add.sprite(860, 460, 'TickBtn')
        _this.rightbtn.inputEnabled = true;
        _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked, _this)

        _this.yellowBox = _this.add.sprite(12, 17, 'yellowTextbox')
        _this.questionBox.addChild(_this.yellowBox)
        _this.yellowBox.scale.setTo(1.7, 1)

        if (Math.round(dividendArr[_this.count1] * 100) % 10 == 0) {
            _this.n1 = _this.add.text(25, 19, dividendArr[_this.count1]);
            _this.yellowBox.scale.setTo(1.4, 1)
            _this.yellowBox.x = 18;
        }
        else
            _this.n1 = _this.add.text(15, 19, dividendArr[_this.count1])

        _this.questionBox.addChild(_this.n1)
        _this.applyingStyle(_this.n1);
        _this.n1.fill = '#FF0000';

        if (Math.round(dividendArr[_this.count1] * 100) % 10 == 0)
            _this.divideSign(140, 125)


        else
            _this.divideSign(146, 125)

        _this.yellowBox3 = _this.add.sprite(97, 17, 'yellowTextbox')
        _this.questionBox.addChild(_this.yellowBox3)
        _this.yellowBox3.visible = false;

        if (Math.round(dividendArr[_this.count1] * 100) % 10 == 0) {
            _this.n2 = _this.add.text(97, 19, divisorArr[_this.count1])
            _this.yellowBox3.x = 90;
        }
        else
            _this.n2 = _this.add.text(105, 19, divisorArr[_this.count1])

        _this.questionBox.addChild(_this.n2)
        _this.applyingStyle(_this.n2);
        _this.n2.fill = '#FF0000';


        // Colors group
        _this.orangeGrp = _this.add.group();
        _this.yellowGrp = _this.add.group();
        _this.greenGrp = []


        _this.EnableBoxes();
        _this.lastX = 270;
        _this.lastXArr = [0, 0];
        _this.lastX2Arr = [0, 0, 0, 0];


        _this.eraser = _this.add.sprite(140, 380, 'eraser');
        _this.eraser.inputEnabled = true;
        _this.eraser.input.enableDrag(true);
        _this.eraser.events.onDragUpdate.add(_this.eraserUpdate, _this);
        _this.eraser.events.onDragStop.add(_this.eraserDrop, _this);


        _this.fourNotEntered = false;
        _this.fouransLen = 0;
        _this.finalval = '';
        _this.dotselected = false;
        _this.grayGrp = _this.add.group();
        _this.gray = _this.add.group();
        _this.gray1 = _this.add.group();
        _this.gray2 = _this.add.group();
        _this.gray3 = _this.add.group();


        _this.grayBoxEmty = [];
        _this.grayBox2Emty = [];
        _this.grayBox3Emty = [];
        _this.grayBox4Emty = [];

        for (j = 0; j < 100; j++) {
            _this.grayBoxEmty[j] = -1;
            _this.grayBox2Emty[j] = -1;
            _this.grayBox3Emty[j] = -1;
            _this.grayBox4Emty[j] = -1;
        }


    },

    EnableBoxes: function () {
        _this.greenStripecpy = _this.add.sprite(37, 184, 'greenBox')
        _this.greenStripecpy.scale.setTo(0.9);

        _this.orangeStripecpy = _this.add.sprite(75, 330, 'orangeBox')
        _this.orangeStripecpy.scale.setTo(0.9);

        _this.yellowStripecpy = _this.add.sprite(80, 190, 'yellowBox')
        _this.yellowStripecpy.scale.setTo(0.4, 0.46);

        _this.yellowStripecpy.inputEnabled = true;
        _this.yellowStripecpy.input.enableDrag(true);
        _this.yellowStripecpy.events.onDragUpdate.add(_this.dragUpdate, _this);
        _this.yellowStripecpy.events.onDragStop.add(_this.dragStop, _this);

        _this.orangeStripecpy.inputEnabled = true;
        _this.orangeStripecpy.input.enableDrag(true);
        _this.orangeStripecpy.events.onDragUpdate.add(_this.dragUpdate, _this);
        _this.orangeStripecpy.events.onDragStop.add(_this.dragStop, _this);

        _this.greenStripecpy.inputEnabled = true;
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
    getEmptyIndex: function (arr, grpName) {
        countg = 0;
        flag = -1;
        if (grpName == 'green') {
            for (i = 0; i < 10; i++) {
                if (arr[countg] == -1) {
                    flag = 1;
                    for (m = countg; m < countg + 10; m++) {
                        if (arr[m] != -1) {
                            flag = -1;
                            break;
                        }
                    }
                    if (flag == 1)
                        return i;
                }
                countg += 10;
            }
        }
        else {
            for (i = 0; i < 100; i++) {
                if (arr[i] == -1) {
                    return i;
                }
            }
        }
    },
    dragUpdate: function (target) {
        target.bringToTop();
    },
    dragStop: function (target) {

        if (_this.checkOverlap(target, _this.workSpace)) {

            _this.snapSound.pause();
            _this.snapSound.currentTime = 0;

            if (target == _this.yellowStripecpy) {

                if (Math.floor(dividendArr[_this.count1]) < 2 && (_this.lastXArr[0] == 0 || _this.lastXArr[1] == 0)) {
                    if (_this.lastXArr[0] == 0) {
                        _this.lastX = 270;
                        _this.lastXArr[0] = 1;
                    }
                    else {
                        _this.lastX = 565;
                        _this.lastXArr[1] = 1;
                    }
                    newBox = _this.add.sprite(_this.lastX, 105, 'yellowBox')
                    newBox.scale.setTo(1, 1.16)
                    _this.yellowGrp.add(newBox);
                    _this.snapSound.play();

                }
                else if (Math.floor(dividendArr[_this.count1]) >= 2 && (_this.lastX2Arr[0] == 0 || _this.lastX2Arr[1] == 0 || _this.lastX2Arr[2] == 0 || _this.lastX2Arr[3] == 0)) {
                    if (_this.lastX2Arr[0] == 0) {
                        _this.lastX = 270;
                        _this.lastX2Arr[0] = 1;
                    }
                    else if (_this.lastX2Arr[1] == 0) {
                        _this.lastX = 430;
                        _this.lastX2Arr[1] = 1;
                    }
                    else if (_this.lastX2Arr[2] == 0) {
                        _this.lastX = 590;
                        _this.lastX2Arr[2] = 1;
                    }
                    else if (_this.lastX2Arr[3] == 0) {
                        _this.lastX = 750;
                        _this.lastX2Arr[3] = 1;
                    }
                    newBox = _this.add.sprite(_this.lastX, 125 - 25, 'yellowBox')
                    _this.yellowGrp.add(newBox);
                    newBox.scale.setTo(0.5, 0.58);
                    _this.snapSound.play();
                }

            }
            else if (target === _this.orangeStripecpy) {
                if ((Math.floor(dividendArr[_this.count1]) < 2 && ((_this.lastXArr[0] == 0 || _this.lastXArr[1] == 0 || _this.gray.children.length >= 1 || _this.gray1.children.length >= 1) && ((_this.getEmptyIndex(_this.grayBoxEmty, 'green') != undefined) || (_this.getEmptyIndex(_this.grayBox2Emty, 'green') != undefined)))) || (Math.floor(dividendArr[_this.count1]) >= 2 && ((_this.lastX2Arr[0] == 0 || _this.lastX2Arr[2] == 0 || _this.lastX2Arr[3] == 0 || _this.lastX2Arr[1] == 0 || _this.gray.children.length >= 1 || _this.gray1.children.length >= 1 || _this.gray3.children.length >= 1 || _this.gray2.children.length >= 1) && ((_this.getEmptyIndex(_this.grayBoxEmty, 'green') != undefined) || (_this.getEmptyIndex(_this.grayBox2Emty, 'green') != undefined) || (_this.getEmptyIndex(_this.grayBox3Emty, 'green') != undefined) || (_this.getEmptyIndex(_this.grayBox4Emty, 'green') != undefined))))) {

                    if (_this.getEmptyIndex(_this.grayBoxEmty, 'orange') != undefined) {
                        idx = _this.getEmptyIndex(_this.grayBoxEmty, 'orange');
                        _this.grayBoxEmty[idx] = 0;
                        grp = _this.gray;
                        arrBox = _this.grayBoxEmty;

                    }
                    else if (_this.getEmptyIndex(_this.grayBox2Emty, 'orange') != undefined) {
                        idx = _this.getEmptyIndex(_this.grayBox2Emty, 'orange');
                        _this.grayBox2Emty[idx] = 0;
                        grp = _this.gray1;
                        arrBox = _this.grayBox2Emty;


                    }
                    else if (_this.getEmptyIndex(_this.grayBox3Emty, 'orange') != undefined) {
                        idx = _this.getEmptyIndex(_this.grayBox3Emty, 'orange');
                        _this.grayBox3Emty[idx] = 0;
                        grp = _this.gray2;
                        arrBox = _this.grayBox3Emty;


                    }
                    else if (_this.getEmptyIndex(_this.grayBox4Emty, 'orange') != undefined) {
                        idx = _this.getEmptyIndex(_this.grayBox4Emty, 'orange');
                        _this.grayBox4Emty[idx] = 0;
                        grp = _this.gray3;
                        arrBox = _this.grayBox4Emty;


                    }
                    if (Math.floor(dividendArr[_this.count1]) < 2) {

                        if (grp.children.length > 0 && grp.getChildAt(0).x <= 550) _this.lastX = 270
                        else if (grp.children.length > 0) _this.lastX = 565
                        else if (_this.lastXArr[0] == 0) {
                            _this.lastX = 270;
                            _this.lastXArr[0] = 1;
                        }
                        else if (_this.lastXArr[1] == 0) {
                            _this.lastX = 565;
                            _this.lastXArr[1] = 1;
                        }

                    }
                    else {
                        if (grp.children.length > 0 && grp.getChildAt(0).x < 420) _this.lastX = 270
                        else if (grp.children.length > 0 && grp.getChildAt(0).x < 580) _this.lastX = 430
                        else if (grp.children.length > 0 && grp.getChildAt(0).x < 740) _this.lastX = 590
                        else if (grp.children.length > 0) _this.lastX = 750

                        else if (_this.lastX2Arr[0] == 0) {
                            _this.lastX = 270;
                            _this.lastX2Arr[0] = 1;
                        }
                        else if (_this.lastX2Arr[1] == 0) {
                            _this.lastX = 430;
                            _this.lastX2Arr[1] = 1;
                        }
                        else if (_this.lastX2Arr[2] == 0) {
                            _this.lastX = 590;
                            _this.lastX2Arr[2] = 1;
                        }
                        else if (_this.lastX2Arr[3] == 0) {
                            _this.lastX = 750;
                            _this.lastX2Arr[3] = 1;
                        }

                    }

                    if (Math.floor(dividendArr[_this.count1] < 2)) {

                        y = idx % 10 != 0 ? idx % 10 * 25 + 6 * (Math.floor(idx % 10) - 1) : -6
                        x = idx >= 10 ? 21.7 * Math.floor(idx / 10) + 5 * (Math.floor(idx / 10) - 1) : -7

                        if (idx >= 10 && idx < 20) {
                            x -= 1;
                        }
                        if (idx >= 90) {
                            x += 1;
                        }

                        x = Math.round(x);
                        newBox = _this.add.sprite(x, y, 'orangeBox')
                        newBox.scale.setTo(1.15, 1.3)
                        // newBox.scale.setTo(1, 1.16)
                        newBox.y -= 20
                    }
                    else {
                        y = idx % 10 != 0 ? idx % 10 * 9 + 6.8 * (Math.floor(idx % 10) - 1) : -5
                        x = idx >= 10 ? 10 * Math.floor(idx / 10) + 5 * (Math.floor(idx / 10) - 1) : -5

                        if (idx >= 10 && idx < 20) {
                            x -= 1;
                        }
                        if (idx >= 90) {
                            x += 1;
                        }

                        x = Math.round(x);
                        newBox = _this.add.sprite(x, y - 25, 'orangeBox')
                        newBox.scale.setTo(0.62, 0.67)
                        newBox.y += 3;

                    }

                    newBox.idx = idx;
                    grp.addChild(newBox);

                    newBox.x += _this.lastX;
                    newBox.y += 125;

                    _this.snapSound.play();

                    if (idx >= 9) {
                        count = 0;
                        st = 0, end = 0;
                        arr = []
                        for (i = 0; i < grp.children.length; i++) {
                            if (grp.getChildAt(i).key == 'orangeBox' && grp.getChildAt(i).visible == true) {
                                count++;
                                if (count == 1) st = grp.getChildAt(i).idx;
                                arr.push(i);
                                if (count == 10) {
                                    end = i;
                                    break;
                                }
                            }
                        }
                        if (count == 10) {
                            _this.showOrangeTGreen(Math.floor(st / 10), arr, grp, arrBox)
                        }
                    }
                }

            }
            else if (target === _this.greenStripecpy) {
                var arrBox;
                if ((Math.floor(dividendArr[_this.count1]) < 2 && ((_this.lastXArr[0] == 0 || _this.lastXArr[1] == 0 || _this.gray.children.length >= 1 || _this.gray1.children.length >= 1) && ((_this.getEmptyIndex(_this.grayBoxEmty, 'green') != undefined) || (_this.getEmptyIndex(_this.grayBox2Emty, 'green') != undefined)))) || (Math.floor(dividendArr[_this.count1]) >= 2 && ((_this.lastX2Arr[0] == 0 || _this.lastX2Arr[2] == 0 || _this.lastX2Arr[3] == 0 || _this.lastX2Arr[1] == 0 || _this.gray.children.length >= 1 || _this.gray1.children.length >= 1 || _this.gray3.children.length >= 1 || _this.gray2.children.length >= 1) && ((_this.getEmptyIndex(_this.grayBoxEmty, 'green') != undefined) || (_this.getEmptyIndex(_this.grayBox2Emty, 'green') != undefined) || (_this.getEmptyIndex(_this.grayBox3Emty, 'green') != undefined) || (_this.getEmptyIndex(_this.grayBox4Emty, 'green') != undefined))))) {


                    if (_this.getEmptyIndex(_this.grayBoxEmty, 'green') != undefined) {
                        idx = _this.getEmptyIndex(_this.grayBoxEmty, 'green');
                        for (j = idx * 10; j < idx * 10 + 10; j++) {
                            _this.grayBoxEmty[j] = 0;
                        }
                        arrBox = _this.grayBoxEmty;
                        grp = _this.gray;

                    }
                    else if (_this.getEmptyIndex(_this.grayBoxEmty, 'green') == undefined) {
                        idx = _this.getEmptyIndex(_this.grayBox2Emty, 'green');
                        for (j = idx * 10; j < idx * 10 + 10; j++) {
                            _this.grayBox2Emty[j] = 0;
                        }
                        arrBox = _this.grayBox2Emty;
                        grp = _this.gray1;


                    }
                    else if (_this.getEmptyIndex(_this.grayBox2Emty, 'green') == undefined) {
                        idx = _this.getEmptyIndex(_this.grayBox3Emty, 'green');
                        for (j = idx * 10; j < idx * 10 + 10; j++) {
                            _this.grayBox3Emty[j] = 0;
                        }
                        arrBox = _this.grayBox3Emty;
                        grp = _this.gray2;

                    }
                    else if (_this.getEmptyIndex(_this.grayBox3Emty, 'green') == undefined) {
                        idx = _this.getEmptyIndex(_this.grayBox4Emty, 'green');
                        for (j = idx * 10; j < idx * 10 + 10; j++) {
                            _this.grayBox4Emty[j] = 0;
                        }
                        arrBox = _this.grayBox4Emty;
                        grp = _this.gray3


                    }

                    if (Math.floor(dividendArr[_this.count1]) < 2) {

                        if (grp.children.length > 0 && grp.getChildAt(0).x < 550) _this.lastX = 270
                        else if (grp.children.length > 0) _this.lastX = 565
                        else if (_this.lastXArr[0] == 0) {
                            _this.lastX = 270;
                            _this.lastXArr[0] = 1;
                        }
                        else if (_this.lastXArr[1] == 0) {
                            _this.lastX = 565;
                            _this.lastXArr[1] = 1;
                        }

                    }
                    else {
                        if (grp.children.length > 0 && grp.getChildAt(0).x < 420) _this.lastX = 270
                        else if (grp.children.length > 0 && grp.getChildAt(0).x < 580) _this.lastX = 430
                        else if (grp.children.length > 0 && grp.getChildAt(0).x < 740) _this.lastX = 590
                        else if (grp.children.length > 0) _this.lastX = 750

                        else if (_this.lastX2Arr[0] == 0) {

                            _this.lastX = 270;
                            _this.lastX2Arr[0] = 1;
                        }
                        else if (_this.lastX2Arr[1] == 0) {
                            _this.lastX = 430;
                            _this.lastX2Arr[1] = 1;
                        }
                        else if (_this.lastX2Arr[2] == 0) {
                            _this.lastX = 590;
                            _this.lastX2Arr[2] = 1;
                        }
                        else if (_this.lastX2Arr[3] == 0) {
                            _this.lastX = 750;
                            _this.lastX2Arr[3] = 1;
                        }

                    }


                    if (Math.floor(dividendArr[_this.count1] < 2)) {
                        x = idx > 0 ? 22 * idx + 5 * (idx - 1) : -6
                        newBox = _this.add.sprite(x, -6, 'greenBox');
                        newBox.idx = idx * 10;
                        newBox.scale.setTo(1, 1.16)
                        newBox.y -= 20

                    }
                    else {
                        x = idx > 0 ? 10 * idx + 5 * (idx - 1) : -5
                        newBox = _this.add.sprite(x, -6 - 25, 'greenBox');
                        newBox.idx = idx * 10;
                        newBox.scale.setTo(0.55, 0.58)
                        newBox.y += 4;
                    }

                    _this.greenGrp.push(newBox);
                    grp.addChild(newBox);
                    newBox.x += _this.lastX;
                    newBox.y += 125;

                    _this.world.bringToTop(_this.greenGrp);
                    _this.snapSound.play();

                    CompleteWhole = true;
                    for (i = 0; i < 100; i++) {
                        if (arrBox[i] == -1) {
                            CompleteWhole = false;
                            break
                        }
                    }
                    if (CompleteWhole == true) {
                        _this.convertGreenToYellow(grp, arrBox);
                    }
                }

            }
        }
        _this.reCreatehrGrp();

    },
    convertGreenToYellow: function (grp, arrname) {
        if (grp.getChildAt(0).x < 420) {
            xpos = 270;
        }
        else if (grp.getChildAt(0).x < 580) {
            xpos = Math.floor(dividendArr[_this.count1]) >= 2 ? 430 : 565
        }
        else if (grp.getChildAt(0).x < 740) {
            xpos = 590
        }
        else {
            xpos = 750
        }

        _this.convert = _this.time.create(false);
        timeC = 0;
        _this.convert.loop(50, function () {
            while (grp.getChildAt(0) && grp.getChildAt(0).key == 'orangeBox')
                grp.getChildAt(0).destroy();
            if (grp.getChildAt(0))
                grp.getChildAt(0).destroy();

            timeC++;
            _this.framechange.play()
            if (grp.children.length == 0) {
                _this.convert.stop();
                _this.convert = null;

                newBox = _this.add.sprite(xpos, 105, 'yellowBox')
                _this.yellowGrp.add(newBox);
                newBox.scale.setTo(1, 1.15)

                if (Math.floor(dividendArr[_this.count1]) >= 2) {
                    newBox.scale.setTo(0.5, 0.58)
                    newBox.y -= 25;
                    newBox.y += 20
                }

                _this.world.bringToTop(_this.yellowGrp);
                _this.snapSound.play();

                for (j = 0; j < 100; j++) {

                    arrname[j] = -1;
                }

            }
        }, _this);
        _this.convert.start();
    },
    showOrangeTGreen: function (st, arr, grp, arrBox) {

        _this.convert = _this.time.create(false);
        timeC = 0;
        ypos = 0
        _this.convert.loop(50, function () {
            grp.getChildAt(arr[timeC]).visible = false;
            timeC++;
            _this.framechange.play()
            if (timeC == 10) {
                _this.convert.stop();
                _this.convert = null;

                idx = st >= 10 ? st % 10 : st;
                if (Math.floor(dividendArr[_this.count1]) >= 2) {
                    x = idx > 0 ? 10 * idx + 5 * (idx - 1) : -5
                    ypos += 4

                }
                else
                    x = idx > 0 ? 22 * idx + 5 * (idx - 1) : -6
                newBox = _this.add.sprite(x + _this.lastX, -6 + 105 + ypos, 'greenBox');
                newBox.idx = idx * 10;
                newBox.scale.setTo(1, 1.16)

                if (Math.floor(dividendArr[_this.count1]) >= 2) {
                    newBox.scale.setTo(0.55, 0.58)
                    newBox.y -= 25
                    newBox.y += 20
                }

                _this.greenGrp.push(newBox);
                grp.addChild(newBox);
                _this.world.bringToTop(_this.greenGrp);
                _this.snapSound.play();

                CompleteWhole = true;
                for (i = 0; i < 100; i++) {
                    if (arrBox[i] == -1) {
                        CompleteWhole = false;
                        break
                    }
                }
                if (CompleteWhole == true) {
                    _this.convertGreenToYellow(grp, arrBox);
                }

            }
        }, _this);
        _this.convert.start();
    },
    eraserUpdate: function (target) {
        _this.world.bringToTop(_this.eraser)
        _this.eraser.scale.setTo(0.8)
    },
    eraserDrop: function (target) {
        _this.NotErased = true

        if ((_this.yellowGrp.length > 0 && _this.checkOverlap(target, _this.yellowGrp)) || (_this.checkOverlap(target, _this.gray)) || (_this.checkOverlap(target, _this.gray1)) || (_this.checkOverlap(target, _this.gray2)) || (_this.checkOverlap(target, _this.gray3))) {
            if (_this.checkOverlap(target, _this.yellowGrp)) {
                for (i = 0; i < _this.yellowGrp.children.length; i++) {
                    if (_this.checkOverlap(target, _this.yellowGrp.getChildAt(i))) {

                        if (Math.floor(dividendArr[_this.count1]) < 2) {
                            if (_this.yellowGrp.getChildAt(i).x == 270) {
                                _this.lastXArr[0] = 0;
                            }
                            else {

                                _this.lastXArr[1] = 0;
                            }
                            _this.yellowGrp.getChildAt(i).destroy();
                            break;
                        }
                        else if (Math.floor(dividendArr[_this.count1]) >= 2) {
                            if (_this.yellowGrp.getChildAt(i).x == 270) {
                                _this.lastX2Arr[0] = 0;
                            }
                            else if (_this.yellowGrp.getChildAt(i).x == 430) {
                                _this.lastX2Arr[1] = 0;
                            }
                            else if (_this.yellowGrp.getChildAt(i).x == 590) {
                                _this.lastX2Arr[2] = 0;
                            }
                            else if (_this.yellowGrp.getChildAt(i).x == 750) {
                                _this.lastX2Arr[3] = 0;
                            }
                            _this.yellowGrp.getChildAt(i).destroy();
                            break;
                        }
                    }
                }
            }
            if (_this.checkOverlap(target, _this.gray) || _this.checkOverlap(target, _this.gray1) || (_this.checkOverlap(target, _this.gray2) || (_this.checkOverlap(target, _this.gray3)))) {
                if (_this.checkOverlap(target, _this.gray)) {
                    grp = _this.gray;
                    arrname = _this.grayBoxEmty;
                }
                if (_this.checkOverlap(target, _this.gray1)) {
                    grp = _this.gray1;
                    arrname = _this.grayBox2Emty;
                }
                if (_this.checkOverlap(target, _this.gray2)) {
                    grp = _this.gray2;
                    arrname = _this.grayBox3Emty;
                }
                if (_this.checkOverlap(target, _this.gray3)) {
                    grp = _this.gray3;
                    arrname = _this.grayBox4Emty;
                }

                for (i = 0; i < grp.children.length; i++) {
                    if (_this.checkOverlap(target, grp.getChildAt(i)) && grp.getChildAt(i).visible == true) {
                        if (grp.getChildAt(i).key == 'greenBox') {
                            for (j = grp.getChildAt(i).idx; j < grp.getChildAt(i).idx + 10; j++) {
                                arrname[j] = -1;
                            }
                        } else {
                            arrname[grp.getChildAt(i).idx] = -1;
                        }
                        if (grp.children.length == 1) {
                            if (Math.floor(dividendArr[_this.count1]) >= 2) {
                                if (grp.getChildAt(0).x < 420) {
                                    _this.lastX2Arr[0] = 0;
                                    _this.lastXArr[0] = 0;
                                }
                                else if (grp.getChildAt(0).x < 580) {
                                    _this.lastX2Arr[1] = 0;
                                    _this.lastXArr[1] = 0;
                                }
                                else if (grp.getChildAt(0).x < 740) {
                                    _this.lastX2Arr[2] = 0;
                                }
                                else {
                                    _this.lastX2Arr[3] = 0;
                                }
                            }
                            else {
                                if (grp.getChildAt(0).x < 550) {
                                    _this.lastXArr[0] = 0;
                                }
                                else {
                                    _this.lastXArr[1] = 0;
                                }
                            }
                        }
                        grp.getChildAt(i).destroy();
                        break;
                    }
                }
            }

            target.x = 140;
            target.y = 380;

        }

        target.x = 140;
        target.y = 380;
        _this.eraser.scale.setTo(1);

    },

    showReverseHand: function () {

        _this.hand = _this.add.sprite(105, 405, 'hand');
        _this.hand.scale.setTo(0.55);
        _this.reverse.frame = 1;


        _this.time.events.add(1200, () => {
            _this.clickSound.play()
            _this.reverse.frame = 0;
            _this.hand.scale.setTo(0.5);
            _this.time.events.add(800, () => {
                _this.hand.scale.setTo(0.55);
            })

        })

        _this.time.events.add(3200, () => {
            _this.hand.destroy();
            _this.reverse.frame = 1;
            _this.reverse.inputEnabled = true;
            _this.reverse.events.onInputDown.add(_this.reverseClicked, _this);
        })

    },

    reverseClicked: function () {
        _this.clickSound.play();
        _this.reverse.frame = _this.reverse.frame == 0 ? 1 : 0;
        _this.reverse.inputEnabled = false;
        _this.time.events.add(500, _this.transformation);
        _this.counterCelebrationSound.pause();
        _this.counterCelebrationSound.currentTime = 0;
        _this.counterCelebrationSound.play();

    },

    reArrangeScreen: function () {
        mtyFound = false

        for (i = 0; i < 99; i++) {
            if (_this.grayBoxEmty[i] == -1 && _this.grayBoxEmty[i + 1] == 0) {
                mtyFound = true;
                break;
            }
            else if (_this.grayBox2Emty[i] == -1 && _this.grayBox2Emty[i + 1] == 0) {
                mtyFound = true;
                break;
            }
            else if (_this.grayBox3Emty[i] == -1 && _this.grayBox3Emty[i + 1] == 0) {
                mtyFound = true;
                break;
            }
            else if (_this.grayBox4Emty[i] == -1 && _this.grayBox4Emty[i + 1] == 0) {
                mtyFound = true;
                break;
            }
        }
        if (mtyFound == false && _this.yellowGrp.length > 0) {
            if (_this.yellowGrp.getChildAt(0).x != 270) {
                mtyFound = true
            }
            else if (Math.floor(dividendArr[_this.count1]) >= 2) {
                if (_this.yellowGrp.length >= 2 && _this.yellowGrp.getChildAt(1).x != 430) mtyFound = true;
                if (_this.yellowGrp.length >= 3 && _this.yellowGrp.getChildAt(2).x != 590) mtyFound = true;
                if (_this.yellowGrp.length >= 4 && _this.yellowGrp.getChildAt(3).x != 750) mtyFound = true;
            }
        }
        if (mtyFound == false && (_this.yellowGrp.length == 0 && _this.gray.getChildAt(0).x > 550))
            mtyFound = true;
        if (mtyFound) {
            _this.yellowGrp.destroy();
            _this.gray.destroy();
            _this.gray1.destroy();
            _this.gray2.destroy();
            _this.gray3.destroy();
            _this.gray = _this.add.group();
            _this.gray1 = _this.add.group();
            _this.gray2 = _this.add.group();
            _this.gray3 = _this.add.group();

            _this.orangeGrp = _this.add.group();
            _this.yellowGrp = _this.add.group();
            _this.greenGrp = [];
            _this.framechange.play();


            if (Math.floor(dividendArr[_this.count1]) < 2) {
                _this.lastX = 270
                if (Math.floor(dividendArr[_this.count1]) != 0) {
                    newBox = _this.add.sprite(270, 105, 'yellowBox')
                    _this.yellowGrp.add(newBox);
                    newBox.scale.setTo(1, 1.16)
                    _this.lastX = 565
                    greenCn = Math.round(dividendArr[_this.count1] * 100 - 100);
                }
                else {
                    greenCn = Math.round(dividendArr[_this.count1] * 100);
                }
                for (i = 0; i < Math.floor(greenCn / 10); i++) {
                    x = i > 0 ? 22 * i + 5 * (i - 1) : -6
                    newBox = _this.add.sprite(x + _this.lastX, -6 + 105, 'greenBox');
                    newBox.scale.setTo(1, 1.16)
                    _this.gray.addChild(newBox);
                }
                for (i = 0; i < greenCn % 10; i++) {


                    x = 21.7 * Math.floor(greenCn / 10) + 5 * (Math.floor(greenCn / 10) - 1)
                    y = i % 10 != 0 ? i % 10 * 25 + 6 * (Math.floor(i % 10) - 1) : -6
                    if (greenCn < 10)
                        x -= 2;
                    newBox = _this.add.sprite(x + _this.lastX, y + 105, 'orangeBox');
                    newBox.scale.setTo(1.15, 1.3)
                    _this.gray.addChild(newBox);

                }

            }
            else {
                for (i = 0; i < Math.floor(dividendArr[_this.count1]); i++) {
                    newBox = _this.add.sprite(270 + i * 160, 125 - 25, 'yellowBox')
                    _this.yellowGrp.add(newBox);
                    newBox.scale.setTo(0.5, 0.58)
                }
                _this.lastX = 270 + i * 160
                greenCn = Math.round(dividendArr[_this.count1] * 100 - Math.floor(dividendArr[_this.count1]) * 100);
                for (i = 0; i < Math.floor(greenCn / 10); i++) {
                    x = i > 0 ? 10 * i + 5 * (i - 1) : -5
                    newBox = _this.add.sprite(x + _this.lastX, -6 + 125 + 4 - 25, 'greenBox');
                    _this.gray.addChild(newBox);
                    newBox.scale.setTo(0.55, 0.58)

                }
                for (i = 0; i < greenCn % 10; i++) {


                    idx = i + Math.floor(greenCn / 10) * 10
                    y = idx % 10 != 0 ? idx % 10 * 9 + 6.8 * (Math.floor(idx % 10) - 1) : -5
                    x = idx >= 10 ? 10 * Math.floor(idx / 10) + 5 * (Math.floor(idx / 10) - 1) : -5

                    if (idx >= 10 && idx < 20) {
                        x -= 1;
                    }
                    if (idx >= 90) {
                        x += 1;
                    }

                    newBox = _this.add.sprite(x + _this.lastX, y + 125 + 3 - 25, 'orangeBox');
                    _this.gray.addChild(newBox);
                    newBox.scale.setTo(0.62, 0.67)

                }
            }
        }

    },
    evaluateCubes: function () {
        anscount = 0;
        for (i = 0; i < _this.yellowGrp.children.length; i++) {
            anscount += 100
        }
        if (_this.gray) {
            for (i = 0; i < _this.gray.children.length; i++) {
                if (_this.gray.getChildAt(i).key == 'greenBox' && _this.gray.getChildAt(i).visible == true) {
                    anscount += 10
                }
                if (_this.gray.getChildAt(i).key == 'orangeBox' && _this.gray.getChildAt(i).visible == true) {
                    anscount += 1
                }
            }
        }
        if (_this.gray1) {
            for (i = 0; i < _this.gray1.children.length; i++) {
                if (_this.gray1.getChildAt(i).key == 'greenBox' && _this.gray1.getChildAt(i).visible == true) {
                    anscount += 10
                }
                if (_this.gray1.getChildAt(i).key == 'orangeBox' && _this.gray1.getChildAt(i).visible == true) {
                    anscount += 1
                }
            }
        }
        if (_this.gray2) {
            for (i = 0; i < _this.gray2.children.length; i++) {
                if (_this.gray2.getChildAt(i).key == 'greenBox' && _this.gray2.getChildAt(i).visible == true) {
                    anscount += 10
                }
                if (_this.gray2.getChildAt(i).key == 'orangeBox' && _this.gray2.getChildAt(i).visible == true) {
                    anscount += 1
                }
            }
        }
        if (_this.gray3) {
            for (i = 0; i < _this.gray3.children.length; i++) {
                if (_this.gray3.getChildAt(i).key == 'greenBox' && _this.gray3.getChildAt(i).visible == true) {
                    anscount += 10
                }
                if (_this.gray3.getChildAt(i).key == 'orangeBox' && _this.gray3.getChildAt(i).visible == true) {
                    anscount += 1
                }
            }
        }
        return anscount == Math.round(dividendArr[_this.count1] * 100)
    },
    rightbtnClicked: function () {
        _this.userselected = 0;
        _this.clickSound.play();
        _this.rightbtn.inputEnabled = false;
        _this.rightbtn.input.useHandCursor = false;
        _this.rightbtn_is_Clicked = true;

        if (_this.part1 == true) {
            _this.eraser.inputEnabled = false;
            _this.rightbtn.inputEnabled = false;
            _this.rightbtn.frame = 1;
            _this.disableBoxes()
            if (_this.evaluateCubes()) {
                _this.part1 = false;
                _this.part2 = true;
                _this.counterCelebrationSound.play();
                _this.time.events.add(500, () => {
                    _this.rightbtn.destroy();
                    _this.reArrangeScreen();
                    _this.time.events.add(500, () => {
                        _this.addNumberPad();
                        _this.Ask_Question1.pause();
                        _this.Ask_Question1.currentTime = 0;
                        if (_this.count1 == 0)
                            _this.Ask_Question2.play();

                        _this.Question_flag = 2;
                        _this.yellowBox3.visible = true;
                        _this.yellowBox.visible = false;
                    })
                })

            }
            else {
                _this.yellowGrp.destroy();
                _this.gray.destroy();
                _this.gray1.destroy();
                _this.gray2.destroy();
                _this.gray3.destroy();
                _this.gray = _this.add.group();
                _this.gray1 = _this.add.group();
                _this.gray2 = _this.add.group();
                _this.gray3 = _this.add.group();

                _this.time.events.add(500, () => {
                    _this.rightbtn.frame = 0;
                })
                _this.lastXArr = [0, 0];
                _this.lastX2Arr = [0, 0, 0, 0];
                _this.grayBoxEmty = [];
                _this.grayBox2Emty = [];
                _this.grayBox3Emty = [];
                _this.grayBox4Emty = [];

                for (j = 0; j < 100; j++) {
                    _this.grayBoxEmty[j] = -1;
                    _this.grayBox2Emty[j] = -1;
                    _this.grayBox3Emty[j] = -1;
                    _this.grayBox4Emty[j] = -1;
                }
                _this.orangeGrp = _this.add.group();
                _this.yellowGrp = _this.add.group();
                _this.greenGrp = []
                _this.wrongans.play();
                _this.reCreatehrGrp();
                _this.eraser.inputEnabled = true;
                _this.eraser.input.enableDrag(true);
                _this.eraser.events.onDragUpdate.add(_this.eraserUpdate, _this);
                _this.eraser.events.onDragStop.add(_this.eraserDrop, _this);
                _this.eraser.bringToTop();
                _this.rightbtn.inputEnabled = true;

            }
        }
        else if (_this.part2 == true) {
            if (String(_this.AnswerBox.name) === String(divisorArr[_this.count1])) {
                _this.part2 = false;
                _this.part3 = true;
                _this.counterCelebrationSound.play();
                _this.numGroup.destroy();
                _this.multiply();
                _this.AnswerBox.name = ""
                _this.yellowBox3.visible = false;
                _this.Ask_Question2.pause();
                _this.Ask_Question2.currentTime = 0;

            }
            else {
                _this.wrongans.play();
                _this.AnswerBox.name = "";
                _this.enterTxt.destroy();
                _this.fourNotEntered = false;
                _this.fouransLen = 0;
                _this.finalval = '';
                _this.dotselected = false;
                _this.rightbtn.inputEnabled = true;
            }
        }
        else if (_this.part3 == true) {
            if (!_this.nullCount('greenBox') && (!_this.nullCount('orangeBox'))) {
                _this.rightbtn.destroy();
                _this.part3 = false;
                _this.part4 = true;
                _this.counterCelebrationSound.play();
                _this.AnswerBox.name = ""
                _this.time.events.add(500, () => {
                    _this.reArrangeScreen2()
                    _this.fourNotEntered = false;
                    _this.fouransLen = 0;
                    _this.finalval = '';
                    _this.dotselected = false;
                    _this.addNumberPad();
                    if (_this.count1 == 0)
                        _this.Ask_Question4.play();
                    _this.Question_flag = 4;
                })

            }
            else {
                _this.reverse.frame = 0;
                _this.reverse.inputEnabled = false;
                _this.rightbtn.destroy();
                _this.wrongans.play();
                _this.eleArr.forEach(element => {
                    if (element) element.destroy();
                });
                _this.grayBoxgrp.children.forEach(element => {
                    while (element.children.length > 0) element.getChildAt(0).destroy();
                });
                _this.dividepieces();
                _this.rightbtn.inputEnabled = true;
            }
        }
        else if (_this.part4 == true) {

            if (_this.checkAns()) {
                _this.part4 = false;
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
    checkAns: function () {
        return _this.AnswerBox.name == valuesCombinations[_this.count1];
    },
    multiply: function () {
        _this.Question_flag = 3;

        if (Math.floor(dividendArr[_this.count1]) < 2) {
            _this.resizeType2()
        }
        else {
            if (_this.count1 == 0)
                _this.Ask_Question3.play();

            _this.Question_flag = 3;
            _this.makeEmptyGrayBoxes()
        }
    },
    resizeType2: function () {
        _this.reSize = _this.time.create(false);
        timeC = 9;

        _this.reSize.loop(80, function () {
            // _this.gray.scale.setTo(timeC / 10, timeC / 10 + 0.016 * (10 - timeC));
            _this.gray.scale.setTo(timeC / 10);

            _this.gray.y += (10.5 - 3.5 - 1.5 + 4);
            _this.gray.x += 29;
            if (Math.floor(dividendArr[_this.count1]) == 1) {
                _this.yellowGrp.getChildAt(0).scale.setTo(timeC / 10, timeC / 10 + 0.016 * (10 - timeC));
                _this.yellowGrp.getChildAt(0).y -= 1;
            }
            else {
                _this.gray.x -= 1.5;
            }

            timeC--;
            if (timeC == 4) {
                _this.reSize.stop();
                _this.reSize = null;

                _this.time.events.add(500, () => {
                    if (_this.count1 == 0)
                        _this.Ask_Question3.play();
                    _this.Question_flag = 3;

                    _this.makeEmptyGrayBoxes();
                })

            }
        }, _this);
        _this.reSize.start();
    },
    makeEmptyGrayBoxes: function () {
        // _this.grayBoxgrp.destroy();
        _this.grayBoxgrp = _this.add.group();
        for (i = 0; i < divisorArr[_this.count1]; i++) {
            grayBox = _this.add.sprite(270 + 160 * i, 280 - 10, 'gryBox')
            grayBox.scale.setTo(0.5, 0.58);
            _this.grayBoxgrp.addChild(grayBox)
        }
        _this.enableReverseBtn();

        // _this.grayBoxgrp.forEach(element => {
        //     element.y-=5;
        // });

    },
    enableReverseBtn: function () {


        if (_this.count1 == 0) {
            _this.showReverseHand();
        }
        else {
            _this.reverse.frame = 1;
            _this.reverse.inputEnabled = true;
            _this.reverse.events.onInputDown.add(_this.reverseClicked, _this);

        }

    },
    reArrangeScreen2: function () {
        mtyFound = false

        for (i = 0; i < 99; i++) {
            if (_this.placearr[i] == -1 && _this.placearr[i + 1] == 0) {
                mtyFound = true;
                break;
            }
        }

        if (mtyFound) {
            _this.eleArr.forEach(element => {
                if (element) element.destroy();
            });
            _this.grayBoxgrp.children.forEach(element => {
                while (element.children.length > 0) element.getChildAt(0).destroy();
            });


            _this.grayBoxgrp.children.forEach(element => {
                _this.framechange.play();
                greenCn = Math.round(valuesCombinations[_this.count1] * 100 - Math.floor(valuesCombinations[_this.count1]) * 100);

                for (i = 0; i < Math.floor(greenCn / 10); i++) {
                    x = i > 0 ? 22 * i + 5 * (i - 1) : -6
                    newBox = _this.add.sprite(x, -6, 'greenBox');
                    element.addChild(newBox);
                }
                for (i = 0; i < greenCn % 10; i++) {


                    x = 21.7 * Math.floor(greenCn / 10) + 5 * (Math.floor(greenCn / 10) - 1)
                    y = i % 10 != 0 ? i % 10 * 21 + 6 * (Math.floor(i % 10) - 1) : -6
                    if (greenCn < 10)
                        x -= 2;
                    newBox = _this.add.sprite(x, y, 'orangeBox');
                    newBox.scale.setTo(1.15, 1.1)
                    element.addChild(newBox);

                }
            });
        }

    },

    transformation: function () {

        _this.time.events.add(500, () => {
            _this.framechange.play();
            _this.dividepieces();
        })

    },
    dividepieces: function () {

        _this.eleArr = []
        _this.placearr = []
        for (i = 0; i < 100; i++) {
            _this.placearr[i] = -1
        }
        _this.yellowGrp.visible = false;
        _this.gray.visible = false;
        for (i = 0; i < _this.yellowGrp.length; i++) {
            for (j = 0; j < 10; j++) {
                box = _this.add.sprite(_this.yellowGrp.getChildAt(i).x + j * 16, 112 - 20, 'greenBox');
                box.scale.setTo(0.5, 0.58);
                _this.eleArr.push(box)
                box.xp = box.x
                box.yp = box.y
                box.inputEnabled = true;
                box.input.enableDrag(true);
                box.events.onDragStop.add(_this.boxDrop, _this);

            }
        }
        greenCn = Math.round(dividendArr[_this.count1] * 100 - Math.floor(dividendArr[_this.count1]) * 100);
        xpos = _this.eleArr.length > 0 ? _this.eleArr[_this.eleArr.length - 1].x : 270
        for (j = 0; j < Math.floor(greenCn / 10); j++) {
            box = _this.add.sprite(xpos + j * 16, 112 - 20, 'greenBox');
            box.scale.setTo(0.5, 0.58);
            _this.eleArr.push(box)
            box.xp = box.x
            box.yp = box.y
            box.inputEnabled = true;
            box.input.enableDrag(true);
            box.events.onDragStop.add(_this.boxDrop, _this);
        }
        xpos = _this.eleArr.length > 0 ? _this.eleArr[_this.eleArr.length - 1].x : 270
        for (j = 0; j < Math.floor(greenCn % 10); j++) {
            box = _this.add.sprite(xpos + 16, 112 + j * 16 - 20, 'orangeBox');
            box.scale.setTo(0.55, 0.57);
            _this.eleArr.push(box)
            box.xp = box.x
            box.yp = box.y
            box.alpha = 0.6
        }

        _this.rightbtn = _this.add.sprite(860, 460, 'TickBtn')
        _this.rightbtn.inputEnabled = true;
        _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked, _this)

        if (!_this.equalBoxes('greenBox') && _this.nullCount('greenBox')) {
            _this.reverse.frame = 1;
            _this.reverse.events.destroy();
            _this.reverse.inputEnabled = true;
            _this.reverse.events.onInputDown.add(() => {
                _this.clickSound.play();
                _this.reverse.frame = _this.reverse.frame == 0 ? 1 : 0;
                _this.reverse.inputEnabled = false;
                _this.time.events.add(500, _this.divideGreenToOrange);
            }, _this);
        }

    },
    equalBoxes: function (grp) {
        count = 0;
        for (b = 0; b < _this.eleArr.length; b++) {
            if (_this.eleArr[b] && _this.eleArr[b].key == grp) {
                count++;
            }
            if (count >= _this.grayBoxgrp.children.length) {
                return true;
            }
        }
        return false
    },
    nullCount: function (name) {
        count = 0;
        for (b = 0; b < _this.eleArr.length; b++) {
            if (_this.eleArr[b] && _this.eleArr[b].alpha == 1 && _this.eleArr[b].key == name) {
                return true;
            }
        }
        return false
    },

    boxDrop: function (target) {
        if (_this.checkOverlap(_this.grayBoxgrp, target)) {
            if (target.key == 'greenBox') {
                if (_this.equalBoxes('greenBox')) {
                    for (t = 0; t < _this.grayBoxgrp.children.length; t++) {
                        idx = _this.getEmptyIndex(_this.placearr, 'green')
                        xpos = idx > 0 ? 22 * idx + 5 * (idx - 1) : -6
                        xpos -= 1

                        if (idx > 1) xpos -= 1

                        newbox = _this.add.sprite(xpos, -6, 'greenBox')
                        if (_this.grayBoxgrp.getChildAt(t).children.length >= 2) newbox.x += 2;
                        _this.grayBoxgrp.getChildAt(t).addChild(newbox)

                        for (m = _this.eleArr.length - 1; m >= 0; m--) {
                            if (_this.eleArr[m] && _this.eleArr[m].key == 'greenBox') {
                                _this.eleArr[m].destroy();
                                _this.eleArr[m] = null;
                                break;
                            }
                        }
                    }
                    for (g = idx * 10; g < idx * 10 + 10; g++) {
                        _this.placearr[g] = 0
                    }
                }
            }
            else {
                if (_this.equalBoxes('orangeBox')) {
                    for (t = 0; t < _this.grayBoxgrp.children.length; t++) {
                        for (g = 0; g < 100; g++) {
                            if (_this.placearr[g] == -1) {
                                idx = g;
                                break;
                            }
                        }

                        xpos = 21.7 * Math.floor(idx / 10) + 5 * (Math.floor(idx / 10) - 1)
                        ypos = idx % 10 != 0 ? idx % 10 * 21 + 6 * (Math.floor(idx % 10) - 1) : -6
                        if (idx < 10)
                            x -= 2;
                        if (idx >= 90) x += 2
                        newbox = _this.add.sprite(xpos, ypos, 'orangeBox')
                        newbox.scale.setTo(1.15, 1.1);
                        _this.grayBoxgrp.getChildAt(t).addChild(newbox)

                        for (m = _this.eleArr.length - 1; m >= 0; m--) {
                            if (_this.eleArr[m] && _this.eleArr[m].key == 'orangeBox') {
                                _this.eleArr[m].destroy();
                                _this.eleArr[m] = null;
                                break;
                            }
                        }
                    }
                    _this.placearr[idx] = 0

                }
            }

            if ((!_this.equalBoxes('greenBox') && !_this.nullCount('greenBox')) && (_this.equalBoxes('orangeBox') && !_this.nullCount('orangeBox'))) {
                _this.eleArr.forEach(element => {
                    if (element) {
                        element.alpha = 1;
                        element.inputEnabled = true;
                        element.input.enableDrag(true);
                        element.events.onDragStop.add(_this.boxDrop, _this);
                    }
                });
            } else if (!_this.equalBoxes('greenBox') && _this.nullCount('greenBox')) {

                _this.eleArr.forEach(element => {
                    if (element) {
                        element.inputEnabled = false;
                    }
                });
                _this.reverse.frame = 1;
                _this.reverse.events.destroy();
                _this.reverse.inputEnabled = true;
                _this.reverse.events.onInputDown.add(() => {
                    _this.clickSound.play();
                    _this.reverse.frame = _this.reverse.frame == 0 ? 1 : 0;
                    _this.reverse.inputEnabled = false;
                    _this.time.events.add(500, _this.divideGreenToOrange);
                }, _this);
            }
            if (target) {
                target.x = target.xp;
                target.y = target.yp;
            }
        }
        else {
            target.x = target.xp;
            target.y = target.yp;
        }
    },
    divideGreenToOrange: function () {
        _this.framechange.play();
        for (j = 0; j < _this.eleArr.length; j++) {
            if (_this.eleArr[j] && _this.eleArr[j].key == 'greenBox') {
                for (p = 0; p < 10; p++) {
                    box = _this.add.sprite(_this.eleArr[j].x, 112 + p * 16 - 20, 'orangeBox');
                    box.scale.setTo(0.55, 0.57);
                    _this.eleArr.push(box)
                    box.xp = box.x
                    box.yp = box.y
                    box.inputEnabled = true;
                    box.input.enableDrag(true);
                    box.events.onDragStop.add(_this.boxDrop, _this);
                }
                _this.eleArr[j].destroy();
                _this.eleArr[j] = null;
            }
        }
        _this.eleArr.forEach(element => {
            if (element) {
                element.alpha = 1
                element.inputEnabled = true;
                element.input.enableDrag(true);
                element.events.onDragStop.add(_this.boxDrop, _this);
            }
        });
    },
    wrongAnsClicked: function () {
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
    wrongbtnClicked: function (target) {
        _this.clickSound.play();
        _this.disableInputs();
    },
    disableInputs: function () {
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
        if (_this.fouransLen != 4) {
            if (_this.fouransLen == 3 && _this.dotselected == false)
                return;
            _this.finalval += ''
            _this.finalval += target.name
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

                else {
                    _this.enterTxt = _this.add.text(-27, -20, "" + _this.finalval, { fontSize: '20px' });
                    _this.fourNotEntered = true

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

        _this.disableInputs()
        _this.sideGray.destroy();
        _this.yellowGrp.destroy();
        _this.grayGrp.destroy();
        _this.numGroup.destroy();
        _this.questionBox.destroy();
        _this.workSpace.destroy();
        _this.greenStripe.destroy();
        _this.yellowStripe.destroy();
        _this.orangeStripe.destroy();
        _this.eraser.destroy();
        _this.gray.destroy();
        _this.gray1.destroy();
        _this.gray2.destroy();
        _this.gray3.destroy();
        _this.grayBoxgrp.destroy();
        _this.pSign1.destroy();
        _this.pSign2.destroy();
        _this.pSign3.destroy();
        _this.lastXArr = [0, 0];
        _this.lastX2Arr = [0, 0, 0, 0];

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
            _this.time.events.add(3000, _this.MakeSideBar);

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

    stopAudio: function () {
        //* clear all the timers first
        if (_this.demoAudio1Timer) clearTimeout(_this.demoAudio1Timer);
        if (_this.q3Timer) clearTimeout(_this.q3Timer);
        if (_this.demoAudio3Timer) clearTimeout(_this.demoAudio3Timer);
        if (_this.q2Timer) clearTimeout(_this.q2Timer);
        if (_this.q4Timer) clearTimeout(_this.q4Timer)

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

        if (_this.q4Sound) {
            //console.log("removing the q4");
            _this.q4Sound.pause();
            _this.q4Sound = null;
            _this.q4Soundsrc = null;
        }


        _this.skip.events.onInputDown.removeAll();
        _this.skip.destroy();                //* skip button destroyed

    },
    DemoVideo: function () {

        // DEMO AUDIOS
        //* This game helps us divide a decimal number by a whole number using the equal distribution method
        _this.demoAudio1 = document.createElement('audio');
        _this.demoAudio1src = document.createElement('source');
        _this.demoAudio1src.setAttribute("src", window.baseUrl + "questionSounds/NSD-4-G7/" + _this.languageSelected + "/NSD_4_G7_d1.mp3");
        _this.demoAudio1.appendChild(_this.demoAudio1src);

        //* This question can be read as, “Equally distribute 1.28 among 2 grids.”
        _this.demoAudio2 = document.createElement('audio');
        _this.demoAudio2src = document.createElement('source');
        _this.demoAudio2src.setAttribute("src", window.baseUrl + "questionSounds/NSD-4-G7/" + _this.languageSelected + "/NSD_4_G7_d2.mp3");
        _this.demoAudio2.appendChild(_this.demoAudio2src);

        //* Tap the exchange button to ungroup the decimal strips and square pieces. 
        _this.demoAudio3 = document.createElement('audio');
        _this.demoAudio3src = document.createElement('source');
        _this.demoAudio3src.setAttribute("src", window.baseUrl + "questionSounds/NSD-4-G7/" + _this.languageSelected + "/NSD_4_G7_d3.mp3");
        _this.demoAudio3.appendChild(_this.demoAudio3src);

        // QUESTION AUDIOS
        //*  Drag the whole number squares, decimal strips and square pieces to represent the dividend.
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/NSD-4-G7/" +
            _this.languageSelected + "/NSD_4_G7_a1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        //*  Observe the divisor. How many equal parts should the dividend be divided into?
        _this.q2Sound = document.createElement('audio');
        _this.q2Soundsrc = document.createElement('source');
        _this.q2Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/NSD-4-G7/" +
            _this.languageSelected + "/NSD_4_G7_a2.mp3");
        _this.q2Sound.appendChild(_this.q2Soundsrc);

        //* Equally distribute the whole number squares, decimal strips and square pieces among each of the grids.
        _this.q3Sound = document.createElement('audio');
        _this.q3Soundsrc = document.createElement('source');
        _this.q3Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/NSD-4-G7/" +
            _this.languageSelected + "/NSD_4_G7_a3.mp3");
        _this.q3Sound.appendChild(_this.q3Soundsrc);

        //* Count and type the answer.
        _this.q4Sound = document.createElement('audio');
        _this.q4Soundsrc = document.createElement('source');
        _this.q4Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/NSD-4-G7/" +
            _this.languageSelected + "/NSD_4_G7_a4.mp3");
        _this.q4Sound.appendChild(_this.q4Soundsrc);



        _this.video_playing = 0;
        _this.showDemoVideo();  //* call the function to show the video


        _this.skip = _this.add.image(870, 410, 'skipArrow');       //* skip button shown at the bottom
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

    dA1: function () {
        console.log("inside demoAudio2.....")
        _this.demoAudio2.play();
        _this.demoAudio2.addEventListener('ended', _this.dA2);

    },

    dA2: function () {
        console.log("inside q1S.....")
        _this.q1Sound.play();
        _this.q1Sound.addEventListener('ended', _this.dA3);
    },

    dA3: function () {
        _this.demoVideo_1.playbackRate = 1.5;
        _this.q2Timer = setTimeout(function ()    //* q2 js timer to play 2 after 28.1 seconds.
        {
            console.log("inside q2sound.....")
            clearTimeout(_this.q2Timer);         //* clear the time once its used.
            _this.q2Sound.play();
        }, 19000);
        _this.q2Sound.addEventListener('ended', _this.dA4);
    },

    dA4: function () {
        _this.demoVideo_1.playbackRate = 0;
        _this.q3Timer = setTimeout(function ()    //* q3 js timer to play 3 after 3.48 seconds.
        {
            console.log("inside q3sound.....")
            clearTimeout(_this.q3Timer);         //* clear the time once its used.
            _this.q3Sound.play();
        }, 2000);
        _this.q3Sound.addEventListener('ended', _this.dA5);
    },

    dA5: function () {

        _this.demoAudio3Timer = setTimeout(function ()    //* demo audio3 js timer to play demo audio3 after 2.5 seconds.
        {
            _this.demoVideo_1.playbackRate = 1.5;
            console.log("inside demoa3sound.....")
            clearTimeout(_this.demoAudio3Timer);         //* clear the time once its used.
            _this.demoAudio3.play();
            _this.demoAudio3.addEventListener('ended', _this.dA6);
        }, 1000);

    },

    dA6: function () {
        _this.q4Timer = setTimeout(function ()    //* q4 js timer to play 4 after 22.4 seconds.
        {
            _this.demoVideo_1.playbackRate = 1;
            console.log("inside q4sound.....")
            clearTimeout(_this.q4Timer);         //* clear the time once its used.
            _this.q4Sound.play();
            // _this.demoVideo_1.playbackRate = 1;
        }, 16500);

    },

    showDemoVideo: function () {

        _this.demoVideo_1 = _this.add.video('NSD4G7');
        _this.demoVideo_1.play(false);
        _this.demoVideo_1.changeSource(window.baseUrl + "assets/demoVideos/NSD-4-G7.mp4");
        _this.video_playing = 1;
        _this.videoWorld_1 = _this.demoVideo_1.addToWorld();

        _this.demoVideo_1.playbackRate = 0;
        _this.demoAudio1.play();
        //* Here the audios are added one after the other
        _this.demoAudio1.addEventListener('ended', _this.dA1);


        _this.demoVideo_1.onComplete.add(function () {
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





