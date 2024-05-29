const TabList = ({openTab}) => {
    return (
        <div className="tab">
            <button className="tablinks" onClick={(e) => openTab(e, 'Tab1')} id="defaultOpen"><b>Home</b></button>
            <button className="tablinks" onClick={(e) => openTab(e, 'Tab2')}><b>My Projects</b></button>
            <button className="tablinks" onClick={(e) => openTab(e, 'Tab3')}><b>Reviews</b></button>
            <button className="tablinks" onClick={(e) => openTab(e, 'Tab4')}><b>Settings</b></button>
            <div className="active-line" id="activeLine"></div>
        </div>
    )
}


export default TabList;