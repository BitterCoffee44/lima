export type bookNewUpdateSchema = {
  id: string;
  bookTitle: string;
  bookAuthor: string;
  bookGenre: string;
  bookPublicationDate: number;
  bookSummary: string;
  bookShelfCode: string;
  oldBookShelfCode: string;
  bookUHFTag: string;
  oldBookUHFTag: string;
  bookStatus: "Borrowed" | "Available";
};
export type bookUpdateSchema = {
  id: string;
  bookTitle: string;
  bookAuthor: string;
  bookGenre: string;
  bookPublicationDate: number;
  bookSummary: string;
  bookShelfCode: string;
  bookUHFTag: string;
  bookStatus: "Borrowed" | "Available";
};

export type Book = {
  id: string;
  bookTitle: string;
  bookAuthor: string;
  bookGenre: string;
  bookPublicationDate: number;
  bookSummary: string;
  bookShelfCode: string;
  bookUHFTag: string;
  bookStatus: "Borrowed" | "Available";
};

export type registerNewBookSchema = {
  bookTitle: string;
  bookAuthor: string;
  bookGenre: string;
  bookSummary: string;
  bookShelfCode: string;
  bookUHFTag: string;
  bookPublicationDate: number;
  bookStatus: string;
};

////////////Student Schema
export type studentSchema = {
  id: string;
  studentStatus: string;
  studentName: string;
  studentYearLevel: string;
  studentCourse: string;
  booksBorrowed: object[];
  studentRFIDTag: string;
};

export type studentForm = {
  studentName: string;
  studentYearLevel: string;
  studentCourse: string;
  studentRFIDTag: string;
  studentStatus: string;
};

export type updateStudentSchema = {
  id: string;
  studentName: string;
  studentYearLevel: string;
  studentCourse: string;
  studentStatus: string;
  studentRFIDTag: string;
  oldStudentRFIDTag: string;
};

////// create new admin
export type adminSchema = {
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  adminContactNumber: string;
};

export type adminRTDBSchema = {
  uid: string;
  adminName: string;
  adminEmail: string;
  adminContactNumber: string;
  createdAt: string;
};

////logs for student entering inside
export type logsRTDBSchema = {
  uid: string;
  userName: string;
  timeIn: string;
  timeOut: string;
  date: string;
};

//borrowed logs for books
export type borrowedLogs = {
  uid: string;
  borrowedBookTitle: string;
  borrowedBookId: string;
  borrowedUser: string;
  borrowedDate: string;
  borrowedTime: string;
  borrowedStatus: "Borrowed" | "Returned";
};
