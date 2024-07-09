var BBplusplusdbDetails = {

    databasename: "BBplusplusdb.db",
    providercode: "CAL",  // 3-char ID for the provider of the app/game. (e.g 'CAL' for Callystro)
    bbdbhandler: null,
    debugalerts: true,
    erroralerts: true,

    // Create/Open the database
    initializeDB: function () {

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Enter initialiseDB");

        this.bbplusplusdbhandler = window.sqlitePlugin.openDatabase(
            {
                name: this.databasename, location: 'default'
            },
            function () {
                if (BBplusplusdbDetails.debugalerts)
                    console.log("BBplusplusdbDetails: initialiseDS: openDatabase success");
            },
            function (msg) {
                if (BBplusplusdbDetails.erroralerts)
                    console.log("BBplusplusdbDetails: initialiseDS: openDatabase failed: " + msg);
                return false;
            }
        );

        // Creates/Opens the Tables
        this.createTables();

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Exit initialiseDS");

        return true;
    },

    deleteDS: function () {

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Enter deleteDS");

        this.bbplusplusdbhandler = window.sqlitePlugin.deleteDatabase(
            {
                name: this.databasename, location: 'default'
            },
            function () {
                if (BBplusplusdbDetails.debugalerts)
                    console.log("BBplusplusdbDetails: deleteDS: success");
            },
            function (msg) {
                if (BBplusplusdbDetails.erroralerts)
                    console.log("BBplusplusdbDetails: deleteDS: failed: " + msg);
                return false;
            }
        );

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Exit deleteDS");
    },

    // Create the tables
    createTables: function () {

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Enter createTables");

        this.bbplusplusdbhandler.sqlBatch([
            'CREATE TABLE IF NOT EXISTS UserProgress (id INTEGER PRIMARY KEY AUTOINCREMENT, deviceId TEXT, grade TEXT, microConcept TEXT, gradeTopics TEXT, gameId TEXT, totalLearingTimeinHrs TEXT, totalLearingTimeinMins TEXT, totalLearingTimeinSecs TEXT , score INTEGER)',
            ],
            function () {
                if (BBplusplusdbDetails.debugalerts)
                    console.log("BBplusplusdbDetails: createTables: success");
            },
            function (error) {
                if (BBplusplusdbDetails.erroralerts)
                    console.log("BBplusplusdbDetails: createTables: failed" + error.message);
                return false;
            }
        );

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Exit createTables");

        return true;
    },

    dropTables: function () {

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Enter dropTables");

        this.bbplusplusdbhandler.sqlBatch([
            'DROP TABLE IF EXISTS User',
            ],
            function () {
                if (BBplusplusdbDetails.debugalerts)
                    console.log("BBplusplusdbDetails: dropTables: success");
            },
            function (error) {
                if (BBplusplusdbDetails.erroralerts)
                    console.log("BBplusplusdbDetails: dropTables: failed" + error.message);
                return false;
            }
        );

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Exit dropTables");

        return true;
    },

    //Saving the Userprogress in the game level
    userProgressSaving : function (objData) {
        if((objData.device_id == "") || (objData.grade == "") || (objData.microConcept == "") || (objData.gradeTopics == "") || (objData.game_id == "") || (objData.totalLearningTimeinHrs == "") || (objData.totalLearningTimeinMins == "") || (objData.totalLearningTimeinSecs == "") || (objData.score == "")) {

        	if (BBplusplusdbDetails.erroralerts) {
                console.log("objdata" + objData.device_id + ", " + objData.grade + ", " + objData.microConcept + ", " + objData.gradeTopics + ", " + objData.game_id + ", " + objData.totalLearningTimeinHrs + ", " + objData.totalLearningTimeinMins+", " + objData.totalLearningTimeinSecs);
                console.log("BBplusplusdbDetails: ERROR: userProgressSaving: values for one or more input parameters are missing.");
            } 

            return false;
        }

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Enter userProgressSaving. objData: " + objData.device_id + ", " + objData.grade + ", " + objData.microConcept + ", " + objData.gradeTopics + ", " + objData.game_id + ", " + objData.totalLearningTimeinHrs + ", " + objData.totalLearningTimeinMins+", " + objData.totalLearningTimeinSecs+","+objData.score);


        var query = "INSERT INTO UserProgress ( deviceId, grade, microConcept, gradeTopics, gameId, totalLearingTimeinHrs, totalLearingTimeinMins, totalLearingTimeinSecs , score) VALUES (?,?,?,?,?,?,?,?,?)";

        this.bbplusplusdbhandler.executeSql(query, [objData.device_id, objData.grade,objData.microConcept, objData.gradeTopics, objData.game_id, objData.totalLearningTimeinHrs,objData.totalLearningTimeinMins, objData.totalLearningTimeinSecs,objData.score],
            function (rs) {
                if (BBplusplusdbDetails.debugalerts) {
                    console.log("BBplusplusdbDetails: userProgressSaving: success");
                    console.log("BBplusplusdbDetails: resultSet.insertId: " + rs.insertId);
                }
            },
            function (error) {
                if (BBplusplusdbDetails.erroralerts)
                    console.log("BBplusplusdbDetails: userProgressSaving: failed" + error.message);
                return false;
            }
        );

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Exit userProgressSaving");
    },

    //updating the totalLearingTime using game_id
    updateRecordsUsingGameID : function(objData) {
        if((objData.game_id == "") || (objData.totalLearningTimeinHrs == "") || (objData.totalLearningTimeinMins == "") || (objData.totalLearningTimeinSecs == "")) {

        	if (BBplusplusdbDetails.erroralerts) {
                console.log("BBplusplusdbDetails: ERROR: updateRecordsUsingGameID: values for one or more input parameters are missing.");
            } 

            return false;
        }

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Enter updateRecordsUsingGameID. objData: "+ objData.game_id + ", " + objData.totalLearningTimeinHrs + ", " + objData.totalLearningTimeinMins+", " + objData.totalLearningTimeinSecs);


        var query = 'UPDATE UserProgress SET totalLearingTimeinHrs="'+objData.totalLearningTimeinHrs+'" ,totalLearingTimeinMins="'+objData.totalLearningTimeinMins+'",totalLearingTimeinSecs="'+objData.totalLearningTimeinSecs+'" WHERE gameId="'+objData.game_id+'"';

        this.bbplusplusdbhandler.executeSql(query, [],
            function (rs) {
                if (BBplusplusdbDetails.debugalerts) {
                    console.log("BBplusplusdbDetails: updateRecordsUsingGameID: success");
                    console.log("BBplusplusdbDetails: resultSet.rowsAffected: " + rs.rowsAffected);
                }
            },
            function (error) {
                if (BBplusplusdbDetails.erroralerts)
                    console.log("BBplusplusdbDetails: updateRecordsUsingGameID: failed" + error.message);
                return false;
            }
        );

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Exit updateRecordsUsingGameID");
    },

    //Other Required Queries 
    /*
        1. SELECT * FROM UserProgress WHERE gameId = particular game id
        2. SELECT COUNT(*) FROM UserProgress WHERE microConcept = particular microconcept
        3. SELECT COUNT(*) FROM UserProgress WHERE gradeTopics = particular gradeTopics
        4. SELECT totalLearingTimeinHrs, totalLearingTimeinMins, totalLearingTimeinSecs FROM UserProgress WHERE microConcept = particular microconcept
        5. SELECT totalLearingTimeinHrs, totalLearingTimeinMins, totalLearingTimeinSecs FROM UserProgress WHERE gradeTopics = particular gradeTopics
    */

    //Get the count of GradeTopics for each gradeTopics
    getCountofEachGradeTopics : function(objData) {
        if((objData.gradeTopics == "")) {

        	if (BBplusplusdbDetails.erroralerts) {
                console.log("BBplusplusdbDetails: ERROR: getCountofEachGradeTopics: values for input parameters are missing.");
            } 

            return false;
        }

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Enter getCountofEachGradeTopics. objData: "+ objData.gradeTopics);


        var query = 'SELECT COUNT(*) FROM UserProgress WHERE gradeTopics="'+objData.gradeTopics+'"';

        this.bbplusplusdbhandler.executeSql(query, [],
            function (rs) {
                if (BBplusplusdbDetails.debugalerts) {
                    console.log("BBplusplusdbDetails: getCountofEachGradeTopics: success");
                    console.log("BBplusplusdbDetails: resultSet " + rs);
                }

                return rs;
            },
            function (error) {
                if (BBplusplusdbDetails.erroralerts)
                    console.log("BBplusplusdbDetails: getCountofEachGradeTopics: failed" + error.message);
                return false;
            }
        );

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Exit getCountofEachGradeTopics");
    },

    //Get the count of microConcept for each microConcept
    getCountofEachMicroConcept : function(objData) {
        if((objData.microConcept == "")) {

        	if (BBplusplusdbDetails.erroralerts) {
                console.log("BBplusplusdbDetails: ERROR: getCountofEachMicroConcept: values for input parameters are missing.");
            } 

            return false;
        }

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Enter getCountofEachMicroConcept. objData: "+ objData.microConcept);


        var query = 'SELECT COUNT(*) FROM UserProgress WHERE microConcept ="'+objData.microConcept+'"';

        this.bbplusplusdbhandler.executeSql(query, [],
            function (rs) {
                if (BBplusplusdbDetails.debugalerts) {
                    console.log("BBplusplusdbDetails: getCountofEachMicroConcept: success");
                    console.log("BBplusplusdbDetails: resultSet " + rs);
                }

                return rs;
            },
            function (error) {
                if (BBplusplusdbDetails.erroralerts)
                    console.log("BBplusplusdbDetails: getCountofEachMicroConcept: failed" + error.message);
                return false;
            }
        );

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Exit getCountofEachMicroConcept");
    },

    //Get the totalLearingTime of GradeTopics for each gradeTopics
    getTotalLearingTimeofEachGradeTopics : function(objData) {
        if((objData.gradeTopics == "")) {

        	if (BBplusplusdbDetails.erroralerts) {
                console.log("BBplusplusdbDetails: ERROR: getTotalLearingTimeofEachGradeTopics: values for input parameters are missing.");
            } 

            return false;
        }

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Enter getTotalLearingTimeofEachGradeTopics. objData: "+ objData.gradeTopics);


        var query = 'SELECT totalLearingTimeinHrs, totalLearingTimeinMins, totalLearingTimeinSecs FROM UserProgress WHERE gradeTopics="'+objData.gradeTopics+'"';

        this.bbplusplusdbhandler.executeSql(query, [],
            function (rs) {
                if (BBplusplusdbDetails.debugalerts) {
                    console.log("BBplusplusdbDetails: getTotalLearingTimeofEachGradeTopics: success");
                    console.log("BBplusplusdbDetails: resultSet " + rs);
                }

                return rs;
            },
            function (error) {
                if (BBplusplusdbDetails.erroralerts)
                    console.log("BBplusplusdbDetails: getTotalLearingTimeofEachGradeTopics: failed" + error.message);
                return false;
            }
        );

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Exit getTotalLearingTimeofEachGradeTopics");
    },

    //Get the totalLearingTime of microConcept for particular microConcept
    getTotalLearingTimeofEachMicroConcept : function(objData) {
        if((objData.microConcept == "")) {

        	if (BBplusplusdbDetails.erroralerts) {
                console.log("BBplusplusdbDetails: ERROR: getTotalLearingTimeofEachMicroConcept: values for input parameters are missing.");
            } 

            return false;
        }

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Enter getTotalLearingTimeofEachMicroConcept. objData: "+ objData.microConcept);


        var query = 'SELECT totalLearingTimeinHrs, totalLearingTimeinMins, totalLearingTimeinSecs FROM UserProgress WHERE microConcept ="'+objData.microConcept+'"';

        this.bbplusplusdbhandler.executeSql(query, [],
            function (rs) {
                if (BBplusplusdbDetails.debugalerts) {
                    console.log("BBplusplusdbDetails: getTotalLearingTimeofEachMicroConcept: success");
                    console.log("BBplusplusdbDetails: resultSet " + rs);
                }

                return rs;
            },
            function (error) {
                if (BBplusplusdbDetails.erroralerts)
                    console.log("BBplusplusdbDetails: getTotalLearingTimeofEachMicroConcept: failed" + error.message);
                return false;
            }
        );

        if (BBplusplusdbDetails.debugalerts)
            console.log("BBplusplusdbDetails: Exit getTotalLearingTimeofEachMicroConcept");
    },

}