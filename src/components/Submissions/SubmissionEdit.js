import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"





export const SubmissionEdit = () => {

    const localWritingUser = localStorage.getItem("writing_user")
const writingUserObject = JSON.parse(localWritingUser)
    const [submission, assignSubmission] = useState({
        googleDocument: "",
        specificFeedback: "",
        isRead: false

    })
    const { submissionId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/submissions/${submissionId}`)
            .then(response => response.json())
            .then((data) => {
                assignSubmission(data)
            })
    }, [submissionId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/submissions/${submission.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(submission)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/submissions")
            })
    }






    return <form className="submissionForm">
        <h2 className="submissionForm__title">Submission</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Google Document:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={submission.googleDocument}
                    onChange={
                        (evt) => {
                            const copy = { ...submission }
                            copy.googleDocument = evt.target.value
                            assignSubmission(copy)
                        }
                    }>{submission.googleDocument}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Specific Feedback:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={submission.specificFeedback}
                    onChange={
                        (evt) => {
                            const copy = { ...submission }
                            copy.specificFeedback = evt.target.value
                            assignSubmission(copy)
                        }
                    }>{submission.specificFeedback}</textarea>
            </div>
        </fieldset>




        <fieldset>
            <div className="form-group">
                {writingUserObject.staff === true ? (
                    <>
                        <label htmlFor="name">Read:</label>
                        <input
                            type="checkbox"
                            checked={submission.isRead}
                            onChange={(evt) => {
                                const copy = { ...submission };
                                copy.isRead = evt.target.checked;
                                assignSubmission(copy);
                            }}
                        />
                    </>
                ) : 
                    " "
                }
            </div>
        </fieldset>



        {
        
        submission.isRead === false || writingUserObject.staff ? (
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary"
            >
                Save Edits
            </button>
        ) : ""
        }

    </form>

}


