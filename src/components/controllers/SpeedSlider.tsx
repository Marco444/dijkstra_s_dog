import {Slider, Stack, Typography} from "@mui/material";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import React from "react";
import {speedSliderColor, speedSliderLineColor} from "../colors";

interface SpeedSliderProps {
    minSpeed: number,
    maxSpeed: number,
    defaultSpeed: number,
    width: number,
    handleSpeedSlider: any,
    isBusy: boolean
}

export const SpeedSlider = ({minSpeed, maxSpeed, defaultSpeed, width, handleSpeedSlider, isBusy}:SpeedSliderProps) => {
    return (
        <Stack sx={{
            backgroundColor: speedSliderColor,
            marginBottom: 1,
            color: "white"
        }}>
            <Stack>
                <Typography id="animation-slider" sx={{
                    paddingTop: 1,
                    paddingLeft: 2,
                    marginRight: 2,
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    fontSize: 14
                }}> Animation Speed
                    <SpeedRoundedIcon sx={{paddingLeft: 1, height: 17}}/>
                </Typography>
            </Stack>
            <Slider size={"small"} max={maxSpeed} min={minSpeed} defaultValue={defaultSpeed} key={1} sx={{
                marginLeft: 2,
                marginBottom: 1,
                width: width * 0.9,
                color: speedSliderLineColor
            }} onChange={handleSpeedSlider} disabled={isBusy}/>
        </Stack>
    );
}
