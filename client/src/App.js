import "./App.css";
import { Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import React from "react";

function App() {
    return (
        <React.Fragment>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
        </React.Fragment>
    );
}

export default App;
