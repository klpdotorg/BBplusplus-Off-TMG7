Game.NSD_5_G7level1 = function () { };


Game.NSD_5_G7level1.prototype =
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

        _this.Ask_Question1 = _this.createAudio("NSD_5_G7_a1");
        _this.Ask_Question2 = _this.createAudio("NSD_5_G7_a2");
        _this.Ask_Question3 = _this.createAudio("NSD_5_G7_a3");

        //edited for baseurl apk
        telInitializer.gameIdInit("NSD_5_G7", gradeSelected);// first Tele call
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
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/NSD-5-G7/" + _this.languageSelected + "/" + src + ".mp3");
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
        randarr = [1, 1, 1, 1, 0, 0]
        // randarr = _this.shuffle(randarr)
        valuesCombinations = [0, 0, 0, 0, 0, 0]
        multiplicandArr = [0, 0, 0, 0, 0, 0]
        multiplierArr = [0, 0, 0, 0, 0, 0]
        denomPossible1 = [0.1, 0.2, 0.3, 0.4, 0.5, 0.15, 0.25, 0, 6, 0.8, 0.35, 0.75];
        _this.occured = false;
        numPoss = [3, 5];
        numPoss = _this.shuffle(numPoss);

        for (i = 0; i < 6; i++) {

            if (randarr[i] == 1) {

                multiplicand = Math.floor(Math.random() * 4) + 2;
                multiplier = denomPossible1[Math.floor(Math.random() * denomPossible1.length)];
                while ((((multiplicand * 100) % (multiplier * 100) != 0) || multiplicandArr.includes(multiplicand) || ((multiplicand * 100) / (multiplier * 100)) > 20)) {
                    multiplicand = Math.floor(Math.random() * 4) + 2;
                    multiplier = denomPossible1[Math.floor(Math.random() * denomPossible1.length)];

                }
                if (multiplier == 0.1)
                    denomPossible1 = [0.2, 0.3, 0.4, 0.5, 0.15, 0.25, 0, 6, 0.8, 0.35, 0.75];


            }
            else {

                if (numPoss[i - 4] == 3) {
                    multiplicand = 3;
                    multiplier = 1.5
                }
                else {
                    multiplicand = 5;
                    multiplier = 1.25
                }
            }
            multiplicandArr[i] = (multiplicand);
            multiplierArr[i] = (multiplier);
            valuesCombinations[i] = ((multiplicand * 100) / (multiplier * 100))
        }
        console.log(multiplicandArr)
        console.log(multiplierArr)
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
        // _this.count1= 4;
        _this.grayBox = null;
        _this.grayBox2 = null;
        _this.firstGrp = null;
        _this.Question_flag = 1;
        _this.rverseclick = 0;
        _this.part1 = true;
        _this.fourNotEntered = false;
        if (_this.count1 == 0)
            _this.Ask_Question1.play();

        _this.cubegrp = false;

        _this.questionBox = _this.add.sprite(70, 90, 'Text box_1')

        _this.workSpace2 = _this.add.sprite(235, 70, 'panel_3');
        _this.workSpace2.scale.setTo(1.03, 1);
        _this.workSpace2.visible = false;

        if (_this.count1 <= 3) {
            _this.workSpace = _this.add.sprite(235, 70, 'panel3');
            _this.workSpace.scale.setTo(1, 1.05);
        }

        else
            _this.workSpace = _this.add.sprite(235, 70, 'panel_2');
        _this.rightbtn = _this.add.sprite(860, 460, 'TickBtn')
        _this.rightbtn.inputEnabled = true;
        _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked, _this)

        _this.yellowBox = _this.add.sprite(12, 17, 'yellowTextbox')
        _this.questionBox.addChild(_this.yellowBox)
        _this.yellowBox.scale.setTo(1.2, 1)

        _this.n1 = _this.add.text(24, 19, multiplicandArr[_this.count1]);
        _this.yellowBox.scale.setTo(1.2, 1)

        _this.questionBox.addChild(_this.n1)
        _this.applyingStyle(_this.n1);
        _this.n1.fill = '#FF0000';

        _this.divideSign(125, 125)

        _this.yellowBox3 = _this.add.sprite(77, 17, 'yellowTextbox')
        _this.questionBox.addChild(_this.yellowBox3)
        _this.yellowBox3.visible = false;
        _this.yellowBox3.scale.setTo(1.65, 1);
        _this.n2 = _this.add.text(79, 19, multiplierArr[_this.count1])

        if (Math.round(multiplierArr[_this.count1] * 100) % 10 == 0) {
            _this.yellowBox3.scale.setTo(1.4, 1);
            _this.n2.x += 2;
        }

        _this.questionBox.addChild(_this.n2)
        _this.applyingStyle(_this.n2);
        _this.n2.fill = '#FF0000';


        // Colors group
        _this.orangeGrp = _this.add.group();
        _this.yellowGrp = _this.add.group();
        _this.greenGrp = []


        _this.EnableBoxes();
        _this.lastX = 257;
        _this.part1 = true;
        _this.lastXArr = [0, 1];

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

        _this.grayBoxEmty = [];
        _this.grayBox2Emty = [];
        for (j = 0; j < 100; j++) {
            _this.grayBoxEmty[j] = -1;
            _this.grayBox2Emty[j] = -1;
        }
        _this.gray = _this.add.group();

        _this.createOrgGreenGrp();

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
    createOrgGreenGrp: function () {

        _this.or1 = _this.add.group();
        _this.or2 = _this.add.group();
        _this.or3 = _this.add.group();
        _this.or4 = _this.add.group();

        _this.or1.x = 272;
        if (multiplierArr[_this.count1] == 2)
            _this.or2.x = 580;
        else
            _this.or2.x = 432;
        _this.or3.x = 592;
        _this.or4.x = 752;

        _this.or1.scale.setTo(0.55);
        _this.or2.scale.setTo(0.55);
        _this.or3.scale.setTo(0.55);
        _this.or4.scale.setTo(0.55);
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

                if (_this.lastXArr[0] == 0 || _this.lastXArr[1] == 0 || _this.yellowGrp.children.length > 0 || (_this.part2 == true && _this.yellowGrp.length == 0 && _this.count1 > 3)) {
                    if (_this.part2 == true)
                        maxYelllow = 1
                    else if (_this.part1 == true && _this.count1 <= 3)
                        maxYelllow = 8;
                    else
                        maxYelllow = 5;
                    if (_this.yellowGrp.children.length < maxYelllow) {
                        if (_this.lastXArr[0] == 0 || _this.part1 == true) {
                            _this.lastX = 257;
                            _this.lastXArr[0] = 1;
                        }
                        else if (_this.lastXArr[1] == 0) {
                            if (_this.count1 > 3)
                                _this.lastX = 565;
                            else
                                _this.lastX = 565 + 70;
                            _this.lastXArr[1] = 1;

                        }
                        newBox = _this.add.sprite(_this.lastX + _this.yellowGrp.children.length * 10, 100 + _this.yellowGrp.children.length * 10, 'yellowBox')
                        _this.yellowGrp.add(newBox);
                        newBox.scale.setTo(0.95, 1.1);

                        if (_this.part1 == true && _this.count1 > 3)
                            newBox.scale.setTo(0.9, 1.05);

                        if (_this.part2 == true)
                            newBox.scale.setTo(0.48, 0.55);
                        _this.snapSound.play();
                    }
                }

            }
            else if (target === _this.orangeStripecpy) {
                if (_this.lastXArr[0] == 0 || _this.lastXArr[1] == 0 || (_this.part2 == true && _this.count1 >= 3) || (_this.grayBox && _this.getEmptyIndex(_this.grayBoxEmty, 'orange') != undefined) || (_this.grayBox2 && _this.getEmptyIndex(_this.grayBox2Emty, 'orange') != undefined)) {

                    if ((!_this.grayBox && !_this.grayBox2) || (_this.grayBox2 && _this.getEmptyIndex(_this.grayBoxEmty, 'orange') == undefined) || (_this.grayBox && !_this.grayBox2 && _this.getEmptyIndex(_this.grayBoxEmty, 'orange') == undefined) || (_this.grayBox && _this.grayBox2 && _this.getEmptyIndex(_this.grayBox2Emty, 'orange') == undefined)) {

                        if (_this.lastXArr[0] == 0) {
                            _this.lastX = 257;
                            _this.lastXArr[0] = 1;
                        }
                        else {
                            if (_this.count1 > 3)
                                _this.lastX = 565;
                            else
                                _this.lastX = 565 + 70;
                            _this.lastXArr[1] = 1;
                        }

                        if (!_this.grayBox || !_this.grayBox2) {
                            if (_this.grayBox)
                                _this.grayBox2 = _this.grayBox
                            _this.grayBox = _this.add.sprite(_this.lastX, 100, 'gryBox');
                            _this.grayBox.visible = false;
                        }

                    }
                    if (_this.getEmptyIndex(_this.grayBoxEmty, 'orange') != undefined) {
                        idx = _this.getEmptyIndex(_this.grayBoxEmty, 'orange');
                        _this.grayBoxEmty[idx] = 0;
                        if (_this.grayBox2 && _this.grayBox2.children.length > 0)
                            grp = _this.grayBox2
                        else
                            grp = _this.grayBox;
                    }
                    else {
                        idx = _this.getEmptyIndex(_this.grayBox2Emty, 'orange');
                        _this.grayBox2Emty[idx] = 0;
                        grp = _this.grayBox;

                    }

                    y = idx % 10 != 0 ? idx % 10 * 21 + 6 * (Math.floor(idx % 10) - 1) : -6
                    x = idx >= 10 ? 21.7 * Math.floor(idx / 10) + 5 * (Math.floor(idx / 10) - 1) : -7

                    if (idx >= 10 && idx < 20) {
                        x -= 1;
                    }
                    if (idx >= 90) {
                        x += 1;
                    }
                    x = Math.round(x);
                    newBox = _this.add.sprite(x, y, 'orangeBox')
                    newBox.scale.setTo(1.15, 1.1)
                    if (_this.part2 == true && _this.count1 > 3) {
                        newBox.x += (190 - 12.5 * (Math.floor(idx / 10)));
                        newBox.y -= (12 * (Math.floor(idx % 10)));

                        newBox.scale.setTo(0.65, 0.6);
                        newBox.y += 2;
                    }
                    newBox.idx = idx;
                    _this.gray.addChild(newBox);

                    newBox.x += _this.lastX;
                    newBox.y += 100;
                    _this.snapSound.play();

                    if (idx >= 9) {
                        count = 0;
                        st = 0, end = 0;
                        arr = []
                        for (i = 0; i < _this.gray.children.length; i++) {
                            if (_this.gray.getChildAt(i).key == 'orangeBox' && _this.gray.getChildAt(i).visible == true) {
                                count++;
                                if (count == 1) st = _this.gray.getChildAt(i).idx;
                                arr.push(i);
                                if (_this.gray.getChildAt(i).idx < st) {
                                    st = _this.gray.getChildAt(i).idx;
                                    count = 1;
                                    arr = [];
                                    arr.push(i)
                                }
                                if (count == 10) {
                                    end = i;
                                    break;
                                }

                            }
                        }
                        if (count == 10) {
                            _this.showOrangeTGreen(Math.floor(st / 10), arr, _this.gray)
                        }
                    }
                }

            }
            else if (target === _this.greenStripecpy) {
                var arrBox;
                if (((_this.yellowGrp.length <= 0 && _this.part1 == true) || (_this.part2 == true && _this.count1 >= 3) || (_this.part2 == true && _this.lastXArr[1] == 0)) || (_this.lastXArr[0] == 0 || _this.lastXArr[1] == 0 || (_this.grayBox && _this.getEmptyIndex(_this.grayBoxEmty, 'green') != undefined) || (_this.grayBox2 && _this.getEmptyIndex(_this.grayBox2Emty, 'green') != undefined))) {
                    if (_this.gray.length <= 0 || (!_this.grayBox && !_this.grayBox2) || (_this.grayBox2 && _this.getEmptyIndex(_this.grayBoxEmty, 'green') == undefined) || (_this.grayBox && !_this.grayBox2 && _this.getEmptyIndex(_this.grayBoxEmty, 'green') == undefined) || (_this.grayBox && _this.grayBox2 && _this.getEmptyIndex(_this.grayBox2Emty, 'green') == undefined)) {
                        if (_this.lastXArr[0] == 0) {
                            _this.lastX = 257;
                            _this.lastXArr[0] = 1;
                        }
                        else {
                            if (_this.count1 > 3)
                                _this.lastX = 565;
                            else
                                _this.lastX = 565 + 70;
                            _this.lastXArr[1] = 1;
                        }
                        if (_this.gray.children.length <= 0) {
                            if (_this.grayBox)
                                _this.grayBox2 = _this.grayBox
                            _this.grayBox = _this.add.sprite(_this.lastX, 100, 'gryBox');
                            _this.grayBox.visible = false;
                        }
                    }
                    grp = _this.grayBox;
                    if (_this.lastX > 300)
                        _this.lastXArr[1] = 1;

                    if (_this.getEmptyIndex(_this.grayBoxEmty, 'green') == undefined) {
                        idx = _this.getEmptyIndex(_this.grayBox2Emty, 'green');
                        for (j = idx * 10; j < idx * 10 + 10; j++) {
                            _this.grayBox2Emty[j] = 0;
                        }
                        arrBox = _this.grayBox2Emty;

                    }
                    else {
                        idx = _this.getEmptyIndex(_this.grayBoxEmty, 'green');
                        for (j = idx * 10; j < idx * 10 + 10; j++) {
                            _this.grayBoxEmty[j] = 0;
                        }
                        arrBox = _this.grayBoxEmty;

                        if (_this.grayBox2) {
                            grp = _this.grayBox2;
                        }
                    }
                    x = idx > 0 ? 22 * idx + 5 * (idx - 1) : -6
                    newBox = _this.add.sprite(x, -6, 'greenBox');
                    newBox.idx = idx * 10;

                    _this.greenGrp.push(newBox);
                    _this.gray.addChild(newBox);
                    newBox.x += _this.lastX;
                    if (_this.part2 == true && _this.count1 > 3) {
                        newBox.x += (190 - 13 * (idx));
                        newBox.scale.setTo(0.55);
                        newBox.y += 2;
                    }
                    newBox.y += 100;
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
                        _this.convertGreenToYellow(_this.gray);
                    }
                }

            }
        }
        _this.reCreatehrGrp();

    },
    convertGreenToYellow: function (grp) {
        _this.convert = _this.time.create(false);
        timeC = 0;
        xpos = grp.getChildAt(0).x
        if (_this.part1 == true)
            xpos = 251;
        else if (_this.part2 == true) {
            if (xpos > 565 && xpos < 700)
                xpos = 565;
            else
                xpos = 749
        }
        if (!_this.firstGrp) xpos += 6
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

                newBox = _this.add.sprite(xpos, 100, 'yellowBox')
                _this.yellowGrp.add(newBox);
                if (_this.part2 == true)
                    newBox.scale.setTo(0.5);
                _this.world.bringToTop(_this.yellowGrp);
                _this.snapSound.play();

                _this.reArrangeYellow()
                grp.destroy();
                grp = null;
                _this.gray = _this.add.group();
                for (j = 0; j < 100; j++) {
                    if (_this.part2 == true) {
                        _this.grayBoxEmty[j] = -1;
                        _this.grayBox2Emty[j] = -1;
                    }
                    else {
                        _this.grayBoxEmty[j] = -1;
                        _this.grayBox2Emty[j] = -1;
                    }
                }

                for (j = 0; j < 100; j++) {
                    if (!_this.grayBox2 || grp == _this.grayBox2) {
                        if (!_this.grayBox2)
                            _this.grayBox = null;
                        else
                            _this.grayBox2 = null;
                        if (_this.part2 == true) {
                            _this.grayBoxEmty[j] = -1;
                            _this.grayBox2Emty[j] = -1;
                        }
                        else {
                            _this.grayBoxEmty[j] = -1;
                            _this.grayBox2Emty[j] = -1;
                        }
                    }
                    else {
                        if (_this.part2 == true) {
                            _this.grayBoxEmty[j] = -1;
                            _this.grayBox2Emty[j] = -1;
                        }
                        else {
                            _this.grayBoxEmty[j] = -1;
                            _this.grayBox2Emty[j] = -1;
                        }
                        _this.grayBox = null;
                    }
                }

            }
        }, _this);
        _this.convert.start();
    },
    showOrangeTGreen: function (st, arr, grp) {
        _this.convert = _this.time.create(false);
        timeC = 0;
        _this.convert.loop(50, function () {
            grp.getChildAt(arr[timeC]).visible = false;
            timeC++;
            _this.framechange.play()
            if (timeC == 10) {
                _this.convert.stop();
                _this.convert = null;
                idx = st >= 10 ? st % 10 : st;

                x = idx > 0 ? 22 * idx + 5 * (idx - 1) : -6
                newBox = _this.add.sprite(x, -6, 'greenBox');
                newBox.idx = idx * 10;
                newBox.x += _this.lastX;
                if (_this.part2 == true && _this.count1 > 3) {
                    newBox.x += (190 - 13 * (idx));
                    newBox.scale.setTo(0.55);
                    newBox.y += 2;
                }

                newBox.y += 100;
                _this.greenGrp.push(newBox);
                grp.addChild(newBox);
                _this.world.bringToTop(_this.greenGrp);
                _this.snapSound.play();


                CompleteWhole = true;
                if (_this.part1 == true)
                    arrBox = _this.grayBoxEmty;
                else
                    arrBox = _this.grayBox2Emty
                for (i = 0; i < 100; i++) {
                    if (arrBox[i] == -1) {
                        CompleteWhole = false;
                        break
                    }
                }
                if (CompleteWhole == true) {
                    _this.convertGreenToYellow(grp);
                }

            }
        }, _this);
        _this.convert.start();
    },
    reArrangeYellow: function () {
        x = _this.yellowGrp.children.length;
        _this.yellowGrp.destroy();
        _this.yellowGrp = _this.add.group();
        for (i = 0; i < x; i++) {
            if (_this.part1 == true) {
                newBox = _this.add.sprite(_this.lastX + i * 10, 100 + i * 10, 'yellowBox')
                newBox.scale.setTo(0.95, 1.1);

                if (_this.part2 == true)
                    newBox.scale.setTo(0.55);
                if (_this.part1 == true && _this.count1 > 3)
                    newBox.scale.setTo(0.9, 1.05);



            }
            else {
                newBox = _this.add.sprite(_this.lastX + i * 10, 100 + i * 10, 'yellowBox')
                if (_this.part2 == true)
                    newBox.scale.setTo(0.55);

            }
            _this.yellowGrp.add(newBox);
        }
    },
    eraserUpdate: function (target) {
        _this.world.bringToTop(_this.eraser)
        _this.eraser.scale.setTo(0.8)
    },
    eraserDrop: function (target) {
        _this.NotErased = true

        if (_this.part1 == true || _this.part2 == true) {
            if ((_this.yellowGrp.length > 0 && _this.checkOverlap(target, _this.yellowGrp)) || (_this.gray && _this.checkOverlap(target, _this.gray))) {

                if (_this.checkOverlap(target, _this.yellowGrp)) {

                    for (i = 0; i < _this.yellowGrp.children.length; i++) {
                        if (_this.checkOverlap(target, _this.yellowGrp.getChildAt(i))) {
                            if (_this.yellowGrp.getChildAt(i).x == 257 && _this.yellowGrp.children.length == 1) {
                                _this.lastXArr[0] = 0;
                            }
                            else if (_this.yellowGrp.children.length == 1) {
                                _this.lastXArr[1] = 0;
                            }
                            _this.yellowGrp.getChildAt(i).destroy();
                            _this.reArrangeYellow();

                            break;
                        }
                    }
                }
                else if (_this.gray && _this.checkOverlap(target, _this.gray)) {
                    for (i = 0; i < _this.gray.children.length; i++) {
                        if (_this.checkOverlap(target, _this.gray.getChildAt(i)) && _this.gray.getChildAt(i).visible == true) {
                            if (_this.gray.getChildAt(i).key == 'greenBox') {
                                if (_this.grayBox2) {
                                    for (j = _this.gray.getChildAt(i).idx; j < _this.gray.getChildAt(i).idx + 10; j++) {
                                        _this.grayBox2Emty[j] = -1;
                                    }
                                }
                                else {
                                    for (j = _this.gray.getChildAt(i).idx; j < _this.gray.getChildAt(i).idx + 10; j++) {
                                        _this.grayBoxEmty[j] = -1;
                                    }
                                }

                            } else {
                                if (_this.grayBox2) {
                                    _this.grayBox2Emty[_this.gray.getChildAt(i).idx] = -1;
                                } else
                                    _this.grayBoxEmty[_this.gray.getChildAt(i).idx] = -1;
                            }
                            _this.gray.getChildAt(i).destroy();
                            if ((_this.gray.children.length == 0 && !_this.firstGrp)) {
                                _this.lastXArr[0] = 0;
                                if (_this.gray.children.length == 0) {
                                    _this.gray.destroy();
                                    _this.gray = null;
                                    _this.gray = _this.add.group();
                                    _this.grayBox2 = null;
                                    _this.grayBox = null;

                                }
                            }
                            else {
                                if (_this.gray.children.length == 0) {
                                    _this.lastXArr[1] = 0;
                                    _this.gray.destroy();
                                    _this.gray = null;
                                    _this.gray = _this.add.group();
                                    _this.grayBox = null;
                                }
                            }
                            break;
                        }
                    }
                }
                target.x = 140;
                target.y = 380;

            }
        }
        else {
            if (_this.checkOverlap(target, _this.yellowGrp)) {
                for (i = 0; i < _this.yellowGrp.children.length; i++) {
                    if (i == 0) yellowgrp = _this.or1;
                    if (i == 1) yellowgrp = _this.or2;
                    if (i == 2) yellowgrp = _this.or3;
                    if (i == 3) yellowgrp = _this.or4;
                    if (_this.checkOverlap(target, yellowgrp)) {
                        for (j = 0; j < yellowgrp.children.length; j++) {
                            if (_this.checkOverlap(target, yellowgrp.getChildAt(j))) {
                                _this.recreateDraggableGrp(yellowgrp);
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            else if (_this.checkOverlap(target, _this.gray)) {
                _this.recreateDraggableGrp(_this.gray);
            }
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
            }
        }
        if (_this.grayBox2) {
            for (i = 0; i < 99; i++) {
                if (_this.grayBox2Emty[i] == -1 && _this.grayBox2Emty[i + 1] == 0) {
                    mtyFound = true;
                }
            }
        }
        if (mtyFound || (_this.yellowGrp.length > 0 && _this.yellowGrp.getChildAt(0).x != 257) || (_this.yellowGrp.length <= 0 && _this.grayBox.x != 257)) {
            _this.yellowGrp.destroy();
            if (_this.grayBox) _this.grayBox.destroy();
            if (_this.grayBox2) _this.grayBox2.destroy();
            _this.gray.destroy();
            _this.orangeGrp = _this.add.group();
            _this.yellowGrp = _this.add.group();
            _this.gray = _this.add.group();

            _this.greenGrp = [];
            _this.framechange.play();
            if (Math.floor(multiplicandArr[_this.count1]) == 1) {
                newBox = _this.add.sprite(257, 100, 'yellowBox')
                _this.yellowGrp.add(newBox);
                newBox.scale.setTo(0.95, 1.1);
                greenCn = (multiplicandArr[_this.count1] * 100 - 100);
                for (i = 0; i < Math.floor(greenCn / 10); i++) {
                    x = i > 0 ? 22 * i + 5 * (i - 1) : -6
                    newBox = _this.add.sprite(x + _this.lastX, -6 + 100, 'greenBox');
                    _this.gray.addChild(newBox);
                }
                for (i = 0; i < greenCn % 10; i++) {
                    x = 21.7 * Math.floor(greenCn / 10) + 5 * (Math.floor(greenCn / 10) - 1)
                    y = i % 10 != 0 ? i % 10 * 21 + 6 * (Math.floor(i % 10) - 1) : -6
                    if (greenCn < 10)
                        x -= 2;
                    newBox = _this.add.sprite(x + _this.lastX, y + 100, 'orangeBox');
                    newBox.scale.setTo(1.15, 1.1)
                    _this.gray.addChild(newBox);
                }

            }
            else {
                greenCn = (multiplicandArr[_this.count1] * 100);
                for (i = 0; i < Math.floor(greenCn / 10); i++) {
                    x = i > 0 ? 22 * i + 5 * (i - 1) : -6
                    newBox = _this.add.sprite(x + _this.lastX, -6 + 100, 'greenBox');
                    _this.gray.addChild(newBox);
                }
                for (i = 0; i < greenCn % 10; i++) {
                    x = 21.7 * Math.floor(greenCn / 10) + 5 * (Math.floor(greenCn / 10) - 1)
                    y = i % 10 != 0 ? i % 10 * 21 + 6 * (Math.floor(i % 10) - 1) : -6
                    newBox = _this.add.sprite(x + _this.lastX, y + 100, 'orangeBox');
                    newBox.scale.setTo(1.15, 1.1)
                    _this.gray.addChild(newBox);
                }
            }
        }

    },
    reArrangeScreen2: function () {
        mtyFound = false

        for (i = 0; i < 99; i++) {
            if (_this.grayBoxEmty[i] == -1 && _this.grayBoxEmty[i + 1] == 0) {
                mtyFound = true;
            }
        }
        for (i = 0; i < _this.gray.length; i++) {
            if (_this.gray.getChildAt(i).visible == false) {
                mtyFound = true;
            }
        }
        if (mtyFound) {
            if (_this.grayBox2) _this.grayBox2.destroy();
            _this.gray.destroy();

            _this.gray = _this.add.group();
            _this.greenGrp = [];
            _this.framechange.play();
            {
                greenCn = Math.round((multiplierArr[_this.count1] * 100) - Math.floor(multiplierArr[_this.count1]) * 100);
                if (_this.count1 > 3) {
                    newBox = _this.add.sprite(565, 100, 'yellowBox')
                    _this.yellowGrp.add(newBox);
                    newBox.scale.setTo(0.48, 0.55);
                }

                for (i = 0; i < Math.floor(greenCn / 10); i++) {
                    x = i > 0 ? 22 * i + 5 * (i - 1) : -6
                    newBox = _this.add.sprite(x + _this.lastX, -6 + 100, 'greenBox');
                    _this.gray.addChild(newBox);
                    if (_this.count1 > 3) {

                        newBox.scale.setTo(0.55)

                        {
                            newBox.x += (190 - 13 * (i));
                            newBox.scale.setTo(0.55);
                            newBox.y += 2;
                        }
                    }

                }

                for (i = 0; i < greenCn % 10; i++) {
                    x = 21.7 * Math.floor(greenCn / 10) + 5 * (Math.floor(greenCn / 10) - 1)
                    y = i % 10 != 0 ? i % 10 * 21 + 6 * (Math.floor(i % 10) - 1) : -6
                    newBox = _this.add.sprite(x + _this.lastX, y + 100, 'orangeBox');
                    _this.gray.addChild(newBox);
                    newBox.scale.setTo(1.15, 1.1)

                    if (_this.count1 > 3) {
                        newBox.scale.setTo(0.65, 0.6)
                        {
                            newBox.x += (190 - 12.5 * (Math.floor(greenCn / 10)));
                            newBox.y -= (12 * (Math.floor(i % 10)));

                            newBox.scale.setTo(0.65, 0.6);
                            newBox.y += 2;
                        }
                    }
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
        if (_this.part1 == true)
            return anscount == Math.round(multiplicandArr[_this.count1] * 100);
        else
            return anscount == Math.round(multiplierArr[_this.count1] * 100);

    },
    evaluateCubesGrp: function () {
        greenCn = Math.round(multiplicandArr[_this.count1] * 100);
        grplength = Math.floor(greenCn / 10) + greenCn % 10;
        for (i = 0; i < _this.yellowGrp.children.length; i++) {
            if (i == 0) yellowgrp = _this.or1;
            if (i == 1) yellowgrp = _this.or2;
            if (i == 2) yellowgrp = _this.or3;
            if (i == 3) yellowgrp = _this.or4;
            if (yellowgrp.children.length != grplength)
                return false;
        }
        return true;

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
                    _this.rightbtn.frame = 0;

                    _this.reArrangeScreen2();

                    _this.yellowGrp2 = _this.add.group();
                    _this.yellowGrp2 = _this.yellowGrp;
                    _this.yellowGrp = null;
                    _this.yellowGrp = _this.add.group();

                    _this.gray = null;
                    _this.gray = _this.add.group();


                    _this.reSizeYellow(_this.yellowGrp2);
                    _this.time.events.add(500, () => {
                        _this.reCreatehrGrp();
                        _this.eraser.inputEnabled = true;
                        _this.eraser.input.enableDrag(true);
                        _this.eraser.events.onDragUpdate.add(_this.eraserUpdate, _this);
                        _this.eraser.events.onDragStop.add(_this.eraserDrop, _this);
                        _this.eraser.bringToTop();
                        _this.rightbtn.inputEnabled = true;
                        _this.lastXArr = [1, 0];
                        _this.yellowBox3.visible = true;
                        _this.yellowBox.visible = false;
                    })
                })

            }
            else {
                _this.yellowGrp.destroy();
                if (_this.grayBox) _this.grayBox.destroy();
                if (_this.grayBox2) _this.grayBox2.destroy();
                _this.gray.destroy();
                _this.gray = _this.add.group();

                _this.grayBox = null;
                _this.grayBox2 = null;
                _this.time.events.add(500, () => {
                    _this.rightbtn.frame = 0;
                })
                _this.lastXArr = [0, 1];
                _this.grayBoxEmty = [];
                _this.grayBox2Emty = [];
                for (j = 0; j < 100; j++) {
                    _this.grayBoxEmty[j] = -1;
                    _this.grayBox2Emty[j] = -1;
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
            _this.eraser.inputEnabled = false;
            _this.rightbtn.inputEnabled = false;
            _this.rightbtn.frame = 1;
            _this.disableBoxes()
            if (_this.evaluateCubes()) {
                _this.reArrangeScreen2()
                _this.part2 = false;
                _this.part3 = true;
                _this.counterCelebrationSound.play();
                for (j = 0; j < 100; j++) {
                    _this.grayBoxEmty[j] = 1;
                }
                _this.firstGrp = _this.gray;
                if (_this.count1 <= 3)
                    _this.reSizeGray(_this.firstGrp);
                _this.yellowBox3.visible = false
                _this.time.events.add(500, () => {
                    _this.rightbtn.destroy();
                    _this.workSpace.visible = false;
                    _this.workSpace2.visible = true;
                    _this.resizeType1();
                })
            }
            else {
                _this.yellowGrp.destroy();
                if (_this.grayBox) _this.grayBox.destroy();
                _this.gray.destroy();
                _this.gray = _this.add.group();

                _this.grayBox = null;
                _this.time.events.add(500, () => {
                    _this.rightbtn.frame = 0;
                })
                _this.lastXArr = [1, 0];
                _this.grayBox2Emty = [];
                for (j = 0; j < 100; j++) {
                    _this.grayBox2Emty[j] = -1;
                    _this.grayBoxEmty[j] = -1;

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
                _this.rightbtn.frame = 0;

            }
        }
        else if (_this.part3 == true) {

            _this.eraser.inputEnabled = false;
            _this.rightbtn.inputEnabled = false;
            _this.rightbtn.frame = 1;
            _this.firstGrp.children.forEach(element => {
                element.inputEnabled = false;
            });

            _this.yellowGrp.children.forEach(element => {
                element.inputEnabled = false;
            });

            if (_this.ansBoxesCount + _this.ansBoxesCount2 == valuesCombinations[_this.count1]) {
                _this.part3 = false;
                _this.part4 = true;
                _this.counterCelebrationSound.play();

                if (valuesCombinations[_this.count1] % 2 == 0) {
                    // REVERSE Grp
                    if (_this.count1 > 3) {
                        _this.createYellowHash(`1.${(greenCn / 100)}R`)
                    }
                    else {
                        if (greenCn % 10 != 5) {
                            _this.createYellowHash(`${greenCn / 100}`)
                        }
                        else {
                            _this.createYellowHash(`${(greenCn / 100)}R`)
                        }
                    }
                }
                else {
                    _this.createYellowHash(`${(greenCn / 100)}`)
                }

                _this.yellowGrp2.getChildAt(_this.yellowGrp2.children.length - 1).x -= 10
                _this.time.events.add(500, () => {
                    _this.rightbtn.destroy();
                    _this.Question_flag = 3;
                    if (_this.count1 == 0)
                        _this.Ask_Question3.play();
                    _this.addNumberPad();
                })
            }
            else {

                _this.ansBoxesCount = 0;
                _this.ansBoxesCount2 = 0
                _this.wrongans.play();
                _this.rightbtn.frame = 0;

                while (_this.yellowSgrp.children.length > 0) {
                    _this.yellowSgrp.getChildAt(0).destroy();
                }
                while (_this.yellowSgrp2.children.length > 0) {
                    _this.yellowSgrp2.getChildAt(0).destroy();
                }
                while (_this.yellowSgrp3.children.length > 0) {
                    _this.yellowSgrp3.getChildAt(0).destroy();
                }
                while (_this.yellowSgrp4.children.length > 0) {
                    _this.yellowSgrp4.getChildAt(0).destroy();
                }
                while (_this.yellowSgrp5.children.length > 0) {
                    _this.yellowSgrp5.getChildAt(0).destroy();
                }
                _this.yellowHashgrp.destroy();
                _this.yellowHashgrp2.destroy();
                _this.yellowHashgrp = _this.add.group();
                _this.yellowHashgrp2 = _this.add.group();

                _this.recreateSidebarGrp();
                _this.rightbtn.inputEnabled = true;
                _this.rightbtn.frame = 0;
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

    tweenyellowGrp: function () {

        _this.reSizey = _this.time.create(false);
        arrval = [277, 585]
        arrval2 = [277, 277 + 160 - 15, 597 - 15, 757 - 15]
        timeC = 0;

        {
            _this.reSizey.loop(500, function () {
                if (_this.count1 > 3)
                    _this.yellowGrp2.scale.setTo(0.55);
                else
                    _this.yellowGrp2.scale.setTo(0.53);

                _this.resizet1 = _this.add.tween(_this.yellowGrp2.getChildAt(timeC));
                _this.resizet1.to({ x: 257 + (timeC % 5) * (_this.count1 > 3 ? 245 : 273 - 15), y: timeC < 5 ? _this.yellowGrp2.getChildAt(0).y : 390 }, 800, 'Linear', true, 0);
                _this.world.bringToTop(_this.yellowGrp2)

                timeC++;
                if (timeC == _this.yellowGrp2.length) {
                    _this.reSizey.stop();
                    _this.reSizey = null;
                    _this.resizet1.onComplete.add(() => {
                        _this.ansBoxesCount = 0;
                        _this.ansBoxesCount2 = 0;
                        _this.Question_flag = 2;
                        if (_this.count1 == 0)

                            _this.Ask_Question2.play();
                        _this.enableSideCubes();
                        _this.world.bringToTop(_this.firstGrp);
                        _this.world.bringToTop(_this.yellowGrp);
                        _this.yellowSgrp = _this.add.group();
                        _this.yellowSgrp2 = _this.add.group();
                        _this.yellowSgrp3 = _this.add.group();
                        _this.yellowSgrp4 = _this.add.group();
                        _this.yellowSgrp5 = _this.add.group();

                        _this.yellowHashgrp = _this.add.group();
                        _this.yellowHashgrp2 = _this.add.group();

                        _this.yellowSgrp.scale.setTo(0.5);
                        if (_this.count1 >= 3)
                            _this.yellowSgrp.scale.setTo(0.5, 0.49);

                        _this.yellowSgrp.y = 90;
                        _this.yellowSgrp.x = 248;

                        _this.yellowSgrp2.scale.setTo(0.5);
                        _this.yellowSgrp2.y = 90;
                        _this.yellowSgrp2.x = 248;

                        _this.yellowSgrp3.scale.setTo(0.5);
                        _this.yellowSgrp3.y = 90;
                        _this.yellowSgrp3.x = 248;

                        _this.yellowSgrp4.scale.setTo(0.5);
                        _this.yellowSgrp4.y = 90;
                        _this.yellowSgrp4.x = 248;

                        _this.yellowSgrp5.scale.setTo(0.5);
                        _this.yellowSgrp5.y = 90;
                        _this.yellowSgrp5.x = 248;

                        if (_this.count1 >= 3)
                            _this.yellowSgrp2.scale.setTo(0.5, 0.49);

                        if (_this.count1 >= 3)
                            _this.yellowSgrp3.scale.setTo(0.5, 0.49);

                        if (_this.count1 >= 3)
                            _this.yellowSgrp4.scale.setTo(0.5, 0.49);

                        if (_this.count1 >= 3)
                            _this.yellowSgrp5.scale.setTo(0.5, 0.49);


                        _this.rightbtn = _this.add.sprite(860, 460, 'TickBtn')
                        _this.rightbtn.inputEnabled = true;
                        _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked, _this)


                    })

                }
            }, _this);
        }

        _this.reSizey.start();

    },

    checkAns: function () {
        if (String(_this.AnswerBox.name)[_this.AnswerBox.name.length - 1] == '.')
            return false;
        return _this.AnswerBox.name == valuesCombinations[_this.count1];
    },
    reSizeYellow: function (grp) {
        _this.reSize = _this.time.create(false);
        timeC = 9;

        _this.reSize.loop(80, function () {
            grp.scale.setTo(timeC / 10);
            if (_this.count1 <= 3) {
                grp.x += 22.4;
                grp.scale.setTo((timeC * 10 + 3) / 100);
                grp.y += (0.2)
            }
            else {
                grp.x += 22;
                grp.scale.setTo((timeC * 10 + 5) / 100);
                grp.y += 1;
            }
            grp.y += 9;
            timeC--;
            if (timeC == 4) {
                _this.reSize.stop();
                _this.reSize = null;
            }
        }, _this);
        _this.reSize.start();
    },
    reSizeGray: function (grp) {
        _this.reSize = _this.time.create(false);
        timeC = 9;

        _this.reSize.loop(80, function () {
            grp.scale.setTo(timeC / 10);
            if (grp == _this.yellowGrp2) {
                grp.x += 25;
            }
            else
                grp.x += 70;
            grp.y += 10;
            timeC--;
            if (timeC == 5) {
                _this.reSize.stop();
                _this.reSize = null;
            }
        }, _this);
        _this.reSize.start();
    },
    resizeType1: function () {

        _this.time.events.add(500, () => {
            _this.showGrayTSidebar();
        })

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
    transformation: function () {

        if (Math.floor(multiplicandArr[_this.count1]) == 0) {
            _this.showgraypartTransform(257, 100);
        }
        else {
            if (_this.yellowGrp.length == 2) {
                _this.time.events.add(1400, () => {
                    _this.showgraypartTransform(257, 100);
                })
            }
            else {
                _this.time.events.add(2000, () => {
                    _this.showgraypartTransform(257, 100);
                })
            }
        }
    },
    showGrayTSidebar: function () {

        _this.greenStripe.destroy();
        _this.yellowStripe.destroy();
        _this.orangeStripe.destroy();

        if (_this.count1 > 3) {

            _this.yellowGrp.scale.setTo(0.7);
            _this.yellowGrp.y += 30;
            _this.yellowGrp.x += 140;
            _this.resizeg2 = _this.add.tween(_this.yellowGrp);
            _this.resizeg2.to({ x: -360, y: 140 }, 800, 'Linear', true, 0);
            _this.world.bringToTop(_this.yellowGrp);


            _this.firstGrp.scale.setTo(0.7);
            _this.firstGrp.x += 230;
            _this.firstGrp.y += 30;
            _this.resizeg = _this.add.tween(_this.firstGrp);
            _this.resizeg.to({ x: -387, y: 240 - 99 }, 800, 'Linear', true, 0);
            _this.world.bringToTop(_this.firstGrp);


        }
        else {

            _this.resizeg = _this.add.tween(_this.firstGrp);
            _this.resizeg.to({ x: 0 - 358 + 10 * (9 - (Math.round((_this.firstGrp.getChildAt(_this.firstGrp.length - 1).x - _this.firstGrp.getChildAt(0).x) / 28))), y: 240 - 100 }, 800, 'Linear', true, 0);
            _this.world.bringToTop(_this.firstGrp);

        }


        _this.resizeg.onComplete.add(() => {
            _this.tweenyellowGrp();
            _this.Question_flag = 2;
            if (_this.count1 > 3)
                _this.recreateSidebarGrp();
            _this.firstGrp.forEach(element => {
                element.inputEnabled = false;
            });
            _this.yellowGrp.children.forEach(element => {
                element.inputEnabled = false;
            });
        })

    },
    enableSideCubes: function () {


        _this.firstGrp.children.forEach(element => {
            element.inputEnabled = true;
            element.input.enableDrag(true);
            element.events.onDragUpdate.add(_this.dragUpdategrp, _this);
            element.events.onDragStop.add(_this.dragStopgrp, _this);
        });



        _this.yellowGrp.children.forEach(element => {
            element.inputEnabled = true;
            element.input.enableDrag(true);
            element.events.onDragUpdate.add(_this.dragUpdategrp, _this);
            element.events.onDragStop.add(_this.dragStopgrp, _this);
        });



    },

    dragUpdategrp: function (target) {

        target.bringToTop();
        var frontpos = 1;
        var backpos = 1;
        var leftpos = 1;
        var rightpos = 1;
        var draggedCubex = target.x - 25;
        var draggedCubey = target.y;
        var orangeCnt = 0;
        grp = _this.firstGrp;


        if (_this.yellowGrp.length > 0 && target == _this.yellowGrp.getChildAt(0)) {
            _this.yellowGrp.getChildAt(0).y = draggedCubey + 1
            _this.yellowGrp.getChildAt(0).x = draggedCubex
            draggedCubex += 94;

        }
        else if (_this.yellowGrp.length > 0) {
            _this.yellowGrp.getChildAt(0).y = draggedCubey + 1
            _this.yellowGrp.getChildAt(0).x = draggedCubex - 94

        }
        for (let k = 0; k < grp.length; k++) {

            if (grp.getChildAt(k).key == 'greenBox') {

                grp.getChildAt(k).y = draggedCubey

                if (_this.count1 <= 3)
                    grp.getChildAt(k).x = draggedCubex + 23 * frontpos;
                else
                    grp.getChildAt(k).x = draggedCubex + 11 * frontpos;

                if (grp.getChildAt(k).key == 'greenBox')
                    frontpos++;
            }
            else {
                if (_this.count1 <= 3) {

                    grp.getChildAt(k).y = draggedCubey + (22 * orangeCnt)
                    orangeCnt++;
                    if (target.key == 'orangeBox')
                        grp.getChildAt(k).x = draggedCubex + 23 * frontpos;
                    else
                        grp.getChildAt(k).x = draggedCubex + 23 * (frontpos + 1);
                }
                else {
                    grp.getChildAt(k).y = draggedCubey + (11 * orangeCnt)
                    orangeCnt++;
                    if (target.key == 'orangeBox') {
                        grp.getChildAt(k).x = draggedCubex + 11 * frontpos;
                    }
                    else {


                        grp.getChildAt(k).x = draggedCubex + 11 * (frontpos + 1);

                        if (_this.yellowGrp.length > 0 && target == _this.yellowGrp.getChildAt(0)) {
                            grp.getChildAt(k).x = draggedCubex + 11 * (frontpos);

                        }
                    }
                }
            }
        }
    },
    dragStopgrp: function (target) {
        greenCn = Math.round(multiplierArr[_this.count1] * 100);

        for (t = 0; t < _this.yellowGrp2.length; t++) {
            if (_this.checkOverlap(target, _this.yellowGrp2.getChildAt(t))) {
                if (_this.ansBoxesCount % 2 == 0 || (greenCn % 10 == 0))
                    _this.makeDraggableGrp();
                else
                    _this.makeRevDraggableGrp();

                break;
            }
        }
        _this.recreateSidebarGrp()
    },

    makeGrayBoxes: function () {
        if (randarr[_this.count] == 1) {
            greenCn = Math.round(multiplicandArr[_this.count1] * 10)
        }
        else {
            greenCn = Math.round(multiplicandArr[_this.count1] * 100)
        }
        grp = _this.g1;
        yellowgrp = _this.yellowGrp.getChildAt(0);
        for (i = 0; i < greenCn; i++) {
            newBox = _this.add.sprite((i % 10) * 15 + yellowgrp.x - 3, yellowgrp.y - 8 + 138 - Math.floor(i / 10) * 15, 'grySmall');
            newBox.scale.setTo(0.57, 0.67)
            grp.addChild(newBox);
        }
        if (_this.yellowGrp.children.length > 1) {
            grp = _this.g2;
            yellowgrp = _this.yellowGrp.getChildAt(1);
            for (i = 0; i < greenCn; i++) {
                newBox = _this.add.sprite((i % 10) * 15 + yellowgrp.x - 3, yellowgrp.y - 8 + 138 - Math.floor(i / 10) * 15, 'grySmall');
                newBox.scale.setTo(0.57, 0.67)
                grp.addChild(newBox);
            }
        }

        if (_this.yellowGrp.children.length > 2) {
            grp = _this.g3;
            yellowgrp = _this.yellowGrp.getChildAt(2);
            for (i = 0; i < greenCn; i++) {
                newBox = _this.add.sprite((i % 10) * 15 + yellowgrp.x - 3, yellowgrp.y - 8 + 138 - Math.floor(i / 10) * 15, 'grySmall');
                newBox.scale.setTo(0.57, 0.67)
                grp.addChild(newBox);
            }
        }

        if (_this.yellowGrp.children.length > 3) {
            grp = _this.g4;
            yellowgrp = _this.yellowGrp.getChildAt(3);
            for (i = 0; i < greenCn; i++) {
                newBox = _this.add.sprite((i % 10) * 15 + yellowgrp.x - 3, yellowgrp.y - 8 + 138 - Math.floor(i / 10) * 15, 'grySmall');
                newBox.scale.setTo(0.57, 0.67)
                grp.addChild(newBox);
            }
        }
        q = _this.yellowGrp.children.length;
        if (q == 0) {
            yellowgrp = _this.or1;
            grp = _this.g1;
        }
        if (q == 1) {
            yellowgrp = _this.or2;
            grp = _this.g2;
        }
        if (q == 2) {
            yellowgrp = _this.or3;
            grp = _this.g3;
        }
        if (q == 3) {
            yellowgrp = _this.or4;
            grp = _this.g4;
        }
        if (randarr[_this.count] == 1) {
            x = Math.round(multiplierArr[_this.count1] * 10) % 10
            y = Math.round(multiplicandArr[_this.count1] * 10) % 10
        }
        else {
            x = Math.round(multiplierArr[_this.count1] * 10) % 10
            y = Math.floor(Math.round(multiplicandArr[_this.count1] * 100) / 10)
        }

        for (i = 0; i < y; i++) {
            for (j = 0; j < x; j++) {
                newBox = _this.add.sprite(j * 15 + yellowgrp.x - 2, yellowgrp.y - 7.5 + 238 - i * 15, 'grySmall');
                newBox.scale.setTo(0.57, 0.67)
                grp.addChild(newBox);
            }
        }
        if (randarr[_this.count1] == 0) {
            for (z = 0; z < Math.round(multiplierArr[_this.count1] * 10) % 10; z++) {
                x = z * 15 - 3
                x += yellowgrp.x
                y = (238 - i * 15) - 8 + 9 + yellowgrp.y
                gry = _this.add.sprite(x, y, 'grySmall2')
                gry.scale.setTo(0.65, 0.55);
                grp.addChild(gry);
            }
        }

        _this.g1.visible = false;
        _this.g2.visible = false;
        _this.g3.visible = false;
        _this.g4.visible = false;

    },

    evenDistribution: function (name) {
        if (multiplierArr[_this.count1] == '0.1' || multiplierArr[_this.count1] == '0.2' || multiplierArr[_this.count1] == '0.5' || multiplierArr[_this.count1] == '0.25') {
            for (t = 1; t < _this.yellowGrp2.children.length; t++) {
                // create grp with equal distance
                if (name == '0.5') {
                    xpos = 68;
                    xScale = 0.89
                }
                else if (name == '0.2') {
                    xpos = 27.3;
                    xScale = 0.89
                }
                else if (name == '0.1') {
                    xpos = 13.9
                    xScale = 0.88
                }
                else if (name == '0.25' || name == '0.25R') {
                    if (_this.ansBoxesCount % 2 == 0)
                        xpos = 27;
                    else
                        xpos = 41
                    xScale = 0.903
                }

                newBox = _this.add.sprite(_this.yellowHashgrp.children.length > 1 ? _this.yellowHashgrp.getChildAt(_this.yellowHashgrp.children.length - 2).x + xpos + 136.5 * (t) : 385 + 136.5 * (t - 1), 91, `${name}`);
                newBox.scale.setTo(xScale, 0.91);
                _this.yellowHashgrp2.addChild(newBox);
                _this.world.bringToTop(_this.yellowHashgrp)
                _this.world.bringToTop(_this.yellowHashgrp2)
                _this.world.bringToTop(_this.yellowSgrp)


                cnt = _this.countNumberOfElements();
                for (i = 0; i < _this.yellowSgrp2.children.length; i++) {
                    if (_this.yellowSgrp3.length > 0)
                        _this.yellowSgrp3.getChildAt(i).visible = false;
                    if (_this.yellowSgrp4.length > 0)
                        _this.yellowSgrp4.getChildAt(i).visible = false;
                    if (_this.yellowSgrp5.length > 0)
                        _this.yellowSgrp5.getChildAt(i).visible = false;
                    _this.yellowSgrp2.getChildAt(i).visible = false;
                }


            }
        }
    },
    makeSameDraggableParts: function () {

        if (multiplierArr[_this.count1] == '0.1' || multiplierArr[_this.count1] == '0.2' || multiplierArr[_this.count1] == '0.5' || multiplierArr[_this.count1] == '0.25') {
            for (t = 1; t < _this.yellowGrp2.children.length; t++) {
                if (t == 1)
                    yellowgrp = _this.yellowSgrp2;
                else if (t == 2)
                    yellowgrp = _this.yellowSgrp3;
                else if (t == 3)
                    yellowgrp = _this.yellowSgrp4;
                else if (t == 4)
                    yellowgrp = _this.yellowSgrp5;

                if (multiplier == 0.1) {
                    mul = 26.9;
                }
                else mul = 27.3
                if (_this.ansBoxesCount % 2 != 0) {
                    greenCn = Math.round(multiplierArr[_this.count1] * 100);
                    {
                        xpos = 273 * t;

                        for (i = 0; i < Math.floor(greenCn / 10); i++) {

                            x = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).x + mul : -6 + xpos
                            y = -5;
                            newBox = _this.add.sprite(x, y, 'greenBox');
                            yellowgrp.addChild(newBox);
                            newBox.scale.setTo(1, 1);
                        }
                        x = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).x + 27 : -6 + xpos
                        for (i = 0; i < greenCn % 10; i++) {
                            y = i % 10 != 0 ? i % 10 * 21 + 6 * (Math.floor(i % 10) - 1) : -6
                            newBox = _this.add.sprite(x, y, 'orangeBox');
                            newBox.scale.setTo(1.17, 1.1)
                            yellowgrp.addChild(newBox);
                        }
                    }
                    _this.world.bringToTop(yellowgrp)
                    _this.world.bringToTop(_this.yellowHashgrp)
                    _this.world.bringToTop(_this.yellowHashgrp2)

                    _this.ansBoxesCount2 += 1;
                }
                else {
                    greenCn = Math.round(multiplierArr[_this.count1] * 100);
                    {
                        x = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).x : -6 + xpos
                        for (i = 5; i < greenCn % 10 + 5; i++) {
                            y = i % 10 != 0 ? i % 10 * 21 + 6 * (Math.floor(i % 10) - 1) : -6
                            newBox = _this.add.sprite(x, y, 'orangeBox');
                            newBox.scale.setTo(1.17, 1.1)
                            yellowgrp.addChild(newBox);
                        }

                        for (i = 0; i < Math.floor(greenCn / 10); i++) {
                            x = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).x + mul : -6 + xpos
                            y = -5
                            newBox = _this.add.sprite(x, y, 'greenBox');
                            yellowgrp.addChild(newBox);
                            newBox.scale.setTo(1, 1);
                        }

                        _this.world.bringToTop(yellowgrp)
                        _this.world.bringToTop(_this.yellowHashgrp)
                        _this.world.bringToTop(_this.yellowHashgrp2)
                    }
                    _this.ansBoxesCount2 += 1;
                }
            }
        }
    },
    makeDraggableGrp: function () {
        if (_this.ansBoxesCount + _this.ansBoxesCount2 < valuesCombinations[_this.count1]) {
            if (multiplier == 0.1) {
                mul = 27.24;
            }
            else mul = 27.3
            if (_this.count1 <= 3) {
                yellowgrp = _this.yellowSgrp
                greenCn = Math.round(multiplierArr[_this.count1] * 100);
                {

                    for (i = 0; i < Math.floor(greenCn / 10); i++) {
                        x = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).x + mul : -6
                        y = -5;
                        newBox = _this.add.sprite(x, y + 16, 'greenBox');
                        yellowgrp.addChild(newBox);
                        newBox.scale.setTo(1, 1.18);
                    }
                    x = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).x + 27 : -6
                    for (i = 0; i < greenCn % 10; i++) {
                        y = i % 10 != 0 ? i % 10 * 25.5 + 6 * (Math.floor(i % 10) - 1) : -6
                        newBox = _this.add.sprite(x, y + 16, 'orangeBox');
                        newBox.scale.setTo(1.17, 1.3)
                        yellowgrp.addChild(newBox);
                    }

                    if (_this.ansBoxesCount >= 1) {
                        if (greenCn % 10 != 5) {
                            _this.createYellowHash(`${(greenCn / 100)}`)
                        }
                        else {
                            _this.createYellowHash(`${(greenCn / 100)}R`)
                        }
                    }
                }
                _this.world.bringToTop(yellowgrp)
                _this.world.bringToTop(_this.yellowHashgrp)
                _this.ansBoxesCount += 1;
                _this.yellowGrp2.children.forEach(element => {
                    element.alpha = 0.6
                });
            }
            else {
                yellowgrp = _this.yellowSgrp

                greenCn = Math.round(multiplierArr[_this.count1] * 100 - 100);
                {
                    x = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).x + (yellowgrp.getChildAt(yellowgrp.children.length - 1).key == 'yellowBox' ? 9 * 27 - 5 + 27 : + 27) : 0;
                    newbox = _this.add.sprite(x + 6, 30, 'yellowBox');
                    yellowgrp.addChild(newbox);
                    newbox.scale.setTo(1, 1.18);

                    xpos = 9 * 27 - 5;
                    for (i = 0; i < Math.floor(greenCn / 10); i++) {
                        x = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).x + 27 : -6 + xpos;
                        y = -5;
                        if (i == 0) x += xpos
                        newBox = _this.add.sprite(x, y + 28, 'greenBox');
                        yellowgrp.addChild(newBox);
                        newBox.scale.setTo(1, 1.18);
                    }
                    x = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).x + 27 : -6;
                    for (i = 0; i < greenCn % 10; i++) {
                        y = i % 10 != 0 ? i % 10 * 25.5 + 6 * (Math.floor(i % 10) - 1) : -6;
                        newBox = _this.add.sprite(x, y + 28, 'orangeBox');
                        newBox.scale.setTo(1.17, 1.3);
                        yellowgrp.addChild(newBox);
                    }
                    if (_this.ansBoxesCount >= 1) {
                        if (greenCn % 10 != 5) {
                            _this.createYellowHash(`1.${greenCn / 100}`)
                        }
                        else {
                            _this.createYellowHash(`1.${(greenCn / 100)}R`)
                        }
                    }
                    _this.ansBoxesCount += 1;

                    _this.world.bringToTop(_this.yellowHashgrp)

                    _this.yellowGrp2.children.forEach(element => {
                        element.alpha = 0.6
                    });
                }
            }
            _this.snapSound.pause();
            _this.snapSound.currentTime = 0;
            _this.snapSound.play();
            _this.world.bringToTop(_this.yellowSgrp)


        }
    },
    makeRevDraggableGrp: function () {
        if (_this.ansBoxesCount + _this.ansBoxesCount2 < valuesCombinations[_this.count1]) {

            if (multiplier == 0.1) {
                mul = 27.24;
            }
            else mul = 27.3
            if (_this.count1 <= 3) {
                yellowgrp = _this.yellowSgrp

                greenCn = Math.round(multiplierArr[_this.count1] * 100);
                {
                    x = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).x : -6
                    for (i = 5; i < greenCn % 10 + 5; i++) {
                        y = i % 10 != 0 ? i % 10 * 25.7 + 6 * (Math.floor(i % 10) - 1) : -6
                        newBox = _this.add.sprite(x, y + 16, 'orangeBox');
                        newBox.scale.setTo(1.17, 1.3)
                        yellowgrp.addChild(newBox);
                    }

                    for (i = 0; i < Math.floor(greenCn / 10); i++) {
                        x = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).x + mul : -6
                        y = -5
                        newBox = _this.add.sprite(x, y + 16, 'greenBox');
                        yellowgrp.addChild(newBox);
                        newBox.scale.setTo(1, 1.18);
                    }
                    if (_this.ansBoxesCount >= 1) {
                        if (greenCn % 10 != 5) {
                            _this.createYellowHash(`${(greenCn / 100)}`)

                        }
                        else {
                            _this.createYellowHash(`${(greenCn / 100)}`)
                        }
                    }
                    _this.world.bringToTop(_this.yellowHashgrp)
                    _this.world.bringToTop(_this.yellowSgrp)


                }
                _this.ansBoxesCount += 1;
                _this.yellowGrp2.children.forEach(element => {
                    element.alpha = 0.6
                });
            }
            else {
                yellowgrp = _this.yellowSgrp

                greenCn = Math.round(multiplierArr[_this.count1] * 100 - 100);
                {

                    x = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).x : -6;
                    for (i = 5; i < greenCn % 10 + 5; i++) {
                        y = i % 10 != 0 ? i % 10 * 25.7 + 6 * (Math.floor(i % 10) - 1) : -6;
                        newBox = _this.add.sprite(x, y + 28, 'orangeBox');
                        newBox.scale.setTo(1.17, 1.3);
                        yellowgrp.addChild(newBox);
                    }


                    for (i = 0; i < Math.floor(greenCn / 10); i++) {
                        x = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).x + 27 : -6 + xpos;
                        y = -5;
                        newBox = _this.add.sprite(x, y + 28, 'greenBox');
                        yellowgrp.addChild(newBox);
                        newBox.scale.setTo(1, 1.18);
                    }

                    x = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).x + 30 : 0;
                    newbox = _this.add.sprite(x, 30, 'yellowBox');
                    yellowgrp.addChild(newbox);
                    newbox.scale.setTo(1, 1.18);
                    if (_this.ansBoxesCount >= 1) {
                        if (greenCn % 10 != 5)
                            _this.createYellowHash(`1.${greenCn / 100}`)
                        else {
                            _this.createYellowHash(`1.${(greenCn / 100)}`)

                        }
                    }
                    _this.world.bringToTop(_this.yellowHashgrp)

                    _this.yellowGrp2.children.forEach(element => {
                        element.alpha = 0.6
                    });

                    _this.ansBoxesCount += 1;
                }
            }
            _this.snapSound.pause();
            _this.snapSound.currentTime = 0;
            _this.snapSound.play();
        }
        _this.world.bringToTop(_this.yellowSgrp)

    },

    createYellowHash: function (name) {

        if (name == '1.0.25')
            name = '1.25'
        if (name == '1.0.25R')
            name = '1.25R'
        if (name == '1.25' || name == '1.25R') {
            if (_this.ansBoxesCount % 2 != 0)
                xpos = 177 - 1
            else
                xpos = 164 - 2
            xScale = 0.91

        }
        else if (name == '1.0.5' || name == '1.0.5R') {
            xpos = 198
            xScale = 2.24
        }
        else if (name == '0.5') {
            xpos = 68;
            xScale = 0.89

        }
        else if (name == '0.2') {
            xpos = 27.3;
            xScale = 0.89

        }
        else if (name == '0.1') {
            xpos = 13.6
            xScale = 0.86

        }
        else if (name == '0.4') {
            xpos = 55;
            xScale = 0.89

        }
        else if (name == '0.3') {
            xpos = 41;
            xScale = 0.89

        }
        else if (name == '0.6') {
            xpos = 82;
            xScale = 0.89

        }
        else if (name == '0.8') {
            xpos = 109;
            xScale = 0.89

        }
        else if (name == '0.75' || name == '0.75R') {
            if (_this.ansBoxesCount % 2 == 0)
                xpos = 95;
            else
                xpos = 109
            xScale = 0.97

        }
        else if (name == '0.25' || name == '0.25R') {
            if (_this.ansBoxesCount % 2 == 0)
                xpos = 27;
            else
                xpos = 41
            xScale = 0.91

        }
        else if (name == '0.15' || name == '0.15R') {
            if (_this.ansBoxesCount % 2 == 0) {
                xpos = 14;
                xScale = 0.91

            }
            else {
                xpos = 27
                xScale = 0.98
            }


        }
        if (name == '1.0.5' || name == '1.0.5R')
            name = '0.6'

        if (_this.count1 > 3) {
            newBox = _this.add.sprite(_this.yellowHashgrp.children.length > 0 ? _this.yellowHashgrp.getChildAt(_this.yellowHashgrp.children.length - 1).x + xpos : 250, 98 + 7, `${name}`);
            newBox.scale.setTo(xScale, 1.06);
        }
        else {
            newBox = _this.add.sprite(_this.yellowHashgrp.children.length > 0 ? _this.yellowHashgrp.getChildAt(_this.yellowHashgrp.children.length - 1).x + xpos : 249, 93 + 7, `${name}`);
            newBox.scale.setTo(xScale, 1.07);
        }
        _this.yellowHashgrp.addChild(newBox);
        _this.world.bringToTop(_this.yellowHashgrp)
        _this.world.bringToTop(_this.yellowSgrp)

        cnt = _this.countNumberOfElements();

        for (i = 0; i < cnt * _this.yellowHashgrp.children.length; i++) {
            _this.yellowSgrp.getChildAt(i).visible = false;
        }

    },
    countNumberOfElements: function () {
        num = multiplierArr[_this.count1] * 100;
        cnt = 0;
        while (num > 0) {
            cnt += (num % 10)
            num = Math.floor(num / 10);
        }
        return cnt;
    },
    recreateDraggableGrp: function (yellowgrp) {
        greenCn = Math.round(multiplicandArr[_this.count1] * 100);
        grplength = Math.floor(greenCn / 10) + greenCn % 10;
        loopcount = (yellowgrp.children.length / grplength) - 1
        // children = _this.yellowGrp.children.length
        for (q = 0; q < _this.yellowGrp.children.length + 1; q++) {
            if (q == 0) yellowgrp = _this.or1;
            if (q == 1) yellowgrp = _this.or2;
            if (q == 2) yellowgrp = _this.or3;
            if (q == 3) yellowgrp = _this.or4;
            while (yellowgrp.children.length) {
                yellowgrp.getChildAt(0).destroy();
            }
        }

        for (m = 0; m < loopcount; m++) {
            if (yellowgrp.children.length > 0) {
                ypos = yellowgrp.getChildAt(yellowgrp.children.length - 1).y - 27.5;
            } else ypos = 420;

            for (q = 0; q < _this.yellowGrp.children.length; q++) {
                if (q == 0) yellowgrp = _this.or1;
                if (q == 1) yellowgrp = _this.or2;
                if (q == 2) yellowgrp = _this.or3;
                if (q == 3) yellowgrp = _this.or4;

                for (i = 0; i < Math.floor(greenCn / 10); i++) {
                    x = -8;
                    y = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).y - 27.5 : 420
                    newBox = _this.add.sprite(x, y, 'greenBoxHr');
                    yellowgrp.addChild(newBox);
                    newBox.scale.setTo(1, 1);
                }
                y = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).y - 28 : 420;
                for (i = 0; i < greenCn % 10; i++) {
                    x = i % 10 != 0 ? i % 10 * 21 + 6 * (Math.floor(i % 10) - 1) : -6
                    newBox = _this.add.sprite(x, y, 'orangeBox');
                    newBox.scale.setTo(1.17, 1.1)
                    yellowgrp.addChild(newBox);
                }
            }


            q = _this.yellowGrp.children.length;
            if (q == 0) yellowgrp = _this.or1;
            if (q == 1) yellowgrp = _this.or2;
            if (q == 2) yellowgrp = _this.or3;
            if (q == 3) yellowgrp = _this.or4;

            for (i = 0; i < Math.floor(greenCn / 10); i++) {
                x = -7;
                y = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).y - 27.5 : 420
                newBox = _this.add.sprite(x, y, 'greenBoxHr');
                yellowgrp.addChild(newBox);
                newBox.scale.setTo(1, 1);
            }
            y = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).y - 28 : 420;
            for (i = 0; i < greenCn % 10; i++) {
                x = i % 10 != 0 ? i % 10 * 21 + 6 * (Math.floor(i % 10) - 1) : -6
                newBox = _this.add.sprite(x, y, 'orangeBox');
                newBox.scale.setTo(1.17, 1.1)
                yellowgrp.addChild(newBox);
            }

        }
        _this.yellowGrp.children.forEach(element => {
            element.alpha = 0.6
        });
        _this.gray.alpha = 0.6

        if (loopcount == 0) {
            _this.yellowGrp.children.forEach(element => {
                element.alpha = 1
            });
            _this.gray.alpha = 1

        }
    },
    recreateSidebarGrp: function () {
        console.log("making sidebar grp")
        _this.firstGrp.destroy();
        _this.firstGrp = _this.add.group();
        greenCn = Math.round(multiplierArr[_this.count1] * 100);


        if (_this.count1 <= 3) {
            for (i = 0; i < Math.floor(greenCn / 10); i++) {
                x = i > 0 ? 22 * i + 5 * (i - 1) : -6
                newBox = _this.add.sprite(x + 257, -6 + 100, 'greenBox');
                _this.firstGrp.addChild(newBox);
            }
            for (i = 0; i < greenCn % 10; i++) {
                x = 21.7 * Math.floor(greenCn / 10) + 5 * (Math.floor(greenCn / 10) - 1)
                y = i % 10 != 0 ? i % 10 * 21 + 6 * (Math.floor(i % 10) - 1) : -6
                newBox = _this.add.sprite(x + 257, y + 100, 'orangeBox');
                newBox.scale.setTo(1.15, 1.1)
                _this.firstGrp.addChild(newBox);
            }
            _this.firstGrp.x = 100;
            _this.firstGrp.y = 40;
            _this.firstGrp.scale.setTo(0.6);
            _this.firstGrp.y = 140;
            _this.firstGrp.x = -118 + 10 * (9 - (Math.round((_this.firstGrp.getChildAt(_this.firstGrp.length - 1).x - _this.firstGrp.getChildAt(0).x) / 28)));
        }


        else {
            _this.yellowGrp.destroy();
            _this.yellowGrp = _this.add.group();

            greenCn = Math.round(multiplierArr[_this.count1] * 100 - 100);
            {
                newbox = _this.add.sprite(33, 205, 'yellowBox');
                _this.yellowGrp.addChild(newbox);
                newbox.scale.setTo(0.4, 0.46);
                xpos = 69;
                yellowgrp = _this.firstGrp;
                for (i = 0; i < Math.floor(greenCn / 10); i++) {
                    x = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).x + 11 : xpos;
                    y = 203;
                    if (i == 0) x += xpos
                    newBox = _this.add.sprite(x, y, 'greenBox');
                    _this.firstGrp.addChild(newBox);
                    newBox.scale.setTo(0.4, 0.46);
                }
                x = yellowgrp.children.length > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).x + 11 : -6;
                for (i = 0; i < greenCn % 10; i++) {
                    y = i > 0 ? yellowgrp.getChildAt(yellowgrp.children.length - 1).y + 12.3 : 203;
                    newBox = _this.add.sprite(x, y, 'orangeBox');
                    newBox.scale.setTo(0.42, 0.52);
                    _this.firstGrp.addChild(newBox);

                }

            }
        }
        _this.enableSideCubes();
        _this.world.bringToTop(_this.firstGrp);
        _this.world.bringToTop(_this.yellowGrp);


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
        _this.workSpace2.destroy();
        _this.greenStripe.destroy();
        _this.yellowStripe.destroy();
        _this.orangeStripe.destroy();
        _this.eraser.destroy();
        if (_this.grayBox) {
            _this.grayBox.visible = true;
            _this.grayBox.destroy();
        }
        _this.yellowSgrp.destroy();
        _this.yellowSgrp2.destroy();
        _this.yellowSgrp3.destroy();
        _this.yellowSgrp4.destroy();
        _this.yellowSgrp5.destroy();
        _this.yellowHashgrp.destroy();
        _this.yellowHashgrp2.destroy();
        _this.pSign1.destroy();
        _this.pSign2.destroy();
        _this.pSign3.destroy();
        _this.lastXArr = [0, 0];
        _this.grayBox = null;
        _this.grayBox2 = null;
        _this.firstGrp.destroy();
        _this.yellowGrp2.destroy();
        _this.firstGrp = null;
        _this.resizeg2 = null;

    },
    checkOverlap: function (spriteA, spriteB) {
        _this.boundsA = spriteA.getBounds();
        _this.boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(_this.boundsA, _this.boundsB);
    },
    applyingStyle: function (target) {
        // target = text element
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
        if (_this.q3Timer) clearTimeout(_this.q3Timer);
        if (_this.q2Timer) clearTimeout(_this.q2Timer);

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
        //* This game helps us divide a whole number by a decimal number using the comparison method
        _this.demoAudio1 = document.createElement('audio');
        _this.demoAudio1src = document.createElement('source');
        _this.demoAudio1src.setAttribute("src", window.baseUrl + "questionSounds/NSD-5-G7/" + _this.languageSelected + "/NSD_5_G7_d1.mp3");
        _this.demoAudio1.appendChild(_this.demoAudio1src);

        //* This question can be read as, “how many 1.25s are there in 5?”
        _this.demoAudio2 = document.createElement('audio');
        _this.demoAudio2src = document.createElement('source');
        _this.demoAudio2src.setAttribute("src", window.baseUrl + "questionSounds/NSD-5-G7/" + _this.languageSelected + "/NSD_5_G7_d2.mp3");
        _this.demoAudio2.appendChild(_this.demoAudio2src);


        // QUESTION AUDIOS
        //* Drag the whole number squares, decimal strips and square pieces to represent the dividend and the divisor.
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/NSD-5-G7/" +
            _this.languageSelected + "/NSD_5_G7_a1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        //* Overlap the divisor to find out how many of the divisors are there in the dividend.
        _this.q2Sound = document.createElement('audio');
        _this.q2Soundsrc = document.createElement('source');
        _this.q2Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/NSD-5-G7/" +
            _this.languageSelected + "/NSD_5_G7_a2.mp3");
        _this.q2Sound.appendChild(_this.q2Soundsrc);

        //* Count and type the answer.
        _this.q3Sound = document.createElement('audio');
        _this.q3Soundsrc = document.createElement('source');
        _this.q3Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/NSD-5-G7/" +
            _this.languageSelected + "/NSD_5_G7_a3.mp3");
        _this.q3Sound.appendChild(_this.q3Soundsrc);


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
        //_this.demoVideo_1.playbackRate = 1;
    },

    dA3: function () {
        console.log("inside dA3.....")
        _this.demoVideo_1.playbackRate = 1.5;
        _this.q2Timer = setTimeout(function ()    //* q2 js timer to play 2 after 35 seconds.
        {
            console.log("inside q2sound.....")
            clearTimeout(_this.q2Timer);         //* clear the time once its used.
            _this.q2Sound.play();
        }, 23000);
        _this.q2Sound.addEventListener('ended', _this.dA4);
    },

    dA4: function () {
        _this.q3Timer = setTimeout(function ()    //* q3 js timer to play 3 after 12 seconds.
        {
            console.log("inside q3sound.....")
            clearTimeout(_this.q3Timer);         //* clear the time once its used.
            _this.q3Sound.play();
        }, 5400);
    },

    showDemoVideo: function () {

        _this.demoVideo_1 = _this.add.video('NSD5G7');
        _this.demoVideo_1.play(false);
        _this.demoVideo_1.changeSource(window.baseUrl + "assets/demoVideos/NSD-5-G7.mp4");
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
