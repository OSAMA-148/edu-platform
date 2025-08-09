"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseInfo from "../_components/CourseInfo";
import ChapterList from "../_components/ChapterList";

function EditCourse({ viewCourse = false }) {
    const params = useParams();
    const courseId = params?.courseId;
    const [course, setCourse] = useState();
    const [loading, setLoading] = useState(false);
    console.log(courseId);

    useEffect(() => {
        getCourseInfo();
    }, []);

    const getCourseInfo = async () => {
        setLoading(true);
        const result = await axios.get("/api/courses?courseId=" + courseId);
        console.log(result.data);
        setLoading(false);
        setCourse(result.data);
    };
    return (
        <div>
            <CourseInfo course={course} viewCourse={viewCourse} />
            <ChapterList course={course} />
        </div>
    );
}

export default EditCourse;
