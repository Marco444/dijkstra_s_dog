import {Animation} from "../../animations/AnimationsEngine";
import {getDijkstraAnimations} from "../Dijkstra";
import {NodeBackEnd, Point} from "../../grid/NodeEngine";
import {getAstarAnimations} from "../A*";
import {getBfsAnimations} from "../BFS";
import {getDfsAnimations} from "../DFS";

type getAnimationType = (grid: NodeBackEnd[][], startNode: NodeBackEnd, endNode: NodeBackEnd) => Animation[]

const dijkstraText =
    `
     Dijkstra's picks the unvisited vertex with the lowest distance (closest vertex), calculates
     the distance through it to each unvisited neighbor, and updates the 
     neighbor's distance if smaller. It repeats this until it finds the end-node.
    Its complexity varies upon the way we store the closest nodes, being the best one
    O(lgV*V + E) where V are the vertices and E the edges.
    `

const AstarText = ``

const BfsText = ``

const DfsText = ``

export class Algorithm {

    static Dijkstra = new Algorithm(getDijkstraAnimations, "Dijkstra", dijkstraText)
    static Astar = new Algorithm(getAstarAnimations, "A*", AstarText)
    static Bfs = new Algorithm(getBfsAnimations, "BFS", BfsText)
    static Dfs = new Algorithm(getDfsAnimations, "DFS", DfsText)

    public readonly getAnimations: getAnimationType
    public readonly name: string
    public readonly text: string

    constructor(getAnimation: any, name: string, text: string) {
        this.getAnimations = getAnimation
        this.name = name
        this.text = text
    }

}


