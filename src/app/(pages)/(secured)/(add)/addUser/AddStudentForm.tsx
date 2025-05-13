"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { addNewStudent } from "../../../../../../firebase/rtdb/studentRTDB";

const studentFormSchema = z.object({
  studentName: z.string().min(1, {
    message: "Name is required.",
  }),
  studentCourse: z.string().min(1, {
    message: "Course is required.",
  }),
  studentYearLevel: z.string().min(1, {
    message: "Year level is required.",
  }),
  studentRFIDTag: z.string().min(1, {
    message: "RFID Tag is required",
  }),
  studentStatus: z.string().min(1, {
    message: "Status is required.",
  }),
});

export default function AddStudentForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const studentForm = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      studentName: "",
      studentCourse: "",
      studentYearLevel: "",
      studentRFIDTag: "",
      studentStatus: "",
    },
  });

  async function onSubmit(values: z.infer<typeof studentFormSchema>) {
    setLoading(true);
    setError("");

    const response = await addNewStudent(values);

    if (response.status) {
      toast.success(`${values.studentStatus} had been registered.`);
      router.push("/user");
    } else {
      toast.error(response.message);
      setError(response.message);
    }

    setLoading(false);
  }

  return (
    <div className="h-full w-full">
      <div className="flex justify-center">
        <Card className="w-2xl m-2">
          <CardHeader>
            <CardTitle className="text-lg text-center">Add New User</CardTitle>
            <CardDescription>Add user to the database.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...studentForm}>
              <form
                onSubmit={studentForm.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={studentForm.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name: </FormLabel>
                      <FormControl>
                        <Input placeholder="E.g. John Clifford" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the user&apos;s name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row gap-4">
                  <div className="w-full">
                    <FormField
                      control={studentForm.control}
                      name="studentCourse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course: </FormLabel>
                          <FormControl>
                            <Input placeholder="E.g. BSCPE" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is the user&apos;s course
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={studentForm.control}
                      name="studentYearLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year Level: </FormLabel>
                          <FormControl>
                            <Input placeholder="E.g. 1-1" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is the user&apos;s year level
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <div className="w-full">
                    <FormField
                      control={studentForm.control}
                      name="studentStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status: </FormLabel>
                          <FormControl>
                            <Input placeholder="E.g. Student" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is the status of the person.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={studentForm.control}
                      name="studentRFIDTag"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>RFID Tag: </FormLabel>
                          <FormControl>
                            <Input placeholder="E.g. 19HA90SB" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is the user&apos;s RFID Tag
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
                      <>
                        <Loader2 className="animate-spin" />
                        Adding User....
                      </>
                    ) : (
                      "Add User"
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
