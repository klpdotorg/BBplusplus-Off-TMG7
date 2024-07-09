var nativeApp = 
{
	CloseApp:function() {

            
        },

        CallUserProgress:function() {

            

        },

        CallUserProgressFetchError:function() {

            

        },

        CallUserProgressBeforeFEtchingData:function() {

            

        },
		
		playHelp:function(_this,currentstate)
		{
			
			//_this.game.input.enabled = false;
			_this.video.play(false);
					
					_this.video.changeSource("./helpvideo.mp4");
					
					_this.something = _this.video.addToWorld();
					
					_this.video.play(false);
					
					//document.getElementById('phaser_canvas').style.pointerEvents = "none";
					
					_this.video.onComplete.add(function(){
					_this.game.input.enabled = true;
					_this.skiphelp.destroy();
					_this.something.destroy();
					//document.getElementById('phaser_canvas').style.pointerEvents = "initial";
					_this.state.start(currentstate,true,false);
					},_this);
					
					_this.skiphelp = _this.add.sprite(_this.world.centerX,21,'closeIcon');
					_this.skiphelp.anchor.setTo(0.5);
					_this.skiphelp.scale.setTo(0.8);
					_this.skiphelp.inputEnabled = true;
					_this.skiphelp.events.onInputDown.add(function(){
						//_this.game.input.enabled = true;
						_this.skiphelp.destroy();
						_this.something.destroy();
						_this.state.start(currentstate,true,false);
						//document.getElementById('phaser_canvas').style.pointerEvents = "initial";
						
					},_this);
		},


        ShareApp:function() {
            //navigator.share("hai","Building Blocks","plain/text");

            FirebasePlugin.logEvent("Share_button_clicked", {Share_button_clicked_value: "Share_button_clicked", item_id: ""});

            var options = {
              message: 'Check out this Amazing app \"Building Blocks\",  that can help your child studying in class 1-5 learn Mathematics in the most amazing way, Download the android app now:', // not supported on some apps (Facebook, Instagram)
              subject: 'Building Blocks', // fi. for email
              files: ['', ''], // an array of filenames either locally or remotely
              url: 'http://bit.ly/Building_blocks_download',
              chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
            }
             
            var onSuccess = function(result) {
              console.log(result); // On Android apps mostly return false even while it's true
              //console.log("Shared to app: " + result.app.substring(result.app.lastIndexOf(".") + 1, result.app.lastIndexOf("/"))); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
			  var str = result.app.split('.',2);
			  console.log('str',str);
			  str = str[1];
			  str = str.split('/',1);
			  str = str[0];
			  console.log('str',str);
              console.log("Shared to app: " + result.app.split('.').pop().split('/')[0]); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
            }
             
            var onError = function(msg) {
              console.log("Sharing failed with message: " + msg);
            }
 
            window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
        },


        RateApp:function() {
            
        },


        openPlaystore:function() {
            
        },

        sendEmail:function() {

            
        },

        getDeviceName:function() {
            
        },


        capitalize:function() {
            
        },

        screenViewStringPass:function(){

            
        },
        
        selectModeType:function(message){
            FirebasePlugin.logEvent("Select_mode_type", {Select_mode_type_value: message, item_id: ""});
        },

        startPracticeActivity:function(message)
        {
            FirebasePlugin.logEvent("Select_practice_activity", {Select_practice_avty_val: message, item_id: ""});
        },

       startChallengeActivity:function(message)
        {
           FirebasePlugin.logEvent("Select_challenge_activity", {Select_chal_avty_val: message, item_id: ""});
        },

        finishPracticeActivity:function(message)
        {
            FirebasePlugin.logEvent("Finish_practice_activity", {Finish_practice_acty_val: message, item_id: ""});
        },

        finishChallengeActivity:function(message)
        {
            FirebasePlugin.logEvent("Finish_Challenge_activity", {Finish_chal_acty_val: message, item_id: ""});
        },

        onButtonShowPopupWindowClick:function(message) {
            
        },
};