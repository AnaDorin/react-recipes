import React from 'react';
import './App.css';
import {GET_ALL_RECIPES} from "../queries";
import {useQuery} from "@apollo/react-hooks";

function App() {
    const { loading, error, data } = useQuery(GET_ALL_RECIPES);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <div className="App">
            <h1>Home</h1>
                {console.log(data)}
                <p>Recipes</p>
        </div>
    )
}
export default App;
