"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { getClient } from "../../lib/wix-client";

export function PostReviewForm({ storyId }: { storyId: string }) {
  const [name, setName] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [review, setReview] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    // EXACT field names as in your schema (all lowercase)
    const toInsert = {
      rating: Number(rating),       // number
      name: String(name),           // string
      review: String(review),       // string
      storyId: String(storyId),     // reference, must be _id (string)
    };

    try {
      const item = await getClient().items.insert("REVIEWS", toInsert);
      setName("");
      setRating(5);
      setReview("");
      toast({
        title: "Your review has been posted",
        description: "Thank you for your feedback!",
      });
      console.log("Inserted review:", item);
    } catch (err) {
      console.error("Insert error:", err);
      toast({
        title: "Error",
        description:
          err instanceof Error && err.message
            ? err.message
            : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <Input
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <div className="flex items-center space-x-2">
        <label htmlFor="rating" className="text-sm font-medium">
          Rating:
        </label>
        <Input
          id="rating"
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={e => setRating(parseInt(e.target.value))}
          required
          className="w-20"
        />
      </div>
      <Textarea
        placeholder="Write your review here..."
        value={review}
        onChange={e => setReview(e.target.value)}
        required
      />
      <Button
        disabled={isLoading}
        type="submit"
        className="flex items-center gap-2"
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        Post Review
      </Button>
    </form>
  );
}
