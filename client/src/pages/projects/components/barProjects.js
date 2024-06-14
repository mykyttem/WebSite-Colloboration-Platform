import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/projects.css";

const BarProjects = ({ sortDateHandler, sortMembersHandler, sortedByDate, sortedByMembers, fetchProjects }) => {
    const [show, setShow] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const showCheckboxes = () => {
        setShow(!show);
    };

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        setSelectedCategories(prevState =>
            prevState.includes(value)
                ? prevState.filter(category => category !== value)
                : [...prevState, value]
        );
    };

    return (
        <div className="quick-bar">
            <div className="custom-select">
                <div className="selectBox" onClick={showCheckboxes}>
                    <select>
                        <option>{selectedCategories.length > 0 ? selectedCategories.join(", ") : "Select categories"}</option>
                    </select>
                    <div className="overSelect"></div>
                </div>
                <div id="checkBoxes" className="checkboxes" style={{ display: show ? "block" : "none" }}>
                    <div className="select-item">
                        <input type="checkbox" id="option1" value="category 1" onChange={handleCheckboxChange} />
                        <label htmlFor="option1">Category 1</label>
                    </div>
                    <div className="select-item">
                        <input type="checkbox" id="option2" value="category 2" onChange={handleCheckboxChange} />
                        <label htmlFor="option2">Category 2</label>
                    </div>
                    <div className="select-item">
                        <input type="checkbox" id="option3" value="category 3" onChange={handleCheckboxChange} />
                        <label htmlFor="option3">Category 3</label>
                    </div>
                </div>
            </div>

            <button className="buttons-navbar-project" onClick={() => fetchProjects()}>Reload</button>
            
            <div className="search-bar">
                <input type="search" placeholder="Search..." />
                <button className="search-button">
                    <FaSearch />
                </button>
            </div>
            <div>
                <select name="buttons-navbar-project" id="buttons-navbar-project" className="buttons-navbar-project">
                    <option value="by-members" onClick={sortMembersHandler}>
                        {sortedByMembers ? "Reset Sorting by Members" : "Sort by Members"}
                    </option>
                    <option value="by-date" onClick={sortDateHandler}>
                        {sortedByDate ? "Reset Sorting by Date" : "Sort by Date"}
                    </option>
                </select>
            </div>
        </div>
    );
};


export default BarProjects;