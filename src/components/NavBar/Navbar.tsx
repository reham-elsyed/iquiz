import Link from "next/link";
import UserNav from "../UserNav/UserNav";
import { getAuthSession } from "@/lib/nextAuth";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/themeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
} from "../ui/navigation-menu";

export default async function Navbar() {
  const session = await getAuthSession();

  return (
    <nav className="fixed top-2 right-5 left-56 z-20  bg-card/40 backdrop-blur-sm border-white/20 shadow-lg rounded-s-3xl rounded-e-3xl">
      <div className="w-full max-w-7xl max-auto flex items-center px-5 sm:px-6 py-1  lg:px-8 lg:pe-20 justify-between">
        <div>
          <NavigationMenu>
            <Link
              href="/home"
              className="w-32 rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white "
            >
              IQuiz
            </Link>

            {/* <ul className="lg:flex gap-x-4 ml-14 hidden self-start">
              <li className="">
                <input type="text" placeholder="search" />
              </li>
               <NavBarList/> 
            </ul> */}
          </NavigationMenu>
        </div>

        <div className=" flex items-center justify-center gap-3 rounded-full">
          <div className="rounded-full"><ThemeToggle className="rounded-full" /></div>
          {session?.user ? (
            <UserNav user={session.user} />
          ) : (
            <Button>
              <Link href={"/login"}>Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
