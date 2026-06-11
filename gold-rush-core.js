/**
 * Gold Rush - Core Logic (Roguelike PWA)
 */
class GoldRushGame {
    constructor() {
        this.settings = { volumeMusic: 0.5, volumeSFX: 0.8, language: 'en' };
        this.sounds = {};
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
        this.loadSounds();
        this.loadImages();
        this.initUI();
    }

    loadImages() {
        this.tileset = new Image();
        this.tileset.src = 'assets/images/tileset.png';
        this.tileset.onload = () => {
            this.render();
        };
    }

    render() {
        const canvas = document.getElementById('game-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        // Match canvas size to display size
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const tileSize = 32; // Scaling up the 16x16 tiles
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Draw basic 5x5 grid around player
        for (let x = -2; x <= 2; x++) {
            for (let y = -2; y <= 2; y++) {
                // Floor tile (Example index: 0, 0 on sheet)
                this.drawTile(ctx, 0, 0, centerX + (x * tileSize), centerY - (y * tileSize), tileSize);
            }
        }

        // Draw Player (Example index: 24, 0 on sheet)
        this.drawTile(ctx, 24, 0, centerX, centerY, tileSize);
    }

    drawTile(ctx, sheetX, sheetY, x, y, size) {
        const sourceSize = 16;
        const spacing = 1;
        ctx.drawImage(
            this.tileset,
            sheetX * (sourceSize + spacing),
            sheetY * (sourceSize + spacing),
            sourceSize,
            sourceSize,
            x - size / 2,
            y - size / 2,
            size,
            size
        );
    }

    loadSounds() {
        const soundFiles = {
            click: 'assets/sounds/interface/click_001.wav',
            confirm: 'assets/sounds/interface/confirmation_001.wav',
            select: 'assets/sounds/interface/select_001.wav',
            back: 'assets/sounds/interface/back_001.wav',
            scroll: 'assets/sounds/interface/scroll_001.wav'
        };

        for (let key in soundFiles) {
            this.sounds[key] = new Audio(soundFiles[key]);
            this.sounds[key].volume = this.settings.volumeSFX;
        }
    }

    playSound(key) {
        if (this.sounds[key]) {
            this.sounds[key].currentTime = 0;
            this.sounds[key].play().catch(e => console.log("Audio play blocked", e));
        }
    }

    initUI() {
        // UI Bindings
        this.updateStats();

        // Keyboard Mapping (for PC/NVDA)
        window.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    this.playSound('scroll');
                    this.handleAction(this.movePlayer(this.player.position.facing));
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    this.playSound('scroll');
                    this.handleAction(this.movePlayer(this.getOppositeDirection(this.player.position.facing)));
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    this.playSound('click');
                    this.turn('Left');
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    this.playSound('click');
                    this.turn('Right');
                    break;
                case ' ':
                case 'Enter':
                    this.playSound('confirm');
                    this.log("You swing your blade at the shadows. Nothing there... yet.");
                    break;
                case 'f':
                case 'F':
                    this.playSound('select');
                    this.log("Scanning... The wind blows from the North. The path ahead is clear.");
                    break;
            }
        });

        document.getElementById('btn-up').addEventListener('click', () => {
            this.playSound('scroll');
            this.handleAction(this.movePlayer(this.player.position.facing));
        });
        document.getElementById('btn-down').addEventListener('click', () => {
            this.playSound('scroll');
            this.handleAction(this.movePlayer(this.getOppositeDirection(this.player.position.facing)));
        });
        
        document.getElementById('btn-left').addEventListener('click', () => {
            this.playSound('click');
            this.turn('Left');
        });
        document.getElementById('btn-right').addEventListener('click', () => {
            this.playSound('click');
            this.turn('Right');
        });

        document.getElementById('btn-scan').addEventListener('click', () => {
            this.playSound('select');
            this.log("Scanning... The wind blows from the North. The path ahead is clear.");
        });
        document.getElementById('btn-attack').addEventListener('click', () => {
            this.playSound('confirm');
            this.log("You swing your blade at the shadows. Nothing there... yet.");
        });
        document.getElementById('btn-interact').addEventListener('click', () => {
            this.playSound('back');
            this.log("Nothing to interact with here.");
        });
        document.getElementById('btn-inventory').addEventListener('click', () => {
            this.playSound('confirm');
            this.log(`Inventory: ${this.player.inventory.gold} Gold. Heavy is the head that wears the debt.`);
        });
    }

    turn(side) {
        const next = side === 'Left' ? this.rotateLeft(this.player.position.facing) : this.rotateRight(this.player.position.facing);
        this.player.position.facing = next;
        this.log(`Facing ${next}`);
        this.updateStats();
    }

    handleAction(result) {
        if (result.msg) this.log(result.msg);
        this.updateStats();
        this.render();
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
