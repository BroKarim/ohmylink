import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import EditorClient from "../_components.tsx/editor-client";
import { profileEditorPayload } from "@/server/user/profile/payloads";
import { Suspense } from "react";

async function EditorContent({ username }: { username: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/login");

  const profile = await db.profile.findFirst({
    where: {
      user: { username: username },
    },
    select: profileEditorPayload,
  });

  if (!profile) notFound();

  if (profile.userId !== session.user.id) {
    redirect("/editor");
  }

  return <EditorClient initialProfile={profile} />;
}

export default async function EditorPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <EditorContent username={username} />
    </Suspense>
  );
}
