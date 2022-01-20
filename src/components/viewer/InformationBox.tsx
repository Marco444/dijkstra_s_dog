import {algorithmsDropDownColor, fontColor, informationBoxColor, mazesDropDownColor} from "../colors";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    ButtonGroup, Link,
    Slide,
    Stack,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Maze} from "../../model/mazes/MazesEngine";
import React, {useEffect, useRef, useState} from "react";

import {Algorithm} from "../../model/algorithms/AlgorithmsEngine";
import CloseIcon from "@mui/icons-material/Close";

interface InformationBoxProps {

    algorithm: Algorithm,
    width: number
}

export const InformationBoxAlgorithm = ({algorithm, width}: InformationBoxProps) => {

    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(true)
    }, [algorithm])

    return (

        <Slide direction="up" in={show} mountOnEnter unmountOnExit>
            <Stack direction='row' sx={{backgroundColor: algorithmsDropDownColor}}>
                <Typography sx={{color: fontColor, padding: 3, paddingRight: 0}}> {algorithm.text} </Typography>
                <Link href="#">
                    <CloseIcon onClick={() => setShow(false)}
                               sx={{color: fontColor, padding: 1, paddingLeft: 0}}> </CloseIcon>
                </Link>
            </Stack>
        </Slide>

    );
}
