import {Box, Button, Modal, Stack, Typography} from "@mui/material";
import {algorithmsDropDownColor, mazesDropDownColor, welcomeText} from "../colors";
import {textStyleTutorial} from "./tutorial/Tutorial";

interface props {
    display: boolean,
    close: any,
    width: number,
    height: number,
    startTutorial: any
}

const buttonStyle = {
    color: welcomeText,
    '&:hover': {
        backgroundColor: '#fff',
        color: '#3c52b2',
    },
}

export const WelcomeGuide = ({display, close, width, height, startTutorial}: props) => {
    const a = 1
    const widthBox = width / 4
    const heightBox = height / 4

    // @ts-ignore
    return (

        <Modal
            open={display}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={{
                backgroundColor: mazesDropDownColor,
                width: widthBox,
                height: heightBox,
                marginLeft: width / 20 - widthBox / 50,
                marginTop: height / 20 - heightBox / 50,
                padding: 3,
            }}>
                <Typography sx={{
                    fontSize: 40,
                    color: welcomeText,
                    fontWeight: 'bold',
                }}>
                    Welcome,
                </Typography>
                <Typography sx={{
                    color: welcomeText,
                    fontWeight: 'bold',
                    paddingTop: 2
                }}>
                    This is a small app made in React designed to visualise different graph
                    algorithms through maze generation and path finding
                </Typography>

                <Stack direction='row' sx={{paddingTop: 4}}>
                    <Button onClick={close} sx={buttonStyle}> CLOSE </Button>
                    <Button onClick={startTutorial} sx={buttonStyle} style={{marginLeft: width / 7}}> TUTORIAL</Button>
                </Stack>

            </Box>
        </Modal>
    );
};
