import {NodeBackEnd, NodeType} from "../grid/NodeEngine";
import {Animation, AnimationType, noSolutionAnimations} from "../animations/AnimationsEngine";
import {getAdjacent} from "../grid/GridEngine";
import {getShortestPathAnimation} from "./Dijkstra";



export const BidirectionalBFSText =
    `
   Bidirectional BFS works by running two BFS simultaneously, one starting from the dog and another starting
   from the steak. It has the same limitations and BFS but in practise it's usually quite faster due to reducing
   the total number of traversed vertices. 
`

/* Returns a set of animations of the nodes traversed and the shortest path between start and end vertices
*  using biderectional bfs */
export function getBidirectionalBFSAnimations(grid: NodeBackEnd[][], start: NodeBackEnd, end: NodeBackEnd): Animation[] {

    const animations: Animation[] = []

    //We initialise the start queue by pushing the start
    //node and marking it visited
    const startQueue: NodeBackEnd[] = []
    startQueue.push(start)
    start.isVisited = true

    //Ibid
    const destQueue: NodeBackEnd[] = []
    destQueue.push(end)
    end.isVisited = true


    //While we have elements in our queues we run dfs
    while (startQueue.length !== 0 && destQueue.length !== 0) {


        //If bfs() returns true then it found another vertex with the other identifier thus it
        //should stop
        if (bfs("start", "end", startQueue, grid, animations) || bfs("end", "start", destQueue, grid, animations))
            return animations.concat(...getShortestPathAnimation(start))

    }


    //If we reached here then we have no solution
    return animations.concat(...noSolutionAnimations(animations))
}

/* Applies an iteration of bfs in the queue given and returns true if it
* reaches a vertex that has already been visited by the other bfs*/
function bfs(identifier: string, otherIdentifier: string, queue: NodeBackEnd[], grid: NodeBackEnd[][], animations: Animation[]): boolean {

    let current: NodeBackEnd | undefined = queue.shift()
    if (current === undefined) return false

    animations.push(new Animation(AnimationType.ReachedNode, current))

    for (const vertex of getAdjacent(current, grid)) {

        if (vertex.parent === otherIdentifier) {
            animations.push(new Animation(AnimationType.ReachedNode, vertex))
            animations.push(...getShortestPathAnimation(vertex))
            animations.push(...getShortestPathAnimation(current))
            return true
        }

        if (!vertex.isVisited && !vertex.isWall) {
            queue.push(vertex)
            vertex.isVisited = true
            vertex.previous = current
            vertex.parent = identifier
        }
    }

    return false
}



