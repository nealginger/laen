import Phaser from 'phaser'

export default class Scene1 extends Phaser.Scene {
	// player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

	constructor() {
		super('scene1')
	}

	preload() {
		// this.load.setBaseURL('https://labs.phaser.io')

		this.load.image('Inner', 'assets/Inner.png')
		this.load.tilemapTiledJSON('scene1_map', 'assets/scene1_map.json')
		this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 })
	}

	create() {
		const scene1_map = this.make.tilemap({ key: 'scene1_map' })
		const inner = scene1_map.addTilesetImage('Inner')
		const base = scene1_map.createLayer('base', inner, 0, 0)
		const colision_base = scene1_map.createLayer('colision_base', inner, 0, 0)
		colision_base.setCollisionByExclusion([-1])
		const path = scene1_map.createLayer('path', inner, 0, 0)
		path.setCollisionByExclusion([-1])
		const extra_decorations = scene1_map.createLayer('extra_decorations', inner, 0, 0)
		extra_decorations.setCollisionByExclusion([-1])

		this.player = this.physics.add.sprite(4*16 - 8, 3*16 - 8, 'player', 36)
		this.cursors = this.input.keyboard.createCursorKeys();

		this.physics.world.bounds.width = scene1_map.widthInPixels;
		this.physics.world.bounds.height = scene1_map.heightInPixels;
		this.physics.add.collider(this.player, [colision_base, path])
		this.player.setCollideWorldBounds(true);

		this.cameras.main.setBounds(0, 0, scene1_map.widthInPixels * 5, scene1_map.heightInPixels * 5)
		this.cameras.main.startFollow(this.player, true, 1, 1, -100, -120)
	}

	update() {
		this.player.body.setVelocity(0)
		if (this.cursors.left.isDown) {
			this.player.body.setVelocityX(-64)
		} else if (this.cursors.right.isDown) {
			this.player.body.setVelocityX(64)
		}
		if (this.cursors.up.isDown) {
			this.player.body.setVelocityY(-64)
		} else if (this.cursors.down.isDown) {
			this.player.body.setVelocityY(64)
		}
	}
}
