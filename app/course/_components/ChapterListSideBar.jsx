import React, { useContext } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChaptersConext } from "@/context/SelectedChapter";
function ChapterListSideBar({ courseInfo }) {
    const courses = courseInfo?.courses;
    const enrolToCourse = courseInfo?.enrolToCourse;
    const courseContent = courseInfo?.courses?.courseContent;

    const { selectedChapters, setSelectedChapters } = useContext(
        SelectedChaptersConext
    );

    return (
        <div className="h-screen w-80 bg-slate-100">
            <h2 className="text-blue-400 m-4 text-xl">
                Chapters ({courseContent?.length})
            </h2>

            <Accordion type="single" collapsible>
                {courseContent?.map((chapter, index) => (
                    <AccordionItem
                        onClick={() => setSelectedChapters(index)}
                        value="item-1"
                    >
                        <AccordionTrigger className="font-bold p-2 my-2 cursor-pointer text-[17px]">
                            {index + 1}- {chapter?.courseData?.[0].chapterName}
                        </AccordionTrigger>
                        <AccordionContent>
                            <h2 className="bg-white p-2 my-2">
                                {chapter?.courseData?.[0]?.topic}
                            </h2>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

export default ChapterListSideBar;
