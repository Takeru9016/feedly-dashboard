"use client";

import { useFormStatus } from "react-dom";

import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function SubmitProjectButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit">
      {pending ? (
        <>
          <Loader2 size={4} className="mr-2 animate-spin" />
          "Creating..."
        </>
      ) : (
        "Create Project"
      )}
    </Button>
  );
}
