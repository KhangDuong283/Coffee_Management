import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Post() {
  return (
    <div>
      Post
    <Outlet />
    </div>
  )
}
