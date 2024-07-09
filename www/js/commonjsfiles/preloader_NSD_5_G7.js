Game.preloader_NSD_5_G7 = function (game) {
        this.preloadBar = null;
};

var chime, clockTick;
Game.preloader_NSD_5_G7.prototype = {
        preload: function () {

                this.load.video('NSD5G7', window.baseUrl + 'assets/demoVideos/NSD-5-G7.mp4');  

                this.load.atlas('bulb', window.baseUrl + 'assets/commonAssets/bulb.png', null, NSD_5_G7_JSON.bulbBtnJson);
                this.load.image('skipArrow', window.baseUrl + 'assets/commonAssets/skipArrow.png');


                this.load.atlas('backbtn', window.baseUrl + 'assets/commonAssets/backbtn.png', null, NSD_5_G7_JSON.backbtnJson);
                this.load.atlas('CommonSpeakerBtn', window.baseUrl + 'assets/commonAssets/speaker.png', null, NSD_5_G7_JSON.speakerJson);
                this.load.atlas('starAnim', window.baseUrl + 'assets/commonAssets/starAnim.png', null, NSD_5_G7_JSON.starAnimJson);
               // this.load.atlas('replay', window.baseUrl + 'assets/commonAssets/reply.png', null, NSD_5_G7_JSON.replyJson);
                this.load.image('navBar', window.baseUrl + 'assets/commonAssets/navBar.png');
                this.load.image('timebg', window.baseUrl + 'assets/commonAssets/timebg.png');
                this.load.image('hand', window.baseUrl + 'assets/commonAssets/hand.png');
                //this.load.atlas('CommonHomeBtn', window.baseUrl + 'assets/commonAssets/homeBtn.png', null, NSD_5_G7_JSON.homebtnJson);
                //this.load.atlas('CommonNextBtn', window.baseUrl + 'assets/commonAssets/nextBtn.png', null, NSD_5_G7_JSON.nextbtnJson);
                this.load.image('bg', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/Bg.png');


                this.load.atlas('eraser', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/Btn_2.png',null,NSD_5_G7_JSON.eraser);
                this.load.atlas('reverse', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/Btn_1.png', null, NSD_5_G7_JSON.reverseJson);

                this.load.image('gryBox', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/gray box.png');
                this.load.image('grySmall', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/gray small.png');
                this.load.image('grySmall2', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/gray small2.png');
                this.load.image('blueSmall', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/blue samll.png');


                this.load.image('orangeBox', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/orange single.png');
                this.load.image('orangeBoxes', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/orange box.png');
                this.load.image('greenBox', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/green box.png');
                this.load.image('greenBoxHr', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/green boxHr.png');
                this.load.image('yellowBox', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/yellow box.png');
                this.load.image('yellowBox2', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/yellow box_2.png');
                this.load.image('yellowTextbox', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/yellow text box.png');


                this.load.image('panel_1', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/panle_1.png');
                this.load.image('panel_2', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/panle_2.png');
                this.load.image('panel_3', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/panle_3.png');
                this.load.image('panel3', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/panel3.png');

              
                this.load.image('Text box_1F', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/text box.png');
                this.load.image('Text box_2', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/text box_2.png');
                this.load.image('Text box_1', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/text box1.png');


                // Hash yellow boxes
                this.load.image('0.1', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/0.1.png');
                this.load.image('0.2', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/0.2.png');
                this.load.image('0.3', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/0.3.png');
                this.load.image('0.4', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/0.4.png');
                this.load.image('0.5', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/0.5.png');
                this.load.image('0.6', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/0.6.png');
                this.load.image('0.7', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/0.7.png');
                this.load.image('0.8', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/0.8.png');
                this.load.image('0.15', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/0.15.png');
                this.load.image('0.15R', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/0.15R.png');

                this.load.image('0.25', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/0.25.png');
                this.load.image('0.25R', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/0.25R.png');

                this.load.image('0.35', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/0.35.png');
                this.load.image('0.35R', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/0.35R.png');

                this.load.image('0.75', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/0.75.png');
                this.load.image('0.75R', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/0.75R.png');


                this.load.image('1.25', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/1.25.png');
                this.load.image('1.25R', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/1.25R.png');


                this.load.atlas('TickBtn', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/TickBtn.png', null, NSD_5_G7_JSON.tickJson);
                this.load.atlas('Numberpad', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/number pad.png', null, NSD_5_G7_JSON.numberpadJson)
                this.load.image('numpadbg', window.baseUrl + 'assets/gradeAssets/NSD-5-G7/numbg.png');


        },

        create: function () {
                this.state.start('NSD_5_G7level1');
        },
}