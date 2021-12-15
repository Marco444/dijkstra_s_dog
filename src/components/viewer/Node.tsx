
interface NodeProps {
    color: string,
    size: number, row: number, col: number,
    mouseDown: (row: number, col: number) => any
    mouseEnter: (row: number, col: number) => any
    mouseUp: (row: number, col: number) => any
}

export const Node = ({color, size, mouseDown, mouseEnter, mouseUp, row, col} : NodeProps) => {
    return(
        <div style={{
            width: `${size}px`,
            height: `${size}px`,
            outline: `1px solid rgba(0, 43, 162, 0.98)`,
            display: `inline-block`,
            background: `${color}`
        }}  className="node"
            onMouseDown={() => mouseDown(row, col)}
            onMouseEnter={() => mouseEnter(row, col)}
            onMouseUp={() => mouseUp(row, col)}
        >  </div>
    );
}