import { bookUpdateSchema } from "@/lib/types";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function BookInformation({ book }: { book: bookUpdateSchema }) {
  const genreList = book.bookGenre.split(" ");

  function getColor(genre: string) {
    if (genre == "Academic") return "bg-green-300";
    if (genre == "Western") return "bg-amber-300";
    if (genre == "Psychology") return "bg-violet-300";
    if (genre == "Adventure") return "bg-amber-300";
    if (genre == "Self-Help") return "bg-fuchsia-300";
    if (genre == "Essay") return "bg-cyan-300";
    if (genre == "Nonfiction") return "bg-blue-300";
    return "border border-black";
  }

  return (
    <Dialog>
      <DialogTrigger className=" cursor-pointer">
        {book.bookTitle}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">{book.bookTitle}</DialogTitle>
          <DialogDescription className="text-center">
            by <span className="italic text-f">{book.bookAuthor}</span>,{" "}
            {book.bookPublicationDate}
          </DialogDescription>
          <div className="flex flex-col ">
            <div className="my-4">{book.bookSummary}</div>
            <div className="flex flex-row gap-4 my-3">
              {genreList.map((genre) => {
                return (
                  <div
                    className={`${getColor(genre)} rounded-md p-2`}
                    key={genre}
                  >
                    {genre}
                  </div>
                );
              })}
            </div>
            <hr className="my-2" />
            <div className="flex flex-row gap-4 justify-around">
              <div className="flex flex-col border border-zinc-400 rounded-md">
                <p className="m-2">
                  Status:{" "}
                  <span
                    className={
                      book.bookStatus == "Available"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {book.bookStatus}
                  </span>
                </p>
              </div>
              <div className="flex flex-col border border-zinc-400 rounded-md">
                <p className="m-2">Shelf Code: {book.bookShelfCode}</p>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
