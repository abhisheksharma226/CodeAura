"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-muted shimmer-effect", className)} {...props} />
}

export function ChartSkeleton() {
  return (
    <div className="h-64 w-full space-y-3">
      <div className="flex justify-between">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-12" />
        ))}
      </div>
      <div className="flex items-end justify-between h-48 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="w-full" style={{ height: `${Math.random() * 80 + 20}%` }} />
        ))}
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  )
}
