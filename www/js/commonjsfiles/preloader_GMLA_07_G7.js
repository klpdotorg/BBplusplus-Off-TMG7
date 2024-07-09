Game.preloader_GMLA_07_G7 = function (game) {
        this.preloadBar = null;
};

var chime, clockTick;
Game.preloader_GMLA_07_G7.prototype = {
        preload: function () { 
                // this.load.video('GMLA-07-G7_1', 'demoVideos/GMLA-07-G7.mp4');   //* include demo video of game.
                this.load.image('skipArrow', window.baseUrl +'assets/commonAssets/skipArrow.png');
                this.load.image('close', window.baseUrl +'assets/commonAssets/close.png');

                this.load.atlas('bulb', window.baseUrl +'assets/commonAssets/bulb.png', null, GMLA_07_G7_JSON.bulbBtnJson);

                this.load.atlas('backbtn', window.baseUrl +'assets/commonAssets/backbtn.png', null, GMLA_07_G7_JSON.backbtnJson);
                this.load.atlas('CommonSpeakerBtn', window.baseUrl +'assets/commonAssets/speaker.png', null, GMLA_07_G7_JSON.speakerJson);
                this.load.atlas('starAnim', window.baseUrl +'assets/commonAssets/starAnim.png', null, GMLA_07_G7_JSON.starAnimJson);
                this.load.atlas('replay', window.baseUrl +'assets/commonAssets/reply.png', null, GMLA_07_G7_JSON.replyJson);

                this.load.image('navBar', window.baseUrl +'assets/commonAssets/navBar.png');
                this.load.image('timebg', window.baseUrl +'assets/commonAssets/timebg.png');
                 this.load.image('hand', window.baseUrl +'assets/commonAssets/hand.png');

                this.load.atlas('CommonHomeBtn', window.baseUrl +'assets/commonAssets/homeBtn.png', null, GMLA_07_G7_JSON.homebtnJson);
                this.load.atlas('CommonNextBtn', window.baseUrl +'assets/commonAssets/nextBtn.png', null, GMLA_07_G7_JSON.nextbtnJson);

                //game gradewindow.baseUrl + assets

                

                this.load.image('BG', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/Symbol 6.png');
                this.load.image('woodPeice', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/wood pees.png');
                this.load.image('panel2', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/panle_2.png');
                this.load.image('panel3', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/panle_3.png');
                this.load.image('panel4', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/panle_4.png');
                this.load.image('panel5', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/panle_5.png');
                this.load.image('scale', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/scale.png');

                this.load.image('symbol1', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/Symbol 1.png');
                this.load.image('symbol2', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/Symbol 2.png');
                this.load.image('symbol3', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/Symbol 3.png');
                
                this.load.image('Backbutton', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/Back btn.png');

                this.load.image('Textbox1', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/text box_1.png');
                this.load.image('Textbox2', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/text box_2.png');
                this.load.image('Textbox4', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/text box_4.png');
                this.load.atlas('Textbox3', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/text box_3.png', null, GMLA_07_G7_JSON.textBox3Json);
                this.load.atlas('TickBtn', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/TickBtn.png', null, GMLA_07_G7_JSON.tickJson);
               
                this.load.atlas('Numberpad', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/number pad.png', null, GMLA_07_G7_JSON.numberpadJson)
                this.load.image('numpadbg', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/numbg.png');

                this.load.atlas('thumsUp',window.baseUrl +'assets/gradeAssets/GMLA-07-G7/thums Up.png',null, GMLA_07_G7_JSON.thumsupJson);   
                this.load.atlas('thumsDown', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/thums down.png', null, GMLA_07_G7_JSON.thumsdownJson);

                this.load.atlas('WidthBox',window.baseUrl +'assets/gradeAssets/GMLA-07-G7/width box.png',null, GMLA_07_G7_JSON.widthBoxJson);   
                this.load.atlas('panel1', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/panle_1.png', null, GMLA_07_G7_JSON.panelJson);

                 //hint screenwindow.baseUrl + assets
                 this.load.image('back_arrow', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/arrow_1.png');
                 this.load.image('front_arrow', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/arrow_2.png');
                //  this.load.image('close', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/close_btn.png');
                this.load.image('bgbox2', window.baseUrl +'assets/gradeAssets/GMLA-07-G7/box2.png');
        },

        create: function () {

                this.state.start('GMLA_07_G7level1');
        },
}