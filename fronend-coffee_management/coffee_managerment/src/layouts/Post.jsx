import React from 'react'
import { Outlet } from 'react-router-dom'
import PostLogin from '../components/Auth/PostLogin/PostLogin';


const authPost = () => {
  return false;
}

export default function Post() {
  if (authPost() === true) {
    return (<Outlet />)
  } else {
    return (<PostLogin />)
  }
}
