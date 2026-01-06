import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/books";

export default function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    publishedYear: "",
    availableCopies: ""
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const addBook = async () => {
    try {
      await axios.post(API, {
        ...book,
        publishedYear: Number(book.publishedYear),
        availableCopies: Number(book.availableCopies)
      });
      alert("Book added");
      window.location.reload();
    } catch {
      alert("Invalid data");
    }
  };

  return (
    <div className="add-form">
      <h3>Add Book</h3>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="author" placeholder="Author" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <input name="publishedYear" placeholder="Year" onChange={handleChange} />
      <input name="availableCopies" placeholder="Copies" onChange={handleChange} />
      <button onClick={addBook}>Add Book</button>
    </div>
  );
}
