"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { getClient } from "../../lib/wix-client";

const initialReview = {
  name: "",
  rating: 5,
  review: "",
};

export function PostReviewForm({ storyId }: { storyId: string }) {
  const [newReview, setNewReview] = useState(initialReview);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Main form
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
          // INSERT: field names must exactly match Wix database!
          await getClient().items.insert("REVIEWS", {
            Rating: newReview.rating,
            Name: newReview.name,
            Review: newReview.review,
            StoryId: storyId,
          });

          setNewReview(initialReview);
          toast({
            title: "Your review has been posted",
            description: "Thank you for your feedback!",
          });
        } catch (error: any) {
          // Detailed error log
          console.error("Insert error:", error);
          toast({
            title: "Error",
            description: (error && error.message)
              ? error.message
              : "Something went wrong",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }}
      className="mt-6 space-y-4"
    >
      <Input
        placeholder="Your name"
        value={newReview.name}
        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
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
          value={newReview.rating}
          onChange={(e) =>
            setNewReview({
              ...newReview,
              rating: parseInt(e.target.value),
            })
          }
          required
          className="w-20"
        />
      </div>
      <Textarea
        placeholder="Write your review here..."
        value={newReview.review}
        onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
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
