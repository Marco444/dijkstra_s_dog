import {NodeBackEnd, Point} from "../grid/NodeEngine";
import {Animation} from "../animations/AnimationsEngine";
import {getRecursiveDivision} from "./RecursiveDivision";
import {getPrimAnimations2} from "./Prim2";
import {getRandomMazeAnimations} from "./random";

type getAnimationType = (grid: NodeBackEnd[][], start: Point, end: Point) => Animation[]

const primText = `
    PRIM starts from an empty canvas. It then starts from an empty node and randomly 
    fills wall such that every empty node has a wall as a neighbour. it does so building
    a tree at every step that is spanning (each wall adyacent to every empty node)`


const customMazeText =
    `
        The CUSTOM Maze is a blank canvas that lets you create mazes & patterns by
        clicking on the canvas and dragging!
    `

const recursiveDivisionText =
    `
        RECURSIVE Maze works by recursively dividing the canvas either horizontally or vertically,
        by adding a wall with a hole, until it can't divide the portion of the canvas any more
        in which point it backtracks and continues. It guarantees the existance of a solution to
        the maze
    `

const randomMazeText =
    ` The RANDOM maze  works as a variation of kruskal algorithm but it doesnt
      generate a minimum spanning tree (there doesn't exist a single connected path of empty nodes
      that passes through all the walls) `

export class Maze {
    static Prim = new Maze(getPrimAnimations2, "Prim", primText)
    static Custom = new Maze(() => [], "Custom", customMazeText)
    static Random = new Maze( getRandomMazeAnimations, "Random", randomMazeText)
    static RecursiveDivison = new Maze(getRecursiveDivision, "Recursive", recursiveDivisionText)

    public readonly animations: getAnimationType
    public readonly name: string
    public readonly text: string

    constructor(animations: getAnimationType, name: string, text: string) {
        this.animations = animations
        this.name = name
        this.text = text
    }

    create(): NodeBackEnd[][] {
        return []
    }
}