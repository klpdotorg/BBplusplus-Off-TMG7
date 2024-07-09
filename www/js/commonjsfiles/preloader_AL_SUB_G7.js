Game.preloader_AL_SUB_G7 = function (game) {
        this.preloadBar = null;
}; 

var chime, clockTick;
Game.preloader_AL_SUB_G7.prototype = {
        preload: function () {
                console.log(window.baseUrl);
                this.load.video('ALSUBG7', window.baseUrl + 'assets/demoVideos/AL-SUB-G7.mp4');   //* include demo video of game.
                this.load.image('skipArrow', window.baseUrl + 'assets/commonAssets/skipArrow.png');

                this.load.atlas('bulb', window.baseUrl + 'assets/commonAssets/bulb.png', null, AL_SUB_G7_JSON.bulbBtnJson);

                this.load.atlas('backbtn', window.baseUrl + 'assets/commonAssets/backbtn.png', null, AL_SUB_G7_JSON.backbtnJson);
                this.load.atlas('CommonSpeakerBtn', window.baseUrl + 'assets/commonAssets/speaker.png', null, AL_SUB_G7_JSON.speakerJson);
                this.load.atlas('starAnim', window.baseUrl + 'assets/commonAssets/starAnim.png', null, AL_SUB_G7_JSON.starAnimJson);
                this.load.atlas('replay', window.baseUrl + 'assets/commonAssets/reply.png', null, AL_SUB_G7_JSON.replyJson);
                this.load.image('navBar', window.baseUrl + 'assets/commonAssets/navBar.png');
                this.load.image('timebg', window.baseUrl + 'assets/commonAssets/timebg.png');
                this.load.image('hand', window.baseUrl + 'assets/commonAssets/hand.png');

                this.load.atlas('reverse', window.baseUrl + ' assets/gradeAssets/AL-SUB-G7/Btn_1.png', null, AL_SUB_G7_JSON.btn_1Json);

                this.load.atlas('CommonHomeBtn', window.baseUrl + 'assets/commonAssets/homeBtn.png', null, AL_SUB_G7_JSON.homebtnJson);
                this.load.atlas('CommonNextBtn', window.baseUrl + 'assets/commonAssets/nextBtn.png', null, AL_SUB_G7_JSON.nextbtnJson);

                this.load.atlas('symbol_1', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/symbol_1.png', null, AL_SUB_G7_JSON.symbol1Json);
                this.load.atlas('symbol_2', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/symbol_2.png', null, AL_SUB_G7_JSON.symbol2Json);
                this.load.atlas('symbol_3', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/symbol_3.png', null, AL_SUB_G7_JSON.symbol3Json);

                this.load.atlas('eraser', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/Btn_2.png', null, AL_SUB_G7_JSON.eraserJson);
                this.load.image('BG1', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/Bg.png');
                this.load.image('Textbox_1', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/Text box_1.png');

                this.load.image('Text box_4', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/text box_4.png');

                this.load.image('box_2', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/box_2.png');

                this.load.image('hand', window.baseUrl + 'assets/commonAssets/hand.png');

                this.load.image('Text box_1', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/text box_1.png');
                this.load.image('Text box_2', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/text box_2.png');

                this.load.atlas('Text box_5', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/text box_5.png', null, AL_SUB_G7_JSON.answerBoxJson);

                this.load.image('panale_1', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/panale_1.png');
                this.load.image('panale_2', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/panale_2.png');
                this.load.image('panale_3', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/panale_3.png');
                this.load.image('panale_4', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/panale_4.png');

                this.load.image('green_1', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/green_1.png');
                this.load.image('green_2', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/green_2.png');
                this.load.image('green_3', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/green_3.png');

                this.load.image('pink_1', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/pink_1.png');
                this.load.image('pink_2', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/pink_2.png');
                this.load.image('pink_3', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/pink_3.png');

                this.load.image('yellow box', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/yellow box_1.png');

                this.load.atlas('TickBtn', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/TickBtn.png', null, AL_SUB_G7_JSON.tickJson);

                this.load.image('numpadbg', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/numbg.png');
                this.load.atlas('Numberpad', window.baseUrl + 'assets/gradeAssets/AL-SUB-G7/number pad.png', null, AL_SUB_G7_JSON.numberpadJson);
        },

        create: function () {

                this.state.start('AL_SUB_G7level1');
        },
}