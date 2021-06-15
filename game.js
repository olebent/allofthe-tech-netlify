const gameState = {
	score: 0
};

class StartScene extends Phaser.Scene {
	constructor(){
		super({ key: 'StartScene' });
	}
	
	create() {
	this.add.text(95, 250, 'Click to Start!', { fontSize: '30px', fill: '#000000' });
	
	this.input.on('pointerup', () => {
		// Add your code below:
				this.scene.stop('StartScene');
				this.scene.start('GameScene');
		
	});
	}
}

class GameScene extends Phaser.Scene {
	constructor(){
		super({ key: 'GameScene' });
	}

	preload() {
		this.load.image('bug1', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_1.png');
		this.load.image('bug2', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_2.png');
		this.load.image('bug3', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_3.png');
		this.load.image('platform', 'https://content.codecademy.com/courses/learn-phaser/physics/platform.png');
		this.load.image('codey', 'https://content.codecademy.com/courses/learn-phaser/physics/codey.png');
	}


	create() {
		gameState.player = this.physics.add.sprite(320, 300, 'codey').setScale(.5);

		const platforms = this.physics.add.staticGroup();

		platforms.create(320, 350, 'platform').setScale(2, 0.5).refreshBody();

		gameState.scoreText = this.add.text(320, 340, 'Score: 0', { fontSize: '15px', fill: '#000000' });

		gameState.player.setCollideWorldBounds(true);

		this.physics.add.collider(gameState.player, platforms);

		gameState.cursors = this.input.keyboard.createCursorKeys();

		const bugs = this.physics.add.group();

		const bugList = ['bug1', 'bug2', 'bug3']

		const bugGen = () => {
			const xCoord = Math.random() * 640
			let randomBug = bugList[Math.floor(Math.random() * 3)]
			bugs.create(xCoord, 10, randomBug)
		}

		const bugGenLoop = this.time.addEvent({
			delay: 100,
			callback: bugGen,
			loop: true,
		});

		this.physics.add.collider(bugs, platforms, bug => {
			bug.destroy();
			gameState.score += 10;
			gameState.scoreText.setText(`Score: ${gameState.score}`);
		})

		this.physics.add.collider(gameState.player, bugs, () => {
			bugGenLoop.destroy();
			this.physics.pause();
			this.add.text(180, 250, 'Game Over', { fontSize: '15px', fill: '#000000' });
			this.add.text(152, 270, 'Click to Restart', { fontSize: '15px', fill: '#000000' });

			this.input.on('pointerup', () => {
				gameState.score = 0;
				this.scene.restart();
			});
		});
	}

	update() {
		if (gameState.cursors.left.isDown) {
			gameState.player.setVelocityX(-160);
		} else if (gameState.cursors.right.isDown) {
			gameState.player.setVelocityX(160);
		} else {
			gameState.player.setVelocityX(0);
		}
	}
}

const config = {
	type: Phaser.AUTO,
	width: 640,
	height: 360,
	backgroundColor: "b9eaff",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			enableBody: true,
		}
	},
	scene: [StartScene, GameScene]
};

const game = new Phaser.Game(config);

