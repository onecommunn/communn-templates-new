import React, { Suspense } from "react";
import InfluencerDetailsPage from "./_components/InfluencerDetailsPage";

const InfluencerDetailsRoot = () => {
  return (
    <Suspense fallback={<></>}>
      <InfluencerDetailsPage />
    </Suspense>
  );
};

export default InfluencerDetailsRoot;
