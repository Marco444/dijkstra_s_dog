import React, {useEffect, useState} from "react";
import {Link, Slide, Stack, Typography} from "@mui/material";
import {algorithmsDropDownColor, fontColor, unweightedColor} from "../colors";
import CloseIcon from "@mui/icons-material/Close";
import {Algorithm} from "../../model/algorithms/AlgorithmsEngine";
interface UnweightedAlgorithmProps {
    algorithm: Algorithm,
    width: number
}

export const UnweightedAlgorithm = ({algorithm, width}: UnweightedAlgorithmProps) => {

    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(!algorithm.isWeighted)
    }, [algorithm])

    return (

        <Slide direction="up" in={show} mountOnEnter unmountOnExit>
            <Stack direction='row' sx={{backgroundColor: unweightedColor}}>
                <Typography sx={{color: fontColor, padding: 3, paddingRight: 0}}>
                    This algorithm is unweighted so it will disregard both elevation and crumbs
                    in the maze
                </Typography>
                <Link href="#">
                    <CloseIcon onClick={() => setShow(false)}
                               sx={{color: fontColor, padding: 1, paddingLeft: 0}}> </CloseIcon>
                </Link>
            </Stack>
        </Slide>

    );
}
