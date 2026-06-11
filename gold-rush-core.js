/**
 * Gold Rush - Core Logic (Roguelike PWA)
 */
class GoldRushGame {
    constructor() {
        this.settings = { volumeMusic: 0.5, volumeSFX: 0.8, language: 'en' };
        this.player = {
            attributes: { str: 10, dex: 16, con: 14, cha: 14 },
            hp: { current: 18, max: 18 },
            position: { x: 0, y: 0, facing: 'North' },
            inventory: { gold: 1500, weight: 0, maxWeight: 150 },
            debt: 5000,
            visibilityRadius: 2,
            isCarryingLight: false
        };
        this.enemies = [];
    }

    movePlayer(direction) {
        if (this.player.position.facing !== direction) {
            this.player.position.facing = direction;
            return { type: 'turn', msg: `Facing ${direction}` };
        }
        let nextPos = { ...this.player.position };
        if (direction === 'North') nextPos.y++;
        else if (direction === 'South') nextPos.y--;
        else if (direction === 'East')  nextPos.x++;
        else if (direction === 'West')  nextPos.x--;

        this.player.position = nextPos;
        return { type: 'move', pos: nextPos, msg: `Moved to ${nextPos.x}, ${nextPos.y}` };
    }

    checkStealth(enemy) {
        const p = this.player.position;
        const e = enemy;
        if (e.facing === 'North' && p.y < e.y) return true;
        if (e.facing === 'South' && p.y > e.y) return true;
        if (e.facing === 'East'  && p.x < e.x) return true;
        if (e.facing === 'West'  && p.x > e.x) return true;
        return false;
    }
}
console.log("Gold Rush Core logic initialized.");
