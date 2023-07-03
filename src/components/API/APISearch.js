
export const APISearch = ({ authorBooks, setterFunction }) => {
  
  
     (
      <div>
        <input
          onChange={(changeEvent) => {
            setterFunction(changeEvent.target.value);
          }}
          type="text"
          placeholder="Insert Title Name"
        />
      </div>
    );
  }