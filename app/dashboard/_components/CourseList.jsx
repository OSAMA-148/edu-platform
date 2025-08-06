"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";

const CourseList = () => {
    const [courseList,setCourseList] = useState([])
    const { user } = useUser()
    

    return (
        <h2 className="p-3 mt-5 font-bold text-[34px] border-b-4 border-blue-400 inline-block text-blue-500">
            Course List
        </h2>
    ); 
};

export default CourseList;
