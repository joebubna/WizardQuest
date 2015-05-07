/**
 * Wizard Quest
 * Josiah Bubna
 * ID: 969559402
 * CS: 313 AI and Game Design
 * Fall 2012
 */
 
  // JDB: Original Code Begin


Crafty.c("Enemy",{
    
	playerID:null, // Can set this to a player's ID (to calculate kill points, etc)
	
	init:function(){
        this.requires("2D, Canvas, Collision, Tint")  
		
        
        // When hit by a PlayerBullet
        .onHit("PlayerBullet", function(ent) {
            
			// Set bullet to the entity that hit.
			var bullet = ent[0].obj;
			
			// Which player owned the bullet?
            this.playerID = bullet.playerID;
			
			// Stun the enemy
			this.stunned = 100;
			this.tint("#FFFF33", 0.7);
			
			// Trigger Hurt event on this enemy.
            this.trigger("Hurt", bullet.dmg);
			
			// Destroy bullet.
            bullet.destroy();
			
        })
		
        // What happens when the player collides with this enemy.
        .onHit("Player", function(ent) {
            
			// Grab player object.
			var player = ent[0].obj;
            
			// Hurt the player with my hp
            Crafty(player[0]).trigger("Hurt", this.damage);

        })
		
		
        // What to do when a Hurt event is triggered on this enemy.
        .bind("Hurt", function(dmg) {
			
            // Reduce HP
            this.hp -= dmg;
			
            // Kill enemy if health gets to zero.
            if (this.hp <= 0) 
				this.trigger("Die");
				
        })
		
		// Die event
        .bind("Die",function(){
            
			// Generate a random explosion at the enemy's position.
            Crafty.e("RandomExplosion").attr({
                // Center the explosions in middle of unit hitbox.
				x: this._x - (this._w/2)-10,
                y: this._y - (this._h/2)+40,
				z: 2
            });
			
            // Calculate points for the player.
            Crafty(this.playerID).trigger("Killed",this.points);
            
			//Destroy the enemy.
            this.destroy();

        });
    }
});

Crafty.c("Enemy1",{
    hp: 1000, 
	damage: 1,
	intelligence: 1,
	movementSpeed: 3,
	points: 5,
	stunned: 0,
	
    init:function() {
        var player = Crafty("Player");
        var x = 0;
        this.addComponent("Enemy, ghostg, MultiWay, SpriteAnimation, Tint, WiredHitBox")
        
		.collision(new Crafty.polygon([18,20],[18,60],[48,60],[48,20]))
        
		// Enemy starting position (should be overridden by the scene!).
		.attr({x: 1796, y: 344, w: 64, h: 64, z: 1})
		.tint('#FFFFFF', 0.0)


        .bind("EnterFrame",function(frame){
            
			// Grab the first object of type player from the Crafty engine (aka, our Player).
			player = Crafty(player[0]);
            
			if (this.stunned > 1)
				this.stunned--;
			else if (this.stunned > 0)
			{
				this.stunned--;
				this.tint("#969696", 0);
			}
			else
			{
				
				// Movement logic
				if (player._x+24 > this._x)
					this.x += this.movementSpeed;
				if (player._x+24 < this._x)
					this.x -= this.movementSpeed;
					
				
				if (player._y+18 > this._y)
					this.y += this.movementSpeed;
				if (player._y+18 < this._y)
					this.y -= this.movementSpeed;
				
			} // END if not stunned.
			
        })
		
    }
});

Crafty.c("Enemy2",{
    hp: 100,
    points:5,
	movementSpeed: 5,
	
    init:function() {
        var player = Crafty("Player");
        var x = 0;
        this.addComponent("Enemy, wizard, MultiWay, SpriteAnimation")
        
        
		// Enemy starting position.
		.attr({x: 1796, y: 344, w: 96, h: 96, z: 1})

        .bind("EnterFrame",function(frame){
            
			// Grab the first object of type player from the Crafty engine (aka, our Player).
			player = Crafty(player[0]);
            
			
			// Movement logic
			if (player._x > this._x)
				this.x += this.movementSpeed;
			if (player._x < this._x)
				this.x -= this.movementSpeed;
				
			
			if (player._y > this._y)
				this.y += this.movementSpeed;
			if (player._y < this._y)
				this.y -= this.movementSpeed;
			
        })
		
    }
});


Crafty.c("Princess",{
	
	init:function(){
        this.requires("2D, Canvas, Collision, princess")  
		
		.collision(new Crafty.polygon([25,40],[25,75],[70,75],[70,40]))
		
        .onHit("Player", function(ent) {
            
			// Grab player object.
			var player = ent[0].obj;
			
			// Trigger game win event.
            Crafty.trigger("GameWin", player.score);
			
        })
		
    }
});

// JDB: Original Code End
