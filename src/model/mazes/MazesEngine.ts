import {NodeBackEnd, Point} from "../grid/NodeEngine";
import {Animation} from "../animations/AnimationsEngine";
import {getKruskalAnimations} from "./Kruskal";
import {getPrimAnimations} from "./Prim";

type getAnimationType = (grid: NodeBackEnd[][], start: Point, end: Point) => Animation[]

const primText = `
    PRIM starts from an empty canvas. It then starts from an empty node and randomly 
    fills wall such that every empty node has a wall as a neighbour. it does so building
    a tree at every step that is spanning (each wall adyacent to every empty node)`

const kruskalText = `
KRUSKAL starts from an empty canvas. It then starts from an empty node and randomly
fills wall such that every empty node has a wall as a neighbour. it does so building
a tree at every step that is spanning (each wall adyacent to every empty node)`

const customMazeText = `

CUSTOM maze lets you click and drag (or click and hover in trackpad) to create walls!
`

export class Maze {
    static Prim = new Maze(getPrimAnimations, "Prim", primText)
    static Kruskal = new Maze(getKruskalAnimations, "Kruskal", kruskalText)
    static Custom = new Maze(() => [], "Custom", customMazeText)

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