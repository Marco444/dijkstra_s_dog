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
import {accordionColorAlgorithms, algorithmsDropDownColor, fontColor} from "../colors";
import {Algorithm} from "../../model/algorithms/outils/AlgorithmsEngine";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface AlgorithmMenuProps {
    width: number
    clicked: any
    isBusy: boolean
    defaultAlgorithm: Algorithm
}

export const AlgorithmMenu = ({width, clicked, isBusy, defaultAlgorithm}: AlgorithmMenuProps) => {

    const buttonSx = {backgroundColor: accordionColorAlgorithms, width: width * 0.75}
    const [showMenu, setShowMenu] = useState(false)
    const expandRef = useRef(null)

    const toggleAndClicked = (algorithm: Algorithm) => {
            // @ts-ignore
            expandRef.current.click()
            clicked(algorithm);
    }

    return (
        <Stack direction="column" width={width}>
            <Accordion sx={{
                backgroundColor: algorithmsDropDownColor,
                color: fontColor,
                marginBottom: 1
            }} disabled={isBusy} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: fontColor}} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{marginBottom: 0}} ref={expandRef}>
                    <Typography fontWeight='bold' fontSize={12}>ALGORITHM: </Typography>
                   <Typography paddingLeft={1} fontSize={12}>  {defaultAlgorithm.name}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{marginBottom: 1}} >
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained button group"
                        variant="contained"
                        sx={{marginTop: 0}}>
                        <Button sx={buttonSx} onClick={() => toggleAndClicked(Algorithm.Dijkstra)}> Dijkstra </Button>
                        <Button sx={buttonSx} onClick={() => toggleAndClicked(Algorithm.BidirectionalBFS)}> BFS* </Button>
                        <Button sx={buttonSx} onClick={() => toggleAndClicked(Algorithm.Bfs)}> BFS </Button>
                        <Button sx={buttonSx} onClick={() => toggleAndClicked(Algorithm.Dfs)}> DFS </Button>
                    </ButtonGroup>
                </AccordionDetails>
            </Accordion>
        </Stack>
    );
}