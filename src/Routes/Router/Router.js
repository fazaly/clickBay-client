import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import About from "../../Pages/About/About";
import DetailPost from "../../Pages/DetailPost/DetailPost";
import Home from "../../Pages/Home/Home";
import Media from "../../Pages/Media/Media";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import LogIn from "../../Pages/Shared/LogIn/LogIn";
import SignUp from "../../Pages/Shared/SignUp/SignUp";


const router = createBrowserRouter([
    {
        path:'/',
        element: <Main/>,
        errorElement:<ErrorPage/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/home',
                element: <Home/>
            },
            {
                path: '/about',
                element: <About/>
            },
            {
                path: '/media',
                element: <Media/>
            },
            {
                path: '/mediaDetail/:id',
                element: <DetailPost></DetailPost>,
                loader: ({ params }) => fetch(`https://social-media-platform-server.vercel.app/myMedia/${params.id}`)
            },
            {
                path: '/login',
                element: <LogIn/>
            },
            {
                path: '/signup',
                element: <SignUp/>
            }
        ]
    }
]);
export default router;