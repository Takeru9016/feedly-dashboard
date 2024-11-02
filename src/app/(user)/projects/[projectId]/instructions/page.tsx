import { CopyButton } from "@/components";

export default function InstructionPage({
  params,
}: {
  params: { projectId: string };
}) {
  if (!params.projectId) {
    return <div>Invalid project id</div>;
  }

  if (!process.env.WIDGET_URL) {
    return <div>Invalid widget url</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Start Collecting Feedback</h1>
      <p className="text-lg text-secondary-foreground">
        Embed the code in your site
      </p>

      <div className="bg-blue-950 p-6 rounded-md mt-6 relative">
        <code className="text-white">
          {`<feedly-app projectId="${params.projectId}"></feedly-app>`}
          <br />
          {`<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`}
        </code>
        <CopyButton
          text={`<feedly-app projectId="${params.projectId}"></feedly-app>\n<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`}
        />
      </div>
    </div>
  );
}
