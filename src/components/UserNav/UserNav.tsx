'use client'
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function UserNav(){
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
<Button variant='ghost' className="relative h-10 w-10 rounded-sm">
<Avatar className="h-10 w-10 rounded-sm">
  <AvatarImage src="https://gokxczesysklzepbknzb.supabase.co/storage/v1/object/public/user-image/user.png"/>
  <AvatarFallback className="rounded-sm"> avatar</AvatarFallback>  
</Avatar>
</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
<DropdownMenuLabel>
    <div className="flex flex-col space-y-1 ">
        <p className="text-sm font-medium leading-none">name</p>
        <p>i have a dropdown</p>
    </div>
</DropdownMenuLabel>
<DropdownMenuSeparator/>
<DropdownMenuItem>
            <span onClick={()=>{signOut()}}>Sign Out</span>
            </DropdownMenuItem>
            </DropdownMenuContent>
           
        </DropdownMenu>
    )
}
