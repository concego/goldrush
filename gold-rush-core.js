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
        this.initUI();
    }

    initUI() {
        // UI Bindings
        this.updateStats();

        document.getElementById('btn-up').addEventListener('click', () => this.handleAction(this.movePlayer(this.player.position.facing)));
        document.getElementById('btn-down').addEventListener('click', () => this.handleAction(this.movePlayer(this.getOppositeDirection(this.player.position.facing))));
        
        document.getElementById('btn-left').addEventListener('click', () => {
            const next = this.rotateLeft(this.player.position.facing);
            this.player.position.facing = next;
            this.log(`Facing ${next}`);
            this.updateStats();
        });

        document.getElementById('btn-right').addEventListener('click', () => {
            const next = this.rotateRight(this.player.position.facing);
            this.player.position.facing = next;
            this.log(`Facing ${next}`);
            this.updateStats();
        });

        document.getElementById('btn-scan').addEventListener('click', () => this.log("Scanning... The wind blows from the North. The path ahead is clear."));
        document.getElementById('btn-attack').addEventListener('click', () => this.log("You swing your blade at the shadows. Nothing there... yet."));
        document.getElementById('btn-interact').addEventListener('click', () => this.log("Nothing to interact with here."));
        document.getElementById('btn-inventory').addEventListener('click', () => this.log(`Inventory: ${this.player.inventory.gold} Gold. Heavy is the head that wears the debt.`));
    }

    handleAction(result) {
        if (result.msg) this.log(result.msg);
        this.updateStats();
    }

    log(msg) {
        const logEl = document.getElementById('game-log');
        logEl.innerText = msg;
        // Trigger ARIA live region by clearing and setting
        logEl.setAttribute('aria-live', 'off');
        setTimeout(() => logEl.setAttribute('aria-live', 'polite'), 10);
    }

    updateStats() {
        document.getElementById('gold-val').innerText = this.player.inventory.gold;
        document.getElementById('hp-val').innerText = `${this.player.hp.current}/${this.player.hp.max}`;
        document.getElementById('debt-val').innerText = this.player.debt;
        document.getElementById('facing-display').innerText = `Facing: ${this.player.position.facing}`;
    }

    movePlayer(direction) {
        let nextPos = { ...this.player.position };
        if (direction === 'North') nextPos.y++;
        else if (direction === 'South') nextPos.y--;
        else if (direction === 'East')  nextPos.x++;
        else if (direction === 'West')  nextPos.x--;

        this.player.position = nextPos;
        return { type: 'move', pos: nextPos, msg: `Moved to ${nextPos.x}, ${nextPos.y}` };
    }

    getOppositeDirection(dir) {
        const ops = { 'North': 'South', 'South': 'North', 'East': 'West', 'West': 'East' };
        return ops[dir];
    }

    rotateLeft(dir) {
        const dirs = ['North', 'West', 'South', 'East'];
        let idx = dirs.indexOf(dir);
        return dirs[(idx + 1) % 4];
    }

    rotateRight(dir) {
        const dirs = ['North', 'East', 'South', 'West'];
        let idx = dirs.indexOf(dir);
        return dirs[(idx + 1) % 4];
    }
}

// Start game on load
window.addEventListener('load', () => {
    window.game = new GoldRushGame();
});
