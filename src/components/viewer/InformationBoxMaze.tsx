import {Box, Grow, Slide, Stack, Typography} from "@mui/material";
import {fontColor, mazesDropDownColor} from "../colors";
import CloseIcon from '@mui/icons-material/Close';
import {Maze} from "../../model/mazes/MazesEngine";
import {useEffect, useState} from "react";
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
            <Stack  direction="column" sx={{backgroundColor: mazesDropDownColor}}>
                <CloseIcon onClick={() => setShow(false)}
                           sx={{color: fontColor, paddingTop: 2,  paddingLeft: width / 9.3, paddingBottom: 1
                           }}> </CloseIcon>
               <Typography sx={{ color: fontColor, padding: 3, paddingTop: 0,}}> {maze.text} </Typography>
            </Stack>
        </Slide>

    );
}