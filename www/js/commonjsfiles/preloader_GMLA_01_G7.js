Game.preloader_GMLA_01_G7 = function (game) {
        this.preloadBar = null;
};

var chime, clockTick;
Game.preloader_GMLA_01_G7.prototype = {
        preload: function () { 
 
                // this.load.video('GMLA_01_G7', 'demoVideos/GMLA_01_G7.mp4');   //* include demo video of GMLA-01-G7 game
                this.load.video('GMLA1G7', window.baseUrl +'assets/demoVideos/GMLA-01-G7.mp4');   //* include demo video of GMLA-01-G7 game.

                this.load.atlas('bulb', window.baseUrl + 'assets/commonAssets/bulb.png', null, GMLA_01_G7_JSON.bulbBtnJson);
                this.load.image('skipArrow', window.baseUrl + 'assets/commonAssets/skipArrow.png');


                this.load.atlas('backbtn', window.baseUrl + 'assets/commonAssets/backbtn.png', null, GMLA_01_G7_JSON.backbtnJson);
                this.load.atlas('CommonSpeakerBtn', window.baseUrl + 'assets/commonAssets/speaker.png', null, GMLA_01_G7_JSON.speakerJson);
                this.load.atlas('starAnim', window.baseUrl + 'assets/commonAssets/starAnim.png', null, GMLA_01_G7_JSON.starAnimJson);
                this.load.atlas('replay', window.baseUrl + 'assets/commonAssets/reply.png', null, GMLA_01_G7_JSON.replyJson);
                this.load.image('navBar', window.baseUrl + 'assets/commonAssets/navBar.png');
                this.load.image('timebg', window.baseUrl + 'assets/commonAssets/timebg.png');
                this.load.image('hand', window.baseUrl + 'assets/commonAssets/hand.png');
                this.load.atlas('CommonHomeBtn', window.baseUrl + 'assets/commonAssets/homeBtn.png', null, GMLA_01_G7_JSON.homebtnJson);
                this.load.atlas('CommonNextBtn', window.baseUrl + 'assets/commonAssets/nextBtn.png', null, GMLA_01_G7_JSON.nextbtnJson);
                this.load.image('numpadbg', window.baseUrl + 'assets/commonAssets/numbg.png');

                this.load.image('bg', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/bg.png');
                this.load.image('graphic', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/graphic.png');
                this.load.image('blue arr', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/blue arrow1.png');
                this.load.image('blue arrow', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/blue arrow.png');
                this.load.atlas('line', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/line.png', null, GMLA_01_G7_JSON.line_Json);
                this.load.atlas('btn1', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/btn_1.png', null, GMLA_01_G7_JSON.btn_1Json);
                this.load.atlas('btn2', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/btn_2.png', null, GMLA_01_G7_JSON.btn_2Json);
                this.load.image('inProtc', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/Protractor part_1.png');
                this.load.image('outProtc', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/Protractor part_2.png');
                this.load.image('Protc', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/protr.png');
                this.load.image('smalProtc', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/image_3.png');
                this.load.image('orange arr', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/Orenge arrow1.png');
                this.load.image('orange arrow', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/Orenge arrow.png');
                this.load.image('pink arr', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/pink aerow.png');
                this.load.image('panel1', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/panle_1.png');
                this.load.image('panel2', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/panle_2.png');
                this.load.image('Text-box', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/white text box.png');
                this.load.image('Text-box2', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/text box.png');
                this.load.image('pinkcircle', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/pink ofcircle.png');
                this.load.atlas('TickBtn', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/TickBtn.png', null, GMLA_01_G7_JSON.tickJson);
                this.load.atlas('Numberpad', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/number pad.png', null, GMLA_01_G7_JSON.numberpadJson);
                this.load.atlas('Numberpad1', window.baseUrl + 'assets/gradeAssets/GMLA-01-G7/number pad1.png', null, GMLA_01_G7_JSON.numberpadJson1);
              


        },

        create: function () {
                this.state.start('GMLA_01_G7level1');
        },
}