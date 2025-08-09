import { Button } from "@/components/ui/button";
import axios from "axios";
import { Book, Clock, Loader2Icon, PlayIcon, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

function CourseInfo({ course, viewCourse }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const layout = course?.courseJson?.course;

    const getCourseContent = async () => {
        setLoading(true);
        try {
            const result = await axios.post("/api/generate-course-content", {
                courseJson: layout,
                name: course?.name,
                courseId: course?.cid,
            });

            console.log(result.data);
            setLoading(false);
            router.push("/dashboard");
            toast.success("course has been generated successfully");
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("error sending data");
        }
    };
    return (
        <div className="p-7 m-5 shadow-md">
            <div className="md:flex gap-5 justify-between block">
                <div className="flex flex-col">
                    <h2 className="font-bold text-blue-500 text-[35px] mb-2">
                        {course?.courseJson?.course?.name}
                    </h2>
                    <p className="text-slate-500">
                        {course?.courseJson?.course?.description}
                    </p>
                    <div className="sm:text-center md:text-left">
                        {!viewCourse ? (
                            <Button
                                onClick={getCourseContent}
                                className="mt-5 w-50 "
                            >
                                {" "}
                                {loading ? (
                                    <Loader2Icon className="animate-spin" />
                                ) : (
                                    "Generate Course"
                                )}
                            </Button>
                        ) : (
                            <Link href={"/course/" + course?.cid}>
                                <Button className="mt-5">
                                    <PlayIcon /> Countinue Learning
                                </Button>{" "}
                            </Link>
                        )}
                    </div>
                </div>

                <Image
                    src={course?.imageURL}
                    width={400}
                    height={400}
                    alt={course?.imageURL}
                    className="w-full  h-[350px] object-cover rounded-3xl sm:m-5"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-">
                <div className="flex  gap-3 items-center mt-5 shadow-md rounded-lg p-3">
                    <Clock className="text-blue-500" />
                    <section>
                        <h2 className="font-bold">Duration</h2>
                        <h2>2 Hours</h2>
                    </section>
                </div>

                <div className="flex  gap-3 items-center mt-5 shadow-md rounded-lg p-3">
                    <Book className="text-blue-500" />
                    <section>
                        <h2 className="font-bold">Chapters</h2>
                        <h2>{course?.courseJson?.course?.chapters} Chapters</h2>
                    </section>
                </div>

                <div className="flex  gap-3 items-center mt-5 shadow-md rounded-lg p-3">
                    <TrendingUp className="text-blue-500" />
                    <section>
                        <h2 className="font-bold">Difficulty</h2>
                        <h2>{course?.courseJson?.course?.level}</h2>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default CourseInfo;
