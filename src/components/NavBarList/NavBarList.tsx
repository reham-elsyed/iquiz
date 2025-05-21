"use client";
import { LinkProps, linksArray } from "@/types/navbarTypes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

const NavBarList = () => {
  const pathName = usePathname();
  return (
    <>
      {linksArray.map((link: LinkProps, i: number) => (
        <NavigationMenuItem
          key={i}
          className={`${pathName === link.href}?'bg-red-900':'bg-forground'`}
        >
          <Link
            className={`${pathName === link.href}?'bg-red-900':'bg-forground'`}
            href={link.href}
            passHref
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {link.name}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      ))}
    </>
  );
};

export default NavBarList;
