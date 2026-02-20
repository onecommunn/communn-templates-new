"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import CoursePlayerLayout from "./_components/CoursePlayerLayout";
import { useCourses } from "@/hooks/useCourses";
import type {
  Course,
  Section,
  CourseLink,
  Document,
} from "@/models/course.mode";
import CourseEmptyState from "./_components/CourseEmptyState";
import CoursePlayerSkeleton from "./_components/CoursePlayerSkeleton";
import { useSearchParams } from "next/navigation";
import { AuthContext } from "@/contexts/Auth.context";

type LessonType = "video" | "document";

export type ActiveLesson = {
  id: string;
  title: string;
  type: LessonType;
  videoUrl?: string;
  docUrl?: string;
  sectionIndex?: number;
};

export default function CourseDetailsPage() {
  // TODO: replace with useSearchParams later
  const searchParams = useSearchParams();
  // const courseId = searchParams.get("id") || "6840233f4d710a4b951a1c86";

  const courseId = useMemo(() => searchParams.get("id") ?? "", [searchParams]);

  const auth = useContext(AuthContext);

  const { getCourseByCourseId } = useCourses();

  const [course, setCourse] = useState<Course | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [isCourseDataLoading, setCourseDataLoading] = useState(true);

  // Selection
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<LessonType>("video");
  const [activeLessonId, setActiveLessonId] = useState<string>("");
  const [hasFetched, setHasFetched] = useState(false);

  // Fetch course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // if (!auth.isAuthenticated) {
        //   return;
        // }
        setCourseDataLoading(true);

        const data = await getCourseByCourseId(courseId);
        const c: Course | undefined = data?.courses?.courseResponse;
        if (!c) return;

        setCourse(c);
        setSections(c.sections ?? []);

        // ✅ initialize selection after fetch
        const firstSectionIndex = 0;
        const firstSection = (c.sections ?? [])[firstSectionIndex];

        if (firstSection?.links?.length) {
          setCurrentSectionIndex(firstSectionIndex);
          setSelectedType("video");
          setActiveLessonId(firstSection.links[0]._id);
          return;
        }

        // If no section videos, try first section document
        if (firstSection?.documents?.length) {
          setCurrentSectionIndex(firstSectionIndex);
          setSelectedType("document");
          setActiveLessonId(firstSection.documents[0]._id);
          return;
        }

        // fallback: course-level documents (if you use them elsewhere)
        if (c.documents?.length) {
          setSelectedType("document");
          setActiveLessonId(c.documents[0]._id);
          return;
        }

        setActiveLessonId("");
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setCourseDataLoading(false);
        setHasFetched(true);
      }
    };

    fetchCourse();
  }, [courseId, auth.isAuthenticated]);

  const currentSection = sections[currentSectionIndex] ?? null;

  const currentSectionVideos = useMemo<CourseLink[]>(() => {
    return currentSection?.links ?? [];
  }, [currentSection]);

  const currentSectionDocs = useMemo<Document[]>(() => {
    return currentSection?.documents ?? [];
  }, [currentSection]);

  // ✅ Build active lesson
  const lesson: ActiveLesson = useMemo(() => {
    if (!activeLessonId) {
      return { id: "", title: "", type: selectedType };
    }

    if (selectedType === "video") {
      const v =
        currentSectionVideos.find((x) => x._id === activeLessonId) ??
        currentSectionVideos[0];

      return {
        id: v?._id || "",
        title: v?.name || "Video",
        type: "video",
        videoUrl: v?.value,
        sectionIndex: currentSectionIndex,
      };
    }

    // Documents: prefer section docs first
    const d =
      currentSectionDocs.find((x) => x._id === activeLessonId) ??
      currentSectionDocs[0] ??
      (course?.documents ?? []).find((x) => x._id === activeLessonId) ??
      (course?.documents ?? [])[0];

    return {
      id: d?._id || "",
      title: d?.label || "Document",
      type: "document",
      docUrl: d?.value,
      sectionIndex: currentSectionIndex,
    };
  }, [
    activeLessonId,
    selectedType,
    currentSectionVideos,
    currentSectionDocs,
    course?.documents,
    currentSectionIndex,
  ]);

  // ✅ Sidebar handlers (production-safe)
  const handleSelectVideo = (sectionIndex: number, linkId: string) => {
    setCurrentSectionIndex(sectionIndex);
    setSelectedType("video");
    setActiveLessonId(linkId);
  };

  const handleSelectDocument = (sectionIndex: number, docId: string) => {
    setCurrentSectionIndex(sectionIndex);
    setSelectedType("document");
    setActiveLessonId(docId);
  };

  // Optional: next/prev lesson (you can wire to chevrons)
  const getSectionItems = (sec?: Section) => {
    if (!sec) return [];
    return [
      ...(sec.links ?? []).map((x) => ({ type: "video" as const, id: x._id })),
      ...(sec.documents ?? []).map((x) => ({
        type: "document" as const,
        id: x._id,
      })),
    ];
  };

  const handlePrevNext = (dir: -1 | 1) => {
    const curSec = sections[currentSectionIndex];
    if (!curSec) return;

    const curItems = getSectionItems(curSec);
    if (curItems.length === 0) {
      // current section empty -> jump directly to nearest non-empty section
      jumpToNearestSectionWithItems(dir);
      return;
    }

    let idx = curItems.findIndex((x) => x.id === activeLessonId);

    // if activeLessonId not found, assume first/last based on direction
    if (idx === -1) idx = dir === 1 ? -1 : curItems.length;

    const nextInSameSection = curItems[idx + dir];

    // ✅ 1) if next item exists in same section
    if (nextInSameSection) {
      setSelectedType(nextInSameSection.type);
      setActiveLessonId(nextInSameSection.id);
      return;
    }

    // ✅ 2) otherwise move to next/prev section (skip empty ones)
    jumpToNearestSectionWithItems(dir);
  };

  const jumpToNearestSectionWithItems = (dir: -1 | 1) => {
    let i = currentSectionIndex + dir;

    while (i >= 0 && i < sections.length) {
      const items = getSectionItems(sections[i]);

      if (items.length > 0) {
        setCurrentSectionIndex(i);

        // ✅ for NEXT: open first item
        // ✅ for PREV: open last item
        const pick = dir === 1 ? items[0] : items[items.length - 1];

        setSelectedType(pick.type);
        setActiveLessonId(pick.id);
        return;
      }

      // section empty, keep going
      i += dir;
    }

    // reached start/end, do nothing (optional: toast "No more lessons")
  };

  const hasAnyContent = useMemo(() => {
    const secHas = (sections || []).some(
      (s) => (s?.links?.length ?? 0) > 0 || (s?.documents?.length ?? 0) > 0,
    );
    const courseDocs = (course?.documents?.length ?? 0) > 0;
    return secHas || courseDocs;
  }, [sections, course?.documents]);

  if (isCourseDataLoading) {
    return <CoursePlayerSkeleton />;
  }

  if (hasFetched && (!course || !hasAnyContent)) {
    return (
      <CourseEmptyState
        title={!course ? "Course not found" : "No lessons yet"}
        description={
          !course
            ? "We couldn’t load this course. It may be deleted or you don’t have access."
            : "This course is created, but no videos/documents are added yet."
        }
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <CoursePlayerLayout
      course={course ?? undefined}
      sections={sections}
      activeLessonId={activeLessonId}
      lesson={lesson}
      isLoading={isCourseDataLoading}
      onSelectVideo={handleSelectVideo}
      onSelectDocument={handleSelectDocument}
      onPrev={() => handlePrevNext(-1)}
      onNext={() => handlePrevNext(1)}
    />
  );
}
