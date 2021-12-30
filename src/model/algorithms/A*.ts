import {AStarNode, NodeBackEnd} from "../grid/NodeEngine";
import {Animation, noSolutionAnimations} from "../animations/AnimationsEngine";
import {getShortestPathAnimation} from "./Dijkstra";
import {getAdjacent} from "../grid/GridEngine";

export function getAstarAnimations(grid: NodeBackEnd[][], start: NodeBackEnd, end: NodeBackEnd): Animation[] {

    //const openList:

    return []
}

/*
function AStar(grid: NodeBackEnd[][], start: NodeBackEnd, end: NodeBackEnd, animations: Animation[]) {

    let openHeap = new BinaryHeap((node: any) => node.f);

    openHeap.push(new AStarNode(start));

    while(openHeap.size() > 0) {

        // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
        let currentNode: AStarNode = openHeap.pop();

        // End case -- result has been found, return the traced path.
        if(currentNode.coords.row === end.coords.row && currentNode.coords.col === end.coords.col)
            return animations.push(...getShortestPathAnimation(end))

        // Normal case -- move currentNode from open to closed, process each of its neighbors.
        currentNode.closed = true;

        // Find all neighbors for the current node. Optionally find diagonal neighbors as well (false by default).
        let neighbors = getAdjacent(currentNode, grid)

        for(let i = 0; i < neighbors.length; i++) {
            let neighbor = new AStarNode(neighbors[i]);

            // Not a valid node to process, skip to next neighbor.
            if(neighbor.closed || neighbor.isWall)
                continue

            // The g score is the shortest distance from start to current node.
            // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
            if(!neighbor.visited || currentNode.g + neighbor.cost < neighbor.g) {

                // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                neighbor.isVisited = true;
                neighbor.previous = currentNode;
                neighbor.h = neighbor.h || heuristic(neighbor.pos, end.pos);
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;

                if (!neighbor.visited) {
                    // Pushing to heap will put it in proper place based on the 'f' value.
                    openHeap.push(neighbor);
                }
                else {
                    // Already seen the node, but since it has been rescored we need to reorder it in the heap
                    openHeap.rescoreElement(neighbor);
                }
            }
        }
    }

    return animations.push(...noSolutionAnimations(animations));
}

function heuristic(pos0: number, pos1: number) {

    // This is the Manhattan distance
    let d1 = Math.abs (pos1.x - pos0.x);
    let d2 = Math.abs (pos1.y - pos0.y);

    return d1 + d2;
}
*/