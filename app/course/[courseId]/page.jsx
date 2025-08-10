"use client";
import Header from "@/app/dashboard/_components/Header";

import React, { useEffect, useState } from "react";
import ChapterListSideBar from "../_components/ChapterListSideBar";
import ChapterContent from "../_components/ChapterContent";
import { useParams } from "next/navigation";
import axios from "axios";
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
        <div>
            <Header hideSideBar={true} />
            <div className="flex gap-15">
                <ChapterListSideBar courseInfo={courseInfo} />
                <ChapterContent courseInfo={courseInfo} />
            </div>
        </div>
    );
}

export default Course;
