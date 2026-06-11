import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { SiteHeader } from '@/components/site-header'

export default function Loading() {
  return (
    <>
        <SiteHeader title='Leads'/>
        <main className="container mx-auto px-4 py-6">
        {/* Header skeleton */}
        <div className="flex justify-between items-center py-4">
            <Skeleton className="h-10 w-64 rounded-lg" />
            <div className="flex gap-3">
            <Skeleton className="h-10 w-36 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
            </div>
        </div>

        {/* Cards Skeletons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-2xl" />
            ))}
        </div>

        {/* Filters Skeleton */}
        <div className="flex justify-between items-center py-4 mt-4">
            <Skeleton className="h-8 w-72 rounded-lg" />
            <Skeleton className="h-10 w-48 rounded-lg" />
        </div>

        {/* Table Skeleton */}
        <div className="rounded-lg border border-border bg-card p-4 space-y-3">
            <Skeleton className="h-8 w-full rounded-md" />
            {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-md" />
            ))}
        </div>
        </main>
    </>
  )
}