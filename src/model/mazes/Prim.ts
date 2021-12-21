import {NodeBackEnd, NodeType, Point} from "../grid/NodeEngine";
import {Animation, toggleWallAnimation} from "../animations/AnimationsEngine";
import {getAdjacent, getAllAdjacent} from "../grid/GridEngine";
import {re} from "mathjs";

export function getPrimAnimations(grid: NodeBackEnd[][], start: Point, end: Point): Animation[] {

    const animations: Animation[] = []
    const possibleWalls = []

    //Push the first node as a wall and move from there
    possibleWalls.push(grid[0][0])

    //We traverse until we have no more possible walls to add
    while(possibleWalls.length !== 0) {

        //We get the last pushed possible wall
        // @ts-ignore
        const current: NodeBackEnd = possibleWalls.pop()

        //We get the adjacents of that possible wall and check
        //whether it actually is a wall, ot it isn't
        //@ts-ignore
        const adjacent = getAllAdjacent(current, grid)
        const wallIndex: number = randomSpanningWall(adjacent, grid)

        //If there is no spanning wall we just skip to next possible walls,
        //we don't even add the others as they are no valid walls
        if(wallIndex === -1)
            continue

        //So we got a valid wall, we add it
        animations.push(...toggleWallAnimation(adjacent[wallIndex]))
        grid[adjacent[wallIndex].coords.row][adjacent[wallIndex].coords.col].isWall = true

        //So we assigned a new wall, we need to push
        //the other possible walls (as long as they can be future walls)
        for(let i = 0; i < adjacent.length; i++)
            if(i !== wallIndex && !adjacent[i].isWall && adjacent[i].nodeType !== NodeType.Start && adjacent[i].nodeType !== NodeType.End)
                possibleWalls.push(adjacent[i])

    }

    return animations
}

//Returns index of spanning wall given a list of possible walls, if not -1
function randomSpanningWall(adjacent: NodeBackEnd[], grid: NodeBackEnd[][]): number {
    for(let i = 0; i < adjacent.length; i++) {
        if(isSpanningWall(adjacent[i], grid))
            return i
    }
    return -1
}

//Returns whether a wall is spanning, whether it doesn't have previous
function isSpanningWall(wall: NodeBackEnd, grid: NodeBackEnd[][]): boolean {
    for(const node of getAllAdjacent(wall, grid)) {

        if (!node.isWall && node.previous === NodeBackEnd.None) {
            grid[node.coords.row][node.coords.col].previous = wall
            return true
        }
    }

    return false
}



export function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
