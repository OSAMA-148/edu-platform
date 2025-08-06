import EditCourse from "@/app/dashboard/edit-course/[courseId]/page";
import React from "react";

function viewCourseContent() {
    return (
        <div>
            <EditCourse viewCourse={true} />
        </div>
    );
}

export default viewCourseContent;
