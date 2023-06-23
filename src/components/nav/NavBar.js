import { Link, useNavigate  } from "react-router-dom";
import "./NavBar.css";
import { useEffect, useState } from "react";
import { SubmissionContainer } from "../Submissions/SubmissionContainer";
import { SubmissionCounter } from "../Inbox/SubmissionCounter";


export const NavBar = () => {
  const navigate = useNavigate();

    const [tutorMessages, setTutorMessages] = useState([]);
    const [studentMessages, setStudentMessages] = useState([]);
    const [completedSubmissions, setCompletedSubmissions] = useState([])
    const [filteredCompletedSubmissions, setCompletedFilter] = useState([])
    const [filteredStudentMessages, setFilterStudent] = useState([]);
    const [filteredTutorMessages, setFilterTutor] = useState([]);
    const localWritingUser = localStorage.getItem("writing_user");
    const writingUserObject = JSON.parse(localWritingUser);
    const individualMessageCounter = filteredStudentMessages.length
    const individualStudentMessageCounter = filteredTutorMessages.length
    const completedSubmissionsCounter = filteredCompletedSubmissions.length


    const getTutorMessages = () => {
      fetch("http://localhost:8088/tutorMessages?_expand=user")
        .then((response) => response.json())
        .then((tutorMessageArray) => {
          setTutorMessages(tutorMessageArray);
        });
    };

    const getStudentMessages = () => {
      fetch("http://localhost:8088/studentMessages?_expand=user")
        .then((response) => response.json())
        .then((studentMessageArray) => {
          setStudentMessages(studentMessageArray);
        });
    };
   
 

  const getAllCompletedSubmissions = () => fetch("http://localhost:8088/completedSubmissions?_expand=package&_expand=user")
.then((response) => response.json())
.then((submissionArray) => {
  setCompletedSubmissions(submissionArray);
});
    useEffect(() => {
      getTutorMessages();
    }, []);

    useEffect(() => {
      getStudentMessages();
    }, []);

    useEffect(() => {
      const correctStudentMessage = studentMessages.filter(
        (studentMessager) => studentMessager.tutorId === writingUserObject.id
      );
      setFilterStudent(correctStudentMessage);
    }, [studentMessages]);

    useEffect(() => {
      const correctTutorMessage = tutorMessages.filter(
        (tutorMessager) =>
          tutorMessager.userId === writingUserObject.id ||
          tutorMessager.studentId === writingUserObject.id
      );
      setFilterTutor(correctTutorMessage);
    }, [tutorMessages]);
  
  useEffect(() => {
    getAllCompletedSubmissions()
},[])

useEffect(()=> {
    const correctCompletedSubmissions = completedSubmissions.filter(
        (submission) =>
          submission.userId === writingUserObject.id ||
          submission.tutorId === writingUserObject.id
      );
      setCompletedFilter(correctCompletedSubmissions)
    }, [completedSubmissions]
    )

    return (
      <ul className="navbar">
        <li className="navbar__item active">
          <Link className="navbar__link" to="/homePage">
            <img
              className="imgPencil"
              src="https://thumbs.dreamstime.com/b/balloon-drawing-pencil-art-fly-high-logo-template-balloon-drawing-pencil-art-fly-high-logo-template-141619603.jpg"
              alt="Image"
            />
          </Link>
        </li>
        <li className="navbar__item active">
          <Link className="navbar__link" to="/tutors">
            Tutors
          </Link>
        </li>
        <li className="navbar__item active">
          <Link className="navbar__link" to="/packages">
            Packages
          </Link>
        </li>
        <li className="navbar__item active">
        <SubmissionCounter />
        </li>
        {writingUserObject.staff ?  
        (<li className="navbar__item active">
        <Link className="navbar__link" to="/messages">
          Messages {individualMessageCounter}
        </Link>
      </li> ) : (<li className="navbar__item active">
        <Link className="navbar__link" to="/messages">
          Messages {individualStudentMessageCounter}
        </Link>
      </li> )
}
{!writingUserObject.staff ? (
        <li className="navbar__item active">
          <Link className="navbar__link" to="/completedSubmissions">
            Completed {completedSubmissionsCounter}
          </Link>
        </li>) : (
        <li className="navbar__item active">
          <Link className="navbar__link" to="/completedSubmissions">
            Completed 
          </Link>
        </li>)

}
        <li className="navbar__item active">
          <Link className="navbar__link" to="/reviews">
            Reviews
          </Link>
        </li>
        {writingUserObject.staff ? (
          <li className="navbar__item active">
            <Link className="navbar__link" to="/profiles">
              Profile
            </Link>
          </li>
        ) : (
          ""
        )}
        {localStorage.getItem("writing_user") ? (
          <li className="navbar__item navbar__logout">
            <Link
              className="navbar__link"
              to=""
              onClick={() => {
                localStorage.removeItem("writing_user");
                navigate("/", { replace: true });
              }}
            >
              Logout
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    );
  };






  








