"use client";
import { signOut } from "next-auth/react";
import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import UserAvatar from "../UserAvatar/UserAvatar";
import NavBarList from "../NavBarList/NavBarList";
import { NavigationMenu } from "@radix-ui/react-navigation-menu";
type Props = {
  user: Pick<User, "name" | "image" | "email">;
};
export default function UserNav({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-6 w-6 rounded-xl">
          <UserAvatar user={user} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1 ">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-zinc-700 text-sm w-[200px">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <NavigationMenu>
            <ul>
              <NavBarList />
            </ul>
          </NavigationMenu>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span
            onClick={() => {
              signOut();
            }}
            className="inline-flex font-semibold cursor-pointer  text-red-800"
          >
            Sign Out
            <LogOutIcon className="w-4 h-4 ml-2" />
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
