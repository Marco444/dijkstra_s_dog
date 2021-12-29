import {Box, Grow, Link, Slide, Stack, Typography} from "@mui/material";
import {fontColor, mazesDropDownColor} from "../colors";
import CloseIcon from '@mui/icons-material/Close';
import {Maze} from "../../model/mazes/MazesEngine";
import React, {useEffect, useState} from "react";
import Fade from '@mui/material/Fade';

interface InformationBoxMazeProps {
    width: number,
    maze: Maze
}

export const InformationBoxMaze = ({width, maze}: InformationBoxMazeProps) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(true)
    }, [maze])

    return (

        <Slide direction="up" in={show} mountOnEnter unmountOnExit>
            <Stack  direction='row' sx={{backgroundColor: mazesDropDownColor}}>
                <Typography sx={{ color: fontColor, padding: 2.5, paddingRight: 0.5}}> {maze.text} </Typography>
                <Link href="#">
                    <CloseIcon onClick={() => setShow(false)}
                               sx={{color: fontColor, padding: 1, paddingLeft: 0}}> </CloseIcon>
                </Link>
            </Stack>
        </Slide>

    );
}