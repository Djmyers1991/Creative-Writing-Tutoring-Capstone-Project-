import "./HomePage.css";

export const HomePage = () => {
  const localWritingUser = localStorage.getItem("writing_user");
  const writingUserObject = JSON.parse(localWritingUser);

  return (
    <>
    
        
        <article className="dialogue-bubble introduction">
          
<h2 className="greeting"> Welcome {writingUserObject.name},</h2>
          <h5>
            <div className="finalMessage">
            The purpose of this application is to provide aspiring writers opportunities to send their creative work to seasoned writers at an affordable price
            so as to receive extensive feedback in return.<br />Please send a message if you have any questions.
</div>
           
          </h5>
      
          </article>
   
    </>
  );
};
