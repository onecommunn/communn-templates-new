import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

const PaymentsSkeleton = ({ count = 6 }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-6 rounded-[12px] border-t border-[#f0f0f0] hover:bg-[#f9f9f9]"
        >
          {/* Left - Payment Title & Date */}
          <div className="flex flex-col gap-2">
            <Skeleton className="w-[120px] h-[18px]" />
            <Skeleton className="w-[80px] h-[14px]" />
          </div>

          {/* Right - Amount & Status */}
          <div className="flex items-center space-y-1">
            <div className="text-right flex flex-col items-end gap-2">
              <Skeleton className="w-[60px] h-[16px]" />
              <Skeleton className="w-[100px] h-[14px]" />
            </div>
            <ChevronRight color={"#c4c4c4"} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentsSkeleton;
