import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function TimeDisplay() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState(new Date().toDateString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    if (date != new Date().toDateString()) {
      setDate(new Date().toDateString());
    }

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className=" w-full text-center">
      <Card className=" bg-cyan-100 ">
        <CardHeader>
          <CardTitle>Time:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{time}</div>
          <div className="text-lg ">{date}</div>
        </CardContent>
      </Card>
    </div>
  );
}
