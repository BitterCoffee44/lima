"use client";
import { DataTable } from "./data-table";
import { useListVals } from "react-firebase-hooks/database";
import { ref, getDatabase } from "firebase/database";
import firebaseApp from "../../../../../../firebase/clientApp";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { logsColumns } from "./columns";
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

export default function DemoPage() {
  const [currentDate, setCurrentDate] = useState<string>(currentDay);
  const [data, isLoading, error] = useListVals(
    ref(database, `logs/${currentDate}`)
  );
  const [logs, setLogs] = useState([]);
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
    if (data) {
      const removeNull = data?.filter((a) => a.timeIn != undefined);
      const sortedData = removeNull?.sort((a, b) =>
        b.timeIn.localeCompare(a.timeIn)
      );
      console.log(data);
      const uniqueArray = Array.from(
        new Set(sortedData?.map((o) => JSON.stringify(o)))
      ).map((str) => JSON.parse(str));
      setLogs(uniqueArray);
    }
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
          <div>Loading Logs....</div>
        </div>
      </div>
    );

  return (
    <div className="w-full px-10 py-10">
      <div className="flex flex-row-reverse">
        <CalendarPicker date={date} setDate={setDate} />
      </div>
      <DataTable columns={logsColumns} data={logs} />
    </div>
  );
}
