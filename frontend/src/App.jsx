import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./components/Header/Header";

import "./App.css";

function App() {
    return (
        <div className="app">
            <ToastContainer />
            <Header />
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
