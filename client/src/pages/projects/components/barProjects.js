import React, { useEffect, useState } from "react";

const BarProjects = ({sortDateHandler, sortMembersHandler, sortedByDate, sortedByMembers, fetchProjects}) => {
    const [show, setShow] = useState(false);

    const showCheckboxes = () => {
        setShow(!show);
    };

    return (
        <div className="quick-bar">
            <div class="custom-select">
                <div class="selectBox" onClick={showCheckboxes}>
                    <select>
                        <option>Select options</option>
                    </select>
                    <div class="overSelect"></div>
                </div>
    
                <div id="checkBoxes" className="buttons-navbar-project" style={{ display: show ? "block" : "none" }}> 
                    <div className="select-item">
                        <input type="checkbox" id="option2"/> 
                        <label for="option2">category 2</label>
                    </div>
                    <div className="select-item">
                        <input type="checkbox" id="option2"/> 
                        <label for="option2">category 2</label>
                    </div>
                </div>
            </div>

            <button className="buttons-navbar-project" onClick={() => fetchProjects()}>Reload</button>
            
            <div className="search-bar">  
                <input type="search" placeholder="Search..."/>
                <button className="search-button"></button> 
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
    )
}


export default BarProjects;