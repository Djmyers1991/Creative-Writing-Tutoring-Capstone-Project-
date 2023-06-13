import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SubmissionList = ({searchTermState}) => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilter] = useState([]);

  const navigate = useNavigate();

  const localWritingUser = localStorage.getItem("writing_user");
  const writingUserObject = JSON.parse(localWritingUser);

  useEffect(() => {
    fetch("http://localhost:8088/submissions?_expand=user&_expand=package")
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

  useEffect(
    () => {
    const searchedSubmissions = filteredSubmissions.filter(submission => {
      return submission.specificFeedback.toLowerCase().startsWith(searchTermState.toLowerCase())
       })
    setFilter(searchedSubmissions)
  }, 
  [searchTermState]
  )

  return (
    <>
      <h2>List of Submissions</h2>
      <article className="submissions">
        {filteredSubmissions.map((submission) => (
          <section className="package" key={submission.id}>
            <div>Name: {submission?.user?.name}</div>
            <div>Email: {submission?.user?.email}</div>
            <div>Package Selected: {submission?.package?.name}</div>
            <div>Writing Document: {submission.googleDocument}</div>
            <div>Specific Feedback: {submission.specificFeedback}</div>
          </section>
        ))}
      </article>
      {!writingUserObject.staff ? (
        <button onClick={() => navigate("/submissionForm")}>
          Click here to submit your work!
        </button>
      ) : (
        ""
      )}
    </>
  );
};
