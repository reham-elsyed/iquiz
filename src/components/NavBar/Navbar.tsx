
import Link from "next/link";
import UserNav from "../UserNav/UserNav";
import { getAuthSession } from "@/lib/nextAuth";
import { Session } from "@prisma/client";
import NavBarList from "../NavBarList/NavBarList";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/themeToggle";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem } from "../ui/navigation-menu";

export default async function Navbar(){
const session =await getAuthSession()

    return(
        <nav className="fixed top-0 right-0 left-0 z-20 bg-background text-forground shadow-md shadow-border">
        <div className="w-full max-w-7xl max-auto flex items-center px-5 sm:px-6 py-5 lg:py-5 lg:px-8 justify-between">
          <div>
          <NavigationMenu>
            <Link href="/home" className="w-32 rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white ">
            IQuiz
            </Link>
      
           
               
            <ul className="lg:flex gap-x-4 ml-14 hidden self-start">
<NavBarList/>

            </ul> 
            </NavigationMenu>
            </div>

<div className=" flex items-center justify-center gap-2">
    <ThemeToggle/>
{session?.user ?
(<UserNav user={session.user}/>):
(<Button><Link href={'/login'}>Login</Link></Button>)}

</div>
        </div>
        </nav>
    )
}