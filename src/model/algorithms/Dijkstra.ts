import {NodeBackEnd, NodeType, Point} from "../grid/NodeEngine";
import {Animation, AnimationType, noSolutionAnimations} from "../animations/AnimationsEngine";

export function getDijkstraAnimations(grid: NodeBackEnd[][], start: NodeBackEnd, end: NodeBackEnd): Animation[] {

   let animations: Animation[] = []
    start.distance = 0
   const unvisitedNodes = getAllNodes(grid)

   while(!!unvisitedNodes.length) {
       sortNodesByDistance(unvisitedNodes)
       // @ts-ignore
       const closestNode: NodeBackEnd = unvisitedNodes.shift()

       //If the closest node is a wall then we continue with next closes
       if(closestNode.isWall) continue

       //If the closest node is at infinity, then we trapped so we stop.
       if(closestNode.distance === Infinity) return animations.concat(...noSolutionAnimations(animations))

       closestNode.isVisited = true
       animations.push(new Animation(AnimationType.ReachedNode, closestNode))

       updateUnvisitedNeighbors(closestNode, grid);

       //If we reached the end then we really done!
       if(closestNode.coords.row === end.coords.row && closestNode.coords.col === end.coords.col)
           return animations.concat(...getShortestPathAnimation(end));
   }

   return []
}

function sortNodesByDistance(unvisitedNodes: NodeBackEnd[]) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node: NodeBackEnd, grid: NodeBackEnd[][]) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previous = node;
    }
}

function getUnvisitedNeighbors(node: NodeBackEnd, grid: NodeBackEnd[][]) {
    const neighbors = [];
    const [row, col] = [node.coords.row, node.coords.col];
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid: NodeBackEnd[][]): NodeBackEnd[] {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
// We just traverse from the back up until the start node
export function getShortestPathAnimation(finishNode: NodeBackEnd): Animation[] {
    const animations: Animation[] = [];
    let currentNode = finishNode;

    while (currentNode.nodeType !== NodeType.None) {
        animations.push(new Animation(AnimationType.ShortesPathNode, currentNode));
        currentNode = currentNode.previous;
    }

    return animations;
}
