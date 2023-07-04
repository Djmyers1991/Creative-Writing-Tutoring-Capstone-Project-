import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const CompletedSubmissionForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */

    const localWritingUser = localStorage.getItem("writing_user");
    const writingUserObject = JSON.parse(localWritingUser);

    const [completedSubmission, update] = useState({
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

    const [tutorArray, changeTutorState] = useState([])
    const [packageArray, changePackageState] = useState([])
    const [studentArray, changeStudentState] = useState([])
    const [submissions, findRightSubmission] = useState([])
    const [filteredSubmission, findRightFilteredSubmission] = useState([])

    //I need to get all of the submissions. 
    //I need to filter through them so that only the submissions appear
    //if the tutor id matches the writing object id
    //that way, only the right submissions will appear in the drop down.

    //I need to create a dropdown the dropd and I need to f
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */



    const navigate = useNavigate()
    useEffect(() => {
        fetch(`http://localhost:8088/users?isStaff=true`)
            .then(response => response.json())
            .then((tutorObjects) => {
                changeTutorState(tutorObjects)
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8088/submissions`)
            .then(response => response.json())
            .then((submissionArray) => {
                findRightSubmission(submissionArray)
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8088/users?isStaff=false`)
            .then(response => response.json())
            .then((studentObjects) => {
                changeStudentState(studentObjects)
            })
    }, [])


    useEffect(() => {
        fetch(`http://localhost:8088/packages`)
            .then(response => response.json())
            .then((packageTypes) => {
                changePackageState(packageTypes)
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:8088/submissions")
            .then((response) => response.json())
            .then((filteredSubmissionArray) => {
                const correctSubmissions = filteredSubmissionArray.filter(
                    (submission) =>
                        submission.tutorId === writingUserObject.id
                );
                findRightFilteredSubmission(correctSubmissions);
            })

    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const submissionToSendToAPI = {
            userId: completedSubmission.userId,
            paymentReceived: true,
            packageId: completedSubmission.packageId,
            linkWithEdits: completedSubmission.linkWithEdits,
            specificFeedback: completedSubmission.specificFeedback,
            tutorId: completedSubmission.tutorId,
            dateCompleted: completedSubmission.dateCompleted,
            submissionId: completedSubmission.submissionId,
            paymentReceived: true,
            isFinished: false
        }


        fetch(`http://localhost:8088/completedSubmissions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(submissionToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/completedSubmissions")

            })

    }

    return (
        <form className="submissionForm">
            <h2 className="submissionForm__title">Completed Creative Writing Submission Form</h2>

            <fieldset>
                <div className="form-group select">
                    <label className="label-bold" htmlFor="studentName">Student:</label>
                    <select value={completedSubmission.studentName} onChange={(evt) => {
                        const copy = { ...completedSubmission }
                        copy.userId = parseInt(evt.target.value)
                        update(copy)
                    }}>
                        <option value="0">Name</option>
                        {
                            studentArray.map(studentObject => <option key={`studentObject--${studentObject.id}`} value={studentObject.id}>{studentObject.name}</option>)
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group select">
                    <label htmlFor="submissionNumber">Submission Identification:</label>
                    <select value={completedSubmission.submissionId} onChange={(evt) => {
                        const copy = { ...completedSubmission }
                        copy.submissionId = parseInt(evt.target.value)

                    }}>
                        <option value="0">Id</option>
                        {
                            filteredSubmission.map(submissionObject => <option key={`submissionObject--${submissionObject.id}`} value={submissionObject.id}>{submissionObject.id}</option>)
                        }
                    </select>

                </div>
            </fieldset>
            <fieldset>
                <div className="form-group select">
                    <label className="label-bold" htmlFor="studentName">Reviewer:</label>                    <select value={completedSubmission.tutorName} onChange={(evt) => {
                        const copy = { ...completedSubmission }
                        copy.tutorId = parseInt(evt.target.value)
                        update(copy)
                    }}>
                        <option value="0"> Name</option>
                        {
                            tutorArray.map(tutorObject => <option key={`tutorObject--${tutorObject.id}`} value={tutorObject.id}>{tutorObject.name}</option>)
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group select">
                    <label className="label-bold" htmlFor="studentName">Package:</label>                    <select className="form-group select" value={completedSubmission.packageId} onChange={(evt) => {
                        const copy = { ...completedSubmission }
                        copy.packageId = parseInt(evt.target.value)
                        update(copy)
                    }}>
                        <option className="form-group" value="0">Genre</option>
                        {
                            packageArray.map(packageType => <option key={`packageType--${packageType.id}`} value={packageType.id}>{packageType.name} Price: {packageType.price.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })} </option>)
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="linkWithEdits">Edited Submission:</label>
                    <input
                        required
                        autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Link to your edits"
                        value={completedSubmission.linkWithEdits}
                        onChange={(evt) => {
                            const copy = { ...completedSubmission };
                            copy.linkWithEdits = evt.target.value;
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Specific Feedback:</label>
                    <textarea
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Try your best to be kind."
                        value={completedSubmission.specificFeedback}
                        onChange={(evt) => {
                            const copy = { ...completedSubmission }
                            copy.specificFeedback = evt.target.value
                            update(copy)


                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dateCompleted">Date Completed:</label>
                    <DatePicker
                        id="dateCompleted"
                        selected={completedSubmission.dateCompleted}
                        onChange={(date) => {
                            const copy = { ...completedSubmission };
                            copy.dateCompleted = date;
                            update(copy);
                        }}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select a date"
                    // Any additional props or configurations for DatePicker can be added here
                    />
                </div>
            </fieldset>
            <button
                onClick={
                    (clickEvent) => { handleSaveButtonClick(clickEvent) }
                }
                className="btn btn-primary">
                Submit!
            </button>
        </form>
    )
}