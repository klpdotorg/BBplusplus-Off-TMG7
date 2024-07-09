var app = {

  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  onDeviceReady: function () {
    this.receivedEvent('deviceready');
    AndroidFullScreen.immersiveMode(successFunction, errorFunction);
  },
 

  receivedEvent: function (id) {


    /*var onSuccess = function(result) {
      // handle result  
      console.log(result);
      };

      var onError = function(err) {
      // handle error
      console.log(err);
      }

      var options = {
          devKey: 'LW6HqaFQY7CtGB2MKz4nWE',
          isDebug: false
      };

      console.log(window.plugins.appsFlyer);

      window.plugins.appsFlyer.initSdk(options, onSuccess, onError);

      facebookConnectPlugin.activateApp(onSuccess, onError);

      FirebasePlugin.setCrashlyticsCollectionEnabled();

      

     bbreglogin.initializeDB();

     screen.orientation.lock('portarait');

     FirebasePlugin.onMessageReceived(function(message) {
        console.log("Message type: " + message.messageType);
        if(message.messageType === "notification"){
            console.log("Notification message received");
            if(message.tap){
                console.log("Tapped in " + message.tap);
            }
        }
        console.dir(message);
    }, function(error) {
        console.error(error);
    });


  */

    bbreglogin.initializeDB();

    var game = new Phaser.Game(540, 960, Phaser.CANVAS, 'phaser_canvas', { preload: this.preload, create: this.create }, false, true, null);

    game.state.add('boot', Game.boot);
    game.state.add('langSelectScreen', Game.langSelectScreen);
    game.state.add('preloader', Game.preloader);
    game.state.add('userprogress', Game.userprogress);
    game.state.add('userprogress2', Game.userprogress2);
    game.state.add('appLoginScreen', Game.appLoginScreen);
    game.state.add('appLoginEditScreen', Game.appLoginEditScreen);
    game.state.add('editLangScreen', Game.editLangScreen);
    game.state.add('registrationLangSelectionScreen', Game.registrationLangSelectionScreen);
    game.state.add('registrationPicSelectionScreen', Game.registrationPicSelectionScreen);
    game.state.add('index2', Game.index2);

  },

  preload: function (game) {
    game.load.video('demo', './demo.mp4');
    game.load.image('splash', 'assets/splash.png');
    game.load.image('helpIcon', './helpIcon.png');
    game.load.image('closeIcon', './closeIcon.png');
    game.load.image('registrationbg', 'assets/registrationbg.png');
    game.load.image('graphicBg', 'assets/graphicBg.png');
    game.load.image('carrotIcon', 'assets/carrotIcon.png');
    game.load.image('regBackArrow', 'assets/regBackArrow.png');
    game.load.image('userEditBtn', 'assets/userEditBtn.png');
    game.load.image('userProgressBtn', 'assets/userProgressBtn.png');
    game.load.atlas('fish', 'assets/fish.png', 'assets/fish.json');
    game.load.atlas('butterfly', 'assets/butterfly.png', 'assets/butterfly.json');
    game.load.atlas('flower', 'assets/flower.png', 'assets/flower.json');
    game.load.atlas('parrot', 'assets/parrot.png', 'assets/parrot.json');
    game.load.atlas('sun', 'assets/sun.png', 'assets/sun.json');
    game.load.atlas('tree', 'assets/tree.png', 'assets/tree.json');
    game.load.atlas('regTickBtn', 'assets/regTickBtn.png', 'assets/regTickBtn.json');
    game.load.atlas('regandstsrtBtn', 'assets/regandstsrtBtn.png', 'assets/regandstsrtBtn.json');
    game.load.atlas('regloding', 'assets/loding.png', 'assets/loding.json');

    game.load.bitmapFont('regFont', 'regFont.png', 'regFont.xml');
  },

  create: function (game) {
    console.log("I am in index.js");

    //* Date 12-08-2023sw
    //* Generating BBplusplus app in two ways online & offline
    //* Here we are setting a variaable to indicate which apk we are going to generate 
    //* app_Mode is variable we are going to use to indicate online/offline
    this.app_Mode = "offline"; //online//* Set to to offline if you want to generate offline app
    if (this.app_Mode == "offline") {
      window.languageSelected = "Marathi"; //* Set this variable based on the language you need to generate - Offline
    }
    console.log(this.app_Mode, "App MODE ///");
    game.input.maxPointers = 1;
    window.app_Mode = this.app_Mode;
    console.log(window.app_Mode, "window MODE ///");
    game.stage.disableVisibilityChange = true;

    //setting scale and orientation for the game.
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.updateLayout(true);
    game.scale.forceOrientation(true, false);


    game.stage.backgroundColor = '#71c5cf';
    var splash = game.add.sprite(game.world.centerX, game.world.centerY, 'splash');
    splash.scale.setTo(1);
    splash.anchor.setTo(0.5);

    console.log(game);

    this.game.add.text(0, 0, "hack", { font: "1px myfont", fill: "#FFFFFF" });
    this.game.add.text(0, 0, "hack", { font: "1px gradefont", fill: "#FFFFFF" });
    this.game.add.text(0, 0, "hack", { font: "1px regfont1", fill: "#FFFFFF" });
    this.game.add.text(0, 0, "hack", { font: "1px regfont2", fill: "#FFFFFF" });
    this.game.add.text(0, 0, "hack", { font: "1px regfont3", fill: "#FFFFFF" });
    this.game.add.text(0, 0, "hack", { font: "1px regfont4", fill: "#FFFFFF" });



    game.time.events.add(300, function () {
      game.time.events.removeAll();
      /*game.width = 960;
        game.height = 540;
      console.log(game);
  
      screen.orientation.lock('landscape');*/
      game.state.start('appLoginScreen', true, false, this.app_Mode);
    }, this);

  },




};

function successFunction() {
  console.log('Immersive mode set successfully.');
}

function errorFunction(error) {
  console.error('Error setting immersive mode:', error);
}
app.initialize();