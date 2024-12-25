export class UpgradeManager {
    constructor(scene) {
        this.scene = scene;
        this.upgrades = {
            ballDamage: { level: 1, baseCost: 50 },
            ballSpeed: { level: 1, baseCost: 75 },
            ballCount: { level: 1, baseCost: 100 }
        };
    }

    calculateUpgradeCost(upgradeType) {
        const upgrade = this.upgrades[upgradeType];
        if (!upgrade) return 0;

        // Exponentielles Kostenwachstum
        return Math.floor(upgrade.baseCost * Math.pow(1.5, upgrade.level - 1));
    }

    getUpgradeEffect(upgradeType) {
        const upgrade = this.upgrades[upgradeType];
        if (!upgrade) return 0;

        switch (upgradeType) {
            case 'ballDamage':
                return upgrade.level;
            case 'ballSpeed':
                return 200 + (upgrade.level - 1) * 20;
            case 'ballCount':
                return upgrade.level;
            default:
                return 0;
        }
    }

    canAffordUpgrade(upgradeType, currency) {
        return currency >= this.calculateUpgradeCost(upgradeType);
    }

    purchaseUpgrade(upgradeType, currency) {
        const cost = this.calculateUpgradeCost(upgradeType);
        
        if (currency >= cost) {
            this.upgrades[upgradeType].level++;
            return {
                success: true,
                newCurrency: currency - cost,
                newLevel: this.upgrades[upgradeType].level
            };
        }
        
        return {
            success: false,
            newCurrency: currency,
            newLevel: this.upgrades[upgradeType].level
        };
    }

    getUpgradeStats() {
        return {
            damage: this.getUpgradeEffect('ballDamage'),
            speed: this.getUpgradeEffect('ballSpeed'),
            count: this.getUpgradeEffect('ballCount')
        };
    }
} 