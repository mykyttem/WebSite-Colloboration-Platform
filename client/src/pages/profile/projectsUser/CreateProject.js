import React, { useState, useEffect, useRef } from "react";
import useCustomNavigate from "../../../hooks/redirect";
import { SaveProject } from "../../../requests/fetchProjectsUser";
import "../styles/create_project.css";

/**
 * The CreateProject component facilitates the creation of new project entries. It includes input fields
 * for title, description, and number of members, radio buttons for project activity status, checkboxes
 * for predefined categories, and an input field for adding custom categories. Users can dynamically add
 * and remove categories, with validation ensuring all required fields are filled before saving. Upon saving,
 * the project data is sent to the server via the SaveProject function, and the user is redirected to their
*/


const CreateProject = () => {
    const redirectTo = useCustomNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [Members, setMembers] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [categories, setCategories] = useState({ first: false, second: false });
    const [newCategory, setNewCategory] = useState('');
    const [addedCategories, setAddedCategories] = useState([]);
    const [formValid, setFormValid] = useState(false);

    const newCategoryInput = useRef(null);

    useEffect(() => {
        setFormValid(title && description && Members && (categories.first || categories.second || addedCategories.length > 0));
    }, [title, description, Members, categories, addedCategories]);

    const handleActiveChange = (event) => {
        setIsActive(event.target.value === 'active-yes');
    };

    const handleCategoryChange = (event) => {
        const { name, checked } = event.target;
        setCategories(prev => ({ ...prev, [name]: checked }));
    };

    const handleAddCategory = () => {
        if (newCategory.trim()) {
            setAddedCategories(prev => [...prev, newCategory.trim()]);
            setNewCategory('');
            newCategoryInput.current.focus(); 
        }
    };

    const handleSave = () => {
        if (!formValid) {
            alert('Please fill in all required fields before saving.');
            return;
        }

        try {
            const allCategories = { ...categories, ...Object.fromEntries(addedCategories.map(cat => [cat, true])) };
            SaveProject(title, description, Members, isActive, allCategories);
            redirectTo("/profile");
        } catch (error) {
            console.log(`Error saving project: ${error}`);
        }
    };

    return (
        <div className="add-project-page">
            <div className="start-project">
                <div className="start-text">
                    <h3>Start The Project</h3>
                    <p>Start your project with CB-Platform</p>
                    <h1 className="enter-info-below">Enter The Info Below</h1>
                </div>
                <div className="add-project-content">   
                    <div className="add-project-content-left">
                        <input 
                            type="text" 
                            placeholder="Enter The Name" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                        <div className="add-project-description">
                            <input 
                                type="text" 
                                placeholder="Description" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                            />
                        </div>
                        <input 
                            type="number" 
                            placeholder="Number Of Members" 
                            value={Members} 
                            onChange={(e) => setMembers(e.target.value)} 
                        />
                        <div className="categories">
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="first" 
                                    checked={categories.first} 
                                    onChange={handleCategoryChange} 
                                />
                                Category 1
                            </label>
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="second" 
                                    checked={categories.second} 
                                    onChange={handleCategoryChange} 
                                />
                                Category 2
                            </label>
                        </div>
                        <div className="new-category">
                            <input
                                ref={newCategoryInput}
                                type="text"
                                placeholder="Add new category and press Enter..."
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                            />
                            <button onClick={handleAddCategory}>Add</button>
                        </div>
                        <div className="added-categories">
                            {addedCategories.map((category, index) => (
                                <div key={index} className="category">
                                    {category}
                                    <button onClick={() => setAddedCategories(prev => prev.filter(cat => cat !== category))}>Remove</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="add-project-content-right">
                        <div className="active-status">
                            <label>
                                <input
                                    type="radio"
                                    value="active-yes"
                                    checked={isActive}
                                    onChange={handleActiveChange}
                                />
                                Active
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="active-no"
                                    checked={!isActive}
                                    onChange={handleActiveChange}
                                />
                                Not Active
                            </label>
                        </div>
                        <button 
                            className="add-project-done" 
                            onClick={handleSave}
                            disabled={!formValid}
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CreateProject;