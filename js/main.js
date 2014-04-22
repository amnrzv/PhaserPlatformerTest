var game = new Phaser.Game(1280, 640, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
	game.load.tilemap('map', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);

	game.load.image('ground', 'assets/super_mario.png');
	game.load.spritesheet('mw', 'assets/mario_walk.png', 18, 16, 8);
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	map = game.add.tilemap('map');
	map.addTilesetImage('super_mario', 'ground');

	map.setCollisionBetween(15, 16);
    map.setCollisionBetween(20, 25);
    map.setCollisionBetween(27, 29);
	map.setCollision(40);
	layer = map.createLayer('World1');
	layer.resizeWorld();

	mario = game.add.sprite(40, 550, 'mw', 4);
	mario.animations.add('walkright', [4,5,6,7], 10000);
	mario.animations.add('walkleft', [0,1,2,3]);
	mario.velocityMultiplier = 1;
	mario.jumpMultiplier = 1;
	mario.maxVelocityX = 100;

	//mario.animations.play('walk', 15, true);
	game.physics.enable(mario);

	game.physics.arcade.gravity.y = 500;

    //mario.body.bounce.y = 0.2;
    //mario.body.linearDamping = 1;
    //mario.body.collideWorldBounds = true;
    
    game.camera.follow(mario);

    cursors = game.input.keyboard.createCursorKeys();
    runKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
}

function update() {
	game.physics.arcade.collide(mario, layer);

	if (mario.body.velocity.x == undefined)
	{
		mario.body.velocity.x = 0;
	}    

    if (runKey.isDown)
    {
    	mario.velocityMultiplier = 1.05;
    	mario.jumpMultiplier = 1.1;
    	mario.maxVelocityX = 180;
    }
    else if (runKey.isUp)
    {
    	mario.velocityMultiplier = 1;
    	mario.jumpMultiplier = 1;
    	mario.maxVelocityX = 100;
    }

    if (cursors.up.isDown)
    {
        if (mario.body.onFloor())
        {
            mario.body.velocity.y = -250 * mario.jumpMultiplier;
        }
    }
    if (cursors.left.isDown)
    {
    	mario.direction == -1 ? mario.body.velocity.x -= 4 : mario.body.velocity.x -= .5;
        mario.body.velocity.x *= mario.velocityMultiplier;
        if (Math.abs (mario.body.velocity.x) > mario.maxVelocityX)
        {
        	mario.body.velocity.x = -1 * mario.maxVelocityX;
        }
        mario.animations.play('walkleft', 12, false);
        mario.direction = -1;
    }
    if (cursors.right.isDown)
    {
        mario.direction == 1 ? mario.body.velocity.x += 4 : mario.body.velocity.x += .5;
        mario.body.velocity.x *= mario.velocityMultiplier;
        if (Math.abs (mario.body.velocity.x) > mario.maxVelocityX)
        {
        	mario.body.velocity.x = mario.maxVelocityX;
        }
        mario.animations.play('walkright', 12, false);
        mario.direction = 1;
    }
    if (cursors.left.isUp && cursors.right.isUp)
    {
    	if (Math.abs(mario.body.velocity.x) > 10)
    	{
    		mario.body.velocity.x += Math.pow(-1, mario.body.velocity.x > 0 ? 1 : 0) * 10;
    	}
    	else if (Math.abs(mario.body.velocity.x) <= 10)
    	{
    		mario.body.velocity.x = 0;
    	}
    	if (mario.direction == undefined)
    	{
    		mario.direction = 1;
    	}
    	if (mario.direction == 1)
    	{
    		mario.animations.getAnimation('walkright').frame = 0;
    	}
    	else
    	{
    		mario.animations.getAnimation('walkleft').frame = 3;	
    	}
    }
}

function render() {

}