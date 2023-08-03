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
import useFetch from "@/hooks/useFetch";

export default function Avatar() {
  const isPremium = false;
  const dark = useDarkStore((state) => state.dark);
  const setDark = useDarkStore((state) => state.changeMode);
  const user = useUserStore((state) => state.user);
  const userSession = useUserStore((state) => state.userSession);
  const setUser = useUserStore((state) => state.setUser);
  const setUserSession = useUserStore((state) => state.setUserSession);
  const refresh_token = useUserStore(
    (state) => state.userSession
  )?.refresh_token;

  const handleLogout = async () => {
    const endpoint = "/auth/logout";
    const URL = process.env.NEXT_PUBLIC_API_URL + endpoint;
    const method = "POST";
    const headers = {
      "Content-Type": "application/json",
    };
    const options = {
      method,
      headers,
    };
    if (refresh_token) options.body = JSON.stringify({ refresh_token });
    console.log("options", options);
    try {
      await useFetch(URL, options);
      setUser(null);
      console.log("user", user);
      setUserSession(null);
      console.log("user session null", userSession);
    } catch (error) {
      console.log("error", error);
    }

    // const logout = await res.json();
    // console.log("logout", logout);
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
