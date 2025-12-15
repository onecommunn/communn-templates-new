import { useSidebar } from "@/components/ui/sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const SidebarToggle = () => {
  const { open, setOpen } = useSidebar();

  return (
    <button
      onClick={() => setOpen(!open)}
      className="border rounded-l-xl py-8 px-0.5 h-fit cursor-pointer bg-white hover:bg-gray-200 border-l-0"
    >
      {open ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
    </button>
  );
};
