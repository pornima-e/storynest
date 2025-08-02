import client from "../lib/wix";

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
                {stories.map((story, idx) => (
                    <div key={story.id ?? idx}>
                        <h2>{story.title}</h2>
                        <p>{story.author}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}
