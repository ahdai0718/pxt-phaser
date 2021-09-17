/// <reference path="../libs/core/enums.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../node_modules/phaser/types/phaser.d.ts" />
var pxsim;
(function (pxsim) {
    /**
     * This function gets called each time the program restarts
     */
    pxsim.initCurrentRuntime = () => {
        pxsim.runtime.board = new Board();
    };
    /**
     * Gets the current 'board', eg. program state.
     */
    function board() {
        return pxsim.runtime.board;
    }
    pxsim.board = board;
    const Width = 720;
    const Height = 1280;
    class Board extends pxsim.BaseBoard {
        constructor() {
            super();
            this.bus = new pxsim.EventBus(pxsim.runtime, this);
            this.initPhaser();
        }
        initAsync(msg) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });
        }
        kill() {
            this.game.destroy(true);
        }
        initPhaser() {
            this.game = new Phaser.Game({
                type: Phaser.AUTO,
                width: Width,
                height: Height,
                parent: "phaser-game-simulator",
                backgroundColor: "#000000",
                banner: false,
                scale: {
                    mode: Phaser.Scale.FIT,
                },
                render: {
                    roundPixels: true,
                },
                input: {
                    activePointers: 1,
                },
            });
            this.game.scene.add("boot", BootScene, false);
            this.game.scene.start("boot");
        }
        currenScene() {
            return this.game.scene.getScene("boot");
        }
    }
    pxsim.Board = Board;
    const isLocalhost = () => {
        return /^http:\/\/(localhost|127\.0\.0\.1):\d+\//.test(window.location.href);
    };
    const staticPath = () => {
        return isLocalhost() ? "static" : "docs/static";
    };
    class BootScene extends Phaser.Scene {
        preload() {
            this.load.image("phaser-logo", `${staticPath()}/images/example/phaser3-logo.png`);
            this.load.image("particle", `${staticPath()}/images/example/particle.png`);
        }
        create() {
            this.stage = this.add.container(Width / 2, Height / 2, []);
            const particles = this.add.particles("particle");
            const emitter = particles.createEmitter({
                speed: 100,
                scale: { start: 1, end: 0 },
                blendMode: "ADD",
            });
            this.stage.add(particles);
            const logo = new Phaser.GameObjects.Image(this, 0, 0, "phaser-logo");
            logo.setOrigin(0.5);
            this.stage.add(logo);
            emitter.startFollow(logo);
        }
        update() { }
    }
})(pxsim || (pxsim = {}));
