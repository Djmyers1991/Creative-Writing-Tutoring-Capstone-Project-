import {useEffect, useState} from "react"

export const completedSubmissionForm = () => {

  
    const [completedSubmissionForm, updateForm] = useState({
        userId: 0,
        paymentReceived: true,
        packageId: 0,
        linkWithEdits: "",
        specificFeedback: "",
        tutorId: 0,
        dateCompleted: null,
        paymentReceived: true,
        submissionId: 0,
        isFinished: false
    })
   
    const {submissionId} = useParams()
    const navigate = useNavigagte()

useEffect(() => {
fetch(`http://localhost:8088/submissions?${submissionId}`)
.then(response => response.json())
.then((data) => {
    updateForm(data)
})

},

[submissionId])

const handleSaveButtonClick = (event) => {
    event.preventDefault()

    return fetch(`http://localhost:8088/submissions?${submissionId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedSubmissionForm)
    })
        .then(response => response.json())
        .then(() => {
            navigate("/tickets")
        })
}





}


<fieldset>
<div className="form-group">
    <label htmlFor="description">Identification:</label>
    <textarea
        required autoFocus
        type="text"
        className="form-control"
        value={completedSubmissionForm.id}
        onChange={
            (evt) => {
                const copy = { ...completedSubmissionForm }
                copy.description = evt.target.value
                updateForm(copy)
            }
        }>{completedSubmissionForm.id}</textarea>
</div>
</fieldset>