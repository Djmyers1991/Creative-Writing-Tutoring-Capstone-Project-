export const SubmissionSearch = ({ setterFunction }) => {
    const localWritingUser = localStorage.getItem("writing_user");
    const writingUserObject = JSON.parse(localWritingUser);
    
    if (writingUserObject.staff) {
        return (
            <div>
                <input className="searchBar"
                    onChange={(changeEvent) => {
                        if (changeEvent.target.value.length) {
                            setterFunction(changeEvent.target.value);
                        } else {
                            return;
                        }
                    }}
                    type="text"
                    placeholder="Genre"
                />
            </div>
        );
    } else {
        return "";
    }
};
