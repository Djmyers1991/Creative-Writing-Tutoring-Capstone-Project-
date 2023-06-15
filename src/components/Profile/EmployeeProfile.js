import { useEffect, useState } from "react"

export const EmployeeProfile = () => {
    // TODO: Provide initial state for profile
    const [profile, updateProfile] = useState(
        {
        userId: 0,
        imageLink: "",
        experience: "",
        favoriteBook: "",
        specialty: "",
        writingQuote: ""
        
    })

const localWritingUser = localStorage.getItem("writing_user")
const writingUserObject = JSON.parse(localWritingUser)
    
    // TODO: Get employee profile info from API and update state
useEffect(() => {
     fetch (`http://localhost:8088/tutorInformation?userId=${writingUserObject.id}`)
     .then(response => response.json())
     .then((data) => {
        const employeeObject = data[0]
        updateProfile(employeeObject)
     }
     )
},
[]
)

const [feedback, setFeedback] = useState("")

useEffect(() => {
    if (feedback !== "") {
        // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000);
    }
}, [feedback])



    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        return fetch(`http://localhost:8088/tutorInformation/${profile.id}`, {
        
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
        .then(response => response.json())
        .then(() => {
            setFeedback("Employee profile successfully saved")
        })
    
    }

    return (
        
        <form className="profile">
      
            <h2 className="profile__title">Update Profile</h2>
            <fieldset>
                <div className="form-group">
                <label htmlFor="literaryQuote">Image:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.imageLink}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.imageLink = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>

            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
    {feedback}
</div>
<fieldset>
                <div className="form-group">
                    <label htmlFor="experience">Years of Tutoring Experience:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.experience}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.experience = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.specialty}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.specialty = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="literaryQuote">Meaningful Literary Quote:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.writingQuote}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.writingQuote = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => {handleSaveButtonClick(clickEvent)}}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    )
} 