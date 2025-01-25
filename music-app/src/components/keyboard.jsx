const Keyboard = ({ activeKeys }) => {
    const pianoKeys = [
        { note: "C1", type: "white" },
        { note: "Csh1", type: "black" },
        { note: "D1", type: "white" },
        { note: "Dsh1", type: "black" },
        { note: "E1", type: "white" },
        { note: "F1", type: "white" },
        { note: "Fsh1", type: "black" },
        { note: "G1", type: "white" },
        { note: "Gsh1", type: "black" },
        { note: "A1", type: "white" },
        { note: "Ash1", type: "black" },
        { note: "B1", type: "white" },
        { note: "C2", type: "white" },
        { note: "Csh2", type: "black" },
        { note: "D2", type: "white" },
        { note: "Dsh2", type: "black" },
        { note: "E2", type: "white" },
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
