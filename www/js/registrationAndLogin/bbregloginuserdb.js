var bbreglogin = {

    databasename: "AppDatabase.db",
    providercode: "CAL",  // 3-char ID for the provider of the app/game. (e.g 'CAL' for Callystro)
    bbdbhandler: null,
    debugalerts: true,
    erroralerts: true,

    // Create/Open the database
    initializeDB: function () {

        if (bbreglogin.debugalerts)
            console.log("bbreglogin: Enter initialiseDB");

        this.bbdbhandler = window.sqlitePlugin.openDatabase(
            {
                name: this.databasename, location: 'default'
            },
            function () {
                if (bbreglogin.debugalerts)
                    console.log("bbreglogin: initialiseDS: openDatabase success");
            },
            function (msg) {
                if (bbreglogin.erroralerts)
                    console.log("bbreglogin: initialiseDS: openDatabase failed: " + msg);
                return false;
            }
        );

        // Creates/Opens the Tables
        this.createTables();

        if (bbreglogin.debugalerts)
            console.log("bbreglogin: Exit initialiseDS");

        return true;
    },

    deleteDS: function () {

        if (bbreglogin.debugalerts)
            console.log("bbreglogin: Enter deleteDS");

        this.bbdbhandler = window.sqlitePlugin.deleteDatabase(
            {
                name: this.databasename, location: 'default'
            },
            function () {
                if (bbreglogin.debugalerts)
                    console.log("bbreglogin: deleteDS: success");
            },
            function (msg) {
                if (bbreglogin.erroralerts)
                    console.log("bbreglogin: deleteDS: failed: " + msg);
                return false;
            }
        );

        if (bbreglogin.debugalerts)
            console.log("bbreglogin: Exit deleteDS");
    },

    // Create the tables
    createTables: function () {

        if (bbreglogin.debugalerts)
            console.log("bbreglogin: Enter createTables");

        this.bbdbhandler.sqlBatch([
            'CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, uid TEXT, name TEXT UNIQUE, phoneNumber TEXT, grade TEXT, schoolType TEXT, language TEXT, gender TEXT, avatarPicLocalPath TEXT, avatarBase64 TEXT, geo TEXT, geoForFireBase TEXT, age TEXT, deviceId TEXT, status TEXT, description TEXT, organization TEXT, lastUser TEXT, feedbackStatus TEXT )',
            ],
            function () {
                if (bbreglogin.debugalerts)
                    console.log("bbreglogin: createTables: success");
            },
            function (error) {
                if (bbreglogin.erroralerts)
                    console.log("bbreglogin: createTables: failed" + error.message);
                return false;
            }
        );

        if (bbreglogin.debugalerts)
            console.log("bbreglogin: Exit createTables");

        return true;
    },

    dropTables: function () {

        if (bbreglogin.debugalerts)
            console.log("bbreglogin: Enter dropTables");

        this.bbdbhandler.sqlBatch([
            'DROP TABLE IF EXISTS User',
            ],
            function () {
                if (bbreglogin.debugalerts)
                    console.log("bbreglogin: dropTables: success");
            },
            function (error) {
                if (bbreglogin.erroralerts)
                    console.log("bbreglogin: dropTables: failed" + error.message);
                return false;
            }
        );

        if (bbreglogin.debugalerts)
            console.log("bbreglogin: Exit dropTables");

        return true;
    },

};

var TestMgr_bbreglogin = {


    forTest: function () {

        // console.log("Enter forTest");

        // document.addEventListener('deviceready', this.doTest.bind(this), false);
        document.getElementById('test-btn1').addEventListener('click', this.doTest.bind(this, '1'), false);
        document.getElementById('test-btn2').addEventListener('click', this.doTest.bind(this, '2'), false);
        document.getElementById('test-btn3').addEventListener('click', this.doTest.bind(this, '3'), false);
        document.getElementById('prmtest-btn4').addEventListener('click', this.doTest.bind(this, '4'), false);
        document.getElementById('prmtest-btn5').addEventListener('click', this.doTest.bind(this, '5'), false);
        document.getElementById('prmtest-btn6').addEventListener('click', this.doTest.bind(this, '6'), false);
        document.getElementById('prmtest-btn7').addEventListener('click', this.doTest.bind(this, '7'), false);
        document.getElementById('prmtest-btn8').addEventListener('click', this.doTest.bind(this, '8'), false);
        document.getElementById('prmtest-btn9').addEventListener('click', this.doTest.bind(this, '9'), false);
        document.getElementById('prmtest-btn10').addEventListener('click', this.doTest.bind(this, '10'), false);
        document.getElementById('prmtest-btn11').addEventListener('click', this.doTest.bind(this, '11'), false);
        document.getElementById('prmtest-btn12').addEventListener('click', this.doTest.bind(this, '12'), false);
        document.getElementById('test-btn13').addEventListener('click', this.doTest.bind(this, '13'), false);

        document.getElementById('test-nextpage').addEventListener('click', this.doTest.bind(this, '14'), false);

     //   document.getElementById('test-reloadds').addEventListener('click', this.doTest.bind(this, '15'), false);
     //   document.getElementById('test-backtoindexpage').addEventListener('click', this.doTest.bind(this, '16'), false);
        

        // Challenge Mode
        document.getElementById('chmtest-btn1').addEventListener('click', this.doTest.bind(this, 'CHM1'), false);
        document.getElementById('chmtest-btn2').addEventListener('click', this.doTest.bind(this, 'CHM2'), false);
        document.getElementById('chmtest-btn3').addEventListener('click', this.doTest.bind(this, 'CHM3'), false);
        document.getElementById('chmtest-btn4').addEventListener('click', this.doTest.bind(this, 'CHM4'), false);
        document.getElementById('chmtest-btn5').addEventListener('click', this.doTest.bind(this, 'CHM5'), false);
        document.getElementById('chmtest-btn6').addEventListener('click', this.doTest.bind(this, 'CHM6'), false);
        document.getElementById('chmtest-btn7').addEventListener('click', this.doTest.bind(this, 'CHM7'), false);
        document.getElementById('chmtest-btn8').addEventListener('click', this.doTest.bind(this, 'CHM8'), false);
        
        // console.log("Exit forTest");
    },

    doTest: function (arg) {

        // console.log("Enter doTest: arg:" + arg);

        var accesstoken = "5a891ee77f10e" ;

        switch (arg) {

            case '1':
                bbreglogin.echoTest();
                bbreglogin.selfTest();
                break;

            case '2':
                bbreglogin.initializeDS();
                break;

            case '3':
                bbreglogin.dropTables();
                break;

            case 'CHM1':
             console.log("bbreglogin: in CHM1");
                var chmwalletscoredata = { avatarname: "avatarsk", deviceid: "deviceidsk", score: "100", datetime_lastupdated: "12:10:05:10:15:10" };
                var id_chmgameplay = bbreglogin.chm_saveWalletscore(chmwalletscoredata);
                break;

            case 'CHM2':
                bbreglogin.chm_fetchUnsyncedWalletscoreRecords(bbreglogin.chm_fetchUnsyncedWalletscoreRecords_cbf);
                break;

            case 'CHM3':
                var chmgameplaydata = { id_game: "SK101", avatarname: "avatarsk", deviceid: "deviceidsk", start_time: "12:10:05:10:15:10", hints: "10" };
                var id_chmgameplay = bbreglogin.chm_saveGameplay(chmgameplaydata);
                break;

            case 'CHM4':
                bbreglogin.chm_fetchUnsyncedGameplayRecords(bbreglogin.chm_fetchUnsyncedGameplayRecords_cbf);
                break;

            case 'CHM5':
                var chmgameplaydata = { id_game: "SK101", avatarname: "avatarsk", deviceid: "deviceidsk", start_time: "12:10:05:10:15:10", hints: "10" };
                var id_chmgameplay = bbreglogin.chm_saveGameplay(chmgameplaydata);

                var chmassessmentdata = { id_game_play: id_chmgameplay, id_question: "1001", pass: "Yes", time2answer: "10", date_time_submission: "12:10:05:10:15:10", avatarname: "avatarsk", deviceid: "deviceidsk"};
                bbreglogin.chm_saveAssessment(chmassessmentdata);
                break;

            case 'CHM6':
                bbreglogin.chm_fetchUnsyncedAssessmentRecords(bbreglogin.chm_fetchUnsyncedAssessmentRecords_cbf);
                break;

            case 'CHM7':
                var chmgamemasterdata = { id: "1", id_game: "SK101", game_description: "Game Description SK", id_grade: "1", gametoopen: "SK102", prerequisitegame: "100" };
                bbreglogin.chm_saveGameMasterData(chmgamemasterdata);
                break;

            case 'CHM8':
                bbreglogin.chm_fetchGameMasterData(bbreglogin.chm_fetchGameMasterData_cbf);
                break;


            case '4':
                var gameplaydata = { id_game: "SK101", avatarname: "avatarsk", deviceid: "deviceidsk", start_time: "12:10:05:10:15:10" };
                var id_gameplay = bbreglogin.prm_saveGameplay(gameplaydata);
                break;

            case '5':
                bbreglogin.prm_fetchUnsyncedGameplayRecords(bbreglogin.prm_fetchUnsyncedGameplayRecords_cbf);
                break;

            case '6':
                bbreglogin.prm_deleteSyncedGameplayRecords();
                break;

            case '7':
                var gameplaydata = { id_game: "SK101", avatarname: "avatarsk", deviceid: "deviceidsk", start_time: "12:10:05:10:15:10" };
                var id_gameplay = bbreglogin.prm_saveGameplay(gameplaydata);

                var assessmentdata = { id_game_play: id_gameplay, id_question: "10", pass: "Yes", time2answer: "5", attempts: "2", date_time_submission: "05:06:07:08:09:10", avatarname: "avatarsk", deviceid: "deviceidsk" };
                bbreglogin.prm_saveAssessment(assessmentdata);
                break;

            case '8':
                bbreglogin.prm_fetchUnsyncedAssessmentRecords(bbreglogin.prm_fetchUnsyncedAssessmentRecords_cbf);
                break;

            case '9':
                bbreglogin.prm_deleteSyncedAssessmentRecords();
                break;

            case '10':
                var gameplaydata = { id_game: "SK101", avatarname: "avatarsk", deviceid: "deviceidsk", start_time: "12:10:05:10:15:10" };
                var id_gameplay = bbreglogin.prm_saveGameplay(gameplaydata);

                var interactdata = { id_game_play: id_gameplay, id_question: "10", date_time_event: "03:04:07:08:07:10", event_type: "TOUCH", res_id: "DEVICE_BAK_BUTTON", avatarname: "avatarsk", deviceid: "deviceidsk" };
                bbreglogin.prm_saveInteractEvent(interactdata);
                break;

            case '11':
                bbreglogin.prm_fetchUnsyncedInteractEventRecords(bbreglogin.prm_fetchUnsyncedInteractEventRecords_cbf);
                break;

            case '12':
                bbreglogin.prm_deleteSyncedInteractEventRecords();
                break;

            case '13':
                bbreglogin.syncTelemetryData();
                break;

            case '14':
                window.location = "page2.html";
                break;

            case '15':
                console.log("case15: to call reload()");
                bbreglogin.reload();
                break;

            case '16':
                console.log("going back to index page");
                window.location = "index.html";
                break;
        }

    }
};

//TestMgr_bbreglogin.forTest();



