import {useEffect, useRef, useState} from "react";

interface TypewriterProps {
    text: string[];
    charDelay: number;
    onFinish: () => void;
}

function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef(() => {});

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const useTypewriter = (text: string[], charDelay = 40, onFinish = () => {}) => {
    const [displayIndex, setDisplayIndex] = useState(0);
    const [lineIndex, setLineIndex] = useState(0);
    const [finished, setFinished] = useState(false);

    let timeoutDelay = charDelay;

    if(lineIndex < text.length && ".?!\n".indexOf(text[lineIndex].charAt(displayIndex)) > -1) {
        timeoutDelay = 800;
    }

    useInterval(() => {
        if(lineIndex >= text.length) {
            if(!finished) {
                setFinished(true);
                onFinish();
            }

            return;
        }

        if(displayIndex < text[lineIndex].length) {
            setDisplayIndex(displayIndex+1);
        } else {
            setDisplayIndex(0);
            setLineIndex(lineIndex+1);
        }
    }, timeoutDelay);

    const lines = []

    for(let i = 0; i < lineIndex; i++) {
        lines.push(<p>{text[i]}</p>)
    }

    if(lineIndex < text.length) {
        lines.push(<p>{text[lineIndex].substring(0, displayIndex + 1)}</p>);
    }

    return lines;
}

export default function ConsoleType({text, charDelay, onFinish}: TypewriterProps) {
    const displayText = useTypewriter(text, charDelay, onFinish);

    return <>
        {displayText}
    </>
}

