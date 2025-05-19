import React from 'react'

//import Dashboardicon from '/si_dashboard-fill.svg?url'
//import DashboardiconWhite from '/si_dashboard-fill-white.svg?url'

//import QuizIcon from '/material-symbols_quiz.svg?url'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
const Collabsed = () => {
   const pathname = usePathname()
     const navItems = [
      {
        href: '/home',
        label: 'Overview',
        icon: '/si_dashboard-fill.svg',
        activeIcon: '/si_dashboard-fill-white.svg',
        exact: true,
      },
      {
        href: '/userDashboard',
        label: 'Dashboard',
        icon: '/material-symbols_quiz.svg',
        activeIcon: '/material-symbols_quiz.svg',
      },
    ]
  return (
   <>
    <nav >
               <ul className=" flex gap-4 flex-col justify-center items-center">
                {navItems.map(({href, label, icon, activeIcon, exact})=>{
const isActive = exact ? pathname === href : pathname.startsWith(href)
                    return(
                        <li className="tab" key={label}>
                            <Link href={href}  className={`
                          ${ isActive?'bg-[#121212] text-white':"bg-[#F4ECE5] text-black"} 
                          flex justify-center items-center rounded-full h-12 w-12`}>                
    <img 
      src={isActive ?activeIcon : icon} 
      alt="Dashboard Icon" 
      className="h-6 w-6" 
    />
              </Link>
</li>)}
                )}
               </ul>
           </nav>
   </>
  )
}

export default Collabsed