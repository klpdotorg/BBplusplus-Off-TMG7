Game.preloader_NSF_CUIS_G7=function(game){
	this.preloadBar=null;
};
        
var chime,clockTick;
Game.preloader_NSF_CUIS_G7.prototype={
	preload:function(){
        this.load.video('nsfcuis_1',window.baseUrl + 'assets/demoVideos/NSF-CUIS-G7_1.mp4');   //* include demo video of game.\
        this.load.video('nsfcuis_2',window.baseUrl + 'assets/demoVideos/NSF-CUIS-G7_2.mp4');   //* include demo video of game.
        this.load.image('skipArrow',window.baseUrl + 'assets/commonAssets/skipArrow.png');
        
        this.load.atlas('bulb',window.baseUrl + 'assets/commonAssets/bulb.png',null,NSF_CUIS_G7_JSON.bulbBtnJson);
        
	this.load.atlas('backbtn',window.baseUrl + 'assets/commonAssets/backbtn.png' ,null,NSF_CUIS_G7_JSON.backbtnJson);
        this.load.atlas('CommonSpeakerBtn',window.baseUrl + 'assets/commonAssets/speaker.png' ,null,NSF_CUIS_G7_JSON.speakerJson);
        this.load.atlas('starAnim',window.baseUrl + 'assets/commonAssets/starAnim.png',null,NSF_CUIS_G7_JSON.starAnimJson);
        this.load.atlas('replay',window.baseUrl + 'assets/commonAssets/reply.png' ,null,NSF_CUIS_G7_JSON.replyJson);
        
        this.load.image('navBar',window.baseUrl + 'assets/commonAssets/navBar.png');
        this.load.image('timebg',window.baseUrl + 'assets/commonAssets/timebg.png');
        this.load.image('hand',window.baseUrl + 'assets/commonAssets/hand.png');

        this.load.atlas('CommonHomeBtn',window.baseUrl + 'assets/commonAssets/homeBtn.png', null, NSF_CUIS_G7_JSON.homebtnJson);
        this.load.atlas('CommonNextBtn',window.baseUrl + 'assets/commonAssets/nextBtn.png', null, NSF_CUIS_G7_JSON.nextbtnJson);
        
        this.load.image('BG1', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/BG1.png');
        this.load.atlas('Textbox_1', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/text box_1.png', null, NSF_CUIS_G7_JSON.textBox_1JSON);
   
        this.load.image('Table_1', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/box_1.png');
        this.load.image('Table_2', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/box_2.png');

        this.load.image('w1', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/white colour.png');
        this.load.image('r2', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/Red colour.png');
        this.load.image('lg3', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/Light green colour.png');
        this.load.image('p4', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/Purple colour.png');
        this.load.image('y5', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/yellow colour.png');
        this.load.image('dg6', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/dark green colour.png');
        this.load.image('dc7', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/dark colour.png');
        this.load.image('b8', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/brown colour.png');
        this.load.image('bl9', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/blue colour.png');
        this.load.image('o10', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/Orange colour.png');

        this.load.image('textBox1', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/text box.png');
        this.load.image('textbox2', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/white text box 1.png');
        this.load.atlas('swap', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/Btn_1.png',null,NSF_CUIS_G7_JSON.swap_JSON);
        this.load.atlas('swapEraser', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/Btn_2.png',null,NSF_CUIS_G7_JSON.eraser_JSON);
        this.load.atlas('eraser1', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/Ereser.png');
        this.load.image('yellow_bg', window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/yellow text box.png');

        //Text box_32
        this.load.atlas('TickBtn',window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/TickBtn.png',null,NSF_CUIS_G7_JSON.TickbtnJson);

         this.load.image('numpadbg',window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/numbg.png');
        this.load.atlas('Numberpad',window.baseUrl + 'assets/gradeAssets/NSF-CUIS-G7/number pad.png',null,NSF_CUIS_G7_JSON.numberpadJson);
        },

	create:function(){
		
		this.state.start('NSF_CUIS_G7level1');   
    },
}