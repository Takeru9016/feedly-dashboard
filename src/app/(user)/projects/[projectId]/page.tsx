import { eq } from "drizzle-orm";

import { db } from "@/db";
import { projects as dbProjects } from "@/db/schema";
import Link from "next/link";
import { Globe } from "lucide-react";

export default async function ViewProject({
  params,
}: {
  params: { projectId: string };
}) {
  if (!params.projectId) {
    return <div>Invalid project ID</div>;
  }

  const projects = await db.query.projects.findMany({
    where: eq(dbProjects.id, Number(params.projectId)),
    with: {
      feedbacks: true,
    },
  });

  const projectData = projects[0];

  return (
    <div>
      <div className="flex justify-between items-start">
        <div className="proj-info">
          <h1 className="text-3xl font-bold mb-3">{projectData.name}</h1>
          <h2 className="text-primary-background text-xl mb-2 ">
            {projectData.description}
          </h2>
        </div>
        {projectData.url ? (
          <Link
            href={projectData.url}
            className="flex items-center underline text-indigo-700"
          >
            <Globe size={20} className="mr-1" />
            <span className="text-lg">View Site</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
