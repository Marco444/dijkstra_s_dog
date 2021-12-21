import {Stack} from "@mui/material";
import {SolveButton} from "./components/controllers/SolveButton";
import {useWindowSize} from "react-use";
import {AlgorithmMenu} from "./components/controllers/AlgorithmMenu";
import {Canvas} from "./components/viewer/Canvas";
import {MazesMenu} from "./components/controllers/MazesMenu";
import {useEffect, useState} from "react";
import {Algorithm} from "./model/algorithms/outils/AlgorithmsEngine";
import {Animation, AnimationType} from "./model/animations/AnimationsEngine";
import {Maze} from "./model/mazes/MazesEngine";
import {clearGrid, initializeGrid, removeStartCoordinate, updateGrid} from "./model/grid/GridEngine";
import {NodeBackEnd, NodeType, Point} from "./model/grid/NodeEngine";
import {SpeedSlider} from "./components/controllers/SpeedSlider";
import {getGridSelectionAnimations} from "./model/animations/gridSelectionAnimation";
import {getWallToggleAnimation} from "./model/animations/toggleWallAnimation";
import {emptyNodeColor} from "./components/colors";
import {ClearButton} from "./components/controllers/ClearButton";
import {getDijkstraAnimations} from "./model/algorithms/Dijkstra";
import {InformationBoxAlgorithm} from "./components/viewer/InformationBox";
import {getBfsAnimations} from "./model/algorithms/BFS";
import {InformationBoxMaze} from "./components/viewer/InformationBoxMaze";
import {getPrimAnimations} from "./model/mazes/Prim";
import {getKruskalAnimations} from "./model/mazes/Kruskal";

export const App = () => {
    const {height, width} = useWindowSize();

    const MAX_ANIMATION_SPEED = 100
    const [squareSize] = useState(24)
    const [animationSpeed, setAnimationSpeed] = useState(MAX_ANIMATION_SPEED * 0.5)
    const defaultAnimationSpeed = MAX_ANIMATION_SPEED * 0.5

    const [mousePressed, setMousePressed] = useState(false)
    const [algorithm, setAlgorithm] = useState(Algorithm.Bfs)
    const [isBusy, setIsBusy] = useState(false)

    const columns = width * 0.7 / squareSize
    const rows = height * 0.8 / squareSize
    const stackWidth = width * 0.15

    const [startCoordinate, setStartCoordinate] = useState(new Point(1, 3))
    const [endCoordinate] = useState(new Point(8, 10))

    const [startNodeSelected, setStartNodeSelected] = useState(false)

    const [maze, setMaze] = useState(Maze.Custom)

    let [grid, setGrid]: [NodeBackEnd[][], any] = useState([])

    ///////////////HANDLE BUILDING THE WALLS WITH THE MOUSE/////////////////
    const handleMouseDown = (row: number, col: number): void => {
        if (isBusy) return

        setMousePressed(true)

        if (startNodeSelected) {
            setStartCoordinate(new Point(row, col))
            setStartNodeSelected(false)
            setGrid(updateGrid(grid, columns, rows, new Point(row, col), endCoordinate)) //I NEED TO RE-INITALISE IT
            setMousePressed(false)

        } else if (col === startCoordinate.col && row === startCoordinate.row) {
            setStartNodeSelected(true) //We tell we have selected the start
            setGrid(removeStartCoordinate(grid, new Point(row, col)))
        } else {
            if (col !== startCoordinate.col || row !== startCoordinate.row)
                applyAnimations(getWallToggleAnimation(grid, row, col), animationSpeed)
        }


    }

    const handleMouseEnter = (row: number, col: number): void => {
        if (isBusy) return

        if (startNodeSelected) {
            setTimeout(() => {
                new Animation(AnimationType.SelectedNode, grid[row][col]).apply()
            }, 100) //we animate as we pass through nodes
        } else {
            if (!mousePressed) return;
            if (col !== startCoordinate.col || row !== startCoordinate.row)
                applyAnimations(getWallToggleAnimation(grid, row, col), animationSpeed)
        }
    }

    const handleMouseUp = (row: number, col: number): void => {
        setMousePressed(false)
    }

    /////////////HANDLERS FOR THE CONTROLLERS//////////////////////

    function handleSolveButton(): void {
        setIsBusy(true)
        setGrid(updateGrid(grid, columns, rows, startCoordinate, endCoordinate)) //I NEED TO RE-INITALISE IT
        const startNode = grid[startCoordinate.row][startCoordinate.col]
        const endNode = grid[endCoordinate.row][endCoordinate.col]

        applyAnimations(algorithm.getAnimations(grid, startNode, endNode), animationSpeed)
    }

    const handleAlgorithmSelected = (algorithm: Algorithm): void => {
        console.log('Algorithm set is: ' + algorithm.name)
        setAlgorithm(algorithm)
    }

    const handleMazeSelected = (newMaze: Maze): void => {
        setMaze(newMaze)
        applyAnimations(getPrimAnimations(grid, startCoordinate, endCoordinate), animationSpeed)
    }

    const handleAnimationSpeed = (event: any, number: number): void => {
        //setIsBusy(true)
        setAnimationSpeed(MAX_ANIMATION_SPEED - number)
        //applyAnimations(getGridSelectionAnimations(grid), 0)
    }

    const handleCleanButton = (): void => {
        setGrid(clearGrid(grid, columns, rows, startCoordinate, endCoordinate))
    }

    /////////////HANDLER FOR THE ANIMATIONS/////////////////////////
    function applyAnimations(animations: Animation[], speed: number): void {
        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                animations[i].apply()
                if (i === animations.length - 1) setIsBusy(false)
            }, speed * i)
        }

    }

    ///////////useEffects to animate when we interact with controllers//////
    useEffect(() => {
        setGrid(initializeGrid(columns, rows, startCoordinate, endCoordinate))
    }, [])

    return (
        <Stack direction="row">
            <Stack direction="column"
                   sx={{
                       width: stackWidth,
                       margin: 5
                   }}>

                <Stack direction={"row"}>
                    <ClearButton width={stackWidth / 2} clicked={handleCleanButton.bind(this)} isBusy={isBusy}/>
                    <SolveButton width={stackWidth / 2} clicked={handleSolveButton.bind(this)} isBusy={isBusy}/>
                </Stack>

                <SpeedSlider minSpeed={defaultAnimationSpeed / 20} maxSpeed={MAX_ANIMATION_SPEED}
                             defaultSpeed={defaultAnimationSpeed} width={stackWidth}
                             handleSpeedSlider={handleAnimationSpeed.bind(this)} isBusy={isBusy}/>

                <MazesMenu width={stackWidth} clicked={handleMazeSelected.bind(this)} isBusy={isBusy}
                           mazeSelected={maze}/>
                <AlgorithmMenu width={stackWidth} isBusy={isBusy} defaultAlgorithm={algorithm}
                               clicked={handleAlgorithmSelected.bind(this)}/>

                <InformationBoxAlgorithm  algorithm={algorithm} width={stackWidth}/>
                <InformationBoxMaze width={stackWidth} maze={maze} />



            </Stack>

            <Canvas grid={grid} squareSize={squareSize}
                    mouseDown={handleMouseDown.bind(this)}
                    mouseEnter={handleMouseEnter.bind(this)}
                    mouseUp={handleMouseUp.bind(this)}
                    mousePressed={() => setMousePressed(prevState => !prevState)}/>
        </Stack>
    );
}


