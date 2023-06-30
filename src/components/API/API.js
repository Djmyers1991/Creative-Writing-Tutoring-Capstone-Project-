import React, { useEffect, useState } from "react";
import "./API.css";

export const API = () => {
  const [author, setAuthor] = useState("");
  const [authorBooks, setAuthorBooks] = useState([]);
  const [debouncedAuthor, setDebouncedAuthor] = useState("");

  const fetchAuthorBooks = () => {
    const apiUrl = `https://openlibrary.org/search.json?author=${encodeURIComponent(
      `"${debouncedAuthor}"`
    )}`; //the quotes around author ensure that we get the exact match.
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const books = data.docs.map((doc) => ({
          title: doc.title,
          firstLine: doc.first_sentence,
          publicationYear: doc.first_publish_year,
          pageNumber: doc.number_of_pages_median,
          authorName: doc.author_name,
          coverId: doc.cover_i, // OLID of the book cover
        }));
        setAuthorBooks(books);
      })
      .catch((error) => {
        console.error("Error fetching author book data:", error);
      });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedAuthor(author);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [author]);

  useEffect(() => {
    if (debouncedAuthor !== "") {
      fetchAuthorBooks();
    } else {
      setAuthorBooks([]);
    }
  }, [debouncedAuthor]);

  const handleInputChange = (e) => {
    setAuthor(e.target.value);
    setAuthorBooks([]);
  };
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };
  const formatAuthors = (authors) => {
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

  const getBookCoverUrl = (coverId) => {
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
          <div className="book-card-container">
            {authorBooks.map((book, index) => (
              <div key={index} className="book-card">
                <div className="book-image">
                  {book.coverId && (
                    <img
                      className="book-cover"
                      src={getBookCoverUrl(book.coverId)}
                      alt="Book Cover"
                    />
                  )}
                </div>
                <div className="book-content">
                  <h2>Title: {book.title}</h2>
                  <h3>Author: {formatAuthors(book.authorName)}</h3>
                  <h4>Pages: {book.pageNumber}</h4>
                  <h4>Publication Date: {book.publicationYear}</h4>
                  {book.firstLine && (
                    <p className="first-line">
    First Line: {truncateText(book.firstLine, 100)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </article>
      ) : (
        <p>No books found for the author.</p>
      )}
    </div>
  );
};
