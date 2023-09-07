import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const BookListForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object''update initial state
    */
    const [list, update] = useState({
        userId: 0,
        title: "",
        author: "",
        image: "",
        rating: 5


    })


    const localWritingUser = localStorage.getItem("writing_user")
    const writingUserObject = JSON.parse(localWritingUser)

    const navigate = useNavigate()


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const listToSendToAPI = {
            userId: writingUserObject.id,
            title: list.title,
            author: list.author,
            image: list.image,
            rating: list.rating,
            favoriteLine: list.favoriteLine

        }
        fetch(`http://localhost:8088/bookList`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(listToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/list")

            })

    }

    return (
        <form className="submissionForm">
            <h2 className="submissionForm__title">The Book List Selection of {writingUserObject.name} </h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                    required
                    autoFocus
                    type="text"
                    className="form-control"    
                    placeholder="Title"
                    value={list.title}            
                    onChange={(evt) => {
                        const copy = { ...list };
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
                                value={list.author}
                                onChange={(evt) => {
                                    const copy = { ...list };
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
                                placeholder="If you want to an aesthetically pleasing booklist."
                                value={list.image}
                                onChange={(evt) => {
                                    const copy = { ...list };
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
                                value={list.rating}
                                onChange={(evt) => {
                                    const copy = { ...list };
                                    copy.rating = evt.target.value;
                                    update(copy);
                                }}
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Inspirational Sentence</label>
                    <input
                    required
                    autoFocus
                    type="text"
                    className="form-control"    
                    placeholder="Title"
                    value={list.favoriteLine}            
                    onChange={(evt) => {
                        const copy = { ...list };
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
Add to your Book List                    </button>
                </form>
                )
      
};
