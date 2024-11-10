import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useXRPL } from "./web3auth/XRPLProvider/useXRPL";
import { Menu, X } from "lucide-react"; // Icons for burger and close
import {
  Avatar,
  AvatarFallback,
} from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { User, LogOut, PiggyBank, CirclePlus } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const router = useRouter();
  const { isConnected, getUserInfo, disconnect } = useXRPL();
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@gmail.com",
    avatar: "/placeholder.svg?height=128&width=128",
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isConnected) {
      const fetchUserInfo = async () => {
        const userInfo = await getUserInfo();
        setUser(userInfo);
      };
      fetchUserInfo();
    }
  }, [isConnected]);

  const handleSignOut = () => {
    disconnect();
    router.push("/");
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Image
          src="/grant3d_logo.png"
          alt="Logo"
          width={150}
          height={40}
          className="w-36 md:w-48 lg:w-52 cursor-pointer"
          onClick={() => router.push("/campaigns")}
        />

        {/* Main actions */}
        <div className="hidden sm:flex items-center space-x-4">
          <Button variant="default" onClick={() => router.push("/fund")}>
            <PiggyBank className="h-6 w-6" />
            <span className="hidden md:inline">Fund DAO</span>
          </Button>
          <Button variant="default" onClick={() => router.push("/create-campaigns")}>
            <CirclePlus className="h-6 w-6" />
            <span className="hidden md:inline">Create Campaign</span>
          </Button>
        </div>

        {/* Profile and Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 sm:w-44 md:w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Burger Menu for Mobile */}
        <div className="sm:hidden">
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-800 shadow-md p-4 space-y-2">
          <Button variant="default" onClick={() => router.push("/fund")}>
            <PiggyBank className="h-6 w-6 mr-2" />
            Fund DAO
          </Button>
          <Button variant="default" onClick={() => router.push("/create-campaigns")}>
            <CirclePlus className="h-6 w-6 mr-2" />
            Create Campaign
          </Button>
          <Button variant="ghost" onClick={() => router.push("/profile")}>
            <User className="h-6 w-6 mr-2" />
            Profile
          </Button>
          <Button variant="ghost" onClick={handleSignOut}>
            <LogOut className="h-6 w-6 mr-2" />
            Log out
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
