import React, { useEffect, useState } from "react";
import "./API.css"

export const API = () => {
  const [author, setAuthor] = useState("");
  const [authorBooks, setAuthorBooks] = useState([]);

  const fetchAuthorBooks = () => {
    const apiUrl = `https://openlibrary.org/search.json?author=${encodeURIComponent(
      `"${author}"`
    )}`;//the quotes around author ensure that we get the exact match. 
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const books = data.docs.map(doc => ({
          title: doc.title,
          firstLine: doc.first_sentence,
          publicationYear: doc.first_publish_year,
          pageNumber: doc.number_of_pages_median,
          authorName: doc.author_name,
          coverId: doc.cover_i // OLID of the book cover
        }));
        setAuthorBooks(books);
      })
      .catch(error => {
        console.error("Error fetching author book data:", error);
      });
  };

  useEffect(() => {
    if (author !== "") {
      fetchAuthorBooks();
    } else {
      setAuthorBooks([]);
    }
  }, [author]);

  const handleInputChange = e => {
    setAuthor(e.target.value);
    setAuthorBooks([]);
  };

  const formatAuthors = authors => {
    if (authors.length === 1) {
      return authors[0];
    } else if (authors.length === 2) {
      return authors.join(" and ");
    } else {
      const lastAuthor = authors[authors.length - 1];
      const otherAuthors = authors.slice(0, authors.length - 1);
      return `${otherAuthors.join(", ")}, and ${lastAuthor}`;
    }
  };

  const getBookCoverUrl = coverId => {
    if (coverId) {
      return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
    }
    return ""; // Return an empty string if coverId is not available
  };

  return (
    <div>
      <input
        type="text"
        value={author}
        onChange={handleInputChange}
        placeholder="Enter author name"
      />
      {authorBooks.length > 0 ? (
        <article>
          {authorBooks.map((book, index) => (
            <div key={index} >
              <div>{book.coverId && (
                <img 
                src={getBookCoverUrl(book.coverId)} alt="Book Cover" />
              )}</div>
              <h2>Title: {book.title}</h2>
              <h3>Author: {formatAuthors(book.authorName)}</h3>
              <h4>Pages: {book.pageNumber}</h4>
              <h4>Publication Date: {book.publicationYear}</h4>
              {book.firstLine && <p>First Line: {book.firstLine}</p>}
              
            </div>
          ))}
        </article>
      ) : (
        <p>No books found for the author.</p>
      )}
    </div>
  );
};
