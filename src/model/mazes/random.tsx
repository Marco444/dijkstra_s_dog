import {NodeBackEnd, Point} from "../grid/NodeEngine";
import {Animation, toggleWallAnimation} from "../animations/AnimationsEngine";
import {getAllAdjacent} from "../grid/GridEngine";

/*export function getRandomMazeAnimations(grid: NodeBackEnd[][], start: Point, end: Point): Animation[] {

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
    const ans = false
    let adjacents = 0

    // @ts-ignore
    for(const neighbor: NodeBackEnd of getAllAdjacent(grid[row][col], grid)) {
        if(neighbor.isWall)
            adjacents++
    }

    return adjacents < 2
}

// Function puts all possible walls, and then returns the
//walls put
function setPossibleWalls(grid: NodeBackEnd[][]): number[][] {
    const nodes = []
    // const animations = []

    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[0].length; j++) {
            // if( (isLimitCanvas(i, j, grid) || isInnerWall(i, j)) && !isStartEnd(i, j, grid)) {
            //     animations.push(...toggleWallAnimation(grid[i][j]))
            nodes.push([i, j])
            // }
        }
    }

    // animations.map( animation => animation.apply())

    return nodes
}

function shuffle(array: number[][]) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
*/