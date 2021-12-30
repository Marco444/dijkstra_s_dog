import {emptyNodeColor} from "../../components/colors";

export class NodeType {

    static Empty: NodeType = new NodeType(emptyNodeColor)
    static Start: NodeType = new NodeType(emptyNodeColor)
    static End: NodeType = new NodeType(emptyNodeColor)
    static Wall: NodeType = new NodeType("rgba(3,30,101,0.98)")
    static None: NodeType = new NodeType("")

    public color: string


    constructor(color: string) {
        this.color = color;

    }
}

export class Point {
    public row: number
    public col: number

    constructor(row: number, col: number) {
        this.col = col
        this.row = row
    }
}



export class NodeBackEnd {

    static None = new NodeBackEnd(NodeType.None, -1, -1)

    public nodeType: NodeType
    public isVisited: boolean
    public distance: number
    public previous: NodeBackEnd
    public coords: Point
    public isWall: boolean
    public color: string
    public parent: string

    constructor(nodeType: NodeType, row: number, col: number) {
        this.parent = ""
        this.nodeType = nodeType
        this.isVisited = false
        this.distance = Infinity
        this.previous =  NodeBackEnd.None
        this.coords = new Point(row, col)
        this.isWall = nodeType === NodeType.Wall
        this.color = nodeType.color
    }

    toggle() {
        this.isWall = true
        return this
    }

    visitedIs() {
        return this.isVisited
    }

    visited() {
        this.isVisited = true
    }

    unVisited() {
        this.isVisited = false
    }

}


export interface Adjacent {
    edge: MazeNodeBackEnd,
    vertex: MazeNodeBackEnd,
}

export class MazeNodeBackEnd extends NodeBackEnd {

    static None = new MazeNodeBackEnd(NodeType.None, -1, -1)

    public previousAdjacent: Adjacent


    constructor(nodeType: NodeType, row: number, col: number) {
        super(nodeType, row, col)
        this.previousAdjacent = {edge: MazeNodeBackEnd.None, vertex: MazeNodeBackEnd.None}
    }

}


export class AStarNode extends NodeBackEnd{

    public g: number
    public f: number
    public h: number
    public closed: boolean

    constructor(node: NodeBackEnd) {
        super(node.nodeType, node.coords.row, node.coords.col);
        this.g = this.f = this.h = 0
        this.closed = false
    }

}