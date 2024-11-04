import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { NewProjectButton } from "@/components";
import { getSubscription } from "@/actions";
import { db } from "@/db";
import { projects } from "@/db/schema";
import ProjectList from "./ProjectList";
import { maxFreeProjects } from "@/lib/payment";

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) return null;

  const userProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId));

  const subscribed = await getSubscription({ userId });

  return (
    <div>
      <div className="flex items-center justify-between border-b">
        <h1 className="text-3xl font-bold text-center my-4">Your Projects</h1>
        {subscribed !== true && userProjects.length > maxFreeProjects ? (
          <p className="text-red-500 text-sm font-bold my-4 text-center w-full">
            You have reached the maximum number of free projects allowed.
            Upgrade to a premium plan to create more projects.
          </p>
        ) : (
          <NewProjectButton />
        )}
      </div>
      {!subscribed ? (
        <ProjectList projects={userProjects} />
      ) : (
        <p>You are not subscribed to a premium plan.</p>
      )}
    </div>
  );
}
