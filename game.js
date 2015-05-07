$(function(){

    //Init Crafty
    Crafty.init(900,700);
    Crafty.canvas.init();
    
	//Set canvas under interface
    Crafty.canvas._canvas.style.zIndex = '1';
    
    //play the loading scene
    Crafty.scene("Loading");
	
});

