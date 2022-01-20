import {NodeBackEnd} from "../grid/NodeEngine";
import {Animation, AnimationType, noSolutionAnimations} from "../animations/AnimationsEngine";
import {getShortestPathAnimation} from "./Dijkstra";
import {getAdjacent} from "../grid/GridEngine";

export const BfsText =
    `
    Breadth First Search (BFS) is set to initialise at a vertex and then moves on to traverse all the nodes
    with the current height before traversing all the others with next depth level. Because in the worst case
    it traverses the whole graph, its complexity is O(V + E) where V are the vertices and E are the edges 
    of the graph. It works with UN-WEIGHTED graphs
`


export function getBfsAnimations(grid: NodeBackEnd[][], start: NodeBackEnd, end: NodeBackEnd): Animation[] {

    const animations: Animation[] = []
    const queue: NodeBackEnd[] = []

    queue.push(start)
    start.isVisited = true

    while(queue.length !== 0) {

        let current: NodeBackEnd | undefined = queue.shift()
        if(current === undefined) return []

        animations.push(new Animation(AnimationType.ReachedNode, current))


        for(const vertex of getAdjacent(current, grid)) {
           if(!vertex.isVisited && !vertex.isWall){
               queue.push(vertex)
               vertex.isVisited = true
               vertex.previous = current
           }

           if(vertex === end)
               return animations.concat(new Animation(AnimationType.ReachedNode, vertex)).concat(...getShortestPathAnimation(end))
        }

    }

    //Should reach here if it didn't found the solution
    return animations.concat(...noSolutionAnimations(animations))
}
