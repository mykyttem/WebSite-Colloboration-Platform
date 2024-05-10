import React from "react";
import "./styles/home.css";
import homeImage from "../../assets/images/home.png"; 
import useCustomNavigate from "../../hooks/redirect";


const Home = () => {
    const redirectTo = useCustomNavigate();

    return (
        <div className="home-page-bg">
            <div className="header-text">
                <b><button className="let-start" onClick={() => redirectTo("/projects")}>Let's Start</button> Together With CB-Platform</b>
            </div>
            <div>
                <img src={homeImage} className="home-img" alt="home"/>
            </div>
            <div style={{ width: '827px' }}>
                <p className="home-text">From the developers: We believe in the power of unity and charity. Through CB-Platform, we give everyone the opportunity to make the world a better place. Join our community and help us support and implement projects that make a difference in our world.</p>
                <br />
                <p className="home-text">The CB-Platform project is an innovative platform for creating and supporting charitable projects and initiatives. Our mission is to bring people together and inspire good deeds. Together we can change the world!</p>
            </div>
            <div className="white-banner">
                On the homepage of our website, you will find
            </div>
        </div>
    );
}


export default Home;