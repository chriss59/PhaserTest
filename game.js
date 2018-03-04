var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update/*, render: render*/});

function preload() {

    game.add.text(250, 250, "Loading Game...", {font: "65px Arial", fill: "#ff0044"});

	game.load.image("Player", "img/offroader78.png");
	game.load.image("Stone", "img/Stone_32x32.png");
    game.load.tilemap('world', 'TiledMaps/World1-1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'TiledMaps/TileSet.png');
    game.load.image('trees', 'TiledMaps/green trees.png');
    game.load.image('menu', 'img/number-buttons-90x90.png', 270, 180); //Pause Menu
    game.load.audio('Music', 'Audio/BackgroundMusic.mp3');
    game.load.spritesheet('torch', 'img/animated_torch.png', 32, 64, 9);

}

var map;
var worldLayer;
var treesLayer;
var p;
var cursors;
var w = 800, h = 600; //Pause Menu

function create() {

	console.log("Fertig mit laden!");

	//Music = game.add.audio('Music');
	//Music.loopFull()

    game.world.setBounds(0, 0, 800, 600);
    game.stage.backgroundColor = '#787878';

    game.physics.startSystem(Phaser.Physics.ARCADE);


    map = game.add.tilemap('world');
    map.addTilesetImage('TileSet', 'tiles');
    map.addTilesetImage('green trees', 'trees');
	
	//**** You were using the wrong tile index. 21 is for the stone. ****
	
	worldLayer = map.createLayer('World');
    treesLayer = map.createLayer('Trees');
    var collision = [168, 172, 77, 78, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
    map.setCollision(collision, true, 'Trees');
    map.setCollision(collision, true, 'World');
    
    worldLayer.resizeWorld();
    worldLayer.wrap = true;
    treesLayer.wrap = true
    cursors = game.input.keyboard.createCursorKeys();

    StoneText.createStone(game);
    Stone.createStone(game);
    Torch.createTorch(game);
	TextBox.createTextBox(game);

    this.player = game.add.sprite(1200, 800, "Player");
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    game.physics.enable(this.player);

    this.btnUP = game.input.keyboard.addKey(Phaser.Keyboard.W);
	this.btnDOWN = game.input.keyboard.addKey(Phaser.Keyboard.S);
	this.btnLEFT = game.input.keyboard.addKey(Phaser.Keyboard.A);
	this.btnRIGHT = game.input.keyboard.addKey(Phaser.Keyboard.D);
	this.btnX = game.input.keyboard.addKey(Phaser.Keyboard.X);
    game.camera.follow(this.player);

    var t = game.add.text(200, 500, "Stones:" + Stones, { font: "32px Arial", fill: "#ffffff", align: "center" });
    t.fixedToCamera = true;
    t.cameraOffset.setTo(200, 500);

    game.physics.arcade.collide(this.player, Stone.createStone(game));

    // Pause menu
    // Create a label to use as a button
    pause_label = game.add.text(w - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
    pause_label.fixedToCamera = true;
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(function () {
    // When the paus button is pressed, we pause the game
    game.paused = true;

    // Then add the menu
    menu = game.add.sprite(200, 200, 'menu');
    menu.fixedToCamera = true;

    // And a label to illustrate which menu item was chosen. (This is not necessary)
    choiseLabel = game.add.text(200, 200, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
    choiseLabel.fixedToCamera = true;
});

    // Add a input listener that can help us return from being paused
    game.input.onDown.add(unpause, self);

    // And finally the method that handels the pause menu
    console.log("Fertig mit erstellen!");

}

function update() {
	
	//**** You can do checks for which keys are pressed, and set the velocity in that direction. ****

    /*if (cursors.left.isDown)
    {
	this.player.body.velocity.x = 70;
    }
	if (cursors.right.isDown)
    {
    this.player.body.velocity.y = 80;
    }*/

	//**** You don't need to do `this.player.y = this.player.y + 10;`.
	//**** You can use the += operator to add things to an existing value easily.
	// Reset the player velocity, so it won't have any velocity unless one of the keys is down.
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;

    //Stone.body.velocity.x = 0;
    //Stone.body.velocity.y = 0;

    // Check if any of the keys are down, if so, then set the velocity in that direction.
    if (this.btnUP.isDown) this.player.body.velocity.y = -150;
    if (this.btnDOWN.isDown) this.player.body.velocity.y = 150;
    if (this.btnLEFT.isDown) this.player.body.velocity.x = -150;
    if (this.btnRIGHT.isDown) this.player.body.velocity.x = 150;
	
	//**** It is recommended to do the collide check at the end after the velocities have been set above. ****
	game.physics.arcade.collide(this.player, worldLayer);
    game.physics.arcade.collide(this.player, treesLayer);
    game.world.wrap(this.player, 0, true);
}

/* function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(this.player, 32, 550);
    game.debug.text("Test v.0.0.1", 650, 32);
    game.debug.body(this.player);
}*/

// Pause menu
function unpause(event){

        // Only act if paused
        /*if(game.paused){
            // Calculate the corners of the menu
            var x1 = w/2 - 270/2, x2 = w/2 + 270/2,
            y1 = h/2 - 180/2, y2 = h/2 + 180/2;

             Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                The choicemap is an array that will help us see which item was clicked
                var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];
                choisemap.fixedToCamera = true;

                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

                // Calculate the choice 
                var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);

                // Display the choice
                choiseLabel.text = 'You chose menu item: ' + choisemap[choise];
                choiseLabel.fixedToCamera = true;
            }
            else{
                // Remove the menu and the label
                menu.destroy();
                choiseLabel.destroy();

                // Unpause the game
                game.paused = false
            }
            
        }*/
    }
