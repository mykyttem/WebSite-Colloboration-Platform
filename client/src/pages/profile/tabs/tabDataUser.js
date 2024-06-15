import useCustomNavigate from "../../../hooks/redirect";

const TabDataUser = ({activeTab, userData}) => {
    const redirectTo = useCustomNavigate();


    return (
        <div id="Tab1" className="tabcontent" style={{ display: activeTab === "Tab1" ? "block" : "none" }}>
            <div className="home-tab">
                <h3 className="info">Info</h3>
                <h3 className="prof">Profile of user</h3>
                <div className="description-profile">
                    {userData && (
                        <>
                            <p>{userData.bio}</p>
                            <div className="info-tegs">
                                <div>
                                    <p><b>{userData.created}</b></p>
                                </div>
                                <div onClick={() => redirectTo("/profile/update")}>
                                    <p><b>Edit Profile</b></p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}


export default TabDataUser;