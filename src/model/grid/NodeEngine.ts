import {AnimationType, Animation} from "../animations/AnimationsEngine";
import {im} from "mathjs";
import {emptyNodeColor} from "../../components/colors";

export class NodeType {

    static Empty: NodeType = new NodeType(emptyNodeColor, () => NodeType.Wall, "")
    static Start: NodeType = new NodeType(emptyNodeColor, () => NodeType.Start, "../../../public/dog.png")
    static End: NodeType = new NodeType(emptyNodeColor, () => NodeType.End, "")
    static Wall: NodeType = new NodeType("rgba(3,30,101,0.98)",() => NodeType.Wall, "")
    static None: NodeType = new NodeType("", () => NodeType.None, "")

    public color: string
    public toggled: () => NodeType
    public imgs: any

    constructor(color: string, toggled: () => NodeType, imgSrc: string) {
        this.color = color;
        this.toggled = toggled
        this.imgs = new Array(2)
        this.imgs[0] = new Image()
        this.imgs[0].src = imgSrc
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

    constructor(nodeType: NodeType, row: number, col: number) {
        this.nodeType = nodeType
        this.isVisited = false
        this.distance = Infinity
        this.previous =  NodeBackEnd.None
        this.coords = new Point(row, col)
        this.isWall = false
        this.color = nodeType.color
    }

    toggle() {
        this.isWall = true
        return this
    }

}


