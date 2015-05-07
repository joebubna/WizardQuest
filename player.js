/**
 * Wizard Quest
 * Josiah Bubna
 * ID: 969559402
 * CS: 313 AI and Game Design
 * Fall 2012
 */
 
  // JDB: Original Code Begin

Crafty.c("Player",{
    hp:{
        current:100,
        max:100,
        percent:100
    },
	mana: {
		current:100,
		max:100,
		percent:100
    },
    movementSpeed:5,
    lives:2,
    score:0,
	stunned: 100,
    weapon: {
        firerate: 15,	// Larger numbers mean slower firerates.
        name: "Weapon1",
        depleted: false
    },
    powerups:{},
    bars:{},
    ui:{},
	playerLastDir: false,
	
    init:function(){
     
        var stage = $('#cr-stage');
        var attacking = false;
        this.requires("2D, Canvas, wizard, Keyboard, Flicker, SpriteAnimation, MultiWay, Collision") // WiredHitBox
        
		// Player starting position.
		.attr({x: 896, y: 144, w: 96, h: 96, z: 1})
		
		// Set player hitbox area.
		.collision(new Crafty.polygon([25,40],[25,75],[70,75],[70,40]))
		
		// Player animations setup
		.animate("walk_left", [[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3]])
		.animate("walk_right", [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]])
		.animate("walk_up", [[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1]])
		.animate("walk_down", [[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2]])
		.animate("stand_left", [[1,4]])
		.animate("stand_right", [[3,4]])
		.animate("stand_up", [[2,4]])
		.animate("stand_down", [[0,4]])
		
		// Player movement.
		.bind("EnterFrame", function()
		{
			//var ms = map.getPos(this._x,this._y,96,96);
			//Crafty.trigger("ShowText", ms.x);
			if (this.isDown('LEFT_ARROW')) {
				this.x = player.x - this.movementSpeed;  
				this.playerLastDir = 'left';
				if (!this.isPlaying("walk_left"))
					this.stop().animate("walk_left", 17);
				Crafty.audio.play("footsteps", -1);
			}
			else if (this.isDown('RIGHT_ARROW')) {
				this.x = player.x + this.movementSpeed;    
				this.playerLastDir = 'right';
				if(!this.isPlaying("walk_right"))
					this.stop().animate("walk_right", 17);
				Crafty.audio.play("footsteps", -1);
			}
			else if (this.isDown('UP_ARROW')) {
				this.y = player.y - this.movementSpeed; 
				this.playerLastDir = 'up';
				if(!this.isPlaying("walk_up"))
					this.stop().animate("walk_up", 17);
				Crafty.audio.play("footsteps", -1);
			}
			else if (this.isDown('DOWN_ARROW')) {
				this.y = player.y + this.movementSpeed;
				this.playerLastDir = 'down';
				if(!this.isPlaying("walk_down"))
					this.stop().animate("walk_down", 17);
				Crafty.audio.play("footsteps", -1);
			}
			
			// Check if the player is stunned. If not, then stop any flickering.
			if(this.stunned){
                this.stunned--;
                if(this.stunned == 0){
                    this.flicker=false;
                  
                }
            }
		})
		
		// When a player stops moving, return their animation to the correct standing position, based on the direction they were last heading.
		.bind("KeyUp", function(e) {
			this.stop();
			Crafty.audio.stop("footsteps");
			if (this.playerLastDir == 'left')
				this.stop().animate("stand_left", 10);
			else if (this.playerLastDir == 'right')
				this.stop().animate("stand_right", 10);
			else if (this.playerLastDir == 'up')
				this.stop().animate("stand_up", 10);
			else if (this.playerLastDir == 'down')
				this.stop().animate("stand_down", 10);
		})
		
		// If the player runs into a solid object, move them back to their previous location.
		.onHit("solid", function(e) {
			if (this.playerLastDir == 'left')
				this.x += this.movementSpeed;
			else if (this.playerLastDir == 'right')
				this.x -= this.movementSpeed;
			else if (this.playerLastDir == 'up')
				this.y += this.movementSpeed;
			else if (this.playerLastDir == 'down')
				this.y -= this.movementSpeed;
		})
		
		// Attacking stuff
        .bind("KeyDown", function(e) {
            if(e.keyCode === Crafty.keys.SPACE){
                attacking = true;
            } 
        })
        .bind("KeyUp", function(e) {
            if(e.keyCode === Crafty.keys.SPACE){
                attacking = false;
            } 
        })
        .bind("EnterFrame",function(frame){
            if(frame.frame % this.weapon.firerate == 0){
               
                if (attacking && !this.weapon.depleted)
                    this.shoot();
				else
				{
                    // If below full mana, regen some.
					if( this.mana.current < 100 )
                        this.mana.current = this.mana.current + 2; 
                }

                Crafty.trigger("UpdateStats");
                
                if(this.weapon.depleted && this.mana.percent > 10){
                    this.weapon.depleted = false;
                    Crafty.trigger("HideText");
                }
                    
            }           
        })
		
		/////////////////////////////////
		// Events
		/////////////////////////////////
		
		// When this player kills something.
        .bind("Killed",function(points){
            this.score += points;
            Crafty.trigger("UpdateStats");
        })
		
		// When the player gets hurt.
        .bind("Hurt",function(dmg){
            
			// If player is invulnerable, do nothing.
			if(this.flicker) return;
			
			// Hurt the player
            this.hp.current -= dmg;
            
			// Update Stats
            Crafty.trigger("UpdateStats");
			
			// Kill player if no HP left.
            if( this.hp.current <= 0 ) 
				this.die();
			
        })
		
		// When hit by an enemy projectile.
        .onHit("EnemyBullet",function(ent) {
            
			var bullet = ent[0].obj;
            this.trigger("Hurt",bullet.dmg);
            bullet.destroy();
			
        })

        return this;
    },  // END init()
	
	// Reset player to default values.
	resetPlayer:function() {
		
		this.hp = {
			current:100,
			max:100,
			percent:100
		};
		this.mana = {
			current:100,
			max:100,
			percent:100
		};
		this.stunned = 100;
		this.flicker = true;
		
		// Update UI
        Crafty.trigger("UpdateStats");
    },
	
	// Shoot
    shoot:function(){ 
        
		// Create projectile
        var bullet = Crafty.e(this.weapon.name,"PlayerBullet");
		
		// Figure out projectile direction (graphic rotation)
		var bulletRotation = 0;
		if (this.playerLastDir == 'left')
			bulletRotation = 270;
		else if (this.playerLastDir == 'right')
			bulletRotation = 90;
		else if (this.playerLastDir == 'up')
			bulletRotation = 0;
		else if (this.playerLastDir == 'down')
			bulletRotation = 180;
				
		// Set projectile attributes.
        bullet.attr({
            
			// Just identifying the owner.
			playerID:this[0],
            
			// Setting the position on the screen the bullet starts at. 
			// Takes into account the width/height of the player model and the width/height of the bullet graphic.
			x: this._x + this._w/2 - bullet.w/2,
            y: this._y + this._h/2 - bullet.h/2,
            
			
			rotation: bulletRotation,
            xspeed: 20 * Math.sin(bulletRotation / (180 / Math.PI)),
            yspeed: 20 * Math.cos(bulletRotation / (180 / Math.PI))
        }); 
		
		// Reduce the players mana for the shot.
        if( this.mana.current > 0 )
            this.mana.current -= 10;
         
		// If the player is too low on mana, tell them and deplete the weapon.
        if(this.mana.current <= 10) {
            Crafty.trigger("ShowText", "Out of mana!");
            this.weapon.depleted = true;
        }
           
    }, // END shoot()
	
	// If the player dies.
    die:function() {
        
		// Create an explosion at the player's location.
		Crafty.e("RandomExplosion").attr({
            x: this._x,
            y: this._y
        });
		
		// Reduce lives.
        this.lives--;
		
		// Update UI
        Crafty.trigger("UpdateStats");
        
		// If no lives left, end game.
		if ( this.lives <= 0 ) {
            this.destroy();
            Crafty.trigger("GameOver", this.score);
        }
		else
			this.resetPlayer();
        
    } // END die()
    
});

// JDB: Original Code End
