
import {useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

import UserNav from "../UserNav/UserNav";
interface LinkProps{
    name:string;
    href: string;
}

type Links= LinkProps[]
const linksArray :Links=
[
    {name: 'Home', href:'/home'},
    {name: 'About', href:'/about'},
    {name: 'Create Quiz', href:'/new-quiz-form'},
    {name: 'My Quizes', href:'/quiz-archive'},
    
]

export default function Navbar(){
    const {data:session} = useSession()

const pathName = usePathname()
    return(
        <div className="w-full max-w-7xl max-auto flex items-center px-5 sm:px-6 py-5 lg:py-5 lg:px-8 justify-between">
            <Link href="/home" className="w-32 ">
            IQuiz
            </Link>
            <ul className="lg:flex gap-x-4 ml-14 hidden">

{linksArray.map((link, i)=>( 
    <li key={i}>
        {pathName === link.href?<Link className="text-red-800" href={link.href} >{link.name}</Link>:<Link className="text-blue underline" href={link.href} >{link.name}</Link>}
        </li>
    ))}
            </ul>
<div>

<UserNav/>
</div>
        </div>
    )
}