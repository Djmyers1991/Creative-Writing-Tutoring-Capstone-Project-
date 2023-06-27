import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Packages.css"

export const PackageList = () => {
  const [packages, setPackages] = useState([]);

  const navigate = useNavigate();

  const localWritingUser = localStorage.getItem("writing_user");
  const writingUserObject = JSON.parse(localWritingUser);

  const deleteButton = (packaged) => {
    if (writingUserObject.admin) {
      return (
        <button
          onClick={() => {
            fetch(`http://localhost:8088/packages/${packaged.id}`, {
              method: "DELETE"
            })
              .then(() => {
                getAllPackages();
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

  const editButton = (packaged) => {
    if (writingUserObject.admin) {
      return (
        <button
          onClick={() => {
            navigate(`/packages/${packaged.id}/edit`);
          }}
        >
          Edit
        </button>
      );
    } else {
      return " ";
    }
  };
  



  const getAllPackages = () => {
    fetch(`http://localhost:8088/packages`)
      .then((response) => response.json())
      .then((packageArray) => {
        setPackages(packageArray);
      });
  };


  useEffect(() => {
    
    getAllPackages();
  }, []);

  return (
    <>
      <h2 className="packageHeader">Packages</h2>

      <article className="packages">
        {packages.map((packaged) => (
         
          <section className="package" key={packaged.id}>
            <div className="packageName"> {packaged.name}</div>
            <div>{packaged.price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })}</div>
            <div className="description">{packaged.description}</div>
            <footer>
              {
                deleteButton(packaged) 
              }
            </footer>
            <footer>
              {
                editButton(packaged) 
              }
            </footer>
          </section>
        ))}
      </article>

      <article>
  
        { writingUserObject.staff ? <button onClick={() => navigate("/newPackage")}>Create New Package</button>
        :  <button onClick={() => navigate("/submissionForm")}>Submit Your Writing</button> }
      </article>
    </>
  );
};



