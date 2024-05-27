import useCustomNavigate from "../../../hooks/redirect";

const TabDataUser = ({activeTab}) => {
    const redirectTo = useCustomNavigate();


    return (
        <div id="Tab1" className="tabcontent" style={{ display: activeTab === "Tab1" ? "block" : "none" }}>
            <div className="home-tab">
                <h3 className="info">Info</h3>
                <h3 className="prof">Profile of user</h3>
                <div className="description-profile">
                    <p>Here bio user</p>
                    <div className="info-tegs">
                        <div>
                            <p><b>Join 21 May 2024</b></p>
                        </div>
                        <div onClick={() => redirectTo("/profile/update")}>
                            <p><b>Edit Profile</b></p>
                        </div>
                        <div>
                            <p><b>Expert Work Experience</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default TabDataUser;