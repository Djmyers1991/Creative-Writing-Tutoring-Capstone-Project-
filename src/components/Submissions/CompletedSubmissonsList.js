import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CompletedSubmissionsList = () => {
const [submissions, setSubmissions] = useState([])
const [filteredSubmissions, setFilter] = useState([])

const navigate = useNavigate();
  

const localWritingUser = localStorage.getItem("writing_user")
const writingUserObject = JSON.parse(localWritingUser)

const getAllCompletedSubmissions = () => fetch("http://localhost:8088/completedSubmissions?_expand=package&_expand=user")
.then((response) => response.json())
.then((submissionArray) => {
  setSubmissions(submissionArray);
});


useEffect(() => {
    getAllCompletedSubmissions()
},[])

useEffect(()=> {
    const correctSubmissions = submissions.filter(
        (submission) =>
          submission.userId === writingUserObject.id ||
          submission.tutorId === writingUserObject.id
      );
      setFilter(correctSubmissions)
    }, [submissions]
    )

    const canClose = (submission) => {
        if (writingUserObject.staff) {
          return (
            <button onClick={() => closeSubmission(submission)} className="submission__finish">
              Completed
            </button>
          );
        } else {
          return "";
        }
      }
      
      
      const closeSubmission = (submission) => {
        const copy = {
          userId: submission.userId,
          packageId: submission.packageId,
          linkWithEdits: submission.linkWithEdits,
          specificFeedback: submission.specificFeedback,
          dateCompleted: submission.dateCompleted,
          isRead: submission.isRead,
          tutorId: submission.tutorId,
          submissionId: submission.submissionId,
          isFinished: true,
          paymentReceived: true
        };
    
        return fetch(`http://localhost:8088/completedSubmissions/${submission.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(copy)
        })
        .then(response => response.json())
        .then(getAllCompletedSubmissions);
      }
      
      const deleteButton = (submission) => {
        if (!writingUserObject.staff) {
          return (
            <button
              onClick={() => {
                fetch(`http://localhost:8088/completedSubmissions/${submission.id}`, {
                  method: "DELETE"
                })
                  .then(() => {
                    getAllCompletedSubmissions()
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
          <h2>Finished Submissions</h2>
          <article className="submissions">
            {filteredSubmissions.map((submission) => (
              !writingUserObject.staff || !submission.isFinished ? (
                <section className="package" key={submission.id}>
                  <div>Name: {submission?.user?.name}</div>
                  <div>Submission Identification Number: {submission.submissionId}</div>
                  <div>Package Selected: {submission?.package?.name}</div>
                  <div>
                    {submission.linkWithEdits && (
                      <a
                        href={
                          submission.linkWithEdits.startsWith("http://") ||
                          submission.linkWithEdits.startsWith("https://")
                            ? submission.linkWithEdits
                            : `http://${submission.linkWithEdits}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Click here to view the edited submission
                      </a>
                    )}
                  </div>
                  <div>Specific Feedback: {submission.specificFeedback}</div>
                  <div> Date Completed: {submission.dateCompleted}</div>
                  <footer>{canClose(submission)}</footer>
                  <footer>{deleteButton(submission)}</footer>
                </section>
              ) : " "
            ))}
          </article>
          
        </>
      );
            }      


            // return (
            //   <>
            //     <h2>Finished Submissions</h2>
            //     <article className="submissions">
            //       {filteredSubmissions.map((submission) => {
            //         const foundUser = filteredSubmissions.find(
            //           (teacherSubmission) => teacherSubmission.tutorId === teacherSubmission?.user?.id
            //         );
            //         return !writingUserObject.staff || !submission.isFinished ? (
            //           <section className="package" key={submission.id}>
            //             <div>Reviewer: {foundUser?.user?.name}</div>
            //             <div>Name: {submission?.user?.name}</div>
            //             <div>Package Selected: {submission?.package?.name}</div>
            //             <div>
            //               {submission.linkWithEdits && (
            //                 <a
            //                   href={
            //                     submission.linkWithEdits.startsWith("http://") ||
            //                     submission.linkWithEdits.startsWith("https://")
            //                       ? submission.linkWithEdits
            //                       : `http://${submission.linkWithEdits}`
            //                   }
            //                   target="_blank"
            //                   rel="noopener noreferrer"
            //                 >
            //                   Click here to view the edited submission
            //                 </a>
            //               )}
            //             </div>
            //             <div>Specific Feedback: {submission.specificFeedback}</div>
            //             <div>Date Completed: {submission.dateCompleted}</div>
            //             <footer>{canClose(submission)}</footer>
            //           </section>
            //         ) : null;
            //       })}
            //     </article>
            //     <footer>
            //       {writingUserObject.staff && (
            //         <button onClick={() => navigate("/submissionCompletedForm")}>
            //           Fill Out Form!
            //         </button>
            //       )}
            //     </footer>
            //   </>
            // );
            //       }