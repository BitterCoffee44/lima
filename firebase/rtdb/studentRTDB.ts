"use server";

import { studentForm, updateStudentSchema } from "@/lib/types";
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
import { v4 as uuidv4 } from "uuid";

export async function addNewStudent(data: studentForm) {
  const db = getDatabase(firebaseApp);
  const generateId = uuidv4();

  //check whether rfid already exists or not
  const snapshot = await get(child(ref(db), `rfidTags/${data.studentRFIDTag}`));

  if (snapshot?.val()?.studentName != undefined) {
    return {
      status: false,
      message: "RFID Tag already Exists. Please change it.",
    };
  }

  set(ref(db, "students/" + generateId), {
    id: generateId,
    studentName: data.studentName,
    studentStatus: data.studentStatus,
    studentYearLevel: data.studentYearLevel,
    studentCourse: data.studentCourse,
    studentRFIDTag: data.studentRFIDTag,
  })
    .then(async () => {
      const response = await addNewRFID(
        generateId,
        data.studentRFIDTag,
        data.studentName
      );

      if (response.status) {
        return { status: true };
      } else {
        return { status: false, message: response.message };
      }
    })
    .catch((e) => {
      return { status: false, message: e };
    });

  return { status: true, message: "" };
}

async function addNewRFID(id: string, rfid: string, name: string) {
  const db = getDatabase(firebaseApp);
  set(ref(db, "rfidTags/" + rfid), {
    id: id,
    studentRFIDTag: rfid,
    studentName: name,
  })
    .then(() => {
      return { status: true };
    })
    .catch((e) => {
      return { status: false, message: e };
    });
  return { status: true, message: "" };
}

async function deleteRFID(rfid: string) {
  const db = getDatabase(firebaseApp);
  const dbRef = ref(db, `rfidTags/${rfid}`);
  remove(dbRef)
    .then(() => {
      return { status: true, message: "tag deleted" };
    })
    .catch((e) => {
      return { status: false, message: e };
    });
}
export async function deleteStudent(id: string, rfid: string) {
  await deleteRFID(rfid);
  const db = getDatabase(firebaseApp);
  const dbRef = ref(db, `students/${id}`);
  remove(dbRef)
    .then(() => {
      return { status: true, message: "Student deleted" };
    })
    .catch((e) => {
      return { status: false, message: e };
    });
}

export async function getStudent(studentId: string) {
  const db = getDatabase(firebaseApp);
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `students/${studentId}`));
  const student = {
    id: snapshot?.val()?.id,
    studentName: snapshot?.val()?.studentName,
    studentYearLevel: snapshot?.val()?.studentYearLevel,
    studentCourse: snapshot?.val()?.studentCourse,
    studentRFIDTag: snapshot?.val()?.studentRFIDTag,
    studentStatus: snapshot?.val()?.studentStatus,
  };
  return student;
}

///update student schema
export async function updateStudent(data: updateStudentSchema) {
  const { id, oldStudentRFIDTag, studentRFIDTag } = data;
  const db = getDatabase(firebaseApp);

  //   console.log(`old RFID ${oldStudentRFIDTag}`);
  //   console.log(`new RFID ${studentRFIDTag}`);
  if (oldStudentRFIDTag != studentRFIDTag) {
    //check whether rfid already exists or not
    const snapshot = await get(
      child(ref(db), `rfidTags/${data.studentRFIDTag}`)
    );

    if (
      (snapshot?.val()?.studentName != undefined &&
        snapshot?.val()?.studentRFIDTag != oldStudentRFIDTag) ||
      (snapshot?.val()?.studentName != data.studentName &&
        snapshot?.val()?.studentRFIDTag != oldStudentRFIDTag)
    ) {
      return {
        status: false,
        message: "RFID Tag already Exists. Please change it.",
      };
    }

    await deleteRFID(oldStudentRFIDTag);
    await addNewRFID(id, studentRFIDTag, data.studentName);
  }

  const dbRef = ref(db, `students/${id}`);
  update(dbRef, {
    id: data.id,
    studentName: data.studentName,
    studentCourse: data.studentCourse,
    studentRFIDTag: data.studentRFIDTag,
    studentYearLevel: data.studentYearLevel,
    studentStatus: data.studentStatus,
  })
    .then(() => {
      return { status: true, message: "Student had been updated" };
    })
    .catch((e) => {
      return { status: false, message: e };
    });

  return { status: true, message: "None" };
}
