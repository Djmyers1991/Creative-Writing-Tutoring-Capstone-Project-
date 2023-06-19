import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const ReviewList = () => {
    const [review, displayReview ] = useState([])
    const [tutor, setTutors] = useState([])

    const navigate = useNavigate()

    const getAllTutors = () => {
        fetch(`http://localhost:8088/tutorInformation?_expand=user&_isStaff=true`)
          .then((response) => response.json())
          .then((tutorArray) => {
            setTutors(tutorArray);
          });
      };

      const getAllReviews = () => {
        fetch(`http://localhost:8088/reviews`)
          .then((response) => response.json())
          .then((reviewArray) => {
            setTutors(reviewArray);
          });
      };    
    
    useEffect(() => {
        getAllReviews();
      }, []);

      useEffect(() => {
        getAllTutors();
      }, []);





    return <>
    
    <button onClick={() => navigate("/reviewForm")}>
                Submit Review!
              </button>

              </>
}

