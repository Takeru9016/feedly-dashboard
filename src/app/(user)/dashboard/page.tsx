import { NewProjectButton } from "@/components";
import { db } from "@/db";
import { projects } from "@/db/schema";

export default async function Dashboard() {
  const allProjects = await db.select().from(projects);

  return (
    <div>
      <NewProjectButton />
    </div>
  );
}
