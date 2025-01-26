const Keyboard = ({ activeKeys }) => {
    console.log("hello");
    const pianoKeys = [
        { note: "C", type: "white" },
        { note: "^C", type: "black" }, // C#
        { note: "D", type: "white" },
        { note: "^D", type: "black" }, // D#
        { note: "E", type: "white" },
        { note: "F", type: "white" },
        { note: "^F", type: "black" }, // F#
        { note: "G", type: "white" },
        { note: "^G", type: "black" }, // G#
        { note: "A", type: "white" },
        { note: "^A", type: "black" }, // A#
        { note: "B", type: "white" },
        { note: "c", type: "white" }, // High C
        { note: "^c", type: "black" }, // High C#
        { note: "d", type: "white" }, // High D
        { note: "^d", type: "black" }, // High D#
        { note: "e", type: "white" }, // High E
    ];

    return (
        <div className="container">
            {pianoKeys.map((key, index) => (
                <div
                    key={index}
                    className={`${key.type}-key ${
                        activeKeys.includes(key.note) ? "active" : ""
                    }`}
                >
                    {key.note}
                </div>
            ))}
        </div>
    );
};

export default Keyboard;
