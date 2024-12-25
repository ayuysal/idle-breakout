export class MathUtil {
    static lerp(start, end, amount) {
        return start + (end - start) * amount;
    }

    static formatNumber(number) {
        if (number < 1000) return number.toString();
        
        const suffixes = ['', 'K', 'M', 'B', 'T'];
        const tier = Math.floor(Math.log10(number) / 3);
        
        if (tier >= suffixes.length) return '∞';
        
        const suffix = suffixes[tier];
        const scale = Math.pow(10, tier * 3);
        const scaled = number / scale;
        
        return scaled.toFixed(1) + suffix;
    }

    static randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    static calculateDPS(balls) {
        return balls.reduce((total, ball) => {
            return total + (ball.damage * (ball.speed / 100));
        }, 0);
    }
} 