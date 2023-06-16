export const SubmissionSearch = ({setterFunction}) => {
    return(
        <div>
        <input
            onChange={
                (changeEvent) => {
                    if(changeEvent.target.value.length) {
                    setterFunction(changeEvent.target.value)}
                    else {

                        return
                        
                    }
                }

            }
        type="text" placeholder="Enter Search Genre"/>
        </div>
    )
}