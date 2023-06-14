import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SubmissionList = ({ searchTermState }) => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilter] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);

  const navigate = useNavigate();

  const localWritingUser = localStorage.getItem("writing_user");
  const writingUserObject = JSON.parse(localWritingUser);

  const handleButtonClick = (submissionId) => {
    setShowMessage(true);
    setButtonClicked(true);
    setSelectedSubmissionId(submissionId);
    localStorage.setItem("selectedSubmissionId", submissionId);
    localStorage.setItem("buttonClicked", "true");
  };

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

  useEffect(() => {
    const searchedSubmissions = filteredSubmissions.filter((submission) => {
      return submission.specificFeedback
        .toLowerCase()
        .startsWith(searchTermState.toLowerCase());
    });
    setFilter(searchedSubmissions);
  }, [searchTermState]);

  useEffect(() => {
    const storedSubmissionId = localStorage.getItem("selectedSubmissionId");
    const storedButtonClicked = localStorage.getItem("buttonClicked");
    setShowMessage(storedButtonClicked === "true");
    setSelectedSubmissionId(storedSubmissionId);
    setButtonClicked(storedButtonClicked === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedSubmissionId", selectedSubmissionId);
    localStorage.setItem("buttonClicked", buttonClicked.toString());
  }, [selectedSubmissionId, buttonClicked]);


  // const deleteButton = () => {
  //   if(!writingUserObject.staff) {
  //     return <button onClick={() => {
  //       fetch(`http://localhost:8088/`)

  //     }

  //   }
  // }

const canDelete = () => {
  if () {
    return <button className="submission__finish">Completed</button>
  }
  else {
    return ""
  }

}



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
                <button onClick={() => handleButtonClick(submission.id)}>
                  In Progress
                </button>
              )}
              {showMessage && submission.id === selectedSubmissionId && (
                <p>{`Your tutor is currently reading your submissions. Your edits will not be seen.`}</p>
              )}
            </div>
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
      <footer>
        if(!currentUser.staff) {
          return <button onClick={closeTi"
        }
      </footer>
    </>
  );
};


//add a new object to the array that says read or not read? 
//