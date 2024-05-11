const InfoPrivateProject = ({project}) => {
    return (
        <>
            <div key={project.id}>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <p>Number of Members: {project.number_of_members}</p>
                <p>Members: {project.members}</p>
                <p>Active: {project.active ? 'Yes' : 'No'}</p>
                <p>Categories: {Object.values(project.categories).filter(category => category)}</p>
                <p>Date: {project.date}</p>
            </div>        
        </>
    )
}


export default InfoPrivateProject;