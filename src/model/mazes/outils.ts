// Function puts all possible walls, and then returns the
//walls put
import {NodeBackEnd} from "../grid/NodeEngine";

export function setPossibleWalls(grid: NodeBackEnd[][]): number[][] {
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

export function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffle(array: number[][]) {
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
