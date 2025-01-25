import { useState, useEffect } from "react";
import Keyboard from "./components/keyboard";
import ABCJS from "abcjs";
import "./style/keyboard.css";

function App() {
    const [activeKeys, setActiveKeys] = useState([]);
    const [abcNotation, setAbcNotation] = useState("");

    const keyMap = {
        a: "C1", // Middle C
        w: "Csh1", // C#
        s: "D1", // D
        e: "Dsh1", // D#
        d: "E1", // E
        f: "F1", // F
        t: "Fsh1", // F#
        g: "G1", // G
        y: "Gsh1", // G#
        h: "A1", // A
        u: "Ash1", // A#
        j: "B1", // B
        k: "C2", // High C
        o: "Csh2", // High C#
        l: "D2", // High D
        p: "Dsh2", // High D#
        ";": "E2", // High E
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
