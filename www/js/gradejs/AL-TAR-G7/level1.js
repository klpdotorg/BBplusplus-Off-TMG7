Game.AL_TAR_G7level1 = function () { };


Game.AL_TAR_G7level1.prototype =
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

        // _this.Ask_Question1 = _this.createAudio("V1");
        _this.DemoVo1 = _this.createAudio("AL_TAR_G7_a1");//Here are some equations and their solutions
        _this.DemoVo2 = _this.createAudio("AL_TAR_G7_a2");//Solve the puzzle to match each equation to its solution
        _this.DemoVo3 = _this.createAudio("AL_TAR_G7_a3");//Triangular pieces can turn clockwise and anticlockwise with the use of these buttons. 

        telInitializer.gameIdInit("AL_TAR_G7", gradeSelected);// first Tele call
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
        // _this.DemoVideo();  //* at the end of demo video/skip pressed, it will unpause the game.
    },

    gameCreate: function (game) {
        //*add these  variables
        _this.noofAttempts = 0;//total attempt to answer q question
        _this.AnsTimerCount = 0;//total time
        _this.sceneCount = 0;//no of screen
        _this.questionid = null;//always 1

        _this.AnsTimerCount = 0;
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


        _this.counterForTimer = 0;

        _this.speakerbtnClicked = false;
        _this.rightbtn_Clicked = false;

        _this.Question_flag = -1;
        valuesCombinations = [];
        _this.scenepaused = false;

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.setBoundsToWorld();

        // sprite = game.add.sprite(400, 300, 'upTriangle');
        // sprite.anchor.setTo(0.5, 0.5);
        // this.physics.enable(sprite, Phaser.Physics.ARCADE);


        _this.background = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'bg');
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

                if (_this.Question_flag == 1) {
                    _this.DemoVo2.currentTime = 0;
                    _this.DemoVo2.play();
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
        //// _this.hintBtn = _this.add.sprite(670, 6, 'bulb');
        //// _this.hintBtn.scale.setTo(0.5, 0.6);
        //// _this.hintBtn.smoothed = false;
        //// _this.hintBtnAnim =// _this.hintBtn.animations.add('hint');
        //// _this.hintBtnAnim.play(15);
        //// _this.hintBtnAnim.onComplete.add(function () {
        //    // _this.hintBtnAnim.play(15);
        // }, _this);
        // //// _this.hintBtn.inputEnabled = true;
        // //// _this.hintBtn.input.useHandCursor = true;
        //// _this.hintBtn.inputEnabled = false;

        //// _this.hintBtn.events.onInputDown.add(function () {
        //     console.log("inside hintbutton function");
        //    // _this.hintBtn.inputEnabled = false;
        //    // _this.hintBtn.input.useHandCursor = false;
        //     //* show the demo video
        //     _this.time.events.add(1, function () {
        //         _this.ViewDemoVideo();
        //     });

        // });

        _this.generateStarsForTheScene(6);

        //* start the game with first question
        _this.time.events.add(1000, _this.getQuestion);
    },


    createAudio: function (src) {
        audio = document.createElement('audio');
        audiosrc = document.createElement('source');
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/AL-TAR-G7/" + _this.languageSelected + "/" + src + ".mp3");
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
           // _this.hintBtn.inputEnabled = true;
           // _this.hintBtn.input.useHandCursor = true;
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
        _this.generateLevel1Qn();
        _this.showInitialScreen()
        // _this.MakeSideBar();
        _this.questionid = 1;
    },
    stopVoice: function () {
        if (_this.Ask_Question1) {
            _this.Ask_Question1.pause();
            _this.Ask_Question1 = null;
        }
        if (_this.DemoVo1) {
            _this.DemoVo1.pause();
            _this.DemoVo1 = null;
        }
        if (_this.DemoVo2) {
            _this.DemoVo2.pause();
            _this.DemoVo2 = null;
        } if (_this.DemoVo3) {
            _this.DemoVo3.pause();
            _this.DemoVo3 = null;
        }

        // _this.Ask_Question2.pause();
        // _this.Ask_Question2 = null;

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

    // Function to generate the given equation
    solveEquation: function (equation, x) {
        parts = equation.split("=")
        leftPart = parts[0]
        rightPart = Number(parts[1])
        if (leftPart.includes("(")) {
            // (5/2)x or (q-5)/2 or (5/2)
            if (leftPart.split(/[+-]/).length == 1) {
                rightPart = rightPart * Number(leftPart.split(/[/()]/)[2])
                rightPart = rightPart / Number(leftPart.split(/[/()]/)[1])
                if (ansArr.includes(rightPart)) return false
                ansArr[x] = rightPart
                return rightPart == 0 || rightPart > 60 ? false : Number.isInteger(rightPart)
            }
            else {
                rightPart = rightPart * Number(leftPart.split("/")[1])
                if (leftPart.split("+").length > 1)
                    rightPart = rightPart - Number(leftPart.match(/\d+/g)[0])
                else
                    rightPart = rightPart + Number(leftPart.match(/\d+/g)[0])
                if (ansArr.includes(rightPart)) return false
                ansArr[x] = rightPart
                return rightPart == 0 || rightPart > 60 ? false : Number.isInteger(rightPart)
            }
        }
        else {
            if (leftPart.split(/[+-]/).length == 1) {
                if (leftPart.split("/").length == 1) {
                    rightPart = rightPart / Number(leftPart.split(variablearr[0])[0])

                    if (ansArr.includes(rightPart)) return false
                    ansArr[x] = rightPart

                    return rightPart == 0 || rightPart > 60 ? false : Number.isInteger(rightPart)
                }
                else {
                    if (leftPart.length == 3) {
                        rightPart = rightPart * Number(leftPart.split("/")[1])
                        if (ansArr.includes(rightPart)) return false
                        ansArr[x] = rightPart

                        return rightPart == 0 || rightPart > 60 ? false : Number.isInteger(rightPart)
                    }
                }
            }
            else {
                if (leftPart.includes("+")) {
                    rightPart = rightPart - Number(leftPart.split("+")[leftPart.split("+").length - 1])
                    if (leftPart.includes("/")) {
                        rightPart = rightPart * Number(leftPart.split(/[+/]/)[1])
                    }
                    else {
                        if (Number(leftPart.split(variablearr[0])[0]) > 0)
                            rightPart = rightPart / Number(leftPart.split(variablearr[0])[0])
                    }
                    if (ansArr.includes(rightPart)) return false
                    ansArr[x] = rightPart

                    return rightPart == 0 || rightPart > 60 ? false : Number.isInteger(rightPart)

                }
                else {
                    rightPart = rightPart + Number(leftPart.split("-")[leftPart.split("-").length - 1])
                    if (leftPart.includes("/")) {
                        rightPart = rightPart * Number(leftPart.split(/[-/]/)[1])
                    }
                    else {
                        if (Number(leftPart.split(variablearr[0])[0]) > 0)
                            rightPart = rightPart / Number(leftPart.split(variablearr[0])[0])
                    }
                    if (ansArr.includes(rightPart)) return false
                    ansArr[x] = rightPart

                    return rightPart == 0 || rightPart > 60 ? false : Number.isInteger(rightPart)
                }
            }
        }

    },
    generateLevel1Qn: function () {
        denomCom = []
        variablearr = ['p', 'x', 'm', 'n', 'y', 'q', 's']
        variablearr = _this.shuffle(variablearr)
        valuesCombinations = []
        multiplicandArr = []
        multiplierArr = []
        ansArr = []
        num = []
        denom = []
        cn = 0;
        isIncomplete = [-1, -1, -1, -1, -1, -1]
        for (i = 0; i < 6; i++) {
            do {
                numans = null
                denomans = null;
                isTrue = false
                signArr = ['X', '/']
                signArr = _this.shuffle(signArr)
                if (signArr[0] == 'X') {
                    num1 = Math.floor(Math.random() * (7 - 1 + 1) + 1)
                    if (num1 != 1)
                        num1 = num1 + "" + variablearr[0]
                    else
                        num1 = variablearr[0]

                }
                else {
                    num1 = Math.floor(Math.random() * (7 - 2 + 1) + 2)
                    typeArr = [1, 2]
                    typeArr = _this.shuffle(typeArr)
                    if (typeArr[0] == 1) {
                        numans = variablearr[0]
                        denomans = num1;
                        num1 = variablearr[0] + "/" + num1
                    }
                    else {
                        // (5/2)x or (q-5)/2
                        isTrue = true;
                        num2 = Math.floor(Math.random() * (7 - 2 + 1) + 2)
                        while (num1 == num2)
                            num2 = Math.floor(Math.random() * (7 - 2 + 1) + 2)
                        typeArr = [1, 2]
                        typeArr = _this.shuffle(typeArr)
                        if (typeArr[0] == 1) {
                            numans = (num2 + "" + variablearr[0])
                            denomans = (num1)
                            num1 = "(" + num2 + "/" + num1 + ")" + variablearr[0]
                        }
                        else {
                            signArr = ['+', "-"]
                            signArr = _this.shuffle(signArr)

                            denomans = (num1)
                            if (signArr[0] == "+") {
                                numans = (variablearr[0] + "+" + num2)
                                num1 = "(" + variablearr[0] + "+" + num2 + ")/" + num1
                            }
                            else {
                                numans = (variablearr[0] + "-" + num2)
                                num1 = "(" + variablearr[0] + "-" + num2 + ")/" + num1

                            }
                        }

                    }
                }

                // for 2nd thers a choice
                ispart2 = [0, 1]
                ispart2 = _this.shuffle(ispart2)
                if (!(ispart2[0] == 0 && num1.length > 1) && isTrue == false) {
                    num2 = Math.floor(Math.random() * (10 - 1 + 1) + 1)
                    signArr = ['+', "-"]
                    signArr = _this.shuffle(signArr)
                    num2 = signArr[0] + num2
                }
                else {
                    num2 = ""
                }

                num3 = Math.floor(Math.random() * (25 - 1 + 1) + 1)
                num3 = "=" + num3


            } while (!_this.solveEquation(num1 + "" + num2 + "" + num3, i) || multiplicandArr.includes(num1))



            if (num1.includes("/") && !num1.includes("(")) {
                num1 = "(" + num1 + ")"
            }
            if (numans && denomans) {
                isIncomplete[i] = 1;
                num.push(numans)
                denom.push(denomans)
                valuesCombinations.push(num1 + "" + num2 + "" + num3)
            }
            else {
                valuesCombinations.push(num1 + "" + num2 + "" + num3)
            }
            multiplicandArr.push(num1)
            multiplierArr.push(num2)

        }
        console.log(num)
        console.log(denom)
        console.log(isIncomplete)
        console.log(valuesCombinations)
        console.log(ansArr)
    },
    generateLevel2Qn: function () {

        // 1.	4 + 5(p – 1) =34  =>  p = 7
        // 2.	16 = 4 + 3(t + 2)  -=>  t = 2
        //      4 = 5(p – 2)
        // 3.	0 = 16 + 4(m – 6) => m = 2
        //       7m + 19/ 2  =13 → => m= 1/2
        //       2y + (5/2) = (37/2)
        //       (3/2) l = 2/3   
        //    

        denomCom = []
        variablearr = ['p', 'x', 'm', 'n', 'y', 'q', 's']
        variablearr = _this.shuffle(variablearr)
        valuesCombinations = []
        multiplicandArr = []
        multiplierArr = []
        ansArr = []
        for (i = 0; i < 6; i++) {
            do {
                isTrue = false
                signArr = ['X', '/']
                signArr = _this.shuffle(signArr)
                if (signArr[0] == 'X') {
                    isNum1 = [0, 1]
                    isNum1 = _this.shuffle(isNum1)
                    if (isNum1[0] == 1)
                        num1 = Math.floor(Math.random() * (7 - 1 + 1) + 1)
                    else num1 = ""

                    num21 = Math.floor(Math.random() * (7 - 1 + 1) + 1)
                    num22 = Math.floor(Math.random() * (8 - 2 + 1) + 2)
                    num23 = Math.floor(Math.random() * ((num22 - 1) - 1 + 1) + 1)

                    if (num1 != "")
                        num3 = num1 + (num21 * num22);
                    else
                        num3 = num21 * num22;

                    signArr = ['+', "-"]
                    signArr = _this.shuffle(signArr)

                    isRev = [0, 1]
                    isRev = _this.shuffle(isRev)

                    if (signArr[0] == '+') {
                        numAnsp = num22 - num23;
                        if (num1 == "") {
                            eq = num21 + "(" + variablearr[0] + "+" + num23 + ")=" + num3
                            if (isRev[0] == 1) {
                                eq = num3 + "=" + num21 + "(" + variablearr[0] + "+" + num23 + ")"
                            }
                        }
                        else {
                            eq = num1 + "+" + num21 + "(" + variablearr[0] + "+" + num23 + ")=" + num3
                            if (isRev[0] == 1) {
                                eq = num3 + "=" + num1 + "+" + num21 + "(" + variablearr[0] + "+" + num23 + ")"
                            }
                        }
                    }
                    else {
                        numAnsp = num22 + num23;
                        if (num1 == "") {
                            eq = num21 + "(" + variablearr[0] + "-" + num23 + ")=" + num3
                            if (isRev[0] == 1) {
                                eq = num3 + "=" + num21 + "(" + variablearr[0] + "-" + num23 + ")"
                            }
                        } else {
                            eq = num1 + "+" + num21 + "(" + variablearr[0] + "-" + num23 + ")=" + num3
                            if (isRev[0] == 1) {
                                eq = num3 + "=" + num1 + "+" + num21 + "(" + variablearr[0] + "-" + num23 + ")"
                            }
                        }
                    }

                }
                else {
                    typeArr = [1, 2]
                    typeArr = _this.shuffle(typeArr)
                    if (typeArr[0] == 1) {
                        num1 = Math.floor(Math.random() * (7 - 2 + 1) + 2)
                        typeArr = [1, 2]
                        typeArr = _this.shuffle(typeArr)
                        if (typeArr[0] == 1) {
                            // normal without frac
                            numAnsp = Math.floor(Math.random() * (7 - 1 + 1) + 1)

                            frac1 = Math.floor(Math.random() * (7 - 1 + 1) + 1)
                            frac2 = Math.floor(Math.random() * (5 - 2 + 1) + 2)
                            while (frac1 == frac2 || frac1 % frac2 == 0 || frac2 % frac1 == 0 || ((num1 * numAnsp * frac2) + frac1) >= 100) {
                                frac1 = Math.floor(Math.random() * (7 - 1 + 1) + 1)
                                frac2 = Math.floor(Math.random() * (5 - 2 + 1) + 2)
                                numAnsp = Math.floor(Math.random() * (7 - 1 + 1) + 1)
                            }
                            op = ((num1 * numAnsp * frac2) + frac1)
                            if (op % frac2 != 0)
                                eq = num1 + "" + variablearr[0] + "+(" + frac1 + "/" + frac2 + ")=" + op + "/" + frac2;
                            else
                                eq = num1 + "" + variablearr[0] + "+(" + frac1 + "/" + frac2 + ")=" + op / frac2

                        }
                        else {
                            frac11 = Math.floor(Math.random() * (7 - 1 + 1) + 1)
                            frac12 = Math.floor(Math.random() * (5 - 2 + 1) + 2)
                            while (frac11 == frac12 || frac11 % frac12 == 0 || frac12 % frac11 == 0) {
                                frac11 = Math.floor(Math.random() * (7 - 1 + 1) + 1)
                                frac12 = Math.floor(Math.random() * (5 - 2 + 1) + 2)
                            }

                            frac1 = Math.floor(Math.random() * (7 - 1 + 1) + 1)
                            frac2 = Math.floor(Math.random() * (5 - 2 + 1) + 2)
                            while (frac1 == frac2 || frac1 % frac2 == 0 || frac2 % frac1 == 0 || ((num1 * frac11 * frac2) + (frac1 * frac12)) >= 100) {
                                //  1 3 7 7 3
                                frac1 = Math.floor(Math.random() * (7 - 1 + 1) + 1)
                                frac2 = Math.floor(Math.random() * (5 - 2 + 1) + 2)


                                frac11 = Math.floor(Math.random() * (7 - 1 + 1) + 1)
                                frac12 = Math.floor(Math.random() * (5 - 2 + 1) + 2)
                                while (frac11 == frac12 || frac11 % frac12 == 0 || frac12 % frac11 == 0) {
                                    frac11 = Math.floor(Math.random() * (7 - 1 + 1) + 1)
                                    frac12 = Math.floor(Math.random() * (5 - 2 + 1) + 2)
                                }
                            }

                            op = ((num1 * frac11 * frac2) + (frac1 * frac12))

                            if (op % (frac2 * frac12) != 0)
                                eq = num1 + "" + variablearr[0] + "+(" + frac1 + "/" + frac2 + ")=" + op + "/" + (frac2 * frac12);
                            else
                                eq = num1 + "" + variablearr[0] + "+(" + frac1 + "/" + frac2 + ")=" + op / (frac2 * frac12)

                            numAnsp = frac11 + "/" + frac12
                        }


                    }
                    else {
                        frac11 = Math.floor(Math.random() * (7 - 1 + 1) + 1)
                        frac12 = Math.floor(Math.random() * (5 - 2 + 1) + 2)
                        while (frac11 == frac12 || frac11 % frac12 == 0 || frac12 % frac11 == 0) {
                            frac11 = Math.floor(Math.random() * (7 - 1 + 1) + 1)
                            frac12 = Math.floor(Math.random() * (5 - 2 + 1) + 2)
                        }

                        typeArr = [1, 2]
                        typeArr = _this.shuffle(typeArr)
                        if (typeArr[0] == 1) {
                            frac1 = Math.floor(Math.random() * (7 - 1 + 1) + 1)
                            frac2 = Math.floor(Math.random() * (5 - 2 + 1) + 2)
                            while (frac1 == frac2 || frac1 % frac2 == 0 || frac2 % frac1 == 0 || (frac11 * frac1) >= 100) {
                                frac1 = Math.floor(Math.random() * (7 - 1 + 1) + 1)
                                frac2 = Math.floor(Math.random() * (5 - 2 + 1) + 2)
                            }
                            numAnsp = frac1 + "/" + frac2
                            op = (frac11 * frac1)
                            if (op % (frac2 * frac12) != 0)
                                eq = "(" + frac11 + "/" + frac12 + ")" + variablearr[0] + "=" + op + "/" + frac12 * frac2;
                            else
                                eq = "(" + frac11 + "/" + frac12 + ")" + variablearr[0] + "=" + (op / (frac2 * frac12))


                        }
                        else {
                            numAnsp = Math.floor(Math.random() * (7 - 2 + 1) + 2)
                            while (numAnsp * frac11 >= 100) {
                                numAnsp = Math.floor(Math.random() * (7 - 2 + 1) + 2)
                            }

                            op = (numAnsp * frac11)
                            if (op % (frac12) != 0)
                                eq = "(" + frac11 + "/" + frac12 + ")" + variablearr[0] + "=" + op + "/" + frac12;
                            else
                                eq = "(" + frac11 + "/" + frac12 + ")" + variablearr[0] + "=" + (op / (frac12))
                        }
                    }
                }
            } while (ansArr.includes(numAnsp))

            ansArr[i] = numAnsp
            valuesCombinations[i] = eq;
        }
        console.log(valuesCombinations)
        console.log(ansArr)
    },
    showInitialScreen: function () {
        // _this.Question_flag = 1;
        // _this.Ask_Question1.play();
        _this.level1 = 0;
        _this.selected = null;
        _this.panel = _this.add.sprite(20, 70, 'panel_1')
        _this.panel.scale.setTo(1, 1.02)
        _this.optionPanel = _this.add.sprite(870, 70, 'panel_2')
        _this.sign1 = _this.add.sprite(5, 10, 'reverse1')
        _this.sign1.inputEnabled = true;
        _this.sign1.events.onInputDown.add(_this.sign1Clicked, _this)
        _this.optionPanel.addChild(_this.sign1)
        _this.sign1.frame = 0;
        _this.sign2 = _this.add.sprite(5, 70, 'reverse2')
        _this.sign2.inputEnabled = true;
        _this.sign2.frame = 0;
        _this.optionPanel.addChild(_this.sign2)
        _this.sign2.events.onInputDown.add(_this.sign2Clicked, _this)

        _this.levelDisplay = _this.add.text(800, 8, 'Level 1')
        _this.applyingStyle(_this.levelDisplay)

        _this.generateLevel1Pattern()
        // _this.generateLevel2Qn()
        // _this.generateLevel2Pattern();
    },
    generateLevel1Pattern: function () {
        _this.sceneCount++;
        _this.noofAttempts = 0;
        pattern = [1, 0]
        pattern = _this.shuffle(pattern)
        _this.patternGrp = _this.add.group();

        if (pattern[0] == 1) {
            t1 = _this.add.sprite(266, 191, 'upTriangle')
            t1.anchor.setTo(0.5, 0.5)

            t2 = _this.add.sprite(105, 328, 'upTriangle')
            t2.anchor.setTo(0.5, 0.5)
            t2.angle = 180
            t3 = _this.add.sprite(185, 328, 'upTriangle')
            t3.anchor.setTo(0.5, 0.5)
            t4 = _this.add.sprite(265, 328, 'upTriangle')
            t4.anchor.setTo(0.5, 0.5)
            t4.angle = 180
            t5 = _this.add.sprite(345, 328, 'upTriangle')
            t5.anchor.setTo(0.5, 0.5)
            t6 = _this.add.sprite(425, 328, 'upTriangle')
            t6.anchor.setTo(0.5, 0.5)
            t6.angle = 180



        }
        else {
            t1 = _this.add.sprite(250 - 20, 185 - 20, 'upTriangle')
            t1.anchor.setTo(0.5, 0.5)
            t2 = _this.add.sprite(175 - 25, 455 - 20, 'upTriangle')
            t2.anchor.setTo(0.5, 0.5)
            t2.angle = 180
            t3 = _this.add.sprite(325 - 15, 455 - 20, 'upTriangle')
            t3.anchor.setTo(0.5, 0.5)
            t3.angle = 180
            t4 = _this.add.sprite(175 - 25, 320 - 20, 'upTriangle')
            t4.anchor.setTo(0.5, 0.5)
            t5 = _this.add.sprite(250 - 20, 320 - 20, 'upTriangle')
            t5.anchor.setTo(0.5, 0.5)
            t5.angle = 180
            t6 = _this.add.sprite(325 - 15, 320 - 20, 'upTriangle')
            t6.anchor.setTo(0.5, 0.5)
        }

        t1.scale.setTo(1.1)
        t2.scale.setTo(1.1)
        t3.scale.setTo(1.1)
        t4.scale.setTo(1.1)
        t5.scale.setTo(1.1)
        t6.scale.setTo(1.1)
        _this.patternGrp.addChild(t1)
        _this.patternGrp.addChild(t2)
        _this.patternGrp.addChild(t3)
        _this.patternGrp.addChild(t4)
        _this.patternGrp.addChild(t5)
        _this.patternGrp.addChild(t6)

        if (pattern[0] == 1)
            _this.generateLevel1AnsPattern(55);
        else
            _this.generateLevel1AnsPattern(20);

    },
    makeAnsTr: function (y) {
        t1 = _this.add.sprite(550 + y, 225, 'upTriangle')
        t1.anchor.setTo(0.5, 0.5)
        t1.posval = [1, 2, 3]
        t1.ansval = [-1, 1, 3]
        t1.sideTr = [1, 3]


        t2 = _this.add.sprite(630 + y, 225, 'upTriangle')
        t2.anchor.setTo(0.5, 0.5)
        t2.angle = 180;
        t2.posval = [1, 2, 3]
        t2.ansval = [0, -1, 2]
        t2.sideTr = [0, 2]


        t3 = _this.add.sprite(711 + y, 225, 'upTriangle')
        t3.anchor.setTo(0.5, 0.5)
        t3.posval = [1, 2, 3]
        t3.ansval = [1, -1, 5]
        t3.sideTr = [1, 5]


        t4 = _this.add.sprite(550 + y, 360, 'upTriangle')
        t4.anchor.setTo(0.5, 0.5)
        t4.angle = 180
        t4.posval = [1, 2, 3]
        t4.ansval = [-1, 0, 4]
        t4.sideTr = [0, 4]


        t5 = _this.add.sprite(630 + y, 360, 'upTriangle')
        t5.anchor.setTo(0.5, 0.5)
        t5.posval = [1, 2, 3]
        t5.ansval = [3, 5, -1]
        t5.sideTr = [3, 5]


        t6 = _this.add.sprite(709 + y, 360, 'upTriangle')
        t6.anchor.setTo(0.5, 0.5)
        t6.angle = 180;
        t6.posval = [1, 2, 3]
        t6.ansval = [4, 2, -1]
        t6.sideTr = [2, 4]

        t1.scale.setTo(1.1)
        t2.scale.setTo(1.1)
        t3.scale.setTo(1.1)
        t4.scale.setTo(1.1)
        t5.scale.setTo(1.1)
        t6.scale.setTo(1.1)

    },
    generateLevel1AnsPattern: function (y) {
        _this.answerGrpcpy = _this.add.group();
        _this.answerGrp = _this.add.group();

        _this.makeAnsTr(y);
        _this.answerGrpcpy.addChild(t1)
        _this.answerGrpcpy.addChild(t2)
        _this.answerGrpcpy.addChild(t3)
        _this.answerGrpcpy.addChild(t4)
        _this.answerGrpcpy.addChild(t5)
        _this.answerGrpcpy.addChild(t6)

        _this.makeAnsTr(y)
        _this.answerGrp.addChild(t1)
        _this.answerGrp.addChild(t2)
        _this.answerGrp.addChild(t3)
        _this.answerGrp.addChild(t4)
        _this.answerGrp.addChild(t5)
        _this.answerGrp.addChild(t6)

        _this.answerGrp.children.forEach(element => {
            element.frame = 2;
        });

        _this.fillQuestions();
        _this.rotatePart1ToFillQn();
    },
    generateLevel2Pattern: function () {
        _this.sceneCount++;
        _this.noofAttempts = 0;

        _this.level1 = 1;
        _this.count1 = 0;
        t7 = null;
        _this.sign1.events.onInputDown.removeAll();
        _this.sign2.events.onInputDown.removeAll();

        _this.sign1.inputEnabled = true;
        _this.sign1.events.onInputDown.add(_this.Lev2sign1Clicked, _this)

        _this.sign2.inputEnabled = true;
        _this.sign2.events.onInputDown.add(_this.Levsign2Clicked, _this)
        pattern = [1, 2, 3]
        pattern = _this.shuffle(pattern)
        _this.patternGrp = _this.add.group();

        if (pattern[0] == 1) {

            t1 = _this.add.sprite(33, 83 - 2, 'squareAngle')
            t1.scale.setTo(1.16, 1.36)
            t2 = _this.add.sprite(175, 83 - 2, 'squareAngle')
            t2.scale.setTo(1.16, 1.36)
            t3 = _this.add.sprite(33, 248 - 2, 'squareAngle')
            t3.scale.setTo(1.16, 1.36)

            t4 = _this.add.sprite(104, 472, 'upTriangle')
            t4.anchor.setTo(0.5, 0.5)
            t4.angle = 180
            t5 = _this.add.sprite(178, 470, 'upTriangle')
            t5.anchor.setTo(0.5, 0.5)
            t6 = _this.add.sprite(250, 472, 'upTriangle')
            t6.anchor.setTo(0.5, 0.5)
            t6.angle = 180
            t7 = _this.add.sprite(324, 470, 'upTriangle')
            t7.anchor.setTo(0.5, 0.5)

        }
        else if (pattern[0] == 2) {
            t1 = _this.add.sprite(113, 138, 'upTriangle')
            t1.anchor.setTo(0.5, 0.5)
            t2 = _this.add.sprite(395, 138, 'upTriangle')
            t2.anchor.setTo(0.5, 0.5);
            t3 = _this.add.sprite(41, 203, 'squareAngle')
            t3.scale.setTo(1.16, 1.36)
            t4 = _this.add.sprite(183, 203, 'squareAngle')
            t4.scale.setTo(1.16, 1.36)
            t5 = _this.add.sprite(325, 203, 'squareAngle')
            t5.scale.setTo(1.16, 1.36)
            t6 = _this.add.sprite(183, 368, 'squareAngle')
            t6.scale.setTo(1.16, 1.36)
        }
        else {

            t1 = _this.add.sprite(390 - 50, 215 - 70, 'upTriangle')
            // t1.angle = 180
            // t1.scale.setTo(0.85, 1.5)
            t1.anchor.setTo(0.5, 0.5)

            t2 = _this.add.sprite(320 - 60, 350 - 70, 'upTriangle')
            // t2.angle = 180
            // t2.scale.setTo(0.85, 1.5)
            t2.anchor.setTo(0.5, 0.5)

            t3 = _this.add.sprite(340, 280, 'upTriangle')
            // t3.scale.setTo(0.85, 1.5)
            t3.anchor.setTo(0.5, 0.5)
            t3.angle = 180;

            t4 = _this.add.sprite(45, 350, 'squareAngle')
            t4.scale.setTo(1.16, 1.36)
            t5 = _this.add.sprite(200 - 10, 350, 'squareAngle')
            t5.scale.setTo(1.16, 1.36)
            t6 = _this.add.sprite(335, 350, 'squareAngle')
            t6.scale.setTo(1.16, 1.36)
        }
        _this.patternGrp.addChild(t1)
        _this.patternGrp.addChild(t2)
        _this.patternGrp.addChild(t3)
        _this.patternGrp.addChild(t4)
        _this.patternGrp.addChild(t5)
        _this.patternGrp.addChild(t6)

        if (t7)
            _this.patternGrp.addChild(t7)


        _this.generateLevel2AnsPattern();

    },
    showCubesLevel2: function (grp) {
        t7 = null
        if (pattern[0] == 1) {

            t1 = _this.add.sprite(485, 160, 'upTriangle2')
            t1.anchor.setTo(0.5, 0.5)
            t1.posval = [1, 2, 3]
            t1.ansval = [-1, -1, 1]
            t1.ansPosval = [-1, -1, 2]
            t1.sideTr = [1]

            t2 = _this.add.sprite(415, 223, 'squareAngle')
            t2.scale.setTo(1.16, 1.36)
            t2.posval = [1, 2, 3, 4]
            t2.ansval = [-1, 0, 4, 5]
            t2.ansPosval = [-1, 3, 1, 2]
            t2.sideTr = [0, 4, 5]

            t3 = _this.add.sprite(765, 160, 'upTriangle2')
            t3.anchor.setTo(0.5, 0.5)
            t3.posval = [1, 2, 3]
            t3.ansval = [-1, -1, 3]
            t3.ansPosval = [-1, -1, 2]
            t3.sideTr = [3]


            t4 = _this.add.sprite(695, 223, 'squareAngle')
            t4.scale.setTo(1.16, 1.36)
            t4.posval = [1, 2, 3, 4]
            t4.ansval = [4, 2, -1, 6]
            t4.ansPosval = [3, 3, -1, 2]
            t4.sideTr = [2, 4, 6]

            t5 = _this.add.sprite(555, 223, 'squareAngle')
            t5.scale.setTo(1.16, 1.36)
            t5.posval = [1, 2, 3, 4]
            t5.ansval = [1, -1, 3, -1]
            t5.ansPosval = [3, -1, 1, -1]
            t5.sideTr = [1, 3]

            t6 = _this.add.sprite(485, 451, 'upTriangle2')
            t6.anchor.setTo(0.5, 0.5)
            t6.angle = 180
            t6.posval = [1, 2, 3]
            t6.ansval = [-1, 1, -1]
            t6.ansPosval = [-1, 4, -1]
            t6.sideTr = [1]


            t7 = _this.add.sprite(765, 451, 'upTriangle2')
            t7.anchor.setTo(0.5, 0.5)
            t7.angle = 180
            t7.posval = [1, 2, 3]
            t7.ansval = [-1, 3, -1]
            t7.ansPosval = [-1, 4, -1]
            t7.sideTr = [3]


        }
        else if (pattern[0] == 2) {
            t1 = _this.add.sprite(595, 138, 'upTriangle2')
            // t1.angle = 180
            // t1.scale.setTo(0.82, 1.5)
            t1.anchor.setTo(0.5, 0.5)
            t1.posval = [1, 2, 3]
            t1.ansval = [-1, -1, 2]
            t1.ansPosval = [-1, -1, 2]
            t1.sideTr = [2]

            t2 = _this.add.sprite(735, 138, 'upTriangle2')
            // t2.angle = 180
            // t2.scale.setTo(0.82, 1.5)
            t2.anchor.setTo(0.5, 0.5)
            t2.posval = [1, 2, 3]
            t2.ansval = [-1, -1, 3]
            t2.ansPosval = [-1, -1, 2]
            t2.sideTr = [3]

            t3 = _this.add.sprite(525, 203, 'squareAngle')
            t3.scale.setTo(1.16, 1.36)
            t3.posval = [1, 2, 3, 4]
            t3.ansval = [-1, 0, 3, 4]
            t3.ansPosval = [-1, 3, 1, 2]
            t3.sideTr = [0, 3, 4]

            t4 = _this.add.sprite(665, 203, 'squareAngle')
            t4.scale.setTo(1.16, 1.36)
            t4.posval = [1, 2, 3, 4]
            t4.ansval = [2, 1, -1, 5]
            t4.ansPosval = [3, 3, -1, 2]
            t4.sideTr = [1, 2, 5]

            t5 = _this.add.sprite(525, 368, 'squareAngle')
            t5.scale.setTo(1.16, 1.36)
            t5.posval = [1, 2, 3, 4]
            t5.ansval = [-1, 2, 5, -1]
            t5.ansPosval = [-1, 4, 1, -1]
            t5.sideTr = [2, 5]

            t6 = _this.add.sprite(665, 368, 'squareAngle')
            t6.scale.setTo(1.16, 1.36)
            t6.posval = [1, 2, 3, 4]
            t6.ansval = [4, 3, -1, -1]
            t6.ansPosval = [3, 4, -1, -1]
            t6.sideTr = [3, 4]

        }
        else {
            t1 = _this.add.sprite(594, 50 + 40 - 16, 'squareAngle')
            t1.posval = [1, 2, 3, 4]
            t1.ansval = [-1, -1, -1, 2]
            t1.ansPosval = [-1, -1, -1, 2]
            t1.sideTr = [2]
            t1.scale.setTo(1.16, 1.36)


            t2 = _this.add.sprite(591, 295 + 6, 'upTriangle2')
            // t2.angle = 180
            // t2.scale.setTo(0.82, 1.5)
            t2.anchor.setTo(0.5, 0.5)
            t2.posval = [1, 2, 3]
            t2.ansval = [-1, 2, 4]
            t2.ansPosval = [-1, 1, 2]
            t2.sideTr = [2, 4]

            t3 = _this.add.sprite(663, 296 + 6, 'upTriangle2')
            // t3.scale.setTo(0.82, 1.5)
            t3.angle = 180;
            t3.anchor.setTo(0.5, 0.5)
            t3.posval = [1, 2, 3]
            t3.ansval = [1, 0, 3]
            t3.ansPosval = [2, 4, 1]
            t3.sideTr = [0, 1, 3]

            t4 = _this.add.sprite(737, 295 + 6, 'upTriangle2')
            // t4.angle = 180
            // t4.scale.setTo(0.82, 1.5)
            t4.anchor.setTo(0.5, 0.5)
            t4.posval = [1, 2, 3]
            t4.ansval = [2, -1, 5]
            t4.ansPosval = [3, -1, 2]
            t4.sideTr = [2, 5]

            t5 = _this.add.sprite(535 - 12, 322 + 44, 'squareAngle')
            t5.posval = [1, 2, 3, 4]
            t5.ansval = [-1, 1, 5, -1]
            t5.ansPosval = [-1, 3, 1, -1]
            t5.sideTr = [1, 5]
            t5.scale.setTo(1.16, 1.36)


            t6 = _this.add.sprite(666, 322 + 44, 'squareAngle')
            t6.posval = [1, 2, 3, 4]
            t6.ansval = [4, 3, -1, -1]
            t6.ansPosval = [3, 3, -1, -1]
            t6.sideTr = [3, 4]
            t6.scale.setTo(1.16, 1.36)

        }
        grp.addChild(t1)
        grp.addChild(t2)
        grp.addChild(t3)
        grp.addChild(t4)
        grp.addChild(t5)
        grp.addChild(t6)

        if (t7)
            grp.addChild(t7)
    },
    generateLevel2AnsPattern: function () {
        _this.answerGrpcpy = _this.add.group();
        _this.answerGrp = _this.add.group();
        _this.showCubesLevel2(_this.answerGrpcpy);
        _this.showCubesLevel2(_this.answerGrp);

        _this.answerGrp.children.forEach(element => {
            element.frame = 2;
        });

        _this.filllevel2Questions();
        _this.rotatePart2ToFillQn();

    },
    writeAnsLev2: function (val, tr, pos) {
        _this.writeLev2Eq(tr, pos, val)
        tr.posval.forEach(element => {
            if (element == pos) {
                const index = tr.posval.indexOf(element);
                if (index > -1) { // only splice array when item is found
                    tr.posval.splice(index, 1)
                }
            }
        });
    },
    filllevel2Questions: function () {
        availableTr = [0, 1, 2, 3, 4, 5]
        if (pattern[0] == 1)
            availableTr = [0, 1, 2, 3, 4, 5, 6]

        for (i = 0; i < 6; i++) {

            rand = availableTr[Math.floor(Math.random() * availableTr.length)]
            trChoice = _this.answerGrp.getChildAt(rand);
            if (trChoice.key.includes("Triangle"))
                decidePos = [1, 2, 3]
            else
                decidePos = [1, 2, 3, 4]
            decidePos = _this.shuffle(decidePos)
            index = trChoice.ansval[decidePos[0] - 1];
            val = valuesCombinations[i];
            lcount = 0;

            while (trChoice.children.length >= 3 || !trChoice.posval.includes(decidePos[0]) || index < 0) {
                decidePos = _this.shuffle(decidePos);
                rand = availableTr[Math.floor(Math.random() * availableTr.length)]
                trChoice = _this.answerGrp.getChildAt(rand);
                val = valuesCombinations[i];
                index = trChoice.ansval[decidePos[0] - 1];
                lcount++;
            }

            _this.writeAnsLev2(valuesCombinations[i], trChoice, decidePos[0])
            _this.writeAnsLev2(variablearr[0] + " = " + ansArr[i], _this.answerGrp.getChildAt(index), trChoice.ansPosval[decidePos[0] - 1])


            for (p = 0; p < _this.answerGrp.children.length; p++) {
                if (_this.answerGrp.getChildAt(p) == trChoice)
                    cpytrchoice = _this.answerGrpcpy.getChildAt(p)
                if (_this.answerGrp.getChildAt(p) == _this.answerGrp.getChildAt(index))
                    cpyansTr = _this.answerGrpcpy.getChildAt(p)
            }
            _this.writeAnsLev2(valuesCombinations[i], cpytrchoice, decidePos[0])
            _this.writeAnsLev2(variablearr[0] + " = " + ansArr[i], cpyansTr, cpytrchoice.ansPosval[decidePos[0] - 1])

            if (trChoice.children.length >= 3) {
                index = availableTr.indexOf(rand);
                if (index > -1) { // only splice array when item is found
                    availableTr.splice(index, 1)
                }
            }
            if (_this.answerGrp.getChildAt(index).children.length >= 3) {
                for (m = 0; m < _this.answerGrp.children.length; m++) {
                    if (_this.answerGrp.getChildAt(m) == _this.answerGrp.getChildAt(index)) {
                        rand = m;
                        break;
                    }
                    if (_this.answerGrpcpy.getChildAt(m) == _this.answerGrp.getChildAt(index)) {
                        rand = m;
                        break;
                    }
                }
                index = availableTr.indexOf(rand);
                if (index > -1) { // only splice array when item is found
                    availableTr.splice(index, 1)
                }
            }
        }

        _this.answerGrp.children.forEach(element => {
            element.children.forEach(elements => {
                elements.visible = false;

            });
        });

        // storing position for answerr verification
        for (i = 0; i < _this.answerGrp.children.length; i++) {
            _this.answerGrpcpy.getChildAt(i).ansPos = i;
            _this.answerGrp.getChildAt(i).ansPos = i;
        }

    },
    rotatePart2ToFillQn: function () {
        _this.world.bringToTop(_this.answerGrpcpy)
        for (k = 0; k < _this.answerGrpcpy.children.length; k++) {
            element = _this.answerGrpcpy.getChildAt(k);
            if (valuesCombinations.includes(element.getChildAt(0)._text) || (element.children > 1 && valuesCombinations.includes(element.getChildAt(1)._text))) {
                _this.firstTr = element;
                _this.answerGrpcpy.getChildAt(k).visible = false
                _this.answerGrp.getChildAt(k).children.forEach(elements => {
                    elements.visible = true;
                });
                break;
            }
        }
        _this.patternGrp.visible = false;

        xval1 = [];
        yval1 = [];
        xval2 = [];
        yval2 = [];
        xval3 = [];
        yval3 = [];
        xval4 = [];
        yval4 = [];
        xval5 = [];
        yval5 = [];


        _this.patternGrp.children.forEach(element => {
            if (element != _this.firstTr) {
                // code randomise to rotate trianle
                if (element.angle == 0 && element.key.includes("Triangle")) {
                    xval1.push(element.x)
                    yval1.push(element.y)
                }
                else if (element.angle == 0) {
                    xval5.push(element.x)
                    yval5.push(element.y)
                }
                else if (element.angle == 90) {
                    xval2.push(element.x)
                    yval2.push(element.y)
                }
                else if (element.angle == -90) {
                    xval3.push(element.x)
                    yval3.push(element.y)
                }
                else if (element.angle == 180 || element.angle == -180) {
                    xval4.push(element.x)
                    yval4.push(element.y)
                }
            }
        });
        randarr = [0, 1, 2, 3, 4, 5]
        if (pattern[0] == 1)
            randarr = [0, 1, 2, 3, 4, 5, 6]
        randarr = _this.shuffle(randarr)
        k0 = 0, k1 = 0, k2 = 0, k3 = 0; k4 = 0;
        for (i = 0; i < _this.answerGrp.children.length; i++) {
            if (_this.answerGrpcpy.getChildAt(randarr[i]) != _this.firstTr) {
                if (_this.answerGrpcpy.getChildAt(randarr[i]).angle == 0 && _this.answerGrpcpy.getChildAt(randarr[i]).key.includes("Triangle")) {
                    _this.answerGrpcpy.getChildAt(randarr[i]).x = xval1[k0];
                    _this.answerGrpcpy.getChildAt(randarr[i]).y = yval1[k0];
                    k0++;
                }
                else if (_this.answerGrpcpy.getChildAt(randarr[i]).angle == 0) {
                    _this.answerGrpcpy.getChildAt(randarr[i]).x = xval5[k4];
                    _this.answerGrpcpy.getChildAt(randarr[i]).y = yval5[k4];
                    k4++;
                }
                else if (_this.answerGrpcpy.getChildAt(randarr[i]).angle == 90) {
                    _this.answerGrpcpy.getChildAt(randarr[i]).x = xval2[k1];
                    _this.answerGrpcpy.getChildAt(randarr[i]).y = yval2[k1];
                    k1++;
                }
                else if (_this.answerGrpcpy.getChildAt(randarr[i]).angle == -90) {
                    _this.answerGrpcpy.getChildAt(randarr[i]).x = xval3[k2];
                    _this.answerGrpcpy.getChildAt(randarr[i]).y = yval3[k2];
                    k2++;
                }
                else {
                    _this.answerGrpcpy.getChildAt(randarr[i]).x = xval4[k3];
                    _this.answerGrpcpy.getChildAt(randarr[i]).y = yval4[k3];
                    k3++;
                }
            }
            _this.answerGrpcpy.getChildAt(randarr[i]).InitialX = _this.answerGrpcpy.getChildAt(randarr[i]).x;
            _this.answerGrpcpy.getChildAt(randarr[i]).InitialY = _this.answerGrpcpy.getChildAt(randarr[i]).y;
        }
        _this.answerGrpcpy.forEach(element => {
            if (element.key.includes("Triangle"))
                element.rotatePos = [1, 2, 3]
            else
                element.rotatePos = [1, 2, 3, 4]

            if (element != _this.firstTr) {
                isRotate = [0, 1]
                isRotate = _this.shuffle(isRotate)
                if (isRotate[0] == 1) {
                    rotateDir = [1, 2]
                    rotateDir = _this.shuffle(rotateDir)
                    if (rotateDir[0] == 1) {
                        _this.Lev2sign1Clicked(element)
                    }
                    else {
                        _this.Levsign2Clicked(element)
                    }
                }
            }
        });

        _this.answerGrpcpy.forEach(element => {
            element.inputEnabled = true;
            element.events.onInputDown.add(_this.trSelected, _this)
            element.input.enableDrag(true);
            element.events.onDragUpdate.add(_this.triangleUpdate, _this);
            element.events.onDragStop.add(_this.triangleDrop, _this);
        });

    },
    isPossibleToFindAns: function (val, ans, tr, decidePos) {
        // check if direct end to end connection possible for this pos of answer or not
        _this.ansTr;
        if (decidePos == 1 && tr.angle == 0) {
            _this.ansElPos = 3

        }
        else if (decidePos == 2 && tr.angle == 0) {
            _this.ansElPos = 1
        }
        else if (decidePos == 3 && tr.angle == 0) {
            _this.ansElPos = 2
        }
        else if (decidePos == 1) {
            _this.ansElPos = 2
        }
        else if (decidePos == 2) {
            _this.ansElPos = 3
        }
        else if (decidePos == 3) {
            _this.ansElPos = 1
        }
        const anstr = tr.ansval[decidePos - 1]

        if (anstr == -1) return false;
        for (j = 0; j < 6; j++) {
            element = _this.answerGrp.getChildAt(j)
            if (element.children.length < 2 && element != tr && anstr == j) {

                if (tr.angle == 0 && element.angle != 0) {
                    if (element.posval.includes(_this.ansElPos)) {
                        _this.ansTr = element;
                        return true
                    }
                }
                else {
                    if (element.angle == 0 && element.posval.includes(_this.ansElPos)) {
                        _this.ansTr = element;
                        return true
                    }
                }
            }
        }
        return false;
    },
    writeAns: function (val, tr, decidePos) {
        if (tr.angle != 0) {
            // reversed
            if (decidePos == 1) {


                x = _this.add.text(40, 47, val)

                if (val.length <= 7) {
                    x.x = 30;
                    x.y = 35;
                }

                tr.addChild(x)
                x.angle = -120;

            } else if (decidePos == 3) {
                x = _this.add.text(1, -25, val)
                if (val.length <= 6) {
                    x.x = -4;
                    x.y = -15;
                }
                tr.addChild(x)
                x.angle = 120;
            }
            else {
                x = _this.add.text(40, 60, val)
                if (val.length <= 6) {
                    x.x = 25
                }
                tr.addChild(x)
                x.angle = -180;
            }
            _this.applyingStyleQn(x, val)

        }
        else {
            if (decidePos == 1) {

                x = _this.add.text(-55, 35, val)
                if (val.length <= 6) {
                    x.x = -45;
                    x.y = 15;
                }
                tr.addChild(x)
                x.angle = -60;

            } else if (decidePos == 2) {
                x = _this.add.text(13, -35, val)
                if (val.length <= 6) {
                    x.x = 21
                    x.y = -20
                }
                tr.addChild(x)
                x.angle = 60;
            }
            else {
                x = _this.add.text(-38, 40, val)
                tr.addChild(x)
                if (val.length <= 6) {
                    x.x = -27

                }
            }
            _this.applyingStyleQn(x, val)
        }

        tr.posval.forEach(element => {
            if (element == decidePos) {
                const index = tr.posval.indexOf(element);
                if (index > -1) { // only splice array when item is found
                    tr.posval.splice(index, 1)
                }
            }
        });


    },
    fillQuestions: function () {
        availableTr = [0, 1, 2, 3, 4, 5]
        for (i = 0; i < 6; i++) {
            decidePos = [1, 2, 3]

            decidePos = _this.shuffle(decidePos)
            rand = availableTr[Math.floor(Math.random() * availableTr.length)]
            trChoice = _this.answerGrp.getChildAt(rand);
            const index = trChoice.ansval.indexOf(-1);
            if (index > -1) {
                decidePos.splice(index, 1)
            }
            val = valuesCombinations[i];
            lcount = 0;

            while (trChoice.children.length >= 2 || !trChoice.posval.includes(decidePos[0]) || _this.isPossibleToFindAns(val, ansArr[i], trChoice, decidePos[0]) == false) {
                rand = availableTr[Math.floor(Math.random() * availableTr.length)]
                trChoice = _this.answerGrp.getChildAt(rand);
                val = valuesCombinations[i];
                decidePos = _this.shuffle(decidePos);
                lcount++;

                if (lcount == 20) {
                    break;
                }

            }
            _this.isPossibleToFindAns(val, ansArr[i], trChoice, decidePos[0])
            _this.writeAns(valuesCombinations[i], trChoice, decidePos[0])
            _this.writeAns(variablearr[0] + " = " + ansArr[i], _this.ansTr, _this.ansElPos)


            for (p = 0; p < 6; p++) {
                if (_this.answerGrp.getChildAt(p) == trChoice)
                    cpytrchoice = _this.answerGrpcpy.getChildAt(p)
                if (_this.answerGrp.getChildAt(p) == _this.ansTr)
                    cpyansTr = _this.answerGrpcpy.getChildAt(p)
            }
            _this.writeAns(valuesCombinations[i], cpytrchoice, decidePos[0])
            _this.writeAns(variablearr[0] + " = " + ansArr[i], cpyansTr, _this.ansElPos)

            if (trChoice.children.length >= 2) {
                const index = availableTr.indexOf(rand);
                if (index > -1) { // only splice array when item is found
                    availableTr.splice(index, 1)
                }
            }
            if (_this.ansTr.children.length >= 2) {
                for (m = 0; m < 6; m++) {
                    if (_this.answerGrp.getChildAt(m) == _this.ansTr) {
                        rand = m;
                        break;
                    }
                    if (_this.answerGrpcpy.getChildAt(m) == _this.ansTr) {
                        rand = m;
                        break;
                    }
                }
                const index = availableTr.indexOf(rand);
                if (index > -1) { // only splice array when item is found
                    availableTr.splice(index, 1)
                }
            }
            // write ques and ans to triangle
        }

        _this.answerGrp.children.forEach(element => {
            element.children.forEach(elements => {
                elements.visible = false;

            });
        });

        // storing position for answerr verification
        for (i = 0; i < 6; i++) {
            _this.answerGrpcpy.getChildAt(i).ansPos = i;
            _this.answerGrp.getChildAt(i).ansPos = i;
        }

    },

    showDemoVoiceOvers: function () {

        _this.DemoVo1.play();

        _this.hand = _this.add.image(160, 300, 'hand');
        _this.hand.scale.setTo(0.55);

        _this.handTween = _this.add.tween(_this.hand);
        _this.handTween.to({ x: 340 }, 900, 'Linear', true, 0);

        _this.DemoVo1.addEventListener('ended', function () {

            _this.time.events.add(500, () => {
                _this.time.events.add(600, () => {

                    _this.DemoVo3.play();

                    _this.handTween3 = _this.add.tween(_this.hand);
                    _this.handTween3.to({ x: _this.optionPanel.x + 30, y: _this.optionPanel.y + 30 }, 800, 'Linear', true, 0);

                    _this.handTween3.onComplete.add(() => {
                        _this.handTween2 = _this.add.tween(_this.hand);
                        _this.handTween2.to({ y: 160 }, 900, 'Linear', true, 0);

                        _this.DemoVo3.addEventListener('ended', () => {
                            _this.hand.destroy();
                            _this.showQnDemoPart();
                        })
                    })
                })

            })
        });

    },
    showDemoDrag: function () {

        _this.hand.scale.setTo(0.55);
        _this.sign2.frame = 0;
        _this.handTween2 = _this.add.tween(_this.hand);
        _this.time.events.add(500, () => {
            _this.handTween2.to({ x: _this.firstTr.x, y: _this.firstTr.y }, 1000, 'Linear', true, 0);
        })

        _this.handTween2.onComplete.add(() => {

            _this.time.events.add(800, () => {
                _this.world.bringToTop(_this.firstTr)
                _this.firstTr.bringToTop();

                posx = _this.answerGrp.getChildAt(_this.FirstvaluePos).x;
                posy = _this.answerGrp.getChildAt(_this.FirstvaluePos).y;

                _this.dragTween1 = _this.add.tween(_this.firstTr);
                _this.handDragTween = _this.add.tween(_this.hand);
                _this.handDragTween.to({ x: posx, y: posy }, 1000, 'Linear', true, 0);
                _this.dragTween1.to({ x: posx, y: posy }, 1000, 'Linear', true, 0);


                _this.dragTween1.onComplete.add(function () {

                    _this.DemoVo2.play();
                    _this.answerGrpcpy.getChildAt(5).visible = false;
                    _this.answerGrpcpy.getChildAt(5).x = _this.answerGrpcpy.getChildAt(5).InitialX;
                    _this.answerGrpcpy.getChildAt(5).y = _this.answerGrpcpy.getChildAt(5).InitialY;

                    _this.answerGrp.getChildAt(_this.FirstvaluePos).children.forEach(elements => {
                        elements.visible = true;
                    });
                    _this.hand.destroy();
                    _this.answerGrpcpy.forEach(element => {
                        element.inputEnabled = true;
                        element.events.onInputDown.add(_this.trSelected, _this)
                        element.input.enableDrag(true);
                        element.events.onDragUpdate.add(_this.triangleUpdate, _this);
                        element.events.onDragStop.add(_this.triangleDrop, _this);
                    });
                    _this.Question_flag = 1;


                })
            })
        })

    },
    showQnDemoPart: function () {

        _this.hand = _this.add.image(_this.firstTr.x, _this.firstTr.y, 'hand');
        _this.hand.scale.setTo(0.55)
        // click and then rotate
        _this.time.events.add(500, () => {
            _this.clickSound.play()
            _this.hand.scale.setTo(0.5);
            _this.firstTr.frame = 1;
            _this.time.events.add(800, () => {
                _this.hand.scale.setTo(0.55);
                if (_this.firstTr.rotatePos[0] == 2) {
                    // clockwise button clicked
                    _this.handTween = _this.add.tween(_this.hand);
                    _this.handTween.to({ x: _this.sign1.x + _this.optionPanel.x + 20, y: _this.sign1.y + _this.optionPanel.y + 20 }, 1000, 'Linear', true, 0);
                    _this.handTween.onComplete.add(function () {
                        _this.time.events.add(700, () => {

                            _this.hand.scale.setTo(0.5);
                            _this.clickSound.play();
                            _this.sign1.frame = 1
                            _this.sign1Clicked(_this.firstTr);
                            _this.time.events.add(700, () => {
                                _this.showDemoDrag();
                            })
                        })
                    });

                }
                else {
                    // anticlockwise
                    _this.handTween = _this.add.tween(_this.hand);
                    _this.handTween.to({ x: _this.sign2.x + _this.optionPanel.x + 20, y: _this.sign2.y + _this.optionPanel.y + 20 }, 1000, 'Linear', true, 0);
                    _this.handTween.onComplete.add(function () {
                        _this.time.events.add(700, () => {

                            _this.hand.scale.setTo(0.5);
                            _this.clickSound.play();
                            _this.sign2.frame = 1;
                            _this.sign2Clicked(_this.firstTr)
                            _this.time.events.add(700, () => {
                                _this.showDemoDrag();
                            })
                        })
                    });
                }

            })
        })
    },
    rotatePart1ToFillQn: function () {

        _this.world.bringToTop(_this.answerGrpcpy)
        for (k = 0; k < 6; k++) {
            element = _this.answerGrpcpy.getChildAt(k);

            // Logic for automatically showing 1st triangle
            if (valuesCombinations.includes(element.getChildAt(1)._text) || valuesCombinations.includes(element.getChildAt(0)._text)) {
                element.rotatePos = [1, 2, 3]
                _this.firstTr = element;

                rotateDir = [1, 2]
                rotateDir = _this.shuffle(rotateDir)
                if (rotateDir[0] == 1) {
                    _this.sign1Clicked(element);
                    // element.rotatePos = [3, 1, 2]
                }
                else {
                    _this.sign2Clicked(element);
                    // element.rotatePos = [2, 3, 1]
                }
                _this.FirstvaluePos = k;
                break;
            }
        }

        _this.patternGrp.visible = false;

        xvalup = []
        yvalup = []
        xvaldn = []
        yvaldn = []

        _this.patternGrp.children.forEach(element => {
            // if (element != _this.firstTr) 
            {

                if (element.angle == 0) {
                    xvalup.push(element.x)
                    yvalup.push(element.y)
                }
                else {
                    xvaldn.push(element.x)
                    yvaldn.push(element.y)
                }
            }
        });
        randarr = [0, 1, 2, 3, 4, 5]
        randarr = _this.shuffle(randarr)
        m = 0, k = 0;
        for (i = 0; i < 6; i++) {
            // if (_this.answerGrpcpy.getChildAt(randarr[i]) != _this.firstTr)
            {
                if (_this.answerGrpcpy.getChildAt(randarr[i]).angle == 0) {
                    _this.answerGrpcpy.getChildAt(randarr[i]).x = xvalup[k];
                    _this.answerGrpcpy.getChildAt(randarr[i]).y = yvalup[k];
                    k++;
                }
                else {
                    _this.answerGrpcpy.getChildAt(randarr[i]).x = xvaldn[m];
                    _this.answerGrpcpy.getChildAt(randarr[i]).y = yvaldn[m];
                    m++;
                }
            }
            _this.answerGrpcpy.getChildAt(randarr[i]).InitialX = _this.answerGrpcpy.getChildAt(randarr[i]).x;
            _this.answerGrpcpy.getChildAt(randarr[i]).InitialY = _this.answerGrpcpy.getChildAt(randarr[i]).y;
        }

        _this.answerGrpcpy.forEach(element => {
            if (element != _this.firstTr) {
                element.rotatePos = [1, 2, 3]
                isRotate = [0, 1]
                isRotate = _this.shuffle(isRotate)
                if (isRotate[0] == 1) {
                    rotateDir = [1, 2]
                    rotateDir = _this.shuffle(rotateDir)
                    if (rotateDir[0] == 1) {
                        _this.sign1Clicked(element)
                    }
                    else {
                        _this.sign2Clicked(element)
                    }
                }
            }
        });
        // show demo voice overs before showing demo 1st part
        _this.showDemoVoiceOvers();
        // _this.showQnDemoPart()

    },
    triangleUpdate: function (tr) {
        tr.bringToTop();
    },
    triangleDrop: function (tr) {
        if (_this.checkOverlap(tr, _this.answerGrp)) {
            if (_this.checkdroppedAns(tr) == true) {
                _this.celebrationSound.pause();
                _this.celebrationSound.currentTime = 0;
                _this.celebrationSound.play();
                _this.noofAttempts++;
                _this.starActions(_this.count1);
                if (_this.level1 != 0 && pattern[0] == 1) {
                    if (_this.count1 == 6)
                        _this.time.events.add(2000, _this.ClearAll);
                }
                else {
                    if (_this.count1 == 5) {
                        _this.noofAttempts++;
                        _this.starActions(_this.count1);
                        if (_this.level1 == 0)
                            _this.time.events.add(2000, _this.ClearPart1);
                        else {
                            _this.time.events.add(2000, _this.ClearAll);
                        }
                    }
                }
            }
            else {
                tr.x = tr.InitialX;
                tr.y = tr.InitialY;
                _this.noofAttempts++;
                _this.wrongans.play();
            }
        }
        else {
            tr.x = tr.InitialX;
            tr.y = tr.InitialY;
        }
        tr.x = tr.InitialX;
        tr.y = tr.InitialY;
    },
    checkdroppedAns: function (tr) {
        if (tr.rotatePos[0] != 1 || tr.rotatePos[1] != 2 || tr.rotatePos[2] != 3) {
            return false;
        }
        for (i = 0; i < _this.answerGrp.children.length; i++) {
            element = _this.answerGrp.getChildAt(i);
            if (_this.checkOverlap(tr, element) && tr.ansPos == element.ansPos && _this.sideTrExist(tr)) {
                element
                element.children.forEach(element => {
                    element.visible = true;
                });
                tr.visible = false;
                return true;
            }
        }
        return false;
    },

    sideTrExist: function (tr) {

        ans = false;
        tr.sideTr.forEach(element => {
            tr = _this.answerGrp.getChildAt(element)
            tr.children.forEach(ele => {
                if (ele.visible == true) {
                    ans = true;
                }
            });
        });
        return ans;

    },
    trSelected: function (triangle) {
        _this.answerGrpcpy.children.forEach(element => {
            if (element.frame == 1) element.frame = 0;
        });
        triangle.frame = 1
        _this.selected = triangle
    },
    writeLev2Eq: function (tr, pos, val) {
        // val = "7m+(3/2)=37/60"
        if (tr.angle == 0 && tr.key == "upTriangle2") {

            if (pos == 1) {
                x = _this.add.text(-55, 41, val)
                if (val.length <= 9) {
                    x.x = -45;
                    x.y = 21;
                }
                else if (val.length <= 12) {
                    x.x = -53;
                    x.y = 35;
                }

                x.angle = -60
                tr.addChild(x)
            }
            if (pos == 2) {
                x = _this.add.text(10, -40, val)
                if (val.length <= 9) {
                    x.x = 23;
                    x.y = -15;
                }
                else if (val.length <= 11) {
                    x.x = 19;
                    x.y = -20;
                }
                x.angle = 60
                tr.addChild(x)
            }
            if (pos == 3) {
                x = _this.add.text(-54, 45, val)
                if (val.length <= 8) {
                    x.x = -16;
                }
                else if (val.length <= 11) {
                    x.x = -30;
                }

                x.angle = 0
                tr.addChild(x)
            }

        }
        else if (tr.angle == 0 && tr.key == "downTriangle") {
            if (pos == 1) {
                x = _this.add.text(-64, -43, val)
                if (val.length <= 9) {
                    x.x = -47;
                    x.y = -26
                }
                else if (val.length <= 12) {
                    x.x = -54;
                    x.y = -34
                }
                tr.addChild(x)
                x.angle = 46;
            }
            if (pos == 2) {
                x = _this.add.text(-44, -42, val)
                if (val.length <= 11) {
                    x.x = -30;
                }
                tr.addChild(x);
            }
            if (pos == 3) {
                x = _this.add.text(-4, 23, val)
                if (val.length <= 8) {
                    x.x = 15;
                    x.y = 4;
                }
                else if (val.length <= 11 && tr.scale.x == 0.82) {
                    x.x = 7;
                    x.y = 12;
                }
                else if (val.length <= 10) {
                    x.x = 7;
                    x.y = 12;
                }
                x.angle = -45
                tr.addChild(x)
            }



        }
        else if (tr.angle == 0 && tr.key == "squareAngle") {
            if (pos == 1) {
                x = _this.add.text(3, 109, val)
                if (val.length <= 9) {
                    x.y = 85;
                }
                else if (val.length <= 11) {
                    x.y = 96;
                }
                tr.addChild(x)
                x.angle = 270;
            }
            if (pos == 2) {
                x = _this.add.text(12, 0, val)
                if (val.length <= 9) {
                    x.x = 40;
                }
                else if (val.length <= 12) {
                    x.x = 24;
                }
                tr.addChild(x)
            }
            if (pos == 3) {
                x = _this.add.text(118, 15, val)
                if (val.length <= 9) {
                    x.y = 35;
                }
                else if (val.length <= 12) {
                    x.y = 25;
                }
                x.angle = 90
                tr.addChild(x)
            }
            if (pos == 4) {
                x = _this.add.text(12, 104, val)
                if (val.length <= 9) {
                    x.x = 40;
                }
                else if (val.length <= 12) {
                    x.x = 24;
                }
                tr.addChild(x)
            }

        }
        else if (tr.angle == -90) {
            if (pos == 1) {
                x = _this.add.text(74, -32, val)
                if (val.length <= 8) {
                    x.x = 49;
                    x.y = -7;
                }
                else if (val.length <= 12) {
                    x.y = -21;
                    x.x = 61
                }
                tr.addChild(x)
                x.angle = 135;
            }
            if (pos == 2) {
                x = _this.add.text(-67, -45, val)
                if (val.length <= 8) {
                    x.y = -18;
                    x.x = -41
                }
                else if (val.length <= 12) {
                    x.y = -35;
                    x.x = -57
                }
                tr.addChild(x)
                x.angle = 45;
            }
            if (pos == 3) {
                x = _this.add.text(-45, -42, val)
                if (val.length <= 9) {
                    x.x = -21;
                }
                tr.addChild(x)
            }
        }
        else if (tr.angle == 90) {
            if (pos == 1) {
                x = _this.add.text(-1, 22, val)
                if (val.length <= 8) {
                    x.x = 14;
                    x.y = 6;
                }
                x.angle = -45
                tr.addChild(x)
            }
            if (pos == 2) {
                x = _this.add.text(-7, 33, val)
                if (val.length <= 8) {
                    x.x = -25;
                    x.y = 18;
                }
                else if (val.length <= 11) {
                    x.x = -18;
                    x.y = 24;
                }
                x.angle = -135
                tr.addChild(x)
            }
            if (pos == 3) {
                x = _this.add.text(-40, -42, val)
                if (val.length <= 9) {
                    x.x = -35;
                }
                tr.addChild(x)
            }
        }
        else if (tr.key == 'upTriangle2') {

            if (pos == 1) {
                x = _this.add.text(46, 49, val)
                if (val.length <= 9) {
                    x.x = 32;
                    x.y = 31
                }
                else if (val.length <= 12) {
                    x.x = 42;
                    x.y = 46
                }
                tr.addChild(x)
                x.angle = -120;
            }
            if (pos == 2) {
                x = _this.add.text(47, 60, val)
                if (val.length <= 8) {
                    x.x = 20;
                }
                else if (val.length <= 11) {
                    x.x = 36;
                }
                x.angle = 180;
                tr.addChild(x);
            }
            if (pos == 3) {
                x = _this.add.text(1, -33, val)
                if (val.length <= 8) {
                    x.x = -10;
                    x.y = -1;
                }
                else if (val.length <= 11) {
                    x.x = -5;
                    x.y = -20;
                }
                x.angle = 120
                tr.addChild(x)
            }
        }
        else {
            if (pos == 1) {
                x = _this.add.text(74, -34, val)
                if (val.length <= 9) {
                    x.x = 54;
                    x.y = -12;
                }
                else if (val.length <= 12) {
                    x.x = 68;
                    x.y = -28;
                }

                x.angle = 134
                tr.addChild(x)
            }
            if (pos == 2) {
                x = _this.add.text(-9, 33, val)
                if (val.length <= 9) {
                    x.x = -23;
                    x.y = 13;
                }
                if (val.length <= 11) {
                    x.x = -17;
                    x.y = 25;
                }
                x.angle = -135
                tr.addChild(x)
            }
            if (pos == 3) {
                x = _this.add.text(44, -28, val)
                if (val.length <= 8) {
                    x.x = 24;
                }
                else if (val.length <= 11) {
                    x.x = 36;
                }

                x.angle = 180
                tr.addChild(x)
            }
        }
        _this.applyingStyleQn(x, val)
        x.fontSize = "13px"
        if (tr.key == 'upTriangle2') {
            x.fontSize = "12px"
            // x.scale.setTo(1,1.1)


        }
        else if (tr.scale.x == 1.1 && tr.scale.y == 1.1) {
            x.scale.setTo(0.92)
        }
        else {
            x.scale.setTo(0.9, 1)
        }
    },
    Lev2sign1Clicked: function (tr) {

        if (_this.selected) {
            tr = _this.selected;
            _this.sign1.frame = 1;
            _this.clickSound.play();
        }
        if (tr.children.length == 0)
            return;
        total = tr.key.includes("Triangle") ? 2 : 3
        lastVal = tr.rotatePos[total];
        for (m = total; m > 0; m--) {
            tr.rotatePos[m] = tr.rotatePos[m - 1]
        }
        tr.rotatePos[0] = lastVal
        // 123 312
        deletionarr = []
        decidePos = 0;

        child = tr.children.length
        for (i = 0; i < child; i++) {
            if (((tr.getChildAt(i).x == -64) && tr.getChildAt(i).y == -43 && tr.angle == 0) || (tr.getChildAt(i).x == -47 && tr.getChildAt(i).y == -26) || (tr.getChildAt(i).x == -54 && tr.getChildAt(i).y == -34) || ((tr.getChildAt(i).x == 3) && (tr.getChildAt(i).y == 85 || tr.getChildAt(i).y == 96 || tr.getChildAt(i).y == 109)) || ((tr.getChildAt(i).x == 74 && tr.getChildAt(i).y == -32) || (tr.getChildAt(i).x == 49 && tr.getChildAt(i).y == -7)) || (tr.getChildAt(i).x == 61 && tr.getChildAt(i).y == -21) || (tr.getChildAt(i).x == -1 && tr.getChildAt(i).y == 22 && tr.angle == 90) || (tr.getChildAt(i).x == 14 && tr.getChildAt(i).y == 6 && tr.angle == 90) || (tr.getChildAt(i).x == 54 && tr.getChildAt(i).y == -12) || (tr.getChildAt(i).x == 74 && tr.getChildAt(i).y == -34) || (tr.getChildAt(i).x == 68 && tr.getChildAt(i).y == -28) || (tr.getChildAt(i).x == 64 && tr.getChildAt(i).y == -24) || (tr.getChildAt(i).x == -55 && tr.getChildAt(i).y == 41) || (tr.getChildAt(i).x == -45 && tr.getChildAt(i).y == 21) || (tr.getChildAt(i).x == -53 && tr.getChildAt(i).y == 35) || (tr.getChildAt(i).x == 46 && tr.getChildAt(i).y == 49) || (tr.getChildAt(i).x == 32 && tr.getChildAt(i).y == 31) || (tr.getChildAt(i).x == 42 && tr.getChildAt(i).y == 46)) {
                if (tr.key == "squareAngle")
                    decidePos = 2
                else
                    decidePos = 2;

            }
            else if (((tr.getChildAt(i).x == -44 || tr.getChildAt(i).x == -30) && tr.getChildAt(i).y == -42) || ((tr.getChildAt(i).x == 12 || tr.getChildAt(i).x == 40 || tr.getChildAt(i).x == 24) && tr.getChildAt(i).y == 0) || ((tr.getChildAt(i).x == -67) && tr.getChildAt(i).y == -45 && tr.angle == -90) || (tr.angle == -90 && tr.getChildAt(i).y == -18 && tr.getChildAt(i).x == -41) || (tr.getChildAt(i).y == -35 && tr.getChildAt(i).x == -57) || (tr.getChildAt(i).x == -7 && tr.getChildAt(i).y == 33) || (tr.getChildAt(i).x == -25 && tr.getChildAt(i).y == 18) || (tr.getChildAt(i).x == -18 && tr.getChildAt(i).y == 24) || (tr.getChildAt(i).x == -9 && tr.getChildAt(i).y == 33) || (tr.getChildAt(i).x == -23 && tr.getChildAt(i).y == 13) || (tr.getChildAt(i).x == -17 && tr.getChildAt(i).y == 25) || (tr.getChildAt(i).x == 10 && tr.getChildAt(i).y == -40) || (tr.getChildAt(i).x == 23 && tr.getChildAt(i).y == -15) || (tr.getChildAt(i).x == 19 && tr.getChildAt(i).y == -20) || ((tr.getChildAt(i).x == 47 || tr.getChildAt(i).x == 20 || tr.getChildAt(i).x == 36) && tr.getChildAt(i).y == 60)) {
                decidePos = 3;

            }
            else if ((tr.getChildAt(i).x == -4 && tr.getChildAt(i).y == 23) || (tr.getChildAt(i).x == 15 && tr.getChildAt(i).y == 4) || (tr.getChildAt(i).x == 7 && tr.getChildAt(i).y == 12) || ((tr.getChildAt(i).x == 118) && (tr.getChildAt(i).y == 35 || tr.getChildAt(i).y == 15 || tr.getChildAt(i).y == 25)) || ((tr.getChildAt(i).x == -45 || tr.getChildAt(i).x == -21) && tr.getChildAt(i).y == -42) || ((tr.getChildAt(i).x == -40 || tr.getChildAt(i).x == -35) && tr.getChildAt(i).y == -42) || ((tr.getChildAt(i).x == 44 || tr.getChildAt(i).x == 24 || tr.getChildAt(i).x == 36) && tr.getChildAt(i).y == -28) || ((tr.getChildAt(i).x == -54 || tr.getChildAt(i).x == -16 || tr.getChildAt(i).x == -30) && tr.getChildAt(i).y == 45) || (tr.getChildAt(i).x == 1 && tr.getChildAt(i).y == -33) || (tr.getChildAt(i).x == -10 && tr.getChildAt(i).y == -1) || (tr.getChildAt(i).x == -5 && tr.getChildAt(i).y == -20)) {
                if (tr.key == "squareAngle")
                    decidePos = 4
                else
                    decidePos = 1;

            }
            else if (((tr.getChildAt(i).x == 12 || tr.getChildAt(i).x == 40 || tr.getChildAt(i).x == 24) && tr.getChildAt(i).y == 104)) {
                decidePos = 1;

            }

            val = tr.getChildAt(i)._text;
            element = tr.getChildAt(i)
            element.visible = false;
            deletionarr.push(element);
            _this.writeLev2Eq(tr, decidePos, val)
        }
        deletionarr.forEach(element => {
            if (element.visible == false)
                element.destroy();
        });
        _this.time.events.add(300, () => {
            _this.sign1.frame = 0;
        })
    },
    Levsign2Clicked: function (tr) {

        if (_this.selected) {
            tr = _this.selected
            _this.sign2.frame = 1;
            _this.clickSound.play();
        }
        if (tr.children.length == 0)
            return;
        total = tr.key.includes("Triangle") ? 2 : 3
        startVal = tr.rotatePos[0];
        for (m = 0; m < total; m++) {
            tr.rotatePos[m] = tr.rotatePos[m + 1]
        }
        tr.rotatePos[total] = startVal;
        //  123 231 321
        deletionarr = []
        decidePos = 0;
        child = tr.children.length

        for (i = 0; i < child; i++) {
            // if (((tr.getChildAt(i).x == -64) && tr.getChildAt(i).y == -43 && tr.angle == 0) || (tr.getChildAt(i).x == -47 && tr.getChildAt(i).y == -26) || (tr.getChildAt(i).x == -54 && tr.getChildAt(i).y == -34) || ((tr.getChildAt(i).x == 3) && (tr.getChildAt(i).y == 85 || tr.getChildAt(i).y == 96 || tr.getChildAt(i).y == 109)) || ((tr.getChildAt(i).x == 74 && tr.getChildAt(i).y == -32) || (tr.getChildAt(i).x == 49 && tr.getChildAt(i).y == -7)) || (tr.getChildAt(i).x == 61 && tr.getChildAt(i).y == -21) || (tr.getChildAt(i).x == -1 && tr.getChildAt(i).y == 22 && tr.angle == 90) || (tr.getChildAt(i).x == 14 && tr.getChildAt(i).y == 6 && tr.angle == 90) || (tr.getChildAt(i).x == 54 && tr.getChildAt(i).y == -12) || (tr.getChildAt(i).x == 74 && tr.getChildAt(i).y == -34) || (tr.getChildAt(i).x == 68 && tr.getChildAt(i).y == -28) || (tr.getChildAt(i).x == 64 && tr.getChildAt(i).y == -24)) {
            if (((tr.getChildAt(i).x == -64) && tr.getChildAt(i).y == -43 && tr.angle == 0) || (tr.getChildAt(i).x == -47 && tr.getChildAt(i).y == -26) || (tr.getChildAt(i).x == -54 && tr.getChildAt(i).y == -34) || ((tr.getChildAt(i).x == 3) && (tr.getChildAt(i).y == 85 || tr.getChildAt(i).y == 96 || tr.getChildAt(i).y == 109)) || ((tr.getChildAt(i).x == 74 && tr.getChildAt(i).y == -32) || (tr.getChildAt(i).x == 49 && tr.getChildAt(i).y == -7)) || (tr.getChildAt(i).x == 61 && tr.getChildAt(i).y == -21) || (tr.getChildAt(i).x == -1 && tr.getChildAt(i).y == 22 && tr.angle == 90) || (tr.getChildAt(i).x == 14 && tr.getChildAt(i).y == 6 && tr.angle == 90) || (tr.getChildAt(i).x == 54 && tr.getChildAt(i).y == -12) || (tr.getChildAt(i).x == 74 && tr.getChildAt(i).y == -34) || (tr.getChildAt(i).x == 68 && tr.getChildAt(i).y == -28) || (tr.getChildAt(i).x == 64 && tr.getChildAt(i).y == -24) || (tr.getChildAt(i).x == -55 && tr.getChildAt(i).y == 41) || (tr.getChildAt(i).x == -45 && tr.getChildAt(i).y == 21) || (tr.getChildAt(i).x == -53 && tr.getChildAt(i).y == 35) || (tr.getChildAt(i).x == 46 && tr.getChildAt(i).y == 49) || (tr.getChildAt(i).x == 32 && tr.getChildAt(i).y == 31) || (tr.getChildAt(i).x == 42 && tr.getChildAt(i).y == 46)) {

                if (tr.key == "squareAngle")
                    decidePos = 4
                else
                    decidePos = 3;
            }
            else if (((tr.getChildAt(i).x == -44 || tr.getChildAt(i).x == -30) && tr.getChildAt(i).y == -42) || ((tr.getChildAt(i).x == 12 || tr.getChildAt(i).x == 40 || tr.getChildAt(i).x == 24) && tr.getChildAt(i).y == 0) || ((tr.getChildAt(i).x == -67) && tr.getChildAt(i).y == -45 && tr.angle == -90) || (tr.angle == -90 && tr.getChildAt(i).y == -18 && tr.getChildAt(i).x == -41) || (tr.getChildAt(i).y == -35 && tr.getChildAt(i).x == -57) || (tr.getChildAt(i).x == -7 && tr.getChildAt(i).y == 33) || (tr.getChildAt(i).x == -25 && tr.getChildAt(i).y == 18) || (tr.getChildAt(i).x == -18 && tr.getChildAt(i).y == 24) || (tr.getChildAt(i).x == -9 && tr.getChildAt(i).y == 33) || (tr.getChildAt(i).x == -23 && tr.getChildAt(i).y == 13) || (tr.getChildAt(i).x == -17 && tr.getChildAt(i).y == 25) || (tr.getChildAt(i).x == 10 && tr.getChildAt(i).y == -40) || (tr.getChildAt(i).x == 23 && tr.getChildAt(i).y == -15) || (tr.getChildAt(i).x == 19 && tr.getChildAt(i).y == -20) || ((tr.getChildAt(i).x == 47 || tr.getChildAt(i).x == 20 || tr.getChildAt(i).x == 36) && tr.getChildAt(i).y == 60)) {
                decidePos = 1;
            }
            else if ((tr.getChildAt(i).x == -4 && tr.getChildAt(i).y == 23) || (tr.getChildAt(i).x == 15 && tr.getChildAt(i).y == 4) || (tr.getChildAt(i).x == 7 && tr.getChildAt(i).y == 12) || ((tr.getChildAt(i).x == 118) && (tr.getChildAt(i).y == 35 || tr.getChildAt(i).y == 15 || tr.getChildAt(i).y == 25)) || ((tr.getChildAt(i).x == -45 || tr.getChildAt(i).x == -21) && tr.getChildAt(i).y == -42) || ((tr.getChildAt(i).x == -40 || tr.getChildAt(i).x == -35) && tr.getChildAt(i).y == -42) || ((tr.getChildAt(i).x == 44 || tr.getChildAt(i).x == 24 || tr.getChildAt(i).x == 36) && tr.getChildAt(i).y == -28) || ((tr.getChildAt(i).x == -54 || tr.getChildAt(i).x == -16 || tr.getChildAt(i).x == -30) && tr.getChildAt(i).y == 45) || (tr.getChildAt(i).x == 1 && tr.getChildAt(i).y == -33) || (tr.getChildAt(i).x == -10 && tr.getChildAt(i).y == -1) || (tr.getChildAt(i).x == -5 && tr.getChildAt(i).y == -20)) {

                if (tr.key == "squareAngle")
                    decidePos = 2
                else
                    decidePos = 2;
            }
            else if (((tr.getChildAt(i).x == 12 || tr.getChildAt(i).x == 40 || tr.getChildAt(i).x == 24) && tr.getChildAt(i).y == 104)) {
                decidePos = 3;
            }
            val = tr.getChildAt(i)._text;
            element = tr.getChildAt(i)
            element.visible = false;
            deletionarr.push(element)
            _this.writeLev2Eq(tr, decidePos, val)

        }
        deletionarr.forEach(element => {
            if (element.visible == false)
                element.destroy();
        });
        _this.time.events.add(300, () => {
            _this.sign2.frame = 0;
        })
    },
    sign1Clicked: function (tr) {

        if (_this.selected) {
            console.log("yessss")
            tr = _this.selected;
            _this.sign1.frame = 1;
            _this.clickSound.play();
        }
        if (tr.children.length == 0)
            return;

        lastVal = tr.rotatePos[2];
        for (m = 2; m > 0; m--) {
            tr.rotatePos[m] = tr.rotatePos[m - 1]
        }
        tr.rotatePos[0] = lastVal

        deletionarr = []
        decidePos = 0;

        for (i = 0; i < 2; i++) {
            if (tr.getChildAt(i).x == 13 || tr.getChildAt(i).x == 21 || ((tr.getChildAt(i).x == 40 && tr.getChildAt(i).y == 60) || tr.getChildAt(i).x == 25)) {
                decidePos = 3;
            }
            else if (tr.getChildAt(i).x == -38 || tr.getChildAt(i).x == -27 || tr.getChildAt(i).x == 1 || tr.getChildAt(i).x == -4) {
                decidePos = 1;
            }
            else if (tr.getChildAt(i).x == -55 || tr.getChildAt(i).x == -45 || tr.getChildAt(i).x == 40 || (tr.getChildAt(i).x == 30 && tr.getChildAt(i).y == 35)) {
                decidePos = 2;
            }
            val = tr.getChildAt(i)._text;
            element = tr.getChildAt(i)
            element.visible = false;
            deletionarr.push(element);
            if (tr.angle != 0) {

                if (decidePos == 1) {


                    x = _this.add.text(40, 47, val)

                    if (val.length <= 7) {
                        x.x = 30;
                        x.y = 35;
                    }

                    tr.addChild(x)
                    x.angle = -120;

                } else if (decidePos == 3) {
                    x = _this.add.text(1, -25, val)
                    if (val.length <= 6) {
                        x.x = -4;
                        x.y = -15;
                    }
                    tr.addChild(x)
                    x.angle = 120;
                }
                else {
                    x = _this.add.text(40, 60, val)
                    if (val.length <= 6) {
                        x.x = 25
                    }
                    tr.addChild(x)
                    x.angle = -180;
                }
            }
            else {
                if (decidePos == 1) {

                    x = _this.add.text(-55, 35, val)
                    if (val.length <= 6) {
                        x.x = -45;
                        x.y = 15;
                    }
                    tr.addChild(x)
                    x.angle = -60;

                } else if (decidePos == 2) {
                    x = _this.add.text(13, -35, val)
                    if (val.length <= 6) {
                        x.x = 21
                        x.y = -20
                    }
                    tr.addChild(x)
                    x.angle = 60;
                }
                else {
                    x = _this.add.text(-38, 40, val)
                    tr.addChild(x)
                    if (val.length <= 6) {
                        x.x = -27

                    }
                }
            }
            _this.applyingStyleQn(x, val)
        }
        deletionarr.forEach(element => {
            if (element.visible == false)
                element.destroy();
        });

        _this.time.events.add(300, () => {
            _this.sign1.frame = 0;
        })
    },
    sign2Clicked: function (tr) {

        if (_this.selected) {
            console.log("yess")
            tr = _this.selected
            _this.sign2.frame = 1;
            _this.clickSound.play();
        }
        if (tr.children.length == 0)
            return;
        startVal = tr.rotatePos[0];
        for (m = 0; m < 2; m++) {
            tr.rotatePos[m] = tr.rotatePos[m + 1]
        }
        tr.rotatePos[2] = startVal;
        deletionarr = []
        decidePos = 0;
        for (i = 0; i < 2; i++) {
            if (tr.getChildAt(i).x == -55 || tr.getChildAt(i).x == -45 || (tr.getChildAt(i).x == 40 && tr.getChildAt(i).y == 47) || (tr.getChildAt(i).x == 30 && tr.getChildAt(i).y == 35)) {
                decidePos = 3;
            }
            else if (tr.getChildAt(i).x == -38 || tr.getChildAt(i).x == -27 || tr.getChildAt(i).x == 1 || tr.getChildAt(i).x == -4)
                decidePos = 2;
            else if (tr.getChildAt(i).x == 13 || tr.getChildAt(i).x == 21 || (tr.getChildAt(i).x == 40 || tr.getChildAt(i).x == 25))
                decidePos = 1;
            val = tr.getChildAt(i)._text;
            element = tr.getChildAt(i)
            element.visible = false;
            deletionarr.push(element)
            if (tr.angle != 0) {

                if (decidePos == 1) {


                    x = _this.add.text(40, 47, val)

                    if (val.length <= 7) {
                        x.x = 30;
                        x.y = 35;
                    }

                    tr.addChild(x)
                    x.angle = -120;

                } else if (decidePos == 3) {
                    x = _this.add.text(1, -25, val)
                    if (val.length <= 6) {
                        x.x = -4;
                        x.y = -15;
                    }
                    tr.addChild(x)
                    x.angle = 120;
                }
                else {
                    x = _this.add.text(40, 60, val)
                    if (val.length <= 6) {
                        x.x = 25
                    }
                    tr.addChild(x)
                    x.angle = -180;
                }
            }
            else {
                if (decidePos == 1) {

                    x = _this.add.text(-55, 35, val)
                    if (val.length <= 6) {
                        x.x = -45;
                        x.y = 15;
                    }
                    tr.addChild(x)
                    x.angle = -60;

                } else if (decidePos == 2) {
                    x = _this.add.text(13, -35, val)
                    if (val.length <= 6) {
                        x.x = 21
                        x.y = -20
                    }
                    tr.addChild(x)
                    x.angle = 60;
                }
                else {
                    x = _this.add.text(-38, 40, val)
                    tr.addChild(x)
                    if (val.length <= 6) {
                        x.x = -27

                    }
                }
            }
            _this.applyingStyleQn(x, val)
        }
        deletionarr.forEach(element => {
            if (element.visible == false)
                element.destroy();
        });
        _this.time.events.add(300, () => {
            _this.sign2.frame = 0;
        })
    },
    ClearAll: function () {

        _this.answerGrp.destroy();
        _this.answerGrpcpy.destroy();
        _this.patternGrp.destroy();
        _this.sign1.destroy();
        _this.sign2.destroy();
        _this.optionPanel.destroy();
        _this.panel.destroy();
        _this.selected = null;

        _this.time.events.add(1000, () => {
            _this.state.start('score', true, false, gameID, _this.microConcepts);
        })

    },
    ClearPart1: function () {
        _this.answerGrp.destroy();
        _this.answerGrpcpy.destroy();
        _this.patternGrp.destroy();
        _this.selected = null;

        // call part2
        _this.starLoop = _this.time.create(false);
        _this.starLoop.start();
        count = 0
        _this.framechange.play();

        _this.starLoop.loop(80, function () {

            _this.starsGroup.getChildAt(5 - count).frame = 10;
            count++;
            if (count == 6) {
                _this.starLoop.stop();

                _this.starLoop2 = _this.time.create(false);
                _this.starLoop2.start();
                count = 0

                //  Set a TimerEvent to occur after 2 seconds
                _this.starLoop2.loop(70, function () {

                    _this.starsGroup.getChildAt(5 - count).frame = 0;
                    count++;
                    if (count == 6) {
                        _this.starLoop2.stop();

                        _this.levelDisplay.destroy();
                        _this.levelDisplay = _this.add.text(800, 8, 'Level 2')
                        _this.applyingStyle(_this.levelDisplay)
                        _this.generateLevel2Qn();
                        _this.generateLevel2Pattern()

                    }
                }, _this);

            }
        }, _this);




    },
    checkOverlap: function (spriteA, spriteB) {
        _this.boundsA = spriteA.getBounds();
        _this.boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(_this.boundsA, _this.boundsB);
    },
    applyingStyle: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        // target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = "22px"
    },
    applyingStyleQn: function (target, val) {
        target.align = 'center';
        target.font = "Akzidenz-Grotesk BQ";
        if (!val.includes("/") && ansArr.includes(Number(val.split("= ")[1])) && val.split(" =")[0] == variablearr[0])
            target.fill = "#FF0000"
        if (val.includes("/") && ansArr.includes((val.split("= ")[1])) && val.split(" =")[0] == variablearr[0])
            target.fill = "#FF0000"
        target.fontWeight = 'normal';
        target.visible = true;
        target.fontSize = "15px"
    },
    starActions: function (target) {
        telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);

        _this.AnsTimerCount = 0;
        _this.microConcepts = "AlgebraG7";
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
        _this.demoAudio1 = document.createElement('audio');
        _this.demoAudio1src = document.createElement('source');
        _this.demoAudio1src.setAttribute("src", window.baseUrl + "questionSounds/AL-TAR-G7/" + _this.languageSelected + "/V1.mp3");
        _this.demoAudio1.appendChild(_this.demoAudio1src);

        _this.demoAudio2 = document.createElement('audio');
        _this.demoAudio2src = document.createElement('source');
        _this.demoAudio2src.setAttribute("src", window.baseUrl + "questionSounds/AL-TAR-G7/" + _this.languageSelected + "/V2.mp3");
        _this.demoAudio2.appendChild(_this.demoAudio2src);

        // QUESTION AUDIOS
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/AL-TAR-G7/" +
            _this.languageSelected + "/V1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        _this.q2Sound = document.createElement('audio');
        _this.q2Soundsrc = document.createElement('source');
        _this.q2Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/AL-TAR-G7/" +
            _this.languageSelected + "/V2.mp3");
        _this.q2Sound.appendChild(_this.q2Soundsrc);

        _this.q3Sound = document.createElement('audio');
        _this.q3Soundsrc = document.createElement('source');
        _this.q3Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/AL-TAR-G7/" +
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

        _this.skip.events.onInputDown.removeAll();
        _this.skip.destroy();                //* skip button destroyed

    },

    showDemoVideo: function () {



        // _this.demoVideo_1 = _this.add.video('ML1_1');
        // _this.demoVideo_1.play(false);
        // _this.demoVideo_1.changeSource("demoVideos/ML1-G7_1.mp4");
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
        //     _this.demoVideo_2 = _this.add.video('ML1_2');
        //     _this.demoVideo_2.play(false);
        //     _this.demoVideo_2.changeSource("demoVideos/ML1-G7_2.mp4");  //* phaser needs this.to run in mobile
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






