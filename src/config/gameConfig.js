const gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2c3e50',
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
    }
};

const CONSTANTS = {
    BALL: {
        BASE_SPEED: 200,
        BASE_DAMAGE: 1,
        BASE_COST: 100
    },
    BLOCK: {
        BASE_HP: 10,
        BASE_VALUE: 5,
        COLUMNS: 8,
        ROWS: 5
    }
}; 