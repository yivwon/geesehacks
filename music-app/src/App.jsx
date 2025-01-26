import { useState, useEffect, useRef } from "react";
import Keyboard from "./components/keyboard";
import ABCJS from "abcjs";
import "./style/keyboard.css";

function App() {
    const [activeKeys, setActiveKeys] = useState([]);
    const [abcNotation, setAbcNotation] = useState("");
    const debounceTimer = useRef(null); // Timer for debouncing

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
    };

    const fileNameMap = {
        C: "C1",
        "^C": "Csh1",
        D: "D1",
        "^D": "Dsh1",
        E: "E1",
        F: "F1",
        "^F": "Fsh1",
        G: "G1",
        "^G": "Gsh1",
        A: "A1",
        "^A": "Ash1",
        B: "B1",
        c: "C2",
        "^c": "Csh2",
        d: "D2",
        "^d": "Dsh2",
        e: "E2",
    };

    const playSound = (notes) => {
        if (notes.length === 1) {
            // Play a single note
            const note = notes[0];
            const soundFile = fileNameMap[note];
            if (soundFile) {
                const audio = new Audio(`/sounds/${soundFile}.mp3`);
                audio.play();
            }
        } else {
            // Handle chords (optional: implement combined chord sounds)
            notes.forEach((note) => {
                const soundFile = fileNameMap[note];
                if (soundFile) {
                    const audio = new Audio(`/sounds/${soundFile}.mp3`);
                    audio.play();
                }
            });
        }
    };

    const renderSheetMusic = () => {
        const abcString = `X:1\nT:Live Sheet Music\nK:C\n${abcNotation}`;
        ABCJS.renderAbc("sheet-music", abcString);
    };

    useEffect(() => {
        renderSheetMusic();
    }, [abcNotation]);

    const handleKeyDown = (event) => {
        const note = keyMap[event.key];
        if (note && !activeKeys.includes(note)) {
            setActiveKeys((prev) => [...prev, note]); // Add the note to active keys

            // Clear the existing debounce timer
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }

            // Set a new debounce timer
            debounceTimer.current = setTimeout(() => {
                // Play sound and update ABC notation as a chord
                const sortedKeys = [...activeKeys, note].sort();
                const chord = `[${sortedKeys.join(" ")}]`; // Format as a chord
                setAbcNotation((prev) => `${prev} ${chord}`); // Append to notation
                playSound(sortedKeys); // Play all notes in the chord

                // Reset active keys after playing the chord
                setActiveKeys([]);
            }, 200); // 200ms debounce delay
        }
    };

    const handleKeyUp = (event) => {
        const note = keyMap[event.key];
        if (note) {
            setActiveKeys((prev) => prev.filter((key) => key !== note)); // Remove the note
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [activeKeys]);

    return (
        <div>
            <div id="sheet-music"></div>
            <Keyboard activeKeys={activeKeys} keyMap={keyMap} />
        </div>
    );
}

export default App;
