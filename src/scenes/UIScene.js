export class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
        this.currency = 0;
    }

    create() {
        // UI Container erstellen
        this.setupUI();
        
        // Events von der GameScene abonnieren
        this.scene.get('GameScene').events.on('currencyUpdated', this.updateCurrency, this);
    }

    setupUI() {
        // Währungsanzeige
        this.currencyText = this.add.text(20, 20, 'Münzen: 0', {
            fontSize: '24px',
            fill: '#fff'
        });

        // Upgrade-Panel
        const panel = this.add.container(this.game.config.width - 200, 20);
        
        // Neuer Ball Button
        const newBallButton = this.createButton(0, 0, 'Neuer Ball', () => {
            if (this.currency >= CONSTANTS.BALL.BASE_COST) {
                this.scene.get('GameScene').addBall();
                this.updateCurrency(this.currency - CONSTANTS.BALL.BASE_COST);
            }
        });

        // Schaden Upgrade Button
        const damageButton = this.createButton(0, 60, 'Schaden +1', () => {
            const cost = this.calculateUpgradeCost('damage');
            if (this.currency >= cost) {
                this.scene.get('GameScene').upgradeBallDamage();
                this.updateCurrency(this.currency - cost);
            }
        });

        // Geschwindigkeit Upgrade Button
        const speedButton = this.createButton(0, 120, 'Geschw. +10%', () => {
            const cost = this.calculateUpgradeCost('speed');
            if (this.currency >= cost) {
                this.scene.get('GameScene').upgradeBallSpeed();
                this.updateCurrency(this.currency - cost);
            }
        });

        panel.add([newBallButton, damageButton, speedButton]);
    }

    createButton(x, y, text, callback) {
        const button = this.add.container(x, y);
        
        // Button Hintergrund
        const bg = this.add.rectangle(0, 0, 180, 40, 0x4a90e2)
            .setInteractive()
            .on('pointerdown', callback)
            .on('pointerover', () => bg.setFillStyle(0x357abd))
            .on('pointerout', () => bg.setFillStyle(0x4a90e2));

        // Button Text
        const buttonText = this.add.text(0, 0, text, {
            fontSize: '18px',
            fill: '#fff'
        }).setOrigin(0.5);

        button.add([bg, buttonText]);
        return button;
    }

    calculateUpgradeCost(type) {
        switch(type) {
            case 'damage':
                return Math.floor(CONSTANTS.BALL.BASE_COST * 
                    Math.pow(CONSTANTS.UPGRADES.DAMAGE_COST_MULTIPLIER, 
                        this.scene.get('GameScene').getBallDamageLevel()));
            case 'speed':
                return Math.floor(CONSTANTS.BALL.BASE_COST * 
                    Math.pow(CONSTANTS.UPGRADES.SPEED_COST_MULTIPLIER, 
                        this.scene.get('GameScene').getBallSpeedLevel()));
            default:
                return CONSTANTS.BALL.BASE_COST;
        }
    }

    updateCurrency(newAmount) {
        this.currency = newAmount;
        this.currencyText.setText(`Münzen: ${Math.floor(this.currency)}`);
        
        // Buttons aktualisieren (ausgegraut wenn nicht genug Währung)
        this.updateButtonStates();
    }

    updateButtonStates() {
        // Hier können Sie die Buttons je nach verfügbarer Währung aktivieren/deaktivieren
        // und die angezeigten Kosten aktualisieren
    }
} 