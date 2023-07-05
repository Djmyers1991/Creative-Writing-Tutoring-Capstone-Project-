import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const BookList = () => {
    const [books, fetchBooks] = useState([])
    const [filterBooks, setFilter] = useState([])
    
    const localWritingUser = localStorage.getItem("writing_user");
    const writingUserObject = JSON.parse(localWritingUser);
  
const navigate = useNavigate()

    const getAllBooks = () => {
        fetch(`http://localhost:8088/bookList`)
            .then((response) => response.json())
            .then((bookArray) => {
                fetchBooks(bookArray);
            });
    };


    useEffect(() => {
        getAllBooks()

    },
        []
    )


   
 
      useEffect(() => {
        const correctBookList = books.filter(
            (book) => 
           book.userId === writingUserObject.id
           );
          setFilter(correctBookList);

      }, [books]);
          

      const deleteButton = (book) => {
        return (
            <button
              onClick={() => {
                fetch(`http://localhost:8088/bookList/${book.id}`, {
                  method: "DELETE"
                })
                  .then(() => {
                    getAllBooks()
                  });
              }}
              className="submission__delete"
            >
              Delete
            </button>
          
       
        )}
    return (
        <>
          <article className="bookList">
            <h2>The Book List of {writingUserObject.name}</h2>
            <button onClick={ () => navigate("/bookListForm")} className="add-to-booklist"><span> Add to Booklist</span></button>
            <button onClick={ () => navigate("/API")} className="add-to-booklist"><span> Find New Book!</span></button>


            {filterBooks.map((book) => (
              <section className="book" key={book.id}>
                <div className="book-card">
                  <div className="book-image">
                    <img src={book.image} alt="Book Cover" className="book-cover" />
                  </div>
                  <div className="book-content">
                    <h2><Link to={`/bookList/${book.id}/edit`}> {book.title} </Link></h2>
                    {
            deleteButton(book)}
                    <h3>{book.author}</h3>
                    <h4>Rating: {book.rating} <br />
                    Inspirational Line: <br />{book.favoriteLine}</h4>

                  </div>
                </div>
              </section>
            ))}
          
          </article>
        </>
      );
            }      