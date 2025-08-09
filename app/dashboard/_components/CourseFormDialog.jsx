import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import uuid4 from "uuid4";
import { useRouter } from "next/navigation";

function CourseFormDialog({ children }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        level: "",
        category: "",
        chapters: 1,
        includeVideo: false,
    });

    const onHandleChangeInput = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        console.log(formData);
    };

    const onGenerateCourse = async () => {
        const courseId = uuid4();
        console.log(formData);
        setLoading(true);
        const result = await axios.post("/api/generete-course", {
            ...formData,
            courseId: courseId,
        });
        console.log(result.data);
        setLoading(false);
        router.push("/dashboard/edit-course/" + courseId);
    };
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Course With AI</DialogTitle>
                        <DialogDescription>
                            <div className="flex flex-col gap-3 mt-3">
                                <div className="mt-3">
                                    <label>Course Name</label>
                                    <Input
                                        onChange={(event) =>
                                            onHandleChangeInput(
                                                "name",
                                                event?.target?.value
                                            )
                                        }
                                        className="mt-2"
                                        placeholder="Course Name"
                                    />
                                </div>

                                <div className="mt-3">
                                    <label>Course Description</label>
                                    <Textarea
                                        onChange={(event) =>
                                            onHandleChangeInput(
                                                "description",
                                                event?.target?.value
                                            )
                                        }
                                        className="mt-2"
                                        placeholder="Course Description"
                                    />
                                </div>

                                <div className="mt-3">
                                    <label className="mb-2">
                                        {" "}
                                        Number Of Chapters
                                    </label>
                                    <Input
                                        type="number"
                                        onChange={(event) =>
                                            onHandleChangeInput(
                                                "chapters",
                                                event?.target?.value
                                            )
                                        }
                                        className="mt-2"
                                        placeholder="Number Of Chapters"
                                    />
                                </div>

                                <div className="flex  items-center gap-3">
                                    <label className="mb-2">
                                        Include Video
                                    </label>
                                    <Switch
                                        onCheckedChange={() =>
                                            onHandleChangeInput(
                                                "includeVideo",
                                                !formData?.includeVideo
                                            )
                                        }
                                    />
                                </div>

                                <div>
                                    <label>Selcet Difficulty</label>

                                    <Select
                                        onValueChange={(value) =>
                                            onHandleChangeInput("level", value)
                                        }
                                    >
                                        <SelectTrigger className="w-[180px] mt-3">
                                            <SelectValue placeholder="Choose Level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Easy">
                                                Easy
                                            </SelectItem>
                                            <SelectItem value="Moderate">
                                                Moderate
                                            </SelectItem>
                                            <SelectItem value="Hard">
                                                Hard
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="mt-3">
                                    <label className="mb-2"> Category</label>
                                    <Input
                                        onChange={(event) =>
                                            onHandleChangeInput(
                                                "category",
                                                event?.target?.value
                                            )
                                        }
                                        className="mt-2"
                                        placeholder="Category"
                                    />
                                </div>

                                <Button
                                    onClick={onGenerateCourse}
                                    className="w-full mt-3 cursor-pointer"
                                >
                                    {loading ? (
                                        <Loader2Icon className="animate-spin" />
                                    ) : (
                                        <span>Generate Course</span>
                                    )}
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CourseFormDialog;
