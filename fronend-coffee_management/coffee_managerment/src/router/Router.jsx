import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Branch from '../pages/Management/Branch/Branch';
import Dashboard from '../pages/Management/Dashboard/Dashboard';
import Employee from '../pages/Management/Employee/Employee';
import Product from '../pages/Management/Product/Product';
import Sales from '../pages/Management/Sales/Sales';
import Error from './../includes/Error';
import Management from '../layouts/Management';
import Post from '../layouts/Post';
import Menu from './../pages/Post/Menu/Menu';
import Order from './../pages/Post/Order/Order';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import PostLogin from '../components/PostLogin/PostLogin';
import ResetPassword from '../components/ResetPassword/ResetPassword';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Management />,
        errorElement: <Error />,
        children: [
            {
                path: '/management/dashboard',
                element: <Dashboard />,
                errorElement: <Error />
            },
            {
                path: '/management/sales',
                element: <Sales />,
                errorElement: <Error />,
            },
            {
                path: '/management/product',
                element: <Product />,
                errorElement: <Error />,
            },
            {
                path: '/management/employee',
                element: <Employee />,
                errorElement: <Error />,
            },
            {
                path: '/management/branch',
                element: <Branch />,
                errorElement: <Error />,
            }
        ]
    },
    {
        path: '/',
        element: <Post />,
        errorElement: <Error />,
        children: [
            {
                path: '/post/menu',
                element: <Menu />,
                errorElement: <Error />,
            },
            {
                path: '/post/order',
                element: <Order />,
                errorElement: <Error />,
            },
        ]
    },
    {
        path: '/management/admin_login',
        element: <Login />,
        errorElement: <Error />
    },
    {
        path: '/management/admin_register',
        element: <Register />,
        errorElement: <Error />
    },
    {
        path: '/management/reset_password',
        element: <ResetPassword />,
        errorElement: <Error />
    },
    {
        path: '/post/post_login',
        element: <PostLogin />,
        errorElement: <Error />
    }
])

function Router() {
    return (
        <RouterProvider router={router} />
    )
}

export default Router;
