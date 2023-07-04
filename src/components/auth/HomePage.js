import "./HomePage.css";

export const HomePage = () => {
  const localWritingUser = localStorage.getItem("writing_user");
  const writingUserObject = JSON.parse(localWritingUser);

  return (
    <>
      {!writingUserObject.staff ? (
        
        <article className="dialogue-bubble introduction">
          
<h2 className="greeting"> Welcome {writingUserObject.name},</h2>
          <h5>
            <div className="finalMessage">
            The purpose of this application is to provide aspiring writers opportunities to send their creative work to professional writers at an affordable price
            and receive extensive feedback in return.Please send a message if you have any questions or concerns.
</div>
           
          </h5>
      
          </article>
      ) : (
        <article className="dialogue-bubble">
          <h2 finalMessage="introduction">{writingUserObject.name}, we don't care to impress you! <div>Knowing your audience is the key to success!!</div></h2>
        </article>
      )}
    </>
  );
};
