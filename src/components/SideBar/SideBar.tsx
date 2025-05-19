
'use client'
import React, {  useState } from 'react'


import NavBarList from '../NavBarList/NavBarList'
import { NavigationMenu } from '../ui/navigation-menu'
import ExpandedSidebar from './ExpandedSideBar'
import Collabsed from './CollabsedSidebar'
const Sidebar = () => {
    const [isToggled, setIsToggled] = useState(false)
    function handleToggle(){
        setIsToggled(prev=>!prev)
        console.log(isToggled)
    }
  return (
    <header className='bg-[#F4ECE5] rounded-md  w-fit  top-0 left-0 bottom-0 z-10 shadow-lg'>

        <h1 className='cursor-pointer  text-start p-2' onClick={handleToggle}>Study DUO</h1>
        {isToggled? <div className={` flex flex-col items-start  ${isToggled&& "animate-growWidth"} `}>
            {/* <ExpandedSidebar/> */}
         

<ExpandedSidebar/>
</div>:
<Collabsed/>
          }
      
    </header>
  )
}

export default Sidebar