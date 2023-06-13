import { useState } from "react"
import { SubmissionList } from "./SubmissionList"
import { SubmissionSearch } from "./SubmissionSearch"

export const SubmissionContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
     <SubmissionList searchTermState={searchTerms} />
     <SubmissionSearch setterFunction={setSearchTerms}/>
    </>
}

