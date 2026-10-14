import React from "react";
import { cn } from "@/lib/utils";

/**
 * Base luxury skeleton primitive with refined subtle shimmer and pulse
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-foreground/10 dark:bg-white/10",
        className
      )}
      {...props}
    />
  );
}

/**
 * Skeleton placeholder for Project Grid items
 */
export function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl bg-panel border border-border overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="relative w-full aspect-4/3 bg-foreground/8">
        <div className="absolute top-4 left-4 h-6 w-24 rounded-full bg-foreground/15" />
      </div>

      {/* Content Skeleton */}
      <div className="p-5 flex flex-col grow gap-3">
        <div className="h-6 w-3/4 rounded bg-foreground/15 mb-1" />
        <div className="h-4 w-full rounded bg-foreground/10" />
        <div className="h-4 w-5/6 rounded bg-foreground/10 mb-4" />

        {/* Footer Meta Skeleton */}
        <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-3 w-16 rounded bg-foreground/10" />
            <div className="h-3 w-16 rounded bg-foreground/10" />
          </div>
          <div className="h-4 w-24 rounded bg-foreground/15" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton placeholder for Blog Grid items
 */
export function BlogCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl bg-panel border border-border overflow-hidden animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="relative w-full aspect-16/10 bg-foreground/8">
        <div className="absolute top-4 left-4 h-5 w-24 rounded-full bg-foreground/15" />
      </div>

      {/* Content Skeleton */}
      <div className="p-5 flex flex-col grow gap-3">
        <div className="h-6 w-4/5 rounded bg-foreground/15" />
        <div className="h-4 w-full rounded bg-foreground/10" />
        <div className="h-4 w-2/3 rounded bg-foreground/10 mb-3" />

        {/* Footer Meta */}
        <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
          <div className="h-3 w-32 rounded bg-foreground/10" />
          <div className="h-4 w-20 rounded bg-foreground/15" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton placeholder for Career opening cards
 */
export function CareerOpeningSkeleton() {
  return (
    <div className="snap-start rounded-2xl p-8 border border-border bg-white shadow-sm flex flex-col w-[85vw] sm:w-[320px] md:w-95 shrink-0 min-h-100 animate-pulse">
      <div className="flex-1 flex flex-col gap-4">
        <div className="h-7 w-3/4 rounded bg-foreground/15 mb-2" />

        <div className="flex flex-col gap-3 mb-4">
          <div className="h-4 w-1/2 rounded bg-foreground/10" />
          <div className="h-4 w-2/5 rounded bg-foreground/10" />
          <div className="h-4 w-1/3 rounded bg-foreground/10" />
        </div>

        <div className="space-y-2">
          <div className="h-3.5 w-full rounded bg-foreground/10" />
          <div className="h-3.5 w-full rounded bg-foreground/10" />
          <div className="h-3.5 w-4/5 rounded bg-foreground/10" />
        </div>
      </div>

      <div className="pt-6 border-t border-border mt-6">
        <div className="h-12 w-full rounded-xl bg-foreground/15" />
      </div>
    </div>
  );
}

/**
 * Skeleton placeholder for Admin Tables
 */
export function AdminTableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="w-full bg-panel border border-border rounded-2xl shadow-sm overflow-hidden animate-pulse">
      {/* Table Header */}
      <div className="border-b border-border bg-background/50 px-6 py-4 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <div
            key={i}
            className="h-4 rounded bg-foreground/15"
            style={{ width: `${100 / cols}%` }}
          />
        ))}
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, rIdx) => (
          <div key={rIdx} className="px-6 py-4.5 flex items-center gap-4">
            {Array.from({ length: cols }).map((_, cIdx) => (
              <div
                key={cIdx}
                className="h-4.5 rounded bg-foreground/10"
                style={{ width: `${100 / cols}%` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton placeholder for Admin Dashboard Metrics / Stats
 */
export function AdminStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-panel border border-border p-6 rounded-2xl flex flex-col gap-3">
          <div className="h-4 w-28 rounded bg-foreground/15" />
          <div className="h-8 w-16 rounded bg-foreground/20" />
          <div className="h-3 w-36 rounded bg-foreground/10" />
        </div>
      ))}
    </div>
  );
}
