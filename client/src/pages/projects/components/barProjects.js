import { useEffect, useState } from "react";

const BarProjects = ({sortDateHandler, sortMembersHandler, sortedByDate, sortedByMembers}) => {
    const [show, setShow] = useState(false);

    const showCheckboxes = () => {
        const checkboxes = document.getElementById("checkBoxes");

        if (checkboxes) {
            checkboxes.style.display = show ? "none" : "block";
            setShow(!show);
        }
    };

    useEffect(() => {
        // Adding event listener
        const selectBox = document.querySelector(".selectBox");
        if (selectBox) {
            selectBox.addEventListener("click", showCheckboxes);
        }

        // Cleanup
        return () => {
            if (selectBox) {
                selectBox.removeEventListener("click", showCheckboxes);
            }
        };
    }, [show]); 


    return (
        <div className="quick-bar">
            <div class="custom-select">
                <div class="selectBox" onclick={() => showCheckboxes()}>
                    <select>
                        <option>Select options</option>
                    </select>
                    <div class="overSelect"></div>
                </div>
    
                <div id="checkBoxes" className="sort"> 
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
            
            <div className="search-bar">  
                <input type="search" placeholder="Search..."/>
                <button className="search-button"></button> 
            </div>
            <div>
                <select name="sort" id="sort" className="sort">
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