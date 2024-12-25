export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.balls = [];
        this.blocks = [];
        this.currency = 0;
    }

    create() {
        this.createInitialBlocks();
        this.addBall();
        
        // Kollisionen
        this.physics.add.collider(
            this.balls,
            this.blocks,
            this.handleBallBlockCollision,
            null,
            this
        );
    }

    createInitialBlocks() {
        const blockWidth = 80;
        const blockHeight = 30;
        const startX = (this.game.config.width - (CONSTANTS.BLOCK.COLUMNS * blockWidth)) / 2;
        const startY = 50;

        for (let row = 0; row < CONSTANTS.BLOCK.ROWS; row++) {
            for (let col = 0; col < CONSTANTS.BLOCK.COLUMNS; col++) {
                const x = startX + (col * blockWidth) + blockWidth/2;
                const y = startY + (row * blockHeight) + blockHeight/2;
                
                const block = new Block(this, x, y, {
                    hp: CONSTANTS.BLOCK.BASE_HP * (row + 1),
                    value: CONSTANTS.BLOCK.BASE_VALUE * (row + 1)
                });
                this.blocks.push(block);
            }
        }
    }

    addBall() {
        const ball = new Ball(this, 
            this.game.config.width / 2,
            this.game.config.height - 50
        );
        this.balls.push(ball);
    }

    handleBallBlockCollision(ball, block) {
        if (block.damage(ball.damage)) {
            this.currency += block.value;
            this.events.emit('currencyUpdated', this.currency);
            this.blocks = this.blocks.filter(b => b !== block);
            block.destroy();
        }
    }

    update() {
        this.balls.forEach(ball => ball.update());
    }
} 