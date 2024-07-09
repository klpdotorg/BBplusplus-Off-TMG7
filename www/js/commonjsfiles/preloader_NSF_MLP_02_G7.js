Game.preloader_NSF_MLP_02_G7=function(game){
	this.preloadBar=null;
};
        
var chime,clockTick;
Game.preloader_NSF_MLP_02_G7.prototype={
	preload:function(){
        this.load.video('ML1_1',window.baseUrl + 'assets/demoVideos/NSF_MLP_01_G7.mp4');   //* include demo video of game.//
        this.load.image('skipArrow', window.baseUrl + 'assets/commonAssets/skipArrow.png');
        
        this.load.atlas('bulb', window.baseUrl + 'assets/commonAssets/bulb.png',null,NSF_MLP_02_G7_JSON.bulbBtnJson);
        
	this.load.atlas('backbtn', window.baseUrl + 'assets/commonAssets/backbtn.png' ,null,NSF_MLP_02_G7_JSON.backbtnJson);
        this.load.atlas('CommonSpeakerBtn', window.baseUrl + 'assets/commonAssets/speaker.png' ,null,NSF_MLP_02_G7_JSON.speakerJson);
        this.load.atlas('starAnim', window.baseUrl + 'assets/commonAssets/starAnim.png',null,NSF_MLP_02_G7_JSON.starAnimJson);
        this.load.atlas('replay', window.baseUrl + 'assets/commonAssets/reply.png' ,null,NSF_MLP_02_G7_JSON.replyJson);

        this.load.atlas('allColor', window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/all colour new.png' ,null,NSF_MLP_02_G7_JSON.allColorJson);
        
        this.load.image('navBar', window.baseUrl + 'assets/commonAssets/navBar.png');
        this.load.image('timebg', window.baseUrl + 'assets/commonAssets/timebg.png');
        this.load.image('hand', window.baseUrl + 'assets/commonAssets/hand.png');

       
        this.load.atlas('reverse',window.baseUrl +'assets/gradeAssets/NSF-MLP-02-G7/Btn_1.png',null,NSF_MLP_02_G7_JSON.btn_1Json);

        this.load.atlas('CommonHomeBtn', window.baseUrl + 'assets/commonAssets/homeBtn.png', null, NSF_MLP_02_G7_JSON.homebtnJson);
        this.load.atlas('CommonNextBtn', window.baseUrl + 'assets/commonAssets/nextBtn.png', null, NSF_MLP_02_G7_JSON.nextbtnJson);

        this.load.atlas('eraser', window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/Btn_2.png', null, NSF_MLP_02_G7_JSON.eraserJson);

        this.load.atlas('allColor', window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/all colour new.png', null, NSF_MLP_02_G7_JSON.allColorJson); 
        
        // this.load.atlas('chesscoin1', window.baseUrl + 'assets/gradeAssets/NSF-MLP-01-G7/Chess Coins_1.png', null, NSF_MLP_01_G7_JSON.Chesscoin1Json);
        // this.load.atlas('chesscoin2', window.baseUrl + 'assets/gradeAssets/NSF-MLP-01-G7/Chess Coins_2.png', null, NSF_MLP_01_G7_JSON.Chesscoin2Json);
        // this.load.atlas('textbox3', window.baseUrl + 'assets/gradeAssets/NSF-MLP-01-G7/new box.png',null,NSF_MLP_01_G7_JSON.SquareBoxJson);

        this.load.image('BG1',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/Bg.png');
        // this.load.image('Textbox_1',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-01-G7/Text box_1.png');

        this.load.image('Text box_2',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/text box2.png');
        this.load.image('Text box_2cpy',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/text box2cpy.png');

        this.load.atlas('white-box',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/new box.png', null, NSF_MLP_02_G7_JSON.SquareBoxJson);

        this.load.image('Table_1',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/box_1.png');
        this.load.image('Table_2',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/box_2.png');

        this.load.image('yellowTextbox',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/yellow text box.png');
        this.load.atlas('reverse',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/Btn_1.png', null, NSF_MLP_02_G7_JSON.reverseJson);

        this.load.image('Text box_1',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/text box1.png');
        this.load.image('Text box_2',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/text box2.png');

        this.load.image('Text box_4',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/text box4.png'); 
        
        this.load.image('Text box_3',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/text box3.png');
        this.load.image('box_3',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/box_3.png');
        this.load.image('box_1',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/box_1.png');
        this.load.image('box_2',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/box_2.png');
        // this.load.image('textbox2',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-01-G7/Text box_2.png');
        // this.load.image('textB',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-01-G7/white text box 1.png');
        // this.load.image('eraser1',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-01-G7/Ereser.png');
        // this.load.image('eraserBg',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-01-G7/Text box_32.png');

        //Text box_32
        this.load.atlas('TickBtn',  window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/TickBtn.png', null, NSF_MLP_02_G7_JSON.tickJson);

        this.load.image('numpadbg', window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/numbg.png');
        this.load.atlas('Numberpad', window.baseUrl + 'assets/gradeAssets/NSF-MLP-02-G7/number pad.png',null,NSF_MLP_02_G7_JSON.numberpadJson);
        },

	create:function(){
		
		this.state.start('NSF_MLP_02_G7level1');   
    },
}