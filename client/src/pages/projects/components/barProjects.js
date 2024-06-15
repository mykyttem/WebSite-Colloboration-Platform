import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/projects.css";


const BarProjects = ({ sortDateHandler, sortMembersHandler, sortedByDate, sortedByMembers, fetchProjects, handleCategoryFilter, selectedCategories, categories }) => {
    const [show, setShow] = useState(false);

    const showCheckboxes = () => {
        setShow(!show);
    };

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const updatedSelectedCategories = selectedCategories.includes(value)
            ? selectedCategories.filter(category => category !== value)
            : [...selectedCategories, value];
        
        handleCategoryFilter(updatedSelectedCategories);
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
                    {categories.map((category, index) => (
                        <div className="select-item" key={index}>
                            <input type="checkbox" id={`category-${index}`} value={category} onChange={handleCheckboxChange} />
                            <label htmlFor={`category-${index}`}>{category}</label>
                        </div>
                    ))}
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