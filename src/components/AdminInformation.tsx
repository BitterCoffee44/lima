import { adminRTDBSchema } from "@/lib/types";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AdminInformation({
  admin,
  header,
}: {
  admin: adminRTDBSchema;
  header: string;
}) {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">{header}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-">
            {admin.adminName}
          </DialogTitle>
          <DialogDescription className="text-center">
            created At: <span className="italic text-f">{admin.createdAt}</span>
            ,
          </DialogDescription>

          <div className="">
            <p className="m-2">UID: {admin.uid}</p>
          </div>
          <div className="">
            <p className="m-2">Email: {admin.adminEmail}</p>
          </div>
          <div className="">
            <p className="m-2">Contact Number: {admin.adminContactNumber}</p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
