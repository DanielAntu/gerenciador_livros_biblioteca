import { Navigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

const RouterProtectedUserExist = ({ element }) => {
    const { user, setUser } = useUserContext();

    return user ? element : <Navigate to={"/login"} replace />;
};

export default RouterProtectedUserExist;
