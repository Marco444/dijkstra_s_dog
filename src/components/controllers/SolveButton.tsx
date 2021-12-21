import {Button, ButtonGroup} from "@mui/material";
import {fontColor, solveButtonColor} from "../colors";

interface solveButtonProps {
    width: number,
    clicked: () => any,
    isBusy: boolean
}

export const SolveButton = ({width, clicked, isBusy}: solveButtonProps) => {
    return(
        <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="contained"
        sx={{marginBottom: 1, marginLeft: 1}}>

        <Button sx={{
            backgroundColor: solveButtonColor,
            color: fontColor,
            fontWeight: "bold",
            width: width * 0.95,
        }}
        onClick={clicked} disabled={isBusy}>
            SOLVE MAZE
        </Button>

        </ButtonGroup>
    );
}