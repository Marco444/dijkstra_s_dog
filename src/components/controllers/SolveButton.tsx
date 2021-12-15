import {Button, ButtonGroup} from "@mui/material";
import {fontColor, solveButtonColor} from "../colors";

interface solveButtonProps {
    width: number,
    clicked: () => any
}

export const SolveButton = ({width, clicked}: solveButtonProps) => {
    return(
        <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="contained"
        sx={{marginBottom: 1}}>

        <Button sx={{
            backgroundColor: solveButtonColor,
            color: fontColor,
            fontWeight: "bold",
            width: width
        }}
        onClick={clicked}>
            SOLVE
        </Button>

        </ButtonGroup>
    );
}