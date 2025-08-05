import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import client from "../lib/wix";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default async function Home() {
    if (!process.env.NEXT_PUBLIC_WIX_CLIENT_ID) {
        throw new Error("WIX_CLIENT_ID is not defined in your environment.");
    }

    const result = await client.items.query("Stories").find();
    const stories = result.items;

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-sky-100 px-4 py-8 flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 text-green-900 tracking-tight">
                🌱 Stories
            </h1>
            <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {stories.map((story: any) => (
                    <Card
                        key={story._id}
                        className="flex flex-col h-full overflow-hidden shadow-xl border border-green-100 hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300 bg-white"
                    >
                        <CardHeader className="p-0">
                            {/* COVER IMAGE – if available */}
                            {story.coverImage && (
                                <div className="w-full h-52 relative">
                                    <Image
                                        src={story.coverImage}
                                        alt={story.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        priority
                                    />
                                </div>
                            )}
                            <div className="p-4">
                                <CardTitle className="text-xl font-semibold">{story.title ?? "Untitled"}</CardTitle>
                                <CardDescription className="mt-1 text-sm">
                                    {story.author ? `By ${story.author}` : "Unknown Author"}
                                    {story.publicationDate && (
                                        <>
                                            <br />
                                            <span className="text-xs text-gray-500">
                                                {new Date(story.publicationDate).toLocaleDateString(undefined, {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </>
                                    )}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="grow px-4 pb-2">
                            <p className="text-base text-gray-700 line-clamp-4">
                                {story.description && story.description.length > 120
                                    ? story.description.slice(0, 120) + "…"
                                    : story.description ?? "No description."}
                            </p>
                        </CardContent>
                        <CardFooter className="px-4 pb-4 pt-2 mt-auto">
                            <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-700">
                                <Link href={`/stories/${story._id}`}>Read Reviews</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <Button size="lg" className="bg-sky-700 hover:bg-sky-900 rounded-xl shadow-lg mb-8">
                Add Stories
            </Button>
        </div>
    );
}
