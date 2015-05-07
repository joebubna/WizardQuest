/**
 * Wizard Quest
 * Josiah Bubna
 * ID: 969559402
 * CS: 313 AI and Game Design
 * Fall 2012
 */
 
  // JDB: Original Code Begin

Crafty.c("Bullet",{
    dmg:0,
    firerate:0,
    init:function(){
        this.addComponent("2D","Canvas","Collision")
        .onHit("solid",function(ent){
            this.destroy();
        })
		.onHit("enemy",function(ent){
            this.destroy();
            ent[0].obj.destroy();
        });
    } 
});

Crafty.c("Weapon1",{
    init:function(){
        this
        .addComponent("Bullet","laser1")
        .origin("center")
        .bind("EnterFrame", function() {
            this.x += this.xspeed;
            this.y -= this.yspeed; 
        })
        .attr({
            dmg: 50
        });
        Crafty.audio.play("fireball_2",1,0.8);
    } 
});

// JDB: Original Code End