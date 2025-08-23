import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import './globals.css';
import { loginAction, logoutAction } from "./actions";
import { getClient } from "./lib/wix-client";
import { getMember, getServerClient } from "./lib/wix";

export async function Header() {
    const client = await getClient(); // Await if async
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
                        StoryNest
                    </Link>
                </Button>
                <div className="flex items-center gap-6">
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
            </div>
        </div>
    );
}
