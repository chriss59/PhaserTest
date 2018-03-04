var Torch = {};

Torch.createTorch = function(game) {
    var torch = game.add.sprite(1300, 900, 'torch');

    //  Here we add a new animation called 'walk'
    //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'mummy' sprite sheet
    var walk = torch.animations.add('walk');

    //  And this starts the animation playing by using its key ("walk")
    //  30 is the frame rate (30fps)
    //  true means it will loop when it finishes
    torch.animations.play('walk', 9, true);

    return torch;
    
}