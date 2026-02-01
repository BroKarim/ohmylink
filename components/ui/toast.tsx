"use client";

import { toast as sonnerToast } from "sonner";

type ToastType = "success" | "error" | "info" | "warning" | "loading";

interface ToastOptions {
  title: string;
  description?: string;
  type: ToastType;
  timeout: number;
}

// Toast manager untuk kompatibilitas dengan kode lama
export const toastManager = {
  add: ({ title, description, type, timeout }: ToastOptions) => {
    const message = description ? `${title}\n${description}` : title;

    switch (type) {
      case "success":
        return sonnerToast.success(title, {
          description,
          duration: timeout,
        });
      case "error":
        return sonnerToast.error(title, {
          description,
          duration: timeout,
        });
      case "warning":
        return sonnerToast.warning(title, {
          description,
          duration: timeout,
        });
      case "loading":
        return sonnerToast.loading(title, {
          description,
          duration: timeout,
        });
      case "info":
      default:
        return sonnerToast.info(title, {
          description,
          duration: timeout,
        });
    }
  },
};
