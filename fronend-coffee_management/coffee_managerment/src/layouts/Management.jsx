import { Outlet } from 'react-router-dom'
import Login from '../components/Login/Login';

const auth = () => {
    return true;
}

export default function Management() {
    if (auth() === true) {
        return (<Outlet />)
    } else {
        return (<Login />)
    }
}
