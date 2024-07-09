Game.preloader_GMLA_06_G7 = function (game) {
        this.preloadBar = null;
};

var chime, clockTick;
Game.preloader_GMLA_06_G7.prototype = { 
        preload: function () { 
                // this.load.video('nsrp02_1', 'demoVideos/GMLA-06-G7.mp4');   //* include demo video of game.
                this.load.image('skipArrow', window.baseUrl +'assets/commonAssets/skipArrow.png');
                this.load.image('close', window.baseUrl +'assets/commonAssets/close.png');
                this.load.atlas('bulb', window.baseUrl +'assets/commonAssets/bulb.png', null, GMLA_06_G7_JSON.bulbBtnJson);

                this.load.atlas('backbtn', window.baseUrl +'assets/commonAssets/backbtn.png', null, GMLA_06_G7_JSON.backbtnJson);
                this.load.atlas('CommonSpeakerBtn', window.baseUrl +'assets/commonAssets/speaker.png', null, GMLA_06_G7_JSON.speakerJson);
                this.load.atlas('starAnim', window.baseUrl +'assets/commonAssets/starAnim.png', null, GMLA_06_G7_JSON.starAnimJson);
                this.load.atlas('replay', window.baseUrl +'assets/commonAssets/reply.png', null, GMLA_06_G7_JSON.replyJson);

                this.load.image('navBar', window.baseUrl +'assets/commonAssets/navBar.png');
                this.load.image('timebg', window.baseUrl +'assets/commonAssets/timebg.png');
                this.load.image('hand', window.baseUrl +'assets/commonAssets/hand.png');

                this.load.atlas('CommonHomeBtn', window.baseUrl +'assets/commonAssets/homeBtn.png', null, GMLA_06_G7_JSON.homebtnJson);
                this.load.atlas('CommonNextBtn', window.baseUrl +'assets/commonAssets/nextBtn.png', null, GMLA_06_G7_JSON.nextbtnJson);

                //game gradewindow.baseUrl + assets

                this.load.image('BG1', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/Bg.png');

                this.load.image('sandwich_full', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/sandwich_full.png');
                this.load.image('cheese_full', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/cheese_1.png');
                this.load.image('waffer_full', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/waffer_1.png');
                this.load.image('watermelon_full', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/watermelon_1.png');
                this.load.image('pizza_full', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/pizza_1.png');
                this.load.image('biscuit_full', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/biscuits_1.png');

                this.load.image('biscuits', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/biscuits.png');
                this.load.image('blue_mark', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/blue mark.png');
                this.load.image('cheese', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/cheese.png');
                this.load.image('half_sandwich', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/half sandwich.png');
                this.load.image('panle_1', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/panle_1.png');
                this.load.image('panle_2', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/panle_2.png');
                this.load.image('panle_3', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/panle_3.png');
                this.load.image('panle_4', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/panle_4.png');
                this.load.image('pizza', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/pizza.png');
                this.load.image('protractor', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/protractor.png');
                this.load.image('sandwich', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/sandwich.png');
                this.load.image('scale', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/scale.png');
                this.load.image('scale2', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/scale2.png');
                this.load.image('text_box_2', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/text box_2.png');
                this.load.image('waffer', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/waffer.png');
                this.load.image('watermelon', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/watermelon.png');
                this.load.image('Text box_2', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/text box_2.png');

                this.load.image('inProtc', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/Protractor part_1.png');
                this.load.image('outProtc', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/Protractor part_2.png');
                this.load.image('protractor_2', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/protractor_2.png');

                this.load.atlas('color_circle', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/3 colore tex box.png', null, GMLA_06_G7_JSON.colore_tex_box);
                this.load.atlas('box', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/3 box.png', null, GMLA_06_G7_JSON.box);
                this.load.atlas('pizza_anim', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/pizza anim.png', null, GMLA_06_G7_JSON.pizza_anim);
                this.load.atlas('biscuit', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/biscuit.png', null, GMLA_06_G7_JSON.biscuitanim);
                this.load.atlas('cheeseanim', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/cheeseanim.png', null, GMLA_06_G7_JSON.cheeseanim);
                this.load.atlas('sandwichanim', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/sandwichanim.png', null, GMLA_06_G7_JSON.sandwichanim);
                this.load.atlas('wafferanim', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/wafferanim.png', null, GMLA_06_G7_JSON.wafferanim);
                this.load.atlas('watermelonanim', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/watermelonanim.png', null, GMLA_06_G7_JSON.watermelonanim);

                this.load.atlas('TickBtn', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/TickBtn.png', null, GMLA_06_G7_JSON.tickJson);
                this.load.atlas('Numberpad', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/number pad.png', null, GMLA_06_G7_JSON.numberpadJson)
                this.load.image('numpadbg', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/numbg.png');

                this.load.image('prev', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/arrow_1.png');
                this.load.image('next', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/arrow_2.png');
                // this.load.image('close', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/close btn.png');

                this.load.image('bgbox2', window.baseUrl +'assets/gradeAssets/GMLA-06-G7/box2.png');
        },

        create: function () {

                this.state.start('GMLA_06_G7level1');
        },
}