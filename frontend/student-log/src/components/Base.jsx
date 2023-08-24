import React from 'react'
import Topbar from './Topbar'
import SideMenu from './SideMenu'

const Base = ({children}) => {
  return (
    <div className=''>
        <Topbar />
        <div className='flex'>
        <SideMenu />
        <div>
        {
            children
        }
        </div>
        </div>
        
    </div>
  )
}

export default Base