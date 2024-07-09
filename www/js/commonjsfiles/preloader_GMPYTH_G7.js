Game.preloader_GMPYTH_G7 = function (game) {
        this.preloadBar = null;
};

var chime, clockTick;
Game.preloader_GMPYTH_G7.prototype = {
        preload: function () {

                this.load.video('GMPYTHG71',   window.baseUrl +'assets/demoVideos/Gm-Pyth-G7-1.mp4');   //* include demo video of nsf-5 game.
                this.load.video('GMPYTHG72',   window.baseUrl  +'assets/demoVideos/Gm-Pyth-G7-2.mp4');   //* include demo video of nsf-5 game.

                this.load.image('skipArrow',  window.baseUrl +'assets/commonAssets/skipArrow.png');
              
                this.load.atlas('bulb',  window.baseUrl +'assets/commonAssets/bulb.png', null, GMPYTH_G7_JSON.bulbBtnJson);

                this.load.atlas('backbtn',  window.baseUrl +'assets/commonAssets/backbtn.png', null, GMPYTH_G7_JSON.backbtnJson);
                this.load.atlas('CommonSpeakerBtn',  window.baseUrl +'assets/commonAssets/speaker.png', null, GMPYTH_G7_JSON.speakerJson);
                this.load.atlas('starAnim',  window.baseUrl +'assets/commonAssets/starAnim.png', null, GMPYTH_G7_JSON.starAnimJson);
                this.load.atlas('replay',  window.baseUrl +'assets/commonAssets/reply.png', null, GMPYTH_G7_JSON.replyJson);

                this.load.image('navBar',  window.baseUrl +'assets/commonAssets/navBar.png');
                this.load.image('timebg',  window.baseUrl +'assets/commonAssets/timebg.png');
                this.load.image('hand',  window.baseUrl +'assets/commonAssets/hand.png');

                this.load.atlas('CommonHomeBtn',  window.baseUrl +'assets/commonAssets/homeBtn.png', null, GMPYTH_G7_JSON.homebtnJson);
                this.load.atlas('CommonNextBtn',  window.baseUrl +'assets/commonAssets/nextBtn.png', null, GMPYTH_G7_JSON.nextbtnJson);


                this.load.image('bg',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/Bg.png');
                this.load.image('mainbord',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/main bord.png');

                this.load.atlas('TickBtn',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/TickBtn.png', null, GMPYTH_G7_JSON.TickbtnJson);

                this.load.image('BlueBg',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/blue box.png');

                this.load.image('numpadbg',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/numbg.png');
                this.load.atlas('Numberpad',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/number pad.png', null, GMPYTH_G7_JSON.numberpadJson);

                //* Pyth game objs
                this.load.image('columnGrid',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/new final.png');//new colum
                this.load.image('bgiPanel',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/pnale_2.png');
                this.load.image('circlorange',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/half circle orange.png');
                this.load.image('panel1',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/pnale_1.png');
                this.load.atlas('greenbox',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/green box.png', null, GMPYTH_G7_JSON.greenBoxJson);
                this.load.atlas('Orangebox',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/Orange box.png', null, GMPYTH_G7_JSON.orangeBoxJson);
                this.load.atlas('pinkbox',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/pink box.png', null, GMPYTH_G7_JSON.pinkBoxJson);
                this.load.image('bigBlue',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/cross blue big.png');

                this.load.image('textBox1',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/text box_1.png');
                this.load.atlas('thumbsUp',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/thums Up.png', null, GMPYTH_G7_JSON.thumbsUp);
                this.load.atlas('thumbsDown',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/thums down.png', null, GMPYTH_G7_JSON.thumbsDown);
                this.load.image('textbox2',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/text box_2.png');

                this.load.image('greenCircle',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/half circle green_1.1.png');
                this.load.image('greenLine',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/half circle green_1.3.png');
                this.load.image('greenFilledCircle',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/half circle.png');

                this.load.image('orangeCircle',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/half circle orange_1.1.png');
                this.load.image('orangeLine',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/half circle orange_1.3.png');
                this.load.image('orangeFilledCircle',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/half circle orange.png');

                this.load.image('pinkCircle',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/half circle pink_1.1.png');
                this.load.image('pinkLine',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/half circle pink_1.3.png');
                this.load.image('pinkFilledCircle',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/half circle pink.png');
                this.load.image('rectPanel',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/pnale_3.png');
                //hexagon
                this.load.image('greenHexa',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/hexagon green_1.1.png');
                this.load.image('greenXLine',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/hexagon green_1.2.png');
                this.load.image('orangeHexa',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/hexagon orange_1.1.png');
                this.load.image('orangeXLine',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/hexagon orange_1.2.png');
                this.load.image('pinkHexa',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/hexagon pink_1.1.png');
                this.load.image('pinkXLine',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/hexagon pink_1.2.png');

                //equilateral
                this.load.image('greenLateral',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/triangle green_1.1.png');
                this.load.image('greenEqLine',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/triangle green_1.2.png');
                this.load.image('orangeLateral',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/triangle orange_1.1.png');
                this.load.image('orangeEqLine',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/triangle orange_1.2.png');
                this.load.image('pinkLateral',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/triangle pink_1.1.png');
                this.load.image('pinkEqLine',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/triangle pink_1.2.png');

                //* AnimShapes
                this.load.image('shap_4',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/shap_4.png');
                this.load.image('shap_1',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/shap_1.png');
                this.load.image('shap_2',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/shap_2.png');
                this.load.image('shap_3',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/shap_3.png');
                this.load.image('shap_5',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/shap_5.png');

                //cross blue big
                this.load.image('corss_bigLine',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/cross blue big.png');
                this.load.image('corss_smallLine',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/cross smal big.png');

                this.load.atlas('formlaButton',  window.baseUrl +'assets/gradeAssets/GM-PYTH-G7/text box_3.png', null, GMPYTH_G7_JSON.textBox3);
        },

        create: function () {

                this.state.start('GMPYTH_G7level1');
        },
}