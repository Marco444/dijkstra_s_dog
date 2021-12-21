import {algorithmsDropDownColor, fontColor, informationBoxColor, mazesDropDownColor} from "../colors";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    ButtonGroup,
    Slide,
    Stack,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Maze} from "../../model/mazes/MazesEngine";
import React, {useEffect, useRef, useState} from "react";

import {Algorithm} from "../../model/algorithms/outils/AlgorithmsEngine";
import CloseIcon from "@mui/icons-material/Close";

interface InformationBoxProps {

    algorithm: Algorithm,
    width: number
}

export const InformationBoxAlgorithm = ({algorithm, width}: InformationBoxProps ) => {

    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(true)
    }, [algorithm])

    return (

        <Slide direction="up" in={show} mountOnEnter unmountOnExit>
            <Stack  direction="column" sx={{backgroundColor: algorithmsDropDownColor}}>
                <CloseIcon onClick={() => setShow(false)}
                           sx={{color: fontColor, paddingTop: 2,  paddingLeft: width / 9.3, paddingBottom: 1
                           }}> </CloseIcon>
                <Typography sx={{ color: fontColor, padding: 3, paddingTop: 0,}}> {algorithm.text} </Typography>
            </Stack>
        </Slide>

    );
}
