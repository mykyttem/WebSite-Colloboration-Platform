const TabReviews = ({activeTab}) => {
    return (
        <div id="Tab3" className="tabcontent" style={{ display: activeTab === "Tab3" ? "block" : "none" }}>
            <div className="reviews-tab"><h3>Reviews</h3></div>
        </div>        
    )
}


export default TabReviews;