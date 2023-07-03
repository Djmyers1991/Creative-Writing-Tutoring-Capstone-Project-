import { useState } from "react"
import { API } from "./API"
import { APISearch } from "./APISearch"

export const APIContainer = () => {
    const [searchTerms, setSearchTerms] = useState()

    return <>

<APISearch setterFunction={setSearchTerms} />
        <API searchTermState={searchTerms}/>
        

    </>

}
