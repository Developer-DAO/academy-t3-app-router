"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";

interface Props {
  text: string;
}

export const CopyToClipboard = ({ text }: Props) => {
  const [copied, setCopied] = useState(false);

  const [, copyToClipboard] = useCopyToClipboard();

  return (
    <div className="absolute right-1 top-1 z-10 rounded-lg border border-gray-400 bg-gray-700">
      <Button
        onClick={() => {
          void copyToClipboard(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        type="button"
        className="hover:bg-gray-600"
      >
        {copied ? (
          <div
            className="tooltip tooltip-open tooltip-left tooltip-success"
            data-tip="Copied!"
          >
            <Icons.copied_icon />
          </div>
        ) : (
          <Icons.copy_icon />
        )}
      </Button>
    </div>
  );
};
