Game.preloader_AL_SORT1_G7 = function (game) {
        this.preloadBar = null;
};

var chime, clockTick;
Game.preloader_AL_SORT1_G7.prototype = {
        preload: function () {
                // this.load.video('AL-SORT1-G7_1', 'demoVideos/AL-SORT1-G7.mp4');   //* include demo video of game.
                this.load.image('skipArrow',  window.baseUrl +'assets/commonAssets/skipArrow.png');

                this.load.atlas('bulb',  window.baseUrl +'assets/commonAssets/bulb.png', null, AL_SORT1_G7_JSON.bulbBtnJson);

                this.load.atlas('backbtn',  window.baseUrl +'assets/commonAssets/backbtn.png', null, AL_SORT1_G7_JSON.backbtnJson);
                this.load.atlas('CommonSpeakerBtn',  window.baseUrl +'assets/commonAssets/speaker.png', null, AL_SORT1_G7_JSON.speakerJson);
                this.load.atlas('starAnim',  window.baseUrl +'assets/commonAssets/starAnim.png', null, AL_SORT1_G7_JSON.starAnimJson);
                this.load.atlas('replay',  window.baseUrl +'assets/commonAssets/reply.png', null, AL_SORT1_G7_JSON.replyJson);

                this.load.image('navBar',  window.baseUrl +'assets/commonAssets/navBar.png');
                this.load.image('timebg',  window.baseUrl +'assets/commonAssets/timebg.png');
                 this.load.image('hand',  window.baseUrl +'assets/commonAssets/hand.png');

                this.load.atlas('CommonHomeBtn',  window.baseUrl +'assets/commonAssets/homeBtn.png', null, AL_SORT1_G7_JSON.homebtnJson);
                this.load.atlas('CommonNextBtn',  window.baseUrl +'assets/commonAssets/nextBtn.png', null, AL_SORT1_G7_JSON.nextbtnJson);

                //game grade assets


                this.load.image('BG',  window.baseUrl +'assets/gradeAssets/AL-SORT1-G7/Bg.png');
                this.load.image('panel',  window.baseUrl +'assets/gradeAssets/AL-SORT1-G7/blue panle.png');
                

                this.load.image('greenBall',  window.baseUrl +'assets/gradeAssets/AL-SORT1-G7/green ball.png');
                this.load.image('pinkBall',  window.baseUrl +'assets/gradeAssets/AL-SORT1-G7/pink ball.png');
                this.load.image('orangeBall', window.baseUrl +'assets/gradeAssets/AL-SORT1-G7/Orange ball.png');

                this.load.image('wheelG',  window.baseUrl +'assets/gradeAssets/AL-SORT1-G7/weel 1.png');
                this.load.image('wheelO',  window.baseUrl +'assets/gradeAssets/AL-SORT1-G7/weel 2.png');
                this.load.image('bombG',  window.baseUrl +'assets/gradeAssets/AL-SORT1-G7/weel 4.png');
                this.load.image('bombO',  window.baseUrl +'assets/gradeAssets/AL-SORT1-G7/weel 3.png');
                this.load.image('wick1',  window.baseUrl +'assets/gradeAssets/AL-SORT1-G7/object_1.png');
                this.load.image('wick2',  window.baseUrl +'assets/gradeAssets/AL-SORT1-G7/object_2.png');

                this.load.atlas('greenCanon', window.baseUrl +'assets/gradeAssets/AL-SORT1-G7/cannon_green.png',null, AL_SORT1_G7_JSON.greenCanonJson);   
                this.load.atlas('yellowCanon',  window.baseUrl +'assets/gradeAssets/AL-SORT1-G7/cannon_yelow.png', null, AL_SORT1_G7_JSON.yellowCanonJson);

                this.load.atlas('greenBlast', window.baseUrl +'assets/gradeAssets/AL-SORT1-G7/green blast.png',null, AL_SORT1_G7_JSON.greenBlastJson);   
                this.load.atlas('yellowBlast',  window.baseUrl +'assets/gradeAssets/AL-SORT1-G7/yellow blast.png', null, AL_SORT1_G7_JSON.yellowBlastJson);

        },

        create: function () {

                this.state.start('AL_SORT1_G7level1');
        },
}