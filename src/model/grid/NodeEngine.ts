

export class NodeType {

    static Empty: NodeType = new NodeType("rgba(243,244,255,0.98)", () => NodeType.Wall)
    static Start: NodeType = new NodeType("#6679B9F9", () => NodeType.Start)
    static End: NodeType = new NodeType("#d58787", () => NodeType.End)
    static Wall: NodeType = new NodeType("rgba(3,30,101,0.98)",() => NodeType.Wall)

    public color: string
    public toggled: () => NodeType

    constructor(color: string, toggled: () => NodeType) {
        this.color = color;
        this.toggled = toggled
    }
}

export class NodeBackEnd {
    public nodeType: NodeType

    constructor(nodeType: NodeType) {
        this.nodeType = nodeType
    }

    toggleWall(): void {
        this.nodeType = this.nodeType.toggled()
    }
}

