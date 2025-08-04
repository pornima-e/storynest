import Image from "next/image";
import { AlertTriangle } from "lucide-react"; // Optional, not used here, but you can use for warnings
import client from "../../lib/wix";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StarIcon } from "@heroicons/react/24/solid";
// import * as textarea from "@/components/ui/textarea"; // Not used in this snippet
import { PostReviewForm } from "./post-review-form";

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

  // Query reviews for this story by 'storyId' (adjust if your foreign key is different)
  const reviews = await client.items
    .query("REVIEWS")
    .eq("storyId", storieId)
    .find();

  const story = result.items[0];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-gray-100 px-4 py-10">
      {/* Wider Main Story Card */}
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden mb-10">
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

      <div className="max-w-4xl w-full space-y-8">
        {/* Story Content Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <span role="img" aria-label="book" className="mr-2">📖</span>
              <span className="font-bold">Story Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">

              {/* CONTENT */}
              <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                {story.content && story.content.trim().length > 0
                  ? story.content
                  : <span className="text-gray-400 italic">Content is empty</span>}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Reviews Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <span role="img" aria-label="star" className="mr-2">⭐</span>
              <span className="font-bold">Reviews</span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {(reviews.items ?? []).length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                reviews.items.map((review) => (
                  <div key={review?._id} className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">{review?.name || 'Anonymous'}</p>
                      <div className="flex">
                        {Array.from({ length: Number(review?.rating) || 0 }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2">{review?.review || ''}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Post Review Form Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <span role="img" aria-label="pencil" className="mr-2">📝</span>
              <span className="font-bold">Post Your Review</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PostReviewForm storyId={story?._id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
