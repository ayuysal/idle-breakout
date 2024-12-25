console.log('Game loading...');

import { gameConfig } from './config/gameConfig.js';
import { GameScene } from './scenes/GameScene';
import { UIScene } from './scenes/UIScene';

window.onload = function() {
    const config = {
        ...gameConfig,
        scene: [GameScene, UIScene]
    };

    const game = new Phaser.Game(config);
    
    // Globale Spielvariablen
    game.globals = {
        currency: 0,
        balls: [],
        blocks: [],
        upgrades: {
            ballDamage: 1,
            ballSpeed: 200,
            ballCount: 1
        }
    };
} 