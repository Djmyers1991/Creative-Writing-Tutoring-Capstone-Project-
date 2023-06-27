import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"




export const PackageEdit = () => {

const localWritingUser = localStorage.getItem("writing_user")
const writingUserObject = JSON.parse(localWritingUser)

    const [packaged, updatePackage] = useState({
        name: "",
        price: 0,
        description: ""

    })
    const { packageId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/packages/${packageId}`)
            .then(response => response.json())
            .then((data) => {
                updatePackage(data)
            })
    }, [packageId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/packages/${packaged.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(packaged)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/packages")
            })
    }

    return <form className="packageForm">
        <h2 className="packageForm__title">Package</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Name:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={packaged.name}
                    onChange={
                        (evt) => {
                            const copy = { ...packaged }
                            copy.name = evt.target.value
                            updatePackage(copy)
                        }
                    }>{packaged.name}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="price">Price:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={packaged.price}
                    onChange={
                        (evt) => {
                            const copy = { ...packaged }
                            copy.price = parseInt(evt.target.value)
                            updatePackage(copy)
                        }
                    }>{packaged.price}</textarea>
            </div>
        </fieldset>

        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={packaged.description}
                    onChange={
                        (evt) => {
                            const copy = { ...packaged }
                            copy.description = evt.target.value
                            updatePackage(copy)
                        }
                    }>{packaged.description}</textarea>
            </div>
        </fieldset>
 <button onClick={(clickEvent) => {handleSaveButtonClick(clickEvent)}}>
 Save</button>
    </form>

}
