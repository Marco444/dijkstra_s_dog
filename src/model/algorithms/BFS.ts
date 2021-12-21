import {NodeBackEnd} from "../grid/NodeEngine";
import {Animation, AnimationType, noSolutionAnimations} from "../animations/AnimationsEngine";
import {getShortestPathAnimation} from "./Dijkstra";
import {getAdjacent} from "../grid/GridEngine";

export function getBfsAnimations(grid: NodeBackEnd[][], start: NodeBackEnd, end: NodeBackEnd): Animation[] {

    const animations: Animation[] = []
    const queue: NodeBackEnd[] = []

    queue.push(start)
    start.isVisited = true

    while(queue.length !== 0) {

        let current = queue.shift()

        // @ts-ignore
        animations.push(new Animation(AnimationType.ReachedNode, current))

        // @ts-ignore
        for(const vertex: NodeBackEnd of getAdjacent(current, grid)) {
           if(!vertex.isVisited && !vertex.isWall){
               queue.push(vertex)
               vertex.isVisited = true

               // @ts-ignore
               vertex.previous = current
           }
           if(vertex === end)
               return animations.concat(new Animation(AnimationType.ReachedNode, vertex)).concat(...getShortestPathAnimation(end))
        }


    }

    //Should reach here if it didn't found the solution
    return animations.concat(...noSolutionAnimations(animations))
}
