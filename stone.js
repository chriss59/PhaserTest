var StoneText = {};

var Stone = {};
var Stones = parseInt("0");

//Stone Text
StoneText.createStone = function(game) {
    var stein = game.add.text(1175, 790, "Stone", {
        font: "32px Arial",
        fill: "#ffffff",
        align: "center"
    })

    return stein;
    
}

Stone.createStone = function(game) {
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

}