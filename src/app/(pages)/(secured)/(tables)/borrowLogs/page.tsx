"use client";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { borrowedLogsColumn } from "./columns";
import { getDatabase, ref, remove } from "firebase/database";
import firebaseApp from "../../../../../../firebase/clientApp";
import { useListVals } from "react-firebase-hooks/database";
import { CalendarPicker } from "@/components/Calendar";

const database = getDatabase(firebaseApp);
const date = new Date();
const month = date.getMonth();
const day = date.getDate();
const year = date.getFullYear();
const currentDay = `${
  date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
}-${
  date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
}-${date.getFullYear()}`;

export default function Page() {
  const [currentDate, setCurrentDate] = useState<string>(currentDay);

  const [data, isLoading, error] = useListVals(
    ref(database, `borrowedLogs/${currentDate}`)
  );
  const [borrowedLogs, setBorrowedLogs] = useState([]);
  const [date, setDate] = React.useState<Date>(new Date(year, month, day));

  useEffect(() => {
    if (date) {
      setCurrentDate(
        `${
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1
        }-${
          date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
        }-${date.getFullYear()}`
      );
    }
  }, [date]);

  useEffect(() => {
    const uniqueArray = Array.from(
      new Set(data?.map((o) => JSON.stringify(o)))
    ).map((str) => JSON.parse(str));
    console.log(uniqueArray);
    setBorrowedLogs(uniqueArray);
  }, [data]);

  if (error)
    return (
      <div className="container mx-auto py-10 text-center">
        <div>An error occurred</div>
        <div>Kindly refresh the site</div>
      </div>
    );
  if (isLoading)
    return (
      <div className="w-full p-10">
        <div className="flex justify-center flex-row">
          <Loader2 className="animate-spin" />
          <div>Loading Borrowed Logs....</div>
        </div>
      </div>
    );

  return (
    <div className="w-full px-10 py-10">
      <div className="flex flex-row-reverse">
        <CalendarPicker date={date} setDate={setDate} />
      </div>

      <DataTable columns={borrowedLogsColumn} data={borrowedLogs} />
    </div>
  );
}
