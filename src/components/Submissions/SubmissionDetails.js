// export const SubmissionDetails = () => {
//     const {submissionId} = useParams()
//     const [submission, updateSubmission] = useState()

//     useEffect( 
//         () => {
//             fetch(`http://localhost:8088/submissions/=${submissionId}`)
//             .then(response => response.json())
//             .then((data) => {
//                 const singleSubmission = data[0]
//                 updateSubmission(singleSubmission)

//             })
//         },
//         [submissionId]
//     )
    

//     return <>
    
//     </>
// }