Game.preloader_GMLA_02_G7=function(game){
	this.preloadBar=null;
};
        
var chime,clockTick; 
Game.preloader_GMLA_02_G7.prototype={
	preload:function(){
        // this.load.video('gmpar01_1','demoVideos/GMLA-02-G7_1.mp4');   //* include demo video of nsf-5 game.
        // this.load.video('gmpar01_2','demoVideos/GMLA-02-G7_2.mp4');   //* include demo video of nsf-5 game.
        // this.load.video('gmpar01_3','demoVideos/GMLA-02-G7_3.mp4');   //* include demo video of nsf-5 game.
        // this.load.video('gmpar01_4','demoVideos/GMLA-02-G7_4.mp4');   //* include demo video of nsf-5 game.
        this.load.image('skipArrow',window.baseUrl + 'assets/commonAssets/skipArrow.png');
        this.load.image('close', window.baseUrl + 'assets/commonAssets/close.png');

        this.load.atlas('bulb',window.baseUrl + 'assets/commonAssets/bulb.png',null,GMLA_02_G7_JSON.bulbBtnJson);
		
	this.load.atlas('backbtn',window.baseUrl + 'assets/commonAssets/backbtn.png' ,null, GMLA_02_G7_JSON.backbtnJson);
        this.load.atlas('CommonSpeakerBtn',window.baseUrl + 'assets/commonAssets/speaker.png' ,null, GMLA_02_G7_JSON.speakerJson);
        this.load.atlas('starAnim',window.baseUrl + 'assets/commonAssets/starAnim.png',null, GMLA_02_G7_JSON.starAnimJson);
        this.load.atlas('replay',window.baseUrl + 'assets/commonAssets/reply.png' ,null, GMLA_02_G7_JSON.replyJson);
        
        this.load.image('navBar',window.baseUrl + 'assets/commonAssets/navBar.png');
        this.load.image('timebg',window.baseUrl + 'assets/commonAssets/timebg.png'); 
        this.load.image('hand',window.baseUrl + 'assets/commonAssets/hand.png');

        this.load.atlas('CommonHomeBtn',window.baseUrl + 'assets/commonAssets/homeBtn.png', null, GMLA_02_G7_JSON.homebtnJson);
        this.load.atlas('CommonNextBtn',window.baseUrl + 'assets/commonAssets/nextBtn.png', null, GMLA_02_G7_JSON.nextbtnJson);
      
        this.load.image('bg', window.baseUrl + 'assets/gradeAssets/GMLA-02-G7/BG.png');

        this.load.image('watermelon', window.baseUrl + 'assets/gradeAssets/GMLA-02-G7/water melon.png');
        this.load.image('pizza', window.baseUrl + 'assets/gradeAssets/GMLA-02-G7/Pizza_1.png');
        this.load.image('pie', window.baseUrl + 'assets/gradeAssets/GMLA-02-G7/Pizza_2.png');
        this.load.image('digree', window.baseUrl + 'assets/gradeAssets/GMLA-02-G7/digree.png');
        this.load.atlas('box_1',window.baseUrl + 'assets/gradeAssets/GMLA-02-G7/box_1.png',null,GMLA_02_G7_JSON.box_1Json);
        this.load.atlas('box_2', window.baseUrl + 'assets/gradeAssets/GMLA-02-G7/box_2.png',null,GMLA_02_G7_JSON.box_2Json); 
        this.load.atlas('TickBtn',window.baseUrl + 'assets/gradeAssets/GMLA-02-G7/TickBtn.png',null,GMLA_02_G7_JSON.TickbtnJson);
        
        this.load.image('numpadbg',window.baseUrl + 'assets/gradeAssets/GMLA-02-G7/numbg.png');
        this.load.atlas('Numberpad',window.baseUrl + 'assets/gradeAssets/GMLA-02-G7/number pad.png',null,GMLA_02_G7_JSON.numberpadJson);
        
        // this.load.image('prev2', window.baseUrl + 'assets/gradeAssets/GMLA-02-G7/arrow_1.png');
        // this.load.image('next2', window.baseUrl + 'assets/gradeAssets/GMLA-02-G7/arrow_2.png');
        // this.load.image('close2', window.baseUrl + 'assets/gradeAssets/GMLA-02-G7/close btn.png');

        this.load.image('prev', window.baseUrl + 'assets/gradeAssets/GMLA-02-G7/backward.png');
        this.load.image('next', window.baseUrl + 'assets/gradeAssets/GMLA-02-G7/forward.png');
        // this.load.image('close', window.baseUrl + 'assets/gradeAssets/GMLA-02-G7/close.png');

        this.load.image('bgbox2', window.baseUrl + 'assets/gradeAssets/GMLA-02-G7/box2.png');

},

	create:function(){
		
		this.state.start('GMLA_02_G7level1');  
    },
}