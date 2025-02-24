import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        console.log("contexto não encontrado.");
        return;
    }

    return context;
};
