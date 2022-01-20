import React, {useEffect, useState} from "react";
import {Button, Link, Slide, Stack, Typography} from "@mui/material";
import {fontColor, mazesDropDownColor, weightedAlgorithmColor} from "../colors";
import CloseIcon from "@mui/icons-material/Close";
import {Algorithm} from "../../model/algorithms/AlgorithmsEngine";
import {Maze} from "../../model/mazes/MazesEngine";

interface WeightedMazeOption {
    clicked: any,
    algorithm: Algorithm,
}

export const WeightedMaze = ({clicked, algorithm}: WeightedMazeOption) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(algorithm.isWeighted)
    }, [algorithm])

    return (

        <Slide direction="up" in={show} mountOnEnter unmountOnExit>
            <Stack direction={"column"} sx={{backgroundColor: weightedAlgorithmColor}}>
                <Stack direction='row'>
                    <Typography sx={{color: fontColor, padding: 2.5, paddingRight: 0.5, paddingBottom: 0}}>
                        This algorithm can deal with weighted graphs, thus you have the option to change to add
                        elevation to
                        the maze and find the shortest path given the elevation selected!</Typography>
                    <Link href="#">
                        <CloseIcon onClick={() => setShow(false)}
                                   sx={{color: fontColor, padding: 1, paddingLeft: 0}}> </CloseIcon>
                    </Link>
                </Stack>
                <Button sx={{marginLeft: 5, marginRight: 5, color: fontColor, margin: 1}} onClick={clicked}> ADD
                    ELEVATION </Button>
            </Stack>
        </Slide>

    );
}