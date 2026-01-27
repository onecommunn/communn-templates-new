"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaCirclePlay } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";

type Props = {
  courseId: string;
  sections: any[];
  activeLessonId: string;

  // ✅ NEW: to auto-open when next/prev changes section
  activeSectionIndex: number;

  onSelectVideo: (sectionIndex: number, linkId: string) => void;
  onSelectDocument: (sectionIndex: number, docId: string) => void;
};

export default function LessonSidebar({
  courseId,
  sections,
  activeLessonId,
  activeSectionIndex,
  onSelectVideo,
  onSelectDocument,
}: Props) {
  const sectionIds = useMemo(
    () => (sections || []).map((s: any, i: number) => s?._id || String(i)),
    [sections]
  );

  const activeSectionId = sectionIds[activeSectionIndex] || sectionIds[0] || "";

  // ✅ Controlled open state (multiple allowed)
  const [openSections, setOpenSections] = useState<string[]>(
    activeSectionId ? [activeSectionId] : []
  );

  // ✅ Auto-open active section whenever section changes
  useEffect(() => {
    if (!activeSectionId) return;

    setOpenSections((prev) => {
      // keep previously opened sections, but ensure active section is open
      if (prev.includes(activeSectionId)) return prev;
      return [activeSectionId, ...prev].slice(0, 6); // keep list small (optional)
    });
  }, [activeSectionId, activeLessonId]);

  return (
    <div className="h-full flex flex-col gap-2 font-montserrat">
      <ScrollArea className="flex-1">
        <Accordion
          type="multiple"
          value={openSections}
          onValueChange={setOpenSections}
          className="space-y-2"
        >
          {(sections || []).map((sec: any, secIndex: number) => {
            const sectionId = sec?._id || String(secIndex);
            const sectionTitle = sec?.name || "Section";
            const videos = sec?.links || [];
            const docs = sec?.documents || [];

            return (
              <AccordionItem key={sectionId} value={sectionId} className="border-none">
                <AccordionTrigger
                  className="
                    text-base cursor-pointer hover:no-underline font-semibold
                    p-[12px] bg-[#F0F9FF]
                    flex items-start gap-2
                    [&_svg]:text-black [&_svg]:h-5 [&_svg]:w-5 [&_svg]:shrink-0
                  "
                >
                  <span className="flex-1 break-words">{sectionTitle}</span>
                </AccordionTrigger>

                <AccordionContent className="pb-0">
                  <div className="flex flex-col gap-1 space-y-1 mt-1">
                    {/* Videos */}
                    {videos.map((v: any) => {
                      const id = v?._id;
                      const active = id === activeLessonId;

                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => onSelectVideo(secIndex, id)}
                          className={`rounded-md px-2 py-2 text-sm flex text-[#646464] font-medium items-center gap-1.5 ${
                            active ? "bg-black/10" : "hover:bg-muted"
                          }`}
                        >
                          <FaCirclePlay size={17} />
                          <span className="truncate break-all">{v?.name || "Video"}</span>
                        </button>
                      );
                    })}

                    {/* Documents */}
                    {docs.map((d: any) => {
                      const id = d?._id;
                      const active = id === activeLessonId;

                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => onSelectDocument(secIndex, id)}
                          className={`rounded-md px-2 py-2 text-sm flex text-[#646464] font-medium items-center gap-1.5 ${
                            active ? "bg-black/10" : "hover:bg-muted"
                          }`}
                        >
                          <IoDocumentText size={18} />
                          <span className="truncate break-all">{d?.label || "Document"}</span>
                        </button>
                      );
                    })}

                    {videos.length === 0 && docs.length === 0 && (
                      <div className="px-2 py-3 text-xs text-muted-foreground">
                        No lessons in this section.
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </ScrollArea>
    </div>
  );
}
