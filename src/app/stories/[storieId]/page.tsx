import Image from "next/image";
import client from "../../lib/wix";

export default async function StoryPage(props: { params: { storieId: string } }) {
    // Await params before using it (Next.js 15+ dynamic API!)
    const { params } = props;
    const awaitedParams = await params;
    const storieId = awaitedParams?.storieId;

    if (!storieId) {
        return <div className="text-red-500">Missing story ID.</div>;
    }

    // Query for the story by _id
    const result = await client.items
        .query("Stories")
        .eq("_id", storieId)
        .find();

    if (!result.items?.length) {
        return <div className="text-gray-500">Story not found.</div>;
    }

    const story = result.items[0];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-gray-100 px-4 py-10">
            <div className="max-w-2xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* COVER IMAGE */}
                    <div className="flex-shrink-0 bg-gray-100 flex items-center justify-center md:w-1/2">
                        {story.coverImage ? (
                            <Image
                                src={story.coverImage}
                                width={320}
                                height={440}
                                alt={story.title}
                                className="w-full h-[440px] object-cover"
                                priority
                            />
                        ) : (
                            <div className="w-full h-[440px] flex items-center justify-center bg-gray-200 text-gray-400 italic">
                                No cover image
                            </div>
                        )}
                    </div>
                    {/* STORY INFO */}
                    <div className="flex-1 p-8 flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-extrabold text-green-900 mb-2">{story.title}</h1>
                            <p className="text-lg text-gray-700 mb-1">
                                <span className="font-semibold">By</span> {story.author}
                            </p>
                            {/* Publication Date */}
                            <p className="text-sm text-gray-500 mb-4">
                                Published on{" "}
                                <span className="font-semibold">
                                    {story.publicationDate
                                        ? new Date(story.publicationDate).toLocaleDateString(undefined, {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })
                                        : "Unknown"}
                                </span>
                            </p>
                            <hr className="my-4" />
                            <p className="text-gray-800 leading-relaxed text-lg">{story.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
