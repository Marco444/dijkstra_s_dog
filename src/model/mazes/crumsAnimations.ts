import {NodeBackEnd, NodeType} from "../grid/NodeEngine";
import {Animation, AnimationType, noSolutionAnimations} from "../animations/AnimationsEngine";
import {getAdjacent} from "../grid/GridEngine";
import {getShortestPathAnimation} from "../algorithms/Dijkstra";
import {randomIntFromInterval} from "./outils";

const CRUMB_WEIGHT = -1;
const CRUMB_LIKELINESS = 1 / 30;

/**
 * because we want to reach every possible valid path we will do a bfs search of the maze and
 * randomly add crumbs to
 * **/
export default function getCrumbsAnimation(grid: NodeBackEnd[][], start: NodeBackEnd): Animation[] {
    const animations: Animation[] = []
    const queue: NodeBackEnd[] = []

    queue.push(start)
    start.isVisited = true

    while(queue.length !== 0) {

        let current: NodeBackEnd | undefined = queue.shift()
        if(current === undefined) return []

        if(randomIntFromInterval(0, 1/CRUMB_LIKELINESS) === 0) {
            grid[current.coords.row][current.coords.col].nodeType = NodeType.Crumb;
            grid[current.coords.row][current.coords.col].weight = CRUMB_WEIGHT;
        }

        for(const vertex of getAdjacent(current, grid)) {
            if (!vertex.isVisited && !vertex.isWall) {
                queue.push(vertex)
                vertex.isVisited = true
                vertex.previous = current
            }
        }

    }

    return animations
}
