class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    // Last inn assets for startskjermen om nødvendig
  }

  create() {
    const { width, height } = this.scale;
    this.add.text(width / 2, height / 2, 'Trykk for å starte', {
      fontSize: '32px',
      fill: '#fff'
    }).setOrigin(0.5);

    // Start spillet ved første trykk (passer både desktop og mobil)
    this.input.once('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}

export default StartScene;
