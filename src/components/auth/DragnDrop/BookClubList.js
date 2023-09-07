import { useEffect, useState } from "react";
import "./dragndrop.css";
import { DragnDrop } from "./DragnDrop";

export const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8088/bookList")
      .then((response) => response.json())
      .then((bookArray) => {
        setBooks(bookArray);
      });
  }, []);

  const data = [
    // { title: "Started", items: books.map((book) => book.title).join(",") },
    {title: "Started", items : ["Jurassic Park by Michael Crichton", "Yayay"]},
    { title: "In Progress", items: [] },
    { title: "Finished", items: [] }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <DragnDrop data={data} />
      </header>
    </div>
  );
}









