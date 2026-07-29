"use client";

import Link from "next/link";
import { ResultView } from "@/components/result-view";
import { Button, Card } from "@/components/ui";
import { useClientSnapshot } from "@/lib/client-store";
import { useSettings } from "@/lib/settings";
import { loadLastResult } from "@/lib/storage";

export default function ResultPage() {
  const { t } = useSettings();
  // undefined while the client snapshot is not available yet, null when there
  // genuinely is no stored result.
  const result = useClientSnapshot(loadLastResult, undefined);

  if (result === undefined) return null;

  if (result === null) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-16">
        <Card className="p-8 text-center">
          <p className="text-fg-muted">{t.result.missing}</p>
          <Link href="/" className="mt-5 inline-block">
            <Button>{t.result.backHome}</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return <ResultView result={result} />;
}
