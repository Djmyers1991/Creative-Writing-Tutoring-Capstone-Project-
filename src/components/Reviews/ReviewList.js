import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ReviewList.css"


export const ReviewList = () => {
    const [reviews, displayReview ] = useState([])
    const [tutors, setTutors] = useState([])

    const navigate = useNavigate()

    const getAllTutors = () => {
        fetch(`http://localhost:8088/users?_isStaff=true`)
          .then((response) => response.json())
          .then((tutorArray) => {
            setTutors(tutorArray);
          });
      };

      const getAllReviews = () => {
        fetch(`http://localhost:8088/reviews`)
          .then((response) => response.json())
          .then((reviewArray) => {
            displayReview(reviewArray);
          });
      };    
    
    useEffect(() => {
        getAllReviews();
      }, []);

      useEffect(() => {
        getAllTutors();
      }, []);





    return <>


  <h2>Reviews</h2>
  <article className="studentReviews">
    {reviews.map((review) => {
      const tutor = tutors.find((tutor) => tutor.id === review.tutorId)
      return (
        <section className="individualReview" key={review.id}>
          {/* <div>{tutor.name}</div> */}
          <div>{review.message}</div>
          {/* <footer>{deleteButton(tutorMessager)}</footer> */}
        </section>
      );
    })}
  </article>

  <button onClick={() => navigate("/reviewForm")}>
    Submit Review!
  </button>
</>
}

