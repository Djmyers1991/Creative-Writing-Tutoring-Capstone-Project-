import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TutorList.css"


export const TutorList = () => {

  const [tutors, setTutors] = useState([]);

  const navigate = useNavigate();

  const localWritingUser = localStorage.getItem("writing_user");
  const writingUserObject = JSON.parse(localWritingUser);
  
  const getAllTutors = () => {
    fetch(`http://localhost:8088/tutorInformation?_expand=user&_isStaff=true`)
      .then((response) => response.json())
      .then((tutorArray) => {
        setTutors(tutorArray);
      });
  };


  const deleteButton = (tutor) => {
    if (writingUserObject.admin) {
      return (
        <button
          onClick={() => {
            fetch(`http://localhost:8088/tutorInformation/${tutor.id}`, {
              method: "DELETE"
            })
              .then(() => {
                getAllTutors();
              });
          }}
          className="submission__delete"
        >
          Delete
        </button>
      );
    } else {
      return " ";
    }
  };

  useEffect(() => {
    getAllTutors();
  }, []);

  return  <>
  <h2>List of Tutors</h2>

<div className="tutor-cards">
  {tutors.map((tutor) => (
    <div className="card" key={tutor.id}>
      <div className="imgTutor">
        <img className="imgSize" src={tutor.imageLink} alt="Image" />
      </div>
      <div className="nameTutor">Name: {tutor?.user?.name}</div>
      <div className="emailTutor">Email: {tutor?.user?.email}</div>
      <div className="experienceTutor">
        Tutoring Experience: {tutor.experience}
      </div>
      <div className="specialtyTutor">Specialty: {tutor.specialty}</div>
      <div className="bookTutor">Favorite Book: {tutor.favoriteBook}</div>
      <div className="quoteTutor">
        Meaningful Literary Quote: "{tutor.writingQuote}"
      </div>
      <footer className="deleteButtonTutor">
        {tutor?.user?.name === writingUserObject.name || writingUserObject.admin ? (
          deleteButton(tutor)
        ) : (
          ""
        )}
      </footer>
    </div>
  ))}
</div>

  
      <article>
        <div>For more information about our packages, please click on the button below.</div>
      <button onClick={() => navigate("/packages")}>Packages</button>
      </article>
    </>
};


