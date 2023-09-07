import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const MessageFormStudent = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [message, update] = useState({
        userId: 0,
        studentMessage: "",
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

        const messageToSendToAPI = {
            userId: writingUserObject.id,
            studentMessage: message.studentMessage,
            tutorId: message.tutorId

        }
        fetch(`http://localhost:8088/studentMessages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/messages")

            })

    }

    return (
        <form className="messageForm">
            <h2 className="messageForm__title">Message Instructor for Questions</h2>
              
            <fieldset>
                <div className="form-group">
                    <select value={message.tutorName} onChange={(evt) => {
                        const copy = { ...message }
                        copy.tutorId = parseInt(evt.target.value)
                        update(copy)
                    }}>
                        <option value="0">List of Tutors</option>
                        {
                            tutorArray.map(tutorObject => <option key={`tutorObject--${tutorObject.id}`} value={tutorObject.id}>{tutorObject.name}</option>)
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Message:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Type your message"
                        value={message.studentMessage}
                        onChange={(evt) => {
                            const copy = { ...message }
                            copy.studentMessage = evt.target.value
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
};
