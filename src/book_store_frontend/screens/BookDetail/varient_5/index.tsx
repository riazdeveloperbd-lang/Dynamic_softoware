import React from "react";
import BookDetailVarient1, { BookDetailVarient1Props } from "../varient_1";

export const BookDetailVarient5: React.FC<BookDetailVarient1Props> = (props) => (
  <BookDetailVarient1 {...props} variant="varient_5" />
);

export default BookDetailVarient5;
