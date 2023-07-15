import { Stack } from "@mui/material";
import { SolveButton } from "./components/controllers/SolveButton";
import { AlgorithmMenu } from "./components/controllers/AlgorithmMenu";
import { Canvas } from "./components/viewer/Canvas";
import { MazesMenu } from "./components/controllers/MazesMenu";
import { useEffect, useState } from "react";
import { Animation, AnimationType } from "./model/animations/AnimationsEngine";
import { Maze } from "./model/mazes/MazesEngine";
import {
  clearGrid,
  initializeGrid,
  removeStartEndCoordinate,
  updateGrid,
} from "./model/grid/GridEngine";
import { NodeBackEnd, NodeType, Point } from "./model/grid/NodeEngine";
import { SpeedSlider } from "./components/controllers/SpeedSlider";
import { getWallToggleAnimation } from "./model/animations/toggleWallAnimation";
import { ClearButton } from "./components/controllers/ClearButton";
import { InformationBoxAlgorithm } from "./components/viewer/InformationBox";
import { InformationBoxMaze } from "./components/viewer/InformationBoxMaze";
import { WeightedMaze } from "./components/controllers/weightedMazeOption";
import getElevationAnimation from "./model/mazes/elevationAnimations";
import { UnweightedAlgorithm } from "./components/viewer/unweightedAlgorithm";
import { Algorithm } from "./model/algorithms/outils/AlgorithmsEngine";
import { randomIntFromInterval } from "./model/mazes/outils";

interface AppProps {
  stackWidth: number;
  columns: number;
  rows: number;

  squareSize: number;
}

export const App = ({ stackWidth, columns, rows, squareSize }: AppProps) => {
  //General constants for the speed of animations
  const MAX_ANIMATION_SPEED = 100;
  const [animationSpeed, setAnimationSpeed] = useState(
    MAX_ANIMATION_SPEED * 0.5
  );
  const defaultAnimationSpeed = MAX_ANIMATION_SPEED * 0.5;

  //Variables to keep track of whether an animation is running
  //or the mouse has been pressed
  const [mousePressed, setMousePressed] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  //We define the start and end coordinates of our dog and steak
  //to be random and updated by these two functions
  const [startCoordinate, setStartCoordinate] = useState(
    new Point(
      randomIntFromInterval(0, rows - 1),
      randomIntFromInterval(0, columns - 1)
    )
  );
  const [endCoordinate, setEndCoordinate] = useState(
    new Point(
      randomIntFromInterval(2, rows - 2),
      randomIntFromInterval(2, columns - 2)
    )
  );

  //Flags we maintain to tell whether we have selected either
  //the start or end node to move around
  const [startNodeSelected, setStartNodeSelected] = useState(false);
  const [endNodeSelected, setEndNodeSelected] = useState(false);

  //We keep track of our current algorithm and maze selected
  const [algorithm, setAlgorithm] = useState(Algorithm.Bfs);
  const [maze, setMaze] = useState(Maze.Default);

  //We keep the grid as a 2-d array of NodeBackEnd[]
  const [grid, setGrid]: [NodeBackEnd[][], any] = useState([]);

  ///////////////HANDLE BUILDING THE WALLS WITH THE MOUSE/////////////////
  const handleMouseDown = (row: number, col: number): void => {
    if (isBusy) return;

    if (startNodeSelected) {
      setStartCoordinate(new Point(row, col));
      setStartNodeSelected(false);
      setGrid(
        updateGrid(grid, columns, rows, new Point(row, col), endCoordinate)
      ); //I NEED TO RE-INITALISE IT
      return;
    }

    if (endNodeSelected) {
      setEndCoordinate(new Point(row, col));
      setEndNodeSelected(false);
      setGrid(
        updateGrid(grid, columns, rows, startCoordinate, new Point(row, col))
      ); //I NEED TO RE-INITALISE IT
      return;
    }

    setMousePressed(true);

    if (col === startCoordinate.col && row === startCoordinate.row) {
      setStartNodeSelected(true);
      setGrid(removeStartEndCoordinate(grid, new Point(row, col)));
      return;
    }

    if (col === endCoordinate.col && row === endCoordinate.row) {
      setEndNodeSelected(true);
      setGrid(removeStartEndCoordinate(grid, new Point(row, col)));
      return;
    }

    applyAnimations(getWallToggleAnimation(grid, row, col), animationSpeed);
  };

  const handleMouseEnter = (row: number, col: number): void => {
    if (isBusy) return;

    if (startNodeSelected || endNodeSelected) {
      new Animation(AnimationType.SelectedNode, grid[row][col]).apply();
    } else if (mousePressed) {
      applyAnimations(getWallToggleAnimation(grid, row, col), animationSpeed);
    }
  };

  const handleMouseUp = (row: number, col: number): void => {
    setMousePressed(false);
  };

  /////////////HANDLERS FOR THE CONTROLLERS//////////////////////

  function handleSolveButton(): void {
    setIsBusy(true);

    const startNode = grid[startCoordinate.row][startCoordinate.col];
    const endNode = grid[endCoordinate.row][endCoordinate.col];

    applyAnimations(
      algorithm.getAnimations(grid, startNode, endNode),
      animationSpeed
    );
  }

  const handleAlgorithmSelected = (algorithm: Algorithm): void => {
    setAlgorithm(algorithm);
  };

  /**
   * function updates the grid with the necessary animations to create the desired maze,
   * it doesn't clear the grid before doing so with the intent of providing the user the
   * chance to see the mazes generated on top of each other
   * **/
  const handleMazeSelected = (newMaze: Maze): void => {
    if (newMaze !== Maze.Default) setIsBusy(true);

    applyAnimations(
      newMaze.animations(grid, startCoordinate, endCoordinate),
      animationSpeed / 50
    );
    setMaze(newMaze);
  };

  const handleAnimationSpeed = (event: any, number: number): void => {
    setAnimationSpeed(MAX_ANIMATION_SPEED - number);
  };

  const handleCleanButton = (): void => {
    setGrid(clearGrid(grid, columns, rows, startCoordinate, endCoordinate));
  };

  const handleElevationActivated = (): void => {
    getElevationAnimation(grid, grid[startCoordinate.row][startCoordinate.col]);
    setGrid(updateGrid(grid, columns, rows, startCoordinate, endCoordinate));
  };

  /////////////HANDLER FOR THE ANIMATIONS/////////////////////////
  function applyAnimations(animations: Animation[], speed: number): void {
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        animations[i].apply();
        if (i === animations.length - 1) {
          setIsBusy(false);
          setGrid(
            updateGrid(grid, columns, rows, startCoordinate, endCoordinate)
          );
        }
      }, speed * i);
    }
  }

  useEffect(() => {
    setGrid(initializeGrid(columns, rows, startCoordinate, endCoordinate));
  }, []);

  return (
    <Stack direction="row">
      <Stack direction="column" sx={{ width: stackWidth, margin: 1 }}>
        <Stack direction={"row"}>
          <ClearButton
            width={stackWidth / 2}
            clicked={handleCleanButton.bind(this)}
            isBusy={isBusy}
          />
          <SolveButton
            width={stackWidth / 2}
            clicked={handleSolveButton.bind(this)}
            isBusy={isBusy}
          />
        </Stack>

        <SpeedSlider
          minSpeed={defaultAnimationSpeed / 20}
          maxSpeed={MAX_ANIMATION_SPEED}
          defaultSpeed={defaultAnimationSpeed}
          width={stackWidth}
          handleSpeedSlider={handleAnimationSpeed.bind(this)}
          isBusy={isBusy}
        />

        <Stack direction={"row"}>
          <AlgorithmMenu
            width={stackWidth / 2}
            isBusy={isBusy}
            defaultAlgorithm={algorithm}
            clicked={handleAlgorithmSelected.bind(this)}
          />
          <MazesMenu
            width={stackWidth / 2}
            clicked={handleMazeSelected.bind(this)}
            isBusy={isBusy}
            mazeSelected={maze}
          />
        </Stack>

        <InformationBoxAlgorithm algorithm={algorithm} width={stackWidth} />
        <InformationBoxMaze width={stackWidth} maze={maze} />
        <UnweightedAlgorithm algorithm={algorithm} width={stackWidth} />
        <WeightedMaze
          clicked={handleElevationActivated.bind(this)}
          algorithm={algorithm}
        />
      </Stack>

      <Canvas
        grid={grid}
        squareSize={squareSize}
        mouseUp={handleMouseUp.bind(this)}
        mouseDown={handleMouseDown.bind(this)}
        mouseEnter={handleMouseEnter.bind(this)}
        mousePressed={() => setMousePressed((prevState) => !prevState)}
        canvasHeight={rows * squareSize}
        canvasWidth={columns * squareSize}
      />
    </Stack>
  );
};
