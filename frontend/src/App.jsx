import AddBook from "./components/AddBook";
import BookList from "./components/BookList";
import "./App.css";

export default function App() {
  return (
    <div className="container">
      <h1>Library Book Management</h1>
      <AddBook />
      <BookList />
    </div>
  );
}

