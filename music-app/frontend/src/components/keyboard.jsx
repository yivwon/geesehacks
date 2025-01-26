const Keyboard = ({ activeKeys, onClear }) => {
    const keyLabels = {
        "C": "a",
        "^C": "w",
        "D": "s",
        "^D": "e",
        "E": "d",
        "F": "f",
        "^F": "t",
        "G": "g",
        "^G": "y",
        "A": "h",
        "^A": "u",
        "B": "j",
        "c": "k",
        "^c": "o",
        "d": "l",
        "^d": "p",
        "e": ";"
    };

    const pianoKeys = [
        { note: "C", type: "white" },
        { note: "^C", type: "black" },
        { note: "D", type: "white" },
        { note: "^D", type: "black" },
        { note: "E", type: "white" },
        { note: "F", type: "white" },
        { note: "^F", type: "black" },
        { note: "G", type: "white" },
        { note: "^G", type: "black" },
        { note: "A", type: "white" },
        { note: "^A", type: "black" },
        { note: "B", type: "white" },
        { note: "c", type: "white" },
        { note: "^c", type: "black" },
        { note: "d", type: "white" },
        { note: "^d", type: "black" },
        { note: "e", type: "white" }
    ];

    return (
        <div>
            <div className="container">
                {pianoKeys.map((key, index) => (
                    <div
                        key={index}
                        className={`${key.type}-key ${
                            activeKeys.includes(key.note) ? "active" : ""
                        }`}
                    >
                        <div className="key-label">{keyLabels[key.note]}</div>
                    </div>
                ))}
            </div>
            <div className="button-container">
                <button onClick={onClear} className="clear-button">Clear</button>
                <button className="save-button">Save</button>
            </div>
        </div>
    );
};

export default Keyboard;
