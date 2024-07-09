Game.preloader_GMLA_04_G7 = function (game) {
        this.preloadBar = null;
};

var chime, clockTick;
Game.preloader_GMLA_04_G7.prototype = { 
        preload: function () { 
                // this.load.video('GMLA-04-G7_1', 'demoVideos/GMLA-04-G7.mp4');   //* include demo video of game.
                this.load.image('skipArrow', window.baseUrl +'assets/commonAssets/skipArrow.png');
                this.load.image('close', window.baseUrl +'assets/commonAssets/close.png');

                this.load.atlas('bulb', window.baseUrl +'assets/commonAssets/bulb.png', null, GMLA_04_G7_JSON.bulbBtnJson);

                this.load.atlas('backbtn', window.baseUrl +'assets/commonAssets/backbtn.png', null, GMLA_04_G7_JSON.backbtnJson);
                this.load.atlas('CommonSpeakerBtn', window.baseUrl +'assets/commonAssets/speaker.png', null, GMLA_04_G7_JSON.speakerJson);
                this.load.atlas('starAnim', window.baseUrl +'assets/commonAssets/starAnim.png', null, GMLA_04_G7_JSON.starAnimJson);
                this.load.atlas('replay', window.baseUrl +'assets/commonAssets/reply.png', null, GMLA_04_G7_JSON.replyJson);

                this.load.image('navBar', window.baseUrl +'assets/commonAssets/navBar.png');
                this.load.image('timebg', window.baseUrl +'assets/commonAssets/timebg.png');
                 this.load.image('hand', window.baseUrl +'assets/commonAssets/hand.png');

                this.load.atlas('CommonHomeBtn', window.baseUrl +'assets/commonAssets/homeBtn.png', null, GMLA_04_G7_JSON.homebtnJson);
                this.load.atlas('CommonNextBtn', window.baseUrl +'assets/commonAssets/nextBtn.png', null, GMLA_04_G7_JSON.nextbtnJson);

                //game gradewindow.baseUrl + assets


                this.load.image('BG', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/Bg.png');
                
                this.load.image('line1', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/blue line-1.1.png');
                this.load.image('line4', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/blue line-1.4.png');
                this.load.image('scene1.0', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-1/Scene-1.0.png');
                this.load.image('scene1.1', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-1/Scene-1.1.png');
                this.load.image('scene1.2', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-1/Scene-1.2.png');
                this.load.image('scene1.3', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-1/Scene-1.3.png');
                this.load.image('scene2.0', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-2/scene-2.0.png');
                this.load.image('scene2.1', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-2/scene-2.1.png');
                this.load.image('scene2.2', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-2/scene-2.2.png');
                this.load.image('scene3.0', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-3/scene-3.0.png');
                this.load.image('scene3.1', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-3/scene-3.1.png');
                this.load.image('scene3.2', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-3/scene-3.2.png');
                this.load.image('scene4.0', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-4/scene-4.0.png');
                this.load.image('scene4.1', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-4/scene-4.1.png');
                this.load.image('scene4.2', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-4/scene-4.2.png');
                this.load.image('scene5.0', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-5/scene-5.0.png');
                this.load.image('scene5.1', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-5/scene-5.1.png');
                this.load.image('scene5.2', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-5/scene-5.2.png');
                this.load.image('scene6.0', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-6/scene-6.0.png');
                this.load.image('scene6.1', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-6/scene-6.1.png');
                this.load.image('scene6.2', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-6/scene-6.2.png');
                this.load.image('scene7.0', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-7/scene-7.0.png');
                this.load.image('scene7.1', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-7/scene-7.1.png');
                this.load.image('scene7.2', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-7/scene-7.2.png');
                this.load.image('scene8.0', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-8/scene-8.0.png');
                this.load.image('scene8.1', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-8/scene-8.1.png');
                this.load.image('scene8.2', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/scene-8/scene-8.2.png');

                this.load.image('scene-1', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/PartB/Scene-1.png');
                this.load.image('scene-2', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/PartB/Scene-2.png');
                this.load.image('scene-3', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/PartB/Scene-3.png');
                this.load.image('scene-4', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/PartB/Scene-4.png');
                this.load.image('scene-5', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/PartB/Scene-5.png');
                this.load.image('scene-6', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/PartB/Scene-6.png');
                this.load.image('scene-7', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/PartB/Scene-7.png');
                this.load.image('scene-8', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/PartB/Scene-8.png');
                this.load.image('scene-11', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/PartB/Scene-11.png');
                this.load.image('scene-12', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/PartB/Scene-12.png');
                this.load.image('scene-13', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/PartB/Scene-13.png');
                this.load.image('scene-14', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/PartB/Scene-14.png');
                this.load.image('scene-15', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/PartB/Scene-15.png');
                this.load.image('scene-16', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/PartB/Scene-16.png');
                this.load.image('scene-9', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/PartB/Scene-9.png');
                this.load.image('scene-10', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/PartB/Scene-10.png');

                this.load.image('BG1', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/Bg1.png');

                this.load.image('AnswerBox', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/text box.png');
                this.load.image('Numpadbg',window.baseUrl +'assets/gradeAssets/GMLA-04-G7/numbg.png');
                this.load.atlas('Numberpad',window.baseUrl +'assets/gradeAssets/GMLA-04-G7/number pad1.png',null, GMLA_04_G7_JSON.numberpadJson);
 
                
              
                this.load.atlas('Number', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/1 to 9.png', null, GMLA_04_G7_JSON.oneToNineJson);
                this.load.atlas('NumberCircle', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/greenOrange.png', null, GMLA_04_G7_JSON.greenOrangeJson);

                this.load.atlas('NumberCircle1', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/brown pink.png', null, GMLA_04_G7_JSON.brownpinkJson);

                this.load.image('Red Circle_1', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/circle-1.png');
                this.load.image('Red Circle_2', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/circle-2.png');
                this.load.image('Red Circle_3', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/circle-3.png');

                // this.load.image('close', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/close btn.png');

                this.load.atlas('TickBtn', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/TickBtn.png', null, GMLA_04_G7_JSON.tickJson);

                this.load.image('bgbox2', window.baseUrl +'assets/gradeAssets/GMLA-04-G7/box2.png');

        },

        create: function () {

                this.state.start('GMLA_04_G7level1');
        },
}