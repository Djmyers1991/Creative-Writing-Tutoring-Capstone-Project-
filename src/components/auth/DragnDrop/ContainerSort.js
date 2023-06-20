import "./dragndrop.css";


export const App = () => {

    return (
        <div className="App">
            <header className="App-header">
                <div className="drag-n-drop">
                    <div className="dnd-group">
                        <div className = "dnd-item">
                            <div>
                                <p> Item

                                </p>
                            </div>


                        </div>

                    </div>
                </div>
            </header>
            </div>

    )
}













/*
// type TodoType={
//     id: string,
//     title: string,
// }

// export const ContainerSort = () => {
// const [todoTitle, setToDoTitle]= useState(``)
// const [todos, setTodos] = useState ([])
//     return <div className="container-sort">
// <div className="input-group">
// <input
// type="text"
// name="fruitName"
// value={todoTitle}
// placeholder="banana"
// onChange={(e)=>setToDoTitle(e.target.value)}
// />
// <button className="btn" onClick={() => console.log("something")}
// Add Item></button>


// </div>


//     </div>
// }

*/