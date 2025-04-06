class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }
  preload() {
    // Optionally preload assets here
  }
  create() {
    // Immediately transition to the GameScene
    this.scene.start('GameScene');
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.playerMovingLeft = false;
    this.playerMovingRight = false;
  }
  preload() {
    // Use a graphics instance to create basic textures
    const graphics = this.add.graphics();

    // Create player texture: green rectangle (50x30)
    graphics.fillStyle(0x00ff00, 1);
    graphics.fillRect(0, 0, 50, 30);
    graphics.generateTexture('player', 50, 30);
    graphics.clear();

    // Create left button texture: white left arrow (triangle)
    graphics.fillStyle(0xffffff, 1);
    graphics.beginPath();
    graphics.moveTo(35, 20);
    graphics.lineTo(10, 10);
    graphics.lineTo(10, 30);
    graphics.closePath();
    graphics.fillPath();
    graphics.generateTexture('leftButton', 45, 40);
    graphics.clear();

    // Create right button texture: white right arrow (triangle)
    graphics.fillStyle(0xffffff, 1);
    graphics.beginPath();
    graphics.moveTo(10, 20);
    graphics.lineTo(35, 10);
    graphics.lineTo(35, 30);
    graphics.closePath();
    graphics.fillPath();
    graphics.generateTexture('rightButton', 45, 40);
    graphics.clear();
  }
  create() {
    // Create the player sprite at bottom center
    this.player = this.physics.add.sprite(400, 550, 'player');
    this.player.setCollideWorldBounds(true);

    // Set up keyboard cursors for left/right movement
    this.cursors = this.input.keyboard.createCursorKeys();

    // Create virtual left button for mobile (positioned bottom-left)
    this.leftButton = this.add.sprite(60, 550, 'leftButton')
      .setInteractive()
      .setScrollFactor(0)
      .setScale(1);
    this.leftButton.on('pointerdown', () => { this.playerMovingLeft = true; });
    this.leftButton.on('pointerup', () => { this.playerMovingLeft = false; });
    this.leftButton.on('pointerout', () => { this.playerMovingLeft = false; });

    // Create virtual right button for mobile (positioned next to the left button)
    this.rightButton = this.add.sprite(130, 550, 'rightButton')
      .setInteractive()
      .setScrollFactor(0)
      .setScale(1);
    this.rightButton.on('pointerdown', () => { this.playerMovingRight = true; });
    this.rightButton.on('pointerup', () => { this.playerMovingRight = false; });
    this.rightButton.on('pointerout', () => { this.playerMovingRight = false; });
  }
  update() {
    const velocity = 200;
    // Reset horizontal velocity each frame
    this.player.setVelocityX(0);

    // Keyboard input
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-velocity);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(velocity);
    }

    // Touch input (virtual buttons)
    if (this.playerMovingLeft) {
      this.player.setVelocityX(-velocity);
    } else if (this.playerMovingRight) {
      this.player.setVelocityX(velocity);
    }
  }
}

// Use ES6 constants for configuration as recommended
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#7236ff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [StartScene, GameScene]
};

const game = new Phaser.Game(config);
