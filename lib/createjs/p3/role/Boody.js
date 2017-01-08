//角色Woody

(function(){
	function Woody(){
		this.BasePeople_constructor();
	}

	var p = createjs.extend(Woody,cls.BasePeople);

	p.setSpriteData = function(){
		//???
		if(this.animation && this.animation.parent){
			this.animation.parent.removeChild(this.animation);
		}

		this.data = {
			images: [images.woody_0,images.woody_1,images.woody_2],
			frames: {width: 80,height: 80,regX: 40,regY: 40},
			animations: {
				stand:[0,3,"stand",0.3],
				walk:{
				    frames: [4,5,6,7,6,5],
				    next: "walk",
				    speed: 0.3
				},
				run:{
				    frames: [20,21,22,21],
				    next: "run",
				    speed: 0.3
				},
				somersault:{
				    frames: [58,59,69],
				    next: "stand",
				    speed: 0.3
				},
				attack1:[10,13,"stand",0.3],
				attack2:[14,17,"stand",0.3],
				attack3:{
				    frames: [8,9,19],
				    next: "stand",
				    speed: 0.3
				},
				jump:{
				    frames: [60,61,62],
				    next: "jumpSky",
				    speed: 0.3
				},
				jumpSky:{
				    frames: [62],
				    speed: 0.3
				},
				crouch:{
				    frames: [61],
				    next: "stand",
				    speed: 0.3
				},
				runJump:{
				    frames: [112],
				    speed: 0.3
				},
				runJumpAttack:{
				    frames: [107,108,109],
				    speed: 0.3
				},
				guiqizhan:{
				    frames: [140,141,142,143,144,145,146,147,148,149,150,151],
				    next: "stand",
				    speed: 0.3
				}
			}
		}

		this.spriteSheet = new createjs.SpriteSheet(this.data);
		this.animation = new createjs.Sprite(this.spriteSheet,'stand');
		this.addChild(this.animation);

	}

	cls.Woody = createjs.promote(Woody,'BasePeople');
})();