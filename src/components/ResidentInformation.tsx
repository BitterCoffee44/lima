import { studentSchema } from "@/lib/types";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ResidentInformation({
  student,
}: {
  student: studentSchema;
}) {
  console.log(student.booksBorrowed);
  function getRandomColor() {
    const color = [
      "bg-green-300",
      "bg-amber-300",
      "bg-violet-300",
      "bg-amber-300",
      "bg-fuchsia-300",
      "bg-cyan-300",
      "bg-blue-300",
      "border border-black",
    ];
    return color[Math.floor(Math.random() * color.length)];
  }

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        {student.studentName}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-">
            {student.studentName}
          </DialogTitle>
          <DialogDescription className="text-center">
            <span className="italic text-f">
              {student.studentCourse} {student.studentYearLevel}
            </span>
          </DialogDescription>
          <div className="flex flex-col ">
            <div className="my-4">Books borrowed:</div>
            <div className="flex flex-row gap-4 my-3">
              {student.booksBorrowed &&
                Object.entries(student.booksBorrowed).map(([key, value]) => {
                  return (
                    <div
                      className={`${getRandomColor()} rounded-md p-2`}
                      key={key}
                    >
                      {value.bookTitle}
                    </div>
                  );
                })}
            </div>
            <hr className="my-2" />
            <div className="flex flex-row gap-4 justify-around">
              <div className="flex flex-col border border-zinc-400 rounded-md">
                <p className="m-2">{student.studentStatus}</p>
              </div>
              <div className="flex flex-col border border-zinc-400 rounded-md">
                <p className="m-2">RFID Tag: {student.studentRFIDTag}</p>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
