"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EnrollCourseCard from "./EnrollCourseCard";

function EnrolledCourse() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getEnrolledCourse();
    }, []);

    const getEnrolledCourse = async () => {
        try {
            const result = await axios.get("/api/enroll-course");
            setEnrolledCourses(result.data);
        } catch (err) {
            console.error("Error fetching enrolled courses:", err);
            setError("Failed to load enrolled courses.");
        } finally {
            setLoading(false);
        }
    };

    const SkeletonCard = () => (
        <div className="animate-pulse border rounded-lg overflow-hidden shadow bg-white">
            {/* صورة الكورس */}
            <div className="h-40 bg-gray-300"></div>
            <div className="p-4 space-y-3">
                {/* عنوان الكورس */}
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                {/* وصف قصير */}
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                {/* زرار */}
                <div className="mt-4 h-10 bg-gray-300 rounded"></div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div>
                <h2 className="p-3 mt-5 font-bold text-[34px] border-b-4 border-blue-400 inline-block text-blue-500">
                    Continue Learning
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return <p className="p-3 text-red-500">{error}</p>;
    }

    if (!enrolledCourses?.length) {
        return <p className="p-3 text-gray-500">No enrolled courses found.</p>;
    }

    return (
        <div>
            <h2 className="p-3 mt-5 font-bold text-[34px] border-b-4 border-blue-400 inline-block text-blue-500">
                Continue Learning
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {enrolledCourses.map((course) => (
                    <EnrollCourseCard
                        key={course?.cid}
                        course={course?.courses}
                        enrolledCourse={course?.enrolToCourse}
                    />
                ))}
            </div>
        </div>
    );
}

export default EnrolledCourse;
