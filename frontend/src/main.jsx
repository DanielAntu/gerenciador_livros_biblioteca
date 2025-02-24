import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import { UserContextProvider } from "./context/UserContext.jsx";

import Home from "./routers/Home/Home.jsx";
import Login from "./routers/Login/Login.jsx";
import RouterProtectedUserExist from "./components/RouterProtectedUserExist.jsx";
import RouterProtectedUserNotExist from "./components/RouterProtectedUserNotExist.jsx";
import UserProfile from "./routers/UserProfile/UserProfile.jsx";
import RegisterUser from "./routers/RegisterUser/RegisterUser.jsx";
import RegisterClient from "./routers/RegisterClient/RegisterClient.jsx";
import SearchCpf from "./routers/SearchCpf/SearchCpf.jsx";
import ProfileClient from "./routers/ProfileClient/ProfileClient.jsx";
import RegisterBook from "./routers/RegisterBook/RegisterBook.jsx";
import EditBook from "./routers/EditBook/EditBook.jsx";
import RegisterLoan from "./routers/RegisterLoan/RegisterLoan.jsx";
import Loan from "./routers/Loan/Loan.jsx";
import Loans from "./routers/Loans/Loans.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <RouterProtectedUserExist element={<Home />} />,
            },
            {
                path: "/profile",
                element: <RouterProtectedUserExist element={<UserProfile />} />,
            },
            {
                path: "/login",
                element: <RouterProtectedUserNotExist element={<Login />} />,
            },
            {
                path: "/register",
                element: (
                    <RouterProtectedUserExist element={<RegisterUser />} />
                ),
            },
            {
                path: "/register_client",
                element: (
                    <RouterProtectedUserExist element={<RegisterClient />} />
                ),
            },
            {
                path: "/search_cpf",
                element: <RouterProtectedUserExist element={<SearchCpf />} />,
            },
            {
                path: "/client/:id",
                element: (
                    <RouterProtectedUserExist element={<ProfileClient />} />
                ),
            },
            {
                path: "/register_book",
                element: (
                    <RouterProtectedUserExist element={<RegisterBook />} />
                ),
            },
            {
                path: "/edit_book/:id",
                element: <RouterProtectedUserExist element={<EditBook />} />,
            },
            {
                path: "/register_loan/:id",
                element: (
                    <RouterProtectedUserExist element={<RegisterLoan />} />
                ),
            },
            {
                path: "/loan/:id",
                element: <RouterProtectedUserExist element={<Loan />} />,
            },
            {
                path: "/loan",
                element: <RouterProtectedUserExist element={<Loans />} />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <UserContextProvider>
            <RouterProvider router={router} />
        </UserContextProvider>
    </StrictMode>
);
