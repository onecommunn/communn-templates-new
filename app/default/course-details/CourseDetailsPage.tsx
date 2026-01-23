"use client";
import CoursePlayerLayout from "./_components/CoursePlayerLayout";
import CustomVideoPlayer from "./_components/CustomVideoPlayer";

export default function CourseDetailsPage() {
  // Example placeholders
  const course = {
    id: "courseId",
    title: "Yoga for Strength 6-week Advanced Training",
    instructor: "Dr. Michela Chen",
    sectionsCount: 6,
    lessonsCount: 41,
    resourcesCount: 12,
  };
  // sections -> lessons (sidebar)
  const sections = [
    {
      id: "w1",
      title: "Week 1 - Beginner - Introduction to Yoga",
      lessons: [
        { id: "w1l1", title: "Introduction", type: "video" },
        { id: "w1l2", title: "Basics", type: "video" },
        { id: "w1l3", title: "Intermediate", type: "video" },
        { id: "w1l4", title: "Cheat code sheets - 1", type: "article" },
        { id: "w1l5", title: "Article 1", type: "article" },
        { id: "w1l6", title: "Project 1", type: "article" },
      ],
    },
    {
      id: "w2",
      title: "Week 2 - Beginner - Introduction to Yoga",
      lessons: [
        { id: "w2l1", title: "Week-2 Class", type: "video" },
        { id: "w2l3", title: "week-2 Article", type: "article" },
      ],
    },
    {
      id: "w3",
      title: "Week 3 - Beginner - Introduction to Yoga",
      lessons: [
        { id: "w3l1", title: "Week-3 Class", type: "video" },
        { id: "w3l3", title: "week-3 Article", type: "article" },
      ],
    },
    {
      id: "w4",
      title: "Week 4 - Beginner - Introduction to Yoga",
      lessons: [
        { id: "w4l1", title: "Week-4 Class", type: "video" },
        { id: "w4l3", title: "week-4 Article", type: "article" },
      ],
    },
    {
      id: "w5",
      title: "Week 5 - Beginner - Introduction to Yoga",
      lessons: [
        { id: "w5l1", title: "Week-5 Class", type: "video" },
        { id: "w5l3", title: "week-5 Article", type: "article" },
      ],
    },
    {
      id: "w6",
      title: "Week 6 - Beginner - Introduction to Yoga",
      lessons: [
        { id: "w6l1", title: "Week-6 Class", type: "video" },
        { id: "w6l3", title: "week-6 Article", type: "article" },
      ],
    },
  ];

  const lesson = {
    id: "lessonId",
    title: "Introduction",
    type: "video",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  };
  return (
    <CoursePlayerLayout
      course={course}
      sections={sections}
      activeLessonId={"lessonId"}
      lesson={lesson}
    />
  );
}
