import { Outlet, Route, Routes } from "react-router-dom"
import { TutorList } from "../Tutors/TutorList"
import { PackageList } from "../Packages/PackageList"
import { SubmissionForm } from "../Submissions/SubmissionForm"
import { SubmissionList } from "../Submissions/SubmissionList"
import { MessageFormStudent } from "../Messages/MessageFormStudent"
import { MessageFormTutor } from "../Messages/MessageFormTutor"
import { MessageList } from "../Messages/MessageList"
import { PackageForm } from "../Packages/PackageForm"
import { SubmissionSearch } from "../Submissions/SubmissionSearch"
import { SubmissionContainer } from "../Submissions/SubmissionContainer"
import { SubmissionDetails } from "../Submissions/SubmissionDetails"
import { EmployeeProfile } from "../Profile/EmployeeProfile"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                   <h1 className="title--main">Creative Writing Website</h1>
		<div>Your one-stop shop for repairing your writing</div>
                    <Outlet />
                </>
            }>

                <Route path="tutors" element={ <TutorList />} />
				<Route path="packages" element={ <PackageList />} />
                <Route path="submissions" element={<SubmissionContainer />} />
				<Route path="submissionForm" element={ <SubmissionForm />} />
                <Route path="messageFormStudent" element={ <MessageFormStudent />} />
                <Route path="messageFormTutor" element={ <MessageFormTutor />} />
                <Route path="messages" element={ <MessageList />} />
                <Route path="newPackage" element={ <PackageForm />} />
                {/* <Route path="submissionForm/:submissionId" element={ <SubmissionDetails />} /> */}
                <Route path="profiles" element={ <EmployeeProfile />} />


                







            </Route>
        </Routes>
    )


}



