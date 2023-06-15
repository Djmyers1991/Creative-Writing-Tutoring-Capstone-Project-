import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const SubmissionList = ({ searchTermState }) => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilter] = useState([]);
 

  const navigate = useNavigate();
  

  const localWritingUser = localStorage.getItem("writing_user");
  const writingUserObject = JSON.parse(localWritingUser);


  
  useEffect(() => {
    
    fetch("http://localhost:8088/submissions?_expand=package&_expand=user")
      .then((response) => response.json())
      .then((submissionArray) => {
        setSubmissions(submissionArray);
      });
  }, []);

  useEffect(() => {
    const correctSubmissions = submissions.filter(
      (submission) =>
        submission.userId === writingUserObject.id ||
        submission.tutorId === writingUserObject.id
    );
    setFilter(correctSubmissions);
  }, [submissions]);

  useEffect(() => {
    const searchedSubmissions = filteredSubmissions.filter((submission) => {
      return submission?.package?.name
        .toLowerCase()
        .startsWith(searchTermState.toLowerCase());
    });
    setFilter(searchedSubmissions);
  }, [searchTermState]);


  const deleteButton = (submission) => {
    if (!writingUserObject.staff) {
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
  
  


  




// const canClose = () => {
//   if () {
//     return <button className="submission__finish">Completed</button>
//   }
//   else {
//     return 
//   }

// }



  return (
    <>
      <h2>List of Submissions</h2>
      <article className="submissions">
        {filteredSubmissions.map((submission) => (
          <section className="package" key={submission.id}>
            {!writingUserObject.staff ? (
              <Link to={`/submissions/${submission.id}/edit`}>
                Submission {submission.id}
              </Link>
            ) : (
              ""
            )}
            <div>Name: {submission?.user?.name}</div>
            <div>Email: {submission?.user?.email}</div>
            <div>Package Selected: {submission?.package?.name}</div>
            <div>Writing Document: {submission.googleDocument}</div>
            <div>Specific Feedback: {submission.specificFeedback}</div>
            <div>
              {writingUserObject.staff && (
                <button>
                  In Progress
                </button>
              )}
                <p>{`Your tutor is currently reading your submissions. Your edits will not be seen.`}</p>
              
            </div>
            <footer>
        {
      deleteButton(submission)
        }
      </footer>
          </section>
        ))}
      </article>
      <footer>
        {!writingUserObject.staff ? (
          <button onClick={() => navigate("/submissionForm")}>
            Click here to submit your work!
          </button>
        ) : (
          ""
        )}
      </footer>
    </>
  );
};


//add a new object to the array that says read or not read? 
//

