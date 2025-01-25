import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Keyboard from "./components/keyboard";
import "./style/keyboard.css";

function App() {
    const [activeKeys, setActiveKeys] = useState([]);

    const keyMap = {
        a: "C1", // Map 'a' to the 'C' note
        w: "C#1", // Map 'w' to the 'C#' note
        s: "D1", // Map 's' to the 'D' note
        e: "D#1", // Map 'e' to the 'D#' note
        d: "E1", // Map 'd' to the 'E' note
        f: "F1",
        t: "F#1",
        g: "G1",
        y: "G#1",
        h: "A1",
        u: "A#1",
        j: "B1",
        k: "C2",
        o: "C#2",
        l: "D2",
        p: "D#2",
        ";": "E2",
        // Add more mappings for other notes...
    };

    const playSound = (note) => {
        try {
            const audio = new Audio(`/sounds/${note}.mp3`);
            console.log(`Playing: ${note}.mp3`); // Debugging
            audio.play().catch((error) => {
                console.error(`Error playing sound for ${note}:`, error);
            });
        } catch (error) {
            console.error(`Failed to load sound for ${note}:`, error);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            const note = keyMap[event.key];
            if (note && !activeKeys.includes(note)) {
                setActiveKeys((prev) => [...prev, note]); // Add note to active keys
                playSound(note);
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
            <Keyboard activeKeys={activeKeys} keyMap={keyMap} />
        </div>
    );
}

export default App;
