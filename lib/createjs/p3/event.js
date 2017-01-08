/**
*  事件绑定 event
*
*  freeze
*  移动：A 65 W 87 D 68  S 83
*  攻击：F 70 左右勾拳
*  攻击：G 71 旋风手
*  攻击：H 72 冰弹
*  攻击：T 84 隐藏技能
*
*  woody
*  移动：left 37 up 38 right 39  down 40
*  攻击：J 74 左右勾拳
*  攻击：K 75 旋风腿
*  攻击：L 76 火弹
*  攻击：I 73 隐藏技能
**/

function bindEvent(){
	function keyDown(e){
		var keyCode = e.keyCode;

		if(keyCode === 65 && !freeze.isJump){
			freeze.startWalk(-freeze.walkSpeedX,0);
		}else if(keyCode === 68 && !freeze.isJump){
			freeze.startWalk(freeze.walkSpeedX,0);


		}else if(keyCode === 37 && !woody.isJump){
			woody.startWalk(-woody.walkSpeedX,0);
		}else if(keyCode === 39 && !woody.isJump){
			woody.startWalk(woody.walkSpeedX,0);
		}

	}

	function keyUp(e){
		var keyCode = e.keyCode;

		if(keyCode === 65 && !freeze.isJump){
			freeze.stopWalk();
		}else if(keyCode === 68 && !freeze.isJump){
			freeze.stopWalk();
		}else if(keyCode === 87 && !freeze.isJump && !freeze.isRunJumpAttack){
			freeze.startJump();
		}else if(keyCode === 70 && !freeze.isAttack && !freeze.isJump){
			freeze.startAttack();
		}else if(keyCode === 71 && !freeze.isAttack && !freeze.isJump){
			freeze.startAttack(3);
		}else if(keyCode === 84 && !freeze.isJump && !freeze.isRunJumpAttack){
			freeze.startRunJumpAttack();
		}else if(keyCode === 72 && !freeze.isJump){
			freeze.startAttack();
			var iceBarrage = new cls.IceBarrage();
			iceBarrage.x = freeze.x;
			iceBarrage.y = freeze.y;
			if(iceBarrage.arraw !== freeze.arraw){
				iceBarrage.changeArraw();
			}
			container.addChild(iceBarrage);
			iceBarrage.startRun(iceBarrage.moveSpeedX,0);


		}else if(keyCode === 37 && !woody.isJump){
			woody.stopWalk();
		}else if(keyCode === 39 && !woody.isJump){
			woody.stopWalk();
		}else if(keyCode === 38 && !woody.isJump && !woody.isRunJumpAttack){
			woody.startJump();
		}else if(keyCode === 74 && !woody.isAttack && !woody.isJump){
			woody.startAttack();
		}else if(keyCode === 75 && !woody.isAttack && !woody.isJump){
			woody.startAttack(3);
		}else if(keyCode === 73 && !woody.isJump && !woody.isRunJumpAttack){
			woody.startRunJumpAttack();
		}else if(keyCode === 76 && !woody.isJump){
			woody.startAttack();
			var fireBarrage = new cls.FireBarrage();
			fireBarrage.x = woody.x;
			fireBarrage.y = woody.y;
			if(fireBarrage.arraw !== woody.arraw){
				fireBarrage.changeArraw();
			}
			container.addChild(fireBarrage);
			fireBarrage.startRun(fireBarrage.moveSpeedX,0);
		}
	}


	window.addEventListener('keydown',keyDown);

	window.addEventListener('keyup',keyUp);

}