import {useEffect, useState} from "react";
import {FunctionButtonTutorial} from "./FunctionButtonsExplanation";
import {AlgorithmMazeTutorial} from "./AlgorithmMazeExplanation";
import {InformationBoxAlgorithm} from "./InformationBoxExplanation";
import {CanvasInformation} from "./CanvasInformation";

interface tutorialProps {
    start: boolean,
    height: number
}

export const buttonStyleTutorial = {
    color: '#fff',
    margin: 2,
    '&:hover': {
        backgroundColor: '#fff',
        color: '#f38d8d',
    },
}

export const textStyleTutorial = {
    padding: 2,
    color: "white",
    fontWeight: "bold"
}

export const explanationBoxStyle = {
    backgroundColor: "#ff8181",
    width: 730,
    "margin-left": 350
}



export const Tutorial = ({start, height}: tutorialProps) => {

    const [current, setCurrent] = useState(0);
    const tutorialSteps = ['none', 'functionButtons', 'algorithmButtons', 'infoBox',  'canvas']

    useEffect(() => {
        setCurrent(start ? 1 : 0)
    }, [start])

    const next = () => {
        setCurrent(prev => prev + 1)
    }

    return (
        <>
            <FunctionButtonTutorial display={tutorialSteps[current] === 'functionButtons'} close={next} marginTop={height / 500}/>
            <AlgorithmMazeTutorial display={tutorialSteps[current] === 'algorithmButtons'} close={next} marginTop={height / 50}/>
            <InformationBoxAlgorithm display={tutorialSteps[current] === 'infoBox'} close={next} marginTop={height / 34} />
            <CanvasInformation display={tutorialSteps[current] === 'canvas'} close={next} marginTop={height / 11.2} />
        </>
);
}
