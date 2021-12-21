import {Button, ButtonGroup} from "@mui/material";
import {clearButtonColor, fontColor, solveButtonColor} from "../colors";

interface clearButtonProps {
    width: number,
    clicked: () => any,
    isBusy: boolean
}

export const ClearButton = ({width, clicked, isBusy}: clearButtonProps) => {
    return(
        <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="contained"
            sx={{marginBottom: 1}}>

            <Button sx={{
                backgroundColor: clearButtonColor,
                color: fontColor,
                fontWeight: "bold",
                width: width
            }}
                    onClick={clicked} disabled={isBusy}>
               CLEAR WALLS
            </Button>

        </ButtonGroup>
    );
}
