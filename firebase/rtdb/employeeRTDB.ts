import {
  child,
  get,
  getDatabase,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import firebaseApp from "../clientApp";
import { adminRTDBSchema } from "@/lib/types";

export async function addNewAdmin(data: adminRTDBSchema) {
  const db = getDatabase(firebaseApp);

  set(ref(db, "admins/" + data.uid), {
    uid: data.uid,
    adminName: data.adminName,
    adminEmail: data.adminEmail,
    adminContactNumber: data.adminContactNumber,
    createdAt: data.createdAt,
  })
    .then(async () => {})
    .catch((e) => {
      return { status: false, message: e };
    });

  return { status: true, message: "" };
}

export async function deleteAdminFromRTDB(id: string) {
  const db = getDatabase(firebaseApp);
  const dbRef = ref(db, `admins/${id}`);
  remove(dbRef)
    .then(() => {
      return { status: true, message: "Admin Deleted" };
    })
    .catch((e) => {
      return { status: false, message: e };
    });
}

export async function verifyNoSameEmailOrPhoneNumber(
  email: string,
  phoneNumber: string
) {
  const db = getDatabase(firebaseApp);
  const dbRef = ref(db);

  const snapshot = await get(child(dbRef, `admins/`));
  const emailIdentical = snapshot.forEach((data) => {
    return email == data.val().adminEmail;
  });
  const phoneIdentical = snapshot.forEach((data) => {
    return phoneNumber == data.val().adminContactNumber;
  });

  if (emailIdentical) {
    return { status: false, message: "Email already exists." };
  }
  if (phoneIdentical) {
    return { status: false, message: "Contact Number already exists." };
  }

  return { status: true, message: "" };
}
