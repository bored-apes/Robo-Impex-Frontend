import { forwardRef } from "react"

const Separator = forwardRef(({ className = "", orientation = "horizontal", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`shrink-0 bg-border ${
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]"
      } ${className}`}
      {...props}
    />
  )
})
Separator.displayName = "Separator"

export { Separator }
