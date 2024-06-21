import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <Header />
    <main id='content'>
        <Outlet />
    </main>
    </>
  )
}

export default Layout