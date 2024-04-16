import { useNavigate } from "react-router-dom";

const useCustomNavigate = () => {
    const navigate = useNavigate();
    
    const redirectTo = (path) => {
        navigate(path);
    };

    return redirectTo;
};

export default useCustomNavigate;