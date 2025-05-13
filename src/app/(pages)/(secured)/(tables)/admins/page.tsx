"use client";
import { getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useListVals } from "react-firebase-hooks/database";
import { Loader2 } from "lucide-react";
import { DataTable } from "./data-table";
import { adminColumns } from "./columns";
import firebaseApp from "../../../../../../firebase/clientApp";

const database = getDatabase(firebaseApp);

export default function Page() {
  const [data, isLoading, error] = useListVals(ref(database, "admins"));

  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const uniqueArray = Array.from(
      new Set(data?.map((o) => JSON.stringify(o)))
    ).map((str) => JSON.parse(str));
    setAdmins(uniqueArray);
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
          <div>Loading Admins....</div>
        </div>
      </div>
    );

  return (
    <div className="w-full px-10 py-10">
      <DataTable columns={adminColumns} data={admins} />
    </div>
  );
}
