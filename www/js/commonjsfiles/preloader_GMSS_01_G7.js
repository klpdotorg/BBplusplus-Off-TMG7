Game.preloader_GMSS_01_G7 = function (game) {
        this.preloadBar = null;
};

var chime, clockTick;
Game.preloader_GMSS_01_G7.prototype = {
        preload: function () {
                //  this.load.video('nsrp02_1','demoVideos/AL-SUB-G7.mp4');   //* include demo video of game.
                this.load.image('skipArrow',  window.baseUrl +'assets/commonAssets/skipArrow.png');

                this.load.atlas('bulb',  window.baseUrl +'assets/commonAssets/bulb.png', null, GMSS_01_G7_JSON.bulbBtnJson);

                this.load.atlas('backbtn',  window.baseUrl +'assets/commonAssets/backbtn.png', null, GMSS_01_G7_JSON.backbtnJson);
                this.load.atlas('CommonSpeakerBtn',  window.baseUrl +'assets/commonAssets/speaker.png', null, GMSS_01_G7_JSON.speakerJson);
                this.load.atlas('starAnim',  window.baseUrl +'assets/commonAssets/starAnim.png', null, GMSS_01_G7_JSON.starAnimJson);
                this.load.atlas('replay',  window.baseUrl +'assets/commonAssets/reply.png', null, GMSS_01_G7_JSON.replyJson);
                this.load.image('navBar',  window.baseUrl +'assets/commonAssets/navBar.png');
                this.load.image('timebg',  window.baseUrl +'assets/commonAssets/timebg.png');
                this.load.image('hand',  window.baseUrl +'assets/commonAssets/hand.png');

                this.load.atlas('CommonHomeBtn',  window.baseUrl +'assets/commonAssets/homeBtn.png', null, GMSS_01_G7_JSON.homebtnJson);
                this.load.atlas('CommonNextBtn',  window.baseUrl +'assets/commonAssets/nextBtn.png', null, GMSS_01_G7_JSON.nextbtnJson);

                this.load.image('BG1',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/bg.png');

                this.load.atlas('thumbsDown',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/thumsdown_1.png', null, GMSS_01_G7_JSON.thumsdown_1);
                this.load.atlas('thumbsUp',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/thumsup_1.png', null, GMSS_01_G7_JSON.thumsup_1);

                this.load.image('Box1',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/box.png');

                // Box 1 shapes
                this.load.image('Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_1/Shap_1.png');
                this.load.image('Shape2',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_2/Shap_2.png');
                this.load.image('Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Shap_3.png');
                this.load.image('Shape4',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_4/Shap_4.png');
                this.load.image('Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_5/Shap_5.png');
                this.load.image('Shape6',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_6/Shap_6.png');
                this.load.image('Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Shap_7.png');

                // Box 2 right ans net shapes
                this.load.image('right1_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_1/Shap_1_ans_1.png');
                this.load.image('right2_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_1/Shap_1_ans_2.png');
                this.load.image('right3_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_1/Shap_1_ans_3.png');
                this.load.image('right4_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_1/Shap_1_ans_4.png');
                this.load.image('right5_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_1/Shap_1_ans_5.png');
                this.load.image('right6_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_1/Shap_1_ans_6.png');

                this.load.image('right1_Shape2',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_2/Shap_2_ans_1.png');
                this.load.image('right2_Shape2',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_2/Shap_2_ans_2.png');

                this.load.image('right1_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Shap_3_ans_1.png');
                this.load.image('right2_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Shap_3_ans_2.png');
                this.load.image('right3_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Shap_3_ans_3.png');
                this.load.image('right4_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Shap_3_ans_4.png');
                this.load.image('right5_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Shap_3_ans_5.png');
                this.load.image('right6_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Shap_3_ans_6.png');
                this.load.image('right7_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Shap_3_ans_7.png');
                this.load.image('right8_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Shap_3_ans_8.png');
                this.load.image('right9_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Shap_3_ans_9.png');
                this.load.image('right10_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Shap_3_ans_10.png');
                this.load.image('right11_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Shap_3_ans_11.png');
                this.load.image('right12_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Shap_3_ans_12.png');
                this.load.image('right13_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Shap_3_ans_13.png');
                this.load.image('right14_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Shap_3_ans_14.png');
                this.load.image('right15_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Shap_3_ans_15.png');
                this.load.image('right16_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Shap_3_ans_16.png');
                this.load.image('right17_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Shap_3_ans_17.png');
                this.load.image('right18_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Shap_3_ans_18.png');

                this.load.image('right1_Shape4',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_4/Shap_4_ans_1.png');
                this.load.image('right2_Shape4',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_4/Shap_4_ans_2.png');
                this.load.image('right3_Shape4',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_4/Shap_4_ans_3.png');
                this.load.image('right4_Shape4',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_4/Shap_4_ans_4.png');

                this.load.image('right1_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_5/Shap_5_ans_1.png');
                this.load.image('right2_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_5/Shap_5_ans_2.png');
                this.load.image('right3_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_5/Shap_5_ans_3.png');
                this.load.image('right4_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_5/Shap_5_ans_4.png');
                this.load.image('right5_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_5/Shap_5_ans_5.png');
                this.load.image('right6_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_5/Shap_5_ans_6.png');
                this.load.image('right7_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_5/Shap_5_ans_7.png');

                this.load.image('right1_Shape6',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_6/Shap_6_ans_1.png');
                this.load.image('right2_Shape6',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_6/Shap_6_ans_2.png');

                this.load.image('right1_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Shap_7_ans_1.png');
                this.load.image('right2_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Shap_7_ans_2.png');
                this.load.image('right3_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Shap_7_ans_3.png');
                this.load.image('right4_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Shap_7_ans_4.png');
                this.load.image('right5_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Shap_7_ans_5.png');
                this.load.image('right6_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Shap_7_ans_6.png');
                this.load.image('right7_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Shap_7_ans_7.png');
                this.load.image('right8_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Shap_7_ans_8.png');
                this.load.image('right9_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Shap_7_ans_9.png');
                this.load.image('right10_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Shap_7_ans_10.png');
                this.load.image('right11_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Shap_7_ans_11.png');
                this.load.image('right12_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Shap_7_ans_12.png');
                this.load.image('right13_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Shap_7_ans_13.png');
                this.load.image('right14_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Shap_7_ans_14.png');
                this.load.image('right15_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Shap_7_ans_15.png');
                this.load.image('right16_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Shap_7_ans_16.png');
                this.load.image('right17_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Shap_7_ans_17.png');
                this.load.image('right18_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Shap_7_ans_18.png');

                // Box 2 wrong ans net shapes

                this.load.image('wrong1_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_1/Wrong ans/Shap_1_Wrong ans_1.png');
                this.load.image('wrong2_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_1/Wrong ans/Shap_1_Wrong ans_2.png');
                this.load.image('wrong3_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_1/Wrong ans/Shap_1_Wrong ans_3.png');
                this.load.image('wrong4_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_1/Wrong ans/Shap_1_Wrong ans_4.png');
                this.load.image('wrong5_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_1/Wrong ans/Shap_1_Wrong ans_5.png');
                this.load.image('wrong6_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_1/Wrong ans/Shap_1_Wrong ans_6.png');

                this.load.image('wrong1_Shape2',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_2/Wrong ans/Shap_2_Wrong ans_1.png');
                this.load.image('wrong2_Shape2',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_2/Wrong ans/Shap_2_Wrong ans_2.png');
                this.load.image('wrong3_Shape2',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_2/Wrong ans/Shap_2_Wrong ans_3.png');
                this.load.image('wrong4_Shape2',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_2/Wrong ans/Shap_2_Wrong ans_4.png');

                this.load.image('wrong1_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Wrong ans/Shap_3_Wrong ans_1.png');
                this.load.image('wrong2_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Wrong ans/Shap_3_Wrong ans_2.png');
                this.load.image('wrong3_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Wrong ans/Shap_3_Wrong ans_3.png');
                this.load.image('wrong4_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Wrong ans/Shap_3_Wrong ans_4.png');
                this.load.image('wrong5_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Wrong ans/Shap_3_Wrong ans_5.png');
                this.load.image('wrong6_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Wrong ans/Shap_3_Wrong ans_6.png');
                this.load.image('wrong7_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_3/Wrong ans/Shap_3_Wrong ans_7.png');
        
                this.load.image('wrong1_Shape4',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_4/Wrong ans/Shap_4_Wrong ans_1.png');
                this.load.image('wrong2_Shape4',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_4/Wrong ans/Shap_4_Wrong ans_2.png');
                this.load.image('wrong3_Shape4',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_4/Wrong ans/Shap_4_Wrong ans_3.png');

                this.load.image('wrong1_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_5/Wrong ans/Shap_5_Wrong ans_1.png');
                this.load.image('wrong2_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_5/Wrong ans/Shap_5_Wrong ans_2.png');
                this.load.image('wrong3_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_5/Wrong ans/Shap_5_Wrong ans_3.png');
                this.load.image('wrong4_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_5/Wrong ans/Shap_5_Wrong ans_4.png');
                this.load.image('wrong5_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_5/Wrong ans/Shap_5_Wrong ans_5.png');
                this.load.image('wrong6_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_5/Wrong ans/Shap_5_Wrong ans_6.png');
                this.load.image('wrong7_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_5/Wrong ans/Shap_5_Wrong ans_7.png');

                this.load.image('wrong1_Shape6',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_6/Wrong ans/Shap_6_Wrong ans_1.png');
                this.load.image('wrong2_Shape6',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_6/Wrong ans/Shap_6_Wrong ans_2.png');
                this.load.image('wrong3_Shape6',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_6/Wrong ans/Shap_6_Wrong ans_3.png');
                this.load.image('wrong4_Shape6',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_6/Wrong ans/Shap_6_Wrong ans_4.png');
                this.load.image('wrong5_Shape6',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_6/Wrong ans/Shap_6_Wrong ans_5.png');

                this.load.image('wrong1_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Wrong ans/Shap_7_Wrong ans_1.png');
                this.load.image('wrong2_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Wrong ans/Shap_7_Wrong ans_2.png');
                this.load.image('wrong3_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Wrong ans/Shap_7_Wrong ans_3.png');
                this.load.image('wrong4_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Wrong ans/Shap_7_Wrong ans_4.png');
                this.load.image('wrong5_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Wrong ans/Shap_7_Wrong ans_5.png');
                this.load.image('wrong6_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_01_G7/Shap_7/Wrong ans/Shap_7_Wrong ans_6.png');
        },      

        create: function () {

                this.state.start('GMSS_01_G7level1');
        },
}