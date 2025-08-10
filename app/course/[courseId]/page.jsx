"use client";
import Header from "@/app/dashboard/_components/Header";

import React, { useEffect, useState } from "react";
import ChapterListSideBar from "../_components/ChapterListSideBar";
import ChapterContent from "../_components/ChapterContent";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine } from "lucide-react";
function Course() {
    const { courseId } = useParams();
    const [courseInfo, setCourseInfo] = useState();

    useEffect(() => {
        if (!courseId) return;
        getEnrolledCourseId();
    }, [courseId]);

    const getEnrolledCourseId = async () => {
        const result = await axios.get(
            "/api/enroll-course?courseId=" + courseId
        );
        setCourseInfo(result.data);
    };
    return (
        <div className="relative">
            <Header hideSideBar={true} />

            <div className="absolute top-4 right-4">
                <Link href={"/dashboard"}>
                    <Button className="cursor-pointer">
                        <ArrowLeftToLine /> Go Back
                    </Button>
                </Link>
            </div>

            <div className="flex gap-15">
                <ChapterListSideBar courseInfo={courseInfo} />
                <ChapterContent courseInfo={courseInfo} />
            </div>
        </div>
    );
}

export default Course;
