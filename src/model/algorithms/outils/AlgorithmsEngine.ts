import {Animation} from "../../animations/AnimationsEngine";
import {getDijkstraAnimations} from "../Dijkstra";
import {NodeBackEnd, Point} from "../../grid/NodeEngine";
import {getBfsAnimations} from "../BFS";
import {getDfsAnimations} from "../DFS";
import {getBidirectionalBFSAnimations} from "../BiderectionalBfs";

type getAnimationType = (grid: NodeBackEnd[][], startNode: NodeBackEnd, endNode: NodeBackEnd) => Animation[]

const dijkstraText =
    `
     Dijkstra's picks the unvisited vertex with the lowest distance (closest vertex), calculates
     the distance through it to each unvisited neighbor, and updates the 
     neighbor's distance if smaller. It repeats this until it finds the end-node.
    Its complexity varies upon the way we store the closest nodes, being the best one
    O(lgV*V + E) where V are the vertices and E the edges. It works with WEIGHTED graphs
    `

const AstarText = ``

const BellmanFordText = ``

const BfsText =
`
    Breadth First Search (BFS) is set to initialise at a vertex and then moves on to traverse all the nodes
    with the current height before traversing all the others with next depth level. Because in the worst case
    it traverses the whole graph, its complexity is O(V + E) where V are the vertices and E are the edges 
    of the graph. It works with UN-WEIGHTED graphs
`

const DfsText =
`
    Depth First Search (DFS) works analogously to BFS but traverses in order of the deepest vertex possible at every
    step, before reaching it and backtracking. Like BFS it works with UN-WEIGHTED graphs, and traverses the whole
    graph in worst case so its complexity is O(V + E). Contrary to BFS, it DOESN'T GUARANTEE shortest path
`

const BidirectionalBFSText =
`
   Bidirectional BFS works by running two BFS simultaneously, one starting from the dog and another starting
   from the steak. It has the same limitations and BFS but in practise it's usually quite faster due to reducing
   the total number of traversed vertices. 
`

export class Algorithm {

    static Dijkstra = new Algorithm(getDijkstraAnimations, "Dijkstra", dijkstraText, true)
    static Bfs = new Algorithm(getBfsAnimations, "BFS", BfsText, false)
    static Dfs = new Algorithm(getDfsAnimations, "DFS", DfsText, false)
    static BidirectionalBFS = new Algorithm(getBidirectionalBFSAnimations, "BFS*", BidirectionalBFSText, false)

    public readonly getAnimations: getAnimationType
    public readonly name: string
    public readonly text: string
    public readonly isWeighted: boolean


    constructor(getAnimation: any, name: string, text: string, isWeighted: boolean) {
        this.getAnimations = getAnimation
        this.name = name
        this.text = text
        this.isWeighted = isWeighted
    }



}


