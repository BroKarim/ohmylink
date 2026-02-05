import { ensureUserHasProfile } from "@/server/user/settings/actions";
import { redirect } from "next/navigation";

export default async function EditorEntryPage() {
  const { username } = await ensureUserHasProfile();
  redirect(`/editor/${username}`);
}
