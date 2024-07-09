var commonNavBar = {

    soundVar:null,
    questionArray:null,
    questionCount:null,
    soundUrl:null,
    hint1:true,
    hint2:true,
    hint3:true,
    hintflag:0,
    hintparams:null,
    somethingV:null,
    video:null,
    minutes:0,
    seconds:0,
    counterForTimer:0,
    opt1:0,
    opt2:0,
    opt3:0,

    tick:0,
    eraser:0,

    calNum0:0,
    calNum1:0,
    calNum2:0,
    calNum3:0,
    calNum4:0,
    calNum5:0,
    calNum6:0,
    calNum7:0,
    calNum8:0,
    calNum9:0,

    NumberArr:[],

    prevScreene:null,
    stage:null,

    level2Bool:false,
    deductForHint:0,
    
    addvideo:function(game)
    {
        //this.video = game.add.video('demo');
    },

    addNavBar:function(game,qsoundurl,prevScrene)
    {
        
                        
        console.log("qsoundurl=="+qsoundurl);
        this.prevScreene = prevScrene;
        this.stage = game;

        if(this.navBar == null)
        {
            this.navBar = game.add.sprite(0,0,'navBar');
            /* this.navBar.alpha = 0.5; */
        }

        if(this.backbtn == null)
            this.backbtn = game.add.sprite(-4,-2,'backBtn');
        //this.backbtn.scale.setTo(0.9);
        this.backbtn.inputEnabled = true;
		if(window.quizQuest == true)
			{
				this.backbtn.visible = false;
				this.backbtn.inputEnabled = false;
			}
        this.backbtn.events.onInputDown.add(this.backClicked,this);

        if(this.mcIcon == null){

            if(window.mcIcon=="weight")
                this.mcIcon = game.add.sprite(70,8,'mcIconWeight');
            else if(window.mcIcon=="length")
                this.mcIcon = game.add.sprite(70,8,'mcIconLength');
            else if(window.mcIcon=="time")
                this.mcIcon = game.add.sprite(70,8,'mcIconTime');
            else if(window.mcIcon=="volume")
                this.mcIcon = game.add.sprite(70,8,'mcIconVolume');
            else if(window.mcIcon=="numbers")
                this.mcIcon = game.add.sprite(70,6,'mcIconNumber');
            else if(window.mcIcon=="sequence")
                this.mcIcon = game.add.sprite(70,6,'mcIconSequence');
            else if(window.mcIcon=="comparison")
                this.mcIcon = game.add.sprite(70,6,'mcIconComparison');
            else if(window.mcIcon=="fraction")
                this.mcIcon = game.add.sprite(70,6,'mcIconFraction');
            else if(window.mcIcon=="placevalue")
                this.mcIcon = game.add.sprite(70,6,'mcIconPlacevalue');
            else if(window.mcIcon=="addition")
                this.mcIcon = game.add.sprite(70,6,'mcIconAddition');
            else if(window.mcIcon=="subtraction")
                this.mcIcon = game.add.sprite(70,6,'mcIconSubtraction');
            else if(window.mcIcon=="division")
                this.mcIcon = game.add.sprite(70,6,'mcIconDivision');
            else if(window.mcIcon=="multiplication")
                this.mcIcon = game.add.sprite(70,6,'mcIconMultiplication');
        }
        
        if(this.speakerbtn == null){ 
           if(quizQuest == true)
			{
				this.speakerbtn = game.add.sprite(470,7,'speakerBtn');
			}
			else
			{
				this.speakerbtn = game.add.sprite(610,7,'speakerBtn');
			}
            this.speakerbtn.inputEnabled = true;
            this.speakerbtn.input.priorityID = 2;
        }
        this.speakerbtn.events.onInputDown.add(function(){
            this.speakerClicked(qsoundurl);
        },this);

    },

    


    backClicked:function()
    {
        this.playClickSound();

        this.stopTimer();
        this.stopVoice();
        this.navBar = null;
        this.backbtn = null;
        this.mcIcon = null;
        this.speakerbtn = null;

        telInitializer2.syncToServer();
        this.stage.state.start(this.prevScreene,true,false);
    },

    speakerClicked:function(qsoundurl)
    {
        this.playClickSound();
        this.getVoice(qsoundurl);
    },

    playClickSound:function()
    {
        this.clickSound = new Audio('sounds/ClickSound.mp3');
        this.clickSound.play();
    },

    playDragMangoSound:function()
    {
        this.clickSound = new Audio('sounds/Drag_Snap.mp3');
        this.clickSound.play();
    },

    playcoinFallSound:function(){
        _this.coinFallSound = new Audio('sounds/CoinDrop.mp3');
        _this.coinFallSound.play();
    },

    playCarrotBiteSound:function()
    {
         this.CarrotBite = new Audio('sounds/CarrotBite.mp3');
         this.CarrotBite.play();
     },

    playCelebrationSound:function(){
        _this.cmusic = new Audio('sounds/celebration.mp3');
        _this.cmusic.play();
    }, 

    playRabbitSound:function()
    {
        this.clickSound = new Audio('sounds/Rabbit.mp3');
        this.clickSound.play();
    },

    snapSound:function(){
        _this.snapmusic = new Audio('sounds/snapSound.mp3');
        _this.snapmusic.play();
    }, 

    playCoinFallSound:function(){
        _this.cmusic = new Audio('sounds/CoinDrop.mp3');
        _this.cmusic.play();
    },

    playWrongCelebrationSound:function(){
        _this.wmusic = new Audio('sounds/WrongCelebrationSound.mp3');
        _this.wmusic.play();
    },

    spinSound:function(){
        _this.spin = new Audio('sounds/spin2.mp3');
        _this.spin.play();
    },

    playTapSound:function(){
        _this.TapSound = new Audio('sounds/Tap.mp3');
        _this.TapSound.play();
    },
    
    playtapSound:function(){
        _this.TapSound = new Audio('sounds/Tap.mp3');
        _this.TapSound.play();
    },

     playcashOutSound:function(){
        _this.cashOut = new Audio('sounds/CashOut.mp3');
        _this.cashOut.play();
    },

    playTinkleSound:function(){
        _this.tinklesound = new Audio('sounds/tinkle.mp3');
        _this.tinklesound.play();
    },

    playWaterDropSplashSound:function(){
        _this.WaterDropSplash = new Audio('sounds/WaterDropSplash.mp3');
        _this.WaterDropSplash.play();
    },

    playBubbleSound:function(){
        _this.bubble = new Audio('sounds/Bubbles.mp3');
        _this.bubble.play();
    },

    playWaterFillingSound:function(){
        //this.stopVoice();
        //if(!_this.waterFillingSound)
       // {
            _this.waterFillingSound = new Audio('sounds/waterFillingSound.mp3');
            _this.waterFillingSound.play();
        //}
    },
    
    stopWaterFillingSound:function(){
        _this.waterFillingSound1 = new Audio('sounds/waterFillingSound.mp3');
        _this.waterFillingSound1.pause();
    },
    
    playWaterSplashSound:function(){

        this.stopVoice();
        _this.watersplash = new Audio('sounds/watersplash.mp3');
        _this.watersplash.play();
    },

    playSnapSound:function()
    {
        this.clickSound = new Audio('sounds/snapSound.mp3');
        this.clickSound.play();
    },

    playclungSound:function(){
        _this.clungSound = new Audio('sounds/clung.mp3');
        _this.clungSound.play();
    },

    playEggCrackSound:function()
    {
        _this.crackSound = new Audio('sounds/eggCrack.mp3');
        _this.crackSound.play();
    },


    playsnapSound:function()
    {
        this.snapSound = new Audio('sounds/snapSound.mp3');
        this.snapSound.play();
    },

    

     chimeSound:function(){
        _this.chime = new Audio('sounds/chime.mp3');
        _this.chime.play();
    },
    
    buzzSound:function(){
        _this.buzz = new Audio('sounds/buzzsound.mp3');
        _this.buzz.play();
    },

    addTimerToTheGame:function(game,min,sec,counter)
    {
		if(window.quizQuest == false)
		{
			
		this.timerBg = game.add.sprite(game.world.centerX-150,6,'timerBg');
		

        this.minutes = min;
        this.seconds = sec;
        this.counterForTimer = counter;
		
		
		this.timeText = game.add.text(game.world.centerX-122,23, this.minutes + ':'+  this.seconds);
		
        this.timeText.anchor.setTo(0.5);
        this.timeText.align = 'center';
        this.timeText.font = 'myfont';
        this.timeText.fontWeight = 'normal';
        this.timeText.fontSize = 20;
        this.timeText.fill = '#ADFF2F';
		}
    },

    startTimer:function(game)
    {
		if(window.quizQuest == false)
		{
			this.timer = game.time.create(false);
			this.timer.loop(1000, function()
							{
				this.updateTimer();
			}, this);
			this.timer.start();
		}
    },

    stopTimer:function()
    {
		if(window.quizQuest == false)
		{
			if(this.timer)
			{
				this.timer.stop();
				this.timer = null;
			}
			var timerObj = {
				min:this.minutes,
				sec:this.seconds,
				counter:this.counterForTimer
			};
			return timerObj;
		}
    },

    updateTimer:function() 
    {
		if(window.quizQuest == false)
		{
			this.counterForTimer++;

			if(this.counterForTimer>59)
			{
				this.counterForTimer = 0;

				if(this.minutes<10){
					this.minutes =  this.minutes+1;
					this.seconds = 00;
				}
				else
				{
					this.minutes =  this.minutes+1;
				}
			}
			else
			{
				if (this.counterForTimer < 10)        
					this.seconds = '0' + this.counterForTimer;
				else
					this.seconds = this.counterForTimer;
			}
			this.timeText.setText(this.minutes+':' + this.seconds);
		}
    },

    getVoice:function(url,callback)
    {
        this.stopVoice();

        this.playQuestionSound = new Audio(url);
        this.playQuestionSound.play();
        this.playQuestionSound.addEventListener('ended', callback);

        if(window.languageSelected == "Odiya")
        {
            this.amplify = this.amplifyMedia(this.playQuestionSound, 3);
        }

    },

    amplifyMedia:function(mediaElem, multiplier) {
        var context = new (window.AudioContext || window.webkitAudioContext),
            result = {
                context: context,
                source: context.createMediaElementSource(mediaElem),
                gain: context.createGain(),
                media: mediaElem,
                amplify: function(multiplier) { result.gain.gain.value = multiplier; },
                getAmpLevel: function() { return result.gain.gain.value; }
            };
        result.source.connect(result.gain);
        result.gain.connect(context.destination);
        result.amplify(multiplier);

        return result;
    },

    stopVoice:function()
    {
        if(this.playQuestionSound)
        {
            this.playQuestionSound.pause();
            this.playQuestionSound = null;
        }

        if(this.waterFillingSound)
        {
            this.waterFillingSound.pause();
            this.waterFillingSound = null;
        }

        if(this.watersplash)
        {
            this.watersplash.pause();
            this.watersplash = null;
        }
    },

    generateStarsForTheScene:function(game,count)
    {
        //console.log("star");
        this.starsGroup = game.add.group();
        for (var i = 0; i < count; i++)
        {
            this.starsGroup.create(game.world.centerX, 10, 'cstarAnim');
            for(var j =0;j<i;j++)
            {
                if(this.starsGroup.getChildAt(j))
                {
                    this.starsGroup.getChildAt(j).x-=10;
                    this.starsGroup.getChildAt(i).x+=10;
                }
            }
        }           
        this.starsGroup.getChildAt(0).frame = 2;            
    },


    addScore:function(game,value)
    {
        this.scoreBg = game.add.sprite(750,7,'scoreBg');

        this.scoreVar = value;

        this.scoreTxt = game.add.text(815,24, this.scoreVar);
        this.scoreTxt.anchor.setTo(0.5);
        this.scoreTxt.align = 'center';
        this.scoreTxt.font = 'myfont';
        this.scoreTxt.fontWeight = 'normal';
        this.scoreTxt.fontSize = 20;
        this.scoreTxt.fill = '#ADFF2F';

    },
	updateScore:function(value)
    {
		this.scoreVar+= value;
		this.scoreTxt.setText(this.scoreVar);
	},
    addHint:function(game,hintparams)
    {
        //this.hintClicked(game,hint1,hint2,hint3,gameid);
        this.hintClicked(game,hintparams);
        this.addHintGroup.visible = false;

        if(hintparams!=null){
            commonNavBar.hint1 = hintparams[2];
            commonNavBar.hint2 = hintparams[3];
            commonNavBar.hint3 = hintparams[4];
        }

        this.hintIcon = game.add.sprite(810,-30,'hintIcon');

        if(hintparams!=null){
            this.hintIcon.frame=hintparams[5];
        }

        this.hintIcon.inputEnabled = true;
		if(window.quizQuest == true)
		{
			
			 this.hintIcon.alpha = 0;
			 this.hintIcon.inputEnabled = false;
		}
        this.hintIcon.events.onInputDown.add(function(){


            this.hintIcon.inputEnabled = false;

            this.backgroundtransp = game.add.tileSprite(0,0,game.world.width,game.world.height, 'transparent');
            this.backgroundtransp.inputEnabled = true;
            //this.backgroundtransp.input.priorityID = 5;
            this.backgroundtransp.events.onInputDown.add(function(){},this);
            this.playClickSound();

            //Disable input key on click of HINT icon
            this.opt1.inputEnabled = false;
            this.opt2.inputEnabled = false;
            this.opt3.inputEnabled = false;

            this.tick.inputEnabled = false;
            this.eraser.inputEnabled = false;
            this.calNum0.inputEnabled = false;
            this.calNum1.inputEnabled = false;
            this.calNum2.inputEnabled = false;
            this.calNum3.inputEnabled = false;
            this.calNum4.inputEnabled = false;
            this.calNum5.inputEnabled = false;
            this.calNum6.inputEnabled = false;
            this.calNum7.inputEnabled = false;
            this.calNum8.inputEnabled = false;
            this.calNum9.inputEnabled = false;

            for(var i=1;i<this.NumberArr.length;i++)
                this.NumberArr[i].inputEnabled = false;

            var _this = this;
            //this.updateTime = setInterval(function(){
                
                if(_this.addHintGroup)
                {
                    //game.world.bringToTop(_this.backgroundtransp);
                    game.world.bringToTop(_this.addHintGroup);
                }
           // },100); 
            this.addHintGroup.visible = true;
        },this);

        if(hintparams[5] == 0){
            this.hintIcon.visible = false;
        }

    },


    hintClicked:function(game,hintparams)
    {

        this.addHintGroup = game.add.group();

        this.addHintWand = game.add.sprite(game.world.centerX-50,game.world.centerY+130,'hintwand');
        this.addHintWand.anchor.setTo(0.5);

        this.addHintWandNo1 = game.add.sprite(game.world.centerX-50,game.world.centerY-10,'hint1');
        this.addHintWandNo1.anchor.setTo(0.5);
        if(hintparams!=null){
            this.addHintWandNo1.inputEnabled = hintparams[2];

            //if(hintparams[2])
            //    this.addHintWandNo1.input.priorityID = 6;

            (hintparams[2]==false)?this.addHintWandNo1.frame=1:this.addHintWandNo1.frame=0;
        }
        this.addHintWandNo1.events.onInputDown.add(function(target){
            this.hintflag=1;
            commonNavBar.hint1 = false;
            this.showFirstHint(target,game,hintparams);
        },this);

        this.addHintWandNo2 = game.add.sprite(game.world.centerX+110,game.world.centerY-30,'hint2');
        this.addHintWandNo2.anchor.setTo(0.5);
        if(hintparams){
            this.addHintWandNo2.inputEnabled = hintparams[3];

            //if(hintparams[3])
            //    this.addHintWandNo2.input.priorityID = 6;

            (hintparams[3]==false)?this.addHintWandNo2.frame=1:this.addHintWandNo2.frame=0;
        }
        this.addHintWandNo2.events.onInputDown.add(function(target){
            this.hintflag=2;
            commonNavBar.hint2 = false;
            this.showSecondHint(target,game,hintparams);
        },this);

        this.addHintWandNo3 = game.add.sprite(game.world.centerX+140,game.world.centerY+110,'hint3');
        this.addHintWandNo3.anchor.setTo(0.5);
        if(hintparams){
            this.addHintWandNo3.inputEnabled = hintparams[4];

            //if(hintparams[4])
            //    this.addHintWandNo3.input.priorityID = 6;

            (hintparams[4]==false)?this.addHintWandNo3.frame=1:this.addHintWandNo3.frame=0;
        }
        this.addHintWandNo3.events.onInputDown.add(function(target){
            this.hintflag=3;
            commonNavBar.hint3 = false;
            this.showThirdHint(target,game,hintparams);
        },this);

        this.addHintGroup.add(this.addHintWand);
        this.addHintGroup.add(this.addHintWandNo1);
        this.addHintGroup.add(this.addHintWandNo2);
        this.addHintGroup.add(this.addHintWandNo3);
    },

    disableHint:function()
    {
        if(!commonNavBar.hint1)
        {
            this.addHintWandNo1.frame = 1;
            this.addHintWandNo1.events.onInputDown.removeAll();
        }
        if(!commonNavBar.hint2)
        {
            this.addHintWandNo2.frame = 1;
            this.addHintWandNo2.events.onInputDown.removeAll();
        }
        if(!commonNavBar.hint3)
        {
            this.addHintWandNo3.frame = 1;
            this.addHintWandNo3.events.onInputDown.removeAll();
        }

        if(!commonNavBar.hint1 && !commonNavBar.hint2 && !commonNavBar.hint3)
        {

            this.hintIcon.tint = 0xA9A9A9;
            this.hintIcon.inputEnabled = false;
            this.hintIcon.events.onInputDown.removeAll();
        }
    },

    showFirstHint:function(target,game,hintparams)
    {
        /*this.updateTime = setInterval(function(){
            if(this.addHintGroup)
            {
                game.world.bringToTop(this.addHintGroup);
            }
        },100);*/

        if(_this.backgrd1,_this.backgrd2,_this.backgrd3)
        {
            _this.backgrd1.input.priorityID = 0;
            _this.backgrd2.input.priorityID = 0;
            _this.backgrd3.input.priorityID = 0;
        }

        target.frame = 1;
        this.playClickSound();
        //target.events.onInputDown.removeAll();
        this.addHintWandNo1.inputEnabled = false;
        this.addHintWandNo2.inputEnabled = false;
        this.addHintWandNo3.inputEnabled = false;

        this.disableHint();

        if(this.level2Bool)
        {
            this.deductForHint+=(-1);
        }

        this.deductScore(game,-1,true,true,hintparams);

    },

    showSecondHint:function(target,game,hintparams)
    {
        /*this.updateTime = setInterval(function(){
            if(this.addHintGroup)
            {
                game.world.bringToTop(this.addHintGroup);
            }
        },10);
    */

    

        if(_this.backgrd1,_this.backgrd2,_this.backgrd3)
        {
            _this.backgrd1.input.priorityID = 0;
            _this.backgrd2.input.priorityID = 0;
            _this.backgrd3.input.priorityID = 0;
        }

        target.frame = 1;
        this.playClickSound();
        //target.events.onInputDown.removeAll();
        this.addHintWandNo1.inputEnabled = false;
        this.addHintWandNo2.inputEnabled = false;
        this.addHintWandNo3.inputEnabled = false;

        this.disableHint();

        if(this.level2Bool)
        {
            this.deductForHint+=(-2);
        }

        this.deductScore(game,-2,true,true,hintparams);
    },

    showThirdHint:function(target,game,hintparams)
    { 
       /*alert("here");
        this.updateTime = setInterval(function(){
            if(this.addHintGroup)
            {
                game.world.bringToTop(this.addHintGroup);
            }
        },10);*/

        if(_this.backgrd1,_this.backgrd2,_this.backgrd3)
        {
            _this.backgrd1.input.priorityID = 0;
            _this.backgrd2.input.priorityID = 0;
            _this.backgrd3.input.priorityID = 0;
        }

        target.frame = 1;
        this.playClickSound();

        //target.events.onInputDown.removeAll();
        this.addHintWandNo1.inputEnabled = false;
        this.addHintWandNo2.inputEnabled = false;
        this.addHintWandNo3.inputEnabled = false;

        this.disableHint();

        if(this.level2Bool)
        {
            this.deductForHint+=(-3);
        }

        this.deductScore(game,-3,true,true,hintparams);
    },

    deductScore:function(game,value,flag,colorflag,hintparams)
    {
        
        //alert("mmmm"+commonNavBar.deductForHint);

        this.scoreVar+=value;
        this.scoreDeductGroup = game.add.group();

        if(colorflag == true){
            console.log("Hint");

            this.deductScoreVar = game.add.sprite(650,150,'deductBg');
            this.deductScoreVar.scale.setTo(1.3,1.3);
            var deductScoreVaranim = this.deductScoreVar.animations.add('load');
            deductScoreVaranim.play(10,false);

            this.deductScoreVar.anchor.setTo(0.5);

            this.deductText = game.add.text(648,150,value);
            this.deductText.anchor.setTo(0.5);
            this.deductText.align = 'center';
            this.deductText.font = 'myfont';
            this.deductText.fontWeight = 'normal';

            this.deductText.fontSize = 30;
            this.deductText.fill = '#FF8C00';

            this.scoreDeductGroup.add(this.deductScoreVar);
            this.scoreDeductGroup.add(this.deductText);

            game.add.tween(this.deductScoreVar).to({ x: 820, y: 22}, 1500, 'Linear', true, 0);
            game.add.tween(this.deductScoreVar.scale).to({x: 0.2,y:0.2}, 1500, 'Linear', true, 0);
            game.add.tween(this.deductText.scale).to({x: 0.5,y:0.5}, 1500, 'Linear', true, 0);
            game.add.tween(this.deductText).to({ x: 820, y: 22}, 1500, 'Linear', true, 0).onComplete.add(function(){
                this.destroyDeductScore(game,hintparams);
            },this);

        }else{
            this.deductScoreVar = game.add.sprite(650,150,'endscreendeductBg');
            this.deductScoreVar.scale.setTo(1.3,1.3);
            var deductScoreVaranim = this.deductScoreVar.animations.add('load');
            deductScoreVaranim.play(10,false);

            this.deductScoreVar.anchor.setTo(0.5);

            this.deductText = game.add.text(648,150,value);
            this.deductText.anchor.setTo(0.5);
            this.deductText.align = 'center';
            this.deductText.font = 'myfont';
            this.deductText.fontWeight = 'normal';
            this.deductText.fill = '#FFFFFF';
            this.deductText.fontSize = 28;

            this.scoreDeductGroup.add(this.deductScoreVar);
            this.scoreDeductGroup.add(this.deductText); 

            if(flag == false && colorflag == false){
                console.log("End screen ");

                nativeApp.screenViewStringPass("Challenge_completion_screen","Challenge_completion_screen");
                telInitializer2.finishChallengeActivityToFirebase();

                game.time.events.add(500,function(){
                    game.add.tween(this.deductScoreVar).to({ x: 820, y: 22}, 3000, 'Linear', true, 0);
                    game.add.tween(this.deductScoreVar.scale).to({x: 0.2,y:0.2}, 3000, 'Linear', true, 0);
                    game.add.tween(this.deductText.scale).to({x: 0.5,y:0.5}, 3000, 'Linear', true, 0);
                    game.add.tween(this.deductText).to({ x: 820, y: 22}, 3000, 'Linear', true, 0).onComplete.add(function(){
                        this.destroyDeductScore(game,hintparams);
                    },this);
                },this);
            }else{
                console.log("End screen with Replay");

                nativeApp.screenViewStringPass("Challenge_completion_screen","Challenge_completion_screen");

                game.add.tween(this.deductScoreVar).to({ x: 820, y: 22}, 3000, 'Linear', true, 0);
                game.add.tween(this.deductScoreVar.scale).to({x: 0.2,y:0.2}, 3000, 'Linear', true, 0);
                game.add.tween(this.deductText.scale).to({x: 0.5,y:0.5}, 3000, 'Linear', true, 0);
                game.add.tween(this.deductText).to({ x: 820, y: 22}, 3000, 'Linear', true, 0).onComplete.add(function(){
                    this.destroyDeductScore(game,hintparams);
                },this);
            }
        }


    },

    destroyDeductScore:function(game,hintparams)
    {
        this.scoreTxt.setText(this.scoreVar);
        this.scoreDeductGroup.destroy();
        this.addHintGroup.visible = false;

        this.hintIcon.frame--;

        this.addHintWandNo1.inputEnabled = true;
        this.addHintWandNo2.inputEnabled = true;
        this.addHintWandNo3.inputEnabled = true;
        //game.time.events.add(500,function(){
        this.addHintscreen(game,hintparams);
        //},this);
    },

    disableNavBar:function()
    {
        this.speakerbtn.inputEnabled = false;
        this.backbtn.inputEnabled = false;
		if(this.hintIcon)
			this.hintIcon.inputEnabled = false;

        this.navBar = null;
        this.backbtn = null;
        this.mcIcon = null;
        //        this.speakerbtn = null;
    },

    disableHintIcon:function(){
        this.hintIcon.inputEnabled = false;
    },

    enableHintIcon:function(){
		if(quizQuest == false)
			this.hintIcon.inputEnabled = true;
    },

    getScore:function()
    {
        return this.scoreVar;
    },

    addHintscreen:function(game,hintparams){

        //clearInterval(this.updateTime); 

        //alert("here");
        
        if(hintparams!=null){


            telInitializer2.hintCount++;
            
            switch(hintparams[0]){
                case 'NSFG3.1': if(this.hintflag==3){
                    if(hintparams[1]=="level2"){
                        console.log("Level2 - Hint 3");

                        this.background = game.add.sprite(10,10,'commonBg2');
                        this.video = game.add.video('demo');
                        this.video.play(true);
                        this.video.changeSource(window.baseUrl+"assets/demoVideos/fraction.mp4");
                        this.somethingV =  this.video.addToWorld(480,250,0.5,0.5,0.9,0.9);

                        this.popupbg = game.add.sprite(0,0,'popupbgEmpty');

                        //Hint  icon in Hint screen  
                        this.popupHint = game.add.sprite(5,5,'popuphint');
                        this.popupHint.scale.setTo(0.8);
                        this.popupHint.frame = 3;

                        this.closepopup(game);
                    }
                }
                    break;

                 case 'NSNG1.1': this.fnlayout11(game,hintparams);
                                break; 

                case 'NSSG1.1': if(this.hintflag==3){
                                    if(hintparams[1]=="level1"){
                                        this.backgroundtransp.visible=true;
                                        this.popupbg = game.add.sprite(0,0,'popupbg');
                                        this.closebtn = game.add.sprite(910,20,'closebtn');
                                        this.closebtn.scale.setTo(0.8,0.8);
                                        this.popuphint = game.add.sprite(5,5,'popuphint');
                                        this.popuphint.scale.setTo(0.8);
                                        this.popuphint.frame=3;
                                        this.closepopup3(game);
                                  

                               }
                }
                    
                   if(this.hintflag==3){
                                    if(hintparams[1]=="level2"){
                                        this.backgroundtransp.visible=true;
                                        this.popupbg = game.add.sprite(0,0,'popupbg');
                                        this.closebtn = game.add.sprite(910,20,'closebtn');
                                        this.closebtn.scale.setTo(0.8,0.8);
                                        this.popuphint = game.add.sprite(5,5,'popuphint');
                                        this.popuphint.scale.setTo(0.8);
                                        this.popuphint.frame=3;
                                        this.closepopup3(game);
                                      
                                    }
                                   

                                   

                               }
                               
                               
                 if(this.hintflag==3){
                     if(hintparams[1]=="level3"){
                                        this.backgroundtransp.visible=true;
                                        this.popupbg = game.add.sprite(0,0,'popupbg');
                                        this.closebtn = game.add.sprite(910,20,'closebtn');
                                        this.closebtn.scale.setTo(0.8,0.8);
                                        this.popuphint = game.add.sprite(5,5,'popuphint');
                                        this.popuphint.scale.setTo(0.8);
                                        this.popuphint.frame=3;
                                        this.closepopup3(game);
                         
                                    
                                    }
                                   
                              
                               }
                               
                                break;  

                case 'NSSG3.2': if(this.hintflag==1){
                                    if(hintparams[1]=="level1"){
                                       /* this.popupbg = game.add.sprite(160,90,'popupbg');
                                        this.popupbg.scale.setTo(0.5);
                                        this.closepopup(game);*/

                                        this.backgroundtransp.visible=true;
                                        this.popupbg = game.add.sprite(0,0,'popupbg');
                                        this.popupbg.visble = false;
                                        
                                        this.popuphint = game.add.sprite(5,5,'hintscreennew');
                                        this.closebtn = game.add.sprite(910,20,'closebtn');
                                        this.closebtn.scale.setTo(0.8,0.8);
                                       // this.popuphint.scale.setTo(0.8);
                                        //this.popuphint.frame=3;
                                        this.closepopup4(game);
                                       // game.add.tween(this.popupbg).to({x:130,y:80},2000,'Linear',true,0);
                                    }
                                    else{
                                        /*this.popupbg = game.add.sprite(160,90,'popupbg');
                                        this.popupbg.scale.setTo(0.5);
                                         this.closepopup(game);*/

                                         this.backgroundtransp.visible=true;
                                        this.popupbg = game.add.sprite(0,0,'popupbg');
                                        this.popupbg.visble = false;
                                        
                                        this.popuphint = game.add.sprite(5,5,'hintscreennew');
                                        this.closebtn = game.add.sprite(910,20,'closebtn');
                                        this.closebtn.scale.setTo(0.8,0.8);
                                        //this.popuphint.scale.setTo(0.8);
                                        //this.popuphint.frame=3;
                                        this.closepopup4(game);
                                        //game.add.tween(this.popupbg).to({x:130,y:80},2000,'Linear',true,0);
                                    }
                      // this.backgroundtransp.visible=true;
                                  // this.popupbg = game.add.sprite(160,90,'popupbg');
                                  // this.popupbg.scale.setTo(0.5,0.5);
                                  
                                    
                                      //  game.time.events.add(4000,function(){
                                         // this.popupbg.destroy();
                                   // },this);

                               }
                    
                  else if(this.hintflag==2){
                                    if(hintparams[1]=="level2"){
                                       /* this.popupbg = game.add.sprite(160,90,'popupbg');
                                        this.popupbg.scale.setTo(0.5);
                                         this.closepopup(game);*/

                                         this.backgroundtransp.visible=true;
                                        this.popupbg = game.add.sprite(0,0,'popupbg');
                                        this.popupbg.visble = false;
                                        
                                        this.popuphint = game.add.sprite(5,5,'hintscreennew');
                                        this.closebtn = game.add.sprite(910,20,'closebtn');
                                        this.closebtn.scale.setTo(0.8,0.8);
                                        //this.popuphint.scale.setTo(0.8);
                                        //this.popuphint.frame=3;
                                        this.closepopup4(game);
                                       // game.add.tween(this.popupbg).to({x:130,y:80},2000,'Linear',true,0);
                                    }
                                    else{
                                       /*this.popupbg = game.add.sprite(160,90,'popupbg');
                                        this.popupbg.scale.setTo(0.5);
                                         this.closepopup(game);*/

                                         this.backgroundtransp.visible=true;
                                        this.popupbg = game.add.sprite(0,0,'popupbg');
                                        this.popupbg.visble = false;
                                        
                                        this.popuphint = game.add.sprite(5,5,'hintscreennew');

                                        this.closebtn = game.add.sprite(910,20,'closebtn');
                                        this.closebtn.scale.setTo(0.8,0.8);
                                        //this.popuphint.scale.setTo(0.8);
                                        //this.popuphint.frame=3;
                                        this.closepopup4(game);
                                       //game.add.tween(this.popupbg).to({x:130,y:80},2000,'Linear',true,0);
                                    }

                                       // game.time.events.add(4000,function(){
                                          // this.caterpillarhint.destroy();
                                   // },this);

                               }
                               
                               
                 else if(this.hintflag==3){
                     if(hintparams[1]=="level3"){
                                       /* this.popupbg = game.add.sprite(180,100,'popupbg');
                                        this.popupbg.scale.setTo(0.65);
                                        this.closepopup(game);

                                        this.popuphint = game.add.sprite(175,105,'popuphint');
                                        this.popuphint.scale.setTo(0.6);
                                        this.popuphint.frame=3;*/

                                        this.backgroundtransp.visible=true;
                                        this.popupbg = game.add.sprite(0,0,'popupbg');
                                        this.popupbg.visble = false;
                                        
                                        this.popuphint = game.add.sprite(5,5,'hintscreennew');
                                        this.closebtn = game.add.sprite(910,20,'closebtn');
                                        this.closebtn.scale.setTo(0.8,0.8);
                                       // this.popuphint.scale.setTo(0.8);
                                       /// this.popuphint.frame=3;
                                        this.closepopup4(game);
                                         //game.add.tween(this.popupbg).to({x:130,y:80},2000,'Linear',true,0);
                                    }
                                    else{
                                       /*this.popupbg = game.add.sprite(180,100,'popupbg');
                                        this.popupbg.scale.setTo(0.65);
                                        this.closepopup(game);

                                        this.popuphint = game.add.sprite(175,105,'popuphint');
                                        this.popuphint.scale.setTo(0.6);
                                        this.popuphint.frame=3;*/

                                        this.backgroundtransp.visible=true;
                                        this.popupbg = game.add.sprite(0,0,'popupbg');
                                        this.popupbg.visble = false;
                                        
                                        this.popuphint = game.add.sprite(5,5,'hintscreennew');
                                        this.closebtn = game.add.sprite(910,20,'closebtn');
                                        this.closebtn.scale.setTo(0.8,0.8);
                                        //this.popuphint.scale.setTo(0.8);
                                        //this.popuphint.frame=3;
                                        this.closepopup4(game);
                                       //game.add.tween(this.popupbg).to({x:130,y:80},2000,'Linear',true,0);
                                    }
                               // game.time.events.add(4000,function(){
                                          // this.caterpillarhint.destroy();
                                   // },this);
                                  // this.backgroundtransp.visible=true;
                                  // this.popupbg = game.add.sprite(160,90,'popupbg');
                                  // this.popupbg.scale.setTo(0.5,0.5);
                                  // this.closepopup(game);
                               }
                                break;
                case 'NSSG4.2': if(this.hintflag==1){
                                    if(hintparams[1]=="level1"){
                                        this.hintscreen = game.add.sprite(0,0,'hintscreennew');
                                       // this.hintscreen.scale.setTo(0.7);
                                        this.hintscreen.frame=0;
                                        
                                        this.popuphint = game.add.sprite(5,5,'popuphint');
                                        this.popuphint.scale.setTo(0.8);
                                        this.popuphint.frame=1;
                                       
                                        this.closepopup5(game);
                                        
                                        /*this.forwardbtn = game.add.sprite(770,265,'forwardbtn');
                                        this.forwardbtn.scale.setTo(0.60,0.60);
                                        this.forwardbtn.inputEnabled=true;
                                        this.forwardbtn.input.useHandCursor = true;
                                        this.forwardbtn.events.onInputDown.add(function(){
                                          //this.hintscreen.frame++;
                                         },this);
                                       
                                        this.backwardbtn = game.add.sprite(220,265,'backwardbtn');
                                        this.backwardbtn.scale.setTo(0.60,0.60);
                                        this.backwardbtn.inputEnabled=true;
                                        this.backwardbtn.input.useHandCursor = true;
                                        this.backwardbtn.events.onInputDown.add(function(){
                                          //this.hintscreen.frame--;
                                         },this);*/
                                       
                                       // this.popuphint = game.add.sprite(155,95,'popuphint');
                                       // this.popuphint.scale.setTo(0.6);
                                       // this.popuphint.frame=1;
                                       // this.closepopup(game);
                                       // game.add.tween(this.popupbg).to({x:130,y:80},2000,'Linear',true,0);
                                    }
                                    else
                                    {
                                        
                                        this.hintscreen = game.add.sprite(0,0,'hintscreennew');
                                       // this.hintscreen.scale.setTo(0.7);
                                        this.hintscreen.frame=0;
                                        
                                        this.popuphint = game.add.sprite(155,95,'popuphint');
                                        this.popuphint.scale.setTo(0.6);
                                        this.popuphint.frame=2;
                                        
                                        this.closepopup5(game);
                                       
                                       
                                       /* this.forwardbtn = game.add.sprite(770,265,'forwardbtn');
                                        this.forwardbtn.scale.setTo(0.60,0.60);
                                        this.forwardbtn.inputEnabled=true;
                                        this.forwardbtn.input.useHandCursor = true;
                                        this.forwardbtn.events.onInputDown.add(function(){
                                          //this.hintscreen.frame++;
                                         },this);
                                       
                                        this.backwardbtn = game.add.sprite(220,265,'backwardbtn');
                                        this.backwardbtn.scale.setTo(0.60,0.60);
                                        this.backwardbtn.inputEnabled=true;
                                        this.backwardbtn.input.useHandCursor = true;
                                        this.backwardbtn.events.onInputDown.add(function(){
                                          //this.hintscreen.frame--;
                                         },this);
                                       */
                                       
                                     
                                    }
                    

                               }
                    
                  else if(this.hintflag==2){
                                    if(hintparams[1]=="level2"){
                                         this.hintscreen = game.add.sprite(0,0,'hintscreennew');
                                       // this.hintscreen.scale.setTo(0.7);
                                        this.hintscreen.frame=0;
                                        
                                        this.popuphint = game.add.sprite(5,5,'popuphint');
                                        this.popuphint.scale.setTo(0.8);
                                        this.popuphint.frame=2;
                                        
                                        this.closepopup5(game);
                                       
                                       /* this.forwardbtn = game.add.sprite(770,265,'forwardbtn');
                                        this.forwardbtn.scale.setTo(0.60,0.60);
                                        this.forwardbtn.inputEnabled=true;
                                        this.forwardbtn.input.useHandCursor = true;
                                        this.forwardbtn.events.onInputDown.add(function(){
                                          this.hintscreen.frame++;
                                         },this);
                                       
                                        this.backwardbtn = game.add.sprite(220,265,'backwardbtn');
                                        this.backwardbtn.scale.setTo(0.60,0.60);
                                        this.backwardbtn.inputEnabled=true;
                                        this.backwardbtn.input.useHandCursor = true;
                                        this.backwardbtn.events.onInputDown.add(function(){
                                          this.hintscreen.frame--;
                                         },this);*/
                                       
                                      
                                       // this.closepopup(game);
                                       // game.add.tween(this.popupbg).to({x:130,y:80},2000,'Linear',true,0);
                                    }
                                    else{
                                        
                                        this.hintscreen = game.add.sprite(0,0,'hintscreennew');
                                      //  this.hintscreen.scale.setTo(0.7);
                                        this.hintscreen.frame=0;
                                        
                                        this.popuphint = game.add.sprite(5,5,'popuphint');
                                        this.popuphint.scale.setTo(0.6);
                                        this.popuphint.frame=3;
                                        
                                        this.closepopup5(game);
                                       
                                       
                                       /* this.forwardbtn = game.add.sprite(770,265,'forwardbtn');
                                        this.forwardbtn.scale.setTo(0.60,0.60);
                                        this.forwardbtn.inputEnabled=true;
                                        this.forwardbtn.input.useHandCursor = true;
                                        this.forwardbtn.events.onInputDown.add(function(){
                                          this.hintscreen.frame++;
                                         },this);
                                       
                                        this.backwardbtn = game.add.sprite(220,265,'backwardbtn');
                                        this.backwardbtn.scale.setTo(0.60,0.60);
                                        this.backwardbtn.inputEnabled=true;
                                        this.backwardbtn.input.useHandCursor = true;
                                        this.backwardbtn.events.onInputDown.add(function(){
                                          this.hintscreen.frame--;
                                         },this);*/
                                       
                                       
                                     
                                    }
                                    

                               }
                               
                             
                 else if(this.hintflag==3){
                     if(hintparams[1]=="level3"){
                                        
                                        this.speakerbtn.inputEnabled = false;
                         
                                        this.hintscreen = game.add.sprite(0,0,'hintscreennew');
                                        //this.hintscreen.scale.setTo(0.8);
                                        this.hintscreen.frame=0;
                         
                                        this.popuphint = game.add.sprite(5,5,'popuphint');
                                        this.popuphint.scale.setTo(0.8);
                                        this.popuphint.frame=3;
                       
                                        this.closepopup5(game);
                                       
                                       
                                       
                                      /*  this.forwardbtn = game.add.sprite(770,265,'forwardbtn');
                                        this.forwardbtn.scale.setTo(0.60,0.60);
                                        this.forwardbtn.inputEnabled=true;
                                        this.forwardbtn.input.useHandCursor = true;
                                        this.forwardbtn.events.onInputDown.add(function(){
                                          //this.hintscreen.frame++;
                                         },this);
                                       
                                        this.backwardbtn = game.add.sprite(220,265,'backwardbtn');
                                        this.backwardbtn.scale.setTo(0.60,0.60);
                                        this.backwardbtn.inputEnabled=true;
                                        this.backwardbtn.input.useHandCursor = true;
                                        this.backwardbtn.events.onInputDown.add(function(){
                                          //this.hintscreen.frame--;
                                         },this);*/
                                       
                                       
                                    }
                                    
                                   else{
                                        this.speakerbtn.inputEnabled = false;
                                       
                                        this.hintscreen = game.add.sprite(0,0,'hintscreennew');
                                       // this.hintscreen.scale.setTo(0.7);
                                        this.hintscreen.frame=0;
                                       
                                        this.popuphint = game.add.sprite(5,5,'popuphint');
                                        this.popuphint.scale.setTo(0.8);
                                        this.popuphint.frame=3;
                                       
                                        this.closepopup5(game);
                                       
                                       
                                        /*this.forwardbtn = game.add.sprite(770,265,'forwardbtn');
                                        this.forwardbtn.scale.setTo(0.60,0.60);
                                        this.forwardbtn.inputEnabled=true;
                                        this.forwardbtn.input.useHandCursor = true;
                                        this.forwardbtn.events.onInputDown.add(function(){
                                          //this.hintscreen.frame++;
                                         },this);
                                       
                                        this.backwardbtn = game.add.sprite(220,265,'backwardbtn');
                                        this.backwardbtn.scale.setTo(0.60,0.60);
                                        this.backwardbtn.inputEnabled=true;
                                        this.backwardbtn.input.useHandCursor = true;
                                        this.backwardbtn.events.onInputDown.add(function(){
                                         // this.hintscreen.frame--;
                                         },this);
                                       */
                                        
                                     
                                    }
                               }
                               
                                break;

                case 'NSSG5.3': if(this.hintflag==3){
                                     if(hintparams[1]=="level1"){

                                        this.cout=0;
                                        this.backgroundtransp.visible=true;
                                        this.hintscreen = game.add.sprite(0,0,'hintscreennew');

                                        this.popuphint = game.add.sprite(5,5,'popuphint');
                                        this.popuphint.scale.setTo(0.8);
                                        this.popuphint.frame=3;
                                       
                                        this.closebtn = game.add.sprite(910,20,'closebtn');
                                        this.closebtn.scale.setTo(0.8,0.8);
                                        this.closepopup6(game);
                                       
                                        this.forwardbtn = game.add.sprite(860,250,'forwardbtn');
                                        this.forwardbtn.scale.setTo(1.2,1.2);
                                        this.forwardbtn.inputEnabled=true;
                                        //this.forwardbtn.input.priorityID = 10;
                                        this.forwardbtn.input.useHandCursor = true;
                                        this.forwardbtn.events.onInputDown.add(function(){
                                         
                                            if( this.cout<=8)
                                             {
                                                 console.log("ddd");
                                                  this.cout++;
                                                  this.hintscreen.frame = this.cout;
                                                  
                                             }
                                             
                                                 
                                         },this);
                                       
                                        this.backwardbtn = game.add.sprite(70,250,'backwardbtn');
                                        this.backwardbtn.scale.setTo(1.2,1.2);
                                        this.backwardbtn.inputEnabled=true;
                                        //this.backwardbtn.input.priorityID = 10;
                                        this.backwardbtn.input.useHandCursor = true;
                                        this.backwardbtn.events.onInputDown.add(function(){
                                          
                                            if(this.cout>0)
                                                {
                                                this.cout--;
                                            console.log("ssss" +this.cout);
                                                }
                                          this.hintscreen.frame = this.cout;
                                         },this);
                                       
                                       
                                    }
                    else if(hintparams[1]=="level2"){
                                       this.backgroundtransp.visible=true;
                                        this.cout=0;
                                        this.hintscreen = game.add.sprite(0,0,'hintscreennew');
                                      
                                        this.popuphint = game.add.sprite(5,5,'popuphint');
                                        this.popuphint.scale.setTo(0.8);
                                        this.popuphint.frame=3;
                                       
                                        this.closebtn = game.add.sprite(910,20,'closebtn');
                                        this.closebtn.scale.setTo(0.8,0.8);
                                        this.closepopup6(game);
                                       
                                        this.forwardbtn = game.add.sprite(860,250,'forwardbtn');
                                        this.forwardbtn.scale.setTo(1.2,1.2);
                                        this.forwardbtn.inputEnabled=true;
                                        //this.forwardbtn.input.priorityID = 10;
                                        this.forwardbtn.input.useHandCursor = true;
                                        this.forwardbtn.events.onInputDown.add(function(){
                                         
                                            if( this.cout<=8)
                                             {
                                                 
                                                  console.log("ddd");
                                                  this.cout++;
                                                  this.hintscreen.frame = this.cout;
                                                  
                                             }
                                             
                                                 
                                         },this);
                                       
                                        this.backwardbtn = game.add.sprite(70,250,'backwardbtn');
                                        this.backwardbtn.scale.setTo(1.2,1.2);
                                        this.backwardbtn.inputEnabled=true;
                                        //this.backwardbtn.input.priorityID = 10;
                                        this.backwardbtn.input.useHandCursor = true;
                                        this.backwardbtn.events.onInputDown.add(function(){
                                            if(this.cout>0)
                                                {
                                                this.cout--;
                                            console.log("ssss" +this.cout);
                                                }
                                          this.hintscreen.frame = this.cout;
                                         },this);
                                       
                                       
                                    }
                    else if(hintparams[1]=="level3"){
                                       this.backgroundtransp.visible=true;
                                        this.cout=0;
                                        this.hintscreen = game.add.sprite(0,0,'hintscreennew');
                         
                                        this.popuphint = game.add.sprite(5,5,'popuphint');
                                        this.popuphint.scale.setTo(0.8);
                                        this.popuphint.frame=3;
                                       
                                        this.closebtn = game.add.sprite(910,20,'closebtn');
                                        this.closebtn.scale.setTo(0.8,0.8);
                                        this.closepopup6(game);
                                       
                                        this.forwardbtn = game.add.sprite(860,250,'forwardbtn');
                                        this.forwardbtn.scale.setTo(1.2,1.2);
                                        this.forwardbtn.inputEnabled=true;
                                        //this.forwardbtn.input.priorityID = 10;
                                        this.forwardbtn.input.useHandCursor = true;
                                        this.forwardbtn.events.onInputDown.add(function(){
                                         
                                            if( this.cout<=8)
                                             {
                                                 
                                                  console.log("ddd");
                                                  this.cout++;
                                                  this.hintscreen.frame = this.cout;
                                                  
                                             }
                                             
                                                 
                                         },this);
                                       
                                        this.backwardbtn = game.add.sprite(70,250,'backwardbtn');
                                        this.backwardbtn.scale.setTo(1.2,1.2);
                                        this.backwardbtn.inputEnabled=true;
                                        //this.backwardbtn.input.priorityID = 10;
                                        this.backwardbtn.input.useHandCursor = true;
                                        this.backwardbtn.events.onInputDown.add(function(){
                                             if(this.cout>0)
                                                {
                                                this.cout--;
                                            console.log("ssss" +this.cout);
                                                }
                                          this.hintscreen.frame = this.cout;
                                         },this);
                                       
                                       
                                    }
                                }
                               
                               
                                break;

                case 'NSSG6.3': if(this.hintflag==3){
                                    if(hintparams[1]=="level1"){
                                        this.cout = 0;
                                       this.backgroundtransp.visible=true;
                                        this.hintscreen = game.add.sprite(0,0,'hintscreennew');
                                        
                                        this.popuphint = game.add.sprite(5,5,'popuphint');
                                        this.popuphint.scale.setTo(0.8);
                                        this.popuphint.frame=3;
                                       
                                        this.closebtn = game.add.sprite(910,20,'closebtn');
                                        this.closebtn.scale.setTo(0.8,0.8);
                                        this.closepopup6(game);
                                       
                                        this.forwardbtn = game.add.sprite(860,250,'forwardbtn');
                                        this.forwardbtn.scale.setTo(1.2,1.2);
                                        this.forwardbtn.inputEnabled=true;
                                        //this.forwardbtn.input.priorityID = 10;
                                        this.forwardbtn.input.useHandCursor = true;
                                        this.forwardbtn.events.onInputDown.add(function(){
                                         
                                            if( this.cout<=8)
                                             {
                                                 
                                                  console.log("ddd");
                                                  this.cout++;
                                                  this.hintscreen.frame = this.cout;
                                                  
                                             }
                                             
                                                 
                                         },this);
                                       
                                        this.backwardbtn = game.add.sprite(70,250,'backwardbtn');
                                        this.backwardbtn.scale.setTo(1.2,1.2);
                                        this.backwardbtn.inputEnabled=true;
                                        //this.backwardbtn.input.priorityID = 10;
                                        this.backwardbtn.input.useHandCursor = true;
                                        this.backwardbtn.events.onInputDown.add(function(){
                                            if(this.cout>0)
                                                {
                                                this.cout--;
                                            console.log("ssss" +this.cout);
                                                }
                                          this.hintscreen.frame = this.cout;
                                         },this);
                                       
                                       
                                    }
                    else if(hintparams[1]=="level2"){
                                        this.backgroundtransp.visible=true;
                                        this.cout=0;
                                        this.hintscreen = game.add.sprite(0,0,'hintscreennew');
                         
                                        this.popuphint = game.add.sprite(5,5,'popuphint');
                                        this.popuphint.scale.setTo(0.8);
                                        this.popuphint.frame=3;
                                       
                                        this.closebtn = game.add.sprite(910,20,'closebtn');
                                        this.closebtn.scale.setTo(0.8,0.8);
                                        this.closepopup6(game);
                                      
                                       
                                        this.forwardbtn = game.add.sprite(860,250,'forwardbtn');
                                        this.forwardbtn.scale.setTo(1.2,1.2);
                                        this.forwardbtn.inputEnabled=true;
                                        //this.forwardbtn.input.priorityID = 10;
                                        this.forwardbtn.input.useHandCursor = true;
                                        this.forwardbtn.events.onInputDown.add(function(){
                                         
                                            if( this.cout<=8)
                                             {
                                                 
                                                  console.log("ddd");
                                                  this.cout++;
                                                  this.hintscreen.frame = this.cout;
                                                  
                                             }
                                             
                                                 
                                         },this);
                                       
                                        this.backwardbtn = game.add.sprite(70,250,'backwardbtn');
                                        this.backwardbtn.scale.setTo(1.2,1.2);
                                        this.backwardbtn.inputEnabled=true;
                                        //this.backwardbtn.input.priorityID = 10;
                                        this.backwardbtn.input.useHandCursor = true;
                                        this.backwardbtn.events.onInputDown.add(function(){
                                           if(this.cout>0)
                                                {
                                                this.cout--;
                                            console.log("ssss" +this.cout);
                                                }
                                          this.hintscreen.frame = this.cout;
                                         },this);
                                       
                                       
                                    }
                                }
                                    
                                   break;
                case 'NSCG1.1': 
                                this.background = game.add.sprite(10,10,'Unity4_1BG_01');
                                if(hintparams[1]=="level3"){
//                                    this.backgroundtransp.visible=true;
                                    this.popupbg = game.add.sprite(0,0,'100_chart');
                                    
                                }else if(hintparams[1]=="level1" || hintparams[1]=="level2"){
                                    this.video = game.add.video('demo');
                                    this.video.play(true);
                                    this.video.changeSource(window.baseUrl+"assets/demoVideos/hintV.mp4");
                                    this.somethingV =  this.video.addToWorld(480,275,0.5,0.5,0.91,0.85);
                                }
                                this.yellowbg = game.add.sprite(0,0,'yellowbg');
                                this.popuphint = game.add.sprite(5,5,'popuphint');
                                this.popuphint.scale.setTo(0.8);
                                this.popuphint.frame=3;
                                this.closebtn = game.add.sprite(910,20,'closebtn');
                                this.closebtn.scale.setTo(0.80,0.80);
                                this.closepopup7(game);
                                break;

                case 'NSCG2.1': this.fnlayout21(game,hintparams);
                                break;
                case 'NSCG4.2':if(this.hintflag==2){
                                    this.background = game.add.sprite(10,10,'Level442_bg1');
                                    this.hntscr = game.add.sprite(-35,65,'hintscreen');
                                    this.hntscr.scale.setTo(0.69,0.8);
                                    this.yellowbg = game.add.sprite(0,0,'yellowbg');
                                    this.backgroundtransp.visible=true;
                                    this.fnlayout42(game);
                                    this.popuphint = game.add.sprite(5,5,'popuphint');
                                    this.popuphint.scale.setTo(0.8);
                                    this.popuphint.frame=2;  
                                    this.closepopup9(game);
                               }else if(this.hintflag==3){
                                   this.popupbg = game.add.sprite(0,0,'100_chart');
                                   this.popuphint = game.add.sprite(5,5,'popuphint');
                                   this.popuphint.scale.setTo(0.8);
                                   this.popuphint.frame=3;
//                                   this.closebtn = game.add.sprite(910,20,'closebtn');
//                                   this.closebtn.scale.setTo(0.80,0.80);
                                   this.closepopup9(game);
                               }
                              break;
                case 'NSCG5.3':if(this.hintflag==3){
                                    this.background = game.add.sprite(10,10,'Level443_bg1');
                                    this.hntscr = game.add.sprite(-104,40,'hintscreen2');
                                    this.hntscr.scale.setTo(0.78,1.01);
                                    this.yellowbg = game.add.sprite(0,0,'yellowbg');
                                    this.backgroundtransp.visible=true;
                                    this.fnlayout53(game);
                                    this.popuphint = game.add.sprite(5,5,'popuphint');
                                    this.popuphint.scale.setTo(0.8);
                                    this.popuphint.frame=3;    
                                }
                                break;
                case 'NSFG1.1': if(this.hintflag==3){
                    if(hintparams[1]=="level2"){
                        console.log("Level2 - Hint 3");

                        this.background = game.add.sprite(10,10,'commonBg2');
                        
                        this.video = game.add.video('demo');
                        this.video.play(true);
                        this.video.changeSource(window.baseUrl+"assets/demoVideos/fraction.mp4");
                        this.somethingV =  this.video.addToWorld(480,250,0.5,0.5,0.9,0.9);

                        this.popupbg = game.add.sprite(0,0,'popupbgEmpty');

                        //Hint  icon in Hint screen  
                        this.popupHint = game.add.sprite(5,5,'popuphint');
                        this.popupHint.scale.setTo(0.8);
                        this.popupHint.frame = 3;

                        //                        this.b1 = game.add.sprite(230,250,'Level11B_flagmain12');
                        //                        this.b1.anchor.setTo(0.5);
                        //                        this.b1.name = 'Level11B_MainCircle';
                        //
                        //                        this.b2 = game.add.sprite(600,220,'Level11B_Ans21');
                        //                        this.b2.anchor.setTo(0.5);
                        //                        this.b2.name =  'Level11B_SquareWrongMissingPiece';
                        //
                        //                        this.b3 = game.add.sprite(710,350,'Level11B_Ans32');
                        //                        this.b3.anchor.setTo(0.5);
                        //                        this.b3.name = 'Level11B_SquareWrongMissingPiece'; 
                        //
                        //                        this.b4 = game.add.sprite(750,140,'Level11B_Ans22');
                        //                        this.b4.anchor.setTo(0.5);
                        //                        this.b4.name = 'Level11B_SquareCorrectMissingPiece';
                        //
                        //                        //Hand hint icon=============================================================================
                        //                        this.handhint = game.add.sprite(600,430,'hand');
                        //                        this.handhint.scale.setTo(0.65,0.65);
                        //
                        //                        this.HintRepeatFn(game);

                        this.closepopup(game);
                    }
                }
                break;
                case 'NSFG2.1': if(this.hintflag==3){
                    if(hintparams[1]=="level2"){
                        console.log("Level2 - Hint 3");

                        this.background = game.add.sprite(10,10,'unity1.2Abackg');
                        
                        this.video = game.add.video('demo');
                        this.video.play(true);
                        this.video.changeSource(window.baseUrl+"assets/demoVideos/fraction.mp4");
                        this.somethingV =  this.video.addToWorld(480,250,0.5,0.5,0.9,0.9);

                        this.popupbg = game.add.sprite(0,0,'popupbgEmpty');

                        //Hint  icon in Hint screen  
                        this.popupHint = game.add.sprite(5,5,'popuphint');
                        this.popupHint.scale.setTo(0.8);
                        this.popupHint.frame = 3;

                        this.closepopup(game);
                    }
                }
                    break;

                case 'NSFG3.1': if(this.hintflag==3){
                    if(hintparams[1]=="level2"){
                        console.log("Level2 - Hint 3");

                        this.background = game.add.sprite(10,10,'commonBg2');

                        this.video = game.add.video('demo');
                        this.video.play(true);
                        this.video.changeSource(window.baseUrl+"assets/demoVideos/fraction.mp4");
                        this.somethingV =  this.video.addToWorld(480,250,0.5,0.5,0.9,0.9);

                        this.popupbg = game.add.sprite(0,0,'popupbgEmpty');

                        //Hint  icon in Hint screen  
                        this.popupHint = game.add.sprite(5,5,'popuphint');
                        this.popupHint.scale.setTo(0.8);
                        this.popupHint.frame = 3;

                        this.closepopup(game);
                    }
                }
                    break;

                case 'NSPVG1.1':if(hintparams[1]=="level2"){
                                    this.popupbg = game.add.sprite(0,0,'popupbg');
                                    this.popuphint = game.add.sprite(5,5,'hintno');
                                    this.popuphint.scale.setTo(0.8);
                                    this.popuphint.frame=3;
                                    this.closebtn = game.add.sprite(910,20,'closebtn');
                                    this.closebtn.scale.setTo(0.80,0.80);
                                    this.closepopup11(game);
                               }
                               break;

                case 'NSPVG21': if(this.hintflag==3){
                                    if(hintparams[1]=="level1" || hintparams[1]=="level2"){
                                                                               
                                        
                                        this.video = game.add.video('demo');
                                        this.video.play(true);
                                        this.video.changeSource(window.baseUrl+"assets/demoVideos/hint3_1_1a.mp4");
                                        _this.something =  this.video.addToWorld(480,267,0.5,0.5,0.91,0.85);
                                        
                                        
                                        game.time.events.add(500,function(){
                                          //this.background = game.add.sprite(10,10,'Level723_bg1');                          
                                            this.popupbg = game.add.sprite(0,0,'popupbgEmpty');
                                            //Hint 1 icon in Hint screen  
                                            this.closepopup12(game);
                                            
                                            this.popupHint = game.add.sprite(5,5,'popuphint');
                                            this.popupHint.scale.setTo(0.8);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2; 
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                            },this);
                                    }
                    
                                }
                               /*else if(this.hintflag==3){
                                   this.backgroundtransp.visible=true;
                                   this.popupbg = game.add.sprite(160,90,'popupbg');
                                   this.popupbg.scale.setTo(0.5,0.5);
                                   this.closepopup(game);
                               }*/
                                break;

                case 'NSPVG42': if(this.hintflag==3){
                                    if(hintparams[1]=="level1"){
                                       
                                        
                                        
                                        this.video = game.add.video('demo');
                                        this.video.play(true);
                                        this.video.changeSource(window.baseUrl+"assets/demoVideos/Hint_3.1.1.mp4");
                                        _this.something =  this.video.addToWorld(480,267,0.5,0.5,0.91,0.85);
                                        
                                          game.time.events.add(500,function(){
                                          //this.background = game.add.sprite(10,10,'Level723_bg1');
                                          this.popupbg = game.add.sprite(0,0,'popupbgEmpty');
                                          //Hint 1 icon in Hint screen  
                                            this.closepopup12(game);
                                              
                                              this.popupHint = game.add.sprite(5,5,'popuphint');
                                            this.popupHint.scale.setTo(0.8);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2; 
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                              },this);
                                    }
                    
                                      else  if(hintparams[1]=="level2"){
                                       
                                        
                                        
                                        this.video = game.add.video('demo');
                                        this.video.play(true);
                                        this.video.changeSource(window.baseUrl+"assets/demoVideos/Hint 3.2.1-1.mp4");
                                        _this.something =  this.video.addToWorld(480,267,0.5,0.5,0.91,0.85);
                                        
                                          game.time.events.add(500,function(){
                                          //this.background = game.add.sprite(10,10,'Level723_bg1');
                                          this.popupbg = game.add.sprite(0,0,'popupbgEmpty');
                                          //Hint 1 icon in Hint screen  
                                            this.closepopup12(game);
                                              
                                              this.popupHint = game.add.sprite(5,5,'popuphint');
                                            this.popupHint.scale.setTo(0.8);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2; 
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                              },this);
                                    }
                                }
                               /*else if(this.hintflag==3){
                                   this.backgroundtransp.visible=true;
                                   this.popupbg = game.add.sprite(160,90,'popupbg');
                                   this.popupbg.scale.setTo(0.5,0.5);
                                   this.closepopup(game);
                               }*/
                                break;

                case 'NSPVG63': if(this.hintflag==3){
                                    if(hintparams[1]=="level1"){
                                                                            
                                    
                                        this.video = game.add.video('demo');
                                        this.video.play(true);
                                        this.video.changeSource(window.baseUrl+"assets/demoVideos/3.1.2.mp4");
                                        _this.something =  this.video.addToWorld(480,267,0.5,0.5,0.91,0.85);
                                        
                                          game.time.events.add(500,function(){
                                          //this.background = game.add.sprite(10,10,'Level723_bg1');
                                          this.popupbg = game.add.sprite(0,0,'popupbgEmpty');
                                          //Hint 1 icon in Hint screen  
                                            this.closepopup12(game);
                                              
                                              this.popupHint = game.add.sprite(5,5,'popuphint');
                                            this.popupHint.scale.setTo(0.8);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2; 
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                              },this);
                                    }
                    
                    
                               else if(hintparams[1]=="level2"){
                                                                              
                                        
                                        this.video = game.add.video('demo');
                                        this.video.play(true);
                                        this.video.changeSource(window.baseUrl+"assets/demoVideos/Hint_3.2.2.mp4");
                                        _this.something =  this.video.addToWorld(480,267,0.5,0.5,0.91,0.85);
                                        
                                          game.time.events.add(500,function(){
                                          //this.background = game.add.sprite(10,10,'Level723_bg1');
                                          this.popupbg = game.add.sprite(0,0,'popupbgEmpty');
                                          //Hint 1 icon in Hint screen  
                                            this.closepopup12(game);
                                              
                                              this.popupHint = game.add.sprite(5,5,'popuphint');
                                            this.popupHint.scale.setTo(0.8);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2; 
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                              },this);
                                }
                            }
                               /*else if(this.hintflag==3){
                                   this.backgroundtransp.visible=true;
                                   this.popupbg = game.add.sprite(160,90,'popupbg');
                                   this.popupbg.scale.setTo(0.5,0.5);
                                   this.closepopup(game);
                               }*/
                                break;

                    case 'NSPVG5.2': if(hintparams[1]=="level1"){                  
                                    this.background = game.add.sprite(10,10,'unity4_6_1backg');
                                    this.hntscr = game.add.sprite(30,0,'unity4_6_1hintscreen');
                                    this.hntscr.scale.setTo(0.69,1.01);
                                    this.yellowbg = game.add.sprite(0,0,'yellowbg');
                                    this.backgroundtransp.visible=true;
                                    this.fnlayout(game);
                                    this.popuphint = game.add.sprite(5,5,'popuphint');
                                    this.popuphint.scale.setTo(0.8);
                                    this.popuphint.frame=3;
                                }
                                break;

                    case 'NSPVG7.3': if(hintparams[1]=="level1"){
                                     this.background = game.add.sprite(10,10,'unity4_6_1backg');
                                     this.hntscr = game.add.sprite(35,0,'unity4_6_2hintscreen');
                                     this.hntscr.scale.setTo(0.69,1.01);
                                     this.yellowbg = game.add.sprite(0,0,'yellowbg');
                                     this.backgroundtransp.visible=true;
                                     this.fnlayout73(game); 
                                     this.popuphint = game.add.sprite(5,5,'popuphint');
                                     this.popuphint.scale.setTo(0.8);
                                     this.popuphint.frame=3;          
                                }
                                break;

                    case 'NOAG1.1' : if(hintparams[1]=="level1"){ 
                                           // this.backgroundtransp.visible=true;
                                            this.speakerbtn.inputEnabled = false;
      
                                            this.hntscr = game.add.sprite(47,43,'hintscreen_5_1');
                                            this.hntscr.scale.setTo(0.91,0.85);
                                             
                                            this.yellowbg = game.add.sprite(0,0,'yellowbg');
                                            //this.yellowbg.scale.setTo(0.65,0.7);
             
                                            this.subfunc1(game);
                                            
                                         }
                                else{
                                            //this.backgroundtransp.visible=true;
              
                                            this.speakerbtn.inputEnabled = false;
                                    
                                            this.hntscr = game.add.sprite(45,40,'hintscreen1_5_1');
                                            this.hntscr.scale.setTo(0.91,0.85);
                                             
                                            this.yellowbg = game.add.sprite(0,0,'yellowbg');
                                           // this.yellowbg.scale.setTo(0.65,0.7);
             
                                            this.subfunc2(game);
                                    
                                }
                                break;

                case 'NOAG21': if(this.hintflag==3){
                                    if(hintparams[1]=="level1"){
                                       
                                                                                
                                        this.video = game.add.video('demo');
                                        this.video.play(true);
                                        this.video.changeSource(window.baseUrl+"assets/demoVideos/Hint_7.1.1.mp4");
                                        _this.something =  this.video.addToWorld(480,267,0.5,0.5,0.91,0.85);
                                        
                                        
                                        game.time.events.add(500,function(){
                                          //this.background = game.add.sprite(10,10,'Level723_bg1');                          
                                            this.popupbg = game.add.sprite(0,0,'popupbgEmpty');
                                            //Hint 1 icon in Hint screen  
                                            this.closepopup12(game);
                                            
                                            this.popupHint = game.add.sprite(5,5,'popuphint');
                                            this.popupHint.scale.setTo(0.8);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2; 
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                            },this);
                                                                                                              
                                    }
                                    else if(hintparams[1]=="level2"){
                                                                             
                                                                    
                                        this.video = game.add.video('demo');
                                        this.video.play(true);
                                        this.video.changeSource(window.baseUrl+"assets/demoVideos/Hint_7.2.1.mp4");
                                        _this.something =  this.video.addToWorld(480,267,0.5,0.5,0.91,0.85);
                                        
                                          game.time.events.add(500,function(){
                                          //this.background = game.add.sprite(10,10,'Level723_bg1');
                                          this.popupbg = game.add.sprite(0,0,'popupbgEmpty');
                                          //Hint 1 icon in Hint screen  
                                            this.closepopup12(game);
                                              
                                              this.popupHint = game.add.sprite(5,5,'popuphint');
                                            this.popupHint.scale.setTo(0.8);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2; 
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                              },this);
                                                                                                    
                                    }
                                }
                               /*else if(this.hintflag==3){
                                   this.backgroundtransp.visible=true;
                                   this.popupbg = game.add.sprite(160,90,'popupbg');
                                   this.popupbg.scale.setTo(0.5,0.5);
                                   this.closepopup(game);
                               }*/
                                break;

                case 'NOAG32': if(this.hintflag==3){
                                    if(hintparams[1]=="level1")
                                    {
                                        this.video = game.add.video('demo');
                                        this.video.play(true);
                                        this.video.changeSource(window.baseUrl+"assets/demoVideos/Hint_7.1.2.mp4");
                                        _this.something =  this.video.addToWorld(480,267,0.5,0.5,0.91,0.85);
                                        
                                        
                                        game.time.events.add(500,function(){
                                          //this.background = game.add.sprite(10,10,'Level723_bg1');                          
                                            this.popupbg = game.add.sprite(0,0,'popupbgEmpty');
                                            //Hint 1 icon in Hint screen  
                                            this.closepopup12(game);
                                            
                                            this.popupHint = game.add.sprite(5,5,'popuphint');
                                            this.popupHint.scale.setTo(0.8);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2; 
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                            },this);
                                    }
                                    else if(hintparams[1]=="level2"){
                                        this.video = game.add.video('demo');
                                        this.video.play(true);
                                        this.video.changeSource(window.baseUrl+"assets/demoVideos/Hint_7.2.2.mp4");
                                        _this.something =  this.video.addToWorld(480,267,0.5,0.5,0.91,0.85);
                                        
                                        
                                        game.time.events.add(500,function(){
                                          //this.background = game.add.sprite(10,10,'Level723_bg1');                          
                                            this.popupbg = game.add.sprite(0,0,'popupbgEmpty');
                                            //Hint 1 icon in Hint screen  
                                            this.closepopup12(game);
                                            
                                            this.popupHint = game.add.sprite(5,5,'popuphint');
                                            this.popupHint.scale.setTo(0.8);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2; 
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                            },this);
                                    }
                                }
                               /*else if(this.hintflag==3){
                                   this.backgroundtransp.visible=true;
                                   this.popupbg = game.add.sprite(160,90,'popupbg');
                                   this.popupbg.scale.setTo(0.5,0.5);
                                   this.closepopup(game);
                               }*/
                                break;

                case 'NOAG43': if(this.hintflag==3){
                                    if(hintparams[1]=="level1"){
                                       
                                                                                
                                        this.video = game.add.video('demo');
                                        this.video.play(true);
                                        this.video.changeSource(window.baseUrl+"assets/demoVideos/Hint7_1_3.mp4");
                                        _this.something =  this.video.addToWorld(480,267,0.5,0.5,0.91,0.85);
                                        
                                        
                                        game.time.events.add(500,function(){
                                          //this.background = game.add.sprite(10,10,'Level723_bg1');                          
                                            this.popupbg = game.add.sprite(0,0,'popupbgEmpty');
                                            //Hint 1 icon in Hint screen  
                                            this.closepopup12(game);
                                            
                                            this.popupHint = game.add.sprite(5,5,'popuphint');
                                            this.popupHint.scale.setTo(0.8);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2; 
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                            },this);
                                                                                                              
                                    }
                                    else if(hintparams[1]=="level2"){
                                                                             
                                                                    
                                        this.video = game.add.video('demo');
                                        this.video.play(true);
                                        this.video.changeSource(window.baseUrl+"assets/demoVideos/Hint_7.2.3.mp4");
                                        _this.something =  this.video.addToWorld(480,267,0.5,0.5,0.91,0.85);
                                        
                                          game.time.events.add(500,function(){
                                          //this.background = game.add.sprite(10,10,'Level723_bg1');
                                          this.popupbg = game.add.sprite(0,0,'popupbgEmpty');
                                          //Hint 1 icon in Hint screen  
                                            this.closepopup12(game);
                                              
                                              this.popupHint = game.add.sprite(5,5,'popuphint');
                                            this.popupHint.scale.setTo(0.8);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2; 
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                              },this);
                                                                                                    
                                    }
                                }
                               /*else if(this.hintflag==3){
                                   this.backgroundtransp.visible=true;
                                   this.popupbg = game.add.sprite(160,90,'popupbg');
                                   this.popupbg.scale.setTo(0.5,0.5);
                                   this.closepopup(game);
                               }*/
                                break;

                case 'NOSG11': if(this.hintflag==3){
                                    if(hintparams[1]=="level1"){
                                        
                                       /* game.time.events.add(500, function(){
                                            this.backgroundtransp.visible=true;
                                            this.hintDemoBg = game.add.sprite(153,118,'hintDemoBg');
                                            this.hintDemoBg.scale.setTo(0.65,0.6);
                                            
                                            
                                            this.handhint = game.add.sprite(545,280,'hand');
                                            this.handhint.scale.setTo(0.5,0.5);
                                            
                                            this.popupbg = game.add.sprite(153,93,'popupbgEmpty');
                                            this.popupbg.scale.setTo(0.65,0.7);
                                            this.closepopup(game);
                                              this.popupHint = game.add.sprite(153,95,'popuphint');
                                            this.popupHint.scale.setTo(0.7);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2;
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                            
                                            this.tween1 = game.add.tween(this.handhint);
                                            this.tween1.to({ x: 600, y:280}, 700, 'Linear', true, 0);
                                            this.tween1.onComplete.add(function(){
                                                 this.tween2 = game.add.tween(this.handhint);
                                                 this.tween2.to({ x: 575,y:330 }, 700, 'Linear', true, 0);
                                                
                                                this.tween2.onComplete.add(function(){
                                                    this.tween3 = game.add.tween(this.handhint);
                                                      this.tween3.to({ x: 635,y:330 }, 700, 'Linear', true, 0);
                                                    
                                                    this.tween3.onComplete.add(function(){
                                                        this.tween4 = game.add.tween(this.handhint);
                                                        this.tween4.to({ x: 355,y:415 }, 2000, 'Linear', true, 0);
                                                           
                                                            this.tween4.onComplete.add(function(){
                                                                
                                                                this.numberToDisplay = game.add.sprite(610,195,'grade81_greenNumbers');
                                                                this.numberToDisplay.scale.setTo(0.4);
                                                                this.numberToDisplay.frame = 3;
                                                                
                                                                 this.tween5 = game.add.tween(this.handhint);
                                                                  this.tween5.to({ x: 700,y:410 }, 1000, 'Linear', true, 0);
                                                                  game.time.events.add(2000,function(){
                                                                      this.repeaTweenFunction(game);
                                                                  },this);
                                                            },this);
                                                    },this);
                                                },this);
                                            },this);
                                            
                                         },this);*/
                                        
                                        
                                        
                                         this.video = game.add.video('demo');
                                        this.video.play(true);
                                        this.video.changeSource(window.baseUrl+"assets/demoVideos/Hint8_1.mp4");
                                        this.somethingV =  this.video.addToWorld(480,270,0.5,0.5,0.91,0.85);
                                        
                                        console.log("Ok");
                                         game.time.events.add(600, function(){
                                            this.backgroundtransp.visible=true;
                                            this.popupbg = game.add.sprite(0,0,'popupbgEmpty');
                                           // this.popupbg.scale.setTo(1,0.93);
                                            this.closepopup15(game);
                                              this.popupHint = game.add.sprite(5,5,'popuphint');
                                            this.popupHint.scale.setTo(0.8);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2; 
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                         },this);
                                    }
                                else if(hintparams[1]=="level2"){
                                        this.video = game.add.video('demo');
                                        this.video.play(true);
                                        this.video.changeSource(window.baseUrl+"assets/demoVideos/Hint_10.2.3.mp4");
                                        this.somethingV =  this.video.addToWorld(470,280,0.5,0.5,0.6,0.6);
                                        
                                        console.log("Ok");
                                         game.time.events.add(500, function(){
                                            this.backgroundtransp.visible=true;
                                            this.popupbg = game.add.sprite(153,93,'popupbgEmpty');
                                            this.popupbg.scale.setTo(0.65,0.7);
                                            this.closepopup15(game);
                                              this.popupHint = game.add.sprite(153,95,'popuphint');
                                            this.popupHint.scale.setTo(0.7);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2; 
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                         },this);
                                    }
                                }
                               /*else if(this.hintflag==3){
                                   this.backgroundtransp.visible=true;
                                   this.popupbg = game.add.sprite(160,90,'popupbg');
                                   this.popupbg.scale.setTo(0.5,0.5);
                                   this.closepopup(game);
                               }*/
                                break;

                case 'NOSG21': if(this.hintflag==3){
                                    if(hintparams[1]=="level1")
                                    {
                                        this.video = game.add.video('demo');
                                        this.video.play(true);
                                        this.video.changeSource(window.baseUrl+"assets/demoVideos/Hint_10.1.1.mp4");
                                        this.something =  this.video.addToWorld(480,270,0.5,0.5,0.91,0.85);
                                        
                                        game.time.events.add(500, function(){
                                            this.backgroundtransp.visible=true;
                                            this.popupbg = game.add.sprite(0,0,'popupbgEmpty');
                                           // this.popupbg.scale.setTo(0.65,0.7);
                                            this.closepopup16(game);
                                            
                                             this.popupHint = game.add.sprite(5,5,'popuphint');
                                            this.popupHint.scale.setTo(0.8);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2; 
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                        }, this);
                                    }
                                    else if(hintparams[1]=="level2"){
                                        this.video = game.add.video('demo');
                                        this.video.play(true);
                                        this.video.changeSource(window.baseUrl+"assets/demoVideos/Hint_10.2.1.mp4");
                                        this.something =  this.video.addToWorld(480,270,0.5,0.5,0.91,0.85);
                                        
                                        game.time.events.add(500, function(){
                                            this.backgroundtransp.visible=true;
                                            this.popupbg = game.add.sprite(0,0,'popupbgEmpty');
                                            //this.popupbg.scale.setTo(0.65,0.7);
                                            this.closepopup16(game);
                                            
                                            this.popupHint = game.add.sprite(5,5,'popuphint');
                                            this.popupHint.scale.setTo(0.8);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2;
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                        }, this);
                                    }
                                }
                               /*else if(this.hintflag==3){
                                   this.backgroundtransp.visible=true;
                                   this.popupbg = game.add.sprite(160,90,'popupbg');
                                   this.popupbg.scale.setTo(0.5,0.5);
                                   this.closepopup(game);
                               }*/
                                break;

                case 'NOSG32': if(this.hintflag==3){
                                    if(hintparams[1]=="level1"){

                                        this.video = game.add.video('demo');
                                        this.video.play(true);
                                        this.video.changeSource(window.baseUrl+"assets/demoVideos/Hint_10.1.2.mp4");
                                        _this.something =  this.video.addToWorld(480,270,0.5,0.5,0.91,0.85);
                                        
                                        console.log("Ok");
                                         game.time.events.add(500, function(){
                                            this.backgroundtransp.visible=true;
                                            this.popupbg = game.add.sprite(0,0,'popupbgEmpty');
                                           // this.popupbg.scale.setTo(0.65,0.7);
                                            this.closepopup17(game);
                                             this.popupHint = game.add.sprite(5,5,'popuphint');
                                            this.popupHint.scale.setTo(0.8);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2; 
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                         },this);
                                    } 
                                    else if(hintparams[1]=="level2"){
                                        this.video = game.add.video('demo');
                                        this.video.play(true);
                                        this.video.changeSource(window.baseUrl+"assets/demoVideos/Hint_10.2.2.mp4");
                                        _this.something =  this.video.addToWorld(480,270,0.5,0.5,0.91,0.85);
                                        
                                        console.log("Ok");
                                         game.time.events.add(500, function(){
                                            this.backgroundtransp.visible=true;
                                            this.popupbg = game.add.sprite(0,0,'popupbgEmpty');
                                           // this.popupbg.scale.setTo(0.65,0.7);
                                            this.closepopup17(game);
                                             this.popupHint = game.add.sprite(0,0,'popuphint');
                                            this.popupHint.scale.setTo(0.8);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2; 
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                         },this);
                                    }
                                }
                               /*else if(this.hintflag==3){
                                   this.backgroundtransp.visible=true;
                                   this.popupbg = game.add.sprite(160,90,'popupbg');
                                   this.popupbg.scale.setTo(0.5,0.5);
                                   this.closepopup(game);
                               }*/
                                break;

                case 'NOSG43': if(this.hintflag==3){
                                    if(hintparams[1]=="level1"){
                                        this.video = game.add.video('demo');
                                        this.video.play(true);
                                        this.video.changeSource(window.baseUrl+"assets/demoVideos/Hint_10.1.3.mp4");
                                        this.somethingV =  this.video.addToWorld(480,270,0.5,0.5,0.91,0.85);
                                        
                                        console.log("Ok");
                                         game.time.events.add(500, function(){
                                            this.backgroundtransp.visible=true;
                                            this.popupbg = game.add.sprite(0,0,'popupbgEmpty');
                                            //this.popupbg.scale.setTo(0.65,0.7);
                                            this.closepopup15(game);
                                              this.popupHint = game.add.sprite(5,5,'popuphint');
                                            this.popupHint.scale.setTo(0.8);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2; 
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                         },this);
                                    }
                                else if(hintparams[1]=="level2"){
                                        this.video = game.add.video('demo');
                                        this.video.play(true);
                                        this.video.changeSource(window.baseUrl+"assets/demoVideos/Hint_10.2.3.mp4");
                                        this.somethingV =  this.video.addToWorld(480,270,0.5,0.5,0.91,0.85);
                                        
                                        console.log("Ok");
                                         game.time.events.add(500, function(){
                                            this.backgroundtransp.visible=true;
                                            this.popupbg = game.add.sprite(0,0,'popupbgEmpty');
                                            //this.popupbg.scale.setTo(0.65,0.7);
                                            this.closepopup15(game);
                                              this.popupHint = game.add.sprite(5,5,'popuphint');
                                            this.popupHint.scale.setTo(0.8);
                                            if(this.hintflag==3)
                                                this.popupHint.frame = 3;
                                            if(this.hintflag==2)
                                                this.popupHint.frame = 2; 
                                            if(this.hintflag==1)
                                                this.popupHint.frame = 1;
                                         },this);
                                    }
                                }
                               /*else if(this.hintflag==3){
                                   this.backgroundtransp.visible=true;
                                   this.popupbg = game.add.sprite(160,90,'popupbg');
                                   this.popupbg.scale.setTo(0.5,0.5);
                                   this.closepopup(game);
                               }*/
                                break;

                case 'NODG1.2':     
                                if(hintparams[1]=="level1"){   
                                   console.log("NODG1.2");
                                    this.backgroundtransp.visible=true;
                                    this.hntscr = game.add.sprite(37,43,'hintscreen16_1');
                                    this.hntscr.scale.setTo(0.65,0.8);
                                    this.yellowbg = game.add.sprite(0,0,'yellowbg');
                                    this.popuphint = game.add.sprite(5,5,'popuphint');
                                    this.popuphint.scale.setTo(0.8);
                                    this.popuphint.frame=1;
                                    this.closebtn = game.add.sprite(910,20,'closebtn');
                                    this.closebtn.scale.setTo(0.8,0.8);
                                    this.closepopup18(game);
                    
                                    timevents1=game.time.events.add(1000,function(){

                                            this.handhint = game.add.sprite(455,140,'hand');
                                            this.handhint.scale.setTo(0.65,0.65);
                                            game.time.events.add(800,function(){
                                                this.handhint.x=525;
                                                game.time.events.add(500,function(){
                                                    this.handhint.visible=false;
                                                },this);
                                           },this);

                                    },this);

                                    timevents2=game.time.events.add(3000,function(){

                                           this.handhint = game.add.sprite(455,140,'hand');
                                            this.handhint.scale.setTo(0.65,0.65);
                                            game.time.events.add(800,function(){
                                                this.handhint.x=525;
                                                game.time.events.add(500,function(){
                                                    this.handhint.visible=false;
                                                },this);
                                           },this);
                                            
                                    },this);

                                    timevents3=game.time.events.add(5000,function(){

                                            this.handhint = game.add.sprite(455,140,'hand');
                                            this.handhint.scale.setTo(0.65,0.65);
                                            game.time.events.add(800,function(){
                                                this.handhint.x=525;
                                                game.time.events.add(500,function(){
                                                    this.handhint.visible=false;
                                                },this);
                                           },this);
                                            
                                    },this);

                                    timevents4=game.time.events.add(7000,function(){

                                        this.handhint = game.add.sprite(455,140,'hand');
                                            this.handhint.scale.setTo(0.65,0.65);
                                            game.time.events.add(800,function(){
                                                this.handhint.x=525;
                                                game.time.events.add(500,function(){
                                                    this.handhint.visible=false;
                                                },this);
                                           },this);
                                            
                                    },this);

                                    timevents5=game.time.events.add(9000,function(){

                                         this.handhint = game.add.sprite(455,140,'hand');
                                            this.handhint.scale.setTo(0.65,0.65);
                                            game.time.events.add(800,function(){
                                                this.handhint.x=525;
                                                game.time.events.add(500,function(){
                                                    this.handhint.visible=false;
                                                },this);
                                           },this);
                                            
                                    },this);

                                    timevents6=game.time.events.add(11000,function(){

                                        this.handhint = game.add.sprite(455,140,'hand');
                                            this.handhint.scale.setTo(0.65,0.65);
                                            game.time.events.add(800,function(){
                                                this.handhint.x=525;
                                                game.time.events.add(500,function(){
                                                    this.handhint.visible=false;
                                                },this);
                                           },this);
                                            
                                    },this);

                                    timevents7=game.time.events.add(13000,function(){

                                     this.handhint = game.add.sprite(455,140,'hand');
                                            this.handhint.scale.setTo(0.65,0.65);
                                            game.time.events.add(800,function(){
                                                this.handhint.x=525;
                                                game.time.events.add(500,function(){
                                                    this.handhint.visible=false;
                                                },this);
                                           },this);
                                            
                                    },this);

                                    timevents8=game.time.events.add(15000,function(){

                                    this.handhint = game.add.sprite(455,140,'hand');
                                            this.handhint.scale.setTo(0.65,0.65);
                                            game.time.events.add(800,function(){
                                                this.handhint.x=525;
                                                game.time.events.add(500,function(){
                                                    this.handhint.visible=false;
                                                },this);
                                           },this);
                                            
                                    },this);

                                    timevents9=game.time.events.add(17000,function(){

                                           this.handhint = game.add.sprite(455,140,'hand');
                                            this.handhint.scale.setTo(0.65,0.65);
                                            game.time.events.add(800,function(){
                                                this.handhint.x=525;
                                                game.time.events.add(500,function(){
                                                    this.handhint.visible=false;
                                                },this);
                                           },this);
                                            
                                    },this);

                                    timevents10=game.time.events.add(19000,function(){

                                          this.handhint = game.add.sprite(455,140,'hand');
                                            this.handhint.scale.setTo(0.65,0.65);
                                            game.time.events.add(800,function(){
                                                this.handhint.x=525;
                                                game.time.events.add(500,function(){
                                                    this.handhint.visible=false;
                                                },this);
                                           },this);
                                            
                                    },this);

                                        }
                                break;

                    case 'NODG2.2':     
                                    this.greybg = game.add.sprite(184,115,'greybg');
                                    this.greybg.scale.setTo(0.63,0.55);

                                    if(hintparams[1]=="level1"){   
                                        this.backgroundtransp.visible=true;

                                            this.hntscr = game.add.sprite(199,126,'hintscreen');
                                            this.hntscr.scale.setTo(0.46,0.62);
                                             this.yellowbg = game.add.sprite(172,98,'yellowbgnew');
                                    this.yellowbg.scale.setTo(0.652,0.67);
                                    this.popuphint = game.add.sprite(169,95,'popuphint');
                                    this.popuphint.scale.setTo(0.5,0.5);
                                    this.popuphint.frame=3;
                                    this.closebtn = game.add.sprite(770,105,'closebtn');
                                    this.closebtn.scale.setTo(0.60,0.60);
                                    this.closepopup18(game);
                    
timevents1=game.time.events.add(1000,function(){

                                            this.handhint = game.add.sprite(450,200,'hand');
                                            this.handhint.scale.setTo(0.65,0.65);
                                            this.getVoice(window.baseUrl+"questionSounds/unity/1.4/English/1.mp3");
                                          /*  _this.numpad = game.add.sprite(208,140,'NumberKeyN');
                                            _this.numpad.scale.setTo(0.5,0.5);
                                          */  game.time.events.add(800,function(){
                                           /* _this.numpad.x = 308;
                                            _this.numpad.frame=1;
                                           */ this.handhint.x=500;
                                            this.getVoice(window.baseUrl+"questionSounds/unity/1.4/English/2.mp3");

                                           game.time.events.add(500,function(){
                                                                        this.handhint.visible=false;
/*                                                                        this.backgroundtransp.visible=false;
*/                                                                    },this);
                                            
                                        },this);
},this);

timevents2=game.time.events.add(3000,function(){

                                              this.handhint = game.add.sprite(450,200,'hand');
                                            this.handhint.scale.setTo(0.65,0.65);
                                            this.getVoice(window.baseUrl+"questionSounds/unity/1.4/English/1.mp3");
                                          /*  _this.numpad = game.add.sprite(208,140,'NumberKeyN');
                                            _this.numpad.scale.setTo(0.5,0.5);
                                          */  game.time.events.add(800,function(){
                                           /* _this.numpad.x = 308;
                                            _this.numpad.frame=1;
                                           */ this.handhint.x=500;
                                            this.getVoice(window.baseUrl+"questionSounds/unity/1.4/English/2.mp3");
                                             game.time.events.add(500,function(){
                                                                        this.handhint.visible=false;
/*                                                                        this.backgroundtransp.visible=false;
*/                                                                    },this);
                                        },this);
},this);
timevents3=game.time.events.add(5000,function(){

                                            this.handhint = game.add.sprite(450,200,'hand');
                                            this.handhint.scale.setTo(0.65,0.65);
                                            this.getVoice(window.baseUrl+"questionSounds/unity/1.4/English/1.mp3");
                                          /*  _this.numpad = game.add.sprite(208,140,'NumberKeyN');
                                            _this.numpad.scale.setTo(0.5,0.5);
                                          */  game.time.events.add(800,function(){
                                           /* _this.numpad.x = 308;
                                            _this.numpad.frame=1;
                                           */ this.handhint.x=500;
                                            this.getVoice(window.baseUrl+"questionSounds/unity/1.4/English/2.mp3");
                                             game.time.events.add(500,function(){
                                                                        this.handhint.visible=false;
/*                                                                        this.backgroundtransp.visible=false;
*/                                                                    },this);
                                        },this);
},this);

timevents4=game.time.events.add(7000,function(){

                                            this.handhint = game.add.sprite(450,200,'hand');
                                            this.handhint.scale.setTo(0.65,0.65);
                                            this.getVoice(window.baseUrl+"questionSounds/unity/1.4/English/1.mp3");
                                          /*  _this.numpad = game.add.sprite(208,140,'NumberKeyN');
                                            _this.numpad.scale.setTo(0.5,0.5);
                                          */  game.time.events.add(800,function(){
                                           /* _this.numpad.x = 308;
                                            _this.numpad.frame=1;
                                           */ this.handhint.x=500;
                                            this.getVoice(window.baseUrl+"questionSounds/unity/1.4/English/2.mp3");
                                             game.time.events.add(500,function(){
                                                                        this.handhint.visible=false;
/*                                                                        this.backgroundtransp.visible=false;
*/                                                                    },this);
                                        },this);
},this);
timevents5=game.time.events.add(9000,function(){

                                              this.handhint = game.add.sprite(450,200,'hand');
                                            this.handhint.scale.setTo(0.65,0.65);
                                            this.getVoice(window.baseUrl+"questionSounds/unity/1.4/English/1.mp3");
                                          /*  _this.numpad = game.add.sprite(208,140,'NumberKeyN');
                                            _this.numpad.scale.setTo(0.5,0.5);
                                          */  game.time.events.add(800,function(){
                                           /* _this.numpad.x = 308;
                                            _this.numpad.frame=1;
                                           */ this.handhint.x=500;
                                            this.getVoice(window.baseUrl+"questionSounds/unity/1.4/English/2.mp3");
                                             game.time.events.add(500,function(){
                                                                        this.handhint.visible=false;
/*                                                                        this.backgroundtransp.visible=false;
*/                                                                    },this);
                                        },this);
},this);
timevents6=game.time.events.add(11000,function(){

                                            this.handhint = game.add.sprite(450,200,'hand');
                                            this.handhint.scale.setTo(0.65,0.65);
                                            this.getVoice(window.baseUrl+"questionSounds/unity/1.4/English/1.mp3");
                                          /*  _this.numpad = game.add.sprite(208,140,'NumberKeyN');
                                            _this.numpad.scale.setTo(0.5,0.5);
                                          */  game.time.events.add(800,function(){
                                           /* _this.numpad.x = 308;
                                            _this.numpad.frame=1;
                                           */ this.handhint.x=500;
                                            this.getVoice(window.baseUrl+"questionSounds/unity/1.4/English/2.mp3");
                                             game.time.events.add(500,function(){
                                             this.handhint.visible=false;
/*                                             this.backgroundtransp.visible=false;
*/                                                                    },this);
                                        },this);
},this);




                                        }
                                        break;

                        case 'NODG4.2' :    if(this.hintflag==2){
                                        if(hintparams[1]=="level1"){ 
                                            this.backgroundtransp.visible=false;
                                            commonNavBar.stopVoice();
                                            this.speakerbtn.inputEnabled = false;
                                            
                                            this.bg = game.add.sprite(40,40,'Level321_bg1');
                                            this.bg.scale.setTo(0.91,0.85); 
      
                                            this.coinpan = game.add.sprite(95,110,'Level321_coinMachinePannel17_2');
                                            this.coinpan.scale.setTo(0.85,0.85); 
                                            this.coinslot = game.add.sprite(170,120,'Level172_slot');
                                            this.coinslot.scale.setTo(0.85,0.85);
                                            
                                            this.tray1 = game.add.sprite(540,180,'Level172_tray');
                                            this.tray1.scale.setTo(0.85,0.85);
                                            this.tray2 = game.add.sprite(750,180,'Level172_tray');
                                            this.tray2.scale.setTo(0.85,0.85);
                                            this.tray3 = game.add.sprite(540,300,'Level172_tray');
                                            this.tray3.scale.setTo(0.85,0.85);
                                             
                                            this.yellowbg = game.add.sprite(0,0,'yellowbg');
                                            //this.yellowbg.scale.setTo(0.65,0.7);
             
                                            this.subfunc1_2(game);
                                            
                                         } 
                                        else if(hintparams[1]=="level2"){
                                            this.backgroundtransp.visible=false;
                                            commonNavBar.stopVoice();
                                            this.speakerbtn.inputEnabled = false;
                                           
                                             this.bg = game.add.sprite(40,40,'Level321_bg1');
                                             this.bg.scale.setTo(0.91,0.85); 
      
                                            this.coinpan = game.add.sprite(95,110,'Level321_coinMachinePannel17_2');
                                            this.coinpan.scale.setTo(0.85,0.85); 
                                            this.coinslot = game.add.sprite(170,120,'Level172_slot');
                                            this.coinslot.scale.setTo(0.85,0.85);
                                            
                                            this.tray1 = game.add.sprite(540,180,'Level172_tray');
                                            this.tray1.scale.setTo(0.85,0.85);
                                            this.tray2 = game.add.sprite(750,180,'Level172_tray');
                                            this.tray2.scale.setTo(0.85,0.85);
                                            this.tray3 = game.add.sprite(540,300,'Level172_tray');
                                            this.tray3.scale.setTo(0.85,0.85);
                                             
                                            this.yellowbg = game.add.sprite(0,0,'yellowbg');
                                           
                                            this.subfunc3_2(game);
                                       }
            }
                                   else if(this.hintflag==3){
                                   if(hintparams[1]=="level1")
                                    { 
                                            this.backgroundtransp.visible=false;
                                            commonNavBar.stopVoice();
                                            this.speakerbtn.inputEnabled = false;
                                           
                                             this.bg = game.add.sprite(40,40,'Level321_bg1');
                                             this.bg.scale.setTo(0.91,0.85); 
                                             this.square = game.add.sprite(435,50,'Level321_5');
                                             this.square.scale.setTo(0.8,0.8); 
                                             this.n1 = game.add.sprite(440,53,'Level321_numberSmall17_2');
                                             this.n1.scale.setTo(0.6,0.6); 
                                             this.n1.frame=3;
                                             this.n2 = game.add.sprite(465,53,'Level321_numberSmall17_2');
                                             this.n2.scale.setTo(0.6,0.6); 
                                             this.n2.frame=3;
                                             this.n3 = game.add.sprite(500,70,'Level172_div');
                                             this.n4 = game.add.sprite(520,53,'Level321_numberSmall17_2');
                                             this.n4.scale.setTo(0.6,0.6); 
                                             this.n4.frame=3;
      
                                            this.coinpan = game.add.sprite(95,110,'Level321_coinMachinePannel17_2');
                                            this.coinpan.scale.setTo(0.85,0.85); 
                                            this.coinslot = game.add.sprite(170,120,'Level172_slot');
                                            this.coinslot.scale.setTo(0.85,0.85);
                                            
                                            this.tray4 = game.add.sprite(510,145,'Unity12_1trayglw');
                                            this.tray4.scale.setTo(0.85,0.85);
                                            this.tray2 = game.add.sprite(750,180,'Level172_tray');
                                            this.tray2.scale.setTo(0.85,0.85);
                                            this.tray3 = game.add.sprite(540,300,'Level172_tray');
                                            this.tray3.scale.setTo(0.85,0.85);
                                           
                                            this.numb = game.add.sprite(700,300,'Level172_ansbox');
                                            this.numb.scale.setTo(0.7,0.7);
       
                                            this.num = game.add.sprite(48,436,'Level321_numb');
                                            this.num.scale.setTo(0.9,0.9);
                                           
                                             this.yellowcoin1=game.add.sprite(610,68,'Level321_Coin1');
                                             this.yellowcoin1.scale.setTo(0.65,0.65);
                                             this.yellowcoin2=game.add.sprite(820,68,'Level321_Coin1');
                                             this.yellowcoin2.scale.setTo(0.65,0.65);
                                             this.yellowcoin3=game.add.sprite(610,188,'Level321_Coin1');
                                             this.yellowcoin3.scale.setTo(0.65,0.65);
                                       
     
                                            this.bluecoin1 = game.add.sprite(557,70,'Level321_Coin10');
                                            this.bluecoin1.scale.setTo(0.65,0.65);
                                            this.bluecoin2= game.add.sprite(765,70,'Level321_Coin10');
                                            this.bluecoin2.scale.setTo(0.65,0.65);
                                            this.bluecoin3 = game.add.sprite(555,190,'Level321_Coin10');
                                            this.bluecoin3.scale.setTo(0.65,0.65);
                                             
                                            this.yellowbg = game.add.sprite(0,0,'yellowbg');
                                        
                                            this.subfunc2_2(game);
                                        
                                           
                                       }
                                       
                                       else if(hintparams[1]=="level2"){
                                           
                                           this.backgroundtransp.visible=false;
                                            commonNavBar.stopVoice();
                                            this.speakerbtn.inputEnabled = false;
                                           
                                             this.bg = game.add.sprite(40,40,'Level321_bg1');
                                             this.bg.scale.setTo(0.91,0.85); 
                                             this.square = game.add.sprite(435,50,'Level321_5');
                                             this.square.scale.setTo(0.8,0.8); 
                                             this.n1 = game.add.sprite(440,53,'Level321_numberSmall17_2');
                                             this.n1.scale.setTo(0.6,0.6); 
                                             this.n1.frame=3;
                                             this.n2 = game.add.sprite(465,53,'Level321_numberSmall17_2');
                                             this.n2.scale.setTo(0.6,0.6); 
                                             this.n2.frame=4;
                                             this.n3 = game.add.sprite(500,70,'Level172_div');
                                             this.n4 = game.add.sprite(520,53,'Level321_numberSmall17_2');
                                             this.n4.scale.setTo(0.6,0.6); 
                                             this.n4.frame=3;
      
                                            this.coinpan = game.add.sprite(95,110,'Level321_coinMachinePannel17_2');
                                            this.coinpan.scale.setTo(0.85,0.85); 
                                            this.coinslot = game.add.sprite(170,120,'Level172_slot');
                                            this.coinslot.scale.setTo(0.85,0.85);
                                            
                                            this.tray4 = game.add.sprite(510,145,'Unity12_1trayglw');
                                            this.tray4.scale.setTo(0.85,0.85);
                                            this.tray2 = game.add.sprite(750,180,'Level172_tray');
                                            this.tray2.scale.setTo(0.85,0.85);
                                            this.tray3 = game.add.sprite(540,300,'Level172_tray');
                                            this.tray3.scale.setTo(0.85,0.85);
                                           
                                            this.numb = game.add.sprite(700,300,'Level172_ansbox');
                                            this.numb.scale.setTo(0.7,0.7);
                                           
                                            this.numb1 = game.add.sprite(110,50,'Level172_ansbox');
                                            this.numb1.scale.setTo(0.7,0.7);
       
                                            this.num = game.add.sprite(48,436,'Level321_numb');
                                            this.num.scale.setTo(0.9,0.9);
                                           
                                             this.yellowcoin1=game.add.sprite(610,68,'Level321_Coin1');
                                             this.yellowcoin1.scale.setTo(0.65,0.65);
                                             this.yellowcoin2=game.add.sprite(820,68,'Level321_Coin1');
                                             this.yellowcoin2.scale.setTo(0.65,0.65);
                                             this.yellowcoin3=game.add.sprite(610,188,'Level321_Coin1');
                                             this.yellowcoin3.scale.setTo(0.65,0.65);
                                             this.yellowcoin4=game.add.sprite(345,195,'Level321_Coin1');
                                             this.yellowcoin4.scale.setTo(0.65,0.65);
                                       
     
                                            this.bluecoin1 = game.add.sprite(555,70,'Level321_Coin10');
                                            this.bluecoin1.scale.setTo(0.65,0.65);
                                            this.bluecoin2= game.add.sprite(765,70,'Level321_Coin10');
                                            this.bluecoin2.scale.setTo(0.65,0.65);
                                            this.bluecoin3 = game.add.sprite(555,190,'Level321_Coin10');
                                            this.bluecoin3.scale.setTo(0.65,0.65);
                                             
                                            this.yellowbg = game.add.sprite(0,0,'yellowbg');
                                        
                                            this.subfunc4_2(game);
                                        
                                           
                                       }
                                        
                                }
                    break;

                case 'NOMG2.1': if(this.hintflag==1){
                                    if(hintparams[1]=="level1"){
                                       
                                      this.background = game.add.sprite(10,10,'Unity12_3_1BG_01');
                                     //this.background.scale.setTo(0.6,0.65);
                                       
                                      this.bg = game.add.sprite(0,0,'popupbgEmpty1');
                                      //this.bg.scale.setTo(0.65,0.7);
                                       
                                       
                                    this.Eggbox= _this.add.sprite(_this.world.centerX-5,_this.world.centerY-30,'Unity12_3_1Egg_box');
                                    this.Eggbox.anchor.setTo(0.5);
                                    this.Eggbox.scale.setTo(0.9,0.9);
                                    
                                    this.SmallEgg1_1 = _this.add.sprite(_this.world.centerX-160,_this.world.centerY+190,'Unity12_3_1SmallEgg');
                                    this.SmallEgg1_1.anchor.setTo(0.5);
                                    this.SmallEgg1_1.scale.setTo(1.1,1.1);
                                   

                                    this.SmallEgg1_2 = _this.add.sprite(_this.world.centerX-130,_this.world.centerY+190,'Unity12_3_1SmallEgg');
                                    this.SmallEgg1_2.anchor.setTo(0.5);
                                    this.SmallEgg1_2.scale.setTo(1.1,1.1);
                                    

                                    this.SmallEgg1_3 = _this.add.sprite(_this.world.centerX-100,_this.world.centerY+190,'Unity12_3_1SmallEgg');
                                    this.SmallEgg1_3.anchor.setTo(0.5);
                                    this.SmallEgg1_3.scale.setTo(1.1,1.1);
                                    

                                    this.SmallEgg1_4 = _this.add.sprite(_this.world.centerX-70,_this.world.centerY+190,'Unity12_3_1SmallEgg');
                                    this.SmallEgg1_4.anchor.setTo(0.5);
                                    this.SmallEgg1_4.scale.setTo(1.1,1.1);
                                        
                                     this.subfuncM1(game);
                                       
                                       
                                    }
                    break;
                }
        
                    
                     else if(this.hintflag==2){
                                if(hintparams[1]=="level1"){
                                       
                                      this.background = game.add.sprite(10,10,'Unity12_3_1BG_01');
                                      
                                      this.bg = game.add.sprite(0,0,'popupbgEmpty1');
                                      
                                                      
                                      
                        
                    this.Eggbox= _this.add.sprite(_this.world.centerX-5,_this.world.centerY-30,'Unity12_3_1Egg_box');
                    this.Eggbox.anchor.setTo(0.5);
                    this.Eggbox.scale.setTo(0.9,0.9);
                                    
                    this.SmallEgg1_1 = _this.add.sprite(_this.world.centerX-160,_this.world.centerY+190,'Unity12_3_1SmallEgg');
                    this.SmallEgg1_1.anchor.setTo(0.5);
                    this.SmallEgg1_1.scale.setTo(1.1,1.1);
                                   

                    this.SmallEgg1_2 = _this.add.sprite(_this.world.centerX-130,_this.world.centerY+190,'Unity12_3_1SmallEgg');
                    this.SmallEgg1_2.anchor.setTo(0.5);
                    this.SmallEgg1_2.scale.setTo(1.1,1.1);
                                    

                    this.SmallEgg1_3 = _this.add.sprite(_this.world.centerX-100,_this.world.centerY+190,'Unity12_3_1SmallEgg');
                    this.SmallEgg1_3.anchor.setTo(0.5);
                    this.SmallEgg1_3.scale.setTo(1.1,1.1);
                                    

                    this.SmallEgg1_4 = _this.add.sprite(_this.world.centerX-70,_this.world.centerY+190,'Unity12_3_1SmallEgg');
                    this.SmallEgg1_4.anchor.setTo(0.5);
                    this.SmallEgg1_4.scale.setTo(1.1,1.1);
                                              
                    this.SmallEgg1_Glow_four = game.add.sprite(game.world.centerX-105,game.world.centerY-182,'Unity12_3_1fourGlow');
                    this.SmallEgg1_Glow_four.anchor.setTo(0.5);
                    this.SmallEgg1_Glow_four.scale.setTo(0.87,0.87);
                    this.SmallEgg1_Glow_four.frame = 1;
                    this.SmallEgg1_Glow_four.animations.add('walk');                   
                    this.SmallEgg1_Glow_four.play('walk',3,true);
                                    
                    this.SmallEgg2_Glow_four = game.add.sprite(game.world.centerX-105,game.world.centerY-148,'Unity12_3_1fourGlow');
                    this.SmallEgg2_Glow_four.anchor.setTo(0.5);
                    this.SmallEgg2_Glow_four.scale.setTo(0.87,0.87);
                    this.SmallEgg2_Glow_four.frame = 1;
                    this.SmallEgg2_Glow_four.animations.add('walk');                   
                    this.SmallEgg2_Glow_four.play('walk',3,true);
                                    
                    this.SmallEgg3_Glow_four = game.add.sprite(game.world.centerX-105,game.world.centerY-113,'Unity12_3_1fourGlow');
                    this.SmallEgg3_Glow_four.anchor.setTo(0.5);
                    this.SmallEgg3_Glow_four.scale.setTo(0.87,0.87);
                    this.SmallEgg3_Glow_four.frame = 1;
                    this.SmallEgg3_Glow_four.animations.add('walk');                   
                    this.SmallEgg3_Glow_four.play('walk',3,true);
                    
                    
                      this.subfuncM2(game);     
                  
                                        
                                                 
                                    }
                        break;
                     }
                     else if(this.hintflag==3){
                                if(hintparams[1]=="level1"){
                                       
                                      this.background = game.add.sprite(10,10,'Unity12_3_1BG_01');
                                      
                                      this.bg = game.add.sprite(0,0,'popupbgEmpty1');
                                      
                                                      
                                      
                        
                    this.Eggbox= _this.add.sprite(_this.world.centerX-5,_this.world.centerY-30,'Unity12_3_1Egg_box');
                    this.Eggbox.anchor.setTo(0.5);
                    this.Eggbox.scale.setTo(0.9,0.9);
                                    
                    this.SmallEgg1_1 = _this.add.sprite(_this.world.centerX-160,_this.world.centerY+190,'Unity12_3_1SmallEgg');
                    this.SmallEgg1_1.anchor.setTo(0.5);
                    this.SmallEgg1_1.scale.setTo(1.1,1.1);
                                   

                    this.SmallEgg1_2 = _this.add.sprite(_this.world.centerX-130,_this.world.centerY+190,'Unity12_3_1SmallEgg');
                    this.SmallEgg1_2.anchor.setTo(0.5);
                    this.SmallEgg1_2.scale.setTo(1.1,1.1);
                                    

                    this.SmallEgg1_3 = _this.add.sprite(_this.world.centerX-100,_this.world.centerY+190,'Unity12_3_1SmallEgg');
                    this.SmallEgg1_3.anchor.setTo(0.5);
                    this.SmallEgg1_3.scale.setTo(1.1,1.1);
                                    

                    this.SmallEgg1_4 = _this.add.sprite(_this.world.centerX-70,_this.world.centerY+190,'Unity12_3_1SmallEgg');
                    this.SmallEgg1_4.anchor.setTo(0.5);
                    this.SmallEgg1_4.scale.setTo(1.1,1.1);
                                              
                    this.SmallEgg1_Glow_four = game.add.sprite(game.world.centerX-105,game.world.centerY-182,'Unity12_3_1fourGlow');
                    this.SmallEgg1_Glow_four.anchor.setTo(0.5);
                    this.SmallEgg1_Glow_four.scale.setTo(0.87,0.87);
                    this.SmallEgg1_Glow_four.frame = 1;
                    this.SmallEgg1_Glow_four.animations.add('walk');                   
                    this.SmallEgg1_Glow_four.play('walk',3,true);
                                    
                    this.SmallEgg2_Glow_four = game.add.sprite(game.world.centerX-105,game.world.centerY-148,'Unity12_3_1fourGlow');
                    this.SmallEgg2_Glow_four.anchor.setTo(0.5);
                    this.SmallEgg2_Glow_four.scale.setTo(0.87,0.87);
                    this.SmallEgg2_Glow_four.frame = 1;
                    this.SmallEgg2_Glow_four.animations.add('walk');                   
                    this.SmallEgg2_Glow_four.play('walk',3,true);
                                    
                    this.SmallEgg3_Glow_four = game.add.sprite(game.world.centerX-105,game.world.centerY-113,'Unity12_3_1fourGlow');
                    this.SmallEgg3_Glow_four.anchor.setTo(0.5);
                    this.SmallEgg3_Glow_four.scale.setTo(0.87,0.87);
                    this.SmallEgg3_Glow_four.frame = 1;
                    this.SmallEgg3_Glow_four.animations.add('walk');                   
                    this.SmallEgg3_Glow_four.play('walk',3,true);
                    
                                     
                 this.eggGrp = game.add.group();   
                                    
                this.SmallEgg1 = game.add.sprite(game.world.centerX-155,game.world.centerY-182,'Unity12_3_1SmallEgg');
                this.SmallEgg1.anchor.setTo(0.5);
                this.SmallEgg1.scale.setTo(0.85,0.85);
                this.SmallEgg1.frame = 1;
                                    
                this.SmallEgg2 = game.add.sprite(game.world.centerX-121,game.world.centerY-182,'Unity12_3_1SmallEgg');
                this.SmallEgg2.anchor.setTo(0.5);
                this.SmallEgg2.scale.setTo(0.85,0.85);
                this.SmallEgg2.frame = 1;
                            
                this.SmallEgg3 = game.add.sprite(game.world.centerX-88,game.world.centerY-182,'Unity12_3_1SmallEgg');
                this.SmallEgg3.anchor.setTo(0.5);
                this.SmallEgg3.scale.setTo(0.85,0.85);
                this.SmallEgg3.frame = 1;
                                     
                this.SmallEgg4 = game.add.sprite(game.world.centerX-55,game.world.centerY-182,'Unity12_3_1SmallEgg');
                this.SmallEgg4.anchor.setTo(0.5);
                this.SmallEgg4.scale.setTo(0.85,0.85);
                this.SmallEgg4.frame = 1;
                                    
                this.SmallEgg5 = game.add.sprite(game.world.centerX-155,game.world.centerY-148,'Unity12_3_1SmallEgg');
                this.SmallEgg5.anchor.setTo(0.5);
                this.SmallEgg5.scale.setTo(0.85,0.85);
                this.SmallEgg5.frame = 1;
                
                                    
                this.SmallEgg6 = game.add.sprite(game.world.centerX-121,game.world.centerY-148,'Unity12_3_1SmallEgg');
                this.SmallEgg6.anchor.setTo(0.5);
                this.SmallEgg6.scale.setTo(0.85,0.85);
                this.SmallEgg6.frame = 1;
                            
                this.SmallEgg7 = game.add.sprite(game.world.centerX-88,game.world.centerY-148,'Unity12_3_1SmallEgg');
                this.SmallEgg7.anchor.setTo(0.5);
                this.SmallEgg7.scale.setTo(0.85,0.85);
                this.SmallEgg7.frame = 1;
                                     
                this.SmallEgg8 = game.add.sprite(game.world.centerX-55,game.world.centerY-148,'Unity12_3_1SmallEgg');
                this.SmallEgg8.anchor.setTo(0.5);
                this.SmallEgg8.scale.setTo(0.85,0.85);
                this.SmallEgg8.frame = 1;
                                    
                this.SmallEgg9 = game.add.sprite(game.world.centerX-155,game.world.centerY-113,'Unity12_3_1SmallEgg');
                this.SmallEgg9.anchor.setTo(0.5);
                this.SmallEgg9.scale.setTo(0.85,0.85);
                this.SmallEgg9.frame = 1;
                                    
                this.SmallEgg10 = game.add.sprite(game.world.centerX-121,game.world.centerY-113,'Unity12_3_1SmallEgg');
                this.SmallEgg10.anchor.setTo(0.5);
                this.SmallEgg10.scale.setTo(0.85,0.85);
                this.SmallEgg10.frame = 1;
                            
                this.SmallEgg11 = game.add.sprite(game.world.centerX-88,game.world.centerY-113,'Unity12_3_1SmallEgg');
                this.SmallEgg11.anchor.setTo(0.5);
                this.SmallEgg11.scale.setTo(0.85,0.85);
                this.SmallEgg11.frame = 1;
                                     
                this.SmallEgg12 = game.add.sprite(game.world.centerX-55,game.world.centerY-113,'Unity12_3_1SmallEgg');
                this.SmallEgg12.anchor.setTo(0.5);
                this.SmallEgg12.scale.setTo(0.85,0.85);
                this.SmallEgg12.frame = 1;
                    
                this.eggGrp.add(this.SmallEgg1);
                this.eggGrp.add(this.SmallEgg2);
                this.eggGrp.add(this.SmallEgg3);
                this.eggGrp.add(this.SmallEgg4);
                this.eggGrp.add(this.SmallEgg5);
                this.eggGrp.add(this.SmallEgg6);
                this.eggGrp.add(this.SmallEgg7);
                this.eggGrp.add(this.SmallEgg8);
                this.eggGrp.add(this.SmallEgg9);
                this.eggGrp.add(this.SmallEgg10);
                this.eggGrp.add(this.SmallEgg11);
                this.eggGrp.add(this.SmallEgg12);
                
                                    
                this.numGrp = game.add.group();
                                    
                this.number1 = game.add.sprite(game.world.centerX-240,game.world.centerY-182,'Unity12_3_1greenNumbers1');
                this.number1.anchor.setTo(0.5);
                this.number1.scale.setTo(0.5,0.5);
                this.number1.frame = 3;
                                    
                this.mul1 = game.add.sprite(game.world.centerX-220,game.world.centerY-182,'Unity12_3_1Multiplicationsign');
                this.mul1.anchor.setTo(0.5);
                this.mul1.scale.setTo(0.5,0.5);
                                    
                this.number2 = game.add.sprite(game.world.centerX-200,game.world.centerY-182,'Unity12_3_1greenNumbers1');
                this.number2.anchor.setTo(0.5);
                this.number2.scale.setTo(0.5,0.5);
                this.number2.frame = 0;
                                    
                this.number3 = game.add.sprite(game.world.centerX-240,game.world.centerY-148,'Unity12_3_1greenNumbers1');
                this.number3.anchor.setTo(0.5);
                this.number3.scale.setTo(0.5,0.5);
                this.number3.frame = 3;
                                    
                this.mul2 = game.add.sprite(game.world.centerX-220,game.world.centerY-148,'Unity12_3_1Multiplicationsign');
                this.mul2.anchor.setTo(0.5);
                this.mul2.scale.setTo(0.5,0.5);
                                    
                this.number4 = game.add.sprite(game.world.centerX-200,game.world.centerY-148,'Unity12_3_1greenNumbers1');
                this.number4.anchor.setTo(0.5);
                this.number4.scale.setTo(0.5,0.5);
                this.number4.frame = 1;
                                    
                this.number5 = game.add.sprite(game.world.centerX-240,game.world.centerY-113,'Unity12_3_1greenNumbers1');
                this.number5.anchor.setTo(0.5);
                this.number5.scale.setTo(0.5,0.5);
                this.number5.frame = 3;
                
                this.mul3 = game.add.sprite(game.world.centerX-220,game.world.centerY-113,'Unity12_3_1Multiplicationsign');
                this.mul3.anchor.setTo(0.5);
                this.mul3.scale.setTo(0.5,0.5);
                                    
                this.number6 = game.add.sprite(game.world.centerX-200,game.world.centerY-113,'Unity12_3_1greenNumbers1');
                this.number6.anchor.setTo(0.5);
                this.number6.scale.setTo(0.5,0.5);
                this.number6.frame = 2;
                                    
                this.numGrp.add(this.number1);
                this.numGrp.add(this.number2);
                this.numGrp.add(this.number3);
                this.numGrp.add(this.number4);                    
                this.numGrp.add(this.number5);
                this.numGrp.add(this.number6);
                this.numGrp.add(this.mul1); 
                this.numGrp.add(this.mul2); 
                this.numGrp.add(this.mul3); 
                                    
                 this.subfuncM3(game);   
                
                                       
                                    }
                                }
                         break;
            case 'NOMG3.2': if(this.hintflag==2){

                    if(hintparams[1]=="level1" ){

                        this.tempVar = hintparams[1];

                        this.background = game.add.sprite(10,10,'Unity12_1BG_01');

                        this.popupbg = game.add.sprite(0,0,'popupbgEmpty1');

                        //Hint 2 icon in Hint screen  
                        this.popuphint = game.add.sprite(5,5,'popuphint');
                        this.popuphint.scale.setTo(0.8);
                        this.popuphint.frame=2;

                        //Egg Crate Box
                        this.Eggbox= game.add.sprite(game.world.centerX-150,game.world.centerY-10,'Unity12_1Egg_box');
                        this.Eggbox.anchor.setTo(0.5);
                        this.Eggbox.scale.setTo(0.9,0.9);

                        // 3 small eggs
                        this.SmallEgg1 = game.add.sprite(game.world.centerX-320,game.world.centerY+175,'Unity12_1SmallEgg');
                        this.SmallEgg1.scale.setTo(1,1);
                        this.SmallEgg1.name = "SmallEgg1_1";

                        this.SmallEgg2 = game.add.sprite(game.world.centerX-293,game.world.centerY+175,'Unity12_1SmallEgg');
                        this.SmallEgg2.scale.setTo(1,1);
                        this.SmallEgg2.name = "SmallEgg1_2";

                        this.SmallEgg3 = game.add.sprite(game.world.centerX-266,game.world.centerY+175,'Unity12_1SmallEgg');
                        this.SmallEgg3.scale.setTo(1,1);
                        this.SmallEgg3.name = "SmallEgg1_3";

                        //Egg Crate GLOW
                        this.SmallEgg1_Glow_three = game.add.sprite(game.world.centerX-268,game.world.centerY-161,'Unity12_1threeGlow');
                        this.SmallEgg1_Glow_three.anchor.setTo(0.5);
                        this.SmallEgg1_Glow_three.scale.setTo(0.9,0.9);
                        this.SmallEgg1_Glow_three.frame = 1;
                        this.SmallEgg1_Glow_three.name = "SmallEgg1_Glow_three";
                        this.SmallEgg1_Glow_three.animations.add('walk');                   
                        this.SmallEgg1_Glow_three.play('walk',3,true);

                        this.SmallEgg2_Glow_three = game.add.sprite(game.world.centerX-268,game.world.centerY-127,'Unity12_1threeGlow');
                        this.SmallEgg2_Glow_three.anchor.setTo(0.5);
                        this.SmallEgg2_Glow_three.scale.setTo(0.9,0.9);
                        this.SmallEgg2_Glow_three.frame = 1;
                        this.SmallEgg2_Glow_three.name = "SmallEgg1_Glow_three";
                        this.SmallEgg2_Glow_three.animations.add('walk');                   
                        this.SmallEgg2_Glow_three.play('walk',3,true);

                        this.SmallEgg3_Glow_three = game.add.sprite(game.world.centerX-268,game.world.centerY-93,'Unity12_1threeGlow');
                        this.SmallEgg3_Glow_three.anchor.setTo(0.5);
                        this.SmallEgg3_Glow_three.scale.setTo(0.9,0.9);
                        this.SmallEgg3_Glow_three.frame = 1;
                        this.SmallEgg3_Glow_three.name = "SmallEgg1_Glow_three";
                        this.SmallEgg3_Glow_three.animations.add('walk');                   
                        this.SmallEgg3_Glow_three.play('walk',3,true);

                        this.SmallEgg4_Glow_three = game.add.sprite(game.world.centerX-268,game.world.centerY-59,'Unity12_1threeGlow');
                        this.SmallEgg4_Glow_three.anchor.setTo(0.5);
                        this.SmallEgg4_Glow_three.scale.setTo(0.9,0.9);
                        this.SmallEgg4_Glow_three.frame = 1;
                        this.SmallEgg4_Glow_three.name = "SmallEgg1_Glow_three";
                        this.SmallEgg4_Glow_three.animations.add('walk');                   
                        this.SmallEgg4_Glow_three.play('walk',3,true);
                        
                        
                        //Hand hint icon=============================================================================
                        this.handhint = game.add.sprite(250,450,'hand');
                        this.handhint.scale.setTo(0.65,0.65);

                        //hand hint icon animated to move each row

                        this.HintRepeatFn(game);
                        
                        //Calculator number pad in the right side
                        this.Numberbox= game.add.sprite(game.world.centerX+200,game.world.centerY-15,'calculator');
                        this.Numberbox.anchor.setTo(0.5)
                        this.Numberbox.scale.setTo(0.6,0.66);

                        this.closepopupM2(game);
                    }
                } 
                    else if(this.hintflag==3){

                        if(hintparams[1]=="level1"){

                            this.tempVar = hintparams[1];

                            this.background = game.add.sprite(10,10,'Unity12_1BG_01');

                            this.popupbg = game.add.sprite(0,0,'popupbgEmpty1');

                            //Hint 2 icon in Hint screen  
                            this.popuphint = game.add.sprite(5,5,'popuphint');
                            this.popuphint.scale.setTo(0.8);
                            this.popuphint.frame=2;

                            //Egg Crate Box
                            this.Eggbox= game.add.sprite(game.world.centerX-150,game.world.centerY-10,'Unity12_1Egg_box');
                            this.Eggbox.anchor.setTo(0.5);
                            this.Eggbox.scale.setTo(0.9,0.9);
                            
                            this.SmallEgg1_Hint3 = game.add.sprite(game.world.centerX-320,game.world.centerY+175,'Unity12_1SmallEgg');
                            this.SmallEgg1_Hint3.scale.setTo(1,1);
                            this.SmallEgg1_Hint3.name = "SmallEgg1_1";

                            this.SmallEgg2_Hint3 = game.add.sprite(game.world.centerX-293,game.world.centerY+175,'Unity12_1SmallEgg');
                            this.SmallEgg2_Hint3.scale.setTo(1,1);
                            this.SmallEgg2_Hint3.name = "SmallEgg1_2";

                            this.SmallEgg3_Hint3 = game.add.sprite(game.world.centerX-266,game.world.centerY+175,'Unity12_1SmallEgg');
                            this.SmallEgg3_Hint3.scale.setTo(1,1);
                            this.SmallEgg3_Hint3.name = "SmallEgg1_3";

                            //Egg box GLOW and in respective rows 3 small eggs===============================================
                            this.SmallEgg1_Glow_three = game.add.sprite(game.world.centerX-268,game.world.centerY-161,'Unity12_1threeGlow');
                            this.SmallEgg1_Glow_three.anchor.setTo(0.5);
                            this.SmallEgg1_Glow_three.scale.setTo(0.9,0.9);
                            this.SmallEgg1_Glow_three.frame = 1;
                            this.SmallEgg1_Glow_three.name = "SmallEgg1_Glow_three";
                            this.SmallEgg1_Glow_three.animations.add('walk');                   
                            this.SmallEgg1_Glow_three.play('walk',3,true);

                            this.SmallEgg1_1 = game.add.sprite(game.world.centerX-301,game.world.centerY-160,'Unity12_1SmallEgg');
                            this.SmallEgg1_1.anchor.setTo(0.5);
                            this.SmallEgg1_1.scale.setTo(0.9,0.9);
                            this.SmallEgg1_1.name = "SmallEgg1_1";

                            this.SmallEgg1_2 = game.add.sprite(game.world.centerX-268,game.world.centerY-160,'Unity12_1SmallEgg');
                            this.SmallEgg1_2.anchor.setTo(0.5);
                            this.SmallEgg1_2.scale.setTo(0.9,0.9);
                            this.SmallEgg1_2.name = "SmallEgg1_2";

                            this.SmallEgg1_3 = game.add.sprite(game.world.centerX-233,game.world.centerY-160,'Unity12_1SmallEgg');
                            this.SmallEgg1_3.anchor.setTo(0.5);
                            this.SmallEgg1_3.scale.setTo(0.9,0.9);
                            this.SmallEgg1_3.name = "SmallEgg1_3";

                            this.SmallEgg2_Glow_three = game.add.sprite(game.world.centerX-268,game.world.centerY-127,'Unity12_1threeGlow');
                            this.SmallEgg2_Glow_three.anchor.setTo(0.5);
                            this.SmallEgg2_Glow_three.scale.setTo(0.9,0.9);
                            this.SmallEgg2_Glow_three.frame = 1;
                            this.SmallEgg2_Glow_three.name = "SmallEgg1_Glow_three";
                            this.SmallEgg2_Glow_three.animations.add('walk');                   
                            this.SmallEgg2_Glow_three.play('walk',3,true);

                            this.SmallEgg1_4 = game.add.sprite(game.world.centerX-301,game.world.centerY-126,'Unity12_1SmallEgg');
                            this.SmallEgg1_4.anchor.setTo(0.5);
                            this.SmallEgg1_4.scale.setTo(0.9,0.9);
                            this.SmallEgg1_4.name = "SmallEgg1_1";

                            this.SmallEgg1_5 = game.add.sprite(game.world.centerX-268,game.world.centerY-126,'Unity12_1SmallEgg');
                            this.SmallEgg1_5.anchor.setTo(0.5);
                            this.SmallEgg1_5.scale.setTo(0.9,0.9);
                            this.SmallEgg1_5.name = "SmallEgg1_2";

                            this.SmallEgg1_6 = game.add.sprite(game.world.centerX-233,game.world.centerY-126,'Unity12_1SmallEgg');
                            this.SmallEgg1_6.anchor.setTo(0.5);
                            this.SmallEgg1_6.scale.setTo(0.9,0.9);
                            this.SmallEgg1_6.name = "SmallEgg1_3";

                            this.SmallEgg3_Glow_three = game.add.sprite(game.world.centerX-268,game.world.centerY-93,'Unity12_1threeGlow');
                            this.SmallEgg3_Glow_three.anchor.setTo(0.5);
                            this.SmallEgg3_Glow_three.scale.setTo(0.9,0.9);
                            this.SmallEgg3_Glow_three.frame = 1;
                            this.SmallEgg3_Glow_three.name = "SmallEgg1_Glow_three";
                            this.SmallEgg3_Glow_three.animations.add('walk');                   
                            this.SmallEgg3_Glow_three.play('walk',3,true);

                            this.SmallEgg1_7 = game.add.sprite(game.world.centerX-301,game.world.centerY-92,'Unity12_1SmallEgg');
                            this.SmallEgg1_7.anchor.setTo(0.5);
                            this.SmallEgg1_7.scale.setTo(0.9,0.9);
                            this.SmallEgg1_7.name = "SmallEgg1_1";

                            this.SmallEgg1_8 = game.add.sprite(game.world.centerX-268,game.world.centerY-92,'Unity12_1SmallEgg');
                            this.SmallEgg1_8.anchor.setTo(0.5);
                            this.SmallEgg1_8.scale.setTo(0.9,0.9);
                            this.SmallEgg1_8.name = "SmallEgg1_2";

                            this.SmallEgg1_9 = game.add.sprite(game.world.centerX-233,game.world.centerY-92,'Unity12_1SmallEgg');
                            this.SmallEgg1_9.anchor.setTo(0.5);
                            this.SmallEgg1_9.scale.setTo(0.9,0.9);
                            this.SmallEgg1_9.name = "SmallEgg1_3";

                            this.SmallEgg4_Glow_three = game.add.sprite(game.world.centerX-268,game.world.centerY-59,'Unity12_1threeGlow');
                            this.SmallEgg4_Glow_three.anchor.setTo(0.5);
                            this.SmallEgg4_Glow_three.scale.setTo(0.9,0.9);
                            this.SmallEgg4_Glow_three.frame = 1;
                            this.SmallEgg4_Glow_three.name = "SmallEgg1_Glow_three";
                            this.SmallEgg4_Glow_three.animations.add('walk');                   
                            this.SmallEgg4_Glow_three.play('walk',3,true);

                            this.SmallEgg1_10 = game.add.sprite(game.world.centerX-301,game.world.centerY-59,'Unity12_1SmallEgg');
                            this.SmallEgg1_10.anchor.setTo(0.5);
                            this.SmallEgg1_10.scale.setTo(0.9,0.9);
                            this.SmallEgg1_10.name = "SmallEgg1_1";

                            this.SmallEgg1_11 = game.add.sprite(game.world.centerX-268,game.world.centerY-59,'Unity12_1SmallEgg');
                            this.SmallEgg1_11.anchor.setTo(0.5);
                            this.SmallEgg1_11.scale.setTo(0.9,0.9);
                            this.SmallEgg1_11.name = "SmallEgg1_2";

                            this.SmallEgg1_12 = game.add.sprite(game.world.centerX-233,game.world.centerY-59,'Unity12_1SmallEgg');
                            this.SmallEgg1_12.anchor.setTo(0.5);
                            this.SmallEgg1_12.scale.setTo(0.9,0.9);
                            this.SmallEgg1_12.name = "SmallEgg1_3";
                            //========================================================================================

                            //Numbers (3x1,3x2,3x3..) for each row of egg crate in the left side====================
                            this.FirstNumbers1 = game.add.sprite(game.world.centerX-390,game.world.centerY-160,'Unity12_1greenNumbers');
                            this.FirstNumbers1.name="FirstNumbers";
                            this.FirstNumbers1.anchor.setTo(0.5);
                            this.FirstNumbers1.scale.setTo(0.5);
                            this.FirstNumbers1.visible = false;
                            this.FirstNumbers1.frame=2;

                            this.SecondNumbers1 = game.add.sprite(game.world.centerX-353,game.world.centerY-160,'Unity12_1greenNumbers');
                            this.SecondNumbers1.name="SecondNumbers";
                            this.SecondNumbers1.scale.setTo(0.5);
                            this.SecondNumbers1.anchor.setTo(0.5);
                            this.SecondNumbers1.frame=0;
                            this.SecondNumbers1.visible=false;

                            this.Multiplicationsign1=game.add.sprite(game.world.centerX-370,game.world.centerY-160,'Unity12_1Multiplicationsign');
                            this.Multiplicationsign1.name="Unity12_3_2Multiplicationsign";
                            this.Multiplicationsign1.scale.setTo(0.5);
                            this.Multiplicationsign1.anchor.setTo(0.5);
                            this.Multiplicationsign1.visible=false;

                            this.FirstNumbers2 = game.add.sprite(game.world.centerX-390,game.world.centerY-128,'Unity12_1greenNumbers');
                            this.FirstNumbers2.name="FirstNumbers";
                            this.FirstNumbers2.anchor.setTo(0.5);
                            this.FirstNumbers2.scale.setTo(0.5);
                            this.FirstNumbers2.visible = false;
                            this.FirstNumbers2.frame=2;

                            this.SecondNumbers2 = game.add.sprite(game.world.centerX-353,game.world.centerY-128,'Unity12_1greenNumbers');
                            this.SecondNumbers2.name="SecondNumbers";
                            this.SecondNumbers2.scale.setTo(0.5);
                            this.SecondNumbers2.anchor.setTo(0.5);
                            this.SecondNumbers2.frame=1;
                            this.SecondNumbers2.visible=false;

                            this.Multiplicationsign2=game.add.sprite(game.world.centerX-370,game.world.centerY-128,'Unity12_1Multiplicationsign');
                            this.Multiplicationsign2.name="Unity12_3_2Multiplicationsign";
                            this.Multiplicationsign2.scale.setTo(0.5);
                            this.Multiplicationsign2.anchor.setTo(0.5);
                            this.Multiplicationsign2.visible=false;

                            this.FirstNumbers3 = game.add.sprite(game.world.centerX-390,game.world.centerY-96,'Unity12_1greenNumbers');
                            this.FirstNumbers3.name="FirstNumbers";
                            this.FirstNumbers3.anchor.setTo(0.5);
                            this.FirstNumbers3.scale.setTo(0.5);
                            this.FirstNumbers3.visible = false;
                            this.FirstNumbers3.frame=2;

                            this.SecondNumbers3 = game.add.sprite(game.world.centerX-353,game.world.centerY-96,'Unity12_1greenNumbers');
                            this.SecondNumbers3.name="SecondNumbers";
                            this.SecondNumbers3.scale.setTo(0.5);
                            this.SecondNumbers3.anchor.setTo(0.5);
                            this.SecondNumbers3.frame=2;
                            this.SecondNumbers3.visible=false;

                            this.Multiplicationsign3=game.add.sprite(game.world.centerX-370,game.world.centerY-96,'Unity12_1Multiplicationsign');
                            this.Multiplicationsign3.name="Unity12_3_2Multiplicationsign";
                            this.Multiplicationsign3.scale.setTo(0.5);
                            this.Multiplicationsign3.anchor.setTo(0.5);
                            this.Multiplicationsign3.visible=false;

                            this.FirstNumbers4 = game.add.sprite(game.world.centerX-390,game.world.centerY-64,'Unity12_1greenNumbers');
                            this.FirstNumbers4.name="FirstNumbers";
                            this.FirstNumbers4.anchor.setTo(0.5);
                            this.FirstNumbers4.scale.setTo(0.5);
                            this.FirstNumbers4.visible = false;
                            this.FirstNumbers4.frame=2;

                            this.SecondNumbers4 = game.add.sprite(game.world.centerX-353,game.world.centerY-64,'Unity12_1greenNumbers');
                            this.SecondNumbers4.name="SecondNumbers";
                            this.SecondNumbers4.scale.setTo(0.5);
                            this.SecondNumbers4.anchor.setTo(0.5);
                            this.SecondNumbers4.frame=3;
                            this.SecondNumbers4.visible=false;

                            this.Multiplicationsign4=game.add.sprite(game.world.centerX-370,game.world.centerY-64,'Unity12_1Multiplicationsign');
                            this.Multiplicationsign4.name="Unity12_3_2Multiplicationsign";
                            this.Multiplicationsign4.scale.setTo(0.5);
                            this.Multiplicationsign4.anchor.setTo(0.5);
                            this.Multiplicationsign4.visible=false;

                            //========================================================================================


                            //Hand hint icon=============================================================================
                            this.handhint2 = game.add.sprite(250,450,'hand');
                            this.handhint2.scale.setTo(0.65,0.65);

                            //hand hint icon animated to move each row

                            this.HintRepeatFn2(game);

                            //===============================================================================================

                            this.Numberbox= game.add.sprite(game.world.centerX+200,game.world.centerY-15,'calculator');
                            this.Numberbox.anchor.setTo(0.5)
                            this.Numberbox.scale.setTo(0.6,0.66);

                            this.closepopupM2(game);

                        }else if( hintparams[1]=="level2"){

                            this.tempVar = hintparams[1];

                            this.background = game.add.sprite(10,10,'Unity12_1BG_01');

                            this.popupbg = game.add.sprite(0,0,'popupbgEmpty1');

                            //Hint 3 icon
                            this.popuphint = game.add.sprite(5,5,'popuphint');
                            this.popuphint.scale.setTo(0.8);
                            this.popuphint.frame=3;

                            //Egg Crate Box
                            this.Eggbox= game.add.sprite(game.world.centerX-150,game.world.centerY-10,'Unity12_1Egg_box');
                            this.Eggbox.anchor.setTo(0.5);
                            this.Eggbox.scale.setTo(0.9,0.9);
                            
                            //Egg box GLOW and in respective rows 3 small eggs===============================================
                            this.SmallEgg1_Glow_five = game.add.sprite(game.world.centerX-234,game.world.centerY-161,'unity12_2glow5');
                            this.SmallEgg1_Glow_five.anchor.setTo(0.5);
                            this.SmallEgg1_Glow_five.scale.setTo(0.9,0.9);
                            this.SmallEgg1_Glow_five.frame = 1;
                            this.SmallEgg1_Glow_five.name = "SmallEgg1_Glow_three";
                            this.SmallEgg1_Glow_five.animations.add('walk');                   
                            this.SmallEgg1_Glow_five.play('walk',5,true);

                            this.SmallEgg1_1 = game.add.sprite(game.world.centerX-301,game.world.centerY-160,'Unity12_1SmallEgg');
                            this.SmallEgg1_1.anchor.setTo(0.5);
                            this.SmallEgg1_1.scale.setTo(0.9,0.9);
                            this.SmallEgg1_1.name = "SmallEgg1_1";

                            this.SmallEgg1_2 = game.add.sprite(game.world.centerX-268,game.world.centerY-160,'Unity12_1SmallEgg');
                            this.SmallEgg1_2.anchor.setTo(0.5);
                            this.SmallEgg1_2.scale.setTo(0.9,0.9);
                            this.SmallEgg1_2.name = "SmallEgg1_2";

                            this.SmallEgg1_3 = game.add.sprite(game.world.centerX-233,game.world.centerY-160,'Unity12_1SmallEgg');
                            this.SmallEgg1_3.anchor.setTo(0.5);
                            this.SmallEgg1_3.scale.setTo(0.9,0.9);
                            this.SmallEgg1_3.name = "SmallEgg1_3";

                            this.SmallEgg1_4 = game.add.sprite(game.world.centerX-198,game.world.centerY-160,'Unity12_1SmallEgg');
                            this.SmallEgg1_4.anchor.setTo(0.5);
                            this.SmallEgg1_4.scale.setTo(0.9,0.9);
                            this.SmallEgg1_4.name = "SmallEgg1_3";

                            this.SmallEgg1_5 = game.add.sprite(game.world.centerX-164,game.world.centerY-160,'Unity12_1SmallEgg');
                            this.SmallEgg1_5.anchor.setTo(0.5);
                            this.SmallEgg1_5.scale.setTo(0.9,0.9);
                            this.SmallEgg1_5.name = "SmallEgg1_3";

                            this.SmallEgg2_Glow_five = game.add.sprite(game.world.centerX-234,game.world.centerY-127,'unity12_2glow5');
                            this.SmallEgg2_Glow_five.anchor.setTo(0.5);
                            this.SmallEgg2_Glow_five.scale.setTo(0.9,0.9);
                            this.SmallEgg2_Glow_five.frame = 1;
                            this.SmallEgg2_Glow_five.name = "SmallEgg1_Glow_three";
                            this.SmallEgg2_Glow_five.animations.add('walk');                   
                            this.SmallEgg2_Glow_five.play('walk',5,true);

                            this.SmallEgg2_1 = game.add.sprite(game.world.centerX-301,game.world.centerY-126,'Unity12_1SmallEgg');
                            this.SmallEgg2_1.anchor.setTo(0.5);
                            this.SmallEgg2_1.scale.setTo(0.9,0.9);
                            this.SmallEgg2_1.name = "SmallEgg1_1";

                            this.SmallEgg2_2 = game.add.sprite(game.world.centerX-268,game.world.centerY-126,'Unity12_1SmallEgg');
                            this.SmallEgg2_2.anchor.setTo(0.5);
                            this.SmallEgg2_2.scale.setTo(0.9,0.9);
                            this.SmallEgg2_2.name = "SmallEgg1_2";

                            this.SmallEgg2_3 = game.add.sprite(game.world.centerX-233,game.world.centerY-126,'Unity12_1SmallEgg');
                            this.SmallEgg2_3.anchor.setTo(0.5);
                            this.SmallEgg2_3.scale.setTo(0.9,0.9);
                            this.SmallEgg2_3.name = "SmallEgg1_3";

                            this.SmallEgg2_4 = game.add.sprite(game.world.centerX-198,game.world.centerY-126,'Unity12_1SmallEgg');
                            this.SmallEgg2_4.anchor.setTo(0.5);
                            this.SmallEgg2_4.scale.setTo(0.9,0.9);
                            this.SmallEgg2_4.name = "SmallEgg1_3";

                            this.SmallEgg2_5 = game.add.sprite(game.world.centerX-164,game.world.centerY-126,'Unity12_1SmallEgg');
                            this.SmallEgg2_5.anchor.setTo(0.5);
                            this.SmallEgg2_5.scale.setTo(0.9,0.9);
                            this.SmallEgg2_5.name = "SmallEgg1_3";

                            this.SmallEgg3_Glow_five = game.add.sprite(game.world.centerX-234,game.world.centerY-93,'unity12_2glow5');
                            this.SmallEgg3_Glow_five.anchor.setTo(0.5);
                            this.SmallEgg3_Glow_five.scale.setTo(0.9,0.9);
                            this.SmallEgg3_Glow_five.frame = 1;
                            this.SmallEgg3_Glow_five.name = "SmallEgg1_Glow_three";
                            this.SmallEgg3_Glow_five.animations.add('walk');                   
                            this.SmallEgg3_Glow_five.play('walk',5,true);

                            this.SmallEgg3_1 = game.add.sprite(game.world.centerX-301,game.world.centerY-92,'Unity12_1SmallEgg');
                            this.SmallEgg3_1.anchor.setTo(0.5);
                            this.SmallEgg3_1.scale.setTo(0.9,0.9);
                            this.SmallEgg3_1.name = "SmallEgg1_1";

                            this.SmallEgg3_2 = game.add.sprite(game.world.centerX-268,game.world.centerY-92,'Unity12_1SmallEgg');
                            this.SmallEgg3_2.anchor.setTo(0.5);
                            this.SmallEgg3_2.scale.setTo(0.9,0.9);
                            this.SmallEgg3_2.name = "SmallEgg1_2";

                            this.SmallEgg3_3 = game.add.sprite(game.world.centerX-233,game.world.centerY-92,'Unity12_1SmallEgg');
                            this.SmallEgg3_3.anchor.setTo(0.5);
                            this.SmallEgg3_3.scale.setTo(0.9,0.9);
                            this.SmallEgg3_3.name = "SmallEgg1_3";

                            this.SmallEgg3_4 = game.add.sprite(game.world.centerX-198,game.world.centerY-92,'Unity12_1SmallEgg');
                            this.SmallEgg3_4.anchor.setTo(0.5);
                            this.SmallEgg3_4.scale.setTo(0.9,0.9);
                            this.SmallEgg3_4.name = "SmallEgg1_3";

                            this.SmallEgg3_5 = game.add.sprite(game.world.centerX-164,game.world.centerY-92,'Unity12_1SmallEgg');
                            this.SmallEgg3_5.anchor.setTo(0.5);
                            this.SmallEgg3_5.scale.setTo(0.9,0.9);
                            this.SmallEgg3_5.name = "SmallEgg1_3";

                            this.SmallEgg4_Glow_five = game.add.sprite(game.world.centerX-234,game.world.centerY-58,'unity12_2glow5');
                            this.SmallEgg4_Glow_five.anchor.setTo(0.5);
                            this.SmallEgg4_Glow_five.scale.setTo(0.9,0.9);
                            this.SmallEgg4_Glow_five.frame = 1;
                            this.SmallEgg4_Glow_five.name = "SmallEgg1_Glow_three";
                            this.SmallEgg4_Glow_five.animations.add('walk');                   
                            this.SmallEgg4_Glow_five.play('walk',5,true);

                            this.SmallEgg4_1 = game.add.sprite(game.world.centerX-301,game.world.centerY-58,'Unity12_1SmallEgg');
                            this.SmallEgg4_1.anchor.setTo(0.5);
                            this.SmallEgg4_1.scale.setTo(0.9,0.9);
                            this.SmallEgg4_1.name = "SmallEgg1_1";

                            this.SmallEgg4_2 = game.add.sprite(game.world.centerX-268,game.world.centerY-58,'Unity12_1SmallEgg');
                            this.SmallEgg4_2.anchor.setTo(0.5);
                            this.SmallEgg4_2.scale.setTo(0.9,0.9);
                            this.SmallEgg4_2.name = "SmallEgg1_2";

                            this.SmallEgg4_3 = game.add.sprite(game.world.centerX-233,game.world.centerY-58,'Unity12_1SmallEgg');
                            this.SmallEgg4_3.anchor.setTo(0.5);
                            this.SmallEgg4_3.scale.setTo(0.9,0.9);
                            this.SmallEgg4_3.name = "SmallEgg1_3";

                            this.SmallEgg4_4 = game.add.sprite(game.world.centerX-198,game.world.centerY-58,'Unity12_1SmallEgg');
                            this.SmallEgg4_4.anchor.setTo(0.5);
                            this.SmallEgg4_4.scale.setTo(0.9,0.9);
                            this.SmallEgg4_4.name = "SmallEgg1_3";

                            this.SmallEgg4_5 = game.add.sprite(game.world.centerX-164,game.world.centerY-58,'Unity12_1SmallEgg');
                            this.SmallEgg4_5.anchor.setTo(0.5);
                            this.SmallEgg4_5.scale.setTo(0.9,0.9);
                            this.SmallEgg4_5.name = "SmallEgg1_3";

                            this.SmallEgg5_Glow_five = game.add.sprite(game.world.centerX-234,game.world.centerY-24,'unity12_2glow5');
                            this.SmallEgg5_Glow_five.anchor.setTo(0.5);
                            this.SmallEgg5_Glow_five.scale.setTo(0.9,0.9);
                            this.SmallEgg5_Glow_five.frame = 1;
                            this.SmallEgg5_Glow_five.name = "SmallEgg1_Glow_three";
                            this.SmallEgg5_Glow_five.animations.add('walk');                   
                            this.SmallEgg5_Glow_five.play('walk',5,true);

                            this.SmallEgg5_1 = game.add.sprite(game.world.centerX-301,game.world.centerY-24,'Unity12_1SmallEgg');
                            this.SmallEgg5_1.anchor.setTo(0.5);
                            this.SmallEgg5_1.scale.setTo(0.9,0.9);
                            this.SmallEgg5_1.name = "SmallEgg1_1";

                            this.SmallEgg5_2 = game.add.sprite(game.world.centerX-268,game.world.centerY-24,'Unity12_1SmallEgg');
                            this.SmallEgg5_2.anchor.setTo(0.5);
                            this.SmallEgg5_2.scale.setTo(0.9,0.9);
                            this.SmallEgg5_2.name = "SmallEgg1_2";

                            this.SmallEgg5_3 = game.add.sprite(game.world.centerX-233,game.world.centerY-24,'Unity12_1SmallEgg');
                            this.SmallEgg5_3.anchor.setTo(0.5);
                            this.SmallEgg5_3.scale.setTo(0.9,0.9);
                            this.SmallEgg5_3.name = "SmallEgg1_3";

                            this.SmallEgg5_4 = game.add.sprite(game.world.centerX-198,game.world.centerY-24,'Unity12_1SmallEgg');
                            this.SmallEgg5_4.anchor.setTo(0.5);
                            this.SmallEgg5_4.scale.setTo(0.9,0.9);
                            this.SmallEgg5_4.name = "SmallEgg1_3";

                            this.SmallEgg5_5 = game.add.sprite(game.world.centerX-164,game.world.centerY-24,'Unity12_1SmallEgg');
                            this.SmallEgg5_5.anchor.setTo(0.5);
                            this.SmallEgg5_5.scale.setTo(0.9,0.9);
                            this.SmallEgg5_5.name = "SmallEgg1_3";
                            //========================================================================================

                            //Box 
                            this.Numberbox= game.add.sprite(game.world.centerX+220,game.world.centerY-30,'calculatorbox');
                            this.Numberbox.anchor.setTo(0.5)
                            this.Numberbox.scale.setTo(0.8,0.9);
                            
                            this.SmallEgg1_Hint3 = game.add.sprite(game.world.centerX+80,game.world.centerY+140,'Unity12_1SmallEgg');
                            this.SmallEgg1_Hint3.scale.setTo(1,1);
                            this.SmallEgg1_Hint3.name = "SmallEgg1_1";

                            this.SmallEgg2_Hint3 = game.add.sprite(game.world.centerX+107,game.world.centerY+140,'Unity12_1SmallEgg');
                            this.SmallEgg2_Hint3.scale.setTo(1,1);
                            this.SmallEgg2_Hint3.name = "SmallEgg1_2";

                            this.SmallEgg3_Hint3 = game.add.sprite(game.world.centerX+134,game.world.centerY+140,'Unity12_1SmallEgg');
                            this.SmallEgg3_Hint3.scale.setTo(1,1);
                            this.SmallEgg3_Hint3.name = "SmallEgg1_3";
                            
                            this.SmallEgg4_Hint3 = game.add.sprite(game.world.centerX+161,game.world.centerY+140,'Unity12_1SmallEgg');
                            this.SmallEgg4_Hint3.scale.setTo(1,1);
                            this.SmallEgg4_Hint3.name = "SmallEgg1_4";
                            
                            this.SmallEgg5_Hint3 = game.add.sprite(game.world.centerX+188,game.world.centerY+140,'Unity12_1SmallEgg');
                            this.SmallEgg5_Hint3.scale.setTo(1,1);
                            this.SmallEgg5_Hint3.name = "SmallEgg1_5";


                            //Hand hint icon=============================================================================
                            this.handhint3 = game.add.sprite(570,450,'hand');
                            this.handhint3.scale.setTo(0.65,0.65);

                            //hand hint icon animated to move each row

                            this.HintRepeatFn3(game);

                            //===============================================================================================
                            this.closepopupM2(game);
                        }
                    }
                    break;
            case 'NOMG4.2': if(this.hintflag==1){

                    if(hintparams[1] == "level1" || hintparams[1] == "level2"){

                        this.tempVar = hintparams[1];

                        this.background = game.add.sprite(10,10,'Unity12_3_2BG_01');

                        this.popupbg = game.add.sprite(0,0,'popupbgEmpty1');

                        //Hint 1 icon in Hint screen  
                        this.popuphint = game.add.sprite(5,5,'popuphint');
                        this.popuphint.scale.setTo(0.8);
                        this.popuphint.frame=1;

                        //Egg Crate Box
                        this.Eggbox= game.add.sprite(game.world.centerX-150,game.world.centerY-10,'Unity12_3_2Egg_box');
                        this.Eggbox.anchor.setTo(0.5);
                        this.Eggbox.scale.setTo(0.9,0.9);

                        // 3 small eggs
                        this.SmallEgg1 = game.add.sprite(game.world.centerX-320,game.world.centerY+175,'Unity12_3_2SmallEgg');
                        this.SmallEgg1.scale.setTo(1,1);
                        this.SmallEgg1.name = "SmallEgg1_1";

                        this.SmallEgg2 = game.add.sprite(game.world.centerX-293,game.world.centerY+175,'Unity12_3_2SmallEgg');
                        this.SmallEgg2.scale.setTo(1,1);
                        this.SmallEgg2.name = "SmallEgg1_2";

                        this.SmallEgg3 = game.add.sprite(game.world.centerX-266,game.world.centerY+175,'Unity12_3_2SmallEgg');
                        this.SmallEgg3.scale.setTo(1,1);
                        this.SmallEgg3.name = "SmallEgg1_3";

                        //Hand hint icon=============================================================================
                        this.handhint = game.add.sprite(250,450,'hand');
                        this.handhint.scale.setTo(0.65,0.65);

                        //hand hint icon animated to move each row

                        this.HintRepeatFn1M(game);

                        //Calculator number pad in the right side
                        this.Numberbox= game.add.sprite(game.world.centerX+200,game.world.centerY-15,'calculator');
                        this.Numberbox.anchor.setTo(0.5)
                        this.Numberbox.scale.setTo(0.6,0.66);

                        this.closepopupMNew(game);
                    }
                }
                    else if(this.hintflag==2){

                        if(hintparams[1]=="level1" || hintparams[1] == "level2"){

                            this.tempVar = hintparams[1];

                            this.background = game.add.sprite(10,10,'Unity12_3_2BG_01');

                            this.popupbg = game.add.sprite(0,0,'popupbgEmpty1');

                            //Hint 2 icon in Hint screen  
                            this.popuphint = game.add.sprite(5,5,'popuphint');
                            this.popuphint.scale.setTo(0.8);
                            this.popuphint.frame=2;

                            //Egg Crate Box
                            this.Eggbox= game.add.sprite(game.world.centerX-150,game.world.centerY-10,'Unity12_3_2Egg_box');
                            this.Eggbox.anchor.setTo(0.5);
                            this.Eggbox.scale.setTo(0.9,0.9);

                            // 3 small eggs
                            this.SmallEgg1 = game.add.sprite(game.world.centerX-320,game.world.centerY+175,'Unity12_3_2SmallEgg');
                            this.SmallEgg1.scale.setTo(1,1);
                            this.SmallEgg1.name = "SmallEgg1_1";

                            this.SmallEgg2 = game.add.sprite(game.world.centerX-293,game.world.centerY+175,'Unity12_3_2SmallEgg');
                            this.SmallEgg2.scale.setTo(1,1);
                            this.SmallEgg2.name = "SmallEgg1_2";

                            this.SmallEgg3 = game.add.sprite(game.world.centerX-266,game.world.centerY+175,'Unity12_3_2SmallEgg');
                            this.SmallEgg3.scale.setTo(1,1);
                            this.SmallEgg3.name = "SmallEgg1_3";

                            //Egg Crate GLOW
                            this.SmallEgg1_Glow_three = game.add.sprite(game.world.centerX-268,game.world.centerY-161,'Unity12_3_2threeGlow');
                            this.SmallEgg1_Glow_three.anchor.setTo(0.5);
                            this.SmallEgg1_Glow_three.scale.setTo(0.9,0.9);
                            this.SmallEgg1_Glow_three.frame = 1;
                            this.SmallEgg1_Glow_three.name = "SmallEgg1_Glow_three";
                            this.SmallEgg1_Glow_three.animations.add('walk');                   
                            this.SmallEgg1_Glow_three.play('walk',3,true);

                            this.SmallEgg2_Glow_three = game.add.sprite(game.world.centerX-268,game.world.centerY-127,'Unity12_3_2threeGlow');
                            this.SmallEgg2_Glow_three.anchor.setTo(0.5);
                            this.SmallEgg2_Glow_three.scale.setTo(0.9,0.9);
                            this.SmallEgg2_Glow_three.frame = 1;
                            this.SmallEgg2_Glow_three.name = "SmallEgg1_Glow_three";
                            this.SmallEgg2_Glow_three.animations.add('walk');                   
                            this.SmallEgg2_Glow_three.play('walk',3,true);

                            this.SmallEgg3_Glow_three = game.add.sprite(game.world.centerX-268,game.world.centerY-93,'Unity12_3_2threeGlow');
                            this.SmallEgg3_Glow_three.anchor.setTo(0.5);
                            this.SmallEgg3_Glow_three.scale.setTo(0.9,0.9);
                            this.SmallEgg3_Glow_three.frame = 1;
                            this.SmallEgg3_Glow_three.name = "SmallEgg1_Glow_three";
                            this.SmallEgg3_Glow_three.animations.add('walk');                   
                            this.SmallEgg3_Glow_three.play('walk',3,true);

                            this.SmallEgg4_Glow_three = game.add.sprite(game.world.centerX-268,game.world.centerY-59,'Unity12_3_2threeGlow');
                            this.SmallEgg4_Glow_three.anchor.setTo(0.5);
                            this.SmallEgg4_Glow_three.scale.setTo(0.9,0.9);
                            this.SmallEgg4_Glow_three.frame = 1;
                            this.SmallEgg4_Glow_three.name = "SmallEgg1_Glow_three";
                            this.SmallEgg4_Glow_three.animations.add('walk');                   
                            this.SmallEgg4_Glow_three.play('walk',3,true);


                            //Hand hint icon=============================================================================
                            this.handhint2 = game.add.sprite(250,450,'hand');
                            this.handhint2.scale.setTo(0.65,0.65);

                            //hand hint icon animated to move each row

                            this.HintRepeatFn2M(game);

                            //Calculator number pad in the right side
                            this.Numberbox= game.add.sprite(game.world.centerX+200,game.world.centerY-15,'calculator');
                            this.Numberbox.anchor.setTo(0.5)
                            this.Numberbox.scale.setTo(0.6,0.66);

                            this.closepopupMNew(game);
                        }

                    }
                    else if(this.hintflag==3){

                        if(hintparams[1]=="level1" || hintparams[1] == "level2"){

                            this.tempVar = hintparams[1];

                            this.background = game.add.sprite(10,10,'Unity12_3_2BG_01');

                            this.popupbg = game.add.sprite(0,0,'popupbgEmpty1');

                            //Hint 3 icon
                            this.popuphint = game.add.sprite(5,5,'popuphint');
                            this.popuphint.scale.setTo(0.8);
                            this.popuphint.frame=3;

                            //Egg Crate Box
                            this.Eggbox= game.add.sprite(game.world.centerX-150,game.world.centerY-10,'Unity12_3_2Egg_box');
                            this.Eggbox.anchor.setTo(0.5);
                            this.Eggbox.scale.setTo(0.9,0.9);

                            this.SmallEgg1_Hint3 = game.add.sprite(game.world.centerX-320,game.world.centerY+175,'Unity12_3_2SmallEgg');
                            this.SmallEgg1_Hint3.scale.setTo(1,1);
                            this.SmallEgg1_Hint3.name = "SmallEgg1_1";

                            this.SmallEgg2_Hint3 = game.add.sprite(game.world.centerX-293,game.world.centerY+175,'Unity12_3_2SmallEgg');
                            this.SmallEgg2_Hint3.scale.setTo(1,1);
                            this.SmallEgg2_Hint3.name = "SmallEgg1_2";

                            this.SmallEgg3_Hint3 = game.add.sprite(game.world.centerX-266,game.world.centerY+175,'Unity12_3_2SmallEgg');
                            this.SmallEgg3_Hint3.scale.setTo(1,1);
                            this.SmallEgg3_Hint3.name = "SmallEgg1_3";

                            //Egg box GLOW and in respective rows 3 small eggs===============================================
                            this.SmallEgg1_Glow_three = game.add.sprite(game.world.centerX-268,game.world.centerY-161,'Unity12_3_2threeGlow');
                            this.SmallEgg1_Glow_three.anchor.setTo(0.5);
                            this.SmallEgg1_Glow_three.scale.setTo(0.9,0.9);
                            this.SmallEgg1_Glow_three.frame = 1;
                            this.SmallEgg1_Glow_three.name = "SmallEgg1_Glow_three";
                            this.SmallEgg1_Glow_three.animations.add('walk');                   
                            this.SmallEgg1_Glow_three.play('walk',3,true);

                            this.SmallEgg1_1 = game.add.sprite(game.world.centerX-301,game.world.centerY-160,'Unity12_3_2SmallEgg');
                            this.SmallEgg1_1.anchor.setTo(0.5);
                            this.SmallEgg1_1.scale.setTo(0.9,0.9);
                            this.SmallEgg1_1.name = "SmallEgg1_1";

                            this.SmallEgg1_2 = game.add.sprite(game.world.centerX-268,game.world.centerY-160,'Unity12_3_2SmallEgg');
                            this.SmallEgg1_2.anchor.setTo(0.5);
                            this.SmallEgg1_2.scale.setTo(0.9,0.9);
                            this.SmallEgg1_2.name = "SmallEgg1_2";

                            this.SmallEgg1_3 = game.add.sprite(game.world.centerX-233,game.world.centerY-160,'Unity12_3_2SmallEgg');
                            this.SmallEgg1_3.anchor.setTo(0.5);
                            this.SmallEgg1_3.scale.setTo(0.9,0.9);
                            this.SmallEgg1_3.name = "SmallEgg1_3";

                            this.SmallEgg2_Glow_three = game.add.sprite(game.world.centerX-268,game.world.centerY-127,'Unity12_3_2threeGlow');
                            this.SmallEgg2_Glow_three.anchor.setTo(0.5);
                            this.SmallEgg2_Glow_three.scale.setTo(0.9,0.9);
                            this.SmallEgg2_Glow_three.frame = 1;
                            this.SmallEgg2_Glow_three.name = "SmallEgg1_Glow_three";
                            this.SmallEgg2_Glow_three.animations.add('walk');                   
                            this.SmallEgg2_Glow_three.play('walk',3,true);

                            this.SmallEgg1_4 = game.add.sprite(game.world.centerX-301,game.world.centerY-126,'Unity12_3_2SmallEgg');
                            this.SmallEgg1_4.anchor.setTo(0.5);
                            this.SmallEgg1_4.scale.setTo(0.9,0.9);
                            this.SmallEgg1_4.name = "SmallEgg1_1";

                            this.SmallEgg1_5 = game.add.sprite(game.world.centerX-268,game.world.centerY-126,'Unity12_3_2SmallEgg');
                            this.SmallEgg1_5.anchor.setTo(0.5);
                            this.SmallEgg1_5.scale.setTo(0.9,0.9);
                            this.SmallEgg1_5.name = "SmallEgg1_2";

                            this.SmallEgg1_6 = game.add.sprite(game.world.centerX-233,game.world.centerY-126,'Unity12_3_2SmallEgg');
                            this.SmallEgg1_6.anchor.setTo(0.5);
                            this.SmallEgg1_6.scale.setTo(0.9,0.9);
                            this.SmallEgg1_6.name = "SmallEgg1_3";

                            this.SmallEgg3_Glow_three = game.add.sprite(game.world.centerX-268,game.world.centerY-93,'Unity12_3_2threeGlow');
                            this.SmallEgg3_Glow_three.anchor.setTo(0.5);
                            this.SmallEgg3_Glow_three.scale.setTo(0.9,0.9);
                            this.SmallEgg3_Glow_three.frame = 1;
                            this.SmallEgg3_Glow_three.name = "SmallEgg1_Glow_three";
                            this.SmallEgg3_Glow_three.animations.add('walk');                   
                            this.SmallEgg3_Glow_three.play('walk',3,true);

                            this.SmallEgg1_7 = game.add.sprite(game.world.centerX-301,game.world.centerY-92,'Unity12_3_2SmallEgg');
                            this.SmallEgg1_7.anchor.setTo(0.5);
                            this.SmallEgg1_7.scale.setTo(0.9,0.9);
                            this.SmallEgg1_7.name = "SmallEgg1_1";

                            this.SmallEgg1_8 = game.add.sprite(game.world.centerX-268,game.world.centerY-92,'Unity12_3_2SmallEgg');
                            this.SmallEgg1_8.anchor.setTo(0.5);
                            this.SmallEgg1_8.scale.setTo(0.9,0.9);
                            this.SmallEgg1_8.name = "SmallEgg1_2";

                            this.SmallEgg1_9 = game.add.sprite(game.world.centerX-233,game.world.centerY-92,'Unity12_3_2SmallEgg');
                            this.SmallEgg1_9.anchor.setTo(0.5);
                            this.SmallEgg1_9.scale.setTo(0.9,0.9);
                            this.SmallEgg1_9.name = "SmallEgg1_3";

                            this.SmallEgg4_Glow_three = game.add.sprite(game.world.centerX-268,game.world.centerY-59,'Unity12_3_2threeGlow');
                            this.SmallEgg4_Glow_three.anchor.setTo(0.5);
                            this.SmallEgg4_Glow_three.scale.setTo(0.9,0.9);
                            this.SmallEgg4_Glow_three.frame = 1;
                            this.SmallEgg4_Glow_three.name = "SmallEgg1_Glow_three";
                            this.SmallEgg4_Glow_three.animations.add('walk');                   
                            this.SmallEgg4_Glow_three.play('walk',3,true);

                            this.SmallEgg1_10 = game.add.sprite(game.world.centerX-301,game.world.centerY-59,'Unity12_3_2SmallEgg');
                            this.SmallEgg1_10.anchor.setTo(0.5);
                            this.SmallEgg1_10.scale.setTo(0.9,0.9);
                            this.SmallEgg1_10.name = "SmallEgg1_1";

                            this.SmallEgg1_11 = game.add.sprite(game.world.centerX-268,game.world.centerY-59,'Unity12_3_2SmallEgg');
                            this.SmallEgg1_11.anchor.setTo(0.5);
                            this.SmallEgg1_11.scale.setTo(0.9,0.9);
                            this.SmallEgg1_11.name = "SmallEgg1_2";

                            this.SmallEgg1_12 = game.add.sprite(game.world.centerX-233,game.world.centerY-59,'Unity12_3_2SmallEgg');
                            this.SmallEgg1_12.anchor.setTo(0.5);
                            this.SmallEgg1_12.scale.setTo(0.9,0.9);
                            this.SmallEgg1_12.name = "SmallEgg1_3";
                            //========================================================================================

                            //Numbers (3x1,3x2,3x3..) for each row of egg crate in the left side====================
                            this.FirstNumbers1 = game.add.sprite(game.world.centerX-390,game.world.centerY-160,'Unity12_3_2greenNumbers');
                            this.FirstNumbers1.name="FirstNumbers";
                            this.FirstNumbers1.anchor.setTo(0.5);
                            this.FirstNumbers1.scale.setTo(0.5);
                            this.FirstNumbers1.visible = false;
                            this.FirstNumbers1.frame=2;

                            this.SecondNumbers1 = game.add.sprite(game.world.centerX-353,game.world.centerY-160,'Unity12_3_2greenNumbers');
                            this.SecondNumbers1.name="SecondNumbers";
                            this.SecondNumbers1.scale.setTo(0.5);
                            this.SecondNumbers1.anchor.setTo(0.5);
                            this.SecondNumbers1.frame=0;
                            this.SecondNumbers1.visible=false;

                            this.Multiplicationsign1=game.add.sprite(game.world.centerX-370,game.world.centerY-160,'Unity12_3_2Multiplicationsign');
                            this.Multiplicationsign1.name="Unity12_3_2Multiplicationsign";
                            this.Multiplicationsign1.scale.setTo(0.5);
                            this.Multiplicationsign1.anchor.setTo(0.5);
                            this.Multiplicationsign1.visible=false;

                            this.FirstNumbers2 = game.add.sprite(game.world.centerX-390,game.world.centerY-128,'Unity12_3_2greenNumbers');
                            this.FirstNumbers2.name="FirstNumbers";
                            this.FirstNumbers2.anchor.setTo(0.5);
                            this.FirstNumbers2.scale.setTo(0.5);
                            this.FirstNumbers2.visible = false;
                            this.FirstNumbers2.frame=2;

                            this.SecondNumbers2 = game.add.sprite(game.world.centerX-353,game.world.centerY-128,'Unity12_3_2greenNumbers');
                            this.SecondNumbers2.name="SecondNumbers";
                            this.SecondNumbers2.scale.setTo(0.5);
                            this.SecondNumbers2.anchor.setTo(0.5);
                            this.SecondNumbers2.frame=1;
                            this.SecondNumbers2.visible=false;

                            this.Multiplicationsign2=game.add.sprite(game.world.centerX-370,game.world.centerY-128,'Unity12_3_2Multiplicationsign');
                            this.Multiplicationsign2.name="Unity12_3_2Multiplicationsign";
                            this.Multiplicationsign2.scale.setTo(0.5);
                            this.Multiplicationsign2.anchor.setTo(0.5);
                            this.Multiplicationsign2.visible=false;

                            this.FirstNumbers3 = game.add.sprite(game.world.centerX-390,game.world.centerY-96,'Unity12_3_2greenNumbers');
                            this.FirstNumbers3.name="FirstNumbers";
                            this.FirstNumbers3.anchor.setTo(0.5);
                            this.FirstNumbers3.scale.setTo(0.5);
                            this.FirstNumbers3.visible = false;
                            this.FirstNumbers3.frame=2;

                            this.SecondNumbers3 = game.add.sprite(game.world.centerX-353,game.world.centerY-96,'Unity12_3_2greenNumbers');
                            this.SecondNumbers3.name="SecondNumbers";
                            this.SecondNumbers3.scale.setTo(0.5);
                            this.SecondNumbers3.anchor.setTo(0.5);
                            this.SecondNumbers3.frame=2;
                            this.SecondNumbers3.visible=false;

                            this.Multiplicationsign3=game.add.sprite(game.world.centerX-370,game.world.centerY-96,'Unity12_3_2Multiplicationsign');
                            this.Multiplicationsign3.name="Unity12_3_2Multiplicationsign";
                            this.Multiplicationsign3.scale.setTo(0.5);
                            this.Multiplicationsign3.anchor.setTo(0.5);
                            this.Multiplicationsign3.visible=false;

                            this.FirstNumbers4 = game.add.sprite(game.world.centerX-390,game.world.centerY-64,'Unity12_3_2greenNumbers');
                            this.FirstNumbers4.name="FirstNumbers";
                            this.FirstNumbers4.anchor.setTo(0.5);
                            this.FirstNumbers4.scale.setTo(0.5);
                            this.FirstNumbers4.visible = false;
                            this.FirstNumbers4.frame=2;

                            this.SecondNumbers4 = game.add.sprite(game.world.centerX-353,game.world.centerY-64,'Unity12_3_2greenNumbers');
                            this.SecondNumbers4.name="SecondNumbers";
                            this.SecondNumbers4.scale.setTo(0.5);
                            this.SecondNumbers4.anchor.setTo(0.5);
                            this.SecondNumbers4.frame=3;
                            this.SecondNumbers4.visible=false;

                            this.Multiplicationsign4=game.add.sprite(game.world.centerX-370,game.world.centerY-64,'Unity12_3_2Multiplicationsign');
                            this.Multiplicationsign4.name="Unity12_3_2Multiplicationsign";
                            this.Multiplicationsign4.scale.setTo(0.5);
                            this.Multiplicationsign4.anchor.setTo(0.5);
                            this.Multiplicationsign4.visible=false;

                            //========================================================================================


                            //Hand hint icon=============================================================================
                            this.handhint3 = game.add.sprite(250,450,'hand');
                            this.handhint3.scale.setTo(0.65,0.65);

                            //hand hint icon animated to move each row
                            this.HintRepeatFn3M(game);

                            //Calculator number pad in the right side
                            this.Numberbox= game.add.sprite(game.world.centerX+200,game.world.centerY-15,'calculator');
                            this.Numberbox.anchor.setTo(0.5)
                            this.Numberbox.scale.setTo(0.6,0.66);

                            this.closepopupMNew(game);

                        }
                        else if( hintparams[1]=="level3"){

                            this.tempVar = hintparams[1];

                            this.background = game.add.sprite(10,10,'Unity12_3_2BG_01');

                            this.popupbg = game.add.sprite(0,0,'popupbgEmpty1');

                            //Hint 1 icon in Hint screen  
                            this.popuphint = game.add.sprite(5,5,'popuphint');
                            this.popuphint.scale.setTo(0.8);
                            this.popuphint.frame=3;

                            //Grid
                            this.grid = game.add.sprite(game.world.centerX,game.world.centerY+10,'Level13_Hintgrid');
                            this.grid.scale.setTo(1);
                            this.grid.anchor.setTo(0.5);


                            //Hand hint icon=============================================================================
                            this.handhint4 = game.add.sprite(350,350,'hand');
                            this.handhint4.scale.setTo(0.65,0.65);

                            //hand hint icon animated to move each row

                            this.HintRepeatFn4M(game);

                            //===============================================================================================
                            this.closepopupMNew(game);
                        }
                    }
                    break;

                case 'NOMG5.3': if(this.hintflag==3){
                                    if(hintparams[1]=="level1"){
                                      this.backgroundtransp.visible=true;
                                      this.bg = game.add.sprite(0,0,'bg');

                                      this.popupbg = game.add.sprite(0,0,'popupbgEmpty1');
                                    
                                      this.closebtn = game.add.sprite(910,20,'closebtn');
                                      this.closebtn.scale.setTo(0.8,0.8);
                                        
                                      this.popuphint = game.add.sprite(5,5,'popuphint');
                                      this.popuphint.scale.setTo(0.8);
                                      this.popuphint.frame=3;
                                        
                                      this.cubeGrp = game.add.group();
                                        
                                      this.boxnum = game.add.sprite(275,58,'boxnum');
                                      this.boxnum.scale.setTo(1.1,1.1);  
                                        
                                      this.greencubeset = game.add.sprite(300,80,'Level14_greencubeset');
                                      this.greencubeset.scale.setTo(1.2,1.2);
                                        
                                      this.bluecubeset1 = game.add.sprite(300,285,'Level14_gridh');
                                      this.bluecubeset1.scale.setTo(1.2,1.2);
                                        
                                      this.bluecubeset2 = game.add.sprite(300,302,'Level14_gridh');
                                      this.bluecubeset2.scale.setTo(1.2,1.2);
                                        
                                      this.bluecubeset3 = game.add.sprite(300,319,'Level14_gridh');
                                      this.bluecubeset3.scale.setTo(1.2,1.2);
                                        
                                      this.bluecubeset4 = game.add.sprite(300,335,'Level14_gridh');
                                      this.bluecubeset4.scale.setTo(1.2,1.2);
                                        
                                      this.yellowcube1 = game.add.sprite(445,378,'Level14_yellowgrid');
                                      this.yellowcube1.scale.setTo(1.1,1.1);
                                         
                                      this.yellowcube2 = game.add.sprite(427,378,'Level14_yellowgrid');
                                      this.yellowcube2.scale.setTo(1.1,1.1);
                                        
                                      this.yellowcube3 = game.add.sprite(409,378,'Level14_yellowgrid');
                                      this.yellowcube3.scale.setTo(1.1,1.1);
                                        
                                      this.yellowcube4 = game.add.sprite(390,378,'Level14_yellowgrid');
                                      this.yellowcube4.scale.setTo(1.1,1.1);
                                        
                                      this.yellowcube5 = game.add.sprite(372,378,'Level14_yellowgrid');
                                      this.yellowcube5.scale.setTo(1.1,1.1);
                                        
                                      this.cal1 = game.add.sprite(500,210,'cal1');
                                      this.cal1.scale.setTo(1,1); 
                                        
                                      this.cal2 = game.add.sprite(510,310,'cal2');
                                      this.cal2.scale.setTo(1,1); 
                                        
                                      this.cal3 = game.add.sprite(528,375,'cal3');
                                      this.cal3.scale.setTo(1,1); 
                                        
                                      this.cal4 = game.add.sprite(618,430,'cal4');
                                      this.cal4.scale.setTo(1,1); 
                                        
                                      this.cubeGrp.add(this.boxnum);
                                      this.cubeGrp.add(this.greencubeset);
                                      this.cubeGrp.add(this.bluecubeset1);
                                      this.cubeGrp.add(this.bluecubeset2);
                                      this.cubeGrp.add(this.bluecubeset3);
                                      this.cubeGrp.add(this.bluecubeset4);
                                      this.cubeGrp.add(this.yellowcube1);
                                      this.cubeGrp.add(this.yellowcube2);
                                      this.cubeGrp.add(this.yellowcube3);
                                      this.cubeGrp.add(this.yellowcube4);
                                      this.cubeGrp.add(this.yellowcube5);
                                      this.cubeGrp.add(this.cal1);
                                      this.cubeGrp.add(this.cal2);
                                      this.cubeGrp.add(this.cal3);
                                      this.cubeGrp.add(this.cal4);
                                        
                                       this.closepopup19();
                                    }
                   // break;
                }
                    if(this.hintflag==3){
                           if(hintparams[1]=="level2")
                        {
                                      this.backgroundtransp.visible=true;
                                      this.bg = game.add.sprite(0,0,'bg');

                                      this.popupbg = game.add.sprite(0,0,'popupbgEmpty1');
                                    
                                      this.closebtn = game.add.sprite(910,20,'closebtn');
                                      this.closebtn.scale.setTo(0.8,0.8);
                                        
                                      this.popuphint = game.add.sprite(5,5,'popuphint');
                                      this.popuphint.scale.setTo(0.8);
                                      this.popuphint.frame=3;
                                        
                                      this.cubeGrp = game.add.group();
                                        
                                      this.boxnum = game.add.sprite(275,58,'boxnum');
                                      this.boxnum.scale.setTo(1.1,1.1);  
                                        
                                      this.greencubeset = game.add.sprite(300,80,'Level14_greencubeset');
                                      this.greencubeset.scale.setTo(1.2,1.2);
                                        
                                      this.bluecubeset1 = game.add.sprite(300,285,'Level14_gridh');
                                      this.bluecubeset1.scale.setTo(1.2,1.2);
                                        
                                      this.bluecubeset2 = game.add.sprite(300,302,'Level14_gridh');
                                      this.bluecubeset2.scale.setTo(1.2,1.2);
                                        
                                      this.bluecubeset3 = game.add.sprite(300,319,'Level14_gridh');
                                      this.bluecubeset3.scale.setTo(1.2,1.2);
                                        
                                      this.bluecubeset4 = game.add.sprite(300,335,'Level14_gridh');
                                      this.bluecubeset4.scale.setTo(1.2,1.2);
                                        
                                      this.yellowcube1 = game.add.sprite(445,378,'Level14_yellowgrid');
                                      this.yellowcube1.scale.setTo(1.1,1.1);
                                         
                                      this.yellowcube2 = game.add.sprite(427,378,'Level14_yellowgrid');
                                      this.yellowcube2.scale.setTo(1.1,1.1);
                                        
                                      this.yellowcube3 = game.add.sprite(409,378,'Level14_yellowgrid');
                                      this.yellowcube3.scale.setTo(1.1,1.1);
                                        
                                      this.yellowcube4 = game.add.sprite(390,378,'Level14_yellowgrid');
                                      this.yellowcube4.scale.setTo(1.1,1.1);
                                        
                                      this.yellowcube5 = game.add.sprite(372,378,'Level14_yellowgrid');
                                      this.yellowcube5.scale.setTo(1.1,1.1);
                                        
                                      this.cal1 = game.add.sprite(500,210,'cal1');
                                      this.cal1.scale.setTo(1,1); 
                                        
                                      this.cal2 = game.add.sprite(510,310,'cal2');
                                      this.cal2.scale.setTo(1,1); 
                                        
                                      this.cal3 = game.add.sprite(528,375,'cal3');
                                      this.cal3.scale.setTo(1,1); 
                                        
                                      this.cal4 = game.add.sprite(618,430,'cal4');
                                      this.cal4.scale.setTo(1,1); 
                                        
                                      this.cubeGrp.add(this.boxnum);
                                      this.cubeGrp.add(this.greencubeset);
                                      this.cubeGrp.add(this.bluecubeset1);
                                      this.cubeGrp.add(this.bluecubeset2);
                                      this.cubeGrp.add(this.bluecubeset3);
                                      this.cubeGrp.add(this.bluecubeset4);
                                      this.cubeGrp.add(this.yellowcube1);
                                      this.cubeGrp.add(this.yellowcube2);
                                      this.cubeGrp.add(this.yellowcube3);
                                      this.cubeGrp.add(this.yellowcube4);
                                      this.cubeGrp.add(this.yellowcube5);
                                      this.cubeGrp.add(this.cal1);
                                      this.cubeGrp.add(this.cal2);
                                      this.cubeGrp.add(this.cal3);
                                      this.cubeGrp.add(this.cal4);
                                        
                                       this.closepopup19();
                        }
                    }
                    break;
            }
        }
    },

    closepopup19:function(game){
        //this.closebtn = game.add.sprite(745,100,'closebtn');
       // this.closebtn.scale.setTo(0.60,0.60);  
        this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        this.closebtn.events.onInputDown.add(function(){
            
    
            if(this.closebtn)
            this.closebtn.visible=false;
            if(this.popupbg)
            this.popupbg.visible=false;
            if(this.popuphint)
            this.popuphint.visible=false;
            if(this.bg)
            this.bg.visible=false;
            if(this.backgroundtransp)
            this.backgroundtransp.visible=false;
            if(this.cubeGrp)
            this.cubeGrp.visible=false;
              this.hintIcon.inputEnabled = true;
        },this);
     
    },

    HintRepeatFn1M:function(game){
        game.time.events.add(500,function(){
            this.tween1 = game.add.tween(this.handhint).to({y:100},1000,'Linear',true,0);
            this.tween1.onComplete.add(function(){
                this.handhint.y=100;
                game.time.events.add(1000,function(){
                    this.handhint.y=135;
                    game.time.events.add(1000,function(){
                        this.handhint.y=170;
                        game.time.events.add(1000,function(){
                            this.handhint.y=205;
                            game.time.events.add(1000,function(){
                                this.HintRepeatFn1M(game);
                            },this);
                        },this);
                    },this);
                },this);    
            },this);
        },this);
    },

    HintRepeatFn2M:function(game){
        game.time.events.add(500,function(){
            this.tween1 = game.add.tween(this.handhint2).to({y:100},1000,'Linear',true,0);
            this.tween1.onComplete.add(function(){
                this.handhint2.y=100;
                game.time.events.add(1000,function(){
                    this.handhint2.y=135;
                    game.time.events.add(1000,function(){
                        this.handhint2.y=170;
                        game.time.events.add(1000,function(){
                            this.handhint2.y=205;
                            game.time.events.add(1000,function(){
                                this.HintRepeatFn2M(game);
                            },this);
                        },this);
                    },this);
                },this);    
            },this);
        },this);
    },

    HintRepeatFn3M:function(game){
        this.FirstNumbers1.visible = false;
        this.SecondNumbers1.visible = false;
        this.Multiplicationsign1.visible = false;

        this.FirstNumbers2.visible = false;
        this.SecondNumbers2.visible = false;
        this.Multiplicationsign2.visible = false;

        this.FirstNumbers3.visible = false;
        this.SecondNumbers3.visible = false;
        this.Multiplicationsign3.visible = false;

        this.FirstNumbers4.visible = false;
        this.SecondNumbers4.visible = false;
        this.Multiplicationsign4.visible = false;

        game.time.events.add(500,function(){
            this.tween1 = game.add.tween(this.handhint3).to({y:100},1000,'Linear',true,0);
            this.tween1.onComplete.add(function(){
                this.handhint3.y=100;
                this.FirstNumbers1.visible = true;
                this.SecondNumbers1.visible = true;
                this.Multiplicationsign1.visible = true;

                game.time.events.add(1000,function(){
                    this.handhint3.y=135;
                    this.FirstNumbers2.visible = true;
                    this.SecondNumbers2.visible = true;
                    this.Multiplicationsign2.visible = true;
                    game.time.events.add(1000,function(){
                        this.handhint3.y=170;
                        this.FirstNumbers3.visible = true;
                        this.SecondNumbers3.visible = true;
                        this.Multiplicationsign3.visible = true;
                        game.time.events.add(1000,function(){
                            this.handhint3.y=205;
                            this.FirstNumbers4.visible = true;
                            this.SecondNumbers4.visible = true;
                            this.Multiplicationsign4.visible = true;
                            game.time.events.add(1000,function(){
                                this.HintRepeatFn3M(game);
                            },this);
                        },this);
                    },this);
                },this);    
            },this);
        },this);
    },

    HintRepeatFn4M:function(game){
        game.time.events.add(500,function(){
            this.tween1 = game.add.tween(this.handhint4).to({x:550,y:198},1500,'Linear',true,0);
            this.tween1.onComplete.add(function(){
                game.time.events.add(500,function(){
                    this.tween2 = game.add.tween(this.handhint4).to({x:350,y:350},1500,'Linear',true,0);
                    this.tween2.onComplete.add(function(){
                        this.HintRepeatFn4M(game);
                    },this);
                },this);
            },this);
        },this);
    },

    closepopupMNew:function(game){
        this.closebtn = game.add.sprite(910,20,'closebtn');
        this.closebtn.scale.setTo(0.8,0.8);
        this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        console.log("Ok level 222");
        this.closebtn.events.onInputDown.add(function(){
            this.closebtn.visible=false;

            if(this.hintflag == 1) {
                this.popuphint.destroy();  
                this.popupbg.destroy();
                this.background.visible=false;
                this.Eggbox.visible=false;
                this.handhint.destroy();

                this.SmallEgg1.destroy();
                this.SmallEgg2.destroy();
                this.SmallEgg3.destroy();

                this.Numberbox.destroy();

                if(this.tempVar=="level1" || this.tempVar=="level2"){
                    this.tick.inputEnabled = true;
                    this.eraser.inputEnabled = true;
                    this.calNum0.inputEnabled = true;
                    this.calNum1.inputEnabled = true;
                    this.calNum2.inputEnabled = true;
                    this.calNum3.inputEnabled = true;
                    this.calNum4.inputEnabled = true;
                    this.calNum5.inputEnabled = true;
                    this.calNum6.inputEnabled = true;
                    this.calNum7.inputEnabled = true;
                    this.calNum8.inputEnabled = true;
                    this.calNum9.inputEnabled = true;
                }

            }else if(this.hintflag == 2) {
                this.popuphint.destroy();  
                this.popupbg.destroy();
                this.background.visible=false;
                this.Eggbox.visible=false;
                this.handhint2.destroy();

                this.SmallEgg1.destroy();
                this.SmallEgg2.destroy();
                this.SmallEgg3.destroy();

                this.Numberbox.destroy();

                this.SmallEgg1_Glow_three.destroy();
                this.SmallEgg2_Glow_three.destroy();
                this.SmallEgg3_Glow_three.destroy();
                this.SmallEgg4_Glow_three.destroy();

                if(this.tempVar=="level1" || this.tempVar=="level2"){

                    this.tick.inputEnabled = true;
                    this.eraser.inputEnabled = true;
                    this.calNum0.inputEnabled = true;
                    this.calNum1.inputEnabled = true;
                    this.calNum2.inputEnabled = true;
                    this.calNum3.inputEnabled = true;
                    this.calNum4.inputEnabled = true;
                    this.calNum5.inputEnabled = true;
                    this.calNum6.inputEnabled = true;
                    this.calNum7.inputEnabled = true;
                    this.calNum8.inputEnabled = true;
                    this.calNum9.inputEnabled = true;
                }

            }else if(this.hintflag == 3 ){
                this.popuphint.destroy();
                this.popupbg.destroy();
                this.background.visible=false;

                if(this.tempVar == "level1" || this.tempVar=="level2"){
                    this.handhint3.destroy();
                    this.Eggbox.visible=false;
                    this.tick.inputEnabled = true;
                    this.eraser.inputEnabled = true;
                    this.calNum0.inputEnabled = true;
                    this.calNum1.inputEnabled = true;
                    this.calNum2.inputEnabled = true;
                    this.calNum3.inputEnabled = true;
                    this.calNum4.inputEnabled = true;
                    this.calNum5.inputEnabled = true;
                    this.calNum6.inputEnabled = true;
                    this.calNum7.inputEnabled = true;
                    this.calNum8.inputEnabled = true;
                    this.calNum9.inputEnabled = true;

                    this.SmallEgg1_1.visible=false;
                    this.SmallEgg1_2.visible=false;
                    this.SmallEgg1_3.visible=false;
                    this.SmallEgg1_4.visible=false;
                    this.SmallEgg1_5.visible=false;

                    this.SmallEgg1_6.visible=false;
                    this.SmallEgg1_7.visible=false;
                    this.SmallEgg1_8.visible=false;
                    this.SmallEgg1_9.visible=false;
                    this.SmallEgg1_10.visible=false;
                    this.SmallEgg1_11.visible=false;
                    this.SmallEgg1_12.visible=false;

                    this.SmallEgg1_Glow_three.destroy();
                    this.SmallEgg2_Glow_three.destroy();
                    this.SmallEgg3_Glow_three.destroy();
                    this.SmallEgg4_Glow_three.destroy();

                    this.SmallEgg1_Hint3.destroy();
                    this.SmallEgg2_Hint3.destroy();
                    this.SmallEgg3_Hint3.destroy();

                    this.Numberbox.destroy();

                    this.FirstNumbers1.destroy();
                    this.SecondNumbers1.destroy();
                    this.Multiplicationsign1.destroy();

                    this.FirstNumbers2.destroy();
                    this.SecondNumbers2.destroy();
                    this.Multiplicationsign2.destroy();

                    this.FirstNumbers3.destroy();
                    this.SecondNumbers3.destroy();
                    this.Multiplicationsign3.destroy();

                    this.FirstNumbers4.destroy();
                    this.SecondNumbers4.destroy();
                    this.Multiplicationsign4.destroy();

                }else{
                    this.handhint4.destroy();
                    this.grid.destroy();
                }

            }

            this.hintIcon.inputEnabled = true;

            this.backgroundtransp.visible=false;
            console.log("Ok1");

        },this);
    },

     HintRepeatFn:function(game){
        game.time.events.add(500,function(){
            this.tween1 = game.add.tween(this.handhint).to({y:100},1000,'Linear',true,0);
            this.tween1.onComplete.add(function(){
                this.handhint.y=100;
                game.time.events.add(1000,function(){
                    this.handhint.y=135;
                    game.time.events.add(1000,function(){
                        this.handhint.y=170;
                        game.time.events.add(1000,function(){
                            this.handhint.y=205;
                            game.time.events.add(1000,function(){
                                this.HintRepeatFn(game);
                            },this);
                        },this);
                    },this);
                },this);    
            },this);
        },this);
    },
    
    HintRepeatFn3:function(game){

        game.time.events.add(500,function(){
            this.tween1 = game.add.tween(this.handhint3).to({x:325,y:100},1000,'Linear',true,0);
            this.tween1.onComplete.add(function(){
                this.handhint3.y=100;

                game.time.events.add(1000,function(){
                    this.handhint3.y=135;
                
                    game.time.events.add(1000,function(){
                        this.handhint3.y=170;
                       
                        game.time.events.add(1000,function(){
                            this.handhint3.y=205;
                           
                            game.time.events.add(1000,function(){
                                this.handhint3.y=240;
                                
                                game.time.events.add(1000,function(){
                                    this.HintRepeatFn3(game);
                                },this);
                            },this);
                        },this);
                    },this);
                },this);    
            },this);
        },this);
    },
    
    HintRepeatFn2:function(game){
        this.FirstNumbers1.visible = false;
        this.SecondNumbers1.visible = false;
        this.Multiplicationsign1.visible = false;

        this.FirstNumbers2.visible = false;
        this.SecondNumbers2.visible = false;
        this.Multiplicationsign2.visible = false;

        this.FirstNumbers3.visible = false;
        this.SecondNumbers3.visible = false;
        this.Multiplicationsign3.visible = false;

        this.FirstNumbers4.visible = false;
        this.SecondNumbers4.visible = false;
        this.Multiplicationsign4.visible = false;

        game.time.events.add(500,function(){
            this.tween1 = game.add.tween(this.handhint2).to({y:100},1000,'Linear',true,0);
            this.tween1.onComplete.add(function(){
                this.handhint2.y=100;
                this.FirstNumbers1.visible = true;
                this.SecondNumbers1.visible = true;
                this.Multiplicationsign1.visible = true;

                game.time.events.add(1000,function(){
                    this.handhint2.y=135;
                    this.FirstNumbers2.visible = true;
                    this.SecondNumbers2.visible = true;
                    this.Multiplicationsign2.visible = true;
                    game.time.events.add(1000,function(){
                        this.handhint2.y=170;
                        this.FirstNumbers3.visible = true;
                        this.SecondNumbers3.visible = true;
                        this.Multiplicationsign3.visible = true;
                        game.time.events.add(1000,function(){
                            this.handhint2.y=205;
                            this.FirstNumbers4.visible = true;
                            this.SecondNumbers4.visible = true;
                            this.Multiplicationsign4.visible = true;
                            game.time.events.add(1000,function(){
                                this.HintRepeatFn2(game);
                            },this);
                        },this);
                    },this);
                },this);    
            },this);
        },this);
    },
    
    closepopupM2:function(game){
        this.closebtn = game.add.sprite(910,20,'closebtn');
        this.closebtn.scale.setTo(0.8,0.8);
        this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        console.log("Ok level 222");
        this.closebtn.events.onInputDown.add(function(){
            this.closebtn.visible=false;

            if(this.hintflag == 2) {
                this.popuphint.destroy();  
                this.popupbg.destroy();
                this.background.visible=false;
                this.Eggbox.visible=false;
                
                this.SmallEgg1.destroy();
                this.SmallEgg2.destroy();
                this.SmallEgg3.destroy();
               
                this.SmallEgg1_Glow_three.destroy();
                this.SmallEgg2_Glow_three.destroy();
                this.SmallEgg3_Glow_three.destroy();
                this.SmallEgg4_Glow_three.destroy();
                
                this.Numberbox.destroy();

                this.handhint.destroy();
                
                if(this.tempVar=="level1"){

                    this.tick.inputEnabled = true;
                    this.eraser.inputEnabled = true;
                    this.calNum0.inputEnabled = true;
                    this.calNum1.inputEnabled = true;
                    this.calNum2.inputEnabled = true;
                    this.calNum3.inputEnabled = true;
                    this.calNum4.inputEnabled = true;
                    this.calNum5.inputEnabled = true;
                    this.calNum6.inputEnabled = true;
                    this.calNum7.inputEnabled = true;
                    this.calNum8.inputEnabled = true;
                    this.calNum9.inputEnabled = true;
                }
            }
            else if(this.hintflag == 3 ){
                this.popuphint.destroy();
                this.popupbg.destroy();
                this.background.visible=false;
                this.Eggbox.visible=false;
                
                if(this.tempVar == "level1"){
                    this.tick.inputEnabled = true;
                    this.eraser.inputEnabled = true;
                    this.calNum0.inputEnabled = true;
                    this.calNum1.inputEnabled = true;
                    this.calNum2.inputEnabled = true;
                    this.calNum3.inputEnabled = true;
                    this.calNum4.inputEnabled = true;
                    this.calNum5.inputEnabled = true;
                    this.calNum6.inputEnabled = true;
                    this.calNum7.inputEnabled = true;
                    this.calNum8.inputEnabled = true;
                    this.calNum9.inputEnabled = true;

                    this.SmallEgg1_1.visible=false;
                    this.SmallEgg1_2.visible=false;
                    this.SmallEgg1_3.visible=false;
                    this.SmallEgg1_4.visible=false;
                    this.SmallEgg1_5.visible=false;

                    this.SmallEgg1_6.visible=false;
                    this.SmallEgg1_7.visible=false;
                    this.SmallEgg1_8.visible=false;
                    this.SmallEgg1_9.visible=false;
                    this.SmallEgg1_10.visible=false;
                    this.SmallEgg1_11.visible=false;
                    this.SmallEgg1_12.visible=false;

                    this.SmallEgg1_Glow_three.destroy();
                    this.SmallEgg2_Glow_three.destroy();
                    this.SmallEgg3_Glow_three.destroy();
                    this.SmallEgg4_Glow_three.destroy();
                    
                    this.SmallEgg1_Hint3.destroy();
                    this.SmallEgg2_Hint3.destroy();
                    this.SmallEgg3_Hint3.destroy();

                    this.FirstNumbers1.destroy();
                    this.SecondNumbers1.destroy();
                    this.Multiplicationsign1.destroy();

                    this.FirstNumbers2.destroy();
                    this.SecondNumbers2.destroy();
                    this.Multiplicationsign2.destroy();

                    this.FirstNumbers3.destroy();
                    this.SecondNumbers3.destroy();
                    this.Multiplicationsign3.destroy();

                    this.FirstNumbers4.destroy();
                    this.SecondNumbers4.destroy();
                    this.Multiplicationsign4.destroy();
                    
                    this.handhint2.destroy();
                    this.Numberbox.destroy();
                }else{

                    for(var i=1;i<this.NumberArr.length;i++){
                        this.NumberArr[i].inputEnabled = true;
                        this.NumberArr[i].input.useHandCursor = true;
                    }

                    this.SmallEgg1_Hint3.destroy();
                    this.SmallEgg2_Hint3.destroy();
                    this.SmallEgg3_Hint3.destroy();
                    this.SmallEgg4_Hint3.destroy();
                    this.SmallEgg5_Hint3.destroy();
                    
                    this.SmallEgg1_1.visible=false;
                    this.SmallEgg1_2.visible=false;
                    this.SmallEgg1_3.visible=false;
                    this.SmallEgg1_4.visible=false;
                    this.SmallEgg1_5.visible=false;

                    this.SmallEgg1_Glow_five.destroy();
                    this.SmallEgg2_Glow_five.destroy();
                    this.SmallEgg3_Glow_five.destroy();
                    this.SmallEgg4_Glow_five.destroy();
                    this.SmallEgg5_Glow_five.destroy();

                    this.SmallEgg2_1.visible=false;
                    this.SmallEgg2_2.visible=false;
                    this.SmallEgg2_3.visible=false;
                    this.SmallEgg2_4.visible=false;
                    this.SmallEgg2_5.visible=false;

                    this.SmallEgg3_1.visible=false;
                    this.SmallEgg3_2.visible=false;
                    this.SmallEgg3_3.visible=false;
                    this.SmallEgg3_4.visible=false;
                    this.SmallEgg3_5.visible=false;

                    this.SmallEgg4_1.visible=false;
                    this.SmallEgg4_2.visible=false;
                    this.SmallEgg4_3.visible=false;
                    this.SmallEgg4_4.visible=false;
                    this.SmallEgg4_5.visible=false;

                    this.SmallEgg5_1.visible=false;
                    this.SmallEgg5_2.visible=false;
                    this.SmallEgg5_3.visible=false;
                    this.SmallEgg5_4.visible=false;
                    this.SmallEgg5_5.visible=false;

                    this.Numberbox.destroy();
                    
                    this.handhint3.destroy();

                }

            }
            this.hintIcon.inputEnabled = true;

            this.backgroundtransp.visible=false;
            console.log("Ok1");

        },this);
    },

    subfuncM1:function(game){
       this.close=0;
       this.popuphint = game.add.sprite(5,5,'popuphint');
       this.popuphint.scale.setTo(0.8);
       this.popuphint.frame=1;
       this.closebtn = game.add.sprite(910,20,'closebtn');
       this.closebtn.scale.setTo(0.8,0.8);                  
        this.mainfuncM1(game);
    },
    
    subfuncM2:function(game){
       this.close=0;
       this.popuphint = game.add.sprite(5,5,'popuphint');
       this.popuphint.scale.setTo(0.8);
       this.popuphint.frame=2;
       this.closebtn = game.add.sprite(910,20,'closebtn');
       this.closebtn.scale.setTo(0.8,0.8);                     
       this.mainfuncM2(game);
    },
    
     subfuncM3:function(game){
        this.close2=0;
       this.popuphint = game.add.sprite(5,5,'popuphint');
       this.popuphint.scale.setTo(0.8);
       this.popuphint.frame=3;
       this.closebtn = game.add.sprite(910,20,'closebtn');
       this.closebtn.scale.setTo(0.8,0.8);                      
        this.mainfuncM3(game);
    },

    mainfuncM1:function(game){
        this.closepopupM(game);
      
                                        
                                        this.handhint = game.add.sprite(420,450,'handanim');
                                        this.handhint.scale.setTo(0.65,0.65);
                                
                                  game.time.events.add(500,function(){
                                 _this.tween1 = game.add.tween(this.handhint).to({y:90},2000,'Linear',true,0);
                                 _this.tween1.onComplete.add(function(){                        
                                       game.time.events.add(500,function(){
                                                                   
                                             this.handhint.visible=false;
                                                                    
                                                 game.time.events.add(1000,function(){
                                                                        if(this.close==0){
                                                                            this.mainfuncM1(game);
                                                                        }else{
                                                                            this.hintflag=0;
                                                                            this.closepopupM(game);
                                                                        }
                                                                                
                                                                },this);
                                                    },this);
                                                },this);
                                            },this);
                                       
    },
    
     mainfuncM2:function(game){
        this.closepopupM(game);
      
                                        
                                 this.handhint = game.add.sprite(420,450,'handanim');
                                 this.handhint.scale.setTo(0.65,0.65);
                                
                                  game.time.events.add(500,function(){
                                 _this.tween1 = game.add.tween(this.handhint).to({y:90},2000,'Linear',true,0);
                                 _this.tween1.onComplete.add(function(){  
                                     
                                      game.time.events.add(500,function(){
                                     _this.tween2 = game.add.tween(this.handhint).to({y:115},2000,'Linear',true,0);
                                     _this.tween2.onComplete.add(function(){ 
                                         
                                      game.time.events.add(500,function(){
                                     _this.tween3 = game.add.tween(this.handhint).to({y:150},2000,'Linear',true,0);
                                     _this.tween3.onComplete.add(function(){ 
                                       game.time.events.add(500,function(){
                                                                   
                                             this.handhint.visible=false;
                                                                    
                                                 game.time.events.add(1000,function(){
                                                                        if(this.close==0){
                                                                            this.mainfuncM2(game);
                                                                        }else{
                                                                            this.hintflag=0;
                                                                            this.closepopupM(game);
                                                                        }
                                                                                
                                                                },this);
                                                    },this);
                                                },this);
                                            },this);
                                      },this);
                                       },this);
                                     },this);
                                       },this);
                                       
    },
    
    
     mainfuncM3:function(game){
        this.closepopupM(game);
      
                                        
                                 this.handhint = game.add.sprite(420,450,'handanim');
                                 this.handhint.scale.setTo(0.65,0.65);
                                
                                  game.time.events.add(500,function(){
                                 _this.tween1 = game.add.tween(this.handhint).to({y:90},2000,'Linear',true,0);
                                 _this.tween1.onComplete.add(function(){  
                                     
                                      game.time.events.add(500,function(){
                                     _this.tween2 = game.add.tween(this.handhint).to({y:115},2000,'Linear',true,0);
                                     _this.tween2.onComplete.add(function(){ 
                                         
                                      game.time.events.add(500,function(){
                                     _this.tween3 = game.add.tween(this.handhint).to({y:150},2000,'Linear',true,0);
                                     _this.tween3.onComplete.add(function(){ 
                                       game.time.events.add(500,function(){
                                                                   
                                             this.handhint.visible=false;
                                                                    
                                                 game.time.events.add(1000,function(){
                                                                        if(this.close2==0){
                                                                            this.mainfuncM3(game);
                                                                        }else{
                                                                            this.hintflag=0;
                                                                            this.closepopupM(game);
                                                                        }
                                                                                
                                                                },this);
                                                    },this);
                                                },this);
                                            },this);
                                      },this);
                                       },this);
                                     },this);
                                       },this);
                                       
    },


    closepopupM:function(game){
      //  this.closebtn = game.add.sprite(800,100,'closebtn');
      //  this.closebtn.scale.setTo(0.60,0.60);
        this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        this.closebtn.events.onInputDown.add(function(){
            
            this.close=1;
            this.close2=1;
            if(this.closebtn)
            this.closebtn.visible=false;
            if(this.popuphint)
            this.popuphint.visible=false;
            if(this.handhint)
            this.handhint.destroy();
            if(this.background)
            this.background.visible=false;
            if(this.bg)
            this.bg.visible=false;
            if(this.Eggbox)
            this.Eggbox.visible=false;
            if(this.backgroundtransp)
            this.backgroundtransp.visible=false;
            if(this.SmallEgg1_1)
            this.SmallEgg1_1.visible=false;
            if(this.SmallEgg1_2)
            this.SmallEgg1_2.visible=false;
            if(this.SmallEgg1_3)
            this.SmallEgg1_3.visible=false;
            if(this.SmallEgg1_4)
            this.SmallEgg1_4.visible=false;
            if(this.SmallEgg1_Glow_four)
            this.SmallEgg1_Glow_four.destroy();
            if(this.SmallEgg2_Glow_four)
            this.SmallEgg2_Glow_four.destroy();
            if(this.SmallEgg3_Glow_four)
            this.SmallEgg3_Glow_four.destroy();
            if(this.eggGrp)
             this.eggGrp.destroy();
            if(this.numGrp)
            this.numGrp.destroy();
            
            this.hintIcon.inputEnabled = true;
        },this);
     
    },


    subfunc1:function(game){
        this.close=0;
       this.closebtn = game.add.sprite(910,20,'closebtn');
                                   this.closebtn.scale.setTo(0.8,0.8);
                                       // this.greybg = game.add.sprite(139,75,'greybg');
                                       // this.greybg.scale.setTo(0.65,0.75);
                                 this.popuphint = game.add.sprite(5,5,'popuphint');
                                   this.popuphint.scale.setTo(0.8);
                                   this.popuphint.frame=3; 
                                 
        this.mainfunc1(game);
    },
        
  subfunc2:function(game){
        this.close=0;
       this.closebtn = game.add.sprite(910,20,'closebtn');
                                   this.closebtn.scale.setTo(0.8,0.8);
                                       // this.greybg = game.add.sprite(139,75,'greybg');
                                       // this.greybg.scale.setTo(0.65,0.75);
                                 this.popuphint = game.add.sprite(5,5,'popuphint');
                                   this.popuphint.scale.setTo(0.8);
                                   this.popuphint.frame=3; 
                                 
        this.mainfunc2(game);
    },
    
 mainfunc1:function(game){
        this.closepopup14(game);
      
                                        
                                        this.handhint = game.add.sprite(235,225,'hand');
                                        this.handhint.scale.setTo(0.6,0.6);
                                        
                                        game.time.events.add(500,function(){
                                            _this.tween1 = game.add.tween(this.handhint).to({x:280,y:225},500,'Linear',true,0);
                                            _this.tween1.onComplete.add(function(){
                                                game.time.events.add(500,function(){
                                                    _this.tween2 = game.add.tween(this.handhint).to({x:323,y:225},500,'Linear',true,0);
                                                    _this.tween2.onComplete.add(function(){
                                                        game.time.events.add(500,function(){
                                                            _this.tween3 = game.add.tween(this.handhint).to({x:362,y:225},500,'Linear',true,0);
                                                            _this.tween3.onComplete.add(function(){
                                                             game.time.events.add(500,function(){
                                                            _this.tween4 = game.add.tween(this.handhint).to({x:237,y:295},500,'Linear',true,0);
                                                            _this.tween4.onComplete.add(function(){
                                                            game.time.events.add(500,function(){
                                                            _this.tween5 = game.add.tween(this.handhint).to({x:280,y:295},500,'Linear',true,0);
                                                            _this.tween5.onComplete.add(function(){
                                                             game.time.events.add(500,function(){
                                                            _this.tween6 = game.add.tween(this.handhint).to({x:323,y:295},500,'Linear',true,0);
                                                            _this.tween6.onComplete.add(function(){
                                                        /* game.time.events.add(500,function(){
                                                            _this.tween7 = game.add.tween(this.handhint).to({x:350,y:250},800,'Linear',true,0);
                                                            _this.tween7.onComplete.add(function(){*/
                                                                game.time.events.add(500,function(){
                                                                    this.handhint.visible=false; 
                                                                    game.time.events.add(1000,function(){
                                                                        if(this.close==0){
                                                                            this.mainfunc1(game);
                                                                        }else{
                                                                            this.hintflag=0;
                                                                            this.closepopup14(game);
                                                                        }
                                                                            
                                                                          },this); 
                                                                         // },this); },this); 
                                                                         },this); },this); 
                                                                        },this); },this); 
                                                                      },this);   },this); 
                                                                    },this);  },this); 
                                                                },this);    },this); 
                                                            },this);  },this); 
                                                        },this); 
    }, 
    
     mainfunc2:function(game){
        this.closepopup14(game);
      
                                        
                                        this.handhint = game.add.sprite(542,285,'hand');
                                        this.handhint.scale.setTo(0.6,0.6);
                                        
                                        game.time.events.add(500,function(){
                                            _this.tween1 = game.add.tween(this.handhint).to({x:620,y:285},500,'Linear',true,0);
                                            _this.tween1.onComplete.add(function(){
                                                game.time.events.add(500,function(){
                                                                game.time.events.add(500,function(){
                                                                    this.handhint.visible=false; 
                                                                    game.time.events.add(1000,function(){
                                                                        if(this.close==0){
                                                                            this.mainfunc2(game);
                                                                        }else{
                                                                            this.hintflag=0;
                                                                            this.closepopup14(game);
                                                                        }
                                                                            
                                                                 },this);  },this);   
                                                        },this);   },this); 
                                              },this); 
    }, 


    fnlayout73:function(game){
        this.close=0;
        this.closebtn = game.add.sprite(910,20,'closebtn');
        this.closebtn.scale.setTo(0.80,0.80);
        this.fnmaincode73(game);
    },
    
    fnmaincode73:function(game){
        this.closepopup13(game);
        this.handhint = game.add.sprite(458,430,'hand');//423  -> +35
        this.handhint.scale.setTo(0.65,0.65);
        this.htno1 = game.add.sprite(438,408,'unity4_6_2no2');//403  -> +35
        this.htno1.scale.setTo(0.70,1); 
        this.grptweenrat=game.add.group();   
        this.grptweenrat.add(this.htno1);
        this.grptweenrat.add(this.handhint);
        if(this.close==0){
            _this.tweenrat = game.add.tween(this.grptweenrat).to({x:-250,y:-105},2000,'Linear',true,0);
            _this.tweenrat.onComplete.add(function(){
            this.handhint.y=443;
            this.handhint.x = 415;
            if(this.close==0){
            this.htno2 = game.add.sprite(369,409,'unity4_6_2no1');
            this.htno2.scale.setTo(0.75,1.08);
            this.grptweeneleph=game.add.group();                                     
            this.grptweeneleph.add(this.htno2);
            this.grptweeneleph.add(this.handhint);
            }           
            if(this.close==0){
                _this.tweeneleph = game.add.tween(this.grptweeneleph).to({x:169,y:-105},2000,'Linear',true,0);
                _this.tweeneleph.onComplete.add(function(){
                game.time.events.add(500,function(){
                    this.handhint.x=518;
                    this.handhint.y=438;
                    if(this.close==0){
                    this.htno3 = game.add.sprite(508,408,'unity4_6_2no3');
                    this.htno3.scale.setTo(0.70,1);
                    this.grptweenrat=game.add.group();  
                    this.grptweenrat.add(this.htno3);
                    this.grptweenrat.add(this.handhint);
                    } 
                    if(this.close==0){
                        _this.tweenrat2 = game.add.tween(this.grptweenrat).to({x:-255,y:-105},2000,'Linear',true,0);
                        _this.tweenrat2.onComplete.add(function(){                                                
                        this.handhint.x=518;
                        this.handhint.y=438;
                        if(this.close==0){
                        this.htno4 = game.add.sprite(506,408,'unity4_6_2no3');
                        this.htno4.scale.setTo(0.70,1);
                        this.grptweeneleph=game.add.group();                                     
                        this.grptweeneleph.add(this.htno4);
                        this.grptweeneleph.add(this.handhint);  
                        }                                                                 
                        if(this.close==0){
                        _this.tweeneleph2 =  game.add.tween(this.grptweeneleph).to({x:95,y:-105},2000,'Linear',true,0);
                        _this.tweeneleph2.onComplete.add(function(){
                            this.handhint.x=389;//458
                            this.handhint.y=425;//438
                            if(this.close==0){
                                this.htno5 = game.add.sprite(369,409,'unity4_6_2no1');
                                this.htno5.scale.setTo(0.75,1.08);
                                this.grptweenrat=game.add.group();                                     
                                this.grptweenrat.add(this.htno5);
                                this.grptweenrat.add(this.handhint);  
                            }    
                            if(this.close==0){
                                _this.tweenrat3 = game.add.tween(this.grptweenrat).to({x:-46,y:-104},2000,'Linear',true,0);
                                _this.tweenrat3.onComplete.add(function(){    
                                this.handhint.x=458;
                                this.handhint.y=430; 
                                if(this.close==0){
                                    this.htno6 = game.add.sprite(437,408,'unity4_6_2no2');
                                    this.htno6.scale.setTo(0.70,1);
                                    this.grptweeneleph=game.add.group();                                     
                                    this.grptweeneleph.add(this.htno6);
                                    this.grptweeneleph.add(this.handhint);  
                                } 
                                _this.tweeneleph3 =  game.add.tween(this.grptweeneleph).to({x:230,y:-105},2000,'Linear',true,0);
                                _this.tweeneleph3.onComplete.add(function(){
                                    this.handhint.visible=false;
                                    this.blank = game.add.sprite(333,406,'unity4_6_2blank');
                                    this.blank.scale.setTo(3,1.1);
                                    game.time.events.add(500,function(){
                                        this.hintflag=0;
                                        this.blank.destroy();
                                        this.htno1.destroy();
                                        this.htno2.destroy();
                                        this.htno3.destroy();
                                        this.htno4.destroy();
                                        this.htno5.destroy();
                                        this.htno6.destroy();
                                        this.grptweenrat.destroy();
                                        this.grptweeneleph.destroy(); 
                                        _this.tweenrat.visible=false;
                                        _this.tweenrat2.visible=false;
                                        _this.tweenrat3.visible=false;
                                        _this.tweeneleph.visible=false;
                                        _this.tweeneleph2.visible=false;
                                        _this.tweeneleph3.visible=false;
                                        if(this.close==0){     
                                            game.time.events.add(1000,function(){
                                                this.fnmaincode73(game);
                                            },this);
                                        }else{
                                            this.hintflag=0;
                                            this.closepopup13(game);
                                        }
                                    },this);
                                },this);
                           },this);
                          }
                        },this);
                      }
                     },this);
                    }
                  },this);
                 },this);
               }
            },this);
        }
    },

    fnlayout:function(game){
        this.close=0;
        this.closebtn = game.add.sprite(910,20,'closebtn');
        this.closebtn.scale.setTo(0.80,0.80);
        this.fnmaincode(game);
    },
    
    fnmaincode:function(game){
        this.closepopup13(game);
        this.handhint = game.add.sprite(485,430,'hand');//460
        this.handhint.scale.setTo(0.65,0.65);
        this.htno1 = game.add.sprite(465,408,'unity4_6_1no2');//430,365
        this.htno1.scale.setTo(0.75,1.1); 
        this.grptweenrat=game.add.group();   
        this.grptweenrat.add(this.htno1);
        this.grptweenrat.add(this.handhint);
        if(this.close==0){
            _this.tweenrat = game.add.tween(this.grptweenrat).to({x:-230,y:-87},2000,'Linear',true,0);
            _this.tweenrat.onComplete.add(function(){
            this.handhint.y=443;
            this.handhint.x = 405;
            if(this.close==0){
            this.htno2 = game.add.sprite(390,408,'unity4_6_1no1');
            this.htno2.scale.setTo(0.75,1.1);
            this.grptweeneleph=game.add.group();                                     
            this.grptweeneleph.add(this.htno2);
            this.grptweeneleph.add(this.handhint);
            }           
            if(this.close==0){
                _this.tweeneleph = game.add.tween(this.grptweeneleph).to({x:169,y:-85},2000,'Linear',true,0);
                _this.tweeneleph.onComplete.add(function(){
                game.time.events.add(500,function(){
                    this.handhint.x=405;
                    this.handhint.y=438;
                    if(this.close==0){
                    this.htno3 = game.add.sprite(386,408,'unity4_6_1no1');
                    this.htno3.scale.setTo(0.75,1.1);
                    this.grptweenrat=game.add.group();  
                    this.grptweenrat.add(this.htno3);
                    this.grptweenrat.add(this.handhint);
                    } 
                    if(this.close==0){
                        _this.tweenrat2 = game.add.tween(this.grptweenrat).to({x:-87,y:-87},2000,'Linear',true,0);
                        _this.tweenrat2.onComplete.add(function(){                                                
                        this.handhint.x=489;
                        this.handhint.y=438;
                        if(this.close==0){
                        this.htno4 = game.add.sprite(465,408,'unity4_6_1no2');
                        this.htno4.scale.setTo(0.75,1.1);
                        this.grptweeneleph=game.add.group();                                     
                        this.grptweeneleph.add(this.htno4);
                        this.grptweeneleph.add(this.handhint);  
                        }                                                                 
                        if(this.close==0){
                        _this.tweeneleph2 =  game.add.tween(this.grptweeneleph).to({x:157,y:-85},2000,'Linear',true,0);
                        _this.tweeneleph2.onComplete.add(function(){
                             this.blank1 = game.add.sprite(363,406,'unity4_6_1blank');
                             this.blank1.scale.setTo(1.2,1.1);
                             this.blank2 = game.add.sprite(442,406,'unity4_6_1blank');
                             this.blank2.scale.setTo(1.2,1.1);
                            this.handhint.visible=false;
                             game.time.events.add(500,function(){
                                this.hintflag=0;      
                                this.blank1.destroy();
                                this.blank2.destroy();
                                this.htno1.destroy();
                                this.htno2.destroy();
                                this.htno3.destroy();
                                this.htno4.destroy();
                                this.grptweenrat.destroy();
                                this.grptweeneleph.destroy(); 
                                _this.tweenrat.visible=false;
                                _this.tweenrat2.visible=false;
                                _this.tweeneleph.visible=false;
                                _this.tweeneleph2.visible=false;
                                if(this.close==0){     
                                    //game.time.events.add(1000,function(){
                                        this.fnmaincode(game);
                                    //},this);
                                }else{
                                    this.hintflag=0;
                                    this.closepopup13(game);
                                }
                             },this);
                           },this);
                          }
                        },this);
                      }
                     },this);
                    },this);
                   }
                  },this);
            }
    },

    fnlayout11:function(game,hintparams){
        this.close=0;
        this.close2=0;
        if(hintparams[1]=="level1"){
            this.background = game.add.sprite(10,10,'unity1_1BG_01');
            this.hntscr = game.add.sprite(10,30,'unity1_1hintscreen');//220,110
            this.hntscr.scale.setTo(0.69,1);
            this.yellowbg = game.add.sprite(0,0,'yellowbg');
            this.popuphint = game.add.sprite(5,5,'popuphint');
            
        }else if(hintparams[1]=="level2"){
            this.background = game.add.sprite(10,10,'unity1_1BG_01');
            this.hntscr = game.add.sprite(0,35,'unity1_2hintscreen');//220,110
            this.hntscr.scale.setTo(0.69,0.85);
            this.yellowbg = game.add.sprite(0,0,'yellowbg');
            this.popuphint = game.add.sprite(5,5,'popuphint');
        }    
        this.popuphint.scale.setTo(0.8);
        this.popuphint.frame=3;
        this.closebtn = game.add.sprite(910,20,'closebtn');
        this.closebtn.scale.setTo(0.8,0.8);
        this.fnmaincode11(game,hintparams);  
    },
    
    fnmaincode11:function(game,hintparams){
        this.closepopup2(game);
        if(hintparams[1]=="level1"){                              
            this.handhint = game.add.sprite(110,260,'hand');
            this.handhint.scale.setTo(0.65,0.65);
            _this.numpad = game.add.sprite(85,215,'NumberKeyN');
            _this.numpad.scale.setTo(0.5,0.5);
            _this.numpad.visible=false;
            if(this.close==0){
                if(window.languageSelected=="English")
                         this.getVoice(window.baseUrl+"questionSounds/unity/1.1/English/1.mp3");
                    else if(window.languageSelected=="Hindi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Hindi/1.mp3");
                    else if(window.languageSelected=="Kannada")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Kannada/1.mp3");
                    else if(window.languageSelected=="Odiya")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Odiya/1.mp3");
					else if(window.languageSelected=="Marathi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Marathi/No1.mp3");
					else if(window.languageSelected=="Telugu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Telugu/No1.mp3");
					else if(window.languageSelected=="Tamil")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Tamil/No1.mp3");
					else if(window.languageSelected=="Urdu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Urdu/No1.mp3");
                    else
                        this.getVoice(window.baseUrl+"questionSounds/Gujarati/unity/numbers/No1.mp3");
                _this.numpad.visible=true;
            }
            game.time.events.add(800,function(){
            _this.numpad.x = 255;
            _this.numpad.frame=1;
            this.handhint.x=250;
            if(this.close==0){
                if(window.languageSelected=="English")
                         this.getVoice(window.baseUrl+"questionSounds/unity/1.1/English/2.mp3");
                    else if(window.languageSelected=="Hindi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Hindi/2.mp3");
                    else if(window.languageSelected=="Kannada")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Kannada/2.mp3");
					else if(window.languageSelected=="Marathi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Marathi/No2.mp3");
					else if(window.languageSelected=="Telugu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Telugu/No2.mp3");
					else if(window.languageSelected=="Tamil")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Tamil/No2.mp3");
					else if(window.languageSelected=="Urdu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Urdu/No2.mp3");
                    else if(window.languageSelected=="Odiya")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Odiya/2.mp3");
                    else
                        this.getVoice(window.baseUrl+"questionSounds/Gujarati/unity/numbers/No2.mp3");
                _this.numpad.visible=true;
            }
            game.time.events.add(800,function(){
                _this.numpad.x=455;
                _this.numpad.frame=0;
                this.handhint.x= 480;
                if(this.close==0){
                    if(window.languageSelected=="English")
                         this.getVoice(window.baseUrl+"questionSounds/unity/1.1/English/1.mp3");
                    else if(window.languageSelected=="Hindi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Hindi/1.mp3");
                    else if(window.languageSelected=="Kannada")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Kannada/1.mp3");
                    else if(window.languageSelected=="Odiya")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Odiya/1.mp3");
					else if(window.languageSelected=="Marathi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Marathi/No1.mp3");
					else if(window.languageSelected=="Telugu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Telugu/No1.mp3");
					else if(window.languageSelected=="Tamil")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Tamil/No1.mp3");
					else if(window.languageSelected=="Urdu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Urdu/No1.mp3");
                    else
                        this.getVoice(window.baseUrl+"questionSounds/Gujarati/unity/numbers/No1.mp3");
                    _this.numpad.visible=true;
                }
                game.time.events.add(800,function(){
                    _this.numpad.x= 680;
                    _this.numpad.y = 140;
                    this.handhint.x=700;
                    this.handhint.y=205;
                    if(this.close==0){
                        if(window.languageSelected=="English")
                         this.getVoice(window.baseUrl+"questionSounds/unity/1.1/English/1.mp3");
                    else if(window.languageSelected=="Hindi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Hindi/1.mp3");
                    else if(window.languageSelected=="Kannada")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Kannada/1.mp3");
                    else if(window.languageSelected=="Odiya")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Odiya/1.mp3");
					else if(window.languageSelected=="Marathi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Marathi/No1.mp3");
					else if(window.languageSelected=="Telugu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Telugu/No1.mp3");
					else if(window.languageSelected=="Tamil")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Tamil/No1.mp3");
					else if(window.languageSelected=="Urdu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Urdu/No1.mp3");
                    else
                        this.getVoice(window.baseUrl+"questionSounds/Gujarati/unity/numbers/No1.mp3");
                        _this.numpad.visible=true;
                    }
                    game.time.events.add(800,function(){
                        _this.numpad.x= 820;
                        _this.numpad.frame=1;
                        _this.numpad.y = 140;
                        this.handhint.x=840;
                        this.handhint.y=195;
                        if(this.close==0){
                            if(window.languageSelected=="English")
                         this.getVoice(window.baseUrl+"questionSounds/unity/1.1/English/2.mp3");
                    else if(window.languageSelected=="Hindi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Hindi/2.mp3");
                    else if(window.languageSelected=="Kannada")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Kannada/2.mp3");
                    else if(window.languageSelected=="Odiya")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Odiya/2.mp3");
					else if(window.languageSelected=="Marathi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Marathi/No2.mp3");
					else if(window.languageSelected=="Telugu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Telugu/No2.mp3");
					else if(window.languageSelected=="Tamil")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Tamil/No2.mp3");
					else if(window.languageSelected=="Urdu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Urdu/No2.mp3");
                    else
                        this.getVoice(window.baseUrl+"questionSounds/Gujarati/unity/numbers/No2.mp3");
                            _this.numpad.visible=true;
                        }
                        game.time.events.add(800,function(){
                        _this.numpad.x= 750;
                        _this.numpad.frame=2;
                        _this.numpad.y = 215;
                        this.handhint.x=760;
                        this.handhint.y=270;
                        if(this.close==0){
                            if(window.languageSelected=="English")
                         this.getVoice(window.baseUrl+"questionSounds/unity/1.1/English/3.mp3");
                    else if(window.languageSelected=="Hindi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Hindi/3.mp3");
                    else if(window.languageSelected=="Kannada")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Kannada/3.mp3");
                    else if(window.languageSelected=="Odiya")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Odiya/3.mp3");
					else if(window.languageSelected=="Marathi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Marathi/No3.mp3");
					else if(window.languageSelected=="Telugu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Telugu/No3.mp3");
					else if(window.languageSelected=="Tamil")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Tamil/No3.mp3");
					else if(window.languageSelected=="Urdu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Urdu/No3.mp3");
                    else
                        this.getVoice(window.baseUrl+"questionSounds/Gujarati/unity/numbers/No3.mp3");
                            _this.numpad.visible=true;
                        }
                        game.time.events.add(800,function(){
                            _this.numpad.x= 680;
                            _this.numpad.frame=3;
                            _this.numpad.y = 290;
                            this.handhint.x=700;
                            this.handhint.y=350;
                            if(this.close==0){
                                if(window.languageSelected=="English")
                         this.getVoice(window.baseUrl+"questionSounds/unity/1.1/English/4.mp3");
                    else if(window.languageSelected=="Hindi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Hindi/4.mp3");
                    else if(window.languageSelected=="Kannada")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Kannada/4.mp3");
                    else if(window.languageSelected=="Odiya")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Odiya/4.mp3");
					else if(window.languageSelected=="Marathi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Marathi/No4.mp3");
					else if(window.languageSelected=="Telugu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Telugu/No4.mp3");
					else if(window.languageSelected=="Tamil")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Tamil/No4.mp3");
					else if(window.languageSelected=="Urdu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Urdu/No4.mp3");
                    else
                        this.getVoice(window.baseUrl+"questionSounds/Gujarati/unity/numbers/No4.mp3");

                                _this.numpad.visible=true;
                            }
                            game.time.events.add(800,function(){
                                _this.numpad.x=820;
                                _this.numpad.frame=4;
                                _this.numpad.y = 290;
                                this.handhint.x=840;
                                if(this.close==0){
                                    if(window.languageSelected=="English")
                         this.getVoice(window.baseUrl+"questionSounds/unity/1.1/English/5.mp3");
                    else if(window.languageSelected=="Hindi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Hindi/5.mp3");
                    else if(window.languageSelected=="Kannada")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Kannada/5.mp3");
                    else if(window.languageSelected=="Odiya")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Odiya/5.mp3");
					else if(window.languageSelected=="Marathi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Marathi/No5.mp3");
					else if(window.languageSelected=="Telugu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Telugu/No5.mp3");
					else if(window.languageSelected=="Tamil")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Tamil/No5.mp3");
					else if(window.languageSelected=="Urdu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Urdu/No5.mp3");
                    else
                        this.getVoice(window.baseUrl+"questionSounds/Gujarati/unity/numbers/No5.mp3");
                                    _this.numpad.visible=true;
                                }
                                game.time.events.add(800,function(){
                                    this.handhint.visible=false;
                                    
                                    _this.numpad.visible=false;
                                    
                                    game.time.events.add(1000,function(){
                                      if(this.close==0){
                                          
                                          this.fnmaincode11(game,hintparams);
                                      }
                                        
                                      else{
                                          this.hintflag=0;
                                          this.closepopup2(game);
                                      }
                                    },this);
                                },this);
                            },this);
                        },this);
                        },this);
                    },this);
                },this);
            },this);
        },this);
        
        }else{
            this.handhint = game.add.sprite(162,165,'hand');
            this.handhint.scale.setTo(0.65,0.65);
            _this.numpad = game.add.sprite(135,105,'NumberKeyN');
            _this.numpad.scale.setTo(0.5,0.5);
            _this.numpad.visible=false;
            if(this.close==0){
                if(window.languageSelected=="English")
                         this.getVoice(window.baseUrl+"questionSounds/unity/1.1/English/1.mp3");
                    else if(window.languageSelected=="Hindi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Hindi/1.mp3");
                    else if(window.languageSelected=="Kannada")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Kannada/1.mp3");
                    else if(window.languageSelected=="Odiya")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Odiya/1.mp3");
					else if(window.languageSelected=="Marathi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Marathi/No1.mp3");
					else if(window.languageSelected=="Telugu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Telugu/No1.mp3");
					else if(window.languageSelected=="Tamil")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Tamil/No1.mp3");
					else if(window.languageSelected=="Urdu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Urdu/No1.mp3");
                    else
                        this.getVoice(window.baseUrl+"questionSounds/Gujarati/unity/numbers/No1.mp3");
                _this.numpad.visible=true;
            }
            
            game.time.events.add(800,function(){
            _this.numpad.x= 190;
            _this.numpad.frame=1;
            _this.numpad.y = 40;
            this.handhint.x=200;
            this.handhint.y=115;
            if(this.close==0){
                if(window.languageSelected=="English")
                         this.getVoice(window.baseUrl+"questionSounds/unity/1.1/English/2.mp3");
                    else if(window.languageSelected=="Hindi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Hindi/2.mp3");
                    else if(window.languageSelected=="Kannada")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Kannada/2.mp3");
                    else if(window.languageSelected=="Odiya")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Odiya/2.mp3");
					else if(window.languageSelected=="Marathi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Marathi/No2.mp3");
					else if(window.languageSelected=="Telugu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Telugu/No2.mp3");
					else if(window.languageSelected=="Tamil")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Tamil/No2.mp3");
					else if(window.languageSelected=="Urdu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Urdu/No2.mp3");
                    else
                        this.getVoice(window.baseUrl+"questionSounds/Gujarati/unity/numbers/No2.mp3");
                _this.numpad.visible=true;
            }
            game.time.events.add(800,function(){
                _this.numpad.x= 310;
                _this.numpad.frame=2;
                _this.numpad.y = 100;
                this.handhint.x=335;
                this.handhint.y=175;
                if(this.close==0){
                    if(window.languageSelected=="English")
                         this.getVoice(window.baseUrl+"questionSounds/unity/1.1/English/3.mp3");
                    else if(window.languageSelected=="Hindi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Hindi/3.mp3");
                    else if(window.languageSelected=="Kannada")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Kannada/3.mp3");
                    else if(window.languageSelected=="Odiya")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Odiya/3.mp3");
					else if(window.languageSelected=="Marathi")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Marathi/No3.mp3");
					else if(window.languageSelected=="Telugu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Telugu/No3.mp3");
					else if(window.languageSelected=="Tamil")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Tamil/No3.mp3");
					else if(window.languageSelected=="Urdu")
                        this.getVoice(window.baseUrl+"questionSounds/unity/1.1/Urdu/No3.mp3");
                    else
                        this.getVoice(window.baseUrl+"questionSounds/Gujarati/unity/numbers/No3.mp3");
                    _this.numpad.visible=true;
                }
                game.time.events.add(800,function(){
                    this.handhint.visible=false;
                    _this.numpad.visible=false;
                   
                    game.time.events.add(1000,function(){
                      if(this.close2==0)
                        this.fnmaincode11(game,hintparams); 
                      else{
                              this.hintflag=0;
                              this.closepopup2(game);
                          }
                    },this);
                },this);
            },this);
            },this);
        }
    },

    closepopup:function(game){
        this.closebtn = game.add.sprite(910,20,'closebtn');
        this.closebtn.scale.setTo(0.8,0.8);
        this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        this.closebtn.events.onInputDown.add(function(){
            this.closebtn.visible=false;
            if(this.popupbg)
                this.popupbg.visible=false;

            this.background.visible=false;
            this.backgroundtransp.visible=false;
            if(this.video)
            {
                this.somethingV.destroy();
                //this.video.destroy();
            }

            //Enable input key on close of HINT screen
            this.opt1.inputEnabled = true;
            this.opt2.inputEnabled = true;
            this.opt3.inputEnabled = true;

            this.hintIcon.inputEnabled = true;

            if(this.popupHint)
                this.popupHint.destroy();

            if(this.popuphint)
                this.popuphint.visible=false;

        },this);
    },

    closepopup2:function(game){
        this.closebtn.inputEnabled=true;
        this.closebtn.input.useHandCursor = true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.events.onInputDown.add(function(){
            console.log("closed");
            this.close=1;
            this.close2=1;
            this.closebtn.visible=false;
            if(this.background)
                this.background.visible=false;
            if(this.popupbg)
            this.popupbg.visible=false;
            if(this.yellowbg)
                this.yellowbg.visible=false;
            if(this.greybg)
                this.greybg.visible=false;
            if(this.hntscr)
                this.hntscr.destroy();
            if(this.popuphint)
                this.popuphint.visible=false;
            if(this.glow)
                this.glow.visible=false;
            if(this.handhint)
                this.handhint.destroy();
            if(_this.numpad)
                _this.numpad.visible=false;
            this.backgroundtransp.visible=false;
            this.hintIcon.inputEnabled = true;
         
        },this);
    },

    closepopup3:function(game){
       
        this.closebtn.inputEnabled=true;
        this.closebtn.input.priorityID = 10;
        //this.closebtn.input.useHandCursor = true;
        this.closebtn.events.onInputDown.add(function(){
            this.closebtn.visible=false;
            this.popupbg.visible=false;
            this.popuphint.visible=false;
            this.backgroundtransp.visible=false;
        },this);
    },

    closepopup4:function(game){
        /*this.closebtn = game.add.sprite(768,105,'closebtn');
        this.closebtn.scale.setTo(0.60,0.60);
        */this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        this.closebtn.events.onInputDown.add(function(){
            this.closebtn.visible=false;
            this.popupbg.visible=false;
            this.popuphint.visible=false;
            this.backgroundtransp.visible=false;
        },this);
    },

    closepopup5:function(game){
        this.closebtn = game.add.sprite(910,20,'closebtn');
        this.closebtn.scale.setTo(0.8,0.8);
        this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        this.closebtn.events.onInputDown.add(function(){

            this.closebtn.visible=false;
            this.popuphint.visible=false;
            this.hintscreen.visible=false;
            this.backgroundtransp.visible=false;
            this.closebtn.destroy();
        },this);
        this.hintIcon.inputEnabled = true;
        this.speakerbtn.inputEnabled = true;
    },

    closepopup6:function(game){
        this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        this.closebtn.events.onInputDown.add(function(){
        this.closebtn.visible=false;
        this.hintscreen.visible=false;
        this.forwardbtn.visible=false;
        this.backwardbtn.visible=false;
        this.popuphint.visible=false;
        this.backgroundtransp.visible=false;
     },this);
     
    },

    closepopup7:function(game){
        
        this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        this.closebtn.events.onInputDown.add(function(){
            this.closebtn.visible=false;
            if(this.popupbg)
            this.popupbg.visible=false;
            this.popuphint.visible=false;
            this.backgroundtransp.visible=false;
            if(this.video)
            {
                this.somethingV.destroy();
            }
            if(this.background)
                this.background.destroy();
            if(this.yellowbg)
                this.yellowbg.visible=false;
            if(this.popupbg)
                this.popupbg.visible=false;
            this.hintIcon.inputEnabled = true;
            this.backgroundtransp.visible=false;
        },this);
    },

    fnlayout21:function(game,hintparams){
        this.close=0;
        if(this.hintflag==2 && hintparams[1]=="level1"){
            this.background = game.add.sprite(10,10,'Level441_bg1');
            this.video = game.add.video('demo');
            this.video.play(true);
            this.somethingV =  this.video.addToWorld(480,275,0.5,0.5,0.91,0.88);
            this.yellowbg = game.add.sprite(0,0,'yellowbg');
            this.popuphint = game.add.sprite(5,5,'popuphint');
            this.popuphint.scale.setTo(0.8);
            this.popuphint.frame=2;
            this.closebtn = game.add.sprite(910,20,'closebtn');
            this.closebtn.scale.setTo(0.80,0.80);
        }else if(this.hintflag==2 && hintparams[1]=="level2"){
            this.background = game.add.sprite(10,10,'Level441_bg1');
            this.video = game.add.video('demo');
            this.video.play(true);
            this.somethingV =  this.video.addToWorld(480,275,0.5,0.5,0.91,0.88);
            this.yellowbg = game.add.sprite(0,0,'yellowbg');
            this.popuphint = game.add.sprite(5,5,'popuphint');
            this.popuphint.scale.setTo(0.8);
            this.popuphint.frame=2;
            this.closebtn = game.add.sprite(910,20,'closebtn');
            this.closebtn.scale.setTo(0.80,0.80);
        }else{   
            this.popupbg = game.add.sprite(0,0,'100_chart');
            this.popuphint = game.add.sprite(5,5,'popuphint');
            this.popuphint.scale.setTo(0.8);
            this.popuphint.frame=3;
            this.closebtn = game.add.sprite(910,20,'closebtn');
            this.closebtn.scale.setTo(0.80,0.80);
        }
        this.fnmaincode21(game,hintparams);
    },
    
    fnmaincode21:function(game,hintparams){
        this.closepopup8(game);
        if(this.hintflag==2){
            if(hintparams[1]=="level1"){   
                this.video.changeSource(window.baseUrl+"assets/demoVideos/hintscreen1.mp4");

            }else{
                this.video.changeSource(window.baseUrl+"assets/demoVideos/hintscreen2.mp4");
            }
           
      }else if(this.hintflag==3){
            this.backgroundtransp.visible=true;    
            this.hintflag=0;   
      }
    },
    
    closepopup8:function(game){
        this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        this.closebtn.events.onInputDown.add(function(){
            this.close=1;
            this.closebtn.visible=false;
            if(this.popupbg)
            this.popupbg.visible=false;
            if(this.yellowbg)
                this.yellowbg.visible=false;
            if(this.greybg)
                this.greybg.visible=false;
            if(this.hntscr)
                this.hntscr.destroy();
            if(this.popuphint)
            this.popuphint.visible=false;
            if(this.glow)
                this.glow.visible=false;
            if(this.handhint)
                this.handhint.destroy();
            if(_this.numpad)
                _this.numpad.visible=false;
            if(this.box)
                this.box.destroy();
            if(this.grptween){
                this.grptween.destroy();
            }
            if(this.video)
            {
                this.somethingV.destroy();
            }
            if(this.background)
                this.background.destroy();
            this.hintIcon.inputEnabled = true;
            this.backgroundtransp.visible=false;
        },this);
    },

    fnlayout42:function(game){
        this.closeb=0;
//        this.closebtn = game.add.sprite(910,20,'closebtn');
//        this.closebtn.scale.setTo(0.80,0.80);
        this.fnmaincode42(game);
    },
    
    fnmaincode42:function(game){
//        this.closepopup(game);
        this.glow1 = game.add.sprite(487,147,'glow');
        this.glow1.scale.setTo(0.95,0.89);
        this.glow1anim = this.glow1.animations.add('glow1',['Symbol 8 copy instance 10003','Symbol 8 copy instance 10000']);
        this.glow1anim.play(2.8,true);
        this.glow2 = game.add.sprite(488,241,'glow');
        this.glow2.scale.setTo(0.95,0.89);
        this.glow2anim = this.glow2.animations.add('glow2',['Symbol 8 copy instance 10003','Symbol 8 copy instance 10000']);
        this.glow2anim.play(2.8,true);
        this.glow3 = game.add.sprite(489,335,'glow');
        this.glow3.scale.setTo(0.95,0.89);
        this.glow3anim = this.glow3.animations.add('glow3',['Symbol 8 copy instance 10003','Symbol 8 copy instance 10000']);
        this.glow3anim.play(2.8,true);
        this.glow4 = game.add.sprite(392,202,'glow');
        this.glow4.scale.setTo(0.95,0.89);
        this.glow4anim = this.glow4.animations.add('glow4',['Symbol 8 copy instance 10003','Symbol 8 copy instance 10000']);
        this.glow4anim.play(2.8,true);
        this.glow5 = game.add.sprite(392,290,'glow');
        this.glow5.scale.setTo(0.95,0.89);
        this.glow5anim = this.glow5.animations.add('glow5',['Symbol 8 copy instance 10003','Symbol 8 copy instance 10000']);
        this.glow5anim.play(2.8,true);

        game.time.events.add(1000,function(){
            this.glow1anim.stop();
            this.glow2anim.stop();
            this.glow3anim.stop();
            this.glow4anim.stop();
            this.glow5anim.stop();
            this.handhint = game.add.sprite(407,310,'hand');
            this.handhint.scale.setTo(0.65,0.65);
            game.time.events.add(800,function(){
                this.handhint.x=510;
                this.handhint.y=360;
                game.time.events.add(800,function(){
                    this.handhint.visible=false;
                    this.glowright1 = game.add.sprite(361,290,'glow');
                    this.glowright1.scale.setTo(0.95,0.89);
                    this.glowright1anim = this.glowright1.animations.add('glowright1',['Symbol 8 copy instance 10003','Symbol 8 copy instance 10002']);
                    this.glowright1anim.play(2.8,true);
                    this.glowright2 = game.add.sprite(457,335,'glow');
                    this.glowright2.scale.setTo(0.95,0.89);
                    this.glowright2anim = this.glowright2.animations.add('glowright2',['Symbol 8 copy instance 10003','Symbol 8 copy instance 10002']);
                    this.glowright2anim.play(2.8,true);
                    if(this.closeb==1){
                        this.glowright2anim.destroy();
                    this.glowright1anim.destroy();
                        this.handhint.visible=false;
                    }   
                },this);
            },this);

           game.time.events.add(4000,function(){
                    this.hintflag=0;
                    this.glow1.destroy();
                    this.glow2.destroy();
                    this.glow3.destroy();
                    this.glow4.destroy();
                    this.glow5.destroy();
                    this.glowright2.destroy();
                    this.glowright1.destroy();
                    this.glow1anim.stop();
                    this.glow2anim.stop();
                    this.glow3anim.stop();
                    this.glow4anim.stop();
                    this.glow5anim.stop();
                    this.glowright2anim.destroy();
                    this.glowright1anim.destroy();
                    this.handhint.visible=false;
                    game.time.events.add(1000,function(){
                    if(this.closeb==0){
                        this.fnmaincode42(game);
                    }else{
                        this.handhint.visible=false;
                    }
                },this);
            },this);

        },this);                        
    },
        
    closepopup9:function(game){
        this.closebtn = game.add.sprite(910,20,'closebtn');
        this.closebtn.scale.setTo(0.80,0.80);
        
        this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        this.closebtn.events.onInputDown.add(function(){
            this.closeb=1;
            this.closebtnclick=1;
            this.closebtn.visible=false;
            if(this.background)
            this.background.visible=false;
            if(this.popupbg)
            this.popupbg.visible=false;
            if(this.yellowbg)
                this.yellowbg.visible=false;
            if(this.greybg)
                this.greybg.visible=false;
            if(this.hntscr)
                this.hntscr.visible=false;
            if(this.popuphint)
            this.popuphint.visible=false;
            if(this.glow)
                this.glow.visible=false;
            this.backgroundtransp.visible=false;
            if(this.handhint){
                this.handhint.visible=false;
                this.handhint.destroy();
            }
            if(this.glow1)
                this.glow1.destroy();
            if(this.glow2)
                this.glow2.destroy();
            if(this.glow3)
                this.glow3.destroy();
            if(this.glow4)
                this.glow4.destroy();
            if(this.glow5)
                this.glow5.destroy();
            if(this.glowright1)
                this.glowright1.destroy();
            if(this.glowright2)
                this.glowright2.destroy();
            if(this.glow1anim)
                this.glow1anim.destroy();
            if(this.glow2anim)
                    this.glow2anim.destroy();
            if(this.glow3anim)
                    this.glow3anim.destroy();
            if(this.glow4anim)
                    this.glow4anim.destroy();
            if(this.glow5anim)
                    this.glow5anim.destroy();
            if(this.glowright2anim)
                    this.glowright2anim.destroy();
            if(this.glowright1anim)
                    this.glowright1anim.destroy();   

            this.hintIcon.inputEnabled = true;

        },this);
     }, 

     fnlayout53:function(game){
        this.closet=0;
        this.closebtn = game.add.sprite(910,20,'closebtn');
        this.closebtn.scale.setTo(0.80,0.80);
        this.fnmaincode53(game);
    },
    
    fnmaincode53:function(game){
        this.closepopup10(game);
        this.glow1 = game.add.sprite(495,135,'glownew');
        this.glow1.scale.setTo(0.82,1.02);
        this.glow1anim = this.glow1.animations.add('glow1',['Symbol 8 copy instance 10003','Symbol 8 copy instance 10000']);
        this.glow1anim.play(2.8,true);
        this.glow2 = game.add.sprite(495,244,'glownew');
        this.glow2.scale.setTo(0.82,1.02);
        this.glow2anim = this.glow2.animations.add('glow2',['Symbol 8 copy instance 10003','Symbol 8 copy instance 10000']);
        this.glow2anim.play(2.8,true);
        this.glow3 = game.add.sprite(495,354,'glownew');
        this.glow3.scale.setTo(0.82,1.02);
        this.glow3anim = this.glow3.animations.add('glow3',['Symbol 8 copy instance 10003','Symbol 8 copy instance 10000']);
        this.glow3anim.play(2.8,true);
        this.glow4 = game.add.sprite(385,197,'glownew');
        this.glow4.scale.setTo(0.82,1.02);
        this.glow4anim = this.glow4.animations.add('glow4',['Symbol 8 copy instance 10003','Symbol 8 copy instance 10000']);
        this.glow4anim.play(2.8,true);
        this.glow5 = game.add.sprite(385,300,'glownew');
        this.glow5.scale.setTo(0.82,1.02);
        this.glow5anim = this.glow5.animations.add('glow5',['Symbol 8 copy instance 10003','Symbol 8 copy instance 10000']);
        this.glow5anim.play(2.8,true);

        game.time.events.add(1000,function(){
            
            this.glow1anim.stop();
            this.glow2anim.stop();
            this.glow3anim.stop();
            this.glow4anim.stop();
            this.glow5anim.stop();
            this.handhint = game.add.sprite(425,320,'hand');
            this.handhint.scale.setTo(0.65,0.65);
            if(this.closet==1){
                this.handhint.visible=false;
            }
            game.time.events.add(800,function(){
                this.handhint.x=535;
                this.handhint.y=263;
                game.time.events.add(800,function(){
                    this.handhint.visible=false;
                    this.glowright1 = game.add.sprite(385,300,'glownew');
                    this.glowright1.scale.setTo(0.82,1.02);
                    this.glowright1anim = this.glowright1.animations.add('glowright1',['Symbol 8 copy instance 10003','Symbol 8 copy instance 10001']);
                    
                    this.glowright1anim.play(2.8,true);

                    this.glowright2 = game.add.sprite(495,243,'glownew');
                    this.glowright2.scale.setTo(0.81,1.02);
                    this.glowright2anim = this.glowright2.animations.add('glowright2',['Symbol 8 copy instance 10003','Symbol 8 copy instance 10001']);
                    this.glowright2anim.play(2.8,true);
                    if(this.closet==1){
                        this.glowright2anim.destroy();
                        this.glowright1anim.destroy();
                        this.handhint.visible=false;
                    }
                   
               },this);
                    game.time.events.add(3000,function(){
                    this.closepopup10(game);
                    this.glowright1anim.stop();
                    this.glowright2anim.stop();
                    this.handhint = game.add.sprite(451,320,'hand');
                    this.handhint.scale.setTo(0.65,0.65);
                    if(this.closet==1){
                        this.handhint.visible=false;
                    }
                    game.time.events.add(800,function(){
                    this.handhint.x=560;
                    this.handhint.y=273;
                    game.time.events.add(800,function(){
                        this.handhint.visible=false;
                        this.glowright11 = game.add.sprite(386,300,'glownew');
                        this.glowright11.scale.setTo(0.79,1.02);
                        this.glowright11anim = this.glowright11.animations.add('glowright11',['Symbol 8 copy instance 10003','Symbol 8 copy instance 10002']);

                        this.glowright11anim.play(2.8,true);

                        this.glowright21 = game.add.sprite(494,243,'glownew');
                        this.glowright21.scale.setTo(0.79,1.02);
                        this.glowright21anim = this.glowright21.animations.add('glowright21',['Symbol 8 copy instance 10003','Symbol 8 copy instance 10002']);
                       this.glowright21anim.play(2.8,true);
                        if(this.closet==1){
                            this.glowright21anim.destroy();
                            this.glowright11anim.destroy();
                            this.handhint.visible=false;
                        }
                        game.time.events.add(3000,function(){
                            this.hintflag=0;
                            this.glow1.destroy();
                            this.glow2.destroy();
                            this.glow3.destroy();
                            this.glow4.destroy();
                            this.glow5.destroy();
                            this.glowright2.destroy();
                            this.glowright1.destroy();
                            this.glowright21.destroy();
                            this.glowright11.destroy();
                            this.handhint.visible=false;
                            game.time.events.add(1000,function(){
                                if(this.closet==0){
                                   this.fnmaincode53(game);
                                }else{
                                   this.handhint.visible=false;
                                }
                            },this);
                        },this);
                    },this);
                    },this);
                    },this);
                },this);
            },this);
        
    },
        
     closepopup10:function(game){
        console.log("ddd");
        this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
       // this.closebtnclick=0;
         
                
            
        this.closebtn.events.onInputDown.add(function(){
           this.closet=1;
            this.closebtnclick=1;
            this.closebtn.visible=false;
            if(this.background)
            this.background.visible=false;
            if(this.popupbg)
            this.popupbg.visible=false;
            if(this.yellowbg)
                this.yellowbg.visible=false;
            if(this.greybg)
                this.greybg.visible=false;
            if(this.hntscr)
                this.hntscr.visible=false;
            if(this.popuphint)
            this.popuphint.visible=false;
            if(this.glow)
                this.glow.visible=false;
            this.backgroundtransp.visible=false;
            if(this.handhint)
                this.handhint.visible=false;
            if(this.glow1)
                this.glow1.destroy();
            if(this.glow2)
                this.glow2.destroy();
            if(this.glow3)
                this.glow3.destroy();
            if(this.glow4)
                this.glow4.destroy();
            if(this.glow5)
                this.glow5.destroy();
            if(this.glowright1)
                this.glowright1.destroy();
            if(this.glowright2)
                this.glowright2.destroy();
            if(this.glow1anim)
                this.glow1anim.destroy();
            if(this.glow2anim)
                    this.glow2anim.destroy();
            if(this.glow3anim)
                    this.glow3anim.destroy();
            if(this.glow4anim)
                    this.glow4anim.destroy();
            if(this.glow5anim)
                    this.glow5anim.destroy();
            if(this.glowright2anim)
                    this.glowright2anim.destroy();
            if(this.glowright1anim)
                    this.glowright1anim.destroy();
            this.hintIcon.inputEnabled = true;                         
    },this);
          
     },   

     closepopup11:function(game){
        this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        this.closebtn.events.onInputDown.add(function(){
            this.closebtn.visible=false;
            this.popupbg.visible=false;
            if(this.popuphint)
            this.popuphint.visible=false;
            this.hintIcon.inputEnabled = true;
            this.backgroundtransp.visible=false;
        },this);
    },

    closepopup12:function(game){
        this.closebtn = game.add.sprite(910,20,'closebtn');
        this.closebtn.scale.setTo(0.8,0.8);
        this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        this.closebtn.events.onInputDown.add(function(){
          
            this.closebtn.visible=false;
            this.popupbg.visible=false;
            this.popupHint.destroy();
            this.backgroundtransp.visible=false;
            if(this.video)
                {
                     _this.something.destroy();
                    // this.video.destroy();
                }
        },this);
        this.hintIcon.inputEnabled = true;
    },

    closepopup13:function(game){
        this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        this.closebtn.events.onInputDown.add(function(){
        this.close=1;
        this.closebtn.visible=false;
        if(this.background)
            this.background.visible=false;
        if(this.popupbg)
        this.popupbg.visible=false;
        if(this.yellowbg)
            this.yellowbg.visible=false;
        if(this.greybg)
            this.greybg.visible=false;
        if(this.hntscr)
            this.hntscr.destroy();
        if(this.popuphint)
        this.popuphint.visible=false;
        if(this.glow)
            this.glow.visible=false;
        if(this.handhint)
            this.handhint.destroy();
        if(this.grptweeneleph){
            this.grptweeneleph.destroy();
        }
        if(this.grptweenrat){
            this.grptweenrat.destroy();
        }
        if(this.grptweeneleph2){
            this.grptweeneleph2.destroy();
        }
        if(this.grptweenrat2){
            this.grptweenrat2.destroy();
        }
        if(this.htno1){
            this.htno1.destroy();
        }
        if(this.htno2){
            this.htno2.destroy();
        }
        if(this.htno3){
            this.htno3.destroy();
        }
        if(this.htno4){
            this.htno4.destroy();
        }
        if(this.blank1){
            this.blank1.destroy();
        }
        if(this.blank2){
            this.blank2.destroy();
        }
        if(_this.tweeneleph2){
            _this.tweeneleph2.visible=false;
        }
        if(_this.tweeneleph){
            _this.tweeneleph.visible=false;
        }
        if(_this.tweenrat2){
            _this.tweenrat2.visible=false;
        }
        if(_this.tweenrat){
            _this.tweenrat.visible=false;
        }
        this.hintIcon.inputEnabled = true;
        this.backgroundtransp.visible=false;   
        },this);
    },

    closepopup14:function(game){
        this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        this.closebtn.events.onInputDown.add(function(){
            this.close=1;
            //if(this.hintflag==0){
                this.closebtn.visible=false;
            if(this.popupbg)
            this.popupbg.visible=false;
            if(this.yellowbg)
                this.yellowbg.visible=false;
            if(this.greybg)
                this.greybg.visible=false;
            if(this.hntscr)
                this.hntscr.destroy();
            if(this.popuphint)
            this.popuphint.visible=false;
            if(this.glow)
                this.glow.visible=false;
            if(this.handhint)
                this.handhint.destroy();
            if(_this.numpad)
                _this.numpad.visible=false;
            this.backgroundtransp.visible=false;
            //}/*else{
              /*  console.log("close after demo");
            }*/
            
        },this);
         this.hintIcon.inputEnabled = true;
         this.speakerbtn.inputEnabled = true;
    },

    closepopup15:function(game){
        this.closebtn = game.add.sprite(910,20,'closebtn');
       this.closebtn.scale.setTo(0.8,0.8);
        this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        this.closebtn.events.onInputDown.add(function(){
            this.closebtn.visible=false;
            this.popupbg.visible=false;
            this.popupHint.destroy();
            this.backgroundtransp.visible=false;
              console.log("Ok1");
            if(this.video)
                {
                      console.log("Ok2");
                    this.somethingV.destroy();
                      console.log("Ok3");
                       //this.video.destroy();
                        console.log("Ok4");
                }
        },this);
    },

    closepopup16:function(game){
       this.closebtn = game.add.sprite(910,20,'closebtn');
        this.closebtn.scale.setTo(0.8,0.8);
        this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        this.closebtn.events.onInputDown.add(function(){
            this.closebtn.visible=false;
            this.popupbg.visible=false;
             this.popupHint.destroy();
            this.backgroundtransp.visible=false;
            if(this.video)
                {
                     this.something.destroy();
                      //this.video.destroy();
                }
        },this);
    },

    closepopup17:function(game){
        this.closebtn = game.add.sprite(910,20,'closebtn');
        this.closebtn.scale.setTo(0.8,0.8);
        this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        this.closebtn.events.onInputDown.add(function(){
            this.closebtn.visible=false;
            this.popupbg.visible=false;
            this.popupHint.destroy();
            this.backgroundtransp.visible=false;
            if(this.video)
                {
                     _this.something.destroy();
                      //this.video.destroy();
                }
        },this);
    },

    closepopup18:function(game){
       /* this.closebtn = game.add.sprite(768,105,'closebtn');
        this.closebtn.scale.setTo(0.60,0.60);
       */ this.closebtn.inputEnabled=true;
       //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        this.hintIcon.inputEnabled = true;
       this.closebtn.events.onInputDown.add(function(){
            console.log("!!!!!!!!!!!!!!!!!!!!!");
                this.closebtn.visible=false;
            if(this.popupbg)
            this.popupbg.visible=false;
            if(this.yellowbg)
                this.yellowbg.visible=false;
            if(this.greybg)
                this.greybg.visible=false;
            if(this.hntscr)
                this.hntscr.destroy();
            if(this.popuphint)
            this.popuphint.visible=false;
            if(this.glow)
                this.glow.visible=false;
            if(this.handhint)
                this.handhint.destroy();
            if(_this.numpad)
                _this.numpad.visible=false;
            this.backgroundtransp.visible=false;
            if(timevents1)
            game.time.events.remove(timevents1);
        if(timevents2)
            game.time.events.remove(timevents2);
        if(timevents3)
            game.time.events.remove(timevents3);
        if(timevents4)
            game.time.events.remove(timevents4);
        if(timevents5)
            game.time.events.remove(timevents5);
        if(timevents6)
            game.time.events.remove(timevents6);
        if(timevents7)
            game.time.events.remove(timevents7);
        if(timevents8)
            game.time.events.remove(timevents8);
        if(timevents9)
            game.time.events.remove(timevents9);
        if(timevents10)
            game.time.events.remove(timevents10);
        },this);
    },

    subfunc1_2:function(game){
        this.close=0;
       this.closebtn = game.add.sprite(910,20,'closebtn');
                                   this.closebtn.scale.setTo(0.8,0.8);
                                 this.popuphint = game.add.sprite(5,5,'popuphint');
                                   this.popuphint.scale.setTo(0.8);
                                   this.popuphint.frame=2; 
                                 
        this.mainfunc1_2(game);
    },
        
  subfunc2_2:function(game){
        this.close=0;
       this.closebtn = game.add.sprite(910,20,'closebtn');
                                   this.closebtn.scale.setTo(0.8,0.8);
                                 this.popuphint = game.add.sprite(5,5,'popuphint');
                                   this.popuphint.scale.setTo(0.8);
                                   this.popuphint.frame=3; 
                                 
        this.mainfunc2_2(game);
    },
    
    subfunc3_2:function(game){
        this.close=0;
       this.closebtn = game.add.sprite(910,20,'closebtn');
                                   this.closebtn.scale.setTo(0.8,0.8);
                                 this.popuphint = game.add.sprite(5,5,'popuphint');
                                   this.popuphint.scale.setTo(0.8);
                                   this.popuphint.frame=2; 
                                 
        this.mainfunc3_2(game);
    },
    
    subfunc4_2:function(game){
        this.close=0;
       this.closebtn = game.add.sprite(910,20,'closebtn');
                                   this.closebtn.scale.setTo(0.8,0.8);
                                 this.popuphint = game.add.sprite(5,5,'popuphint');
                                   this.popuphint.scale.setTo(0.8);
                                   this.popuphint.frame=3; 
                                 
        this.mainfunc4_2(game);
    },
    
    
  mainfunc1_2:function(game){
        this.closepopup_2(game); 
                                       this.yellowcon1=game.add.sprite(345,195,'Level321_Coin1');
                                       this.yellowcon1.scale.setTo(0.65,0.65);
                                       this.yellowcon2=game.add.sprite(345,185,'Level321_Coin1');
                                       this.yellowcon2.scale.setTo(0.65,0.65);
                                       this.yellowcon3=game.add.sprite(345,175,'Level321_Coin1');
                                       this.yellowcon3.scale.setTo(0.65,0.65);
                                       
     
                                       this.bluecoin1 = game.add.sprite(190,195,'Level321_Coin10');
                                       this.bluecoin1.scale.setTo(0.65,0.65);
                                       this.bluecoin2= game.add.sprite(190,185,'Level321_Coin10');
                                       this.bluecoin2.scale.setTo(0.65,0.65);
                                       this.bluecoin3 = game.add.sprite(190,175,'Level321_Coin10');
                                       this.bluecoin3.scale.setTo(0.65,0.65);
     
                                        game.time.events.add(500,function(){
                                        this.handhint1 = game.add.sprite(220,310,'hand');
                                        this.handhint1.scale.setTo(0.65,0.65);
                                        
                                        game.time.events.add(500,function(){
                                           _this.tween1 = game.add.tween(this.handhint1).to({x:575,y:200},800,'Linear',true,0);
                                           _this.tween2 = game.add.tween(this.bluecoin3).to({x:555,y:70},800,'Linear',true,0);
                                           _this.tween2.onComplete.add(function(){
                                                game.time.events.add(500,function(){
                                                    _this.tween3 = game.add.tween(this.handhint1).to({x:230,y:310},800,'Linear',true,0);
                                                    _this.tween3.onComplete.add(function(){
                                                    this.tween4 = game.add.tween(this.handhint1).to({x:785,y:200},1000,'Linear',true,0);
                                                    _this.tween5 = game.add.tween(this.bluecoin2).to({x:765,y:70},1000,'Linear',true,0);
                                                  _this.tween5.onComplete.add(function(){  
                                                     game.time.events.add(500,function(){
                                                    _this.tween6 = game.add.tween(this.handhint1).to({x:220,y:330},800,'Linear',true,0);
                                                    _this.tween6.onComplete.add(function(){
                                                     this.tween7 = game.add.tween(this.handhint1).to({x:580,y:320},1000,'Linear',true,0);
                                                    _this.tween8 = game.add.tween(this.bluecoin1).to({x:555,y:190},1000,'Linear',true,0);
                                                    _this.tween8.onComplete.add(function(){   
                                                        game.time.events.add(500,function(){
                                                    _this.tween11 = game.add.tween(this.handhint1).to({x:370,y:310},800,'Linear',true,0);
                                                     _this.tween11.onComplete.add(function(){ 
                                                            this.yellowcon1.destroy(); 
                                                             this.yellowcon2.destroy();
                                                             this.yellowcon3.destroy(); 
                                                                        if(this.close==0){
                                                                            this.mainfun1_2(game);
                                                                        }else{
                                                                            this.hintflag=0;
                                                                            this.closepopup_2(game);
                                                                        }
                                                                          
                                                                         
                                                                         },this); },this); 
                                                                        },this);  },this);
                                                                      },this);  },this); 
                                                                    },this);  },this); 
                                                                },this);    },this); },this);
                                                            
                                                    
    }, 
  mainfun1_2: function(game){

             
                                                      this.yellowcoin1=game.add.sprite(345,195,'Level321_Coin1');
                                                      this.yellowcoin1.scale.setTo(0.65,0.65);
                                                      this.yellowcoin2=game.add.sprite(345,185,'Level321_Coin1');
                                                      this.yellowcoin2.scale.setTo(0.65,0.65);
                                                      this.yellowcoin3=game.add.sprite(345,175,'Level321_Coin1');
                                                      this.yellowcoin3.scale.setTo(0.65,0.65);
                                                         this.handhint1.destroy();
                                                         this.handhint = game.add.sprite(370,310,'hand');
                                                         this.handhint.scale.setTo(0.65,0.65);
                                                      this.tween12 = game.add.tween(this.handhint).to({x:630,y:200},1000,'Linear',true,0);
                                                   _this.tween13 = game.add.tween(this.yellowcoin3).to({x:610,y:68},1000,'Linear',true,0);
                                                  _this.tween13.onComplete.add(function(){  
                                                     game.time.events.add(500,function(){
                                                    _this.tween14 = game.add.tween(this.handhint).to({x:370,y:320},800,'Linear',true,0);
                                                     _this.tween14.onComplete.add(function(){
                                                    this.tween15 = game.add.tween(this.handhint).to({x:840,y:200},1000,'Linear',true,0);
                                                   _this.tween16 = game.add.tween(this.yellowcoin2).to({x:820,y:68},1000,'Linear',true,0);  
                                                    _this.tween16.onComplete.add(function(){  
                                                     game.time.events.add(500,function(){
                                                    _this.tween17 = game.add.tween(this.handhint).to({x:370,y:330},800,'Linear',true,0);
                                                     _this.tween17.onComplete.add(function(){
                                                      this.tween18 = game.add.tween(this.handhint).to({x:630,y:320},1000,'Linear',true,0);
                                                     _this.tween19 = game.add.tween(this.yellowcoin1).to({x:610,y:188},1000,'Linear',true,0);
                                                     _this.tween19.onComplete.add(function(){  
                                                                game.time.events.add(500,function(){
                                                                    this.handhint.destroy();
                                                                    this.yellowcoin1.visible=false;
                                                                    this.yellowcoin2.visible=false;
                                                                    this.yellowcoin3.visible=false;
                                                                    this.bluecoin1.visible=false;
                                                                    this.bluecoin2.visible=false;
                                                                    this.bluecoin3.visible=false;
                                                                    game.time.events.add(500,function(){
                                                                        if(this.close==0){
                                                                            this.mainfunc1_2(game);
                                                                        }else{
                                                                            this.hintflag=0;
                                                                            this.closepopup_2(game);
                                                                        }
                                                                    },this); },this);
                                                                    },this); },this);
                                                                },this); },this); 
                                                            },this); },this);
                                                          },this); 
                                                                
         },
   
    
     mainfunc2_2:function(game){
        this.closepopup_2(game);
      
                                        this.tray4.frame=1;
                                       
                                        this.handhint2 = game.add.sprite(575,200,'Unity12_1handclick');
                                        this.handhint2.scale.setTo(0.65,0.65);
         
                                        this.an1 = game.add.sprite(693,295,'Level321_numberSmall17_2');
                                        this.an1.scale.setTo(0.85,0.85); 
                                        this.an1.frame=1;
                                        this.an1.visible=false;
                                        this.an1.fontWeight = 'bold';
                                        
                                        this.an2 = game.add.sprite(707,295,'Level321_numberSmall17_2');
                                        this.an2.scale.setTo(0.85,0.85); 
                                        this.an2.frame=1;
                                        this.an2.visible=false;
                                        this.an2.fontWeight = 'bold';
         
                                        game.time.events.add(500,function(){
                                            _this.tween1 = game.add.tween(this.handhint2).to({x:630,y:200},500,'Linear',true,0);
                                            _this.tween1.onComplete.add(function(){
                                                game.time.events.add(500,function(){
                                                _this.tween2 = game.add.tween(this.handhint2).to({x:105,y:455},500,'Linear',true,0);
                                               _this.tween2.onComplete.add(function(){
                                                   game.time.events.add(500,function(){
                                                       this.tray4.frame=0;
                                                       this.handhint2.animations.add('press');
                                                       this.handhint2.animations.play('press', 2.5, true);
                                                          game.time.events.add(500,function(){ 
                                                              this.an1.visible=true;
                                                    game.time.events.add(800,function(){
                                                         this.an2.visible=true;
                                                     game.time.events.add(500,function(){
                                                         this.handhint2.visible=false;
                                                         this.an1.visible=false;
                                                         this.an2.visible=false;
                                                            game.time.events.add(1000,function(){
                                                              if(this.close==0){
                                                                  this.mainfunc2_2(game);
                                                                    }else{
                                                                      this.hintflag=0;
                                                                       this.closepopup_2(game);
                                                                         }
                                                                            
                                                                 },this); },this);
                                                             },this);  },this);    
                                                        },this);   },this); 
                                              },this);  },this); },this);
    }, 
    
    mainfunc3_2:function(game){
        this.closepopup_2(game); 
                                       this.yellowcon1=game.add.sprite(345,195,'Level321_Coin1');
                                       this.yellowcon1.scale.setTo(0.65,0.65);
                                       this.yellowcon2=game.add.sprite(345,185,'Level321_Coin1');
                                       this.yellowcon2.scale.setTo(0.65,0.65);
                                       this.yellowcon3=game.add.sprite(345,175,'Level321_Coin1');
                                       this.yellowcon3.scale.setTo(0.65,0.65);
                                       this.yellowcon4=game.add.sprite(345,165,'Level321_Coin1');
                                       this.yellowcon4.scale.setTo(0.65,0.65);
                                       
     
                                       this.bluecoin1 = game.add.sprite(190,195,'Level321_Coin10');
                                       this.bluecoin1.scale.setTo(0.65,0.65);
                                       this.bluecoin2= game.add.sprite(190,185,'Level321_Coin10');
                                       this.bluecoin2.scale.setTo(0.65,0.65);
                                       this.bluecoin3 = game.add.sprite(190,175,'Level321_Coin10');
                                       this.bluecoin3.scale.setTo(0.65,0.65);
     
                                        game.time.events.add(500,function(){
                                        this.handhint1 = game.add.sprite(220,310,'hand');
                                        this.handhint1.scale.setTo(0.65,0.65);
                                        
                                        game.time.events.add(500,function(){
                                           _this.tween1 = game.add.tween(this.handhint1).to({x:575,y:200},800,'Linear',true,0);
                                           _this.tween2 = game.add.tween(this.bluecoin3).to({x:555,y:70},800,'Linear',true,0);
                                           _this.tween2.onComplete.add(function(){
                                                game.time.events.add(500,function(){
                                                    _this.tween3 = game.add.tween(this.handhint1).to({x:230,y:310},800,'Linear',true,0);
                                                    _this.tween3.onComplete.add(function(){
                                                    this.tween4 = game.add.tween(this.handhint1).to({x:785,y:200},1000,'Linear',true,0);
                                                    _this.tween5 = game.add.tween(this.bluecoin2).to({x:765,y:70},1000,'Linear',true,0);
                                                  _this.tween5.onComplete.add(function(){  
                                                     game.time.events.add(500,function(){
                                                    _this.tween6 = game.add.tween(this.handhint1).to({x:220,y:330},800,'Linear',true,0);
                                                    _this.tween6.onComplete.add(function(){
                                                     this.tween7 = game.add.tween(this.handhint1).to({x:580,y:320},1000,'Linear',true,0);
                                                    _this.tween8 = game.add.tween(this.bluecoin1).to({x:555,y:190},1000,'Linear',true,0);
                                                    _this.tween8.onComplete.add(function(){ 
                                                     game.time.events.add(500,function(){
                                                    _this.tween11 = game.add.tween(this.handhint1).to({x:370,y:300},800,'Linear',true,0);
                                                     _this.tween11.onComplete.add(function(){
                                                        this.yellowcon1.destroy(); 
                                                        this.yellowcon2.destroy();
                                                        this.yellowcon3.destroy();
                                                        this.yellowcon4.destroy();
                                                                        if(this.close==0){
                                                                            this.mainfun3_2(game);
                                                                        }else{
                                                                            this.hintflag=0;
                                                                            this.closepopup_2(game);
                                                                        }
                                                                          },this); },this);
                                                                          },this); },this);
                                                                          },this); },this); 
                                                                         },this); },this); 
                                                                        },this);  },this);
                                                                      },this); 
    }, 
     mainfun3_2: function(game){
                                                      this.yellowcoin1=game.add.sprite(345,195,'Level321_Coin1');
                                                      this.yellowcoin1.scale.setTo(0.65,0.65);
                                                      this.yellowcoin2=game.add.sprite(345,185,'Level321_Coin1');
                                                      this.yellowcoin2.scale.setTo(0.65,0.65);
                                                      this.yellowcoin3=game.add.sprite(345,175,'Level321_Coin1');
                                                      this.yellowcoin3.scale.setTo(0.65,0.65);
                                                      this.yellowcoin4=game.add.sprite(345,165,'Level321_Coin1');
                                                      this.yellowcoin4.scale.setTo(0.65,0.65);
                                                         this.handhint1.destroy();
                                                         this.handhint = game.add.sprite(370,300,'hand');
                                                         this.handhint.scale.setTo(0.65,0.65);
                                                      this.tween12 = game.add.tween(this.handhint).to({x:630,y:200},1000,'Linear',true,0);
                                                   _this.tween13 = game.add.tween(this.yellowcoin4).to({x:610,y:68},1000,'Linear',true,0);
                                                  _this.tween13.onComplete.add(function(){  
                                                     game.time.events.add(500,function(){
                                                    _this.tween14 = game.add.tween(this.handhint).to({x:370,y:310},800,'Linear',true,0);
                                                     _this.tween14.onComplete.add(function(){
                                                    this.tween15 = game.add.tween(this.handhint).to({x:840,y:200},1000,'Linear',true,0);
                                                   _this.tween16 = game.add.tween(this.yellowcoin3).to({x:820,y:68},1000,'Linear',true,0);  
                                                    _this.tween16.onComplete.add(function(){  
                                                     game.time.events.add(500,function(){
                                                    _this.tween17 = game.add.tween(this.handhint).to({x:370,y:320},800,'Linear',true,0);
                                                     _this.tween17.onComplete.add(function(){
                                                      this.tween18 = game.add.tween(this.handhint).to({x:630,y:320},1000,'Linear',true,0);
                                                     _this.tween19 = game.add.tween(this.yellowcoin2).to({x:610,y:188},1000,'Linear',true,0);
                                                     _this.tween19.onComplete.add(function(){  
                                                                game.time.events.add(500,function(){
                                                                    this.handhint.destroy();
                                                                    this.yellowcoin1.visible=false;
                                                                    this.yellowcoin2.visible=false;
                                                                    this.yellowcoin3.visible=false;
                                                                    this.yellowcoin4.visible=false;
                                                                    this.bluecoin1.visible=false;
                                                                    this.bluecoin2.visible=false;
                                                                    this.bluecoin3.visible=false;
                                                                    game.time.events.add(500,function(){
                                                                        if(this.close==0){
                                                                            this.mainfunc3_2(game);
                                                                        }else{
                                                                            this.hintflag=0;
                                                                            this.closepopup_2(game);
                                                                        }
                                                                       },this); },this);
                                                         },this); },this);
                                                         },this); },this);
                                                         },this); },this);
                                                      },this);
        },
    
      mainfunc4_2:function(game){
        this.closepopup_2(game);
      
                                        this.tray4.frame=1;
                                        this.handhint2 = game.add.sprite(575,200,'Unity12_1handclick');
                                        this.handhint2.scale.setTo(0.65,0.65);
         
                                        this.an1 = game.add.sprite(693,295,'Level321_numberSmall17_2');
                                        this.an1.scale.setTo(0.85,0.85); 
                                        this.an1.frame=1;
                                        this.an1.visible=false;
                                        this.an1.fontWeight = 'bold';
                                        
                                        this.an2 = game.add.sprite(707,295,'Level321_numberSmall17_2');
                                        this.an2.scale.setTo(0.85,0.85); 
                                        this.an2.frame=1;
                                        this.an2.visible=false;
                                        this.an2.fontWeight = 'bold';
          
                                        this.an3 = game.add.sprite(110,45,'Level321_numberSmall17_2');
                                        this.an3.scale.setTo(0.85,0.85); 
                                        this.an3.frame=1;
                                        this.an3.visible=false;
                                        this.an3.fontWeight = 'bold';
         
                                        game.time.events.add(500,function(){
                                            _this.tween1 = game.add.tween(this.handhint2).to({x:630,y:200},500,'Linear',true,0);
                                            _this.tween1.onComplete.add(function(){
                                                game.time.events.add(500,function(){
                                                _this.tween2 = game.add.tween(this.handhint2).to({x:105,y:455},500,'Linear',true,0);
                                               _this.tween2.onComplete.add(function(){
                                                    game.time.events.add(500,function(){
                                                        this.tray4.frame=0;
                                                       this.handhint2.animations.add('press');
                                                       this.handhint2.animations.play('press', 2.5, true);
                                                          game.time.events.add(500,function(){ 
                                                              this.an1.visible=true;
                                                       this.handhint2.animations.add('press');
                                                       this.handhint2.animations.play('press', 2, false);
                                                    game.time.events.add(800,function(){
                                                         this.an2.visible=true;
                                                    game.time.events.add(500,function(){
                                                    _this.tween3 = game.add.tween(this.handhint2).to({x:365,y:330},500,'Linear',true,0);
                                                    _this.tween3.onComplete.add(function(){   
                                                   game.time.events.add(500,function(){
                                                  _this.tween4 = game.add.tween(this.handhint2).to({x:105,y:455},500,'Linear',true,0);
                                                 _this.tween4.onComplete.add(function(){
                                                   game.time.events.add(500,function(){
                                                       this.handhint2.animations.add('press');
                                                       this.handhint2.animations.play('press', 1.5, true);
                                                           this.an3.visible=true;
                                                   game.time.events.add(500,function(){
                                                         this.handhint2.visible=false;
                                                         this.an1.visible=false;
                                                         this.an2.visible=false;
                                                         this.an3.visible=false;
                                                            game.time.events.add(1000,function(){
                                                              if(this.close==0){
                                                                  this.mainfunc4_2(game);
                                                                    }else{
                                                                      this.hintflag=0;
                                                                       this.closepopup_2(game);
                                                                         }
                                                                       },this);     
                                                                 },this); },this);
                                                                 },this); },this);
                                                                },this); },this);
                                                              },this); },this);
                                                             },this);  },this);    
                                                        },this);   },this); 
                                              },this);  
    }, 
    
    

     closepopup_2:function(game){
        this.closebtn.inputEnabled=true;
        //this.closebtn.input.priorityID = 10;
        this.closebtn.input.useHandCursor = true;
        this.closebtn.events.onInputDown.add(function(){
            game.time.events.removeAll();
            this.close=1; 
            //if(this.hintflag==0){
                this.closebtn.visible=false;
            if(this.popupbg)
            this.popupbg.visible=false;
            if(this.yellowbg)
                this.yellowbg.visible=false;
            if(this.popuphint)
            this.popuphint.visible=false;
            if(this.glow)
                this.glow.visible=false;
            if(this.handhint)
                this.handhint.destroy();
             if(this.handhint2)
                this.handhint2.destroy();
            if(this.backgroundtransp)
            this.backgroundtransp.visible=false;
            if(this.yellowcoin1)
            this.yellowcoin1.destroy();
            if(this.yellowcoin2)
            this.yellowcoin2.destroy();
            if(this.yellowcoin3)
            this.yellowcoin3.destroy();
            if(this.yellowcoin4)
            this.yellowcoin4.destroy();
            if(this.bluecoin1)
            this.bluecoin1.destroy();
            if(this.bluecoin2)
            this.bluecoin2.destroy();
            if(this.bluecoin3)
            this.bluecoin3.destroy();
            if(this.yellowcon1)
            this.yellowcon1.destroy();
            if(this.yellowcon2)
            this.yellowcon2.destroy();
            if(this.yellowcon3)
            this.yellowcon3.destroy();
            if(this.yellowcon4)
            this.yellowcon4.destroy();
            if(this.handhint1)
            this.handhint1.destroy();
            if(this.square)
            this.square.destroy();
            if(this.n1)
            this.n1.destroy();
            if(this.n2)
            this.n2.destroy();
            if(this.n3)
            this.n3.destroy();
            if(this.n4)
            this.n4.destroy();
            if(this.tray4)
                {
                    
                     this.tray4.frame=0;
                this.handhint2.animations.stop(null,true);
                    this.tray4.destroy();
                }
            if(this.tray1)
            this.tray1.destroy();
            if(this.tray2)
            this.tray2.destroy();
            if(this.tray3)
            this.tray3.destroy();
            if(this.coinpan)
            this.coinpan.destroy();
            if(this.coinslot)
            this.coinslot.destroy();
            if(this.num)this.num.destroy();
            if(this.numb)this.numb.destroy();
            if(this.numb1)this.numb1.destroy();
            if(this.an1)this.an1.destroy();
            if(this.an2)this.an2.destroy();
            if(this.an3)this.an3.destroy();
            if(this.bg)
            this.bg.destroy();
            this.hintIcon.inputEnabled = true;
        },this);
         
         this.speakerbtn.inputEnabled = true;
    },

};
