import {Button, ButtonGroup, Menu, MenuItem, Stack} from "@mui/material";
import {useState} from "react";
import {algorithmsDropDownColor, algorithmsDropDownColorButtons, fontColor} from "../colors";
import {Algorithm} from "../../model/algorithms/AlgorithmsEngine";

interface AlgorithmMenuProps {
    width: number
    clicked: any
}

export const AlgorithmMenu = ({width, clicked}: AlgorithmMenuProps) => {

    const buttonSx = {backgroundColor: algorithmsDropDownColor}
    const [showMenu, setShowMenu] = useState(false)

    return (
        <Stack direction="column" width={width}>
            <ButtonGroup
                orientation="vertical"
                aria-label="vertical contained button group"
                variant="contained"
                sx={{marginBottom: 1}}>

            <Button onClick={() => setShowMenu(prevState => !prevState)}
                    sx={{
                        backgroundColor: algorithmsDropDownColor,
                        color: fontColor,
                        fontWeight: "bold"
                    }}>
                ALGORITHMS
            </Button>
            { showMenu &&
                <>
                <Button sx={buttonSx}> A* </Button>
                <Button sx={buttonSx}> BFS </Button>
                <Button sx={buttonSx} onClick={clicked(Algorithm.Dijkstra)}> Dijkstra </Button>
                <Button sx={buttonSx}> DFS </Button>
                </>
            }
            </ButtonGroup>
        </Stack>
    );
}