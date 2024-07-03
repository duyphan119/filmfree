"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function MovieSkeletonCard({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("relative space-y-2", className)}>
      <AspectRatio ratio={16 / 9}>
        <Skeleton />
      </AspectRatio>
      <Skeleton />
    </div>
  );
}
