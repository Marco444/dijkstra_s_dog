import {NodeBackEnd, Point} from "../grid/NodeEngine";
import {Animation, toggleWallAnimation} from "../animations/AnimationsEngine";


export function getRecursiveDivision(grid: NodeBackEnd[][], start: Point, end: Point): Animation[] {
    const animations: Animation[] = []

    addContour(grid, animations)

    recursiveDivision(true, 1, grid[0].length - 2, 1, grid.length - 2, animations, grid);

    return animations
}


function recursiveDivision(h: boolean, minX: number, maxX: number, minY: number, maxY: number, animations: Animation[], grid:NodeBackEnd[][]) {
    if (h) {

        if (maxX - minX < 2) return;


        const y = Math.floor(randomNumber(minY, maxY) / 2) * 2;
        addHWall(minX, maxX, y, grid, animations);

        recursiveDivision(!h, minX, maxX, minY, y - 1, animations, grid);
        recursiveDivision(!h, minX, maxX, y + 1, maxY, animations, grid);
    } else {

        if (maxY - minY < 2) return;


        const x = Math.floor(randomNumber(minX, maxX) / 2) * 2;
        addVWall(minY, maxY, x, grid, animations);

        recursiveDivision(!h, minX, x-1, minY, maxY, animations, grid);
        recursiveDivision(!h, x + 1, maxX, minY, maxY, animations, grid);
    }
}

function addHWall(minX: number, maxX: number, y: number, grid: NodeBackEnd[][], animations: Animation[]) {
    const hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1;
    grid[y][hole].isVisited = true

    for (let i = minX; i <= maxX; i++) {
        if (i !== hole && !grid[y][i].isVisited) {
            grid[y][i].isWall = true
            animations.push(...toggleWallAnimation(grid[y][i]))
        }
    }
}

function addVWall(minY: number, maxY: number, x: number, grid: NodeBackEnd[][], animations: Animation[]) {
    const hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;
    grid[hole][x].isVisited = true

    for (let i = minY; i <= maxY; i++) {
        if (i !== hole && !grid[i][x].isVisited) {
            grid[i][x].isWall = true
            animations.push(...toggleWallAnimation(grid[i][x]))
        }
    }
}

function addContour(grid: NodeBackEnd[][], animations: Animation[]) {
    for (let i = 0; i < grid.length; i++) {
        if (i === 0 || i === (grid.length - 1)) {
            for (let j = 0; j < grid[0].length; j++) {
                grid[i][j].isWall = true;
                animations.push(...toggleWallAnimation(grid[i][j]))
            }
        } else {
            grid[i][0].isWall = true;
            animations.push(...toggleWallAnimation(grid[i][0]))

            grid[i][grid[0].length - 1].isWall = true;
            animations.push(...toggleWallAnimation(grid[i][grid[0].length - 1]))
        }
    }
}
function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

