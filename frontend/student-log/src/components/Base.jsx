import React from 'react'
import Topbar from './Topbar'
import SideMenu from './SideMenu'

const Base = ({children}) => {
  return (
    <div className=''>
        <Topbar />
        <div className='sm:flex'>
        <SideMenu />
        <div className='sm:ps-[360px] sm:pt-[25px] w-full  sm:m-5'>
        {
            children
        }
        </div>
        </div>
        
    </div>
  )
}

export default Base