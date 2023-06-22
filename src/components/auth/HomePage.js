import "./HomePage.css";

export const HomePage = () => {
  const localWritingUser = localStorage.getItem("writing_user");
  const writingUserObject = JSON.parse(localWritingUser);

  return (
    <>
      {!writingUserObject.staff ? (
        
        <article className="dialogue-bubble introduction">
          <h3>{writingUserObject.name}, you're probably thinking, <div>"The Creative Writing Website is the least creative name for a creative writing website."</div> </h3>
          

          <article className="professionalInformation"> 
          <h5>
            <div className="finalMessage">
              The purpose of this application is to provide aspiring writers opportunities to send their creative work to professional writers at an affordable price
            and receive extensive feedback in return.</div>
            <div>More importantly, we want you to help you think like a writer.</div>
          </h5>
          <h5>            <div className="quoteCoral"> We want you to think, "The author of this website gets irony." </div>
</h5>
          <h5 className="finalMessage">
            Please send a message if you have any questions or concerns.
          </h5>
          </article>
        </article>
      ) : (
        <article className="dialogue-bubble">
          <h2 finalMessage="introduction">{writingUserObject.name}, we don't care to impress you! <div>Knowing your audience is the key to success!!</div></h2>
        </article>
      )}
    </>
  );
};
