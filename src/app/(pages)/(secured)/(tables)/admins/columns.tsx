import { adminRTDBSchema } from "@/lib/types";
import { ColumnDef, FilterFn } from "@tanstack/react-table";

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
import { Button } from "@/components/ui/button";
import { deleteAdmin } from "../../../../../../firebase/adminTools/adminCreateUser";
import AdminInformation from "@/components/AdminInformation";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import firebaseApp from "../../../../../../firebase/clientApp";
import { toast } from "sonner";

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<adminRTDBSchema> = (
  row,
  columnId,
  filterValue
) => {
  // Concatenate the values from multiple columns into a single string
  const searchableRowContent = `${row.original.uid} ${row.original.adminName} ${row.original.adminEmail} ${row.original.adminContactNumber}`;

  // Perform a case-insensitive comparison
  return searchableRowContent.toLowerCase().includes(filterValue.toLowerCase());
};

export const adminColumns: ColumnDef<adminRTDBSchema>[] = [
  {
    accessorKey: "uid",
    header: () => <div className="text-left font-medium">ID</div>,
    cell: ({ row }) => {
      const admin = row.original;
      return <AdminInformation admin={admin} header={admin.uid} />;
    },
    filterFn: multiColumnFilterFn,
  },
  {
    accessorKey: "adminName",
    header: () => <div className="text-left font-medium">Name</div>,
    cell: ({ row }) => {
      const admin = row.original;
      return <AdminInformation admin={admin} header={admin.adminName} />;
    },
    filterFn: multiColumnFilterFn,
  },
  {
    accessorKey: "adminEmail",
    header: () => <div className="text-left font-medium">Email</div>,
    filterFn: multiColumnFilterFn,
  },
  {
    accessorKey: "adminContactNumber",
    header: () => <div className="text-left font-medium">Contact Number</div>,
    filterFn: multiColumnFilterFn,
  },
  {
    accessorKey: "Delete",
    cell: ({ row }) => {
      const adminInfo = row.original;
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
                <span className="font-bold">{adminInfo.adminName}</span> and
                remove your book from the server.
              </DialogDescription>
              <DialogFooter>
                <div className="flex flex-row-reverse justify-end gap-2">
                  <DialogClose asChild>
                    <Button
                      onClick={() => {
                        onAuthStateChanged(
                          getAuth(firebaseApp),
                          async (user) => {
                            if (user) {
                              if (user.uid == adminInfo.uid) {
                                toast.error(
                                  "Error, you can't delete your own account"
                                );
                              } else {
                                await deleteAdmin(
                                  adminInfo.uid,
                                  adminInfo.adminName
                                );
                                toast.success(
                                  `${adminInfo.adminName} had been deleted.`
                                );
                              }
                            } else {
                            }
                          }
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
