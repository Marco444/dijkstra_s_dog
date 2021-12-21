import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    ButtonGroup,
    Menu,
    MenuItem,
    Stack,
    Typography
} from "@mui/material";
import React, {useRef, useState} from "react";
import {accordionColorAlgorithms, algorithmsDropDownColor, fontColor, mazesColor, mazesDropDownColor} from "../colors";
import {Maze} from "../../model/mazes/MazesEngine";
import {Algorithm} from "../../model/algorithms/outils/AlgorithmsEngine";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


interface MazesProps {
    width: number
    clicked: any
    isBusy: boolean
    mazeSelected: Maze
}

export const MazesMenu = ({width, clicked, isBusy, mazeSelected}: MazesProps) => {

    const buttonSx = {backgroundColor: mazesColor, width: width * 0.89}
    const expandRef = useRef(null)

    const toggleAndClicked = (maze: Maze) => {
        // @ts-ignore
        expandRef.current.click()
        clicked(maze);
    }

    return (
        <Stack direction="column" width={width} >
            <Accordion sx={{
                backgroundColor: mazesDropDownColor,
                color: fontColor,
                marginBottom: 1,
                marginTop: 1,
            }} disabled={isBusy} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: fontColor}} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{marginBottom: 0}} ref={expandRef}>
                    <Typography fontWeight='bold'>MAZE: </Typography>
                    <Typography paddingLeft={1}>  {mazeSelected.name}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{marginBottom: 0}} >
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained button group"
                        variant="contained"
                        sx={{marginTop: 0}}>
                        <Button sx={buttonSx} onClick={() => toggleAndClicked(Maze.Prim)}> Prim </Button>
                        <Button sx={buttonSx} onClick={() => toggleAndClicked(Maze.Kruskal)}> Kruskal </Button>
                        <Button sx={buttonSx} onClick={() => toggleAndClicked(Maze.Custom)}> Custom </Button>
                    </ButtonGroup>
                </AccordionDetails>
            </Accordion>
        </Stack>
    );
}
