import React from "react";
import AddEmployeeForm from "./AddEmployeeForm";
import initFirebaseAdmin from "../../../../../../firebase/adminApp";

export default async function page() {
  await initFirebaseAdmin();

  return (
    <div>
      <AddEmployeeForm />
    </div>
  );
}
