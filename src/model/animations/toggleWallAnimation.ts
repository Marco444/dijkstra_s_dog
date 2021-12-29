import {NodeBackEnd, NodeType} from "../grid/NodeEngine";
import {AnimationType, Animation, Color, toggleWallAnimation} from "./AnimationsEngine";

export function getWallToggleAnimation(grid: NodeBackEnd[][], row: number, col: number) {
    if(grid[row][col].nodeType === NodeType.Start || grid[row][col].nodeType === NodeType.End)
        return []

    grid[row][col].toggle()
    return toggleWallAnimation(grid[row][col])
}