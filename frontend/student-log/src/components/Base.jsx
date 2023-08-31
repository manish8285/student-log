import React from 'react'
import Topbar from './Topbar'
import SideMenu from './SideMenu'

const Base = ({children}) => {
  return (
    <div className=''>
        <Topbar />
        <div className='flex'>
        <SideMenu />
        <div className='w-full  m-5'>
        {
            children
        }
        </div>
        </div>
        
    </div>
  )
}

export default Base