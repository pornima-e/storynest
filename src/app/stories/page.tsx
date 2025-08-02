import Link from "next/link";

import { Button } from "@/components/ui/button";
import client from "../lib/wix";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export default async function Home() {

    if (!process.env.WIX_CLIENT_ID) {
        throw new Error("WIX_CLIENT_ID is not defined in your environment.");
    }


    const result = await client.items.query("Stories").find();
    const stories = result.items;
    console.log(stories);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center">
            <h1 className="text-2xl font-bold">Stories</h1>
            <div className="grid grid-cols-3 gap-4">
                {stories.map((story) => (
                    <Card key={story?._id}>
                        <CardHeader>
                            <CardTitle>{story?.title}</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{story?.author}</p>
                        </CardContent>
                        <CardFooter>

                            <Button asChild>
                                <Link href={`/stories/${story._id}`}>Read Reviews</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <Button>Add Stories</Button>
        </div>
    );
}