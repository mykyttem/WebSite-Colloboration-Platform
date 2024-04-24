export const sortProjectsByDate = (projects, originalProjects, sorted) => {
    let sortedProjects;
    if (!sorted) {
        sortedProjects = [...projects].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
        sortedProjects = originalProjects;
    }
    return sortedProjects;
};