// Initialize the Phaser Game object and set default game window size
const game = new Phaser.Game(1250, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
})

// Declare shared variables at the top so all methods can access them
let score = 0
let scoreText
let platforms
let diamonds
let cursors
let player

function preload() {
  // Load & Define our game assets
  game.load.image('sky', 'sky.png')
  game.load.image('ground', 'platform.png')
  game.load.image('hack', 'speech4.png')
  game.load.image('get', 'speech1.png')
  game.load.image('set', 'speech2.png')
  game.load.image('go', 'speech3.png')
  game.load.image('gameover', 'gameover.png')
   game.load.image('goal','goal.png')
   game.load.image('white','white.png')
   game.load.image('I','I.png')
   game.load.image('love','love.png')
   game.load.image('coding','coding.png')
   game.load.image('goal2','goal2.png')
  game.load.spritesheet('woof', 'woof.png', 32, 32)
}
let sky;
let ledge;
function create() {
  //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE)

  //  A simple background for our game
  sky = game.add.sprite(0, 0, 'sky')
 let goal=game.add.sprite(400,20,'goal')
  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group()

  //  We will enable physics for any object that is created in this group
  platforms.enableBody = true

  // Here we create the ground.
  // let ground = platforms.create(0, game.world.height - 64, 'ground')

  let ground = platforms.create(0, 575, 'ground');

  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  ground.scale.setTo(100, 100)

  //  This stops it from falling away when you jump on it
  ground.body.immovable = true

  //  Now let's create two ledges
  ledge = platforms.create(400, 450, 'ground')
  ledge.body.immovable = true

  ledge = platforms.create(-75, 350, 'ground')
  ledge.body.immovable = true

  ledge = platforms.create(800,200, 'ground')
  ledge.body.immovable = true

  // The player and its settings
  player = game.add.sprite(0, game.world.height - 150, 'woof')

  //  We need to enable physics on the player
  game.physics.arcade.enable(player)

  //  Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.2
  player.body.gravity.y = 500
  player.body.collideWorldBounds = false

  //  Our two animations, walking left and right.
  player.animations.add('left', [0, 1], 10, true)
  player.animations.add('right', [2, 3], 10, true)

  //  Finally some diamonds to collect
  diamonds = game.add.group()


  //  Enable physics for any object that is created in this group
  diamonds.enableBody = true
  let dia = diamonds.create(70, 300, 'hack')
  let diamond1 = diamonds.create(1000, 350, 'go')
  let diamond2 = diamonds.create(800, 500, 'set')
  let diamond3 = diamonds.create(500, 250, 'get')
  let diamond4 = diamonds.create(70, 525, 'I')
  let diamond5 = diamonds.create(600, 400, 'love')
  let diamond6 = diamonds.create(1100, 150, 'coding')

  //  Create 12 diamonds evenly spaced apart
  // for (var i = 0; i < 12; i++) {

  //   //  Drop em from the sky and bounce a bit
    dia.body.gravity.y = 1000
     dia.body.bounce.y = 0.3 + Math.random() * 0.2
     diamond1.body.gravity.y = 1000
     diamond1.body.bounce.y = 0.3 + Math.random() * 0.2
     diamond2.body.gravity.y = 1000
     diamond2.body.bounce.y = 0.3 + Math.random() * 0.2
     diamond3.body.gravity.y = 1000
     diamond3.body.bounce.y = 0.3 + Math.random() * 0.2
     diamond4.body.gravity.y = 1000
     diamond4.body.bounce.y = 0.3 + Math.random() * 0.2
     diamond5.body.gravity.y = 1000
     diamond5.body.bounce.y = 0.3 + Math.random() * 0.2
     diamond6.body.gravity.y = 1000
     diamond6.body.bounce.y = 0.3 + Math.random() * 0.2
     
  // }

  //  Create the score text
  scoreText = game.add.text(16,16, '', { fontSize: '32px', fill: '#fff' })

  //  And bootstrap our controls
  cursors = game.input.keyboard.createCursorKeys()

  count =0
}

function update() {
  //  We want the player to stop when not moving
  player.body.velocity.x = 0
  // game.set.sprite(skyLimit, 0, 'sky');
  //  Setup collisions for the player, diamonds, and our platforms
  game.physics.arcade.collide(player, platforms)
  game.physics.arcade.collide(diamonds, platforms)
 

  //  Call callectionDiamond() if player overlaps with a diamond
  game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this)

  // Configure the controls!
  if (cursors.left.isDown) {
    player.body.velocity.x = -150

    player.animations.play('left')
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150

    player.animations.play('right')
  } else {
    // If no movement keys are pressed, stop the player
    player.animations.stop()
  }

  //  This allows the player to jump!
  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -400
  }
  // Show an alert modal when score reaches 120
  if (score === 120) {
    alert('You win!')
    score = 0
  }
}

function collectDiamond(player, diamond) {
  // Removes the diamond from the screen
  diamond.kill()


  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
  {
     
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
  {
      sky.x += 40;
  }

  console.log("initial "+ count)

  if (diamond.key === "go" || diamond.key === "I" || diamond.key === "love" || diamond.key === "coding") {
    // alert('Go Back to School, Simon');
    
    game.add.sprite(0,0,'white')
    game.add.sprite(0, 0, 'gameover')
    score = 0;
    console.log("go "+ count)
  }
  else if((diamond.key == "set" && count == 0)  ){
    //game over case
    console.log("set "+ count)
    game.add.sprite(0,0,'white')
    game.add.sprite(0, 0, 'gameover')
    score = 0;
    
  }
  else  if((diamond.key === "set" && count === 1)  ){
    //continue game
    console.log("set "+ count)
    count = count +1
      score += 10
      scoreText.text = 'Score: ' + score
    }

   else if((diamond.key === "hack")){
    if(count == 2){
       //continue game
    console.log("hack "+ count)
    count = count +1
    score += 10
    scoreText.text = 'Score: ' + score
    } 

    else {     
      //game over case
    console.log("hack "+ count)
    game.add.sprite(0,0,'white')
    game.add.sprite(0, 0, 'gameover')
    score = 0;
    }
  } 
  
  else if((diamond.key == "get" && count == 0)  ){
    //starting game with this word
    console.log("get "+ count)
    count = count +1
    console.log("get2 "+ count)
    score += 10
    scoreText.text = 'Score: ' + score
  }
 
  
  if (count == 3) {
  
    score = 0
    goal=sprite.destroy()
    let goal2=game.add.sprite(400,20,'goal2')
  }
  //  And update the score
  // score += 10
  // scoreText.text = 'Score: ' + score
}
