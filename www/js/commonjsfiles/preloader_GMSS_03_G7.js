Game.preloader_GMSS_03_G7 = function (game) {
        this.preloadBar = null;
};

var chime, clockTick;
Game.preloader_GMSS_03_G7.prototype = {
        preload: function () { 
                //  this.load.video('nsrp02_1','demoVideos/AL-SUB-G7.mp4');   //* include demo video of game.
                this.load.image('skipArrow',  window.baseUrl +'assets/commonAssets/skipArrow.png');

                this.load.atlas('bulb',  window.baseUrl +'assets/commonAssets/bulb.png', null, GMSS_03_G7_JSON.bulbBtnJson);

                this.load.atlas('backbtn',  window.baseUrl +'assets/commonAssets/backbtn.png', null, GMSS_03_G7_JSON.backbtnJson);
                this.load.atlas('CommonSpeakerBtn',  window.baseUrl +'assets/commonAssets/speaker.png', null, GMSS_03_G7_JSON.speakerJson);
                this.load.atlas('starAnim',  window.baseUrl +'assets/commonAssets/starAnim.png', null, GMSS_03_G7_JSON.starAnimJson);
                this.load.atlas('replay',  window.baseUrl +'assets/commonAssets/reply.png', null, GMSS_03_G7_JSON.replyJson);
                this.load.image('navBar',  window.baseUrl +'assets/commonAssets/navBar.png');
                this.load.image('timebg',  window.baseUrl +'assets/commonAssets/timebg.png');
                this.load.image('hand',  window.baseUrl +'assets/commonAssets/hand.png');

                this.load.atlas('CommonHomeBtn',  window.baseUrl +'assets/commonAssets/homeBtn.png', null, GMSS_03_G7_JSON.homebtnJson);
                this.load.atlas('CommonNextBtn',  window.baseUrl +'assets/commonAssets/nextBtn.png', null, GMSS_03_G7_JSON.nextbtnJson);

                //game assets

                this.load.image('BG1',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/bg.png');

               // this.load.atlas('Box2',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/box 2.png', null, GMSS_03_G7_JSON.Box2);
                this.load.atlas('Box2',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/box_1.png', null, GMSS_03_G7_JSON.Box1);

                this.load.image('Box1',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/box.png');

                this.load.atlas('TickBtn',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/TickBtn.png', null, GMSS_03_G7_JSON.tickJson);

                this.load.image('beetroot_1',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/beetroot_1.png');
                this.load.image('beetroot_2',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/beetroot_2.png');//horizontal

                this.load.image('bread_1',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/bread_1.png');
                this.load.image('bread_2',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/bread_2.png');//vertical

                this.load.image('bringle_1',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/bringle_1.png');
                this.load.image('bringle_2',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/bringle_2.png');//horizontal
                this.load.image('bringle_3',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/bringle_3.png');//vertical

                this.load.image('butter_fruit_1',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/butter fruit_1.png');
                this.load.image('butter_fruit_2',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/butter fruit_2.png');//horizontal
                this.load.image('butter_fruit_3',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/butter fruit_3.png');//vertical

                this.load.image('cucumber_1',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/cucumber_1.png');
                this.load.image('cucumber_2',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/cucumber_2.png');//horizontal
                this.load.image('cucumber_3',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/cucumber_3.png');//vertical

                this.load.image('Kiwi_fruit_1',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/Kiwi fruit_1.png');
                this.load.image('Kiwi_fruit_2',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/Kiwi fruit_2.png');//horizontal
                this.load.image('Kiwi_fruit_3',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/Kiwi fruit_3.png');//vertical

                this.load.image('onion_1',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/onion_1.png');
                this.load.image('onion_2',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/onion_2.png');//vertical
                this.load.image('onion_3',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/onion_3.png');//horizontal

                this.load.image('Orange_1',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/Orange_1.png');
                this.load.image('Orange_2',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/Orange_2.png');//horizontal
                this.load.image('Orange_3',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/Orange_3.png');//vertical

                this.load.image('potato_1',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/potato_1.png');
                this.load.image('potato_2',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/potato_2.png');//horizontal
                this.load.image('potato_3',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/potato_3.png');//vertical

                this.load.image('Quins_fruit_1',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/Quins fruit_1.png');
                this.load.image('Quins_fruit_2',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/Quins fruit_2.png');//horizontal
                this.load.image('Quins_fruit_3',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/Quins fruit_3.png');//vertical

                this.load.image('star_fruit_1',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/star fruit_1.png');
                this.load.image('star_fruit_2',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/star fruit_2.png');//horizontal

                this.load.image('tomato_1',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/tomato_1.png');
                this.load.image('tomato_2',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/tomato_2.png');//horizontal
                this.load.image('tomato_3',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/tomato_3.png');//vertical
                
                this.load.image('horizontal_arrow',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/arrow_1.png');//horizontal
                this.load.image('vertical_arrow',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/arrow_2.png');//vertical

                // all shapes
              
                this.load.image('cylinder_green',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_1.png');
                this.load.image('cylinder_pink',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_2.png');
                this.load.image('rectangle_shape',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_3.png');
                this.load.image('square_shape_green',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_4.png');       
                this.load.image('square_shape_pink',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_5.png');               
                this.load.image('circle_shape',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_6.png');
                this.load.image('drop_shape_blue',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_7.png');
                this.load.image('star_shape_pink',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_8.png');
                this.load.image('heart_shape',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_9.png');
                this.load.image('hexagon_shape',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_10.png');
                this.load.image('ovel_shape_vertical',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_11.png');
                this.load.image('triangle_shape_pink',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_12.png');
                this.load.image('flower_shape',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_13.png');  
                this.load.image('square_shape_orange',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_14.png');   
                this.load.image('ovel_shape_horizontal',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_15.png');    
                this.load.image('star_shape_green',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_16.png');
                this.load.image('parallel_shape_vertical',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_17.png');
                this.load.image('waterdrop_shape',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_18.png');
                this.load.image('drop_shape_pink',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_19.png');
                this.load.image('triangle_shape_green',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_20.png');
                this.load.image('parallel_shape_horizontal',  window.baseUrl +'assets/gradeAssets/GMSS-03-G7/all Shaps/shape_21.png');
               
               

        },

        create: function () {

                this.state.start('GMSS_03_G7level1');
        },
}