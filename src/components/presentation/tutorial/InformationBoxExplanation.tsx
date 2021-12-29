import {Button, Modal, Stack, Typography} from "@mui/material";
import {buttonStyleTutorial, explanationBoxStyle, textStyleTutorial} from "./Tutorial";

interface InformationBoxExplanationProps {
    display: boolean,
    close: any,
    marginTop: number
}

export const InformationBoxAlgorithm = ({display, close, marginTop}: InformationBoxExplanationProps) => {
    return (
        <Modal
            open={display}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Stack direction="row" style={explanationBoxStyle}
                   sx={{marginTop: marginTop}}>
                <Typography sx={textStyleTutorial}>
                   Here information will pop up explaining both the algorithm selected to solve the
                   maze as well as the maze generation selected.
                </Typography>
                <Button sx={buttonStyleTutorial} onClick={close}> NEXT </Button>
            </Stack>

        </Modal>
    )
}
