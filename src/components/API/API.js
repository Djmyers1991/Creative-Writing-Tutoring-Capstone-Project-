import React, { useEffect, useState } from "react";

export const API = () => {
  const [author, setAuthor] = useState("");
  const [authorBooks, setAuthorBooks] = useState([]);

  const fetchAuthor = () => {
    const apiUrl = `https://openlibrary.org/search.json?author=${encodeURIComponent(author)}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const books = data.docs.map(doc => ({
          title: doc.title,
          firstLine: doc.first_sentence,
        }));
        setAuthorBooks(books);
      })
      .catch(error => {
        console.error("Error fetching author data:", error);
      });
  };

  useEffect(() => {
    if (author !== "") {
      fetchAuthor();
    }
  }, [author]);

  return (
    <div>
      <input
        type="text"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        placeholder="Enter author name"
      />
      {authorBooks.length > 0 ? (
        <article>
          {authorBooks.map((book, index) => (
            <div key={index}>
              <h3>{book.title}</h3>
              <p>{book.firstLine}</p>
            </div>
          ))}
        </article>
      ) : (
        <p>No books found for the author.</p>
      )}
    </div>
  );
};
