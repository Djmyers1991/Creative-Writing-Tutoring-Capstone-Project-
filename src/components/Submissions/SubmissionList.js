import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Submissions.css"




export const SubmissionList = ({ searchTermState }) => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFiltered] = useState([]);
  const [users, findUsers] = useState([])
  const navigate = useNavigate();


  const localWritingUser = localStorage.getItem("writing_user");
  const writingUserObject = JSON.parse(localWritingUser);

  const getAllSubmissions = () => fetch("http://localhost:8088/submissions?_expand=package&_expand=user")
    .then((response) => response.json())
    .then((submissionArray) => {
      const correctSubmissions = submissionArray.filter(
        (submission) =>
          submission.userId === writingUserObject.id ||
          submission.tutorId === writingUserObject.id
      )
      setSubmissions(correctSubmissions);
      setFiltered(correctSubmissions);
    });



  useEffect(() => {
    fetch(`http://localhost:8088/users`)
      .then((response) => response.json())
      .then((userArray) => {
        findUsers(userArray);
      })

  }, []);




  useEffect(() => {

    getAllSubmissions();
  }, []);



  // useEffect(() => {
  //   const correctSubmissions = submissions.filter(
  //     (submission) =>
  //       submission.userId === writingUserObject.id ||
  //       submission.tutorId === writingUserObject.id
  //   );
  //   setFiltered(correctSubmissions)

  // }, [submissions]);



  useEffect(() => {
    const searchTerm = searchTermState.trim();
    const searchedSubmissions =
      searchTerm
        ? submissions.filter((submission) => {
          return submission?.package?.name
            .toLowerCase()
            .startsWith(searchTerm.toLowerCase());
        })
        : submissions;
    setFiltered(searchedSubmissions);

  }, [searchTermState]);

  /*filtering submissions based on package name that matches state. 
  //1. poetry
  //2. short story
  //3. novels
  if search term is "o", nothing comes back. Empty grid
  add ternary if search is nothing return sorry your search yielded no results. Try again.
  // if search p, poetry submissions will only remain. roll tide
  if you enter sh but get rid of s, then the entire speech disappears. The problem is that the the intial state
  is not triggered on page load. 
  if filtering on an empty string, I want all of the filtered results to return. 

google trim method!!!!!
  change startsWith
  */

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
        {filteredSubmissions.map((submission) => {
          const tutorName = users.find((user) => user.id === submission.tutorId);

          return (
            <section className="package" key={submission.id}>
              <Link to={`/submissions/${submission.id}/edit`}>
                Submission {submission.id}
              </Link>
              <div>Name: {submission?.user?.name}</div>
              <div>Tutor Name: {tutorName.name}</div>
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
              </div>
              <div>Specific Feedback: {submission.specificFeedback}</div>
              <footer>{deleteButton(submission)}</footer>
              <footer>
                {writingUserObject.staff && (
                  <button onClick={() => navigate("/submissionCompletedForm")}>
                    Final Submission!
                  </button>
                )}
              </footer>
            </section>
          );
        })}
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
}