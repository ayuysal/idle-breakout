export class SaveManager {
    static SAVE_KEY = 'idle_breakout_save';
    
    static saveGame(gameState) {
        try {
            const saveData = {
                currency: gameState.currency,
                balls: gameState.balls.map(ball => ({
                    damage: ball.damage,
                    speed: ball.speed
                })),
                upgrades: gameState.upgrades,
                lastSaveTime: Date.now()
            };
            
            localStorage.setItem(this.SAVE_KEY, JSON.stringify(saveData));
            return true;
        } catch (error) {
            console.error('Fehler beim Speichern:', error);
            return false;
        }
    }

    static loadGame() {
        try {
            const saveData = localStorage.getItem(this.SAVE_KEY);
            if (!saveData) return null;

            const parsedData = JSON.parse(saveData);
            
            // Offline-Fortschritt berechnen
            const offlineProgress = this.calculateOfflineProgress(parsedData.lastSaveTime);
            parsedData.currency += offlineProgress;

            return parsedData;
        } catch (error) {
            console.error('Fehler beim Laden:', error);
            return null;
        }
    }

    static calculateOfflineProgress(lastSaveTime) {
        const now = Date.now();
        const offlineTime = (now - lastSaveTime) / 1000; // in Sekunden
        const offlineRate = 0.1; // Währung pro Sekunde
        return Math.floor(offlineTime * offlineRate);
    }

    static clearSave() {
        localStorage.removeItem(this.SAVE_KEY);
    }
} 