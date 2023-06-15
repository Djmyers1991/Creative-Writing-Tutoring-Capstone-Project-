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
    if (writingUserObject.staff) {
      return (
        <button
          onClick={() => {
            fetch(`http://localhost:8088/tutorInformation/${tutor.id}`, {
              method: "DELETE"
            })
              .then(() => {
                getAllPackages();
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

      <article className="tutors">
        {tutors.map( (tutor) => { 
                return <section className="tutor" key={tutor.id}>
            <div>During MVP, ask for permission to use likeness</div>
            <div>Name: {tutor?.user?.name}</div>
            <div>Email: {tutor?.user?.email}</div>
            <div>Years of Tutoring Experience: {tutor.experience}</div>
            <div>Specialty: {tutor.specialty}</div>
            <div>Favorite Book: {tutor.favoriteBook}</div>
            <div>Meaningful Literay Quote: "{tutor.writingQuote}"</div>
            <footer></footer>
          </section>
            }
        )}
      </article>
      <article className="information">

            Insert information about the process. Use as opportunity to practice CSS.

      </article>

      <article>
        Insert writing quotes. Use as opportunity to practice CSS.
      </article>
      <article>
        <div>For more information about our packages, please click on the button below.</div>
      <button onClick={() => navigate("/packages")}>Packages</button>
      </article>
    </>
};


