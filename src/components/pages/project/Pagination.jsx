"use client";

import React from "react";
import useProjectsFilter from "@/hooks/useProjectsFilter";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";

export default function Pagination({ scrollRef }) {
  const {
    currentPage,
    totalPages,
    totalCount,
    startCount,
    endCount,
    goToPage,
    nextPage,
    prevPage,
  } = useProjectsFilter();

  if (totalPages <= 1) return null;

  return (
    <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200/80 pt-8">
      <Label className="text-xs font-semibold text-neutral-500 tracking-wider">
        Showing {startCount}–{endCount} of {totalCount} Projects
      </Label>

      <div className="flex items-center gap-2.5">
        {/* Previous Button */}
        <Button
          variant="outline"
          onClick={() => prevPage(scrollRef)}
          disabled={currentPage === 1}
          className="text-xs"
        >
          ← Prev
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1.5 mx-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Button
              key={pageNum}
              variant="page"
              active={currentPage === pageNum}
              onClick={() => goToPage(pageNum, scrollRef)}
            >
              {pageNum}
            </Button>
          ))}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          onClick={() => nextPage(scrollRef)}
          disabled={currentPage === totalPages}
          className="text-xs"
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
