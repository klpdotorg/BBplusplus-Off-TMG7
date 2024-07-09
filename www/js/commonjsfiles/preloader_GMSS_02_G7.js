Game.preloader_GMSS_02_G7 = function (game) {
        this.preloadBar = null;
};

var chime, clockTick;
Game.preloader_GMSS_02_G7.prototype = {
        preload: function () {
                //  this.load.video('nsrp02_1','demoVideos/AL-SUB-G7.mp4');   //* include demo video of game.
                this.load.image('skipArrow',  window.baseUrl +'assets/commonAssets/skipArrow.png');

                this.load.atlas('bulb',  window.baseUrl +'assets/commonAssets/bulb.png', null, GMSS_02_G7_JSON.bulbBtnJson);

                this.load.atlas('backbtn',  window.baseUrl +'assets/commonAssets/backbtn.png', null, GMSS_02_G7_JSON.backbtnJson);
                this.load.atlas('CommonSpeakerBtn',  window.baseUrl +'assets/commonAssets/speaker.png', null, GMSS_02_G7_JSON.speakerJson);
                this.load.atlas('starAnim',  window.baseUrl +'assets/commonAssets/starAnim.png', null, GMSS_02_G7_JSON.starAnimJson);
                this.load.atlas('replay',  window.baseUrl +'assets/commonAssets/reply.png', null, GMSS_02_G7_JSON.replyJson);
                this.load.image('navBar',  window.baseUrl +'assets/commonAssets/navBar.png');
                this.load.image('timebg',  window.baseUrl +'assets/commonAssets/timebg.png');
                this.load.image('hand',  window.baseUrl +'assets/commonAssets/hand.png');

                this.load.atlas('CommonHomeBtn',  window.baseUrl +'assets/commonAssets/homeBtn.png', null, GMSS_02_G7_JSON.homebtnJson);
                this.load.atlas('CommonNextBtn',  window.baseUrl +'assets/commonAssets/nextBtn.png', null, GMSS_02_G7_JSON.nextbtnJson);

                this.load.image('BG1',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/bg.png');

                this.load.atlas('Box2',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/box 2.png', null, GMSS_02_G7_JSON.Box2);

                this.load.image('Box1',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/box.png');

                this.load.atlas('TickBtn',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/TickBtn.png', null, GMSS_02_G7_JSON.tickJson);

                // Box 1 shapes
                this.load.image('Object1',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/object_1.png');
                this.load.image('Object2',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/object_2.png');
                this.load.image('Object3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/object_3.png');
                this.load.image('Object4',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/object_4.png');
                this.load.image('Object5',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/object_5.png');
                this.load.image('Object6',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/object_6.png');
                this.load.image('Object7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/object_7.png');
                this.load.image('Object8',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/object_8.png');
                this.load.image('Object9',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/object_9.png');
                this.load.image('Object10',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/object_10.png');
                this.load.image('Object11',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/object_11.png');
                this.load.image('Object12',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/object_12.png');
                this.load.image('Object13',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/object_13.png');
                this.load.image('Object14',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/object_14.png');
                this.load.image('Object15',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/object_15.png');
                this.load.image('Object16',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/object_16.png');
                this.load.image('Object17',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/object_17.png');
                this.load.image('Object18',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/object_18.png');
                this.load.image('Object19',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/object_19.png');

                // Box 2 right ans net shapes
                this.load.image('right1_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_1/Shap_1_ans_1.png');
                this.load.image('right2_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_1/Shap_1_ans_2.png');
                this.load.image('right3_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_1/Shap_1_ans_3.png');
                this.load.image('right4_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_1/Shap_1_ans_4.png');
                this.load.image('right5_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_1/Shap_1_ans_5.png');
                this.load.image('right6_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_1/Shap_1_ans_6.png');

                this.load.image('right1_Shape2',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_2/Shap_2_ans_1.png');
                this.load.image('right2_Shape2',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_2/Shap_2_ans_2.png');

                this.load.image('right1_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Shap_3_ans_1.png');
                this.load.image('right2_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Shap_3_ans_2.png');
                this.load.image('right3_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Shap_3_ans_3.png');
                this.load.image('right4_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Shap_3_ans_4.png');
                this.load.image('right5_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Shap_3_ans_5.png');
                this.load.image('right6_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Shap_3_ans_6.png');
                this.load.image('right7_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Shap_3_ans_7.png');
                this.load.image('right8_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Shap_3_ans_8.png');
                this.load.image('right9_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Shap_3_ans_9.png');
                this.load.image('right10_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Shap_3_ans_10.png');
                this.load.image('right11_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Shap_3_ans_11.png');
                this.load.image('right12_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Shap_3_ans_12.png');
                this.load.image('right13_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Shap_3_ans_13.png');
                this.load.image('right14_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Shap_3_ans_14.png');
                this.load.image('right15_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Shap_3_ans_15.png');
                this.load.image('right16_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Shap_3_ans_16.png');
                this.load.image('right17_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Shap_3_ans_17.png');
                this.load.image('right18_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Shap_3_ans_18.png');

                this.load.image('right1_Shape4',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_4/Shap_4_ans_1.png');
                this.load.image('right2_Shape4',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_4/Shap_4_ans_2.png');
                this.load.image('right3_Shape4',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_4/Shap_4_ans_3.png');
                this.load.image('right4_Shape4',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_4/Shap_4_ans_4.png');

                this.load.image('right1_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_5/Shap_5_ans_1.png');
                this.load.image('right2_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_5/Shap_5_ans_2.png');
                this.load.image('right3_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_5/Shap_5_ans_3.png');
                this.load.image('right4_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_5/Shap_5_ans_4.png');
                this.load.image('right5_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_5/Shap_5_ans_5.png');
                this.load.image('right6_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_5/Shap_5_ans_6.png');
                this.load.image('right7_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_5/Shap_5_ans_7.png');

                this.load.image('right1_Shape6',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_6/Shap_6_ans_1.png');
                this.load.image('right2_Shape6',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_6/Shap_6_ans_2.png');

                this.load.image('right1_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Shap_7_ans_1.png');
                this.load.image('right2_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Shap_7_ans_2.png');
                this.load.image('right3_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Shap_7_ans_3.png');
                this.load.image('right4_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Shap_7_ans_4.png');
                this.load.image('right5_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Shap_7_ans_5.png');
                this.load.image('right6_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Shap_7_ans_6.png');
                this.load.image('right7_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Shap_7_ans_7.png');
                this.load.image('right8_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Shap_7_ans_8.png');
                this.load.image('right9_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Shap_7_ans_9.png');
                this.load.image('right10_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Shap_7_ans_10.png');
                this.load.image('right11_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Shap_7_ans_11.png');
                this.load.image('right12_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Shap_7_ans_12.png');
                this.load.image('right13_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Shap_7_ans_13.png');
                this.load.image('right14_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Shap_7_ans_14.png');
                this.load.image('right15_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Shap_7_ans_15.png');
                this.load.image('right16_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Shap_7_ans_16.png');
                this.load.image('right17_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Shap_7_ans_17.png');
                this.load.image('right18_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Shap_7_ans_18.png');

                // Box 2 wrong ans net shapes

                this.load.image('wrong1_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_1/Wrong ans/Shap_1_Wrong ans_1.png');
                this.load.image('wrong2_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_1/Wrong ans/Shap_1_Wrong ans_2.png');
                this.load.image('wrong3_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_1/Wrong ans/Shap_1_Wrong ans_3.png');
                this.load.image('wrong4_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_1/Wrong ans/Shap_1_Wrong ans_4.png');
                this.load.image('wrong5_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_1/Wrong ans/Shap_1_Wrong ans_5.png');
                this.load.image('wrong6_Shape1',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_1/Wrong ans/Shap_1_Wrong ans_6.png');

                this.load.image('wrong1_Shape2',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_2/Wrong ans/Shap_2_Wrong ans_1.png');
                this.load.image('wrong2_Shape2',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_2/Wrong ans/Shap_2_Wrong ans_2.png');
                this.load.image('wrong3_Shape2',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_2/Wrong ans/Shap_2_Wrong ans_3.png');
                this.load.image('wrong4_Shape2',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_2/Wrong ans/Shap_2_Wrong ans_4.png');

                this.load.image('wrong1_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Wrong ans/Shap_3_Wrong ans_1.png');
                this.load.image('wrong2_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Wrong ans/Shap_3_Wrong ans_2.png');
                this.load.image('wrong3_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Wrong ans/Shap_3_Wrong ans_3.png');
                this.load.image('wrong4_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Wrong ans/Shap_3_Wrong ans_4.png');
                this.load.image('wrong5_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Wrong ans/Shap_3_Wrong ans_5.png');
                this.load.image('wrong6_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Wrong ans/Shap_3_Wrong ans_6.png');
                this.load.image('wrong7_Shape3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_3/Wrong ans/Shap_3_Wrong ans_7.png');
        
                this.load.image('wrong1_Shape4',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_4/Wrong ans/Shap_4_Wrong ans_1.png');
                this.load.image('wrong2_Shape4',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_4/Wrong ans/Shap_4_Wrong ans_2.png');
                this.load.image('wrong3_Shape4',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_4/Wrong ans/Shap_4_Wrong ans_3.png');

                this.load.image('wrong1_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_5/Wrong ans/Shap_5_Wrong ans_1.png');
                this.load.image('wrong2_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_5/Wrong ans/Shap_5_Wrong ans_2.png');
                this.load.image('wrong3_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_5/Wrong ans/Shap_5_Wrong ans_3.png');
                this.load.image('wrong4_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_5/Wrong ans/Shap_5_Wrong ans_4.png');
                this.load.image('wrong5_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_5/Wrong ans/Shap_5_Wrong ans_5.png');
                this.load.image('wrong6_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_5/Wrong ans/Shap_5_Wrong ans_6.png');
                this.load.image('wrong7_Shape5',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_5/Wrong ans/Shap_5_Wrong ans_7.png');

                this.load.image('wrong1_Shape6',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_6/Wrong ans/Shap_6_Wrong ans_1.png');
                this.load.image('wrong2_Shape6',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_6/Wrong ans/Shap_6_Wrong ans_2.png');
                this.load.image('wrong3_Shape6',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_6/Wrong ans/Shap_6_Wrong ans_3.png');
                this.load.image('wrong4_Shape6',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_6/Wrong ans/Shap_6_Wrong ans_4.png');
                this.load.image('wrong5_Shape6',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_6/Wrong ans/Shap_6_Wrong ans_5.png');

                this.load.image('wrong1_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Wrong ans/Shap_7_Wrong ans_1.png');
                this.load.image('wrong2_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Wrong ans/Shap_7_Wrong ans_2.png');
                this.load.image('wrong3_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Wrong ans/Shap_7_Wrong ans_3.png');
                this.load.image('wrong4_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Wrong ans/Shap_7_Wrong ans_4.png');
                this.load.image('wrong5_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Wrong ans/Shap_7_Wrong ans_5.png');
                this.load.image('wrong6_Shape7',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/Shap_7/Wrong ans/Shap_7_Wrong ans_6.png');

                // extra assets for gmss_02
                this.load.image('image1',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/image_1.png');
                this.load.image('image2',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/image_2.png');
                this.load.image('image3',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/image_3.png');
                this.load.image('image4',  window.baseUrl +'assets/gradeAssets/GMSS_02_G7/image_4.png');

        },      

        create: function () {

                this.state.start('GMSS_02_G7level1');
        },
}