"use server";

import { adminSchema } from "@/lib/types";

import { auth } from "firebase-admin";
import {
  addNewAdmin,
  deleteAdminFromRTDB,
  verifyNoSameEmailOrPhoneNumber,
} from "../rtdb/employeeRTDB";
import initFirebaseAdmin from "../adminApp";

export async function createNewAdmin(data: adminSchema) {
  const admin = auth();

  const response = await verifyNoSameEmailOrPhoneNumber(
    data.adminEmail,
    data.adminContactNumber
  );

  if (response.status) {
    admin
      .createUser({
        email: data.adminEmail,
        emailVerified: true,
        phoneNumber: data.adminContactNumber,
        password: data.adminPassword,
        displayName: data.adminName,
      })
      .then(async (adminRecord) => {
        const date = new Date();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();

        const response = await addNewAdmin({
          uid: adminRecord.uid,
          adminName: adminRecord.displayName,
          adminContactNumber: adminRecord.phoneNumber,
          adminEmail: adminRecord.email,
          createdAt: `${month <= 9 ? "0" + month : month}/${
            day <= 9 ? "0" + day : day
          }/${year}`,
        });
      })
      .catch((error) => {});
    return { status: true, message: "Admin had been added." };
  } else {
    return {
      status: response?.status,
      message: response?.message,
    };
  }
}

export async function deleteAdmin(uid: string, adminName: string) {
  initFirebaseAdmin();
  const admin = auth();
  admin
    .deleteUser(uid)
    .then(async () => {
      console.log("Successfully deleted user");
      await deleteAdminFromRTDB(uid);
      return { status: true, message: `Successfully deleted ${adminName}.` };
    })
    .catch((error) => {
      console.log("Error deleting user:", error);
      return {
        status: false,
        message: `Failed to delete ${adminName}. Please try again.`,
      };
    });

  return { status: false, message: "" };
}
