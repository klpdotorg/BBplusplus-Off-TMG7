Game.videoSkip=function(game){
	
};


Game.videoSkip.prototype={

	preload:function(){},
	
	create:function(game){
	    _this = this;

        _this.handSkip = _this.add.sprite(800,400,"hand");
        _this.handSkip.anchor.setTo(0.5);
        _this.handSkip.scale.y *= -1;
        _this.handSkip.scale.x *= -1;

        _this.handSkipTween = game.add.tween(_this.handSkip);
        _this.handSkipTween.to({ x: 850,y:420 }, 0, 'Linear', true);

        _this.handSkipTween.start();

        _this.handSkipTween.onComplete.add(function(){
            console.log("loop"+_this.handSkip.x);
            if(_this.handSkip.x>=840){
                _this.handSkipTween.to({ x: 800,y:400 }, 0, 'Linear', true);
            }
            else{
                _this.handSkipTween.to({ x: 850,y:420 }, 0, 'Linear', true);
            }
            _this.handSkipTween.start();
        },this);

		if(window.videoFinished && window.loadingFinished){
				window.demo.pause();
				window.demo.src = "";
				window.demo.remove();
				window.parent.remove();
				window.demo = null;
				window.parent = null;
				_this.state.start('gameModeSelectionScreen',true,false);
		}
		else
		{
			window.demo.loop = false;
			window.skipArrow.style.visibility = "visible";
			window.skipArrow.addEventListener('click',function(){
				window.demo.pause();
				window.demo.src = "";
				window.demo.remove();
				window.parent.remove();
				window.skipArrow.remove();
				window.skipArrow = null;
				window.skipArrowParent.remove();
				window.skipArrowParent = null;
				window.demo = null;
				window.parent = null;
				_this.state.start('gameModeSelectionScreen',true,false);
			},false);
			/*_this.skipDemos = game.add.sprite(803,423,'skipDemoVideos');
			_this.skipDemos.inputEnabled = true;
			_this.skipDemos.events.onInputDown.add(function(){
				_this.skipDemos.destroy();
				window.demo.pause();
				window.demo.src = "";
				window.demo.remove();
				window.parent.remove();
				window.demo = null;
				window.parent = null;
				_this.state.start('gameModeSelectionScreen',true,false);	
						
			},_this);
			_this.stage.add(_this.skipDemos);
			window.parent.style.zIndex = -1;*/
		}
	},

	shutdown:function()
	{
		if(window.loadingSound)
          {
               if(window.loadingSound.contains(window.loadingSoundSrc))
               {
                    window.loadingSound.removeChild(window.loadingSoundSrc);
                    window.src = null;
               }
               if(!window.loadingSound.paused)
               {
                   //console.log("here");
                    window.loadingSound.pause();
                    window.loadingSound.currentTime = 0.0;
               }
               window.loadingSound = null;
               window.loadingSoundSrc = null;
          }
	}
}