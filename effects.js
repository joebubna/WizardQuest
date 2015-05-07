/**
 * Wizard Quest
 * Josiah Bubna
 * ID: 969559402
 * CS: 313 AI and Game Design
 * Fall 2012
 */
 
 // JDB: Original Code Begin

Crafty.c("RandomExplosion",{
    init:function(){
        var rand = Crafty.math.randomInt(1,3);
        this.addComponent("2D","Canvas","explosion"+rand,"SpriteAnimation")
        .animate("explode1",0,0,16)
        .animate("explode2",0,1,16)
        .animate("explode3",0,2,16)      
        .animate("explode"+rand,10,0)
        .bind("AnimationEnd",function(){
            this.destroy();
        });
        
        Crafty.audio.play("explosion_"+Crafty.math.randomInt(0,1),1,0.5);
    }
});

Crafty.c("Flicker",{   
   flicker:true,
   
   init:function(){
       this.flicker = true;
      
       this.bind("EnterFrame",function(frame){
           if(frame.frame % 5 == 0 && this.flicker) {
               if( this.alpha == 0.0 )
                   this.alpha = 1.0;
               else
                   this.alpha = 0.0;
           }
           if(!this.flicker)
                this.alpha = 1.0;
       });
   }
   
});

// JDB: Original Code End