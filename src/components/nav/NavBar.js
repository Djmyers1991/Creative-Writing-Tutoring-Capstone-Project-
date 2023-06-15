import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    const localWritingUser = localStorage.getItem("writing_user")
    const writingUserObject = JSON.parse(localWritingUser)
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/tutors">Tutors</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/packages">Packages</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/submissions">Submissions</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/messages">Messages</Link>
            </li>
            { writingUserObject.staff ? 
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profiles">Profile</Link>
            </li>
            : ""
}
            {
                localStorage.getItem("writing_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("writing_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

