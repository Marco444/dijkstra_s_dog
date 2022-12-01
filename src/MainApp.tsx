import {useWindowSize} from "react-use";
import {App} from "./App"
import {WelcomeGuide} from "./components/presentation/WelcomeGuide";
import {useState} from "react";
import {Tutorial} from "./components/presentation/tutorial/Tutorial";

function closestOddNumber(num: number) {
    return Math.round(num) % 2 == 0 ? Math.round(num) + 1 : Math.round(num)
}
export const MainApp = () => {

    //Screen size and definiton
    const {height, width} = useWindowSize();
    const stackWidth = width * 0.22

    /////Tutorial State
    const [welcome, showWelcome] = useState(true);
    const [startTutorial, setStartTutorial] = useState(false)


    ///Canvas dimensions and density of boxes,
    //for maze generation dimensions need to be odd
    const [squareSize] = useState(24)
    const columns = closestOddNumber(width * 0.665 / squareSize)
    const rows = closestOddNumber(height * 0.8 / squareSize)

    return (
        <>
            <WelcomeGuide startTutorial={() => {
                setStartTutorial(true);
                showWelcome(false)
            }}
                          close={() => showWelcome(() => false)}
                          display={welcome} width={width} height={height}/>

            <Tutorial start={startTutorial} height={height}/>

            <App stackWidth={stackWidth} columns={columns} rows={rows} squareSize={squareSize}/>

        </>
    );
}