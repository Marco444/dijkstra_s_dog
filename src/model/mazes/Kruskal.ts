import {NodeBackEnd, NodeType, Point} from "../grid/NodeEngine";
import {Animation, toggleWallAnimation} from "../animations/AnimationsEngine";
import {getAdjacent, getAllAdjacent} from "../grid/GridEngine";
import {setPossibleWalls, shuffle} from "./outils";


export function getKruskalAnimations(grid: NodeBackEnd[][], start: Point, end: Point): Animation[] {

    const animations: Animation[] = []
    const possibleWalls = setPossibleWalls(grid)
    shuffle(possibleWalls)

    while (possibleWalls.length !== 0) {
        // @ts-ignore
        const [row, col] = possibleWalls.pop()


        if(validWall(row, col, grid)) {
            //We push the animation that it's a wall
            animations.push(...toggleWallAnimation(grid[row][col]))
            //We update the grid that its a wall
            grid[row][col].isWall = true
            //We update neighbouring nodes in that they are visited

        }
    }

    return animations
}

//We need to check that the possibleWall connects two disjoint trees,
//that we are putting a wall in the middle of empty nodes (new tree), or
//next to a wall that isn't touching another one (joining two trees)
function validWall(row: number, col: number, grid: NodeBackEnd[][]): boolean {
   let adjacents = 0

    // @ts-ignore
    for(const neighbor: NodeBackEnd of getAllAdjacent(grid[row][col], grid)) {
       if(neighbor.isWall)
           adjacents++
   }

   return adjacents < 2
}

