const BioInfo = ({ selectedAvatar, setSelectedAvatar }) => {
    const urlAvatar = "http://localhost:5000/auth/sign-up/select-avatar";

    const handleAvatarClick = (avatarType) => {
        setSelectedAvatar(avatarType);
    };

    return (
        <>
            <p className="title-auth">Choose your first avatar, you can change it in your profile</p>
            <div className="avatar-container">
                <img 
                    src={`${urlAvatar}/cat`} 
                    alt="Cat Avatar" 
                    className={selectedAvatar === "cat" ? "avatar-image selected" : "avatar-image"}
                    onClick={() => handleAvatarClick("cat")}
                />
                <img 
                    src={`${urlAvatar}/mouse`}  
                    alt="Mouse Avatar" 
                    className={selectedAvatar === "mouse" ? "avatar-image selected" : "avatar-image"}
                    onClick={() => handleAvatarClick("mouse")}
                />
            </div>    
        </>
    )
}


export default BioInfo;