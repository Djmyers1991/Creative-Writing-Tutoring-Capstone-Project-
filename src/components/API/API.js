import React, { useEffect, useState } from "react";
export const API = () => {
  const [author, setAuthor] = useState("");
  const [authorBooks, setAuthorBooks] = useState([]);
  const fetchAuthor = () => {
    const apiUrl = `https://openlibrary.org/search.json?author=${encodeURIComponent(author)}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const books = data.docs.map(doc => doc.title);
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
        <ul>
          {authorBooks.map((book, index) => (
            <li key={index}>{book}</li>
          ))}
        </ul>
      ) : (
        <p>No books found for the author.</p>
      )}
    </div>
  );
};


// const handleSaveButtonClick = (event) => {
//   event.preventDefault()

//   const bookListToSendToAPI = {
//       userId: writingUserObject.id,
//       bookTitle: bookList.bookTitle,

//   }
//   fetch(`http://localhost:8088/bookList`, {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json"
//       },
//       body: JSON.stringify(messageToSendToAPI)
//   })
//       .then(response => response.json())
//       .then(() => {
//           navigate("/bookList")

//       })

// }