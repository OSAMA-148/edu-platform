import { SelectedChaptersConext } from "@/context/SelectedChapter";
import React, { useContext } from "react";
import YouTube from "react-youtube";

function ChapterContent({ courseInfo }) {
    const { selectedChapters, setSelectedChapters } = useContext(
        SelectedChaptersConext
    );
    const courses = courseInfo?.courses;
    const enrolToCourse = courseInfo?.enrolToCourse;
    const courseContent = courseInfo?.courses?.courseContent;

    const youTubeVideo = courseContent?.[selectedChapters]?.youtubeVideo;
    const topic = courseContent?.[selectedChapters]?.courseData?.[0]?.topic;

    const content = courseContent?.[selectedChapters]?.courseData?.[0]?.content;

    return (
        <div className="p-8">
            <h2 className="font-bold text-[20px] text-blue-500">
                {selectedChapters + 1} .{" "}
                {courseContent?.[selectedChapters]?.courseData?.chapterName}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">
                {youTubeVideo?.map(
                    (video, index) =>
                        index < 3 && (
                            <div>
                                <YouTube
                                    videoId={video?.videoId}
                                    opts={{
                                        height: "250",
                                        width: "400",
                                    }}
                                />
                            </div>
                        )
                )}
            </div>

            <div className="mt-10">
                {topic && (
                    <div className="mt-5 mb-5">
                        <h2 className="font-bold text-blue-400  text-lg">
                            {topic}
                        </h2>
                    </div>
                )}
                <div className=" p-4  bg-slate-100  border border-rounded-xl">
                    {content && (
                        <div className="mt-5  ">
                            {/* <h2 className='font-bold  text-lg'>{content}</h2> */}
                            <div
                                style={{ lineHeight: "30px" }}
                                dangerouslySetInnerHTML={{ __html: content }}
                            ></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChapterContent;
