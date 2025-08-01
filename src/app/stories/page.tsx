import client from "../lib/wix";

export default async function Home() {

    const stories = await client.items.queryDataItems({
        dataCollectionId: "Stories"
    })
        .find()
        .then((res) => res.items.map((item) => item.data));

    console.log(stories);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center">
            <h1 className="text-2xl font-bold">Stories</h1>

            <div className="grid grid-col-3 gap-4">

            </div>
        </div>
    );
}
