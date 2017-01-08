//init 初始化

var canvas,stage,container,preloadTxt,images={};
var w = window.innerWidth || document.documentElement.clientWidth;
var h = window.innerHeight || document.documentElement.clientHeight;

function init(){
	canvas = document.getElementById('view');
	canvas.width = w;
	canvas.height = h;
	stage = new createjs.Stage(canvas);
	container = new createjs.Container();
	stage.addChild(container);
	createjs.Touch.enable(stage);

	//预加载进度
	preloadTxt = new createjs.Text();
	preloadTxt.text = '0%';
	preloadTxt.color = '#fff';
	preloadTxt.font = 'bold 30px Arial';
	preloadTxt.x = w/2;
	preloadTxt.y = h/2;
	preloadTxt.textAlign = 'center';
	preloadTxt.textBaseline = 'middle';
	stage.addChild(preloadTxt);

	var loader = new createjs.LoadQueue(false);
	loader.addEventListener('fileload',fileloadHandler);
	loader.addEventListener('progress',progressHandler);
	loader.addEventListener('complete',completeHandler);
	loader.loadManifest([
		{src:"assets/woody_0.png", id:"woody_0"},
        {src:"assets/woody_1.png", id:"woody_1"},
        {src:"assets/woody_2.png", id:"woody_2"},
        {src:"assets/freeze_0.png", id:"freeze_0"},
        {src:"assets/freeze_1.png", id:"freeze_1"},
        {src:"assets/freeze_2.png", id:"freeze_2"},
        {src:"assets/fireBarrage.png", id:"fireBarrage"},
        {src:"assets/iceBarrage.png", id:"iceBarrage"}
	]);

	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener('tick',stageBreakHandler);
	
}

//刷新舞台
function stageBreakHandler(){
	stage.update();
	// var pt = woody.localToLocal(woody.x,woody.y,woody);
	// console.log(woody.x,woody.y,pt.x,pt.y,stage.mouseX,stage.mouseY);
	// var hit = woody.hitTest(stage.mouseX,stage.mouseY);
	// if(hit){
	// 	console.log(hit);
	// }
	
}


//加载资源前
function fileloadHandler(event){
	if(event.item.type === 'image'){
		images[event.item.id] = event.result;
	}
}

//加载资源过程
function progressHandler(event){
	preloadTxt.text = Math.floor(event.progress*100) + '%';
}

//加载资源完成
function completeHandler(event){
	event.currentTarget.removeEventListener('fileload',fileloadHandler);
	event.currentTarget.removeEventListener('progress',progressHandler);
	event.currentTarget.removeEventListener('complete',completeHandler);

	stage.removeChild(preloadTxt);

	freeze = new cls.Freeze();
	freeze.x = 100;
	freeze.y = h/2;
	container.addChild(freeze);

	woody = new cls.Woody();
	woody.x = w-100;
	woody.y = h/2;
	woody.changeArraw();
	container.addChild(woody);

	freeze.startRun(freeze.runSpeedX,0);
	setTimeout(function(){freeze.startDecelerate();},1000);
	setTimeout(function(){freeze.startAttack();},1500);
	setTimeout(function(){freeze.startAttack(3);},2000);

	woody.startRun(-woody.runSpeedX,0);
	setTimeout(function(){woody.startDecelerate();},1000);
	setTimeout(function(){woody.startAttack();},1500);
	setTimeout(function(){woody.startAttack(3);},2000);


	setTimeout(function(){bindEvent();},2000);

	


}
