import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import useToast from "../../hooks/useToast";
import { authUtils } from "../../utils/authUtils";
import bookFetch from "../../axios/config";

import ButtonRegister from "../../components/ButtonRegister/ButtonRegister";

import "./Loans.css";

const Loans = () => {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [loans, setLoans] = useState([]);
    const [filterReturn, setFilterReturn] = useState("");

    const { user, setUser } = useUserContext();

    const navigate = useNavigate();

    const getloans = async () => {
        setLoading(true);
        try {
            const res = await bookFetch.get("loan", {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            setLoans(res.data);
        } catch (error) {
            useToast(error.response.data.msg, "error");
            authUtils(error, setUser, navigate);
        }
        setLoading(false);
    };

    const getSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await bookFetch.get(`loan/search?key=${search}`, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            setLoans(res.data);
            setFilterReturn("");
        } catch (error) {
            useToast(error.response.data.msg, "error");
            authUtils(error, setUser, navigate);
        }
        setLoading(false);
    };

    const filterReturnFunction = async (e) => {
        setFilterReturn(e.target.value);
        setLoading(true);
        try {
            const res = await bookFetch.get(
                `loan/isreturn?isreturn=${e.target.value}${
                    search ? "&key=" + search : ""
                }`,
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                }
            );
            setLoans(res.data);
        } catch (error) {
            authUtils(error, setUser, navigate);
        }
        setLoading(false);
    };

    useEffect(() => {
        getloans();
    }, [search]);

    return (
        <div className="loans">
            <div className="search-container">
                <form onSubmit={getSearch}>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Digite o CPF do cliente ou id do empréstimo"
                        value={search || ""}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <ButtonRegister loading={loading} btnText={"Pesquisar"} />
                </form>
            </div>
            <div className="filter-loan">
                <label htmlFor="filter">Filtro de retorno de empréstimo:</label>
                <select
                    name="filter"
                    id="filter"
                    value={filterReturn || ""}
                    onChange={(e) => filterReturnFunction(e)}>
                    <option value=""></option>
                    <option value="0">Não</option>
                    <option value="1">Sim</option>
                </select>
            </div>
            <div className="loan-container">
                {loans.length === 0 && <p>Não há empréstimo salvo</p>}
                {loans.length > 0 &&
                    loans.map((loan) => (
                        <div className="loan-card" key={loan.id}>
                            <p>
                                <b>Id:</b> {loan.id}
                            </p>
                            <p>
                                <b>CPF:</b> {loan.cpfClient}
                            </p>
                            <p>
                                <b>Data do empréstimo:</b> {loan.dateLoan}
                            </p>
                            <p>
                                <b>Data de retorno:</b> {loan.dateReturn}
                            </p>
                            <p>
                                <b>Devolvido a biblioteca:</b>{" "}
                                {!loan.isReturn ? "Não" : "Sim"}
                            </p>
                            <Link
                                className="btn-action"
                                to={`/loan/${loan.id}`}>
                                Ver
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Loans;
