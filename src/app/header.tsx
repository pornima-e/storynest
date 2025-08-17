import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import './globals.css';

export async function Header() {
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
                <div>
                    <Button asChild variant="link">
                        <Link href="/stories" className="text-green-800"> 🌱 Browse Stories</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
