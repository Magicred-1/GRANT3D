import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
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
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useXRPL } from "./web3auth/XRPLProvider/useXRPL";

const Header = () => {
  const router = useRouter();
  const { isConnected, getUserInfo, disconnect } = useXRPL();
  const [user, setUser] = useState({
    name: "John Doe",
    email: "djasongadiou@gmail.com",
    avatar: "/placeholder.svg?height=128&width=128",
  });

  // useEffect(() => {
  //   if (!isConnected) {
  //     router.push("/");
  //   }
  // }, [isConnected]);

  useEffect(() => {
    if (isConnected) {
      const fetchUserInfo = async () => {
        const userInfo = await getUserInfo();
        console.log(userInfo);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Image
            src="/grant3d_logo.png"
            alt="Logo"
            width={150}
            height={40}
            className="w-36 md:w-48 lg:w-52"
            onClick={() => {
              router.push("/campaigns");
            }}
          />

          {/* Main actions section */}
          <div className="flex items-center space-x-4">
            {/* Search and Button, hidden on small screens */}
            <div className="hidden sm:flex items-center space-x-4">
              {/* Wallet Balance */}
              <Button
                variant="default"
                onClick={() => {
                  router.push("/fund");
                }}
              >
                <PiggyBank className="h-6 w-6" />
                <span className="hidden md:inline">Fund DAO</span>
              </Button>
              <Button
                variant="default"
                onClick={() => router.push("/create-campaigns")}
              >
                <CirclePlus className="h-6 w-6" />
                <span className="hidden md:inline">Create Campaign</span>
              </Button>
            </div>

            {/* Dropdown Menu for Profile/Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                    <AvatarFallback>
                      D
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 sm:w-44 md:w-56"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      John Doe
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john.doe@gmail.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    router.push("/profile");
                  }}
                >
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
