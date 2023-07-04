import { Outlet, Route, Routes } from "react-router-dom"
import { TutorList } from "../Tutors/TutorList"
import { PackageList } from "../Packages/PackageList"
import { SubmissionForm } from "../Submissions/SubmissionForm"
import { MessageFormStudent } from "../Messages/MessageFormStudent"
import { MessageFormTutor } from "../Messages/MessageFormTutor"
import { MessageList } from "../Messages/MessageList"
import { PackageForm } from "../Packages/PackageForm"
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
import { PackageEdit } from "../Packages/EditPackage"
import { APIContainer } from "../API/APIContainer"
import { BookListForm } from "../API/APIBookForm"
import { BookList } from "../API/APIBookList"
import "./ApplicationViews.css"
import { EditBookList } from "../API/EditBookList"

export const ApplicationViews = () => {
    const localWritingUser = localStorage.getItem("writing_user");
    const writingUserObject = JSON.parse(localWritingUser);
	return (
        <Routes>
            <Route path="/" element={
                <>
                   <h1 className="title--main">Creative Writing Website</h1>
                   <h5 className="subtitle">The irony lies in our title's lack of creativity. That's art.</h5>
		
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
                <Route path= "API" element={ <APIContainer />} />
                <Route path="packages/:packageId/edit" element={ <PackageEdit />} />
                <Route path= "bookListForm" element={ <BookListForm />} />
                <Route path= "list" element={ <BookList />} />
                <Route path="list/:listId/edit" element={ <EditBookList />} />












               







            </Route>
        </Routes>
    )


}


