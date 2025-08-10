import * as React from "react"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<"div"> {
  value?: number // 0-100
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, children, ...props }, ref) => {
    const clamped = Math.min(100, Math.max(0, value))
    return (
      <div
        ref={ref}
        data-slot="progress"
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
          className
        )}
        {...props}
      >
        <div
          data-slot="progress-indicator"
          className="h-full w-[var(--progress)] flex-none bg-primary transition-[width] duration-300"
          style={{
            // Allow children to override width if provided
            // Otherwise use value prop
            // Children are used by your SentimentSummary to color the bar
            // so we only set width when children are not provided
            ...(children ? {} : { width: `${clamped}%` }),
          }}
        />
        {children}
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }


