import React from "react";
import { Gift } from "lucide-react";

function ChapterList({ course }) {
    const courseLayout = course?.courseJson?.course;

    return (
        <div className="p-5">
            <h2 className="font-bold text-3xl text-center mb-10">
                📚 Chapters & Topics
            </h2>

            <div className="flex flex-col gap-10 items-center">
                {courseLayout?.allchapters?.map((chapter, chapterIndex) => (
                    <div
                        key={chapterIndex}
                        className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6"
                    >
                        {/* Header of Chapter */}
                        <div className="bg-blue-600 text-white p-4 rounded-md mb-5">
                            <h3 className="text-sm">
                                Chapter {chapterIndex + 1}
                            </h3>
                            <h2 className="text-xl font-bold">
                                {chapter?.chapterName}
                            </h2>
                            <div className="flex justify-between text-xs mt-2">
                                <span>Duration: {chapter?.duration}</span>
                                <span>Topics: {chapter?.topics?.length}</span>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="relative ml-4 pl-6 border-l-2 border-blue-400">
                            {chapter?.topics?.map((topic, topicIndex) => (
                                <div key={topicIndex} className="relative mb-6">
                                    {/* النقطة */}
                                    <div className="absolute -left-3 top-1.5 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>

                                    {/* محتوى التوبك */}
                                    <div className="bg-gray-50 p-3 rounded-md shadow-sm">
                                        <h3 className="font-semibold text-gray-800 text-sm">
                                            {topic}
                                        </h3>
                                    </div>

                                    {/* نهاية الفصل */}
                                    {topicIndex ===
                                        chapter.topics.length - 1 && (
                                        <div className="mt-3 flex items-center gap-2 text-green-600 text-xs">
                                            <Gift className="w-4 h-4" />
                                            <span>End of Chapter</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChapterList;
