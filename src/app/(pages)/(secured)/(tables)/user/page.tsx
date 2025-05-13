"use client";
// STUDENT TABLE

import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { studentColumnDef } from "./columns";
import { useListVals } from "react-firebase-hooks/database";
import { getDatabase, ref } from "firebase/database";
import firebaseApp from "../../../../../../firebase/clientApp";
import { Loader2 } from "lucide-react";

const database = getDatabase(firebaseApp);

export default function Page() {
  const [data, isLoading, error] = useListVals(ref(database, "students"));

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const uniqueArray = Array.from(
      new Set(data?.map((o) => JSON.stringify(o)))
    ).map((str) => JSON.parse(str));
    setUsers(uniqueArray);
  }, [data]);

  if (isLoading)
    return (
      <div className="w-full p-10">
        <div className="flex justify-center flex-row">
          <Loader2 className="animate-spin" />
          <div>Loading Users....</div>
        </div>
      </div>
    );

  if (error) {
    return (
      <div className="w-full p-10">
        <div>{`${error}`}</div>
      </div>
    );
  }
  return (
    <div className="w-full p-10">
      <DataTable columns={studentColumnDef} data={users} />
    </div>
  );
}
