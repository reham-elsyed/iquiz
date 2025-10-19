"use client";
import { LinksArray } from "@/types/navbarTypes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";

const NavBarList = () => {
  const pathName = usePathname();
  return (
    <>
      {LinksArray.map((link, i: number) => (
        <NavigationMenuItem
          className="w-full"
          key={i}
        >
          <Link
            className="w-full flex-justify-start  rounded-xl"
            href={link.href}
            passHref
          >
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), `w-full rounded-xl justify-start  ${pathName === link.href ? "bg-gray-200 text-gray-900 font-semibold" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"} `)}>
              {link.label}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      ))}
    </>
  );
};

export default NavBarList;
