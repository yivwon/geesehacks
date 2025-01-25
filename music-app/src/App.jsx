import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
    return (
        <>
            <div className="container">
                <div className="white-key3">
                    <div className="key">c</div>
                    <div className="black-key">c# or d flat</div>
                    <div className="key">d</div>
                    <div className="black-key">c# or d flat</div>
                    <div className="key"></div>
                </div>

                <div className="white-key3">
                    <div className="key">c</div>
                    <div className="black-key">c# or d flat</div>
                    <div className="key">d</div>
                    <div className="black-key">c# or d flat</div>
                    <div className="key"></div>
                    <div className="black-key">c# or d flat</div>
                    <div className="key"></div>
                </div>

                <div className="key">e</div>
            </div>
        </>
    );
}

export default App;
