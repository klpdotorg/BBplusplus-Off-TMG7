Game.preloader = function (game) {

};
var fx;

Game.preloader.prototype = {

    // init: function ()
    // {

    // },

    preload: function () {
        console.log("I am in preloader.js");


        _this = this;

        // var levelParameter = this.game.myParameter.level;
        _this.app_mode = window.app_mode;

        // console.log(_this.game.app_mode,"_this.game.app_mode");
        console.log(_this.app_mode);

        _this.bg = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'loadingBg1');

        _this.loadingSound = document.createElement('audio');
        _this.loadingSoundSrc = document.createElement('source');
        _this.loadingSoundSrc.setAttribute("src", "sounds/LoadingSound.mp3");
        _this.loadingSound.appendChild(_this.loadingSoundSrc);
        _this.loadingSound.loop = true;
        _this.loadingSound.play();
        _this.once = true;
        var preloadGrp = _this.add.group();
        _this.preloadBarOutline = _this.add.sprite(_this.world.centerX, _this.world.centerY, 'prgressbarOutLine');
        _this.preloadBars = _this.add.sprite(_this.world.centerX, _this.world.centerY, 'preloadBar');
        _this.time.advanceTiming = true;
        _this.load.setPreloadSprite(_this.preloadBars);
        preloadGrp.add(_this.preloadBarOutline);
        preloadGrp.add(_this.preloadBars);

        preloadGrp.x -= 105;
        //preloadGrp.y += 150;

        this.loadjscssfile("js/videoSkip.js", "js");
        this.loadjscssfile("js/gradeSelectionScreenJS/practice.js", "js");
        this.loadjscssfile("js/gradeSelectionScreenJS/selectgrade6MicroConceptScreen.js", "js");
        this.loadjscssfile("js/gradeSelectionScreenJS/grade6Algebra.js", "js");
        this.loadjscssfile("js/gradeSelectionScreenJS/grade6Geometry.js", "js");
        this.loadjscssfile("js/gradeSelectionScreenJS/grade6NumberSystems.js", "js");

        //** grade 7 
        this.loadjscssfile("js/gradeSelectionScreenJS/selectgrade7MicroConceptScreen.js", "js");
        this.loadjscssfile("js/gradeSelectionScreenJS/grade7Algebra.js", "js");
        this.loadjscssfile("js/gradeSelectionScreenJS/grade7Geometry.js", "js");
        this.loadjscssfile("js/gradeSelectionScreenJS/grade7NumberSystems.js", "js");

        this.loadjscssfile("js/commonjsfiles/score.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_Score.js", "js");
        

        //* Grade 7 games 
        this.loadjscssfile("js/commonjsfiles/preloader_AL_ADD_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_AL_ES_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_AL_SIM_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_AL_SUB_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_INT_DI1_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_INT_DI2_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_INT_DI3_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_INT_DI4_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_INT_ML1_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_INT_ML2_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_INT_ML3_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_INT_ML4_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_NSD_1_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_NSD_2_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_NSD_3_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_NSD_4_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_NSD_5_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_NSF_ADSB_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_NSF_CUIS_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_NSF_DFF_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_NSF_DFW_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_NSF_DWF_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_NSF_UNLAD_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_NSF_UNLSB_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_NSF_MLP_03_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_NSF_MLP_02_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_NSF_MLP_01_G7.js", "js");

        this.loadjscssfile("js/commonjsfiles/preloader_AL_SORT1_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_AL_SORT2_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_AL_TAR_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_GMLA_01_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_GMLA_02_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_GMLA_03_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_GMLA_04_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_GMLA_05_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_GMLA_06_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_GMLA_07_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_GMPYTH_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_GMSS_01_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_GMSS_02_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_GMSS_03_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_GMSS_04_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/preloader_NSD_6_G7.js", "js");

        this.loadjscssfile("js/commonjsfiles/loadJson_NSF_UNLSB_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_NSF_UNLAD_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_NSF_DWF_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_NSF_DFW_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_NSF_CUIS_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_NSF_ADSB_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_NSD_5_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_NSD_4_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_NSD_3_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_NSD_2_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_NSD_1_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_INT_ML4_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_INT_ML3_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_INT_ML2_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_INT_ML1_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_INT_DI4_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_INT_DI3_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_INT_DI2_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_INT_DI1_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_AL_SUB_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_AL_SIM_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_AL_ES_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_AL_ADD_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_NSF_DFF_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_NSF_MLP_01_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_NSF_MLP_02_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_NSF_MLP_03_G7.js", "js");

        this.loadjscssfile("js/commonjsfiles/loadJson_AL_SORT1_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_AL_SORT2_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_AL_TAR_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_GMLA_01_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_GMLA_02_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_GMLA_03_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_GMLA_04_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_GMLA_05_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_GMLA_06_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_GMLA_07_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_GMPYTH_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_GMSS_01_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_GMSS_02_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_GMSS_03_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_GMSS_04_G7.js", "js");
        this.loadjscssfile("js/commonjsfiles/loadJson_NSD_6_G7.js", "js");

        this.loadjscssfile("js/gradejs/NSF-UNLSB-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/NSF-UNLAD-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/NSF-DWF-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/NSF-DFW-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/NSF-CUIS-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/NSF-ADSB-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/NSD-5-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/NSD-4-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/NSD-3-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/NSD-2-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/NSD-1-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/INT-ML-4-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/INT-ML-3-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/INT-ML-2-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/INT-ML-1-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/INT-DI-4-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/INT-DI-3-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/INT-DI-2-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/INT-DI-1-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/AL-SUB-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/AL-SIM-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/AL-ES-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/AL-ADD-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/NSF-DFF-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/NSF-MLP-01-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/NSF-MLP-02-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/NSF-MLP-03-G7/level1.js", "js");

        this.loadjscssfile("js/gradejs/AL-SORT1-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/AL-SORT2-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/AL-TAR-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/GM-PYTH-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/GMLA-01-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/GMLA-02-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/GMLA-03-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/GMLA-04-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/GMLA-05-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/GMLA-06-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/GMLA-07-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/GMSS_01_G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/GMSS_02_G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/GMSS-03-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/GMSS-04-G7/level1.js", "js");
        this.loadjscssfile("js/gradejs/NSD-6-G7/level1.js", "js");


        //*level,json,preloader

        //// ***************************** loading the video files *****************************************//
        this.load.video('demo7_1_1', './demo.mp4');
        this.load.video('demo', './demo.mp4');

        _this.addgradeSelectionAssets();
        _this.addgrade6SelectionAssets();
        _this.loadCommonAssets();

        _this.load.audio('ClickSound', 'sounds/ClickSound.mp3');

        this.loadCommonAssets1();
        _this.selectLang();
    },

    selectLang: function (lang) {
        console.log(lang, "langggggg")
    },

    progress: function (progress, cacheKey, success, totalLoaded, totalFiles) {
        _this.preloadBar.frame = progress;
    },

    progress1: function (progress, cacheKey, success, totalLoaded, totalFiles) {

        if (progress == 8) {
            _this.tween = _this.add.tween(_this.preloadBar);
            _this.tween.to({ x: 120 }, 0, Phaser.Easing.Sinusoidal.InOut, true, 0);
        }
        else if (progress == 25) {
            _this.tween = _this.add.tween(_this.preloadBar);
            _this.tween.to({ x: 240 }, 0, Phaser.Easing.Sinusoidal.InOut, true, 0);
        }
        else if (progress == 37) {
            _this.tween = _this.add.tween(_this.preloadBar);
            _this.tween.to({ x: 360 }, 0, Phaser.Easing.Sinusoidal.InOut, true, 0);
        }
        else if (progress == 50) {
            _this.tween = _this.add.tween(_this.preloadBar);
            _this.tween.to({ x: 480 }, 0, Phaser.Easing.Sinusoidal.InOut, true, 0);
        }
        else if (progress == 62) {
            _this.tween = _this.add.tween(_this.preloadBar);
            _this.tween.to({ x: 600 }, 0, Phaser.Easing.Sinusoidal.InOut, true, 0);
        }
        else if (progress == 75) {
            _this.tween = _this.add.tween(_this.preloadBar);
            _this.tween.to({ x: 720 }, 0, Phaser.Easing.Sinusoidal.InOut, true, 0);
        }
        else if (progress == 85) {
            _this.tween = _this.add.tween(_this.preloadBar);
            _this.tween.to({ x: 820 }, 0, Phaser.Easing.Sinusoidal.InOut, true, 0);
        }
        else if (progress == 92) {
            _this.tween = _this.add.tween(_this.preloadBar);
            _this.tween.to({ x: 1000 }, 0, Phaser.Easing.Sinusoidal.InOut, true, 0);
        }
        else if (progress == 97) {
            _this.preloadBar.x = 1000;
        }

    },

    addgradeSelectionAssets: function () {
        _this.load.atlas('MicroConceptTree', window.baseUrl + 'assets/gradeSelectionScreenAssets/microConceptTree.png', window.baseUrl + 'json/gradeSelectionScreenJson/microConceptTree.json');
        _this.load.image('McBg', window.baseUrl + 'assets/gradeSelectionScreenAssets/McBg.png');
        _this.load.image('gameselectBg', window.baseUrl + 'assets/gradeSelectionScreenAssets/gradeSelectBg.png');
        _this.load.image('gradeSceneBackBtn', window.baseUrl + 'assets/gradeSelectionScreenAssets/gradeSceneBackBtn.png');
        _this.load.atlas('gradeCloud', window.baseUrl + 'assets/gradeSelectionScreenAssets/grade1Cloudnew.png', window.baseUrl + 'assets/gradeSelectionScreenAssets/grade1Cloudnew.json');

    },

    addgrade6SelectionAssets: function () {
        // _this.load.image('FM_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/FM-1.png');
        // _this.load.image('FM_3_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/FM-3.png');
        // _this.load.image('FM_4_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/FM-4.png');
        // _this.load.image('FSM_2_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/FSM-2.png');
        // _this.load.image('FSM_5_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/FSM-5.png');
        // _this.load.image('HCF_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/HCF-1.png');
        // _this.load.image('HornINT_5_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/HornINT-5.png');
        // _this.load.image('HornINT_6_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/HornINT-6.png');
        // _this.load.image('HornINT_13_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/HornINT-13.png');
        // _this.load.image('HornINT_14_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/HornINT-14.png');
        // _this.load.image('INT_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/INT-1.png');
        // _this.load.image('INT_3_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/INT-3.png');
        // _this.load.image('INT_5_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/INT-5.png');
        // _this.load.image('INT_6_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/INT-6.png');
        // _this.load.image('INT_7_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/INT-7.png');
        // _this.load.image('INT_8_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/INT-8.png');
        // _this.load.image('INT_9_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/INT-9.png');
        // _this.load.image('INT_10_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/INT-10.png');
        // _this.load.image('INT_11_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/INT-11.png');
        // _this.load.image('INT_12_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/INT-12.png');
        // _this.load.image('LCM_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/LCM-1.png');
        // _this.load.image('NSF_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-1.png');
        // _this.load.image('NSF_3_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-3.png');
        // _this.load.image('NSF_4_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-4.png');
        // _this.load.image('NSF_6_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-6.png');
        // _this.load.image('NSF_7_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-7.png');
        // _this.load.image('NSF_8_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-8.png');
        // _this.load.image('NSF_9_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-9.png');
        // _this.load.image('NSF_10_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-10.png');
        // _this.load.image('NSF_11_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-11.png');
        // _this.load.image('NSF_12_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-12.png');
        // _this.load.image('NSF_13_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-13.png');
        // _this.load.image('NSF_14_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-14.png');
        // _this.load.image('NSF_15_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-15.png');
        // _this.load.image('OE_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/OE-1.png');
        // _this.load.image('PRM_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/PRM-1.png');
        // //*Ratio and proportion
        // _this.load.image('NSRP_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSRP-1.png');
        // _this.load.image('NSRP_2_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSRP-2.png');
        // _this.load.image('NSRP_3_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSRP-3.png');
        // //*Geometry
        // _this.load.image('GMS_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/GMS-1.png');
        // _this.load.image('GMS_2_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/GMS-2.png');
        // _this.load.image('GMS_3_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/GMS-3.png');
        // _this.load.image('GMR_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/GMR-1.png');
        // _this.load.image('GMPAR_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/GMPAR-1.png');
        // _this.load.image('GMCR_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/GMCR-1.png');
        // _this.load.image('GMAN_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/GMAN-1.png');
        // //*Decimals
        // _this.load.image('NSD_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-1.png');
        // _this.load.image('NSD_2A_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-2A.png');
        // _this.load.image('NSD_2B_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-2B.png');
        // _this.load.image('NSD_3A_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-3A.png');
        // _this.load.image('NSD_5A_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-5A.png');
        // _this.load.image('NSD_5B_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-5B.png');
        // _this.load.image('NSD_3B_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-3B.png');
        // _this.load.image('NSD_4A_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-4A.png');
        // _this.load.image('NSD_4B_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-4B.png');
        // _this.load.image('NSD_4C_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-4C.png');
        // _this.load.image('NSD_4D_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-4D.png');
        // _this.load.image('NSD_4E_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-4E.png');
        // _this.load.image('NSD_6A_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-6A.png');
        // _this.load.image('NSD_6B_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-6B.png');
        // //_this.load.image('GMAN_1_Screen',window.baseUrl+'assets/gradeSelectionScreenAssets/GMAN-1.png');
        // //*Algebra
        // _this.load.image('ALAS_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/ALAS-1.png');
        // _this.load.image('ALA_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/ALA-1.png');
        // _this.load.image('ALS_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/ALS-1.png');
        // _this.load.image('ALS_2_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/ALS-2.png');
        // _this.load.image('ALM_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/ALM-1.png');
        // _this.load.image('ALM_2_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/ALM-2.png');
        // _this.load.image('ALD_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/ALD-1.png');
        // _this.load.image('ALMAZE_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/ALMAZE-1.png');
        // _this.load.image('ALMEM_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/ALMEM-1.png');
        // _this.load.image('ALP_2_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/ALP-02.png');
        // _this.load.image('ALP_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/ALP-1.png');

        //* Grade 7 Games icons
        _this.load.image('AL_SIM_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/AL-SIM-G7.png');
        _this.load.image('AL_SUB_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/AL-SUB-G7.png');
        _this.load.image('AS_ES_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/AL-ES-G7.png');
        _this.load.image('AL_ADD_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/AL-ADD-G7.png');
        _this.load.image('AL_SORT1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/AL-SORT1-G7.png');
        _this.load.image('AL_SORT2_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/AL-SORT2-G7.png');
        _this.load.image('AL_TAR_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/AL-TAR-G7.png');
        //INT 
        _this.load.image('INT_DI_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/INT-DI-1-G7.png');
        _this.load.image('INT_DI_2_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/INT-DI-2-G7.png');
        _this.load.image('INT_DI_3_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/INT-DI-3-G7.png');
        _this.load.image('INT_DI_4_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/INT-DI-4-G7.png');
        _this.load.image('INT_ML_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/INT-ML-1-G7.png');
        _this.load.image('INT_ML_2_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/INT-ML-2-G7.png');
        _this.load.image('INT_ML_3_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/INT-ML-3-G7.png');
        _this.load.image('INT_ML_4_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/INT-ML-4-G7.png');

        //Fraction
        _this.load.image('NSF_ADSB_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-ADSB-G7.png');
        _this.load.image('NSF_CUIS_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-CUIS-G7.png');
        _this.load.image('NSF_DFF_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-DFF-G7.png');
        _this.load.image('NSF_DFW_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-DFW-G7.png');
        // _this.load.image('ALM_2_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/ALM-2.png');
        _this.load.image('NSF_DWF_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-DWF-G7.png');
        _this.load.image('NSF_MLP_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-MLP-1-G7.png');
        _this.load.image('NSF_MLP_2_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-MLP-2-G7.png');
        _this.load.image('NSF_MLP_3_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-MLP-3-G7.png');
        _this.load.image('NSF_UNLAD_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-UNLAD-G7.png');
        _this.load.image('NSF_UNLSB_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSF-UNLSB-G7.png');

        //NSD
        _this.load.image('NSD_1_G7Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-1-G7.png');
        _this.load.image('NSD_2_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-2-G7.png');
        _this.load.image('NSD_3_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-3-G7.png');
        _this.load.image('NSD_4_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-4-G7.png');
        _this.load.image('NSD_5_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-5-G7.png');
        _this.load.image('NSD_6_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/NSD-6-G7.png');

        //Geometry games g7
        _this.load.image('GMLA_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/GMLA-01-G7.png');
        _this.load.image('GMLA_2_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/GMLA-02-G7.png');
        _this.load.image('GMLA_3_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/GMLA-03-G7.png');
        _this.load.image('GMLA_4_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/GMLA-04-G7.png');
        _this.load.image('GMLA_5_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/GMLA-05-G7.png');
        _this.load.image('GMLA_6_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/GMLA-06-G7.png');
        _this.load.image('GMLA_7_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/GMLA-07-G7.png');
        _this.load.image('GM_PYTH_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/GM-PYTH-G7.png');
        _this.load.image('GMSS_1_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/GMSS_01_G7.png');
        _this.load.image('GMSS_2_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/GMSS_02_G7.png');
        _this.load.image('GMSS_3_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/GMSS-03-G7.png');
        _this.load.image('GMSS_4_Screen', window.baseUrl + 'assets/gradeSelectionScreenAssets/GMSS-04-G7.png');

    },

    loadCommonAssets: function () {

        this.load.image("shareIcon", "assets/shareIcon.png");
        this.load.image("timeIcon", "assets/timeIcon.png");
        this.load.image("userProgressIcon", "assets/userProgressIcon.png");
        _this.load.atlas("progressCircle", "assets/progressCircle.png", "assets/progressCircle.json");

        this.load.image("shareIconScore", "assets/shareIconScore.png");
        _this.load.atlas('newCommonBackBtnForAll', window.baseUrl + 'assets/commonAssets/newBackBtn.png', window.baseUrl + 'assets/commonAssets/newBackBtn.json');

        _this.load.image('gameModeBg', window.baseUrl + 'assets/gradeSelectionScreenAssets/gameModeBg.png');
        _this.load.image('gameModeNavBar', window.baseUrl + 'assets/gradeSelectionScreenAssets/gameModeNavBar.png');


        _this.load.image('gameModeBackBtn', window.baseUrl + 'assets/gradeSelectionScreenAssets/gameModeBackBtn.png');
        _this.load.image('skipDemoVideos', window.baseUrl + 'assets/commonAssets/skipArrow.png');

        _this.load.image('commonBg1', window.baseUrl + 'assets/commonAssets/commonBg1.png');
        _this.load.image('commonBg2', window.baseUrl + 'assets/commonAssets/commonBg2.png');
        _this.load.image('bottomBar', window.baseUrl + 'assets/commonAssets/bottomBar.png');
        _this.load.atlas('CommonStarAnim', window.baseUrl + 'assets/commonAssets/starAnim.png', window.baseUrl + 'json/commonJson/starAnim.json');

        //load common assets.
        _this.load.atlas('CommonBackBtn', window.baseUrl + 'assets/commonAssets/backbtn.png', window.baseUrl + 'json/commonJson/backbtn.json');
        _this.load.atlas('CommonSpeakerBtn', window.baseUrl + 'assets/commonAssets/speaker.png', window.baseUrl + 'json/commonJson/speaker.json');

        _this.load.atlas('starAnim1', window.baseUrl + 'assets/commonAssets/starAnim1.png', window.baseUrl + 'json/commonJson/starAnim1.json');
    },

    loadCommonAssets1: function () {

        this.load.image("mcIconNumber", window.baseUrl + "assets/commonAssets/number.png");
        this.load.image("mcIconInteger", window.baseUrl + "assets/commonAssets/icon 1.png");
        this.load.image("mcIconFraction", window.baseUrl + "assets/commonAssets/fraction.png");
        this.load.image("mcIconAlgebra", window.baseUrl + "assets/commonAssets/icon 4.png");
        //this.load.image("mcIconPatterns",window.baseUrl+"assets/commonAssets/");
        this.load.image("mcIconShapes", window.baseUrl + "assets/commonAssets/icon 5.png");
        this.load.image("mcIconMensuration", window.baseUrl + "assets/commonAssets/icon 6.png");
        this.load.image("mcIconDecimal", window.baseUrl + "assets/commonAssets/icon 2.png");
        this.load.image("mcIconRatioProportion", window.baseUrl + "assets/commonAssets/icon 3.png");
        this.load.image("speakerBtn", window.baseUrl + "assets/commonAssets/speakerBtn.png");
        this.load.image("timerBg", window.baseUrl + "assets/commonAssets/timerBg.png");
        this.load.image("navBar", window.baseUrl + "assets/commonAssets/Nv bar.png");
        this.load.image("hand", window.baseUrl + "assets/commonAssets/hand.png");
        this.load.image("transparent", window.baseUrl + "assets/commonAssets/transparent.png");
        this.load.image("bottomBar", window.baseUrl + "assets/commonAssets/bottomBar.png");
        this.load.image("skipDemoVideos", window.baseUrl + "assets/commonAssets/skipArrow.png");
    },

    create: function (game) {

        game.state.add('practiceModegradeSelectionScreen', Game.practiceModegradeSelectionScreen);

        game.state.add('selectgrade6MicroConceptScreen', Game.selectgrade6MicroConceptScreen);
        game.state.add('selectgrade7MicroConceptScreen', Game.selectgrade7MicroConceptScreen);

        game.state.add('score', Game.score);
        game.state.add('grade6Algebra', Game.grade6Algebra);
        game.state.add('grade6Decimals', Game.grade6Decimals);
        game.state.add('grade6Geometry', Game.grade6Geometry);
        game.state.add('grade6NumberSystems', Game.grade6NumberSystems);
        game.state.add('grade6RatioandProportion', Game.grade6RatioandProportion);

        game.state.add('grade7Geometry', Game.grade7Geometry);
        game.state.add('grade7NumberSystems', Game.grade7NumberSystems);
        game.state.add('grade7Algebra', Game.grade7Algebra);

        //Testing game fm-1
        // game.state.add('preloader_fm_1', Game.preloader_fm_1);
        // game.state.add('preloader_fm_2', Game.preloader_fm_2);
        // game.state.add('NS_FM_1_G6level1', Game.NS_FM_1_G6level1);
        // game.state.add('NS_FM_2_G6level1', Game.NS_FM_2_G6level1);
        // game.state.add('NS_FM_1_G6demo', Game.NS_FM_1_G6demo);
        // game.state.add('preloader_hcf_1', Game.preloader_hcf_1);
        // game.state.add('NS_HCF_1_G6level1', Game.NS_HCF_1_G6level1);
        // game.state.add('NS_HCF_1_G6demo', Game.NS_HCF_1_G6demo);
        // game.state.add('preloader_lcm_1', Game.preloader_lcm_1);
        // game.state.add('NS_LCM_1_G6demo', Game.NS_LCM_1_G6demo);
        // game.state.add('NS_LCM_1_G6level1', Game.NS_LCM_1_G6level1);
        // game.state.add('preloader_fm_3', Game.preloader_fm_3);
        // game.state.add('NS_FM_3_G6demo', Game.NS_FM_3_G6demo);
        // game.state.add('NS_FM_3_G6level1', Game.NS_FM_3_G6level1);
        // game.state.add('preloader_prm_1', Game.preloader_prm_1);
        // game.state.add('NS_PRM_1_G6demo', Game.NS_PRM_1_G6demo);
        // game.state.add('NS_PRM_1_G6level1', Game.NS_PRM_1_G6level1);
        // game.state.add('preloader_oe_1a', Game.preloader_oe_1a);
        // game.state.add('NS_OE_1_G6demo', Game.NS_OE_1_G6demo);
        // game.state.add('NS_OE_1A_G6level1', Game.NS_OE_1A_G6level1);
        // game.state.add('NS_OE_1B_G6level1', Game.NS_OE_1B_G6level1);
        // game.state.add('preloader_fm_4a', Game.preloader_fm_4a);
        // game.state.add('preloader_fm_4b', Game.preloader_fm_4b);
        // game.state.add('NS_FM_4_G6demo', Game.NS_FM_4_G6demo);
        // game.state.add('NS_FM_4A_G6level1', Game.NS_FM_4A_G6level1);
        // game.state.add('NS_FM_4B_G6level1', Game.NS_FM_4B_G6level1);

        // game.state.add('preloader_int_8', Game.preloader_int_8);
        // game.state.add('preloader_int_7', Game.preloader_int_7);
        // game.state.add('NS_INT_7_G6demo', Game.NS_INT_7_G6demo);
        // game.state.add('NS_INT_8_G6level1', Game.NS_INT_8_G6level1);
        // game.state.add('NS_INT_7_G6level1', Game.NS_INT_7_G6level1);

        // game.state.add('preloader_int_3', Game.preloader_int_3);
        // game.state.add('NS_INT_2_G6demo', Game.NS_INT_2_G6demo);
        // game.state.add('NS_INT_3_G6level1', Game.NS_INT_3_G6level1);

        // game.state.add('preloader_int_1', Game.preloader_int_1);
        // game.state.add('NS_INT_1_G6demo', Game.NS_INT_1_G6demo);
        // game.state.add('NS_INT_1_G6level1', Game.NS_INT_1_G6level1);
        // game.state.add('NS_INT_2_G6level1', Game.NS_INT_2_G6level1);

        // game.state.add('preloader_int_14h', Game.preloader_int_14h);
        // game.state.add('NS_INT_14H_G6level1', Game.NS_INT_14H_G6level1);

        // game.state.add('preloader_int_13h', Game.preloader_int_13h);
        // game.state.add('NS_INT_13H_G6level1', Game.NS_INT_13H_G6level1);
        // game.state.add('preloader_int_5h', Game.preloader_int_5h);
        // game.state.add('NS_INT_5H_G6level1', Game.NS_INT_5H_G6level1);
        // game.state.add('preloader_int_6h', Game.preloader_int_6h);
        // game.state.add('NS_INT_6H_G6level1', Game.NS_INT_6H_G6level1);

        // game.state.add('preloader_int_9', Game.preloader_int_9);
        // game.state.add('preloader_int_10', Game.preloader_int_10);
        // game.state.add('NS_INT_9_G6level1', Game.NS_INT_9_G6level1);
        // game.state.add('NS_INT_10_G6level1', Game.NS_INT_10_G6level1);

        // game.state.add('preloader_int_11', Game.preloader_int_11);
        // game.state.add('preloader_int_12', Game.preloader_int_12);
        // game.state.add('NS_INT_11_G6level1', Game.NS_INT_11_G6level1);
        // game.state.add('NS_INT_12_G6level1', Game.NS_INT_12_G6level1);

        // game.state.add('preloader_nsf_5', Game.preloader_nsf_5);
        // game.state.add('NSF_5_G6level1', Game.NSF_5_G6level1);

        // game.state.add('preloader_nsf_7', Game.preloader_nsf_7);
        // game.state.add('NSF_7_G6level1', Game.NSF_7_G6level1);

        // game.state.add('preloader_nsf_15', Game.preloader_nsf_15);
        // game.state.add('NSF_15_G6level1', Game.NSF_15_G6level1);

        // game.state.add('preloader_nsf_14', Game.preloader_nsf_14);
        // game.state.add('NSF_14_G6level1', Game.NSF_14_G6level1);

        // game.state.add('preloader_nsf_13', Game.preloader_nsf_13);
        // game.state.add('NSF_13_G6level1', Game.NSF_13_G6level1);

        // game.state.add('preloader_nsf_12', Game.preloader_nsf_12);
        // game.state.add('NSF_12_G6level1', Game.NSF_12_G6level1);

        // game.state.add('preloader_int_5', Game.preloader_int_5);
        // game.state.add('preloader_int_6', Game.preloader_int_6);
        // game.state.add('NS_INT_5_G6level1', Game.NS_INT_5_G6level1);
        // game.state.add('NS_INT_6_G6level1', Game.NS_INT_6_G6level1);
        // game.state.add('NS_INT_3_G6demo', Game.NS_INT_3_G6demo);
        // game.state.add('NS_INT_4_G6demo', Game.NS_INT_4_G6demo);
        // game.state.add('NS_INT_4_G6level1', Game.NS_INT_4_G6level1);

        // game.state.add('preloader_nsf_10', Game.preloader_nsf_10);
        // game.state.add('NSF_10_G6level1', Game.NSF_10_G6level1);

        // game.state.add('preloader_nsf_11', Game.preloader_nsf_11);
        // game.state.add('NSF_11_G6level1', Game.NSF_11_G6level1);

        // game.state.add('preloader_nsf_8', Game.preloader_nsf_8);
        // game.state.add('NSF_8_G6level1', Game.NSF_8_G6level1);

        // game.state.add('preloader_nsf_2', Game.preloader_nsf_2);
        // game.state.add('NSF_2_G6level1', Game.NSF_2_G6level1);

        // game.state.add('preloader_nsf_4', Game.preloader_nsf_4);
        // game.state.add('NSF_4_G6level1', Game.NSF_4_G6level1);

        // game.state.add('preloader_nsf_9a', Game.preloader_nsf_9a);
        // game.state.add('preloader_nsf_9b', Game.preloader_nsf_9b);
        // game.state.add('NSF_9A_G6level1', Game.NSF_9A_G6level1);
        // game.state.add('NSF_9B_G6level1', Game.NSF_9B_G6level1);

        // game.state.add('NSF_1A_G6level1', Game.NSF_1A_G6level1);
        // game.state.add('NSF_1A_G6demo', Game.NSF_1A_G6demo);
        // game.state.add('NSF_1B_G6level1', Game.NSF_1B_G6level1);

        // game.state.add('NSF_3_G6level1', Game.NSF_3_G6level1);
        // game.state.add('NSF_3_G6demo', Game.NSF_3_G6demo);

        // game.state.add('NSF_6_G6level1', Game.NSF_6_G6level1);
        // game.state.add('NSF_6_G6demo', Game.NSF_6_G6demo);

        // game.state.add('preloader_NSRP_01_G6', Game.preloader_NSRP_01_G6);
        // game.state.add('NSRP_01_G6level1', Game.NSRP_01_G6level1);

        // game.state.add('preloader_NSRP_02_G6', Game.preloader_NSRP_02_G6);
        // game.state.add('NSRP_02_G6level1', Game.NSRP_02_G6level1);

        // game.state.add('preloader_NSRP_03_G6', Game.preloader_NSRP_03_G6);
        // game.state.add('NSRP_03_G6level1', Game.NSRP_03_G6level1);

        // game.state.add('preloader_GMS_01_G6', Game.preloader_GMS_01_G6);
        // game.state.add('GMS_01_G6level1', Game.GMS_01_G6level1);

        // game.state.add('preloader_GMS_03_G6', Game.preloader_GMS_03_G6);
        // game.state.add('GMS_03_G6level1', Game.GMS_03_G6level1);

        // game.state.add('preloader_GMS_02_G6', Game.preloader_GMS_02_G6);
        // game.state.add('GMS_02_G6level1', Game.GMS_02_G6level1);

        // game.state.add('preloader_GMR_01_G6', Game.preloader_GMR_01_G6);
        // game.state.add('GMR_01_G6level1', Game.GMR_01_G6level1);

        // game.state.add('preloader_GMPAR_01_G6', Game.preloader_GMPAR_01_G6);
        // game.state.add('GMPAR_01_G6level1', Game.GMPAR_01_G6level1);
        // game.state.add('preloader_gmcr_01', Game.preloader_gmcr_01);
        // game.state.add('GMCR_01_G6level1', Game.GMCR_01_G6level1);
        // game.state.add('GMAN_01_G6level1', Game.GMAN_01_G6level1);

        // game.state.add('preloader_NSD_01_G6', Game.preloader_NSD_01_G6);
        // game.state.add('NSD_1_G6level1', Game.NSD_1_G6level1);
        // game.state.add('preloader_NSD_2A_G6', Game.preloader_NSD_2A_G6);
        // game.state.add('NSD_2A_G6level1', Game.NSD_2A_G6level1);
        // game.state.add('preloader_NSD_2B_G6', Game.preloader_NSD_2B_G6);
        // game.state.add('NSD_2B_G6level1', Game.NSD_2B_G6level1);
        // game.state.add('preloader_NSD_3A_G6', Game.preloader_NSD_3A_G6);
        // game.state.add('NSD_3A_G6level1', Game.NSD_3A_G6level1);
        // game.state.add('preloader_NSD_3B_G6', Game.preloader_NSD_3B_G6);
        // game.state.add('NSD_3B_G6level1', Game.NSD_3B_G6level1);
        // game.state.add('preloader_NSD_4A_G6', Game.preloader_NSD_4A_G6);
        // game.state.add('NSD_4A_G6level1', Game.NSD_4A_G6level1);
        // game.state.add('preloader_NSD_4B_G6', Game.preloader_NSD_4B_G6);
        // game.state.add('NSD_4B_G6level1', Game.NSD_4B_G6level1);
        // //
        // game.state.add('preloader_NSD_4C_G6', Game.preloader_NSD_4C_G6);
        // game.state.add('NSD_4C_G6level1', Game.NSD_4C_G6level1);
        // game.state.add('preloader_NSD_4D_G6', Game.preloader_NSD_4D_G6);
        // game.state.add('NSD_4D_G6level1', Game.NSD_4D_G6level1);
        // game.state.add('preloader_NSD_4E_G6', Game.preloader_NSD_4E_G6);
        // game.state.add('NSD_4E_G6level1', Game.NSD_4E_G6level1);
        // game.state.add('preloader_NSD_5A_G6', Game.preloader_NSD_5A_G6);
        // game.state.add('NSD_5A_G6level1', Game.NSD_5A_G6level1);
        // game.state.add('preloader_NSD_5B_G6', Game.preloader_NSD_5B_G6);
        // game.state.add('NSD_5B_G6level1', Game.NSD_5B_G6level1);
        // game.state.add('preloader_NSD_6A_G6', Game.preloader_NSD_6A_G6);
        // game.state.add('NSD_6A_G6level1', Game.NSD_6A_G6level1);
        // game.state.add('preloader_NSD_6B_G6', Game.preloader_NSD_6B_G6);
        // game.state.add('NSD_6B_G6level1', Game.NSD_6B_G6level1);
        //
        // game.state.add('preloader_ALM_02_FIB_G6', Game.preloader_ALM_02_FIB_G6);
        // game.state.add('ALM_02_FIB_G6level1', Game.ALM_02_FIB_G6level1);
        // game.state.add('preloader_ALM_01_MCQ_G6', Game.preloader_ALM_01_MCQ_G6);
        // game.state.add('ALM_01_MCQ_G6level1', Game.ALM_01_MCQ_G6level1);
        // game.state.add('preloader_ALD_01_G6', Game.preloader_ALD_01_G6);
        // game.state.add('ALD_01_G6level1', Game.ALD_01_G6level1);
        // game.state.add('preloader_ALAS_01_G6', Game.preloader_ALAS_01_G6);
        // game.state.add('ALAS_01_G6level1', Game.ALAS_01_G6level1);
        // game.state.add('preloader_ALA_01_G6', Game.preloader_ALA_01_G6);
        // game.state.add('ALA_01_G6level1', Game.ALA_01_G6level1);
        // game.state.add('preloader_AL_MEM_G6', Game.preloader_AL_MEM_G6);
        // game.state.add('AL_MEM_G6level1', Game.AL_MEM_G6level1);
        // game.state.add('preloader_AL_MAZE_G6', Game.preloader_AL_MAZE_G6);
        // game.state.add('AL_MAZE_G6level1', Game.AL_MAZE_G6level1);
        // game.state.add('preloader_ALP_01_G6', Game.preloader_ALP_01_G6);
        // game.state.add('ALP_01_G6level1', Game.ALP_01_G6level1);
        // game.state.add('preloader_ALP_02_G6', Game.preloader_ALP_02_G6);
        // game.state.add('ALP_02_G6level1', Game.ALP_02_G6level1);
        // game.state.add('preloader_ALS_01_MCQ_G6', Game.preloader_ALS_01_MCQ_G6);
        // game.state.add('ALS_01_MCQ_G6level1', Game.ALS_01_MCQ_G6level1);
        // game.state.add('preloader_ALS_02_FIB_G6', Game.preloader_ALS_02_FIB_G6);
        // game.state.add('ALS_02_FIB_G6level1', Game.ALS_02_FIB_G6level1);

        //* Grade 7 Games pre & level
        game.state.add('preloader_AL_ADD_G7', Game.preloader_AL_ADD_G7);
        game.state.add('AL_ADD_G7level1', Game.AL_ADD_G7level1);
        game.state.add('preloader_AL_ES_G7', Game.preloader_AL_ES_G7);
        game.state.add('AL_ES_G7level1', Game.AL_ES_G7level1);
        game.state.add('preloader_AL_SIM_G7', Game.preloader_AL_SIM_G7);
        game.state.add('AL_SIM_G7level1', Game.AL_SIM_G7level1);
        game.state.add('preloader_AL_SUB_G7', Game.preloader_AL_SUB_G7);
        game.state.add('AL_SUB_G7level1', Game.AL_SUB_G7level1);
        game.state.add('preloader_INT_DI1_G7', Game.preloader_INT_DI1_G7);
        game.state.add('INT_DI1_G7level1', Game.INT_DI1_G7level1);
        game.state.add('preloader_INT_DI2_G7', Game.preloader_INT_DI2_G7);
        game.state.add('INT_DI2_G7level1', Game.INT_DI2_G7level1);
        game.state.add('preloader_INT_DI3_G7', Game.preloader_INT_DI3_G7);
        game.state.add('INT_DI3_G7level1', Game.INT_DI3_G7level1);
        game.state.add('preloader_INT_DI4_G7', Game.preloader_INT_DI4_G7);
        game.state.add('INT_DI4_G7level1', Game.INT_DI4_G7level1);
        game.state.add('preloader_INT_ML1_G7', Game.preloader_INT_ML1_G7);
        game.state.add('INT_ML1_G7level1', Game.INT_ML1_G7level1);
        game.state.add('preloader_INT_ML2_G7', Game.preloader_INT_ML2_G7);
        game.state.add('INT_ML2_G7level1', Game.INT_ML2_G7level1);
        game.state.add('preloader_INT_ML3_G7', Game.preloader_INT_ML3_G7);
        game.state.add('INT_ML3_G7level1', Game.INT_ML3_G7level1);
        game.state.add('preloader_INT_ML4_G7', Game.preloader_INT_ML4_G7);
        game.state.add('INT_ML4_G7level1', Game.INT_ML4_G7level1);
        game.state.add('preloader_NSD_1_G7', Game.preloader_NSD_1_G7);
        game.state.add('NSD_1_G7level1', Game.NSD_1_G7level1);
        game.state.add('preloader_NSD_2_G7', Game.preloader_NSD_2_G7);
        game.state.add('NSD_2_G7level1', Game.NSD_2_G7level1);
        game.state.add('preloader_NSD_3_G7', Game.preloader_NSD_3_G7);
        game.state.add('NSD_3_G7level1', Game.NSD_3_G7level1);
        game.state.add('preloader_NSD_4_G7', Game.preloader_NSD_4_G7);
        game.state.add('NSD_4_G7level1', Game.NSD_4_G7level1);
        game.state.add('preloader_NSD_5_G7', Game.preloader_NSD_5_G7);
        game.state.add('NSD_5_G7level1', Game.NSD_5_G7level1);
        game.state.add('preloader_NSF_ADSB_G7', Game.preloader_NSF_ADSB_G7);
        game.state.add('NSF_ADSB_G7level1', Game.NSF_ADSB_G7level1);
        game.state.add('preloader_NSF_DFF_G7', Game.preloader_NSF_DFF_G7);
        game.state.add('NSF_DFF_G7level1', Game.NSF_DFF_G7level1);
        game.state.add('preloader_NSF_DFW_G7', Game.preloader_NSF_DFW_G7);
        game.state.add('NSF_DFW_G7level1', Game.NSF_DFW_G7level1);
        game.state.add('preloader_NSF_CUIS_G7', Game.preloader_NSF_CUIS_G7);
        game.state.add('NSF_CUIS_G7level1', Game.NSF_CUIS_G7level1);
        game.state.add('preloader_NSF_DWF_G7', Game.preloader_NSF_DWF_G7);
        game.state.add('NSF_DWF_G7level1', Game.NSF_DWF_G7level1);
        game.state.add('preloader_NSF_UNLAD_G7', Game.preloader_NSF_UNLAD_G7);
        game.state.add('NSF_UNLAD_G7level1', Game.NSF_UNLAD_G7level1);
        game.state.add('preloader_NSF_UNLSB_G7', Game.preloader_NSF_UNLSB_G7);
        game.state.add('NSF_UNLSB_G7level1', Game.NSF_UNLSB_G7level1);
        game.state.add('preloader_NSF_MLP_01_G7', Game.preloader_NSF_MLP_01_G7);
        game.state.add('NSF_MLP_01_G7level1', Game.NSF_MLP_01_G7level1);
        game.state.add('preloader_NSF_MLP_02_G7', Game.preloader_NSF_MLP_02_G7);
        game.state.add('NSF_MLP_02_G7level1', Game.NSF_MLP_02_G7level1);
        game.state.add('preloader_NSF_MLP_03_G7', Game.preloader_NSF_MLP_03_G7);
        game.state.add('NSF_MLP_03_G7level1', Game.NSF_MLP_03_G7level1);
        //tranche2
        game.state.add('preloader_AL_SORT1_G7', Game.preloader_AL_SORT1_G7);
        game.state.add('AL_SORT1_G7level1', Game.AL_SORT1_G7level1);
        game.state.add('preloader_AL_SORT2_G7', Game.preloader_AL_SORT2_G7);
        game.state.add('AL_SORT2_G7level1', Game.AL_SORT2_G7level1);
        game.state.add('preloader_AL_TAR_G7', Game.preloader_AL_TAR_G7);
        game.state.add('AL_TAR_G7level1', Game.AL_TAR_G7level1);
        game.state.add('preloader_NSD_6_G7', Game.preloader_NSD_6_G7);
        game.state.add('NSD_6_G7level1', Game.NSD_6_G7level1);
        game.state.add('preloader_GMSS_04_G7', Game.preloader_GMSS_04_G7);
        game.state.add('GMSS_04_G7level1', Game.GMSS_04_G7level1);
        game.state.add('preloader_GMSS_03_G7', Game.preloader_GMSS_03_G7);
        game.state.add('GMSS_03_G7level1', Game.GMSS_03_G7level1);
        game.state.add('preloader_GMSS_02_G7', Game.preloader_GMSS_02_G7);
        game.state.add('GMSS_02_G7level1', Game.GMSS_02_G7level1);
        game.state.add('preloader_GMSS_01_G7', Game.preloader_GMSS_01_G7);
        game.state.add('GMSS_01_G7level1', Game.GMSS_01_G7level1);
        game.state.add('preloader_GMPYTH_G7', Game.preloader_GMPYTH_G7);
        game.state.add('GMPYTH_G7level1', Game.GMPYTH_G7level1);
        game.state.add('preloader_GMLA_07_G7', Game.preloader_GMLA_07_G7);
        game.state.add('GMLA_07_G7level1', Game.GMLA_07_G7level1);
        game.state.add('preloader_GMLA_06_G7', Game.preloader_GMLA_06_G7);
        game.state.add('GMLA_06_G7level1', Game.GMLA_06_G7level1);
        game.state.add('preloader_GMLA_05_G7', Game.preloader_GMLA_05_G7);
        game.state.add('GMLA_05_G7level1', Game.GMLA_05_G7level1);
        game.state.add('preloader_GMLA_04_G7', Game.preloader_GMLA_04_G7);
        game.state.add('GMLA_04_G7level1', Game.GMLA_04_G7level1);
        game.state.add('preloader_GMLA_03_G7', Game.preloader_GMLA_03_G7);
        game.state.add('GMLA_03_G7level1', Game.GMLA_03_G7level1);
        game.state.add('preloader_GMLA_02_G7', Game.preloader_GMLA_02_G7);
        game.state.add('GMLA_02_G7level1', Game.GMLA_02_G7level1);
        game.state.add('preloader_GMLA_01_G7', Game.preloader_GMLA_01_G7);
        game.state.add('GMLA_01_G7level1', Game.GMLA_01_G7level1);

        //* preloader, level

        this.game.cache.removeImage('loadingBg1');
        this.game.cache.removeImage('loadingBg2');

        commonNavBar.addvideo(game);

        /*window.loadingFinished = true;
    	
        game.state.add('videoSkip',Game.videoSkip);
        _this.state.start('videoSkip',true,false);*/

        window.prevScreen = "practiceModegradeSelectionScreen";
        window.currScreen = "practiceModegradeSelectionScreen";

        if (window.userProgress == "true") {
            this.state.start('userprogress', true, false);
        } else {
            // 12-01-2023
            //if (localStorage.getItem("downloadComplete") == "true") {
            // window.baseUrl = cordova.file.externalRootDirectory + "Android/data/
            //com.Akshara.ENBBplusplus/Files/Download/.gameFilesBB++V10_2/www/";//cordova.file.externalDataDirectory + 
            if (window.app_Mode == "online") {
                console.log("Online app - its Preload");
                window.baseUrl = "https://abbmath.klp.org.in/bbplusplus/assets1/";
                _this.state.start('practiceModegradeSelectionScreen', true, false);
            } else {
                console.log("Offline app - its Preload");
                window.baseUrl = cordova.file.externalRootDirectory + "Android/data/com.Akshara.BBplusplusOffTMG7/Files/Download/.gameFilesBB++V10_2/www/";
                _this.state.start('practiceModegradeSelectionScreen', true, false);
            }
        }
    },

    loadjscssfile: function (filename, filetype) {
        if (filetype == "js") { //if filename is a external JavaScript file
            var fileref = document.createElement('script')
            fileref.setAttribute("type", "text/javascript")
            fileref.setAttribute("src", filename)
        }
        else if (filetype == "css") { //if filename is an external CSS file
            var fileref = document.createElement("link")
            fileref.setAttribute("rel", "stylesheet")
            fileref.setAttribute("type", "text/css")
            fileref.setAttribute("href", filename)
        }
        if (typeof fileref != "undefined")
            document.getElementsByTagName("head")[0].appendChild(fileref)
    },

    shutdown: function () {
        _this.preloadBar = null;
        if (_this.loadingSound) {
            if (_this.loadingSound.contains(_this.loadingSoundSrc)) {
                _this.loadingSound.removeChild(_this.loadingSoundSrc);
                _this.src = null;
            }
            if (!_this.loadingSound.paused) {
                //console.log("here");
                _this.loadingSound.pause();
                _this.loadingSound.currentTime = 0.0;
            }
            _this.loadingSound = null;
            _this.loadingSoundSrc = null;
        }


        /*if(window.score==0)
        {
              window.score = 50;
        }*/

        window.score = parseInt(localStorage.getItem(window.avatarName + "Score"));
        // remove an item
        //alert(Number.isNaN(window.score));
        if (window.score == null || window.score == undefined || window.score == "" || Number.isNaN(window.score)) {
            //alert("here");
            localStorage.setItem(window.avatarName + "Score", 50);
            window.score = parseInt(localStorage.getItem(window.avatarName + "Score"));
        }
        //alert(window.score);
    }
}