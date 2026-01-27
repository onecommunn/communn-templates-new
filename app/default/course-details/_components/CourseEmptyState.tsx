"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileVideo, FolderOpen, RefreshCw } from "lucide-react";

export default function CourseEmptyState({
  title = "No course content found",
  description = "This course doesn’t have any videos or documents yet. Add sections and lessons to start learning.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="min-h-[80dvh] bg-muted/30 font-montserrat flex items-center justify-center px-4">
      <Card className="w-full max-w-xl p-6 rounded-2xl">
        <div className="flex items-start gap-3">
          <div className="h-11 w-11 rounded-xl bg-muted flex items-center justify-center">
            <FolderOpen className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex-1">
            <p className="text-base font-semibold">{title}</p>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {onRetry && (
                <Button onClick={onRetry} className="gap-2 cursor-pointer">
                  <RefreshCw className="h-4 w-4" />
                  Retry
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
