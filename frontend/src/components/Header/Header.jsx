import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";

import "./Header.css";

const Header = () => {
    const { user, setUser } = useUserContext();

    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <header>
            <div className="header">
                <h1>Gerenciador de Biblioteca</h1>
            </div>
            <nav>
                <ul>
                    {user && (
                        <>
                            <li>
                                <NavLink to={"/"}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/register"}>Cadastrar</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/profile"}>Perfil</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/register_client"}>
                                    Cadastrar Cliente
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/search_cpf"}>
                                    Procurar cliente
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/register_book"}>
                                    Cadastrar Livro
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/loan"}>Empréstimos</NavLink>
                            </li>
                            <li>
                                <button
                                    className="btn-logout"
                                    onClick={handleLogout}>
                                    Sair
                                </button>
                            </li>
                        </>
                    )}
                    {!user && (
                        <li>
                            <NavLink to={"/login"}>Entrar</NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
