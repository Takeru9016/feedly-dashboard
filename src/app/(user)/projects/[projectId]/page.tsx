import Link from "next/link";
import { ChevronLeft, Globe } from "lucide-react";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { projects as dbProjects } from "@/db/schema";
import { Table } from "@/components";

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
      <div>
        <Link
          href="/dashboard"
          className="flex items-center text-indigo-700 mb-5"
        >
          <ChevronLeft className="mr-1 h-5 w-5" />
          <span className="text-lg">Back to Projects</span>
        </Link>
        <hr className="mb-5" />
      </div>
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

      <div>
        <Table data={projectData.feedbacks} />
      </div>
    </div>
  );
}
