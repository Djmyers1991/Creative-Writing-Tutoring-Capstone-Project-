import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Message.css";

export const MessageList = () => {
  const [tutorMessages, setTutorMessages] = useState([]);
  const [studentMessages, setStudentMessages] = useState([]);

  const [filteredStudentMessages, setFilterStudent] = useState([]);
  const [filteredTutorMessages, setFilterTutor] = useState([]);
  const [users, findUser] = useState([])
  const localWritingUser = localStorage.getItem("writing_user");
  const writingUserObject = JSON.parse(localWritingUser);
  
  const getTutorMessages = () => { fetch("http://localhost:8088/tutorMessages?_expand=user")
  .then((response) => response.json())
  .then((tutorMessageArray) => {
    setTutorMessages(tutorMessageArray)
  })
}

const getStudentMessages = () => { 
  fetch("http://localhost:8088/studentMessages?_expand=user")
    .then((response) => response.json())
    .then((studentMessageArray) => {
      setStudentMessages(studentMessageArray)
    })}

    const getUsers = () => { 
      fetch("http://localhost:8088/users")
        .then((response) => response.json())
        .then((userArray) => {
          findUser(userArray)
        })}

  const navigate = useNavigate();


  const deleteButton = (tutorMessager) => {
    return (
        <button
          onClick={() => {
            fetch(`http://localhost:8088/tutorMessages/${tutorMessager.id}`, {
              method: "DELETE"
            })
              .then(() => {
                getTutorMessages()
              });
          }}
          className="submission__delete"
        >
          Delete
        </button>
      
   
    )}
  ;

    const deleteButtonUser = (studentMessager) => {
    
      return (
        <button
          onClick={() => {
            fetch(`http://localhost:8088/studentMessages/${studentMessager.id}`, {
              method: "DELETE"
            })
              .then(() => {
                getStudentMessages()
              });
          }}
          className="submission__delete"
        >
          Delete
        </button>
      )
  };
  

  useEffect(() => {
    getTutorMessages()
  }, [])

  useEffect(() => {
  getStudentMessages()
  }, [])

  useEffect(() => {
    getUsers()
    }, [])

  useEffect(() => {
    const correctStudentMessage = studentMessages.filter(
      (studentMessager) =>
      
        studentMessager.tutorId === writingUserObject.id
    );
    setFilterStudent(correctStudentMessage);
  }, 
  [studentMessages]);

  useEffect(() => {
    const correctTutorMessage = tutorMessages.filter(
      (tutorMessager) =>
        tutorMessager.studentId === writingUserObject.id
    );
    setFilterTutor(correctTutorMessage);
  }, [tutorMessages]);

const individualMessageCounter = filteredStudentMessages.length
const individualStudentMessageCounter = filteredTutorMessages.length


  return (
    <>
      <h2 className="messageHeader">Messages</h2>
      <article className="tutorMessages">
  {filteredTutorMessages.map((tutorMessager) => {
    const tuturUser = users.find((user) => user.id === tutorMessager.studentId);

    return (
      <section className="package" key={tutorMessager.id}>
        <header>Dear {tuturUser?.name}</header>
        <div> {tutorMessager?.tutorMessage}</div>
        <div> Sincerely, {tutorMessager?.user?.name} </div>
        <footer>{deleteButton(tutorMessager)}</footer>
      </section>
    );
  })}
</article>
      <article className="studentMessages">
        {filteredStudentMessages.map((studentMessager) => {
          const studentUser = users.find((user) => user.id === studentMessager.tutorId);
          return ( 
          <section className="package" key={studentMessager.id}>
            <header>Dear {studentUser?.name},</header>
            <div>{studentMessager?.studentMessage}</div>
            <div>Sincerely, {studentMessager?.user?.name}</div>
            <footer>{deleteButtonUser(studentMessager)}</footer>

          </section>
        )})}
      </article>

      {!writingUserObject.staff ? (
        <button onClick={() => navigate("/messageFormStudent")}>
          Send a message!

        </button>
      ) : (
        <button onClick={() => navigate("/messageFormTutor")}>
          Send a message!
      </button>
      )}
    </>
  )
}