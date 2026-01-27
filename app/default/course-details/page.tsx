import { Suspense } from "react";
import CourseDetailsPage from "./CourseDetailsPage";
import CoursePlayerSkeleton from "./_components/CoursePlayerSkeleton";

const CourseDetailsPageRoot = () => {
  return (
    <Suspense fallback={<CoursePlayerSkeleton />}>
      <CourseDetailsPage />
    </Suspense>
  );
};

export default CourseDetailsPageRoot;
