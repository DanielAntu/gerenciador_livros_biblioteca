import { Navigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

const RouterProtectedUserNotExist = ({ element }) => {
    const { user } = useUserContext();

    return !user ? element : <Navigate to={"/"} replace />;
};

export default RouterProtectedUserNotExist;
