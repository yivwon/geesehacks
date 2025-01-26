import { useState, useEffect, useRef } from "react";
import Keyboard from "./components/keyboard";
import Saved from "./components/Saved";
import ABCJS from "abcjs";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import "./style/keyboard.css";

// Create a separate KeyboardPage component
function KeyboardPage({ activeKeys, keyMap, abcNotation }) {
    useEffect(() => {
        // Render the sheet music with existing notation when component mounts
        const abcString = `X:1
T:Live Sheet Music
M:4/4
L:1/4
K:C
${abcNotation}`;
        
        ABCJS.renderAbc("sheet-music", abcString, {
            responsive: 'resize',
            wrap: {
                preferredMeasuresPerLine: 4,
                minSpacing: 2.7,
                maxSpacing: 3.0
            },
            staffwidth: 800,
            format: {
                gchordfont: "italic 12px Arial",
                measurebox: true,
                breaklimit: 4
            }
        });
    }, [abcNotation]); // Re-render when notation changes

    return (
        <>
            <div id="sheet-music"></div>
            <Keyboard
                activeKeys={activeKeys}
                keyMap={keyMap}
            />
        </>
    );
}

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
                
                // Add bar line after every 4 beats (notes or chords)
                setAbcNotation((prev) => {
                    // Split into individual elements but preserve chords as single units
                    const elements = prev.match(/\[[^\]]+\]|[^\s|]+/g) || [];
                    const newElements = [...elements, chord];
                    
                    // Group into measures of 4 beats (each element counts as 1 beat)
                    return newElements.reduce((acc, element, index) => {
                        if (index > 0 && index % 4 === 0) {
                            return `${acc} | ${element}`;
                        }
                        return `${acc} ${element}`;
                    }, '').trim() + (newElements.length % 4 === 0 ? ' |' : '');
                });
                
                playSound(sortedKeys); // Play all notes in the chord
                setActiveKeys([]); // Reset active keys after playing the chord
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
        <BrowserRouter>
            <div>
                <nav>
                    <Link to="/">Home</Link> |{" "}
                    <Link to="/keyboard">Keyboard</Link> |{" "}
                    <Link to="/saved">Saved</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/keyboard"
                        element={
                            <KeyboardPage
                                activeKeys={activeKeys}
                                keyMap={keyMap}
                                abcNotation={abcNotation}
                            />
                        }
                    />
                    <Route path="/saved" element={<Saved />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

function Home() {
    return (
        <div>
            <h1>Welcome to the Piano App</h1>
            <p>Select "Keyboard" from the menu to play.</p>
        </div>
    );
}

export default App;
