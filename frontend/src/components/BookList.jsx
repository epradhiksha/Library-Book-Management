import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://library-book-management-hzzz.onrender.com";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("");

  const fetchBooks = async () => {
    const res = await axios.get(API);
    setBooks(res.data);
  };

  const fetchByCategory = async () => {
    if (!category) {
      fetchBooks();
      return;
    }
    const res = await axios.get(`${API}/category/${category}`);
    setBooks(res.data);
  };

  const fetchAfter2015 = async () => {
    const res = await axios.get(`${API}/after2015`);
    setBooks(res.data);
  };

  const updateCopies = async (id, change) => {
    try {
      await axios.put(`${API}/copies/${id}`, { change });
      fetchBooks();
    } catch {
      alert("Invalid update / Negative stock");
    }
  };

  const updateCategory = async (id, newCategory) => {
    if (!newCategory) return;
    await axios.put(`${API}/category/${id}`, { category: newCategory });
    fetchBooks();
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchBooks();
    } catch {
      alert("Book can be deleted only if copies = 0");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <div className="filters">
        <input
          placeholder="Filter by category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={fetchByCategory}>Search</button>
        <button onClick={fetchAfter2015}>After 2015</button>
        <button onClick={fetchBooks}>All</button>
      </div>

      <div className="grid">
        {books.map((b) => (
          <div className="card" key={b._id}>
            <h3>{b.title}</h3>
            <p>{b.author}</p>
            <p>{b.category} • {b.publishedYear}</p>
            <p><b>Copies:</b> {b.availableCopies}</p>

            <div className="actions">
              <button onClick={() => updateCopies(b._id, 1)}>+</button>
              <button onClick={() => updateCopies(b._id, -1)}>-</button>
              <input
                placeholder="New Category"
                onBlur={(e) => updateCategory(b._id, e.target.value)}
              />
              <button className="delete" onClick={() => deleteBook(b._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
