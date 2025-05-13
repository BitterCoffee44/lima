"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { addNewBook } from "../../../../../../firebase/realTimeDatabase";

const bookFormSchema = z.object({
  bookTitle: z
    .string({
      required_error: "Title is required.",
    })
    .min(1, {
      message: "Title is required",
    })
    .trim(),
  bookAuthor: z
    .string({
      required_error: "Author is required. If none, write (None).",
    })
    .min(1, {
      message: "Author is required",
    })
    .trim(),
  bookGenre: z
    .string({
      required_error: "Genre is required.",
    })
    .min(1, {
      message: "Genre is required",
    })
    .trim(),
  bookShelfCode: z.string().min(1, {
    message: "Shelf Code is required",
  }),
  bookUHFTag: z.string().min(1, {
    message: "Book Tag Code is required.",
  }),
  bookSummary: z
    .string({
      required_error: "Summary is required",
    })
    .min(1, {
      message: "Summary is required",
    }),
  bookPublicationDate: z
    .string()
    .min(1, {
      message: "Publication Year is required.",
    })
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
});

export default function AddBooksForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const bookForm = useForm<z.infer<typeof bookFormSchema>>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      bookTitle: "",
      bookAuthor: "",
      bookGenre: "",
      bookSummary: "",
      bookShelfCode: "",
      bookUHFTag: "",
      bookPublicationDate: "1990",
    },
  });

  async function onSubmit(values: z.infer<typeof bookFormSchema>) {
    setLoading(true);
    setError("");
    const response = await addNewBook({
      bookTitle: values.bookTitle,
      bookAuthor: values.bookAuthor,
      bookGenre: values.bookGenre,
      bookSummary: values.bookSummary,
      bookShelfCode: values.bookShelfCode,
      bookUHFTag: values.bookUHFTag,
      bookPublicationDate: parseInt(values.bookPublicationDate),
      bookStatus: "Available",
    });

    if (response.status) {
      toast.success(
        `${values.bookTitle} had been added to ${values.bookShelfCode}`
      );
      router.push("/books");
    } else {
      toast.error(response.message);
      setError(response.message);
    }

    setLoading(false);
  }
  return (
    <div className="h-full w-full ">
      <div className="flex justify-center">
        <Card className="w-2xl m-2">
          <CardHeader>
            <CardTitle className="text-lg text-center">Add New Book</CardTitle>
            <CardDescription>Add a new book to the library</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...bookForm}>
              <form
                onSubmit={bookForm.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={bookForm.control}
                  name="bookTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title: </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g. The Adventure of JC"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>The title of the book.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={bookForm.control}
                  name="bookAuthor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g. John Clifford" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the author of the book.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={bookForm.control}
                  name="bookSummary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Summary:</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="E.g. JC went on a travel to collect the Philosopher's Stone"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The Summary of the book.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={bookForm.control}
                  name="bookGenre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre:</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g. Adventure" {...field} />
                      </FormControl>
                      <FormDescription>
                        The Genre of the book. If multiple genre, separate them
                        with space.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4  justify-between">
                  <div className="w-full">
                    <FormField
                      control={bookForm.control}
                      name="bookPublicationDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Publication Year:</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="E.g. 2020"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The publication year of the book.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={bookForm.control}
                      name="bookShelfCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shelf Code:</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g. A4." {...field} />
                          </FormControl>
                          <FormDescription>
                            The location shelf of the book.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={bookForm.control}
                      name="bookUHFTag"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>UHF Tag:</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g. 19AHBS89." {...field} />
                          </FormControl>
                          <FormDescription>
                            The UHF Tag Code of the book.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="w-full">
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <div className="flex flex-row">
                        <Loader2 className="animate-spin" />
                        <div>Adding Book....</div>
                      </div>
                    ) : (
                      "Add Book"
                    )}
                  </Button>
                  <p className="text-red-500 text-center">{error}</p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
