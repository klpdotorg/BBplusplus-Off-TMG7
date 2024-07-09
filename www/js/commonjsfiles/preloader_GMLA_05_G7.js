Game.preloader_GMLA_05_G7 = function (game) {
        this.preloadBar = null;
};

var chime, clockTick;
Game.preloader_GMLA_05_G7.prototype = {
        preload: function () { 
                // this.load.video('nsrp02_1', 'demoVideos/GMLA-05-G7.mp4');   //* include demo video of game.
                this.load.image('skipArrow', window.baseUrl +'assets/commonAssets/skipArrow.png');
                this.load.image('close', window.baseUrl +'assets/commonAssets/close.png');

                this.load.atlas('bulb', window.baseUrl +'assets/commonAssets/bulb.png', null, GMLA_05_G7_JSON.bulbBtnJson);

                this.load.atlas('backbtn', window.baseUrl +'assets/commonAssets/backbtn.png', null, GMLA_05_G7_JSON.backbtnJson);
                this.load.atlas('CommonSpeakerBtn', window.baseUrl +'assets/commonAssets/speaker.png', null, GMLA_05_G7_JSON.speakerJson);
                this.load.atlas('starAnim', window.baseUrl +'assets/commonAssets/starAnim.png', null, GMLA_05_G7_JSON.starAnimJson);
                this.load.atlas('replay', window.baseUrl +'assets/commonAssets/reply.png', null, GMLA_05_G7_JSON.replyJson);

                this.load.image('navBar', window.baseUrl +'assets/commonAssets/navBar.png');
                this.load.image('timebg', window.baseUrl +'assets/commonAssets/timebg.png');
                 this.load.image('hand', window.baseUrl +'assets/commonAssets/hand.png');

                this.load.atlas('CommonHomeBtn', window.baseUrl +'assets/commonAssets/homeBtn.png', null, GMLA_05_G7_JSON.homebtnJson);
                this.load.atlas('CommonNextBtn', window.baseUrl +'assets/commonAssets/nextBtn.png', null, GMLA_05_G7_JSON.nextbtnJson);

                //game gradewindow.baseUrl + assets

                this.load.image('BG1', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/Bg.png');
                
                this.load.image('cashew', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/cashew.png');
                this.load.image('cheese', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/cheese.png');
                this.load.image('cherry', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/cherry.png');
                this.load.image('close_btn', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/close btn.png');
                this.load.image('green_apple', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/green apple.png');
                this.load.image('objct_1', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/objct_1.png');
                this.load.image('objct_2', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/objct_2.png');
                this.load.image('objct_3', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/objct_3.png');
                this.load.image('orange', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/orange.png');
                this.load.image('panle_1', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/panle_1.png');
                this.load.image('panle_2', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/panle_2.png');
                this.load.image('panle_3', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/panle_3.png');
                this.load.image('panle_4', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/panle_4.png');
                this.load.image('protractor', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/protractor.png');
                this.load.image('sandwich', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/sandwich.png');
                this.load.image('strawberry', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/strawberry.png');
                this.load.image('sweet_1', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/sweet_1.png');
                this.load.image('sweet_2', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/sweet_2.png');
                this.load.image('sweet_3', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/sweet_3.png');
                this.load.image('waffer', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/sweet_4.png');
                this.load.image('watermelon', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/watermelon.png');
                this.load.image('pinkcircle', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/pink ofcircle.png');

                this.load.atlas('Angle_1', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/angle_1.png', null, GMLA_05_G7_JSON.angle_1);
                this.load.atlas('Angle_2', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/angle_2.png', null, GMLA_05_G7_JSON.angle_2);
                this.load.atlas('image_1_1', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/image_1.1.png', null, GMLA_05_G7_JSON.image_1_1);
                this.load.atlas('image_1_2', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/image_1.2.png', null, GMLA_05_G7_JSON.image_1_2);
                this.load.atlas('image_1', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/image_1.png', null, GMLA_05_G7_JSON.image_1);
                this.load.atlas('image_2', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/image_2.png', null, GMLA_05_G7_JSON.image_2);
                this.load.atlas('image_3', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/image_3.png', null, GMLA_05_G7_JSON.image_3);
                this.load.atlas('box', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/box.png', null, GMLA_05_G7_JSON.box);
                this.load.atlas('Y_and_Z', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/Y and Z.png', null, GMLA_05_G7_JSON.Y_and_Z);

                this.load.atlas('TickBtn', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/TickBtn.png', null, GMLA_05_G7_JSON.tickJson);

                //hint screenwindow.baseUrl + assets
                this.load.image('back_arrow', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/arrow_1.png');
                this.load.image('front_arrow', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/arrow_2.png');
                // this.load.image('close', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/close_btn.png');

                this.load.image('bgbox2', window.baseUrl +'assets/gradeAssets/GMLA-05-G7/box2.png');
        },

        create: function () {

                this.state.start('GMLA_05_G7level1');
        },
}