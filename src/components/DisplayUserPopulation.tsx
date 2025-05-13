"use client";

import { getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import firebaseApp from "../../firebase/clientApp";
import { logsRTDBSchema } from "@/lib/types";
import { useListVals } from "react-firebase-hooks/database";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Loader2 } from "lucide-react";

const date = new Date();
const currentDate = `logs/${
  date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
}-${
  date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
}-${date.getFullYear()}`;

export default function DisplayUserPopulation() {
  const [population, setPopulation] = useState<number>(0);
  const [values, loading] = useListVals<logsRTDBSchema>(
    ref(getDatabase(firebaseApp), currentDate)
  );

  useEffect(() => {
    const currentStudent = values?.map((user) => {
      return !user.timeOut;
    });
    setPopulation(currentStudent?.length || 0);
  }, [values]);

  return (
    <div className="w-full text-center">
      <Card className="bg-cyan-100 ">
        <CardHeader>
          <CardTitle>Students Inside:</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            {loading ? (
              <span>
                <Loader2 className="animate-spin" />
              </span>
            ) : (
              population
            )}
          </p>
          <div className="text-lg ">Students</div>
        </CardContent>
      </Card>
    </div>
  );
}
