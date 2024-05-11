import { createBrowserRouter, Navigate } from "react-router-dom";
import publicRouters from "./publicRouters";
import privateRouters from "./privateRouters";


const Router = createBrowserRouter([
    ...publicRouters,
    ...privateRouters,
    {
        path: '*',
        element: <Navigate to='not-found' replace />
    }
]);


export default Router;