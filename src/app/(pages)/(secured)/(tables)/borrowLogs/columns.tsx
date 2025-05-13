import { Button } from "@/components/ui/button";
import { borrowedLogs } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const borrowedLogsColumn: ColumnDef<borrowedLogs>[] = [
  {
    accessorKey: "borrowedTime",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "borrowedDate",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Borrowed Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "borrowedBookTitle",
    header: "Book Title",
  },
  {
    accessorKey: "borrowedUser",
    header: "User",
  },
  {
    accessorKey: "borrowedStatus",
    header: "Status",
  },
];
