/*
 * File: abbchmprmdsjsapilib.js
 * Version: 1.0
 * Release date: 
 * Akshara Building Block (ABB) - Challenge and Practive Modes: Android Datastore API Library for Cordova based Android apps.
 * Javascript APIs to store telemetry data locally on the Android device and to Sync it to the ABB Server using ABB REST APIs.
 * Pre-requisite:
 *    Plug-ins/Libraries: corodova-sqlite-strage plugin, jquery library (jquery-1.8.0.min.js, jquery.mobile-1.4.5.min.js)
 *    Settings: Add abbrestapi_baseurl to the 'Content-Security-Policy' in the invoking HTML file
 *              Allow access to the abbrestapi_baseurl in the cordova project config.xml
 * Author: sureshkodoor@gmail.com
 */
var abbchmprmdsjsapi = {

    databasename: "abbchmprmdb.db",
    providercode: "CAL",  // 3-char ID for the provider of the app/game. (e.g 'CAL' for Callystro)
    abbchmprmdbhandler: null,
    debugalerts: false,
    erroralerts: false,

    // Create/Open the database
    initializeDS: function () {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter initialiseDS");

        this.abbchmprmdbhandler = window.sqlitePlugin.openDatabase(
            {
                name: this.databasename, location: 'default'
            },
            function () {
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: initialiseDS: openDatabase success");
            },
            function (msg) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: initialiseDS: openDatabase failed: " + msg);
                return false;
            }
        );

        // Creates/Opens the Tables
        this.createTables();

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit initialiseDS");

        return true;
    },

    deleteDS: function () {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter deleteDS");

        this.abbchmprmdbhandler = window.sqlitePlugin.deleteDatabase(
            {
                name: this.databasename, location: 'default'
            },
            function () {
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: deleteDS: success");
            },
            function (msg) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: deleteDS: failed: " + msg);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit deleteDS");
    },

    // Create the tables
    createTables: function () {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter createTables");

        this.abbchmprmdbhandler.sqlBatch([
            'CREATE TABLE IF NOT EXISTS prmgameplaytbl (id integer primary key autoincrement, id_game_play text, id_game text, avatarname text, deviceid text, start_time text, synced integer not null default 0)',
            'CREATE TABLE IF NOT EXISTS prmgameplaydetailtbl (id integer primary key autoincrement, id_game_play text, id_question text, pass text, time2answer integer, attempts integer, date_time_submission text, avatarname text, deviceid text, synced integer not null default 0)',
            'CREATE TABLE IF NOT EXISTS prminteracteventtbl (id integer primary key autoincrement,  id_game_play text,  id_question text, date_time_event text, event_type text, res_id text,  avatarname text, deviceid text, synced integer not null default 0)',

            'CREATE TABLE IF NOT EXISTS chmwalletscoretbl (id integer primary key autoincrement, avatarname text, deviceid text, score integer, datetime_lastupdated text, synced integer not null default 0)',
            'CREATE TABLE IF NOT EXISTS chmgameplaytbl (id integer primary key autoincrement, id_game_play text, id_game text, avatarname text, deviceid text, start_time text, hints integer, synced integer not null default 0)',
            'CREATE TABLE IF NOT EXISTS chmgameplaydetailtbl (id integer primary key autoincrement, id_game_play text, id_question text, pass text, time2answer integer, date_time_submission text, avatarname text, deviceid text, synced integer not null default 0)',
            'CREATE TABLE IF NOT EXISTS chmgamemastertbl (id integer primary key autoincrement, id_game text, game_description text, id_grade integer, gametoopen text, prerequisitegame text)'
            ],
            function () {
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: createTables: success");
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: createTables: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit createTables");

        return true;
    },

    dropTables: function () {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter dropTables");

        this.abbchmprmdbhandler.sqlBatch([
            'DROP TABLE IF EXISTS prmgameplaytbl',
            'DROP TABLE IF EXISTS prmgameplaydetailtbl',
            'DROP TABLE IF EXISTS prminteracteventtbl',

            'DROP TABLE IF EXISTS chmwalletscoretbl',
            'DROP TABLE IF EXISTS chmgameplaytbl',
            'DROP TABLE IF EXISTS chmgameplaydetailtbl',
            'DROP TABLE IF EXISTS chmgamemastertbl'
            ],
            function () {
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: dropTables: success");
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: dropTables: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit dropTables");

        return true;
    },


    // CHALLENGE MODE
    // Save/Update the wallet score
    // If there is an entry for the User (avatarname/deviceid) already, delete the record and then insert a new record 
    // (Checking if a record exist through a SELECT and then calling UPDATE wont work as the first SELECT will be executed in the async mode and thus will not return value in the same thread. 'INSERT OR REPLACE' also not been used)
    chm_saveWalletscore: function (objData) {

        if((objData.avatarname == "") || (objData.deviceid == "") || (objData.score == "") || (objData.datetime_lastupdated == "")) {

            if (abbchmprmdsjsapi.erroralerts) {
                console.log("ABBCHMPRMDSJSAPI: ERROR: chm_saveWalletscore: values for one or more input parameters are missing.");
            } 

            return false;
        }

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter chm_saveWalletscore. objData: " + objData.avatarname+", "+objData.deviceid+", "+objData.score+", "+objData.datetime_lastupdated);

        /*
        var query = "INSERT INTO chmwalletscoretbl (avatarname, deviceid, score, datetime_lastupdated) VALUES (?,?,?,?)";
        
        this.abbchmprmdbhandler.executeSql(query, [objData.avatarname, objData.deviceid, objData.score, objData.datetime_lastupdated],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts) {
                    console.log("ABBCHMPRMDSJSAPI: resultSet.insertId: " + rs.insertId);
                    console.log("ABBCHMPRMDSJSAPI: resultSet.rowsAffected: " + rs.rowsAffected);
                }
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_saveWalletscore: failed" + error.message);
                return false;
            }
        );
        */

        var deletequery = "DELETE FROM chmwalletscoretbl WHERE avatarname="+objData.avatarname+" AND deviceid="+objData.deviceid;
        var insertquery = "INSERT INTO chmwalletscoretbl (avatarname, deviceid, score, datetime_lastupdated) VALUES ('"+objData.avatarname+"',"+objData.deviceid+"',"+objData.score+"',"+objData.datetime_lastupdated+")";
        
        this.abbchmprmdbhandler.sqlBatch([
                deletequery,
                insertquery
            ],
            function () {
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_saveWalletscore: success");
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_saveWalletscore: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit chm_saveWalletscore");
    },

    // CHALLENGE MODE
    // Fetch the challenge mode WalletScore data for syncing (read all the unsynced walletscore records).
    //
    // IMPORTANT NOTE: The SQLite function is executed asynchronously and hence the JS function will exit before the SQLite function is completed.
    // Hence, the recrods fetched cannot be returned from the JS function as a return value. Instead, a callback function should be provided to the
    // JS function, which will be invoked when the SQLite function is completed. 
    //
    // chm_fetchUnsyncedWalletscoreRecords_cbf is the callback function, which will be invoked once the SQLite function completes its execution

    chm_fetchUnsyncedWalletscoreRecords: function (callbackfn) {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter chm_fetchUnsyncedWalletscoreRecords");

        var query = "SELECT id AS objid, avatarname, deviceid, score, datetime_lastupdated FROM chmwalletscoretbl WHERE synced = 0";

        var arrObjs = new Array();

        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                var nrecords = rs.rows.length;
                if (abbchmprmdsjsapi.debugalerts)
                   console.log("ABBCHMPRMDSJSAPI: chm_fetchUnsyncedWalletscoreRecords: success. Number of records:"+nrecords);
                
                for (var i = 0; i < nrecords; i++) {
                    arrObjs.push(rs.rows.item(i));
                }
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_fetchUnsyncedWalletscoreRecords: arrObjs: " + JSON.stringify(arrObjs));

                callbackfn(arrObjs); // Invoke the callback function to send the array of Objects with the fetched records
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_fetchUnsyncedWalletscoreRecords: failed" + error.message);

                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit chm_fetchUnsyncedWalletscoreRecords");

    },

    // CHALLENGE MODE
    // callback function for chm_fetchUnsyncedWalletscoreRecords
    chm_fetchUnsyncedWalletscoreRecords_cbf: function (arrRecords) {

        if(abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter chm_fetchUnsyncedWalletscoreRecords_cbf");
        // console.log("chm_fetchUnsyncedWalletscoreRecords_cbf: arrRecords: " + JSON.stringify(arrRecords));

        // Do all the Processing, REST API calls etc here
        if(arrRecords.length > 0)
            RESTAPImgr.invokeRESTAPI('txabbchmwalletscore', arrRecords);
    },

    // CHALLENGE MODE
    // mark all the records that have 'id' values specified in the 'ids' array as synced (set 'synced' field to 1.)
    chm_markSyncedWalletscoreRecords: function (ids) {

        var query = "UPDATE chmwalletscoretbl SET synced = 1 WHERE id IN (" + ids +")";

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter chm_markSyncedWalletscoreRecords. ids:" + ids + "  query: "+query);

        if ((ids.length == 0) || (ids == '')) {
            if (abbchmprmdsjsapi.debugalerts)
                console.log("ABBCHMPRMDSJSAPI: Empty list of 'id's. No action performed.");
            return true;
        }
        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts) 
                    console.log("ABBCHMPRMDSJSAPI: chm_markSyncedWalletscoreRecords: success. resultSet.rowsAffected:" + rs.rowsAffected);
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts) 
                    console.log("ABBCHMPRMDSJSAPI: chm_markSyncedWalletscoreRecords: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts) 
            console.log("ABBCHMPRMDSJSAPI: Exit chm_markSyncedWalletscoreRecords");
    },

    // CHALLENGE MODE
    // delete all the records that have 'synced' field as 1
    chm_deleteSyncedWalletscoreRecords: function () {

        if (abbchmprmdsjsapi.debugalerts) 
            console.log("ABBCHMPRMDSJSAPI: Enter chm_deleteSyncedWalletscoreRecords");

        var query = "DELETE FROM chmwalletscoretbl WHERE synced = 1";

        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts) 
                    console.log("ABBCHMPRMDSJSAPI: chm_deleteSyncedWalletscoreRecords: success. resultSet.rowsAffected: " + rs.rowsAffected);
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_deleteSyncedWalletscoreRecords: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts) 
            console.log("ABBCHMPRMDSJSAPI: Exit chm_deleteSyncedWalletscoreRecords");
    },

    // CHALLENGE MODE
    // delete all the records that have 'id' values specified in the 'ids' array as synced. 
    // This function can be used to delete records directly instead of a two-step process of marking as synced and then deleting separately 
    chm_deleteWalletscoreRecordsByIds: function (ids) {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABSJSAPI: Enter chm_deleteWalletscoreRecordsByIds");

        var query = "DELETE FROM chmwalletscoretbl WHERE id IN (" + ids + ")";

        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABSJSAPI: chm_deleteWalletscoreRecordsByIds: success. resultSet.rowsAffected: " + rs.rowsAffected);
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABSJSAPI: chm_deleteWalletscoreRecordsByIds: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABSJSAPI: Exit chm_deleteWalletscoreRecordsByIds");
    },



    // CHALLENGE MODE
    // Save challenge mode gameplay record. The id_game_play corresponding to the saved gameplay is returned.
    // The returned id_game_play should be passed to 'chm_prm_saveAssessment' to save the Assessment data corresponding to this gameplay. 
    chm_saveGameplay: function (objData) {

        if((objData.id_game == "") || (objData.avatarname == "") || (objData.deviceid == "") || (objData.start_time == "") || (objData.hints == "")) {

            if (abbchmprmdsjsapi.erroralerts) {
                console.log("ABBCHMPRMDSJSAPI: ERROR: prm_saveGameplay: values for one or more input parameters are missing.");
            } 

            return false;
        }

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter prm_saveGameplay. objData: " + objData.id_game+", "+objData.avatarname+", "+objData.deviceid+", "+objData.start_time+", "+objData.hints);


        var gameplayid = this.createGameplayId();

        var query = "INSERT INTO chmgameplaytbl (id_game_play, id_game, avatarname, deviceid, start_time, hints) VALUES (?,?,?,?,?,?)";
        
        this.abbchmprmdbhandler.executeSql(query, [gameplayid, objData.id_game, objData.avatarname, objData.deviceid, objData.start_time, objData.hints],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts) {
                    console.log("ABBCHMPRMDSJSAPI: chm_saveGameplay: success. id_game_play: " + gameplayid);
                    console.log("ABBCHMPRMDSJSAPI: resultSet.insertId: " + rs.insertId);
                    console.log("ABBCHMPRMDSJSAPI: resultSet.rowsAffected: " + rs.rowsAffected);
                }
                // return gameplayid; // IMPORTANT NOTE: This 'return' statement here WILL NOT WORK. SQLlite functions are executed asynchronously. 
                                      // i.e This JS function will spawn executeSql function in a seperate thread and will continue executing the 
                                      // remaining part of the function. So, prm_saveGameplayRecord function will return before the executeSql is 
                                      // complete (the SQLite function will run in background). Hence returning gameplayid at this point will not work. 
                                      // The calling function will get null value. So, the 'return gameplayid' is placed outside the SQLite function call.
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_saveGameplay: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit chm_saveGameplay");

        return gameplayid;
    },

    // CHALLENGE MODE
    // Fetch the challenge mode gameplay data for syncing (read all the unsynced gameplay records).
    //
    // IMPORTANT NOTE: The SQLite function is executed asynchronously and hence the JS function will exit before the SQLite function is completed.
    // Hence, the recrods fetched cannot be returned from the JS function as a return value. Instead, a callback function should be provided to the
    // JS function, which will be invoked when the SQLite function is completed. 
    //
    // chm_fetchUnsyncedGameplayRecords_cbf is the callback function, which will be invoked once the SQLite function completes its execution

    chm_fetchUnsyncedGameplayRecords: function (callbackfn) {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter chm_fetchUnsyncedGameplayRecords");

        var query = "SELECT id AS objid, id_game_play, id_game, avatarname, deviceid, start_time, hints FROM chmgameplaytbl WHERE synced = 0";

        var arrObjs = new Array();

        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                var nrecords = rs.rows.length;
                if (abbchmprmdsjsapi.debugalerts)
                   console.log("ABBCHMPRMDSJSAPI: chm_fetchUnsyncedGameplayRecords: success. Number of records:"+nrecords);
                
                for (var i = 0; i < nrecords; i++) {
                    arrObjs.push(rs.rows.item(i));
                }
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_fetchUnsyncedGameplayRecords: arrObjs: " + JSON.stringify(arrObjs));

                callbackfn(arrObjs); // Invoke the callback function to send the array of Objects with the fetched records
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_fetchUnsyncedGameplayRecords: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit chm_fetchUnsyncedGameplayRecords");

    },

    // CHALLENGE MODE
    // callback function for chm_fetchUnsyncedGameplayRecords
    chm_fetchUnsyncedGameplayRecords_cbf: function (arrRecords) {

        if(abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter chm_fetchUnsyncedGameplayRecords_cbf");
        // console.log("chm_fetchUnsyncedGameplayRecords_cbf: arrRecords: " + JSON.stringify(arrRecords));

        // Do all the Processing, REST API calls etc here
        if(arrRecords.length > 0)
            RESTAPImgr.invokeRESTAPI('txabbchmgameplay', arrRecords);
    },

    // CHALLENGE MODE
    // mark all the records that have 'id' values specified in the 'ids' array as synced (set 'synced' field to 1.)
    chm_markSyncedGameplayRecords: function (ids) {

        var query = "UPDATE chmgameplaytbl SET synced = 1 WHERE id IN (" + ids +")";

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter chm_markSyncedGameplayRecords. ids:" + ids + "  query: "+query);

        if ((ids.length == 0) || (ids == '')) {
            if (abbchmprmdsjsapi.debugalerts)
                console.log("ABBCHMPRMDSJSAPI: Empty list of 'id's. No action performed.");
            return true;
        }
        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts) 
                    console.log("ABBCHMPRMDSJSAPI: chm_markSyncedGameplayRecords: success. resultSet.rowsAffected:" + rs.rowsAffected);
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts) 
                    console.log("ABBCHMPRMDSJSAPI: chm_markSyncedGameplayRecords: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts) 
            console.log("ABBCHMPRMDSJSAPI: Exit chm_markSyncedGameplayRecords");
    },

    // CHALLENGE MODE
    // delete all the records that have 'synced' field as 1
    chm_deleteSyncedGameplayRecords: function () {

        if (abbchmprmdsjsapi.debugalerts) 
            console.log("ABBCHMPRMDSJSAPI: Enter chm_deleteSyncedGameplayRecords");

        var query = "DELETE FROM chmgameplaytbl WHERE synced = 1";

        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts) 
                    console.log("ABBCHMPRMDSJSAPI: chm_deleteSyncedGameplayRecords: success. resultSet.rowsAffected: " + rs.rowsAffected);
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_deleteSyncedGameplayRecords: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts) 
            console.log("ABBCHMPRMDSJSAPI: Exit chm_deleteSyncedGameplayRecords");
    },

    // CHALLENGE MODE
    // delete all the records that have 'id' values specified in the 'ids' array as synced. 
    // This function can be used to delete records directly instead of a two-step process of marking as synced and then deleting separately 
    chm_deleteGameplayRecordsByIds: function (ids) {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABSJSAPI: Enter chm_deleteGameplayRecordsByIds");

        var query = "DELETE FROM chmgameplaytbl WHERE id IN (" + ids + ")";

        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABSJSAPI: chm_deleteGameplayRecordsByIds: success. resultSet.rowsAffected: " + rs.rowsAffected);
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABSJSAPI: chm_deleteGameplayRecordsByIds: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABSJSAPI: Exit chm_deleteGameplayRecordsByIds");
    },


    // CHALLENGE MODE
    // Save challenge mode assessment record. (game play details)
    chm_saveAssessment: function (objData) {


        if((objData.id_game_play == "") || (objData.id_question == "") || (objData.pass == "") || (objData.time2answer == "") || (objData.date_time_submission == "") || (objData.avatarname == "") || (objData.deviceid == "")) {

            if (abbchmprmdsjsapi.erroralerts) {
                console.log("ABBCHMPRMDSJSAPI: ERROR: chm_saveAssessment: values for one or more input parameters are missing.");
            } 

            return false;
        }

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter chm_saveAssessment. objData: " + objData.id_game_play + ", " + objData.id_question + ", " + objData.pass + ", " + objData.time2answer + ", " + objData.date_time_submission + ", " + objData.avatarname + ", " + objData.deviceid);


        var query = "INSERT INTO chmgameplaydetailtbl (id_game_play, id_question, pass, time2answer, date_time_submission, avatarname, deviceid) VALUES (?,?,?,?,?,?,?)";

        this.abbchmprmdbhandler.executeSql(query, [objData.id_game_play, objData.id_question, objData.pass, objData.time2answer, objData.date_time_submission, objData.avatarname, objData.deviceid],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts) {
                    console.log("ABBCHMPRMDSJSAPI: chm_saveAssessment: success");
                    console.log("ABBCHMPRMDSJSAPI: resultSet.insertId: " + rs.insertId);
                    console.log("ABBCHMPRMDSJSAPI: resultSet.rowsAffected: " + rs.rowsAffected);
                }
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_saveAssessment: failed" + error.message);

                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit chm_saveAssessment");
    },

    // CHALLENGE MODE
    // Fetch the challenge mode assessment data for syncing (read all the unsynced assessment records).
    //
    // IMPORTANT NOTE: The SQLite function is executed asynchronously and hence the JS function will exit before the SQLite function is completed.
    // Hence, the recrods fetched cannot be returned from the JS function as a return value. Instead, a callback function should be provided to the
    // JS function, which will be invoked when the SQLite function is completed. 
    //
    // chm_fetchUnsyncedAssessmentRecords_cbf is the callback function, which will be invoked once the SQLite function completes its execution
    //

    chm_fetchUnsyncedAssessmentRecords: function (callbackfn) {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter chm_fetchUnsyncedAssessmentRecords");

        var query = "SELECT id AS objid, id_game_play, id_question, pass, time2answer, date_time_submission, avatarname, deviceid FROM chmgameplaydetailtbl WHERE synced = 0";

        var arrObjs = new Array();

        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                var nrecords = rs.rows.length;
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_fetchUnsyncedAssessmentRecords: success. Number of records:" + nrecords);

                for (var i = 0; i < nrecords; i++) {
                    arrObjs.push(rs.rows.item(i));
                }
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: arrObjs: " + JSON.stringify(arrObjs));

                callbackfn(arrObjs); // Invoke the callback function to send the array of Objects with the fetched records
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_fetchUnsyncedAssessmentRecords: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit chm_fetchUnsyncedAssessmentRecords");

    },

    // CHALLENGE MODE
    // callback function for chm_fetchUnsyncedAssessmentRecords
    chm_fetchUnsyncedAssessmentRecords_cbf: function (arrRecords) {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter chm_fetchUnsyncedAssessmentRecords_cbf");
        // console.log("chm_fetchUnsyncedAssessmentRecords_cbf: arrRecords: " + JSON.stringify(arrRecords));

        // Do all the Processing, REST API calls etc here
        if (arrRecords.length > 0)
            RESTAPImgr.invokeRESTAPI('txabbchmgameplaydetail', arrRecords);
    },

    // CHALLENGE MODE
    // mark all the records that have 'id' values specified in the 'ids' array as synced (set 'synced' field to 1.)
    chm_markSyncedAssessmentRecords: function (ids) {

        var query = "UPDATE chmgameplaydetailtbl SET synced = 1 WHERE id IN (" + ids + ")";

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter chm_markSyncedAssessmentRecords. ids:" + ids + "  query: " + query);

        if ((ids.length == 0) || (ids == '')) {
            if (abbchmprmdsjsapi.debugalerts)
                console.log("ABBCHMPRMDSJSAPI: Empty list of 'id's. No action performed.");
            return true;
        }
        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_markSyncedAssessmentRecords: success. resultSet.rowsAffected:" + rs.rowsAffected);
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_markSyncedAssessmentRecords: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit chm_markSyncedAssessmentRecords");
    },


    // CHALLENGE MODE
    // delete all the records that have 'synced' field as 1
    chm_deleteSyncedAssessmentRecords: function () {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter chm_deleteSyncedAssessmentRecords");

        var query = "DELETE FROM chmgameplaydetailtbl WHERE synced = 1";

        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_deleteSyncedAssessmentRecords: success. resultSet.rowsAffected: " + rs.rowsAffected);
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_deleteSyncedAssessmentRecords: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit chm_deleteSyncedAssessmentRecords");
    },

    // CHALLENGE MODE
    // delete all the records that have 'id' values specified in the 'ids' array as synced. 
    // This function can be used to delete records directly instead of a two-step process of marking as synced and then deleting separately 
    chm_deleteAssessmentRecordsByIds: function (ids) {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABSJSAPI: Enter chm_deleteAssessmentRecordsByIds");

        var query = "DELETE FROM chmgameplaydetailtbl WHERE id IN (" + ids + ")";

        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABSJSAPI: chm_deleteAssessmentRecordsByIds: success. resultSet.rowsAffected: " + rs.rowsAffected);
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABSJSAPI: chm_deleteAssessmentRecordsByIds: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABSJSAPI: Exit chm_deleteAssessmentRecordsByIds");
    },


    // CHALLENGE MODE
    // Save game master records (may use this function to save the Game master data fetched via the REST API from the SERVER)
    // Make sure that the table is emptied of the existing records before saving (as 'id' also is saved, 'duplicate' error would be thrown by the database if tried to insert data with same 'id')
    // 'id' is also set (instead of autoincrement value) to ensure that Games are not added again if the table already has records
    chm_saveGameMasterData: function (objData) {


        if((objData.id == "") || (objData.id_game == "") || (objData.id_grade == "")) {

            if (abbchmprmdsjsapi.erroralerts) {
                console.log("ABBCHMPRMDSJSAPI: ERROR: chm_saveGameMasterData: values for one or more input parameters are missing.");
            } 

            return false;
        }

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter chm_saveGameMasterData. objData: " + objData.id + ", "+ objData.id_game + ", " + objData.game_description + ", " + objData.id_grade + ", " + objData.gametoopen + ", " + objData.prerequisitegame);


        var query = "INSERT INTO chmgamemastertbl (id, id_game, game_description, id_grade, gametoopen, prerequisitegame) VALUES (?,?,?,?,?,?)";

        this.abbchmprmdbhandler.executeSql(query, [objData.id, objData.id_game, objData.game_description, objData.id_grade, objData.gametoopen, objData.prerequisitegame],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts) {
                    console.log("ABBCHMPRMDSJSAPI: chm_saveGameMasterData: success");
                    console.log("ABBCHMPRMDSJSAPI: resultSet.insertId: " + rs.insertId);
                    console.log("ABBCHMPRMDSJSAPI: resultSet.rowsAffected: " + rs.rowsAffected);
                }
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_saveGameMasterData: failed" + error.message);

                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit chm_saveGameMasterData");
    },

    // CHALLENGE MODE
    // Fetch the Game Master Data (This function may be used to read the Game Master table data, which is saved locally after downloading from the SERVER)
    //
    // IMPORTANT NOTE: The SQLite function is executed asynchronously and hence the JS function will exit before the SQLite function is completed.
    // Hence, the recrods fetched cannot be returned from the JS function as a return value. Instead, a callback function should be provided to the
    // JS function, which will be invoked when the SQLite function is completed. 
    //
    // The callback function, which will be invoked once the SQLite function completes its execution, should be provided by the function invoking this API
    //

    chm_fetchGameMasterData: function (callbackfn) {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter chm_fetchGameMasterData");

        var query = "SELECT id, id_game, game_description, id_grade, gametoopen, prerequisitegame FROM chmgamemastertbl";

        var arrObjs = new Array();

        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                var nrecords = rs.rows.length;
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_fetchGameMasterData: success. Number of records:" + nrecords);

                for (var i = 0; i < nrecords; i++) {
                    arrObjs.push(rs.rows.item(i));
                }
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: arrObjs: " + JSON.stringify(arrObjs));

                callbackfn(arrObjs); // Invoke the callback function to send the array of Objects with the fetched records
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: chm_fetchGameMasterData: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit chm_fetchGameMasterData");

    },

    // CHALLENGE MODE
    // Sample callback function for chm_fetchGameMasterData
    chm_fetchGameMasterData_cbf: function (arrRecords) {

        if (abbchmprmdsjsapi.debugalerts) {
            console.log("ABBCHMPRMDSJSAPI: Enter chm_fetchGameMasterData_cbf");
        }
        // console.log("chm_fetchGameMasterData_cbf: arrRecords: " + JSON.stringify(arrRecords));

        // May add any processing logic below this  
    },

    // CHALLENGE MODE
    // delete all the records in the Game Master Table  
    // This function can be used to delete records in the Game Master Table before downloading the Master data again from the SERVER and Saving in the local table
    chm_deleteGameMasterData: function (ids) {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABSJSAPI: Enter chm_deleteGameMasterData");

        var query = "DELETE FROM chmgameplaydetailtbl";

        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABSJSAPI: chm_deleteGameMasterData: success. resultSet.rowsAffected: " + rs.rowsAffected);
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABSJSAPI: chm_deleteGameMasterData: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABSJSAPI: Exit chm_deleteGameMasterData");
    },

    // PRACTICE Mode
    // Save practice mode gameplay record. The id_game_play corresponding to the saved gameplay is returned.
    // The returned id_game_play should be passed to 'prm_saveAssessment' and 'prm_saveInteractEvent' functions to save the Assessment and InteractEvent data corresponding to this gameplay. 
    prm_saveGameplay: function (objData) {

        //alert(objData.deviceid);

        if((objData.id_game == "") || (objData.avatarname == "") || (objData.deviceid == "") || (objData.start_time == "")) {

        	if (abbchmprmdsjsapi.erroralerts) {
                console.log("ABBCHMPRMDSJSAPI: ERROR: prm_saveGameplay: values for one or more input parameters are missing.");
            } 

            return false;
        }

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter prm_saveGameplay. objData: " + objData.id_game+", "+objData.avatarname+", "+objData.deviceid+", "+objData.start_time);


        var gameplayid = this.createGameplayId();

        var query = "INSERT INTO prmgameplaytbl (id_game_play, id_game, avatarname, deviceid, start_time) VALUES (?,?,?,?,?)";
        
        this.abbchmprmdbhandler.executeSql(query, [gameplayid, objData.id_game, objData.avatarname, objData.deviceid, objData.start_time],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts) {
                    console.log("ABBCHMPRMDSJSAPI: prm_saveGameplay: success. id_game_play: " + gameplayid);
                    console.log("ABBCHMPRMDSJSAPI: resultSet.insertId: " + rs.insertId);
                    console.log("ABBCHMPRMDSJSAPI: resultSet.rowsAffected: " + rs.rowsAffected);
                }
                // return gameplayid; // IMPORTANT NOTE: This 'return' statement here WILL NOT WORK. SQLlite functions are executed asynchronously. 
                                      // i.e This JS function will spawn executeSql function in a seperate thread and will continue executing the 
                                      // remaining part of the function. So, prm_saveGameplayRecord function will return before the executeSql is 
                                      // complete (the SQLite function will run in background). Hence returning gameplayid at this point will not work. 
                                      // The calling function will get null value. So, the 'return gameplayid' is placed outside the SQLite function call.
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: prm_saveGameplay: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit prm_saveGameplay");

        return gameplayid;
    },

    // Create a unique identifier for id_game_play (A 15 char unique string is generated as the Id). 'providercode' prefix is to identify the provider of the app
    createGameplayId: function () {

        // return this.providercode+Math.random().toString(36).substr(5, 12); // substring of 12 chars (12 chars of the original string, starting from the 5th char)

        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 12; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return this.providercode+text; 
    },

    // PRACTICE Mode
    // Fetch the practice mode gameplay data for syncing (read all the unsynced gameplay records).
    //
    // IMPORTANT NOTE: The SQLite function is executed asynchronously and hence the JS function will exit before the SQLite function is completed.
    // Hence, the recrods fetched cannot be returned from the JS function as a return value. Instead, a callback function should be provided to the
    // JS function, which will be invoked when the SQLite function is completed. 
    //
    // prm_fetchUnsyncedGameplayRecords_cbf is the callback function, which will be invoked once the SQLite function completes its execution
    prm_fetchUnsyncedGameplayRecords: function (callbackfn) {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter prm_fetchUnsyncedGameplayRecords");

        var query = "SELECT id AS objid, avatarname, deviceid, id_game_play, id_game, start_time FROM prmgameplaytbl WHERE synced = 0";

        var arrObjs = new Array();

        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                var nrecords = rs.rows.length;
                if (abbchmprmdsjsapi.debugalerts)
                   console.log("ABBCHMPRMDSJSAPI: prm_fetchUnsyncedGameplayRecords: success. Number of records:"+nrecords);
                
                for (var i = 0; i < nrecords; i++) {
                    arrObjs.push(rs.rows.item(i));
                }
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: prm_fetchUnsyncedGameplayRecords: arrObjs: " + JSON.stringify(arrObjs));

                callbackfn(arrObjs); // Invoke the callback function to send the array of Objects with the fetched records
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: prm_fetchUnsyncedGameplayRecords: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit prm_fetchUnsyncedGameplayRecords");

    },

    // PRACTICE Mode
    // callback function for prm_fetchUnsyncedGameplayRecords
    prm_fetchUnsyncedGameplayRecords_cbf: function (arrRecords) {

        if(abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter prm_fetchUnsyncedGameplayRecords_cbf");
        // console.log("prm_fetchUnsyncedGameplayRecords_cbf: arrRecords: " + JSON.stringify(arrRecords));

        // Do all the Processing, REST API calls etc here
        if(arrRecords.length > 0)
            RESTAPImgr.invokeRESTAPI('txabbprmgameplay', arrRecords);
    },

    // PRACTICE Mode
    // mark all the records that have 'id' values specified in the 'ids' array as synced (set 'synced' field to 1.)
    prm_markSyncedGameplayRecords: function (ids) {

        var query = "UPDATE prmgameplaytbl SET synced = 1 WHERE id IN (" + ids +")";

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter prm_markSyncedGameplayRecords. ids:" + ids + "  query: "+query);

        if ((ids.length == 0) || (ids == '')) {
            if (abbchmprmdsjsapi.debugalerts)
                console.log("ABBCHMPRMDSJSAPI: Empty list of 'id's. No action performed.");
            return true;
        }
        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts) 
                    console.log("ABBCHMPRMDSJSAPI: prm_markSyncedGameplayRecords: success. resultSet.rowsAffected:" + rs.rowsAffected);
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts) 
                    console.log("ABBCHMPRMDSJSAPI: prm_markSyncedGameplayRecords: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts) 
            console.log("ABBCHMPRMDSJSAPI: Exit prm_markSyncedGameplayRecords");
    },

    // PRACTICE Mode
    // delete all the records that have 'synced' field as 1
    prm_deleteSyncedGameplayRecords: function () {

        if (abbchmprmdsjsapi.debugalerts) 
            console.log("ABBCHMPRMDSJSAPI: Enter prm_deleteSyncedGameplayRecords");

        var query = "DELETE FROM prmgameplaytbl WHERE synced = 1";

        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts) 
                    console.log("ABBCHMPRMDSJSAPI: prm_deleteSyncedGameplayRecords: success. resultSet.rowsAffected: " + rs.rowsAffected);
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: prm_deleteSyncedGameplayRecords: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts) 
            console.log("ABBCHMPRMDSJSAPI: Exit prm_deleteSyncedGameplayRecords");
    },

    // PRACTICE Mode
    // delete all the records that have 'id' values specified in the 'ids' array as synced. 
    // This function can be used to delete records directly instead of a two-step process of marking as synced and then deleting separately 
    prm_deleteGameplayRecordsByIds: function (ids) {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABSJSAPI: Enter prm_deleteGameplayRecordsByIds");

        var query = "DELETE FROM prmgameplaytbl WHERE id IN (" + ids + ")";

        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABSJSAPI: prm_deleteGameplayRecordsByIds: success. resultSet.rowsAffected: " + rs.rowsAffected);
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABSJSAPI: prm_deleteGameplayRecordsByIds: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABSJSAPI: Exit prm_deleteGameplayRecordsByIds");
    },

    // PRACTCIE MODE
    // Save practice mode assessment record. 
    prm_saveAssessment: function (objData) {


        if((objData.id_game_play == "") || (objData.id_question == "") || (objData.pass == "") || (objData.time2answer == "") || (objData.attempts == "") || (objData.date_time_submission == "") || (objData.avatarname == "") || (objData.deviceid == "")) {

        	if (abbchmprmdsjsapi.erroralerts) {
                console.log("ABBCHMPRMDSJSAPI: ERROR: prm_saveAssessment: values for one or more input parameters are missing.");
            } 

            return false;
        }

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter prm_saveAssessment. objData: " + objData.id_game_play + ", " + objData.id_question + ", " + objData.pass + ", " + objData.time2answer + ", " + objData.attempts + ", " + objData.date_time_submission + ", " + objData.avatarname);


        var query = "INSERT INTO prmgameplaydetailtbl (id_game_play, id_question, pass, time2answer, attempts, date_time_submission, avatarname, deviceid) VALUES (?,?,?,?,?,?,?,?)";

        this.abbchmprmdbhandler.executeSql(query, [objData.id_game_play, objData.id_question, objData.pass, objData.time2answer, objData.attempts, objData.date_time_submission, objData.avatarname, objData.deviceid],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts) {
                    console.log("ABBCHMPRMDSJSAPI: prm_saveAssessment: success");
                    console.log("ABBCHMPRMDSJSAPI: resultSet.insertId: " + rs.insertId);
                    console.log("ABBCHMPRMDSJSAPI: resultSet.rowsAffected: " + rs.rowsAffected);
                }
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: prm_saveAssessment: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit prm_saveAssessment");
    },

    // PRACTCIE MODE
    // Fetch the assessment data for syncing (read all the unsynced assessment records).
    //
    // IMPORTANT NOTE: The SQLite function is executed asynchronously and hence the JS function will exit before the SQLite function is completed.
    // Hence, the recrods fetched cannot be returned from the JS function as a return value. Instead, a callback function should be provided to the
    // JS function, which will be invoked when the SQLite function is completed. 
    //
    // prm_fetchUnsyncedAssessmentRecords_cbf is the callback function, which will be invoked once the SQLite function completes its execution
    //

    prm_fetchUnsyncedAssessmentRecords: function (callbackfn) {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter prm_fetchUnsyncedAssessmentRecords");

        var query = "SELECT id AS objid, avatarname, deviceid, id_game_play, id_question, pass, time2answer, attempts, date_time_submission FROM prmgameplaydetailtbl WHERE synced = 0";

        var arrObjs = new Array();

        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                var nrecords = rs.rows.length;
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: prm_fetchUnsyncedAssessmentRecords: success. Number of records:" + nrecords);

                for (var i = 0; i < nrecords; i++) {
                    arrObjs.push(rs.rows.item(i));
                }
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: arrObjs: " + JSON.stringify(arrObjs));

                callbackfn(arrObjs); // Invoke the callback function to send the array of Objects with the fetched records
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: prm_fetchUnsyncedAssessmentRecords: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit prm_fetchUnsyncedAssessmentRecords");

    },

    // PRACTCIE MODE
    // callback function for prm_fetchUnsyncedAssessmentRecords
    prm_fetchUnsyncedAssessmentRecords_cbf: function (arrRecords) {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter prm_fetchUnsyncedAssessmentRecords_cbf");
        // console.log("prm_fetchUnsyncedAssessmentRecords_cbf: arrRecords: " + JSON.stringify(arrRecords));

        // Do all the Processing, REST API calls etc here
        if (arrRecords.length > 0)
            RESTAPImgr.invokeRESTAPI('txabbprmgameplaydetail', arrRecords);
    },

    // PRACTCIE MODE
    // mark all the records that have 'id' values specified in the 'ids' array as synced (set 'synced' field to 1.)
    prm_markSyncedAssessmentRecords: function (ids) {

        var query = "UPDATE prmgameplaydetailtbl SET synced = 1 WHERE id IN (" + ids + ")";

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter prm_markSyncedAssessmentRecords. ids:" + ids + "  query: " + query);

        if ((ids.length == 0) || (ids == '')) {
            if (abbchmprmdsjsapi.debugalerts)
                console.log("ABBCHMPRMDSJSAPI: Empty list of 'id's. No action performed.");
            return true;
        }
        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: prm_markSyncedAssessmentRecords: success. resultSet.rowsAffected:" + rs.rowsAffected);
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: prm_markSyncedAssessmentRecords: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit prm_markSyncedAssessmentRecords");
    },

    // PRACTCIE MODE
    // delete all the records that have 'synced' field as 1
    prm_deleteSyncedAssessmentRecords: function () {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter prm_deleteSyncedAssessmentRecords");

        var query = "DELETE FROM prmgameplaydetailtbl WHERE synced = 1";

        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: prm_deleteSyncedAssessmentRecords: success. resultSet.rowsAffected: " + rs.rowsAffected);
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: prm_deleteSyncedAssessmentRecords: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit prm_deleteSyncedAssessmentRecords");
    },

    // PRACTICE MODE
    // delete all the records that have 'id' values specified in the 'ids' array as synced. 
    // This function can be used to delete records directly instead of a two-step process of marking as synced and then deleting separately 
    prm_deleteAssessmentRecordsByIds: function (ids) {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABSJSAPI: Enter prm_deleteAssessmentRecordsByIds");

        var query = "DELETE FROM prmgameplaydetailtbl WHERE id IN (" + ids + ")";

        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABSJSAPI: prm_deleteAssessmentRecordsByIds: success. resultSet.rowsAffected: " + rs.rowsAffected);
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABSJSAPI: prm_deleteAssessmentRecordsByIds: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABSJSAPI: Exit prm_deleteAssessmentRecordsByIds");
    },

    // PRACTICE MODE
    // Save Interact Event record. 
    prm_saveInteractEvent: function (objData) {

        if((objData.id_game_play == "") || (objData.id_question == "") || (objData.date_time_event == "") || (objData.event_type == "") || (objData.res_id == "") || (objData.avatarname == "") || (objData.deviceid == "")) {
        	if (abbchmprmdsjsapi.erroralerts) {
                console.log("ABBCHMPRMDSJSAPI: ERROR: prm_saveInteractEvent: values for one or more input parameters are missing.");
            } 
            return false;
        }

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter prm_saveInteractEvent. objData: " + objData.id_game_play + ", " + objData.id_question + ", " + objData.date_time_event + ", " + objData.event_type + ", " + objData.res_id + ", "+ objData.avatarname + ", " + objData.deviceid);


        var query = "INSERT INTO prminteracteventtbl (id_game_play, id_question, date_time_event, event_type, res_id, avatarname, deviceid) VALUES (?,?,?,?,?,?,?)";

        this.abbchmprmdbhandler.executeSql(query, [objData.id_game_play, objData.id_question, objData.date_time_event, objData.event_type, objData.res_id, objData.avatarname, objData.deviceid],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts) 
                    console.log("ABBCHMPRMDSJSAPI: prm_saveInteractEvent: success");
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: prm_saveInteractEvent: failed" + error.message);
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit prm_saveInteractEvent");
    },

    // PRACTICE MODE
    // Fetch the practice mode Interact Event data for syncing (read all the unsynced Interact Event records).
    //
    // IMPORTANT NOTE: The SQLite function is executed asynchronously and hence the JS function will exit before the SQLite function is completed.
    // Hence, the recrods fetched cannot be returned from the JS function as a return value. Instead, a callback function should be provided to the
    // JS function, which will be invoked when the SQLite function is completed. 
    //
    // prm_fetchUnsyncedInteractEventRecords_cbf is the callback function, which will be invoked once the SQLite function completes its execution
    //

    prm_fetchUnsyncedInteractEventRecords: function (callbackfn) {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter prm_fetchUnsyncedInteractEventRecords");

        var query = "SELECT id AS objid, avatarname, deviceid, id_game_play,  id_question, date_time_event, event_type, res_id FROM prminteracteventtbl WHERE synced = 0";

        var arrObjs = new Array();

        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                var nrecords = rs.rows.length;
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: prm_fetchUnsyncedInteractEventRecords: success. Number of records:" + nrecords);

                for (var i = 0; i < nrecords; i++) {
                    arrObjs.push(rs.rows.item(i));
                }
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: arrObjs: " + JSON.stringify(arrObjs));

                callbackfn(arrObjs); // Invoke the callback function to send the array of Objects with the fetched records
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: prm_fetchUnsyncedInteractEventRecords: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit prm_fetchUnsyncedInteractEventRecords");

    },

    // PRACTICE MODE
    // callback function for prm_fetchUnsyncedInteractEventRecords
    prm_fetchUnsyncedInteractEventRecords_cbf: function (arrRecords) {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter prm_fetchUnsyncedInteractEventRecords_cbf");

        // console.log("prm_fetchUnsyncedInteractEventRecords_cbf: arrRecords: " + JSON.stringify(arrRecords));

        var arrEventData = new Array();
        for (var i = 0; i < arrRecords.length; i++) {

            var arr_eks = { "type": arrRecords[i].event_type, "id": arrRecords[i].res_id };
            var arr_edata = { "eks": arr_eks };
            var arrEvent = { "ekstep_eventid":"OE_INTERACT", "objid": arrRecords[i].objid, "id_game_play": arrRecords[i].id_game_play, "id_question": arrRecords[i].id_question, "date_time_event": arrRecords[i].date_time_event, "edata": arr_edata, "avatarname": arrRecords[i].avatarname, "deviceid": arrRecords[i].deviceid };

            arrEventData.push(arrEvent);
        }
        // console.log("arrEventData: " + JSON.stringify(arrEventData));

        // Do all the Processing, REST API calls etc here
        if (arrRecords.length > 0)
            RESTAPImgr.invokeRESTAPI('txabbprmekstepevents', arrEventData);
    },

    // PRACTICE MODE
    // mark all the records that have 'id' values specified in the 'ids' array as synced (set 'synced' field to 1.)
    prm_markSyncedInteractEventRecords: function (ids) {

        var query = "UPDATE prminteracteventtbl SET synced = 1 WHERE id IN (" + ids + ")";

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter prm_markSyncedInteractEventRecords. ids:" + ids + "  query: " + query);

        if ((ids.length == 0) || (ids == '')) {
            if (abbchmprmdsjsapi.debugalerts)
                console.log("ABBCHMPRMDSJSAPI: Empty list of 'id's. No action performed.");
            return true;
        }
        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: prm_markSyncedInteractEventRecords: success. resultSet.rowsAffected:" + rs.rowsAffected);
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: prm_markSyncedInteractEventRecords: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit prm_markSyncedInteractEventRecords");
    },

    // PRACTICE MODE
    // delete all the records that have 'synced' field as 1
    prm_deleteSyncedInteractEventRecords: function () {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Enter prm_deleteSyncedInteractEventRecords");

        var query = "DELETE FROM prminteracteventtbl WHERE synced = 1";

        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABBCHMPRMDSJSAPI: prm_deleteSyncedInteractEventRecords: success. resultSet.rowsAffected: " + rs.rowsAffected);
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABBCHMPRMDSJSAPI: prm_deleteSyncedInteractEventRecords: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABBCHMPRMDSJSAPI: Exit prm_deleteSyncedInteractEventRecords");
    },

    // PRACTICE MODE
    // delete all the records that have 'id' values specified in the 'ids' array as synced. 
    // This function can be used to delete records directly instead of a two-step process of marking as synced and then deleting separately 
    prm_deleteInteractEventRecordsByIds: function (ids) {

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABSJSAPI: Enter prm_deleteInteractEventRecordsByIds");

        var query = "DELETE FROM prminteracteventtbl WHERE id IN (" + ids + ")";
    
        this.abbchmprmdbhandler.executeSql(query, [],
            function (rs) {
                if (abbchmprmdsjsapi.debugalerts)
                    console.log("ABSJSAPI: prm_deleteInteractEventRecordsByIds: success. resultSet.rowsAffected: " + rs.rowsAffected);
            },
            function (error) {
                if (abbchmprmdsjsapi.erroralerts)
                    console.log("ABSJSAPI: prm_deleteInteractEventRecordsByIds: failed" + error.message);
                return false;
            }
        );

        if (abbchmprmdsjsapi.debugalerts)
            console.log("ABSJSAPI: Exit prm_deleteInteractEventRecordsByIds");
    },

    // Sync all the Telemetry data 
    // All 'fetch' functions run asynchronously and pass records to respective callback functions. 
    // Hence the 'syncTelemetryData' will return before the execution of all 'fetch' functions are complete. 
    // Hence, no point in returning any status value from this function
    syncTelemetryData: function () {

        // Sync CHALLANGE MODE Gameplay records
        this.chm_fetchUnsyncedGameplayRecords(this.chm_fetchUnsyncedGameplayRecords_cbf);

        // Sync CHALLENGE MODE Gameplaydetail records
        this.chm_fetchUnsyncedAssessmentRecords(this.chm_fetchUnsyncedAssessmentRecords_cbf);

        // Sync CHALLENGE MODE Walletscore records
        this.chm_fetchUnsyncedWalletscoreRecords(this.chm_fetchUnsyncedWalletscoreRecords_cbf);


        // Sync PRACTICE MODE Gameplay records
        this.prm_fetchUnsyncedGameplayRecords(this.prm_fetchUnsyncedGameplayRecords_cbf);

        // Sync PRACTICE MODE Gameplaydetail records
        this.prm_fetchUnsyncedAssessmentRecords(this.prm_fetchUnsyncedAssessmentRecords_cbf);

        // Sync PRACTICE MODE Interact Event records
        this.prm_fetchUnsyncedInteractEventRecords(this.prm_fetchUnsyncedInteractEventRecords_cbf);
    },

    reload: function () {

        console.log("ABBCHMPRMDSJSAPI: in reload");
        location.reload(); // to be used when transitioning the page
    },

    echoTest: function () {
        window.sqlitePlugin.echoTest(function () {
            console.log('ABBCHMPRMDSJSAPI: ECHO Test OK');
            //console.log('ECHO test OK');
        });
    },

    selfTest: function () {
        window.sqlitePlugin.selfTest(function () {
            console.log('ABBCHMPRMDSJSAPI: SELF Test OK');
            // console.log('SELF Test OK');
        });
    }

};

var RESTAPImgr = {

    //abbrestapi_baseurl: "https://dev.abs.klp.org.in/abbchmprm/",
    //abbrestapi_baseurl: "https://abbmath.klp.org.in/abbchmprm/",
    abbrestapi_baseurl: "https://abbmath.klp.org.in/abbppchmprm/",
    //"https://abbmath.klp.org.in/abbppchmprm/",

    //https://abbmath.klp.org.in/abbppchmprm/Reports/
    //"https://10.0.2.2/abbchmprm/",

    // function to invoke REST API
    invokeRESTAPI: function (apiname, jsondata) {

        var apiurl = this.abbrestapi_baseurl + apiname;
        var rtn = true;

         console.log("RESTAPImgr.invokeRESTAPI: apiname:" + apiurl + "jsondata" + JSON.stringify(jsondata));

        $.ajax({
            url: apiurl,
            type: "POST",
            dataType: "json",
            // async:false, // set to false to perform a synchronous request
            data: JSON.stringify(jsondata),
            contentType: 'application/json; charset=UTF-8',
            accepts: 'application/json',
            success: function (jsonresp) {
                 console.log("REST API success"+JSON.stringify(jsonresp));
                RESTAPImgr.deleteSyncedRecords(apiname, jsonresp); // delete the Synced records
            },
            error: function (error) {
                rtn = false;
                console.log("ABBCHMPRMDSJSAPI: invokeRESTAPI failed: api: "+apiurl+" error: "+error.toString());
            }
        });

        return rtn;
    },

    deleteSyncedRecords: function (apiname, jsonresp) {

        // console.log("RESTAPImgr.deleteSyncedRecords");

        switch (apiname) {


            case 'txabbchmwalletscore':

                var arrObjs1 = new Array();
                var arrIds1 = new Array();

                var nrecs1 = jsonresp.length;
                // console.log("nrecords:" + nrecs1);
                for (var i = 0; i < nrecs1; i++) {
                    arrObjs1.push(jsonresp[i]);  
                }

                var nfields1 = arrObjs1.length;
                for (var j = 0; j < nfields1; j++) {
                    if(arrObjs1[j].status == 'success')
                        arrIds1.push(arrObjs1[j].objid);   // Only those records which were successfully synced are to be deleted
                }
               
                //console.log("arrIds toString: " + arrIds1.toString());

                abbchmprmdsjsapi.chm_deleteWalletscoreRecordsByIds(arrIds1.toString());

                break;

            case 'txabbchmgameplay':

                var arrObjs1 = new Array();
                var arrIds1 = new Array();

                var nrecs1 = jsonresp.length;
                // console.log("nrecords:" + nrecs1);
                for (var i = 0; i < nrecs1; i++) {
                    arrObjs1.push(jsonresp[i]);  
                }

                var nfields1 = arrObjs1.length;
                for (var j = 0; j < nfields1; j++) {
                    if(arrObjs1[j].status == 'success')
                        arrIds1.push(arrObjs1[j].objid);   // Only those records which were successfully synced are to be deleted
                }
               
                //console.log("arrIds toString: " + arrIds1.toString());

                // Mark fetched records as 'Synced'
                // abbchmprmdsjsapi.chm_markSyncedGameplayRecords(arrIds1.toString());
                // Delete 'Synced' records
                // abbchmprmdsjsapi.chm_deleteSyncedGameplayRecords();
                abbchmprmdsjsapi.chm_deleteGameplayRecordsByIds(arrIds1.toString());

                break;

            case 'txabbchmgameplaydetail':

                // console.log("deleteSyncedRecords: case: txabsgameplaydetail");

                var arrObjs2 = new Array();
                var arrIds2 = new Array();

                var nrecs2 = jsonresp.length;
                // console.log("nrecords:" + nrecs2);
                for (var i = 0; i < nrecs2; i++) {
                    arrObjs2.push(jsonresp[i]);
                }

                var nfields2 = arrObjs2.length;
                for (var j = 0; j < nfields2; j++) {
                    if (arrObjs2[j].status == 'success')
                        arrIds2.push(arrObjs2[j].objid);   // Only those records which were successfully synced are to be deleted
                }

                //console.log("arrIds toString: " + arrIds2.toString());

                // Mark fetched records as 'Synced'
                // abbchmprmdsjsapi.prm_markSyncedAssessmentRecords(arrIds2.toString());
                // Delete 'Synced' records
                // abbchmprmdsjsapi.prm_deleteSyncedAssessmentRecords();
                abbchmprmdsjsapi.chm_deleteAssessmentRecordsByIds(arrIds2.toString());

                break;

            case 'txabbprmgameplay':

                // console.log("deleteSyncedRecords: case: txabbprmgameplay");

   
                var arrObjs1 = new Array();
                var arrIds1 = new Array();

                var nrecs1 = jsonresp.length;
                // console.log("nrecords:" + nrecs1);
                for (var i = 0; i < nrecs1; i++) {
                    arrObjs1.push(jsonresp[i]);  
                }

                var nfields1 = arrObjs1.length;
                for (var j = 0; j < nfields1; j++) {
                    if(arrObjs1[j].status == 'success')
                        arrIds1.push(arrObjs1[j].objid);   // Only those records which were successfully synced are to be deleted
                }
               
                //console.log("arrIds toString: " + arrIds1.toString());

                // Mark fetched records as 'Synced'
                // abbchmprmdsjsapi.prm_markSyncedGameplayRecords(arrIds1.toString());
                // Delete 'Synced' records
                // abbchmprmdsjsapi.prm_deleteSyncedGameplayRecords();
                abbchmprmdsjsapi.prm_deleteGameplayRecordsByIds(arrIds1.toString());

                break;

            case 'txabbprmgameplaydetail':

                // console.log("deleteSyncedRecords: case: txabsgameplaydetail");

                var arrObjs2 = new Array();
                var arrIds2 = new Array();

                var nrecs2 = jsonresp.length;
                // console.log("nrecords:" + nrecs2);
                for (var i = 0; i < nrecs2; i++) {
                    arrObjs2.push(jsonresp[i]);
                }

                var nfields2 = arrObjs2.length;
                for (var j = 0; j < nfields2; j++) {
                    if (arrObjs2[j].status == 'success')
                        arrIds2.push(arrObjs2[j].objid);   // Only those records which were successfully synced are to be deleted
                }

                //console.log("arrObjs2 toString: " + arrObjs2);
                //console.log("arrIds toString: " + arrIds2.toString());

                // Mark fetched records as 'Synced'
                // abbchmprmdsjsapi.prm_markSyncedAssessmentRecords(arrIds2.toString());
                // Delete 'Synced' records
                // abbchmprmdsjsapi.prm_deleteSyncedAssessmentRecords();
                abbchmprmdsjsapi.prm_deleteAssessmentRecordsByIds(arrIds2.toString());

                break;

            case 'txabbprmekstepevents':

                // console.log("deleteSyncedRecords: case: txekstepevents");

                var arrObjs3 = new Array();
                var arrIds3 = new Array();

                var nrecs3 = jsonresp.length;
                // console.log("nrecords:" + nrecs3);
                for (var i = 0; i < nrecs3; i++) {
                    arrObjs3.push(jsonresp[i]);
                }

                var nfields3 = arrObjs3.length;
                for (var j = 0; j < nfields3; j++) {
                    if (arrObjs3[j].status == 'success')
                        arrIds3.push(arrObjs3[j].objid);   // Only those records which were successfully synced are to be deleted
                }

                // console.log("arrIds toString: " + arrIds3.toString());

                // Mark fetched records as 'Synced'
                // abbchmprmdsjsapi.prm_markSyncedInteractEventRecords(arrIds3.toString());
                // Delete 'Synced' records
                // abbchmprmdsjsapi.prm_deleteSyncedInteractEventRecords();
                abbchmprmdsjsapi.prm_deleteInteractEventRecordsByIds(arrIds3.toString());
                break;
        }
    }
};

var TestMgr_abbchmprmdsjsapi = {


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
                abbchmprmdsjsapi.echoTest();
                abbchmprmdsjsapi.selfTest();
                break;

            case '2':
                abbchmprmdsjsapi.initializeDS();
                break;

            case '3':
                abbchmprmdsjsapi.dropTables();
                break;

            case 'CHM1':
             console.log("ABBCHMPRMDSJSAPI: in CHM1");
                var chmwalletscoredata = { avatarname: "avatarsk", deviceid: "deviceidsk", score: "100", datetime_lastupdated: "12:10:05:10:15:10" };
                var id_chmgameplay = abbchmprmdsjsapi.chm_saveWalletscore(chmwalletscoredata);
                break;

            case 'CHM2':
                abbchmprmdsjsapi.chm_fetchUnsyncedWalletscoreRecords(abbchmprmdsjsapi.chm_fetchUnsyncedWalletscoreRecords_cbf);
                break;

            case 'CHM3':
                var chmgameplaydata = { id_game: "SK101", avatarname: "avatarsk", deviceid: "deviceidsk", start_time: "12:10:05:10:15:10", hints: "10" };
                var id_chmgameplay = abbchmprmdsjsapi.chm_saveGameplay(chmgameplaydata);
                break;

            case 'CHM4':
                abbchmprmdsjsapi.chm_fetchUnsyncedGameplayRecords(abbchmprmdsjsapi.chm_fetchUnsyncedGameplayRecords_cbf);
                break;

            case 'CHM5':
                var chmgameplaydata = { id_game: "SK101", avatarname: "avatarsk", deviceid: "deviceidsk", start_time: "12:10:05:10:15:10", hints: "10" };
                var id_chmgameplay = abbchmprmdsjsapi.chm_saveGameplay(chmgameplaydata);

                var chmassessmentdata = { id_game_play: id_chmgameplay, id_question: "1001", pass: "Yes", time2answer: "10", date_time_submission: "12:10:05:10:15:10", avatarname: "avatarsk", deviceid: "deviceidsk"};
                abbchmprmdsjsapi.chm_saveAssessment(chmassessmentdata);
                break;

            case 'CHM6':
                abbchmprmdsjsapi.chm_fetchUnsyncedAssessmentRecords(abbchmprmdsjsapi.chm_fetchUnsyncedAssessmentRecords_cbf);
                break;

            case 'CHM7':
                var chmgamemasterdata = { id: "1", id_game: "SK101", game_description: "Game Description SK", id_grade: "1", gametoopen: "SK102", prerequisitegame: "100" };
                abbchmprmdsjsapi.chm_saveGameMasterData(chmgamemasterdata);
                break;

            case 'CHM8':
                abbchmprmdsjsapi.chm_fetchGameMasterData(abbchmprmdsjsapi.chm_fetchGameMasterData_cbf);
                break;


            case '4':
                var gameplaydata = { id_game: "SK101", avatarname: "avatarsk", deviceid: "deviceidsk", start_time: "12:10:05:10:15:10" };
                var id_gameplay = abbchmprmdsjsapi.prm_saveGameplay(gameplaydata);
                break;

            case '5':
                abbchmprmdsjsapi.prm_fetchUnsyncedGameplayRecords(abbchmprmdsjsapi.prm_fetchUnsyncedGameplayRecords_cbf);
                break;

            case '6':
                abbchmprmdsjsapi.prm_deleteSyncedGameplayRecords();
                break;

            case '7':
                var gameplaydata = { id_game: "SK101", avatarname: "avatarsk", deviceid: "deviceidsk", start_time: "12:10:05:10:15:10" };
                var id_gameplay = abbchmprmdsjsapi.prm_saveGameplay(gameplaydata);

                var assessmentdata = { id_game_play: id_gameplay, id_question: "10", pass: "Yes", time2answer: "5", attempts: "2", date_time_submission: "05:06:07:08:09:10", avatarname: "avatarsk", deviceid: "deviceidsk" };
                abbchmprmdsjsapi.prm_saveAssessment(assessmentdata);
                break;

            case '8':
                abbchmprmdsjsapi.prm_fetchUnsyncedAssessmentRecords(abbchmprmdsjsapi.prm_fetchUnsyncedAssessmentRecords_cbf);
                break;

            case '9':
                abbchmprmdsjsapi.prm_deleteSyncedAssessmentRecords();
                break;

            case '10':
                var gameplaydata = { id_game: "SK101", avatarname: "avatarsk", deviceid: "deviceidsk", start_time: "12:10:05:10:15:10" };
                var id_gameplay = abbchmprmdsjsapi.prm_saveGameplay(gameplaydata);

                var interactdata = { id_game_play: id_gameplay, id_question: "10", date_time_event: "03:04:07:08:07:10", event_type: "TOUCH", res_id: "DEVICE_BAK_BUTTON", avatarname: "avatarsk", deviceid: "deviceidsk" };
                abbchmprmdsjsapi.prm_saveInteractEvent(interactdata);
                break;

            case '11':
                abbchmprmdsjsapi.prm_fetchUnsyncedInteractEventRecords(abbchmprmdsjsapi.prm_fetchUnsyncedInteractEventRecords_cbf);
                break;

            case '12':
                abbchmprmdsjsapi.prm_deleteSyncedInteractEventRecords();
                break;

            case '13':
                abbchmprmdsjsapi.syncTelemetryData();
                break;

            case '14':
                window.location = "page2.html";
                break;

            case '15':
                console.log("case15: to call reload()");
                abbchmprmdsjsapi.reload();
                break;

            case '16':
                console.log("going back to index page");
                window.location = "index.html";
                break;
        }

    }
};

//TestMgr_abbchmprmdsjsapi.forTest();



