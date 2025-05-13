import React from "react";
import UpdateStudentForm from "./UpdateStudentForm";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <div>
      <UpdateStudentForm id={id} />
    </div>
  );
}
