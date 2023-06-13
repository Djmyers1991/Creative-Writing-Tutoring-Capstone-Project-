import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const MessageFormTutor = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [message, update] = useState({
        userId: 0,
        tutorMessage: "",
        studentId: 0

    })

    const [studentArray, changeStudentState] = useState([])


    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const localWritingUser = localStorage.getItem("writing_user")
    const writingUserObject = JSON.parse(localWritingUser)

    const navigate = useNavigate()
    useEffect(() => {
        fetch(`http://localhost:8088/users?isStaff=false`)
            .then(response => response.json())
            .then((tutorObjects) => {
                changeStudentState(tutorObjects)
            })
    }, [])

  
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const messageToSendToAPI = {
            userId: writingUserObject.id,
            tutorMessage: message.tutorMessage,
            studentId: message.studentId

        }
        fetch(`http://localhost:8088/tutorMessages`, {
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
            <h2 className="messageForm__title">Annoying Students Who Won't Leave Us Alone</h2>
              
            <fieldset>
                <div className="form-group">
                    <select value={message.studentName} onChange={(evt) => {
                        const copy = { ...message }
                        copy.studentId = parseInt(evt.target.value)
                        update(copy)
                    }}>
                        <option value="0">List of the Helpless</option>
                        {
                            studentArray.map(studentObject => <option key={`studentObject--${studentObject.id}`} value={studentObject.id}>{studentObject.name}</option>)
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
                        placeholder="Try your best not to be condescending"
                        value={message.tutorMessage}
                        onChange={(evt) => {
                            const copy = { ...message }
                            copy.tutorMessage = evt.target.value
                            update(copy)


                        }} />
                </div>
            </fieldset> 
            <button
                onClick={
                    (clickEvent) => { handleSaveButtonClick(clickEvent) }
                }
                className="btn btn-primary">
                Empty Send!
            </button>
        </form>
    )
}
