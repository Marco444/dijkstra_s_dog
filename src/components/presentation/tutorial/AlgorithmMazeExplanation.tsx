import {Box, Button, Modal, Stack, Typography} from "@mui/material";
import {buttonStyleTutorial, explanationBoxStyle, textStyleTutorial} from "./Tutorial";

interface AlgorithmMazeTutorialProps {
    display: boolean,
    close: any,
    marginTop: number
}

export const AlgorithmMazeTutorial = ({display, close, marginTop}: AlgorithmMazeTutorialProps) => {
    return (
        <Modal
            open={display}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Stack direction="row" style={explanationBoxStyle}
                   sx={{marginTop: marginTop}}>
                <Typography sx={textStyleTutorial}>
                    The two dropdowns allows us to pick the algorithm to solve the maze and shortest path,
                    as well as different options for generating a maze!
                </Typography>
                <Button sx={buttonStyleTutorial} onClick={close}> NEXT </Button>
            </Stack>

        </Modal>
    )
}
