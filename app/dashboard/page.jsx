import React from "react";
import Banner from "./_components/Banner";
import CourseList from "./_components/CourseList";
import EnrolledCourse from "./_components/EnrolledCourse";

function dashboard() {
    return (
        <div className="p-4">
            <Banner />
            <EnrolledCourse />
            <CourseList />
        </div>
    );
}

export default dashboard;
