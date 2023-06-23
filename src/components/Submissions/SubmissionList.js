import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Submissions.css"




export const SubmissionList = ({ searchTermState }) => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFiltered] = useState([]);
  const [tutors, getTutors] = useState([])
  const [filteredTutors, filterTutors]= useState([])
  const navigate = useNavigate();
  

  const localWritingUser = localStorage.getItem("writing_user");
  const writingUserObject = JSON.parse(localWritingUser);

  const getAllSubmissions = () => fetch("http://localhost:8088/submissions?_expand=package&_expand=user")
.then((response) => response.json())
.then((submissionArray) => {
  setSubmissions(submissionArray);
});

const getAllTutors = () => {
  fetch(`http://localhost:8088/submissions?_expand=user`)
    .then((response) => response.json())
    .then((tutorArray) => {
      getTutors(tutorArray);
    });
};

useEffect(() => {

getAllTutors()

},
[]
)

// useEffect(() => {
//   const correctTutor = tutors.find(
//     (tutor) =>
//       submission.userId === writingUserObject.id ||
//       submission.tutorId === writingUserObject.id
//   );
//   filterTutors(correctTutor)
   
// }, [tutors]);
  
  useEffect(() => {
    
    getAllSubmissions();
  }, []);

  useEffect(() => {
    const correctSubmissions = submissions.filter(
      (submission) =>
        submission.userId === writingUserObject.id ||
        submission.tutorId === writingUserObject.id
    );
    setFiltered(correctSubmissions)
     
  }, [submissions]);

  

  useEffect(() => {
    const searchedSubmissions = filteredSubmissions.filter((submission) => {
      return submission?.package?.name
        .toLowerCase()
        .startsWith(searchTermState.toLowerCase());
    });
    setFiltered(searchedSubmissions);

  }, [searchTermState]);


  const deleteButton = (submission) => {
    if (!writingUserObject.staff || writingUserObject.staff) {
      return (
        <button
          onClick={() => {
            fetch(`http://localhost:8088/submissions/${submission.id}`, {
              method: "DELETE"
            })
              .then(() => {
                fetch("http://localhost:8088/submissions?_expand=user&_expand=package")
                  .then((response) => response.json())
                  .then((submissionArray) => {
                    setSubmissions(submissionArray);
                  });
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
  
  
  
  
  
  
  
  
  
//with PUT, you must go to specific submissions. Can't believe I forgot that.



  return (
    <>
      <h2>Submissions</h2>
      <article className="submissions">
        {filteredSubmissions.map((submission) => (
          <section className="package" key={submission.id}>
           
              <Link to={`/submissions/${submission.id}/edit`}>
                Submission {submission.id}
              </Link>
            
           
            <div>Name: {submission?.user?.name}</div>
            <div>Email: {submission?.user?.email}</div>
            <div>Package Selected: {submission?.package?.name}</div>
            <div>
                    {submission.googleDocument && (
                      <a
                        href={
                          submission.googleDocument.startsWith("http://") ||
                          submission.googleDocument.startsWith("https://")
                            ? submission.googleDocument
                            : `http://${submission.googleDocument}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Submission
                      </a>
                    )}
                  </div>            <div>Specific Feedback: {submission.specificFeedback}</div>
            <footer>
        {
      deleteButton(submission)
        }
        </footer>

        <footer>
            {writingUserObject.staff && (
              <button onClick={() => navigate("/submissionCompletedForm")}>
                Final Submission!
              </button>
            )}
          </footer>
    
          </section>
        ))}
      </article>
      <footer>
        {!writingUserObject.staff ? (
          <button onClick={() => navigate("/submissionForm")}>
            Submit Your Work!
          </button>
        ) : (
          ""
        )}
      </footer>
    </>
  );
};