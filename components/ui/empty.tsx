import * as React from "react";
import { cn } from "@/lib/utils";

const Empty = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center", className)} {...props} />
));
Empty.displayName = "Empty";

const EmptyIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("mb-4 text-muted-foreground", className)} {...props} />);
EmptyIcon.displayName = "EmptyIcon";

const EmptyTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => <h3 ref={ref} className={cn("mb-2 text-lg font-semibold", className)} {...props} />);
EmptyTitle.displayName = "EmptyTitle";

const EmptyDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => <p ref={ref} className={cn("mb-4 text-sm text-muted-foreground", className)} {...props} />);
EmptyDescription.displayName = "EmptyDescription";

const EmptyAction = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("mt-4", className)} {...props} />);
EmptyAction.displayName = "EmptyAction";

export { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyAction };
