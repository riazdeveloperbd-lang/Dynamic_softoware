import React from "react";
import BookDetailVarient1, { BookDetailVarient1Props } from "../varient_1";

export const BookDetailVarient4: React.FC<BookDetailVarient1Props> = (props) => (
  <BookDetailVarient1 {...props} variant="varient_4" />
);

export default BookDetailVarient4;
