import {NodeBackEnd, Point} from "../grid/NodeEngine";
import {Animation} from "../animations/AnimationsEngine";

export function getPrimAnimations(grid: NodeBackEnd[][], start: Point, end: Point): Animation[] {

    const animations: Animation[] = []
    const possibleWalls = []

    //Push the first node as a wall and move from there
    possibleWalls.push(grid[0][0])

    //We traverse until we have no more possible walls to add
    while (possibleWalls.length !== 0) {

        //We get the last pushed possible wal
        // @ts-ignore
        const current: NodeBackEnd = possibleWalls.pop()

        //We get all adjacents that are valid
        const spanningAdjacent: NodeBackEnd[] = getSpanningAdjacent(current, grid)

        //If we get none then move on to next possible wall
        if(spanningAdjacent.length === 0)
            continue

        //We update the walls and the animations with a new wall
        updateWalls(possibleWalls, spanningAdjacent, animations)
    }

    return animations
}

//Returns an array with all the neighbours, in a straight line, of a node
//that are spanning (each of them isn't adyacent, not even diagonally)
//to another wall.
function getSpanningAdjacent(current: NodeBackEnd, grid: NodeBackEnd[][]): NodeBackEnd[] {
    const nodes: NodeBackEnd[] = []

    return nodes
}

function updateWalls(possibleWalls: NodeBackEnd[], adjacent: NodeBackEnd[], animations: Animation[]) {

}