import React from "react";
import BookDetailVarient1, { BookDetailVarient1Props } from "../varient_1";

export const BookDetailVarient3: React.FC<BookDetailVarient1Props> = (props) => (
  <BookDetailVarient1 {...props} variant="varient_3" />
);

export default BookDetailVarient3;
