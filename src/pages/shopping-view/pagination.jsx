import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      <Button
        variant="outline"
        className="rounded-full"
        disabled={page === 1}
        onClick={() => onPageChange(Math.max(page - 1, 1))}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {[...Array(totalPages)].map((_, i) => (
        <Button
          key={i}
          variant={page === i + 1 ? "default" : "outline"}
          className={`w-10 h-10 rounded-full ${
            page === i + 1 ? "bg-black text-white" : ""
          }`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </Button>
      ))}

      <Button
        variant="outline"
        className="rounded-full"
        disabled={page === totalPages}
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Pagination;