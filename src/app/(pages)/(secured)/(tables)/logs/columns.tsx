import { Button } from "@/components/ui/button";
import { logsRTDBSchema } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const logsColumns: ColumnDef<logsRTDBSchema>[] = [
  {
    accessorKey: "userName",
    header: "User",
  },
  {
    accessorKey: "timeIn",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time In
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "timeOut",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time Out
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const timeOut = row.getValue("timeOut");

      return <div>{timeOut ? `${timeOut}` : "-----"}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];
