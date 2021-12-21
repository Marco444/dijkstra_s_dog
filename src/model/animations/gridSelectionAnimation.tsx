import {NodeBackEnd} from "../grid/NodeEngine";
import {AnimationType, Animation} from "./AnimationsEngine";

export function getGridSelectionAnimations(grid: NodeBackEnd[][]): Animation[] {
    const animations = []

    for (const row of grid)
        for(const node of row)
            animations.push(new Animation(AnimationType.SelectedNode, node))

    return animations
}