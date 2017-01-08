//弹道-火弹

(function(){
	function FireBarrage(){
		this.Barrage_constructor();

	}

	var p = createjs.extend(FireBarrage,cls.Barrage);

	p.setSpriteData = function(){
		if(this.animation && this.animation.parent){
			this.animation.parent.removeChild(this.animation);
		}

		this.data = {
			images: [images.fireBarrage],
			frames: {width: 82,height: 83,regX: 41,regY: 41.5},
			animations: {
				run: {
					frames: [0,1,2,3],
					next: 'run',
					speed: 0.3
				},
				hit: {
					frames: [4,5,6,7],
					speed: 0.3
				}
			}
		}

		this.spriteSheet = new createjs.SpriteSheet(this.data);
		this.animation = new createjs.Sprite(this.spriteSheet,'run');
		this.addChild(this.animation);
	}

	cls.FireBarrage = createjs.promote(FireBarrage,'Barrage');
})();