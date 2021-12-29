import {Box} from "@mui/material";
import {NodeBackEnd} from "../../model/grid/NodeEngine";
import {Node} from "./Node"


interface CanvasProps {
    grid: NodeBackEnd[][],
    squareSize: number,
    mouseDown: (row: number, col: number) => any
    mouseEnter: (row: number, col: number) => any
    mouseUp: (row: number, col: number) => any
    mousePressed: () => any
}

export const Canvas = ({grid, squareSize, mouseDown, mouseEnter, mouseUp, mousePressed}: CanvasProps) => {
    return (
        <Box sx={{
            margin: 1,
            marginLeft: 2,
            outline: `1px solid rgba(0, 43, 162, 0.98)`,
        }}>
            {grid.map((row, rowIdx) => {
                return (
                    <div key={rowIdx} style={{fontSize: 0}}>
                        {row.map((node, colIdx) => {
                            const prop = {color: node.color, size: squareSize, row: node.coords.row,
                                          col: node.coords.col, mouseIsPressed: mousePressed,
                                          mouseEnter: mouseEnter, mouseUp: mouseUp, mouseDown: mouseDown,
                                          key: colIdx, nodeType: node.nodeType}
                            return (
                                <Node {...prop}>
                                </Node>
                            );
                        })}
                    </div>
                );
            })}
        </Box>
    );
}