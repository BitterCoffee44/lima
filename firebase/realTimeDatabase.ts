import { bookNewUpdateSchema, registerNewBookSchema } from "@/lib/types";
import {
  child,
  get,
  getDatabase,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import firebaseApp from "./clientApp";

export async function addNewBook(data: registerNewBookSchema) {
  const db = getDatabase(firebaseApp);
  // generate id for the book
  const generateId = data.bookUHFTag;

  //check whether rfid already exists or not
  const snapshot = await get(
    child(ref(db), `shelfCode/${data.bookShelfCode}/${data.bookUHFTag}`)
  );

  if (snapshot?.val()?.bookTitle != undefined) {
    return {
      status: false,
      message: "UHF Tag already Exists. Please change it.",
    };
  }

  set(ref(db, "books/" + generateId), {
    id: generateId,
    bookTitle: data.bookTitle,
    bookAuthor: data.bookAuthor,
    bookGenre: data.bookGenre,
    bookPublicationDate: data.bookPublicationDate,
    bookSummary: data.bookSummary,
    bookShelfCode: data.bookShelfCode,
    bookUHFTag: data.bookUHFTag,
    bookStatus: data.bookStatus,
  })
    .then(async () => {
      const response = await addBookToShelfCode(
        data.bookShelfCode,
        data.bookTitle,
        data.bookUHFTag,
        "Available",
        generateId
      );
      if (response.status) {
        return { status: true, message: "Book had been added." };
      }
    })
    .catch((error) => {
      return { status: false, message: error };
    });
  return { status: true, message: "Book had been added." };
}

async function addBookToShelfCode(
  shelfCode: string,
  bookTitle: string,
  uhfTag: string,
  bookStatus: string,
  id: string
) {
  const db = getDatabase(firebaseApp);
  set(ref(db, "shelfCode/" + shelfCode + "/" + uhfTag), {
    id: id,
    bookUHFtag: uhfTag,
    bookStatus: bookStatus,
    bookTitle: bookTitle,
  }).then(() => {
    return { status: true };
  });

  return { status: true };
}

async function removeBookFromShelfCode(shelfCode: string, uhfTag: string) {
  const db = getDatabase(firebaseApp);
  const dbRef = ref(db, `shelfCode/${shelfCode}/${uhfTag}`);
  remove(dbRef)
    .then(() => {
      return { status: true, message: "Book deleted successfully." };
    })
    .catch((e) => {
      return { status: false, message: e };
    });
}

export async function updateBook(data: bookNewUpdateSchema) {
  const { id, oldBookUHFTag, bookUHFTag, bookShelfCode, oldBookShelfCode } =
    data;
  const db = getDatabase(firebaseApp);

  if (oldBookShelfCode != bookShelfCode || oldBookUHFTag != bookUHFTag) {
    // check if the new uhf tag is available
    const snapshot = await get(
      child(ref(db), `shelfCode/${data.bookShelfCode}/${data.bookUHFTag}`)
    );

    if (
      snapshot?.val()?.bookTitle != undefined &&
      snapshot?.val()?.bookUHFTag != bookUHFTag
    ) {
      return {
        status: false,
        message: "RFID Tag already Exists. Please change it.",
      };
    }

    await deleteBook(id, oldBookShelfCode, oldBookUHFTag);
    addNewBook({
      bookTitle: data.bookTitle,
      bookAuthor: data.bookAuthor,
      bookGenre: data.bookGenre,
      bookSummary: data.bookSummary,
      bookShelfCode: data.bookShelfCode,
      bookUHFTag: data.bookUHFTag,
      bookPublicationDate: data.bookPublicationDate,
      bookStatus: data.bookStatus,
    });

    return {
      status: true,
      message: "Book has been updated",
    };
  }
  const dbRef = ref(db, `books/${id}`);
  update(dbRef, {
    bookAuthor: data.bookAuthor,
    bookGenre: data.bookGenre,
    bookPublicationDate: data.bookPublicationDate,
    bookShelfCode: data.bookShelfCode,
    bookStatus: data.bookStatus,
    bookSummary: data.bookSummary,
    bookTitle: data.bookTitle,
    id: data.id,
  })
    .then(() => {
      return { status: true, message: "Book had been updated" };
    })
    .catch((e) => {
      return { status: false, message: e };
    });

  return { status: true, message: "None" };
}

export async function deleteBookFromList(bookId: string) {
  const db = getDatabase(firebaseApp);
  const dbRef = ref(db, `books/${bookId}`);
  remove(dbRef)
    .then(() => {
      return { status: true, message: "Book deleted successfully." };
    })
    .catch((e) => {
      return { status: false, message: e };
    });
}

export async function deleteBook(
  bookId: string,
  shelfCode: string,
  uhfTag: string
) {
  const db = getDatabase(firebaseApp);
  const dbRef = ref(db, `books/${bookId}`);
  await removeBookFromShelfCode(shelfCode, uhfTag);
  remove(dbRef)
    .then(() => {
      return { status: true, message: "Book deleted successfully." };
    })
    .catch((e) => {
      return { status: false, message: e };
    });
}

export async function getBook(bookId: string) {
  const db = getDatabase(firebaseApp);
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `books/${bookId}`));
  const book = {
    bookTitle: snapshot?.val()?.bookTitle,
    bookAuthor: snapshot?.val()?.bookAuthor,
    bookGenre: snapshot?.val()?.bookGenre,
    bookSummary: snapshot?.val()?.bookSummary,
    bookShelfCode: snapshot?.val()?.bookShelfCode,
    bookUHFTag: snapshot?.val()?.bookUHFTag,
    bookPublicationDate: snapshot?.val()?.bookPublicationDate,
  };
  console.log(book);
  return book;
}
