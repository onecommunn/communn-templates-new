import React, { Suspense } from "react";
import ConsultingoCourseDetailsPage from "./_components/ConsultingoCourseDetailsPage";

const ConsultingoCourseDetailsRoot = () => {
  return (
    <Suspense fallback={<></>}>
      <ConsultingoCourseDetailsPage/>
    </Suspense>
  );
};

export default ConsultingoCourseDetailsRoot;
