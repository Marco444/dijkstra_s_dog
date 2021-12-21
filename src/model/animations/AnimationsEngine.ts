import {NodeBackEnd, NodeType} from "../grid/NodeEngine";

import './AnimationsEngine.css'
import {
    emptyNodeColor,
    shortestPathColor,
    solveButtonColor,
    speedSliderColor, unreachableColor,
    wallColor
} from "../../components/colors";


export class AnimationType {
    static ReachedNode: AnimationType = new AnimationType(8000, solveButtonColor)
    static SelectedNode: AnimationType = new AnimationType(1000, speedSliderColor)
    static WallNode: AnimationType = new AnimationType(100, wallColor)
    static ShortesPathNode: AnimationType = new AnimationType(8000, shortestPathColor)
    static Unreachable: AnimationType = new AnimationType(1000, unreachableColor)

    private readonly duration: number
    private readonly color: string

    constructor(duration: number, color: string) {
        this.duration = duration
        this.color = color
    }

    apply(node: any) {
        node.animate(
           {backgroundColor: [this.color, emptyNodeColor], scale: [0.3, 1]}
        , this.duration)
    }
}

export class Color {
    static Wall: Color = new Color(wallColor)
    static ShortestPath: Color = new Color(shortestPathColor)
    static Empty: Color = new Color(emptyNodeColor)
    static Unreachable: Color = new Color(unreachableColor)

    private readonly color: string

    constructor(color: string) {
        this.color = color
    }

    apply(node: any) {
        node.style.background = this.color
    }
}

export class ImageAnimation {

    private type: NodeType
    private node: NodeBackEnd

    constructor(type: NodeType, node: NodeBackEnd) {
        this.node = node
        this.type = type
    }

    apply() {
        // @ts-ignore
        document.getElementById(`row${this.node.coords.row}col${this.node.coords.col}`).appendChild(this.type.imgs[0])
    }

}

export class Animation {

    private type: AnimationType | Color
    public node: NodeBackEnd

    constructor(type: AnimationType | Color, node: NodeBackEnd) {
        this.type = type
        this.node = node
    }

    apply() {
        // @ts-ignore
        this.type.apply(document.getElementById(`row${this.node.coords.row}col${this.node.coords.col}`))
    }

}

export function toggleWallAnimation(node: NodeBackEnd) {
    return [new Animation(AnimationType.WallNode, node), new Animation(Color.Wall, node)]
}

export function noSolutionAnimations(animations: Animation[]): Animation[] {

    const noSolutionsAnimations: Animation[] = []

    for (let i = 0; i < animations.length; i++) {
       noSolutionsAnimations.push(new Animation(AnimationType.Unreachable, animations[i].node))
       noSolutionsAnimations.push(new Animation(Color.Unreachable, animations[i].node))
    }

    return noSolutionsAnimations
}