Game.preloader_GMLA_03_G7 = function (game) {
        this.preloadBar = null; 
};

var chime, clockTick;
Game.preloader_GMLA_03_G7.prototype = {
        preload: function () {
                // this.load.video('nsrp02_1', 'demoVideos/GMLA-03-G7.mp4');   //* include demo video of game.
                this.load.image('skipArrow', window.baseUrl +'assets/commonAssets/skipArrow.png');

                this.load.atlas('bulb', window.baseUrl +'assets/commonAssets/bulb.png', null, GMLA_03_G7_JSON.bulbBtnJson);
                this.load.image('close', window.baseUrl +'assets/commonAssets/close.png');
                this.load.atlas('backbtn', window.baseUrl +'assets/commonAssets/backbtn.png', null, GMLA_03_G7_JSON.backbtnJson);
                this.load.atlas('CommonSpeakerBtn', window.baseUrl +'assets/commonAssets/speaker.png', null, GMLA_03_G7_JSON.speakerJson);
                this.load.atlas('starAnim', window.baseUrl +'assets/commonAssets/starAnim.png', null, GMLA_03_G7_JSON.starAnimJson);
                this.load.atlas('replay', window.baseUrl +'assets/commonAssets/reply.png', null, GMLA_03_G7_JSON.replyJson);

                this.load.image('navBar', window.baseUrl +'assets/commonAssets/navBar.png');
                this.load.image('timebg', window.baseUrl +'assets/commonAssets/timebg.png');
                this.load.image('hand', window.baseUrl +'assets/commonAssets/hand.png');

                this.load.atlas('CommonHomeBtn', window.baseUrl +'assets/commonAssets/homeBtn.png', null, GMLA_03_G7_JSON.homebtnJson);
                this.load.atlas('CommonNextBtn', window.baseUrl +'assets/commonAssets/nextBtn.png', null, GMLA_03_G7_JSON.nextbtnJson);

                //game gradewindow.baseUrl + assets

                //this.load.atlas('eraser', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Btn_2.png', null, GMLA_03_G7_JSON.eraserJson);

                this.load.image('BG1', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Bg.png');

                this.load.image('Loc_1', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_1.png');
                this.load.image('Loc_1_a', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_1(a).png');
                this.load.image('Loc_1_1', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_1_1.png');
                this.load.image('Loc_2', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_2.png');
                this.load.image('Loc_3', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_3.png');
                this.load.image('Loc_4', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_4.png');
                this.load.image('Loc_4_1', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_4_1.png');
                this.load.image('Loc_5', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_5.png');
                this.load.image('Loc_5_1', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_5_1.png');
                this.load.image('Loc_6', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_6.png');
                this.load.image('Loc_7', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_7.png');
                this.load.image('Loc_8', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_8.png');
                this.load.image('Loc_8_1', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_8_1.png');
                this.load.image('Loc_9', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_9.png');
                this.load.image('Loc_9_1', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_9_1.png');
                this.load.image('Loc_10', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_10.png');
                this.load.image('Loc_11', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_11.png');
                this.load.image('Loc_12', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_12.png');
                this.load.image('Loc_13', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_13.png');
                this.load.image('Loc_14', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_14.png');
                this.load.image('Loc_15', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_15.png');
                this.load.image('Loc_16', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_16.png');
                this.load.image('Loc_17', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/Loc_17.png');

                this.load.atlas('Number', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/1 to 5.png', null, GMLA_03_G7_JSON.onetofive);
                this.load.atlas('NumberCircle', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/number cercle.png', null, GMLA_03_G7_JSON.numbercercle);

              //  this.load.image('AnswerBox', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/text box.png');
                this.load.image('AnswerBox', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/text box_1.png');
                this.load.image('Red Circle_1', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/red cercle_1.png');
                this.load.image('Red Circle_2', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/red cercle_2.png');

                this.load.atlas('TickBtn', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/TickBtn.png', null, GMLA_03_G7_JSON.tickJson);

                this.load.image('numpadbg', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/numbg.png');
                this.load.atlas('Numberpad', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/number pad.png', null, GMLA_03_G7_JSON.numberpadJson);

                //hint screenwindow.baseUrl + assets
                this.load.image('back_arrow', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/arrow_1.png');
                this.load.image('front_arrow', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/arrow_2.png');
                this.load.image('bgbox2', window.baseUrl +'assets/gradeAssets/GMLA-03-G7/box2.png');

        
        }, 

        create: function () {

                this.state.start('GMLA_03_G7level1');
        },
}