"use client";

import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

type CalBookingButtonProps = {
  calLink: string | null | undefined;
  className?: string;
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "destructive-outline";
  size?: "sm" | "lg" | "xl" | "xs" | "default";
};

export function CalBookingButton({ calLink, className, variant = "default", size = "sm" }: CalBookingButtonProps) {
  if (!calLink) {
    return null;
  }

  const normalizedLink = calLink.startsWith("http") ? calLink : `https://cal.com/${calLink}`;

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={normalizedLink} target="_blank" rel="noopener noreferrer">
        <Calendar className="mr-2 h-4 w-4" />
        Book on Cal.com
      </a>
    </Button>
  );
}
