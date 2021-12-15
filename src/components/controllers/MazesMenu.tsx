import {Button, ButtonGroup, Menu, MenuItem, Stack} from "@mui/material";
import {useState} from "react";
import {fontColor, mazesDropDownColor} from "../colors";

interface ButtonsProps {
    width: number,
    clicked: any
}

export const MazesMenu = ({width, clicked}: ButtonsProps) => {

    const buttonSx = {backgroundColor: mazesDropDownColor}
    const [showMenu, setShowMenu] = useState(false)

    return (
        <Stack direction="column" width={width}>
            <ButtonGroup
                orientation="vertical"
                aria-label="vertical contained button group"
                variant="contained"
                sx={{marginBottom: 1, color: "white"}}>

                <Button onClick={() => setShowMenu(prevState => !prevState)}
                        sx={{
                            backgroundColor: mazesDropDownColor,
                            color: fontColor,
                            fontWeight: "bold"
                        }}>
                    Mazes
                </Button>
                { showMenu &&
                <>
                    <Button sx={buttonSx}> Random points </Button>
                    <Button sx={buttonSx}> Borges </Button>
                    <Button sx={buttonSx}> PacMan </Button>
                </>
                }
            </ButtonGroup>
        </Stack>
    );
}
