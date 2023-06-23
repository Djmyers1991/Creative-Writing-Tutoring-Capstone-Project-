import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const SubmissionCounter = () => {

    
    const [submissions, setSubmissions] = useState([]);
    const [filteredSubmissions, setFiltered] = useState([]);

    const localWritingUser = localStorage.getItem("writing_user");
    const writingUserObject = JSON.parse(localWritingUser);

    const getAllSubmissions = () => fetch("http://localhost:8088/submissions?_expand=package&_expand=user")
  .then((response) => response.json())
  .then((submissionArray) => {
    setSubmissions(submissionArray);

  });

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

  return <>
 
          <Link className="navbar__link" to="/submissions">
            Submissions {filteredSubmissions.length}
          </Link>
       
  </>
}



