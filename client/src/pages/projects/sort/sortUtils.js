export const sortProjectsByDate = (projects, originalProjects, sortedByDate) => {
    let sortedProjects;
    if (!sortedByDate) {
        sortedProjects = [...projects].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
        sortedProjects = originalProjects;
    }
    return sortedProjects;
};

export const sortProjectsByMembers = (projects, originalProjects, sortedByMembers) => {
    let sortedProjects;
    if (!sortedByMembers) {
        sortedProjects = [...projects].sort((a, b) => b.number_of_members - a.number_of_members);
    } else {
        sortedProjects = originalProjects;
    }
    return sortedProjects;
};