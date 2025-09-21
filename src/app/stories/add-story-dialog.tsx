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
import { useState, useRef } from "react";
import { toast } from "sonner";

export function AddStoryDialog() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            setLoading(false);
            // Reset form fields on dialog close
            if (formRef.current) {
                formRef.current.reset();
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                    onClick={() => setOpen(true)}
                >
                    Add Story
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a new story</DialogTitle>
                    <DialogDescription>
                        Show your creation and add your stories!
                    </DialogDescription>
                </DialogHeader>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-2 text-sm text-yellow-800 rounded">
                    <strong>NOTE:</strong> Your story will be visible on StoryNest only after it has been approved by the admins.
                    Please wait until the process is completed.
                </div>
                <form
                    ref={formRef}
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setLoading(true);
                        try {
                            const formData = new FormData(e.target as HTMLFormElement);
                            const coverImage =
                                "https://static.wixstatic.com/media/023ca4_3c0d5960edb3436ca6d64880259b40c7~mv2.jpg";
                            const title = formData.get("title");
                            const author = formData.get("author");
                            const description = formData.get("description");
                            const url = formData.get("url");
                            const content = formData.get("content");
                            const publicationDate = new Date().toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            });

                            const toInsert = {
                                coverImage,
                                title,
                                author,
                                description,
                                url,
                                content,
                                publicationDate,
                            };

                            await getClient().items.insert("Stories", toInsert);
                            setOpen(false);
                            setLoading(false);
                            toast.success("Story added successfully!");
                        } catch {
                            toast.error("Failed to add story!", {
                                description: "Please check if you are logged in.",
                            });
                            setLoading(false);
                        }
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
                        <Input name="picture" id="picture" type="file" disabled />
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
                        <Textarea name="content" id="content" required placeholder="Enter content" />
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        variant="outline"
                        className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                    >
                        {loading ? "Adding..." : "Add Story"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
