console.log('Game loading...');

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