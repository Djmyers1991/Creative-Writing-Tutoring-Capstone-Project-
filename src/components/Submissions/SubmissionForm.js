import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const SubmissionForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object''update initial state
    */
    const [submission, update] = useState({
        userId: 0,
        packageId: 0,
        googleDocument: "",
        specificFeedback: "",
        tutorId: 0,
        isRead: false


    })

    const [tutorArray, changeTutorState] = useState([])
    const [packageArray, changePackageState] = useState([])

   
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const localWritingUser = localStorage.getItem("writing_user")
    const writingUserObject = JSON.parse(localWritingUser)

    const navigate = useNavigate()
    useEffect(() => {
        fetch(`http://localhost:8088/tutorInformation?_expand=user&isStaff=true`)
            .then(response => response.json())
            .then((tutorObjects) => {
                changeTutorState(tutorObjects)
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8088/packages`)
            .then(response => response.json())
            .then((packageTypes) => {
                changePackageState(packageTypes)
            })
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const submissionToSendToAPI = {
            userId: writingUserObject.id,
            packageId: submission.packageId,
            googleDocument: submission.googleDocument,
            specificFeedback: submission.specificFeedback,
            isRead: false,
            tutorId: submission.tutorId

        }
        fetch(`http://localhost:8088/submissions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(submissionToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/submissions")

            })

    }

    return (
        <form className="submissionForm">
          <h2 className="submissionForm__title">Creative Writing Submission Form</h2>
      
          <fieldset>
            <div className="form-group">
              <select
                value={submission.tutorName}
                onChange={(evt) => {
                  const copy = { ...submission };
                  copy.tutorId = parseInt(evt.target.value);
                  update(copy);
                }}
                className="form-control"
              >
                <option value="0">List of Tutors</option>
                {tutorArray.map((tutorObject) => (
                  <option
                    key={`tutorObject--${tutorObject?.user?.id}`}
                    value={tutorObject?.user?.id}
                  >
                    {tutorObject?.user?.name}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
      
          <fieldset>
            <div className="form-group">
              <select
                value={submission.packageId}
                onChange={(evt) => {
                  const copy = { ...submission };
                  copy.packageId = parseInt(evt.target.value);
                  update(copy);
                }}
                className="form-control"
              >
                <option value="0">Select Your Package</option>
                {packageArray.map((packageType) => (
                  <option
                    key={`packageType--${packageType.id}`}
                    value={packageType.id}
                  >
                    {packageType.name} Price:{" "}
                    {packageType.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
      
          <fieldset>
            <div className="form-group">
              <label htmlFor="description">Submission:</label>
              <input
                required
                autoFocus
                type="text"
                className="form-control"
                placeholder="Please paste a link to your Google Doc"
                value={submission.description}
                onChange={(evt) => {
                  const copy = { ...submission };
                  copy.googleDocument = evt.target.value;
                  update(copy);
                }}
              />
            </div>
          </fieldset>
      
          <fieldset>
            <div className="form-group">
              <label htmlFor="specificFeedback">Request for Specific Feedback:</label>
              <textarea
                required
                className="form-control"
                placeholder="Please tell me specific problem areas in your writing."
                value={submission.specificFeedback}
                onChange={(evt) => {
                  const copy = { ...submission };
                  copy.specificFeedback = evt.target.value;
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
            Submit Your Brilliance!
          </button>
        </form>
      );
      
}
