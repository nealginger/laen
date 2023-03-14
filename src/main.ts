import Phaser from 'phaser'

import Scene1 from './Scene1'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 480,
	height: 368,
	zoom: 5,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [Scene1],
}

export default new Phaser.Game(config)
