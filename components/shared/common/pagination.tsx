"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showInfo?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  showInfo = true,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "…");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("…", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;
  const visiblePages = getVisiblePages();

  return (
    <div
      className={cn(
        // slightly tighter vertical spacing on small screens
        "flex flex-col items-center space-y-2 sm:space-y-4",
        className
      )}
    >
      {showInfo && totalItems && itemsPerPage && (
        <div className="text-[11px] sm:text-sm text-muted-foreground text-center">
          Showing{" "}
          <span className="font-medium text-foreground">
            {(currentPage - 1) * itemsPerPage + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium text-foreground">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">{totalItems}</span> results
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
        {/* Previous */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="
            h-7 w-8 sm:h-9 sm:px-3
            text-[12px] sm:text-sm
            bg-background/50 backdrop-blur-sm border-primary/20
            hover:border-primary/40 hover:bg-primary/5
            transition-all duration-200 flex items-center justify-center
          "
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline ml-0.5 sm:ml-1">Prev</span>
        </Button>

        {/* Page numbers */}
        {visiblePages.map((page, idx) =>
          page === "…" ? (
            <div
              key={`dots-${idx}`}
              className="flex items-center justify-center h-7 w-7 sm:h-9 sm:w-9"
            >
              <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </div>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page as number)}
              className={cn(
                "h-7 w-7 sm:h-9 sm:w-9 p-0 text-[12px] sm:text-base",
                page === currentPage
                  ? "bg-primary text-primary-foreground shadow-md border-primary"
                  : "bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 hover:bg-primary/5"
              )}
            >
              {page}
            </Button>
          )
        )}

        {/* Next */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="
            h-7 w-8 sm:h-9 sm:px-3
            text-[12px] sm:text-sm
            bg-background/50 backdrop-blur-sm border-primary/20
            hover:border-primary/40 hover:bg-primary/5
            transition-all duration-200 flex items-center justify-center
          "
        >
          <span className="hidden xs:inline mr-0.5 sm:mr-1">Next</span>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>

      <div className="text-[10px] sm:text-xs text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
