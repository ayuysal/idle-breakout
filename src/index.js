import { gameConfig } from './config/gameConfig';
import { GameScene } from './scenes/GameScene';
import { UIScene } from './scenes/UIScene';

window.addEventListener('load', () => {
    const config = {
        ...gameConfig,
        scene: [GameScene, UIScene]
    };

    new Phaser.Game(config);
}); 