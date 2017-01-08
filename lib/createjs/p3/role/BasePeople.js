//角色基类

var cls = {},woody,freeze;//角色

(function(){
	function BasePeople(){
		this.Container_constructor();

		this.width = 80;
		this.height = 80;
		this.walkSpeedX = 2;
		this.walkSpeedY = 0.5;
		this.runSpeedX = 5;
		this.runSpeedY = 0.5;
		this.jumpHeight = 30;
		this.runJumpHeight = 35;
		this.arraw = 'right';
        this.isWalk = false;
        this.isRun = false;
        this.isJump = false;
        this.isRunJumpAttack = false;
        this.isDecelerate = false;
        this.isAttack = false;
		this.setSpriteData();
	}

	var p = createjs.extend(BasePeople,createjs.Container);
	p.setSpriteData = function(){

	}

	//基本动作
	p.stand = function(){
		this.animation.gotoAndPlay('stand');
	}

	p.move = function(x,y){

		if(this.x - this.width/4 < 0){
			this.x = this.width/4;
			x = 0;
		}else if(this.x + this.width/4 > w){
			this.x = w - this.width/4;
			x = 0;
		}
		this.x += x;
		this.y += y;
	}

	p.changeArraw = function(){
		this.arraw = this.arraw === 'left' ? 'right' : 'left';
		this.animation.scaleX *= -1;
	}

	p.changeStop = function(){
		this.removeEventListener('tick',this._walking);
		this.removeEventListener('tick',this._running);
		this.removeEventListener('tick',this._decelerating);
	}


	//组合动作--走路
	p.startWalk = function(sx,sy){
		if(this.isWalk){
			return false;
		}

		this.isWalk = true;

		var _this = this;
		this.changeStop();
		this.animation.gotoAndPlay('walk');

		if((sx < 0 && this.arraw === 'right') || (sx > 0 && this.arraw === 'left')){
			this.changeArraw();
		}
		this.sx = sx;
		this.sy = sy;
		this.addEventListener('tick',this._walking = function(){_this.walking();});
	}

	p.walking = function(){
		this.move(this.sx,this.sy);
	}

	p.stopWalk = function(){
		this.isWalk = false;
		this.animation.gotoAndPlay('stand');
		this.removeEventListener('tick',this._walking);
	}


	//组合动作--跑
	p.startRun = function(sx,sy){
		if(this.isRun){
			return false;
		}
		this.isRun = true;

		var _this = this;
		this.changeStop();
		this.animation.gotoAndPlay('run');

		if((sx < 0 && this.arraw === 'right') || (sx > 0 && this.arraw === 'left')){
			this.changeArraw();
		}
		this.sx = sx;
		this.sy = sy;
		this.addEventListener('tick',this._running = function(){_this.running();});
	}

	p.running = function(){
		this.move(this.sx,this.sy);
	}

	p.stopRun = function(){
		this.isRun = false;
		this.animation.gotoAndPlay('stand');
		this.removeEventListener('tick',this._running);
	}


	//组合动作--翻跟斗减速（常用于跑停）
	p.startDecelerate = function(){
		if(this.isDecelerate){
			return false;
		}
		this.isDecelerate = true;

		var _this = this;
		this.changeStop();
		this.animation.gotoAndPlay('somersault');
		this.addEventListener('tick',this._decelerating = function(){_this.decelerating();});
	}

	p.decelerating = function(){
		this.sx = this.sx * 0.9;
		this.sy = this.sy * 0.9;
		this.move(this.sx,this.sy);
		if(this.animation.currentFrame === 0){
			this.stopDecelerate();
		}
	}

	p.stopDecelerate = function(){
		this.isDecelerate = false;
		this.animation.gotoAndPlay('stand');
		this.removeEventListener('tick',this._decelerating);
	}


	//组合动作--跳
	p.startJump = function(){
		if(this.isJump){
			return false;
		}
		this.isJump = true;

		var _this = this;
		this.changeStop();
		this.animation.gotoAndPlay('jump');
		this.jumpH = this.jumpHeight;
		this.jumpY = this.y;
		this.addEventListener('tick',this._jumping = function(){_this.jumping();});
	}

	p.jumping = function(){
		var jumpFrame = this.data.animations.jump.frames;
		//console.log(this.jumpH);
		if(this.animation.currentFrame === jumpFrame[jumpFrame.length - 1]){
			this.jumpH -=3;
			this.move(0,-this.jumpH);
			if(this.y  >= this.jumpY){
				this.y = this.jumpY;
				this.stopJump();
			}
		}
	}

	p.stopJump = function(){
		this.isJump = false;
		this.removeEventListener('tick',this._jumping);
		this.animation.gotoAndPlay('crouch');
	}


	//组合动作--跑跳攻击
	p.startRunJumpAttack = function(){
		if(this.isRunJumpAttack){
			return false;
		}
		this.isRunJumpAttack = true;

		var _this = this;
		this.changeStop();
		this.animation.gotoAndPlay('runJump');
		this.runJumpH = this.runJumpHeight;
		this.runJumpY = this.y;
		this.addEventListener('tick',this._runJumpAttacking = function(){_this.runJumpAttacking();});
	}

	p.runJumpAttacking = function(){
		var runJumpFrame = this.data.animations.runJump.frames;
		this.runJumpH -= 4;
		this.move(this.sx,-this.runJumpH);
		if(this.animation.currentFrame === runJumpFrame[runJumpFrame.length - 1] && this.runJumpH < 30){
			this.animation.gotoAndPlay('runJumpAttack');
		}
		if(this.y >= this.runJumpY){
			this.y = this.runJumpY;
			this.stopRunJumpAttack();
		}
	}

	p.stopRunJumpAttack = function(){
		this.isRunJumpAttack = false;
		this.animation.gotoAndPlay('crouch');
		this.removeEventListener('tick',this._runJumpAttacking);
	}


	//组合动作--攻击：1-左勾拳 2-右勾拳 3-旋风腿
	p.startAttack = function(type){
		if(this.isAttack){
    		return false;
		}
		this.isAttack = true;

		var _this = this;
		this.changeStop();
		if(type === 3){
			this.animation.gotoAndPlay('attack3');
		}else{
			if(Math.random() > 0.5){
				this.animation.gotoAndPlay('attack1');
			}else{
				this.animation.gotoAndPlay('attack2');
			}
		}
		this.addEventListener('tick',this._attacking = function(){_this.attacking();});
	}

	p.attacking = function(){
		if(this.animation.currentFrame === 0){
			this.stopAttack();
		}
	}

	p.stopAttack = function(){
		this.isAttack = false;
		this.animation.gotoAndPlay('stand');
		this.removeEventListener('tick',this._attacking);
	}



	//继承：生成BasePeople.Container_constructor方法供调用
	cls.BasePeople = createjs.promote(BasePeople,'Container');
})();