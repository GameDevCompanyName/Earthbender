export class GameConfig {
    readonly TILE_SIZE = 100;
    readonly HALF_TILE = (this.TILE_SIZE / 2);
    readonly WORLD_HEIGHT = 1000;
    readonly WORLD_WIDTH = 600;
    readonly ENVIRONMENT_SIZE = 17;
    readonly ENVIRONMENT_OFFSET = Math.round((this.ENVIRONMENT_SIZE - 3) / 2);
}