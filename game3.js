var config = {
  type: Phaser.AUTO,
  width: 800,    // your base width
  height: 600,   // your base height
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [StartScene, GameScene] // or your scenes list
};

var game = new Phaser.Game(config);
