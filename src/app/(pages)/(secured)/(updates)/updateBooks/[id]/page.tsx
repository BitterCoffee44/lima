import React from "react";

import UpdateBookForm from "./UpdateBookForm";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  console.log(id);
  return (
    <div>
      <UpdateBookForm id={id} />
    </div>
  );
}
