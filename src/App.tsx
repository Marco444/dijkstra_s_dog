import {Stack} from "@mui/material";
import {SolveButton} from "./components/controllers/SolveButton";
import {useWindowSize} from "react-use";
import {AlgorithmMenu} from "./components/controllers/AlgorithmMenu";
import {Canvas} from "./components/viewer/Canvas";
import {MazesMenu} from "./components/controllers/MazesMenu";
import {useEffect, useState} from "react";
import {Algorithm} from "./model/algorithms/AlgorithmsEngine";
import {Animation} from "./model/animations/AnimationsEngine";
import {Maze} from "./model/mazes/MazesEngine";
import {initializeGrid, toggleWallGrid} from "./model/grid/GridEngine";

export const App = () => {
    const {height, width} = useWindowSize();

    const [squareSize, setSquareSize] = useState(30)
    const [mousePressed, setMousePressed] = useState(false)
    const [algorithm, setAlgorithm] = useState(Algorithm.Dijkstra)

    const columns = width * 0.7 / squareSize
    const rows = height * 0.7 / squareSize
    const stackWidth = width * 0.15


    const startNode = [Math.floor(rows/ 9), Math.floor( columns / 3)]
    const endNode = [Math.floor(rows/ 3), Math.floor(columns / 9)]

    const [grid, setGrid] = useState(initializeGrid(columns, rows, startNode, endNode))


    ///////////////HANDLE BUILDING THE WALLS WITH THE MOUSE/////////////////
    const handleMouseDown = (row: number, col: number): void => {
        setGrid(toggleWallGrid(grid, row, col))
        setMousePressed(true)
    }

    const handleMouseEnter = (row: number, col: number): void => {
        if(!mousePressed) return
        setGrid(toggleWallGrid(grid, row, col))
    }

    const handleMouseUp = (row: number, col: number): void => {
        setMousePressed(false)
    }

    /////////////HANDLERS FOR THE CONTROLLERS//////////////////////

    const handleSolveButton = (): void => {
        applyAnimations(algorithm.getAnimations(grid, startNode, endNode))
    }

    const handleAlgorithmSelected = (algorithm: Algorithm): void => {
        setAlgorithm(algorithm)
    }

    const handleMazeSelected = (maze: Maze): void => {
        //updateWith(maze.create())
    }

    /////////////HANDLER FOR THE ANIMATIONS/////////////////////////
    const applyAnimations = (animations: Animation[]): void => {

    }

    return (
        <Stack direction="row">
            <Stack direction="column"
                   sx={{
                       width: stackWidth,
                       margin: 5
                   }}>

                <SolveButton width={stackWidth} clicked={handleSolveButton.bind(this)}/>
                <AlgorithmMenu width={stackWidth} clicked={handleAlgorithmSelected.bind(this)}/>
                <MazesMenu width={stackWidth} clicked={handleMazeSelected.bind(this)} />
            </Stack>

            <Canvas grid={grid} squareSize={squareSize}
                    mouseDown={handleMouseDown.bind(this)}
                    mouseEnter={handleMouseEnter.bind(this)}
                    mouseUp={handleMouseUp.bind(this)}
            />
        </Stack>
    );
}


