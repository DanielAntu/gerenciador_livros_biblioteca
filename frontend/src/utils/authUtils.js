export const authUtils = (error, setUser, navigate) => {
    if (error.response && error.response.status === 401) {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    }
};
