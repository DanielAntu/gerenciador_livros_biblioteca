import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import useToast from "../../hooks/useToast";
import { authUtils } from "../../utils/authUtils";
import bookFetch from "../../axios/config";

import "./Loan.css";

const Loan = () => {
    const [loan, setLoan] = useState({});

    const { id } = useParams();

    const { user, setUser } = useUserContext();

    const navigate = useNavigate();

    const getLoan = async () => {
        try {
            const res = await bookFetch.get(`loan/${id}`, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            setLoan(res.data);
        } catch (error) {
            useToast(error.response.data.msg, "error");
            authUtils(error, setUser, navigate);
        }
    };

    const handleReturn = async (id) => {
        const confirmComand = confirm("Deseja mesmo marcar como devolvido?");
        if (!confirmComand) return;

        try {
            const res = await bookFetch.patch(`loan/${id}`, undefined, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            useToast(res.data.msg);
            setLoan(res.data.loan);
        } catch (error) {
            useToast(error.response.data.msg, "error");
            authUtils(error, setUser, navigate);
        }
    };

    const handleDelete = async (id) => {
        const confirmComand = confirm("Deseja mesmo deletar esse item?");
        if (!confirmComand) return;

        try {
            const res = await bookFetch.delete(`loan/${id}`, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            navigate("/loan");
            useToast(res.data.msg);
        } catch (error) {
            useToast(error.response.data.msg, "error");
            authUtils(error, setUser, navigate);
        }
    };

    const handleDownload = async (id) => {
        try {
            const res = await bookFetch.get(`loan/dowloadPDF/${id}`, {
                responseType: "blob",
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            const url = URL.createObjectURL(new Blob([res.data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = `recibo_${loan.nameClient}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            useToast(error.response.data.msg, "error");
            authUtils(error, setUser, navigate);
        }
    };

    useEffect(() => {
        getLoan();
    }, []);

    return (
        <div className="form-container loan">
            <h2>Dados do empréstimo do livro</h2>
            <div className="date">
                <p>
                    <b>Id do empréstimo: </b> {loan.id}
                </p>
                <p>
                    <b>Nome completo:</b> {loan.nameClient}
                </p>
                <p>
                    <b>CPF:</b> {loan.cpf}
                </p>
                <p>
                    <b>E-mail:</b> {loan.email}
                </p>
                <p>
                    <b>Titulo do livro:</b> {loan.title}
                </p>
                <p>
                    <b>Data do empréstimo:</b> {loan.dateLoan}
                </p>
                <p>
                    <b>Data de devolução:</b> {loan.dateReturn}
                </p>
                <p>
                    <b>Retornou a Biblioteca:</b>{" "}
                    {!loan.isReturn ? "Não" : "Sim"}
                </p>
                <div className="btn-container">
                    {loan.isReturn && (
                        <button
                            className="btn-action"
                            onClick={() => handleDelete(loan.id)}>
                            Deletar
                        </button>
                    )}
                    {!loan.isReturn && (
                        <button
                            className="btn-action"
                            onClick={() => handleReturn(loan.id)}>
                            Devolver
                        </button>
                    )}
                    <button
                        className="btn-action"
                        onClick={() => handleDownload(loan.id)}>
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Loan;
