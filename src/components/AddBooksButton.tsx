import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export default function AddBooksButton() {
  return (
    <div>
      <Button asChild variant="outline">
        <Link href="addBooks">
          {" "}
          <PlusIcon />
          Add Books
        </Link>
      </Button>
    </div>
  );
}
