import { logout, deleteAccount, deactivateAccount } from "../../../requests/fetchUser";


const TabSettings = ({activeTab}) => {
    return (
        <>
            <div id="Tab4" className="tabcontent" style={{ display: activeTab === "Tab4" ? "block" : "none" }}>
                <div className="settings-tab">
                    <button onClick={logout}>Log out</button> <br />
                    <button onClick={deleteAccount}>Delete account</button> <br />
                    <button onClick={deactivateAccount}>Deactivate account</button>
                </div>
            </div>
        </>
    )
}


export default TabSettings;