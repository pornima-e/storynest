import Image from "next/image";
import Link from "next/link";
import { getServerClient } from "../lib/wix";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { AddStoryDialog } from "./add-story-dialog";
import { Header } from "../header";
import { SearchIcon } from "lucide-react";

// Hash function to generate unique HSL color hue from title
function hashString(str: string) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) + hash + str.charCodeAt(i);
    }
    return Math.abs(hash);
}

// Generate light pastel gradient background from title hash
function gradientFromTitle(title: string) {
    const hash = hashString(title);
    const hue = hash % 360;
    const saturation = 65 + (hash % 10);
    const lightness = 86 + (hash % 7);
    // Linear gradient from pastel color to almost white
    return `linear-gradient(to bottom, hsl(${hue}, ${saturation}%, ${lightness}%), #f3f4f6 85%)`;
}

interface Story {
    _id: string;
    title?: string;
    author?: string;
    publicationDate?: string;
    description?: string;
}

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ search?: string }>;
}) {
    if (!process.env.NEXT_PUBLIC_WIX_CLIENT_ID) {
        throw new Error("WIX_CLIENT_ID is not defined in your environment.");
    }
    const resolvedParams = await searchParams;
    const result = await (await getServerClient()).items
        .query("Stories")
        .startsWith("title", resolvedParams.search ?? "")
        .find();
    const stories: Story[] = result.items;
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-b from-green-50 to-sky-100 px-4 py-8 flex flex-col items-center">
                <div className="flex gap-2 justify-around items-center w-full mb-4 sm:mb-6 lg:mb-10">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-green-900 tracking-tight">
                        Stories
                    </h1>
                    <form
                        action={async (formData) => {
                            "use server";
                            const search = formData.get("search");
                            redirect(`/stories?search=${search}`);
                        }}
                        className="flex gap-2"
                    >
                        <Input name="search" type="text" placeholder="Search Stories" />
                        <Button
                            type="submit"
                            variant="outline"
                            className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                            size="icon"
                        >
                            <SearchIcon />
                        </Button>
                    </form>
                    <AddStoryDialog />
                </div>
                <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {stories.length === 0 && (
                        <div className="col-span-full border p-12 flex flex-col gap-4 items-center justify-center">
                            <Image
                                width={200}
                                height={200}
                                src={"/no_data.svg"}
                                alt={"story not found icon"}
                            />
                            <p className="text-center">No Stories found</p>
                        </div>
                    )}
                    {stories.map((story) => {
                        const bgGradient = story.title ? gradientFromTitle(story.title) : "#fff";
                        return (
                            <Card
                                key={story._id}
                                style={{ background: bgGradient }}
                                className="flex flex-col h-full overflow-hidden shadow-xl border border-green-100 hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300"
                            >
                                <CardHeader className="p-4">
                                    <CardTitle className="text-xl font-semibold">
                                        {story.title ?? "Untitled"}
                                    </CardTitle>
                                    <CardDescription className="mt-1 text-sm">
                                        {story.author ? `By ${story.author}` : "Unknown Author"}
                                        {story.publicationDate && (
                                            <>
                                                <br />
                                                <span className="text-xs text-gray-500">
                                                    {new Date(story.publicationDate).toLocaleDateString(
                                                        undefined,
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </span>
                                            </>
                                        )}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grow px-4 pb-2">
                                    <p className="text-base text-gray-700 line-clamp-4">
                                        {story.description && story.description.length > 120
                                            ? story.description.slice(0, 120) + "…"
                                            : story.description ?? "No description."}
                                    </p>
                                </CardContent>
                                <CardFooter className="px-4 pb-4 pt-2 mt-auto">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="w-full bg-transparent text-green-600 border border-green-600 hover:bg-green-600 hover:text-white"
                                    >
                                        <Link href={`/stories/${story._id}`}>Read</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
