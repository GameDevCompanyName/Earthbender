import {TileContent, WorldTile} from "../../model/entities/WorldTile";
import './perlin.js';
import {GameConfig} from "../GameConfig";

const PERLIN_SCALE = 7;
const BASE_STONE_P = 0.5;
const PERLIN_TRESHOLD = 0.65;

export function generateWorld(seed?: number): WorldTile[][] {
    const world: WorldTile[][] = [];
    const gameConfig: GameConfig = new GameConfig();

    //@ts-ignore
    let perlin = global.noise;
    perlin.seed(seed ? seed : 1488);

    for (let y = 0; y < gameConfig.WORLD_HEIGHT; y++) {
        const line: WorldTile[] = [];
        for (let x = 0; x < gameConfig.WORLD_WIDTH; x++) {
            let tile: WorldTile;
            if (x === 0 || x === gameConfig.WORLD_WIDTH - 1 || y === 0 || y === gameConfig.WORLD_HEIGHT - 1) {
                tile = createStone(x, y);
            } else {
                let curNoise = (perlin.simplex2(x/PERLIN_SCALE, y/PERLIN_SCALE) / 2) + 0.5;
                if (curNoise > PERLIN_TRESHOLD) {
                    tile = createStone(x, y);
                } else {
                    tile = createEmpty(x, y);
                }
            }
            line.push(tile);
        }
        world.push(line);
    }
    return world;
}

export function createStone(x: number, y: number, p?: number) {
    if (random(p)) {
        return new WorldTile(x, y, TileContent.STONE);
    }
    return new WorldTile(x, y, TileContent.NOTHING);
}

export function createEmpty(x: number, y: number) {
    return new WorldTile(x, y, TileContent.NOTHING)
}

export function random(p?: number): boolean {
    if (p) {
        return Math.random() >= p;
    } else {
        return true;
    }
}