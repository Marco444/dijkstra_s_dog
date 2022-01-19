import React, {useEffect, useState} from "react";
import {Button, Link, Slide, Stack, Typography} from "@mui/material";
import {fontColor, negativeWeightCycleAlgorithmColor, weightedAlgorithmColor} from "../colors";
import CloseIcon from "@mui/icons-material/Close";
import {Algorithm} from "../../model/algorithms/outils/AlgorithmsEngine";
import {Maze} from "../../model/mazes/MazesEngine";

interface NegativeWeightsOptionProps {
    clicked: any,
    algorithm: Algorithm,
    maze: Maze
}

export const NegativeWeights = ({clicked, algorithm, maze}: NegativeWeightsOptionProps) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow((algorithm === Algorithm.BellmanFord || algorithm == Algorithm.Dijkstra)
                && maze !== Maze.Default)
    }, [algorithm, maze])

    return (

        <Slide direction="up" in={show} mountOnEnter unmountOnExit>
    <Stack direction={"column"}  sx={{backgroundColor: negativeWeightCycleAlgorithmColor}} >
    <Stack direction='row'>
    <Typography sx={{color: fontColor, padding: 2.5, paddingRight: 0.5, paddingBottom: 0}}>
    This algorithm can deal with graphs with negative weight cycles, thus you have the option to
    add crumbs to the maze and find the shortest path with extra help in the way </Typography>
    <Link href="#">
    <CloseIcon onClick={() => setShow(false)}
    sx={{color: fontColor, padding: 1, paddingLeft: 0}}> </CloseIcon>
    </Link>
    </Stack>
    <Button sx={{marginLeft: 5, marginRight: 5, color: fontColor, margin: 1}} onClick={clicked}> ADD CRUMBS </Button>
    </Stack>
    </Slide>

);
}