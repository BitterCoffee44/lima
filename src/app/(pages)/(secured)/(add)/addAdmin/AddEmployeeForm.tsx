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
import { createNewAdmin } from "../../../../../../firebase/adminTools/adminCreateUser";

const adminFormSchema = z
  .object({
    adminName: z.string().min(1, {
      message: "Name is required.",
    }),
    adminEmail: z
      .string()
      .email({
        message: "Please provide email.",
      })
      .min(1, {
        message: "Status is required.",
      }),
    adminPassword: z.string().min(8, {
      message: "Password must at least be 8 characters.",
    }),
    adminRepeatPassword: z.string().min(8, {
      message: "Password must at least be 8 characters.",
    }),
    adminContactNumber: z
      .string()
      .min(11, {
        message: "Contact Number is required.",
      })
      .startsWith("+", {
        message:
          "The phone number must be a non-empty E.164 standard compliant identifier string.",
      }),
  })
  .refine((data) => data.adminPassword === data.adminRepeatPassword, {
    message: "Passwords don't match",
    path: ["adminRepeatPassword"],
  });

export default function AddadminForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const adminForm = useForm<z.infer<typeof adminFormSchema>>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      adminName: "",
      adminEmail: "",
      adminPassword: "",
      adminRepeatPassword: "",
      adminContactNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof adminFormSchema>) {
    setLoading(true);
    setError("");

    // console.log(values);
    const response = await createNewAdmin({
      adminEmail: values.adminEmail,
      adminPassword: values.adminPassword,
      adminName: values.adminName,
      adminContactNumber: values.adminContactNumber,
    });

    if (response.status) {
      toast.success(`${values.adminName} had been registered.`);
      router.push("/admins");
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
            <CardTitle className="text-lg text-center">
              Register New Admin
            </CardTitle>
            <CardDescription>Add to new admin to the database.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...adminForm}>
              <form
                onSubmit={adminForm.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={adminForm.control}
                  name="adminName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name: </FormLabel>
                      <FormControl>
                        <Input placeholder="E.g. John Clifford" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the admin&apos;s name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={adminForm.control}
                  name="adminEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email: </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g. cliffore@lima.com"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is the admin&apos;s email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row gap-4">
                  <div className="w-full">
                    <FormField
                      control={adminForm.control}
                      name="adminPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password: </FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is the admin&apos;s password.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={adminForm.control}
                      name="adminRepeatPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Repeat Password: </FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="" {...field} />
                          </FormControl>
                          <FormDescription>Repeat the password</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={adminForm.control}
                  name="adminContactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number: </FormLabel>
                      <FormControl>
                        <Input placeholder="E.g. +639195126436" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the admin&apos;s contact number.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-full">
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Adding Admin....
                      </>
                    ) : (
                      "Add Admin"
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
