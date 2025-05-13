"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { studentSchema } from "@/lib/types";
import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { deleteStudent } from "../../../../../../firebase/rtdb/studentRTDB";
import ResidentInformation from "@/components/ResidentInformation";

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<studentSchema> = (
  row,
  columnId,
  filterValue
) => {
  // Concatenate the values from multiple columns into a single string
  const searchableRowContent = `${row.original.studentCourse} ${row.original.studentName} ${row.original.studentYearLevel} ${row.original.studentRFIDTag}`;

  // Perform a case-insensitive comparison
  return searchableRowContent.toLowerCase().includes(filterValue.toLowerCase());
};

export const studentColumnDef: ColumnDef<studentSchema>[] = [
  {
    accessorKey: "studentName",
    header: "Name",
    cell: ({ row }) => {
      const student = row.original;
      return <ResidentInformation student={student} />;
    },
    filterFn: multiColumnFilterFn,
  },
  {
    accessorKey: "studentCourse",
    header: "Course",
    filterFn: multiColumnFilterFn,
  },
  {
    accessorKey: "studentYearLevel",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Year Level <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: multiColumnFilterFn,
  },
  {
    accessorKey: "studentRFIDTag",
    header: "RFID Tag",
    filterFn: multiColumnFilterFn,
  },
  {
    accessorKey: "studentStatus",
    header: "Status",
    filterFn: multiColumnFilterFn,
  },

  {
    accessorKey: "Update",
    cell: ({ row }) => {
      const studentInfo = row.original;
      return (
        <Link href={`/updateStudents/${studentInfo.id}`}>
          <Button className="bg-green-500">Update</Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "Delete",
    cell: ({ row }) => {
      const studentInfo = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"destructive"}> Delete</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete{" "}
                <span className="font-bold">{studentInfo.studentName}</span> and
                remove <span>{studentInfo.studentStatus}</span> from the server.
              </DialogDescription>
              <DialogFooter>
                <div className="flex flex-row-reverse justify-end gap-2">
                  <DialogClose asChild>
                    <Button
                      onClick={async () => {
                        await deleteStudent(
                          studentInfo.id,
                          studentInfo.studentRFIDTag
                        );
                      }}
                      variant="destructive"
                    >
                      Yes
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant={"outline"}>No</Button>
                  </DialogClose>
                </div>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
