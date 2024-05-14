import useCustomNavigate from "../../../hooks/redirect";
import { SaveUser } from "../../../requests/fetchAuth";


const FinishSignUp = ({ username, email, password, selectedAvatar }) => {
    const redirectTo = useCustomNavigate();

    const handleSignUp = async () => {
        try {
            await SaveUser(username, email, password, selectedAvatar);
            redirectTo("/sign-in");
        } catch (error) { 
            console.error(`Error signing up: ${error}`);
        }
    };

    return (
        <>
            <button className="started" onClick={handleSignUp}>Get Started</button>

            <button className="google">    
                <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" className="svg-inline--fa fa-google fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" style={{width: '20px', height: '20px', marginRight: '10px'}}>
                    <path fill="currentColor" d="M488 261.8c0 141.4-102 241.7-241 241.7-133.7 0-242-108.3-242-242S113.3 19.7 247 19.7c66.3 0 114.3 23.6 157.7 65l-63.6 61.2c-30.2-28.8-61.1-44-94.1-44-80.4 0-146.6 68.7-146.6 153.4 0 84.7 66.1 153.4 146.6 153.4 74.6 0 119.5-52.7 124.3-126.9H247v-85.7h241v81.1z"></path>
                </svg>Continue With Google
            </button>
        </>
    )
}


export default FinishSignUp;