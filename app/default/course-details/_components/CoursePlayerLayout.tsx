"use client";

import { Card } from "@/components/ui/card";
import LessonSidebar from "./LessonSidebar";
import NotesPanel from "./NotesPanel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaChalkboardTeacher } from "react-icons/fa";
import LMSsectionIcon from "./icons/LMSsectionIcon";
import LMSopenBookIcon from "./icons/LMSopenBookIcon";
import LMSdocumentDownloadIcon from "./icons/LMSdocumentDownloadIcon";
import CourseContentPlayer from "./CourseContentPlayer";
import { Skeleton } from "@/components/ui/skeleton";

type LessonType = "video" | "document";

type Lesson = {
  id: string;
  title: string;
  type: LessonType;
  videoUrl?: string;
  docUrl?: string;
  sectionIndex?: number;
};

type Props = {
  course?: any;
  sections: any[];
  activeLessonId: string;
  lesson: Lesson;
  isLoading?: boolean;

  onSelectVideo: (sectionIndex: number, linkId: string) => void;
  onSelectDocument: (sectionIndex: number, docId: string) => void;

  onPrev?: () => void;
  onNext?: () => void;
};

function toDrivePreview(url: string) {
  const match = url.match(/\/file\/d\/([^/]+)/);
  if (!match) return url;
  const fileId = match[1];
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

function isGoogleDriveLink(url: string) {
  return url.includes("drive.google.com/file/d/");
}

export default function CoursePlayerLayout({
  course,
  sections,
  activeLessonId,
  lesson,
  isLoading,
  onSelectVideo,
  onSelectDocument,
  onPrev,
  onNext,
}: Props) {
  const courseTitle = course?.name ?? "Course";
  const instructor = course?.instructorName ?? "Instructor";
  const sectionsCount = sections?.length ?? 0;

  const itemsCount =
    (sections || []).reduce((sum: number, s: any) => {
      const vids = s?.links?.length ?? 0;
      const docs = s?.documents?.length ?? 0;
      return sum + vids + docs;
    }, 0) || 0;

  const resourcesCount = course?.documents?.length ?? 0;

  const isVideo = lesson?.type === "video";
  const isDoc = lesson?.type === "document";

  const docUrl = lesson?.docUrl || "";
  const pdfSrc =
    isDoc && docUrl
      ? isGoogleDriveLink(docUrl)
        ? toDrivePreview(docUrl)
        : `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(docUrl)}`
      : "";

  return (
    <div className="min-h-screen bg-muted/30 font-montserrat">
      <div className="mx-auto px-4 sm:px-6 md:px-12 py-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* Left column */}
        <div className="space-y-4">
          {/* Header */}
          <div>
            <div className="mx-auto py-2 flex items-start gap-2 justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">{courseTitle}</p>

                <div className="text-sm flex items-center gap-2 text-[#969696] flex-wrap">
                  <span className="text-[#969696] flex items-center gap-2 font-semibold w-fit">
                    <FaChalkboardTeacher size={18} />
                    {instructor}
                  </span>

                  <span className="hidden md:flex">|</span>

                  <span className="text-[#969696] flex items-center gap-2 font-semibold w-fit">
                    <LMSsectionIcon />
                    {sectionsCount} Sections
                  </span>

                  <span className="hidden md:flex">|</span>

                  <span className="text-[#969696] flex items-center gap-2 font-semibold w-fit">
                    <LMSopenBookIcon />
                    {itemsCount} Items
                  </span>

                  <span className="hidden md:flex">|</span>

                  <span className="text-[#969696] flex items-center gap-2 font-semibold w-fit">
                    <LMSdocumentDownloadIcon />
                    {resourcesCount} Downloadable Resources
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="cursor-pointer hover:scale-[1.02] translate transform h-9 w-9 flex items-center justify-center rounded-md border bg-[#2653A3] text-white disabled:opacity-50"
                  type="button"
                  onClick={onPrev}
                  disabled={!onPrev}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className="cursor-pointer hover:scale-[1.02] translate transform h-9 w-9 flex items-center justify-center rounded-md border bg-[#2653A3] text-white disabled:opacity-50"
                  type="button"
                  onClick={onNext}
                  disabled={!onNext}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <Skeleton className="rounded-xl w-full h-[75vh] bg-[#dddcdc]" />
          ) : (
            <>
              {isVideo && (
                <CourseContentPlayer
                  url={lesson.videoUrl || ""}
                  poster={course?.coverImage?.value}
                  title={lesson.title}
                  onProgress={(cur, dur) =>
                    console.log("Progress:", cur, "/", dur)
                  }
                  onEnded={() => console.log("Lesson completed")}
                />
              )}

              {isDoc && (
                <Card className="p-0 overflow-hidden">
                  <div className="w-full h-[756px]">
                    {pdfSrc ? (
                      <iframe
                        src={pdfSrc}
                        className="w-full h-full"
                        title={lesson.title || "Document"}
                      />
                    ) : (
                      <div className="p-6 text-sm text-muted-foreground">
                        No document URL found.
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </>
          )}

          {/* Notes */}
          <Card className="p-4">
            <NotesPanel />
          </Card>
        </div>

        {/* Right sidebar */}
        <Card className="p-3 h-auto md:h-fit md:max-h-[calc(100vh-140px)] sticky top-24">
          <div className="overflow-y-auto h-full">
            <LessonSidebar
              courseId={course?._id || ""}
              sections={sections}
              activeLessonId={activeLessonId}
              activeSectionIndex={lesson?.sectionIndex ?? 0} // ✅ important
              onSelectVideo={onSelectVideo}
              onSelectDocument={onSelectDocument}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
