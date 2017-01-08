//弹道--冰弹

(function(){
	function IceBarrage(){
		this.Barrage_constructor();

	}

	var p = createjs.extend(IceBarrage,cls.Barrage);

	p.setSpriteData = function(){
		//清除animation
		if(this.animation && this.animation.parent){
			this.animation.parent.removeChild(this.animation);
		}

		this.data = {
			images: [images.iceBarrage],
			frames: {width: 82,height: 83,regX: 41,regY: 41.5},
			animations: {
				run: {
					frames: [0,1,2,3],
					next: 'run',
					speed: 0.3
				},
				hit: {
					frames: [4,5,6,7],
					next: 'hit',
					speed: 0.3
				}
			}
		}

		this.spriteSheet = new createjs.SpriteSheet(this.data);
		this.animation = new createjs.Sprite(this.spriteSheet,'run');
		this.addChild(this.animation);
	}

	cls.IceBarrage = createjs.promote(IceBarrage,'Barrage');
})();