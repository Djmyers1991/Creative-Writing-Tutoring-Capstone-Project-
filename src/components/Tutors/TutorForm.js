import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const TutorForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [tutor, update] = useState({
        userId: 0,
        imageLink: "",
        experience: "",
        favoriteBook: "",
        specialty: "",
        writingQuote: ""
    })

    const [filteredTutors, setFilterTutor] = useState([]);
    const [allTutors, setTutors] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/users?isStaff=true&_embed=tutorInformation`
        )
          .then((response) => response.json())
          .then((tutorArray) => {
            setTutors(tutorArray);
          });
      },
      []
    )

useEffect(() => {
    const correctTutor = allTutors.filter(
      (correctTutor) =>
      
        correctTutor?.tutorInformation?.length === 0
    );
    setFilterTutor(correctTutor);
  }, 
  [allTutors]);

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const tutorToSendToAPI = {
            userId: tutor.userId,
            imageLink: tutor.imageLink,
            experience: tutor.experience,
            favoriteBook: tutor.favoriteBook,
            specialty: tutor.specialty,
            writingQuote: tutor.writingQuote
        }

        fetch(`http://localhost:8088/tutorInformation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tutorToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/tutors")

            })

    }

    return (
        <form className="packageForm">
            <h2 className="packageForm__title">New Tutor</h2>
            <fieldset>
                <div className="form-group select">
                <label className="label-bold" htmlFor="studentName">Identification:</label>                   
                 <select value={tutor.tutorId} onChange={(evt) => {
                        const copy = { ...tutor }
                        copy.userId = parseInt(evt.target.value)
                        update(copy)
                    }}>
                        <option value="0">ID</option>
                        {
                            filteredTutors.map(tutorObject => <option key={`tutorObject--${tutorObject.id}`} value={tutorObject.id}>{tutorObject.id}</option>)
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="imageLink">Image Link:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Image Link"
                        value={tutor.imageLink}
                        onChange={(evt) => {
                            const copy = { ...tutor }
                            copy.imageLink = evt.target.value
                            update(copy)


                        }} />
                </div>
            </fieldset> 
            <fieldset>
                <div className="form-group">
                    <label htmlFor="imageLink">Experience:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Experience"
                        value={tutor.experience}
                        onChange={(evt) => {
                            const copy = { ...tutor }
                            copy.experience = evt.target.value
                            update(copy)


                        }} />
                </div>
            </fieldset> 
            <fieldset>
                <div className="form-group">
                    <label htmlFor="favoriteBook">Favorite Book:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Image Link"
                        value={tutor.favoriteBook}
                        onChange={(evt) => {
                            const copy = { ...tutor }
                            copy.favoriteBook = evt.target.value
                            update(copy)


                        }} />
                </div>
            </fieldset> 
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Specialty"
                        value={tutor.specialty}
                        onChange={(evt) => {
                            const copy = { ...tutor }
                            copy.specialty = evt.target.value
                            update(copy)


                        }} />
                </div>
            </fieldset> 
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Writing Quote:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Writing Quote"
                        value={tutor.writingQuote}
                        onChange={(evt) => {
                            const copy = { ...tutor }
                            copy.writingQuote = evt.target.value
                            update(copy)


                        }} />
                </div>
            </fieldset> 
            <button
                onClick={
                    (clickEvent) => { handleSaveButtonClick(clickEvent) }
                }
                className="btn btn-primary">
                Submit
            </button>
        </form>
    )
}
