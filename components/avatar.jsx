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
import { Moon, Sun } from "lucide-react";
import { useDarkStore, useUserStore } from "@/stores";
import { supabase } from "@/supabase";
import { useRouter } from "next/navigation";

export default function Avatar() {
  const router = useRouter();
  const isPremium = false;
  const { setUser, setSession } = useUserStore((state) => state);
  const { dark, setDark } = useDarkStore((state) => state);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("error", error);
    } else {
      setSession(null);
      setUser(null);
      router.push("/login");
    }
  };
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
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
