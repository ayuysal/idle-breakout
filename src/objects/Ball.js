export class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, 'ball');
        
        this.damage = config.damage || CONSTANTS.BALL.BASE_DAMAGE;
        this.speed = config.speed || CONSTANTS.BALL.BASE_SPEED;
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setup();
    }

    setup() {
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setCircle(8); // Kollisionsradius
        
        // Zufällige Startrichtung
        const angle = Phaser.Math.Between(-60, 60);
        this.scene.physics.velocityFromAngle(angle, this.speed, this.body.velocity);
    }

    update() {
        // Geschwindigkeit konstant halten
        const currentVelocity = new Phaser.Math.Vector2(this.body.velocity);
        currentVelocity.normalize().scale(this.speed);
        this.setVelocity(currentVelocity.x, currentVelocity.y);
    }
} 