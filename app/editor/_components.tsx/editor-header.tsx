"use client";

import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DomainView } from "@/components/domain-view";
import { ModeSwitcher } from "@/components/mode-switcher";
import { ProfileEditorData } from "@/server/user/profile/payloads";

interface EditorHeaderProps {
  profile: ProfileEditorData;
}

export default function EditorHeader({ profile }: EditorHeaderProps) {
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || "ohmylink.com").replace(/https?:\/\//, "");
  const username = (profile as any).user?.username || profile.slug || "user";
  const fullUrl = `${baseUrl}/${username}`;

  return (
    <header className=" backdrop-blur-md sticky top-0 z-50 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="font-bold text-xl tracking-tighter">
            oh<span className="text-primary text-2xl">!</span>
          </Link>
          <DomainView
            placeholder={fullUrl}
            value={fullUrl}
            buttonCopy={{
              idle: "Copy",
              success: "Copied!",
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <ModeSwitcher />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
