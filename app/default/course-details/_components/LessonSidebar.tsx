"use client";

import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaCirclePlay } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";

export default function LessonSidebar({
  courseId,
  sections,
  activeLessonId,
}: {
  courseId: string;
  sections: any[];
  activeLessonId: string;
}) {
  return (
    <div className="h-full flex flex-col gap-2 font-montserrat">
      <ScrollArea className="flex-1">
        <Accordion type="multiple" defaultValue={[sections?.[0]?.id]} className="space-y-2">
          {sections.map((sec) => (
            <AccordionItem key={sec.id} value={sec.id} className="last:mb-4 border-none">
              <AccordionTrigger className="text-base cursor-pointer hover:no-underline font-semibold p-[12px] bg-[#F0F9FF] [&_svg]:text-black [&_svg]:h-5 [&_svg]:w-5">
                {sec.title}
              </AccordionTrigger>

              <AccordionContent>
                <div className="flex flex-col gap-1 space-y-1 mt-1">
                  {sec.lessons.map((l: any) => {
                    const active = l.id === activeLessonId;
                    return (
                      <Link
                        key={l.id}
                        href={`/courses/${courseId}/learn/${l.id}`}
                        className={`rounded-md px-2 py-2 text-sm flex text-[#646464] font-medium items-center gap-1.5 ${
                          active
                            ? "bg-black/10 font-medium"
                            : "hover:bg-muted"
                        }`}
                      >
                        <span>{l.type === "video" ? <FaCirclePlay size={17}/> : <IoDocumentText size={18}/>}</span>{l.title}
                      </Link>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  );
}
