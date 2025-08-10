import { Button } from "@/components/ui/button";
import axios from "axios";
import { Book, Loader2Icon, PlayCircle, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

function CourseCard({ course }) {
    const [loading, setLoading] = useState(false);
    const onEnrollCourse = async () => {
        try {
            setLoading(true);
            const result = await axios.post("/api/enroll-course", {
                courseId: course?.cid,
            });
            toast.success("enrolled successfully");
            setLoading(false);
        } catch (e) {
            toast.error("an error happened");
            setLoading(false);
            console.log(e);
        }
    };
    return (
        <div className="mt-5">
            <Image
                src={course?.imageURL}
                width={400}
                height={400}
                alt={course?.imageURL}
                className="w-full h-[250px] object-cover "
            />

            <div className="flex flex-col gap-3">
                <h2 className="font-bold text-blue-500 text-[20px] mt-2">
                    {course?.courseJson?.course?.name}
                </h2>
                <p className="line-clamp-3 text-slate-600">
                    {course?.courseJson?.course?.description}
                </p>

                <div className="flex item-center justify-between">
                    <h2 className="flex items-center gap-2 font-bold">
                        <Book /> {course?.courseJson?.course?.chapters} Chapters
                    </h2>
                    {course?.courseContent?.length ? (
                        <Link href={"/dashboard/edit-course/" + course?.cid}>
                            <Button className="cursor-pointer">
                                {" "}
                                <Settings /> start learning
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            disabled={loading}
                            onClick={onEnrollCourse}
                            className="cursor-pointer"
                        >
                            {loading ? (
                                <Loader2Icon className="animate-spin" />
                            ) : (
                                <PlayCircle />
                            )}{" "}
                            Enroll Course
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
