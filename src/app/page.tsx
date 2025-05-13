"use client";
import DisplayUserPopulation from "@/components/DisplayUserPopulation";
import { DataTable } from "@/components/table/data-table";
import TimeDisplay from "@/components/TimeDisplay";
import { bookColumns } from "./(pages)/(secured)/(tables)/books/columns";
import firebaseApp from "../../firebase/clientApp";
import { getDatabase, ref } from "firebase/database";
import { Loader2 } from "lucide-react";
import { useListVals } from "react-firebase-hooks/database";

const database = getDatabase(firebaseApp);
export default function Home() {
  const [data, isLoading, error] = useListVals(ref(database, "books"));

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
          <div>Loading Books....</div>
        </div>
      </div>
    );

  return (
    <>
      <div className="w-full px-10 py-10">
        <div className="flex justify-center ">
          <div className="w-full flex flex-row   gap-2">
            <DisplayUserPopulation />
            <TimeDisplay />
          </div>
        </div>
        <DataTable columns={bookColumns} data={data} />
      </div>
    </>
  );
}
