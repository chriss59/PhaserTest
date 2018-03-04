var TextBox = {};

//var Stone = {};
//var Stones = parseInt("0");

//Stone Text
TextBox.createTextBox = function(game) {
    var haiku = "Hey!\nThis is a simple\nTest TextBox";
    var text = game.add.text(100, 64, haiku, {
        font: "32px Arial",
        fill: "#ffffff",
        backgroundColor: 'rgba(0,255,0,0.25)'
    })
        text.lineSpacing = -20;

    return text;
    
}

/*Stone.createStone = function(game) {
	var Stone = game.add.sprite(1200, 750, "Stone");
    game.physics.enable(Stone);
    Stone.body.moves = false;
    Stone.inputEnabled = true;

    Stone.events.onInputUp.add(function () {
    	console.log("StoneTest");
    	if (Stones == 3) {
    	console.log("You have 3 Stones!");
    	Stone.destroy();
		} else { 
    	console.log("You need 3 Stones!");
    	Stones=Stones + 1;
		}
	})

	return Stone;
	return Stones;

}*/