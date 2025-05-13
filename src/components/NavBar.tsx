"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "./ui/button";

import SignOutButton from "./SignOutButton";
import { getAuth } from "@firebase/auth";
import firebaseApp from "../../firebase/clientApp";
import { useRouter } from "next/navigation";

const booksDetails: { title: string; href: string; description: string }[] = [
  {
    title: "View Book List",
    href: "/books",
    description: "View, update, and delete Books in the Book List",
  },
  {
    title: "Add Book",
    href: "/addBook",
    description: "Add new Book",
  },
];
const adminsDetails: { title: string; href: string; description: string }[] = [
  {
    title: "View Admin List",
    href: "/admins",
    description: "View, update, and delete Admins in the Admin List",
  },
  {
    title: "Add Admin",
    href: "/addAdmin",
    description: "Add a new Admin",
  },
];
const residentDetails: { title: string; href: string; description: string }[] =
  [
    {
      title: "View Users List",
      href: "/user",
      description:
        "View, update, and delete Students or Faculties Members in the User's List",
    },
    {
      title: "Add User",
      href: "/addUser",
      description: "Add a new Student or Faculty Members",
    },
  ];
const logsDetails: { title: string; href: string; description: string }[] = [
  {
    title: "View Entry Logs",
    href: "/logs",
    description:
      "View Students or Faculties Members entry logs in the library.",
  },
  {
    title: "View Book Borrow Logs",
    href: "/borrowLogs",
    description:
      "View Students or Faculties Members borrow logs in the library.",
  },
];

export function NavBar() {
  const [user, loading] = useAuthState(getAuth(firebaseApp));

  console.log("user", user);

  if (loading) {
    return <></>;
  }
  if (!user)
    return (
      <header className="w-full border-b">
        <div className="flex h-14 items-center px-4 justify-between ">
          <NavigationMenu>
            <NavigationMenuList className=" gap-2">
              <NavigationMenuItem>
                <Link href="/">
                  <p className="font-bold text-lg">LIMA</p>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button variant="outline">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </header>
    );

  return (
    <header className="w-full border-b">
      <div className="flex h-14 items-center px-4 justify-between">
        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <Link href="/" className="font-bold text-lg">
                LIMA
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Books</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 ">
                  {booksDetails.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Admins</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 ">
                  {adminsDetails.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>User</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 ">
                  {residentDetails.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Logs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 ">
                  {logsDetails.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex  gap-5">
          <div className="font-bold flex items-center">{user.displayName}</div>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
