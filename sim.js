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
        initPhaser() {
            this.game = new Phaser.Game({
                type: Phaser.AUTO,
                width: 1280,
                height: 720,
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
    }
    pxsim.Board = Board;
    const staticPath = () => {
        return window.location.href.indexOf("localhost") > -1
            ? "static"
            : "docs/static";
    };
    class BootScene extends Phaser.Scene {
        preload() {
            this.load.image("phaser-logo", `${staticPath()}/images/example/phaser3-logo.png`);
            this.load.image("particle", `${staticPath()}/images/example/particle.png`);
        }
        create() {
            this.stage = this.add.container(640, 360, []);
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
