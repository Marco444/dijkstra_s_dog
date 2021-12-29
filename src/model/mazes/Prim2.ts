import {MazeNodeBackEnd, NodeBackEnd, NodeType, Point} from "../grid/NodeEngine";
import {Animation, Color, toggleWallAnimation, untoggleWallAnimation} from "../animations/AnimationsEngine";
import {getAdjacent, getAllAdjacent, validCoordinate} from "../grid/GridEngine";
import {randomIntFromInterval} from "./outils";
import {Adjacent} from "../grid/NodeEngine";


export function getPrimAnimations2(grid: NodeBackEnd[][], start: Point, end: Point): Animation[] {

    const animations: Animation[] = []
    let possiblePath: MazeNodeBackEnd[] = []

    //We build our graph representation (which is different when we are working
    //with mazes than we are working with pathfinder algorithms)
    buildGraphRepresentation(grid)

    //Push the first node as an empty node and move from there
    possiblePath.push(new MazeNodeBackEnd(grid[0][0].nodeType, 0, 0 ))

    //We traverse until we have no more possible empty nodes
    while (possiblePath.length !== 0) {

        //We get the last element in the path
        const current: MazeNodeBackEnd | undefined = possiblePath.pop()
        if(current === undefined) return [];

        //We get all adjacents vertices and their respective edjes
        const adjacentPairs: Adjacent[] = getAdjacentMSPPairs(current, grid)

        console.log(JSON.parse(JSON.stringify(current)))
        console.log(JSON.parse(JSON.stringify(adjacentPairs)))

        //We update the possible empty and add the new empty both to the grid and animations
        //as well as pushing the other adjacent vertices to possiblePath
        if (adjacentPairs.length > 0)
                updatePath(possiblePath, current, adjacentPairs, animations, grid)

    }

    return animations
}


/*
Returns an array with all the neighbours (UP, DOWN, LEFT, RIGHT) of a vertex
which happen to be a new path of traversed, that is they haven't been visited
and the edge they share with the vertex is not a wall.
*/
function getAdjacentMSPPairs(current: MazeNodeBackEnd, grid: NodeBackEnd[][]): Adjacent[] {
    return getAdjacentPairs(current, grid).filter(adjacent => !adjacent.vertex.visitedIs())
}

/*
* We receive the list of possible paths we can take, the current vertex,
* a list of its adjacents and others. We select a vertex to include in our path
* and push the others into the possiblePath
* */

function updatePath(possiblePath: MazeNodeBackEnd[], current: MazeNodeBackEnd, adjacent: Adjacent[],
                    animations: Animation[], grid: NodeBackEnd[][]): void {

    //We find the new empty node at random
    const randomIdx: number = randomIntFromInterval(0, adjacent.length - 1)
    const spanned: Adjacent = adjacent[randomIdx]

    //we mark the vertex as visited
    grid[spanned.vertex.coords.row][spanned.vertex.coords.col].visited()

    spanned.vertex.visitedIs()

    //We untoggle the wall as the vertex is part of the path
    animations.push(...untoggleWallAnimation(spanned.edge))
    spanned.edge.isWall = false
    grid[spanned.edge.coords.row][spanned.edge.coords.col].isWall = true


    //We now need to push all other adjacent as well as the previous
    for(let i = 0; i < adjacent.length; i++) {
        if(i !== randomIdx) {
            //adjacent[i].vertex.previousAdjacent = current.previousAdjacent
            //possiblePath.push(adjacent[i].vertex)
        }
    }


    //spanned.vertex.previous = current
    possiblePath.push(spanned.vertex)


    //If we dont have a previous then it means we need to bind to it because
    //the spanned vertex is a disconnected vertex, so we push a wall animation
    //to a visited neighbor of current
    //if(current.previousAdjacent.edge === MazeNodeBackEnd.None) {
        //@ts-ignore
        //animations.push(...untoggleWallAnimation(current.previousAdjacent.edge))
        //current.previousAdjacent.vertex.visited()
     //   console.log('disconected connected')
    //}
}


/*
* We update the grid with walls in every odd row and odd-odd pair
* of coordenates, such that we build our desired graph representation
* */
function buildGraphRepresentation(grid: NodeBackEnd[][]) {
    const animations = []

    for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < grid[0].length - 1; j++) {
            if(i % 2 === 1 || (j % 2 === 1 && i % 2 === 0)){
                animations.push(...toggleWallAnimation(grid[i][j]))
                grid[i][j].isWall = true
            }
            grid[i][j].unVisited()
        }
    }

    animations.map(animation => animation.apply())
}


/*
* We return list of objects of adjacent pair, the vertex adjacent and the
* edge (or wall) that connects both
* */
export function getAdjacentPairs(current: MazeNodeBackEnd, grid: NodeBackEnd[][]): Adjacent[] {

    const nodes: Adjacent[] = []

    //UP
    let row = current.coords.row - 2
    let col = current.coords.col
    if(validCoordinate(row, col, grid))
        nodes.push({vertex: new MazeNodeBackEnd(grid[row][col].nodeType, row, col),
                    edge: new MazeNodeBackEnd(grid[row + 1][col].nodeType, row + 1, col)})

    //LEFT
    row = current.coords.row
    col = current.coords.col - 2
    if(validCoordinate(row, col, grid))
        nodes.push({vertex: new MazeNodeBackEnd(grid[row][col].nodeType, row, col),
            edge: new MazeNodeBackEnd(grid[row][col + 1].nodeType, row, col + 1)})


    //DOWN
    row = current.coords.row + 2
    col = current.coords.col
    if(validCoordinate(row, col, grid))
        nodes.push({vertex: new MazeNodeBackEnd(grid[row][col].nodeType, row, col),
            edge: new MazeNodeBackEnd(grid[row - 1][col].nodeType, row - 1, col)})


    //RIGHT
    row = current.coords.row
    col = current.coords.col + 2
    if(validCoordinate(row, col, grid))
        nodes.push({vertex: new MazeNodeBackEnd(grid[row][col].nodeType, row, col),
            edge: new MazeNodeBackEnd(grid[row][col - 1].nodeType, row, col -1)})



    return nodes
}
