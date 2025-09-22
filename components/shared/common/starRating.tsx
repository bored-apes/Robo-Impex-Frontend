// components/StarRating.tsx
"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;          // e.g. 3.6
  max?: number;            // default 5
  size?: string;           // tailwind size classes, e.g. "h-4 w-4"
  className?: string;
}

export function StarRating({
  rating,
  max = 5,
  size = "h-4 w-4",
  className = "",
}: StarRatingProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {Array.from({ length: max }).map((_, i) => {
        const diff = rating - i;
        let fill = "text-muted-foreground/30";     // empty

        if (diff >= 1) {
          fill = "text-yellow-400 fill-current";   // full
        } else if (diff >= 0.25) {
          // draw a half-star using a gradient mask
          return (
            <span key={i} className="relative">
              <Star
                className={`${size} text-muted-foreground/30 absolute`}
              />
              <Star
                className={`${size} text-yellow-400 fill-current`}
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
            </span>
          );
        }

        return <Star key={i} className={`${size} ${fill}`} />;
      })}
    </div>
  );
}
