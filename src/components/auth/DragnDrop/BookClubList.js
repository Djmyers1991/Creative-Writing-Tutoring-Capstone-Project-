import { DragnDrop } from "./DragnDrop";
import "./dragndrop.css";




export const App = () => {


    const data = [
        {title: 'Started', items: ["Jurassic Park by Michael Crichton", "A Little Life by Hanya Yanagihara", "Crime and Punishment by Fyodor Dosteovsky", "Holes by Luis Sachar" ]},
        {title: 'In Progress', items: []},
        {title: 'Finished', items: []}
    
    ]

    return (
        <div className="App">
            <header className="App-header">
          
        <DragnDrop data={data} />
                   
            </header>
            </div>

    )
} 











