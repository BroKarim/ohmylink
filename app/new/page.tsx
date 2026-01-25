import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NewPageDialog } from "@/components/new-page-dialog";
import { getOnboardingStatus } from "@/server/user/settings/actions";
import { headers } from "next/headers";

export default async function NewPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const { isOnboarded, username } = await getOnboardingStatus();
  if (isOnboarded && username) {
    redirect(`/editor/${username}`);
  }

  return <NewPageDialog />;
}
