import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const PackageForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [packaged, update] = useState({
        name: "",
        price: 0,
        description: ""

    })

    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const messageToSendToAPI = {
            name: packaged.name,
            price: packaged.price,
            description: packaged.description

        }
        fetch(`http://localhost:8088/packages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/packages")

            })

    }

    return (
        <form className="packageForm">
            <h2 className="packageForm__title">Create New Package</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Name of Genre:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="New Genre"
                        value={packaged.name}
                        onChange={(evt) => {
                            const copy = { ...packaged }
                            copy.name = evt.target.value
                            update(copy)


                        }} />
                </div>
            </fieldset> 
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Price:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="$$$$$$$"
                        value={packaged.price}
                        onChange={(evt) => {
                            const copy = { ...packaged }
                            copy.price = parseFloat(evt.target.value)
                            update(copy)
                        }} />
                </div>
            </fieldset> 
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={packaged.description}
                        onChange={(evt) => {
                            const copy = { ...packaged }
                            copy.description = evt.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset> 
            <button
                onClick={
                    (clickEvent) => { handleSaveButtonClick(clickEvent) }
                }
                className="btn btn-primary">
                Submit
            </button>
        </form>
    )
}
