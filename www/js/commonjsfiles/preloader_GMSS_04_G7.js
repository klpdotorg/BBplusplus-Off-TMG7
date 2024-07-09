Game.preloader_GMSS_04_G7 = function (game) {
        this.preloadBar = null;
};
 
var chime, clockTick;
Game.preloader_GMSS_04_G7.prototype = {
        preload: function () {
                //  this.load.video('nsrp02_1','demoVideos/AL-SUB-G7.mp4');   //* include demo video of game.
                this.load.image('skipArrow',  window.baseUrl +'assets/commonAssets/skipArrow.png');

                this.load.atlas('bulb',  window.baseUrl +'assets/commonAssets/bulb.png', null, GMSS_04_G7_JSON.bulbBtnJson);

                this.load.atlas('backbtn',  window.baseUrl +'assets/commonAssets/backbtn.png', null, GMSS_04_G7_JSON.backbtnJson);
                this.load.atlas('CommonSpeakerBtn',  window.baseUrl +'assets/commonAssets/speaker.png', null, GMSS_04_G7_JSON.speakerJson);
                this.load.atlas('starAnim',  window.baseUrl +'assets/commonAssets/starAnim.png', null, GMSS_04_G7_JSON.starAnimJson);
                this.load.atlas('replay',  window.baseUrl +'assets/commonAssets/reply.png', null, GMSS_04_G7_JSON.replyJson);
                this.load.image('navBar',  window.baseUrl +'assets/commonAssets/navBar.png');
                this.load.image('timebg',  window.baseUrl +'assets/commonAssets/timebg.png');
                this.load.image('hand',  window.baseUrl +'assets/commonAssets/hand.png');

                this.load.atlas('CommonHomeBtn',  window.baseUrl +'assets/commonAssets/homeBtn.png', null, GMSS_04_G7_JSON.homebtnJson);
                this.load.atlas('CommonNextBtn',  window.baseUrl +'assets/commonAssets/nextBtn.png', null, GMSS_04_G7_JSON.nextbtnJson);

                this.load.image('BG1',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/Bg.png');

                //Boxes
                this.load.image('Box_1',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/Box_1.png');
                // this.load.image('Box_2',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/Box_2.png');//GMSS-04-G7\assets\gradeAssets\GMSS-04-G7\New folder
              //  this.load.atlas('Box_2',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/box.png', null, GMSS_04_G7_JSON.Bx2frame);
                this.load.atlas('Box_2',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/Box_2new.png', null, GMSS_04_G7_JSON.box2New);

                this.load.image('Box_3',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/Box_3.png');
                this.load.image('Box_4',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/Box_4.png');
                this.load.atlas('TickBtn',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/TickBtn.png', null, GMSS_04_G7_JSON.tickJson);
                // this.load.atlas('box 2',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/box 2.png', null, GMSS_04_G7_JSON.Box2);

                this.load.atlas('Box2',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/box 2.png', null, GMSS_04_G7_JSON.Box2);

                this.load.image('Box1',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/box11.png');

                //Torch
                this.load.image('torch1',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/torch light_1.png');
                this.load.image('torch2',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/torch light_2.png');

                // Part A 3D objects here goes
                this.load.image('Object1',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/3D shape _1.png');
                this.load.image('Object2',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/3D shape _2.png');
                this.load.image('Object3',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/3D shape _3.png');
                this.load.image('Object4',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/3D shape _4.png');
                this.load.image('Object5',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/3D shape _5.png');
                this.load.image('Object6',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/3D shape _6.png');
                this.load.image('Object7',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/3D shape _7.png');
                this.load.image('Object8',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/3D shape _8.png');
                this.load.image('Object9',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/3D shape _9.png');
                this.load.image('Object10',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/3D shape _10.png');
                this.load.image('Object11',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/3D shape _11.png');

                //Part A shapes 
                this.load.image('shape1',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/shape _1.png');
                this.load.image('shape2',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/shape _2.png');
                this.load.image('shape3',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/shape _3.png');
                this.load.image('shape4',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/shape _4.png');
                this.load.image('shape5',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/shape _5.png');
                this.load.image('shape6',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/shape _6.png');
                this.load.image('shape7',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/shape _7.png');
                this.load.image('shape8',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/shape _8.png');
                this.load.image('shape9',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/shape _9.png');
                this.load.image('shape10',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/shape _10.png');
                this.load.image('shape11',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/shape _11.png');
                this.load.image('shape12',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/shape _12.png');
                this.load.image('shape13',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/shape _13.png');
                this.load.image('shape14',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/shape _14.png');
                this.load.image('shape15',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/shape _15.png');
                this.load.image('shape16',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/shape _16.png');

                //Part B shapes 
                this.load.image('obj1',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/object_1.png');
                this.load.image('obj2',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/object_2.png');
                this.load.image('obj3',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/object_3.png');
                this.load.image('obj4',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/object_4.png');
                this.load.image('obj5',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/object_5.png');
                this.load.image('obj6',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/object_6.png');
                this.load.image('obj7',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/object_7.png');
                this.load.image('obj8',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/object_8.png');
                this.load.image('obj9',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/object_9.png');
                this.load.image('obj10',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/object_10.png');
                this.load.image('obj11',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/object_11.png');
                this.load.image('obj12',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/object_12.png');
                this.load.image('obj13',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/object_13.png');
                this.load.image('obj14',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/object_14.png');
                this.load.image('obj15',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/object_15.png');
                this.load.image('obj16',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/object_16.png');
                this.load.image('obj17',  window.baseUrl +'assets/gradeAssets/GMSS-04-G7/object_17.png');
        },

        create: function () {

                this.state.start('GMSS_04_G7level1');
        },
}