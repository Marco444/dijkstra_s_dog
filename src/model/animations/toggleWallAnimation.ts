import {NodeBackEnd} from "../grid/NodeEngine";
import {AnimationType, Animation, Color, toggleWallAnimation} from "./AnimationsEngine";

export function getWallToggleAnimation(grid: NodeBackEnd[][], row: number, col: number) {
    grid[row][col].toggle()
    return toggleWallAnimation(grid[row][col])
}