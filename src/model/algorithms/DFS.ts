import {NodeBackEnd} from "../grid/NodeEngine";
import {Animation, AnimationType, noSolutionAnimations} from "../animations/AnimationsEngine";
import {getAdjacent} from "../grid/GridEngine";
import {getShortestPathAnimation} from "./Dijkstra";
import {Stack} from "datastructures-js";
require('algorithms/data_structures');

export function getDfsAnimations(grid: NodeBackEnd[][], start: NodeBackEnd, end: NodeBackEnd): Animation[] {

    console.log('dfs called')

    const animations: Animation[] = [new Animation(AnimationType.ReachedNode, start)]
    const stack: any = new Stack()

    stack.push(start)

    recursiveDfs(grid, start, end, animations)

    return  animations.concat(...getShortestPathAnimation(end.previous))
}

function recursiveDfs(grid: NodeBackEnd[][], current: NodeBackEnd, end: NodeBackEnd, animations: Animation[]): void {
    grid[current.coords.row][current.coords.col].isVisited = true
    animations.push(new Animation(AnimationType.ReachedNode, current))

    // @ts-ignore
    for (const neighbour: NodeBackEnd of getAdjacent(current, grid)) {

        if(neighbour.coords.col === end.coords.col && neighbour.coords.row === end.coords.row) {
            end.isVisited = true
            end.previous = current;
            return;
        }

        if (!neighbour.isVisited && !neighbour.isWall && !end.isVisited) {
            recursiveDfs(grid, neighbour, end, animations)
            neighbour.previous = current
        }
    }
}

/*

    while(!stack.isEmpty()) {
        const current = stack.pop()

        if(!current.isVisited)
            animations.push(new Animation(AnimationType.ReachedNode, current))

        // @ts-ignore
        for( const neighbor: NodeBackEnd of getAdjacent(current, grid)) {
            if(!neighbor.isVisited && !neighbor.isWall)
                stack.push(neighbor)


            if(neighbor.coords.col === end.coords.col && neighbor.coords.row === end.coords.row) {
                end.isVisited = true
                end.previous = current;
                return animations//.concat(...getShortestPathAnimation(end.previous));
            }
        }
    }
 */