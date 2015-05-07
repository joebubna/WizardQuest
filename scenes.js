/**
 * Wizard Quest
 * Josiah Bubna
 * ID: 969559402
 * CS: 313 AI and Game Design
 * Fall 2012
 */
 
  // JDB: Original Code Begin

 Crafty.scene("Loading",function(){
	
	//Background image
    Crafty.background("url("+game_path+"img/title.jpg) black");
    
    //Select DOM elements
    var bar = $('#load');
    var button = $('.button');
    var text = bar.find('.text');
    
	// Hide default interface.
    $('#interface').hide();
    
	//Setup progressbar
    text.text("Loading ...");
    bar.progressbar({
        value:0
    });
    
	// Bind Play Game button to load the first level.
    button.live('click',function(){
        
		//Start scene level 1
        Crafty.scene("Level1");  
    
	});
	
	// Fadeout Loading bar, present play game button.
	bar.fadeOut(1000,function(){
        button.show();
	});

	// Play intro music.
    //Crafty.audio.play("intro",-1);
	
 },
// Upon leaving loading scene...
function(){
    
	// Stop playing loading music.
	Crafty.audio.stop();
    
	// Hide loading interface.
    $('#loading').hide();
	
});


//Level 1 Scene
Crafty.scene("Level1",function(){
    
	//Display interface
    $('#interface').show();
	
	// Create player.
	player = Crafty.e("2D, Canvas, Player");
	
	// Sets whether or not mouselook allows viewing of areas without entities.
    Crafty.viewport.clampToEntities = false;
	
	// Sets the viewable screen area to follow the player.
    Crafty.viewport.follow(player, 0, 0);
	
	// Sets whether the user can look around the map with the mouse.
	Crafty.viewport.mouselook(true);
	
	// Setup map
	map = new Map();
	map.load("maps/map2.txt");
	map.draw();

    // Use Jquery to grab handles on the UI elements.
    var bars = {
        hp:$('#hp'),
        mana:$('#mana'),
        shield:$('#shield')
    };
    bars.hp.addClass('green');
    bars.mana.addClass('blue');
    
    var ui = {
        lives :$('.lives'),
        score: $('.score'),
        hp:bars.hp.find('.text'),
        mana:bars.mana.find('.text'),
        //shield:bars.shield.find('.text'),
        alert:$('.alert')
    }
	Crafty.trigger("UpdateStats");

    //Bind UpdateStats Event
    Crafty.bind("UpdateStats",function(){
        
		// Calculate percents.
        player.mana.percent = Math.round( player.mana.current / player.mana.max * 100 );
        player.hp.percent = Math.round( player.hp.current / player.hp.max * 100 );
       
        //display the values
        ui.mana.text('Mana: '+player.mana.current+ '/'+player.mana.max);
        ui.hp.text('HP: '+player.hp.current+ '/'+player.hp.max);
        ui.score.text("Score: "+player.score);
        ui.lives.text("Lives: "+player.lives);
        
        // Using Jquery progressbar() method to update UI bars. 
        bars.mana.progressbar({
            value:player.mana.percent
        });
        
		bars.hp.progressbar({
            value:player.hp.percent
        });


    });
    //Bind global Event Show Text
    Crafty.bind("ShowText",function(text) {
        ui.alert.text(text).show().effect('pulsate',500)
    });
	//Bind global Event Show Text
    Crafty.bind("FlashText",function(text) {
        ui.alert.text(text).effect('pulsate', {times:5, mode:"hide"}, 1000)
    });
    Crafty.bind("HideText",function(){
        ui.alert.text("").hide(); 
    });
    //Global Event for Game Over
    Crafty.bind("GameOver",function(score) {
        Crafty.trigger("ShowText","Game Over!");
        Crafty.audio.stop();
        Crafty.audio.play("gameover", 1);
            
    });
	//Global Event for Game Over
    Crafty.bind("GameWin", function(score) {
        Crafty.trigger("ShowText","You Win!");
        Crafty.audio.stop();
        Crafty.audio.play("intro", 1);
        Crafty.stop();    
    });
	
	//enemy = Crafty.e("Enemy1").attr({x: 1996, y: 144, w: 96, h: 96, z: 1});

	enemy = Crafty.e("Enemy1").attr({x: 1996, y: 144});
	princess = Crafty.e("Princess").attr({x: 1930, y: 890, w: 96, h: 96, z: 1});
	
	// Tell the player the objective
	Crafty.trigger("FlashText","Find the princess!");
	
	playMusic();
  
});

// JDB: Original Code End

