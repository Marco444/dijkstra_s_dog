import {ReactComponent as Dog} from "../imgs/dog.svg";
import {ReactComponent as Steak} from "../imgs/steak.svg";
import {ReactComponent as Crumb} from "../imgs/crumbs.svg";

import {NodeType} from "../../model/grid/NodeEngine";

interface NodeProps {
    color: string,
    size: number, row: number, col: number,
    mouseDown: (row: number, col: number) => any
    mouseEnter: (row: number, col: number) => any
    mouseUp: (row: number, col: number) => any
    nodeType: NodeType
}

export const Node = ({color, size, mouseDown, mouseEnter, mouseUp, row, col, nodeType } : NodeProps) => {
    return(
        <div style={{
            width: `${size}px`,
            height: `${size}px`,
            display: `inline-block`,
            background: `${color}`,
        }}  className="node"
            onMouseDown={() => mouseDown(row, col)}
            onMouseEnter={() => mouseEnter(row, col)}
            onMouseUp={() => mouseUp(row, col)}
             id={`row${row}col${col}`}
        >
            { nodeType === NodeType.Start && <Dog width={size} height={size} /> }
            { nodeType === NodeType.End && <Steak width={size} height={size} /> }
            { nodeType === NodeType.Crumb && <Crumb width={size} height={size}/> }
        </div>
    );
}