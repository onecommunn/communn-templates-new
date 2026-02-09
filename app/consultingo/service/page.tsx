import { Suspense } from "react";
import ConsultingoServiceClient from "./ConsultingoServiceClient";

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <ConsultingoServiceClient />
    </Suspense>
  );
}
