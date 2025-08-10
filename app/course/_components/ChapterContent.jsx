import { SelectedChaptersConext } from "@/context/SelectedChapter";
import React, { useContext } from "react";
import YouTube from "react-youtube";
import DOMPurify from "dompurify";
import { motion, AnimatePresence } from "framer-motion";
import "../../globals.css";

function SkeletonBox({ className }) {
    return (
        <div
            className={`relative overflow-hidden bg-gray-200 rounded-xl ${className}`}
        >
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>
    );
}

function SmoothSkeleton({ show, children, className }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={className}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function ChapterContent({ courseInfo, loading }) {
    const { selectedChapters } = useContext(SelectedChaptersConext);
    const courseContent = courseInfo?.courses?.courseContent;
    const chapterData = courseContent?.[selectedChapters]?.courseData?.[0];
    const youTubeVideo = courseContent?.[selectedChapters]?.youtubeVideo;
    const topic = chapterData?.topic;
    const content = chapterData?.content;

    return (
        <div className="p-8">
            {/* العنوان */}
            <h2 className="font-bold text-[20px] text-blue-500">
                <SmoothSkeleton show={loading}>
                    <SkeletonBox className="h-6 w-48" />
                </SmoothSkeleton>
                {!loading && (
                    <>
                        {selectedChapters + 1} . {chapterData?.chapterName}
                    </>
                )}
            </h2>

            {/* الفيديوهات */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-lg:mt-7">
                {loading
                    ? Array(3)
                          .fill(0)
                          .map((_, i) => (
                              <SmoothSkeleton key={i} show={loading}>
                                  <SkeletonBox className="w-[350px] h-[250px] rounded-2xl" />
                              </SmoothSkeleton>
                          ))
                    : youTubeVideo?.slice(0, 3).map((video, index) =>
                          video?.videoId ? (
                              <div
                                  key={video.videoId}
                                  className="flex justify-center items-center rounded-2xl"
                              >
                                  <YouTube
                                      videoId={video.videoId}
                                      opts={{
                                          height: "250",
                                          width: "350",
                                      }}
                                  />
                              </div>
                          ) : (
                              <SkeletonBox
                                  key={index}
                                  className="w-[350px] h-[250px] rounded-2xl"
                              />
                          )
                      )}
            </div>

            {/* المحتوى النصي */}
            <div className="mt-10">
                <SmoothSkeleton show={loading}>
                    <SkeletonBox className="h-5 w-32 mb-5" />
                </SmoothSkeleton>

                {!loading && topic && (
                    <div className="mt-5 mb-5">
                        <h2 className="font-bold text-blue-400 text-lg">
                            {topic}
                        </h2>
                    </div>
                )}

                <div className="p-4 bg-slate-100 border border-rounded-xl">
                    <SmoothSkeleton show={loading}>
                        <div className="space-y-3">
                            <SkeletonBox className="h-4 w-full" />
                            <SkeletonBox className="h-4 w-5/6" />
                            <SkeletonBox className="h-4 w-4/6" />
                        </div>
                    </SmoothSkeleton>

                    {!loading && content && (
                        <div
                            style={{ lineHeight: "30px" }}
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(content),
                            }}
                        ></div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChapterContent;
