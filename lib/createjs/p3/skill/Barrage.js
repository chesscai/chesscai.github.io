//弹道基类

(function(){
	function Barrage(){
		this.Container_constructor();

		this.width = 82;
		this.height = 83;
		this.arraw = 'right';
		this.moveSpeedX = 10;
		this.setSpriteData();
	}

	var p = createjs.extend(Barrage,createjs.Container);
	p.setSpriteData = function(){

	}

	//基本动作
	p.move = function(x,y){
		this.x += x;
		this.y += y;
	}

	p.changeArraw = function(){
		this.arraw = this.arraw === 'left' ? 'right' : 'left';
		this.animation.scaleX *= -1;
		this.moveSpeedX *= -1;
	}

	p.changeStop = function(){
		this.removeEventListener('tick',this._running);
		this.removeEventListener('tick',this._hitting);
	}

	//组合动作--移动
	p.startRun = function(sx,sy){
		var _this = this;
		this.sx = sx;
		this.sy = sy;
		this.animation.gotoAndPlay('run');
		this.addEventListener('tick',this._running = function(){_this.running();});
	}

	p.running = function(){
		this.move(this.sx,this.sy);
		if(this.x < this.width/2 || this.x > w - this.width/2 || this.y < this.height || this.y > h - this.height/2){
			this.startHit();
		}
	}

	p.stopRun = function(){
		this.removeEventListener('tick',this._running);
		if(this.parent){
			this.parent.removeChild(this);
		}
	}


	//组合动作--爆
	p.startHit = function(){
		var _this = this;
		this.changeStop();
		this.animation.gotoAndPlay('hit');
		this.addEventListener('tick',this._hitting = function(){_this.hitting();});
	}

	p.hitting = function(){
		var hitFrame = this.data.animations.hit.frames;
		if(this.animation.currentFrame === hitFrame[hitFrame.length - 1]){
			this.stopHit();
		}
	}

	p.stopHit = function(){
		this.removeEventListener('tick',this._hitting);
		if(this.parent){
			this.parent.removeChild(this);
		}
	}


	//继承：生成Barrage.Container_constructor方法供调用
	cls.Barrage = createjs.promote(Barrage,'Container');
})();