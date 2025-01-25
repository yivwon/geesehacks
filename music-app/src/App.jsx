import { useState, useEffect } from "react";
import Keyboard from "./components/keyboard";
import ABCJS from "abcjs";
import "./style/keyboard.css";

function App() {
    const [activeKeys, setActiveKeys] = useState([]);
    const [abcNotation, setAbcNotation] = useState("");

    const keyMap = {
        a: "C", // Middle C
        w: "^C", // C#
        s: "D", // D
        e: "^D", // D#
        d: "E", // E
        f: "F", // F
        t: "^F", // F#
        g: "G", // G
        y: "^G", // G#
        h: "A", // A
        u: "^A", // A#
        j: "B", // B
        k: "c", // High C
        o: "^c", // High C#
        l: "d", // High D
        p: "^d", // High D#
        ";": "e", // High E
        // Add more mappings for other notes...
    };

    const playSound = (note) => {
        try {
            const audio = new Audio(`/sounds/${note}.mp3`);
            console.log(`Playing: ${note}.mp3`); // Debugging
            audio.play();
        } catch (error) {
            console.error(`Failed to load sound for ${note}:`, error);
        }
    };

    const renderSheetMusic = () => {
        const abcString = `X:1\nT:Live Sheet Music\nK:C\n${abcNotation}`;
        ABCJS.renderAbc("sheet-music", abcString);
    };

    useEffect(() => {
        renderSheetMusic();
    }, [abcNotation]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            const note = keyMap[event.key];
            if (note && !activeKeys.includes(note)) {
                setActiveKeys((prev) => [...prev, note]); // Add note to active keys
                playSound(note);
                setAbcNotation((prev) => `${prev} ${note}`);
            }
        };

        const handleKeyUp = (event) => {
            const note = keyMap[event.key];
            if (note) {
                setActiveKeys((prev) => prev.filter((key) => key !== note)); // Reset the active key
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [activeKeys, keyMap]);

    return (
        <div>
            <div id="sheet-music"></div>
            <Keyboard activeKeys={activeKeys} keyMap={keyMap} />
        </div>
    );
}

export default App;
