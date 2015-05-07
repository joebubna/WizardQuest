/**
 * Wizard Quest
 * Josiah Bubna
 * ID: 969559402
 * CS: 313 AI and Game Design
 * Fall 2012
 */
 
  // JDB: Original Code Begin

// Sounds
Crafty.audio.add({
    fireball_1: [game_path + "sounds/fireball_1.mp3"],
	fireball_2: [game_path + "sounds/fireball_2.mp3"],
	explosion_1: [game_path + "sounds/explosion_1.mp3"],
	explosion_2: [game_path + "sounds/explosion_2.mp3"],
	laser_1: [game_path + "sounds/laser_1.mp3"],
	shield_1: [game_path + "sounds/shield_1.mp3"],
	beam_1: [game_path + "sounds/beam_1.mp3"],
	footsteps: [game_path + "sounds/footsteps_forest.mp3"],
	gameover: [game_path + "sounds/gameover.mp3"]
});


// Songs
Crafty.audio.add({
	intro: [game_path + "music/intro.mp3"],
	song1: [game_path + "music/song1.mp3"],
	song2: [game_path + "music/song2.mp3"],
	song3: [game_path + "music/song3.mp3"],
	song4: [game_path + "music/song4.mp3"]
});


function playMusic() {
	
	var curSong = 1
	var nextSong = function()
	{
		// Reset to first song if the last just ended.
		if (curSong == 4){
			curSong = 1
		}
		
		// Set song to be played.
		var song = "song"+curSong
		
		// Play song.
		Crafty.audio.play(song, 1, 0.3);
		
		// Increment song counter.
		curSong++;
	}
	// Event listeners for the end of the songs.
	Crafty.audio.sounds.song1.obj.addEventListener("ended", function(){  nextSong();  },true);
	Crafty.audio.sounds.song2.obj.addEventListener("ended", function(){  nextSong();  },true);
	Crafty.audio.sounds.song3.obj.addEventListener("ended", function(){  nextSong();  },true);
	Crafty.audio.sounds.song4.obj.addEventListener("ended", function(){  nextSong();  },true);
	
	// Initial song play
	nextSong();
	
} // END playMusic()

// JDB: Original Code End