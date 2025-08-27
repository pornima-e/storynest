import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import './globals.css';
import { loginAction, logoutAction } from "./actions";
import { getMember, getServerClient } from "./lib/wix";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MenuIcon } from "lucide-react";

export async function Header() {
    const serverClient = await getServerClient();
    const isLoggedIn = await serverClient.auth.loggedIn();
    const member = await getMember();

    return (
        <div className="animated-gradient border-b py-3">
            <div className="container mx-auto flex justify-between items-center">
                <Button variant="link" asChild>
                    <Link
                        href="/"
                        className="text-3xl flex items-center gap-2 font-[family-name:var(--font-dancing-script)] text-green-800"
                    >
                        <Image src="/story.png" width={32} height={32} alt="StoryNest" />
                        <span className="birthstone-regular text-green-800 text-4xl font-bold">
                            StoryNest
                        </span>
                    </Link>
                </Button>

                <div className="items-center gap-6 hidden md:flex">
                    <Button asChild variant="link">
                        <Link href="/stories" className="text-green-800 flex items-center gap-1">
                            🌱 <span className="font-semibold">Browse Stories</span>
                        </Link>
                    </Button>
                    {isLoggedIn && (
                        <Button asChild variant="link">
                            <Link href="/reviews" className="text-green-800 flex items-center gap-1">
                                ✒️ <span className="font-semibold">View Reviews</span>
                            </Link>
                        </Button>
                    )}
                    <div className="flex items-center gap-3">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-3">
                                <p className="text-sm font-medium text-green-700 flex items-center gap-1">
                                    👋 <span>Hello, {member?.nickname}</span>
                                </p>
                                <form action={logoutAction}>
                                    <Button variant="ghost" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
                                        ⏻ Logout
                                    </Button>
                                </form>
                            </div>
                        ) : (
                            <form action={loginAction}>
                                <Button variant="ghost" className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                                    ➜ Login
                                </Button>
                            </form>
                        )}
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger className="md:hidden mr-4">
                        <MenuIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {isLoggedIn ? <>
                            <DropdownMenuLabel>
                                <p className="text-sm font-medium text-green-700 flex items-center gap-1">
                                    👋 <span>Hello, {member?.nickname}</span>
                                </p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                        </> :
                            <form action={loginAction}>
                                <Button variant="ghost" className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                                    ➜ Login
                                </Button>
                            </form>}

                        <DropdownMenuItem>
                            <Link href="/stories" className="text-green-800 flex items-center gap-1">
                                🌱 <span className="font-semibold">Browse Stories</span>
                            </Link>
                        </DropdownMenuItem>

                        {isLoggedIn && <DropdownMenuItem><Link href="/reviews" className="text-green-800 flex items-center gap-1">
                            ✒️ <span className="font-semibold">View Reviews</span>
                        </Link></DropdownMenuItem>}

                        {isLoggedIn && (<DropdownMenuItem>
                            <form action={logoutAction}>
                                <Button variant="ghost" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
                                    ⏻ Logout
                                </Button>
                            </form>
                        </DropdownMenuItem>)}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
