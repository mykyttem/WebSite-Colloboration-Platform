import React, { useState } from "react";
import useCustomNavigate from "../../hooks/redirect";
import { SaveProject } from "./fetch";


const CreateProject = () => {
    const redirectTo = useCustomNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [Members, setMembers] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [categories, setCategories] = useState({
        first: false,
        second: false
    });

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleMembersChange = (event) => {
        setMembers(event.target.value);
    };

    const handleActiveChange = (event) => {
        setIsActive(event.target.value === 'active-yeas');
    };

    const handleCategoryChange = (event) => {
        const { name, checked } = event.target;
        setCategories(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleSave = () => {
        try {
            SaveProject(title, description, Members, isActive, categories);
            redirectTo("/profile");
        } catch (error) {
            console.log(`Error save project ${error}`)
        };
    }

    return (
        <>
            <input type="text" placeholder="title" value={title} onChange={handleTitleChange} /> <br></br>
            <textarea placeholder="description" value={description} onChange={handleDescriptionChange} /> <br></br>
            <input type="number" placeholder="number of Members" value={Members} onChange={handleMembersChange} /> <br></br>

            <label>Active </label>
            <label htmlFor="active-yeas">Yes</label>
            <input type="radio" id="active-yeas" name="active" value="active-yeas" checked={isActive} onChange={handleActiveChange} />
            <label htmlFor="active-no">No</label>
            <input type="radio" id="active-no" name="active" value="active-no" checked={!isActive} onChange={handleActiveChange} /> <br></br>

            <label htmlFor="categories_first">categories first</label>
            <input type="checkbox" id="categories_first" name="first" value={categories.first} onChange={handleCategoryChange} />
            <label htmlFor="categories_second">categories second</label>
            <input type="checkbox" id="categories_second" name="second" value={categories.second} onChange={handleCategoryChange} />

            <button onClick={handleSave}>Save</button>
        </>
    );
}


export default CreateProject;