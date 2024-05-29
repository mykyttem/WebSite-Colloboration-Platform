import React, { useState, useEffect } from "react";
import useFetchUserData from "../../components/useUserData";
import "./styles/profile.css";
import TabSettings from "./tabs/tabSettings";
import TabProjects from "./tabs/tabProjects";
import TabReviews from "./tabs/tabReviews";
import TabDataUser from "./tabs/tabDataUser";
import TabList from "./tabs/tabList";


const ProfileUser = () => {
    const userData = useFetchUserData();
    const userAvatar = "http://localhost:5000/profile/avatar";

    const [activeTab, setActiveTab] = useState("Tab1");

    useEffect(() => {
        const activeLine = document.getElementById("activeLine");
        const defaultOpen = document.getElementById("defaultOpen");
        if (defaultOpen) {
            activeLine.style.width = defaultOpen.offsetWidth + "px";
            activeLine.style.left = defaultOpen.offsetLeft + "px";
        }
    }, []);

    const openTab = (evt, tabName) => {
        setActiveTab(tabName);
        const activeLine = document.getElementById("activeLine");
        activeLine.style.width = evt.currentTarget.offsetWidth + "px";
        activeLine.style.left = evt.currentTarget.offsetLeft + "px";
    };

    return (
        <div className="profile-page">
            <div className="profile-top">
                <div className="avatar-back">
                    <img src={userAvatar} className="avatar-profile" alt="User Avatar" />
                    {userData && (
                        <>
                            <p className="name">{userData.username}</p>
                            <p className="location">Here location</p>
                        </>
                    )}
                </div>
            </div>

            <div className="profile-bottom">
                <TabList openTab={openTab}/>

                <TabDataUser activeTab={activeTab}/>
                <TabProjects activeTab={activeTab}/>
                <TabReviews activeTab={activeTab}/>
                <TabSettings activeTab={activeTab}/>
            </div>
        </div>
    );
};


export default ProfileUser;