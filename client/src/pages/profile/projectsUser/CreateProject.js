import React, { useState, useEffect, useRef } from "react";
import useCustomNavigate from "../../../hooks/redirect";
import { SaveProject } from "../../../requests/fetchProjectsUser";

/**
 * The CreateProject component facilitates the creation of new project entries. It includes input fields
 * for title, description, and number of members, radio buttons for project activity status, checkboxes
 * for predefined categories, and an input field for adding custom categories. Users can dynamically add
 * and remove categories, with validation ensuring all required fields are filled before saving. Upon saving,
 * the project data is sent to the server via the SaveProject function, and the user is redirected to their
*/


const CreateProject = () => {
    const redirectTo = useCustomNavigate();

    // State variables for project details
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [Members, setMembers] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [categories, setCategories] = useState({
        first: false,
        second: false
    });
    const [newCategory, setNewCategory] = useState('');
    const [addedCategories, setAddedCategories] = useState([]);
    const [formValid, setFormValid] = useState(false);

    const newCategoryInput = useRef(null);

    // Effect to validate form completeness
    useEffect(() => {
        setFormValid(title !== '' && description !== '' && Members !== 0 && (categories.first || categories.second || Object.values(addedCategories).length > 0));
    }, [title, description, Members, categories, addedCategories]);

    // Event handler for active status change
    const handleActiveChange = (event) => {
        setIsActive(event.target.value === 'active-yes');
    };

    // Event handler for checkbox category change
    const handleCategoryChange = (event) => {
        const { name, checked } = event.target;
        setCategories(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };
    
    const handleNewCategoryChange = (event) => {
        setNewCategory(event.target.value);
    };

    const handleAddCategory = () => {
        if (newCategory.trim() !== "") {
            setAddedCategories(prevState => [...prevState, newCategory.trim()]);
            setNewCategory('');
            newCategoryInput.current.focus(); 
        }
    };

    const handleRemoveCategory = (category) => {
        const updatedCategories = addedCategories.filter(cat => cat !== category);
        setAddedCategories(updatedCategories);
    };

    const handleSave = () => {
        if (!formValid) {
            alert('Please fill in all required fields before saving.');
            return;
        }
        
        try {
            const allCategories = { ...categories };
            addedCategories.forEach(category => {
                allCategories[category] = true;
            });
            SaveProject(title, description, Members, isActive, allCategories);
            redirectTo("/profile");
        } catch (error) {
            console.log(`Error save project ${error}`);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddCategory();
        }
    };

    return (
        <>
            <input 
                type="text" 
                placeholder="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            /> <br></br>
            <textarea 
                placeholder="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
            /> <br></br>
            <input 
                type="number" 
                placeholder="number of Members" 
                value={Members} 
                onChange={(e) => setMembers(e.target.value)} 
            /> <br></br>

            <label>Active </label>
            <label htmlFor="active-yes">Yes</label>
            <input 
                type="radio" 
                id="active-yes" 
                name="active" 
                value="active-yes" 
                checked={isActive} 
                onChange={handleActiveChange} 
            />
            <label htmlFor="active-no">No</label>
            <input 
                type="radio" 
                id="active-no" 
                name="active" 
                value="active-no" 
                checked={!isActive} 
                onChange={handleActiveChange} 
            /> <br></br>

            <label htmlFor="categories_first">categories first</label>
            <input 
                type="checkbox" 
                id="categories_first" 
                name="first" 
                value={categories.first} 
                onChange={handleCategoryChange} 
            />
            <label htmlFor="categories_second">categories second</label>
            <input 
                type="checkbox" 
                id="categories_second" 
                name="second" 
                value={categories.second} 
                onChange={handleCategoryChange} 
            />

            <br></br>
            <label htmlFor="newCategory">New Category</label>
            <input 
                ref={newCategoryInput}
                type="text" 
                id="newCategory" 
                placeholder="Add new category and press Enter..." 
                value={newCategory} 
                onChange={handleNewCategoryChange} 
                onKeyPress={handleKeyPress} 
            /> 
            <button onClick={handleAddCategory}>Add</button>
            <br></br>

            <div>
                {addedCategories.map((category, index) => (
                    <div key={index}>
                        {category} <button onClick={() => handleRemoveCategory(category)}>Remove</button>
                    </div>
                ))}
            </div>
            <br></br>

            <button disabled={!formValid} onClick={handleSave}>Save</button>
        </>
    );
}


export default CreateProject;