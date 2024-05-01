const SortProjects = ({ sortDateHandler, sortMembersHandler, sortedByDate, sortedByMembers }) => {
    return (
        <div>
            <button onClick={sortDateHandler}>
                {sortedByDate ? "Reset Sorting by Date" : "Sort by Date"}
            </button>
            <button onClick={sortMembersHandler}>
                {sortedByMembers ? "Reset Sorting by Members" : "Sort by Members"}
            </button>
        </div>
    );
};

export default SortProjects;