class Block extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, 'block');
        
        this.maxHp = config.hp || CONSTANTS.BLOCK.BASE_HP;
        this.hp = this.maxHp;
        this.value = config.value || CONSTANTS.BLOCK.BASE_VALUE;
        
        scene.add.existing(this);
        scene.physics.add.existing(this, true); // true = statisch
        
        this.setupDisplay();
    }

    setupDisplay() {
        // HP-Text über dem Block
        this.hpText = this.scene.add.text(this.x, this.y - 10, this.hp.toString(), {
            fontSize: '16px',
            fill: '#fff'
        }).setOrigin(0.5);
    }

    damage(amount) {
        this.hp -= amount;
        this.hpText.setText(Math.max(0, this.hp).toString());
        
        // Farbänderung basierend auf HP
        const healthPercent = this.hp / this.maxHp;
        this.setTint(this.getHealthColor(healthPercent));
        
        return this.hp <= 0;
    }

    getHealthColor(percent) {
        const red = Math.min(255, Math.floor(255 * (1 - percent)));
        const green = Math.min(255, Math.floor(255 * percent));
        return Phaser.Display.Color.GetColor(red, green, 0);
    }

    destroy() {
        this.hpText.destroy();
        super.destroy();
    }
} 