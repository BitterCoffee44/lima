"use client";

import { Button } from "@/components/ui/button";
import { Book } from "@/lib/types";
import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { deleteBook } from "../../../../../../firebase/realTimeDatabase";
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
import BookInformation from "@/components/BookInformation";

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<Book> = (row, columnId, filterValue) => {
  // Concatenate the values from multiple columns into a single string
  const searchableRowContent = `${row.original.bookAuthor} ${row.original.bookGenre} ${row.original.bookTitle} ${row.original.bookPublicationDate}`;

  // Perform a case-insensitive comparison
  return searchableRowContent.toLowerCase().includes(filterValue.toLowerCase());
};

export const bookColumns: ColumnDef<Book>[] = [
  {
    accessorKey: "bookTitle",
    header: () => <div className="text-left font-medium">Book Title</div>,
    filterFn: multiColumnFilterFn,
    cell: ({ row }) => {
      const book = row.original;
      return <BookInformation book={book} />;
    },
  },
  {
    accessorKey: "bookAuthor",
    header: "Author",
    filterFn: multiColumnFilterFn,
  },
  {
    accessorKey: "bookPublicationDate",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Publication Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: multiColumnFilterFn,
  },
  {
    accessorKey: "bookGenre",
    header: "Genre",
    cell: ({ row }) => {
      const genre: string = row.getValue("bookGenre");

      return (
        <div>{`${genre.length > 20 ? genre.slice(0, 20) + "..." : genre}`}</div>
      );
    },
    filterFn: multiColumnFilterFn,
  },
  {
    accessorKey: "bookShelfCode",
    header: "Shelf",
  },
  {
    accessorKey: "bookStatus",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("bookStatus");
      const color = status == "Borrowed" ? "text-red-500" : "text-green-500";
      return <div className={` ${color}`}>{status}</div>;
    },
  },
];

export const columnsAuth: ColumnDef<Book>[] = [
  {
    accessorKey: "bookTitle",
    header: () => <div className="text-left font-medium">Book Title</div>,
    filterFn: multiColumnFilterFn,
    cell: ({ row }) => {
      const book = row.original;
      return <BookInformation book={book} />;
    },
  },
  {
    accessorKey: "bookAuthor",
    header: "Author",
    filterFn: multiColumnFilterFn,
  },
  {
    accessorKey: "bookPublicationDate",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Publication Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: multiColumnFilterFn,
  },
  {
    accessorKey: "bookGenre",
    header: "Genre",
    cell: ({ row }) => {
      const genre: string = row.getValue("bookGenre");

      return (
        <div>{`${genre.length > 15 ? genre.slice(0, 15) + "..." : genre}`}</div>
      );
    },
    filterFn: multiColumnFilterFn,
  },
  {
    accessorKey: "bookShelfCode",
    header: "Shelf",
  },
  {
    accessorKey: "bookStatus",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("bookStatus");
      const color = status == "Borrowed" ? "text-red-500" : "text-green-500";
      return <div className={` ${color}`}>{status}</div>;
    },
  },
  {
    accessorKey: "Update",
    cell: ({ row }) => {
      const bookInfo = row.original;
      return (
        <Link href={`/updateBooks/${bookInfo.id}`}>
          <Button className="bg-green-500">Update</Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "Delete",
    cell: ({ row }) => {
      const bookInfo = row.original;
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
                <span className="font-bold">{bookInfo.bookTitle}</span> and
                remove your book from the server.
              </DialogDescription>
              <DialogFooter>
                <div className="flex flex-row-reverse justify-end gap-2">
                  <DialogClose asChild>
                    <Button
                      onClick={async () => {
                        await deleteBook(
                          bookInfo.id,
                          bookInfo.bookShelfCode,
                          bookInfo.bookUHFTag
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
