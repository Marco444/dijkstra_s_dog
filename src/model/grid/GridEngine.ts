import {NodeBackEnd, NodeType} from "./NodeEngine";


export function initializeGrid(columns: number, rows: number, startNode: number[], endNode: number[]) {
    const grid = []

    for (let row = 0; row < rows; row++) {
        const currentRow = [];
        for (let col = 0; col < columns; col++) {
            currentRow.push(new NodeBackEnd(NodeType.Empty));
        }
        grid.push(currentRow);
    }

    grid[startNode[0]][startNode[1]] = new NodeBackEnd(NodeType.Start)
    grid[endNode[0]][endNode[1]] = new NodeBackEnd(NodeType.End)

    return grid;
}


export function toggleWallGrid(grid: any, row: number, col: number) {
    const newGrid = grid.slice();
    newGrid[row][col].toggleWall();
    return newGrid;
}


