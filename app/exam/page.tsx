import { Suspense } from "react";
import { ExamRunner } from "@/components/exam-runner";

export default function ExamPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-5 py-16 text-center text-fg-muted">
          ...
        </div>
      }
    >
      <ExamRunner />
    </Suspense>
  );
}
