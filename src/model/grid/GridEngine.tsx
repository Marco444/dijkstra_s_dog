import {NodeBackEnd, NodeType, Point} from "./NodeEngine";
import {emptyNodeColor} from "../../components/colors";
import {re} from "mathjs";

import {AnimationType, Animation, Color, ImageAnimation} from "../animations/AnimationsEngine";

export function initializeGrid(columns: number, rows: number, start: Point, end: Point) {
    const grid = []

    for (let row = 0; row < rows; row++) {
        const currentRow = [];
        for (let col = 0; col < columns; col++) {
            currentRow.push(new NodeBackEnd(NodeType.Empty, row, col));
        }
        grid.push(currentRow);
    }

    grid[start.row][start.col] = new NodeBackEnd(NodeType.Start, start.row, start.col)
    grid[end.row][end.col] = new NodeBackEnd(NodeType.End, end.row, end.col)

    //new ImageAnimation(NodeType.Start, grid[start.row][start.col]).apply()

    return grid;
}

export function updateGrid(oldGrid: NodeBackEnd[][], columns: number, rows: number, start: Point, end: Point) {
    const grid = []

    for (let row = 0; row < rows; row++) {
        const currentRow = [];
        for (let col = 0; col < columns; col++) {
            if(oldGrid[row][col].isWall)
                currentRow.push(new NodeBackEnd(NodeType.Wall, row, col).toggle());
           else
               currentRow.push(new NodeBackEnd(NodeType.Empty, row, col));
        }
        grid.push(currentRow);
    }

    grid[start.row][start.col] = new NodeBackEnd(NodeType.Start, start.row, start.col)
    grid[end.row][end.col] = new NodeBackEnd(NodeType.End, end.row, end.col)

    return grid;
}

export function clearGrid(oldGrid: NodeBackEnd[][], columns: number, rows: number, start: Point, end: Point) {

    const grid = []

    for (let row = 0; row < rows; row++) {
        const currentRow = [];
        for (let col = 0; col < columns; col++) {
            if(oldGrid[row][col].isWall) {
                new Animation(AnimationType.WallNode, oldGrid[row][col]).apply()
                new Animation(Color.Empty, oldGrid[row][col]).apply()
            }
            new Animation(Color.Empty, oldGrid[row][col]).apply(); //We clear the colored nodes when didn't found end
            currentRow.push(new NodeBackEnd(NodeType.Empty, row, col));
        }
        grid.push(currentRow);
    }

    grid[start.row][start.col] = new NodeBackEnd(NodeType.Start, start.row, start.col)
    grid[end.row][end.col] = new NodeBackEnd(NodeType.End, end.row, end.col)

    return grid;

}

export function removeStartCoordinate(grid: NodeBackEnd[][], start: Point) {
    const newGrid = grid.slice()
    newGrid[start.row][start.col] = new NodeBackEnd(NodeType.Empty, start.row, start.col)
    return newGrid
}

//Really should be a better way, but thought had a major bug in the algorithm
//when building BFS and it was just this javascript working weird with arrays
export function getAdjacent(current: NodeBackEnd, grid: NodeBackEnd[][]): NodeBackEnd[] {

    const nodes: NodeBackEnd[] = []

    //UP
    let row = current.coords.row - 1
    let col = current.coords.col
    if(validCoordinate(row, col, grid))
        nodes.push(grid[row][col])

    //LEFT
    row = current.coords.row
    col = current.coords.col - 1
    if(validCoordinate(row, col, grid))
        nodes.push(grid[row][col])

    //DOWN
    row = current.coords.row + 1
    col = current.coords.col
    if(validCoordinate(row, col, grid))
        nodes.push(grid[row][col])

    //RIGHT
    row = current.coords.row
    col = current.coords.col + 1
    if(validCoordinate(row, col, grid))
        nodes.push(grid[row][col])

    return nodes
}

export function getAllAdjacent(current: NodeBackEnd, grid: NodeBackEnd[][]): NodeBackEnd[] {
    const nodes: NodeBackEnd[] = getAdjacent(current, grid)


    //UP-LEFT
    let row = current.coords.row - 1
    let col = current.coords.col - 1
    if(validCoordinate(row, col, grid))
        nodes.push(grid[row][col])

    //DOWN-LEFT
    row = current.coords.row + 1
    col = current.coords.col - 1
    if(validCoordinate(row, col, grid))
        nodes.push(grid[row][col])

    //DOWN-RIGHT
    row = current.coords.row + 1
    col = current.coords.col + 1
    if(validCoordinate(row, col, grid))
        nodes.push(grid[row][col])

    //UP-RIGHT
    row = current.coords.row - 1
    col = current.coords.col + 1
    if(validCoordinate(row, col, grid))
        nodes.push(grid[row][col])

    return nodes
}

function validCoordinate(row: number, col: number, grid: NodeBackEnd[][]): boolean {
    return !(row >= grid.length || row < 0 || col >= grid[0].length || col < 0)
}
