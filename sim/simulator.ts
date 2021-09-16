/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../node_modules/phaser/types/phaser.d.ts" />

namespace pxsim {
  /**
   * This function gets called each time the program restarts
   */
  initCurrentRuntime = () => {
    runtime.board = new Board();
  };

  /**
   * Gets the current 'board', eg. program state.
   */
  export function board(): Board {
    return runtime.board as Board;
  }

  export class Board extends pxsim.BaseBoard {
    public bus: EventBus;
    public game: Phaser.Game;

    constructor() {
      super();
      this.bus = new EventBus(runtime, this);
      this.initPhaser();
    }

    initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
      return new Promise<void>((resolve, reject) => {
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

  class BootScene extends Phaser.Scene {
    private stage!: Phaser.GameObjects.Container;

    public preload(): void {
      this.load.image(
        "phaser-logo",
        "./static/images/example/phaser3-logo.png"
      );
      this.load.image("particle", "./static/images/example/particle.png");
    }

    public create(): void {
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

    public update(): void {}
  }
}
