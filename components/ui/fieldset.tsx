import * as React from "react";
import { cn } from "@/lib/utils";

const Fieldset = React.forwardRef<HTMLFieldSetElement, React.FieldsetHTMLAttributes<HTMLFieldSetElement>>(({ className, ...props }, ref) => <fieldset ref={ref} className={cn("space-y-4 border-0 p-0", className)} {...props} />);
Fieldset.displayName = "Fieldset";

export { Fieldset };
