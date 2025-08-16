"use client";


import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getClient } from "../lib/wix-client";

import { useRouter } from "next/navigation";

export function AddStoryDialog() {
    const router = useRouter();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Story</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a new story</DialogTitle>
                    <DialogDescription>
                        Show your creation and add your stories!
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target as HTMLFormElement);
                        let coverImage = formData.get("picture");
                        const title = formData.get("title");
                        const author = formData.get("author");
                        const description = formData.get("description");
                        const url = formData.get("url");
                        const content = formData.get("content");
                        let publicationDate = new Date().toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        });

                        // Set default coverImage URL if none provided
                        if (!coverImage || (coverImage instanceof File && coverImage.size === 0)) {
                            // Replace with your desired default image URL
                            coverImage = "https://static.wixstatic.com/media/023ca4_3c0d5960edb3436ca6d64880259b40c7~mv2.jpg";
                        }

                        const toInsert = {
                            coverImage,
                            title,
                            author,
                            description,
                            url,
                            content,
                            publicationDate,
                        };

                        const response = await getClient().items.insert("Stories", toInsert);

                        router.push(`/stories/${response._id}`);
                    }}
                    className="flex flex-col gap-4"
                >
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="title">Title</Label>
                        <Input name="title" id="title" required type="text" />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="author">Author</Label>
                        <Input name="author" id="author" required type="text" />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="picture">Picture</Label>
                        <Input name="picture" id="picture" type="file" />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="description">Description (optional)</Label>
                        <Textarea name="description" id="description" />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="url">URL</Label>
                        <Input name="url" id="url" type="url" placeholder="Enter URL" />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="content">Content</Label>
                        <Textarea name="content" id="content" placeholder="Enter content" />
                    </div>

                    <Button type="submit">Add Story</Button>
                </form>


            </DialogContent>
        </Dialog>
    );
}