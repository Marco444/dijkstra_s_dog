import {NodeBackEnd, NodeType} from "../grid/NodeEngine";
import {Animation} from "../animations/AnimationsEngine";
import {getAdjacent} from "../grid/GridEngine";
import {randomIntFromInterval} from "./outils";

const MAX_ELEVATION = 5;

export default function getElevationAnimation(grid: NodeBackEnd[][], start: NodeBackEnd): Animation[] {
    const animations: Animation[] = []
    const queue: NodeBackEnd[] = []

    queue.push(start)
    start.isVisited = true

    while(queue.length !== 0) {

        let current: NodeBackEnd | undefined = queue.shift()
        if(current === undefined) return []

        grid[current.coords.row][current.coords.col].elevation = randomIntFromInterval(0, MAX_ELEVATION);

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