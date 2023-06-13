import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Packages.css"

export const PackageList = () => {
  const [packages, setPackages] = useState([]);

  const navigate = useNavigate();

  const localWritingUser = localStorage.getItem("writing_user");
  const writingUserObject = JSON.parse(localWritingUser);

  useEffect(() => {
    const getAllPackages = () => {
      fetch(`http://localhost:8088/packages`)
        .then((response) => response.json())
        .then((packageArray) => {
          setPackages(packageArray);
        });
    };

    getAllPackages();
  }, []);

  return (
    <>
      <h2>List of Packages</h2>

      <article className="packages">
        {packages.map((packaged) => (
         
          <section className="package" key={packaged.id}>
            <div>Name: {packaged.name}</div>
            <div>Price: {packaged.price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })}</div>
            <div>Description: {packaged.description}</div>
          </section>
        ))}
      </article>

      <article className="information">
        Insert information about the process. Use as an opportunity to practice CSS.
      </article>

      <article>
        Insert writing quotes. Use as an opportunity to practice CSS.
      </article>

      <article>
  
        { writingUserObject.staff ? <button onClick={() => navigate("/newPackage")}>Create New Package</button>
        :  <button onClick={() => navigate("/submissionForm")}>Click here to submit your writing</button> }
      </article>
    </>
  );
};


