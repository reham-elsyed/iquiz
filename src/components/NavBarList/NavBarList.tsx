'use client'
import { LinkProps, linksArray } from '@/types/navbarTypes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const NavBarList = () => {

    const pathName = usePathname()
  return (
    <>
    {linksArray.map((link:LinkProps, i:number)=>( 
        <li key={i}>
            {pathName === link.href?<Link className="text-red-800" href={link.href} >{link.name}</Link>:<Link className="text-blue underline" href={link.href} >{link.name}</Link>}
            </li>
        ))}
        </>
  )
}



export default NavBarList