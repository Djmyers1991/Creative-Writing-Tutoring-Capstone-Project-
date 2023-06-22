import { Outlet, Route, Routes } from "react-router-dom"
import { TutorList } from "../Tutors/TutorList"
import { PackageList } from "../Packages/PackageList"
import { SubmissionForm } from "../Submissions/SubmissionForm"
import { SubmissionList } from "../Submissions/SubmissionList"
import { MessageFormStudent } from "../Messages/MessageFormStudent"
import { MessageFormTutor } from "../Messages/MessageFormTutor"
import { MessageList } from "../Messages/MessageList"
import { PackageForm } from "../Packages/PackageForm"
import { SubmissionSearch } from "../Submissions/SubmissionList"
import { SubmissionContainer } from "../Submissions/SubmissionContainer"
import { EmployeeProfile } from "../Profile/EmployeeProfile"
import { SubmissionEdit } from "../Submissions/SubmissionEdit"
import { CompletedSubmissionsList } from "../Submissions/CompletedSubmissonsList"
import { CompletedSubmissionForm } from "../Submissions/CompletedSubmissionForm"
import { ReviewList } from "../Reviews/ReviewList"
import { ReviewForm } from "../Reviews/ReviewForm"
import { HomePage } from "../auth/HomePage"
import { App, ContainerSort } from "../auth/DragnDrop/BookClubList"
import { TutorForm } from "../Tutors/TutorForm"

export const ApplicationViews = () => {
    const localWritingUser = localStorage.getItem("writing_user");
    const writingUserObject = JSON.parse(localWritingUser);
	return (
        <Routes>
            <Route path="/" element={
                <>
                   <h1 className="title--main">Creative Writing Website</h1>
		
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
                <Route path="profiles" element={ <EmployeeProfile />} />
                <Route path="completedSubmissions" element={ <CompletedSubmissionsList />} />
                <Route path="submissions/:submissionId/edit" element={ <SubmissionEdit />} />
                <Route path= "submissionCompletedForm" element={ <CompletedSubmissionForm />} />
                <Route path= "reviews" element={ <ReviewList />} />
                <Route path= "reviewForm" element={ <ReviewForm />} />
                <Route path= "homePage" element={ <HomePage />} />
                <Route path= "bookList" element={ <App />} />
                <Route path= "tutorForm" element={ <TutorForm />} />








               







            </Route>
        </Routes>
    )


}



