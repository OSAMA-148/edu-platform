"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CourseFormDialog from "./CourseFormDialog";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CourseCard from "./CourseCard";

function CourseList() {
    const [courseList, setCourseList] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        user && getCourseList();
    }, [user]);
    const getCourseList = async () => {
        const result = await axios.get("/api/courses");
        setCourseList(result.data);
    };

    return (
        <div>
            <h2 className="p-3 mt-5 font-bold text-[34px] border-b-4 border-blue-400 inline-block text-blue-500">
                Course List
            </h2>

            {courseList?.length == 0 ? (
                <div className="flex flex-col items-center">
                    <Image src={"/logo.png"} width={150} height={150} alt="logo"/>
                    <h1 className="font-bold text-[20px]">
                        No Courses Created..{" "}
                    </h1>
                    <CourseFormDialog>
                        <Button className="mt-3 cursor-pointer">
                            + Create New Course
                        </Button>
                    </CourseFormDialog>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {courseList?.map((course) => (
                        <CourseCard course={course} key={course.cid} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CourseList;
