import {Button, Modal, Stack, Typography} from "@mui/material";
import {buttonStyleTutorial, explanationBoxStyle, textStyleTutorial} from "./Tutorial";

interface CanvasInformationProps {
    display: boolean,
    close: any,
    marginTop: number
}

export const CanvasInformation = ({display, close, marginTop}: CanvasInformationProps) => {
    return (
        <Modal
            open={display}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Stack direction="row"
                   sx={{...explanationBoxStyle, marginTop: marginTop}}>
                <Typography sx={textStyleTutorial}>
                    Finally we have the canvas, we can move the dog and the steak around by simply clicking
                    them and them clicking where we want them. By default the maze is custom, that means if
                    click in any empty box it becomes a wall
                </Typography>
                <Button sx={buttonStyleTutorial} onClick={close}> LETS PLAY!  </Button>
            </Stack>

        </Modal>
    )
}
