"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LessonSidebar from "./LessonSidebar";
import CustomVideoPlayer from "./CustomVideoPlayer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaChalkboardTeacher } from "react-icons/fa";
import LMSsectionIcon from "./icons/LMSsectionIcon";
import LMSopenBookIcon from "./icons/LMSopenBookIcon";
import LMSdocumentDownloadIcon from "./icons/LMSdocumentDownloadIcon";

type Props = {
  course: any;
  sections: any[];
  activeLessonId: string;
  lesson: any;
};

export default function CoursePlayerLayout({
  course,
  sections,
  activeLessonId,
  lesson,
}: Props) {
  return (
    <div className="min-h-screen bg-muted/30 font-montserrat">
      {/* Body */}
      <div className="mx-auto px-4 sm:px-6 md:px-12 py-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* Left column */}
        <div className="space-y-4">
          {/* Header */}
          <div>
            <div className="mx-auto py-2 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{course.title}</p>
                <div className="text-sm flex items-center gap-2 text-[#969696]">
                  <span className="text-[#969696] flex items-center gap-2 font-semibold w-fit">
                    <FaChalkboardTeacher size={18} strokeWidth={2} />
                    {course.instructor}
                  </span>
                  |
                  <span className="text-[#969696] flex items-center gap-2 font-semibold w-fit">
                    <LMSsectionIcon />
                    {course.sectionsCount} Sections
                  </span>
                  |
                  <span className="text-[#969696] flex items-center gap-2 font-semibold w-fit">
                    <LMSopenBookIcon />
                    {course.lessonsCount} Items
                  </span>
                  |
                  <span className="text-[#969696] flex items-center gap-2 font-semibold w-fit">
                    <LMSdocumentDownloadIcon />
                    {course.resourcesCount} Downloadable Resources
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* put share / favorite / settings here */}
                <button className="cursor-pointer hover:scale-[1.02] translate transform h-9 w-9 flex items-center justify-center rounded-md border bg-[#2653A3] text-white">
                  <ChevronLeft size={20} />
                </button>
                <button className="cursor-pointer hover:scale-[1.02] translate transform h-9 w-9 flex items-center justify-center rounded-md border bg-[#2653A3] text-white">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          <CustomVideoPlayer
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            poster="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Screenshot 2026-01-23 135824.png"
            onProgress={(cur, dur) => {
              console.log("Progress:", cur, "/", dur);
            }}
            onEnded={() => {
              console.log("Lesson completed");
            }}
          />

          <Card className="p-4">
            <p className="text-sm font-semibold mb-3">Notes</p>
            <Separator className="mb-4" />
            {/* <NotesPanel courseId={course.id} lessonId={lesson.id} /> */}
          </Card>
        </div>

        {/* Right sidebar */}
        <Card className="p-3 pb-6 h-[calc(100vh-140px)] sticky top-6 overflow-y-auto">
          <LessonSidebar
            courseId={course.id}
            sections={sections}
            activeLessonId={activeLessonId}
          />
        </Card>
      </div>
    </div>
  );
}
