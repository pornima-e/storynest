// Uncomment this when you have the Wix client setup
// import client from "@/lib/wix";

export default async function StoryPage() {
    // --- Replace this dummy data with actual Wix query ---
    // const result = await client.items.queryDataItems({
    //     dataCollectionId: "Stories",
    // });
    // const stories = result.items.map(item => item.data);

    const stories = [
        { title: "The Lost Planet", description: "A journey to a forgotten world." },
        { title: "Midnight Rain", description: "Mystery unfolds on a rainy night." },
    ];

    return (
        <div className="grid grid-rows-[120px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-4">
            <h1 className="text-2xl font-bold">Stories</h1>

            <ul className="mt-6 space-y-4 w-full max-w-xl">
                {stories.map((story, index) => (
                    <li key={index} className="border p-4 rounded shadow w-full">
                        <h2 className="text-lg font-semibold">{story.title}</h2>
                        <p className="text-gray-700">{story.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
