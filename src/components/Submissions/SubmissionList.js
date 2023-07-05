import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Submissions.css";

export const SubmissionList = ({ searchTermState }) => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFiltered] = useState([]);
  const [users, findUsers] = useState([]);
  const navigate = useNavigate();

  const localWritingUser = localStorage.getItem("writing_user");
  const writingUserObject = JSON.parse(localWritingUser);

  const getAllSubmissions = () =>
    fetch("http://localhost:8088/submissions?_expand=package&_expand=user")
      .then((response) => response.json())
      .then((submissionArray) => {
        const correctSubmissions = submissionArray.filter(
          (submission) =>
            submission.userId === writingUserObject.id ||
            submission.tutorId === writingUserObject.id
        );
        setFiltered(correctSubmissions);
      });

  useEffect(() => {
    fetch("http://localhost:8088/users")
      .then((response) => response.json())
      .then((userArray) => {
        findUsers(userArray);
      });
  }, []);

  useEffect(() => {
    getAllSubmissions();
  }, []);

  useEffect(() => {
    const searchTerm = searchTermState.trim();
    const searchedSubmissions = searchTerm
      ? submissions.filter((submission) =>
          submission?.package?.name
            .toLowerCase()
            .startsWith(searchTerm.toLowerCase())
        )
      : submissions;
    setFiltered(searchedSubmissions);
  }, [searchTermState, submissions]);

  const deleteButton = (submission) => {
    if (!writingUserObject.staff || writingUserObject.staff) {
      return (
        <button
          onClick={() => {
            fetch(`http://localhost:8088/submissions/${submission.id}`, {
              method: "DELETE",
            })
              .then(() => {
                fetch(
                  "http://localhost:8088/submissions?_expand=user&_expand=package"
                )
                  .then((response) => response.json())
                  .then((submissionArray) => {
                    const correctSubmissions = submissionArray.filter(
                      (submission) =>
                        submission.userId === writingUserObject.id ||
                        submission.tutorId === writingUserObject.id
                    );
                    setSubmissions(correctSubmissions);
                    setFiltered(correctSubmissions);
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

  return (
    <>
      <h2 className="submissionHeaderRollTide">Submissions</h2>
      <article className="submissions">
        {filteredSubmissions.map((submission) => {
          const tutorName = users.find((user) => user.id === submission.tutorId);

          return (
            <section className="package" key={submission.id}>
              <Link to={`/submissions/${submission.id}/edit`}>
                Submission {submission.id}
              </Link>
              <div>Name: {submission?.user?.name}</div>
              <div>Tutor Name: {tutorName?.name}</div>
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
};
