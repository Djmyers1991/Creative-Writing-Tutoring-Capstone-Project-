import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const MessageList = () => {
  const [tutorMessages, setTutorMessages] = useState([]);
  const [studentMessages, setStudentMessages] = useState([]);

  const [filteredStudentMessages, setFilterStudent] = useState([]);
  const [filteredTutorMessages, setFilterTutor] = useState([]);


  const navigate = useNavigate();

  const localWritingUser = localStorage.getItem("writing_user");
  const writingUserObject = JSON.parse(localWritingUser);

  useEffect(() => {
    fetch("http://localhost:8088/tutorMessages?_expand=user")
      .then((response) => response.json())
      .then((tutorMessageArray) => {
        setTutorMessages(tutorMessageArray);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8088/studentMessages?_expand=user")
      .then((response) => response.json())
      .then((studentMessageArray) => {
        setStudentMessages(studentMessageArray);
      });
  }, []);

  useEffect(() => {
    const correctStudentMessage = studentMessages.filter(
      (studentMessager) =>
        studentMessager.userId === writingUserObject.id ||
        studentMessager.tutorId === writingUserObject.id
    );
    setFilterStudent(correctStudentMessage);
  }, [studentMessages]);

  useEffect(() => {
    const correctTutorMessage = tutorMessages.filter(
      (tutorMessager) =>
        tutorMessager.userId === writingUserObject.id ||
        tutorMessager.tutorId === writingUserObject.id
    );
    setFilterTutor(correctTutorMessage);
  }, [tutorMessages]);

  return (
    <>
      <h2>Messages</h2>
      <article className="tutorMessages">
        {filteredTutorMessages.map((tutorMessager) => (
          <section className="package" key={tutorMessager.id}>
            <div> {tutorMessager?.tutorMessage}</div>
            <div> Sincerely, {tutorMessager?.user?.name} </div>

          </section>
        ))}
      </article>
      <article className="studentMessages">
        {filteredStudentMessages.map((studentMessager) => (
          <section className="package" key={studentMessager.id}>
            <div>{studentMessager?.studentMessage}</div>
            <div>Sincerely, {studentMessager?.user?.name}</div>
          </section>
        ))}
      </article>

      {!writingUserObject.staff ? (
        <button onClick={() => navigate("/messageFormStudent")}>
          Click here to send a message!
        </button>
      ) : (
        <button onClick={() => navigate("/messageFormTutor")}>
        Click here to send a message!
      </button>
      )}
    </>
  );
};