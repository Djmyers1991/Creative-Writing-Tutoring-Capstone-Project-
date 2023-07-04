import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
   


export const EditBookList = () => {

    const [bookList, update] = useState({
      userId: 0,
      title: "",
      author: "",
      image: "",
      rating: 0,
      favoriteLine: ""
    })

    const navigate = useNavigate()

    const localWritingUser = localStorage.getItem("writing_user");
    const writingUserObject = JSON.parse(localWritingUser);

    const {bookListId} = useParams()
    
    useEffect(()=> {
        fetch(`http://localhost:8088/bookList/${bookListId}`)
        .then(response => response.json())
        .then((data) => {
            update(data)

        })
    }, [bookListId]
    )

    const handleSaveButtonClick = (event) => {
    event.preventDefault()

     return fetch (`http://localhost:8088/bookList/${bookList.id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"

        },
        body: JSON.stringify(bookList)
    })
    .then(response => response.json())
    .then(() => {

        navigate("/list")
    }
    )

}
return <>
<h2 className="submissionForm__title">The Book List Selection of {writingUserObject.name} </h2>
    <form className="bookListForm"> 
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Title"
            value={bookList.title}
            onChange={(evt) => {
              const copy = { ...bookList };
              copy.title = evt.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>
  
      <fieldset>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Author"
            value={bookList.author}
            onChange={(evt) => {
              const copy = { ...bookList };
              copy.author = evt.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>
  
      <fieldset>
        <div className="form-group">
          <label htmlFor="imageLink">Link to Image:</label>
          <textarea
            required
            className="form-control"
            placeholder="If you want an aesthetically pleasing booklist."
            value={bookList.image}
            onChange={(evt) => {
              const copy = { ...bookList };
              copy.image = evt.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>
  
      <fieldset>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <textarea
            required
            className="form-control"
            placeholder="Always on a scale of 1-10."
            value={bookList.rating}
            onChange={(evt) => {
              const copy = { ...bookList };
              copy.rating = evt.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>
  
      <fieldset>
        <div className="form-group">
          <label htmlFor="favoriteLine">Inspirational Sentence</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Favorite Line"
            value={bookList.favoriteLine}
            onChange={(evt) => {
              const copy = { ...bookList };
              copy.favoriteLine = evt.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>
  
      <button
        onClick={(clickEvent) => {
          handleSaveButtonClick(clickEvent);
        }}
        className="btn btn-primary"
      >
Save Edits     
 </button>
      </form>
  
  </>

}

