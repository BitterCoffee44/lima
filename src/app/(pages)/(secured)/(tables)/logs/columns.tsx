import { logsRTDBSchema } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const logsColumns: ColumnDef<logsRTDBSchema>[] = [
  {
    accessorKey: "userName",
    header: "User",
  },
  {
    accessorKey: "timeIn",
    header: "Time In",
  },
  {
    accessorKey: "timeOut",
    header: "Time Out",
    cell: ({ row }) => {
      const timeOut = row.getValue("timeOut");

      return <div>{timeOut ? `${timeOut}` : "---"}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];
