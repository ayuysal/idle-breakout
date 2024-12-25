export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Lade-Bildschirm erstellen
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width/4, height/2 - 30, width/2, 50);
        
        // Ladetext
        const loadingText = this.add.text(width/2, height/2 - 50, 'Laden...', {
            font: '20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Loading-Events
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x4a90e2, 1);
            progressBar.fillRect(width/4 + 10, height/2 - 20, (width/2 - 20) * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        // Assets laden
        assets.images.forEach(img => {
            this.load.image(img.key, img.path);
        });

        assets.audio.forEach(audio => {
            this.load.audio(audio.key, audio.path);
        });
    }

    create() {
        this.scene.start('GameScene');
    }
} 