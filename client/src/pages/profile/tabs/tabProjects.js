import React from 'react';
import useCustomNavigate from "../../../hooks/redirect";
import ProjectsUser from "../projectsUser/ProjectsUser";

const TabProjects = ({ activeTab }) => {
    const redirectTo = useCustomNavigate();

    return (
        <div id="Tab2" className="tabcontent" style={{ display: activeTab === "Tab2" ? "block" : "none" }}>
            <ProjectsUser />

            <div className="my-projects-tab">
                <div className="my-projects-buttons" onClick={() => redirectTo('/projects')} style={{ cursor: 'pointer' }}>
                    <p><b>Join</b></p>
                </div>
                <div className="my-projects-buttons" onClick={() => redirectTo('/profile/create-project')}>
                    <p><b>Create</b></p>
                </div>
            </div>
        </div>
    );
};


export default TabProjects;