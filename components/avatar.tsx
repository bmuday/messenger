"use client";
import {
  Avatar as Container,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Avatar() {
  const [dark, setDark] = useState(false);
  const isPremium = false;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Container>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Container>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>
          {isPremium ? "Billing" : "Become Premium!"}
        </DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDark(!dark)}>
          {dark ? (
            <>
              <span className="mr-2">LightMode</span>
              <Sun />
            </>
          ) : (
            <>
              <span className="mr-2">DarkMode</span>
              <Moon />
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
