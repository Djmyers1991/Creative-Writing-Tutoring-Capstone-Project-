import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ReviewForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [review, update] = useState({
        userId: 0,
        message: "",
        tutorId: 0

    })

    const [tutorArray, changeTutorState] = useState([])


    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const localWritingUser = localStorage.getItem("writing_user")
    const writingUserObject = JSON.parse(localWritingUser)

    const navigate = useNavigate()
    useEffect(() => {
        fetch(`http://localhost:8088/users?isStaff=true`)
            .then(response => response.json())
            .then((tutorObjects) => {
                changeTutorState(tutorObjects)
            })
    }, [])

  
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const reviewToSendToAPI = {
            userId: writingUserObject.id,
            message: review.message,
            tutorId: review.tutorId

        }
        fetch(`http://localhost:8088/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/reviews")

            })

    }

    return (
        <form className="messageForm">
            <h2 className="messageForm__title">Reviews</h2>
              
            <fieldset>
                <div className="form-group">
                    <select value={review.tutorName} onChange={(evt) => {
                        const copy = { ...review }
                        copy.tutorId = parseInt(evt.target.value)
                        update(copy)
                    }}>
                        <option value="0">Choose your Tutor</option>
                        {
                            tutorArray.map(tutorObject => <option key={`tutorObject--${tutorObject.id}`} value={tutorObject.id}>{tutorObject.name}</option>)
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Review:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Type your review"
                        value={review.message}
                        onChange={(evt) => {
                            const copy = { ...review }
                            copy.message = evt.target.value
                            update(copy)


                        }} />
                </div>
            </fieldset> 
            <button
                onClick={
                    (clickEvent) => { handleSaveButtonClick(clickEvent) }
                }
                className="btn btn-primary">
                Full Send!
            </button>
        </form>
    )
}
