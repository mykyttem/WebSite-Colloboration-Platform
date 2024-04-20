import { createBrowserRouter, Navigate } from "react-router-dom";
import publicRouters from "./publicRouters";
import profileRouters from "./privateRouters";


const Router = createBrowserRouter([
    ...publicRouters,
    ...profileRouters,
    {
        path: '*',
        element: <Navigate to='not-found' replace />
    }
]);


export default Router;