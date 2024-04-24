import React from "react";

const SortProjects = ({ sortHandler, sorted }) => {
    return (
        <button onClick={sortHandler}>
            {sorted ? "Reset Sorting" : "Sort by Date"}
        </button>
    );
};

export default SortProjects;