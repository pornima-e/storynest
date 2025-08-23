import { Button } from "@/components/ui/button";
import { getMember, getServerClient } from "../lib/wix";
import { StarIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Header } from "../header";

interface Story {
    _id: string;
    title?: string; // Adjusted field name to 'title' per your STORIES CMS data
    [key: string]: any;
}

export default async function ReviewsPage() {
    const member = await getMember();
    if (!member) {
        return redirect("/");
    }
    const client = await getServerClient();

    // Step 1: Query reviews of current member
    const { items: reviews } = await client.items
        .query("REVIEWS")
        .eq("_owner", member.id)
        .find();

    // Step 2: Extract unique story IDs from reviews
    const storyIds = [...new Set(reviews.map((r) => r.storyId).filter(Boolean))];

    // Step 3: Query STORIES collection for these storyIds
    let storiesMap: Record<string, Story> = {};
    if (storyIds.length > 0) {
        const { items: stories } = await client.items
            .query("Stories")
            .hasSome("_id", storyIds)
            .find();
        storiesMap = stories.reduce((acc, story) => {
            acc[story._id] = story as Story;
            return acc;
        }, {} as Record<string, Story>);
    }

    return (
        <>
            <Header />
            <div className="container mx-auto py-12 space-y-8">
                <h1 className="text-2xl font-bold">Your Reviews</h1>
                {reviews.length === 0 ? (
                    <div className="border p-12 flex flex-col gap-4 items-center justify-center">
                        <Image
                            width={200}
                            height={200}
                            src="/no_data.svg"
                            alt="story not found icon"
                        />
                        <p>You have not reviewed any stories yet</p>
                    </div>
                ) : (
                    reviews.map((review) => {
                        const story = storiesMap[review.storyId];
                        return (
                            <div key={review._id} className="border-b pb-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-lg">
                                            {story?.title ?? "Unknown Story"}
                                        </p>
                                        <p className="font-semibold">{review.name}</p>
                                    </div>
                                    <div className="flex">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                            />
                                        ))}
                                    </div>
                                    <form
                                        action={async () => {
                                            "use server";
                                            const client = await getServerClient();
                                            await client.items.remove("REVIEWS", review._id);
                                            revalidatePath("/reviews");
                                        }}
                                    >
                                        <Button>Delete</Button>
                                    </form>
                                </div>
                                <p className="mt-2">{review.review}</p>
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
}
