"use client";

import { Clipboard } from "lucide-react";

import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function CopyButton({ text }: { text: string }) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copying to clipboard was successful!");
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="text-slate-50 bg-transparent hover:bg-transparent absolute right-0 top-0"
            onClick={() => copyToClipboard(text)}
          >
            <Clipboard size="1.5em" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copy to clipboard</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
