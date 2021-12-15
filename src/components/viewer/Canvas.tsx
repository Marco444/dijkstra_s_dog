import {Box} from "@mui/material";
import {NodeBackEnd} from "../../model/grid/NodeEngine";
import {Node} from "./Node"


interface CanvasProps {
    grid: NodeBackEnd[][],
    squareSize: number,
    mouseDown: (row: number, col: number) => any
    mouseEnter: (row: number, col: number) => any
    mouseUp: (row: number, col: number) => any
}

export const Canvas = ({grid, squareSize, mouseDown, mouseEnter, mouseUp}: CanvasProps) => {
    return (
        <Box sx={{
            margin: 5,
            marginLeft: 2
        }}>
            {grid.map((row, rowIdx) => {
                return (
                    <div key={rowIdx} style={{fontSize: 0}}>
                        {row.map((node, colIdx) => {
                            const prop = {color: node.nodeType.color, size: squareSize, row: rowIdx, col: colIdx,
                                          mouseEnter: mouseEnter, mouseUp: mouseUp, mouseDown: mouseDown}
                            return (
                                <Node {...prop} >
                                </Node>
                            );
                        })}
                    </div>
                );
            })}
        </Box>
    );
}