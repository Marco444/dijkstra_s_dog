import {Backdrop, Box, Button, Modal, Stack, Typography} from "@mui/material";
import {buttonStyleTutorial, explanationBoxStyle, textStyleTutorial} from "./Tutorial";

interface functionButtonsProps {
    display: boolean,
    close: any,
    marginTop: number
}

export const FunctionButtonTutorial = ({display, close, marginTop}: functionButtonsProps) => {
    return (
        <Modal
            open={display}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
                <Stack direction={"row"} sx={{...explanationBoxStyle,  marginTop: marginTop}} >
                <Typography sx={textStyleTutorial}>
                    With these controllers we can clear the whole canvas, solve
                    the maze as well as controlling the speed of the animation
                </Typography>
                <Button sx={buttonStyleTutorial} onClick={close}> NEXT </Button>
                </Stack>
        </Modal>
    )
}
