import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Error from "../includes/Error";
import Dashboard from './../pages/Management/Dashboard/Dashboard';
import Sales from './../pages/Management/Sales/Sales';
import Product from './../pages/Management/Product/Product';
import Employee from './../pages/Management/Employee/Employee';
import Branch from './../pages/Management/Branch/Branch';
import Post from './../layouts/Post';
import Login from './../components/Auth/Login/Login';
import Register from './../components/Auth/Register/Register';
import ResetPassword from './../components/Auth/ResetPassword/ResetPassword';
import PostLogin from './../components/Auth/PostLogin/PostLogin';
import Management from '../layouts/Management';
import AddBranch from '../pages/Management/Branch/AddBranch';
import EditBranch from '../pages/Management/Branch/EditBranch';
import AddEmployee from '../pages/Management/Employee/AddEmployee';
import EditEmployee from '../pages/Management/Employee/EditEmployee';
import AddProduct from '../pages/Management/Product/AddProduct';
import EditProduct from '../pages/Management/Product/EditProduct';
import OrderPost from '../pages/Post/Order/OrderPost';
import Bill from '../components/Bill/Bill';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Management />,
        errorElement: <Error />
    },
    {
        path: '/management',
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
                path: '/management/branch',
                element: <Branch />,
                errorElement: <Error />,
            },
            {
                path: '/management/branch/add',
                element: <AddBranch />,
                errorElement: <Error />,
            },
            {
                path: '/management/branch/edit',
                element: <EditBranch />,
                errorElement: <Error />,
            },
            {
                path: '/management/employee',
                element: <Employee />,
                errorElement: <Error />,
            },
            {
                path: '/management/employee/add',
                element: <AddEmployee />,
                errorElement: <Error />,
            },
            {
                path: '/management/employee/edit',
                element: <EditEmployee />,
                errorElement: <Error />,
            },
            {
                path: '/management/product',
                element: <Product />,
                errorElement: <Error />,
            },
            {
                path: '/management/product/add',
                element: <AddProduct />,
                errorElement: <Error />,
            },
            {
                path: '/management/product/edit',
                element: <EditProduct />,
                errorElement: <Error />,
            }
        ]
    },
    {
        path: '/post',
        element: <Post />,
        errorElement: <Error />,
        children: [
            {
                path: '/post/order',
                element: <OrderPost />,
                errorElement: <Error />,
            },
            {
                path: '/post/print_bill',
                element: <Bill />,
                errorElement: <Error />,
            }
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
    },
])

function Router() {
    return (
        <RouterProvider router={router} />
    )
}

export default Router;
