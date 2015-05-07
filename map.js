/**
 * Wizard Quest
 * Josiah Bubna
 * ID: 969559402
 * CS: 313 AI and Game Design
 * Fall 2012
 */
 
  // JDB: Original Code Begin


// A mapsquare object.
function mapSquare(terrain, solid, sx, sy) {
	this.terrain = terrain;
	this.solid = solid;
	this.x = sx;
	this.y = sy;
	this.adj = new Array(8);
}

// Map class
function Map() {

	// Some map settings.
	this.mapWidth = null;
	this.mapHeight = null;
	this.tileWidth = 128;
	this.tileHeight = 128;
	this.map = new Array(this.mapWidth);

	// Turn the sprite map into usable components
	Crafty.sprite(128, "img/FloorTiles2.png", {
		grass1: [0,0],
		spawn1: [1,0],
		block1: [2,0],
		block2: [3,0],
		block3: [4,0],
		graniteTile: [2,1],
		stone1: [0,2],
		cobble1: [2,3],
		bush: [4,4]
	});

} // END Map object


// Get map grid position based off canvas x,y coordinates and the width and height of the object image.
Map.prototype.getPos = function(x,y,w,h) {
	
	var col = Math.floor( (x + w/2) / this.tileWidth );
	var row = Math.floor( (y + h/2) / this.tileHeight );
	
	return this.map[col][row];
	
}


// Draw the map to the screen.
Map.prototype.draw = function() {
	
	// Turn background black
	Crafty.background("black");
	
	
	// Draw Map
	for(var i = 0; i < this.mapWidth; i++) {
		for(var j = 0; j < this.mapHeight; j++) {
			Crafty.e("2D, Canvas, Collision,"+this.map[i][j].terrain+","+this.map[i][j].solid).attr({x: i * this.tileWidth, y: j * this.tileHeight})
			.collision([0,0],[this.tileWidth,0],[this.tileWidth,this.tileHeight],[0,this.tileHeight]);
		}
	}
	
	
	// Draw Border Top
	for(var i = 0; i < this.mapWidth+2; i++) {
		Crafty.e("2D, Canvas, stone1, solid").attr({x: (i * this.tileWidth)-this.tileWidth, y: 0-this.tileHeight});
	}
	
	// Draw Bottom Border
	for(var i = 0; i < this.mapWidth+2; i++) {
		Crafty.e("2D, Canvas, stone1, solid").attr({x: (i * this.tileWidth)-this.tileWidth, y: (this.mapHeight * this.tileHeight)});
	}
	
	// Draw Left Border
	for(var i = 0; i < this.mapHeight; i++) {
		Crafty.e("2D, Canvas, stone1, solid").attr({x: 0-this.tileWidth, y: (i)*this.tileHeight});
	}
	
	// Draw Right Border
	for(var i = 0; i < this.mapHeight; i++) {
		Crafty.e("2D, Canvas, stone1, solid").attr({x: (this.mapWidth*this.tileWidth), y: (i)*this.tileHeight});
	}
	
	
}


// Load a map from a tab delimited text file.
Map.prototype.load = function(file, callback) {
		
	var result = null;
	
	$.ajax({
		url: file,
		type: 'get',
		async: false,
		success: function(data) {
		
			var row = data.split("\n");
			var colZero = row[0].split("\t");
			var map = new Array(colZero.length);
			
			var col = [];
			for (var j = 0; j < row.length; j++) {
				col[j] = row[j].split("\t");
			}
				
			for (var i = 0; i < col.length; i++) {
				map[i] = new Array(row.length);
				for (var j = 0; j < row.length; j++) {					
					if (col[j][i])
						map[i][j] = new mapSquare('graniteTile', 0, i, j);
					else
						map[i][j] = new mapSquare('stone1', 'solid', i, j);
				}
			}
			result = map;			
		}
	});
	
	this.map = result;
	this.mapWidth = this.map.length;
	this.mapHeight = this.map[0].length;
	
} // END Map.load()


// Generate a map (Only used for testing)
Map.prototype.generate = function() {
	for(var i = 0; i < this.mapWidth; i++) {
		this.map[i] = new Array(this.mapHeight);
		for(var j = 0; j < this.mapHeight; j++) {
			this.map[i][j] = new mapSquare('graniteTile', 0);
		}
	}
}

// JDB: Original Code End

