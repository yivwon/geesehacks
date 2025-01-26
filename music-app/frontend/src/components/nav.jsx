import { useState } from "react";

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false); // Dropdown open state
    const [selectedOption, setSelectedOption] = useState("Select an option"); // Selected option state

    const options = ["Option 1", "Option 2", "Option 3", "Option 4"]; // Dropdown options

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev); // Toggle dropdown visibility
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option); // Set the selected option
        setIsOpen(false); // Close the dropdown
    };

    return (
        <div className="dropdown">
            <button className="dropdown-button" onClick={toggleDropdown}>
                {selectedOption} ▼
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
