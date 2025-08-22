import React,{useState} from "react";
import Child from "./components/Child";

function App(){
    const [count,setCount] = useState(0);
    const [other,setother] = useState(0);

    return(
        <div>
            <h2>Count : {count}</h2>
            <button onClick={() => setCount(count +1)}> Increase Count</button>
            <h2>Other</h2>
            <button onClick={() => setother(other + 1)}>Increase Other</button>
            <Child value = {other}/>
        </div>
    );
}
export default App;