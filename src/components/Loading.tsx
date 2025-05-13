import { Loader2 } from "lucide-react";
import React, { ReactNode } from "react";

export default function Loading({ children }: { children: ReactNode }) {
  return (
    <div className="w-full p-10">
      <div className="flex justify-center gap-2 flex-row">
        <Loader2 className="animate-spin" />
        {children}
      </div>
    </div>
  );
}
