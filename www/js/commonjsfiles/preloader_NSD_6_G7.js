Game.preloader_NSD_6_G7 = function (game) {
        this.preloadBar = null;
};

var chime, clockTick;
Game.preloader_NSD_6_G7.prototype = {
        preload: function () {

                this.load.video('NSD6G7',  window.baseUrl +'assets/demoVideos/Nsd-6-G7.mp4');   //* include demo video of nsd game.

                this.load.atlas('bulb', window.baseUrl +'assets/commonAssets/bulb.png', null, NSD_6_G7_JSON.bulbBtnJson);
                this.load.image('skipArrow', window.baseUrl +'assets/commonAssets/skipArrow.png');

                this.load.atlas('backbtn', window.baseUrl +'assets/commonAssets/backbtn.png', null, NSD_6_G7_JSON.backbtnJson);
                this.load.atlas('CommonSpeakerBtn', window.baseUrl +'assets/commonAssets/speaker.png', null, NSD_6_G7_JSON.speakerJson);
                this.load.atlas('starAnim', window.baseUrl +'assets/commonAssets/starAnim.png', null, NSD_6_G7_JSON.starAnimJson);
                this.load.atlas('replay', window.baseUrl +'assets/commonAssets/reply.png', null, NSD_6_G7_JSON.replyJson);
                this.load.image('navBar', window.baseUrl +'assets/commonAssets/navBar.png');
                this.load.image('timebg', window.baseUrl +'assets/commonAssets/timebg.png');
                this.load.image('hand', window.baseUrl +'assets/commonAssets/hand.png');
                this.load.atlas('CommonHomeBtn', window.baseUrl +'assets/commonAssets/homeBtn.png', null, NSD_6_G7_JSON.homebtnJson);
                this.load.atlas('CommonNextBtn', window.baseUrl +'assets/commonAssets/nextBtn.png', null, NSD_6_G7_JSON.nextbtnJson);
                this.load.image('bg', window.baseUrl +'assets/gradeAssets/NSD-6-G7/Bg.png');

                this.load.atlas('eraser', window.baseUrl +'assets/gradeAssets/NSD-6-G7/Btn_2.png',null,NSD_6_G7_JSON.eraser);
                this.load.atlas('reverse', window.baseUrl +'assets/gradeAssets/NSD-6-G7/Btn_1.png', null, NSD_6_G7_JSON.reverseJson);

                // this.load.image('gryBox', window.baseUrl +'assets/gradeAssets/NSD-6-G7/gray box.png');
                // this.load.image('grySmall', window.baseUrl +'assets/gradeAssets/NSD-6-G7/gray small.png');
                // this.load.image('grySmall2', window.baseUrl +'assets/gradeAssets/NSD-6-G7/gray small2.png');
                this.load.image('blueSmall', window.baseUrl +'assets/gradeAssets/NSD-6-G7/blue samll.png');

                this.load.image('orangeBox', window.baseUrl +'assets/gradeAssets/NSD-6-G7/orange single.png');
                this.load.image('orangeBoxes', window.baseUrl +'assets/gradeAssets/NSD-6-G7/orange box.png');
                this.load.image('greenBox', window.baseUrl +'assets/gradeAssets/NSD-6-G7/green box.png');
               // this.load.image('greenBoxHr', window.baseUrl +'assets/gradeAssets/NSD-6-G7/green boxHr.png');
                this.load.image('yellowBox', window.baseUrl +'assets/gradeAssets/NSD-6-G7/yellow box.png');
               // this.load.image('yellowBox2', window.baseUrl +'assets/gradeAssets/NSD-6-G7/yellow box_2.png');
                this.load.image('yellowTextbox', window.baseUrl +'assets/gradeAssets/NSD-6-G7/yellow text box.png');

               // this.load.image('grey1_l', window.baseUrl +'assets/gradeAssets/NSD-6-G7/1-l.png');
                this.load.image('grey1', window.baseUrl +'assets/gradeAssets/NSD-6-G7/1.png');
                this.load.image('grey2', window.baseUrl +'assets/gradeAssets/NSD-6-G7/2.png');
                this.load.image('grey3', window.baseUrl +'assets/gradeAssets/NSD-6-G7/3.png');
                this.load.image('grey4', window.baseUrl +'assets/gradeAssets/NSD-6-G7/4.png');
                this.load.image('grey5', window.baseUrl +'assets/gradeAssets/NSD-6-G7/5.png');
                this.load.image('grey6', window.baseUrl +'assets/gradeAssets/NSD-6-G7/6.png');
                this.load.image('grey7', window.baseUrl +'assets/gradeAssets/NSD-6-G7/7.png');
                this.load.image('grey8', window.baseUrl +'assets/gradeAssets/NSD-6-G7/8.png');
                this.load.image('grey9', window.baseUrl +'assets/gradeAssets/NSD-6-G7/9.png');
                this.load.image('grey10', window.baseUrl +'assets/gradeAssets/NSD-6-G7/10.png');
                this.load.image('grey11', window.baseUrl +'assets/gradeAssets/NSD-6-G7/11.png');
                this.load.image('grey12', window.baseUrl +'assets/gradeAssets/NSD-6-G7/12.png');
                this.load.image('grey13', window.baseUrl +'assets/gradeAssets/NSD-6-G7/13.png');
                this.load.image('grey14', window.baseUrl +'assets/gradeAssets/NSD-6-G7/14.png');
                this.load.image('grey15', window.baseUrl +'assets/gradeAssets/NSD-6-G7/15.png');
                this.load.image('grey16', window.baseUrl +'assets/gradeAssets/NSD-6-G7/16.png');
                this.load.image('grey17', window.baseUrl +'assets/gradeAssets/NSD-6-G7/17.png');
                this.load.image('grey18', window.baseUrl +'assets/gradeAssets/NSD-6-G7/18.png');
                this.load.image('grey19', window.baseUrl +'assets/gradeAssets/NSD-6-G7/19.png');

                this.load.image('panel_1', window.baseUrl +'assets/gradeAssets/NSD-6-G7/panle_1.png');
                this.load.image('panel_2', window.baseUrl +'assets/gradeAssets/NSD-6-G7/panle_2.png');
                this.load.image('panel_3', window.baseUrl +'assets/gradeAssets/NSD-6-G7/panle_3.png');
              
                this.load.image('Text box_1F', window.baseUrl +'assets/gradeAssets/NSD-6-G7/text box.png');
                this.load.image('Text box_2', window.baseUrl +'assets/gradeAssets/NSD-6-G7/text box_2.png');
                this.load.image('Text box_1', window.baseUrl +'assets/gradeAssets/NSD-6-G7/text box1.png');

                this.load.atlas('TickBtn', window.baseUrl +'assets/gradeAssets/NSD-6-G7/TickBtn.png', null, NSD_6_G7_JSON.tickJson);
                this.load.atlas('Numberpad', window.baseUrl +'assets/gradeAssets/NSD-6-G7/number pad.png', null, NSD_6_G7_JSON.numberpadJson)
                this.load.image('numpadbg', window.baseUrl +'assets/gradeAssets/NSD-6-G7/numbg.png');


        },

        create: function () {
                this.state.start('NSD_6_G7level1');
        },
}